# Chapter 3: Results

3.1 Flux Footprint Validation[gn]
  

	Figure, Footprint composite | The flow of color surrounding the center represents the number of points.
	The polar scatter analysis of the footprint peak distance (xpeak) revealed that the vast majority of measured fluxes originated within 100 to 300[go] meters of the tower, strongly aligned with the prevailing wind directions. [gp]
This indicates that the EC measurements are highly representative of the Wallener Au (Klimafarm cropland) surface, with minimal contamination from adjacent land use types.
3.2 Energy Balance Closure
The scatter plot visually assesses energy conservation at the Klimafarm site by plotting the sum of turbulent fluxes (LE + H) against available energy (Rn - G). Two distinctive features are immediately apparent in the figure. 
  

	Figure, Energy Valance Closure - Wallener Au | Assesses the conservation of Energy
	First, the data points (in blue) cluster tightly around the linear regression trend line (solid black line), yielding an exceptionally high R² value of 0.94.[gq] This strong, stable correlation confirms the high quality and overall reliability of the high-frequency measurements. 
Second, the regression trend line deviates low but still noticeably below the theoretical ideal 1:1 closure line (dashed turquoise line), with a slope of 0.85. As available energy increases toward the right side of the x-axis, a typical scenario on clear, sunny summer days, the gap between the measured turbulent fluxes and the 1:1 line widens proportionally. This indicates a systematic underestimation of turbulent fluxes relative to available radiative energy, on the order of 15% (LE + H < Rn - G).
The theoretical implications of this systematic 15% energy deficit, and its relationship to the site's micro-topographical heterogeneity and thermal storage, are further examined in the Discussion
3.3 Soil Stratigraphy and Hydrological Dynamics
The first figure is the soil stratigraphy of the Wallener Au site. At the left can be seen a full deepth profile and at the right a zoom to the first meter.
  
[gr][gs]
	Figures, Stratigraphic Profile [gt]
	The deep stratigraphic profile reveals a thick peat horizon transitioning into mineral substrates at depth[gu]. A prominent quantitative feature in the profile is the severe reduction of structural macro-porosity at the 25 cm depth (the historical plow pan), where wide coarse pores collapse to 5.8% of the total soil volume.
  
[gv][gw]
	Figure, Groundwater Level | Raw Loggers + Spatial Mean. Colored Lines are individual loggers, Thick Black Line is Ecosystem Spatial Mean. [gx]
	The hydrological time series tracks the continuous dynamics of groundwater levels and soil water content throughout the 2024 season. The data demonstrates a pronounced drop in the groundwater table during the summer dry spells. Missing values around April which were not able to be solved during the development of this thesis.[gy]
Soil moisture sensor at the 5 cm boundary layer records a rapid decoupling from the deeper saturated zones, showing severe drying events while moisture persists below the 25 cm[gz] depth. Sensors are presented in the following table and figure
Table, Hydrological Sensor Depths at Wallener Au
Sensor Type
	Depth / Position
	Variable Measured
	Soil Moisture (SWC)
	5 cm
	Surface root-zone volumetric water content
	Soil Moisture (SWC)
	10 cm[ha]
	Sub-surface volumetric water content
	Soil Moisture (SWC)
	50 cm
	Deep volumetric water content (below plow pan)
	Diver / Logger
	Variable
	Absolute Groundwater Level (GWL)
	Following figure shows the coupled seasonal dynamics of soil temperature (solid lines) and volumetric water content, or SWC (dotted lines), measured concurrently at three different depths (5, 10, and 50 cm). 
  
[hb][hc][hd]
	Figure, Coupled Soil Temperature and Moisture Dynami[he]cs | Wallener Au Peatland 2024. Solid Lines: Soil Temperature, Dashed lines: Soil Water Content.
	The most striking feature is the diametrically opposite behavior observed between the surface layers and the deeper layers during the summer months. While the sensor at 50 cm (dark colors) remains flat, but still with data, showing consistently high moisture levels and a very smooth temperature curve, the surface layers (5 and 10 cm, light colors) undergo a drastic drop in moisture that coincides exactly with a sharp rise in temperature characterized by extremely high variance. 
3.4 Soil Microclimate, Depth Profiles and Heat Flux
The following figure presents the vertical profile of soil temperature over time across multiple depths. 
  
[hf][hg]
	Soil Temperature Profile | Depth profiles showing heat propagation in the soil over the growing season[hh]
	Visually, the chart is dominated by a massive diurnal amplitude[hi] at the shallowest 5 cm boundary layer, which oscillates intensely in response to daily cycles. As the eye moves toward the deeper sensors, this high-frequency "comb-like" variance rapidly flattens out. At the 50 cm depth, the diurnal spikes disappear entirely, establishing a smooth and highly stable thermal baseline. The 20 cm measurement stops at the beginning of summer[hj]. 
  

