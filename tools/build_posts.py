"""posts/note/*.md, posts/method/*.md 의 frontmatter를 읽어 posts/index.json(최신순)을 생성한다."""
import json
import re
from pathlib import Path

POSTS = Path(__file__).resolve().parent.parent / "posts"
TYPES = ("note", "method")


def parse(path, type_):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            k, sep, v = line.partition(":")
            if sep:
                meta[k.strip()] = v.strip().strip("\"'")
    for need in ("title", "date"):
        if need not in meta:
            print(f"경고: {path.relative_to(POSTS.parent)} 에 {need} 가 없습니다")
    return {
        "slug": f"{type_}/{path.stem}",
        "title": meta.get("title", path.stem),
        "date": meta.get("date", "1970-01-01"),
        "type": type_,
        "category": meta.get("category", ""),
        "keywords": [k.strip() for k in meta.get("keywords", "").split(",") if k.strip()],
        "summary": meta.get("summary", ""),
    }


posts = [
    parse(p, t)
    for t in TYPES
    for p in (POSTS / t).glob("*.md")
    if not p.name.startswith("_")
]
posts.sort(key=lambda p: p["date"], reverse=True)
(POSTS / "index.json").write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"{len(posts)} posts")
