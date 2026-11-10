/**
 * Rebuilds data/seed/deputies.ts from official AN PDFs (extracted .txt).
 * Sources in data/official/:
 *  - deputados-por-partido.txt (25 jun 2026)
 *  - deputados-por-circulo.txt (25 jun 2026)
 *  - mesa.txt (17 nov 2025)
 *  - grupo-mulheres.txt
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OFF = path.join(ROOT, "data/official");

function read(name) {
  return fs.readFileSync(path.join(OFF, name), "utf8");
}

function cleanName(n) {
  return n
    .replace(/\s+/g, " ")
    .replace(/\s+E\s+/g, " e ")
    .replace(/\s+De\s+/g, " de ")
    .replace(/\s+Da\s+/g, " da ")
    .replace(/\s+Do\s+/g, " do ")
    .replace(/\s+Dos\s+/g, " dos ")
    .replace(/\s+Das\s+/g, " das ")
    .trim();
}

function normKey(n) {
  return cleanName(n)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePartyList(text) {
  const parties = { MPLA: [], UNITA: [], PRS: [], FNLA: [], PHA: [] };
  let current = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (/^MPLA$/.test(line)) {
      current = "MPLA";
      continue;
    }
    if (/^UNITA$/.test(line)) {
      current = "UNITA";
      continue;
    }
    if (/^PRS$/.test(line)) {
      current = "PRS";
      continue;
    }
    if (/^FNLA$/.test(line)) {
      current = "FNLA";
      continue;
    }
    if (/^PHA$/.test(line) || /^PARTIDO HUMANISTA/i.test(line)) {
      current = "PHA";
      continue;
    }
    const m = line.match(/^\d+\.\s+(.+)$/);
    if (m && current) parties[current].push(cleanName(m[1]));
  }
  return parties;
}

function parseCircles(text) {
  /** @type {Map<string, string>} */
  const map = new Map();
  let circle = null;
  let mode = null; // nacional | provincial

  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nat = line.match(/^N\.º\s+CÍRCULO NACIONAL\s*\((MPLA|UNITA|PRS|FNLA)\)$/i);
    if (nat) {
      circle = "Nacional";
      mode = "nacional";
      continue;
    }
    if (/^PARTIDO HUMANISTA DE ANGOLA/i.test(line) || /^CÍRCULO NACIONAL \(PHA\)/i.test(line)) {
      circle = "Nacional";
      mode = "nacional";
      continue;
    }
    const provHeader = line.match(/^N\.º\s+(.+?)\s+PARTIDO$/);
    if (provHeader) {
      circle = cleanName(provHeader[1]).replace(/-/g, "-");
      // normalize circle names
      circle = circle
        .replace(/^Cuanza Norte$/i, "Cuanza-Norte")
        .replace(/^Cuanza Sul$/i, "Cuanza-Sul")
        .replace(/^Lunda Norte$/i, "Lunda-Norte")
        .replace(/^Lunda- Norte$/i, "Lunda-Norte")
        .replace(/^Lunda Sul$/i, "Lunda-Sul");
      mode = "provincial";
      continue;
    }
    // bare provincial headers like "N.º Benguela PARTIDO" already handled
    const bareProv = line.match(/^N\.º\s+([A-Za-zÀ-ú\- ]+)$/);
    if (bareProv && !/CÍRCULO/i.test(line) && lines[i + 1]?.includes("PARTIDO") === false) {
      // skip
    }

    const m = line.match(/^\d+\.\s+(.+?)(?:\s+(MPLA|UNITA|PRS|FNLA|PHA))?$/);
    if (m && circle) {
      let name = cleanName(m[1]);
      // multi-line names: if next line has no number and isn't a header, append
      const next = lines[i + 1]?.trim() ?? "";
      if (
        next &&
        !/^\d+\./.test(next) &&
        !/^N\.º/.test(next) &&
        !/^CÍRCULO/.test(next) &&
        !/^PARTIDO/.test(next) &&
        !/^--/.test(next) &&
        !/^(MPLA|UNITA|PRS|FNLA|PHA)$/.test(next) &&
        next.length < 80
      ) {
        // could be continuation OR party alone
        if (!/^(MPLA|UNITA|PRS|FNLA|PHA)$/.test(next)) {
          name = cleanName(`${name} ${next}`);
        }
      }
      map.set(normKey(name), circle);
      continue;
    }

    // provincial rows: "1. Name PARTY"
    const p = line.match(/^\d+\.\s+(.+?)\s+(MPLA|UNITA|PRS|FNLA|PHA)$/);
    if (p && circle && mode === "provincial") {
      map.set(normKey(p[1]), circle);
    }
  }
  return map;
}