[hk]	
Figure, Spatial Variability: Soil heat flux | Black line: Spatial Mean; Grey Ribbon: 1 SD; Colored Lines: Individual Sensors
[hl]	
In addition to vertical thermal gradients, the site exhibits substantial horizontal heterogeneity. The spatial variance of the SHF across the sensor array documents a patchy distribution of [hm]heat conduction into the soil across the measurement footprint.
Apparently while all three lines rise and fall in unison, responding to the same overarching day-night cycles, the vertical amplitude of these peaks varies significantly between the individual sensors. This visible and constant separation between the measurements demonstrates that heat conduction into the soil is not spatially uniform, revealing a high degree of horizontal heterogeneity across the measurement footprint.[hn]
3.5 Carbon flux analysis: raw data to daily budgets
3.5.1 Data pipeline continuity and raw data coverage[ho]
Before applying quality filters, the raw output from EddyPro® was evaluated to ensure no data files were systematically lost during the pipeline execution. Over the study period (from January 11 to November 12), the pipeline theoretically expects 15,020 half-hourly measurements. The audit [hp]revealed that EddyPro® successfully processed 15,019 files, missing only 1 single [hq][hr]file out of the expected 15,020. 
This indicates an exceptionally stable raw data processing pipeline where missing data in subsequent models is strictly a result of quality control thresholds (e.g., u∗ filtering, flux flags) rather than raw file loss.
3.5.2 EC Quality Control Flags
An analysis was conducted to evaluate the trade-off between strict and relaxed quality filtering.
  

	Figure, QC Flag Comparison | NEE Data Quality Comparison as noise vs relaxing quality criteria (Flag 0 vs Flag 1). [hs]
	The charts illustrate the proportion of data initially accepted versus that discarded after applying strict turbulence thresholds, visually highlighting the severe fragmentation of the final high-quality dataset. 
Table, Raw EC Data Quality and Friction Velocity (u∗) Filtering
Flag Threshold
	Pre-u∗ Data Points
	Pre-u∗ Coverage
	Post-u∗
 Data Points
	Post-u∗ Coverage
	Std. Deviation (Pre-u∗, µmol/m²/s)
	Strict 
(QC = 0)
	8,709
	58.0%
	5,657
	37.7%
	17.55
	Relaxed 
QC = 0 + 1)
	11,951
	79.6%
	6,714
	44.8%
	39.09
	Unfiltered (QC = 0+1+2)
	13,683[ht]
	91.1%
	~[hu]7,661*
	51.1%
	39.49
	Accepting QC=1 flags increases instrumental data availability significantly (from 58% to 79.6% prior to aerodynamic filtering), but more than doubles the variance (Standard Deviation leaps from 17.55 to 39.09 µmol/m²/s), representing transitional turbulence. 
Consequently, all QC=2 data was strictly removed. Applying the u∗filter to the 8,709 raw QC=0 points resulted in the deletion of 3,052 points (a massive 35% loss of high-quality data). This reduced the final, physiologically valid baseline dataset to just 5,657 points (37.7% of the annual period).
3.5.3 Meteorological Proxies for Gap-filling
  
[hv][hw]
	Figure, Meteorological Gap-filling Validation | The multipanel scatter plots compares the local Wallener Au sensors against the regional DWD reference station[hx]
	At first glance, the dense clusters of data points fall tightly along a diagonal axis. This tight grouping visually indicates a proportional relationship between the two locations, demonstrating that the regional data is a geometrically [hy]stable substitute for the local measurements. 
To bridge instrumental gaps during the late summer months, local proxies and regional meteorological data from the DWD were utilized.[hz] The multipanel scatter plots demonstrate strong linear correlations between the local Wallener Au sensors and the regional DWD Erfde station for Air Temperature (Ta), Shortwave Radiation (SWin), and Soil Temperature (TS10).
3.5.4 Flux Partitioning and Respiration Models[ia]
Before analyzing the final continuous carbon budget, it is necessary to mathematically deconstruct the NEE[ib] into its fundamental biological drivers: Ecosystem Respiration (Reco) and GPP. This partitioning ensures that gap-filling is based on physical ecosystem responses rather than arbitrary statistical interpolation.
  
[ic]
	Figure, Gross Primary Productivity MM Fits | Light-dependent Michaelis-Menten (MM) non-linear regression fits for GPP, showcasing three representative[id]
	Ecosystem Respiration Figure illustrates the exponential [ie]relationship between nighttime NEE (representing net respiration) and soil temperature, modeled using Lloyd-Taylor regression. Discrete data points reflect measured nighttime carbon emissions, while the solid line represents the mathematical function generated for each period.
