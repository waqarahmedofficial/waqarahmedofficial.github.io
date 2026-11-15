# Cleanup Report — Sunnybrook Pet Supplies (FICTIONAL)

**Service:** bookkeeping cleanup SUPPORT — data cleanup and reconciliation
mechanics only. **All data in this sample is fictional** (invented business
and counterparties). This report is a support deliverable for the
bookkeeper/owner: nothing has been posted to QuickBooks/Xero or any other
system, no entry has been created, amended or deleted there, no filing has
been made, and no tax advice is given. Items needing a decision are flagged
for the bookkeeper/owner to confirm.

**Period:** 1 January 2026 – 31 March 2026 (3 months)
**Sources:** bank statement export (90 lines) and the business's
own records spreadsheet (85 records)

## What was standardized

- Counterparty names: statement abbreviations and hand-typed variants
  (e.g. "PAWSOME WHSLE CO INV 8841", "Green Trail Supplies", "Till Box")
  standardized to one canonical name per counterparty.
- Dates: all books dates converted to ISO format — 57 of
  85 records were recorded in a non-ISO format (MM/DD/YYYY or
  DD-Mon-YYYY).
- Categories: every cleaned record carries the standard category for its
  counterparty (chart in the workbook); miscategorized records corrected
  in the cleaned data and the original category preserved alongside.
- Amounts: signed amounts normalized; bank figures treated as authoritative
  where a books amount was a digit transposition (flagged, see below).

## Mess found — planted classes vs found

| Mess class | Found |
|---|---|
| Duplicate lines in the bank export | 4 |
| Duplicate records in the books | 6 |
| Bank transactions missing from the books | 8 |
| Bank fees / interest present only in the bank | 5 |
| Books entries not on the bank statement (outstanding / timing) | 6 |
| Amount typos (adjacent-digit transposition) | 5 |
| Wrong / late-recorded dates | 5 |
| Payee name variants standardized (books records) | 17 |
| Miscategorized books records | 7 |
| Possible personal expenses flagged (not judged) | 5 |

## Reconciliation (to the cent)

| Line | Amount |
|---|---|
| Opening balance per bank statement | $4,250.00 |
| Books movement (cleaned, corrected) | $1,432.36 |
| Add: bank transactions not recorded in the books | $-614.97 |
| Less: outstanding books entries not on the statement | $320.75 |
| **Adjusted balance** | **$4,746.64** |
| Bank statement closing balance, as stated | $4,746.64 |
| **Difference** | **$0.00** |

Cross-check: opening $4,250.00 + total bank movement
$496.64 = $4,746.64 — agrees with the
stated closing balance.

## Matching summary

- Unique bank transactions: 86; unique books records: 79.
- Matched pairs: 73 (5 with an amount
  correction, 5 with a date correction).
- Match rate: 84.88% of bank
  transactions; 92.41% of books records.
- Every unmatched item is in the Exceptions_List tab with a reason code and
  the exact action recommended to the bookkeeper/owner. Total exceptions
  and flags: 44.

## Deliverable

`cleanup_workbook.xlsx` — Bank_Clean, Books_Clean, Reconciliation and
Exceptions_List tabs. Cleaned data only: no posting, filing or tax position
is made or implied by this sample.
