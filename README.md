# 🌿 Wetland Monitor — Peatland Digital Twin & Academic Defense Studio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://danisantanderurrutia-coder.github.io/wetland-monitor/)
[![Institution](https://img.shields.io/badge/Institution-CAU%20Kiel-003366?style=for-the-badge)](https://www.uni-kiel.de/)
[![Faculty](https://img.shields.io/badge/Faculty-Agricultural%20%26%20Nutritional%20Sciences-2e7d32?style=for-the-badge)](https://www.agrar.uni-kiel.de/)

**Author:** Daniel Sebastián Santander Urrutia  
**Supervisors:** Prof. Martin Komainda Ph.D., Sebastian Jordan Ph.D.  
**Site:** Wallen / Wallener Au Peatland, Schleswig-Holstein, Northern Germany  

---

## 🌐 Live Web Application
Experience the interactive Digital Twin directly in your web browser:  
👉 **[https://danisantanderurrutia-coder.github.io/wetland-monitor/](https://danisantanderurrutia-coder.github.io/wetland-monitor/)**

---

## 📌 Overview

**Wetland Monitor** is a state-of-the-art interactive ecohydrological digital twin, visual analytics platform, and master thesis defense studio. It models and visualizes the complex soil-atmosphere greenhouse gas exchange ($\text{CO}_2$, $\text{CH}_4$, $\text{N}_2\text{O}$) and soil physical stratigraphy in transitioning temperate peatlands undergoing managed rewetting.

The system synthesizes continuous **Eddy Covariance (EC)** tower measurements, closed-chamber campaigns, tension table hydrology, oedometer precompression soil mechanics, and multi-decadal radiative forcing dynamics ($\text{GWP}_{100}$ and $\text{GWP}_{20}$).

---

## ✨ Key Features & Interactive Architecture

### 1. ⏱️ Pausable 24-Hour Diurnal Cycle Simulation (*Paso de la Hora*)
- **Realistic Parabolic Solar Arc:** Dynamic solar zenith ($R_n$ reaching $+620\text{ W/m}^2$) to nocturnal cooling.
- **Midday Stomatal Closure:** VPD stress ($> 1.2\text{ kPa}$) throttles photosynthetic $\text{CO}_2$ assimilation.
- **Nocturnal Thermal Inversion:** Decoupling filter ($u_* < 0.12\text{ m/s}$) simulating stagnant sub-canopy pooling and flux decoupling.
- **Full Pause & Resume Engine:** Pause at any exact minute of the day with an interactive 24-hour timeline scrubber.

### 2. 🗓️ 365-Day Annual Seasonal Evolution (*Paso de los Días*)
Empirically calibrated to field observations:
- **Winter (Jan–Feb):** Cold dormancy ($\text{GPP} = 0$), suppressed soil respiration ($R_{\text{eco}} < 5\%$), high water table ($-10\text{ cm}$), snow cover.
- **Spring Flush (Mar–May):** Vegetative regrowth and shoot flush, strong net carbon sink (**downward green flux arrow** up to $-4.2\,\mu\text{mol m}^{-2}\text{ s}^{-1}$).
- **Early Summer Peak (Jun):** Maximum photosynthetic uptake ($\text{GPP}$ peak, $-3.9\,\mu\text{mol m}^{-2}\text{ s}^{-1}$).
- **Summer Drought Drawdown (Jul–Aug):** Severe water table drop to $-44\text{ cm}$. Massive peat aeration triggers **huge peat respiration surge ($R_{\text{eco}} \approx 60\%$ of annual respiration)**, **flipping the ecosystem into a net carbon source (upward red arrow $+4.4\,\mu\text{mol m}^{-2}\text{ s}^{-1}$)**.
- **Autumn Managed Rewetting (Sep–Oct):** Water table rises from $-44\text{ cm}$ to $-6\text{ cm}$. Plant senescence leaves hollow aerenchyma chimneys open. **Annual $\text{N}_2\text{O}$ emission peak ($> 50\%$ of annual total)** driven by coupled nitrification-denitrification microsites ($+0.14\text{ nmol m}^{-2}\text{ s}^{-1}$).
- **Winter Inundation (Nov–Dec):** Full saturation ($+2\text{ cm}$ ponding) triggers the **Hypothesis 1 Acute Methane Spike ($+145\text{ nmol m}^{-2}\text{ s}^{-1}$)** venting through open aerenchyma chimneys, reversing climate benefits under $\text{GWP}_{20}$.

### 3. 🔬 Interactive Stratigraphy & Soil Mechanics
- **Horizon O (Acrotelm 0–10 cm):** High-porosity fibrous peat with rapid aeration.
- **Horizon A (Plow Pan / Pflughorizont 10–25 cm):** Mechanically compacted boundary ($\sigma_p = 62.4\text{ kPa}$) causing perched water table stagnation.
- **Horizon B (Catotelm 25–50 cm):** Waterlogged anoxic reduced sapric peat with biogenic methanogenesis.
- **Horizon R (>50 cm):** Glacial bedrock and gleyic mineral substrate.

### 4. 📊 22-Slide Academic Defense Deck
- High-fidelity visual deck covering context, experimental architecture, quality control filtering, energy balance closure ($R^2 = 0.94$), and management verdicts.
- Integrated teleprompter, timer, and slide navigation.

### 5. 📖 Standalone Thesis Explorer
- Integrated browser for thesis chapters, Data Digest, and academic methodologies directly inside the application.

---

## 🛠️ Local Development & Running

### Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge).
- Optional: Python 3 for running local server with API explorer.

### Launching Locally
Simply serve the files with any HTTP server:
```bash
# Python 3
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Or use the included server script:
```bash
python3 server.py
```

---

## 📜 Scientific Citation & Reference

```bibtex
@mastersthesis{santander2026peatland,
  author       = {Daniel Sebastián Santander Urrutia},
  title        = {Carbon Fluxes and Greenhouse Gases Exchange in Transitioning Wetlands of Northern Germany},
  school       = {Christian-Albrechts-Universität zu Kiel (CAU Kiel)},
  year         = {2026},
  address      = {Kiel, Germany},
  note         = {Supervised by Prof. Martin Komainda Ph.D. and Sebastian Jordan Ph.D.}
}
```

---
*Developed with CAU Kiel Wetland Ecohydrology Research Group.*
