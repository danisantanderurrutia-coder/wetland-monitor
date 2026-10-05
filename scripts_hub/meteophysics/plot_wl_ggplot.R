library(dplyr)
library(lubridate)
library(ggplot2)
library(tidyr)
source("pipeline_config.R")

# Read the gapfilled biomet data
df <- read.csv("FluxCalc_output/03_lmd_cl_biomet_gap_filling.csv")
df$timestamp <- as.POSIXct(df$timestamp, format="%Y-%m-%d %H:%M:%S", tz="UTC")

# Filter for 2024
df_2024 <- df %>% filter(year(timestamp) == 2024)

# Calculate monthly means for TA
monthly_T <- df_2024 %>%
  mutate(month = as.numeric(format(timestamp, "%m"))) %>%
  group_by(month) %>%
  summarise(T_mean = mean(TA_f, na.rm = TRUE))

# Load DWD precipitation
monthly_P <- read.csv("FluxCalc_output/DWD_monthly_precip_2024.csv")

# Merge
monthly <- full_join(monthly_T, monthly_P, by="month") %>%
  mutate(month_label = month(month, label = TRUE, abbr = TRUE))

# Calculate annual means
mean_T <- mean(monthly$T_mean, na.rm=TRUE)
sum_P <- sum(monthly$P_DWD, na.rm=TRUE)

# Base ratio: 10 C = 20 mm -> scaling factor is 2
scale_factor <- 2

p <- ggplot(monthly, aes(x = month_label)) +
  geom_bar(aes(y = P_DWD / scale_factor), stat = "identity", fill = "steelblue", alpha = 0.7) +
  geom_line(aes(y = T_mean, group = 1), color = "firebrick", linewidth = 1.5) +
  geom_point(aes(y = T_mean), color = "firebrick", size = 3) +
  scale_y_continuous(
    name = "Temperature (deg C)",
    sec.axis = sec_axis(~ . * scale_factor, name = "Precipitation (mm)"),
    limits = c(0, max(max(monthly$T_mean, na.rm=TRUE), max(monthly$P_DWD/scale_factor, na.rm=TRUE)) * 1.1)
  ) +
  labs(
    title = sprintf("Kiel-Altenholz / Erfde DWD (2024) [15m a.s.l.]"),
    subtitle = sprintf("Mean Annual Temp: %.1f deg C | Total Precip: %.0f mm", mean_T, sum_P),
    x = "Month"
  ) +
  theme_klimafarm() +
  theme(
    axis.title.y.left = element_text(color = "firebrick"),
    axis.text.y.left = element_text(color = "firebrick"),
    axis.title.y.right = element_text(color = "steelblue"),
    axis.text.y.right = element_text(color = "steelblue")
  )

plots_dir <- file.path(pipeline_dir, "Plots")
ggsave(file.path(plots_dir, "24_Walter_Lieth_2024.png"), p, width = 8, height = 6)
message("Saved Walter Lieth diagram to FluxCalc_output/Plots/24_Walter_Lieth_2024.png")
