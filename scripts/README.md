This is a simple script to generate favicons of different sizes using Python's `cairosvg`.

Paths are resolved from the repo root, so you can run it from `scripts/` or the project root.

```bash
python3 -m venv .venv
source .venv/bin/activate

pip install cairosvg pillow

# From repo root:
python3 scripts/create_favicons.py

# Or from scripts/:
python3 create_favicons.py
```
