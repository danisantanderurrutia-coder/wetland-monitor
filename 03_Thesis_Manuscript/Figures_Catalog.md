# Graphic Curation Registry & Thesis Draft (CH4 & ML Integrated)

This document contains the presentation, figures, and descriptions for each plot as per the Graphic Curation Standard, deeply rooted in the researcher's observational narrative (*Enfoque Persona*). 

---

## 1. Analytical Pipeline: Plot Types and Usages

The Kiel Code orchestrator generates specific archetypes of plots, each deployed at a distinct stage of the analysis to answer specific questions:

1. **Diagnostic Scatter Plots & Regressions:** Used during the gap-filling phase (e.g., GPP/Reco curves, Energy Balance Closure). They plot measured fluxes against environmental drivers to validate the mathematical models (Lasslop/Lloyd-Taylor, and now Machine Learning). 
2. **Time-Series Footprints (Chronologies):** Used as the core timeline of the ecosystem (e.g., Daily Carbon Budgets, Water Levels). They display the continuous chronological evolution of fluxes and variables over the entire study period.
3. **Spatial & Depth Profiles:** Used to discard time in favor of physical space. Depth profiles (Z-axis) show soil physical gradients, while spatial maps (X/Y-axis) show topography and carbon distributions.
4. **Syntheses & Bar Charts:** Used at the final stages (e.g., GHG Balance 100y/20y) to collapse massive amounts of high-frequency temporal data into single, comprehensive "bottom-line" figures for climate mitigation status.

---

## 2. Description of Generated Figures (*Enfoque Persona*)

### 2.1 Topography and Spatial Context

![Topography](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/SiteMap_Topography.png)
**Figure 1: Digital Elevation Model (DEM) of the study area.**
* **Variables Used:** Elevation (z).
* **Enfoque Persona:** We start by standing on the site. Topographically, the field sits in a depression. This basin acts as a cold-air drainage sink, physically explaining the severe nocturnal atmospheric decoupling we later see in the friction velocity ($u^*$) filtering.

![Soil Carbon](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/SiteMap_SoilCarbon.png)
**Figure 2: High-resolution spatial mapping of Soil Organic Carbon (SOC).**
* **Variables Used:** SOC density (kg/m³).
* **Enfoque Persona:** Looking down at the soil beneath our feet, we confirm the site is a carbon hotspot. This near-unlimited density of organic substrate is the fuel source for the massive historic $CO_2$ oxidation and the episodic methanogenesis.

![Summer NDVI](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/SiteMap_NDVI_Summer.png)
![Delta NDVI](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/SiteMap_NDVI_Delta.png)
**Figure 3: Sentinel-2 Multispectral Vegetation Dynamics.** *(Left)* Peak summer Vegetation Vigor (NDVI). *(Right)* Delta NDVI comparing November vs January, highlighting intra-annual vegetation changes.
* **Variables Used:** Normalized Difference Vegetation Index (NDVI) from Near-Infrared and Red bands.
* **Enfoque Persona:** We look up from the soil to the dynamic canopy. The summer snapshot maps the "photosynthetic engine" of the ecosystem at peak capacity. But this ecosystem breathes and changes; by contrasting the quiet of January with the lingering biological activity of November, the delta map reveals the spatial shifting of vegetation cover—perhaps winter cover crops or delayed senescence—showing how the farm reacts dynamically to the changing seasons over the landscape.

![Climate Diagram](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/Walter_Lieth_NASA.png)
**Figure 4: Walter-Lieth climate diagram (1999-2023).**
* **Variables Used:** Temperature (T2M), Precipitation (PRECTOTCORR).
* **Enfoque Persona:** We look back in time. This 25-year baseline shows the occurrence of dry vs. humid periods. When the red temperature curve exceeds the blue precipitation curve, the ecosystem suffers drought stress, suppressing its "breath" (respiration and photosynthesis).

### 2.1b Climate and Meteorological Context

![Figure: Walter Lieth Climate Diagram](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/24_Walter_Lieth_2024.png)
**Figure 5: Walter-Lieth Climate Diagram for 2024 (Kiel-Altenholz / Erfde DWD).**
* **Variables Used:** Monthly Precipitation (P) from DWD and Monthly Mean Air Temperature (TA) from the tower.
* **Enfoque Persona:** We set the climatic stage. By comparing the precipitation and temperature regime of 2024 against historical baselines, we contextualize the hydrological stress and driving weather patterns that dictate the ecosystem's carbon fluxes for the year.

