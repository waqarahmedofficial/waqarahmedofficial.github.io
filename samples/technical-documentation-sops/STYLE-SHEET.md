# InvoiceNest documentation style and terminology sheet

This sheet is the contract for every InvoiceNest document. The API reference, the getting-started guide and the support SOPs are written against it, and the consistency audit checks them against the values fixed here.

## Canonical product facts

| Item | Canonical value |
|---|---|
| Product name | InvoiceNest |
| API base URL | https://api.invoicenest.com/v1 |
| Dashboard URL | https://app.invoicenest.com |
| Support email | support@invoicenest.com |
| API key format | The prefixes `in_live_` (live mode) and `in_test_` (test mode), each followed by exactly 24 letters or digits |
| Example test API key | `in_test_4f8Kd2Px9Qm7Lw3Rt6Vz1Hs5` |
| Resource ID formats | `inv_` (invoice), `cus_` (customer), `pay_` (payment), `we_` (webhook endpoint), `evt_` (webhook event), each followed by exactly 12 letters or digits |
| Money in the API | Integer amounts in the smallest currency unit (cents for USD) |
| Dates in the API | Calendar dates as `YYYY-MM-DD`; timestamps as ISO 8601 UTC, for example `2026-01-15T09:30:00Z` |

## Terminology

Use the term in the left column. The right column lists forms that must not appear in published documents.

| Use | Do not use |
|---|---|
| InvoiceNest | Invoice Nest, Invoicenest, invoicenest (except inside URLs and email addresses) |
| API key | API Key, apikey, API token |
| webhook | web-hook, web hook |
| dashboard | Dashboard (as a common noun), admin panel |
| customer | client, account (for the person or business being invoiced) |
| record a payment | pay an invoice (from the merchant's side), settle a payment |
| email | e-mail |
| test mode / live mode | sandbox / production mode |

Product terms:

- An **invoice** is the document a user sends to a customer. It is never called a bill in user-facing text.
- A **payment** is money recorded against one invoice. One invoice can have several payments until `amount_remaining` reaches zero.
- A **webhook endpoint** is a URL the customer registers to receive event notifications. A single notification is a **delivery**; one delivery can be attempted several times.
- Invoice statuses are written in lowercase in code (`draft`, `open`, `paid`, `void`, `uncollectible`) and in lowercase in prose on first use with the code form shown, for example: the invoice moves to paid (`paid`).

## Voice and tone

- Getting-started and how-to content: second person ("you create a customer"), present tense, one action per step.
- API reference: neutral, declarative sentences. Describe what the endpoint does before its parameters.
- SOPs: imperative steps addressed to the role performing them; every step is one action that can be checked off.
- Be direct about errors and limits. Never promise that a retry, replay or escalation will succeed; say what to check and what happens next.
- No marketing language in technical documents: no superlatives, no exclamation marks.

## Formatting rules

- Headings use sentence case. Only the product name and other proper nouns are capitalised inside a heading.
- Endpoint names, field names, status values, IDs and API keys are always in `code formatting`.
- Every endpoint is named by method and path together, for example `POST /invoices`, never by path alone.
- JSON examples are complete, valid JSON. Never shorten an example with an ellipsis.
- Money in prose is written with a currency symbol and two decimals ($250.00) and must equal the integer cent amount used in the paired JSON example.
- Tables list required request fields before optional ones.
- Dates in prose examples follow the API formats above; never write a date in a locale format such as 15/01/2026.
