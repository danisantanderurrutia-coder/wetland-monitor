# CHAPTER II: METHODOLOGY AND ANALYTICAL ARCHITECTURE

**Thesis:** Carbon Fluxes and Greenhouse Gases Exchange in Transitioning Peatlands of Northern Germany  
**Author:** Daniel Sebastián Santander Urrutia  
**Supervisors:** Prof. Dr. Martin Komainda & Dr. Sebastian Jordan  
**Institution:** Faculty of Agricultural and Nutritional Sciences, Christian-Albrechts-Universität zu Kiel (CAU Kiel)  
**Observational Testbed:** Klimafarm Peatland Observatory, Wallener Au (Schleswig-Holstein)

---

## 2.1 Instrumentation and Hardware

To capture both continuous macro-turbulent exchanges and discrete micro-topographical greenhouse gas dynamics across the rewetting transition, the Klimafarm Wallener Au observational observatory deployed an integrated, multi-sensor instrumentation platform. The platform couples high-frequency atmospheric eddy covariance (EC) tower measurements with continuous biometeorological arrays, laboratory soil geomechanics, and an in situ static closed-chamber network.

### 2.1.1 3D Sonic Anemometry and High-Frequency Gas Analyzers
The primary micrometeorological tower was equipped with high-frequency sensors operating at a sampling rate of $10\text{ Hz}$ to resolve fine-scale atmospheric turbulent eddies within the atmospheric surface layer:
- **3D Ultrasonic Anemometer (Gill WindMaster Pro, Gill Instruments Ltd., Lymington, UK):** Deployed at an aerodynamic measuring height of $z_m = 2.45\text{ m}$ above ground level (aligned with prevailing southwesterly winds at $210^\circ$). The sensor measures the three orthogonal acoustic wind velocity vectors ($u, v, w$) via the transit time of ultrasonic pulses across opposing transducer pairs with a velocity resolution of $0.001\text{ m s}^{-1}$, alongside acoustic virtual temperature ($T_{son}$).
- **Open-Path Infrared $\text{CO}_2/\text{H}_2\text{O}$ Gas Analyzer (LI-7500DS, LI-COR Biosciences, Lincoln, NE, USA):** Mounted adjacent to the sonic anemometer with a horizontal sensor separation of $0.20\text{ m}$ to minimize aerodynamic distortion while mitigating spatial high-frequency flux attenuation. The analyzer measures in situ molar densities of carbon dioxide ($\rho_c$) and water vapor ($\rho_v$) by quantifying non-dispersive infrared (NDIR) radiation absorption across an open optical absorption path length of $0.125\text{ m}$.
- **Open-Path Infrared $\text{CH}_4$ Gas Analyzer (LI-7700, LI-COR Biosciences, Lincoln, NE, USA):** Dedicated fast-response methane gas analyzer operating via wavelength modulation spectroscopy (WMS) around $1.65\text{ }\mu\text{m}$ with a multi-pass Herriott cell ($0.5\text{ m}$ physical base path yielding an effective optical path length of $30\text{ m}$). It provides high-frequency methane mole fractions and molar densities with an RMS noise of $<5\text{ ppb at }10\text{ Hz}$.
- **Enclosed-Path $\text{CO}_2/\text{H}_2\text{O}$ Gas Analyzer (LI-7200RS, LI-COR Biosciences):** Deployed at the intensive sister monitoring station (Ekel) for methodological cross-comparison, pulling ambient air through an insulated, low-dispersion sampling tube ($1.0\text{ m}$) into a temperature-controlled optical cell to eliminate surface heating artifacts during extreme winter periods.

### 2.1.2 Continuous BIOMET Instrumentation & Radiation Balance
Co-located with the high-frequency tower, an automated biometeorological (BIOMET) acquisition system logged low-frequency ($1\text{ Hz}$) environmental variables aggregated to 30-minute intervals:
1. **Four-Component Net Radiometer (CNR4, Kipp & Zonen B.V., Delft, Netherlands):** Positioned on a south-facing boom at $z = 2.0\text{ m}$, measuring incoming and reflected solar shortwave radiation ($SW_{\downarrow}, SW_{\uparrow}$, $0.3\text{ to }2.8\text{ }\mu\text{m}$) via dual pyranometers, and incoming and outgoing terrestrial longwave radiation ($LW_{\downarrow}, LW_{\uparrow}$, $4.5\text{ to }42\text{ }\mu\text{m}$) via dual pyrgeometers. Net radiation ($R_n$) is derived as:
   $$R_n = (SW_{\downarrow} - SW_{\uparrow}) + (LW_{\downarrow} - LW_{\uparrow})$$
