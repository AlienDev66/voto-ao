#!/usr/bin/env node
/**
 * Pipeline completo: crawl → fetch → parse → publish
 * Também regista IngestRun.
 *
 *   pnpm ingest
 *   pnpm ingest -- --skip-crawl --skip-fetch
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

function runNode(script) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, script)], {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited ${code}`));
    });
  });
}

async function main() {
  const skipCrawl = process.argv.includes("--skip-crawl");
  const skipFetch = process.argv.includes("--skip-fetch");
  const skipPublish = process.argv.includes("--skip-publish");

  const run = await prisma.ingestRun.create({ data: {} });
  const stats = { steps: [] };

  try {
    if (!skipCrawl) {
      await runNode("crawl.mjs");
      stats.steps.push("crawl");
    }
    if (!skipFetch) {
      await runNode("fetch.mjs");
      stats.steps.push("fetch");
    }
    await runNode("parse.mjs");
    stats.steps.push("parse");
    if (!skipPublish) {
      await runNode("publish.mjs");
      stats.steps.push("publish");
    }

    const [documents, extractions, published] = await Promise.all([
      prisma.sourceDocument.count(),
      prisma.voteExtraction.count(),
      prisma.voteExtraction.count({ where: { status: "published" } }),
    ]);
    stats.documents = documents;
    stats.extractions = extractions;
    stats.published = published;

    await prisma.ingestRun.update({
      where: { id: run.id },
      data: {
        finishedAt: new Date(),
        ok: true,
        statsJson: JSON.stringify(stats),
      },
    });
    console.log("Ingest run OK", stats);
  } catch (e) {
    await prisma.ingestRun.update({
      where: { id: run.id },
      data: {
        finishedAt: new Date(),
        ok: false,
        error: e.message,
        statsJson: JSON.stringify(stats),
      },
    });
    throw e;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
