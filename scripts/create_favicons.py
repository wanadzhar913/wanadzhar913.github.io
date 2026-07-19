from pathlib import Path
import cairosvg
from PIL import Image
import io

# Resolve paths from the repo root so this works whether you run
# `python3 scripts/create_favicons.py` or `python3 create_favicons.py` from scripts/.
repo_root = Path(__file__).resolve().parent.parent
src = repo_root / "static" / "curry-rice.svg"
out_dir = repo_root / "static"

sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
}

# Render once at high res, then downscale for crisp small icons
png512 = cairosvg.svg2png(url=str(src), output_width=512, output_height=512)
base = Image.open(io.BytesIO(png512)).convert('RGBA')

for name, size in sizes.items():
    img = base.resize((size, size), Image.Resampling.LANCZOS)
    img.save(out_dir / name, format='PNG')
    print(f'wrote {name} ({size}x{size})')

# Multi-size ICO for legacy browsers
ico_imgs = [base.resize((s, s), Image.Resampling.LANCZOS) for s in (16, 32, 48)]
ico_imgs[0].save(out_dir / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('wrote favicon.ico')
