# Pipeline 01: Raw 10 Hz Micrometeorology to Clean Level-2 Fluxes

This pipeline processes high-frequency (10 Hz) turbulent fluctuations from the Campbell Scientific CSAT3 sonic anemometer and Li-7500 / Li-7700 open-path gas analyzers through EddyPro® into quality-filtered half-hourly fluxes.

```mermaid
flowchart TD
    subgraph Raw Acquisition
        Raw10Hz["Raw 10 Hz Binary Data\n(CSAT3 Sonic + Li-7500 CO2/H2O + Li-7700 CH4)"]
    end

    subgraph EddyPro 7.0.9 Core
        Raw10Hz --> Despike["Vickers & Mahrt (1997) Despiking"]
        Despike --> PlanarFit["3D Planar Fit Coordinate Rotation (Wilczak et al. 2001)"]
        PlanarFit --> TimeLag["Cross-Correlation Time Lag Optimization"]
        TimeLag --> FluxComp["Half-Hourly Covariance Calculation (30-min block)"]
        FluxComp --> WPL["WPL (Webb-Pearman-Leuning) Air Density Correction"]
        WPL --> Spectral["Spectral Attenuation Correction (Moncrieff 1997, 2004)"]
    end

    subgraph Quality Assurance & Friction Velocity
        Spectral --> QAQC["Mauder & Foken (2004) / ICOS 0-1-2 Flags"]
        QAQC --> Level2["Level-2 Raw Fluxes (CO2, CH4, H2O, Sensible & Latent Heat)"]
        Level2 --> UstarFilter["u* (Friction Velocity) Seasonal Threshold Filtering (Papale et al. 2006)"]
        UstarFilter --> MADFilter["Median Absolute Deviation (MAD) Residual Spike Filter"]
    end

    subgraph Output
        MADFilter --> CleanL2["Clean Level-2 Half-Hourly Dataset ready for Gap-Filling"]
    end

    style Raw10Hz fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style CleanL2 fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Key Statistical Parameters:
* **Sampling Rate:** 10 Hz (18,000 observations per 30-min block).
* **Friction Velocity Threshold ($u^*$):** Determined per 50-day moving window with bootstrapping ($100$ iterations).
* **Quality Screening:** Rejection of ICOS Flag 2 (steady-state test violation $>30\%$ or integral turbulence characteristics test failure).
