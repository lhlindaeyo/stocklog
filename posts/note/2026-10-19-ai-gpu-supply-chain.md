---
title: AI 가속기 한 개를 뜯어보기: 부품별 공급망 지도
date: 2026-10-19
keywords: 반도체, HBM, 산업분석
summary: AI 가속기 하나에 들어가는 부품을 나눠서, 누가 만들고 왜 소수만 만들 수 있는지 정리한 지도.
---

<!-- 글 안의 "(조사 필요)"와 TODO 주석은 발행 전에 모두 채우거나 지웁니다. 검색: TODO -->

## Question: AI 가속기는 어떤 부품으로 되어 있고, 병목은 어디인가?

이 글은 세 가지 질문에서 출발합니다.

1. 메모리 반도체와 비메모리 반도체는 무엇이 다른가?
2. 파운드리 시장은 왜 TSMC가 독주하는가?
3. HBM은 왜 뉴스에 자주 나오는가?

**짧은 답**

1. 메모리는 데이터를 **저장**하고, 비메모리는 데이터를 **계산**합니다.
2. TSMC는 고객의 신뢰, 큰 투자와 높은 수율, 패키징까지 묶어 주는 서비스 덕분에 독주합니다.
3. HBM은 AI 가속기에 꼭 필요한데, 만들기 어렵고 값도 비쌉니다. 그래서 만드는 회사의 실적과 주가를 크게 움직입니다.

먼저 기본 개념을 짧게 정리하고, 그다음 부품별로 "누가 만드는지, 왜 소수만 만드는지"를 봅니다.

