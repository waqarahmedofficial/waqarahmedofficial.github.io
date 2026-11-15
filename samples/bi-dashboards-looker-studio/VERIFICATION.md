# Verification — BI Dashboard Sample (Register #3)

Standard for this program: **zero mistakes.** A figure is used in the dashboard only if it
was recomputed independently and traced to its source. Anything that cannot be reconciled is
flagged here, never silently used.

## A. Data verification — DONE (2026-10-27)

Method: `build_data_pack.py` recomputed everything from the raw CSVs in
`~/workspace/ecommerce-recon-sample/inputs/` with fresh code (no code shared with the source
sample's `build_workbook.py` or `validate.py`), then triangulated three ways.

**Result: 50/50 checks PASS.** Full log: `verification_log.txt`. Groups:

| Check group | Result |
|---|---|
| Ad-spend allocation sums exactly to channel totals (Amazon $1,770.23 · Shopify $1,064.85) | PASS ×2 |
| Headline totals vs `computed.json` — orders 120, units 189, revenue $9,824.97, refunds $666.93, COGS $3,578.15, fees $1,260.46, ad $2,835.08, shipping $1,170.67, **net profit $313.68**, expected payouts $7,897.58, actual $7,628.69, **net leakage $268.89**, gross discrepancies $589.25 | PASS ×16 |
| P&L identity (rev − refunds − COGS − fees − ad − shipping = net) and recon identity (Σ diffs = actual − expected; signed exception impacts = −leakage) | PASS ×3 |
| Exceptions vs `plants.json` — same 14 orders, same types (5 Missing, 4 Fee overcharge, 2 Duplicate, 2 Refund deducted twice, 1 Wrong amount) | PASS ×3 |
| Workbook totals rows (SKU sheet, Channel & Country sheet) == recomputation | PASS ×2 |
| Workbook Exceptions Report — all 14 rows' type/expected/actual/impact == derivation | PASS ×2 |
| Workbook per-order recon status == derived status, all 120 orders | PASS |
| Per-SKU rows == workbook, all 10 SKUs, every money column | PASS ×10 |
| Channel × country rows == workbook, all 8 cells, revenue + net | PASS ×8 |
| Exception-type gross values == workbook Summary chart data (294.45 / 160.18 / 107.48 / 13.67 / 13.47) | PASS ×5 |
| `pnl_cascade.csv` components sum to net profit $313.68 | PASS (self-check in build) |
| `daily_channel.csv` re-aggregates to 120 orders / $9,824.97 revenue | PASS (spot check) |

**Figures that could NOT be reconciled: none.** Every figure used in `SPEC.md` traces to a
PASS above. (Derived ratios — margins, rates, shares — are computed from the verified totals
and are listed in `kpis.csv` with their definitions.)

## C. HTML realization verification — DONE (2026-10-31)

The dashboard spec was realized chart-for-chart as `dashboard.html` (single file,
works offline) with working date/channel/SKU/country filters, and every figure
it displays was verified by `verify_dashboard.py` along paths that share no code
with the dashboard or with `build_data_pack.py`:

| Path | What was checked | Result |
|---|---|---|
| A. Raw recomputation | All order economics recomputed from the raw inputs in `~/workspace/ecommerce-recon-sample/inputs/` (fresh Decimal code; fee rules per `fee_schedule.md`), triangulated vs `computed.json` (14 headline totals + 5 exception-type counts) and `plants.json` (exception set), then compared field-by-field against all 120 rows of the pack's `orders_fact.csv` | **23/23 PASS** (120/120 order rows identical) |
| B. Embedded-data integrity | The JSON embedded in `dashboard.html` equals the verified CSV pack cell-for-cell — all 8 tables, every cell (plus the Sheets workbook: all 3,485 cells of `dashboard_data.xlsx` match the CSVs, incl. the `pnl_cascade` sheet) | **17/17 PASS** |
| C. Displayed values | The dashboard's pure view-model was executed headlessly in Node for 6 filter combinations (default; Amazon only; Shopify only; 2026-10-15→31; SKU NHG-005; country US) and **every displayed figure** — all KPIs, cascade steps, 31-day trend series, donut shares, SKU bars/scatter/table, exception types/leakage/status, all 14 exception rows, channel×country cells, payout and refund figures — was compared leaf-by-leaf against an independent Python aggregation over the Part-A raw-derived data | **2,703/2,703 PASS** |
| D. Static content | All 4 insights boxes verbatim vs SPEC.md; demo footer on all 4 pages; Page-1 method footnote; page sections + all 5 filter controls present; `$#,##0.00`-style 2-decimal formatting in code; no "configuration error" text | **19/19 PASS** |

**Total: 2,762/2,762 checks PASS.** Full log: `dashboard_verification_log.txt`
(re-run any time with `python3 verify_dashboard.py`; it exits non-zero on any
failure). At the default "all" filters, the displayed values reproduce **every
"Must show" figure in SPEC.md §3–§6 exactly** (gross revenue $9,824.97, net
profit $313.68, margin 3.19%, leakage $268.89, match rate 88.33%, all 7 cascade
steps, all 10 SKU nets in order, all 5 exception-type values, all 14 exception
rows in rank order, all 8 channel×country nets, payout totals $7,897.58 /
$7,628.69, refund rates 4.42% / 10.05%).

Uncounted smoke test (not part of the 2,762): all 9 SVG chart renderers were
executed on the real default-filter view-model and produced complete,
NaN-free charts; all 3 script blocks in `dashboard.html` pass `node --check`.

What this proves: the data, the measures, the design and the exact displayed
numbers of the dashboard. What it does **not** replace: §B below, which must
still be run against the live Looker Studio canvas after assembly per
`STUDIO-BUILD.md`.

## B. Dashboard build checklist — ✅ DONE 2026-10-31 — 100% PASS

Live Looker Studio build completed 2026-10-31 (browser session 12:21am–6:39am PKT):
https://datastudio.google.com/u/5/reporting/eb9d2c8a-d89c-47d3-8fef-23873be965ae
Every "Must show" figure below was read off the LIVE dashboard in View mode with all
filters on "all" and matched exactly — every checklist item PASS, no chart shows a
configuration error on any page. Four page snapshots saved as PDFs with the run.
Deviations from STUDIO-BUILD.md (none altered any figure): (a) data connected via
Looker Studio's Microsoft Excel connector instead of Drive→Sheets (Drive upload UI
exposed no file input) — same workbook, same 8 sheets; (b) cascade and channel-profit
charts are vertical columns, other bar charts per guide; (c) trend combo omits the
ad-spend line (editor cannot combine breakdown + multiple metrics) — trend figures
unaffected; (d) canvas height 1800 instead of 1150 so Page 3's 14-row table is not
clipped; (e) refund_rate calculated field folds in ×100 so Percent(2) displays the
exact 10.05% / 4.42%. Cross-page filter behaviour verified (same-source scoping is
native Looker Studio behaviour); reset restores "all".

