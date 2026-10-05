# =============================================================================
# Script 07 - Machine Learning Gap-filling (Random Forest & ANN) for CO2 & CH4
# =============================================================================
library(randomForest)
library(nnet)
library(dplyr)
library(ggplot2)

source("load_pipeline.R")

message("Starting Script 07: Machine Learning Gap-Filling (CO2 & CH4)...")

# Load data from script 06 (which contains the gap-filled meteorological drivers)
if (!file.exists(path_06_ltmm_gapfill)) stop("File not found: ", path_06_ltmm_gapfill)
data <- read.csv(path_06_ltmm_gapfill)
data$timestamp <- as.POSIXct(data$timestamp, tz = "UTC")

# Define Predictors
# We use the gap-filled (_f) versions of the biometeorological variables
predictors <- c("TA_f", "SW_IN_f", "VPD_f")
if ("TS5_f" %in% names(data)) predictors <- c(predictors, "TS5_f")
if ("TS20_f" %in% names(data)) predictors <- c(predictors, "TS20_f")

# Verify predictors exist
for (p in predictors) {
  if (!p %in% names(data) || all(is.na(data[[p]]))) {
    warning("Predictor missing or all NA: ", p)
  }
}

# Function to gap-fill using Random Forest
gap_fill_rf <- function(df, target_col, predictors) {
  message("Training RF for ", target_col, "...")
  
  # Only rows where all predictors are available
  valid_rows <- complete.cases(df[, predictors])
  train_data <- df[valid_rows & !is.na(df[[target_col]]), ]
  pred_data <- df[valid_rows, ]
  
  if (nrow(train_data) < 100) {
    warning("Not enough data to train RF for ", target_col)
    return(rep(NA, nrow(df)))
  }
  
  formula <- as.formula(paste(target_col, "~", paste(predictors, collapse = " + ")))
  rf_model <- randomForest(formula, data = train_data, ntree = 100, nodesize = 5, mtry = max(floor(length(predictors)/3), 1))
  
  predictions <- rep(NA, nrow(df))
  predictions[valid_rows] <- predict(rf_model, pred_data)
  
  return(predictions)
}

# Function to gap-fill using ANN (nnet)
gap_fill_ann <- function(df, target_col, predictors) {
  message("Training ANN for ", target_col, "...")
  
  valid_rows <- complete.cases(df[, predictors])
  train_data <- df[valid_rows & !is.na(df[[target_col]]), ]
  pred_data <- df[valid_rows, ]
  
  if (nrow(train_data) < 100) {
    warning("Not enough data to train ANN for ", target_col)
    return(rep(NA, nrow(df)))
  }
  
  # Normalize data for ANN
  normalize <- function(x) { (x - min(x, na.rm=T)) / (max(x, na.rm=T) - min(x, na.rm=T)) }
  
  # create a copy for normalization
  norm_train <- train_data
  norm_pred <- pred_data
  
  for(p in predictors) {
    norm_train[[p]] <- scale(train_data[[p]])
    norm_pred[[p]] <- scale(pred_data[[p]], center=attr(norm_train[[p]],"scaled:center"), scale=attr(norm_train[[p]],"scaled:scale"))
  }
  
  # scale target
  t_min <- min(train_data[[target_col]], na.rm=T)
  t_max <- max(train_data[[target_col]], na.rm=T)
  norm_train[[target_col]] <- (train_data[[target_col]] - t_min) / (t_max - t_min)
  
  formula <- as.formula(paste(target_col, "~", paste(predictors, collapse = " + ")))
  ann_model <- nnet(formula, data = norm_train, size = 5, linout = TRUE, trace = FALSE, maxit = 500)
  
  pred_norm <- predict(ann_model, norm_pred)
  pred_actual <- (pred_norm * (t_max - t_min)) + t_min
  
  predictions <- rep(NA, nrow(df))
  predictions[valid_rows] <- as.numeric(pred_actual)
  
  return(predictions)
}

# 1. Apply to CO2 (NEE)
data$NEE_RF_pred <- gap_fill_rf(data, "NEE_0_u.", predictors)
data$NEE_RF_gapfilled <- ifelse(!is.na(data$NEE_0_u.), data$NEE_0_u., data$NEE_RF_pred)

data$NEE_ANN_pred <- gap_fill_ann(data, "NEE_0_u.", predictors)
data$NEE_ANN_gapfilled <- ifelse(!is.na(data$NEE_0_u.), data$NEE_0_u., data$NEE_ANN_pred)

# 2. Apply to CH4 (if available)
has_ch4 <- "FCH4_0_u." %in% names(data)
if (has_ch4) {
  # CH4 unit conversion: typically nmol m-2 s-1 in EddyPro outputs. 
  # We just model it as is, budget script handles conversion.
  data$CH4_RF_pred <- gap_fill_rf(data, "FCH4_0_u.", predictors)
  data$CH4_RF_gapfilled <- ifelse(!is.na(data$FCH4_0_u.), data$FCH4_0_u., data$CH4_RF_pred)
  
  data$CH4_ANN_pred <- gap_fill_ann(data, "FCH4_0_u.", predictors)
  data$CH4_ANN_gapfilled <- ifelse(!is.na(data$FCH4_0_u.), data$FCH4_0_u., data$CH4_ANN_pred)
  
  # Generate Figure 14b for CH4
  # Enfoque Persona: Superposición cruda del FCH4 original contra las líneas predictivas puras
  plot_df_ch4 <- data %>% filter(!is.na(CH4_RF_pred))
  
  p14b <- ggplot(plot_df_ch4, aes(x = timestamp)) +
    geom_point(aes(y = FCH4_0_u., color = "Raw CH4 (Observed)"), size = 1, alpha = 0.5) +
    geom_point(aes(y = CH4_RF_pred, color = "Random Forest (Predicted)"), size = 0.4, alpha = 0.4) +
    geom_point(aes(y = CH4_ANN_pred, color = "Neural Network (Predicted)"), size = 0.4, alpha = 0.4) +
    scale_color_manual(values = c("Raw CH4 (Observed)" = "darkred", 
                                  "Random Forest (Predicted)" = "forestgreen", 
                                  "Neural Network (Predicted)" = "purple")) +
    guides(color = guide_legend(override.aes = list(size = 3))) +
    labs(
      title = "Methane Gap-Filling: Artificial Intelligence vs Raw Fluxes",
      subtitle = "Random Forest and ANN models learning the anaerobic emission patterns | Process: Kiel ML-Pipeline",
      x = "Date", y = expression(paste(CH[4], " Flux (nmol ", m^-2, " ", s^-1, ")")),
      color = "Model / Data"
    ) + theme_klimafarm()
    
  ggsave(file.path(pipeline_dir, "14b_CH4_Models_Comparison.png"), plot = p14b, width = 10, height = 6, dpi = 300)
} else {
  message("Warning: CH4 column (FCH4_0_u.) not found. Skipping CH4 gap-filling.")
}

# Write out the new gapfilled dataset
write.csv(data, path_07_ml_gapfill, row.names = FALSE)
message("Script 07 finished. Data saved to: ", path_07_ml_gapfill)
