# -------------------------------------------------------------------------
# 00_lmd_cl_extract_clean_biomet.R
# -------------------------------------------------------------------------
# Purpose: Extract raw biomet data from .ghg archives, clean up column
# mismatches, aggregate to 30-minute intervals, and pre-gap-fill using DWD.
# This creates the "External Biomet" file needed for EddyPro to run without 
# crashing on mismatched columns.
# -------------------------------------------------------------------------

# Load required libraries
library(dplyr)
library(readr)
library(lubridate)
library(parallel)
library(tidyr)

# Ensure we are in the correct directory if run from RStudio
if (basename(getwd()) == "Kiel Code") {
  pipeline_dir <- getwd()
} else if (dir.exists("Kiel Code")) {
  pipeline_dir <- file.path(getwd(), "Kiel Code")
  setwd(pipeline_dir)
} else {
  stop("Please run this script from inside the 'Kiel Code' folder.")
}

# Source configuration to get DWD station info ("Erfde", "Schleswig")
source("pipeline_config.R")
load_pipeline_config()

if (isTRUE(use_dwd_external)) {
  source("build_dwd_external_biomet.R")
}

# Define raw data directory
# We search one level up in the Datos_EPro folder to find all .ghg files
raw_ghg_dir <- normalizePath(file.path(pipeline_code_dir, "../Datos_EPro"), mustWork = FALSE)

# 1. Find all .ghg files recursively
ghg_files <- list.files(raw_ghg_dir, pattern = "\\.ghg$", full.names = TRUE, recursive = TRUE)
if (length(ghg_files) == 0) {
  stop(paste("No .ghg files found in", raw_ghg_dir))
}
message("Found ", length(ghg_files), " .ghg files to process.")

# Helper function to read a single .ghg file's biomet data
read_ghg_biomet <- function(f) {
  tryCatch({
    # List files inside the .ghg zip archive
    file_list <- unzip(f, list = TRUE)
    # Find the file ending in '-biomet.data'
    biomet_file <- file_list$Name[grepl("-biomet\\.data$", file_list$Name)]
    if (length(biomet_file) == 0) return(NULL)
    
    # Read the text lines from the zipped biomet file directly into memory
    lines <- readLines(unz(f, biomet_file[1]), warn = FALSE)
    
    # Find the header row (DATAH)
    datah_line <- grep("^DATAH", lines, value = TRUE)
    if (length(datah_line) == 0) return(NULL)
    
    # Extract column names
    col_names <- strsplit(datah_line, "\t")[[1]]
    
    # Find the actual data rows (DATA)
    data_lines <- grep("^DATA\t", lines, value = TRUE)
    if (length(data_lines) == 0) return(NULL)
    
    # Parse the data into a dataframe, reading everything as character to avoid bind_rows type conflicts
    df <- read_delim(I(paste(data_lines, collapse="\n")), delim="\t", 
                     col_names = col_names, show_col_types = FALSE,
                     col_types = cols(.default = "c"))
    return(df)
  }, error = function(e) {
    warning("Error reading ", f, ": ", e$message)
    return(NULL)
  })
}

message("Extracting and reading biomet data from all files (this may take a few minutes)...")

# 2. Read all files in parallel (using multiple CPU cores to speed it up)
cores <- detectCores() - 1
all_biomet_list <- mclapply(ghg_files, read_ghg_biomet, mc.cores = cores)

# Remove any files that were corrupted or empty (NULLs)
all_biomet_list <- all_biomet_list[!sapply(all_biomet_list, is.null)]

message("Binding all data into a single dataframe...")

# 3. Combine everything. 
# bind_rows is incredibly smart: it aligns columns by their NAMES.
# If September files have "added columns up front", bind_rows will place them in the correct column
# or create a new column, ensuring 100% uniformity in the final dataset!
biomet_raw <- bind_rows(all_biomet_list)

# 4. Clean up the dataframe and convert columns back to numeric
biomet_raw <- biomet_raw %>%
  # Combine DATE and TIME into a single datetime object
  mutate(
    timestamp_raw = ymd_hms(paste(DATE, substr(TIME, 1, 8)))
  ) %>%
  filter(!is.na(timestamp_raw)) %>%
  # Convert all sensor measurements back to numeric (ignoring parsing warnings for 'nan')
  mutate(across(-c(DATAH, DATE, TIME, timestamp_raw), ~suppressWarnings(as.numeric(.))))

