// VAG Connector DB — main application code
// Depends on svg.js (loaded before this) and data/connectors.json (fetched async)

// ─── POPULATE SELECTS ────────────────────────────────────────────────────────
function populateSelects(){
  const fams = [...new Set(connectors.map(c=>c.family))].sort();
  const mfrs = [...new Set(connectors.map(c=>c.manufacturer))].sort();

  const fSel = document.getElementById('filterFamily');
  const mSel = document.getElementById('filterMfr');
  const dfSel = document.getElementById('drawerFamily');
  const dmSel = document.getElementById('drawerMfr');

  fams.forEach(f=>{
    const o = () => { const el=document.createElement('option'); el.value=f; el.textContent=f; return el; };
    fSel.appendChild(o());
    dfSel.appendChild(o());
  });
  mfrs.forEach(m=>{
    const o = () => { const el=document.createElement('option'); el.value=m; el.textContent=m; return el; };
    mSel.appendChild(o());
    dmSel.appendChild(o());
  });

  document.getElementById('total').textContent = connectors.length;
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
  const q   = document.getElementById('search').value.toLowerCase().trim();
  const fp  = document.getElementById('filterPins').value;
  const ff  = document.getElementById('filterFamily').value;
  const fm  = document.getElementById('filterMfr').value;
  const fc  = document.getElementById('filterColor').value;
  const fpl = document.getElementById('filterPlatform').value;
  const fn  = document.getElementById('filterFunc').value;
  return connectors.filter(c=>{
    const matchQ = !q || c.name.toLowerCase().includes(q)
      || c.partNumbers.join(' ').toLowerCase().includes(q)
      || c.family.toLowerCase().includes(q)
      || c.usage.join(' ').toLowerCase().includes(q)
      || c.manufacturer.toLowerCase().includes(q)
      || c.notes.toLowerCase().includes(q)
      || (c.colors||[]).map(x=>x.name+' '+x.ctx).join(' ').toLowerCase().includes(q)
      || (c.platforms||[]).join(' ').toLowerCase().includes(q)
      || (c.func||'').toLowerCase().includes(q);
    const matchP  = !fp || (fp==='10' ? c.pins>=10 : c.pins===parseInt(fp));
    const matchF  = !ff || c.family===ff;
    const matchM  = !fm || c.manufacturer===fm;
    const matchC  = connectorMatchesColor(c, fc);
    const matchPl = !fpl || (c.platforms||[]).includes(fpl);
    const matchFn = !fn  || c.func===fn;
    return matchQ && matchP && matchF && matchM && matchC && matchPl && matchFn;
  });
}

function platformClass(p){
  if(p === 'All VAG') return ' all-vag';
  if(/^(B\d|C\d|8L|8P|8V|MLB|D\d)/.test(p)) return ' audi';
  return '';
}

function platformTagsHTML(platforms, max=6){
  if(!platforms||!platforms.length) return '';
  const shown = platforms.slice(0, max);
  const rest = platforms.length - max;
  let html = shown.map(p=>`<span class="platform-tag${platformClass(p)}">${p}</span>`).join('');
  if(rest > 0) html += `<span class="platform-tag">+${rest}</span>`;
  return html;
}

// ─── FUNCTION GROUP ORDER ────────────────────────────────────────────────────
const FUNC_ORDER = [
  'Engine & Sensors','Ignition & Coils','Fuel & Injection','Lambda & Emissions',
  'Cooling & HVAC','ABS & Brakes','Body & Interior','Lighting & Exterior',
  'Audio & Infotainment','Diagnostics & ECU','Power & High-Current','Towing','Generic / Multi-use',
];

function getCollapseState(){
  try{return JSON.parse(localStorage.getItem('vag-collapsed')||'{}');}catch(e){return {};}
}
function isGroupCollapsed(key){
  const s=getCollapseState();
  // If no saved state for this key, default to collapsed
  return s[key]===undefined ? true : s[key];
}
function setCollapseState(key,collapsed){
  try{const s=getCollapseState();s[key]=collapsed;localStorage.setItem('vag-collapsed',JSON.stringify(s));}catch(e){}
}
function toggleGroup(key){
  const cards=document.getElementById('grp-cards-'+key);
  const chev=document.getElementById('grp-chev-'+key);
  if(!cards)return;
  const nowCollapsed=cards.classList.toggle('collapsed');
  chev.classList.toggle('collapsed',nowCollapsed);
  setCollapseState(key,nowCollapsed);
}

function cardHTML(c){
  return `
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
        ${c.usage.length>2?`<span class="family-badge">+${c.usage.length-2} more</span>`:''}
      </div>
      <div class="card-details-hint">View full details</div>
    </div>`;
}

