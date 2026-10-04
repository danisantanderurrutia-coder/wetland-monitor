/* ==========================================================================
   INSTRUMENTS DATABASE - THESIS INSTRUMENTATION & SENSORS
   Categorized by Methodology: Eddy Covariance, DWD, BIOMET, Oedometer,
   Chambers, and Ecohydrology.
   Complete with:
   1. Instrument Hardware Photos / CAD Diagrams (Top)
   2. Technical Specifications & Parameter Tables (Middle)
   3. Thesis Scientific Graphical Results with Multi-figure Switching (Bottom)
   ========================================================================== */

export const INSTRUMENT_CATEGORIES = [
  { 
    id: "all", 
    name: "All Instruments", 
    icon: "🌐",
    desc: "Comprehensive instrumentation ecosystem deployed at Wallener Au for net carbon and GHG balance determination."
  },
  { 
    id: "eddy_covariance", 
    name: "Eddy Covariance Tools", 
    icon: "🌪️",
    desc: "High-frequency (10 Hz) micrometeorological sensors mounted on the main tower measuring turbulent CO₂ and H₂O fluxes."
  },
  { 
    id: "dwd_stations", 
    name: "DWD Stations (Reference)", 
    icon: "📡",
    desc: "Official German Weather Service (DWD) meteorological stations for QA/QC reference and climatological gap-filling."
  },
  { 
    id: "biomet", 
    name: "BIOMET & Radiation", 
    icon: "☀️",
    desc: "Auxiliary sensors for 4-component radiation balance, soil heat flux (G), and soil temperature profiles."
  },
  { 
    id: "oedometer", 
    name: "Oedometer & Soil Mechanics", 
    icon: "🔬",
    desc: "1D consolidation oedometer tests and soil pore structure evaluation in Kiel University (CAU) laboratories."
  },
  { 
    id: "chambers", 
    name: "Gas Chambers (In Situ)", 
    icon: "📦",
    desc: "Closed manual and automated chamber systems for capturing discrete episodic pulses of CH₄ and N₂O fluxes."
  },
  { 
    id: "ecohydrology", 
    name: "Ecohydrology & Water Table", 
    icon: "💧",
    desc: "Continuous hydrostatic pressure loggers (Diver) and piezometer network for water table depth tracking."
  }
];

