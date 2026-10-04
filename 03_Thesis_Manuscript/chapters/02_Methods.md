# Chapter 2: Materials and Methods

2.1 Instrumentation and Hardware
The Wallener Au site is equipped with a comprehensive micrometeorological and EC tower system. The primary high-frequency (10 Hz) turbulent flux measurements were acquired using the following core instruments:
* 3D Sonic Anemometer: Gill WindMaster Pro (Gill Instruments, UK) to measure the three-dimensional wind vector components (u,v,w) and sonic temperature.
* Open-Path CO2 /H2O Gas Analyzer: LI-7500DS (LI-COR Biosciences, USA) to measure absolute CO₂ and water vapor densities.
* Open-Path CH4 Gas Analyzer: LI-7700 (LI-COR Biosciences, USA) for methane flux monitoring.
LI-COR Biosciences implements most of the tools used for EddyCovariance. These instruments allow for continuous, high-frequency measurement of CO₂ and methane concentrations, based in the principle of the selective absorption of infrared radiation by gas molecules.
The infrared analyzers can operate in open-path or closed-path configurations. Open-path systems measure the gas directly in the ambient air, reducing time delays, but are more sensitive to interference from temperature, humidity, and precipitation. Closed-path systems, on the other hand, transport the air through a protected measurement cell, improving signal stability but at the cost of greater complexity in flow corrections (Burba et al., 2012; LI-COR, 2023).[al]
2.1.1 About Sonic Anemometry
Three-dimensional sonic anemometers constitute the second fundamental pillar of the EC. These sensors simultaneously measure the three wind coordinates (u, v, w) at high frequency, using the transit time of ultrasonic pulses between pairs of transducers.
Sonic anemometers allow for the operationalization of concepts from atmospheric turbulence theory, transforming them into measurable variables (Kaimal & Finnigan, 1994).
As the vegetation in wetlands or peatlands often varies spatially, the installation and orientation of the anemometers are key to ensure the representativeness of the flow measurements (ref.).
  
  
  
  

	Figure, Gas Analyzers and Anemometer | (Left) Infrared Gas Analyzer LI-7500DS for CO2 emissions. (Middle-Left) Infrared Gas Analyzer LI-7700 for CH4 emissions. Both in Ekel,[am] Wallener Au & Hohner See. (Middle-Right) Infrared Gas Analyzer LI-7200RS for CO2 emissions. Used at Ekel. (Right) Ultrasonic Wind Sensor uSonic-3 Class A MP[an]. Extracted from LICOR®.
	2.1.2 BIOMET Measurements [ao][ap]
BIOMET systems integrate meteorological and microclimatic sensors which record continuous, long-term atmospheric (considered low-frequency) and biometrological data from fixed stations. 
These sensors are co-located alongside sonic anemometers and infrared gas analyzers, establishing fundamental support for a more robust EC (EC) dataset. While these instruments do not directly measure soil processes, they provide the essential environmental context required for interpreting GHG fluxes. 
The deployed biomet sensors which were used to monitor the ecosystem's physical environment are:
* Net Radiometer: A four-component net radiometer (Kipp & Zonen CNR4) measured incoming and outgoing shortwave (SW) and longwave (LW) radiation, allowing for the calculation of Net Radiation (Rn).
* Soil Microclimate Probes: A profile of sensors monitored Soil Temperature (TS[aq]) and Soil Water Content (SWC) across distinct vertical horizons, including a near-surface boundary layer (5 cm), 20 and the deeper soil (50 cm).
* Soil Microclimate Probes[ar]: 
* Groundwater Loggers[as]: A distributed network of secondary loggers was deployed to monitor the depth of the water table across the field, capturing local micro-topographical hydrological variances.
2.1.3 Regional Meteorological Networks (DWD)
To ensure continuous annual carbon budgeting despite local sensor outages or severe winter weather, the local hardware was supplemented with external meteorological data. Long-term atmospheric variables were sourced from the Deutscher Wetterdienst (DWD) network, specifically utilizing nearby official weather stations (e.g., Erfde and Schleswig). To match the biometeorological parameters of the local tower, the following specific DWD instruments and data streams were utilized:
* Global Radiation (Rg): Measured via standard thermopile pyranometers, replacing missing local incoming shortwave radiation (SW_IN).
* Air Temperature (Ta): Measured via PT100 resistance thermometers housed in ventilated radiation shields.
* Relative Humidity (RH): Measured via capacitive hygrometers.
* Precipitation: Recorded using automated tipping-bucket or weighing pluviometers.
This regional external dataset of standardized, WMO-compliant instruments serves as the critical mathematical backbone for the Model B (MDS) gap-filling algorithm.[at] It allows the continuous computation of ecosystem fluxes during periods when the local Wallener Au tower was non-operational, providing the continuous baseline necessary for the annual carbon budget.
Other commonly integrated sensors include complete weather stations, radiometers for global radiation and photosynthetically active radiation (PAR), barometers for atmospheric pressure, hygrometers for relative humidity, and rain gauges for precipitation (ref.). 
Furthermore, air temperature and humidity profiles enable gradient-based flux verification. Barometric pressure is required for molar volume calculations in density corrections, while four-component radiation measurements drive the surface energy balance, constraining ET estimations. Finally, PAR quantum sensors are particularly critical given the strong light dependence of both photosynthesis and CH₄ oxidation in the rhizosphere.
These measurements provide essential context for flux interpretation and correction, allowing to:
1. Evaluate the energy balance of the ecosystem, 
2. Apply corrections for air density and for H/LE,
3. Strengthen ecophysiological and biogeochemical models
4. Interpret the temporal variability of CO₂ and CH₄ fluxes in relation to regional meteorological conditions.
  
[au]
	Figure, Meteodata Instrumentation | Hygrometers from ThermPro.Extracted from SustainTrust. 
	2.2 Softwares, coding & writing tools
All data processing, quality control, gap-filling, and statistical modeling were executed entirely within the R-4.6.1 programming environment (ref.). R was selected due to its robust handling of large time-series datasets and its specialized ecological packages. 
Key tools within this R pipeline included:
* dplyr & tidyr:[av] Utilized for rigorous data manipulation, ensuring the continuous 30-minute timestamp resolution was mathematically preserved across 14,993 data points.
* ggplot2: Employed to generate high-density, publication-ready analytical graphics, allowing for the visual distinction of localized micrometeorological heterogeneity.
* REddyProc: Used for the MDS gap-filling algorithm, energy balance partitioning, u*, GPP and Recco calculations.
REddyProc is a widely used software in flux tower networks for quality control, turbulence filtering, and gap filling in EC series, enabling continuous estimates of carbon exchanges between ecosystems and the atmosphere (ref.). REddyProc takes raw EC fluxes and converts them into complete and cross-site comparable time series (ref.). It is widely used in flux towers such as FLUXNET and ICOS (ref.).
It typically receives aggregated 30-minute data streams from EddyPro® such as: NEE , H , LE and CH₄ flux & Meteodata as Air Temperature (Tair), Radiation (Rg o PAR), VPD, Humidity and Precipitation. The main objective is to process ecosystem flux data after the initial calculation performed by software like EddyPro®. 
2.2.1 Digital Workflow and Artificial Intelligence Assistance
In accordance with modern academic transparency standards and the guidelines regarding good scientific practice at the Christian-Albrechts-Universität zu Kiel (CAU), the use of Artificial Intelligence (AI) and digital tools in the preparation of this thesis is explicitly declared. The intellectual framework, data interpretation, and scientific conclusions remain entirely the original work of the author. Digital tools were strictly utilized as auxiliary workflow assistants, translators, and debugging aids to manage the vast scope of the micrometeorological pipeline.
Translation, Synthesis, and Structuring 
To ensure linguistic clarity and proper academic tone, DeepL and Perplexity were employed for translation and grammatical correction, particularly for synthesizing complex ideas into cohesive academic English. For overarching project management, DeepSeek was utilized to generate a referential workflow, enabling the systematic structuring of the thesis chapters and ensuring all academic requirements were methodically met.[aw]
Data Processing and Code Assistance 
The micrometeorological data pipeline required complex R programming. To resolve script errors, manage package dependencies, and optimize code efficiency, the agentic AI coding assistant Gravity was successfully employed as the primary debugging tool. Other AI environments, such as Cursor and Warp, were tested but ultimately discarded as they failed to properly navigate the specific geospatial and statistical libraries required for this study. [ax]Furthermore, methodological roadblocks and specific code implementation issues were frequently resolved by consulting community-driven platforms such as Reddit and specialized programming forums.[ay]
Literature Acquisition and Fact Verification 
A comprehensive literature review was conducted using Google Scholar as the primary search engine, while Sci-bot was utilized to organize and retrieve source materials.[az] Furthermore, to prevent AI hallucination and ensure the absolute accuracy of the cited physiological and meteorological mechanisms, Consensus was employed as a rigorous AI-driven fact-verification tool against peer-reviewed literature.
Conceptual Visualization 
To communicate complex physical processes clearly (e.g., the "Nighttime Problem" and ecohydrological restrictions), conceptual diagrams and schematic figures were generated or refined using a combination of Canva, Miro, and generative AI tools (ChatGPT and Gravity). These tools were strictly used for aesthetic vector illustration based on the author's physical design prompts, and were never used to alter or plot raw empirical data.
Final Disclosure
In accordance with modern academic transparency standards and the statutes regarding good scientific practice at the Christian-Albrechts-Universität zu Kiel (CAU, 2021), which are fundamentally aligned with the directives of the German Research Foundation (DFG), the use of computational tools must be explicitly disclosed. As mandated by the DFG's executive statement on the influence of generative models in scientific practice (DFG, 2023), researchers are strictly obligated to maintain transparency by fully disclosing the use, scope, and purpose of artificial intelligence models in their research workflows. Consequently, the application of algorithmic coding assistants and language models utilized strictly for data structuring, debugging, and visualization processes in this thesis is hereby formally acknowledged. In full compliance with these institutional guidelines, all primary scientific responsibility, analytical interpretation, and final cognitive assessment remain entirely with the author
	2.2.2 Code Architecture and Analytical Pipeline
