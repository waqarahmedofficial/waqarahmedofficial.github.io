# Setup Guide — Building the Notion Workspace from This Pack

Exact steps to rebuild the Northlight Studio team workspace (CLEARLY
FICTIONAL sample data) in any Notion workspace.

## Step 0 — Pages
1. Create a page `Northlight Studio — Home`.
2. Under it, create pages: `Clients`, `Projects`, `Tasks`, `Finance`,
   `SOPs`, `Templates` (the page tree in BLUEPRINT.md).

## Step 1 — Clients DB
1. On the Clients page, create a full-page database named `Clients DB`.
2. Add the properties of BLUEPRINT.md Database 1 in order (Name, Client
   ID, Contact Name, Email, Industry, Status, Country, Client Since),
   with the types and select options given there.
3. Import `clients_db.csv` (database menu → Import → CSV) and map each
   column to the same-named property. Result: 8 rows.

## Step 2 — Projects DB
1. On the Projects page, create `Projects DB` with the properties of
   BLUEPRINT.md Database 2, but create `Client ID` as a **Relation** to
   Clients DB.
2. Import `projects_db.csv`; the Client ID column supplies the relation
   by matching client IDs. Result: 12 rows.
3. Add a board view grouped by Status.

## Step 3 — Tasks DB
1. On the Tasks page, create `Tasks DB` per BLUEPRINT.md Database 3,
   with `Project ID` as a Relation to Projects DB.
2. Import `tasks_db.csv`. Result: 30 rows.
3. Add a board view grouped by Status and a table view grouped by
   Assignee.

## Step 4 — Invoices DB
1. On the Finance page, create `Invoices DB` per BLUEPRINT.md Database 4,
   with `Project ID` as a Relation to Projects DB and `Client ID` as a
   Relation to Clients DB.
2. Import `invoices_db.csv` (its first column, Invoice ID, becomes the
   page title). Result: 15 rows.
3. Add a linked view filtered to Status = Sent or Overdue, named Unpaid.
4. Spot-check: every invoice's Client ID equals its project's Client ID.

## Step 5 — Templates
1. On the Templates page, create one template button per file in
   `templates/`: `project-kickoff.md`, `client-onboarding.md`,
   `weekly-check-in.md`.
2. Paste each file's body into the matching template, keeping its section
   headings exactly.

## Step 6 — Home dashboard and final reconciliation
1. On Home, add linked views of Projects DB (board, Status) and Tasks DB
   (Open tasks: Status != Done), plus links to Clients, Finance, SOPs
   and Templates.
2. Row counts must read: Clients DB 8 · Projects DB 12 · Tasks DB 30 ·
   Invoices DB 15, with no unresolved relation values.
