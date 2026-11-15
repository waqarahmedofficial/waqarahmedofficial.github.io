# REPORT — EUDR Supplier Traceability Data Prep: Sample Build (Register #7)

Date: 2026-10-28 · Status: sample built and independently verified · All data synthetic.
Sample client: **Nordhaven Foods GmbH** (fictional EU importer, Hamburg).

## 1. Official requirements summary (Regulation (EU) 2023/1115, as amended)

- **Scope:** seven commodities — cattle, cocoa, coffee, oil palm, rubber, soya,
  wood — plus the derived products listed in Annex I (e.g. cocoa beans HS 1801,
  green coffee HS 0901, chocolate, leather, tyres, furniture).
- **Core prohibition (Art. 3):** a relevant product may be placed/exported only if
  (a) deforestation-free, (b) produced in accordance with the legislation of the
  country of production, and (c) covered by a due diligence statement.
- **Deforestation cut-off:** land not subject to deforestation **after
  31 December 2020** (forest degradation limb applies to wood).
- **Due diligence:** information collection (Art. 9, records kept 5 years),
  risk assessment (Art. 10), risk mitigation (Art. 11); statement (Annex II)
  submitted via the EU Information System before placing on the market.
- **Annex II statement data:** operator name/address and EORI (import/export),
  activity type, product description + HS code, quantity (net mass kg), country
  of production, geolocation of **all** plots, reference numbers of any upstream
  statements relied on, and the prescribed declaration wording.
- **Geolocation rules (Art. 9(1)(d) + Commission FAQ):** latitude/longitude with
  **at least six decimal digits**; plots of **4 ha or less** — single point (or
  polygon); plots of **more than 4 ha** (non-cattle) — **polygon** of perimeter
  points; cattle establishments — single point. Supplied as GeoJSON (WGS84).
  Article 9 records also include the **date or time range of production** and
  supplier/customer names, postal and email addresses.
- **2025 simplification (Regulation (EU) 2025/2650):** only the operator who
  first places the product submits statements; downstream operators/traders keep
  the reference numbers (non-SME downstream actors register in the system);
  micro/small primary operators in low-risk countries file a one-off simplified
  declaration (Annex III) and may use a postal address instead of geolocation.
- **Country benchmarking (May 2025 implementing act):** low / standard / high
  risk (high: Belarus, Myanmar, North Korea, Russia). Ghana, Côte d'Ivoire,
  Ethiopia and Colombia — the sample's origins — are standard risk, so full due
  diligence applies.

## 2. Application deadline — as officially stated today (verified 2026-10-28)

Per the European Commission's Access2Markets news page on Regulation
(EU) 2025/2650 (page crawled 2026-10-27):

- **30 December 2026** — large and medium-sized operators, and **all downstream
  operators and traders** (plus micro/small for ex-EUTR Annex products).
- **30 June 2027** — operators who are natural persons and micro/small
  enterprises for the remaining products.

⚠️ Caution flag: one secondary trade-press item (precisionfeed.org, not an
official source) claims the Commission proposed a *further* 12-month delay on
2 Oct 2026 (to Dec 2027). **This is NOT confirmed on any official Commission
page checked today** — the official page still states 30 Dec 2026 / 30 Jun 2027.
We record the official dates as current law and the press claim as unverified.

## 3. Price evidence

Direct evidence was found (the register's "CBAM analogy only" gap is now closed
for a first anchor, though the market is young and quotes vary):

- **Concierge/co-ordination service for cocoa exporters (EUDR Compliance
  Indonesia, prices as of 2026):** supplier/plot mapping sprint from
  **IDR 18,000,000 ≈ USD 1,110** (single cooperative); full DDS package from
  **IDR 45,000,000 ≈ USD 2,780**; written quote before work; excludes
  certification/lab fees. — the closest direct comparator to our service.
- **EudrFlow (software, not a service):** €199 automated assessment, one
  commodity, up to 25 suppliers.
- **Proven™ (verification SaaS):** US$150/month (suppliers), US$450/month
  (buyers).
- **Third-party compliance platforms** for SME-scale operations: reported
  €5,000–25,000 per year (industry guide).
- Estimated compliance cost: €5–15/tonne (integrated chains) to €25–50/tonne
  (smallholder chains), dominated by data acquisition and polygon validation.
- Analyst commentary: full EUDR compliance for a mid-sized operator runs from
  low six to low seven figures EUR per year — the data-acquisition share is the
  part this service addresses.

## 4. What was built (this folder)

