/* =====================================================================
 * 시뮬레이션 모델 정의 — 수식은 이 파일만 수정하면 됩니다.
 * (화면/조작 코드는 assets/sim.js 에 있으며, 이 파일의 값을 읽어서 그립니다.)
 *
 * 지금 들어 있는 식은 화면 확인용 "임시 샘플"입니다. 아래 TODO 표시를 찾아 교체하세요.
 *
 * 상태: x[노드id] = 스트레스 지수 (0 = 평온, 100 = 붕괴)
 * ===================================================================== */
window.SIM_MODEL = {
  /* ---------- 1. 경제 주체 (노드) ---------- */
  nodes: [
    {
      id: 'firm', label: '기업', letter: 'F', x: 320, y: 78,
      weight: 0.3, // 시스템 안정도 계산 시 가중치 (합계 1)
      desc: '재화·서비스를 생산하고 은행·투자자로부터 자금을 조달합니다.',
      // TODO: 실제 지표 식으로 교체. v = 현재 스트레스(0~100)
      metrics: [
        { label: '영업이익률', unit: '%', fn: v => 12 - v * 0.15 },
        { label: '부채비율', unit: '%', fn: v => 80 + v * 1.2 },
      ],
    },
    {
      id: 'bank', label: '은행', letter: 'B', x: 108, y: 232,
      weight: 0.3,
      desc: '예금을 받아 기업에 대출하고 국채를 보유하는 신용 공급자입니다.',
      metrics: [
        { label: '자기자본비율', unit: '%', fn: v => 14 - v * 0.09 },
        { label: '부실채권비율', unit: '%', fn: v => 1 + v * 0.08 },
      ],
    },
    {
      id: 'investor', label: '투자자', letter: 'I', x: 532, y: 232,
      weight: 0.2,
      desc: '주식·채권 등 자산에 투자하고 기업과 국가에 자금을 공급합니다.',
      metrics: [
        { label: '포트폴리오 가치', unit: '', fn: v => 100 - v * 0.45 },
        { label: '변동성', unit: '%', fn: v => 12 + v * 0.35 },
      ],
    },
    {
      id: 'state', label: '국가', letter: 'S', x: 320, y: 386,
      weight: 0.2,
      desc: '재정과 통화 정책으로 경제 전체를 조율하고 세금·국채로 자금을 운용합니다.',
      metrics: [
        { label: '재정수지(GDP 대비)', unit: '%', fn: v => -1.5 - v * 0.06 },
        { label: '국채 금리', unit: '%', fn: v => 3 + v * 0.05 },
      ],
    },
  ],

  /* ---------- 2. 연결 관계 (엣지) ----------
   * from → to 방향으로 스트레스가 전달됩니다. w = 전이 강도(0~1). */
  edges: [
    { from: 'bank', to: 'firm', w: 0.25, label: '대출 공급' },
    { from: 'firm', to: 'bank', w: 0.30, label: '부실채권' },
    { from: 'investor', to: 'firm', w: 0.15, label: '자본 조달' },
    { from: 'firm', to: 'investor', w: 0.25, label: '주가·배당' },
    { from: 'investor', to: 'bank', w: 0.15, label: '자금 이탈' },
    { from: 'bank', to: 'investor', w: 0.15, label: '자산가격 하락' },
    { from: 'state', to: 'bank', w: 0.15, label: '국채·지급보증' },
    { from: 'bank', to: 'state', w: 0.20, label: '구제금융 부담' },
    { from: 'state', to: 'firm', w: 0.10, label: '세금·지출' },
    { from: 'firm', to: 'state', w: 0.15, label: '세수 감소' },
    { from: 'investor', to: 'state', w: 0.10, label: '국채 수요' },
    { from: 'state', to: 'investor', w: 0.15, label: '국채 금리' },
  ],

  /* ---------- 3. 외부 충격 ----------
   * vector = 매 턴 노드에 직접 가해지는 스트레스 (강도 1 기준) */
  shocks: [
    { id: 'rate', label: '금리 급등', desc: '정책금리가 갑자기 오릅니다. 이자 부담이 은행·기업으로 번집니다.', vector: { firm: 2.0, bank: 2.5, investor: 1.5, state: 1.0 } },
    { id: 'credit', label: '신용 경색', desc: '은행 간 불신으로 대출이 막힙니다.', vector: { firm: 1.5, bank: 3.5, investor: 1.0, state: 0.5 } },
    { id: 'demand', label: '수요 위축', desc: '소비·수출이 급감해 기업 매출이 줄어듭니다.', vector: { firm: 3.5, bank: 1.0, investor: 1.5, state: 1.0 } },
    { id: 'commodity', label: '원자재 가격 폭등', desc: '원가 급등으로 기업 이익이 압박받습니다.', vector: { firm: 3.0, bank: 0.5, investor: 1.0, state: 1.5 } },
    { id: 'crash', label: '증시 폭락', desc: '자산 가격이 급락해 투자자와 담보 가치가 흔들립니다.', vector: { firm: 1.0, bank: 1.5, investor: 3.5, state: 0.5 } },
    { id: 'sovereign', label: '국가 재정위기', desc: '국가 신용이 흔들려 국채 가격이 떨어집니다.', vector: { firm: 0.5, bank: 2.0, investor: 2.0, state: 3.5 } },
  ],

  /* ---------- 4. 정책 개입 (플레이어 행동) ----------
   * relief = 즉시 줄어드는 스트레스, side = 부작용으로 늘어나는 스트레스
   * gainMult/gainTurns = 일정 턴 동안 전이 강도를 곱함 */
  policies: [
    { id: 'liquidity', label: '유동성 공급', desc: '중앙은행이 은행에 자금을 풉니다.', cost: 1, relief: { bank: 16, investor: 6 }, side: { state: 3 } },
    { id: 'fiscal', label: '재정 부양', desc: '정부 지출로 기업 수요를 떠받칩니다.', cost: 1, relief: { firm: 14, investor: 4 }, side: { state: 6 } },
    { id: 'regulation', label: '금융 안전망 강화', desc: '3턴 동안 충격 전이를 줄입니다.', cost: 1, relief: { bank: 5 }, side: {}, gainMult: 0.6, gainTurns: 3 },
  ],

  /* ---------- 5. 시나리오 (시작 카드) ---------- */
  scenarios: [
    { id: 's1', name: '금융위기', desc: '신용 경색이 번지는 위기', shock: 'credit', magnitude: 6, duration: 3 },
    { id: 's2', name: '스태그플레이션', desc: '원자재 폭등과 수요 위축', shock: 'commodity', magnitude: 5, duration: 4 },
    { id: 's3', name: '재정위기', desc: '국가 신용 하락', shock: 'sovereign', magnitude: 6, duration: 3 },
    { id: 's4', name: '금리 쇼크', desc: '급격한 긴축', shock: 'rate', magnitude: 7, duration: 2 },
  ],

  /* ---------- 6. 게임 규칙 ---------- */
  rules: {
    maxTurns: 20,        // 이 턴까지 버티면 클리어
    collapseBelow: 15,   // 시스템 안정도가 이 값 미만이면 붕괴
    startPoints: 3,      // 시작 정책 포인트
    pointEvery: 3,       // 몇 턴마다 +1
    shockScale: 0.5,     // 충격 강도 1당 매 턴 가해지는 배율
  },

  /* ---------- 7. 한 턴 계산 ---------- */
  // TODO: 실제 수식으로 교체하세요.
  // x       : 현재 스트레스 { firm, bank, investor, state }
  // ctx.shock  : 이번 턴에 노드에 직접 들어오는 충격 { id: 값 }
  // ctx.relief : 이번 턴 정책으로 줄어드는 값      { id: 값 }
  // ctx.gain   : 전이 강도 배율 (기본 1)
  // 반환: 다음 턴 스트레스
  step(x, ctx) {
    const next = {};
    const decay = 0.12; // 자연 회복률
    this.nodes.forEach(n => {
      const inflow = this.edges
        .filter(e => e.to === n.id)
        .reduce((sum, e) => sum + e.w * x[e.from], 0);
      const contagion = ctx.gain * inflow * (1 - x[n.id] / 100); // 이미 높으면 덜 늘어남
      const v = x[n.id] * (1 - decay) + contagion + (ctx.shock[n.id] || 0) - (ctx.relief[n.id] || 0);
      next[n.id] = Math.max(0, Math.min(100, v));
    });
    return next;
  },

  /* ---------- 8. 시스템 안정도 (0~100, 높을수록 좋음) ---------- */
  stability(x) {
    const stress = this.nodes.reduce((s, n) => s + n.weight * x[n.id], 0);
    return Math.max(0, Math.min(100, 100 - stress));
  },

  grade(stability) {
    if (stability >= 85) return 'S';
    if (stability >= 70) return 'A';
    if (stability >= 55) return 'B';
    if (stability >= 40) return 'C';
    if (stability >= 25) return 'D';
    return 'F';
  },
};
