# AUDIT REPORT — model_broken.xlsx

Mechanical model-integrity audit (LibreOffice recalculation). Judges formula integrity and internal consistency only — never the plausibility of the assumptions.

**Overall: FAIL**

| Check | Result | Detail |
|---|---|---|
| formula_audit_no_hardcoded_values | FAIL | 187 formula cells; 1 hardcoded |
| error_scan_clean | PASS |  |
| link_structure_intact | FAIL | 1 broken link(s) |
| balance_sheet_balances_all_periods | FAIL | col D off by 36914.43; col E off by 15000.00 |
| cash_flow_ties_to_balance_sheet | FAIL | col D off by 21914.43 |
| retained_earnings_rollforward | FAIL | col D off by 15000.00 |
| debt_schedule_ties | PASS |  |
| depreciation_consistency_is_vs_bs | PASS |  |
| crossfoot_totals | PASS |  |

## Structural findings (2)

- **hardcoded_value** — Balance Sheet!D3: constant 100000 in a calculation range
- **broken_link** — Balance Sheet!D13: formula misses expected reference(s): ['Inputs!D33']
