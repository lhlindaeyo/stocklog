# Investment Log

주식, 부동산, 거시경제를 데이터와 논리로 분석하고 기록하는 개인 투자 리서치 사이트입니다.

- `index.html`: 정적 단일 페이지 사이트

## 폴더 구조

```
index.html, list.html, post.html   # 페이지 (홈 / 목록 / 글 보기)
assets/                            # CSS, 파비콘
posts/
  note/_template.md                # Note 템플릿 (Question → Conclusion)
  method/_template.md              # Method 템플릿 (논문 기반, 수식 포함)
  index.json                       # 자동 생성 (직접 수정 X)
tools/build_posts.py               # index.json 생성 스크립트
```

## 글 올리기

1. `posts/note/` 또는 `posts/method/`의 `_template.md`를 복사해 `_` 없는 이름으로 저장 (예: `posts/method/fama-french-3.md`)
2. 내용 작성 후 `git push` — GitHub Actions가 `posts/index.json`을 자동 갱신합니다.

Method 글에서는 수식을 `$...$`(문장 속), `$$...$$`(별행)로 쓸 수 있습니다. 달러 금액은 `\$`로 씁니다.

로컬에서 확인할 때는 `python tools/build_posts.py` 실행 후 `python -m http.server`로 여세요.

글 맨 위의 `keywords: 반도체, 가치평가`처럼 쉼표로 키워드를 적으면, Note/Method 목록 페이지의 제목 아래에 키워드 버튼이 생기고 누르면 해당 키워드의 글만 모아 볼 수 있습니다.
