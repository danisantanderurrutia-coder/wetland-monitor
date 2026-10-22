/**
 * Thesis & Pipeline Explorer (Embedded Graphic Hub)
 * CAU Kiel - Daniel S. Santander Urrutia
 */

export class ThesisExplorer {
  constructor() {
    this.treeData = null;
    this.currentFile = null;
    this.searchDebounceTimer = null;
    this.pitchSlideIndex = 0;
    this.isPitchMode = false;
    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    // 1. Inyectar botón en la barra superior si existe
    const headerActions = document.querySelector('.header-actions');
    if (headerActions && !document.getElementById('btn-open-explorer')) {
      const btn = document.createElement('button');
      btn.id = 'btn-open-explorer';
      btn.className = 'action-btn explorer-btn';
      btn.title = 'Open Scripts & Pipelines Hub (Key T or H)';
      btn.innerHTML = `<span style="font-size:16px;">💻</span> <span>Hub - Scripts &amp; Pipelines</span> <span class="badge-pill">Live</span>`;
      headerActions.insertBefore(btn, headerActions.firstChild);
    }

    // 2. Inyectar el Modal en el body si no existe
    if (!document.getElementById('thesis-explorer-modal')) {
      const modal = document.createElement('div');
      modal.id = 'thesis-explorer-modal';
      modal.className = 'thesis-explorer-modal';
      modal.innerHTML = `
        <div class="explorer-window" role="dialog" aria-modal="true">
          <!-- Window Header -->
          <div class="explorer-header">
            <div class="explorer-header-left">
              <div class="explorer-header-icon">💻</div>
              <div class="explorer-header-title">
                <h2>Hub - Scripts &amp; Pipelines</h2>
                <span>Computational Architecture &amp; Empirical Routines • CAU Kiel</span>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="explorer-search-wrapper">
              <span class="explorer-search-icon">🔍</span>
              <input type="text" id="explorer-search-input" class="explorer-search-input" placeholder="Search scripts, models, functions (e.g., EddyPro, gap-filling, Casagrande)..." autocomplete="off" />
              <div id="explorer-search-results" class="explorer-search-results"></div>
            </div>

            <!-- Right Controls -->
            <div class="explorer-header-right">
              <button class="explorer-ctrl-btn pitch-btn" id="explorer-pitch-btn" title="Open Twin Executive Pitch Presentation">
                🎯 <span>Executive Pitch</span>
              </button>
              <button class="explorer-ctrl-btn twin-return-btn" id="explorer-twin-btn" title="Jump directly to the Interactive Digital Twin">
                🌱 <span>Go to Digital Twin</span>
              </button>
              <button class="explorer-ctrl-btn" id="explorer-copy-btn" title="Copy current script / diagram code">
                📋 <span>Copy Code</span>
              </button>
              <button class="explorer-ctrl-btn close-btn" id="explorer-close-btn" title="Close (Esc)">
                ✕ <span>Close</span>
              </button>
            </div>
          </div>

          <!-- Window Body (Dual Pane) -->
          <div class="explorer-body">
            <!-- Left Sidebar Navigation -->
            <div class="explorer-sidebar" id="explorer-sidebar">
              <div style="padding: 16px; color: #94a3b8; font-size: 13px;">Loading scripts and pipelines...</div>
            </div>

            <!-- Main Document Area -->
            <div class="explorer-main">
              <div class="explorer-toolbar">
                <div class="explorer-breadcrumb" id="explorer-breadcrumb">
                  <span>Hub</span> › <span class="explorer-breadcrumb-current" id="explorer-active-title">Select Script or Pipeline</span>
                </div>
                <div class="explorer-toolbar-actions" id="explorer-toolbar-actions">
                  <span id="explorer-file-size" style="font-size: 11px; color: #64748b;"></span>
                </div>
              </div>

              <div class="explorer-viewport" id="explorer-viewport">
                <div style="text-align: center; padding: 60px 20px; color: #64748b;">
                  <div style="font-size: 40px; margin-bottom: 12px;">💻</div>
                  <h3>Loading pipeline architecture...</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  bindEvents() {
    const openBtn = document.getElementById('btn-open-explorer');
    const closeBtn = document.getElementById('explorer-close-btn');
    const pitchBtn = document.getElementById('explorer-pitch-btn');
    const twinBtn = document.getElementById('explorer-twin-btn');
    const modal = document.getElementById('thesis-explorer-modal');
    const searchInput = document.getElementById('explorer-search-input');
    const copyBtn = document.getElementById('explorer-copy-btn');

    if (openBtn) {
      openBtn.addEventListener('click', () => this.open());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (pitchBtn) {
      pitchBtn.addEventListener('click', () => this.showPitchDeck(0));
    }

    if (twinBtn) {
      twinBtn.addEventListener('click', () => {
        this.close();
        const app = window.presentationApp || window.app;
        if (app && app.switchView) {
          app.switchView('soil_interface');
        } else {
          const btn = document.getElementById('tab-soil-interface');
          if (btn) btn.click();
        }
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyCurrentContent());
    }

    // Atajos de teclado: 't', 'h', 'Escape' y flechas en modo Pitch
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        this.close();
      } else if ((e.key === 't' || e.key === 'T' || e.key === 'h' || e.key === 'H') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (modal && modal.classList.contains('active')) {
          this.close();
        } else {
          this.open();
        }
      } else if (this.isPitchMode && modal && modal.classList.contains('active') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          this.nextPitchSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          this.prevPitchSlide();
        }
      }
    });

    // Búsqueda interactiva debounced
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(this.searchDebounceTimer);
        if (query.length < 2) {
          const resEl = document.getElementById('explorer-search-results');
          if (resEl) resEl.classList.remove('active');
          return;
        }
        this.searchDebounceTimer = setTimeout(() => this.performSearch(query), 220);
      });
    }

    // Deep-linking with URL hash slugs (#pitch/slug or #pitch)
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#pitch')) {
        const slug = hash.replace(/^#pitch\/?/, '');
        this.open();
        this.showPitchDeck(slug || 0);
      }
    };

    window.addEventListener('hashchange', handleHash);
    setTimeout(handleHash, 200);
  }

  open() {
    const modal = document.getElementById('thesis-explorer-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (!this.treeData) {
      this.fetchTree();
    }
  }

  close() {
    const modal = document.getElementById('thesis-explorer-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const resEl = document.getElementById('explorer-search-results');
    if (resEl) resEl.classList.remove('active');

    // Reset hash if currently on pitch deck
    if (window.location.hash.startsWith('#pitch') && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }

  async fetchTree() {
    try {
      let data = null;
      try {
        const res = await fetch('/api/explorer/tree');
        if (res.ok) data = await res.json();
      } catch (e) {}

      if (!data) {
        const resStatic = await fetch('explorer_tree.json');
        if (resStatic.ok) data = await resStatic.json();
      }

      if (data && data.status === 'ok') {
        this.treeData = data;
        this.renderSidebar();
        // Cargar por defecto el primer pipeline Mermaid
        const defaultPath = (this.treeData.mermaid_pipelines && this.treeData.mermaid_pipelines[0])
          ? this.treeData.mermaid_pipelines[0].path
          : 'scripts_hub/mermaid/00_digital_twin_software_architecture.md';
        this.loadFile(defaultPath);
      } else {
        throw new Error('Could not load scripts and pipelines catalog.');
      }
    } catch (err) {
      console.error('Error fetching tree:', err);
      const sb = document.getElementById('explorer-sidebar');
      if (sb) sb.innerHTML = `<div style="padding:16px; color:#ef4444;">Error loading scripts & pipelines catalog.</div>`;
    }
  }

  renderSidebar() {
    const sb = document.getElementById('explorer-sidebar');
    if (!sb || !this.treeData) return;

    let html = '';

    // 0. Executive Pitch Deck (Interactive Slides)
    html += `
      <div class="explorer-nav-section pitch-nav-section" style="padding-bottom: 6px;">
        <div class="explorer-file-item pitch-file-item" id="sidebar-pitch-deck-btn" title="Open Twin Executive Pitch Presentation">
          <div class="explorer-file-left">
            <span class="explorer-file-icon">🎯</span>
            <span class="explorer-file-label" style="font-weight: 700; color: #fb7185;">Executive Pitch Deck</span>
          </div>
          <span class="explorer-file-badge badge-rose" style="font-weight: 800; background: rgba(244,63,94,0.2); color:#fda4af; border:1px solid rgba(244,63,94,0.4);">10 SLIDES</span>
        </div>
      </div>
    `;

    // 1. Mermaid Production Pipelines
    if (this.treeData.mermaid_pipelines && this.treeData.mermaid_pipelines.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>📊 Production Architecture &amp; Pipelines</span>
          </div>
      `;
      for (const item of this.treeData.mermaid_pipelines) {
        const badgeClass = item.color ? `badge-${item.color}` : 'badge-emerald';
        html += `
          <div class="explorer-file-item" data-path="${item.path}" title="${item.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">⚡</span>
              <span class="explorer-file-label">${item.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${item.badge || 'MERMAID'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    // 2. Eddy Covariance Scripts
    if (this.treeData.eddy_scripts && this.treeData.eddy_scripts.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>🗼 Eddy Covariance &amp; Fluxes (R)</span>
          </div>
      `;
      for (const s of this.treeData.eddy_scripts) {
        const badgeClass = s.color ? `badge-${s.color}` : 'badge-blue';
        html += `
          <div class="explorer-file-item" data-path="${s.path}" title="${s.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">📈</span>
              <span class="explorer-file-label">${s.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${s.badge || 'R'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    // 3. Chamber Network Scripts
    if (this.treeData.chamber_scripts && this.treeData.chamber_scripts.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>🧪 Gas Chambers &amp; Transects (R)</span>
          </div>
      `;
      for (const s of this.treeData.chamber_scripts) {
        const badgeClass = s.color ? `badge-${s.color}` : 'badge-amber';
        html += `
          <div class="explorer-file-item" data-path="${s.path}" title="${s.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">⚗️</span>
              <span class="explorer-file-label">${s.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${s.badge || 'R'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    // 4. Meteophysics & Environmental Biomet
    if (this.treeData.meteophysics_scripts && this.treeData.meteophysics_scripts.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>☀️ Meteophysics &amp; Biomet Drivers (R)</span>
          </div>
      `;
      for (const s of this.treeData.meteophysics_scripts) {
        const badgeClass = s.color ? `badge-${s.color}` : 'badge-cyan';
        html += `
          <div class="explorer-file-item" data-path="${s.path}" title="${s.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">⛅</span>
              <span class="explorer-file-label">${s.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${s.badge || 'R'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    // 5. Soil Physics & Geomechanics
    if (this.treeData.soil_physics_scripts && this.treeData.soil_physics_scripts.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>🌱 Soil Physics &amp; Geomechanics (R/Python)</span>
          </div>
      `;
      for (const s of this.treeData.soil_physics_scripts) {
        const badgeClass = s.color ? `badge-${s.color}` : 'badge-purple';
        html += `
          <div class="explorer-file-item" data-path="${s.path}" title="${s.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">🔬</span>
              <span class="explorer-file-label">${s.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${s.badge || 'R'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    // 6. Master Pipelines & Budgets
    if (this.treeData.pipeline_scripts && this.treeData.pipeline_scripts.length > 0) {
      html += `
        <div class="explorer-nav-section">
          <div class="explorer-nav-section-title">
            <span>⚙️ Master Pipelines &amp; GHG Budgets</span>
          </div>
      `;
      for (const s of this.treeData.pipeline_scripts) {
        const badgeClass = s.color ? `badge-${s.color}` : 'badge-emerald';
        html += `
          <div class="explorer-file-item" data-path="${s.path}" title="${s.path}">
            <div class="explorer-file-left">
              <span class="explorer-file-icon">🚀</span>
              <span class="explorer-file-label">${s.title}</span>
            </div>
            <span class="explorer-file-badge ${badgeClass}">${s.badge || 'Pipeline'}</span>
          </div>
        `;
      }
      html += `</div>`;
    }

    sb.innerHTML = html;

    // Vincular botón especial del Pitch Deck
    const sidePitchBtn = document.getElementById('sidebar-pitch-deck-btn');
    if (sidePitchBtn) {
      sidePitchBtn.addEventListener('click', () => {
        sb.querySelectorAll('.explorer-file-item').forEach(i => i.classList.remove('active'));
        sidePitchBtn.classList.add('active');
        this.showPitchDeck(0);
      });
    }

    // Vincular clics en archivos
    sb.querySelectorAll('.explorer-file-item[data-path]').forEach(el => {
      el.addEventListener('click', () => {
        sb.querySelectorAll('.explorer-file-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');

        const path = el.getAttribute('data-path');
        if (path) this.loadFile(path);
      });
    });
  }

  async loadFile(path) {
    this.isPitchMode = false;
    const vp = document.getElementById('explorer-viewport');
    const titleEl = document.getElementById('explorer-active-title');
    const sizeEl = document.getElementById('explorer-file-size');

    if (!vp) return;
    vp.innerHTML = `<div style="text-align:center; padding: 60px; color:#94a3b8;">Loading file...</div>`;
    if (titleEl) titleEl.innerText = path.split('/').pop();

    // Sincronizar item activo en el sidebar
    const sb = document.getElementById('explorer-sidebar');
    if (sb) {
      sb.querySelectorAll('.explorer-file-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-path') === path);
      });
    }

    try {
      let data = null;
      try {
        const res = await fetch(`/api/explorer/file?path=${encodeURIComponent(path)}`);
        if (res.ok) data = await res.json();
      } catch (e) {}

      if (!data) {
        // Fallback para GitHub Pages o entorno puramente estático
        const staticRes = await fetch(path);
        if (staticRes.ok) {
          const content = await staticRes.text();
          const ext = path.split('.').pop().toLowerCase();
          const type = ext === 'md' ? 'markdown' : (ext === 'csv' ? 'csv' : 'code');
          data = {
            title: path.split('/').pop(),
            path: path,
            size: content.length,
            type: type,
            content: content
          };
        } else {
          throw new Error('Requested file could not be found.');
        }
      }

      this.currentFile = data;

      if (data.error) {
        vp.innerHTML = `<div style="color:#ef4444; padding:20px;">Error: ${data.error}</div>`;
        return;
      }

      if (sizeEl && data.size) {
        sizeEl.innerText = `${(data.size / 1024).toFixed(1)} KB`;
      }

      if (data.type === 'markdown') {
        vp.innerHTML = `<div class="explorer-markdown">${this.parseMarkdown(data.content)}</div>`;
        this.renderMermaidInContainer(vp);
      } else if (data.type === 'csv') {
        this.renderCSVTable(data, vp);
      } else if (data.type === 'code') {
        this.renderCodeView(data, vp);
      } else if (data.type === 'image') {
        vp.innerHTML = `
          <div style="text-align:center; padding:20px;">
            <img src="${data.raw_url}" style="max-width:100%; max-height:75vh; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5);" />
            <h4 style="margin-top:16px; color:#f1f5f9;">${data.title}</h4>
          </div>
        `;
      }
    } catch (err) {
      console.error('Error loading file:', err);
      vp.innerHTML = `<div style="color:#ef4444; padding:20px;">Error de red al cargar el archivo.</div>`;
    }
  }

  renderCSVTable(data, container) {
    let html = `
      <div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
        <h3 style="color:#38bdf8; margin:0;">${data.title}</h3>
        <span style="font-size:12px; color:#94a3b8;">${data.rows.length} filas analizadas</span>
      </div>
      <div class="explorer-csv-wrapper">
        <table class="explorer-csv-table">
          <thead>
            <tr>
              ${(data.headers || []).map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${(data.rows || []).map(r => `
              <tr>
                ${r.map(cell => `<td>${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  }

  renderCodeView(data, container) {
    const ext = (data.path || '').split('.').pop().toLowerCase();
    const lines = (data.content || '').split('\n');
    let codeHtml = lines.map((l, i) => `
      <div class="r-code-line">
        <span class="r-line-number">${i+1}</span>
        <span class="r-line-content">${this.highlightSyntax(l, ext)}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="r-code-container">
        <div class="r-code-header">
          <div class="r-code-header-left">
            <span class="r-lang-badge">${ext.toUpperCase()} Source</span>
            <span class="r-filename">${data.title || data.path}</span>
          </div>
          <div class="r-code-header-right">
            <span>${lines.length} lines • RStudio Dark</span>
          </div>
        </div>
        <div class="r-code-body">
          ${codeHtml}
        </div>
      </div>
    `;
  }

  highlightSyntax(line, ext = 'r') {
    if (!line) return '';

    // 1. Extraer strings primero para proteger su contenido de tokens posteriores
    const stringMatches = [];
    let processed = line.replace(/(".*?"|'.*?')/g, (match) => {
      const idx = stringMatches.length;
      stringMatches.push(match);
      return `@@CODE_STR_${idx}@@`;
    });

    // 2. Extraer comentarios (# ...)
    let comment = '';
    const hashIdx = processed.indexOf('#');
    if (hashIdx !== -1) {
      comment = processed.substring(hashIdx);
      processed = processed.substring(0, hashIdx);
    }

    // 3. Escapar caracteres HTML en el código ejecutable
    processed = this.escapeHtml(processed);

    // 4. Tokenización semántica R / Python
    // Palabras clave de control y tipos
    const rKeywords = /\b(library|require|function|if|else|repeat|while|for|in|next|break|return|TRUE|FALSE|NULL|NA|NaN|Inf|switch|tryCatch|import|from|def|class|with|as|lambda|None|True|False)\b/g;
    processed = processed.replace(rKeywords, '<span class="r-kw">$1</span>');

    // Operadores característicos de R (<- , %>% , etc.)
    processed = processed.replace(/(&lt;-|-&gt;|%&gt;%|%in%|%*%)/g, '<span class="r-op-special">$1</span>');
    processed = processed.replace(/(\=\=|\!\=|\&lt;\=|\&gt;\=|\+|\-|\*|\/|\^|\&amp;{1,2}|\|{1,2}|\!|\~|\$)/g, '<span class="r-op">$1</span>');

    // Funciones comunes en R y bioestadística
    const rFunctions = /\b(data\.frame|tibble|as_tibble|mutate|filter|select|group_by|summarise|summarize|arrange|rename|left_join|inner_join|full_join|ggplot|aes|geom_[a-z_]+|theme_[a-z_]+|labs|ggsave|scale_[a-z_]+|facet_[a-z_]+|read\.csv|read_csv|write\.csv|write_rds|read_rds|c|list|vector|matrix|array|names|colnames|rownames|dim|nrow|ncol|head|tail|str|summary|mean|median|sd|var|min|max|sum|round|print|cat|paste0|paste|sprintf|seq|rep|which|is\.na|complete\.cases|as\.numeric|as\.character|as\.Date|as\.POSIXct|factor|levels|lm|glm|nls|predict|residuals|plot|lines|points|abline|ranger|randomForest|sEddyProc)\b/g;
    processed = processed.replace(rFunctions, '<span class="r-fn">$1</span>');

    // Números (enteros, decimales, notación científica)
    processed = processed.replace(/\b(\d+(\.\d+)?([eE][+-]?\d+)?)\b/g, '<span class="r-num">$1</span>');

    // 5. Restaurar strings con clase de estilizado
    stringMatches.forEach((str, idx) => {
      const escStr = this.escapeHtml(str);
      processed = processed.replace(`@@CODE_STR_${idx}@@`, `<span class="r-str">${escStr}</span>`);
    });

    // 6. Restaurar comentarios si existen
    if (comment) {
      const escComment = this.escapeHtml(comment);
      processed += `<span class="r-com">${escComment}</span>`;
    }

    return processed;
  }

  renderFiguresGallery() {
    const vp = document.getElementById('explorer-viewport');
    const titleEl = document.getElementById('explorer-active-title');
    if (titleEl) titleEl.innerText = 'Galería de Figuras Oficiales';
    if (!vp || !this.treeData) return;

    const figures = this.treeData.figures || [];
    let html = `
      <div style="margin-bottom: 24px;">
        <h2 style="color:#f8fafc; margin:0 0 6px 0;">Figuras de Alta Resolución del Proyecto</h2>
        <p style="color:#94a3b8; font-size:14px; margin:0;">Haz clic en cualquier gráfico para inspeccionarlo en tamaño completo.</p>
      </div>
      <div class="explorer-gallery-grid">
    `;

    for (const f of figures) {
      const rawUrl = `/api/explorer/raw?path=${encodeURIComponent(f.path)}`;
      html += `
        <div class="explorer-gallery-card" onclick="window.open('${rawUrl}', '_blank')">
          <img src="${rawUrl}" loading="lazy" alt="${f.title}" />
          <div class="explorer-gallery-info">
            <div class="explorer-gallery-title">${f.title}</div>
            <div style="font-size:11px; color:#64748b; margin-top:4px;">${(f.size / 1024).toFixed(0)} KB</div>
          </div>
        </div>
      `;
    }

    html += `</div>`;
    vp.innerHTML = html;
  }

  async performSearch(query) {
    const resEl = document.getElementById('explorer-search-results');
    if (!resEl) return;

    try {
      const res = await fetch(`/api/explorer/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.results || [];

      if (results.length === 0) {
        resEl.innerHTML = `<div style="padding:12px; color:#94a3b8; font-size:13px;">No se encontraron coincidencias para "${query}".</div>`;
        resEl.classList.add('active');
        return;
      }

      let html = `<div style="padding:6px 12px; font-size:11px; font-weight:700; color:#10b981; text-transform:uppercase;">${results.length} coincidencias encontradas:</div>`;
      for (const r of results) {
        const highlighted = r.snippet.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>');
        html += `
          <div class="explorer-search-item" data-path="${r.file}">
            <div class="explorer-search-meta">${r.filename} • Línea ${r.line}</div>
            <div class="explorer-search-snippet">${highlighted}</div>
          </div>
        `;
      }
      resEl.innerHTML = html;
      resEl.classList.add('active');

      resEl.querySelectorAll('.explorer-search-item').forEach(el => {
        el.addEventListener('click', () => {
          const path = el.getAttribute('data-path');
          if (path) {
            this.loadFile(path);
            resEl.classList.remove('active');
          }
        });
      });
    } catch (err) {
      console.error('Error during search:', err);
    }
  }

  copyCurrentContent() {
    if (!this.currentFile) return;
    const textToCopy = this.currentFile.content || this.currentFile.raw || '';
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const btn = document.getElementById('explorer-copy-btn');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = `✓ <span>Copiado!</span>`;
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      }
    });
  }

  renderMermaidInContainer(container) {
    if (!container) return;
    const mermaidBlocks = container.querySelectorAll('.mermaid');
    if (mermaidBlocks.length > 0 && window.mermaid) {
      try {
        window.mermaid.run({ nodes: mermaidBlocks });
      } catch (err) {
        console.warn('Mermaid rendering issue, retrying with init:', err);
        try {
          window.mermaid.init(undefined, mermaidBlocks);
        } catch (e) {
          console.error('Mermaid render error:', e);
        }
      }
    }
  }

  parseMarkdown(text) {
    if (!text) return '';

    // Extraer y proteger bloques mermaid antes del formateo regular
    const mermaidMatches = [];
    let processed = text.replace(/```mermaid\s*([\s\S]*?)```/g, (match, code) => {
      const idx = mermaidMatches.length;
      mermaidMatches.push(code.trim());
      return `@@MERMAID_BLOCK_${idx}@@`;
    });

    // Sanitización y parseo seguro
    let html = processed
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Inline Code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      // Horizontal Rule
      .replace(/^---$/gim, '<hr style="border:none; border-top:1px solid rgba(255,255,255,0.1); margin:24px 0;" />')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>');

    // Tablas básicas en Markdown
    html = html.replace(/\|(.+)\|/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim() !== '');
      if (match.includes('---')) return '';
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    });

    html = '<p>' + html + '</p>';
    // Envolver grupos de <tr> en <table>
    html = html.replace(/(<tr>.*?<\/tr>)+/gs, (m) => `<table style="width:100%; margin: 16px 0;">${m}</table>`);
    // Envolver grupos de <li> en <ul>
    html = html.replace(/(<li>.*?<\/li>)+/gs, (m) => `<ul>${m}</ul>`);

    // Reinsertar bloques mermaid interactivos
    mermaidMatches.forEach((code, idx) => {
      const blockHtml = `
        <div class="mermaid-diagram-wrap" style="margin: 20px 0; background: #0f172a; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 20px; overflow-x: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <div class="mermaid">${this.escapeHtml(code)}</div>
        </div>
      `;
      html = html.replace(`@@MERMAID_BLOCK_${idx}@@`, blockHtml);
    });

    return html;
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  showPitchDeck(slideIdentifier = 0) {
    this.isPitchMode = true;
    const slides = this.getPitchSlides();

    if (typeof slideIdentifier === 'string') {
      const cleanSlug = slideIdentifier.toLowerCase().trim();
      const foundIdx = slides.findIndex(s => s.slug.toLowerCase() === cleanSlug);
      this.pitchSlideIndex = foundIdx !== -1 ? foundIdx : 0;
    } else {
      this.pitchSlideIndex = Math.max(0, Math.min(slideIdentifier, slides.length - 1));
    }

    const current = slides[this.pitchSlideIndex];
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, null, `#pitch/${current.slug}`);
    }

    const titleEl = document.getElementById('explorer-active-title');
    const sizeEl = document.getElementById('explorer-file-size');
    if (titleEl) titleEl.innerText = `🎯 Pitch Deck • ${current.shortTitle}`;
    if (sizeEl) sizeEl.innerText = `#pitch/${current.slug}`;

    const sb = document.getElementById('explorer-sidebar');
    if (sb) {
      sb.querySelectorAll('.explorer-file-item').forEach(i => i.classList.remove('active'));
      const sidePitchBtn = document.getElementById('sidebar-pitch-deck-btn');
      if (sidePitchBtn) sidePitchBtn.classList.add('active');
    }

    this.renderPitchDeck();
  }

  nextPitchSlide() {
    const slides = this.getPitchSlides();
    if (this.pitchSlideIndex < slides.length - 1) {
      this.pitchSlideIndex++;
      const current = slides[this.pitchSlideIndex];
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, `#pitch/${current.slug}`);
      }
      this.renderPitchDeck();
    }
  }

  prevPitchSlide() {
    if (this.pitchSlideIndex > 0) {
      this.pitchSlideIndex--;
      const slides = this.getPitchSlides();
      const current = slides[this.pitchSlideIndex];
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, `#pitch/${current.slug}`);
      }
      this.renderPitchDeck();
    }
  }

  goToPitchSlide(idx) {
    const slides = this.getPitchSlides();
    if (idx >= 0 && idx < slides.length) {
      this.pitchSlideIndex = idx;
      const current = slides[this.pitchSlideIndex];
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, `#pitch/${current.slug}`);
      }
      this.renderPitchDeck();
    }
  }

  renderPitchDeck() {
    const vp = document.getElementById('explorer-viewport');
    if (!vp) return;

    const slides = this.getPitchSlides();
    const current = slides[this.pitchSlideIndex];
    const total = slides.length;

    const dotsHtml = slides.map((s, idx) => `
      <button class="pitch-step-dot ${idx === this.pitchSlideIndex ? 'active' : ''}" data-index="${idx}" title="Slide ${idx+1}: ${s.shortTitle} (#pitch/${s.slug})">
        ${idx + 1}
      </button>
    `).join('');

    vp.innerHTML = `
      <div class="pitch-deck-container">
        <!-- Deck Header & Navigation Toolbar -->
        <div class="pitch-deck-toolbar">
          <div class="pitch-deck-stepper">
            <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-right: 6px; font-family:'JetBrains Mono', monospace;">Slides</span>
            ${dotsHtml}
          </div>
          <div class="pitch-deck-controls">
            <span style="font-size: 12px; font-weight: 600; color: #cbd5e1; margin-right: 8px; font-family:'JetBrains Mono', monospace;">
              ${this.pitchSlideIndex + 1} / ${total}
            </span>
            <button class="pitch-nav-btn" id="pitch-prev-btn" ${this.pitchSlideIndex === 0 ? 'disabled' : ''}>
              ← Previous
            </button>
            <button class="pitch-nav-btn" id="pitch-next-btn" ${this.pitchSlideIndex === total - 1 ? 'disabled' : ''}>
              Next →
            </button>
          </div>
        </div>

        <!-- Active Slide Canvas Card -->
        <div class="pitch-slide-card">
          <div class="pitch-slide-header-wrap">
            <div class="pitch-slide-tag">${current.tag}</div>
            <button class="pitch-slug-badge" id="btn-copy-slide-slug" title="Click to copy direct slide URL">
              🔗 #pitch/${current.slug}
            </button>
          </div>
          <h2 class="pitch-slide-title">${current.title}</h2>
          <p class="pitch-slide-subtitle">${current.subtitle}</p>

          <div class="pitch-slide-body">
            ${current.contentHtml}
          </div>

          <!-- Bottom Slide Footer Actions -->
          <div class="pitch-footer-actions">
            <div style="font-size: 12px; color: #64748b; font-family:'JetBrains Mono', monospace; display:flex; align-items:center; gap:8px;">
              <span>🌾 Wallener Au Peatland Digital Twin</span>
              <span>•</span>
              <span>CAU Kiel Agroecology Observatory</span>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="pitch-action-btn secondary" id="pitch-view-pipelines-btn">
                📊 View Data Pipelines
              </button>
              <button class="pitch-action-btn primary" id="pitch-launch-twin-btn">
                🌱 Launch Live Twin ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Vincular navegación de botones
    const prevBtn = document.getElementById('pitch-prev-btn');
    const nextBtn = document.getElementById('pitch-next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevPitchSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPitchSlide());

    vp.querySelectorAll('.pitch-step-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) this.goToPitchSlide(idx);
      });
    });

    const copySlugBtn = document.getElementById('btn-copy-slide-slug');
    if (copySlugBtn) {
      copySlugBtn.addEventListener('click', () => {
        const fullUrl = window.location.origin + window.location.pathname + '#pitch/' + current.slug;
        navigator.clipboard.writeText(fullUrl).then(() => {
          copySlugBtn.innerHTML = `✓ Copied link!`;
          setTimeout(() => {
            copySlugBtn.innerHTML = `🔗 #pitch/${current.slug}`;
          }, 2000);
        });
      });
    }

