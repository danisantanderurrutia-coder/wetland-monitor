# =============================================================================
# Script 06 — Gap-filling & partitioning: Lloyd–Taylor (Reco) + Michaelis–Menten (GPP)
# =============================================================================
#
# INPUT (required):
#   path_04_qc_flux — cropland half-hourly table after EC QC + u* filter (script 04).
#
# OUTPUT:
#   path_06_ltmm_gapfill  — full time series with Recomod, GPPges, NEEges, THG, etc.
#   path_06_ltmm_budgets  — daily aggregates for carbon budgeting.
#
# EXTERNAL GRASSLAND (optional; pipeline_config.R):
#   use_grassland_comparison + path_gl_ltmm_budgets — daily NEE for cropland vs.
#   grassland plots only. Meteo donor for script 03: use_grassland_biomet + path_gl_biomet_gf.
#
# ALTERNATIVE METHOD:
#   Script 05 (REddyProc MDS) is a parallel branch from the same script-04 file.
#   Do not mix MDS and LT/MM products in one budget without stating both methods.
#
# SIGN CONVENTION (check against EddyPro):
#   Negative NEE ≈ CO2 uptake; positive ≈ release. Filters use NEE > -1 at night.
#
# DOCUMENTED CHOICES & SUGGESTED REVISIONS (before final thesis run):
#   [CURRENT] Reco fit: TS20_f; Reco fill: TA_f  →  [SUGGEST] use TS20_f for both.
#   [CURRENT] Fit Reco on NEE_0_u.; measured Recoges from NEE_1_u.
#             GPP from NEE_0_u. - Recomod; GPPges uses NEE_1_u. - Recomod
#       →  [SUGGEST] pick one QC level (0 or 1) and one Reco column (Recomod/Recoges)
#          for all measured vs. model steps.
#   [CURRENT] periods_reco (3 windows) vs. periods_gpp (9 windows) not aligned
#       →  [SUGGEST] align boundaries or document why they differ.
#   [CURRENT] nls() without tryCatch — one bad period stops the script
#       →  [SUGGEST] wrap fits; report which period failed.
#   [CURRENT] daily budget: mean(half-hourly)*48 assumes 48 values per day
#       →  [SUGGEST] sum half-hours per day; track missing slots per day.
# =============================================================================

library(ggplot2)
library(dplyr)
library(REddyProc)
library(lubridate)
library(gridExtra)

rm(list = ls())

source("load_pipeline.R")

plot_dir <- file.path(dirname(path_06_ltmm_gapfill), "Plots")
data <- read.csv(path_05_mds_gapfill, header = TRUE, sep = ",", dec=".")
data$timestamp <- lubridate::ymd_hms(data$timestamp, truncated = 3, tz = "GMT")

# Map TS_50cm to TS20_f since we skipped script 03
if("TS_50cm" %in% names(data)) data$TS20_f <- data$TS_50cm
if("TS_5cm" %in% names(data)) {
  data$TS5_f <- zoo::na.approx(data$TS_5cm, maxgap=48, na.rm=FALSE)
}
if("SW_IN_1_1_1" %in% names(data) && !("SW_IN_f" %in% names(data))) data$SW_IN_f <- data$SW_IN_1_1_1
if("PPFD_1_1_1" %in% names(data) && !("PPFD_f" %in% names(data))) data$PPFD_f <- data$PPFD_1_1_1
data$date <- as.Date(data$timestamp, format = "%Y-%m-%d")


############################

# Reco — Lloyd & Taylor (1994)

###########################

# CURRENT: Three seasonal windows; separate refit of parameters in each window.
# SUGGEST: When extending the record, update dates here and in periods_gpp together.

# Define flexible time periods as a list of date pairs
periods_reco <- list(
  c(as.Date("2023-11-10"), as.Date("2024-03-31")),  # Period 1: winter / early season
  c(as.Date("2024-04-01"), as.Date("2024-09-19")),  # Period 2: growing season
  c(as.Date("2024-09-20"), as.Date("2025-01-15"))   # Period 3: harvest to winter
)


# Fit Recomod for each period and add to the data frame
data$Recomod <- NA  # Initialize empty Recomod column

# Loop over all defined periods
for (p in 1:length(periods_reco)) {
  # Start and end date of the current period
  period_start <- periods_reco[[p]][1]
  period_end <- periods_reco[[p]][2]
  
  # CURRENT: Night = SW_IN_f < 20 W/m²; fit uses QC flag 0 (NEE_0_u.).
  # SUGGEST: Sensitivity test with SW_IN threshold (10/20/50) and flag 1 only.
  data_period <- subset(data, SW_IN_f < 20 & NEE_0_u. > -1 & date >= period_start & date <= period_end & !is.na(TS20_f))
  
  # Fit Lloyd & Taylor model when enough data are available
  if (nrow(data_period) > 0) {
    # CURRENT: Fit on 10 cm soil temperature (TS20_f).
    x <- data_period$TS20_f
    y <- data_period$NEE_0_u.
    
    # Lloyd & Taylor (1994) temperature response
    # SUGGEST: tryCatch() around nls — log period index if convergence fails
    model <- nls(y ~ A * exp((1 / 56.02 - (1 / ((x + 273.15) - 227.13))) * B), start = list(A = 2, B = 100))
    summary(model)
    
    # CURRENT: Apply Lloyd–Taylor using TS20_f for strict physiological representation (Model A).
    # This ensures the model gracefully stops (returns NA) when the local tower sensors fail.
    data$Recomod[data$date >= period_start & data$date <= period_end] <- coef(model)["A"] * exp(
      (1 / 56.02 - (1 / ((data$TS20_f[data$date >= period_start & data$date <= period_end] + 273.15) - 227.13))) * coef(model)["B"]
    )
  }
}

# Recoges: measured nighttime flux where valid, otherwise Recomod
# CURRENT: Stricter QC flag 1 (NEE_1_u.) for keeping measurements; model elsewhere.
# SUGGEST: Use NEE_1_u. consistently for GPP residual and Recoges (see GPP block below).
data$Recoges <- ifelse(
  !is.na(data$NEE_1_u.) & data$SW_IN_f < 20 & data$NEE_1_u. > -1,
  data$NEE_1_u.,
  data$Recomod
)

#####################

