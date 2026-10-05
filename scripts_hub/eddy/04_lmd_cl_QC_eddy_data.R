library(tidyr)
library(ggplot2)
library(dplyr)
library(REddyProc)
library(lubridate)


# Clear the workspace
rm(list = ls())

source("load_pipeline.R")

data=read.csv(path_01_preparation, header = T, sep = ",", dec=".")
data$timestamp <- as.POSIXct(data$timestamp, format = "%Y-%m-%d %H:%M", tz = "GMT")

# Map external gap-filled biomet columns to the _f suffixes expected by the QC and MDS scripts
data$SW_IN_f <- data$SW_IN_1_1_1
data$TA_f <- data$TA_1_1_1
if("VPD" %in% names(data)) data$VPD_f <- data$VPD
if("RH_1_1_1" %in% names(data)) data$RH_f <- data$RH_1_1_1

sum(is.na(data$SW_IN_f))
##################################################################################################

"Quality check Mauder and Foken (2004) plus RSSI for CH4"

##################################################################################################

# Vectorized flag 0 calculation
data$QC_0_CO2 <- ifelse(data$qc_co2_flux > 0 | data$co2_flux > 40 | data$co2_flux < -70, NA, data$co2_flux)
data$QC_0_H <- ifelse(data$qc_H > 0| data$H > 400 | data$H < -200, NA, data$H)
data$QC_0_LE <- ifelse(data$qc_LE > 0| data$LE > 600 | data$LE < -100, NA, data$LE)
if ("ch4_flux" %in% names(data)) data$QC_0_CH4 <- ifelse(data$qc_ch4_flux > 0 | data$ch4_flux > 500 | data$ch4_flux < -100, NA, data$ch4_flux)

# Vectorized flag 1 calculation
data$QC_1_CO2 <- ifelse(data$qc_co2_flux > 1 | data$co2_flux > 40 | data$co2_flux < -70, NA, data$co2_flux)
data$QC_1_H <- ifelse(data$qc_H > 1| data$H > 400 | data$H < -200, NA, data$H)
data$QC_1_LE <- ifelse(data$qc_LE > 1| data$LE > 600 | data$LE < -100, NA, data$LE)
if ("ch4_flux" %in% names(data)) data$QC_1_CH4 <- ifelse(data$qc_ch4_flux > 1 | data$ch4_flux > 500 | data$ch4_flux < -100, NA, data$ch4_flux)



date_start <- as.Date("2024-01-01")
date_end <- as.Date("2024-12-31")

start_time <- as.Date("2024-01-01")
end_time <- as.Date("2024-12-31")