    const launchBtn = document.getElementById('pitch-launch-twin-btn');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        this.close();
        const app = window.presentationApp || window.app;
        if (app && app.switchView) {
          app.switchView('soil_interface');
        } else {
          const b = document.getElementById('tab-soil-interface');
          if (b) b.click();
        }
      });
    }

    const pipesBtn = document.getElementById('pitch-view-pipelines-btn');
    if (pipesBtn) {
      pipesBtn.addEventListener('click', () => {
        this.loadFile('scripts_hub/mermaid/00_digital_twin_software_architecture.md');
      });
    }
  }

  getPitchSlides() {
    return [
      {
        shortTitle: '01. Vision',
        slug: 'vision',
        tag: 'SLIDE 01 / 10 • THE PEATLAND TWIN VISION',
        title: 'The Living Peatland: From Static Sensor Data to an Interactive Digital Twin',
        subtitle: 'Synthesizing multi-scale micrometeorology and soil mechanics into a real-time predictive laboratory',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🌊 Continuous Hydrology</span>
              </div>
              <p class="pitch-box-desc">
                Simulates the vertical continuum across the full range from <strong>+5 cm surface ponding</strong> down to <strong>-60 cm severe summer drought drawdown</strong>.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>⚡ 60 FPS Deterministic Loop</span>
              </div>
              <p class="pitch-box-desc">
                Recalculates instantaneous mass and energy balances for <strong>CO₂, CH₄, and N₂O</strong> with zero graphic lag using hardware-accelerated SVG shaders.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #fbbf24;">
                <span>🌾 Stratigraphic Coupling</span>
              </div>
              <p class="pitch-box-desc">
                Explicitly links the living <strong>Acrotelm</strong>, the compacted agricultural <strong>plow pan (10–25 cm)</strong>, and the saturated anoxic <strong>Catotelm</strong>.
              </p>
            </div>
          </div>

          <div class="pitch-kpi-bar" style="margin-top: 6px;">
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">14,993</div>
              <div class="pitch-kpi-label">Half-Hourly EC Blocks</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">60 FPS</div>
              <div class="pitch-kpi-label">Fluid Graphic Execution</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">3 Gases</div>
              <div class="pitch-kpi-label">Coupled CO₂ / CH₄ / N₂O</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">2 Cycles</div>
              <div class="pitch-kpi-label">24h Diurnal & 365d Annual</div>
            </div>
          </div>
        `
      },
      {
        shortTitle: '02. The Dilemma',
        slug: 'the-problem',
        tag: 'SLIDE 02 / 10 • THE SCIENTIFIC DILEMMA',
        title: 'Why Static Academic Tables Fail Living Wetlands',
        subtitle: 'Peatlands are governed by sharp hydrological tipping points that static PDFs cannot convey',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box danger-box">
              <div class="pitch-box-title" style="color: #f87171;">
                <span>🔒 The Static Data Trap</span>
              </div>
              <p class="pitch-box-desc">
                Millions of raw sensor observations get buried in thesis annexes and static charts. Decision-makers only see annual cumulative numbers (e.g. -1,457 g CO₂-eq m⁻² yr⁻¹), completely obscuring the non-linear seasonal tipping points.
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li>Cannot test hypothetical management scenarios.</li>
                <li>Hides rapid post-flooding methane bursts.</li>
                <li>Static graphics cannot model diurnal turbulence transitions.</li>
              </ul>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🌿 The Non-Linear Wetland Reality</span>
              </div>
              <p class="pitch-box-desc">
                A water table change of just 5 cm completely reverses the ecosystem's climate forcing:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li><strong>Rapid Rewetting (WTD ≥ -10 cm):</strong> Triggers an immediate ebullition transient spike (>110 nmol CH₄ m⁻² s⁻¹).</li>
                <li><strong>Summer Drought (WTD ≤ -35 cm):</strong> Disables methanogenesis while triggering runaway aerobic peat mineralization (>10 µmol CO₂ m⁻² s⁻¹).</li>
              </ul>
            </div>
          </div>

          <div class="pitch-callout-quote" style="margin-top: 4px;">
            A digital twin allows students, scientists, and wetland authorities to <strong>interactively experience and predict non-linear tipping points</strong> before altering real-world peatland hydrology.
          </div>
        `
      },
      {
        shortTitle: '03. Local Computing',
        slug: 'local-computing',
        tag: 'SLIDE 03 / 10 • PHASE 1: LOCAL COMPUTATION',
        title: 'Phase 1 — Heavy Analytical Computing on the Local Machine',
        subtitle: 'Grounding the Digital Twin in the full multi-scale empirical campaign of Wallener Au',
        contentHtml: `
          <div class="pitch-callout-quote">
            All raw gigabytes were cleaned and processed locally in R and EddyPro. <strong>The heavy computational lifting was completed once on the researcher's computer</strong>, ensuring zero client-side delay in the browser.
          </div>

          <div class="pitch-grid-3" style="margin-top: 6px;">
            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>🗼 1. Eddy Covariance (10 Hz)</span>
              </div>
              <p class="pitch-box-desc">
                Processed in EddyPro 7.0.9: Vickers & Mahrt despiking, Wilczak 3D planar fit coordinate rotation, and WPL air density corrections across <strong>14,993 half-hourly flux blocks</strong>.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #fbbf24;">
                <span>🧪 2. Chamber Network (Collars 1–8)</span>
              </div>
              <p class="pitch-box-desc">
                Fitted with non-linear HMR and linear flux regressions across ditch-to-paddock transects, capturing localized spatial ebullition chimneys and N₂O pulses.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #a855f7;">
                <span>🔬 3. Soil Mechanics Laboratory</span>
              </div>
              <p class="pitch-box-desc">
                Undisturbed 100 cm³ core oedometer tests (6 to 400 kPa) in CAU Kiel soil physics lab determining precompression stress and void ratios across depths.
              </p>
            </div>
          </div>
        `
      },
      {
        shortTitle: '04. Governing Curves',
        slug: 'empirical-curves',
        tag: 'SLIDE 04 / 10 • PHASE 2: PARAMETRIC EXTRACTION',
        title: 'Phase 2 — Extracting Governing Biophysical Curves & Thresholds',
        subtitle: 'Distilling gigabytes of field measurements into mathematical response functions',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>☀️ Canopy Assimilation (GPP)</span>
              </div>
              <p class="pitch-box-desc">
                Fitted with Michaelis-Menten rectangular hyperbola:
              </p>
              <div style="font-family:'JetBrains Mono', monospace; font-size:14px; color:#38bdf8; background:rgba(15,23,42,0.6); padding:8px 12px; border-radius:6px; margin:4px 0;">
                GPP_max = 6.8 µmol m⁻² s⁻¹
              </div>
              <p style="font-size:12px; color:#94a3b8; margin:0;">
                Saturates with incoming shortwave radiation; stress-inhibited during midday dry VPD excursions (>1.2 kPa).
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #fbbf24;">
                <span>🍂 Ecosystem Respiration (Reco)</span>
              </div>
              <p class="pitch-box-desc">
                Parameterized with Lloyd & Taylor nocturnal model:
              </p>
              <div style="font-family:'JetBrains Mono', monospace; font-size:14px; color:#fbbf24; background:rgba(15,23,42,0.6); padding:8px 12px; border-radius:6px; margin:4px 0;">
                Reco = 0.8 + 10.5 × d_oxic [µmol m⁻² s⁻¹]
              </div>
              <p style="font-size:12px; color:#94a3b8; margin:0;">
                Aerobic microbial respiration surges dramatically as the oxic layer deepens during summer drought.
              </p>
            </div>
          </div>

          <div class="pitch-grid-2" style="margin-top: 6px;">
            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #f43f5e;">
                <span>🌬️ Friction Velocity Threshold (u*)</span>
              </div>
              <p class="pitch-box-desc">
                Derived via Papale (2006) moving-window bootstrapping:
              </p>
              <div style="font-family:'JetBrains Mono', monospace; font-size:14px; color:#f43f5e; background:rgba(15,23,42,0.6); padding:8px 12px; border-radius:6px; margin:4px 0;">
                u*_threshold = 0.12 m/s
              </div>
              <p style="font-size:12px; color:#94a3b8; margin:0;">
                Controls nocturnal atmospheric decoupling and surface gas accumulation under calm conditions.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #a855f7;">
                <span>🚜 Plow Pan Overconsolidation (σp)</span>
              </div>
              <p class="pitch-box-desc">
                Fitted with Casagrande & Schmertmann methods:
              </p>
              <div style="font-family:'JetBrains Mono', monospace; font-size:14px; color:#a855f7; background:rgba(15,23,42,0.6); padding:8px 12px; border-radius:6px; margin:4px 0;">
                σp = 38.4 ± 4.2 kPa | ρb = 0.38 g/cm³
              </div>
              <p style="font-size:12px; color:#94a3b8; margin:0;">
                Identifies mechanical plow pan at 10–25 cm that creates perched water tables and restricts diffusion.
              </p>
            </div>
          </div>
        `
      },
      {
        shortTitle: '05. Web Translation',
        slug: 'realtime-engine',
        tag: 'SLIDE 05 / 10 • PHASE 3: WEB TRANSLATION',
        title: 'Phase 3 — Translating Equations into the Web Simulation Engine',
        subtitle: 'The core engineering mechanism: Physics-Informed Determinism vs. CSV Streaming',
        contentHtml: `
          <div class="pitch-callout-quote">
            <strong>Did you parameterize on your PC and model equations in the app? YES, EXACTLY:</strong> Rather than streaming tens of megabytes of raw sensor rows, the web twin embeds the derived biophysical laws directly into <code>soil_model.js</code>, evaluating balances in &lt;1 ms.
          </div>

          <div class="pitch-grid-3" style="margin-top: 6px;">
            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>⚡ Instant 60 FPS Fluidity</span>
              </div>
              <p class="pitch-box-desc">
                Every movement of the water table slider triggers immediate recalculation without network requests, data transfer delay, or server dependencies.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>🧪 Counterfactual Exploration</span>
              </div>
              <p class="pitch-box-desc">
                Users can explore arbitrary hydrological regimes (e.g., maintaining WTD at -12 cm throughout August) that never occurred during the historical monitoring period.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #fbbf24;">
                <span>🔒 Zero Data Leakage</span>
              </div>
              <p class="pitch-box-desc">
                Zero bytes of raw unpublished sensor measurement tables are uploaded to the public internet, safeguarding the research team's intellectual property.
              </p>
            </div>
          </div>
        `
      },
      {
        shortTitle: '06. Architecture',
        slug: 'architecture',
        tag: 'SLIDE 06 / 10 • SYSTEM ARCHITECTURE',
        title: 'Decoupled 3-Tier Architecture & Reactive SVG Scene Graph',
        subtitle: 'High-frequency biophysical computation decoupled from graphic rendering for silky 60 FPS',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box" style="border-top: 3px solid #818cf8;">
              <div class="pitch-box-title" style="color: #a5b4fc;">
                <span>⏱️ Tier 1: Temporal Engine</span>
              </div>
              <p class="pitch-box-desc">
                <strong>digital_twin_engine.js:</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li><code>requestAnimationFrame</code> loop calculating delta time (Δt).</li>
                <li>24h Diurnal cycle in 18s (solar elevation, VPD, night inversion).</li>
                <li>365d Annual cycle in 24s (Walter-Lieth climate, phenology, drought).</li>
                <li>Non-destructive click-to-pause and timeline scrubbing.</li>
              </ul>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #34d399;">
              <div class="pitch-box-title" style="color: #6ee7b7;">
                <span>🌱 Tier 2: Biophysical Domain</span>
              </div>
              <p class="pitch-box-desc">
                <strong>soil_model.js:</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Continuous mass balance: NEE = Reco - GPP.</li>
                <li>Transient methane peak trigger when WTD ≥ -10 cm (Hypothesis 1).</li>
                <li>Redox capillary nitrous oxide function centered at -15 to -25 cm.</li>
                <li>Atmospheric decoupling filter when u* &lt; 0.12 m/s.</li>
              </ul>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #fb923c;">
              <div class="pitch-box-title" style="color: #fdba74;">
                <span>🎨 Tier 3: Reactive SVG Canvas</span>
              </div>
              <p class="pitch-box-desc">
                <strong>#ecosystem-svg (1350 × 650):</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Direct DOM node attribute mutation (y1, y2, height).</li>
                <li>Dynamic stroke scaling (1.4 to 4.2 px) & arrow speeds (3.8s to 0.85s).</li>
                <li>GPU-accelerated CSS keyframe animations.</li>
                <li><code>ResizeObserver</code> responsive scaling with zero distortion.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: '07. Vanilla ES6+',
        slug: 'vanilla-es6',
        tag: 'SLIDE 07 / 10 • TECHNICAL PHILOSOPHY',
        title: 'Why Pure Vanilla ES6+? The Case Against Framework Obsolescence',
        subtitle: 'Ensuring 20-year archival longevity and zero dependency rot in scientific software',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box danger-box">
              <div class="pitch-box-title" style="color: #f87171;">
                <span>⚠️ The Framework Trap (React / Vite / npm)</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.65;">
                <li><strong>Dependency Rot:</strong> 500 MB in <code>node_modules</code> and hundreds of external dependencies that break after 2–3 years due to version deprecation.</li>
                <li><strong>Virtual DOM Overhead:</strong> Intermediate reconciliation layers that introduce garbage collection spikes and frame jank at 60 Hz.</li>
                <li><strong>Black-Box Obfuscation:</strong> Code is minified into an unreadable blob (<code>bundle.min.js</code>), preventing transparent peer review.</li>
              </ul>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>💎 The Vanilla ES6+ Standard</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.65;">
                <li><strong>20-Year Archival Longevity:</strong> Built on pure W3C standards guaranteed by web browsers for decades; it will run identically in 2045.</li>
                <li><strong>Silky 60–120 FPS:</strong> Atomic DOM updates executed directly on the GPU compositor thread without virtual overhead.</li>
                <li><strong>Transparent Open Science:</strong> Anyone can inspect the true governing physical formulas in <code>soil_model.js</code> via browser DevTools.</li>
                <li><strong>Universal Portability:</strong> Runs on GitHub Pages, USB drives, or local university servers via <code>python3 -m http.server</code>.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: '08. Data Security',
        slug: 'data-security',
        tag: 'SLIDE 08 / 10 • RESEARCH CONFIDENTIALITY',
        title: 'Protecting Unpublished Research & Thesis Intellectual Property',
        subtitle: 'Why supervisors and co-authors can be 100% reassured about data protection before manuscript publication',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🔒 Zero Raw Data Online</span>
              </div>
              <p class="pitch-box-desc">
                In the GitHub repository, <strong>exactly 0 raw data files exist</strong> (zero <code>.csv</code>, <code>.dat</code>, <code>.xlsx</code>, <code>.rds</code>, or binary files).
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                All high-frequency sensor streams and laboratory measurements remain securely stored on local university machines.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>📐 Parametric Models Only</span>
              </div>
              <p class="pitch-box-desc">
                The web client contains only <strong>generalized mathematical equations</strong> (such as Michaelis-Menten and Casagrande formulations).
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                It is mathematically impossible to download, scrape, or reconstruct the raw half-hourly sensor rows from the client.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #fb7185;">
                <span>🛡️ Instant Embargo Control</span>
              </div>
              <p class="pitch-box-desc">
                If the research team desires full embargo before journal submission:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                <li>The GitHub repository can be set to <strong>Private in 10 seconds</strong>.</li>
                <li>The application can run <strong>100% offline</strong> using the local desktop launcher.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: '09. Soil Pores',
        slug: 'soil-pores',
        tag: 'SLIDE 09 / 10 • SCIENTIFIC ROADMAP',
        title: 'Roadmap Frontier 1: Soil Pore Collapse & Dynamic pF Curves',
        subtitle: 'Bringing micro-scale edaphic mechanics into the interactive landscape model',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>🚜 1. Interactive Macroporosity Slider</span>
              </div>
              <p class="pitch-box-desc">
                Simulate heavy agricultural machinery traffic:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li>Dynamically adjust bulk density from <strong>0.20 to 0.38 g/cm³</strong>.</li>
                <li>Watch macropores (&gt;50 µm) collapse and air capacity (AC) drop from <strong>18% to &lt;4%</strong>.</li>
                <li>Visually observe how water gets trapped above the plow pan, forming a <strong>perched water table</strong> that seals methanotrophic bio-filters.</li>
              </ul>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>📉 2. Dynamic pF Suction Retention Curve</span>
              </div>
              <p class="pitch-box-desc">
                An interactive inset displaying van Genuchten retention curves in real time:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li>Traces matric suction (hPa) as the water table moves down.</li>
                <li>Illustrates soil moisture content at <strong>Field Capacity (pF 1.8)</strong> vs. <strong>Permanent Wilting Point (pF 4.2)</strong>.</li>
                <li>Couples pore dewatering directly to aerobic CO₂ respiration surges.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: '10. Microbial Horizons',
        slug: 'microbial-future',
        tag: 'SLIDE 10 / 10 • SCIENTIFIC ROADMAP',
        title: 'Roadmap Frontier 2: Microbial Bio-Filters & Paludiculture Funding',
        subtitle: 'Expanding the twin for university education, policy modeling, and European research grants',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #fbbf24;">
                <span>🦠 1. Microbial Guild Bio-Filters</span>
              </div>
              <p class="pitch-box-desc">
                Visualizing the living biological filter:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li>Show methanotrophs in the aerobic Acrotelm oxidizing up to <strong>80% of Catotelm methane</strong>.</li>
                <li>Simulate how rapid flood events drown methanotrophs in anoxia, causing the observed <strong>Hypothesis 1 transient CH₄ peak</strong>.</li>
              </ul>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-box-title" style="color: #c084fc;">
                <span>🎓 2. University Teaching & Grant Funding</span>
              </div>
              <p class="pitch-box-desc">
                Strategic opportunities for CAU Kiel:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li><strong>Flagship Teaching Tool:</strong> Used in CAU Kiel agroecology and soil physics practicals.</li>
                <li><strong>Grant Proposals:</strong> A compelling interactive demonstrator for <strong>DFG, Horizon Europe, and BMUV paludiculture & peatland carbon credit</strong> research proposals.</li>
              </ul>
            </div>
          </div>
        `
      }
    ];
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThesisExplorer());
} else {
  new ThesisExplorer();
}
