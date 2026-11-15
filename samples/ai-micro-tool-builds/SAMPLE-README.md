# CSV Cleaner — micro-tool (Sample #6)

A small, polished, single-purpose tool that cleans a messy CSV file in the
browser. Built as sample #6 of the new-skills register ("AI-assisted micro-tool
builds, fixed scope"). The cleaning logic lives in **one shared JavaScript
file** (`csv-clean.js`) that is used both by the HTML tool and by the automated
demo harness — so the demo output in this folder is provably the tool's own
work, not a hand-made imitation.

## How to use it

1. Open `csv-cleaner.html` in any modern browser. It works **fully offline** —
   double-click the file; no server, no install, no network calls. Your file
   never leaves your machine.
2. Drag & drop a CSV file onto the page (or use the file picker). A preview of
   the input appears.
3. Tick the cleaning operations you want, and pick which column is the date
   column and which is the email column (sensible defaults are pre-selected).
4. Click **Clean the CSV**. You get the true before/after counts for every
   operation, a preview of the cleaned data (rows with an invalid email are
   highlighted), and two downloads:
   - the cleaned CSV (`<name>-cleaned.csv`)
   - a plain-text cleaning report (`<name>-report.txt`) with the count of
     every change the tool made.

## Operations (always applied in this order)

| # | Operation | What it does |
|---|---|---|
| 1 | Standardize headers | Trims each header, lowercases it, and turns runs of spaces/punctuation into `_` (e.g. ` EMAIL ` → `email`). |
| 2 | Trim whitespace | Removes leading/trailing spaces from every data cell, counting each changed cell. |
| 3 | Remove fully empty rows | Deletes rows in which every cell is empty (after trimming, if trimming is on). |
| 4 | Standardize dates | Rewrites the chosen date column to ISO `YYYY-MM-DD`. Accepts `YYYY-MM-DD`, `YYYY/MM/DD`, `DD/MM/YYYY`, `DD-MM-YYYY`, `5 Jan 2025`, `16 January 2025`, `Jan 5, 2025`. Slash/dash numeric dates are read **day-first**. A date that cannot be parsed (including impossible ones like `30/02/2025`) is left unchanged and counted in the report — never guessed. |
| 5 | Normalize emails | Lowercases the chosen email column and validates each address, appending an `email_valid` column (`TRUE` / `FALSE`; blank when the email cell is empty — an empty email is missing, not invalid). Invalid addresses stay in the file, flagged, so nothing is silently lost. |
| 6 | Remove exact duplicates | Deletes rows that are identical across **all** columns, keeping the first. Comparison happens on the *cleaned* values, so two rows that become identical after trimming/lowercasing/date fixes also count as duplicates. |

Every count shown and reported is the true count of what that operation
changed on your file.

## The demo

- `demo-input.csv` — a fictional 20-row customer list with planted messiness:
  1 raw exact duplicate (+1 row that becomes a duplicate only after cleaning),
  2 fully empty rows, 3 invalid emails, 14 non-ISO dates in 5 different
  formats, padded cells and messy headers. All people and addresses are
  invented. Plant counts: `plants_manifest.json`.
- `demo-cleaned.csv` / `demo-report.json` / `demo-report.txt` — the output of
  running the tool's own logic on the demo input via `run-demo.js`
  (Node): **20 rows in → 16 out** (2 empty removed, 2 duplicates removed),
  6 header cells standardized, 9 cells trimmed, 14 dates standardized
  (4 were already ISO), 4 emails lowercased, 3 invalid emails flagged
  (input rows 5, 9, 16).
- To reproduce: `node run-demo.js` in this folder. To re-verify everything
  independently: `python3 verify_sample.py` (see `VERIFICATION.md`).

## Files

| File | Purpose |
|---|---|
| `csv-cleaner.html` | The tool (user interface). Loads `csv-clean.js`; works offline from a double-click. |
| `csv-clean.js` | The shared cleaning logic — the single source of truth for tool + demo. |
| `run-demo.js` | Node harness: runs the shared logic on the demo input, writes the demo outputs. |
| `generate_demo.py` | Regenerates `demo-input.csv` and `plants_manifest.json` (fixed data, deterministic). |
| `demo-input.csv`, `demo-cleaned.csv` | Demo input and the tool's cleaned output for it. |
| `demo-report.json`, `demo-report.txt` | The cleaning report for the demo run (machine- and human-readable). |
| `plants_manifest.json` | The planted-mess counts the verifier holds the input to. |
| `verify_sample.py` | Independent verifier (fresh Python re-implementation + black-box JS runs). |
| `VERIFICATION.md`, `verification_log.txt` | The verification result and its raw log. |
| `REPORT.md` | Sample report for the register. |

## Limitations (honest)

- **Exact duplicates only.** There is **no fuzzy matching** in this version:
  rows that are merely *similar* (typos, `Jon` vs `John`, same person with a
  different email) are **not** merged. Near-duplicate detection is a possible
  paid upgrade, not part of this tool.
- **Day-first dates.** `03/04/2025` is read as 3 April 2025. Month-first
  (US-style) slash dates in the same file would be misread; files must use one
  convention.
- **Email validation is format-only.** It checks the address *shape*
  (one `@`, valid domain labels, a real-looking TLD). It cannot know whether a
  mailbox actually exists or accepts mail.
- **One date column and one email column** per run.
- The whole file is processed in memory in the browser; it is built for
  small-to-medium CSVs (thousands of rows), not multi-hundred-MB files.
- CSV dialect: comma-separated, double-quote escaping (RFC-4180 style).
  Semicolon/tab files are not auto-detected in this version.
- Unparseable values are never silently "fixed": they are left as-is and
  counted in the report so a human can decide.
