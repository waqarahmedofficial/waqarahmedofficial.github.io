# Sample #5 — technical documentation and SaaS help-centres

## What was built

A complete documentation set for **InvoiceNest**, a fictional invoicing SaaS invented for this sample. No real company, real API or real customer data is used anywhere in the set.

| File | Contents |
|---|---|
| `STYLE-SHEET.md` | The contract: canonical product facts (product name, base URL https://api.invoicenest.com/v1, API key and ID formats), terminology table, voice and formatting rules. Written first; every other document follows it. |
| `API-REFERENCE.md` | REST API reference: authentication, conventions, one error shape with 8 defined error codes, 8 object tables, and 10 endpoints — for each: description, auth, parameter or request-body table with types, a worked `curl` example, an example JSON response and an error table. Closes with the webhook delivery and retry rules. |
| `GETTING-STARTED.md` | Beginner guide in 6 numbered steps: account setup, test API key, first call (create a customer), create an invoice, send it, record a payment — plus next steps and a troubleshooting table keyed to the reference's error codes. |
| `SOP-FAILED-WEBHOOK-DELIVERY.md` | Internal support SOP (SOP-SUP-014): purpose, scope, background, roles, a 12-step procedure, common response patterns, a 3-level escalation path and a 7-item closure checklist. |
| `verify_docs.py` | Independent checker. Re-reads only the delivered Markdown files and mechanically re-verifies every consistency claim (see `VERIFICATION.md`). |
| `VERIFICATION.md` | The audit result: 26 checks, recomputed from the delivered files alone. |

## The fictional product at a glance

- Customers (`cus_` IDs), invoices (`inv_`), payments (`pay_`), webhook endpoints (`we_`) and webhook events (`evt_`).
- Money is always integer cents; $250.00 in prose is always `25000` in JSON, and every invoice example satisfies `amount_remaining = amount_due - amount_paid` with line items summing to `amount_due`.
- One worked example runs through the whole set with the same values: customer Marlowe Design Co. (`cus_5Rt8Vw2Yz6Ab`), invoice `INV-1042` (`inv_7Kd29PxQ4mLw`), one payment of 25000, and the `invoice.paid` webhook event that the SOP teaches support to trace.

## How consistency was enforced

Internal consistency is the failure mode of real documentation work, so the sample was built contract-first (style sheet before prose) and then audited by script rather than by eye: the checker parses the reference's own object tables and holds every JSON example, request-body table, cross-reference and shared value in all four documents to them. The full method, the check-by-check results and the build history (including the one first-run failure and its cause) are in `VERIFICATION.md`.

## Scope fence

This is a documentation sample for a fictional product. It demonstrates documentation skill only: no live API exists behind these documents, no help-centre was published, and nothing here is offered for sale — the sample sits behind the program gate like every other sample in this register.
