# VERIFICATION — CRM Migration Sample #4 (independent recomputation)

Script: verify_sample.py — re-reads only the delivered files; imports no generator or migration code; every figure recomputed fresh.
Date: 2026-10-31

## Score: 35/35 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Raw export has exactly 1,000 data rows | PASS | found 1000 |
| 2 | Manifest plant ID lists match manifest counts (9 classes) | PASS |  |
| 3 | Import file has exactly 905 rows | PASS | found 905 |
| 4 | Review file: 95 excluded + 15 warnings = 110 rows | PASS | excluded 95, warnings 15, total 110 |
| 5 | Reconciliation: imported + excluded = raw, zero unexplained | PASS | 905 + 95 = 1000 |
| 6 | Exact duplicates removed = recomputed set = manifest (40) | PASS | review 40, recomputed 40, manifest 40 |
| 7 | Fuzzy email-key duplicates removed = recomputed = manifest (25) | PASS | 25/25/25 |
| 8 | Fuzzy phone+name-key duplicates removed = recomputed = manifest (15) | PASS | 15/15/15 |
| 9 | All 80 duplicate review rows name the correct kept record, and every kept record is imported | PASS |  |
| 10 | Invalid-email quarantines = manifest (15), none imported, each independently fails validation | PASS | review 15, manifest 15 |
| 11 | Every imported email passes independent validation and equals trimmed/lowercased raw | PASS |  |
| 12 | Missing-email plants (10): all imported with empty email + valid phone + warning row | PASS |  |
| 13 | Invalid-phone plants (5): all imported with Phone blanked + warning row | PASS |  |
| 14 | All imported phones are E.164 (+1 + 10 digits) or blank; exactly 900 present | PASS | non-empty phones 900 |
| 15 | Every imported phone equals independent normalisation of its raw phone (all 905) | PASS |  |
| 16 | Phone-reformatted count = independent recount = validation report figure (900) | PASS | recount 900, report 900 |
| 17 | Imported countries are canonical only (United States / Canada) | PASS | values: ['Canada', 'United States'] |
| 18 | Country-variant plants (120): all normalised to 'United States' in output | PASS |  |
| 19 | Every imported State is a 2-letter code | PASS |  |
| 20 | State-variant plants (150): full names converted to the correct USPS codes | PASS |  |
| 21 | Names of ALL 905 imported records equal independent split+case recomputation | PASS |  |
| 22 | Name-split plants (25): raw last name empty, output split at last space | PASS |  |
| 23 | Company names of ALL 905 imported records equal independent canonicalisation | PASS |  |
| 24 | Company-variant plants (90): every one changed vs raw and matches canonical form | PASS |  |
| 25 | Both dates of ALL 905 imported records equal independent multi-format parse of raw | PASS |  |
| 26 | Non-ISO Create Dates among imported = recount = report figure | PASS | recount 676, report 676 |
| 27 | Tag sets preserved per record for ALL 905 (split on ;/, -> GHL comma format) | PASS |  |
| 28 | Total tags extracted = recount = report figure | PASS | recount 2264, report 2264 |
| 29 | Comma-delimiter tag plants (45): all imported with tag sets intact | PASS |  |
| 30 | No duplicate normalised emails and no duplicate (phone, last name) keys in import file | PASS |  |
| 31 | Imported Record ID set = 920 unique persons minus 15 quarantined = exactly 905 expected IDs | PASS | imported 905, expected 905 |
| 32 | Lead Status / Lifecycle Stage values in import all belong to the mapping-doc value sets | PASS |  |
| 33 | Review completeness: excluded IDs all absent from import; warning IDs all present; review ID set = 80 dup + 15 invalid + 10 missing-email + 5 invalid-phone | PASS |  |
| 34 | Validation report headline figures match delivered files (imported / duplicates / quarantined) | PASS |  |
| 35 | Idempotency: re-running migrate.py reproduces all 3 outputs byte-identically | PASS |  |

## Verdict: PASS — 100/100

Method notes: dedupe sets, email/phone validity, name/company/date/tag transformations and all stage counts were recomputed from the raw export alone and compared against both the delivered files and the planted-error manifest; the validation report's printed figures were parsed and matched against the recounts; idempotency was proven by re-running the migration into a temp directory and byte-diffing all three outputs.

Build history (honesty record): the first migration run caught only 9/15 phone-key fuzzy duplicates and 14/15 invalid emails, and the generator's first country/state plants partly landed on Canadian records (113/120 and 139/150 landed). Root causes found and fixed before this verification: (1) dedupe phone keys compared raw digit strings, so the same number with and without the country code produced different keys — keys are now built from E.164-normalised digits; (2) email validation now rejects hyphen-edge domain labels (e.g. user@bad-.example); (3) country/state plants are now sampled from US records only. The mapping document was updated with the phone-key lesson. No count was adjusted by hand — the fixes changed the code and the dataset was regenerated from seed.
