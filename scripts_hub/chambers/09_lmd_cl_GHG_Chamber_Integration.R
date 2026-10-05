library(tidyr)
# ==============================================================================
# 09 GHG Chamber Integration & Ecosystem Total Global Warming Potential
# ==============================================================================
# This script is an extension. It integrates Eddy Covariance CO2 fluxes
# with manual chamber data (CO2, CH4, N2O) to compute total GHG budgets.
# ==============================================================================

library(tidyverse)
library(lubridate)
library(patchwork)

source("pipeline_config.R")

if (!exists("ENABLE_CHAMBER_INTEGRATION") || !ENABLE_CHAMBER_INTEGRATION) {
  message("Chamber integration is disabled in pipeline_config.R. Exiting.")
  quit(save = "no")
}

message("=== Starting Phase 2: Chamber Integration & GHG Budgets ===")

# Ensure plots directory exists
plots_dir <- file.path(pipeline_dir, "Plots")
if (!dir.exists(plots_dir)) dir.create(plots_dir, recursive = TRUE)

# --- 1. Load Data ---
# EC Data (MDS Model chosen as the most robust for this site)
ec_daily <- read_csv(path_05_mds_budgets, show_col_types = FALSE) %>%
  mutate(Date = as.Date(date))

ec_ml_daily <- read_csv(path_07_ml_budgets, show_col_types = FALSE) %>%
  mutate(Date = as.Date(date))

# Chamber Data
chamber_raw <- read_csv(path_chamber_data, show_col_types = FALSE)
names(chamber_raw) <- make.names(names(chamber_raw))

chamber_raw <- chamber_raw %>%
  mutate(
    ppm.min = as.numeric(as.character(ppm.min)),
    ppm.min.n2o = as.numeric(as.character(ppm.min.n2o)),
    ppm.min.co2 = as.numeric(as.character(ppm.min.co2)),
    datum_date = as.Date(datum, format = "%d/%m/%Y"),
    timestamp = datum_date + minutes(zeit),
    Sensor = paste0("P", nr),
    height_cm = case_when(
      datum_date >= as.Date("2024-05-27") | 
        (datum_date == as.Date("2024-02-19") & nr %in% c(7,8)) ~ 42,
      TRUE ~ 16
    )
  )

# --- 2. Physics Engine (From Chambers_Avanzado.R) ---
A_base_m2 <- pi * (0.1835^2) 

get_volume_m3 <- function(height_cm) {
  V_base <- pi * (0.1835^2) * 0.05
  if (height_cm == 16) {
    V_top <- pi * (0.1835^2) * 0.11
    return(V_base + V_top)
  } else {
    V_ext <- pi * (0.181^2) * 0.26
    V_top <- pi * (0.1835^2) * 0.11
    return(V_base + V_ext + V_top)
  }
}

calc_flux <- function(slope_ppm_min, height_cm) {
  slope_frac_s <- slope_ppm_min * 1e-6 / 60
  V_m3 <- get_volume_m3(height_cm)
  molar_density <- 101325 / (8.314 * 293) # Assuming 20C (293K) standard
  flux <- (slope_frac_s * V_m3 * molar_density * 1e6) / A_base_m2
  return(flux)
}

# --- 3. Process Gases to gC-CO2eq/m2/d ---
# Note: 1 kg/ha/d = 0.1 g/m2/d
# Carbon fraction in CO2 = 12.01/44.01
carbon_fraction <- 12.01 / 44.01

# Calculate flux function from previous implementation
calc_flux <- function(slope, height_cm, temp_c = 15, press_kpa = 101.3) {
  R <- 8.314 # Ideal gas constant
  temp_k <- temp_c + 273.15
  molar_density <- press_kpa * 1000 / (R * temp_k) # mol / m3
  flux_umol_m2s <- slope * molar_density * (height_cm / 100) / 60
  return(flux_umol_m2s)
}

