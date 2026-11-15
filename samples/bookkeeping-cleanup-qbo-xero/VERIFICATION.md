# VERIFICATION — Bookkeeping Cleanup SUPPORT Sample #10 (independent recomputation)

Script: verify_sample.py — re-reads only the two raw CSVs, the plant
manifest and the delivered workbook/report; imports no generator or
cleanup code; canonicalization (regex keyword rules), category mapping,
de-duplication and the three-pass matcher are all re-implemented fresh;
the workbook's Reconciliation formulas are recalculated with LibreOffice
headless and the values compared against the recomputation.
Date: 2026-10-31

## Score: 37/37 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Manifest: fictional marker, period, opening $4,250.00 | PASS | Sunnybrook Pet Supplies (FICTIONAL) |
| 2 | Raw row counts = manifest counts (90 bank / 85 books) | PASS | bank 90, books 85 |
| 3 | Manifest plant sizes = design (4/6/8/5/6/5/5/12/7/5) | PASS | dup-bank 4, dup-books 6, missing 8, fees/int 5, outstanding 6, transposition 5, wrong-date 5, variants 12, miscat 7, personal 5 |
| 4 | All manifest plant IDs exist in the raw files | PASS |  |
| 5 | Bank duplicates recomputed = manifest (4) | PASS | B-002, B-037, B-057, B-073 |
| 6 | Raw bank running balance consistent; final = stated closing | PASS | recomputed closing 474,664¢ = stated |
| 7 | Books duplicates recomputed = manifest (6) | PASS | K-080…K-085 |
| 8 | Unique counts: 86 bank / 79 books | PASS | 86 / 79 |
| 9 | Payee-variant books records recomputed = manifest (12) | PASS | found 12 |
| 10 | Miscategorized books records recomputed = manifest (7) | PASS | found 7 |
| 11 | Personal-expense rows recomputed = manifest (5 books / 5 bank) | PASS |  |
| 12 | Independent matcher: 73 matched / 13 bank-only / 6 books-only | PASS | 73 / 13 / 6 |
| 13 | Missing-from-books found = manifest (8) | PASS |  |
| 14 | Fees/interest bank-only found = manifest (5: 3 fees + 2 interest) | PASS |  |
| 15 | Books-only (outstanding) found = manifest (6) | PASS |  |
| 16 | Transposition pairs found = manifest pairs (5) | PASS | (B-022,K-004), (B-036,K-002), (B-055,K-005), (B-069,K-003), (B-085,K-006) |
| 17 | Each transposition is exactly one adjacent-digit swap; recorded amount = planted amount | PASS |  |
| 18 | Wrong-date pairs found = manifest pairs (5), shifts equal to planted shifts (4–9 days) | PASS |  |
| 19 | Reconciliation from raw alone ties to the cent | PASS | 425,000 + 143,236 − 61,497 − 32,075 = 474,664¢ |
| 20 | Workbook has exactly the 4 required tabs | PASS | Bank_Clean, Books_Clean, Reconciliation, Exceptions_List |
| 21 | Bank_Clean / Books_Clean ID sets = unique raw ID sets | PASS |  |
| 22 | Every Bank_Clean row equals recomputation (date/amount/payee/category/status/match) | PASS | 86 rows |
| 23 | Every Books_Clean row equals recomputation (dates/amounts/payee/categories/status/match) | PASS | 79 rows |
| 24 | Reconciliation tab (LibreOffice-recalculated): opening/closing/adjusted/differences = recomputation | PASS | difference exactly 0.00; check difference 0.00 |
| 25 | Reconciliation tab: movement lines = recomputation | PASS | books 1,432.36; bank-only −614.97; outstanding 320.75; bank movement 496.64 |
| 26 | Reconciliation counts block = recomputation | PASS | all 12 counts |
| 27 | Reconciliation match rates = recomputation | PASS | 84.88% bank / 92.41% books |
| 28 | Exceptions_List: every class present with exactly the recomputed ID set | PASS | 44 rows, 9 reason codes |
| 29 | Every exception carries support language; nothing claims posting/filing/decision by support | PASS | all actions begin "Flagged for the bookkeeper/owner to confirm" |
| 30 | Completeness: every raw row accounted exactly once, zero unaccounted | PASS | 90 bank = 86 clean + 4 dup; 85 books = 79 clean + 6 dup |
| 31 | CLEANUP-REPORT.md reconciliation figures = recomputation | PASS |  |
| 32 | CLEANUP-REPORT.md match rates and counts = recomputation | PASS |  |
| 33 | CLEANUP-REPORT.md dates-standardized count = recomputation | PASS | 57 of 85 books records were non-ISO |
| 34 | CLEANUP-REPORT.md states the scope fence | PASS | support only / nothing posted / no filing / no tax advice |
| 35 | README states the scope fence | PASS | never bookkeeper of record / no filing / no tax advice |
| 36 | Idempotency: isolated re-run of cleanup.py reproduces workbook (all cell values) + report byte-identically | PASS |  |
| 37 | Generator determinism: fresh run reproduces raw files + manifest byte-identically | PASS |  |

