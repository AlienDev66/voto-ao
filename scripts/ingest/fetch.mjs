#!/usr/bin/env node
/**
 * Descarrega fontes do catálogo para data/archive e regista SourceDocument na BD.
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  ARCHIVE,
  ensureDirs,
  fetchBuffer,
  guessKind,
  loadCatalog,
  sha256,
  slugify,
  stripHtml,
} from "./lib.mjs";

const prisma = new PrismaClient();

async function main() {
  ensureDirs();
  const catalog = loadCatalog();
  let ok = 0;
  let fail = 0;

  for (const src of catalog.sources) {
    const url = src.url;
    const kind = src.kind || guessKind(url, src.title || "");
    try {
      const { buf, contentType } = await fetchBuffer(url);
      const hash = sha256(buf);
      const isPdf = /pdf/i.test(contentType) || /\.pdf($|\?)/i.test(url);
      const ext = isPdf ? "pdf" : "html";
      const base = slugify(src.title || url.split("/").pop() || hash.slice(0, 12));
      const rel = path.join(isPdf ? "pdfs" : "noticias", `${base}.${ext}`);
      const abs = path.join(ARCHIVE, rel);
      fs.writeFileSync(abs, buf);

      let textExtract = null;
      if (!isPdf) textExtract = stripHtml(buf.toString("utf8")).slice(0, 200_000);

      await prisma.sourceDocument.upsert({
        where: { url },
        create: {
          url,
          title: src.title || base,
          kind,
          fetchedAt: new Date(),
          contentHash: hash,
          localPath: rel,
          mimeType: contentType,
          textExtract,
          status: textExtract ? "fetched" : "fetched",
        },
        update: {
          title: src.title || base,
          kind,
          fetchedAt: new Date(),
          contentHash: hash,
          localPath: rel,
          mimeType: contentType,
          textExtract,
          status: "fetched",
          parseError: null,
        },
      });
      ok++;
      console.log(`OK ${kind} ${url}`);
    } catch (e) {
      fail++;
      await prisma.sourceDocument.upsert({
        where: { url },
        create: {
          url,
          title: src.title || url,
          kind,
          status: "failed",
          parseError: e.message,
        },
        update: {
          status: "failed",
          parseError: e.message,
        },
      });
      console.warn(`FAIL ${url}: ${e.message}`);
    }
  }

  console.log(`Fetch done. ok=${ok} fail=${fail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
