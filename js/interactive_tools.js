/* ==========================================================================
   WETLAND MONITOR — INTERACTIVE TOOLS & EXPANSION SUITE
   - 4-Theme Engine Coordinator
   - Spotlight Command Palette (Cmd + K / Ctrl + K)
   - Interactive Before vs. After Rewetting Curtain Slider
   - Interactive Peat Subsidence & Carbon Oxidation Calculator
   - Interactive Thermodynamic Redox Ladder Simulator
   - 3D Card Parallax Tilt & Tactile Audio Feedback
   - 100% English Terminology & Scientific Calibration
   ========================================================================== */

export const PALETTE_COMMANDS = [
  // Views
  {
    id: "view-twin-wallener",
    title: "Wallener Au Digital Twin (3D & 2D Stratigraphy)",
    category: "Views",
    icon: "🔬",
    keywords: "twin simulation 3d soil fen water table wallener au catotelm",
    action: (app) => {
      app.isWallenerTwinMode = true;
      if (app.sandbox) app.sandbox.loadArchetype("fen");
      app.switchView("soil_interface");
    }
  },
  {
    id: "view-landing",
    title: "Thesis Hub & Interactive Deck Overview (Landing)",
    category: "Views",
    icon: "🏡",
    keywords: "home landing cover index thesis master overview hub",
    action: (app) => app.switchView("landing")
  },
  {
    id: "view-wallener-dash",
    title: "Wallener Au Field Overview & Geomorphology",
    category: "Views",
    icon: "🗺️",
    keywords: "wallener dashboard field geomorphology site map austria",
    action: (app) => app.switchView("wallener_dashboard")
  },
  {
    id: "view-biogeo",
    title: "Biogeochemistry & Succession Trajectories (Redox / DOC / CO2)",
    category: "Views",
    icon: "🧪",
    keywords: "biogeochemistry redox carbon succession trajectory doc methane ch4 co2",
    action: (app) => app.switchView("biogeochemistry")
  },
  {
    id: "view-eddy",
    title: "Eddy Covariance & Turbulence Micrometeorology",
    category: "Views",
    icon: "🌪️",
    keywords: "eddy covariance turbulence flux tower footprint sonic anemometer open path",
    action: (app) => app.switchView("eddy_covariance")
  },
  {
    id: "view-satellites",
    title: "Remote Sensing & Satellite Flux Upscaling",
    category: "Views",
    icon: "🛰️",
    keywords: "satellite remote sensing sentinel ndvi ndwi optical radar upscaling landsat",
    action: (app) => app.switchView("satellites_general")
  },
  {
    id: "view-tools",
    title: "Analytical Tools & Interactive Calculators",
    category: "Views",
    icon: "⚙️",
    keywords: "tools calculators models edaphic empirical subsidence curtain slider",
    action: (app) => app.switchView("tools_general")
  },
  {
    id: "view-chambers",
    title: "Chamber Greenhouse Gas Field Measurements",
    category: "Views",
    icon: "📦",
    keywords: "chambers ghg instruments matrix field measurement collar closed static",
    action: (app) => app.switchView("instruments_matrix")
  },
  {
    id: "view-pipeline",
    title: "Empirical Machine Learning & Carbon Inversion Pipeline",
    category: "Views",
    icon: "🧮",
    keywords: "data pipeline machine learning random forest artificial neural network ann pyfluxpro",
    action: (app) => app.switchView("data_pipeline")
  },
  {
    id: "view-gwp",
    title: "GWP & Sustained Radiative Forcing (SGWP / SGWP100)",
    category: "Views",
    icon: "⚖️",
    keywords: "gwp global warming potential radiative forcing methane co2 cooling paradox horizon",
    action: (app) => app.switchView("gwp_explorer")
  },
  {
    id: "view-classic",
    title: "Classic Slide Deck Presentation View",
    category: "Views",
    icon: "📽️",
    keywords: "presentation slides pitch deck linear fullscreen narrative",
    action: (app) => app.switchView("classic_presentation")
  },

  // Interactive Tools
  {
    id: "tool-curtain-slider",
    title: "Interactive Curtain Slider: Before vs. After Rewetting",
    category: "Analytical Tools",
    icon: "🎚️",
    keywords: "curtain slider before after rewetting split screen comparison restoration drainage",
    action: (app) => {
      app.switchView("tools_general");
      setTimeout(() => {
        const el = document.getElementById("panel-comparison-slider");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    }
  },
  {
    id: "tool-peat-calc",
    title: "Peat Subsidence & Carbon Oxidation Calculator",
    category: "Analytical Tools",
    icon: "📉",
    keywords: "subsidence calculator peat loss oxidation van den akker depth bulk density mineralization",
    action: (app) => {
      app.switchView("tools_general");
      setTimeout(() => {
        const el = document.getElementById("panel-peat-calculator");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    }
  },
  {
    id: "tool-redox-sim",
    title: "Thermodynamic Redox Ladder Simulator",
    category: "Analytical Tools",
    icon: "⚡",
    keywords: "redox ladder simulator thermodynamic eh electron acceptor succession anoxia methanogenesis",
    action: (app) => {
      app.switchView("biogeochemistry_general");
      setTimeout(() => {
        const el = document.getElementById("panel-redox-ladder");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    }
  },

  // Key Thesis Figures
  {
    id: "fig-55",
    title: "Figure 55: Multi-Depth Peat Stratigraphy & Porewater Redox",
    category: "Key Thesis Figures",
    icon: "📊",
    keywords: "figure 55 fig 55 stratigraphy porewater pore water chemistry acrotelm catotelm",
    action: (app) => {
      app.switchView("soil_interface");
      setTimeout(() => {
        if (window.twinSandbox) {
          window.twinSandbox.selectInstrumentPin("piezometer");
        }
      }, 200);
    }
  },
  {
    id: "fig-20",
    title: "Figure 20: Net Ecosystem Carbon Balance (NECB) vs. Water Table",
    category: "Key Thesis Figures",
    icon: "📈",
    keywords: "figure 20 fig 20 carbon balance necb water table subsidence emissions",
    action: (app) => app.switchView("gwp_explorer")
  },
  {
    id: "fig-78",
    title: "Figure 78: Diurnal EC Flux Partitioning (GPP vs. Reco)",
    category: "Key Thesis Figures",
    icon: "📉",
    keywords: "figure 78 fig 78 eddy covariance diurnal partitioning gpp reco nee half hourly",
    action: (app) => app.switchView("eddy_covariance")
  },

  // Archetypes
  {
    id: "archetype-fen",
    title: "Load Archetype: Percolating Fen (Wallener Au Standard)",
    category: "Wetland Archetypes",
    icon: "🌾",
    keywords: "archetype percolating fen wallener au minerotrophic groundwater carex",
    action: (app) => {
      app.isWallenerTwinMode = true;
      if (app.sandbox) app.sandbox.loadArchetype("fen");
      app.switchView("soil_interface");
    }
  },
  {
    id: "archetype-bog",
    title: "Load Archetype: Ombrotrophic Raised Bog (Sphagnum Moss)",
    category: "Wetland Archetypes",
    icon: "🌱",
    keywords: "archetype raised bog ombrotrophic sphagnum acidic acrotelm",
    action: (app) => {
      app.isWallenerTwinMode = false;
      if (app.sandbox) app.sandbox.loadArchetype("bog");
      app.switchView("soil_interface");
    }
  },
  {
    id: "archetype-drained",
    title: "Load Archetype: Drained Agricultural Peat Soil",
    category: "Wetland Archetypes",
    icon: "🚜",
    keywords: "archetype drained agricultural deep ditch subsidence oxic grassland",
    action: (app) => {
      app.isWallenerTwinMode = false;
      if (app.sandbox) app.sandbox.loadArchetype("drained");
      app.switchView("soil_interface");
    }
  },
  {
    id: "archetype-mangrove",
    title: "Load Archetype: Coastal / Mangrove Tidal Wetland",
    category: "Wetland Archetypes",
    icon: "🌊",
    keywords: "archetype coastal mangrove tidal sulfate salinity blue carbon",
    action: (app) => {
      app.isWallenerTwinMode = false;
      if (app.sandbox) app.sandbox.loadArchetype("mangrove");
      app.switchView("soil_interface");
    }
  },

  // Themes
  {
    id: "theme-boreal",
    title: "Switch Theme: Boreal Peat (Cyber Dark Bio-Lab)",
    category: "Visual Themes",
    icon: "🌌",
    keywords: "theme boreal peat dark cyber bio lab neon cyan luminous",
    action: (app) => app.setTheme("boreal")
  },
  {
    id: "theme-daylight",
    title: "Switch Theme: Fieldwork Daylight (Solar Contrast Light)",
    category: "Visual Themes",
    icon: "☀️",
    keywords: "theme fieldwork daylight bright light clean solar white high contrast",
    action: (app) => app.setTheme("daylight")
  },
  {
    id: "theme-biophilic",
    title: "Switch Theme: Living Moss (Biophilic Evergreen)",
    category: "Visual Themes",
    icon: "🌿",
    keywords: "theme living moss biophilic green forest botanical nature",
    action: (app) => app.setTheme("biophilic")
  },
  {
    id: "theme-monochrome",
    title: "Switch Theme: Academic Monochrome (Swiss Print Minimal)",
    category: "Visual Themes",
    icon: "📄",
    keywords: "theme academic monochrome swiss print paper black white thesis publication",
    action: (app) => app.setTheme("monochrome")
  },

  // System & Admin
  {
    id: "admin-console",
    title: "Open Research Admin & Embargo Console",
    category: "System & Admin",
    icon: "🛡️",
    keywords: "admin security embargo console audit research settings permissions",
    action: (app) => {
      const modal = document.getElementById("admin-login-modal");
      if (modal) modal.classList.remove("hidden");
    }
  },
  {
    id: "admin-notes",
    title: "Open Live Research Notes & Annotation Drawer",
    category: "System & Admin",
    icon: "📝",
    keywords: "notes drawer audit export research feedback log comments",
    action: (app) => {
      const drawer = document.getElementById("notes-drawer");
      if (drawer) drawer.classList.toggle("open");
    }
  }
];

export class InteractiveSuite {
  constructor(app) {
    this.app = app;
    this.paletteSelectedIndex = 0;
    this.filteredCommands = [...PALETTE_COMMANDS];
  }

  init() {
    this.initCommandPalette();
    this.initCurtainSlider();
    this.initPeatCalculator();
    this.initRedoxLadder();
    this.initCardParallaxTilt();
  }

  // ==========================================================================
  // 1. SPOTLIGHT COMMAND PALETTE (Cmd + K / Ctrl + K)
  // ==========================================================================
  initCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    const input = document.getElementById("command-palette-input");
    const resultsContainer = document.getElementById("command-palette-results");
    const openBtn = document.getElementById("btn-header-spotlight");

    if (!modal || !input || !resultsContainer) return;

    const openPalette = () => {
      modal.classList.add("active");
      modal.classList.remove("hidden");
      input.value = "";
      this.filterCommands("");
      this.renderResults();
      setTimeout(() => input.focus(), 50);
      this.app.playUiAudioFeedback("click");
    };

    const closePalette = () => {
      modal.classList.remove("active");
      modal.classList.add("hidden");
    };

    if (openBtn) {
      openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openPalette();
      });
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closePalette();
      }
    });

    // Keyboard global listener (Cmd+K / Ctrl+K & Escape)
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (!modal.classList.contains("active")) {
          openPalette();
        } else {
          closePalette();
        }
      } else if (e.key === "Escape" && modal.classList.contains("active")) {
        closePalette();
      }
    });

    // Input search typing
    input.addEventListener("input", (e) => {
      this.filterCommands(e.target.value);
      this.paletteSelectedIndex = 0;
      this.renderResults();
    });

    // Palette navigation keys (Up, Down, Enter)
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.filteredCommands.length > 0) {
          this.paletteSelectedIndex = (this.paletteSelectedIndex + 1) % this.filteredCommands.length;
          this.renderResults();
          this.scrollActiveIntoView();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.filteredCommands.length > 0) {
          this.paletteSelectedIndex = (this.paletteSelectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
          this.renderResults();
          this.scrollActiveIntoView();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (this.filteredCommands[this.paletteSelectedIndex]) {
          const selected = this.filteredCommands[this.paletteSelectedIndex];
          closePalette();
          this.app.playUiAudioFeedback("success");
          selected.action(this.app);
        }
      }
    });
  }

  filterCommands(query) {
    const q = (query || "").toLowerCase().trim();
    if (!q) {
      this.filteredCommands = [...PALETTE_COMMANDS];
      return;
    }
    this.filteredCommands = PALETTE_COMMANDS.filter(cmd => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchCat = cmd.category.toLowerCase().includes(q);
      const matchKey = cmd.keywords.toLowerCase().includes(q);
      return matchTitle || matchCat || matchKey;
    });
  }

  renderResults() {
    const resultsContainer = document.getElementById("command-palette-results");
    const countBadge = document.getElementById("command-palette-count");
    if (!resultsContainer) return;

    if (countBadge) {
      countBadge.textContent = `${this.filteredCommands.length} matches found`;
    }

    if (this.filteredCommands.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 0.88rem;">
          No matching views, figures, or analytical tools found. Try searching for "twin", "eddy", "subsidence", or "bog".
        </div>
      `;
      return;
    }

    let html = "";
    this.filteredCommands.forEach((cmd, idx) => {
      const isSelected = idx === this.paletteSelectedIndex;
      html += `
        <div class="command-palette-item palette-result-item ${isSelected ? 'selected active' : ''}" data-idx="${idx}">
          <div class="command-item-left">
            <span class="command-item-icon">${cmd.icon}</span>
            <div>
              <div class="command-item-label">${cmd.title}</div>
              <div class="command-item-meta">${cmd.category}</div>
            </div>
          </div>
          <span class="command-palette-shortcut-badge">Jump ↵</span>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;

    // Attach click listeners to rendered rows
    const items = resultsContainer.querySelectorAll(".command-palette-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.idx, 10);
        if (this.filteredCommands[idx]) {
          const selected = this.filteredCommands[idx];
          const modal = document.getElementById("command-palette-modal");
          if (modal) {
            modal.classList.remove("active");
            modal.classList.add("hidden");
          }
          this.app.playUiAudioFeedback("success");
          selected.action(this.app);
        }
      });
      item.addEventListener("mouseenter", () => {
        this.paletteSelectedIndex = parseInt(item.dataset.idx, 10);
        items.forEach(el => {
          el.classList.remove("selected");
          el.classList.remove("active");
        });
        item.classList.add("selected");
        item.classList.add("active");
      });
    });
  }

  scrollActiveIntoView() {
    const activeItem = document.querySelector(".command-palette-item.selected");
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }

  // ==========================================================================
  // 2. BEFORE VS. AFTER REWETTING CURTAIN SLIDER
  // ==========================================================================
  initCurtainSlider() {
    const stage = document.getElementById("comparison-stage");
    const handle = document.getElementById("comparison-handle");
    const drainedLayer = document.getElementById("comparison-drained-layer");

    if (!stage || !handle || !drainedLayer) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = stage.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      let pct = (offsetX / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));

      handle.style.left = `${pct}%`;
      drainedLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      setPosition(e.clientX);
      handle.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      this.app.playUiAudioFeedback("click");
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        handle.style.cursor = "ew-resize";
        document.body.style.userSelect = "";
      }
    };

    handle.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerdown", (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        onPointerDown(e);
      }
    });

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }

  // ==========================================================================
  // 3. PEAT LOSS & SUBSIDENCE CALCULATOR (van den Akker & Schothorst Model)
  // ==========================================================================
  initPeatCalculator() {
    const inputWtd = document.getElementById("calc-input-wtd");
    const inputDepth = document.getElementById("calc-input-depth");
    const inputYears = document.getElementById("calc-input-years");
    const inputBd = document.getElementById("calc-input-bd");

    const valWtd = document.getElementById("calc-val-wtd");
    const valDepth = document.getElementById("calc-val-depth");
    const valYears = document.getElementById("calc-val-years");
    const valBd = document.getElementById("calc-val-bd");

    const resSubsidence = document.getElementById("calc-res-subsidence");
    const resVolume = document.getElementById("calc-res-volume");
    const resCo2 = document.getElementById("calc-res-co2");
    const resLifespan = document.getElementById("calc-res-lifespan");

    if (!inputWtd || !inputDepth || !inputYears || !inputBd) return;

    const calculate = () => {
      const wtd = parseFloat(inputWtd.value); // cm (negative, e.g. -45)
      const depth = parseFloat(inputDepth.value); // initial thickness cm
      const years = parseFloat(inputYears.value); // years drained
      const bd = parseFloat(inputBd.value); // g/cm³

      // Update badge displays
      if (valWtd) valWtd.textContent = `${wtd} cm`;
      if (valDepth) valDepth.textContent = `${depth} cm`;
      if (valYears) valYears.textContent = `${years} Years`;
      if (valBd) valBd.textContent = `${bd.toFixed(2)} g/cm³`;

      // Empirical formulation: Annual subsidence rate S_yr = 0.04 * |WTD| (cm/yr)
      const absWtd = Math.abs(wtd);
      const annualSubsidenceCm = 0.04 * absWtd;
      
      // Total cumulative subsidence capped at total peat depth
      const cumulativeSubsidenceCm = Math.min(depth, annualSubsidenceCm * years);

      // Oxidation fraction: ~70% of total long-term peat subsidence is microbial oxidation (30% physical shrinkage)
      const oxidationFraction = 0.70;
      const oxidationSubsidenceCm = cumulativeSubsidenceCm * oxidationFraction;

      // 1 cm over 1 hectare = 100 m³ volume
      const volumeMineralizedM3 = oxidationSubsidenceCm * 100;

      // Peat mass mineralized (t/ha) = volume (m³) * dry bulk density (t/m³)
      // Note: 1 g/cm³ = 1 t/m³
      const massPeatTonnes = volumeMineralizedM3 * bd;

      // Carbon fraction in organic peat matter ~ 50% (0.50)
      // CO2 / C molecular mass ratio = 44 / 12 = 3.667
      const co2EmissionsTonnes = massPeatTonnes * 0.50 * (44 / 12);

      // Remaining peat thickness & life expectancy
      const remainingDepthCm = Math.max(0, depth - cumulativeSubsidenceCm);
      const remainingYears = (annualSubsidenceCm > 0) ? (remainingDepthCm / annualSubsidenceCm) : 999;

      // Render diagnostic outputs
      if (resSubsidence) resSubsidence.textContent = `-${cumulativeSubsidenceCm.toFixed(1)} cm`;
      if (resVolume) resVolume.textContent = `${Math.round(volumeMineralizedM3).toLocaleString()} m³/ha`;
      if (resCo2) resCo2.textContent = `+${Math.round(co2EmissionsTonnes).toLocaleString()} t CO₂/ha`;
      if (resLifespan) {
        if (remainingDepthCm <= 0) {
          resLifespan.textContent = "0 Years (Depleted / Bedrock)";
          resLifespan.style.color = "#f43f5e";
        } else {
          resLifespan.textContent = `~${Math.round(remainingYears)} Years Left`;
          resLifespan.style.color = "#38bdf8";
        }
      }
    };

    [inputWtd, inputDepth, inputYears, inputBd].forEach(slider => {
      slider.addEventListener("input", () => {
        calculate();
      });
    });

    // Run initial calculation
    calculate();
  }

  // ==========================================================================
  // 4. THERMODYNAMIC REDOX LADDER SIMULATOR
  // ==========================================================================
  initRedoxLadder() {
    const slider = document.getElementById("redox-slider-input");
    const displayEh = document.getElementById("redox-eh-display");
    const displayDg = document.getElementById("redox-dg-display");
    const alertBox = document.getElementById("redox-state-alert");
    const presetBtns = document.querySelectorAll(".redox-preset-btn");

    const rungs = [
      { id: "rung-o2", minEh: 300, maxEh: 9999 },
      { id: "rung-no3", minEh: 100, maxEh: 300 },
      { id: "rung-fe", minEh: -100, maxEh: 100 },
      { id: "rung-so4", minEh: -200, maxEh: -100 },
      { id: "rung-ch4", minEh: -9999, maxEh: -200 }
    ];

    if (!slider || !displayEh) return;

    const updateRedoxState = (eh) => {
      let stateLabel = "";
      let dgLabel = "";
      let alertContent = "";

      if (eh >= 300) {
        stateLabel = `+${eh} mV (Oxic Respiration)`;
        dgLabel = "ΔG°' = -125 kJ / mol e⁻ (High Energy Yield)";
        displayEh.style.color = "#10b981";
        alertContent = `<span style="font-size: 1.25rem; line-height: 1;">✅</span> <div><strong>Aerobic Acrotelm Respiration Zone:</strong> Dissolved oxygen is abundant and acts as the dominant terminal electron acceptor (O₂ → H₂O). Aerobic bacteria and fungi rapidly mineralize structural peat organic matter, releasing continuous heterotrophic CO₂.</div>`;
        if (alertBox) {
          alertBox.style.background = "rgba(16, 185, 129, 0.12)";
          alertBox.style.borderColor = "rgba(16, 185, 129, 0.35)";
          alertBox.style.color = "#6ee7b7";
        }
      } else if (eh >= 100) {
        stateLabel = `+${eh} mV (Suboxic Denitrification)`;
        dgLabel = "ΔG°' = -119 kJ / mol e⁻ (Nitrate Respiration)";
        displayEh.style.color = "#f59e0b";
        alertContent = `<span style="font-size: 1.25rem; line-height: 1;">⚠️</span> <div><strong>Denitrification &amp; N₂O Threshold:</strong> Dissolved O₂ is depleted. Facultative anaerobes reduce nitrate (NO₃⁻ → NO₂⁻ → NO → N₂O → N₂). Water table fluctuations across this horizon trigger high-GWP N₂O greenhouse gas pulses when trace oxygen inhibits nitrous oxide reductase.</div>`;
        if (alertBox) {
          alertBox.style.background = "rgba(245, 158, 11, 0.12)";
          alertBox.style.borderColor = "rgba(245, 158, 11, 0.35)";
          alertBox.style.color = "#fde68a";
        }
      } else if (eh >= -100) {
        stateLabel = `${eh >= 0 ? '+' : ''}${eh} mV (Fe/Mn Reduction)`;
        dgLabel = "ΔG°' = -27 kJ / mol e⁻ (Metal Reduction)";
        displayEh.style.color = "#eab308";
        alertContent = `<span style="font-size: 1.25rem; line-height: 1;">🔶</span> <div><strong>Iron &amp; Manganese Reduction Horizon:</strong> Dissimilatory metal reducers enzymatically reduce ferric iron (Fe³⁺ → Fe²⁺). Generates characteristic soil gleying, redox mottling, and induces porewater phosphate desorption into discharge waterways.</div>`;
        if (alertBox) {
          alertBox.style.background = "rgba(234, 179, 8, 0.12)";
          alertBox.style.borderColor = "rgba(234, 179, 8, 0.35)";
          alertBox.style.color = "#fef08a";
        }
      } else if (eh >= -200) {
        stateLabel = `${eh} mV (Sulfate Reduction)`;
        dgLabel = "ΔG°' = -22 kJ / mol e⁻ (Sulfate Reduction)";
        displayEh.style.color = "#a855f7";
        alertContent = `<span style="font-size: 1.25rem; line-height: 1;">🟣</span> <div><strong>Sulfate Reduction Zone:</strong> Obligate anaerobes reduce sulfate to sulfide (SO₄²⁻ → H₂S). Sulfide precipitates with ferrous iron to form insoluble iron sulfide (FeS / FeS₂), suppressing methane formation until porewater sulfate is exhausted.</div>`;
        if (alertBox) {
          alertBox.style.background = "rgba(168, 85, 247, 0.12)";
          alertBox.style.borderColor = "rgba(168, 85, 247, 0.35)";
          alertBox.style.color = "#e9d5ff";
        }
      } else {
        stateLabel = `${eh} mV (Strict Methanogenesis)`;
        dgLabel = "ΔG°' = -4 kJ / mol e⁻ (Terminal Anoxic Cascade)";
        displayEh.style.color = "#f43f5e";
        alertContent = `<span style="font-size: 1.25rem; line-height: 1;">🔥</span> <div><strong>Strict Anaerobic Catotelm (Methanogenesis):</strong> All alternative electron acceptors are exhausted. Methanogenic Archaea convert CO₂ + 4H₂ → CH₄ and acetate to biogenic methane. Water saturation halts CO₂ peat subsidence but initiates strong methane production.</div>`;
        if (alertBox) {
          alertBox.style.background = "rgba(244, 63, 94, 0.14)";
          alertBox.style.borderColor = "rgba(244, 63, 94, 0.4)";
          alertBox.style.color = "#fda4af";
        }
      }

      displayEh.textContent = stateLabel;
      if (displayDg) displayDg.textContent = dgLabel;
      if (alertBox) {
        alertBox.innerHTML = alertContent;
      }

      // Highlight the active rung in the UI
      rungs.forEach(rung => {
        const el = document.getElementById(rung.id);
        if (el) {
          const isActive = (eh >= rung.minEh && eh < rung.maxEh);
          el.classList.toggle("active", isActive);
        }
      });

      // Update preset buttons active state
      presetBtns.forEach(btn => {
        const targetEh = parseInt(btn.dataset.eh, 10);
        const isMatched = Math.abs(targetEh - eh) < 50;
        btn.classList.toggle("active", isMatched);
      });
    };

    slider.addEventListener("input", (e) => {
      const eh = parseInt(e.target.value, 10);
      updateRedoxState(eh);
    });

    presetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetEh = parseInt(btn.dataset.eh, 10);
        slider.value = targetEh;
        updateRedoxState(targetEh);
        this.app.playUiAudioFeedback("click");
      });
    });

    // Run initial state
    updateRedoxState(parseInt(slider.value, 10));
  }

  // ==========================================================================
  // 5. 3D CARD PARALLAX TILT
  // ==========================================================================
  initCardParallaxTilt() {
    const cards = document.querySelectorAll(".landing-card, .comparison-curtain-card, .peat-calc-card, .redox-ladder-card");
    
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotX = -deltaY * 5;
        const rotY = deltaX * 5;

        card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }
}
