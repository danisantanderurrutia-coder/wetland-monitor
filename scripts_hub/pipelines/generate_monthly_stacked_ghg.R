library(dplyr)
library(ggplot2)
library(tidyr)
library(zoo)
source("pipeline_config.R")
source("load_pipeline.R")

carbon_fraction <- 12.011 / 44.01

# 1. Load Data
ec_daily <- read.csv("FluxCalc_output/05_lmd_cl_gap_filling_budgets_MDS.csv")
ec_daily$Date <- as.Date(ec_daily$date)

ec_ml_daily <- read.csv("FluxCalc_output/07_lmd_cl_gap_filling_budgets_ML.csv")
ec_ml_daily$Date <- as.Date(ec_ml_daily$date)

chamber_raw <- read.csv(path_chamber_data)
names(chamber_raw) <- make.names(names(chamber_raw))
chamber_raw$datum_date <- as.Date(chamber_raw$datum, format = "%d/%m/%Y")
chamber_raw$height_cm <- ifelse(chamber_raw$datum_date >= as.Date("2024-05-27") | (chamber_raw$datum_date == as.Date("2024-02-19") & chamber_raw$nr %in% c(7,8)), 42, 16)
chamber_raw$ppm.min <- as.numeric(as.character(chamber_raw$ppm.min))
chamber_raw$ppm.min.n2o <- as.numeric(as.character(chamber_raw$ppm.min.n2o))

calc_flux <- function(slope, height_cm) {
  molar_density <- 101.3 * 1000 / (8.314 * 288.15) 
  flux_umol_m2s <- slope * molar_density * (height_cm / 100) / 60
  return(flux_umol_m2s)
}

chamber_ch4 <- chamber_raw %>% filter(!is.na(ppm.min), !is.na(datum_date)) %>%
  rowwise() %>% mutate(flux_g_m2_d = calc_flux(ppm.min, height_cm) * 0.0864 * 16.04) %>%
  group_by(Date = datum_date) %>% summarise(CH4_Chamber_g = mean(flux_g_m2_d, na.rm = TRUE))

chamber_n2o <- chamber_raw %>% filter(!is.na(ppm.min.n2o), !is.na(datum_date)) %>%
  rowwise() %>% mutate(flux_g_m2_d = calc_flux(ppm.min.n2o, height_cm) * 0.0864 * 44.01) %>%
  group_by(Date = datum_date) %>% summarise(N2O_Chamber_g = mean(flux_g_m2_d, na.rm = TRUE))

# 2. Build Continuous Daily Series
date_seq <- data.frame(Date = seq(min(ec_daily$Date), max(ec_daily$Date), by = "1 day"))

master <- date_seq %>%
  left_join(ec_daily %>% select(Date, CO2_gC = NEE_1_gC), by = "Date") %>%
  left_join(ec_ml_daily %>% select(Date, CH4_EC_g = CH4_ML_g), by = "Date") %>%
  left_join(chamber_ch4, by = "Date") %>%
  left_join(chamber_n2o, by = "Date") %>%
  arrange(Date) %>%
  mutate(
    CH4_Chamber_Interp = na.approx(CH4_Chamber_g, rule = 2),
    N2O_Chamber_Interp = na.approx(N2O_Chamber_g, rule = 2),
    CH4_Final_g = ifelse(is.na(CH4_EC_g), CH4_Chamber_Interp, CH4_EC_g)
  )

# Calculate Daily GWP Equivalents
master <- master %>%
  mutate(
    CH4_100_gCeq = CH4_Final_g * 28 * carbon_fraction,
    CH4_20_gCeq  = CH4_Final_g * 84 * carbon_fraction,
    N2O_100_gCeq = N2O_Chamber_Interp * 265 * carbon_fraction,
    N2O_20_gCeq  = N2O_Chamber_Interp * 264 * carbon_fraction
  )

# 3. Aggregation to MONTHLY for beautiful distinct bars
monthly_master <- master %>%
  mutate(Month = as.Date(format(Date, "%Y-%m-01"))) %>%
  group_by(Month) %>%
  summarise(
    CO2_Monthly = sum(CO2_gC, na.rm = TRUE),
    CH4_100_Monthly = sum(CH4_100_gCeq, na.rm = TRUE),
    CH4_20_Monthly  = sum(CH4_20_gCeq, na.rm = TRUE),
    N2O_100_Monthly = sum(N2O_100_gCeq, na.rm = TRUE),
    N2O_20_Monthly  = sum(N2O_20_gCeq, na.rm = TRUE),
    .groups = "drop"
  ) %>%
  mutate(
    Net_100 = CO2_Monthly + CH4_100_Monthly + N2O_100_Monthly,
    Net_20  = CO2_Monthly + CH4_20_Monthly + N2O_20_Monthly
  )

# 4. Prepare Data for Plotting
plot_monthly_stacked <- function(gwp_horizon) {
  
  if(gwp_horizon == 100) {
    df_long <- monthly_master %>% select(Month, CO2 = CO2_Monthly, CH4 = CH4_100_Monthly, N2O = N2O_100_Monthly)
    df_net <- monthly_master %>% select(Month, Net = Net_100)
    title_suffix <- "100-Year Horizon (GWP-100)"
    filename <- "25b_Monthly_Stacked_GHG_100y.png"
  } else {
    df_long <- monthly_master %>% select(Month, CO2 = CO2_Monthly, CH4 = CH4_20_Monthly, N2O = N2O_20_Monthly)
    df_net <- monthly_master %>% select(Month, Net = Net_20)
    title_suffix <- "20-Year Horizon (GWP-20)"
    filename <- "26b_Monthly_Stacked_GHG_20y.png"
  }
  
  df_long <- df_long %>% pivot_longer(cols = c(CO2, CH4, N2O), names_to = "Gas", values_to = "Flux")
  df_long$Gas <- factor(df_long$Gas, levels = c("N2O", "CH4", "CO2"))
  
  p <- ggplot() +
    # Stacked bars for monthly contributions
    geom_col(data = df_long, aes(x = Month, y = Flux, fill = Gas), width = 20, color = "black", alpha = 0.9) +
    # Net Balance Points + Line
    geom_line(data = df_net, aes(x = Month, y = Net, color = "Net GHG Balance"), linewidth = 1) +
    geom_point(data = df_net, aes(x = Month, y = Net, color = "Net GHG Balance"), size = 3) +
    geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.8) +
    scale_fill_manual(values = c("CO2" = "#1F78B4", "CH4" = "#E31A1C", "N2O" = "#33A02C")) +
    scale_color_manual(name = "", values = c("Net GHG Balance" = "black")) +
    scale_x_date(date_breaks = "1 month", date_labels = "%b %Y") +
    labs(
      title = paste("Monthly Contributions of Greenhouse Gases -", title_suffix),
      subtitle = "Continuous EC (CO2, CH4) and interpolated Chamber (gap-filled CH4, N2O) fluxes aggregated monthly",
      x = "Date",
      y = expression(paste("Net Monthly GHG Flux (gC-CO"[2], "eq ", m^-2, " ", month^-1, ")")),
      fill = "Gas Species"
    ) +
    theme_klimafarm() +
    theme(legend.position = "right")
  
  ggsave(file.path("FluxCalc_output/Plots", filename), p, width = 10, height = 6, dpi = 300)
  message(paste("Saved", filename))
}

plot_monthly_stacked(100)
plot_monthly_stacked(20)