# Plot Lloyd & Taylor fit for one period
plot_period <- function(data, period_start, period_end, period_label) {
  # Subset nighttime data for the current period
  data_period <- subset(data, SW_IN_f < 20 & NEE_0_u. > -1 & date >= period_start & date <= period_end & !is.na(TS20_f))
  
  # Fit and plot when enough data are available
  if (nrow(data_period) > 0) {
    # x and y for model fitting
    x <- data_period$TS20_f
    y <- data_period$NEE_0_u.
    
    # Lloyd & Taylor (1994)
    model <- nls(y ~ A * exp((1 / 56.02 - (1 / ((x + 273.15) - 227.13))) * B), start = list(A = 2, B = 100))
    
    # Model curve over observed soil temperature range
    fitted_curve <- coef(model)["A"] * exp((1 / 56.02 - (1 / ((data_period$TS20_f + 273.15) - 227.13))) * coef(model)["B"])
    
    # Pseudo R2
    ss_res <- sum((data_period$NEE_0_u. - fitted_curve)^2, na.rm = TRUE)
    ss_tot <- sum((data_period$NEE_0_u. - mean(data_period$NEE_0_u., na.rm=TRUE))^2, na.rm=TRUE)
    pseudo_r2 <- 1 - (ss_res / ss_tot)

    # Period label for plot title
    period_label <- paste(format(period_start, "%d %b"), "-", format(period_end, "%d %b"))
    
    # ggplot of observations and fit
    plot <- ggplot(data_period, aes(x = TS20_f, y = NEE_0_u.)) +
      geom_point(color = "darkred", alpha = 0.5) +  # Observations
      geom_line(aes(x = TS20_f, y = fitted_curve), color = "orange", size = 1) +  # Model curve
      labs(title = period_label,
           subtitle = paste0("LT Fit | Pseudo R2 = ", round(pseudo_r2, 2)),
           x = expression("Soil Temperature at 20 cm ("*degree*"C)"),
           y = expression("Ecosystem Respiration ("*mu*"mol m"^{-2}*" s"^{-1}*")")) +
      theme_klimafarm() +
      coord_cartesian(ylim = c(-1, 20))+
      theme(plot.title = element_text(size = 11, face = "bold"),
            plot.subtitle = element_text(size = 9, color = "darkgray"),
            axis.text.x = element_text(angle = 0, hjust = 0.5))
    
    return(plot)
  } else {
    return(NULL)
  }
}

# Build plots for each period
plot_list <- list()
for (p in 1:length(periods_reco)) {
  period_start <- periods_reco[[p]][1]
  period_end <- periods_reco[[p]][2]
  
  plot_list[[p]] <- plot_period(data, period_start, period_end, p)
}

# Print all period plots
for (plot in plot_list) {
  if (!is.null(plot)) {
    print(plot)
  }
}

# Combine plots in one figure (adjust ncol as needed)
reco_grid <- arrangeGrob(grobs = plot_list, ncol = 3)
ggsave(file.path(plot_dir, "01_Reco_LT_Fits.png"), reco_grid, width = 12, height = 4 * ceiling(length(plot_list)/3))



##############################################################

#GPP

###############################################################

# GPP — Michaelis–Menten light response (vs. SW_IN_f)
#
# CURRENT: Nine phenology windows (maize/crop calendar); day = SW_IN_f >= 20.
# SUGGEST: Align period edges with periods_reco; verify harvest/plough dates each year.

# GPP periods as a list of date pairs (crop phenology)
periods_gpp <- list(
  c(as.Date("2023-11-10"), as.Date("2024-03-15")),   # winter
  c(as.Date("2024-03-16"), as.Date("2024-04-30")), 
  c(as.Date("2024-05-01"), as.Date("2024-06-14")), # start vegv # c(as.Date("2024-05-11"),
  c(as.Date("2024-06-15"), as.Date("2024-06-30")), # corn starts to grow
  c(as.Date("2024-07-01"), as.Date("2024-07-15")),
  c(as.Date("2024-07-16"), as.Date("2024-08-15")),  
  c(as.Date("2024-08-16"), as.Date("2024-09-05")), #harvest
  c(as.Date("2024-09-06"), as.Date("2024-09-19")), #harvest
  c(as.Date("2024-09-20"), as.Date("2025-01-15")) #winter
)

# Subset daytime data for GPP fitting
data_day <- subset(data, SW_IN_f >= 20 & !is.na(PPFD_f) & !is.na(Recomod))

# List to store GPPmod by period
gppmods <- list()

# Loop over periods and fit Michaelis-Menten GPP model
for (i in 1:length(periods_gpp)) {
  # Data for the current period
  period_data <- subset(data_day, date >= periods_gpp[[i]][1] & date <= periods_gpp[[i]][2])
  
  # Fit when enough data are available
  if (nrow(period_data) > 0) {
    # CURRENT: GPP proxy = NEE_0_u. - Recomod (model Reco, not Recoges).
    # SUGGEST: Use NEE_1_u. - Recoges if adopting stricter QC throughout.
    y <- period_data$NEE_0_u. - period_data$Recomod
    x <- period_data$SW_IN_f
    
    # Fit GPP light-response curve (GPmax < 0 if NEE negative = uptake)
    # SUGGEST: tryCatch() per period; reduce trace = TRUE when running full pipeline
    gpp_model <- try(nls(y ~ (GPmax * x / (q_alpha + x)), trace = TRUE, start = list(GPmax = -40, q_alpha = 10)), silent = TRUE)

    if (!inherits(gpp_model, "try-error")) {
      # Store fitted parameters
      GPmax <- coef(gpp_model)["GPmax"]
      q_alpha <- coef(gpp_model)["q_alpha"]
      
      # Model GPP for all timesteps in the period
      period_data$GPPmod <- GPmax * period_data$SW_IN_f / (q_alpha + period_data$SW_IN_f)
      
      # Append period results
      gppmods[[i]] <- period_data
    } else {
      warning(paste("GPP model failed to converge for period", i))
      gppmods[[i]] <- NULL
    }
  } else {
    gppmods[[i]] <- NULL
  }
}

# Combine GPP results from all periods (ignoring NULLs)
data_day_combined <- do.call(rbind, gppmods)

# GPPges: from measured NEE when available, otherwise GPPmod
# CURRENT: Measured branch uses NEE_1_u. minus Recomod (model), not Recoges.
data_day_combined$GPPges <- ifelse(!is.na(data_day_combined$NEE_1_u.), 
                                   data_day_combined$NEE_1_u. - data_day_combined$Recomod, 
                                   data_day_combined$GPPmod)

# Merge GPP into full table; set GPP to 0 at night (no assimilation when SW_IN_f low)
data <- merge(data, data_day_combined[, c("timestamp", "GPPmod", "GPPges")], by = "timestamp", all.x = TRUE)
data$GPPges <- ifelse(is.na(data$GPPges), 0, data$GPPges)
data$GPPmod <- ifelse(is.na(data$GPPmod), 0, data$GPPmod)


gpp_plot_list <- list()
# Optional: plot GPP light-response fit per period
for (i in 1:length(periods_gpp)) {
  if (i <= length(gppmods) && !is.null(gppmods[[i]])) {
    period_data_gpp <- gppmods[[i]]
    
    # Calculate pseudo R-squared
    ss_res <- sum((period_data_gpp$NEE_0_u. - period_data_gpp$Recomod - period_data_gpp$GPPmod)^2, na.rm = TRUE)
    ss_tot <- sum((period_data_gpp$NEE_0_u. - period_data_gpp$Recomod - mean(period_data_gpp$NEE_0_u. - period_data_gpp$Recomod, na.rm=TRUE))^2, na.rm = TRUE)
    pseudo_r2 <- 1 - (ss_res / ss_tot)
    
    # Date range for plot title (Day/Month only)
    period_start <- format(periods_gpp[[i]][1], "%d %b")
    period_end <- format(periods_gpp[[i]][2], "%d %b")
    
    gpp_plots <- ggplot(period_data_gpp, aes(x = SW_IN_f, y = NEE_0_u. - Recomod)) +
      geom_point(color = "green", alpha = 0.5) + 
      geom_line(aes(x = SW_IN_f, y = GPPmod), color = "turquoise", size = 1) +
      coord_cartesian(ylim = c(-70, 10))+
      labs(title = paste(period_start, "-", period_end),
           subtitle = paste0("MM Fit | Pseudo R2 = ", round(pseudo_r2, 2)),
           x = expression("Incoming Shortwave Radiation ("*W~m^{-2}*")"),
           y = expression("Gross Primary Productivity ("*mu*"mol m"^{-2}*" s"^{-1}*")")) +
      theme_klimafarm() +
      theme(plot.title = element_text(size = 11, face = "bold"),
            plot.subtitle = element_text(size = 9, color = "darkgray"),
            axis.text.x = element_text(angle = 0, hjust = 0.5))
    
    gpp_plot_list[[i]] <- gpp_plots
  }
}

