# Investment Log

주식, 부동산, 거시경제를 데이터와 논리로 분석하고 기록하는 개인 투자 리서치 사이트입니다.

- `index.html`: 정적 단일 페이지 사이트

## 폴더 구조

```
index.html, list.html, post.html   # 페이지 (홈 / 목록 / 글 보기)
assets/                            # CSS, 파비콘
posts/
  note/_stock_template.md          # Note 템플릿 - 종목 분석 (Question → Conclusion)
  note/_industry_template.md       # Note 템플릿 - 산업 구조 (부품별 카드)
  note/_market_template.md         # Note 템플릿 - 시장 분석 (정책/금리: 사건 → 배경 → 전망)
  method/_template.md              # Method 템플릿 (논문 기반, 수식 포함)
  index.json                       # 자동 생성 (직접 수정 X)
tools/build_posts.py               # index.json 생성 스크립트
```

## 글 올리기

1. `posts/note/`(`_stock_template.md` / `_industry_template.md` / `_market_template.md`) 또는 `posts/method/`(`_template.md`)의 템플릿을 복사해 `_` 없는 이름으로 저장 (예: `posts/method/fama-french-3.md`)
2. 아래 세 줄을 실행합니다. 커밋할 때 `posts/index.json`이 자동으로 갱신되어 함께 올라가고, 1분쯤 뒤 사이트에 반영됩니다.

```bash
git add .
git commit -m "add post"
git push
```

새로 클론한 PC에서는 처음 한 번 `git config core.hooksPath tools/hooks`를 실행하세요. (이 설정이 없어도 GitHub Actions가 `posts/index.json`을 대신 갱신합니다.)

Method 글에서는 수식을 `$...$`(문장 속), `$$...$$`(별행)로 쓸 수 있습니다. 달러 금액은 `\$`로 씁니다.

로컬에서 확인할 때는 `python tools/build_posts.py` 실행 후 `python -m http.server`로 여세요.

글 맨 위의 `keywords: 반도체, 가치평가`처럼 쉼표로 키워드를 적으면, Note/Method 목록 페이지의 제목 아래에 키워드 버튼이 생기고 누르면 해당 키워드의 글만 모아 볼 수 있습니다.

## 시뮬레이션

`simulation.html`은 기업·은행·투자자·국가를 연결된 시스템으로 보고 외부 충격의 파급을 턴제 게임으로 보여줍니다. 수식·파라미터는 `assets/sim-model.js`만 수정하면 되고, 화면 코드는 `assets/sim.js`입니다. 관심사 소개는 `interests.md`를 수정하세요.