2. **Photosynthetically Active Radiation (PAR Quantum Sensor, LI-190R, LI-COR):** Quantifies photosynthetically active photon flux density ($\text{PPFD}$, $400\text{--}700\text{ nm}$) in $\mu\text{mol m}^{-2}\text{ s}^{-1}$.
3. **Soil Microclimate Profiles (Stevens HydraProbe / Campbell Scientific CS655):** Multi-depth soil monitoring arrays positioned within undisturbed peat profiles at discrete vertical depths of $z = -5\text{ cm}$, $-20\text{ cm}$, and $-50\text{ cm}$. Monitored parameters include Soil Temperature ($T_{s,5}, T_{s,20}, T_{s,50}$) and Soil Water Content ($\text{SWC}$, volumetric water content $\theta_v$).
4. **Soil Heat Flux Plates (HFP01SC Self-Calibrating Plates, Hukseflux Thermal Sensors B.V., Delft, Netherlands):** Three spatial replicate plates buried at depth $z = -0.08\text{ m}$ to record conductive ground heat flux density ($G_z$), coupled with overlying calorimetric soil heat storage calculations ($\Delta S_G$) to derive surface soil heat flux ($G$).
5. **Hydrostatic Groundwater Divers (Van Essen Instruments / Schlumberger Water Services):** Continuous pressure transducers housed in slotted PVC piezometer tubes measuring absolute groundwater table depth ($\text{WTD}$) and fluctuations across the micro-topographical field transect.

### 2.1.3 Regional Meteorological Baseline Network (DWD)
To ensure uninterrupted time-series analysis and provide WMO-compliant meteorological baselines, local tower biometeorology was cross-validated and gap-filled using regional weather stations from the German Meteorological Service (*Deutscher Wetterdienst*, DWD):
- **DWD Station Erfde (Station ID 01262, $54.310^\circ\text{ N}, 9.317^\circ\text{ E}$):** Continuous air temperature ($T_{air}$ via shielded PT100), relative humidity ($RH$), and precipitation (automated tipping-bucket pluviometer).
- **DWD Station Schleswig (Station ID 04466):** Reference incoming global radiation ($R_g$) and atmospheric barometric pressure ($P_{atm}$).

---

## 2.2 Software Architecture, Coding Pipelines & AI Assistance

### 2.2.1 Computational Architecture & Execution Environment
All data harmonization, high-frequency signal processing, machine learning gap-filling, and spatial visualizations were executed within an integrated computational architecture:
- **Core Statistical Pipeline:** Programmed entirely in R (version 4.4.1 / 4.6.1 environment) utilizing `tidyverse` (`dplyr`, `tidyr`, `purrr`, `readr`) for high-throughput temporal data manipulation across 14,993 half-hourly timesteps.
- **Ecological Post-Processing:** The `REddyProc` package (Max Planck Institute for Biogeochemistry; Wutzler et al., 2018) was utilized for friction velocity ($u_*$) threshold detection, Marginal Distribution Sampling (MDS) gap-filling, and non-linear flux partitioning.
- **Geospatial & Spatial Physics:** R packages `terra`, `sf`, `elevatr`, and `ggplot2` were deployed to handle raster elevation models (DEM), SoilGrids carbon pools, and dynamic footprint polygons.
- **High-Frequency Micrometeorology:** EddyPro® 7.0.9 (LI-COR Biosciences) was utilized for raw 10 Hz binary archive ingestion, physical fluid dynamics corrections, and half-hourly statistical flux derivation.

### 2.2.2 Digital Workflow and AI Transparency Declaration
In accordance with the Good Scientific Practice Guidelines of the Christian-Albrechts-Universität zu Kiel (CAU, 2021) and the German Research Foundation (DFG, 2023) policy on Generative AI Models, the computational toolchain is formally disclosed:
- **Language and Structural Refinement:** DeepL Pro and Perplexity were employed for grammatical refinement and technical translation into academic English.
- **Agentic Code Engineering:** The AI coding assistant Gravity/Antigravity was utilized for automated script refactoring, package dependency management, algorithmic debugging in R and JavaScript, and SVG digital twin modeling.
- **Scientific Fact Verification:** Consensus and Google Scholar were utilized to cross-validate physiological and micrometeorological citations against peer-reviewed literature.
- **Cognitive Responsibility:** Algorithmic tools were strictly limited to code syntax optimization and visual rendering; all intellectual design, experimental hypotheses, data interpretation, and scientific conclusions remain solely the original work of the author.

---

## 2.3 Study Site & Experimental Design

### 2.3.1 Site Characteristics: Wallener Au Polder
The experimental investigation was conducted within the Klimafarm Peatland Observatory at Wallener Au ($54.280684^\circ\text{ N}, 9.258619^\circ\text{ E}$, elevation $4.8\text{--}5.4\text{ m a.s.l.}$), located in the Eider-Treene-Sorge lowland of Schleswig-Holstein, Northern Germany.
- **Pedology & Stratigraphy:** Deep degraded fen peat (*Niedermoor*, Sapric Histosols) characterized by historical drainage ditches, intensive agricultural cultivation (maize and permanent grassland), and a dense, compacted plow pan layer at depth $z = -20\text{ to }-30\text{ cm}$.
- **Climatological Baseline:** Atlantic maritime climate characterized by mild winters and temperate summers. A 25-year recent climatological baseline (1999–2023) extracted from NASA POWER and DWD establishes mean annual air temperature at $9.6^\circ\text{ C}$ and mean annual precipitation at $842\text{ mm}$.
- **Topographical Basin:** The site sits in a concave micro-topographical basin flanked by terminal moraines, establishing conditions for nocturnal cold-air drainage, surface boundary layer decoupling, and intermittent water stagnation.

