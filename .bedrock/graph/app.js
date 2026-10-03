(function () {
  'use strict';

  /* ================= helpers ================= */
  const doc = document;
  const $ = (sel, root) => (root || doc).querySelector(sel);
  const SVG_NS = $('#svg').namespaceURI; // taken from the markup so no URL literal is needed
  const plural = (n, w, pl) => n + ' ' + (n === 1 ? w : pl || w + 's');

  // DOM builder. Text is only ever inserted as text nodes / textContent (vault strings are untrusted data).
  function h(tag, props) {
    const e = doc.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else e.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      const kid = arguments[i];
      if (kid == null || kid === false) continue;
      e.append(kid);
    }
    return e;
  }
  function s(tag, attrs) {
    const e = doc.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    return e;
  }

  /* ================= data ================= */
  const DATA = JSON.parse(doc.getElementById('graph-data').textContent);
  const nodes = DATA.nodes;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  // vault-relative path of a note without ".md" (when several notes share a file name, the id already is that path)
  const notePath = (n) => (n.id.indexOf('/') >= 0 || !n.dir ? n.id : n.dir + '/' + n.id);
  const adj = new Map(nodes.map((n) => [n.id, new Map()]));
  for (const l of DATA.links) {
    adj.get(l.source).set(l.target, l.weight);
    adj.get(l.target).set(l.source, l.weight);
  }
  const mentions = new Map();
  for (const n of nodes) {
    let sum = 0;
    for (const w of adj.get(n.id).values()) sum += w;
    mentions.set(n.id, sum);
  }
  // label / keyboard priority: degree, then total mentions, then title
  const ranked = nodes
    .slice()
    .sort((a, b) => b.degree - a.degree || mentions.get(b.id) - mentions.get(a.id) || a.title.localeCompare(b.title));
  ranked.forEach((n, i) => { n.rank = i; });
  // node radius scales with sqrt(degree) (area is proportional to degree), with a small floor
  nodes.forEach((n) => { n.r = Math.max(4.5, 3.4 * Math.sqrt(n.degree)); });

  // Entity types. Colours live in CSS (--t-<type>), fixed to the vault's Obsidian graph colours.
  // 'other' collects notes with no (or an unrecognised) type: neutral grey, and a legend chip only while there is one.
  const TYPES = [
    { key: 'actor', shape: 'circle' },
    { key: 'person', shape: 'star' },
    { key: 'team', shape: 'pentagon' },
    { key: 'topic', shape: 'square' },
    { key: 'discussion', shape: 'diamond' },
    { key: 'project', shape: 'triangle' },
    { key: 'fleeting', shape: 'cross' },
    { key: 'concept', shape: 'hexagon' },
    { key: 'other', shape: 'octagon' },
  ];
  const shapeOf = new Map(TYPES.map((t) => [t.key, t.shape]));
  const typeTotal = new Map(TYPES.map((t) => [t.key, 0]));
  for (const n of nodes) typeTotal.set(n.type, (typeTotal.get(n.type) || 0) + 1);
  const isOther = (t) => (t.key === 'other' ? 1 : 0);
  const orderedTypes = TYPES.filter((t) => !isOther(t) || typeTotal.get(t.key) > 0).sort(
    (a, b) => isOther(a) - isOther(b) || typeTotal.get(b.key) - typeTotal.get(a.key) || TYPES.indexOf(a) - TYPES.indexOf(b)
  );
  const domainCount = new Map();
  for (const n of nodes) for (const d of n.domains) domainCount.set(d, (domainCount.get(d) || 0) + 1);

  /* ================= shapes (opt-in secondary encoding) =================
     Every shape has the same area as the circle of the node's radius, so area still encodes degree. */
  const POLY = {};
  const regular = (n, rot) => {
    const v = [];
    for (let i = 0; i < n; i++) {
      const a = rot + (2 * Math.PI * i) / n;
      v.push([Math.cos(a), Math.sin(a)]);
    }
    return v;
  };
  POLY.square = regular(4, Math.PI / 4);
  POLY.diamond = regular(4, 0);
  POLY.triangle = regular(3, -Math.PI / 2);
  POLY.pentagon = regular(5, -Math.PI / 2);
  POLY.hexagon = regular(6, 0);
  POLY.octagon = regular(8, Math.PI / 8);
  POLY.star = (() => {
    const v = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (Math.PI * i) / 5;
      const rr = i % 2 ? 0.52 : 1;
      v.push([rr * Math.cos(a), rr * Math.sin(a)]);
    }
    return v;
  })();
  POLY.cross = (() => {
    const t = 0.36;
    return [[-t, -1], [t, -1], [t, -t], [1, -t], [1, t], [t, t], [t, 1], [-t, 1], [-t, t], [-1, t], [-1, -t], [-t, -t]];
  })();
  const polyArea = (v) => {
    let a = 0;
    for (let i = 0; i < v.length; i++) {
      const p = v[i], q = v[(i + 1) % v.length];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return Math.abs(a) / 2;
  };
  const POLY_AREA = {};
  for (const k in POLY) POLY_AREA[k] = polyArea(POLY[k]);
  const pathCache = new Map();
  function shapePath(shape, r) {
    const key = shape + '|' + r.toFixed(2);
    let p = pathCache.get(key);
    if (p) return p;
    if (shape === 'circle') {
      p = 'M' + -r + ',0a' + r + ',' + r + ' 0 1,0 ' + 2 * r + ',0a' + r + ',' + r + ' 0 1,0 ' + -2 * r + ',0Z';
    } else {
      const sc = Math.sqrt((Math.PI * r * r) / POLY_AREA[shape]);
      p = 'M' + POLY[shape].map((q) => (q[0] * sc).toFixed(2) + ',' + (q[1] * sc).toFixed(2)).join('L') + 'Z';
    }
    pathCache.set(key, p);
    return p;
  }

  /* ================= state ================= */
  const state = {
    on: new Set(), // visible types
    domain: 'all',
    q: '',
    sel: null,
    hov: null,
    kb: null,
    shapes: !!(window.matchMedia && matchMedia('(forced-colors: active)').matches),
    table: false,
    sort: { key: 'degree', dir: -1 },
  };
  for (const [k, c] of typeTotal) if (c > 0) state.on.add(k);
  const reduceMq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  let derived = { visible: new Set(), match: null, focus: null, linkCount: 0, vrank: new Map(), visKey: '' };
  function computeDerived() {
    const vis = new Set();
    for (const n of nodes) {
      if (state.on.has(n.type) && (state.domain === 'all' || n.domains.includes(state.domain))) vis.add(n.id);
    }
    if (state.sel && !vis.has(state.sel)) state.sel = null;
    if (state.kb && !vis.has(state.kb)) state.kb = null;
    const toks = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let match = null;
    if (toks.length) {
      match = new Set();
      for (const n of nodes) {
        if (!vis.has(n.id)) continue;
        const hay = (n.title + ' ' + n.id).toLowerCase();
        if (toks.every((t) => hay.includes(t))) match.add(n.id);
      }
    }
    let focus = null;
    if (state.sel) {
      focus = new Set([state.sel]);
      for (const o of adj.get(state.sel).keys()) if (vis.has(o)) focus.add(o);
    }
    let lc = 0;
    for (const l of DATA.links) if (vis.has(l.source) && vis.has(l.target)) lc++;
    // label rank among the notes currently shown (so a filtered subset still gets its own top labels)
    const vrank = new Map();
    let ri = 0;
    for (const n of ranked) if (vis.has(n.id)) vrank.set(n.id, ri++);
    derived = { visible: vis, match, focus, linkCount: lc, vrank, visKey: [...vrank.keys()].sort().join('|') };
  }

  /* ================= elements ================= */
  const graphEl = $('#graph');
  const tip = $('#tip');
  const panel = $('#panel');
  const live = $('#live');
  const qEl = $('#q');
  let graph = null;

  function announce(msg) {
    live.textContent = '';
    setTimeout(() => { live.textContent = msg; }, 30);
  }

  /* ================= header / legend / filters ================= */
  function updateSummary() {
    const total = nodes.length;
    const typesInUse = [...typeTotal.values()].filter(Boolean).length;
    $('#sum-main').textContent =
      plural(total, 'note') + ' · ' + plural(DATA.links.length, 'link') + ' · ' + plural(typesInUse, 'type');
    const filtered = derived.visible.size !== total;
    $('#sum-filter').textContent = filtered
      ? 'Showing ' + derived.visible.size + ' of ' + total + ' notes, ' + plural(derived.linkCount, 'link')
      : '';
    graphEl.setAttribute(
      'aria-label',
      'Link graph of ' + plural(total, 'note') + ' and ' + plural(DATA.links.length, 'link') + '. Use the table view for a list.'
    );
  }
  function updateSearchInfo() {
    $('#qinfo').textContent = derived.match ? plural(derived.match.size, 'match', 'matches') : '';
  }

  const chipEls = new Map();
  const swatchPathFor = (type) => shapePath(state.shapes ? shapeOf.get(type) : 'circle', 5.2);
  function buildChips() {
    const wrap = $('#chips');
    for (const t of orderedTypes) {
      const path = s('path', { d: swatchPathFor(t.key) });
      const sw = s('svg', { class: 'sw', viewBox: '-8 -8 16 16', 'aria-hidden': 'true', focusable: 'false' });
      sw.append(path);
      const nEl = h('span', { class: 'n' });
      const b = h('button', { type: 'button', class: 'chip t-' + t.key, 'aria-pressed': 'true' }, sw, h('span', { class: 'nm', text: t.key }), nEl);
      if (!typeTotal.get(t.key)) b.disabled = true;
      b.addEventListener('click', (e) => (e.shiftKey ? isolateType(t.key) : toggleType(t.key)));
      wrap.append(b);
      chipEls.set(t.key, { b, path, nEl });
    }
  }
  function updateChips() {
    for (const t of orderedTypes) {
      const c = chipEls.get(t.key);
      let cnt = 0;
      for (const n of nodes) if (n.type === t.key && (state.domain === 'all' || n.domains.includes(state.domain))) cnt++;
      const total = typeTotal.get(t.key);
      const on = state.on.has(t.key) && total > 0;
      c.nEl.textContent = String(cnt);
      c.b.setAttribute('aria-pressed', on ? 'true' : 'false');
      c.b.setAttribute('aria-label', t.key + ', ' + plural(cnt, 'note') + (total ? (on ? ', shown' : ', hidden') : ', none in this vault'));
      c.b.title = total
        ? (on ? 'Hide ' : 'Show ') + t.key + ' notes. Shift+click: show only this type.'
        : 'No ' + t.key + ' notes in this vault';
      c.path.setAttribute('d', swatchPathFor(t.key));
    }
  }
  function toggleType(k) {
    if (state.on.has(k)) state.on.delete(k);
    else state.on.add(k);
    update();
  }
  function isolateType(k) {
    const only = state.on.size === 1 && state.on.has(k);
    state.on = new Set();
    if (only) {
      for (const [kk, c] of typeTotal) if (c > 0) state.on.add(kk);
    } else state.on.add(k);
    update();
  }
  function buildDomains() {
    const sel = $('#domain');
    sel.append(h('option', { value: 'all', text: 'All domains' }));
    const list = [...domainCount.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    for (const [d, c] of list) sel.append(h('option', { value: d, text: d + ' (' + c + ')' }));
    sel.addEventListener('change', () => {
      state.domain = sel.value;
      update();
    });
  }

  /* ================= tooltip ================= */
  function swatchInline(type) {
    const svg = s('svg', { class: 'sw-inline', viewBox: '-8 -8 16 16', 'aria-hidden': 'true', focusable: 'false' });
    svg.append(s('path', { d: swatchPathFor(type) }));
    return h('span', { class: 't-' + type }, svg);
  }
  function tipFill(n) {
    tip.replaceChildren(
      h('p', { class: 'tt', text: n.title }),
      h(
        'dl',
        { class: 'kv' },
        h('dt', { text: 'type' }),
        h('dd', null, swatchInline(n.type), n.type),
        h('dt', { text: 'domain' }),
        h('dd', { text: n.domains.join(', ') || '—' }),
        h('dt', { text: 'status' }),
        h('dd', { text: n.status || '—' }),
        h('dt', { text: 'links' }),
        h('dd', { text: String(n.degree) })
      ),
      n.tagline ? h('p', { class: 'tg', text: n.tagline }) : null
    );
  }
  function tipPlace(cx, cy) {
    const r = graphEl.getBoundingClientRect();
    const w = tip.offsetWidth, hh = tip.offsetHeight;
    let x = cx - r.left + 14;
    let y = cy - r.top + 16;
    if (x + w > r.width - 8) x = cx - r.left - w - 14;
    if (y + hh > r.height - 8) y = cy - r.top - hh - 14;
    tip.style.transform = 'translate(' + Math.max(8, Math.round(x)) + 'px,' + Math.max(8, Math.round(y)) + 'px)';
  }
  function tipShow(n, cx, cy) {
    tipFill(n);
    tip.hidden = false;
    tipPlace(cx, cy);
  }
  function tipHide() {
    tip.hidden = true;
  }

  /* ================= selection ================= */
  function select(id, opts) {
    opts = opts || {};
    state.sel = id;
    if (id) state.kb = id;
    update();
    // narrow screens: the details live in a bottom sheet, so bring the graph card to the top of the screen first
    if (id && getComputedStyle(panel).position === 'fixed') $('#card').scrollIntoView({ block: 'start', behavior: 'auto' });
    if (id && graph && !state.table) {
      if (opts.center) graph.center(id);
      else graph.ensureInView(id, 20, true);
    }
    if (id && state.sel === id) {
      const n = byId.get(id);
      announce('Selected ' + n.title + ', ' + plural(n.degree, 'linked note'));
    }
    if (opts.focusTitle) {
      const t = $('#p-title');
      if (t) t.focus({ preventScroll: true });
    }
  }
  function clearSelection() {
    if (!state.sel) return;
    state.sel = null;
    update();
    announce('Selection cleared');
  }

  /* ================= side panel ================= */
  function metaRow(dl, k, v, cls) {
    dl.append(h('dt', { text: k }), h('dd', { class: cls || null, text: v }));
  }
  let lastPanelId = null;
  function renderPanel(focusTitle) {
    panel.replaceChildren();
    const n = state.sel ? byId.get(state.sel) : null;
    if ((n ? n.id : null) !== lastPanelId) {
      panel.scrollTop = 0; // a different note starts at its header (re-renders of the same note keep their scroll)
      lastPanelId = n ? n.id : null;
    }
    panel.classList.toggle('open', !!n);
    doc.body.classList.toggle('sheet', !!n); // lets the page scroll far enough to clear the sheet (narrow screens only)
    panel.append(h('div', { class: 'grab', 'aria-hidden': 'true' }));
    if (!n) {
      const list = h('ul', { class: 'top8' });
      for (const m of ranked.slice(0, 8)) {
        const b = h('button', { type: 'button', class: 'nb' }, h('span', { class: 'tt', text: m.title }), h('span', { class: 'w', text: plural(m.degree, 'link') }));
        b.addEventListener('click', () => select(m.id, { center: true, focusTitle: true }));
        list.append(h('li', null, b));
      }
      panel.append(
        h(
          'div',
          { class: 'p-empty' },
          h('h2', { text: 'Select a note' }),
          h('p', { text: 'Click a node, or a row in the table view, to see its tagline, metadata and linked notes.' }),
          h('div', { class: 'p-sec' }, h('h3', { text: 'Most linked' }), list)
        )
      );
      return;
    }
    const close = h('button', { type: 'button', class: 'p-close', 'aria-label': 'Close details', title: 'Close (Esc)', text: '×' });
    close.addEventListener('click', clearSelection);
    panel.append(
      h(
        'div',
        { class: 'p-head' },
        h('div', null, h('div', { class: 'kicker' }, swatchInline(n.type), h('span', { text: n.type })), h('h2', { id: 'p-title', tabindex: '-1', text: n.title })),
        close
      ),
      h('p', { class: 'p-tag', text: n.tagline || 'No tagline.' })
    );
    const dl = h('dl', { class: 'meta' });
    metaRow(dl, 'Type', n.type);
    metaRow(dl, 'Domain', n.domains.join(', ') || '—');
    metaRow(dl, 'Status', n.status || '—');
    if (n.category) metaRow(dl, 'Category', n.category);
    metaRow(dl, 'Updated', n.updated || '—');
    metaRow(dl, 'Links', plural(n.degree, 'linked note') + ' · ' + plural(mentions.get(n.id), 'mention'));
    metaRow(dl, 'File', notePath(n) + '.md', 'mono');
    panel.append(dl);
    panel.append(
      h(
        'p',
        { class: 'p-act' },
        h('a', { class: 'btn primary', href: 'obsidian://open?vault=brain&file=' + encodeURIComponent(notePath(n)), text: 'Open in Obsidian' })
      )
    );

    const nbs = [];
    for (const [oid, w] of adj.get(n.id)) nbs.push({ n: byId.get(oid), w });
    const shown = nbs.filter((x) => derived.visible.has(x.n.id));
    const sec = h('div', { class: 'p-sec' }, h('h3', { text: 'Linked notes (' + nbs.length + ')' }));
    if (shown.length < nbs.length) {
      sec.append(h('p', { class: 'note', text: plural(nbs.length - shown.length, 'linked note') + ' hidden by the current filters.' }));
    }
    for (const t of orderedTypes) {
      const g = shown
        .filter((x) => x.n.type === t.key)
        .sort((a, b) => b.w - a.w || a.n.title.localeCompare(b.n.title));
      if (!g.length) continue;
      const ul = h('ul');
      for (const x of g) {
        const b = h(
          'button',
          { type: 'button', class: 'nb', title: plural(x.w, 'mention') + ' between these two notes' },
          h('span', { class: 'tt', text: x.n.title }),
          h('span', { class: 'w', text: '×' + x.w })
        );
        b.addEventListener('click', () => select(x.n.id, { center: true, focusTitle: true }));
        ul.append(h('li', null, b));
      }
      sec.append(h('div', { class: 'grp' }, h('h4', null, swatchInline(t.key), h('span', { text: t.key + ' · ' + g.length })), ul));
    }
    panel.append(sec);
    if (focusTitle) {
      const tt = $('#p-title');
      if (tt) tt.focus({ preventScroll: true });
    }
  }
  function sheetOcclusion() {
    if (!panel.classList.contains('open') || getComputedStyle(panel).position !== 'fixed') return 0;
    const gr = graphEl.getBoundingClientRect();
    const top = window.innerHeight - panel.offsetHeight;
    return Math.max(0, Math.min(gr.height * 0.75, gr.bottom - top));
  }

  /* ================= table twin ================= */
  function sortRows(rows) {
    const { key, dir } = state.sort;
    const val = (n) =>
      key === 'title' ? n.title.toLowerCase() : key === 'type' ? n.type : key === 'domain' ? n.domains[0] || '' : key === 'status' ? n.status || '' : n.degree;
    return rows.sort((a, b) => {
      const x = val(a), y = val(b);
      const c = typeof x === 'number' ? x - y : x < y ? -1 : x > y ? 1 : 0;
      return c * dir || a.title.localeCompare(b.title);
    });
  }
  function rowFor(n) {
    const tr = h('tr', { class: n.id === state.sel ? 'on' : null });
    const b = h('button', { type: 'button', class: 'lk', text: n.title });
    if (n.id === state.sel) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', () => select(n.id));
    tr.append(
      h('td', { class: 'c-note' }, b, h('div', { class: 'sub', text: [n.type, n.domains.join(', '), n.status].filter(Boolean).join(' · ') })),
      h('td', { class: 'c-type' }, h('span', { class: 'tcell' }, swatchInline(n.type), n.type)),
      h('td', { class: 'c-dom', text: n.domains.join(', ') || '—' }),
      h('td', { class: 'c-stat', text: n.status || '—' }),
      h('td', { class: 'num c-deg', text: String(n.degree) })
    );
    return tr;
  }
  function renderTable() {
    const rows = sortRows(nodes.filter((n) => derived.visible.has(n.id) && (!derived.match || derived.match.has(n.id))));
    const tb = $('#tbody');
    tb.replaceChildren(...rows.map(rowFor));
    if (!rows.length) tb.append(h('tr', null, h('td', { colspan: '5', class: 'empty', text: 'No notes match the current filters.' })));
    for (const th of doc.querySelectorAll('#tbl-el th[data-key]')) {
      th.setAttribute('aria-sort', th.dataset.key === state.sort.key ? (state.sort.dir > 0 ? 'ascending' : 'descending') : 'none');
    }
  }
  function wireTableSort() {
    for (const th of doc.querySelectorAll('#tbl-el th[data-key]')) {
      th.querySelector('button').addEventListener('click', () => {
        const key = th.dataset.key;
        state.sort = state.sort.key === key ? { key, dir: -state.sort.dir } : { key, dir: key === 'degree' ? -1 : 1 };
        renderTable();
      });
    }
  }

  /* ================= update pipeline ================= */
  function update() {
    const prevKey = derived.visKey;
    computeDerived();
    updateChips();
    updateSummary();
    updateSearchInfo();
    if (graph) {
      graph.update();
      if (derived.visKey !== prevKey) graph.refit(); // a type/domain filter changed which notes are shown
    }
    renderPanel();
    if (state.table) renderTable();
  }
  function applyView() {
    $('#card').dataset.view = state.table ? 'table' : 'graph';
    graphEl.hidden = state.table;
    $('#tablewrap').hidden = !state.table;
    $('#tbl').setAttribute('aria-pressed', state.table ? 'true' : 'false');
    $('#shapes').setAttribute('aria-pressed', state.shapes ? 'true' : 'false');
    $('#fit').disabled = state.table || !graph;
    $('#tbl').disabled = !graph; // without the graph library the table is the only view
    if (state.table) {
      tipHide();
      renderTable();
    } else if (graph) graph.resizeNow();
  }

  /* ================= graph (d3-force + d3-zoom) ================= */
  function shortTitle(t) {
    let x = t;
    const i = x.indexOf(' (');
    if (i >= 3) x = x.slice(0, i);
    return x.length > 30 ? x.slice(0, 29).trimEnd() + '…' : x;
  }

  function initGraph() {
    const svg = d3.select('#svg');
    const viewport = svg.select('#viewport');
    const MIN_R = 4.5; // minimum on-screen node radius (px)
    let W = 0, H = 0;
    let transform = d3.zoomIdentity;
    let autoFit = true;

    const links = DATA.links.map((l) => ({ source: l.source, target: l.target, weight: l.weight }));
    let wLo = Infinity, wHi = -Infinity;
    for (const l of links) {
      if (l.weight < wLo) wLo = l.weight;
      if (l.weight > wHi) wHi = l.weight;
    }
    // edge width in screen px, sqrt-scaled across the observed weight range
    const edgeW = (w) => (wHi === wLo ? 1.6 : 1 + (2.4 * (Math.sqrt(w) - Math.sqrt(wLo))) / (Math.sqrt(wHi) - Math.sqrt(wLo)));

    const sim = d3
      .forceSimulation(nodes)
      .randomSource(d3.randomLcg(11))
      .force('link', d3.forceLink(links).id((d) => d.id).distance((l) => l.source.r + l.target.r + 26 + 60 / Math.sqrt(l.weight)))
      .force('charge', d3.forceManyBody().strength((d) => -(40 + 7 * d.r)).distanceMax(450))
      .force('collide', d3.forceCollide((d) => d.r + 3.5).iterations(2))
      .force('x', d3.forceX().strength(0.035))
      .force('y', d3.forceY().strength(0.035))
      .stop();
    for (let i = 0; i < 320; i++) sim.tick(); // settle before the first paint (deterministic: seeded RNG)

    // big nodes first (drawn underneath) so small nodes stay hit-able on top
    const order = nodes.slice().sort((a, b) => b.degree - a.degree);
    const edgeSel = viewport
      .select('#edges')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', 'edge')
      .attr('stroke-width', (l) => edgeW(l.weight).toFixed(2));
    const nodeSel = viewport
      .select('#nodes')
      .selectAll('g')
      .data(order, (d) => d.id)
      .join((enter) => {
        const g = enter.append('g').attr('class', (d) => 'node t-' + d.type);
        g.append('circle').attr('class', 'hit');
        g.append('path').attr('class', 'mark');
        g.append('circle').attr('class', 'ring');
        return g;
      });
    const labelSel = svg
      .select('#labels')
      .selectAll('text')
      .data(order)
      .join('text')
      .attr('class', 'label')
      .text((d) => shortTitle(d.title));

    function setShapes() {
      nodeSel.select('.mark').attr('d', (d) => shapePath(state.shapes ? shapeOf.get(d.type) : 'circle', d.r));
    }
    setShapes();

    function render() {
      edgeSel.attr('x1', (l) => l.source.x).attr('y1', (l) => l.source.y).attr('x2', (l) => l.target.x).attr('y2', (l) => l.target.y);
      nodeSel.attr('transform', (d) => 'translate(' + d.x.toFixed(2) + ',' + d.y.toFixed(2) + ') scale(' + (d.s || 1).toFixed(3) + ')');
      scheduleLabels();
    }
    function applyScale() {
      const k = transform.k;
      nodeSel.each(function (d) {
        d.s = Math.max(1, MIN_R / (d.r * k));
        const eff = k * d.s; // screen px per node-space unit
        this.querySelector('.hit').setAttribute('r', Math.max(d.r + 4 / eff, 14 / eff).toFixed(2)); // >= 28px target
        this.querySelector('.ring').setAttribute('r', (d.r + 4.5 / eff).toFixed(2));
      });
      render();
    }

    /* ---- labels: screen-space, greedy collision culling by priority ---- */
    const measureCtx = doc.createElement('canvas').getContext('2d');
    measureCtx.font = '600 11.5px system-ui, -apple-system, "Segoe UI", sans-serif';
    const widthCache = new Map();
    const textW = (n) => {
      let w = widthCache.get(n.id);
      if (w == null) {
        w = measureCtx.measureText(shortTitle(n.title)).width + 4;
        widthCache.set(n.id, w);
      }
      return w;
    };
    let labelRaf = 0;
    function scheduleLabels() {
      if (!labelRaf) labelRaf = requestAnimationFrame(() => { labelRaf = 0; refreshLabels(); });
    }
    function refreshLabels() {
      const k = transform.k;
      const limit = k < 1.15 ? 12 : k < 1.5 ? 22 : k < 2 ? 36 : k < 2.8 ? 54 : 999; // more labels as you zoom in
      const cand = [];
      for (const n of order) {
        if (!derived.visible.has(n.id)) continue;
        let pri = 3;
        const vr = derived.vrank.get(n.id);
        if (n.id === state.hov || n.id === state.kb || n.id === state.sel) pri = 0;
        else if (derived.focus ? derived.focus.has(n.id) : derived.match ? derived.match.has(n.id) : false) pri = 1;
        else if (!derived.focus && !derived.match && vr < limit) pri = 2;
        if (pri < 3) cand.push({ n, pri, vr });
      }
      cand.sort((a, b) => a.pri - b.pri || a.vr - b.vr);
      // the ~12 most-linked notes are always labelled (6 on narrow screens, where 12 cannot fit without overprinting)
      const forceRank = W < 520 ? 6 : 12;
      const placed = [];
      const shown = new Map();
      const collides = (b) => placed.some((p) => b[0] < p[2] && b[2] > p[0] && b[1] < p[3] && b[3] > p[1]);
      const fits = (b) => b[0] >= 3 && b[2] <= W - 3 && b[1] >= 2 && b[3] <= H - 2;
      for (const c of cand) {
        const n = c.n;
        const sx = n.x * k + transform.x, sy = n.y * k + transform.y;
        if (sx < -50 || sx > W + 50 || sy < -20 || sy > H + 20) continue;
        const rr = n.r * k * (n.s || 1);
        const w = textW(n);
        const g = 5;
        const cx = Math.max(6, Math.min(W - 6 - w, sx - w / 2));
        // candidate positions: right, left, below, above (x0 = left edge of the text)
        const opts = [
          { x: sx + rr + g, y: sy + 4, a: 'start', x0: sx + rr + g },
          { x: sx - rr - g, y: sy + 4, a: 'end', x0: sx - rr - g - w },
          { x: cx, y: sy + rr + g + 11, a: 'start', x0: cx },
          { x: cx, y: sy - rr - g - 2, a: 'start', x0: cx },
        ];
        const boxOf = (o) => [o.x0 - 2, o.y - 11, o.x0 + w + 2, o.y + 4];
        let pick = null;
        for (const o of opts) {
          const b = boxOf(o);
          if (fits(b) && (c.pri === 0 || !collides(b))) { pick = { o, b }; break; }
        }
        if (!pick && (c.pri === 0 || (c.pri === 2 && c.vr < forceRank))) {
          for (const o of opts) {
            const b = boxOf(o);
            if (fits(b)) { pick = { o, b }; break; }
          }
          if (!pick) pick = { o: opts[2], b: boxOf(opts[2]) };
        }
        if (!pick) continue;
        placed.push(pick.b);
        shown.set(n.id, { x: pick.o.x, y: pick.o.y, anchor: pick.o.a, strong: c.pri < 2 });
      }
      labelSel.each(function (d) {
        const p = shown.get(d.id);
        this.classList.toggle('on', !!p);
        if (!p) return;
        this.setAttribute('x', p.x.toFixed(1));
        this.setAttribute('y', p.y.toFixed(1));
        this.setAttribute('text-anchor', p.anchor);
        this.classList.toggle('strong', p.strong);
      });
    }

    /* ---- class state (visibility, dimming, selection) ---- */
    function updateClasses() {
      const d = derived;
      nodeSel.each(function (n) {
        const c = this.classList;
        c.toggle('hidden', !d.visible.has(n.id));
        c.toggle('dim', d.focus ? !d.focus.has(n.id) : d.match ? !d.match.has(n.id) : false);
        c.toggle('is-sel', n.id === state.sel);
        c.toggle('is-nb', !!d.focus && n.id !== state.sel && d.focus.has(n.id));
        c.toggle('is-hov', n.id === state.hov);
        c.toggle('is-kb', n.id === state.kb);
      });
      edgeSel.each(function (l) {
        const c = this.classList;
        const vis = d.visible.has(l.source.id) && d.visible.has(l.target.id);
        c.toggle('hidden', !vis);
        if (!vis) return;
        const hl = !!state.sel && (l.source.id === state.sel || l.target.id === state.sel);
        const sub = !!d.focus && !hl && d.focus.has(l.source.id) && d.focus.has(l.target.id);
        c.toggle('hl', hl);
        c.toggle('sub', sub);
        c.toggle('dim', d.focus ? !(hl || sub) : d.match ? !(d.match.has(l.source.id) && d.match.has(l.target.id)) : false);
      });
      scheduleLabels();
    }

    /* ---- zoom / pan / fit ---- */
    const zoom = d3
      .zoom()
      .scaleExtent([0.15, 8])
      .extent(() => [[0, 0], [W, H]])
      .filter((e) => (!e.ctrlKey || e.type === 'wheel') && !e.button)
      .on('zoom', (e) => {
        transform = e.transform;
        viewport.attr('transform', transform.toString());
        if (e.sourceEvent) { autoFit = false; tipHide(); }
        applyScale();
      });
    svg.call(zoom).on('dblclick.zoom', null);
    svg.on('click', (e) => { if (e.target === svg.node()) clearSelection(); });

    function go(t, animate) {
      if (animate && !reduceMq.matches) svg.transition().duration(450).call(zoom.transform, t);
      else svg.call(zoom.transform, t);
    }
    function measure() {
      const r = graphEl.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
    }
    function fit(animate) {
      const vis = nodes.filter((n) => derived.visible.has(n.id));
      if (!vis.length || !W || !H) return;
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const n of vis) {
        x0 = Math.min(x0, n.x - n.r); x1 = Math.max(x1, n.x + n.r);
        y0 = Math.min(y0, n.y - n.r); y1 = Math.max(y1, n.y + n.r);
      }
      const pad = Math.min(36, Math.min(W, H) * 0.08);
      const occl = sheetOcclusion();
      const aw = Math.max(40, W - 2 * pad), ah = Math.max(40, H - occl - 2 * pad);
      const k = Math.max(0.15, Math.min(aw / Math.max(1, x1 - x0), ah / Math.max(1, y1 - y0), 2.2));
      go(d3.zoomIdentity.translate(W / 2 - (k * (x0 + x1)) / 2, (H - occl) / 2 - (k * (y0 + y1)) / 2).scale(k), animate);
      autoFit = true;
    }
    const screen = (n) => [n.x * transform.k + transform.x, n.y * transform.k + transform.y];
    // after a type/domain filter: follow the visible notes, but leave a deliberate user zoom alone while they stay in view
    function refit() {
      if (autoFit) { fit(true); return; }
      const out = nodes.some((n) => {
        if (!derived.visible.has(n.id)) return false;
        const [sx, sy] = screen(n);
        return sx < 0 || sy < 0 || sx > W || sy > H;
      });
      if (out) fit(true);
    }
    function center(id) {
      const n = byId.get(id);
      if (!n || !W) return;
      const k = transform.k;
      const occl = sheetOcclusion();
      autoFit = false;
      go(d3.zoomIdentity.translate(W / 2 - n.x * k, (H - occl) / 2 - n.y * k).scale(k), true);
    }
    function ensureInView(id, margin, animate) {
      const n = byId.get(id);
      if (!n || !W) return;
      const [sx, sy] = screen(n);
      const occl = sheetOcclusion();
      const m = margin == null ? 44 : margin;
      if (sx >= m && sx <= W - m && sy >= m && sy <= H - occl - m) return;
      const k = transform.k;
      autoFit = false;
      go(d3.zoomIdentity.translate(W / 2 - n.x * k, (H - occl) / 2 - n.y * k).scale(k), !!animate);
    }
    function zoomBy(f) {
      autoFit = false;
      if (reduceMq.matches) svg.call(zoom.scaleBy, f);
      else svg.transition().duration(160).call(zoom.scaleBy, f);
    }

    /* ---- node interaction ---- */
    const drag = d3
      .drag()
      .clickDistance(4)
      .on('start', (e, d) => {
        if (!e.active) sim.alphaTarget(0.25).restart();
        d.fx = d.x;
        d.fy = d.y;
        tipHide();
      })
      .on('drag', (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
      })
      .on('end', (e, d) => {
        if (!e.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    nodeSel
      .on('pointerenter', (e, d) => {
        if (e.pointerType === 'touch') return;
        state.hov = d.id;
        e.currentTarget.classList.add('is-hov');
        tipShow(d, e.clientX, e.clientY);
        scheduleLabels();
      })
      .on('pointermove', (e) => {
        if (e.pointerType !== 'touch' && !tip.hidden) tipPlace(e.clientX, e.clientY);
      })
      .on('pointerleave', (e, d) => {
        e.currentTarget.classList.remove('is-hov');
        if (state.hov === d.id) state.hov = null;
        tipHide();
        scheduleLabels();
      })
      .on('click', (e, d) => {
        e.stopPropagation();
        select(d.id);
      })
      .call(drag);
    graphEl.addEventListener('pointerleave', () => {
      state.hov = null;
      nodeSel.classed('is-hov', false);
      tipHide();
      scheduleLabels();
    });
    sim.on('tick', render);

    /* ---- keyboard: nearest note in an arrow direction ---- */
    function kbNeighbor(curId, dx, dy) {
      const vis = nodes.filter((n) => derived.visible.has(n.id));
      if (!vis.length) return null;
      const cur = curId && derived.visible.has(curId) ? byId.get(curId) : null;
      if (!cur) return vis.sort((a, b) => a.rank - b.rank)[0].id;
      const [cx, cy] = screen(cur);
      let best = null, bestScore = Infinity;
      for (const n of vis) {
        if (n === cur) continue;
        const [x, y] = screen(n);
        const vx = x - cx, vy = y - cy;
        const dist = Math.hypot(vx, vy);
        if (!dist) continue;
        const cos = (vx * dx + vy * dy) / dist;
        if (cos < 0.5) continue; // within ~60 degrees of the arrow direction
        const score = dist * (2 - cos);
        if (score < bestScore) { best = n; bestScore = score; }
      }
      return best ? best.id : null;
    }
    function screenOf(id) {
      const n = byId.get(id);
      const [x, y] = screen(n);
      const r = graphEl.getBoundingClientRect();
      return { x: r.left + x + n.r * transform.k * (n.s || 1), y: r.top + y };
    }

    function resizeNow() {
      const ow = W, oh = H;
      measure();
      if (!W || !H) return;
      if (autoFit || !ow) fit(false);
      else if (ow !== W || oh !== H) scheduleLabels();
    }
    new ResizeObserver(resizeNow).observe(graphEl);

    measure();
    applyScale();
    fit(false);
    refreshLabels(); // first paint already has its labels (later passes are rAF-batched)

    return { update: updateClasses, fit, refit, center, ensureInView, zoomBy, setShapes, resizeNow, kbNeighbor, screenOf, scheduleLabels, nodeSel };
  }

  /* ================= theme (dark by default; an explicit choice is remembered) =================
     The head script has already applied any stored choice before first paint. The attribute on <html> is the
     single source of truth; all colours are CSS tokens, so switching it re-themes the whole page at once. */
  const THEME_KEY = 'brain-graph-theme';
  const themeBtn = $('#theme');
  const themeNow = () => (doc.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  function themeIcon(target) {
    const svg = s('svg', { class: 'ic', viewBox: '0 0 16 16', 'aria-hidden': 'true', focusable: 'false' });
    if (target === 'light') {
      // the button offers the light theme: sun
      svg.append(
        s('circle', { cx: 8, cy: 8, r: 3, fill: 'currentColor' }),
        s('path', {
          d: 'M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.4,
          'stroke-linecap': 'round',
        })
      );
    } else {
      // the button offers the dark theme: moon
      svg.append(s('path', { d: 'M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8a5.6 5.6 0 1 0 6.8 6.8z', fill: 'currentColor' }));
    }
    return svg;
  }
  function updateThemeButton() {
    const target = themeNow() === 'dark' ? 'light' : 'dark';
    themeBtn.replaceChildren(themeIcon(target), h('span', { text: target === 'light' ? 'Light' : 'Dark' }));
    themeBtn.setAttribute('aria-label', 'Switch to ' + target + ' theme');
    themeBtn.title = 'Switch to ' + target + ' theme';
  }
  function setTheme(t) {
    doc.documentElement.setAttribute('data-theme', t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {
      /* storage blocked or full: the choice simply is not remembered after this visit */
    }
    updateThemeButton();
    announce('Switched to the ' + t + ' theme');
  }
  themeBtn.addEventListener('click', () => setTheme(themeNow() === 'dark' ? 'light' : 'dark'));

  /* ================= wiring ================= */
  function wire() {
    $('#fit').addEventListener('click', () => { if (graph) graph.fit(true); });
    $('#reset').addEventListener('click', () => {
      state.on = new Set();
      for (const [k, c] of typeTotal) if (c > 0) state.on.add(k);
      state.domain = 'all';
      $('#domain').value = 'all';
      state.q = '';
      qEl.value = '';
      state.sel = null;
      state.kb = null;
      state.hov = null;
      state.sort = { key: 'degree', dir: -1 };
      state.table = !graph;
      tipHide();
      applyView();
      update();
      if (graph) graph.fit(true);
      announce('View reset');
    });
    $('#shapes').addEventListener('click', () => {
      state.shapes = !state.shapes;
      $('#shapes').setAttribute('aria-pressed', state.shapes ? 'true' : 'false');
      updateChips();
      if (graph) graph.setShapes();
      if (state.sel) renderPanel();
      if (state.table) renderTable();
    });
    $('#tbl').addEventListener('click', () => {
      state.table = !state.table;
      applyView();
    });
    $('#zin').addEventListener('click', () => graph && graph.zoomBy(1.4));
    $('#zout').addEventListener('click', () => graph && graph.zoomBy(1 / 1.4));

    qEl.addEventListener('input', () => {
      state.q = qEl.value;
      update();
    });
    qEl.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || !derived.match) return;
      const m = ranked.find((n) => derived.match.has(n.id));
      if (m) {
        e.preventDefault();
        select(m.id, { center: true });
      }
    });

    // Escape: clear the search text first when it has focus, otherwise clear the selection
    doc.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      tipHide();
      if (doc.activeElement === qEl && qEl.value) {
        qEl.value = '';
        state.q = '';
        update();
        return;
      }
      if (state.sel) clearSelection();
      else if (state.kb) {
        state.kb = null;
        if (graph) graph.update();
      }
    });

    // keyboard navigation on the graph region
    const DIRS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    graphEl.addEventListener('keydown', (e) => {
      if (!graph || e.target !== graphEl) return;
      if (DIRS[e.key]) {
        e.preventDefault();
        const id = graph.kbNeighbor(state.kb || state.sel, DIRS[e.key][0], DIRS[e.key][1]);
        if (!id) { announce('No note in that direction'); return; }
        state.kb = id;
        graph.update();
        graph.ensureInView(id, 44, false);
        const n = byId.get(id);
        const p = graph.screenOf(id);
        tipShow(n, p.x, p.y);
        announce(n.title + ', ' + n.type + ', ' + plural(n.degree, 'link') + (n.status ? ', ' + n.status : ''));
      } else if ((e.key === 'Enter' || e.key === ' ') && state.kb) {
        e.preventDefault();
        select(state.kb);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        graph.zoomBy(1.4);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        graph.zoomBy(1 / 1.4);
      } else if (e.key === '0') {
        e.preventDefault();
        graph.fit(true);
      }
    });
    graphEl.addEventListener('focusout', (e) => {
      if (graphEl.contains(e.relatedTarget)) return;
      tipHide();
      if (state.kb && state.kb !== state.sel) {
        state.kb = null;
        if (graph) graph.update();
      }
    });
    wireTableSort();
  }

  /* ================= boot ================= */
  buildChips();
  buildDomains();
  wire();
  updateThemeButton();
  computeDerived(); // the graph's first fit and label pass need the visible set
  if (typeof window.d3 !== 'undefined') {
    try {
      graph = initGraph();
    } catch (err) {
      console.error(err);
      graph = null;
    }
  }
  if (!graph) {
    state.table = true;
    $('.stage').before(h('p', { class: 'notice', role: 'status', text: 'The graph could not be drawn because the D3 library did not load (it is fetched from cdnjs). The table view below lists every note and still works.' }));
  }
  update();
  applyView();
  if (graph) graph.update();
})();
