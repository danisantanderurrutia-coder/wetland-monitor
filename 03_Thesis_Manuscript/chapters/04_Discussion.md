# Chapter 4: Discussion

4.1 Sink or Source
Relying solely on EC CO₂ fluxes can misrepresent an ecosystem as a simple carbon sink. On the series of experiments conducted for this thesis, integrating localized chamber measurements reveals, potent CH₄ and N₂O emissions from saturated, fertilized soil, shifting the net balance toward a potent warming source. 
The results demonstrate a fundamental divergence between the continuous carbon flux measured by the EC tower and the comprehensive greenhouse gas balance (GWP100). 
High-frequency CO₂ exchange can present the re-wetted agricultural peatland as a seasonal carbon sink, driven by crop photosynthetic assimilation. However, this apparent mitigation benefit could be seen as an illusion characteristic of disturbed peatlands. [ly]


  

	Figure, The full picture | After the integration of Chambers in a mosaic landscape, the behaviour of the peatland shifts from sink (left) to source (right) for the period of analysis. Graphic rendering assisted by AI tools.
	Integrating spatial chamber data overturns the assumption of a uniform landscape, revealing a highly fragmented biochemical engine. Persistent saturation of the degraded peat layer creates anaerobic microenvironments optimal for methanogenesis. 
Nevertheless, unlike EC measurements, which integrate landscape-level NEE, including plant-driven carbon uptake, this study focuses on the source strength of the soil biological engine. Therefore, variations in [lz]CO2 magnitude across sites should be interpreted as localized differences in organic matter decomposition rates and microbial turnover rather than an assessment of ecosystem-level carbon sequestration.[ma]
Yet, as the chamber data demonstrated, this is not a homogeneous process: the Central Site acted as a massive CH₄ hotspot, while the East Ditch, surprisingly, functioned as a methanotrophic sink, underscoring the extreme sensitivity of microbial communities to micro-topographic variations. 
The presence of agricultural fertilization effects provides an abundant substrate for denitrification, driving the episodic N₂O pulses captured by the chambers immediately following summer and autumn [mb]rains. When these potent and highly variable trace gases are standardized to their CO₂ warming equivalents, their high radiative forcing overwhelmingly offsets photosynthetic CO₂ uptake. 
This dynamic underscores the critical need for a multi-GHG approach; evaluating agricultural peatlands in transition based solely on turbulent CO₂ fluxes severely underestimates[mc] their true climate cost.
4.2 Ecohydrological lag & agricultural drainage repercussions
The transition from carbon sink to GHG source is not merely a biochemical process, but is fundamentally regulated by the physical degradation of the soil profile. The continuou[md]s monitoring of subsurface conditions revealed a severe hydrological latency,[me] contradicting the assumption that rewetting simply restores the natural water table.
The precompression curves (oedometer tests) and particularly the geometric-mean settlement curves proved that the surface layers (WA_0-5cm) are stiff, exhibiting minimal settlement under virgin compression compared to the highly vulnerable and compressible deep layer (WA_25-30cm[mf]). 
This mathematically confirms the existence of a severely overconsolidated surface cap, a physical scar left by decades of agricultural drainage and heavy machinery usage that has literally crushed the topsoil matrix. The step drop in air conductivity post-compression further highlights this stress-induced pore collapse.
This stratigraphic configuration is the foundational physical constraint [mg]of the entire Klimafarm experiment. The mechanical compaction of the upper soil horizons prevents deep roots from easily accessing the groundwater table during droughts, and it prevents standing surface water from draining during floods.[mh]
Consequently, this hidden subsurface structural degradation acts as the primary governor of the ecosystem's surface-atmosphere fluxes—directly forcing the rapid decline in eWUE, driving the Bowen ratio up during atmospheric drought, and suffocating deep soil microbial respiration.[mi]
This legacy of compaction seems to restrict upward capillary transport. Consequently, during periods where the shallow soil is temporarily saturated by precipitation, the ecosystem's energy balance would prioritize latent heat flux (ET), maintaining a Bowen ratio below 1. [mj]
Still, as this shallow moisture is rapidly depleted during rainless periods, the impermeable compacted layer prevents groundwater from replenishing the root zone. This structural limitation might impose a strong physical boundary on evapotranspiration, forcing the crop into water conservation mode, stunting further carbon assimilation, and driving the Bowen ratio upward, inducing localized thermal stress.
4.3 Vegetation Response to Atmospheric Drought
The resulting disconnection from the deeper groundwater reservoir would have to force a rapid physiological response from the vegetation. 
This can be seen through the relationship between GPP and VPD highlights a classic trade-off. Initially, GPP scales positively with moderate VPD, as solar radiation and temperature optimize photosynthetic rates. But, under extreme VPD conditions (or atmospheric drought), the data shows GPP plateauing [mk]or declining despite available sunlight. 
  

	Figure, Schematic interpretation of the observed ecohydrological restriction | High atmospheric demand (VPD) triggers stomatal closure, limiting photosynthetic [ml]CO2 uptake (GPP) despite the presence of deep groundwater and abundant solar radiation. Graphic rendering assisted by AI tools.[mm]
	This inflection point can indicate strong stomatal control: the vegetation actively down-regulates stomatal conductance to prevent catastrophic hydraulic failure, prioritizing water conservation over carbon assimilation. [mn]
This sensitivity underscores the ecosystem's vulnerability to atmospheric heatwaves: even when subsurface groundwater might still be present, the physical destruction of the soil pores prevents the plants from accessing it.
4.4 Methodological reflections: gap-filling and microclimate variability[mo]
Critical analysis of the data processing workflow revealed several methodological fine distinctions that significantly influence the interpretation of carbon fluxes.
Is good to count with a biological base to guide the gapfilling[mp]. The mathematical decomposition of NEE into Reco and GPP (using Lloyd-Taylor and Michaelis-Menten regressions) proved to be more than a mere statistical exercise. Together, these independent empirical fits can provide the actual biological foundation needed to accurately simulate continuous carbon flux during sensor downtime or adverse weather conditions, preventing the algorithm from relying on arbitrary mathematical interpolations.
Regarding the friction velocity threshold filter, the mass data exclusion based on a friction velocity threshold is a methodological necessity to avoid the "nighttime problem", where respired CO₂ accumulates below sensor height during [mq]calm nights and which would otherwise artificially inflate the annual carbon sink estimate.
The difference between sensor reference depth (5 cm vs. 50 cm estimate) allowed a comparative analysis of respiration models based on different soil depths revealed a profound and counterintuitive mathematical aspect in the Lloyd-Taylor exponential regression. 
Intuitively, one might expect the highly variable surface temperature at 5 cm to produce extremely variable and erratic respiration models. However, the regression algorithm actively compensates for this extreme diurnal variance by dampening the temperature sensitivity parameter. As a result, the model driven by the 5-cm sensor appears artificially flat; it persists through the summer but remains completely insensitive to the large-magnitude biological spikes actually measured by the tower. 
In contrast, the reference sensor at the greater depth (50 cm) exhibits high thermal inertia and low variance. To fit the same nighttime respiration data, the regression assigns it a very high sensitivity parameter. 
While this allows the model to capture the true biological magnitude during stable periods, it renders the algorithm extremely fragile: when the deeper soil finally warms slightly in mid-summer, the high sensitivity causes the exponential function to spike—a failure exacerbated by actual physical sensor interruptions. 
The temperature-based models have their limitations. The positive carbon balances, biologically unrealistic, obtained with both variants of Model A highlight the limitations of using a physiological model based exclusively on temperature in a system subject to summer droughts, storms or other extreme events. 
By relying solely on soil temperature, Model A vastly overestimates or completely overlooks summer respiration dynamics, as it ignores the desiccation of the upper soil profile layers. In contrast, Model B (MDS) implicitly captures moisture limitations and seasonal phenology by interpolating missing data from temporally adjacent days, thereby bypassing the mathematical issues inherent in continuous exponential regressions.
Critical analysis of the data processing workflow revealed methodological shades that significantly influence the interpretation of these ecosystems.
The standard method for interpolating missing data for NEE, based on MDS, performed excellently during the active growing season, reconstructing the diurnal sinusoidal patterns driven by radiation and temperature. 
However, during the inactive periods, the absence of environmental drivers can force the algorithm to extrapolate with high variance, generating artificial, step-like noise. This highlights a structural limitation of standard interpolation algorithms during season with difficulties on the measurements. This could suggest that winter emission estimates inherently a greater uncertainty.
Furthermore, explicitly preserving microclimatic heterogeneity proved crucial. Standardizing data through the indiscriminate averaging of spatial replicates obscures physical realities. 
By maintaining distinct depth profiles for soil temperature, the analysis successfully captured the dramatic thermal buffering between the shallow and deep soil layers. This analysis proves that using shallow unbuffered sensors for basal respiration models forces mathematical mistakes (as supression of real data) underestimating reality while using stable deeper sensors risks algorithmic explosion during anomalous summer warming. 
Similarly, isolating the spatial variance of SHF pla[mr]tes and individual groundwater loggers allowed for the identification of localized anomalies (e.g., micro-topographical pooling) that would have otherwise skewed the field-scale mean. 
This spatial resolution is critical for accurately bounding the uncertainty of the EBC in highly heterogeneous, transitional landscapes.
4.5 The energy balance closure problem: advection and thermal storage
The systematic 15% [ms]energy deficit observed in the results (slope = 0.85) indicates neither an instrumental failure nor a data processing error; rather, this imbalance rigorously confirms the presence of highly complex thermodynamic gradients at the Klimafarm site.
In the specific context of the Wallener Au farmlands[mt], the structural deficit in measured turbulent energy can theoretically be attributed to the marked microtopographic heterogeneity [mu]of the peatland system.
First, the presence of distinct wet and dry microzones induces horizontal advective transport. This phenomenon channels unmeasured sensible heat from adjacent drier sectors toward the wet zones, thereby violating the strict vertical one-dimensional assumption required by the EC technique (Foken, 2008).[mv]
Second, periods of high water tables and soil saturation generate a massive, unmeasured thermal storage component within the soil profile and in surface standing water. This high-heat-capacity environment deviates available Net Radiation (Rn) towards heating the water column, a flux that is not captured by standard shallow soil heat flux plates (G). A better scenario is stablished by the Soil Water Temperature data collected by spatially distributed devices. [mw]
This heterogeneous distribution of heat conduction, likely driven by variations in microtopography, vegetation cover, and localized moisture accumulation, seems to provide the physical explanation for the observed EBC deficits. 
Consequently, the energy balance deficit reflected in the data might not represent a failure of the EC system, but rather an accurate record of a saturated and highly heterogeneous landscape, where a significant amount of energy remains "hidden" in horizontal advection and deep-water thermal storage.[mx]
4.6 Ecological Transition and Socio-Economic Tradeoffs of Rewetting
Rewetting wetlands is not a rapid fix; it is a landscape-scale ecosystem experiment whose transition can take decades to stabilize. During this latency period, the ecosystem reflects heavy fluctuations in greenhouse gas cycles before approaching a new equilibrium, underscoring the critical importance of long-term monitoring to evaluate restoration success (Evans et al., 2021). While the groundwater table is heavily utilized as the primary control variable for rewetting processes, this physical indicator alone is insufficient to holistically evaluate [my]the restoration of a degraded wetland.
The financial and environmental tradeoffs of managing peatland forests dictate whether rewetting or alternative management techniques are the correct pathway, as exemplified by the 302,585 hectares of peatlands in Lithuania (Kalhori et al., 2024). Conversely, rewetted peatland forests successfully arrest these massive CO2 losses, returning the ecosystem to a net positive value of €122 per hectare per year.
  

	Figure, Tradeoffs of draining and rewetting | Lithuania’s peatland forests: 302 585 ha. Extracted from Kalhori A., et al., 2024.
	However, scaling these restoration strategies exposes complex socio-economic tensions. The expansion of carbon markets and Payment for Ecosystem Services (PES) methodologies risks the financialization and commodification of nature. 
