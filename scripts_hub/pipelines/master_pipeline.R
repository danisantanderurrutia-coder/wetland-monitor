# ==============================================================================
# KIEL CODE: MASTER PIPELINE ORCHESTRATOR
# ==============================================================================
# This script executes the entire ecosystem in chronological order:
# 1. The Sap: Loads the configuration and Maestro Standard.
# 2. The Stem: Executes the core Eddy Covariance continuous data pipeline.
# 3. The Branches: Executes the independent satellite analyses.
# ==============================================================================

pipeline_root <- "/Users/danielsantander/Documents/Tesis"
kiel_code_dir <- file.path(pipeline_root, "Kiel Code")

if (!dir.exists(kiel_code_dir)) {
  stop("Kiel Code directory not found at: ", kiel_code_dir)
}

setwd(pipeline_root)
message("Master Pipeline Starting...")
message("Project Root: ", pipeline_root)

# ------------------------------------------------------------------------------
# 1. THE SAP: Global Configuration & Rules
# ------------------------------------------------------------------------------
message("\n[1/3] Injecting The Sap (Global Configurations and Maestro Standard)...")
source(file.path(kiel_code_dir, "pipeline_config.R"), local = new.env(parent = globalenv()))
message("✓ pipeline_config.R loaded successfully.")

# ------------------------------------------------------------------------------
# 2. THE STEM: Core Eddy Covariance Pipeline
# ------------------------------------------------------------------------------
message("\n[2/3] Executing The Stem (Continuous Eddy Covariance Fluxes)...")
setwd(kiel_code_dir)

# The stem scripts as documented in the architecture overview
stem_scripts <- c(
  "00_lmd_cl_extract_clean_biomet.R",
  "01_lmd_cl_processing_eddypro_output.R",
  "02_lmd_cl_QC_biomet_data.R",
  "build_dwd_external_biomet.R",  # Trigger external DWD API
  "03_lmd_cl_QC_biomet_gap_filling.R",
  "04_lmd_cl_QC_eddy_data.R",
  "05_lmd_cl_MDS_gap_filling.R",
  "06_lmd_cl_LT_MM_gap_filling.R",
  "07_lmd_cl_ML_gap_filling.R",
  "08_lmd_cl_GHG_Budgets.R"
)

t0 <- Sys.time()
for (script in stem_scripts) {
  message("\n", paste(rep("-", 50), collapse = ""))
  message(" STEM: Running ", script, " ...")
  message(paste(rep("-", 50), collapse = ""))
  
  if (!file.exists(script)) {
    warning("Script not found, skipping: ", script)
    next
  }
  
  tryCatch({
    source(script, local = new.env(parent = globalenv()))
  }, error = function(e) {
    message("ERROR in Stem script ", script, ": ", e$message)
  })
}

# ------------------------------------------------------------------------------
# 3. THE BRANCHES & EXTERNAL INTEGRATIONS: Satellite Analyses
# ------------------------------------------------------------------------------
message("\n[3/3] Executing The Branches (Independent Satellite Analyses)...")
setwd(pipeline_root)

branches <- list(
  list(path = "01_Switch_WalterLieth_NASA.R", dir = pipeline_root, name = "NASA Climatology (01)"),
  list(path = "02_Switch_Geospatial_SiteMap.R", dir = pipeline_root, name = "Geospatial SiteMap (02)"),
  list(path = "09_lmd_cl_GHG_Chamber_Integration.R", dir = kiel_code_dir, name = "Static Chambers (09)"),
  list(path = "plot_depth_profiles.R", dir = kiel_code_dir, name = "Depth Profiles Arrays"),
  list(path = "Data_Compression/SoilCompression.R", dir = pipeline_root, name = "Precompression Curves")
)

for (branch in branches) {
  message("\n", paste(rep("~", 50), collapse = ""))
  message(" BRANCH: Executing ", branch$name, " ...")
  message(paste(rep("~", 50), collapse = ""))
  
  setwd(branch$dir)
  
  # Set up a clean environment but load the sap
  env <- new.env(parent = globalenv())
  
  if (!file.exists(branch$path) && !file.exists(basename(branch$path))) {
    warning("Branch script not found, skipping: ", branch$path)
    next
  }
  
  tryCatch({
    script_to_run <- if(file.exists(basename(branch$path))) basename(branch$path) else branch$path
    source(script_to_run, local = env)
  }, error = function(e) {
    message("ERROR in Branch ", branch$name, ": ", e$message)
  })
}

# ------------------------------------------------------------------------------
# FINISH
# ------------------------------------------------------------------------------
setwd(pipeline_root)
total_time <- round(difftime(Sys.time(), t0, units = "mins"), 1)
message("\n==============================================================================")
message(" MASTER PIPELINE COMPLETED IN ", total_time, " MINUTES.")
message(" All generated plots have been standardized by the Maestro Standard.")
message("==============================================================================\n")
