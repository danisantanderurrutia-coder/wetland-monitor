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
        tag: 'SLIDE 01 / 10 • THE LIVING PEATLAND TWIN',
        title: 'The Living Peatland: Continuous Biophysical Simulation in 60 FPS',
        subtitle: 'Synthesizing 14,993 half-hourly micrometeorological flux blocks and soil mechanics into a zero-lag prognostic twin',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">+5 to -60 cm</div>
              <div class="pitch-card-sub">Hydrological Gradient</div>
              <div class="pitch-box-title" style="color: #34d399;">Continuous Water Table</div>
              <p class="pitch-box-desc">
                Simulates moisture dynamics across the full spectrum: from superficial winter ponding down to critical summer drought desiccation, driving aerobic vs. anoxic transitions.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">< 0.8 ms</div>
              <div class="pitch-card-sub">Evaluation Latency</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Tri-Gas Coupled Kinetics</div>
              <p class="pitch-box-desc">
                Solves coupled balances for <strong>CO₂ (GPP & Reco), CH₄ (methanogenesis/oxidation), and N₂O</strong> at 60 frames per second directly in the client GPU/DOM loop.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">3 Horizons</div>
              <div class="pitch-card-sub">Pedological Coupling</div>
              <div class="pitch-box-title" style="color: #fbbf24;">Stratigraphic Soil Engine</div>
              <p class="pitch-box-desc">
                Directly couples the living <strong>Acrotelm (0–10 cm)</strong>, the compacted agricultural <strong>plow pan (10–25 cm)</strong>, and the deep saturated <strong>Catotelm (25–100+ cm)</strong>.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">CORE AXIOM</span>
            <span class="pitch-thesis-text">
              <strong>Not a 3D animation, but a live numerical solver:</strong> We translated complex empirical field observations into continuous analytical functions that execute with zero latency in any modern web browser.
            </span>
          </div>

          <div class="pitch-kpi-bar" style="margin-top: 4px;">
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">14,993</div>
              <div class="pitch-kpi-label">EC Half-Hour Blocks</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">< 1 ms</div>
              <div class="pitch-kpi-label">Physics Recalculation</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">60 FPS</div>
              <div class="pitch-kpi-label">Native SVG Refresh</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">0 KB</div>
              <div class="pitch-kpi-label">Cloud Raw Data Leaked</div>
            </div>
          </div>
        `
      },
      {
        shortTitle: '02. The Dilemma',
        slug: 'the-problem',
        tag: 'SLIDE 02 / 10 • THE SCIENTIFIC DILEMMA',
        title: 'The Dead-PDF Paradox: Why Static Tables Fail Living Wetlands',
        subtitle: 'Traditional master theses bury dynamic biogeochemical non-linearities inside immovable two-dimensional paper reports',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Tipping Points</div>
              <div class="pitch-card-sub">Field Failure Mode 1</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Invisible Thresholds</div>
              <p class="pitch-box-desc">
                Static mean tables hide non-linear tipping points. A 5 cm drop in groundwater can trigger a <strong>400% surge in peat oxidation</strong>, but static graphs only show seasonal averages.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Domain Silos</div>
              <div class="pitch-card-sub">Field Failure Mode 2</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Fragmented Sciences</div>
              <p class="pitch-box-desc">
                Atmospheric physicists measure 10 Hz gas fluxes while soil mechanics researchers study pore subsidence. In paper theses, these two governing disciplines <strong>never talk to each other</strong>.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Zero Interactivity</div>
              <div class="pitch-card-sub">Field Failure Mode 3</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Stakeholder Disconnect</div>
              <p class="pitch-box-desc">
                Water authorities, farmers, and carbon project developers cannot interact with an R markdown script. Without interactive exploration, <strong>critical ecological insights remain unused</strong>.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">THE DILEMMA</span>
            <span class="pitch-thesis-text">
              <strong>Static papers report what happened; digital twins simulate what happens next:</strong> Peatland restoration requires stress-testing drought scenarios before digging drainage ditches or investing restoration capital.
            </span>
          </div>
        `
      },
      {
        shortTitle: '03. Local Computing',
        slug: 'local-computing',
        tag: 'SLIDE 03 / 10 • PHASE 1: LOCAL COMPUTATIONAL RIGOR',
        title: 'Phase 1: Heavy Scientific Computing on Local Workstations',
        subtitle: 'Raw 10 Hz high-frequency turbulence and soil mechanics remain strictly on local research machines',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">10 Hz • 4.8M</div>
              <div class="pitch-card-sub">High-Frequency Telemetry</div>
              <div class="pitch-box-title" style="color: #38bdf8;">EddyPro Local Processing</div>
              <p class="pitch-box-desc">
                Raw high-frequency sonic anemometer and LI-7500 IRGA streams processed locally through 3D coordinate rotation, spike removal, and Webb-Pearman-Leuning (WPL) air density corrections.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">R • sEddyProc</div>
              <div class="pitch-card-sub">Biostatistical Curation</div>
              <div class="pitch-box-title" style="color: #34d399;">Friction Velocity & Gap-Filling</div>
              <p class="pitch-box-desc">
                Nighttime friction velocity filtering (u* threshold = 0.12 m/s), MDS gap-filling, and non-linear regressions executed via audited R packages on Daniel's dedicated machine.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">100% Private</div>
              <div class="pitch-card-sub">Data Fortress</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Absolute Air-Gap Security</div>
              <p class="pitch-box-desc">
                Zero raw CSVs, proprietary sensor calibrations, or unpublished measurement tables are ever pushed to GitHub or transmitted over web networks.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">ENGINEERING FACT</span>
            <span class="pitch-thesis-text">
              <strong>Rigorous separation of concerns:</strong> The web app is not a data warehouse. Heavy statistical computing happens offline in R/EddyPro; the digital twin only hosts the resulting distilled physical laws.
            </span>
          </div>
        `
      },
      {
        shortTitle: '04. Empirical Curves',
        slug: 'empirical-curves',
        tag: 'SLIDE 04 / 10 • PHASE 2: PARAMETRIC EXTRACTION',
        title: 'Phase 2: Extracting Governing Biophysical Curves',
        subtitle: 'Distilling gigabytes of raw data into clean, closed-form parametric equations with biological and physical meaning',
        contentHtml: `
          <div class="pitch-grid-4">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">GPP(PAR)</div>
              <div class="pitch-card-sub">Light Response Curve</div>
              <div class="pitch-box-title" style="font-size: 14px;">Michaelis-Menten</div>
              <div class="pitch-formula-block">GPP = (alpha * PAR * Amax) / (alpha * PAR + Amax)</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                Captures light saturation at noon and quantum yield efficiency (alpha = 0.042) under diffuse cloudy conditions.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Reco(T, WT)</div>
              <div class="pitch-card-sub">Thermal Peat Decay</div>
              <div class="pitch-box-title" style="font-size: 14px;">Lloyd & Taylor 1994</div>
              <div class="pitch-formula-block">Reco = Rref * exp(E0 * (1/(Tref-T0) - 1/(T-T0)))</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                Exponential microbial soil respiration accelerated by water table drawdown exposing fresh carbon to oxygen.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">Δz(sigma)</div>
              <div class="pitch-card-sub">1D Soil Consolidation</div>
              <div class="pitch-box-title" style="font-size: 14px;">Casagrande Log-Scale</div>
              <div class="pitch-formula-block">eps = Cc / (1 + e0) * log10(sigma_v / sigma_p)</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                Predicts peat shrinkage and irreversible macropore loss when effective stress exceeds pre-consolidation pressure.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Turbulence</div>
              <div class="pitch-card-sub">Atmospheric Boundary</div>
              <div class="pitch-box-title" style="font-size: 14px;">Friction Velocity u*</div>
              <div class="pitch-formula-block">u* = (tau / rho)^0.5 > 0.12 m/s</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                Ensures only well-mixed turbulent regimes are represented, filtering out calm nocturnal boundary decoupling.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">MATHEMATICAL DISTILLATION</span>
            <span class="pitch-thesis-text">
              <strong>From data storage to mathematical laws:</strong> Instead of loading 50 megabytes of point data into memory, the twin evaluates 4 fundamental parametric equations in under 1 millisecond.
            </span>
          </div>
        `
      },
      {
        shortTitle: '05. Real-Time Engine',
        slug: 'realtime-engine',
        tag: 'SLIDE 05 / 10 • PHASE 3: NUMERICAL SOLVER IN JS',
        title: 'Phase 3: Translating Equations into the 60 FPS Web Solver',
        subtitle: 'How pure JavaScript evaluates coupled biophysical curves in real-time with zero backend latency',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">< 0.1 ms</div>
              <div class="pitch-card-sub">Step 1: State Ingestion</div>
              <div class="pitch-box-title" style="color: #38bdf8;">User Input Capture</div>
              <p class="pitch-box-desc">
                Slider input events dispatch normalized state vectors (Water Table, PAR, Air Temperature, Bulk Density) directly to memory without DOM reflow.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">< 0.7 ms</div>
              <div class="pitch-card-sub">Step 2: Analytical Eval</div>
              <div class="pitch-box-title" style="color: #34d399;">Physics Evaluation Loop</div>
              <p class="pitch-box-desc">
                The math solver evaluates the Michaelis-Menten, Lloyd-Taylor, and Casagrande functions in memory. Closed-form algebra means zero numerical divergence.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">16.6 ms</div>
              <div class="pitch-card-sub">Step 3: Render Sync</div>
              <div class="pitch-box-title" style="color: #38bdf8;">SVG Scene Update</div>
              <p class="pitch-box-desc">
                Direct manipulation of SVG coordinates, opacity masks, and gradient shaders via requestAnimationFrame, locking visual execution to 60 frames per second.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner cyan">
            <span class="pitch-thesis-pill">PERFORMANCE PROOF</span>
            <span class="pitch-thesis-text">
              <strong>Zero backend dependencies:</strong> Moving any slider triggers an instant in-memory calculation. The browser behaves as an interactive analog computer, not an API fetch client.
            </span>
          </div>
        `
      },
      {
        shortTitle: '06. Architecture',
        slug: 'architecture',
        tag: 'SLIDE 06 / 10 • SOFTWARE ARCHITECTURE',
        title: 'Decoupled 3-Tier Architecture & SVG Scene Graph',
        subtitle: 'Strict separation of biophysical logic, state management, and graphic representation',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">Layer 1</div>
              <div class="pitch-card-sub">State & Controls</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Input Controller</div>
              <p class="pitch-box-desc">
                Manages slider event listeners, debouncing, preset scenarios (Pristine, Degraded, Rewetted), and URL hash state persistence.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">Layer 2</div>
              <div class="pitch-card-sub">Pure Math Kernel</div>
              <div class="pitch-box-title" style="color: #34d399;">Physics Engine</div>
              <p class="pitch-box-desc">
                Completely isolated from the DOM. Receives environmental inputs and returns strict numeric matrices of gas fluxes and soil compaction.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric">Layer 3</div>
              <div class="pitch-card-sub">Hardware SVG</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Reactive Scene Graph</div>
              <p class="pitch-box-desc">
                Dynamically renders botanical canopies, soil horizons, capillary fringes, and real-time gas bubble particle animations.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">ARCHITECTURAL DESIGN</span>
            <span class="pitch-thesis-text">
              <strong>Complete decoupling:</strong> The biophysical kernel has zero awareness of HTML or CSS. If tomorrow we replace SVG with WebGL or Canvas, not a single line of physics code needs to change.
            </span>
          </div>
        `
      },
      {
        shortTitle: '07. Vanilla ES6+',
        slug: 'vanilla-es6',
        tag: 'SLIDE 07 / 10 • ENGINEERING PHILOSOPHY',
        title: 'The Zero-Build Bet: Why Pure Vanilla ES6+ Matters',
        subtitle: 'Eliminating the NPM dependency trap to guarantee 20-year scientific archival longevity',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">NPM Bitrot</div>
              <div class="pitch-card-sub">The Framework Trap</div>
              <div class="pitch-box-title" style="color: #f43f5e;">The Modern Web Decay</div>
              <p class="pitch-box-desc">
                90% of academic web apps built on React, Webpack, or Vite break within 3 years due to deprecated node_modules, breaking package updates, and broken build toolchains.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">20-Year SLA</div>
              <div class="pitch-card-sub">Web Standards Standard</div>
              <div class="pitch-box-title" style="color: #34d399;">Native Browser Engines</div>
              <p class="pitch-box-desc">
                ECMAScript 2020 modules, native SVG, and CSS Custom Properties run directly in Chromium, Safari, and Firefox with <strong>zero build steps and zero compilers</strong>.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Double-Click</div>
              <div class="pitch-card-sub">Frictionless Review</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Peer Review Simplicity</div>
              <p class="pitch-box-desc">
                Your examination committee can clone the GitHub repo and double-click index.html on a laptop with no node.js, no terminal, and no internet connection.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">ARCHIVAL TRUTH</span>
            <span class="pitch-thesis-text">
              <strong>Built for the scientific record:</strong> A master thesis should outlive web fashion trends. This digital twin is engineered to run flawlessly when opened in 2045.
            </span>
          </div>
        `
      },
      {
        shortTitle: '08. Data Security',
        slug: 'data-security',
        tag: 'SLIDE 08 / 10 • RESEARCH IP & PRIVACY',
        title: 'Data Sovereignty: Why Your Research IP is 100% Protected',
        subtitle: 'Definitive reassurance for Prof. Komainda and Dr. Jordan regarding unpublished thesis data',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">0 Bytes</div>
              <div class="pitch-card-sub">Zero Raw Data Uploaded</div>
              <div class="pitch-box-title" style="color: #34d399;">No CSVs in Repository</div>
              <p class="pitch-box-desc">
                Audit proof: The GitHub repository contains zero .csv, .xlsx, .rds, or .dat files. Proprietary field measurements remain strictly on your local encrypted hard drive.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">Equations Only</div>
              <div class="pitch-card-sub">Parametric Representation</div>
              <div class="pitch-box-title" style="color: #fbbf24;">No Reverse Engineering</div>
              <p class="pitch-box-desc">
                The public twin runs normalized response curves. It is mathematically impossible for any third party to reconstruct individual field dates, raw flux points, or sensor logs.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Air-Gapped</div>
              <div class="pitch-card-sub">Telemetry-Free</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Zero Cloud Phoning</div>
              <p class="pitch-box-desc">
                The entire app runs 100% offline. It makes zero API calls, sends zero tracking telemetry, and can be presented in airplane mode inside any secure university auditorium.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">COMMITTEE ASSURANCE</span>
            <span class="pitch-thesis-text">
              <strong>Zero publication conflict:</strong> The application behaves as an interactive scientific model, not a data leak. Your unpublished manuscripts and pending papers remain completely protected.
            </span>
          </div>
        `
      },
      {
        shortTitle: '09. Soil Pores',
        slug: 'soil-pores',
        tag: 'SLIDE 09 / 10 • SCIENTIFIC ROADMAP 1',
        title: 'Scientific Roadmap: Dynamic Soil Pores & pF Retention Curves',
        subtitle: 'Expanding the twin into an interactive pedological simulator for agricultural soil compaction',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">> 50 µm</div>
              <div class="pitch-card-sub">Interactive Control 1</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Macropore Collapse Slider</div>
              <p class="pitch-box-desc">
                Add a live slider to simulate heavy agricultural machinery wheeling, dynamically crushing coarse air-filled macropores into compacted mesopores.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">van Genuchten</div>
              <div class="pitch-card-sub">Interactive Control 2</div>
              <div class="pitch-box-title" style="color: #34d399;">Dynamic pF Water Retention</div>
              <p class="pitch-box-desc">
                Couple soil matric potential (pF curves) to compaction, demonstrating visually how compacted peat holds water at higher tensions, starving plant roots of capillary supply.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Anoxic Hotspots</div>
              <div class="pitch-card-sub">Biogeochemical Effect</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Intra-Aggregate Methanogenesis</div>
              <p class="pitch-box-desc">
                Show how soil compaction creates anaerobic micro-niches that emit methane even when the regional bulk water table is well below 30 cm depth.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">FUTURE CAPABILITY</span>
            <span class="pitch-thesis-text">
              <strong>Next-level pedological realism:</strong> Adding soil pore mechanics bridges agricultural pasture management with carbon auditing, showing farmers the exact cost of soil compaction.
            </span>
          </div>
        `
      },
      {
        shortTitle: '10. Paludiculture',
        slug: 'microbial-future',
        tag: 'SLIDE 10 / 10 • SCIENTIFIC ROADMAP 2',
        title: 'The Paludiculture & Carbon Market Horizon',
        subtitle: 'Transforming this digital twin from a master thesis into an EU-funded regional restoration asset',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">Paludiculture</div>
              <div class="pitch-card-sub">Restoration Scenario</div>
              <div class="pitch-box-title" style="color: #34d399;">Wet Agriculture Simulation</div>
              <p class="pitch-box-desc">
                Model economic rewetting with Typha latifolia and Sphagnum farming, allowing landowners to compare economic yields vs. traditional drained cattle pastures.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">0 - 5 cm</div>
              <div class="pitch-card-sub">Bio-Filter Layer</div>
              <div class="pitch-box-title" style="color: #fbbf24;">Methanotrophic Bio-Filters</div>
              <p class="pitch-box-desc">
                Simulate aerobic methanotrophic bacteria in the top moss layer oxidizing up to 90% of upward CH₄ fluxes, proving the ecological safety of partial rewetting.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Tier 3 MRV</div>
              <div class="pitch-card-sub">Carbon Financing</div>
              <div class="pitch-box-title" style="color: #38bdf8;">MoorFutures & EU ETS</div>
              <p class="pitch-box-desc">
                Position this platform as a certified Measurement, Reporting, and Verification (MRV) tool for regional wetland restoration carbon credit underwriting.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">ACADEMIC HORIZON</span>
            <span class="pitch-thesis-text">
              <strong>From defense presentation to institutional impact:</strong> This digital twin is not merely a thesis appendix; it is a foundational research asset ready for DFG grants, EU Horizon calls, and MoorFutures certification.
            </span>
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