Transacting ecosystem services without recognizing that nature is not a simply replaceable commodity can lead to reductive management strategies. 
Furthermore, active ecological restoration remains highly intensive and economically restrictive. At present, there is a severe lack of heavy machinery[mz] capable of operating on saturated terrain, forcing many projects (such as common reed management in the US) to rely on manual labor. This makes large-scale rewetting expensive in terms of energy and workforce. 
Therefore, it is essential to incorporate active ecological management during the transition, supporting the ecosystem with targeted plant succession and acknowledging that, even in protected areas, economically viable methods for large-scale rewetting are still deeply limited.
Ultimately, robust restoration [na]strategies are vital, as healthy wetlands serve as critical bulwarks against systemic environmental hazards, including biodiversity collapse and the catastrophic spread of wildfires (Santander D., et al., 2023; Santander D., et al., 2026).


Methodological implications from Complementary but not implemented methods
The absence of methods such as in situ hydrological and physichochemical measurements, electrical conductivity, redox potential, disolved oxigenparticle size distribution, total carbon content and satelital data flux mapper does not compromise the EC framework employed in this thesis; however, it limits the extent to which ecosystem-scale fluxes can be mechanistically linked to subsurface biogeochemical processes.[nb]
While EC provides robust estimates of net greenhouse gas exchange, future studies integrating continuous flux measurements with detailed hydrological and soil biogeochemical observations would substantially improve process attribution and predictive understanding of carbon dynamics in transitioning wetlands.




























V. C O N C L U S I O N S


Integrating continuous EC measurements with high-resolution discrete chamber data provides a comprehensive understanding of the Wallener Au (Klimafarm) ecosystem. A key finding is that implementing a post-gap-filling integration module demonstrates t[nc]hat relying solely on continuous CO₂ measurements is profoundly insufficient for assessing the climate mitigation potential of rewetted agricultural peatlands. Tower data obtained "pre-integration" create the illusion of a seasonal carbon sink, whereas the total greenhouse gas (GHG) balance "post-integration" reveals a net emission source driven by intense, spatially heterogeneous CH₄ and N₂O fluxes.
From a physical perspective, oedometer pre-compression curves provide mathematical [nd]evidence that the soil, heavily compacted by decades of historical drainage, acts as an impermeable barrier. This severe structural degradation radically alters the ecosystem's ecohydrology, decoupling the vegetation [ne]from the deep water table and causing intense atmospheric water stress during droughts, despite active rewetting efforts. Understanding this mechanical behavior is crucial, as the soil's ability to resist further deformation and maintain a functional porous structure is a key factor in the management of restored wetlands to climate and land-use changes.
Methodologically, this study demonstrates the imperative need to adapt generalized flux-processing protocols to site-specific physical realities. By resolving specific temporal alignment issues, avoiding the premature aggregation of vertical and horizontal spatial replicates, integrating fluxes measured via manual chambers, and actively eliminating redundant mathematical artifacts from respiration models, the adapted protocol offers a highly transparent transition from raw turbulent fluxes to integrated seasonal balances. This integrated analytical framework not only makes it possible to distinguish algorithmic products from actual physiological responses but also establishes a rigorous, verifiable baseline for the long-term monitoring of GHG at Klimafarm.
Consequently, the need for precise, ecosystem-scale monitoring to assess the climate and environmental impacts of restoration processes is becoming increasingly evident. Pre-existing degradation conditions, the intensity of historical drainage, and the consequences of land use directly influence the trajectory of ecological restoration. [nf]
This study provides a high-resolution analysis of the soil's contribution to greenhouse gas fluxes in the wetlands of Schleswig-Holstein. By focusing on dark-chamber measurements, [ng]it was possible to isolate soil emissions from net ecosystem uptake, thereby allowing for an accurate assessment of how microbial metabolism drives gas release in landscapes undergoing transition. 
While these results quantify carbon output from the soil surface, they must be viewed within the context of a broader carbon balance; integrating these findings with landscape-scale measurements in future research will be crucial to understanding the ultimate net climate impact of these transitioning habitats.
































V. R E F E R E N C E S




