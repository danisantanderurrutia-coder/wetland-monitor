/* ==========================================================================
   SOIL & PLANT BIOPHYSICS LAB (Interactive Canvas & Mechanistic Sandbox)
   Universal Ecohydrology & Soil-Plant Micro-Physics Engine
   Full Bilingual Architecture (English & Spanish) with Plant Morpho-Physiology
   ========================================================================== */

export const PLANT_SPECIES = [
  {
    id: 'phragmites',
    name: 'Phragmites australis',
    commonName: {
      es: 'Carrizo Común (Paludicultura / Fen)',
      en: 'Common Reed (Paludiculture / Fen)'
    },
    icon: '🌾',
    type: {
      es: 'Macrófita Palustre (Helófita)',
      en: 'Palustrine Macrophyte (Helophyte)'
    },
    p50: -1.6,
    aerenchymaBypass: 85, // % bypass gas
    rootDepthCm: 70,
    rootType: 'rhizome',
    wiltingPsi: -2.1,
    vulnerabilitySlope: 2.2,
    color: '#10B981',
    traits: {
      es: 'Chimenea interna de CH₄ por aerénquima continuo, rizomas profundos, tolerante a anoxia.',
      en: 'Internal CH₄ chimney via continuous aerenchyma, deep rhizomes, highly anoxia-tolerant.'
    }
  },
  {
    id: 'sphagnum',
    name: 'Sphagnum magellanicum',
    commonName: {
      es: 'Musgo de Turbera (Bog Ácido)',
      en: 'Peat Moss (Ombrotrophic Bog)'
    },
    icon: '🌿',
    type: {
      es: 'Briófito Ectohídrico',
      en: 'Ectohydric Bryophyte'
    },
    p50: -0.9,
    aerenchymaBypass: 0,
    rootDepthCm: 8,
    rootType: 'bryophyte',
    wiltingPsi: -1.1,
    vulnerabilitySlope: 3.5,
    color: '#34D399',
    traits: {
      es: 'Células hialinas capilares (retiene 20x su peso), sin xilema vascular ni raíces, acidificación fenólica.',
      en: 'Capillary hyaline cells (holds 20x dry weight), non-vascular, no roots, phenolic acidification.'
    }
  },
  {
    id: 'carex',
    name: 'Carex rostrata',
    commonName: {
      es: 'Cárice de Fen (Sedge)',
      en: 'Bottle Sedge (Fen Sedge)'
    },
    icon: '🌱',
    type: {
      es: 'Ciperácea de Humedal',
      en: 'Wetland Cyperaceae'
    },
    p50: -2.1,
    aerenchymaBypass: 60,
    rootDepthCm: 45,
    rootType: 'tussock',
    wiltingPsi: -2.3,
    vulnerabilitySlope: 2.4,
    color: '#059669',
    traits: {
      es: 'Aerénquima basal en macolla, raíces fasciculadas densas, moderada tolerancia a estrés.',
      en: 'Basal aerenchyma in tussock, dense fibrous roots, moderate stress tolerance.'
    }
  },
  {
    id: 'alnus',
    name: 'Alnus glutinosa',
    commonName: {
      es: 'Aliso Negro (Bosque Ripario)',
      en: 'Black Alder (Riparian Forest)'
    },
    icon: '🌳',
    type: {
      es: 'Árbol Ripario Leñoso',
      en: 'Woody Riparian Tree'
    },
    p50: -1.9,
    aerenchymaBypass: 30,
    rootDepthCm: 110,
    rootType: 'woody',
    wiltingPsi: -2.5,
    vulnerabilitySlope: 2.8,
    color: '#047857',
    traits: {
      es: 'Xilema leñoso de alto calibre, lenticelas hipertrofiadas, nódulos Frankia fijadores de N₂.',
      en: 'High-calibre woody xylem, hypertrophied lenticels, Frankia N₂-fixing actinorhizal nodules.'
    }
  },
  {
    id: 'lolium',
    name: 'Lolium perenne',
    commonName: {
      es: 'Ballico (Pastizal Drenado)',
      en: 'Perennial Ryegrass (Drained Grassland)'
    },
    icon: '🌾',
    type: {
      es: 'Gramínea Forrajera',
      en: 'Forage Grass'
    },
    p50: -2.8,
    aerenchymaBypass: 0,
    rootDepthCm: 22,
    rootType: 'fibrous',
    wiltingPsi: -2.6,
    vulnerabilitySlope: 2.0,
    color: '#65A30D',
    traits: {
      es: 'Raíces fasciculadas superficiales (0-20 cm), sin aerénquima, muy sensible a sequía y anoxia.',
      en: 'Shallow fibrous roots (0–20 cm), no aerenchyma, vulnerable to drought & anoxia.'
    }
  }
];

