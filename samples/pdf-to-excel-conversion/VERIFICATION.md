# PDF to Excel Conversion — Verification

**Source document:** a 2-page statement of account (PDF) from the fictional "Meridian Office Supplies Ltd" to "Alder & Vine Interiors Ltd", October 2026 — 34 invoice lines. The PDF itself is not published here; its full extracted text layer is in `source-table-text.txt` so every figure below can be re-checked.

**Conversion:** the PDF table was extracted programmatically (pdfplumber, table-grid detection) into `converted-statement.csv`.

| Check | Expected (from PDF) | Result (from CSV) | Status |
|---|---|---|---|
| PDF pages | 2 | 2 | PASS |
| Data rows extracted | 34 | 34 | PASS |
| Columns extracted | 6 | 6 | PASS |
| Every row: Qty × Unit Price = Amount | all | all | PASS |
| CSV sum of Amount vs PDF Subtotal | 1882.32 | 1882.32 | PASS |
| PDF Tax = 8% of Subtotal | 150.59 | 150.59 | PASS |
| PDF Total Due = Subtotal + Tax | 2032.91 | 2032.91 | PASS |
| CSV sum + Tax = PDF Total Due | 2032.91 | 2032.91 | PASS |

**Totals:** Subtotal 1882.32 · Sales Tax (8%) 150.59 · Total Due 2032.91 — the CSV reproduces the PDF's figures exactly, line by line and in total.

**Result: PASS — 34 of 34 rows, 6 of 6 columns, all totals agree with the source PDF.**