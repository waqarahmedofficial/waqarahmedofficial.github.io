# Sample #10 — QBO/Xero Bookkeeping Cleanup SUPPORT

**Scope fence (absolute):** this service is cleanup **support** only. We are
never the bookkeeper of record. We do not post, amend or delete entries in
QuickBooks Online, Xero or any other accounting system; we make no filing of
any kind; we give no tax advice and sign nothing. The deliverable is cleaned,
reconciled **data** plus a list of flagged items with the exact action
recommended — every decision stays with the client's bookkeeper/owner.

**The sample:** a clearly fictional small business, "Sunnybrook Pet Supplies
(FICTIONAL)", with invented counterparties, over 3 months (Jan–Mar 2026):

- `bank_statement_raw.csv` — 90-line bank statement export (statement-style
  abbreviated descriptions, running balance, 4 exact duplicate export lines).
- `books_records_raw.csv` — the business's own messy records (85 rows: mixed
  date formats, hand-typed payee variants, miscategorizations).

Planted mess (counts in `plants_manifest.json`): duplicate lines in the bank
export (4), duplicate books records (6), bank transactions missing from the
books (8), bank fees/interest present only in the bank (5), books entries
not on the bank statement — outstanding/timing (6), amount typos by
adjacent-digit transposition (5), wrong/late-recorded dates (5), payee name
variants (12 books records), miscategorized records (7), and possible
personal expenses run through the business account (5 — flagged for the
owner to confirm, never judged or reclassified by support).

## Deliverables

- `cleanup_workbook.xlsx` — tabs:
  - **Bank_Clean** — unique bank transactions, standardized payee/category,
    match status and matched books ID.
  - **Books_Clean** — unique books records with as-recorded and cleaned
    date/amount side by side, standardized payee/category, match status.
  - **Reconciliation** — opening balance + cleaned books movement +
    bank-only items − outstanding items = stated closing balance, tied to
    the cent, with live spreadsheet formulas and a counts block.
  - **Exceptions_List** — every unmatched, duplicate, corrected or flagged
    item with a reason code and the exact action recommended to the
    bookkeeper/owner (support language throughout).
- `CLEANUP-REPORT.md` — the client-style report: mess planted vs found,
  match rate, exception summary, what was standardized.
- `VERIFICATION.md` + `verify_sample.py` — independent recomputation from
  the two raw files alone.

## Matching rules (documented, deterministic)

Standardization first: payees resolved to one canonical counterparty name
(statement abbreviations and hand-typed variants); books dates parsed from
ISO / MM/DD/YYYY / DD-Mon-YYYY into ISO; categories set to the standard
category for the counterparty (personal-appearing counterparties flagged,
not categorized). Exact duplicate lines (same date + canonical payee +
amount) are removed per file, first occurrence kept, duplicates listed as
exceptions. Then three matching passes, each row used at most once:

1. **Exact** — same canonical payee, amount and date.
2. **Date window** — same payee and amount, books date 1–10 days after the
   bank date (recorded late); smallest gap wins. Cleaned date = bank date;
   flagged as a date correction.
3. **Transposed amount** — same payee, dates within 3 days, books amount is
   exactly one adjacent-digit transposition of the bank amount. Bank figure
   used in the cleaned data; flagged as an amount correction.

Anything left unmatched is an exception: bank-only items (missing from
books, fees, interest) or books-only items (outstanding/timing).

## Reconciliation identity

Opening balance + cleaned books movement + bank-only total − books-only
(outstanding) total = bank statement closing balance. In this sample:
$4,250.00 + $1,432.36 + (−$614.97) − $320.75 = $4,746.64, independently
verified to the cent (difference $0.00). Books opening balance is taken as
equal to the bank statement opening balance (stated assumption of the
sample).

## Honest limitations

- The sample proves cleanup + reconciliation mechanics on fictional data.
  It does not prove, and the service does not claim, bookkeeping judgement:
  categorization of genuinely ambiguous items, payroll, sales tax/VAT and
  anything requiring the bookkeeper of record stays with the client.
- Matching is rules-based, not AI: a real engagement with messier data
  would surface more exceptions for human decision — which is the point of
  the Exceptions_List deliverable.
