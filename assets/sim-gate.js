/* Simulation 은 PC 에서 브라우저 창이 화면을 꽉 채울 때(최대화 또는 전체화면)만 보입니다.
   창이 작으면 게임 세계 위에 창을 키워 달라는 안내를 띄웁니다. */
(function () {
  const $ = id => document.getElementById(id);
  const gate = $('gate');
  const mac = /Mac/i.test(navigator.platform || navigator.userAgent);
  const SLACK = 24; // 창 테두리·작업 표시줄 오차

  const isPC = () => matchMedia('(pointer: fine)').matches &&
    !/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) &&
    screen.width >= 1024;
  // outerWidth/Height 와 screen.avail* 은 둘 다 페이지 확대와 무관한 화면 단위라 바로 비교할 수 있다
  const isFilled = () => !!document.fullscreenElement || (outerWidth > 0 &&
    outerWidth >= screen.availWidth - SLACK && outerHeight >= screen.availHeight - SLACK);

  function check() {
    const pc = isPC(), ok = pc && isFilled();
    gate.classList.toggle('off', ok);
    if (ok) return;
    if (window.SimResearch) window.SimResearch.pause();
    $('gateTitle').textContent = pc ? '창을 화면에 꽉 채워 주세요' : 'PC에서 접속해 주세요';
    $('gateBody').textContent = pc
      ? 'Simulation은 PC 전체화면 전용입니다. 브라우저 창을 최대화하면 바로 보입니다.'
      : 'Simulation은 PC 전체화면 전용이라 모바일·태블릿에서는 진행할 수 없습니다.';
    $('gateKey').hidden = !pc;
    $('gateKbd').textContent = mac ? '⌃ ⌘ F' : '⊞ Win + ↑';
    $('gateHint').textContent = pc ? (mac ? '또는 창 왼쪽 위 초록 버튼' : '또는 창 오른쪽 위 □ 최대화 버튼') : '';
  }

  addEventListener('resize', check);
  document.addEventListener('fullscreenchange', check);
  check();
  gate.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => gate.classList.add('ready')));
})();