# Combine GPP fit plots (adjust ncol as needed), removing NULL plots
gpp_plot_list <- gpp_plot_list[!sapply(gpp_plot_list, is.null)]
if (length(gpp_plot_list) > 3) {
  # Select 3 representative periods: early, middle, late
  indices <- round(seq(1, length(gpp_plot_list), length.out = 3))
  gpp_plot_list <- gpp_plot_list[indices]
}
if (length(gpp_plot_list) > 0) {
  gpp_grid <- arrangeGrob(grobs=gpp_plot_list, ncol = 3)
  ggsave(file.path(plot_dir, "02_GPP_MM_Fits.png"), gpp_grid, width = 12, height = 4)
  ggsave("/Users/danielsantander/.gemini/antigravity/brain/ab9437a7-41a7-4901-9867-7195b3c729db/02_GPP_MM_Fits.png", gpp_grid, width = 12, height = 4)
}



# --- Combine Reco + GPP into NEE ---
# NEEmod: fully modeled (Recomod + GPPmod) — useful for checking internal consistency.
# NEEges: mixed measured/model (Recoges + GPPges) — used for budgets and gap-filled series.
# SUGGEST: After pipeline run, plot NEEges vs. NEE_1_u. and count remaining NA in NEEges.
data$NEEmod <- data$Recomod + data$GPPmod
data$NEEges <- data$Recoges + data$GPPges

# =========================================================================
# MODEL A (2cm Alternative)
# =========================================================================
data$Recomod_5cm <- NA
for (p in 1:length(periods_reco)) {
  period_start <- periods_reco[[p]][1]
  period_end <- periods_reco[[p]][2]
  data_period <- subset(data, SW_IN_f < 20 & NEE_0_u. > -1 & date >= period_start & date <= period_end & !is.na(TS5_f))
  if (nrow(data_period) > 0) {
    x <- data_period$TS5_f
    y <- data_period$NEE_0_u.
    model <- try(nls(y ~ A * exp((1 / 56.02 - (1 / ((x + 273.15) - 227.13))) * B), start = list(A = 2, B = 100)), silent=TRUE)
    if (!inherits(model, "try-error")) {
      data$Recomod_5cm[data$date >= period_start & data$date <= period_end] <- coef(model)["A"] * exp(
        (1 / 56.02 - (1 / ((data$TS5_f[data$date >= period_start & data$date <= period_end] + 273.15) - 227.13))) * coef(model)["B"]
      )
    }
  }
}
data$Recoges_5cm <- ifelse(!is.na(data$NEE_1_u.) & data$SW_IN_f < 20 & data$NEE_1_u. > -1, data$NEE_1_u., data$Recomod_5cm)

gppmods_2cm <- list()
data_day <- subset(data, SW_IN_f >= 20)
for (i in 1:length(periods_gpp)) {
  period_data <- subset(data_day, date >= periods_gpp[[i]][1] & date <= periods_gpp[[i]][2])
  if (nrow(period_data) > 0) {
    y <- period_data$NEE_0_u. - period_data$Recomod_5cm
    x <- period_data$SW_IN_f
    valid <- !is.na(y) & !is.na(x)
    if(sum(valid) > 10) {
        gpp_model <- try(nls(y[valid] ~ (GPmax * x[valid] / (q_alpha + x[valid])), start = list(GPmax = -40, q_alpha = 10)), silent=TRUE)
        if (!inherits(gpp_model, "try-error")) {
          period_data$GPPmod_5cm <- coef(gpp_model)["GPmax"] * period_data$SW_IN_f / (coef(gpp_model)["q_alpha"] + period_data$SW_IN_f)
          gppmods_2cm[[i]] <- period_data
        }
    }
  }
}
if(length(gppmods_2cm) > 0) {
    data_day_combined_2cm <- do.call(rbind, gppmods_2cm)
    data_day_combined_2cm$GPPges_5cm <- ifelse(!is.na(data_day_combined_2cm$NEE_1_u.), data_day_combined_2cm$NEE_1_u. - data_day_combined_2cm$Recomod_5cm, data_day_combined_2cm$GPPmod_5cm)
    data <- merge(data, data_day_combined_2cm[, c("timestamp", "GPPmod_5cm", "GPPges_5cm")], by = "timestamp", all.x = TRUE)
} else {
    data$GPPmod_5cm <- NA
    data$GPPges_5cm <- NA
}
data$GPPges_5cm <- ifelse(is.na(data$GPPges_5cm), 0, data$GPPges_5cm)
data$GPPmod_5cm <- ifelse(is.na(data$GPPmod_5cm), 0, data$GPPmod_5cm)
data$NEEges_5cm <- data$Recoges_5cm + data$GPPges_5cm


# Plot NEE

date_start<- "2024-01-01"
date_end<-"2024-12-31"

