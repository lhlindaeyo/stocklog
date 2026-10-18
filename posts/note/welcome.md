---
title: Investment Log를 시작합니다
date: 2026-10-18
keywords: 가이드
summary: 이 사이트에 글을 올리는 방법과 첫 기록.
---

## 글 올리는 법

글의 종류에 따라 폴더가 나뉩니다.

| 폴더 | 내용 | 사이트 위치 |
|------|------|-------------|
| `posts/note/` | 종목·자산 분석 기록 | Note |
| `posts/method/` | 분석 방법론 (논문 기반, 수식 포함) | Method |

1. 해당 폴더의 `_template.md`를 복사해서 `_`가 없는 이름으로 저장합니다. (예: `posts/note/samsung-2026q3.md`)
2. 내용을 채우고 `git push` 합니다.

파일명이 `_`로 시작하는 파일은 목록에 나오지 않습니다.

파일 맨 위에는 아래 정보를 적습니다. `keywords`는 쉼표로 구분하며, 목록 페이지에서 같은 키워드끼리 묶여 보입니다.

```
---
title: 글 제목
date: 2026-10-18
keywords: 반도체, 가치평가
summary: 목록에 보일 한 줄 요약
---
```

> 본문은 일반 Markdown 문법(제목, 목록, 표, 코드, 이미지)을 쓸 수 있고, Method 글에서는 수식도 쓸 수 있습니다.

수식 예시: 샤프 비율은 $S = \dfrac{E[R_p - R_f]}{\sigma_p}$ 입니다.

$$R_{i,t} - R_{f,t} = \alpha_i + \beta_i (R_{m,t} - R_{f,t}) + \varepsilon_{i,t}$$