In contrast, Figure[if] about the GPP isolates daytime photosynthetic capacity by modeling the relationship between daytime NEE and incident solar radiation using the Michaelis-Menten light-response curve. [ig]


  
[ih]
	Figure, Ecosystem Respiration LT Fits | Temperature-dependent Lloyd-Taylor (LT) exponential regression fits for Ecosystem Respiration across three monitoring periods.[ii]
	The previous subplots represent distinct seasonal periods and show how the canopy's maximum assimilation capacity varies as the crop develops. [ij]
  
[ik]
	Figure, Gap-filled NEE vs Original Observations | Wallener Au, Red points are the original measured flux, yellow points is the Model B (MDS) Gap-Filled Values[il][im]
	  
[in][io]
Figure, NEE Models Comparison | Wallener Au, red dots are the measured, turquoise is model A for 50 cm., blue is also model A but for 5 cm. Yellow is Model B (MDS)
	The figures overlay the original CO2 flux observations (scattered points) with the continuous mathematical models generated to fill the gaps (solid lines). Visually, while all models generally follow the broad seasonal U-shape of the raw data, the lines distinctly separate and diverge from one another, particularly during periods where no underlying raw data points exist to anchor them.
Continuous respiration models driven by reference soil temperatures at 5 cm and 50 cm are compared against actual raw nighttime measurements (black dots). 
  
[ip]
	Figure, Respiration Models | Respiration models using 50 cm., and 5 cm.[iq]
	During the summer, the sensor located at a depth of 50 cm failed, resulting in the loss of its associated model and a break in data continuity. Meanwhile, the model based on the 5 cm temperature (in blue) remained operational throughout the summer but visually exhibits significant underestimation: it remains almost entirely flat and fails to capture any of the high-magnitude respiration peaks actually measured by the tower. The mathematical regression forces the 5 cm model to adopt a flat line to compensate for the extreme variability of surface temperature, rendering it unable to reflect actual biological spikes.[ir]
Applying strategies [is]to fill in missing data resulted in divergent continuous models. Model A[it] (based on the 50 cm reference) maintained a strong statistical relationship with the reference data (R² = 0.955), whereas Model A (based on the 5 cm reference) showed poor predictive performance (RMSE = 12.421; R² = 0.022). Figure 16[iu] visually illustrates this divergence, demonstrating that the respiration model driven by the highly variable 5 cm temperature produces a biologically constrained flat line, while actual ecosystem respiration exhibits sharp spikes during summer nights.
3.5.5 Cumulative Carbon Budgets
  
[iv]
Figure, Daily Carbon Budgets Comparison | Comparison of Raw measurements, models A and Models MDS (B)[iw]
	Figure displays the cumulative carbon accumulation over the year for the different models. The visual divergence is striking: while one line plunges steadily downward into negative territory (indicating carbon uptake), the other lines climb steeply upwards into positive territory. This clear geometric split shows that the final cumulative sum is entirely dependent on which gap-filling pathway is followed. 
The estimated cumulative carbon budgets diverged significantly depending on the model used. The MDS algorithm (Model B) estimated a net sink of -126.9 gC/m²[ix], while the Lloyd-Taylor models predicted net sources of +1054.0 gC/m² (Model A 50cm) and +1569.5 gC/m² (Model A 5cm). 
The cumulative NEE curve for Model B aligns closely with the phenological development of the crop [iy]canopy. The conversion of half-hourly NEE fluxes to daily carbon budgets was performed by summing valid records within each 24-hour period to avoid artificially inflating budgets on days with missing data.[iz]
3.6 Chambers
The worked file is Chambers_Wallener Au2024; available in the attached Google Drive, accessible with the Authorisation from the co-supervisor of this work Mr. Sebastian Jordan.[ja]
In order to obtain the fluxes, the slopes were calculated manually as described in the methods section (check 2.10). The data, with the incorporated slopes, is analyzed using an R script included in the appendix of this paper. The code performs data conversion and generates graphs. [jb]
Specifically, streamlines the transition from raw field data to standardized, publication-ready results by executing the following workflow:
            1. Data Ingestion & Quality Control: The script imports raw measurement data and standardizes the structure by working with the ppm/min values. It automates temporal indexing by mapping field measurement cycles (minutes from midnight) to a calendar timeline.
            2. Physical & Geometric Standardization: The script performs two critical physical corrections to ensure data accuracy:
            * Volume Correction: It calculates precise headspace volume based on the specific taper and extension configurations from chambers (16cm and 42cm with extension).
            * Unit Conversion: It applies the Ideal Gas Law to convert raw concentration changes into standardized fluxes (μmol/m2s), and further calculates accumulation rates (Kg/Ha⋅d) using molar masses.
            3. Spatial & Statistical Processing: The data is organized into ecological units (East Trench, Central Site, West Trench) based on chamber location. It computes hourly aggregated means with uncertainty ribbons to distinguish general trends from sensor-specific noise and calculates distribution statistics (violin/boxplots) to quantify spatial variability across the site.
