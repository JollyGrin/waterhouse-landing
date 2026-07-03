#!/usr/bin/env bash
# Generates the /mediakit logo variants from the master static/logo.svg using
# ImageMagick. Outputs to static/brand/ — SVG recolors, transparent PNGs at
# three sizes, and square avatar tiles on brand backgrounds.
#
# Run:  bun run brand   (or: bash scripts/brand/generate-logos.sh)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/static/logo.svg"
OUT="$ROOT/static/brand"
mkdir -p "$OUT"

# Brand palette (mirrors src/app.css @theme tokens)
INK="#111111"
WHITE="#ffffff"
AMBER="#ff8c1a"
CREAM="#faf6f6"

# --- 1. Recolored SVG masters -------------------------------------------------
# The master logo uses fill="black" on every path; a straight substitution
# produces exact single-color variants.
recolor() { sed "s/fill=\"black\"/fill=\"$2\"/g" "$SRC" > "$OUT/$1"; }
recolor waterhouse-logo-black.svg "$INK"
recolor waterhouse-logo-white.svg "$WHITE"
recolor waterhouse-logo-amber.svg "$AMBER"

# --- 2. Transparent PNGs (512 / 1024 / 2048 wide) -----------------------------
# Rasterize at high density first so edges stay crisp, then resize to exact width.
for color in black white amber; do
	for w in 512 1024 2048; do
		magick -background none -density 300 "$OUT/waterhouse-logo-$color.svg" \
			-resize "${w}x" "PNG32:$OUT/waterhouse-logo-$color-$w.png"
	done
done

# --- 3. Square avatar tiles (logo centered on a brand background) -------------
# tile <name> <bg-color> <logo-variant>
tile() {
	for s in 512 1024; do
		logo_w=$((s * 62 / 100))
		magick -background none -density 300 "$OUT/waterhouse-logo-$3.svg" \
			-resize "${logo_w}x" -background "$2" -gravity center \
			-extent "${s}x${s}" "PNG32:$OUT/waterhouse-icon-$1-$s.png"
	done
}
tile cream "$CREAM" black
tile black "$INK" white
tile amber "$AMBER" black
tile white "$WHITE" black

echo "✓ static/brand/ ($(ls "$OUT" | wc -l | tr -d ' ') files)"
