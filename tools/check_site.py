#!/usr/bin/env python3
"""Check static HTML/CSS local file targets using only the standard library."""

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


CSS_URL = re.compile(r"url\(\s*(?:\"([^\"]*)\"|'([^']*)'|([^\s)]+))\s*\)", re.IGNORECASE)


class References(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if not value:
                continue
            if name in {"href", "src", "poster"} or (tag == "object" and name == "data"):
                self.items.append(value)
            elif name == "srcset" and not value.lstrip().startswith("data:"):
                self.items.extend(item.strip().split()[0] for item in value.split(",") if item.strip())

    handle_startendtag = handle_starttag


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1] / "public")
    args = parser.parse_args()
    root = args.root.resolve()
    if not root.is_dir():
        parser.error(f"Website directory not found: {root}")

    files = sorted(path for path in root.rglob("*") if path.is_file())
    errors = []
    checked = 0
    for page in files:
        if page.suffix.lower() not in {".html", ".css"}:
            continue
        text = page.read_text(encoding="utf-8")
        refs = [next(value for value in match.groups() if value is not None)
                for match in CSS_URL.finditer(text)]
        if page.suffix.lower() == ".html":
            document = References()
            document.feed(text)
            refs.extend(document.items)
        for raw in refs:
            raw = raw.strip()
            if not raw or raw.startswith("#"):
                continue
            url = urlsplit(raw)
            if url.scheme or url.netloc or not url.path:
                continue
            path = unquote(url.path)
            target = (root / path.lstrip("/") if path.startswith("/") else page.parent / path).resolve()
            checked += 1
            if not target.is_relative_to(root):
                errors.append({"page": str(page.relative_to(root)), "reference": raw, "reason": "outside public directory"})
                continue
            candidates = [target]
            if not target.suffix:
                candidates.extend([target.with_suffix(".html"), target / "index.html"])
            elif target.is_dir():
                candidates.append(target / "index.html")
            if not any(candidate.is_file() for candidate in candidates):
                errors.append({"page": str(page.relative_to(root)), "reference": raw, "reason": "missing local file"})

    print(json.dumps({
        "passed": not errors,
        "files": len(files),
        "html_pages": sum(path.suffix.lower() == ".html" for path in files),
        "local_file_references_checked": checked,
        "scope": "Static HTML/CSS local file targets; excludes fragment IDs, external URLs, and runtime-generated links.",
        "errors": errors,
    }, indent=2, ensure_ascii=False))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
