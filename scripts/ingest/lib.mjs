import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");
export const ARCHIVE = path.join(ROOT, "data/archive");
export const CATALOG = path.join(ROOT, "data/ingest/catalog.json");

export const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export function ensureDirs() {
  fs.mkdirSync(path.join(ARCHIVE, "noticias"), { recursive: true });
  fs.mkdirSync(path.join(ARCHIVE, "pdfs"), { recursive: true });
  fs.mkdirSync(path.join(ARCHIVE, "text"), { recursive: true });
  fs.mkdirSync(path.dirname(CATALOG), { recursive: true });
}

export function slugify(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

export async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": UA,
      accept: "*/*",
      referer: "https://www.parlamento.ao/",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return {
    buf,
    contentType: res.headers.get("content-type") || "application/octet-stream",
    finalUrl: res.url,
  };
}

export async function fetchText(url) {
  const { buf, contentType, finalUrl } = await fetchBuffer(url);
  return { text: buf.toString("utf8"), contentType, finalUrl, buf };
}

export function loadCatalog() {
  if (!fs.existsSync(CATALOG)) return { sources: [] };
  return JSON.parse(fs.readFileSync(CATALOG, "utf8"));
}

export function saveCatalog(catalog) {
  ensureDirs();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));
}

export function guessKind(url, title = "") {
  const u = url.toLowerCase();
  const t = title.toLowerCase();
  if (u.includes("noticia") || u.includes("/noticia")) return "noticia";
  if (u.includes("diario_dan_i") || t.includes("i série") || t.includes("i serie")) return "dan_i";
  if (u.includes("diario_dan_ii") || t.includes("ii série") || t.includes("ii serie")) return "dan_ii";
  if (u.endsWith(".pdf") || u.includes(".pdf")) return "pdf";
  return "pagina";
}

/** Extrai blocos de votação a partir de texto livre (notícias / actas). */
export function extractVotesFromText(text, { url = "", title = "" } = {}) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const out = [];

  const voteRe =
    /(?:com\s+)?(\d{1,3})\s+votos?\s+a\s+favor\s*,?\s*(nenhum(?:\s+voto)?|\d{1,3})\s+contra(?:\s+e\s+((?:nenhuma|uma|um|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|\d+)\s+absten(?:ção|ções)))?/gi;

  let m;
  while ((m = voteRe.exec(normalized))) {
    const start = Math.max(0, m.index - 280);
    const end = Math.min(normalized.length, m.index + m[0].length + 180);
    const snippet = normalized.slice(start, end);
    const votesFor = Number(m[1]);
    const votesAgainst = /nenhum/i.test(m[2]) ? 0 : Number(m[2]);
    const abstentions = m[3] ? parseCountWord(m[3]) : 0;

    const result = inferResult(snippet, votesFor, votesAgainst);
    const extractedTitle = inferTitle(snippet, title) || title || "Votação no Plenário";
    const date = inferDate(snippet) || inferDate(normalized);
    const stage = inferStage(snippet);

    let confidence = 0.55;
    if (votesFor + votesAgainst + abstentions > 0) confidence += 0.15;
    if (result) confidence += 0.1;
    if (date) confidence += 0.1;
    if (/proposta de lei|projecto de lei|código|orçamento|resolução|lei do|relatório/i.test(snippet))
      confidence += 0.1;

    // Ruído típico de actas (aprovação de expediente / "levantem a mão")
    if (/levantem a mão|quem vota contra|requerimento sobre a alteração da ordem/i.test(snippet)) {
      confidence -= 0.35;
    }
    if (!/proposta|projecto|lei|código|orçamento|resolução|relatório|diploma/i.test(extractedTitle + snippet)) {
      confidence -= 0.2;
    }
    confidence = Math.max(0.05, Math.min(0.95, confidence));
    if (confidence < 0.45) continue;

    out.push({
      title: extractedTitle.slice(0, 240),
      plainTitle: simplifyTitle(extractedTitle).slice(0, 160),
      date: date ? date.toISOString() : null,
      stage,
      votesFor,
      votesAgainst,
      abstentions,
      result,
      confidence,
      rawSnippet: snippet.slice(0, 500),
      sourceUrl: url,
    });
  }

  // Fallback: "aprovado/a ... por X votos a favor"
  if (out.length === 0) {
    const alt =
      /aprovad[ao]s?[^.?]{0,120}?(\d{1,3})\s+votos?\s+a\s+favor[^.]{0,80}?(\d{1,3})\s+contra/i.exec(
        normalized,
      );
    if (alt) {
      out.push({
        title: (title || "Votação no Plenário").slice(0, 240),
        plainTitle: simplifyTitle(title || "Votação no Plenário").slice(0, 160),
        date: inferDate(normalized)?.toISOString() ?? null,
        stage: inferStage(normalized),
        votesFor: Number(alt[1]),
        votesAgainst: Number(alt[2]),
        abstentions: 0,
        result: "aprovada",
        confidence: 0.6,
        rawSnippet: alt[0].slice(0, 500),
        sourceUrl: url,
      });
    }
  }

  return dedupeExtractions(out);
}