### 2.2 Footprint and Data Quality

![Figure: Footprint Composite](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/17_19_Combined_Footprint.png)
**Figure 6: Spatial mapping of the Eddy Covariance footprint.**
* **Variables Used:** Footprint peak distance ($x_{peak}$), Wind Direction.
* **Enfoque Persona:** Here we visualize the actual "field of vision" of our tower. Seeing that the fluxes originate primarily from within 100-300 meters confirms that our measurements are pure and represent the cropland surface without contamination from nearby forests or roads.

![Figure: Energy Balance Closure](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/13_Energy_Balance_Closure_v2.png)
**Figure 7: Energy Balance Closure.**
* **Variables Used:** Turbulent fluxes ($LE + H$), Available energy ($R_n - G$).
* **Enfoque Persona:** We mathematically check the physics of the site. A strong correlation here (R²=0.94) gives us the confidence that our instruments captured the vast majority of the energy exchange, validating all subsequent carbon flux assumptions.

![Figure: QC Flag Comparison](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/12_QC_Flag_Comparison.png)
**Figure 8: Reduction of the raw CO2 dataset after quality flags.**
* **Variables Used:** Percentage of retained vs discarded data blocks for CO2.
* **Enfoque Persona:** This highlights the harsh reality of Eddy Covariance field work for CO2. We must aggressively discard large chunks of data corrupted by the topography's cold air drainage in order to find the true, undistorted ecological signal.

> [!NOTE]
> **Figure 9: Reduction of the raw CH4 dataset after quality flags.**
> Contrastaremos los flags del LI-7700 (CH4) con los del LI-7500 (CO2). El LI-7700 es más sensible a la lluvia y a espejos sucios.
> **Enfoque Persona:** Al mirar los datos del metano, nos enfrentamos a un instrumento más delicado (LI-7700). Veremos cuánta señal sobrevive a las inclemencias físicas (lluvia, suciedad) en comparación con el CO2, revelando los desafíos únicos de rastrear metano en un humedal.

### 2.3 Soil Hydrology and Thermodynamics

![Figure: Soil Stratigraphy](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/24_Soil_Stratigraphy_Wallen_Combined.png)
**Figure 10: Soil Profile and Stratigraphy at Klimafarm Wallen.**
* **Variables Used:** Soil horizons, depths, and material types (Peat vs Mineral).
* **Enfoque Persona:** Visualizing the physical structure of the peatland. The deep profile on the left demonstrates the extensive historical accumulation of peat down to 4.5 meters. The red bounding box highlights the top 1.2 meters, zoomed in on the right, which is the active zone where our temperature sensors (5, 25, 50 cm) are installed. This emphasizes that our measurements are capturing the dynamics entirely within the organic peat horizons, crucial for understanding GHG fluxes.

![Figure: Water Level](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/11_Water_Level.png)
**Figure 11: Groundwater levels and soil water content dynamics.**
* **Variables Used:** Groundwater Level (m), Volumetric Water Content (%).
* **Enfoque Persona:** We watch the ecosystem dehydrate. The groundwater table plunges during the summer dry spells. The surface soil rapidly decouples from the deeper saturated zones, representing a severed capillary connection.

### 2.4 Ecohydrological Time Series

![Figure: Contenido de Agua en el Suelo (SWC)](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/10_Soil_Temp_SWC.png)
**Figure 12: Soil Water Content dynamics.**
* **Variables Used:** Volumetric Water Content (SWC) across depths.
* **Enfoque Persona:** Capturing the moisture state of the different soil horizons before and after inundation.

![Figure: Depth Profiles TS](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/18_Depth_Profile_TS.png)
**Figure 13: Depth profiles showing heat propagation.**
* **Variables Used:** Soil Temperature (TS) across depth gradients.
* **Enfoque Persona:** Notice the thermal delay. While the surface experiences extreme seasonal swings, the deep soil is insulated. This thermal buffer is critical for deep-soil microbiology, which continues respiring even when the surface is hostile.

![Figure: Spatial Variance SHF](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/19_Spatial_Var_SHF.png)
**Figure 14: Soil Heat Flux (SHF) micro-site variance.**
* **Variables Used:** Soil Heat Flux at multiple plates.
* **Enfoque Persona:** We see that the soil is not uniform. The different amplitudes recorded across the field prove that heat conduction is highly localized, dictated by micro-variations in moisture and compaction.

