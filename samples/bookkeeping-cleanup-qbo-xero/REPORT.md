# Build Report — Sample #10: QBO/Xero Bookkeeping Cleanup SUPPORT

Built 2026-10-31. Pattern followed from samples #4 (CRM migration) and
#8 (financial modelling): seeded generator + plant manifest, a cleanup
engine producing the client deliverable, and a fully independent
verifier that recomputes everything from the raw files alone.

## What was built

- **Fictional dataset** — "Sunnybrook Pet Supplies (FICTIONAL)",
  Jan–Mar 2026, all counterparties invented:
  - `bank_statement_raw.csv` — 90 lines (86 unique transactions + 4
    exact duplicate export lines), statement-style descriptions,
    running balance, opening $4,250.00 / stated closing $4,746.64.
  - `books_records_raw.csv` — 85 messy records (79 unique + 6 exact
    duplicates): mixed date formats (57 of 85 non-ISO), hand-typed
    payee variants, miscategorizations.
  - 81 underlying "true" transactions generated from a schedule
    (sales payouts, rent, suppliers, utilities, subscriptions, ads,
    shipping, insurance, one-offs, personal items).
- **Cleanup engine** (`cleanup.py`) — standardization (payee alias
  resolution, ISO dates, standard category per counterparty), per-file
  de-duplication, and a documented 3-pass matcher (exact → ±10-day date
  window → adjacent-digit transposition within 3 days).
- **Deliverable workbook** (`cleanup_workbook.xlsx`) — Bank_Clean (86
  rows), Books_Clean (79 rows, as-recorded vs cleaned side by side),
  Reconciliation (live SUM/SUMIF formulas; difference $0.00), and
  Exceptions_List (44 rows, 9 reason codes, every action in
  support language: "Flagged for the bookkeeper/owner to confirm…").
- **Client-style report** (`CLEANUP-REPORT.md`) — planted-vs-found mess
  table, what was standardized, reconciliation to the cent, matching
  summary, scope fence.
- **Verification** (`verify_sample.py` + `VERIFICATION.md` +
  `verification_log.txt`) — 37 independent checks, **37/37 PASS**.

## Headline results

| Measure | Value |
|---|---|
| Matched pairs | 73 (5 amount-corrected, 5 date-corrected) |
| Match rate | 84.88% of bank transactions; 92.41% of books records |
| Bank-only exceptions | 13 (8 missing from books, 3 fees, 2 interest) |
| Books-only exceptions | 6 (outstanding / timing, period-end) |
| Duplicates removed | 4 bank + 6 books |
| Personal expenses flagged | 5 (flagged only — never judged or reclassified) |
| Reconciliation difference | **$0.00** (opening $4,250.00 → closing $4,746.64) |
| Unaccounted raw rows | 0 of 175 |

## Scope fence (held throughout)

Cleanup SUPPORT only: never bookkeeper of record, nothing posted to
QBO/Xero or any system, no filing, no tax advice, nothing signed. All
decision items are flagged for the bookkeeper/owner with the exact
recommended action.

## Deviations

None against the assignment. Two build-stage defects were caught by the
independent verifier and fixed at the root (duplicate-source trait
contamination in the generator; a regex bug in the verifier itself) —
full honesty record in VERIFICATION.md. The README's reconciliation
identity paragraph was also corrected during the build to carry the
final computed figures.
