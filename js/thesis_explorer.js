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
          <span class="explorer-file-badge badge-rose" style="font-weight: 800; background: rgba(244,63,94,0.2); color:#fda4af; border:1px solid rgba(244,63,94,0.4);">6 SLIDES</span>
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

  showPitchDeck(slideIndex = 0) {
    this.isPitchMode = true;
    const slides = this.getPitchSlides();
    this.pitchSlideIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));

    const titleEl = document.getElementById('explorer-active-title');
    const sizeEl = document.getElementById('explorer-file-size');
    if (titleEl) titleEl.innerText = '🎯 Executive Pitch Deck (Twin Architecture & Vision)';
    if (sizeEl) sizeEl.innerText = `Interactive Deck • ${slides.length} Slides`;

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
      this.renderPitchDeck();
    }
  }

  prevPitchSlide() {
    if (this.pitchSlideIndex > 0) {
      this.pitchSlideIndex--;
      this.renderPitchDeck();
    }
  }

  goToPitchSlide(idx) {
    const slides = this.getPitchSlides();
    if (idx >= 0 && idx < slides.length) {
      this.pitchSlideIndex = idx;
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
      <button class="pitch-step-dot ${idx === this.pitchSlideIndex ? 'active' : ''}" data-index="${idx}" title="Slide ${idx+1}: ${s.shortTitle}">
        ${idx + 1}
      </button>
    `).join('');

    vp.innerHTML = `
      <div class="pitch-deck-container">
        <!-- Deck Header & Navigation Toolbar -->
        <div class="pitch-deck-toolbar">
          <div class="pitch-deck-stepper">
            <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-right: 4px; font-family:'JetBrains Mono', monospace;">Slides</span>
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
          <div class="pitch-slide-tag">${current.tag}</div>
          <h2 class="pitch-slide-title">${current.title}</h2>
          <p class="pitch-slide-subtitle">${current.subtitle}</p>

          <div class="pitch-slide-body">
            ${current.contentHtml}
          </div>

          <!-- Bottom Slide Footer Actions -->
          <div class="pitch-footer-actions">
            <div style="font-size: 12px; color: #64748b; font-family:'JetBrains Mono', monospace;">
              Wallener Au Peatland Digital Twin • CAU Kiel Agroecology Observatory
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
        shortTitle: 'Vision',
        tag: 'SLIDE 01 / 06 • EXECUTIVE VISION',
        title: 'From Static Sensor Data to an Interactive Agroecological Decision Engine',
        subtitle: 'Transforming complex multi-scale peatland measurements into a live predictive laboratory',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box danger-box">
              <div class="pitch-box-title" style="color: #f87171;">
                <span>🔒 The Challenge: The Data-Policy Disconnect</span>
              </div>
              <p class="pitch-box-desc">
                High-frequency micrometeorology (10 Hz EC), 8 chamber transects, piezometers, and soil physics produce massive datasets that typically remain locked in static tables, spreadsheets, and academic PDFs.
              </p>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li>Non-linear trade-offs (e.g. drought aeration vs. rewetting CH₄ bursts) are difficult to grasp from static charts.</li>
                <li>Wetland restoration managers and agricultural policymakers need intuitive scenario exploration, not weeks of manual recalculation.</li>
              </ul>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🌱 The Solution: Real-Time Biophysical Digital Twin</span>
              </div>
              <p class="pitch-box-desc">
                An interactive, client-side biophysical laboratory that synthesizes all field observations into an immediate, reactive vertical continuum.
              </p>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                <li><strong>60 FPS In-Browser Determinism:</strong> Continuous calculation of CO₂, CH₄, and N₂O balances.</li>
                <li><strong>Dynamic Water Table Scenarios:</strong> Smoothly simulates from +5 cm winter flooding to -60 cm severe summer drought.</li>
                <li><strong>Physical Stratigraphy:</strong> Explicit coupling of Acrotelm, compacted plow pan (10–25 cm), and saturated Catotelm.</li>
              </ul>
            </div>
          </div>

          <div class="pitch-kpi-bar" style="margin-top: 6px;">
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">14,993</div>
              <div class="pitch-kpi-label">30-min EC Blocks Processed</div>
            </div>
            <div class="pitch-kpi-item">
              <div class="pitch-kpi-val">60 FPS</div>
              <div class="pitch-kpi-label">Real-Time Fluid Execution</div>
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
        shortTitle: 'Engineering',
        tag: 'SLIDE 02 / 06 • THE ENGINEERING REVEALED',
        title: 'The Parametric Transformation: How Local Science Powers the Web Model',
        subtitle: 'Answering the core question: How is empirical science translated into a real-time digital twin?',
        contentHtml: `
          <div class="pitch-callout-quote">
            <strong>¿Cómo está construido el modelo?</strong> Procesamos los gigabytes de datos brutos localmente en R y EddyPro, ajustamos modelos no lineales para extraer las funciones de respuesta y umbrales gobernantes, y trasladamos esas ecuaciones al motor JavaScript. <strong>El navegador ejecuta directamente la física en &lt;1 ms</strong> sin necesidad de descargar pesadas tablas de datos.
          </div>

          <div class="pitch-grid-3" style="margin-top: 4px;">
            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>💻 1. Local Heavy R Computing</span>
              </div>
              <p class="pitch-box-desc">
                En tu ordenador se ingirieron las series temporales de 10 Hz, transectos de collares y curvas oedométricas de laboratorio:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Despicado y rotación 3D planar fit en EddyPro 7.0.9.</li>
                <li>Regresiones no lineales de flujos en cámaras (HMR).</li>
                <li>Ajuste de curvatura de Casagrande para tensión de preconsolidación.</li>
              </ul>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #f59e0b;">
                <span>📐 2. Mathematical Curve Fitting</span>
              </div>
              <p class="pitch-box-desc">
                Se sintetizaron los parámetros físicos que gobiernan la turbera:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #cbd5e1; line-height: 1.6;">
                <li><strong>GPPmax:</strong> 6.8 µmol m⁻² s⁻¹ (Michaelis-Menten).</li>
                <li><strong>Reco Basal & Aireación:</strong> 0.8 + 10.5 × d_oxic (Lloyd-Taylor).</li>
                <li><strong>Umbral u*:</strong> 0.12 m/s (Papale 2006).</li>
                <li><strong>Geomecánica:</strong> σp = 38.4 kPa, ρb = 0.38 g/cm³.</li>
                <li><strong>Disparador H1 CH₄:</strong> Pico &gt;110 nmol m⁻² s⁻¹ si WTD ≥ -10 cm.</li>
              </ul>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>⚡ 3. Real-Time Web Twin Engine</span>
              </div>
              <p class="pitch-box-desc">
                Se programaron las ecuaciones en <code>soil_model.js</code> para evaluación continua:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Cero megabytes de datos brutos descargados en el navegador.</li>
                <li>Evaluación atómica en &lt;1 ms por fotograma (60 Hz).</li>
                <li>Confidencialidad absoluta: el código web no contiene filas descargables de la tesis.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: 'Architecture',
        tag: 'SLIDE 03 / 06 • SYSTEM ARCHITECTURE',
        title: 'Decoupled 3-Tier Architecture & Hardware-Accelerated SVG Scene Graph',
        subtitle: 'High-frequency biophysical loop decoupled from rendering for zero graphic jitter',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box" style="border-top: 3px solid #818cf8;">
              <div class="pitch-box-title" style="color: #a5b4fc;">
                <span>⏱️ Tier 1: Temporal Orchestrator</span>
              </div>
              <p class="pitch-box-desc">
                <strong>digital_twin_engine.js:</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Bucle <code>requestAnimationFrame</code> con cálculo de delta time (Δt).</li>
                <li>Ciclo Diurno de 24h comprimido en 18s (ángulo solar, VPD, inversión térmica).</li>
                <li>Ciclo Anual de 365d en 24s (curvas Walter-Lieth, fenología, estiaje).</li>
                <li>Máquina de estados finita: Idle, Running, Paused con memoria de progreso y scrubbing.</li>
              </ul>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #34d399;">
              <div class="pitch-box-title" style="color: #6ee7b7;">
                <span>🌱 Tier 2: Biophysical Domain Core</span>
              </div>
              <p class="pitch-box-desc">
                <strong>soil_model.js:</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Perfil estratigráfico: Acrotelmo, Suela de Labor (10–25 cm) y Catotelmo.</li>
                <li>Balance instantáneo: NEE = Reco(WTD, Tsoil) - GPP(Rg, VPD).</li>
                <li>Pico capilar de N₂O centrado entre -15 y -25 cm.</li>
                <li>Desacople por inversión nocturna si u* &lt; 0.12 m/s.</li>
              </ul>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #fb923c;">
              <div class="pitch-box-title" style="color: #fdba74;">
                <span>🎨 Tier 3: Reactive SVG Engine</span>
              </div>
              <p class="pitch-box-desc">
                <strong>#ecosystem-svg (1350 × 650):</strong>
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                <li>Mutación geométrica atómica directa en nodos DOM (y1, y2, height).</li>
                <li>Vectores dinámicos de gas con grosores y velocidades variables (1.4 a 4.2 px).</li>
                <li>Animaciones de partículas en GPU mediante CSS Keyframes.</li>
                <li>Escalado proporcional responsivo con <code>ResizeObserver</code> sin distorsión.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: 'Vanilla ES6+',
        tag: 'SLIDE 04 / 06 • TECHNICAL PHILOSOPHY',
        title: 'Why Pure Vanilla ES6+? The Case Against Modern Framework Obsolescence',
        subtitle: 'Ensuring 20-year archival longevity and zero dependency rot in scientific software',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box danger-box">
              <div class="pitch-box-title" style="color: #f87171;">
                <span>⚠️ The Modern Framework Trap (React / Vite / npm)</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.65;">
                <li><strong>Dependency Rot:</strong> 500 MB en <code>node_modules</code> y cientos de librerías externas que quedan obsoletas o se rompen en 2–3 años.</li>
                <li><strong>Virtual DOM Overhead:</strong> Capas intermedias de reconciliación que generan micro-tirones (jank) durante simulaciones continuas a 60 Hz.</li>
                <li><strong>Black-Box Obfuscation:</strong> El código se compila en un archivo gigante e ilegible (<code>bundle.min.js</code>), impidiendo la auditoría científica abierta.</li>
              </ul>
            </div>

            <div class="pitch-box success-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>💎 The Vanilla ES6+ Zero-Build Solution</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; line-height: 1.65;">
                <li><strong>20-Year Archival Longevity:</strong> Estándares W3C nativos garantizados por los navegadores por décadas; correrá en 2045 sin cambios.</li>
                <li><strong>Silky 60–120 FPS:</strong> Manipulación atómica de nodos SVG delegada directamente a la GPU del navegador sin capas virtuales.</li>
                <li><strong>Transparent Open Science:</strong> Cualquier profesor o revisor puede abrir las herramientas de desarrollo y auditar las fórmulas reales en <code>soil_model.js</code>.</li>
                <li><strong>Universal Zero-Friction Portability:</strong> Se aloja en GitHub Pages o corre localmente en cualquier ordenador con <code>python3 -m http.server</code>.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: 'Data Security',
        tag: 'SLIDE 05 / 06 • INTELLECTUAL PROPERTY & SECURITY',
        title: 'Protecting Unpublished Thesis Data & Research Confidentiality',
        subtitle: 'Why supervisors can be 100% reassured about data protection before manuscript publication',
        contentHtml: `
          <div class="pitch-grid-3">
            <div class="pitch-box" style="border-top: 3px solid #10b981;">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🔒 1. Zero Raw Datasets Online</span>
              </div>
              <p class="pitch-box-desc">
                En el repositorio público de GitHub <strong>no existe ni un solo archivo de datos brutos</strong> (cero archivos <code>.csv</code>, <code>.dat</code>, <code>.xlsx</code> o <code>.rds</code>).
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                Las series continuas de 10 Hz de la torre y los registros crudos de laboratorio permanecen seguros en tu computador local.
              </p>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #38bdf8;">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>📐 2. Parametric Functions, Not Data</span>
              </div>
              <p class="pitch-box-desc">
                La aplicación web contiene únicamente <strong>ecuaciones de respuesta fisiológica y física</strong> (como la ecuación de Michaelis-Menten o Casagrande).
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                Nadie puede descargar, robar o reconstruir las observaciones crudas de la torre porque simplemente no residen en el cliente web.
              </p>
            </div>

            <div class="pitch-box" style="border-top: 3px solid #fb7185;">
              <div class="pitch-box-title" style="color: #fda4af;">
                <span>🛡️ 3. Full Embargo Control</span>
              </div>
              <p class="pitch-box-desc">
                Si el supervisor prefiere confidencialidad total previa a la publicación en revistas indexadas:
              </p>
              <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                <li>El repositorio se pasa a <strong>Modo Privado</strong> en 10 segundos.</li>
                <li>La app puede ejecutarse <strong>100% offline</strong> en los ordenadores de la universidad.</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        shortTitle: 'Roadmap',
        tag: 'SLIDE 06 / 06 • SCIENTIFIC ROADMAP',
        title: 'Next Horizons: Soil Pore Dynamics & Research Opportunities for CAU Kiel',
        subtitle: 'Expanding the model for edaphology teaching, paludiculture modeling, and grant funding',
        contentHtml: `
          <div class="pitch-grid-2">
            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #f59e0b;">
                <span>🚜 1. Soil Macroporosity & Compaction Slider</span>
              </div>
              <p class="pitch-box-desc">
                Simular el paso de maquinaria agrícola: ver cómo la densidad aparente (ρb) sube de 0.20 a 0.38 g/cm³ y la capacidad de aireación (AC) colapsa del 18% a &lt;4%, mostrando visualmente la compactación del espacio poroso y la formación de agua colgada (perched water).
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #38bdf8;">
                <span>📉 2. Dynamic pF Suction Retention Curve</span>
              </div>
              <p class="pitch-box-desc">
                Un recuadro interactivo (inset) que dibuje la curva de van Genuchten en tiempo real: al bajar el nivel freático, se ilustra la succión matricial (hPa) entre capacidad de campo (pF 1.8) y punto de marchitez (pF 4.2).
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #34d399;">
                <span>🦠 3. Microbial Guild Bio-Filters</span>
              </div>
              <p class="pitch-box-desc">
                Visualizar la comunidad de bacterias metanótrofas en la capa óxica como un bio-filtro que oxida hasta el 80% del metano generado en el catotelmo. Mostrar cómo una inundación súbita asfixia el filtro y desata el pulso de la Hipótesis 1.
              </p>
            </div>

            <div class="pitch-box">
              <div class="pitch-box-title" style="color: #c084fc;">
                <span>🎓 4. Academic Teaching & Grant Funding</span>
              </div>
              <p class="pitch-box-desc">
                Herramienta insignia de transferencia para cursos universitarios en CAU Kiel y plataforma base para postulación a fondos DFG / Horizon Europe en restauración de turberas, paludicultura y contabilidad de créditos de carbono.
              </p>
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
