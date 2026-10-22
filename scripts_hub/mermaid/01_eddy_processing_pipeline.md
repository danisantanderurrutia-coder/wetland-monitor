# Pipeline 01: Raw 10 Hz Micrometeorology to Clean Level-2 Fluxes

This pipeline processes high-frequency (10 Hz) turbulent wind and concentration fluctuations from the Campbell Scientific CSAT3 3D sonic anemometer and Li-7500 / Li-7700 open-path gas analyzers through EddyPro® into quality-filtered half-hourly fluxes.

```mermaid
flowchart TD
    subgraph Raw_Acquisition ["1. High-Frequency Field Acquisition (10 Hz)"]
        Raw10Hz["Raw 10 Hz Binary Data Streams\n(CSAT3 Sonic + Li-7500 CO2/H2O + Li-7700 CH4)"]
    end

    subgraph EddyPro_Core ["2. EddyPro 7.0.9 Processing Engine"]
        Raw10Hz --> Despike["Vickers & Mahrt (1997) Spike Detection & Elimination"]
        Despike --> PlanarFit["3D Coordinate Rotation (Planar Fit Method, Wilczak 2001)"]
        PlanarFit --> TimeLag["Cross-Correlation Time Lag Optimization"]
        TimeLag --> FluxComp["Half-Hourly Covariance Calculation (30-min Block Averaging)"]
        FluxComp --> WPL["WPL (Webb-Pearman-Leuning) Air Density Fluctuation Correction"]
        WPL --> Spectral["Moncrieff (1997, 2004) High & Low Pass Spectral Corrections"]
    end

    subgraph QAQC_Screening ["3. ICOS Quality Assurance & u* Threshold Screening"]
        Spectral --> QAQC["Mauder & Foken (2004) 0-1-2 Quality Flagging"]
        QAQC --> Level2["Level-2 Raw Flux Dataset (CO2, CH4, H2O, Sensible H & Latent Heat LE)"]
        Level2 --> UstarFilter["Seasonal u* Threshold Filtering (Papale et al. 2006, u* < 0.12 m/s)"]
        UstarFilter --> MADFilter["Median Absolute Deviation (MAD) Residual Spike Filter"]
    end

    subgraph Final_Output ["4. Verified Level-2 Research Dataset"]
        MADFilter --> CleanL2["Clean Level-2 Half-Hourly Flux Database\n(Ready for Gap-Filling & Digital Twin Calibration)"]
    end

    style Raw_Acquisition fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style EddyPro_Core fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style QAQC_Screening fill:#451a03,stroke:#fb923c,stroke-width:2px,color:#f8fafc
    style Final_Output fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc

    style Raw10Hz fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style Despike fill:#3b82f6,stroke:#93c5fd,color:#ffffff
    style PlanarFit fill:#3b82f6,stroke:#93c5fd,color:#ffffff
    style TimeLag fill:#3b82f6,stroke:#93c5fd,color:#ffffff
    style FluxComp fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style WPL fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style Spectral fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style QAQC fill:#d97706,stroke:#fbbf24,color:#ffffff
    style Level2 fill:#ea580c,stroke:#fdba74,color:#ffffff
    style UstarFilter fill:#dc2626,stroke:#fca5a5,color:#ffffff
    style MADFilter fill:#dc2626,stroke:#fca5a5,color:#ffffff
    style CleanL2 fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Key Statistical Parameters:
* **Sampling Rate:** 10 Hz ($18,000$ observations per 30-min block).
* **Friction Velocity Threshold ($u^*$):** Determined per 50-day moving window with bootstrapping ($100$ iterations), yielding $u^*_{\text{threshold}} = 0.12\text{ m/s}$.
* **Quality Screening:** Rejection of ICOS Flag 2 (steady-state test violation $>30\%$ or integral turbulence characteristics test failure).
