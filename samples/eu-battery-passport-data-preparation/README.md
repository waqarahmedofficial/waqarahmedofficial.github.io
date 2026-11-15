# EU Battery Passport Data Preparation — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

The data pack prepared for an EU battery passport: a 28-field supplier data-request template (each field with its source document and its February-2027 status under Regulation (EU) 2023/1542), and the same 28 fields completed for one fictional LMT e-bike battery pack (36 V, 14 Ah, 504 Wh, 3.2 kg, NMC). All 24 fields expected in February 2027 are filled; the Phase-2 fields (carbon footprint, recycled content, due diligence) are correctly left blank rather than estimated.

## Files in this folder

- `supplier-data-request-template.csv` — the 28-field supplier data request
- `worked-example-dataset.csv` — the 28 fields completed for the fictional battery pack
- `method-and-sources.md` — the method and the primary sources (EUR-Lex, European Commission)
- `validation-checks.txt` — the machine validation output

## Verification

Machine validation (2026-11-03): template rows 28/28, worked-example rows 28/28, field IDs match exactly, energy arithmetic 36 V × 14 Ah = 504 Wh confirmed — **all checks PASS** (see `validation-checks.txt`).

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
