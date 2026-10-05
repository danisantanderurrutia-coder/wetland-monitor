# =============================================================================
# Pipeline paths — Lamerdingen cropland (scripts 01–06)
# =============================================================================
library(ggtext)


# --- Mac setup (Daniel) — edit these if folders move ---
project_root    <- "/Users/danielsantander/Documents/Tesis"

# --- Site Metadata (Wallen / Klimafarm) ---
site_name <- "Wallen_CL"
site_lat  <- 54.280684
site_lon  <- 9.258619
site_tz   <- 1  # UTC+1
pipeline_code_dir <- file.path(project_root, "Kiel Code")
eddypro_dir     <- file.path(project_root, "Datos_EPro/Output File EP 2024 JanNov")

# Pipeline CSV outputs (created by scripts 01–06)
pipeline_dir   <- file.path(pipeline_code_dir, "FluxCalc_output")
grassland_dir  <- file.path(project_root, "Grassland/FluxCalc/2025")  # optional

# EddyPro inputs (script 01) — set use_eddypro_paths_from_config <- TRUE to skip file dialogs
use_eddypro_paths_from_config <- TRUE
path_eddypro_full_output <- file.path(
  eddypro_dir,
  "eddypro_EP_biomet_advanced_november_full_output_2026-06-07T213453_exp.csv"
)
path_eddypro_biomet <- file.path(
  eddypro_dir,
  "eddypro_EP_biomet_advanced_november_biomet_2026-06-07T213453_exp.csv"
)
path_eddypro_fluxnet <- file.path(
  eddypro_dir,
  "eddypro_EP_biomet_advanced_november_fluxnet_2026-06-07T213453_exp.csv"
)

# Water level — pegel logger Wallen (optional plots at end of script 06)
use_water_level_plots <- TRUE
path_water_level <- file.path(project_root, "Datos_EPro/Wallen_water_level_2024.csv")

path_01_preparation   <- file.path(pipeline_dir, "01_lmd_cl_preperation.csv")
path_02_qc_biomet     <- file.path(pipeline_dir, "02_lmd_cl_QC_biomet_data.csv")
path_03_biomet_gf     <- file.path(pipeline_dir, "03_lmd_cl_biomet_gap_filling.csv")
path_04_qc_flux       <- file.path(pipeline_dir, "04_lmd_cl_QC_flux_data.csv")
path_05_mds_gapfill   <- file.path(pipeline_dir, "05_lmd_cl_gap_filling_MDS.csv")
path_05_mds_budgets   <- file.path(pipeline_dir, "05_lmd_cl_gap_filling_budgets_MDS.csv")
path_06_ltmm_gapfill  <- file.path(pipeline_dir, "06_lmd_cl_gap_filling_LT_MM.csv")
path_06_ltmm_budgets  <- file.path(pipeline_dir, "06_lmd_cl_gap_filling_budgets_LT_MM.csv")
path_07_ml_gapfill    <- file.path(pipeline_dir, "07_lmd_cl_gap_filling_ML.csv")
path_07_ml_budgets    <- file.path(pipeline_dir, "07_lmd_cl_gap_filling_budgets_ML.csv")

# =============================================================================
# OPTIONAL — Chamber Integration (GHG Budget extension)
# =============================================================================
ENABLE_CHAMBER_INTEGRATION <- TRUE
path_chamber_data <- file.path(project_root, "Chambers Wallen 2024.xlsx -Data_420.csv")

# Global Warming Potential (GWP) Multipliers
# IPCC AR5/AR6 (100-year horizon)
GWP_100_CH4 <- 28
GWP_100_N2O <- 265

# IPCC AR5/AR6 (20-year horizon) - "Plus" scenario for near-term impact
GWP_20_CH4 <- 84
GWP_20_N2O <- 273

# =============================================================================
# OPTIONAL — external meteo for script 03 (gap-fill when cropland *_QC is NA)
# =============================================================================

# --- DWD weather stations (BiometGapfilling_External.R) — recommended ---
# Erfde: air T, RH, soil T (5/20/50 cm); Schleswig: global radiation.
# Requires package: rdwd. First run downloads data (network); then uses cache CSV.
use_dwd_external <- TRUE
path_dwd_external_cache <- file.path(pipeline_dir, "external_dwd_biomet_halfhourly.csv")
dwd_force_redownload <- FALSE   # TRUE = always re-download from DWD
dwd_station_climate <- "Erfde"
dwd_station_solar <- "Schleswig"

# --- Grassland EC tower (alternative / extra donor; not weather stations) ---
use_grassland_biomet <- FALSE
path_gl_biomet_gf    <- ""

use_grassland_comparison <- FALSE
path_gl_ltmm_budgets     <- ""