Abrams, J. (2016). Impacts of Indonesian peatland degradation on the coastal ecosystems and the global carbon cycle (Doctoral dissertation, Jacobs University Bremen).
Ahmad, S., Liu, H., Günther, A., Couwenberg, J., & Lennartz, B. (2020). Long-term rewetting of degraded peatlands restores hydrological buffer function. Science of the Total Environment, 749, 141571.
Amthor, J. S. (2025). After photosynthesis, what then: Importance of respiration to crop growth and yield. Field crops research, 321, 109638.
Arets, E. J. M. M., Kruijt, B., Tjon, K., Atmopawiro, V. P., van Kanten, R. F., & Crabbe, S. (2011). Towards a carbon balance for forests in Suriname. Alterra: Wageningen, The Netherlands.
Armstrong, W. (1980). Aeration in higher plants. In Advances in botanical research (Vol. 7, pp. 225-332). Academic Press.
Aubinet, M., Vesala, T., & Papale, D. (Eds.). (2012). EC: a practical guide to measurement and data analysis. Springer Science & Business Media.
Baldocchi, D. (2014). Measuring fluxes of trace gases and energy between ecosystems and the atmosphere–the state and future of the EC method. Global change biology, 20(12), 3600-3609.
Bloom, A. A., Palmer, P. I., Fraser, A., Reay, D. S., & Frankenberg, C. (2010). Large-scale controls of methanogenesis inferred from methane and gravity spaceborne data. Science, 327(5963), 322-325.
Bloom, A. A., Palmer, P. I., Fraser, A., & Reay, D. S. (2012). Seasonal variability of tropical wetland CH4 [nh]emissions: the role of the methanogen-available carbon pool. Biogeosciences, 9(8), 2821-2830.
Bloom, A. A., Bowman, K. W., Lee, M., Turner, A. J., Schroeder, R., Worden, J. R., ... & Jacob, D. J. (2017). A global wetland methane emissions and uncertainty dataset for atmospheric chemical transport models (WetCHARTs version 1.0). Geoscientific Model Development, 10(6), 2141-2156.
Bridgham, S. D., Updegraff, K., & Pastor, J. (1998). Carbon, nitrogen, and phosphorus mineralization in northern wetlands. Ecology, 79(5), 1545-1561.
Bridgham, S. D., Cadillo‐Quiroz, H., Keller, J. K., & Zhuang, Q. (2013). Methane emissions from wetlands: biogeochemical, microbial, and modeling perspectives from local to global scales. Global change biology, 19(5), 1325-1346. 
Bundesministerium für Umwelt, Naturschutz, nukleare Sicherheit und Verbraucherschutz (BMUV). (n.d.). Förderung von Moorschutz- und Klimaschutzprojekten. https://www.bmuv.de
Burba, G., Schmidt, A., Scott, R. L., Nakai, T., Kathilankal, J., Fratini, G., ... & Velgersdyk, M. (2012). Calculating CO2 and H2O EC fluxes from an enclosed gas analyzer using an instantaneous mixing ratio. Global Change Biology, 18(1), 385-399.
Burba, G. (2013). EC method for scientific, industrial, agricultural and regulatory applications: A field book on measuring ecosystem gas exchange and areal emission rates. LI-Cor Biosciences.[ni]
Burba, G., Anderson, T., & Komissarov, A. (2019). Accounting for spectroscopic effects in laser‐based open‐path EC flux measurements. Global change biology, 25(6), 2189-2202.
Burba, G. (2025). Harvesting Carbon: Fields & Grasslands: A Guide to Utilizing Direct Flux Measurements for Assessment and Verification of Carbon Sequestration and GHG Emission Rates over Areas. LI-COR.
Butterbach-Bahl, K., Baggs, E. M., Dannenmann, M., Kiese, R., & Zechmeister-Boltenstern, S. (2013). Nitrous oxide emissions from soils: how well do we understand the processes and their controls?. Philosophical Transactions of the Royal Society B: Biological Sciences, 368(1621), 20130122.
Butterbach-Bahl, K., Sander, B. O., Pelster, D., & Díaz-Pinés, E. (2016). Quantifying greenhouse gas emissions from managed and natural soils. In Methods for measuring greenhouse gas balances and evaluating mitigation options in smallholder agriculture (pp. 71-96). Cham: Springer International Publishing.
Butterbach-Bahl, K., Værge, A. B., Dold, C., Bruun, S., Erlang-Nielsen, M., Olesen, J. E., ... & Abalos, D. (2025). From field measurements to national inventories and smart incentives—the SmartField approach for agricultural soil N2O fluxes. Environmental Research Letters, 20(11), 114078.
Carbon Brief. (2018). Explainer: What climate models tell us about future rainfall. ​
CBD. (2022). Kunming–Montreal Global Biodiversity Framework.
Chang, H., Ren, Y., Zhang, H., Liang, J., Cao, X., Tian, P., ... & Zhang, L. (2024). The characteristics of turbulence intermittency and its impact on surface energy imbalance over Loess Plateau. Agricultural and Forest Meteorology, 354, 110088.
Chapin, F. S., Matson, P. A., & Vitousek, P. M. (2011). Principles of terrestrial ecosystem ecology (2nd ed.). Springer Science & Business Media.
Christian-Albrechts-Universität zu Kiel. (n.d.). Forschung zu Mooren, Biodiversität und Klimaschutz. Retrieved June 13, 2026, from https://www.uni-kiel.de
Christian-Albrechts-Universität zu Kiel CAU (2021). Satzung zur Sicherung guter wissenschaftlicher Praxis an der Christian-Albrechts-Universität zu Kiel. Christian-Albrechts-Universität zu Kiel. Kiel, Germany.
Chunzi, W., Danju, Z., Junli, Y., Zhiqun, T., & Jian, Z. (2019). Soil microbial community diversity and composition across a range of Eucalyptus grandis plantations of different ages.
[nj]
Cui, S., Guo, H., Pugliese, L., Nielsen, C. K., & Wu, S. (2025). Controlled burning of peat before rewetting modifies soil chemistry and microbial dynamics to reduce short-term methane emissions. Communications Earth & Environment, 6(1), 346.
Darusman, T., Murdiyarso, D., Impron, & Anas, I. (2023). Effect of rewetting degraded peatlands on carbon fluxes: a meta-analysis. Mitigation and Adaptation Strategies for Global Change, 28(3), 10.
Davidson, N. C., Fluet-Chouinard, E., & Finlayson, C. M. (2018). Global extent and distribution of wetlands: trends and issues. Marine and Freshwater Research, 69(4), 620-627.
Deutsche Forschungsgemeinschaft DFG (2023). Stellungnahme des Präsidiums der DFG zum Einfluss generativer Modelle zur Text- und Bilderstellung auf die Wissenschaftspraxis. Deutsche Forschungsgemeinschaft. Bonn, Germany.
EUDAT. (n.d). Integrated Carbon Observation System. Retrieved from EUDAT.
Evans, C. D., Peacock, M., Baird, A. J., Artz, R. R. E., Burden, A., Callaghan, N., ... & Morrison, R. (2021). Overriding water table control on managed peatland greenhouse gas emissions. Nature, 593(7860), 548-552.
FAO: Peatland mapping and monitoring: Recommendations and technical overview. FAO, Rome, Italy, 2020.
Fazekas, O. (2005). Bedeutung von Bodenstruktur und Wasserspannung als stabilisierende Kenngrößen gegen intensive mechanische Belastungen in einer Parabraunerde aus Löss unter Pflug- und Mulchsaat [The Significance of Soil Structure and Water Tension as Stabilizing Parameters Against Intensive Mechanical Loads in a Loess-Derived Luvisol Under Plow and Mulch Tillage]. Christian-Albrechts-Universität zu Kiel. Schriftenreihe des Instituts für Pflanzenernährung und Bodenkunde, Band 67.
Finger, R. A., Turetsky, M. R., Kielland, K., Ruess, R. W., Mack, M. C., & Euskirchen, E. S. (2016). Effects of permafrost thaw on nitrogen availability and plant–soil interactions in a boreal Alaskan lowland. Journal of Ecology, 104(6), 1542-1554.
Foken, T., & Mauder, M. (2008). Micrometeorology (Vol. 2, p. 306). Berlin: Springer.
Foken, T., Göckede, M., Mauder, M., Mahrt, L., Amiro, B. D., & Munger, J. W. (2004). Post-field data quality control. In X. Lee, W. Massman, & B. Law (Eds.), Handbook of Micrometeorology (pp. 181–208). Springer.
Foken, Thomas & Leuning, Ray & Mauder, Matthias & Aubinet, Marc. (2012). Corrections and Data Quality Control. 10.1007/978-94-007-2351-1_4. 
Fonte, S. J., Winsome, T., & Six, J. (2009). Earthworm populations in relation to soil organic matter dynamics and management in California tomato cropping systems. Applied soil ecology, 41(2), 206-214.
Geotech with Naqeeb (2022). How to perform moisture content of soil using oven dry method [Video]. YouTube.
Gios, E., et al. 2024. Unraveling microbial processes involved in carbon and nitrogen cycling and greenhouse gas emissions in rewetted peatlands by molecular biology. Biogeochemistry, 167, 609–629. 
Gomes, A. T. A., Molion, E., Souto, R. P., & Méhaut, J. F. (2021). Memory allocation anomalies in high‐performance computing applications: A study with numerical simulations. Concurrency and Computation: Practice and Experience, 33(18), e6094.
Green, R. (2019). Finite element modeling of a suction caisson subject to monotonic tensile loading. University of Delaware.
Greifswald Mire Centre. (2023). Q&A Peatland rewetting: Facts and figures on rewetting peatlands for climate protection. greifswaldmoor.de
Gunawardhana, M., Silvester, E., Jones, O. A., & Grover, S. (2021). Evapotranspiration and biogeochemical regulation in a mountain peatland: insights from EC and ionic balance measurements. Journal of Hydrology: Regional Studies, 36, 100851.
Gutekunst, C. N., et al. 2022. Effects of brackish water inflow on methane-cycling microbial communities in a freshwater rewetted coastal fen. Biogeosciences, 19, 3625–3648. 
Günther, A., Huth, V., Jurasinski, G., & Glatzel, S. (2015). The effect of biomass harvesting on greenhouse gas emissions from a rewetted temperate fen. Gcb Bioenergy, 7(5), 1092-1106.
Helbig, M., Gerken, T., Beamesderfer, E. R., Baldocchi, D. D., Banerjee, T., Biraud, S. C., ... & Richardson, A. D. (2021). Integrating continuous atmospheric boundary layer and tower-based flux measurements to advance understanding of land-atmosphere interactions. Agricultural and Forest Meteorology, 307, 108509.
Hoegh-Guldberg, O., Jacob, D., Taylor, M., Bindi, M., Brown, S., Camilloni, I., Diedhiou, A., Djalante, R., Ebi, K., Engelbrecht, F., Guiot, J., Hijioka, Y., Mehrotra, S., Payne, A., Seneviratne, S. I., Thomas, A., Warren, R., & Zhou, G. (2018). Impacts of 1.5ºC global warming on natural and human systems. In V. Masson-Delmotte, P. Zhai, H.-O. Pörtner, D. Roberts, J. Skea, P. R. Shukla, A. Pirani, W. Moufouma-Okia, C. Péan, R. Pidcock, S. Connors, J. B. R. Matthews, Y. Chen, X. Zhou, M. I. Gomis, E. Lonnoy, T. Maycock, M. Tignor, & T. Waterfield (Eds.), Global warming of 1.5°C. An IPCC Special Report on the impacts of global warming of 1.5°C above pre-industrial levels and related global greenhouse gas emission pathways, in the context of strengthening the global response to the threat of climate change, sustainable development, and efforts to eradicate poverty (pp. 175–311). Intergovernmental Panel on Climate Change (IPCC). https://www.ipcc.ch/sr15/chapter/chapter-3
Holl, D., Pfeiffer, E. M., & Kutzbach, L. (2020). Comparison of EC CO 2 and CH 4 fluxes from mined and recently rewetted sections in a northwestern German cutover bog. Biogeosciences, 17(10), 2853-2874.
Honnert, R., Efstathiou, G. A., Beare, R. J., Ito, J., Lock, A., Neggers, R., ... & Zhou, B. (2020). The atmospheric boundary layer and the “gray zone” of turbulence: A critical review. Journal of Geophysical Research: Atmospheres, 125(13), e2019JD030317.
Horn, R., & Blum, W. E. (2020). Effect of land-use management systems on coupled physical and mechanical, chemical and biological soil processes: How can we maintain and predict soil properties and functions. Front. Agric. Sci. Eng, 7, 243-245.
Husson, O. (2013). Redox potential (Eh) and pH as primary drivers of soil/plant/microorganism systems: a unified concept to explain plant health and functioning. Plant and Soil, 362(1), 389–417. 
IPCC. (2021). Climate Change 2021: The Physical Science Basis. Cambridge University Press.
IPCC. (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability. Cambridge University Press.
IUCN, "Peatlands and climate change," IUCN, 2016. [Online]. Available: https://www.iucn.org/resources/issuesbriefs/peatlands-and-climate-change. 
Joel, M. F., & Glina, B. 2026. From drainage to rewetting—Soil transformations in European agricultural peatlands: A review. Agronomy, 16, 586. 
Kaimal, J. C., & Finnigan, J. J. (1994). Atmospheric boundary layer flows: their structure and measurement. Oxford university press.
Kalhori, A., Wille, C., Gottschalk, P., Li, Z., Hashemi, J., Kemper, K., & Sachs, T. (2024). Temporally dynamic carbon dioxide and methane emission factors for rewetted peatlands. Communications Earth & Environment, 5(1), 62.
Karasewicz, M., Wacławczyk, M., Ortiz-Amezcua, P., Janicka, Ł., Poczta, P., Kassar Borges, C., & Stachlewska, I. S. (2024). Investigation of non-equilibrium turbulence decay in the atmospheric boundary layer using Doppler lidar measurements. Atmospheric Chemistry and Physics, 24(23), 13231-13251.
Kjær, Johan. (2024). Carbon Dynamics in Wetlands Patterns, Drivers, and Effects of Restoration. 10.13140/RG.2.2.24984.10242. 
Koebsch, F., Günther, A., Huth, V., Sachs, T., Glatzel, S., & Jurasinski, G (2020). The climate efficacy of peatland rewetting under high CH4 emissions.
Korrensalo, A., Mammarella, I., Alekseychik, P., Vesala, T., & Tuittila, E. S. (2022). Plant mediated methane efflux from a boreal peatland complex. Plant and Soil, 471(1), 375-392.
Kowalska, N., Chojnicki, B. H., Rinne, J., Haapanala, S., Siedlecki, P., Urbaniak, M., ... & Olejnik, J. (2013). Measurements of methane emission from a temperate wetland by the EC method. International Agrophysics, 27(3).
Kustina, R., Pilicita, J. C., & Grygoruk, M. (2025). Issues of Peatland Restoration Across Scales: A Review and Meta-Analysis. Water, 17(16), 2428.
Lafleur, P. M., et al. (2005). Annual and seasonal variability in evapotranspiration and water table at a shrub-covered bog in southern Ontario, Canada. Hydrological Processes, 19(18), 3533–3550.
Lang, M. W., Bourgeau-Chavez, L. L., Tiner, R. W., & Klemas, V. V. (2015). Advances in remotely sensed data and techniques for wetland mapping and monitoring. Remote sensing of wetlands: Applications and advances, 574.
Latshaw, K., Fitzgerald, J., & Sutton, R. (2009). Analysis of green roof growing media porosity. RURALS: Review of Undergraduate Research in Agricultural and Life Sciences, 4(1), 2.
Laurila, T., Aurela, M., & Tuovinen, J. P. (2011). EC measurements over wetlands. In EC: A Practical Guide to Measurement and Data Analysis (pp. 345-364). Dordrecht: Springer Netherlands.
Lian , Y., Li, H., Renyang, Q., Liu, L., Dong, J., Liu, X., ... & Zhang, H. (2023). Mapping the net ecosystem exchange of CO2 of global terrestrial systems. International Journal of Applied Earth Observation and Geoinformation, 116, 103176.
Li, J., Hao, T., Yang, M., Chen, Z., & Yu, G. (2024b). Analysis of methane emission characteristics and environmental response in natural wetlands. Atmospheric Environment, 334, 120696.
Li, Q., Tietema, A., Reinsch, S., Schmidt, I. K., de Dato, G., Guidolotti, G., ... & Larsen, K. S. (2023). Higher sensitivity of gross primary productivity than ecosystem respiration to experimental drought and warming across six European shrubland ecosystems. Science of the Total Environment, 900, 165627.
Li, Q., Deng, H., He, R., Hu, S., Sun, L., Li, M., ... & Zeng, J. (2024a). Effects of different emergent macrophytes on methane flux and rhizosphere microbial communities in wetlands. Science of The Total Environment, 932, 172565.
Lian , Y., Li, H., Renyang, Q., Liu, L., Dong, J., Liu, X., ... & Zhang, H. (2023). Mapping the net ecosystem exchange of CO2 of global terrestrial systems. International Journal of Applied Earth Observation and Geoinformation, 116, 103176.
LICOR Biosciences. (2023). LI-COR 7820 N2O/H2O trace gas analyzer manual [Manual]. https://www.licor.com/env/products/trace-gas/LI-7820?
Lindahl, B. (2001). Nutrient cycling in boreal forests (No. 214).
Liu, H., Wrage-Mönnig, N., & Lennartz, B. 2020. Rewetting strategies to reduce nitrous oxide emissions from European peatlands. Communications Earth & Environment, 1. 
Livingston, G. P., & Hutchinson, G. L. , G. P. (1995). Chamber measurement of soil‐atmosphere gas exchange: Linear vs. diffusion‐based flux models. Soil Science Society of America Journal, 59(5), 1308-1310.
Livingston, G. P., & Hutchinson, G. L. (2009). of trace gas exchange: applications and sources of error. Biogenic trace gases: measuring emissions from soil and water, 14.
Luo, S., Yuan, J., Song, Y., Qi, J., Zhu, M., Feng, H., ... & Song, C. (2025). Bacterial network complexity drives carbon, nitrogen and phosphorus metabolism potential under short-term soil water content changes in wetlands. Environmental Research, 122952.
Ma, L., Zhu, G., Chen, B., Zhang, K., Niu, S., Wang, J., ... & Zuo, H. (2022). A globally robust relationship between water table decline, subsidence rate, and carbon release from peatlands. Communications Earth & Environment, 3(1), 254.
Madigan, M. T., Bender, K. S., Buckley, D. H., Sattley, W. M., & Stahl, D. A. (2020). Brock biology of microorganisms (16th ed.). Pearson.
Maiti, S. K., & Ghosh, D. (2020). Plant–soil interactions as a restoration tool. In Climate change and soil interactions (pp. 689-730). Elsevier.
Maljanen, M., Sigurdsson, B. D., Guðmundsson, J., Óskarsson, H., Huttunen, J. T., & Martikainen, P. J. (2010). Greenhouse gas balances of managed peatlands in the Nordic countries. Biogeosciences, 7(9), 2711–2738.
Mander, Ü., Espenberg, M., Melling, L., & Kull, A. (2024). Peatland restoration pathways to mitigate greenhouse gas emissions and retain peat carbon. Biogeochemistry, 167(4), 523-543.
Mander, Ü., Öpik, M., & Espenberg, M. (2025). Global peatland greenhouse gas dynamics: state of the art, processes, and perspectives. New Phytologist, 246(1), 94-102.
Mayen, J., Polsenaere, P., Lamaud, É., Arnaud, M., Kostyrka, P., Bonnefond, J. M., ... & Souchu, P. (2024). Atmospheric CO 2 exchanges measured by EC over a temperate salt marsh and influence of environmental controlling factors. Biogeosciences, 21(4), 993-1016.
McInerney, M. J., Sieber, J. R., & Gunsalus, R. P. (2009). Syntrophy in anaerobic global carbon cycles. Current Opinion in Biotechnology, 20(6), 623–632.
Megonigal, J. P., Hines, M. E., & Visscher, P. T. (2004). Anaerobic metabolism: Linkages to trace gases and aerobic processes. In W. H. Schlesinger (Ed.), Biogeochemistry (pp. 317–424). Elsevier Academic Press.
Meier, I. C., Brunner, I., Godbold, D. L., Helmisaari, H. S., Ostonen, I., Soudzilovskaia, N. A., & Prescott, C. E. (2019). Roots and rhizospheres in forest ecosystems: Recent advances and future challenges. Forest Ecology and Management, 431, 1-5.
Minkkinen, K., & Laine, J. (2006). Vegetation heterogeneity and ditches create spatial variability in methane fluxes from peatlands drained for forestry. Plant and Soil, 285(1), 289-304.
Mitsch, W. J., & Gosselink, J. G. (2015). Wetlands. John wiley & sons.
Monteil, G., Theanutti Kallingal, J., & Scholze, M. (2024). CH 4 emissions from Northern Europe wetlands: compared data assimilation approaches. EGUsphere, 2024, 1-36.
Myhre, G., Shindell, D., Bréon, F. M., Collins, W., Fuglestvedt, J., Huang, J., ... & Zhang, H. (2014). Anthropogenic and natural radiative forcing. Climate Change 2013-The Physical Science Basis, 659-740. 
Neugebauer, T. (2015). Bodenphysikalische Untersuchungen an Uferböden der Tideelbe als Grundlage für die Prognose des Kompressibilitätsindexes als Maß für den Widerstand gegen Wellenschlag [Soil Physical Investigations of Tidal Elbe Bank Soils as a Basis for Predicting the Compressibility Index as a Measure of Resistance to Wave Action](Schriftenreihe des Instituts für Pflanzenernährung und Bodenkunde, Heft 109). Christian-Albrechts-Universität zu Kiel.
Niu, Y., Kang, E., Li, Y., Zhang, X., Yan, Z., Li, M., ... & Cui, X. (2024). Non-flooding conditions caused by water table drawdown alter microbial network complexity and decrease multifunctionality in alpine wetland soils. Environmental Research, 254, 119152.
Ojanen, P., Minkkinen, K., Alm, J., & Penttilä, T. (2010). Soil–atmosphere  CO2, CH4 and N2O fluxes in boreal forestry-drained peatlands: Size of the source or sink depends on water table depth or site type. Forest Ecology and Management, 260(10), 1803–1817. 
Oke, T. R. (2002). Boundary layer climates. Routledge.
Page, S., et al. 2022. Anthropogenic impacts on lowland tropical peatland biogeochemistry. Nature Reviews Earth & Environment, 3, 426–443. 
Pan L. et al., 2024 Xiao, X., Yao, Y., Pan, B., Yin, C., Meng, C., ... & Zhang, C. (2024). Site-specific apparent optimum air temperature for vegetation photosynthesis across the globe. Scientific data, 11(1), 758.
Papale, D., Reichstein, M., Aubinet, M., Canfora, E., Bernhofer, C., Kutsch, W., ... & Yakir, D. (2006). Towards a standardized processing of Net Ecosystem Exchange measured with EC technique: algorithms and uncertainty estimation. Biogeosciences, 3(4), 571-583.
Papale, D. (2020). Ideas and perspectives: enhancing the impact of the FLUXNET network of EC sites. Biogeosciences, 17(22), 5587-5598.
Pelz, G. (2010). Die Berücksichtigung einer Vorbelastung bei der Mobilisierung des passiven Erddruckes feinkörniger Böden [Consideration of preloading in the mobilization of passive earth pressure in fine-grained soils] [Doctoral dissertation, Technische Universität München].
Peth, S. (2004): Bodenphysikalische Untersuchungen zur Trittbelastung von Böden bei der Rentierweidewirtschaft an borealen Wald- und subarktisch-alpinen Tundrenstandorten [Soil Physical Investigations into Soil Trampling under Reindeer Grazing in Boreal Forest and Subarctic-Alpine Tundra Environments]. Schriftenreihe des Inst. f. Pflanzenernährung und Bodenkunde, Heft Universität Kiel. 160 S. 
Pönisch, D. L., Bittig, H. C., Kolbe, M., Schuffenhauer, I., Otto, S., Holtermann, P., ... & Rehder, G. (2025). Variability of CO2 and CH4 in a coastal peatland rewetted with brackish water from the Baltic Sea derived from autonomous high-resolution measurements. Biogeosciences, 22(14), 3583-3614.
Rajakaruna, S., Makke, G., Grachet, N. G., Ayala-Ortiz, C., Bouranis, J., Hoyt, D. W., ... & Tfaily, M. M. (2024). Adding labile carbon to peatland soils triggers deep carbon breakdown. Communications Earth & Environment, 5(1), 792.
Ramsar Convention Secretariat. (2018). Convention on Wetlands of International Importance especially as Waterfowl Habitat (Ramsar Convention). Ramsar Secretariat. 
Ramsar Convention Secretariat. (2021). Wetlands and climate change: Issues and guidance. Ramsar Secretariat.
Reddy, K. R., DeLaune, R. D., & Inglett, P. W. (2022). Biogeochemistry of wetlands: science and applications. CRC press.
Reichstein, M., Falge, E., Baldocchi, D., Papale, D., Aubinet, M., Berbigier, P., ... & Valentini, R. (2005). On the separation of net ecosystem exchange into assimilation and ecosystem respiration: review and improved algorithm. Global change biology, 11(9), 1424-1439.
Renault, M. A., Bailey, B. N., Stoll, R., & Pardyjak, E. R. (2024). A rapid method for computing 3-D high-resolution vegetative canopy winds in weakly complex terrain. Frontiers in Earth Science, 11, 1251056.
Richardson, A. D., Aubinet, M., Barr, A. G., Hollinger, D. Y., Ibrom, A., Lasslop, G., & Reichstein, M. (2011). Uncertainty quantification. In EC: A practical guide to measurement and data analysis (pp. 173-209). Dordrecht: Springer Netherlands.
Richy, E., Cabello-Yeves, P. J., Hernandes-Coutinho, F., Rodriguez-Valera, F., González-Álvarez, I., Gandois, L., ... & Lauga, B. (2024). How microbial communities shape peatland carbon dynamics: New insights and implications. Soil Biology and Biochemistry, 191, 109345.
Ringeval, B., Friedlingstein, P., Koven, C., Ciais, P., de Noblet-Ducoudré, N., Decharme, B., & Cadule, P. (2011). Climate-CH 4 feedback from wetlands and its interaction with the climate-CO 2 feedback. Biogeosciences, 8(8), 2137-2157.
Ripple, W. J., & Beschta, R. L. (2012). Trophic cascades in Yellowstone: the first 15 years after wolf reintroduction. Biological Conservation, 145(1), 205-213.
Ripple, W. J., & Beschta, R. L. (2016). Riparian vegetation recovery in Yellowstone: the first two decades after wolf reintroduction. Biological Conservation, 198, 93-103.
Rode, J. H. (2024). Einfluss mechanischer Belastung auf die physikalischen Eigenschaften unterschiedlich stark degradierter Horizonte aus Hoch- und Niedermooren bei Flintbek (Schleswig-Holstein) [Master's thesis, Christian-Albrechts-Universität zu Kiel].
Roulet, N. T. (2000). Peatlands, carbon storage, greenhouse gases, and the Kyoto Protocol: Prospects and significance. Environmental Monitoring and Assessment, 61(1), 143–151. 
Sabbatini, S., Mammarella, I., Arriga, N., Fratini, G., Graf, A., Hörtnagl, L., ... & Papale, D. (2018). EC raw data processing for CO2 and energy fluxes calculation at ICOS ecosystem stations. International Agrophysics, 32(4), 495-515
Santander, D. (2023). Aguas, aguas: humedales bajo fuego, ¿qué sabemos y qué está haciendo Chile? [Waters, waters: wetlands under fire—what do we know and what is Chile doing?]. Tomate Rojo. 
Santander, D. (2023). Rehumectación: la técnica que le devuelve la vida a humedales degradados y que crece en el mundo [Rewetting: the technique restoring life to degraded wetlands that is gaining ground worldwide]. El Desconcierto.
Segers, R. (1998). Methane production and methane consumption: a review of processes underlying wetland methane fluxes. Biogeochemistry, 41(1), 23-51.
Shah, S., Khan, Y., Wang, M., & Zhang, T. (2025). Arbuscular mycorrhizal fungi as mediators of nitrogen, phosphorus, and carbon: implications for plant growth and development. Journal of Plant Nutrition, 1-21
Schlesinger, W. H., & Bernhardt, E. S. (2020). Biogeochemistry: An analysis of global change (4th ed.). Academic Press.
Shi, Y., Zhang, X., Wang, Z., Xu, Z., He, C., Sheng, L., ... & Wang, Z. (2021). Shift in nitrogen transformation in peatland soil by nitrogen inputs. Science of the Total Environment, 764, 142924.
Siddiqui, Z. A., & Pichtel, J. (2008). Mycorrhizae: an overview. Mycorrhizae: sustainable agriculture and forestry, 1-35
Smith, Kathryn. (2015). Conservation Issues: Polar Seas. Earth Systems and Environmental Sciences. 10.1016/B978-0-12-409548-9.09201-0.
Smith, S. E., Anderson, I. C., & Smith, F. A. (2015). Mycorrhizal associations and phosphorus acquisition: from cells to ecosystems. Annual plant reviews volume 48: Phosphorus metabolism in plants, 48, 409-439.
Stiftung Naturschutz Schleswig-Holstein. (n.d.). Klimafarm – Klimafreundliche Landwirtschaft auf wiedervernässten Mooren. https://www.stiftung-naturschutz-sh.de
Tak, D. B., Vroom, R. J., Lexmond, R., Lamers, L. P., Robroek, B. J., & Temmink, R. J. (2023). Water level and vegetation type control carbon fluxes in a newly-constructed soft-sediment wetland. Wetlands Ecology and Management, 31(4), 583-594.
Temmink, R. J., Lamers, L. P., Angelini, C., Bouma, T. J., Fritz, C., van de Koppel, J., ... & van der Heide, T. (2022). Recovering wetland biogeomorphic feedbacks to restore the world’s biotic carbon hotspots. Science, 376(6593), eabn1479.
Temmink, R. J., Robroek, B. J., van Dijk, G., Koks, A. H., Käärmelahti, S. A., Barthelmes, A., ... & Smolders, A. J. (2023). Wetscapes: Restoring and maintaining peatland landscapes for sustainable futures. Ambio, 52(9), 1519-1528.
Tikkasalo, O. P., Peltola, O., Alekseychik, P., Heikkinen, J., Launiainen, S., Lehtonen, A., ... & Mäkipää, R. (2025). Eddy-covariance fluxes of CO2, CH4 and N2O in a drained peatland forest after clear-cutting. Biogeosciences, 22(5), 1277-1300.
Trepel, M., Holsten, B., Kieckbusch, J., Otten, I., & Pieper, F. (2003, September). Influence of macrophytes on water level and flood dynamics in a riverine wetland in Northern Germany. In Proceedings of the International Conference “EcoFlood—Towards Natural Flood Reduction Strategies”. Institute for Land Reclamation and Grassland Farming, Raszyn, Poland (Vol. 7).
Umarhadi, D. A., Widyatmanti, W., Kumar, P., Yunus, A. P., Khedher, K. M., Kharrazi, A., & Avtar, R. (2022). Tropical peat subsidence rates are related to decadal LULC changes: Insights from InSAR analysis. Science of the Total Environment, 816, 151561.
United Nations Environment Programme. (2022). Global peatlands assessment: The state of the world’s peatlands: Evidence for action toward the conservation, restoration, and sustainable management of peatlands. https://www.unep.org/resources/global-peatlands-assessment-2022
UNFCCC. (2015). Paris Agreement. United Nations Framework Convention on Climate Change.
Vickers, D., & Mahrt, L. (1997). Quality control and flux sampling problems for tower and aircraft data. Journal of Atmospheric and Oceanic Technology, 14(3), 512-526.
Vroom, R. J. E., Van Den Berg, M., Pangala, S. R., Van Der Scheer, O. E., & Sorrell, B. K. (2022). Physiological processes affecting methane transport by wetland vegetation–a review. Aquatic Botany, 182, 103547.
Ward, S. E., Ostle, N. J., Oakley, S., Quirk, H., & Bardgett, R. D. (2022). Vegetation exerts a greater control on peatland methane emissions than water table. Nature Communications, 13, 233.
Webb, E. K., Pearman, G. I., & Leuning, R. (1980). Correction of flux measurements for density effects due to heat and water vapour transfer. Quarterly Journal of the Royal Meteorological Society, 106(447), 85-100.
Whiticar, M.J. (2020). The Biogeochemical Methane Cycle. In: Wilkes, H. (eds) Hydrocarbons, Oils and Lipids: Diversity, Origin, Chemistry and Fate. Handbook of Hydrocarbon and Lipid Microbiology . Springer, Cham. 
Wilson, K., Goldstein, A., Falge, E., Aubinet, M., Baldocchi, D., Berbigier, P., ... Valentini, R. (2002). Energy balance closure at FLUXNET sites. Agricultural and Forest Meteorology, 113(1–4), 223–243. 
Wilson, D., Blain, D., Couwenberg, J., Evans, C. D., Murdiyarso, D., Page, S. E., ... & Tuittila, E. S. (2016). Greenhouse gas emission factors associated with rewetting of organic soils. Mires and Peat, 17.
Yamauchi, T., & Nakazono, M. (2022). Mechanisms of lysigenous aerenchyma formation under abiotic stress. Trends in Plant Science, 27(1), 13-15.
Zhang, Haipeng, et al. "Surface‐atmosphere decoupling prolongs cloud lifetime under warm advection due to reduced entrainment drying." Geophysical Research Letters 50.10 (2023): e2022GL101663.


































VII. A N N E X : E Q U A T I O N S
Relevant Stoichiometric Knowledge
Constants 
            * Avogadro Number NA: 6.02 × 1023 mol⁻¹
One mole is equivalent to NA particles.
            * Universal Gas Constant R: 8.3145 J/mol·K = 0.082057 Atm·L/mol·K
Establish the relationship between energy and temperature scales.
            * Boltzmann Constant KB: 1.380 649×10-23 J/K
Relates the absolute temperature with the average kinetic energy of the particles in a system.

	Scales
From → To
	Multiplier
	Example
	mol → μmol
	× 10⁶
	0.005 mol = 5,000 μmol 
	μmol → mol
	× 10⁻⁶
	5,000 μmol = 0.005 mol
	

	(1) The Ideal Gas Law
Being: Pressure “P”, Volume “V”, Number of Moles “n”, Temperature “T” and “R” the constant. The ideal gas law states that:



	(2) Molar Volume
Molar volume Vm is in general the volume occupied by one mole of a substance, being V Volume and n the moles:

            * Is important to notice also than the molar volume can be written in terms of the ideal gas law as:



            * As 1 m3 = 1000 L :

	(3) Molar Mass Mo
Molar mass Mo (grams/mol) is the mass in grams of one mole of a substance, being m the mass and n the moles

            * Molar volume can be also written in terms of the Molar mass using density ρo
            * ρo = m/V, being m the mass and V the Volume
=> V = m/ρo 
            * Then Vm can be rewritten
            * Vm = V/n = (m/ρ)/n = (m/n) / ρo

	(4a) Mole Fraction 
Mole fraction is the ratio of moles of a component to total moles in a mixture. Is a dimensionless unit (0–1 scale). It represents concentration, is temperature-independent, and the sum of all components' mole fractions always equals 1
= 
	(4b) Parts Per Million ppm 
The Parts Per Million ppm is a way to express very small concentrations of a substance in air, water or similar; meaning “out of 1,000,000”. 1 ppm = 1 molecule of gas per 1,000,000 molecules of air.


            * In gases, ppm is the escalated mole fraction
            * For trace gases like methane in the atmosphere, concentrations are often in ppb (parts per billion): 1 ppm = 1,000 ppb
In gas chamber measurements (or with LI-COR, IRGA) usually reports:
            * CO₂ in ppm
            * CH₄ and N₂O often in ppb 
The rate of Change (dC/dt) can be in terms of ppm:
  

            * Mole fraction (6.1.4a) can be converted to ppm by multiplying by 106, specifically for molar-based measurements (or in other words ppm measures the mole fraction multiplied by 106) : Being C the molar fraction in terms of ppm such as: 
 = 

            * For Example:
Atmospheric CO₂
	420 ppm
	Molar Fraction 
	  

	Meaning
	0.000420 CO₂ mols for every 1 total air mol
	



	

(5) Molar Concentration M
M measures the number of moles of solute per liter of solution. Being “n” the moles of solute and “V” the volume of the solution in liters. Can be calculated with the formula:

It is the most commonly used unit in chemistry for reactions and stoichiometry, as it facilitates the calculation of quantities of reactants and products.
	

(6) Molar Volumetric Concentration ρ 


The Molar Volumetric Concentration is the number of moles of a specific gas per cubic meter of air (mol m⁻³ or μmol m⁻³), where with n being the moles of the gas and V the chamber air volume (in m³), the gas density in moles per volume of air: 

            * The volumetric molar density ρair is the inverse of the molar volume Vm(6.1.2), both referred to the same volume V of the total gas mixture
 (  ) 
            * While its rate of change dρ/ dt describes how fast that concentration increases inside a chamber (μmol m⁻³ s⁻¹). Can also be named as the rate of change of molar concentration per volume (gas molecules per m³ per second). 
Developing the derivative d/dt over the term ρ:


 
            * An important relationship can be established between the Molar Fraction (6.1.4) and the Molar Volumetric Concentration. From a certain gas contained in a certain air: 

            * Replacing the values with the relations established for Xi (6.1.4b) and ρair: 

	

(7) Chamber Fluxes, Fundamental Equation


Considering a closed chamber with constant volume V (m³), base area A(m²) on moist soil (wetland). The soil emits gas at a rate F (μmol m⁻² s⁻¹). To calculate the moles that would be entering by second dn/dt, its used the flow (moles per unit area per time), scaled by the exposed area F x A



            * Making use of 6.1.6, where:
 

 
            * Together with 6.1.6 where is concluded that

            * This step allows to a generalized expression for the variation of the Molar Volumetric Concentration (on which expression, the term dC/dt is the slope measured in ppm/s)
  

            * Can be escalated a μmol m⁻³ s⁻¹ by multiplying by 106:
  
  







	

Chamber Flux Conversion
Step 1. Rate per second
 ppm/min → μmol mol⁻¹ s⁻¹


From linear regression on chamber concentration versus time, the slope can be seen as 

            * Or equivalently in seconds

            * Where, according to 6.1.5: 
            * 1 ppm = 10-6 mol gas / mol total air (volume mixing ratio)
            * 1 ppm = 10−6 mol / mol
            * Being μ = 10 -6 : 
            *  1 ppm = 1 μmol / mol 
            * Reason by which the slope reappears as:

Meaning μmol mol⁻¹ s⁻¹ is the moles of target gas accumulating per mole of air per second.
________________


STEP 2: Use of the Ideal Gas Law
μmol mol-1 s-1 → μmol m-3 s-1
The units μmol mol−1 conform to a mixing ratio: micromoles of gas per mole of air. To turn that into an absolute concentration per volume, moles of air per cubic meter are needed, which is P/(RT) from the ideal gas law.


            * With the expression obtained in the section 6.1.6 for the The Molar Volumetric Concentration (The inverse of the Molar Volume) is possible to see the number of moles of the gas per cubic meter of air (mol m⁻³)
 (  ) 
            * The dC/dt in μmol mol−1 s−1 gets multiplied by the molar concentration of air as it follows:


 

With P being air pressure in Pascals, R equal to 8.314 J/molK andT being air temperature in Kelvin
________________


STEP 3: Chamber Geometry
 μmol m-3 s-1 → μmol m-2 s-1


Once the concentration change rate is set, the total moles per seconds that are getting emitted can be known by scaling the relationship across the whole volume


            * In case that the Volume came in liters, is enough with multiplying by 10-3 L/m3
The surface flux F is obtained by scaling it by the relation between Volume and Area


	Step 4. To Kilograms / Hectare
μmol m-2 s-1 → Kg Ha-1 d-1


            * Kg/Haxd = F × 10-6 mol/μmol × MW g/mol × 86400 s/d × 104 m2/Ha / 1000 g/Kg
            * Kg/Haxd = F × MW × 0.864
	Least Squares for the chamber slope calculation
Least squares minimizes the sum of squared differences between observed data points and the fitted line/model. In chamber flux analysis, it finds the best linear slope (ppm/min) during the linear headspace accumulation phase.
1 Mathematical Optimality (Gauss-Markov Theorem)
            * Provides Best Linear Unbiased Estimators (BLUE) when errors have mean=0, equal variance, and are uncorrelated
            * Lowest variance among all linear unbiased estimators
            * Proven optimal for linear models with normal errors
2 Closed-Form Solution
β = (X'X)⁻¹X'y 
            * No iteration needed unlike maximum likelihood or other methods requiring numerical optimization.
            * Differentiability: The L₂ norm (sum of squares) is smooth and differentiable everywhere, enabling:
            * Analytical derivatives for exact solutions
            * Gradient-based optimization for nonlinear extensions
            * Robust to Small Errors
            * Squared error: (y - ŷ)²
            * Absolute error: |y - ŷ|
Large outliers get downweighted relative to their magnitude:
            * 10× error → 100× penalty (squared) vs 10× penalty (absolute)
            * Small errors → nearly linear penalty
            * Statistical Foundation
RSS = Σ ( yᵢ - ŷᵢ ) ² ~ χ² ( n-p )
Residual sum of squares follows known distribution → F-tests, confidence intervals, p-values.
3 Chamber Flux Context
Linear fit: C(t) = β₀ + β₁t , where β₁ = ppm/min slope
model <- lm(ppm ~ time_min, data = headspace_data)
slope_ppm_min <- coef(model)[2]
Why perfect for chambers:
            * Headspace accumulation is linear during 60-80% of deployment
            * Non-linear curvature/outliers (diffusion, pressure) get mathematically downweighted
            * Provides exact slope with uncertainty estimates
Visual Intuition
            * Absolute error: |e| → sensitive to outliers
            * Least squares: e² → penalizes large deviations quadratically




























VIII. A N N E X : F I G U R E S
Nitrous Oxide N2O
N2O Combined plots for distribution and time series
  

	Figure, N2O Chamber values | (Up-Left) Flux time series, (Down-Left) average per group & (Right) distribution of values per chamber.
	

N2O Spatial Dynamics by Location
  
  

	Figure, N2O Fluxes by site | in μmol/m2s at the left and Kg/Ha⋅d at the right.
	



N2O Seasonal Boxplots & Total Accumulation Bar Plots
  
  

	Figure. (Left) N2O Seasonal Flux Accumulation and (Right) Total Mass Accumulated per Chamber. No trench in red and orange; trench in light blue and blue respectively. 
	Carbon Dioxide CO2
CO2 Combined plots for distribution and time series
  

	Figure, CO2 Chamber values | (Up-Left) Flux time series, (Down-Left) average per group & (Right) distribution of values per chamber.
	

4.6.4b CO2 Spatial Dynamics by Location
  
  



	Figure, CO2 Fluxes by site | In μmol/m2s at the left and Kg/Ha⋅d at the right
	





4.6.4c CO2 Seasonal Boxplots & Total Accumulation Bar Plots
  
  

	Figure. (Left) CO2 Seasonal Flux Accumulation and (Right) Total Mass Accumulated per Chamber. No trench in red and orange; trench in light blue and blue respectively. 
	























IX. A N N E X : T A B L E S 
EC - Biomet
The BIOMET that was obtained and used on this research is condensed in the following tables:
 Time Variables
	 Data Logger & Power
	date [yyyy-mm-dd]
time [HH:MM]
DOY [ddd.ddd]
	Date of measurement
Time of measurement 
Day of Year (decimal, 1-365.999)
	VIN [V]
DRM_V_BATTERY [V]
DRM_V_MAIN [V]
DRM_POWER_STATUS 
	Input Voltage (data logger)
Data Logger Battery Voltage
Main Power Supply Voltage
Power Status Flag (quality/health)
	 Meteorological Sensors
	Description
	TA [K]
RH[%]
PPFD[µmol/m²/s]
P_RAIN [m]
	Air Temperature (Kelvin)
Relative Humidity (%)
Photosynthetic Photon Flux Density (PAR/light)
Precipitation (rain accumulation in meters)
	 Radiation (4-component net radiation)
	SWIN [W/m²]
SWOUT [W/m²]
LWIN [W/m²]
LWOUT [W/m²]
RN [W/m²]
	Shortwave Incoming (global solar radiation)
Shortwave Outgoing (reflected solar)
Longwave Incoming (incoming thermal IR)
Longwave Outgoing (emitted thermal IR)
Net Radiation (SWnet + LWnet)
	 Soil heat flux (SHF)
	SHF_1 to SHF_3[W/m²]
SHFSENS_1 to SHFSENS_3 
	Soil heat flux Plate 1 to Plate 3
Soil heat flux Sensor 1 to 3
	 Soil Moisture and Temperature
	SWC_1 to SWC_5[m³/m³]
TS_1 to TS_5 [K]
	Soil Water Content (volumetric, 5 depths)
Soil Temperature (5 depths, Kelvin)
	 Quality Control
	ALB [%]
CHK
DAQM_T [C]
TCNR4_C [C]
Relay_1 to Relay_3 
	Albedo (% reflected solar radiation)
Checksum/Quality Flag
Data Acquisition Module Temperature
CNR4 Radiometer Case Temperature
Relay Status (pump/heater control)
	EddyPro® Full Output
Time Variables
	Date
Time
DOY
daytime
filename
	Date of measurement (yyyy-mm-dd)
Time of measurement (HH:MM)
Day of Year (decimal, 1-365.999)
Day/night flag (1=day, 0=night)
Source raw data filename
	Main Flux Gases
	co2_flux
ch4_flux
h2o_flux
	CO₂ flux (NEE, Net Ecosystem Exchange) [mgCO₂ m⁻² s⁻¹]
CH₄ flux [mgCH₄ m⁻² s⁻¹]
Latent heat flux (LE) [W m⁻²]
	Energy Balance Fluxes
	H
LE
G
	Sensible heat flux [W m⁻²]
Latent heat flux (evapotranspiration) [W m⁻²]
Soil heat flux [W m⁻²]
	Quality Control & Flags
	qc_co2_flux
qc_ch4_flux
qc_h2o_flux
qc_H
qc_LE
nrecs
flagged_recs
	Quality flag CO₂ (0=best, 1=good, 2= not good)
Quality flag CH₄
Quality flag H₂O
Quality flag sensible heat
Quality flag latent heat
Number of raw records averaged
Number of flagged records
	Meteorological Raw Data
	TA
RH
P
WS
WD
	Air temperature [K]
Relative humidity [%]
Atmospheric pressure [hPa]
Wind speed [m s⁻¹]
Wind direction [°]
	Radiation Balance
	SW_IN
SW_OUT
LW_IN
LW_OUT
RN
	Shortwave incoming (global solar) [W m⁻²]
Shortwave outgoing (albedo) [W m⁻²]
Longwave incoming [W m⁻²]
Longwave outgoing [W m⁻²]
Net radiation (SWnet+LWnet) [W m⁻²]
	Turbulence Stats
	ustar
w_var
ts_var
co2_var
	Friction velocity [m s⁻¹]
Vertical wind variance [m² s⁻²]
Sonic temperature variance [K²]
CO₂ concentration variance
	Advanced Diagnosis
	skew_w
kurt_w
spike_cnt
ustar_filt
	Skewness vertical wind
Kurtosis vertical wind
Spike count indicator
u threshold filter flag*
	Storage and Corrections
	co2_sto
ch4_sto
adv_corr
	CO₂ storage below tower
CH₄ storage below tower
Advection correction
	Chambers Variables
Temporal Variables
	datum
ort
nr
zeit
run
	Date of measurement
Location/Site (field position)
Chamber/Plot number
Start time of measurement
Measurement campaign/run ID
	Gas Concentrations
	ch4ppm
n2oppm
co2ppm
	CH₄ concentration [ppm]
N₂O concentration [ppm]
CO₂ concentration [ppm]
	Concentration Change Rates (Fluxes)
	c1
c2_n2o
c3_ch4
ppm/min
	Linear slope (all gases?) [ppm/min]
N₂O flux rate [ppm/min]
CH₄ flux rate [ppm/min]
Individual gas fluxes [ppm/min]
	Model Fit Quality
	R2 CH4
R2 N2O
R2 CO2
	CH₄ linear model R²
N₂O linear model R²
CO₂ linear model R²
	Metadata & Processing
	info
inj
code
dir
file
	Additional notes/comments
Injection volume [ml] (if enriched)
Quality/processing code
Data directory
Source raw data filename
	















Vapor pressure deficit (in kPa) chart 
  

This table is designed to help manage greenhouse or grow room environments for optimal plant health. It measures the difference between the moisture currently in the air and how much moisture the air can hold at a specific temperature.[nk]
Color-Coded Stress Levels:
            * Red (Dangerous): Represents a high VPD, indicating extreme plant stress where the air is too dry.
            * Orange (High Stress): Indicates high stress conditions.
            * Yellow/Green (Optimal): Indicates ideal conditions for plant growth stages like Flower or Vegetative.
            * Blue/Purple: Indicates high humidity zones suitable for Nursery (clones) or conditions prone to Fungal Pathogens.














































[a]if you use them here as abbreviations than you shouldnt use the short forms in the absttract
[b]I have some issues with this paragraf
[c]this sentence has structural issues, rephrase it
[d]You can use the text and pictures but please work out something similar yourself
[e]This paragraf is incomplete. i think you are missing something like: The aim was to... or something like that.
[f]I think you should combine these to prargrafs
[g]If the above are hypotheses you have to point that out. the reade thinks that those are your aims. Also in the aims you can write in first person: My aims are... I want to test.
[h]Your aims should have its own subheading
[i]this is to long. you should aim at half the pages
[j]You should use fewer pragrafs. Please combine thematic short paragraphs
[k]this is doubling with the explanation below
[l]this too
[m]The form of your subtitle vary. Each grafic needs its own number and has to be referenced at least once in the text
[n]this is the subheading of rewetting not drainage so you should rephrase this.
[o]you are not working with sites that aim for restoration but rewetting with the aim for paludi culture.
[p]dont use hyperlinks.. this is not possible in printed copies. 
Insted use: Extracted vfrom moorland association (https://www.moorlandassociation.org/post/peatland-restoration-a-lesson-in-patience-and-practicality, access on "date".
[q]rephrase
[r]again the aim is not restoration..
[s]why does phytoysynthesis result in methane oxidation?
[t]fermentation  C6.. -> acetate + Co2 this equation does not include all C.. check the equations and arrows regarding plausablity


The equation under anaerobic respiration as well as methanogenesis (CU2 + 4H2 -> ..) has a lot of visual issues.. if you use AI you have to make sure it does a proper job..
[u]Also I mentioned these issues the last time you used this grafic..
[v]Restructure this:
Short general intro zu micrometeorology (as you did here)
- measurement theorie
- turbulence and fluxes
- evapotransportation
- NEE and so on last
[w]use proper sentences for this. after the : there is no proper sentence structure
[x]these should be lower case, change that wherever needed in the tex. only in upper case if at the beginning of a sentence and if written in upper case for other reasons than the abbreviation introduction.
[y]i dont see why you should show this here. or you should use your own data but than not in the introduction
[z]similar to a sentence in 1.5.5.
[aa]source?
[ab]You are not addressing this with your data, right? than reduce this section and put it in the general micrometerology intro.
[ac]as you use 30 min, the question would arise why didnt you use more than that if you now the issue?
[ad]source?
[ae]at your site there are no openwater patches it probably is homogenous wet (look at the water level logger for that)
[af]this is more discussion than intro.
if you calculate the energy balance in the results you can use this as discussion. otherwise one asks oneself, if you know this why did you not try to figure some measurements out to advance this
[ag]shorten and moved into another section and/or partly usable as discussion of your data
[ah]already introduced..
[ai]partly already mentioned above
[aj]you did not do that. becarefull with this then
[ak]Did Josef read this?
[al]this is no advertising
explain what is used at the site and the important specs
this should be written more like a very very detailed paper manuscript
[am]didn't we say you should focus on wallen. so please remove ekel here and also the 7200rs as you did not use it
[an]that is not what we use at all our sites
https://www.licor.com/support/Eddy-Covariance/topics/using-the-gill-windmaster-pro.html
[ao]LICOR Premium Biomet Package
•        3 x Soil Heat Flux Plate 
(Hukseflux HFP01SC)
•        Net Radiometer 
(Kipp & Zonen CNR4)
•        PPFD (LI-COR LI-190R)
•        Soil Moisture and Temperature 
(Stevens HydraProbe)
•        Air Temperature and Relative Humidity (Vaisala HMP155)
•        Liquid Precipitation 
(Texas Electronics TR-525M)
·        Garmin GPS 18x LVC (79 EUR) 
(Zeitsynchronisation, UTC Atomzeit)
[ap]licor rain gauge
[aq]https://www.licor.com/support/Biomet/topics/soil-moisture-probe-stevens.html
[ar]https://www.licor.com/support/Biomet/topics/heat-flux-plates.html
[as]https://www.ht-hydrotechnik.com/fileadmin/files/Prospekte_PDF/D_LTE_Funkdatenlogger_255EB.pdf
[at](see section xyz).
[au]pleas use pictures from licor as you exclude ekal where we use campbell
[av]package number and citation for every special package you name
[aw]I personal, find this critical. This is something you should do and learn..
[ax]omit
[ay]not sure if you have to state this.
[az]sci-bot is based on illage crawled research papers, you sure that you should have used that in your thesis..?
[ba]upper lower case rules are not applied
[bb]s.o.
[bc]s.o.
[bd]really?
[be]subscript
[bf]subscript
[bg]really?
[bh]really?
[bi]?
[bj]? why does this have a citation? as it is obsolete when you hand in the printed version, remove already
[bk]its not cropland its grassland or wet grassland
[bl]not true but ok
[bm]the whole image?
highlite the exact field somehow.
[bn]really?
[bo]if you include 2024 as a singe year grafic this is results and not methods
[bp]Why did you do that? That is nothing we talked about, right?
[bq]thats about the size of the footprint, though
[br]you state your aims at the end of the introduction, i dont see a reason for this subheading
[bs]s.o.
[bt]rephrase, sentence structure
[bu]calculating the netto ecosystem emissions before rewetting to get a baseline for the changes that will appear 
or something similar
[bv]if you want to include it do it in the aim section of the intro not here in the methods
[bw]or use it in the discusssion
[bx]or G
[by]use in discussion and rephrase accordingly
[bz]if you dont do it later than please refere to the used settings stated in the appendix
[ca]for each of these three points do a separate reference to the respective part in the appendix
[cb]10 hz
[cc]use the right subscripts for CH4 and CO2..
[cd]Continuous net ghg balance should be net ecosystem exchange (NEE), right?
[ce]https://intranet.hswt.de/person/janina-klatt.html
[cf]add a table here or in the supplements where these parameters are listed
[cg]make this a table with these parameters and the respective values
[ch]make a table
[ci]30 min?
[cj]automatically by eddypro
[ck]you use the raw data so this is confusing omit it
[cl]this is doubling the above paragraph..
[cm]detail only the ones you used with the right references that are given in eddypro
[cn]after which method? state the respective reference
[co]which?
[cp]which?
[cq]list only the one that you applied
[cr]you sure that the site hase these specifics?
[cs]s.o.
[ct]this doubles the explanation above
[cu]i would prefere, that you do something like this yourself
[cv]this needs an ® everytime you mention it.
[cw]did you apply that?
[cx]do something like this yourself and only include steps you applied, otherwise this is misleading
[cy]after which paper? state the reference..
[cz]reference
[da]s.o.
[db]s.o.
[dc]doubling
[dd]is your anemometer tilted?
[de]did you work on a site with trees?
[df]The Methods section is the part of your thesis where you explain what methods you used and not an introduction to the method in general. the subheadings so far have a strong (too strong) introductory part. restructure and rephrase them
[dg]did you work on a site with trees?
[dh]The Methods section is the part of your thesis where you explain what methods you used and not an introduction to the method in general. the subheadings so far have a strong (too strong) introductory part. restructure and rephrase them
[di]CHange to Wallener Au everywhere
[dj]sentence structure
[dk]other then the ones you worked with? then omit.
[dl]rephrase
[dm]This is the licor biomet module that is needed to logg biomet data. Do you mean your code? than write that differently.
[dn]rephrase more neutrally
[do]see question above
[dp]?
[dq]i read this for the 3. or 4. time now..
[dr]Do you show all those plots in the results? the methods section is for methods you used and not for what the data can be used for. its not a general explanation of what biomet is.
[ds]discussion!
[dt]necessary?
[du]maybe better in the intro?
[dv]maybe better in the intro?
[dw]maybe better in the intro?
[dx]maybe better in the intro?
[dy]s.o.
[dz]maybe better in the intro?
[ea]s.o.
[eb]do you have a subscripted or otherwise better looking version of that?
[ec]superscript
[ed]why is this highlighted in black?
[ee]?
[ef]a picture of the chambers you used would be nice. and reference a paper with detailed description on these chambers from the working group.
[eg]reduce to a maximum of 3 pages
[eh]really?
[ei]are the chamber positions you used really doing that?
[ej]only with flux mapper..
[ek]you sure? how?
[el]?
[em]s.o.
[en]s.o.
[eo]this should be 3-4 sentences
For chamber measurements a PVC collar was installed in the soil with 5 cm protrude from the ground. Depending on vegetation hight an xy elongation was used. The chamber design and sampling method was first described in XYZ et al. (ref). The chambers were closed for 60 min with samples taken at 0, 20, 40 and 60 min. Soil temperature was measured at the beginning and chamber air temperature at every sampling point. Headspace over pressure during measurements was avoided by a thin bended metal tube connecting the inside of the chamber with the outside atmosphere. 


Something like this. It has detail and substance and no general infos on chambers
[ep]for how long and how many samples?
[eq]essential information are missing. with this description nobody can try to recreate that method
[er]thats not true
[es]20's ?
[et]not necessarily true.. you could also be finished after 12 minutes and wait till the 20 min are over to start from chamber 1 again.
[eu]rephrase the whole subheading
[ev]this should be at the top.
as mentioned above. rephrase the entire "Chambers" section
[ew]just state the ground diameter and the volume with and without elongation/extension
[ex]this can be reduced to
[ey]interesting but move most of it to the annex/supplement
[ez]interesting but move most of it to the annex/supplement
[fa]interesting but move most of it to the annex/supplement
[fb]interesting but move most of it to the annex/supplement
[fc]interesting but move most of it to the annex/supplement
[fd]superscript and change this above to. there you used ppm/min make it uniformly
[fe]s.o.
[ff]s.o.
[fg]s.o.
[fh]you should have done co2 and methane
[fi]combine with the EC subheading
[fj]?
[fk]think about what is discussion and what is methods
[fl]lower case
[fm]lower case
[fn]?
[fo]as mentioned focus on wallen and eliminate ekal from the text document
[fp]?
[fq]is this the technical term? or is it rehydrated? as rewetted is in the context of your work a bit misleading as peatlansd are rewetted as well.
[fr]settling? really?
[fs]what is this?
[ft]some of these are not visible in the equations!
[fu]lower case
[fv]s.o.
[fw]?
[fx]what is that?
[fy]what difficulties? either describe it more clearly or if not so import omit
[fz]very complicated.. try to simplify
[ga]table need an extra description. in figures these are under the figure in tables they are above the table!
[gb]s.o. same is for every table in the thesis!
[gc]try to keep tables at one page!
[gd]can you site a paper where the method was described in detail?
[ge]equations need a number like figures so you can site them in the text
[gf]why is this in a box?
[gg]maybe shorten and at the top of this topic?
[gh]this is to random. if you feel this is important add another sentence for this
[gi]and EC?
[gj]and EC?
[gk]and EC?
[gl]can you merge some of these subheadings
[gm]if you leave this is please provide example figure numbers where you used these
[gn]short explenation what the footprint is and why it is important (2-3 sentences)
[go]really? the scalebar in the figure 50-70 m to the south west. that would be the radius. 100-300 is the diameter of the footprint.
[gp]which direction?
[gq]depict the regression equation in the grafic. and the blue points look more like a kurve instead ob a line
[gr]missing figure caption
[gs]make a square around the right profile with leading lines to the left 1 m.
[gt]Missing infos
[gu]of xys cm or m?
[gv]something with the very noisy data is wrong.. I will send you the updated file today
[gw]Did I send you the file?


when there is a data gap there has to be a gap in the line!
[gx]upper case has some issues here
[gy]Sentece structure is not correct
[gz]how do you reach this conclusion? you have data from 5, 20 and 50 cm..
[ha]20 cm  please change throughout the skript
[hb]there is an additional legend at the right corner. please remove that.
[hc]Figures should all go from jan to dezember
[hd]Soi Temp y axis should have a reasonable limits and not from 0 - 90 °C
[he]Use normal upper an lower case writing
[hf]Different data than above? Dont show lines when there is no data
[hg]x-axis name?
[hh]this has to be on the same site as the figure!
Be consistent with your style of description!
[hi]really, where?
[hj]but there is a line?
[hk]first describe your results! what is the yearly trend, max an min? and so on.
[hl]first describe your results! what is the yearly trend, max an min? and so on.
[hm]what do you mean?
[hn]they are pretty much next to each other (5-20 cm appart)
[ho]upper case and so on..
[hp]????
[hq]really?
[hr]I think it should be more than 100
[hs]state that flag 2 was removed
take care of upper and lower case
[ht]what happe with the rest 9%?
[hu]why?
[hv]°C
[hw]describe the results at least!
[hx]should be at the same page as the figure!
[hy]what do you mean? rephrase?
[hz]how good did this work? state here and/or discuss it in the discussion
[ia]describe or explain what does one see in the figures?
[ib]decsribe NEE figures befor this?
[ic]why is the first period starting in 23 and the last one is ending in 25?? Why did you chose these periods?
take care of the y and x axis title..
why is there an offset from one figure to the other?
what are the R² and the equations of the regression lines?
[id]upper lower case mistakes
[ie]?
[if]number?
[ig]describe the figures -> what is theoutcome?
[ih]periods and axis names are a mess
[ii]uppe rlower case
[ij]and? what is the result of this description
[ik]remove the "Prcoess:..."
[il]upper lower case
[im]what is with model a?
[in]use jan to dez everywhere!
[io]it is very hard to see anything.. make multiple figures..
[ip]be consistent with the time in the x axis..
[iq]and the colors? use a few more words..
[ir]and 20 cm?
[is]multiple?
[it]use model A50 and model A5 or something similar
[iu]which?
[iv]remove the "Process"
axis titles are very messy again..
[iw]upper and lower case is a mess.. stay true to english language rules dont make up your own
[ix]be consistent and use the superscript style
[iy]??
[iz]what do you see in the grafic? explain your results
[ja]The raw data can be found in the supplements Table S2
[jb]method section or omit
[jc]methods or omit..
[jd]methods
[je]...
[jf]methods or omit. what do you want to explain with this?
[jg]...
[jh]methods or omit. what do you want to explain with this?
[ji]...
[jj]methods or omit. what do you want to explain with this?
[jk]...
[jl]methods or omit. what do you want to explain with this?
[jm]use a) b) c) for the subgraphs. so yuo can reference them right.
Take care of the axis titles.
[jn]Why do you distinguish between 16 and 42 cm?
[jo]this should be all on the upper page
[jp]I dont understand this
[jq]you only have day measurements, you cannot write about a diel cycle..
[jr]what about the yearly trend?
[js]I dont see the point. what dou you want to explain? maybe the discussion is the right place
[jt]axis titels
[ju]more effort
[jv]all in lower case
[jw]when?
[jx]axis titels and do an enumberation with a) b) c) etc.
[jy]rephrase, be consistent and what trench has what colour?
[jz]s.o.
[ka]? s.o.
[kb]what?
[kc]no show here. you reduced the introduction part
[kd]clear numberation
[ke]how do you know? did you check the time with the precipitation?
[kf]where and maybe that something for the discussion?
[kg]reference correctly
[kh]s.o.
[ki]s.o
[kj]originally we discussed only n2o data from the chambers maybe ch4
[kk]if this chapter is kept show here
[kl]why?
[km]?
[kn]maybe this is something for the discussion?
[ko]?
[kp]take care of axis titles and grafic descriptions
[kq]take care of axis titles and grafic descriptions
[kr]take care of axis titles and grafic descriptions
[ks]take care of axis titles and grafic descriptions
[kt]take care of axis titles and grafic descriptions
[ku]take care of axis titles and grafic descriptions
[kv]take care of axis titles and grafic descriptions
[kw]why?
discussion if you think that makes sense
[kx]be nice and clean
[ky]inconsistent and no abbreviation intro in headings
[kz]why cursiv?
[la]omit ekel and make this nice and clean
[lb]without ekel this is at different depth.. change throughout the script
[lc]chane WA_ according to above
[ld]remove ekel
[le]?
[lf]this description does not make sanse to me
[lg]?
[lh]- ekel