p_nee1 <- ggplot() +
  #geom_point( aes(data$timestamp,data$NEEges),col="orange", size=0.5, alpha = 0.5)+
  geom_point( aes(data$timestamp,data$NEE_1_u.),col="brown", size=0.5)+
  scale_y_continuous(limits = c(-65, 20), breaks = seq(-65,20, by=10)) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_x_datetime(name = "Month", limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  labs(title = "Measured Net Ecosystem Exchange (NEE)", 
       subtitle = "Variables: NEE_1_u. (Filtered Measured Fluxes) | Process: Scatter plot displaying the raw half-hourly NEE measured by the Eddy Covariance system, filtered for quality control.",
       x = "Timestamp", y = "NEE (µmol m⁻² s⁻¹)")+ 
  theme_klimafarm()
# ggsave(file.path(plot_dir, "03_NEE_Measured_Only.png"), p_nee1, width = 10, height = 5)


p_nee2 <- ggplot(data, aes(x = timestamp)) +
  geom_point(aes(y = NEEges, color = "NEE_gapfilled"), size = 0.5, alpha = 0.5) +
  geom_point(aes(y = NEE_1_u., color = "NEE_meas"), size = 0.5) +
  scale_y_continuous(limits = c(-65, 20), breaks = seq(-65, 20, by = 10)) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_x_datetime(name = "Month", limits = as.POSIXct(c(date_start, date_end)), 
                   date_breaks = "1 month", date_labels = "%b") +
  labs(title = "Gapfilled vs Measured NEE", 
       subtitle = "Variables: NEEges (Gapfilled) vs NEE_1_u. (Measured) | Process: Overlay of the fully gap-filled half-hourly dataset (orange) over the original measured points (brown), highlighting the data recovered by the models.",
       x = "Timestamp", y = "NEE (µmol m⁻² s⁻¹)", color = "Legend") + 
  scale_color_manual(values = get_klimafarm_colors(c("NEE_gapfilled", "NEE_meas"))) +
  theme_klimafarm() +
  theme(axis.text.x = element_text(color = "grey20", size = 12),
        axis.text.y = element_text(color = "grey20", size = 12),
        axis.title.y = element_text(size = 13, angle = 90),
        axis.title.x = element_blank(),
        plot.title = element_blank())
# ggsave(file.path(plot_dir, "04_NEE_Gapfilled_vs_Measured.png"), p_nee2, width = 10, height = 5)

# 
# 
# ####################################################
# 
# # Alternative GPP workflow (commented out; see active loop above)
# data_day <- subset(data, SW_IN_f >= 20)
# 
# gppmods <- list()
# 
# for (i in 1:length(periods_gpp)) {
#   period_data <- subset(data_day, date >= periods_gpp[[i]][1] & date <= periods_gpp[[i]][2])
#   
#   if (nrow(period_data) > 0) {
#     # Michaelis-Menten GPP vs. SW_IN
#     y <- period_data$NEE_0_u. - period_data$Recomod
#     x <- period_data$SW_IN_f
#     
#     gpp_model <- nls(y ~ (GPmax * x / (q_alpha + x)), trace = TRUE, start = list(GPmax = -40, q_alpha = 10))
#     
#     GPmax <- coef(gpp_model)["GPmax"]
#     q_alpha <- coef(gpp_model)["q_alpha"]
#     
#     period_data$GPPmod <- GPmax * period_data$SW_IN_f / (q_alpha + period_data$SW_IN_f)
#     
#     gppmods[[i]] <- period_data
#   }
# }
# 
# 
# data_day_combined <- do.call(rbind, gppmods)
# 
# data_day_combined$GPPges <- ifelse(!is.na(data_day_combined$NEE_1_u.), 
#                                    data_day_combined$NEE_1_u. - data_day_combined$Recomod, 
#                                    data_day_combined$GPPmod)
# 
# data <- merge(data, data_day_combined[, c("timestamp", "GPPmod", "GPPges")], by = "timestamp", all.x = TRUE)
# data$GPPges <- ifelse(is.na(data$GPPges), 0, data$GPPges)
# data$GPPmod <- ifelse(is.na(data$GPPmod), 0, data$GPPmod)
# 
# # Optional GPP fit plots per period
# for (i in 1:length(periods_gpp)) {
#   period_data_gpp <- gppmods[[i]]
#   
#   print( ggplot(period_data_gpp, aes(x = SW_IN_f, y = NEE_0_u. - Recomod)) +
#            geom_point(color = "blue", alpha = 0.5) + 
#            geom_line(aes(x = SW_IN_f, y = GPPmod), color = "turquoise") +
#            labs(title = paste("GPP Fitting for Period ", i),
#                 x = "PAR (SW_IN_f)",
#                 y = "GPP (NEE - Recomod)") +
#            coord_cartesian(ylim = c(-60, 5))+
#            theme_klimafarm())
# }
# 
# 
# # ggplot list for multi-panel GPP plots
# plot_list <- list()
# 
# for (i in 1:length(periods_gpp)) {
#   if (!is.null(gppmods[[i]])) {
#     period_data_gpp <- gppmods[[i]]
#     
#     period_start <- format(periods_gpp[[i]][1], "%d-%b-%Y")
#     period_end <- format(periods_gpp[[i]][2], "%d-%b-%Y")
#     period_label <- paste("Fitting period:", period_start, "to", period_end)
#     
#     p <- ggplot(period_data_gpp, aes(x = SW_IN_f, y = NEE_0_u. - Recomod)) +
#       geom_point(color = "green", alpha = 0.5) + 
#       geom_line(aes(x = SW_IN_f, y = GPPmod), color = "turquoise") +
#       labs(title = paste("GPP fitting for period", i),
#            x = "SW_IN (W/m²)",
#            y = "GPP (µmol/m²/s)") +
#       annotate("text", x = max(period_data_gpp$SW_IN_f, na.rm = TRUE) * 0.7, 
#                y = 3, label = period_label, size = 4, hjust = 0, color = "black") +  
#       coord_cartesian(ylim = c(-70, 5)) +
#       theme_klimafarm()
#     
#     plot_list[[i]] <- p
#   } else {
#     message(paste("No data for period", i))
#   }
# }
# 
# final_plot <- wrap_plots(plot_list) + plot_layout(ncol = 2)
# print(final_plot)
# 

#########
# NEE — carbon units & annual summary
###########

# (NEEmod / NEEges recomputed here; same formulas as above — keep both blocks in sync if editing.)
data$NEEmod <- data$Recomod + data$GPPmod
data$NEEges <- data$Recoges + data$GPPges

# Half-hourly g C m⁻² per 30-min slot (1800 s integration)
data$gCO2_30min<-data$NEEges*1800*44.01*10^-6
plot(data$NEEges)

data$NEE_0_u._gC <- data$NEE_0_u. * 1800 * 12 * 10^(-6)
data$NEEges_gC <- data$NEEges * 1800 * 12 * 10^(-6)
data$NEEges_5cm_gC <- data$NEEges_5cm * 1800 * 12 * 10^(-6)
data$NEE_f_gC <- data$NEE_f * 1800 * 12 * 10^(-6)
co2_eq <- 3.666 * 0.01  # g C m⁻² → t CO₂-eq ha⁻¹ (verify sign: uptake vs. emission for thesis)
#ch4_eq <- 1.333 * 28 * 0.01  # Conversion factor from CH4 to CO2-equivalent
data$THG <- (data$NEEges_gC*co2_eq )
sum(data$THG)

# SUGGEST: sum(THG, na.rm = TRUE) for reporting; document partial years (2023, 2025)

data$year <- year(data$timestamp)
# Annual GHG budget summary by year
GHG_summary <- data %>%
  group_by(year) %>%
  summarise(
    total_THG = sum(THG),
    total_CO2_tha= sum(NEEges_gC)*0.01
  )

print(GHG_summary)
sum(data$THG)
date_start<- "2024-01-01"
date_end<-"2024-12-31"

p_nee3 <- ggplot() +
  #geom_point( aes(data$timestamp,data$NEEges),col="orange", size=0.5, alpha = 0.5)+
  geom_point( aes(data$timestamp,data$NEE_1_u.),col="brown", size=0.5)+
  scale_y_continuous(limits = c(-60, 30), breaks = seq(-60,30, by=5)) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_x_datetime(name = "Month", limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  labs(title = "Measured NEE (B/W Theme)", 
       subtitle = "Variables: NEE_1_u. (Filtered Measured Fluxes) | Process: High contrast, black-and-white theme version of the measured high-quality half-hourly NEE scatter plot.",
       x = "Timestamp", y = "NEE (µmol m⁻² s⁻¹)")+ 
  theme_klimafarm()
# ggsave(file.path(plot_dir, "05_NEE_Measured_BW.png"), p_nee3, width = 10, height = 5)



# -------------------------------------------------------------------------
# MODEL A: Local Physiological Model (LRC + Lloyd-Taylor)
# -------------------------------------------------------------------------
# Variable: NEEges
# Characteristics: Strictly relies on local tower sensors (TS20_f, SW_IN_f). 
# When local sensors fail (e.g., Nov-Dec), it outputs NA, causing the plot to gracefully 
# drop off. This makes it ideal for showing the clean, true physiological behaviour 
# without interpolating noise.
# -------------------------------------------------------------------------
p_nee4 <- ggplot() +
  geom_point(aes(x = data$timestamp, y = data$NEEges, color = "NEE_gapfilled"), size = 0.5, alpha = 0.5) +
  geom_point(aes(x = data$timestamp, y = data$NEE_1_u., color = "NEE_meas"), size = 0.5) +
  scale_y_continuous(limits = c(-60, 25), breaks = seq(-60, 25, by = 5)) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_x_datetime(name = "Month", limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
  labs(title = "Gapfilled vs Measured NEE (B/W Theme)", 
       subtitle = "Variables: NEEges (Gapfilled) vs NEE_1_u. (Measured) | Process: High contrast, black-and-white theme version of the fully gap-filled dataset overlaid with measured points.",
       x = "Timestamp", y = "NEE (µmol m⁻² s⁻¹)", color = "") + 
  scale_color_manual(values = get_klimafarm_colors(c("NEE_gapfilled", "NEE_meas"))) +
  theme_klimafarm() +
  theme(legend.position = "bottom")
ggsave(file.path(plot_dir, "06_NEE_Gapfilled_vs_Measured_BW.png"), p_nee4, width = 10, height = 5)

# Save gap-filled flux time series
write.table(data, path_06_ltmm_gapfill, row.names = FALSE, col.names = TRUE, sep = ",")
message("Saved: ", path_06_ltmm_gapfill)


#######################################

#### Daily balances and annual budgets

############################################
# CURRENT: Daily = mean of half-hourly vars, then NEEges_gC and THG multiplied by 48.
#          Equivalent to a full daily sum only if each day has 48 half-hour values.
# SUGGEST: aggregate with sum() per day for NEEges_gC / THG, or count n() per day.

data$date <- as.Date(data$timestamp, format = "%Y-%m-%d")
data$date <- as.POSIXct(data$date, format = "%Y-%m-%d")
#data$date <- as.Date(data$date)

# Aggregate data by date (daily means)
vars_mean <- c("NEE_0_u._gC", "NEEges", "NEE_f", "LE_1_u.", "H_1_u.", "LE_f", "H_f", "THG",
                "TS5_f", "TS20_f", "TS20_f","Recoges" , "GPPges", "VPD_f",
               "NEEges_gC", "NEE_f_gC", "SWC_5cm", "SWC_20cm", "SWC_20cm",
               "NEEges_5cm_gC", "NEEges_5cm", "GPPges_5cm", "Recomod_5cm",
               "TA_f", "PPFD_1_1_1", "RH_QC", "ALB_1_1_1", "RN_1_1_1", 
               "SHF_1_1_1", "SW_IN_f", "SW_OUT_1_1_1", "LW_IN_QC", "LW_OUT_QC")

# Aggregate data by date (daily means) using dplyr for robustness against all-NA columns
daily <- data %>%
  group_by(date) %>%
  summarise(across(any_of(vars_mean), ~ mean(.x, na.rm = TRUE)), .groups = "drop") %>%
  mutate(date = as.POSIXct(date, format = "%Y-%m-%d", tz = "GMT")) %>%
  tidyr::complete(date = seq(min(date, na.rm=TRUE), max(date, na.rm=TRUE), by = "1 day"))

# Convert date back to POSIXct format just to be safe
daily$date <- as.POSIXct(daily$date, format = "%Y-%m-%d", tz = "GMT")

# Convert half-hourly NEEges_gC to gC m^-2 d^-1 (×48)
daily$NEE_0_u._gC <- daily$NEE_0_u._gC * 48
daily$NEEges_gC <- daily$NEEges_gC*48
daily$NEEges_5cm_gC <- daily$NEEges_5cm_gC*48
daily$NEE_f_gC <- daily$NEE_f_gC*48
daily$THG<-daily$THG*48

sum(daily$THG, na.rm=TRUE)

THG <- sum(daily$NEE_f_gC*co2_eq, na.rm=TRUE)

daily$timestamp<-format(daily$timestamp, "%Y-%m-%d %H:%M:%S")
# Save the results to a CSV file
write.table(daily, path_06_ltmm_budgets, row.names = FALSE, sep = ",")
message("Saved: ", path_06_ltmm_budgets)

###################
# Plots (optional grassland comparison — see pipeline_config.R)
###################
use_gl_compare <- !is.null(path_gl_budgets_resolved)

daily$date <- as.POSIXct(daily$date, format = "%Y-%m-%d")

date_start<- "2024-01-01"
date_end<-"2024-12-31"

if (use_gl_compare) {
  daily_gl <- read.csv(path_gl_budgets_resolved)
  daily_gl$date <- as.POSIXct(daily_gl$date, format = "%Y-%m-%d")
} else {
  message(
    "Grassland comparison plots skipped.\n",
    "  To enable: pipeline_config.R -> use_grassland_comparison <- TRUE and set path_gl_ltmm_budgets."
  )
}

data$timestamp <- lubridate::ymd_hms(data$timestamp, truncated = 3, tz = "GMT")

# -------------------------------------------------------------------------
# MODEL B: Regional Budget Model (REddyProc MDS)
# -------------------------------------------------------------------------
# Variable: NEE_f
# Characteristics: REddyProc's Marginal Distribution Sampling (MDS) algorithm.
# It patches missing local drivers with external DWD data to calculate a 365-day continuous flux.
# Essential for calculating the annual Net GHG Budget. It provides a stable,
# gap-filled continuous band of values during winter without the extreme mathematical 
# artifacts of forced curve fitting.
# Plot 07
p_nee_flux <- ggplot() + 
  geom_point(aes(data$timestamp, data$NEE_f, color = "Model B (MDS)"), size = 0.5, alpha = 0.5) +
  geom_point(aes(data$timestamp, data$NEE_0_u., color = "Measured"), size = 0.5, alpha = 0.8) +
  scale_color_manual(name = "Data Type", values = c("Model B (MDS)" = "yellow", "Measured" = "red")) +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end))), date_breaks = "1 months", date_labels = "%b %y") +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_y_continuous("CO2 flux (µmol m-2 s-1)", limits = c(-60, 40), breaks = seq(-60, 40, by = 10)) +
  labs(title = "NEE – Wallen (Klimafarm cropland) - Model B",
       subtitle = "Red points: Original measured flux. Yellow points: Model B (MDS) gap-filled values. | Process: Regional MDS gap-filling reconstructs a stable contiguous baseline during winter.") +
  theme_klimafarm() +
  theme(legend.position = "bottom",
        axis.text.x = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain", angle=45),
        axis.text.y = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain"),
        axis.title.y = element_text(size = 13, angle = 90, hjust = .5, vjust = .5, face = "plain"),
        axis.title.x = element_blank(),
        plot.title = element_text(size = 15, face = "bold"))
