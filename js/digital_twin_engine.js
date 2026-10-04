/* ==========================================================================
   DIGITAL TWIN SIMULATION ENGINE — WETLAND ECOHYDROLOGY & GHG DYNAMICS
   Orchestrates 24-Hour Diurnal Cycle and 365-Day Annual Evolution
   Mechanisms:
   1. Midday Stomatal Closure (VPD > 1.2 kPa Stress)
   2. Nocturnal Thermal Inversion (u* < 0.12 m/s EC Flux Decoupling)
   3. Aerenchyma Plant-Mediated Bypass (Direct Catotelm CH4 Shunt)
   4. Seasonal Water Table Drawdown & Massive Peat Respiration (Reco)
   5. Rewetting Anoxia & Post-Flooding Methane Spike (Hypothesis 1)
   6. Independent Gas Isolation Filters (CO2, CH4, N2O)
   7. Full Pausable / Resumable Animation Engine with Timeline Navigation
   8. Interactive Time Progression HUD (Paso de la Hora / Paso de los Días)
   ========================================================================== */

export class DigitalTwinSimulationEngine {
  constructor(soilModel) {
    this.soilModel = soilModel;
    
    // Animation frame / loop handles & Pause State Machine
    this.currentMode = "idle"; // "idle" | "diurnal" | "annual"
    this.isPaused = false;
    this.animFrameId = null;
    this.startTime = 0;
    this.currentProgress = 0.0; // 0.0 to 1.0
    this.pausedProgress = 0.0;  // Saved progress when paused
    
    // Durations (in milliseconds)
    this.diurnalDuration = 18000; // 18 seconds for 24 hours
    this.annualDuration = 24000;  // 24 seconds for 365 days
    
    // Month labels (Spanish Academic)
    this.months = [
      "Enero (Dormancia)", "Febrero (Fin Invierno)", "Marzo (Deshielo/Rebrote)",
      "Abril (Fase Vegetativa)", "Mayo (Canopia Activa)", "Junio (Pico Fotosintético)",
      "Julio (Estiaje/Estrés VPD)", "Agosto (Oxidación de Turba)", "Septiembre (Senescencia)",
      "Octubre (Reinundación/Pico N₂O)", "Noviembre (Inundación/Pulso CH₄ H1)", "Diciembre (Inundación Invernal)"
    ];

    // DOM Elements - HUD Buttons & Readouts
    this.btnAnimDiurnal = document.getElementById("btn-anim-diurnal") || document.getElementById("btn-play-diurnal");
    this.btnAnimAnnual = document.getElementById("btn-anim-annual") || document.getElementById("btn-play-annual");
    this.btnResetSim = document.getElementById("btn-reset-sim");

    this.stripTimeReadout = document.getElementById("strip-time-readout");
    this.stripCalendarReadout = document.getElementById("strip-calendar-readout");
    this.stripTimeIcon = document.getElementById("strip-time-icon");

    this.hudTimeReadout = document.getElementById("hud-time-readout");
    this.hudCalendarReadout = document.getElementById("hud-calendar-readout");
    this.hudTimeIcon = document.getElementById("hud-time-icon");
    this.phenomenonText = document.getElementById("hud-phenomenon-text");
    this.phenomDot = document.getElementById("hud-phenom-dot");

    // Telemetry Badges
    this.hudLiveCo2 = document.getElementById("hud-live-flux-co2");
    this.hudLiveCh4 = document.getElementById("hud-live-flux-ch4");
    this.hudLiveN2o = document.getElementById("hud-live-flux-n2o");
    this.hudWtdDisplay = document.getElementById("hud-water-depth-display");
    this.hudWtdSlider = document.getElementById("hud-water-table-slider");
    this.hudCh4TransientBadge = document.getElementById("hud-ch4-transient-badge");
    this.hudCompactionBadge = document.getElementById("hud-compaction-badge");

    // Interactive Time Progression Overlay Elements
    this.timeOverlay = document.getElementById("twin-time-progress-overlay");
    this.overlayModeBadge = document.getElementById("twin-overlay-mode-badge");
    this.overlayMainClock = document.getElementById("twin-overlay-main-clock");
    this.overlayPauseStatus = document.getElementById("twin-overlay-pause-status");
    this.overlayBtnPause = document.getElementById("twin-overlay-btn-pause");
    this.overlayBtnPauseIcon = document.getElementById("twin-overlay-btn-pause-icon");
    this.overlayBtnPauseLabel = document.getElementById("twin-overlay-btn-pause-label");
    this.overlayBtnClose = document.getElementById("twin-overlay-btn-close");
    this.overlayPhenom = document.getElementById("twin-overlay-phenomenon");
    this.scrubberLabels = document.getElementById("twin-scrubber-labels");
    this.scrubberTrack = document.getElementById("twin-scrubber-track");
    this.scrubberFill = document.getElementById("twin-scrubber-fill");
    this.scrubberThumb = document.getElementById("twin-scrubber-thumb");
    this.scrubberSubLeft = document.getElementById("twin-scrubber-sub-left");
    this.scrubberSubRight = document.getElementById("twin-scrubber-sub-right");

    // In-Canvas Flash Feedback
    this.canvasPauseFlash = document.getElementById("twin-canvas-pause-flash");
    this.pauseFlashIcon = document.getElementById("twin-pause-flash-icon");
    this.pauseFlashText = document.getElementById("twin-pause-flash-text");
    this.flashTimeout = null;

    // Canvas Container
    this.svgCanvas = document.getElementById("ecosystem-svg");
    this.stageWrapper = document.querySelector(".svg-stage-wrapper");

    // DOM Elements - Gas Filters
    this.filterCo2 = document.getElementById("filter-gas-co2");
    this.filterCh4 = document.getElementById("filter-gas-ch4");
    this.filterN2o = document.getElementById("filter-gas-n2o");
    
    // SVG Elements - Gas Groups & Inversion
    this.gasGroupCo2 = document.getElementById("svg-gas-co2");
    this.gasGroupCh4 = document.getElementById("svg-gas-ch4");
    this.gasGroupN2o = document.getElementById("svg-gas-n2o");
    this.stableInversionLayer = document.getElementById("svg-stable-inversion-layer");
    this.aerenchymaPlants = document.getElementById("svg-aerenchyma-plants");
    
    // SVG In-Canvas Alert Badges
    this.alertStomatal = document.getElementById("svg-stomatal-alert");
    this.alertUstar = document.getElementById("svg-ustar-alert");
    this.alertCh4Spike = document.getElementById("svg-ch4-spike-alert");

    // Gas Stream Lines
    this.co2UptakeStream = document.getElementById("co2-uptake-arrows");
    this.co2RecoStream = document.getElementById("co2-reco-arrows");
    this.ch4BypassArrows = document.querySelectorAll(".ch4-bypass");
    this.n2oPulses = document.querySelectorAll(".n2o-pulse");

    this.initControls();
    this.initManualControls();
    this.initTimeOverlay();
    this.initCanvasClickInteraction();
    setTimeout(() => this.applyManualState(), 400);
    setTimeout(() => { this.initAtmosphericToggles(); this.syncStripReadouts(); }, 500);
  }

  syncStripReadouts() {
    // Keep header strip synchronized with current state
    if (this.currentMode === "idle") {
      if (this.stripTimeReadout) this.stripTimeReadout.textContent = "12:00";
      if (this.stripCalendarReadout) this.stripCalendarReadout.textContent = "Verano (Jul)";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "☀️";
    }
  }

