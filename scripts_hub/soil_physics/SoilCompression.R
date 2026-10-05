# ====================================================================
# SOIL COMPRESSIBILITY ANALYSIS
# ====================================================================

# ------------------------------
# 1. Load libraries
# ------------------------------
if (!require(readxl)) install.packages("readxl")
if (!require(dplyr)) install.packages("dplyr")
if (!require(tidyr)) install.packages("tidyr")
if (!require(ggplot2)) install.packages("ggplot2")
if (!require(stringr)) install.packages("stringr")
if (!require(gridExtra)) install.packages("gridExtra")

library(readxl)
library(dplyr)
library(tidyr)
library(ggplot2)
library(stringr)
library(gridExtra)

# ------------------------------
# 2. User parameters
# ------------------------------
file_path <- "/Users/danielsantander/Documents/Tesis/Data_Compression/Datos_Compresion_Josef.xlsx"
if (!file.exists(file_path)) stop("Excel file not found. Check path.")

cylinder_volume_cm3 <- 250   # cm³

# ------------------------------
# 3. Physical formulas 
# ------------------------------
calc_air_density <- function(pressure_hPa, temp_c) {
  1.293 * ((273.15 * pressure_hPa) / (1013 * (273.15 + temp_c)))
}

calc_air_conductivity <- function(air_density, flux_Lmin, gradient_hPa) {
  air_density * 9.81 * ((flux_Lmin * 0.001 * 0.03) / (gradient_hPa * 0.007854 * 60))
}

# ------------------------------
# 4. Extract data from a sheet (updated column indices)
# ------------------------------
to_numeric <- function(x) {
  x <- as.character(x)
  x <- str_replace_all(x, ",", ".")
  suppressWarnings(as.numeric(x))
}

extract_sheet <- function(sheet_name) {
  raw <- read_excel(file_path, sheet = sheet_name, col_names = FALSE)
  
  # Find first row where column A looks like a sample ID
  id_pattern <- "^[A-Z]{1,3}[0-9*]+"
  start_row <- which(str_detect(raw[[1]], id_pattern))[1]
  if (is.na(start_row)) {
    warning("No sample IDs found in sheet: ", sheet_name)
    return(NULL)
  }
  
  data_raw <- raw[start_row:nrow(raw), ]
  
  # Helper to safely get column by index (1-based)
  safe_col <- function(i) {
    if (i <= ncol(data_raw)) data_raw[[i]] else NA
  }
  
  # Column mapping (A=1 ... S=19)
  df <- data.frame(
    sample_id          = as.character(safe_col(1)),
    field_fresh_weight = to_numeric(safe_col(2)),   # B
    saturated_weight   = to_numeric(safe_col(3)),   # C
    weight_pF1_8       = to_numeric(safe_col(4)),   # D (old pre_brutto)
    tare_pF1_8         = to_numeric(safe_col(5)),   # E (old pre_tare)
    flux_pF1_8         = to_numeric(safe_col(6)),   # F (old pre_flux)
    grad_pF1_8         = to_numeric(safe_col(7)),   # G (old pre_grad)
    temp_pF1_8         = to_numeric(safe_col(8)),   # H (old pre_temp)
    pressure_pF1_8     = to_numeric(safe_col(9)),   # I (old pre_pressure)
    # Column 10 (J) is measurement number – skip
    weight_200kPa      = to_numeric(safe_col(11)),  # K (old post_brutto)
    tare_200kPa        = to_numeric(safe_col(12)),  # L (old post_tare)
    flux_200kPa        = to_numeric(safe_col(13)),  # M (old post_flux)
    grad_200kPa        = to_numeric(safe_col(14)),  # N (old post_grad)
    temp_200kPa        = to_numeric(safe_col(15)),  # O (old post_temp)
    pressure_200kPa    = to_numeric(safe_col(16)),  # P (old post_pressure)
    dry_brutto         = to_numeric(safe_col(17)),  # Q (old dry_brutto)
    dry_tare           = to_numeric(safe_col(18)),  # R (old dry_tare)
    cyl_tare           = to_numeric(safe_col(19)),  # S (old cyl_tare)
    stringsAsFactors = FALSE
  ) %>%
    filter(!is.na(sample_id) & sample_id != "")
  
  # Assign depth (sheet name handling)
  depth <- case_when(
    sheet_name == "EK-05"     ~ "EK_5cm",
    sheet_name == "WA 0-5"    ~ "WA_0-5cm",
    sheet_name == "WA 25"     ~ "WA_25cm",
    sheet_name == "WA 25-30"  ~ "WA_25-30cm",    # renamed sheet
    TRUE ~ sheet_name
  )
  df$depth <- depth
  df$sheet <- sheet_name
  return(df)
}