export const SOIL_PLANT_PROBLEMS = [
  {
    id: 'spac_cavitation',
    badgeEs: 'Ecohidrología & SPAC',
    badgeEn: 'Ecohydrology & SPAC',
    titleEs: 'Continuo Suelo-Planta-Atmósfera (SPAC) & Cavitación en Xilema',
    titleEn: 'Soil-Plant-Atmosphere Continuum (SPAC) & Xylem Cavitation',
    subtitleEs: 'Simulación del gradiente de potencial hídrico por analogía resistiva de Ohm, regulación estomática por VPD y umbral crítico de embolismo (P50).',
    subtitleEn: 'Simulation of the water potential gradient via Ohm resistive analogy, VPD stomatal regulation, and critical xylem embolism threshold (P50).',
    color: '#10B981',
    icon: '🌱',
    defaults: { psiSoil: -0.10, vpd: 1.4, rStomata: 0.35, p50: -1.6 },
    sliders: [
      { key: 'psiSoil', labelEs: 'Potencial Suelo (Ψ_suelo)', labelEn: 'Soil Potential (Ψ_soil)', min: -2.5, max: -0.01, step: 0.05, unit: ' MPa' },
      { key: 'vpd', labelEs: 'Déficit Vapor (VPD)', labelEn: 'Vapor Deficit (VPD)', min: 0.2, max: 4.0, step: 0.1, unit: ' kPa' },
      { key: 'rStomata', labelEs: 'Resistencia Estoma (r_s)', labelEn: 'Stomatal Resistance (r_s)', min: 0.1, max: 2.5, step: 0.05, unit: ' s/cm' },
      { key: 'p50', labelEs: 'Umbral P₅₀ Xilema', labelEn: 'Xylem P₅₀ Threshold', min: -4.0, max: -0.8, step: 0.1, unit: ' MPa' }
    ],
    presets: [
      {
        labelEs: '💧 Hidratación Óptima (Transpiración Fluida)',
        labelEn: '💧 Optimal Hydration (Fluid Transpiration)',
        tagEs: 'Capacidad de Campo',
        tagEn: 'Field Capacity',
        values: { psiSoil: -0.04, vpd: 0.9, rStomata: 0.20, p50: -1.6 }
      },
      {
        labelEs: '☀️ Mediodía Cálido (Cierre Estomático Parcial)',
        labelEn: '☀️ Warm Midday (Partial Stomatal Closure)',
        tagEs: 'Estrés Moderado',
        tagEn: 'Moderate Stress',
        values: { psiSoil: -0.55, vpd: 2.6, rStomata: 0.90, p50: -1.6 }
      },
      {
        labelEs: '🔥 Sequía Crítica & Cavitación (PLC > 80%)',
        labelEn: '🔥 Critical Drought & Cavitation (PLC > 80%)',
        tagEs: 'Colapso Hidráulico',
        tagEn: 'Hydraulic Collapse',
        values: { psiSoil: -2.20, vpd: 3.5, rStomata: 2.20, p50: -1.6 }
      }
    ],
    algebra: [
      {
        descEs: '1. Conservación de Flujo en Serie (Analogía de Van den Honert / Ley de Ohm):',
        descEn: '1. Series Flux Conservation (Van den Honert Analogy / Ohm Law):',
        latex: 'J_w = \\frac{\\Psi_{\\text{suelo}} - \\Psi_{\\text{hoja}}}{R_{\\text{raíz}} + R_{\\text{xilema}}} = \\frac{\\Psi_{\\text{hoja}} - \\Psi_{\\text{atm}}}{R_{\\text{estoma}} + R_{\\text{capa límite}}}'
      },
      {
        descEs: '2. Tensión Foliar Resultante (Caída de Presión Hidráulica):',
        descEn: '2. Resultant Foliar Tension (Hydraulic Pressure Drop):',
        latex: '\\Psi_{\\text{hoja}} = \\Psi_{\\text{suelo}} - J_w \\cdot \\left( R_{\\text{raíz}} + R_{\\text{xilema}} \\right)'
      }
    ],
    calculus: [
      {
        descEs: '1. Curva Sigmoidea de Pérdida de Conductividad Hidráulica (PLC Weibull):',
        descEn: '1. Sigmoidal Percent Loss of Conductivity (PLC Weibull):',
        latex: '\\text{PLC}(\\Psi) = \\frac{100}{1 + \\exp\\left( s \\cdot (\\Psi - P_{50}) \\right)} \\quad [\\%]'
      },
      {
        descEs: '2. Conductancia Estomática Óptima (Modelo Medlyn et al.):',
        descEn: '2. Optimal Stomatal Conductance (Medlyn et al. Model):',
        latex: 'g_s = g_0 + 1.6 \\left( 1 + \\frac{g_1}{\\sqrt{\\text{VPD}}} \\right) \\frac{A_n}{C_a}'
      }
    ],
    quiz: {
      questionEs: 'Si el suelo se seca alcanzando Ψ_suelo = -1.8 MPa con un VPD de 3.2 kPa, y el xilema de la especie tiene un umbral P50 = -1.6 MPa (como Phragmites), ¿qué fenómeno físico ocurre en los vasos conductores y en el follaje?',
      questionEn: 'If the soil dries to Ψ_soil = -1.8 MPa under VPD = 3.2 kPa, and the xylem threshold is P50 = -1.6 MPa (as in Phragmites), what physical phenomenon occurs in the vascular conduits and canopy?',
      options: [
        {
          id: 'a',
          textEs: 'Más del 60% de los vasos colapsan con embolismo acústico (PLC > 60%) y las hojas se marchitan doblando su ángulo hacia el suelo.',
          textEn: 'Over 60% of conduits collapse with acoustic embolism (PLC > 60%) and leaves wilt, drooping downward toward the soil.',
          correct: true
        },
        {
          id: 'b',
          textEs: 'El flujo se acelera porque el gradiente de tensión aumenta la succión sin límite.',
          textEn: 'Flux accelerates indefinitely because the steeper gradient pulls water without physical bounds.',
          correct: false
        },
        {
          id: 'c',
          textEs: 'Los estomas se abren completamente para disipar calor latente y enfriar la hoja.',
          textEn: 'Stomata open completely to maximize latent heat dissipation and cool the canopy.',
          correct: false
        },
        {
          id: 'd',
          textEs: 'La conductividad hidráulica se mantiene al 100% gracias a la cohesión intermolecular.',
          textEn: 'Hydraulic conductivity remains at 100% due to liquid cohesion forces.',
          correct: false
        }
      ],
      explanationEs: 'Cuando la tensión foliar supera el umbral crítico P50, la energía libre del agua supera la presión de burbuja de las membranas de punteadura, propagando embolismos acústicos que bloquean el xilema e impiden reponer el agua perdida, forzando el marchitamiento mecánico de las hojas.',
      explanationEn: 'When foliar tension exceeds the critical P50 threshold, water free energy overcomes pit membrane air-seeding entry pressure, propagating acoustic embolisms that block xylem conduits, preventing rehydration and inducing mechanical leaf wilting.'
    }
  },
  {
    id: 'van_genuchten',
    badgeEs: 'Física del Suelo & Hidráulica',
    badgeEn: 'Soil Physics & Hydraulics',
    titleEs: 'Curva Característica de Suelo & Retención Capilar (Van Genuchten)',
    titleEn: 'Soil Water Retention Characteristic Curve (Van Genuchten)',
    subtitleEs: 'Relación fundamental no lineal entre el potencial mátrico de succión (|h|) y el contenido volumétrico de agua (θ) en la red porosa.',
    subtitleEn: 'Fundamental non-linear relationship between matric suction potential (|h|) and volumetric moisture content (θ) in the porous network.',
    color: '#38BDF8',
    icon: '🕳️',
    defaults: { suctionKpa: 33, alpha: 0.03, n: 1.65, thetaS: 0.55 },
    sliders: [
      { key: 'suctionKpa', labelEs: 'Succión Mátrica (|h|)', labelEn: 'Matric Suction (|h|)', min: 1, max: 1500, step: 10, unit: ' kPa' },
      { key: 'thetaS', labelEs: 'Humedad Saturada (θ_s)', labelEn: 'Saturated Moisture (θ_s)', min: 0.35, max: 0.88, step: 0.02, unit: ' cm³/cm³' },
      { key: 'alpha', labelEs: 'Parámetro α (1/h_b)', labelEn: 'Parameter α (1/h_b)', min: 0.005, max: 0.12, step: 0.005, unit: ' 1/cm' },
      { key: 'n', labelEs: 'Distribución Poros (n)', labelEn: 'Pore Distribution (n)', min: 1.2, max: 3.2, step: 0.05, unit: '' }
    ],
    presets: [
      {
        labelEs: '🌱 Turba Orgánica Fen (Macroporosa)',
        labelEn: '🌱 Pristine Fen Peat (Macroporous)',
        tagEs: 'Alta Retención',
        tagEn: 'High Storage',
        values: { suctionKpa: 2.5, alpha: 0.08, n: 1.45, thetaS: 0.82 }
      },
      {
        labelEs: '🌾 Suelo Franco Agrícola (Capacidad de Campo)',
        labelEn: '🌾 Loamy Agricultural Soil (Field Capacity)',
        tagEs: 'Equilibrio Óptimo',
        tagEn: 'Optimal Balance',
        values: { suctionKpa: 33, alpha: 0.025, n: 1.70, thetaS: 0.46 }
      },
      {
        labelEs: '🏜️ Punto de Marchitez Permanente (PWP - 15 bar)',
        labelEn: '🏜️ Permanent Wilting Point (PWP - 15 bar)',
        tagEs: 'Agua Inaccesible',
        tagEn: 'Inaccessible Water',
        values: { suctionKpa: 1500, alpha: 0.025, n: 1.70, thetaS: 0.46 }
      }
    ],
    algebra: [
      {
        descEs: '1. Ecuación Paramétrica de Van Genuchten (1980):',
        descEn: '1. Parametric Van Genuchten Equation (1980):',
        latex: '\\Theta(h) = \\frac{\\theta(h) - \\theta_r}{\\theta_s - \\theta_r} = \\left[ 1 + (\\alpha |h|)^n \\right]^{-m} \\quad ; \\quad m = 1 - 1/n'
      },
      {
        descEs: '2. Capacidad de Almacenamiento de Agua Disponible (AWC):',
        descEn: '2. Plant Available Water Capacity (AWC):',
        latex: '\\text{AWC} = \\theta_{\\text{FC}} (|h| = 33\\text{ kPa}) - \\theta_{\\text{PWP}} (|h| = 1500\\text{ kPa})'
      }
    ],
    calculus: [
      {
        descEs: 'Capacidad Específica de Humedad (Derivada dθ/dh de la curva):',
        descEn: 'Specific Moisture Capacity (Derivative dθ/dh of retention curve):',
        latex: 'C(h) = \\frac{d\\theta}{dh} = -\\alpha n m (\\theta_s - \\theta_r) (\\alpha |h|)^{n-1} \\left[ 1 + (\\alpha |h|)^n \\right]^{-(m+1)}'
      }
    ],
    quiz: {
      questionEs: '¿Por qué una turba orgánica de Sphagnum retiene más del 80% de agua en saturación pero cede agua con facilidad a succiones mínimas (0-10 kPa)?',
      questionEn: 'Why does Sphagnum peat retain over 80% volumetric water at saturation but release water rapidly under slight suction (0–10 kPa)?',
      options: [
        {
          id: 'a',
          textEs: 'Por su red de células hialinas muertas y macroporos inter-fibra que drenan bajo gravedad pero conservan agua capilar.',
          textEn: 'Due to dead hyaline cell networks and inter-fiber macropores that drain under gravity while retaining capillary water in pores.',
          correct: true
        },
        {
          id: 'b',
          textEs: 'Porque las células de Sphagnum son impermeables al agua.',
          textEn: 'Because Sphagnum cells are structurally impermeable to liquid water.',
          correct: false
        },
        {
          id: 'c',
          textEs: 'Debido a la ausencia total de tensión superficial.',
          textEn: 'Due to complete absence of interfacial surface tension.',
          correct: false
        },
        {
          id: 'd',
          textEs: 'Porque el agua se evapora instantáneamente a bajas succiones.',
          textEn: 'Because water evaporates instantaneously at low tension.',
          correct: false
        }
      ],
      explanationEs: 'Las células hialinas de Sphagnum son cámaras microscópicas perforadas con anillos de refuerzo espiralados que almacenan hasta 20 veces su peso en agua a baja tensión, constituyendo una reserva de retención única en la biosfera.',
      explanationEn: 'Sphagnum hyaline cells are hollow dead micro-chambers with spiral fibril thickenings that store up to 20 times their dry weight in water, releasing gravitational moisture easily while guarding capillary reserves.'
    }
  },
  {
    id: 'green_ampt',
    badgeEs: 'Hidrología de Suelos & Infiltración',
    badgeEn: 'Soil Hydrology & Infiltration',
    titleEs: 'Infiltración de Green-Ampt, Frente Húmedo & Encharcamiento',
    titleEn: 'Green-Ampt Infiltration, Wetting Front & Surface Ponding',
    subtitleEs: 'Dinámica del frente de humedecimiento bajo lluvia: partición física entre capacidad de infiltración, almacenamiento de perfil y escorrentía superficial.',
    subtitleEn: 'Dynamics of the wetting front under precipitation: physical partitioning between infiltration capacity, profile storage, and surface runoff.',
    color: '#F59E0B',
    icon: '🌧️',
    defaults: { rainIntensity: 35, ks: 20, suctionHead: 25, compaction: 0.32 },
    sliders: [
      { key: 'rainIntensity', labelEs: 'Intensidad Lluvia (P)', labelEn: 'Rain Intensity (P)', min: 5, max: 120, step: 5, unit: ' mm/h' },
      { key: 'ks', labelEs: 'Conductividad Sat. (K_s)', labelEn: 'Saturated Cond. (K_s)', min: 2, max: 60, step: 2, unit: ' mm/h' },
      { key: 'suctionHead', labelEs: 'Succión Frente (ψ_f)', labelEn: 'Front Suction (ψ_f)', min: 5, max: 60, step: 5, unit: ' cm' },
      { key: 'compaction', labelEs: 'Densidad Aparente (ρ_b)', labelEn: 'Bulk Density (ρ_b)', min: 0.18, max: 0.85, step: 0.02, unit: ' g/cm³' }
    ],
    presets: [
      {
        labelEs: '🌧️ Infiltración Plena sin Charco',
        labelEn: '🌧️ Unimpeded Infiltration (No Ponding)',
        tagEs: 'P < K_s',
        tagEn: 'P < K_s',
        values: { rainIntensity: 15, ks: 30, suctionHead: 20, compaction: 0.22 }
      },
      {
        labelEs: '⚡ Tormenta Convectiva (Encharcamiento)',
        labelEn: '⚡ Convective Storm (Ponding Triggered)',
        tagEs: 'P > K_s',
        tagEn: 'P > K_s',
        values: { rainIntensity: 75, ks: 18, suctionHead: 25, compaction: 0.32 }
      },
      {
        labelEs: '🚜 Piso de Arado Compactado (Bloqueo)',
        labelEn: '🚜 Compacted Plow Pan (Blocked Front)',
        tagEs: 'Escorrentía Severa',
        tagEn: 'Severe Runoff',
        values: { rainIntensity: 35, ks: 3, suctionHead: 35, compaction: 0.78 }
      }
    ],
    algebra: [
      {
        descEs: '1. Capacidad Instantánea de Infiltración de Green-Ampt:',
        descEn: '1. Instantaneous Green-Ampt Infiltration Capacity:',
        latex: 'f(t) = K_s \\cdot \\left( 1 + \\frac{\\psi_f \\cdot \\Delta\\theta}{F(t)} \\right) \\quad [\\text{mm/h}]'
      },
      {
        descEs: '2. Criterio de Encharcamiento Superficial (Ponding Time t_p):',
        descEn: '2. Surface Ponding Time Threshold (t_p):',
        latex: 'F(t_p) = \\frac{K_s \\cdot \\psi_f \\cdot \\Delta\\theta}{P - K_s} \\quad \\text{si } P > K_s'
      }
    ],
    calculus: [
      {
        descEs: 'Ecuación Diferencial No Lineal para la Infiltración Acumulada F(t):',
        descEn: 'Non-Linear Differential Formulation for Cumulative Infiltration F(t):',
        latex: '\\frac{dF}{dt} = K_s \\left( 1 + \\frac{\\psi_f \\Delta\\theta}{F} \\right) \\implies F(t) - \\psi_f \\Delta\\theta \\ln\\left(1 + \\frac{F}{\\psi_f \\Delta\\theta}\\right) = K_s t'
      }
    ],
    quiz: {
      questionEs: 'Si la densidad aparente del suelo sube de 0.25 a 0.75 g/cm³ por el paso reiterado de tractores pesados en un pastizal de Lolium perenne, ¿qué le ocurre a la conductividad saturada Ks y a las raíces?',
      questionEn: 'If soil bulk density rises from 0.25 to 0.75 g/cm³ due to heavy tractor compaction in a Lolium perenne sward, what happens to Ks and root aeration?',
      options: [
        {
          id: 'a',
          textEs: 'Ks colapsa hasta 10 veces, compactando la zona radicular, generando anoxia superficial y escorrentía rápida.',
          textEn: 'Ks collapses by up to an order of magnitude, crushing macropores, inducing perched anoxia, and accelerating overland runoff.',
          correct: true
        },
        {
          id: 'b',
          textEs: 'Ks aumenta porque el suelo se vuelve más denso y firme.',
          textEn: 'Ks increases because denser soil provides tighter matrix capillary continuity.',
          correct: false
        },
        {
          id: 'c',
          textEs: 'El frente húmedo desciende al doble de velocidad.',
          textEn: 'The wetting front descends twice as fast into deep subsoil.',
          correct: false
        },
        {
          id: 'd',
          textEs: 'La succión en el frente disminuye a cero inmediatamente.',
          textEn: 'Suction at the front drops instantaneously to hydrostatic zero.',
          correct: false
        }
      ],
      explanationEs: 'La compactación mecánica tritura preferencialmente los macroporos (>50 µm), que conducen el agua gravitacional y oxigenan las raíces. Al colapsar los poros, las raíces de Lolium sufren asfixia radical.',
      explanationEn: 'Mechanical wheel compaction selectively crushes structural macropores (>50 µm), which conduct >90% of gravitational drainage and ventilate roots, triggering perched waterlogging and root hypoxia.'
    }
  },
  {
    id: 'redox_enzymic',
    badgeEs: 'Biogeoquímica & Suelos Anegados',
    badgeEn: 'Biogeochemistry & Waterlogged Soils',
    titleEs: 'Escalera Redox (Eh), Latch Enzimático & Metanogénesis',
    titleEn: 'Redox Ladder (Eh), Enzymic Latch & Methanogenesis',
    subtitleEs: 'Termodinámica de aceptores de electrones en turba: barrera de difusión de oxígeno, freno fenólico y emisión de pulsos de CH₄ a través de aerénquima.',
    subtitleEn: 'Thermodynamics of electron acceptors in peat: oxygen diffusion barrier, phenolic lock, and episodic CH₄ pulses vented via aerenchyma bypass.',
    color: '#A855F7',
    icon: '⚡',
    defaults: { wtdCm: -10, tempC: 16, phenolIndex: 40, soilPh: 6.5 },
    sliders: [
      { key: 'wtdCm', labelEs: 'Nivel Freático (WTD)', labelEn: 'Water Table Depth (WTD)', min: -60, max: 10, step: 2, unit: ' cm' },
      { key: 'tempC', labelEs: 'Temperatura Suelo (T)', labelEn: 'Soil Temperature (T)', min: 2, max: 28, step: 1, unit: ' °C' },
      { key: 'phenolIndex', labelEs: 'Freno Fenólico (Fenoles)', labelEn: 'Phenolic Latch (Phenols)', min: 0, max: 100, step: 5, unit: ' %' },
      { key: 'soilPh', labelEs: 'pH Agua de Poro', labelEn: 'Porewater pH', min: 3.5, max: 8.2, step: 0.1, unit: '' }
    ],
    presets: [
      {
        labelEs: '🌊 Humedal Inundado Activo (Metanogénesis)',
        labelEn: '🌊 Rewetted Wetland (Active Methanogenesis)',
        tagEs: 'Eh < -150 mV',
        tagEn: 'Eh < -150 mV',
        values: { wtdCm: 2, tempC: 19, phenolIndex: 20, soilPh: 6.9 }
      },
      {
        labelEs: '🚜 Turbera Drenada (Mineralización Rápida CO₂)',
        labelEn: '🚜 Drained Peatland (Rapid CO₂ Mineralization)',
        tagEs: 'Eh > +400 mV',
        tagEn: 'Eh > +400 mV',
        values: { wtdCm: -48, tempC: 21, phenolIndex: 10, soilPh: 6.2 }
      },
      {
        labelEs: '❄️ Bofedal Ácido Frío (Bloqueo Enzimático Total)',
        labelEn: '❄️ Cold Acidic Bog (Full Enzymic Latch)',
        tagEs: 'Enzymic Latch',
        tagEn: 'Enzymic Latch',
        values: { wtdCm: -4, tempC: 5, phenolIndex: 85, soilPh: 3.9 }
      }
    ],
    algebra: [
      {
        descEs: '1. Potencial Redox Corregido por pH (Ecuación de Nernst):',
        descEn: '1. pH-Corrected Redox Potential (Nernst Equation):',
        latex: 'E_h = E^0 - \\frac{2.303 \\, R T}{n F} \\cdot \\text{pH} \\approx E^0 - 0.0591 \\cdot \\text{pH} \\quad [\\text{V a 25°C}]'
      },
      {
        descEs: '2. Tasa de Descomposición con Inhibición Fenólica (Freeman et al. 2001):',
        descEn: '2. Peat Decomposition with Phenolic Enzyme Inhibition (Freeman et al. 2001):',
        latex: 'R_{\\text{turba}} = V_{\\max} \\cdot Q_{10}^{(T-10)/10} \\cdot \\frac{[O_2]}{K_{O_2} + [O_2]} \\cdot \\left( 1 - \\frac{\\text{Fenoles}}{100} \\right)'
      }
    ],
    calculus: [
      {
        descEs: 'Difusión de Oxígeno en Medio Poroso Saturado (Ley de Fick con Barrera Líquida):',
        descEn: 'Oxygen Diffusion in Saturated Porous Media (Fick Law with Aqueous Barrier):',
        latex: '\\frac{\\partial C_{O_2}}{\\partial t} = D_{\\text{efectivo}} \\frac{\\partial^2 C_{O_2}}{\\partial z^2} - R_{\\text{respiración}}(z) \\quad ; \\quad D_{\\text{agua}} \\approx 10^{-4} \\cdot D_{\\text{aire}}'
      }
    ],
    quiz: {
      questionEs: '¿Cómo logra Phragmites australis transportar metano (CH4) directamente a la atmósfera desde las capas anóxicas profundas del suelo sin que sea consumido por bacterias metanótrofas?',
      questionEn: 'How does Phragmites australis vent methane (CH4) directly into the atmosphere from deep anoxic soil layers without being consumed by methanotrophs?',
      options: [
        {
          id: 'a',
          textEs: 'A través de su sistema de aerénquima interno (chimenea vascular continua), evitando la zona de oxidación aeróbica superficial.',
          textEn: 'Through its continuous internal aerenchyma conduit (gas chimney), bypassing the oxic surface rhizosphere where methanotrophs operate.',
          correct: true
        },
        {
          id: 'b',
          textEs: 'El metano solo se produce cuando la temperatura exterior cae por debajo de 0°C.',
          textEn: 'Methane is generated only when ambient surface temperature drops below freezing.',
          correct: false
        },
        {
          id: 'c',
          textEs: 'Las bacterias aeróbicas se transforman genéticamente en arqueas de forma inmediata.',
          textEn: 'Aerobic bacteria immediately mutate genetically into methanogenic archaea.',
          correct: false
        },
        {
          id: 'd',
          textEs: 'El pH sube automáticamente a 14 alcalinizando todo el perfil.',
          textEn: 'Soil pH automatically spikes to 14, alkalizing the entire profile.',
          correct: false
        }
      ],
      explanationEs: 'El aerénquima de Phragmites y Typha actúa como una chimenea de gas de baja resistencia: el CH₄ ingresa por las raíces sumergidas y viaja por flujo advectivo hacia las hojas, eludiendo la capa superficial oxigenada donde las bacterias metanótrofas de otro modo oxidarían hasta el 90% del metano.',
      explanationEn: 'Aerenchyma tissue in Phragmites and Typha provides a low-resistance gas conduit: CH₄ diffuses into flooded roots and travels advectively up stems to exit through stomata/lenticels, bypassing the oxic capillary zone where methanotrophic bacteria would otherwise oxidize >90% of emitted CH₄.'
    }
  }
];