default_path_gl_biomet_gf    <- file.path(grassland_dir, "03_lmd_gl_biomet_gap_filling.csv")
default_path_gl_ltmm_budgets <- file.path(grassland_dir, "06_lmd_gl_gap_filling_budgets_LT_MM.csv")


#' Resolve optional grassland file: NULL if disabled or not found.
resolve_grassland_path <- function(use_flag, user_path, default_path, label) {
  if (!isTRUE(use_flag)) {
    return(NULL)
  }
  p <- if (length(user_path) && nzchar(trimws(user_path))) {
    trimws(user_path)
  } else {
    default_path
  }
  if (!file.exists(p)) {
    warning(
      label, " is enabled (use_grassland_* = TRUE) but file not found:\n  ", p,
      "\n  -> Continuing WITHOUT grassland for this step.",
      call. = FALSE
    )
    return(NULL)
  }
  message(label, ": using\n  ", normalizePath(p, winslash = "/"))
  normalizePath(p, winslash = "/")
}


#' Call after source(pipeline_config.R) — sets resolved external paths for scripts 03 / 06.
init_grassland_paths <- function() {
  path_gl_biomet_resolved <<- resolve_grassland_path(
    use_grassland_biomet,
    path_gl_biomet_gf,
    default_path_gl_biomet_gf,
    "Grassland tower biomet (script 03)"
  )
  path_gl_budgets_resolved <<- resolve_grassland_path(
    use_grassland_comparison,
    path_gl_ltmm_budgets,
    default_path_gl_ltmm_budgets,
    "Grassland daily NEE (script 06 plots)"
  )

  path_dwd_external_resolved <<- NULL
  if (isTRUE(use_dwd_external)) {
    path_dwd_external_resolved <<- if (length(path_dwd_external_cache) && nzchar(trimws(path_dwd_external_cache))) {
      trimws(path_dwd_external_cache)
    } else {
      file.path(pipeline_dir, "external_dwd_biomet_halfhourly.csv")
    }
    message(
      "DWD external meteo enabled. Cache:\n  ", path_dwd_external_resolved,
      "\n  (set dwd_force_redownload <- TRUE to refresh from DWD)"
    )
  }

  invisible()
}


#' Path to pipeline_config.R (works before that file is sourced).
pipeline_config_path <- function() {
  cmd_args <- commandArgs(trailingOnly = FALSE)
  file_arg <- grep("^--file=", cmd_args, value = TRUE)
  if (length(file_arg)) {
    cfg <- file.path(dirname(sub("^--file=", "", file_arg[1])), "pipeline_config.R")
    if (file.exists(cfg)) {
      return(normalizePath(cfg, winslash = "/"))
    }
  }
  cfg <- file.path(getwd(), "pipeline_config.R")
  if (file.exists(cfg)) {
    return(normalizePath(cfg, winslash = "/"))
  }
  stop(
    "Cannot find pipeline_config.R.\n",
    "Set working directory to the Kiel Code folder (Session -> Set Working Directory -> To Source File Location)."
  )
}


#' Load paths and optional grassland settings (call from scripts 01–06).
load_pipeline_config <- function() {
  cfg <- pipeline_config_path()
  source(cfg, local = parent.frame())
  init_grassland_paths()
  invisible()
}


#' Alias for load_pipeline_config().
source_pipeline_config <- load_pipeline_config


#' Open a file dialog with instructions for EddyPro raw exports.
choose_eddypro_file <- function(instruction) {
  cat("\n", paste(rep("=", 62), collapse = ""), "\n", sep = "")
  cat(instruction, "\n")
  cat(paste(rep("=", 62), collapse = ""), "\n\n", sep = "")
  if (!interactive()) {
    stop("File selection requires an interactive R session (RStudio console or R GUI).")
  }
  path <- file.choose()
  if (length(path) != 1L || !nzchar(path)) {
    stop("No file selected. Script stopped.")
  }
  if (!file.exists(path)) {
    stop("File does not exist: ", path)
  }
  message("Using file: ", normalizePath(path, winslash = "/"))
  path
}

# =============================================================================
# KLIMAFARM GRAPHIC CURATION STANDARD
# =============================================================================

