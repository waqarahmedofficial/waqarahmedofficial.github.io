# Battery Passport Dataset Preparation — sample pack: method and sources

Round C, 2026-11-03. This pack is the hands-on proof for the PERFORMABILITY
verdict. It is a demonstration on a FICTIONAL battery only — no real client,
no real company, no real URL is used anywhere in it.

## What the pack contains

1. `supplier-data-request-template.csv` — 28 fields a supplier/importer is
   asked for, with the source document for each field and its Feb-2027 status.
2. `worked-example-dataset.csv` — the same 28 fields completed for ONE
   fictional LMT e-bike battery pack (36 V, 14 Ah, 504 Wh, 3.2 kg, NMC).
3. `validation-checks.txt` — machine-checked output (see below).

## Method (how a real job would run, file-in/file-out)

1. Client sends scattered source files: datasheets, BOMs, cell/pack test
   reports, safety datasheets, dismantling manuals, import records.
2. Preparer maps each source document onto the template fields, and issues a
   supplier-data request for every gap (the template IS that request).
3. Supplier replies are chased and logged; every value keeps its source
   document noted, so the client can audit it.
4. The completed dataset is cleaned, validated (see checks), and delivered
   in the client's DPP platform import format (CSV/JSON) plus an exception
   register listing every field still missing and why.
5. The client — never the preparer — registers/hosts the passport and files
   anything with the registry. Carbon footprint, recycled content,
   due-diligence drafting, verification, and legal advice are NEVER included.

## Machine validation (all PASS, 2026-11-03)

- 28 template fields = 28 example fields, IDs match exactly.
- Energy arithmetic: 36 V x 14 Ah = 504 Wh, matching the stated value.
- All 24 Feb-2027-expected fields filled; the 3 Phase-2 fields (carbon
  footprint, recycled content, due diligence) correctly left BLANK, not
  estimated — per the Commission FAQ, they are not required in Feb 2027.
- Use-phase state-of-health correctly "empty at placing on market" for a new
  battery (Commission FAQ §8).
- Fictional placing-on-market date (2027-03-02) falls after the duty date.

## Sources used (live/primary first)

- Regulation (EU) 2023/1542, Art. 77 (EUR-Lex):
  https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng — passport duty from
  18 Feb 2027 for EV, LMT, and industrial batteries >2 kWh; per-unit record;
  QR/unique identifier; operator responsibility; repurposed battery gets a
  new passport linked to the original.
- European Commission, Batteries (DPP) page (updated 2026-10-27):
  https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/batteries_en
- Commission FAQ for Batteries (published 2026-09-30):
  https://single-market-economy.ec.europa.eu/single-market/digital-product-passport/eu-digital-product-passport-faq-batteries_en
  — carbon/recycled/due-diligence NOT required in Feb 2027; legitimate-
  interest implementing act still in development (draft expected Oct/Nov
  2026); registry operational 20 Jul 2026; Implementing Regulation (EU)
  2026/1778 (registry rules).
- Commission guidance news page (2026-08-21, updated 2026-09-03): 71-data-
  point guidance inventory, explicitly NON-BINDING, "not an authoritative
  interpretation".
- Readiness evidence (secondary, cited as such): Commission-webinar survey
  reported Oct 2026 (n=91; 15% "very confident", 63% data availability/
  quality biggest challenge); DXC/IMDS survey Mar–Apr 2025 (n=1,382; 90.8%
  lacking DBP readiness — different survey scope, do not merge the numbers).
- Competitor/price anchors (others' published prices, NOT our rate):
  ImportPass readiness audit EUR 500–1,500; PassPer EUR 79–719/month;
  T-Systems Magenta DPP Basic from EUR 1,499/month; Minespider from
  EUR 11,900/year (per Circuland comparison).

## Honest caveats — read before any real client work

- The 28-field template follows the Commission's published category summary
  and guidance structure. It is NOT a verbatim Annex XIII list: the EUR-Lex
  HTML fetch in this round omitted the annex text, and secondary field
  counts conflict wildly (71 guidance points; ~110/94 per PassPer; 28 per
  Tracekey). Never quote a single "mandatory field count" to a buyer.
- Legitimate-interest access act: deadline 18 Aug 2026 MISSED; draft only
  (reported 19 Oct 2026, feedback to 16 Nov 2026, WTO notice to 25 Dec
  2026). The 18 Feb 2027 passport date is unaffected.
- Whether live battery registration in the registry was possible as of
  early Nov 2026 is UNVERIFIED (secondary sources say not yet; Commission
  pages do not state a block). Do not claim either way to a buyer.
- Carbon-footprint and recycled-content effective dates are CONDITIONAL on
  methodology/format acts not yet adopted; calendar floors are not
  effective dates. Recycled-content percentages are secondary-only.
- Market-size forecasts conflict across vendors (different scopes) and are
  NOT quoted in the round file as fact.
- A freelancer cannot offer TIC verification, carbon/LCA calculation, or
  due-diligence assurance. Any pitch claiming full "compliance" would be
  false; the honest offer is dataset preparation only.
- Prior history (stated, not hidden): research notes 2026-10-23/24 flagged
  this niche as watchlist/emerging, and Round C 2026-10-31 listed it as an
  unverified runner-up. It was never pitched and never verified end-to-end
  before this round. This round is the first full verify-first gate plus a
  machine-checked sample pack.
