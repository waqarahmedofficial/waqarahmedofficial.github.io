# Bookkeeping Support & Bank Reconciliation — Work Sample

By Waqar Ahmed — Spreadsheet & Data Specialist (7 years) · Portfolio: https://waqarahmedofficial.github.io

## What this sample shows

Two reconciliation samples. The first is a NetSuite-format bank reconciliation for a fictional business (September 2026): the bank statement is matched to the books, every unmatched item is classified as a timing difference, book adjustment, book error or bank error, and the three real discrepancies hidden among the timing items are found, explained and corrected with journals JE-C1–JE-C3. The completed reconciliation is `bank_reconciliation.csv`; the exercise brief is `BANK_RECONCILIATION_TASK.md`. The second sample reconciles a fictional trading company's invoice register against its bank payments export (`invoices.csv` vs `payments.csv`) — invoice by invoice: what was billed, what was paid, what is still owed, and every problem found, with its dollar impact and recommended action. The full write-up is `invoice-recon-README.md`.

## Files in this folder

- `BANK_RECONCILIATION_TASK.md`
- `bank_reconciliation.csv`
- `invoice-recon-README.md`
- `invoices.csv`
- `payments.csv`

## Verification

NetSuite sample: the reconciliation closes with adjusted bank balance = adjusted book balance = 15,871.85 and a difference of 0.00 (see `bank_reconciliation.csv`); the underlying books set passed 32/32 automated verification checks in its source project. Invoice sample (per `invoice-recon-README.md`): $146,855.55 invoiced vs $137,987.21 paid, $8,373.98 outstanding, and all 12 planted exceptions caught; independent re-computation validation passed 30/30.

This is a sample built on fictional/practice data to demonstrate the service. Client work is delivered to the same standard.
