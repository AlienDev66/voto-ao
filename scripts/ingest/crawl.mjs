#!/usr/bin/env node
/**
 * Descobre URLs oficiais (notícias + Diários) e actualiza data/ingest/catalog.json
 */
import {
  CATALOG,
  discoverLinksFromHtml,
  fetchText,
  guessKind,
  loadCatalog,
  saveCatalog,
  ensureDirs,
} from "./lib.mjs";

const SEED_PAGES = [
  "https://parlamento.ao/noticia",
  "https://www.parlamento.ao/",
  "https://www.parlamento.ao/DIARIO_DAN_I_SERIE",
  "https://www.parlamento.ao/DIARIO_DAN_II_SERIE",
];

async function main() {
  ensureDirs();
  const catalog = loadCatalog();
  const byUrl = new Map(catalog.sources.map((s) => [s.url, s]));

  const queue = [...SEED_PAGES, ...catalog.sources.map((s) => s.url)];
  const seen = new Set();

  for (const url of queue) {
    if (seen.has(url)) continue;
    seen.add(url);
    if (!/parlamento\.ao/i.test(url)) continue;
    if (/\.pdf($|\?)/i.test(url)) continue;

    try {
      const { text, finalUrl } = await fetchText(url);
      const links = discoverLinksFromHtml(text, finalUrl);
      for (const href of links) {
        if (!/Noticia_\d+|DIARIO_DAN|dropzone.*\.pdf|\.pdf/i.test(href)) continue;
        if (byUrl.has(href)) continue;
        byUrl.set(href, {
          url: href,
          kind: guessKind(href),
          title: null,
          discoveredFrom: url,
          discoveredAt: new Date().toISOString(),
        });
      }
      console.log(`OK ${url} → +links (catálogo: ${byUrl.size})`);
    } catch (e) {
      console.warn(`SKIP ${url}: ${e.message}`);
    }
  }

  // Probe recent Noticia IDs around known high-water mark
  const ids = [...byUrl.keys()]
    .map((u) => Number((u.match(/Noticia_(\d+)/i) || [])[1]))
    .filter(Boolean);
  const maxId = ids.length ? Math.max(...ids) : 72457;
  for (let id = maxId; id >= Math.max(1, maxId - 40); id--) {
    const url = `https://parlamento.ao/Noticia_${id}`;
    if (byUrl.has(url)) continue;
    byUrl.set(url, {
      url,
      kind: "noticia",
      title: null,
      discoveredFrom: "id-probe",
      discoveredAt: new Date().toISOString(),
    });
  }

  const sources = [...byUrl.values()];
  saveCatalog({
    updatedAt: new Date().toISOString(),
    notes: catalog.notes,
    sources,
  });
  console.log(`Catálogo gravado: ${CATALOG} (${sources.length} fontes)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