---

## 2.4 Eddy Covariance Theoretical and Computational Framework

### 2.4.1 Principles of Turbulent Covariance
The vertical turbulent flux density of a scalar entity (such as $\text{CO}_2$, $\text{CH}_4$, or latent heat) within the atmospheric boundary layer is derived from the conservation of mass and Navier-Stokes fluid mechanics. Applying Reynolds decomposition, any instantaneous atmospheric variable $\xi(t)$ is decomposed into its Reynolds-averaged mean component $\overline{\xi}$ and its turbulent fluctuation $\xi'(t)$:
$$\xi(t) = \overline{\xi} + \xi'(t), \quad \text{where } \overline{\xi'} = 0$$

The vertical net ecosystem exchange of carbon dioxide ($F_c$, $\mu\text{mol m}^{-2}\text{ s}^{-1}$) is computed as the time-averaged covariance between fluctuations in vertical acoustic wind velocity ($w'$) and dry air scalar molar density ($c'$):
$$F_c = \overline{w' c'} = \frac{1}{N} \sum_{i=1}^{N} \left( w_i - \bar{w} \right) \left( c_i - \bar{c} \right)$$
where $N = 18,000$ instantaneous samples per 30-minute averaging block ($10\text{ Hz} \times 1800\text{ s}$).

By micrometeorological sign convention:
- **$F_c < 0$ (Negative):** Downward flux towards the canopy, representing net photosynthetic uptake (gross primary productivity exceeding respiration).
- **$F_c > 0$ (Positive):** Upward flux towards the atmosphere, representing net ecosystem carbon release (respiration or methanogenesis).

### 2.4.2 3D Sector-Wise Planar Fit Coordinate Rotation
Due to micro-topographical undulations and agricultural drainage banks, the anemometer reference frame rarely coincides with the local streamline of the mean flow. Rather than applying 2D double rotation (which forces mean vertical wind $\bar{w} \equiv 0$ on every half-hour block and risks discarding genuine low-frequency terrain-following subsidence), a **3D Sector-Wise Planar Fit coordinate rotation** (Wilczak et al., 2001) was implemented in EddyPro®.

The mean vertical wind velocity $\bar{w}$ is modeled as a multi-linear regression of mean horizontal wind components ($\bar{u}, \bar{v}$):
$$\bar{w} = b_0 + b_1 \bar{u} + b_2 \bar{v}$$
The transformation matrix $\mathbf{P}$ aligns the anemometer $z$-axis perpendicular to the fixed local aerodynamic plane:
$$\begin{pmatrix} u_r \\ v_r \\ w_r \end{pmatrix} = \mathbf{P} \begin{pmatrix} u \\ v \\ w \end{pmatrix}$$
where wind directions were segregated into four $90^\circ$ sectors to account for asymmetric ditch topography.

### 2.4.3 Webb-Pearman-Leuning (WPL) Air Density Correction
Open-path infrared analyzers (LI-7500DS and LI-7700) measure in situ constituent gas densities ($\rho_c, \rho_{CH_4}$) without drying or pre-heating the air sample. Thermal expansion and humidity variations alter the volume of air within the optical path, generating apparent vertical fluxes even in the absence of net biological sources. To resolve true ecosystem exchange, the **Webb-Pearman-Leuning (WPL) density correction** (Webb, Pearman, & Leuning, 1980) was applied:
$$F_{c,\text{true}} = \overline{w' \rho_c'} + \mu \frac{\overline{\rho_c}}{\overline{\rho_a}} \overline{w' \rho_v'} + (1 + \mu \sigma) \frac{\overline{\rho_c}}{\overline{T}} \overline{w' T'}$$
where:
- $\mu = m_a / m_v \approx 1.6077$ is the ratio of the molecular mass of dry air to water vapor.
- $\sigma = \overline{\rho_v} / \overline{\rho_a}$ is the air moisture ratio.
- $\overline{T}$ is mean absolute air temperature ($K$).
- $\overline{w' \rho_v'}$ is the water vapor flux (evapotranspiration).
- $\overline{w' T'}$ is the sensible heat flux component derived from sonic temperature.

### 2.4.4 High- and Low-Frequency Spectral Attenuation Corrections
To compensate for signal attenuation induced by finite sensor path lengths, line averaging, sensor separation ($0.20\text{ m}$), and flux loss beyond the $10\text{ Hz}$ Nyquist cutoff, fully analytical transfer functions (Moncrieff et al., 1997, 2004) were implemented in EddyPro®:
$$F_{\text{corrected}} = \int_0^\infty \frac{S_{wc}(f)}{T_{wc}(f)} \, df$$
where $S_{wc}(f)$ is the cospectrum of vertical wind and gas concentration, and $T_{wc}(f)$ is the combined spectral transfer function.