# Process all sheets except "Base"
sheets <- excel_sheets(file_path)
sheets <- sheets[tolower(trimws(sheets)) != "base"]
all_data <- bind_rows(lapply(sheets, extract_sheet))
cat("Total samples extracted:", nrow(all_data), "\n")

# ------------------------------
# 5. Handle missing tare values (set to 0)
# ------------------------------
all_data <- all_data %>%
  mutate(
    tare_pF1_8   = ifelse(is.na(tare_pF1_8), 0, tare_pF1_8),
    tare_200kPa  = ifelse(is.na(tare_200kPa), 0, tare_200kPa),
    dry_tare     = ifelse(is.na(dry_tare), 0, dry_tare),
    cyl_tare     = ifelse(is.na(cyl_tare), 0, cyl_tare)
  )

# ------------------------------
# 6. Compute derived variables (new TPV/WCP with saturated & pF1.8)
# ------------------------------
data <- all_data %>%
  mutate(
    # Net masses (soil alone)
    fresh_mass         = field_fresh_weight,                     # original field weight (no tare needed? Actually no tare subtracted – it's total weight of sample? He says "Weight (Field Fresh)" likely includes cylinder? Need to check. Usually these are soil + cylinder? But he defined mf as saturated weight column C, which likely includes cylinder? Let's assume all weight columns are gross (including cylinder and tare). He didn't specify tare for B and C. We'll assume B and C are also gross weights. So we need to subtract tare? Actually the old pre_brutto (now D) had its own tare. For consistency, we should subtract the same cylinder tare? But field fresh and saturated weights probably include the cylinder. To compute soil mass we need to subtract tare. However, for TPV and WCP he uses mf = saturated weight (col C) and mFK = weight at pF1.8 (col D). He did not mention subtracting tare. Looking back at his formulas: mf and mFK are "mass of soil" (without tare). In the original code we subtracted tare and cylinder. So we should do the same: 
    # saturated_mass_soil = saturated_weight - tare_? What tare? The same tare as pF1.8? Probably the cylinder and filter are constant. We'll use the same cyl_tare and the tare from pF1.8? But pF1.8 tare is at column E. That tare includes filter/paper. For saturation, the same filter/paper is present. So we can use the same tare values. Let's use: 
    saturated_mass_soil = saturated_weight - tare_pF1_8 - cyl_tare,
    pF1_8_mass_soil    = weight_pF1_8 - tare_pF1_8 - cyl_tare,
    dry_mass_soil      = dry_brutto - dry_tare - cyl_tare,
    
    # For 200 kPa mass (not used in TPV/WCP but for weight evolution)
    mass_200kPa_soil   = weight_200kPa - tare_200kPa - cyl_tare,
    
    # Air density and conductivity (using pF1.8 as "pre", 200kPa as "post")
    air_density_pre  = calc_air_density(pressure_pF1_8, temp_pF1_8),
    air_density_post = calc_air_density(pressure_200kPa, temp_200kPa),
    
    cond_pre = ifelse(!is.na(air_density_pre) & !is.na(flux_pF1_8) & !is.na(grad_pF1_8) & grad_pF1_8 > 0,
                      calc_air_conductivity(air_density_pre, flux_pF1_8, grad_pF1_8), NA),
    cond_post = ifelse(!is.na(air_density_post) & !is.na(flux_200kPa) & !is.na(grad_200kPa) & grad_200kPa > 0,
                       calc_air_conductivity(air_density_post, flux_200kPa, grad_200kPa), NA),
    
    # Particle density (ρ_t) = dry mass / cylinder volume
    rho_t = dry_mass_soil / cylinder_volume_cm3,
    
    # Total Pore Volume (TPV) using saturated weight as mf and pF1.8 as mFK? Wait: TPV uses mf (saturated) and mt (dry). WCP uses mf (saturated) and mFK (pF1.8). According to his instruction: "mf es nueva columna C (Saturated Weight) y mFK es nueva columna D; mt sigue siendo el mismo". So:
    TPV = ifelse(!is.na(saturated_mass_soil) & !is.na(dry_mass_soil) & dry_mass_soil > 0,
                 ((saturated_mass_soil - dry_mass_soil) / dry_mass_soil) * rho_t * 100, NA),
    WCP = ifelse(!is.na(saturated_mass_soil) & !is.na(pF1_8_mass_soil) & !is.na(dry_mass_soil) & dry_mass_soil > 0,
                 ((saturated_mass_soil - pF1_8_mass_soil) / dry_mass_soil) * rho_t * 100, NA)
  )

