# Pipeline 02: Multi-Gas Imputation & Flux Partitioning

This pipeline handles gap-filling of micrometeorological drivers, carbon dioxide partitioning (Net Ecosystem Exchange $\text{NEE}$ into Gross Primary Production $\text{GPP}$ and Ecosystem Respiration $R_{\text{eco}}$), and non-linear machine learning imputation of methane fluxes during winter data dropouts.

```mermaid
flowchart TD
    subgraph Inputs ["1. Environmental & Flux Inputs"]
        CleanL2["Clean Level-2 Dataset (Half-Hourly Fluxes)"]
        RawBiomet["In-Situ Biomet (Net Rad Rn, Soil Temp, VWC, WTD)"]
        DWD["DWD Weather Station (Regional Fallback)"]
    end

    subgraph Biomet_Reconstruction ["2. Microclimatic Gap-Filling"]
        RawBiomet & DWD --> BiometFill["Marginal Distribution Sampling & Regional Regression"]
        BiometFill --> ContinuousDrivers["Continuous Environmental Driver Time-Series"]
    end

    subgraph CO2_Partitioning ["3. CO2 Partitioning & Flux Decomposition"]
        CleanL2 & ContinuousDrivers --> CO2_Branch{"CO2 Pathway (NEE)"}
        CO2_Branch --> MDS["MDS (Marginal Distribution Sampling, Reichstein 2005)"]
        CO2_Branch --> LT["Lloyd & Taylor (1994) Nocturnal Respiration (Reco)"]
        CO2_Branch --> MM["Michaelis-Menten Light-Response Curve (GPP)"]
        LT & MM --> NEE_Partition["NEE = Reco - GPP\n(Half-Hourly Carbon Partitioning)"]
    end

    subgraph CH4_AI_Imputation ["4. CH4 Non-Linear Machine Learning Imputation"]
        CleanL2 & ContinuousDrivers --> CH4_Branch{"CH4 Pathway"}
        CH4_Branch --> RF["Random Forest Regressor (ranger R, 500 Trees)"]
        CH4_Branch --> ANN["Multi-Layer Perceptron Artificial Neural Network"]
        RF & ANN --> CH4_Ensemble["Weighted Ensemble Imputation (OOB-RMSE Minimized)"]
    end

    subgraph Master_Output ["5. Master Flux Synthesis"]
        NEE_Partition & CH4_Ensemble --> MasterEcosystem["Complete 8,760-Hour Ecosystem Flux Database\n(Used for Budgeting & Digital Twin Parameter Grounding)"]
    end

    style Inputs fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style Biomet_Reconstruction fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style CO2_Partitioning fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc
    style CH4_AI_Imputation fill:#4c1d95,stroke:#c084fc,stroke-width:2px,color:#f8fafc
    style Master_Output fill:#172554,stroke:#60a5fa,stroke-width:2px,color:#f8fafc

    style CleanL2 fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style RawBiomet fill:#3b82f6,stroke:#93c5fd,color:#ffffff
    style DWD fill:#64748b,stroke:#94a3b8,color:#ffffff
    style ContinuousDrivers fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style CO2_Branch fill:#059669,stroke:#34d399,color:#ffffff
    style MDS fill:#10b981,stroke:#6ee7b7,color:#ffffff
    style LT fill:#10b981,stroke:#6ee7b7,color:#ffffff
    style MM fill:#10b981,stroke:#6ee7b7,color:#ffffff
    style NEE_Partition fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
    style CH4_Branch fill:#7c3aed,stroke:#c084fc,color:#ffffff
    style RF fill:#8b5cf6,stroke:#ddd6fe,color:#ffffff
    style ANN fill:#8b5cf6,stroke:#ddd6fe,color:#ffffff
    style CH4_Ensemble fill:#6d28d9,stroke:#a78bfa,stroke-width:2px,color:#ffffff
    style MasterEcosystem fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
```

### Gap-Filling Strategy Highlights:
* **MDS Covariates:** Incoming Shortwave Radiation ($R_g$), Vapor Pressure Deficit (VPD), and Soil Temperature ($T_{soil, 5cm}$).
* **Methane AI Predictors:** Water Table Depth (WTD), Atmospheric Pressure ($P_{atm}$ triggering ebullition), Soil Moisture ($VWC_{5cm}$), and Peat Soil Temperature at 20 cm.
