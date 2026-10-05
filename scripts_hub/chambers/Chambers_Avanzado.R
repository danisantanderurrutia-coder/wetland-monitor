# ==============================================================================
# FINAL UNIFIED SCRIPT: GHG FLUX ANALYSIS PIPELINE
# 1. Geometry-aware volume calculation (16cm vs 42cm)
# 2. Physics-based flux conversion to umol/m2s
# 3. Mass-based conversion to kg/ha/d
# 4. Dual-axis visualization (Left: umol/m2s, Right: kg/ha/d)
# ==============================================================================

library(tidyverse)
library(lubridate)
library(patchwork)
library(readr)

# --- 1. DATA IMPORT & PREPARATION ---
data_raw <- read_csv(file.choose(), show_col_types = FALSE)
names(data_raw) <- make.names(names(data_raw))

data_raw <- data_raw %>%
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

# --- 2. PHYSICS & GEOMETRY ENGINE ---
A_base_m2 <- pi * (0.1835^2) 

# Volume lookup based on the physical taper (bottleneck at 35.7cm, base 36.7cm)
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

# Flux standardization: converts ppm/min to umol/m2s
calc_flux <- function(slope_ppm_min, height_cm) {
  slope_frac_s <- slope_ppm_min * 1e-6 / 60
  V_m3 <- get_volume_m3(height_cm)
  molar_density <- 101325 / (8.314 * 293)
  flux <- (slope_frac_s * V_m3 * molar_density * 1e6) / A_base_m2
  return(flux)
}

# Mass conversion: converts umol/m2s to kg/ha/d
convert_to_kgha <- function(flux_umol, molar_mass) {
  # (umol/m2s) * (86400 s/d) * (1e-6 mol/umol) * (g/mol) / (1000 g/kg) * (10000 m2/ha)
  return(flux_umol * 0.0864 * molar_mass / 100)
}

# --- 3. PROCESSING & VISUALIZATION PIPELINE ---
process_gas_final <- function(data, slope_col, gas_name, molar_mass) {
  # Processing dataset
  data_flux <- data %>%
    filter(!is.na(.data[[slope_col]]), !is.na(timestamp)) %>%
    rowwise() %>%
    mutate(
      flux_umol_m2s = calc_flux(.data[[slope_col]], height_cm),
      flux_kgha = convert_to_kgha(flux_umol_m2s, molar_mass),
      height_group = factor(height_cm, levels = c(16, 42), labels = c("16cm", "42cm"))
    ) %>%
    ungroup()
  
  # Scaling factor for the right axis (kg/ha/d)
  scale_factor <- max(data_flux$flux_umol_m2s, na.rm = TRUE) / max(data_flux$flux_kgha, na.rm = TRUE)
  
  # Plot A: Time Series (Dual Axis)
  p_flux_ts <- ggplot(data_flux, aes(timestamp, flux_umol_m2s, color = Sensor, linetype = height_group)) +
    geom_line(linewidth = 0.8) +
    scale_y_continuous(
      name = bquote(.(gas_name) ~ "Flux (" * mu * "mol" ~ m^-2 ~ s^-1 * ")"), 
      sec.axis = sec_axis(~ . / scale_factor, name = bquote(.(gas_name) ~ "Flux (kg" ~ ha^-1 ~ d^-1 * ")"))
    ) +
    labs(title = paste(gas_name, "Flux Time Series")) +
    theme_bw() + theme(legend.position = "bottom")
  
  # Plot B: Hourly Aggregation (Dual Axis)
  data_mean <- data_flux %>%
    mutate(date_hour = floor_date(timestamp, "hour")) %>%
    group_by(date_hour, height_group, ort) %>%
    summarise(mean_f = mean(flux_umol_m2s), sd_f = sd(flux_umol_m2s), .groups = "drop")
  
  p_flux_hourly <- ggplot(data_mean, aes(date_hour, mean_f, fill = height_group)) +
    geom_ribbon(aes(ymin = mean_f - sd_f, ymax = mean_f + sd_f), alpha = 0.3) +
    geom_line(aes(color = height_group), linewidth = 1.2) +
    scale_color_manual(values = c("16cm" = "red3", "42cm" = "forestgreen")) +
    scale_y_continuous(
      name = bquote(.(gas_name) ~ "Flux (" * mu * "mol" ~ m^-2 ~ s^-1 * ")"), 
      sec.axis = sec_axis(~ . / scale_factor, name = bquote(.(gas_name) ~ "Flux (kg" ~ ha^-1 ~ d^-1 * ")"))
    ) +
    facet_wrap(~ort) + theme_bw()
  
  # Plot C: Distribution
  p_dist <- ggplot(data_flux, aes(Sensor, flux_umol_m2s, fill = height_group)) +
    geom_violin(alpha = 0.5) + geom_boxplot(width = 0.15, alpha = 0.7) +
    scale_fill_manual(values = c("16cm" = "red", "42cm" = "forestgreen")) +
    labs(x = "Chamber", y = bquote(.(gas_name) ~ "Flux (" * mu * "mol" ~ m^-2 ~ s^-1 * ")")) + theme_bw() +
    theme(legend.position = "none", axis.text.x = element_text(angle = 45, hjust = 1))
  
  # Composite Output
  final_p <- (p_flux_ts / p_flux_hourly) | p_dist
  print(final_p)
  ggsave(paste0("flux_", tolower(gas_name), "_final.png"), final_p, width = 16, height = 10)
  
  return(data_flux)
}

