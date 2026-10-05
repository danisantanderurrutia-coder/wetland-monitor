# Pipeline 02: Multi-Gas Imputation & Flux Partitioning

This pipeline handles gap-filling of meteorological drivers, carbon dioxide partitioning (NEE into GPP and Reco), and non-linear machine learning imputation of methane fluxes during winter data dropouts.

```mermaid
flowchart TD
    subgraph Inputs
        CleanL2["Clean Level-2 Dataset (Fluxes)"]
        RawBiomet["In-Situ Biomet (Net Rad, Soil Temp, VWC, WTD)"]
        DWD["DWD Weather Station (External Regional Fallback)"]
    end

    subgraph Biomet Reconstruction
        RawBiomet & DWD --> BiometFill["MDS & Regional Correlation Gap-Filling"]
        BiometFill --> ContinuousDrivers["Gap-Free Continuous Environmental Drivers"]
    end

    subgraph CO2 Partitioning & Gap-Filling
        CleanL2 & ContinuousDrivers --> CO2_Branch{"CO2 Pathway (NEE)"}
        CO2_Branch --> MDS["Marginal Distribution Sampling (MDS, Reichstein 2005)"]
        CO2_Branch --> LT["Lloyd & Taylor (1994) Nighttime Respiration Model (Reco)"]
        CO2_Branch --> MM["Michaelis-Menten Light-Response Daytime Curve (GPP)"]
        LT & MM --> NEE_Partition["NEE = Reco - GPP\n(Half-Hourly Carbon Partitioning)"]
    end

    subgraph CH4 Non-Linear AI Imputation
        CleanL2 & ContinuousDrivers --> CH4_Branch{"CH4 Pathway"}
        CH4_Branch --> RF["Random Forest Regressor (ranger R, 500 trees)"]
        CH4_Branch --> ANN["Multi-Layer Perceptron Artificial Neural Network"]
        RF & ANN --> CH4_Ensemble["Weighted Ensemble Imputation for Winter Ebullition"]
    end

    subgraph Output
        NEE_Partition & CH4_Ensemble --> MasterEcosystem["Complete 8,760-Hour Ecosystem Flux Database"]
    end

    style CleanL2 fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style MasterEcosystem fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Gap-Filling Strategy Highlights:
* **MDS Covariates:** Incoming Shortwave Radiation ($R_g$), Vapor Pressure Deficit (VPD), and Soil Temperature ($T_{soil, 5cm}$).
* **Methane AI Predictors:** Water Table Depth (WTD), Air Pressure ($P_{atm}$ for ebullition triggering), Soil Moisture ($VWC_{5cm}$), and Peat Soil Temperature at 20 cm.
