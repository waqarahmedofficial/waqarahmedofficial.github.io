# Validation Report — HubSpot → GoHighLevel Migration (Sample #4)

Produced by `migrate.py` from `hubspot_export_raw.csv` under the rules in `FIELD-MAPPING.md`. Sample build date: 2026-10-31. All data is fictional.

## Stage counts

| Stage | Rows |
|---|---|
| Raw HubSpot export rows | 1000 |
| Exact duplicates removed | 40 |
| Fuzzy duplicates removed (email key) | 25 |
| Fuzzy duplicates removed (phone+name key) | 15 |
| Unique records after dedupe | 920 |
| Quarantined — invalid email | 15 |
| Quarantined — no contact channel | 0 |
| **Import-ready rows (ghl_import_ready.csv)** | **905** |
| Imported with warning — missing email | 10 |
| Imported with warning — invalid phone (blanked) | 5 |
| Imported with warning — missing phone | 0 |
| Review file rows (excluded + warnings) | 110 |

## Transformation counts (imported records)

| Transformation | Count |
|---|---|
| Phones reformatted to E.164 | 900 |
| Countries normalised to canonical value | 120 |
| States converted full name -> USPS code | 150 |
| Full names split into first/last | 25 |
| Names case-fixed (ALL-CAPS / lowercase) | 60 |
| Company names canonicalised | 90 |
| Create Dates reformatted to ISO | 676 |
| Tags extracted in total | 2264 |

## Reconciliation

- Input rows: 1000
- Imported rows: 905
- Excluded rows: 95 (duplicates 80 + invalid email 15 + no channel 0)
- Imported + excluded = 1000 -> **RECONCILED, zero unexplained difference**
- Warning rows (15) are a subset of imported rows and are not double-counted.

## Spot check — duplicate merge audit

- Review row Record ID 961: DUPLICATE_FUZZY_EMAIL, kept Record ID 5 — the kept record is present in the import file and the duplicate is absent.

## Spot checks — raw -> cleaned (from the migration log)

- **Record 7 (name split)** — raw: name=`Cynthia Flores `, phone=`+1 617 555 0100`, company=`Prairie Sky 6 Ltd.`, state=`FL`, country=`United States`, create=`2025/04/12`, tags=`dormant; newsletter; price-sensitive; vip` -> cleaned: name=`Cynthia Flores`, phone=`+16175550100`, company=`Prairie Sky 6 Ltd.`, state=`FL`, country=`United States`, date added=`2025-04-12`, tags=`dormant, newsletter, price-sensitive, vip`
- **Record 4 (country variant)** — raw: name=`Jessica Moore`, phone=`1-512-555-0100`, company=`Silverline 3 Ltd.`, state=`WA`, country=`USA`, create=`2025-02-27`, tags=`lead-magnet; referral` -> cleaned: name=`Jessica Moore`, phone=`+15125550100`, company=`Silverline 3 Ltd.`, state=`WA`, country=`United States`, date added=`2025-02-27`, tags=`lead-magnet, referral`
- **Record 213 (invalid phone blanked)** — raw: name=`Donald Perez`, phone=`555-1234`, company=`Oakmont 3 Corp.`, state=`VA`, country=`United States`, create=`02/20/2024`, tags=`vip; onboarding; support-plan` -> cleaned: name=`Donald Perez`, phone=``, company=`Oakmont 3 Corp.`, state=`VA`, country=`United States`, date added=`2024-02-20`, tags=`vip, onboarding, support-plan`
- **Record 1 (state full name -> code)** — raw: name=`Sandra Brown`, phone=`212-555-0100`, company=`Stonebridge 4 Corp.`, state=`Florida`, country=`United States`, create=`12/27/2025`, tags=`beta-tester; dormant` -> cleaned: name=`Sandra Brown`, phone=`+12125550100`, company=`Stonebridge 4 Corp.`, state=`FL`, country=`United States`, date added=`2025-12-27`, tags=`beta-tester, dormant`
- **Record 8 (company suffix canonicalised)** — raw: name=`Kathleen Walker`, phone=`7025550100`, company=`Riverstone 6 llc`, state=`TX`, country=`United States`, create=`2023-06-25`, tags=`onboarding; partner; renewal-2026; newsletter` -> cleaned: name=`Kathleen Walker`, phone=`+17025550100`, company=`Riverstone 6 LLC`, state=`TX`, country=`United States`, date added=`2023-06-25`, tags=`onboarding, partner, renewal-2026, newsletter`

## Files

- `hubspot_export_raw.csv` — source export (1,000 rows, fictional)
- `ghl_import_ready.csv` — cleaned, deduped, import-ready contacts
- `review_flags.csv` — every excluded record and every warning, with reason codes
- `FIELD-MAPPING.md` — the mapping + rules this run implemented