function parseWomen(text) {
  const set = new Set();
  for (const raw of text.split("\n")) {
    const m = raw.trim().match(/^\d+\.\s+(.+?)(?:\s+(MPLA|UNITA|PRS|FNLA|PHA)(?:\s+\S+)*)?$/);
    if (m) set.add(normKey(m[1]));
  }
  return set;
}

const MESA = {
  [normKey("Adão Francisco Correia de Almeida")]: "Presidente da Assembleia Nacional",
  [normKey("Américo António Cuononoca")]: "1.º Vice-Presidente da Assembleia Nacional",
  [normKey("Arlete Leona Chimbinda")]: "2.ª Vice-Presidente da Assembleia Nacional",
  [normKey("Raúl Augusto Lima")]: "3.º Vice-Presidente da Assembleia Nacional",
  [normKey("Justino Feltro da Costa Pinto de Andrade")]:
    "4.º Vice-Presidente da Assembleia Nacional",
  [normKey("Manuel Lopes Moniz Dembo")]: "1.º Secretário da Mesa",
  [normKey("Amélia Judith Ernesto")]: "2.ª Secretária da Mesa",
  [normKey("Rosa Branca da Cunha Cardoso Albino")]: "3.ª Secretária da Mesa",
  [normKey("Ernesto da Costa Kassongo")]: "4.º Secretário da Mesa",
};

const partySlug = { MPLA: "mpla", UNITA: "unita", PRS: "prs", FNLA: "fnla", PHA: "pha" };

const parties = parsePartyList(read("deputados-por-partido.txt"));
const circles = parseCircles(read("deputados-por-circulo.txt"));
const women = parseWomen(read("grupo-mulheres.txt"));

/** @type {Array<{fullName:string,partySlug:string,electoralCircle?:string,mesaRole?:string,gender?:string}>} */
const deputies = [];
for (const [party, names] of Object.entries(parties)) {
  for (const fullName of names) {
    const key = normKey(fullName);
    const entry = {
      fullName,
      partySlug: partySlug[party],
    };
    const circle = circles.get(key);
    if (circle) entry.electoralCircle = circle;
    if (MESA[key]) entry.mesaRole = MESA[key];
    if (women.has(key)) entry.gender = "F";
    deputies.push(entry);
  }
}

const counts = Object.fromEntries(
  Object.entries(parties).map(([k, v]) => [k, v.length]),
);
console.log("counts", counts, "total", deputies.length);
console.log(
  "with circle",
  deputies.filter((d) => d.electoralCircle).length,
  "mesa",
  deputies.filter((d) => d.mesaRole).length,
  "women",
  deputies.filter((d) => d.gender === "F").length,
);

const missingCircle = deputies.filter((d) => !d.electoralCircle).map((d) => d.fullName);
if (missingCircle.length) {
  console.log("missing circle sample:", missingCircle.slice(0, 15));
}

const outPath = path.join(ROOT, "data/seed/deputies.generated.json");
fs.writeFileSync(outPath, JSON.stringify({ counts, deputies }, null, 2));
console.log("wrote", outPath);
