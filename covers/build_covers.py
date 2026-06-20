#!/usr/bin/env python3
"""
Build the Performance VW cover archive for GitHub Pages.

Walks the source folder (and its year subfolders) for cover images, generates
web-sized thumbnails into ./thumbs (mirroring the year subfolders), and writes
covers.json sorted newest-first. Any file it can't parse is reported and
skipped so nothing disappears silently.

Filenames look like  Cover-<WHEN>-<YEAR>.jpg  where <WHEN> can be:
    a month            Cover-March-2024.jpg        -> March 2024
    two months         Cover-June-July-2020.jpg    -> June/July 2020
    a season           Cover-Autumn-2019.jpg       -> Autumn 2019
    a themed special   Cover-Golf-Special-2010.jpg -> Golf Special 2010

The issue date is read from the FILENAME, not the folder name.

Usage:
    pip install pillow
    python build_covers.py

Re-run whenever you add new covers, then commit images/, thumbs/ and covers.json.
"""

import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install pillow")

# --- config -----------------------------------------------------------------
SRC = Path("images")     # folder holding your year subfolders. Rename this to
                         # match your folder, or move your year folders into ./images
THUMB_DIR = Path("thumbs")
OUT = Path("covers.json")
THUMB_WIDTH = 480        # grid thumbnail width in px (lightbox uses the full image)
THUMB_QUALITY = 82
VALID_EXT = {".jpg", ".jpeg", ".png", ".webp"}

# Where seasonal and undated issues sort within their year (1=Jan ... 12=Dec).
# Tweak these to nudge where season/special covers land. Set UNDATED_MONTH = 13
# to put themed specials at the TOP of their year instead of the bottom.
SEASONS = {"spring": 4, "summer": 7, "autumn": 10, "fall": 10, "winter": 12}
UNDATED_MONTH = 0
# ----------------------------------------------------------------------------

MONTHS = {
    "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
    "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12,
    "jan": 1, "feb": 2, "mar": 3, "apr": 4, "jun": 6, "jul": 7, "aug": 8,
    "sep": 9, "sept": 9, "oct": 10, "nov": 11, "dec": 12,
}
FULL = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}


def parse_name(stem):
    """Return (year, sort_month, label) for a Cover-...-YYYY filename, or None."""
    if not stem.startswith("Cover-"):
        return None
    body = stem[len("Cover-"):]                 # e.g. Summer-Special-2013
    ym = re.search(r"-(\d{4})$", body)
    if not ym:
        return None
    year = int(ym.group(1))
    middle = body[:ym.start()]                  # e.g. Summer-Special  /  March
    if not middle:
        return None

    tokens = middle.split("-")
    low = [t.lower() for t in tokens]

    # sort position: first explicit month, else a season, else undated
    month_nums = [MONTHS[t] for t in low if t in MONTHS]
    if month_nums:
        sort_month = month_nums[0]
    else:
        sort_month = next((SEASONS[t] for t in low if t in SEASONS), UNDATED_MONTH)

    # label: pure months join with "/", everything else keeps original casing
    if all(t in MONTHS for t in low):
        label_main = "/".join(FULL[MONTHS[t]] for t in low)
    else:
        label_main = " ".join(tokens)

    return year, sort_month, f"{label_main} {year}"


def main():
    if not SRC.is_dir():
        sys.exit(f"No '{SRC}/' folder found. Set SRC to your covers folder, "
                 f"or move your year subfolders into ./{SRC}")
    THUMB_DIR.mkdir(exist_ok=True)

    covers, skipped = [], []

    for f in sorted(SRC.rglob("*")):
        if not f.is_file() or f.suffix.lower() not in VALID_EXT:
            continue

        parsed = parse_name(f.stem)
        if not parsed:
            skipped.append(str(f.relative_to(SRC)))
            continue
        year, sort_month, label = parsed

        rel = f.relative_to(SRC)                  # e.g. 2024/Cover-March-2024.jpg
        thumb_rel = rel.with_suffix(".jpg")       # mirror the year subfolder
        thumb_path = THUMB_DIR / thumb_rel
        thumb_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            with Image.open(f) as im:
                im = im.convert("RGB")
                w, h = im.size
                if w > THUMB_WIDTH:
                    im = im.resize((THUMB_WIDTH, round(h * THUMB_WIDTH / w)), Image.LANCZOS)
                im.save(thumb_path, "JPEG", quality=THUMB_QUALITY, optimize=True)
        except Exception as e:
            skipped.append(f"{rel}  (could not read image: {e})")
            continue

        covers.append({
            "year": year,
            "month": sort_month,
            "label": label,
            "thumb": f"{THUMB_DIR.as_posix()}/{thumb_rel.as_posix()}",
            "full": f"{SRC.as_posix()}/{rel.as_posix()}",
        })

    covers.sort(key=lambda c: (-c["year"], -c["month"]))
    OUT.write_text(json.dumps(covers, indent=2))

    print(f"\u2713 {len(covers)} covers written to {OUT}")
    print(f"\u2713 thumbnails generated in {THUMB_DIR}/ ({THUMB_WIDTH}px wide)")
    if covers:
        years = [c["year"] for c in covers]
        print(f"\u2713 range: {min(years)}\u2013{max(years)}")
    if skipped:
        print(f"\n\u26a0 {len(skipped)} file(s) still skipped (no readable Cover-...-YEAR name):")
        for s in skipped:
            print(f"    {s}")


if __name__ == "__main__":
    main()