ggsave(file.path(plot_dir, "07_NEE_CO2_Flux_Red.png"), p_nee_flux, width = 10, height = 5)

# -------------------------------------------------------------------------
# COMPARISON: Model A vs Model B vs Measured
# -------------------------------------------------------------------------
p_nee_comp <- ggplot() + 
  geom_point(aes(data$timestamp, data$NEE_f, color = "Model B (MDS)"), size = 0.5, alpha = 0.5) +
  geom_point(aes(data$timestamp, data$NEEges, color = "Model A (50cm)"), size = 0.5, alpha = 0.5) +
  geom_point(aes(data$timestamp, data$NEEges_5cm, color = "Model A (5cm)"), size = 0.5, alpha = 0.5) +
  geom_point(aes(data$timestamp, data$NEE_0_u., color = "Measured"), size = 0.5, alpha = 0.8) +
  scale_color_manual(name = "Data Type", values = c("Model B (MDS)" = "yellow", "Model A (50cm)" = "turquoise", "Model A (5cm)" = "blue", "Measured" = "red")) +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end))), date_breaks = "1 months", date_labels = "%b %y") +
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  scale_y_continuous("CO2 flux (µmol m-2 s-1)", limits = c(-60, 40), breaks = seq(-60, 40, by = 10)) +
  labs(title = "NEE Models Comparison – Wallen (Klimafarm cropland)",
       subtitle = "Red: Measured. Turquoise: Model A (50cm). Blue: Model A (5cm). Yellow: Model B (MDS). | Process: Comparison of Model A vs Model B.") +
  theme_klimafarm() +
  theme(legend.position = "bottom",
        axis.text.x = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain", angle=45),
        axis.text.y = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain"),
        axis.title.y = element_text(size = 13, angle = 90, hjust = .5, vjust = .5, face = "plain"),
        axis.title.x = element_blank(),
        plot.title = element_text(size = 15, face = "bold"))