# --- Aggregation to 30 minutes ---
message("Aggregating to 30-minute intervals...")
# We use floor_date to assign the time to the BEGINNING of the interval 
# (e.g., 0:00 for the 0:00-0:30 window) exactly as the supervisor requested.
biomet_30min <- biomet_raw %>%
  mutate(
    timestamp_30min = floor_date(timestamp_raw, unit = "30 minutes")
  ) %>%
  # Remove raw strings and useless columns
  select(-DATAH, -DATE, -TIME, -timestamp_raw, -starts_with("CHK")) %>%
  # Group by the 30-min block and calculate the mean for every numeric column
  group_by(timestamp_30min) %>%
  summarise(across(everything(), \(x) mean(x, na.rm = TRUE))) %>%
  rename(timestamp = timestamp_30min)

# Replace NaN (resulting from mean of empty groups) with NA
biomet_30min[is.na(biomet_30min)] <- NA

# --- Pre-Gap-filling with DWD ---
message("Pre-gap-filling using DWD weather stations...")
if (isTRUE(use_dwd_external) && exists("load_dwd_external_biomet")) {
  # Load DWD data (from Erfde and Schleswig stations)
  dwd_data <- load_dwd_external_biomet(
    data = biomet_30min,
    cache_path = path_dwd_external_resolved,
    force_download = isTRUE(dwd_force_redownload),
    station_climate = dwd_station_climate,
    station_solar = dwd_station_solar
  )
  
  # Merge our 30-minute biomet data with the DWD proxy data by timestamp
  biomet_30min <- biomet_30min %>%
    left_join(dwd_data, by = "timestamp")
  
  # Create Plots directory
  plot_dir <- file.path(pipeline_dir, "FluxCalc_output", "Plots")
  dir.create(plot_dir, recursive = TRUE, showWarnings = FALSE)
  library(ggplot2)
  
  # Fill TA (Air Temp) gaps with DWD TA_ex
  ta_col <- names(biomet_30min)[grepl("^TA_", names(biomet_30min))]
  if (length(ta_col) > 0) {
    # Generate Plot
    p_ta <- ggplot(biomet_30min, aes(x = timestamp)) +
      geom_point(aes(y = TA_ex), color = "red", size = 0.5, alpha = 0.5) +
      geom_point(aes(y = .data[[ta_col[1]]]), color = "black", size = 0.5) +
      labs(title = "Air Temperature: Site (Black) vs DWD (Red)", y = "Temperature (C)", x = "Date") +
      theme_klimafarm()
    ggsave(file.path(plot_dir, "00_TA_vs_DWD.png"), p_ta, width = 10, height = 4)
    
    biomet_30min <- biomet_30min %>%
      mutate(!!ta_col[1] := coalesce(!!sym(ta_col[1]), TA_ex))
  }
  
  # Fill RH (Relative Humidity) gaps with DWD RH_ex
  rh_col <- names(biomet_30min)[grepl("^RH_", names(biomet_30min))]
  if (length(rh_col) > 0) {
    biomet_30min <- biomet_30min %>%
      mutate(!!rh_col[1] := coalesce(!!sym(rh_col[1]), RH_ex))
  }
  
  # Fill SW_IN (Incoming Shortwave Radiation) gaps with DWD SW_IN_ex
  sw_col <- names(biomet_30min)[grepl("^SWIN_", names(biomet_30min))]
  if (length(sw_col) > 0) {
    # Generate Plot
    p_sw <- ggplot(biomet_30min, aes(x = timestamp)) +
      geom_point(aes(y = SW_IN_ex), color = "red", size = 0.5, alpha = 0.5) +
      geom_point(aes(y = .data[[sw_col[1]]]), color = "black", size = 0.5) +
      labs(title = "Shortwave Radiation: Site (Black) vs DWD (Red)", y = "Radiation (W/m2)", x = "Date") +
      theme_klimafarm()
    ggsave(file.path(plot_dir, "00_SW_IN_vs_DWD.png"), p_sw, width = 10, height = 4)
    
    biomet_30min <- biomet_30min %>%
      mutate(!!sw_col[1] := coalesce(!!sym(sw_col[1]), SW_IN_ex))
  }
  
  # Remove the DWD-specific columns so EddyPro doesn't get confused
  biomet_30min <- biomet_30min %>% select(-ends_with("_ex"))
} else {
  message("DWD disabled in config, skipping gap-fill.")
}

# --- Final Export ---
out_file <- file.path(pipeline_dir, "external_biomet_for_eddypro.csv")

# Format timestamp for EddyPro (needs separate Date and Time columns)
biomet_30min_export <- biomet_30min %>%
  mutate(
    date = format(timestamp, "%Y-%m-%d"),
    time = format(timestamp, "%H:%M")
  ) %>%
  select(date, time, everything(), -timestamp)

# Write to CSV, using -9999 for NA (standard EddyPro missing value format)
write_csv(biomet_30min_export, out_file, na = "-9999")
message("Done! Clean external biomet saved to: ", out_file)
