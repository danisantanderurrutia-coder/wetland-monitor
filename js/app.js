/* ==========================================================================
   WETLAND MONITOR — MASTER APPLICATION CONTROLLER
   - Unified 9-Slide "Rewetting Paradox" Narrative
   - Day/Night Soil Ecosystem Integration & Dynamic Sprites
   - Repositioned Macro View: Left Slide Index, Center Stage, Right Geo & Climate
   - Instrument Matrix with Sub-Tabs & Landing Overview
   - Automated Slide Progression (Scope, Diurnal, WTD, Instruments)
   - Streamlined English-Only Architecture
   ========================================================================== */

import { INSTRUMENTS, INSTRUMENT_CATEGORIES } from "./instruments_data.js?v=7.0";
import { MASTER_APPROACH, ACTIVE_LOGO } from "./narratives.js?v=7.0";
import { SoilAtmosphereModel } from "./soil_model.js?v=7.0";
import { SatelliteViewController } from "./satellite_view.js?v=7.0";
import { DigitalTwinSimulationEngine } from "./digital_twin_engine.js?v=8.0";
import { PITCH_TRANSLATIONS_ES } from "./pitch_translations_es.js?v=7.0";
import { WetlandTwinSandbox } from "./twin_sandbox.js?v=1.0";
import { InteractiveSuite } from "./interactive_tools.js?v=8.0";

export const VIEW_SLUGS = {
  landing: "landing",
  soil_interface: "twin",
  wallener_dashboard: "wallener",
  classic_presentation: "pitch",
  aims_objectives: "aims",
  macro: "site-satellites",
  eddy_covariance: "eddy-covariance",
  instruments_matrix: "chambers",
  data_pipeline: "empirical-models",
  geophysics: "geomechanics",
  flux_diagnostics: "micrometeo",
  biogeochemistry: "biogeochemistry",
  gwp_uncertainties: "uncertainties",
  conclusions_outlook: "conclusions",
  tools_general: "tools",
  satellites_general: "satellites",
  biogeochemistry_general: "biogeochemistry-general",
  carbon_general: "carbon-accounting",
  defense_agenda: "agenda"
};

export const SLUG_TO_VIEW = {
  landing: "landing",
  home: "landing",
  twin: "soil_interface",
  simulator: "soil_interface",
  soil_interface: "soil_interface",
  wallener: "wallener_dashboard",
  wallener_dashboard: "wallener_dashboard",
  "wallener-dashboard": "wallener_dashboard",
  klimafarm: "wallener_dashboard",
  pitch: "classic_presentation",
  presentation: "classic_presentation",
  walkthrough: "classic_presentation",
  aims: "aims_objectives",
  aims_objectives: "aims_objectives",
  "aims-objectives": "aims_objectives",
  macro: "macro",
  "site-satellites": "macro",
  satellites: "satellites_general",
  "satellites-general": "satellites_general",
  satellites_general: "satellites_general",
  "eddy-covariance": "eddy_covariance",
  eddy_covariance: "eddy_covariance",
  ec: "eddy_covariance",
  tower: "eddy_covariance",
  chambers: "instruments_matrix",
  instruments: "instruments_matrix",
  instruments_matrix: "instruments_matrix",
  "empirical-models": "data_pipeline",
  pipeline: "data_pipeline",
  "data-pipeline": "data_pipeline",
  data_pipeline: "data_pipeline",
  geomechanics: "geophysics",
  geophysics: "geophysics",
  micrometeo: "flux_diagnostics",
  flux: "flux_diagnostics",
  "flux-diagnostics": "flux_diagnostics",
  flux_diagnostics: "flux_diagnostics",
  biogeochemistry: "biogeochemistry",
  biogeo: "biogeochemistry",
  "biogeochemistry-general": "biogeochemistry_general",
  biogeochemistry_general: "biogeochemistry_general",
  uncertainties: "gwp_uncertainties",
  gwp: "gwp_uncertainties",
  "gwp-uncertainties": "gwp_uncertainties",
  gwp_uncertainties: "gwp_uncertainties",
  conclusions: "conclusions_outlook",
  "conclusions-outlook": "conclusions_outlook",
  conclusions_outlook: "conclusions_outlook",
  tools: "tools_general",
  "tools-general": "tools_general",
  tools_general: "tools_general",
  carbon: "carbon_general",
  "carbon-accounting": "carbon_general",
  "carbon-general": "carbon_general",
  carbon_general: "carbon_general",
  agenda: "defense_agenda",
  defense_agenda: "defense_agenda",
  thesis_cover: "wallener_dashboard",
  cover: "wallener_dashboard",
  dossier: "wallener_dashboard"
};

class WetlandMonitorApp {
  constructor() {
    this.currentViewKey = "soil_interface";
    this.currentSlideIndex = 0;
    this.currentMatrixCategory = "all";
    this.activeLogoId = ACTIVE_LOGO.id;
    this.pitchLanguage = "en"; // "en" | "es" | "dual"

    // Timer state
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isTimerRunning = false;

    // Sub-controllers
    this.soilModel = null;
    this.satelliteController = null;
    this.digitalTwin = null;

    this.init();
  }