ggsave(file.path(plot_dir, "07b_NEE_Models_Comparison.png"), p_nee_comp, width = 10, height = 5)

  # =========================================================================
  # Gap Statistics Calculation
  # =========================================================================
  start_time <- min(data$timestamp[!is.na(data$NEE_0_u.)], na.rm=TRUE)
  end_time <- max(data$timestamp[!is.na(data$NEE_0_u.)], na.rm=TRUE)
  data_real <- subset(data, timestamp >= start_time & timestamp <= end_time)

  total_theoretical <- nrow(data_real)
  n_measured <- sum(!is.na(data_real$NEE_0_u.))
  n_model_a_10cm <- sum(!is.na(data_real$NEEges))
  n_model_a_2cm <- sum(!is.na(data_real$NEEges_5cm))
  n_model_b <- sum(!is.na(data_real$NEE_f))
  
  message("--------------------------------------------------")
  message("GAP STATISTICS (Strictly within valid EddyPro timeframe)")
  message("Actual Period: ", start_time, " to ", end_time)
  message("Total Theoretical Half-Hours: ", total_theoretical)
  message("Measured (Raw) NEE_0_u. : ", n_measured, " (", round(n_measured/total_theoretical*100, 1), "%)")
  message("Model A (10cm - missing summer) : ", n_model_a_10cm, " (", round(n_model_a_10cm/total_theoretical*100, 1), "%)")
  message("Model A (2cm - rescued summer) : ", n_model_a_2cm, " (", round(n_model_a_2cm/total_theoretical*100, 1), "%)")
  message("Model B (MDS Algorithmic): ", n_model_b, " (", round(n_model_b/total_theoretical*100, 1), "%)")
  message("--------------------------------------------------")
  
  calc_metrics <- function(obs, pred) {
    valid <- !is.na(obs) & !is.na(pred)
    obs_v <- obs[valid]
    pred_v <- pred[valid]
    if(length(obs_v) < 10) return(c(RMSE=NA, R2=NA, Bias=NA))
    rmse <- sqrt(mean((obs_v - pred_v)^2))
    r2 <- cor(obs_v, pred_v)^2
    bias <- mean(pred_v - obs_v)
    return(c(RMSE=rmse, R2=r2, Bias=bias))
  }
  
  metrics_A10 <- calc_metrics(data_real$NEE_0_u., data_real$NEEges)
  metrics_A2 <- calc_metrics(data_real$NEE_0_u., data_real$NEEges_5cm)
  metrics_B <- calc_metrics(data_real$NEE_0_u., data_real$NEE_f)
  
  message("PERFORMANCE METRICS vs MEASURED (NEE_0_u.)")
  message(sprintf("Model A (50cm) -> RMSE: %.3f | R2: %.3f | Bias: %.3f", metrics_A10[1], metrics_A10[2], metrics_A10[3]))
  message(sprintf("Model A (5cm)  -> RMSE: %.3f | R2: %.3f | Bias: %.3f", metrics_A2[1], metrics_A2[2], metrics_A2[3]))
  message(sprintf("Model B (MDS)  -> RMSE: %.3f | R2: %.3f | Bias: %.3f", metrics_B[1], metrics_B[2], metrics_B[3]))
  message("--------------------------------------------------")
  
  if ("NEE_1_u." %in% names(data_real)) {
    qc0_count <- sum(!is.na(data_real$NEE_0_u.))
    qc1_count <- sum(!is.na(data_real$NEE_1_u.))
    qc0_sd <- sd(data_real$NEE_0_u., na.rm=TRUE)
    qc1_sd <- sd(data_real$NEE_1_u., na.rm=TRUE)
    message("QC FLAG STATISTICS")
    message(sprintf("QC=0 (Strict): %d points (%.1f%%) | StdDev: %.2f", qc0_count, qc0_count/total_theoretical*100, qc0_sd))
    message(sprintf("QC=1 (Relaxed): %d points (%.1f%%) | StdDev: %.2f", qc1_count, qc1_count/total_theoretical*100, qc1_sd))
    message("--------------------------------------------------")
  }

  # =========================================================================
  # plotting CO2
  # =========================================================================
  p_nee_daily <- ggplot() + 
    geom_line(aes(daily$date, daily$NEE_f_gC, color = "Model B (MDS)"), linewidth=0.5) +
    geom_line(aes(daily$date, daily$NEEges_gC, color = "Model A (50cm)"), linewidth=0.5, linetype="solid") +
    geom_line(aes(daily$date, daily$NEEges_5cm_gC, color = "Model A (5cm)"), linewidth=0.5, linetype="dashed") +
    geom_point(aes(daily$date, daily$NEE_0_u._gC, color = "Measured"), size=1.5, alpha = 0.8) +
    scale_color_manual(name = "Data Type", values = get_klimafarm_colors(c("Model B (MDS)", "Model A (50cm)", "Model A (5cm)", "Measured"))) +
    guides(color = guide_legend(override.aes = list(linetype = c("solid", "solid", "dashed", "solid")))) +
    scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end))),date_breaks = "1 months",date_labels = "%b %y") +
    geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
    scale_y_continuous("NEE (gC/m²/d)",limits = c(-16, 6), breaks = seq(-16, 6, by = 2))+
    labs(title = "Daily Carbon Budgets (NEE)",
         subtitle = "Comparison of Raw measurements, Physiological Model (A), and ML Algorithmic Model (B). | Process: Half-hourly flux rates were aggregated to daily carbon uptake. Overlays highlight real vs modeled days.") +
    theme_klimafarm()+
    theme(legend.position = "bottom",
          axis.text.x = element_text(color = "grey20", size = 10, hjust = .5, vjust = .5, face = "plain", angle=45),
          axis.text.y = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, face = "plain"),
          axis.title.y = element_text(size = 12, angle = 90, hjust = .5, vjust = .5, face = "plain"),
          axis.title.x = element_blank(),
          plot.title = element_text(size = 15, face = "bold"))
  ggsave(file.path(plot_dir, "08_NEE_Daily_Budgets.png"), p_nee_daily, width = 10, height = 5)

  # =========================================================================
  # Respiration Comparison (5cm vs 50cm) to show why 5cm fails in summer
  # =========================================================================
  p_reco_comp <- ggplot() + 
    geom_point(aes(data$timestamp[data$SW_IN_f < 20], data$NEE_1_u.[data$SW_IN_f < 20], color = "Measured Nighttime (NEE_1_u.)"), size=1, alpha=0.3) +
    geom_point(aes(data$timestamp, data$Recomod, color = "Model A (50cm proxy)"), size=1, alpha=0.5) +
    geom_point(aes(data$timestamp, data$Recomod_5cm, color = "Model A (5cm proxy)"), size=1, alpha=0.5) +
    scale_color_manual(name = "Data Source", values = get_klimafarm_colors(c("Model A (50cm proxy)", "Model A (5cm proxy)", "Measured Nighttime (NEE_1_u.)"))) +
    guides(color = guide_legend(override.aes = list(size = 3))) +
    scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start,date_end))),date_breaks = "1 months",date_labels = "%b %y") +
    scale_y_continuous("Ecosystem Respiration (µmol/m²/s)", limits = c(0, 40), breaks = seq(0, 40, by = 5)) +
    labs(title = "Respiration Models vs Reality (Summer Gap)",
         subtitle = "The 50cm model (Turquoise) breaks during the summer sensor failure. The 5cm model (Blue) survives but drastically underestimates reality. | This reveals that the 'extreme peaks' were actually real measured data, while the purely surface-driven model (5cm) remained artificially flat.") +
    theme_klimafarm() +
    theme(legend.position = "bottom",
          axis.text.x = element_text(color = "grey20", size = 10, angle=45, hjust=1),
          axis.title.x = element_blank())
          
  ggsave(file.path(plot_dir, "08b_Respiration_5cm_vs_50cm_v2.png"), p_reco_comp, width = 10, height = 5)


  # =========================================================================
  # QC Flag Comparison (0 vs 1)
  # =========================================================================
  if ("NEE_1_u." %in% names(data)) {
    p_qc_compare <- ggplot(data) +
      geom_point(aes(x = timestamp, y = NEE_1_u., color = "QC 1 (Good)"), size = 0.5, alpha = 0.5) +
      geom_point(aes(x = timestamp, y = NEE_0_u., color = "QC 0 (Perfect)"), size = 0.5, alpha = 0.8) +
      scale_color_manual(name = "Quality Flag", values = c("QC 1 (Good)" = "orange", "QC 0 (Perfect)" = "turquoise")) +
      scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)), date_breaks = "1 month", date_labels = "%b") +
      scale_y_continuous(limits = c(-40, 20), breaks = seq(-40, 20, by = 10)) +
      labs(title = "NEE Data Quality Comparison (Flag 0 vs Flag 1)",
           subtitle = "Observing noise introduction when relaxing quality criteria.",
           x = "Time", y = "NEE (µmol m-2 s-1)") +
      theme_klimafarm() +
      theme(legend.position = "bottom",
            plot.title = element_text(face = "bold"))
    ggsave(file.path(plot_dir, "12_QC_Flag_Comparison.png"), p_qc_compare, width = 10, height = 5)
  }

