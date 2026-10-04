/**
 * Definitive Master Thesis Defense Presentation (Comprehensive 22-Slide Academic Edition)
 * Faculty of Agricultural and Nutritional Sciences • Christian-Albrechts-Universität zu Kiel
 * Author: Daniel Sebastián Santander Urrutia
 * Supervisors: Prof. Martin Komainda Ph.D., Sebastian Jordan Ph.D.
 */

export const CLASSIC_THESIS_SLIDES = [
  // =========================================================================
  // PART I: CONTEXT, THEORETICAL FRAMEWORK & HYPOTHESES (SLIDES 01 - 04)
  // =========================================================================
  {
    id: "slide_01",
    num: "01",
    section: "Part I • Cover & Framework",
    chapterLink: "03_Thesis_Manuscript/chapters/00_FrontMatter_and_Abstract.md",
    title: "Carbon Fluxes and Greenhouse Gases Exchange in Transitioning Wetlands",
    subtitle: "Quantifying Multi-Gas Balances (CO₂, CH₄, N₂O) Across a Drained-to-Rewetted Peatland Gradient in Northern Germany",
    visual: {
      type: "image",
      src: "assets/sprites/logo_master_1024.png",
      caption: "Wetland Monitor: Coupled multiscale micrometeorology, in situ chamber network & deep soil mechanics."
    },
    cards: [
      {
        title: "Academic Defense Framework",
        color: "blue",
        text: "Master's Thesis in Environmental Management at the Faculty of Agricultural and Nutritional Sciences, Christian-Albrechts-Universität zu Kiel (CAU Kiel)."
      },
      {
        title: "Supervisory Committee",
        color: "gold",
        text: "<strong>First Supervisor:</strong> Prof. Martin Komainda Ph.D. (Grassland & Forage Science)<br><strong>Second Supervisor:</strong> Sebastian Jordan Ph.D. (Greenhouse Gas Monitoring Coordinator, Klimafarm Project)"
      },
      {
        title: "Observational Setting",
        color: "green",
        text: "Klimafarm Peatland Observatory at <strong>Wallener Au</strong>, Schleswig-Holstein, Northern Germany. Continuous 10 Hz Eddy Covariance, 8 dynamic closed gas chambers, and undisturbed soil core geomechanics."
      }
    ],
    pills: [
      { val: "3 Gases", lbl: "CO₂ • CH₄ • N₂O" },
      { val: "10 Hz", lbl: "EC High-Freq." },
      { val: "8 Chambers", lbl: "Spatial Network" }
    ],
    notes: {
      speech: "Distinguished committee members, Prof. Komainda, Dr. Jordan, and colleagues: Welcome to the master's thesis defense on 'Carbon Fluxes and Greenhouse Gases Exchange in Transitioning Peatlands of Northern Germany'. Today we examine the core biophysical paradox of peatland rewetting: how rising groundwater across degraded, compacted peat profiles modulates carbon dioxide sequestration while triggering acute, non-linear surges of potent trace greenhouse gases.",
      defenseQ: "Why is an integrated approach necessary? Measuring CO₂ alone gives a dangerously false impression of climate cooling. We must quantify the short-term radiative forcing of methane pulses to evaluate the real climate outcome."
    },
    notes_es: {
      speech: "Estimados miembros del comité examinador, Prof. Komainda, Dr. Jordan, colegas e invitados: Bienvenidos a la defensa de tesis de maestría titulada 'Flujos de Carbono e Intercambio de Gases de Efecto Invernadero en Turberas en Transición del Norte de Alemania'. Aunque las turberas cubren únicamente el 3% de la superficie terrestre global, custodian más del 30% de todo el carbono orgánico edáfico del planeta. En Schleswig-Holstein, más del 90% fueron drenadas para la agricultura intensiva. Hoy, frente a las directivas de restauración climática que exigen su inundación, investigamos los compromisos biofísicos críticos: ¿cómo se alteran los balances de CO₂, CH₄ y N₂O al ascender el nivel freático sobre perfiles de turba degradada y compactada?",
      defenseQ: "¿Cuál es la novedad fundamental de esta tesis? Unimos la mecánica profunda del suelo y la tensión de precompresión con el diagnóstico de flujos micrometeorológicos continuos, demostrando que el legado físico del manejo agrícola gobierna la magnitud de las emisiones tras la inundación."
    }
  },
  {
    id: "slide_02",
    num: "02",
    section: "Part I • Background & Problem",
    chapterLink: "03_Thesis_Manuscript/chapters/01_Introduction_and_Aims.md",
    title: "The Peatland Dilemma in Northern Germany",
    subtitle: "Agricultural Drainage, Organic Soil Subsidence, and the Urgent Imperative for Ecological Rewetting",
    visual: {
      type: "image",
      src: "assets/figures/SiteMap_SoilCarbon.png",
      caption: "High-resolution spatial distribution of Soil Organic Carbon (SOC) density (kg/m³) at the Wallener Au study site."
    },
    cards: [
      {
        title: "Global and Regional Importance",
        color: "blue",
        text: "Peatlands cover just <strong>3% of global land surface</strong>, yet hold over <strong>30% of all soil organic carbon</strong>—twice the carbon mass of all global forests combined."
      },
      {
        title: "The Historical Drainage Footprint",
        color: "red",
        text: "In Schleswig-Holstein, <strong>>90% of peatlands were systematically drained</strong> for intensive dairy farming and crop cultivation. Aerobic exposure converts carbon sinks into massive point-sources of CO₂ (10–30 t CO₂ ha⁻¹ yr⁻¹)."
      },
      {
        title: "The Rewetting Mandate vs Biogeochemical Reality",
        color: "gold",
        text: "Current European environmental targets mandate raising water tables to halt subsidence. However, submerging accumulated agricultural root biomass creates anoxic conditions that can release massive bursts of methane (CH₄)."
      }
    ],
    pills: [
      { val: ">90%", lbl: "Drained in S-H", color: "red" },
      { val: "30%", lbl: "Global Soil Carbon" },
      { val: "10–30 t", lbl: "CO₂ Loss / ha / yr", color: "red" }
    ],
    notes: {
      speech: "For over a century, peatlands in Northern Germany were drained to expand forage production. The result was massive subsidence and CO₂ release. Now, climate restoration policies push for aggressive rewetting. But rewetted agricultural peatlands do not immediately revert to pristine carbon sinks; they enter a volatile transitional phase governed by residual fertilizer and agricultural soil compaction.",
      defenseQ: "Does rewetting always cool the climate? Over centuries, yes. But over the first 20 years, methane emissions can cause significant front-loaded atmospheric warming if not properly managed."
    },
    notes_es: {
      speech: "Durante más de un siglo, las turberas del norte de Alemania se drenaron para pastoreo y forraje. Esto frenó la acumulación de turba e indujo una severa subsidencia con pérdidas de hasta 30 toneladas de CO₂ por hectárea al año. Las directivas de restauración climática actuales exigen elevar el nivel freático; sin embargo, al inundar praderas agrícolas con biomasa fresca y poros colapsados, se desata una metanogénesis masiva.",
      defenseQ: "¿Por qué rehumedecer no siempre enfría el clima inmediatamente? Porque a corto plazo, el forzamiento radiativo del metano es 84 veces más potente que el del CO₂, compensando o superando la absorción fotosintética durante los primeros años."
    }
  },
  {
    id: "slide_03",
    num: "03",
    section: "Part I • Multispectral Dynamics",
    chapterLink: "03_Thesis_Manuscript/chapters/01_Introduction_and_Aims.md",
    title: "Canopy Phenology & Multispectral Dynamics (Sentinel-2)",
    subtitle: "Contrasting Peak Summer Vegetation Vigor (NDVI) Against Seasonal Intra-Annual Shifts (Delta NDVI)",
    visual: {
      type: "image",
      src: "assets/figures/SiteMap_NDVI_Summer.png",
      caption: "Sentinel-2 Normalized Difference Vegetation Index (NDVI): Peak summer assimilation capacity over pasture."
    },
    cards: [
      {
        title: "Photosynthetic Engine at Peak Capacity",
        color: "green",
        text: "Peak summer Sentinel-2 NDVI maps confirm high photosynthetic vigor (NDVI > 0.75) across the grassland, corresponding to maximum gross primary productivity (GPP)."
      },
      {
        title: "Seasonal Delta NDVI Dynamics",
        color: "blue",
        text: "Contrasting November against January (Delta NDVI) reveals lingering biological activity into late autumn, capturing the delayed vegetative senescence characteristic of oceanic temperate climates."
      },
      {
        title: "Spatial Canopy Heterogeneity",
        color: "gold",
        text: "Ditch boundaries maintain distinct spectral signatures due to moisture stress resilience and specialized hydrophilic vegetation (Carex, Juncus), contrasting with pasture sod."
      }
    ],
    pills: [
      { val: ">0.75", lbl: "Peak Summer NDVI", color: "green" },
      { val: "Sentinel-2", lbl: "10 m Resolution" },
      { val: "Delayed", lbl: "Autumn Senescence" }
    ],
    notes: {
      speech: "Looking up from the soil to the canopy, Sentinel-2 multispectral imagery reveals the dynamic photosynthetic engine. During summer, NDVI exceeds 0.75 across the grassland. Delta NDVI comparisons between November and January demonstrate that biological carbon assimilation persists late into autumn.",
      defenseQ: "How does remote sensing link to flux measurements? NDVI provides spatial validation of vegetative vigor across the tower footprint, verifying that our tower's field of view is ecologically representative of the broader agricultural parcel."
    },
    notes_es: {
      speech: "Al observar el dosel vegetal mediante imágenes satelitales Sentinel-2, confirmamos un vigor fotosintético notable con NDVI superior a 0.75 en pleno verano. El mapa de Delta NDVI demuestra que la asimilación biológica se prolonga hacia finales del otoño debido a la moderación térmica marítima, manteniendo la captura de CO₂ activa más allá del periodo estival.",
      defenseQ: "¿Cómo se relaciona el NDVI con la torre? Valida que la huella de la torre no contiene parches estériles ni anomalías vegetativas, garantizando la representatividad espacial de los flujos de CO₂ medidos."
    }
  },
  {
    id: "slide_04",
    num: "04",
    section: "Part I • Hypotheses & Aims",
    chapterLink: "03_Thesis_Manuscript/chapters/01_Introduction_and_Aims.md",
    title: "Research Hypotheses & Specific Objectives",
    subtitle: "Resolving Spatial Disconnects, Mechanical Soil Compaction, and Multi-Gas Warming Potentials",
    visual: {
      type: "image",
      src: "assets/figures/SiteMap_Topography.png",
      caption: "Digital Elevation Model (DEM) showing the natural cold-air drainage depression basin at Wallener Au."
    },
    cards: [
      {
        title: "Hypothesis 1: Spatial Disconnect",
        color: "blue",
        text: "Continuous tower Eddy Covariance captures the integrated ecosystem carbon budget, but overlooks localized ditch methane hotspots that dominate landscape-scale radiative forcing."
      },
      {
        title: "Hypothesis 2: Geomechanical Compaction Legacy",
        color: "red",
        text: "Historical drainage and heavy machinery trafficking collapse coarse aeration macropores (>50 µm) by >80%, severely impairing vertical gas transport and trapping anoxic porewater."
      },
      {
        title: "Hypothesis 3: The Time-Horizon Shift (GWP₂₀ vs GWP₁₀₀)",
        color: "gold",
        text: "The climatic sign of peatland rewetting reverses across multi-decadal timeframes: an apparent multi-gas sink at 100-year GWP becomes an acute warming source under a 20-year GWP horizon."
      }
    ],
    pills: [
      { val: "H1", lbl: "EC vs Chambers" },
      { val: "H2", lbl: "85% Pore Loss" },
      { val: "H3", lbl: "20y vs 100y GWP" }
    ],
    notes: {
      speech: "To address these uncertainties, we structured three core hypotheses. First, that neither tower alone nor chambers alone can accurately quantify greenhouse gas exchange. Second, that undisturbed soil mechanics and oedometer precompression stress dictate gas transport. Third, that the political choice between 20-year and 100-year GWP metrics completely alters the scientific verdict on peatland restoration.",
      defenseQ: "Why study soil mechanics in a greenhouse gas thesis? Because gas diffusivity depends directly on wide coarse macropores. Compaction by agricultural traffic throttles post-wetting gas transport, directly driving methanogenesis."
    },
    notes_es: {
      speech: "Estructuramos tres hipótesis centrales: H1 (Desconexión Espacial: la torre promedia a escala de paisaje pero diluye los hotspots de metano en zanjas); H2 (Memoria Mecánica: el piso de arado y el tránsito de tractores destruyeron los macroporos mayores a 50 µm en más de un 80%, bloqueando la aireación); y H3 (Inversión Climática: la elección del horizonte temporal GWP20 frente a GWP100 cambia por completo el signo del balance neto).",
      defenseQ: "¿Por qué incluir geomecánica en flujos de gases? Porque la tasa de difusión gaseosa depende críticamente de los macroporos anchos. Al compactarse el suelo, el agua queda estancada en superficie, acelerando la anoxia estricta."
    }
  },

  // =========================================================================
  // PART II: OBSERVATIONAL RIG, INSTRUMENTATION & PIPELINE (SLIDES 05 - 08)
  // =========================================================================
  {
    id: "slide_05",
    num: "05",
    section: "Part II • Observational Rig",
    chapterLink: "03_Thesis_Manuscript/chapters/02_Methods.md",
    title: "Multi-Scale Observational Rig & Instrumentation",
    subtitle: "High-Frequency Micrometeorology (10 Hz) Coupled with a Stratified In Situ Chamber Network",
    visual: {
      type: "image",
      src: "assets/sprites/gas_chamber.png",
      caption: "Closed dynamic chamber setup (base ⌀ 36.7 cm) coupled with the 10 Hz Eddy Covariance tower."
    },
    cards: [
      {
        title: "Micrometeorological Tower Rig (2.5 m)",
        color: "blue",
        text: "Equipped with a 3D ultrasonic anemometer (CSAT3) measuring wind vectors at 10 Hz and an open-path infrared gas analyzer (LI-7500DS) for high-frequency CO₂ and H₂O turbulent fluctuations."
      },
      {
        title: "Spatial Gas Chamber Network (8 Locations)",
        color: "green",
        text: "<strong>Chambers 1–2 (East Trench):</strong> Boundary ditch with minimal organic sedimentation.<br><strong>Chambers 3–7 (Central Plateau):</strong> Representative productive grassland under fluctuating water tables.<br><strong>Chamber 8 (West Trench):</strong> Deep organic trench characterized by stagnant ponding and high ebullition."
      },
      {
        title: "Ancillary Environmental Telemetry",
        color: "purple",
        text: "Continuous profiling of volumetric soil water content (SWC) and soil temperature (TS) at 5, 20, and 50 cm depths; net radiometer (CNR4), and soil heat flux plates."
      }
    ],
    pills: [
      { val: "2.5 m", lbl: "Tower Height" },
      { val: "36.7 cm", lbl: "Chamber Base ⌀" },
      { val: "3 Depths", lbl: "5, 20, 50 cm Profiling" }
    ],
    notes: {
      speech: "Our observational architecture bridges spatial scales. The Eddy Covariance tower provides continuous, uninterrupted half-hourly fluxes over tens of thousands of square meters. Concurrently, 8 closed dynamic chambers capture fine-scale spatial variability across the ditch-to-plateau gradient.",
      defenseQ: "Why did you measure at 2.5 m height? 2.5 meters balances a sufficient footprint fetch across the experimental paddock while minimizing boundary-layer contamination from the distant perimeter hedgerows."
    },
    notes_es: {
      speech: "Nuestra arquitectura de monitoreo acopla dos escalas: la torre de Eddy Covariance a 2.5 m de altura proporciona mediciones continuas a 10 Hz promediadas sobre más de 30.000 m². En paralelo, instalamos una red de 8 cámaras cilíndricas dinámicas (36.7 cm de base) estratificadas entre las zanjas y la meseta central para capturar la variabilidad de metano y óxido nitroso.",
      defenseQ: "¿Por qué a 2.5 metros? Porque a esa altura el fetch cubre la pradera objetivo en un 90% sin sufrir interferencias de rugosidad por las hileras de árboles perimetrales."
    }
  },
  {
    id: "slide_06",
    num: "06",
    section: "Part II • Chamber Standardization",
    chapterLink: "03_Thesis_Manuscript/chapters/02_Methods.md",
    title: "Chamber Geometry & Physical Volume Corrections",
    subtitle: "Standardizing the 36.7 cm Base Ring, Conical Conjunction Ring, and Height Invariance Validation",
    visual: {
      type: "image",
      src: "assets/sprites/gas_chamber.png",
      caption: "Chamber geometry: Base collar (⌀ 36.7 cm), conjunction taper ring, and extension volume standardization."
    },
    cards: [
      {
        title: "Geometric Chamber Dimensions",
        color: "blue",
        text: "Base ring diameter is fixed at <strong>36.7 cm</strong> (effective area: 0.1058 m²). A specialized 5 cm conjunction taper ring transitions smoothly to extension attachments."
      },
      {
        title: "Height Standardization Verification (16 vs 42 cm)",
        color: "green",
        text: "Empirical field trials comparing low chambers (16 cm) vs tall extensions (42 cm) showed <strong>no statistically significant difference in calculated flux rates (p > 0.05)</strong>, verifying volume correction accuracy."
      },
      {
        title: "Slope Calculation & Flux Formulation",
        color: "gold",
        text: "Fluxes calculated using linear regression and Hutchinson-Mosier curvature analysis:<br><code>F = (dC/dt) × (V/A) × (P / (R × T))</code><br>Standardized to nmol m⁻² s⁻¹ and converted to annual budget equivalents."
      }
    ],
    pills: [
      { val: "0.106 m²", lbl: "Collar Area" },
      { val: "p > 0.05", lbl: "Height Invariance", color: "green" },
      { val: "Linear/HM", lbl: "Slope Algorithm" }
    ],
    notes: {
      speech: "Rigorous chamber flux quantification requires exact geometric standardization. Our collars have a diameter of 36.7 cm. We tested whether extension height (16 cm vs 42 cm) biased flux estimates due to headspace mixing differences; statistical tests confirmed no significant bias (p > 0.05), validating our volume normalization algorithm.",
      defenseQ: "How do you select between linear and non-linear slope fitting? We evaluate the R² and curvature parameter. For short deployment times (5 to 10 minutes), linear fits prevent overestimation while non-linear models are applied if chamber concentration saturation occurs."
    },
    notes_es: {
      speech: "La cuantificación rigurosa en cámaras exige una estandarización geométrica impecable. Comparamos empíricamente collares bajos de 16 cm con extensiones de 42 cm; las pruebas estadísticas demostraron que no hubo sesgo volumétrico significativo (p > 0.05), lo que valida que el algoritmo de corrección volumétrica y temperatura es robusto.",
      defenseQ: "¿Cómo se calculan los flujos? Se calcula la pendiente de acumulación de gas (dC/dt) multiplicada por el volumen efectivo sobre el área y corregida por la ley de gases ideales utilizando la presión atmosférica y temperatura de la cámara."
    }
  },
  {
    id: "slide_07",
    num: "07",
    section: "Part II • QC & Data Filtering",
    chapterLink: "03_Thesis_Manuscript/chapters/02_Methods.md",
    title: "High-Frequency Pipeline & Quality Flag Filtering",
    subtitle: "EddyPro® Despiking, Mauder & Foken Flags, and LI-7500 (CO₂) vs LI-7700 (CH₄) Data Retention",
    visual: {
      type: "image",
      src: "assets/figures/12_QC_Flag_Comparison.png",
      caption: "Data retention yield: Proportion of high-quality (Flag 0), acceptable (Flag 1), and discarded (Flag 2) 30-min flux blocks."
    },
    cards: [
      {
        title: "Mauder & Foken (2004) Flagging Scheme",
        color: "blue",
        text: "Fluxes classified based on steady-state tests and integral turbulence characteristics: <strong>Flag 0 (Fundamental Research)</strong>, <strong>Flag 1 (General Analysis)</strong>, and <strong>Flag 2 (Discarded)</strong>."
      },
      {
        title: "CO₂ vs CH₄ Instrumental Sensitivity",
        color: "red",
        text: "The LI-7700 open-path methane analyzer suffers higher optical data loss during rainfall and nocturnal dew condensation compared to the robust LI-7500 CO₂ sensor, highlighting unique wetland monitoring challenges."
      },
      {
        title: "Friction Velocity (u*) Nighttime Filtering",
        color: "gold",
        text: "Nocturnal periods with insufficient turbulence were excluded using site-specific u* thresholds. Cold-air drainage in the depression basin causes atmospheric decoupling, necessitating strict u* filtering."
      }
    ],
    pills: [
      { val: "Flag 0–1", lbl: "Retained Data", color: "green" },
      { val: "Flag 2", lbl: "Discarded (Calm/Rain)", color: "red" },
      { val: "u* Filter", lbl: "Decoupling Filter" }
    ],
    notes: {
      speech: "Eddy Covariance data quality control is uncompromising. Following Mauder and Foken criteria, only flags 0 and 1 were retained. The open-path methane sensor is inherently more sensitive to rain and dew than the CO₂ analyzer, explaining the larger gap-filling requirement for methane.",
      defenseQ: "Why is u* filtering so crucial at this site? Because Wallener Au sits in a topographical hollow. On clear nights, cold air drains into the field, creating a laminar inversion layer where turbulent eddies cease to transport fluxes to the 2.5 m sensor."
    },
    notes_es: {
      speech: "El control de calidad micrometeorológico aplicó el esquema de Mauder y Foken. El sensor de metano LI-7700 presentó mayor descarte de datos brutos por lluvia y condensación en espejos respecto al LI-7500 de CO₂. Además, el filtrado por u* fue imperativo debido a que la cuenca topográfica genera estancamiento de aire frío nocturno que desacopla la turbulencia superficial.",
      defenseQ: "¿Qué ocurre si no se aplica u*? Se subestima masivamente la respiración nocturna del ecosistema, generando un falso sesgo hacia un sumidero de carbono inexistente."
    }
  },
  {
    id: "slide_08",
    num: "08",
    section: "Part II • Energy Balance & Footprint",
    chapterLink: "03_Thesis_Manuscript/chapters/02_Methods.md",
    title: "Energy Balance Closure & Spatial Footprint Validation",
    subtitle: "R² = 0.94 Energy Balance Closure Confirms Turbulent Flux Physics and Pure Pasture Provenance",
    visual: {
      type: "image",
      src: "assets/figures/13_Energy_Balance_Closure.png",
      caption: "Energy balance closure regression: Turbulent fluxes (LE + H) vs Available energy (Rn - G) achieving R² = 0.94."
    },
    cards: [
      {
        title: "Energy Balance Closure Validation (R² = 0.94)",
        color: "green",
        text: "Regressing turbulent energy fluxes (H + LE) against available surface energy (Rn - G) yielded an <strong>exceptional correlation of R² = 0.94</strong>, confirming that our instruments captured the full micrometeorological energy exchange."
      },
      {
        title: "Spatial Footprint Peak (100–300 m)",
        color: "blue",
        text: "Kormann & Meixner analytical footprint modeling confirmed <strong>peak flux contributions originate within 100 to 300 meters</strong>, ensuring 100% pasture provenance without hedgerow contamination."
      },
      {
        title: "Wind Directional Distribution",
        color: "gold",
        text: "Prevailing south-westerly maritime winds provide unobstructed fetch across the primary pasture transect, ensuring pure grassland boundary layer development."
      }
    ],
    pills: [
      { val: "R² = 0.94", lbl: "Energy Balance", color: "green" },
      { val: "100–300 m", lbl: "Peak Fetch" },
      { val: "Pure Pasture", lbl: "Zero Edge Noise" }
    ],
    notes: {
      speech: "Slide 8 provides our physical proof of measurement validity. The energy balance closure achieved an R² of 0.94, which is among the top tier of international FLUXNET sites. Combined with footprint modeling placing the peak fetch between 100 and 300 meters, we have total confidence that the observed fluxes reflect the target pasture ecosystem.",
      defenseQ: "Why does energy balance closure matter for carbon fluxes? Because unclosed energy balances indicate uncaptured turbulent eddies or advection. An R² of 0.94 proves that our sonic anemometer captured the full turbulent spectral cascade."
    },
    notes_es: {
      speech: "Esta diapositiva entrega la validación física fundamental: el cierre del balance de energía alcanzó un R² = 0.94, demostrando que nuestros instrumentos capturaron con fidelidad el intercambio turbulento. La modelación de huella analítica confirmó que el 90% del flujo medido proviene de 100 a 300 metros dentro del potrero experimental.",
      defenseQ: "¿Por qué importa el balance de energía en una tesis de carbono? Porque un balance cerrado demuestra que no existen corrientes de advección no medidas ni pérdidas espectrales que falseen los cálculos de CO₂ o metano."
    }
  },

  // =========================================================================
  // PART III: SOIL STRATIGRAPHY, THERMODYNAMICS & GEOMECHANICS (SLIDES 09 - 12)
  // =========================================================================
  {
    id: "slide_09",
    num: "09",
    section: "Part III • Soil Stratigraphy",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Peat Stratigraphy & Historical Profile Evolution",
    subtitle: "Deep 4.5 m Historical Peat Basin Transitioning to Glaciofluvial Mineral Sand Substratum",
    visual: {
      type: "image",
      src: "assets/figures/Soil_Atmosphere_Interface_WallenerAu.png",
      caption: "Stratigraphic cross-section: Fibric root zone (0–10 cm), hemic degraded peat, and deep sapric horizon."
    },
    cards: [
      {
        title: "Deep Peat Accumulation Basin (Up to 4.5 m)",
        color: "blue",
        text: "Wallener Au occupies a post-glacial depression filled with up to <strong>4.5 meters of accumulated organic peat</strong>, representing millennia of continuous wetland carbon sequestration."
      },
      {
        title: "Active Sensor Horizon (Top 1.2 m)",
        color: "green",
        text: "The upper 1.2 m constitutes the active biogeochemical zone. Soil moisture and temperature probes at 5, 20, and 50 cm capture dynamics occurring entirely within organic peat horizons."
      },
      {
        title: "Degradation Gradient (Fibric to Sapric)",
        color: "gold",
        text: "Surface layers exhibit intense agricultural alteration (von Post humification H4–H6), transitioning into highly humified, amorphous sapric peat at depth."
      }
    ],
    pills: [
      { val: "4.5 m", lbl: "Max Peat Depth" },
      { val: "0–1.2 m", lbl: "Active Sensor Zone" },
      { val: "H4–H6", lbl: "Humification Stage" }
    ],
    notes: {
      speech: "Looking beneath our feet, the geological core reveals up to 4.5 meters of peat accumulated since the last glacial retreat. Our sensor network focuses on the upper 1.2 meters, where agricultural drainage has altered the natural fibric peat into a dense, degraded sapric material.",
      defenseQ: "Does peat depth influence surface fluxes? Yes. Deep peat acts as a massive carbon reservoir and thermal buffer, sustaining anaerobic decomposition even during prolonged surface droughts."
    },
    notes_es: {
      speech: "El perfil estratigráfico revela un depósito de turba de hasta 4.5 metros de espesor en una cubeta postglaciar. Nuestro sistema de monitoreo se concentra en los 1.2 metros superiores, donde el drenaje agrícola histórico degradó la turba fíbrica original hacia un estado sáprico amorfo y denso.",
      defenseQ: "¿Influye la profundidad de la turba en los gases superficiales? Sí, porque representa un sustrato orgánico inagotable que alimenta la metanogénesis en profundidad independientemente de lo que ocurra en el dosel."
    }
  },
  {
    id: "slide_10",
    num: "10",
    section: "Part III • Soil Geomechanics",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    interactiveType: "soil_layers",
    title: "Soil Geomechanics: Precompression Stress & Pore Collapse",
    subtitle: "Oedometer Compression Curves Demonstrate an 85% Destruction of Wide Coarse Macropores (>50 µm)",
    visual: {
      type: "image",
      src: "assets/figures/Precompression_Combined.png",
      caption: "Empirical precompression stress curves (σₚ) across 0–5 cm, 25 cm, and 25–30 cm peat horizons (Oedometer tests, CAU Kiel)."
    },
    cards: [
      {
        title: "Bulk Density Inversion Gradient",
        color: "red",
        text: "Topsoil (0–5 cm) shows severe compaction: <strong>0.404 ± 0.060 g/cm³</strong> (Total Pore Volume = 75.2%). In deep uncompacted peat (25–30 cm), bulk density plunges to <strong>0.152 ± 0.009 g/cm³</strong> (TPV = 87.4%)."
      },
      {
        title: "85% Macropore Destruction (>50 µm)",
        color: "gold",
        text: "Oedometer precompression tests on undisturbed cores showed that wheel loads exceeded soil bearing capacity, <strong>crushing up to 85% of coarse aeration macropores (>50 µm)</strong>."
      },
      {
        title: "Conductivity Drop & Perched Anoxia",
        color: "blue",
        text: "Pre- vs post-compression air conductivity dropped from 6.35×10⁻³ to 4.08×10⁻⁴ m/s at 5 cm depth. This physical barrier blocks gas diffusion and sustains stagnant water tables."
      }
    ],
    pills: [
      { val: "0.40 g/cm³", lbl: "Topsoil BD", color: "red" },
      { val: "0.15 g/cm³", lbl: "Deep Peat BD" },
      { val: "85% Loss", lbl: "Macropores (>50 µm)", color: "red" }
    ],
    notes: {
      speech: "Slide 10 delivers our geomechanical breakthrough. Undisturbed core oedometer tests demonstrate that agricultural machinery loads crushed 85% of wide coarse macropores. When water rises, gas cannot diffuse vertically, creating perched anoxic boundary layers that fuel methanogenesis.",
      defenseQ: "What is precompression stress (σₚ)? It represents the maximum effective stress the soil structure has experienced in its geological and management history. Loads exceeding σₚ cause irreversible plastic pore collapse."
    },
    notes_es: {
      speech: "Esta diapositiva presenta el hallazgo geomecánico central: el paso repetido de tractores sobrepasó la tensión de preconsolidación, destruyendo el 85% de los macroporos mayores a 50 µm. La densidad aparente en superficie es de 0.404 g/cm³, mientras que a 30 cm de profundidad cae a 0.152 g/cm³. Este piso compactado estrangula la difusión de aire e impide la infiltración normal.",
      defenseQ: "¿Qué consecuencias tiene esto al inundar? Provoca que el agua se estanque en la superficie sin circular, creando anoxia superficial inmediata sobre la biomasa forrajera y disparando el metano."
    }
  },
  {
    id: "slide_11",
    num: "11",
    section: "Part III • Hydrology & Water Levels",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Groundwater Dynamics & Capillary Disconnection",
    subtitle: "Summer Groundwater Nadir Below -40 cm Decouples Surface Peat from Capillary Saturation",
    visual: {
      type: "image",
      src: "assets/figures/11_Water_Level.png",
      caption: "Continuous groundwater hydrograph and volumetric soil water content (SWC) across the experimental year."
    },
    cards: [
      {
        title: "Summer Groundwater Drawdown (-40 cm)",
        color: "blue",
        text: "During summer drought, groundwater fell below <strong>-40 cm</strong>, aerating 40 cm of organic peat and decoupling surface grass roots from capillary fringe moisture."
      },
      {
        title: "Autumn Re-Wetting Surge",
        color: "green",
        text: "Autumn precipitation rapidly elevated the water table within <strong>5 cm of the ground surface</strong>, submerging aerated root debris and initiating the anaerobic transition."
      },
      {
        title: "Soil Moisture Profiling (5, 20, 50 cm)",
        color: "gold",
        text: "Surface SWC dropped below 20% in summer while 50 cm depth remained above 70%, establishing strong vertical ecohydrological decoupling."
      }
    ],
    pills: [
      { val: "-40 cm", lbl: "Summer Nadir" },
      { val: "5 cm", lbl: "Autumn Peak WTD", color: "green" },
      { val: "3 Depths", lbl: "Continuous SWC" }
    ],
    notes: {
      speech: "The groundwater hydrograph illustrates extreme ecohydrological transitions. Summer evapotranspiration drew the water table down past -40 cm, exposing aerated peat. In autumn, rapid recharge inundated this aerated horizon, providing the exact redox trigger needed for methanogenesis and denitrification.",
      defenseQ: "How does water table depth relate to GHG emission thresholds? Literature and our empirical data show that when the water table is within 10 cm of the surface, CH₄ emissions increase exponentially, whereas water tables below -20 cm suppress CH₄ via methanotrophy."
    },
    notes_es: {
      speech: "El hidrograma de nivel freático muestra dos fases contrastantes: un estiaje estival donde el agua cayó a -40 cm desecando la turba superficial, y una recarga otoñal abrupta que situó el agua a 5 cm del suelo. Esta oscilación estacional activa y desactiva las vías metabólicas microbianas de forma no lineal.",
      defenseQ: "¿Cuál es el umbral freático crítico? Cuando el freático se mantiene entre 0 y -10 cm, el metano se dispara; si desciende de -20 cm, la capa aeróbica oxida la mayor parte del metano antes de que escape a la atmósfera."
    }
  },
  {
    id: "slide_12",
    num: "12",
    section: "Part III • Soil Thermodynamics",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Soil Thermodynamics & Heat Propagation Across Depths",
    subtitle: "Thermal Delay Between 5 cm and 50 cm Explains Sustained Deep Heterotrophic Respiration",
    visual: {
      type: "image",
      src: "assets/figures/18_Depth_Profile_TS.png",
      caption: "Soil temperature depth profiles: Surface diurnal oscillation vs deep-soil thermal inertia and phase shift."
    },
    cards: [
      {
        title: "Thermal Delay & Damping Across Depths",
        color: "blue",
        text: "While surface soil (5 cm) swings by >15°C diurnally, deep peat (50 cm) exhibits extreme thermal damping and a <strong>multi-week phase lag</strong>."
      },
      {
        title: "Microbial Thermal Insulation",
        color: "green",
        text: "During late summer and autumn surface cooling, deep peat remains warm (14–16°C), allowing deep-soil microbial methanogenesis and heterotrophic respiration to continue uninhibited."
      },
      {
        title: "Soil Heat Flux (SHF) Micro-Variance",
        color: "gold",
        text: "Soil heat plates recorded significant spatial divergence across the paddock, governed by micro-topography and local compaction variations."
      }
    ],
    pills: [
      { val: "15°C", lbl: "Surface Diurnal Swing" },
      { val: "14–16°C", lbl: "Deep Peat Warmth", color: "gold" },
      { val: "Phase Lag", lbl: "Thermal Buffer" }
    ],
    notes: {
      speech: "Soil thermodynamics explain why peat respiration cannot be modeled using surface air temperatures. Peat has high heat capacity and low thermal conductivity, creating a substantial phase lag. Deep soil remains warm well into autumn, driving biological emissions long after the surface has cooled.",
      defenseQ: "Why does thermal lag complicate carbon accounting? Because surface-based respiration models predict that respiration shuts down when surface temperatures drop, whereas deep in situ sensors reveal continued CO₂ and CH₄ production."
    },
    notes_es: {
      speech: "La termodinámica del suelo demuestra que la turba actúa como un potente aislante térmico. Mientras la superficie a 5 cm sufre oscilaciones diurnas de más de 15°C, a 50 cm de profundidad la temperatura se mantiene amortiguada en 14–16°C hasta bien entrado el otoño, permitiendo que la metanogénesis profunda continúe activa.",
      defenseQ: "¿Por qué esto invalida los modelos simples? Porque un modelo que use temperatura del aire asumirá que la respiración se detiene en otoño, cuando en realidad la turba profunda sigue 'exhalando' carbono activamente."
    }
  },

  // =========================================================================
  // PART IV: CARBON DIOXIDE EXCHANGE & METHODOLOGICAL TRAPS (SLIDES 13 - 16)
  // =========================================================================
  {
    id: "slide_13",
    num: "13",
    section: "Part IV • Photosynthesis & GPP",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Canopy Photosynthetic Assimilation (Michaelis-Menten)",
    subtitle: "Light-Response Curves Isolate Ecosystem Assimilation Capacity Under Varying Seasonal Radiation",
    visual: {
      type: "image",
      src: "assets/figures/02_GPP_MM_Fits.png",
      caption: "Michaelis-Menten light saturation curves: Daytime NEE assimilation plotted against global solar radiation (Rg)."
    },
    cards: [
      {
        title: "Michaelis-Menten Light Saturation",
        color: "green",
        text: "Daytime NEE curves fitted to Michaelis-Menten kinetics isolate maximum assimilation capacity (GPPₘₐₓ) and initial quantum yield (α) across phenological growth stages."
      },
      {
        title: "Growing Season Assimilation Peaks",
        color: "blue",
        text: "At light saturation (Rg > 600 W/m²), the canopy achieved gross carbon uptake of <strong>-18 to -22 µmol CO₂ m⁻² s⁻¹</strong> during peak summer pasture development."
      },
      {
        title: "Light Limitations & Seasonal Shifts",
        color: "gold",
        text: "Canopy assimilation efficiency declined during mid-summer atmospheric drought, revealing moisture-induced stomatal conductance limitations."
      }
    ],
    pills: [
      { val: "-22 µmol", lbl: "GPPₘₐₓ Capacity", color: "green" },
      { val: "Rg > 600", lbl: "Light Saturation" },
      { val: "α Yield", lbl: "Quantum Efficiency" }
    ],
    notes: {
      speech: "Daytime carbon exchange was parameterized using Michaelis-Menten light-response curves. Under peak sunlight, the grassland achieved GPP rates exceeding -20 µmol m⁻² s⁻¹. This proves the photosynthetic engine is vigorous, but heavily constrained by atmospheric dryness.",
      defenseQ: "How do you separate GPP from NEE? By parameterizing daytime light-response curves and subtracting modeled ecosystem respiration (Reco) derived from nocturnal temperature relationships."
    },
    notes_es: {
      speech: "La asimilación fotosintética se modeló mediante curvas de Michaelis-Menten en función de la radiación global. A saturación lumínica (Rg > 600 W/m²), la pradera fijó hasta -22 µmol CO₂ m⁻² s⁻¹. Sin embargo, en periodos de sequía atmosférica, la conductancia estomática limitó fuertemente esta captación.",
      defenseQ: "¿Cómo se aísla la GPP? Ajustando la respiración nocturna del ecosistema (Reco) y proyectándola al día para deducir la fotosíntesis bruta a partir del flujo neto medido (NEE)."
    }
  },
  {
    id: "slide_14",
    num: "14",
    section: "Part IV • Ecosystem Respiration",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Ecosystem Respiration (Reco) Temperature Fits",
    subtitle: "Nocturnal Lloyd-Taylor Fits Demonstrate Exponential Activation Energy Across Peat Horizons",
    visual: {
      type: "image",
      src: "assets/figures/01_Reco_LT_Fits.png",
      caption: "Lloyd-Taylor temperature response fits: Nocturnal carbon emissions as a function of soil temperature."
    },
    cards: [
      {
        title: "Lloyd-Taylor Exponential Response",
        color: "red",
        text: "Ecosystem respiration (Reco) isolated from nocturnal NEE was parameterized using Lloyd-Taylor equations, capturing the sensitivity of microbial and autotrophic respiration to temperature."
      },
      {
        title: "Activation Energy & Q₁₀ Dynamics",
        color: "gold",
        text: "Fitted activation energies revealed high temperature sensitivity (Q₁₀ > 2.2), with respiration rates doubling during warm summer nights when aeration was high."
      },
      {
        title: "Autotrophic vs Heterotrophic Components",
        color: "blue",
        text: "Root respiration represented over 60% of total respiration during active vegetative growth, while microbial peat oxidation dominated during hot, dry summer drawdowns."
      }
    ],
    pills: [
      { val: "Q₁₀ > 2.2", lbl: "Temp. Sensitivity", color: "gold" },
      { val: "Lloyd-Taylor", lbl: "Fitting Model" },
      { val: "60% Root", lbl: "Peak Respiration" }
    ],
    notes: {
      speech: "Nocturnal fluxes allow us to isolate ecosystem respiration without photosynthetic interference. Using the Lloyd-Taylor equation, we found a high temperature sensitivity with Q₁₀ exceeding 2.2, demonstrating that warming temperatures exponentially accelerate carbon loss from drained peat.",
      defenseQ: "Why Lloyd-Taylor instead of simple Arrhenius? Lloyd-Taylor introduces a baseline lower temperature parameter (T₀) that accounts for biological freezing and enzymatic slowdown at low temperatures, providing superior statistical fits."
    },
    notes_es: {
      speech: "El flujo nocturno mide la respiración pura del ecosistema sin interferencia fotosintética. Al ajustar la función de Lloyd-Taylor obtuvimos un Q₁₀ superior a 2.2, confirmando que el calentamiento estival acelera exponencialmente la liberación microbiana de CO₂ sobre la turba drenada.",
      defenseQ: "¿Por qué Lloyd-Taylor y no una simple recta o Arrhenius? Porque Lloyd-Taylor incorpora un parámetro T₀ que refleja con realismo el cese biológico a bajas temperaturas, reduciendo drásticamente los residuales del ajuste."
    }
  },
  {
    id: "slide_15",
    num: "15",
    section: "Part IV • Ecohydrological Stress",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Ecohydrological Drought Stress & Bowen Ratio Spikes",
    subtitle: "VPD Elevation and Soil Moisture Depletion Force Stomatal Closure and Suppress Latent Cooling",
    visual: {
      type: "image",
      src: "assets/figures/16_Bowen_Ratio.png",
      caption: "Daily Bowen Ratio (β = H/LE) trajectory: Spikes above 1.0 indicate stomatal shutdown and drought stress."
    },
    cards: [
      {
        title: "Bowen Ratio Dynamics (β = H / LE)",
        color: "blue",
        text: "Under well-watered conditions, latent heat flux dominates (β < 0.5). During summer dry spells, <strong>the Bowen ratio spiked above 1.2</strong>, signaling a collapse in plant transpiration."
      },
      {
        title: "Vapor Pressure Deficit (VPD) Thresholds",
        color: "red",
        text: "When atmospheric VPD exceeded 1.5 kPa, photosynthesis collapsed by >40% regardless of incoming solar radiation due to protective stomatal closure."
      },
      {
        title: "Ecosystem Water Use Efficiency (eWUE)",
        color: "gold",
        text: "Ecosystem WUE declined sharply during the drought nadir, demonstrating severe physiological stress in pasture grasses unadapted to dry root zones."
      }
    ],
    pills: [
      { val: "β > 1.2", lbl: "Drought Spikes", color: "red" },
      { val: "VPD > 1.5", lbl: "kPa Closure Limit" },
      { val: "-40%", lbl: "GPP Collapse", color: "red" }
    ],
    notes: {
      speech: "Slide 15 captures the physical stress on the vegetation. The Bowen ratio, which is sensible heat divided by latent heat, spiked above 1.2 during mid-summer. This indicates that plants closed their stomata to prevent dehydration, shutting off evaporative cooling and collapsing carbon uptake.",
      defenseQ: "Why does drought stress matter in a wetland study? Because climate change models predict hotter, drier summers for Northern Germany. Rewetted peatlands with shallow-rooted grasses will experience acute physiological stress if water tables are not actively managed."
    },
    notes_es: {
      speech: "La relación de Bowen (calor sensible sobre calor latente) superó el valor de 1.2 durante el estiaje estival. Esto refleja el cierre forzado de estomas por déficit de presión de vapor (VPD > 1.5 kPa), colapsando la transpiración y la fotosíntesis pese a la alta radiación solar disponible.",
      defenseQ: "¿Por qué es clave en humedales? Porque demuestra que una pradera sobre turba degradada es vulnerable al estrés hídrico si el freático cae, reduciendo su capacidad de actuar como sumidero de carbono en verano."
    }
  },
  {
    id: "slide_16",
    num: "16",
    section: "Part IV • Gap-Filling Trap",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Methodological Divergence: 5 cm vs 50 cm Gap-Filling",
    subtitle: "Sensor Depth Selection Shifts Cumulative Annual Carbon Budgets by Tens of g C m⁻²",
    visual: {
      type: "image",
      src: "assets/figures/08b_Respiration_5cm_vs_50cm.png",
      caption: "Divergence in modeled cumulative respiration when calibrated against shallow (5 cm) vs deep (50 cm) soil sensors."
    },
    cards: [
      {
        title: "The Surface Sensor Illusion (5 cm)",
        color: "red",
        text: "During dry summer months, surface soil (5 cm) dries out and experiences high temperature swings, creating an erroneous model assumption that microbial respiration has stopped."
      },
      {
        title: "The Deep Soil Reality (50 cm)",
        color: "blue",
        text: "Deep peat (50 cm) retains high moisture and stable warm temperatures (14–16°C), sustaining active heterotrophic oxidation that surface sensors fail to capture."
      },
      {
        title: "Cumulative Annual Budget Divergence",
        color: "gold",
        text: "Comparing MDS vs Lloyd-Taylor calibrated at 5 cm vs 50 cm shifted the site's annual cumulative balance from an apparent carbon sink (-45 g C m⁻²) to a net carbon source (+32 g C m⁻²)."
      }
    ],
    pills: [
      { val: "5 vs 50 cm", lbl: "Sensor Depth Bias", color: "red" },
      { val: "±77 g C", lbl: "Cumulative Spread", color: "gold" },
      { val: "Sink → Source", lbl: "Sign Reversal" }
    ],
    notes: {
      speech: "This slide exposes a dangerous methodological trap in micrometeorological research. Using shallow 5 cm soil temperatures to gap-fill missing nighttime respiration produces an apparent carbon sink of -45 g C m⁻². Calibrating the identical model with deep 50 cm sensors reverses the budget into a net source of +32 g C m⁻².",
      defenseQ: "Which temperature depth is correct? Deep temperature (50 cm) reflects the bulk organic horizon where the majority of microbial decomposition occurs, whereas 5 cm sensors are distorted by diurnal surface air coupling."
    },
    notes_es: {
      speech: "Esta diapositiva expone una trampa metodológica fundamental: calibrar el modelo de respiración con el sensor superficial a 5 cm simula un sumidero anual de -45 g C m⁻². Usar el sensor profundo a 50 cm invierte el resultado hacia una fuente neta de +32 g C m⁻², demostrando la profunda sensibilidad del balance al protocolo de relleno de datos.",
      defenseQ: "¿Cuál sensor es el correcto? El de 50 cm es el más representativo del acrotelmo profundo donde reside la mayor biomasa microbiana heterótrofa activa en turberas."
    }
  },

  // =========================================================================
  // PART V: TRACE GAS DYNAMICS (CH₄ & N₂O) & MACHINE LEARNING (SLIDES 17 - 19)
  // =========================================================================
  {
    id: "slide_17",
    num: "17",
    section: "Part V • Methane Heterogeneity",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    interactiveType: "ch4_zones",
    title: "Methane (CH₄) Exchange: Extreme Spatial Heterogeneity",
    subtitle: "Micro-Topographical Gradients Create Disconnect Between Ditch Sinks, Ebullition and Hotspots",
    visual: {
      type: "image",
      src: "assets/figures/16b_CH4_Daily_Budgets.png",
      caption: "Daily methane emission budget: Discrete chamber measurements contrasted against landscape environmental drivers."
    },
    cards: [
      {
        title: "East Trench (Chambers 1–2): Net CH₄ Sink",
        color: "green",
        text: "Clean boundary ditch maintained near-zero or slight net methane uptake (<strong>-0.03 nmol m⁻² s⁻¹</strong>), driven by active aerobic methanotrophy in oxidized ditch bank fringes."
      },
      {
        title: "Central Plateau (Chambers 3–7): Summer Emission Hotspot",
        color: "red",
        text: "Inundation of fresh root biomass during summer water table recovery triggered acute emissions reaching <strong>up to 42.0 nmol m⁻² s⁻¹</strong>."
      },
      {
        title: "West Trench (Chamber 8): Ebullition Dynamics",
        color: "gold",
        text: "Deep organic ditch exhibited episodic bubble ebullition, bypassing surface oxic filters and injecting raw methane directly into the air."
      }
    ],
    pills: [
      { val: "-0.03", lbl: "East Trench (nmol/m²s)", color: "green" },
      { val: "+42.0", lbl: "Central Hotspot", color: "red" },
      { val: "Ebullition", lbl: "Ditch Bubbles", color: "gold" }
    ],
    notes: {
      speech: "Methane behavior represents the most dramatic finding of this thesis. While the East Trench acted as a slight sink at -0.03 nmol, the Central Plateau exploded with emissions up to 42 nmol m⁻² s⁻¹ following summer re-wetting. This demonstrates that rewetting agricultural pasture without prior biomass removal triggers severe methanogenesis.",
      defenseQ: "Why was the East Trench a sink while Central was a source? The East Trench had mineralized edges with active aerobic methanotrophs, whereas the Central site had submerged, highly labile agricultural grass residues in anoxic conditions."
    },
    notes_es: {
      speech: "La dinámica del metano muestra una heterogeneidad espacial extrema: mientras la Zanja Este actuó como sumidero (-0.03 nmol m⁻² s⁻¹), la Meseta Central alcanzó picos de emisión de +42.0 nmol m⁻² s⁻¹ tras la inundación de raíces agrícolas frescas. La Zanja Oeste presentó eventos de ebullición que sortean los filtros de oxidación aeróbica.",
      defenseQ: "¿Por qué esta disparidad espacial? Porque la Meseta Central concentró biomasa forrajera fresca en descomposición anaeróbica estricta, mientras que las zanjas limpias albergaron poblaciones densas de bacterias metanótrofas."
    }
  },
  {
    id: "slide_18",
    num: "18",
    section: "Part V • Machine Learning Modeling",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Modeling Methane Pulses: Machine Learning vs Empirical Fits",
    subtitle: "Random Forest & Artificial Neural Networks Capture Non-Linear Ebullition Outliers",
    visual: {
      type: "image",
      src: "assets/figures/14b_CH4_Models_Comparison.png",
      caption: "Model comparison: Random Forest and ANN non-linear fits vs classical empirical temperature regressions."
    },
    cards: [
      {
        title: "The Failure of Classical Empirical Curves",
        color: "red",
        text: "Classical empirical regressions (Q₁₀ exponential curves) fail to capture methane dynamics (R² < 0.35) because CH₄ is governed by non-linear hydrological and redox thresholds."
      },
      {
        title: "Machine Learning Superiority (RF & ANN)",
        color: "blue",
        text: "Random Forest and Neural Networks trained on u*, water table depth, soil temperature, and air pressure <strong>increased predictive power to R² > 0.78</strong>, successfully predicting episodic pulse events."
      },
      {
        title: "Feature Importance Analysis",
        color: "gold",
        text: "Feature ranking identified <strong>Water Table Depth (WTD)</strong> and <strong>Soil Temperature (50 cm)</strong> as the primary drivers, with atmospheric pressure drops triggering ebullition releases."
      }
    ],
    pills: [
      { val: "R² > 0.78", lbl: "Machine Learning", color: "green" },
      { val: "R² < 0.35", lbl: "Empirical Q₁₀", color: "red" },
      { val: "WTD + TS50", lbl: "Key ML Drivers" }
    ],
    notes: {
      speech: "Methane pulses resist classical mathematical modeling. Simple exponential temperature regressions yield an R² below 0.35. By training Random Forest and Artificial Neural Networks on multi-depth soil moisture and barometric pressure, we achieved an R² above 0.78, proving that machine learning is essential for modeling peatland trace gases.",
      defenseQ: "Why does atmospheric pressure trigger methane pulses? When barometric pressure drops during passing storm fronts, hydrostatic pressure in the peat pore matrix decreases, allowing trapped methane gas bubbles to expand and erupt via ebullition."
    },
    notes_es: {
      speech: "El metano no se comporta con la suavidad del CO₂. Los modelos térmicos clásicos fracasan con un R² inferior a 0.35. Al implementar Random Forest y Redes Neuronales Artificiales acopladas a nivel freático y presión barométrica, elevamos la precisión a un R² > 0.78, capturando los pulsos episódicos de ebullición.",
      defenseQ: "¿Por qué influye la presión barométrica? Porque las caídas de presión atmosférica disminuyen la presión hidrostática en la matriz del poro, permitiendo que las burbujas de metano atrapadas se expandan y escapen explosivamente."
    }
  },
  {
    id: "slide_19",
    num: "19",
    section: "Part V • Nitrous Oxide Dynamics",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Nitrous Oxide (N₂O) Dynamics & Autumn Wetting Pulses",
    subtitle: "Coupled Nitrification-Denitrification Triggers Hot Moments Following Summer Aeration",
    visual: {
      type: "image",
      src: "assets/figures/80_N2O_Fluxes_By_Site.png",
      caption: "Seasonal N₂O flux dynamics across chamber locations: Contrasting dry summer baseline vs acute autumn re-wetting pulses."
    },
    cards: [
      {
        title: "Seasonal Inactivity vs Autumn Surges",
        color: "blue",
        text: "During dry summer conditions, N₂O emissions remained near baseline. Autumn re-wetting triggered acute emission spikes across all chamber locations."
      },
      {
        title: "Coupled Nitrification-Denitrification Mechanism",
        color: "gold",
        text: "As rising groundwater saturates the upper 10 cm, oxygen gradients collapse. Nitrifiers produce nitrate, which denitrifying anaerobes rapidly reduce to gaseous N₂O."
      },
      {
        title: "Residual Agricultural Nitrogen Legacy",
        color: "red",
        text: "Decades of intensive grassland fertilization leave large residual mineral nitrogen pools. Rewetting mobilizes these stores into gaseous nitrogen fluxes, amplifying radiative forcing."
      }
    ],
    pills: [
      { val: "Autumn", lbl: "Pulse Season", color: "gold" },
      { val: "Upper 10 cm", lbl: "Active Layer" },
      { val: "265× GWP", lbl: "Radiative Factor", color: "red" }
    ],
    notes: {
      speech: "Nitrous oxide exhibited classic 'hot moments'. Throughout summer, fluxes were negligible. But when autumn rains inundated the soil, coupled nitrification-denitrification produced sharp emission peaks. With a GWP of 265, even small N₂O pulses contribute significantly to the total greenhouse gas balance.",
      defenseQ: "Can N₂O emissions be mitigated during rewetting? Yes, by avoiding fertilizer application well before rewetting begins and planting wetland species that rapidly uptake mineral nitrogen before water tables rise."
    },
    notes_es: {
      speech: "El óxido nitroso exhibió 'momentos calientes' episódicos. Durante el verano seco las emisiones fueron mínimas; sin embargo, las lluvias otoñales desencadenaron picos agudos de N₂O por el acoplamiento de nitrificación y desnitrificación en la interfase óxica-anóxica superior. Con un factor de forzamiento radiativo de 265 veces el CO₂, estos picos no pueden ser ignorados.",
      defenseQ: "¿Cómo mitigarlo? Es indispensable cesar la fertilización nitrogenada meses antes de elevar el nivel freático para permitir que la vegetación forrajera agote las reservas de nitratos minerales del suelo."
    }
  },

  // =========================================================================
  // PART VI: SYNTHESIS, CLIMATIC VERDICT & GUIDELINES (SLIDES 20 - 22)
  // =========================================================================
  {
    id: "slide_20",
    num: "20",
    section: "Part VI • Multi-Scale Cross-Validation",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    title: "Cross-Validation: Landscape Tower vs Chamber Transects",
    subtitle: "Reconciling Scales: Continuous 10 Hz Micrometeorology Meets Discrete Chamber Hotspots",
    visual: {
      type: "image",
      src: "assets/figures/20_Chamber_EC_CrossValidation.png",
      caption: "Cross-validation: Eddy Covariance continuous observations vs discrete spatial chamber measurements."
    },
    cards: [
      {
        title: "Continuous Footprint Integration (EC)",
        color: "blue",
        text: "The Eddy Covariance tower continuously integrates turbulent eddies across ~30,000 m², dampening fine-scale hotspots into an average landscape flux."
      },
      {
        title: "Discrete Spatial Resolution (Chambers)",
        color: "green",
        text: "Chambers pinpoint exact micro-topographical variance (ditches, mounds, tracks), but suffer from temporal discontinuity between bi-weekly sampling campaigns."
      },
      {
        title: "Synthesis & Cross-Validation Verdict",
        color: "gold",
        text: "Cross-validation showed high consistency for ecosystem respiration (R² > 0.82). For methane, integrating chamber hotspot weighting into the tower footprint is required to prevent gross underestimation."
      }
    ],
    pills: [
      { val: "30,000 m²", lbl: "Tower Footprint" },
      { val: "R² > 0.82", lbl: "Reco Agreement", color: "green" },
      { val: "Dual Scale", lbl: "EC + Chambers" }
    ],
    notes: {
      speech: "Comparing the tower with the chambers resolves the classic scaling debate. The tower integrates a 30,000 square meter footprint, smoothing out localized events. The chambers capture micro-hotspots. Cross-validation proves high agreement for respiration, but for methane, neither technique alone provides the complete story.",
      defenseQ: "Why do chamber CH₄ fluxes appear higher than tower fluxes? Because chambers specifically sample the saturated ditch micro-environments, which represent only a fraction of the broader tower footprint."
    },
    notes_es: {
      speech: "La validación cruzada resuelve el debate de escala. La torre integra un footprint de 30.000 m², amortiguando eventos locales en una tasa promedio de paisaje. Las cámaras identifican los hotspots discretos. La concordancia en respiración fue sólida (R² > 0.82), pero en metano demostramos que si no se pondera la superficie de zanjas en la huella de la torre, se subestima el balance radiativo total.",
      defenseQ: "¿Por qué las cámaras registran flujos de CH₄ más altos? Porque muestrean zanjas inundadas que concentran ebullición pero ocupan un porcentaje acotado del área de visión de la torre."
    }
  },
  {
    id: "slide_21",
    num: "21",
    section: "Part VI • The Climatic Verdict",
    chapterLink: "03_Thesis_Manuscript/chapters/03_Results.md",
    interactiveType: "gwp_toggle",
    title: "The Climatic Paradigm Shift: 20-Year vs 100-Year GWP",
    subtitle: "Front-Loaded Radiative Forcing Reverses the Apparent Carbon Sink Into an Acute Warming Source",
    visual: {
      type: "image",
      src: "assets/figures/21_GHG_Balance_100y.png",
      caption: "Integrated GHG Balance (100-y horizon) showing the transition from CO₂ sink to multi-gas source."
    },
    cards: [
      {
        title: "The CO₂-Only Narrative (The Optical Illusion)",
        color: "green",
        text: "Examining carbon dioxide alone yields an apparent carbon sink during the growing season (-1.5 to -3 t CO₂ ha⁻¹ yr⁻¹), fostering the false assumption of immediate climate cooling."
      },
      {
        title: "100-Year Horizon (GWP₁₀₀: CH₄ × 28, N₂O × 265)",
        color: "gold",
        text: "Incorporating trace gases under GWP₁₀₀ offsets the CO₂ sink, resulting in near climate-neutrality or a modest net source (<strong>+0.5 to +2.0 t CO₂e ha⁻¹ yr⁻¹</strong>)."
      },
      {
        title: "20-Year Horizon (GWP₂₀: CH₄ × 84) — The Immediate Shock",
        color: "red",
        text: "Under GWP₂₀, the intense short-term warming of methane dominates, swinging the ecosystem into a <strong>potent net warming source (+6.0 to +14.0 t CO₂e ha⁻¹ yr⁻¹)</strong>."
      }
    ],
    pills: [
      { val: "-2.5 t", lbl: "CO₂-Only Sink", color: "green" },
      { val: "+1.2 t", lbl: "100-y Net Balance", color: "gold" },
      { val: "+9.8 t", lbl: "20-y Net Warming", color: "red" }
    ],
    notes: {
      speech: "This slide delivers the central scientific conclusion of this thesis. Looking solely at CO₂ creates a dangerous optical illusion of climate cooling. Under the 100-year GWP horizon, trace gases push the site to a modest source. But under the 20-year horizon, with methane weighted at 84, the site becomes an acute warming source of nearly 10 tons of CO₂-equivalent per hectare.",
      defenseQ: "Which metric should policymakers use, GWP₂₀ or GWP₁₀₀? GWP₁₀₀ is standard for international treaties, but for near-term 2030 climate tipping points, GWP₂₀ is essential to prevent short-term atmospheric acceleration."
    },
    notes_es: {
      speech: "Esta diapositiva sintetiza el veredicto central de la tesis: la visión solo-CO₂ genera una ilusión óptica de mitigación climática (-2.5 t CO₂ ha⁻¹). Sin embargo, al incorporar el forzamiento radiativo multigas bajo el horizonte de 100 años (GWP100), el sumidero se neutraliza (+1.2 t CO₂e). Peor aún: en el horizonte de 20 años (GWP20), el metano ponderado por 84 convierte a la turbera en una fuente neta de calentamiento agudo (+9.8 t CO₂e ha⁻¹).",
      defenseQ: "¿Qué métrica debe guiar la política climática? El GWP100 es estándar en inventarios IPCC, pero el GWP20 es imperativo para evitar que las metas de mitigación a 2030 desaten un pico de calentamiento a corto plazo."
    }
  },
  {
    id: "slide_22",
    num: "22",
    section: "Part VI • Paradoxes & Guidelines",
    chapterLink: "03_Thesis_Manuscript/chapters/04_Discussion.md",
    title: "The 4 Paradoxes, 5 Conclusions & Management Guidelines",
    subtitle: "Scientific Synthesis and Actionable Agronomic Directives for Temperate Peatland Rewetting",
    visual: {
      type: "image",
      src: "assets/figures/23_GHG_Net_Balance_Error.png",
      caption: "Cumulative annual greenhouse gas balance synthesis and propagated uncertainty envelope."
    },
    cards: [
      {
        title: "The Four Core Ecological & Policy Paradoxes",
        color: "red",
        text: "<strong>I. Inversion:</strong> CO₂ carbon sink reversed into warming source by CH₄.<br><strong>II. Spatial Disconnect:</strong> Towers miss ditch hotspots; chambers miss advection.<br><strong>III. Soil Memory:</strong> Compacted macropores (85% loss) trap stagnant anoxia.<br><strong>IV. Policy Urgency:</strong> 2030 targets clash with 20-year front-loaded methane warming."
      },
      {
        title: "Five Definitive Thesis Conclusions",
        color: "green",
        text: "<strong>1.</strong> Multi-gas accounting is non-negotiable; CO₂ alone misleads.<br><strong>2.</strong> Time-horizon selection reverses the climate balance polarity.<br><strong>3.</strong> Soil compaction legacy (>80% macropore collapse) throttles gas transport.<br><strong>4.</strong> Coupled EC + Chamber monitoring resolves spatial and temporal disconnects.<br><strong>5.</strong> Topographic depressions act as cold-air drainage sinks, requiring deep soil temperature gap-filling."
      },
      {
        title: "Actionable Agronomic Guidelines for Rewetting",
        color: "gold",
        text: "<strong>Phased Hydrology:</strong> Raise water tables progressively in 10-cm steps.<br><strong>Biomass Pre-Removal:</strong> Harvest labile forage grasses prior to inundation.<br><strong>Machinery Bans:</strong> Strictly avoid heavy tractors to preserve remnant macropores."
      }
    ],
    pills: [
      { val: "Phased", lbl: "Stepwise Rewetting" },
      { val: "Harvest", lbl: "Remove Labile Sod" },
      { val: "Protect", lbl: "Preserve Macropores" }
    ],
    notes: {
      speech: "To conclude: Peatland restoration in Northern Germany is imperative, but must be guided by biophysical realism. By phasing water table rises, removing labile biomass prior to inundation, and respecting soil physical compaction limits, we can minimize short-term methane surges and secure the true long-term carbon storage potential of temperate fen peatlands. Thank you for your attention, and I welcome your questions.",
      defenseQ: "What is your primary recommendation for agricultural practitioners? Do not simply turn off the drainage pumps and walk away. Harvest and export the rich surface sod first, raise the water table progressively in 10-cm steps, and never drive heavy tractors on the rewetted surface."
    },
    notes_es: {
      speech: "En conclusión: la restauración de turberas en el norte de Alemania es imperativa para frenar la pérdida de suelo, pero debe ejecutarse con realismo biofísico. Elevar el nivel freático por fases, cosechar la cubierta forrajera lábil antes de inundar y proteger los macroporos remanentes de la maquinaria pesada son las claves para evitar pulsos de metano y asegurar un sumidero climático duradero. Muchas gracias.",
      defenseQ: "¿Cuál es la recomendación prioritaria para los agricultores? No apagar las bombas de drenaje abruptamente. Se debe retirar la biomasa rica superficial primero, subir el freático escalonadamente de a 10 cm y prohibir el tránsito de maquinaria pesada sobre el suelo húmedo."
    }
  }
];
