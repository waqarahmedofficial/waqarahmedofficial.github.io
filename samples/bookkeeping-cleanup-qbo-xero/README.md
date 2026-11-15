# Bookkeeping Cleanup Support (QuickBooks / Xero) — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A bookkeeping cleanup for a fictional business (Sunnybrook Pet Supplies): the raw bank statement (90 lines) and the raw books records (85) exactly as received, and the cleanup report documenting what was done — duplicates removed (4 bank, 6 books), payee-name variants standardised (12), miscategorised records corrected (7), digit-transposition and wrong-date errors found, and the two sides matched (73 matched pairs) so the reconciliation ties exactly to the bank's closing balance, difference $0.00, with 44 exceptions listed, each carrying a stated reason and next step. Scope, stated plainly: this is cleanup support only — nothing is posted to QuickBooks or Xero, nothing is filed, and no tax advice is given; every decision item is flagged for the owner or their bookkeeper to confirm.

## Files in this folder

- `bank_statement_raw.csv` — the raw bank statement, as received (90 lines)
- `books_records_raw.csv` — the raw books records, as received (85 records)
- `CLEANUP-REPORT.md` — the cleanup report: every fix, the match results and the reconciliation
- `SAMPLE-README.md` — the sample's own README, including the scope fence
- `REPORT.md` — build report
- `VERIFICATION.md` — the independent recomputation record

## Verification

From `VERIFICATION.md`: "Score: 37/37 checks passed = 100.0/100." Canonicalisation, de-duplication and the three-pass matcher were re-implemented fresh from the two raw files alone: the recomputed reconciliation ties to the cent, and every raw row is accounted for exactly once — zero unaccounted.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
