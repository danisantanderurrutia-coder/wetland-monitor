# =============================================================================
# Script 08 - Final GHG Budgets and Curation Figures (16b, 17, 18)
# =============================================================================
library(dplyr)
library(ggplot2)
library(lubridate)
library(tidyr)

source("load_pipeline.R")

message("Starting Script 08: GHG Budgets and Final Visualizations...")

# Load ML gap-filled data
if (!file.exists(path_07_ml_gapfill)) stop("File not found: ", path_07_ml_gapfill)
data <- read.csv(path_07_ml_gapfill)
data$timestamp <- as.POSIXct(data$timestamp, tz = "UTC")
data$date <- as.Date(data$timestamp)

# 1. Conversion Factors
# CO2: umol m-2 s-1 -> gC m-2 per 30-min
# CH4: nmol m-2 s-1 -> g CH4 m-2 per 30-min
#   (nmol -> mol = 1e-9; * 16.04 g/mol * 1800 s)
data$NEE_ML_gC <- data$NEE_RF_gapfilled * 1800 * 12.011 * 10^(-6)
data$CH4_ML_g <- 0
if ("CH4_RF_gapfilled" %in% names(data)) {
  data$CH4_ML_g <- data$CH4_RF_gapfilled * 1800 * 16.04 * 10^(-9)
}

# 2. Daily Aggregation
daily <- data %>%
  group_by(date) %>%
  summarise(
    # Averages of variables
    SWC_50cm = mean(SWC_50cm, na.rm = TRUE),
    GWL = mean(SWC_5cm, na.rm=TRUE), # Proxying water level behavior if actual pegel is missing
    # Sum of fluxes (multiplying mean by 48 ensures NA gaps in a day are extrapolated if we use na.rm=T)
    NEE_LT50_gC = mean(NEEges_gC, na.rm=TRUE) * 48,
    NEE_LT5_gC  = mean(NEEges_5cm_gC, na.rm=TRUE) * 48,
    NEE_MDS_gC  = mean(NEE_f_gC, na.rm=TRUE) * 48,
    NEE_ML_gC   = mean(NEE_ML_gC, na.rm=TRUE) * 48,
    CH4_ML_g    = mean(CH4_ML_g, na.rm=TRUE) * 48
  ) %>%
  # Fill missing dates to make a continuous time series
  complete(date = seq(min(date, na.rm=TRUE), max(date, na.rm=TRUE), by = "1 day")) %>%
  arrange(date)

# Replace NAs that spawned from complete() with 0 for cumulative sums
daily <- daily %>% mutate_if(is.numeric, ~replace_na(., 0))

# 3. Calculate Cumulative Sums
daily$Cum_NEE_LT50 <- cumsum(daily$NEE_LT50_gC)
daily$Cum_NEE_LT5 <- cumsum(daily$NEE_LT5_gC)
daily$Cum_NEE_ML <- cumsum(daily$NEE_ML_gC)
daily$Cum_NEE_MDS <- cumsum(daily$NEE_MDS_gC)
daily$Cum_CH4 <- cumsum(daily$CH4_ML_g)

# Calculate CO2-eq (100y horizon)
daily$CH4_CO2eq_g <- daily$CH4_ML_g * GWP_100_CH4
daily$Cum_CH4_CO2eq <- cumsum(daily$CH4_CO2eq_g)

# CO2 gC to g CO2 (x 3.666)
daily$Cum_CO2_Total <- daily$Cum_NEE_ML * 3.666
daily$Cum_Net_GHG_CO2eq <- daily$Cum_CO2_Total + daily$Cum_CH4_CO2eq

date_start <- min(daily$date)
date_end <- max(daily$date)

# =============================================================================
# FIGURE 16b: Daily CH4 Budgets
# =============================================================================
if ("CH4_RF_gapfilled" %in% names(data)) {
  p16b <- ggplot(daily, aes(x = date)) +
    geom_bar(aes(y = CH4_ML_g, fill = "CH4 Daily Emission"), stat = "identity", alpha = 0.8) +
    scale_y_continuous(
      name = "Daily CH4 (g / m2 / d)"
    ) +
    scale_fill_manual(values = get_klimafarm_colors(c("CH4 Daily Emission"))) +
    labs(
      title = "Daily Methane Budgets",
      subtitle = "Tracking the anaerobic respiration spikes triggered by hydrological changes | Process: Random Forest Daily Sums",
      fill = "", color = ""
    ) +
    theme_klimafarm() +
    theme(legend.position = "bottom")
  
  ggsave(file.path(pipeline_dir, "16b_CH4_Daily_Budgets.png"), plot = p16b, width = 10, height = 6, dpi = 300)
}

