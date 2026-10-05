library(tidyr)
library(ggplot2)
library(dplyr)
library(lubridate)
library(zoo)
library(bigleaf)
library(randomForest)

# Clear the workspace
rm(list = ls())

source("load_pipeline.R")

data=read.csv(path_02_qc_biomet, header = T, sep = ",", dec=".")
data$timestamp <- as.POSIXct(data$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")

# --- External meteo donors (pipeline_config.R) ---
# Priority for gap-fill: cropland *_QC  >  DWD stations  >  grassland tower (optional)
use_dwd <- isTRUE(use_dwd_external) && exists("load_dwd_external_biomet")
use_gl_biomet <- !is.null(path_gl_biomet_resolved)

external_dwd <- NULL
if (use_dwd) {
  external_dwd <- load_dwd_external_biomet(
    data = data,
    cache_path = path_dwd_external_resolved,
    force_download = isTRUE(dwd_force_redownload),
    station_climate = dwd_station_climate,
    station_solar = dwd_station_solar
  )
  message("DWD external rows: ", nrow(external_dwd))
} else if (isTRUE(use_dwd_external)) {
  warning("use_dwd_external is TRUE but build_dwd_external_biomet.R was not loaded.")
}

external_gl <- NULL
if (use_gl_biomet) {
  external_gl <- read.csv(path_gl_biomet_resolved, header = TRUE, sep = ",", dec = ".")
  external_gl$timestamp <- as.POSIXct(external_gl$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")
  external_gl <- external_gl %>%
    select(timestamp, TA_f, TS5_f, TS5_f, TS20_f, PPFD_f, RH_f, SW_IN_f)
}

merged_gl_cl <- data
if (!is.null(external_dwd)) {
  merged_gl_cl <- merge(merged_gl_cl, external_dwd, by = "timestamp", all.x = TRUE)
}
if (!is.null(external_gl)) {
  merged_gl_cl <- merge(merged_gl_cl, external_gl, by = "timestamp", all.x = TRUE, suffixes = c("", "_gl"))
}

if (is.null(external_dwd) && is.null(external_gl)) {
  message(
    "No external meteo — gap-fill uses cropland QC + na.approx only.\n",
    "  Enable DWD: use_dwd_external <- TRUE in pipeline_config.R\n",
    "  Or grassland: use_grassland_biomet <- TRUE and path_gl_biomet_gf."
  )
}


############ visual check
# 
date_start <- as.Date("2024-01-01")
date_end <- as.Date("2024-11-30")

#sw_in
if (!is.null(external_dwd)) {
  p_sw <- ggplot() +
    scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
    geom_point(aes(x = data$timestamp, y = data$SW_IN_QC, color = "Cropland (Local)"), size = 0.5) +
    geom_point(aes(x = external_dwd$timestamp, y = external_dwd$SW_IN_ex, color = "DWD Erfde (Regional)"), size = 0.5) +
    scale_color_manual(name = "Data Source", values = c("Cropland (Local)" = "darkgreen", "DWD Erfde (Regional)" = "red")) +
    labs(
      title = "Shortwave Radiation (Incoming)",
      x = "Time",
      y = "SW Radiation (W m⁻²)"
    ) + theme_klimafarm() + theme(legend.position="bottom")
  ggsave(file.path(pipeline_dir, "Plots", "03_SW_IN_QC_vs_DWD.png"), p_sw, width = 10, height = 5)
}

# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-01","2024-09-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$SW_IN_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$SW_IN_QC),col="red", size=0.5)
# 
#TA
if (!is.null(external_dwd)) {
  p_ta <- ggplot() +
    scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
    geom_point(aes(x = data$timestamp, y = data$TA_QC, color = "Cropland (Local)"), size = 0.5) +
    geom_point(aes(x = external_dwd$timestamp, y = external_dwd$TA_ex, color = "DWD Erfde (Regional)"), size = 0.5) +
    scale_color_manual(name = "Data Source", values = c("Cropland (Local)" = "darkgreen", "DWD Erfde (Regional)" = "red")) +
    labs(
      title = "Air Temperature",
      x = "Time",
      y = "Temperature (°C)"
    ) + theme_klimafarm() + theme(legend.position="bottom")
  ggsave(file.path(pipeline_dir, "Plots", "03_TA_QC_vs_DWD.png"), p_ta, width = 10, height = 5)
}

# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-01","2024-11-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$TA_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$TA_QC),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-0, 30), breaks = seq(0, 30, by = 10))
# 
# 
# #TS (DWD: 5 and 20 cm soil T; cropland: 10 cm)
if (!is.null(external_dwd)) {
  p_ts <- ggplot() +
    scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
    geom_point(aes(external_dwd$timestamp, external_dwd$TS20_ex), col = "red", size = 0.5) +
    geom_point(aes(data$timestamp, data$TS50_QC), col = "darkgreen", size = 0.5) +
    labs(
      title = "Soil Temperature (10cm vs 20cm DWD)",
      subtitle = "Variables: TS50_QC (Cropland 10cm) vs TS20_ex (DWD 20cm) | Process: Since DWD lacks 10cm measurements, we visually compare our 10cm data with DWD.s 20cm proxy before applying a linear regression."
    ) + theme_klimafarm()
  ggsave(file.path(pipeline_dir, "Plots", "03_TS50_QC_vs_DWD20.png"), p_ts, width = 10, height = 5)
}

# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-01","2024-11-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$TS20_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$TS50_QC),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-0, 30), breaks = seq(0, 30, by = 10))
# 
# 
# #PPFD
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
#   geom_point( aes(data$timestamp,data$PPFD_1_1_1),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$PPFD_1_1_1),col="red", size=0.5)
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-05","2024-08-10")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_point( aes(data$timestamp,data$PPFD_1_1_1),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$PPFD_1_1_1),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-10, 2000), breaks = seq(0, 2000, by = 100))
# 
# #RH
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
#   geom_point( aes(data$timestamp,data$RH),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$RH),col="red", size=0.5)
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-05","2024-08-10")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_point( aes(data$timestamp,data$RH),col="darkgreen", size=0.5)+
#   geom_point( aes(external_data$timestamp,external_data$RH),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-0, 100), breaks = seq(0, 100, by = 10))

###################################################################
# Direct gap filling with cropland data where available

# Fill: keep QC; else DWD (_ex); else grassland tower (_f columns)
fill_qc_external <- function(qc, dwd, gl = NULL) {
  out <- qc
  if (!is.null(dwd)) {
    miss <- is.na(out)
    out[miss & !is.na(dwd)] <- dwd[miss & !is.na(dwd)]
  }
  if (!is.null(gl)) {
    miss <- is.na(out)
    out[miss & !is.na(gl)] <- gl[miss & !is.na(gl)]
  }
  out
}

dwd_sw <- if ("SW_IN_ex" %in% names(merged_gl_cl)) merged_gl_cl$SW_IN_ex else NULL
dwd_ta <- if ("TA_ex" %in% names(merged_gl_cl)) merged_gl_cl$TA_ex else NULL
dwd_rh <- if ("RH_ex" %in% names(merged_gl_cl)) merged_gl_cl$RH_ex else NULL
gl_sw  <- if ("SW_IN_f" %in% names(merged_gl_cl)) merged_gl_cl$SW_IN_f else NULL
gl_ta  <- if ("TA_f" %in% names(merged_gl_cl)) merged_gl_cl$TA_f else NULL
gl_rh  <- if ("RH_f" %in% names(merged_gl_cl)) merged_gl_cl$RH_f else NULL

merged_gl_cl$SW_IN_f_c <- fill_qc_external(merged_gl_cl$SW_IN_QC, dwd_sw, gl_sw)
sum(is.na(merged_gl_cl$SW_IN_f_c))
###################################################################
# Gap-fill air temperature
merged_gl_cl$TA_f_c <- fill_qc_external(merged_gl_cl$TA_QC, dwd_ta, gl_ta)
sum(is.na(merged_gl_cl$TA_f_c))
###################################################################
# Gap-fill relative humidity
merged_gl_cl$RH_f_c <- fill_qc_external(merged_gl_cl$RH_QC, dwd_rh, gl_rh)
sum(is.na(merged_gl_cl$RH_f_c))

# Soil T at 2 cm / 20 cm: DWD 5 cm and 20 cm (grassland tower TS5_f / TS20_f if enabled)
dwd_ts5  <- if ("TS5_ex" %in% names(merged_gl_cl)) merged_gl_cl$TS5_ex else NULL
dwd_ts20 <- if ("TS20_ex" %in% names(merged_gl_cl)) merged_gl_cl$TS20_ex else NULL
gl_ts2   <- if ("TS5_f" %in% names(merged_gl_cl)) merged_gl_cl$TS5_f else NULL
gl_ts20  <- if ("TS20_f" %in% names(merged_gl_cl)) merged_gl_cl$TS20_f else NULL
merged_gl_cl$TS5_f_c  <- fill_qc_external(merged_gl_cl$TS5_QC, dwd_ts5, gl_ts2)
merged_gl_cl$TS20_f_c <- fill_qc_external(merged_gl_cl$TS20_QC, dwd_ts20, gl_ts20)

####################################################
# Gap-fill 10 cm soil temperature (DWD 5/20 cm proxy or grassland tower)
######################################################

merged_gl_cl$TS20_f_c <- merged_gl_cl$TS50_QC

if (!is.null(external_dwd) && all(c("TS5_ex", "TS20_ex") %in% names(merged_gl_cl))) {
  # DWD has 5 and 20 cm — mean as proxy for 10 cm at cropland
  merged_gl_cl$TS10_proxy <- (merged_gl_cl$TS5_ex + merged_gl_cl$TS20_ex) / 2
  p_ts_dwd1 <- ggplot() +
    geom_point(aes(merged_gl_cl$TS10_proxy, merged_gl_cl$TS20_f_c), col = "darkgreen", size = 0.5) +
    labs(
      title = "Soil Temperature Proxy Check",
      subtitle = "Variables: TS20_f_c (Cropland 10cm) vs TS10_proxy (DWD Mean of 5cm & 20cm) | Process: Scatter plot to check the linear relationship between the cropland 10cm data and the artificial DWD proxy created by averaging 5cm and 20cm."
    ) + theme_klimafarm()
  ggsave(file.path(pipeline_dir, "Plots", "03_TS10_Proxy_Scatter.png"), p_ts_dwd1, width = 8, height = 6)

  fit <- lm(TS20_f_c ~ TS10_proxy, data = merged_gl_cl)
  na_index <- is.na(merged_gl_cl$TS20_f_c) & !is.na(merged_gl_cl$TS10_proxy)
  merged_gl_cl$TS20_f_c[na_index] <- predict(fit, newdata = merged_gl_cl[na_index, ])

  if (sum(is.na(merged_gl_cl$TS20_f_c)) > 0) {
    warning("NA values remain in TS20_f_c after DWD soil-T regression!")
  } else {
    message("TS20_f_c: DWD (5+20 cm) regression filled remaining NA.")
  }

  p_ts_dwd2 <- ggplot(merged_gl_cl, aes(x = TS50_QC, y = TS10_proxy)) +
    geom_point(color = "darkgreen", size = 0.5) +
    geom_smooth(method = "lm", col = "red") +
    labs(
      title = "Soil Temperature Linear Model",
      subtitle = "Linear regression (red line) of TS10_proxy vs TS50_QC | Process: A linear model (lm) was fit to predict missing TS10 values from the DWD proxy. This regression line demonstrates the fit quality."
    ) + theme_klimafarm()
  ggsave(file.path(pipeline_dir, "Plots", "03_TS10_Proxy_LM.png"), p_ts_dwd2, width = 8, height = 6)

} else if (use_gl_biomet && "TS20_f" %in% names(merged_gl_cl)) {
  p_ts_gl1 <- ggplot() +
    geom_point(aes(merged_gl_cl$TS20_f, merged_gl_cl$TS20_f_c), col = "darkgreen", size = 0.5) +
    labs(
      title = "Grassland Soil Temperature Scatter",
      subtitle = "Variables: TS20_f_c (Cropland) vs TS20_f (Grassland Tower) | Process: Compares measured 10cm soil temp against the adjacent grassland tower as a gap-filling source."
    ) + theme_klimafarm()
  ggsave(file.path(pipeline_dir, "Plots", "03_TS10_Grassland_Scatter.png"), p_ts_gl1, width = 8, height = 6)

  fit <- lm(TS20_f_c ~ TS20_f, data = merged_gl_cl)
  na_index <- is.na(merged_gl_cl$TS20_f_c) & !is.na(merged_gl_cl$TS10_proxy)
  merged_gl_cl$TS20_f_c[na_index] <- predict(fit, newdata = merged_gl_cl[na_index, ])

  if (sum(is.na(merged_gl_cl$TS20_f_c)) > 0) {
    warning("NA values remain in TS20_f_c after grassland regression!")
  } else {
    message("TS20_f_c: grassland tower regression filled remaining NA.")
  }

  p_ts_gl2 <- ggplot(merged_gl_cl, aes(x = TS50_QC, y = TS20_f)) +
    geom_point(color = "darkgreen", size = 0.5) +
    geom_smooth(method = "lm", col = "red") +
    labs(
      title = "Grassland Soil Temperature Model",
      subtitle = "Linear regression (red line) of Grassland TS20_f vs Cropland TS50_QC | Process: Demonstrates the linear fit used to translate grassland tower soil temperatures into cropland equivalent values to fill gaps."
    ) + theme_klimafarm()
  ggsave(file.path(pipeline_dir, "Plots", "03_TS10_Grassland_LM.png"), p_ts_gl2, width = 8, height = 6)
} else {
  message("TS10: no external soil T — cropland QC + na.approx only.")
}

sum(is.na(merged_gl_cl$TS20_f_c))

p_ts10_final <- ggplot() +
  scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  geom_point(aes(x = merged_gl_cl$timestamp, y = merged_gl_cl$TS20_f_c, color = "Gap-Filled Data"), size=0.5) +
  geom_point(aes(x = data$timestamp, y = data$TS50_QC, color = "Original Data"), size=0.5) +
  scale_color_manual(name = "Data Source", values = c("Original Data" = "darkgreen", "Gap-Filled Data" = "red")) +
  scale_y_continuous(limits = c(-10, 20), breaks = seq(0, 20, by = 5)) +
  labs(
    title = "Final Gap-Filled Soil Temperature (10cm)",
    x = "Time",
    y = "Temperature (°C)"
  ) + theme_klimafarm() + theme(legend.position="bottom")
ggsave(file.path(pipeline_dir, "Plots", "03_TS10_Final_Gapfilled.png"), p_ts10_final, width = 10, height = 5)


################################################################################
#linear interpolation for remaining small gaps
################################################################################
#date_start <- as.Date("2023-03-01")
#date_end <- as.Date("2024-10-01")

# Air temperature, relative humidity, PPFD, soil temperature
# Gap filling up to 6 half-hourly gaps
merged_gl_cl$TA_f_c<- na.approx(merged_gl_cl$TA_f_c, maxgap = 6, na.rm=FALSE)
merged_gl_cl$RH_f_c<- na.approx(merged_gl_cl$RH_f_c, maxgap = 10, na.rm=FALSE)
# PPFD: prefer gap-filled column; else tower PPFD; DWD PPFD_ex already in PPFD path via fill if we add:
if (!"PPFD_f_c" %in% names(merged_gl_cl)) {
  dwd_ppfd <- if ("PPFD_ex" %in% names(merged_gl_cl)) merged_gl_cl$PPFD_ex else NULL
  gl_ppfd  <- if ("PPFD_f" %in% names(merged_gl_cl)) merged_gl_cl$PPFD_f else NULL
  merged_gl_cl$PPFD_f_c <- fill_qc_external(merged_gl_cl$PPFD_1_1_1, dwd_ppfd, gl_ppfd)
}
merged_gl_cl$PPFD_f_c <- na.approx(merged_gl_cl$PPFD_f_c, maxgap = 6, na.rm=FALSE)
merged_gl_cl$SW_IN_f_c<- na.approx(merged_gl_cl$SW_IN_f_c, maxgap = 6, na.rm=FALSE)
merged_gl_cl$TS5_f_c  <- na.approx(merged_gl_cl$TS5_f_c, maxgap = 48, na.rm=FALSE)
merged_gl_cl$TS20_f_c <- na.approx(merged_gl_cl$TS20_f_c, maxgap = 48, na.rm=FALSE)
merged_gl_cl$TS20_f_c <- na.approx(merged_gl_cl$TS20_f_c, maxgap = 48, na.rm=FALSE)

sum(is.na(merged_gl_cl$SW_IN_f_c))
sum(is.na(merged_gl_cl$RH_f_c))
sum(is.na(merged_gl_cl$TA_f_c))
sum(is.na(merged_gl_cl$TS5_f_c))
sum(is.na(merged_gl_cl$TS20_f_c))
sum(is.na(merged_gl_cl$TS20_f_c))

######################################

# Add gap-filled variables to main data frame
data$TA_f<- merged_gl_cl$TA_f_c
data$RH_f<- merged_gl_cl$RH_f_c
data$PPFD_f<- merged_gl_cl$PPFD_f_c
data$SW_IN_f<- merged_gl_cl$SW_IN_f_c
data$TS5_f<- merged_gl_cl$TS5_f_c
data$TS20_f<- merged_gl_cl$TS20_f_c
data$TS20_f<- merged_gl_cl$TS20_f_c

sum(is.na(data$SW_IN_f))
sum(is.na(data$TA_f))
sum(is.na(data$TS20_f))

data$timestamp <- format(data$timestamp, "%Y-%m-%d %H:%M:%S")
write.table(data, path_03_biomet_gf, row.names = F, sep = ",")
message("Saved: ", path_03_biomet_gf)









# 
# ######## 
# #external data LfL
# ######## 
# 
# external_data_lfl  =read.csv("D:/MoLaKlim/Data/external_data/LfL_Kirchheim.csv",header = T, sep = ",", dec=".")
# external_data_lfl$timestamp <- as.POSIXct(external_data_lfl$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")
# 
# # As external data are hourly data: Create a new dataframe with timestamp column for half-hourly values in the time frame of data 
# external_data_lfl_hh <- data.frame(timestamp = seq(from = ymd_hms("2023-08-10 00:00:00"),
#                                                    to = ymd_hms("2025-01-31 23:00:00"),
#                                                    by = "30 min"))
# 
# # Variables to interpolate from hourly to half-hourly data
# external_variables <- c("AVG_TA200", "AVG_RH200", "AVG_TB005", "SUM_GS200", "SUM_NN050")
# 
# new_external_variables <- c("TA_external", "RH_external", "TS_external", "SW_IN_external", "Prec_external")
# 
# # Interpolation
# interpolated_values <- lapply(external_variables, function(var) {
#   approx(
#     x = external_data_lfl$timestamp,
#     y = external_data_lfl[[var]],
#     xout = external_data_lfl_hh$timestamp,
#     method = "linear"
#   )$y
# })
# 
# # Add interpolated values to data frame
# external_data_lfl_hh[new_external_variables] <- as.data.frame(interpolated_values)
# 
# ################################################################################
# 
# # Merge external LfL data and basic data frames
# merged_data_lfl <- merge(merged_gl_cl, external_data_lfl_hh, by = "timestamp", all.x = TRUE)
# 
# 
# sum(is.na(merged_gl_cl$SW_IN_external))
# sum(is.na(merged_gl_cl$RH_external))
# sum(is.na(merged_gl_cl$TA_external))
# sum(is.na(merged_gl_cl$TS_external))

# #sw_in
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
#   geom_point( aes(data$timestamp,data$SW_IN_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$RG_external),col="red", size=0.5)
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-01","2024-09-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$SW_IN_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$RG_external),col="red", size=0.5)
# 
# #TA
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
#   geom_point( aes(data$timestamp,data$TA_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$TA_external),col="red", size=0.5)
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-08-01","2024-11-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$TA_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$TA_external),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-0, 30), breaks = seq(0, 30, by = 10))
# 
# 
# #TS
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$TS_external),col="red", size=0.5)+
#   geom_point( aes(data$timestamp,data$TS5_QC),col="darkgreen", size=0.5)
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2024-11-01","2025-01-20")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$TS5_QC),col="darkgreen", size=0.5)+
#   geom_point( aes(merged_data_lfl$timestamp,merged_data_lfl$TS_external),col="red", size=0.5)+
#   scale_y_continuous(limits = c(-0, 30), breaks = seq(0, 30, by = 10))


