# EUDR Supplier Traceability Data Preparation — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A due-diligence data pack prepared for the EU Deforestation Regulation (EUDR): a register of 15 suppliers, 45 production plots with geolocation data (CSV plus GeoJSON, points for plots up to 4 ha and polygons above), and 23 consignments with their due-diligence fields. Every problem found is classified in an exceptions file — 8 records in 6 classes: missing geolocation, an invalid polygon, a duplicate plot ID, a pre-cutoff production date claimed compliant, missing legality evidence, and a quantity mismatch — and each consignment's ready/blocked status follows directly from those exceptions.

## Files in this folder

- `supplier_register.csv` — the 15-supplier register
- `plot_geolocation.csv` — the 45-plot geolocation register
- `plots.geojson` — the same plots as GeoJSON (43 features; 2 plots have no geolocation)
- `due_diligence_data_pack.csv` — the 23-consignment due-diligence pack with ready/blocked flags
- `exceptions.csv` — the 8 classified exceptions
- `validation_report.md` — the validation findings, class by class
- `PROCESS_GUIDE.md` — how the pack is built and checked
- `REPORT.md` — build report
- `VERIFICATION.md` — the independent recomputation record

## Verification

From `VERIFICATION.md`: "Score: 24/24 checks passed = 100.0/100." The verifier re-read only the delivered files and independently re-detected every exception: the detected entities match the exceptions file exactly — no misses, no extras.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
