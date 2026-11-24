import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "My grandfather's radio, silent for two years, crackled back to life this morning playing the exact song he used to hum while shaving — and I stood in the kitchen listening to it twice, in my socks.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, line);
// Read-back self-check: the file must be exactly the line, no trailing
// newline, within the 1-200 character gate, about a small good thing today,
// and carrying one concrete detail (the radio, the song, this morning).
const written = readFileSync(outFile, "utf8");
if (written !== line) throw new Error("entry.txt read-back mismatch");
if (written.length < 1 || written.length > 200)
  throw new Error("entry.txt length out of gate range");
if (written.endsWith("\n")) throw new Error("trailing newline");
if (!written.includes("this morning"))
  throw new Error("today anchor missing");
if (!written.includes("radio") || !written.includes("song"))
  throw new Error("concrete detail missing");
