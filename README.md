<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VAG Connector Database — VW · Audi · SEAT · Škoda</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg: #0f0f0f;
    --surface: #181818;
    --surface2: #222222;
    --border: #2e2e2e;
    --border2: #3a3a3a;
    --text: #e8e6e1;
    --text2: #a0998f;
    --text3: #5a5550;
    --accent: #c8b560;
    --accent2: #e8d070;
    --red: #e05a3a;
    --blue: #4a8fc8;
    --green: #5aaa78;
    --font: 'IBM Plex Sans', sans-serif;
    --mono: 'IBM Plex Mono', monospace;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
  }

  /* Header */
  header {
    border-bottom: 1px solid var(--border);
    padding: 2rem 2.5rem 1.5rem;
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .header-top {
    display: flex;
    align-items: flex-end;
    gap: 1.5rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .site-title {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text);
  }

  .site-title span {
    color: var(--accent);
  }

  .site-sub {
    font-size: 12px;
    color: var(--text3);
    font-family: var(--mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding-bottom: 3px;
  }

  .controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text3);
    font-size: 13px;
    pointer-events: none;
  }

  input[type="text"] {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: var(--font);
    font-size: 16px; /* prevents iOS auto-zoom on focus */
    padding: 8px 12px 8px 32px;
    outline: none;
    transition: border-color 0.15s;
  }

  input[type="text"]:focus { border-color: var(--accent); }
  input[type="text"]::placeholder { color: var(--text3); }

  select {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-family: var(--font);
    font-size: 16px; /* prevents iOS auto-zoom on focus */
    padding: 8px 28px 8px 12px;
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: border-color 0.15s;
  }
  select:focus { border-color: var(--accent); }

  .stats-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    font-size: 11px;
    font-family: var(--mono);
    color: var(--text3);
  }

  .stats-bar .count { color: var(--accent); }

  /* Main layout */
  main {
    padding: 2rem 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .card {
    background: var(--surface);
    padding: 1.25rem;
    cursor: pointer;
    transition: background 0.12s;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .card:hover { background: var(--surface2); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .card-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
  }

  .card-pn {
    font-size: 11px;
    font-family: var(--mono);
    color: var(--text3);
    margin-top: 2px;
  }

  .pin-badge {
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--accent);
    font-size: 11px;
    font-family: var(--mono);
    padding: 2px 8px;
    border-radius: 3px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .card-diagram {
    background: var(--bg);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    min-height: 80px; /* iOS Safari needs this — height alone can collapse */
    border: 1px solid var(--border);
    overflow: hidden;
    padding: 8px;
    -webkit-transform: translateZ(0); /* force GPU layer on iOS */
  }

  .card-diagram svg {
    max-width: 100%;
    width: auto;
    height: 64px; /* explicit px — iOS Safari collapses height:auto on SVG in flex */
    max-height: 64px;
    display: block;
    -webkit-transform: translateZ(0);
  }

  .card-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 12px;
  }

  .meta-item .ml { font-size: 10px; color: var(--text3); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.04em; }
  .meta-item .mv { font-size: 12px; color: var(--text2); margin-top: 1px; }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
  }

  .tag {
    font-size: 11px;
    background: rgba(200,181,96,0.08);
    color: var(--accent);
    border: 1px solid rgba(200,181,96,0.2);
    padding: 1px 7px;
    border-radius: 3px;
  }

  .family-badge {
    font-size: 10px;
    font-family: var(--mono);
    background: var(--bg);
    color: var(--text3);
    border: 1px solid var(--border);
    padding: 1px 6px;
    border-radius: 3px;
  }

  .colour-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px; }
  .colour-dot {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; color: var(--text3);
    font-family: var(--mono);
  }
  .colour-dot-swatch {
    width: 12px; height: 12px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;
  }
  .modal-colour-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 0.5rem; }
  .modal-colour-chip {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--text2); font-family: var(--mono);
    background: var(--bg); border: 1px solid var(--border);
    padding: 4px 10px; border-radius: 4px;
  }
  .modal-colour-chip .swatch {
    width: 14px; height: 14px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0;
  }
  .modal-colour-context { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* Empty state */
  .empty {
    grid-column: 1/-1;
    padding: 4rem 2rem;
    text-align: center;
    color: var(--text3);
    font-family: var(--mono);
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.75);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 10px;
    width: 100%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 0;
    /* Smooth scroll on iOS */
    -webkit-overflow-scrolling: touch;
  }

  .modal-inner { padding: 1.75rem; }

  .modal-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }

  .modal-title { font-size: 18px; font-weight: 600; color: var(--text); letter-spacing: -0.02em; }
  .modal-pn { font-size: 12px; font-family: var(--mono); color: var(--text3); margin-top: 4px; }

  .close-btn {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text2);
    width: 30px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.12s, color 0.12s;
  }
  .close-btn:hover { border-color: var(--border2); color: var(--text); }

  .modal-diagram {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    min-height: 100px;
    overflow: hidden;
    -webkit-transform: translateZ(0);
  }

  .modal-diagram svg {
    max-width: 100%;
    width: auto;
    height: 120px; /* explicit px for iOS Safari */
    max-height: 120px;
    display: block;
    -webkit-transform: translateZ(0);
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }

  .detail-item .dl { font-size: 10px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--text3); margin-bottom: 3px; }
  .detail-item .dv { font-size: 13px; color: var(--text); }

  .section-head {
    font-size: 10px;
    font-family: var(--mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text3);
    margin-bottom: 8px;
    margin-top: 1rem;
  }

  .section-head:first-of-type { margin-top: 0; }

  .chip-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 0.5rem; }

  .chip {
    font-size: 12px;
    font-family: var(--mono);
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text2);
    padding: 3px 9px;
    border-radius: 4px;
  }

  .usage-list { list-style: none; display: flex; flex-direction: column; gap: 4px; }
  .usage-list li { font-size: 13px; color: var(--text2); padding-left: 16px; position: relative; }
  .usage-list li::before { content: "→"; position: absolute; left: 0; color: var(--accent); font-size: 11px; top: 2px; }

  .notes-box {
    background: var(--bg);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 4px;
    padding: 12px 14px;
    font-size: 13px;
    color: var(--text2);
    line-height: 1.65;
  }

  .platform-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .platform-tag {
    font-size: 10px;
    font-family: var(--mono);
    background: rgba(74,143,200,0.1);
    color: var(--blue);
    border: 1px solid rgba(74,143,200,0.25);
    padding: 1px 6px;
    border-radius: 3px;
    white-space: nowrap;
  }
  .platform-tag.all-vag {
    background: rgba(200,181,96,0.08);
    color: var(--accent);
    border-color: rgba(200,181,96,0.2);
  }

  .ref-links { display: flex; flex-direction: column; gap: 5px; }
  .ref-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--blue);
    font-family: var(--mono);
    text-decoration: none;
    padding: 4px 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: border-color .12s, color .12s;
  }
  .ref-link:hover { border-color: var(--blue); color: var(--accent2); }
  .ref-link::before { content: "↗"; font-size: 10px; opacity: 0.6; }

  .manufacturer-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--text3);
    font-family: var(--mono);
  }

  .mfr-badge {
    background: rgba(74,143,200,0.1);
    border: 1px solid rgba(74,143,200,0.25);
    color: var(--blue);
    font-size: 11px;
    font-family: var(--mono);
    padding: 2px 8px;
    border-radius: 3px;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

  /* Footer */
  footer {
    margin-top: 3rem;
    padding: 1.5rem 2.5rem;
    border-top: 1px solid var(--border);
    font-size: 11px;
    font-family: var(--mono);
    color: var(--text3);
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  footer a { color: var(--text3); text-decoration: none; }
  footer a:hover { color: var(--accent); }

  /* ── Tablet ───────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  }

  /* ── Mobile ───────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    header {
      padding: 0.875rem 1rem 0;
      position: sticky;
      top: 0;
    }

    .header-top {
      margin-bottom: 0.75rem;
      gap: 0.5rem;
    }

    .site-title { font-size: 18px; }
    .site-sub { display: none; }

    .controls {
      gap: 7px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto;
    }

    .search-wrap {
      grid-column: 1 / -1;
      max-width: none;
      min-width: 0;
    }

    select {
      font-size: 12px;
      padding: 7px 24px 7px 8px;
      min-width: 0;
      width: 100%;
    }

    .stats-bar {
      font-size: 10px;
      margin-top: 0.6rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
      /* Hide the etka warning on mobile — too long */
      flex-wrap: nowrap;
      overflow: hidden;
    }

    .stats-bar span:last-child { display: none; }

    main {
      padding: 0.75rem;
    }

    .grid {
      grid-template-columns: 1fr;
      gap: 1px;
    }

    .card { padding: 1rem; }
    .card-name { font-size: 13px; }

    .card-diagram { height: 70px; min-height: 70px; }

    .card-meta {
      grid-template-columns: 1fr 1fr;
      gap: 4px 8px;
    }

    .meta-item .ml { font-size: 9px; }
    .meta-item .mv { font-size: 11px; }

    /* Modal — full screen on mobile */
    .modal-overlay {
      padding: 0;
      align-items: flex-end;
    }

    .modal {
      max-width: 100%;
      max-height: 92vh;
      border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
      border-bottom: none;
    }

    .modal-inner { padding: 1.25rem 1rem; }

    .modal-title { font-size: 16px; }

    .detail-grid {
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .detail-item .dl { font-size: 9px; }
    .detail-item .dv { font-size: 12px; }

    .modal-colour-row { gap: 6px; }

    .modal-colour-chip {
      font-size: 11px;
      padding: 3px 8px;
    }

    .section-head { font-size: 9px; }

    .chip { font-size: 11px; padding: 2px 7px; }

    .usage-list li { font-size: 12px; }

    .notes-box { font-size: 12px; }

    .ref-link { font-size: 11px; }

    .manufacturer-row {
      flex-wrap: wrap;
      gap: 6px;
      font-size: 10px;
    }

    .manufacturer-row span:last-child { display: none; }

    footer {
      padding: 1rem;
      font-size: 10px;
    }
  }

  /* ── Very small phones ────────────────────────────────────────── */
  @media (max-width: 380px) {
    .controls { grid-template-columns: 1fr; }
    .search-wrap { grid-column: 1; }
    .card-meta { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<header>
  <div class="header-top">
    <div>
      <div class="site-title">VAG <span>Connector</span> DB</div>
    </div>
    <div class="site-sub">Volkswagen Audi Group · Electrical Connector Reference</div>
  </div>
  <div class="controls">
    <div class="search-wrap">
      <span class="search-icon">⌕</span>
      <input type="text" id="search" placeholder="Search name, part number, application…" oninput="render()">
    </div>
    <select id="filterFamily" onchange="render()">
      <option value="">All families</option>
    </select>
    <select id="filterPins" onchange="render()">
      <option value="">All pin counts</option>
      <option value="1">1 pin</option>
      <option value="2">2 pins</option>
      <option value="3">3 pins</option>
      <option value="4">4 pins</option>
      <option value="5">5 pins</option>
      <option value="6">6 pins</option>
      <option value="8">8 pins</option>
      <option value="10">10+ pins</option>
    </select>
    <select id="filterMfr" onchange="render()">
      <option value="">All manufacturers</option>
    </select>
    <select id="filterColor" onchange="render()">
      <option value="">All colours</option>
      <option value="natural">Natural / cream</option>
      <option value="black">Black</option>
      <option value="grey">Grey</option>
      <option value="white">White</option>
      <option value="green">Green</option>
      <option value="brown">Brown</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="red">Red</option>
      <option value="orange">Orange</option>
      <option value="violet">Violet / purple</option>
      <option value="beige">Beige / tan</option>
    </select>
    <select id="filterPlatform" onchange="render()">
      <option value="">All platforms</option>
      <optgroup label="Volkswagen">
        <option value="Mk1">Mk1 (1974–1984)</option>
        <option value="Mk2">Mk2 (1983–1992)</option>
        <option value="Mk3">Mk3 (1991–2002)</option>
        <option value="Mk4">Mk4 (1997–2010)</option>
        <option value="Mk5">Mk5 (2003–2010)</option>
        <option value="Mk6">Mk6 (2008–2014)</option>
        <option value="Mk7">Mk7 (2012–2020)</option>
        <option value="Mk8">Mk8 (2019–present)</option>
        <option value="PQ25">PQ25 (Polo/Up)</option>
        <option value="MQB">MQB platform</option>
      </optgroup>
      <optgroup label="Audi A3">
        <option value="8L">8L (1996–2003)</option>
        <option value="8P">8P (2003–2013)</option>
        <option value="8V">8V (2012–2020)</option>
      </optgroup>
      <optgroup label="Audi A4 / S4 / RS4">
        <option value="B3">B3 (1986–1994)</option>
        <option value="B4">B4 (1994–2001)</option>
        <option value="B5">B5 (1994–2002)</option>
        <option value="B6">B6 (2000–2006)</option>
        <option value="B7">B7 (2004–2008)</option>
        <option value="B8">B8 (2007–2016)</option>
        <option value="B9">B9 (2015–present)</option>
      </optgroup>
      <optgroup label="Audi A6 / S6">
        <option value="C4">C4 (1994–1997)</option>
        <option value="C5">C5 (1997–2005)</option>
        <option value="C6">C6 (2004–2011)</option>
        <option value="C7">C7 (2011–2018)</option>
      </optgroup>
      <optgroup label="Multi-platform">
        <option value="MLB">MLB platform</option>
        <option value="All VAG">All VAG</option>
      </optgroup>
    </select>
  </div>
  <div class="stats-bar">
    <span>Showing <span class="count" id="shown">0</span> of <span class="count" id="total">0</span> connectors</span>
    <span>·</span>
    <span id="families-count">0 families</span>
    <span>·</span>
    <span style="color: var(--text3)">⚠ Cross-check part numbers against ETKA before ordering</span>
  </div>
</header>

<main>
  <div class="grid" id="grid"></div>
</main>

<footer>
  <span>VAG Connector DB — community reference</span>
  <span>·</span>
  <span>Part numbers verified where possible; always cross-check against ETKA/ElsaWin</span>
  <span>·</span>
  <span>Manufacturers: TE Connectivity / AMP · KOSTAL · Bosch · Yazaki · Hirschmann</span>
</footer>

<div id="modal"></div>

<script>
const connectors = [
  {
    id: 1,
    name: "Micro Timer II — 1-pin (female)",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 1,
    layout: "1×1 single",
    partNumbers: ["1J0 973 701", "1J0 973 701 A"],
    tyco: ["Yazaki 7283-5575-10"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard housing"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Sealed variant"
      }
    ],
    locking: "Primary latch tab",
    sealed: true,
    terminals: ["N 10335706 (0.35–0.5mm²)", "N 10335807 (0.5–1.0mm²)"],
    seals: ["N 017 330 1"],
    usage: [
      "Single-wire sensor earth connections",
      "Coolant level sensor",
      "Oil pressure switch — single wire"
    ],
    notes: "Smallest common VAG connector. Single cavity. Sealed version has integral wire seal per cavity. The secondary lock is not present on 1-pin variants. Very commonly confused with the JPT 1-pin due to similar external size.",
    svgType: "single",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      },
      {
        l: "TE Connectivity: Micro Timer II",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/micro-timer-ii.html"
      }
    ],
    platforms: [
      "Mk3",
      "Mk4",
      "Mk5",
      "Mk6",
      "Mk7",
      "Mk8",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "8L",
      "8P",
      "8V",
      "All VAG"
    ]
  },
  {
    id: 2,
    name: "Micro Timer II — 2-pin",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1J0 973 702", "1J0 906 232"],
    tyco: ["965640-1", "1-1418448-1"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard production"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Later sealed variants"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Secondary lock clip colour on some batches"
      }
    ],
    locking: "Side latch, optional secondary lock",
    sealed: true,
    terminals: ["N 10335706 (0.35–0.5mm²)", "N 10335807 (0.5–1.0mm²)"],
    seals: ["N 017 330 1"],
    usage: [
      "Lambda (O2) sensor signal wire",
      "Coolant temperature sensor (NTC)",
      "Knock sensor (2-pin variant)",
      "Ambient air temperature sensor"
    ],
    notes: "One of the most common engine bay connectors. Secondary lock slides up from below the housing. Wires exit in parallel. The sealed version has a rubberised face seal plus individual wire seals.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      },
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      },
      {
        l: "TE Connectivity: Micro Timer II",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/micro-timer-ii.html"
      }
    ],
    platforms: [
      "Mk3",
      "Mk4",
      "Mk5",
      "Mk6",
      "Mk7",
      "Mk8",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "8L",
      "8P",
      "8V",
      "All VAG"
    ]
  },
  {
    id: 3,
    name: "Micro Timer II — 3-pin",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["1J0 973 703", "1H0 906 233"],
    tyco: ["1-967616-1 (sealed housing)"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard housing"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Sealed variant"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Secondary lock clip on some variants"
      },
      {
        hex: "#c8b030",
        name: "Yellow",
        ctx: "Secondary lock clip on other variants"
      }
    ],
    locking: "Side latch with secondary lock",
    sealed: true,
    terminals: ["N 10335706", "N 10335807"],
    seals: ["N 017 330 1"],
    usage: [
      "Throttle position sensor (TPS)",
      "MAP / boost pressure sensor",
      "Idle air control valve (IACV)",
      "Intake air temperature sensor combined"
    ],
    notes: "Pin 1 (left when facing mating face) is typically signal, pin 2 is ground/earth, pin 3 is 5V supply. Secondary lock is a separate coloured clip that slides into the housing after terminal insertion.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      },
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      }
    ],
    platforms: [
      "Mk3",
      "Mk4",
      "Mk5",
      "Mk6",
      "Mk7",
      "Mk8",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "8L",
      "8P",
      "8V",
      "All VAG"
    ]
  },
  {
    id: 4,
    name: "Micro Timer II — 4-pin",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 4,
    layout: "1×4 inline",
    partNumbers: ["1J0 973 704"],
    tyco: ["965640-3"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Sealed variant"
      }
    ],
    locking: "Side latch with secondary lock",
    sealed: true,
    terminals: ["N 10335706", "N 10335807"],
    seals: ["N 017 330 1"],
    usage: [
      "Combined MAP + IAT sensors (single body)",
      "Some throttle body position sensors",
      "Steering angle sensor (earlier models)"
    ],
    notes: "Same housing series as 2 and 3-pin. Used where two signals and two references are needed in a single connector.",
    svgType: "inline4",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8", "All VAG"]
  },
  {
    id: 5,
    name: "Micro Timer II — 6-pin",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 6,
    layout: "2×3",
    partNumbers: ["1J0 973 706", "3B0 972 706"],
    tyco: ["2-967616-1"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Later/replacement housings"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Secondary lock clip (common)"
      },
      {
        hex: "#c8b030",
        name: "Yellow",
        ctx: "Secondary lock clip (alternate)"
      }
    ],
    locking: "Side latch with secondary lock",
    sealed: true,
    terminals: ["N 10335706", "N 10335807"],
    seals: ["N 017 330 1"],
    usage: [
      "Electronic ignition module (coil pack signal)",
      "Electric power steering angle sensors",
      "Some ABS sensor sub-connections"
    ],
    notes: "2×3 grid layout. Secondary lock is a yellow or green contrasting clip depending on generation. Widely used on 1.8T and 2.0 TDI engine management circuits.",
    svgType: "grid23",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8"]
  },
  {
    id: 6,
    name: "Micro Timer II — 8-pin",
    family: "Micro Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 8,
    layout: "2×4",
    partNumbers: ["1J0 973 708", "3B0 972 708"],
    tyco: ["2-965640-1"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Later production"
      }
    ],
    locking: "Side latch with secondary lock",
    sealed: true,
    terminals: ["N 10335706", "N 10335807"],
    seals: ["N 017 330 1"],
    usage: [
      "Transmission control module sub-loom connectors",
      "DSG/S tronic selector unit",
      "Body control module auxiliary connections"
    ],
    notes: "Less common than the 2, 3, and 6-pin variants. 2×4 layout. Used in TCU looms on automatic gearbox applications.",
    svgType: "grid24",
    refs: [
      {
        l: "Corsa-Technic: Micro Timer II Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8"]
  },
  {
    id: 7,
    name: "Junior Power Timer (JPT) — 1-pin",
    family: "Junior Power Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 1,
    layout: "1×1 single",
    partNumbers: ["1J0 973 081", "893 973 081"],
    tyco: ["1-967067-1"],
    terminalSize: "2.8mm",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Unsealed standard"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Sealed version"
      }
    ],
    locking: "Primary tab latch",
    sealed: false,
    terminals: ["N 10318905 (0.5–1.0mm²)", "N 10319005 (1.0–2.5mm²)"],
    seals: ["N 017 319 1 (sealed version)"],
    usage: ["Single-wire solenoid earth connections", "Relay trigger circuits", "Single-circuit actuators"],
    notes: "Larger 2.8mm pin pitch versus the 1.5mm Micro Timer. Available in sealed and unsealed versions. The unsealed housing is natural; the sealed version is typically grey with integral wire seal boot.",
    svgType: "single",
    refs: [
      {
        l: "Corsa-Technic: Junior Power Timer Series",
        u: "https://www.corsa-technic.com/category.php?category_id=358"
      },
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      }
    ],
    platforms: ["Mk1", "Mk2", "Mk3", "Mk4", "B3", "B4", "B5", "All VAG"]
  },
  {
    id: 8,
    name: "Junior Power Timer (JPT) — 2-pin",
    family: "Junior Power Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["4B0 973 702", "893 973 702", "8D0 973 822 (male)"],
    tyco: ["1-966867-1", "965640-2"],
    terminalSize: "2.8mm",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Unsealed standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Sealed or late production"
      }
    ],
    locking: "Tab latch",
    sealed: false,
    terminals: ["N 10318905", "N 10319005"],
    seals: ["N 017 319 1 (if sealed)"],
    usage: [
      "Fuel injectors (older VAG incl. Bosch Jetronic/EV1 compatible)",
      "Glow plugs",
      "Ignition coils (2-pin variant)",
      "Electric cooling fan relay connections"
    ],
    notes: "Also known colloquially as the 'Jetronic' or 'EV1-style' connector in fuel injector context. Standard 2-pin JPT is NOT the same as the Bosch EV1 injector connector — check housing profile before ordering. Very common repair connector.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Junior Power Timer Series",
        u: "https://www.corsa-technic.com/category.php?category_id=358"
      },
      {
        l: "FCP Euro: VW 2-pin JPT repair harness",
        u: "https://www.fcpeuro.com/products/vw-electrical-connector-vemo-v10830088"
      },
      {
        l: "eBay: VAG 2-pin JPT kit (3waycomponents)",
        u: "https://www.ebay.com/itm/141447056051"
      }
    ],
    platforms: ["Mk1", "Mk2", "Mk3", "Mk4", "B3", "B4", "B5"]
  },
  {
    id: 9,
    name: "Junior Power Timer (JPT) — 3-pin",
    family: "Junior Power Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["1J0 973 703 B", "4B0 973 703"],
    tyco: ["1-966844-1"],
    terminalSize: "2.8mm",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      }
    ],
    locking: "Tab latch with CPA",
    sealed: false,
    terminals: ["N 10318905", "N 10319005"],
    seals: ["N/A unsealed"],
    usage: [
      "Mass airflow (MAF) sensor — early VAG",
      "EGR solenoid valves",
      "Camshaft adjustment solenoids (N205, N208)"
    ],
    notes: "3-pin JPT sees heavy use on MAF sensors in 1.8T and TDI engines (pre-MQS era). The CPA (connector position assurance) clip is a separate snap-on piece.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: Junior Power Timer Series",
        u: "https://www.corsa-technic.com/category.php?category_id=358"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "B4", "B5", "B6"]
  },
  {
    id: 10,
    name: "Junior Power Timer (JPT) — 4-pin",
    family: "Junior Power Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 4,
    layout: "1×4 or 2×2",
    partNumbers: ["3B0 973 704", "7M3 973 704"],
    tyco: ["1-967616-3"],
    terminalSize: "2.8mm",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      }
    ],
    locking: "Tab latch with secondary lock",
    sealed: false,
    terminals: ["N 10318905", "N 10319005"],
    seals: ["N/A unsealed"],
    usage: [
      "Electric window motor connectors",
      "Central locking actuators",
      "Radiator/intercooler fan modules"
    ],
    notes: "Used extensively in body electrical applications. Fan modules on Passat and Sharan use this 4-pin JPT for speed control connections.",
    svgType: "inline4",
    refs: [
      {
        l: "Corsa-Technic: Junior Power Timer Series",
        u: "https://www.corsa-technic.com/category.php?category_id=358"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "B4", "B5"]
  },
  {
    id: 11,
    name: "Standard Power Timer (SPT) — 2-pin",
    family: "Standard Power Timer",
    manufacturer: "TE Connectivity / AMP",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1J0 973 752", "7M0 973 752"],
    tyco: ["SPT-2-BK"],
    terminalSize: "4.8mm / 6.3mm blade",
    gaugeRange: "1.5–6.0 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Most common"
      },
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Earlier production"
      }
    ],
    locking: "Heavy tab latch",
    sealed: false,
    terminals: ["High-current flat blade terminal"],
    seals: ["N/A — not sealed"],
    usage: ["Battery connections", "Starter motor supply", "Alternator output", "High-current fuse box feeds"],
    notes: "Much larger than JPT. Uses flat blade terminals at 4.8mm or 6.3mm pitch. Not suitable for signal applications — power and ground circuits only. Available in 2 and 3-pin configurations.",
    svgType: "power2",
    refs: [
      {
        l: "Corsa-Technic: Junior Power Timer Standard Series",
        u: "https://www.corsa-technic.com/category.php?category_id=359"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8", "All VAG"]
  },
  {
    id: 12,
    name: "MQS (Micro Quadlock System) — 2-pin",
    family: "MQS",
    manufacturer: "TE Connectivity",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1J0 973 302", "1K0 972 702"],
    tyco: ["927778-2", "967587-1"],
    terminalSize: "0.63mm (MQS)",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "General signal circuits"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Later/MQB variants"
      },
      {
        hex: "#c8c820",
        name: "Yellow",
        ctx: "Airbag circuits — yellow CPA lever"
      }
    ],
    locking: "Quadlock positive locking lever (blue CPA)",
    sealed: true,
    terminals: ["000 979 023 (MQS socket)", "000 979 024 (MQS pin)"],
    seals: ["N 017 395 3 (MQS wire seal)"],
    usage: ["Airbag yellow connector sub-circuits", "Control module data lines", "Low-current signal sensors"],
    notes: "MQS uses a 0.63mm square pin — far finer than any other VAG connector. Requires dedicated MQS crimp tool (Rennsteig PEW12 or VAG 1-1978). Blue CPA lever must click fully before mating counts as complete. Do NOT use standard 1.5mm tools.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: MQS Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      },
      {
        l: "TE Connectivity: MQS Interconnection System",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/mqs.html"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "Mk8", "B5", "B6", "B7", "B8", "B9", "8L", "8P", "8V", "MQB", "MLB"]
  },
  {
    id: 13,
    name: "MQS — 4-pin",
    family: "MQS",
    manufacturer: "TE Connectivity",
    pins: 4,
    layout: "2×2",
    partNumbers: ["1K0 972 704", "3C0 972 704"],
    tyco: ["927778-4"],
    terminalSize: "0.63mm (MQS)",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "General use"
      },
      {
        hex: "#c8c820",
        name: "Yellow",
        ctx: "Airbag CPA lever"
      },
      {
        hex: "#3a6aaa",
        name: "Blue",
        ctx: "Data line CPA lever"
      }
    ],
    locking: "Quadlock positive locking lever",
    sealed: true,
    terminals: ["000 979 023"],
    seals: ["N 017 395 3"],
    usage: [
      "Body control module sub-connectors",
      "Comfort system CAN nodes",
      "Immobiliser/reader coil connections"
    ],
    notes: "2×2 grid. CPA lever colour varies by application — yellow on airbag circuits, blue on general data lines. Always confirm the lever is fully seated; a partially engaged MQS will fail intermittently.",
    svgType: "grid22",
    refs: [
      {
        l: "TE Connectivity: MQS Interconnection System",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/mqs.html"
      },
      {
        l: "Corsa-Technic: MQS Series",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8"]
  },
  {
    id: 14,
    name: "MQS — 6-pin",
    family: "MQS",
    manufacturer: "TE Connectivity",
    pins: 6,
    layout: "2×3",
    partNumbers: ["1K0 972 706", "6Q0 972 706"],
    tyco: ["967616-1 (MQS sealed)"],
    terminalSize: "0.63mm (MQS)",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Some variants"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Body loom colour-coded connectors — e.g. instrument cluster"
      },
      {
        hex: "#3a6aaa",
        name: "Blue",
        ctx: "Some sub-loom colour coding"
      }
    ],
    locking: "Quadlock lever with CPA",
    sealed: true,
    terminals: ["000 979 023"],
    seals: ["N 017 395 3"],
    usage: [
      "Instrument cluster sub-connector",
      "Radio / head unit auxiliary signals",
      "Airbag ECU auxiliary ports"
    ],
    notes: "2×3 layout. Very common on MQS-based instrument cluster looms (Mk4 Golf, Mk4 Bora, TT Mk1). Pins are keyed — the housing has a unique polarisation shape per application to prevent cross-mating.",
    svgType: "grid23",
    refs: [
      {
        l: "TE Connectivity: MQS Interconnection System",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/mqs.html"
      },
      {
        l: "Corsa-Technic: MQS 6-Way Kit",
        u: "https://www.corsa-technic.com/category.php?category_id=357"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8", "8L", "8P"]
  },
  {
    id: 15,
    name: "MQS — 8-pin",
    family: "MQS",
    manufacturer: "TE Connectivity",
    pins: 8,
    layout: "2×4",
    partNumbers: ["1K0 972 708", "3C0 972 708"],
    tyco: ["967616-2"],
    terminalSize: "0.63mm (MQS)",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      }
    ],
    locking: "Quadlock lever",
    sealed: true,
    terminals: ["000 979 023"],
    seals: ["N 017 395 3"],
    usage: ["ECU multi-function sensor sub-connector", "Door module CAN + signal distribution"],
    notes: "Used where multiple low-current data lines are grouped. Physically similar to 6-pin but one row longer.",
    svgType: "grid24",
    refs: [
      {
        l: "TE Connectivity: MQS Interconnection System",
        u: "https://www.te.com/en/products/connectors/automotive-connectors/intersection/mqs.html"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8"]
  },
  {
    id: 16,
    name: "AMP Superseal 1.5 — 2-pin",
    family: "AMP Superseal 1.5",
    manufacturer: "TE Connectivity / AMP",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1H0 973 202", "357 972 762"],
    tyco: ["282087-1", "776432-1"],
    terminalSize: "1.5mm sealed",
    gaugeRange: "0.5–1.5 mm²",
    colors: [
      {
        hex: "#888",
        name: "Grey",
        ctx: "Housing body"
      },
      {
        hex: "#cc2222",
        name: "Red",
        ctx: "Secondary lock strip — always red on Superseal"
      }
    ],
    locking: "Red secondary lock strip (must be fully engaged)",
    sealed: true,
    terminals: ["1-967067-1 (Superseal socket)", "353346-1 (Superseal pin)"],
    seals: ["Integral cavity seal per wire"],
    usage: [
      "ABS wheel speed sensors",
      "Outside air temperature sensor",
      "Washer fluid level sensor",
      "Boot/trunk lighting switches"
    ],
    notes: "IP67 rated. Red secondary lock is a strip that slides across the back of the connector — must click fully. Available in grey (standard) and colour variants. Individual wire seals are pre-fitted in each cavity and cannot be omitted.",
    svgType: "superseal2",
    refs: [
      {
        l: "Corsa-Technic: Superseal 1.5 Series",
        u: "https://www.corsa-technic.com/category.php?manufacturer_id=47&amp;category_id=125"
      },
      {
        l: "3waycomponents: VAG Superseal connectors",
        u: "https://3waycomponents.co.uk/1J0973802-VW-Audi-1.5mm-2-Way-Sealed-Male-JPT-Connector-Kit"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "All VAG"]
  },
  {
    id: 17,
    name: "AMP Superseal 1.5 — 3-pin",
    family: "AMP Superseal 1.5",
    manufacturer: "TE Connectivity / AMP",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["1H0 973 703", "357 972 703"],
    tyco: ["282104-1"],
    terminalSize: "1.5mm sealed",
    gaugeRange: "0.5–1.5 mm²",
    colors: [
      {
        hex: "#888",
        name: "Grey",
        ctx: "Housing body"
      },
      {
        hex: "#cc2222",
        name: "Red",
        ctx: "Secondary lock strip"
      }
    ],
    locking: "Red secondary lock",
    sealed: true,
    terminals: ["1-967067-1 (socket)", "353346-1 (pin)"],
    seals: ["Integral cavity seal"],
    usage: [
      "Hall effect sensors (cam/crank on external mounts)",
      "Park distance control sensors",
      "Rain/light sensor connections"
    ],
    notes: "IP67. The 3-pin Superseal 1.5 is widely used on park sensors (PDC) where weather resistance is critical. Same tooling as 2-pin.",
    svgType: "superseal3",
    refs: [
      {
        l: "Corsa-Technic: Superseal 1.5 Series",
        u: "https://www.corsa-technic.com/category.php?manufacturer_id=47&amp;category_id=125"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7"]
  },
  {
    id: 18,
    name: "AMP Superseal 1.5 — 4-pin",
    family: "AMP Superseal 1.5",
    manufacturer: "TE Connectivity / AMP",
    pins: 4,
    layout: "2×2",
    partNumbers: ["1J0 973 704 A", "357 972 704"],
    tyco: ["282104-2"],
    terminalSize: "1.5mm sealed",
    gaugeRange: "0.5–1.5 mm²",
    colors: [
      {
        hex: "#888",
        name: "Grey",
        ctx: "Housing body"
      },
      {
        hex: "#cc2222",
        name: "Red",
        ctx: "Secondary lock strip"
      }
    ],
    locking: "Red secondary lock",
    sealed: true,
    terminals: ["1-967067-1", "353346-1"],
    seals: ["Integral cavity seal"],
    usage: [
      "Electric window motors (external door applications)",
      "Door mirror adjustment motors",
      "Early ESP/ABS sensor combined harness"
    ],
    notes: "Used where four weatherproofed circuits are needed. The 4-pin configuration is less common than 2 or 3-pin Superseal. 2×2 grid layout.",
    svgType: "superseal4",
    refs: [
      {
        l: "Corsa-Technic: Superseal 1.5 Series",
        u: "https://www.corsa-technic.com/category.php?manufacturer_id=47&amp;category_id=125"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "B5", "B6", "B7"]
  },
  {
    id: 19,
    name: "AMP Superseal 1.0 — 2-pin",
    family: "AMP Superseal 1.0",
    manufacturer: "TE Connectivity / AMP",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["7L0 973 802", "7L6 973 802"],
    tyco: ["282087-2 (1.0 series)"],
    terminalSize: "1.0mm (smaller than 1.5 series)",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard Superseal 1.0"
      }
    ],
    locking: "Integral lock",
    sealed: true,
    terminals: ["Superseal 1.0 socket terminal"],
    seals: ["Integral per cavity"],
    usage: [
      "Wire-to-board connections on ECUs",
      "Under-hood ECU connectors (Bosch Motronic)",
      "Some wheel speed sensor variants"
    ],
    notes: "The 1.0 series is mechanically smaller than the 1.5 series and uses a different (smaller) terminal. The two series are not intermatable. Common on VAG ECU board connections.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Superseal 1.0 Series",
        u: "https://www.corsa-technic.com/category.php?manufacturer_id=47&amp;category_id=125"
      }
    ],
    platforms: ["Mk4", "Mk5", "B5", "B6", "B7", "B8"]
  },
  {
    id: 20,
    name: "Econoseal III — 6-pin",
    family: "Econoseal III",
    manufacturer: "TE Connectivity / AMP",
    pins: 6,
    layout: "2×3",
    partNumbers: ["6N0 972 706", "3C0 972 706"],
    tyco: ["172169-1"],
    terminalSize: "2.8mm Econoseal",
    gaugeRange: "0.35–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Some variants"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Driver door loom colour code on many VAG models"
      },
      {
        hex: "#8b4a1a",
        name: "Brown",
        ctx: "Passenger door loom colour code"
      },
      {
        hex: "#c8c820",
        name: "Yellow",
        ctx: "Rear door loom colour code (some platforms)"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Later/replacement housings"
      }
    ],
    locking: "Side tab with CPA",
    sealed: true,
    terminals: ["000 979 009 A (signal)", "000 979 131 A (power)"],
    seals: ["N 017 330 1 (wire seal)"],
    usage: [
      "Door wiring loom connector — body to door",
      "Dash-to-engine loom interface",
      "Tailgate multi-function connector"
    ],
    notes: "Econoseal III is the workhorse body connector on Mk3, Mk4, and Mk5 platforms. The CPA clip is a separate U-shaped piece that snaps over both halves once mated. Wires exit at 90° (lateral) in most door applications.",
    svgType: "grid23",
    refs: [
      {
        l: "Corsa-Technic: Econoseal III Wire-to-Wire",
        u: "https://www.corsa-technic.com/category.php?category_id=355"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "B3", "B4", "B5", "B6", "8L"]
  },
  {
    id: 21,
    name: "Econoseal III — 8-pin",
    family: "Econoseal III",
    manufacturer: "TE Connectivity / AMP",
    pins: 8,
    layout: "2×4",
    partNumbers: ["6N0 972 708", "7M0 972 708"],
    tyco: ["172169-2"],
    terminalSize: "2.8mm Econoseal",
    gaugeRange: "0.35–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Driver door — Mk4/Mk5 loom coding"
      },
      {
        hex: "#8b4a1a",
        name: "Brown",
        ctx: "Passenger door — loom coding"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Some applications"
      }
    ],
    locking: "Side tab with CPA",
    sealed: true,
    terminals: ["000 979 009 A", "000 979 131 A"],
    seals: ["N 017 330 1"],
    usage: [
      "Door wiring main connector (Mk4 Golf, Passat B5, TT Mk1)",
      "Interior lighting module supply",
      "Dash-to-engine bulkhead multi-pin"
    ],
    notes: "Very common Mk4 era door connector. CPA clip is blue on most OEM harnesses. 2×4 layout. Watch for corrosion on door-side connectors — moisture ingress is common.",
    svgType: "grid24",
    refs: [
      {
        l: "Corsa-Technic: Econoseal III Wire-to-Wire",
        u: "https://www.corsa-technic.com/category.php?category_id=355"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "B3", "B4", "B5", "8L"]
  },
  {
    id: 22,
    name: "Econoseal III — 12-pin",
    family: "Econoseal III",
    manufacturer: "TE Connectivity / AMP",
    pins: 12,
    layout: "3×4",
    partNumbers: ["6N0 972 712", "3B0 972 712"],
    tyco: ["172169-3"],
    terminalSize: "2.8mm Econoseal",
    gaugeRange: "0.35–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Newer variants"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Driver door on larger models"
      },
      {
        hex: "#8b4a1a",
        name: "Brown",
        ctx: "Passenger door on larger models"
      }
    ],
    locking: "Side tab with CPA",
    sealed: true,
    terminals: ["000 979 009 A", "000 979 131 A"],
    seals: ["N 017 330 1"],
    usage: [
      "Door main loom connector on larger models (Passat, Touareg)",
      "Instrument cluster main power/signal connector",
      "Centre console combined connector"
    ],
    notes: "3×4 layout. Used where the door has a full feature set (power window, mirrors, speaker, puddle light, latch sensor). Often found in a housing with strain-relief boot.",
    svgType: "grid34",
    refs: [
      {
        l: "Corsa-Technic: Econoseal III Wire-to-Wire",
        u: "https://www.corsa-technic.com/category.php?category_id=355"
      }
    ],
    platforms: ["Mk4", "Mk5", "B5", "B6", "C5", "C6"]
  },
  {
    id: 23,
    name: "KOSTAL SLK 2.8 — 2-pin",
    family: "KOSTAL SLK 2.8",
    manufacturer: "KOSTAL",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["9441291", "09 4412 91"],
    tyco: ["N/A — KOSTAL proprietary"],
    terminalSize: "2.8mm KOSTAL SLK",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "All KOSTAL SLK housings are black"
      }
    ],
    locking: "Secondary lock, multiple keying codes (A, A1, B, etc.)",
    sealed: true,
    terminals: ["SLK28.SWS-SKT (socket)", "SLK28.SWS-PIN (pin)"],
    seals: ["SLK28-SL (loose wire seal, 5.2mm cavity)"],
    usage: ["Injection pressure sensor", "Fuel pressure regulator valve", "Intake manifold flap actuator"],
    notes: "KOSTAL SLK connectors come in multiple keying codes to prevent incorrect mating — code A is most common. Always identify the keying before ordering a replacement. Not intermateable between codes.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL SLK 2.8 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=371"
      },
      {
        l: "Warwick Test Supplies: KOSTAL SLK 2.8 kit",
        u: "https://warwickts.com/2040/Kostal-3way-Auto-Connector-Kit-WKCK-3"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "B6", "B7", "B8", "8P"]
  },
  {
    id: 24,
    name: "KOSTAL SLK 2.8 — 3-pin (Code A)",
    family: "KOSTAL SLK 2.8",
    manufacturer: "KOSTAL",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["9441391", "09 4413 91"],
    tyco: ["1-968408-2 (mating male)"],
    terminalSize: "2.8mm KOSTAL SLK",
    gaugeRange: "0.5–1.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard KOSTAL SLK housing"
      }
    ],
    locking: "Secondary lock (CPA available)",
    sealed: true,
    terminals: ["22140492060 (socket, tin-plated)", "10124499140 (pin, silver-plated)"],
    seals: ["10800444523 (1.5–2.5mm²)"],
    usage: [
      "Mass airflow (MAF) sensor — post-2000 VAG",
      "Fuel rail pressure sensor (TDI common rail)",
      "Coolant temperature sensor combined signal"
    ],
    notes: "Very common on TDI and FSI common-rail engines. The 3-pin SLK 2.8 Code A is the MAF sensor connector on most Mk5/Mk6 Golf TDI. Cross-references with Hirschmann SealStar 2.8. Always match the keying code.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL SLK 2.8 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=371"
      },
      {
        l: "Warwick Test Supplies: SLK 2.8 Code A",
        u: "https://warwickts.com/2040/Kostal-3way-Auto-Connector-Kit-WKCK-3"
      },
      {
        l: "Warwick Test Supplies: SLK 2.8 Code A1",
        u: "https://warwickts.com/4894/Kostal-3way-Code-A1-Auto-Connector-Kit"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P", "8V", "MQB"]
  },
  {
    id: 25,
    name: "KOSTAL SLK 2.8 — 4-pin",
    family: "KOSTAL SLK 2.8",
    manufacturer: "KOSTAL",
    pins: 4,
    layout: "2×2",
    partNumbers: ["9441491", "09 4414 91"],
    tyco: ["N/A"],
    terminalSize: "2.8mm KOSTAL SLK",
    gaugeRange: "0.5–1.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard KOSTAL SLK"
      }
    ],
    locking: "Secondary lock",
    sealed: true,
    terminals: ["SLK28.SWS-SKT", "SLK28.SWS-PIN"],
    seals: ["SLK28-SL"],
    usage: [
      "Electric power steering torque sensor",
      "High-pressure fuel pump (4-pin HPFP variants)",
      "Some combination sensors requiring 4 circuits"
    ],
    notes: "2×2 grid. Uses same terminal and seal as 2 and 3-pin SLK. Keying can differ — always confirm code before sourcing.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL SLK 2.8 4-Way",
        u: "https://www.corsa-technic.com/category.php?category_id=371"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P"]
  },
  {
    id: 26,
    name: "KOSTAL MLK 1.2 SWS — 2-pin",
    family: "KOSTAL MLK 1.2",
    manufacturer: "KOSTAL",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["10531129", "10092983"],
    tyco: ["N/A — KOSTAL proprietary"],
    terminalSize: "1.2mm MLK",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Most common"
      },
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Some unsealed MLK variants"
      }
    ],
    locking: "Locking lance primary, optional secondary",
    sealed: true,
    terminals: ["MLK12.SWS-SKT3 (socket)", "MLK12.SWS-PIN (pin)"],
    seals: ["MLK12.SWS-SL (wire seal)"],
    usage: [
      "Very low current signal wiring",
      "Sensor shielded cable connections",
      "Some DSG solenoid signal circuits"
    ],
    notes: "MLK 1.2 is extremely fine — 1.2mm pitch. Not to be confused with MQS (0.63mm). Uses a locking lance rather than a quadlock mechanism. Common on newer (MQB platform) models alongside MQS.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL MLK 1.2 SWS Series",
        u: "https://www.corsa-technic.com/category.php?category_id=255"
      }
    ],
    platforms: ["Mk7", "Mk8", "B9", "8V", "MQB", "MLB"]
  },
  {
    id: 27,
    name: "KOSTAL MLK 1.2 SWS — 5-pin",
    family: "KOSTAL MLK 1.2",
    manufacturer: "KOSTAL",
    pins: 5,
    layout: "1×5 inline",
    partNumbers: ["10095335"],
    tyco: ["N/A"],
    terminalSize: "1.2mm MLK",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard MLK 1.2"
      }
    ],
    locking: "Locking lance",
    sealed: true,
    terminals: ["MLK12.SWS-SKT3", "MLK12.SWS-PIN"],
    seals: ["MLK12.SWS-SL"],
    usage: [
      "Steering column multi-function signal",
      "Matrix/LED headlight control sub-connector",
      "Gateway module low-current ports"
    ],
    notes: "Code A keying. 1×5 inline. Part of the growing KOSTAL MLK family seen increasingly on MQB and MLB platforms replacing older Micro-Timer in some applications.",
    svgType: "inline5",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL MLK 1.2 SWS Series",
        u: "https://www.corsa-technic.com/category.php?category_id=255"
      }
    ],
    platforms: ["Mk7", "Mk8", "B9", "8V", "MQB", "MLB"]
  },
  {
    id: 28,
    name: "Quadlock ISO — 24-pin (OEM head unit)",
    family: "Quadlock ISO",
    manufacturer: "TE Connectivity / Blaupunkt",
    pins: 24,
    layout: "4 blocks of 6 (2×3 each)",
    partNumbers: ["7L6 035 195", "1K8 035 195", "3C8 035 195"],
    tyco: ["N/A — ISO proprietary"],
    terminalSize: "1.5mm signal / 2.8mm power",
    gaugeRange: "0.35–2.5 mm²",
    colors: [
      {
        hex: "#888",
        name: "Grey",
        ctx: "Block A — power/ground"
      },
      {
        hex: "#3a6aaa",
        name: "Blue",
        ctx: "Block B — audio outputs"
      },
      {
        hex: "#3a8c3a",
        name: "Green",
        ctx: "Block C — steering wheel controls"
      },
      {
        hex: "#c8b030",
        name: "Yellow",
        ctx: "Block D — CAN bus / data"
      }
    ],
    locking: "Housing snap with ISO tab",
    sealed: false,
    terminals: ["000 979 009 A", "000 979 131 A"],
    seals: ["N/A — interior application"],
    usage: [
      "OEM VW/Audi head unit main connector (all models with factory radio)",
      "ISO-to-DIN aftermarket adapter harnesses",
      "Amplifier integration interface"
    ],
    notes: "Block A (grey) = power/ground + accessories. Block B (blue) = speaker outputs (8 channels). Block C (green) = steering wheel control + phone. Block D (yellow) = CAN bus lines + vehicle speed signal. Pin orientation: key slot at bottom when facing socket. Aftermarket ISO harnesses (e.g. Metra, SCOSCHE) re-route blocks A+B to standard ISO.",
    svgType: "quadlock",
    refs: [
      {
        l: "FCP Euro: VW Electrical Connectors",
        u: "https://www.fcpeuro.com/Volkswagen-parts/Electrical-Connectors/"
      }
    ],
    platforms: [
      "Mk3",
      "Mk4",
      "Mk5",
      "Mk6",
      "Mk7",
      "Mk8",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "8L",
      "8P",
      "8V",
      "All VAG"
    ]
  },
  {
    id: 29,
    name: "FAKRA SMB — GPS antenna (code Z, beige)",
    family: "FAKRA / HSD",
    manufacturer: "Rosenberger / Various",
    pins: 1,
    layout: "Coaxial single",
    partNumbers: ["5K0 973 735", "000 051 446 Z"],
    tyco: ["N/A — FAKRA standard"],
    terminalSize: "SMB coaxial",
    gaugeRange: "RG-174 / RG-316 coax",
    colors: [
      {
        hex: "#c8b882",
        name: "Beige",
        ctx: "Code Z — GPS/GNSS (DIN 72594 standardised)"
      }
    ],
    locking: "Snap latch",
    sealed: true,
    terminals: ["Coax centre pin"],
    seals: ["Integral weatherproof boot"],
    usage: ["GPS antenna input (navigation module)", "GNSS receiver connection"],
    notes: "FAKRA colour coding is standardised by DIN 72594. Code Z (beige) is GPS only. Connectors are mechanically coded by colour — a GPS plug cannot mate with a DAB socket. Torque the snap latch fully until it clicks.",
    svgType: "fakra",
    refs: [
      {
        l: "FCP Euro: 000 051 446 Z GPS antenna",
        u: "https://www.fcpeuro.com/products/audi-vw-gps-antenna-adapter-genuine-vw-audi-000051446z"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "Mk8", "B7", "B8", "B9", "8P", "8V", "MQB", "MLB"]
  },
  {
    id: 30,
    name: "FAKRA SMB — DAB/FM antenna (code B, blue)",
    family: "FAKRA / HSD",
    manufacturer: "Rosenberger / Various",
    pins: 1,
    layout: "Coaxial single",
    partNumbers: ["000 051 446 B", "5N0 035 501"],
    tyco: ["N/A"],
    terminalSize: "SMB coaxial",
    gaugeRange: "RG-174 coax",
    colors: [
      {
        hex: "#3a6aaa",
        name: "Blue",
        ctx: "Code B — DAB/FM antenna (DIN 72594 standardised)"
      }
    ],
    locking: "Snap latch",
    sealed: true,
    terminals: ["Coax centre pin"],
    seals: ["Integral boot"],
    usage: ["DAB digital radio antenna", "FM antenna input on later models"],
    notes: "Code B (blue) is the designated DAB and FM antenna FAKRA code. Physically cannot mate with code Z GPS. Active antennas on glass typically terminate in FAKRA code B.",
    svgType: "fakra",
    refs: [
      {
        l: "FCP Euro: VW Electrical Connectors",
        u: "https://www.fcpeuro.com/Volkswagen-parts/Electrical-Connectors/"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "Mk8", "B7", "B8", "B9", "8P", "8V"]
  },
  {
    id: 31,
    name: "FAKRA SMB — video/camera (code D, grey)",
    family: "FAKRA / HSD",
    manufacturer: "Rosenberger / Various",
    pins: 1,
    layout: "Coaxial single",
    partNumbers: ["000 051 446 D"],
    tyco: ["N/A"],
    terminalSize: "SMB coaxial",
    gaugeRange: "RG-174 coax",
    colors: [
      {
        hex: "#555",
        name: "Dark grey",
        ctx: "Code D — composite video (DIN 72594 standardised)"
      }
    ],
    locking: "Snap latch",
    sealed: true,
    terminals: ["Coax centre pin"],
    seals: ["Integral boot"],
    usage: ["Reversing/rear camera video signal", "Front camera composite video", "Display unit video input"],
    notes: "Code D (grey) is the video signal FAKRA code. Reverse camera systems on factory Discover Media/Pro units use code D coax. Some aftermarket camera adaptors convert between FAKRA and standard RCA.",
    svgType: "fakra",
    refs: [
      {
        l: "FCP Euro: VW Electrical Connectors",
        u: "https://www.fcpeuro.com/Volkswagen-parts/Electrical-Connectors/"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "Mk8", "B7", "B8", "B9"]
  },
  {
    id: 32,
    name: "Bosch EV1 (Jetronic) — 2-pin injector",
    family: "Bosch EV1 / Jetronic",
    manufacturer: "Bosch",
    pins: 2,
    layout: "1×2 inline (oval housing)",
    partNumbers: ["8D0 973 822 (male)", "4B0 973 702"],
    tyco: ["N/A — Bosch standard"],
    terminalSize: "2.8mm Bosch Jetronic",
    gaugeRange: "0.5–1.0 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Early production"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Later/replacement"
      }
    ],
    locking: "Tab latch",
    sealed: false,
    terminals: ["Bosch EV1 terminal"],
    seals: ["N/A unsealed"],
    usage: [
      "Fuel injectors — all Bosch Jetronic/EV1 applications (1.8T, 2.0 8V, VR6, TDI older)",
      "Common across VAG, Bosch-platform engines worldwide"
    ],
    notes: "EV1 (sometimes called 'Jetronic') is an industry-wide Bosch standard. The oval housing profile distinguishes it from the rectangular JPT 2-pin. Not intermateable with JPT despite similar pin size. Available as repair pigtails pre-terminated from most VAG specialists.",
    svgType: "ev1",
    refs: [
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      },
      {
        l: "Corsa-Technic: JPT / EV1 pigtails",
        u: "https://www.corsa-technic.com/category.php?category_id=358"
      }
    ],
    platforms: ["Mk1", "Mk2", "Mk3", "Mk4", "B3", "B4", "B5"]
  },
  {
    id: 33,
    name: "Bosch EV6 (USCAR) — 2-pin injector",
    family: "Bosch EV6 / USCAR",
    manufacturer: "Bosch",
    pins: 2,
    layout: "1×2 inline (compact rectangular)",
    partNumbers: ["06F 906 997 A", "06J 906 997"],
    tyco: ["N/A — Bosch standard"],
    terminalSize: "2.8mm EV6",
    gaugeRange: "0.35–0.75 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard EV6"
      }
    ],
    locking: "Clip-over retainer",
    sealed: false,
    terminals: ["EV6/USCAR socket terminal"],
    seals: ["N/A"],
    usage: [
      "Fuel injectors — 2.0 FSI, 2.0 TFSI, 1.4 TSI, all EA113/EA888 direct injection engines",
      "Replaces EV1 on higher-pressure GDI applications"
    ],
    notes: "EV6 (USCAR-2 standard) replaced EV1 on all modern FSI/TSI/TFSI engines. Smaller and lighter than EV1. Not intermateable with EV1. Widely available as aftermarket injector connectors. Same physical connector used on most modern petrol injectors worldwide.",
    svgType: "ev6",
    refs: [
      {
        l: "Connector ID: VW Connectors",
        u: "https://www.connectorid.com/collections/vw-connectors"
      },
      {
        l: "FCP Euro: Audi VW Ignition Coil Connector",
        u: "https://www.fcpeuro.com/products/audi-vw-ignition-coil-connector-genuine-audi-vw-8k0973724"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P", "8V"]
  },
  {
    id: 34,
    name: "OBD-II DLC — 16-pin (SAE J1962)",
    family: "OBD Diagnostic",
    manufacturer: "Multiple (JAE / Souriau)",
    pins: 16,
    layout: "2×8 trapezoid",
    partNumbers: ["1J0 973 716", "8J0 973 716"],
    tyco: ["N/A — SAE J1962 standard"],
    terminalSize: "Mixed 1.5mm / 2.8mm",
    gaugeRange: "0.35–1.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standardised black per SAE J1962"
      }
    ],
    locking: "Mechanical fit only — no latch",
    sealed: false,
    terminals: ["OBD-II mixed terminals"],
    seals: ["N/A — interior dry location"],
    usage: [
      "Diagnostic port — all VAG vehicles 1996+ (EU: 2001+ Type Approval)",
      "VCDS / Ross-Tech interface connection",
      "OBD-II generic scanner connection"
    ],
    notes: "Pin 16 = +12V battery. Pin 4/5 = chassis/signal earth. Pin 6 = CAN-H. Pin 14 = CAN-L. Pins 7/15 = K-Line (ISO 9141 / KWP2000 on older vehicles). The DLC port is typically located under the dash left of the steering column. On pre-OBD2 VAGs, a 2×2 diagnostic port was used instead.",
    svgType: "obd16",
    refs: [
      {
        l: "Ross-Tech Wiki: OBD-II DLC",
        u: "https://wiki.ross-tech.com/wiki/index.php/VAG-COM-FAQ-1.1"
      },
      {
        l: "FCP Euro: VW Electrical Connectors",
        u: "https://www.fcpeuro.com/Volkswagen-parts/Electrical-Connectors/"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "Mk8", "B5", "B6", "B7", "B8", "B9", "8L", "8P", "8V", "All VAG"]
  },
  {
    id: 35,
    name: "VAG 2×2 diagnostic port (pre-OBD)",
    family: "OBD Diagnostic",
    manufacturer: "VAG proprietary",
    pins: 4,
    layout: "2×2",
    partNumbers: ["N/A — varies by model"],
    tyco: ["N/A"],
    terminalSize: "2.8mm blade",
    gaugeRange: "0.5–1.0 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard pre-OBD port"
      }
    ],
    locking: "None — friction fit",
    sealed: false,
    terminals: ["Flat blade terminals"],
    seals: ["N/A"],
    usage: [
      "VAG proprietary diagnostic access — pre-1996 vehicles",
      "Found on MkII and MkIII Golf, early Audi 80/A4",
      "VAG-COM and older Digifant ECUs"
    ],
    notes: "The pre-OBD 2×2 connector is VAG-proprietary, not part of any universal standard. It provides K-Line, earth, and +12V. Ross-Tech interfaces support it via an adapter cable. If only 3 of 4 pins have wires, the ECU may not support diagnostics.",
    svgType: "grid22",
    refs: [
      {
        l: "Ross-Tech: Pre-OBD 2x2 diagnostic port",
        u: "https://www.ross-tech.com/vag-com/faq_1.php"
      }
    ],
    platforms: ["Mk1", "Mk2", "Mk3", "B3", "B4"]
  },
  {
    id: 36,
    name: "MCP 2.8 — 18-pin ECU connector",
    family: "MCP (Multiple Contact Point)",
    manufacturer: "TE Connectivity / AMP",
    pins: 18,
    layout: "3×6",
    partNumbers: ["357 972 051", "1J0 906 234 A"],
    tyco: ["MCP-2.8 series"],
    terminalSize: "2.8mm MCP flat",
    gaugeRange: "0.35–2.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Housing body"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Some variants with strain relief boot"
      }
    ],
    locking: "Heavy latch with secondary lock bar",
    sealed: false,
    terminals: ["000 979 009 A", "000 979 131 A"],
    seals: ["N/A — interior"],
    usage: [
      "ECU primary connector (Digifant, Simos, Magneti-Marelli)",
      "Older Motronic ECU input connectors",
      "ABS control module main connector (early models)"
    ],
    notes: "MCP uses 2.8mm flat blade contacts but in a much higher density arrangement than JPT. Common secondary lock bar prevents partial engagement. Found on older (pre-2000) engine and ABS ECUs. Do not confuse with the similarly-sized Econoseal.",
    svgType: "grid36",
    refs: [
      {
        l: "Corsa-Technic: MCP 2.8 Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=442"
      }
    ],
    platforms: ["Mk2", "Mk3", "Mk4", "B3", "B4", "B5"]
  },
  {
    id: 37,
    name: "Bosch Motronic ECU — 55-pin",
    family: "Bosch Motronic ECU",
    manufacturer: "Bosch",
    pins: 55,
    layout: "Variable (5 rows)",
    partNumbers: ["N/A — varies by ECU generation"],
    tyco: ["Bosch Compact 1.5"],
    terminalSize: "1.5mm Bosch Compact",
    gaugeRange: "0.35–1.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Bosch Compact 55-pin housing"
      }
    ],
    locking: "Lever-assist secondary lock",
    sealed: false,
    terminals: ["Bosch Compact 1.5 terminal"],
    seals: ["N/A — ECU is internally sealed"],
    usage: [
      "Bosch Motronic ME7.x ECU main harness connector (1.8T, 2.0 FSI early)",
      "Found on: 06A 906 032, 06A 906 033 and related ECU part numbers"
    ],
    notes: "The Bosch 55-pin Compact connector is specific to ME7.x Motronic ECUs. Lever assistance (pull lever before mating, push to lock) is essential — do not force without engaging lever. Very important for 1.8T engine swaps.",
    svgType: "ecu55",
    refs: [
      {
        l: "Corsa-Technic: ECU/PCM Connectors",
        u: "https://www.corsa-technic.com/category.php?category_id=94"
      }
    ],
    platforms: ["Mk4", "Mk5", "B5", "B6", "8L", "8P"]
  },
  {
    id: 38,
    name: "Bosch Motronic ECU — 60-pin",
    family: "Bosch Motronic ECU",
    manufacturer: "Bosch",
    pins: 60,
    layout: "Variable (5 rows)",
    partNumbers: ["N/A — varies by ECU"],
    tyco: ["Bosch Compact 1.5 / 60-way"],
    terminalSize: "1.5mm Bosch Compact",
    gaugeRange: "0.35–1.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Bosch Compact 60-pin housing"
      }
    ],
    locking: "Lever-assist secondary lock",
    sealed: false,
    terminals: ["Bosch Compact 1.5 terminal"],
    seals: ["N/A"],
    usage: ["Bosch EDC16 TDI ECU connector (2.0 TDI, 1.9 TDI PD)", "ME9.x petrol ECU variants"],
    notes: "EDC16 and ME9 ECUs use a 60-pin Compact connector. Same lever mechanism as 55-pin. Pins are numbered from top-left when facing the harness side. Pin 1 is typically the reference voltage or earth.",
    svgType: "ecu60",
    refs: [
      {
        l: "Corsa-Technic: ECU/PCM Connectors",
        u: "https://www.corsa-technic.com/category.php?category_id=94"
      }
    ],
    platforms: ["Mk5", "Mk6", "B7", "B8", "8P"]
  },
  {
    id: 39,
    name: "VAG coding plug — 12-pin",
    family: "VAG Coding Plug",
    manufacturer: "VAG proprietary",
    pins: 12,
    layout: "2×6",
    partNumbers: ["1H0 971 951", "7A0 971 951"],
    tyco: ["N/A"],
    terminalSize: "1.5mm blade",
    gaugeRange: "N/A — bridging only",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Coding plug housing with visible bridge wires"
      }
    ],
    locking: "Friction fit into ECU socket",
    sealed: false,
    terminals: ["Bridging terminals (short circuits between cavities)"],
    seals: ["N/A"],
    usage: [
      "Tells ECU which options are installed (AC, heated seats, cruise control, etc.)",
      "Found on older Digifant, Bosch Motronic, and some body control units"
    ],
    notes: "The coding plug contains short-circuit bridges that tell the ECU what options the vehicle is equipped with. Removing or modifying bridges changes ECU behaviour. Common on Mk2 Golf, Mk3 Corrado. Always photograph original bridge configuration before modifying.",
    svgType: "coding",
    refs: [
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      }
    ],
    platforms: ["Mk2", "Mk3", "B2", "B3"]
  },
  {
    id: 40,
    name: "CAN bus T-tap connector",
    family: "CAN Bus",
    manufacturer: "Various (Hirschmann / custom)",
    pins: 2,
    layout: "In-line T-splice",
    partNumbers: ["Varies — not a single standard"],
    tyco: ["N/A"],
    terminalSize: "1.5mm",
    gaugeRange: "0.35–0.75 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Varies by harness supplier"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Some variants"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Some variants"
      }
    ],
    locking: "Varies",
    sealed: false,
    terminals: ["1.5mm splice / crimp terminals"],
    seals: ["Optional"],
    usage: [
      "Adding devices to existing CAN bus lines (retrofit OEM modules)",
      "Aftermarket alarm/tracker bus taps",
      "Diagnostic harness pass-throughs"
    ],
    notes: "Not a single standardised part — VAG uses various inline T-splice solutions. For clean CAN bus additions, the preferred method is a proper T-splice with stub length under 0.3m. Longer stubs cause reflections. CAN-H is typically orange/green and CAN-L is orange/brown in VAG colour codes.",
    svgType: "cantap",
    refs: [
      {
        l: "VWVortex: Terminal connectors reference",
        u: "https://www.vwvortex.com/threads/vw-terminal-connectors-reference.9202433/"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8", "All VAG"]
  },
  {
    id: 41,
    name: "Terminal 15 / 30 fuse tap (ATO/Mini blade)",
    family: "Fuse Box",
    manufacturer: "Multiple",
    pins: 1,
    layout: "Blade fuse slot",
    partNumbers: ["N/A — accessory part"],
    tyco: ["N/A"],
    terminalSize: "ATO (standard) or Mini blade",
    gaugeRange: "Up to 20A (fuse-dependent)",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Varies — see fuse amperage colour code"
      }
    ],
    locking: "Friction",
    sealed: false,
    terminals: ["Blade fuse contact"],
    seals: ["N/A"],
    usage: [
      "Tapping permanent +12V or switched +12V from interior fuse box",
      "Dashcam, tracker, or retrofit device power"
    ],
    notes: "VAG interior fuse boxes use standard ATO (normal) or Mini blade fuses depending on platform. The Mk6+ platform uses mainly Mini blade. Add-a-fuse adapters allow a second fused circuit from any existing fuse position. Always identify if the fuse position is terminal 30 (permanent) or terminal 15 (ignition-switched) before wiring.",
    svgType: "fuse",
    refs: [
      {
        l: "FCP Euro: VW Wiring",
        u: "https://www.fcpeuro.com/Volkswagen-parts/Wiring/"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "Mk8", "B5", "B6", "B7", "B8", "B9", "All VAG"]
  },
  {
    id: 42,
    name: "VW 2.8 Tab — 2-pin",
    family: "VW 2.8 Tab",
    manufacturer: "VAG proprietary (OEM)",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1J0 973 202", "1J0 973 752"],
    tyco: ["TE: 1599629-1"],
    terminalSize: "2.8mm VAG Tab",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard VW 2.8 Tab housing"
      }
    ],
    locking: "Slide secondary lock",
    sealed: true,
    terminals: ["JPTA.SWS-SKT (socket)", "JPTA.SWS-PIN2 (pin)"],
    seals: ["JPTA-SL (Type A wire seal)"],
    usage: [
      "Lambda sensor heater circuit",
      "Coolant fan control relay connections",
      "Glow plug relay feeds (TDI)"
    ],
    notes: "VAG's own 2.8mm Tab series uses JPT-compatible terminals (JPTA.SWS type) but in a proprietary housing with a slide-style secondary lock rather than the JPT clip. The housing is keyed differently from standard JPT — do not attempt to mate JPT plug to VW Tab socket. The 3-way with middle cavity blocked (VW28-3S-MOD1) also carries this part number in 2-cavity form.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: VW 2.8 Tab Series",
        u: "https://www.corsa-technic.com/category.php?category_id=375"
      },
      {
        l: "FCP Euro: VW Body Harness Connector",
        u: "https://www.fcpeuro.com/products/audi-vw-body-wiring-harness-connector-genuine-vw-audi-6q0973704a"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "B5", "B6", "B7"]
  },
  {
    id: 43,
    name: "VW 2.8 Tab — 3-pin",
    family: "VW 2.8 Tab",
    manufacturer: "VAG proprietary (OEM)",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["1J0 973 703 B", "6Q0 973 703"],
    tyco: ["TE: 1599630-1"],
    terminalSize: "2.8mm VAG Tab",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Standard VW 2.8 Tab"
      }
    ],
    locking: "Slide secondary lock",
    sealed: true,
    terminals: ["JPTA.SWS-SKT", "JPTA.SWS-PIN2"],
    seals: ["JPTA-SL"],
    usage: [
      "MAF sensor (Mk5/Mk6 TDI and TSI)",
      "Fuel pressure sensor (common-rail TDI)",
      "Turbo boost pressure sensor"
    ],
    notes: "Very common on Mk5/Mk6/MQB engine sensors. Visually similar to KOSTAL SLK 2.8 but different housing profile — check the rear face of the housing for 'JPT' or similar marking. Used extensively across the PQ35 and PQ46 platforms.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: VW 2.8 Tab Series",
        u: "https://www.corsa-technic.com/category.php?category_id=375"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P", "MQB"]
  },
  {
    id: 44,
    name: "VW 2.8 Tab — 4-pin",
    family: "VW 2.8 Tab",
    manufacturer: "VAG proprietary (OEM)",
    pins: 4,
    layout: "2×2",
    partNumbers: ["6Q0 973 704 A", "8K0 973 704"],
    tyco: ["N/A"],
    terminalSize: "2.8mm VAG Tab",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Most common"
      },
      {
        hex: "#8b4a1a",
        name: "Brown",
        ctx: "Body harness variant (e.g. 6Q0973704A from FCP Euro)"
      }
    ],
    locking: "Slide secondary lock",
    sealed: true,
    terminals: ["JPTA.SWS-SKT", "JPTA.SWS-PIN2"],
    seals: ["JPTA-SL"],
    usage: [
      "Throttle body (electronic — 4-pin variants)",
      "Electric power steering motor sub-connector",
      "Body wiring harness branch connectors"
    ],
    notes: "FCP Euro lists the brown 4-pin variant (6Q0973704A) as a body wiring harness connector used across A3, A4, A6, A8 Q-series. Part number prefix indicates platform generation — 6Q0 = PQ25 (Polo/Fabia), 8K0 = B8 Audi.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: VW 2.8 Tab Series",
        u: "https://www.corsa-technic.com/category.php?category_id=375"
      },
      {
        l: "FCP Euro: Genuine VW 6Q0973704A",
        u: "https://www.fcpeuro.com/products/audi-vw-body-wiring-harness-connector-genuine-vw-audi-6q0973704a"
      },
      {
        l: "UroTuning: 4-pin 8K0-973-704",
        u: "https://www.urotuning.com/products/4-pin-connector-vw-audi"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B6", "B7", "B8", "8P", "8V"]
  },
  {
    id: 45,
    name: "VW 4.8 Tab — 6-pin",
    family: "VW 4.8 Tab",
    manufacturer: "VAG proprietary (OEM)",
    pins: 6,
    layout: "2×3",
    partNumbers: ["8W0 973 755", "8W1 973 755"],
    tyco: ["N/A — VAG proprietary"],
    terminalSize: "4.8mm VAG Tab (high current)",
    gaugeRange: "1.5–6.0 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "VW 4.8 Tab high-current housing"
      }
    ],
    locking: "Slide lock (left or right — swappable)",
    sealed: true,
    terminals: ["4.8mm flat blade with SWS"],
    seals: ["Integral per cavity"],
    usage: [
      "High-current distribution connectors on MLB platform",
      "Battery management systems (B9 A4/A5/Q5)",
      "Alternator and starter relay feeds"
    ],
    notes: "8W0/8W1 prefix = MLB B9 platform (Audi A4 B9, A5, Q5 FY). The slide lock can be installed on either side of the housing — 8W0 = lock on left, 8W1 = lock on right. Uses a harness cover (8W0 973 374) for strain relief. Higher current rating than any 2.8mm Tab variant.",
    svgType: "grid23",
    refs: [
      {
        l: "Corsa-Technic: VW 4.8 Tab Series",
        u: "https://www.corsa-technic.com/category.php?category_id=376"
      }
    ],
    platforms: ["B9", "MLB", "Mk7", "Mk8"]
  },
  {
    id: 46,
    name: "FEP 2.8 Sealed — 4-pin",
    family: "FEP 2.8 Sealed",
    manufacturer: "FEP / OEM VAG",
    pins: 4,
    layout: "2×2",
    partNumbers: ["1J0 973 724", "42034400"],
    tyco: ["N/A — FEP series"],
    terminalSize: "2.8mm FEP",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "FEP 2.8 Sealed housing (Code I)"
      }
    ],
    locking: "Side tab, no CPA",
    sealed: true,
    terminals: ["JPTA.SWS-SKT (socket)", "JPTA.SWS-PIN2 (pin)"],
    seals: ["JPTA-SL (Type A)"],
    usage: [
      "Fuel injectors — Mk4 Golf/Jetta/Bora (1.8T, 1.9 TDI, 2.0 8V)",
      "Ignition coil connectors — Mk3/Mk4 era",
      "Various actuator connectors on AGR/AHF TDI engines"
    ],
    notes: "FEP 2.8 (unsealed variant code I) is a Mk4-era workhorse. Mating part is FEP28K-4P. Uses the same JPTA terminals as VW 2.8 Tab. Common on 1J0-prefix chassis (Mk4 Golf, Bora, early Mk4 Audi A3 8L). The 4-pin is far more common than the 6-pin in this family.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: FEP 2.8 Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=433"
      }
    ],
    platforms: ["Mk4", "B5", "8L"]
  },
  {
    id: 47,
    name: "FEP 2.8 Sealed — 6-pin",
    family: "FEP 2.8 Sealed",
    manufacturer: "FEP / OEM VAG",
    pins: 6,
    layout: "2×3",
    partNumbers: ["1J0 973 733", "42034100"],
    tyco: ["N/A"],
    terminalSize: "2.8mm FEP",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "FEP 2.8 Sealed 6-pin"
      }
    ],
    locking: "Side tab",
    sealed: true,
    terminals: ["JPTA.SWS-SKT", "JPTA.SWS-PIN2"],
    seals: ["JPTA-SL"],
    usage: [
      "Engine ECU sub-connectors (Digifant / Motronic Mk3-Mk4)",
      "Transmission control unit auxiliary",
      "Multi-circuit body module feeds"
    ],
    notes: "Mating part: 1J0 973 833. Less common than the 4-pin. Used where 6 medium-current circuits need a single weatherproof connection.",
    svgType: "grid23",
    refs: [
      {
        l: "Corsa-Technic: FEP 2.8 Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=433"
      }
    ],
    platforms: ["Mk3", "Mk4", "B4", "B5"]
  },
  {
    id: 48,
    name: "FEP 2.8K Sealed — 4-pin (with CPA)",
    family: "FEP 2.8K Sealed",
    manufacturer: "FEP / OEM VAG",
    pins: 4,
    layout: "2×2",
    partNumbers: ["8K0 971 994 A", "42581000"],
    tyco: ["N/A — FEP 2.8K series"],
    terminalSize: "2.8mm FEP K-series",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "FEP 2.8K Sealed housing"
      },
      {
        hex: "#3a6aaa",
        name: "Blue",
        ctx: "CPA clip colour on some variants"
      }
    ],
    locking: "Side tab + CPA (connector position assurance)",
    sealed: true,
    terminals: ["MCP28K-SKT (MCP 2.8K socket)"],
    seals: ["Integral per cavity"],
    usage: [
      "Common on Audi B8 (A4/A5/A6/Q5) platform sensors and actuators",
      "Ignition coil connectors — EA888 Gen 2/3 engines",
      "High-pressure fuel pump solenoid (Audi FSI/TFSI)"
    ],
    notes: "The 2.8K (K = Kompakt) series has a CPA clip that positively confirms full mating — important for safety-critical connections. 8K0 prefix = Audi B8 platform. The CPA version (8K0 971 994A) supersedes the non-CPA (8K0 971 994). MCP 2.8K terminals required — not interchangeable with JPTA.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: FEP 2.8K Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=442"
      },
      {
        l: "German Auto Supply: 8K0 973 703",
        u: "https://www.germanautosupply.com/genuine-vw+audi/connector-housing/8K0-973-703"
      }
    ],
    platforms: ["B8", "8P", "Mk6"]
  },
  {
    id: 49,
    name: "Ignition coil connector — 4-pin EA888 (8K0 973 724)",
    family: "VW 2.8 Tab",
    manufacturer: "VAG proprietary (OEM)",
    pins: 4,
    layout: "2×2",
    partNumbers: ["8K0 973 724", "8K0 973 704"],
    tyco: ["N/A"],
    terminalSize: "2.8mm VAG Tab",
    gaugeRange: "0.35–1.0 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Ignition coil connector housing"
      }
    ],
    locking: "Side tab with secondary lock",
    sealed: false,
    terminals: ["JPTA.SWS-SKT", "JPTA.SWS-PIN2"],
    seals: ["N/A — coil connector is unsealed (dry location)"],
    usage: [
      "Ignition coil pack connector — 2.0 TFSI / TSI EA888 Gen 1/2/3",
      "Also used on 1.4 TSI, 1.8 TFSI engines",
      "Found on Golf Mk6/Mk7, Audi A3/A4/A5 B8, Seat Leon Mk2/Mk3"
    ],
    notes: "Possibly the single most commonly replaced VAG electrical connector. Extremely brittle at high mileage — the locking tab snaps when the coil is removed. Available as ready-made repair pigtails from Vemo (V10-83-0088), Febi, and genuine VAG. Part 8K0 973 724 is the 4-pin housing; the 4-pin with different terminal spacing is 8K0 973 704. Pins 1/2 = primary coil signal, 3 = earth, 4 = +12V supply.",
    svgType: "grid22",
    refs: [
      {
        l: "FCP Euro: Audi VW Ignition Coil Connector 8K0973724",
        u: "https://www.fcpeuro.com/products/audi-vw-ignition-coil-connector-genuine-audi-vw-8k0973724"
      },
      {
        l: "Connector ID: VW Connectors",
        u: "https://www.connectorid.com/collections/vw-connectors"
      },
      {
        l: "German Auto Supply: 8K0 973 724",
        u: "https://www.germanautosupply.com/genuine-vw+audi/connector-housing/8K0-973-703"
      }
    ],
    platforms: ["Mk6", "Mk7", "Mk8", "B8", "B9", "8P", "8V", "MQB"]
  },
  {
    id: 50,
    name: "MCON 1.2 Clean Body — 2-pin",
    family: "MCON 1.2",
    manufacturer: "TE Connectivity",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["N/A — OEM varies"],
    tyco: ["MCON.12CB-2 (Clean Body)", "MCON.12LL-2 (Locking Lance)"],
    terminalSize: "1.2mm MCON",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Clean Body variant"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Locking Lance sealed variant"
      }
    ],
    locking: "Clean body or locking lance variants",
    sealed: true,
    terminals: ["MCON.12CB-SKT (Clean Body socket)", "MCON.12LL-SKT (Locking Lance socket)"],
    seals: ["MCON/MQS-SL (shared seal with MQS 0.63)"],
    usage: [
      "MQB platform sub-ECU signal wiring",
      "Sensor networks on EA888 Gen 3 / EA288 TDI",
      "Gateway and comfort module low-current ports"
    ],
    notes: "MCON 1.2 uses the same wire seals as MQS 0.63 (MCON/MQS-SL) but has a larger 1.2mm contact body. Two variants: Clean Body (CB) for unsealed areas, Locking Lance (LL) for sealed. Compatible removal tool: TE 2-1579007-9 / Walter Schröder 13 43 12. Do not confuse with KOSTAL MLK 1.2 — different manufacturer and terminal design.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: MCON 1.2 Clean Body Series",
        u: "https://www.corsa-technic.com/category.php?category_id=370"
      }
    ],
    platforms: ["Mk7", "Mk8", "B9", "8V", "MQB", "MLB"]
  },
  {
    id: 51,
    name: "MCON 1.2 Locking Lance — 4-pin",
    family: "MCON 1.2",
    manufacturer: "TE Connectivity",
    pins: 4,
    layout: "2×2",
    partNumbers: ["N/A — OEM varies"],
    tyco: ["MCON.12LL-4"],
    terminalSize: "1.2mm MCON",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard MCON 1.2 LL"
      }
    ],
    locking: "Locking lance",
    sealed: true,
    terminals: ["MCON.12LL-SKT", "MCON.12LL-PIN"],
    seals: ["MCON/MQS-SL"],
    usage: [
      "Steering column angle sensor (MQB)",
      "Door handle capacitive sensor connections",
      "Comfort CAN node sub-looms (MQB/MLB)"
    ],
    notes: "The locking lance variant provides positive terminal retention. Common on MQB-platform body electronics. Hirschmann SealStar 1.2mm connectors are electrically and dimensionally compatible with MCON 1.2 LL.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: MCON 1.2 Locking Lance Series",
        u: "https://www.corsa-technic.com/category.php?category_id=369"
      }
    ],
    platforms: ["Mk7", "Mk8", "B9", "MQB", "MLB"]
  },
  {
    id: 52,
    name: "Yazaki 0.64mm Sealed — 4-pin",
    family: "Yazaki 0.64mm Sealed",
    manufacturer: "Yazaki",
    pins: 4,
    layout: "2×2",
    partNumbers: ["7287-2404 (socket housing)", "7286-2406 (pin housing)"],
    tyco: ["N/A — Yazaki proprietary"],
    terminalSize: "0.64mm Yazaki",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard Yazaki 0.64mm"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "Some body loom variants"
      }
    ],
    locking: "CPA clip (TS 025 compatible)",
    sealed: true,
    terminals: ["Yazaki 0.64mm socket terminal"],
    seals: ["TS025-SL (TS 025 series seal)"],
    usage: [
      "Body control module (BCM) sub-connectors on Japanese-supply VAG builds",
      "Comfort electronics in A3 8V and Golf Mk7 variants",
      "Body control module sub-connectors on Golf Mk5/Mk6/Mk7 and Audi A3 8P/8V with Yazaki harness supply"
    ],
    notes: "Yazaki 0.64mm sealed is electrically and dimensionally compatible with the TS 025 sealed series (ISO 19689 / OBD-II standard). Found on some VAG vehicles where Yazaki was the Tier 1 harness supplier rather than Leoni or Delphi. Less common than MQS in engine bay applications but appears in body looms.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: Yazaki 0.64mm Sealed",
        u: "https://www.corsa-technic.com/category.php?category_id=406"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P", "8V"]
  },
  {
    id: 53,
    name: "Hirschmann SealStar 2.8 — 3-pin",
    family: "Hirschmann SealStar",
    manufacturer: "Hirschmann Automotive",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["805-199-521", "9444034"],
    tyco: ["N/A — Hirschmann proprietary"],
    terminalSize: "2.8mm SealStar",
    gaugeRange: "0.5–2.5 mm²",
    colors: [
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "All Hirschmann SealStar 2.8 housings"
      }
    ],
    locking: "CPA available (Code A1)",
    sealed: true,
    terminals: ["SLK28.SWS-SKT (KOSTAL-compatible socket)", "SLK28.SWS-PIN (KOSTAL-compatible pin)"],
    seals: ["SLK28-SL"],
    usage: [
      "MAF sensor on many TDI and TFSI engines (cross-compatible with KOSTAL SLK)",
      "Fuel pressure sensors",
      "Turbo actuator connectors"
    ],
    notes: "Hirschmann SealStar 2.8 is dimensionally and electrically compatible with KOSTAL SLK 2.8 — terminals and seals are interchangeable. The Code A1 keying (9444034) is slightly different from KOSTAL Code A (9441391) — check the keying code before ordering. Very common to find either brand on the same sensor depending on production date.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: KOSTAL SLK 2.8 (cross-compatible)",
        u: "https://www.corsa-technic.com/category.php?category_id=371"
      },
      {
        l: "Warwick Test Supplies: Hirschmann SealStar 2.8",
        u: "https://warwickts.com/4894/Kostal-3way-Code-A1-Auto-Connector-Kit"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B7", "B8", "8P", "MQB"]
  },
  {
    id: 54,
    name: "Hirschmann SealStar 1.2 — 4-pin",
    family: "Hirschmann SealStar",
    manufacturer: "Hirschmann Automotive",
    pins: 4,
    layout: "2×2",
    partNumbers: ["N/A — OEM varies"],
    tyco: ["N/A"],
    terminalSize: "1.2mm SealStar",
    gaugeRange: "0.13–0.5 mm²",
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "SealStar 1.2mm housing"
      }
    ],
    locking: "Locking lance",
    sealed: true,
    terminals: ["MCON.12LL-SKT (TE compatible)", "MLK12.SWS-SKT3 (KOSTAL compatible)"],
    seals: ["MCON/MQS-SL"],
    usage: [
      "Speed sensor signal processing modules",
      "MQB comfort system looms",
      "Steering column electronics sub-connectors"
    ],
    notes: "Hirschmann SealStar 1.2mm is cross-compatible with both TE MCON 1.2 LL and KOSTAL MLK 1.2 SWS terminals and seals — all three are effectively intermateable in the 1.2mm class. This is useful to know when sourcing replacements.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: MCON 1.2 LL (cross-compatible)",
        u: "https://www.corsa-technic.com/category.php?category_id=369"
      },
      {
        l: "Corsa-Technic: KOSTAL MLK 1.2 (cross-compatible)",
        u: "https://www.corsa-technic.com/category.php?category_id=255"
      }
    ],
    platforms: ["Mk7", "Mk8", "MQB", "MLB"]
  },
  {
    id: 55,
    name: "Bosch Kompakt 1 — 2-pin",
    family: "Bosch Kompakt",
    manufacturer: "Bosch",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1 928 403 137 (socket)", "1 928 404 226 (pin)"],
    tyco: ["N/A — Bosch proprietary"],
    terminalSize: "2.8mm BDK/BSK",
    gaugeRange: "0.5–1.5 mm²",
    locking: "Tab latch, Code 1 keying",
    sealed: true,
    terminals: ["Bosch BDK/BSK 2.8 socket", "Bosch BDK/BSK 2.8 pin"],
    seals: ["Integral wire seal per cavity"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard grey housing"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Kompakt 1.1 variant (1 928 403 874)"
      }
    ],
    usage: [
      "Lambda / O2 sensor heater circuit",
      "Idle speed control valve",
      "Fuel pressure regulator solenoid",
      "Coolant temperature sensor (Bosch-supplied units)"
    ],
    notes: "Bosch Kompakt uses BDK/BSK 2.8mm terminals — NOT compatible with TE/AMP JPT or MCP 2.8 despite similar pin size. The terminal retention mechanism differs. Code number (1, 2, etc.) indicates keying — only same-code housings mate. Kompakt 1 and Kompakt 1.1 housings accept the same terminals; the .1 version has a modified housing shape.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Bosch Kompakt 1 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=413"
      },
      {
        l: "Corsa-Technic: KOM1-2S-1 socket kit",
        u: "https://www.corsa-technic.com/item.php?item_id=887"
      }
    ],
    platforms: ["Mk3", "Mk4", "Mk5", "Mk6", "B4", "B5", "B6", "B7"]
  },
  {
    id: 56,
    name: "Bosch Kompakt 1 — 3-pin",
    family: "Bosch Kompakt",
    manufacturer: "Bosch",
    pins: 3,
    layout: "1×3 inline",
    partNumbers: ["1 928 403 110 (socket)", "1 928 404 227 (pin)"],
    tyco: ["N/A"],
    terminalSize: "2.8mm BDK/BSK",
    gaugeRange: "0.5–1.5 mm²",
    locking: "Tab latch, Code 1 keying",
    sealed: true,
    terminals: ["Bosch BDK/BSK 2.8 socket", "Bosch BDK/BSK 2.8 pin"],
    seals: ["Integral wire seal"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      }
    ],
    usage: [
      "MAP / boost pressure sensor (Bosch-supplied)",
      "Throttle body (older Bosch Motronic 1.x/3.x)",
      "Intake air temperature sensor combined"
    ],
    notes: "Clean exit variant (1 928 402 868) available for restricted-space applications — wires exit at 90° from standard. Code 1 is the most common keying on VAG applications. The Kompakt family is still the O2 sensor connector of choice on many post-2000 Bosch-sourced lambda sensors.",
    svgType: "inline3",
    refs: [
      {
        l: "Corsa-Technic: Bosch Kompakt 1 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=413"
      },
      {
        l: "Corsa-Technic: KOM1-3S-1 socket kit",
        u: "https://www.corsa-technic.com/item.php?item_id=887"
      }
    ],
    platforms: ["Mk2", "Mk3", "Mk4", "B3", "B4", "B5"]
  },
  {
    id: 57,
    name: "Bosch Kompakt 1.1 — 4-pin",
    family: "Bosch Kompakt",
    manufacturer: "Bosch",
    pins: 4,
    layout: "2×2",
    partNumbers: ["1 928 403 736 (std seal)", "1 928 405 086 (O2 sensor variant)", "1 928 403 453 (pin housing)"],
    tyco: ["N/A"],
    terminalSize: "2.8mm BDK/BSK",
    gaugeRange: "0.5–1.5 mm²",
    locking: "Tab latch, Code 1",
    sealed: true,
    terminals: ["Bosch BDK/BSK 2.8 socket (KOM1.1M-4S)", "KOM1-4P-1 (pin)"],
    seals: ["Standard VMQ seal", "Special F-VMQ seal (high-temp O2 variant)"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard variant"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Kompakt 1.1A variant"
      }
    ],
    usage: [
      "Wideband lambda (LSU 4.2 / LSU 4.9) — 4-wire heated O2 sensor",
      "Bosch Motronic knock sensor (4-wire variant)",
      "Camshaft Hall sensor combined signal"
    ],
    notes: "The 4-pin Kompakt 1.1M is the standard connector for Bosch LSU 4.2 and LSU 4.9 wideband lambda sensors used across all modern VAG petrol engines. The O2-specific variant (1 928 405 086) uses a special high-temperature seal rated for exhaust proximity. Requires Bosch BDK/BSK crimping dies — NOT JPT dies.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: Bosch Kompakt 1.1 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=413"
      },
      {
        l: "Corsa-Technic: KOM1.1M-4S kit",
        u: "https://www.corsa-technic.com/item.php?item_id=2034"
      }
    ],
    platforms: ["Mk4", "Mk5", "Mk6", "Mk7", "B5", "B6", "B7", "B8", "8P", "All VAG"]
  },
  {
    id: 58,
    name: "Bosch Kompakt 4 — 2-pin",
    family: "Bosch Kompakt",
    manufacturer: "Bosch",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["1 928 405 521 (w/CPA, std seal)", "1 928 405 986 (w/CPA, F-VMQ seal)", "1 928 405 522 (w/o CPA)"],
    tyco: ["N/A"],
    terminalSize: "2.8mm BDK/BSK",
    gaugeRange: "0.5–1.5 mm²",
    locking: "Tab latch with optional CPA clip",
    sealed: true,
    terminals: ["Bosch BDK/BSK 2.8mm"],
    seals: ["VMQ (standard)", "F-VMQ (fluorosilicone — high temp)"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard and F-VMQ versions"
      }
    ],
    usage: [
      "Narrowband lambda sensors (2-wire LSF-type)",
      "Coolant temp sensor (NTC) on Bosch-sourced units",
      "Oil pressure switch (2-pin variant)"
    ],
    notes: "Kompakt 4 is a newer housing revision — same BDK/BSK terminals as Kompakt 1/1.1 but updated housing design with optional CPA. Code 1 and Code 2 variants exist (Code 2 = different keying, less common on VAG). CPA superseded: 1 928 405 715.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Bosch Kompakt 4 Series",
        u: "https://www.corsa-technic.com/category.php?category_id=413"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "B6", "B7", "B8"]
  },
  {
    id: 59,
    name: "Bosch BAK — 6-pin (wideband lambda)",
    family: "Bosch BAK",
    manufacturer: "Bosch",
    pins: 6,
    layout: "2×3",
    partNumbers: ["1 928 404 669 (socket)", "1 928 405 111 (pin — device side)"],
    tyco: ["N/A — Bosch proprietary"],
    terminalSize: "1.5mm Bosch BAK",
    gaugeRange: "0.35–1.0 mm²",
    locking: "Side tab, Code 1",
    sealed: true,
    terminals: ["Bosch BAK 1.5mm socket", "Bosch BAK 1.5mm pin"],
    seals: ["Integral per cavity"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard BAK housing"
      }
    ],
    usage: [
      "LSU 4.9 wideband lambda sensor (6-wire) — EA888, EA189, EA288",
      "Bosch oxygen sensor harness side connector on all modern VAG petrol/diesel"
    ],
    notes: "The BAK 6-pin is the harness-side connector for Bosch LSU 4.9 wideband lambda sensors — found on every modern VAG petrol engine from Mk5 onwards. Uses smaller 1.5mm BAK terminals, not the 2.8mm BDK/BSK of Kompakt. The sensor side uses the mating plug (1 928 405 111). Common cause of wideband failure is pin corrosion at this connector from exhaust heat.",
    svgType: "grid23",
    refs: [
      {
        l: "Corsa-Technic: Bosch BAK Series",
        u: "https://www.corsa-technic.com/category.php?category_id=263"
      },
      {
        l: "Corsa-Technic: BAK-6S kit",
        u: "https://www.corsa-technic.com/item.php?item_id=1296"
      }
    ],
    platforms: ["Mk5", "Mk6", "Mk7", "Mk8", "B7", "B8", "B9", "8P", "8V", "MQB", "MLB"]
  },
  {
    id: 60,
    name: "Bosch TRAPEZ — 2-pin",
    family: "Bosch TRAPEZ",
    manufacturer: "Bosch",
    pins: 2,
    layout: "1×2 inline (trapezoidal housing)",
    partNumbers: ["1 928 499 372"],
    tyco: ["N/A — Bosch proprietary"],
    terminalSize: "2.8mm Bosch TRAPEZ",
    gaugeRange: "0.5–1.5 mm²",
    locking: "Friction fit, device-side only",
    sealed: true,
    terminals: ["Bosch TRAPEZ 2.8mm terminal"],
    seals: ["Integral"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Trapezoidal housing"
      }
    ],
    usage: [
      "Fuel injector — older Bosch Jetronic L-Jetronic applications (Mk1/Mk2 era)",
      "Early lambda sensor (narrowband, 1-wire)"
    ],
    notes: "The TRAPEZ is one of the oldest Bosch automotive connector designs — distinctively trapezoidal cross-section. Predates EV1/Jetronic by some years. Rarely encountered on anything post-1990 but still seen on Mk1 Golf, Mk1 Scirocco, and early Audi 80 restoration projects. Device-side only — no harness housing sold separately.",
    svgType: "ev1",
    refs: [
      {
        l: "Corsa-Technic: Bosch TRAPEZ Series",
        u: "https://www.corsa-technic.com/category.php?category_id=413"
      }
    ],
    platforms: ["Mk1", "Mk2", "B1", "B2"]
  },
  {
    id: 61,
    name: "Delphi Weather-Pack — 2-pin",
    family: "Delphi Weather-Pack",
    manufacturer: "Delphi / Aptiv",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["12010973 (pin)", "12015797 (socket — WP-4S-1 body uses same terminals)"],
    tyco: ["N/A — Delphi proprietary"],
    terminalSize: "2.8mm Weather-Pack",
    gaugeRange: "0.5–2.5 mm²",
    locking: "Rear-insert with TPA strip",
    sealed: true,
    terminals: ["WP-SKT (socket)", "WP-PIN (pin)"],
    seals: ["WP-SL (individual cavity seal)"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard Weather-Pack housing"
      }
    ],
    usage: [
      "Very common on aftermarket and retrofit wiring (particularly in motorsport)",
      "Widely used by aftermarket ECU suppliers (MegaSquirt, Haltech, etc.)",
      "OEM use on some VW/Audi variants with Delphi harness supply"
    ],
    notes: "Weather-Pack is mechanically identical to Metri-Pack 280 — same plug, same terminals, same seals. Primary use on VAG is via aftermarket engine management, since the connectors are widely stocked and well-known in the motorsport and retrofit world. The 4-way kit (WP-4P-2 / WP-4S-1) is the most common.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Delphi Weather-Pack Series",
        u: "https://www.corsa-technic.com/category.php?category_id=82"
      }
    ],
    platforms: ["Mk4", "Mk5", "B5", "B6"]
  },
  {
    id: 62,
    name: "Delphi Weather-Pack — 4-pin",
    family: "Delphi Weather-Pack",
    manufacturer: "Delphi / Aptiv",
    pins: 4,
    layout: "2×2",
    partNumbers: ["12015024 (pin — WP-4P-2)", "12015797 (socket — WP-4S-1)"],
    tyco: ["N/A"],
    terminalSize: "2.8mm Weather-Pack",
    gaugeRange: "0.5–2.5 mm²",
    locking: "Rear-insert with TPA",
    sealed: true,
    terminals: ["WP-SKT", "WP-PIN"],
    seals: ["WP-SL"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      }
    ],
    usage: [
      "4-wire coolant temp + pressure combined sensor (aftermarket)",
      "Aftermarket ECU sensor inputs (wideband O2, MAP, IAT)",
      "Motorsport auxiliary sensor loom connections"
    ],
    notes: "The 4-pin WP is the most popular Weather-Pack configuration in the aftermarket tuning world. Extremely common in DIY engine harness builds. The 2×2 grid layout gives a compact sealed connector for four medium-current circuits. Widely available from electronics distributors (Mouser, Digi-Key) at much lower cost than OEM VAG connectors.",
    svgType: "grid22",
    refs: [
      {
        l: "Corsa-Technic: Delphi Weather-Pack Series",
        u: "https://www.corsa-technic.com/category.php?category_id=82"
      },
      {
        l: "Corsa-Technic: WP-4P-2 pin kit",
        u: "https://www.corsa-technic.com/item.php?item_id=320"
      },
      {
        l: "Corsa-Technic: WP-4S-1 socket kit",
        u: "https://www.corsa-technic.com/item.php?item_id=324"
      }
    ],
    platforms: ["Mk4", "Mk5", "B5", "B6"]
  },
  {
    id: 63,
    name: "Yazaki 090II Sealed — 2-pin",
    family: "Yazaki 090II",
    manufacturer: "Yazaki",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: ["7283-7023-10 (090II-2S-1)", "7287-1495-30 (090II-2S-21 — fuel pump)"],
    tyco: ["N/A — Yazaki proprietary"],
    terminalSize: "0.9mm Yazaki 090II",
    gaugeRange: "0.13–0.75 mm²",
    color: "Natural, black, grey",
    locking: "Tab latch",
    sealed: true,
    terminals: ["Yazaki 090II socket terminal", "Yazaki 090II pin terminal"],
    seals: ["Integral per cavity"],
    colors: [
      {
        hex: "#d4cfc8",
        name: "Natural",
        ctx: "Standard"
      },
      {
        hex: "#1a1a1a",
        name: "Black",
        ctx: "Some variants"
      },
      {
        hex: "#888",
        name: "Grey",
        ctx: "090II-2S-21 fuel pump variant"
      }
    ],
    usage: [
      "Fuel pump connector (090II-2S-21 — 7287-1495-30 is specifically listed under fuel pump connectors)",
      "Low-current sensor connections on Yazaki-harness vehicles"
    ],
    notes: "Yazaki 090II is very similar in dimensions to Sumitomo TS 090 but not intermateable. The 2S-21 variant (7287-1495-30) is specifically listed under fuel pump connectors on Corsa-Technic. Yazaki 090II uses a different terminal from Sumitomo TS 090.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Yazaki 090II Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=406"
      },
      {
        l: "Corsa-Technic: Fuel Pump Connectors",
        u: "https://www.corsa-technic.com/category.php?category_id=248"
      }
    ],
    platforms: ["All VAG"]
  },
  {
    id: 64,
    name: "Yazaki 58W Sealed — 2-pin",
    family: "Yazaki 58W / 58X",
    manufacturer: "Yazaki",
    pins: 2,
    layout: "1×2 inline",
    partNumbers: [
      "6189-2841 / 7223-1824-40 (socket 58W-2S-1)",
      "7122-1824-40 (pin 58W-2P-1)",
      "7223-1824-80 (brown socket variant)"
    ],
    tyco: ["N/A — Yazaki proprietary"],
    terminalSize: "1.5mm Yazaki 58-series",
    gaugeRange: "0.5–2.0 mm²",
    color: "Natural/white, brown variant",
    locking: "Rear holder/lock",
    sealed: true,
    terminals: ["Yazaki 58-series socket terminal", "Yazaki 58-series pin terminal"],
    seals: ["Integral cavity seal"],
    colors: [
      {
        hex: "#e8e8e0",
        name: "White/natural",
        ctx: "Standard 58W-2S-1"
      },
      {
        hex: "#8b4a1a",
        name: "Brown",
        ctx: "7223-1824-80 brown variant"
      }
    ],
    usage: [
      "Ambient air temperature sensor",
      "Low-current sensor and switch connections on Yazaki-harness vehicles",
      "Some door switch connectors"
    ],
    notes: "Yazaki 58W and 58X are related sealed series — 58X uses a different (larger) terminal pitch. Both use a rear holder/lock mechanism rather than a front tab. Sumitomo also produces cross-compatible 58W housings. The brown variant (7223-1824-80) is used in specific harness positions for identification.",
    svgType: "inline2",
    refs: [
      {
        l: "Corsa-Technic: Yazaki 58W Sealed Series",
        u: "https://www.corsa-technic.com/category.php?category_id=233"
      }
    ],
    platforms: ["All VAG"]
  }
];

