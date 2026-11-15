# Import Guide — Recreating the Airtable Base from This Pack

Exact steps to rebuild the Northlight Studio operations base (CLEARLY
FICTIONAL sample data) in any Airtable workspace. No step needs a paid
feature beyond linked records, rollups and formulas, which are part of
Airtable's standard field types.

## Step 0 — Create the base
1. Create a new blank base named `Northlight Studio — Operations`.
2. Rename the default table to `Clients`. Create three more tables:
   `Projects`, `Tasks`, `Invoices`.

## Step 1 — Clients table
1. Add the fields of SCHEMA.md Table 1 in the order listed (Client ID,
   Client Name, Contact Name, Email, Industry, Status, Country, Client
   Since), with the types and select options given there.
2. Import `clients.csv` (Airtable: table menu → Import data → CSV file).
   Map each CSV column to the same-named field. Result: 8 records.

## Step 2 — Projects table
1. Add the plain fields first: Project ID, Project Name, Service Type,
   Status, Start Date, Due Date, Fee.
2. Add `Client ID` as a **Link to another record** field pointing at
   Clients (link by the Client ID value on import).
3. Import `projects.csv` WITHOUT the five computed columns (Tasks Count,
   Total Task Hours, Billed Total, Paid Total, Outstanding) — those are
   created as live fields in Step 5. Result: 12 records.
4. Keep the CSV's computed columns as the acceptance values for Step 5.

## Step 3 — Tasks table
1. Add the fields of SCHEMA.md Table 3. `Project ID` is a Link field to
   Projects.
2. Import `tasks.csv`. Result: 30 records.

## Step 4 — Invoices table
1. Add the fields of SCHEMA.md Table 4 except Outstanding. `Project ID`
   links to Projects; `Client ID` links to Clients.
2. Import `invoices.csv` without the Outstanding column. Result: 15
   records. Spot-check: every invoice's Client ID equals its project's
   Client ID.

## Step 5 — Computed fields (definitions from SCHEMA.md)
1. Projects → add rollup `Tasks Count`: over linked Tasks, COUNT records.
2. Projects → add rollup `Total Task Hours`: over linked Tasks,
   SUM of Hours.
3. Projects → add rollup `Billed Total`: over linked Invoices, SUM of
   Amount, with the condition Status is not Draft.
4. Projects → add rollup `Paid Total`: over linked Invoices, SUM of
   Amount Paid.
5. Projects → add formula `Outstanding`: `{Billed Total} - {Paid Total}`.
6. Invoices → add formula `Outstanding`: `{Amount} - {Amount Paid}`.
7. Acceptance check: every computed value now equals the corresponding
   value in the pack's `projects.csv` / `invoices.csv` exactly.

## Step 6 — Views
Create the views listed in SCHEMA.md per table: **All Clients**,
**Active Clients**, **Prospects** · **All Projects**, **Delivery Board**
(kanban by Status), **With Outstanding Balance** · **All Tasks**,
**Open Tasks**, **By Assignee** · **All Invoices**, **Unpaid**, **Drafts**.

## Step 7 — Final reconciliation
Record counts must read: Clients 8 · Projects 12 · Tasks 30 · Invoices
15, and no linked-record cell may show an unresolved value.
