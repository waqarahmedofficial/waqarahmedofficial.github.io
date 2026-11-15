# Shopify Store Data — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

This sample shows the extraction and analysis side of Shopify store data work: the complete public product feed of a real Shopify store (Dan River, pulled from the store's own myshopify domain) as structured JSON, together with machine-computed catalogue statistics — product and variant counts, availability, discount and description analysis. This is the audit stage that comes before bulk product edits, price updates or catalogue clean-up in spreadsheet/CSV form. It is a catalogue data extraction & analysis sample, not a full store build-out. The collection method and cross-checks are logged in `evidence-README.md`.

## Files in this folder

- `computed_stats.json`
- `evidence-README.md`
- `myshopify_products_page1.json`

## Verification

Per `evidence-README.md` and `computed_stats.json`: the feed holds 21 products and 466 variants and was cross-checked byte-for-byte identical (921,589 bytes) against the store's canonical myshopify domain feed; computed statistics show 3 products fully sold out, 15 partially available and 3 fully available, with an average discount of 24.1% across discounted variants.

This sample was pulled from a public store catalogue to demonstrate the service. Client work is delivered to the same standard.