# Reorder depths
data$depth <- factor(data$depth, levels = c("EK_5cm", "WA_0-5cm", "WA_25cm", "WA_25-30cm"))
data <- data %>% filter(!is.na(depth))
# ------------------------------
# 7. Print data tables (optional, safe print)
# ------------------------------
cat("\n========== WEIGHT DATA (grams) – all 5 states ==========\n")
weight_vars <- data %>%
  select(depth, sample_id, field_fresh_weight, saturated_weight, weight_pF1_8, weight_200kPa, dry_brutto) %>%
  arrange(depth, sample_id)
print(as.data.frame(weight_vars), row.names = FALSE)

cat("\n========== AIR PROPERTIES (pF1.8 and 200kPa) ==========\n")
air_vars <- data %>%
  select(depth, sample_id, flux_pF1_8, grad_pF1_8, temp_pF1_8, pressure_pF1_8,
         flux_200kPa, grad_200kPa, temp_200kPa, pressure_200kPa) %>%
  arrange(depth, sample_id)
print(as.data.frame(air_vars), row.names = FALSE)

# ------------------------------
# 8. Diagnostic: data availability
# ------------------------------
availability <- data %>%
  group_by(depth) %>%
  summarise(
    N = n(),
    N_flux_pre   = sum(!is.na(flux_pF1_8)),
    N_grad_pre   = sum(!is.na(grad_pF1_8)),
    N_cond_pre   = sum(!is.na(cond_pre)),
    N_cond_post  = sum(!is.na(cond_post)),
    N_dry_mass   = sum(!is.na(dry_mass_soil)),
    N_TPV        = sum(!is.na(TPV)),
    N_WCP        = sum(!is.na(WCP)),
    .groups = "drop"
  )
cat("\n========== DATA AVAILABILITY PER DEPTH ==========\n")
print(availability)

# ------------------------------
# 9. Plots (as requested)
# ------------------------------

# Create filtered datasets for Wallen only and for the Comparison
data_wallen <- data %>% 
  filter(depth != "EK_5cm") %>%
  mutate(depth = factor(depth, 
                        levels = c("WA_0-5cm", "WA_25cm", "WA_25-30cm"),
                        labels = c("0-5 cm", "25 cm", "25-30 cm")))

data_comp <- data %>%
  filter(depth %in% c("EK_5cm", "WA_0-5cm")) %>%
  mutate(depth = factor(depth,
                        levels = c("EK_5cm", "WA_0-5cm"),
                        labels = c("Ekel 5 cm", "Wallen 0-5cm")))

# 9.1 Air conductivity
data_cond_wallen <- data_wallen %>% filter(depth != "0-5 cm")
data_cond_wallen$depth <- droplevels(data_cond_wallen$depth)