process_gas <- function(data, slope_col, molar_mass, gwp_100, gwp_20) {
  data %>%
    filter(!is.na(.data[[slope_col]]), !is.na(datum_date)) %>%
    rowwise() %>%
    mutate(
      flux_umol_m2s = calc_flux(.data[[slope_col]], height_cm),
      # Mass flux in g/m2/d = umol/m2s * 86400 * 1e-6 * molar_mass
      flux_g_m2_d = flux_umol_m2s * 0.0864 * molar_mass,
      # Convert to Carbon Equivalent (gC-CO2eq/m2/d)
      flux_gC_100 = flux_g_m2_d * gwp_100 * carbon_fraction,
      flux_gC_20  = flux_g_m2_d * gwp_20 * carbon_fraction,
      flux_kgha_d = flux_g_m2_d * 10
    ) %>%
    ungroup() %>%
    select(Date = datum_date, flux_gC_100, flux_gC_20)
}

# Molar masses: CH4=16.04, N2O=44.01, CO2=44.01
# CO2 GWP is always 1.
chamber_co2 <- process_gas(chamber_raw, "ppm.min.co2", 44.01, 1, 1)
# CH4 GWPs: 28 (100y) and 84 (20y)
chamber_ch4 <- process_gas(chamber_raw, "ppm.min", 16.04, 28, 84)
# N2O GWPs: 265 (100y) and 264 (20y)
chamber_n2o <- process_gas(chamber_raw, "ppm.min.n2o", 44.01, 265, 264)

# Aggregate daily chamber means with error (se)
agg_chamber <- function(df, gas_name) {
  df %>%
    group_by(Date) %>%
    summarise(
      mean_gC_100 = mean(flux_gC_100, na.rm = TRUE),
      se_gC_100 = sd(flux_gC_100, na.rm = TRUE) / sqrt(n()),
      mean_gC_20 = mean(flux_gC_20, na.rm = TRUE),
      se_gC_20 = sd(flux_gC_20, na.rm = TRUE) / sqrt(n()),
      .groups = "drop"
    ) %>%
    mutate(Gas = gas_name)
}

agg_co2 <- agg_chamber(chamber_co2, "CO2 (Chamber)")
agg_ch4 <- agg_chamber(chamber_ch4, "CH4 (Chamber)")
agg_n2o <- agg_chamber(chamber_n2o, "N2O (Chamber)")

chamber_all <- bind_rows(agg_co2, agg_ch4, agg_n2o)

# --- 4. Cross-Validation: Eddy Covariance vs Chamber CO2 ---
# Merge EC and Chamber CO2
ec_co2_sub <- ec_daily %>% select(Date, NEE = NEE_1_gC) %>% mutate(Gas = "CO2 (Eddy Covariance)")
cross_val_data <- inner_join(agg_co2, ec_co2_sub, by = "Date")

if (nrow(cross_val_data) > 0) {
  p_cross <- ggplot(cross_val_data, aes(x = mean_gC_100, y = NEE)) +
    geom_abline(intercept = 0, slope = 1, linetype = "dashed", color = "gray50") +
    geom_point(size = 3, color = "darkblue", alpha = 0.7) +
    geom_smooth(method = "lm", se = FALSE, color = "red") +
    labs(
      title = "Cross-Validation: Chamber CO2 vs Eddy Covariance NEE",
      x = "Chamber Net CO2 Flux (gC m-2 d-1)",
      y = "Eddy Covariance NEE (gC m-2 d-1)"
    ) + theme_klimafarm()
  ggsave(file.path(plots_dir, "20_Chamber_EC_CrossValidation.png"), p_cross, width = 7, height = 5)
  message("Saved cross-validation plot: 20_Chamber_EC_CrossValidation.png")
} else {
  message("Warning: No overlapping dates found between Chamber and EC data for cross-validation.")
}


# --- 5. True Ecosystem GHG Balance (Avoiding Double Counting) ---
# For the final balance, we use:
# 1. CO2: ONLY from Tower (MDS)
# 2. CH4: Tower (ML) + Chamber CH4 ONLY to fill Tower gaps (surgical insertion)
# 3. N2O: ONLY from Chambers (episodic)