> Aquí incluiremos un panel que contraste los residuos y R² de los modelos clásicos (MDS, Lloyd-Taylor empírico) frente a los modelos de Machine Learning (Random Forest y Artificial Neural Networks).
> **Enfoque Persona:** Nos cuestionamos nuestros propios métodos. ¿Podemos predecir mejor la respiración y las emisiones de CH4 si dejamos que una red neuronal interprete las complejas interacciones no lineales entre humedad y temperatura, en lugar de forzar una ecuación empírica rígida? En la búsqueda de la verdad ecológica, el algoritmo debe adaptarse al humedal, no el humedal al algoritmo.

![Figure: Ecosystem Respiration LT Fits](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/01_Reco_LT_Fits.png)
**Figure 15: Temperature-dependent Lloyd-Taylor fits for Ecosystem Respiration.**
* **Variables Used:** Nighttime NEE, Soil Temperature (TS_5cm vs TS_50cm).
* **Enfoque Persona:** This is the ecosystem exhaling in the dark. The plot isolates nocturnal carbon emissions, capturing the exponential relationship between heat and biological respiration.

![Figure: Gross Primary Productivity MM Fits](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/02_GPP_MM_Fits.png)
**Figure 16: Light-dependent Michaelis-Menten fits for Gross Primary Productivity.**
* **Variables Used:** Daytime NEE, Global Radiation (Rg).
* **Enfoque Persona:** This is the canopy inhaling sunlight. It isolates daytime photosynthetic capacity, showing how the canopy's maximum assimilation limit shifts as the crop grows through the seasons.

![Figure: NEE Models Comparison](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/07b_NEE_Models_Comparison.png)
**Figure 17: Multi-model comparison of interpolated NEE data (Raw Data + Gap-filling Models).**
* **Variables Used:** NEE Raw data overlaid with MDS, LT_5cm, LT_50cm, and Machine Learning curves.
* **Enfoque Persona:** We stitch the timeline back together. By laying our mathematical models over the raw data points, we observe the divergence of assumptions. When there is no real data to anchor the models, the different mathematical pathways drift apart, revealing the uncertainty inherent in gap-filling.

![Figure: CH4 ML Model Performance](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/14b_CH4_Models_Comparison_v6.png)
**Figure 18: Metano: Artificial Neural Networks vs Random Forest frente a flujos reales.**
* **Variables Used:** FCH4 raw data overlaid with Random Forest and Artificial Neural Network predictions.
* **Enfoque Persona:** Observamos cómo los algoritmos intentan domar el caos del metano. Las explosiones de CH4 (ebullición) son difíciles de modelar con física clásica, revelando la ventaja del Machine Learning para predecir el comportamiento biológico del fango.

![Figure: Respiration 5cm vs 50cm](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/08b_Respiration_5cm_vs_50cm_v3.png)
**Figure 19: Deep vs Shallow Soil Temperature as a Respiration Proxy.**
* **Variables Used:** Reco against TS 5cm and TS 50cm.
* **Enfoque Persona:** The illusion of the surface. During the drought, the hot, dry surface suggests no respiration, but the deep, moist soil continues to breathe. Using surface sensors drastically miscalculates the true carbon loss.
<span style="color:red">**Nota Metodológica:** ¿Por qué aquí usamos solo CO2 y no CH4 o cámaras? La Respiración del Ecosistema ($R_{eco}$) graficada aquí es el proceso aeróbico de liberación de CO2, el cual sigue una curva física empírica de temperatura (Lloyd & Taylor). Por el contrario, el Metano (CH4) se produce por vías anaeróbicas que dependen drásticamente de la inundación, el nivel del agua y el potencial redox, no de una simple curva exponencial térmica. Además, esta figura usa datos continuos de Eddy Covariance de todo el paisaje para ajustar la curva base de respiración que usamos luego en el gap-filling de CO2, mientras que las cámaras son muestreos episódicos locales.</span>

![Figure: Daily Carbon Budgets](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/08_NEE_Daily_Budgets.png)
**Figure 20: The Daily Carbon Budgets of the Ecosystem (CO2).**
* **Variables Used:** NEE (Net), GPP (Photosynthesis), Reco (Respiration).
* **Enfoque Persona:** This is the ultimate chronological pulse. It shows the daily battle between carbon fixation (plants) and carbon release (soil/biomass), allowing us to track exactly when the site transitions between a sink and a source.