| File | Content |
|---|---|
| `supplier_register.csv` / `.xlsx` | 15 fictional suppliers (cocoa: Ghana, Côte d'Ivoire; coffee: Ethiopia, Colombia), contacts, volumes, risk class, evidence status |
| `plot_geolocation.csv` | 45 production plots — points (≤4 ha), polygons ≥6 pairs (>4 ha), 6-decimal coordinates, production windows |
| `plots.geojson` | GeoJSON FeatureCollection of the 43 plots that have geolocation |
| `due_diligence_data_pack.csv` / `.xlsx` | 23 consignments with full Annex II data fields + statement-ready flags; XLSX adds Operator and Plots sheets |
| `exceptions.csv` | 8 exception records in exactly the 6 planted classes, each classified FIXABLE-BY-US or CLIENT-ACTION with required action |
| `validation_report.md` | Validation findings: counts per class, detail, statement-readiness summary |
| `PROCESS_GUIDE.md` | Step-by-step client delivery process (intake → audit → templates → validation → statement-ready pack), with the service scope fence |
| `build_sample.py`, `validate_pack.py`, `verify_sample.py` | Generator, validation pass, and independent verification scripts |
| `VERIFICATION.md` | Full check-by-check grading table |

Planted errors (all caught): 2 plots missing geolocation (PLT-002-01, PLT-010-02);
1 invalid polygon with 3 pairs (PLT-006-02); 1 pre-cut-off production period
(2019) claimed compliant without land-use-history evidence (PLT-003-03);
2 suppliers missing legality evidence (SUP-005, SUP-013); 1 quantity mismatch
(SUP-004, +1,000 kg, FIXABLE-BY-US); 1 duplicate plot ID (PLT-009-02,
FIXABLE-BY-US). 10 of 23 consignments are statement-ready; 13 are blocked,
each by at least one listed exception.

## 5. Verification score

**24/24 checks passed = 100/100** (`verify_sample.py`, independent
recomputation from the delivered files only — see VERIFICATION.md). The first
run scored 23/24: the planted 3-vertex polygon's computed area (2.65 ha) broke
the ≤4 ha/point consistency rule; the generator was fixed (larger plot) and the
full pipeline re-run to a clean 100/100. No check was weakened.

## 6. Honest limits

- This sample proves the **data-preparation and validation workflow** end to
  end on synthetic data. It does not prove satellite deforestation screening
  (we validate coordinates' format/consistency and flag temporal
  inconsistencies; actual forest-loss analysis needs specialist geospatial
  providers/data).
- The service is **data prep + validation only**: not legal advice, not a
  compliance certification, and not DDS submission on the client's behalf —
  submission stays with the operator under its own EORI/responsibility
  (see PROCESS_GUIDE.md scope fence).
- Pricing evidence is real but thin (one direct service comparator plus SaaS
  prices); any future listing price must be re-checked against the live market.
- Regulatory position verified 2026-10-28; the EUDR has been amended twice and
  a further delay is rumoured in trade press — re-verify dates before any
  client relies on them commercially.
- Coordinates/suppliers are fictional but format-realistic; plot areas are
  computed from the generated polygon geometry, not surveyed.

## Sources (official first)
- European Commission, Access2Markets: "Delay until December 2026 and other
  developments in the implementation of the EUDR Regulation" —
  https://trade.ec.europa.eu/access-to-markets/en/news/delay-until-december-2026-and-other-developments-implementation-eudr-regulation
- European Commission (DG ENV), EUDR FAQ, 5th iteration (geolocation/polygon
  rules, traceability) — https://environment.ec.europa.eu/document/download/744919a7-8650-4850-89ad-a597268cd69e_en?filename=FAQ-UPDATE-5th-Iteration%20FINAL.pdf
- European Commission newsroom: country benchmarking implementing act,
  22–23 May 2025 — https://ec.europa.eu/newsroom/env/items/884631/en
- European Parliament Legislative Train: targeted amendments to the EUDR —
  https://www.europarl.europa.eu/legislative-train/theme-sustaining-our-quality-of-life-food-security-water-and-nature/file-targeted-amendments-to-the-eu-deforestation-regulation-(eudr)
- Price evidence: https://eudrindonesia.com/eudr-compliance-cocoa-exporters-indonesia/ ·
  https://www.eudrflow.com/ · https://use-proven.com/ ·
  https://www.foodexpoconnect.com/en/blog/eudr-deforestation-regulation-compliance-guide-food-exporters-2026
