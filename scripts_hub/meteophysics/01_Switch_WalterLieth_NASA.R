source("Kiel Code/pipeline_config.R")
# ==============================================================================
# VISUALIZATION SWITCH: WALTER-LIETH CLIMATE DIAGRAM (VIA NASA POWER)
# Purpose: Automatically fetch the last 25 years of climate data (1999-2024) 
# from NASA POWER using the exact site coordinates to generate a Walter-Lieth diagram.
# ==============================================================================

if(!require(nasapower)) install.packages("nasapower", repos="http://cran.us.r-project.org")
if(!require(ggplot2)) install.packages("ggplot2", repos="http://cran.us.r-project.org")
if(!require(dplyr)) install.packages("dplyr", repos="http://cran.us.r-project.org")
if(!require(tidyr)) install.packages("tidyr", repos="http://cran.us.r-project.org")

library(nasapower)
library(ggplot2)
library(dplyr)
library(tidyr)

lon <- 9.3
lat <- 54.3

print("Downloading last 25 years of climate data from NASA POWER API...")
# Fetch data from 1999 to 2023
nasa_data <- get_power(
  community = "ag",
  lonlat = c(lon, lat),
  pars = c("T2M", "PRECTOTCORR"), 
  dates = c("1999-01-01", "2023-12-31"),
  temporal_api = "monthly"
)

print("Processing climatological averages...")

# NASA POWER returns months as columns JAN to DEC. We average across years.
monthly_avg <- nasa_data %>%
  group_by(PARAMETER) %>%
  summarise(across(JAN:DEC, \(x) mean(x, na.rm = TRUE)))

temp_row <- monthly_avg %>% filter(PARAMETER == "T2M") %>% select(JAN:DEC) %>% as.numeric()
prec_rate_row <- monthly_avg %>% filter(PARAMETER == "PRECTOTCORR") %>% select(JAN:DEC) %>% as.numeric()

days_in_month <- c(31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
prec_total_row <- prec_rate_row * days_in_month

months <- factor(month.abb, levels = month.abb)
df <- data.frame(
  Month = months,
  Temp = temp_row,
  Prec = prec_total_row
)

print("Generating Walter-Lieth Diagram using ggplot2...")

scale_factor <- 2

p <- ggplot(df, aes(x = Month)) +
  geom_bar(aes(y = Prec / scale_factor), stat="identity", fill="#4682B4", alpha=0.6) +
  geom_line(aes(y = Temp, group=1), color="#DC143C", linewidth=1.5) +
  geom_point(aes(y = Temp), color="#DC143C", size=3) +
  scale_y_continuous(
    name = expression("Temperature ("*~degree*C*")"),
    sec.axis = sec_axis(~ . * scale_factor, name = "Precipitation (mm)")
  ) +
  labs(
    title = "Klimafarm Wallen: Climate Diagram",
    subtitle = "NASA POWER 25-Year Average (1999-2023)",
    x = ""
  ) +
  theme_bw() +
  theme(
    axis.title.y.left = element_text(color = "#DC143C", face="bold"),
    axis.text.y.left = element_text(color = "#DC143C"),
    axis.title.y.right = element_text(color = "#4682B4", face="bold"),
    axis.text.y.right = element_text(color = "#4682B4"),
    plot.title = element_text(hjust = 0.5, face="bold"),
    plot.subtitle = element_text(hjust = 0.5)
  )

ggsave("/Users/danielsantander/Documents/Tesis/Walter_Lieth_NASA.png", plot=p, width=8, height=6, dpi=300)

print("Walter-Lieth Climate Diagram generated successfully at /Users/danielsantander/Documents/Tesis/Walter_Lieth_NASA.png")