---

## 2.5 Quality Control, Data Screening & The Nighttime Problem

### 2.5.1 Automated Despiking & Statistical Screening
Raw $10\text{ Hz}$ records were screened for electronic artifacts, rain-induced optical blockages, and sonic transducer wetting using the automated moving-window despiking routine of **Vickers and Mahrt (1997)**:
- Window length: 5 minutes ($3,000$ points).
- Spike criterion: Values exceeding $\mu_{\text{local}} \pm 4.5 \sigma_{\text{local}}$ were flagged and replaced by linear interpolation. Blocks containing $>5\%$ spikes were marked as invalid.

### 2.5.2 Stationarity and Integral Turbulence Tests (Mauder & Foken)
To verify the fundamental physical assumptions of fully developed atmospheric turbulence and steady-state conditions, each 30-minute flux record was evaluated against the **Mauder and Foken (2004, 2011)** flagging system:
1. **Stationarity Test:** Compares the 30-minute covariance with the mean of six internal 5-minute sub-interval covariances:
   $$\Delta_{st} = \left| \frac{\overline{w'c'}_{30\text{min}} - \frac{1}{6} \sum_{i=1}^6 \overline{w'c'}_{5\text{min},i}}{\overline{w'c'}_{30\text{min}}} \right|$$
2. **Integral Turbulence Characteristics (ITC):** Compares measured normalized standard deviations of wind components ($\sigma_u / u_*, \sigma_w / u_*$) against theoretical Monin-Obukhov similarity models:
   $$\Delta_{ITC} = \left| \frac{(\sigma_w / u_*)_{\text{measured}} - (\sigma_w / u_*)_{\text{model}}}{(\sigma_w / u_*)_{\text{model}}} \right|$$

| Flag Class | Stationarity Criteria ($\Delta_{st}$) | ITC Deviation ($\Delta_{ITC}$) | Data Quality Assessment | Implementation in Thesis |
|---|---|---|---|---|
| **Flag 0** | $< 30\%$ | $< 30\%$ | High Quality (Optimal Turbulence) | Directly used in primary analysis & model calibration |
| **Flag 1** | $30\% \le \Delta_{st} < 100\%$ | $30\% \le \Delta_{ITC} < 100\%$ | Moderate Quality (Acceptable) | Retained for annual carbon budget integration |
| **Flag 2** | $\ge 100\%$ | $\ge 100\%$ | Poor Quality (Failed Turbulence) | Completely discarded; sent to gap-filling pipeline |

### 2.5.3 Friction Velocity ($u_*$) Thresholding & The Nighttime Problem
During calm nocturnal periods, strong radiative cooling induces atmospheric thermal stratification. Turbulence collapses, decoupling the surface boundary layer from the canopy top. Respired $\text{CO}_2$ pools within the microtopographic depression without reaching the tower sensors—the classic **"Nighttime Problem"** (Aubinet et al., 2012).

Friction velocity ($u_*$, $\text{m s}^{-1}$) quantifies the mechanical shear stress driving turbulent transport:
$$u_* = \left( \left( \overline{u' w'} \right)^2 + \left( \overline{v' w'} \right)^2 \right)^{1/4}$$

Using the moving point detection algorithm in `REddyProc` across temperature bins, the critical turbulence threshold was determined at:
$$u_{*,\text{threshold}} = 0.152\text{ m s}^{-1}$$
All nocturnal flux records with $u_* < 0.152\text{ m s}^{-1}$ were discarded to prevent the systematic underestimation of ecosystem respiration.

---

## 2.6 Post-Processing, Gap-Filling & Flux Partitioning

### 2.6.1 Chemical Conversions & Half-Hourly Mass Integration
Measured fluxes represent instantaneous molar exchange rates ($\mu\text{mol CO}_2\text{ m}^{-2}\text{ s}^{-1}$). To compile ecosystem carbon budgets, rates are converted to discrete carbon mass ($g\text{C m}^{-2}$ per 30-minute block):
$$\Delta M_C = F_c \times 1800\text{ s} \times 12.011\text{ g mol}^{-1} \times 10^{-6}\text{ mol }\mu\text{mol}^{-1}$$
$$\Delta M_C = F_c \times 0.0216198 \quad \left[ \text{gC m}^{-2} (30\text{ min})^{-1} \right]$$

To calculate daily carbon exchange ($g\text{C m}^{-2}\text{ d}^{-1}$) without introducing missing-interval bias, the arithmetic daily mean of available quality-controlled fluxes is multiplied by 48 half-hour intervals:
$$F_{c,\text{daily}} = \left( \frac{1}{n_{\text{valid}}} \sum_{i=1}^{n_{\text{valid}}} \Delta M_{C,i} \right) \times 48$$

