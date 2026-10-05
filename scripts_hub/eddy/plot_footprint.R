library(tidyr)
library(ggplot2)
library(dplyr)
# Paths
source("pipeline_config.R")
source("load_pipeline.R")
plot_dir <- file.path(dirname(path_06_ltmm_gapfill), "Plots")

# Read data
data <- read.csv(path_04_qc_flux, header = TRUE, sep = ",", dec=".")
data$timestamp <- as.POSIXct(data$timestamp, format = "%Y-%m-%d %H:%M:%S", tz = "GMT")

# We need wind_dir (wd) and x_peak
if(!("wind_dir" %in% names(data)) | !("x_peak" %in% names(data))) {
  stop("Missing wind_dir or x_peak in data.")
}

# Filter out extreme outliers in x_peak (e.g. > 1000m) which are usually bad L
df <- data %>%
  filter(!is.na(wind_dir) & !is.na(x_peak)) %>%
  filter(x_peak > 0 & x_peak < 600) %>% # Filter for realistic cropland boundaries
  mutate(wind_speed_cat = cut(wind_speed,
                              breaks = c(-Inf, 2, 4, 6, Inf),
                              labels = c("< 2", "2 - 4", "4 - 6", "> 6")))

# 1. Polar Scatter Plot using ggplot2
p_polar <- ggplot(df, aes(x = wind_dir, y = x_peak)) +
  geom_point(aes(color = wind_speed_cat), alpha = 0.0, size = 1.2) +
  scale_color_manual(name = "Wind Speed (m/s):",
                     values = c("< 2" = "cyan", "2 - 4" = "yellow", "4 - 6" = "orange", "> 6" = "red")) +
  guides(color = guide_legend(override.aes = list(alpha = 1, size = 4))) +
  coord_polar(theta = "x", start = 0) +
  scale_x_continuous(limits = c(0, 360), breaks = seq(0, 360, by = 45),
                     labels = c("N", "NE", "E", "SE", "S", "SW", "W", "NW", "")) +
  scale_y_continuous(limits = c(0, max(df$x_peak, na.rm=TRUE))) +
  labs(title = NULL,
       x = NULL,
       y = NULL) +
  theme_klimafarm() +
  theme(legend.position = "bottom",
        legend.background = element_rect(fill = "black", color = "white", linewidth = 0.5),
        legend.key = element_rect(fill = "black", color = NA),
        legend.text = element_text(color = "white", size = 11),
        legend.title = element_text(color = "white", size = 11, face = "bold"),
        text = element_text(color = "white"),
        axis.text = element_text(color = "white"),
        axis.title = element_text(color = "white"),
        panel.grid.major = element_line(color = scales::alpha("white", 0.6), linewidth = 0.5),
        panel.grid.minor = element_blank(),
        plot.background = element_rect(fill = "transparent", color = NA),
        panel.background = element_rect(fill = "transparent", color = NA))

ggplot2::ggsave("FluxCalc_output/Plots/17_Footprint_Polar_Scatter_v4.png", plot = p_polar, width = 8, height = 8, bg = "transparent")

message("Footprint plotting complete.")
