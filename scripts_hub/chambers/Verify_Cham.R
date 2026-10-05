# ====================================
# Script to verify proceddure
# Creado 11 de Marzo 2026
# Verificacion_Chambers_8.R
# About the file Chambers_8.R
# ====================================

# ==================================
# 1. To verify data_clean
# ==================================

# General Structure
glimpse(data_clean)

# Count by chambers
table(data_clean$Sensor)

# Range of Values
summary(data_clean$ppm.min)

# First 20 Rows
head(data_clean, 20)

# ==================================
# 2. To verify timestamps
# ==================================

# Range temporal
range(data_clean$timestamp)

# Only Dates
unique(date(data_clean$timestamp))

# Distribution zeit
unique(data_clean$zeit)

# ==================================
# 3. To verify components
# ==================================

# Type of Data
str(data_clean)

# ??ppm.min is numeric?
class(data_clean$ppm.min)
is.numeric(data_clean$ppm.min)

# ==================================
# 4. To verify the means (plot2)
# ==================================

# Datos para promedio
data_mean <- data_clean %>%
  mutate(date_hour = floor_date(timestamp, "hour")) %>%
  group_by(date_hour) %>%
  summarise(n = n(), mean_ppm = mean(ppm.min, na.rm = TRUE), .groups = "drop")

head(data_mean)
nrow(data_mean)

# ==================================
# 5. Fast Diagnosis
# ==================================

cat("Total Rows:", nrow(data_clean), "\n")
cat("Unic Chambers:", length(unique(data_clean$Sensor)), "\n")
cat("ppm.min numeric:", is.numeric(data_clean$ppm.min), "\n")
cat("Range ppm.min:", round(range(data_clean$ppm.min), 4), "\n")
cat("Period:", format(min(data_clean$timestamp)), "a", format(max(data_clean$timestamp)), "\n")