### 2.6.2 Marginal Distribution Sampling (MDS) Gap-Filling
Gaps resulting from instrumental maintenance, power outages, rain interference, and $u_*$ screening were reconstructed using the **Marginal Distribution Sampling (MDS)** algorithm (Reichstein et al., 2005). The algorithm exploits meteorological look-up windows under similar environmental conditions:
1. Lookup window for radiation ($R_g \pm 50\text{ W m}^{-2}$), air/soil temperature ($T \pm 2.5^\circ\text{ C}$), and vapor pressure deficit ($\text{VPD} \pm 5\text{ hPa}$).
2. Window length dynamically expands from 7 days to 14 days, up to 28 days if identical meteorological conditions are unobserved locally.
3. For prolonged sensor failures during winter, external WMO-compliant meteorological drivers from DWD Erfde were ingested (`Model B`) to preserve continuous annual series.

### 2.6.3 Flux Partitioning: Respiration ($R_{eco}$) and Photosynthesis (GPP)
Net Ecosystem Exchange ($\text{NEE}$) is mathematically partitioned into its two gross component processes:
$$\text{NEE} = R_{eco} - \text{GPP}$$
where $\text{GPP}$ is defined positive as carbon uptake, and $R_{eco}$ is positive as carbon efflux.

1. **Ecosystem Respiration ($R_{eco}$):** Nocturnal $\text{NEE}$ (where $\text{GPP} \equiv 0$) under fully turbulent conditions ($u_* \ge 0.152\text{ m s}^{-1}$) is parameterized against deep soil temperature ($T_{s,50\text{cm}}$) using the **Lloyd and Taylor (1994)** exponential function:
   $$R_{eco}(T_s) = R_{\text{ref}} \cdot \exp \left( E_0 \left( \frac{1}{T_{\text{ref}} - T_0} - \frac{1}{T_s - T_0} \right) \right)$$
   where:
   - $R_{\text{ref}}$ is ecosystem respiration rate at reference temperature $T_{\text{ref}} = 283.15\text{ K}$ ($10^\circ\text{ C}$).
   - $E_0 = 308.56\text{ K}$ is the activation energy parameter.
   - $T_0 = 227.13\text{ K}$ ($-46.02^\circ\text{ C}$) is the minimum baseline temperature.
   Deep soil temperature ($50\text{ cm}$) was selected over surface temperature ($5\text{ cm}$) due to its thermal buffering, preventing artificial daytime overestimation of deep-peat microbial decomposition.

2. **Gross Primary Productivity ($\text{GPP}$):** Modeled continuous $R_{eco}$ is subtracted from measured daytime $\text{NEE}$. The daytime light-response curve is fitted using the **Michaelis-Menten hyperbolic formulation**:
   $$\text{GPP}(R_g) = \frac{\alpha \cdot R_g \cdot \text{GPP}_{\text{max}}}{\alpha \cdot R_g + \text{GPP}_{\text{max}}}$$
   where:
   - $\alpha$ ($\mu\text{mol C }\mu\text{mol}^{-1}\text{ photons}$) represents the initial canopy apparent quantum yield (slope at $R_g \rightarrow 0$).
   - $\text{GPP}_{\text{max}}$ ($\mu\text{mol C m}^{-2}\text{ s}^{-1}$) represents light-saturated maximum photosynthetic capacity.

---

## 2.7 Static Closed Chamber Methodology & Physics

### 2.7.1 Automated and Manual Chamber Architecture
To resolve non-$\text{CO}_2$ trace gas dynamics ($\text{CH}_4$ and $\text{N}_2\text{O}$) and isolate discrete microtopographical soil-canopy respiration, an array of eight in situ closed chambers was operated along an East-West transect spanning relict agricultural ditches and elevated peat margins.

### 2.7.2 Telescopic Chamber Geometry & Composite Volume Calculation
The chamber collars feature a stacked, telescopic geometry comprising a ground-inserted base collar, a tapered conjunction ring, and an optional vertical extension. Accurate volume derivation is critical, as assuming a uniform cylindrical geometry introduces systematic volume errors of up to $14\%$.

1. **Effective Basal Surface Area ($A$):**
   Defined by the permanent ground collar inner radius ($r_1 = 18.35\text{ cm} = 0.1835\text{ m}$):
   $$A = \pi \cdot r_1^2 = \pi \cdot (0.1835\text{ m})^2 = 0.10578\text{ m}^2$$

2. **Configuration 1 (Low Canopy / Unextended, Total Height $H = 16\text{ cm}$):**
   $$V_1 = A \cdot h_1 = 0.10578\text{ m}^2 \cdot 0.16\text{ m} = 0.01692\text{ m}^3 = 16.92\text{ L}$$

