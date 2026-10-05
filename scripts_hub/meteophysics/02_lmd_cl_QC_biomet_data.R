library(dplyr)
library(lubridate)
library(readr)



# Clear the workspace
rm(list = ls())

source("load_pipeline.R")

data=read.csv(path_01_preparation, header = T, sep = ",", dec=".")
data$timestamp <- as.POSIXct(data$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")

slow<-data

# Typical range checks
slow <- slow %>%
  mutate(
    RH_FLAG_min_max = ifelse(RH_1_1_1 >= 10 & RH_1_1_1 <= 100, 0, 2),
    TA_FLAG_min_max = ifelse(TA_1_1_1 >= -35 & TA_1_1_1 <= 45, 0, 2),
    TS5_FLAG_min_max = ifelse(TS_5cm >= -20 & TS_5cm <= 35, 0, 2),
    TS50_FLAG_min_max = ifelse(TS_50cm >= -20 & TS_50cm <= 35, 0, 2),
    TS20_FLAG_min_max = ifelse(TS_20cm >= -20 & TS_20cm <= 35, 0, 2),
    SW_IN_FLAG_min_max = ifelse(SW_IN_1_1_1 >= -10 & SW_IN_1_1_1 <= 1300, 0, 2),
    LW_OUT_FLAG_min_max = ifelse(LW_OUT_1_1_1 >= 140 & LW_OUT_1_1_1 <= 500, 0, 2),
    LW_IN_FLAG_min_max = ifelse(LW_IN_1_1_1 >= 170 & LW_IN_1_1_1 <= 600, 0, 2)
  )

# Maximum variation checks
slow <- slow %>%
  mutate(
    delta_RH = abs(RH_1_1_1 - lag(RH_1_1_1, default = first(RH_1_1_1))),
    RH_FLAG_var = ifelse(delta_RH > 30, 2, 0),
   
    delta_TA = abs(TA_1_1_1 - lag(TA_1_1_1, default = first(TA_1_1_1))),
    TA_FLAG_var = ifelse(delta_TA > 15, 2, 0),
    
    delta_TS5 = abs(TS_5cm  - lag(TS_5cm , default = first(TS_5cm ))),
    TS5_FLAG_var = ifelse(delta_TS5 > 2, 2, 0),
    
    delta_TS50 = abs(TS_50cm  - lag(TS_50cm , default = first(TS_50cm ))),
    TS50_FLAG_var = ifelse(delta_TS50 > 2, 2, 0),
    
    delta_TS50 = abs(TS_20cm  - lag(TS_20cm , default = first(TS_20cm ))),
    TS20_FLAG_var = ifelse(delta_TS50 > 2, 2, 0),
    
    delta_SW_IN = abs(SW_IN_1_1_1 - lag(SW_IN_1_1_1, default = first(SW_IN_1_1_1))),
    SW_IN_FLAG_var = ifelse(delta_SW_IN > 600, 2, 0),
    
    delta_LW_IN = abs(LW_IN_1_1_1 - lag(LW_IN_1_1_1, default = first(LW_IN_1_1_1))),
    LW_IN_FLAG_var = ifelse(delta_LW_IN > 100, 2, 0),
    
    delta_LW_OUT = abs(LW_OUT_1_1_1 - lag(LW_OUT_1_1_1, default = first(LW_OUT_1_1_1))),
    LW_OUT_FLAG_var = ifelse(delta_LW_OUT > 300, 2, 0)
  )

# Maximum duration of constant values
constant_flagging <- function(x, threshold1, threshold2) {
  rle_values <- rle(x)
  flag_values <- rep(0, length(x))
  
  start_idx <- 1
  for (i in seq_along(rle_values$lengths)) {
    run_length <- rle_values$lengths[i]
    if (run_length >= threshold1 & run_length < threshold2) {
      flag_values[start_idx:(start_idx + run_length - 1)] <- 1
    } else if (run_length >= threshold2) {
      flag_values[start_idx:(start_idx + run_length - 1)] <- 2
    }
    start_idx <- start_idx + run_length
  }
  
  return(flag_values)
}

slow <- slow %>%
  mutate(
    RH_constant_FLAG = constant_flagging(RH_1_1_1, 360, 720),
    TA_constant_FLAG = constant_flagging(TA_1_1_1, 60, 180),
    TS5_constant_FLAG = constant_flagging(TS_5cm, 360, 720),
    TS50_constant_FLAG = constant_flagging(TS_50cm, 360, 720),
    TS20_constant_FLAG = constant_flagging(TS_20cm, 360, 720),
    SW_IN_constant_FLAG = constant_flagging(SW_IN_1_1_1, 60, 180),
    LW_IN_constant_FLAG = constant_flagging(LW_IN_1_1_1, 60, 180),
    LW_OUT_constant_FLAG = constant_flagging(LW_OUT_1_1_1, 60, 180)
  )


#EddyProc.C$sEstimateUstarScenarios(nSample = 100L, probs = c(0.05, 0.5, 0.95))

data$RH_QC <- ifelse(slow$RH_FLAG_min_max > 0 | slow$RH_FLAG_var > 0 | slow$RH_constant_FLAG > 0, NA, slow$RH_1_1_1)
data$TA_QC <- ifelse(slow$TA_FLAG_min_max > 0 | slow$TA_FLAG_var > 0 | slow$TA_constant_FLAG > 0, NA, slow$TA_1_1_1)
data$TS5_QC <- ifelse(slow$TS5_FLAG_min_max > 0 | slow$TS5_FLAG_var > 0 | slow$TS5_constant_FLAG > 0, NA, slow$TS_5cm)
data$TS50_QC <- ifelse(slow$TS50_FLAG_min_max > 0 | slow$TS50_FLAG_var > 0 | slow$TS50_constant_FLAG > 0, NA, slow$TS_50cm)
data$TS20_QC <- ifelse(slow$TS20_FLAG_min_max > 0 | slow$TS20_FLAG_var > 0 | slow$TS20_constant_FLAG > 0, NA, slow$TS_20cm)
data$SW_IN_QC <- ifelse(slow$SW_IN_FLAG_min_max > 0 | slow$SW_IN_FLAG_var > 0 | slow$SW_IN_constant_FLAG > 0, NA, slow$SW_IN_1_1_1)
data$LW_IN_QC <- ifelse(slow$LW_IN_FLAG_min_max > 0 | slow$LW_IN_FLAG_var > 0 | slow$LW_IN_constant_FLAG > 0, NA, slow$LW_IN_1_1_1)
data$LW_OUT_QC <- ifelse(slow$LW_OUT_FLAG_min_max > 0 | slow$LW_OUT_FLAG_var > 0 | slow$LW_OUT_constant_FLAG > 0, NA, slow$LW_OUT_1_1_1)



# Remove soil data before installation / unreliable period (2023-11-10 to 2024-03-12)
data$TS5_QC[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$TS50_QC[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$TS20_QC[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$SWC_5cm[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$SWC_20cm[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$SWC_20cm[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA
data$G_1_1_1[data$timestamp >= as.POSIXct("2023-11-10", tz="GMT") & data$timestamp <= as.POSIXct("2024-03-12", tz="GMT")] <- NA

data$timestamp <- format(data$timestamp, "%Y-%m-%d %H:%M:%S")
# Save output to CSV
write.table(data, path_02_qc_biomet, row.names = FALSE, sep = ",")
message("Saved: ", path_02_qc_biomet)