Some relevant features of the script are:
            * Dual-Axis Visualization: Every plot maps primary units (μmol/m2s) and secondary mass units (Kg/Ha⋅d) simultaneously for comprehensive understanding. 
            * Color-Coded Analysis: Standardizes height representation across all figures.
In a nutshell, the script transforms raw, variable-height chamber measurements into standardized, spatially organized, and visually structured scientific evidence.[jc]
The automated flux analysis pipeline generated time‑series, aggregated, and cumulative flux estimates for CH₄, N₂O, and CO₂ from eight static chambers (P1–P8). Fluxes are reported in both µmol m⁻² s⁻¹ (molar flux per unit area per second) and kg ha⁻¹ d⁻¹ (mass basis per hectare per day). CO₂ fluxes represent dark soil respiration only (no photosynthesis), as chambers were opaque during measurements.
Each chamber measurement produced a slope (ppm min⁻¹) for each gas. Using chamber‑specific geometry (height 16 cm or 42 cm, base area 0.1058 m², volume calculated from a taper‑aware model) and the ideal gas law (fixed 101325 Pa, 293 K), slopes were converted to µmol m⁻² s⁻¹ and subsequently to kg ha⁻¹ d⁻¹ (corrected conversion factor: 1 µmol m⁻² s⁻¹ = 0.864 × molar mass [g mol⁻¹] kg ha⁻¹ d⁻¹). [jd]
3.6.1 Combined plots for distribution and time series
The first series of combined plots, for [je][jf]CH4, [jg][jh]N2O and [ji][jj]CO2 [jk]are Visualizing Standardized Fluxes, helping to identify temporal patterns and data quality from the gases, include
Faceted Time Series and Aggregated Site Means
The second series of plots are figures which help to analyze the physical ecology of the wetland. They display the site and trench means each of the 8 chambers in graphs split in site and trench. 
            1. Faceted Time Series (Faceted by Site):
Similar to the Time Series, but the graph is "split" (faceted) into three distinct panels based on location (West Trench, Central Site, East Trench). Its purpose is to allow for site-specific comparison. By setting scales equal to "fixed", all facets in a single plot will share the same Y-axis scale, which is automatically determined by the maximum flux value across all sites. This allows to visually compare the Trenches gainst the "Central Site" and immediately perceive differences in magnitude.
            2. Aggregated Site Means (Dashed Line + Gray Ribbon):
Is a statistical overlay of the average flux behavior for the Central and East sites. Provides a spatial "baseline". The dashed line helps to compare the "typical" behavior of the Central Site versus the East Trench, potentially useful to see how different micro-habitats (in this case, trenches) drive GHG exchange.
Seasonal Boxplots
These figures illustrate the distribution of cumulative gas exchange per season across the three sites. Each panel represents a site (West Trench, Central Site, East Trench), and within each panel, boxplots show the seasonal totals (kg ha⁻¹ season⁻¹) for spring, summer, autumn, and winter. 
Colour indicates trench status (trench vs. no trench). The boxplots highlight median, interquartile range, and outliers, allowing rapid visual comparison of seasonal emission patterns between sites. These plots are particularly useful for identifying which season dominates annual emissions (e.g., summer for CH₄, autumn for N₂O) and whether trenching alters seasonal dynamics.
Total Accumulation Bar Plots
These plots show the integrated flux for each individual chamber (P1–P8) over the entire measurement campaign. The x‑axis lists chamber IDs, reordered by total accumulated mass, while the y‑axis gives total kg ha⁻¹. 
Bars are coloured by trench status (trench vs. no trench), and the plot is faceted by site (West Trench, Central Site, East Trench) to group chambers by location. This layout makes it easy to compare total emissions among chambers within the same site and to identify potential hot‑spots. The fixed y‑axis across facets ensures that the magnitude of accumulation can be directly compared between sites. 
These bar plots serve as a final summary of spatial heterogeneity and are especially valuable for detecting outlier chambers that may warrant further investigation (e.g., due to preferential flow paths or animal burrows).[jl]
3.6.2 Methane
4.6.2a CH4 Combined plots for distribution and time series
  
[jm][jn]
	Figure, CH4 Chamber values | (Up-Left) Flux time series, (Down-Left) average per group & (Right) distribution of values per chamber.[jo]
	Methane fluxes ranged from 0 to 1.3 µmol m⁻² s⁻¹, equivalent to 0.15 kg ha⁻¹ d⁻¹, during the months of end of January - begin[jp]ning from February to June. Hourly means revealed no clear diel cycle[jq][jr] for CH₄ at any chamber or site.
