import os
from PIL import Image, ImageDraw

# 🎨 COULEUR DE FOND DE TON SITE
SITE_BACKGROUND = (15, 23, 42, 255) # RGB + Alpha

NODES = [
    { "x": 9, "y": 6, "r": 1.1 }, { "x": 23, "y": 11, "r": 0.8 }, { "x": 39, "y": 7, "r": 1.4 },
    { "x": 74, "y": 9, "r": 1.0 }, { "x": 88, "y": 16, "r": 0.9 }, { "x": 14, "y": 26, "r": 1.0 },
    { "x": 31, "y": 31, "r": 0.75 }, { "x": 54, "y": 24, "r": 1.25 }, { "x": 79, "y": 32, "r": 0.95 },
    { "x": 92, "y": 39, "r": 1.25 }, { "x": 8, "y": 48, "r": 0.8 }, { "x": 26, "y": 54, "r": 1.15 },
    { "x": 46, "y": 47, "r": 0.9 }, { "x": 67, "y": 56, "r": 1.35 }, { "x": 84, "y": 51, "r": 0.85 },
    { "x": 17, "y": 70, "r": 1.35 }, { "x": 36, "y": 75, "r": 0.85 }, { "x": 57, "y": 69, "r": 1.05 },
    { "x": 73, "y": 78, "r": 0.9 }, { "x": 91, "y": 72, "r": 1.2 }, { "x": 11, "y": 91, "r": 0.95 },
    { "x": 28, "y": 86, "r": 1.15 }, { "x": 51, "y": 92, "r": 0.8 }, { "x": 69, "y": 88, "r": 1.25 },
    { "x": 89, "y": 94, "r": 0.9 }
]

LINKS = [
    [0, 1], [1, 2], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9],
    [10, 11], [11, 12], [12, 13], [13, 14], [15, 16], [16, 17],
    [17, 18], [18, 19], [20, 21], [21, 22], [22, 23], [23, 24],
    [2, 7], [7, 12], [12, 17], [17, 22], [4, 9], [9, 14], [14, 19], [19, 24]
]

CLOUDS = [
    { "x": 0.01, "y": 0.08, "r": 500, "color": (34, 211, 238), "alpha": 35 },
    { "x": 1.06, "y": 0.27, "r": 650, "color": (99, 102, 241), "alpha": 35 },
    { "x": 0.08, "y": 0.54, "r": 600, "color": (14, 165, 233), "alpha": 30 },
    { "x": 0.93, "y": 0.78, "r": 500, "color": (139, 92, 246), "alpha": 28 }
]

NODE_COLORS = [(103, 232, 249), (147, 197, 253), (196, 181, 253)]
NODE_OPACITIES = [0.42, 0.24]
LINK_BASE_COLOR = (56, 189, 248)

def draw_radial_gradient(base_image, cx, cy, r, rgb_color, max_alpha):
    size = r * 2
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    
    for i in range(r, 0, -1):
        alpha = int(max_alpha * (1 - i / r))
        mask_draw.ellipse([r - i, r - i, r + i, r + i], fill=alpha)
        
    color_img = Image.new("RGBA", (size, size), (*rgb_color, 255))
    base_image.paste(color_img, (int(cx - r), int(cy - r)), mask=mask)

def generate_constellation(width, height, viewport_h, filename):
    print(f"Calcul de la constellation en Haute Définition...")
    
    # 🌟 SUPERSAMPLING : On dessine en 2X plus grand pour pouvoir lisser ensuite
    render_w = width * 2
    render_h = height * 2
    render_vh = viewport_h * 2
    
    img = Image.new("RGBA", (render_w, render_h), SITE_BACKGROUND)
    draw = ImageDraw.Draw(img)

    # 1. Dessin des Nuages de fond (Échelle 2x)
    scale_factor = render_w / 1920.0
    for cloud in CLOUDS:
        cx = cloud["x"] * render_w
        cy = cloud["y"] * render_h
        radius = int(cloud["r"] * scale_factor * 1.2)
        draw_radial_gradient(img, cx, cy, radius, cloud["color"], cloud["alpha"])

    # 2. Dessin des Liens (Échelle 2x)
    for i, link in enumerate(LINKS):
        a, b = link
        x1 = (NODES[a]["x"] / 100.0) * render_w
        y1 = (NODES[a]["y"] / 100.0) * render_h
        x2 = (NODES[b]["x"] / 100.0) * render_w
        y2 = (NODES[b]["y"] / 100.0) * render_h

        alpha = int((0.20 if i % 4 == 0 else 0.12) * 255)
        # Épaisseur doublée pour le rendu 2x
        thickness = int((2.5 if i % 4 == 0 else 1.2) * scale_factor)
        thickness = max(1, thickness)

        draw.line([(x1, y1), (x2, y2)], fill=(*LINK_BASE_COLOR, alpha), width=thickness)

    # 3. Dessin des Nœuds (Échelle 2x)
    scale = min(render_w, render_vh) / 100.0
    node_size_multiplier = scale * 3.0

    for i, n in enumerate(NODES):
        cx = (n["x"] / 100.0) * render_w
        cy = (n["y"] / 100.0) * render_h
        color = NODE_COLORS[i % 3]
        opacity = NODE_OPACITIES[i % 2]

        # Halo du nœud (Glow)
        glow_radius = int(n["r"] * 6 * scale_factor * 8)
        if glow_radius > 0:
            draw_radial_gradient(img, cx, cy, glow_radius, color, int(0.25 * 255))

        # Cœur du nœud
        node_r = max(3, int(n["r"] * node_size_multiplier))
        alpha = int(opacity * 255)
        
        node_layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        node_draw = ImageDraw.Draw(node_layer)
        node_draw.ellipse([cx - node_r, cy - node_r, cx + node_r, cy + node_r], fill=(*color, alpha))
        img = Image.alpha_composite(img, node_layer)
        draw = ImageDraw.Draw(img)

    # 🌟 LE SECRET DU LISSAGE : On redimensionne l'image en taille réelle avec le filtre LANCZOS
    print(f"Application de l'anti-aliasing (LANCZOS)...")
    img_smooth = img.resize((width, height), Image.Resampling.LANCZOS)

    # Enregistrement au format WebP Haute Qualité
    final_img = img_smooth.convert("RGB")
    final_img.save(filename, "WEBP", quality=95) # Qualité boostée à 95% pour éviter les artefacts
    print(f"✓ Fichier {filename} généré (Qualité Pixel-Perfect) !\n")

if __name__ == "__main__":
    # 1. Version Desktop (1920x10000)
    generate_constellation(
        width=1920, 
        height=3200, 
        viewport_h=1080, 
        filename="constellation.webp"
    )

    # 2. Version Mobile (750x14000)
    generate_constellation(
        width=750, 
        height=3200, 
        viewport_h=1200, 
        filename="constellation-mobile.webp"
    )