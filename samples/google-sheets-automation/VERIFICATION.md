# Verification — Business Automation Samples

**Date:** 2026-10-24 · **Scope:** Sample 1 (Lead Intake & Alert System) and Sample 2 (Invoice Reminder System)

## What WAS verified

**1. JavaScript syntax — both .gs files**
Copied to `.js` and parsed with Node.js v24 (`node --check`). Result: **both files parse cleanly, zero syntax errors.** Apps Script runs on the same V8 engine family, so syntax-level confidence is high.

**2. Core decision logic — simulated in Python**
The portable logic was re-implemented line-for-line in Python and run against 24 test cases. **All 24 passed, 0 failures.** Covered:

- *Lead validation (Sample 1):* valid lead passes; missing name flagged; missing email flagged; malformed email (the exact typo case planted in the sample workbook) flagged; both fields missing produces both errors.
- *Round-robin assignment (Sample 1):* 3 owners over 7 picks cycle evenly (1,2,3,1,2,3,1) — no owner starved or doubled.
- *Reminder staging (Sample 2):* Paid/Cancelled/not-yet-due invoices are always skipped; day 1–6 → Stage 1; day 7–13 → Stage 2; day 14+ → Stage 3; a stage whose sent-flag is set is **never re-sent**; all-flags-set invoice produces no action; an invoice first discovered at day 10 or day 30 gets the age-appropriate stage directly (not a friendly day-1 note); running the checker a second time on the same day sends nothing (double-send guard holds).

**3. Sample workbooks — structure re-read after generation**
Both .xlsx files were re-opened programmatically and confirmed: correct sheet names/order (READ ME, data sheet, dashboard/log), header rows present, demo rows present (9 leads incl. the planted invalid-email and unprocessed cases; 8 invoices covering every system state), Dashboard counts use live COUNTIF formulas in the sample.

**4. Consistency between code and workbook**
Column constants in each .gs file match the workbook headers exactly (verified by reading both side by side). The workbook demo states match the behaviours the code implements (each invoice row's Notes describe the action the simulated logic also produced).

## What was NOT verified — honestly

- **Nothing was executed inside a real Google account.** There is no Google sign-in available in this environment, so the Apps Script runtime behaviour (SpreadsheetApp, MailApp, ScriptApp triggers, PropertiesService) was **not** run live. The code uses only standard, long-stable Apps Script services and patterns, and every non-Google-dependent part was tested as above — but a first live run in the client's own account is still step one of any real delivery (the READMEs build in a LOG-ONLY / test-first path for exactly this reason).
- **Email delivery was not tested.** MailApp quotas (e.g. ~100 recipients/day on free consumer Google accounts, higher on Workspace) are Google-side limits the client should confirm for their account tier; the pack copy does not promise volumes beyond a client's own account limits.
- **The form-submit trigger** depends on the client linking a Google Form to the sheet (or using the built-in 5-minute catch-up for pasted rows, which is trigger-based and was logic-reviewed but not live-run).

## Known design decisions worth a second look

- Sample 2 sends the **age-appropriate stage** if an invoice is first seen already 10+ days overdue, rather than restarting at Stage 1. This is deliberate (tone should match reality) and is stated in the README.
- Sample 1 marks invalid leads by writing `CHECK: …` into the Status cell rather than emailing anyone — a human fixes the row; the 5-minute catch-up skips rows with any Status value, so a corrected row needs its Status cleared to be re-processed. This is documented in the README.
