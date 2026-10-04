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

    // 3. Set branding logo to "Stratigraphy & Probes"
    this.initLogo();

    // 4. Load slide 0 (Landing on Academic Defense Cover)
    this.goToSlide(0);
  }

  initDOM() {
    this.mainViewport = document.querySelector(".main-viewport");
    this.notesDrawer = document.getElementById("notes-drawer");
    this.resultsModalBackdrop = document.getElementById("results-modal-backdrop");
    this.logoModalOverlay = document.getElementById("logo-gallery-modal-overlay");
  }

  // ==========================================================================
  // ILLUMINATED / DARK THEME SYSTEM
  // ==========================================================================
  initThemeToggle() {
    const themeBtn = document.getElementById("btn-theme-toggle");
    
    // Check saved preference, default to light (luminous scientific theme)
    const savedTheme = localStorage.getItem("wetland_monitor_theme") || "light";
    this.setTheme(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const isDark = document.body.classList.contains("theme-dark");
        this.setTheme(isDark ? "light" : "dark");
      });
    }
  }

  setTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    localStorage.setItem("wetland_monitor_theme", theme);

    const themeIcon = document.getElementById("theme-icon");
    const themeLabel = document.getElementById("label-theme-btn");

    if (themeIcon) themeIcon.textContent = isDark ? "🌙" : "☀️";
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Dark" : "Luminous";
    }
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

    const openDeckBtn = document.getElementById("btn-open-classic-presentation");
    if (openDeckBtn) {
      openDeckBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("classic_presentation");
      });
    }

    const directBarBtn = document.getElementById("btn-direct-presentation-menu");
    if (directBarBtn) {
      directBarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchView("classic_presentation");
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

    const brandBtn = document.getElementById("brand-badge-click");
    if (brandBtn) {
      brandBtn.addEventListener("click", () => {
        this.goToSlide(0);
        this.switchView("thesis_cover");
      });
      brandBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.goToSlide(0);
          this.switchView("thesis_cover");
        }
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
    this.currentViewKey = viewKey;

    if (viewKey === 'classic_presentation') {
      const inst = window.classicPresentationInstance || window.classicPresentation;
      if (inst && inst.showPresentation) {
        inst.showPresentation();
        return;
      } else {
        const presPanel = document.getElementById('view-classic-presentation');
        if (presPanel) {
          document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
          presPanel.classList.add('active');
        }
        setTimeout(() => {
          const retryInst = window.classicPresentationInstance || window.classicPresentation;
          if (retryInst && retryInst.showPresentation) {
            retryInst.showPresentation();
          }
        }, 80);
      }
    }

    // When navigated manually via top menus, reset all spotlights and dimming to normal
    if (!fromSlide) {
      this.clearSpotlightsAndResetNormalView();
    }

    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === viewKey);
    });

    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.viewId === viewKey);
    });

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
      brandBtn.classList.toggle("active-cover", viewKey === "thesis_cover");
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
  }

  // ==========================================================================
  // BIOGEOCHEMISTRY DRAINED / REWETTED STATE TOGGLE
  // ==========================================================================
  initBiogeoToggle() {
    const btnDrained = document.getElementById("btn-biogeo-drained");
    const btnRewetted = document.getElementById("btn-biogeo-rewetted");

    if (btnDrained) {
      btnDrained.addEventListener("click", () => {
        this.setBiogeoState("drained");
      });
    }

    if (btnRewetted) {
      btnRewetted.addEventListener("click", () => {
        this.setBiogeoState("rewetted");
      });
    }
  }

  setBiogeoState(state) {
    const biogeoPanel = document.getElementById("view-biogeochemistry") || document.querySelector(".view-panel[data-view-id='biogeochemistry']");
    const btnDrained = document.getElementById("btn-biogeo-drained");
    const btnRewetted = document.getElementById("btn-biogeo-rewetted");

    if (biogeoPanel) {
      biogeoPanel.classList.remove("state-drained", "state-rewetted");
      biogeoPanel.classList.add(state === "rewetted" ? "state-rewetted" : "state-drained");
    }

    if (btnDrained && btnRewetted) {
      btnDrained.classList.toggle("active", state === "drained");
      btnRewetted.classList.toggle("active", state === "rewetted");
    }
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
            <span>🎯</span> <span>Core Defense Thesis</span>
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
          <div class="pitch-speech-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 800; background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3); border-radius: 4px; padding: 2px 6px; margin-bottom: 6px;">🇬🇧 Spoken Defense Script (English)</div>
          <div class="pitch-speech-title">${pTitleEn}</div>
          <div class="pitch-speech-body" style="font-size: 0.9rem; line-height: 1.6; color: var(--text-primary);">${pSpeechEn}</div>
        </div>
      ` : ""}

      ${(lang === "dual" || lang === "es") && pSpeechEs ? `
        <div class="pitch-speech-card" style="margin-bottom: 1rem; border-color: rgba(245,158,11,0.4);">
          <div class="pitch-speech-badge" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 800; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); border-radius: 4px; padding: 2px 6px; margin-bottom: 6px;">🇪🇸 Guion de Defensa Hablado (Español)</div>
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

      <!-- DEFENSE Q&A -->
      ${(pDefenseEn || pDefenseEs) ? `
        <div class="defense-qa-card">
          <div class="defense-qa-title" style="display: flex; align-items: center; gap: 6px;">
            <span>❓</span> Anticipated Committee Q&amp;A
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
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCaption = document.getElementById("lightbox-caption-text");
    const lightboxBadge = document.getElementById("lightbox-badge");
    const closeBtn = document.getElementById("lightbox-close-btn");
    const zoomBtn = document.getElementById("lightbox-zoom-btn");
    const stage = document.getElementById("lightbox-stage");

    if (!lightboxEl || !lightboxImg) return;

    const openLightbox = (src, title, caption, badgeText = "Empirical Figure") => {
      if (!src) return;
      lightboxImg.src = src;
      lightboxImg.classList.remove("zoomed");
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
      lightboxImg.classList.remove("zoomed");
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
      const isZoomed = lightboxImg.classList.toggle("zoomed");
      if (stage) stage.classList.toggle("is-zoomed", isZoomed);
    };

    if (zoomBtn) zoomBtn.addEventListener("click", toggleZoom);
    lightboxImg.addEventListener("click", toggleZoom);

    // Universal click handler for figures across all analytical views
    document.addEventListener("click", (e) => {
      if (e.target.closest("#universal-figure-lightbox") || e.target.closest(".lightbox-btn")) return;
      if (e.target.closest(".hardware-card") || e.target.closest(".instrument-card")) return;

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

      // 0b. Check if clicked Figure 20 in Biogeochemistry or Aims View, or Slide Figure Preview
      const fig20Trigger = e.target.closest("#btn-zoom-biogeo-fig20, #wrap-fig20-zoom, #img-fig20-biogeo, #btn-zoom-aims-fig20, #aims-fig20-img-box, #img-aims-fig20");
      if (fig20Trigger) {
        const fig20Src = "assets/Peatlands_Biogeochemical_Processes_Fig20.png";
        const fig20Title = "Figure 20: Peatlands Biogeochemical Processes";
        const fig20Caption = "Conceptual model of greenhouse gas flux control in wetland soils. Carbon enters ecosystems through plant photosynthesis and is incorporated into biomass, which decomposes via aerobic respiration in oxygen-rich surface soils to produce CO₂. In water-saturated, oxygen-depleted layers, anaerobic decomposition takes over, where fermentative bacteria first break down organic matter into simpler substrates. These substrates are then used in alternative respiratory pathways like denitrification, iron reduction, and sulfate reduction until methanogenic archaea take over to produce methane (CH₄). Before escaping into the atmosphere via diffusion, bubbling (ebullition), or plant tissue transport (vascular aerenchyma), a portion of this methane is consumed by specialized bacteria and archaea through both aerobic and anaerobic oxidation processes. (Official Thesis Draft Figure 20, Santander et al., 2026)";
        openLightbox(fig20Src, fig20Title, fig20Caption, "Thesis Figure 20 • Conceptual Model");
        return;
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

      // 3. Figures across all views (Tier 3 results, macro maps, flux charts, GWP plots, soil profile figures)
      const targetImg = e.target.closest("img.thesis-plot, .macro-display-wrapper img, .macro-img-container img, .flux-plot-card img, .ghg-plot-container img, .ghg-plot-card img, .gwp-stage-container img, .modal-figure-img, .dashboard-plot-img, img[data-zoomable='true']");
      if (targetImg) {
        const card = targetImg.closest(".presentation-card, .modal-tier-results, .flux-plot-card, .ghg-plot-card, .thesis-plot-card, .macro-visualizer-card") || targetImg.parentElement;
        
        let title = targetImg.dataset.title;
        if (!title && card) {
          const titleEl = card.querySelector(".thesis-plot-title, .presentation-card-title, .plot-card-header h4, #macro-layer-title, #modal-figure-title");
          if (titleEl) title = titleEl.textContent.trim();
        }
        if (!title) title = targetImg.alt || "Thesis Scientific Figure";

        let caption = targetImg.dataset.caption;
        if (!caption && card) {
          const captionEl = card.querySelector(".plot-caption, .figure-caption-text, .plot-card-footer p, #macro-layer-desc, #modal-figure-caption, .pitch-takeaway-text");
          if (captionEl) caption = captionEl.textContent.trim();
        }
        if (!caption) caption = targetImg.alt || "Observation and empirical analysis from the Klimafarm Peatland Observatory at Wallener Au.";

        let badge = targetImg.dataset.badge;
        if (!badge && card) {
          const badgeEl = card.querySelector(".presentation-card-badge, .modal-category-badge, .plot-depth-tag, #macro-layer-tag, #modal-category-text");
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
              <span class="changelog-ver">Versión ${entry.version}</span>
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
}

// Instantiate master app
window.addEventListener("DOMContentLoaded", () => {
  window.MASTER_APPROACH = MASTER_APPROACH;
  window.presentationApp = new WetlandMonitorApp();
  window.app = window.presentationApp;
});

