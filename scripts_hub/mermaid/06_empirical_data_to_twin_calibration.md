# Empirical Data Ingestion vs. Functional Calibration of the Twin

A critical question for scientific defense and academic review is: 
**Did the Digital Twin consume all available raw empirical data points in real time, or does it utilize means, functional response curves, and governing thresholds?**

---

## 1. Scientific Clarification: Parameter-Calibrated Digital Twin vs. Time-Series Replay

The Digital Twin is designed as a **Physics-Informed Deterministic Simulation Model** (*Gemelo Digital Físico-Determinista*), rather than a passive time-series CSV player:

| Paradigm | Passive Time-Series Replay (CSV Player) | Physics-Informed Digital Twin (Wallener Au Engine) |
| :--- | :--- | :--- |
| **How it works** | Iterates row-by-row through historical tables ($14,993$ rows). | Runs **governing biophysical response equations** calibrated against the full dataset. |
| **User Interaction** | Fixed to historical timeline; cannot simulate user-defined counterfactual scenarios. | Fully interactive: user can dynamically set any $WTD$ ($-60$ to $+5\text{ cm}$), pause, scrub, or test hypothetical management scenarios. |
| **Client Overhead** | Requires downloading tens of megabytes of raw 10 Hz / 30-min data tables. | Zero-latency instant execution (lightweight mathematical functions calculated in $<1\text{ ms}$). |
| **Data Basis** | Displays historical observations point-by-point. | Ingested **100% of all empirical data** during the calibration phase to extract empirical constants, thresholds, and functional relations. |

```mermaid
flowchart TD
    subgraph Full_Empirical_Dataset ["100% OF EMPIRICAL DATASET (Wallener Au Field & Lab Campaign)"]
        EC_Raw["14,993 Half-Hourly Eddy Covariance Records\n(CSAT3 Anemometer + Li-7500 CO2 + Li-7700 CH4)"]
        Chambers_Raw["8 Dynamic Closed Chamber Transect Collars\n(Ditch-to-Paddock Microrelief Spatial Sampling)"]
        Biomet_Raw["Continuous Biomet & Piezometer Series\n(Solinst Levelogger WTD, Soil Temp at 4 depths, Net Radiation)"]
        SoilMech_Raw["CAU Kiel Soil Physics Laboratory Core Runs\n(Undisturbed 100 cm³ cores, Casagrande Oedometer Tests)"]
    end

    subgraph Analytical_Extraction ["ANALYTICAL EXTRACTION & EMPIRICAL CALIBRATION (R Scripts in Hub)"]
        EC_Raw --> Papale_QC["u* Threshold Estimation (Papale 2006)\n-> Derived: u* = 0.12 m/s Decoupling Threshold"]
        EC_Raw --> FluxPart["Lloyd-Taylor & Michaelis-Menten Partitioning\n-> Derived: GPPmax = 6.8 µmol/m²/s, Basal Reco = 0.8 µmol/m²/s"]
        Chambers_Raw --> TransectMath["Microrelief Transect & Ebullition Analysis\n-> Derived: H1 Post-Flooding Transient Peak at WTD >= -10 cm"]
        Chambers_Raw --> RedoxN2O["Redox Boundary Curve Fitting\n-> Derived: N2O Peak around WTD = -15 to -25 cm"]
        Biomet_Raw --> WalterLieth["Walter-Lieth Climate Climatology & Thermal Inertia\n-> Derived: Seasonal Phenology & Soil Temperature Lag"]
        SoilMech_Raw --> Casagrande["Casagrande & Schmertmann Precompression σp\n-> Derived: σp = 38.4 kPa, ρb = 0.38 g/cm³, Plow Pan at 10-25 cm"]
    end

    subgraph Twin_Execution ["DIGITAL TWIN SIMULATION ENGINE (soil_model.js & digital_twin_engine.js)"]
        Papale_QC --> AtmosphericInversion["Nocturnal Boundary Inversion (u* < 0.12 m/s Filter)"]
        FluxPart --> DynamicNEE["Real-Time NEE Balance: NEE = Reco(WTD) - GPP(Day/Night)"]
        TransectMath --> MethaneSpike["Transient Methane Peak Flag (Hypothesis 1 Trigger)"]
        RedoxN2O --> N2ORate["Dynamic Capillary N2O Rate Function"]
        WalterLieth --> DiurnalAnnualEngine["18s Diurnal / 24s Annual Continuous Time Loop"]
        Casagrande --> PerchedWater["Perched Water Table & Plow Pan Diffusion Resistance"]
    end

    subgraph Visual_Output ["REAL-TIME 60 FPS REACTIVE SVG DOM"]
        AtmosphericInversion & DynamicNEE & MethaneSpike & N2ORate & DiurnalAnnualEngine & PerchedWater --> CanvasSVG["#ecosystem-svg Scene Graph & Live Telemetry HUD"]
    end

    style Full_Empirical_Dataset fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style Analytical_Extraction fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Twin_Execution fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc
    style Visual_Output fill:#172554,stroke:#60a5fa,stroke-width:2px,color:#f8fafc

    style EC_Raw fill:#0284c7,stroke:#38bdf8,color:#ffffff
    style Chambers_Raw fill:#d97706,stroke:#fbbf24,color:#ffffff
    style Biomet_Raw fill:#059669,stroke:#34d399,color:#ffffff
    style SoilMech_Raw fill:#7c3aed,stroke:#c084fc,color:#ffffff
    style CanvasSVG fill:#0284c7,stroke:#38bdf8,color:#ffffff
```

---

## 2. Summary of Calibrated Parameters Consumed by the Twin:

1. **Total Data Consumed:**
   * **All $14,993$ Eddy Covariance half-hourly flux blocks** were processed in EddyPro and utilized to calibrate the daytime carbon uptake curve ($GPP_{\max} = 6.8\text{ }\mu\text{mol m}^{-2}\text{s}^{-1}$), the nocturnal atmospheric decoupling threshold ($u^* < 0.12\text{ m/s}$), and the light-saturation response.
   * **All 8 Chamber collars** along the hydrological ditch-to-paddock gradient were used to calibrate spatial ebullition hotspots and the plant-mediated bypass via *Carex rostrata* aerenchyma.
   * **Continuous Solinst piezometer series** bounded the operational water table range ($-60\text{ cm}$ minimum drought drawdown to $+5\text{ cm}$ winter ponding).
   * **Undisturbed soil cores** tested in CAU Kiel's geomechanics laboratory determined the precompression stress ($\sigma_p = 38.4\text{ kPa}$) and bulk density ($\rho_b = 0.38\text{ g/cm}^3$) that define the plow pan layer at $10\text{--}25\text{ cm}$.

2. **How Visuals are Generated:**
   * When the user adjusts the water table slider or triggers the 24-hour diurnal / 365-day annual cycle, the Twin executes the calibrated governing equations in real time:
     $$\text{aerationFactor} = \max\left(0, \frac{-WTD + 5}{65}\right)$$
     $$R_{\text{eco}} = 0.8 + \text{aerationFactor} \times 10.5 \quad [\mu\text{mol m}^{-2}\text{s}^{-1}]$$
     $$\text{NEE} = \begin{cases} R_{\text{eco}} - 6.8, & \text{Daytime} \\ 0.85 \times R_{\text{eco}}, & \text{Nighttime} \end{cases}$$
   * The calculated flux values directly modulate SVG vector line thicknesses, arrow markers, animation speeds, and HUD indicators instantaneously without lag.