West Trench (chamber 8) exhibited the highest variability, while East Trench (chambers 1–2) was consistently near zero or slightly negative (net uptake).
The Central Site (chambers 3–7) showed predominantly positive fluxes (net emission) with occasional spikes. 
The groups of chambers which had the arrangement of height of 16 centimeters shown high more variability than the group of 42 centimeters. The time illustrates that the extended chamber height (42 cm, used after 27 May 2024) did not systematically alter flux magnitude, indicating no significant pressure or mixing artefact.[js]


4.6.2b CH4 Spatial Dynamics by Location
    [jt]  
	Figure, CH4 Fluxes by site | In μmol/m2s at the left and Kg/Ha⋅d at the right.[ju]
	The Central Site con[jv]tributed 75 % of the total seasonal emissions, whereas the East Trench was a net sink in spring and autumn (negative seasonal totals). East trench and Central site had similar behaviours, varying between 0 and 0.0015 kg ha⁻¹ d⁻¹ for both sites. 
West trench, represented only by the chamber number 8, had a particular behaviour related with high emission amounts [jw]which will be reviewed at the discussion section.




4.6.2c CH4 Seasonal Boxplots & Total Accumulation Bar Plots
  
  
[jx]
	Figure, CH4 Seasonal Flux Accumulation and Total Mass Accumulated per Chamber | No trench in red and orange; trench in light blue and blue respectively. [jy]
	Methane fluxes revealed a highly fragmented micro-landscape rather than a uniform field. As shown in the faceted spatial dynamics and the density distributions, the Central Si[jz]te (no trench) acted as a net source, contributing >75% of total seasonal emissions with predominantly positive fluxes and occasional severe spikes. Chambers P1 and P2 in the East Trench showed net negative balances, indicating they functioned as methanotrophic sinks rather than sources.
In contrast, the East Trench functioned as a small but persistent methanotrophic sink, yielding net negative balances in spring and autumn. The temporal data showed no clear diel cycle,[ka] but the seasonal accumulation demonstrated a distinct seasonal magnitude. Summer (June–August) showed the highest median flux (C.C kg ha⁻¹ season⁻¹),w[kb]hile winter was lowest.
3.6.3 Nitrous oxide emissions 
For a question of space the figures can be found at the Annex, figures. [kc]
Unlike CH₄, nitrous oxide fluxes were generally low, though characterized by high temporal variability. Dual-axis time series (First figure[kd]) revealed that N₂O emissions are strictly episodic, with the most significant emission peaks occurring almost exclusively following rainfall events. [ke][kf]
As shown by the seasonal accumulation plots (Fourth figure), a[kg]utumn accounted for more than 50% of annual N₂O emissions across all sites, whereas the drier summer months inhibited activity. 
Regarding spatial distribution (Figures second and third)[kh], the Central Site recorded the highest fluxes (outliers), while the East Ditc[ki]h chambers remained near baseline levels, suggesting that local soil conditions largely determine the magnitude of emissions. 
3.6.4 Carbon Dioxide CO2[kj]
For a question of space the figures can be found at the Annex, figures. [kk]
The CO2 efflux patterns presented here reflect the metabolic activity of the soil microbial community and root systems across the monitored trenches. It is critical to note that because the measurements were performed in dark chambers, the CO2 fluxes represent soil respiration exclusively. 
Given that measurements were conducted using opaque chambers, the CO₂ flux presented here represents exclusively soil respiration (heterotrophic + autotrophic), reflecting the intensity of the soil's biological engine activity without photosynthetic interference. 
The continuous time series (First figure) displayed a distinct seasonal pattern driven by temperature, with a pronounced peak in summer (~60% of annual respiration) and a drop to near-zero values ​​in winter (<5%). 
Different to the observations for trace gases, the magnitude of the CO₂ flux did not show a systematic trenching effect in the aggregated means (Second figure); instead, there was significant spatial variation among the different chambers at a single site (Third figure), reflecting localized differences in microbial turnover.
3.6.5 Summary of key findings[kl]
            1. CH₄: Central Site was a net source; East Trench a net sink. Summer emissions dominated.
            2. N₂O: Central Site (no trench) produced highest fluxes, with autumn as the main emission window.
            3. CO₂ (soil respiration): Strong seasonal pattern, temperature‑driven, with no clear trench effect.
            4. Chamber height (16 vs. 42 cm) did not significantly affect flux estimates, confirming that volume corrections were adequate.
3.7 Net Ecosystem Balances
The following figures present the net GHG balance for Klimafarm’s cropland, integrating continuous CO₂ footprint-level fluxes, measured via an EC tower with localized, discrete methane and nitrous oxide (N₂O) emissions captured using manual static chambers.
  

	Figure, Net Daily GHG Balance | Pre vs Post Chamber Insertion. Error bars represent propagated standard error from chamber spatial variance (100-y GWP)
	The figure highlights a drastic shift, quantitative and qualitative. Prior to incorporating data from the chambers, EC measurements alone characterize the site as a net carbon sink (negative forcing). 
