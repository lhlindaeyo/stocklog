---
title: Investment Log를 시작합니다
date: 2026-10-18
type: note
tag: guide
summary: 이 사이트에 글을 올리는 방법과 첫 기록.
---

## 글 올리는 법

`posts/` 폴더에 `.md` 파일을 추가하고 push하면 목록에 자동으로 나타납니다.

파일 맨 위에 아래 형식의 정보를 적어주세요.

```
---
title: 글 제목
date: 2026-10-18
type: note
tag: equity
summary: 목록에 보일 한 줄 요약
---
```

`type`은 `note` 또는 `method`이며, 각각 Note·Method 섹션에 표시됩니다. `posts/_template-note.md`(Note용)와 `posts/_template-method.md`(Method용)를 복사해서 쓰면 됩니다. 파일명이 `_`로 시작하는 파일은 목록에 나오지 않습니다.

> 본문은 일반 Markdown 문법(제목, 목록, 표, 코드, 이미지)을 그대로 쓸 수 있습니다.
