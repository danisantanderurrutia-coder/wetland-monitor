/* ==========================================================================
   SATELLITE, GEOSPATIAL & CLIMATE VIEW CONTROLLER
   English-Only Version
   ========================================================================== */

export class SatelliteViewController {
  constructor() {
    this.currentLayer = "footprint"; // "satellite" | "ndvi" | "footprint" | "topography" | "soil_carbon" | "walter_lieth" | "chamber_transect"
    this.walterSource = "2024"; // "2024" | "nasa" | "worldclim"
    this.ndviSource = "summer"; // "summer" | "delta"
    
    // DOM Elements
    this.mapDisplayImg = document.getElementById("macro-map-image");
    this.layerTitleEl = document.getElementById("macro-layer-title");
    this.layerDescEl = document.getElementById("macro-layer-desc");
    this.walterSubToggle = document.getElementById("walter-sub-toggle");
    this.ndviSubToggle = document.getElementById("ndvi-sub-toggle");

    this.initListeners();
    this.render();
  }

  initListeners() {
    // Macro layer tabs
    const buttons = document.querySelectorAll(".macro-layer-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentLayer = btn.dataset.layer;
        this.render();
      });
    });

    // Walter-Lieth sub-toggles
    const walterBtns = document.querySelectorAll(".walter-src-btn");
    walterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        walterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.walterSource = btn.dataset.src;
        this.render();
      });
    });

    // NDVI sub-toggles
    const ndviBtns = document.querySelectorAll(".ndvi-src-btn");
    ndviBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        ndviBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.ndviSource = btn.dataset.src;
        this.render();
      });
    });
  }

  setLayer(layerKey) {
    this.currentLayer = layerKey;
    const buttons = document.querySelectorAll(".macro-layer-btn");
    buttons.forEach(b => {
      if (b.dataset.layer === layerKey) b.classList.add("active");
      else b.classList.remove("active");
    });
    this.render();
  }

  render() {
    if (this.walterSubToggle) {
      this.walterSubToggle.style.display = this.currentLayer === "walter_lieth" ? "flex" : "none";
    }

    if (this.ndviSubToggle) {
      this.ndviSubToggle.style.display = this.currentLayer === "ndvi" ? "flex" : "none";
    }

    if (!this.mapDisplayImg) return;

    if (this.currentLayer === "chamber_transect") {
      this.mapDisplayImg.src = "assets/fig55_transect_satellite_crop.png";
      const title = "Figure 55: Google Map, Chamber Transect & Parcel Infrastructure";
      const desc = "Spatial deployment of the static closed chamber transect across Wallener Au, microtopographic ditch networks, boardwalk access, and Eddy Covariance flux tower footprint (54° 16' 50'' N, 9° 15' 31'' E).";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "satellite") {
      this.mapDisplayImg.src = "assets/SiteMap_Satellite_Terrain.png";
      const title = "High-Resolution Aerial & Satellite Terrain (Esri World Imagery 2400px)";
      const desc = "True-color aerial orthophotography centered on the Wallener Au Eddy Covariance tower (54.2807° N, 9.2586° E). Shows historical agricultural drainage ditches, rewetting polders, and spatial canopy heterogeneity.";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "ndvi") {
      const isSummer = this.ndviSource === "summer";
      this.mapDisplayImg.src = isSummer ? "assets/SiteMap_NDVI_Summer.png" : "assets/SiteMap_NDVI_Delta.png";
      const title = `Sentinel-2 & Landsat NDVI Canopy Phenology (${isSummer ? "Summer Peak Greenness" : "Seasonal Delta Dynamics"})`;
      const desc = isSummer
        ? "Spatial distribution of peak NDVI in July overlaid with the Eddy Covariance 70%/80% footprint and chamber locations. High canopy vigor drives intense GPP photosynthetic CO₂ assimilation (-14.2 g C m⁻² d⁻¹)."
        : "Seasonal amplitude (ΔNDVI) between winter dormancy and summer flush across Wallener Au. Quantifies spatial heterogeneity in vegetation biomass turnover across the rewetting gradient.";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "footprint") {
      this.mapDisplayImg.src = "assets/17_19_Combined_Footprint.png";
      const title = "Eddy Covariance 2D Flux Footprint (Kljun et al., 2015)";
      const desc = "Polar distribution of peak flux contribution (x_peak) and wind direction. Confirms that >90% of measured turbulent fluxes originate within the managed parcel perimeter at Wallener Au.";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "topography") {
      this.mapDisplayImg.src = "assets/SiteMap_Topography.png";
      const title = "Digital Elevation Model (DEM - AWS/Mapzen 40 km Buffer)";
      const desc = "Topography of the Klimafarm lowlands. Depressed basin elevation promotes nocturnal cold air drainage and thermal inversions, inducing decoupling between soil and atmosphere.";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "soil_carbon") {
      this.mapDisplayImg.src = "assets/SiteMap_SoilCarbon.png";
      const title = "Soil Organic Carbon Density (ISRIC SoilGrids 250m)";
      const desc = "Substantial carbon stock concentration in Wallener Au peat deposits compared to surrounding mineral soils, emphasizing vulnerability to oxidative degradation.";
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = desc;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = desc;
    } else if (this.currentLayer === "walter_lieth") {
      let imgSrc = "assets/24_Walter_Lieth_2024.png";
      let srcLabel = "2024 Measurement Year";
      let descLabel = "Empirical 2024 annual thermo-pluviometric cycle recorded at Wallener Au and DWD Erfde station, capturing the summer drying period and autumn re-saturation.";
      
      if (this.walterSource === "nasa") {
        imgSrc = "assets/Walter_Lieth_NASA.png";
        srcLabel = "NASA POWER 25-Year Climatology (1999–2023)";
        descLabel = "Multi-decadal climatological baseline establishing historical precipitation and temperature normals to quantify 2024 climate anomaly severity.";
      } else if (this.walterSource === "worldclim") {
        imgSrc = "assets/Walter_Lieth_WorldClim.png";
        srcLabel = "WorldClim 1-km Gridded Climatology";
        descLabel = "High-resolution gridded climatology contextualizing regional maritime lowlands rainfall distribution across Schleswig-Holstein.";
      }
      
      this.mapDisplayImg.src = imgSrc;
      const title = `Walter-Lieth Climate Diagram (${srcLabel})`;
      if (this.layerTitleEl) this.layerTitleEl.textContent = title;
      if (this.layerDescEl) this.layerDescEl.textContent = descLabel;
      this.mapDisplayImg.dataset.title = title;
      this.mapDisplayImg.dataset.caption = descLabel;
    }
  }
}