cond_long <- data_cond_wallen %>%
  select(depth, sample_id, cond_pre, cond_post) %>%
  pivot_longer(cols = c(cond_pre, cond_post),
               names_to = "timepoint", values_to = "conductivity") %>%
  mutate(timepoint = factor(timepoint, levels = c("cond_pre", "cond_post"),
                            labels = c("pF1.8 (before compression)", "200 kPa (after compression)")))

p_compare <- ggplot(cond_long, aes(x = depth, y = conductivity, fill = timepoint)) +
  geom_boxplot(position = position_dodge(0.8), na.rm = TRUE) +
  scale_fill_viridis_d(name = "Stage") +
  scale_y_log10() +   
  labs(title = "Air conductivity: pF1.8 vs 200 kPa",
       x = "Depth", y = "Conductivity (log scale)") +
  theme_minimal() + theme(axis.text.x = element_text(angle = 45, hjust = 1))

print(p_compare)
ggsave("Air_Conductivity_Wallen.png", plot = p_compare, width = 8, height = 6)

# 9.2 Dry bulk density
if (any(!is.na(data_wallen$dry_mass_soil))) {
  p_bulk <- ggplot(data_wallen, aes(x = depth, y = dry_mass_soil / cylinder_volume_cm3, fill = depth)) +
    geom_boxplot(na.rm = TRUE) +
    scale_fill_viridis_d() + scale_x_discrete(drop = FALSE) +
    labs(title = "Dry bulk density", x = "Depth", y = expression("Bulk density (g cm"^{-3}*")")) +
    theme_minimal() + theme(axis.text.x = element_text(angle = 45, hjust = 1))
  print(p_bulk)
  ggsave("Dry_Bulk_Density_Wallen.png", plot = p_bulk, width = 8, height = 6)
}

# 9.3 Total Pore Volume (TPV)
if (any(!is.na(data_wallen$TPV))) {
  p_tpv <- ggplot(data_wallen, aes(x = depth, y = TPV, fill = depth)) +
    geom_boxplot(na.rm = TRUE) +
    scale_fill_viridis_d() + scale_x_discrete(drop = FALSE) +
    labs(title = "Total Pore Volume (TPV)", x = "Depth", y = "TPV (%)") +
    theme_minimal() + theme(axis.text.x = element_text(angle = 45, hjust = 1))
  print(p_tpv)
  ggsave("TPV_Wallen.png", plot = p_tpv, width = 8, height = 6)
}

# 9.4 Wide Coarse Pores (WCP)
if (any(!is.na(data_wallen$WCP))) {
  p_wcp <- ggplot(data_wallen, aes(x = depth, y = WCP, fill = depth)) +
    geom_boxplot(na.rm = TRUE) +
    scale_fill_viridis_d() + scale_x_discrete(drop = FALSE) +
    labs(title = "Wide Coarse Pores (WCP)", x = "Depth", y = "WCP (%)") +
    theme_minimal() + theme(axis.text.x = element_text(angle = 45, hjust = 1))
  print(p_wcp)
  ggsave("WCP_Wallen.png", plot = p_wcp, width = 8, height = 6)
}

# 9.5 Weight evolution across 5 stages
weight_long <- data_wallen %>%
  select(sample_id, depth, 
         field_fresh_weight, saturated_weight, weight_pF1_8, weight_200kPa, dry_brutto) %>%
  pivot_longer(cols = c(field_fresh_weight, saturated_weight, weight_pF1_8, weight_200kPa, dry_brutto),
               names_to = "stage", values_to = "gross_weight") %>%
  mutate(stage = factor(stage,
                        levels = c("field_fresh_weight", "saturated_weight", "weight_pF1_8", "weight_200kPa", "dry_brutto"),
                        labels = c("Field fresh", "Saturated", "pF1.8", "200 kPa", "Dry 105°C")))

p_5stage <- ggplot(weight_long, aes(x = stage, y = gross_weight, group = sample_id, color = depth)) +
  geom_line(alpha = 0.4) +
  geom_point(size = 2, alpha = 0.8) +
  scale_color_viridis_d() +
  labs(title = "Gross weight evolution", x = "Stage", y = "Gross weight (g)") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
