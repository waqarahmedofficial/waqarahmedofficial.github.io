# BI Dashboards (Looker Studio) — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

The complete data pack and build behind a business-intelligence dashboard for a fictional e-commerce dataset (120 orders): KPIs, a P&L cascade, daily channel performance, SKU profit, exceptions and channel-by-country breakdowns. `STUDIO-BUILD.md` is the step-by-step specification for building this dashboard in Looker Studio, and `dashboard.html` is a single-file, offline realization of the same dashboard with working date, channel, SKU and country filters — every figure it displays was independently recomputed from the raw data before use.

## Files in this folder

- `dashboard.html` — the dashboard, realized as a single offline HTML file with working filters
- `STUDIO-BUILD.md` — the Looker Studio build specification (pages, charts, data sources)
- `data/` — the verified data pack: `kpis.csv`, `orders_fact.csv`, `pnl_cascade.csv`, `daily_channel.csv`, `sku_profit.csv`, `exceptions.csv`, `exception_types.csv`, `channel_country.csv`
- `VERIFICATION.md` — the independent verification record for both the data pack and the HTML dashboard

## Verification

From `VERIFICATION.md`: data pack — "Result: 50/50 checks PASS" (headline totals include revenue $9,824.97, net profit $313.68, net leakage $268.89); HTML realization — "Total: 2,762/2,762 checks PASS", including every displayed figure compared leaf-by-leaf against an independent aggregation.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