# =============================================================================
# FIGURE 17: Cumulative carbon budgets diverging by methodology
# =============================================================================
p17 <- ggplot(daily, aes(x = date)) +
  geom_line(aes(y = Cum_NEE_LT50, color = "Lloyd-Taylor (50cm Temp)"), size = 1.2) +
  geom_line(aes(y = Cum_NEE_LT5, color = "Lloyd-Taylor (5cm Temp)"), size = 1.2, linetype = "dashed") +
  geom_line(aes(y = Cum_NEE_MDS, color = "MDS Algorithm"), size = 1.2, alpha=0.8, linetype="dotdash") +
  geom_line(aes(y = Cum_NEE_ML, color = "Machine Learning (RF)"), size = 1.2, alpha=0.8) +
  scale_color_manual(values = get_klimafarm_colors(c("Lloyd-Taylor (50cm Temp)", "Lloyd-Taylor (5cm Temp)", "MDS Algorithm", "Machine Learning (RF)"))) +
  geom_hline(yintercept = 0, color = "black", size = 0.5) +
  labs(
    title = "Cumulative Carbon Sink Divergence",
    subtitle = "The physical reality of the site splits based on methodology (Shallow vs Deep Soil vs MDS vs ML) | Process: Cumulative sum of daily NEE",
    y = "Cumulative NEE (gC / m2)", x = "Date",
    color = "Model Methodology"
  )
ggsave(file.path(pipeline_dir, "17_Cumulative_Budgets_Methodologies.png"), plot = p17, width = 10, height = 6, dpi = 300)

# =============================================================================
# FIGURE 18: Net GHG Balance Pre vs Post
# =============================================================================
# Here we plot the accumulation of CO2 vs CH4 (in CO2 equivalents) to show the net balance
df_ghg <- daily %>% select(date, Cum_CO2_Total, Cum_CH4_CO2eq, Cum_Net_GHG_CO2eq) %>%
  pivot_longer(cols = -date, names_to = "Variable", values_to = "Value")

# Rename for plot
df_ghg$Variable <- factor(df_ghg$Variable, levels = c("Cum_CH4_CO2eq", "Cum_CO2_Total", "Cum_Net_GHG_CO2eq"),
                          labels = c("Cumulative CH4 (CO2-eq)", "Cumulative CO2 (Net)", "Net GHG Balance"))

p18 <- ggplot(df_ghg, aes(x = date, y = Value, color = Variable, fill = Variable)) +
  geom_area(aes(y = ifelse(Variable == "Cumulative CH4 (CO2-eq)", Value, 0)), alpha = 0.4) +
  geom_line(size = 1.2) +
  scale_color_manual(values = c("Cumulative CH4 (CO2-eq)" = "#E41A1C", "Cumulative CO2 (Net)" = "#1F78B4", "Net GHG Balance" = "black")) +
  scale_fill_manual(values = c("Cumulative CH4 (CO2-eq)" = "#E41A1C", "Cumulative CO2 (Net)" = "#1F78B4", "Net GHG Balance" = "black")) +
  geom_hline(yintercept = 0, color = "black", linetype = "dashed") +
  labs(
    title = "Net GHG Balance: The invisible burden of Methane",
    subtitle = "While the wetland is a CO2 sink, CH4 emissions shift the net balance towards warming | Process: 100-year GWP horizon",
    y = "Cumulative GHG (g CO2-eq / m2)", x = "Date"
  )
ggsave(file.path(pipeline_dir, "18_GHG_Balance_Pre_vs_Post_NEW.png"), plot = p18, width = 10, height = 6, dpi = 300)

write.csv(daily, path_07_ml_budgets, row.names = FALSE)
message("Script 08 finished. Data saved to: ", path_07_ml_budgets)
