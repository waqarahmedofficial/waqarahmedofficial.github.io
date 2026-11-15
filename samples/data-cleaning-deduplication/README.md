# Data Cleaning & De-duplication — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

Two complete before/after cleaning samples. The first takes a messy 545-row sales file (`messy_sales.csv`) through a documented cleaning pipeline — de-duplication, name, date, phone and amount standardisation — and delivers `cleaned_sales.csv` with a full `cleaning_report.txt`; invalid or missing values are flagged in the file, never silently deleted. The second (Case Study B) is a multi-channel sales export with duplicate orders, five mixed date formats, amounts stored as text and one category spelled many ways, cleaned into an analysis-ready file; the full method and results are in `case-study-b.md`.

## Files in this folder

- `case-study-b.md`
- `cleaned_sales.csv`
- `cleaning_report.txt`
- `messy_sales.csv`
- `sample-b-cleaned-sales.csv`
- `sample-b-raw-sales.csv`

## Verification

Sales sample (per `cleaning_report.txt`): 545 rows received, 45 duplicates removed (25 exact + 20 near-duplicates), 500 clean rows delivered; 16 invalid and 10 missing email addresses flagged and kept. Case Study B (per `case-study-b.md`): 62 rows in, 58 clean rows out, 4 duplicate orders removed, clean total revenue $13,231.35 — reproducible by re-running the documented pipeline.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
