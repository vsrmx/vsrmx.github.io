# VAG Connector Database

A community-maintained reference of Volkswagen and Audi electrical connectors. Hosted at https://vsrmx.github.io/

## Structure

```
├── index.html              ← page structure (HTML only)
├── css/
│   └── styles.css          ← all styling
├── js/
│   ├── svg.js              ← connector diagram templates
│   └── app.js              ← main application logic
├── data/
│   └── connectors.json     ← the connector database
├── .nojekyll               ← tells GitHub Pages to skip Jekyll processing
└── README.md               ← this file
```

## Editing connectors

All connector data lives in **`data/connectors.json`**. To add a connector, append a new object to the array following the existing pattern. Required fields:

| Field | Type | Notes |
|-------|------|-------|
| `id` | number | Must be unique |
| `name` | string | Display name, e.g. "1J0 973 712 — Coolant temp sensor" |
| `family` | string | e.g. "Micro Timer", "JPT", "AMP Superseal 1.5" |
| `manufacturer` | string | e.g. "TE Connectivity / AMP", "Bosch", "KOSTAL" |
| `pins` | number | Pin count |
| `layout` | string | e.g. "1×3 inline", "2×4", "Round 13-pin" |
| `partNumbers` | array of strings | VAG part numbers |
| `tyco` | array of strings | TE/Tyco cross-references (or ["N/A"]) |
| `terminalSize` | string | e.g. "1.5mm", "2.8mm VAG Tab" |
| `gaugeRange` | string | e.g. "0.35–1.0 mm²" |
| `locking` | string | e.g. "Side latch", "Tab with CPA" |
| `sealed` | boolean | true for IP-rated sealed connectors |
| `terminals` | array of strings | VAG terminal part numbers |
| `seals` | array of strings | Wire seal part numbers or ["N/A"] |
| `colors` | array of `{hex, name, ctx}` | Housing colour variants |
| `usage` | array of strings | Where the connector is used |
| `notes` | string | Additional context and tips |
| `platforms` | array of strings | e.g. ["Mk4","Mk5","B5","8L"] |
| `func` | string | One of the 13 function categories (see below) |
| `imageUrl` | string | Photo URL (or empty string) |
| `svgType` | string | References a template in `js/svg.js` |
| `refs` | array of `{l, u}` | Reference links |

### Function categories

One of: `Engine & Sensors` · `Ignition & Coils` · `Fuel & Injection` · `Lambda & Emissions` · `Cooling & HVAC` · `ABS & Brakes` · `Body & Interior` · `Lighting & Exterior` · `Audio & Infotainment` · `Diagnostics & ECU` · `Power & High-Current` · `Towing` · `Generic / Multi-use`

### Platform tags

VW: `Mk1` `Mk2` `Mk3` `Mk4` `Mk5` `Mk6` `Mk7` `Mk8` `PQ25` `MQB`
Audi A3: `8L` `8P` `8V`
Audi A4: `B3` `B4` `B5` `B6` `B7` `B8` `B9`
Audi A6: `C4` `C5` `C6` `C7`
Cross-platform: `MLB` `All VAG`

Audi platform codes (B*, C*, 8L/8P/8V, MLB) render in yellow; VW codes in blue.

## SVG diagrams

Connector diagrams are generated procedurally in `js/svg.js`. Each connector references an `svgType` which maps to a template. To add a new layout, edit the `templates` object in `makeSVG()`.

## Theming

Light and dark themes use CSS variables defined on `:root` and `:root.light` in `css/styles.css`. The theme toggle is in the top-right of the header; preference is saved to localStorage.

## Local development

Because `data/connectors.json` is loaded via `fetch()`, you need to serve the files via a local web server rather than opening `index.html` directly. Quick option:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deployment

Push to your GitHub Pages branch. The `.nojekyll` file ensures GitHub Pages serves files as-is without Jekyll processing. No build step required.

## Features

- 120 connectors across 13 function categories
- Light/dark theme toggle
- Search by name, part number, application, or platform
- Filter by function, family, pin count, manufacturer, colour, or platform
- Function groups collapsible in main view
- Recently viewed strip (last 6 opened)
- Deep linking (URL hash → opens specific connector)
- Repair kit builder (auto-generated terminal/seal/tool list per connector)
- Where to buy links (ECS Tuning, FCP Euro, Corsa-Technic, eBay)
- Similar connectors suggestions
- Printer-friendly connector data sheet
- Reference tab with terminal & wire seal cross-references, DIN 72551 wire colour codes, crimp tools, and connector ID guide
- Mobile-optimised with bottom-drawer filter UI