# Merge all into a unified daily dataframe
master_ghg <- ec_daily %>% select(Date, CO2_Tower = NEE_1_gC) %>%
  left_join(ec_ml_daily %>% select(Date, CH4_Tower = CH4_ML_g), by = "Date") %>%
  left_join(agg_co2 %>% select(Date, CO2_Chamber = mean_gC_100, SE_CO2_Chamber = se_gC_100), by = "Date") %>%
  left_join(agg_ch4 %>% select(Date, CH4_Chamber = mean_gC_100, SE_CH4_Chamber = se_gC_100), by = "Date") %>%
  left_join(agg_n2o %>% select(Date, N2O_Chamber_100 = mean_gC_100, N2O_Chamber_20 = mean_gC_20, SE_N2O_Chamber = se_gC_100), by = "Date")

# Convert Tower CH4 to CO2eq (gC-CO2eq m-2 d-1)
master_ghg <- master_ghg %>%
  mutate(
    CH4_Tower_100 = CH4_Tower * 28 * carbon_fraction,
    CH4_Tower_20  = CH4_Tower * 84 * carbon_fraction
  )

# Surgically insert Chamber CH4 into Tower CH4 gaps
master_ghg <- master_ghg %>%
  mutate(
    Final_CH4_100 = ifelse(is.na(CH4_Tower_100) & !is.na(CH4_Chamber), CH4_Chamber, CH4_Tower_100),
    Final_CH4_20  = ifelse(is.na(CH4_Tower_20) & !is.na(CH4_Chamber), CH4_Chamber, CH4_Tower_20),
    # If we used chamber, carry over its SE, otherwise 0
    SE_Final_CH4 = ifelse(is.na(CH4_Tower_100) & !is.na(CH4_Chamber), SE_CH4_Chamber, 0) 
  )

# Calculate Final Net GHG Balance (Only on days where we have N2O chamber data to make a complete balance)
chamber_days <- master_ghg %>% filter(!is.na(N2O_Chamber_100)) %>%
  mutate(
    Net_GWP100 = CO2_Tower + Final_CH4_100 + N2O_Chamber_100,
    Net_GWP20  = CO2_Tower + Final_CH4_20 + N2O_Chamber_20,
    # Propagate SE (only N2O SE + CH4 SE if used)
    SE_Prop_100 = sqrt(SE_N2O_Chamber^2 + SE_Final_CH4^2),
    Legend_Post = "Post-insertion (Total Net GHG)",
    Legend_Pre  = "Pre-insertion (EC CO2 Only)"
  )

# --- 6. Plotting the Error Analysis (Fig 23) ---
df_plot <- chamber_days %>%
  select(Date, Net_GWP100, CO2_Tower, SE_Prop_100, Legend_Post, Legend_Pre) %>%
  pivot_longer(cols = c(Net_GWP100, CO2_Tower), names_to = "Type", values_to = "Flux") %>%
  mutate(
    SE_Plot = ifelse(Type == "Net_GWP100", SE_Prop_100, 0),
    Label = ifelse(Type == "Net_GWP100", Legend_Post, Legend_Pre)
  )

p_net <- ggplot(df_plot, aes(x = Date, y = Flux, color = Label, shape = Label)) +
  geom_point(size = 4, position = position_dodge(width = 5)) +
  geom_errorbar(aes(ymin = Flux - SE_Plot, ymax = Flux + SE_Plot), 
                width = 5, position = position_dodge(width = 5)) +
  geom_hline(yintercept = 0, linetype = "dashed", color="black") +
  scale_color_manual(values = c("Post-insertion (Total Net GHG)" = "purple", 
                                "Pre-insertion (EC CO2 Only)" = "steelblue")) +
  scale_x_date(date_breaks = "2 months", date_labels = "%b %Y") +
  labs(
    title = "Net Daily GHG Balance (Pre vs Post Chamber Insertion)",
    subtitle = "Corrected: Avoiding CO2 double-counting. CH4 surgically gap-filled. Error from spatial variance.",
    x = "Date",
    y = "Net GHG Flux (gC-CO2eq m-2 d-1)",
    color = "Balance Type", shape = "Balance Type"
  ) +
  theme_klimafarm() +
  theme(legend.position = "bottom")

ggsave(file.path(plots_dir, "23_GHG_Net_Balance_Error_Corrected.png"), p_net, width = 8, height = 6)
message("Saved corrected error analysis plot: 23_GHG_Net_Balance_Error_Corrected.png")

message("=== Phase 2: Chamber Integration Complete ===")