if (use_gl_compare) {
  vlines <- as.POSIXct(c("2024-01-01", "2025-01-01"))  # POSIXct for vline positions

  p_gl_comp <- ggplot() +
    geom_line(aes(daily$date, daily$NEE_f_gC, color = "Cropland"), linewidth = 0.5) +
    geom_point(aes(daily$date, daily$NEE_f_gC, color = "Cropland"), size = 1.5) +
    geom_line(aes(daily_gl$date, daily_gl$NEEges_gC, color = "Grassland"), linewidth = 0.5) +
    geom_point(aes(daily_gl$date, daily_gl$NEEges_gC, color = "Grassland"), size = 1.5) +
    scale_x_datetime(limits = as.POSIXct(c(date_start, date_end)),
                     date_breaks = "1 month", date_labels = "%b %y") +
    geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) +
    geom_vline(xintercept = vlines, linetype = "dashed", color = "grey", linewidth = 0.8) +
    scale_y_continuous("CO2 flux (gC m-2 d-1)",
                       limits = c(-16, 6), breaks = seq(-16, 6, by = 2)) +
    scale_color_manual(values = get_klimafarm_colors(c("Grassland", "Cropland"))) +
    labs(title = "NEE – Wallen (Klimafarm cropland) vs. grassland",
         subtitle = "Variables: NEEges_gC (Daily Summed NEE) from Cropland and Grassland Datasets | Process: Compares daily carbon budgets between the two field sites to evaluate the impact of land use and crop dynamics on the overall carbon balance.") +
    theme_klimafarm() +
    theme(axis.text.x = element_text(color = "grey20", size = 12, angle = 0),
          axis.text.y = element_text(color = "grey20", size = 12),
          axis.title.y = element_text(size = 13, angle = 90),
          axis.title.x = element_blank(),
          legend.title = element_blank(),
          plot.title = element_text(size = 15, face = "bold"),
          legend.position = "bottom")
# ggsave(file.path(plot_dir, "09_Grassland_Comparison.png"), p_gl_comp, width = 10, height = 5)
}

#####plotting meteo

p_meteo <- ggplot(daily, aes(x = date)) +   
  geom_hline(yintercept = 0, linetype = "dashed", color = "black", linewidth = 0.5) + 
  geom_area(aes(y = SWC_5cm * 100, fill = "SWC5_f"), alpha=0.6) + 
  scale_y_continuous(name = "Soil Water Content 5 cm (%)", 
                     limits = c(0, 60), 
                     breaks = seq(0, 60, by = 10)) +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start, date_end))),
                   date_breaks = "1 month", 
                   date_labels = "%b %Y") +
  scale_fill_manual(values = get_klimafarm_colors(c("SWC_5cm")),
                     name = "",
                     labels = c("SWC 5 cm")) +
  labs(title = "Soil Water Content Dynamics – Wallen (Klimafarm cropland)",
       subtitle = "Variables: SWC_5cm (Soil Water Content 5cm) | Process: Tracking the progressive drought and rewetting phases across the year.") +
  theme_klimafarm() +
  theme(
    axis.text.x = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5, angle=45),
    axis.text.y = element_text(color = "grey20", size = 12, hjust = .5, vjust = .5),
    axis.title.x = element_blank(),
    legend.position = "bottom"
  )
ggsave(file.path(plot_dir, "10_Soil_Temp_SWC.png"), p_meteo, width = 10, height = 5)

##########################################################
# Optional: Wallen water level vs soil moisture (pipeline_config.R)
##########################################################

