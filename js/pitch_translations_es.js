/* ==========================================================================
   SPANISH TRANSLATIONS FOR SPEAKER PITCH & DEFENSE SCRIPT (31 SLIDES)
   Master Thesis Defense • Daniel S. Santander Urrutia • CAU Kiel
   ========================================================================== */

export const PITCH_TRANSLATIONS_ES = {

  "thesis_cover": {
    "title": "Apertura de la Defensa de Tesis & Bienvenida al Comité",
    "speech": "Estimados miembros del comité examinador, Prof. Komainda, Dr. Jordan, colegas e invitados: Bienvenidos a la defensa de tesis de maestría titulada 'Flujos de Carbono e Intercambio de Gases de Efecto Invernadero en Turberas en Transición del Norte de Alemania'.",
    "bullets": [],
    "defenseQ": "¿Cuál es la novedad fundamental de esta tesis? Unimos la mecánica profunda del suelo y la tensión de precompresión con el diagnóstico de flujos micrometeorológicos continuos."
  },
  "chambers_data": {
    "title": "Metano y Cámaras: El Hueco Faltante",
    "speech": "Tras analizar los flujos continuos de CO2, notamos que existía un hueco enorme respecto a los otros gases, en especial el metano. Para cubrir este gap, utilizamos cámaras estáticas. Sin embargo, hubiese sido mucho mejor un balance proporcional ponderado a diferentes cámaras, ya que hay algunas que, al estar ubicadas cerca de las trincheras, muestran una cantidad de emisiones tremendas y sesgan los resultados espaciales.",
    "bullets": [
      "Las cámaras cierran la brecha en las mediciones de emisiones discretas.",
      "Cámaras cerca de trincheras emiten drásticamente más."
    ],
    "defenseQ": "¿Por qué las cámaras en zanjas sobreestiman el metano? Porque capturan pulsos de ebullición no representativos de las llanuras adyacentes."
  },
  "gwp_explorer": {
    "title": "Balance de Gases a 20 y 100 Años (GWP)",
    "speech": "Observando el balance de Gases de Efecto Invernadero, vemos una diferencia visual notoria entre las gráficas de 20 y 100 años. Esto ocurre porque el potencial de calentamiento global (GWP) del metano es de ~28 en el horizonte de 100 años, pero salta drásticamente a ~84 en 20 años. Así, al multiplicar los mismos flujos de metano por factores distintos, el impacto del metano domina por completo la perspectiva a corto plazo.",
    "bullets": [
      "Metano GWP100: ~28",
      "Metano GWP20: ~84",
      "El mismo flujo de gas se vuelve visualmente dominante en el corto plazo."
    ],
    "defenseQ": "¿Por qué enfocarse en 20 años? Para capturar el impacto agudo y a corto plazo tras la re-inundación de la turbera, que frecuentemente activa picos de metano."
  }
,
  "slide_1_cover": {
    "title": "Apertura de la Defensa de Tesis & Bienvenida al Comité",
    "speech": "Estimados miembros del comité examinador, Prof. Komainda, Dr. Jordan, colegas e invitados: Bienvenidos a la defensa de tesis de maestría titulada 'Flujos de Carbono e Intercambio de Gases de Efecto Invernadero en Turberas en Transición del Norte de Alemania'. Aunque las turberas cubren únicamente el 3% de la superficie terrestre global, custodian más del 30% de todo el carbono orgánico edáfico del planeta. En Schleswig-Holstein, más del 90% de estos ecosistemas fueron drenados para la agricultura intensiva. Hoy, frente a las directivas de restauración climática que exigen su inundación, investigamos los compromisos biofísicos críticos: ¿cómo se alteran los balances de dióxido de carbono, metano y óxido nitroso al ascender el nivel freático sobre perfiles de turba degradada?",
    "bullets": [
      "Defensa académica en la Facultad de Ciencias Agrarias y Nutricionales de la Christian-Albrechts-Universität zu Kiel (CAU Kiel).",
      "Supervisores: Prof. Martin Komainda Ph.D. (Ciencia de Pastizales y Forrajes) y Sebastian Jordan Ph.D. (Investigador Asociado y Coordinador de Monitoreo de GEI, Proyecto Klimafarm).",
      "Sitio experimental: Observatorio de Turberas Klimafarm en Wallener Au (Schleswig-Holstein).",
      "Núcleo metodológico: Acoplamiento de Eddy Covariance de alta frecuencia (10 Hz), cámaras estáticas in situ y geomecánica de suelos en la transición drenado-inundado."
    ],
    "defenseQ": "¿Cuál es la novedad fundamental de esta tesis? Unimos la mecánica profunda del suelo y la tensión de precompresión con el diagnóstico de flujos micrometeorológicos continuos, demostrando que el legado físico del manejo agrícola gobierna la magnitud de las emisiones de gases de efecto invernadero tras la inundación."
  },
  "slide_2_agenda": {
    "title": "Hoja de Ruta Metodológica y Progresión de la Defensa (31 Diapositivas en 5 Partes)",
    "speech": "La defensa de hoy abarca 9 órdenes de magnitud organizados en cinco bloques temáticos: la Parte I establece el marco teórico, las hipótesis y la línea base ambiental (Diapositivas 1–10). La Parte II detalla la instrumentación de la torre micrometeorológica, el procesamiento a 10 Hz, el rendimiento empírico de control de calidad (Tablas 13a y 13b) y las cuatro esferas computacionales en R (Diapositivas 11–16). La Parte III aborda el diagnóstico de flujos, el cierre del balance de energía y la geomecánica del suelo (Diapositivas 17–22). La Parte IV analiza la sucesión biogeoquímica, la red de cámaras estáticas y la desconexión espacial (Diapositivas 23–29). Finalmente, la Parte V sintetiza el balance radiativo multidecenal a 20 y 100 años y las directrices agronómicas operativas (Diapositivas 30–31).",
    "bullets": [
      "Parte I: Marco Teórico y Línea Base Ambiental (Diapositivas 1–10)",
      "Parte II: Torre Micrometeorológica, Pipeline de 10 Hz y Esferas en R (Diapositivas 11–16)",
      "Parte III: Diagnóstico de Flujos y Geomecánica del Suelo (Diapositivas 17–22)",
      "Parte IV: Biogeoquímica, Transecto de Cámaras y Dinámica Multigas (Diapositivas 23–29)",
      "Parte V: Balance Radiativo Definitivo (20a vs 100a) y Política Agronómica (Diapositivas 30–31)"
    ],
    "defenseQ": "¿Cómo se enlazan estos niveles analíticos? Mediante un puente metodológico multiescala que abarca 9 órdenes de magnitud, desde la consolidación milimétrica del poro hasta el intercambio turbulento a escala de paisaje."
  },
  "slide_3_aims_hypotheses": {
    "title": "Objetivo General, Modelo Biogeoquímico (Fig. 20) y Tres Hipótesis de Trabajo",
    "speech": "Antes de examinar los datos empíricos, establecemos nuestro fundamento científico basado en el modelo conceptual de la Figura 20: 'Procesos Biogeoquímicos en Turberas'. El carbono ingresa mediante la fotosíntesis del dosel vegetal. En el acrotelmo drenado, el oxígeno atmosférico impulsa la respiración microbiana aeróbica, produciendo una continua pérdida de CO₂. Con la inundación, la anoxia desencadena una cascada donde bacterias fermentativas degradan la materia orgánica hacia acetato e H₂, que las arqueas metanogénicas reducen a metano (CH₄) bajo anoxia estricta (Eh < -200 mV). Aunque los metanótrofos en la franja capilar oxidan el CH₄ difusivo, las ciperáceas vasculares como Carex rostrata sortean este filtro mediante chimeneas de aerénquima. Con este modelo formulamos tres hipótesis comprobables: H1 (Pulso Biogeoquímico: la inundación desata un aumento agudo no lineal de CH₄), H2 (Memoria Mecánica del Suelo: la sobreconsolidación del piso de arado rompe el drenaje vertical) y H3 (Desconexión Espacial: las zanjas históricas actúan como chimeneas de ebullición diluidas por la torre).",
    "bullets": [
      "Modelo Conceptual (Fig. 20): Conecta fotosíntesis del dosel, mineralización aeróbica de CO₂, fermentación anaeróbica, metanogénesis (Eh < -200 mV) y transporte por aerénquima.",
      "Objetivo General: Cuantificar el intercambio continuo de CO₂, CH₄ y N₂O e identificar los controles biofísicos en la transición de inundación.",
      "H1 (Pulso Biogeoquímico): La reinundación inicial desata un pico agudo de CH₄ que supera la mitigación por cese de oxidación de turba.",
      "H2 (Memoria Mecánica): Décadas de compactación por maquinaria crearon un piso de arado (σp = 62.4 kPa) que genera la Paradoja Hidrológica.",
      "H3 (Desconexión Espacial): Las zanjas relictas actúan como chimeneas puntuales de ebullición cuyos flujos extremos son amortiguados en la huella de la torre."
    ],
    "defenseQ": "¿Cuál es la premisa que conecta la física del suelo con los flujos de GEI? La sobrecompactación colapsó de manera irreversible los macroporos gruesos, impidiendo el drenaje natural y forzando la transición microbiana de respiración aeróbica hacia fermentación metanogénica (Figura 20)."
  },
  "slide_4_climate_dilemma": {
    "title": "El Dilema de la Restauración: Ambición Climática vs. Realidad Biofísica",
    "speech": "Las hojas de ruta de neutralidad climática europea y alemana para 2045 confían enormemente en la inundación de turberas como sumideros naturales de carbono. No obstante, en turberas agrícolas en transición, esto plantea un severo dilema biogeoquímico: sumergir un estrato superficial con décadas de descomposición aeróbica, fertilización mineral y acumulación de carbono lábil ofrece un festín anóxico para fermentadores y metanógenos, disparando un pulso agudo de metano que puede acelerar paradójicamente el forzamiento radiativo a corto plazo.",
    "bullets": [
      "Las turberas drenadas en el norte de Alemania emiten entre 20 y 30 t CO₂-eq ha⁻¹ año⁻¹ por subsidencia oxidativa.",
      "La inundación frena el CO₂, pero los picos agudos de CH₄ comprometen las metas climáticas a 20 años.",
      "Imperativo crítico: Determinar si la inundación actúa como sumidero neto inmediato o como emisor radiativo agudo."
    ],
    "defenseQ": "¿Por qué es crucial el horizonte temporal a 20 años? Porque el metano posee un GWP20 de 84, lo que implica que un pulso inicial ejerce un calentamiento frontal crítico durante las décadas decisivas hacia el 2045."
  },
  "slide_5_baseline_drainage": {
    "title": "Línea Base Agrícola: Legado Mecánico y Oxidativo de Décadas de Drenaje",
    "speech": "Durante más de medio siglo, los humedales de Wallener Au fueron drenados mediante tuberías subterráneas y zanjas abiertas para permitir el pastoreo lechero y ensilaje. El drenaje redujo el nivel freático medio estival a entre -45 y -60 cm. Esta aeración continua indujo respiración heterótrofa acelerada, mineralización de la turba milenaria y subsidencia vertical progresiva de 1 a 2 cm anuales.",
    "bullets": [
      "Drenaje sistemático que sostuvo niveles freáticos artificiales a entre -45 y -60 cm.",
      "La respiración microbiana aeróbica impulsó pérdidas continuas de CO₂ y subsidencia del suelo.",
      "El tránsito reiterado de tractores aplicó tensiones compresivas muy superiores a la capacidad de carga de la turba prístina."
    ],
    "defenseQ": "¿Cómo altera el drenaje la microestructura de la turba? La oxidación disuelve la matriz fibrosa original, generando una turba superficial amorfa, pulverulenta y altamente susceptible al colapso estructural."
  },
  "slide_6_stratigraphy": {
    "title": "Arquitectura Estratigráfica del Perfil: Acrotelmo, Piso de Arado y Catotelmo",
    "speech": "Los sondeos de suelo y el perfilado geofísico revelan una estratigrafía tripartita nítida: Primero, un acrotelmo oxigenado (0 a -15 cm) de turba amorfa y degradada. Segundo, un piso de arado agrícola (Pflughorizont) fuertemente compactado entre -15 y -30 cm con destrucción total de macroporos. Tercero, un catotelmo subyacente hasta -120 cm de turba de cañaveral saturada, poco humificada y anóxica.",
    "bullets": [
      "Acrotelmo (0 a -15 cm): Suelo oxidado con alta densidad aparente (0.45 g/cm³).",
      "Piso de arado (-15 a -30 cm): Capa limítrofe sobreconsolidada generada por maquinaria pesada.",
      "Catotelmo (-30 a -120 cm): Turba profunda saturada de agua con porosidad superior al 85%."
    ],
    "defenseQ": "¿Por qué es tan trascendente el piso de arado? Porque actúa como un estrato de estrangulamiento hidráulico que restringe la percolación vertical de agua y el intercambio de gases entre superficie y profundidad."
  },
  "slide_7_regional_climate": {
    "title": "Macroclima Regional: Diagnósticos Walter-Lieth y DWD",
    "speech": "El contexto meteorológico de Schleswig-Holstein presenta un régimen templado oceánico, pero con una fuerte dinámica estival. Analizando las series históricas de 30 años del DWD junto a nuestro diagrama Walter-Lieth, identificamos 850 mm de precipitación anual y 9.2 °C de media. Sin embargo, en verano, la radiación solar eleva fuertemente la temperatura, cuadruplicando la presión de saturación atmosférica (es) por la relación de Clausius-Clapeyron. Cuando se instalan bloqueos anticiclónicos con viento del este, la advección de aire continental seco dispara el déficit de presión de vapor (VPD > 1.5–2.0 kPa), imponiendo una severa sequía atmosférica sobre el humedal.",
    "bullets": [
      "Línea base regional DWD: Media anual de 9.2 °C y 850 mm de precipitación.",
      "Anomalía 2024: Invierno húmedo (+2.4 °C sobre lo normal) seguido de intensas olas de evaporación estival.",
      "Escalamiento de Clausius-Clapeyron: La mayor temperatura cuadruplicó la demanda evaporativa del aire.",
      "El análisis Walter-Lieth identifica ventanas de estrés semiárido pese a tener agua subterránea superficial."
    ],
    "defenseQ": "¿Por qué importa una sequía atmosférica en una turbera inundada? Porque el alto VPD induce un cierre estomático defensivo en las plantas, desacoplando la asimilación fotosintética (GPP) de la radiación solar disponible."
  },
  "slide_8_satellite_context": {
    "title": "Contexto Satelital de Alta Resolución y Perímetro Experimental",
    "speech": "Mediante ortofotos Esri World Imagery de 2400 píxeles y pasadas multiespectrales de Sentinel-2 a 10 metros, cartografiamos la parcela experimental de 12 hectáreas en Wallener Au. La escena delimita la torre central de Eddy Covariance, la red de zanjas agrícolas históricas y la heterogeneidad del dosel vegetal, desde pastizales drenados de Lolium perenne hasta comunidades palustres colonizadoras (Carex rostrata y Phalaris arundinacea).",
    "bullets": [
      "Parcela experimental de 12 hectáreas cercada por canales de drenaje perimetrales.",
      "Bandas de 10m de Sentinel-2 permiten el seguimiento continuo de la fenología (NDVI).",
      "La fidelidad espacial asegura que las cámaras de gas y la torre micrometeorológica capturen zonas ecológicamente representativas."
    ],
    "defenseQ": "¿Afectó la heterogeneidad del dosel a las mediciones? No, el modelado de la huella aerodinámica confirmó que el campo visual de la torre integra equilibradamente la mezcla representativa de pastos y ciperáceas."
  },
  "slide_9_footprint_2d": {
    "title": "La Huella de Flujo Turbulento 2D (Parametrización Kljun et al., 2015)",
    "speech": "Para asegurar que los flujos turbulentos medidos correspondan genuinamente al área en restauración, aplicamos el modelo de huella bidimensional de Kljun et al. (2015). Bajo vientos dominantes del suroeste (190°–240°), el área fuente acumulada del 70% y 80% se ubica estrictamente entre 120 y 250 metros de la torre. Más del 92% de los intervalos de 30 minutos provienen íntegramente del interior del perímetro restaurado, excluyendo perturbaciones advectivas externas.",
    "bullets": [
      "Huella de flujo 2D calculada con el algoritmo de gradiente rápido de Kljun et al. (2015).",
      "Sector dominante (SW 190°–240°) alineado con la máxima longitud de fetch homogéneo.",
      "El 80% de la huella acumulada queda restringido a 120–250 m, dentro del humedal.",
      "Más del 92% de los datos procesados representan exclusivamente la turbera bajo estudio."
    ],
    "defenseQ": "¿Qué se hizo con vientos de sectores no deseados? Los periodos con direcciones de viento ajenas o con distancias de huella pico fuera del perímetro se filtraron y descartaron rigurosamente durante el control de calidad."
  },
  "slide_10_multiscale_bridge": {
    "title": "Puente Metodológico Multiescala: Del Poro de Turba (μm) al Satélite (km)",
    "speech": "Una fortaleza metodológica capital de esta tesis es el enlace multiescala que abarca nueve órdenes de magnitud: desde los poros microscópicos en ensayos edométricos (10⁻⁶ m) que miden la conductividad neumática, pasando por cámaras manuales in situ (1 m) que resuelven los puntos calientes de ebullición en zanjas, hasta la torre de Eddy Covariance (10² m) que cuantifica el intercambio turbulento a 10 Hz, y los modelos satelitales Sentinel-2 y DEM regionales (10³ m).",
    "bullets": [
      "Microescala (μm): Geometría porosa, densidad aparente seca y tensión de precompresión.",
      "Mesoescala (m): Cámaras estáticas cerradas captando ebullición en zanjas de drenaje.",
      "Macroescala (100 m a km): Huella turbulenta de Eddy Covariance, relieve DEM y fenología Sentinel-2.",
      "Evita el riesgo común de extrapolaciones espaciales no calibradas empíricamente."
    ],
    "defenseQ": "¿Por qué no basta con una sola técnica de medición? La torre promedia espacialmente y diluye la intensa ebullición localizada en zanjas, mientras que las cámaras carecen de la continuidad temporal diaria y nocturna de los analizadores de torre."
  },
  "slide_11_tower_instrumentation": {
    "title": "Instrumentación de Torre Eddy Covariance: Sensores de Alta Frecuencia",
    "speech": "El intercambio turbulento continuo a escala ecosistémica se cuantificó con un mástil micrometeorológico de 3.5 m en Wallener Au (54.2807° N, 9.2586° E). El conjunto de sensores acopla un anemómetro ultrasónico 3D Campbell Scientific / Gill CSAT3 (registrando vectores de viento u, v, w y temperatura acústica virtual Ts a 10 Hz con resolución de 1 mm/s) con dos analizadores de gas infrarrojos abiertos: un LI-COR LI-7500DS para fluctuaciones turbulentas de CO₂ y vapor de agua (H₂O), y un espectrómetro láser de modulación por longitud de onda LI-COR LI-7700 para CH₄ a 10 Hz. La óptica abierta elimina los retrasos y atenuaciones en mangueras de succión, montada con una inclinación de 15° al sur para evitar empozamiento de gotas y minimizar la estela del mástil. El instrumental de apoyo incluye un radiómetro neto CNR4 Kipp & Zonen y sensores edáficos multinivel.",
    "bullets": [
      "Anemómetro Ultrasónico CSAT3: Velocidad tridimensional (u, v, w) y temperatura sónica a 10 Hz con precisión de 1 mm/s.",
      "Analizador Open-Path LI-7500DS: Detección NDIR de CO₂ y vapor de agua libre de efectos de pared de manguera.",
      "Espectrómetro Láser LI-7700: Celda multipaso abierta Herriott para medición continua de metano (CH₄) a 10 Hz.",
      "Brazo Inclinado a 15° Sur: Drena gotas de lluvia y previene la distorsión aerodinámica inducida por el mástil.",
      "Torre Biomet Complementaria: Balance radiativo de 4 componentes (CNR4), flujo de calor en suelo (HFP01) y perfiles térmicos."
    ],
    "defenseQ": "¿Por qué se prefirieron sensores de celda abierta frente a celda cerrada? Porque evitan la fuerte atenuación espectral y adsorción de vapor en mangueras largas, no requieren bombas de succión de alto consumo eléctrico y permiten medir metano a alta frecuencia sin distorsiones de transporte en un humedal remoto."
  },
  "slide_12_ec_pipeline_qc": {
    "title": "Pipeline Micrometeorológico de Alta Frecuencia (10 Hz): EddyPro 7.0 y Filtrado de Calidad",
    "speech": "Procesar más de 14,000 archivos binarios crudos a 10 Hz para obtener flujos defensivos de 30 minutos demanda un riguroso esquema matemático ejecutado en EddyPro 7.0 (Figura 50). Las series crudas son despicadas mediante el umbral estadístico de Vickers & Mahrt (1997). Aplicamos una rotación planar fit 2D sobre los sectores de viento dominante (190°–240°) para anular la velocidad vertical media (w = 0) y suprimir desalineaciones del mástil. Posteriormente, la corrección de densidad del aire de Webb-Pearman-Leuning (WPL) compensa las fluctuaciones de calor sensible y latente que alteran la densidad del gas en la trayectoria óptica abierta. Las pérdidas espectrales por separación de sensores se corrigen con Horst (1997). Finalmente, cada flujo de 30 minutos recibe una bandera ICOS 0-1-2 según pruebas de estacionariedad y turbulencia desarrollada (Mauder & Foken, 2004).",
    "bullets": [
      "Despicado a 10 Hz: Algoritmo de Vickers & Mahrt (1997) para suprimir ruido electrónico e interferencias por lluvia.",
      "Rotación Planar Fit 2D: Alinea el plano de coordenadas con el flujo medio, forzando w = 0 y corrigiendo inclinaciones.",
      "Corrección WPL: Ajusta las fluctuaciones de concentración por variaciones simultáneas de temperatura y vapor en el aire.",
      "Atenuación Espectral: Corrección analítica de Horst (1997) para separación espacial entre anemómetro y analizadores.",
      "Banderas de Calidad ICOS 0-1-2: 0 (óptimo para parametrizar modelos), 1 (retenido para balances anuales), 2 (descartado)."
    ],
    "defenseQ": "¿Qué representa físicamente la corrección WPL en analizadores abiertos? Dado que la columna abierta de aire se calienta o humedece, la dilatación térmica crea variaciones aparentes de densidad en el gas aun cuando la relación de mezcla sea invariable. WPL elimina matemáticamente este artefacto térmico."
  },
  "slide_13_qc_tables": {
    "title": "Rendimiento Empírico de Control de Calidad: Tablas 13a (CO₂) y 13b (CH₄)",
    "speech": "En las Tablas 13a y 13b (extraídas directamente de 07_lmd_cl_gap_filling_ML.csv), cuantificamos la recuperación empírica de datos a lo largo de 15,014 intervalos de 30 minutos. Para el CO₂ (Tabla 13a), se retiene el 79.6% de los datos (58.0% clase QC 0 estricta y 21.6% QC 1 retenida para balance anual), descartándose sólo un 11.5% por turbulencia insuficiente (QC 2) y un 8.9% por fallas de sensor. En marcado contraste, la Tabla 13b revela la compleja realidad operativa del metano: la retención de CH₄ se reduce a 55.4% (36.3% QC 0 y 19.1% QC 1), descartándose un 8.1% (QC 2) y perdiéndose un 36.5% por desconexión del sensor. Esta disimetría subsana el error de la versión preliminar de la tesis donde se había duplicado la tabla de CO₂ para el metano, confirmando que la óptica del LI-7700 exige un filtrado estricto ante rocío y escarcha.",
    "bullets": [
      "Tabla 13a (CO₂ Intercambio Neto): Retención del 79.6% (58.0% QC 0 y 21.6% QC 1), con un flujo medio de +0.06 µmol m⁻² s⁻¹.",
      "Tabla 13b (CH₄ Metano): Retención del 55.4% (36.3% QC 0 y 19.1% QC 1), con flujo medio de 13.51 nmol m⁻² s⁻¹.",
      "Asimetría de Datos Faltantes: Solo 8.9% para CO₂ frente a 36.5% para CH₄ debido a condensación y escarcha en los espejos del LI-7700.",
      "Rigor Defensivo: Corrige formalmente la duplicación accidental de la tabla de CO₂ presente en el borrador previo."
    ],
    "defenseQ": "¿Por qué el metano tuvo un 36.5% de datos perdidos frente al 8.9% del CO₂? Porque el LI-7700 cuenta con una celda multipaso abierta cuyos espejos pierden reflectividad con la densa niebla matutina del Mar del Norte y la escarcha invernal (RSSI < 10%), activando el rechazo automático de la señal."
  },
  "slide_14_r_spheres_workflows": {
    "title": "Arquitectura Computacional y Flujos de Trabajo: Las 4 Esferas en R",
    "speech": "El núcleo analítico de Wallener Au se estructura en cuatro esferas reproducibles programadas en R, codificadas mediante diagramas de flujo de trabajo: la Esfera 1 (Figuras 50 y 52) ejecuta el procesamiento crudo en EddyPro, las rotaciones planar fit y el control de calidad biometeorológico contra las estaciones del DWD. La Esfera 2 (Figura 63) gestiona el escalamiento espacial desde los collares de cámara hasta la huella continua de la torre, calculando el balance multidecenal de GWP. La Esfera 3 incorpora la mecánica de suelos y la permeabilidad al aire (Figura 57, Ka < 0.8 µm² en el piso de arado). Finalmente, la Esfera 4 (Figura 62) gobierna los conmutadores bioclimáticos modulares (Walter-Lieth 2024 vs. NASA POWER) y los ensambles de Machine Learning para el gap-filling. Esto garantiza trazabilidad matemática total desde los archivos binarios hasta las figuras finales.",
    "bullets": [
      "Esfera 1 (Figuras 50 y 52): Ingesta a 10 Hz, corridas en lote de EddyPro, corrección WPL y validación con la red DWD.",
      "Esfera 2 (Figura 63): Escalamiento espacial, geometría de collares (16 a 42 cm) y propagación de errores multigas (SE_Net).",
      "Esfera 3 (Figura 57): Curvas edométricas de consolidación (σp = 62.4 kPa) y pruebas de conductividad neumática.",
      "Esfera 4 (Figura 62): Conmutación climática modular (Walter-Lieth 2024 vs NASA POWER) y ensambles de Machine Learning."
    ],
    "defenseQ": "¿Cómo previene sesgos analíticos esta arquitectura de 4 esferas? Al desacoplar el procesamiento micrometeorológico del escalamiento de cámaras y de la geomecánica, cada componente se valida y parametriza de forma independiente antes de la síntesis radiativa acoplada."
  },
  "slide_15_gapfilling": {
    "title": "Gap-Filling de Metano: Inteligencia Artificial (Redes Neuronales y Random Forest)",
    "speech": "Una distinción metodológica crucial radica en el papel del Machine Learning entre los distintos gases. Para el CO₂, el método estándar Marginal Distribution Sampling (MDS) de REddyProc es el referente. No obstante, como ilustran la Figura 62 y la Figura 07b ('Comparación de Modelos NEE'), entrenamos Redes Neuronales Artificiales (ANN) y Random Forest (RF) como regresores de referencia comparativa para cuantificar la incertidumbre estructural del modelo bajo no-linealidades atmosféricas. En cambio, para el CH₄ el método MDS falla completamente porque las emisiones de metano están desacopladas de la luz e impulsadas por ebullición hidrostática episódica y temperatura profunda. Por ello, las ANN y Random Forest se convierten en el motor predictivo insustituible para el CH₄, evitando sesgos sistemáticos en el balance de carbono anual.",
    "bullets": [
      "Referente MDS para CO₂: Tablas de muestreo condicional estándar de REddyProc que capturan regímenes de luz y temperatura.",
      "Machine Learning Comparativo (Fig. 62 y 07b): ANN y Random Forest evaluados contra MDS para acotar incertidumbres estructurales.",
      "Motor Predictivo para CH₄: La ebullición estocástica exige perceptrones multicapa entrenados con variables edáficas profundas (5, 20, 50 cm) y freáticas.",
      "Protección del Balance Anual: El gap-filling por IA previene una subestimación del 25–40% en las emisiones de metano invernales durante desconexiones por helada."
    ],
    "defenseQ": "¿Por qué la Figura 62 muestra Random Forest y Redes Neuronales en CO₂ si se usa MDS? Porque desplegamos un benchmark multimodelo integral (Figura 07b) para demostrar que el MDS estándar no introduce sesgos frente a regresores no lineales avanzados."
  },
  "slide_16_partitioning": {
    "title": "Partición de Flujos: Desacoplamiento de NEE en GPP y Reco (Lloyd-Taylor y Michaelis-Menten)",
    "speech": "El Intercambio Neto del Ecosistema se separó en Productividad Primaria Bruta (GPP) y Respiración Ecosistémica (Reco) mediante formulaciones no lineales complementarias. En la Figura 71, los flujos nocturnos bajo turbulencia desarrollada (u* ≥ 0.12 m/s) parametrizan la función de Arrhenius de Lloyd-Taylor (1994) contra la temperatura del suelo a 5 cm (R² = 0.88). En la Figura 72, la asimilación diurna se aísla mediante curvas hiperbólicas rectangulares de Michaelis-Menten frente a la radiación fotosintéticamente activa (PAR). Al analizar la Figura 76 ('Comparación de Balances Diarios de Carbono'), observamos momentos donde los datos observados divergen notablemente de las curvas modeladas: durante la sequía estival, el corte capilar del piso de arado frena el GPP mientras el calentamiento superficial dispara la respiración, transformando el humedal en una fuente transitoria de CO₂.",
    "bullets": [
      "Figura 71 (Ajustes Lloyd-Taylor Reco): Energía de activación dependiente de la temperatura a u* ≥ 0.12 m/s.",
      "Figura 72 (Ajustes Michaelis-Menten GPP): Curva de saturación lumínica que extrae la asimilación máxima (GPP_max ~ 14.2 g C m⁻² d⁻¹).",
      "Figura 76 (Presupuestos Diarios de Carbono): Muestra la divergencia entre NEE observado y modelado durante sequías y cortes de forraje.",
      "Conservación de Masa: Verificada a lo largo de los 15,014 periodos garantizando NEE = Reco - GPP."
    ],
    "defenseQ": "¿Por qué divergen los datos diarios observados frente al modelo en la Figura 76? Porque los cortes de pasto eliminan instantáneamente el dosel asimilador y las sequías estivales provocan un cierre estomático brusco que las curvas estáticas no capturan."
  },
  "slide_17_energy_balance_closure": {
    "title": "Calidad Micrometeorológica y Cierre del Balance de Energía (Pendiente = 0.85, R² = 0.94)",
    "speech": "La prueba de fuego de cualquier torre de Eddy Covariance es el cierre del balance de energía superficial (Figura 13): graficamos la energía disponible en X (radiación neta Rn menos flujo de calor en el suelo G) frente a los flujos turbulentos en Y (calor sensible H más calor latente LE). La regresión lineal empírica arroja: (LE + H) = 0.85 · (Rn - G) + 12.52 W/m² con R² = 0.94. Un 85% de recuperación sitúa a Wallener Au en el decil superior de los humedales templados de FLUXNET e ICOS (que usualmente promedian 70–80%). El déficit del 15% no se debe a fallas de sensores, sino al almacenamiento térmico no medido en la lámina de agua y el acrotelmo poroso (S), así como a vórtices de baja frecuencia que exceden los 30 minutos. Esto certifica una excelente nivelación de sensores, homogeneidad del fetch y consistencia aerodinámica para los balances de gas.",
    "bullets": [
      "Lectura de la Figura 13: Eje X = Energía disponible (Rn - G); Eje Y = Flujos turbulentos (LE + H) en W/m².",
      "Ecuación OLS empírica: (LE + H) = 0.85 · (Rn - G) + 12.52 W/m² con R² = 0.94.",
      "La línea punteada cian marca la conservación teórica 1:1.",
      "El déficit del 15% se explica por almacenamiento térmico en agua superficial y acrotelmo (S) y mesovórtices.",
      "Intercepto positivo (+12.52 W/m²): Liberación nocturna de calor desde la masa de turba hacia la atmósfera fría.",
      "Validación de oro: Garantiza que no existen sesgos aerodinámicos sistemáticos en las mediciones de flujos gaseosos."
    ],
    "defenseQ": "¿Por qué un 85% de cierre se considera un estándar de excelencia en humedales si la termodinámica exige el 100%? Porque la turba saturada posee una capacidad calorífica volumétrica inmensa; las placas de calor a 5 cm omiten el rápido almacenamiento de calor en los primeros centímetros de musgos saturados y agua somera. La literatura global establece que un 85% con R² = 0.94 confirma la ausencia de sesgos aerodinámicos sistemáticos."
  },
  "slide_18_bowen_ratio": {
    "title": "Razón de Bowen Termodinámica y Eficiencia en el Uso del Agua (Fig. 16 y Fig. 14)",
    "speech": "Las Figuras 16 y 14 cuantifican la partición de energía y la eficiencia ecosistémica en el uso del agua durante 2024. En la Figura 16, la razón de Bowen (β = H / LE) ratifica que Wallener Au es un humedal dominado por la evaporación: en la estación vegetativa activa (abril a septiembre), la curva suavizada se mantiene entre 0.10 y 0.25, muy por debajo de la línea de equilibrio 1.0 (punteada), derivando más del 80% de la energía neta disponible hacia la disipación por calor latente (LE). En invierno (ene–feb), β se vuelve negativa (-1.0 a -1.5) por inversiones térmicas donde el calor sensible viaja hacia la superficie fría de la turba. Paralelamente, la Figura 14 sigue la eficiencia en el uso del agua (eWUE = GPP / ET, en gC m⁻² mm⁻¹): alcanza su óptimo en mayo–junio (pico de 3.2 gC/mm) con estomas abiertos y bajo VPD, pero experimenta una caída estival (2.3–2.5 gC/mm) en julio–agosto debido a la alta demanda evaporativa del aire y la restricción estomática.",
    "bullets": [
      "Figura 16 (Razón de Bowen): Línea base estival entre 0.10 y 0.25 (<< 1.0), canalizando >80% de radiación a calor latente (LE).",
      "Inversión Térmica Invernal: β negativa (-1.0 a -1.5) debida al flujo de calor sensible descendente hacia la turba fría.",
      "Figura 14 (eWUE = GPP / ET): Máxima eficiencia asimilativa en mayo–junio (~3.2 gC m⁻² mm⁻¹) bajo clima templado y bajo VPD.",
      "Penalización Estival de eWUE (2.3–2.5 gC/mm): La sequía atmosférica dispara la transpiración mientras el cierre estomático reduce el GPP.",
      "Picos Aislados de Bowen (β > 0.85): Eventos secos estivales que cortan el ascenso capilar derivan energía a calor sensible (H)."
    ],
    "defenseQ": "¿Cómo se vinculan biofísicamente la razón de Bowen y la eWUE? Son dos caras de la misma dinámica ecohidrológica: una baja razón de Bowen demuestra que la energía se disipa evaporando agua, mientras que la eWUE mide cuánto carbono se asimila por milímetro evaporado. El alto VPD veraniego deprime la eWUE y genera picos en la razón de Bowen al cerrarse los estomas."
  },
  "slide_19_stomatal_vpd": {
    "title": "Regulación Estomática y Sequía Atmosférica (Compromiso GPP vs. VPD)",
    "speech": "La Figura 15 evalúa la respuesta de la productividad primaria bruta (GPP, en gC m⁻² d⁻¹) ante el déficit de presión de vapor atmosférico (VPD, en hPa donde 10 hPa = 1.0 kPa). La curva empírica delimita tres regímenes fisiológicos: primero, un ascenso lineal entre 0 y 4.5 hPa impulsado por la apertura estomática matutina con la luz solar; segundo, una meseta de saturación abrupta a los 5.0 hPa (0.5 kPa) que estabiliza el GPP en torno a 7.5 gC m⁻² d⁻¹; y tercero, un desacoplamiento asintótico por encima de 5 a 10 hPa. Pese al pico de radiación del mediodía, el GPP no logra aumentar porque las macrófitas vasculares cierran estomas para proteger sus márgenes de seguridad hidráulica, desacoplando la fijación de carbono de la radiación disponible.",
    "bullets": [
      "Lectura de la Figura 15: Eje X en hPa (10 hPa = 1.0 kPa) frente a la asimilación diaria de carbono GPP (gC m⁻² d⁻¹).",
      "Fase 1 (0 a 4.5 hPa): Rápido incremento fotosintético lineal por apertura estomática matutina con luz solar.",
      "Fase 2 (Meseta a 5.0 hPa / 0.5 kPa): Saturación fotosintética estabilizada en ~7.5 gC m⁻² d⁻¹.",
      "Fase 3 (>5 a 10 hPa / >0.5–1.0 kPa): El estrangulamiento estomático bajo sequía atmosférica frena la asimilación.",
      "Desacopla la humedad del suelo de la demanda evaporativa atmosférica durante episodios de calor."
    ],
    "defenseQ": "¿Por qué el GPP se estanca a solo 5.0 hPa si la radiación solar máxima es al mediodía? Porque la demanda evaporativa del aire supera la capacidad de transporte xilemático de la vegetación; para evitar la cavitación, las plantas restringen la conductancia estomática, impidiendo la entrada de CO₂ a la rubisco."
  },
  "slide_20_precompression": {
    "title": "Memoria Mecánica del Suelo: Tensión de Precompresión (σp = 62 kPa) y Ensayos Edométricos",
    "speech": "En la literatura de restauración, la turba suele concebirse como una esponja homogénea. Sin embargo, nuestros ensayos de consolidación edométrica 1D en la Universidad de Kiel demuestran que décadas de maquinaria pesada dejaron una 'memoria mecánica' permanente en la matriz. El piso de arado (-15 a -30 cm) muestra una tensión de precompresión de σp = 62.4 kPa, valor que refleja la máxima carga histórica aplicada por tractores agrícolas.",
    "bullets": [
      "Ensayos edométricos 1D cuantifican la tensión de precompresión (σp = 62.4 kPa) mediante el criterio de Casagrande.",
      "El índice de re-compresión (Cr = 0.045) evidencia un comportamiento sobreconsolidado y rígido bajo 60 kPa.",
      "El índice de compresión (Cc = 0.38) advierte un colapso estructural si las cargas superan σp.",
      "Confirma que el piso de arado es una estructura antrópica generada por compactación agrícola."
    ],
    "defenseQ": "¿Por qué importa la precompresión si ya no se ara el campo? Porque al inundar la turba, la presión de poros aumenta y la tensión efectiva disminuye. Si ingresa maquinaria de cosecha (paludicultura), superar σp inducirá cizallamiento plástico y pérdida total de transitabilidad."
  },
  "slide_21_hydrological_paradox": {
    "title": "El Piso de Arado Agrícola y la Paradoja Hidrológica",
    "speech": "Este piso de arado sobreconsolidado desencadena la 'Paradoja Hidrológica'. Al colapsar la conductividad hidráulica saturada vertical (Ks < 1.2 cm/día en el horizonte de arado), las lluvias no pueden infiltrar hacia el catotelmo profundo, estancándose en los primeros 10 cm. En contraste, durante el verano seco, el colapso de macroporos corta el ascenso capilar desde el nivel freático, provocando la desecación acelerada del acrotelmo mientras el subsuelo sigue saturado.",
    "bullets": [
      "El piso de arado actúa como un estrangulador hidráulico (Ks reducida en más de dos órdenes de magnitud).",
      "Paradoja húmeda: Encharcamiento superficial pese a que el nivel freático profundo está descendido.",
      "Paradoja seca: Ascenso capilar quebrado que expone las raíces a estrés hídrico extremo.",
      "Desestabiliza la vegetación e interfiere con la sucesión ecológica esperada en el humedal."
    ],
    "defenseQ": "¿Se puede descompactar mecánicamente el suelo para mejorar el drenaje? El subsolado profundo en turbas saturadas es peligroso: destruye la cohesión radicular remanente y convierte la matriz orgánica en un lodo inestable sin restaurar los macroporos biogénicos funcionales."
  },
  "slide_22_porosity_bulk_density": {
    "title": "Desconexión Física Subsuperficial: Inversión de Porosidad y Permeabilidad de Aire",
    "speech": "El análisis físico en testigos a diferentes profundidades exhibe una marcada inversión de propiedades. La densidad aparente seca alcanza un pico anómalo de 0.72 g/cm³ en el piso de arado (frente a 0.18 g/cm³ en turberas prístinas), mientras la porosidad cae del 88% al 61%. Los macroporos gruesos (>50 µm) se reducen a menos del 6%, desplomando la permeabilidad al aire (Ka a -60 hPa) por debajo de 0.8 µm². Esta barrera física atrapa los gases biogénicos bajo el estrato compactado.",
    "bullets": [
      "Densidad aparente máxima de 0.72 g/cm³ en el horizonte de arado (-15 a -30 cm).",
      "Los macroporos (>50 µm) se reducen del 22% prístino a menos del 6% en el piso de arado.",
      "La permeabilidad al aire (Ka a -60 hPa) cae bajo 0.8 µm², generando un severo cuello de botella.",
      "El metano y CO₂ se acumulan en profundidad hasta superar los umbrales de presión para ebullir."
    ],
    "defenseQ": "¿Cómo altera este colapso poroso la emisión de metano? El metano no puede difundirse gradualmente; se acumula bajo presión hasta que una baja barométrica o cambio freático detona eventos súbitos de ebullición violenta."
  },
  "slide_23_ecohydrological_switch": {
    "title": "El Conmutador Ecohidrológico: Dinámica del Nivel Freático e Inversión Redox",
    "speech": "Cuando las compuertas de manejo elevan el nivel freático por encima de -15 cm, el ecosistema cruza un punto de inflexión ecohidrológico. El suelo saturado agota el oxígeno disuelto en pocas horas. El potencial redox (Eh) se desploma desde valores oxidantes (+450 mV) a través de etapas sucesivas de reducción: nitratos (+250 mV), hierro/manganeso (+100 a -100 mV), sulfatos (-150 mV) y, finalmente, alcanza el umbral de metanogénesis estricta por debajo de -200 mV.",
    "bullets": [
      "Nivel freático por encima de -15 cm corta la difusión de O₂ atmosférico en el suelo.",
      "Rápida cascada redox: Oxígeno disuelto consumido en un lapso de 12 a 24 horas.",
      "Reducción secuencial de aceptores terminales de electrones (NO₃⁻ ➔ Fe³⁺/Mn⁴⁺ ➔ SO₄²⁻ ➔ CO₂).",
      "Potencial redox cae bajo -200 mV, despertando a los consorcios arqueanos metanogénicos."
    ],
    "defenseQ": "¿Por qué la metanogénesis requiere un Eh inferior a -200 mV? Porque las enzimas clave (metil-coenzima M reductasa) se desnaturalizan irreversiblemente con oxígeno y son superadas termodinámicamente por aceptores con mayor rendimiento de energía libre de Gibbs."
  },
  "slide_24_biogeochemical_flip": {
    "title": "El 'Flip' Biogeoquímico: Supresión de CO₂ y Liberación Aguda de Metano",
    "speech": "Al deprimirse el potencial redox con el agua a -10 cm, ocurre el 'flip' biogeoquímico. Las emisiones de CO₂ por respiración heterótrofa caen más de un 70%. Sin embargo, la inmersión de materia orgánica lábil, raíces acumuladas y nitrógeno residual fertiliza a las arqueas metanogénicas. Las emisiones de metano pasan de una línea base casi nula (<0.02 µmol m⁻² s⁻¹) a picos episódicos intensos que superan los 0.45 µmol m⁻² s⁻¹.",
    "bullets": [
      "Respiración heterótrofa de CO₂ suprimida en >70% por la instauración de anoxia.",
      "Los flujos de metano se multiplican por más de un orden de magnitud (de <0.02 a >0.45 µmol m⁻² s⁻¹).",
      "Los residuos agrícolas lábiles enterrados sirven como sustrato energético inmediato para la metanogénesis."
    ],
    "defenseQ": "¿Pudo evitarse este pulso de metano? El descapote de la turba superficial agrícola antes de inundar reduce el sustrato lábil, pero conlleva costes millonarios de maquinaria y pérdida física del stock de carbono."
  },
  "slide_25_microbial_succession": {
    "title": "Sucesión Microbiana: Fermentadores, Arqueas Metanogénicas y Pérdida del Biofiltro",
    "speech": "Bajo el agua, se orquesta una sucesión microbiana termodinámica. Bacterias fermentadoras anaeróbicas hidrolizan carbohidratos estructurales en ácidos grasos volátiles, produciendo acetato y H₂ para metanógenos hidrogenotróficos y acetoclásticos. Notablemente, en estado drenado, las bacterias metanótrofas de los primeros 10 cm oxidaban hasta el 80% del metano producido. La inundación asfixia este biofiltro biológico superior, permitiendo que el metano escape directo a la atmósfera.",
    "bullets": [
      "Cascada trófica: Fermentadores primarios aportan acetato e H₂ a Methanosarcina y Methanosaeta.",
      "Pérdida del biofiltro metanótrofo: La oxidación oxigenada en los primeros 10 cm cae de ~80% a casi cero.",
      "Explica por qué la emisión superficial se dispara desproporcionadamente respecto a la producción profunda."
    ],
    "defenseQ": "¿Qué vía metanogénica prevalece en Wallener Au? En turba agrícola enriquecida en carbono lábil, domina inicialmente la vía acetoclástica, cediendo protagonismo a la vía hidrogenotrófica a medida que el acetato se agota."
  },
  "slide_26_aerenchyma_shunt": {
    "title": "El Conducto Vascular: Mecanismo de 'Bypass' por Aerénquima Vegetal",
    "speech": "Al colonizar el humedal especies palustres como Carex rostrata y Phalaris arundinacea, desarrollan un extenso tejido de aerénquima cortical, conductos gaseosos huecos para ventilar sus raíces sumergidas. No obstante, esta ventilación opera a la inversa para los GEI: el metano disuelto en el agua de poro ingresa a las raíces y sortea cualquier oxidación residual en el suelo, saliendo directamente por transpiración estomática a la atmósfera.",
    "bullets": [
      "El aerénquima cortical actúa como una chimenea de transporte vascular directo para el metano profundo.",
      "Evade tanto la tortuosidad porosa del suelo como las capas remanentes de metanotrofía superficial.",
      "El transporte por aerénquima representa entre el 60% y el 85% de las emisiones de CH₄ estivales del fen."
    ],
    "defenseQ": "¿El aerénquima transporta también oxígeno a la rizósfera? Sí, la pérdida radial de oxígeno (ROL) crea una vaina oxidante delgada alrededor de las raíces, pero su capacidad es superada por el masivo flujo ascendente de metano."
  },
  "slide_27_chamber_transect_fig55": {
    "title": "Red de Cámaras Cerradas in Situ y Transecto Microtopográfico: Figura 55",
    "speech": "La Figura 55 cartografía el despliegue espacial de la red de cámaras estáticas cerradas a lo largo de Wallener Au. Doce collares permanentes atraviesan un marcado gradiente microtopográfico conectados mediante pasarelas de madera para evitar la perturbación del suelo. Los collares se estratifican en dos zonas funcionales: depresiones en zanjas relictas con nivel freático casi a superficie (-5 cm a agua libre) colonizadas por Carex y Typha, y mesetas elevadas de pastizal (-25 a -40 cm freático). Las cámaras manuales con ventiladores internos y puertos septa permiten capturar la intensa ebullición puntual en zanjas.",
    "bullets": [
      "Infraestructura Espacial (Figura 55): 12 collares estáticos con pasarelas de madera para prevenir compactación.",
      "Estratificación Microtopográfica: Zanjas relictas deprimidas (WTD -5 cm) frente a lomas de pastizal (WTD -35 cm).",
      "Física de Cámaras: 0.785 m² de base, extensiones telescópicas de 16 a 42 cm, mezcla por ventilador y jeringas herméticas.",
      "Protocolo Sin Compactación: Las pasarelas evitan la liberación artificial de burbujas de metano por pisadas."
    ],
    "defenseQ": "¿Por qué fueron indispensables las pasarelas de madera? Porque la turba con piso de arado es mecánicamente inestable; caminar directamente sobre el suelo genera ondas de presión de poros que provocan desprendimientos artificiales de burbujas de metano."
  },
  "slide_28_n2o_chamber_suite": {
    "title": "Dinámica Empírica de Óxido Nitroso (N₂O): Figuras 78–82 y Modelo HMR",
    "speech": "Las Figuras 78 a 82 integran la suite empírica de óxido nitroso (N₂O) en el transecto de cámaras. Los flujos se calculan por cromatografía de gases mediante el modelo no lineal de Hutchinson & Mosier (1981), que compensa la disminución del gradiente de difusión en la cámara. Mientras la torre de Eddy Covariance no detecta N₂O por limitaciones analíticas, las cámaras revelan picos episódicos intensos (hasta 48 µg N m⁻² h⁻¹). Estos pulsos surgen en descensos estivales del nivel freático, cuando el oxígeno reactiva el nitrógeno residual de fertilizantes provocando desnitrificación incompleta. Esto prueba que la inundación de turba agrícola exige mitigar el nitrógeno para no anular los beneficios climáticos con este potente gas.",
    "bullets": [
      "Suite Figuras 78–82: Series temporales por collar, distribución espacial, tasas por sitio y acumulación anual de masa.",
      "Física No Lineal HMR: Ecuación dC/dt de Hutchinson & Mosier que corrige la atenuación por retrodifusión en el headspace.",
      "Picos por Legado de Nitrógeno: Fertilizantes históricos que detonan desnitrificación incompleta con niveles freáticos a -15/-20 cm.",
      "Alto Factor GWP: Con un forzamiento radiativo de 265 a 298 veces el del CO₂, pequeñas emisiones de N₂O desbalancean el presupuesto neto."
    ],
    "defenseQ": "¿Por qué la torre de Eddy Covariance no midió N₂O de forma continua? Porque los analizadores infrarrojos de celda abierta carecen de la sensibilidad sub-ppb necesaria para resolver las bajas concentraciones (~335 ppb) y las diminutas fluctuaciones turbulentas del N₂O."
  },
  "slide_29_chambers_vs_tower": {
    "title": "Desconexión Espacial y Validación Cruzada: Cámaras de Campo vs. Torre Eddy Covariance",
    "speech": "La validación cruzada entre cámaras manuales cerradas y la torre de Eddy Covariance (Figuras 55, 83 y 83b) reveló una discrepancia espacial reveladora. Mientras que la respiración nocturna de CO₂ concuerda estrechamente (R² = 0.86, Figura 83b), los flujos de metano medidos por cámaras en zanjas relictas superan en hasta un 300% al promedio integrado de la torre. La huella de la torre promedia matemáticamente estos puntos calientes en un radio de 200 m, demostrando que el transecto de cámaras (Figura 55) es vital para cartografiar las chimeneas de ebullición.",
    "bullets": [
      "La respiración nocturna de CO₂ muestra alta concordancia entre torre y promedio de cámaras (R² = 0.86, Figura 83b).",
      "Los flujos de metano en zanjas relictas superan en hasta un 300% el promedio espacial de la huella de la torre por ebullición puntual.",
      "La Figura 55 demuestra el gradiente de elevación entre microalturas de pradera y zanjas inundadas.",
      "Efecto Dilución: Las zanjas ocupan solo ~6% del área y sus picos se diluyen en la integración espacial de la torre."
    ],
    "defenseQ": "¿Por qué la torre registra flujos de metano inferiores a las cámaras en zanjas? Porque las zanjas ocupan una fracción pequeña de la huella aerodinámica; sus intensas emisiones de ebullición quedan diluidas en el promedio espacial del pastizal circundante.",
    "coreThesis": "Eddy Covariance brinda una resolución temporal inigualable para el balance neto de CO₂, pero las cámaras cerradas son indispensables para cuantificar los puntos calientes de ebullición de metano y los pulsos de óxido nitroso."
  },
  "slide_30_gwp_synthesis": {
    "title": "El Balance Neto de GEI (100a vs. 20a): Desenmascarando la Ilusión del Sumidero",
    "speech": "En síntesis, integramos el presupuesto neto de gases de efecto invernadero bajo diferentes horizontes multidecenales. Bajo el horizonte convencional a 100 años (GWP100 = 28 para CH₄), la turbera inundada se muestra casi neutra (+1.2 t CO₂-eq ha⁻¹ año⁻¹), compensando la línea base drenada (+24.5 t CO₂-eq ha⁻¹ año⁻¹). No obstante, en el horizonte a 20 años (GWP20 = 84), clave para las metas alemanas de 2045, el pulso agudo de metano convierte al humedal en un potente emisor radiativo neto (+14.8 t CO₂-eq ha⁻¹ año⁻¹). La restauración es vital a largo plazo, pero la inundación descontrolada de turba agrícola impone una penalización climática a corto plazo que debe gestionarse activamente.",
    "bullets": [
      "Estado drenado de partida: Chimenea continua de CO₂ que emite +24.5 t CO₂-eq ha⁻¹ año⁻¹ (subsidencia y mineralización).",
      "Horizonte a 100 años (GWP100 = 28): La reinundación logra neutralidad climática (+1.2 t CO₂-eq ha⁻¹ año⁻¹), validando la restauración.",
      "Horizonte a 20 años (GWP20 = 84): El pico de metano genera un forzamiento neto de +14.8 t CO₂-eq ha⁻¹ año⁻¹, tensionando las metas a 2045.",
      "Veredicto final: La inundación gradual con niveles freáticos controlados (-10 a -15 cm) y manejo de biomasa es imperativa para resolver la Paradoja de la Restauración."
    ],
    "defenseQ": "¿Cuál es su recomendación política final? Promover la paludicultura y la inundación gradual escalonada en vez de la anegación súbita, mitigando las emisiones agudas de metano mientras se estabilizan los reservorios de turba.",
    "coreThesis": "Los datos de torre antes de la integración crean la ilusión de un sumidero de carbono por la fotosíntesis diurna estival. Sin embargo, al incorporar las observaciones de cámaras cerradas, el balance radiativo real demuestra que Wallener Au es una fuente neta de calentamiento dominada por metano estacional y pulsos de N₂O."
  },
  "slide_31_conclusions_outlook": {
    "title": "Síntesis, Política Agrícola y Directrices Operativas para la Restauración",
    "speech": "Para conectar la micrometeorología de alta frecuencia y la mecánica del suelo con la toma de decisiones, nuestros hallazgos generan directrices operativas concretas. A escala macro-política, las metas de 2045 deben internalizar el forzamiento a 20 años del metano (GWP20 = 84), financiando la transición escalonada hacia la paludicultura. A escala micro-agronómica, inundar turba con piso de arado anula la capacidad portante para tractores (σp = 62 kPa), exigiendo subsidios para maquinaria especializada de baja presión de inflado y cadenas de valor para biomasa palustre. Restaurar turberas es una necesidad biofísica climática, pero sin monitoreo acoplado y apoyo económico al productor, constituye un severo riesgo operativo.",
    "bullets": [
      "Política Macro: Manejo freático gradual (-10 a -15 cm) para frenar el metano agudo y detener la pérdida oxidativa de CO₂.",
      "Transición Agronómica: Apoyos financieros y ajustes en la PAC para compensar la caída de rendimiento hacia la paludicultura (Typha, Phragmites).",
      "Protección Mecánica del Suelo: Reconocer la compactación irreversible del piso de arado para prevenir fallas plásticas bajo maquinaria pesada.",
      "Veredicto Defensivo Final: La combinación de Eddy Covariance continuo, diagnóstico geomecánico y política adaptativa es la única vía para resolver la Paradoja de la Restauración."
    ],
    "defenseQ": "¿Cuáles son los próximos pasos prioritarios de investigación? Monitoreo plurianual continuo con Eddy Covariance para trazar la atenuación decenal del metano conforme maduran las comunidades de plantas palustres estables."
  }
};
