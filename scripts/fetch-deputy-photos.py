#!/usr/bin/env python3
import json
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
slugs = json.loads((ROOT / "public/tmp-slugs.json").read_text())
UA = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}
PHOTO_RE = re.compile(
    r"https://www\.parlamento\.ao/[^\s\"'<>]+\.(?:png|jpe?g|webp)",
    re.I,
)

photos = []
missing = []


def one(d):
    url = f"https://pollsafrica.com/countries/angola/members/{d['slug']}"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            html = r.read().decode("utf-8", "ignore")
        m = PHOTO_RE.search(html)
        if m:
            return (
                "ok",
                {
                    "fullName": d["fullName"],
                    "photoUrl": m.group(0),
                    "source": "parlamento.ao",
                    "slug": d["slug"],
                },
            )
        return ("miss", d["fullName"])
    except Exception as e:
        return ("miss", f"{d['fullName']} ({e})")


def main():
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = [ex.submit(one, d) for d in slugs]
        done = 0
        for fut in as_completed(futs):
            kind, payload = fut.result()
            if kind == "ok":
                photos.append(payload)
            else:
                missing.append(payload)
            done += 1
            if done % 20 == 0 or done == len(slugs):
                print(f"progress {done}/{len(slugs)} found={len(photos)} missing={len(missing)}")
            time.sleep(0.02)

    out = {
        "fetchedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "photos": photos,
        "missing": missing,
    }
    path = ROOT / "data/seed/deputy-photos.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2))
    print("wrote", path, "found", len(photos), "missing", len(missing))


if __name__ == "__main__":
    main()
