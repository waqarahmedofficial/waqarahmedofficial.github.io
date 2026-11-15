# Freight & Invoice Audit — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A freight-invoice audit for a fictional US importer (Halcyon Home Goods), September 2026 shipments across 3 fictional carriers. Every shipment's expected charge was rebuilt from the contracted rate cards and compared line-by-line with what the carriers billed: 42 shipments audited, $38,252.24 billed vs $34,641.45 expected — **$3,610.79 overcharged (9.44% of everything billed)**, documented as 12 findings: 2 wrong weight bands, 2 fuel surcharges above the contracted table, 1 duplicate billing, 1 phantom shipment, accessorials charged but never incurred, a detention overcharge, a wrong lane rate, and one carrier's systematic round-up pattern.

## Files in this folder

- `inputs/shipments.csv` — the shipment register (42 shipments)
- `inputs/carrier_invoices.csv` — what the carriers billed (44 invoice lines)
- `inputs/rate_cards.csv` — the contracted rates, fuel tables and accessorial schedule
- `findings_manifest.csv` — the 12 findings, each with the rate-card rule as evidence, dollar impact and recommended action
- `source-README.md` — the source pack's full notes (headline results, finding-by-finding breakdown, scope boundary)

## Verification

In the source pack, an independent validator re-derives every expected charge from the raw CSVs and re-detects each finding by rule — **48/48 checks PASS**, with no false positives (see `source-README.md`).

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
