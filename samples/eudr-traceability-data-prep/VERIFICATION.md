# VERIFICATION — EUDR Sample Pack (independent recomputation)

Script: verify_sample.py — re-reads only the delivered files; imports no build/validate code.
Date: 2026-10-28

## Score: 24/24 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Supplier register has 15 suppliers | PASS | found 15 |
| 2 | Plot register has 45 plots | PASS | found 45 |
| 3 | Consignments present (>=12) | PASS | found 23 |
| 4 | GeoJSON features = plots minus 2 missing-geolocation plots | PASS | 43 vs 43 |
| 5 | Detected missing-geolocation plots = exactly 2 | PASS | ['PLT-002-01', 'PLT-010-02'] |
| 6 | Detected invalid polygons = exactly 1 (with <6 pairs) | PASS | [('PLT-006-02', 3)] |
| 7 | Detected pre-cutoff claimed-compliant plots = exactly 1 | PASS | ['PLT-003-03'] |
| 8 | Detected suppliers missing legality evidence = exactly 2 | PASS | ['SUP-005', 'SUP-013'] |
| 9 | Detected quantity mismatches = exactly 1 (+1000 kg) | PASS | [('SUP-004', 1000)] |
| 10 | Detected duplicate plot IDs = exactly 1 | PASS | ['PLT-009-02'] |
| 11 | Exceptions total = 8 records in 6 classes | PASS | 8 records, {'MISSING_GEOLOCATION': 2, 'PRE_CUTOFF_PRODUCTION_CLAIMED_COMPLIANT': 1, 'INVALID_POLYGON': 1, 'DUPLICATE_PLOT_ID': 1, 'MISSING_LEGALITY_EVIDENCE': 2, 'QUANTITY_MISMATCH': 1} |
| 12 | Exception counts per class match spec exactly | PASS | {'MISSING_GEOLOCATION': 2, 'PRE_CUTOFF_PRODUCTION_CLAIMED_COMPLIANT': 1, 'INVALID_POLYGON': 1, 'DUPLICATE_PLOT_ID': 1, 'MISSING_LEGALITY_EVIDENCE': 2, 'QUANTITY_MISMATCH': 1} |
| 13 | Every exception classification matches spec | PASS |  |
| 14 | Exception entities == independently detected entities (no misses, no extras) | PASS | sym-diff: set() |
| 15 | All coordinates use exactly 6 decimal places | PASS |  |
| 16 | All coordinates within valid lat/lon ranges | PASS |  |
| 17 | Geometry type follows the >4 ha polygon rule (point <=4 ha, polygon >4 ha) | PASS |  |
| 18 | All valid polygons have >=6 coordinate pairs | PASS |  |
| 19 | GeoJSON plot IDs == CSV plots that have geolocation | PASS | diff: set() |
| 20 | GeoJSON polygon rings closed, >=6 unique vertices (except planted invalid plot); points in range | PASS |  |
| 21 | Every consignment: all Annex II fields complete OR blocked by a listed exception | PASS |  |
| 22 | dds_ready flags exactly match exception blockage | PASS |  |
| 23 | All HS codes are cocoa 1801 00 00 or coffee 0901 11 00 | PASS |  |
| 24 | Every consignment's plots belong to its supplier | PASS |  |
