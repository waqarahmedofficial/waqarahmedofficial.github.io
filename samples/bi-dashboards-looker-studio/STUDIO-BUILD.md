# STUDIO-BUILD — Looker Studio assembly steps (mechanical)

**Purpose:** assemble the dashboard specified in `SPEC.md` inside Looker Studio,
chart-for-chart, so the live canvas is a pure assembly job with no design or
number decisions left open. The design and every measure are already proven by
`dashboard.html` (the interactive realization in this folder) and by
`VERIFICATION.md` §A + §C — if a Studio value ever disagrees with the HTML
dashboard at the same filter settings, the Studio chart is misconfigured;
rebuild it from the step below, never "fix" the number.

**Time to assemble:** ~45–60 minutes. **Cost:** $0 (Looker Studio free tier).

---

## 0. Regenerate / verify the sources first (optional, 1 minute)

```bash
cd ~/workspace/new-skills-register/samples/bi-dashboard
python3 build_data_pack.py        # rebuilds the verified CSV pack (50/50 gate inside)
python3 build_sheets_workbook.py  # rebuilds data/dashboard_data.xlsx (8 sheets) + cell check
python3 build_dashboard.py        # rebuilds dashboard.html (design reference)
python3 verify_dashboard.py       # full independent verification (expect 2762/2762 PASS)
```

## 1. Connect the data (choose ONE route)

**Route A — Google Sheets (recommended):**
1. Upload `data/dashboard_data.xlsx` to Google Drive.
2. Open it with Google Sheets once (Drive converts it; keep the sheet names —
   they must stay exactly: `kpis`, `orders_fact`, `daily_channel`, `sku_profit`,
   `channel_country`, `exceptions`, `exception_types`, `pnl_cascade`).
3. In Looker Studio: Create → Data source → Google Sheets → pick the workbook →
   add one data source per sheet (8 total). Name each data source after its sheet.

**Route B — direct file upload:** Create → Data source → File Upload → upload
each of the 8 CSVs in `data/` (one data source per file, named after the file).

## 2. Set field types (per data source, in the data-source editor)

Money fields → **Currency → USD**; percents → **Number** (format per chart);
everything else as noted. Do NOT create blends — no chart in this spec needs one.

| Source | Date fields | Currency (USD) fields | Number fields | Text fields |
|---|---|---|---|---|
| kpis | — | — (`value` holds mixed measures) | `value` | `measure`, `definition` |
| orders_fact | `date` → Date | `revenue`, `refund_amount`, `cogs`, `platform_fees_scheduled`, `ad_spend_allocated`, `shipping_cost`, `net_profit`, `expected_payout`, `actual_payout`, `payout_difference` | `quantity` | `order_id`, `channel`, `country`, `sku`, `product_name`, `order_status`, `recon_status`, `exception_type` |
| daily_channel | `date` → Date | `revenue`, `refunds`, `ad_spend_actual`, `net_profit`, `payout_difference` | `orders`, `units` | `channel` |
| sku_profit | — | `revenue`, `refunds`, `cogs`, `platform_fees_scheduled`, `ad_spend_allocated`, `shipping`, `net_profit` | `orders`, `units`, `net_margin_pct` | `sku`, `product_name` |
| channel_country | — | `revenue`, `refunds`, `cogs`, `platform_fees_scheduled`, `ad_spend_allocated`, `shipping`, `net_profit`, `expected_payouts`, `actual_payouts`, `leakage` | `orders`, `units` | `channel`, `country` |
| exceptions | — | `expected_payout`, `actual_payout`, `money_impact` | `rank` | `exception_type`, `order_id`, `channel`, `explanation` |
| exception_types | — | `gross_value_abs`, `signed_impact` | `count` | `exception_type` |
| pnl_cascade | — | `amount` | — | `step`, `kind` |

## 3. Create the report

1. Create → Report. Name: `Northwind Home Goods — October 2026 Profit & Settlement Dashboard (Demo)`.
2. Theme: primary text/header colour `#1F3864`, accent `#C9A227`, page background white,
   component background `#F2F2F2`. Default currency format `$#,##0.00`.