# Linear models (LfL external data; commented out)
# #SW
# model_SW <- lm(SW_IN_f_c ~ SW_IN_external, data = merged_data_lfl)
# r2 <- summary(model_SW)$r.squared  # Compute R-squared
# 
# merged_data_lfl$SW_mod<-model_SW$coefficients[1] + merged_data_lfl$SW_IN_external  * model_SW$coefficients[2]
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2023-11-01","2025-02-01")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(data$timestamp,data$SW_IN_f_c),col="darkgreen", size=0.5)+
#   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$SW_mod),col="red", size=0.5)+
#   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$SW_IN_external),col="blue", size=0.5)

# #TA
# model_TA <- lm(TA_f_c ~ TA_external, data = merged_data_lfl)
# r2 <- summary(model_TA)$r.squared  # Compute R-squared
# 
# merged_data_lfl$TA_mod<-model_TA$coefficients[1] + merged_data_lfl$TA_external  * model_TA$coefficients[2]
# 
# ggplot() +
# #   scale_x_datetime(limits = as.POSIXct(as.Date(c("2023-11-01","2025-02-01")), date_breaks = "1 month", date_labels = "%b")) +
# #   geom_line( aes(data$timestamp,data$TA_f),col="darkgreen", size=0.5)+
# #   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$TA_mod),col="red", size=0.5)+
# #   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$TA_external),col="blue", size=0.5)
# 
# 
# #TS
# model_TS <- lm(TS20_f ~ TS_external, data = merged_data_lfl)
# r2 <- summary(model_TS)$r.squared  # Compute R-squared
# 
# merged_data_lfl$TS_mod<-model_TS$coefficients[1] + merged_data_lfl$TS_external  * model_TS$coefficients[2]
# 
# ggplot() +
#   scale_x_datetime(limits = as.POSIXct(as.Date(c("2023-08-01","2025-01-15")), date_breaks = "1 month", date_labels = "%b")) +
#   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$TS_mod),col="red", size=0.5)+
#   geom_line( aes(data$timestamp,data$TS20_f),col="darkgreen", size=0.5)+
#   
#   geom_line( aes(merged_data_lfl$timestamp,merged_data_lfl$TS_external),col="blue", size=0.5)
# 
# 
# data$SW_IN_f <- ifelse(is.na(merged_data_lfl$SW_IN_f), merged_data_lfl$SW_mod, merged_data_lfl$SW_IN_f)
# data$TA_f <- ifelse(is.na(merged_data_lfl$TA_f), merged_data_lfl$TA_mod, merged_data_lfl$TA_f)
# data$TS20_f <- ifelse(is.na(merged_data_lfl$TS20_f), merged_data_lfl$TS_mod, merged_data_lfl$TS20_f)
# 


