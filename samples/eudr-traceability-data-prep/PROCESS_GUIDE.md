# Process Guide — EUDR Supplier Traceability Data Prep (service delivery)

How this service runs for a real EU importer client, step by step. This guide is the
basis for the future A-to-Z service listing. **Scope fence: data preparation and
validation only.** We do not give legal advice, we do not make the client's
deforestation-free/risk decision, and we do not submit due diligence statements
in the EU Information System on the client's behalf (the operator submits under
its own EORI and responsibility; we hand over a statement-ready data pack).

## Step 0 — Engagement & role check (before any data moves)
- Confirm the client's role under Regulation (EU) 2023/1115 as amended by
  Regulation (EU) 2025/2650: operator (first placer), downstream operator/trader,
  or micro/small primary operator — and their application date (30 Dec 2026 for
  large/medium operators and all downstream operators/traders; 30 Jun 2027 for
  natural persons and micro/small operators).
- Confirm in-scope products: match the client's SKUs against Annex I (seven
  commodities: cattle, cocoa, coffee, oil palm, rubber, soya, wood + listed
  derived products) and record HS/CN codes.
- Agree the data boundary in writing: supplier data the client holds, data
  suppliers must still provide, and who signs off exceptions.

## Step 1 — Intake
- Client sends whatever exists today: supplier lists (Excel/ERP export), purchase
  contracts, invoices, existing coordinate files (CSV/KML/GeoJSON/shapefiles),
  certificates, permits, prior statements' reference numbers.
- We log every file received in an intake register (file, date, source, version).

## Step 2 — Data audit (gap analysis)
We rebuild the client's supply data into three standard tables:
1. **Supplier register** — one row per supplier: legal name, country of
   production, commodity, HS code, named contact + role + email, postal address,
   contracted/annual volume, country risk benchmark (low/standard/high per the
   Commission's benchmarking implementing act), legality-evidence status.
2. **Plot geolocation register** — one row per production plot: plot ID,
   supplier, area (ha), geometry type, coordinates. Rules enforced here:
   latitude/longitude with **at least 6 decimal places**; **single point for
   plots of 4 ha or less; polygon (perimeter points) for plots over 4 ha**
   (cattle: establishment point). Export as CSV + GeoJSON (WGS84, [lon, lat]).
3. **Consignment (due-diligence) data pack** — one row per shipment/lot with the
   Annex II statement data: operator name/address/EORI, activity type, product
   description + HS code, net mass (kg), country of production, supplier,
   plot IDs, production date/time range, legality evidence, deforestation-free
   evidence, and a statement-ready flag.
- Output of the audit: a **gap list** (exceptions report) — every missing,
  invalid or inconsistent item, each classified:
  - **FIXABLE-BY-US** — format/completeness problems we correct from data the
    client already holds (duplicate IDs, transcription/quantity errors,
    coordinate reformatting, precision fixes).
  - **CLIENT-ACTION** — evidence only the client or supplier can supply
    (missing plot coordinates, missing legality documents, re-capture of an
    invalid plot boundary, land-use-history evidence).

## Step 3 — Collection templates (closing the gaps)
- We issue the client/suppliers simple fill-in templates (spreadsheet + a
  one-page instruction sheet): supplier data form, plot capture sheet
  (smartphone GNSS instructions — point vs polygon, 6 decimals), and a legality
  document checklist per country (land-use rights, producer licence, national
  registration, harvest/transport permits as applicable).
- Returned data is version-logged; nothing is overwritten silently.

## Step 4 — Validation (the core paid work)
Automated + manual checks on every pack, including:
- Completeness: every Annex II field present or exception-listed.
- Geolocation validity: coordinate ranges, 6-decimal precision, point/polygon
  rule vs plot size, polygon closure and minimum perimeter points, GeoJSON
  structure and coordinate order, duplicate plot IDs.
- Temporal consistency: production date ranges vs the **31 December 2020
  deforestation cut-off** — any claim that cannot be reconciled with the
  consignment's harvest window or lacks land-use-history evidence is flagged,
  never silently passed.
- Reconciliation: consignment quantities sum to supplier contracted volumes;
  every plot referenced by a consignment belongs to that supplier; every
  supplier in a consignment exists in the register.
- Evidence status: legality and deforestation-free evidence on file per
  supplier/plot, or on the exceptions list.
- Deliverable: validation report + exceptions list with owners and required
  actions (as in this sample: `validation_report.md`, `exceptions.csv`).

## Step 5 — Statement-ready pack & handover
- Final pack: supplier register, plot register (CSV + GeoJSON), consignment
  pack (CSV/XLSX) with a statement-ready flag per consignment.
- Consignments with open CLIENT-ACTION exceptions are marked **not
  statement-ready**; we never mark a blocked consignment ready.
- The client (operator) reviews, runs its own Article 10 risk assessment and
  Article 11 mitigation, and submits its due diligence statements in the EU
  Information System under its own responsibility.
- Records are organised for the 5-year retention duty.

## Step 6 — Maintenance (optional recurring)
- New suppliers/plots onboarded through the same templates; packs re-validated
  each season; reference numbers of submitted statements logged against
  consignments; annual re-check ahead of the client's review cycle.

## Honest limits (state these to every client)
- Data preparation and validation only — **not legal advice** and not a
  compliance certification; satellite deforestation screening can be coordinated
  with specialist providers but is not performed by this service.
- We cannot create missing evidence: coordinates, permits and land documents
  must come from the client/suppliers. Deadlines depend on supplier response.
- Regulation is still being amended (application dates moved twice already);
  packs are built to the consolidated requirements in force at delivery date.
