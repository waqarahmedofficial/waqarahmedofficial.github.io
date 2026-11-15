# AI Micro-Tool Builds — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A single-file browser tool that cleans messy CSV files: drop in a CSV and it returns a cleaned file plus a report of everything it fixed and flagged — headers standardised, cells trimmed, empty rows and exact duplicates removed, dates converted to ISO format, emails lowercased and invalid ones flagged. The tool works fully offline in the browser (no installation, no server, no external references), and the worked demo is included end to end: 20 rows in, 16 rows out, 14 dates standardised across 5 formats, 3 invalid emails flagged. Its limits are stated honestly in the sample's own README: exact duplicates only, no fuzzy matching.

## Files in this folder

- `csv-cleaner.html` — the tool itself: one file, works offline in any browser
- `demo-input.csv` — the messy 20-row demo input
- `demo-cleaned.csv` — the cleaned 16-row output
- `demo-report.txt` / `demo-report.json` — the demo run's fix-and-flag report, both formats
- `SAMPLE-README.md` — the tool's own README, including its stated limits
- `plants_manifest.json` — the list of problems deliberately planted in the demo input
- `verification_log.txt` — raw verification output
- `REPORT.md` — build report
- `VERIFICATION.md` — the independent recomputation record

## Verification

From `VERIFICATION.md`: "Score: 36/36 checks passed = 100.0/100 — Verdict: PASS — 100/100." Three independent computations agree on every figure, and the independent pipeline reproduces `demo-cleaned.csv` byte-for-byte.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