if (isTRUE(use_water_level_plots) && exists("path_water_level") && file.exists(path_water_level)) {
  message("Water level file: ", path_water_level)

  wtd_raw <- read.csv(path_water_level, header = TRUE, sep = ",", stringsAsFactors = FALSE)
  # Columns: x1 = date, x2 = seconds from midnight, x3 = water level (m); logger / station IDs
  wtd_raw$timestamp <- as.POSIXct(wtd_raw$x1, format = "%Y-%m-%d", tz = "UTC") +
    as.difftime(wtd_raw$x2, units = "secs")

  wtd_loggers <- wtd_raw %>%
    mutate(date_only = floor_date(timestamp, "1 day")) %>%
    group_by(date_only, logger) %>%
    summarise(water_level = mean(x3, na.rm = TRUE), .groups = "drop") %>%
    mutate(logger = as.factor(logger)) %>%
    # Padding dates with NAs so ggplot breaks the line instead of interpolating
    tidyr::complete(date_only = seq(min(date_only), max(date_only), by = "1 day"), logger)

  wtd_wide <- wtd_loggers %>% 
    tidyr::pivot_wider(names_from = logger, values_from = water_level, names_prefix = "WL_logger_")
  
  data_wtd <- merge(
    data[, c("timestamp", "SWC_5cm", "SWC_20cm", "SWC_20cm")],
    wtd_wide,
    by.x = "timestamp", by.y = "date_only",
    all.x = TRUE
  )

  p_water <- ggplot() +
    # Individual loggers
    geom_line(data = wtd_loggers, aes(x = date_only, y = water_level, color = logger), linewidth = 0.5, alpha = 0.5) +
    # Ecosystem Spatial Mean
    stat_summary(data = wtd_loggers, aes(x = date_only, y = water_level), fun = mean, geom = "line", color = "black", linewidth = 1.2) +
    scale_color_viridis_d(name = "Logger ID") +
    labs(title = "Wallen — groundwater level (Raw Loggers + Spatial Mean)",
         subtitle = "Colored lines: Individual loggers. Thick Black Line: Ecosystem Spatial Mean. | Process: Highlighting spatial variability and overall ecosystem water availability.",
         x = "Time", y = "Water level (m)") +
    theme_klimafarm() +
    theme(legend.position = "bottom")
  ggsave(file.path(plot_dir, "11_Water_Level.png"), p_water, width = 10, height = 5)

  if ("SWC_20cm" %in% names(data_wtd)) {
    p_swc_water <- ggplot(data_wtd, aes(x = timestamp, y = SWC_20cm)) +
      geom_point(size = 0.4, alpha = 0.5, color = "darkgreen") +
      labs(title = "Cropland SWC 20 cm",
           y = "SWC (%)",
           subtitle = "Variables: SWC_20cm | Process: High resolution half-hourly measurements of Soil Water Content at 10cm depth.") +
      theme_klimafarm()
    # ggsave(file.path(plot_dir, "12_Cropland_SWC_20cm.png"), p_swc_water, width = 10, height = 5)
  }

  message("Water level merged with cropland SWC for exploratory plots (not used in gap-fill).")
} else {
  message(
    "Water-level plots skipped. Set use_water_level_plots <- TRUE and check path_water_level in pipeline_config.R"
  )
}

##########################################################
# NEW: Ecohydrology & Energy Balance Closure
##########################################################

# 1. Energy Balance Closure (EBC)
# EBC = (LE_f + H_f) vs (RN - G)
daily$RN_G <- daily$RN_1_1_1 - daily$SHF_1_1_1
daily$LE_H <- daily$LE_f + daily$H_f

fit <- lm(LE_H ~ RN_G, data = daily)
summary_fit <- summary(fit)
slope <- coef(fit)[2]
intercept <- coef(fit)[1]
r_squared <- summary_fit$r.squared
sign_intercept <- ifelse(intercept >= 0, "+", "-")
eq_label <- sprintf("LE + H = %.2f (RN - G) %s %.2f\nR² = %.2f", slope, sign_intercept, abs(intercept), r_squared)

p_ebc <- ggplot(daily, aes(x = RN_G, y = LE_H)) +
  geom_point(alpha = 0.5, color = "blue") +
  geom_abline(slope = 1, intercept = 0, color = "turquoise", linetype = "dashed") +
  geom_smooth(method = "lm", color = "black", se = FALSE) +
  annotate("text", x = Inf, y = -Inf, label = eq_label, hjust = 1.1, vjust = -0.5, size = 5, fontface = "bold") +
  labs(title = "Energy Balance Closure - Wallen (Klimafarm cropland)",
       x = "Available Energy (RN - G) [W m⁻²]",
       y = "Turbulent Fluxes (LE + H) [W m⁻²]",
       subtitle = "Process: Assesses the conservation of energy. A slope near 1 indicates high quality flux data.") +
  theme_klimafarm()
ggsave(file.path(plot_dir, "13_Energy_Balance_Closure.png"), p_ebc, width = 7, height = 6)

# 2. Evapotranspiration (ET) and Ecosystem Water Use Efficiency (eWUE)
# ET [mm/day] = LE [W/m2] * 86400 s/d / 2450000 J/kg
daily$ET_mm <- (daily$LE_f * 86400) / 2450000
daily$ET_mm[daily$ET_mm < 0] <- 0  # Ignore negative ET (condensation)
daily$eWUE <- abs(daily$GPPges) / daily$ET_mm  # gC/mm
daily$eWUE[is.infinite(daily$eWUE)] <- NA

p_ewue <- ggplot(daily, aes(x = date, y = eWUE)) +
  geom_point(color = "darkgreen", size = 0.8, alpha = 0.6) +
  geom_smooth(span = 0.2, color = "green") +
  scale_x_datetime(limits = as.POSIXct(as.Date(c(date_start, date_end))), date_breaks = "1 month", date_labels = "%b %y") +
  scale_y_continuous(limits = c(0, 10), expand = c(0, 0)) +
  labs(title = "Ecosystem Water Use Efficiency (eWUE) - Wallen",
       y = "eWUE (gC m⁻² mm⁻¹)",
       subtitle = "Process: Calculates the carbon assimilated per millimeter of water evaporated/transpired.") +
  theme_klimafarm() + theme(axis.title.x = element_blank())
ggsave(file.path(plot_dir, "14_Ecosystem_WUE.png"), p_ewue, width = 10, height = 5)

# 3. GPP vs VPD (Atmospheric Drought Stress)
p_vpd <- ggplot(daily, aes(x = VPD_f, y = abs(GPPges))) +
  geom_point(alpha = 0.5, color = "purple") +
  geom_smooth(method = "loess", color = "black") +
  scale_x_continuous(limits = c(0, NA), expand = c(0, 0)) +
  scale_y_continuous(limits = c(0, NA), expand = c(0, 0)) +
  labs(title = "Photosynthesis (GPP) vs. Atmospheric Dryness (VPD)",
       x = "VPD (hPa)",
       y = "GPP (gC m⁻² d⁻¹)",
       subtitle = "Process: Identifies stomatal closure and photosynthetic limitation during high atmospheric moisture deficit.") +
  theme_klimafarm()
ggsave(file.path(plot_dir, "15_GPP_vs_VPD.png"), p_vpd, width = 7, height = 6)

# 4. Bowen Ratio (H / LE)
daily$Bowen <- daily$H_f / daily$LE_f
p_bowen <- ggplot(daily, aes(x = date, y = Bowen)) +
  geom_point(color = "orange", size = 0.8, alpha = 0.6) +
  geom_smooth(span = 0.2, color = "turquoise") +
  scale_x_datetime(limits = as.POSIXct(c("2024-01-01", "2024-12-31")), date_breaks = "1 month", date_labels = "%b %y") +
  scale_y_continuous(limits = c(-2, 5)) +
  geom_hline(yintercept = 1, linetype = "dashed") +
  labs(title = "Bowen Ratio (H / LE) - Wallen",
       y = "Bowen Ratio",
       subtitle = "Process: Analyzes energy partitioning. Values < 1 indicate evaporation-dominated (wet/growing) periods.") +
  theme_klimafarm() + theme(axis.title.x = element_blank())
ggsave(file.path(plot_dir, "16_Bowen_Ratio.png"), p_bowen, width = 10, height = 5)

message("Ecohydrology plotting complete.")


