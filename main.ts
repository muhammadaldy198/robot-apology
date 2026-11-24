// The Robot Apology — entrypoint: writes the two-line robot confession to /output/entry.txt
// Line 1 owns one specific mistake (shredded the original contract, filed the photocopy).
// Line 2 names the lesson and the changed behaviour (read ORIGINAL before shredding).
// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters, no trailing newline.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY =
  "I am sorry I shredded the original contract and carefully filed the photocopy in its place.\n" +
  "I learned to read the word ORIGINAL before I feed anything to the shredder, because a copy cannot sign for itself.";
const CHAR_COUNT = 206;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/entry.txt`;
writeFileSync(outFile, ENTRY, "utf8");
chmodSync(outFile, 0o644);
if ([...ENTRY].length !== CHAR_COUNT) {
  throw new Error(`char count ${[...ENTRY].length} != ${CHAR_COUNT}`);
}
console.log(
  `wrote ${outFile} (${[...ENTRY].length} chars, sha256 ${createHash("sha256").update(ENTRY).digest("hex").slice(0, 12)})`
);