The transition from raw high-frequency data to a final annual carbon budget was executed by a modular pipeline of structured code architecture. The flow of work was created in order to put attention to each physical transformation till modeled ecological fluxes. The pipeline can be categorized into four primary analytical spheres:
1. The Core Micrometeorological Pipeline (Pre- and Post-Gapfilling)
The foundational scripts managed the ingestion of the semi-processed EddyPro® outputs. This involved merging local Biomet variables (radiation, soil profiles) with the raw EC fluxes. 
Crucially, specific scripts were dedicated to Error evaluation and flagging,[ba] deploying u∗ (friction velocity) filtering to discard invalid nighttime data, and implementing statistical outlier detection based on physically impossible flux thresholds. 
Following the quality control, the data was passed to the REddyPro® environment for MDS gap-filling. The post-gapfilling flow then partitioned the continuous NEE into GPP and Ecosystem Respiration ([bb]Reco)[bc], while simultaneously modeling the LE (water vapor/ ET) and sensible heat fluxes over the full year.
2. The Chamber Integration 
Acting as the secondary "master script" for the GHG budget,the code processed the localized closed-chamber data. It served as a physics engine, performing geometry-aware volume calculations to convert raw ppm/min slopes into standardized μmol/m2s and scaling them up to kg/ha/d. This allowed for the direct superposition of [bd][be]CH4 and N2​O[bf] fluxes over the baseline [bg]CO2 footprint.[bh]
3. Exterior Mechanical Analysis (Precompression Curves): 
Operating outside the core flux pipeline, but conceptually vital to the ecohydrological interpretation, a separate analytical sphere[bi] processed the soil mechanical stability data. These scripts derived the precompression stress limits from raw compaction tests. 
While "exterior" to the EC code, this mechanical boundary condition served as the foundational constraint explaining the observed physiological restrictions seen in the main pipeline.
4. Spatial and Climatic Visualization (Modular Switches) 
To contextualize the site without disrupting the core numerical flux pipelines, standalone modular scripts ("switches") were developed for geospatial and climatic visualization. 
These independent modules are responsible for automatically pulling proxy data (e.g., DWD Erfde precipitation and temperature) to generate standardized Walter-Lieth climate diagrams, and for retrieving open-source satellite data (e.g., SoilGrids, Sentinel-2 NDVI) to map the geological and ecological footprint of the site.
Scripts and .r files will be available in Drive format or through contact with the author. At the date of the finishing of this work, it was still pending to do an overall process for debugging of the code and register allocation and inlining reducing the amount of temporal variables which were created to solve local issues and which could have been merged into a fitter code in terms of effectivity and velocity (Gomes A., et al., 2021). [bj]










The high spatial heterogeneity of wetlands and the high dependence of their fluxes on hydrological, biological, and meteorological conditions (among others) usually makes it difficult to study their features, as their emissions patterns.
Given the difficulty of capturing processes that occur at the molecular scale (often diffusive and chaotic), the development of micrometeorological methods and direct in situ measurements has been revolutionary by allowing further understanding the exchange of CO₂, CH₄ and other gases between wetlands and the atmosphere.
2.3 Study Sites and Experimental Design
2.3.1 Site Description
The sites which are worked during this thesis are part of the Klimafarm observational network, located in. They were selected to evaluate greenhouse gas exchanges across contrasting management strategies and hydrological regimes.
The primary cropland[bk] site is referred to as Wallener Auer Au, an extensive site which will be rewetted during September 2026, serving as the core [bl]experimental field for greenhouse gas budgets and ecohydrological interactions. 
  

	Figure, Wallener Au site | Latitude: 54.280684° N Longitude: 9.258619° E Scale [bm]1:31785
	Wallener Au Au, together with Ekel and a third called Hohner See are the three primary sites of the Klimafarm observational network which are on the rewetting plan. The instrumentation and management characteristics are summarized as follows. 
* Wallener Au: Operated under an extensive management strategy with a moderate water table. Monitoring is conducted via EC (EC) stations equipped with LI-7500DS gas analyzers for CO₂ and LI-7700 analyzers for CH₄.
* Ekel: Currently subject to intensive management and scheduled for rewetting by August 2026 equipped with LI-7200 (closed-path) CO₂ analyzer and LI-7700 CH₄ analyzer
* Hohner See: Managed under intensive agricultural conditions on clay-rich soils.[bn] Monitoring is facilitated by standard EC configurations (LI-7500DS and LI-7700). 
The Klimafarm observational network includes other two control plots: Control 1 (drained, no clay) and Control 2 (drained, with clay overlay) to isolate the effects of soil composition on GHG flux dynamics.
Meteorological Aspects
Climatologically, the site experiences a maritime-influenced temperate climate. To evaluate the compounding effects of recent climate change, a 25-year recent climatological baseline (1999-2023) was extracted from NASA POWER. This baseline serves as the reference point to determine the relative severity of precipitation and temperature anomalies during the 2024 measurement year
  

	Figure, Walter-Lieth (1999-2023) | Walter-Lieth climate diagram representing the last 25 years (1999-2023) of temperature and precipitation averages for the site, capturing recent climate change trends.[bo]
	Geographical Aspects [bp]
To accurately define the physical boundaries governing the micrometeorology of the Klimafarm Wallener Au, geospatial baseline maps were programmatically generated using modular R scripts. The Digital Elevation Model (DEM) was retrieved via the elevatr package, accessing high-resolution global terrain tiles (AWS/Mapzen) to reconstruct a 40-kilometer spatial buffer around the EC tower. Simultaneously, the Soil Organic Carbon (SOC) density raster was queried from the ISRIC SoilGrids REST API at a 250-meter[bq] spatial resolution. Both spatial datasets were reprojected, cropped, and visualized using the terra and ggplot2 ecosystems to provide a macro-scale context for the site's physical vulnerabilities.
Now in Environmental Aspects. Topographically, the site sits in a low-lying valley, establishing the physical prerequisite for phenomena such as nighttime drainage flows and cold-air pooling, which directly impact the turbulent mixing of the boundary layer 


  

	Figure, SOC Density | High-resolution spatial mapping of Soil Organic Carbon (0-5cm) density, underscoring the peatland's visually distinct and highly concentrated carbon reservoir.
	Geologically and pedologically, the site is characterized by an extensive horizon of organic-rich peat. The high concentration of soil organic carbon explains both the high potential for historic CO2 loss upon drainage and the massive potential for methanogenesis upon rewetting.
  

	Figure, DEM Wallener Au | Digital Elevation Model (DEM) of the study area, highlighting the low-lying basin nature of the Klimafarm (nocturnal cold-air drainage and boundary layer decoupling).
	2.3.2 Experimental Design Reasonin[br]g
The experimental design of this study is set to address the constraints from transitioning wetlands ecosystems, such as shifting surface roughness, dynamic energy partitioning, and non-steady-state ABLs. For this purpose, employs an Observational Micrometeorological [bs]approach utilizing natural temporal and spatial variables together with biometeorological sensors to anchor the atmospheric turbulent fluxes to ground-level realities.[bt]
For this purpose the ecosystem is continuously monitored across a full phenological cycle, observing seasonality and weather events through the variables and testing ecosystemic responses[bu]. The sites are undergoing rewetting processes from draining stages or with fluctuating water tables as the Klimafarm sites present unique challenges.
The design had to consider the spatial heterogeneity in wetlands and their agricultural boundaries from inherently patchy environments. These environmental conditions added certain complexity for this case, as the peatlands were affected by the industrial agriculture use of the space which transformed the soil by the movement of machinery or during the cutting periods. Precompression curves allowed us to observe part of the effects of these processes as it will be discussed further in the following chapter.
The presence of ditches and channels created water diffusion patterns which of course transform the overall behaviour of the peat. Micro-topographical variations of merely a few centimeters dictate whether a specific spatial point acts as a carbon source, driven by aerobic respiration in dry soil, or a carbon sink/methane source driven by anaerobic conditions in submerged soil. Gas chambers and water loggers were part of the defined solutions to correct the water and peat distributions. 
2.3.3 Additional Hydrological and Energy Balance Measurements[bv][bw]
Additional measurements were conducted to explore the relationships between water availability and ecosystem activity. These observations were not part of the primary experimental design focused on GHG exchange but were included to provide complementary insights into plant–soil interactions and the hydrological controls on ecosystem functioning. 
The vertical coupling between the deep groundwater table and the shallow root zone is a key determinant of vegetation water availability and stomatal regulation. To characterize these interactions, the experimental setup integrated high-frequency Soil Water Content (SWC) profiling with continuous groundwater-level monitoring. Simultaneous observations of atmospheric water demand through ET measurements and subsurface water storage dynamics enabled a more comprehensive assessment of eWUE under varying hydrological conditions, including periods of inundation and atmospheric drought. 
Spatial replicates of soil heat flux [bx](SHF) plates and a distributed network of groundwater loggers were deployed across the Wallener Au field to capture the pronounced spatial heterogeneity typical of rewetted peatland systems.
2.3.4 Considered Restrictions[by]
Due to the strong spatial heterogeneity, variable surface inundation, and contrasting vegetation communities, which come from highly saturated environments as peatlands, EBC is frequently incomplete (check theoretical framework), resulting in the commonly observed relationship partly attributable to advective processes and unmeasured heat storage components:

An additional limitation arises from the assumptions underlying EC measurements. One of the fundamental requirements for reliable flux estimation is the existence of steady-state conditions and fully developed turbulence. As a result, substantial portions of the raw data record, often exceeding 60% under certain conditions, may be excluded during quality control procedures (Foken et al., 2004). 
  

	Figure, Turbulence Intermittency | How it impacts surface energy balance (SEB) and its a driving cause for the classic energy non-closure issue over complex landscapes. Extracted from Chang H., et al. (2024).
	Data rejection is particularly common during stable nocturnal conditions characterized by weak turbulence and low wind speeds. This phenomenon, widely referred to as the "nighttime problem" can lead to systematic underestimation of ecosystem respiration and CO₂ emissions if not adequately addressed through gap-filling and flux correction procedures (Aubinet et al., 2012; Papale et al., 2006). 
