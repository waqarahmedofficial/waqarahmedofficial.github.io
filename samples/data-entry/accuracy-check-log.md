# Data Entry — Accuracy Check Log

**Source:** `source-records.txt` — 60 fictional business contacts in raw business-card / email-signature style (mixed ALL-CAPS names, "Last, First" orderings, honorifics, five different phone formats, abbreviated job titles, missing fields).
**Output:** `data-entry-output.csv` — the same 60 records typed into clean columns: First Name, Last Name, Company, Job Title, Email, Phone, City.

## Cleaning rules applied during entry

- Honorifics (Mr. / Mrs. / Ms. / Dr.) removed; "Last, First" reordered; middle initials dropped
- Names title-cased, including O'Brien, Mary-Jane and McAllister forms
- Emails lowercased
- Phones normalised to (XXX) XXX-XXXX; extensions dropped; a record with no phone in the source stays blank — nothing is invented
- Company suffixes normalised (Inc. / LLC / LLP); titles expanded (Mgr. → Manager, Supv. → Supervisor, Asst. → Assistant); acronyms (HR, IT) kept
- City recorded without the state suffix

## Second-pass check (independent of the entry pass)

Every output cell was compared back against the raw source text by a separate checking script using pattern matching and containment tests (email identity, phone-digit equality, name-token sets, company-word containment, title expanded-form equality, city containment, and blank-field evidence — a blank output cell passes only if the source record genuinely lacks that field).

| Measure | Count |
|---|---|
| Records in source | 60 |
| Records in output | 60 |
| Fields checked (60 records × 7 fields) | 420 |
| Errors found | **0** |
| Errors fixed | **0** |

Blank cells in the output: 13 in total — 5 Phone, 4 Job Title, 4 City. Each one matches a field that is genuinely absent from that source record; the check verified all 13 blanks against the source.

**Result: 420 of 420 fields agree with the source. No discrepancies were found, so no corrections were needed.**
