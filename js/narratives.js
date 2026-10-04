/* ==========================================================================
   MASTER THESIS NARRATIVES & PRESENTATION SEQUENCING (31 SLIDES)
   Defense Framework: "The Rewetting Paradox" (Wallener Au, CAU Kiel)
   English-Only Formal Scientific Defense
   Definitive Identity: "Stratigraphy & Probes"
   ========================================================================== */

export const ACTIVE_LOGO = {
  "id": "logo_2",
  "number": 2,
  "title": "Wetland Monitor",
  "concept": "Multiscale peat stratigraphy with internal sensors & remote sensing satellite",
  "file": "assets/sprites/logo_2.png?v=4.0",
  "badgeColor": "#fbbf24"
};

export const MASTER_APPROACH = {
  "id": "the_rewetting_paradox",
  "title": "Unified Defense Methodology & Analysis Layers",
  "subtitle": "Unified Thesis Defense Methodology • CAU Kiel",
  "description": "Comprehensive synthesis of peat stratigraphy, climate policy drivers, multiscale observational hierarchies, agricultural soil mechanical memory, and the final net GHG balance at 20- and 100-year horizons.",
  "slides": [
    {
      "id": "slide_1_cover",
      "stepNumber": 1,
      "layerBadge": "Defense Opening & Context",
      "title": "1. Academic Defense: Carbon Fluxes in Transitioning Peatlands",
      "viewTarget": "thesis_cover",
      "wtdDepth": -45,
      "diurnalMode": true,
      "figure": "assets/sprites/logo_2.png",
      "pitch": {
        "title": "Opening Statement & Welcome to Examination Committee",
        "speech": "Distinguished committee members, Prof. Komainda, Dr. Jordan, and colleagues: Welcome to the master's thesis defense on 'Carbon Fluxes and Greenhouse Gases Exchange in Transitioning Peatlands of Northern Germany'. Peatlands represent only 3% of terrestrial land area yet contain over 30% of global soil organic carbon. Over 90% of peatlands in Schleswig-Holstein were drained for intensive agriculture. Today, as environmental mandates push for rewetting, we investigate the acute biophysical trade-offs: how do carbon dioxide, methane, and nitrous oxide balances shift as groundwater tables rise across degraded peat profiles?",
        "bullets": [
          "Academic defense at the Faculty of Agricultural and Nutritional Sciences, Christian-Albrechts-Universität zu Kiel (CAU Kiel).",
          "Supervisors: Prof. Martin Komainda Ph.D. (Grassland and Forage Science) & Sebastian Jordan Ph.D. (Research Associate & Greenhouse Gas Monitoring Coordinator, Klimafarm Project).",
          "Observational testbed: Klimafarm Peatland Observatory at Wallener Au (Schleswig-Holstein).",
          "Central research core: Coupled high-frequency Eddy Covariance (10 Hz), in situ gas chambers, and soil mechanics during the drained-to-rewetted transition."
        ],
        "defenseQ": "What is the core novelty of this thesis? We unite deep soil mechanics and precompression stress with micrometeorological flux diagnostics, demonstrating that physical soil legacy dictates the magnitude of greenhouse gas emissions upon rewetting.",
        "coreThesis": "Peatland rewetting cannot be evaluated through carbon dioxide alone; resolving the net radiative impact requires coupling micrometeorological turbulent exchange, discrete chamber hotspot dynamics, and historical soil mechanical memory."
      }
    },
    {
      "id": "slide_2_agenda",
      "stepNumber": 2,
      "layerBadge": "Defense Roadmap & Structure",
      "title": "2. Defense Agenda: Methodological Progression",
      "viewTarget": "defense_agenda",
      "wtdDepth": -45,
      "diurnalMode": true,
      "figure": "assets/sprites/logo_2.png",
      "pitch": {
        "title": "Presentation Roadmap & Analytical Hierarchy (31 Slides Across 5 Parts)",
        "speech": "Today's defense navigates 9 orders of magnitude across five coherent thematic parts: Part I establishes our theoretical framework, core hypotheses, and environmental baseline (Slides 1–10). Part II unveils the micrometeorological tower instrumentation rig, high-frequency 10 Hz processing, empirical QC yield (Tables 13a & 13b), and reproducible R spheres (Slides 11–16). Part III addresses micrometeorological flux diagnostics, energy balance closure, and soil geomechanics (Slides 17–22). Part IV details biogeochemical succession, the static chamber network, and spatial disconnect (Slides 23–29). Finally, Part V delivers the net multi-decadal radiative balance and operational agronomic guidelines (Slides 30–31).",
        "bullets": [
          "Part I: Theoretical Framework & Environmental Baseline (Slides 1–10)",
          "Part II: Observational Rig, Computational Pipeline & R Spheres (Slides 11–16)",
          "Part III: Flux Diagnostics & Soil Geomechanics (Slides 17–22)",
          "Part IV: Biogeochemistry, Chamber Transect & Multi-Gas Dynamics (Slides 23–29)",
          "Part V: Definitive Synthesis, 20y vs 100y Balance & Agronomic Policy (Slides 30–31)"
        ],
        "defenseQ": "How are these analytical layers bridged? Through our multiscale methodological bridge spanning 9 orders of magnitude, connecting pore-scale consolidation to field-scale turbulent exchange.",
        "coreThesis": "A defensible greenhouse gas assessment demands an integrated 6-layer scientific hierarchy spanning macroclimate boundary conditions, 10 Hz micrometeorology, pedological mechanics, and multi-decadal radiative synthesis."
      }
    },
    {
      "id": "slide_3_aims_hypotheses",
      "stepNumber": 3,
      "layerBadge": "Research Framework & Hypotheses",
      "title": "3. Research Framework: Core Hypotheses & Conceptual Model",
      "viewTarget": "aims_objectives",
      "wtdDepth": -45,
      "diurnalMode": true,
      "figure": "assets/Peatlands_Biogeochemical_Processes_Fig20.png",
      "pitch": {
        "title": "Overarching Aim, Biogeochemical Model (Fig. 20) & Three Working Hypotheses",
        "speech": "Before examining empirical data, we establish our formal scientific foundation grounded in the conceptual model of Figure 20: 'Peatlands Biogeochemical Processes'. Carbon enters the ecosystem via plant canopy photosynthesis. In drained acrotelm horizons, atmospheric oxygen fuels aerobic microbial respiration, producing sustained baseline CO2 efflux. Upon rewetting, oxygen depletion triggers a cascade where fermentative bacteria decompose organic matter into acetate and H2, which methanogenic archaea reduce to methane (CH4) under strict anoxia (Eh < -200 mV). While capillary fringe methanotrophs oxidize diffusing CH4, vascular sedges like Carex rostrata bypass this filter via aerenchyma chimneys. Grounded in this mechanistic model, we formulate three testable hypotheses: H1 (Biogeochemical Pulse: reflooding triggers an acute non-linear CH4 surge), H2 (Soil Mechanical Memory: plow pan overconsolidation breaks vertical drainage), and H3 (Spatial Disconnect: relict ditches act as ebullition hotspots diluted across tower footprints).",
        "bullets": [
          "Conceptual Model (Fig. 20): Links canopy photosynthesis, oxic CO₂ mineralization, anaerobic fermentation, methanogenesis (Eh < -200 mV), and vascular bypass.",
          "General Objective: Quantify continuous multi-gas exchange (CO₂, CH₄, N₂O) and identify biophysical controls across the rewetting transition.",
          "H1 (Biogeochemical Pulse): Initial reflooding triggers an acute surge in CH₄ emissions exceeding baseline peat oxidation offsets.",
          "H2 (Soil Mechanical Memory): Decades of tractor compaction formed a dense plow pan (σp = 62.4 kPa) creating the Hydrological Paradox.",
          "H3 (Spatial Disconnect): Relict ditches act as localized ebullition chimneys whose extreme fluxes are diluted by tower footprint integration."
        ],
        "defenseQ": "What is the primary scientific premise linking soil physics to greenhouse gas fluxes? Mechanical over-compaction permanently collapsed coarse macroporosity, preventing natural drainage and creating superficial water stagnation that forces the microbial transition from aerobic respiration to methane fermentation (Figure 20).",
        "coreThesis": "Rewetting successfully suppresses aerobic peat mineralization and oxidative subsidence, but induces acute trade-offs: massive short-term methane radiative forcing and mechanical soil bearing collapse."
      }
    },
    {
      "id": "slide_3b_digital_twin",
      "stepNumber": 3.5,
      "layerBadge": "Digital Twin Observatory",
      "title": "3b. Soil-Atmosphere Digital Twin: The Living Ecosystem Cross-Section",
      "viewTarget": "soil_interface",
      "wtdDepth": -25,
      "diurnalMode": true,
      "pitch": {
        "title": "The Digital Twin: Bridging Physical Intuition and High-Frequency Measurement",
        "speech": "Before diving into the methodology, I want to orient the committee with our site-specific digital twin — a dynamic, physics-based cross-section of the Wallener Au peatland rendered in real time. This vector illustration encodes everything we know about the site: the three-layer soil architecture (acrotelm, plow pan at 25 cm, and catotelm), the seasonal water table dynamics from +2 cm ponding in winter to -44 cm drought in summer, and the three greenhouse gas flux pathways. Carbon dioxide moves by concentration gradient through the stomatal-photosynthesis-respiration loop. Methane is produced in the anoxic catotelm and surfaces primarily through open aerenchyma conduits in Carex and Eriophorum stems. Nitrous oxide fires episodically from redox microsites at the aerobic-anaerobic interface. You can switch between summer and winter states — notice how the CH4 arrows turn red in winter: that is Hypothesis 1, the acute post-rewetting methane pulse.",
        "bullets": [
          "Summer Day: CO₂ net sink (−3.8 µmol m⁻² s⁻¹), CH₄ normal (+42 nmol), strong convection — well-coupled tower.",
          "Summer Night: GPP = 0, Reco source (+3.2 µmol), stable inversion layer — u* < 0.12 m/s — Nighttime Problem.",
          "Winter Day: CO₂ suppressed (+0.8 µmol), CH₄ SURGES to +145 nmol (×3.4×) — Hypothesis H1 pulse confirmed.",
          "Winter Night: Complete anoxic bypass via aerenchyma, laminar stagnation, u* = 0.05 m/s — EC tower fully decoupled.",
          "Annual cycle shows WTD from -44 cm (Aug drought) → +2 cm (Nov inundation) driving the GHG budget trajectory."
        ],
        "defenseQ": "How do you distinguish aerenchyma-mediated CH₄ transport from ebullition in the tower signal? Ebullition creates sub-second CH₄ concentration spikes detectable as super-threshold positive kurtosis events in the 10 Hz LI-7700 open-path time series, while aerenchyma transport generates a slower diurnal pattern correlated with plant temperature and PAR.",
        "coreThesis": "The digital twin encodes the mechanistic narrative: the soil mechanical memory (plow pan) controls the hydrological response, which drives the redox dynamics, which determines the balance between CO₂ sequestration and CH₄ emission."
      }
    },
    {
      "id": "slide_4_climate_dilemma",
      "stepNumber": 4,
      "layerBadge": "Context & Climate Policy",
      "title": "4. The Climate Dilemma: Peatland Rewetting Ambition vs. Reality",
      "viewTarget": "macro",
      "macroLayerTarget": "soil_carbon",
      "spotlightTarget": "#macro-card-soil-carbon",
      "wtdDepth": -45,
      "diurnalMode": true,
      "figure": "assets/SiteMap_SoilCarbon.png",
      "pitch": {
        "title": "The Rewetting Dilemma & Policy Ambitions",
        "speech": "Drained agricultural peatlands represent the single largest terrestrial greenhouse gas hotspot in Schleswig-Holstein, emitting up to 20 to 30 tons of CO₂-equivalent per hectare per year through ongoing oxidative subsidence. While European and federal mandates push for large-scale rewetting to achieve 2045 carbon neutrality, this management intervention introduces a profound biogeochemical trade-off: halting heterotrophic aerobic CO₂ loss by raising water tables inevitably triggers acute pulses of methane (CH₄). Over the 20-year horizon decisive for near-term climate targets, methane possesses a Global Warming Potential of 84, meaning that even modest mass emissions can dwarf the carbon sequestered by emerging wetland canopies and convert the ecosystem into an active climate warmer.",
        "bullets": [
          "Drained peatlands in northern Germany emit up to 20–30 t CO₂-eq ha⁻¹ yr⁻¹ via oxidative subsidence.",
          "Rewetting ambition aims to halt CO₂ loss, but acute CH₄ pulses risk undermining 20-year climate targets.",
          "Critical imperative: Unraveling whether rewetting acts as a true net sink or an acute climate warming hotspot."
        ],
        "defenseQ": "Why is the 20-year time horizon critical? Because methane has a GWP20 of 84, meaning an initial methane pulse exerts massive front-loaded warming during the decisive decades to 2045.",
        "coreThesis": "Under the 20-year time horizon decisive for 2045 net-zero climate goals (GWP₂₀ = 84), initial post-rewetting methane bursts can completely overwhelm carbon dioxide sequestration, converting rewetted fens into acute warming hotspots."
      }
    },
    {
      "id": "slide_5_baseline_drainage",
      "stepNumber": 5,
      "layerBadge": "Agricultural Baseline State",
      "title": "5. The Baseline State: Decades of Intensive Agricultural Drainage",
      "viewTarget": "soil_interface",
      "scopeTarget": "overview",
      "diurnalMode": true,
      "wtdDepth": -45,
      "instrumentHighlight": "soil_sensors",
      "figure": "assets/24_Soil_Stratigraphy_Wallen_Combined.png",
      "pitch": {
        "title": "Agricultural Drainage Baseline: Mechanical & Oxidative Legacy",
        "speech": "For over half a century, the Wallener Au lowlands were subjected to intensive agricultural drainage via deep drainage ditches and subsurface tile networks to support intensive dairy pasture and silage production. Drainage maintained mean summer groundwater tables between -45 and -60 cm. This persistent drawdown aerated the upper peat profile, accelerating heterotrophic microbial mineralization of ancient fen peat and driving progressive vertical subsidence at rates of 1 to 2 cm annually. Concurrently, repeated passes of heavy tractors and slurry tankers applied mechanical contact pressures exceeding 200 kPa onto saturated organic horizons, permanently crushing the virgin peat fabric.",
        "bullets": [
          "Systematic ditch and tile drainage sustained artificial groundwater tables at -45 to -60 cm.",
          "Aerobic microbial respiration drove sustained CO₂ release and annual soil subsidence.",
          "Heavy machinery traffic applied repetitive compressive stresses exceeding pristine peat bearing capacity."
        ],
        "defenseQ": "How does drainage alter peat physical structure? Aerobic microbial oxidation dissolves the fibrous moss matrix, creating amorphous, friable, highly decomposed topsoil vulnerable to compaction.",
        "coreThesis": "Half a century of agricultural drainage created an irrecoverable debt: profound oxidative peat loss of 1–2 cm yr⁻¹ and severe mechanical overconsolidation that permanently altered soil pore geometry."
      }
    },
    {
      "id": "slide_6_stratigraphy",
      "stepNumber": 6,
      "layerBadge": "Soil Physics & Stratigraphy",
      "title": "6. Soil Stratigraphy Architecture: Acrotelm, Plow Pan & Catotelm",
      "viewTarget": "geophysics",
      "spotlightTarget": "#geophysics-card-stratigraphy",
      "wtdDepth": -45,
      "diurnalMode": true,
      "instrumentHighlight": "oedometer_test",
      "figure": "assets/24_Soil_Stratigraphy_Wallen_Combined.png",
      "pitch": {
        "title": "Soil Profile Architecture: The Three Diagnostic Horizons",
        "speech": "Our 0–4.5 m soil core drilling and pedological characterization reveal a stark, structurally compromised three-horizon architecture: First, an oxidized surface acrotelm (0 to -15 cm, horizon HhHt) composed of heavily degraded, amorphous peat with high mineral content and bulk density reaching 0.39 g/cm³. Second, an overconsolidated agricultural plow pan (IInHw) between -15 and -30 cm, displaying severe macropore collapse and plastic deformation from decades of wheel traffic. Third, an underlying waterlogged catotelm (IIInHr) extending down to sandy glacial deposits, composed of intact, highly porous reed peat with a low bulk density of only 0.15 g/cm³. This stratigraphy proves that modern rewetting takes place over a fundamentally altered soil substrate.",
        "bullets": [
          "Acrotelm (0 to -15 cm): Oxidized, highly mineralized topsoil with high bulk density (0.45 g/cm³).",
          "Plow Pan (-15 to -30 cm): Severely compacted boundary layer created by repetitive tractor passes.",
          "Catotelm (-30 to -120 cm): Deep waterlogged fen peat with high water-holding capacity (porosity >85%)."
        ],
        "defenseQ": "Why is the plow pan horizon so ecologically consequential? Because it acts as a permanent hydraulic throttling layer, restricting vertical water percolation and gas diffusion between topsoil and subsoil.",
        "coreThesis": "The degraded peat profile is not a homogeneous sponge, but a structurally stratified three-layer system where an agricultural plow pan (-15 to -30 cm) forms an impenetrable boundary separating oxic topsoil from anoxic catotelm."
      }
    },
    {
      "id": "slide_7_regional_climate",
      "stepNumber": 7,
      "layerBadge": "Macroclimate & Meteorology",
      "title": "7. Regional Macroclimate: Walter-Lieth Diagnostics & DWD Baselines",
      "viewTarget": "macro",
      "macroLayerTarget": "walter_lieth",
      "walterSource": "2024",
      "spotlightTarget": "#macro-card-walter",
      "wtdDepth": -45,
      "diurnalMode": true,
      "figure": "assets/Walter_Lieth_NASA.png",
      "pitch": {
        "title": "Regional Macroclimate: Walter-Lieth Diagnostics & DWD Baselines",
        "speech": "Schleswig-Holstein's maritime climate regime (temperate oceanic Cfb) sets the atmospheric boundary conditions for Wallener Au. Synthesizing 30-year DWD historical records with our Walter-Lieth diagrams reveals an annual mean temperature of 9.2 °C and 850 mm precipitation. Crucially, 2024 diverged significantly: a wet, uncharacteristically mild winter (+2.4 °C anomaly) saturated the catotelm, followed by summer heatwaves where saturation vapor pressure (es) quadrupled. When easterly continental winds established anticyclonic blocking, high vapor pressure deficits (VPD > 1.5–2.0 kPa) imposed severe atmospheric drought onto the rewetted fen surface.",
        "bullets": [
          "30-year regional baseline (DWD): Mean annual temperature 9.2 °C, precipitation 850 mm yr⁻¹.",
          "2024 measurement period anomaly: Wet winter (+2.4 °C above norm) followed by intense mid-summer evaporative episodes.",
          "Clausius-Clapeyron scaling: Elevated summer temperatures quadrupled atmospheric evaporative demand.",
          "Walter-Lieth analysis identifies acute semi-arid stress windows despite shallow underlying water tables."
        ],
        "defenseQ": "Why does an atmospheric drought matter in a rewetted wetland? Because high VPD drives rapid plant transpirational water loss and stomatal closure, decoupling canopy photosynthetic assimilation (GPP) from incoming solar irradiance.",
        "coreThesis": "Even in maritime temperate climates, atmospheric drought events (VPD > 1.5 kPa) impose severe ecophysiological moisture stress on wetland canopies, collapsing photosynthetic assimilation despite shallow regional water tables."
      }
    },
    {
      "id": "slide_8_satellite_context",
      "stepNumber": 8,
      "layerBadge": "Geospatial Remote Sensing",
      "title": "8. High-Resolution Satellite Context & Experimental Boundaries",
      "viewTarget": "macro",
      "macroLayerTarget": "satellite",
      "spotlightTarget": "#macro-card-satellite",
      "wtdDepth": -40,
      "diurnalMode": true,
      "figure": "assets/SiteMap_Satellite_Terrain.png",
      "pitch": {
        "title": "Experimental Field Boundaries & Spatial Vegetation Mosaic",
        "speech": "Combining 2400-pixel sub-meter aerial orthophotography with high-resolution Sentinel-2 multispectral passes, we mapped the 12-hectare experimental parcel at Wallener Au. This spatial analysis delineated the central eddy covariance tower at 3.5 m mast height, the dense network of historical drainage canals, and a complex spatial vegetation mosaic transitioning from remnant Lolium perenne pasture grasses to emerging wetland helophytes, primarily Carex rostrata and Phalaris arundinacea. Multi-temporal NDVI tracking confirms sharp phenological shifts between ditch depressions and elevated ridges, highlighting that surface boundary fluxes are governed by pronounced microtopographic heterogeneity.",
        "bullets": [
          "12-hectare experimental field parcel bounded by agricultural drainage canals.",
          "Sentinel-2 10m bands enable continuous spatial tracking of vegetation phenology (NDVI).",
          "High spatial fidelity ensures that chamber collars and micrometeorological towers sample representative ecosystem zones."
        ],
        "defenseQ": "Did spatial canopy heterogeneity cause flux bias? No, footprint modeling confirmed that the tower field of view encompasses the full representative mix of sedges and grasses.",
        "coreThesis": "High-resolution satellite phenology confirms that spatial vegetation mosaic and ditch geometry dictate localized gas exchange pathways, requiring footprint-calibrated placement of observational infrastructure."
      }
    },
    {
      "id": "slide_9_footprint_2d",
      "stepNumber": 9,
      "layerBadge": "Aerodynamic Footprint Modeling",
      "title": "9. The 2D Turbulent Flux Footprint (Kljun et al., 2015 Parameterization)",
      "viewTarget": "macro",
      "macroLayerTarget": "footprint",
      "spotlightTarget": "#macro-card-footprint",
      "wtdDepth": -40,
      "diurnalMode": true,
      "figure": "assets/17_19_Combined_Footprint.png",
      "pitch": {
        "title": "2D Flux Footprint Climatology (Kljun et al., 2015)",
        "speech": "To ensure that measured turbulent fluxes are genuinely representative of the peatland parcel, we implemented the 2D footprint model of Kljun et al. (2015). Under prevailing south-westerly winds (190°–240°), the 70% and 80% cumulative source area is strictly contained within 120–250 m fetch from the tower. Over 92% of all processed 30-minute intervals originate entirely within the managed parcel perimeter, eliminating external advective contamination.",
        "bullets": [
          "2D flux footprint parameterized using Kljun et al. (2015) fast footprint algorithm.",
          "Prevailing wind sector (SW 190°–240°) aligns with maximum homogeneous fen fetch.",
          "80% cumulative source area confined to 120–250 m, strictly within site boundaries.",
          "Over 92% of processed half-hourly intervals originate from the target peat ecosystem."
        ],
        "defenseQ": "What happened when wind blew from outside the target sector? Data intervals from non-target wind sectors or with peak footprint fetch exceeding parcel bounds were systematically flagged and excluded during QC filtering.",
        "coreThesis": "Over 92% of processed half-hourly flux intervals originate strictly within the homogeneous 12-hectare fen parcel, mathematically guaranteeing that observed fluxes represent the target peatland ecosystem."
      }
    },
    {
      "id": "slide_10_multiscale_bridge",
      "stepNumber": 10,
      "layerBadge": "Methodological Integration",
      "title": "10. Multiscale Methodological Bridge: From Peat Pore (μm) to Satellite (km)",
      "viewTarget": "macro",
      "macroLayerTarget": "topography",
      "spotlightTarget": "#macro-card-topography",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/SiteMap_Topography.png",
      "pitch": {
        "title": "Bridging 9 Orders of Magnitude Across Observational Scales",
        "speech": "A defining strength of this thesis is the multiscale methodological bridge spanning nine orders of magnitude: from microscopic oedometer pores (10⁻⁶ m) measuring pneumatic conductivity, to manual in situ chambers (1 m) capturing microtopographic ditch hotspots, to tower-based eddy covariance (10² m) integrating continuous field fluxes at 10 Hz, up to regional DEM and satellite remote sensing (10³ m). This prevents the widespread error of uncalibrated spatial extrapolation.",
        "bullets": [
          "Microscale (μm): Peat pore architecture, dry bulk density, and precompression stress.",
          "Mesoscale (m): In situ closed chambers resolving ebullition in relict drainage ditches.",
          "Macroscale (100 m to km): Eddy covariance aerodynamic footprint, DEM relief, and Sentinel-2 phenology.",
          "Ensures process-level grounding from the single soil pore to the landscape greenhouse gas budget."
        ],
        "defenseQ": "Why is a single observational method insufficient in transitioning peatlands? Towers spatially average and can dilute intense localized ditch ebullition, while chambers alone miss continuous diurnal and seasonal temporal dynamics.",
        "coreThesis": "Validating greenhouse gas balances across nine orders of magnitude—from micron-scale pore throats to kilometer-scale satellite footprints—is essential to prevent catastrophic spatial upscaling errors."
      }
    },
    {
      "id": "slide_11_tower_instrumentation",
      "stepNumber": 11,
      "layerBadge": "Micrometeorological Hardware Rig",
      "title": "11. Eddy Covariance Tower Instrumentation: High-Frequency Sensor Rig",
      "viewTarget": "instruments_matrix",
      "spotlightTarget": ".hardware-card[data-category-key='eddy_covariance']",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/instruments/photo_licor_7500.png",
      "pitch": {
        "title": "High-Frequency 10 Hz Micrometeorological Tower Rig (Mast Height 3.5 m)",
        "speech": "Continuous ecosystem-scale turbulent exchange was captured using a specialized micrometeorological mast erected at 3.5 m height at Wallener Au (54.2807° N, 9.2586° E). The physical sensor rig couples a Campbell Scientific / Gill CSAT3 3D ultrasonic anemometer (sampling 3D wind vectors u, v, w and sonic virtual temperature Ts at 10 Hz with 1 mm/s precision) with two synchronized open-path infrared gas analyzers: a LI-COR LI-7500DS measuring turbulent CO₂ and H₂O fluctuations, and a LI-COR LI-7700 open-path tunable diode laser absorption spectrometer (WMS) for high-frequency CH₄ fluctuations. The open-path geometry completely eliminates tube wall sorption delays and damping, canted 15° south to drain precipitation while minimizing tower mast wake distortion. Auxiliary sensors on an adjacent 3.5 m biomet mast include a Kipp & Zonen CNR4 net radiometer, a Campbell CS655 soil moisture/temperature array, and Hukseflux HFP01 soil heat flux plates.",
        "bullets": [
          "Sonic Anemometer (CSAT3 / Gill): 10 Hz 3D wind velocity (u, v, w) and acoustic temperature (Ts) with 1 mm/s resolution.",
          "Open-Path IRGA (LI-COR LI-7500DS): Dual-wavelength NDIR non-dispersive infrared gas analyzer for CO₂ and H₂O fluctuations.",
          "Laser Spectrometer (LI-COR LI-7700): 10 Hz wavelength modulation spectroscopy (WMS) for turbulent methane (CH₄) flux quantification.",
          "15° South Canted Arm: Minimizes rain drop pooling on optical lenses and eliminates tower shadow wake distortion.",
          "Biomet Complement: 4-component radiation (Kipp & Zonen CNR4), soil heat flux (Hukseflux HFP01), and multi-depth Tsoil / VWC."
        ],
        "defenseQ": "Why did you select open-path analyzers over closed-path systems? Open-path analyzers eliminate high-frequency attenuation and water vapor sorption along sampling tubes, requiring zero vacuum pump power and enabling high-frequency methane detection without delay corrections in remote wetlands.",
        "coreThesis": "Deploying synchronized open-path optical spectrometers at 10 Hz eliminates tubing attenuation and vacuum delays, enabling simultaneous high-frequency resolution of turbulent CO₂, CH₄, and water vapor exchange."
      }
    },
    {
      "id": "slide_11b_eddypro_config",
      "stepNumber": 11.5,
      "layerBadge": "EddyPro® Configuration",
      "title": "11b. EddyPro® 7.0.9 Processing Configuration & Static Chamber Physics",
      "viewTarget": "instruments_matrix",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/fig52_ec_workflow_clean.png",
      "pitch": {
        "title": "Instrument Configuration Tables: EddyPro® 7.0.9 & 8-Collar Closed Chamber Network",
        "speech": "To ground our methodological choices in operational parameters, we present the definitive instrument configuration tables. For EddyPro® 7.0.9, the critical decisions are: (1) 3D Sector-Wise Planar Fit coordinate rotation using four 90-degree wind sectors to account for the asymmetric ditch topography; (2) Webb-Pearman-Leuning air density correction applied to both LI-7500DS and LI-7700 open-path analyzers; (3) Moncrieff 1997 spectral loss corrections for the 20 cm horizontal sensor separation; and (4) ICOS 0-1-2 quality screening yielding 79.6% CO₂ retention versus only 55.4% for CH₄ due to winter mirror icing. For the closed chamber network, the conical frustum geometry correction adds a critical systematic volume adjustment of approximately 14% compared to a naive cylindrical assumption, preventing systematic flux overestimation in chambers equipped with the 26 cm tall vegetation extension.",
        "bullets": [
          "EddyPro® 3D Planar Fit: Four 90° wind sectors accommodate asymmetric ditch micro-topography; mean w forced to 0.",
          "Sensor Separation 0.20 m: Drives Moncrieff high-frequency spectral correction, recovering ~8% of flux lost to path averaging.",
          "u* Threshold 0.152 m/s: Moving-point detection via REddyProc eliminates ~22% of nighttime low-turbulence intervals.",
          "Chamber Frustum Correction: V = 43.56 L (extended) vs. naive 32.4 L cylinder; 14% systematic volume error corrected.",
          "4-Point OLS Slope: Gas accumulation at t = 0, 20, 40, 60 s inside closed headspace ensures linear regime sampling."
        ],
        "defenseQ": "Why was 3D Sector-Wise Planar Fit chosen over 2D Double Rotation? The 2D Double Rotation forces w = 0 on each individual 30-min block, which risks artificially removing genuine low-frequency terrain-following flow and creating step discontinuities at sector boundaries in complex micro-topographic fields.",
        "coreThesis": "Transparent reporting of EddyPro® processing parameters and chamber geometric corrections is essential for inter-site comparison and reproducibility under emerging ICOS and FLUXNET community standards."
      }
    },
    {
      "id": "slide_12_ec_pipeline_qc",
      "stepNumber": 12,
      "layerBadge": "High-Frequency 10 Hz Pipeline",
      "title": "12. High-Frequency (10 Hz) Micrometeorological Pipeline: EddyPro 7.0 & Quality Filtering",
      "viewTarget": "data_pipeline",
      "spotlightTarget": "#pipeline-card-qc",
      "pipelinePane": "pane-phases",
      "autoFig": "assets/12_QC_Flag_Comparison.png",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/12_QC_Flag_Comparison.png",
      "pitch": {
        "title": "10 Hz Binary Ingestion, Despiking, Planar Fit & ICOS Quality Flags",
        "speech": "Processing more than 14,000 raw 10 Hz binary files into defensive 30-minute ecosystem fluxes requires an uncompromising mathematical pipeline executed in EddyPro 7.0 (Figure 50). Raw time series undergo despiking and statistical quality screening via Vickers & Mahrt (1997). We perform a 2D planar fit coordinate rotation across prevailing wind sectors (190°–240°) to force mean vertical wind velocity w = 0, eliminating mast tilt distortion. Next, Webb-Pearman-Leuning (WPL) air density corrections compensate for sensible and latent heat fluctuations altering gas density within the open optical path. High-frequency spectral losses due to sensor separation and line averaging are corrected via Horst (1997). Finally, every 30-minute flux is assigned an ICOS 0-1-2 quality flag based on steady-state tests and developed turbulence characteristics (Mauder & Foken, 2004).",
        "bullets": [
          "Raw 10 Hz Despiking: Vickers & Mahrt (1997) statistical screening removing electronic spikes and rain drop dropouts.",
          "2D Planar Fit Coordinate Rotation: Aligns streamlines to mean wind flow, forcing mean w = 0 and removing terrain tilt error.",
          "Webb-Pearman-Leuning (WPL) Correction: Adjusts raw gas fluctuations for simultaneous sensible and latent heat air density shifts.",
          "Spectral Attenuation Filtering: Horst (1997) analytical transfer functions compensating for sensor separation and path averaging.",
          "ICOS 0-1-2 Quality Flags: Class 0 (pristine for model parameterization), Class 1 (general annual budgets), Class 2 (discarded)."
        ],
        "defenseQ": "What is the physical meaning of the WPL correction in open-path sensors? Because the open sensor path heats and expands air parcels, temperature fluctuations generate apparent gas density variations even when molar ratios are constant. WPL mathematically removes these thermal expansion artifacts.",
        "coreThesis": "Rigorous aerodynamic processing (WPL Webb-Pearman-Leuning correction, planar-fit coordinate rotation, and ICOS 0-1-2 quality screening) provides the indispensable physical foundation for defensible ecosystem flux quantification."
      }
    },
    {
      "id": "slide_13_qc_tables",
      "stepNumber": 13,
      "layerBadge": "Empirical Quality Control Yield",
      "title": "13. Empirical Quality Control Distributions: Tables 13a (CO₂) & 13b (CH₄) Flux Filtering",
      "viewTarget": "data_pipeline",
      "spotlightTarget": "#pipeline-card-qc",
      "pipelinePane": "pane-qc",
      "qcSubTab": "co2",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/12b_CH4_QC_Flag_Comparison.png",
      "pitch": {
        "title": "Empirical Quality Control Yield: Tables 13a (CO₂) vs. 13b (CH₄)",
        "speech": "In Tables 13a and 13b (computed directly from 07_lmd_cl_gap_filling_ML.csv), we quantify empirical data yield across 15,014 half-hourly intervals. For CO₂ (Table 13a), we retain 79.6% of all data (58.0% strict QC 0 for pristine turbulence and 21.6% QC 1 for annual budget integration), discarding only 11.5% as unphysical or poorly developed turbulence (QC 2), with 8.9% true sensor downtime. In stark contrast, Table 13b reveals the empirical reality of methane monitoring: for CH₄, data retention drops to 55.4% (36.3% QC 0 and 19.1% QC 1), while 8.1% is flagged QC 2 and 36.5% is lost to sensor dropouts. This critical contrast corrects an earlier typographical error in the thesis draft where the CO₂ table was accidentally duplicated for CH₄, confirming that open-path methane mirrors require aggressive quality screening due to dew and winter icing.",
        "bullets": [
          "Table 13a (CO₂ Net Ecosystem Exchange): 79.6% total retention (58.0% QC 0, 21.6% QC 1), mean flux +0.06 µmol m⁻² s⁻¹.",
          "Table 13b (CH₄ Methane Flux): 55.4% total retention (36.3% QC 0, 19.1% QC 1), mean flux 13.51 nmol m⁻² s⁻¹.",
          "Sensor Dropout Asymmetry: Only 8.9% sensor downtime for CO₂ vs. 36.5% for CH₄ due to open-path optical mirror condensation and frost.",
          "Defensive Scientific Rigor: Corrects the duplicated CO₂ table error from earlier thesis draft revisions."
        ],
        "defenseQ": "Why does CH₄ have a 36.5% missing interval rate compared to only 8.9% for CO₂? The LI-7700 utilizes a multi-pass Herriott cell with mirror heaters; during dense North Sea fog, heavy morning dew, and winter frost, mirror contamination drops signal strength (RSSI < 10%), automatically triggering data rejection.",
        "coreThesis": "Atmospheric physical differences dictate data yields: while open-path CO₂ achieves 91.1% valid yield, open-path CH₄ suffers 36.5% optical loss during fog, dew, and frost, making machine learning imputation biophysically mandatory."
      }
    },
    {
      "id": "slide_14_r_spheres_workflows",
      "stepNumber": 14,
      "layerBadge": "R Pipeline & Computational Spheres",
      "title": "14. Computational Architecture & Procedural Workflows: The 4 Analytical Spheres in R",
      "viewTarget": "data_pipeline",
      "spotlightTarget": "#pipeline-card-qc, #pipeline-card-ml",
      "pipelinePane": "pane-workflows",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/fig50_data_processing_clean.png",
      "pitch": {
        "title": "The 4 Analytical Spheres in R & Procedural Flowcharts (Figs 50, 52, 62, 63)",
        "speech": "The computational backbone of Wallener Au is organized across four reproducible analytical spheres coded in R, codified by procedural flowcharts: Sphere 1 (Figures 50 & 52) executes raw 10 Hz EddyPro execution, planar fit coordinate transformations, and biomet QA/QC cross-validation against DWD networks. Sphere 2 (Figure 63) executes spatial upscaling from microtopographic chamber collars to continuous tower footprint, calculating the net multi-decadal GWP balance. Sphere 3 incorporates soil mechanics and Figure 57 air permeametry (Ka < 0.8 µm² in the plow pan). Sphere 4 (Figure 62) operates modular climate switches (Walter-Lieth 2024 vs NASA POWER 1999–2023) and machine learning gap-filling ensembles. This guarantees end-to-end mathematical reproducibility from raw binary bytes to final peer-reviewed figures.",
        "bullets": [
          "Sphere 1 (Figure 50 & 52): 10 Hz binary ingestion, EddyPro batch processing, WPL density correction, and DWD biomet cross-validation.",
          "Sphere 2 (Figure 63): Spatial upscaling, collar geometry scaling (16–42 cm), and multi-gas uncertainty propagation (SE_Net).",
          "Sphere 3 (Figure 57): Laboratory oedometer precompression curves (σp = 62.4 kPa) and pneumatic conductivity modeling.",
          "Sphere 4 (Figure 62): Modular bioclimatic switches (Walter-Lieth 2024 vs. NASA POWER) and machine learning gap-filling ensembles."
        ],
        "defenseQ": "How does this 4-sphere architecture prevent analytical bias? By isolating high-frequency eddy covariance processing from spatial chamber scaling and soil mechanics, each methodological component is validated independently before coupled multi-decadal synthesis.",
        "coreThesis": "Partitioning computational processing into four isolated, reproducible R spheres ensures complete methodological transparency and prevents error propagation between micrometeorology, chamber scaling, and soil physics."
      }
    },
    {
      "id": "slide_15_gapfilling",
      "stepNumber": 15,
      "layerBadge": "Phase 2: Artificial Intelligence & Imputation",
      "title": "15. Gap-Filling Methane: Machine Learning (ANN & Random Forest Benchmarks)",
      "viewTarget": "data_pipeline",
      "pipelinePane": "pane-phases",
      "spotlightTarget": "#pipeline-card-ml",
      "autoFig": "assets/14b_CH4_Models_Comparison.png",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/14b_CH4_Models_Comparison.png",
      "pitch": {
        "title": "Machine Learning Imputation Architecture: Benchmarking CO₂ vs. Predicting CH₄",
        "speech": "A critical methodological distinction lies in the role of machine learning across greenhouse gases. In micrometeorological convention, standard Marginal Distribution Sampling (MDS) via REddyProc is the benchmark for CO₂ Net Ecosystem Exchange. However, as visualized in Figure 62 and Figure 07b ('NEE Models Comparison'), we trained Artificial Neural Networks (ANN) and Random Forest (RF) ensembles as comparative benchmark regressors against MDS to rigorously quantify structural model uncertainty under non-linear micrometeorological interactions. In stark contrast, for CH₄ standard MDS fails completely because methane emissions are decoupled from incoming light and driven by episodic hydrostatic ebullition, water table drawdown, and soil temperature hysteresis. Thus, ANN and Random Forest serve as the indispensable predictive gap-filling engines for CH₄, ensuring that winter sensor outages do not systematically bias annual peatland carbon balances.",
        "bullets": [
          "MDS Benchmark for CO₂: Standard REddyProc lookup tables account for radiation and temperature regimes with minimal structural bias.",
          "Machine Learning Benchmarking (Fig. 62 & 07b): ANN and Random Forest evaluated alongside MDS to quantify model uncertainty across seasons.",
          "CH₄ Predictive Engine: Stochastic ebullition and hydrostatic pressure decoupling necessitate non-linear multi-layer perceptrons trained on multi-depth soil biometeorology (5, 20, 50 cm) and WTD.",
          "Annual Budget Protection: Machine learning imputation prevents an estimated 25–40% undercounting of winter methane emissions during freezing sensor dropouts."
        ],
        "defenseQ": "Why does Figure 62 show Random Forest and Neural Networks under CO₂ if MDS is standard? Because we deployed an exhaustive multi-model benchmark (Figure 07b) to verify that standard MDS does not introduce structural bias compared to modern non-linear machine learning regressors.",
        "coreThesis": "While standard Marginal Distribution Sampling (MDS) suffices for diurnal CO₂ cycles, non-linear machine learning (Random Forest, R² = 0.72) is scientifically indispensable to reconstruct episodic, non-linear methane pulses."
      }
    },
    {
      "id": "slide_16_partitioning",
      "stepNumber": 16,
      "layerBadge": "Phase 3: Respiration Models & Budgets",
      "title": "16. Flux Partitioning: Decoupling NEE into GPP and Reco (Lloyd-Taylor & Michaelis-Menten)",
      "viewTarget": "data_pipeline",
      "pipelinePane": "pane-phases",
      "spotlightTarget": "#pipeline-card-part",
      "autoFig": "assets/01_Reco_LT_Fits.png",
      "wtdDepth": -35,
      "diurnalMode": true,
      "figure": "assets/01_Reco_LT_Fits.png",
      "pitch": {
        "title": "Non-Linear Partitioning Fits (Figs 71 & 72) and Daily Carbon Budget Divergence (Fig. 76)",
        "speech": "Net Ecosystem Exchange was decoupled into Gross Primary Productivity (GPP) and Ecosystem Respiration (Reco) using complementary non-linear parameterizations. In Figure 71, nighttime fluxes under well-mixed turbulence (u* ≥ 0.12 m/s) parameterize the Lloyd-Taylor (1994) Arrhenius respiration function against 5 cm soil temperature (R² = 0.88). In Figure 72, daytime photosynthetic uptake is isolated using Michaelis-Menten rectangular hyperbolic light-response curves against photosynthetically active radiation (PAR). When examining Figure 76 ('Daily Carbon Budgets Comparison'), we observe crucial periods where observed daily fluxes diverge sharply from modeled trends: during the mid-summer drought, plow pan capillary disconnection throttles GPP while surface peat heating accelerates heterotrophic respiration, converting the wetland into a transient CO₂ source.",
        "bullets": [
          "Figure 71 (Reco Lloyd-Taylor Fits): Temperature-dependent Arrhenius activation energy parameterized under u* ≥ 0.12 m/s against upper 5 cm peat temperature.",
          "Figure 72 (GPP Michaelis-Menten Fits): Hyperbolic light saturation curve extracting maximum photosynthetic assimilation (GPP_max ~ 14.2 g C m⁻² d⁻¹).",
          "Figure 76 (Daily Carbon Budgets Comparison): Tracks observed daily NEE vs modeled trajectories, capturing acute sink-to-source excursions during summer drought and grass cutting.",
          "Mass Conservation Constraint: Verified across all 15,014 half-hourly intervals ensuring continuous mass balance NEE = Reco - GPP."
        ],
        "defenseQ": "Why do observed daily carbon budgets diverge from modeled trends in Figure 76? Because empirical cutting events remove canopy assimilation instantly while sudden summer droughts sever capillary water supply, causing stomatal closure that static light-response models do not anticipate.",
        "coreThesis": "Decoupling Net Ecosystem Exchange into Gross Primary Production and Ecosystem Respiration unmasks an active summer photosynthetic sink up to -14.2 g C m⁻² d⁻¹ that is swiftly offset by autumn-winter respiratory carbon loss."
      }
    },
    {
      "id": "slide_17_energy_balance_closure",
      "stepNumber": 17,
      "layerBadge": "Micrometeorological Quality",
      "title": "17. Micrometeorological Quality & Energy Balance Closure (Fig. 13: Slope = 0.85, R² = 0.94)",
      "viewTarget": "flux_diagnostics",
      "spotlightTarget": "#flux-plot-card-ebc",
      "wtdDepth": -35,
      "diurnalMode": true,
      "instrumentHighlight": "cnr4_radiometer",
      "figure": "assets/13_Energy_Balance_Closure.png",
      "pitch": {
        "title": "Thermodynamic Energy Balance Closure (Fig. 13: LE + H vs. Rn - G)",
        "speech": "The fundamental acid test for any eddy covariance tower is surface energy balance closure (Figure 13): we regress available energy on the X-axis (net radiation Rn minus soil heat flux G) against turbulent fluxes on the Y-axis (sensible heat H plus latent heat LE). Ordinary least squares yields the empirical relation: (LE + H) = 0.85 · (Rn - G) + 12.52 W/m² with a determination coefficient of R² = 0.94. An 85% energy recovery places Wallener Au in the upper decile of FLUXNET and ICOS temperate wetland sites (which typically average 70–80%). The 15% residual deficit does not stem from sensor errors, but from unmeasured volumetric heat storage in standing water and the porous acrotelm (S), as well as mesoscale convective eddies exceeding the 30-minute block average. This confirms exceptional sensor leveling, footprint homogeneity, and aerodynamic data integrity for downstream CO₂ and CH₄ flux quantification.",
        "bullets": [
          "Figure 13 reading: X-axis = Available energy (Rn - G); Y-axis = Turbulent fluxes (LE + H) in W/m².",
          "Empirical OLS equation: (LE + H) = 0.85 · (Rn - G) + 12.52 W/m² with R² = 0.94.",
          "Cyan dashed line represents theoretical 1:1 thermodynamic conservation.",
          "15% residual gap physically accounted for by acrotelm/surface water heat storage (S) and low-frequency eddies.",
          "Positive intercept (+12.52 W/m²): Nocturnal heat release from the saturated peat mass back to the cold boundary layer.",
          "Gold standard validation: Confirms perfect fetch homogeneity and sensor alignment for gas flux calculations."
        ],
        "defenseQ": "Why is an 85% closure ratio considered gold standard in wetlands if the First Law of Thermodynamics mandates 100%? Because waterlogged peat has a massive volumetric heat capacity; soil plates buried at 5 cm miss the rapid thermal storage (S) occurring in the top centimeters of saturated moss, water pools, and dense sedge biomass. Global synthesis papers (e.g., Wilson et al., Foken) establish that 85% with R² = 0.94 guarantees zero systematic aerodynamic bias.",
        "coreThesis": "Achieving an 85% energy balance closure ratio (R² = 0.94) in a waterlogged fen rigorously confirms that turbulent energy transfer is aerodynamically conserved without systematic sensor undercatch."
      }
    },
    {
      "id": "slide_18_bowen_ratio",
      "stepNumber": 18,
      "layerBadge": "Energy Partitioning & Ecohydrology",
      "title": "18. Thermodynamic Bowen Ratio & Ecosystem Water Use Efficiency (Fig. 16 & Fig. 14)",
      "viewTarget": "flux_diagnostics",
      "spotlightTarget": "#flux-plot-card-bowen, #flux-plot-card-ewue",
      "wtdDepth": -32,
      "diurnalMode": true,
      "figure": "assets/16_Bowen_Ratio.png",
      "pitch": {
        "title": "Thermodynamic Partitioning (Fig. 16) & Ecohydrological eWUE (Fig. 14)",
        "speech": "Figures 16 and 14 quantify the annual energy partitioning and ecosystem water use efficiency throughout 2024. In Figure 16, the Bowen ratio (β = H / LE) confirms that Wallener Au is an evaporation-dominated wetland: during the active growing season (April to September), the smoothed curve remains strictly between 0.10 and 0.25, well below the 1.0 equilibrium line (dashed), channeling over 80% of net available energy into latent heat dissipation (LE). In winter (Jan–Feb), β reverses to negative values (-1.0 to -1.5) due to boundary-layer thermal inversions where sensible heat fluxes toward cold surface peat. Concurrently, Figure 14 tracks ecosystem water use efficiency (eWUE = GPP / ET, in gC m⁻² mm⁻¹): it achieves an ecohydrological optimum in late spring (May–June peak of 3.2 gC/mm) with open stomata and low VPD, but experiences a pronounced mid-summer depression (2.3–2.5 gC/mm) in July–August driven by high atmospheric evaporative demand and stomatal throttling.",
        "bullets": [
          "Figure 16 (Bowen Ratio): Growing season baseline β between 0.10 and 0.25 (<< 1.0), channeling >80% of net radiation into latent heat (LE).",
          "Winter Thermal Inversion (Jan–Feb): Negative β (-1.0 to -1.5) caused by sensible heat flux directed downwards toward cold surface peat.",
          "Figure 14 (eWUE = GPP / ET): Peak carbon assimilation efficiency in May–June (~3.2 gC m⁻² mm⁻¹) under moderate thermal regime and low VPD.",
          "Mid-Summer eWUE Penalty (2.3–2.5 gC/mm): Atmospheric drought (high VPD) escalates transpirational water loss while stomatal closure restricts GPP.",
          "Transient Bowen Spikes (β > 0.85): Dry summer spells severing plow pan capillary rise shift energy toward sensible heating (H)."
        ],
        "defenseQ": "How are the Bowen ratio and eWUE physically and ecophysiologically coupled? They represent two sides of the same ecohydrological coin: a low Bowen ratio proves that available energy is dissipated by evaporating water, while eWUE quantifies how much carbon is fixed per unit of water transpired. High summer VPD penalizes eWUE and induces isolated Bowen spikes as stomata close to prevent desiccation.",
        "coreThesis": "Latent heat flux accounts for over 70% of summer net radiation (Bowen ratio < 0.35), establishing that rewetted peatlands function as powerful thermodynamic evaporative coolers at the regional landscape scale."
      }
    },
    {
      "id": "slide_19_stomatal_vpd",
      "stepNumber": 19,
      "layerBadge": "Ecophysiological Dynamics",
      "title": "19. Stomatal Regulation & Atmospheric Drought (GPP vs. VPD Trade-off)",
      "viewTarget": "flux_diagnostics",
      "spotlightTarget": "#flux-plot-card-vpd",
      "wtdDepth": -32,
      "diurnalMode": true,
      "figure": "assets/15_GPP_vs_VPD.png",
      "pitch": {
        "title": "Photosynthetic Assimilation & Atmospheric Vapor Pressure Deficit (Fig. 15)",
        "speech": "Figure 15 evaluates the response of gross primary production (GPP, in gC m⁻² d⁻¹) against atmospheric vapor pressure deficit (VPD, plotted in hPa where 10 hPa = 1.0 kPa). The empirical curve delineates three physiological regimes: first, an initial linear increase between 0 and 4.5 hPa driven by morning stomatal opening under sunlight; second, an abrupt saturation plateau at 5.0 hPa (0.5 kPa) stabilizing GPP around 7.5 gC m⁻² d⁻¹; and third, an asymptotic decoupling above 5 to 10 hPa. Despite peak midday irradiance, GPP cannot increase further because vascular macrophytes close stomata to preserve hydraulic safety margins, decoupling carbon uptake from available sunlight.",
        "bullets": [
          "Figure 15 reading: X-axis in hPa (10 hPa = 1.0 kPa) plotted against daily GPP carbon uptake (gC m⁻² d⁻¹).",
          "Phase 1 (0 to 4.5 hPa): Rapid linear photosynthetic rise driven by morning light opening stomata.",
          "Phase 2 (Plateau at 5.0 hPa / 0.5 kPa): Photosynthetic saturation plateau stabilizing around ~7.5 gC m⁻² d⁻¹.",
          "Phase 3 (>5 to 10 hPa / >0.5–1.0 kPa): Stomatal throttle under atmospheric drought halts assimilation and expands uncertainty.",
          "Decouples nominal wetland soil moisture from atmospheric evaporative demand during heatwave episodes."
        ],
        "defenseQ": "Why does GPP plateau at only 5.0 hPa if maximum solar radiation occurs at midday? Because atmospheric evaporative demand exceeds xylem hydraulic transport capacity; to prevent desiccation, vascular plants restrict stomatal conductance, physically choking CO₂ diffusion to rubisco.",
        "coreThesis": "Atmospheric vapor pressure deficit (VPD) exerts dominant stomatal control over canopy conductance: beyond 5.0 hPa, stomatal closure arrests photosynthetic CO₂ uptake regardless of shallow groundwater proximity."
      }
    },
    {
      "id": "slide_20_precompression",
      "stepNumber": 20,
      "layerBadge": "Soil Mechanics & Stress History",
      "title": "20. Soil Mechanical Memory: Precompression Stress (σp = 62 kPa) & Oedometer Testing",
      "viewTarget": "geophysics",
      "spotlightTarget": "#geophysics-card-precompression",
      "wtdDepth": -25,
      "diurnalMode": true,
      "instrumentHighlight": "oedometer_test",
      "figure": "assets/precompression_curves.png",
      "pitch": {
        "title": "Oedometer Consolidation Testing & Precompression Stress (σp = 62.4 kPa)",
        "speech": "In conventional restoration literature, peat is often simplified as a uniform, elastic sponge. However, our 1D oedometer consolidation experiments conducted at the CAU Kiel Soil Physics Laboratory reveal a profoundly altered mechanical memory. Undisturbed 100 cm³ core cylinders extracted from the plow pan horizon (-15 to -25 cm) demonstrate an average precompression stress (σp) of 62.4 kPa, in stark contrast to pristine fen peat which yields at under 18 kPa. Under incremental loading up to 200 kPa, the virgin compression index reaches Cc = 0.85. Decades of heavy agricultural tractors and slurry tankers overconsolidated this boundary horizon, permanently flattening void ratios and locking in mechanical deformation.",
        "bullets": [
          "1D oedometer tests quantify precompression stress (σp = 62.4 kPa) using the Casagrande yield criterion.",
          "Re-compression index (Cr = 0.045) shows rigid, overconsolidated behavior below 60 kPa.",
          "Compression index (Cc = 0.38) indicates severe structural collapse once applied loads exceed σp.",
          "Proves that the plow pan is an anthropogenic mechanical feature, not a natural pedogenic horizon."
        ],
        "defenseQ": "Why does precompression stress matter if the land is no longer being plowed? Because when peat is rewetted, pore water pressure rises, decreasing effective stress. If heavy specialized harvesting machinery (paludiculture equipment) enters the field, exceeding σp will induce immediate structural shearing and irreversible loss of bearing capacity.",
        "coreThesis": "Oedometer testing confirms a precompression stress of σp = 62.4 kPa in the plow pan, revealing an indelible mechanical memory of agricultural traffic that restricts contemporary wetland bearing capacity."
      }
    },
    {
      "id": "slide_21_hydrological_paradox",
      "stepNumber": 21,
      "layerBadge": "Hydro-Physical Disconnection",
      "title": "21. Agricultural Plow Pan & The Hydrological Paradox",
      "viewTarget": "geophysics",
      "spotlightTarget": "#geophysics-card-hydrology",
      "wtdDepth": -20,
      "diurnalMode": true,
      "instrumentHighlight": "diver_piezometer",
      "figure": "assets/24_Soil_Stratigraphy_Wallen_Combined.png",
      "pitch": {
        "title": "The Hydrological Paradox: Surface Waterlogging vs. Subsurface Capillary Severing",
        "speech": "The existence of this overconsolidated plow pan creates what we term the 'Hydrological Paradox' in transitioning fens. Because mechanical compaction crushed functional vertical pore throats, saturated hydraulic conductivity (ks) within the plow pan drops by more than two orders of magnitude. During winter and spring rain events, infiltrating water cannot drain into the deep catotelm, resulting in perched surface water ponding and false inundation signals. Conversely, during high-demand summer heatwaves, this impermeable layer completely severs upward capillary water replenishment. Consequently, surface vegetation experiences acute drought and stomatal desiccation despite the regional water table resting merely 30 to 40 cm below the surface.",
        "bullets": [
          "Compacted plow pan acts as a hydraulic throttle (Ks reduced by more than 2 orders of magnitude).",
          "Wet season paradox: Superficial ponding occurs despite a declining deep groundwater table.",
          "Dry season paradox: Capillary rise is severed, leaving surface roots vulnerable to acute moisture deficits.",
          "Directly destabilizes vegetation communities and disrupts expected wetland succession."
        ],
        "defenseQ": "Can the plow pan be mechanically subsoiled to restore drainage? Deep ripping or mechanical subsoiling in waterlogged organic soils carries severe risks: it destroys residual root cohesion and causes the peat matrix to turn into an unworkable slurry without restoring biogenic macropores.",
        "coreThesis": "The Hydrological Paradox arises because the overconsolidated plow pan forms an impermeable bottleneck: surface water ponding occurs simultaneously with capillary isolation and acute moisture stress in root horizons."
      }
    },
    {
      "id": "slide_22_porosity_bulk_density",
      "stepNumber": 22,
      "layerBadge": "Physical Disconnection",
      "title": "22. Subsurface Physical Disconnection: Porosity & Bulk Density Inversion",
      "viewTarget": "geophysics",
      "spotlightTarget": "#geophysics-card-boxplots-suite",
      "wtdDepth": -15,
      "diurnalMode": true,
      "figure": "assets/WCP_Wallen.png",
      "autoFig": "assets/WCP_Wallen.png",
      "pitch": {
        "title": "Pore Size Distribution Inversion & Air Permeability (Ka)",
        "speech": "Quantitative laboratory analysis of 66 undisturbed 100 cm³ core samples reveals a severe structural inversion of soil physical properties across the Wallener Au profile. Dry bulk density peaks aggressively at 0.38 g/cm³ within the plow pan, compared to just 0.15 g/cm³ in pristine deep catotelm peat. More critically, wide coarse pores (WCP > 50 µm)—the indispensable conduits responsible for gravity drainage and aeration—undergo a catastrophic collapse from 17.0% in surface horizons down to an extreme 5.8% in the plow pan. This pore throat constriction reduces pneumatic permeability (ka) by over 90%, physically encapsulating biogenic gases beneath a dense, hydraulic throttling barrier.",
        "bullets": [
          "Dry bulk density peaks at 0.72 g/cm³ in the plow pan horizon (-15 to -30 cm).",
          "Macroporosity (>50 µm) collapses from 22% in natural peat to under 6% in the plow pan.",
          "Air permeability (Ka at -60 hPa) falls below 0.8 µm², establishing a severe pneumatic bottleneck.",
          "Subsurface biogenic gases (CH₄, CO₂) accumulate beneath the plow pan until hydrostatic ebullition thresholds are reached."
        ],
        "defenseQ": "How does this pore collapse affect methane dynamics? Trapped methane cannot diffuse steadily upward; instead, it accumulates under pressure until sudden barometric drops or water table fluctuations trigger violent, episodic ebullition events.",
        "coreThesis": "Agricultural traffic caused an irreversible collapse of wide coarse pores (>50 µm) from 17.0% down to 5.8% in the plow pan, throttling hydraulic and gas conductivity by more than two orders of magnitude."
      }
    },
    {
      "id": "slide_23_ecohydrological_switch",
      "stepNumber": 23,
      "layerBadge": "Ecohydrological Tipping Point",
      "title": "23. The Ecohydrological Switch: Water Table Dynamics & Redox Inversion",
      "viewTarget": "soil_interface",
      "spotlightTarget": "#biogeo-fig20-card",
      "scopeTarget": "acrotelm",
      "diurnalMode": true,
      "wtdDepth": -10,
      "instrumentHighlight": "diver_piezometer",
      "figure": "assets/10_Soil_Temp_SWC.png",
      "pitch": {
        "title": "The Ecohydrological Switch: Water Table Inversion & Redox Cascade",
        "speech": "When active hydrological management raises the mean water table above -15 cm, the peat ecosystem crosses a decisive biogeochemical tipping point. Molecular oxygen trapped in residual pores is depleted by aerobic heterotrophic metabolism within 48 hours. Lacking oxygen, microbial communities activate alternate terminal electron acceptors following the thermodynamic cascade of Gibbs free energy: nitrate reduction is swiftly followed by ferric iron (Fe³⁺) and sulfate (SO₄²⁻) reduction. Once redox potential (Eh) falls below -200 mV, alternative electron acceptors are exhausted, activating obligate anaerobic methanogenic archaea that convert acetate and carbon dioxide into massive quantities of methane.",
        "bullets": [
          "Water table rise above -15 cm cuts off atmospheric O₂ diffusion into the peat matrix.",
          "Rapid redox cascade: Dissolved oxygen exhausted within 12–24 hours.",
          "Sequential reduction of terminal electron acceptors (NO₃⁻ ➔ Fe³⁺/Mn⁴⁺ ➔ SO₄²⁻ ➔ CO₂).",
          "Redox potential drops below -200 mV, activating obligate anaerobic methanogenic consortia."
        ],
        "defenseQ": "Why does methanogenesis require Eh below -200 mV? Methanogenic archaea possess enzyme systems (methyl-coenzyme M reductase) that are permanently denatured by oxygen and thermodynamically outcompeted by alternative electron acceptors with higher Gibbs free energy yields.",
        "coreThesis": "Raising the water table above -15 cm triggers a catastrophic redox collapse below -200 mV, terminating aerobic oxidation and thermodynamically activating obligate methanogenic archaea."
      }
    },
    {
      "id": "slide_24_biogeochemical_flip",
      "stepNumber": 24,
      "layerBadge": "Biogeochemical Tipping Point",
      "title": "24. The Biogeochemical Flip: Oxic Peat Loss vs. The Acute Methane Spike",
      "viewTarget": "biogeochemistry",
      "biogeoState": "rewetted",
      "spotlightTarget": "#biogeo-fig20-card",
      "wtdDepth": -10,
      "diurnalMode": false,
      "instrumentHighlight": "irga_licor",
      "figure": "assets/16b_CH4_Daily_Budgets.png",
      "pitch": {
        "title": "The Acute Methane Pulse: Suppressing CO₂ but Unleashing CH₄",
        "speech": "With anoxic conditions established and the water table perched near the surface, the system undergoes a complete biogeochemical flip. Aerobic peat oxidation is effectively suppressed, curtailing carbon dioxide emissions by over 60% and achieving the initial conservation objective. However, this benefit is immediately eclipsed by an acute pulse of methane emissions. Because decades of agriculture left behind a topsoil horizon saturated with labile, decomposed organic matter and fertilizer residuals, methanogenic substrate availability is maximal. Daily methane fluxes surge to over 250 mg CH₄ m⁻² d⁻¹ during warm summer periods—an emission intensity up to 50 times greater than undisturbed, nutrient-poor pristine bogs.",
        "bullets": [
          "Heterotrophic CO₂ respiration suppressed by >70% due to anoxia.",
          "Methane flux increases by more than an order of magnitude (from <0.02 to >0.45 µmol m⁻² s⁻¹).",
          "Labile agricultural residues and fresh organic matter serve as ideal substrates for immediate methanogenesis."
        ],
        "defenseQ": "Could this methane pulse have been avoided? Topsoil removal before rewetting can eliminate the labile agricultural layer, though it incurs substantial machinery costs and removes topsoil carbon stocks.",
        "coreThesis": "Inundating labile, decomposed agricultural topsoil unleashes a massive, front-loaded methane pulse that temporarily reverses the climate benefits of halting oxidative carbon dioxide subsidence."
      }
    },
    {
      "id": "slide_25_microbial_succession",
      "stepNumber": 25,
      "layerBadge": "Microbiology & Bioenergetics",
      "title": "25. Microbial Succession: Fermenters, Methanogens & The Oxic Biofilter",
      "viewTarget": "biogeochemistry",
      "biogeoState": "rewetted",
      "spotlightTarget": "#biogeo-card-actors",
      "wtdDepth": -8,
      "diurnalMode": false,
      "instrumentHighlight": "microbes_bacteria",
      "figure": "assets/08b_Respiration_5cm_vs_50cm_v2.png",
      "pitch": {
        "title": "Microbial Trophic Cascades & Methanotrophic Filter Extinction",
        "speech": "Beneath the inundated peat surface, a coupled microbial trophic cascade governs carbon transformation. Heterotrophic fermentative bacteria hydrolyze polysaccharides and root exudates into volatile fatty acids, molecular hydrogen, and acetate. Methanogenic archaea—dominated by acetoclastic Methanosarcinales and hydrogenotrophic Methanobacteriales—convert these substrates into dissolved methane. In natural fens, an aerated acrotelm hosts methanotrophic bacteria that oxidize up to 90% of produced methane into carbon dioxide before it reaches the atmosphere. At Wallener Au, however, shallow water table ponding compresses this oxic biofilter to mere millimeters, allowing raw methane to escape directly into the boundary layer without microbial attenuation.",
        "bullets": [
          "Trophic cascade: Primary fermenters supply acetate and H₂ to Methanosarcina and Methanosaeta archaea.",
          "Loss of the methanotrophic biofilter: Oxic methane oxidation in the upper 10 cm drops from 80% to near 0%.",
          "Explains why surface methane emissions spike disproportionately compared to deep production rates."
        ],
        "defenseQ": "Which methanogenic pathway dominates at Wallener Au? In degraded agricultural peat rich in labile organic matter, acetoclastic methanogenesis dominates initially, transitioning to hydrogenotrophic pathways as acetate is depleted.",
        "coreThesis": "Shallow water tables drown the oxic methanotrophic biofilter, allowing syntrophic fermenters and acetoclastic methanogens to bypass microbial methane consumption entirely."
      }
    },
    {
      "id": "slide_26_aerenchyma_shunt",
      "stepNumber": 26,
      "layerBadge": "Plant-Mediated Transport",
      "title": "26. The Vascular Conduit: Plant Aerenchyma Shunt Mechanism",
      "viewTarget": "soil_interface",
      "spotlightTarget": "#biogeo-card-actors",
      "scopeTarget": "catotelm",
      "diurnalMode": true,
      "wtdDepth": -5,
      "instrumentHighlight": "roots_earthworm",
      "figure": "assets/SiteMap_NDVI_Summer.png",
      "pitch": {
        "title": "Plant Vascular Aerenchyma: The Subsurface Methane Superhighway",
        "speech": "As wetland vegetation colonizes the rewetted fen, pioneer helophytes—most notably Carex rostrata and Phalaris arundinacea—establish an ecophysiological shortcut: the vascular aerenchyma shunt. Wetland plants develop porous internal lacunar spaces (aerenchyma) to transport atmospheric oxygen down to submerged root meristems via passive diffusion and humidity-induced convective flow. However, this biological adaptation operates as a two-way conduit: dissolved biogenic methane in the rhizosphere enters root aerenchyma and travels rapidly upward through the plant culm, venting directly into the boundary layer. By bypassing the remaining surface oxic layer entirely, this vascular bypass short-circuits microbial methanotrophy, accounting for over 70% of peak mid-summer methane fluxes.",
        "bullets": [
          "Cortical aerenchyma in wetland graminoids acts as a direct vascular shunt for subterranean CH₄.",
          "Bypasses both pore tortuosity and residual surface methanotrophic oxidation zones.",
          "Aerenchyma transport accounts for 60% to 85% of total summertime methane emissions from the rewetted fen."
        ],
        "defenseQ": "Does aerenchyma also transport oxygen down into the rhizosphere? Yes, radial oxygen loss (ROL) creates a thin aerobic sheath around roots, but its oxidative capacity is overwhelmed by the massive upward methane flux.",
        "coreThesis": "Vascular aerenchyma tissue in wetland helophytes (*Carex rostrata*) acts as an unobstructed bypass chimney, venting pressurized biogenic methane straight into the atmosphere and circumventing surface oxidation."
      }
    },
    {
      "id": "slide_27_chamber_transect_fig55",
      "stepNumber": 27,
      "layerBadge": "In Situ Static Chamber Network",
      "title": "27. In Situ Closed Chamber Network & Microtopographic Transect: Figure 55 Elevation Gradient",
      "viewTarget": "macro",
      "macroLayerTarget": "chamber_transect",
      "spotlightTarget": "#macro-card-chamber-transect",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/fig55_transect_satellite_crop.png",
      "pitch": {
        "title": "Chamber Collar Transect & Microtopographic Ditch Gradient (Figure 55)",
        "speech": "Figure 55 maps the spatial deployment of the static closed chamber network across Wallener Au. Twelve permanently installed collars span a sharp microtopographic elevation gradient connected by wooden boardwalks to prevent disturbance and compaction artifacts. Collars are stratified into two contrasting functional zones: relict drainage ditch depressions with shallow water tables (-5 cm to standing water) dominated by Carex and Typha, and elevated meadow plateaus (-25 cm to -40 cm WTD) dominated by agricultural grasses. High-frequency chambers equipped with internal circulation fans, digital thermistors, and gas sampling ports enable high-precision sampling across these microtopographic features, proving that relict ditches act as extreme localized ebullition chimneys.",
        "bullets": [
          "Figure 55 Spatial Infrastructure: 12 static chamber collars connected by dedicated boardwalk access across the 12 ha polder.",
          "Microtopographic Stratification: Contrasting relict drainage ditch depressions (WTD -5 cm) against elevated meadow ridges (WTD -35 cm).",
          "Chamber Design & Physics: 0.785 m² base area, 16–42 cm height extensions, internal fan mixing, and rubber septa for headspace sampling.",
          "Zero-Compaction Protocol: Elevated boardwalks prevent artificial ebullition triggered by researcher footsteps."
        ],
        "defenseQ": "Why was a boardwalk infrastructure mandatory for chamber measurements? Peat soils with plow pan destruction are rheologically sensitive; walking directly on the saturated surface induces transient pore pressure waves that trigger artificial methane bubble release.",
        "coreThesis": "High-resolution microtopographic chamber transects reveal that relict agricultural drainage ditches emit over 300% more methane than adjacent peat ridges, identifying extreme spatial hotspot clustering."
      }
    },
    {
      "id": "slide_28_n2o_chamber_suite",
      "stepNumber": 28,
      "layerBadge": "Nitrous Oxide Suite & Chamber Physics",
      "title": "28. Nitrous Oxide (N₂O) Empirical Dynamics: Figures 78–82 & Static Chamber Physics",
      "viewTarget": "eddy_covariance",
      "spotlightTarget": "#biogeo-n2o-suite",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/78_N2O_Chamber_Values.png",
      "pitch": {
        "title": "Nitrous Oxide (N₂O) Chamber Suite & Non-Linear HMR Physics (Figs 78–82)",
        "speech": "Figures 78 through 82 document the empirical nitrous oxide (N₂O) chamber suite across collar transects. N₂O flux rates are calculated from headspace gas chromatography using the non-linear Hutchinson & Mosier (1981) model, which accounts for feedback attenuation as chamber concentration gradients diminish. Crucially, while continuous eddy covariance captures negligible N₂O due to sensor detection limits, chamber collars reveal acute episodic emission spikes (up to 48 µg N m⁻² h⁻¹). These pulses occur during summer water table drawdowns, when oxygen penetrates relict fertilizer nitrogen pools, triggering incomplete denitrification. This proves that rewetting degraded agricultural peat requires careful nitrogen containment to avoid offsetting carbon gains with potent N₂O radiative forcing.",
        "bullets": [
          "Figures 78–82 Suite: Collar-specific time series, spatial distribution, site accumulation, and annual cumulative N₂O mass.",
          "Non-Linear HMR Physics: Hutchinson & Mosier diffusion equation dC/dt compensating for headspace back-diffusion attenuation.",
          "Nitrogen Legacy Spikes: Relict mineral fertilizers unleash sudden denitrification pulses when water table fluctuates around -15 to -20 cm.",
          "High GWP28 Factor: With an N₂O radiative forcing factor of 265–298 times CO₂, even small discrete emissions significantly alter the greenhouse gas balance."
        ],
        "defenseQ": "Why can't the eddy covariance tower measure N₂O fluxes continuously? Open-path optical infrared analyzers lack the sub-ppb precision required to resolve the low atmospheric concentrations (~335 ppb) and tiny high-frequency turbulent fluctuations of N₂O.",
        "coreThesis": "Nitrous oxide fluxes are driven by acute, episodic denitrification bursts following water table fluctuations and fertilization pulses, contributing a potent non-CO₂ warming component (GWP₁₀₀ = 273)."
      }
    },
    {
      "id": "slide_29_chambers_vs_tower",
      "stepNumber": 29,
      "layerBadge": "Cross-Validation & Spatial Disconnect",
      "title": "29. Spatial Disconnect & Cross-Validation: In Situ Closed Chambers vs. Eddy Covariance Tower",
      "viewTarget": "eddy_covariance",
      "spotlightTarget": "#biogeo-crossval-grid",
      "matrixCategory": "chambers",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/20b_Chamber_EC_CH4_CrossValidation.png",
      "pitch": {
        "title": "Cross-Validation of Tower Fluxes with In Situ Transect Chambers (Figures 55, 83, & 83b)",
        "speech": "Cross-validating manual closed chambers against continuous eddy covariance tower data (Figures 55 & 83) uncovered crucial spatial discordance. While nighttime CO₂ respiration matches well (R² = 0.86, Figure 83b), methane fluxes in microtopographic depressions and relict drainage ditches measured by chambers are up to 300% higher than the tower spatial average. The tower footprint mathematically averages these high-intensity point sources over a 200 m fetch, proving that chamber transects (Figure 55) are essential to map localized ebullition chimneys.",
        "bullets": [
          "Nighttime CO₂ respiration shows close agreement between tower and chamber collar averages (R² = 0.86, Figure 83b).",
          "Chamber CH₄ fluxes along relict ditch depressions exceed the tower spatial footprint average by up to 300% due to localized ebullition.",
          "Figure 55 establishes the chamber transect elevation gradient across micro-highs and flooded ditches.",
          "Dilution Effect: Ditch chimneys occupy ~6% of the surface area, becoming mathematically diluted in tower spatial integration."
        ],
        "defenseQ": "Why does the tower record lower methane fluxes than the ditch chambers? Relict drainage ditches occupy only ~6% of the 80% cumulative footprint area; their localized ebullition bursts are diluted across the larger meadow surface in tower spatial integration.",
        "coreThesis": "Continuous Eddy Covariance provides unmatched temporal fidelity for ecosystem-scale NEE, but discrete manual chambers are biophysically mandatory to resolve microtopographic ebullition chimneys (CH₄) and episodic soil denitrification pulses (N₂O)."
      }
    },
    {
      "id": "slide_30b_uncertainties",
      "stepNumber": 29.5,
      "layerBadge": "Statistical Rigor & Error Bounds",
      "title": "30b. Systematic Uncertainties & Monte Carlo Error Propagation (Fig. 23)",
      "viewTarget": "gwp_uncertainties",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/23_GHG_Net_Balance_Error.png",
      "pitch": {
        "title": "Monte Carlo Error Propagation: 95% CI Bounds Confirm the Rewetting Paradox",
        "speech": "To defend the robustness of our Net GHG Balance conclusion against methodological scrutiny, we constructed a fully quantified uncertainty budget using Monte Carlo error propagation across 1,000 bootstrap iterations (Figure 23). The analysis integrates two independent uncertainty sources: the REddyProc gap-filling variance for CO₂ (±12%, driven by the structural uncertainty of the Marginal Distribution Sampling algorithm), and the spatial chamber coefficient of variation for CH₄ (±28%, reflecting the 8-fold spatial heterogeneity between ditch ebullition chimneys and elevated meadow collars). Additionally, machine learning ensemble divergence between the ANN and Random Forest models contributes a further ±18% to the methane budget. Crucially, even at the lower 95% confidence bound, the GWP-20 net warming signal remains robustly positive (P < 0.01), confirming that the Rewetting Paradox is not a statistical artifact but a physically grounded finding. Under the 100-year horizon, the balance falls within the neutral zone, with overlapping confidence intervals straddling zero.",
        "bullets": [
          "CO₂ Uncertainty: ±12% from REddyProc MDS bootstrap (1,000 iterations across 15,014 half-hourly timesteps).",
          "CH₄ Uncertainty: ±28% from spatial chamber CV (8 collars P1–P8, CV = 0.42, ditch vs. ridge contrast).",
          "ML Ensemble Divergence: ±18% between ANN and Random Forest monthly methane predictions.",
          "GWP-20 Verdict: 95% CI = [+8.2, +21.4] t CO₂-eq ha⁻¹ yr⁻¹ · Net Warming P < 0.01.",
          "GWP-100 Verdict: 95% CI = [−2.1, +4.5] t CO₂-eq ha⁻¹ yr⁻¹ · Near-Neutral (straddling zero)."
        ],
        "defenseQ": "How does this uncertainty analysis challenge or validate the 'rewetting is always good' narrative? Even the most conservative lower confidence bound shows statistically significant net warming under GWP-20, meaning that the front-loaded methane penalty during the decisive 2045 decades cannot be dismissed as measurement noise.",
        "coreThesis": "Monte Carlo propagation confirms that the Rewetting Paradox is statistically robust: even at 95% lower confidence bounds, GWP-20 net warming remains significantly above zero (P < 0.01), while GWP-100 balance falls within the neutral uncertainty envelope."
      }
    },
    {
      "id": "slide_30_gwp_synthesis",
      "stepNumber": 30,
      "layerBadge": "Synthesis & Net GHG Balance",
      "title": "30. The Net GHG Balance (100y vs 20y): Unmasking The Carbon Sink Illusion",
      "viewTarget": "gwp_explorer",
      "spotlightTarget": "#ghg-card-100y, #ghg-card-20y",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/21_GHG_Balance_100y.png",
      "pitch": {
        "title": "Definitive Synthesis: Radiative Forcing Across 20-Year and 100-Year Horizons",
        "speech": "In conclusion, we synthesize the net greenhouse gas budget across multi-decadal time horizons. Under the conventional 100-year horizon (GWP100 = 28 for CH₄), the rewetted peatland appears near climate neutral (+1.2 t CO₂-eq ha⁻¹ yr⁻¹), successfully offsetting the drained baseline (+24.5 t CO₂-eq ha⁻¹ yr⁻¹). However, under the 20-year horizon (GWP20 = 84) critical for meeting the 2045 German climate targets, the acute methane pulse flips the ecosystem into a potent net warming source (+14.8 t CO₂-eq ha⁻¹ yr⁻¹). Rewetting is vital for long-term biodiversity and carbon preservation, but unmanaged flooding of degraded agricultural peat creates an acute short-term climate penalty that policy makers must actively manage.",
        "bullets": [
          "Baseline drained state: Massive continuous CO₂ chimney emitting +24.5 t CO₂-eq ha⁻¹ yr⁻¹ (subsidence and oxidation).",
          "100-year horizon (GWP100 = 28): Rewetting achieves near-neutrality (+1.2 t CO₂-eq ha⁻¹ yr⁻¹), validating long-term restoration.",
          "20-year horizon (GWP20 = 84): Acute methane spike causes net radiative forcing of +14.8 t CO₂-eq ha⁻¹ yr⁻¹, challenging near-term 2045 targets.",
          "Final defense takeaway: Phased rewetting with controlled water tables (-10 to -15 cm) and vegetation management is imperative to avoid the Rewetting Paradox."
        ],
        "defenseQ": "What is your final policy recommendation based on these findings? Transition policies should promote paludiculture or phased, gradual rewetting rather than instant, uncontrolled inundation to suppress acute methane bursts while stabilizing peat carbon stocks.",
        "coreThesis": "Pre-integration Eddy Covariance tower data create the illusion of a carbon sink due to strong daytime summer photosynthetic CO₂ uptake. However, when discrete in situ chamber observations (post-gapfilling) are integrated, the true net radiative balance reveals that Wallener Au is an aggressive net warming source dominated by seasonal CH₄ and episodic N₂O pulses."
      }
    },
    {
      "id": "slide_31_conclusions_outlook",
      "stepNumber": 31,
      "layerBadge": "Synthesis & Agronomic Outlook",
      "title": "31. Synthesis, Policy & Agronomic Outlook: Operational Guidelines",
      "viewTarget": "conclusions_outlook",
      "spotlightTarget": "#view-conclusions",
      "wtdDepth": -5,
      "diurnalMode": true,
      "figure": "assets/sprites/logo_2.png",
      "pitch": {
        "title": "Synthesis, Agricultural Policy & Operational Guidelines",
        "speech": "To bridge high-frequency micrometeorology and deep soil mechanics with real-world implementation, our findings yield two imperative operational guidelines. At the macro policy scale, rewetting targets for 2045 must account for front-loaded methane radiative forcing (GWP20 = 84), establishing carbon farming credit mechanisms that finance phased rewetting and paludiculture. At the micro agronomic scale, flooding compacted plow pan peat destroys tractor bearing capacity (σp = 62 kPa), requiring state capital investment for low-ground-pressure machinery and commercial off-takers for wetland biomass. Peatland restoration is a biophysical necessity for climate mitigation, but without coupled micrometeorological monitoring and economic support for farmers, it remains an operational hazard.",
        "bullets": [
          "Macro Policy: Phased water table management (-10 to -15 cm) to suppress acute methane bursts while halting oxidative CO₂ subsidence.",
          "Agronomic Transition: Financial buffering and CAP alignment to bridge yield collapse during the pivot to paludiculture (Typha, Phragmites).",
          "Soil Mechanical Protection: Acknowledging irreversible plow pan compaction to prevent severe structural shearing under heavy machinery.",
          "Final Defense Verdict: Coupled eddy covariance monitoring, soil mechanical diagnostics, and adaptive economic policy are essential to resolve the Rewetting Paradox."
        ],
        "defenseQ": "What are the most urgent next research steps? Long-term multi-year continuous eddy covariance tracking the decadal trajectory of methane attenuation as emergent wetland vegetation stabilizes.",
        "coreThesis": "Achieving carbon-neutral peatland restoration requires pairing hydrological rewetting with phased water table control (-10 to -15 cm), specialized lightweight machinery, and carbon credit mechanisms that bridge the short-term methane warming penalty."
      }
    }
  ]
};

export default MASTER_APPROACH;
