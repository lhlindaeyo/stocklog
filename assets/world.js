/* 홈 하단 "The System" 장면 — 로우폴리 떠 있는 섬 위의 기업·은행·투자자·국가 캐릭터 */
(function () {
  const stage = document.getElementById('world-stage');
  if (!stage) return;

  /* ---------- 설명 (여기만 고치면 말풍선 내용이 바뀝니다) ---------- */
  const INFO = {
    firm: { name: '기업', text: '재화와 서비스를 만들어 파는 생산 주체입니다. 은행에서 대출을, 투자자에게서 자본을 조달해 일자리를 만들고 이익을 냅니다.', links: '은행 · 투자자 · 국가' },
    bank: { name: '은행', text: '예금을 받아 기업과 가계에 대출해 주는 신용 공급자입니다. 돈이 남는 곳과 필요한 곳을 이어 주지만, 부실이 번지면 위기의 진원지가 되기도 합니다.', links: '기업 · 투자자 · 국가' },
    investor: { name: '투자자', text: '주식과 채권에 투자해 기업과 국가에 자금을 공급하는 주체입니다. 기대수익과 위험을 저울질하며 시장 가격을 움직입니다.', links: '기업 · 은행 · 국가' },
    state: { name: '국가', text: '세금과 재정지출, 통화·규제 정책으로 경제를 조율하는 주체입니다. 위기 때는 마지막 안전망 역할을 맡습니다.', links: '기업 · 은행 · 투자자' },
  };

  /* ---------- 아이소메트릭 도형 도우미 ---------- */
  const P = (x, y, z) => [+((x - y) * 0.87).toFixed(1), +((x + y) * 0.5 - z).toFixed(1)];
  const pts = a => a.map(p => p.join(',')).join(' ');
  const poly = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
  // c = [윗면, 왼쪽면, 오른쪽면]
  function box(x, y, z, w, d, h, c) {
    return poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], c[1]) +
      poly([P(x + w, y + d, z), P(x + w, y, z), P(x + w, y, z + h), P(x + w, y + d, z + h)], c[2]) +
      poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], c[0]);
  }
  function pyramid(x, y, z, w, d, h, c) { // c = [왼쪽면, 오른쪽면]
    const ap = P(x + w / 2, y + d / 2, z + h);
    return poly([P(x, y + d, z), P(x + w, y + d, z), ap], c[0]) + poly([P(x + w, y + d, z), P(x + w, y, z), ap], c[1]);
  }
  const leftQuad = (x0, x1, z0, z1, y, f) => poly([P(x0, y, z0), P(x1, y, z0), P(x1, y, z1), P(x0, y, z1)], f);
  const rightQuad = (y0, y1, z0, z1, x, f) => poly([P(x, y0, z0), P(x, y1, z0), P(x, y1, z1), P(x, y0, z1)], f);
  const shadow = (rx, ry) => `<ellipse cx="0" cy="4" rx="${rx}" ry="${ry}" fill="#5b3a22" opacity=".18"/>`;

  /* ---------- 캐릭터 ---------- */
  function firm() {
    const wall = ['#efeae3', '#d8d1c8', '#bfb6ab'], chim = ['#c98a6a', '#a86a4f', '#8a523b'];
    const c1 = P(-19.5, -11.5, 62), c2 = P(-5.5, -11.5, 54);
    return shadow(58, 20) +
      box(-30, -22, 0, 60, 44, 30, wall) +
      leftQuad(-24, -14, 0, 15, 22, '#6e3a2b') +
      leftQuad(-8, 2, 10, 20, 22, '#bfe0ec') + leftQuad(8, 18, 10, 20, 22, '#bfe0ec') +
      rightQuad(-12, -2, 10, 20, 30, '#a9cfdd') + rightQuad(4, 14, 10, 20, 30, '#a9cfdd') +
      pyramid(-30, -22, 30, 60, 44, 14, ['#b24338', '#8C1515']) +
      box(-24, -16, 30, 9, 9, 32, chim) + box(-10, -16, 30, 9, 9, 24, chim) +
      `<g class="smoke"><circle cx="${c1[0]}" cy="${c1[1] - 6}" r="7" /><circle cx="${c2[0]}" cy="${c2[1] - 6}" r="6" style="animation-delay:-1.4s"/></g>`;
  }

  function bank() {
    const stone = ['#f4efe6', '#e2d9cb', '#cbbfae'], base = ['#f2ece2', '#ddd5c8', '#c6bcad'], col = ['#fbf8f2', '#e9e2d6', '#d4c9b8'];
    const coin = P(0, 0, 76);
    let cols = '';
    [-28, -12, 4, 20].forEach(x => cols += box(x, 20, 5, 8, 8, 28, col));
    return shadow(62, 22) +
      box(-38, -30, 0, 76, 62, 5, base) +
      box(-28, -22, 5, 56, 42, 28, stone) + cols +
      box(-34, -27, 33, 68, 54, 5, ['#a8372d', '#8f2a22', '#741c16']) +
      pyramid(-34, -27, 38, 68, 54, 14, ['#b24338', '#8C1515']) +
      `<g class="bob"><circle cx="${coin[0]}" cy="${coin[1] - 4}" r="12" fill="#e8b84a" stroke="#c9962a" stroke-width="2.5"/>
        <text x="${coin[0]}" y="${coin[1] + 1}" text-anchor="middle" font-size="13" font-weight="800" fill="#8a5d10" font-family="Source Sans 3, sans-serif">₩</text></g>`;
  }

  function state() {
    const stone = ['#f1ede6', '#ddd6cb', '#c5bdb0'];
    const top = P(0, 0, 40);
    let dome = '';
    const R = 24, tones = ['#f6f2ec', '#e4ddd1', '#d3cabd', '#ebe5db'];
    for (let i = 0; i < 6; i++) {
      const a0 = Math.PI - (i * Math.PI) / 6, a1 = Math.PI - ((i + 1) * Math.PI) / 6;
      dome += poly([[top[0], top[1]], [top[0] + R * Math.cos(a0), top[1] - R * Math.sin(a0) * 0.95], [top[0] + R * Math.cos(a1), top[1] - R * Math.sin(a1) * 0.95]], tones[i % 4]);
    }
    const apex = [top[0], top[1] - R * 0.95];
    return shadow(70, 24) +
      box(-44, -32, 0, 88, 64, 6, ['#efe9de', '#d9d1c3', '#c2b8a8']) +
      box(-30, -22, 6, 60, 44, 26, stone) +
      leftQuad(-20, -8, 6, 22, 22, '#8a6a4f') + leftQuad(0, 12, 6, 22, 22, '#8a6a4f') + leftQuad(-26, -22, 10, 24, 22, '#bfe0ec') +
      box(-15, -15, 32, 30, 30, 8, ['#f1ede6', '#ddd6cb', '#c5bdb0']) + dome +
      `<line x1="${apex[0]}" y1="${apex[1]}" x2="${apex[0]}" y2="${apex[1] - 26}" stroke="#7a6a5a" stroke-width="2"/>
       <polygon fill="#8C1515" points="${apex[0]},${apex[1] - 26} ${apex[0] + 20},${apex[1] - 21} ${apex[0]},${apex[1] - 14}">
         <animate attributeName="points" dur="1.6s" repeatCount="indefinite"
           values="${apex[0]},${apex[1] - 26} ${apex[0] + 20},${apex[1] - 21} ${apex[0]},${apex[1] - 14};${apex[0]},${apex[1] - 26} ${apex[0] + 18},${apex[1] - 24} ${apex[0]},${apex[1] - 14};${apex[0]},${apex[1] - 26} ${apex[0] + 20},${apex[1] - 21} ${apex[0]},${apex[1] - 14}"/>
       </polygon>`;
  }

  function investor() {
    const suit = ['#434958', '#363b49', '#2b2f3b'], skin = ['#f3cba4', '#e2b38a'], gold = ['#f6d064', '#e2b440', '#c99a2c'];
    const board = ['#ffffff', '#f5f3f1', '#e3dfdb'];
    const hx = 0, hy = -56;
    const hex = [...Array(8)].map((_, i) => [hx + 9 * Math.cos(Math.PI / 8 + i * Math.PI / 4), hy + 9 * Math.sin(Math.PI / 8 + i * Math.PI / 4)]);
    let coins = '';
    [0, 3, 6].forEach(z => coins += box(-34, 4, z, 12, 12, 3, gold));
    [0, 3].forEach(z => coins += box(-20, 14, z, 12, 12, 3, gold));
    return shadow(54, 18) + coins +
      box(26, -14, 8, 4, 34, 30, board) +
      box(28, -2, 0, 2, 2, 8, ['#999', '#888', '#777']) +
      `<polyline points="${pts([P(30, 17, 15), P(30, 10, 20), P(30, 5, 18), P(30, -1, 27), P(30, -9, 33)])}" fill="none" stroke="#8C1515" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
       <circle cx="${P(30, -9, 33)[0]}" cy="${P(30, -9, 33)[1]}" r="3.5" fill="#8C1515"/>` +
      box(-8, -3, 0, 6, 6, 14, suit) + box(2, -3, 0, 6, 6, 14, suit) +
      box(-10, -5, 14, 20, 10, 22, suit) +
      poly([P(-1, 5, 34), P(1, 5, 34), P(1, 5, 18), P(-1, 5, 22)], '#8C1515') +
      box(-15, -3, 18, 5, 6, 17, suit) + box(10, -3, 18, 5, 6, 17, suit) +
      poly(hex, skin[0]) + poly([hex[4], hex[5], hex[6], hex[7], hex[0]], skin[1], 'opacity=".55"') +
      poly([[hx - 10, hy - 2], [hx - 8, hy - 11], [hx, hy - 14], [hx + 8, hy - 11], [hx + 10, hy - 2], [hx + 4, hy - 7], [hx - 4, hy - 7]], '#3b2a22') +
      `<circle cx="${hx - 3.5}" cy="${hy + 1}" r="1.3" fill="#2b2f3b"/><circle cx="${hx + 3.5}" cy="${hy + 1}" r="1.3" fill="#2b2f3b"/>`;
  }

  /* ---------- 장식 ---------- */
  const pine = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="2" rx="16" ry="5" fill="#5b3a22" opacity=".18"/>
      <rect x="-3" y="-14" width="6" height="14" fill="#8a5a3a"/>
      <polygon points="-18,-12 0,-44 0,-12" fill="#7fb24f"/><polygon points="0,-44 18,-12 0,-12" fill="#5f9440"/>
      <polygon points="-14,-32 0,-60 0,-32" fill="#8cc15a"/><polygon points="0,-60 14,-32 0,-32" fill="#6aa046"/></g>`;
  const cactus = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="2" rx="10" ry="4" fill="#5b3a22" opacity=".18"/>` +
    box(-3, -3, 0, 6, 6, 28, ['#8ccb74', '#6aaa5c', '#52904a']) + box(3, -2, 12, 8, 4, 4, ['#8ccb74', '#6aaa5c', '#52904a']) + box(7, -2, 12, 4, 4, 12, ['#8ccb74', '#6aaa5c', '#52904a']) + `</g>`;
  const rock = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="-14,0 -8,-12 4,-14 14,-4 10,2" fill="#b9b2aa"/><polygon points="-8,-12 4,-14 0,-5" fill="#d3cdc5"/><polygon points="4,-14 14,-4 10,2 0,-5" fill="#9d958c"/></g>`;
  const pond = (x, y) => `<g transform="translate(${x} ${y})"><polygon points="-40,0 -22,-13 22,-13 40,0 22,13 -22,13" fill="#a9dde0"/>
      <polygon points="-40,0 -22,-13 0,0" fill="#bde8ea"/><polygon points="22,-13 40,0 22,13 0,0" fill="#8fcfd4"/><polygon points="-22,13 22,13 0,0" fill="#9bd7da"/></g>`;

  /* ---------- 섬 ---------- */
  const topTones = ['#efd49d', '#e6c48a', '#f3ddaa', '#dcb677'];
  const A = [70, 265], B = [210, 185], C = [400, 150], D = [590, 185], E = [730, 265], F = [600, 335], G = [400, 368], H = [200, 335], O = [400, 258];
  const ring = [A, B, C, D, E, F, G, H];
  let island = '';
  ring.forEach((p, i) => island += poly([O, p, ring[(i + 1) % 8]], topTones[i % 4]));
  const rimTones = ['#d2a56a', '#c18f55', '#b58049', '#c99a5f'];
  const rimTop = [A, H, G, F, E], rimBot = [[70, 299], [200, 369], [400, 402], [600, 369], [730, 299]];
  let under = '', rim = '';
  const lo = [[140, 400], [240, 440], [400, 470], [560, 440], [660, 400]], apex = [410, 548];
  const brown = ['#8a4b37', '#74392a', '#9a5740', '#6a3326', '#80402f', '#a05d44'];
  for (let i = 0; i < 4; i++) {
    const p = rimBot[i], q = rimBot[i + 1], r = lo[i + 1], s = lo[i];
    under += poly([p, q, s], brown[(i * 2) % 6]) + poly([q, r, s], brown[(i * 2 + 1) % 6]) + poly([s, r, apex], brown[(i + 3) % 6]);
    rim += poly([rimTop[i], rimTop[i + 1], rimBot[i + 1], rimBot[i]], rimTones[i]);
  }
  const grass = '<polygon points="100,265 150,235 215,222 255,245 215,285 135,292" fill="#9bc462"/><polygon points="150,235 215,222 255,245 190,262" fill="#aed16f"/><polygon points="100,265 135,292 215,285 190,262" fill="#86b052"/>';
  const rocksFalling = `<g class="fall"><polygon points="560,452 580,446 588,462 570,470" fill="#7c4030"/></g>
      <g class="fall d2"><polygon points="250,470 262,462 272,474 258,482" fill="#74392a"/></g>
      <g class="fall d3"><polygon points="640,480 650,474 656,484 646,488" fill="#8a4b37"/></g>`;

  const place = (cls, key, x, y, inner, sc = 1.15) => `<g class="char ${cls}" data-k="${key}" tabindex="0" role="img" aria-label="${INFO[key].name}" transform="translate(${x} ${y}) scale(${sc})">
      <rect class="hit" x="-70" y="-120" width="140" height="160" fill="transparent"/>
      <g class="char-in">${inner}</g>
      <g class="tag" transform="translate(0 40)"><rect x="-28" y="-12" width="56" height="22" rx="11" /><text y="4" text-anchor="middle">${INFO[key].name}</text></g></g>`;

  stage.querySelector('svg').innerHTML = `
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd4e6"/><stop offset="1" stop-color="#eaf1f5"/></linearGradient></defs>
    <rect width="800" height="580" fill="url(#sky)"/>
    <g class="cloud c1"><ellipse cx="120" cy="90" rx="46" ry="14" fill="#fff" opacity=".85"/><ellipse cx="150" cy="80" rx="30" ry="12" fill="#fff" opacity=".85"/></g>
    <g class="cloud c2"><ellipse cx="660" cy="120" rx="54" ry="15" fill="#fff" opacity=".8"/><ellipse cx="630" cy="110" rx="28" ry="11" fill="#fff" opacity=".8"/></g>
    <g class="cloud c3"><ellipse cx="720" cy="470" rx="40" ry="12" fill="#fff" opacity=".7"/></g>
    ${rocksFalling}
    <g class="island">
      ${under}${rim}${island}${grass}
      ${pond(505, 322)}
      ${pine(112, 262, 1)}${pine(150, 282, .8)}${cactus(668, 268)}${cactus(640, 292)}${rock(300, 318, 1)}${rock(690, 296, .8)}
      ${place('c-state', 'state', 400, 182, state())}
      ${place('c-firm', 'firm', 228, 262, firm())}
      ${place('c-bank', 'bank', 572, 262, bank())}
      ${place('c-investor', 'investor', 400, 338, investor(), 1.25)}
    </g>`;

  /* ---------- 말풍선 ---------- */
  const tip = stage.querySelector('.world-tip');
  function show(key, ev) {
    const d = INFO[key];
    tip.innerHTML = `<b>${d.name}</b><p>${d.text}</p><small>연결: ${d.links}</small>`;
    tip.hidden = false;
    move(ev, key);
  }
  function move(ev, key) {
    const r = stage.getBoundingClientRect();
    let x, y;
    if (ev && ev.clientX != null && ev.type !== 'focusin') { x = ev.clientX - r.left; y = ev.clientY - r.top; }
    else { const b = stage.querySelector(`.char[data-k="${key}"]`).getBoundingClientRect(); x = b.left - r.left + b.width / 2; y = b.top - r.top; }
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(r.width - w - 8, x + 16)) + 'px';
    tip.style.top = Math.max(8, Math.min(r.height - h - 8, y - h - 12 < 8 ? y + 18 : y - h - 12)) + 'px';
  }
  stage.querySelectorAll('.char').forEach(c => {
    const k = c.dataset.k;
    c.addEventListener('mouseenter', e => show(k, e));
    c.addEventListener('mousemove', e => move(e, k));
    c.addEventListener('mouseleave', () => tip.hidden = true);
    c.addEventListener('focus', e => show(k, e));
    c.addEventListener('blur', () => tip.hidden = true);
    c.addEventListener('click', e => show(k, e)); // 터치 기기
  });
})();
