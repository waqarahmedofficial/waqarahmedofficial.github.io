# Validation Report — EUDR Sample Pack (Nordhaven Foods GmbH, fictional)

Files validated: supplier_register.csv (15 suppliers), plot_geolocation.csv (45 plots), plots.geojson (43 features), due_diligence_data_pack.csv (23 consignments).

**Exceptions found: 8 records in 6 error classes.**

| # | Class | Count | Classification |
|---|---|---|---|
| 1 | MISSING_GEOLOCATION | 2 | CLIENT-ACTION |
| 2 | INVALID_POLYGON | 1 | CLIENT-ACTION |
| 3 | PRE_CUTOFF_PRODUCTION_CLAIMED_COMPLIANT | 1 | CLIENT-ACTION |
| 4 | MISSING_LEGALITY_EVIDENCE | 2 | CLIENT-ACTION |
| 5 | QUANTITY_MISMATCH | 1 | FIXABLE-BY-US |
| 6 | DUPLICATE_PLOT_ID | 1 | FIXABLE-BY-US |

## Detail

- **EXC-01 — MISSING_GEOLOCATION** (plot PLT-002-01, SUP-002) [CLIENT-ACTION]: Plot PLT-002-01 (Cocoa, 3.62 ha) has no point or polygon geolocation. *Action:* Supplier must capture and supply the plot geolocation (GNSS point/polygon, 6 decimal places).
- **EXC-02 — PRE_CUTOFF_PRODUCTION_CLAIMED_COMPLIANT** (plot PLT-003-03, SUP-003) [CLIENT-ACTION]: Plot PLT-003-03 shows production 2019-02-01 to 2019-04-15, which ends on/before the 31 Dec 2020 cut-off and is inconsistent with the consignment's 2025/26 harvest window, yet is claimed deforestation-free with no land-use-history evidence on file; the claim cannot be verified. *Action:* Client/supplier must supply land-use-history evidence for the plot or exclude it from the consignment and re-source the volume.
- **EXC-03 — INVALID_POLYGON** (plot PLT-006-02, SUP-006) [CLIENT-ACTION]: Polygon for plot PLT-006-02 has only 3 coordinate pairs; a valid plot polygon needs at least 6 pairs describing the perimeter. *Action:* Supplier must re-capture the full plot boundary polygon (>=6 coordinate pairs, 6 decimal places).
- **EXC-04 — DUPLICATE_PLOT_ID** (plot PLT-009-02, SUP-009) [FIXABLE-BY-US]: Plot ID PLT-009-02 is assigned to two different plots in the register. *Action:* Renumber the second plot with a new unique ID and re-issue the pack; no supplier input needed.
- **EXC-05 — MISSING_GEOLOCATION** (plot PLT-010-02, SUP-010) [CLIENT-ACTION]: Plot PLT-010-02 (Coffee, 6.30 ha) has no point or polygon geolocation. *Action:* Supplier must capture and supply the plot geolocation (GNSS point/polygon, 6 decimal places).
- **EXC-06 — MISSING_LEGALITY_EVIDENCE** (supplier SUP-005, SUP-005) [CLIENT-ACTION]: Supplier SUP-005 (Ashanti Gold Leaf Farmers Association) has no legality evidence on file (no land-use/producer licence or national registration documents). *Action:* Supplier must provide legality documents (land-use rights, producer licence, national registration) before any consignment can be statement-ready.
- **EXC-07 — MISSING_LEGALITY_EVIDENCE** (supplier SUP-013, SUP-013) [CLIENT-ACTION]: Supplier SUP-013 (Volta Cocoa Purchasing Ltd) has no legality evidence on file (no land-use/producer licence or national registration documents). *Action:* Supplier must provide legality documents (land-use rights, producer licence, national registration) before any consignment can be statement-ready.
- **EXC-08 — QUANTITY_MISMATCH** (supplier SUP-004, SUP-004) [FIXABLE-BY-US]: Consignment quantities for SUP-004 total 96500 kg but the supplier register contracted volume is 95500 kg (difference +1000 kg). *Action:* Correct the consignment sheet against the supplier's confirmed invoice totals and re-issue for client sign-off.

## Statement readiness
Consignments marked NOT statement-ready (dds_ready = No): 13 of 23 — every one is blocked by at least one exception above. The remaining consignments have complete Annex II data fields, valid geolocation and legality evidence on file.

Note: validation checks data completeness, format and internal consistency only. It does not certify legal compliance — risk assessment and the due diligence decision remain the operator's.