# --- 4. EXECUTION ---
# molar_mass: CH4=16.04, N2O=44.01, CO2=44.01
ch4_final <- process_gas_final(data_raw, "ppm.min", "CH4", 16.04)
n2o_final <- process_gas_final(data_raw, "ppm.min.n2o", "N2O", 44.01)
co2_final <- process_gas_final(data_raw, "ppm.min.co2", "CO2", 44.01)

# ==============================================================================
# Purpose: Categorizes data into 'West Trench', 'Central Site', and 'East Trench'
# Visualizes flux dynamics by site with aggregated site means.
# ==============================================================================

# ==============================================================================
# SITE-BASED FLUX ANALYSIS (FIXED SCALES + DUAL AXIS)
# Purpose: Maintain global Y-axis scale across sites with dual unit display.
# ==============================================================================

add_site_and_plot <- function(data, gas_name, molar_mass, flux_col = "flux_umol_m2s") {
  
  # 1. SITE CATEGORIZATION
  data_site <- data %>%
    mutate(
      site = case_when(
        nr == 8 ~ "West Trench",
        nr %in% 3:7 ~ "Central Site", 
        nr %in% 1:2 ~ "East Trench"
      ),
      site = factor(site, levels = c("West Trench", "Central Site", "East Trench")),
      # Ensure kg/ha/d is calculated for all rows
      flux_kgha = flux_umol_m2s * 0.0864 * molar_mass / 100
    ) %>%
    filter(!is.na(site))
  
  # 2. GLOBAL SCALE FACTOR (Ensures fixed scale consistency)
  max_umol <- max(data_site$flux_umol_m2s, na.rm = TRUE)
  max_kgha <- max(data_site$flux_kgha, na.rm = TRUE)
  scale_f  <- max_umol / max_kgha
  
  # 3. SITE MEANS
  mean_site <- data_site %>%
    filter(site != "West Trench") %>%
    mutate(datehour = floor_date(timestamp, "hour")) %>%
    group_by(site, datehour) %>%
    summarise(
      mean_flux = mean(.data[[flux_col]], na.rm = TRUE),
      sd_flux   = sd(.data[[flux_col]], na.rm = TRUE),
      .groups = "drop"
    )
  
  # 4. PLOTTING WITH FIXED SCALES AND DUAL AXIS
  p_sites <- ggplot(data_site, aes(timestamp, .data[[flux_col]], color = Sensor)) +
    geom_line(linewidth = 0.8, alpha = 0.8) +
    geom_point(size = 1.2, alpha = 0.7) +
    # Fixed scale across sites
    facet_wrap(~site, scales = "fixed", ncol = 1) +
    # Dual axis setup
    scale_y_continuous(
      name = bquote(.(gas_name) ~ "Flux (" * mu * "mol" ~ m^-2 ~ s^-1 * ")"),
      sec.axis = sec_axis(~ . / scale_f, name = bquote(.(gas_name) ~ "Flux (kg" ~ ha^-1 ~ d^-1 * ")"))
    ) +
    labs(title = paste(gas_name, "Fluxes by Site (Fixed Scale + Dual Axis)"),
         x = "Time", color = "Chamber") +
    theme_bw() + theme(legend.position = "bottom")
  
  # Add mean/ribbon
  if (nrow(mean_site) > 0) {
    p_sites <- p_sites +
      geom_line(data = mean_site, 
                aes(x = datehour, y = mean_flux, group = site),
                linewidth = 0.7, color = "black", linetype = "dashed") +
      geom_ribbon(data = mean_site,
                  aes(x = datehour, ymin = pmax(mean_flux - sd_flux, 0), 
                      ymax = mean_flux + sd_flux, group = site),
                  alpha = 0.25, fill = "gray50", inherit.aes = FALSE)
  }
  
  print(p_sites)
  ggsave(paste0("flux_sites_", tolower(gas_name), "_dual_fixed.png"), p_sites, width = 10, height = 12)
  return(data_site)
}

# --- EXECUTE SITE ANALYSIS ---
# Molar masses: CH4=16.04, N2O=44.01, CO2=44.01
ch4_sites <- add_site_and_plot(ch4_final, "CH4", 16.04)
n2o_sites <- add_site_and_plot(n2o_final, "N2O", 44.01)
co2_sites <- add_site_and_plot(co2_final, "CO2", 44.01)