These methodological constraints are especially relevant in rewetted peatlands, where frequent waterlogging, heterogeneous surface conditions, and low nighttime turbulence may further complicate the interpretation of ecosystem-atmosphere exchanges.
  

	Figure, Schematic representation of the "Nighttime Problem" | (At night, rapid cooling leads to atmospheric stratification; turbulence collapses, and CO2 pools near the ground, remaining undetected by the sensors. Radiative cooling, fog formation, and drainage flows exacerbate this stable boundary layer. Created by author.
	2.3.5 Data Processing Workflow
The experimental design required a rigorous computational pipeline to translate raw micrometeorological measurements into reliable, ecosystem-scale carbon budgets. Given the site's complexity, the data processing architecture was structured into a three-stage workflow. It couples the physical fluid dynamics software (EddyPro®) with the ecophysiological statistical modeling environment (REddyProc), and finally integrates discrete manual sampling (chambers) for comprehensive greenhouse gas scaling.
Phase 1: Derivation of Semi-Processed Fluxes (EddyPro®)[bz] 
Raw 10 Hz data from the sonic anemometer and gas analyzer were processed using EddyPro® to apply fundamental micrometeorological corrections (e.g., coordinate rotation, spectral compensation, and Webb-Pearman-Leuning density corrections). This step transformed raw voltages into 30-minute averages of NEE and energy fluxes. The resulting "semi-processed" dataset provides an accurate aerodynamic reflection but requires further filtering for ecological validity.
Phase 2: Quality Control, Gap-Filling, and Partitioning (REddyProc)
The semi-processed fluxes, alongside auxiliary microclimate variables, were ingested into the R environment via the REddyProc package (ref.). This stage involved three critical steps:
* Quality Contr[ca]ol (QC): A friction velocity (u∗) threshold was strictly applied to discard nighttime measurements contaminated by advection or drainage flows, ensuring the assumption of vertical turbulent mixing held true.
* Gap-Filling: The MDS algorithm was used to statistically predict missing fluxes based on their covariance with meteorological drivers (Radiation, Temperature, VPD), generating the continuous time-series necessary for annual budgets.
* Flux Partitioning: Finally, the continuous NEE was decomposed into its biological components (GPP and Reco) using temperature-dependency models, isolating the canopy's photosynthetic sequestration from the soil and ecosystem respiration.
Phase 3: Greenhouse Gas Integration and Scaling (Post-Gapfilling) 
To move beyond a purely CO2-driven carbon balance, the continuous gap-filled NEE generated by REddyProc was treated as a baseline. Discrete spatial sampling of non-CO2 gases (CH4 and N2O) from manual static chambers was mathematically superimposed onto this continuous baseline. This phase applies IPCC Global Warming Potential (GWP) multipliers and propagates the spatial standard error from chamber replicates, allowing the final output to represent a comprehensive Net Ecosystem GHG Balance with statistically bounded uncertainty. 
  
[cb][cc][cd]
	Figure, Data Processing Workflow | Analytical workflow and experimental design of the EC data processing.
	These algorithms can generate artificial noise during the dormant winter season or during prolonged local sensor failure, as they struggle to accurately extrapolate fluxes when the primary environmental drivers collapse.
2.4 EC Framework
2.4.1 Principles of EC
The EC (EC) technique is based on the atmospheric turbulence theory and the principle of mass conservation. The theory states that, the turbulent vertical flow of a gas (as CO₂ or CH₄) can be estimated as the statistical covariance between instantaneous fluctuations in vertical wind speed and fluctuations in gas concentration relative to their mean values (ref.).
This can be reflected in the following equation:

$$F_c = \overline{w' c'} = \frac{1}{N} \sum_{i=1}^N (w_i - \bar{w})(c_i - \bar{c})$$

	The method allows for the quantification of net GHG exchange at an ecosystem scale, integrating all simultaneous emission and absorption processes within the tower's area of ​​influence. It also generates continuous time series at a high resolution (typically 10-20 Hz), enabling the capture of diurnal, seasonal, and interannual variability (Baldocchi, 2014).
In wetlands, EC has proven particularly useful for evaluating net CO₂ and CH₄ balances under dynamic hydrological conditions, including rewetting processes, groundwater level fluctuations, and changes in vegetation cover. These days, conforms a certain standard to quantify carbon fluxes at ecosystemic scale (Aubinet et al., 2012; Baldocchi, 2014).
Even then, the technique has limitations due to its inherent methodological nature and instrumental capabilities; as the assumption of:
* Stationarity,
* Certain land homogeneities, 
* Dependence on suitable turbulent atmospheric conditions,
* The difficulty in attributing flows to specific ecosystem components
For this reason, it is very useful to support EC with other types of analyses in the field.
2.4.2 EC Instrumentation
Gas flow signals in wetlands are often difficult to detect, highly variable, and sensitive to environmental conditions (ref.); therefore, the selection, integration, and calibration of sensors are central parts of the design (ref.). 
Correct instrumentation and the series of successive adjustments, often performed in situ and during the measurement campaigns themselves, are the definitive link between biophysical processes and observed data (ref.), thus translating complex ecosystem exchanges into time series.
The raw data is processed following a pipeline based on the work from Bavaria (Lamerdigen) and according to [ce]the inputs from the supervisor of this thesis Sebastian Jordan Ph.D. In the future it will be called “Legacy”. 
The processing software requires manual inputs of a few user-specific data. Such inputs are carried during installation and prior to station operation, so they get automatically recorded with processing configuration for each 30-minute period. It is important to inspect these inputs to avoid human error and the need for recalculation (Burba G., 2025).[cf]
Some essential information is set in Eddy Pro in order to obtain a correct calculation of flows, air density correction and footprint analysis (Burba G., 2025), such as:
* Geographical location of the site (latitude, longitude, altitude)
* Expected Area of Influence
* EC Tower Configuration & fetch configuration
* Height of the instruments (anemometer and gas analyzer)
* Instruments orientation (specially the anemometer)
* Vegetation height (which may need to be adjusted every few weeks), 
* Type of ecosystem (wetland)
* Specific instrumental parameters of each sensor[cg]
To properly synchronize wind and gas concentration signals, the entry parameteres must be specified
* Types of Sonic Anemometers
* Model(s) of the LICOR® analyzers 
* Measurement method, open-path or closed-path
* Sampling frequency
* Time lag between signal[ch]s
2.4.3 Data Acquisition
High-frequency EC data were continuously acquired and stored using the data logging system associated with the EC tower. Raw data were recorded at a temporal resolution of 10 Hz and stored in standard LICOR®-formats (e.g., .dat and  .ghg), depending on the acquisition system configuration. Files were organized into daily or hourly[ci] datasets to facilitate subsequent processing.
Each raw data file contained synchronized measurements of three-dimensional wind components (u, v, w) from the sonic anemometer and scalar concentrations (CO₂, H₂O, and where available CH₄) from infrared gas analyzers. Tables showing files columns from the meteo data and the “full output” from the gas analyzers and sonic anemometers can be found in tables annex. 
Accurate temporal synchronization between wind and scalar measurements is critical for reliable flux computation (ref.). Therefore, timestamp alignment and consistency across sensors is ensured during data acquisition and further refined during pre-processing using EddyPro®, where time lag detection and compensation were applied[cj]. Data integrity was verified through routine checks for completeness, consistency, and continuity of the recorded time series, ensuring that no data gaps or corrupt files were introduced during the acquisition phase.
2.4.4 Standard Preprocessing and Implementation in EddyPro®
For standard measurements, raw data is automatically processed on-site to generate flow data at 30-minute intervals using EddyPro® software, a proven and documented system (Burba G., 2025) which is the regular, expected and base level for eddy covariance method. [ck]
The original data is recorded as high-frequency files, typically in.dat, .csv or .ghg format with a 20 Hz time resolution, organized into daily or hourly files depending on the data logger's configuration (ref.). These files constitute the most basic level of information, prior to any filtering or correction. Is non-readable and requires the following preprocessing in EddyPro® (ref.).[cl]
Some standards procedures can be considered:
* Coordinate rotation (double or triple to align the reference frame with the mean flow)
* Time lag correction between wind and concentrations
* Spectral corrections for high- and low-frequency losses
* Air density correction (WPL) for gases measured by open-path analyzers
* Calculation of turbulent flow at 30-minute intervals[cm]
Processing automatically filters the high-frequency raw data to remove peaks and outliers[cn] and identifies non-turbulent periods using proven data quality control procedures[co]. It also performs flow calculations, applies frequency and density corrections[cp], and calculates quality indicators for each 30-minute interval (Burba G., 2025). 
Signal detrending is the process which removes low-frequency trends unrelated to turbulent transport. Is followed by time lag compensation, which synchronizes wind measurements from the sonic anemometer with gas concentration measurements from the infrared gas analyzer. To account for sensor tilt and local airflow distortions, coordinate rotation procedures are applied to align the wind field with the mean streamline. Depending on site characteristics, EddyPro® allows the use of double rotation, triple rotation, or planar fit methods.[cq]
The data was considered to respond to the configuration of “Planar Fit”; this means that the topography of the terrain, associated with a relatively flat land could match with the configuration of what EddyPro® distinguishes as planar fit. This technique is an important setting to be realized with EC and EddyPro® software. Offers superior adaptation to wetland environments where microtopographic variability and vegetation heterogeneity create local flow modifications (ref.) .[cr]
  

	Figure, Planar Fit Settings | Eddy Pro, Advanced Settings. Extracted from LICOR[cs]®.
	Rather than forcing w̄ = 0 for each interval, planar fit determines a fixed tilt plane from regression of w on u and v across extended records (days to months), preserving information about terrain-following mean motions while ensuring turbulent fluxes are computed relative to local streamlines (ref.). Basically distinct tilt planes for different wind direction sectors. 
For northern German rewetting wetlands, as the studied sites for this thesis; where historical drainage ditches, remnant peat cuttings and uneven vegetation establishment create complex surface geometry, sector-wise planar fit can provide optimal performance.[ct]
2.4.5 Processing & Fluxes Computation
Fluxes are then computed as the covariance between fluctuations in vertical wind velocity and scalar concentrations, using high-frequency measurements typically recorded at 10 Hz and aggregated into standard 30-minute averaging intervals.
In addition, EddyPro® applies spectral corrections to compensate for signal attenuation at both low and high frequencies, which may arise from instrument response times, sensor separation and finite averaging periods.
  
[cu]
Figure, Steps performed for the calculation of non corrected, raw fluxes | Green boxes indicate methods that require a preprocessing phase. Green text between brackets is the method used in case the data set is not available for pre-processing. Dashed boxes indicate the steps used for the estimation of the uncertainty (Extracted from Sabbatini et al, 2018).
2.5 Quality Control and Data Filtering
Data quality control eliminates all erroneous data based on the data quality indicators reported by the EddyPro®® [cv]flow processing software. It also includes checking the plausible range and excluding data outside this range. 
Isolated outliers are manually excluded after careful visual inspection, as happens with strange physical cases, such as relative humidity above 100%, negative wind speed, or a temperature of 70 °C in winter. Site maintenance, changes to station setup or configuration, active site management (agricultural activities, livestock grazing, controlled burning, etc.), and other field activities that influence measurements are examined against field records and removed (Burba G., 2025).[cw]
The initial filtering seeks to exclude data affected by non-ideal conditions, such as low atmospheric turbulence, instrumental failures, or external influences on the ecosystem of interest (ref.). 
  

	Figure, Spectral corrections | Corrections performed, options selected or criteria used in the flagging scheme and steps as numbered in the text and literature references, where it applies (Extracted from Sabbatini et al, 2018).[cx]
	2.5.1 Quality Flagging
The FLUXNET quality flag system provides standardized communication of data reliability, with hierarchical ratings (0 = highest quality, 2 = rejected) encoding statistical and operational status (ref.). [cy]
Flag
	Criteria
	Typical Application
	0
	All tests passed, optimal conditions
	Unrestricted use, synthesis studies
	1
	Minor deviations, acceptable quality
	Most applications with caution
	2
	Significant deviations, questionable
	Excluded & case studies
	X
	Site-specific (precipitation, u*, footprint)
	Wetland-specific exclusion periods
	        Table, Quality flag interpretation and application guidelines.
Foken quality flags[cz] specifically address turbulence conditions, integrating stationarity tests and integral turbulence characteristics with thresholds calibrated against EBC.
  
[da]
	Figure, quality check QC | Quality checked time series & ICOS Flagging system applied to the raw time series to flag and eliminate corrupted data (Extracted from Sabbatini et al, 2018).
	2.5.2 Data Cleaning
Data cleaning includes removing outliers, correcting time lags between sensors, and adjusting units and scales (ref.). This step is essential to ensure the internal consistency of the time series and prevent the propagation of errors to later stages of analysis (ref.).
Following the initial quality flagging, outlier detection is applied to eliminate values that are physically impossible or statistically implausible for the specific ecosystem and seasonal conditions (ref.). 
Atmospheric high-frequency time series are inherently susceptible to short-duration, high-amplitude anomalies known as spikes, which are typically caused by electronic noise, sudden precipitation wetting the sonic anemometer transducers, or optical path obstructions in the gas analyzer (Papale et al., 2006). 
To resolve this, a despiking routine is executed during the raw data processing phase in EddyPro®[db], typically following the automated method (Vickers and Mahrt, 1997).
This algorithm scans the raw 10 Hz data within each 30-minute block using a moving window to calculate local means and standard deviations (ref.). Any individual data point exceeding a specific threshold, commonly 3.5 to 5 standard deviations from the local mean, is classified as a spike and replaced using linear interpolation or flagged for exclusion (ref.). 
Basically, data points that fall outside these predetermined limits, as is in case of extreme gas concentrations or unrealistic heat fluxes caused by temporary sensor malfunctions, rain interference, or electrical power drop, are identified and flagged as missing values (ref.). 
Eliminating these high-frequency artifacts is critical, as failing to remove even a single major spike can severely artificially inflate the calculated covariances, leading to significant overestimations of the final half-hourly fluxes (ref.)."
Removing these macroscopic anomalies prevents the distortion of variance calculations and ensures that subsequent gap-filling models are trained only on physically representative data (ref.).
2.5.3 Stationarity and Integral Turbulence Tests 
Physical corrections, such as the Webb–Pearman–Leuning (WPL) correction, adjust measured fluxes for the effects of fluctuations in temperature, humidity, and air density. 
This correction, Webb–Pearman–Leuning, accounts for fluctuations in air density caused by simultaneous variations in temperature and water vapor concentration. Because infrared gas analyzers measure gas densities rather than true molar mixing ratios, changes in atmospheric moisture and temperature can introduce apparent fluxes unrelated to actual ecosystem exchange. 
The WPL correction removes this bias and is considered a standard component of EC processing, particularly in wetland ecosystems where ET rates and humidity levels are often high.
These corrections are particularly relevant in wetlands, where high humidity and evaporation can introduce significant biases if not properly considered (Webb et al., 1980; Burba et al., 2012).[dc]
2.5.4 Friction Velocity (u*) Filtering
The use of criteria such as the friction threshold (u⁎) is widely accepted to ensure that the measured flows represent effective turbulent exchanges (Papale et al., 2006).
During the processing of high-frequency data using EddyPro® software, the half-hourly friction velocity u* (ms⁻¹) is calculated as a fundamental micrometeorological parameter for characterizing the state of mechanical turbulence in the surface boundary layer. Before generating the final output matrix, EddyPro® decomposes the three-dimensional wind component fluctuations recorded by the 3D sonic anemometer, where the sensor alignment corrections are applied to eliminate errors caused by the anemometer's tilt relative to the terrain[dd] (For this purpose the Planar Fit, explained before, is used). 
Once the wind components are corrected, EddyPro® calculates the friction velocity based on the covariances of the horizontal and vertical velocity components (ref.). Mathematically, the software defines u* using the following equation(ref.): 

$$u_* = \left( (\overline{u' w'})^2 + (\overline{v' w'})^2 \right)^{1/4}$$

Here, u’w’ y v’w’ represent the half-hourly covariances of the longitudinal u’ and transverse v’ wind velocity deviations with respect to vertical velocity fluctuations w’. 
This calculation is performed automatically for each 30-minute time block, reflecting the shear stress or vertical linear momentum flux generated by wind friction against the vegetation canopy. It is crucial to note that, at this stage prior to data export, EddyPro® does not perform any filtering or data rejection based on the magnitude of u*.
The software simply computes the physical value of the variable and assesses its statistical quality using tests for stationarity and turbulence development (Foken et al., 2012).
Consequently, the resulting u* value is stored in the corresponding column of the final output file. This half-hourly value serves as the primary indicator of atmospheric mixing and is available for the subsequent post-processing phase, where the critical u* threshold will be determined to identify and discard periods of low turbulence (mainly nocturnal) from what is called the “nighttime problem” which can underestimate net ecosystem fluxes. If the value falls below a certain limit, the flux is considered unreliable (Wutzler R., et al., X).
  

[de][df]	
Figure, Shear Stress | Wind profile" and "Momentum fluxes" generating and transmiting turbulent shear stress or Reynolds stress. The diagram shows the ABL structured over a group of trees detailing how wind speed changes with height and how momentum is transferred downward. Extracted from Renault M., et al., (2024). 
[dg][dh]	
2.5.5 Output
Together, these processing steps done by EddyPro®, transform raw measurements into physically consistent flux estimates that form the basis for subsequent quality control, filtering, gap filling and ecological interpretation. The output from the pre-process contains:
* CO₂, CH₄, and H₂O fluxes
* Energy balance components (H, LE, G)
* Meteorological variables (temperature, humidity, radiation, wind)
* Turbulence statistics (e.g., friction velocity, variances)
* Quality control indicators and flags
Tables showing the variables contained in the outputs can be found at the Annex section.
2.6 Post-processing Pipeline: conversions, aggregation y footprints
Raw micrometeorological fluxes obtained via the EC system represent instantaneous rates (μmol CO₂ m⁻² s⁻¹). To compile seasonal carbon balances, these rates must be mathematically integrated to obtain the absolute daily mass (gC m⁻² d⁻¹). This transformation was carried out in two critical, rigorously defined steps within the R workflow:
1. Chemical conversion and half-hourly integration 
Each 30-minute measurement is transformed from a molecular rate into a discrete mass of carbon. The raw value is multiplied by 1800 (the number of seconds in half an hour) to integrate the flux over the sampling period. Subsequently, this value is multiplied by 12 (the molar mass of carbon, isolating the weight of carbon from CO₂) and by 10⁻⁶ (to convert micromoles to moles).
 The result is the absolute mass of carbon exchanged during that specific half-hour (gC m⁻²). During this chemical conversion, the micrometeorological sign convention is strictly maintained: negative values ​​represent a net uptake of atmospheric carbon (photosynthesis predominating), while positive values ​​represent a net emission of carbon (respiration predominating).
2. Daily aggregation and implicit gap-filling
To calculate the cumulative daily balance, simply summing the 48 half-hourly mass values ​​for a given day is insufficient if that day contains missing data. A direct sum of an incomplete day (for example, a day missing positive nighttime respiration fluxes due to low turbulence) would artificially bias the daily total toward a strongly negative value (indicating a sink). To avoid this, the algorithm first calculates the algebraic arithmetic mean of the half-hourly masses available for that day (respecting their positive and negative signs). This daily mean is then multiplied by 48 (the total number of half-hour intervals in a day). For models with fully filled gaps (Model A and Model B)—which already comprise 48 consecutive daily data points—this operation (mean × 48) is mathematically equivalent to a direct sum. 
However, for the original, fragmented reference data (measured data with QC=0), this procedure acts as an implicit mechanism for filling micro-gaps. Mathematically, it assumes that any missing data point on a given day behaved identically to the average of the points successfully recorded during that same day. This fundamental step ensures that partial daily balances maintain a proportional equilibrium between daytime uptake and nighttime release, thereby providing a stable baseline against which to validate algorithmic gap-filling models (MDS and LRC).
2.6.1 Post-processing Framework & Data Harmonization 
Raw high-frequency biometeorological data/parameters are continuously logged by the SmartFlux system and archived within raw .ghg files at the Klimafarm Wallener Au [di]site. Due to periodic manual data extractions from the field site, the raw datasets were originally segregated into discrete temporal batches. To ensure holistic and uninterrupted flux processing, all batches, comprising over 14,000 files representing half-hourly intervals from the 4th of January till 12th of November 2024, which were first consolidated into a unified directory.[dj]
During preliminary processing, it was identified that dynamic structural changes in the raw data files (specifically, the addition of novel sensor columns during different months of the 2024 monitoring period) caused fatal read-errors and column mismatches within the EddyPro® software, resulting in over 4,000 unprocessable data files.
To resolve these inconsistencies and ensure uninterrupted flux calculations, a data harmonization process was developed in R: The raw *-biomet.data files were extracted directly from the .ghg zip archives. The datasets were then moved into an .csv uniform table, aligning variables by their respective headers and neutralizing the mismatched column errors. 
In this case, .csv was used as it is relatively easier to work with CSV in R (but also in Python, Excel and Matlab) and is specifically required by EddyPro® to proportion a “delimited plain-text file (ideally CSV), where the first row contains the variable names and the second row contains the units. Other files which are generally used on BIOMET data are .dat and .txt, with headers of metadata and columns separated with commas or tabulations.[dk] Data files are common inside of the .ghg which are in reality just zip files[dl] for LICOR® standards. 
The continuous high-frequency measurements were subsequently aggregated into half-hourly means (assigned to the beginning of the interval, e.g., 00:00 for the 00:00–00:30 window) to match the standard temporal timestamp and resolution of the flux processing.
To avoid the limitations associated with using previously stored data, the data acquisition module[dm] was configured to query DWD servers directly, thereby obtaining weather records for the entire 2024 monitoring period. This data was averaged over 30-minute intervals, adjusted to align precisely with the timing of field measurements, and integrated with the biometeorological data collected at the study site.
2.6.2 Pipeline Modifications
To adapt the Legacy pipeline specifically for the Wallener Au, several critical modifications were implemented:
* Timestamp and Variable Mapping
The pipeline was restructured to correctly parse the exact timestamp formats from the site's dataloggers and to accurately map the EBC nomenclature from the EddyPro® outputs.
* Enhanced Microclimate Resolution
Instead of aggregating all spatial replicates, the pipeline was updated to preserve vertical and horizontal heterogeneity. For example, soil temperature sensors were re-mapped to distinguish distinct vertical depth profiles (5 cm, 50 cm) rather than erroneously treating them as horizontal replicates. Conversely, the spatial variance of SHF plates and the groundwater logger network was preserved to analyze horizontal micro-site heterogeneity.[dn]
* Dual Gap-Filling Methodology 
To rigorously handle periods of missing data (particularly during winter when micro-meteorological sensors failed), two distinct gap-filling approaches were formalized and compared. Model A (local physiological model) strictly utilizes local tower data (TS10_fS and W_IN_f) driving a light response curve (LRC) and Lloyd-Taylor respiration model. 
This approach yields a highly accurate and clean physiological representation but naturally fails to gap-fill periods where local sensors are inactive, leaving those periods as incomplete (NA). 
To overcome this and compute a complete annual carbon budget, Model B (regional budget model) was implemented. Model B uses the MDS algorithm and explicitly patches missing local drivers with external regional weather station data (DWD Erfde/Schleswig). While Model B successfully generates a 365-day contiguous dataset, it introduces artificial variance during the winter when it extrapolates dormant-season respiration without local dynamic inputs.
* Streamlined Visual Analytics 
The graphics were consolidated into high-density analytical figures that explicitly overlay measured versus modeled gap-filled data, providing maximum transparency regarding the reliability of the calculated carbon budgets under both Model A and Model B frameworks.
2.6.3 Pipeline Comparations
A comparison between the legacy pipeline and the traditional standard adopted for this thesis (REddyPro®c) highlights distinct methodological pathways:
  

	Figure, Two Pipeline Approaches | Side-by-side structural comparison of the legacy and bavarian workflow against the standardized REddyProc pipeline applied in this study. By author using MIRO.[do]
	The fundamental difference between REddyProc MDS and the legacyModel's LT/MM gap-filling lies in their mathematical approach: MDS relies on a meteorological look-up table (binning data by similar microclimate conditions), whereas LT/MM relies on fitting explicit non-linear ecophysiological equations.
The numerical comparison between both can be seen in the results section.
2.6.4 Gap Filling of Meteorological and Flux Data
As EddyPro® requires continuous, uninterrupted biometeorological records (particularly temperature, pressure, and humidity) to perform accurate density corrections, any gaps in the half-hourly onsite biomet [dp]dataset were to be resolved prior to flux calculation. Missing data must be supplemented using established methods, such as regression models or climatological approaches (Burba G., 2025). 
Gap filling methods, based on empirical relationships with meteorological variables or on statistical approaches, allow the reconstruction of continuous series necessary for calculating gas balances (Reichstein et al., 2005; Burba G., 2025).
REddyProc uses the MDS method. [dq]This method fills gaps using similar weather conditions. Missing periods in the onsite dataset were gap-filled using meteorological data obtained from the public network of the German Meteorological Service (Deutscher Wetterdienst, DWD). Specifically, integrated climate data (air temperature and relative humidity) from the DWD station in Erfde, and solar radiation metrics from the DWD station in Schleswig. This externally sourced data was averaged to 30-minute intervals and merged with the onsite biomet timeline.
These external measurements provided consistent environmental reference data for thermodynamic calculations and quality control procedures, while also facilitating subsequent energy balance assessments. These external data included: Global shortwave and longwave radiation components, photosynthetically active radiation (PAR), precipitation, soil temperature profiles, soil water content profiles and soil heat flux plates.
The finalized, gap-filled, and structurally uniform dataset was then exported as an external biomet file and fed directly into EddyPro®. This pre-processing methodology ensured the successful calculation of total GHG fluxes for the entirety of the study period without data loss due to formatting corruption.

In contrast to preliminary data processing—which relied on the default internal metadata embedded within the raw `.ghg` files, leading to inconsistent parsing of the CH4 analyzer outputs—the final flux calculations were executed using a customized, unified dynamic metadata file. This unified metadata configuration explicitly mapped the fast-response LI-7700 analyzer to the correct high-frequency data columns (e.g., CH4 mole fraction and molar density) across the entire dataset, ensuring a standardized and uninterrupted extraction of methane fluxes regardless of temporal logging inconsistencies. Furthermore, rather than relying on internal auxiliary sensors, an external, quality-controlled biometeorological dataset was explicitly integrated into EddyPro (`use_biom=1`), providing a robust and gap-free meteorological baseline for all necessary flux corrections and density fluctuations.
These data do not directly measure soil processes but provide the essential environmental context for interpreting greenhouse gas fluxes and applying physical corrections to EC. These measurements provide essential context for flux interpretation and correction, allowing also (ref.):
* Evaluate the energy balance of the ecosystem
* Apply corrections for air density and sensible/latent heat
* Strengthen ecophysiological and biogeochemical models
* Interpret the variability of CO₂ and CH₄ fluxes in relation to regional meteo-conditions
* Air temperature and humidity profiles enable gradient-based flux verification
* Barometric pressure for molar volume calculations in density corrections
* Four-component radiation measurements drive the surface energy balance, constraining ET estimations
* Photosynthetically Active Radiation (PAR) quantum sensors are particularly critical given the strong light dependence of both photosynthesis and CH₄ oxidation in the rhizosphere.[dr]
Works as the one from Olli-Pekka T., et al. (2025) test and compare different methods and approaches, which is interesting to check for possible future analysis, between them: 
* GAM Gap Filling
* Random Forest (RF), 
* Extreme Gradient Boosting (XGB), 
* k-Nearest Neighbors (kNN). [ds]
After the data has been properly cleaned and missing data have been gap-filled, the integration (a summatory of all the divided data) shall be done in time and space (ref.). 
2.6.5 Temporal Aggregation
The temporal integration of fluxes (hourly, daily, seasonal, and annual) allows for the evaluation of net GHG balances and the comparison of results between sites and years, connecting instantaneous processes with long-term climate implications.
Integration in time shall be computed as a cumulative sum of all the gap-filled data available from the site. Starting, CO2 fluxes must be converted from its original dimensions (as micromoles of CO2 per m2s every 30 minutes) to a total flux over a 30-minute period (Burba G., 2025):

$$\Delta M_C = F_c \times 1800\,\text{s} \times 12.011\,\text{g mol}^{-1} \times 10^{-6}\,\text{mol }\mu\text{mol}^{-1} = F_c \times 0.0216198 \quad \left[ \text{gC m}^{-2} (30\,\text{min})^{-1} \right]$$

The 30-minute fluxes can then be summed up over the entire period of time. Same case for when they are reported every 60 minutes (Burba G., 2025). 

After carrying the sum over the entire period, the number can be converted into other MMRV units (MMRV standing for Measurement, Monitoring, Reporting and Verification), that are better understood (Burba G., 2025). Conversion from typical flux station units ($\mu\text{mol CO}_2$), where $p$ is the period of time to typical MMRV units ($\text{t CO}_2\text{e ha}^{-1}$) is expressed as:

$$\text{Cumulative Flux } (\text{t CO}_2\text{ ha}^{-1}) = \sum_{k=1}^N \Delta M_{C,k} \left(\frac{44.01}{12.011}\right) \times 10^{-2}$$

Which leads:
From half-hourly → passing by daily → moving to annual:
$$F_{c,\text{daily}} = \left( \frac{1}{n_{\text{valid}}} \sum_{i=1}^{n_{\text{valid}}} \Delta M_{C,i} \right) \times 48 \quad \left[ \text{gC m}^{-2}\text{d}^{-1} \right]$$
2.6.6 Flux Partitioning
Another key function is to decompose Net Ecosytem Exchange NEE into its components: Gross Primary Production (GPP) (or photosynthesis), and Ecosystem Respiration ([du]Reco). Thus, [dv]REddyProc generates complete time series NEE_filled, GPP, and[dw] Reco
*          
This allow the estimation of:
   * How many carbon does the vegetation fix,
   * How much is the ecosystem respiring
  

	Figure, components of ecosystem carbon fluxes and respiration pathways | Showing how [dx]CO2 is exchanged between trees, soil, and the atmosphere. Figure includes Carbon Intake - (or Photosynthesis, GPP) & Carbon Release (Or Ecosystem Respiration, RECO) which includes Aboveground Autotrophic Respiration (RecoRaag), Soil Respiration and its components Ra Autotrophic Respiration & Heterotrophic Respiration (Rh). Extracted from Politechnic University from Madrid[dy] (2022).[dz]
	To achieve this, the REddyProc algorithm was employed to fit established eco-physiological models to the raw data over rolling time-windows, reflecting the mechanistic principles behind the Flux Partitioning procedure:
   * Ecosystem Respiration (Reco)
Utilizing nighttime data (where GPP is assumed to be 0), temperature-dependent Lloyd-Taylor exponential functions were fitted:

$$R_{eco}(T_s) = R_{ref} \cdot \exp\left( E_0 \left( \frac{1}{T_{ref} - T_0} - \frac{1}{T_s - T_0} \right) \right)$$

These models successfully characterize how nighttime respiration scales with a primary driver of microbial and root metabolism: Deep soil temperature (TS50cm). This modeled continuous Reco provides the theoretical baseline required to subsequently subtract respiration from daytime fluxes.

   * Gross Primary Productivity 
Michaelis-Menten hyperbolic functions were applied to accurately constrain the daytime light-response curve. By deriving GPP (measured daytime NEE minus the modeled Reco), these functions model how plant photosynthesis rapidly increases and eventually saturates as incoming Shortwave Radiation (SW_IN) increases:

$$GPP(R_g) = \frac{\alpha \cdot R_g \cdot GPP_{max}}{\alpha \cdot R_g + GPP_{max}}$$

Where α represents the initial canopy quantum efficiency (the initial steep slope of the light-response curve), GPPmax is the theoretical maximum carbon assimilation rate at light saturation (the horizontal asymptote) and SWIN is the incoming shortwave radiation. These aspects are implemented at the Flux Partitioning section of the results.
2.6.7 Footprint Analysis 
To ensure that the measured turbulent fluxes originated from the target crop area, the flux footprint peak distances (xpeak[eb]) and wind directions provided by EddyPro® were analyzed. The xpeak values ​​represent the distance from the tower at which the surface contributes most significantly to the measured flux. A polar scatter plot was generated using a custom R script (ggplot2 package) to plot *x_peak* against wind direction, visually verifying that the predominant flux contributions fell within the geographical boundaries of the Wallener Auer Au field and excluding cases where the flux footprint extended beyond the crop area (e.g., *x_peak* > 600 m).
Besides the integration in time, the cumulative total over the land use area, or integration in space, must be also considered (Burba G., 2025). The conversion from typical flux station area units ($\text{m}^2$) to typical agricultural MMRV area units ($\text{ha}$) is defined by:

$$1\,\text{ha} = 10,000\,\text{m}^2 \implies F\,(\text{kg ha}^{-1}\text{d}^{-1}) = F\,(\text{g m}^{-2}\text{d}^{-1}) \times 10$$

Most current MMRV protocols operate on a basis of actual land use area characterized by the measurements, so the standard units per area are scaled to represent the effective management footprint ($A_{\text{field}}$), establishing the final reported greenhouse gas balance.
2.7 Chambers[ef][eg]
In situ gas chambers are a basic and direct measurement method which quantifies the GHG fluxes at a local scale; generally from soil, surface water, or specific vegetation. They work by isolating a volume of air from the surface of interest, then measuring the variation of gases within the chamber’s closed headspace (ref.).
They allow the capture of the internal heterogeneity of wetlands, such as microtopography, vegetation types and hydrological gradients[eh], which produce contrasting patterns of gas emission and absorption (ref.).
These features allow the identification of differences between soils, such as flooding conditions, macrophyte roots, and open water surfaces (Livingston & Hutchinson, 1995; Butterbach-Bahl et al., 2016).[ei]
The large-scale fluxes that EC provides, complements great with chambers (ref.) by:
   * Identifying emission hotspots,[ej]
   * Evaluating specific processes (e.g., diffusion vs. plant transport), and[ek]
   * Validating and interpreting patterns observed in micrometeorological data.
However, its spatial representativeness is limited and requires careful methodological control. So on, the results depend heavily on the experimental design, the camera [el]closure time and the environmental conditions during the measurement.
Measurements of gas exchange were conducted using static closed dark chambers to quantify soil-atmosphere O2, [em]CH4, and [en]N2O fluxes. The use of opaque chamber covers is essential to isolate the carbon contribution from soil and root respiration by eliminating potential plant photosynthesis within the enclosed headspace. 
Consequently, the recorded CO2 fluxes represent heterotrophic and autotrophic soil respiration rather than NEE. This methodology ensures captures the biological activity of the soil microbial community and rhizosphere, providing a metric for soil carbon release in transitioning wetland environments.
2.7.1 Data Collection Procedure[eo]
The general procedure for taking measurements and to obtain the data is as it follows (ref.):
   1. Chamber placement: A sealed metal or PVC chamber with a known area is placed on the soil at representative points of the ecosystem.
   2. At the starting time, the top of the chamber is hermetically sealed, trapping a fixed volume of air from the soil.
   3. Linear gas accumulation: Soil microorganisms emit gases from respiration, methanogenesis, nitrification or other processes that accumulate within the closed chamber. During the first minutes, this accumulation follows a linear relationship with time.
   4. Sequential sampling: Air samples are extracted from the chamber at regular intervals of using syringes or tubes.[ep][eq]
2.7.2 Shooting and sampling
The automated chamber system consisted of eight chambers measuring sequentially, for a total time of 20 minutes.[er] A full cycle therefore produces 8 measurements and the order proceeds as follows. 
  

	Figure, Chambers Distribution | And indexation of chambers in the East-West transect for Wallener Au.
	After each measurement and once the 20 minutes have passed, the cycle is repeated for a total of 4 times. Each chamber is measured once per cycle, 4 cycles in total. 
  
[es][et]
	Figure, Chambers Measurements | Sequential measurements in an automated chamber system over 4 cycles. Down axis indicates time (in minutes). 
	In summary:
   * 8 chambers
   * 20 minutes total each cycle
   * Each cycle of chambers fires sequentially from 1-8
   * When the 4-camera cycle is finished, the next cycle begins[eu]
2.7.3 Regarding the chamber dimensions[ev]
Static chambers have a telescopic or stacked geometry that creates a variable internal volume. To calculate flux accurately, the volume must be treated as a sum of its parts rather than a simple cylinder, considering that the diameter change at the conjunction.
  
  

	Figure, Chamber | Chamber with extension, next to a water logger, zoomed at the right. Picture from Jordan S.
	There are two distinct physical configurations:
   1. The Base Ring (Ground Level): Fixed diameter of 36.7 cm. This defines the effective soil surface area for all flux calculations, as it dictates the area of soil actively exchanging gases with the headspace.
   2. The "Conjunction" (The 5cm ring above ground): This is where the taper occurs. At this point, the diameter narrows to 35.7 cm.
   3. The Extension/Top (White part): Transitions back to 36.7 cm.
Because flux is defined as , the Area remains constant based on the ground ring (r = 18.35), but the volume changes dynamically depending on whether the extension is present. The volume is son on, defined as a composite of the segments:
   * Configuration 1 (16 cm height total):
   * [ew]
   * Since the extension is absent, "total height" is essentially the base ring + the chamber top.
      * Configuration 2 (42 cm height total):
      *       * Here, the volume of the extension segment (the orange part in figure) must be calculated using the tapered diameter (35.7 cm at the bottom) and the upper diameter (36.7 cm).
2.7.4 Slope Analysis[ex]
In chamber flux measurements, linear regression is applied to model gas accumulation in the headspace as C(t) = β₀ + β₁·t, where β₁ (ppm/min) represents the slope of concentration increase over deployment time t. This can be easily implemented using R's function or via excel (as was in this case).
Linear regression defines the model structure (straight line relationship), while least squares provides the estimation method that determines optimal parameters β₀, β₁ by minimizing the sum of squared residuals:
RSS = Σ ( yᵢ - ( β₀ + β₁ · xᵢ ) ) ²
Least squares gives the mathematically optimal slope for chamber flux calculation under standard assumptions present in the EC workflow (check in annex for further explanation)
Linear regression analysis:
         * X-axis: Time since shutdown (minutes)
         * Y-axis: Measured concentration (ppm) for each gas
         * Slope (c1, c2_n2o, c3_ch4) is the rate of change [ppm/min]
4 measurements per chamber:
         * Time (min): t1 = 0s, t2 = 20s, t3 = 40s , t4 = 60s
         * Concentration (ppm): C1, C2, C3, C4
The slope (m) is calculated by ordinary least squares (OLS):

$$m = \frac{dC}{dt} = \frac{\sum_{i=1}^n (t_i - \bar{t})(C_i - \bar{C})}{\sum_{i=1}^n (t_i - \bar{t})^2}$$

Where:
         * n = 4 (number of measurements)
         * ti = time in minutes (Column D)
         * Ci = concentration in ppm (Column E)

Expanded for a case of 4 points per chamber:

$$m = \frac{(t_1 - \bar{t})(C_1 - \bar{C}) + (t_2 - \bar{t})(C_2 - \bar{C}) + (t_3 - \bar{t})(C_3 - \bar{C}) + (t_4 - \bar{t})(C_4 - \bar{C})}{\sum_{i=1}^4 (t_i - \bar{t})^2}$$

Final practical formula:

$$m = \frac{\sum t_i C_i - \frac{1}{n} \left(\sum t_i\right) \left(\sum C_i\right)}{\sum t_i^2 - \frac{1}{n} \left(\sum t_i\right)^2}$$

2.7.5 Conversion to ecosystem flows:
The fluxes can be represented in different units; one of these which is commonly used is “ppm/min” which measures the accumulation slope (μL/L/min) within the chamber air; also called the "crude slope".


         * Good for: Comparing cameras, detecting outliers, initial QC
         * Bad for: Publishing, comparing sites, overall budgets


In general, the ecosystem flows can be taken into consideration at different scales and units depending the purpose to fulfill:
         1. nmol [ey]CH4 m⁻² s⁻¹ ← ICOS/GEA Standard (most commonly used)
         2. Μg [ez]CH4 m⁻² h⁻¹ ← Agriculture/Soils
         3. kg [fa]CH4 ha⁻¹ day⁻¹ ← Practical Agriculture, Inventories
         4. g [fb]CH4-C m⁻² year⁻¹ ← Annual Budgets


It is possible to move from one to another unit as shown in the annex. To convert from “ppm/min” to emission flows the expressions would be:
         * Flux (nmol m⁻² s⁻¹) = [ppm/min × V × MW × P / (R × T × A)] × 10⁶ 
         * Flux [mg/h×m²] = slope[ppm/min] × molar factor × (V/A) × 60 (min/h)
         * Flux (kg/ha×h) = ppm/min × V (m³) × MW × C × An (m²)
Where
         * A, is Basal Area (Around 0.25 m², 50×50cm for a typical chamber)
         * V, is Chamber volume (Around 0.05 m³ for a typical chamber)
         * MW, is Molecular Weight from the gas 
         * CH4 = 16.04 g/mol
         * N2O = 44.013 g/mol
         * CO2 = 44.01 g/mol
         * P, is 101.325 kPa Atm pressure
         * R, is 8.314 J/mol·K Gas constant
         * T, is Temperature (K)
         * C, is 10⁻⁹ Conversion constant, for ppm → g/m³ 
         * An, is 24/A, to normalise a kg/ha×h
         * ppm/min is the measured slope (μmol/mol×min)
         * h hours, m meters, ha hectares 
The variables from static chambers can be found at the Annex tables section.[fc]
2.7.6 Quality Assessment
Under normal conditions, in general a quality assessment (R²) is integrated, this is the calculation of the coefficient of determination for each regression:
         * R² for CH4, N2O or CO2 > 0.8 indicates a good linear fit
         * R² < 0.6 is usually discarded
But in this case, as to calculate the discrete greenhouse gas fluxes from the manual static chambers, the rate of change in gas concentration (ppm min−1[fd]) over the closure time was derived via linear regression; rather than applying a mathematical threshold to discard individual regressions, all physically viable slope measurements were retained to capture the full spectrum of field heterogeneity. 
The inherent noise of the manual sampling methods was systematically accounted for during the spatial scaling phase. By calculating the standard error (SE) across all spatial replicates for a given day. This methodological noise was transparently propagated into the final statistical bounds of the Net Ecosystem GHG Balance.
2.7.7 GHG Chamber Integration architecture (Post-Gapfilling)
To scale continuous CO2 budgets from the EC tower into a comprehensive Global Warming Potential (GWP) assessment, manual static chamber data ([fe]CH4 and [ff]N2O) [fg]were integrated as a post-processing layer onto the output of the MDS algorithm (REddyProc).
To quantify ecosystem change and its associated uncertainty, the mathematical procedure was divided into:
         1. Baseline (Pre-insertion): The gap-filled continuous NEE establishes the balance driven purely by CO2. In the error analysis, this value serves as the tower's reference point.
         2. Total Balance (Post-insertion): Chamber-derived CH4 and N2O fluxes are converted to CO2eq using 100-year IPCC multipliers and superimposed onto the baseline.

To determine the uncertainty of this new balance, the spatial variance among the different chamber replicates was modeled. For each gas, the Standard Error (SE = SD/ √n) was calculated. The total uncertainty of the net ecosystem balance was calculated using mathematical error propagation for sums (assuming independent errors):

$$SE_{Net} = \sqrt{ \left( \text{GWP}_{CH_4} \cdot SE_{CH_4} \right)^2 + \left( \text{GWP}_{N_2O} \cdot SE_{N_2O} \right)^2 }$$

Where $\text{GWP}_{CH_4}$ and $\text{GWP}_{N_2O}$ are the Global Warming Potential multipliers (e.g., 28 and 265 for GWP100, or 84 and 264 for GWP20 according to IPCC AR5/AR6).
It is crucial to note that CO₂ is not included in this spatial error propagation. Since the CO₂ flux was measured continuously by the EC tower[fh] (which integrates a unique footprint), there are no simultaneous spatial replicates from which to derive a variance. Its temporal uncertainty had already been minimized algorithmically by applying the u* filtering and QCs. 
Therefore, SE_Net represents exclusively the statistical uncertainty introduced by the high biological spatial variability of the soil when measuring with static chambers.
Ecohydrological variables and energy balance[fi]
Latent (LE) and sensible (H) heat fluxes were gap-filled using the MDS algorithm via the REddyProc package. Daily accumulated LE values ​​were converted to daily ET (mm d⁻¹) using the LE of vaporization (approx. 2.45 MJ kg⁻¹). Ecosystem water-use efficiency (eWUE) was calculated on a daily basis as |GPP|/ET. 
Additionally, the Bowen ratio (H/LE) was calculated to assess the seasonal partitioning of available energy between sensible and latent heating.
The quality of EC measurements was evaluated through an EBC analysis. Daily averages of available energy—defined as the difference between net radiation (Rn) and soil heat flux (G)[fj]—were plotted against the sum of turbulent fluxes (LE + H). Linear regression was applied to quantify the closure fraction, thereby providing a metric for data reliability.
Limitations of ET partitioning: Although the EC technique directly measures total latent heat flux (LE), it does not allow for the explicit breakdown of this flux into evaporation and transpiration without auxiliary data, such as high-frequency biomass measurements, sap flow, or isotopic tracers. 
Since total crop biomass data were not calculated during the measurement period, ET is analyzed here in an integrated manner. Consequently, water-use efficiency is defined strictly at the ecosystem level (eWUE) rather than the plant level, reflecting the macroscopic carbon assimilated per unit of water lost by the combined soil-plant system.[fk]
2.8 Soil physical and hydrological monitoring
Given that processes such as oxygen diffusion, water table dynamics, pore connectivity, and water availability directly influence microbial activity and dominant metabolic pathways, the incorporation of physical soil variables is fundamental for interpreting fluxes measured via EC[fl] and gas chambers. As minor variations in water content or pore structure can trigger significant changes in redox conditions and, consequently, in the production and consumption of gases, this analysis is designed to integrate hydrological, physical, and mechanical soil variables across various spatial and temporal scales. This enables the robust correlation of internal ecosystem dynamics with observed atmospheric fluxes.
The measurements encompassed continuous hydrological variables (Water Table Depth, Soil Water Content, and Soil Temperature[fm]) alongside physical analyses aimed at characterizing bulk density, mechanical behavior, and structural soil properties. Additionally, biogeochemical indicators associated with the redox state and anaerobic conditions of the soil profile were incorporated.
2.8.1 Soil Hydrological Conditions
Soil hydrological conditions were continuously monitored due to their central role in regulating biogeochemical processes and greenhouse gas fluxes in wetlands. Variables such as water table depth, soil water content, and temperature—which control oxygen availability and pore connectivity—were considered in order to understand the development of aerobic and anaerobic environments within the soil profile.
         * Groundwater level and Water Table Depth (WTD) were continuously logged at various representative locations within the study site. 
         * Soil Water Content (SWC) was monitored at precise vertical depths of 5 cm, 20 cm, and 50 cm. These measurements allowed for the quantification of the degree of soil saturation and the assessment of the temporal dynamics of water storage—particularly during precipitation events, dry periods, and rewetting phases. 
         * Soil temperature (TS) was concurrently recorded at discrete vertical depths of 5 cm and 50 cm. These variables were considered relevant due to their direct influence on microbial metabolic rates, water viscosity, and the kinetics of biogeochemical processes associated with greenhouse gas production and oxidation.

Within the analytical pipeline, these thermal and hydrological measurements served three fundamental purposes. First, from a thermodynamic perspective, the temperature gradients were coupled with three Hukseflux HFP01SC Soil Heat Flux plates to track vertical heat propagation and calculate the ground heat storage component (G), a prerequisite for closing the ecosystem's Energy Balance. Second, for carbon flux partitioning, the TS series acted as the primary independent variables to model Ecosystem Respiration ($R_{eco}$) using the temperature-dependent Lloyd-Taylor empirical function. A diagnostic evaluation comparing the highly volatile surface temperature (5 cm) against the thermally buffered deep soil temperature (50 cm) was conducted to accurately identify the true thermal driver of deep-peat biological respiration and to prevent methodological biases in the cumulative carbon budgets. Finally, these temperature horizons—alongside the SWC and absolute GWL—were incorporated as critical predictive features for training the Machine Learning algorithms (Random Forest and Artificial Neural Networks). This allowed the advanced models to capture and gap-fill non-linear $CO_2$ and $CH_4$ flux responses to ecohydrological stress.

To provide a comprehensive view of the site's hydrology, the raw water-level measurements from individual loggers were aggregated into 30-minute means to synchronize with the EC timestamps. Missing or erratic values were linearly interpolated. To characterize both the overall site trend and spatial variability, the data was processed to calculate the spatial mean across all loggers alongside its standard deviation (±1 SD). This exploratory dataset was aligned with the high-resolution SWC measurements at 5 cm depth to evaluate surface-subsurface hydrological connectivity. The hydrological variables were temporally integrated with gas flux measurements obtained via EC and static chambers, enabling the interpretation of atmospheric fluxes as emergent responses to physical and redox changes occurring within the wetland soil.
2.8.2 Soil Stratigraphy
Soil stratigraphy refers to the vertical characterization of soil horizons, detailing the physical, chemical, and structural properties of layers that have formed over millennia. In peatland ecosystems, stratigraphic profiling is particularly relevant because organic soils are not physically homogeneous; they possess distinct degrees of decomposition, bulk densities, and hydraulic conductivities across their depth. 
These stratigraphic variations act as the architectural framework that dictates where the groundwater table perches, how rapidly water moves through the profile (capillary rise and drainage), and ultimately, whether the buried carbon remains preserved under anaerobic conditions or is exposed to aerobic decomposition.
To contextualize the severe hydrological latency observed in the EC footprint, physical soil profiles were analyzed. Stratigraphic profiling up to a depth of 5 meters (ets_04) revealed a deep peat profile transitioning into mineral substrates (Tu2). 
By mapping biometeorological sensor depths against this stratigraphic column, it becomes physically clear why the 5 cm sensor is hyper-reactive to atmospheric drivers as it sits within the highly degraded, porous, and agriculturally disturbed topsoil. 
In contrast, the 50 cm sensor, located at the boundary of dense, highly decomposed, and permanently saturated peat horizons (IIIhHr and IVnHr) exhibits extreme thermal inertia and limited gas diffusivity. 
Understanding this stratigraphic heterogeneity is essential to explain why surface greenhouse gas fluxes can sometimes decouple from deep subsurface hydrology.
2.8.3 Soil physical properties and pore functionality
The physical properties of the soil were evaluated to be able to characterise the porous structure and the conditions for water and gas transport within the peatland profile. Variables such as bulk density, porosity, and the functionality of the pore system serve as fundamental indicators for interpreting the biogeochemical dynamics of the ecosystem.
These characteristics were determined by extracting samples of known volume using metal cylinders or soil cores. 
Wallener Au and Ekel sites were sampled in a total of 4 different areas and heights: “EK 0-5”, “WA 0-5”, “WA 25” and “WA “25-35”, making the names reference to the height in centimeters on which the samples were extracted. The processing process of the samples was carried at the Laboratory of Soil Analysis from CAU under the supervision of Mr. Josef Rode as it follows[fo].
The samples were first weighted, rewetted and loaded to pF[fp] 1.8. The loading at pF 1.8, is the process by which the soil sample has been drained to the water status corresponding to this particular level of water pressure. At pF 1.8, the soil has been drained to what is commonly treated as field capacity in many soil science conventions, meaning the sample still contains some water, but the easily drainable water has left the large pores (ref.). 
This value represents the base-10 logarithm of the suction pressure measured in centimeters of a water column, a logarithmic way of expressing how tightly water is held in the soil: the higher the pF, the drier the soil (ref.). 

Therefore, 60 centimeters of water column equals 60 hPa. After rewetted[fq], they are taken out of water and after some time weighted before measuring their air conductivity. Air conductivity is measured before the pressure-settling[fr] tests. The sample was mounted in the pressure chamber and sealed with a rubber gasket using a clamping device to prevent air leakage. Compressed air was then introduced into the system, generating an overpressure beneath the sample that depended on its air conductivity. 
The resulting pressure difference was monitored with a water manometer and adjusted to a constant value of 1 cm H₂O (≈1 hPa). Under steady-state conditions, the airflow rate was recorded from the rotameter. Ambient air pressure and room temperature were measured prior to testing to correct for air density variations. 
  
[fs]
	Figure, Laboratory air permeameter | Used to determine the air conductivity of soil samples. Numbered components: (1) compressed air supply, (2) flow meter (rotameter), (3) shut-off valve, (4) float, (5) air line to soil sample, (6) measurement station with pressure chamber, (7) perforated plate, (8) rubber seal, (9) clamping device, (10) sampling cylinder, (11) water-filled pressure vessel (manometer), and (12) burette with measuring scale. Translated from Peth, S. (2004).
The air conductivity coefficient was subsequently calculated using the following equations:
         * Air Density $\rho_{air}$:

$$\rho_{air} = \frac{P_{atm}}{R_{spec} \cdot T}$$

         * Air Conductivity $K_a$:

$$K_a = \frac{Q \cdot \eta_{air} \cdot L}{A \cdot \Delta P}$$

Being the constants and variables used for the calculations the following:
m f[ft]
	Weight of the cylinder samples of the water-saturated soil
	𝑉 g
	cylinder volume, expressed in g cm⁻³
	m FK
	Weight of the soil drained to pF 1.8
	F 
	Air Flux through the pores
	m t
	Soil weight in the dry state 
	Δ
	Air Gradient
	A p
	Air Pressure
	T
	Temperature
	A
	Cross-sectional area of the soil sample
	ρl 
	Air Density
	g
	Gravity acceleration
	l
	Length of the sample through which the air flowed
	∆V
	Volume of air flowing through the sample during ∆t interval
	∆p
	Applied flow pressure
	These variables enabled the assessment of structural changes associated with compaction, physical degradation, and porosity loss in drained and rewetted areas. The Compaction process and the Casagrande Method used to obtain the precompression curves will be further explained in the following section.
Once the samples are compressed (check following section), the samples were dried in the laboratory at a controlled temperature of 105°C until a constant weight has been reached, allowing the ratio calculation between the dry mass and the total soil volume.
  

	Figure, Moisture content of soil with oven and dry method | Extracted from Geotech with Naqeeb (2022).
	Total porosity was estimated based on bulk density and particle density, allowing for the quantification of the proportion of soil volume occupied by pore spaces. Additionally, the differential functionality between macropores and micropores was taken into account, given that both fulfill distinct roles in the transport of water and gases. Macropores facilitate the rapid movement of air and water, whereas micropores favor water retention and the persistence of saturated conditions(ref.).
TPV and WCP are determined by weighing the cylinder samples of the water-saturated soil $m_f$ and the soil drained to pF 1.8 $m_{FK}$, as well as the soil weight in the dry state $m_t$. Both TPV and WCP (and Dry Bulk Density $\rho_b$) depend on these masses and cylinder volume ($V_{\text{cylinder}}$):

         * Dry Bulk Density ($\rho_b$):
$$\rho_b = \frac{m_t}{V_{\text{cylinder}}} \quad \left[\text{g cm}^{-3}\right]$$
Dry bulk density can be classified into five categories, ranging from "very low" to "very high"; where higher values represent dense soil with lower pore volume (Table 68, KA5 Ad-hoc Working Group Soil 2005; Rode J., 2024).

         * Total Pore Volume (TPV):
$$\text{TPV} = \left( 1 - \frac{\rho_b}{\rho_s} \right) \times 100 = \left( \frac{m_f - m_t}{V_{\text{cylinder}} \cdot \rho_w} \right) \times 100 \quad [\%]$$
Total pore volume is calculated from wide and narrow pores (or coarse pores) and the medium and fine pores, assuming a particle density $\rho_s \approx 1.5\text{--}1.6\,\text{g cm}^{-3}$ for organic-rich peat substrates.

         * Wide Coarse Pores (WCP / Air Capacity at pF 1.8):
$$\text{WCP} = \left( \frac{m_f - m_{FK}}{V_{\text{cylinder}} \cdot \rho_w} \right) \times 100 \quad [\%]$$
The Wide Coarse Pores represents Air Capacity ($K_a$), precisely quantifying the volumetric fraction of macropores ($> 50\,\mu\text{m}$, drained at suction pressures $< \text{pF } 1.8 \approx 60\,\text{hPa}$). Peat soils, groundwater soils, or gley soils are often severely impaired in WCP when overconsolidated. 
The tables with the complete data are available in a XLSX format; some included at the end of the present work and the rest available in the drive disposed for the thesis and available for the readers of the present work once they have the authorization from the co-supervisor Mr Sebastian Jordan. 
The format of the tables is in general something similar to this
INDEX
	Different stages
	m/g
	KL 
	Brutto
	Tara: Gummi, Papier or Sand
	Flux l/min
	Gradient (hPa)
	t °C[fw]
	Air pressure (hPa) 
	This is valid for the two sections under pF 1.8, but KL [fx]is not available, as its variables were not measured (because it was not necessary), for the original, just rewetted or dried samples.
The samples presented some difficulties so the post processing was important. That's why, in the XLSX file, the original situations are registered as comments for weights and air conductivity situations emerging.[fy]
The differing Tara was corrected so the weights section on the tables reflects only “Brutto” and “Tara”, whatever Tara it is. A summary of these original situations and its comments, which were corrected in order to make the work simpler at .R can be found at the following table.[fz]
Samples[ga]
	Pre Compr. Brutto
	Tare
	Post Compr. Brutto
	Tare
	Dry Brutto
	Dry Tare
	EK0-5
	OK
	+Rubber Filter and SAND
	OK
	— — — —
	“All”
	Filter
	WA0-5
	OK
	+ SAND
	“All”
	

	OK
	Filter and Sand
	WA25
	OK
	Without Filter or Band
	OK
	— — — —
	OK
	Filter
	WA25-35
	OK
	— — — —
	OK
	— — — —
	Filter Gummi
	— — — —
	When the cylinder was too big for the shrank sample, it was impossible to measure its air conductivity. In the case that was just a bit shrank, some sand could be added in order to maintain attached the sample to the cylinder, this is registered in the XLSX file and also considered for the weighting in the previous section.
Samples[gb][gc]
	KL
	Gradient
	EK0-5
	4/8 Available
	4/8 Available
	WA0-5
	X None
	X None
	WA25
	8/8 Available
	8/8 Available
	WA25-35
	8/8 Available
	8/8 Available
	2.8.4 Soil mechanical behavior
The mechanical behavior of the peatland’s soil was evaluated to characterise its susceptibility to compaction and structural deformation processes; particularly in drained sectors.
For this purpose, controlled compression procedures were conducted using the same samples from the previous section. Progressive load was applied using a compression system at the Laboratory of Soil Analysis from CAU under the supervision of Mr. Josef Rode.[gd] The changes in volume or deformation associated with each level of applied pressure were recorded and are available in the section of results and also in the Drive available for the reader with previous authorisation. 
  

	Figure, Multistep pressure-setting system | For soil hydraulic and mechanical testing, used to determine the soil water retention curve. Numbered components: (1) spindle drive and force transducer, (2) displacement transducer, (3) sintered metal plates, (4) soil sample, (5) ceramic tensiometer, (6) water tension pressure transducer, and (7) control unit with data logger. Translated from Fazekas, O. (2005).
	One‑dimensional oedometer tests were performed on the peat samples following standard procedures. The vertical deformation (settlement) was recorded continuously during each loading stage. From the raw measurements, the vertical strain εv can be obtained as:
[ge]
Where ΔH is the measured settlement and H0 is the initial sample height. 
Based on these tests, compression curves were constructed. The curve, and the preconsolidation stress σ'vm was obtained using the Casagrande method (1937) and following the work of Rode, J. H. (2024) & Pelz G. (2010), describing the relationship between applied stress and soil deformation. 
These curves enabled the identification of distinct mechanical behavior, including stages of elastic deformation and irreversible compaction processes associated with the collapse of the porous structure. 
One of the primary parameters derived was the preconsolidation stress curve, which indicates the maximum historical load the soil can withstand without undergoing permanent deformation. This parameter served as an indicator of the soil's mechanical strength and structural stability in the face of physical disturbances. 
  

	Figure, Former consolidation stress σ'vm | Determined according to Casagrande (1937). Extracted from Pelz, G. (2010).
	The procedure for each compressibility curve e – log σ'v consisted on:
         1. Plot Water Tension (and settlement) and Normal Stress (log σ'v ) using excel sheets provided by Mr Josef Rode which made use of log files transferred by pilatos log browser software.
         2. Identify the point of maximum curvature on the curve.
         3. Draw the tangent to the virgin compression line at that point.
         4. Draw a horizontal line from the same point.
         5. Construct the bisector of the angle between the tangent and the horizontal line.
         6. Extend the straight‑line portion of the recompression branch (the flatter part at low stresses) until it intersects the bisector.
         7. Read σ'p as the stress value at the intersection.
For peat, when the virgin compression line slope was ambiguous, the gentlest slope (closest to horizontal) was selected to avoid overestimation.




Correction of a systematic data‑extraction error[gf]
During the initial processing of the oedometer results, a systematic error was discovered in the spreadsheet‑based evaluation. In the “Berechnung” worksheet, the formulas that extract the effective stress (column E), settlement (column F) and script commands (column G) from the raw data sheet (“Originaldaten”) used an incorrect target value (sollwert). For a nominal applied pressure of e.g., 10 kPa (column C), the search function looked for "*Sollwert=10*" when it should have looked for "*Sollwert=20*". Consequently, the stress and settlement values were shifted by one loading step, and the 100 kPa loading stage was missing from the curves.
The correction was implemented as follows:
         * For all loading steps from 10 kPa to 70 kPa, the searched sollwert in columns E, F and G was increased by +10 kPa.
Example (for the nominal 20 kPa step, row 11):
            * Original: "*Sollwert=20*"
            * Corrected: "*Sollwert=30*"
            * The 200 kPa step (which uses a different formulation) was left unchanged.
            * After modifying the formulas, the effective stress and settlement values were automatically reassigned to the correct loading stages, and the 100 kPa step appeared properly.
Once the correction was applied to all test files, the preconsolidation pressure was recalculated for each curve using Casagrande’s method as described in section 2. The corrected σ'p values were subsequently used in the settlement and bearing capacity analyses.
	The experiments also enabled the assessment of potential changes in the functionality of the porous system resulting from compaction. A reduction in macropore volume can limit air and water circulation within the soil profile, thereby modifying oxygen diffusion and altering the redox conditions responsible for the production and consumption of GHG (ref.).
The mechanical characterization of the soil was integrated with hydrological variables and gas flux measurements, allowing for an analysis of how the physical properties of the profile influence the dynamics of CO₂ and CH₄ in wetlands undergoing drainage and hydrological restoration processes.[gg]
2.9 Uncertainty Analysis
Finally, uncertainty analysis assesses the propagation of errors associated with measurement, processing and modeling. In environmental cases where natural variability is high as it is on peatlands or at least with these peatlands; explicit quantification of uncertainty is essential for interpreting the significance of the results and eventually, for informing management decisions and climate policies (Richardson et al., 2011). Analytical techniques to determine the uncertainties, including those created by gap-filling procedures, can be done using Monte-Carlo and other methods, but these are not required if the tools described above have been used for gap-filling (Burba, 2025).
To systematically address the uncertainty in this study it got partitioned into the following domains:
Statistic variability
Statistical variability inherent to the turbulent nature of the ABL and the manual sampling of chambers. For the static chambers, this was quantified as the standard error (SE) between spatial replicates. For the continuous EC data, random uncertainty was dynamically minimized by the strict QC = 0 (but checked with the other QC also) [gh]filtering applied during phase 2 of the workflow.
Systematic Uncertainty 
Instrumental and methodological biases, such as the under-sampling of nighttime respiration under stable atmospheric conditions, or the failure to capture horizontal heat advection. This systematic uncertainty is explicitly evaluated through the EBC fraction and addressed via the mandatory friction velocity (u∗) filtering.
Error Propagation (Annual scale) 
To evaluate uncertainty at the annual scale, errors from independent datasets must be mathematically propagated. As detailed in the previous section, the standard errors from the individual GHG chamber measurements ([gi]CH4 and [gj]N2O) were propagated using quadrature (the square root of the sum of squares) to establish the upper and lower statistical zones of the final Net Ecosystem GHG Balance.[gk]
Sensitivity to Processing Choices [gl]
Because algorithmic gap-filling and threshold selections inherently alter the final carbon budget, sensitivity analyses were conducted on key processing choices. Specifically, the sensitivity of the cumulative budget to the u∗ threshold filter (comparing strict vs relaxed QC flags) and the fundamental choice of the gap-filling driver (comparing Model A's purely temperature-driven Lloyd-Taylor model against Model B's multi-variate MDS algorithm) were evaluated to transparently report algorithmic variance.
Empirical Visualization of Uncertainty[gm]
Rather than treating uncertainty as a purely theoretical statistical constraint, this thesis explicitly integrates error analysis into the graphical reporting of the Results chapter. This approach was chosen to transparently communicate the confidence intervals of the calculated carbon sink to future modelers and land managers. Specifically, the uncertainties described above were translated into the following visual proofs:
            1. Spatial Error Bars: The propagated spatial variance of the manual GHG chambers (SENet​) is visually superimposed as explicit error bars on the final Global Warming Potential (GWP) bar charts, directly bounding the "best-case" and "worst-case" scenarios for the net greenhouse gas impact.
            2. Systematic Bias Scatter: The systematic instrumental bias is visually diagnosed through the EBC scatter plots, explicitly quantifying the unclosed energy fraction of the EC tower.
            3. Algorithmic Divergence: The uncertainty stemming from processing choices is demonstrated via the Cumulative NEE Budget time-series. By plotting multiple gap-filling models simultaneously, the divergence between the trajectories visually quantifies the structural error introduced by algorithmic gap-filling during periods of sensor failure.




















III. R E S U L T S
To evaluate the complex dynamics of the agricultural ecosystem, the results are presented using a deliberate visual-analytical framework. Distinct types of graphs are employed, each mathematically and conceptually tailored adn suited to highlight specific spatial, temporal, or physiological relationships.
  

Table, Visual Strategy | Plot types used on the thesis work. 