# 1. Dynamic Color Palette Function
#' Assigns consistent colors to variables based on their class.
get_klimafarm_colors <- function(variables) {
  cols <- character(length(variables))
  names(cols) <- variables
  
  counts <- list(ch4=1, co2=1, n2o=1, h2o=1, temp=1, veg=1, orig=1, other=1)
  
  palettes <- list(
    ch4 = c("#E41A1C", "#B30000", "#FF4D4D"),
    co2 = c("#D4AF37", "#B8860B", "#DAA520", "#CD853F"),
    n2o = c("#984EA3", "#6A287E", "#C77CFF"),
    h2o = c("#377EB8", "#1F4E79", "#5B9BD5", "#00BFFF"),
    temp = c("#FF7F00", "#CC6600", "#FF9933", "#FFB366"),
    veg = c("#4DAF4A", "#228B22", "#32CD32", "#006400"),
    orig = c("black", "grey30", "grey50", "grey70"),
    model = c("#1F78B4", "#33A02C", "#E31A1C", "#FF7F00", "#6A3D9A"),
    other = c("#555555", "#888888", "#BBBBBB", "#222222")
  )
  
  for (i in seq_along(variables)) {
    v <- tolower(variables[i])
    # Give priority to 'original/measured' to ensure they become black/grey
    if (grepl("measured|original|raw|qc|dwd|observed|actual", v)) {
      cols[i] <- palettes$orig[min(counts$orig, length(palettes$orig))]
      counts$orig <- counts$orig + 1
    } else if (grepl("ch4|methane", v)) {
      cols[i] <- palettes$ch4[min(counts$ch4, length(palettes$ch4))]
      counts$ch4 <- counts$ch4 + 1
    } else if (grepl("model|gapfill|mds", v)) {
      cols[i] <- palettes$model[min(counts$model, length(palettes$model))]
      if (is.null(counts$model)) counts$model <- 1
      counts$model <- counts$model + 1
    } else if (grepl("co2|carbon|nee|reco", v)) {
      cols[i] <- palettes$co2[min(counts$co2, length(palettes$co2))]
      counts$co2 <- counts$co2 + 1
    } else if (grepl("n2o|nitrogen", v)) {
      cols[i] <- palettes$n2o[min(counts$n2o, length(palettes$n2o))]
      counts$n2o <- counts$n2o + 1
    } else if (grepl("h2o|swc|water|level|le", v)) {
      cols[i] <- palettes$h2o[min(counts$h2o, length(palettes$h2o))]
      counts$h2o <- counts$h2o + 1
    } else if (grepl("temp|ts|ta", v)) {
      cols[i] <- palettes$temp[min(counts$temp, length(palettes$temp))]
      counts$temp <- counts$temp + 1
    } else if (grepl("gpp|veg|ndvi", v)) {
      cols[i] <- palettes$veg[min(counts$veg, length(palettes$veg))]
      counts$veg <- counts$veg + 1
    } else {
      cols[i] <- palettes$other[min(counts$other, length(palettes$other))]
      counts$other <- counts$other + 1
    }
  }
  return(cols)
}

# 2. Master Theme Function
#' Enforces APA capitalization, removes grid lines, removes grey facet boxes.
#' Requires ggplot2.
theme_klimafarm <- function(base_size = 12, base_family = "sans") {
  ggplot2::theme_minimal(base_size = base_size, base_family = base_family) +
    ggplot2::theme(
      panel.grid.major = ggplot2::element_blank(),
      panel.grid.minor = ggplot2::element_blank(),
      axis.line = ggplot2::element_line(color = "black", linewidth = 0.5),
      axis.ticks = ggplot2::element_line(color = "black", linewidth = 0.5),
      strip.background = ggplot2::element_blank(),
      strip.text = ggplot2::element_text(face = "bold", hjust = 0, size = base_size + 2),
      legend.key.width = ggplot2::unit(1.5, "cm"),
      legend.position = "bottom",
      plot.title = ggplot2::element_text(face = "bold", hjust = 0),
      plot.subtitle = ggplot2::element_text(face = "plain", hjust = 0),
      plot.caption = ggtext::element_markdown(hjust = 0, size = base_size)
    )
}

# 2.5 Override labs() to merge title, subtitle, and Process into caption (leyenda)
labs <- function(...) {
  args <- list(...)
  t <- args$title
  s <- args$subtitle
  c <- args$caption
  
  args$title <- NULL
  args$subtitle <- NULL
  args$caption <- NULL
  
  md_caption <- ""
  if (!is.null(t)) md_caption <- paste0("**", t, "**")
  
  if (!is.null(s)) {
    if (nchar(md_caption) > 0) md_caption <- paste0(md_caption, "<br>")
    if (grepl("\\| Process:", s, ignore.case=TRUE)) {
      parts <- strsplit(s, "\\| Process:", perl=TRUE)[[1]]
      if (length(parts) == 2) {
         md_caption <- paste0(md_caption, trimws(parts[1]), "<br>Process: ", trimws(parts[2]))
      } else {
         md_caption <- paste0(md_caption, s)
      }
    } else {
      md_caption <- paste0(md_caption, s)
    }
  }
  
  if (!is.null(c)) {
    if (nchar(md_caption) > 0) md_caption <- paste0(md_caption, "<br>")
    md_caption <- paste0(md_caption, c)
  }
  
  if (nchar(md_caption) > 0) {

    # Replace multibyte chars with HTML entities for ggtext
    md_caption <- gsub("°", "&deg;", md_caption)
    md_caption <- gsub("µ", "&micro;", md_caption)
    md_caption <- gsub("–", "-", md_caption) # en dash
    md_caption <- gsub("—", "-", md_caption) # em dash
    
    args$caption <- md_caption
  }
  
  do.call(ggplot2::labs, args)
}

