import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const ALLOWED = new Set([
  "portaladmin.parlamento.ao",
  "www.parlamento.ao",
  "parlamento.ao",
]);

const memo = new Map<string, Buffer>();
const MEMO_MAX = 400;

/** Resize-only proxy. Keeps original studio backgrounds intact. */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  const size = Math.min(320, Math.max(48, Number(req.nextUrl.searchParams.get("size") || 160)));

  if (!raw) {
    return NextResponse.json({ error: "missing url" }, { status: 400 });
  }

  const cacheKey = `${raw}|${size}|plain`;
  const cached = memo.get(cacheKey);
  if (cached) {
    return new NextResponse(new Uint8Array(cached), {
      status: 200,
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=1209600, immutable",
        "access-control-allow-origin": "*",
        "x-photo-cache": "hit",
      },
    });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (!ALLOWED.has(target.hostname)) {
    return NextResponse.json({ error: "host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        referer: "https://parlamento.ao/",
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      next: { revalidate: 60 * 60 * 24 * 14 },
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "upstream failed" }, { status: upstream.status });
    }

    const input = Buffer.from(await upstream.arrayBuffer());
    const jpeg = await sharp(input)
      .rotate()
      .resize(size, size, { fit: "cover", position: "top" })
      .jpeg({ quality: 82 })
      .toBuffer();

    if (memo.size >= MEMO_MAX) {
      const first = memo.keys().next().value;
      if (first) memo.delete(first);
    }
    memo.set(cacheKey, jpeg);

    return new NextResponse(new Uint8Array(jpeg), {
      status: 200,
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=1209600, immutable",
        "access-control-allow-origin": "*",
        "x-photo-cache": "miss",
      },
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