function render(){
  const filtered=getFiltered();
  document.getElementById('shown').textContent=filtered.length;
  const g=document.getElementById('grid');
  if(!filtered.length){
    g.innerHTML='<div class="empty">// no connectors match — try a broader search</div>';
    return;
  }
  // Always grouped — empty groups are simply skipped
  const groups={};
  FUNC_ORDER.forEach(f=>groups[f]=[]);
  filtered.forEach(c=>{const f=c.func||'Generic / Multi-use';if(!groups[f])groups[f]=[];groups[f].push(c);});
  let html='';
  FUNC_ORDER.forEach(func=>{
    const cards=groups[func];
    if(!cards||!cards.length)return;
    const key=func.replace(/[^a-zA-Z0-9]/g,'_');
    const isCollapsed=isGroupCollapsed(key);
    html+=`
      <div class="func-group-header" onclick="toggleGroup('${key}')">
        <span class="func-group-chevron${isCollapsed?' collapsed':''}" id="grp-chev-${key}">▾</span>
        <span class="func-group-label">${func}</span>
        <span class="func-group-count">${cards.length}</span>
      </div>
      <div class="func-group-cards${isCollapsed?' collapsed':''}" id="grp-cards-${key}">
        ${cards.map(c=>cardHTML(c)).join('')}
      </div>`;
  });
  g.innerHTML=html;
}

// Body scroll lock — iOS requires position:fixed trick
let scrollY = 0;
function lockBodyScroll(){
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.overflow = 'hidden';
}
function unlockBodyScroll(){
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflow = '';
  window.scrollTo(0, scrollY);
}

function openModal(id){
  const c=connectors.find(x=>x.id===id);
  const m=document.getElementById('modal');

  // Track recently viewed + update URL hash
  addRecentlyViewed(id);
  try { history.replaceState(null,'','#connector-'+id); } catch(e) {}

  const sealedBadge=c.sealed
    ?`<span style="background:rgba(90,170,120,0.15);border:1px solid rgba(90,170,120,0.35);color:#5aaa78;font-size:10px;font-family:monospace;padding:2px 7px;border-radius:3px;">IP-rated sealed</span>`
    :`<span style="background:rgba(200,181,96,0.08);border:1px solid rgba(200,181,96,0.2);color:#888;font-size:10px;font-family:monospace;padding:2px 7px;border-radius:3px;">unsealed</span>`;

  const platformsHTML=(c.platforms||[]).map(p=>
    `<span class="platform-tag${platformClass(p)}">${p}</span>`
  ).join('');

  const repairKit=buildRepairKit(c);
  const whereToBuy=buildWhereToBuy(c);
  const similarHTML=buildSimilarConnectors(c);

  m.innerHTML=`<div class="modal-overlay" id="modalOverlay" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-head">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span class="modal-title">${c.name}</span>
            ${sealedBadge}
          </div>
          <div class="modal-pn">${c.partNumbers.join('  ·  ')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
          <button class="modal-print-btn" onclick="printConnector(${c.id})">Print ↗</button>
          <button class="modal-close" onclick="dismissModal()" aria-label="Close">×</button>
        </div>
      </div>
      <div class="modal-body">
        ${c.imageUrl?`<img class="modal-photo" src="${c.imageUrl}" alt="${c.name}" loading="lazy" onerror="this.style.display='none'">`:`<div class="modal-photo-placeholder">📷 No photo yet — contributions welcome</div>`}
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
        ${c.tyco&&c.tyco[0]!=='N/A'?`<div class="section-head">OEM / manufacturer reference</div><div class="chip-row">${c.tyco.map(p=>`<span class="chip">${p}</span>`).join('')}</div>`:''}
        ${repairKit?`<div class="section-head">Repair kit</div>${repairKit}`:''}
        ${whereToBuy?`<div class="section-head">Where to buy</div>${whereToBuy}`:''}
        <div class="section-head">Compatible terminals</div>
        <div class="chip-row">${c.terminals.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
        <div class="section-head">Seals &amp; weatherproofing</div>
        <div class="chip-row">${c.seals.map(s=>`<span class="chip">${s}</span>`).join('')}</div>
        <div class="section-head">Common applications</div>
        <ul class="usage-list">${c.usage.map(u=>`<li>${u}</li>`).join('')}</ul>
        <div class="section-head" style="margin-top:1rem">Notes</div>
        <div class="notes-box">${c.notes}</div>
        ${c.refs&&c.refs.length?`<div class="section-head" style="margin-top:1rem">References &amp; sources</div>
        <div class="ref-links">${c.refs.map(r=>`<a class="ref-link" href="${r.u}" target="_blank" rel="noopener">${r.l}</a>`).join('')}</div>`:''}
        ${similarHTML?`<div class="section-head" style="margin-top:1rem">Similar connectors</div>${similarHTML}`:''}
        <div class="manufacturer-row">
          <span>Manufacturer:</span>
          <span class="mfr-badge">${c.manufacturer}</span>
          <span style="margin-left:auto;font-size:10px">⚠ Verify part numbers against ETKA before ordering</span>
        </div>
      </div>
    </div>
  </div>`;

  lockBodyScroll();
}

function dismissModal(){
  document.getElementById('modal').innerHTML = '';
  unlockBodyScroll();
  try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch(e) {}
}

function closeModal(e){
  if(e.target.id === 'modalOverlay') dismissModal();
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    if(document.getElementById('modal').innerHTML) dismissModal();
    else closeDrawer();
  }
});

// Load connector data, then initialise everything
let connectors = [];
fetch('data/connectors.json')
  .then(r => r.json())
  .then(data => {
    connectors = data;
    populateSelects();
    render();
    renderRecentlyViewed();
    checkDeepLink();
  })
  .catch(err => {
    console.error('Failed to load connector data:', err);
    document.getElementById('grid').innerHTML =
      '<div class="empty">Failed to load connector data. Please refresh the page.</div>';
  });
