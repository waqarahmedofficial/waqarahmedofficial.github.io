# Notion Workspace Blueprint — Northlight Studio, Team Workspace

**Northlight Studio is a CLEARLY FICTIONAL content & brand design agency**,
invented for this sample. Every client, person, email and amount below is
made up (emails use the reserved `.example` domain). This document is the
blueprint contract for the workspace; `schema.json` is the same contract in
machine-readable form, and the CSVs in this folder are the databases'
contents in import-ready form. The workspace mirrors the companion
Airtable base (same clients, projects, tasks and invoices — same IDs and
names) so the two packs can be checked against each other. No live Notion
account was used to build this pack.

## Operating need

The same four-person agency runs its day-to-day teamwork in Notion: a home
dashboard, the four databases below, SOP pages, and reusable page
templates for recurring work (project kickoffs, client onboarding, weekly
check-ins).

## Page tree

```
Northlight Studio — Home (dashboard: linked views of Projects DB and Tasks DB, quick links)
├── Clients (page hosting Clients DB, full-page database)
├── Projects (page hosting Projects DB, board view by Status)
├── Tasks (page hosting Tasks DB, board view by Status + table by Assignee)
├── Finance (page hosting Invoices DB, table view + Unpaid linked view)
├── SOPs (page: how the studio runs — links to process pages)
└── Templates (page: template buttons + the template files in templates/)
```

## Dataset counts

| Database | Rows |
|---|---|
| Clients DB | 8 |
| Projects DB | 12 |
| Tasks DB | 30 |
| Invoices DB | 15 |

## Database 1 — Clients DB (clients_db.csv)

| Property | Type | Notes |
|---|---|---|
| Name | Title | Client company name |
| Client ID | Text | CL-001 … — matches the Airtable base exactly |
| Contact Name | Text | |
| Email | Email | |
| Industry | Select | Beauty & Wellness / Food & Beverage / Retail / Professional Services / Health & Fitness |
| Status | Select | Active / Prospect / Past Client |
| Country | Text | |
| Client Since | Date | ISO YYYY-MM-DD |

## Database 2 — Projects DB (projects_db.csv)

| Property | Type | Notes |
|---|---|---|
| Name | Title | Project name |
| Project ID | Text | PRJ-001 … |
| Client ID | Relation → Clients DB | Stored in the CSV as the client ID; must resolve to a Clients DB row |
| Service Type | Select | Brand Identity / Website Design / Content Retainer / Social Media Pack |
| Status | Select | Discovery / Design / In Review / Delivered / On Hold |
| Start Date | Date | ISO YYYY-MM-DD |
| Due Date | Date | On or after Start Date |
| Fee | Number | Agreed project fee, USD |

## Database 3 — Tasks DB (tasks_db.csv)

| Property | Type | Notes |
|---|---|---|
| Title | Title | Task title |
| Task ID | Text | TSK-001 … |
| Project ID | Relation → Projects DB | Stored in the CSV as the project ID; must resolve to a Projects DB row |
| Assignee | Select | Amara Reyes / Ben Okafor / Priya Nair / Tom Becker |
| Status | Select | To Do / In Progress / Done |
| Due Date | Date | ISO YYYY-MM-DD |
| Hours | Number | Estimated/logged hours |

## Database 4 — Invoices DB (invoices_db.csv)

| Property | Type | Notes |
|---|---|---|
| Invoice ID | Title | INV-001 … (the page title is the invoice ID) |
| Project ID | Relation → Projects DB | Stored in the CSV as the project ID |
| Client ID | Relation → Clients DB | Must match the linked project's Client ID |
| Issue Date | Date | ISO YYYY-MM-DD |
| Due Date | Date | On or after Issue Date |
| Amount | Number | USD |
| Amount Paid | Number | USD |
| Status | Select | Draft / Sent / Paid / Overdue |

## Relations at a glance

Clients DB 1—n Projects DB (via Projects DB.Client ID) · Projects DB 1—n
Tasks DB (via Tasks DB.Project ID) · Projects DB 1—n Invoices DB (via
Invoices DB.Project ID) · Clients DB 1—n Invoices DB (via Invoices
DB.Client ID, always consistent with the project's client).

## Page templates (in templates/)

Recurring pages are created from these exact templates; each file is the
full page body including its section headings and the database properties
to set:

- `project-kickoff.md` — new-project page: brief, deliverables, milestones,
  linked Tasks DB view placeholder, risks.
- `client-onboarding.md` — new-client page: contacts, brand assets,
  access checklist, first-project placeholder.
- `weekly-check-in.md` — weekly client check-in note: done this week,
  in progress, blockers, next steps, linked project.
