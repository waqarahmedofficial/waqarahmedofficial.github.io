# Case Study B — AI Reporting Pipeline: From Messy Export to Board-Ready Numbers

**SAMPLE PROJECT** — prepared as a portfolio demonstration. Business details are fictional; the raw data, cleaning script and outputs in this folder are real — run the script and the numbers below reproduce exactly.

---

## The client problem

A small online seller exported sales data from three channels (website, physical store, marketplace) into one spreadsheet every week. Each channel formatted the export differently, so the combined file was unusable for reporting:

- The **same order appeared two or three times** (channels overlapped), inflating revenue
- **Five different date formats** in a single column (`2026-01-05`, `05-Jan-2026`, `Jan 5, 2026`, `2026/01/05`, `05/01/2026`)
- Amounts stored as **text with currency symbols** (`$1,200.50`, `USD 340`) — impossible to sum
- One category written **six different ways** (`Electronics`, `ELECTRONICS `, `Electronic`, `home/kitchen`…) — every pivot table was wrong
- Missing regions, stray spaces, inconsistent channel labels

Preparing the weekly report took the owner **about 3 hours of manual cleaning**, and the totals were still not trusted.

## What was built

A small, dependency-free **Python pipeline** (`pipeline.py`) that turns the raw export into clean, analysis-ready data in seconds:

1. **De-duplication** — exact duplicates *and* repeat order IDs are caught and counted, never silently kept
2. **Date normalisation** — all five formats parsed to ISO `yyyy-mm-dd`; unparseable rows are rejected *and reported*
3. **Amount parsing** — currency symbols, thousands separators and `USD` prefixes stripped to true numbers
4. **Category mapping** — every alias mapped to one canonical label (`Electronics`, `Home & Kitchen`, `Office Supplies`, `Apparel`)
5. **Label standardisation** — regions and channels cleaned; missing regions flagged as `Unknown` and counted in the run report
6. **Automatic summary** — revenue by month, category, region and channel, written to `sample-b-summary.csv` on every run
7. **Run report** — the script prints exactly what it did (rows in, duplicates removed, rows rejected, revenue total) so the output can be trusted and audited

The logic is AI-assisted in design and fully deterministic in execution: the same input always produces the same output, which is what financial reporting requires. The same cleaning rules can equally be delivered as an Excel/Power Query or Google Sheets/Apps Script workflow for clients who prefer to stay inside their spreadsheet.

## Result — verified on the sample data in this folder

| Measure | Before | After |
|---|---|---|
| Rows in the export | 62 (with duplicates) | **58 clean rows** |
| Duplicate orders inflating revenue | 4 hidden | **4 detected & removed** |
| Rows with missing region | 10, invisible | **10 flagged as `Unknown`** |
| Date formats | 5 mixed | **1 (ISO)** |
| Categories | 13 spellings | **4 canonical labels** |
| Weekly cleaning time | ~3 hours manual | **~5 seconds per run** |
| Clean total revenue | untrusted | **$13,231.35, reproducible** |

## Tech stack

Python 3 (standard library only — no paid tools, no fragile dependencies) · CSV/XLSX data handling · the same rule-set is portable to Excel Power Query and Google Apps Script.

## Files in this sample

- `sample-b-raw-sales.csv` — the messy export, exactly as "received"
- `pipeline.py` — the cleaning + reporting script (commented, runnable: `python3 pipeline.py`)
- `sample-b-cleaned-sales.csv` / `sample-b-summary.csv` — generated outputs
- `sample-b-before-after-workbook.xlsx` — Raw / Cleaned / Summary sheets side by side for a 30-second visual before-and-after

---

*Built by Waqar Ahmed — Google Sheets & Excel Automation Specialist, 7 years of spreadsheet systems for small businesses. Available for contract and long-term remote work; written communication, async delivery.*
