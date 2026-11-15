# REPORT — Sample #4: CRM Migration & RevOps Data Services (data layer only)

Built: 2026-10-31 · Register row 4 · Scope fence: **data layer only** — field mapping,
cleaning, de-duplication, validation and an import-ready file. No live HubSpot/GHL
account was touched, and no pipelines/workflows/permissions are in scope.

## What was built

A complete, self-contained migration pack for a fictional 1,000-contact HubSpot export
migrated to GoHighLevel format:

- `hubspot_export_raw.csv` — synthetic source export (seeded generator,
  `generate_dataset.py`). All data invented: `.example` email domains, fictional
  555-01XX phone range, invented people/companies. Realistic messiness planted in 13
  counted classes (manifest: `plants_manifest.json`).
- `FIELD-MAPPING.md` — the contract: 19-field map HubSpot → GHL with a transformation
  rule per field, Lead Status / Lifecycle value maps, dedupe rules (exact → fuzzy
  email key → fuzzy phone+name key), quarantine/warning rules, and the reconciliation
  contract.
- `migrate.py` — the migration script. Deterministic and idempotent (re-run reproduces
  all outputs byte-identically — proven by the verifier).
- `ghl_import_ready.csv` — 905 cleaned, deduped, import-ready contacts.
- `review_flags.csv` — 110 rows: every excluded record (95) and every
  imported-with-warning record (15), each with a reason code and, for duplicates, the
  ID of the record that was kept. Nothing is silently dropped.
- `VALIDATION-REPORT.md` — stage counts, transformation counts, spot checks
  (raw → cleaned), and reconciliation: **1,000 in = 905 imported + 95 excluded,
  zero unexplained difference.**

## Result

**VERIFIED 100/100 — 35/35 independent checks PASS** (`VERIFICATION.md`,
`verify_sample.py` recomputes everything from the delivered files with fresh code,
including re-running the migration and byte-diffing its outputs).

Planted vs caught, per class: exact duplicates 40/40 · fuzzy duplicates (email key)
25/25 · fuzzy duplicates (phone+name key) 15/15 · invalid emails quarantined 15/15 ·
missing emails imported-with-warning 10/10 · invalid phones blanked + warned 5/5 ·
country variants normalised 120/120 · state full-names → USPS codes 150/150 ·
company suffix variants canonicalised 90/90 · ALL-CAPS/lowercase names fixed 60/60 ·
full names split 25/25 · comma-delimiter tag records preserved 45/45 · phones
reformatted to E.164 900 · non-ISO create dates reformatted 676 · tags extracted
2,264 with per-record tag sets preserved for all 905 records.

## Honest build history (defects found and fixed during the build — none hidden)

The first migration run did **not** pass: it caught only 9/15 phone-key fuzzy
duplicates and 14/15 invalid emails, and the first generator placed part of the
country/state plants on Canadian records (113/120, 139/150 landed). Root causes,
all fixed in code and re-verified from a regenerated dataset:

1. Dedupe phone keys were compared as raw digit strings — the same number with and
   without the country code produced different keys. Keys are now built from
   E.164-normalised digits; the lesson is written into `FIELD-MAPPING.md` §3.
2. Email validation missed hyphen-edge domain labels (`user@bad-.example`); label-level
   checks added.
3. Country/state plants are now sampled from US records only.

## What this proves / does not prove

Proves: the data-layer work of a CRM migration — mapping design, dedupe, validation,
quarantine handling, reconciliation and an auditable review trail — at a verified
100% standard on a 1,000-record pack with deliberately planted messiness.
Does not prove: a live in-account GHL import (no account was used; GHL-side duplicate
behaviour, custom-field creation and API limits are platform steps for a real client
engagement), and nothing outside the data layer (pipelines, automations, users).
