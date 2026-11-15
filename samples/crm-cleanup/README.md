# CRM Cleanup — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

A messy 600-record CRM export (`messy_crm.csv`) cleaned and de-duplicated into `cleaned_crm.csv`. Records are grouped when they share a normalised email, the same phone digits, or the same name + normalised company; the most complete record survives and absorbs any missing fields from its duplicates. Every merge is listed in `merge_map.csv`, original record IDs are kept so a re-import updates existing records instead of creating new ones, and records with missing email or phone are flagged — kept, never deleted. All counts are in `cleaning_report.txt`.

## Files in this folder

- `cleaned_crm.csv`
- `cleaning_report.txt`
- `merge_map.csv`
- `messy_crm.csv`

## Verification

Per `cleaning_report.txt`: 600 records in, 545 clean records out; 55 duplicates removed (29 exact + 26 near-duplicates); 470 phone numbers reformatted, 487 dates standardised, 490 statuses normalised; 24 records flagged for missing email and 33 for missing phone.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
