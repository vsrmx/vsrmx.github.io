// VAG Connector DB — SVG diagram generator
// Renders connector diagrams procedurally based on connector svgType

// ─── SVG GENERATORS ──────────────────────────────────────────────────────────
function makeSVG(type){
  const light = document.documentElement.classList.contains('light');
  const col    = light ? '#c0281a' : '#4a9fe8';
  const body   = light ? '#e8e4dc' : '#0f1628';
  const pin_c  = light ? '#888480' : '#2a3a58';
  const stroke = light ? '#b0aca4' : '#3a5070';

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

// ─── THEME ────────────────────────────────────────────────────────────────────
function applyTheme(light, rerender){
  document.documentElement.classList.toggle('light', light);
  const icon = document.getElementById('themeIcon');
  if(icon) icon.textContent = light ? '☾' : '☀';
  try { localStorage.setItem('vag-theme', light ? 'light' : 'dark'); } catch(e){}
  // Only re-render if explicitly requested (i.e. user toggled, not page init)
  if(rerender && typeof render === 'function') render();
}

function toggleTheme(){
  applyTheme(!document.documentElement.classList.contains('light'), true);
}

// Apply saved or system preference immediately — no re-render, populateSelects handles first render
(function(){
  let saved;
  try { saved = localStorage.getItem('vag-theme'); } catch(e){}
  if(saved === 'light') applyTheme(true, false);
  else if(!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme(true, false);
})();

// ─── RECENTLY VIEWED ─────────────────────────────────────────────────────────
function getRecentlyViewed(){
  try{return JSON.parse(localStorage.getItem('vag-recent')||'[]');}catch(e){return[];}
}
function addRecentlyViewed(id){
  let r=getRecentlyViewed().filter(x=>x!==id);
  r.unshift(id);
  r=r.slice(0,6);
  try{localStorage.setItem('vag-recent',JSON.stringify(r));}catch(e){}
  renderRecentlyViewed();
}
function renderRecentlyViewed(){
  const el=document.getElementById('recently-viewed');
  if(!el)return;
  const r=getRecentlyViewed();
  if(!r.length){el.style.display='none';return;}
  const items=r.map(id=>{
    const c=connectors.find(x=>x.id===id);
    if(!c)return'';
    return`<button class="recent-item" onclick="openModal(${c.id})" title="${c.name}">${c.name}</button>`;
  }).filter(Boolean).join('');
  el.innerHTML=`<span class="recently-viewed-label">Recent</span>${items}<button class="recent-clear" onclick="clearRecentlyViewed()" title="Clear recently viewed">Clear</button>`;
  el.style.display='flex';
}
function clearRecentlyViewed(){
  try{localStorage.removeItem('vag-recent');}catch(e){}
  const el=document.getElementById('recently-viewed');
  if(el){el.style.display='none';}
}

// ─── DEEP LINKING ─────────────────────────────────────────────────────────────
function checkDeepLink(){
  const m=window.location.hash.match(/#connector-(\d+)/);
  if(m){
    const id=parseInt(m[1]);
    if(connectors.find(x=>x.id===id)) openModal(id);
  }
}

// ─── REPAIR KIT BUILDER ───────────────────────────────────────────────────────
const REPAIR_KIT_DATA={
  '1.5mm':{
    f:'N 10335706 (0.35–0.5mm²)  ·  N 10335807 (0.5–1.0mm²)',
    m:'N 10336005 (0.35–0.5mm²)  ·  N 10336105 (0.5–1.0mm²)',
    seals:'357972740D grey 0.5–0.75mm²  ·  357972740E red 0.35–0.5mm²  ·  357972740F yellow 1.0mm²',
    tool:'Rennsteig PEW 12 1.5  ·  Engineer PA-09  ·  VAG SST 1-1715'
  },
  '2.8mm':{
    f:'N 90684307 (0.35–0.5mm²)  ·  N 90684405 (0.5–1.0mm²)  ·  N 90684505 (1.5–2.5mm²)',
    m:'N 10318905 (0.5–1.0mm²)  ·  N 10319005 (1.5–2.5mm²)',
    seals:'357972741 blue 0.35–1.0mm²  ·  357972741A red 1.5mm²  ·  357972741B yellow 1.5–2.5mm²',
    tool:'Rennsteig PEW 12 2.8  ·  Engineer PA-09  ·  VAG SST 1-1716'
  },
  '4.8mm':{
    f:'N 90732603 (0.5–1.0mm²)  ·  N 90732703 (1.5–2.5mm²)  ·  N 90696603 (4.0mm²)',
    m:'N 10319103 (0.5–1.0mm²)  ·  N 10319203 (1.5–2.5mm²)  ·  N 10319303 (4.0mm²)',
    seals:'357972742A white 0.5–1.0mm²  ·  357972742B red 1.5–2.5mm²  ·  357972742E blue 2.5–4.0mm²',
    tool:'Rennsteig PEW 12 4.8  ·  IWISS IWS-2820M  ·  VAG SST 1-1717'
  },
  'MQS':{
    f:'000 979 034EA (pre-terminated repair wire, 0.5mm²)',
    m:'N/A — use repair wire only',
    seals:'Integral — no separate seals required',
    tool:'Engineer PA-20  ·  Rennsteig PEW 12 MQS  ·  VAG SST 1-1978'
  },
  'MCON':{
    f:'MCON 1.2mm socket terminal',
    m:'MCON 1.2mm pin terminal',
    seals:'Integral — no separate seals',
    tool:'2-1579007-9 (TE Connectivity)  ·  Rennsteig PEW 12 MCON'
  },
};
function buildRepairKit(c){
  const ts=c.terminalSize||'';
  let key=null;
  if(/\b1\.5mm\b/.test(ts)&&!/MQS|MCON|BAK/.test(ts)) key='1.5mm';
  else if(/\b2\.8mm\b/.test(ts)&&!/BAK/.test(ts)) key='2.8mm';
  else if(/\b4\.8mm\b/.test(ts)) key='4.8mm';
  else if(/MQS|0\.63mm/.test(ts)) key='MQS';
  else if(/MCON|1\.2mm/.test(ts)) key='MCON';
  if(!key) return'';
  const d=REPAIR_KIT_DATA[key];
  return`
    <div class="repair-kit">
      <div class="repair-kit-row"><span class="repair-kit-label">Female terminals</span><span class="repair-kit-value">${d.f}</span></div>
      <div class="repair-kit-row"><span class="repair-kit-label">Male terminals</span><span class="repair-kit-value">${d.m}</span></div>
      ${c.sealed?`<div class="repair-kit-row"><span class="repair-kit-label">Wire seals</span><span class="repair-kit-value">${d.seals}</span></div>`:''}
      <div class="repair-kit-row"><span class="repair-kit-label">Crimp tool</span><span class="repair-kit-value">${d.tool}</span></div>
    </div>`;
}

// ─── WHERE TO BUY ─────────────────────────────────────────────────────────────
function buildWhereToBuy(c){
  const pn=c.partNumbers.find(p=>p&&p!=='N/A'&&!p.includes('N/A')&&p.length>4);
  if(!pn) return'';
  const q=encodeURIComponent(pn.replace(/\s+/g,''));
  const qs=encodeURIComponent(pn);
  return`
    <div class="buy-links">
      <a class="buy-link" href="https://www.ecstuning.com/Search/SiteSearch/${q}/ES/" target="_blank" rel="noopener">ECS Tuning ↗</a>
      <a class="buy-link" href="https://www.fcpeuro.com/products?search=${q}" target="_blank" rel="noopener">FCP Euro ↗</a>
      <a class="buy-link" href="https://www.corsa-technic.com/search.php?search_query=${qs}" target="_blank" rel="noopener">Corsa-Technic ↗</a>
      <a class="buy-link" href="https://www.ebay.com/sch/i.html?_nkw=${qs}+vw+audi" target="_blank" rel="noopener">eBay ↗</a>
    </div>`;
}

// ─── SIMILAR CONNECTORS ───────────────────────────────────────────────────────
function buildSimilarConnectors(c){
  // Same family first, then same pin count + same function
  const byFamily=connectors.filter(x=>x.id!==c.id&&x.family===c.family);
  const byPinFunc=connectors.filter(x=>x.id!==c.id&&x.family!==c.family&&x.pins===c.pins&&x.func===c.func);
  const similar=[...byFamily,...byPinFunc].slice(0,4);
  if(!similar.length) return'';
  return`<div class="similar-grid">${similar.map(s=>`
    <div class="similar-card" onclick="openModal(${s.id})">
      <div class="similar-card-name">${s.name}</div>
      <div class="similar-card-meta">${s.pins}p · ${s.family}</div>
    </div>`).join('')}</div>`;
}

// ─── PRINT CONNECTOR SHEET ────────────────────────────────────────────────────
function printConnector(id){
  const c=connectors.find(x=>x.id===id);
  if(!c)return;
  const platforms=(c.platforms||[]).map(p=>`<span style="background:#eef;border:1px solid #ccd;padding:1px 6px;border-radius:3px;font-family:monospace;font-size:11px;margin:2px;display:inline-block">${p}</span>`).join('');
  const ts=c.terminalSize||'';
  let kitHTML='<p style="color:#888;font-size:11px">See Reference tab for terminal data</p>';
  let key=null;
  if(/\b1\.5mm\b/.test(ts)&&!/MQS|MCON|BAK/.test(ts))key='1.5mm';
  else if(/\b2\.8mm\b/.test(ts)&&!/BAK/.test(ts))key='2.8mm';
  else if(/\b4\.8mm\b/.test(ts))key='4.8mm';
  else if(/MQS|0\.63mm/.test(ts))key='MQS';
  else if(/MCON|1\.2mm/.test(ts))key='MCON';
  if(key){
    const d=REPAIR_KIT_DATA[key];
    kitHTML=`<div>
      <div class="kit-row"><span class="kit-label">Female terminals</span><span>${d.f}</span></div>
      <div class="kit-row"><span class="kit-label">Male terminals</span><span>${d.m}</span></div>
      ${c.sealed?`<div class="kit-row"><span class="kit-label">Wire seals</span><span>${d.seals}</span></div>`:''}
      <div class="kit-row"><span class="kit-label">Crimp tool</span><span>${d.tool}</span></div>
    </div>`;
  }
  const printHTML=`<!DOCTYPE html><html><head><title>${c.name} — VAG Connector DB</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;max-width:740px;margin:32px auto;padding:0 24px;color:#111;font-size:13px;line-height:1.5}
  h1{font-size:17px;font-weight:600;border-bottom:2px solid #111;padding-bottom:8px;margin-bottom:4px}
  .pn{font-family:monospace;font-size:12px;color:#555;margin-bottom:16px}
  h2{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#888;margin:16px 0 6px;border-bottom:1px solid #eee;padding-bottom:4px}
  table{width:100%;border-collapse:collapse;font-size:12px}
  td{padding:5px 6px;border-bottom:1px solid #eee;vertical-align:top}
  td:first-child{font-weight:600;width:130px;color:#444;white-space:nowrap}
  .platforms{margin:4px 0 8px}
  .notes{font-size:12px;line-height:1.6;background:#f8f8f8;padding:10px 12px;border-radius:4px;border-left:3px solid #ccc}
  ul{margin:0;padding-left:16px}
  li{margin-bottom:2px;font-size:12px}
  .kit-row{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #eee;font-family:monospace;font-size:11px}
  .kit-row:last-child{border-bottom:none}
  .kit-label{color:#888;width:110px;flex-shrink:0;font-size:10px;text-transform:uppercase}
  .footer{margin-top:28px;font-size:10px;color:#aaa;border-top:1px solid #eee;padding-top:10px;display:flex;justify-content:space-between}
  @media print{body{margin:16px;padding:0}}
</style></head><body>
<h1>${c.name}</h1>
<div class="pn">${c.partNumbers.join('  ·  ')}</div>
<h2>Connector details</h2>
<table>
  <tr><td>Family</td><td>${c.family}</td></tr>
  <tr><td>Manufacturer</td><td>${c.manufacturer}</td></tr>
  <tr><td>Pins</td><td>${c.pins} pins — ${c.layout}</td></tr>
  <tr><td>Terminal size</td><td>${c.terminalSize}</td></tr>
  <tr><td>Wire gauge</td><td>${c.gaugeRange}</td></tr>
  <tr><td>Locking</td><td>${c.locking}</td></tr>
  <tr><td>Sealed</td><td>${c.sealed?'Yes — IP-rated sealed':'No — unsealed'}</td></tr>
</table>
<h2>Common platforms</h2>
<div class="platforms">${platforms}</div>
<h2>Compatible terminals</h2>
<ul>${c.terminals.map(t=>`<li>${t}</li>`).join('')}</ul>
${c.sealed?`<h2>Wire seals</h2><ul>${c.seals.map(s=>`<li>${s}</li>`).join('')}</ul>`:''}
<h2>Repair kit</h2>${kitHTML}
<h2>Common applications</h2>
<ul>${c.usage.map(u=>`<li>${u}</li>`).join('')}</ul>
<h2>Notes</h2>
<div class="notes">${c.notes}</div>
<div class="footer"><span>VAG Connector DB — vsrmx.github.io</span><span>⚠ Verify part numbers against ETKA before ordering</span></div>
</body></html>`;

  // Use a hidden iframe — avoids popup blockers entirely
  const existing=document.getElementById('print-iframe');
  if(existing) existing.remove();
  const iframe=document.createElement('iframe');
  iframe.id='print-iframe';
  iframe.style.cssText='position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;';
  document.body.appendChild(iframe);
  iframe.contentDocument.open();
  iframe.contentDocument.write(printHTML);
  iframe.contentDocument.close();
  setTimeout(()=>{
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(()=>{ if(iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 2000);
  }, 400);
}

// ─── TAB SWITCHING ───────────────────────────────────────────────────────────
function switchTab(tab, btn){
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide panes
  document.getElementById('tab-connectors').style.display = tab === 'connectors' ? '' : 'none';
  document.getElementById('tab-reference').style.display  = tab === 'reference'   ? '' : 'none';
  // Hide filter panel when switching to reference
  if(tab === 'reference'){
    document.getElementById('filterPanel').classList.remove('open');
    document.getElementById('filterToggle').classList.remove('active');
  }
}

// ─── FILTER PANEL / DRAWER ───────────────────────────────────────────────────
const MOBILE_BP = 640;

function isMobile(){ return window.innerWidth <= MOBILE_BP; }

function toggleFilters(){
  // Only relevant on the connectors tab
  if(document.getElementById('tab-connectors').style.display === 'none') return;
  if(isMobile()){
    openDrawer();
  } else {
    const panel = document.getElementById('filterPanel');
    const btn = document.getElementById('filterToggle');
    const open = panel.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.innerHTML = (open ? '▴' : '▾') + ' Filters' + (btn.classList.contains('has-filters') ? '<span class="filter-toggle-dot"></span>' : '');
    // rebuild button cleanly
    btn.innerHTML = `<span class="filter-toggle-dot"></span>${open ? '▴' : '▾'} Filters`;
  }
}

function openDrawer(){
  // sync desktop values → drawer
  document.getElementById('drawerFamily').value   = document.getElementById('filterFamily').value;
  document.getElementById('drawerPins').value     = document.getElementById('filterPins').value;
  document.getElementById('drawerMfr').value      = document.getElementById('filterMfr').value;
  document.getElementById('drawerColor').value    = document.getElementById('filterColor').value;
  document.getElementById('drawerPlatform').value = document.getElementById('filterPlatform').value;
  document.getElementById('filterDrawer').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeDrawer(){
  document.getElementById('filterDrawer').style.display = 'none';
  document.body.style.overflow = '';
}

function syncFromDrawer(){
  document.getElementById('filterFamily').value   = document.getElementById('drawerFamily').value;
  document.getElementById('filterPins').value     = document.getElementById('drawerPins').value;
  document.getElementById('filterMfr').value      = document.getElementById('drawerMfr').value;
  document.getElementById('filterColor').value    = document.getElementById('drawerColor').value;
  document.getElementById('filterPlatform').value = document.getElementById('drawerPlatform').value;
  document.getElementById('filterFunc').value     = document.getElementById('drawerFunc').value;
  render();
  updateFilterState();
}

function clearFilters(){
  ['filterFamily','filterPins','filterMfr','filterColor','filterPlatform','filterFunc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  ['drawerFamily','drawerPins','drawerMfr','drawerColor','drawerPlatform','drawerFunc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  render();
  updateFilterState();
}

function updateFilterState(){
  const active = ['filterFamily','filterPins','filterMfr','filterColor','filterPlatform','filterFunc']
    .some(id => document.getElementById(id).value !== '');
  const btn = document.getElementById('filterToggle');
  btn.classList.toggle('has-filters', active);
}
