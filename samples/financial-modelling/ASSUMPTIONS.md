# ASSUMPTIONS — Sample #8: Financial Modelling DATA Work

**The company is entirely fictional.** "Kavella Home Goods (Pvt) Ltd" was
invented for this sample. Every number below is a GIVEN assumption supplied
for the exercise — none of it describes a real business, and nothing in this
sample is a forecast opinion, a valuation, or investment advice. The service
being proven is **mechanics only**: building a fully linked 3-statement model
from given assumptions, and auditing a model's integrity. No finance
judgement is exercised anywhere in this sample.

All amounts in USD. Model shape: **annual**, 1 historical year (FY2024) +
3 forecast years (FY2025–FY2027). The FY2024 column is driven by the given
FY2024 actuals below; forecast years are driven by the given growth rates,
percentages and amounts. Every calculation cell in the workbook contains a
formula that references the Inputs sheet — no hard-coded values inside
calculation ranges.

## Opening balances (31 Dec 2023 — start of FY2024)

| Item | USD |
|---|---|
| Cash | 120,000 |
| Accounts receivable | 45,000 |
| Inventory | 38,000 |
| Gross PP&E | 300,000 |
| Accumulated depreciation | 90,000 |
| Accounts payable | 32,000 |
| Debt | 150,000 |
| Share capital | 100,000 |
| Retained earnings | 131,000 |

Opening balance check: assets 120,000 + 45,000 + 38,000 + 300,000 − 90,000 =
**413,000**; liabilities + equity 32,000 + 150,000 + 100,000 + 131,000 =
**413,000**. The opening balance sheet balances.

## Given FY2024 actuals (historical year inputs)

| Item | Value |
|---|---|
| Revenue | 820,000 |
| COGS % of revenue | 60% (i.e. COGS 492,000) |
| Salaries & wages | 148,000 |
| Rent | 36,000 |
| Other operating expenses | 41,000 |

## Forecast assumptions (given, per year)

| Assumption | FY2024 | FY2025 | FY2026 | FY2027 |
|---|---|---|---|---|
| Revenue growth % | — (actual) | 12% | 10% | 8% |
| COGS % of revenue | 60% | 60% | 59% | 58% |
| Salaries growth % | — (actual) | 6% | 6% | 6% |
| Rent growth % | — (actual) | 3% | 3% | 3% |
| Other opex growth % | — (actual) | 5% | 5% | 5% |
| Capital expenditure | 45,000 | 55,000 | 40,000 | 35,000 |
| Debt drawdown | 0 | 30,000 | 0 | 0 |
| Debt repayment | 20,000 | 25,000 | 25,000 | 30,000 |
| Dividends paid | 10,000 | 12,000 | 15,000 | 18,000 |
| Receivables days | 40 | 40 | 40 | 40 |
| Inventory days | 50 | 50 | 50 | 50 |
| Payables days | 35 | 35 | 35 | 35 |

## Rates & conventions (given)

- **Interest:** 8% per year on the **opening** debt balance of each year.
- **Tax:** 25% of positive EBT (no tax when EBT ≤ 0: `rate × MAX(EBT, 0)`).
- **Depreciation:** straight-line, 10% of the year's **closing gross PP&E**
  (opening gross PP&E + that year's capex) — the stated convention for this
  sample; the same depreciation figure is used in the Income Statement and
  in the Balance Sheet accumulated-depreciation roll-forward.
- **Working capital:** closing receivables = revenue × receivables days /
  365; closing inventory = COGS × inventory days / 365; closing payables =
  COGS × payables days / 365. Days in year = 365 (an input, not a constant
  buried in formulas).
- **Cash flow:** indirect method. Opening cash of FY2024 is the opening
  balance above; each later year opens with the prior year's ending cash.
  Balance Sheet cash is a direct link to Cash Flow ending cash.
- **Retained earnings:** opening + net income − dividends, every year.
- Share capital is constant at 100,000 (no issues or buybacks assumed).
