/* ==========================================================================
   SOIL-ATMOSPHERE ECOSYSTEM MODEL & SCOPE INTERACTION CONTROLLER
   With Diurnal/Nocturnal Mode, u* Atmospheric Decoupling,
   Dynamic Flux Readouts — English-Only Version
   ========================================================================== */

export class SoilAtmosphereModel {
  constructor() {
    this.waterTableDepth = -25; // cm (range: +5 to -60)
    this.currentScope = "overview";
    this.isDayMode = true; // true = Daytime, false = Nocturnal
    
    // DOM Elements - Sidebar
    this.slider = document.getElementById("water-table-slider");
    this.depthReadout = document.getElementById("water-depth-display");
    this.co2ValueEl = document.getElementById("live-flux-co2");
    this.ch4ValueEl = document.getElementById("live-flux-ch4");
    this.transientBadgeEl = document.getElementById("ch4-transient-badge");
    this.transientBadgeText = document.getElementById("transient-badge-text");
    this.ecosystemContainer = document.getElementById("soil-ecosystem-container");

    // DOM Elements - Prominent HUD Telemetry Bar
    this.hudSlider = document.getElementById("hud-water-table-slider");
    this.hudDepthReadout = document.getElementById("hud-water-depth-display");
    this.hudCo2ValueEl = document.getElementById("hud-live-flux-co2");
    this.hudCh4ValueEl = document.getElementById("hud-live-flux-ch4");
    this.hudN2oValueEl = document.getElementById("hud-live-flux-n2o");
    this.hudTransientBadgeEl = document.getElementById("hud-ch4-transient-badge");
    this.hudCompactionBadgeEl = document.getElementById("hud-compaction-badge");
    this.presetPills = document.querySelectorAll(".preset-pill[data-wtd]");
    
    // Interactive Transport Physics Cloud Button & Popover
    this.transportDropdownWrap = document.getElementById("transport-physics-dropdown-wrap");
    this.btnTransportCloudToggle = document.getElementById("btn-transport-cloud-toggle");
    this.chkPhysTurb = document.getElementById("chk-phys-turb");
    this.chkPhysConv = document.getElementById("chk-phys-conv");
    this.chkPhysAdv = document.getElementById("chk-phys-adv");
    this.svgTurb = document.getElementById("svg-turbulent-eddies");
    this.svgConv = document.getElementById("svg-convection-plumes");
    this.svgAdv = document.getElementById("svg-advection-vectors");
    
    // Satellite Telemetry Modal & Sky Trigger
    this.satModal = document.getElementById("modal-satellite-telemetry");
    this.svgSatellite = document.getElementById("svg-satellite-group");

    // Diurnal elements
    this.dayBtn = document.getElementById("mode-day-btn");
    this.nightBtn = document.getElementById("mode-night-btn");
    this.diurnalModeBadge = document.getElementById("diurnal-badge");
    this.diurnalGppVal = document.getElementById("diurnal-gpp-val");
    this.diurnalRnVal = document.getElementById("diurnal-rn-val");
    this.diurnalUstarVal = document.getElementById("diurnal-ustar-val");
    this.diurnalCouplingVal = document.getElementById("diurnal-coupling-val");

    // SVG Elements
    this.svgSkyRect = document.getElementById("svg-sky-gradient-rect");
    this.svgSunGroup = document.getElementById("svg-sun-group");
    this.svgMoonGroup = document.getElementById("svg-moon-group");
    this.svgStarsGroup = document.getElementById("svg-stars-group");
    this.svgWaterRect = document.getElementById("svg-water-saturated-rect");
    this.svgWaterLine = document.getElementById("svg-water-table-line");
    this.svgPerchedWater = document.getElementById("svg-perched-water");
    this.svgPerchedWaterLabel = document.getElementById("svg-perched-water-label");
    
    // Dynamic Gas Vector Groups & Labels
    this.svgCo2Uptake = document.getElementById("co2-uptake-arrows");
    this.svgCo2Reco = document.getElementById("co2-reco-arrows");
    this.svgRecoText = document.getElementById("svg-text-reco-tag");
    this.svgSunAura = document.getElementById("svg-sun-aura");
    this.svgSunMid = document.getElementById("svg-sun-mid");
    this.svgSunCore = document.getElementById("svg-sun-core");
    this.svgSunbeam1 = document.getElementById("svg-sunbeam-1");
    this.svgSunbeam2 = document.getElementById("svg-sunbeam-2");
    this.svgSunText = document.getElementById("svg-sun-text");

    this.initViewBoxScaler();
    this.initListeners();
    this.setScope(this.currentScope);
    this.setDayNightMode(true);
    this.updateWaterPhysics();
  }

