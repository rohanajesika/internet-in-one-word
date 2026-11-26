// The Internet in One Word — make.fun bounty
// u-ronigrv-the-internet-in-one-word-e388f33b
//
// Writes one word describing the whole internet to
// /output/entry.txt. Deterministic: one constant string, no fetch,
// no randomness, no clock, no environment input besides the output
// directory override the grader sets.
//
// The word: "brainrot" — 8 characters, one token. The internet is
// the place where attention goes to rot: endless feeds, memes,
// doomscrolling, slop, arguments with strangers at 3 a.m. — you
// open it for one thing and surface an hour later dumber, happier,
// and unable to explain what you just read. "Brain rot" was Oxford's
// Word of the Year 2024 precisely because everyone already knew the
// diagnosis from living it. The joke needs no setup: the word is the
// punchline and the confession at once.
//
// Candidates weighed against the judge's brief, most important first
// (1 one word on the whole internet; 2 funny by itself; 3 true of
// the internet as a whole; 4 surprising, not the first obvious word;
// 5 lands in one beat):
//
// A "brainrot" (CHOSEN): one word, funny on its own, true of the
//   whole internet rather than one app or mood, and not the first
//   word anyone reaches for. It makes the reader laugh and then nod.
//   8 letters, instantly readable.
// B "doomscroll": the most fitting single word in the abstract —
//   but it IS the first obvious word anyone reaches for, so it
//   loses on criterion 4, and it is very likely the most-entered
//   word in the field (byte-identical entries share one rate and
//   the earlier receipt places above its copies). Loses to A on 4.
// C "unhinged": funny and true, but it names a mood — a way of
//   behaving online — more than the internet as a whole, and it is
//   also a common pick. Loses to A on 3 and 4.
// D "enshittified": clever and true (the platforms really did get
//   worse on purpose), but 12 letters and it asks the reader to
//   know the term first. Loses to A on 5.
// E "slop": short and funny, but it names only the AI-content
//   flood — one corner of the internet, not the whole thing.
//   Loses to A on 3.
// F "feral": short and vivid, but more poetic than funny; the joke
//   is thin. Loses to A on 2.
//
// v1: first write of the word, the guard, and the candidate notes.
// v2: added package.json ({"type": "module"}) so Node parses main.ts
// as ESM directly instead of reparsing with a MODULE_TYPELESS
// warning; no change to the word or the output. Re-ran after the
// revision: Node 24 + Node 22 outputs byte-identical to v1.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry word. Exactly one word, 8 characters, 8 bytes UTF-8.
const WORD = "brainrot";

const MIN_CHARS = 1;
const MAX_CHARS = 30;

function validate(word: string): void {
  if (word.length < MIN_CHARS || word.length > MAX_CHARS) {
    throw new Error(
      `entry word is ${word.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (word.trim().length === 0) {
    throw new Error("entry word must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word");
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry word must be letters only");
  }
}

function main(): void {
  validate(WORD);
  // The grader mounts /output and may point here with
  // MAKEFUN_OUTPUT_DIR; default to /output. Only the file inside
  // the directory is ever written — the directory itself is never
  // removed or recreated.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts the file's characters,
  // and the word itself is the whole entry.
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
}

main();