# ==============================================================================
# For Seasons
# 1. Season assignment: Meteorological seasons (Spring, Summer, Autumn, Winter)
# 2. Cumulative integration grouped by Season and Site
# ==============================================================================

# --- 1. DEFINE SEASONAL FUNCTION ---
get_season <- function(date) {
  month <- month(date)
  case_when(
    month %in% c(3, 4, 5) ~ "Spring",
    month %in% c(6, 7, 8) ~ "Summer",
    month %in% c(9, 10, 11) ~ "Autumn",
    TRUE ~ "Winter"
  )
}

# --- 2. ANNUALIZED FLUX BY SITE AND SEASON ---
calculate_seasonal_flux <- function(data) {
  data %>%
    mutate(
      season = get_season(timestamp),
      trench_status = ifelse(site == "Central Site", "No Trench", "Trench")
    ) %>%
    arrange(timestamp) %>%
    group_by(Sensor, site, trench_status, season) %>%
    # Calculate daily mass flux based on time delta
    mutate(dt = as.numeric(difftime(timestamp, lag(timestamp), units = "days"))) %>%
    replace_na(list(dt = 0)) %>%
    mutate(daily_mass = (flux_kgha + lag(flux_kgha, default = first(flux_kgha))) / 2 * dt) %>%
    summarise(
      seasonal_flux_kgha = sum(daily_mass, na.rm = TRUE),
      .groups = "drop"
    )
}

# --- 3. EXECUTION ---
ch4_seas <- calculate_seasonal_flux(ch4_sites)
n2o_seas <- calculate_seasonal_flux(n2o_sites)
co2_seas <- calculate_seasonal_flux(co2_sites)

# --- 4. VISUALIZATION ---
# Plotting total seasonal accumulation by site and trench status
plot_seasonal_flux <- function(seas_data, gas_name) {
  ggplot(seas_data, aes(x = season, y = seasonal_flux_kgha, fill = trench_status)) +
    geom_boxplot(alpha = 0.7) +
    facet_wrap(~site, scales = "free_y") +
    labs(title = paste("Seasonal Flux Accumulation:", gas_name),
         y = bquote(.(gas_name) ~ "Accumulation (kg" ~ ha^-1 ~ season^-1 * ")"), x = "Season") +
    theme_bw()
}

# Execution of seasonal plots
print(plot_seasonal_flux(ch4_seas, "CH4"))
print(plot_seasonal_flux(n2o_seas, "N2O"))
print(plot_seasonal_flux(co2_seas, "CO2"))


# ==============================================================================
# TOTAL PERIOD ACCUMULATION PER CHAMBER
# Purpose: Calculates and plots the total mass accumulated (kg/ha) 
# by each specific chamber (P1-P8) over the full study duration.
# ==============================================================================

# --- 1. CALCULATE TOTAL PERIOD FLUX PER CHAMBER ---
calculate_total_period_flux <- function(data) {
  data %>%
    arrange(timestamp) %>%
    group_by(Sensor, site, nr) %>%
    # Calculate integration of total mass over the full timeline
    mutate(dt = as.numeric(difftime(timestamp, lag(timestamp), units = "days"))) %>%
    replace_na(list(dt = 0)) %>%
    mutate(daily_mass = (flux_kgha + lag(flux_kgha, default = first(flux_kgha))) / 2 * dt) %>%
    summarise(
      total_accumulated_kgha = sum(daily_mass, na.rm = TRUE),
      site = first(site),
      trench_status = ifelse(site == "Central Site", "No Trench", "Trench"),
      .groups = "drop"
    )
}

# --- 2. EXECUTION ---
ch4_total <- calculate_total_period_flux(ch4_sites)
n2o_total <- calculate_total_period_flux(n2o_sites)
co2_total <- calculate_total_period_flux(co2_sites)

# --- 3. PLOTTING: TOTAL ACCUMULATION BY CHAMBER ---
# Redefine the function with a new name to bypass any cached memory
plot_chamber_totals <- function(input_data, gas_name) {
  ggplot(input_data, aes(x = reorder(Sensor, total_accumulated_kgha), 
                         y = total_accumulated_kgha, 
                         fill = trench_status)) +
    geom_col(alpha = 0.8) +
    facet_wrap(~site, scales = "free_x") +
    labs(title = paste("Total Mass Accumulated per Chamber:", gas_name),
         y = bquote("Total" ~ .(gas_name) ~ "Accumulation (kg" ~ ha^-1 * ")"), x = "Chamber ID") +
    scale_fill_manual(values = c("Trench" = "steelblue", "No Trench" = "darkorange")) +
    theme_bw() + 
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
}

# Run the new function
print(plot_chamber_totals(ch4_total, "CH4"))
print(plot_chamber_totals(n2o_total, "N2O"))
print(plot_chamber_totals(co2_total, "CO2"))
                          