  initListeners() {
    // 1. Transport Physics Popover Dropdown Toggle (Cloud button beside -45 cm)
    if (this.btnTransportCloudToggle && this.transportDropdownWrap) {
      this.btnTransportCloudToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        this.transportDropdownWrap.classList.toggle("open");
      });
      document.addEventListener("click", (e) => {
        if (this.transportDropdownWrap && !this.transportDropdownWrap.contains(e.target)) {
          this.transportDropdownWrap.classList.remove("open");
        }
      });
    }

    // 2. Individual Transport Physics Checkboxes (Hidden by default unless checked)
    const updatePhysicsVisibility = () => {
      if (this.svgTurb && this.chkPhysTurb) {
        this.svgTurb.style.display = this.chkPhysTurb.checked ? "inline" : "none";
      }
      if (this.svgConv && this.chkPhysConv) {
        this.svgConv.style.display = this.chkPhysConv.checked ? "inline" : "none";
      }
      if (this.svgAdv && this.chkPhysAdv) {
        this.svgAdv.style.display = this.chkPhysAdv.checked ? "inline" : "none";
      }
      if (this.btnTransportCloudToggle) {
        const anyActive = (this.chkPhysTurb && this.chkPhysTurb.checked) ||
                          (this.chkPhysConv && this.chkPhysConv.checked) ||
                          (this.chkPhysAdv && this.chkPhysAdv.checked);
        this.btnTransportCloudToggle.classList.toggle("active", anyActive);
      }
    };

    if (this.chkPhysTurb) {
      this.chkPhysTurb.checked = false;
      this.chkPhysTurb.addEventListener("change", updatePhysicsVisibility);
    }
    if (this.chkPhysConv) {
      this.chkPhysConv.checked = false;
      this.chkPhysConv.addEventListener("change", updatePhysicsVisibility);
    }
    if (this.chkPhysAdv) {
      this.chkPhysAdv.checked = false;
      this.chkPhysAdv.addEventListener("change", updatePhysicsVisibility);
    }
    updatePhysicsVisibility();

    // 3. Plant Twin (Carex rostrata) Botanical Specimen & Anatomical Plate Modal Trigger
    const openCarexBotanicalPlate = () => {
      const plantSrc = "assets/sprites/wetland_carex_plate.jpg";
      const plantTitle = "Carex rostrata Stokes (Bottle Sedge) — Botanical & Anatomical Plate";
      const plantCaption = "High-resolution botanical illustration and internal tissue anatomy of Carex rostrata Stokes. Highlighting continuous longitudinal aerenchyma gas lacunae in culm and adventitious root cross-sections, acting as a direct atmospheric chimney venting catotelm biogenic CH₄ to the planetary boundary layer. Note horizontal creeping rhizome network and adventitious root deflection at the compacted plow pan boundary (σp = 62.4 kPa). (Official Botanical Specimen Plate, Klimafarm Peatland Observatory, Santander et al., 2026)";
      if (typeof window.openUniversalLightbox === "function") {
        window.openUniversalLightbox(plantSrc, plantTitle, plantCaption, "Botanical & Aerenchyma Specimen • Carex rostrata");
      } else if (window.presentationApp && window.presentationApp.openUniversalLightbox) {
        window.presentationApp.openUniversalLightbox(plantSrc, plantTitle, plantCaption, "Botanical & Aerenchyma Specimen • Carex rostrata");
      } else {
        window.open(plantSrc, "_blank");
      }
    };
    window.openCarexBotanicalPlate = openCarexBotanicalPlate;

    document.querySelectorAll(".carex-botanical-twin, .wetland-plant-clickable, .plant-hit-box, #plant-cluster-prominent, #plant-cluster-left, #plant-cluster-center").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        openCarexBotanicalPlate();
      });
    });

    // 4. Satellite Telemetry Modal Trigger (Satellite in Sky at Sun Height)
    const openSatelliteModal = () => {
      if (this.satModal) {
        this.satModal.classList.add("active");
        this.satModal.setAttribute("aria-hidden", "false");
      }
    };

    // Expose globally so inline onclick or other modules can invoke it cleanly
    window.openSatelliteTelemetryModal = openSatelliteModal;
    if (window.presentationApp) {
      window.presentationApp.openSatelliteModal = openSatelliteModal;
    }

    if (this.svgSatellite) {
      this.svgSatellite.addEventListener("click", (e) => {
        e.stopPropagation();
        openSatelliteModal();
      });
    }

    if (this.satModal) {
      const satImg = document.getElementById("sat-modal-img");
      const satTitle = document.getElementById("sat-modal-title");
      const satCaption = document.getElementById("sat-modal-caption");
      const satCloseBtn = document.getElementById("sat-modal-close");
      const satJumpGisBtn = document.getElementById("sat-btn-jump-gis");
      const satTabs = this.satModal.querySelectorAll(".sat-layer-tab");

      if (satCloseBtn) {
        satCloseBtn.addEventListener("click", () => {
          this.satModal.classList.remove("active");
          this.satModal.setAttribute("aria-hidden", "true");
        });
      }

      this.satModal.addEventListener("click", (e) => {
        if (e.target === this.satModal) {
          this.satModal.classList.remove("active");
          this.satModal.setAttribute("aria-hidden", "true");
        }
      });

      satTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          satTabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          if (satImg) satImg.src = tab.dataset.img;
          if (satTitle) satTitle.textContent = tab.dataset.title;
          if (satCaption) satCaption.textContent = tab.dataset.caption;
        });
      });

      if (satJumpGisBtn) {
        satJumpGisBtn.addEventListener("click", () => {
          this.satModal.classList.remove("active");
          this.satModal.setAttribute("aria-hidden", "true");
          const appInstance = window.presentationApp || window.app;
          if (appInstance && appInstance.switchView) {
            appInstance.switchView("macro");
          }
        });
      }
    }

    // Sidebar slider event
    if (this.slider) {
      this.slider.addEventListener("input", (e) => {
        this.waterTableDepth = parseInt(e.target.value, 10);
        if (this.hudSlider) this.hudSlider.value = this.waterTableDepth;
        this.updateWaterPhysics();
      });
    }

    // Prominent HUD slider event
    if (this.hudSlider) {
      this.hudSlider.addEventListener("input", (e) => {
        this.waterTableDepth = parseInt(e.target.value, 10);
        if (this.slider) this.slider.value = this.waterTableDepth;
        this.updateWaterPhysics();
      });
    }

    // Preset pills click events (guarded by data-wtd)
    if (this.presetPills && this.presetPills.length > 0) {
      this.presetPills.forEach(pill => {
        pill.addEventListener("click", () => {
          if (!pill.dataset.wtd) return;
          const targetWtd = parseInt(pill.dataset.wtd, 10);
          if (isNaN(targetWtd)) return;
          this.waterTableDepth = targetWtd;
          if (this.slider) this.slider.value = targetWtd;
          if (this.hudSlider) this.hudSlider.value = targetWtd;
          this.updateWaterPhysics();
        });
      });
    }

    // Scope button events
    const scopeBtns = document.querySelectorAll(".scope-btn");
    scopeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        scopeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.setScope(btn.dataset.scope);
      });
    });

    // Day / Night Toggle buttons
    if (this.dayBtn) {
      this.dayBtn.addEventListener("click", () => this.setDayNightMode(true));
    }
    if (this.nightBtn) {
      this.nightBtn.addEventListener("click", () => this.setDayNightMode(false));
    }
  }

  setDayNightMode(isDay) {
    this.isDayMode = isDay;

    if (this.ecosystemContainer) {
      this.ecosystemContainer.classList.toggle("day-mode", isDay);
      this.ecosystemContainer.classList.toggle("night-mode", !isDay);
    }

    if (this.dayBtn && this.nightBtn) {
      this.dayBtn.classList.toggle("active", isDay);
      this.nightBtn.classList.toggle("active", !isDay);
    }

    // SVG Sky and Celestial Bodies
    if (this.svgSunGroup) {
      this.svgSunGroup.style.display = isDay ? "inline" : "none";
    }
    if (this.svgMoonGroup) {
      this.svgMoonGroup.style.display = isDay ? "none" : "inline";
    }
    if (this.svgStarsGroup) {
      this.svgStarsGroup.style.display = isDay ? "none" : "inline";
    }

    // Downward Photosynthesis Assimilation GPP (Active during daytime, zero at night)
    if (this.svgCo2Uptake) {
      this.svgCo2Uptake.style.display = isDay ? "inline" : "none";
    }
    const svgGppTag = document.getElementById("svg-text-gpp-tag");
    if (svgGppTag) {
      svgGppTag.style.display = isDay ? "inline" : "none";
    }

    // Sky gradient fill switch
    if (this.svgSkyRect) {
      this.svgSkyRect.setAttribute("fill", isDay ? "url(#skyDayGrad)" : "url(#skyNightGrad)");
    }

    this.updateDiurnalReadouts();
    this.updateWaterPhysics();
  }

  updateDiurnalReadouts() {
    if (this.diurnalModeBadge) {
      this.diurnalModeBadge.className = `diurnal-mode-badge ${this.isDayMode ? "day" : "night"}`;
      this.diurnalModeBadge.textContent = this.isDayMode 
        ? "☀️ Daytime (Active Radiation)" 
        : "🌙 Nocturnal (Thermal Inversion)";
    }

    if (this.isDayMode) {
      if (this.diurnalGppVal) this.diurnalGppVal.textContent = "-14.2 g C m⁻² d⁻¹";
      if (this.diurnalRnVal) this.diurnalRnVal.textContent = "+480 W m⁻²";
      if (this.diurnalUstarVal) this.diurnalUstarVal.textContent = "0.38 m/s (Turbulent)";
      if (this.diurnalCouplingVal) {
        this.diurnalCouplingVal.textContent = "Well Coupled (QC 0)";
        this.diurnalCouplingVal.style.color = "#10b981";
      }
    } else {
      if (this.diurnalGppVal) this.diurnalGppVal.textContent = "0.0 g C m⁻² d⁻¹ (GPP=0)";
      if (this.diurnalRnVal) this.diurnalRnVal.textContent = "-38 W m⁻² (Cooling)";
      if (this.diurnalUstarVal) this.diurnalUstarVal.textContent = "0.07 m/s (< 0.12 u*)";
      if (this.diurnalCouplingVal) {
        this.diurnalCouplingVal.textContent = "Decoupled (Gap-fill)";
        this.diurnalCouplingVal.style.color = "#f43f5e";
      }
    }
  }

  setScope(scopeKey) {
    this.currentScope = scopeKey;

    // Hide all overlays first
    document.querySelectorAll(".overlay-layer").forEach(ov => {
      ov.classList.remove("visible");
    });

    // Show selected overlay if exists
    const targetOverlay = document.getElementById(`overlay-${scopeKey}`);
    if (targetOverlay) {
      targetOverlay.classList.add("visible");
    }

    // Update active state in sidebar buttons
    document.querySelectorAll(".scope-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.scope === scopeKey);
    });

    // If Soil Physics scope selected, activate compaction / perched water visualization
    if (scopeKey === "soil_physics") {
      if (this.svgPerchedWater) this.svgPerchedWater.style.opacity = "0.85";
      if (this.svgPerchedWaterLabel) this.svgPerchedWaterLabel.style.opacity = "1";
      if (this.hudCompactionBadgeEl) this.hudCompactionBadgeEl.style.display = "inline-flex";
    } else if (this.waterTableDepth <= -15) {
      if (this.svgPerchedWater) this.svgPerchedWater.style.opacity = "0";
      if (this.svgPerchedWaterLabel) this.svgPerchedWaterLabel.style.opacity = "0";
      if (this.hudCompactionBadgeEl) this.hudCompactionBadgeEl.style.display = "none";
    }
  }

  updateWaterPhysics() {
    if (isNaN(this.waterTableDepth) || this.waterTableDepth === null || this.waterTableDepth === undefined) {
      this.waterTableDepth = -25;
    }
    // 1. Sync both sliders if needed
    if (this.slider && parseInt(this.slider.value, 10) !== this.waterTableDepth) {
      this.slider.value = this.waterTableDepth;
    }
    if (this.hudSlider && parseInt(this.hudSlider.value, 10) !== this.waterTableDepth) {
      this.hudSlider.value = this.waterTableDepth;
    }

    // Update preset pills active state
    if (this.presetPills) {
      this.presetPills.forEach(pill => {
        const pWtd = parseInt(pill.dataset.wtd, 10);
        pill.classList.toggle("active", pWtd === this.waterTableDepth);
      });
    }

    // 2. Text readout update (Sidebar & Prominent HUD)
    let depthText = "";
    let hudText = "";
    let depthColor = "#38bdf8";

    if (this.waterTableDepth > 0) {
      depthText = `+${this.waterTableDepth} cm (Ponded Water)`;
      hudText = `+${this.waterTableDepth} cm`;
      depthColor = "#38bdf8";
    } else if (this.waterTableDepth === 0) {
      depthText = "0 cm (Ground Surface)";
      hudText = "0 cm";
      depthColor = "#34d399";
    } else {
      depthText = `${this.waterTableDepth} cm (Subsurface Water Table)`;
      hudText = `${this.waterTableDepth} cm`;
      depthColor = this.waterTableDepth > -15 ? "#38bdf8" : (this.waterTableDepth > -35 ? "#f59e0b" : "#f43f5e");
    }

    if (this.depthReadout) {
      this.depthReadout.textContent = depthText;
      this.depthReadout.style.color = depthColor;
    }
    if (this.hudDepthReadout) {
      this.hudDepthReadout.textContent = hudText;
      this.hudDepthReadout.style.color = depthColor;
    }

    // 3. SVG Geometry update
    // Ground surface Y is 240 in SVG coordinate system.
    // -60 cm maps to Y = 500. 0 cm maps to Y = 240. +5 cm maps to Y = 225.
    const depthRatio = (this.waterTableDepth + 60) / 65; // 0 (at -60) to 1 (at +5)
    const svgY = Math.round(500 - depthRatio * 275);
    const height = 650 - svgY;

    if (this.svgWaterLine) {
      this.svgWaterLine.setAttribute("y1", svgY);
      this.svgWaterLine.setAttribute("y2", svgY);
    }

    if (this.svgWaterRect) {
      this.svgWaterRect.setAttribute("y", svgY);
      this.svgWaterRect.setAttribute("height", height);
    }

    // Perched water table dynamics (Compacted plow pan impedes drainage when wet)
    const isPerched = this.currentScope === "soil_physics" || this.waterTableDepth >= -15;
    if (this.svgPerchedWater) {
      this.svgPerchedWater.style.opacity = isPerched ? "0.85" : "0";
    }
    if (this.svgPerchedWaterLabel) {
      this.svgPerchedWaterLabel.style.opacity = isPerched ? "1" : "0";
    }
    if (this.hudCompactionBadgeEl) {
      this.hudCompactionBadgeEl.style.display = isPerched ? "inline-flex" : "none";
    }

    // 4. Biogeochemical Flux Dynamics (Inversely Proportional based on WTD)
    const wtd = this.waterTableDepth; // range +5 to -60 cm
    
    // Calculate CO2:
    const aerationFactor = Math.max(0, (-wtd + 5) / 65); // 0 (flooded) to 1 (drained)
    const baseReco = 0.8 + aerationFactor * 10.5; // 0.8 to 11.3 µmol m⁻² s⁻¹
    const gppUptake = 6.8; // daytime canopy gross primary productivity

    // --- Dynamic Soil Respiration Reco Arrow Modulation ---
    // Respiration surges when peat aerates; slows/inhibits when flooded and anoxic
    if (this.svgCo2Reco) {
      const recoLines = this.svgCo2Reco.querySelectorAll("line");
      if (wtd >= -10) {
        // Waterlogged / anoxic: respiration severely inhibited by lack of oxygen diffusion
        recoLines.forEach(line => {
          line.setAttribute("stroke", "#64748b");
          line.setAttribute("stroke-width", "1.4");
          line.setAttribute("marker-end", "url(#arrowCo2Grey)");
          line.style.opacity = "0.30";
          line.style.animationDuration = "3.8s";
        });
        if (this.svgRecoText) {
          this.svgRecoText.setAttribute("fill", "#64748b");
          this.svgRecoText.textContent = `↑ CO₂ Reco: +${baseReco.toFixed(1)} µmol m⁻² s⁻¹ (Anoxic Peat Inhibition)`;
        }
      } else if (wtd <= -35) {
        // Drought drawdown: aerobic microbial respiration explodes (peat mineralization surge)
        recoLines.forEach(line => {
          line.setAttribute("stroke", "#f59e0b");
          line.setAttribute("stroke-width", "4.2");
          line.setAttribute("marker-end", "url(#arrowCo2Amber)");
          line.style.opacity = "0.95";
          line.style.animationDuration = "0.85s";
        });
        if (this.svgRecoText) {
          this.svgRecoText.setAttribute("fill", "#f59e0b");
          this.svgRecoText.textContent = `↑ CO₂ Reco: +${baseReco.toFixed(1)} µmol m⁻² s⁻¹ (Aerobic Peat Mineralization Surge)`;
        }
      } else {
        // Intermediate capillary / transitional zone
        const t = (wtd - (-35)) / 25; // 0 at -35, 1 at -10
        const strokeW = (4.2 - t * (4.2 - 2.0)).toFixed(1);
        const animDur = (0.85 + t * (2.8 - 0.85)).toFixed(2);
        recoLines.forEach(line => {
          line.setAttribute("stroke", "#94a3b8");
          line.setAttribute("stroke-width", strokeW);
          line.setAttribute("marker-end", "url(#arrowCo2Grey)");
          line.style.opacity = "0.75";
          line.style.animationDuration = `${animDur}s`;
        });
        if (this.svgRecoText) {
          this.svgRecoText.setAttribute("fill", "#94a3b8");
          this.svgRecoText.textContent = `↑ CO₂ Peat Respiration: +${baseReco.toFixed(1)} µmol m⁻² s⁻¹`;
        }
      }
    }

    let netCo2Val = 0;
    if (this.isDayMode) {
      // Day: NEE = Reco - GPP
      netCo2Val = parseFloat((baseReco - gppUptake).toFixed(1));
      const sign = netCo2Val > 0 ? "+" : "";
      const label = netCo2Val < 0 ? "Sink / Uptake" : "Source / Efflux";
      const color = netCo2Val < 0 ? "#10b981" : "#f43f5e";

      if (this.co2ValueEl) {
        this.co2ValueEl.textContent = `${sign}${netCo2Val} µmol m⁻² s⁻¹ (${label})`;
        this.co2ValueEl.style.color = color;
      }
      if (this.hudCo2ValueEl) {
        this.hudCo2ValueEl.textContent = `${sign}${netCo2Val} µmol m⁻² s⁻¹`;
        this.hudCo2ValueEl.style.color = color;
      }
    } else {
      // Night: GPP = 0, pure soil respiration (positive efflux)
      netCo2Val = parseFloat((baseReco * 0.85).toFixed(1));
      if (this.co2ValueEl) {
        this.co2ValueEl.textContent = `+${netCo2Val} µmol m⁻² s⁻¹ (Dark Reco)`;
        this.co2ValueEl.style.color = "#f43f5e";
      }
      if (this.hudCo2ValueEl) {
        this.hudCo2ValueEl.textContent = `+${netCo2Val} µmol m⁻² s⁻¹`;
        this.hudCo2ValueEl.style.color = "#f43f5e";
      }
    }

    // Calculate CH4:
    // Strictly 0 when water table is low (<= -35 cm) due to methanogenesis cessation & oxic CH4 oxidation
    // Explodes into a transient peak when water table is high (>= -10 cm)
    let ch4Flux = 0;
    if (wtd <= -35) {
      ch4Flux = 0;
    } else if (wtd < -10) {
      const ratio = (wtd - (-35)) / 25;
      ch4Flux = Math.round(ratio * 70);
    } else {
      const highRatio = (wtd - (-10)) / 15;
      ch4Flux = Math.round(110 + highRatio * 110);
    }

    // Nighttime accumulation under calm boundary layer
    if (!this.isDayMode && ch4Flux > 0) {
      ch4Flux = Math.round(ch4Flux * 1.15);
    }

    const ch4Color = ch4Flux === 0 ? "#94a3b8" : (ch4Flux >= 100 ? "#ef4444" : "#f59e0b");
    const ch4Text = `${ch4Flux > 0 ? "+" : ""}${ch4Flux} nmol m⁻² s⁻¹`;

    if (this.ch4ValueEl) {
      this.ch4ValueEl.textContent = ch4Text;
      this.ch4ValueEl.style.color = ch4Color;
    }
    if (this.hudCh4ValueEl) {
      this.hudCh4ValueEl.textContent = ch4Text;
      this.hudCh4ValueEl.style.color = ch4Color;
    }

    // Calculate N2O (Peaks at fluctuating capillary boundary -10 to -25 cm)
    let n2oFlux = 0.01;
    if (wtd >= -30 && wtd <= -10) {
      const redoxFactor = 1 - Math.abs(wtd - (-20)) / 10;
      n2oFlux = parseFloat((0.02 + redoxFactor * 0.05).toFixed(2));
    } else if (wtd > -10) {
      n2oFlux = 0.02; // Complete denitrification to N2 in saturated anoxia
    }
    if (this.hudN2oValueEl) {
      this.hudN2oValueEl.textContent = `+${n2oFlux} nmol m⁻² s⁻¹`;
    }

    // 5. Hypothesis 1: Dynamic "Post-Flooding Transient Peak" Indicator
    const isTransient = wtd >= -10;
    if (this.transientBadgeEl) {
      this.transientBadgeEl.style.display = isTransient ? "flex" : "none";
      if (isTransient && this.transientBadgeText) {
        this.transientBadgeText.textContent = "Status: Post-Flooding Transient Peak (Hypothesis 1)";
      }
    }
    if (this.hudTransientBadgeEl) {
      this.hudTransientBadgeEl.style.display = isTransient ? "inline-flex" : "none";
    }
  }

  initViewBoxScaler() {
    const svg = document.getElementById("ecosystem-svg");
    const wrapper = document.querySelector(".svg-stage-wrapper");
    if (!svg || !wrapper) return;

    const adjust = () => {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      if (w > 0 && h > 0) {
        const vbHeight = 650;
        // Keep proportional width so elements never distort or collapse
        const vbWidth = Math.max(1280, Math.round(vbHeight * (w / h)));
        svg.setAttribute("viewBox", `0 0 ${vbWidth} ${vbHeight}`);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        const fullWidthEls = svg.querySelectorAll(".svg-full-width");
        fullWidthEls.forEach(el => {
          if (el.tagName === "rect") {
            el.setAttribute("width", vbWidth);
          } else if (el.tagName === "line") {
            el.setAttribute("x2", vbWidth);
          }
        });
      }
    };

    window.addEventListener("resize", adjust);
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(adjust);
      ro.observe(wrapper);
    }
    requestAnimationFrame(adjust);
  }
}
