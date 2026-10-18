"""posts/*.md 의 frontmatter를 읽어 posts/index.json(최신순)을 생성한다."""
import json
import re
from pathlib import Path

POSTS = Path(__file__).resolve().parent.parent / "posts"


def parse(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            k, sep, v = line.partition(":")
            if sep:
                meta[k.strip()] = v.strip().strip("\"'")
    return {
        "slug": path.stem,
        "title": meta.get("title", path.stem),
        "date": meta.get("date", "1970-01-01"),
        "type": meta.get("type", "note"),
        "tag": meta.get("tag", ""),
        "summary": meta.get("summary", ""),
    }


posts = sorted((parse(p) for p in POSTS.glob("*.md") if not p.name.startswith("_")), key=lambda p: p["date"], reverse=True)
(POSTS / "index.json").write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"{len(posts)} posts")
