# Pipeline 04: Soil Physics, Precompression Stress & Geomechanics

This pipeline integrates undisturbed soil core oedometer testing, moisture retention curves (pF), bulk density stratification, and air permeability measurements across the degraded peat profile.

```mermaid
flowchart TD
    subgraph Sampling ["1. Undisturbed Field Sampling"]
        CoreSampling["Undisturbed Peat Core Cylinders (100 cm³)\nDepths: 0–5 cm, 10–15 cm, 30–35 cm, 50–55 cm"]
    end

    subgraph Oedometer_Testing ["2. Laboratory Geomechanical Testing (CAU Kiel)"]
        CoreSampling --> StepLoading["Incremental Confining Stress Protocol (6, 12, 25, 50, 100, 200, 400 kPa)"]
        StepLoading --> CasagrandeMethod["Casagrande (1936) & Schmertmann (1955) Curvature Fitting"]
        CasagrandeMethod --> SigmaP["Precompression Stress Determination (σp = 38.4 ± 4.2 kPa)"]
    end

    subgraph Hydraulics_Aeration ["3. Retention & Aeration Capacity"]
        CoreSampling --> Sandbox["Sand-Kaolin Box (pF 0, pF 1.8, pF 2.5 Retention Steps)"]
        Sandbox --> AirPerm["Air Permeability (Ka) & Air Capacity (AC vol%)"]
        Sandbox --> VanGenuchten["Van Genuchten (1980) Retention Parameters (θs, θr, α, n)"]
    end

    subgraph Degradation_Stratigraphy ["4. Physical Stratigraphy & Degradation Analysis"]
        SigmaP & AirPerm & VanGenuchten --> BulkDensity["Bulk Density Stratigraphy (Peak ρb = 0.38 g/cm³ at 10-25 cm)"]
        BulkDensity --> MechanicalLegacy["Mechanical Overconsolidation Assessment (Agricultural Plow Pan Legacy)"]
    end

    subgraph Twin_Boundary ["5. Soil-Atmosphere Digital Twin Boundary Conditions"]
        MechanicalLegacy --> PorosityCoupling["Macropore Tortuosity & Perched Water Table Dynamics"]
        PorosityCoupling --> DigitalTwinPhysics["Plow Pan Impervious Boundary in soil_model.js\n(Controls Capillary Barriers & Perched Water Badge)"]
    end

    style Sampling fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style Oedometer_Testing fill:#4c1d95,stroke:#c084fc,stroke-width:2px,color:#f8fafc
    style Hydraulics_Aeration fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Degradation_Stratigraphy fill:#451a03,stroke:#fb923c,stroke-width:2px,color:#f8fafc
    style Twin_Boundary fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc

    style CoreSampling fill:#d97706,stroke:#fbbf24,stroke-width:2px,color:#ffffff
    style StepLoading fill:#7c3aed,stroke:#c084fc,color:#ffffff
    style CasagrandeMethod fill:#7c3aed,stroke:#c084fc,color:#ffffff
    style SigmaP fill:#9333ea,stroke:#e9d5ff,stroke-width:2px,color:#ffffff
    style Sandbox fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style AirPerm fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style VanGenuchten fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style BulkDensity fill:#ea580c,stroke:#fdba74,color:#ffffff
    style MechanicalLegacy fill:#ea580c,stroke:#fdba74,stroke-width:2px,color:#ffffff
    style PorosityCoupling fill:#059669,stroke:#34d399,color:#ffffff
    style DigitalTwinPhysics fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Critical Geomechanical Quantifications:
* **Precompression Stress ($\sigma_p$):** $38.4 \pm 4.2\text{ kPa}$ in topsoil ($0\text{--}5\text{ cm}$) indicates historical heavy tractor wheel compaction during prior intensive agricultural grassland management.
* **Bulk Density ($\rho_b$):** Peaks at $0.38\text{ g/cm}^3$ in the compacted plow layer, severely reducing air permeability ($K_a < 1.2\text{ }\mu\text{m}^2$) and creating an impervious barrier that holds perched water tables above deeper dry peat.
