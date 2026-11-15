# Spreadsheet Audits & Error Checking — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A full audit of a one-month sales/expense ledger (80 transactions, fictional business Harbor Lane Crafts, October 2026). The audit found 14 errors: 3 exact duplicate rows, 4 line totals that do not equal Quantity × Unit Price, 3 dates in inconsistent formats, 2 negative amounts entered with the wrong sign, and 2 category-summary totals that do not match the rows beneath them. Every error is listed with its CSV line number in the audit report, and the corrected ledger removes the duplicates, recomputes every total, standardises all dates to ISO format and rebuilds the category summary (77 rows; corrected income 35,848.00, corrected expenses 3,238.64, net 32,609.36).

## Files in this folder

- `sample-ledger-with-errors.csv` — the ledger as received, errors included, with its category summary block
- `audit-report.md` — every error found, with line references and the correction applied
- `corrected-ledger.csv` — the corrected ledger with a rebuilt category summary

## Verification

The sample ledger was built with a known, recorded set of planted errors; an independent checking script then audited the CSV without using that record, and the two were compared class by class: **planted 14 = found 14, with exact line numbers matching** (see `audit-report.md`).

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
