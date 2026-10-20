/* 시뮬레이션 화면/조작 코드. 수식은 assets/sim-model.js 에서 수정합니다. */
(function () {
  const M = window.SIM_MODEL;
  const $ = id => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const R = 46; // 노드 반지름
  const COLORS = { firm: '#8C1515', bank: '#14100f', investor: '#9a8f8c', state: '#c98a1b' };
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (name, attrs = {}, parent) => {
    const e = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    if (parent) parent.appendChild(e);
    return e;
  };
  const nodeById = Object.fromEntries(M.nodes.map(n => [n.id, n]));
  const shockById = Object.fromEntries(M.shocks.map(s => [s.id, s]));

  /* ---------------- 게임 상태 ---------------- */
  let S;
  let timer = null;
  let selected = 'bank';

  function reset() {
    stopAuto();
    const x = Object.fromEntries(M.nodes.map(n => [n.id, 0]));
    S = {
      t: 0, x, prev: { ...x },
      history: [{ ...x }],
      points: M.rules.startPoints,
      shock: null,        // { id, mag, remaining }
      queued: [],         // 이번 턴에 적용될 정책 id
      gainMult: 1, gainTurns: 0,
      over: null,         // 'clear' | 'collapse'
      log: [],
      stabSum: 100,
    };
    log('게임을 시작합니다. 시나리오를 고르거나 충격을 직접 설정한 뒤 [충격 투입]을 누르세요.');
    $('overlay').hidden = true;
    render();
  }

  function log(msg) {
    S.log.unshift({ t: S.t, msg });
    if (S.log.length > 60) S.log.pop();
  }

  /* ---------------- 행동 ---------------- */
  function applyShock() {
    if (S.over) return;
    const id = $('shockSel').value;
    const mag = +$('mag').value, dur = +$('dur').value;
    S.shock = { id, mag, remaining: dur };
    log(`충격 투입: ${shockById[id].label} (강도 ${mag}, ${dur}턴 지속)`);
    render();
  }

  function usePolicy(id) {
    const p = M.policies.find(p => p.id === id);
    if (S.over || S.points < p.cost) return;
    S.points -= p.cost;
    S.queued.push(id);
    log(`정책 실행 예약: ${p.label}`);
    render();
  }

  function nextTurn() {
    if (S.over) return;
    const shock = {}, relief = {};
    if (S.shock && S.shock.remaining > 0) {
      const v = shockById[S.shock.id].vector;
      M.nodes.forEach(n => shock[n.id] = (v[n.id] || 0) * S.shock.mag * M.rules.shockScale);
      S.shock.remaining--;
    }
    S.queued.forEach(pid => {
      const p = M.policies.find(p => p.id === pid);
      Object.entries(p.relief || {}).forEach(([k, v]) => relief[k] = (relief[k] || 0) + v);
      Object.entries(p.side || {}).forEach(([k, v]) => shock[k] = (shock[k] || 0) + v);
      if (p.gainMult) { S.gainMult = p.gainMult; S.gainTurns = p.gainTurns || 1; }
    });
    S.queued = [];
    const gain = S.gainTurns > 0 ? S.gainMult : 1;
    if (S.gainTurns > 0) S.gainTurns--;

    S.prev = S.x;
    S.x = M.step(S.x, { shock, relief, gain, t: S.t });
    S.t++;
    S.history.push({ ...S.x });
    if (S.t % M.rules.pointEvery === 0) { S.points++; log('정책 포인트 +1'); }

    const worst = M.nodes.reduce((a, n) => S.x[n.id] > S.x[a.id] ? n : a, M.nodes[0]);
    if (S.x[worst.id] - S.prev[worst.id] > 8) log(`${worst.label}에 충격이 크게 번졌습니다 (스트레스 ${Math.round(S.x[worst.id])})`);

    const stab = M.stability(S.x);
    S.stabSum += stab;
    if (stab < M.rules.collapseBelow) end('collapse');
    else if (S.t >= M.rules.maxTurns) end('clear');
    render();
  }

  function end(kind) {
    S.over = kind;
    stopAuto();
    const avg = S.stabSum / (S.t + 1);
    const grade = M.grade(avg);
    $('ovTitle').textContent = kind === 'clear' ? 'CLEAR — 경제가 버텼습니다' : 'COLLAPSE — 시스템이 붕괴했습니다';
    $('ovBody').textContent = `${S.t}턴 진행 · 평균 안정도 ${avg.toFixed(1)} · 등급 ${grade}`;
    $('overlay').hidden = false;
    log(kind === 'clear' ? '클리어!' : '시스템 붕괴');
  }

  function toggleAuto() {
    if (timer) return stopAuto();
    if (S.over) return;
    timer = setInterval(nextTurn, 900);
    $('auto').textContent = '⏸ 일시정지';
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
    if ($('auto')) $('auto').textContent = '⏵ 자동 재생';
  }

  /* ---------------- 그래프 구성 (1회) ---------------- */
  const svg = $('graph');
  const nodeEls = {}, edgeEls = [];

  function buildGraph() {
    const defs = el('defs', {}, svg);
    const mk = el('marker', { id: 'arrow', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M0 0L10 5L0 10z', fill: '#8a807d' }, mk);

    el('rect', { width: 640, height: 640, fill: '#fff' }, svg);

    M.edges.forEach(e => {
      const a = nodeById[e.from], b = nodeById[e.to];
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len, px = -uy, py = ux;
      const off = 26;
      const sx = a.x + ux * (R + 4) + px * 10, sy = a.y + uy * (R + 4) + py * 10;
      const tx = b.x - ux * (R + 8) + px * 10, ty = b.y - uy * (R + 8) + py * 10;
      const cx = (a.x + b.x) / 2 + px * off, cy = (a.y + b.y) / 2 + py * off;
      const path = el('path', { d: `M${sx} ${sy} Q${cx} ${cy} ${tx} ${ty}`, class: 'edge', 'marker-end': 'url(#arrow)' }, svg);
      path.style.strokeWidth = 1 + e.w * 7;
      el('title', {}, path).textContent = `${nodeById[e.from].label} → ${nodeById[e.to].label}: ${e.label} (강도 ${e.w})`;
      edgeEls.push({ e, path });
    });

    // 뒤쪽(y가 작은) 캐릭터부터 그려서 겹침 순서를 맞춘다
    [...M.nodes].sort((p, q) => p.y - q.y).forEach(n => {
      const g = el('g', { class: 'node', tabindex: 0, role: 'button', 'aria-label': n.label }, svg);
      g.setAttribute('transform', `translate(${n.x} ${n.y + 30}) scale(1.25)`);
      const aura = el('ellipse', { cx: 0, cy: 4, rx: 66, ry: 24, class: 'aura' }, g);
      const pulse = el('ellipse', { cx: 0, cy: 4, rx: 66, ry: 24, class: 'pulse' }, g);
      const ring = el('ellipse', { cx: 0, cy: 4, rx: 78, ry: 30, class: 'sel' }, g);
      const inner = el('g', { class: 'char-in' }, g);
      inner.innerHTML = window.Chars[n.id]();
      const tagBg = el('rect', { x: -30, y: 34, width: 60, height: 22, rx: 11, class: 'tagbg' }, g);
      const name = el('text', { y: 49.5, class: 'name' }, g);
      name.textContent = n.label;
      el('rect', { x: -34, y: 62, width: 68, height: 6, rx: 3, class: 'barbg' }, g);
      const bar = el('rect', { x: -34, y: 62, width: 0, height: 6, rx: 3, class: 'barfill' }, g);
      const val = el('text', { y: 84, class: 'val' }, g);
      g.addEventListener('click', () => select(n.id));
      g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(n.id); } });
      nodeEls[n.id] = { g, aura, pulse, ring, inner, name, val, bar };
    });
  }

  const mix = (t) => { // 흰색 → #8C1515
    const a = [255, 255, 255], b = [140, 21, 21];
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
  };

  function select(id) { selected = id; render(); }

  /* ---------------- 그리기 ---------------- */
  function render() {
    // HUD
    const stab = M.stability(S.x);
    $('turn').textContent = `${S.t} / ${M.rules.maxTurns}`;
    $('points').textContent = S.points;
    $('stab').textContent = stab.toFixed(0);
    $('grade').textContent = M.grade(stab);
    const bar = $('stabBar');
    bar.style.width = stab + '%';
    bar.classList.toggle('danger', stab < 40);
    $('progress').style.width = (S.t / M.rules.maxTurns * 100) + '%';

    // 노드
    M.nodes.forEach(n => {
      const v = S.x[n.id], t = v / 100, o = nodeEls[n.id];
      o.aura.style.fill = mix(t);
      o.aura.style.opacity = 0.15 + t * 0.7;
      o.inner.style.filter = `saturate(${1 - t * 0.55}) drop-shadow(0 0 ${t * 9}px rgba(140,21,21,${t}))`;
      o.g.classList.toggle('shaking', v > 60);
      o.bar.setAttribute('width', (68 * t).toFixed(1));
      o.val.textContent = `스트레스 ${Math.round(v)}`;
      o.ring.style.opacity = n.id === selected ? 1 : 0;
      const hit = v - S.prev[n.id] > 3;
      o.pulse.classList.remove('hit');
      if (hit) { void o.pulse.getBoundingClientRect(); o.pulse.classList.add('hit'); }
    });
    edgeEls.forEach(({ e, path }) => {
      const src = S.x[e.from];
      const on = src > 20;
      path.classList.toggle('on', on);
      path.style.opacity = on ? 0.35 + src / 160 : 0.5;
    });

    // 충격 상태
    const sb = $('shockStatus');
    if (S.shock && S.shock.remaining > 0) sb.textContent = `진행 중: ${shockById[S.shock.id].label} · 강도 ${S.shock.mag} · ${S.shock.remaining}턴 남음`;
    else if (S.shock) sb.textContent = '충격 종료 — 이제 회복을 지켜보세요.';
    else sb.textContent = '아직 투입된 충격이 없습니다.';

    // 정책 버튼
    $('policies').querySelectorAll('button').forEach(b => {
      const p = M.policies.find(p => p.id === b.dataset.id);
      b.disabled = !!S.over || S.points < p.cost;
    });
    $('queued').textContent = S.queued.length
      ? '다음 턴 적용: ' + S.queued.map(id => M.policies.find(p => p.id === id).label).join(', ')
      : '';
    $('shockBtn').disabled = !!S.over;
    $('next').disabled = !!S.over;

    renderDetail();
    renderChart();
    $('log').innerHTML = S.log.map(l => `<li><b>T${l.t}</b> ${esc(l.msg)}</li>`).join('');
  }

  function renderDetail() {
    const n = nodeById[selected], v = S.x[n.id];
    const incoming = M.edges.filter(e => e.to === n.id).map(e => `<li>${esc(nodeById[e.from].label)} → <b>${esc(e.label)}</b> <span>${e.w}</span></li>`).join('');
    const outgoing = M.edges.filter(e => e.from === n.id).map(e => `<li><b>${esc(e.label)}</b> → ${esc(nodeById[e.to].label)} <span>${e.w}</span></li>`).join('');
    const metrics = n.metrics.map(m => `<div class="metric"><span>${esc(m.label)}</span><b>${m.fn(v).toFixed(1)}${esc(m.unit)}</b></div>`).join('');
    $('detail').innerHTML = `
      <h3>${esc(n.label)}</h3>
      <p class="muted">${esc(n.desc)}</p>
      <div class="meter"><i style="width:${v}%"></i></div>
      <div class="meter-label"><span>스트레스</span><b>${v.toFixed(1)}</b></div>
      ${metrics}
      <h4>받는 영향</h4><ul class="links">${incoming}</ul>
      <h4>주는 영향</h4><ul class="links">${outgoing}</ul>`;
  }

  function renderChart() {
    const W = 600, H = 190, pl = 30, pr = 10, pt = 10, pb = 22;
    const max = M.rules.maxTurns;
    const X = t => pl + (W - pl - pr) * t / max;
    const Y = v => pt + (H - pt - pb) * (1 - v / 100);
    let out = '';
    [0, 25, 50, 75, 100].forEach(g => {
      out += `<line x1="${pl}" x2="${W - pr}" y1="${Y(g)}" y2="${Y(g)}" class="grid"/><text x="${pl - 6}" y="${Y(g) + 4}" class="tick" text-anchor="end">${g}</text>`;
    });
    [0, 5, 10, 15, 20].filter(t => t <= max).forEach(t => out += `<text x="${X(t)}" y="${H - 6}" class="tick" text-anchor="middle">${t}</text>`);
    out += `<line x1="${pl}" x2="${W - pr}" y1="${Y(100 - M.rules.collapseBelow)}" y2="${Y(100 - M.rules.collapseBelow)}" class="danger-line"/>`;
    M.nodes.forEach(n => {
      const pts = S.history.map((h, i) => `${X(i)},${Y(h[n.id])}`).join(' ');
      out += `<polyline points="${pts}" fill="none" stroke="${COLORS[n.id]}" stroke-width="2.2" stroke-linejoin="round"/>`;
    });
    $('chart').innerHTML = out;
  }

  /* ---------------- 초기 UI 구성 ---------------- */
  function buildControls() {
    $('shockSel').innerHTML = M.shocks.map(s => `<option value="${s.id}">${esc(s.label)}</option>`).join('');
    $('shockSel').addEventListener('change', () => $('shockDesc').textContent = shockById[$('shockSel').value].desc);
    $('shockDesc').textContent = M.shocks[0].desc;
    $('mag').addEventListener('input', () => $('magV').textContent = $('mag').value);
    $('dur').addEventListener('input', () => $('durV').textContent = $('dur').value);

    $('scenarios').innerHTML = M.scenarios.map(s => `
      <button class="scenario" data-id="${s.id}"><b>${esc(s.name)}</b><span>${esc(s.desc)}</span></button>`).join('');
    $('scenarios').querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const s = M.scenarios.find(s => s.id === b.dataset.id);
      $('shockSel').value = s.shock; $('shockSel').dispatchEvent(new Event('change'));
      $('mag').value = s.magnitude; $('mag').dispatchEvent(new Event('input'));
      $('dur').value = s.duration; $('dur').dispatchEvent(new Event('input'));
      $('scenarios').querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
    }));

    $('policies').innerHTML = M.policies.map(p => `
      <button class="policy" data-id="${p.id}"><b>${esc(p.label)}</b><span>${esc(p.desc)}</span><em>PP ${p.cost}</em></button>`).join('');
    $('policies').querySelectorAll('button').forEach(b => b.addEventListener('click', () => usePolicy(b.dataset.id)));

    $('shockBtn').addEventListener('click', applyShock);
    $('next').addEventListener('click', nextTurn);
    $('auto').addEventListener('click', toggleAuto);
    $('reset').addEventListener('click', reset);
    $('again').addEventListener('click', reset);
    $('legend').innerHTML = M.nodes.map(n => `<span><i style="background:${COLORS[n.id]}"></i>${esc(n.label)}</span>`).join('');
  }

  buildGraph();
  buildControls();
  reset();
})();
