# Digital Twin: Software Architecture & Reactive Engine

The **Wallener Au Peatland Digital Twin** is an interactive, client-side biophysical simulation engine designed to compute and visualize ecosystem carbon and greenhouse gas exchange ($\text{CO}_2$, $\text{CH}_4$, $\text{N}_2\text{O}$) in real time. 

Unlike static video renders or simple chart replays, the Twin functions as an **in-browser deterministic parameter model** running at 60 FPS, with an interactive SVG scene graph, temporal progression state machine, and bidirectional telemetry HUD.

```mermaid
flowchart TD
    subgraph UI_Controls ["1. User Interaction & Telemetry HUD"]
        WtdSlider["Water Table Depth Slider\n(+5 cm to -60 cm)"]
        Presets["Biophysical Preset Pills\n(Flooded, Capillary, Summer Drought)"]
        DayNight["Diurnal Mode Switcher\n(Daytime vs Nocturnal)"]
        Scrubber["Interactive Timeline Scrubber\n(Paso de la Hora / Paso de los Días)"]
    end

    subgraph Simulation_Engine ["2. Digital Twin Temporal Engine (digital_twin_engine.js)"]
        RAF["requestAnimationFrame High-Precision Loop\n(Delta-Time Calculation: 60-120 Hz)"]
        StateMachine{"Simulation State Machine\n(Idle | Diurnal 18s | Annual 24s | Paused)"}
        TimeInterpolation["Diurnal & Annual Solar / Climate Interpolation\n(Walter-Lieth curves, Solar Elevation, NDVI)"]
        PauseHandler["In-Canvas Click-to-Pause & Scrubbing State"]
        
        RAF --> StateMachine
        StateMachine --> TimeInterpolation
        PauseHandler -.-> StateMachine
    end

    subgraph Biophysical_Core ["3. Soil-Atmosphere Model (soil_model.js)"]
        Stratigraphy["Soil Profile Stratification\n(Acrotelm, Plow Pan 10-25 cm, Catotelm)"]
        CO2_Model["Carbon Balance Equation\nNEE = Reco(WTD, Tsoil) - GPP(Rg, VPD)"]
        CH4_Model["Methanogenesis & Ebullition Engine\nTransient Peak Trigger at WTD >= -10 cm"]
        N2O_Model["Redox Capillary Interface\nDenitrification Peak at -15 to -25 cm"]
        PhysicsDecouple["Atmospheric Decoupling Filter\nu* < 0.12 m/s Nocturnal Decoupling"]
        
        Stratigraphy --> CO2_Model & CH4_Model & N2O_Model
        PhysicsDecouple -.-> CO2_Model & CH4_Model
    end

    subgraph Rendering_Pipeline ["4. Reactive SVG Vector Engine (#ecosystem-svg)"]
        ResizeObs["ResizeObserver ViewBox Scaler\n(Auto-Scales 1350x650 Without Distortion)"]
        WaterPatch["Direct DOM Geometry Patching\n(y1/y2 Water Line & Height of Saturated Rect)"]
        VectorModulation["Dynamic Flow Vectors & Stroke Scaling\n(Stroke: 1.4px to 4.2px | Speed: 3.8s to 0.85s)"]
        GPUAnimation["Hardware-Accelerated CSS Keyframes\n(GPU-Composited Gas Motion)"]
        SkyShaders["Atmospheric Gradients & Celestial Bodies\n(Dynamic Sun/Moon Arc & Twilight Transitions)"]
    end

    subgraph Readouts ["5. Live Telemetry Readouts"]
        HUD_Gases["HUD Instantaneous Gas Fluxes\n(CO2 µmol/m²/s, CH4 nmol/m²/s, N2O nmol/m²/s)"]
        Badges["Dynamic State Badges\n(H1 Transient Peak, Perched Water Table, u* Inversion)"]
    end

    UI_Controls --> Biophysical_Core
    UI_Controls --> Simulation_Engine
    Simulation_Engine --> Biophysical_Core
    Biophysical_Core --> Rendering_Pipeline
    Biophysical_Core --> Readouts
    Rendering_Pipeline --> Readouts

    style UI_Controls fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc
    style Simulation_Engine fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc
    style Biophysical_Core fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc
    style Rendering_Pipeline fill:#451a03,stroke:#fb923c,stroke-width:2px,color:#f8fafc
    style Readouts fill:#172554,stroke:#60a5fa,stroke-width:2px,color:#f8fafc

    style WtdSlider fill:#0284c7,stroke:#38bdf8,color:#ffffff
    style RAF fill:#4f46e5,stroke:#a5b4fc,color:#ffffff
    style CO2_Model fill:#059669,stroke:#34d399,color:#ffffff
    style WaterPatch fill:#ea580c,stroke:#fdba74,color:#ffffff
    style HUD_Gases fill:#2563eb,stroke:#93c5fd,color:#ffffff
```

---

## Technical Specifications:

### 1. Zero-Build Vanilla Web Architecture
* **Native ES6 Modules:** No Node.js build pipeline, Webpack, or Babel required. Modern browsers execute modules directly via `<script type="module">`.
* **Zero Graphic Latency:** By utilizing a pure SVG Scene Graph instead of a heavy WebGL/Three.js canvas, memory consumption remains under 30 MB, ensuring instant startup and 60 FPS rendering on all laptops and tablets.
* **Serverless / GitHub Pages Deployment:** Fully static client-side distribution with global edge caching and automated cache busting (`?v=8.0`).

### 2. High-Precision Delta Temporal Engine
* Built with `window.requestAnimationFrame`, capturing frame-to-frame delta time ($\Delta t$).
* Supports full timeline scrubbing and non-destructive pausing: clicking anywhere on the ecosystem canvas immediately halts execution, storing `pausedProgress` and exposing instantaneous biophysical states for academic examination.

### 3. Responsive Proportional Scaler
* The master SVG coordinate space is defined with `viewBox="0 0 1350 650"`.
* A native `ResizeObserver` dynamically scales the canvas width and preserves aspect ratio (`preserveAspectRatio="xMidYMid meet"`), preventing graphic truncation across widescreen presentation displays, tablets, or multi-window layouts.