3. **Configuration 2 (Tall Vegetation / Extended, Total Height $H = 42\text{ cm}$):**
   Comprises the basal cylinder plus a truncated cone (conical frustum) extension transitioning from $r_2 = 17.85\text{ cm}$ ($0.1785\text{ m}$) at the conjunction to $r_1 = 18.35\text{ cm}$ ($0.1835\text{ m}$) at the upper rim over height $h_{\text{ext}} = 0.26\text{ m}$:
   $$V_{\text{frustum}} = \frac{1}{3} \pi h_{\text{ext}} \left( r_1^2 + r_1 r_2 + r_2^2 \right)$$
   $$V_{\text{frustum}} = \frac{1}{3} \pi (0.26) \left( 0.1835^2 + 0.1835 \cdot 0.1785 + 0.1785^2 \right) = 0.02664\text{ m}^3$$
   $$V_{\text{total}} = V_1 + V_{\text{frustum}} = 0.01692 + 0.02664 = 0.04356\text{ m}^3 = 43.56\text{ L}$$

### 2.7.3 Gas Accumulation Kinetics & OLS Slope Calculation
During chamber closure ($t_{\text{closure}} = 20\text{ minutes}$ with syringe gas extraction at $t_1 = 0\text{ s}, t_2 = 20\text{ s}, t_3 = 40\text{ s}, t_4 = 60\text{ s}$ or automated continuous IRGA pumping), the gas concentration rate of change ($dC/dt$, $\text{ppm min}^{-1}$) was determined via **Ordinary Least Squares (OLS) linear regression**:
$$\frac{dC}{dt} = \frac{\sum_{i=1}^n (t_i - \bar{t})(C_i - \bar{C})}{\sum_{i=1}^n (t_i - \bar{t})^2}$$
For a standard 4-point extraction ($n=4$):
$$\frac{dC}{dt} = \frac{(t_1 - \bar{t})C_1 + (t_2 - \bar{t})C_2 + (t_3 - \bar{t})C_3 + (t_4 - \bar{t})C_4}{\sum_{i=1}^4 (t_i - \bar{t})^2}$$

### 2.7.4 Universal Ideal Gas Law Flux Transformation
The molar surface flux density ($F$, $\mu\text{mol m}^{-2}\text{ s}^{-1}$ or $\text{nmol m}^{-2}\text{ s}^{-1}$) is computed using the ideal gas equation of state:
$$F = \frac{dC}{dt} \cdot \frac{P_{\text{atm}} \cdot V}{R \cdot T_{\text{air}} \cdot A} \cdot \frac{1}{60\text{ s min}^{-1}}$$
where:
- $dC/dt$ is the accumulation slope ($\mu\text{mol mol}^{-1}\text{ min}^{-1}$).
- $P_{\text{atm}}$ is absolute barometric pressure ($101,325\text{ Pa}$).
- $V$ is geometric chamber headspace volume ($\text{m}^3$).
- $A$ is enclosed soil surface area ($0.10578\text{ m}^2$).
- $R$ is the universal gas constant ($8.31446\text{ J mol}^{-1}\text{ K}^{-1}$).
- $T_{\text{air}}$ is absolute temperature inside the chamber ($K = ^\circ\text{C} + 273.15$).

### 2.7.5 Scaling to Practical Agricultural and MMRV Units
To transition between academic micrometeorology and national greenhouse gas reporting (MMRV: Measurement, Monitoring, Reporting, and Verification), fluxes are scaled via:
1. **Agricultural Daily Emission Rate ($kg\text{ ha}^{-1}\text{ d}^{-1}$):**
   $$\text{Flux } [kg\text{ ha}^{-1}\text{ d}^{-1}] = F \left[ \mu\text{mol m}^{-2}\text{ s}^{-1} \right] \times M_{\text{gas}} \left[ g\text{ mol}^{-1} \right] \times 10^{-9}\text{ kg }\mu\text{g}^{-1} \times 10,000\text{ m}^2\text{ ha}^{-1} \times 86,400\text{ s d}^{-1}$$
   $$\text{Flux } [kg\text{ ha}^{-1}\text{ d}^{-1}] = F \times M_{\text{gas}} \times 0.864$$
   where $M_{\text{CH}_4} = 16.043\text{ g mol}^{-1}$, $M_{\text{N}_2\text{O}} = 44.013\text{ g mol}^{-1}$, and $M_{\text{CO}_2} = 44.010\text{ g mol}^{-1}$.
2. **Cumulative Annual Budget ($g\text{C m}^{-2}\text{ yr}^{-1}$ or $t\text{ CO}_2\text{e ha}^{-1}\text{ yr}^{-1}$):**
   $$\text{Net Annual Carbon} = \sum_{\text{day}=1}^{365} F_{\text{daily}} \times 10^{-4}\text{ ha m}^{-2}$$

---

## 2.8 Post-Gapfilling GHG Chamber Integration Architecture

