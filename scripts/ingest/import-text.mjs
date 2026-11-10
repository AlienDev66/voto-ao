#!/usr/bin/env node
/**
 * Importa ficheiros de texto já capturados (ex.: via browser) para SourceDocument.
 *
 * Formato esperado em data/archive/text/*.json:
 *   { "url": "...", "title": "...", "kind": "noticia", "text": "..." }
 *
 * Ou .txt com sidecar .meta.json
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { ARCHIVE, ensureDirs, guessKind, sha256, slugify } from "./lib.mjs";

const prisma = new PrismaClient();

async function main() {
  ensureDirs();
  const dir = path.join(ARCHIVE, "text");
  fs.mkdirSync(dir, { recursive: true });
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  let n = 0;

  for (const file of files) {
    if (file.endsWith(".meta.json")) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    if (!raw.url || !raw.text) {
      console.warn(`SKIP ${file}: falta url/text`);
      continue;
    }
    const kind = raw.kind || guessKind(raw.url, raw.title || "");
    const hash = sha256(Buffer.from(raw.text));
    const localPath = path.join("text", file);
    await prisma.sourceDocument.upsert({
      where: { url: raw.url },
      create: {
        url: raw.url,
        title: raw.title || slugify(file),
        kind,
        fetchedAt: new Date(),
        contentHash: hash,
        localPath,
        mimeType: "text/plain",
        textExtract: String(raw.text).slice(0, 200_000),
        status: "fetched",
      },
      update: {
        title: raw.title || slugify(file),
        kind,
        fetchedAt: new Date(),
        contentHash: hash,
        localPath,
        mimeType: "text/plain",
        textExtract: String(raw.text).slice(0, 200_000),
        status: "fetched",
        parseError: null,
      },
    });
    n++;
    console.log(`IMPORT ${raw.url}`);
  }
  console.log(`Imported ${n} text sources`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
