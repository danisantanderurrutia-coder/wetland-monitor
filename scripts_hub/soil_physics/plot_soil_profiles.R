# ==============================================================================
# Soil Profile Visualization (Klimafarm Wallen)
# ==============================================================================
library(readxl)
library(dplyr)
library(ggplot2)

source("../Reproducibility_Package/scripts/pipeline_config.R")
file_path <- "soil_profiles_Wallen.xlsx"
df <- read_excel(file_path)

# Filter for the relevant core
profile <- df %>% 
  filter(siteID == "ets_04") %>%
  mutate(
    # Ensure depths are numeric
    top_m = as.numeric(top_m),
    bottom_m = as.numeric(bottom_m),
    # Calculate midpoints for text labels
    mid_m = (top_m + bottom_m) / 2
  )

# Basic classification for colors
profile <- profile %>%
  mutate(
    Material = case_when(
      grepl("^H", soil_type) ~ "Peat (Turf)",
      grepl("^T", soil_type) ~ "Mineral (Clay/Sand)",
      TRUE ~ "Other"
    )
  )

# Create two views for faceting
df_full <- profile %>% mutate(view = "Full Profile (0 - 4.5m)")
df_zoom <- profile %>% 
  filter(top_m >= -1.2) %>% 
  mutate(
    view = "Top 1.2m Zoom",
    bottom_m = ifelse(bottom_m < -1.2, -1.2, bottom_m),
    mid_m = (top_m + bottom_m) / 2
  )

df_both <- bind_rows(df_full, df_zoom)
df_both$view <- factor(df_both$view, levels = c("Full Profile (0 - 4.5m)", "Top 1.2m Zoom"))

# Create bounding box data for the full profile only
bbox_data <- data.frame(
  xmin = -0.52, xmax = 0.52, ymin = -1.2, ymax = 0,
  view = factor("Full Profile (0 - 4.5m)", levels = levels(df_both$view))
)

p_combined <- ggplot(df_both) +
  # Draw the horizons as rectangles
  geom_rect(aes(xmin = -0.5, xmax = 0.5, ymin = bottom_m, ymax = top_m, fill = Material), color = "black") +
  # Add horizon labels
  geom_text(aes(x = 0, y = mid_m, label = horizon_name), size = 3.5, color = "white", fontface = "bold") +
  # Add sensor depths
  geom_hline(yintercept = -0.05, color = "red", linetype = "dashed", linewidth = 1) +
  geom_hline(yintercept = -0.25, color = "orange", linetype = "dashed", linewidth = 1) +
  geom_hline(yintercept = -0.50, color = "yellow", linetype = "dashed", linewidth = 1) +
  # Annotate the sensors
  geom_text(data = df_both %>% filter(view == "Top 1.2m Zoom") %>% slice(1), 
            aes(x = 0.55, y = -0.05, label = "TS_5cm"), color = "red", hjust = 0, fontface = "bold") +
  geom_text(data = df_both %>% filter(view == "Top 1.2m Zoom") %>% slice(1), 
            aes(x = 0.55, y = -0.25, label = "TS_25cm"), color = "orange", hjust = 0, fontface = "bold") +
  geom_text(data = df_both %>% filter(view == "Top 1.2m Zoom") %>% slice(1), 
            aes(x = 0.55, y = -0.50, label = "TS_50cm"), color = "yellow", hjust = 0, fontface = "bold") +
  # Draw red bounding box on the full profile to indicate the zoom region
  geom_rect(data = bbox_data, aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax), 
            fill = NA, color = "red", linewidth = 1.2, linetype = "solid") +
  scale_fill_manual(values = c("Peat (Turf)" = "#4E3629", "Mineral (Clay/Sand)" = "#A68A64", "Other" = "gray")) +
  scale_x_continuous(limits = c(-1, 1.5)) +
  scale_y_continuous(name = "Depth (m)") +
  facet_wrap(~view, scales = "free_y") +
  labs(title = NULL, x = "") +
  theme_klimafarm() +
  theme(
    axis.text.x = element_blank(),
    axis.ticks.x = element_blank(),
    panel.grid.major.x = element_blank(),
    panel.grid.minor.x = element_blank(),
    text = element_text(face = "bold")
  )

ggsave("24_Soil_Stratigraphy_Wallen_Combined.png", p_combined, width = 10, height = 8)
message("Saved 24_Soil_Stratigraphy_Wallen_Combined.png")
