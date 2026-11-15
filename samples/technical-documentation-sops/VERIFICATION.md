# VERIFICATION — Technical Documentation Sample #5 (independent consistency audit)

Script: verify_docs.py — re-reads only the delivered Markdown files; there is no generator code to import; every claim below is recomputed from the delivered files alone.
Date: 2026-10-31

## Score: 26/26 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | All four content documents exist and are non-empty | PASS | API reference, getting-started, SOP, style sheet |
| 2 | No placeholder text (TODO/TBD/FIXME/Lorem/XXX) in the documents | PASS | scanned 5 files (the four documents + REPORT.md) |
| 3 | Shared field names have one consistent type across all object tables | PASS | 8 object tables, 34 distinct fields, no type conflicts |
| 4 | Product name is exactly 'InvoiceNest' everywhere in the compliant documents | PASS | no variant spellings |
| 5 | Banned terminology variants (style sheet) are absent from the compliant documents | PASS | checked 6 banned forms |
| 6 | Base URL from the style sheet is used for every API URL in all documents | PASS | base: https://api.invoicenest.com/v1 |
| 7 | Every API key token matches the format (prefix + 24 characters) | PASS | 17 key tokens, all prefix + 24 |
| 8 | The same example test API key is used in the API reference and the getting-started guide | PASS | shared: in_test_ + 24 chars, identical string in both |
| 9 | Every resource ID token matches its format (prefix + 12 characters) | PASS | 40 ID tokens, all prefix + 12 |
| 10 | The canonical customer ID and invoice ID are shared by the API reference and the guide | PASS | 1 shared customer ID, 1 shared invoice ID |
| 11 | API reference defines at least 6 endpoints | PASS | 10 endpoints defined (requirement was 6) |
| 12 | Every endpoint used in the getting-started guide exists in the API reference | PASS | 12 endpoint uses, all resolve (method + path, concrete IDs canonicalised to path parameters) |
| 13 | Every endpoint mentioned in the SOP exists in the API reference | PASS | 2 endpoint mentions, all resolve |
| 14 | Every JSON example in the documents parses as valid JSON | PASS | 17 JSON blocks, all valid |
| 15 | Resource objects strictly match their reference field tables (names and types) | PASS | all resource/error/line-item objects conform |
| 16 | Error objects use only codes defined in the global error table | PASS | 8 global codes defined |
| 17 | Every JSON field that shares a name with a reference field has the reference type | PASS | union type check clean across all examples |
| 18 | Invoice arithmetic holds in every invoice example (remaining = due − paid; line items sum to due) | PASS | 7 invoice examples, arithmetic exact |
| 19 | Error codes used in endpoint error tables all come from the global error table | PASS | 5 codes used, all defined |
| 20 | Every endpoint section is complete (auth, request example, JSON response, errors, path parameters) | PASS | all 10 sections complete |
| 21 | Request-body field tables match the object tables (names and types) | PASS | all request-body fields agree |
| 22 | SOP contains purpose, scope, roles, procedure, escalation and checklist sections | PASS | all 6 sections present |
| 23 | SOP procedure steps are numbered sequentially with no gaps | PASS | steps found: 1–12 |
| 24 | SOP closure checklist has at least 5 items | PASS | 7 checklist items |
| 25 | Getting-started steps are numbered sequentially with no gaps | PASS | steps found: 1–6 |
| 26 | Webhook retry figures agree between the API reference and the SOP (5 attempts, 24 hours) | PASS | both documents state up to 5 attempts over 24 hours |

## Verdict: PASS — 100/100

Method notes: the checker parses the API reference's own object tables (invoice, line item, customer, payment, webhook endpoint, list, deletion response, error) and holds the delivered documents to them: every fenced JSON block in the four documents is parsed and walked — resource objects are validated strictly against their table (fields and types), and every field name appearing anywhere in any example is type-checked against the merged table map. Endpoint cross-references are extracted from both prose mentions (method + path in code formatting) and the guide's `curl` commands, with concrete resource IDs canonicalised to the reference's path parameters before matching. Product-name and terminology-variant checks scan the three documents that must follow the style sheet (reference, guide, SOP), with URLs and email addresses stripped first; the style sheet itself is the rule source and legitimately lists the banned forms. Placeholder scanning covers the four documents plus REPORT.md. VERIFICATION.md itself is not scanned — it is the audit record and quotes the check definitions.

Build history (honesty record): the first checker run scored 25/26. The single failure was in the checker, not in any document: check 6 captured the sentence-ending full stop after the base URL in the getting-started guide ("…is https://api.invoicenest.com/v1.") as part of the URL and flagged it as a non-base URL. The documents were correct as written; the checker was fixed to strip trailing sentence punctuation from extracted URLs, and the re-run passed 26/26. The final run reported above was executed after REPORT.md was written, so the placeholder scan covers all five delivered documents. Raw checker output: verification_log.txt.

Scope note: this audit verifies internal consistency of a documentation set for a fictional product, which is what the sample claims. It does not verify any live API behaviour — no such API exists.
