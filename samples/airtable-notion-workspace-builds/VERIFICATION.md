# VERIFICATION — Airtable / Notion Sample #9 (independent recomputation)

Script: verify_sample.py — re-reads only the delivered files (both schema.json
contracts, SCHEMA.md, BLUEPRINT.md, both guides, the templates, REPORT.md and the
eight CSVs); imports no builder code; every figure recomputed fresh.
Date: 2026-10-31

## Score: 45/45 checks passed = 100.0/100

| # | Check | Result | Detail |
|---|---|---|---|
| 1 | Airtable Clients: CSV header = schema.json field names in order | PASS | header ['Client ID', 'Client Name', 'Contact Name', 'Email', 'Industry', 'Status', 'Country', 'Client Since'] |
| 2 | Airtable Projects: CSV header = schema.json field names in order | PASS | header ['Project ID', 'Project Name', 'Client ID', 'Service Type', 'Status', 'Start Date', 'Due Date', 'Fee', 'Tasks Count', 'Total Task Hours', 'Billed Total', 'Paid Total', 'Outstanding'] |
| 3 | Airtable Tasks: CSV header = schema.json field names in order | PASS | header ['Task ID', 'Task Title', 'Project ID', 'Assignee', 'Status', 'Due Date', 'Hours'] |
| 4 | Airtable Invoices: CSV header = schema.json field names in order | PASS | header ['Invoice ID', 'Project ID', 'Client ID', 'Issue Date', 'Due Date', 'Amount', 'Amount Paid', 'Status', 'Outstanding'] |
| 5 | Airtable row counts = schema.json expected_counts (8/12/30/15) | PASS | {'Clients': 8, 'Projects': 12, 'Tasks': 30, 'Invoices': 15} |
| 6 | Airtable row counts = counts table in SCHEMA.md | PASS | doc {'Clients': 8, 'Projects': 12, 'Tasks': 30, 'Invoices': 15} vs csv {'Clients': 8, 'Projects': 12, 'Tasks': 30, 'Invoices': 15} |
| 7 | Airtable primary keys unique and non-empty in all 4 tables | PASS |  |
| 8 | Airtable Clients: every select value within its schema option list | PASS |  |
| 9 | Airtable Projects: every select value within its schema option list | PASS |  |
| 10 | Airtable Tasks: every select value within its schema option list | PASS |  |
| 11 | Airtable Invoices: every select value within its schema option list | PASS |  |
| 12 | Airtable: every date field parses as ISO YYYY-MM-DD | PASS |  |
| 13 | Airtable: every numeric/rollup/formula field is numeric (hours >= 0) | PASS |  |
| 14 | Airtable Clients: every Email is a well-formed email address | PASS |  |
| 15 | Airtable: Due Date on/after Start (projects) and Issue (invoices) dates | PASS |  |
| 16 | Airtable Projects: every Client ID resolves to a Clients row | PASS |  |
| 17 | Airtable Tasks: every Project ID resolves to a Projects row (no orphans) | PASS |  |
| 18 | Airtable Invoices: every Project ID and Client ID resolves | PASS |  |
| 19 | Airtable Invoices: Client ID equals the linked project's Client ID on all 15 | PASS |  |
| 20 | Airtable Projects: Tasks Count = independent recount of Tasks (all 12) | PASS |  |
| 21 | Airtable Projects: Total Task Hours = independent SUM of task Hours | PASS |  |
| 22 | Airtable Projects: Billed Total = SUM of non-Draft invoice Amounts | PASS |  |
| 23 | Airtable Projects: Paid Total = SUM of invoice Amount Paid | PASS |  |
| 24 | Airtable Projects: Outstanding = Billed - Paid (stored and recomputed) | PASS |  |
| 25 | Airtable Invoices: Outstanding = Amount - Amount Paid (all 15) | PASS |  |
| 26 | Airtable Invoices: money rules hold (0<=paid<=amount; Paid=>full; Draft=>0) | PASS |  |
| 27 | SCHEMA.md names every schema.json field and every view | PASS |  |
| 28 | SCHEMA.md writes out both formula definitions verbatim | PASS |  |
| 29 | Notion Clients DB: CSV header = schema.json property names in order | PASS | header ['Name', 'Client ID', 'Contact Name', 'Email', 'Industry', 'Status', 'Country', 'Client Since'] |
| 30 | Notion Projects DB: CSV header = schema.json property names in order | PASS | header ['Name', 'Project ID', 'Client ID', 'Service Type', 'Status', 'Start Date', 'Due Date', 'Fee'] |
| 31 | Notion Tasks DB: CSV header = schema.json property names in order | PASS | header ['Title', 'Task ID', 'Project ID', 'Assignee', 'Status', 'Due Date', 'Hours'] |
| 32 | Notion Invoices DB: CSV header = schema.json property names in order | PASS | header ['Invoice ID', 'Project ID', 'Client ID', 'Issue Date', 'Due Date', 'Amount', 'Amount Paid', 'Status'] |
| 33 | Notion row counts = schema.json expected_counts = BLUEPRINT.md counts table | PASS | csv {'Clients DB': 8, 'Projects DB': 12, 'Tasks DB': 30, 'Invoices DB': 15}, doc {'Clients DB': 8, 'Projects DB': 12, 'Tasks DB': 30, 'Invoices DB': 15} |
| 34 | Notion: every select value within its schema option list (all 4 DBs) | PASS |  |
| 35 | Notion: dates parse, numbers numeric, emails well-formed in all 4 DBs | PASS |  |
| 36 | Notion: relations resolve within the pack; invoice client = project client | PASS |  |
| 37 | Cross-pack Clients: IDs, names and all shared fields identical (8) | PASS |  |
| 38 | Cross-pack Projects: IDs, names and all shared fields identical (12) | PASS |  |
| 39 | Cross-pack Tasks: IDs, titles and all shared fields identical (30) | PASS |  |
| 40 | Cross-pack Invoices: IDs and all shared fields identical (15) | PASS |  |
| 41 | Notion templates: all 3 files exist (>100 bytes) and are named in BLUEPRINT.md | PASS |  |
| 42 | Guides: IMPORT-GUIDE names all 4 tables; SETUP-GUIDE names all 4 databases | PASS |  |
| 43 | Fictional marker in SCHEMA.md, BLUEPRINT.md, REPORT.md; REPORT states no live build | PASS |  |
| 44 | REPORT.md headline totals = independent recomputation | PASS | billed 27850.00, paid 23150.00, outstanding 4700.00 |
| 45 | Idempotency: re-running build_pack.py reproduces all 8 CSVs byte-identically | PASS |  |

## Verdict: PASS — 100/100

Method notes: CSV headers are compared column-for-column against both schema.json
contracts; select values against the defined option lists; every linked key is
resolved against its target table; invoice client consistency is checked against
the linked project's client on all 15 invoices; each rollup/formula column in
projects.csv and invoices.csv is recomputed from the child tables alone (Billed
Total excludes Draft invoices, per SCHEMA.md); the counts printed in SCHEMA.md and
BLUEPRINT.md are parsed and matched to the actual row counts; overlapping entities
are compared field-by-field across the two packs; REPORT.md's headline money totals
are parsed and matched to the recomputation; idempotency is proven by re-running
the build in a temp copy and byte-diffing all eight CSVs.
