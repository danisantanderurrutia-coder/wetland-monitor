#!/usr/bin/env python3
"""
==============================================================================
Soil-Atmosphere Interface Diagram Generator (Python / Matplotlib)
Master's Thesis: Carbon Fluxes and GHG Dynamics in Peatlands
Author: Daniel S. Santander Urrutia (CAU Kiel)
==============================================================================
Generates a publication-grade cross-section diagram of the Soil-Atmosphere
system showing peat horizons, vegetation canopy, earthworms, roots,
mounted instrumentation, and biogeochemical gas flux vectors.
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

def generate_soil_atmosphere_figure(output_path="Soil_Atmosphere_Interface_WallenerAu.png"):
    fig, ax = plt.subplots(figsize=(14, 9), dpi=300)
    
    # Coordinates:
    # X: 0 to 100
    # Y: -70 cm (Subsurface base) to +120 cm (Atmosphere)
    
    # ---------------------------------------------------------
    # 1. ATMOSPHERE / SKY REGION (Y: 0 to 120 cm)
    # ---------------------------------------------------------
    sky = patches.Rectangle((0, 0), 100, 120, color="#e0f2fe", zorder=1)
    ax.add_patch(sky)
    
    # Cloud shapes
    cloud1 = patches.Ellipse((25, 95), 24, 10, color="#ffffff", alpha=0.9, zorder=2)
    cloud2 = patches.Ellipse((75, 100), 30, 12, color="#ffffff", alpha=0.9, zorder=2)
    ax.add_patch(cloud1)
    ax.add_patch(cloud2)
    
    # Sun
    sun = patches.Circle((90, 105), 7, color="#fde047", zorder=2)
    ax.add_patch(sun)
    
    # ---------------------------------------------------------
    # 2. SOIL HORIZONS REGION (Y: -70 to 0 cm)
    # ---------------------------------------------------------
    # Horizonte O / H1: Acrotelm (0 to -12 cm) - Rich organic fibrous peat
    horiz_o = patches.Rectangle((0, -12), 100, 12, color="#78350f", zorder=1)
    ax.add_patch(horiz_o)
    
    # Horizonte A / H2: Compacted Plow Pan (10 to 25 cm) - Dark compacted peat
    horiz_a = patches.Rectangle((0, -28), 100, 16, color="#451a03", zorder=1)
    ax.add_patch(horiz_a)
    
    # Horizonte B / H3: Catotelm Deep Peat (25 to 50 cm) - Anoxic amorphous peat
    horiz_b = patches.Rectangle((0, -52), 100, 24, color="#1c1917", zorder=1)
    ax.add_patch(horiz_b)
    
    # Horizonte C / R: Glacial Mineral Substrate (>50 cm) - Sand, clay, pebbles
    horiz_r = patches.Rectangle((0, -70), 100, 18, color="#475569", zorder=1)
    ax.add_patch(horiz_r)
    
    # Rounded Glacial Pebbles in Horizonte R
    np.random.seed(42)
    pebble_xs = [8, 18, 28, 40, 52, 65, 78, 88, 95, 14, 34, 60, 72, 84]
    pebble_ys = [-62, -59, -63, -60, -64, -58, -62, -60, -65, -67, -68, -66, -67, -66]
    for px, py in zip(pebble_xs, pebble_ys):
        rx, ry = np.random.uniform(3, 6), np.random.uniform(2, 4)
        pebble = patches.Ellipse((px, py), rx, ry, color="#94a3b8", ec="#334155", lw=1.2, zorder=2)
        ax.add_patch(pebble)
        
    # Water Table Level (e.g. at -25 cm)
    water_y = -25
    water_rect = patches.Rectangle((0, -70), 100, -water_y, color="#0284c7", alpha=0.35, zorder=3)
    ax.add_patch(water_rect)
    ax.axhline(water_y, color="#0284c7", lw=2.5, ls="--", zorder=4)
    ax.text(3, water_y + 1.5, "NIVEL FREÁTICO DINÁMICO (WTD: -25 cm)", color="#0369a1", fontsize=9, fontweight="bold", zorder=5)

    # ---------------------------------------------------------
    # 3. VEGETATION CANOPY, ROOTS & WORMS
    # ---------------------------------------------------------
    # Grass blades
    for gx in np.linspace(1, 99, 140):
        gh = np.random.uniform(6, 12)
        ax.plot([gx, gx + np.random.uniform(-1, 1)], [0, gh], color="#15803d", lw=1.8, zorder=5)
        
    # Root networks
    for rx in [15, 30, 48, 65, 82]:
        ax.plot([rx, rx - 3, rx - 5], [0, -8, -18], color="#d97706", lw=2.2, zorder=4)
        ax.plot([rx, rx + 4, rx + 6], [0, -10, -22], color="#d97706", lw=1.8, zorder=4)
        ax.plot([rx - 3, rx - 1], [-8, -14], color="#b45309", lw=1.2, zorder=4)

    # Earthworms (Lombrices in topsoil O/A)
    worm1_x = np.linspace(20, 26, 30)
    worm1_y = -6 + 1.2 * np.sin(np.linspace(0, 3 * np.pi, 30))
    ax.plot(worm1_x, worm1_y, color="#f472b6", lw=4, solid_capstyle="round", zorder=5)

    worm2_x = np.linspace(70, 78, 30)
    worm2_y = -8 + 1.5 * np.sin(np.linspace(0, 3 * np.pi, 30))
    ax.plot(worm2_x, worm2_y, color="#f472b6", lw=4, solid_capstyle="round", zorder=5)

    # Methane bubbles in anoxic zone
    for bx, by in [(22, -38), (28, -44), (45, -34), (58, -48), (64, -36), (82, -42)]:
        bubble = patches.Circle((bx, by), 1.2, color="#fde047", ec="#f59e0b", lw=1.5, zorder=4)
        ax.add_patch(bubble)

    # ---------------------------------------------------------
    # 4. MOUNTED INSTRUMENTATION
    # ---------------------------------------------------------
    # Eddy Covariance Tower at X = 50
    ax.plot([50, 50], [0, 85], color="#64748b", lw=3.5, zorder=6)
    # Tower cross bracing
    for by in range(0, 80, 15):
        ax.plot([47.5, 52.5], [by, by + 15], color="#94a3b8", lw=1.2, zorder=5)
        ax.plot([52.5, 47.5], [by, by + 15], color="#94a3b8", lw=1.2, zorder=5)
    ax.plot([47.5, 47.5], [0, 85], color="#64748b", lw=2, zorder=6)
    ax.plot([52.5, 52.5], [0, 85], color="#64748b", lw=2, zorder=6)
    
    # Tower boom at top (3.5 m -> Y = 85)
    ax.plot([44, 56], [85, 85], color="#334155", lw=3, zorder=6)
    # Ultrasonic Anemometer uSonic-3 (Left)
    ax.plot(44, 88, marker="o", color="#0284c7", markersize=9, zorder=7)
    ax.text(44, 93, "uSonic-3\n(3.5 m)", color="#0369a1", fontsize=8, ha="center", fontweight="bold", zorder=7)
    
    # LI-7500DS (CO2/H2O) & LI-7700 (CH4)
    ax.plot(54, 88, marker="s", color="#059669", markersize=9, zorder=7)
    ax.plot(56, 88, marker="^", color="#d97706", markersize=9, zorder=7)
    ax.text(55, 93, "LI-7500 / LI-7700\n(CO₂ & CH₄)", color="#047857", fontsize=8, ha="center", fontweight="bold", zorder=7)

    # Net Radiometer CNR4 at Y = 60 (2.5 m)
    ax.plot([52.5, 58], [60, 60], color="#64748b", lw=2, zorder=6)
    ax.plot(58, 60, marker="D", color="#eab308", markersize=7, zorder=7)
    ax.text(60, 60, "CNR4 (Rn)", color="#a16207", fontsize=8, va="center", fontweight="bold", zorder=7)

    # Gas Chamber at X = 25 (Surface)
    chamber = patches.Rectangle((21, 0), 8, 5, facecolor="#e2e8f0", edgecolor="#0284c7", lw=2, alpha=0.85, zorder=6)
    ax.add_patch(chamber)
    ax.text(25, 7, "Cámara In Situ (CH₄, N₂O, Reco)", color="#0284c7", fontsize=8, ha="center", fontweight="bold", zorder=7)

    # Soil Moisture/Temp Profile at X = 80
    ax.plot([80, 80], [0, -50], color="#ef4444", lw=2.5, ls="-", zorder=6)
    for depth in [-5, -10, -20, -30, -40, -50]:
        ax.plot(80, depth, marker="o", color="#ffffff", markeredgecolor="#ef4444", markersize=5, zorder=7)
    ax.text(82, -25, "Sondas FDR & Termistores\n(-5 a -50 cm)", color="#b91c1c", fontsize=8, va="center", fontweight="bold", zorder=7)

    # ---------------------------------------------------------
    # 5. FLUX ARROWS & BIOGEOCHEMICAL PROCESSES
    # ---------------------------------------------------------
    # GPP Photosynthesis Arrow (Downward Green)
    ax.annotate("", xy=(36, 15), xytext=(36, 45),
                arrowprops=dict(arrowstyle="->", color="#15803d", lw=3.5, mutation_scale=18), zorder=6)
    ax.text(37, 30, "GPP (Asimilación CO₂)", color="#15803d", fontsize=9, fontweight="bold", zorder=7)

    # CH4 Efflux Arrow (Upward Amber)
    ax.annotate("", xy=(68, 45), xytext=(68, 15),
                arrowprops=dict(arrowstyle="->", color="#d97706", lw=3.5, mutation_scale=18), zorder=6)
    ax.text(69, 30, "Flujo CH₄ (Metanogénesis)", color="#d97706", fontsize=9, fontweight="bold", zorder=7)

    # Net Radiation Arrow (Sun to ground)
    ax.annotate("", xy=(85, 20), xytext=(88, 85),
                arrowprops=dict(arrowstyle="->", color="#ca8a04", lw=2.5, ls="--", mutation_scale=14), zorder=6)
    ax.text(88, 55, "Rn (Radiación Neta)", color="#ca8a04", fontsize=8, fontweight="bold", zorder=7)

    # ---------------------------------------------------------
    # 6. LABELS FOR SOIL HORIZONS (RIGHT SIDE)
    # ---------------------------------------------------------
    # Horizon tags
    ax.text(102, -6, "HORIZONTE O", color="#78350f", fontsize=11, fontweight="bold", va="center")
    ax.text(102, -9, "Acrotelm (0-10 cm) • Turba Fibrosa Viva", color="#64748b", fontsize=8, va="center")

    ax.text(102, -20, "HORIZONTE A", color="#451a03", fontsize=11, fontweight="bold", va="center")
    ax.text(102, -23, "Suela de Labor (10-25 cm) • Turba Compactada", color="#64748b", fontsize=8, va="center")

    ax.text(102, -39, "HORIZONTE B", color="#1c1917", fontsize=11, fontweight="bold", va="center")
    ax.text(102, -42, "Catotelm (25-50 cm) • Turba Amorfa Anóxica", color="#64748b", fontsize=8, va="center")

    ax.text(102, -61, "HORIZONTE R", color="#334155", fontsize=11, fontweight="bold", va="center")
    ax.text(102, -64, "Sustrato Mineral Glacial (>50 cm)", color="#64748b", fontsize=8, va="center")

    # Title & Subtitle
    plt.title("INTERFAZ SUELO - ATMÓSFERA Y HORIZONTES EDÁFICOS\nSitio Wallener Au (Klimafarm) • Schleswig-Holstein",
              fontsize=14, fontweight="bold", pad=15, color="#0f172a")

    ax.set_xlim(0, 100)
    ax.set_ylim(-70, 120)
    ax.axis("off")

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches="tight")
    print(f"Diagram saved successfully to {output_path}")

if __name__ == "__main__":
    generate_soil_atmosphere_figure()
