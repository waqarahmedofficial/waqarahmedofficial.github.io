# VERIFICATION — Financial Modelling Sample #8 (independent recomputation)

Script: verify_sample.py — rebuilds all three statements from
assumptions.json alone in pure Python (no workbook formula is parsed for
the maths; no builder code is imported), recalculates the workbook with
LibreOffice headless, diffs every calculation cell, and re-runs
audit_model.py on the clean and deliberately broken workbooks.
Date: 2026-10-31

## Score: 26/26 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | assumptions.json carries the fictional marker; 4 years | PASS | Kavella Home Goods (Pvt) Ltd — CLEARLY FICTIONAL |
| 2 | ASSUMPTIONS.md states the scope fence (fictional; no investment advice) | PASS |  |
| 3 | Opening balance sheet balances | PASS | assets 413,000 = L+E 413,000 |
| 4 | ASSUMPTIONS.md figures agree with assumptions.json | PASS | 820,000 / 131,000 / 413,000 / 492,000 present |
| 5 | Workbook has exactly the 5 expected sheets | PASS | Inputs, Income Statement, Debt Schedule, Balance Sheet, Cash Flow |
| 6 | LibreOffice recalculation yields a value in every calculation cell | PASS | 0 empty |
| 7 | Python recompute = workbook, Income Statement | PASS | 56 cells, max diff 4.66e-10 |
| 8 | Python recompute = workbook, Balance Sheet | PASS | 52 cells, max diff 4.07e-10 |
| 9 | Python recompute = workbook, Cash Flow | PASS | 60 cells, max diff 2.91e-10 |
| 10 | Python recompute = workbook, Debt Schedule | PASS | 20 cells, max diff 0.00 |
| 11 | Workbook CHECK row (Assets − L&E) = 0 in all periods | PASS | max \|CHECK\| 0.00 |
| 12 | Every calculation cell contains a formula | PASS | 188/188 |
| 13 | No error values (#REF!/#VALUE!/…) after recalculation | PASS |  |
| 14 | Key link formulas reference their expected sources (cash→Cash Flow, RE→Income Statement + dividends input, interest→Debt Schedule, depreciation→Balance Sheet) | PASS | all 4 years, all 4 link types |
| 15 | Audit of clean model: overall PASS | PASS | AUDIT-REPORT.md |
| 16 | Audit of clean model: all 9 audit checks pass | PASS | 9/9 |
| 17 | Audit of clean model: zero structural findings | PASS |  |
| 18 | Plant manifest holds exactly the 2 intended plants | PASS | Balance Sheet!D3 hardcoded_value; Balance Sheet!D13 broken_link |
| 19 | Audit of broken copy: structural findings = plant manifest EXACTLY | PASS | caught D3 + D13, nothing else |
| 20 | Broken copy: balance check fails FY2026 | PASS | col D off by 36,914.43 |
| 21 | Broken copy: balance knock-on FY2027 = omitted dividend exactly | PASS | col E off by 15,000.00 |
| 22 | Broken copy: cash tie-out fails FY2026 by the plug difference | PASS | col D off by 21,914.43 (= 121,914.43 true cash − 100,000 plug) |
| 23 | Broken copy: retained-earnings roll-forward fails by exactly FY2026 dividends | PASS | col D off by 15,000.00 |
| 24 | Broken copy: formula audit reports exactly 1 hardcoded cell | PASS | 187 formula cells; 1 hardcoded |
| 25 | Broken copy: unaffected audit checks still pass (debt schedule, depreciation, cross-foot, error scan) | PASS | damage localised, not global |
| 26 | REPORT.md states the scope fence (no finance judgement) | PASS |  |

## Verdict: PASS — 100/100

Headline model figures (from the independent recomputation; identical in
the workbook): revenue 820,000 → 918,400 → 1,010,240 → 1,091,059.20; net
income 42,375.00 → 59,962.50 → 82,283.03 → 104,155.27; ending cash
62,792.81 → 87,545.45 → 121,914.43 → 180,201.60; closing debt 130,000 →
135,000 → 110,000 → 80,000; total assets 440,553.08 → 605,456.63 (FY2024 →
FY2027). These are arithmetic outputs of invented inputs — they evidence
mechanics only, never a view on any real business.

Method notes: the verifier's Python model was written directly from
ASSUMPTIONS.md (growth chains, COGS %, the stated depreciation convention —
10% of closing gross PP&E — interest on opening debt, tax on positive EBT,
working-capital days on a 365-day year, indirect cash flow) and shares no
code with build_model.py; the workbook values it is compared against come
from LibreOffice's own formula engine, so three independent computations
agree: the Excel formulas as evaluated by LibreOffice, the audit's
value-level checks, and the verifier's from-assumptions rebuild. Tolerance
is one cent; observed maxima are floating-point noise (≤ 4.66e-10).

Build history (honesty record): the model and audit passed on their first
complete runs (clean audit PASS with 0 findings; broken audit FAIL with
exactly the 2 planted findings). The single failure during the build was
in the verifier itself: the retained-earnings and cash chains were first
written as list comprehensions that referenced the list being built
(UnboundLocalError before any check ran). Both were rewritten as plain
loops in verify_sample.py only; no model, audit or count was changed, and
the final run above is 26/26 with the model untouched since it was built.

Scope note: this verification proves formula mechanics and audit detection
on the given (invented) assumptions. It does not prove — and the sample
does not claim — any finance judgement: assumption realism, forecasting
skill, valuation or investment merit are all outside the fence.