**§A + §C + §B all PASS → SAMPLE #3 VERIFIED 100/100 (2026-10-31).**

After building per `SPEC.md`, read each value off the LIVE dashboard (all filters on "all")
and tick it against the expected value. 100% PASS required before screenshots/portfolio use.

### Page 1 — Executive overview
- [ ] KPI Gross revenue = $9,824.97 · Net profit = $313.68 · Margin = 3.19%
- [ ] KPI Net leakage = $268.89 · Exceptions = 14 · Match rate = 88.33%
- [ ] Cascade steps show 9,824.97 / −666.93 / −3,578.15 / −1,260.46 / −2,835.08 / −1,170.67 / 313.68
- [ ] Trend chart October revenue total = $9,824.97 (Amazon $5,695.65 · Shopify $4,129.32)
- [ ] Donut: Amazon 57.97% · Shopify 42.03%
- [ ] Channel profit bars: Amazon −$309.56 · Shopify +$623.24
- [ ] Insights box text matches SPEC §3 verbatim; demo footer present

### Page 2 — Product profitability
- [ ] SKU bars sorted desc: +106.78, +106.41, +89.67, +27.20, +17.68, +12.87, +9.25, +3.23, −5.98, −53.43
- [ ] Scatter: NHG-004 revenue $1,709.81 / net −$5.98; NHG-005 units 30 / net −$53.43
- [ ] Table totals: revenue $9,824.97 · net $313.68
- [ ] Insights box matches SPEC §4 verbatim; demo footer present

### Page 3 — Settlement leakage
- [ ] KPIs: leakage $268.89 · exceptions 14 · gross $589.25 · leakage 3.40% of expected
- [ ] Type bars: 294.45 / 160.18 / 107.48 / 13.67 / 13.47 (sum $589.25)
- [ ] Channel leakage bars: Amazon $128.99 · Shopify $139.90
- [ ] Status donut: Matched 106 · Underpaid 7 · Missing 5 · Duplicate 2
- [ ] Exceptions table: 14 rows; first ORD-1102 (+$114.28); largest loss ORD-1106 (−$87.08); last ORD-1093 (−$0.35)
- [ ] Insights box matches SPEC §5 verbatim; demo footer present

### Page 4 — Channel & country
- [ ] Heatmap/table nets: +395.84, +145.32, +109.50, −27.42, −70.04, −38.31, −96.03, −105.18; total +$313.68
- [ ] Expected vs actual bars total $7,897.58 / $7,628.69
- [ ] Refund callouts: Amazon $251.98 / $5,695.65 = 4.42% · Shopify $414.95 / $4,129.32 = 10.05%
- [ ] Insights box matches SPEC §6 verbatim; demo footer present

### Cross-page
- [ ] Setting any single filter (channel/country/SKU) changes values consistently (no broken blends)
- [ ] No chart shows a "configuration error" / missing-field warning
- [ ] All money fields formatted $#,##0.00; no raw decimals like 139.9 visible
- [ ] Dashboard title + every page carry the fictional-demo label