function parseCountWord(raw) {
  const s = String(raw).toLowerCase();
  if (/nenhum/.test(s)) return 0;
  if (/^uma\b|^um\b/.test(s)) return 1;
  if (/^dois\b|^duas\b/.test(s)) return 2;
  if (/^tr[eê]s\b/.test(s)) return 3;
  if (/^quatro\b/.test(s)) return 4;
  if (/^cinco\b/.test(s)) return 5;
  if (/^seis\b/.test(s)) return 6;
  if (/^sete\b/.test(s)) return 7;
  if (/^oito\b/.test(s)) return 8;
  if (/^nove\b/.test(s)) return 9;
  if (/^dez\b/.test(s)) return 10;
  const n = s.match(/(\d+)/);
  return n ? Number(n[1]) : 0;
}

function inferResult(snippet, votesFor, votesAgainst) {
  if (/rejeit/i.test(snippet)) return "rejeitada";
  if (/aprov/i.test(snippet) || /luz verde|aprovou/i.test(snippet)) return "aprovada";
  if (votesFor > votesAgainst) return "aprovada";
  if (votesAgainst > votesFor) return "rejeitada";
  return null;
}

function inferStage(snippet) {
  if (/votação final global|votacao final global/i.test(snippet)) return "Votação final global";
  if (/na especialidade/i.test(snippet)) return "Especialidade";
  if (/na generalidade/i.test(snippet)) return "Generalidade";
  if (/plenár/i.test(snippet)) return "Plenário";
  return "Plenário";
}

function inferTitle(snippet, fallback) {
  const patterns = [
    /Proposta de Lei[^.]{10,160}/i,
    /Projecto de Lei[^.]{10,160}/i,
    /Código do [^.]{5,120}/i,
    /Orçamento Geral do Estado[^.]{0,80}/i,
    /Relatório[^.]{10,140}/i,
    /Resolução[^.]{10,140}/i,
  ];
  for (const re of patterns) {
    const m = snippet.match(re);
    if (m) return m[0].replace(/\s+/g, " ").trim();
  }
  return fallback || null;
}

function simplifyTitle(title) {
  return title
    .replace(/^Proposta de Lei (do|da|de)\s+/i, "")
    .replace(/^Projecto de Lei (do|da|de)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDate(text) {
  const months = {
    janeiro: 0,
    fevereiro: 1,
    marco: 2,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };
  const m = text.match(
    /(\d{1,2})\s+de\s+(janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s+de\s+(\d{4}))?/i,
  );
  if (!m) {
    const iso = text.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
    if (iso) return new Date(`${iso[1]}-${iso[2]}-${iso[3]}T12:00:00Z`);
    return null;
  }
  const day = Number(m[1]);
  const month = months[m[2].toLowerCase()];
  const year = m[3] ? Number(m[3]) : guessYearNear(text);
  if (month == null || !year) return null;
  return new Date(Date.UTC(year, month, day, 12));
}

function guessYearNear(text) {
  const y = text.match(/\b(20\d{2})\b/);
  return y ? Number(y[1]) : new Date().getUTCFullYear();
}

function dedupeExtractions(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = `${item.votesFor}|${item.votesAgainst}|${item.abstentions}|${slugify(item.title)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export async function extractPdfText(filePathOrUrl) {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse(
    filePathOrUrl.startsWith("http")
      ? { url: filePathOrUrl }
      : { data: new Uint8Array(fs.readFileSync(filePathOrUrl)) },
  );
  try {
    const result = await parser.getText();
    return result.text || "";
  } finally {
    await parser.destroy?.();
  }
}

export function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function discoverLinksFromHtml(html, baseUrl) {
  const links = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const abs = new URL(m[1], baseUrl).toString();
      if (/parlamento\.ao|portaladmin\.parlamento\.ao/i.test(abs)) links.push(abs);
    } catch {
      /* ignore */
    }
  }
  return [...new Set(links)];
}
