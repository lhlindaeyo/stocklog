/* Simulation 배경 — 하얀 아이소메트릭 도시. 색은 캐릭터에만 두고 세상은 무채색으로 둡니다. */
(function () {
  const bg = document.querySelector('.sw-bg');
  if (!bg) return;
  const { P, poly, box } = window.Chars;

  // 매번 같은 도시가 나오도록 고정 시드 난수
  let seed = 20261022;
  const rnd = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const WALL = ['#ffffff', '#e8eaf0', '#d9dce4'];
  const LOT = 130, GAP = 44; // 블록 한 칸, 도로 폭

  const tree = (x, y) => {
    const [cx, cy] = P(x, y, 22);
    return box(x - 1.5, y - 1.5, 0, 3, 3, 12, ['#d6d9e0', '#cfd2da', '#c3c7d0']) +
      `<circle cx="${cx}" cy="${cy}" r="10" fill="#f7f8fa"/><path d="M${cx - 10} ${cy}a10 10 0 0 0 20 0a10 7 0 0 1 -20 0z" fill="#e3e6ec"/>`;
  };

  function lot(x0, y0) {
    const s = LOT - GAP;
    let out = poly([P(x0, y0, 0), P(x0 + s, y0, 0), P(x0 + s, y0 + s, 0), P(x0, y0 + s, 0)], '#f4f5f8');
    const kind = rnd();
    if (kind < 0.14) { // 공원
      for (let i = 0; i < 6; i++) out += tree(x0 + 12 + rnd() * (s - 24), y0 + 12 + rnd() * (s - 24));
      return out;
    }
    const n = kind < 0.45 ? 1 : kind < 0.75 ? 2 : 4;
    const h = s / 2;
    const parts = n === 1 ? [[0, 0, s, s]] : n === 2 ? [[0, 0, s, h], [0, h, s, h]] : [[0, 0, h, h], [h, 0, h, h], [0, h, h, h], [h, h, h, h]];
    parts.forEach(([px, py, w, d]) => {
      const tall = rnd() < 0.1 ? 50 + rnd() * 50 : 0;
      out += box(x0 + px + 5, y0 + py + 5, 0, w - 10, d - 10, 12 + rnd() * 30 + tall, WALL);
    });
    if (rnd() < 0.4) out += tree(x0 - 8, y0 + rnd() * s);
    return out;
  }

  // 화면을 덮는 칸만 골라 뒤(x+y 작은 쪽)부터 그린다
  const lots = [];
  for (let x = -1320; x <= 2280; x += LOT) {
    for (let y = -1320; y <= 2280; y += LOT) {
      const [sx, sy] = P(x + LOT / 2, y + LOT / 2, 0);
      if (Math.abs(sx) < 1050 && sy > -260 && sy < 1180) lots.push([x, y]);
    }
  }
  lots.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));

  bg.innerHTML = `<svg class="sw-city" viewBox="-900 -80 1800 1000" preserveAspectRatio="xMidYMid slice">
    <rect x="-1200" y="-400" width="2400" height="1800" fill="#e6e9ee"/>
    ${lots.map(([x, y]) => lot(x, y)).join('')}
  </svg>`;
})();