However, when scaled CH₄ and N₂O fluxes are mathematically superimposed, the net balance completely reverses polarity, transforming according this figure the ecosystem into a significant net source of positive radiative forcing.[km]
This can also be seen in the following figures which illustrate the individual proportional contributions of each gas using stacked bar charts, based on 100-year and 20-year Global Warming Potential (GWP) horizons, respectively.[kn][ko]


  

	Figure, Daily GHG Balance | IPCC 20-year GWP. Stacked contributions of [kp]CO2, [kq]CH4, and [kr]N2O to the Net GHG Balance under a 20-year Global Warming Potential (GWP20) horizon.
	

  

	Figure, Daily GHG Balance | IPCC 100-year GWP. Stacked contributions of [ks]CO2, [kt]CH4, and [ku]N2O to the Net GHG Balance under a 100-year Global Warming Potential (GWP20) horizon.[kv]
	Across both time horizons, the cooling effect resulting from photosynthetic CO₂ uptake (the negative bar) is far outweighed by the warming effect of trace gases (the positive bars). In the 100-year global warming potential horizon, N₂O emissions account for a substantial portion of the positive forcing, alongside CH₄ emissions. 
When the time horizon is shortened to 20 years, the disproportionate short-term potency of CH₄ visually dominates the stacked bars, considerably intensifying the ecosystem's net warming effect.[kw]
3.8 Soil Physical Properties and Precompression Behaviour
The dataset from the 3 samples extracted (WA_0‑5cm, WA_25cm and WA_25‑35cm[kx], plus a 4th from Ekel used as reference) included field‑fresh weight, saturated weight, weight at pF1.8, weight after 200 kPa compression, and dry weight (105 °C). Air permeability measurements (flux, pressure, temperature) were available for all depths except WA_0‑5cm; therefore this depth was excluded from all air‑related analyses. The table available in method section reports the number of valid observations per depth for each derived variable.
3.8.1 Dry bulk density, total pore volume and wide coarse pores[ky]
Boxplots were used to compare the characteristics distribution across depths. The box represents the middle 50 % of the data, interquartile range [kz](IQR); being the bottom of the box the 25th percentile (Q1) and the top of the box the 75th percentile (Q3). The line inside the box is the median and and the whiskers (how far the data go) extend to 1.5 times the IQR.
  
[la]
	Figure, Dry bulk density | At the 4 different sites[lb]
	Dry bulk density ranged from 0.3 to 0.5 g cm⁻³. The highest median value was observed at EK_5cm (0.45 g cm⁻³), while the lowest occurred at WA_25‑30cm (0.15 g cm⁻³). The variability (IQR) was similar among depths, except for WA_25‑30 [lc]cm which showed a narrow spread.
  
[ld]
	Figure, Total Pore Volume (TPV) | Using saturated weight at the 4 different sites.
	Total Pore Volume (TPV) was highest in the deepest layer WA_25-30cm, median ≈ 85 % and decreased for surface layers, reaching the lowest value at WA_0-5cm and EK_5cm, both with median ≈ 75 %. 
  

	Figure, Wide Coarse Pores (WCP) | Using saturated & pF1.8 weights.
	Wide Coarse Pores (WCP), pores drained at pF1.8 showed a not so similar d[le]epth trend, characterized by lower absolute values (median range 5–17 %). The visual relationship between WCP/TPV was highest at WA_5cm and lowest for WA_25 cm.[lf]
3.8.2 Air conductivity before and after compression
Side‑by‑side boxplot was used for this comparison. [lg]with a logarithmic y‑axis because conductivity values spanned several orders of magnitude. The two stages (“pF1.8, before compression” and “200 kPa, after compression”) are shown paired for each depth using dodged boxes.
  
[lh]
	Figure, Air Conductivity | pF1.8 vs 200 kPa compression
	Air conductivity (kₐ, in m s⁻¹) at pF1.8 (pre‑compression) was consistently higher than after 200 kPa compression for all depths. The reduction was most pronounced at EK_5cm, where the median kₐ dropped from 1e-02 to 5.5×10⁻⁴ after compression (p < 0.05, Wilcoxon test). 
WA_0‑5cm was omitted due to lack of flux/gradient data.
3.8.3 Weight evolution across five stages
“Spaghetti” line plot was used to represent the evolution of the weight, where each line represents an individual sample, coloured by depth. 
The x‑axis shows the five consecutive stages: (1) Field fresh; (2) Saturated; (3) pF1.8; (4) Compressed at 200 kPa; (5) Dry at 105 °C.
The y‑axis shows the gross weight (cylinder + soil), allowing to check the samples trajectory and anomalies.[li]
All samples followed a clear decreasing trend: saturation increased weight relative to field fresh (due to water absorption), then weight gradually decreased while water was removed by suction (pF1.8) and mechanical compression (200 kPa), ending with the lowest weight after oven drying. 
  