3. Canvas: 1600 × 1150 per page is a comfortable working size; keep the same
   two-column chart grid as `dashboard.html` on every page.
4. Create 4 pages, named: `1 · Executive overview`, `2 · Product profitability`,
   `3 · Settlement leakage`, `4 · Channel & country`.
5. On **every page** add:
   - Page title text box (the bold heading used in `dashboard.html`).
   - **Date range control**: field `date` (source `orders_fact`; on Pages 2–4 it
     controls that page's charts), default range 2026-10-01 → 2026-10-31, scoped
     to the current page.
   - **Drop-down control — Channel**: source `orders_fact`, field `channel`,
     scoped to the current page, "Allow multiple" off, default = all.
   - Insights text box: copy the page's insights text **verbatim from SPEC.md**
     (§3/§4/§5/§6 respectively).
   - Footer text box (every page, verbatim):
     *Demo dashboard — Northwind Home Goods is a fictional store; all data is synthetic and shown to demonstrate the service.*
   - Page 1 only, small footnote under the cascade:
     *Method note: profit uses fees per the client's fee schedule; what the platforms actually charged is isolated on Page 3 as exceptions. Ad spend is allocated to orders by gross-revenue share within channel (largest-remainder, exact to the cent).*

**Scorecards from `kpis`:** each KPI card is a Scorecard on the `kpis` source,
metric `value` (aggregation SUM), with a chart-level filter `measure = <exact
measure name>` (quoted below per card). Copy the card and change only the filter.

## 4. Page 1 — Executive overview

| # | Element | Build |
|---|---|---|
| 1.1–1.6 | 6 scorecards in one row | Source `kpis`, metric SUM(`value`), filters: `measure = "Gross revenue (USD)"` → format Currency; `"True net profit (USD)"` → Currency; `"Net profit margin (%)"` → Number, 2 decimals, suffix %; `"Net leakage (USD)"` → Currency; `"Exceptions found"` → Number, 0 decimals; `"Settlement match rate (%)"` → Number, 2 decimals, suffix % |
| 1.7 | P&L cascade | Bar chart, source `pnl_cascade`, dimension `step`, metric SUM(`amount`). Order: add calculated field `step_order` = `CASE WHEN step="Gross revenue" THEN 1 WHEN step="Refunds" THEN 2 WHEN step="COGS" THEN 3 WHEN step="Platform fees (per schedule)" THEN 4 WHEN step="Ad spend" THEN 5 WHEN step="Shipping" THEN 6 ELSE 7 END`; sort by `step_order` ascending. (Looker Studio has no native waterfall; a sequential bar chart in cascade order is the accepted presentation — the HTML reference renders the true waterfall.) |
| 1.8 | Daily trend | Time-series/column chart, source `daily_channel`, dimension `date` (DAY), breakdown dimension `channel`, metric SUM(`revenue`) as stacked columns; add second chart (line) on the same axes area or directly below: metric SUM(`ad_spend_actual`) by `date`. If using one combo chart: columns = revenue by channel, line = ad spend. |
| 1.9 | Revenue share donut | Pie chart (donut hole 55%), source `orders_fact`, dimension `channel`, metric SUM(`revenue`), style: show % labels (Amazon navy `#1F3864`, Shopify gold `#C9A227`). |
| 1.10 | Net profit by channel | Bar chart, source `channel_country`, dimension `channel`, metric SUM(`net_profit`), sort by metric ascending (Amazon first). |

## 5. Page 2 — Product profitability

Extra control: **Drop-down — SKU** (source `orders_fact`, field `sku`, page scope).

| # | Element | Build |
|---|---|---|
| 2.1 | Net profit by SKU | Horizontal bar chart, source `sku_profit`, dimension `product_name`, metric SUM(`net_profit`), sort metric descending. Negative bars: style missing values n/a; add conditional colour if available (else single navy — values are signed in labels). |
| 2.2 | Scatter | Scatter chart, source `sku_profit`, X = SUM(`revenue`), Y = SUM(`net_profit`), bubble = SUM(`units`), dimension `sku`. Add a zero reference line on Y if the chart style allows. |
| 2.3 | Full SKU table | Table, source `sku_profit`, dimensions `sku`, `product_name`; metrics: SUM of `orders`, `units`, `revenue`, `refunds`, `cogs`, `platform_fees_scheduled`, `ad_spend_allocated`, `shipping`, `net_profit`, and AVG or MAX of `net_margin_pct` (values are per-SKU already; use MAX to display as-is). Turn on the summary row for revenue and net profit totals. |

## 6. Page 3 — Settlement leakage

| # | Element | Build |
|---|---|---|
| 5.1 | 4 scorecards | Source `kpis` with filters: `"Net leakage (USD)"` Currency; `"Exceptions found"` Number; `"Gross discrepancy value (USD)"` Currency; `"Leakage as % of expected payouts"` Number 2dp + %. |
| 5.2 | Discrepancy by type | Bar chart, source `exception_types`, dimension `exception_type`, metric SUM(`gross_value_abs`), sort descending. |
| 5.3 | Leakage by channel | Bar chart, source `kpis`: two scorecard-style bars — simpler: source `channel_country`, dimension `channel`, metric SUM(`leakage`). (Sums: Amazon 128.99, Shopify 139.90.) |
| 5.4 | Status donut | Pie/donut, source `orders_fact`, dimension `recon_status`, metric Record Count (COUNT of `order_id`). |
| 5.5 | Exceptions table | Table, source `exceptions`, all columns in file order, sort by `rank` ascending. |

## 7. Page 4 — Channel & country

Extra control: **Drop-down — Country** (source `orders_fact`, field `country`, page scope).

| # | Element | Build |
|---|---|---|
| 6.1 | Net-profit matrix | Pivot table with heatmap styling (or plain table), source `channel_country`, rows `channel`, columns `country`, metric SUM(`net_profit`); enable row/column totals. Conditional formatting (heatmap) on the metric: red below 0, green above 0. |
| 6.2 | Expected vs actual | Bar chart, source `channel_country`, dimension `channel`, metrics SUM(`expected_payouts`) and SUM(`actual_payouts`) (two series, navy + gold). |
| 6.3 | Refund rate | Bar chart, source `orders_fact`, dimension `channel`; add calculated field at chart level: `refund_rate = SUM(refund_amount) / SUM(revenue)`, format Percent 2dp. Add a text box beside it: *Amazon refunds $251.98 of $5,695.65 (4.42%) · Shopify refunds $414.95 of $4,129.32 (10.05%)* (these are the all-filters values from the spec). |

## 8. Validate, then screenshot

1. Set **all filters to "all"** on every page.
2. Work through **every row of `VERIFICATION.md` §B** against the live Studio
   dashboard and tick PASS/FAIL in that file. The run must be **100% PASS**
   before the sample is shown anywhere. Any FAIL = the chart named in that row
   is misconfigured; fix it from the table above and re-check.
3. Screenshot each page at full width → save as `page1.png` … `page4.png` in
   this folder.
4. Update `REPORT.md`'s "remaining step" line and the Register status via the
   parent agent (the canvas session does not edit the Register itself).

## 9. Known Studio quirks to expect

- Scorecards on `kpis` show a warning if the filter matches zero rows — the
  measure names in §3/§6 filters must match `kpis.csv` **character-for-character**
  (including "(USD)" and "%").
- `139.9` style values in CSVs are normal (trailing zero dropped by the file
  format); the Currency field format renders them as $139.90. §B checks this.
- The date-range control defaults may show the full data extent (Oct 2026
  only) — set the default explicitly to 2026-10-01 → 2026-10-31.
- Donut percent labels round to whole % in some styles; set label precision
  to 2 decimals where offered, else the §B donut row is checked against the
  metric tooltip values instead.