### 2.8.1 Multi-Gas Integration Workflow
Evaluating rewetted peatlands solely through eddy covariance $\text{CO}_2$ exchange risks creating the **"Illusion of the Carbon Sink"**, where strong photosynthetic summer uptake obscures massive non-$\text{CO}_2$ radiative forcing. A three-tier post-gapfilling integration architecture was constructed:
1. **Stage 1 (Pre-Insertion Baseline):** Continuous, gap-filled half-hourly $\text{NEE}$ series generated by EddyPro® and `REddyProc` establishes the annual $\text{CO}_2$ baseline.
2. **Stage 2 (Discrete Trace Gas Superposition):** Manual and automated chamber measurements of $\text{CH}_4$ and $\text{N}_2\text{O}$ are interpolated across sampling intervals and superimposed onto the $\text{CO}_2$ timeline.
3. **Stage 3 (Global Warming Potential Equivalence):** All fluxes are transformed into carbon dioxide equivalents ($\text{CO}_2\text{e}$) across two IPCC standard radiative forcing horizons.

### 2.8.2 Radiative Forcing Horizons: 100-Year vs. 20-Year GWP
In accordance with IPCC Fifth (AR5) and Sixth (AR6) Assessment Reports:
$$\text{GHG Balance}_{100} = \text{NEE}_{\text{CO}_2} + \left( \text{GWP}_{100,\text{CH}_4} \times F_{\text{CH}_4} \right) + \left( \text{GWP}_{100,\text{N}_2\text{O}} \times F_{\text{N}_2\text{O}} \right)$$
$$\text{GHG Balance}_{20} = \text{NEE}_{\text{CO}_2} + \left( \text{GWP}_{20,\text{CH}_4} \times F_{\text{CH}_4} \right) + \left( \text{GWP}_{20,\text{N}_2\text{O}} \times F_{\text{N}_2\text{O}} \right)$$

| Greenhouse Gas | Atmospheric Lifetime ($\tau$) | GWP 100-Year Horizon (IPCC AR6) | GWP 20-Year Horizon (IPCC AR6) | Biophysical Pathway at Wallener Au |
|---|---|---|---|---|
| **$\text{CO}_2$ (Carbon Dioxide)** | Dynamic ($>100\text{ yr}$) | $1$ | $1$ | Canopy photosynthesis vs. oxic peat mineralization |
| **$\text{CH}_4$ (Methane)** | $11.8\text{ years}$ | $28.0\text{--}29.8$ | **$82.5\text{--}84.0$** | Anaerobic methanogenesis; vascular aerenchyma bypass |
| **$\text{N}_2\text{O}$ (Nitrous Oxide)** | $109\text{ years}$ | $265\text{--}273$ | $264\text{--}268$ | Incomplete denitrification in agricultural nitrate legacy |

### 2.8.3 Spatial Variance & Rigorous Error Propagation ($SE_{\text{Net}}$)
Because $\text{CO}_2$ is measured continuously at the ecosystem tower scale, its temporal sampling uncertainty is bounded by aerodynamic quality flagging. Conversely, chamber-derived trace gases contain pronounced spatial heterogeneity across replicate collars. 

For each sampling date, the spatial Standard Error ($SE = \sigma / \sqrt{n}$) was calculated across collar replicates. Assuming stochastic independence between trace gas measurement channels, total net ecosystem uncertainty was propagated via Gaussian quadratic addition:
$$SE_{\text{Net}} = \sqrt{ \left( \text{GWP}_{\text{CH}_4} \cdot SE_{\text{CH}_4} \right)^2 + \left( \text{GWP}_{\text{N}_2\text{O}} \cdot SE_{\text{N}_2\text{O}} \right)^2 }$$

This ensures that the final reported greenhouse gas balance is bounded by statistically defensive confidence intervals:
$$\text{Net Balance} = \mu_{\text{GHG}} \pm 1.96 \cdot SE_{\text{Net}} \quad (95\%\text{ CI})$$

---

## 2.9 Soil Geomechanics, Pore Architecture & The Plow Pan Paradox

### 2.9.1 Soil Sampling and Laboratory Consolidation (Oedometer)
Undisturbed soil core cylinders ($100\text{ cm}^3$, diameter $5.6\text{ cm}$, height $4.0\text{ cm}$) were extracted in four depth-stratified zones:
- `WA 0-5`: Topsoil root horizon ($0\text{--}5\text{ cm}$).
- `WA 25`: Compacted plow pan boundary layer ($20\text{--}25\text{ cm}$).
- `WA 25-35`: Deeper degraded peat horizon ($25\text{--}35\text{ cm}$).
- `EK 0-5`: Intensive sister comparison core.

Samples were saturated, brought to field capacity at matric suction $pF = 1.8$ ($\psi_m = -60\text{ hPa} \approx 60\text{ cm H}_2\text{O}$), and subjected to uniaxial mechanical loading in an oedometer frame across sequential load steps ($10, 20, 50, 100, 200, \text{ and }400\text{ kPa}$).

