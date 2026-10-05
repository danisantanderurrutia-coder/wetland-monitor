library(tidyr)

library(ggplot2)
library(dplyr)
library(REddyProc)
library(lubridate)

rm(list = ls())

source("load_pipeline.R")

data<-read.csv(path_04_qc_flux)

data$timestamp <- as.POSIXct(data$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")

# Map external gap-filled PPFD
if("PPFD_1_1_1" %in% names(data)) data$PPFD_f <- data$PPFD_1_1_1

############
EddyData.F <- data[, c("DoY", "Hour", "Year", "NEE_0_u.", 'LE_0_u.', 'H_0_u.', 
                       "u.", 'TA_f', 'RH_1_1_1', 'SW_IN_f', 'PPFD_f')]

# Note: flux input is NEE after QC flag 0 and u* filtering (NEE_0_u.)


# Rename Columns
names(EddyData.F)[names(EddyData.F) == 'NEE_0_u.'] <- 'NEE'
names(EddyData.F)[names(EddyData.F) == 'LE_0_u.'] <- 'LE'
names(EddyData.F)[names(EddyData.F) == 'H_0_u.'] <- 'H'
names(EddyData.F)[names(EddyData.F) == 'u.'] <- 'Ustar'
names(EddyData.F)[names(EddyData.F) == 'TA_f'] <- 'Tair'
names(EddyData.F)[names(EddyData.F) == 'RH_1_1_1'] <- 'rH'
names(EddyData.F)[names(EddyData.F) == 'SW_IN_f'] <- 'Rg'

############
# Calculate VPD if not provided
############
EddyData.F$VPD <- fCalcVPDfromRHandTair(EddyData.F$rH, (EddyData.F$Tair))

############
# Convert Time to POSIX format
############
EddyData.F <- fConvertTimeToPosix(EddyData.F, 'YDH', Year = 'Year', Day = 'DoY', Hour = 'Hour')

############
# Initialize R5 Reference Class sEddyProc
############
EddyProc.C <- sEddyProc$new(site_name, EddyData.F, c('NEE', 'Rg', 'Tair', 'VPD', 'Ustar', 'LE', 'H'))
EddyProc.C$sSetLocationInfo(LatDeg = site_lat, LongDeg = site_lon, TimeZoneHour = site_tz)

############
# Gap Filling
############

###### Gap-fill meteorological drivers
EddyProc.C$sSetLocationInfo(LatDeg = site_lat, LongDeg = site_lon, TimeZoneHour = site_tz)
EddyProc.C$sMDSGapFill('Tair', FillAll = FALSE, minNWarnRunLength = NA)
EddyProc.C$sMDSGapFill('Rg', FillAll = FALSE, minNWarnRunLength = NA)
EddyProc.C$sMDSGapFill('VPD', FillAll = FALSE, minNWarnRunLength = NA)

###### Gap-fill EC fluxes
EddyProc.C$sMDSGapFill('NEE', FillAll=TRUE)  # Fill all values to estimate flux uncertainties
EddyProc.C$sMDSGapFill('LE', FillAll=TRUE)   # Fill all values to estimate flux uncertainties
EddyProc.C$sMDSGapFill('H', FillAll=TRUE)    # Fill all values to estimate flux uncertainties


######## Flux partitioning
EddyProc.C$sMRFluxPartition()  # Night-time partitioning -> Reco, GPP
EddyProc.C$sGLFluxPartition()  # Day-time partitioning -> Reco_DT, GPP_DT

### ReddyProc Plot
#EddyProc.C$sPlotHHFluxesY('NEE_f', Year.i=2023)

#+++ Export gap filled and partitioned data to standard data frame
FilledEddyData.F <- EddyProc.C$sExportResults()
#fWriteDataframeToFile(FilledEddyData.F, 'DE-Lmd-Results_2023_20240111.txt', 'out')

data_filled<-as.data.frame(FilledEddyData.F)
data_filled$timestamp <- data$timestamp

# Plot NEE
ggplot(data_filled, aes(x = timestamp, y = NEE_f)) +
  geom_point(color = "darkgreen", size = 0.5) +
  labs(title = "NEE with Gap Filling", x = "Timestamp", y = "NEE")


############
# Combine Data and Calculate Additional Variables
############
total <- cbind(data, data_filled)
total$DoY <- as.POSIXlt(total$timestamp)$yday + 1
total$date <- as.Date(total$timestamp, tz = "GMT")


###########
# #Replace NA with -9999 for QC Variables
# ###########
# qc_vars <- c('NEE_1_u.', 'LE_1_u.', 'H_1_u.','CH4_1_u.','u.')
# total[qc_vars] <- lapply(total[qc_vars], function(x) {
#   x[is.na(x)] <- -9999
#   return(x)
# })


####### Merge MDS gap-filled fluxes into QC flag-1 columns

total$NEE_1_f <- ifelse(is.na(total$NEE_1_u.), total$NEE_f, total$NEE_1_u.)
total$LE_1_f <- ifelse(is.na(total$LE_1_u.), total$LE_f, total$LE_1_u.)
total$H_1_f <- ifelse(is.na(total$H_1_u.), total$H_f, total$H_1_u.)

total$NEE_1_gC <- total$NEE_1_f * 1800 * 12 * 10^(-6)

co2_eq <- 3.666 * 0.01  # Conversion factor from gC to t CO2 equivalent per hectare

total$THG<- total$NEE_1_gC * co2_eq

sum(total$NEE_1_gC * co2_eq)

sum(total$THG)


# Save Gap Filled Data
# Write postprocessed data to a CSV file
data$timestamp <- format(data$timestamp, "%Y-%m-%d %H:%M:%S")
############
write.table(total, path_05_mds_gapfill, row.names = FALSE, sep = ",")
message("Saved: ", path_05_mds_gapfill)



#### calculate daily balances and annual budgets

# Aggregate data by date (daily means)
vars_mean <- c("NEE_f", "LE_f", "H_f",  "NEE_1_f", "LE_1_f", "H_1_f", "NEE_1_gC",
               "SWC_5cm", "SWC_20cm", "SWC_20cm", "TS_5cm", "TS_50cm", 
               "Tair_f", "PPFD_1_1_1", "RH_1_1_1", "ALB_1_1_1", "RN_1_1_1", 
               "G_1_1_1", "SW_IN_f", "SW_OUT_1_1_1", "LW_IN_1_1_1", "LW_OUT_1_1_1")

# Loop to aggregate daily means for all variables

df_list_mean <- lapply(vars_mean, function(var) {
  if(var %in% names(total)) {
    aggregate(as.formula(paste(var, "~ date")), total, mean, na.rm = TRUE, na.action = na.pass)
  } else {
    NULL
  }
})
df_list_mean <- df_list_mean[!sapply(df_list_mean, is.null)]


# Merge all aggregated dataframes into one
output <- Reduce(function(x, y) merge(x, y, all = TRUE), df_list_mean)

# Convert date back to POSIXct format
output$date <- as.POSIXct(output$date, format = "%Y-%m-%d", tz = "GMT")

# Convert half-hourly NEE_1_gC to gC m^-2 d^-1 (×48)
output$NEE_1_gC <- output$NEE_1_gC*48


THG <- sum(output$NEE_1_gC*co2_eq)

output$timestamp<-format(output$timestamp, "%Y-%m-%d")
# Save the results to a CSV file
write.table(output, path_05_mds_budgets, row.names = FALSE, sep = ",")
message("Saved: ", path_05_mds_budgets)













#### calculate daily balances and annual budgets
total$date <- as.Date(total$timestamp, format = "%Y-%m-%d")
# Aggregate data by date (daily means)

vars_mean <- c("NEE_f", "LE_f", "H_f",  "NEE_f_1", "LE_f_1", "H_f_1", 
               "SWC_5cm", "SWC_20cm", "SWC_20cm", "TS_5cm", "TS_50cm", 
               "Tair_f", "PPFD_1_1_1", "RH_1_1_1", "ALB_1_1_1", "RN_1_1_1", 
               "G_1_1_1", "SW_IN_f", "SW_OUT_1_1_1", "LW_IN_1_1_1", "LW_OUT_1_1_1")

# Loop to aggregate daily means for all variables

df_list_mean <- lapply(vars_mean, function(var) {
  if(var %in% names(total)) {
    aggregate(as.formula(paste(var, "~ date")), total, mean, na.rm = TRUE, na.action = na.pass)
  } else {
    NULL
  }
})
df_list_mean <- df_list_mean[!sapply(df_list_mean, is.null)]


# Aggregate precipitation data (daily sum)
P_RAIN <- aggregate(P_RAIN_1_1_1 ~ date, total, sum, na.rm = TRUE)

# Add precipitation to the list of aggregated data
df_list <- c(df_list_mean, list(P_RAIN))

# Merge all aggregated dataframes into one
output <- Reduce(function(x, y) merge(x, y, all = TRUE), df_list)

# Convert date back to POSIXct format
output$date <- as.POSIXct(output$date, format = "%Y-%m-%d", tz = "GMT")


# Convert NEE and CH4 fluxes to gC m^-2 d^-1
conversion_factor <- 1800 * 48 * 12 * 10^(-6)
output$NEE_0_gC <- output$NEE_f * conversion_factor
if ('NEE_f_1' %in% names(output)) output$NEE_1_gC <- output$NEE_f_1 * conversion_factor
if ('NEE_1_f' %in% names(output)) output$NEE_1_gC <- output$NEE_1_f * conversion_factor

# Calculate the sums and convert g C m^-2 to CO2-equivalent in t CO2 ha^-1
co2_eq <- 3.666 * 0.01  # Conversion factor from gC to t CO2 equivalent per hectare

THG_flag0 <- sum(output$NEE_0_gC*co2_eq, na.rm = TRUE)
if ('NEE_1_gC' %in% names(output)) THG_flag1 <- sum(output$NEE_1_gC*co2_eq, na.rm = TRUE) 

# Save the results to a CSV file
write.table(output, "xxx_yy_MDS_gap_filling_budgets_YYYYMMDD", row.names = FALSE, sep = ",")


date_start<- "2023-11-01"
date_end<-"2025-01-21"



#plotting
ggplot(NULL, aes(output$date,output$NEE_0_gC), color="red") + 
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end))),date_breaks = "1 months") +
  geom_point( aes(output$date,output$NEE_0_gC),col="deepskyblue")+
  scale_y_continuous(limits = c(-15, 5), breaks = seq(-15, 5, by = 5))+
  theme_klimafarm()+ggtitle("NEE – maize (cropland)")+
  theme(axis.text.x = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain"),
        axis.text.y = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain"),
        axis.title.x = element_text(size = 15, angle = 0, hjust = .5, vjust = 0, face = "plain"),
        #axis.title.y = element_text(size = 13, angle = 90, hjust = .5, vjust = .5, face = "plain"),
        #axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        plot.title = element_text(size = 15, face = "bold"))