print(p_5stage)
ggsave("Weight_Evolution_5Stages_Wallen.png", plot = p_5stage, width = 8, height = 6)

# Pore evolution (water volume proxy)
if (!"fresh_mass_soil" %in% names(data_wallen)) {
  data_wallen <- data_wallen %>%
    mutate(fresh_mass_soil = field_fresh_weight - tare_pF1_8 - cyl_tare)
}
water_vol_long <- data_wallen %>%
  mutate(
    water_vol_fresh = fresh_mass_soil - dry_mass_soil,
    water_vol_sat   = saturated_mass_soil - dry_mass_soil,
    water_vol_pF1_8 = pF1_8_mass_soil - dry_mass_soil,
    water_vol_200kPa = mass_200kPa_soil - dry_mass_soil
  ) %>%
  select(sample_id, depth, water_vol_fresh, water_vol_sat, water_vol_pF1_8, water_vol_200kPa) %>%
  pivot_longer(cols = starts_with("water_vol"),
               names_to = "stage", values_to = "water_volume_cm3") %>%
  mutate(stage = factor(stage,
                        levels = c("water_vol_fresh", "water_vol_sat", "water_vol_pF1_8", "water_vol_200kPa"),
                        labels = c("Field fresh", "Saturated", "pF1.8", "200 kPa"))) %>%
  filter(!is.na(water_volume_cm3))

if (nrow(water_vol_long) > 0) {
  p_water_vol <- ggplot(water_vol_long, aes(x = stage, y = water_volume_cm3, group = sample_id, color = depth)) +
    geom_line(alpha = 0.4) +
    geom_point(size = 2, alpha = 0.8) +
    scale_color_viridis_d() +
    labs(title = "Pore water volume evolution", x = "Stage", y = expression("Water volume (cm"^3*")")) +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
  print(p_water_vol)
  ggsave("Pore_Water_Volume_Wallen.png", plot = p_water_vol, width = 8, height = 6)
}

# 9.6 NEW: Comparison EK_5cm vs WA_0-5cm
p_bulk_comp <- ggplot(data_comp, aes(x = depth, y = dry_mass_soil / cylinder_volume_cm3, fill = depth)) +
  geom_boxplot(na.rm = TRUE) + scale_fill_viridis_d() +
  labs(title = "Dry bulk density", x = "Site", y = expression("Bulk density (g cm"^{-3}*")")) +
  theme_minimal() + theme(legend.position = "none")

p_tpv_comp <- ggplot(data_comp, aes(x = depth, y = TPV, fill = depth)) +
  geom_boxplot(na.rm = TRUE) + scale_fill_viridis_d() +
  labs(title = "Total Pore Volume", x = "Site", y = "TPV (%)") +
  theme_minimal() + theme(legend.position = "none")

p_wcp_comp <- ggplot(data_comp, aes(x = depth, y = WCP, fill = depth)) +
  geom_boxplot(na.rm = TRUE) + scale_fill_viridis_d() +
  labs(title = "Wide Coarse Pores", x = "Site", y = "WCP (%)") +
  theme_minimal() + theme(legend.position = "none")

p_comp_grid <- grid.arrange(p_bulk_comp, p_tpv_comp, p_wcp_comp, ncol = 3)
ggsave("Comparison_EK_WA.png", plot = p_comp_grid, width = 12, height = 5)


# ------------------------------
# 10. Summary statistics (updated)
# ------------------------------
summary_stats <- data %>%
  group_by(depth) %>%
  summarise(
    n = n(),
    flux_pF1_8_mean   = mean(flux_pF1_8, na.rm = TRUE),
    flux_pF1_8_sd     = sd(flux_pF1_8, na.rm = TRUE),
    cond_pre_mean     = mean(cond_pre, na.rm = TRUE),
    cond_pre_sd       = sd(cond_pre, na.rm = TRUE),
    cond_post_mean    = mean(cond_post, na.rm = TRUE),
    cond_post_sd      = sd(cond_post, na.rm = TRUE),
    bulk_density_mean = mean(dry_mass_soil / cylinder_volume_cm3, na.rm = TRUE),
    bulk_density_sd   = sd(dry_mass_soil / cylinder_volume_cm3, na.rm = TRUE),
    TPV_mean = mean(TPV, na.rm = TRUE),
    TPV_sd   = sd(TPV, na.rm = TRUE),
    WCP_mean = mean(WCP, na.rm = TRUE),
    WCP_sd   = sd(WCP, na.rm = TRUE),
    .groups = "drop"
  )

