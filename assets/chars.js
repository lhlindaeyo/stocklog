/* 로우폴리 아이소메트릭 캐릭터 (홈 장면과 시뮬레이션에서 공통 사용) */
window.Chars = (function () {
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

  return { P, pts, poly, box, pyramid, firm, bank, state, investor };
})();
