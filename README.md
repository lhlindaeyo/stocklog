# Investment Log

주식, 부동산, 거시경제를 데이터와 논리로 분석하고 기록하는 개인 투자 리서치 사이트입니다.

- `index.html`: 정적 단일 페이지 사이트

## 글 올리기

1. `posts/` 폴더에 `.md` 파일 추가 (맨 위에 `title`, `date`, `tag`, `summary` 작성 — `posts/welcome.md` 참고)
2. `git push` — GitHub Actions가 `posts/index.json`을 자동 갱신합니다.

로컬에서 확인할 때는 `python tools/build_posts.py` 실행 후 `python -m http.server`로 여세요.
