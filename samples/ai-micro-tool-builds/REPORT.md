# REPORT — Sample #6: AI-Assisted Micro-Tool Builds (fixed scope)

Built: 2026-10-31 · Register row 6 · Scope fence: **one fixed-scope micro-tool**
— a CSV Cleaner — built, demoed and documented. No client work, no listing,
nothing sold (the program gate applies).

## What was built

- `csv-cleaner.html` — the tool: a single-file, dependency-free HTML page that
  works offline from a double-click (no server, no external calls; the user's
  file never leaves their machine). Drag & drop or pick a CSV, tick the
  operations, pick the date and email columns, and get the cleaned CSV plus a
  plain-text cleaning report with the true count of every change.
- `csv-clean.js` — **all** cleaning logic in one shared file, loaded by the
  HTML tool and by the Node harness alike, so the demo output is provably the
  tool's own work. Operations, in fixed order: standardize headers → trim
  cells → remove fully empty rows → standardize a date column to ISO
  (six accepted formats, day-first for slash/dash dates, impossible dates
  left unchanged and counted) → lowercase + validate an email column with an
  appended `email_valid` flag column → remove exact duplicates (compared on
  the cleaned values). Unparseable values are never guessed at — they are
  left in place and counted.
- Demo pack: `demo-input.csv` (fictional 20-row customer list, invented data
  only, plants counted in `plants_manifest.json`), `run-demo.js` (the
  automated run), and its delivered outputs `demo-cleaned.csv`,
  `demo-report.json`, `demo-report.txt`.
- `README.md` — what it does, how to use it, the operations table, and honest
  limitations: **exact duplicates only (no fuzzy matching)**, day-first date
  reading, format-only email validation, one date + one email column per run.

## Result

**VERIFIED 100/100 — 36/36 independent checks PASS** (`VERIFICATION.md`;
`verify_sample.py` recomputes everything three ways — black-box re-run of the
shared JS with byte-diff of all three outputs, a fresh Python
re-implementation that also reproduces the cleaned CSV byte-for-byte, and
plant counters over the raw input).

Demo counts, planted vs tool output: rows 20 in → **16 out** · raw exact
duplicates planted 1 (a second row becomes a duplicate only after cleaning —
dedupe is on cleaned values, so duplicates removed = 2) · fully empty rows
2/2 removed · invalid emails 3/3 flagged (input rows 5, 9, 16; a fourth row
has an empty email, correctly flagged as blank/missing, not invalid) ·
non-ISO dates 14/14 standardized across 5 formats (4 more were already ISO) ·
header cells standardized 6 · cells trimmed 9 · emails lowercased 4 ·
unparseable dates 0 in the demo (the path itself is proven by an auxiliary
edge-case run: 30/02/2025 and 31/04/2025 are left unchanged and counted).

## Honest build history

The tool's logic passed every check on the first complete verification run.
The only two failures during the build were bugs in the verifier's own
auxiliary test (a wrong `process.argv` index; a mistyped quote in the
round-trip test string) — both fixed in the test only and recorded in
`VERIFICATION.md`. No count anywhere was adjusted by hand.

## What this proves / does not prove

Proves: the fixed-scope micro-tool service at a verified 100% standard —
spec-first design (one shared logic file), a working offline tool a client
can use by double-clicking, a reproducible demo, and documentation whose
every number is machine-verified. The CSV Cleaner is also genuinely useful
for our own spreadsheet work.
Does not prove: browser rendering verified by eye (no browser was driven —
the UI is a thin shell over the verified logic, and its script passes
`node --check`), fuzzy/near-duplicate detection (explicitly out of scope in
the README), or scale beyond in-memory, small-to-medium files.
