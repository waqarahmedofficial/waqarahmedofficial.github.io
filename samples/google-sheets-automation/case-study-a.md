# Case Study A — Sheets Automation System for a Small Trading Business

**SAMPLE PROJECT** — prepared as a portfolio demonstration. Business details are fictional; the workbook, formulas and Apps Script code in this folder are real and fully working.

---

## The client problem

A small trading business (15 products, ~40 orders a month) ran everything in one manually maintained spreadsheet:

- Orders were typed in by hand and totals re-checked every Friday — about **6 staff-hours a week** spent on data entry and fixing formula mistakes.
- Stock-outs were discovered only when a customer ordered an item that wasn't there — lost sales and embarrassing phone calls.
- Every invoice meant opening a template, re-typing the order, saving a PDF and filing it — roughly **10 minutes per invoice**.
- Month-end reporting ("how much did we sell, of what, to whom?") took half a day of copy-pasting.

## What was built

A single Google Sheets workbook — no new software, no subscription — upgraded into an operations system:

| Component | What it does |
|---|---|
| **Orders sheet** | Structured order log with live line totals, status tracking (Pending → Confirmed → Shipped → Delivered) and payment flags |
| **Inventory sheet** | Stock on hand vs. reorder level per SKU, with an automatic **⚠ REORDER** status formula |
| **Dashboard sheet** | 100% formula-driven: total revenue, average order value, orders by status, **revenue by month (SUMIFS)**, SKU-below-reorder count (SUMPRODUCT) and a live low-stock alert list (FILTER) |
| **Apps Script automation** (`apps-script.gs`) | Custom **⚙ Automation menu**; on-edit trigger that stamps ship dates the moment an order is marked *Shipped*; **one consolidated low-stock email alert**; **one-click branded PDF invoice** from any order row (Docs template → PDF in Drive → link written back to the sheet); **API sync** pushing new orders to an external system with retry/back-off; a full **audit Log sheet** so nothing ever fails silently |
| **Daily trigger** | Stock check + API sync run automatically every morning before staff arrive |

## Result (measured on the sample workload)

- Weekly manual data work: **~6 hours → under 30 minutes** (status updates and totals are automatic)
- Invoicing: **10 minutes → one click (~20 seconds)**
- Stock alerts: from "found out when a customer complains" to **same-morning email, before the stock runs out**
- Month-end report: **half a day → the dashboard is always already done**

*(Time savings are estimates based on the sample workload of 36 orders / 15 SKUs included in the workbook, and scale with order volume.)*

## Tech stack

Google Sheets (structured formulas: SUMIFS, COUNTIFS, SUMPRODUCT, FILTER) · Google Apps Script (triggers, MailApp, DocumentApp, DriveApp, UrlFetchApp, Script Properties) · REST API integration with exponential-backoff retries and structured error logging.

## Files in this sample

- `sample-a-orders-inventory-system.xlsx` — the working workbook (Orders, Inventory, Dashboard; open it and change a status or a stock number — the dashboard reacts)
- `apps-script.gs` — the complete, commented automation code that runs this system in Google Sheets

---

*Built by Waqar Ahmed — Google Sheets & Excel Automation Specialist, 7 years of spreadsheet systems for small businesses. Available for contract and long-term remote work; written communication, async delivery.*
