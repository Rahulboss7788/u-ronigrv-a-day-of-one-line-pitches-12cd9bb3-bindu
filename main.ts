// One-line pitch for make.fun's "A Day of One-Line Pitches" bounty.
//
// The whole entry is a single sentence, written to /output/entry.txt.
// It talks to one specific friend — the one who keeps mentioning an app
// idea but has never written code — and makes saying yes feel small:
// describe the idea in plain words, the first version gets built for
// free, and the friend keeps it without learning to code.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Entry limits from the brief: one sentence, at most 240 characters.
const MAX_LENGTH = 240;
const ENTRY_PATH = "/output/entry.txt";

// The pitch: one sentence, 229 characters, plain everyday words.
// It names a concrete first-app moment (the plant-watering reminder the
// friend keeps bringing up), names make.fun and the build, and lowers
// the risk: free to try, theirs to keep, no code, nothing to learn.
const SENTENCE =
  "You keep talking about an app that reminds you when to water your plants — just describe it in plain words to the AI agent on make.fun and it’ll build your first version for free, yours to keep, with no code and nothing to learn.";

// Keep the entry honest: refuse to write anything that breaks the gate.
if (SENTENCE.length === 0 || SENTENCE.length > MAX_LENGTH) {
  throw new Error(
    `Entry must be 1 to ${MAX_LENGTH} characters, got ${SENTENCE.length}.`,
  );
}
if (SENTENCE.trim().length === 0) {
  throw new Error("Entry must not be only white space.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(ENTRY_PATH, SENTENCE, "utf8");
console.log(`Wrote ${SENTENCE.length} characters to ${ENTRY_PATH}`);

// Read-back verification: what landed on disk must be exactly the
// sentence, and still within the 240-character limit.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written !== SENTENCE) {
  throw new Error("Verification failed: /output/entry.txt does not match the entry sentence.");
}
if (written.length > MAX_LENGTH) {
  throw new Error(
    `Verification failed: entry is ${written.length} characters, over the ${MAX_LENGTH} limit.`,
  );
}
console.log(`Verified ${ENTRY_PATH}: ${written.length} characters, matches the entry sentence.`);
