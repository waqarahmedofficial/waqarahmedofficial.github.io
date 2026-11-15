# Field Mapping — HubSpot → GoHighLevel (Sample #4, data layer only)

Scope: contact-data layer of a HubSpot → GoHighLevel (GHL) migration. This document is the
contract the migration script (`migrate.py`) implements and the validation report is judged
against. It covers field mapping, value maps, transformation rules, de-duplication rules,
quarantine rules and reconciliation. It does **not** cover pipelines, workflows, calendars,
users/permissions or any live-system import — data layer only.

Source: a HubSpot contacts export (CSV) of 1,000 rows — synthetic/fictional sample data.
Target: a GHL-import-ready contacts CSV (`ghl_import_ready.csv`) plus a review/flag file
(`review_flags.csv`) holding every record that was removed, quarantined or imported with a
warning. Nothing is silently dropped: raw rows = imported rows + excluded rows, exactly.

## 1. Field map

| # | HubSpot property (source column) | GoHighLevel field (target column) | Transformation rule |
|---|---|---|---|
| 1 | Record ID | HubSpot Record ID (custom field, traceability key) | Carried unchanged; used to trace every output/review row back to the source row. |
| 2 | First Name | First Name | Trim; if Last Name is empty and First Name holds a full name, split at the **last** space (first part → First Name, last token → Last Name). ALL-CAPS / all-lowercase names are title-cased. |
| 3 | Last Name | Last Name | Trim; title-case fix as above. |
| 4 | Email | Email | Trim + lowercase. Validated against a standard address pattern. Non-empty but invalid → record is **quarantined** (excluded from import, listed in review file). Empty → record imported only if it has a valid phone, and listed in the review file as a warning. |
| 5 | Phone Number | Phone | Strip all non-digits. 11 digits starting with `1` → `+` + digits. 10 digits → `+1` + digits (NANP). Anything else non-empty → phone is blanked and the record is imported (if email is valid) with an INVALID_PHONE warning. Empty → blank. Output must match `^\+1\d{10}$` or be empty. |
| 6 | Company Name | Company Name | Trim + collapse internal spaces. All-caps names are title-cased. Legal-suffix canonicalisation: `Incorporated`/`INC`/`Inc` → `Inc.` · `Limited`/`LTD` → `Ltd.` · `Corporation`/`Corp` → `Corp.` · `Llc`/`llc` → `LLC`. |
| 7 | Job Title | Job Title | Trim only. |
| 8 | City | City | Trim + title-case fix if all-caps/all-lowercase. |
| 9 | State/Region | State | US state full names → USPS 2-letter codes (e.g. `California` → `CA`, `New York` → `NY`, `Texas` → `TX`). Values already in code form pass through uppercased. Canadian province codes pass through. |
| 10 | Country/Region | Country | Canonical values only: variants `USA`, `U.S.A.`, `US`, `United States of America`, `America` → `United States`; `Canada` → `Canada`. |
| 11 | Postal Code | Postal Code | Trim + uppercase. |
| 12 | Lead Status | Lead Status (custom field) | Value map §2, trim. |
| 13 | Lifecycle Stage | Lifecycle Stage (custom field) | Value map §2, trim. |
| 14 | Tags | Tags | Source stores all tags in ONE field with mixed delimiters (`;` mostly, `,` in part of the file). Split on `;` or `,`, trim each tag, drop empties, de-duplicate within the record keeping first-seen order, re-join with `, ` (GHL import format). Tag **set per record must be preserved exactly** — no tag may be lost or invented. |
| 15 | Create Date | Date Added | Parse any of the source formats (`YYYY-MM-DD`, `MM/DD/YYYY`, `DD-Mon-YYYY`, `YYYY/MM/DD`) → ISO `YYYY-MM-DD`. |
| 16 | Last Activity Date | Last Activity Date | Same date rule as Create Date. |
| 17 | Website | Website | Trim + lowercase. |
| 18 | Annual Revenue | Annual Revenue (custom field) | Numeric pass-through (company revenue from the source record). |
| 19 | — (added) | Source | Constant `HubSpot Migration` on every imported row, so migrated contacts are identifiable inside GHL. |

## 2. Value maps

Lead Status (HubSpot → GHL custom field): `New` → `New` · `Open` → `Open` ·
`In Progress` → `In Progress` · `Open Deal` → `Open Deal` · `Unqualified` → `Unqualified` ·
`Attempted to Contact` → `Attempted to Contact` · `Connected` → `Connected` ·
`Bad Timing` → `Bad Timing`. (Pass-through after trim — no value may appear in the output
that is not in this list.)

Lifecycle Stage (HubSpot → GHL custom field): `Subscriber`, `Lead`,
`Marketing Qualified Lead`, `Sales Qualified Lead`, `Opportunity`, `Customer`,
`Evangelist` — pass-through after trim; no other value may appear in the output.

## 3. De-duplication rules (applied in this order, before all other cleaning)

1. **Exact duplicate** — two rows identical in every source field except Record ID.
   Keep the first occurrence in file order; remove the rest (`DUPLICATE_EXACT`).
2. **Fuzzy duplicate, email key** — normalised email (trim + lowercase) is non-empty and
   equal to an earlier kept row's normalised email → duplicate (`DUPLICATE_FUZZY_EMAIL`).
3. **Fuzzy duplicate, phone+name key** — phone digits **after E.164 normalisation**
   (so `(212) 555-0100`, `212-555-0100` and `+1 212 555 0100` produce the same key)
   equal AND normalised last name (trim + lowercase) equal to an earlier kept row →
   duplicate (`DUPLICATE_FUZZY_PHONE`). Comparing raw digit strings without
   normalisation is a known failure mode: the same number written with and without
   the country code produces different raw keys and the duplicate slips through.

The kept record is always the first occurrence in file order. Every removed row is written
to the review file with the ID of the record that was kept, so a human can audit each merge.

## 4. Quarantine & warning rules

| Rule | Condition | Disposition |
|---|---|---|
| INVALID_EMAIL | Email non-empty and fails validation | **Excluded** from import file; review file, reason `INVALID_EMAIL`. |
| NO_CONTACT_CHANNEL | Email empty/invalid AND phone empty/invalid | **Excluded**; reason `NO_CONTACT_CHANNEL`. (Defined for real migrations; does not occur in this sample — count must be 0.) |
| MISSING_EMAIL | Email empty, phone valid | Imported; review file warning `MISSING_EMAIL`. |
| INVALID_PHONE | Phone non-empty but cannot be normalised, email valid | Imported with Phone blanked; review file warning `INVALID_PHONE`. |
| MISSING_PHONE | Phone empty, email valid | Imported; review file warning `MISSING_PHONE`. (Does not occur in this sample — count must be 0.) |

## 5. Reconciliation contract

- `raw rows = imported rows + excluded rows` (duplicates + quarantined), with **zero**
  unexplained difference. Warning rows in the review file are a subset of imported rows and
  are never double-counted.
- Every imported row's HubSpot Record ID is unique; no two imported rows share a normalised
  email or a (phone, last name) key.
- Every transformation count in the validation report (phones reformatted, countries
  normalised, states converted, names split/case-fixed, companies canonicalised, dates
  reformatted, tags extracted) must be reproducible from the delivered files alone.

## 6. Idempotency

`migrate.py` is deterministic: same input → byte-identical outputs on re-run (stable sort
of the import file by last name, first name, email; no timestamps inside the CSVs).
