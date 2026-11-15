# AI Chatbot / FAQ Bot for Websites — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A working FAQ bot for a fictional dental clinic (BrightCare Dental Studio), built on a structured knowledge base of 45 entries covering services, prices, hours, booking rules, insurance, aftercare and policies. The bot answers only from that knowledge base: if a question falls outside it, it politely declines and refers the visitor to the front desk — it never invents a price, policy or diagnosis. The single-file HTML demo runs the same bot in a browser, and the full test results are included so every answer can be checked.

## Files in this folder

- `demo.html` — single-file browser version of the bot (open it and ask it questions)
- `knowledge-base.json` — the 45-entry knowledge base the bot answers from
- `test-results.json` — the full recorded answers from the automated test run
- `TEST-REPORT.md` — the test report: method, all 30 test questions with results, fixes made, and honest limits

## Verification

From `TEST-REPORT.md`: "Final accuracy: 30/30 = 100% — all 30 passed" on the 30-question test set; the HTML demo was "verified separately: 6/6 checks passed"; and an extra spot-check of 12 unseen questions finished at "12/12 behave as intended", including correct declines on out-of-scope questions.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
