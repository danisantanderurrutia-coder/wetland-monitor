/**
 * Thesis & Pipeline Explorer (Embedded Graphic Hub)
 * CAU Kiel - Daniel S. Santander Urrutia
 */

export class ThesisExplorer {
  constructor() {
    this.treeData = null;
    this.currentFile = null;
    this.searchDebounceTimer = null;
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
    const modal = document.getElementById('thesis-explorer-modal');
    const searchInput = document.getElementById('explorer-search-input');
    const copyBtn = document.getElementById('explorer-copy-btn');

    if (openBtn) {
      openBtn.addEventListener('click', () => this.open());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyCurrentContent());
    }

    // Atajos de teclado: 't', 'h' o 'Escape'
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        this.close();
      } else if ((e.key === 't' || e.key === 'T' || e.key === 'h' || e.key === 'H') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        if (modal && modal.classList.contains('active')) {
          this.close();
        } else {
          this.open();
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
          : 'scripts_hub/mermaid/01_eddy_processing_pipeline.md';
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

    // Vincular clics en archivos
    sb.querySelectorAll('.explorer-file-item').forEach(el => {
      el.addEventListener('click', () => {
        sb.querySelectorAll('.explorer-file-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');

        const path = el.getAttribute('data-path');
        if (path) this.loadFile(path);
      });
    });
  }

  async loadFile(path) {
    const vp = document.getElementById('explorer-viewport');
    const titleEl = document.getElementById('explorer-active-title');
    const sizeEl = document.getElementById('explorer-file-size');

    if (!vp) return;
    vp.innerHTML = `<div style="text-align:center; padding: 60px; color:#94a3b8;">Loading file...</div>`;
    if (titleEl) titleEl.innerText = path.split('/').pop();

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
    const lines = (data.content || '').split('\n');
    let codeHtml = lines.map((l, i) => `
      <div style="display:flex; line-height:1.6;">
        <span style="width:40px; color:#475569; text-align:right; padding-right:16px; user-select:none; font-family:'JetBrains Mono', monospace; font-size:12px;">${i+1}</span>
        <span style="color:#e2e8f0; font-family:'JetBrains Mono', monospace; font-size:13px; white-space:pre;">${this.escapeHtml(l)}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="background:#020617; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:20px; overflow-x:auto;">
        ${codeHtml}
      </div>
    `;
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
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThesisExplorer());
} else {
  new ThesisExplorer();
}