export class SoilPlantLab {
  constructor(app) {
    this.app = app;
    this.selectedProblemId = 'spac_cavitation';
    this.selectedSpeciesId = 'phragmites';
    
    // Read persisted language preference or default to English/Spanish
    this.lang = localStorage.getItem('wetland_lab_lang') || 'en';

    this.params = { ...SOIL_PLANT_PROBLEMS[0].defaults };
    this.isPlaying = true;
    this.simSpeed = 1.0;
    this.simTime = 0;
    this.animFrameId = null;
    this.lastTimestamp = performance.now();

    // DOM Refs
    this.canvas = null;
    this.ctx = null;
    this.container = null;

    // Visual particles & states
    this.particles = [];
    this.bubbles = [];
    this.initParticles();
  }

  isEn() {
    return this.lang === 'en';
  }

  setLanguage(newLang) {
    if (newLang !== 'en' && newLang !== 'es') return;
    this.lang = newLang;
    try {
      localStorage.setItem('wetland_lab_lang', newLang);
    } catch (_) {}

    // Update active class on toggle buttons
    const langBtns = this.container?.querySelectorAll('.spl-btn-lang');
    langBtns?.forEach(b => b.classList.toggle('active', b.dataset.splLang === newLang));

    this.renderSpeciesUI();
    this.renderProblemUI();
    this.updateTelemetry();
  }

