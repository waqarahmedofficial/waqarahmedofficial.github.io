# BANK RECONCILIATION TASK — September 2026 (the exercise)

> This is the task sheet. Work it from the raw files; the worked solution is in
> `bank_reconciliation.csv` + `adjusting_entries.csv`, and the grading is
> automated in `verify.py` (checks C23–C28, C32). Do not peek at the solution
> files if you are using this as a practice exercise.

## Given

- `transaction_lines.csv` — the books (GL). The Checking account is **1000**.
  Opening bank balance at 1 Sep 2026: **25,000.00** (from JE-000).
- `bank_statement.csv` — Harbor Lane Bank statement for September 2026,
  ending balance **14,361.85**.
- The books are in their **as-recorded** state. Correction journals
  JE-C1…JE-C3 exist in the files but are blank slates for the exercise:
  pretend they have not been written yet.

## Required

1. Match every bank statement line to a book entry on account 1000
   (this is NetSuite's **Match Bank Data** step).
2. List every unmatched item and classify it as exactly one of:
   **timing difference**, **book adjustment** (bank is right, books are
   incomplete), **book error** (books are wrong), or **bank error**
   (bank is wrong).
3. There are **exactly 3 real discrepancies** hidden among the timing items.
   Find all 3. For each: state what happened, the amount, the evidence, and
   the correct treatment (which journal, which accounts, debit/credit).
4. Draft the correction entries (they become JE-C1, JE-C2, JE-C3, all dated
   30 Sep 2026).
5. Complete the reconciliation in NetSuite's form:
   statement balance, plus/minus timing items = adjusted bank balance;
   book balance, plus/minus corrections = adjusted book balance;
   the two adjusted balances must be equal and the Difference **0.00**
   (the Reconcile Account Statement page will not submit otherwise).

## Hints (NetSuite-real)

- A difference divisible by 9 is the classic fingerprint of a transposed
  pair of digits.
- "On the statement but not in the books" is usually something the bank
  knows first: fees, interest, direct debits.
- "In the books twice but at the bank once" means one of the book entries
  must come out — in NetSuite you would void the duplicate Bill Payment.
- Month-end items dated in the last 1–2 days are timing items until proven
  otherwise.
