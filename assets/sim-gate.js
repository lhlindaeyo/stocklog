/* Simulation 은 PC 전체화면에서만 진행합니다. 조건이 안 맞으면 게임 세계 위에 안내를 띄웁니다. */
(function () {
  const $ = id => document.getElementById(id);
  const gate = $('gate'), btn = $('gateBtn');

  const isPC = () => matchMedia('(pointer: fine)').matches &&
    !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) &&
    screen.width >= 1024;
  // 버튼으로 들어간 전체화면 + F11 같은 브라우저 전체화면(창 크기 = 화면 크기) 둘 다 인정
  const isFull = () => !!document.fullscreenElement ||
    (Math.abs(innerWidth - screen.width) <= 2 && Math.abs(innerHeight - screen.height) <= 2);

  function check() {
    const pc = isPC(), ok = pc && isFull();
    gate.hidden = ok;
    if (ok) return;
    if (window.SimResearch) window.SimResearch.pause();
    $('gateTitle').textContent = pc ? '전체화면에서 진행됩니다' : 'PC에서 접속해 주세요';
    $('gateBody').textContent = pc
      ? 'Simulation은 PC 전체화면 전용입니다. 전체화면으로 들어가면 게임이 시작됩니다.'
      : 'Simulation은 PC 전체화면 전용이라 모바일·태블릿에서는 진행할 수 없습니다.';
    btn.hidden = !pc || !document.fullscreenEnabled;
    $('gateHint').textContent = pc ? 'F11 키로도 전체화면을 켤 수 있습니다 · Esc로 나가면 다시 멈춥니다' : '';
  }

  btn.addEventListener('click', () => {
    document.documentElement.requestFullscreen().catch(check);
  });
  document.addEventListener('fullscreenchange', check);
  addEventListener('resize', check);
  check();
})();