### 2.9.2 Casagrande Precompression Stress ($\sigma_p$) Derivation
The precompression stress ($\sigma_p$, $\text{kPa}$) defines the maximum vertical effective stress the soil matrix has historically withstood under agricultural machinery traffic. It marks the mechanical boundary between elastic recompression and irreversible plastic matrix collapse:
1. Plotting the void ratio $e$ or dry bulk density $\rho_b$ against the logarithm of effective vertical stress ($\log \sigma'$).
2. Identifying the point of minimum radius of curvature on the recompression curve.
3. Bisecting the angle between the horizontal line and the tangent to the curve at the point of maximum curvature.
4. Projecting the intersection with the virgin compression line down to the stress axis yields $\sigma_p$.

At Wallener Au, the plow pan exhibits an overconsolidated precompression stress:
$$\sigma_p = 62.4\text{ kPa}$$

### 2.9.3 Air Conductivity ($K_a$) and Pore Functional Collapse
Air conductivity ($K_a$, $\text{m s}^{-1}$) was determined under constant pneumatic head ($\Delta P = 1\text{ hPa} = 100\text{ Pa}$) across soil cores before and after mechanical loading:
$$K_a = \frac{Q \cdot \eta_{\text{air}} \cdot L}{A \cdot \Delta P}$$
where $Q$ is volumetric airflow rate ($\text{m}^3\text{ s}^{-1}$), $\eta_{\text{air}}$ is dynamic air viscosity ($1.81 \times 10^{-5}\text{ Pa s}$), $L$ is core length ($0.04\text{ m}$), and $A$ is cross-sectional core area ($0.00246\text{ m}^2$).

Loading beyond $\sigma_p$ ($>100\text{ kPa}$) collapsed coarse macroporosity ($>30\text{ }\mu\text{m}$), reducing air conductivity by two orders of magnitude ($K_a$ from $14.2\text{ m s}^{-1}$ down to $0.18\text{ m s}^{-1}$).

### 2.9.4 The Ecohydrological Plow Pan Paradox
This mechanical soil legacy physically explains the observed field-scale ecohydrological disconnect:
- Decades of heavy tractor traffic formed a dense, impermeable plow pan at depth $z = -25\text{ cm}$.
- The crushed pore network permanently destroyed vertical capillary conductivities.
- Upon precipitation, water pools superficially above the plow pan, triggering acute local saturation, rapid anoxia, and methanogenesis pulses.
- Conversely, during dry summer intervals, vegetation roots are physically disconnected from the deep groundwater table ($50\text{ cm}$), inducing rapid stomatal closure and severe atmospheric drought stress even in a "rewetted" peatland.

---

## 2.10 Multi-Scale Methodological Bridge (9 Orders of Magnitude)

The thesis methodology deliberately bridges observational and physical processes across 9 orders of spatial magnitude:
$$\mathbf{10^{-6}\text{ m} \longrightarrow 10^{-1}\text{ m} \longrightarrow 10^{2}\text{ m} \longrightarrow 10^{3}\text{ m}}$$

```
+---------------------------------------------------------------------------------------------------+
| 1. Pore Scale (10^-6 m): Oedometer Consolidation & Casagrande Precompression Stress (σp = 62.4 kPa) |
|    - Micro-scale pore collapse, destruction of air conductivity Ka, capillary disconnection.      |
+---------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
| 2. Local Horizon Scale (10^-1 m): Static Chambers & Microtopographic Transect                     |
|    - Discrete collar CH4/N2O accumulation, syringe kinetics, 5 cm vs 50 cm soil thermal buffering. |
+---------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
| 3. Ecosystem Tower Scale (10^2 m): Eddy Covariance Turbulent Flux Footprint (Kormann & Meixner)    |
|    - 10 Hz 3D sonic anemometry, planar fit coordinate rotation, WPL density, u* turbulence closure. |
+---------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
| 4. Regional Landscape Scale (10^3 m): Remote Sensing, DWD Meteorological Baseline, DEM Basin       |
|    - Sentinel-2 canopy phenology, Topographic cold-air basin drainage, WMO reference gap-filling. |
+---------------------------------------------------------------------------------------------------+
```

---

## 2.11 Energy Balance Closure (EBC) as Quality Benchmark

The physical reliability of the eddy covariance turbulent fluxes was independently evaluated through the conservation of surface thermodynamic energy:
$$R_n - G = H + LE + \text{Residual}$$
where:
- $R_n$ is net radiation measured by the CNR4 radiometer.
- $G$ is soil heat flux at the surface ($G = G_z + \Delta S_G$).
- $H$ is sensible heat flux ($\rho_a c_p \overline{w' T'}$).
- $LE$ is latent heat flux ($\lambda \overline{w' q'}$).

The Energy Balance Closure ratio ($EBC = (H + LE) / (R_n - G)$) was quantified across the annual record. An overall closure fraction of $EBC = 0.82\text{--}0.86$ was achieved, meeting FLUXNET and ICOS standards for complex, heterogeneous wetland landscapes and confirming that measured turbulent fluxes are aerodynamically sound.
