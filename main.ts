import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My AI agent filed a bug report against me: 'Human keeps asking for the same thing and calls it a new idea.'";

// Self-check gate: the entry must be 1-200 chars, a single non-blank line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: the file must be byte-for-byte identical.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match ENTRY");
}
console.log(
  `wrote ${chars.length} characters to ${outPath} (verified byte-for-byte)`,
);