[lj]
	Figure, Gross weight evolution across the 5 different stages.
	The spread among samples of the same depth was relatively narrow, indicating consistent handling. One outlier from sample WA25‑30 showed an unusual drop between pF1.8 and 200 kPa, possibly due to tare misrecording.[lk]
3.8.4 Pore water volume evolution (water as a pore‑filling proxy)
A similar “spaghetti” line plot was carried for the pore volume using the water volume as reference, calculated as (wet soil mass – dry soil mass).
 Stages are: (1) Field fresh, (2) Saturated, (3) pF1.8, and (4) compressed at 200 kPa. Dry stage is omitted because water volume is zero by definition.
  
[ll]
	Figure, Pore water volume | Evolution across four stages.
	Water volume increased consistently after saturation (from median 175 to 185 cm³ for the four sites [lm]on average), then progressively decreased at pF1.8 and further at 200 kPa. The largest absolute water loss during compression occurred at EK_5cm, while deeper samples lost less.
3.8.5 Precompression curves (oedometer tests)
3.8.5.a Individual site plots
The pre‑consolidation pressure (σ′p) marks the transition from recompression (small settlement increase with log stress) to virgin compression (large settlement increase). In all individual plots (Fig. 4.Xg₁–g₄), the dashed vertical lines generally fall near the “knee” of each curve, confirming that the provided σ′p values are reasonable estimates. 
For EK_5cm, σ′p ranged from X to Y kPa, indicating a lightly overconsolidated or normally consolidated state. In contrast, WA_25‑30cm showed higher σ′p values (Z to W kPa), suggesting a history of greater past loading.
  
[ln]
	  

	  

	  

	Figure, Precompression curves & sites | (Left-Up) Ekel 0-5 cm; (Right-Up) Wallener Au 0-5 cm; (Left-Down) Wallener Au 25 cm; (Right-Down) Wallener Au 25-30 cm.[lo]
	3.8.5.b Combined geometric‑mean plot[lp]
For each site, the geometric mean settlement ± geometric standard deviation is plotted, allowing direct comparison of the compression behaviour of the four depths. 
Geometrical mean was used in order to value the outliers less than what normal mean would do (Outliers, especially excessively large ones, pull the “traditional” mean significantly upward, giving a distorted picture of what a "typical" value in the dataset actually is).
  
[lq]
	Figure, Precompression curves | With geometric mean per site (all sites together).
	The geometric‑mean plot reveals that the compression curves are clearly separated by depth: WA_25‑30cm shows the stiffest response (smallest settlement for a given stress), followed by WA_25cm, then EK_5cm, and finally WA_0‑5cm shows the largest settlements. 
The error bands (geometric SD) are a bit wider at WA_0‑5cm, reflecting higher sample heterogeneity.
3.8 Ecohydrological coupling and atmospheric drivers[lr]
The final set of empirical results explores the ecosystem's physiological responses to varying micrometeorological conditions throughout the 2024 measurement campaign, focusing on available energy partitioning and carbon assimilation efficiency.
  
[ls][lt][lu]
	Figure Ecosystem WUE | Time series of eWUE, representing the ratio of assimilated carbon to transpired water.
	The figure shows the temporal evolution of eWUE, quantifying the relationship between GPP and ET. The time series reveals significant seasonal variation: eWUE peaks during optimal spring growth conditions, subsequently experiencing sharp, episodic declines during summer months.
  

	Figure Bowen Ratio | Daily Bowen ratio (H/LE) showing energy partitioning throughout the season.
	This thermal and water stress is corroborated by the Bowen Ratio Figure which plots the daily Bowen ratio (β = H/LE). The Bowen ratio remains clearly below 1.0 (indicating a predominance of latent heat and active transpiration) during spring and early summer. 
However, coinciding with the drops in eWUE, the Bowen ratio exhibits abrupt, pronounced spikes above 1.0[lv] in late summer. These spikes visually mark distinct periods when the ecosystem was forced to halt transpiration, redirecting incident solar radiation into sensible heat and aggressively warming the local boundary layer.
  
[lw]
	Figure, Photosynthesis vs Atmospheric Dryness | Scatter plot correlating Gross Primary Productivity with atmospheric VPD. 
	The GPP vs VPD figure presents a direct correlation, shown via a scatter plot, between GPP and VPD. 
The data points illustrate a non-linear, parabolic limiting curve. At low to moderate VPD values ​​(0 to 15 hPa), GPP increases, reaching peak photosynthetic rates. However, as VPD rises further toward conditions of extreme atmospheric drought (> 20 hPa), the positive correlation breaks down; GPP values ​​stabilize and subsequently decline consistently, demonstrating a strict physiological limiting effect, regardless of available solar radiation.










