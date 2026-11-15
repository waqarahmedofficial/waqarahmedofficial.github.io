# Freight Invoice Audit & Overcharge Evidence Pack — Proof Sample

**Client in the sample:** Halcyon Home Goods (entirely fictional US importer/distributor)
**Period:** September 2026 shipments, audited as at 15 Oct 2026
**Carriers:** TransGlobal Freight · PacificLane Logistics · Continental Cargo Lines (all fictional)
**Currency:** USD throughout

## What this sample proves

Give me a client's contracted carrier rate cards, their shipment register and
the carriers' invoices, and I hand back an audit workbook that recomputes —
shipment by shipment — what every shipment *should* have cost under the
contract, compares it line-by-line with what was actually billed, and turns
every overcharge into a documented finding with the rate-card rule as
evidence, its dollar impact and the recommended action for the claim.

## The files

| File | What it is |
|---|---|
| `inputs/rate_cards.csv` | The contracted rates: base rate per lane and weight band, fuel surcharge % by month (Aug/Oct shown, September audited), accessorial fee schedule (detention per hour after 2 free hours, liftgate, residential, reweigh) |
| `inputs/shipments.csv` | The shipment register — 42 shipments with weight and the accessorials actually incurred |
| `inputs/carrier_invoices.csv` | What the carriers actually billed — 44 invoice lines, component by component |
| `Freight-Invoice-Audit-Sample.xlsx` | The deliverable (4 sheets, below) |
| `findings_manifest.csv` | The planted-findings manifest the build recorded (what the independent validator checks the data against) |
| `build_sample.py` | Regenerates the inputs + workbook deterministically |
| `validate.py` | Independent checker: re-derives the expected charges from the raw CSVs, re-detects every finding by rule, and asserts the workbook and manifest match — no false positives |

## Headline results

- Shipments audited: **42** (plus 1 billed shipment that does not exist in the register)
- Total billed: **$38,252.24**
- Total expected per the rate cards: **$34,641.45**
- **Total overcharged: $3,610.79** (9.44% of everything billed)
- Findings: **12** distinct errors across all 3 carriers
- Undercharges found: **$0.00** — undercharges are always reported separately and never netted against overcharges

## Problems planted vs problems found

The fictional billing data deliberately contains realistic carrier billing
faults. The audit caught **all of them — 12 findings**:

- 2 × wrong weight band billed (a 480 kg shipment billed in the 501–1000 kg band; a 92 kg shipment billed in the 101–500 kg band — fuel charged on the inflated base in both cases)
- 2 × fuel surcharge billed above the contracted September 2026 table (24.0% vs 18.0%; 26.0% vs 19.0%)
- 1 × duplicate billing — the same shipment billed in full on two separate invoices
- 2 × accessorial charged but never incurred (liftgate billed where none was used; residential fee billed on a non-residential delivery)
- 1 × detention overcharged beyond the schedule (5 hours billed, 2 hours incurred)
- 1 × wrong lane rate applied (a Chicago → New York shipment billed at the higher Shanghai → Los Angeles rate)
- 1 × phantom shipment — an invoice for a shipment reference that does not exist in the register
- 1 × systematic rounding pattern — one carrier rounds every invoice total UP to the next $5 (6 invoices), contrary to a rate card that prices to the cent
- 1 × accessorial billed twice on one shipment (one liftgate used, the fee charged twice)

## The workbook

1. **Summary** — headline figures: shipments audited, total billed vs expected, total overcharged and overcharge %, finding count, method and scope notes
2. **Shipment Audit** — every shipment: expected vs billed by component (base / fuel / accessorial), variance, colour-coded status (OK / Overcharged / Phantom shipment)
3. **Findings Report** — every finding: shipment reference, carrier, type, the rate-card rule as evidence, $ impact and the recommended action
4. **Carrier Summary** — per carrier: billed vs expected vs overcharged, overcharge % and error count; totals tie exactly to the other sheets

## How a real engagement works

1. You send three files: the contracted rate cards, the shipment register for the period, and the carrier invoices (any spreadsheet/CSV exports).
2. I rebuild the expected charge for every shipment from the rate card, compare it with the billed components line-by-line, and investigate every variance — including duplicates, phantom billings and small systematic patterns that only appear across many invoices.
3. You receive the audit workbook above: a shipment-by-shipment position, a findings report your team can claim from the same day, and a per-carrier summary.
4. Typical turnaround: 3–5 business days for a month of data at this volume.

**Scope boundary:** this is an evidence pack only. It identifies, quantifies
and documents overcharges against the contracted rate card. Filing the
carrier claims / disputes, and any negotiation with the carriers, stays with
the client — this sample is not a claims-filing, legal or accounting service.

*All companies, carriers, shipment references and amounts in this sample are fictional and generated for demonstration.*

## Customer pack (polished 2026-10-26)

Customer-facing files in this folder (originals retained unchanged):

- `Sample-Freight-Invoice-Audit.xlsx` — polished workbook: new Cover sheet
  (service title, headline results, how it works, sheet guide, contact
  line), consistent navy/gold styling, frozen panes, autofilters, print
  setup (landscape, fit-to-width, repeating header rows, page-number
  footers) and the Shipment Audit / Findings total rows completed in gold.
- `Sample-Freight-Audit-Summary.pdf` — one-page PDF of the Summary sheet.

Validation after polishing: `validate.py` still passes **48/48** — no figure,
label or position was changed.