# Plot QC 0 CO2 flux
pl_co2_qc <- ggplot(data, aes(x = timestamp)) +
  geom_point(aes(y = QC_1_CO2), col = "red", size = 0.5) +
  geom_point(aes(y = QC_0_CO2), col = "blue", size = 0.5) +
  scale_x_datetime(name = "Month", limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  scale_y_continuous(limits = c(-60, 40), breaks = seq(-60, 40, by = 10))

# Plot QC 0 LE
pl_LE_qc <- ggplot(data, aes(x = timestamp)) +
  geom_point(aes(y = QC_1_LE), col = "red", size = 0.5) +
  geom_point(aes(y = QC_0_LE), col = "blue", size = 0.5) +
  scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  scale_y_continuous(limits = c(-500, 500), breaks = seq(-500, 500, by = 100))

# Plot QC 0 H (Sensible Heat Flux)
pl_H_qc <- ggplot(data, aes(x = timestamp)) +
  geom_point(aes(y = QC_0_H), col = "blue", size = 0.5) +
  scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  scale_y_continuous(limits = c(-500, 500), breaks = seq(-500, 500, by = 100))


# Display plots
pl_co2_qc
pl_LE_qc
pl_H_qc


##################################################################################################

"Spike detection Mauder 2013"

##################################################################################################

###############
#    CO2
###############

#threshold value q
q<- 7   # default

# Separate daytime and nighttime data
data_day<- subset(data,data$SW_IN_f>20)
data_night<- subset(data,data$SW_IN_f<=20)

# Spike test for flag 0

CO2_low_day<- median(data_day$QC_0_CO2,na.rm=T) - (q*median(abs(data_day$QC_0_CO2 - median(data_day$QC_0_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_high_day<- median(data_day$QC_0_CO2,na.rm=T)+ (q*median(abs(data_day$QC_0_CO2 - median(data_day$QC_0_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_low_night<- median(data_night$QC_0_CO2,na.rm=T) - (q*median(abs(data_night$QC_0_CO2 - median(data_night$QC_0_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_high_night<- median(data_night$QC_0_CO2,na.rm=T)+ (q*median(abs(data_night$QC_0_CO2 - median(data_night$QC_0_CO2, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_0_CO2[i]< CO2_low_day | data$SW_IN_f[i]>20 & data$QC_0_CO2[i]> CO2_high_day, data$CO2_spike_QC_0_CO2[i]<-NA, data$CO2_spike_QC_0_CO2[i]<-data$QC_0_CO2[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_0_CO2[i]< CO2_low_night | data$SW_IN_f[i]<=20 & data$QC_0_CO2[i]> CO2_high_night, data$CO2_spike_QC_0_CO2[i]<-NA, data$CO2_spike_QC_0_CO2[i]<-data$QC_0_CO2[i]) 
}


# Spike test for flag 1

CO2_low_day<- median(data_day$QC_1_CO2,na.rm=T) - (q*median(abs(data_day$QC_1_CO2 - median(data_day$QC_1_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_high_day<- median(data_day$QC_1_CO2,na.rm=T)+ (q*median(abs(data_day$QC_1_CO2 - median(data_day$QC_1_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_low_night<- median(data_night$QC_1_CO2,na.rm=T) - (q*median(abs(data_night$QC_1_CO2 - median(data_night$QC_1_CO2, na.rm=T)),na.rm=T)/0.61045)
CO2_high_night<- median(data_night$QC_1_CO2,na.rm=T)+ (q*median(abs(data_night$QC_1_CO2 - median(data_night$QC_1_CO2, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_1_CO2[i]< CO2_low_day | data$SW_IN_f[i]>20 & data$QC_1_CO2[i]> CO2_high_day, data$CO2_spike_QC_1_CO2[i]<-NA, data$CO2_spike_QC_1_CO2[i]<-data$QC_1_CO2[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_1_CO2[i]< CO2_low_night | data$SW_IN_f[i]<=20 & data$QC_1_CO2[i]> CO2_high_night, data$CO2_spike_QC_1_CO2[i]<-NA, data$CO2_spike_QC_1_CO2[i]<-data$QC_1_CO2[i]) 
}


ggplot(NULL, aes(data$timestamp,data$CO2_spike_QC_1_CO2), color="red") +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(start_time,end_time)))) +
  geom_point( aes(data$timestamp,data$QC_1_CO2),col="red", size=0.5)+
  geom_point( aes(data$timestamp,data$CO2_spike_QC_1_CO2),col="darkgreen", size=0.5)


###############
#    LE
###############

#threshold value q
q<-7   # default

data_day<- subset(data,data$SW_IN_f>20)
data_night<- subset(data,data$SW_IN_f<=20)

# Spike test for flag 0
LE_low_day<- median(data_day$QC_0_LE,na.rm=T) - (q*median(abs(data_day$QC_0_LE - median(data_day$QC_0_LE, na.rm=T)),na.rm=T)/0.61045)
LE_high_day<- median(data_day$QC_0_LE,na.rm=T)+ (q*median(abs(data_day$QC_0_LE - median(data_day$QC_0_LE, na.rm=T)),na.rm=T)/0.61045)
LE_low_night<- median(data_night$QC_0_LE,na.rm=T) - (q*median(abs(data_night$QC_0_LE - median(data_night$QC_0_LE, na.rm=T)),na.rm=T)/0.61045)
LE_high_night<- median(data_night$QC_0_LE,na.rm=T)+ (q*median(abs(data_night$QC_0_LE - median(data_night$QC_0_LE, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_0_LE[i]< LE_low_day | data$SW_IN_f[i]>20 & data$QC_0_LE[i]> LE_high_day, data$LE_spike_QC_0_LE[i]<-NA, data$LE_spike_QC_0_LE[i]<-data$QC_0_LE[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_0_LE[i]< LE_low_night | data$SW_IN_f[i]<=20 & data$QC_0_LE[i]> LE_high_night, data$LE_spike_QC_0_LE[i]<-NA, data$LE_spike_QC_0_LE[i]<-data$QC_0_LE[i]) 
}

# Spike test for flag 1
LE_low_day<- median(data_day$QC_1_LE,na.rm=T) - (q*median(abs(data_day$QC_1_LE - median(data_day$QC_1_LE, na.rm=T)),na.rm=T)/0.61045)
LE_high_day<- median(data_day$QC_1_LE,na.rm=T)+ (q*median(abs(data_day$QC_1_LE - median(data_day$QC_1_LE, na.rm=T)),na.rm=T)/0.61045)
LE_low_night<- median(data_night$QC_1_LE,na.rm=T) - (q*median(abs(data_night$QC_1_LE - median(data_night$QC_1_LE, na.rm=T)),na.rm=T)/0.61045)
LE_high_night<- median(data_night$QC_1_LE,na.rm=T)+ (q*median(abs(data_night$QC_1_LE - median(data_night$QC_1_LE, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_1_LE[i]< LE_low_day | data$SW_IN_f[i]>20 & data$QC_1_LE[i]> LE_high_day, data$LE_spike_QC_1_LE[i]<-NA, data$LE_spike_QC_1_LE[i]<-data$QC_1_LE[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_1_LE[i]< LE_low_night | data$SW_IN_f[i]<=20 & data$QC_1_LE[i]> LE_high_night, data$LE_spike_QC_1_LE[i]<-NA, data$LE_spike_QC_1_LE[i]<-data$QC_1_LE[i]) 
}

ggplot(NULL, aes(data$timestamp,data$LE_spike_QC_1_LE), color="red") +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end)))) +
  geom_point( aes(data$timestamp,data$LE_spike_QC_1_LE),col="darkgreen", size=0.5)


###############
#    H
###############

#threshold value q
q<-7   # default

data_day<- subset(data,data$SW_IN_f>20)
data_night<- subset(data,data$SW_IN_f<=20)

# Spike test for flag 0
H_low_day<- median(data_day$QC_0_H,na.rm=T) - (q*median(abs(data_day$QC_0_H - median(data_day$QC_0_H, na.rm=T)),na.rm=T)/0.61045)
H_high_day<- median(data_day$QC_0_H,na.rm=T)+ (q*median(abs(data_day$QC_0_H - median(data_day$QC_0_H, na.rm=T)),na.rm=T)/0.61045)
H_low_night<- median(data_night$QC_0_H,na.rm=T) - (q*median(abs(data_night$QC_0_H - median(data_night$QC_0_H, na.rm=T)),na.rm=T)/0.61045)
H_high_night<- median(data_night$QC_0_H,na.rm=T)+ (q*median(abs(data_night$QC_0_H - median(data_night$QC_0_H, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_0_H[i]< H_low_day | data$SW_IN_f[i]>20 & data$QC_0_H[i]> H_high_day, data$H_spike_QC_0_H[i]<-NA, data$H_spike_QC_0_H[i]<-data$QC_0_H[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_0_H[i]< H_low_night | data$SW_IN_f[i]<=20 & data$QC_0_H[i]> H_high_night, data$H_spike_QC_0_H[i]<-NA, data$H_spike_QC_0_H[i]<-data$QC_0_H[i]) 
}

# Spike test for flag 1
H_low_day<- median(data_day$QC_1_H,na.rm=T) - (q*median(abs(data_day$QC_1_H - median(data_day$QC_1_H, na.rm=T)),na.rm=T)/0.61045)
H_high_day<- median(data_day$QC_1_H,na.rm=T)+ (q*median(abs(data_day$QC_1_H - median(data_day$QC_1_H, na.rm=T)),na.rm=T)/0.61045)
H_low_night<- median(data_night$QC_1_H,na.rm=T) - (q*median(abs(data_night$QC_1_H - median(data_night$QC_1_H, na.rm=T)),na.rm=T)/0.61045)
H_high_night<- median(data_night$QC_1_H,na.rm=T)+ (q*median(abs(data_night$QC_1_H - median(data_night$QC_1_H, na.rm=T)),na.rm=T)/0.61045)

for( i in 1: length(data$timestamp))
{
  ifelse(data$SW_IN_f[i]>20 & data$QC_1_H[i]< H_low_day | data$SW_IN_f[i]>20 & data$QC_1_H[i]> H_high_day, data$H_spike_QC_1_H[i]<-NA, data$H_spike_QC_1_H[i]<-data$QC_1_H[i]) 
  ifelse(data$SW_IN_f[i]<=20 & data$QC_1_H[i]< H_low_night | data$SW_IN_f[i]<=20 & data$QC_1_H[i]> H_high_night, data$H_spike_QC_1_H[i]<-NA, data$H_spike_QC_1_H[i]<-data$QC_1_H[i]) 
}

ggplot(NULL, aes(data$timestamp,data$H_spike_QC_0_H), color="red") +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end)))) +
  geom_point( aes(data$timestamp,data$H_spike_QC_0_H),col="darkgreen", size=0.5)



###########
# u* threshold via REddyProc
###########
# Year
data$Year<- as.numeric(format(as.POSIXct(data$timestamp), format = "%Y"))
# Hour (decimal)
data$Hour<- format(as.POSIXct(data$timestamp), format = "%H:%M")
data$Hour<- strptime(data$Hour, format = "%H:%M", tz = "UTC")
data$Hour<-as.POSIXct(data$Hour, format= "%H:%M", tz = "UTC")
data$Hour<-hour(data$Hour) + minute(data$Hour)  / 60
# Day of year
data$DoY<- as.POSIXlt(data$timestamp)$yday+1

EddyData.F = data[,c("DoY","Hour", "Year","CO2_spike_QC_0_CO2",'LE_spike_QC_0_LE','H_spike_QC_0_H',
                      "CO2_spike_QC_1_CO2",'LE_spike_QC_1_LE','H_spike_QC_1_H',"u.",'SW_IN_f','TA_f')]
EddyData.F <- data %>%
  select(DoY, Hour, Year, CO2_spike_QC_0_CO2, LE_spike_QC_0_LE, H_spike_QC_0_H,
         CO2_spike_QC_1_CO2, LE_spike_QC_1_LE, H_spike_QC_1_H, u., SW_IN_f, TA_f ) %>%
  rename(
    Rg = SW_IN_f,      # Shortwave radiation
    Tair= TA_f,
    NEE = CO2_spike_QC_0_CO2,
    NEE_1 = CO2_spike_QC_1_CO2,
    LE_0 = LE_spike_QC_0_LE,
    LE_1 = LE_spike_QC_1_LE,
    H_0 = H_spike_QC_0_H,
    H_1 = H_spike_QC_1_H,
    Ustar = u.
  )
if ("ch4_flux" %in% names(data)) {
  EddyData.F$CH4_0 <- data$QC_0_CH4  # Skipping spike detection for CH4 to simplify, using QC_0
  EddyData.F$CH4_1 <- data$QC_1_CH4
}

EddyData.F<- fConvertTimeToPosix(EddyData.F, 'YDH', Year='Year', Day='DoY', Hour='Hour')

EddyProc.C <- sEddyProc$new(site_name, EddyData.F, c('NEE', 'Rg', 'Tair', 'Ustar'))
EddyProc.C$sSetLocationInfo(LatDeg = site_lat, LongDeg = site_lon, TimeZoneHour = site_tz)


# estimating the thresholds based on data (using ReddyProc Package)
uStarTh <- EddyProc.C$sEstUstarThold()

#EddyProc.C$sEstimateUstarScenarios(nSample = 100L, probs = c(0.05, 0.5, 0.95))
EddyData.F$NEE[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$LE[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$H[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA

ustar_thres<-uStarTh$uStar [2]
############

#EddyProc.C$sEstimateUstarScenarios(nSample = 100L, probs = c(0.05, 0.5, 0.95))
EddyData.F$NEE[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$LE_0[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$H_0[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA

EddyData.F$NEE_1[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$LE_1[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
EddyData.F$H_1[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA

data$NEE_0_u.<-EddyData.F$NEE
data$NEE_1_u.<-EddyData.F$NEE_1
data$LE_0_u.<-EddyData.F$LE_0
data$LE_1_u.<-EddyData.F$LE_1
data$H_0_u.<-EddyData.F$H_0
data$H_1_u.<-EddyData.F$H_1

if ("ch4_flux" %in% names(data)) {
  EddyData.F$CH4_0[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
  EddyData.F$CH4_1[EddyData.F$Ustar < uStarTh$uStar [2]]<- NA
  data$FCH4_0_u. <- EddyData.F$CH4_0
  data$FCH4_1_u. <- EddyData.F$CH4_1
}
#data$ET_QC <- ifelse(is.na(data$LE_1_u.), NA, data$ET)


# Write postprocessed data to a CSV file
data$timestamp <- format(data$timestamp, "%Y-%m-%d %H:%M:%S")

write.table(data, path_04_qc_flux, row.names = FALSE, sep = ",")
message("Saved: ", path_04_qc_flux)













