# CRM Migration & RevOps Data Services — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A complete CRM data migration: a raw HubSpot export of exactly 1,000 contact rows cleaned, de-duplicated and reshaped into a GoHighLevel import-ready file of 905 records. Duplicates were caught three ways (exact, fuzzy on email, fuzzy on phone + name), phones standardised to E.164 format, names, companies, countries, states and dates normalised, and every record that needs a human decision was placed in a separate review file with its reason — nothing was silently dropped: 905 imported + 95 excluded reconciles exactly to the 1,000 raw rows.

## Files in this folder

- `hubspot_export_raw.csv` — the raw 1,000-row export, as received
- `ghl_import_ready.csv` — the cleaned, import-ready 905-row file
- `review_flags.csv` — the 110-row review file (95 excluded + 15 warnings), each with its reason
- `FIELD-MAPPING.md` — the field-by-field mapping between the two systems
- `VALIDATION-REPORT.md` — the migration's own validation report and headline figures
- `REPORT.md` — build report, including the dedupe lessons learned
- `VERIFICATION.md` — the independent recomputation record

## Verification

From `VERIFICATION.md`: "Score: 35/35 checks passed = 100.0/100 — Verdict: PASS — 100/100." Every figure was recomputed from the raw export alone and matched against the delivered files, including idempotency: re-running the migration reproduces all three outputs byte-identically.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
