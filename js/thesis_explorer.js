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
        tag: 'SLIDE 01 / 10 • THE PEATLAND SIMULATOR',
        title: 'The Living Peatland: Seeing a Wetland Breathe in Real Time',
        subtitle: 'Turning thousands of sensor numbers into an interactive simulator where you can test what happens when water and weather change',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">+5 to -60 cm</div>
              <div class="pitch-card-sub">Water Level</div>
              <div class="pitch-box-title" style="color: #34d399;">Water Table Slider</div>
              <p class="pitch-box-desc">
                Drag the water level from winter floods (water above ground) down to severe summer droughts to see how the peatland reacts immediately.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Live Math</div>
              <div class="pitch-card-sub">Instant Calculation</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Three Greenhouse Gases</div>
              <p class="pitch-box-desc">
                The app recalculates carbon uptake by plants (CO₂), soil emissions (CO₂ & N₂O), and swamp gas (CH₄) in real time with smooth animations.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">3 Layers</div>
              <div class="pitch-card-sub">Soil Profile</div>
              <div class="pitch-box-title" style="color: #fbbf24;">Underground View</div>
              <p class="pitch-box-desc">
                Shows the green surface moss, the hard compacted layer where tractors drive, and the deep wet peat that locks away carbon for centuries.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">SIMPLE IDEA</span>
            <span class="pitch-thesis-text">
              <strong>Not a cartoon, but a real working model:</strong> You move the sliders, and the app uses real scientific rules to show whether the wetland acts as a cooling carbon sink or a warming chimney.
            </span>
          </div>

          <div class="pitch-kpi-bar" style="margin-top: 4px;">
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">15,000</div>
              <div class="pitch-kpi-label">Field Measurements</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">< 1 ms</div>
              <div class="pitch-kpi-label">Instant Calculation</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">60 FPS</div>
              <div class="pitch-kpi-label">Smooth Animation</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">0 Files</div>
              <div class="pitch-kpi-label">Private Data Uploaded</div>
            </div>
          </div>
        `
      },
      {
        shortTitle: '02. The Dilemma',
        slug: 'the-problem',
        tag: 'SLIDE 02 / 10 • THE PRACTICAL PROBLEM',
        title: 'The Problem with Static PDFs: Numbers on Paper are Silent',
        subtitle: 'Traditional master theses end up as static reports that cannot answer real-life "what if" questions',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Hidden Risks</div>
              <div class="pitch-card-sub">Problem 1</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Averages Hide Danger</div>
              <p class="pitch-box-desc">
                In a static table, you only see yearly averages. You cannot see the dangerous tipping point where dropping the water just 5 cm suddenly triples carbon loss.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Dead Ends</div>
              <div class="pitch-card-sub">Problem 2</div>
              <div class="pitch-box-title" style="color: #f43f5e;">You Can't Ask a PDF</div>
              <p class="pitch-box-desc">
                If a professor, farmer, or government officer asks: <em>"What happens if next summer is 3 degrees hotter?"</em>, a printed report cannot show you the answer.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Hard to Read</div>
              <div class="pitch-card-sub">Problem 3</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Locked in Jargon</div>
              <p class="pitch-box-desc">
                Most people outside the lab will never read 200 pages of raw statistics. Important climate findings get forgotten on library shelves.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">THE LESSON</span>
            <span class="pitch-thesis-text">
              <strong>Paper tells you what happened yesterday; an interactive model lets you explore tomorrow:</strong> We built this so anyone can touch the dials and see how a wetland responds.
            </span>
          </div>
        `
      },
      {
        shortTitle: '03. My Computer',
        slug: 'local-computing',
        tag: 'SLIDE 03 / 10 • STEP 1: LOCAL NUMBER CRUNCHING',
        title: 'Step 1: Heavy Computing Stays on My Local Computer',
        subtitle: 'Millions of raw high-speed sensor readings were cleaned and checked offline on my workstation in R',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">10 times/sec</div>
              <div class="pitch-card-sub">Sensor Data</div>
              <div class="pitch-box-title" style="color: #38bdf8;">High-Speed Wind & Air</div>
              <p class="pitch-box-desc">
                Sensors on the field measured wind and gases 10 times every single second (Eddy Covariance). That creates gigabytes of raw, noisy numbers.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">R Scripts</div>
              <div class="pitch-card-sub">Cleaning & Checking</div>
              <div class="pitch-box-title" style="color: #34d399;">Removing Bad Data</div>
              <p class="pitch-box-desc">
                I used scientific R tools (EddyPro & sEddyProc) on my PC to remove bad weather glitches, filter calm nights, and organize 15,000 clean half-hour blocks.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">100% Private</div>
              <div class="pitch-card-sub">Stored at Home</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Zero Files on the Web</div>
              <p class="pitch-box-desc">
                All this heavy, raw data stays safely on my hard drive. None of it is uploaded to the internet or exposed to the public.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">HOW IT WORKS</span>
            <span class="pitch-thesis-text">
              <strong>Clear separation:</strong> The heavy math and data cleaning happened on my laptop in R. The website does not carry heavy data files; it only carries the clean rules we discovered.
            </span>
          </div>
        `
      },
      {
        shortTitle: '04. Simple Rules',
        slug: 'empirical-curves',
        tag: 'SLIDE 04 / 10 • STEP 2: FINDING THE SIMPLE RULES',
        title: 'Step 2: Boiling Down Big Data into 4 Simple Rules',
        subtitle: 'Instead of loading millions of raw points, we extracted clean cause-and-effect curves that anyone can understand',
        contentHtml: `
          <div class="pitch-grid-4">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">Rule 1</div>
              <div class="pitch-card-sub">Sunlight</div>
              <div class="pitch-box-title" style="font-size: 14px;">Plants Eat Light</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                More sun = more plant growth and carbon capture. On cloudy days it drops, and at bright noon it reaches a natural maximum.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Rule 2</div>
              <div class="pitch-card-sub">Heat & Drought</div>
              <div class="pitch-box-title" style="font-size: 14px;">Peat Decay</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                When the soil warms up and water drops, air enters the peat. Microbes wake up and burn old carbon into greenhouse gas.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">Rule 3</div>
              <div class="pitch-card-sub">Compaction</div>
              <div class="pitch-box-title" style="font-size: 14px;">Soil Sinking</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                When dried peat is stepped on by heavy cattle or tractors, it squashes like a sponge and loses its natural pore spaces.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Rule 4</div>
              <div class="pitch-card-sub">Wind Flow</div>
              <div class="pitch-box-title" style="font-size: 14px;">Turbulence</div>
              <p class="pitch-box-desc" style="font-size: 12.5px;">
                Brisk wind mixes air smoothly. On totally still, calm nights, gases linger close to the grass, so we filter those out.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">THE TAKEAWAY</span>
            <span class="pitch-thesis-text">
              <strong>From gigabytes of data to clear equations:</strong> We don't need a supercomputer to run the web app. We only need these 4 clear rules that govern how nature behaves.
            </span>
          </div>
        `
      },
      {
        shortTitle: '05. Live Engine',
        slug: 'realtime-engine',
        tag: 'SLIDE 05 / 10 • STEP 3: RUNNING IN THE BROWSER',
        title: 'Step 3: Putting the Rules into the Web Twin',
        subtitle: 'How the website responds instantly to your fingers with zero delay and zero loading spinners',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">< 0.1 ms</div>
              <div class="pitch-card-sub">Step 1: You Touch a Slider</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Reading Your Input</div>
              <p class="pitch-box-desc">
                When you drag the water table or change the temperature slider, the page instantly registers the new value in less than a tenth of a millisecond.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">< 0.7 ms</div>
              <div class="pitch-card-sub">Step 2: Instant Math</div>
              <div class="pitch-box-title" style="color: #34d399;">Calculates in Memory</div>
              <p class="pitch-box-desc">
                The browser evaluates the 4 natural rules inside your computer's memory. No waiting for a remote server or slow internet connection.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">60 FPS</div>
              <div class="pitch-card-sub">Step 3: Screen Updates</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Smooth Visual Drawing</div>
              <p class="pitch-box-desc">
                The water level rises, plant colors change, and gas bubbles float up smoothly 60 times every second, just like a modern video game.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner cyan">
            <span class="pitch-thesis-pill">WHY IT FEELS SO FAST</span>
            <span class="pitch-thesis-text">
              <strong>100% computed inside your browser:</strong> The app does not make network calls while you slide. It runs locally in your browser like a pocket calculator with graphics.
            </span>
          </div>
        `
      },
      {
        shortTitle: '06. Code Design',
        slug: 'architecture',
        tag: 'SLIDE 06 / 10 • UNDER THE HOOD',
        title: 'Clean Code Design: 3 Separate Building Blocks',
        subtitle: 'The code is organized neatly so changes to visual graphics never mess up the scientific formulas',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">Block 1</div>
              <div class="pitch-card-sub">User Interface</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Sliders & Buttons</div>
              <p class="pitch-box-desc">
                Controls the sliders, preset buttons (like "Pristine Mire" or "Drained Peat"), and dark/light modes. Easy to use on desktop or phone.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">Block 2</div>
              <div class="pitch-card-sub">The Brain</div>
              <div class="pitch-box-title" style="color: #34d399;">Scientific Formulas</div>
              <p class="pitch-box-desc">
                Contains only the math: equations for photosynthesis, soil respiration, and compaction. It doesn't care what the screen looks like.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric">Block 3</div>
              <div class="pitch-card-sub">The Visuals</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Drawing the Scene</div>
              <p class="pitch-box-desc">
                Draws the plants, clouds, soil layers, water line, and gas bubbles using crisp, lightweight vector graphics (SVG) that scale to any screen size.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">WHY THIS MATTERS</span>
            <span class="pitch-thesis-text">
              <strong>Modular and tidy:</strong> If we want to change the plant illustration tomorrow, we don't risk breaking the science. If we improve a formula, the graphics automatically adapt.
            </span>
          </div>
        `
      },
      {
        shortTitle: '07. Why Simple JS',
        slug: 'vanilla-es6',
        tag: 'SLIDE 07 / 10 • DURABILITY',
        title: 'Why Simple Web Code? Built to Last 20 Years',
        subtitle: 'We chose standard modern JavaScript with zero external frameworks so this thesis never goes obsolete',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">The Tech Trap</div>
              <div class="pitch-card-sub">Framework Fragility</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Complex Tools Break Fast</div>
              <p class="pitch-box-desc">
                Many university apps built with complex tools like React or Node stop working after 2 or 3 years because libraries get discontinued or throw error messages.
              </p>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-card-metric">20-Year Life</div>
              <div class="pitch-card-sub">Standard Web</div>
              <div class="pitch-box-title" style="color: #34d399;">Pure Web Standards</div>
              <p class="pitch-box-desc">
                We used pure native web standards. Chrome, Safari, and Firefox understand this code directly without installing any extra software or build steps.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Just Click</div>
              <div class="pitch-card-sub">Easy for Anyone</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Double-Click to Run</div>
              <p class="pitch-box-desc">
                Anyone can download the folder and double-click <strong>index.html</strong>. It opens immediately, even on a computer with no internet and no developer tools.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">HONEST DESIGN</span>
            <span class="pitch-thesis-text">
              <strong>A scientific master thesis should last for decades:</strong> By avoiding trendy web fads, this digital twin will still work cleanly when opened in 2045.
            </span>
          </div>
        `
      },
      {
        shortTitle: '08. Data Safety',
        slug: 'data-security',
        tag: 'SLIDE 08 / 10 • PEACE OF MIND FOR PROFESSORS',
        title: 'Data Safety: Your Unpublished Research is 100% Protected',
        subtitle: 'Addressing the key question: Is my private thesis data at risk of being leaked or stolen on the internet?',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">0 Raw Files</div>
              <div class="pitch-card-sub">Complete Privacy</div>
              <div class="pitch-box-title" style="color: #34d399;">No Spreadsheets Uploaded</div>
              <p class="pitch-box-desc">
                Zero Excel, CSV, or private database files exist in this project repository. Your original sensor measurements remain only on your private computer.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">Rules Only</div>
              <div class="pitch-card-sub">No Raw Points</div>
              <div class="pitch-box-title" style="color: #fbbf24;">Formulas, Not Data Tables</div>
              <p class="pitch-box-desc">
                The app only contains general mathematical rules. Nobody can download the website code and extract your original raw field measurements from it.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Works Offline</div>
              <div class="pitch-card-sub">Air-Gapped</div>
              <div class="pitch-box-title" style="color: #38bdf8;">100% Offline Mode</div>
              <p class="pitch-box-desc">
                The entire app runs without internet. You can turn on Airplane Mode, disconnect from WiFi, and present it anywhere with complete confidence.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">PROFESSOR REASSURANCE</span>
            <span class="pitch-thesis-text">
              <strong>Zero publication risk:</strong> The app demonstrates the principles of your research without releasing your raw datasets before your scientific papers are published.
            </span>
          </div>
        `
      },
      {
        shortTitle: '09. Soil Pores',
        slug: 'soil-pores',
        tag: 'SLIDE 09 / 10 • FUTURE UPGRADES',
        title: 'What We Can Add Next: The Soil Pore Slider',
        subtitle: 'How we can make the twin even more realistic by letting users test the effect of heavy tractors and cattle hooves',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box">
              <div class="pitch-card-metric">The Sponge</div>
              <div class="pitch-card-sub">Healthy Soil</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Natural Open Pores</div>
              <p class="pitch-box-desc">
                Natural peat acts like a kitchen sponge: it is full of large pores that store water easily and let roots breathe oxygen.
              </p>
            </div>

            <div class="pitch-box danger-box">
              <div class="pitch-card-metric rose">Crushed</div>
              <div class="pitch-card-sub">Farm Compaction</div>
              <div class="pitch-box-title" style="color: #f43f5e;">Tractor Compaction</div>
              <p class="pitch-box-desc">
                When heavy tractors drive over wet peat, they crush the large pores. The soil becomes dense, hard, and traps smelly gases.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">New Dial</div>
              <div class="pitch-card-sub">Future Feature</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Interactive Pore Slider</div>
              <p class="pitch-box-desc">
                We can easily add a "Soil Compaction" slider so farmers and students can see in real time how squashing the soil reduces pasture health.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner">
            <span class="pitch-thesis-pill">NEXT STEP</span>
            <span class="pitch-thesis-text">
              <strong>Bringing soil physics to life:</strong> Adding a soil compaction slider directly connects everyday farm management with long-term climate impact.
            </span>
          </div>
        `
      },
      {
        shortTitle: '10. Big Picture',
        slug: 'microbial-future',
        tag: 'SLIDE 10 / 10 • THE BIGGER HORIZON',
        title: 'The Bigger Horizon: From Master Thesis to Real-World Impact',
        subtitle: 'How this tool can help farmers transition to wet agriculture and help universities win research grants',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box success-box">
              <div class="pitch-card-metric">Wet Farming</div>
              <div class="pitch-card-sub">Paludiculture</div>
              <div class="pitch-box-title" style="color: #34d399;">Farming on Wet Land</div>
              <p class="pitch-box-desc">
                Farmers want to know: <em>"Can I still make a living if I rewet my fields?"</em> We can model wetland crops (like reed or Sphagnum moss) to show economic and climate benefits together.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-card-metric gold">Carbon Credits</div>
              <div class="pitch-card-sub">Climate Finance</div>
              <div class="pitch-box-title" style="color: #fbbf24;">Proof for Investors</div>
              <p class="pitch-box-desc">
                Companies paying to restore wetlands need visual proof that stopping drainage really prevents emissions. This app makes that proof visible and intuitive.
              </p>
            </div>

            <div class="pitch-box accent-box">
              <div class="pitch-card-metric cyan">Grant Magnet</div>
              <div class="pitch-card-sub">Research Value</div>
              <div class="pitch-box-title" style="color: #38bdf8;">Winning Future Grants</div>
              <p class="pitch-box-desc">
                Reviewers love interactive tools. Having a working digital twin makes future funding proposals for your institute stand out far above ordinary paper-only submissions.
              </p>
            </div>
          </div>

          <div class="pitch-thesis-banner gold">
            <span class="pitch-thesis-pill">FINAL MESSAGE</span>
            <span class="pitch-thesis-text">
              <strong>More than just a thesis requirement:</strong> This project is a practical tool that helps scientists, farmers, and policymakers understand peatlands and make smart climate decisions together.
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
