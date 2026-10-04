/**
 * Classic Academic Thesis Defense Slide Deck Controller (Enhanced Edition)
 * Faculty of Agricultural and Nutritional Sciences • CAU Kiel
 * Author: Daniel Sebastián Santander Urrutia
 */

import { CLASSIC_THESIS_SLIDES } from './classic_presentation_data.js?v=2.4.1';

export class ClassicThesisPresentation {
  constructor() {
    this.slides = CLASSIC_THESIS_SLIDES;
    this.currentIndex = 0;
    this.notesVisible = false;
    this.overviewVisible = false;
    this.lightboxVisible = false;
    this.notesLang = 'es'; // 'es' or 'en'
    
    // Assign global references immediately
    window.classicPresentationInstance = this;
    window.classicPresentation = this;
    
    // Interactive states
    this.gwpMode = '100y'; // '100y' or '20y'
    this.activeSoilLayer = 'all';
    this.activeCh4Zone = 'central';

    // Stopwatch Timer
    this.timerSeconds = 0;
    this.timerRunning = false;
    this.timerInterval = null;

    this.initDOM();
    this.bindEvents();
    this.renderSlide(0);

    // Auto-abrir la presentación si la URL incluye hash o parámetro de presentación
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenPresentation = window.location.hash.includes('presentation') || 
                                   urlParams.get('view') === 'presentation' || 
                                   urlParams.get('view') === 'classic_presentation';
    if (shouldOpenPresentation) {
      setTimeout(() => this.showPresentation(0), 40);
    }
  }

  initDOM() {
    // 1. Botón en la cabecera principal junto a Thesis Hub
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.getElementById('btn-open-classic-presentation')) {
      const btn = document.createElement('button');
      btn.id = 'btn-open-classic-presentation';
      btn.className = 'action-btn primary';
      btn.title = 'Abrir Presentación Clásica de Tesis (22 Slides Académicas)';
      btn.style.cssText = 'background: linear-gradient(135deg, #0ea5e9, #0284c7) !important; border-color: #38bdf8 !important; font-weight: 600 !important;';
      btn.innerHTML = `<span style="font-size:16px;">📽️</span> <span>Presentación Tesis</span>`;
      headerActions.insertBefore(btn, headerActions.children[1] || null);
    }

    // 2. Tarjeta en el menú lateral (carousel drawer)
    const track = document.getElementById('carrusel-slider-track');
    if (track && !document.getElementById('tab-classic-presentation')) {
      const card = document.createElement('div');
      card.id = 'tab-classic-presentation';
      card.className = 'carrusel-card tab-btn';
      card.dataset.view = 'classic_presentation';
      card.innerHTML = `
        <span class="carrusel-card-idx">00</span>
        <span class="carrusel-card-icon">📽️</span>
        <div class="carrusel-card-body">
          <span class="carrusel-card-name">Presentación Tesis</span>
          <span class="carrusel-card-sub">Clásica • 22 Slides</span>
        </div>
      `;
      track.insertBefore(card, track.children[1] || null);
    }

