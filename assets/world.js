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

  const { P, pts, poly, box, firm, bank, state, investor } = window.Chars;

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
