# Pipeline 04: Soil Physics, Precompression Stress & Geomechanics

This pipeline integrates undisturbed soil core oedometer testing, soil moisture retention curves (pF), bulk density stratification, and air permeability measurements across the degraded peat profile.

```mermaid
flowchart TD
    subgraph Undisturbed Field Sampling
        CoreSampling["Undisturbed Peat Core Cylinders (100 cm³)\nDepths: 0–5 cm, 10–15 cm, 30–35 cm, 50–55 cm"]
    end

    subgraph Laboratory Oedometer Testing
        CoreSampling --> StepLoading["Incremental Confining Stress Protocol (6, 12, 25, 50, 100, 200, 400 kPa)"]
        StepLoading --> CasagrandeMethod["Casagrande (1936) & Schmertmann (1955) Curvature Fitting"]
        CasagrandeMethod --> SigmaP["Precompression Stress Determination (σp)"]
    end

    subgraph Hydraulic & Aeration Capacity
        CoreSampling --> Sandbox["Sand-Kaolin Box (pF 0, pF 1.8, pF 2.5 Water Retention)"]
        Sandbox --> AirPerm["Air Permeability (Ka) & Air Capacity (AC vol%)"]
        Sandbox --> VanGenuchten["Van Genuchten (1980) Retention Parameters (θs, θr, α, n)"]
    end

    subgraph Physical Stratigraphy & Legacy Analysis
        SigmaP & AirPerm & VanGenuchten --> BulkDensity["Bulk Density Stratigraphy & Degradation State"]
        BulkDensity --> MechanicalLegacy["Mechanical Overconsolidation Assessment (Agricultural Legacy)"]
    end

    subgraph Coupling to Gas Exchange
        MechanicalLegacy --> PorosityCoupling["Macropore Tortuosity & Anoxic Layer Boundary Constraint"]
        PorosityCoupling --> DigitalTwinPhysics["Soil-Atmosphere Digital Twin Boundary Conditions"]
    end

    style CoreSampling fill:#d97706,stroke:#fbbf24,stroke-width:2px,color:#ffffff
    style DigitalTwinPhysics fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
```

### Critical Geomechanical Quantifications:
* **Precompression Stress ($\sigma_p$):** $38.4 \pm 4.2\text{ kPa}$ in topsoil ($0\text{--}5\text{ cm}$) indicating heavy tractor wheel compaction during prior agricultural management.
* **Bulk Density ($\rho_b$):** Peaks at $0.38\text{ g/cm}^3$ in the compacted plow layer, severely reducing air permeability ($K_a < 1.2\text{ }\mu\text{m}^2$) and sealing methanotrophic bio-filters when water levels rise.
