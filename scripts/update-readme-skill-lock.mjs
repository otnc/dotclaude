#!/usr/bin/env node
// Embeds the global skills CLI lock file into README.md between the `:::skills-lock.json` and `:::` lines.
// Usage: node scripts/update-readme-skill-lock.mjs [--lock <path>] [--check]
//   --lock   use this lock file instead of the one the skills CLI would use
//   --check  do not write; exit 1 if README.md is out of date
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const START_MARKER = ":::skills-lock.json";
const END_MARKER = ":::";

// Mirrors getSkillLockPath() in the skills CLI (vercel-labs/skills).
function defaultLockPath() {
  const xdgStateHome = process.env.XDG_STATE_HOME;
  if (xdgStateHome) return join(xdgStateHome, "skills", ".skill-lock.json");
  return join(homedir(), ".agents", ".skill-lock.json");
}

function parseArgs(argv) {
  const options = { lockPath: defaultLockPath(), check: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--lock") options.lockPath = resolve(argv[++i] ?? "");
    else if (argv[i] === "--check") options.check = true;
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return options;
}

function readLock(lockPath) {
  const content = readFileSync(lockPath, "utf-8").replace(/\r\n/g, "\n").trimEnd();
  const parsed = JSON.parse(content);
  if (typeof parsed.version !== "number" || !parsed.skills) {
    throw new Error(`${lockPath} is not a skills CLI lock file`);
  }
  return content;
}

function embed(readme, lock) {
  const lines = readme.split("\n");
  const start = lines.indexOf(START_MARKER);
  const end = lines.indexOf(END_MARKER, start + 1);
  if (start === -1 || end === -1) {
    throw new Error(`README.md must contain a "${START_MARKER}" line followed by a "${END_MARKER}" line`);
  }
  const block = ["```json", ...lock.split("\n"), "```"];
  return [...lines.slice(0, start + 1), ...block, ...lines.slice(end)].join("\n");
}

const options = parseArgs(process.argv.slice(2));
const readmePath = join(dirname(fileURLToPath(import.meta.url)), "..", "README.md");
const readme = readFileSync(readmePath, "utf-8").replace(/\r\n/g, "\n");
const updated = embed(readme, readLock(options.lockPath));

if (updated === readme) {
  console.log(`README.md is up to date with ${options.lockPath}`);
} else if (options.check) {
  console.error(`README.md is out of date with ${options.lockPath}`);
  process.exit(1);
} else {
  writeFileSync(readmePath, updated, "utf-8");
  console.log(`Updated README.md from ${options.lockPath}`);
}
