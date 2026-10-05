# Pipeline 03: Multi-Platform Scale Integration (Chambers & Eddy Covariance)

This pipeline integrates discrete soil-collar greenhouse gas chamber measurements with the landscape-scale footprint of the Eddy Covariance tower to cross-validate fluxes and account for microtopographic heterogeneity.

```mermaid
flowchart TD
    subgraph Multi-Scale Observations
        EC_Footprint["Landscape Eddy Covariance (100–300 m Fetch)\nContinuous 10 Hz Time-Series"]
        Chamber_Collars["8 Dynamic Closed Chambers (0.25 m²)\nDiscrete Transect Measurements: Collars 1–8"]
    end

    subgraph Chamber Data Pipeline
        Chamber_Collars --> SlopeCalc["Concentration vs Time Curve Fitting (HM vs Linear Regression)"]
        SlopeCalc --> FluxQC["Flux Filtering (R² > 0.85, Chamber Temp Corrections)"]
        FluxQC --> N2O_CH4_Rates["Individual Chamber Emission Rates (mg/m²/h)"]
    end

    subgraph Spatial Footprint Weighting
        EC_Footprint --> Kljun["Kljun et al. (2015) 2D Analytical Footprint Model (FFP)"]
        Kljun --> SpatialWeights["Dynamic Grid Weighting Over Microrelief Zones"]
    end

    subgraph Cross-Validation & Synthesis
        N2O_CH4_Rates & SpatialWeights --> FootprintUpscale["Footprint-Weighted Chamber Upscaling"]
        FootprintUpscale & EC_Footprint --> OrthogonalValidation["Orthogonal Cross-Validation (R² = 0.83 for CH4)"]
        OrthogonalValidation --> N2O_SpatialLayer["Spatial N2O Pulse Map & Ditch Chimney Upscaling"]
    end

    subgraph Output
        N2O_SpatialLayer --> FullGasSynthesis["Complete 3-Gas Budget (CO2 + CH4 + N2O)"]
    end

    style EC_Footprint fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style Chamber_Collars fill:#d97706,stroke:#fbbf24,stroke-width:2px,color:#ffffff
    style FullGasSynthesis fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Key Methodological Insights:
* **The Scale Disconnect:** Discrete chambers capture localized ditch ebullition hotspots and N₂O nitrification/denitrification pulses, which the tower averages over hundreds of meters.
* **Footprint Model:** Kljun FFP run half-hourly incorporating Obukhov length ($L$), standard deviation of lateral wind velocity ($\sigma_v$), and boundary layer height ($h$).
