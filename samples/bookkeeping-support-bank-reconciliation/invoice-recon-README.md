# Invoice & Payment Reconciliation — Proof Sample

**Client in the sample:** Meridian Trading Co (entirely fictional)
**Period:** Q3 2026 supplier invoices, reconciled as at 15 Oct 2026
**Currency:** all reconciliation maths in USD; EUR invoices converted at 1.08, GBP at 1.27

## What this sample proves

Give me a client's invoice register and their bank payments export, and I hand
back a workbook that shows — invoice by invoice — what was billed, what was
actually paid, what is still owed, and **every problem hiding in the data**,
each with its dollar impact and the recommended next action.

## The files

| File | What it is |
|---|---|
| `invoices.csv` | The "client's" invoice register — 61 invoices from 9 suppliers |
| `payments.csv` | The "bank" payments export — 58 payments |
| `Invoice-Payment-Reconciliation-Sample.xlsx` | The deliverable (4 sheets, below) |
| `build_sample.py` | Regenerates the inputs + workbook deterministically |
| `validate.py` | Independent checker: recomputes everything from the raw CSVs and asserts the workbook matches |

## Headline results

- Total invoiced: **$146,855.55**
- Total payments per bank file: **$137,987.21** (matched to invoices: $137,347.21; unmatched: $640.00)
- Outstanding balance still owed: **$8,373.98**, of which overdue: **$5,721.78**
- Duplicate exposure: **$6,696.76** ($3,924.76 of duplicate invoices that must NOT be paid + $2,772.00 already paid twice and recoverable)
- Exceptions found: **12**

## Problems planted vs problems found

The fictional data deliberately contains realistic faults. The reconciliation
caught **all of them — 12 exceptions**:

- 2 duplicate invoices (same supplier, same number, same amount) — flagged *Duplicate suspected*, with a "do not pay" action
- 1 invoice paid twice in full — flagged *Overpaid*, refund/credit-note action
- 3 amount mismatches — tax portion never paid; $25.00 short (bank charges); $18.40 overpaid (FX/bank difference)
- 2 invoices never paid and overdue; 1 partial payment with a balance remaining
- 1 bank payment with no matching invoice anywhere in the register
- 2 invoices with missing data (one has no PO number, one has a blank tax field)
- 1 supplier recorded under two spellings ("Vertex Office Solutions" / "Vertex Office Solution") — merged in the Supplier Summary so its totals are true

## The workbook

1. **Summary** — headline figures and method notes
2. **Reconciliation** — every invoice: matched payment(s), balance, colour-coded status (Paid in full / Partially paid / Unpaid / Overdue / Overpaid / Duplicate suspected), days late
3. **Exceptions Report** — every problem: type, references, amounts, $ impact, recommended action
4. **Supplier Summary** — per-supplier invoiced vs paid vs outstanding; totals tie exactly to the other sheets

## How a real engagement works

1. You send two files: your invoice register (any spreadsheet/CSV export) and your payments export from the bank or accounting system.
2. I clean and standardise both files, match payments to invoices by reference, convert currencies at your rates, and run duplicate / mismatch / missing-data checks.
3. You receive the reconciliation workbook above: full invoice-by-invoice position, an exceptions report your team can act on the same day, and a supplier summary.
4. Typical turnaround: 2–3 business days for a quarter of data at this volume.

**Scope boundary:** this is data preparation, matching and validation only.
It is not bookkeeping sign-off, tax advice or a legal/accounting opinion —
final payment decisions always stay with you.

*All companies, people, invoice numbers and amounts in this sample are fictional and generated for demonstration.*

## Customer pack (polished 2026-10-25)

Customer-facing files in this folder (originals retained unchanged):

- `Sample-Invoice-Payment-Reconciliation.xlsx` — polished workbook: new Cover
  sheet (service title, headline results, how it works, sheet guide, contact
  line), consistent navy/gold styling, currency formats, banded rows, gold
  totals, frozen panes, autofilters, print setup (landscape, fit-to-width,
  repeating header rows, page-number footers) and a Summary chart of invoiced
  vs paid vs outstanding by supplier.
- `Sample-Invoice-Summary.pdf` — one-page PDF of the Summary sheet (with chart).

Validation after polishing: `validate.py` still passes **30/30** — no figure,
label or position was changed.