> [글에 나오는 용어를 직접 눌러 비교해 보는 페이지 →](terms.html#nano)

<figure style="margin:1.8em 0;padding:14px 12px 10px;background:#f7f4f2;border:1px solid #e4dedb;border-radius:12px">
<svg viewBox="0 0 680 280" style="width:100%;height:auto;display:block;font-family:inherit" role="img" aria-label="AI 가속기를 옆에서 본 단면도: 기판 위에 인터포저, 그 위에 GPU 칩과 HBM">
<rect x="40" y="210" width="600" height="40" rx="4" fill="#e4dedb" stroke="#b9b0ac" stroke-width="1"/>
<text x="340" y="235" font-size="14" fill="#14100f" text-anchor="middle" font-weight="400">④ 패키지 기판</text>
<circle cx="60" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="90" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="120" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="150" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="180" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="210" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="240" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="270" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="300" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="330" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="360" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="390" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="420" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="450" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="480" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="510" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="540" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="570" cy="262" r="5" fill="#b9b0ac"/>
<circle cx="600" cy="262" r="5" fill="#b9b0ac"/>
<rect x="70" y="168" width="540" height="34" rx="2" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="340" y="190" font-size="14" fill="#14100f" text-anchor="middle" font-weight="400">③ 실리콘 인터포저</text>
<rect x="270" y="80" width="140" height="88" rx="4" fill="#8C1515" stroke="none" stroke-width="1"/>
<text x="340" y="120" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">① GPU 칩</text>
<text x="340" y="142" font-size="13" fill="#fff" text-anchor="middle" font-weight="400">(AI 계산)</text>
<rect x="100" y="80" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="100" y="97" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="100" y="114" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="100" y="131" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="100" y="148" width="70" height="20" rx="2" fill="#2b5fa8" stroke="#1d3f73" stroke-width="1"/>
<line x1="118" y1="80" x2="118" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="152" y1="80" x2="152" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<rect x="180" y="80" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="180" y="97" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="180" y="114" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="180" y="131" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="180" y="148" width="70" height="20" rx="2" fill="#2b5fa8" stroke="#1d3f73" stroke-width="1"/>
<line x1="198" y1="80" x2="198" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="232" y1="80" x2="232" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<rect x="430" y="80" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="430" y="97" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="430" y="114" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="430" y="131" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="430" y="148" width="70" height="20" rx="2" fill="#2b5fa8" stroke="#1d3f73" stroke-width="1"/>
<line x1="448" y1="80" x2="448" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="482" y1="80" x2="482" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<rect x="510" y="80" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="510" y="97" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="510" y="114" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="510" y="131" width="70" height="16" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<rect x="510" y="148" width="70" height="20" rx="2" fill="#2b5fa8" stroke="#1d3f73" stroke-width="1"/>
<line x1="528" y1="80" x2="528" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="562" y1="80" x2="562" y2="148" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="250" y1="124" x2="270" y2="124" stroke="#8C1515" stroke-width="4"/>
<line x1="410" y1="124" x2="430" y2="124" stroke="#8C1515" stroke-width="4"/>
<text x="175" y="66" font-size="15" fill="#1d3f73" text-anchor="middle" font-weight="700">② HBM</text>
<text x="545" y="66" font-size="15" fill="#1d3f73" text-anchor="middle" font-weight="700">② HBM</text>
</svg>
<figcaption style="margin-top:8px;font-size:.85rem;color:#6a6361;text-align:center">AI 가속기를 옆에서 본 모습(예시). GPU와 HBM이 인터포저 위에 나란히 올라가고, 인터포저는 기판 위에 놓입니다.<br>GPU와 HBM 사이의 굵은 선이 데이터 통로이고, 점선은 층을 관통하는 전극(TSV)입니다. 개수와 배치는 제품마다 다릅니다.</figcaption>
</figure>

| 번호 | 부품 | 하는 일 | 대표 기업 |
|------|------|---------|-----------|
| ① | GPU 칩 | AI 계산을 맡는 두뇌 | 설계: 엔비디아, AMD 등 / 제조: TSMC 등 |
| ② | HBM | GPU에 데이터를 빠르게 대 주는 메모리 | SK하이닉스, 삼성전자, 마이크론 |
| ③ | 인터포저 | GPU와 HBM을 이어 주는 중간 기판 | TSMC의 CoWoS (UMC 등도 공급에 합류) |
| ④ | 패키지 기판 | 전체를 받치고 바깥과 연결 | (조사 필요) |



## 0. 먼저 알아둘 기본 개념

### 0-1. 반도체란?

반도체는 전기가 잘 통하는 물질(도체)과 통하지 않는 물질(부도체)의 중간 성질을 가진 물질입니다. 조건에 따라 전기를 흐르게 하거나 막을 수 있어서, 전기 스위치처럼 쓸 수 있습니다. 이 켜짐/꺼짐이 컴퓨터가 쓰는 0과 1의 출발점입니다. 반도체는 스위치 역할과 신호를 키우는 증폭기 역할을 모두 할 수 있습니다.

순수한 실리콘은 전기를 거의 흘리지 않습니다. 여기에 불순물을 아주 조금 넣으면 전류가 흐르기 시작합니다. 전자나 정공(전자가 빠져나간 빈자리)이 생기기 때문입니다.

| 유형 | 넣는 불순물 | 전기를 나르는 입자 | 쓰임 |
|------|-------------|--------------------|------|
| 진성 반도체 | 없음 (순수 실리콘) | 전자와 정공이 같은 수 | 기준 물질, 웨이퍼의 원재료 |
| N형 반도체 | 5가 원소 (인, 비소) | 전자 (음전하) | 트랜지스터의 소스·드레인 |
| P형 반도체 | 3가 원소 (붕소, 갈륨) | 정공 (양전하처럼 움직임) | PN 접합, CMOS 구성 |

### 0-2. 메모리와 비메모리, 무엇이 다른가?

메모리는 책을 꽂아 두는 **책장**이고, 비메모리는 책을 읽고 문제를 푸는 **두뇌**라고 보면 쉽습니다. 메모리는 데이터를 저장하고, 비메모리(시스템반도체)는 데이터를 계산하고 제어합니다.

| 비교 항목 | 메모리 반도체 | 비메모리 (시스템반도체) |
|-----------|---------------|--------------------------|
| 핵심 기능 | 데이터 저장 | 연산·제어·신호 처리 |
| 대표 제품 | D램, 낸드플래시, HBM | CPU, GPU, AP, 이미지센서, 전력반도체 |
| 생산 방식 | 소품종 대량 생산 | 다품종 소량 생산 (고객 맞춤) |
| 경쟁 요소 | 미세공정, 수율, 원가 | 설계 능력, IP, 소프트웨어 생태계 |
| 대표 기업 | 삼성전자, SK하이닉스, 마이크론 | 엔비디아, 퀄컴, 인텔, TSMC (위탁생산) |
| 경기 민감도 | 높음 (가격이 크게 오르내림) | 상대적으로 낮음 |

### 0-3. 반도체 회사는 무슨 일을 하느냐로 나뉩니다

반도체 산업은 크게 **설계 → 생산 → 조립·테스트 → 판매** 순서로 이어집니다. 회사마다 이 중 어디를 맡는지가 다릅니다.

| 사업 모델 | 하는 일 | 대표 기업 |
|-----------|---------|-----------|
| 팹리스 (Fabless) | 칩 설계만 하고, 생산은 맡김 | 엔비디아, 퀄컴, AMD, 애플 |
| 파운드리 (Foundry) | 설계도를 받아 대신 생산만 함 | TSMC, 삼성 파운드리, SMIC |
| IDM (종합반도체) | 설계, 생산, 판매를 모두 함 | 삼성전자, SK하이닉스, 인텔 |
| OSAT | 후공정(패키징·테스트) 전문 | ASE, 앰코 |
| 소부장 | 소재·부품·장비를 공급 | ASML, 램리서치, 도쿄일렉트론 |

<figure style="margin:1.8em 0;padding:14px 12px 10px;background:#f7f4f2;border:1px solid #e4dedb;border-radius:12px">
<svg viewBox="0 0 680 235" style="width:100%;height:auto;display:block;font-family:inherit" role="img" aria-label="반도체 산업 흐름: 설계, 생산, 조립·테스트, 판매와 각 단계의 기업 유형">
<rect x="20" y="20" width="130" height="50" rx="8" fill="#fff" stroke="#b9b0ac" stroke-width="1"/>
<text x="85" y="42" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">설계</text>
<text x="85" y="60" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">팹리스</text>
<text x="85" y="92" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">엔비디아·퀄컴</text>
<text x="85" y="109" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">AMD·애플</text>
<line x1="154" y1="45" x2="178" y2="45" stroke="#8C1515" stroke-width="2"/>
<polygon points="178,39 178,51 187,45" fill="#8C1515"/>
<rect x="190" y="20" width="130" height="50" rx="8" fill="#fff" stroke="#b9b0ac" stroke-width="1"/>
<text x="255" y="42" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">생산</text>
<text x="255" y="60" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">파운드리</text>
<text x="255" y="92" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">TSMC</text>
<text x="255" y="109" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">삼성 파운드리</text>
<line x1="324" y1="45" x2="348" y2="45" stroke="#8C1515" stroke-width="2"/>
<polygon points="348,39 348,51 357,45" fill="#8C1515"/>
<rect x="360" y="20" width="130" height="50" rx="8" fill="#fff" stroke="#b9b0ac" stroke-width="1"/>
<text x="425" y="42" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">조립·테스트</text>
<text x="425" y="60" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">OSAT</text>
<text x="425" y="92" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">ASE</text>
<text x="425" y="109" font-size="13" fill="#6a6361" text-anchor="middle" font-weight="400">앰코</text>
<line x1="494" y1="45" x2="518" y2="45" stroke="#8C1515" stroke-width="2"/>
<polygon points="518,39 518,51 527,45" fill="#8C1515"/>
<rect x="530" y="20" width="130" height="50" rx="8" fill="#fff" stroke="#b9b0ac" stroke-width="1"/>
<text x="595" y="42" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">판매</text>
<text x="595" y="60" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">고객에게 납품</text>
<path d="M20 128 V138 H660 V128" stroke="#8C1515" stroke-width="1.5" fill="none"/>
<text x="340" y="160" font-size="13.5" fill="#8C1515" text-anchor="middle" font-weight="600">IDM: 설계부터 판매까지 한 회사가 모두 함 (삼성전자·SK하이닉스·인텔)</text>
<rect x="190" y="182" width="470" height="34" rx="6" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="425" y="204" font-size="13.5" fill="#14100f" text-anchor="middle" font-weight="400">소부장: 생산·조립에 쓰는 소재·부품·장비 (ASML 등)</text>
</svg>
<figcaption style="margin-top:8px;font-size:.85rem;color:#6a6361;text-align:center">반도체 산업의 흐름. 단계마다 맡는 회사 유형이 다르고, IDM은 전 과정을 혼자 하며, 소부장은 생산과 조립 단계를 뒤에서 받쳐 줍니다.</figcaption>
</figure>

> [회사 유형을 눌러서 맡는 단계 비교하기 →](terms.html#types)

자주 나오는 용어도 정리합니다.

| 용어 | 뜻 | 왜 중요한가 |
|------|----|-------------|
| 웨이퍼 (Wafer) | 실리콘 기둥(잉곳)을 얇게 자른 원판. 칩이 올라가는 바탕 | 모든 공정이 웨이퍼 위에서 진행됨 |
| 팹 (Fab) | 반도체 제조 공장 | 전공정이 이뤄지는 핵심 시설 |
| 나노(nm) 공정 | 회로 선폭이 얼마나 가는지 | 숫자가 작을수록 성능과 전력 효율에 유리. 지금은 2나노 경쟁 |
| 수율 (Yield) | 만든 칩 중 정상 칩의 비율 | 원가와 이익을 정하는 가장 큰 변수 |
| EUV | 극자외선으로 회로를 새기는 기술 | 미세공정의 핵심. ASML이 사실상 독점 |
| 첨단 패키징 | 칩을 쌓거나 이어 붙이는 후공정 기술 | CoWoS, TSV 등 HBM을 만드는 전제 조건 |

> [공정을 미세하게 만들면 무엇이 달라지는지 슬라이더로 보기 →](terms.html#nano)

### 0-4. 반도체는 이렇게 만들어집니다 (8대 공정)

1단계부터 6단계까지가 전공정(웨이퍼 위에 회로를 만드는 일), 7단계와 8단계가 후공정(검사하고 포장하는 일)입니다.

| 단계 | 공정 | 핵심 내용 |
|------|------|-----------|
| 1 | 웨이퍼 제조 | 잉곳을 키우고, 자르고, 갈아서 웨이퍼를 만듦 |
| 2 | 산화 | 웨이퍼 표면에 절연막(산화막)을 입혀 회로 만들 준비를 함 |
| 3 | 포토 (노광) | 회로 모양을 빛으로 웨이퍼에 옮김. EUV가 여기에 쓰임 |
| 4 | 식각 | 필요 없는 부분을 깎아 회로 모양을 완성함 |
| 5 | 증착·이온주입 | 얇은 막을 입히고, 불순물을 넣어 N형/P형을 만듦 |
| 6 | 금속배선 | 소자들 사이를 전기가 흐르도록 연결함 |
| 7 | EDS (테스트) | 웨이퍼 상태에서 불량 칩을 골라냄 |
| 8 | 패키징 | 칩을 보호하고 바깥과 연결함. HBM은 여기서 층층이 쌓음 |

**1단계 웨이퍼 제조는 4단계로 나뉩니다.**

1. **실리콘 정제**: 모래에서 뽑은 실리콘을 1,500도 안팎에서 녹여 불순물을 없앱니다. 반도체용은 순도가 99.999999999%(11나인) 이상이어야 합니다.
2. **잉곳 성장**: 녹인 실리콘에 씨앗 결정을 넣고 천천히 끌어올려, 단결정 실리콘 기둥(잉곳)을 만듭니다. 회전 속도로 지름을 조절합니다.
3. **잉곳 절단**: 다이아몬드 톱으로 잉곳을 얇게 썰어 원판(웨이퍼)을 만듭니다. 300mm 웨이퍼의 두께는 약 750㎛입니다.
4. **표면 연마**: 자른 직후의 표면은 거칠어서, 거울처럼 매끄럽게 갈아냅니다. 이래야 그 위에 회로를 올릴 수 있습니다.

웨이퍼가 클수록 한 번에 만들 수 있는 칩이 많아져서 원가 경쟁력이 높아집니다. 그래서 업계는 웨이퍼를 더 크게 만드는 방향으로 발전해 왔습니다.

### 0-5. 패키징: 전통 방식과 첨단 방식

패키징은 다 만든 칩을 보호하고, 바깥과 전기적으로 연결하는 공정입니다. AI 반도체에서는 이 공정이 성능을 좌우합니다.

| 구분 | 전통 패키징 | 첨단 패키징 |
|------|-------------|-------------|
| 대표 기술 | DIP, QFP, BGA, 와이어본딩 | 2.5D, 3D, TSV, 칩렛, FOWLP, SiP |
| 연결 방식 | 금선(와이어)으로 연결 | 플립칩, 하이브리드 본딩 |
| 쓰이는 제품 | 가전, 일반 소비재 반도체 | AI 가속기, GPU, HBM, HPC |
| 핵심 특징 | 칩 하나를 보호하고 연결 | 여러 칩을 합쳐 성능과 집적도를 높임 |
| 시장 성장성 | 다 자란 시장 | 연평균 11% 이상 성장 |

- **2.5D 패키징**: 실리콘 인터포저(중간 기판) 위에 여러 칩을 나란히 놓고 연결합니다. GPU와 HBM을 같은 기판에 올리는 구조가 대표적입니다.
- **3D 패키징**: 칩을 위로 쌓고, TSV(실리콘 관통 전극)로 위아래를 뚫어 연결합니다. HBM의 핵심 기술입니다.
- **칩렛 (Chiplet)**: 큰 칩 하나를 작은 칩 여러 개로 나눠 만든 뒤 합칩니다. 불량이 줄고 비용이 내려갑니다. 인텔, AMD, 삼성 모두 로드맵에 넣었습니다.
- **FOWLP (팬아웃 웨이퍼 레벨 패키징)**: 기판 없이 웨이퍼 단계에서 패키징합니다. 얇고 작게 만들 수 있어 모바일과 웨어러블에 맞습니다.
- **SiP (System in Package)**: 종류가 다른 칩과 부품을 하나의 패키지에 담습니다. 스마트워치 같은 작은 기기에 쓰입니다.

2.5D와 3D의 차이는 그림으로 보면 쉽습니다.

<figure style="margin:1.8em 0;padding:14px 12px 10px;background:#f7f4f2;border:1px solid #e4dedb;border-radius:12px">
<svg viewBox="0 0 680 245" style="width:100%;height:auto;display:block;font-family:inherit" role="img" aria-label="2.5D 패키징과 3D 패키징의 구조 비교">
<line x1="340" y1="20" x2="340" y2="232" stroke="#d9d2ce" stroke-width="1"/>
<text x="170" y="28" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">2.5D: 옆으로 나란히</text>
<rect x="30" y="200" width="280" height="24" rx="3" fill="#e4dedb" stroke="#b9b0ac" stroke-width="1"/>
<text x="170" y="217" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">패키지 기판</text>
<rect x="42" y="176" width="256" height="24" rx="2" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="170" y="193" font-size="12.5" fill="#14100f" text-anchor="middle" font-weight="400">실리콘 인터포저</text>
<rect x="52" y="112" width="52" height="64" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="78" y="148" font-size="12.5" fill="#1d3f73" text-anchor="middle" font-weight="700">HBM</text>
<rect x="116" y="112" width="108" height="64" rx="3" fill="#8C1515" stroke="none" stroke-width="1"/>
<text x="170" y="148" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">GPU</text>
<rect x="236" y="112" width="52" height="64" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="262" y="148" font-size="12.5" fill="#1d3f73" text-anchor="middle" font-weight="700">HBM</text>
<line x1="104" y1="140" x2="116" y2="140" stroke="#8C1515" stroke-width="3"/>
<line x1="224" y1="140" x2="236" y2="140" stroke="#8C1515" stroke-width="3"/>
<text x="510" y="28" font-size="15" fill="#14100f" text-anchor="middle" font-weight="700">3D: 위로 쌓기 (HBM)</text>
<rect x="470" y="60" width="80" height="22" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="510" y="76" font-size="12" fill="#1d3f73" text-anchor="middle" font-weight="400">D램 칩</text>
<rect x="470" y="85" width="80" height="22" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="510" y="101" font-size="12" fill="#1d3f73" text-anchor="middle" font-weight="400">D램 칩</text>
<rect x="470" y="110" width="80" height="22" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="510" y="126" font-size="12" fill="#1d3f73" text-anchor="middle" font-weight="400">D램 칩</text>
<rect x="470" y="135" width="80" height="22" rx="2" fill="#bcd0ea" stroke="#2b5fa8" stroke-width="1"/>
<text x="510" y="151" font-size="12" fill="#1d3f73" text-anchor="middle" font-weight="400">D램 칩</text>
<rect x="470" y="159" width="80" height="26" rx="2" fill="#2b5fa8" stroke="#1d3f73" stroke-width="1"/>
<text x="510" y="176" font-size="12" fill="#fff" text-anchor="middle" font-weight="400">베이스 칩</text>
<line x1="490" y1="60" x2="490" y2="159" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<line x1="530" y1="60" x2="530" y2="159" stroke="#1d3f73" stroke-width="1.6" stroke-dasharray="3 2"/>
<rect x="440" y="187" width="140" height="22" rx="2" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="510" y="203" font-size="12" fill="#14100f" text-anchor="middle" font-weight="400">인터포저·기판</text>
<text x="392" y="118" font-size="13.5" fill="#1d3f73" text-anchor="middle" font-weight="700">TSV</text>
<line x1="415" y1="114" x2="489" y2="114" stroke="#6a6361" stroke-width="1"/>
<text x="392" y="136" font-size="11.5" fill="#6a6361" text-anchor="middle" font-weight="400">층을 뚫는 전극</text>
</svg>
<figcaption style="margin-top:8px;font-size:.85rem;color:#6a6361;text-align:center">2.5D는 칩을 옆으로 나란히 놓고, 3D는 칩을 위로 쌓아 TSV로 이어 붙입니다. HBM은 3D로 쌓은 메모리이고, 이를 GPU 옆에 붙이는 방식이 2.5D입니다.</figcaption>
</figure>

### 0-6. AI 반도체의 종류

AI 반도체는 크게 네 종류입니다.

| 종류 | 특징 | 장점 | 단점 | 대표 제품 |
|------|------|------|------|-----------|
| GPU | 그래픽용에서 출발한, 계산을 동시에 많이 하는 칩 | 쓰임새가 넓음, CUDA 등 소프트웨어 생태계 | 비싸고 전력을 많이 씀 | 엔비디아 블랙웰·루빈, AMD 인스팅트 |
| NPU | 인공신경망 계산 전용 칩 | 전력 대비 성능이 좋음 | GPU보다 쓰임새가 좁음 | 리벨리온 아톰, 퓨리오사AI 레니게이드 |
| ASIC | 특정 용도에 맞춘 주문형 칩 | 목표 작업에서 효율이 최고, 많이 만들면 단가가 내려감 | 개발 기간과 비용이 크고, 만든 뒤 고치기 어려움 | 구글 TPU |
| FPGA | 만든 뒤에도 회로를 다시 프로그래밍할 수 있음 | 설계가 유연하고 지연이 짧음 | 개당 단가가 높아 대량 생산에 불리 | AMD(자일링스) 계열 FPGA |

<!-- TODO(확인): 블랙웰·루빈 등 제품명과 출시 시점은 발행 시점 기준으로 다시 확인 -->

> [AI 칩 두 개를 골라 나란히 비교하기 →](terms.html#chips)

### 0-7. GPU 안에서 일어나는 일

GPU는 그래픽카드가 아닙니다. 그래픽카드는 GPU에 기판, 외부 출력 포트 등을 붙인 제품이고, GPU는 그 안의 계산 칩입니다.

**GPU = 수천 개의 코어가 동시에 계산하는 병렬 연산 전문 장치.** 게임, 영상, AI, 연구에 모두 쓰입니다.

CPU와 GPU는 역할을 나눠 일합니다. 순서대로 처리해야 하는 복잡한 계산은 CPU가 잘합니다. CPU가 전체 계획을 세우고 "이 부분을 동시에 처리해"라고 시키면, GPU가 수천 개의 코어로 빠르게 끝냅니다.

GPU 안에는 데이터를 두는 곳이 여러 층으로 있습니다.

| 저장 공간 | 특징 |
|-----------|------|
| 레지스터 (Register) | 가장 빠르고 가장 작음. GPU 코어가 계산할 때 바로 씀 |
| 캐시 (L1, L2) | RAM의 데이터를 미리 복사해 둔 빠른 임시 저장소 |
| GPU DRAM | 프로그램을 실행할 때 쓰는 큰 저장소. 가장 느림 |

용량과 속도는 반대로 움직입니다. 용량은 레지스터 < L1 캐시 < L2 캐시 < GPU DRAM 순으로 커지고, 속도는 반대 순서로 빠릅니다.

<figure style="margin:1.8em 0;padding:14px 12px 10px;background:#f7f4f2;border:1px solid #e4dedb;border-radius:12px">
<svg viewBox="0 0 680 230" style="width:100%;height:auto;display:block;font-family:inherit" role="img" aria-label="GPU 안의 저장 공간: 레지스터, L1·L2 캐시, GPU DRAM의 속도와 용량 비교">
<rect x="255.0" y="20" width="170" height="42" rx="6" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="340" y="46" font-size="14" fill="#14100f" text-anchor="middle" font-weight="400">레지스터 (Register)</text>
<rect x="215.0" y="68" width="250" height="42" rx="6" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="340" y="94" font-size="14" fill="#14100f" text-anchor="middle" font-weight="400">L1 캐시</text>
<rect x="170.0" y="116" width="340" height="42" rx="6" fill="#efeae7" stroke="#b9b0ac" stroke-width="1"/>
<text x="340" y="142" font-size="14" fill="#14100f" text-anchor="middle" font-weight="400">L2 캐시</text>
<rect x="120.0" y="164" width="440" height="42" rx="6" fill="#8C1515" stroke="none" stroke-width="1"/>
<text x="340" y="190" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">GPU DRAM (AI 가속기에서는 HBM)</text>
<text x="8" y="44" font-size="13" fill="#6a6361" text-anchor="start" font-weight="400">↑ 빠르고 작음</text>
<text x="8" y="190" font-size="13" fill="#6a6361" text-anchor="start" font-weight="400">↓ 느리고 큼</text>
</svg>
<figcaption style="margin-top:8px;font-size:.85rem;color:#6a6361;text-align:center">GPU 안의 저장 공간. 위로 갈수록 빠르지만 용량이 작고, 아래로 갈수록 느리지만 용량이 큽니다. 가장 아래 큰 저장소 자리에 HBM이 들어갑니다.</figcaption>
</figure>

> [저장 공간 층별로 눌러서 비교하기 →](terms.html#memory)

여기서 중요한 점이 하나 있습니다. **AI 가속기에서는 이 "GPU DRAM" 자리에 HBM이 들어갑니다.** 계산이 아무리 빨라도 데이터가 늦게 오면 GPU가 기다려야 합니다. 그래서 HBM이 중요합니다. (게임용 그래픽카드는 보통 GDDR이라는 다른 메모리를 씁니다.)



## 1. 전체 지도: 한눈에 보는 구조

| 부품/단계 | 한 줄 역할 | 대장주 (점유율) | 과점 정도 |
|-----------|-----------|----------------|-----------|
| AI 연산 칩 (GPU 등) | 계산을 맡는 두뇌 | 엔비디아 (AI 가속기 매출 기준 약 80~90%) | 매우 높음 |
| 파운드리 | 설계도를 받아 칩을 대신 만듦 | TSMC (약 70%) | 매우 높음 |
| HBM | GPU 옆에서 데이터를 빠르게 공급하는 메모리 | SK하이닉스 50%, 삼성전자 33%, 마이크론 18% (2026년 2분기) | 3개 회사가 거의 전부 |
| 첨단 패키징 | 여러 칩을 한 판에 붙여 하나의 제품으로 만듦 | TSMC (CoWoS) | 높음 (공급 병목) |
| EUV 노광 장비 | 칩에 아주 가는 회로를 새기는 기계 | ASML | 유일한 공급사 |
| 공정 장비 | 막을 입히고, 깎고, 검사하는 기계 | 분야별로 1위가 다름 (AMAT, 램리서치, KLA, TEL) | 분야별로 높음 |
| 패키지 기판 | 칩 전체를 받치고 바깥과 연결 | (조사 필요) | (조사 필요) |

<!-- TODO(출처): 위 점유율 수치(엔비디아 80~90%, TSMC 약 70%)는 지표라서 나중에 출처를 붙입니다. HBM 점유율은 카운터포인트리서치 자료로 보입니다. -->



## 2. 부품별 카드

### AI 연산 칩 (GPU, NPU, ASIC)

- **역할**: AI 계산을 직접 하는 두뇌입니다. 종류는 0-6의 표를 참고하세요.
- **대장주**: 엔비디아. AI 가속기 시장에서 매출 기준으로 약 80~90%를 차지합니다.
- **과점 이유**: 칩 성능만이 아니라 소프트웨어 플랫폼인 **CUDA(쿠다)** 때문입니다. 15년 넘게 전 세계 AI 개발자들이 CUDA로 코드를 짜고 연구해 왔습니다. 다른 회사 칩(AMD 등)으로 바꾸려면 기존 코드를 크게 고쳐야 해서, 갈아타는 비용(전환 비용)이 매우 큽니다.
- **어려운 지점**: 칩만 잘 만든다고 끝이 아닙니다. 개발자들이 계속 쓰게 만드는 소프트웨어 생태계를 함께 키워야 합니다.
- **미래기술과 선두**: 엔비디아 칩은 구하기 어렵고 비쌉니다. 그래서 구글, MS, 아마존, 메타 같은 빅테크가 자체 AI 칩(ASIC)을 늘리고 있습니다. 구글의 TPU, 아마존의 Trainium이 대표적입니다. 이런 맞춤형 칩이 전체 AI 칩 시장의 10~20% 이상을 차지할 것이라는 전망도 있습니다.

### 파운드리 (TSMC)

- **역할**: 팹리스가 만든 설계도를 받아 대신 칩을 만들어 줍니다.
- **대장주**: TSMC. 2025~2026년 기준 세계 파운드리 시장의 약 70%를 차지하는 압도적인 1위입니다.
- **과점 이유**: TSMC가 독주하는 이유는 세 가지입니다.
  - **고객의 신뢰**: TSMC는 "고객과 경쟁하지 않는다"는 원칙을 지킵니다. 그래서 애플, 엔비디아, AMD가 핵심 설계를 안심하고 맡깁니다.
  - **투자 규모와 수율**: 매년 수십조 원을 투자해서, 3나노와 5나노 같은 최신 공정에서 가장 안정적인 수율을 가장 먼저 확보합니다.
  - **패키징까지 한 곳에서**: CoWoS 같은 첨단 패키징 생태계를 직접 만들어서, 설계부터 패키징까지 통째로 맡길 수 있는 '턴키(Turn-key)' 서비스를 합니다.
- **어려운 지점**: 파운드리의 경쟁력은 세 가지로 평가합니다.
  - **생산 능력**: 위탁 생산을 얼마나 많이, 얼마나 효율적으로 할 수 있는가. 효율이 좋다는 것은 웨이퍼 한 장에 칩을 더 많이 찍는다는 뜻입니다.
  - **기술력**: 얼마나 미세한 공정까지 가능한가. 7나노 → 5나노 → 3나노로 갈수록 같은 면적에 트랜지스터를 더 많이 넣어서 성능과 전력 효율이 좋아집니다.
  - **수율**: 웨이퍼 한 장에서 불량 없이 찍어내는 칩의 비율입니다. 수율은 매출총이익률(GPM)과 바로 이어집니다. 고객사는 웨이퍼 단위로 돈을 내기 때문에 수율이 좋은 곳에 주문을 맡깁니다.
- **삼성 파운드리와 인텔**:
  - 삼성전자는 세계 최초로 3나노에 **GAA(Gate-All-Around)** 기술을 도입했습니다. GAA는 트랜지스터의 구조를 바꿔 전기가 새는 것을 줄이는 기술입니다. 하지만 수율을 높이고 큰 팹리스 고객을 모으는 데 어려움을 겪어서, 점유율 격차를 좁히지 못하고 있습니다.
  - 인텔은 '파운드리 재건'을 선언하고 18A(1.8나노급) 공정에 힘을 쏟고 있습니다. 하지만 적자가 커서 파운드리 사업부의 분리와 구조조정이 함께 진행되고 있습니다.
- **미래기술과 선두**: **2나노 경쟁**이 진행 중입니다. TSMC, 삼성전자, 인텔 모두 2025~2026년을 2나노 양산의 시작점으로 보고 있습니다. 기존 고객이 많은 TSMC가 가장 앞서 있다는 평가를 받습니다. 삼성전자는 GAA 공정을 먼저 경험한 점을, 인텔은 **후면 전력 공급** 기술(BSPDN, 전력선을 칩 뒷면으로 옮기는 기술)을 무기로 역전을 노립니다.

<!-- TODO(확인): 인텔 파운드리 사업부 분리 현황은 최근 상황으로 한 번 더 확인 -->

### HBM (고대역폭 메모리)

- **역할**: D램 칩을 여러 층으로 쌓고, TSV(실리콘 관통 전극)로 위아래를 연결한 메모리입니다. GPU 옆에 붙어서 데이터를 빠르게 대 줍니다.
- **뉴스에 자주 나오는 이유**: 챗GPT 같은 생성형 AI를 돌리려면 방대한 데이터를 한 번에 처리해야 합니다. 그런데 기존 D램은 데이터가 지나가는 통로가 좁아서 병목이 생깁니다. HBM은 이 통로를 크게 넓힌 메모리이고, 엔비디아의 AI 가속기(H100, B200 등)에 꼭 들어갑니다. 그래서 시장의 주목을 받습니다.
- **대장주**: SK하이닉스가 1위입니다. 아래 그래프와 표를 참고하세요. 초기 HBM3 시장에서는 SK하이닉스가 엔비디아에 사실상 혼자 공급하며 주도권을 잡았습니다.
- **과점 이유**: 만들기가 어렵고, 엔비디아가 정한 품질 시험(퀄테스트)을 통과해야 납품할 수 있습니다. 이 두 관문을 넘은 회사가 3곳뿐입니다.
- **어려운 지점**: D램 칩을 8단, 12단, 16단으로 아파트처럼 쌓습니다. 그리고 칩에 아주 작은 구멍을 수만 개 뚫어서 위아래를 전기로 연결합니다(TSV). 얇게 깎은 칩을 열과 압력으로 휘지 않게 붙여야 하고(TC 본딩, MR-MUF 등), 열도 잘 빼내야 합니다. 그래서 일반 D램보다 공정 난도가 매우 높고 수율이 낮습니다.
- **가격과 이익률**: 일반 D램보다 가격이 3~5배 이상 비싸고, 이익률도 높습니다.
- **탑재량**: AI 가속기 1개에 보통 HBM이 4개에서 8개 들어갑니다. 예를 들어 엔비디아 H100에는 HBM3가 5개에서 6개, 최신 B200에는 HBM3E가 8개 들어갑니다.
- **삼성 점유율이 오른 이유**: 삼성전자가 HBM3E 8단과 12단 제품으로 엔비디아의 퀄테스트를 통과했습니다. 여기에 넉넉한 생산 능력(캐파)을 가동하면서 점유율을 빠르게 회복하고 있습니다.
- **미래기술과 선두**: 지금은 HBM3E가 중심이고 HBM4로 넘어가는 중입니다. HBM4는 스택 하나가 1초에 옮기는 데이터가 2.0 TB 이상으로 늘어납니다. 또 HBM4부터는 맨 아래 **베이스 다이**를 TSMC 같은 파운드리가 만듭니다. 그래서 메모리 회사와 파운드리의 협력이 꼭 필요해졌습니다.

<figure style="margin:1.8em 0;padding:14px 12px 10px;background:#f7f4f2;border:1px solid #e4dedb;border-radius:12px">
<svg viewBox="0 0 680 290" style="width:100%;height:auto;display:block;font-family:inherit" role="img" aria-label="HBM 시장 점유율 분기별 추이: SK하이닉스 64%에서 50%, 삼성전자 15%에서 33%, 마이크론 21%에서 18%">
<line x1="60" y1="250.0" x2="485" y2="250.0" stroke="#d9d2ce" stroke-width="1"/>
<text x="50" y="254.0" font-size="12" fill="#6a6361" text-anchor="end" font-weight="400">0%</text>
<line x1="60" y1="187.1" x2="485" y2="187.1" stroke="#d9d2ce" stroke-width="1"/>
<text x="50" y="191.1" font-size="12" fill="#6a6361" text-anchor="end" font-weight="400">20%</text>
<line x1="60" y1="124.3" x2="485" y2="124.3" stroke="#d9d2ce" stroke-width="1"/>
<text x="50" y="128.3" font-size="12" fill="#6a6361" text-anchor="end" font-weight="400">40%</text>
<line x1="60" y1="61.4" x2="485" y2="61.4" stroke="#d9d2ce" stroke-width="1"/>
<text x="50" y="65.4" font-size="12" fill="#6a6361" text-anchor="end" font-weight="400">60%</text>
<text x="60" y="274" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">25년 2Q</text>
<text x="165" y="274" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">25년 3Q</text>
<text x="270" y="274" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">25년 4Q</text>
<text x="375" y="274" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">26년 1Q</text>
<text x="480" y="274" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="400">26년 2Q</text>
<polyline points="60,48.9 165,74.0 270,70.9 375,67.7 480,92.9" fill="none" stroke="#8C1515" stroke-width="2.5"/>
<circle cx="60" cy="48.9" r="4.5" fill="#8C1515"/>
<circle cx="165" cy="74.0" r="4.5" fill="#8C1515"/>
<circle cx="270" cy="70.9" r="4.5" fill="#8C1515"/>
<circle cx="375" cy="67.7" r="4.5" fill="#8C1515"/>
<circle cx="480" cy="92.9" r="4.5" fill="#8C1515"/>
<polyline points="60,202.9 165,177.7 270,180.9 375,184.0 480,146.3" fill="none" stroke="#2b5fa8" stroke-width="2.5"/>
<circle cx="60" cy="202.9" r="4.5" fill="#2b5fa8"/>
<circle cx="165" cy="177.7" r="4.5" fill="#2b5fa8"/>
<circle cx="270" cy="180.9" r="4.5" fill="#2b5fa8"/>
<circle cx="375" cy="184.0" r="4.5" fill="#2b5fa8"/>
<circle cx="480" cy="146.3" r="4.5" fill="#2b5fa8"/>
<polyline points="60,184.0 165,184.0 270,184.0 375,184.0 480,193.4" fill="none" stroke="#6a6361" stroke-width="2.5"/>
<circle cx="60" cy="184.0" r="4.5" fill="#6a6361"/>
<circle cx="165" cy="184.0" r="4.5" fill="#6a6361"/>
<circle cx="270" cy="184.0" r="4.5" fill="#6a6361"/>
<circle cx="375" cy="184.0" r="4.5" fill="#6a6361"/>
<circle cx="480" cy="193.4" r="4.5" fill="#6a6361"/>
<text x="60" y="38.9" font-size="12.5" fill="#8C1515" text-anchor="middle" font-weight="600">64</text>
<text x="60" y="221.9" font-size="12.5" fill="#2b5fa8" text-anchor="middle" font-weight="600">15</text>
<text x="60" y="174.0" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="600">21</text>
<text x="165" y="64.0" font-size="12.5" fill="#8C1515" text-anchor="middle" font-weight="600">56</text>
<text x="165" y="167.7" font-size="12.5" fill="#2b5fa8" text-anchor="middle" font-weight="600">23</text>
<text x="165" y="203.0" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="600">21</text>
<text x="270" y="60.900000000000006" font-size="12.5" fill="#8C1515" text-anchor="middle" font-weight="600">57</text>
<text x="270" y="170.9" font-size="12.5" fill="#2b5fa8" text-anchor="middle" font-weight="600">22</text>
<text x="270" y="203.0" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="600">21</text>
<text x="375" y="57.7" font-size="12.5" fill="#8C1515" text-anchor="middle" font-weight="600">58</text>
<text x="375" y="174.0" font-size="12.5" fill="#2b5fa8" text-anchor="middle" font-weight="600">21</text>
<text x="375" y="203.0" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="600">21</text>
<text x="480" y="82.9" font-size="12.5" fill="#8C1515" text-anchor="middle" font-weight="600">50</text>
<text x="480" y="136.3" font-size="12.5" fill="#2b5fa8" text-anchor="middle" font-weight="600">33</text>
<text x="480" y="183.4" font-size="12.5" fill="#6a6361" text-anchor="middle" font-weight="600">18</text>
<text x="497" y="97.9" font-size="13.5" fill="#8C1515" text-anchor="start" font-weight="700">SK하이닉스 50%</text>
<text x="497" y="151.3" font-size="13.5" fill="#2b5fa8" text-anchor="start" font-weight="700">삼성전자 33%</text>
<text x="497" y="198.4" font-size="13.5" fill="#6a6361" text-anchor="start" font-weight="700">마이크론 18%</text>
</svg>
<figcaption style="margin-top:8px;font-size:.85rem;color:#6a6361;text-align:center">HBM 시장 점유율 추이 (분기별, %). SK하이닉스는 내려오고 삼성전자는 올라오는 흐름입니다.</figcaption>
</figure>

| 업체 | 2025년 2Q | 2025년 3Q | 2025년 4Q | 2026년 1Q | 2026년 2Q |
|------|-----------|-----------|-----------|-----------|-----------|
| SK하이닉스 | 64% | 56% | 57% | 58% | 50% |
| 삼성전자 | 15% | 23% | 22% | 21% | 33% |
| 마이크론 | 21% | 21% | 21% | 21% | 18% |

<!-- 참고: 2026년 2Q는 합이 101%입니다(반올림 차이로 보임). -->

표를 보면 SK하이닉스는 64%에서 50%로 내려왔고, 삼성전자는 15%에서 33%로 올라왔습니다. 마이크론은 21% 안팎에서 18%로 조금 내려왔습니다. 1위는 그대로지만 격차가 줄고 있고, 그 이유는 위의 "삼성 점유율이 오른 이유"에 있습니다.

> [분기를 바꿔 가며 점유율 움직임 보기 →](terms.html#hbm)

### 첨단 패키징

- **역할**: GPU와 HBM 같은 여러 칩을 한 판 위에 붙여서 하나의 가속기로 만듭니다.
- **대장주**: TSMC의 **CoWoS(Chip-on-Wafer-on-Substrate)**
- **과점 이유**: GPU와 HBM을 기판 위에 정밀하게 이어 붙이는 기술이 TSMC에 몰려 있습니다. 엔비디아 칩이 모자랐던 큰 이유 중 하나가 TSMC의 CoWoS 생산 능력 부족이었습니다. 이 공급이 AI 가속기 전체 공급량의 **병목**이었습니다.
- **인터포저 공급사**: 칩들을 올려놓는 중간 기판인 '실리콘 인터포저'는 주로 TSMC가 직접 만듭니다. 수요가 크게 늘면서 UMC 같은 다른 파운드리도 공급에 합류하고 있습니다.
- **어려운 지점**: 2.5D는 인터포저 위에 칩을 정확히 올려야 하고, 3D는 TSV로 칩을 뚫어서 이어야 합니다.
- **미래기술과 선두**: **하이브리드 본딩**입니다. 칩을 이을 때 작은 돌기(범프) 없이 구리와 구리를 바로 붙여서, 데이터가 지나는 통로를 크게 늘립니다. 장비 시장은 네덜란드의 베시(Besi)와 어플라이드 머티어리얼즈(AMAT)가 앞서 있습니다. ASML도 이 장비를 개발 중이라는 보도가 있습니다.

### EUV 노광 장비

- **역할**: 극자외선 빛으로 칩에 아주 가는 회로를 새깁니다. 8대 공정의 3단계(포토)에 쓰입니다.
- **대장주**: 네덜란드의 ASML. 7나노 이하 미세공정에 꼭 필요한 EUV 장비를 전 세계에서 유일하게 만듭니다.
- **과점 이유**: 대신할 수 있는 회사가 없습니다. 그래서 반도체 회사들이 장비를 사려고 줄을 서는 상황입니다.
- **어려운 지점**: (왜 이 장비를 다른 회사가 못 만드는지는 조사 필요)
- **미래기술과 선두**: **High-NA EUV**는 렌즈의 해상력을 높여서 더 미세한 회로를 그리는 차세대 장비입니다. 이것도 ASML이 독점해서 만듭니다. 인텔이 가장 먼저 도입해서 역전을 노리고 있고, TSMC는 도입 시점을 아직 정하지 않았습니다. 삼성전자도 신중한 편이라는 평가입니다.

<!-- TODO(확인): High-NA 도입 현황(특히 삼성)은 발행 전에 한 번 더 확인 -->

### 공정 장비 (증착, 식각, 검사)

- **역할**: 웨이퍼에 얇은 막을 입히고, 필요 없는 부분을 깎고, 불량을 찾는 기계들입니다.
- **대장주**: 공정마다 1위 회사가 다릅니다.

| 공정 | 하는 일 | 1위 기업 |
|------|---------|----------|
| 증착 | 가스 반응으로 웨이퍼에 얇은 막을 입힘 | 어플라이드 머티어리얼즈 (AMAT, 미국) |
| 식각 | 필요 없는 부분을 깎아 냄 (특히 3D 낸드) | 램리서치 (미국) |
| 검사·계측 | 아주 작은 결함을 찾아냄 | KLA (미국) |
| 트랙·코팅 | 웨이퍼에 감광액을 바르고 현상함 | 도쿄일렉트론 (TEL, 일본) |

- **한국의 대표 장비사**: HBM 공정에서 칩을 열과 압력으로 붙이는 'TC 본더' 세계 1위 **한미반도체**, 고압 수소 어닐링 장비를 독점하는 **HPSP**, 증착 장비의 **주성엔지니어링**과 **유진테크**, 식각·세정 장비의 **세메스(삼성 자회사)** 등이 있습니다.
- **과점 이유**: (조사 필요)
- **어려운 지점**: (조사 필요)

### 패키지 기판

- **역할**: 칩 전체를 받치고, 칩과 바깥을 전기로 이어 줍니다.
- **대장주**: (조사 필요)
- **과점 이유**: (조사 필요)
- **어려운 지점**: 기존 플라스틱 기판은 열에 휘는 문제가 있습니다.
- **미래기술과 선두**: **유리 기판**입니다. 표면이 매끄럽고 신호가 빨라서 대안으로 연구되고 있습니다. 인텔이 앞서 있다는 평가이고, 한국에서는 SKC의 자회사 **앱솔릭스**가 상용화를 서두르고 있습니다.

<!-- TODO(확인): 유리 기판 선두와 상용화 시점은 최근 상황으로 확인 -->



## 3. 병목과 가격 결정력: 이익은 어디에 모이는가

공급이 모자라서 다른 곳으로 바꿀 수 없는 곳을 **병목**이라고 합니다. 병목에 있는 회사는 가격을 스스로 정할 수 있습니다. 그래서 이익도 그곳에 모입니다.

| 단계 | 대표 기업 | 영업이익률 | 왜 높은가 |
|------|-----------|-----------|-----------|
| 설계와 생태계 | 엔비디아 | 60% 넘음 | 설계와 CUDA 소프트웨어에 묶인 고객이 쉽게 못 떠남 |
| 핵심 부품(HBM) | SK하이닉스 | 2026년 70%대 | HBM을 먼저 차지함. 일반 D램은 10~20%대 |
| 첨단 제조 | TSMC | 2026년 2분기 60.3% | 최신 공정과 첨단 패키징을 사실상 독점 |
| 독점 장비 | ASML | 30%대 | 대신할 수 없는 노광 장비 |

<!-- TODO(출처): 영업이익률은 지표입니다. TSMC 60.3%는 TSMC 2026년 2분기 실적 발표(https://pr.tsmc.com/english/news/3326) 기준입니다. 엔비디아, SK하이닉스, ASML 수치는 기준 분기를 확인해서 출처를 붙이세요. -->

결과적으로 반도체의 돈은 스마트폰·PC용 일반 칩에서 AI 연산 생태계로 크게 옮겨 갔습니다. 그 중심에 **엔비디아 → TSMC → HBM → ASML**이 있습니다. 다만 회사마다 사업 범위와 계산 방식이 달라서, 이익률을 단순히 줄 세워 비교하는 것은 조심해야 합니다.



## 4. 미래기술 로드맵: 무엇이 구조를 바꿀 수 있는가

| 기술 | 해결하려는 문제 | 선두 기업 | 상용화 시점 |
|------|----------------|-----------|-------------|
| HBM4 이후 | 데이터 통로를 더 넓힘. 베이스 다이를 파운드리가 만들어 메모리와 파운드리가 협력 | SK하이닉스, 삼성전자, 마이크론 (파운드리는 TSMC 등) | 2026년 전환 시작 |
| 2나노 공정 (GAA, BSPDN) | 더 작고 전력을 적게 쓰는 칩 | TSMC가 가장 앞섬. 삼성(GAA), 인텔(BSPDN)이 추격 | 2025~2026년 양산 시작 |
| 하이브리드 본딩 | 범프 없이 구리끼리 직접 연결해 통로를 넓힘 | 베시(Besi), AMAT (장비) | (조사 필요) |
| 유리 기판 | 기판이 휘는 문제를 줄이고 신호를 빠르게 함 | 인텔, 앱솔릭스(SKC) | (조사 필요) |
| 광 연결 (CPO) | 구리선 대신 빛으로 데이터를 보내 전력과 지연을 줄임 | 브로드컴, TSMC, 인텔 | (조사 필요) |
| High-NA EUV | 더 미세한 회로를 새김 | ASML (장비), 도입은 인텔이 가장 빠름 | 인텔은 14A 공정부터 도입 계획 |



## Risks: 이 구조 분석이 틀릴 수 있는 이유는?

- **AI 투자가 줄어들 수 있습니다.** 이 구조 전체가 AI 가속기 수요 위에 서 있습니다.
- **엔비디아의 힘이 약해질 수 있습니다.** 빅테크의 자체 칩(ASIC)이 늘면 CUDA의 장벽도 낮아질 수 있습니다.
- **HBM 점유율과 가격이 바뀔 수 있습니다.** 삼성전자의 추격으로 SK하이닉스의 점유율이 이미 내려오고 있습니다.
- **한 곳에 몰려 있는 위험이 있습니다.** 선단 공정과 첨단 패키징이 TSMC에 몰려 있어서, 이 회사에 문제가 생기면 공급 전체가 흔들립니다.
- **새 기술이 순위를 바꿀 수 있습니다.** 하이브리드 본딩, 유리 기판, 광 연결이 자리를 잡으면 지금의 강자가 바뀔 수 있습니다.
- **수치의 기준 시점이 서로 다릅니다.** 점유율과 이익률은 분기마다 바뀌므로 발행 시점에 다시 확인해야 합니다.



## Conclusion: 어디를 더 깊이 볼 것인가?

AI 가속기에서 돈이 모이는 곳은 대신할 수 없는 병목입니다. 설계와 CUDA(엔비디아), 최신 공정과 패키징(TSMC), HBM(SK하이닉스, 삼성전자), 노광 장비(ASML)가 그 자리입니다.

다음 글에서 더 깊이 볼 후보는 세 가지입니다.

1. **HBM**: SK하이닉스와 삼성전자의 점유율 변화와 HBM4 경쟁
2. **첨단 패키징과 장비**: CoWoS 병목, 하이브리드 본딩, 한미반도체 같은 장비사
3. **파운드리 2나노 경쟁**: TSMC, 삼성전자, 인텔의 격차



## 부록. 게임용 그래픽카드 용어와 세대

<!-- 이 글의 주제(AI 가속기)에서 조금 벗어난 내용입니다. 필요 없으면 지우거나 별도 글로 분리하세요. -->

**GPU 안의 주요 장치**: 래스터라이저, 셰이더 코어, 픽셀 처리 유닛, 텐서 코어, RT 코어(빛의 경로 계산)

| 용어 | 뜻 |
|------|----|
| 레이 트레이싱 | 가상 공간에서 빛의 움직임을 실시간으로 계산해 그리는 기술 |
| DLSS | AI로 낮은 해상도 화면을 높은 해상도로 키우는 기술 |
| AV1 | 차세대 고효율 영상 압축 방식 |

| 회사 | 시리즈 | 특징 |
|------|--------|------|
| 엔비디아 (지포스) | GTX 10 (Pascal) | 2016~2018년 인기. 지금은 FHD 게임 정도에 적합 |
| | RTX 20 (Turing) | 실시간 레이 트레이싱을 처음 지원, DLSS 1.0 |
| | RTX 30 (Ampere) | 성능과 전력 효율이 크게 오름, DLSS 2.0 |
| | RTX 40 (Ada Lovelace) | DLSS 3.0, AI 가속 성능 향상 |
| | RTX 50 (Blackwell, 2025~) | DLSS 4, 차세대 AI 연산에 특화 |
| AMD (라데온) | RX 5000 (RDNA1) | FHD/QHD 게임에 적합, 레이 트레이싱 없음 |
| | RX 6000 (RDNA2) | 레이 트레이싱 지원 추가 |
| | RX 7000 (RDNA3) | AI와 레이 트레이싱 성능 향상 |
