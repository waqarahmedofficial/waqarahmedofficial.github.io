# Google Sheets Automation — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

Case Study A is a complete, working orders-and-inventory automation system for a fictional small trading business: a formula-driven workbook (Orders, Inventory and a live Dashboard sheet) plus the Apps Script code in `apps-script.gs` — a custom Automation menu, an on-edit trigger that stamps ship dates, one consolidated low-stock email alert, one-click PDF invoices from any order row, an API sync with retry/back-off, and a full audit log. Alongside it are two further working Apps Script systems: `LeadIntakeAlertSystem.gs` (form submissions validated, assigned round-robin and alerted) and `InvoiceReminderSystem.gs` (staged overdue-invoice reminders with double-send guards).

## Files in this folder

- `InvoiceReminderSystem.gs`
- `LeadIntakeAlertSystem.gs`
- `VERIFICATION.md`
- `apps-script.gs`
- `case-study-a.md`

## Verification

The two automation-service scripts were syntax-checked with Node.js (zero errors) and their core decision logic was simulated against 24 test cases — 24/24 passed; `VERIFICATION.md` documents exactly what was and was not live-tested. Case Study A's results were measured on its sample workload of 36 orders / 15 SKUs (see `case-study-a.md`).

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