IV. D I S C U S S I O N[lx]
(extra) “Therefore, understanding soil–water-vegetation and their components (proportions and types of organic matter, redox state, porosity, saturation, and hydraulic conductivity, between others) interactions becomes relevant to interpret and analyse the dynamics of gas emission and absorption in wetlands”.
The conversion of natural ecosystems into plantations or agricultural systems can lead to a significant reduction in soil microbial diversity, affecting its capacity to sustain long-term biogeochemical processes (Chunzi et al., 2019). In the context of wetland restoration, the recovery of functional microbial communities is a key factor in restoring the balance between carbon storage and methane emissions.
Net CH₄ emission is determined by the balance between its production, oxidation, and transport. In permanently saturated, anoxic peat, methanogenesis is favoured, whereas sulfate-reducing and other anaerobic microorganisms can suppress it by competing with methanogens for substrates. 
__
The observed fluctuations in greenhouse gas fluxes reflect the rapid reorganization of microbial pathways following ecosystem rewetting. Flooding the drained peat profile alters soil porosity and restricts oxygen diffusion, forcing a shift from efficient aerobic respiration to anaerobic metabolic cascades. During this transition, the persistence of moderately oxidized microsites or fluctuating water tables can accelerate N2O formation, likely driven by incomplete denitrification as alternative electron acceptors become transiently available. 
As stable anoxia establishes in the deeper peat layers, microbial metabolism shifts toward fermentation and anaerobic respiration. This suppresses the rapid aerobic degradation of the peat matrix, but simultaneously generates the CO₂, molecular hydrogen, and acetate pools required to initiate methanogenesis. However, the net atmospheric emission of methane from these rewetted systems is ultimately governed by the efficiency of aerobic methane oxidation. The establishment of oxygenated boundaries—either at the rising water-atmosphere interface or within the newly developing rhizosphere of wetland vegetation—acts as a critical biological filter, converting a substantial fraction of the subsurface methane back into CO₂ before it can escape (Megonigal et al., 2004). Consequently, the temporal heterogeneity of these gas fluxes highlights that rewetting does not instantly stabilize a peatland, but rather initiates a complex biogeochemical balancing act between carbon sequestration and transient greenhouse gas production.
___ 
The artificial reflooding of historically drained peatlands induces a rapid metabolic shift known as a "rewetting pulse," driven by the sudden availability of accumulated substrates. During the preceding drained phase, prolonged aeration accelerates the enzymatic breakdown of the peat matrix, leading to a substantial accumulation of highly labile, water-soluble organic carbon. Upon sudden water saturation and the subsequent collapse of oxygen diffusion, fermentative bacterial communities rapidly metabolize this stored carbon pool, resulting in a sharp, transient surge of low-molecular-weight organic acids and acetate. This concentrated substrate pulse rapidly depletes remaining alternative electron acceptors, overwhelming localized microbial regulation and driving immediate, outsized emission spikes of CH₄ and CO₂. Ultimately, this initial surge demonstrates that rewetting triggers a temporary phase of aggressive peat degradation and gaseous carbon release before stable anaerobic equilibria can establish.
__
EC and chambers measure the escape of gases originating from gas transport processes into the atmosphere via diffusion in soil and water, boiling (CH₄ bubbling), and plant transport (aerenchyma). From a conceptual perspective, wetlands can be understood as systems where fermentation acts as the basal metabolic engine, fueling a network of interconnected microbial processes (ref.).
The net methane emission observed using techniques such as EC or in situ chambers results from the dynamic balance between:
            * CH₄ production by methanogenesis
            * CH₄ consumption by aerobic and anaerobic oxidation
            * Gas transport through soil, water, and vegetation
This balance is highly sensitive to hydrological changes, such as rewetting, which modify oxygen availability, soil redox connectivity, and the structure of microbial communities (ref.).
"Looking forward, a critical avenue for future research involves a systematic investigation into the presence and mobilization of iron (Fe) within the soil matrix of these rewetted peatlands. Iron plays a foundational role in the biogeochemical cascades of wetlands, functioning as a primary terminal electron acceptor that heavily regulates both the reductive dissolution of minerals and microbial metabolic pathways under newly established anoxic conditions. Most notably, the dynamics of iron oxyhydroxides dictate the retention or dramatic release of legacy phosphorus into adjacent aquatic systems, a phenomenon that can inadvertently drive eutrophication during restoration. While the regional landscape of Northern Germany is historically characterized by an abundance of iron-rich mineral soils, it remains highly uncertain whether this signature abundance is maintained, depleted, or altered within the specific organic profiles of our studied peatlands after decades of anthropogenic drainage. Given that artificial drainage accelerates mineralization and reshapes chemical stratification, evaluating localized iron levels in future studies will be imperative to predicting whether these restored sites will act as long-term nutrient sinks or unexpected nutrient sources."


