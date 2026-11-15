# Spreadsheet Audit Report — Sample Ledger (October 2026)

**Business in the sample:** Harbor Lane Crafts (fictional) · **File audited:** `sample-ledger-with-errors.csv` · **Corrected file:** `corrected-ledger.csv`

Row references below are line numbers in the CSV file (the header is line 1, so the first transaction is line 2).

**Result: 14 errors found — exactly the 14 errors the sample was built with (planted vs found verified class by class; see Verification).**

## 1. Duplicate rows (3)

| Line | Problem | Action |
|---|---|---|
| 79 | Exact duplicate of line 12 (2026-10-04, Wholesale order — gift shops, line total 1144.00) — the transaction is counted twice | Duplicate removed in the corrected ledger |
| 80 | Exact duplicate of line 32 (2026-10-11, Wholesale order — gift shops, line total 280.00) — the transaction is counted twice | Duplicate removed in the corrected ledger |
| 81 | Exact duplicate of line 57 (2026-10-19, Wholesale order — bookshops, line total 839.50) — the transaction is counted twice | Duplicate removed in the corrected ledger |

## 2. Wrong line totals (4)

| Line | Transaction | Stated | Correct (Qty × Unit Price) |
|---|---|---|---|
| 7 | Marketplace payout | 2022.50 | 2030.00 |
| 24 | Marketplace commission | 102.50 | 110.00 |
| 43 | Craft fair sales | 237.75 | 234.00 |
| 65 | Marketplace payout | 1928.75 | 1925.00 |

## 3. Date-format inconsistencies (3)

| Line | As entered | Standardised to (ISO) |
|---|---|---|
| 10 | 10/03/2026 | 2026-10-03 |
| 37 | Oct 12, 2026 | 2026-10-12 |
| 60 | 2026.10.20 | 2026-10-20 |

All other dates in the file use ISO format (YYYY-MM-DD); these three rows used US format, month-name format and dot format. Each is the same calendar date, re-formatted — no date was changed.

## 4. Negative amounts (2)

| Line | Transaction | Type | As entered | Corrected |
|---|---|---|---|---|
| 19 | Wholesale order — gift shops | Income | -1610.00 | 1610.00 |
| 51 | Bubble mailers x500 | Expense | -55.00 | 55.00 |

In this ledger every line total is a positive amount and the Type column carries the direction (Income/Expense). Both rows above were entered with a minus sign, which understates the month by twice the amount in any sum that trusts the sign.

## 5. Broken category summary totals (2)

| Category | Stated in summary | Actual sum of the entered rows | Difference |
|---|---|---|---|
| Fees | 492.50 | 342.50 | 150.00 |
| Rent | 1050.00 | 900.00 | 150.00 |

The other category totals in the summary block agree with the entered rows to the cent.

## Corrected ledger — headline figures

- Transactions: 80 entered rows → 77 rows after removing the 3 duplicates
- Total income (corrected): 35848.00
- Total expenses (corrected): 3238.64
- Net (corrected): 32609.36
- Every line total in `corrected-ledger.csv` was recomputed as Quantity × Unit Price, all dates are ISO format, no negative amounts remain, and the category summary was rebuilt from the corrected rows.

## Verification

The sample ledger was built with a known, recorded set of planted errors. This audit was run by an independent checking script that reads only the CSV; its findings were then compared with the build record:

| Error class | Planted | Found |
|---|---|---|
| duplicate rows | 3 | 3 |
| wrong line totals | 4 | 4 |
| date-format inconsistencies | 3 | 3 |
| negative amounts | 2 | 2 |
| broken category sums | 2 | 2 |

Line numbers and categories also match the build record exactly. **Planted 14 = Found 14.**
