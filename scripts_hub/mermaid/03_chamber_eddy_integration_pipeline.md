# Pipeline 03: Multi-Platform Scale Integration (Chambers & Eddy Covariance)

This pipeline integrates discrete soil-collar greenhouse gas chamber measurements with the landscape-scale footprint of the Eddy Covariance tower to cross-validate fluxes and account for microtopographic heterogeneity.

```mermaid
flowchart TD
    subgraph Multi_Scale_Sensors ["1. Multi-Scale Observations"]
        EC_Footprint["Landscape Eddy Covariance (100–300 m Fetch)\nContinuous 10 Hz Microclimatic Time-Series"]
        Chamber_Collars["8 Dynamic Closed Chambers (0.25 m²)\nDiscrete Transect Measurements: Collars 1–8"]
    end

    subgraph Chamber_Data_Pipeline ["2. Chamber Flux Calculation"]
        Chamber_Collars --> SlopeCalc["Concentration vs. Time Regression (HM vs. Linear Fitting)"]
        SlopeCalc --> FluxQC["Quality Screening (R² > 0.85, Temp Drift Corrections)"]
        FluxQC --> N2O_CH4_Rates["Collar Emission Rates (mg CH4/m²/h, µg N2O/m²/h)"]
    end

    subgraph Footprint_Model ["3. Spatial Footprint Weighting"]
        EC_Footprint --> Kljun["Kljun et al. (2015) 2D Analytical Footprint Model (FFP)"]
        Kljun --> SpatialWeights["Dynamic Source-Area Matrix Over Microrelief Zones"]
    end

    subgraph Cross_Validation ["4. Cross-Validation & Spatial Upscaling"]
        N2O_CH4_Rates & SpatialWeights --> FootprintUpscale["Footprint-Weighted Chamber Upscaling"]
        FootprintUpscale & EC_Footprint --> OrthogonalValidation["Orthogonal Multi-Platform Cross-Validation (R² = 0.83 for CH4)"]
        OrthogonalValidation --> N2O_SpatialLayer["Spatial N2O Pulse Map & Ditch Chimney Ebullition Layer"]
    end

    subgraph Output_Budget ["5. Complete 3-Gas Ecosystem Budget"]
        N2O_SpatialLayer --> FullGasSynthesis["Complete Multi-Gas Budget (CO2 + CH4 + N2O)\nIntegrated into the Digital Twin Scenario Selector"]
    end

    style Multi_Scale_Sensors fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style Chamber_Data_Pipeline fill:#451a03,stroke:#fb923c,stroke-width:2px,color:#f8fafc
    style Footprint_Model fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Cross_Validation fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc
    style Output_Budget fill:#172554,stroke:#60a5fa,stroke-width:2px,color:#f8fafc

    style EC_Footprint fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style Chamber_Collars fill:#d97706,stroke:#fbbf24,stroke-width:2px,color:#ffffff
    style SlopeCalc fill:#b45309,stroke:#fcd34d,color:#ffffff
    style FluxQC fill:#b45309,stroke:#fcd34d,color:#ffffff
    style N2O_CH4_Rates fill:#ea580c,stroke:#fdba74,stroke-width:2px,color:#ffffff
    style Kljun fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style SpatialWeights fill:#4338ca,stroke:#818cf8,color:#ffffff
    style FootprintUpscale fill:#059669,stroke:#34d399,color:#ffffff
    style OrthogonalValidation fill:#059669,stroke:#34d399,color:#ffffff
    style N2O_SpatialLayer fill:#047857,stroke:#6ee7b7,color:#ffffff
    style FullGasSynthesis fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
```

### Key Methodological Insights:
* **The Scale Disconnect:** Discrete chambers capture localized ditch ebullition hotspots and $\text{N}_2\text{O}$ nitrification/denitrification pulses, which the tower averages across several hundred meters.
* **Footprint Model:** Kljun FFP is computed half-hourly incorporating Obukhov length ($L$), standard deviation of lateral wind velocity ($\sigma_v$), and boundary layer height ($h$).