![Figure: Daily Methane Budgets](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/16b_CH4_Daily_Budgets_v3.png)
**Figure 21: The Daily Methane Budgets of the Ecosystem (CH4).**
* **Variables Used:** Daily cumulative CH4 emissions vs Water Table Depth (WTD).
* **Enfoque Persona:** Separado del ruido del CO2, aislamos la respiración anaeróbica del humedal. Esta cronología nos permite ver el instante exacto en que la dinámica de la mesa de agua detona la liberación del metano acumulado.

![Figure: Cumulative Carbon Budgets](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/17_Cumulative_Budgets_Methodologies_v3.png)
**Figure 22: Cumulative carbon budgets diverging according to model methodology.**
* **Variables Used:** Cumulative Sums of NEE over the year under different models (MDS, LT_5cm, LT_50cm).
* **Enfoque Persona:** This visualizes the danger of methodological choices. The physical reality of the site's total carbon sink/source status for the year completely splits based solely on whether we used the incorrect shallow depth (5cm) or the correct deep soil (50cm) temperatures to gap-fill the data. 

### 2.5 The Bottom Line: Global Warming Potential

![Figure: GHG Balance Pre vs Post](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/18_GHG_Balance_Pre_vs_Post_NEW.png)
**Figure 23: The Paradigm Shift: CO2-only Balance vs Total GHG Balance.**
* **Variables Used:** CO2 flux vs CO2+CH4+N2O flux (in CO2-equivalents).
* **Enfoque Persona:** We experience a paradigm shift. We realize that looking only at CO2 creates a dangerously false narrative of climate mitigation. Adding the trace gases completely reverses the site's polarity.

![Figure: Chamber vs EC CrossValidation](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/20_Chamber_EC_CrossValidation_v3.png)
**Figure 24: Cross-Validation: Eddy Covariance CH4 vs Chamber CH4**
* **Variables Used:** EC CO2 flux vs Chamber CO2 flux.
* **Enfoque Persona:** Hacemos zoom desde la perspectiva panorámica de la torre hacia los micro-ambientes confinados en las cámaras. Contrastar la torre continua frente a los pulsos de la cámara revela si los "hotspots" locales de las cámaras están sobre-estimando el impacto real a nivel del paisaje.

![Figure: GHG Stacked Bars (100-y GWP)](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/21_GHG_Balance_100y_v6.png)
**Figure 25: Integrated GHG Balance (100-year horizon).**
* **Variables Used:** CO2-equivalents for Methane (CH4), Nitrous Oxide (N2O), and Carbon Dioxide (CO2).
* **Enfoque Persona:** The final judgment. We zoom out to view the total climatic impact. By seamlessly integrating the continuous background heartbeat of the ecosystem (Tower lines) with the episodic pulses of the Chambers (stacked bars) on the exact days they were measured, we directly contrast the net carbon sink measured by the tower against the massive greenhouse gas emissions triggered by the wetland restoration, captured by the chambers.

![Figure: GHG Stacked Bars (20-y GWP)](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/22_GHG_Balance_20y_v6.png)
**Figure 26: Integrated GHG Balance (20-year horizon).**
* **Variables Used:** CO2-equivalents (20-year GWP) for Methane (CH4), Nitrous Oxide (N2O), and Carbon Dioxide (CO2).
* **Enfoque Persona:** The short-term shock. CH4 hits much harder over 20 years. Here we realize the immediate, acute warming effect of restoring this peatland without considering short-term methane bursts, comparing the continuous daily tower fluxes with the discrete chamber pulses.

### 2.6 Ecohydrological Stress Responses

![Figure: Ecosystem WUE](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/14_Ecosystem_WUE_v2.png)
**Figure 27: Time series of Ecosystem Water Use Efficiency (eWUE).**
* **Variables Used:** eWUE (Assimilated Carbon / Transpired Water).
* **Enfoque Persona:** We observe the plants struggling to breathe. As summer droughts hit, the efficiency of the ecosystem collapses epidosically, demonstrating severe physiological stress.