cat("\n========== SUMMARY STATISTICS BY DEPTH ==========\n")
print(as.data.frame(summary_stats), digits = 3)
write.csv(summary_stats, "summary_by_depth.csv", row.names = FALSE)
cat("\nSummary table saved to 'summary_by_depth.csv'\n")

# ====================================================================
# PRECOMPRESSION CURVES 
# 1) Individual site plots (each sample as a separate line, with Casagrande precompression vertical lines)
# Reads stress (columns E-N) vs settlement (same cells) from sheet "Precompression"
# Reads column C (First Compression) and adds a vertical dashed line for each sample.
# 2) Combined plot: geometric mean ± geometric SD per site (all sites together)
# ====================================================================

cat("\n========== Precompression curves (data extraction and plotting) ==========\n")

if (!"Precompression" %in% excel_sheets(file_path)) {
  warning("Sheet 'Precompression' not found. Skipping precompression curves.")
} else {
  # ------------------------------
  # 1. Read and extract data (ONCE)
  # ------------------------------
  precomp_raw <- read_excel(file_path, sheet = "Precompression", col_names = TRUE)
  names(precomp_raw)[1:3] <- c("Site", "Sample", "Precomp_kPa")
  
  stress_levels <- c(1, 10, 20, 30, 40, 50, 70, 100, 200)
  stress_cols <- 5:13   # columns E to M (skip Relief)
  
  curves_list <- list()
  for (i in 1:nrow(precomp_raw)) {
    site <- precomp_raw$Site[i]
    sample <- precomp_raw$Sample[i]
    precomp_val <- precomp_raw$Precomp_kPa[i]
    if (is.na(site) || is.na(sample)) next
    
    for (j in seq_along(stress_cols)) {
      stress_kpa <- stress_levels[j]
      settlement_raw <- precomp_raw[[stress_cols[j]]][i]
      if (is.na(settlement_raw)) next
      settlement_num <- suppressWarnings(as.numeric(settlement_raw))
      if (is.na(settlement_num)) next
      curves_list[[length(curves_list) + 1]] <- data.frame(
        Site = site,
        Sample = sample,
        Precomp_kPa = precomp_val,
        Stress_kPa = stress_kpa,
        Settlement_mm = settlement_num,
        stringsAsFactors = FALSE
      )
    }
  }
  
  if (length(curves_list) == 0) {
    warning("No valid settlement data found in columns E‑M.")
  } else {
    # Combine into one data frame
    curves_data <- bind_rows(curves_list)
    
    # Standardise site names for consistent plotting
    curves_data <- curves_data %>%
      mutate(
        Site = factor(case_when(
          Site == "EK0-5"   ~ "Ekel 5 cm",
          Site == "WA0-5"   ~ "Wallen 0-5cm",
          Site == "WA25"    ~ "25 cm",
          Site == "WA25-35" ~ "25-30 cm",
          TRUE ~ Site
        ), levels = c("Ekel 5 cm", "Wallen 0-5cm", "25 cm", "25-30 cm")),
        # For individual plots: legend label with precompression value
        Sample_label = paste0(Sample, " (", round(Precomp_kPa, 1), " kPa)")
      )
    
    # ------------------------------------------------------------
    # 2. Individual site plots (one per site, each sample a line)
    # ------------------------------------------------------------
    sites <- unique(curves_data$Site)
    for (s in sites) {
      site_data <- curves_data %>% filter(Site == s)
      if (nrow(site_data) == 0) next
      
      precomp_lines <- site_data %>%
        select(Sample_label, Sample, Precomp_kPa) %>%
        distinct()
      
      p_individual <- ggplot(site_data, aes(x = Stress_kPa, y = Settlement_mm,
                                            group = Sample, colour = Sample_label)) +
        geom_line(size = 1.0) +
        geom_point(size = 1.5, alpha = 0.7) +
        geom_vline(data = precomp_lines,
                   aes(xintercept = Precomp_kPa, colour = Sample_label),
                   linetype = "dashed", alpha = 0.6, size = 0.8) +
        scale_x_log10(
          limits = c(10, 200),
          breaks = c(10, 20, 30, 40, 50, 70, 100, 200),
          labels = c("10", "20", "30", "40", "50", "70", "100", "200")
        ) +
        scale_y_continuous(limits = c(NA, 0)) +
        labs(
          title = paste("Precompression curves -", s),
          x = "Normal stress (kPa) [log scale]",
          y = "Settlement (mm)",
          colour = "Sample (precomp. kPa)"
        ) +
        theme_minimal() +
        theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
        annotation_logticks(sides = "b")
      
      print(p_individual)
      ggsave(paste0("Precompression_Individual_", s, ".png"), plot = p_individual, width = 8, height = 6)
    }
    cat("\nIndividual site plots displayed (x‑axis starts at 10 kPa, precomp values in legend).\n")
    
    # ------------------------------------------------------------
    # 3. Combined plot: geometric mean ± geometric SD per site
    # ------------------------------------------------------------
    site_summary <- curves_data %>%
      mutate(Positive_comp = abs(Settlement_mm)) %>%
      group_by(Site, Stress_kPa) %>%
      summarise(
        n = n(),
        geom_mean_comp = exp(mean(log(Positive_comp), na.rm = TRUE)),
        geom_sd_factor = exp(sd(log(Positive_comp), na.rm = TRUE)),
        .groups = "drop"
      ) %>%
      mutate(
        mean_settlement = -geom_mean_comp,
        sd_lower = -geom_mean_comp * geom_sd_factor,
        sd_upper = -geom_mean_comp / geom_sd_factor
      )
    
    p_combined <- ggplot(site_summary, aes(x = Stress_kPa, y = mean_settlement, colour = Site)) +
      geom_line(aes(linetype = Site), size = 1.2) +
      geom_ribbon(aes(ymin = sd_lower, ymax = sd_upper, fill = Site), alpha = 0.2, colour = NA) +
      scale_x_log10(
        limits = c(10, 200),
        breaks = c(10, 20, 30, 40, 50, 70, 100, 200),
        labels = c("10", "20", "30", "40", "50", "70", "100", "200")
      ) +
      scale_y_continuous(limits = c(NA, 0)) +
      scale_linetype_manual(values = c("Ekel 5 cm" = "dashed", "Wallen 0-5cm" = "solid", "25 cm" = "solid", "25-30 cm" = "solid")) +
      labs(
        title = "Precompression curves – geometric mean per site",
        x = "Normal stress (kPa) [log scale]",
        y = "Settlement (mm)",
        colour = "Site", fill = "Site", linetype = "Site"
      ) +
      theme_minimal() +
      theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
      annotation_logticks(sides = "b")
    
    print(p_combined)
    ggsave("Precompression_Combined.png", plot = p_combined, width = 8, height = 6)
    cat("\nCombined plot displayed: geometric mean ± geometric standard deviation per site.\n")
  }
}
# ------------------------------
# 11. Interpretation hints
# ------------------------------
cat("\n========== INTERPRETATION GUIDE ==========\n")
cat("• TPV (Total Pore Volume) now uses saturated weight (col C) as mf and dry mass as mt.\n")
cat("• WCP (Wide Coarse Pores) uses saturated weight (col C) and pF1.8 weight (col D).\n")
cat("• Air conductivity before = at pF1.8, after = at 200 kPa compression.\n")
cat("• Weight evolution shows 5 stages: field fresh, saturated, pF1.8, 200 kPa, dry.\n")
cat("• WA 0-5 is excluded from air property plots because no flux/gradient data.\n")
cat("• All plots are displayed – use 'Export' button in RStudio to save manually.\n")