# 3. Label Standardization Helper
standardize_labels <- function(labels) {
  labels <- gsub("Wallen ", "Wallen ", labels)
  labels <- gsub("Ek_", "Ekel ", labels)
  labels <- gsub("°C", "°C", labels)
  labels <- gsub("(?i)", "", labels)
  labels <- gsub("_", " ", labels)
  labels <- trimws(labels)
  return(labels)
}

# 4. Master Plot Wrapper
#' Applies the Maestro Standard to any ggplot object.
#' It forces the theme, strips grid lines, formatting labs properly,
#' and replaces any bad labels ("....", "_1_u.", etc.)
apply_maestro_standard <- function(p) {
  
  # Extract current title, subtitle, caption
  t <- p$labels$title
  s <- p$labels$subtitle
  cap_text <- p$labels$caption
  
  # Use labs to safely modify ggplot2 S7 object
  p <- p + labs(title = NULL, subtitle = NULL, caption = NULL)
  
  md_caption <- ""
  if (!is.null(t)) md_caption <- paste0("**", t, "**")
  if (!is.null(s) && s != "") {
    if (nchar(md_caption) > 0) md_caption <- paste0(md_caption, "<br>")
    if (grepl("\\| Process:", s, ignore.case=TRUE)) {
      parts <- strsplit(s, "\\| Process:", perl=TRUE)[[1]]
      if (length(parts) == 2) {
         md_caption <- paste0(md_caption, trimws(parts[1]), "<br>Process: ", trimws(parts[2]))
      } else {
         md_caption <- paste0(md_caption, s)
      }
    } else {
      md_caption <- paste0(md_caption, s)
    }
  }
  
  if (!is.null(cap_text)) {
    if (nchar(md_caption) > 0) md_caption <- paste0(md_caption, "<br>")
    md_caption <- paste0(md_caption, "Process: ", cap_text)
  }
  if (nchar(md_caption) > 0) {
    md_caption <- gsub("°", "&deg;", md_caption)
    md_caption <- gsub("µ", "&micro;", md_caption)
    md_caption <- gsub("–", "-", md_caption)
    md_caption <- gsub("—", "-", md_caption)
    p$labels$caption <- md_caption
  }
  
  # Clean up ALL other labels (x, y, color, fill)
  clean_label <- function(l) {
    if (is.character(l)) {
      l <- gsub("\\.{2,}", " ", l) # Remove multiple dots like ....
      l <- gsub("_1_u\\.", " (Filtered)", l)
      l <- gsub("NEEges_gC", "Total NEE", l)
      l <- gsub("NEE_f_gC", "Modeled NEE", l)
      l <- gsub("NEE_0_u._gC", "Raw NEE", l)
      l <- gsub("Recomod", "Ecosystem Respiration", l)
      l <- gsub("FCH4", "CH4 Flux", l)
      l <- gsub("gC-CO2eq m-2 d-1", "gC-CO2eq / m2 / d", l)
      l <- gsub("umol/m2/s", "µmol / m2 / s", l)
      l <- gsub("umol m-2 s-1", "µmol / m2 / s", l)
      l <- gsub("W m-2", "W / m2", l)
      l <- gsub("W m⁻²", "W / m2", l)
    }
    return(l)
  }
  
  if (!is.null(p$labels)) {
    new_labels <- list()
    for (nm in names(p$labels)) {
      if (!nm %in% c("title", "subtitle", "caption") && is.character(p$labels[[nm]])) {
        # Erase x-axis label if it's a dataframe column reference or obvious date/time label
        if (nm == "x" && (grepl("\\$", p$labels[[nm]]) || grepl("date|time|timestamp", tolower(p$labels[[nm]])))) {
          p <- p + ggplot2::xlab(NULL)
        } else {
          new_labels[[nm]] <- clean_label(p$labels[[nm]])
        }
      }
    }
    if (length(new_labels) > 0) {
      p <- p + do.call(labs, new_labels)
    }
  }
  
  # Force the theme onto the plot to ensure grid lines and other stuff are wiped
  p <- p + theme_klimafarm()
  
  return(p)
}

# 5. ggsave Wrapper
#' Automatically intercepts all ggsave calls and applies the maestro standard
#' to the plot right before it saves to disk.
ggsave <- function(filename, plot = ggplot2::last_plot(), ...) {
  if (inherits(plot, "ggplot")) {
    plot <- apply_maestro_standard(plot)
  }
  ggplot2::ggsave(filename = filename, plot = plot, ...)
}
