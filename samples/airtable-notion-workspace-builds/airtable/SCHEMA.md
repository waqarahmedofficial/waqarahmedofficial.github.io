# Airtable Base Schema — Northlight Studio, Operations Base

**Northlight Studio is a CLEARLY FICTIONAL content & brand design agency**,
invented for this sample. Every client, person, email and amount below is
made up (emails use the reserved `.example` domain). This document is the
schema contract for the base; `schema.json` is the same contract in
machine-readable form, and the four CSVs in this folder are the base's data
in import-ready form. No live Airtable account was used to build this pack.

## Operating need

A four-person agency (founder/creative director, designer, content lead,
project coordinator) tracks client relationships, project delivery, task
workload and invoicing in one operations base instead of scattered
spreadsheets: who the client is → what projects are running → which tasks
make up each project → what has been billed and paid per project.

## Dataset counts

| Table | Rows |
|---|---|
| Clients | 8 |
| Projects | 12 |
| Tasks | 30 |
| Invoices | 15 |

## Table 1 — Clients (clients.csv)

One row per client company. Primary key: Client ID.

| Field | Type | Notes |
|---|---|---|
| Client ID | Single line text | Primary key, format CL-001 … |
| Client Name | Single line text | |
| Contact Name | Single line text | Main contact person |
| Email | Email | |
| Industry | Single select | Beauty & Wellness / Food & Beverage / Retail / Professional Services / Health & Fitness |
| Status | Single select | Active / Prospect / Past Client |
| Country | Single line text | |
| Client Since | Date | ISO YYYY-MM-DD |

Views: **All Clients** (grid) · **Active Clients** (grid, filter Status =
Active) · **Prospects** (grid, filter Status = Prospect).

## Table 2 — Projects (projects.csv)

One row per engagement. Primary key: Project ID. Client ID is a
linked-record field to Clients.

| Field | Type | Notes |
|---|---|---|
| Project ID | Single line text | Primary key, format PRJ-001 … |
| Project Name | Single line text | |
| Client ID | Linked record → Clients | Every value must resolve to a Clients row |
| Service Type | Single select | Brand Identity / Website Design / Content Retainer / Social Media Pack |
| Status | Single select | Discovery / Design / In Review / Delivered / On Hold |
| Start Date | Date | ISO YYYY-MM-DD |
| Due Date | Date | On or after Start Date |
| Fee | Currency | Agreed project fee, USD |
| Tasks Count | Rollup | COUNT of linked Tasks records |
| Total Task Hours | Rollup | SUM of {Hours} over linked Tasks records |
| Billed Total | Rollup | SUM of {Amount} over linked Invoices where Status is not Draft |
| Paid Total | Rollup | SUM of {Amount Paid} over linked Invoices |
| Outstanding | Formula | `{Billed Total} - {Paid Total}` |

The rollup and formula columns are pre-computed in `projects.csv` so the
imported values can be validated before the live fields are wired up; in
Airtable they are created as real rollup/formula fields with the
definitions above and then agree with the CSV values exactly.

Views: **All Projects** (grid) · **Delivery Board** (kanban, grouped by
Status) · **With Outstanding Balance** (grid, filter Outstanding > 0).

## Table 3 — Tasks (tasks.csv)

One row per unit of work. Primary key: Task ID. Project ID is a
linked-record field to Projects.

| Field | Type | Notes |
|---|---|---|
| Task ID | Single line text | Primary key, format TSK-001 … |
| Task Title | Single line text | |
| Project ID | Linked record → Projects | Every value must resolve to a Projects row |
| Assignee | Single select | Amara Reyes / Ben Okafor / Priya Nair / Tom Becker |
| Status | Single select | To Do / In Progress / Done |
| Due Date | Date | ISO YYYY-MM-DD |
| Hours | Number | Estimated/logged hours, one decimal |

Views: **All Tasks** (grid) · **Open Tasks** (grid, filter Status != Done) ·
**By Assignee** (grid, grouped by Assignee).

## Table 4 — Invoices (invoices.csv)

One row per invoice. Primary key: Invoice ID. Project ID links to
Projects; Client ID links to Clients and **must equal the Client ID of the
linked project** (the invoice's client is always the project's client).

| Field | Type | Notes |
|---|---|---|
| Invoice ID | Single line text | Primary key, format INV-001 … |
| Project ID | Linked record → Projects | Every value must resolve to a Projects row |
| Client ID | Linked record → Clients | Must match the linked project's Client ID |
| Issue Date | Date | ISO YYYY-MM-DD |
| Due Date | Date | On or after Issue Date |
| Amount | Currency | USD |
| Amount Paid | Currency | Rule: 0 ≤ Amount Paid ≤ Amount; Status = Paid implies Amount Paid = Amount; Status = Draft implies Amount Paid = 0 |
| Status | Single select | Draft / Sent / Paid / Overdue |
| Outstanding | Formula | `{Amount} - {Amount Paid}` |

Draft invoices are excluded from the Projects Billed Total rollup (a draft
is not yet billed); the moment a draft is sent it counts.

Views: **All Invoices** (grid) · **Unpaid** (grid, filter Status = Sent or
Status = Overdue) · **Drafts** (grid, filter Status = Draft).

## Relationships at a glance

Clients 1—n Projects (via Projects.Client ID) · Projects 1—n Tasks (via
Tasks.Project ID) · Projects 1—n Invoices (via Invoices.Project ID) ·
Clients 1—n Invoices (via Invoices.Client ID, always consistent with the
project's client).