    // 3. Crear el contenedor de vista principal #view-classic-presentation
    let viewPanel = document.getElementById('view-classic-presentation');
    if (!viewPanel) {
      viewPanel = document.createElement('section');
      viewPanel.id = 'view-classic-presentation';
      viewPanel.className = 'view-panel';
      viewPanel.dataset.viewId = 'classic_presentation';
      viewPanel.innerHTML = `
        <div class="academic-deck-wrapper" id="academic-deck-wrapper">
          <!-- 16:9 Academic Slide Canvas -->
          <div class="academic-slide-canvas" id="academic-slide-canvas">
            <!-- Top Progress Bar -->
            <div class="slide-progress-bar">
              <div class="slide-progress-fill" id="slide-progress-fill"></div>
            </div>

            <!-- Masthead -->
            <div class="slide-masthead">
              <div class="slide-masthead-left">
                <span class="masthead-badge">Master's Thesis Defense</span>
                <span class="masthead-univ">Faculty of Agricultural &amp; Nutritional Sciences • CAU Kiel</span>
              </div>

              <!-- Defense Stopwatch Timer -->
              <div class="masthead-timer-wrap">
                <span style="font-size:12px;">⏱️</span>
                <span class="timer-digits" id="deck-timer-display">00:00</span>
                <button class="timer-ctrl-btn" id="deck-timer-toggle-btn" title="Iniciar / Pausar Cronómetro">▶</button>
                <button class="timer-ctrl-btn" id="deck-timer-reset-btn" title="Reiniciar Cronómetro">↺</button>
              </div>

              <div class="slide-masthead-right">
                <span class="masthead-section-tag" id="slide-section-tag">§ 01 • Cover</span>
                <span id="slide-cand-tag">Daniel S. Santander Urrutia</span>
              </div>
            </div>

            <!-- Slide Content Body -->
            <div class="slide-content-area" id="slide-content-area"></div>

            <!-- Slide Status Line -->
            <div class="slide-status-line">
              <span>Wallener Au Peatland Observatory • Klimafarm Project • CAU Kiel</span>
              <button class="slide-hub-link-btn" id="btn-jump-to-hub">
                <span>📖 Ver Capítulo en Thesis Hub</span>
              </button>
            </div>

            <!-- Presenter Speaker Notes Drawer -->
            <div class="deck-notes-panel" id="deck-notes-panel">
              <div class="notes-panel-header">
                <div class="notes-header-left">
                  <span class="notes-panel-title">🎙️ Presenter Script &amp; Anticipated Defense Q&amp;A</span>
                  <div class="notes-lang-toggle">
                    <button class="lang-btn active" id="lang-btn-es">ES</button>
                    <button class="lang-btn" id="lang-btn-en">EN</button>
                  </div>
                </div>
                <button id="btn-close-notes" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:16px;">✕</button>
              </div>
              <div class="notes-speech-text" id="deck-notes-speech"></div>
              <div class="notes-qa-box" id="deck-notes-qa"></div>
            </div>
          </div>

          <!-- Docked Controls Below Canvas -->
          <footer class="deck-control-footer">
            <div class="deck-nav-group">
              <button class="deck-btn" id="deck-prev-btn" title="Anterior (Flecha Izquierda o Backspace)">
                ❮ <span>Anterior</span>
              </button>
              <div class="slide-counter-badge" id="deck-counter-badge">Slide 01 / 14</div>
              <button class="deck-btn primary" id="deck-next-btn" title="Siguiente (Flecha Derecha o Espacio)">
                <span>Siguiente</span> ❯
              </button>
            </div>

            <div class="deck-nav-group">
              <button class="deck-btn" id="deck-btn-overview" title="Ver cuadrícula de todas las diapositivas (Tecla O)">
                ⊞ <span>Índice Diapositivas</span>
              </button>
              <button class="deck-btn" id="deck-btn-notes" title="Activar guión y notas del orador (Tecla P o N)">
                🎙️ <span>Notas Orador</span>
              </button>
              <button class="deck-btn" id="deck-btn-fullscreen" title="Pantalla Completa (Tecla F)">
                ⛶ <span>Fullscreen</span>
              </button>
              <button class="deck-btn" id="deck-btn-exit" title="Salir al Gemelo Digital (Esc)" style="background:rgba(239,68,68,0.15); border-color:rgba(239,68,68,0.3); color:#fca5a5;">
                ✕ <span>Volver a la App</span>
              </button>
            </div>
          </footer>
        </div>

        <!-- Slide Overview Grid Modal -->
        <div class="deck-overview-modal" id="deck-overview-modal">
          <div class="overview-header">
            <h3>⊞ Índice General de la Presentación de Tesis (14 Diapositivas)</h3>
            <button class="deck-btn" id="btn-close-overview">✕ Cerrar</button>
          </div>
          <div class="overview-grid" id="deck-overview-grid"></div>
        </div>

        <!-- High-Res Lightbox Modal -->
        <div class="slide-lightbox-modal" id="slide-lightbox-modal">
          <button class="lightbox-close-btn" id="btn-close-lightbox">✕</button>
          <div class="lightbox-img-wrap">
            <img id="lightbox-img" src="" alt="High-Res Inspection" />
            <div class="lightbox-caption" id="lightbox-caption"></div>
          </div>
        </div>
      `;

      const mainEl = document.querySelector('main') || document.getElementById('app');
      if (mainEl) mainEl.appendChild(viewPanel);
    }
  }

  bindEvents() {
    const openBtn = document.getElementById('btn-open-classic-presentation');
    const directMenuBtn = document.getElementById('btn-direct-presentation-menu');
    const tabCard = document.getElementById('tab-classic-presentation');
    const startDefenseBtn = document.getElementById('btn-start-defense');
    const prevBtn = document.getElementById('deck-prev-btn');
    const nextBtn = document.getElementById('deck-next-btn');
    const overviewBtn = document.getElementById('deck-btn-overview');
    const closeOverviewBtn = document.getElementById('btn-close-overview');
    const notesBtn = document.getElementById('deck-btn-notes');
    const closeNotesBtn = document.getElementById('btn-close-notes');
    const fsBtn = document.getElementById('deck-btn-fullscreen');
    const exitBtn = document.getElementById('deck-btn-exit');
    const closeLightboxBtn = document.getElementById('btn-close-lightbox');
    const lightboxModal = document.getElementById('slide-lightbox-modal');
    const jumpHubBtn = document.getElementById('btn-jump-to-hub');

    // Timer controls
    const timerToggleBtn = document.getElementById('deck-timer-toggle-btn');
    const timerResetBtn = document.getElementById('deck-timer-reset-btn');

    // Language buttons
    const langEsBtn = document.getElementById('lang-btn-es');
    const langEnBtn = document.getElementById('lang-btn-en');

    if (openBtn) openBtn.addEventListener('click', (e) => { e.preventDefault(); this.showPresentation(); });
    if (directMenuBtn) directMenuBtn.addEventListener('click', (e) => { e.preventDefault(); this.showPresentation(); });
    if (tabCard) tabCard.addEventListener('click', (e) => { e.preventDefault(); this.showPresentation(); });
    if (startDefenseBtn) startDefenseBtn.addEventListener('click', (e) => { e.preventDefault(); this.showPresentation(0); });

    window.addEventListener('hashchange', () => {
      if (window.location.hash.includes('presentation')) {
        this.showPresentation();
      } else if (window.location.hash.includes('cover') || window.location.hash.includes('landing')) {
        this.exitPresentation();
      }
    });
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (overviewBtn) overviewBtn.addEventListener('click', () => this.toggleOverview());
    if (closeOverviewBtn) closeOverviewBtn.addEventListener('click', () => this.toggleOverview(false));
    if (notesBtn) notesBtn.addEventListener('click', () => this.toggleNotes());
    if (closeNotesBtn) closeNotesBtn.addEventListener('click', () => this.toggleNotes(false));
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());
    if (exitBtn) exitBtn.addEventListener('click', () => this.exitPresentation());

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => this.toggleLightbox(false));
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) this.toggleLightbox(false);
      });
    }

    if (jumpHubBtn) {
      jumpHubBtn.addEventListener('click', () => this.jumpToThesisHub());
    }

    if (timerToggleBtn) {
      timerToggleBtn.addEventListener('click', () => this.toggleTimer());
    }

    if (timerResetBtn) {
      timerResetBtn.addEventListener('click', () => this.resetTimer());
    }

    if (langEsBtn) {
      langEsBtn.addEventListener('click', () => {
        this.notesLang = 'es';
        langEsBtn.classList.add('active');
        if (langEnBtn) langEnBtn.classList.remove('active');
        this.updateNotesContent();
      });
    }

    if (langEnBtn) {
      langEnBtn.addEventListener('click', () => {
        this.notesLang = 'en';
        langEnBtn.classList.add('active');
        if (langEsBtn) langEsBtn.classList.remove('active');
        this.updateNotesContent();
      });
    }

    // Atajos de teclado
    window.addEventListener('keydown', (e) => {
      const panel = document.getElementById('view-classic-presentation');
      if (!panel || !panel.classList.contains('active')) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        this.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'o' || e.key === 'O' || e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        this.toggleOverview();
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        this.toggleNotes();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (this.lightboxVisible) {
          this.toggleLightbox(false);
        } else if (this.overviewVisible) {
          this.toggleOverview(false);
        } else if (this.notesVisible) {
          this.toggleNotes(false);
        } else {
          this.exitPresentation();
        }
      }
    });

    window.classicPresentationInstance = this;
  }

  showPresentation(slideIndex = null) {
    if (slideIndex !== null && slideIndex >= 0 && slideIndex < this.slides.length) {
      this.currentIndex = slideIndex;
    }
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('view-classic-presentation');
    if (panel) {
      panel.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === 'classic_presentation');
    });

    const carouselTitle = document.getElementById('carousel-current-title');
    if (carouselTitle) {
      carouselTitle.innerHTML = `<span class="active-dot">●</span> <span class="active-icon">📽️</span> <span class="tab-text active-name">Presentación Tesis</span>`;
    }

    const drawer = document.getElementById('dropdown-view-tabs');
    const hamburgerBtn = document.getElementById('btn-hamburger-menu');
    if (drawer && !drawer.classList.contains('hidden')) {
      drawer.classList.add('hidden');
      if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    }

    try {
      if (!window.location.hash.includes('presentation')) {
        window.history.replaceState(null, '', '#presentation');
      }
    } catch (_) {}

    this.renderSlide(this.currentIndex);
  }

  exitPresentation() {
    const panel = document.getElementById('view-classic-presentation');
    if (panel) panel.classList.remove('active', 'deck-fullscreen');

    try {
      if (window.location.hash.includes('presentation')) {
        window.history.replaceState(null, '', '#landing');
      }
    } catch (_) {}

    if (window.presentationApp && window.presentationApp.switchView) {
      window.presentationApp.switchView('thesis_cover');
    } else {
      const landing = document.getElementById('view-cover') || document.querySelector('.view-panel[data-view-id="thesis_cover"]');
      if (landing) landing.classList.add('active');
    }
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    this.renderSlide(index);
    if (this.overviewVisible) this.toggleOverview(false);
  }

  renderSlide(index) {
    const slide = this.slides[index];
    if (!slide) return;

    // Barra de progreso superior
    const progressFill = document.getElementById('slide-progress-fill');
    if (progressFill) {
      const pct = (index / (this.slides.length - 1)) * 100;
      progressFill.style.width = `${pct}%`;
    }

    // Metadatos
    const secTag = document.getElementById('slide-section-tag');
    const counterBadge = document.getElementById('deck-counter-badge');
    const prevBtn = document.getElementById('deck-prev-btn');
    const nextBtn = document.getElementById('deck-next-btn');

    if (secTag) secTag.innerText = `§ ${slide.num} • ${slide.section}`;
    if (counterBadge) counterBadge.innerText = `Slide ${slide.num} / ${String(this.slides.length).padStart(2, '0')}`;
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === this.slides.length - 1);

    const container = document.getElementById('slide-content-area');
    if (!container) return;

    // Toolbar interactiva específica si la slide lo requiere
    let interactiveToolbar = '';
    if (slide.interactiveType === 'gwp_toggle') {
      interactiveToolbar = `
        <div class="slide-interactive-toolbar">
          <span style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Cambiar Horizonte GWP:</span>
          <button class="interactive-chip ${this.gwpMode === '100y' ? 'active' : ''}" id="chip-gwp-100y">Horizonte 100 Años (GWP₁₀₀)</button>
          <button class="interactive-chip ${this.gwpMode === '20y' ? 'active red' : ''}" id="chip-gwp-20y">Horizonte 20 Años (GWP₂₀) • Impacto Agudo</button>
        </div>
      `;
    } else if (slide.interactiveType === 'soil_layers') {
      interactiveToolbar = `
        <div class="slide-interactive-toolbar">
          <span style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Estrato Edáfico:</span>
          <button class="interactive-chip ${this.activeSoilLayer === 'all' ? 'active' : ''}" id="chip-soil-all">Todos los Estratos</button>
          <button class="interactive-chip ${this.activeSoilLayer === '0-5cm' ? 'active' : ''}" id="chip-soil-top">0–5 cm (Compactado)</button>
          <button class="interactive-chip ${this.activeSoilLayer === '25cm' ? 'active' : ''}" id="chip-soil-mid">25 cm</button>
          <button class="interactive-chip ${this.activeSoilLayer === '25-30cm' ? 'active' : ''}" id="chip-soil-deep">25–30 cm (Turba Profunda)</button>
        </div>
      `;
    } else if (slide.interactiveType === 'ch4_zones') {
      interactiveToolbar = `
        <div class="slide-interactive-toolbar">
          <span style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Zonas del Paisaje:</span>
          <button class="interactive-chip ${this.activeCh4Zone === 'east' ? 'active' : ''}" id="chip-ch4-east">Zanja Este (Sumidero: -0.03 nmol)</button>
          <button class="interactive-chip ${this.activeCh4Zone === 'central' ? 'active red' : ''}" id="chip-ch4-central">Meseta Central (Hotspot: +42.0 nmol)</button>
          <button class="interactive-chip ${this.activeCh4Zone === 'west' ? 'active' : ''}" id="chip-ch4-west">Zanja Oeste (Ebullición)</button>
        </div>
      `;
    }

    // Configuración visual (GWP, estratos y zonas dinámicos)
    let currentVisualSrc = slide.visual.src;
    let currentCaption = slide.visual.caption;
    if (slide.interactiveType === 'gwp_toggle') {
      currentVisualSrc = (this.gwpMode === '20y') ? 'assets/figures/22_GHG_Balance_20y.png' : 'assets/figures/21_GHG_Balance_100y.png';
      currentCaption = (this.gwpMode === '20y') 
        ? 'Balance Radiativo Apilado a 20 Años (GWP₂₀): El forzamiento del metano domina la respuesta térmica inmediata (+9.8 t CO₂e ha⁻¹).' 
        : 'Balance de GEI a 100 Años (GWP₁₀₀): Neutralidad o balance cercano a cero (+1.2 t CO₂e ha⁻¹) con compensación entre gases.';
    } else if (slide.interactiveType === 'soil_layers') {
      if (this.activeSoilLayer === '0-5cm') {
        currentVisualSrc = 'assets/figures/Precompression_Individual_WA_0-5cm.png';
        currentCaption = 'Estrato superficial compactado (0–5 cm): Presión de preconsolidación superada y colapso de macroporos (>50 µm).';
      } else if (this.activeSoilLayer === '25cm') {
        currentVisualSrc = 'assets/figures/Precompression_Individual_WA_25cm.png';
        currentCaption = 'Piso de arado profundo (25 cm): Máxima resistencia mecánica residual y estrangulamiento de la difusión gaseosa.';
      } else if (this.activeSoilLayer === '25-30cm') {
        currentVisualSrc = 'assets/figures/Precompression_Individual_WA_25-30cm.png';
        currentCaption = 'Turba profunda prístina (25–30 cm): Estructura porosa intacta, baja densidad aparente (0.152 g/cm³) y alto TPV (87.4%).';
      } else {
        currentVisualSrc = 'assets/figures/Precompression_Combined.png';
        currentCaption = 'Curvas combinadas de preconsolidación oedométrica en Wallener Au (0–5 cm, 25 cm, 25–30 cm).';
      }
    } else if (slide.interactiveType === 'ch4_zones') {
      if (this.activeCh4Zone === 'east') {
        currentVisualSrc = 'assets/figures/12b_CH4_QC_Flag_Comparison.png';
        currentCaption = 'Zanja Este (Chambers 1–2): Borde mineralizado con bacterias metanótrofas activas (Sumidero neto: -0.03 nmol m⁻² s⁻¹).';
      } else if (this.activeCh4Zone === 'west') {
        currentVisualSrc = 'assets/figures/14b_CH4_Models_Comparison.png';
        currentCaption = 'Zanja Oeste (Chamber 8): Ebullición episódica en canal profundo y ajuste de Machine Learning (RF vs ANN).';
      } else {
        currentVisualSrc = 'assets/figures/16b_CH4_Daily_Budgets.png';
        currentCaption = 'Meseta Central (Chambers 3–7): Hotspot estival con emisiones máximas de hasta +42.0 nmol m⁻² s⁻¹ tras la inundación.';
      }
    }

    // Tarjetas y métricas
    let cardsHtml = '';
    for (const card of slide.cards || []) {
      const highlightClass = card.color === 'red' ? 'warning' : (card.color === 'green' ? 'highlight' : '');
      const titleColorClass = card.color ? card.color : 'blue';
      cardsHtml += `
        <div class="academic-card ${highlightClass}">
          <div class="academic-card-title ${titleColorClass}">${card.title}</div>
          <p>${card.text}</p>
        </div>
      `;
    }

    let pillsHtml = '';
    if (slide.pills && slide.pills.length > 0) {
      let pillsToRender = slide.pills;
      if (slide.interactiveType === 'gwp_toggle' && this.gwpMode === '20y') {
        pillsToRender = [
          { val: "-2.5 t", lbl: "CO₂-Only Sink", color: "green" },
          { val: "84×", lbl: "CH₄ Factor (20y)", color: "red" },
          { val: "+9.8 t", lbl: "Calentamiento Neto", color: "red" }
        ];
      }
      pillsHtml = `
        <div class="metric-pills-row">
          ${pillsToRender.map(p => `
            <div class="metric-pill">
              <div class="metric-pill-val ${p.color || ''}">${p.val}</div>
              <div class="metric-pill-lbl">${p.lbl}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="slide-titles-block">
        <div class="slide-titles-text">
          <h2 class="slide-main-title">
            <span>${slide.title}</span>
          </h2>
          <p class="slide-main-subtitle">${slide.subtitle}</p>
        </div>
      </div>

      ${interactiveToolbar}

      <div class="slide-grid-2col">
        <!-- Columna Izquierda: Visualización Científica -->
        <div class="slide-col-visual">
          <img id="active-slide-img" src="${currentVisualSrc}" alt="${slide.title}" title="Clic para ampliar en alta resolución" />
          <div class="slide-visual-caption">
            <span>${currentCaption}</span>
            <span class="caption-zoom-hint" id="caption-zoom-action">[🔍 Zoom HD]</span>
          </div>
        </div>

        <!-- Columna Derecha: Tarjetas Académicas y Métricas -->
        <div class="slide-col-narrative">
          ${cardsHtml}
          ${pillsHtml}
        </div>
      </div>
    `;

    // Conectar eventos de la imagen y zoom
    const imgEl = document.getElementById('active-slide-img');
    const zoomHint = document.getElementById('caption-zoom-action');
    if (imgEl) imgEl.addEventListener('click', () => this.openLightbox(currentVisualSrc, currentCaption));
    if (zoomHint) zoomHint.addEventListener('click', () => this.openLightbox(currentVisualSrc, currentCaption));

    // Conectar eventos interactivos específicos
    if (slide.interactiveType === 'gwp_toggle') {
      const btn100 = document.getElementById('chip-gwp-100y');
      const btn20 = document.getElementById('chip-gwp-20y');
      if (btn100) btn100.addEventListener('click', () => { this.gwpMode = '100y'; this.renderSlide(index); });
      if (btn20) btn20.addEventListener('click', () => { this.gwpMode = '20y'; this.renderSlide(index); });
    } else if (slide.interactiveType === 'soil_layers') {
      const bAll = document.getElementById('chip-soil-all');
      const bTop = document.getElementById('chip-soil-top');
      const bMid = document.getElementById('chip-soil-mid');
      const bDeep = document.getElementById('chip-soil-deep');
      if (bAll) bAll.addEventListener('click', () => { this.activeSoilLayer = 'all'; this.renderSlide(index); });
      if (bTop) bTop.addEventListener('click', () => { this.activeSoilLayer = '0-5cm'; this.renderSlide(index); });
      if (bMid) bMid.addEventListener('click', () => { this.activeSoilLayer = '25cm'; this.renderSlide(index); });
      if (bDeep) bDeep.addEventListener('click', () => { this.activeSoilLayer = '25-30cm'; this.renderSlide(index); });
    } else if (slide.interactiveType === 'ch4_zones') {
      const bEast = document.getElementById('chip-ch4-east');
      const bCentral = document.getElementById('chip-ch4-central');
      const bWest = document.getElementById('chip-ch4-west');
      if (bEast) bEast.addEventListener('click', () => { this.activeCh4Zone = 'east'; this.renderSlide(index); });
      if (bCentral) bCentral.addEventListener('click', () => { this.activeCh4Zone = 'central'; this.renderSlide(index); });
      if (bWest) bWest.addEventListener('click', () => { this.activeCh4Zone = 'west'; this.renderSlide(index); });
    }

    this.updateNotesContent();
  }

  updateNotesContent() {
    const slide = this.slides[this.currentIndex];
    if (!slide) return;

    const speechEl = document.getElementById('deck-notes-speech');
    const qaEl = document.getElementById('deck-notes-qa');
    const notesData = (this.notesLang === 'es' && slide.notes_es) ? slide.notes_es : slide.notes;

    if (speechEl && notesData) {
      speechEl.innerHTML = `<strong>Guión Oral del Ponente (${this.notesLang.toUpperCase()}):</strong><br>${notesData.speech}`;
    }
    if (qaEl && notesData) {
      qaEl.innerHTML = `<strong>❓ Pregunta Anticipada del Comité de Tesis:</strong><br>${notesData.defenseQ}`;
    }
  }

  jumpToThesisHub() {
    const slide = this.slides[this.currentIndex];
    if (!slide || !slide.chapterLink) return;

    // Buscar la instancia del ThesisExplorer o disparar su evento
    const explorerBtn = document.getElementById('btn-open-explorer');
    if (explorerBtn) explorerBtn.click();

    setTimeout(() => {
      const targetItem = document.querySelector(`.explorer-file-item[data-path="${slide.chapterLink}"]`);
      if (targetItem) targetItem.click();
    }, 250);
  }

  openLightbox(src, caption) {
    const modal = document.getElementById('slide-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (!modal || !img) return;

    img.src = src;
    if (cap) cap.innerText = caption || '';
    modal.classList.add('active');
    this.lightboxVisible = true;
  }

  toggleLightbox(force) {
    const modal = document.getElementById('slide-lightbox-modal');
    if (!modal) return;
    this.lightboxVisible = (typeof force === 'boolean') ? force : !this.lightboxVisible;
    modal.classList.toggle('active', this.lightboxVisible);
  }

  toggleNotes(force) {
    const panel = document.getElementById('deck-notes-panel');
    if (!panel) return;
    this.notesVisible = (typeof force === 'boolean') ? force : !this.notesVisible;
    panel.classList.toggle('active', this.notesVisible);
  }

  toggleOverview(force) {
    const modal = document.getElementById('deck-overview-modal');
    if (!modal) return;
    this.overviewVisible = (typeof force === 'boolean') ? force : !this.overviewVisible;
    modal.classList.toggle('active', this.overviewVisible);

    if (this.overviewVisible) {
      const grid = document.getElementById('deck-overview-grid');
      if (!grid) return;
      grid.innerHTML = this.slides.map((s, idx) => `
        <div class="overview-card ${idx === this.currentIndex ? 'current' : ''}" data-idx="${idx}">
          <div>
            <span class="overview-card-num">Slide ${s.num}</span>
            <div class="overview-card-title">${s.title}</div>
          </div>
          <div class="overview-card-section">${s.section}</div>
        </div>
      `).join('');

      grid.querySelectorAll('.overview-card').forEach(c => {
        c.addEventListener('click', () => {
          const idx = parseInt(c.dataset.idx, 10);
          this.goToSlide(idx);
        });
      });
    }
  }

  toggleFullscreen() {
    const panel = document.getElementById('view-classic-presentation');
    if (!panel) return;
    panel.classList.toggle('deck-fullscreen');
    if (panel.classList.contains('deck-fullscreen')) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // Cronómetro de Defensa
  toggleTimer() {
    const btn = document.getElementById('deck-timer-toggle-btn');
    if (this.timerRunning) {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      if (btn) btn.innerText = '▶';
    } else {
      this.timerRunning = true;
      if (btn) btn.innerText = '⏸';
      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        this.updateTimerDisplay();
      }, 1000);
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timerRunning = false;
    this.timerSeconds = 0;
    const btn = document.getElementById('deck-timer-toggle-btn');
    if (btn) btn.innerText = '▶';
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const disp = document.getElementById('deck-timer-display');
    if (!disp) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    disp.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ClassicThesisPresentation());
} else {
  new ClassicThesisPresentation();
}
