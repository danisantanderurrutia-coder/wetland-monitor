library(ggplot2)
library(dplyr)
library(REddyProc)
library(lubridate)

# Clear the workspace
rm(list = ls())

# Load shared paths and file-selection helper (run with wd = project folder)
source("load_pipeline.R")

# --- Raw inputs: from pipeline_config.R or file dialogs ---
use_config_paths <- isTRUE(use_eddypro_paths_from_config) &&
  file.exists(path_eddypro_full_output) &&
  file.exists(path_eddypro_biomet)

if (use_config_paths) {
  path_ec <- path_eddypro_full_output
  path_biomet <- path_eddypro_biomet
  path_fluxnet <- path_eddypro_fluxnet
  message("EddyPro full output: ", path_ec)
  message("EddyPro biomet:      ", path_biomet)
  message("EddyPro fluxnet:     ", path_fluxnet)
} else {
  path_ec <- choose_eddypro_file(
    paste(
      "STEP 1 of 2 — EddyPro FULL OUTPUT",
      "Expected file: *full_output* *_adv.csv (advanced export).",
      sep = "\n"
    )
  )
  path_biomet <- choose_eddypro_file(
    paste(
      "STEP 2 of 2 — EddyPro BIOMET",
      "Expected file: *biomet* *_adv.csv (advanced export).",
      sep = "\n"
    )
  )
}

# Read EC (full output): header row 2, data from row 4
headers_EC <- read.csv(path_ec,
                       skip = 1, header = FALSE, nrows = 1, as.is = TRUE)
EC <- read.csv(path_ec,
               header = FALSE, sep = ",", quote = "", dec = ".", skip = 3)
colnames(EC) <- headers_EC
EC$timestamp <- parse_eddypro_timestamp(EC)

# Select key EC columns
# Note: We use any_of to not crash if some CH4 columns are missing in full output
data_EC <- EC %>%
  select(timestamp, DOY, date, time, H, qc_H, LE, qc_LE, co2_flux, qc_co2_flux,
         any_of(c("ch4_flux", "qc_ch4_flux")),
         co2_mixing_ratio, co2_mole_fraction, h2o_mixing_ratio, h2o_mole_fraction, L, max_wind_speed,
         sonic_temperature, `u*`, wind_dir, wind_speed, x_peak, `(z-d)/L`, air_density, air_temperature, air_pressure,
         v_var)

# Read Fluxnet file to get CH4 (FCH4) if available
if (exists("path_fluxnet") && file.exists(path_fluxnet)) {
  # Fluxnet file has 1 header line and uses TIMESTAMP_END
  FN <- read.csv(path_fluxnet, header = TRUE, sep = ",", quote = "", dec = ".", as.is = TRUE)
  FN$timestamp <- as.POSIXct(as.character(FN$TIMESTAMP_END), format = "%Y%m%d%H%M", tz = "UTC")
  
  if ("FCH4" %in% names(FN)) {
    FN_CH4 <- FN %>% select(timestamp, FCH4, FCH4_SSITC_TEST)
    data_EC <- data_EC %>% 
      left_join(FN_CH4, by = "timestamp") %>%
      rename(ch4_flux = FCH4, qc_ch4_flux = FCH4_SSITC_TEST)
    message("Successfully joined FCH4 from Fluxnet file.")
  } else {
    message("FCH4 not found in Fluxnet file.")
  }
}


# Load our gap-filled external biomet data
path_ext_biomet <- file.path(pipeline_dir, "external_biomet_for_eddypro.csv")
message("Loading gap-filled biomet: ", path_ext_biomet)
biomet <- read.csv(path_ext_biomet, check.names = FALSE)
biomet$timestamp <- as.POSIXct(paste(biomet$date, biomet$time), format="%Y-%m-%d %H:%M", tz="UTC")

# Clean biomet column names (remove units like (C) or (W/m^2))
colnames(biomet) <- gsub("\\(.*\\)", "", colnames(biomet))

# Remove duplicate date/time columns from biomet before joining
biomet <- biomet %>% select(-date, -time)

# Merge EC and gap-filled biomet on timestamp

data <- full_join(data_EC, biomet, by = "timestamp")
data <- data[!is.na(data$timestamp), ]

# Rename radiation columns to match QC script expectations
data <- data %>%
  rename_with(~ sub("^SWIN_", "SW_IN_", .), starts_with("SWIN_")) %>%
  rename_with(~ sub("^SWOUT_", "SW_OUT_", .), starts_with("SWOUT_")) %>%
  rename_with(~ sub("^LWIN_", "LW_IN_", .), starts_with("LWIN_")) %>%
  rename_with(~ sub("^LWOUT_", "LW_OUT_", .), starts_with("LWOUT_"))

# Replace invalid values (-9999, 9999.99) with NA
data[data == -9999] <- NA
data[data == 9999.99] <- NA

# K -> °C and depth means (Campbell 9-probe or 5-probe EddyPro layout)
data <- add_soil_depth_means(data)

# 1. Generate equidistant timestamps (e.g. every 30 min, hour, or day)
start_time <- min(data$timestamp, na.rm = TRUE)
end_time <- max(data$timestamp, na.rm = TRUE)

# Build regular 30-min time series over the full period
equidistant_timestamps <- data.frame(
  timestamp = seq(from = start_time, to = end_time, by = "30 min")  # Adjust interval if needed
)
# 2. Merge original data with equidistant timestamps
df_full <- merge(equidistant_timestamps, data, by = "timestamp", all.x = TRUE)

# 3. Gaps in the time grid are filled with NA for all variables
df_full <- df_full %>%
  arrange(timestamp)   # Sort by timestamp

data<-df_full

# Remove the first x rows to start at 00:30
#
# data <- data[-(1:17),]

data$timestamp <- format(data$timestamp, "%Y-%m-%d %H:%M:%S")

# Write prepared table (input for script 02)
dir.create(pipeline_dir, recursive = TRUE, showWarnings = FALSE)
write.table(data, path_01_preparation, row.names = FALSE, sep = ",")
message("Saved: ", path_01_preparation)
