# Financial Modelling — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

The data work behind a three-statement financial model for a fictional business (Kavella Home Goods): the stated assumptions the model was built from, and a structural audit of the finished model — every calculation cell a live formula linked to the inputs (188 of 188), balance sheet balancing in all four periods, cash tying out, and the retained-earnings roll-forward checked. A second audit report covers a deliberately broken copy of the same model: the audit caught exactly the two planted breaks (one hardcoded value, one broken link) and quantified each one's knock-on effect, with no false findings. The model workbook itself is a binary spreadsheet file and is not part of this text sample; the assumptions and both audit reports are here in full.

## Files in this folder

- `ASSUMPTIONS.md` — the assumptions the model was built from, with the scope fence stated
- `AUDIT-REPORT.md` — the audit of the clean model (all 9 audit checks pass)
- `AUDIT-REPORT-BROKEN.md` — the audit of the deliberately broken copy and its findings
- `VERIFICATION.md` — the independent recomputation record

## Verification

From `VERIFICATION.md`: "Score: 26/26 checks passed = 100.0/100 — Verdict: PASS — 100/100." All three statements were rebuilt from the assumptions alone in pure Python and diffed against the workbook cell by cell; the audit of the broken copy reported the plant manifest exactly — the two planted breaks, nothing else.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