![Figure: Bowen Ratio](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/16_Bowen_Ratio.png)
**Figure 28: Daily Bowen Ratio (H/LE).**
* **Variables Used:** Bowen Ratio ($\beta$).
* **Enfoque Persona:** We track the cessation of transpiration. The abrupt spikes of the Bowen Ratio above 1.0 indicate periods where the plants forcibly shut their stomata, shutting down the cooling mechanism of latent heat.

![Figure: GPP vs VPD](/Users/danielsantander/.gemini/antigravity/brain/61ce8293-9a28-4938-916f-67e1fecf2c0c/15_GPP_vs_VPD_v2.png)
**Figure 29: Photosynthesis limitations due to atmospheric dryness.**
* **Variables Used:** GPP, VPD (hPa).
* **Enfoque Persona:** We define the physical limits of the canopy. As atmospheric drought (VPD) climbs to extreme levels, photosynthesis (GPP) hits a hard ceiling and collapses, demonstrating a strict physiological capping effect.

### 2.7 Gap-Filling Methodologies (Summary Tables)

The following tables summarize the different gap-filling approaches implemented across the data processing pipeline, detailing the target variables, the methods used, and the driving predictors.

#### Table 1: Biometeorological Data Gap-Filling
| Target Variable | Method / Algorithm | Primary Predictors / Reference Data | Description |
| :--- | :--- | :--- | :--- |
| **TA** (Air Temp) | External Imputation & MDS | DWD Station (Westerheversand) | Missing values are gap-filled using linear regression models built from nearby external meteorological stations, followed by MDS. |
| **SW_IN** (Radiation) | External Imputation & MDS | DWD Station (Westerheversand) | Shortwave incoming radiation is gap-filled using external station data. |
| **TS_5cm**, **TS_20cm**, **TS_50cm** | Proxy Linear Modeling & MDS | Cross-depth TS correlations | Missing soil temperatures at specific depths are imputed using linear regressions against other functioning soil depths (e.g., predicting 50cm from 20cm). |
| **SWC** (Soil Water) | Linear Interpolation | Temporal adjacent values | Minor gaps in soil water content are filled using linear interpolation over time due to its slow-changing nature. |
| **VPD** (Vapor Pressure) | Calculated / MDS | Gap-filled TA and RH | Calculated directly from gap-filled air temperature and relative humidity. |

#### Table 2: Carbon Dioxide (CO₂) Flux Gap-Filling (NEE)
| Target Variable | Method / Algorithm | Primary Predictors | Description |
| :--- | :--- | :--- | :--- |
| **NEE** (MDS) | Marginal Distribution Sampling | SW_IN, TA, VPD | A standardized Fluxnet approach that fills missing NEE by looking for similar meteorological conditions within a moving time window. |
| **Reco** (Lloyd-Taylor) | Exponential Regression | TS (5cm or 50cm) | A process-based model that fits an exponential curve to nighttime NEE using soil temperature as the sole driver for ecosystem respiration. |
| **GPP** (Michaelis-Menten) | Rectangular Hyperbola | SW_IN | A process-based model fitting daytime NEE (minus Reco) against incoming solar radiation to model the photosynthetic light-response. |
| **NEE** (RF) | Random Forest | TS_5cm, TS_50cm, SW_IN, TA, VPD | An ensemble machine learning algorithm that builds multiple decision trees to predict missing NEE based on a combination of all meteorological drivers. |
| **NEE** (ANN) | Artificial Neural Network | TS_5cm, TS_50cm, SW_IN, TA, VPD | A deep learning approach that identifies complex, non-linear relationships between the biometeorological drivers and NEE. |

#### Table 3: Methane (CH₄) Flux Gap-Filling
| Target Variable | Method / Algorithm | Primary Predictors | Description |
| :--- | :--- | :--- | :--- |
| **FCH4** (RF) | Random Forest | TS_5cm, TS_50cm, SW_IN, TA, VPD, WTD | Uses ensemble decision trees to capture the highly non-linear and episodic nature of methane fluxes (e.g., ebullition events) based on soil and air conditions. |
| **FCH4** (ANN) | Artificial Neural Network | TS_5cm, TS_50cm, SW_IN, TA, VPD, WTD | Models the methane flux dynamics using a neural network architecture, providing an alternative AI-driven approach to the Random Forest model. |

---
*Note: All figures and tables have been automatically generated and formatted by the Maestro Standard, ensuring consistent visual aesthetics across all data models.*
