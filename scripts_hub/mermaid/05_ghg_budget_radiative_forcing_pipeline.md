# Pipeline 05: Master Radiative Forcing & Multi-Gas GHG Budget

This pipeline executes the synthesis of carbon dioxide ($\text{CO}_2$), methane ($\text{CH}_4$), and nitrous oxide ($\text{N}_2\text{O}$) balances, applying Global Warming Potentials across multiple analytical time horizons ($\text{GWP}_{100}$, $\text{GWP}_{20}$, and Sustained-Flux $\text{SGWP}$).

```mermaid
flowchart TD
    subgraph Annual Flux Totals
        CO2_Tot["Annual NEE: -1,862 g CO2/m²/yr\n(Apparent Strong Carbon Sink)"]
        CH4_Tot["Annual CH4: +12.9 g CH4/m²/yr\n(Substantial Wetland Emission)"]
        N2O_Tot["Annual N2O: +0.076 g N2O/m²/yr\n(Episodic Rewetting Pulses)"]
    end

    subgraph IPCC AR6 Metric Transformations
        CO2_Tot --> GWP100_CO2["GWP100 factor = 1\n-> -1,862 g CO2-eq/m²/yr"]
        CH4_Tot --> GWP100_CH4["GWP100 factor = 29.8\n-> +384.4 g CO2-eq/m²/yr"]
        N2O_Tot --> GWP100_N2O["GWP100 factor = 273\n-> +20.7 g CO2-eq/m²/yr"]
        
        CH4_Tot --> GWP20_CH4["GWP20 factor = 82.5\n-> +1,064.2 g CO2-eq/m²/yr"]
        N2O_Tot --> GWP20_N2O["GWP20 factor = 273\n-> +20.7 g CO2-eq/m²/yr"]
    end

    subgraph Analytical Budgets
        GWP100_CO2 & GWP100_CH4 & GWP100_N2O --> Budget100["Net 100-Year GHG Budget:\n-1,457 ± 118 g CO2-eq/m²/yr\n(Net Cooling Effect)"]
        GWP100_CO2 & GWP20_CH4 & GWP20_N2O --> Budget20["Net 20-Year GHG Budget:\n-777 ± 142 g CO2-eq/m²/yr\n(Near-Neutral / Reduced Cooling)"]
    end

    subgraph Climate Policy & Decision Space
        Budget100 --> Outlook100["Long-Term Peatland Carbon Preservation (100-Year Horizon)"]
        Budget20 --> Outlook20["Short-Term Warming Risk Mitigation (2030–2050 Climate Targets)"]
    end

    style CO2_Tot fill:#0284c7,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style CH4_Tot fill:#f59e0b,stroke:#fbbf24,stroke-width:2px,color:#ffffff
    style N2O_Tot fill:#eab308,stroke:#facc15,stroke-width:2px,color:#ffffff
    style Budget100 fill:#059669,stroke:#34d399,stroke-width:2px,color:#ffffff
    style Budget20 fill:#d97706,stroke:#fbbf24,stroke-width:2px,color:#ffffff
```

### Climate Radiative Forcing Highlights:
* **The Horizon Divergence:** On a 100-year timescale, methane offsets only $20.6\%$ of the photosynthetic $\text{CO}_2$ drawdown. On a 20-year horizon, methane emissions offset over $57.1\%$ of the $\text{CO}_2$ sink.
* **Nitrous Oxide Contribution:** $\text{N}_2\text{O}$ emissions remain minor ($<2\%$ of total radiative forcing) but are critical indicators of rewetting aeration stress.
