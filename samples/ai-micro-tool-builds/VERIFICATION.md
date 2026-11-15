# VERIFICATION — AI-Assisted Micro-Tool Sample #6 (independent recomputation)

Script: verify_sample.py — the Python pipeline inside it is a fresh
re-implementation of the documented rules (it imports no project code);
the JavaScript is exercised only as a black box via node subprocesses.
Every figure is recomputed from the delivered files alone.
Date: 2026-10-31

## Score: 36/36 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Input data rows match manifest | PASS | file 20, manifest 20 |
| 2 | Planted raw exact duplicates match manifest | PASS | recomputed 1, manifest 1 |
| 3 | Planted fully empty rows match manifest | PASS | recomputed 2, manifest 2 |
| 4 | Planted invalid emails match manifest | PASS | recomputed 3, manifest 3 |
| 5 | Planted non-ISO dates match manifest | PASS | recomputed 14, manifest 14 |
| 6 | Node harness runs the shared logic without error | PASS | |
| 7 | Shared logic reproduces demo-cleaned.csv byte-for-byte | PASS | |
| 8 | Shared logic reproduces demo-report.json byte-for-byte | PASS | |
| 9 | Shared logic reproduces demo-report.txt byte-for-byte | PASS | |
| 10 | Report count 'rows_in' = independent recomputation | PASS | 20 = 20 |
| 11 | Report count 'rows_out' = independent recomputation | PASS | 16 = 16 |
| 12 | Report count 'headers_changed' = independent recomputation | PASS | 6 = 6 |
| 13 | Report count 'cells_trimmed' = independent recomputation | PASS | 9 = 9 |
| 14 | Report count 'empty_rows_removed' = independent recomputation | PASS | 2 = 2 |
| 15 | Report count 'dates_standardized' = independent recomputation | PASS | 14 = 14 |
| 16 | Report count 'dates_already_iso' = independent recomputation | PASS | 4 = 4 |
| 17 | Report count 'dates_unparseable' = independent recomputation | PASS | 0 = 0 |
| 18 | Report count 'emails_lowercased' = independent recomputation | PASS | 4 = 4 |
| 19 | Report count 'invalid_emails' = independent recomputation | PASS | 3 = 3 |
| 20 | Report count 'duplicates_removed' = independent recomputation | PASS | 2 = 2 |
| 21 | Report invalid_email_rows = independent recomputation | PASS | [5, 9, 16] both |
| 22 | Independent Python pipeline reproduces demo-cleaned.csv byte-for-byte | PASS | third implementation agrees byte-for-byte |
| 23 | Cleaned output has zero exact duplicate rows | PASS | 16 rows, 16 unique |
| 24 | Cleaned output has zero fully empty rows | PASS | |
| 25 | Cleaned headers are the standardized forms + email_valid | PASS | first_name, last_name, email, signup_date, city, plan, email_valid |
| 26 | Every output email is lowercase and valid-or-flagged correctly | PASS | flag column recomputed per row |
| 27 | Every output date is ISO YYYY-MM-DD (and a real calendar date) | PASS | |
| 28 | No output cell carries leading/trailing whitespace | PASS | |
| 29 | Text report figures agree with JSON report | PASS | |
| 30 | HTML tool loads the same shared logic file (csv-clean.js) | PASS | |
| 31 | HTML tool contains no external URLs | PASS | no http/https strings anywhere in the file |
| 32 | HTML tool references only local files | PASS | references: ['csv-clean.js'] |
| 33 | Shared logic file itself makes no network calls | PASS | no fetch / XMLHttpRequest / URLs |
| 34 | Edge paths behave per spec (unparseable dates 30/02 + 31/04 left unchanged and counted; hyphen-edge domain labels invalid; quoted field with comma + escaped quotes round-trips byte-for-byte; dedupe-off is a true no-op) | PASS | AUX OK |
| 35 | All deliverable files exist and are non-empty | PASS | 10 files |
| 36 | README states the exact-duplicate-only limitation honestly | PASS | exact-duplicate only, no fuzzy matching |

## Verdict: PASS — 100/100

Method notes: three independent computations agree on every figure — the
shared JavaScript logic (via the Node harness, re-run in a temp directory and
byte-diffed against all three delivered demo outputs), the verifier's fresh
Python re-implementation of the documented pipeline (which also reproduces
the cleaned CSV byte-for-byte), and the plant counters run over the raw demo
input. The HTML tool is checked statically (it loads the same shared file and
references nothing external); its inline script additionally passed
`node --check`, and the browser-only code paths (file reading, downloads)
are thin wrappers over the verified shared functions.

Build history (honesty record): the tool's logic passed every check on the
first complete run. The two failures seen during the build were both in the
verifier's own auxiliary test, never in the tool: (1) the aux script read the
shared-logic path from the wrong `process.argv` index, so it required itself
and reported "cleanCSV is not a function" (35/36); (2) after that fix, the
quote round-trip case was mistyped with one escaped quote missing, making
the test string a single field instead of two (35/36). Both were fixed in the
verifier/test only; the final run above is 36/36 with the tool's code
untouched since the demo outputs were generated.

Scope note: this verification proves the tool does exactly what its README
documents, on the demo data and the planted edge cases. It does not prove
browser rendering by eye (no browser was driven); the UI is a thin shell over
the verified logic, and the demo can be reproduced by opening
`csv-cleaner.html` and loading `demo-input.csv`.
