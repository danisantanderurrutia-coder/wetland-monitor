# 📜 Wetland Monitor & Master Thesis Defense — Changelog & Version History

**Candidate:** Daniel Sebastián Santander Urrutia  
**Degree:** Master of Science in Environmental Management  
**Faculty:** Faculty of Agricultural and Nutritional Sciences • Christian-Albrechts-Universität zu Kiel (CAU Kiel)  
**Academic Supervisors:** Prof. Martin Komainda Ph.D., Sebastian Jordan Ph.D.  

---

## [v2.4.2] — 2026-09-25

### ⚡ Eliminación de Caché de Navegador y Vinculación Global Resiliente
* **Busting de Caché en Módulos ES**: Incorporado parámetro dinámico `?v=2.4.2` en todos los archivos de script e importaciones internas (`classic_presentation.js`, `classic_presentation_data.js`, `thesis_explorer.js`) para evitar que navegadores como Opera sigan sirviendo archivos de caché antiguos.
* **Doble Registro de Instancia Global**: Se asegura la accesibilidad de la presentación a través de `window.classicPresentationInstance` y `window.classicPresentation` desde cualquier disparador DOM o atajo de teclado.
* **Despacho Resiliente con Reintento**: En caso de latencia de carga en el módulo de diapositivas, `switchView` conmuta el contenedor visible inmediatamente y reintenta la renderización en 80 ms.

## [v2.4.1] — 2026-09-25

### 🚀 Acceso Directo de Escritorio y Botones de Menú Superior
* **Botones Permanentes en el Menú Superior**: Restaurados y fijados en el HTML estático tanto en la fila de acciones (`#btn-open-classic-presentation` con insignia de 22 diapositivas) como en la barra de navegación horizontal (`#btn-direct-presentation-menu`).
* **Lanzador de Escritorio Inteligente**: `launch_app.sh` ahora detecta si Opera o Chrome ya tienen abierta la pestaña de Wetland Monitor y la recarga en vivo con parámetros anti-caché y anclaje a `#presentation`.
* **Arranque Directo a Presentación**: El acceso directo de escritorio conduce de inmediato al Slide Deck de 22 diapositivas, manteniendo la navegación fluida hacia la Portada / Landing y el resto de herramientas.

## [v2.4.0] — 2026-09-25

### 🌟 Presentación Formal Luminosa (Blanco Académico) y Correcciones de Navegación
* **Alineación Visual Formal**: Canvas 16:9 blanco puro (`#ffffff`) con contraste tipográfico profundo (`#0f172a`), acentos institucionales en Azul Kiel (`#0284c7`) y Verde Turbera (`#059669`), optimizado para proyector y exportación PDF (`@media print`).
* **Corrección de Imágenes de la Segunda Mitad**:
  * Vinculadas figuras empíricas reales de metano (`16b_CH4_Daily_Budgets.png`, `14b_CH4_Models_Comparison.png`).
  * Actualizada Diapositiva 19 con gráfico empírico de óxido nitroso (`80_N2O_Fluxes_By_Site.png`).
  * Actualizada Diapositiva 10 con curvas oedométricas reales de esfuerzo de precompresión (`Precompression_Combined.png` y desgloses por estrato).
* **Solución de Caída en Menú Superior de Presentaciones**:
  * Incorporada la tarjeta de navegación directamente en el DOM estático con id `tab-classic-presentation` y vinculada con el conmutador universal `switchView('classic_presentation')`.
  * Sincronizado el botón de cabecera `#btn-open-classic-presentation` y el botón de portada `#btn-start-defense` para iniciar la presentación sin errores.
* **Eliminación del Parpadeo de Carga Inicial**:
  * Establecida la portada (`thesis_cover`) como vista activa inicial directa en el marcado HTML, suprimiendo cualquier salto involuntario hacia el Digital Twin (`soil_interface`).
* **Sistema de Versiones Dinámico**:
  * Creación de `version.json`, endpoint `/api/version` y modal interactivo de registro de cambios en el landing.

---

## [v2.3.0] — 2026-09-25

### 📚 Thesis Hub & Suite de 22 Diapositivas Académicas
* **Explorador Embebido Thesis Hub**: Visor de doble panel con soporte para Markdown, tablas CSV de resultados y búsqueda en vivo sin salir de la aplicación.
* **Ampliación a 22 Diapositivas**: Cobertura exhaustiva de las 6 partes de la tesis (marco, metodología, microfísica de suelo, balances de CO₂, gases traza CH₄/N₂O y síntesis climática).
* **Herramientas de Defensa**: Cronómetro de defensa (`⏱️`), notas del orador bilingües (Español / Inglés) y banco de preguntas de examen con respuestas estratégicas.
* **Limpieza de Interfaz**: Eliminación de la barra inferior obsoleta de 31 pasos.

---

## [v2.2.0] — 2026-09-24

### 🗂️ Arquitectura Modular y Desacople de Datos
* **Estructuración del Repositorio**: Separación en `01_Pipeline_Resultados` (49 GB de datos brutos y scripts R), `02_Interactive_App` (aplicación web y servidor) y `03_Thesis_Manuscript` (capítulos del borrador en Markdown).
* **Aceleración de Búsqueda**: Configuración de reglas `.ignore` y `.gitignore` para reducir tiempos de consulta en el proyecto.
* **Iconografía de Escritorio**: Conversión de logo a formato nativo macOS `.icns` y aplicación al applet del escritorio.