  // --- ATMOSPHERIC & GAS TOGGLE CONTROLS ---
  initAtmosphericToggles() {
    const makePillToggle = (btnId, onCallback, offCallback) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.setAttribute('data-on', 'true');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOn = btn.getAttribute('data-on') === 'true';
        const nowOn = !isOn;
        btn.setAttribute('data-on', nowOn ? 'true' : 'false');
        btn.style.opacity = nowOn ? '1' : '0.38';
        btn.style.textDecoration = nowOn ? 'none' : 'line-through';
        if (nowOn) onCallback();
        else offCallback();
      });
    };

    // 1. ADVECTION
    makePillToggle('btn-toggle-advection',
      () => {
        const el = document.getElementById('svg-text-eddy-label');
        if (el) el.style.display = '';
        document.querySelectorAll('.wind-arrow,.advection-flow').forEach(e => e.style.display = '');
      },
      () => {
        const el = document.getElementById('svg-text-eddy-label');
        if (el) el.style.display = 'none';
        document.querySelectorAll('.wind-arrow,.advection-flow').forEach(e => e.style.display = 'none');
      }
    );

    // 2. CONVECTION
    makePillToggle('btn-toggle-convection',
      () => {
        const el = document.getElementById('svg-convection-plumes');
        if (el) { el.style.display = ''; el.style.opacity = this._convOpacity || '0.85'; }
      },
      () => {
        const el = document.getElementById('svg-convection-plumes');
        if (el) el.style.display = 'none';
      }
    );

    // 3. TURBULENCE
    makePillToggle('btn-toggle-turbulence',
      () => {
        const el = document.getElementById('svg-turbulent-eddies');
        if (el) { el.style.display = ''; el.style.opacity = '0.8'; }
        document.querySelectorAll('.eddy-ring,.turbulent-eddy').forEach(e => e.style.display = '');
      },
      () => {
        const el = document.getElementById('svg-turbulent-eddies');
        if (el) el.style.display = 'none';
        document.querySelectorAll('.eddy-ring,.turbulent-eddy').forEach(e => e.style.display = 'none');
      }
    );

    // 4. INVERSION
    makePillToggle('btn-toggle-inversion',
      () => { this._inversionSuppressed = false; },
      () => {
        const el = document.getElementById('svg-stable-inversion-layer');
        if (el) el.style.opacity = '0';
        this._inversionSuppressed = true;
      }
    );

    // 5. GAS LAYER PILLS (CO2, CH4, N2O, CO2e)
    const gasMap = {
      'gas-pill-co2':  { svgId: 'svg-gas-co2',  classes: ['co2-down','co2-up','co2-uptake','animated-flux-arrow-co2'] },
      'gas-pill-ch4':  { svgId: 'svg-gas-ch4',  classes: ['ch4-bypass','ch4-arrow'] },
      'gas-pill-n2o':  { svgId: 'svg-gas-n2o',  classes: ['n2o-pulse','n2o-arrow'] },
      'gas-pill-co2e': { svgId: 'svg-gas-co2e', classes: [] }
    };

    Object.entries(gasMap).forEach(([btnId, cfg]) => {
      makePillToggle(btnId,
        () => {
          const g = document.getElementById(cfg.svgId);
          if (g) g.style.display = '';
          cfg.classes.forEach(cls => document.querySelectorAll('.' + cls).forEach(e => e.style.display = ''));
        },
        () => {
          const g = document.getElementById(cfg.svgId);
          if (g) g.style.display = 'none';
          cfg.classes.forEach(cls => document.querySelectorAll('.' + cls).forEach(e => e.style.display = 'none'));
        }
      );
    });
  }

  // --- MANUAL OVERRIDES FOR SEASONS & DAY/NIGHT ---
  initManualControls() {
    this.currentManualSeason = 'summer';
    this.isManualDay = true;

    // Day / Night Toggle Button
    const btnSolLuna = document.getElementById('btn-toggle-sol-luna');
    if (btnSolLuna) {
      btnSolLuna.addEventListener('click', () => {
        if (this.currentMode !== "idle") this.stopSimulation(true);
        this.isManualDay = !this.isManualDay;
        this.updateSolLunaButton();
        this.applyManualState();
      });
    }

    // Season Buttons
    const btnVerano = document.getElementById('btn-season-summer');
    const btnInvierno = document.getElementById('btn-season-winter');

    if (btnVerano) {
      btnVerano.addEventListener('click', () => {
        if (this.currentMode !== "idle") this.stopSimulation(true);
        this.currentManualSeason = 'summer';
        btnVerano.classList.add('active');
        if (btnInvierno) btnInvierno.classList.remove('active');
        if (this.soilModel) {
          this.soilModel.waterTableDepth = -25;
          this.soilModel.updateWaterPhysics();
        }
        this.applyManualState();
      });
    }

    if (btnInvierno) {
      btnInvierno.addEventListener('click', () => {
        if (this.currentMode !== "idle") this.stopSimulation(true);
        this.currentManualSeason = 'winter';
        btnInvierno.classList.add('active');
        if (btnVerano) btnVerano.classList.remove('active');
        if (this.soilModel) {
          this.soilModel.waterTableDepth = 2; // Flooded / Managed Rewetting (+2 cm)
          this.soilModel.updateWaterPhysics();
        }
        this.applyManualState();
      });
    }

    // Legacy day/night toggle if present
    const legacyDayNight = document.getElementById('btn-toggle-daynight');
    if (legacyDayNight) {
      legacyDayNight.addEventListener('click', () => {
        if (this.currentMode !== "idle") this.stopSimulation(true);
        this.isManualDay = !this.isManualDay;
        this.updateSolLunaButton();
        this.applyManualState();
      });
    }
  }

  updateSolLunaButton() {
    const btnSolLuna = document.getElementById('btn-toggle-sol-luna');
    const iconEl = document.getElementById('sol-luna-icon');
    const labelEl = document.getElementById('sol-luna-label');

    if (btnSolLuna) {
      if (this.isManualDay) {
        btnSolLuna.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        btnSolLuna.style.borderColor = '#fef08a';
        btnSolLuna.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.45)';
        if (iconEl) iconEl.textContent = '☀️';
        if (labelEl) labelEl.textContent = 'Day (Sun)';
      } else {
        btnSolLuna.style.background = 'linear-gradient(135deg, #1e1b4b, #312e81)';
        btnSolLuna.style.borderColor = '#818cf8';
        btnSolLuna.style.boxShadow = '0 0 12px rgba(99, 102, 241, 0.45)';
        if (iconEl) iconEl.textContent = '🌙';
        if (labelEl) labelEl.textContent = 'Night (Moon)';
      }
    }
  }

  // --- CALIBRATED CANONICAL BENCHMARK STATES ---
  applyManualState() {
    const co2UptakeGroup = document.getElementById("co2-uptake-arrows");
    const co2UptakeLines = document.querySelectorAll('.co2-down');
    const co2RecoLines = document.querySelectorAll('.co2-up');
    const ch4Arrows = document.querySelectorAll('.ch4-bypass');
    const n2oPulses = document.querySelectorAll('.n2o-pulse');
    const plantLeaves = document.querySelectorAll('.plant-leaves');
    const convectionPlumes = document.getElementById('svg-convection-plumes');
    const turbulentEddies = document.getElementById('svg-turbulent-eddies');
    const eddyText = document.getElementById('svg-text-eddy-label');
    const snowLayer = document.getElementById('svg-snow-layer');

    let state = {
      isSink: true,
      co2GppScale: 1.0,
      recoScale: 1.0,
      ch4Scale: 1.0,
      n2oScale: 0.5,
      fluxCo2Text: '-3.8 µmol m⁻² s⁻¹',
      fluxCh4Text: '+42 nmol m⁻² s⁻¹',
      fluxN2oText: '+0.02 nmol m⁻² s⁻¹',
      co2Color: '#10b981',
      ustarLabel: 'Turbulencia Activa (u* = 0.38 m/s, QC 0)',
      convectionOpacity: 0.85,
      inversionOpacity: 0,
      showSnow: false,
      isH1Transient: false,
      isCompactionActive: false
    };

    if (this.currentManualSeason === 'summer') {
      state.showSnow = false;
      if (this.isManualDay) {
        state.isSink = true;
        state.co2GppScale = 1.35;
        state.recoScale = 0.95;
        state.ch4Scale = 1.0;
        state.n2oScale = 0.4;
        state.fluxCo2Text = '-3.8 µmol m⁻² s⁻¹';
        state.fluxCh4Text = '+42 nmol m⁻² s⁻¹';
        state.fluxN2oText = '+0.02 nmol m⁻² s⁻¹';
        state.co2Color = '#10b981';
        state.ustarLabel = 'Turbulencia Activa (u* = 0.38 m/s, QC 0)';
        state.convectionOpacity = 0.85;
        state.inversionOpacity = 0;
      } else {
        state.isSink = false;
        state.co2GppScale = 0.0;
        state.recoScale = 1.25;
        state.ch4Scale = 0.9;
        state.n2oScale = 0.5;
        state.fluxCo2Text = '+3.2 µmol m⁻² s⁻¹';
        state.fluxCh4Text = '+35 nmol m⁻² s⁻¹';
        state.fluxN2oText = '+0.03 nmol m⁻² s⁻¹';
        state.co2Color = '#f43f5e';
        state.ustarLabel = 'Inversión Nocturna (u* = 0.08 m/s, Desacoplado)';
        state.convectionOpacity = 0;
        state.inversionOpacity = 0.85;
      }
    } else {
      state.showSnow = true;
      state.isCompactionActive = true;
      if (this.isManualDay) {
        state.isSink = false;
        state.co2GppScale = 0.08;
        state.recoScale = 0.45;
        state.ch4Scale = 2.4;
        state.n2oScale = 0.2;
        state.fluxCo2Text = '+0.8 µmol m⁻² s⁻¹';
        state.fluxCh4Text = '+145 nmol m⁻² s⁻¹ (Pulso H1)';
        state.fluxN2oText = '+0.01 nmol m⁻² s⁻¹';
        state.co2Color = '#fbbf24';
        state.ustarLabel = 'Viento Invernal (u* = 0.18 m/s)';
        state.convectionOpacity = 0.15;
        state.inversionOpacity = 0;
        state.isH1Transient = true;
      } else {
        state.isSink = false;
        state.co2GppScale = 0.0;
        state.recoScale = 0.35;
        state.ch4Scale = 2.0;
        state.n2oScale = 0.15;
        state.fluxCo2Text = '+0.6 µmol m⁻² s⁻¹';
        state.fluxCh4Text = '+125 nmol m⁻² s⁻¹';
        state.fluxN2oText = '+0.005 nmol m⁻² s⁻¹';
        state.co2Color = '#94a3b8';
        state.ustarLabel = 'Estancamiento Laminar Invernal (u* = 0.05 m/s)';
        state.convectionOpacity = 0;
        state.inversionOpacity = 0.9;
        state.isH1Transient = true;
      }
    }

    this.updateTelemetryValues(state.fluxCo2Text, state.co2Color, state.fluxCh4Text, state.isH1Transient, state.fluxN2oText);

    if (snowLayer) snowLayer.style.display = state.showSnow ? 'block' : 'none';
    if (this.hudCh4TransientBadge) this.hudCh4TransientBadge.style.display = state.isH1Transient ? 'inline-flex' : 'none';
    if (this.hudCompactionBadge) this.hudCompactionBadge.style.display = state.isCompactionActive ? 'inline-flex' : 'none';

    // Sky & Celestial bodies
    const skyRect = document.getElementById('svg-sky-gradient-rect');
    const sunGroup = document.getElementById('svg-sun-group');
    const moonGroup = document.getElementById('svg-moon-group');
    const starsGroup = document.getElementById('svg-stars-group');
    const inversionLayer = document.getElementById('svg-stable-inversion-layer');

    if (inversionLayer) inversionLayer.style.opacity = state.inversionOpacity;

    if (this.isManualDay) {
      if (skyRect) skyRect.setAttribute('fill', 'url(#skyDayGrad)');
      if (sunGroup) sunGroup.style.display = 'inline';
      if (moonGroup) moonGroup.style.display = 'none';
      if (starsGroup) starsGroup.style.display = 'none';
    } else {
      if (skyRect) skyRect.setAttribute('fill', 'url(#skyNightGrad)');
      if (sunGroup) sunGroup.style.display = 'none';
      if (moonGroup) moonGroup.style.display = 'inline';
      if (starsGroup) starsGroup.style.display = 'inline';
    }

    // Vegetation color
    if (this.currentManualSeason === 'summer') {
      plantLeaves.forEach(p => p.setAttribute('stroke', '#16a34a'));
      if (this.aerenchymaPlants) this.aerenchymaPlants.classList.remove("plant-senescent");
    } else {
      plantLeaves.forEach(p => p.setAttribute('stroke', '#b45309'));
      if (this.aerenchymaPlants) this.aerenchymaPlants.classList.add("plant-senescent");
    }

    if (convectionPlumes) convectionPlumes.style.opacity = state.convectionOpacity;
    if (turbulentEddies) turbulentEddies.style.opacity = this.isManualDay ? 0.8 : 0.2;
    if (eddyText) eddyText.textContent = state.ustarLabel;

    // Photosynthesis arrows
    if (co2UptakeGroup) {
      co2UptakeGroup.style.display = (this.isManualDay && state.co2GppScale > 0.05) ? "inline" : "none";
    }
    co2UptakeLines.forEach(line => {
      line.style.strokeWidth = `${3 * state.co2GppScale}px`;
      line.style.animationDuration = `${1.8 / Math.max(0.2, state.co2GppScale)}s`;
    });

    // Respiration arrows
    co2RecoLines.forEach(line => {
      line.style.strokeWidth = `${2.8 * state.recoScale}px`;
      line.style.animationDuration = `${2.2 / Math.max(0.2, state.recoScale)}s`;
      line.style.opacity = state.recoScale > 0.8 ? "0.9" : "0.4";
    });

    // Methane arrows
    ch4Arrows.forEach(arrow => {
      const sw = state.ch4Scale >= 2.0 ? 5.5 : (state.ch4Scale * 3.5);
      arrow.style.strokeWidth = `${sw}px`;
      arrow.style.stroke = state.ch4Scale >= 2.0 ? '#ef4444' : '#f97316';
      arrow.style.animationDuration = `${1.5 / Math.max(0.3, state.ch4Scale)}s`;
      arrow.style.filter = state.ch4Scale >= 2.0 ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.9))' : 'none';
    });

    // Net CO2 Flux Arrow: DYNAMIC DIRECTION FLIP
    this.updateNetFluxArrow(state.isSink, state.fluxCo2Text, state.co2Color, 7.0);

    if (this.soilModel) {
      this.soilModel.setDayNightMode(this.isManualDay);
    }
  }

  updateTelemetryValues(co2Text, co2Color, ch4Text, isH1, n2oText) {
    if (this.hudLiveCo2) {
      this.hudLiveCo2.textContent = co2Text;
      this.hudLiveCo2.style.color = co2Color;
    }
    if (this.hudLiveCh4) {
      this.hudLiveCh4.textContent = ch4Text;
      this.hudLiveCh4.style.color = isH1 ? '#ef4444' : '#f59e0b';
    }
    if (this.hudLiveN2o) {
      this.hudLiveN2o.textContent = n2oText;
      this.hudLiveN2o.style.color = '#c084fc';
    }
  }

  updateNetFluxArrow(isSink, text, color, strokeWidth = 7.0) {
    const netArrowLine = document.getElementById("net-flux-arrow-line");
    const netBadgeBg = document.getElementById("net-flux-badge-bg");
    const netTagText = document.getElementById("svg-text-co2e-tag");

    if (isSink) {
      // SINK: Downward Arrow (Green #10b981)
      if (netArrowLine) {
        netArrowLine.setAttribute("x1", "850");
        netArrowLine.setAttribute("y1", "45");
        netArrowLine.setAttribute("x2", "850");
        netArrowLine.setAttribute("y2", "165");
        netArrowLine.setAttribute("stroke", "#10b981");
        netArrowLine.setAttribute("stroke-width", String(strokeWidth));
        netArrowLine.setAttribute("marker-end", "url(#arrowCo2eGreen)");
        netArrowLine.setAttribute("filter", "drop-shadow(0 0 10px rgba(16,185,129,0.85))");
        netArrowLine.style.animation = "dashAnimation 1.2s linear infinite";
      }
      if (netBadgeBg) {
        netBadgeBg.setAttribute("stroke", "#10b981");
      }
      if (netTagText) {
        netTagText.setAttribute("fill", "#10b981");
        netTagText.textContent = `SUMIDERO NETO (${text})`;
      }
    } else {
      // SOURCE: Upward Arrow (Red / Amber #f43f5e)
      if (netArrowLine) {
        netArrowLine.setAttribute("x1", "850");
        netArrowLine.setAttribute("y1", "165");
        netArrowLine.setAttribute("x2", "850");
        netArrowLine.setAttribute("y2", "45");
        netArrowLine.setAttribute("stroke", color || "#f43f5e");
        netArrowLine.setAttribute("stroke-width", String(strokeWidth));
        netArrowLine.setAttribute("marker-end", "url(#arrowCo2eRed)");
        netArrowLine.setAttribute("filter", "drop-shadow(0 0 10px rgba(244,63,94,0.85))");
        netArrowLine.style.animation = "dashAnimation 1.2s linear infinite reverse";
      }
      if (netBadgeBg) {
        netBadgeBg.setAttribute("stroke", color || "#f43f5e");
      }
      if (netTagText) {
        netTagText.setAttribute("fill", color || "#f43f5e");
        netTagText.textContent = `FUENTE NETA (${text})`;
      }
    }
  }

  // --- CONTROLS INITIALIZATION ---
  initControls() {
    // 1. Diurnal Cycle Button (Play / Pause / Resume)
    if (this.btnAnimDiurnal) {
      this.btnAnimDiurnal.addEventListener("click", (e) => {
        e.stopPropagation();
        this.playDiurnalCycle();
      });
    }

    // 2. Annual Evolution Button (Play / Pause / Resume)
    if (this.btnAnimAnnual) {
      this.btnAnimAnnual.addEventListener("click", (e) => {
        e.stopPropagation();
        this.playAnnualCycle();
      });
    }

    // 3. Reset Simulation Button
    if (this.btnResetSim) {
      this.btnResetSim.addEventListener("click", (e) => {
        e.stopPropagation();
        this.resetSimulation();
      });
    }

    // 4. Gas Isolation Filters
    const setupGasFilter = (checkboxId, gasGroup, dataGas) => {
      const input = document.getElementById(checkboxId);
      const pill = document.querySelector(`.gas-filter-pill[data-gas="${dataGas}"]`);
      if (input) {
        input.addEventListener("change", (e) => {
          const isChecked = e.target.checked;
          if (pill) pill.classList.toggle("active", isChecked);
          if (gasGroup) {
            gasGroup.classList.toggle("hidden-gas", !isChecked);
          }
        });
      }
    };

    setupGasFilter("filter-gas-co2", this.gasGroupCo2, "co2");
    setupGasFilter("filter-gas-ch4", this.gasGroupCh4, "ch4");
    setupGasFilter("filter-gas-n2o", this.gasGroupN2o, "n2o");
  }

  // --- INTERACTIVE TIME PROGRESSION OVERLAY & TIMELINE SCRUBBER ---
  initTimeOverlay() {
    if (this.overlayBtnPause) {
      this.overlayBtnPause.addEventListener("click", (e) => {
        e.stopPropagation();
        this.togglePauseResume();
      });
    }

    if (this.overlayBtnClose) {
      this.overlayBtnClose.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideTimeOverlay();
      });
    }

    // Scrubber click and scrub navigation
    if (this.scrubberTrack) {
      const handleScrub = (e) => {
        const rect = this.scrubberTrack.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left);
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const progress = Math.max(0, Math.min(1, x / rect.width));

        this.scrubTo(progress);
      };

      this.scrubberTrack.addEventListener("click", (e) => {
        e.stopPropagation();
        handleScrub(e);
      });

      let isDragging = false;
      this.scrubberTrack.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        isDragging = true;
        handleScrub(e);
      });
      window.addEventListener("mousemove", (e) => {
        if (isDragging) handleScrub(e);
      });
      window.addEventListener("mouseup", () => {
        if (isDragging) isDragging = false;
      });
    }
  }

  initCanvasClickInteraction() {
    // Clicking on canvas toggles Pause / Resume & displays Time Progress HUD
    if (this.svgCanvas) {
      this.svgCanvas.addEventListener("click", (e) => {
        // Do not intercept interactive sprites or modals
        if (e.target.closest('.svg-sprite-card') || 
            e.target.closest('.carex-botanical-twin') || 
            e.target.closest('#svg-satellite-group') ||
            e.target.closest('.plant-hit-box') ||
            e.target.closest('#sat-btn-jump-gis')) {
          return;
        }

        e.stopPropagation();
        if (this.currentMode === "idle") {
          // If idle, clicking canvas launches Diurnal 24h cycle
          this.playDiurnalCycle();
        } else {
          // Toggle Pause / Resume
          this.togglePauseResume();
        }

        // Always ensure overlay is visible when canvas is clicked
        if (this.timeOverlay) {
          this.timeOverlay.style.display = "flex";
        }
      });
    }
  }

  scrubTo(progress) {
    this.currentProgress = progress;
    this.pausedProgress = progress;

    const duration = this.currentMode === "diurnal" ? this.diurnalDuration : this.annualDuration;
    this.startTime = performance.now() - (progress * duration);

    if (this.currentMode === "diurnal") {
      this.renderDiurnalFrame(progress * 24);
    } else if (this.currentMode === "annual") {
      this.renderAnnualFrame(progress * 12);
    } else {
      // Default to diurnal if idle
      this.currentMode = "diurnal";
      this.isPaused = true;
      this.updateButtonStates();
      this.setupScrubberLabels("diurnal");
      this.renderDiurnalFrame(progress * 24);
    }
  }

  showTimeOverlay(mode) {
    if (!this.timeOverlay) return;
    this.timeOverlay.style.display = "flex";
    this.setupScrubberLabels(mode);
    this.updateOverlayPauseUI();
  }

  hideTimeOverlay() {
    if (this.timeOverlay) {
      this.timeOverlay.style.display = "none";
    }
  }

  setupScrubberLabels(mode) {
    if (!this.scrubberLabels) return;
    this.scrubberLabels.innerHTML = "";

    if (mode === "diurnal") {
      if (this.overlayModeBadge) this.overlayModeBadge.textContent = "☀️ Paso de la Hora (24h)";
      if (this.scrubberSubLeft) this.scrubberSubLeft.textContent = "00:00 Medianoche";
      if (this.scrubberSubRight) this.scrubberSubRight.textContent = "24:00 Noche";

      const ticks = ["00:00", "04:00", "08:00 (Alba)", "12:00 (Cenit)", "16:00", "20:00 (Ocaso)", "24:00"];
      ticks.forEach((tick, i) => {
        const span = document.createElement("span");
        span.textContent = tick;
        span.id = `tick-diurnal-${i}`;
        this.scrubberLabels.appendChild(span);
      });
    } else {
      if (this.overlayModeBadge) this.overlayModeBadge.textContent = "🗓️ Paso de los Días (365d)";
      if (this.scrubberSubLeft) this.scrubberSubLeft.textContent = "Día 1 (01 Ene)";
      if (this.scrubberSubRight) this.scrubberSubRight.textContent = "Día 365 (31 Dic)";

      const ticks = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      ticks.forEach((tick, i) => {
        const span = document.createElement("span");
        span.textContent = tick;
        span.id = `tick-annual-${i}`;
        this.scrubberLabels.appendChild(span);
      });
    }
  }

  updateOverlayPauseUI() {
    if (this.overlayPauseStatus) {
      this.overlayPauseStatus.textContent = this.isPaused ? "⏸ Pausado" : "▶ En reproducción";
      this.overlayPauseStatus.classList.toggle("paused", this.isPaused);
    }
    if (this.overlayBtnPauseIcon) {
      this.overlayBtnPauseIcon.textContent = this.isPaused ? "▶" : "⏸";
    }
    if (this.overlayBtnPauseLabel) {
      this.overlayBtnPauseLabel.textContent = this.isPaused ? "Reanudar" : "Pausar";
    }
    if (this.overlayBtnPause) {
      this.overlayBtnPause.classList.toggle("paused", this.isPaused);
    }
  }

  flashPauseFeedback(text, icon = "⏸") {
    if (!this.canvasPauseFlash) return;
    if (this.pauseFlashIcon) this.pauseFlashIcon.textContent = icon;
    if (this.pauseFlashText) this.pauseFlashText.textContent = text;

    this.canvasPauseFlash.classList.add("active");
    if (this.flashTimeout) clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(() => {
      this.canvasPauseFlash.classList.remove("active");
    }, 1100);
  }

  // ==========================================================================
  // PLAY / PAUSE / RESUME / STOP CONTROLLERS
  // ==========================================================================
  togglePauseResume() {
    if (this.currentMode === "idle") {
      this.playDiurnalCycle();
    } else if (this.isPaused) {
      this.resumeSimulation();
    } else {
      this.pauseSimulation();
    }
  }

  pauseSimulation() {
    if (this.currentMode === "idle" || this.isPaused) return;

    this.isPaused = true;
    this.pausedProgress = this.currentProgress;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.updateButtonStates();
    this.updateOverlayPauseUI();

    if (this.currentMode === "diurnal") {
      const hh = Math.floor(this.currentProgress * 24);
      const mm = Math.floor(((this.currentProgress * 24) - hh) * 60);
      const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
      this.flashPauseFeedback(`Pausado (${timeStr} hrs)`, "⏸");
    } else {
      const dayOfYear = Math.min(365, Math.max(1, Math.floor(this.currentProgress * 365) + 1));
      this.flashPauseFeedback(`Pausado (Día ${dayOfYear})`, "⏸");
    }
  }

  resumeSimulation() {
    if (this.currentMode === "idle" || !this.isPaused) return;

    this.isPaused = false;
    const duration = this.currentMode === "diurnal" ? this.diurnalDuration : this.annualDuration;
    this.startTime = performance.now() - (this.pausedProgress * duration);

    this.updateButtonStates();
    this.updateOverlayPauseUI();
    this.flashPauseFeedback("Reanudado", "▶");

    if (this.currentMode === "diurnal") {
      this.startDiurnalLoop();
    } else {
      this.startAnnualLoop();
    }
  }

  stopSimulation(resetUI = true) {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.currentMode = "idle";
    this.isPaused = false;
    this.currentProgress = 0.0;
    this.pausedProgress = 0.0;

    if (resetUI) {
      this.updateButtonStates();
      this.hideTimeOverlay();
    }
  }

  // ==========================================================================
  // FASE 2: 24-HOUR DIURNAL CYCLE (Paso de la Hora)
  // ==========================================================================
  playDiurnalCycle() {
    if (this.currentMode === "diurnal") {
      // Toggle pause/resume
      if (!this.isPaused) {
        this.pauseSimulation();
      } else {
        this.resumeSimulation();
      }
      return;
    }

    // Start fresh diurnal cycle
    this.stopSimulation(false);
    this.currentMode = "diurnal";
    this.isPaused = false;
    this.currentProgress = 0.0;
    this.pausedProgress = 0.0;
    this.startTime = performance.now();

    // Baseline summer water table (-25 cm)
    if (this.soilModel) {
      this.soilModel.waterTableDepth = -25;
      this.soilModel.updateWaterPhysics();
    }

    this.showTimeOverlay("diurnal");
    this.updateButtonStates();
    this.flashPauseFeedback("Ciclo 24h Iniciado", "☀️");
    this.startDiurnalLoop();
  }

  startDiurnalLoop() {
    const loop = (now) => {
      if (this.currentMode !== "diurnal" || this.isPaused) return;

      const elapsed = (now - this.startTime) % this.diurnalDuration;
      const progress = elapsed / this.diurnalDuration; // 0.0 to 1.0
      this.currentProgress = progress;
      const hourDecimal = progress * 24; // 0.0 to 24.0

      this.renderDiurnalFrame(hourDecimal);
      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  renderDiurnalFrame(hour) {
    const hh = Math.floor(hour);
    const mm = Math.floor((hour - hh) * 60);
    const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    const progress = Math.max(0, Math.min(1, hour / 24));

    // Update digital clocks & readouts
    if (this.stripTimeReadout) this.stripTimeReadout.textContent = `${timeStr} hrs`;
    if (this.stripCalendarReadout) this.stripCalendarReadout.textContent = "15 Julio (Ciclo 24h)";
    if (this.hudTimeReadout) this.hudTimeReadout.textContent = timeStr;
    if (this.overlayMainClock) this.overlayMainClock.textContent = `🕒 ${timeStr} hrs`;

    // Scrubber update
    if (this.scrubberFill) this.scrubberFill.style.width = `${progress * 100}%`;
    if (this.scrubberThumb) this.scrubberThumb.style.left = `${progress * 100}%`;

    // Day vs Night Regime Transition (Day: 06:00 to 19:30)
    const isDay = hour >= 6.0 && hour < 19.5;
    if (this.soilModel && this.soilModel.isDayMode !== isDay) {
      this.soilModel.setDayNightMode(isDay);
    }
    const icon = isDay ? "☀️" : "🌙";
    if (this.stripTimeIcon) this.stripTimeIcon.textContent = icon;
    if (this.hudTimeIcon) this.hudTimeIcon.textContent = icon;

    // Sky & Sun/Moon Arc
    const sunGroup = document.getElementById("svg-sun-group");
    const moonGroup = document.getElementById("svg-moon-group");
    const starsGroup = document.getElementById("svg-stars-group");
    const sunAura = document.getElementById("svg-sun-aura");
    const sunMid = document.getElementById("svg-sun-mid");
    const sunCore = document.getElementById("svg-sun-core");
    const sunbeam1 = document.getElementById("svg-sunbeam-1");
    const sunbeam2 = document.getElementById("svg-sunbeam-2");
    const sunText = document.getElementById("svg-sun-text");
    const co2UptakeGroup = document.getElementById("co2-uptake-arrows");
    const co2UptakeLines = document.querySelectorAll(".co2-down");
    const co2RecoLines = document.querySelectorAll(".co2-up");

    let rnEst = 0;

    if (isDay) {
      if (sunGroup) sunGroup.style.display = "inline";
      if (moonGroup) moonGroup.style.display = "none";
      if (starsGroup) starsGroup.style.display = "none";
      if (co2UptakeGroup) co2UptakeGroup.style.display = "inline";

      const dayProgress = Math.max(0, Math.min(1, (hour - 6.0) / (19.5 - 6.0)));
      const sunX = Math.round(140 + dayProgress * 1080);
      const sunY = Math.round(210 - Math.sin(dayProgress * Math.PI) * 165);

      if (sunAura) { sunAura.setAttribute("cx", sunX); sunAura.setAttribute("cy", sunY); }
      if (sunMid) { sunMid.setAttribute("cx", sunX); sunMid.setAttribute("cy", sunY); }
      if (sunCore) { sunCore.setAttribute("cx", sunX); sunCore.setAttribute("cy", sunY); }
      rnEst = Math.round(Math.sin(dayProgress * Math.PI) * 620);
      if (sunText) {
        sunText.setAttribute("x", sunX);
        sunText.setAttribute("y", sunY + 45);
        sunText.textContent = `Rn = +${rnEst} W/m²`;
      }
      if (sunbeam1) {
        sunbeam1.setAttribute("points", `${sunX - 25},${sunY} 350,240 500,240 ${sunX},${sunY}`);
        sunbeam1.setAttribute("opacity", (Math.sin(dayProgress * Math.PI) * 0.14).toFixed(2));
      }
      if (sunbeam2) {
        sunbeam2.setAttribute("points", `${sunX},${sunY} 680,240 850,240 ${sunX + 25},${sunY}`);
        sunbeam2.setAttribute("opacity", (Math.sin(dayProgress * Math.PI) * 0.16).toFixed(2));
      }

      // Photosynthesis active downward arrows
      co2UptakeLines.forEach(l => {
        l.style.strokeWidth = "3.4px";
        l.style.animationDuration = "1.5s";
      });
      co2RecoLines.forEach(l => {
        l.style.strokeWidth = "2.6px";
        l.style.opacity = "0.85";
      });

      // Net sink downwards
      this.updateNetFluxArrow(true, "-3.8 µmol m⁻² s⁻¹", "#10b981", 7.0);
      this.updateTelemetryValues("-3.8 µmol m⁻² s⁻¹", "#10b981", "+42 nmol m⁻² s⁻¹", false, "+0.02 nmol m⁻² s⁻¹");
    } else {
      if (sunGroup) sunGroup.style.display = "none";
      if (moonGroup) moonGroup.style.display = "inline";
      if (starsGroup) starsGroup.style.display = "inline";
      if (co2UptakeGroup) co2UptakeGroup.style.display = "none";

      // GPP = 0, Reco is source
      co2RecoLines.forEach(l => {
        l.style.strokeWidth = "3.0px";
        l.style.opacity = "0.75";
      });

      // Net source upwards
      this.updateNetFluxArrow(false, "+3.2 µmol m⁻² s⁻¹", "#f43f5e", 6.8);
      this.updateTelemetryValues("+3.2 µmol m⁻² s⁻¹", "#f43f5e", "+35 nmol m⁻² s⁻¹", false, "+0.03 nmol m⁻² s⁻¹");
    }

    // ------------------------------------------------------------------------
    // REGIME 1: MIDDAY STOMATAL CLOSURE (13:00 - 15:30, VPD Stress > 1.2 kPa)
    // ------------------------------------------------------------------------
    const isVpdStress = hour >= 13.0 && hour <= 15.5;
    if (isVpdStress) {
      if (this.alertStomatal) this.alertStomatal.setAttribute("opacity", "1");
      if (this.co2UptakeStream) this.co2UptakeStream.classList.add("throttled-flow");
      
      const phenom = `⚠️ Estrés VPD de Mediodía (VPD > 1.2 kPa) • Cierre estomático protector • Asimilación CO₂ reducida (Rn = +${rnEst} W/m²)`;
      this.setPhenomenon(phenom, "#f59e0b");
      if (this.overlayPhenom) this.overlayPhenom.textContent = phenom;
    } else {
      if (this.alertStomatal) this.alertStomatal.setAttribute("opacity", "0");
      if (this.co2UptakeStream) this.co2UptakeStream.classList.remove("throttled-flow");
    }

    // ------------------------------------------------------------------------
    // REGIME 2: NOCTURNAL THERMAL INVERSION (20:00 - 05:30, u* < 0.12 m/s)
    // ------------------------------------------------------------------------
    const isNocturnalInversion = hour >= 20.0 || hour < 5.5;
    if (isNocturnalInversion) {
      if (this.stableInversionLayer) this.stableInversionLayer.setAttribute("opacity", "0.85");
      if (this.alertUstar) this.alertUstar.setAttribute("opacity", "1");

      document.querySelectorAll(".animated-flux-arrow").forEach(el => el.classList.add("stagnant-flow"));

      const phenom = "❄️ Inversión Térmica Nocturna • u* < 0.12 m/s (Filtro EC activo) • Desacople atmosférico y acumulación sub-canopia";
      this.setPhenomenon(phenom, "#f43f5e");
      if (this.overlayPhenom) this.overlayPhenom.textContent = phenom;
    } else if (!isVpdStress) {
      if (this.stableInversionLayer) this.stableInversionLayer.setAttribute("opacity", "0");
      if (this.alertUstar) this.alertUstar.setAttribute("opacity", "0");

      document.querySelectorAll(".animated-flux-arrow").forEach(el => el.classList.remove("stagnant-flow"));

      const phenom = `☀️ Capa Límite Turbulenta Convectiva • Alta mezcla turbulenta (QC 0, u* = 0.38 m/s) • Asimilación neta constante (Rn = +${rnEst} W/m²)`;
      this.setPhenomenon(phenom, "#10b981");
      if (this.overlayPhenom) this.overlayPhenom.textContent = phenom;
    }
  }

  // ==========================================================================
  // FASE 3: 365-DAY ANNUAL EVOLUTION (Paso de los Días y Verificación Científica)
  // ==========================================================================
  playAnnualCycle() {
    if (this.currentMode === "annual") {
      // Toggle pause/resume
      if (!this.isPaused) {
        this.pauseSimulation();
      } else {
        this.resumeSimulation();
      }
      return;
    }

    // Start fresh annual evolution
    this.stopSimulation(false);
    this.currentMode = "annual";
    this.isPaused = false;
    this.currentProgress = 0.0;
    this.pausedProgress = 0.0;
    this.startTime = performance.now();

    // Ensure daytime lighting for clear ecohydrological observation
    if (this.soilModel) this.soilModel.setDayNightMode(true);
    if (this.stableInversionLayer) this.stableInversionLayer.setAttribute("opacity", "0");
    if (this.alertUstar) this.alertUstar.setAttribute("opacity", "0");

    this.showTimeOverlay("annual");
    this.updateButtonStates();
    this.flashPauseFeedback("Evolución Anual 365d Iniciada", "🗓️");
    this.startAnnualLoop();
  }

  startAnnualLoop() {
    const loop = (now) => {
      if (this.currentMode !== "annual" || this.isPaused) return;

      const elapsed = (now - this.startTime) % this.annualDuration;
      const progress = elapsed / this.annualDuration; // 0.0 to 1.0
      this.currentProgress = progress;
      const monthDecimal = progress * 12; // 0.0 to 12.0

      this.renderAnnualFrame(monthDecimal);
      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  renderAnnualFrame(month) {
    const progress = Math.max(0, Math.min(1, month / 12));
    const dayOfYear = Math.min(365, Math.max(1, Math.floor(progress * 365) + 1));
    const monthIdx = Math.min(11, Math.floor(month));
    const monthProgress = month - Math.floor(month);
    const currentMonthLabel = this.months[monthIdx];
    const dayInMonth = Math.floor(monthProgress * 30) + 1;

    // Time text updates
    const dateFormatted = `${String(dayInMonth).padStart(2, "0")} ${currentMonthLabel.split(" ")[0]}`;
    if (this.stripTimeReadout) this.stripTimeReadout.textContent = `Día ${dayOfYear}/365`;
    if (this.stripCalendarReadout) this.stripCalendarReadout.textContent = `${dateFormatted} (${currentMonthLabel})`;
    if (this.hudTimeReadout) this.hudTimeReadout.textContent = `Día ${dayOfYear}`;
    if (this.hudCalendarReadout) this.hudCalendarReadout.textContent = currentMonthLabel;
    if (this.overlayMainClock) this.overlayMainClock.textContent = `📅 Día ${dayOfYear} / 365 (${dateFormatted})`;

    // Scrubber update
    if (this.scrubberFill) this.scrubberFill.style.width = `${progress * 100}%`;
    if (this.scrubberThumb) this.scrubberThumb.style.left = `${progress * 100}%`;

    // Highlight active month tick in scrubber
    if (this.scrubberLabels) {
      for (let i = 0; i < 12; i++) {
        const tick = document.getElementById(`tick-annual-${i}`);
        if (tick) tick.classList.toggle("active-tick", i === monthIdx);
      }
    }

    // Elements
    const snowLayer = document.getElementById("svg-snow-layer");
    const plantLeaves = document.querySelectorAll(".plant-leaves");
    const co2UptakeLines = document.querySelectorAll(".co2-down");
    const co2RecoLines = document.querySelectorAll(".co2-up");

    // ========================================================================
    // SCIENTIFIC SEASONAL DYNAMICS ACROSS 365 DAYS:
    // Parameters calibrated strictly against Santander (2026) Results:
    // ========================================================================
    let targetWtd = -25;
    let isSenescent = false;
    let isMethaneSpike = false;
    let isRecoSurge = false;
    let isN2oPulse = false;
    let isCo2Sink = false;
    let gppScale = 1.0;
    let recoScale = 1.0;
    let ch4Scale = 1.0;
    let n2oScale = 0.5;
    let co2Text = "-3.8 µmol m⁻² s⁻¹";
    let ch4Text = "+42 nmol m⁻² s⁻¹";
    let n2oText = "+0.02 nmol m⁻² s⁻¹";
    let co2Color = "#10b981";
    let phenomMessage = "";

    if (month < 2.0) {
      // 1. INVIERNO (Enero - Febrero | Días 1 - 59):
      // WTD alto (-10 cm), turba fría (2-4 °C), cobertura de nieve, dormancia vegetal
      // Reco inhibida por frío (<5% del total anual), GPP = 0.
      targetWtd = -10;
      isSenescent = true;
      isCo2Sink = false; // Fuente neta residual
      gppScale = 0.0;
      recoScale = 0.35;
      ch4Scale = 1.6; // Emisión sostenida en turba anóxica fría
      n2oScale = 0.15;
      co2Text = "+0.5 µmol m⁻² s⁻¹";
      ch4Text = "+65 nmol m⁻² s⁻¹";
      n2oText = "+0.008 nmol m⁻² s⁻¹";
      co2Color = "#94a3b8";
      phenomMessage = "❄️ Invierno: Dormancia vegetal (GPP = 0) • Suelo frío saturado (-10 cm) • Respiración inhibida (<5% anual)";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "❄️";
      if (snowLayer) snowLayer.style.display = "block";
    } else if (month < 5.0) {
      // 2. PRIMAVERA (Marzo - Mayo | Días 60 - 151):
      // Rebrote y expansión de hojas. Descenso gradual de WTD (-10 a -25 cm).
      // Fuerte asimilación fotosintética GPP supera a Reco -> ¡FUERTE SUMIDERO NETO DE CO₂!
      const t = (month - 2.0) / 3.0;
      targetWtd = Math.round(-10 - t * 15); // -10 a -25 cm
      isSenescent = false;
      isCo2Sink = true; // SUMIDERO NETO (Flecha hacia abajo)
      gppScale = 0.8 + t * 0.6; // 0.8 a 1.4
      recoScale = 0.4 + t * 0.5; // 0.4 a 0.9 (+1.2 a +2.2 µmol)
      ch4Scale = 0.8;
      n2oScale = 0.3;
      const nee = -2.2 - t * 2.3; // -2.2 a -4.5 µmol
      co2Text = `${nee.toFixed(1)} µmol m⁻² s⁻¹`;
      ch4Text = `+${Math.round(20 + t * 12)} nmol m⁻² s⁻¹`;
      n2oText = "+0.015 nmol m⁻² s⁻¹";
      co2Color = "#10b981";
      phenomMessage = `🌱 Primavera: Rebrote vegetativo vigoroso • Asimilación fotosintética activa (GPP) • Sumidero Neto (${co2Text})`;
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "🌱";
      if (snowLayer) snowLayer.style.display = "none";
    } else if (month < 6.2) {
      // 3. INICIO DE VERANO (Junio | Días 152 - 187):
      // Máxima radiación, dosel denso, sumidero de carbono pico
      targetWtd = -25;
      isSenescent = false;
      isCo2Sink = true; // Sumidero
      gppScale = 1.45;
      recoScale = 1.0;
      ch4Scale = 1.0;
      n2oScale = 0.4;
      co2Text = "-3.9 µmol m⁻² s⁻¹";
      ch4Text = "+42 nmol m⁻² s⁻¹";
      n2oText = "+0.02 nmol m⁻² s⁻¹";
      co2Color = "#10b981";
      phenomMessage = "🌿 Inicio de Verano: Canopia en plena fotosíntesis • WTD -25 cm • Máxima fijación de carbono atmosférico";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "☀️";
      if (snowLayer) snowLayer.style.display = "none";
    } else if (month < 8.0) {
      // 4. ESTIAJE ESTIVAL SEVERO Y SEQUÍA (Julio - Agosto | Días 188 - 243):
      // WTD cae a -44 cm. 44 cm de turba expuesta a O2 -> ¡OXIDACIÓN Y RESPIRACIÓN MASIVA (Reco ~60% anual)!
      // Cierre estomático por VPD > 1.2 kPa reduce GPP -> ¡EL HUMEDAL SE INVIERTE A FUENTE NETA (+4.4 µmol)!
      const t = (month - 6.2) / 1.8;
      targetWtd = Math.round(-25 - t * 19); // -25 a -44 cm
      isSenescent = false;
      isRecoSurge = true;
      isCo2Sink = false; // INVERSIÓN: FUENTE NETA (Flecha hacia arriba)
      gppScale = 0.6; // Reducido por estrés hídrico y VPD
      recoScale = 1.8 + t * 0.4; // Reco masiva (+6.5 a +7.2 µmol)
      ch4Scale = 0.75; // La zona óxica de 44 cm actúa como filtro metanotrófico (salvo aerenquima)
      n2oScale = (month >= 6.8 && month <= 7.3) ? 1.5 : 0.3; // Pulso de lluvia de verano
      isN2oPulse = (month >= 6.8 && month <= 7.3);

      co2Text = `+${(3.2 + t * 1.2).toFixed(1)} µmol m⁻² s⁻¹`;
      ch4Text = "+32 nmol m⁻² s⁻¹ (Filtro Óxico)";
      n2oText = isN2oPulse ? "+0.05 nmol m⁻² s⁻¹ (Tormenta)" : "+0.015 nmol m⁻² s⁻¹";
      co2Color = "#f43f5e";
      phenomMessage = "💨 Estiaje Estival (WTD -44 cm) • Estrés VPD • Oxidación masiva de turba (60% Reco anual) -> ¡Fuente Neta!";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "🔥";
      if (snowLayer) snowLayer.style.display = "none";
    } else if (month < 10.0) {
      // 5. TRANSICIÓN OTOÑAL Y REINUNDACIÓN (Septiembre - Octubre | Días 244 - 304):
      // WTD se recupera rápidamente (-44 cm a -6 cm) por compuertas de manejo.
      // Senescencia foliar (GPP=0, tallos huecos). ¡PICO ANUAL DE N₂O (>50% de la emisión anual)!
      const t = (month - 8.0) / 2.0;
      targetWtd = Math.round(-44 + t * 38); // -44 a -6 cm
      isSenescent = true;
      isCo2Sink = false; // Fuente
      gppScale = 0.1 * (1 - t);
      recoScale = 0.9 - t * 0.4; // Moderando
      ch4Scale = 1.2 + t * 0.8;
      n2oScale = 2.4; // PICO MÁXIMO DE N2O
      isN2oPulse = true;
      co2Text = "+1.6 µmol m⁻² s⁻¹";
      ch4Text = `+${Math.round(45 + t * 40)} nmol m⁻² s⁻¹`;
      n2oText = "+0.14 nmol m⁻² s⁻¹ (Pico Anual)";
      co2Color = "#f59e0b";
      phenomMessage = "🍂 Otoño: Reinundación de turba aireada • Senescencia vegetal • ¡Pico Anual de N₂O (>50% anual por desnitrificación)!";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "🍂";
      if (snowLayer) snowLayer.style.display = "none";
    } else {
      // 6. INUNDACIÓN TOTAL Y PULSO AGUDO DE METANO H1 (Noviembre - Diciembre | Días 305 - 365):
      // WTD alcanza +2 cm (ponding / anoxia total). Turba aún templada en profundidad.
      // Chimeneas de aerénquima de juncos muertos derivan metano directamente -> ¡PULSO H1 (+145 nmol)!
      // Forzamiento radiactivo extremo dominado por CH4 (GWP20 = 84x).
      const t = (month - 10.0) / 2.0;
      targetWtd = Math.round(-6 + t * 8); // -6 a +2 cm (Encharcamiento)
      isSenescent = true;
      isMethaneSpike = true; // HIPÓTESIS 1 ACTIVA
      isCo2Sink = false; // Fuerte fuente neta de calentamiento
      gppScale = 0.0;
      recoScale = 0.4;
      ch4Scale = 2.5; // PULSO AGUDO H1
      n2oScale = 0.2;
      co2Text = "+0.7 µmol m⁻² s⁻¹";
      ch4Text = "+145 nmol m⁻² s⁻¹ (Pulso H1)";
      n2oText = "+0.01 nmol m⁻² s⁻¹";
      co2Color = "#ef4444";
      phenomMessage = "🔥 Inundación Total (+2 cm) • ¡Pulso Agudo de Metano H1 (+145 nmol)! • Chimenea de aerénquima abierta • Forzamiento GWP₂₀";
      if (this.stripTimeIcon) this.stripTimeIcon.textContent = "💧";
      if (snowLayer) snowLayer.style.display = (month >= 11.5) ? "block" : "none";
    }

    // Apply WTD to soil physics model & sync HUD slider
    if (this.soilModel) {
      this.soilModel.waterTableDepth = targetWtd;
      this.soilModel.updateWaterPhysics();
    }
    if (this.hudWtdSlider) this.hudWtdSlider.value = targetWtd;
    if (this.hudWtdDisplay) this.hudWtdDisplay.textContent = targetWtd > 0 ? `+${targetWtd} cm` : `${targetWtd} cm`;

    // Vegetation Senescence
    if (this.aerenchymaPlants) {
      this.aerenchymaPlants.classList.toggle("plant-senescent", isSenescent);
    }
    plantLeaves.forEach(p => p.setAttribute("stroke", isSenescent ? "#b45309" : "#16a34a"));

    // --- ARROW DIRECTION & SIZE DYNAMICS ---
    // 1. Photosynthesis Downward GPP Arrows: Visibly changes size & disappears in winter
    if (this.co2UptakeStream) {
      this.co2UptakeStream.style.display = gppScale > 0.05 ? "inline" : "none";
    }
    co2UptakeLines.forEach(line => {
      line.style.strokeWidth = `${3.2 * gppScale}px`;
      line.style.animationDuration = `${1.8 / Math.max(0.2, gppScale)}s`;
    });

    // 2. Respiration Upward Reco Arrows: Modulate stroke & speed (Massive during summer drought)
    if (this.co2RecoStream) {
      this.co2RecoStream.classList.toggle("massive-flow", isRecoSurge);
    }
    co2RecoLines.forEach(line => {
      const sw = isRecoSurge ? 5.2 : (2.4 * recoScale);
      line.style.strokeWidth = `${sw}px`;
      line.style.animationDuration = `${2.0 / Math.max(0.2, recoScale)}s`;
      line.style.opacity = recoScale > 0.6 ? "0.95" : "0.35";
    });

    // 3. Methane Bypass Arrows: Surges during autumn/winter inundation (Hypothesis 1)
    this.ch4BypassArrows.forEach(arrow => {
      arrow.classList.toggle("massive-flow", isMethaneSpike);
      const sw = isMethaneSpike ? 6.2 : (ch4Scale * 3.4);
      arrow.style.strokeWidth = `${sw}px`;
      arrow.style.stroke = isMethaneSpike ? "#ef4444" : "#f97316";
      arrow.style.animationDuration = `${1.4 / Math.max(0.3, ch4Scale)}s`;
      arrow.style.filter = isMethaneSpike ? "drop-shadow(0 0 12px rgba(239, 68, 68, 0.95))" : "none";
    });

    // 4. Nitrous Oxide Pulses: Peaks massively in Autumn rewetting
    this.n2oPulses.forEach(el => {
      el.classList.toggle("massive-flow", isN2oPulse);
      el.style.strokeWidth = isN2oPulse ? "3.8px" : "1.8px";
      el.style.opacity = isN2oPulse ? "1.0" : "0.3";
      el.style.filter = isN2oPulse ? "drop-shadow(0 0 10px rgba(192, 132, 252, 0.9))" : "none";
    });

    // 5. Net GHG Vector (CO2e Balance): DYNAMIC DIRECTION & SIZE FLIP
    this.updateNetFluxArrow(isCo2Sink, co2Text, co2Color, isRecoSurge ? 8.0 : (isMethaneSpike ? 8.5 : 7.0));

    // Update Telemetry readouts
    this.updateTelemetryValues(co2Text, co2Color, ch4Text, isMethaneSpike, n2oText);

    // Alert badges
    if (this.alertCh4Spike) this.alertCh4Spike.setAttribute("opacity", isMethaneSpike ? "1" : "0");
    if (this.hudCh4TransientBadge) this.hudCh4TransientBadge.style.display = isMethaneSpike ? "inline-flex" : "none";
    if (this.alertStomatal) this.alertStomatal.setAttribute("opacity", (month >= 6.2 && month < 8.0) ? "1" : "0");

    // Callout / Phenomenon
    this.setPhenomenon(phenomMessage, isMethaneSpike ? "#ef4444" : (isRecoSurge ? "#f59e0b" : "#10b981"));
    if (this.overlayPhenom) this.overlayPhenom.textContent = phenomMessage;
  }

  // ==========================================================================
  // RESET SIMULATION TO EQUILIBRIUM
  // ==========================================================================
  resetSimulation() {
    this.stopSimulation(true);

    if (this.soilModel) {
      this.soilModel.waterTableDepth = -25;
      this.soilModel.setDayNightMode(true);
      this.soilModel.updateWaterPhysics();
    }

    if (this.alertStomatal) this.alertStomatal.setAttribute("opacity", "0");
    if (this.alertUstar) this.alertUstar.setAttribute("opacity", "0");
    if (this.alertCh4Spike) this.alertCh4Spike.setAttribute("opacity", "0");
    if (this.stableInversionLayer) this.stableInversionLayer.setAttribute("opacity", "0");

    if (this.aerenchymaPlants) this.aerenchymaPlants.classList.remove("plant-senescent");
    if (this.co2UptakeStream) this.co2UptakeStream.classList.remove("throttled-flow");
    if (this.co2RecoStream) this.co2RecoStream.classList.remove("massive-flow");
    this.ch4BypassArrows.forEach(el => el.classList.remove("massive-flow"));
    this.n2oPulses.forEach(el => el.classList.remove("massive-flow"));
    document.querySelectorAll(".animated-flux-arrow").forEach(el => el.classList.remove("stagnant-flow"));

    if (this.stripTimeReadout) this.stripTimeReadout.textContent = "12:00";
    if (this.stripCalendarReadout) this.stripCalendarReadout.textContent = "Verano (Jul)";
    if (this.stripTimeIcon) this.stripTimeIcon.textContent = "☀️";
    if (this.hudTimeReadout) this.hudTimeReadout.textContent = "12:00";
    if (this.hudCalendarReadout) this.hudCalendarReadout.textContent = "Jul (Línea Base)";
    if (this.hudTimeIcon) this.hudTimeIcon.textContent = "☀️";

    this.setPhenomenon("Estado de Equilibrio • Bien Acoplado • Asimilación GPP Activa", "#10b981");
    this.flashPauseFeedback("Restablecido", "↺");
    this.applyManualState();
  }

  updateButtonStates() {
    const isDiurnal = this.currentMode === "diurnal";
    const isAnnual = this.currentMode === "annual";

    if (this.btnAnimDiurnal) {
      this.btnAnimDiurnal.classList.toggle("anim-running", isDiurnal && !this.isPaused);
      this.btnAnimDiurnal.classList.toggle("anim-paused", isDiurnal && this.isPaused);
      this.btnAnimDiurnal.classList.toggle("active", isDiurnal);

      const icon = this.btnAnimDiurnal.querySelector(".anim-btn-icon") || this.btnAnimDiurnal.querySelector(".hud-btn-icon");
      const label = this.btnAnimDiurnal.querySelector(".anim-btn-text") || this.btnAnimDiurnal.querySelector(".hud-btn-label");

      if (isDiurnal) {
        if (this.isPaused) {
          if (icon) icon.textContent = "▶";
          if (label) label.textContent = "Reanudar 24h";
        } else {
          if (icon) icon.textContent = "⏸";
          if (label) label.textContent = "Pausar 24h";
        }
      } else {
        if (icon) icon.textContent = "▶";
        if (label) label.textContent = "24h Cycle";
      }
    }

    if (this.btnAnimAnnual) {
      this.btnAnimAnnual.classList.toggle("anim-running", isAnnual && !this.isPaused);
      this.btnAnimAnnual.classList.toggle("anim-paused", isAnnual && this.isPaused);
      this.btnAnimAnnual.classList.toggle("active", isAnnual);

      const icon = this.btnAnimAnnual.querySelector(".anim-btn-icon") || this.btnAnimAnnual.querySelector(".hud-btn-icon");
      const label = this.btnAnimAnnual.querySelector(".anim-btn-text") || this.btnAnimAnnual.querySelector(".hud-btn-label");

      if (isAnnual) {
        if (this.isPaused) {
          if (icon) icon.textContent = "▶";
          if (label) label.textContent = "Reanudar Año";
        } else {
          if (icon) icon.textContent = "⏸";
          if (label) label.textContent = "Pausar Año";
        }
      } else {
        if (icon) icon.textContent = "▶";
        if (label) label.textContent = "365d Year";
      }
    }
  }

  setPhenomenon(text, dotColor = "#10b981") {
    if (this.phenomenonText) this.phenomenonText.textContent = text;
    if (this.phenomDot) this.phenomDot.style.background = dotColor;
  }
}
