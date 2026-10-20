/* Simulation 모드 전환 + Game Mode. 게임 결과는 어디에도 저장하지 않습니다. */
(function () {
  const G = window.GAME_DATA;
  const $ = id => document.getElementById(id);
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = v => Math.max(0, Math.min(100, v));
  const shockById = Object.fromEntries(G.shocks.map(s => [s.id, s]));
  const charSvg = (id, cls = '') => `<svg class="g-char ${cls}" viewBox="-78 -100 156 132" aria-hidden="true"><g class="char-in">${window.Chars[id]()}</g></svg>`;

  /* ---------------- 모드 탭 ---------------- */
  function setMode(mode) {
    if (mode !== 'research') mode = 'game';
    document.querySelectorAll('.mode-tab').forEach(b => {
      const on = b.dataset.mode === mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
    });
    $('gameMode').hidden = mode !== 'game';
    $('researchMode').hidden = mode !== 'research';
  }
  document.querySelectorAll('.mode-tab').forEach(b => b.addEventListener('click', () => {
    history.replaceState(null, '', '#' + b.dataset.mode);
    setMode(b.dataset.mode);
  }));
  window.addEventListener('hashchange', () => setMode(location.hash.slice(1)));
  setMode(location.hash.slice(1));

  /* ---------------- 게임 상태 (메모리에만 존재) ---------------- */
  const root = $('game');
  let S = null;

  function meterLabels(role) {
    const R = G.roles[role];
    return { own: R.ownLabel, trust: R.trustLabel, sys: G.meters.sys };
  }

  function meters(m, role, prev) {
    const L = meterLabels(role);
    return `<div class="g-meters">${['own', 'trust', 'sys'].map(k => {
      const v = Math.round(m[k]), diff = prev ? Math.round(m[k] - prev[k]) : 0;
      return `<div class="g-meter ${v < 40 ? 'low' : ''}">
        <div class="g-meter-top"><span>${esc(L[k])}</span><b>${v}${diff ? `<em class="${diff > 0 ? 'up' : 'down'}">${diff > 0 ? '+' : ''}${diff}</em>` : ''}</b></div>
        <div class="meter"><i style="width:${v}%"></i></div></div>`;
    }).join('')}</div>`;
  }

  // 화면이 바뀔 때 게임 영역 위쪽이 화면 밖이면 다시 보이게
  function keepInView() {
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* 1) 역할 선택 */
  function pickRole() {
    S = null;
    root.innerHTML = `
      <div class="g-step"><span class="g-step-n">STEP 1</span> 누구의 입장이 되어 볼까요?</div>
      <div class="g-roles">${G.roleOrder.map(id => {
        const R = G.roles[id];
        return `<button class="g-role" data-id="${id}">${charSvg(id)}<b>${esc(R.label)}</b><span>${esc(R.tagline)}</span></button>`;
      }).join('')}</div>`;
    root.querySelectorAll('.g-role').forEach(b => b.addEventListener('click', () => pickShock(b.dataset.id)));
  }

  /* 2) 충격 선택 */
  function pickShock(role) {
    const R = G.roles[role];
    root.innerHTML = `
      <div class="g-step"><span class="g-step-n">STEP 2</span> <b>${esc(R.label)}</b>에게 닥칠 거시경제 충격을 고르세요.</div>
      <div class="g-shocks">${G.shocks.map(s => `
        <button class="g-shock" data-id="${s.id}"><i>${esc(s.icon)}</i><b>${esc(s.label)}</b><span>${esc(s.desc)}</span></button>`).join('')}
        <button class="g-shock random" data-id="random"><i>?</i><b>무작위 충격</b><span>어떤 충격이 올지 모른 채 시작합니다.</span></button>
      </div>
      <button class="btn g-back">← 역할 다시 고르기</button>`;
    root.querySelectorAll('.g-shock').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.id === 'random' ? G.shocks[Math.floor(Math.random() * G.shocks.length)].id : b.dataset.id;
      start(role, id);
    }));
    root.querySelector('.g-back').addEventListener('click', pickRole);
  }

  /* 3) 라운드 진행 */
  function start(role, shock) {
    const sh = shockById[shock];
    const m = { ...G.start };
    m.own = clamp(m.own + (sh.hit[role] || 0));
    m.sys = clamp(m.sys + sh.sys);
    S = { role, shock, m, prev: { ...G.start }, round: 0, picks: [] };
    round();
  }

  function sidebar(prev) {
    const R = G.roles[S.role], sh = shockById[S.shock];
    return `<aside class="g-side">
      ${charSvg(S.role, S.m.own < 40 ? 'shaking' : '')}
      <h3>${esc(R.label)}</h3>
      <div class="g-shock-tag"><i>${esc(sh.icon)}</i>${esc(sh.label)}</div>
      ${meters(S.m, S.role, prev)}
      <div class="g-dots">${[0, 1, 2].map(i => `<i class="${i < S.round ? 'done' : i === S.round ? 'now' : ''}"></i>`).join('')}</div>
    </aside>`;
  }

  function round() {
    const R = G.roles[S.role], rd = R.rounds[S.round], sh = shockById[S.shock];
    const intro = S.round === 0
      ? `<div class="g-news"><small>BREAKING</small>${esc(sh.desc)}</div>` : '';
    root.innerHTML = `<div class="g-play">${sidebar(S.round === 0 ? S.prev : null)}
      <section class="g-main">
        ${intro}
        <div class="g-step"><span class="g-step-n">ROUND ${S.round + 1} / 3</span> ${esc(rd.title)}</div>
        <p class="g-text">${esc(rd.text)}</p>
        <div class="g-choices">${rd.choices.map((c, i) => `<button class="g-choice" data-i="${i}"><span>${'ABC'[i]}</span>${esc(c.label)}</button>`).join('')}</div>
      </section></div>`;
    root.querySelectorAll('.g-choice').forEach(b => b.addEventListener('click', () => choose(+b.dataset.i)));
    keepInView();
  }

  function choose(i) {
    const c = G.roles[S.role].rounds[S.round].choices[i];
    const d = { ...c.d };
    const adj = c.adj && c.adj[S.shock];
    if (adj) Object.entries(adj).forEach(([k, v]) => d[k] = (d[k] || 0) + v);
    const prev = { ...S.m };
    Object.entries(d).forEach(([k, v]) => S.m[k] = clamp(S.m[k] + v));
    S.picks.push({ round: S.round, choice: c, adj: !!adj });
    S.round++;
    const last = S.round >= 3;
    const [who, line] = c.r;
    root.innerHTML = `<div class="g-play">${sidebar(prev)}
      <section class="g-main">
        <div class="g-step"><span class="g-step-n">RESULT</span> ${esc(c.label)}</div>
        <p class="g-text">${esc(c.note)}</p>
        ${adj ? `<p class="g-adj">이번 충격(${esc(shockById[S.shock].label)})에서는 이 선택의 결과가 다르게 나타났습니다.</p>` : ''}
        <div class="g-react">${charSvg(who)}<div class="g-bubble"><small>${esc(who === S.role ? '협력업체' : G.roles[who].label)}의 반응</small>${esc(line)}</div></div>
        <button class="btn primary g-next">${last ? '엔딩 보기 →' : '다음 라운드 →'}</button>
      </section></div>`;
    root.querySelector('.g-next').addEventListener('click', last ? ending : round);
    keepInView();
  }

  /* 4) 엔딩 */
  function ending() {
    const R = G.roles[S.role], sh = shockById[S.shock];
    const key = `${S.m.own >= 50 ? 'ok' : 'bad'}_${S.m.sys >= 50 ? 'ok' : 'bad'}`;
    const E = R.endings[key];
    const trustLine = S.m.trust >= 65 ? `${R.trustLabel}가 높아 다음 위기에서도 주변의 협조를 얻기 쉽습니다.`
      : S.m.trust < 40 ? `${R.trustLabel}를 많이 잃었습니다. 다음 위기에서는 같은 선택이 더 큰 반발을 부를 수 있습니다.`
      : `${R.trustLabel}는 그럭저럭 유지했습니다.`;
    const others = G.roleOrder.filter(id => id !== S.role);
    root.innerHTML = `<div class="g-end">
      <div class="g-end-head">
        ${charSvg(S.role, key === 'bad_bad' ? 'shaking' : '')}
        <div>
          <div class="g-step"><span class="g-step-n">ENDING</span> ${esc(R.label)} · ${esc(sh.label)}</div>
          <h2>${esc(E.title)}</h2>
          <p class="g-text">${esc(E.text)}</p>
          <p class="g-text muted">${esc(trustLine)}</p>
        </div>
        ${meters(S.m, S.role)}
      </div>
      <div class="g-end-grid">
        <section class="panel">
          <h2>나의 선택</h2>
          <ol class="g-path">${S.picks.map(p => `<li><small>ROUND ${p.round + 1} · ${esc(R.rounds[p.round].title)}</small><b>${esc(p.choice.label)}</b></li>`).join('')}</ol>
        </section>
        <section class="panel g-dilemma">
          <h2>${esc(R.label)}의 딜레마</h2>
          <p>${esc(R.dilemma)}</p>
        </section>
      </div>
      <section class="panel">
        <h2>다른 입장에서도 해 보기</h2>
        <div class="g-others">${others.map(id => `<button class="g-other" data-id="${id}">${charSvg(id)}<b>${esc(G.roles[id].label)}</b><span>${esc(sh.label)} 그대로</span></button>`).join('')}</div>
      </section>
      <p class="g-note">게임 결과는 저장되지 않습니다. 단순화한 학습용 시나리오이며 실제 정책·투자 판단의 근거가 아닙니다.</p>
      <div class="controls">
        <button class="btn primary" id="gReplay">같은 역할 · 다른 충격</button>
        <button class="btn" id="gRestart">처음부터</button>
        <a class="btn" href="#research">Research Mode로 →</a>
      </div>
    </div>`;
    root.querySelectorAll('.g-other').forEach(b => b.addEventListener('click', () => start(b.dataset.id, S.shock)));
    $('gReplay').addEventListener('click', () => pickShock(S.role));
    $('gRestart').addEventListener('click', pickRole);
    keepInView();
  }

  pickRole();
})();