// ─── SVG GENERATORS ──────────────────────────────────────────────────────────
function makeSVG(type){
  const col = '#c8b560';
  const body = '#2a2a2a';
  const pin_c = '#888';
  const stroke = '#5a5550';

  const templates = {
    single: `<svg viewBox="0 8 80 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="40" height="32" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="31" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
    </svg>`,
    inline2: `<svg viewBox="0 8 100 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="32" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="18" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
      <rect x="64" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
    </svg>`,
    inline3: `<svg viewBox="0 8 120 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="110" height="32" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="12" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
      <rect x="51" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
      <rect x="90" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>
    </svg>`,
    inline4: `<svg viewBox="0 8 140 28" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="130" height="32" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3].map(i=>`<rect x="${12+i*32}" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    inline5: `<svg viewBox="0 8 160 28" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="150" height="32" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3,4].map(i=>`<rect x="${10+i*29}" y="18" width="18" height="16" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    grid22: `<svg viewBox="0 4 100 54" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="6" width="80" height="50" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="18" y="13" width="18" height="14" rx="2" fill="${pin_c}"/>
      <rect x="64" y="13" width="18" height="14" rx="2" fill="${pin_c}"/>
      <rect x="18" y="31" width="18" height="14" rx="2" fill="${pin_c}"/>
      <rect x="64" y="31" width="18" height="14" rx="2" fill="${pin_c}"/>
    </svg>`,
    grid23: `<svg viewBox="0 4 120 47" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="110" height="50" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2].map(i=>`<rect x="${12+i*34}" y="13" width="18" height="14" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2].map(i=>`<rect x="${12+i*34}" y="31" width="18" height="14" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    grid24: `<svg viewBox="0 4 150 47" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="142" height="50" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3].map(i=>`<rect x="${10+i*34}" y="13" width="18" height="14" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3].map(i=>`<rect x="${10+i*34}" y="31" width="18" height="14" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    grid34: `<svg viewBox="0 3 150 59" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="142" height="60" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3].map(i=>`<rect x="${10+i*34}" y="11" width="18" height="13" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3].map(i=>`<rect x="${10+i*34}" y="28" width="18" height="13" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3].map(i=>`<rect x="${10+i*34}" y="45" width="18" height="13" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    grid36: `<svg viewBox="0 3 200 59" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="192" height="60" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3,4,5].map(i=>`<rect x="${8+i*32}" y="11" width="20" height="13" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5].map(i=>`<rect x="${8+i*32}" y="28" width="20" height="13" rx="2" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5].map(i=>`<rect x="${8+i*32}" y="45" width="20" height="13" rx="2" fill="${pin_c}"/>`).join('')}
    </svg>`,
    power2: `<svg viewBox="0 6 100 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="84" height="36" rx="5" fill="${body}" stroke="${stroke}" stroke-width="2"/>
      <rect x="16" y="15" width="24" height="22" rx="3" fill="${pin_c}"/>
      <rect x="60" y="15" width="24" height="22" rx="3" fill="${pin_c}"/>
    </svg>`,
    superseal2: `<svg viewBox="0 6 100 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="84" height="40" rx="6" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <rect x="8" y="42" width="84" height="6" rx="0" fill="#8B3030"/>
      <circle cx="27" cy="28" r="10" fill="none" stroke="${col}" stroke-width="1.5"/>
      <circle cx="73" cy="28" r="10" fill="none" stroke="${col}" stroke-width="1.5"/>
      <circle cx="27" cy="28" r="4" fill="${pin_c}"/>
      <circle cx="73" cy="28" r="4" fill="${pin_c}"/>
    </svg>`,
    superseal3: `<svg viewBox="0 3 130 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="120" height="40" rx="6" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <rect x="5" y="42" width="120" height="6" rx="0" fill="#8B3030"/>
      ${[20,65,110].map(x=>`<circle cx="${x}" cy="28" r="10" fill="none" stroke="${col}" stroke-width="1.5"/><circle cx="${x}" cy="28" r="4" fill="${pin_c}"/>`).join('')}
    </svg>`,
    superseal4: `<svg viewBox="0 4 100 58" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="84" height="55" rx="6" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <rect x="8" y="55" width="84" height="6" rx="0" fill="#8B3030"/>
      ${[27,73].map(x=>`<circle cx="${x}" cy="23" r="10" fill="none" stroke="${col}" stroke-width="1.5"/><circle cx="${x}" cy="23" r="4" fill="${pin_c}"/>`).join('')}
      ${[27,73].map(x=>`<circle cx="${x}" cy="44" r="10" fill="none" stroke="${col}" stroke-width="1.5"/><circle cx="${x}" cy="44" r="4" fill="${pin_c}"/>`).join('')}
    </svg>`,
    quadlock: `<svg viewBox="0 2 140 76" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="136" height="72" rx="5" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="4" y="6" width="64" height="32" rx="3" fill="#333" opacity=".8"/>
      <rect x="70" y="6" width="66" height="32" rx="3" fill="#1a2a3a" opacity=".8"/>
      <rect x="4" y="40" width="64" height="32" rx="3" fill="#1a3a1a" opacity=".8"/>
      <rect x="70" y="40" width="66" height="32" rx="3" fill="#3a3a1a" opacity=".8"/>
    </svg>`,
    fakra: `<svg viewBox="0 4 80 56" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="6" width="50" height="52" rx="6" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <circle cx="40" cy="32" r="18" fill="none" stroke="${pin_c}" stroke-width="1.5"/>
      <circle cx="40" cy="32" r="7" fill="${pin_c}"/>
      <circle cx="40" cy="32" r="2.5" fill="${col}"/>
    </svg>`,
    ev1: `<svg viewBox="0 8 90 48" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="32" rx="36" ry="22" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <ellipse cx="31" cy="32" rx="9" ry="9" fill="none" stroke="${col}" stroke-width="1.2"/>
      <ellipse cx="59" cy="32" rx="9" ry="9" fill="none" stroke="${col}" stroke-width="1.2"/>
      <circle cx="31" cy="32" r="4" fill="${pin_c}"/>
      <circle cx="59" cy="32" r="4" fill="${pin_c}"/>
    </svg>`,
    ev6: `<svg viewBox="0 8 90 42" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="66" height="38" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <rect x="22" y="18" width="18" height="22" rx="3" fill="none" stroke="${col}" stroke-width="1.2"/>
      <rect x="50" y="18" width="18" height="22" rx="3" fill="none" stroke="${col}" stroke-width="1.2"/>
      <circle cx="31" cy="29" r="4" fill="${pin_c}"/>
      <circle cx="59" cy="29" r="4" fill="${pin_c}"/>
    </svg>`,
    obd16: `<svg viewBox="0 8 140 54" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,20 L130,20 L130,58 L10,58 Z" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M10,20 Q10,10 20,10 L120,10 Q130,10 130,20" fill="${body}" stroke="${stroke}" stroke-width="1.5"/>
      ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${14+i*14}" y="26" width="8" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6].map(i=>`<rect x="${14+i*14}" y="42" width="8" height="10" rx="1" fill="${pin_c}"/>`).join('')}
    </svg>`,
    ecu55: `<svg viewBox="0 2 160 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="152" height="60" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="11" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="26" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="41" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4].map(i=>`<rect x="${8+i*15}" y="56" width="10" height="7" rx="1" fill="${pin_c}" opacity="0.5"/>`).join('')}
    </svg>`,
    ecu60: `<svg viewBox="0 2 160 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="152" height="60" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="11" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="26" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="41" width="10" height="10" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${8+i*15}" y="56" width="10" height="7" rx="1" fill="${pin_c}"/>`).join('')}
    </svg>`,
    coding: `<svg viewBox="0 3 130 46" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="120" height="44" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      ${[0,1,2,3,4,5].map(i=>`<rect x="${10+i*20}" y="14" width="12" height="12" rx="1" fill="${pin_c}"/>`).join('')}
      ${[0,1,2,3,4,5].map(i=>`<rect x="${10+i*20}" y="30" width="12" height="12" rx="1" fill="${pin_c}"/>`).join('')}
      <line x1="16" y1="14" x2="16" y2="30" stroke="${col}" stroke-width="2"/>
      <line x1="56" y1="14" x2="56" y2="30" stroke="${col}" stroke-width="2"/>
    </svg>`,
    cantap: `<svg viewBox="0 28 120 42" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="30" x2="110" y2="30" stroke="${pin_c}" stroke-width="4" stroke-linecap="round"/>
      <line x1="60" y1="30" x2="60" y2="55" stroke="${col}" stroke-width="3" stroke-linecap="round"/>
      <rect x="44" y="50" width="32" height="18" rx="3" fill="${body}" stroke="${col}" stroke-width="1.2"/>
    </svg>`,
    fuse: `<svg viewBox="0 2 100 66" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="10" width="40" height="50" rx="4" fill="${body}" stroke="${stroke}" stroke-width="1.2"/>
      <rect x="36" y="4" width="10" height="8" rx="1" fill="${pin_c}"/>
      <rect x="54" y="4" width="10" height="8" rx="1" fill="${pin_c}"/>
      <rect x="36" y="58" width="10" height="8" rx="1" fill="${pin_c}"/>
      <rect x="54" y="58" width="10" height="8" rx="1" fill="${pin_c}"/>
      <line x1="41" y1="28" x2="41" y2="42" stroke="${col}" stroke-width="1.5"/>
      <line x1="59" y1="28" x2="59" y2="42" stroke="${col}" stroke-width="1.5"/>
      <line x1="41" y1="35" x2="59" y2="35" stroke="${col}" stroke-width="1.5"/>
    </svg>`
  };
  return templates[type] || templates['inline2'];
}

// ─── POPULATE SELECTS ────────────────────────────────────────────────────────
function populateSelects(){
  const fams = [...new Set(connectors.map(c=>c.family))].sort();
  const mfrs = [...new Set(connectors.map(c=>c.manufacturer))].sort();
  const fSel = document.getElementById('filterFamily');
  const mSel = document.getElementById('filterMfr');
  fams.forEach(f=>{ const o=document.createElement('option'); o.value=f; o.textContent=f; fSel.appendChild(o); });
  mfrs.forEach(m=>{ const o=document.createElement('option'); o.value=m; o.textContent=m; mSel.appendChild(o); });
  document.getElementById('total').textContent = connectors.length;
  document.getElementById('families-count').textContent = fams.length + ' families';
}

// ─── COLOUR HELPERS ──────────────────────────────────────────────────────────
const colorKeyMap = {
  natural: ['natural','cream','tan','ivory'],
  black:   ['black'],
  grey:    ['grey','gray'],
  white:   ['white'],
  green:   ['green'],
  brown:   ['brown'],
  blue:    ['blue'],
  yellow:  ['yellow'],
  red:     ['red'],
  orange:  ['orange'],
  violet:  ['violet','purple','lilac'],
  beige:   ['beige','tan','sand'],
};

function connectorMatchesColor(c, filterVal){
  if(!filterVal) return true;
  const keywords = colorKeyMap[filterVal] || [filterVal];
  return (c.colors||[]).some(col =>
    keywords.some(k => col.name.toLowerCase().includes(k))
  );
}

function swatchDots(colors, max=4){
  return (colors||[]).slice(0,max).map(col=>
    `<span class="colour-dot" title="${col.name}: ${col.ctx}">
      <span class="colour-dot-swatch" style="background:${col.hex}"></span>
      <span>${col.name}</span>
    </span>`
  ).join('');
}

function modalColourChips(colors){
  return (colors||[]).map(col=>
    `<div class="modal-colour-chip">
      <span class="swatch" style="background:${col.hex}"></span>
      <div>
        <div>${col.name}</div>
        <div class="modal-colour-context">${col.ctx}</div>
      </div>
    </div>`
  ).join('');
}

function getFiltered(){
  const q = document.getElementById('search').value.toLowerCase().trim();
  const fp = document.getElementById('filterPins').value;
  const ff = document.getElementById('filterFamily').value;
  const fm = document.getElementById('filterMfr').value;
  const fc = document.getElementById('filterColor').value;
  const fpl = document.getElementById('filterPlatform').value;
  return connectors.filter(c=>{
    const matchQ = !q || c.name.toLowerCase().includes(q)
      || c.partNumbers.join(' ').toLowerCase().includes(q)
      || c.family.toLowerCase().includes(q)
      || c.usage.join(' ').toLowerCase().includes(q)
      || c.manufacturer.toLowerCase().includes(q)
      || c.notes.toLowerCase().includes(q)
      || (c.colors||[]).map(x=>x.name+' '+x.ctx).join(' ').toLowerCase().includes(q)
      || (c.platforms||[]).join(' ').toLowerCase().includes(q.toLowerCase());
    const matchP = !fp || (fp==='10' ? c.pins>=10 : c.pins===parseInt(fp));
    const matchF = !ff || c.family===ff;
    const matchM = !fm || c.manufacturer===fm;
    const matchC = connectorMatchesColor(c, fc);
    const matchPl = !fpl || (c.platforms||[]).includes(fpl);
    return matchQ && matchP && matchF && matchM && matchC && matchPl;
  });
}

function platformTagsHTML(platforms, max=6){
  if(!platforms||!platforms.length) return '';
  const shown = platforms.slice(0, max);
  const rest = platforms.length - max;
  let html = shown.map(p=>`<span class="platform-tag${p==='All VAG'?' all-vag':''}">${p}</span>`).join('');
  if(rest > 0) html += `<span class="platform-tag">+${rest}</span>`;
  return html;
}

function render(){
  const filtered = getFiltered();
  document.getElementById('shown').textContent = filtered.length;
  const g = document.getElementById('grid');
  if(!filtered.length){
    g.innerHTML = '<div class="empty">// no connectors match — try a broader search</div>';
    return;
  }
  g.innerHTML = filtered.map(c=>`
    <div class="card" onclick="openModal(${c.id})" role="button" aria-label="View ${c.name} details">
      <div class="card-header">
        <div>
          <div class="card-name">${c.name}</div>
          <div class="card-pn">${c.partNumbers[0]}</div>
        </div>
        <span class="pin-badge">${c.pins}p</span>
      </div>
      <div class="card-diagram">${makeSVG(c.svgType)}</div>
      <div class="card-meta">
        <div class="meta-item"><div class="ml">Family</div><div class="mv">${c.family}</div></div>
        <div class="meta-item"><div class="ml">Layout</div><div class="mv">${c.layout}</div></div>
        <div class="meta-item"><div class="ml">Terminal</div><div class="mv">${c.terminalSize}</div></div>
        <div class="meta-item"><div class="ml">Gauge</div><div class="mv">${c.gaugeRange}</div></div>
      </div>
      <div class="colour-row">${swatchDots(c.colors)}</div>
      <div class="platform-tags">${platformTagsHTML(c.platforms)}</div>
      <div class="card-tags">
        ${c.usage.slice(0,2).map(u=>`<span class="tag">${u}</span>`).join('')}
        ${c.usage.length>2 ? `<span class="family-badge">+${c.usage.length-2} more</span>` : ''}
      </div>
    </div>
  `).join('');
}

function openModal(id){
  const c = connectors.find(x=>x.id===id);
  const m = document.getElementById('modal');
  const sealedBadge = c.sealed
    ? `<span style="background:rgba(90,170,120,0.15);border:1px solid rgba(90,170,120,0.35);color:#5aaa78;font-size:10px;font-family:monospace;padding:2px 7px;border-radius:3px;">IP-rated sealed</span>`
    : `<span style="background:rgba(200,181,96,0.08);border:1px solid rgba(200,181,96,0.2);color:#888;font-size:10px;font-family:monospace;padding:2px 7px;border-radius:3px;">unsealed</span>`;
  const platformsHTML = (c.platforms||[]).map(p=>
    `<span class="platform-tag${p==='All VAG'?' all-vag':''}">${p}</span>`
  ).join('');
  m.innerHTML = `<div class="modal-overlay" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-inner">
        <div class="modal-top">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="modal-title">${c.name}</span>
              ${sealedBadge}
            </div>
            <div class="modal-pn">${c.partNumbers.join('  ·  ')}</div>
          </div>
          <button class="close-btn" onclick="document.getElementById('modal').innerHTML=''">×</button>
        </div>
        <div class="modal-diagram">${makeSVG(c.svgType)}</div>
        <div class="detail-grid">
          <div class="detail-item"><div class="dl">Family</div><div class="dv">${c.family}</div></div>
          <div class="detail-item"><div class="dl">Manufacturer</div><div class="dv">${c.manufacturer}</div></div>
          <div class="detail-item"><div class="dl">Pin count</div><div class="dv">${c.pins} pins</div></div>
          <div class="detail-item"><div class="dl">Layout</div><div class="dv">${c.layout}</div></div>
          <div class="detail-item"><div class="dl">Terminal size</div><div class="dv">${c.terminalSize}</div></div>
          <div class="detail-item"><div class="dl">Wire gauge</div><div class="dv">${c.gaugeRange}</div></div>
          <div class="detail-item"><div class="dl">Locking</div><div class="dv">${c.locking}</div></div>
        </div>
        <div class="section-head">Common platforms</div>
        <div class="platform-tags" style="margin-bottom:0.75rem">${platformsHTML}</div>
        <div class="section-head">Housing colours</div>
        <div class="modal-colour-row">${modalColourChips(c.colors)}</div>
        <div class="section-head">VAG part numbers</div>
        <div class="chip-row">${c.partNumbers.map(p=>`<span class="chip">${p}</span>`).join('')}</div>
        ${c.tyco && c.tyco[0] !== 'N/A' ? `<div class="section-head">OEM / manufacturer reference</div><div class="chip-row">${c.tyco.map(p=>`<span class="chip">${p}</span>`).join('')}</div>` : ''}
        <div class="section-head">Compatible terminals</div>
        <div class="chip-row">${c.terminals.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
        <div class="section-head">Seals & weatherproofing</div>
        <div class="chip-row">${c.seals.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
        <div class="section-head">Common applications</div>
        <ul class="usage-list">${c.usage.map(u=>`<li>${u}</li>`).join('')}</ul>
        <div class="section-head" style="margin-top:1rem">Notes</div>
        <div class="notes-box">${c.notes}</div>
        ${c.refs && c.refs.length ? `<div class="section-head" style="margin-top:1rem">References & sources</div>
        <div class="ref-links">${c.refs.map(r=>`<a class="ref-link" href="${r.u}" target="_blank" rel="noopener">${r.l}</a>`).join('')}</div>` : ''}
        <div class="manufacturer-row">
          <span>Manufacturer:</span>
          <span class="mfr-badge">${c.manufacturer}</span>
          <span style="margin-left:auto;font-size:10px">⚠ Verify part numbers against ETKA before ordering</span>
        </div>
      </div>
    </div>
  </div>`;
}



function closeModal(e){
  if(e.target.classList.contains('modal-overlay'))
    document.getElementById('modal').innerHTML='';
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape') document.getElementById('modal').innerHTML='';
});

populateSelects();
render();
</script>
</body>
</html>