export const INSTRUMENTS = [
  // --- 1. EDDY COVARIANCE: 3D ULTRASONIC ANEMOMETER ---
  {
    id: "sonic_anemometer",
    categoryKey: "eddy_covariance",
    name: "3D Ultrasonic Anemometer",
    model: "Metek uSonic-3 Class A MP / Gill WindMaster Pro",
    category: "Micrometeorology & Turbulent Transport",
    height: "3.5 m (Main Tower Mast)",
    icon: "🌪️",
    spriteImg: "assets/sprites/sonic_anemometer.png",
    photoImg: "assets/instruments/photo_sonic_anemometer.png",
    pinPosition: { top: "18%", left: "48%" },
    targetLayers: ["atmosphere", "micrometeo", "energy"],
    variables: ["u, v, w (3D Wind Vectors)", "Sonic Temp (Ts)", "Friction Velocity (u*)", "Turbulent Kinetic Energy (TKE)"],
    description: "High-frequency (10 Hz) ultrasonic acoustic transducer measuring rapid 3D wind velocity fluctuations and sonic virtual temperature to quantify turbulent sensible heat flux (H) and friction velocity (u*).",
    pipelineRole: "EddyPro®: Planar fit coordinate rotation, stationarity tests (Mauder & Foken QC 0-1-2), and u* thresholding (0.12 m/s) to filter decoupled nocturnal calm periods.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "Metek GmbH (uSonic-3) / Gill Instruments", purpose: "Precision 3D sonic anemometry" },
      { spec: "Measurement Principle", val: "Ultrasonic acoustic transit time across 3 non-orthogonal axes", purpose: "Direct turbulent velocity without inertia" },
      { spec: "Sampling Frequency", val: "10 Hz continuous raw logging", purpose: "Captures small-scale Kolmogorov eddies" },
      { spec: "Measurement Range", val: "Wind: 0–60 m/s (res. 0.01 m/s); Temp: -40 to +70°C", purpose: "Full dynamic range under stormy conditions" },
      { spec: "QA/QC Coordinate Rotation", val: "2D Planar Fit method across prevailing wind sectors", purpose: "Eliminates tower tilt and aerodynamic distortion" },
      { spec: "Turbulence Thresholding", val: "u* threshold = 0.12 m/s (REddyProc moving window)", purpose: "Removes nocturnal calm periods prone to underestimation" }
    ],
    figures: [
      {
        id: "fig_footprint",
        label: "Footprint Climatology (Fig. 65)",
        file: "assets/17_19_Combined_Footprint.png",
        title: "Thesis Figure 65: Footprint Climatology & Polar Scatter",
        caption: "Kljun et al. (2015) 2D footprint model documenting that 70%–80% of flux source area is strictly contained within the restored peat grassland under prevailing SW winds."
      },
      {
        id: "fig_energy_closure",
        label: "Energy Balance Closure (Fig. 13)",
        file: "assets/13_Energy_Balance_Closure.png",
        title: "Thesis Figure 13: Energy Balance Closure (Rn - G vs H + LE)",
        caption: "Linear regression between available energy (Rn - G) and turbulent heat fluxes (H + LE) yielding a closure slope of 0.85 and R² = 0.94, validating aerodynamic fetch quality at Wallener Au."
      },
      {
        id: "fig_bowen",
        label: "Bowen Ratio (Fig. 67)",
        file: "assets/16_Bowen_Ratio.png",
        title: "Thesis Figure 67: Daily Bowen Ratio Dynamics (β = H / LE)",
        caption: "Seasonal evolution of the Bowen ratio showing dominance of latent heat evaporation (β < 0.4) during wet periods and transient sensible heat peaks during summer drought."
      }
    ],
    associatedFigure: "assets/17_19_Combined_Footprint.png",
    figureTitle: "Thesis Figure 65: Footprint Climatology & Source Area",
    metrics: [
      { label: "Sampling Frequency", val: "10 Hz", sub: "Continuous turbulence" },
      { label: "u* Threshold", val: "0.12 m/s", sub: "REddyProc night filter" },
      { label: "80% Peak Footprint", val: "145 m", sub: "Dominant SW fetch" },
      { label: "Energy Balance Ratio", val: "0.82", sub: "Rn - G closure" }
    ],
    defenseTakeaway: "Accurate planar fit rotation and strict u* filtering ensure that nocturnal carbon efflux is not underestimated due to thermal stratification and low turbulent mixing."
  },

  // --- 2. EDDY COVARIANCE: OPEN-PATH CO2/H2O ANALYZER ---
  {
    id: "licor_7500",
    categoryKey: "eddy_covariance",
    name: "Open-Path CO₂/H₂O Infrared Gas Analyzer",
    model: "LI-COR LI-7500DS",
    category: "Continuous Atmospheric CO₂ & Water Vapor Fluxes",
    height: "3.5 m (Tower Arm, canted 15°)",
    icon: "💨",
    spriteImg: "assets/sprites/irga_licor.png",
    photoImg: "assets/instruments/photo_licor_7500.png",
    pinPosition: { top: "24%", left: "54%" },
    targetLayers: ["atmosphere", "canopy", "biogeochemistry"],
    variables: ["CO2 Density (mmol/m³)", "H2O Density (mmol/m³)", "NEE (Net Ecosystem Exchange)", "ET (Evapotranspiration)"],
    description: "High-precision open-path non-dispersive infrared (NDIR) analyzer operating at 10 Hz. Measures atmospheric CO₂ and H₂O molar densities without tubing attenuation or intake cell sorption artifacts.",
    pipelineRole: "Processed in EddyPro® with Webb-Pearman-Leuning (WPL) air density adjustments; partitioned into GPP and Reco in REddyProc using Marginal Distribution Sampling (MDS).",
    specsTable: [
      { spec: "Manufacturer & Model", val: "LI-COR Biosciences (Lincoln, NE, USA) — LI-7500DS", purpose: "Open-path greenhouse gas quantification" },
      { spec: "Optical Absorption Principle", val: "Non-Dispersive Infrared (NDIR): 4.26 µm (CO₂), 2.59 µm (H₂O)", purpose: "High-speed optical molar density detection" },
      { spec: "Optical Path Length", val: "12.5 cm open path with hydrophobic sapphire windows", purpose: "Zero tubing lag or high-frequency spectral attenuation" },
      { spec: "Air Density Correction", val: "Webb, Pearman & Leuning (WPL, 1980) density formulation", purpose: "Corrects apparent fluxes from temperature and water vapor expansion" },
      { spec: "Flux Partitioning Method", val: "Lasslop et al. (2010) & Reichstein et al. (2005) algorithms", purpose: "Separates NEE into photosynthetic GPP and ecosystem respiration Reco" },
      { spec: "Quality Flagging System", val: "Mauder & Foken (2004) / ICOS flag 0 (68.4% retention)", purpose: "Rigorous quality gate rejecting non-stationary time windows" }
    ],
    figures: [
      {
        id: "fig_nee_models",
        label: "NEE Models Comparison (Fig. 73)",
        file: "assets/07b_NEE_Models_Comparison.png",
        title: "Thesis Figure 73: Net Ecosystem Exchange (NEE) Models Comparison",
        caption: "Cross-comparison of annual gap-filled NEE time series between Marginal Distribution Sampling (MDS), Random Forest, and Artificial Neural Network (ANN) architectures."
      },
      {
        id: "fig_gpp_fits",
        label: "GPP Michaelis-Menten Fits (Fig. 72)",
        file: "assets/02_GPP_MM_Fits.png",
        title: "Thesis Figure 72: Gross Primary Productivity (GPP) Light-Response Curves",
        caption: "Non-linear Michaelis-Menten photosynthetic light curves fitted across seasonal temperature and vapor pressure deficit (VPD) classes."
      },
      {
        id: "fig_daily_budgets",
        label: "Daily CO₂ Budgets (Fig. 76)",
        file: "assets/08_NEE_Daily_Budgets.png",
        title: "Thesis Figure 76: Daily CO₂ Carbon Budgets & Seasonal Net Trajectory",
        caption: "Daily integrated carbon balance illustrating high summer photosynthetic uptake (-14.2 g C m⁻² d⁻¹) offset by sustained autumn and winter soil respiration."
      },
      {
        id: "fig_qc_flags",
        label: "QC Flag Distribution (Fig. 68)",
        file: "assets/12_QC_Flag_Comparison.png",
        title: "Thesis Figure 68: Quality Control (QC) Flag Comparison for CO₂",
        caption: "ICOS quality flag breakdown validating that 68.4% of recorded intervals meet top-tier flag 0 criteria suitable for direct microclimatic synthesis."
      }
    ],
    associatedFigure: "assets/07b_NEE_Models_Comparison.png",
    figureTitle: "Thesis Figure 73: NEE Models Comparison & Diurnal Partitioning",
    metrics: [
      { label: "Summer Peak GPP", val: "-14.2 g C m⁻² d⁻¹", sub: "Maximum canopy assimilation" },
      { label: "Flag 0 High Quality", val: "68.4%", sub: "Uncompromised turbulent flux" },
      { label: "Optical Path", val: "12.5 cm", sub: "Open-path zero tube lag" },
      { label: "Density Correction", val: "WPL Applied", sub: "Thermal & moisture dilatation" }
    ],
    defenseTakeaway: "Open-path infrared spectroscopy delivers uninterrupted ecosystem carbon tracking; rigorous WPL density corrections prevent false apparent uptake during cold winter conditions."
  },

  // --- 3. EDDY COVARIANCE: OPEN-PATH METHANE ANALYZER ---
  {
    id: "licor_7700",
    categoryKey: "eddy_covariance",
    name: "Open-Path Methane (CH₄) Laser Analyzer",
    model: "LI-COR LI-7700",
    category: "Trace Greenhouse Gases & Wetland Methanogenesis",
    height: "3.5 m (Tower Arm adjacent to LI-7500DS)",
    icon: "🔥",
    spriteImg: "assets/sprites/ch4_bubble.png",
    photoImg: "assets/instruments/photo_licor_7700.png",
    pinPosition: { top: "27%", left: "42%" },
    targetLayers: ["atmosphere", "biogeochemistry", "bacteria"],
    variables: ["CH4 Density (mmol/m³)", "Methane Flux (F_CH4)", "Relative Signal Strength (RSSI %)", "Laser Temperature"],
    description: "High-precision open-path trace gas analyzer utilizing Tunable Diode Laser Absorption Spectroscopy (TDLAS) near 1.65 µm with a Herriott multipass optical cell to detect instantaneous methane pulses.",
    pipelineRole: "Line-broadening spectral corrections, mirror contamination filtering (RSSI > 20%), and conversion to GWP-20 (84x) and GWP-100 (28x) radiative forcing metrics.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "LI-COR Biosciences — LI-7700 Open-Path CH₄ Analyzer", purpose: "High-frequency micrometeorological methane flux" },
      { spec: "Spectroscopic Technology", val: "Tunable Diode Laser Absorption Spectroscopy (TDLAS) @ 1.65 µm", purpose: "Zero interference from water vapor and CO₂" },
      { spec: "Multipass Optical Cell", val: "Herriott cell: 0.5 m physical separation, 30 m effective path", purpose: "Sub-ppb resolution at 10 Hz sampling rate" },
      { spec: "Mirror Maintenance & Heating", val: "Automated heated lower mirror and spin-clean washer system", purpose: "Prevents dew, frost, and dust contamination" },
      { spec: "Quality Filter Threshold", val: "Relative Signal Strength Indicator (RSSI) > 20%", purpose: "Rejects periods of fog or rain droplet obstruction" },
      { spec: "IPCC AR6 Radiative Metric", val: "GWP-20 (84x CO₂ eq.) vs GWP-100 (28x CO₂ eq.)", purpose: "Demonstrates near-term climate impact of rewetting" }
    ],
    figures: [
      {
        id: "fig_gwp20",
        label: "GWP-20 Net Balance (Fig. 85)",
        file: "assets/22_GHG_Balance_20y.png",
        title: "Thesis Figure 85: 20-Year Global Warming Potential (GWP-20) Net GHG Balance",
        caption: "Under the 20-year horizon (CH₄ multiplier = 84), methane ebullition shifts Wallener Au into a net climate warming agent (+8.4 t CO₂-eq ha⁻¹ yr⁻¹) despite strong plant CO₂ uptake."
      },
      {
        id: "fig_gwp100",
        label: "GWP-100 Net Balance (Fig. 84)",
        file: "assets/21_GHG_Balance_100y.png",
        title: "Thesis Figure 84: 100-Year Global Warming Potential (GWP-100) Net GHG Balance",
        caption: "Under the conventional 100-year horizon (CH₄ multiplier = 28), prolonged carbon sequestration largely balances methane emissions, achieving approximate climate neutrality."
      },
      {
        id: "fig_monthly_stacked",
        label: "Monthly Stacked GHG (Fig. 85b)",
        file: "assets/26b_Monthly_Stacked_GHG_20y.png",
        title: "Thesis Figure 85b: Monthly Stacked GHG Contributions (GWP-20 Horizon)",
        caption: "Monthly dynamics showing explosive methane pulse contributions in late summer when water table elevation coincides with peak peat profile temperatures."
      }
    ],
    associatedFigure: "assets/22_GHG_Balance_20y.png",
    figureTitle: "Thesis Figure 85: 20-Year GHG Radiative Forcing (84x CH₄ Impact)",
    metrics: [
      { label: "Peak CH₄ Emission", val: "+182 nmol m⁻² s⁻¹", sub: "Post-rewetting pulse" },
      { label: "20y Multiplier Factor", val: "84x CO₂", sub: "Short-term warming surge" },
      { label: "Effective Path Length", val: "30 m", sub: "Herriott multipass cell" },
      { label: "Quality Filter", val: "RSSI > 20%", sub: "Optics clean threshold" }
    ],
    defenseTakeaway: "Evaluating peatland restoration solely through 100-year GWP obscures intense decadal warming surges driven by methanogen reactivation in the upper organic acrotelm."
  },

  // --- 4. DWD REFERENCE WEATHER STATIONS ---
  {
    id: "dwd_erfde_station",
    categoryKey: "dwd_stations",
    name: "Official DWD Erfde Weather Station",
    model: "Deutscher Wetterdienst (DWD Station ID: 1262)",
    category: "Regional Synoptic Forcing & Climatology",
    height: "2.0 m / 10.0 m (Ground Level Mast)",
    icon: "📡",
    spriteImg: "assets/sprites/dwd_station.png",
    photoImg: "assets/sprites/dwd_station.png",
    pinPosition: { top: "12%", left: "82%" },
    targetLayers: ["atmosphere", "micrometeo"],
    variables: ["Hourly Precipitation (Hellmann)", "Barometric Pressure (P_atm)", "Air Temp 2m (Tair)", "Relative Humidity (RH)", "Wind Speed 10m"],
    description: "Official reference meteorological station operated by the German Weather Service (DWD) located 14.2 km from Wallener Au. Provides long-term 30-year climatological normals (1991–2020) to calibrate regional drought anomalies.",
    pipelineRole: "Benchmark for bioclimatic QA/QC, gap-filling of macroclimatic driver variables, and precipitation balance verification against NASA POWER and WorldClim.",
    specsTable: [
      { spec: "Operating Authority", val: "Deutscher Wetterdienst (DWD, Federal Republic of Germany)", purpose: "Legally standardized meteorological records" },
      { spec: "Station Identification", val: "DWD Station ID: 1262 (Erfde, Schleswig-Holstein)", purpose: "14.2 km geographic proximity to Wallener Au" },
      { spec: "Precipitation Measurement", val: "Hellmann weighing gauge with unheated and heated collector", purpose: "Hourly precipitation totals and storm intensity" },
      { spec: "Thermodynamic Sensors", val: "Ventilated Pt100 in radiation shield (2 m) & capacitive hygrometer", purpose: "Synoptic reference for vapor pressure deficit (VPD)" },
      { spec: "Baseline Normal Period", val: "1991–2020 WMO 30-year climatological normal", purpose: "Identifies 2024 regional precipitation and heat anomalies" },
      { spec: "Cross-Validation R²", val: "R² = 0.982 against tower Kipp & Zonen solar radiation", purpose: "Guarantees robust bioclimatic gap-filling" }
    ],
    figures: [
      {
        id: "fig_walter_nasa",
        label: "Walter-Lieth Climatology (Fig. 64)",
        file: "assets/Walter_Lieth_NASA.png",
        title: "Thesis Figure 64: Walter-Lieth Bioclimatic Diagram (1991–2024)",
        caption: "Climatological synthesis demonstrating annual mean temperature (9.4°C) and 792 mm precipitation, confirming humid temperate conditions with summer water stress."
      },
      {
        id: "fig_sw_in_dwd",
        label: "Solar Radiation QC (Fig. 45)",
        file: "assets/03_SW_IN_QC_vs_DWD.png",
        title: "Thesis Figure 45: Solar Radiation Cross-Check (Tower vs DWD Erfde)",
        caption: "Linear regression between tower pyranometer and DWD Erfde global radiation proving strict optical alignment (R² = 0.982, slope = 1.01)."
      },
      {
        id: "fig_worldclim",
        label: "WorldClim Comparison (Fig. 64b)",
        file: "assets/Walter_Lieth_WorldClim.png",
        title: "Thesis Figure 64b: Gridded WorldClim vs In Situ Station Observations",
        caption: "Evaluation of regional microclimate divergence between downscaled gridded reanalysis models and local coastal lowlands."
      }
    ],
    associatedFigure: "assets/Walter_Lieth_NASA.png",
    figureTitle: "Thesis Figure 64: Walter-Lieth Climatology vs DWD Erfde",
    metrics: [
      { label: "Distance to Site", val: "14.2 km", sub: "Official regional reference" },
      { label: "Mean Annual Temp", val: "9.4 °C", sub: "1991–2020 normal baseline" },
      { label: "Annual Rainfall", val: "792 mm", sub: "Humid temperate regime" },
      { label: "Radiation Match", val: "R² = 0.982", sub: "Direct tower cross-check" }
    ],
    defenseTakeaway: "Decoupling local microclimatic peat conditions from regional DWD synoptic trends proves that water table depth exerts far greater control on flux variance than macroclimatic drivers."
  },

  // --- 5. BIOMET: 4-COMPONENT NET RADIOMETER ---
  {
    id: "cnr4_radiometer",
    categoryKey: "biomet",
    name: "4-Component Net Radiometer",
    model: "Kipp & Zonen CNR4",
    category: "Surface Energy Balance & Radiation Budget",
    height: "2.5 m (Biomet Mast, facing South)",
    icon: "☀️",
    spriteImg: "assets/sprites/cnr4_radiometer.png",
    photoImg: "assets/sprites/cnr4_radiometer.png",
    pinPosition: { top: "33%", left: "30%" },
    targetLayers: ["energy", "canopy", "micrometeo"],
    variables: ["Net Radiation (Rn)", "Shortwave In/Out (SWin/SWout)", "Longwave In/Out (LWin/LWout)", "Surface Albedo (α)"],
    description: "Research-grade 4-component radiometer measuring separate incoming and outgoing fluxes of solar shortwave (0.3–2.8 µm) and terrestrial longwave infrared (4.5–42 µm) radiation.",
    pipelineRole: "Key driver of available energy (Rn - G) in the surface energy balance closure and primary independent variable for photosynthetic light-response curves.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "Kipp & Zonen (Delft, Netherlands / OTT HydroMet) — CNR4", purpose: "Standard 4-component net radiation" },
      { spec: "Shortwave Detectors", val: "Dual thermopile pyranometers (300 to 2800 nm spectral window)", purpose: "Quantifies incoming solar and reflected albedo" },
      { spec: "Longwave Detectors", val: "Dual silicon-meniscus pyrgeometers (4.5 to 42 µm)", purpose: "Direct downward atmospheric and surface thermal emission" },
      { spec: "Internal Thermistor", val: "Integrated Pt-100 temperature sensor for pyrgeometer casing compensation", purpose: "Prevents thermal casing emission bias" },
      { spec: "Surface Albedo (α)", val: "Mean α = 0.19 across wet vegetated sedge canopy", purpose: "Quantifies radiative forcing shifts upon rewetting" },
      { spec: "Integration with Towers", val: "Calculates net available energy Rn = (SWin - SWout) + (LWin - LWout)", purpose: "Primary baseline for sensible (H) and latent (LE) partitioning" }
    ],
    figures: [
      {
        id: "fig_energy_closure",
        label: "Energy Balance Closure (Fig. 13)",
        file: "assets/13_Energy_Balance_Closure.png",
        title: "Thesis Figure 13: Ecosystem Energy Balance Closure (Rn - G vs H + LE)",
        caption: "Evaluation of the thermodynamic first law at Wallener Au: available radiation (Rn - G) balances turbulent transport with slope = 0.85 and R² = 0.94."
      },
      {
        id: "fig_sw_in",
        label: "Incoming Solar SWin (Fig. 45)",
        file: "assets/03_SW_IN_QC_vs_DWD.png",
        title: "Thesis Figure 45: CNR4 Shortwave Cross-Validation vs DWD",
        caption: "Pyranometer sensitivity calibration confirming clear-sky radiation envelope consistency and absence of sensor leveling drift."
      }
    ],
    associatedFigure: "assets/13_Energy_Balance_Closure.png",
    figureTitle: "Thesis Figure 13: Net Radiation & Energy Balance Closure",
    metrics: [
      { label: "Noon Peak Rn", val: "+520 W m⁻²", sub: "Summer solstice midday" },
      { label: "Mean Albedo α", val: "0.19", sub: "Wet sedge & grass pasture" },
      { label: "Spectral Range", val: "0.3 to 42 µm", sub: "4 independent sensors" },
      { label: "Energy Closure", val: "Slope 0.85, R² = 0.94", sub: "Thermodynamic verification" }
    ],
    defenseTakeaway: "Rewetting alters the surface albedo and dramatically shifts net available energy into latent heat vaporization (LE), cooling the local boundary layer microclimate."
  },

  // --- 6. BIOMET: SOIL HEAT FLUX TRANSDUCERS ---
  {
    id: "soil_heat_plates",
    categoryKey: "biomet",
    name: "Soil Heat Flux Transducers",
    model: "Hukseflux HFP01",
    category: "Peat Soil Thermodynamics & Heat Conduction",
    height: "-0.05 m depth (Subsurface Organic Topsoil)",
    icon: "⚡",
    spriteImg: "assets/sprites/soil_sensors.png",
    photoImg: "assets/sprites/soil_sensors.png",
    pinPosition: { top: "46%", left: "38%" },
    targetLayers: ["energy", "soil_phys"],
    variables: ["Soil Heat Flux (G @ 5cm)", "Soil Thermal Storage (S_soil)", "Peat Thermal Conductivity (λ)"],
    description: "Ceramic-plastic composite thermopile differential transducers embedded at -5 cm depth in the organic peat layer. Quantifies conductive thermal heat flux between the surface and deep soil horizons.",
    pipelineRole: "Adjusted for calorimetric thermal storage in the upper 5 cm using multi-depth 5TM temperature sensors; essential for closing the thermodynamic energy balance budget.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "Hukseflux Thermal Sensors (Delft, Netherlands) — HFP01", purpose: "Direct measurement of soil heat conduction" },
      { spec: "Operating Principle", val: "Thermopile array generating voltage proportional to differential temperature", purpose: "Passive high-durability subsurface operation" },
      { spec: "Nominal Sensitivity", val: "50 µV / (W m⁻²) calibrated individually", purpose: "Resolves sub-watt nocturnal thermal inversions" },
      { spec: "Calorimetric Adjustment", val: "Storage term S = C_soil × (ΔTs / Δt) × z calculated continuously", purpose: "Accounts for heat trapped in upper 5 cm organic layer" },
      { spec: "Spatial Distribution", val: "Installed in triplicate across hollows, hummocks, and compacted plow pan", purpose: "Quantifies spatial thermal heterogeneity" },
      { spec: "Peat Porosity Factor", val: "Calibrated for high water content and low mineral bulk density", purpose: "Prevents thermal conductivity distortion" }
    ],
    figures: [
      {
        id: "fig_shf_spatial",
        label: "SHF Spatial Variability (Fig. 92)",
        file: "assets/19_Spatial_Var_SHF.png",
        title: "Thesis Figure 92: Spatial Variability of Soil Heat Flux (SHF)",
        caption: "Multi-point comparison across microtopographic features demonstrating that compacted tractor paths conduct heat 40% faster than unconsolidated pristine peat."
      },
      {
        id: "fig_energy_closure",
        label: "Energy Balance Integration (Fig. 13)",
        file: "assets/13_Energy_Balance_Closure.png",
        title: "Thesis Figure 13: Role of Soil Heat Flux in Available Energy (Rn - G)",
        caption: "Integration of soil heat storage preventing systemic underestimation of daytime available energy during rapid peat heating (Slope = 0.85, R² = 0.94)."
      }
    ],
    associatedFigure: "assets/19_Spatial_Var_SHF.png",
    figureTitle: "Thesis Figure 92: Spatial Variability: Soil Heat Flux",
    metrics: [
      { label: "Max Daytime G", val: "+38 W m⁻²", sub: "High damp peat thermal inertia" },
      { label: "Nocturnal Inversion", val: "-18 W m⁻²", sub: "Radiative surface cooling" },
      { label: "Plates Deployed", val: "3 replicated", sub: "Spatial microtopography" },
      { label: "Plate Sensitivity", val: "50 µV / W m⁻²", sub: "Calibrated thermopile" }
    ],
    defenseTakeaway: "Compacted plow pan horizons act as high thermal conductors, altering deep peat temperature gradients and triggering accelerated methanogenesis earlier in the summer season."
  },

  // --- 7. BIOMET: MULTI-DEPTH SOIL MOISTURE & TEMP PROBES ---
  {
    id: "soil_profile_probes",
    categoryKey: "biomet",
    name: "Multi-Depth Moisture & Temperature Array",
    model: "METER / Decagon 5TM High-Frequency FDR Probes",
    category: "Soil Hydrology & Subsurface Thermal Waves",
    height: "-5, -10, -20, -30, -40, -50 cm (Vertical Profile)",
    icon: "🌡️",
    spriteImg: "assets/sprites/soil_sensors.png",
    photoImg: "assets/sprites/soil_sensors.png",
    pinPosition: { top: "58%", left: "44%" },
    targetLayers: ["water", "soil_phys", "bacteria"],
    variables: ["Volumetric Water Content (VWC %)", "Soil Temperature (Ts @ 6 Depths)", "Thermal Damping Depth"],
    description: "Frequency Domain Reflectometry (FDR) 70 MHz capacitive probes and precision thermistors vertically installed across acrotelm, compacted plow pan, and anaerobic catotelm.",
    pipelineRole: "Feeds Lloyd-Taylor and Arrhenius respiration models; defines the seasonal thermal wave damping depth and delineates the biological oxic-anoxic boundary.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "METER Group (formerly Decagon Devices, Pullman, WA) — 5TM", purpose: "Coupled dielectric and thermal profile logging" },
      { spec: "VWC Principle", val: "70 MHz Frequency Domain Reflectometry (FDR) electromagnetic field", purpose: "Minimizes salinity and organic soil polarization effects" },
      { spec: "Temperature Sensor", val: "Precision onboard thermistor (±0.5°C accuracy, 0.1°C resolution)", purpose: "Tracks diurnal and seasonal thermal waves" },
      { spec: "Depth Stratification", val: "6 depths: -5, -10, -20, -30, -40, -50 cm", purpose: "Captures gradient from oxic acrotelm down to anaerobic catotelm" },
      { spec: "Organic Calibration", val: "Site-specific calibration curve for low bulk density fen peat", purpose: "Eliminates mineral soil Topp equation overestimation" },
      { spec: "Respiration Modeling", val: "Exponential Lloyd & Taylor (1994) soil respiration driver", purpose: "Reveals that >75% of microbial respiration occurs at 0–5 cm" }
    ],
    figures: [
      {
        id: "fig_depth_ts",
        label: "Temperature & SWC Profiles (Fig. 91)",
        file: "assets/18_Depth_Profiles_Combined.png",
        title: "Thesis Figure 91: Soil Temperature & Moisture Profiles (5–50 cm)",
        caption: "Vertical propagation of the diurnal thermal wave through the peat profile showing a 6.5 h phase lag and 80% amplitude attenuation at 50 cm depth."
      },
      {
        id: "fig_swc_dynamics",
        label: "Seasonal TS & SWC (Fig. 91b)",
        file: "assets/10_Soil_Temp_SWC.png",
        title: "Thesis Figure 91b: Seasonal Coupled Soil Moisture and Temperature Dynamics",
        caption: "Year-long trajectory illustrating soil moisture saturation (>80% VWC) during winter and dramatic drying in the upper 10 cm during the summer drought."
      },
      {
        id: "fig_reco_depth",
        label: "Respiration 5cm vs 50cm (Fig. 74)",
        file: "assets/08b_Respiration_5cm_vs_50cm_v2.png",
        title: "Thesis Figure 74: Soil Respiration Depth Sensitivity (5 cm vs 50 cm)",
        caption: "Lloyd-Taylor model comparison demonstrating that using 5 cm soil temperature explains 88% of respiration variance, while 50 cm temperature fails to track diurnal pulses."
      }
    ],
    associatedFigure: "assets/18_Depth_Profiles_Combined.png",
    figureTitle: "Thesis Figure 91: Soil Moisture & Temperature Depth Profiles",
    metrics: [
      { label: "Peak VWC Saturation", val: "84.2%", sub: "Waterlogged winter peat" },
      { label: "Thermal Lag @ 50cm", val: "6.5 hours", sub: "Diurnal wave damping" },
      { label: "Topsoil Q10 Sensitivity", val: "2.41", sub: "Upper 5 cm acrotelm" },
      { label: "Damping Depth (d)", val: "12.4 cm", sub: "High peat thermal inertia" }
    ],
    defenseTakeaway: "Microbial carbon mineralization is overwhelmingly confined to the top 5 cm; shallow rewetting is therefore sufficient to suppress >75% of aerobic heterotrophic respiration."
  },

  // --- 8. SOIL MECHANICS: OEDOMETER CONSOLIDATION CELLS ---
  {
    id: "soil_lab_oedometer",
    categoryKey: "oedometer",
    name: "1D Uniaxial Consolidation Oedometer",
    model: "Josef Rode Soil Mechanics Apparatus (CAU Kiel Soil Physics Lab)",
    category: "Soil Mechanics & Agricultural Compaction",
    height: "Undisturbed Core Rings: 0–5 cm, 25 cm, 25–35 cm",
    icon: "🔬",
    spriteImg: "assets/sprites/oedometer_cell.png",
    photoImg: "assets/sprites/oedometer_cell.png",
    pinPosition: { top: "72%", left: "56%" },
    targetLayers: ["soil_phys"],
    variables: ["Precompression Stress (σp)", "Dry Bulk Density (ρb)", "Total Pore Volume (TPV)", "Air Conductivity (kl)"],
    description: "Uniaxial step-loading laboratory consolidation tests on undisturbed 100 cm³ peat core rings. Uncovers historical mechanical overconsolidation and pore collapse caused by heavy tractor machinery and intensive livestock grazing.",
    pipelineRole: "Determines the Casagrande precompression stress (σp) threshold, proving that relic agricultural compaction creates an impermeable plow pan that decouples surface water from deep groundwater.",
    specsTable: [
      { spec: "Testing Facility", val: "Soil Physics Laboratory, Institute of Plant Nutrition and Soil Science (CAU Kiel)", purpose: "Standardized DIN 18135 consolidation testing" },
      { spec: "Testing Apparatus", val: "Josef Rode multi-lever arm 1D uniaxial oedometer apparatus", purpose: "Rigid lateral containment with uniaxial stress application" },
      { spec: "Stress Loading Steps", val: "10, 20, 50, 100, 200, 400, 800 kPa applied incrementally", purpose: "Constructs complete stress-void ratio (e-log σ) curves" },
      { spec: "Sample Core Dimensions", val: "100 cm³ undisturbed stainless steel cylinder rings (h=50 mm, d=50 mm)", purpose: "Preserves native peat fiber orientation and pore structure" },
      { spec: "Casagrande Graphical Method", val: "Logarithmic radius of curvature determination of precompression stress σp", purpose: "Identifies transition from recompression to virgin consolidation" },
      { spec: "Plow Pan Compaction Result", val: "σp reaches 62 kPa at 25–30 cm depth (vs natural overburden of 12 kPa)", purpose: "Quantifies 500% mechanical overconsolidation from tractors" }
    ],
    figures: [
      {
        id: "fig_precompression",
        label: "Precompression Curves (Fig. 99)",
        file: "assets/Precompression_Combined.png",
        title: "Thesis Figure 99: Peat Precompression Stress Curves (0–5 cm vs 25–30 cm)",
        caption: "Stress-void ratio curves demonstrating dramatic compaction in the historical plow pan (25–30 cm), where coarse macropores have suffered permanent plastic collapse."
      },
      {
        id: "fig_precompression_means",
        label: "Casagrande Thresholds (Fig. 100)",
        file: "assets/precompression_curves.png",
        title: "Thesis Figure 100: Precompression Stress Geometric Means Across Horizons",
        caption: "Precompression stress comparison across sites proving that drained agricultural exploitation raised soil bearing strength at the expense of air permeability."
      },
      {
        id: "fig_bulk_density_boxplot",
        label: "Bulk Density Boxplot (ρb)",
        file: "assets/Dry_Bulk_Density_Wallen.png",
        title: "Dry Bulk Density Boxplot Distribution Across Depths",
        caption: "Statistically validated boxplot distribution of peat dry bulk density (g/cm³) comparing 0–5 cm, 25 cm (plow pan peak), and 25–30 cm."
      },
      {
        id: "fig_comp_ek_wa",
        label: "Ekel vs Wallen Boxplots",
        file: "assets/Comparison_EK_WA.png",
        title: "Comparative Soil Boxplots: Ekel vs Wallener Au (Bulk Density, TPV, WCP)",
        caption: "Three-panel comparative boxplots demonstrating higher overconsolidation and pore collapse in Wallener Au."
      }
    ],
    associatedFigure: "assets/Precompression_Combined.png",
    figureTitle: "Thesis Figure 99: Oedometer Precompression & Pore Collapse",
    metrics: [
      { label: "Plow Pan σp Stress", val: "62 kPa", sub: "Tractor & machinery compaction" },
      { label: "Macropore Volume Loss", val: "-54%", sub: "Drainage pore collapse" },
      { label: "Bulk Density (ρb)", val: "0.38 g/cm³", sub: "Elevated plow pan density" },
      { label: "Hydraulic Permeability", val: "10⁻⁶ m/s", sub: "Compacted flow restriction" }
    ],
    defenseTakeaway: "The presence of a relict compacted plow pan acts as a perched water table barrier, maintaining artificial ponding and triggering methane pulses even during moderate regional rainfall."
  },

  // --- 8b. SOIL MECHANICS: LABORATORY AIR PERMEAMETER (FIG. 57) ---
  {
    id: "air_permeameter",
    categoryKey: "oedometer",
    name: "Laboratory Air Permeameter System (Fig. 57)",
    model: "CAU Kiel Stationary / Dynamic Soil Air Permeameter Apparatus",
    category: "Soil Physics & Pneumatic Permeability",
    height: "Undisturbed Core Rings: 100 cm³ (-60 hPa / pF 1.8)",
    icon: "💨",
    spriteImg: "assets/sprites/oedometer_cell.png",
    photoImg: "assets/cau_kiel_air_permeameter.jpg",
    pinPosition: { top: "74%", left: "52%" },
    targetLayers: ["soil_phys"],
    variables: ["Air Conductivity (kl / Ka)", "Air Permeability", "Pore Continuity Index (Cw)", "Pneumatic Tortuosity"],
    description: "High-precision laboratory air permeameter apparatus installed at Christian-Albrechts-Universität zu Kiel (CAU) used to measure pneumatic conductivity (Ka) and air permeability on undisturbed 100 cm³ soil core rings under controlled suction (-60 hPa / pF 1.8).",
    pipelineRole: "Evaluates the Darcy air permeability equation Ka = (V / t) · (η / A) · (L / ΔP); confirms that plow pan macropore loss limits oxygen ingress, driving anaerobic methanogenesis.",
    specsTable: [
      { spec: "Testing Facility", val: "Soil Physics Laboratory, Institute of Plant Nutrition and Soil Science (CAU Kiel)", purpose: "High-resolution air conductivity analysis" },
      { spec: "Darcy Air Permeability Formulation", val: "Ka = (V / t) · [ (η · L) / (A · ΔP) ]", purpose: "Calculates pneumatic conductivity in µm² or m/s" },
      { spec: "Suction Pre-conditioning", val: "Sand sandbox equilibrated at -60 hPa (pF 1.8 matric potential)", purpose: "Drains wide coarse macropores (>50 µm)" },
      { spec: "Differential Pressure (ΔP)", val: "Calibrated laminar pressure gradient ΔP = 1.0 hPa across 50 mm core", purpose: "Ensures strictly laminar Darcy flow without pore erosion" },
      { spec: "Viscosity Constant (η)", val: "Dynamic air viscosity η = 18.2 µPa·s at standard lab temperature 20°C", purpose: "Standardized thermodynamic compensation" },
      { spec: "Plow Pan Diagnostic", val: "Ka drops below 0.8 µm² in 15–25 cm compaction band vs. >45 µm² in virgin peat", purpose: "Confirms pneumatic decoupling of the rhizosphere" }
    ],
    figures: [
      {
        id: "fig_57_clean",
        label: "Figure 57: Permeameter System",
        file: "assets/cau_kiel_air_permeameter.jpg",
        title: "CAU Kiel Laboratory Soil Air Permeameter Apparatus (Fig. 57)",
        caption: "Precision stationary laboratory air permeameter apparatus at Christian-Albrechts-Universität zu Kiel (CAU) used to evaluate pneumatic conductivity Ka on undisturbed 100 cm³ soil core rings under laminar differential pressure ΔP = 1.0 hPa."
      },
      {
        id: "fig_air_conductivity",
        label: "Air Conductivity Depth Profile",
        file: "assets/Air_Conductivity_Wallen.png",
        title: "Air Conductivity & Hydraulic Restriction across Compaction Horizons",
        caption: "Empirical laboratory air pycnometry and permeameter testing across depth horizons confirming pneumatic and hydraulic disconnection imposed by the agricultural compaction layer."
      },
      {
        id: "fig_wcp_boxplot",
        label: "Macropores Boxplot (WCP %)",
        file: "assets/WCP_Wallen.png",
        title: "Wide Coarse Pores (WCP %) Boxplot by Depth",
        caption: "Drastic macroporosity collapse (>50 µm) from 17% in uncompressed acrotelm down to 5.8% in the 25 cm plow pan layer, throttling aeration and hydraulic drainage."
      },
      {
        id: "fig_tpv_boxplot",
        label: "Total Pore Volume (TPV %)",
        file: "assets/TPV_Wallen.png",
        title: "Total Pore Volume (TPV %) Boxplot by Depth",
        caption: "Total pore volume distribution across depths: 76% (0–5 cm), 81% (25 cm), and 87% (25–30 cm undisturbed peat)."
      },
      {
        id: "fig_air_perm_peat_types",
        label: "Permeability by Peat Type",
        file: "assets/Air_Permeability_PeatTypes_TorfZer.png",
        title: "Air Permeability LOG ka Before vs After Load Across Peat Botanical Types",
        caption: "Logarithmic air permeability (cm·d⁻¹) before and after mechanical stress load across Sphagnum, Eriophorum, Carex, amorphous peat, and sand."
      }
    ],
    associatedFigure: "assets/cau_kiel_air_permeameter.jpg",
    figureTitle: "Thesis Figure 57: CAU Kiel Laboratory Soil Air Permeameter Setup",
    metrics: [
      { label: "Plow Pan Ka", val: "< 0.8 µm²", sub: "Severe pneumatic barrier" },
      { label: "Virgin Peat Ka", val: "> 45 µm²", sub: "Well-aerated macropores" },
      { label: "Equilibration", val: "-60 hPa (pF 1.8)", sub: "Wide coarse pores" },
      { label: "Core Volume", val: "100 cm³", sub: "Undisturbed stainless steel" }
    ],
    defenseTakeaway: "Air conductivity drops by over 98% in the compacted plow pan, preventing gas exchange and maintaining artificial sub-surface anoxia even during dry periods."
  },

  // --- 9. GAS CHAMBERS: IN SITU TRANSECT ---
  {
    id: "gas_chambers",
    categoryKey: "chambers",
    name: "In Situ Closed Gas Chambers Transect",
    model: "Manual Closed Chambers (Transparent & Dark Opaque Collars)",
    category: "Discrete GHG Fluxes & Spatial Hotspots",
    height: "0.0 m (Stainless Steel Collars in E-W Transect)",
    icon: "📦",
    spriteImg: "assets/sprites/gas_chamber.png",
    photoImg: "assets/sprites/gas_chamber.png",
    pinPosition: { top: "41%", left: "62%" },
    targetLayers: ["biogeochemistry", "bacteria", "soil_phys"],
    variables: ["Chamber CH4 Flux", "N2O Flux", "Dark Ecosystem Respiration (Reco)", "Local Net Photosynthesis"],
    description: "Permanent collar transects established across the East-West microtopographic gradient of Wallener Au with syringe headspace sampling and laboratory gas chromatography.",
    pipelineRole: "Non-linear Hutchinson & Mosier (HMR) regression modeling for CH₄ and N₂O; validates eddy covariance footprint representativeness and captures ditch hotspots missed by spatial tower averaging.",
    specsTable: [
      { spec: "Chamber System", val: "Non-flow-through non-steady-state (NFT-NSS) closed chambers", purpose: "Direct spatial flux quantification" },
      { spec: "Chamber Dimensions", val: "Base 0.50 m × 0.50 m, variable collar height 0.35–0.70 m (with extensions)", purpose: "Encloses full plant canopy without clipping" },
      { spec: "Volume/Area Geometry", val: "V_total = A_base · (h_collar + h_ext); 16 cm base to 42 cm stack", purpose: "Preserves headspace volume ratio during vegetation growth" },
      { spec: "Ideal Gas Law Transformation", val: "F = (dC / dt) · [ (P · V) / (R · T · A) ]", purpose: "Converts ppm/s or ppb/s concentration slope to mass flux" },
      { spec: "Chromatographic Analysis", val: "Shimadzu GC-2014 with FID (CH₄, CO₂) and ⁶³Ni ECD (N₂O)", purpose: "Sub-ppb trace greenhouse gas analytical precision" },
      { spec: "Multi-Gas Error Propagation", val: "SE_Net = sqrt((GWP_CH4 · SE_CH4)² + (GWP_N2O · SE_N2O)²)", purpose: "Propagates spatial collar standard error into net budget" }
    ],
    figures: [
      {
        id: "fig_ch4_crossval",
        label: "CH₄ Chamber vs EC (Fig. 83)",
        file: "assets/20b_Chamber_EC_CH4_CrossValidation.png",
        title: "Thesis Figure 83: Cross-Validation: Closed Chambers vs Eddy Covariance (CH₄)",
        caption: "Cross-comparison revealing that chamber measurements along relict ditches record methane fluxes up to 300% higher than the spatially-averaged eddy covariance tower footprint."
      },
      {
        id: "fig_co2_crossval",
        label: "CO₂ Chamber vs EC (Fig. 83b)",
        file: "assets/20_Chamber_EC_CrossValidation.png",
        title: "Thesis Figure 83b: CO₂ Respiration Cross-Validation (Chambers vs Tower)",
        caption: "Opaque chamber respiration measurements correlated against nighttime eddy covariance flux showing tight agreement (R² = 0.86)."
      },
      {
        id: "fig_n2o_composite",
        label: "N₂O Values Composite (Fig. 78)",
        file: "assets/78_N2O_Chamber_Values.png",
        title: "Thesis Figure 78: Nitrous Oxide (N₂O) Chamber Values (3-Panel Composite)",
        caption: "Measured N₂O trajectories across sampling campaigns capturing acute pulses triggered by rain and fluctuating water tables."
      },
      {
        id: "fig_n2o_dist",
        label: "N₂O Distribution per Chamber (Fig. 79)",
        file: "assets/79_N2O_Distribution_Per_Chamber.png",
        title: "Thesis Figure 79: Distribution of N₂O Values per Chamber",
        caption: "Boxplots and distribution densities of N₂O fluxes across individual collars illustrating microtopographic variation."
      },
      {
        id: "fig_n2o_site",
        label: "N₂O Fluxes by Site (Fig. 80)",
        file: "assets/80_N2O_Fluxes_By_Site.png",
        title: "Thesis Figure 80: N₂O Fluxes by Site / Location",
        caption: "Spatial distribution of nitrous oxide emissions contrasted between ditches, plateau grassland, and wet depressions."
      },
      {
        id: "fig_n2o_accum",
        label: "N₂O Seasonal Accumulation (Fig. 81)",
        file: "assets/81_N2O_Seasonal_Accumulation.png",
        title: "Thesis Figure 81: N₂O Flux Seasonal Accumulation",
        caption: "Cumulative seasonal N₂O mass accumulation curves across collars."
      },
      {
        id: "fig_n2o_total",
        label: "N₂O Total Mass Accumulated (Fig. 82)",
        file: "assets/82_N2O_Total_Mass_Accumulated.png",
        title: "Thesis Figure 82: Total N₂O Mass Accumulated per Chamber",
        caption: "Annual integrated total mass of N₂O accumulated per collar, quantifying spatial heterogeneity."
      },
      {
        id: "fig_chambers_timeseries",
        label: "Chamber CH₄ Time-Series (P1–P8)",
        file: "assets/01_time_series.png",
        title: "In Situ Chambers: CH₄ Flux Dynamics across Collars (P1–P8)",
        caption: "Continuous field campaign tracking seasonal GHG flux trajectories across all chamber collars."
      }
    ],
    associatedFigure: "assets/20b_Chamber_EC_CH4_CrossValidation.png",
    figureTitle: "Thesis Figure 83: Cross-Validation Chambers vs Eddy Tower (CH₄)",
    metrics: [
      { label: "Spatial CH₄ Variation", val: "CV > 140%", sub: "Residual ditch hotspots" },
      { label: "Flux Regression", val: "HMR Model", sub: "Non-linear diffusion fit" },
      { label: "CO₂ Match with Tower", val: "R² = 0.86", sub: "Dark respiration validation" },
      { label: "GC Detection Limit", val: "0.05 ppm", sub: "Shimadzu GC-2014 FID" }
    ],
    defenseTakeaway: "Tower eddy covariance smooths out high-intensity ditch hotspots; cross-validating with chambers is indispensable to quantify true landscape-scale greenhouse gas emissions."
  },

  // --- 10. ECOHYDROLOGY: GROUNDWATER DIVER LOGGER ---
  {
    id: "piezometer_logger",
    categoryKey: "ecohydrology",
    name: "Automated Groundwater Level Logger (Diver)",
    model: "Van Essen Schlumberger Micro-Diver + Baro-Diver",
    category: "Peatland Ecohydrology & Redox Boundary",
    height: "-1.50 m to +0.20 m (Perforated PVC Dip Wells)",
    icon: "💧",
    spriteImg: "assets/sprites/groundwater_diver.png",
    photoImg: "assets/sprites/groundwater_diver.png",
    pinPosition: { top: "52%", left: "70%" },
    targetLayers: ["water", "biogeochemistry"],
    variables: ["Water Table Depth (WTD cm)", "Hydrological Recession Rate", "Ponding Surface Water Head"],
    description: "Submersible piezoresistive absolute pressure transducer barometrically compensated with an atmospheric Baro-Diver. Logs continuous groundwater water table depth (WTD) at 10-minute intervals.",
    pipelineRole: "Master ecosystem regulator: dictates the oxic acrotelm thickness and triggers exponential methanogenesis when WTD exceeds the -15 cm threshold.",
    specsTable: [
      { spec: "Manufacturer & Model", val: "Van Essen Instruments (Delft, Netherlands) — Micro-Diver", purpose: "Continuous autonomous groundwater logging" },
      { spec: "Pressure Transducer", val: "Ceramic piezoresistive absolute pressure sensor (10 m H₂O range)", purpose: "Corrosion-resistant in acidic organic peat water" },
      { spec: "Barometric Compensation", val: "Dedicated local Baro-Diver recording surface air pressure", purpose: "Subtracts atmospheric pressure fluctuations with 0.1 cm precision" },
      { spec: "Logging Interval", val: "10-minute continuous autonomous logging", purpose: "Captures rapid stormwater infiltration and evapotranspirative drawdown" },
      { spec: "Survey Reference", val: "Referenced to German official elevation datum (DHHN2016) via DGPS", purpose: "Enables absolute hydrological gradient and flow vector mapping" },
      { spec: "Redox Threshold Significance", val: "Critical tipping point at WTD = -12 to -15 cm", purpose: "Switches soil profile from aerobic CH₄ oxidation to rapid methanogenesis" }
    ],
    figures: [
      {
        id: "fig_wtd_annual",
        label: "Water Table Dynamics (Fig. 90)",
        file: "assets/11_Water_Level.png",
        title: "Thesis Figure 90: Continuous Water Table Depth Dynamics (Diver 2024)",
        caption: "High-resolution annual hydrograph capturing the extreme hydrological oscillation from deep summer drawdown (-52 cm) to complete winter surface ponding (+8 cm)."
      }
    ],
    associatedFigure: "assets/11_Water_Level.png",
    figureTitle: "Thesis Figure 90: Groundwater Level Dynamics & Tipping Points",
    metrics: [
      { label: "Annual Recorded Range", val: "-52 cm to +8 cm", sub: "Summer drought to full ponding" },
      { label: "CH₄ Eruption Threshold", val: "-12 to -15 cm", sub: "Anoxic redox tipping point" },
      { label: "Measurement Precision", val: "±0.5 cm", sub: "Barometrically compensated" },
      { label: "Logging Interval", val: "10 minutes", sub: "Autonomous continuous recording" }
    ],
    defenseTakeaway: "Maintaining water table depth within a tightly controlled target window (-5 to -15 cm) is the single most critical intervention to minimize both CO₂ oxidation and explosive CH₄ ebullition."
  },

  // --- 11. ECOHYDROLOGY: CAREX ROSTRATA BOTANICAL TWIN & AERENCHYMA SHUNT ---
  {
    id: "carex_rostrata",
    categoryKey: "ecohydrology",
    name: "Carex rostrata (Bottle Sedge Twin)",
    model: "Carex rostrata Stokes (Cyperaceae) — Vascular Aerenchyma Shunt",
    category: "Ecohydrology & Plant Physiological Shunt",
    height: "Canopy: +0.70 m / Deep Root Core: -0.45 m",
    icon: "🌿",
    spriteImg: "assets/sprites/wetland_carex_plate.jpg",
    photoImg: "assets/sprites/wetland_carex_plate.jpg",
    pinPosition: { top: "35%", left: "15%" },
    targetLayers: ["vegetation", "biogeochemistry", "atmosphere"],
    variables: ["Aerenchyma CH₄ Bypass Flux", "Internal Lacunar Gas Conductance", "Radial Oxygen Loss (ROL)", "Canopy Photosynthesis (GPP)"],
    description: "Dominant vascular macrophyte across the minerotrophic fen at Wallener Au. It features continuous lysigenous aerenchyma tissue with extensive internal gas lacunae that directly interconnect the submerged anoxic rhizosphere with the free atmosphere. It functions as a low-resistance molecular bypass chimney, allowing biogenic methane (CH₄) produced in the deep catotelm to escape directly to ambient air without being consumed by methanotrophic bacteria in the aerobic topsoil horizon.",
    pipelineRole: "Flux Partitioning Driver: Explains 60% to 85% of total summer CH₄ emissions via transpiration- and diffusion-driven convective transport. Simultaneously, it supplies atmospheric oxygen into the deep rhizosphere via Radial Oxygen Loss (ROL), generating coupled oxic-anoxic microsites for nitrification-denitrification that trigger episodic nitrous oxide (N₂O) pulses.",
    specsTable: [
      { spec: "Species / Taxonomy", val: "Carex rostrata Stokes (Cyperaceae family)", purpose: "Bottle sedge / key ecological phytoindicator in fluctuating hydrological regimes" },
      { spec: "Tissue Architecture", val: "Continuous lysigenous aerenchyma (45–60% v/v tissue porosity)", purpose: "Low-impedance axial gas conduction conduit bypassing soil matrix" },
      { spec: "CH₄ Shunt Fraction", val: "65% – 85% of total ecosystem summer methane emissions", purpose: "Direct bypass evading oxidative biofiltration capacity of the acrotelm" },
      { spec: "Radial Oxygen Loss (ROL)", val: "0.15 to 0.42 µmol O₂ m⁻² s⁻¹ diffused into rhizosphere", purpose: "Oxygenates surrounding reduced peat, establishing coupled N₂O microsites" },
      { spec: "Effective Root Depth", val: "Penetration z = -10 cm to -50 cm (Deep anoxic catotelm)", purpose: "Harvests dissolved methane directly from maximum methanogenesis zone" },
      { spec: "Conduction Mechanism", val: "Diurnal thermo-convective gradient + Knudsen molecular diffusion", purpose: "Accelerates gas vent rate during peak solar insolation and transpiration hours" }
    ],
    figures: [
      {
        id: "carex_anatomy_plate",
        label: "Botanical Plate & Aerenchyma",
        file: "assets/sprites/wetland_carex_plate.jpg",
        title: "Botanical Plate of Carex rostrata Stokes: Anatomy & Lacunar Shunt",
        caption: "Scientific illustration and cross-section of culm and leaf blade of Carex rostrata Stokes, detailing longitudinal aerenchyma lacunae functioning as a direct bypass for CH₄ efflux alongside terminal inflorescence spikes."
      }
    ],
    associatedFigure: "assets/sprites/wetland_carex_plate.jpg",
    figureTitle: "Botanical Plate & Aerenchyma Anatomy: Carex rostrata",
    metrics: [
      { label: "Aerenchyma Porosity", val: "55% v/v", sub: "Continuous lacunar volume" },
      { label: "CH₄ Emission Contribution", val: "72%", sub: "Direct summer bypass" },
      { label: "Radial O₂ Loss", val: "0.28 µmol/m²s", sub: "Rhizosphere oxygenation" },
      { label: "Root Core Penetration", val: "48 cm", sub: "Catotelm anchorage" }
    ],
    defenseTakeaway: "Vegetative cover of Carex rostrata decouples the direct correlation between water table depth and methane fluxes: a mature sedge stand emits massive CH₄ fluxes even under low groundwater tables by acting as a natural chimney network."
  }
];