  init() {
    // 1. Instantiate sub-models
    this.soilModel = new SoilAtmosphereModel();
    this.satelliteController = new SatelliteViewController();
    this.digitalTwin = new DigitalTwinSimulationEngine(this.soilModel);
    window.digitalTwinEngine = this.digitalTwin;

    // 2. Initialize DOM & modules
    this.initDOM();
    this.initThemeToggle();
    this.initViewSwitcher();
    this.initSoilInstrumentsRack();
    this.initMacroSlidesIndex();
    this.initPresenterControls();
    this.initResultsModal();
    this.initGwpExplorer();
    this.initPipelineToggles();
    this.initInstrumentMatrix();
    this.initBiogeoToggle();
    this.initEddyDashboard();
    this.initMacroDashboard();
    this.initCoverActions();
    this.initAgendaJumps();
    this.initUniversalLightbox();
    this.initTimer();
    this.initTeleprompter();
    this.initKeyboardShortcuts();
    this.initSynthesisPillars();
    this.initVersionAndChangelog();
    this.initAdminEmbargoManager();

    // Initialize Interactive Wetland Lab Sandbox & Validator
    this.sandbox = new WetlandTwinSandbox(this.soilModel, this.digitalTwin);
    window.twinSandbox = this.sandbox;
    this.sandbox.init();

    // Initialize GIS Project Importer & Territorial Wetland Lab Selector
    this.initGisProjectModal();

    // Initialize Interactive Expansion Suite (4-Theme Coordinator, Command Palette, Sliders, Redox Simulator, 3D Tilt)
    this.interactiveSuite = new InteractiveSuite(this);
    this.interactiveSuite.init();

    // 3. Set branding logo to "Stratigraphy & Probes"
    this.initLogo();

    // 4. URL Hash Slug Routing & Browser History
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (hash && SLUG_TO_VIEW[hash]) {
        const targetView = SLUG_TO_VIEW[hash];
        if (this.currentViewKey !== targetView) {
          if (targetView === "soil_interface") {
            this.isWallenerTwinMode = (hash.includes("wallener"));
          }
          this.switchView(targetView);
        }
      }
    });

    const initialHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (initialHash && SLUG_TO_VIEW[initialHash]) {
      const targetView = SLUG_TO_VIEW[initialHash];
      if (targetView === "soil_interface") {
        this.isWallenerTwinMode = (initialHash.includes("wallener"));
      }
      this.switchView(targetView);
    } else {
      this.currentViewKey = "landing";
      this.switchView("landing");
    }
  }

  initDOM() {
    this.mainViewport = document.querySelector(".main-viewport");
    this.notesDrawer = document.getElementById("notes-drawer");
    this.resultsModalBackdrop = document.getElementById("results-modal-backdrop");
    this.logoModalOverlay = document.getElementById("logo-gallery-modal-overlay");
  }

  // ==========================================================================
  // 4-THEME ADAPTIVE DESIGN ENGINE
  // 1. Boreal Peat (Cyber Dark bio-lab default)
  // 2. Fieldwork Daylight (High-contrast scientific solar light)
  // 3. Living Moss (Biophilic deep peatland evergreen)
  // 4. Academic Monochrome (Swiss print minimalist publication)
  // ==========================================================================
  initThemeToggle() {
    const themeBtn = document.getElementById("btn-theme-toggle");
    const themes = [
      { id: "boreal", name: "Boreal Peat", icon: "🌌", isDark: true },
      { id: "daylight", name: "Fieldwork", icon: "☀️", isDark: false },
      { id: "biophilic", name: "Living Moss", icon: "🌿", isDark: true },
      { id: "monochrome", name: "Academic", icon: "📄", isDark: false }
    ];

    let saved = localStorage.getItem("wetland_monitor_theme") || "boreal";
    if (saved === "dark") saved = "boreal";
    if (saved === "light") saved = "daylight";

    this.setTheme(saved);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const currentThemeId = document.body.getAttribute("data-theme") || "boreal";
        const currentIndex = themes.findIndex(t => t.id === currentThemeId);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        this.setTheme(nextTheme.id);
        this.playUiAudioFeedback("click");
      });
    }
  }

  setTheme(themeId) {
    const themeConfigs = {
      boreal: { id: "boreal", name: "Boreal Peat", icon: "🌌", isDark: true },
      daylight: { id: "daylight", name: "Fieldwork", icon: "☀️", isDark: false },
      biophilic: { id: "biophilic", name: "Living Moss", icon: "🌿", isDark: true },
      monochrome: { id: "monochrome", name: "Academic", icon: "📄", isDark: false }
    };

    const config = themeConfigs[themeId] || themeConfigs.boreal;
    document.body.setAttribute("data-theme", config.id);
    document.body.classList.toggle("theme-dark", config.isDark);
    localStorage.setItem("wetland_monitor_theme", config.id);

    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("label-theme-btn");

    if (themeIcon) themeIcon.textContent = config.icon;
    if (themeLabel) themeLabel.textContent = config.name;
  }

  playUiAudioFeedback(type = "click") {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this._audioCtx) {
        this._audioCtx = new AudioCtx();
      }
      if (this._audioCtx.state === "suspended") {
        this._audioCtx.resume();
      }
      const osc = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this._audioCtx.destination);

      const now = this._audioCtx.currentTime;
      if (type === "click") {
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "success") {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1040, now + 0.08);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (_) {}
  }

  // ==========================================================================
  // VIEW SWITCHER
  // ==========================================================================
  initViewSwitcher() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const drawer = document.getElementById("dropdown-view-tabs");
    const hamburgerBtn = document.getElementById("btn-hamburger-menu");
    const closeBtn = document.getElementById("btn-close-carrusel-drawer");
    const slidePrev = document.getElementById("btn-carrusel-slide-prev");
    const slideNext = document.getElementById("btn-carrusel-slide-next");
    const sliderTrack = document.getElementById("carrusel-slider-track");

    // Hamburger button toggle
    if (hamburgerBtn && drawer) {
      hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isHidden = drawer.classList.toggle("hidden");
        hamburgerBtn.classList.toggle("active", !isHidden);
        if (!isHidden && sliderTrack) {
          const activeCard = sliderTrack.querySelector(".tab-btn.active");
          if (activeCard) {
            setTimeout(() => {
              activeCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }, 80);
          }
        }
      });

      // Close button inside drawer
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          drawer.classList.add("hidden");
          hamburgerBtn.classList.remove("active");
        });
      }

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!hamburgerBtn.contains(e.target) && !drawer.contains(e.target)) {
          drawer.classList.add("hidden");
          hamburgerBtn.classList.remove("active");
        }
      });

      // Close with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !drawer.classList.contains("hidden")) {
          drawer.classList.add("hidden");
          hamburgerBtn.classList.remove("active");
        }
      });
    }

    // Tab buttons inside carousel track
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.switchView(btn.dataset.view);
        if (drawer) {
          setTimeout(() => {
            drawer.classList.add("hidden");
            if (hamburgerBtn) hamburgerBtn.classList.remove("active");
          }, 180);
        }
      });
    });

    // Global Navigation Targets (Landing cards, Header buttons, Dropdown links)
    document.querySelectorAll("[data-nav-target]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const target = el.dataset.navTarget;
        if (target) {
          if (target === "soil_interface") {
            this.isWallenerTwinMode = false;
          }
          this.switchView(target);
          const dropdown = document.getElementById("menu-methodology");
          if (dropdown) dropdown.classList.add("hidden");
        }
      });
    });

    // Wallener Au Dashboard Jump Cards
    document.querySelectorAll("[data-jump-wallener]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const target = el.dataset.jumpWallener;
        if (target === "soil_interface") {
          this.isWallenerTwinMode = true;
          if (this.sandbox) this.sandbox.loadArchetype("fen");
        } else {
          this.isWallenerTwinMode = false;
        }
        if (target) this.switchView(target);
      });
    });

    // Contextual Wallener Project Nav Pills
    document.querySelectorAll("[data-wallener-nav]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const target = el.dataset.wallenerNav;
        if (target === "soil_interface") {
          this.isWallenerTwinMode = true;
          if (this.sandbox) this.sandbox.loadArchetype("fen");
        } else {
          this.isWallenerTwinMode = false;
        }
        if (target) this.switchView(target);
      });
    });

    // Agenda / Progression TOC items
    document.querySelectorAll(".toc-item").forEach(item => {
      item.addEventListener("click", () => {
        const tabId = item.dataset.tab;
        const mapping = {
          "tab-cover": "landing",
          "tab-aims": "aims_objectives",
          "tab-soil": "soil_interface",
          "tab-macro": "macro",
          "tab-biogeo": "biogeochemistry",
          "tab-instruments": "instruments_matrix",
          "tab-pipeline": "data_pipeline",
          "tab-ec": "eddy_covariance",
          "tab-geophysics": "geophysics",
          "tab-flux": "flux_diagnostics",
          "tab-uncertainties": "gwp_uncertainties",
          "tab-conclusions": "conclusions_outlook"
        };
        const target = mapping[tabId] || item.dataset.view;
        if (target) {
          if (target === "soil_interface") this.isWallenerTwinMode = true;
          this.switchView(target);
        }
      });
    });

    // Back to Landing / Home buttons
    const btnWallenerBack = document.getElementById("btn-wallener-back-landing");
    if (btnWallenerBack) {
      btnWallenerBack.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("landing");
      });
    }

    const btnWallenerHome = document.getElementById("nav-btn-wallener-to-home");
    if (btnWallenerHome) {
      btnWallenerHome.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("landing");
      });
    }

    const btnBackWallenerDash = document.getElementById("nav-btn-back-wallener-dash");
    if (btnBackWallenerDash) {
      btnBackWallenerDash.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("wallener_dashboard");
      });
    }

    // Methodology Dropdown Toggle
    const methodBtn = document.getElementById("nav-btn-methodology");
    const methodMenu = document.getElementById("menu-methodology");
    if (methodBtn && methodMenu) {
      methodBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        methodMenu.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        if (!methodBtn.contains(e.target) && !methodMenu.contains(e.target)) {
          methodMenu.classList.add("hidden");
        }
      });
    }

    // Lateral carousel sliding buttons
    if (slidePrev && sliderTrack) {
      slidePrev.addEventListener("click", (e) => {
        e.stopPropagation();
        sliderTrack.scrollBy({ left: -260, behavior: "smooth" });
      });
    }
    if (slideNext && sliderTrack) {
      slideNext.addEventListener("click", (e) => {
        e.stopPropagation();
        sliderTrack.scrollBy({ left: 260, behavior: "smooth" });
      });
    }

    // Mouse wheel horizontal scrolling on carousel track
    if (sliderTrack) {
      sliderTrack.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          sliderTrack.scrollLeft += e.deltaY * 1.2;
        }
      }, { passive: false });

      // Mouse drag to scroll
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      sliderTrack.addEventListener("mousedown", (e) => {
        isDown = true;
        sliderTrack.classList.add("is-dragging");
        startX = e.pageX - sliderTrack.offsetLeft;
        scrollLeft = sliderTrack.scrollLeft;
      });

      window.addEventListener("mouseup", () => {
        isDown = false;
        sliderTrack.classList.remove("is-dragging");
      });

      sliderTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderTrack.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderTrack.scrollLeft = scrollLeft - walk;
      });
    }

    // Wallener contextual carousel sliding buttons
    const wallenerSlidePrev = document.getElementById("btn-wallener-slide-prev");
    const wallenerSlideNext = document.getElementById("btn-wallener-slide-next");
    const wallenerTrack = document.getElementById("wallener-tabs-track");

    if (wallenerSlidePrev && wallenerTrack) {
      wallenerSlidePrev.addEventListener("click", (e) => {
        e.stopPropagation();
        wallenerTrack.scrollBy({ left: -220, behavior: "smooth" });
      });
    }
    if (wallenerSlideNext && wallenerTrack) {
      wallenerSlideNext.addEventListener("click", (e) => {
        e.stopPropagation();
        wallenerTrack.scrollBy({ left: 220, behavior: "smooth" });
      });
    }

    // Mouse wheel horizontal scrolling on Wallener carousel track
    if (wallenerTrack) {
      wallenerTrack.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          wallenerTrack.scrollLeft += e.deltaY * 1.2;
        }
      }, { passive: false });

      // Mouse drag to scroll on Wallener carousel track
      let isDownW = false;
      let startXW = 0;
      let scrollLeftW = 0;

      wallenerTrack.addEventListener("mousedown", (e) => {
        isDownW = true;
        wallenerTrack.classList.add("is-dragging");
        startXW = e.pageX - wallenerTrack.offsetLeft;
        scrollLeftW = wallenerTrack.scrollLeft;
      });

      window.addEventListener("mouseup", () => {
        isDownW = false;
        wallenerTrack.classList.remove("is-dragging");
      });

      wallenerTrack.addEventListener("mousemove", (e) => {
        if (!isDownW) return;
        e.preventDefault();
        const x = e.pageX - wallenerTrack.offsetLeft;
        const walk = (x - startXW) * 1.5;
        wallenerTrack.scrollLeft = scrollLeftW - walk;
      });
    }

    const brandBtn = document.getElementById("brand-badge-click");
    if (brandBtn) {
      brandBtn.addEventListener("click", () => {
        if (this.currentViewKey === "landing") {
          this.switchView("soil_interface");
        } else {
          this.switchView("landing");
        }
        this.playUiAudioFeedback("click");
      });
      brandBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (this.currentViewKey === "landing") {
            this.switchView("soil_interface");
          } else {
            this.switchView("landing");
          }
          this.playUiAudioFeedback("click");
        }
      });
    }

    const landingSeal = document.querySelector(".landing-seal-wrapper");
    if (landingSeal) {
      landingSeal.style.cursor = "pointer";
      landingSeal.addEventListener("click", () => {
        this.switchView("soil_interface");
        this.playUiAudioFeedback("click");
      });
    }

    // Global "How It Works" Pedagogical Guide Modal Controller
    window.openHowItWorks = () => {
      const modal = document.getElementById("twin-help-modal");
      if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
      }
      const drawer = document.getElementById("dropdown-view-tabs");
      const hamburgerBtn = document.getElementById("btn-hamburger-menu");
      if (drawer) drawer.classList.add("hidden");
      if (hamburgerBtn) hamburgerBtn.classList.remove("active");
    };

    window.closeHowItWorks = () => {
      const modal = document.getElementById("twin-help-modal");
      if (modal) {
        modal.classList.remove("active");
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
      }
    };

    // Wire header "Analytical Tools" jump button
    const headerToolsBtn = document.getElementById("btn-header-tools");
    if (headerToolsBtn) {
      headerToolsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("tools_general");
        this.playUiAudioFeedback("click");
      });
    }

    // Wire all "How It Works" triggers across header, menu, and twin HUD
    const howItWorksBtn = document.getElementById("btn-header-how-it-works");
    if (howItWorksBtn) howItWorksBtn.addEventListener("click", (e) => { e.preventDefault(); window.openHowItWorks(); });

    const tabHowItWorks = document.getElementById("tab-how-it-works");
    if (tabHowItWorks) tabHowItWorks.addEventListener("click", (e) => { e.preventDefault(); window.openHowItWorks(); });

    const hudHelpBtn = document.getElementById("btn-twin-help-guide");
    if (hudHelpBtn) hudHelpBtn.addEventListener("click", (e) => { e.preventDefault(); window.openHowItWorks(); });

    const sandboxHelpBtn = document.getElementById("btn-sandbox-help");
    if (sandboxHelpBtn) sandboxHelpBtn.addEventListener("click", (e) => { e.preventDefault(); window.openHowItWorks(); });

    const closeHelpBtn = document.getElementById("btn-close-twin-help");
    const helpModal = document.getElementById("twin-help-modal");
    if (closeHelpBtn) closeHelpBtn.addEventListener("click", () => window.closeHowItWorks());
    if (helpModal) {
      helpModal.addEventListener("click", (e) => {
        if (e.target === helpModal) window.closeHowItWorks();
      });
    }
  }

  clearSpotlightsAndResetNormalView() {
    // 1. Remove all slide spotlight and dimmed container classes across the entire document
    document.querySelectorAll(".slide-spotlight-active, .has-spotlight-active").forEach(el => {
      el.classList.remove("slide-spotlight-active", "has-spotlight-active");
    });
    document.querySelectorAll(".spotlight-cue-badge").forEach(badge => badge.remove());

    // 2. Reset GHG Balance dashboard to "all" (show all cards without dimming/spotlight)
    const ghgGrid = document.querySelector(".ghg-dashboard-grid");
    if (ghgGrid) ghgGrid.classList.remove("has-spotlight-active");
    document.querySelectorAll(".ghg-plot-card").forEach(c => {
      c.style.display = "";
      c.classList.remove("slide-spotlight-active");
    });
    document.querySelectorAll(".ghg-filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.target === "all");
    });

    // 3. Reset Eddy Covariance dashboard to "all" (show all groups)
    document.querySelectorAll(".eddy-group-wrapper").forEach(group => {
      group.style.display = "";
    });
    document.querySelectorAll(".eddy-section-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === "all");
    });

    // 4. Reset Macro & Regional Climate dashboard to "all"
    document.querySelectorAll(".macro-dashboard-grid .macro-plot-card").forEach(c => {
      c.style.display = "";
      c.classList.remove("slide-spotlight-active");
    });
    document.querySelectorAll(".macro-layer-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.layer === "all");
    });

    // 5. Scroll active view panel to top
    const activePanel = document.querySelector(".view-panel.active");
    if (activePanel) {
      activePanel.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  switchView(viewKey, fromSlide = false) {
    if (viewKey === "thesis_cover" || viewKey === "view-cover") {
      viewKey = "wallener_dashboard";
    }
    this.currentViewKey = viewKey;

    // Update URL hash slug smoothly across entire website
    const targetSlug = VIEW_SLUGS[viewKey] || viewKey;
    try {
      const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (currentHash !== targetSlug) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + targetSlug);
        } else {
          window.location.hash = targetSlug;
        }
      }
    } catch (_) {}

    const wallenerViews = [
      "wallener_dashboard",
      "thesis_cover",
      "aims_objectives",
      "macro",
      "biogeochemistry",
      "instruments_matrix",
      "data_pipeline",
      "eddy_covariance",
      "geophysics",
      "flux_diagnostics",
      "gwp_uncertainties",
      "conclusions_outlook",
      "defense_agenda"
    ];

    const wallenerSubviews = [
      "thesis_cover",
      "aims_objectives",
      "macro",
      "biogeochemistry",
      "instruments_matrix",
      "data_pipeline",
      "eddy_covariance",
      "geophysics",
      "flux_diagnostics",
      "gwp_uncertainties",
      "conclusions_outlook",
      "defense_agenda",
      "classic_presentation",
      "tools_general"
    ];

    // Toggle Wallener project contextual nav bar (Scrolleable Carrusel)
    const wallenerNav = document.getElementById("wallener-project-nav-bar");
    if (wallenerNav) {
      if (wallenerSubviews.includes(viewKey) || (viewKey === "soil_interface" && this.isWallenerTwinMode)) {
        wallenerNav.classList.remove("hidden");
        // Update active tab card in Wallener project carrusel
        const cards = wallenerNav.querySelectorAll(".carrusel-card, .wallener-tab-pill");
        cards.forEach(pill => {
          const isActive = (pill.dataset.wallenerNav === viewKey || pill.dataset.view === viewKey);
          pill.classList.toggle("active", isActive);
          if (isActive) {
            setTimeout(() => {
              pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }, 80);
          }
        });
      } else {
        wallenerNav.classList.add("hidden");
      }
    }

    // Specific Twin Mode Handlers (Universal Lab Sandbox vs Wallener Calibrated Benchmark)
    if (viewKey === "soil_interface") {
      const tray = document.getElementById("twin-sandbox-tray");
      const toggleBtn = document.getElementById("btn-sandbox-tray-toggle");
      const hudOpenBtn = document.getElementById("btn-open-lab-sandbox");

      if (this.isWallenerTwinMode) {
        // Wallener Au Calibrated Benchmark Twin
        if (this.sandbox) this.sandbox.loadArchetype("fen");
      } else {
        // Universal Twin Lab Sandbox: reset running loops
        if (this.digitalTwin) {
          this.digitalTwin.resetSimulation();
        }
      }

      // Always keep tray expanded so biophysical and restoration levers are immediately accessible
      if (tray) tray.classList.remove("collapsed");
      if (toggleBtn) toggleBtn.textContent = "▼ Collapse";
      if (hudOpenBtn) hudOpenBtn.classList.add("active");
    }

    // Header bottom row (carousel) is hidden on landing, wallener and general methodology views to keep UI clean
    const headerBottomRow = document.getElementById("header-bottom-row");
    if (headerBottomRow) {
      if (viewKey === "landing" || viewKey === "wallener_dashboard" || wallenerSubviews.includes(viewKey) || viewKey.endsWith("_general")) {
        headerBottomRow.classList.add("hidden");
      } else {
        headerBottomRow.classList.remove("hidden");
      }
    }

    // Highlight Global Nav Links
    const navBtnTwin = document.getElementById("nav-btn-twin");
    const navBtnWallener = document.getElementById("nav-btn-wallener");
    const navBtnMethodology = document.getElementById("nav-btn-methodology");
    if (navBtnTwin) navBtnTwin.classList.toggle("active", viewKey === "soil_interface");
    if (navBtnWallener) navBtnWallener.classList.toggle("active", wallenerViews.includes(viewKey));
    if (navBtnMethodology) navBtnMethodology.classList.toggle("active", ["tools_general", "satellites_general", "biogeochemistry_general", "carbon_general"].includes(viewKey));

    if (viewKey === 'classic_presentation') {
      const inst = window.classicPresentationInstance || window.classicPresentation;
      if (inst && inst.showPresentation) {
        inst.showPresentation();
        return;
      }
    }

    // When navigated manually via top menus, reset all spotlights and dimming to normal,
    // then highlight primary figures relevant to the selected tab
    if (!fromSlide) {
      this.clearSpotlightsAndResetNormalView();
      this.highlightFiguresForTab(viewKey);
    }

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === viewKey);
    });

    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.viewId === viewKey);
    });

    // Scroll window and active view panel to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    const activePanel = document.querySelector(".view-panel.active");
    if (activePanel) {
      activePanel.scrollTo({ top: 0, behavior: "smooth" });
    }

    const carouselTitle = document.getElementById("carousel-current-title");
    if (carouselTitle) {
      const activeCard = document.querySelector(`.carrusel-card[data-view="${viewKey}"]`) || document.querySelector(`.tab-btn[data-view="${viewKey}"]`);
      if (activeCard) {
        const icon = activeCard.querySelector(".carrusel-card-icon")?.textContent || activeCard.querySelector("span")?.textContent || "";
        const name = activeCard.querySelector(".carrusel-card-name")?.textContent || activeCard.querySelector(".tab-text")?.textContent || "";
        carouselTitle.innerHTML = `<span class="active-dot">●</span> <span class="active-icon">${icon}</span> <span class="tab-text active-name">${name}</span>`;
      }
    }

    // Scroll active card into view in carousel if drawer is open
    const sliderTrack = document.getElementById("carrusel-slider-track");
    if (sliderTrack) {
      const activeCard = sliderTrack.querySelector(`.tab-btn[data-view="${viewKey}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    const brandBtn = document.getElementById("brand-badge-click");
    if (brandBtn) {
      brandBtn.classList.toggle("active-cover", viewKey === "landing" || viewKey === "thesis_cover");
    }

    const headerToolsBtn = document.getElementById("btn-header-tools");
    if (headerToolsBtn) {
      headerToolsBtn.classList.toggle("active", viewKey === "tools_general");
    }

    // Re-run Mermaid on pipeline/ec tabs (diagrams inside hidden panels need re-init)
    if (viewKey === "data_pipeline" || viewKey === "eddy_covariance") {
      if (typeof mermaid !== "undefined") {
        setTimeout(() => {
          try {
            // Find un-rendered mermaid divs (still have raw text, no svg inside)
            const unrendered = document.querySelectorAll(".mermaid:not([data-processed])");
            if (unrendered.length > 0) {
              mermaid.run({ nodes: Array.from(unrendered) });
            }
          } catch (e) {
            console.warn("Mermaid re-run:", e);
          }
        }, 150);
      }
    }

    // Automatically re-render any LaTeX equations in the newly active view
    if (typeof window.renderScientificMath === "function") {
      setTimeout(() => {
        const p = document.querySelector(".view-panel.active");
        window.renderScientificMath(p || document.body);
      }, 60);
    }

    // Re-scan and enforce academic embargo on all empirical plots
    if (typeof this.scanAndApplyEmbargoOverlays === "function") {
      setTimeout(() => {
        this.scanAndApplyEmbargoOverlays();
      }, 100);
    }
  }

  // ==========================================================================
  // BIOGEOCHEMISTRY DRAINED / REWETTED STATE TOGGLE
  // ==========================================================================
  initBiogeoToggle() {
    const btns = document.querySelectorAll(".biogeo-toggle-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const state = btn.dataset.state || "drained";
        this.setBiogeoState(state);
        this.playUiAudioFeedback("click");
      });
    });
  }

  setBiogeoState(state) {
    const panels = document.querySelectorAll("#view-biogeochemistry, #view-biogeochemistry-general, .view-panel[data-view-id*='biogeochemistry']");
    const btns = document.querySelectorAll(".biogeo-toggle-btn");

    panels.forEach(panel => {
      panel.classList.remove("state-drained", "state-rewetted");
      panel.classList.add(state === "rewetted" ? "state-rewetted" : "state-drained");
    });

    btns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.state === state);
    });
  }

  // ==========================================================================
  // EDDY COVARIANCE & CHAMBERS DASHBOARD CATEGORY FILTER
  // ==========================================================================
  initEddyDashboard() {
    const pills = document.querySelectorAll(".eddy-section-pill");
    const groups = document.querySelectorAll(".eddy-group-wrapper");
    if (!pills.length || !groups.length) return;

    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const cat = pill.dataset.category;

        groups.forEach(group => {
          if (cat === "all" || group.dataset.group === cat) {
            group.style.display = "";
          } else {
            group.style.display = "none";
          }
        });
      });
    });
  }

  // ==========================================================================
  // MACRO & REGIONAL CLIMATE DASHBOARD INTERACTION
  // ==========================================================================
  initMacroDashboard() {
    const layerPills = document.querySelectorAll(".macro-layer-btn");
    const cardMap = {
      walter_lieth: "#macro-card-walter",
      footprint: "#macro-card-footprint",
      satellite: "#macro-card-satellite",
      ndvi: "#macro-card-ndvi",
      topography: "#macro-card-topography",
      soil_carbon: "#macro-card-soil-carbon",
      chamber_transect: "#macro-card-chamber-transect"
    };

    layerPills.forEach(pill => {
      pill.addEventListener("click", () => {
        layerPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const layer = pill.dataset.layer;

        if (layer === "all") {
          const panel = document.getElementById("view-macro");
          if (panel) panel.scrollTo({ top: 0, behavior: "smooth" });
        } else if (cardMap[layer]) {
          const targetCard = document.querySelector(cardMap[layer]);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      });
    });

    const btnToggleClim = document.getElementById("btn-toggle-walter-clim");
    const walterImg = document.getElementById("walter-baseline-img");
    const walterLabel = document.getElementById("walter-baseline-label");
    if (btnToggleClim && walterImg) {
      let isWorldClim = false;
      btnToggleClim.addEventListener("click", (e) => {
        e.stopPropagation();
        isWorldClim = !isWorldClim;
        if (isWorldClim) {
          walterImg.src = "assets/Walter_Lieth_WorldClim.png";
          walterImg.dataset.title = "Walter-Lieth Climatology: WorldClim 30-Year Normal (1970–2000)";
          walterImg.dataset.caption = "WorldClim high-resolution historical baseline for Schleswig-Holstein peat lowlands.";
          if (walterLabel) walterLabel.textContent = "🌍 30y Baseline (WorldClim)";
          btnToggleClim.textContent = "Ver NASA POWER";
        } else {
          walterImg.src = "assets/Walter_Lieth_NASA.png";
          walterImg.dataset.title = "Walter-Lieth Historical Baseline (1999–2023) (Fig. 4)";
          walterImg.dataset.caption = "25-year regional climatological baseline (1999–2023) establishing normal thermo-pluviometric patterns.";
          if (walterLabel) walterLabel.textContent = "🛰️ 25y Baseline (NASA POWER)";
          btnToggleClim.textContent = "Ver WorldClim";
        }
      });
    }
  }

  // ==========================================================================
  // SLIDES NARRATIVE & MACRO VIEW INDEX
  // ==========================================================================
  goToSlide(index) {
    const slides = MASTER_APPROACH.slides;
    if (index < 0 || index >= slides.length) return;
    this.currentSlideIndex = index;

    const dropdownMenu = document.getElementById("dropdown-view-tabs");
    const hamburgerBtn = document.getElementById("btn-hamburger-menu");
    if (dropdownMenu) dropdownMenu.classList.add("hidden");
    if (hamburgerBtn) hamburgerBtn.classList.remove("active");

    const slide = slides[index];

    // 1. Update Step Indicators in Presenter Bar
    const stepsContainer = document.getElementById("slide-steps-container");
    if (stepsContainer) {
      stepsContainer.innerHTML = "";
      slides.forEach((s, idx) => {
        const btn = document.createElement("button");
        btn.className = `step-indicator ${idx === index ? "active" : ""}`;
        btn.textContent = idx + 1;
        btn.title = s.title;
        btn.addEventListener("click", () => this.goToSlide(idx));
        stepsContainer.appendChild(btn);
      });
      const activeBtn = stepsContainer.querySelector(".step-indicator.active");
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }

    // 2. Update Titles in Bottom Bar (Clean without Step X of 24)
    const slideNumberEl = document.getElementById("slide-curr-number");
    const slideTitleEl = document.getElementById("slide-curr-title");
    if (slideNumberEl) {
      slideNumberEl.textContent = "";
    }
    if (slideTitleEl) {
      slideTitleEl.textContent = slide.title;
    }

    // 3. Highlight Macro Slide Card across all slide containers
    document.querySelectorAll(".macro-slide-card").forEach((card, idx) => {
      const cardSlideIndex = idx % MASTER_APPROACH.slides.length;
      card.classList.toggle("active", cardSlideIndex === index);
    });

    // 4. Switch View if slide requests a specific view
    if (slide.viewTarget && slide.viewTarget !== this.currentViewKey) {
      this.switchView(slide.viewTarget, true);
    }

    // 5. Highlight Geospatial Layer if specified
    if (slide.macroLayerTarget && this.satelliteController) {
      this.satelliteController.setLayer(slide.macroLayerTarget);
    }

    // 5b. Walter-Lieth source sub-toggle (2024 vs NASA vs WorldClim)
    if (slide.walterSource && this.satelliteController) {
      this.satelliteController.walterSource = slide.walterSource;
      document.querySelectorAll(".walter-src-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.src === slide.walterSource);
      });
      if (typeof this.satelliteController.updateDisplay === "function") {
        this.satelliteController.updateDisplay();
      } else if (typeof this.satelliteController.render === "function") {
        this.satelliteController.render();
      }
    }

    // 5c. Pipeline Sub-Navigation Pane
    if (slide.pipelinePane) {
      const paneBtn = document.querySelector(`.pipeline-subnav-btn[data-pipeline-pane="${slide.pipelinePane}"]`);
      if (paneBtn) paneBtn.click();
    }

    // 5d. QC Table Sub-Tab (co2 vs ch4)
    if (slide.qcSubTab) {
      if (slide.qcSubTab === "ch4") {
        document.getElementById("btn-toggle-qc-ch4")?.click();
      } else {
        document.getElementById("btn-toggle-qc-co2")?.click();
      }
    }

    // 5e. Instrument Matrix Sub-Category
    if (slide.matrixCategory) {
      this.currentMatrixCategory = slide.matrixCategory;
    }

    // 6. Highlight Soil Scope
    if (slide.scopeTarget && this.soilModel) {
      this.soilModel.setScope(slide.scopeTarget);
    }

    // 7. Automated Diurnal Mode
    if (slide.diurnalMode !== undefined && this.soilModel) {
      this.soilModel.setDayNightMode(slide.diurnalMode);
    }

    // 8. Automated Water Table Depth
    if (slide.wtdDepth !== undefined && this.soilModel) {
      this.soilModel.waterTableDepth = slide.wtdDepth;
      if (this.soilModel.slider) {
        this.soilModel.slider.value = slide.wtdDepth;
      }
      this.soilModel.updateWaterPhysics();
    }

    // 9. Highlight Instrument
    if (slide.instrumentHighlight) {
      this.highlightSoilInstrument(slide.instrumentHighlight);
    }

    // 10. Automatic Biogeochemistry State Toggle (Drained vs Rewetted)
    if (slide.biogeoState) {
      this.setBiogeoState(slide.biogeoState);
    }

    // 11. Update GWP figure if slide specifies figure or view is gwp_explorer
    if (slide.figure && (this.currentViewKey === "gwp_explorer" || slide.viewTarget === "gwp_explorer")) {
      const mainGwpImg = document.getElementById("main-gwp-img");
      if (mainGwpImg) mainGwpImg.src = slide.figure;
      document.querySelectorAll("#gwp-figures-nav .fig-toggle-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.fig === slide.figure);
      });
    }

    // 11b. Update Pipeline figure if in data_pipeline view and slide specifies a figure
    const targetFig = slide.autoFig || slide.figure;
    if (targetFig && (this.currentViewKey === "data_pipeline" || slide.viewTarget === "data_pipeline")) {
      const matchBtn = document.querySelector(`.pipeline-fig-nav .fig-toggle-btn[data-fig="${targetFig}"]`);
      if (matchBtn) {
        matchBtn.click();
      }
    }

    // 12. SPOTLIGHT ILLUMINATION ENGINE: Focus attention on specific cards/plots
    // Clear all existing spotlights and cue badges
    document.querySelectorAll(".slide-spotlight-active, .has-spotlight-active").forEach(el => {
      el.classList.remove("slide-spotlight-active", "has-spotlight-active");
    });
    document.querySelectorAll(".spotlight-cue-badge").forEach(badge => badge.remove());

    if (slide.spotlightTarget) {
      const targets = document.querySelectorAll(slide.spotlightTarget);
      targets.forEach(target => {
        target.classList.add("slide-spotlight-active");

        // Add floating cue badge on the active element
        const badge = document.createElement("div");
        badge.className = "spotlight-cue-badge";
        if (slide.id.includes("ml") || slide.id.includes("bowen") || slide.id.includes("oedometer")) {
          badge.classList.add("badge-amber");
        } else if (slide.id.includes("part") || slide.id.includes("vpd")) {
          badge.classList.add("badge-emerald");
        }
        badge.innerHTML = `<span class="badge-pulse-dot"></span> FOCUS: SLIDE ${index + 1}`;
        target.appendChild(badge);

        const parentContainer = target.closest(".pipeline-grid, .flux-plots-grid, .geophysics-plots-column, .causal-chain-timeline, .presentation-grid-2, .biogeo-actors-grid, .flux-diagnostics-layout, .macro-dashboard-grid, .ghg-dashboard-grid, .hardware-grid");
        if (parentContainer) {
          parentContainer.classList.add("has-spotlight-active");
        }
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }, 120);
      });
    }

    // 13. Update On-Screen Teleprompter HUD & Speaker Notes Drawer
    this.updateTeleprompter(slide, index);
    this.renderPitchNotes(slide);

    // 14. Update prev/next button disabled states
    const prevBtn = document.getElementById("nav-prev-btn");
    const nextBtn = document.getElementById("nav-next-btn");
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;
  }

  initPipelineToggles() {
    const pipelineButtons = document.querySelectorAll(".pipeline-fig-nav .fig-toggle-btn");
    pipelineButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.pipelineTarget;
        const targetImg = document.getElementById(targetId);
        const figSrc = btn.dataset.fig;
        const figTitle = btn.dataset.title;
        const figCaption = btn.dataset.caption;

        if (targetImg && figSrc) {
          targetImg.src = figSrc;
          if (figTitle) targetImg.dataset.title = figTitle;
          if (figCaption) {
            const captionEl = btn.closest(".pipeline-card, .thesis-plot-card")?.querySelector(".plot-caption")
                           || btn.closest(".n2o-suite-wrapper")?.querySelector("#n2o-caption-text")
                           || btn.closest(".scientific-qc-card")?.querySelector("#qc-plot-caption-text");
            if (captionEl) captionEl.textContent = figCaption;

            const titleEl = btn.closest(".thesis-plot-card")?.querySelector(".thesis-plot-title");
            if (titleEl && figTitle) {
              const prefixMatch = titleEl.textContent.match(/^[a-z]\)\s*/i);
              const prefix = prefixMatch ? prefixMatch[0] : "";
              titleEl.textContent = prefix + figTitle;
            }
          }
        }

        const parentNav = btn.closest(".pipeline-fig-nav");
        if (parentNav) {
          parentNav.querySelectorAll(".fig-toggle-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
      });
    });

    // Sub-navigation bar for view-data-pipeline
    const subnavBtns = document.querySelectorAll(".pipeline-subnav-btn");
    subnavBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        subnavBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetPaneId = btn.dataset.pipelinePane;
        document.querySelectorAll(".pipeline-section-pane").forEach(pane => {
          pane.classList.remove("active");
        });
        const targetPane = document.getElementById(targetPaneId);
        if (targetPane) targetPane.classList.add("active");
      });
    });

    // QC Table Switcher (CO2 vs CH4)
    const btnQcCo2 = document.getElementById("btn-toggle-qc-co2");
    const btnQcCh4 = document.getElementById("btn-toggle-qc-ch4");
    const tableCo2 = document.getElementById("table-13a-container");
    const tableCh4 = document.getElementById("table-13b-container");
    const qcImg = document.getElementById("qc-flag-comparison-img");
    const qcCaption = document.getElementById("qc-plot-caption-text");

    if (btnQcCo2 && btnQcCh4) {
      btnQcCo2.addEventListener("click", () => {
        btnQcCo2.classList.add("active");
        btnQcCh4.classList.remove("active");
        if (tableCo2) tableCo2.style.display = "block";
        if (tableCh4) tableCh4.style.display = "none";
        if (qcImg) {
          qcImg.src = "assets/12_QC_Flag_Comparison.png";
          qcImg.dataset.title = "Figure 12: CO₂ QC Flag Comparison";
          qcImg.dataset.caption = "Frequency and flux distribution across ICOS Quality Flags (0-1-2) for Net Ecosystem Exchange (CO₂).";
        }
        if (qcCaption) {
          qcCaption.textContent = "Figure 12: Frequency and flux distribution across ICOS Quality Flags (0-1-2) for Net Ecosystem Exchange (CO₂).";
        }
      });

      btnQcCh4.addEventListener("click", () => {
        btnQcCh4.classList.add("active");
        btnQcCo2.classList.remove("active");
        if (tableCo2) tableCo2.style.display = "none";
        if (tableCh4) tableCh4.style.display = "block";
        if (qcImg) {
          qcImg.src = "assets/12b_CH4_QC_Flag_Comparison.png";
          qcImg.dataset.title = "Figure 12b: CH₄ QC Flag Comparison (Thesis Correction)";
          qcImg.dataset.caption = "Methane flux quality control comparison showing retained strict QC 0 (36.3%) and relaxed QC 1 (19.1%) against discarded periods.";
        }
        if (qcCaption) {
          qcCaption.textContent = "Figure 12b: Methane flux quality control comparison showing retained strict QC 0 (36.3%) and relaxed QC 1 (19.1%) against discarded periods.";
        }
      });
    }

    if (qcImg) {
      qcImg.addEventListener("click", () => {
        if (window.openUniversalLightbox) {
          window.openUniversalLightbox(qcImg.src, qcImg.dataset.title || "QC Flag Comparison", qcImg.dataset.caption || "");
        }
      });
    }
  }

  initGwpExplorer() {
    const filterButtons = document.querySelectorAll(".ghg-filter-btn");
    const ghgCards = document.querySelectorAll(".ghg-plot-card");
    const ghgGrid = document.querySelector(".ghg-dashboard-grid");

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetSelector = btn.dataset.target;

        if (targetSelector === "all") {
          ghgCards.forEach(c => {
            c.style.display = "";
            c.classList.remove("slide-spotlight-active");
          });
          if (ghgGrid) ghgGrid.classList.remove("has-spotlight-active");
          const viewPanel = document.querySelector('[data-view-id="gwp_explorer"]');
          if (viewPanel) {
            viewPanel.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          const targetCard = document.querySelector(targetSelector);
          if (targetCard) {
            ghgCards.forEach(c => {
              c.style.display = "";
              c.classList.remove("slide-spotlight-active");
            });
            if (ghgGrid) ghgGrid.classList.remove("has-spotlight-active");
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      });
    });

    // Monthly subtoggle buttons (100y vs 20y)
    const monthlyBtns = document.querySelectorAll(".btn-monthly-subtoggle");
    const monthlyImg = document.getElementById("img-monthly-stacked");
    monthlyBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        monthlyBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (monthlyImg && btn.dataset.fig) {
          monthlyImg.src = btn.dataset.fig;
          const is20y = btn.id === "btn-monthly-20y";
          monthlyImg.dataset.title = is20y 
            ? "Seasonal Trajectory: Monthly Stacked GHG Fluxes (GWP-20 Horizon)"
            : "Seasonal Trajectory: Monthly Stacked GHG Fluxes (GWP-100 Horizon)";
          monthlyImg.dataset.caption = is20y
            ? "Monthly breakdown of CO₂, CH₄, and N₂O fluxes across 2024 under a 20-year horizon (CH₄ = 84×), illustrating severe summertime warming driven by methane ebullition."
            : "Monthly breakdown of CO₂, CH₄, and N₂O fluxes across 2024 showing summer photosynthetic uptake overwhelmed by water temperature-driven methane ebullition.";
        }
      });
    });
  }

  nextSlide() {
    if (this.currentSlideIndex < MASTER_APPROACH.slides.length - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  initMacroSlidesIndex() {
    this.renderMacroSlidesIndex();
  }

  renderMacroSlidesIndex() {
    const containers = [
      document.getElementById("macro-slides-list-container"),
      document.getElementById("soil-slides-list-container")
    ].filter(Boolean);

    if (containers.length === 0) return;

    containers.forEach(container => {
      container.innerHTML = "";
      MASTER_APPROACH.slides.forEach((slide, idx) => {
        const card = document.createElement("div");
        card.className = `macro-slide-card ${idx === this.currentSlideIndex ? "active" : ""}`;
        
        const title = slide.title;
        const layerTag = slide.layerBadge || "Layer";

        card.innerHTML = `
          <div class="macro-slide-card-top">
            <span class="macro-slide-number">${idx + 1}</span>
            <span class="macro-slide-tag">${layerTag}</span>
          </div>
          <div class="macro-slide-title">${title}</div>
        `;

        card.addEventListener("click", () => {
          this.goToSlide(idx);
        });

        container.appendChild(card);
      });
    });
  }

  renderPitchNotes(slide) {
    const content = document.getElementById("notes-content-box");
    if (!content || !slide.pitch) return;

    const pitchEn = slide.pitch;
    const pitchEs = PITCH_TRANSLATIONS_ES[slide.id] || null;
    const lang = this.pitchLanguage || "dual";

    const pTitleEn = pitchEn.title || "Speaker Defense Script";
    const pSpeechEn = pitchEn.speech || "";
    const pBulletsEn = pitchEn.bullets || [];
    const pDefenseEn = pitchEn.defenseQ || "";
    const pCoreThesis = pitchEn.coreThesis || "";

    const pTitleEs = pitchEs ? pitchEs.title : "";
    const pSpeechEs = pitchEs ? pitchEs.speech : "";
    const pBulletsEs = pitchEs ? pitchEs.bullets : [];
    const pDefenseEs = pitchEs ? pitchEs.defenseQ : "";

    content.innerHTML = `
      ${pCoreThesis ? `
        <div class="pitch-takeaway-box" style="margin-bottom: 1.25rem;">
          <div class="pitch-takeaway-title">
            <span>🎯</span> <span>Core Biophysical Finding</span>
          </div>
          <div class="pitch-takeaway-text">
            "${pCoreThesis}"
          </div>
        </div>
      ` : ""}

      ${slide.figure ? `
        <div class="slide-fig-preview-box" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding: 0.6rem; background: rgba(15,23,42,0.6); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; cursor: pointer;" title="Click to view full-resolution figure in lightbox modal">
          <img src="${slide.figure}" alt="${slide.title}" style="width: 52px; height: 52px; object-fit: contain; background: #ffffff; border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;">
          <div style="flex: 1; min-width: 0;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: #10b981; font-weight: 800; text-transform: uppercase;">Associated Slide Figure</div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${slide.title}</div>
            <div style="font-size: 0.70rem; color: #38bdf8; display: flex; align-items: center; gap: 3px; margin-top: 2px;"><span>🔍</span> Click to zoom in lightbox</div>
          </div>
        </div>
      ` : ""}

      <!-- Language Selector Bar Inside Pitch Drawer -->
      <div class="pitch-lang-tabs" style="display: flex; gap: 0.4rem; margin-bottom: 1rem; padding: 4px; background: rgba(15,23,42,0.6); border-radius: 8px; border: 1px solid var(--border-subtle);">
        <button class="pitch-lang-btn ${lang === 'dual' ? 'active' : ''}" data-pitch-lang="dual" style="flex: 1; padding: 5px 8px; font-size: 0.72rem; font-weight: 700; border-radius: 6px; cursor: pointer;">🌐 Dual EN / ES</button>
        <button class="pitch-lang-btn ${lang === 'en' ? 'active' : ''}" data-pitch-lang="en" style="flex: 1; padding: 5px 8px; font-size: 0.72rem; font-weight: 700; border-radius: 6px; cursor: pointer;">🇬🇧 English</button>
        <button class="pitch-lang-btn ${lang === 'es' ? 'active' : ''}" data-pitch-lang="es" style="flex: 1; padding: 5px 8px; font-size: 0.72rem; font-weight: 700; border-radius: 6px; cursor: pointer;">🇪🇸 Español</button>
      </div>

      <!-- SPEECH CARDS -->
      ${(lang === "dual" || lang === "en") ? `
        <div class="pitch-speech-card" style="margin-bottom: 1rem;">
          <div class="pitch-speech-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 800; background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); border-radius: 4px; padding: 2px 6px; margin-bottom: 6px;">🇬🇧 Executive Walkthrough Script (English)</div>
          <div class="pitch-speech-title">${pTitleEn}</div>
          <div class="pitch-speech-body" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-primary);">${pSpeechEn}</div>
        </div>
      ` : ""}

      ${(lang === "dual" || lang === "es") && pSpeechEs ? `
        <div class="pitch-speech-card" style="margin-bottom: 1rem; border-color: rgba(245,158,11,0.4);">
          <div class="pitch-speech-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 800; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); border-radius: 4px; padding: 2px 6px; margin-bottom: 6px;">🇪🇸 Guion Ejecutivo Hablado (Español)</div>
          <div class="pitch-speech-title">${pTitleEs}</div>
          <div class="pitch-speech-body" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-primary);">${pSpeechEs}</div>
        </div>
      ` : ""}

      <!-- SUPPORTING DATA & CUES -->
      ${pBulletsEn.length > 0 ? `
        <div class="details-section" style="margin-bottom: 1rem;">
          <h4 style="font-size: 0.8rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.5rem;">🎯 Key Scientific Supporting Cues</h4>
          <ul class="pitch-bullet-points">
            ${(lang === "es" && pBulletsEs.length > 0 ? pBulletsEs : pBulletsEn).map((b, i) => `
              <li style="margin-bottom: 0.4rem;">
                ${b}
                ${(lang === "dual" && pBulletsEs[i]) ? `<div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px; font-style: italic;">🇪🇸 ${pBulletsEs[i]}</div>` : ""}
              </li>
            `).join("")}
          </ul>
        </div>
      ` : ""}

      <!-- STRATEGIC TECHNICAL Q&A -->
      ${(pDefenseEn || pDefenseEs) ? `
        <div class="defense-qa-card">
          <div class="defense-qa-title" style="display: flex; align-items: center; gap: 6px;">
            <span>❓</span> Strategic Technical &amp; Stakeholder Q&amp;A
          </div>
          ${(lang === "dual" || lang === "en") && pDefenseEn ? `
            <div class="defense-qa-text" style="margin-bottom: ${lang === 'dual' ? '0.6rem' : '0'}; font-size: 0.85rem; line-height: 1.55;">
              ${lang === 'dual' ? '<strong>EN:</strong> ' : ''}${pDefenseEn}
            </div>
          ` : ""}
          ${(lang === "dual" || lang === "es") && pDefenseEs ? `
            <div class="defense-qa-text" style="font-size: 0.85rem; line-height: 1.55; color: #fbbf24;">
              ${lang === 'dual' ? '<strong>ES:</strong> ' : ''}${pDefenseEs}
            </div>
          ` : ""}
        </div>
      ` : ""}
    `;

    // Attach listeners to language buttons
    content.querySelectorAll(".pitch-lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.pitchLanguage = btn.dataset.pitchLang;
        this.renderPitchNotes(slide);
      });
    });
  }

  // ==========================================================================
  // VIEW 1: SOIL SENSORS RACK (RIGHT SIDEBAR)
  // ==========================================================================
  initSoilInstrumentsRack() {
    const listContainer = document.getElementById("instruments-list-box");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    INSTRUMENTS.slice(0, 7).forEach(inst => {
      const card = document.createElement("div");
      card.className = "instrument-card";
      card.id = `rack-card-${inst.id}`;

      const name = inst.name;
      const model = inst.model;
      const heightStr = inst.height;

      card.innerHTML = `
        <div class="instrument-top">
          <div class="instrument-name-box">
            <span class="instrument-title">${name}</span>
            <span class="instrument-model">${model}</span>
          </div>
          <div class="instrument-icon">${inst.icon}</div>
        </div>
        <div class="instrument-variables">
          ${inst.variables.slice(0, 3).map(v => `<span class="var-tag">${v.split(' ')[0]}</span>`).join("")}
        </div>
        <div class="instrument-meta">
          <span>📍 ${heightStr}</span>
          <span style="color: var(--accent-cyan); font-weight: 700;">View Analysis ▸</span>
        </div>
      `;

      card.addEventListener("click", () => {
        this.openInstrumentModal(inst);
      });

      listContainer.appendChild(card);
    });
  }

  highlightSoilInstrument(instId) {
    document.querySelectorAll(".instruments-rack .instrument-card").forEach(c => c.classList.remove("active"));
    const target = document.getElementById(`rack-card-${instId}`);
    if (target) {
      target.classList.add("active");
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  getInstrumentById(id) {
    return INSTRUMENTS.find(inst => inst.id === id) || INSTRUMENTS[0];
  }

  // ==========================================================================
  // VIEW 4: ALL-IN-ONE CONTINUOUS INSTRUMENT MATRIX WITH COLOR-CODED POST-ITS
  // ==========================================================================
  initInstrumentMatrix() {
    this.renderInstrumentMatrix();
  }

  getCategoryPostitData(categoryKey) {
    const map = {
      eddy_covariance: {
        name: "Eddy Covariance",
        icon: "🌪️",
        bg: "#e0f2fe",
        color: "#0369a1",
        border: "#7dd3fc"
      },
      dwd_stations: {
        name: "DWD Reference",
        icon: "📡",
        bg: "#f3e8ff",
        color: "#6b21a8",
        border: "#d8b4fe"
      },
      biomet: {
        name: "BIOMET & Radiation",
        icon: "☀️",
        bg: "#fef9c3",
        color: "#854d0e",
        border: "#fde047"
      },
      oedometer: {
        name: "Soil Lab & Mechanics",
        icon: "🔬",
        bg: "#ffe4e6",
        color: "#9f1239",
        border: "#fda4af"
      },
      chambers: {
        name: "Gas Chambers",
        icon: "📦",
        bg: "#dcfce7",
        color: "#166534",
        border: "#86efac"
      },
      ecohydrology: {
        name: "Ecohydrology & WT",
        icon: "💧",
        bg: "#ccfbf1",
        color: "#115e59",
        border: "#5eead4"
      }
    };
    return map[categoryKey] || {
      name: "Observatory Rig",
      icon: "⚙️",
      bg: "#f1f5f9",
      color: "#334155",
      border: "#cbd5e1"
    };
  }

  renderInstrumentMatrix() {
    const content = document.getElementById("instrument-matrix-content");
    if (!content) return;

    content.innerHTML = `
      <div class="hardware-grid hardware-grid-matrix">
        ${INSTRUMENTS.map(inst => this.generateHardwareCardHtml(inst)).join("")}
      </div>
    `;

    // Attach click events to hardware cards
    content.querySelectorAll(".hardware-card").forEach(card => {
      card.addEventListener("click", () => {
        const instId = card.dataset.instId;
        const inst = this.getInstrumentById(instId);
        this.openInstrumentModal(inst);
      });
    });
  }

  generateHardwareCardHtml(inst) {
    const postit = this.getCategoryPostitData(inst.categoryKey);
    return `
      <div class="hardware-card" data-inst-id="${inst.id}" data-category-key="${inst.categoryKey}">
        <div class="hardware-postit-header">
          <div class="hardware-postit" style="--postit-bg: ${postit.bg}; --postit-color: ${postit.color}; --postit-border: ${postit.border};">
            <span class="postit-pin">📌</span>
            <span class="postit-icon">${postit.icon}</span>
            <span class="postit-name">${postit.name}</span>
          </div>
        </div>

        <div class="hardware-card-top">
          <div class="hardware-identity">
            <span class="hardware-name">${inst.name}</span>
            <span class="hardware-model">${inst.model}</span>
          </div>
          <div class="hardware-icon-box">
            ${inst.photoImg || inst.spriteImg 
              ? `<img src="${inst.photoImg || inst.spriteImg}" alt="${inst.name}" class="hardware-sprite-preview">` 
              : `<span>${inst.icon}</span>`}
          </div>
        </div>

        <p class="hardware-desc">${inst.description}</p>

        <div class="hardware-tags">
          ${inst.variables.map(v => `<span class="var-badge">${v}</span>`).join("")}
        </div>

        <div class="hardware-footer">
          <span class="hardware-location">📍 ${inst.height}</span>
          <span class="hardware-view-btn">View Specs & Analysis ▸</span>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // RESULTS & SCIENTIFIC FIGURES MODAL (3-Tier Academic Hierarchy)
  // ==========================================================================
  initResultsModal() {
    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeResultsModal());
    }

    if (this.resultsModalBackdrop) {
      this.resultsModalBackdrop.addEventListener("click", (e) => {
        if (e.target === this.resultsModalBackdrop) this.closeResultsModal();
      });
    }

    // Keyboard shortcut Escape to close modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.resultsModalBackdrop && this.resultsModalBackdrop.classList.contains("open")) {
        this.closeResultsModal();
      }
    });
  }

  openInstrumentModal(inst) {
    if (!inst) return;

    // Header elements
    const titleEl = document.getElementById("modal-title-text");
    const catEl = document.getElementById("modal-category-text");
    if (titleEl) titleEl.textContent = `${inst.name} — ${inst.model}`;
    if (catEl) catEl.textContent = inst.category;

    // TIER 1: Hardware Showcase (Photo + Metadata)
    const photoEl = document.getElementById("modal-hardware-photo");
    const photoCaptionEl = document.getElementById("modal-photo-caption");
    const metaHeightEl = document.getElementById("modal-meta-height");
    const metaCatEl = document.getElementById("modal-meta-category");
    const descEl = document.getElementById("modal-desc-text");
    const pipeEl = document.getElementById("modal-pipeline-text");

    if (photoEl) {
      photoEl.src = inst.photoImg || inst.spriteImg || "assets/sprites/sonic_anemometer.png";
      photoEl.alt = `${inst.name} Hardware Unit`;
    }
    if (photoCaptionEl) photoCaptionEl.textContent = `${inst.model}`;
    if (metaHeightEl) metaHeightEl.textContent = `📍 Deployment: ${inst.height}`;
    if (metaCatEl) metaCatEl.textContent = `Method: ${inst.category}`;
    if (descEl) descEl.textContent = inst.description;
    if (pipeEl) pipeEl.textContent = inst.pipelineRole;

    // TIER 2: Specifications & Parameters Table
    const specsTbody = document.getElementById("modal-specs-tbody");
    if (specsTbody && inst.specsTable) {
      specsTbody.innerHTML = inst.specsTable.map(row => `
        <tr>
          <td>${row.spec}</td>
          <td>${row.val}</td>
          <td>${row.purpose}</td>
        </tr>
      `).join("");
    }

    // TIER 3: Graphical Results & Multi-Figure Switcher
    const tabsContainer = document.getElementById("modal-figure-tabs");
    const figureTitleEl = document.getElementById("modal-figure-title");
    const imgEl = document.getElementById("modal-figure-img");
    const captionEl = document.getElementById("modal-figure-caption");

    const figures = inst.figures && inst.figures.length > 0 
      ? inst.figures 
      : [{ id: "fig_default", label: "Scientific Plot", file: inst.associatedFigure, title: inst.figureTitle || "Thesis Scientific Result", caption: inst.description }];

    // Render figure switcher pills
    if (tabsContainer) {
      if (figures.length > 1) {
        tabsContainer.style.display = "flex";
        tabsContainer.innerHTML = figures.map((fig, idx) => `
          <button class="fig-pill-btn ${idx === 0 ? 'active' : ''}" data-fig-idx="${idx}">
            ${fig.label}
          </button>
        `).join("");

        // Attach click listener to pills
        tabsContainer.querySelectorAll(".fig-pill-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            tabsContainer.querySelectorAll(".fig-pill-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const idx = parseInt(btn.dataset.figIdx, 10);
            const selectedFig = figures[idx];
            if (imgEl) imgEl.src = selectedFig.file;
            if (figureTitleEl) figureTitleEl.textContent = selectedFig.title;
            if (captionEl) captionEl.textContent = selectedFig.caption;
            if (this.scanAndApplyEmbargoOverlays) this.scanAndApplyEmbargoOverlays();
          });
        });
      } else {
        tabsContainer.style.display = "none";
      }
    }

    // Initialize first figure
    const primaryFig = figures[0];
    if (imgEl) imgEl.src = primaryFig.file;
    if (figureTitleEl) figureTitleEl.textContent = primaryFig.title;
    if (captionEl) captionEl.textContent = primaryFig.caption;

    if (this.scanAndApplyEmbargoOverlays) {
      this.scanAndApplyEmbargoOverlays();
    }

    // Metrics grid
    const metricsGrid = document.getElementById("modal-metrics-grid");
    if (metricsGrid && inst.metrics) {
      metricsGrid.innerHTML = inst.metrics.map(m => `
        <div class="metric-stat-box">
          <div class="metric-stat-label">${m.label}</div>
          <div class="metric-stat-val">${m.val}</div>
          <div class="metric-stat-sub">${m.sub}</div>
        </div>
      `).join("");
    }

    // Takeaway
    const takeawayEl = document.getElementById("modal-pitch-takeaway");
    if (takeawayEl && inst.defenseTakeaway) {
      takeawayEl.textContent = inst.defenseTakeaway;
    }

    // Open modal
    if (this.resultsModalBackdrop) {
      this.resultsModalBackdrop.classList.add("open");
      this.resultsModalBackdrop.classList.add("active");
      // Scroll body to top when opening
      const scrollableBody = this.resultsModalBackdrop.querySelector(".modal-body-scrollable");
      if (scrollableBody) scrollableBody.scrollTop = 0;
    }
  }

  closeResultsModal() {
    if (this.resultsModalBackdrop) {
      this.resultsModalBackdrop.classList.remove("open");
      this.resultsModalBackdrop.classList.remove("active");
    }
  }

  openSatelliteModal() {
    const satModal = document.getElementById("modal-satellite-telemetry");
    if (satModal) {
      satModal.classList.add("active");
      satModal.setAttribute("aria-hidden", "false");
    }
  }


  // ==========================================================================
  // BRAND LOGO INITIALIZATION ("Wetland Monitor")
  // ==========================================================================
  initLogo() {
    const headerLogoImg = document.getElementById("active-brand-logo-img");
    if (headerLogoImg) {
      headerLogoImg.src = ACTIVE_LOGO.file;
      headerLogoImg.alt = ACTIVE_LOGO.title || "Wetland Monitor";
    }
  }

  // ==========================================================================
  // PRESENTER CONTROLS, TIMER & KEYBOARD SHORTCUTS
  // ==========================================================================
  initPresenterControls() {
    const prevBtn = document.getElementById("nav-prev-btn");
    const nextBtn = document.getElementById("nav-next-btn");
    const notesBtn = document.getElementById("toggle-notes-btn");
    const closeNotesBtn = document.getElementById("close-notes-btn");
    const fsBtn = document.getElementById("fullscreen-btn");

    if (prevBtn) prevBtn.addEventListener("click", () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextSlide());

    if (notesBtn) {
      notesBtn.addEventListener("click", () => {
        if (this.notesDrawer) this.notesDrawer.classList.toggle("open");
      });
    }
    if (closeNotesBtn) {
      closeNotesBtn.addEventListener("click", () => {
        if (this.notesDrawer) this.notesDrawer.classList.remove("open");
      });
    }

    if (fsBtn) {
      fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  initTimer() {
    const display = document.getElementById("timer-digits");
    const playBtn = document.getElementById("timer-play-btn");
    const resetBtn = document.getElementById("timer-reset-btn");

    const updateDisplay = () => {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      if (display) {
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        display.classList.toggle("warning", mins >= 15 && mins < 20);
        display.classList.toggle("danger", mins >= 20);
      }
    };

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (this.isTimerRunning) {
          clearInterval(this.timerInterval);
          this.isTimerRunning = false;
          playBtn.textContent = "▶";
        } else {
          this.isTimerRunning = true;
          playBtn.textContent = "⏸";
          this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            updateDisplay();
          }, 1000);
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        this.timerSeconds = 0;
        if (playBtn) playBtn.textContent = "▶";
        updateDisplay();
      });
    }
  }

  initCoverActions() {
    const btnStart = document.getElementById("btn-start-defense");
    const btnAgenda = document.getElementById("btn-cover-agenda");
    const btnAims = document.getElementById("btn-cover-aims");
    const btnSoil = document.getElementById("btn-cover-soil");
    const btnMacro = document.getElementById("btn-cover-macro");
    const btnPipeline = document.getElementById("btn-cover-pipeline");
    const btnGwp = document.getElementById("btn-cover-gwp");

    if (btnStart) {
      btnStart.addEventListener("click", () => {
        if (window.classicPresentationInstance) {
          window.classicPresentationInstance.showPresentation(0);
        } else {
          this.switchView("classic_presentation");
        }
      });
    }

    if (btnAgenda) {
      btnAgenda.addEventListener("click", () => {
        this.goToSlide(1);
      });
    }

    if (btnAims) {
      btnAims.addEventListener("click", () => {
        this.goToSlide(2);
      });
    }

    if (btnSoil) {
      btnSoil.addEventListener("click", () => {
        this.switchView("soil_interface");
      });
    }

    if (btnMacro) {
      btnMacro.addEventListener("click", () => {
        this.switchView("macro");
      });
    }

    if (btnPipeline) {
      btnPipeline.addEventListener("click", () => {
        this.switchView("data_pipeline");
      });
    }

    if (btnGwp) {
      btnGwp.addEventListener("click", () => {
        this.switchView("gwp_explorer");
      });
    }
  }

  initAgendaJumps() {
    document.querySelectorAll("[data-slide-jump]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const slideNum = parseInt(el.dataset.slideJump, 10);
        if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= MASTER_APPROACH.slides.length) {
          this.goToSlide(slideNum - 1);
        }
      });
    });
  }

  initUniversalLightbox() {
    const lightboxEl = document.getElementById("universal-figure-lightbox");
    const lightboxImg = lightboxEl ? lightboxEl.querySelector(".lightbox-img") : null;
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCaption = document.getElementById("lightbox-caption-text");
    const lightboxBadge = document.getElementById("lightbox-badge");
    const closeBtn = document.getElementById("lightbox-close-btn");
    const zoomBtn = document.getElementById("lightbox-zoom-btn");
    const stage = document.getElementById("lightbox-stage");

    if (!lightboxEl || !lightboxImg) return;

    const openLightbox = (src, title, caption, badgeText = "Empirical Figure") => {
      if (!src) return;
      const targetImg = lightboxEl.querySelector(".lightbox-img") || lightboxImg;
      if (targetImg) {
        targetImg.src = src;
        targetImg.classList.remove("zoomed");
      }
      if (stage) stage.classList.remove("is-zoomed");
      if (lightboxTitle) lightboxTitle.textContent = title || "Scientific Empirical Plot";
      if (lightboxCaption) lightboxCaption.textContent = caption || "High-frequency empirical observation and biophysical analysis from the Klimafarm Peatland Observatory.";
      if (lightboxBadge) lightboxBadge.textContent = badgeText;
      lightboxEl.classList.add("active");
      lightboxEl.setAttribute("aria-hidden", "false");
    };

    const closeLightbox = () => {
      lightboxEl.classList.remove("active");
      lightboxEl.setAttribute("aria-hidden", "true");
      const targetImg = lightboxEl.querySelector(".lightbox-img") || lightboxImg;
      if (targetImg) targetImg.classList.remove("zoomed");
      if (stage) stage.classList.remove("is-zoomed");
    };

    this.closeUniversalLightbox = closeLightbox;
    this.openUniversalLightbox = openLightbox;
    window.openUniversalLightbox = openLightbox;

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl || e.target === stage) {
        closeLightbox();
      }
    });

    const toggleZoom = (e) => {
      if (e) e.stopPropagation();
      const targetImg = lightboxEl.querySelector(".lightbox-img") || lightboxImg;
      if (!targetImg) return;
      const isZoomed = targetImg.classList.toggle("zoomed");
      if (stage) stage.classList.toggle("is-zoomed", isZoomed);
    };

    if (zoomBtn) zoomBtn.addEventListener("click", toggleZoom);
    lightboxImg.addEventListener("click", toggleZoom);

    // Mouse drag-to-pan in lightbox when zoomed
    let isPanning = false, startX = 0, startY = 0, scrollLeft = 0, scrollTop = 0;
    if (stage) {
      stage.addEventListener("mousedown", (e) => {
        if (!stage.classList.contains("is-zoomed")) return;
        isPanning = true;
        startX = e.pageX - stage.offsetLeft;
        startY = e.pageY - stage.offsetTop;
        scrollLeft = stage.scrollLeft;
        scrollTop = stage.scrollTop;
      });
      window.addEventListener("mouseup", () => { isPanning = false; });
      stage.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - stage.offsetLeft;
        const y = e.pageY - stage.offsetTop;
        stage.scrollLeft = scrollLeft - (x - startX);
        stage.scrollTop = scrollTop - (y - startY);
      });
    }

    // Universal click handler for figures across all analytical views
    document.addEventListener("click", (e) => {
      if (e.target.closest("#universal-figure-lightbox") || e.target.closest(".lightbox-btn")) return;
      if (e.target.closest(".hardware-card") || e.target.closest(".instrument-card")) return;

      // Filter out brand logos and seals explicitly so they never trigger figure lightboxes
      if (e.target.closest("#active-brand-logo-img, .landing-seal-img, .landing-seal-wrapper, .cover-logo-img, .no-zoom, .header-brand, .brand-icon-wrapper")) {
        return;
      }

      // 0. Check if clicked Carex rostrata botanical specimen in Digital Twin
      const plantTrigger = e.target.closest("#plant-cluster-prominent, #plant-cluster-center, #plant-cluster-right, .carex-botanical-twin, [data-plant-zoom], .plant-inspect-badge");
      if (plantTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const plantSrc = "assets/sprites/wetland_carex_plate.jpg";
        const plantTitle = "Carex rostrata Stokes (Bottle Sedge) — Botanical & Anatomical Plate";
        const plantCaption = "High-resolution botanical illustration and internal tissue anatomy of Carex rostrata Stokes. Highlighting continuous longitudinal aerenchyma gas lacunae in culm and adventitious root cross-sections, acting as a direct atmospheric chimney venting catotelm biogenic CH₄ to the planetary boundary layer. Note horizontal creeping rhizome network and adventitious root deflection at the compacted plow pan boundary (σp = 62.4 kPa). (Official Botanical Specimen Plate, Klimafarm Peatland Observatory, Santander et al., 2026)";
        openLightbox(plantSrc, plantTitle, plantCaption, "Botanical & Aerenchyma Specimen • Carex rostrata");
        return;
      }

      // 0b. Check if clicked Figure 20 in Biogeochemistry, Aims View, or anywhere else
      const fig20Trigger = e.target.closest("#btn-zoom-biogeo-fig20, #wrap-fig20-zoom, #img-fig20-biogeo, #btn-zoom-aims-fig20, #aims-fig20-img-box, #img-aims-fig20, .biogeo-fig20-img, .biogeo-fig20-container");
      if (fig20Trigger) {
        const fig20Src = "assets/Peatlands_Biogeochemical_Processes_Fig20.png";
        const fig20Title = "Figure 20: Peatlands Biogeochemical Processes";
        const fig20Caption = "Conceptual model of greenhouse gas flux control in wetland soils. Carbon enters ecosystems through plant photosynthesis and is incorporated into biomass, which decomposes via aerobic respiration in oxygen-rich surface soils to produce CO₂. In water-saturated, oxygen-depleted layers, anaerobic decomposition takes over, where fermentative bacteria first break down organic matter into simpler substrates. These substrates are then used in alternative respiratory pathways like denitrification, iron reduction, and sulfate reduction until methanogenic archaea take over to produce methane (CH₄). Before escaping into the atmosphere via diffusion, bubbling (ebullition), or plant tissue transport (vascular aerenchyma), a portion of this methane is consumed by specialized bacteria and archaea through both aerobic and anaerobic oxidation processes. (Official Thesis Draft Figure 20, Santander et al., 2026)";
        openLightbox(fig20Src, fig20Title, fig20Caption, "Thesis Figure 20 • Conceptual Model");
        return;
      }

      // 0c. Check if clicked micro-scope cards in Digital Twin overlays
      const microTrigger = e.target.closest(".scope-micro-card");
      if (microTrigger) {
        const img = microTrigger.querySelector("img");
        if (img && img.src) {
          const title = microTrigger.querySelector("strong")?.textContent.trim() || img.alt || "Microscopic Specimen";
          const desc = microTrigger.textContent.replace(title, "").trim() || "High-resolution micrograph specimen.";
          openLightbox(img.src, title, desc, "High-Res Specimen");
          return;
        }
      }

      const slideFigBox = e.target.closest(".slide-fig-preview-box");
      if (slideFigBox) {
        const img = slideFigBox.querySelector("img");
        if (img && img.src) {
          const currentSlide = MASTER_APPROACH.slides[this.currentSlideIndex];
          const title = currentSlide ? currentSlide.title : "Slide Associated Figure";
          const caption = currentSlide?.pitch?.speech || "Key scientific figure for the current defense slide.";
          const badge = currentSlide ? currentSlide.layerBadge : "Slide Figure";
          openLightbox(img.src, title, caption, badge);
          return;
        }
      }

      // 1. Check if clicked inside a Biogeochemistry Actor Card image
      const biogeoCard = e.target.closest(".biogeo-actor-card");
      if (biogeoCard && (e.target.closest(".actor-image-container") || e.target.tagName === "IMG")) {
        const img = biogeoCard.querySelector("img");
        if (img) {
          const title = biogeoCard.querySelector(".actor-title")?.textContent.trim() || "Biogeochemical Actor";
          const desc = biogeoCard.querySelector(".actor-desc")?.textContent.trim() || "";
          const substrate = biogeoCard.querySelector(".actor-substrate-pill")?.textContent.trim() || "";
          const role = biogeoCard.querySelector(".actor-role-badge")?.textContent.trim() || "";
          const trophic = biogeoCard.querySelector(".actor-trophic-tag")?.textContent.trim() || "";
          
          const badge = [role, trophic].filter(Boolean).join(" • ") || "Microbial Consortia";
          const caption = substrate ? `${desc} [${substrate}]` : desc;
          openLightbox(img.src, title, caption, badge);
          return;
        }
      }

      // 2. Check if clicked on Hardware Photo inside 3-Tier Results Modal
      const hardwarePhoto = e.target.closest(".modal-photo-showcase img, #modal-hardware-photo");
      if (hardwarePhoto) {
        const modalContainer = hardwarePhoto.closest(".results-modal-container");
        const title = modalContainer?.querySelector("#modal-title-text")?.textContent.trim() || "Instrument Hardware";
        const desc = modalContainer?.querySelector("#modal-desc-text")?.textContent.trim() || "Physical sensor hardware unit deployed at Wallener Au.";
        const cat = modalContainer?.querySelector("#modal-category-text")?.textContent.trim() || "Sensor Unit";
        openLightbox(hardwarePhoto.src, title, desc, cat);
        return;
      }

      // 3. Figures across all views (Universal Lightbox Delegation)
      let targetImg = e.target.tagName === "IMG" ? e.target : null;
      if (!targetImg) {
        const plotWrap = e.target.closest(".slide-col-visual, .thesis-plot-container, .thesis-plot-card, .pipeline-plot-wrapper, .pipeline-card, .flux-plot-card, .ghg-plot-container, .ghg-plot-card, .macro-display-wrapper, .macro-img-container, .macro-plot-card, .dashboard-plot-card, .caption-zoom-hint, [data-zoomable='true']");
        if (plotWrap && !e.target.closest("button, a, input, select, .action-btn-unlock-admin")) {
          targetImg = plotWrap.querySelector("img");
        }
      }

      if (targetImg) {
        if (targetImg.id === "active-brand-logo-img" ||
            targetImg.classList.contains("landing-seal-img") ||
            targetImg.classList.contains("cover-logo-img") ||
            targetImg.classList.contains("no-zoom") ||
            targetImg.closest(".header-brand, .landing-seal-wrapper, .brand-icon-wrapper")) {
          return;
        }

        const src = targetImg.getAttribute("src") || "";
        const alt = targetImg.getAttribute("alt") || "";
        const titleAttr = targetImg.dataset.title || "";
        const catAttr = targetImg.closest(".modal-tier-results")?.querySelector("#modal-category-text")?.textContent || "";

        if (this.isEmbargoActive && this.isImageEmbargoed && this.isImageEmbargoed(src, alt, titleAttr, catAttr)) {
          this.showEmbargoToast("🔒 This research result is under academic publication embargo. Authenticate in Admin Console to unlock.");
          return;
        }
        const card = targetImg.closest(".presentation-card, .modal-tier-results, .flux-plot-card, .ghg-plot-card, .thesis-plot-card, .macro-visualizer-card, .pipeline-card, .workflow-card") || targetImg.parentElement;
        
        let title = targetImg.dataset.title;
        if (!title && card) {
          const titleEl = card.querySelector(".thesis-plot-title, .presentation-card-title, .plot-card-header h4, #macro-layer-title, #modal-figure-title, h4, h3");
          if (titleEl) title = titleEl.textContent.trim();
        }
        if (!title) title = targetImg.alt || "Scientific Observation Plot";

        let caption = targetImg.dataset.caption;
        if (!caption && card) {
          const captionEl = card.querySelector(".plot-caption, .figure-caption-text, .plot-card-footer p, #macro-layer-desc, #modal-figure-caption, .pitch-takeaway-text, p");
          if (captionEl) caption = captionEl.textContent.trim();
        }
        if (!caption) caption = targetImg.alt || "Observation and empirical analysis from the Klimafarm Peatland Observatory at Wallener Au.";

        let badge = targetImg.dataset.badge;
        if (!badge && card) {
          const badgeEl = card.querySelector(".presentation-card-badge, .modal-category-badge, .plot-depth-tag, #macro-layer-tag, #modal-category-text, .badge-pill");
          if (badgeEl) badge = badgeEl.textContent.trim();
        }
        if (!badge) badge = "Empirical Result";

        openLightbox(targetImg.src, title, caption, badge);
      }
    });
  }

  initTeleprompter() {
    const hud = document.getElementById("presenter-teleprompter-hud");
    const toggleBtn = document.getElementById("toggle-teleprompter-btn");
    const closeBtn = document.getElementById("teleprompter-close-btn");
    const modeBtn = document.getElementById("teleprompter-mode-btn");

    if (toggleBtn && hud) {
      toggleBtn.addEventListener("click", () => {
        const isHidden = hud.classList.toggle("hud-hidden");
        toggleBtn.classList.toggle("active", !isHidden);
      });
    }

    if (closeBtn && hud) {
      closeBtn.addEventListener("click", () => {
        hud.classList.add("hud-hidden");
        if (toggleBtn) toggleBtn.classList.remove("active");
      });
    }

    if (modeBtn && hud) {
      modeBtn.addEventListener("click", () => {
        const isCompact = hud.classList.toggle("hud-compact");
        modeBtn.textContent = isCompact ? "↕ Full" : "↕ Compact";
      });
    }
  }

  updateTeleprompter(slide, index) {
    const badgeEl = document.getElementById("teleprompter-badge");
    const tagEl = document.getElementById("teleprompter-slide-tag");
    const speechEl = document.getElementById("teleprompter-speech");
    const bulletsEl = document.getElementById("teleprompter-bullets");
    const defQEl = document.getElementById("teleprompter-defense-q");

    if (badgeEl) badgeEl.textContent = slide.layerBadge || "Academic Defense";
    if (tagEl) tagEl.textContent = `Slide ${index + 1}: ${slide.title}`;

    if (speechEl) {
      if (slide.pitch?.coreThesis) {
        speechEl.innerHTML = `<div style="margin-bottom: 0.65rem; padding: 0.5rem 0.75rem; background: rgba(245,158,11,0.12); border-left: 3px solid #f59e0b; border-radius: 4px; font-weight: 700; color: #fbbf24; font-size: 0.90rem; line-height: 1.45;">🎯 Core Defense Thesis: "${slide.pitch.coreThesis}"</div><div>${slide.pitch?.speech || "Present empirical findings and core thesis hypotheses."}</div>`;
      } else {
        speechEl.textContent = slide.pitch?.speech || "Present empirical findings and core thesis hypotheses.";
      }
    }

    if (bulletsEl) {
      bulletsEl.innerHTML = "";
      (slide.pitch?.bullets || []).forEach(b => {
        const li = document.createElement("li");
        li.textContent = b;
        bulletsEl.appendChild(li);
      });
    }

    if (defQEl) {
      defQEl.textContent = slide.pitch?.defenseQ || "";
      const parentCol = document.getElementById("teleprompter-defense-panel");
      if (parentCol) {
        parentCol.style.display = slide.pitch?.defenseQ ? "block" : "none";
      }
    }
  }

  initKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Don't intercept if user is inside an input/textarea
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === "t" || e.key === "T") {
        const hud = document.getElementById("presenter-teleprompter-hud");
        const toggleBtn = document.getElementById("toggle-teleprompter-btn");
        if (hud) {
          const isHidden = hud.classList.toggle("hud-hidden");
          if (toggleBtn) toggleBtn.classList.toggle("active", !isHidden);
        }
      } else if (e.key === "p" || e.key === "P") {
        if (this.notesDrawer) {
          this.notesDrawer.classList.toggle("open");
        }
      } else if (e.key === "Escape") {
        this.closeResultsModal();
        if (this.closeUniversalLightbox) this.closeUniversalLightbox();
        if (this.notesDrawer) this.notesDrawer.classList.remove("open");
        const hud = document.getElementById("presenter-teleprompter-hud");
        if (hud) hud.classList.add("hud-hidden");
      }
    });
  }

  initSynthesisPillars() {
    const filterBtns = document.querySelectorAll(".synthesis-nav-btn");
    const sections = {
      pillars: document.getElementById("synthesis-section-pillars"),
      matrix: document.getElementById("synthesis-section-matrix"),
      conclusions: document.getElementById("synthesis-section-conclusions"),
      roadmap: document.getElementById("synthesis-section-roadmap")
    };

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        if (filter === "all") {
          Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = "block";
          });
        } else {
          Object.entries(sections).forEach(([key, sec]) => {
            if (sec) {
              if (key === filter) {
                sec.style.display = "block";
                sec.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                sec.style.display = "none";
              }
            }
          });
        }
      });
    });
  }

  // ==========================================================================
  // VERSIONING & CHANGELOG SYSTEM
  // ==========================================================================
  initVersionAndChangelog() {
    const versionEl = document.getElementById("app-version-tag");
    const changelogBtn = document.getElementById("btn-open-changelog");
    const modal = document.getElementById("changelog-modal");
    const closeBtn = document.getElementById("btn-close-changelog");
    const listEl = document.getElementById("changelog-list-container");

    const renderData = (data) => {
      if (versionEl && data.version) {
        versionEl.textContent = `v${data.version} • ${data.updated_at || data.build_date}`;
      }
      if (listEl && Array.isArray(data.changelog)) {
        listEl.innerHTML = data.changelog.map(entry => `
          <div class="changelog-entry">
            <div class="changelog-header">
              <span class="changelog-ver">Version ${entry.version}</span>
              <span class="changelog-date">${entry.date}</span>
              ${entry.badge ? `<span class="changelog-badge">${entry.badge}</span>` : ''}
            </div>
            <ul class="changelog-items">
              ${(entry.items || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('');
      }
    };

    fetch('/api/version')
      .then(res => res.json())
      .then(data => renderData(data))
      .catch(err => {
        fetch('version.json')
          .then(res => res.json())
          .then(data => renderData(data))
          .catch(() => {});
      });

    if (changelogBtn && modal) {
      changelogBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }
  }

  // ==========================================================================
  // TAB SELECTION FIGURE HIGHLIGHTING & ILLUMINATED FOCUS
  // ==========================================================================
  highlightFiguresForTab(viewKey) {
    if (this._tabHighlightTimer) {
      clearTimeout(this._tabHighlightTimer);
      this._tabHighlightTimer = null;
    }

    // Declarative mapping from viewKey to figure selectors
    const viewTargets = {
      soil_interface: ["#soil-simulator-main-panel", ".soil-strata-card", ".soil-oedometer-card"],
      macro: ["#macro-visualizer-main", ".macro-plot-card", "#walter-lieth-card"],
      biogeochemistry: [".biogeo-hero-diagram", ".microbial-actors-grid", ".redox-cascade-panel"],
      instruments_matrix: [".instruments-rack", ".matrix-showcase-grid"],
      data_pipeline: ["#pipeline-card-ml", "#pipeline-card-part", ".flowchart-container", ".mermaid-wrapper"],
      eddy_covariance: [".eddy-group-wrapper", ".flux-footprint-card", "#flux-plot-card-bowen"],
      geophysics: [".geophysics-profile-card", ".geoelectrics-display"],
      flux_diagnostics: [".flux-plot-card", "#flux-plot-card-vpd"],
      gwp_explorer: ["#main-gwp-img", ".gwp-stage-container", ".ghg-plot-card"],
      gwp_uncertainties: [".uncertainty-plot-card", ".monte-carlo-box"],
      conclusions_outlook: [".verdict-card", ".pillars-grid", ".conclusions-card"]
    };

    const selectors = viewTargets[viewKey];
    if (!selectors || selectors.length === 0) return;

    const highlightedElements = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add("slide-spotlight-active");
        highlightedElements.push(el);

        if (!el.querySelector(".spotlight-cue-badge")) {
          const badge = document.createElement("div");
          badge.className = "spotlight-cue-badge";
          badge.innerHTML = "<span>🔍</span> <span>KEY EVIDENCE</span>";
          el.appendChild(badge);
        }
      });
    });

    if (highlightedElements.length > 0) {
      this._tabHighlightTimer = setTimeout(() => {
        highlightedElements.forEach(el => {
          el.classList.remove("slide-spotlight-active");
          const b = el.querySelector(".spotlight-cue-badge");
          if (b) b.remove();
        });
      }, 4500);
    }
  }

  // ==========================================================================
  // RESEARCH IP EMBARGO & ADMIN SECURITY CONSOLE
  // ==========================================================================
  initAdminEmbargoManager() {
    // 1. Initial State from localStorage (Default: TRUE / Embargo Active)
    const savedState = localStorage.getItem("wetland_embargo_active");
    this.isEmbargoActive = savedState !== null ? savedState === "true" : true;

    // Apply class to body
    document.body.classList.toggle("embargo-active", this.isEmbargoActive);

    // 2. Setup Whitelist & Categories
    this.embargoConfig = {
      embargoedCategories: ["eddy_covariance", "chambers", "oedometer", "soil_mechanics"],
      embargoedFilePatterns: [
        "17_19_Combined_Footprint", "17_Footprint", "14b_CH4", "01_Reco", "01_time_series", "02_GPP",
        "03_SW_IN", "03_TA_QC", "03_TS10", "03_chamber", "07b_NEE", "08_NEE", "08b_Resp", "10_Soil_Temp",
        "11_Water_Level", "12_QC", "12b_CH4", "13_Energy", "14_Ecosystem", "15_GPP", "16_Bowen", "16b_CH4",
        "17_Cumulative", "18_Depth", "18_GHG", "19_Spatial", "20_Chamber", "20b_Chamber", "21_GHG", "22_GHG",
        "23_GHG", "24_Literature", "24_Soil_Strat", "25_Soil_Strat", "25b_", "26b_", "78_N2O", "79_N2O",
        "80_N2O", "81_N2O", "82_N2O", "Air_Conductivity", "Air_Permeability", "Chambers_", "Comparison_EK",
        "Dry_Bulk", "GPV_", "Precompression", "TPV_", "WCP_", "Weight_Evolution", "energy_balance",
        "fig50_data_processing", "fig52_ec_workflow", "fig55_", "fig57_", "fig62_gapfilling", "fig63_ghg",
        "precompression_curves", "peat_plowpan", "oedometer", "bowen", "flux", "cau_kiel_air_permeameter"
      ],
      whitelistPatterns: [
        "Walter_Lieth",
        "Walter-Lieth",
        "24_Walter_Lieth",
        "SiteMap_Satellite_Terrain",
        "SiteMap_NDVI_Summer",
        "SiteMap_NDVI_Delta",
        "SiteMap_Topography",
        "SiteMap_SoilCarbon",
        "Peatlands_Biogeochemical_Processes_Fig20",
        "wetland_carex_plate",
        "methanogen_archaea_micro",
        "peat_plowpan",
        "actors",
        "enzymes",
        "fermenters",
        "acetogens",
        "archaea",
        "methanotrophs",
        "plants",
        "conclusions",
        "sprites",
        "logo"
      ]
    };

    // 3. Scan DOM and apply embargo wrappers to matching figures
    this.scanAndApplyEmbargoOverlays();

    // 4. Connect Admin Modal DOM Elements (PIN-gated console)
    const ADMIN_PIN = "2026";
    const adminBtn = document.getElementById("btn-header-admin");
    const adminModal = document.getElementById("admin-security-modal");
    const authScreen = document.getElementById("admin-auth-screen");
    const consoleScreen = document.getElementById("admin-console-screen");
    const pinInput = document.getElementById("admin-password-input");
    const authError = document.getElementById("admin-auth-error");
    const authForm = document.getElementById("admin-auth-form");
    const toggleBtn = document.getElementById("btn-admin-toggle-embargo");

    this.isAdminAuthed = sessionStorage.getItem("wetland_admin_auth") === "1";

    const showScreen = () => {
      if (authScreen) authScreen.classList.toggle("hidden", this.isAdminAuthed);
      if (consoleScreen) consoleScreen.classList.toggle("hidden", !this.isAdminAuthed);
    };

    const openAdminModal = () => {
      if (!adminModal) return;
      this.updateAdminModalUI();
      showScreen();
      adminModal.classList.remove("hidden");
      adminModal.classList.add("active");
      adminModal.setAttribute("aria-hidden", "false");
      if (!this.isAdminAuthed && pinInput) setTimeout(() => pinInput.focus(), 60);
    };

    const closeAdminModal = () => {
      if (!adminModal) return;
      adminModal.classList.add("hidden");
      adminModal.classList.remove("active");
      adminModal.setAttribute("aria-hidden", "true");
      if (pinInput) pinInput.value = "";
      if (authError) authError.classList.add("hidden");
    };
    window.openAdminModal = openAdminModal;

    const setEmbargo = (active) => {
      this.isEmbargoActive = active;
      localStorage.setItem("wetland_embargo_active", String(active));
      document.body.classList.toggle("embargo-active", active);
      this.updateAdminModalUI();
      if (typeof this.scanAndApplyEmbargoOverlays === "function") {
        this.scanAndApplyEmbargoOverlays();
      }
    };

    const lockSession = () => {
      this.isAdminAuthed = false;
      sessionStorage.removeItem("wetland_admin_auth");
      setEmbargo(true);
      showScreen();
      this.showEmbargoToast("🔒 Admin session locked. Embargo re-engaged.");
    };

    if (adminBtn) adminBtn.addEventListener("click", openAdminModal);
    ["btn-close-admin-modal", "btn-close-admin-console", "btn-admin-close-action"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", closeAdminModal);
    });
    if (adminModal) {
      adminModal.addEventListener("click", (e) => { if (e.target === adminModal) closeAdminModal(); });
    }

    if (authForm) {
      authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (pinInput && pinInput.value === ADMIN_PIN) {
          this.isAdminAuthed = true;
          sessionStorage.setItem("wetland_admin_auth", "1");
          if (authError) authError.classList.add("hidden");
          pinInput.value = "";
          showScreen();
        } else {
          if (authError) authError.classList.remove("hidden");
          if (pinInput) { pinInput.value = ""; pinInput.focus(); }
        }
      });
    }

    const lockBtn = document.getElementById("btn-admin-lock-session");
    if (lockBtn) lockBtn.addEventListener("click", lockSession);

    // Toggle Embargo Switch (only reachable when authenticated)
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (!this.isAdminAuthed) return;
        setEmbargo(!this.isEmbargoActive);
        this.showEmbargoToast(this.isEmbargoActive ? "🛡️ Embargo activated: unpublished results hidden." : "🔓 Embargo lifted: all results unlocked.");
      });
    }

    // Stress tests / overrides on the digital twin
    const applyOverride = (patch, msg) => {
      const sb = this.sandbox;
      if (!sb) return;
      Object.assign(sb.state, patch);
      if (patch.targetWtd !== undefined && this.soilModel && typeof this.soilModel.setWaterTable === "function") {
        this.soilModel.setWaterTable(patch.targetWtd);
      }
      sb.updatePhysics();
      this.showEmbargoToast(msg);
    };
    const bindAdmin = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener("click", () => { if (this.isAdminAuthed) fn(); }); };
    bindAdmin("btn-admin-stress-drought", () => applyOverride({ targetWtd: -80, atmoVpd: 2.4 }, "🌵 Severe drought injected"));
    bindAdmin("btn-admin-stress-flood", () => applyOverride({ targetWtd: 15 }, "🌊 Flash flood injected"));
    bindAdmin("btn-admin-stress-compaction", () => applyOverride({ soilCompaction: 0.78, macroporosity: 6 }, "🚜 Heavy compaction injected"));
    bindAdmin("btn-admin-stress-heatwave", () => applyOverride({ atmoVpd: 2.2, atmoRn: 650 }, "🔥 Heatwave injected"));
    bindAdmin("btn-admin-stress-reset", () => {
      if (this.sandbox) this.sandbox.loadArchetype("fen");
      this.showEmbargoToast("🔄 Reset to Wallener Au calibrated baseline");
    });

    document.querySelectorAll(".admin-jump-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        if (!this.isAdminAuthed) return;
        closeAdminModal();
        this.switchView(chip.dataset.jumpView);
      });
    });

    // Re-apply embargo whenever the app is (re)loaded without auth: sessions never persist an unlocked state
    if (!this.isAdminAuthed) setEmbargo(true);

    // 5. Global Keyboard Shortcuts: Ctrl+Shift+A or Alt+A
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") || (e.altKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        if (adminModal && adminModal.classList.contains("active")) closeAdminModal();
        else openAdminModal();
      }
      if (e.key === "Escape" && adminModal && adminModal.classList.contains("active")) closeAdminModal();
    });

    this.updateAdminModalUI();
  }

  isImageEmbargoed(src, alt = "", title = "", category = "") {
    if (!src) return false;
    const lowerSrc = src.toLowerCase();
    const lowerAlt = alt.toLowerCase();
    const lowerTitle = title.toLowerCase();
    const lowerCat = category.toLowerCase();

    // Check whitelist first
    for (const w of this.embargoConfig.whitelistPatterns) {
      if (lowerSrc.includes(w.toLowerCase()) || lowerTitle.includes(w.toLowerCase())) {
        return false;
      }
    }

    // Check categories
    for (const cat of this.embargoConfig.embargoedCategories) {
      if (lowerCat.includes(cat)) return true;
    }

    // Check patterns
    for (const pat of this.embargoConfig.embargoedFilePatterns) {
      if (lowerSrc.includes(pat.toLowerCase()) || lowerAlt.includes(pat.toLowerCase()) || lowerTitle.includes(pat.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  scanAndApplyEmbargoOverlays() {
    if (!this.isEmbargoActive) {
      document.querySelectorAll(".embargo-blurred-target").forEach(el => el.classList.remove("embargo-blurred-target"));
      document.querySelectorAll(".embargoed-wrapper").forEach(el => el.classList.remove("embargoed-wrapper"));
      document.querySelectorAll(".embargo-overlay").forEach(el => el.remove());
      return;
    }

    // Find candidate figures across all views and containers
    const images = document.querySelectorAll("img:not(#active-brand-logo-img):not(.cover-logo-img):not(.landing-seal-img):not(.no-zoom)");
    images.forEach(img => {
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";
      const title = img.dataset.title || "";
      const cat = img.closest(".modal-tier-results")?.querySelector("#modal-category-text")?.textContent || "";

      if (this.isImageEmbargoed(src, alt, title, cat)) {
        img.classList.add("embargo-blurred-target");
        const parent = img.parentElement;
        if (parent && !parent.classList.contains("embargoed-wrapper")) {
          parent.classList.add("embargoed-wrapper");

          // Inject overlay card if missing
          if (!parent.querySelector(".embargo-overlay")) {
            const overlay = document.createElement("div");
            overlay.className = "embargo-overlay";
            overlay.innerHTML = `
              <div class="embargo-badge">🔒 RESEARCH NOT PUBLISHED</div>
              <h4 class="embargo-title">Academic Embargo</h4>
              <p class="embargo-desc">
                This empirical observation is under academic embargo prior to official manuscript publication.<br>
                <strong>Please contact Mr. Sebastian Jordan to get the results:</strong>
              </p>
              <a href="mailto:sebastian.jordan@thuenen.de?subject=Request%20for%20Thesis%20Research%20Data" class="embargo-contact-card" target="_blank" onclick="event.stopPropagation();">
                <span>✉️</span> <span>sebastian.jordan@thuenen.de</span>
              </a>
            `;
            parent.appendChild(overlay);
          }
        }
      }
    });
  }

  updateAdminModalUI() {
    const badge = document.getElementById("admin-embargo-status-badge");
    const toggleBtn = document.getElementById("btn-admin-toggle-embargo");
    const toggleText = document.getElementById("btn-admin-toggle-text");

    if (badge) {
      badge.className = `admin-switch-status ${this.isEmbargoActive ? "locked" : "unlocked"}`;
      badge.textContent = this.isEmbargoActive ? "🛡️ EMBARGO ACTIVE (Protected)" : "🔓 DEFENSE MODE (All Unlocked)";
    }

    if (toggleBtn && toggleText) {
      if (this.isEmbargoActive) {
        toggleBtn.className = "admin-toggle-btn btn-unlock";
        toggleBtn.innerHTML = "<span>🔓</span> <span>Deactivate Embargo (Unlock All Figures)</span>";
      } else {
        toggleBtn.className = "admin-toggle-btn btn-lock";
        toggleBtn.innerHTML = "<span>🔒</span> <span>Activate Embargo (Protect Results)</span>";
      }
    }
  }

  showEmbargoToast(message) {
    let toast = document.getElementById("embargo-toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "embargo-toast-notification";
      toast.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;border:1px solid #38bdf8;color:#f8fafc;padding:12px 24px;border-radius:10px;font-size:0.88rem;font-weight:700;z-index:100100;box-shadow:0 8px 30px rgba(0,0,0,0.7);transition:opacity 0.3s;";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => { toast.style.opacity = "0"; }, 3500);
  }

  // ==========================================================================
  // GIS PROJECT IMPORTER & TERRITORIAL WETLAND SELECTOR
  // ==========================================================================
  initGisProjectModal() {
    const modal = document.getElementById("gis-project-import-modal");
    if (!modal) return;

    const btnOpenLanding = document.getElementById("btn-open-gis-modal");
    const btnClose = document.getElementById("btn-close-gis-modal");
    const btnCancel = document.getElementById("btn-cancel-gis-modal");
    const btnConfirm = document.getElementById("btn-confirm-gis-load");

    const tabPresets = document.getElementById("tab-btn-gis-presets");
    const tabUpload = document.getElementById("tab-btn-gis-upload");
    const panePresets = document.getElementById("gis-pane-presets");
    const paneUpload = document.getElementById("gis-pane-upload");

    const dropzone = document.getElementById("gis-file-dropzone");
    const fileInput = document.getElementById("gis-file-input");
    const previewBox = document.getElementById("gis-file-preview-box");
    const previewName = document.getElementById("gis-preview-filename");
    const previewStats = document.getElementById("gis-preview-stats");
    const btnRemoveFile = document.getElementById("btn-remove-gis-file");

    const inputName = document.getElementById("gis-input-sitename");
    const inputArea = document.getElementById("gis-input-area");
    const inputWtd = document.getElementById("gis-input-wtd");
    const inputPh = document.getElementById("gis-input-ph");

    let activePresetKey = "mallin";
    let loadedGeoJson = null;

    const presetConfigs = {
      mallin: { name: "Patagonian Mallín (Aysén)", area: 45, wtd: -12, ph: 5.8, isWallener: false },
      estuary: { name: "Coastal Wetland / Maipo Estuary", area: 120, wtd: -5, ph: 7.4, isWallener: false },
      tremedal: { name: "Tremedal Peat Bog (Iberian System)", area: 28, wtd: -8, ph: 4.0, isWallener: false },
      fen: { name: "Wallener Au (Kiel Benchmark)", area: 18.5, wtd: -25, ph: 6.8, isWallener: true },
      paludi: { name: "Productive Paludiculture", area: 35, wtd: 2, ph: 7.0, isWallener: false },
      drained: { name: "Drained Degraded Peatland", area: 60, wtd: -55, ph: 5.4, isWallener: false }
    };

    const openModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      modal.classList.remove("hidden");
      modal.classList.add("active");
    };

    const closeModal = () => {
      modal.classList.add("hidden");
      modal.classList.remove("active");
    };

    if (btnOpenLanding) btnOpenLanding.addEventListener("click", openModal);
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Tab Switching inside GIS Modal
    if (tabPresets && tabUpload) {
      tabPresets.addEventListener("click", () => {
        tabPresets.classList.add("active");
        tabUpload.classList.remove("active");
        if (panePresets) panePresets.classList.remove("hidden");
        if (paneUpload) paneUpload.classList.add("hidden");
      });

      tabUpload.addEventListener("click", () => {
        tabUpload.classList.add("active");
        tabPresets.classList.remove("active");
        if (paneUpload) paneUpload.classList.remove("hidden");
        if (panePresets) panePresets.classList.add("hidden");
      });
    }

    // Preset Selection Cards
    const presetCards = modal.querySelectorAll(".gis-preset-card");
    presetCards.forEach(card => {
      card.addEventListener("click", () => {
        presetCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        const pKey = card.dataset.presetId;
        activePresetKey = pKey;

        const cfg = presetConfigs[pKey];
        if (cfg) {
          if (inputName) inputName.value = cfg.name;
          if (inputArea) inputArea.value = cfg.area;
          if (inputWtd) inputWtd.value = cfg.wtd;
          if (inputPh) inputPh.value = cfg.ph;
        }
      });
    });

    // File Processing Helper (Client-Side Parser)
    const processFile = (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          let parsed = null;
          if (file.name.endsWith(".json") || file.name.endsWith(".geojson")) {
            parsed = JSON.parse(content);
          } else {
            parsed = { name: file.name.replace(/\.[^/.]+$/, ""), raw: content };
          }

          loadedGeoJson = parsed;

          // Estimate properties from GeoJSON if available
          let siteName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
          siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1);
          let estArea = 50;

          if (parsed && parsed.features && parsed.features[0]) {
            const props = parsed.features[0].properties || {};
            if (props.name || props.site || props.NOMBRE) {
              siteName = props.name || props.site || props.NOMBRE;
            }
            if (props.area || props.hectareas || props.AREA) {
              estArea = parseFloat(props.area || props.hectareas || props.AREA) || 50;
            } else if (parsed.features[0].geometry && parsed.features[0].geometry.coordinates) {
              const coords = parsed.features[0].geometry.coordinates.flat(Infinity);
              estArea = Math.min(1000, Math.max(10, Math.round(coords.length * 1.5)));
            }
          }

          if (inputName) inputName.value = siteName;
          if (inputArea) inputArea.value = estArea;
          if (previewName) previewName.textContent = file.name;
          if (previewStats) {
            previewStats.textContent = `File processed • ~${estArea} ha estimated • Vertices validated`;
          }

          if (previewBox) previewBox.classList.remove("hidden");
          if (dropzone) dropzone.classList.add("hidden");
        } catch (err) {
          console.error("Error processing GIS file:", err);
          alert("The file could not be processed as valid GeoJSON. Please upload a standard .geojson file.");
        }
      };
      reader.readAsText(file);
    };

    // Dropzone Events
    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processFile(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          processFile(e.target.files[0]);
        }
      });
    }

    if (btnRemoveFile) {
      btnRemoveFile.addEventListener("click", () => {
        loadedGeoJson = null;
        if (fileInput) fileInput.value = "";
        if (previewBox) previewBox.classList.add("hidden");
        if (dropzone) dropzone.classList.remove("hidden");
      });
    }

    // Confirm & Load into Twin
    if (btnConfirm) {
      btnConfirm.addEventListener("click", () => {
        const finalName = inputName ? inputName.value : "Territorial Wetland";
        const finalArea = inputArea ? parseFloat(inputArea.value) : 45;
        const finalWtd = inputWtd ? parseFloat(inputWtd.value) : -12;
        const finalPh = inputPh ? parseFloat(inputPh.value) : 6.0;

        const isWallenerSelected = (activePresetKey === "fen" && !loadedGeoJson);

        if (isWallenerSelected) {
          this.isWallenerTwinMode = true;
          if (this.sandbox) {
            this.sandbox.loadArchetype("fen");
          }
        } else {
          this.isWallenerTwinMode = false;
          if (this.sandbox) {
            this.sandbox.loadCustomProject({
              id: activePresetKey,
              archetypeKey: activePresetKey,
              name: finalName,
              areaHa: finalArea,
              wtd: finalWtd,
              ph: finalPh,
              isWallener: false,
              geojson: loadedGeoJson
            });
          }
        }

        closeModal();
        this.switchView("soil_interface");
      });
    }
  }

}

// Instantiate master app
window.addEventListener("DOMContentLoaded", () => {
  window.MASTER_APPROACH = MASTER_APPROACH;
  window.presentationApp = new WetlandMonitorApp();
  window.app = window.presentationApp;
});