  getCurrentSpecies() {
    return PLANT_SPECIES.find(s => s.id === this.selectedSpeciesId) || PLANT_SPECIES[0];
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * 840,
        y: Math.random() * 380,
        speed: 0.6 + Math.random() * 1.6,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7
      });
    }

    this.bubbles = [];
    for (let i = 0; i < 20; i++) {
      this.bubbles.push({
        x: 380 + (Math.random() - 0.5) * 100,
        y: 120 + Math.random() * 200,
        r: 2.5 + Math.random() * 5.5,
        speed: 1.2 + Math.random() * 1.8,
        pulse: Math.random() * Math.PI
      });
    }
  }

  getCurrentProblem() {
    return SOIL_PLANT_PROBLEMS.find(p => p.id === this.selectedProblemId) || SOIL_PLANT_PROBLEMS[0];
  }

  initDOM() {
    this.container = document.getElementById('view-soil-plant-lab');
    if (!this.container) return;

    this.canvas = document.getElementById('spl-simulation-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.bindEvents();
    this.renderSpeciesUI();
    this.renderProblemUI();
    this.startLoop();
  }

  bindEvents() {
    // Language Toggle Buttons
    const langBtns = this.container.querySelectorAll('.spl-btn-lang');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLang = btn.dataset.splLang;
        if (targetLang) this.setLanguage(targetLang);
      });
    });

    // Problem selector tabs
    const tabs = this.container.querySelectorAll('.spl-phenomenon-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.dataset.problemId;
        if (id && id !== this.selectedProblemId) {
          this.selectProblem(id);
        }
      });
    });

    // Play / Pause / Reset
    const btnPlay = document.getElementById('spl-btn-play');
    const btnReset = document.getElementById('spl-btn-reset');
    const btnSpeed = document.getElementById('spl-btn-speed');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        btnPlay.innerHTML = this.isPlaying 
          ? (this.isEn() ? '⏸ Pause' : '⏸ Pausa') 
          : (this.isEn() ? '▶ Play' : '▶ Reproducir');
        btnPlay.classList.toggle('active', this.isPlaying);
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.simTime = 0;
        this.initParticles();
      });
    }

    if (btnSpeed) {
      btnSpeed.addEventListener('click', () => {
        if (this.simSpeed === 1.0) this.simSpeed = 2.0;
        else if (this.simSpeed === 2.0) this.simSpeed = 0.5;
        else this.simSpeed = 1.0;
        btnSpeed.textContent = `${this.simSpeed}x`;
      });
    }
  }

  renderSpeciesUI() {
    const container = document.getElementById('spl-species-pills');
    if (!container) return;
    const isEn = this.isEn();

    container.innerHTML = PLANT_SPECIES.map(sp => {
      const isActive = sp.id === this.selectedSpeciesId;
      const common = isEn ? sp.commonName.en : sp.commonName.es;
      const typeStr = isEn ? sp.type.en : sp.type.es;
      const traitStr = isEn ? sp.traits.en : sp.traits.es;

      return `
        <button type="button" class="spl-species-btn ${isActive ? 'active' : ''}" data-species-id="${sp.id}" title="${traitStr}">
          <span style="font-size: 1.05rem;">${sp.icon}</span>
          <span class="spl-species-name">${sp.name}</span>
          <span class="spl-species-trait">${typeStr}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.spl-species-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const spId = btn.dataset.speciesId;
        if (spId && spId !== this.selectedSpeciesId) {
          this.selectSpecies(spId);
        }
      });
    });
  }

  selectSpecies(speciesId) {
    const sp = PLANT_SPECIES.find(s => s.id === speciesId);
    if (!sp) return;

    this.selectedSpeciesId = speciesId;
    
    // Dynamically adjust parameters based on species traits
    if (this.selectedProblemId === 'spac_cavitation') {
      this.params.p50 = sp.p50;
      this.updateSlidersUI();
    } else if (this.selectedProblemId === 'redox_enzymic') {
      if (sp.id === 'sphagnum') {
        this.params.phenolIndex = 80;
        this.params.soilPh = 4.0;
        this.updateSlidersUI();
      } else if (sp.id === 'phragmites') {
        this.params.phenolIndex = 25;
        this.params.soilPh = 6.8;
        this.updateSlidersUI();
      }
    }

    this.renderSpeciesUI();
    this.initParticles();
  }

  selectProblem(problemId) {
    const prob = SOIL_PLANT_PROBLEMS.find(p => p.id === problemId);
    if (!prob) return;

    this.selectedProblemId = problemId;
    this.params = { ...prob.defaults };
    
    const sp = this.getCurrentSpecies();
    if (problemId === 'spac_cavitation') {
      this.params.p50 = sp.p50;
    }

    this.simTime = 0;
    this.initParticles();

    // Update active tab class
    const tabs = this.container.querySelectorAll('.spl-phenomenon-tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.problemId === problemId));

    this.renderProblemUI();
  }

  renderProblemUI() {
    const prob = this.getCurrentProblem();
    const isEn = this.isEn();

    // 1. Update Hero Details
    const badgeEl = document.getElementById('spl-badge-primary');
    const titleEl = document.getElementById('spl-main-title');
    const subtitleEl = document.getElementById('spl-main-subtitle');

    if (badgeEl) badgeEl.textContent = `${prob.icon} ${isEn ? prob.badgeEn : prob.badgeEs}`;
    if (titleEl) titleEl.textContent = isEn ? prob.titleEn : prob.titleEs;
    if (subtitleEl) subtitleEl.textContent = isEn ? prob.subtitleEn : prob.subtitleEs;

    // 2. Render Presets
    const presetsContainer = document.getElementById('spl-presets-list');
    if (presetsContainer) {
      presetsContainer.innerHTML = prob.presets.map((preset, idx) => `
        <button type="button" class="spl-preset-btn" data-preset-idx="${idx}">
          <span>${isEn ? preset.labelEn : preset.labelEs}</span>
          <span class="spl-preset-tag">${isEn ? preset.tagEn : preset.tagEs}</span>
        </button>
      `).join('');

      presetsContainer.querySelectorAll('.spl-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.presetIdx, 10);
          const p = prob.presets[idx];
          if (p) {
            this.params = { ...this.params, ...p.values };
            this.simTime = 0;
            this.updateSlidersUI();
          }
        });
      });
    }

    // 3. Render Sliders
    const slidersContainer = document.getElementById('spl-sliders-list');
    if (slidersContainer) {
      slidersContainer.innerHTML = prob.sliders.map(sl => {
        const val = this.params[sl.key] !== undefined ? this.params[sl.key] : sl.min;
        const labelText = isEn ? sl.labelEn : sl.labelEs;
        return `
          <div class="spl-slider-item">
            <div class="spl-slider-header">
              <span class="spl-slider-label">${labelText}</span>
              <span class="spl-slider-value" id="spl-val-${sl.key}">${val}${sl.unit}</span>
            </div>
            <input type="range" class="spl-slider-range" 
                   data-param-key="${sl.key}"
                   min="${sl.min}" max="${sl.max}" step="${sl.step}" value="${val}">
          </div>
        `;
      }).join('');

      slidersContainer.querySelectorAll('.spl-slider-range').forEach(input => {
        input.addEventListener('input', () => {
          const key = input.dataset.paramKey;
          const val = parseFloat(input.value);
          this.params[key] = val;
          const labelEl = document.getElementById(`spl-val-${key}`);
          const slConfig = prob.sliders.find(s => s.key === key);
          if (labelEl && slConfig) {
            labelEl.textContent = `${val}${slConfig.unit}`;
          }
        });
      });
    }

    // 4. Render Math Formulas (Algebra & Calculus)
    const algList = document.getElementById('spl-algebra-list');
    if (algList) {
      algList.innerHTML = prob.algebra.map(item => `
        <div class="spl-formula-box">
          <div class="spl-formula-desc">${isEn ? item.descEn : item.descEs}</div>
          <div class="spl-formula-render">\\[ ${item.latex} \\]</div>
        </div>
      `).join('');
    }

    const calcList = document.getElementById('spl-calculus-list');
    if (calcList) {
      calcList.innerHTML = prob.calculus.map(item => `
        <div class="spl-formula-box">
          <div class="spl-formula-desc">${isEn ? item.descEn : item.descEs}</div>
          <div class="spl-formula-render">\\[ ${item.latex} \\]</div>
        </div>
      `).join('');
    }

    // 5. Render Quiz Challenge
    const quizQuestionEl = document.getElementById('spl-quiz-question');
    const quizOptionsGrid = document.getElementById('spl-quiz-options');
    const quizFeedback = document.getElementById('spl-quiz-feedback');

    if (quizQuestionEl && prob.quiz) {
      quizQuestionEl.textContent = isEn ? prob.quiz.questionEn : prob.quiz.questionEs;
    }

    if (quizOptionsGrid && prob.quiz) {
      quizFeedback.className = 'spl-feedback-card';
      quizFeedback.innerHTML = '';
      quizFeedback.style.display = 'none';

      quizOptionsGrid.innerHTML = prob.quiz.options.map(opt => `
        <button type="button" class="spl-option-btn" data-option-id="${opt.id}">
          <span class="spl-option-letter">${opt.id.toUpperCase()}</span>
          <span>${isEn ? opt.textEn : opt.textEs}</span>
        </button>
      `).join('');

      quizOptionsGrid.querySelectorAll('.spl-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const optId = btn.dataset.optionId;
          const chosen = prob.quiz.options.find(o => o.id === optId);

          quizOptionsGrid.querySelectorAll('.spl-option-btn').forEach(b => {
            b.classList.remove('correct', 'incorrect');
          });

          const expText = isEn ? prob.quiz.explanationEn : prob.quiz.explanationEs;

          if (chosen && chosen.correct) {
            btn.classList.add('correct');
            quizFeedback.className = 'spl-feedback-card correct';
            quizFeedback.innerHTML = isEn
              ? `<strong>✓ Correct!</strong> ${expText}`
              : `<strong>✓ ¡Correcto!</strong> ${expText}`;
            quizFeedback.style.display = 'block';
          } else {
            btn.classList.add('incorrect');
            quizFeedback.className = 'spl-feedback-card incorrect';
            quizFeedback.innerHTML = isEn
              ? `<strong>✗ Incorrect.</strong> Physical review: ${expText}`
              : `<strong>✗ Respuesta Incorrecta.</strong> Revisa el balance físico: ${expText}`;
            quizFeedback.style.display = 'block';
          }
        });
      });
    }

    this.renderKaTeX();
  }

  updateSlidersUI() {
    const prob = this.getCurrentProblem();
    prob.sliders.forEach(sl => {
      const input = this.container.querySelector(`.spl-slider-range[data-param-key="${sl.key}"]`);
      const valEl = document.getElementById(`spl-val-${sl.key}`);
      const currentVal = this.params[sl.key];
      if (input && currentVal !== undefined) input.value = currentVal;
      if (valEl && currentVal !== undefined) valEl.textContent = `${currentVal}${sl.unit}`;
    });
  }

  renderKaTeX() {
    if (window.renderMathInElement && this.container) {
      try {
        window.renderMathInElement(this.container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render warning:', e);
      }
    }
  }

  startLoop() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.lastTimestamp = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - this.lastTimestamp) / 1000, 0.05);
      this.lastTimestamp = now;

      if (this.isPlaying) {
        this.simTime += dt * this.simSpeed;
      }

      this.renderCanvas();
      this.updateTelemetry();

      const timeEl = document.getElementById('spl-sim-clock');
      if (timeEl) {
        timeEl.textContent = `T = ${this.simTime.toFixed(1)}s`;
      }

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  pauseLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  resumeLoop() {
    if (!this.animFrameId) {
      this.startLoop();
    }
  }

  // ==========================================================================
  // PHYSICS TELEMETRY COMPUTATIONS
  // ==========================================================================
  updateTelemetry() {
    const prob = this.getCurrentProblem();
    const sp = this.getCurrentSpecies();
    const isEn = this.isEn();

    if (prob.id === 'spac_cavitation') {
      const { psiSoil, vpd, rStomata, p50 } = this.params;
      
      const rSoilRoot = 0.15;
      const rXylem = 0.10;
      const totalR = rSoilRoot + rXylem + rStomata;
      
      const drivingForce = Math.max(0.01, Math.abs(psiSoil) * 0.4 + vpd * 1.2);
      const E = (drivingForce / totalR) * 0.85;

      const deltaPsi = E * (rSoilRoot + rXylem) * 0.8;
      const psiLeaf = psiSoil - deltaPsi;

      const s = sp.vulnerabilitySlope || 2.5;
      const plc = 100 / (1 + Math.exp(s * (psiLeaf - p50)));

      let status = isEn ? `${sp.name}: Full Turgor` : `${sp.name}: Turgencia Plena`;
      let statusColor = '#34D399';
      if (plc > 65) {
        status = isEn ? `${sp.name}: Severe Wilting (Xylem Embolism)` : `${sp.name}: Marchitamiento Severo (Embolismo Xilema)`;
        statusColor = '#F43F5E';
      } else if (psiLeaf < sp.wiltingPsi || vpd > 2.2) {
        status = isEn ? `${sp.name}: Water Stress (Stomatal Closure)` : `${sp.name}: Estrés Hídrico (Cierre Estomático)`;
        statusColor = '#F59E0B';
      }

      this.setTelemetryHTML(`
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Active Species' : 'Especie Activa'}</span>
          <span class="spl-telemetry-value" style="font-size: 0.95rem; font-style: italic;">${sp.icon} ${sp.name}</span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Transpiration (E)' : 'Transpiración (E)'}</span>
          <span class="spl-telemetry-value">${E.toFixed(2)} <span class="spl-telemetry-unit">mm/h</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Foliar Potential (Ψ_L)' : 'Potencial Foliar (Ψ_L)'}</span>
          <span class="spl-telemetry-value" style="color: ${psiLeaf < p50 ? '#F43F5E' : '#38BDF8'}">${psiLeaf.toFixed(2)} <span class="spl-telemetry-unit">MPa</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Embolism (PLC)' : 'Embolismo (PLC)'}</span>
          <span class="spl-telemetry-value" style="color: ${plc > 50 ? '#F43F5E' : '#34D399'}">${plc.toFixed(1)} <span class="spl-telemetry-unit">%</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Stomatal Aperture' : 'Apertura Estomática'}</span>
          <span class="spl-telemetry-value">${Math.max(5, (100 - rStomata * 35)).toFixed(0)} <span class="spl-telemetry-unit">%</span></span>
        </div>
        <div class="spl-telemetry-state">
          <span style="font-size: 1.1rem;">⚡</span>
          <span class="spl-state-indicator" style="color: ${statusColor}">${status}</span>
        </div>
      `);
    } else if (prob.id === 'van_genuchten') {
      const { suctionKpa, alpha, n, thetaS } = this.params;
      const m = 1 - 1 / n;
      const hCm = suctionKpa * 10.197;
      const thetaR = 0.05;

      const theta = thetaR + (thetaS - thetaR) / Math.pow(1 + Math.pow(alpha * hCm, n), m);
      const satDegree = (theta / thetaS) * 100;

      let status = isEn ? `${sp.name}: Available Moisture in Rootzone` : `${sp.name}: Agua Libre en Zona Radicular`;
      let statusColor = '#34D399';
      if (suctionKpa >= 1400) {
        status = isEn ? `${sp.name}: Wilting Point (Bound Water)` : `${sp.name}: Punto de Marchitez (Agua Inaccesible)`;
        statusColor = '#F43F5E';
      } else if (suctionKpa <= 10) {
        status = isEn ? `${sp.name}: Saturated (Hypoxia Risk)` : `${sp.name}: Saturado (Riesgo de Anoxia)`;
        statusColor = '#38BDF8';
      }

      this.setTelemetryHTML(`
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Active Species' : 'Especie Activa'}</span>
          <span class="spl-telemetry-value" style="font-size: 0.95rem; font-style: italic;">${sp.icon} ${sp.name}</span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Moisture Content (θ)' : 'Humedad Volumétrica (θ)'}</span>
          <span class="spl-telemetry-value">${theta.toFixed(3)} <span class="spl-telemetry-unit">cm³/cm³</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Saturation Ratio (S_e)' : 'Grado Saturación (S_e)'}</span>
          <span class="spl-telemetry-value">${satDegree.toFixed(1)} <span class="spl-telemetry-unit">%</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Matric Suction (pF)' : 'Succión Mátrica (pF)'}</span>
          <span class="spl-telemetry-value">${Math.log10(Math.max(1, hCm)).toFixed(2)} <span class="spl-telemetry-unit">pF</span></span>
        </div>
        <div class="spl-telemetry-state">
          <span style="font-size: 1.1rem;">💧</span>
          <span class="spl-state-indicator" style="color: ${statusColor}">${status}</span>
        </div>
      `);
    } else if (prob.id === 'green_ampt') {
      const { rainIntensity, ks, suctionHead, compaction } = this.params;
      const effectiveKs = ks * Math.max(0.1, (1.2 - compaction * 1.1));
      
      const F = Math.max(2, this.simTime * effectiveKs * 0.5);
      const fInfil = effectiveKs * (1 + (suctionHead * 0.25) / F);
      const ponding = rainIntensity > fInfil;
      const runoff = ponding ? Math.max(0, rainIntensity - fInfil) : 0;

      let status = isEn ? `${sp.name}: Infiltration & Root Aeration` : `${sp.name}: Infiltración & Aireación Radicular`;
      let statusColor = '#34D399';
      if (runoff > 15) {
        status = isEn ? `${sp.name}: Severe Surface Runoff & Ponding` : `${sp.name}: Encharcamiento y Escorrentía Superficial`;
        statusColor = '#F43F5E';
      } else if (ponding) {
        status = isEn ? `${sp.name}: Surface Ponding Initiated (t > tp)` : `${sp.name}: Inicio de Encharcamiento Superficial`;
        statusColor = '#F59E0B';
      }

      this.setTelemetryHTML(`
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Active Species' : 'Especie Activa'}</span>
          <span class="spl-telemetry-value" style="font-size: 0.95rem; font-style: italic;">${sp.icon} ${sp.name}</span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Infiltration Rate (f)' : 'Tasa Infiltración (f)'}</span>
          <span class="spl-telemetry-value">${fInfil.toFixed(1)} <span class="spl-telemetry-unit">mm/h</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Effective K_s (Pores)' : 'K_s Efectiva (Poros)'}</span>
          <span class="spl-telemetry-value">${effectiveKs.toFixed(1)} <span class="spl-telemetry-unit">mm/h</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Surface Runoff' : 'Escorrentía Superficial'}</span>
          <span class="spl-telemetry-value" style="color: ${runoff > 0 ? '#F59E0B' : '#34D399'}">${runoff.toFixed(1)} <span class="spl-telemetry-unit">mm/h</span></span>
        </div>
        <div class="spl-telemetry-state">
          <span style="font-size: 1.1rem;">🌧️</span>
          <span class="spl-state-indicator" style="color: ${statusColor}">${status}</span>
        </div>
      `);
    } else if (prob.id === 'redox_enzymic') {
      const { wtdCm, tempC, phenolIndex, soilPh } = this.params;
      
      const baseEh = 420 - ((wtdCm + 60) / 70) * 650;
      const eh = baseEh - (soilPh - 7.0) * 59;

      const q10Factor = Math.pow(2.1, (tempC - 10) / 10);
      const phenolLatch = Math.max(0.05, 1 - (phenolIndex / 100) * 0.9);
      const oxicFraction = Math.min(1.0, Math.max(0.05, -wtdCm / 50));
      const co2Flux = 8.5 * oxicFraction * q10Factor * phenolLatch;

      const aerenchymaFactor = 0.2 + (sp.aerenchymaBypass / 100) * 0.8;
      const ch4Flux = eh < -120 ? Math.max(0, (-eh - 120) * 0.12 * q10Factor * (soilPh > 5.5 ? 1 : 0.2) * aerenchymaFactor) : 0;

      let status = isEn ? `${sp.name}: Aerobic Respiration (CO₂)` : `${sp.name}: Respiración Aeróbica CO₂`;
      let statusColor = '#38BDF8';
      if (eh < -150) {
        status = isEn ? `${sp.name}: CH₄ Aerenchyma Bypass (${sp.aerenchymaBypass}%)` : `${sp.name}: Bypass CH₄ por Aerénquima (${sp.aerenchymaBypass}%)`;
        statusColor = '#F59E0B';
      } else if (phenolIndex > 70) {
        status = isEn ? `${sp.name}: Enzymic Latch Active (Phenol Lock)` : `${sp.name}: Enzymic Latch: Bloqueo Fenólico Total`;
        statusColor = '#A855F7';
      }

      this.setTelemetryHTML(`
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Active Species' : 'Especie Activa'}</span>
          <span class="spl-telemetry-value" style="font-size: 0.95rem; font-style: italic;">${sp.icon} ${sp.name}</span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'Redox Potential (E_h)' : 'Potencial Redox (E_h)'}</span>
          <span class="spl-telemetry-value" style="color: ${eh < 0 ? '#F59E0B' : '#38BDF8'}">${eh.toFixed(0)} <span class="spl-telemetry-unit">mV</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'CO₂ Respiration' : 'Emisión CO₂'}</span>
          <span class="spl-telemetry-value">${co2Flux.toFixed(2)} <span class="spl-telemetry-unit">µmol/m²s</span></span>
        </div>
        <div class="spl-telemetry-cell">
          <span class="spl-telemetry-label">${isEn ? 'CH₄ Bypass Flux' : 'Bypass CH₄'}</span>
          <span class="spl-telemetry-value" style="color: ${ch4Flux > 0 ? '#F59E0B' : '#94A3B8'}">${ch4Flux.toFixed(2)} <span class="spl-telemetry-unit">nmol/m²s</span></span>
        </div>
        <div class="spl-telemetry-state">
          <span style="font-size: 1.1rem;">⚡</span>
          <span class="spl-state-indicator" style="color: ${statusColor}">${status}</span>
        </div>
      `);
    }
  }

  setTelemetryHTML(html) {
    const bar = document.getElementById('spl-telemetry-bar');
    if (bar) bar.innerHTML = html;
  }

  // ==========================================================================
  // REAL-TIME CANVAS 2D RENDERING ENGINE
  // ==========================================================================
  renderCanvas() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;

    // Dark Scientific Blueprint Canvas Background
    ctx.fillStyle = '#070B14';
    ctx.fillRect(0, 0, W, H);

    // Coordinate Grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const prob = this.getCurrentProblem();

    if (prob.id === 'spac_cavitation') {
      this.drawSpacSimulation(ctx, W, H);
    } else if (prob.id === 'van_genuchten') {
      this.drawVanGenuchtenSimulation(ctx, W, H);
    } else if (prob.id === 'green_ampt') {
      this.drawGreenAmptSimulation(ctx, W, H);
    } else if (prob.id === 'redox_enzymic') {
      this.drawRedoxSimulation(ctx, W, H);
    }
  }

  // 1. SPAC & CAVITATION SIMULATION WITH REAL PLANT SPECIES
  drawSpacSimulation(ctx, W, H) {
    const { psiSoil, vpd, rStomata, p50 } = this.params;
    const sp = this.getCurrentSpecies();
    const isEn = this.isEn();
    const t = this.simTime;

    const psiLeaf = psiSoil - (0.4 + vpd * 0.22);
    const s = sp.vulnerabilitySlope || 2.5;
    const plc = 100 / (1 + Math.exp(s * (psiLeaf - p50)));

    const wiltingFactor = Math.min(1.0, Math.max(0.0, (-psiLeaf - 0.7) / (Math.abs(sp.wiltingPsi) - 0.7)));
    const droopAngle = wiltingFactor * 0.85;

    let leafColor = '#10B981';
    let leafStroke = '#34D399';
    if (plc > 60 || wiltingFactor > 0.8) {
      leafColor = '#A16207';
      leafStroke = '#CA8A04';
    } else if (wiltingFactor > 0.4) {
      leafColor = '#65A30D';
      leafStroke = '#84CC16';
    }

    // SECTION 1: SOIL STRATUM & SPECIES ROOT ARCHITECTURE (Left)
    const soilW = 270;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.75)';
    ctx.fillRect(0, 0, soilW, H);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, soilW, H);

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(isEn ? 'SOIL MATRIX STRATUM' : 'ESTRATO DE SUELO (MATRIZ)', 16, 26);
    ctx.fillText(`Ψ_${isEn ? 'soil' : 'suelo'} = ${psiSoil.toFixed(2)} MPa`, 16, 44);

    ctx.fillStyle = 'rgba(100, 116, 139, 0.35)';
    for (let i = 0; i < 22; i++) {
      const px = 20 + (i * 41) % 230;
      const py = 60 + (i * 49) % 310;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    const rootOriginX = soilW;
    const rootOriginY = 190;

    if (sp.rootType === 'rhizome') {
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(rootOriginX, rootOriginY);
      ctx.lineTo(rootOriginX - 70, rootOriginY + 30);
      ctx.lineTo(rootOriginX - 160, rootOriginY + 25);
      ctx.stroke();

      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(rootOriginX - 70, rootOriginY + 30);
      ctx.lineTo(rootOriginX - 85, rootOriginY + 120);
      ctx.moveTo(rootOriginX - 140, rootOriginY + 25);
      ctx.lineTo(rootOriginX - 150, rootOriginY + 100);
      ctx.stroke();

      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(rootOriginX, rootOriginY);
      ctx.lineTo(rootOriginX - 70, rootOriginY + 30);
      ctx.lineTo(rootOriginX - 160, rootOriginY + 25);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#F59E0B';
      for (let k = 0; k < 6; k++) {
        const bx = rootOriginX - 150 + ((k * 30 + t * 25) % 150);
        const by = rootOriginY + 25 + Math.sin(t * 4 + k) * 3;
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (sp.rootType === 'bryophyte') {
      ctx.fillStyle = '#065F46';
      ctx.fillRect(rootOriginX - 180, rootOriginY - 40, 180, 50);
      ctx.strokeStyle = '#34D399';
      ctx.lineWidth = 1.5;
      for (let r = 0; r < 12; r++) {
        ctx.beginPath();
        ctx.moveTo(rootOriginX - 170 + r * 14, rootOriginY + 10);
        ctx.lineTo(rootOriginX - 175 + r * 14, rootOriginY + 45);
        ctx.stroke();
      }
      ctx.fillStyle = '#34D399';
      ctx.font = '10px monospace';
      ctx.fillText(isEn ? 'Hyaline Cell Carpet' : 'Colonia de Células Hialinas', rootOriginX - 170, rootOriginY + 65);
    } else if (sp.rootType === 'woody') {
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(rootOriginX, rootOriginY);
      ctx.quadraticCurveTo(rootOriginX - 90, rootOriginY + 40, rootOriginX - 170, rootOriginY + 130);
      ctx.moveTo(rootOriginX, rootOriginY);
      ctx.quadraticCurveTo(rootOriginX - 70, rootOriginY - 20, rootOriginX - 150, rootOriginY - 70);
      ctx.stroke();

      ctx.fillStyle = '#DC2626';
      [ {x: rootOriginX - 80, y: rootOriginY + 35}, {x: rootOriginX - 130, y: rootOriginY + 90} ].forEach(nd => {
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2.5;
      for (let f = 0; f < 8; f++) {
        ctx.beginPath();
        ctx.moveTo(rootOriginX, rootOriginY);
        ctx.quadraticCurveTo(rootOriginX - 80 - f * 8, rootOriginY + (f - 3.5) * 35, rootOriginX - 180, rootOriginY + (f - 3.5) * 45);
        ctx.stroke();
      }
    }

    const hydrationSpeed = Math.max(0.2, (Math.abs(psiSoil) < 1.0 ? 1.6 : 0.4));
    ctx.fillStyle = '#38BDF8';
    for (let p of this.particles.slice(0, 16)) {
      const rx = (p.x * 0.28 + t * hydrationSpeed * 22) % (soilW - 20);
      const ry = 50 + (p.y * 0.8) % (H - 70);
      ctx.beginPath();
      ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // SECTION 2: PLANT CANOPY & VASCULAR XYLEM (Center)
    const plantW = 310;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(soilW, 0, plantW, H);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1;
    ctx.strokeRect(soilW, 0, plantW, H);

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`${sp.icon} ${sp.name}`, soilW + 18, 26);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(isEn ? sp.commonName.en : sp.commonName.es, soilW + 18, 42);
    ctx.fillText(`P₅₀ = ${sp.p50} MPa | ${isEn ? 'Wilting' : 'Marchitez'} = ${sp.wiltingPsi} MPa`, soilW + 18, 56);

    const stemBaseX = soilW + 90;
    const stemBaseY = rootOriginY;
    const stemTopX = stemBaseX + (wiltingFactor * 25);
    const stemTopY = 90 + (wiltingFactor * 40);

    ctx.strokeStyle = sp.rootType === 'woody' ? '#78350F' : '#059669';
    ctx.lineWidth = sp.rootType === 'woody' ? 14 : 9;
    ctx.beginPath();
    ctx.moveTo(stemBaseX, stemBaseY);
    ctx.quadraticCurveTo(stemBaseX + (wiltingFactor * 20), (stemBaseY + stemTopY) / 2, stemTopX, stemTopY);
    ctx.stroke();

    const leafNodes = [
      { x: stemBaseX + 6, y: 155, dir: -1, len: 65 },
      { x: stemBaseX + 10, y: 130, dir: 1, len: 75 },
      { x: stemBaseX + 16, y: 105, dir: -1, len: 60 },
      { x: stemTopX, y: stemTopY, dir: 1, len: 50 }
    ];

    leafNodes.forEach((node, idx) => {
      ctx.fillStyle = leafColor;
      ctx.strokeStyle = leafStroke;
      ctx.lineWidth = 2;

      const baseAngle = (node.dir === 1 ? -0.3 : -2.8);
      const effectiveAngle = baseAngle + (node.dir * droopAngle);

      const tipX = node.x + Math.cos(effectiveAngle) * node.len;
      const tipY = node.y + Math.sin(effectiveAngle) * node.len + (wiltingFactor * 35);

      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.quadraticCurveTo((node.x + tipX) / 2, (node.y + tipY) / 2 - 12 + (wiltingFactor * 20), tipX, tipY);
      ctx.quadraticCurveTo((node.x + tipX) / 2, (node.y + tipY) / 2 + 12, node.x, node.y);
      ctx.fill();
      ctx.stroke();

      if (sp.aerenchymaBypass > 0 && Math.abs(psiSoil) < 1.0) {
        ctx.fillStyle = '#F59E0B';
        const ventX = tipX + Math.sin(t * 3 + idx) * 8;
        const ventY = tipY - (t * 20 + idx * 10) % 35;
        ctx.beginPath();
        ctx.arc(ventX, ventY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Zoom-in Inset: Internal Xylem Capillaries & Embolism Bubbles
    const insetX = soilW + 180;
    const insetY = 95;
    const insetW = 110;
    const insetH = 240;

    ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(insetX, insetY, insetW, insetH);
    ctx.strokeRect(insetX, insetY, insetW, insetH);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(isEn ? 'XYLEM LOUPE' : 'LUPA XILEMA', insetX + 12, insetY + 18);
    ctx.fillText(`PLC = ${plc.toFixed(0)}%`, insetX + 12, insetY + 32);

    [insetX + 25, insetX + 65].forEach((tx, cIdx) => {
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(tx, insetY + 45, 24, 175);

      const isCavitated = (cIdx === 1 && plc > 40) || plc > 75;
      ctx.fillStyle = isCavitated ? 'rgba(244, 63, 94, 0.3)' : 'rgba(56, 189, 248, 0.35)';
      ctx.fillRect(tx, insetY + 45, 24, 175);

      if (!isCavitated) {
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        const yOffset = (t * 40) % 25;
        for (let y = insetY + 50 + yOffset; y < insetY + 215; y += 25) {
          ctx.beginPath();
          ctx.moveTo(tx + 4, y);
          ctx.lineTo(tx + 20, y);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#F43F5E';
        const bY = insetY + 120 + Math.sin(t * 6 + cIdx) * 8;
        ctx.beginPath();
        ctx.arc(tx + 12, bY, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(isEn ? 'EMBOLISM' : 'EMBOLIA', tx - 3, bY + 16);
      }
    });

    // SECTION 3: ATMOSPHERE & STOMATAL MICROSCOPY (Right)
    const atmoX = soilW + plantW;
    const atmoW = W - atmoX;
    ctx.fillStyle = 'rgba(6, 78, 59, 0.3)';
    ctx.fillRect(atmoX, 0, atmoW, H);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.strokeRect(atmoX, 0, atmoW, H);

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(isEn ? 'ATMOSPHERE & STOMA' : 'ATMÓSFERA & ESTOMA', atmoX + 16, 26);
    ctx.fillText(`VPD = ${vpd.toFixed(1)} kPa | r_s = ${rStomata.toFixed(2)}`, atmoX + 16, 44);

    const stCx = atmoX + atmoW / 2;
    const stCy = 185;
    const stRadius = 65;

    ctx.fillStyle = '#070B14';
    ctx.strokeStyle = '#34D399';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(stCx, stCy, stRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const aperture = Math.max(3, (32 - rStomata * 11) * (1 - wiltingFactor * 0.75));

    ctx.fillStyle = '#059669';
    ctx.strokeStyle = '#34D399';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(stCx - aperture, stCy, 12, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(stCx + aperture, stCy, 12, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (aperture > 8 && plc < 85) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
      for (let m = 0; m < 15; m++) {
        const mx = stCx + ((m * 24 + t * 45) % (atmoW - 40));
        const my = stCy + Math.sin(t * 3.5 + m) * 35;
        if (mx > atmoX + 10) {
          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // 2. VAN GENUCHTEN SIMULATION
  drawVanGenuchtenSimulation(ctx, W, H) {
    const { suctionKpa, alpha, n, thetaS } = this.params;
    const sp = this.getCurrentSpecies();
    const isEn = this.isEn();
    const m = 1 - 1 / n;
    const hCm = suctionKpa * 10.197;
    const thetaR = 0.05;
    const theta = thetaR + (thetaS - thetaR) / Math.pow(1 + Math.pow(alpha * hCm, n), m);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, 420, H);
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 420, H);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(isEn ? 'POROUS MATRIX (MICRO-MENISCI)' : 'MATRIZ POROSA (MICRO-MENISCOS)', 20, 30);
    ctx.fillText(`θ = ${theta.toFixed(3)} cm³/cm³ | ${sp.name}`, 20, 50);

    const grains = [
      { x: 120, y: 150, r: 45 },
      { x: 280, y: 140, r: 52 },
      { x: 140, y: 290, r: 48 },
      { x: 300, y: 280, r: 55 }
    ];

    const filmR = Math.max(10, 80 * (theta / thetaS));
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.beginPath();
    ctx.arc(205, 215, filmR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(205, 215, filmR, 0, Math.PI * 2);
    ctx.stroke();

    grains.forEach(g => {
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.fillStyle = '#0B1120';
    ctx.fillRect(420, 0, 420, H);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.strokeRect(420, 0, 420, H);

    ctx.fillStyle = '#34D399';
    ctx.fillText(isEn ? 'RETENTION CURVE: θ(h) vs log|h|' : 'CURVA RETENCIÓN: θ(h) vs log|h|', 440, 30);

    const ox = 470;
    const oy = 330;
    const plotW = 340;
    const plotH = 260;

    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy - plotH);
    ctx.lineTo(ox, oy);
    ctx.lineTo(ox + plotW, oy);
    ctx.stroke();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let px = 0; px <= plotW; px += 4) {
      const logH = (px / plotW) * 4.5;
      const hVal = Math.pow(10, logH);
      const th = thetaR + (thetaS - thetaR) / Math.pow(1 + Math.pow(alpha * hVal, n), m);
      const py = oy - (th / thetaS) * (plotH - 20);
      if (px === 0) ctx.moveTo(ox + px, py);
      else ctx.lineTo(ox + px, py);
    }
    ctx.stroke();

    const currentLogH = Math.log10(Math.max(1, hCm));
    const dotX = ox + Math.min(plotW, (currentLogH / 4.5) * plotW);
    const dotY = oy - (theta / thetaS) * (plotH - 20);

    ctx.fillStyle = '#38BDF8';
    ctx.shadowColor = '#38BDF8';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px monospace';
    ctx.fillText('FC (33 kPa)', ox + (Math.log10(336) / 4.5) * plotW - 20, oy + 18);
    ctx.fillText('PWP (1500 kPa)', ox + (Math.log10(15000) / 4.5) * plotW - 30, oy + 18);
  }

  // 3. GREEN-AMPT INFILTRATION SIMULATION
  drawGreenAmptSimulation(ctx, W, H) {
    const { rainIntensity, ks, suctionHead, compaction } = this.params;
    const sp = this.getCurrentSpecies();
    const isEn = this.isEn();
    const t = this.simTime;
    const effectiveKs = ks * Math.max(0.1, (1.2 - compaction * 1.1));
    const wettingDepth = Math.min(220, 20 + t * effectiveKs * 0.8);
    const isPonding = rainIntensity > effectiveKs;

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, W, 90);

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    for (let p of this.particles) {
      const rx = p.x;
      const ry = (p.y + t * rainIntensity * 5) % 85;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 2, ry + 12);
      ctx.stroke();
    }

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`${isEn ? 'PRECIPITATION' : 'PRECIPITACIÓN'} = ${rainIntensity} mm/h | ${sp.name}`, 20, 30);
    ctx.fillText(`K_s = ${effectiveKs.toFixed(1)} mm/h | ${isEn ? 'Bulk Density' : 'Compactación'} ρ_b = ${compaction} g/cm³`, 20, 50);

    const surfaceY = 90;
    if (isPonding) {
      const pondH = Math.min(22, (rainIntensity - effectiveKs) * 0.4);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.fillRect(0, surfaceY - pondH, W, pondH);

      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      const arrowX = (t * 80) % W;
      ctx.beginPath();
      ctx.moveTo(arrowX, surfaceY - pondH / 2);
      ctx.lineTo(arrowX + 25, surfaceY - pondH / 2);
      ctx.lineTo(arrowX + 18, surfaceY - pondH / 2 - 5);
      ctx.moveTo(arrowX + 25, surfaceY - pondH / 2);
      ctx.lineTo(arrowX + 18, surfaceY - pondH / 2 + 5);
      ctx.stroke();
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(isEn ? 'SURFACE RUNOFF' : 'ESCORRENTÍA SUPERFICIAL', Math.min(W - 200, arrowX + 35), surfaceY - 8);
    }

    const soilH = H - surfaceY;
    ctx.fillStyle = 'rgba(14, 116, 144, 0.75)';
    ctx.fillRect(0, surfaceY, W, wettingDepth);

    ctx.fillStyle = 'rgba(51, 65, 85, 0.85)';
    ctx.fillRect(0, surfaceY + wettingDepth, W, soilH - wettingDepth);

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, surfaceY + wettingDepth);
    ctx.lineTo(W, surfaceY + wettingDepth);
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`${isEn ? 'WETTING FRONT' : 'FRENTE HÚMEDO'} L_f = ${(wettingDepth * 0.3).toFixed(1)} cm`, W - 250, surfaceY + wettingDepth - 8);

    if (compaction > 0.5) {
      const plowY = surfaceY + 65;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(0, plowY);
      ctx.lineTo(W, plowY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#F43F5E';
      ctx.fillText(isEn ? 'PLOW PAN (CRUSHED MACROPORES)' : 'PISO DE ARADO (MACROPOROS APLASTADOS)', 20, plowY - 8);
    }
  }

  // 4. REDOX LADDER & ENZYMIC LATCH SIMULATION
  drawRedoxSimulation(ctx, W, H) {
    const { wtdCm, tempC, phenolIndex, soilPh } = this.params;
    const sp = this.getCurrentSpecies();
    const isEn = this.isEn();
    const t = this.simTime;

    const waterY = 100 + ((-wtdCm) / 60) * 220;

    ctx.fillStyle = 'rgba(120, 53, 15, 0.55)';
    ctx.fillRect(0, 50, W, waterY - 50);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, waterY, W, H - waterY);

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, waterY);
    ctx.lineTo(W, waterY);
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(`${isEn ? 'WATER TABLE DEPTH' : 'NIVEL FREÁTICO'} WTD = ${wtdCm} cm | ${sp.name}`, 20, waterY - 8);

    if (wtdCm < -5) {
      ctx.fillStyle = '#34D399';
      for (let k = 0; k < 12; k++) {
        const cx = 50 + (k * 65 + t * 20) % (W - 100);
        const cy = 60 + ((k * 35 - t * 30) % (waterY - 70) + (waterY - 70)) % (waterY - 70);
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#34D399';
      ctx.fillText(isEn ? 'AEROBIC RESPIRATION (CO₂)' : 'RESPIRACIÓN AERÓBICA (CO₂)', W - 230, 75);
    }

    const baseEh = 420 - ((wtdCm + 60) / 70) * 650;
    if (baseEh < -100) {
      ctx.fillStyle = '#F59E0B';
      for (let b of this.bubbles) {
        const by = waterY + 30 + ((b.y - t * 40) % (H - waterY - 50) + (H - waterY - 50)) % (H - waterY - 50);
        ctx.beginPath();
        ctx.arc(b.x, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#F59E0B';
      ctx.fillText(isEn ? `CH₄ BYPASS CHIMNEY (Aerenchyma: ${sp.aerenchymaBypass}%)` : `CHIMENEA DE CH₄ (Aerénquima: ${sp.aerenchymaBypass}%)`, W - 320, H - 30);
    }

    if (phenolIndex > 50) {
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.fillRect(0, waterY, W, 40);
      ctx.strokeStyle = '#A855F7';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, waterY, W, 40);

      ctx.fillStyle = '#C084FC';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(isEn ? `🔒 PHENOLIC LATCH ACTIVE (${phenolIndex}%): Hydrolase Enzymes Blocked by ${sp.name}` : `🔒 FRENO FENÓLICO ACTIVO (${phenolIndex}%): Enzimas Bloqueadas por ${sp.name}`, 20, waterY + 25);
    }
  }
}
