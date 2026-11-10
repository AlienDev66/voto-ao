/**
 * Fetch official portrait URLs from PollsAfrica / parlamento.ao.
 * Usage: node scripts/fetch-deputy-photos.mjs
 * Writes data/seed/deputy-photos.json and merges into deputies.ts / DB on next seed.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const { deputies } = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/seed/deputies.generated.json"), "utf8"),
);

function slugifyPolls(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchPhoto(fullName) {
  const slug = slugifyPolls(fullName);
  const url = `https://pollsafrica.com/countries/angola/members/${slug}`;
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        accept: "text/html",
      },
    });
    if (!res.ok) return { fullName, photoUrl: null, status: res.status, slug };
    const html = await res.text();
    const og = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);
    const parl = html.match(/https:\/\/(?:www\.)?parlamento\.ao\/[^"'\\\s>]+\.(?:png|jpe?g|webp)/i);
    const photoUrl = og?.[1] || parl?.[0] || null;
    return { fullName, photoUrl, source: photoUrl?.includes("parlamento") ? "parlamento.ao" : "pollsafrica", slug };
  } catch (e) {
    return { fullName, photoUrl: null, error: String(e), slug };
  }
}

const photos = [];
const missing = [];
const concurrency = 6;
let i = 0;
async function worker() {
  while (i < deputies.length) {
    const idx = i++;
    const d = deputies[idx];
    const result = await fetchPhoto(d.fullName);
    if (result.photoUrl) photos.push(result);
    else missing.push(d.fullName);
    if ((idx + 1) % 20 === 0 || idx === deputies.length - 1) {
      console.log(`progress ${idx + 1}/${deputies.length} found=${photos.length} missing=${missing.length}`);
    }
    await new Promise((r) => setTimeout(r, 120));
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

const out = { fetchedAt: new Date().toISOString(), photos, missing };
fs.writeFileSync(path.join(ROOT, "data/seed/deputy-photos.json"), JSON.stringify(out, null, 2));
console.log("wrote data/seed/deputy-photos.json", { found: photos.length, missing: missing.length });
