/* Simulation 은 PC 전체화면에서만 진행합니다. 조건이 안 맞으면 게임 세계 위에 안내를 띄웁니다.
   버튼으로 켜는 전체화면(Fullscreen API)은 다른 페이지로 가면 브라우저가 무조건 풀어 버리므로,
   탭을 오가도 유지되는 브라우저 전체화면(F11)을 쓰도록 안내합니다. */
(function () {
  const $ = id => document.getElementById(id);
  const gate = $('gate');
  const mac = /Mac/i.test(navigator.platform || navigator.userAgent);

  const isPC = () => matchMedia('(pointer: fine)').matches &&
    !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) &&
    screen.width >= 1024;
  // F11 같은 브라우저 전체화면: 창 크기 = 화면 크기
  const isFull = () => !!document.fullscreenElement ||
    matchMedia('(display-mode: fullscreen)').matches ||
    (Math.abs(innerWidth - screen.width) <= 2 && Math.abs(innerHeight - screen.height) <= 2);

  function check() {
    const pc = isPC(), ok = pc && isFull();
    gate.classList.toggle('off', ok);
    if (ok) return;
    if (window.SimResearch) window.SimResearch.pause();
    $('gateTitle').textContent = pc ? '전체화면에서 진행됩니다' : 'PC에서 접속해 주세요';
    $('gateBody').textContent = pc
      ? 'Simulation은 PC 전체화면 전용입니다. 아래 키를 누르면 바로 시작돼요.'
      : 'Simulation은 PC 전체화면 전용이라 모바일·태블릿에서는 진행할 수 없습니다.';
    $('gateKey').hidden = !pc;
    $('gateKbd').textContent = mac ? '⌃ ⌘ F' : 'F11';
    $('gateHint').textContent = pc ? '한 번 켜 두면 다른 탭을 오가도 전체화면이 유지됩니다' : '';
  }

  addEventListener('resize', check);
  document.addEventListener('fullscreenchange', check);
  check();
  gate.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => gate.classList.add('ready')));
})();
