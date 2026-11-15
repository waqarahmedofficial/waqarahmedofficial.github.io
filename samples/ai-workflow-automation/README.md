# AI Workflow Automation (n8n & Make) — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

Three working business automations — lead intake with de-duplication, invoice extraction, and a broken-workflow rescue (broken and fixed versions side by side) — each supplied in both n8n JSON and Make blueprint formats, with a runbook for every workflow. The lead-intake automation was also rebuilt live in Make and verified end to end: two batches of leads were processed with duplicates skipped three ways (against the stored table, within the batch, and case-insensitively), and exactly one summary notification was sent per run.

## Files in this folder

- `workflows/lead-intake.json` — n8n lead-intake workflow (dedupe to sheet + notify)
- `workflows/invoice-extraction.json` — n8n invoice-extraction workflow
- `workflows/rescue-broken.json` / `workflows/rescue-fixed.json` — the same workflow before and after repair
- `workflows/make/` — the four workflows as Make blueprints, plus the Make folder's own README
- `runbooks/RUNBOOK-lead-intake.md`, `runbooks/RUNBOOK-invoice-extraction.md`, `runbooks/RUNBOOK-rescue.md` — operating runbooks
- `VERIFICATION.md` — the live-build verification record for the Make rebuild

## Verification

From `VERIFICATION.md` (Make rebuild): "Part I: PASS" — live-built and independently verified 2026-10-31 under a "zero mistakes, 100% PASS required" gate. Batch 1: received 8 / added 6 / duplicates skipped 2; batch 2: received 5 / added 2 / skipped 3; final table 8 unique leads; exactly 2 notifications captured, payloads field-exact for both runs.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
