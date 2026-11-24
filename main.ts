// One Sentence for a Traveler from 1800
// program/v1 entry: writes a single sentence explaining the modern
// internet to a person from 1800, using only words and pictures they
// would already know (a road, a letter, a book, a library).
// Deterministic: no input, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "Imagine one road of light joining houses the world over, carrying more letters, books, and songs than all the world's libraries hold, straight to your door in the blink of an eye.";

function validate(text: string): void {
  // Gate: UTF-8 text, 1-200 characters, not only whitespace, one sentence.
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending with a period");
  }
  const forbidden = [
    "internet",
    "computer",
    "screen",
    "website",
    "email",
    "data",
    "digital",
    "online",
    "browser",
    "network",
    "electric",
    "wire",
  ];
  const lower = text.toLowerCase();
  for (const word of forbidden) {
    if (lower.includes(word)) {
      throw new Error(`entry uses a word coined after 1800: ${word}`);
    }
  }
}

validate(SENTENCE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE + "\n", "utf8");
console.log(`wrote /output/entry.txt (${[...SENTENCE].length} characters)`);