## Verdict: PASS — 100/100

Headline figures (independent recomputation; identical in the workbook
and report): opening balance $4,250.00; cleaned books movement $1,432.36;
bank-only items −$614.97 (8 missing entries + 3 bank fees + 2 interest
credits); outstanding books-only items $320.75; adjusted balance
$4,746.64 = bank statement closing balance as stated, difference $0.00.
Matched pairs 73 of 86 unique bank transactions (84.88%) and 73 of 79
unique books records (92.41%); 44 exceptions/flags raised, each with a
reason code and a support-language action for the bookkeeper/owner.
These are arithmetic outputs of invented inputs — they evidence cleanup
and reconciliation mechanics only.

Method notes: the verifier's matcher is a separate implementation
(key-indexed exact pass, per-record greedy date-window and transposition
passes) from cleanup.py's global candidate-sort matcher; both produce
the identical pairing on this data, and the pairing is also checked
pair-for-pair against the plant manifest for the two correction classes.
All money is handled in integer cents end-to-end, so the reconciliation
tie is exact, not tolerance-based. The Reconciliation tab's own SUM /
SUMIF formulas were evaluated by LibreOffice's formula engine — a third
computation agreeing with the cleanup run and the verifier.

Build history (honesty record): the first verification run scored 34/37.
Three failures, each found by the verifier and fixed at the root — no
count was adjusted by hand:
1. **Payee variants found 15 vs planted 12, miscategorized found 8 vs
   planted 7.** Cause: the generator chose the 6 duplicate books rows
   from records that themselves carried a variant name (3) or a wrong
   category (1), so the copies smuggled extra counted traits into the
   raw file. Fix (in generate_dataset.py): duplicate sources are now
   chosen only from records carrying no other counted plant. Dataset
   regenerated from the same seed; all downstream figures recomputed.
2. **Report-regex check failed on the (correct) closing-balance line.**
   Cause: a verifier bug — the pattern `\*\*?` requires at least one
   literal asterisk (it parses as one `\*` plus an optional second),
   so it could never match an unbolded figure. Fix (in
   verify_sample.py only): optional bold is now `(?:\*\*)?`. The report
   itself was never wrong.
3. During the build, cleanup.py also initially crashed on personal
   payees having no standard category (KeyError: 'StreamFlix') in the
   Bank_Clean tab; fixed by carrying the "Flagged — Possible Personal"
   category there too, which is the intended treatment.

Scope note: this verification proves data-cleanup and reconciliation
mechanics on fictional data under the documented rules. It does not
prove — and the sample does not claim — bookkeeping judgement: we are
never the bookkeeper of record, nothing is posted or filed, and no tax
advice is given. Every decision item is flagged for the bookkeeper/owner.
