# UK CBAM — Method and Sources (Round C, 2026-11-11)
# Fictional worked example only. All importer/supplier names, masses, values,
# intensities and verification references are INVENTED for demonstration.
# Real HMRC figures used: default values and illustrative rates published 16 Oct 2026.

## The service
UK CBAM data preparation for UK importers of aluminium, cement, fertiliser,
hydrogen, and iron and steel goods: scope mapping (CN codes + GBP 50,000
threshold test), supplier data chase (written-only), embedded-emissions
calculation workbook (verified actuals vs HMRC defaults side by side), and a
return-ready dataset for the importer's first accounting period (all of 2027).

## The calculation (UK rules, NOT EU rules)
- Liability = (relevant embodied emissions x sector rate) - qualifying carbon
  price relief. (GOV.UK: Illustrative CBAM rates and worked example, 16 Oct 2026.)
- Relevant embodied emissions = net mass (t) x emissions intensity (tCO2e/t).
- Intensity comes from EITHER verified actual data OR the HMRC default value
  for that CN code. Defaults: one value per CN code, whatever the origin;
  10% markup in every sector except fertiliser (draft Default Values Force of
  Law Notice, published 16 Oct 2026; in force from 1 Jan 2027).
- DIRECT emissions only at launch, including direct emissions of precursor
  goods. Indirect (electricity) emissions are OUT of scope until 2029 at the
  earliest (Budget 2025 announcement, GOV.UK factsheet).
- Sector rates are published quarterly by HMRC; there is no headline rate in
  the Act. Illustrative rates (16 Oct 2026, based on Q3 2026 average UK ETS
  price GBP 58.15, preliminary baseline data) — iron and steel GBP 9.69,
  aluminium GBP 9.79, hydrogen GBP 9.24, cement GBP 8.78, fertiliser GBP 1.45
  per tCO2e. These are ILLUSTRATIVE ONLY, not the Q1 2027 rates (published
  before end of 2026). The worked example uses them ONLY to show the size of
  the actuals-vs-defaults gap; a real client pack must use the confirmed
  quarterly rate for the quarter of import.
- A return filed on default values CANNOT later be amended with actual
  emissions data — VERIFIED IN PRIMARY LAW: Finance Act 2026, Schedule 17,
  para 8(2) (legislation.gov.uk, checked 2026-11-11): "No amendment may be
  made to replace information on the emissions embodied in CBAM goods
  determined using default values set under paragraph 11 with such
  information determined in accordance with regulations under paragraph 10."
  Amendments are only to correct an error (para 8(1), within 3 years). And
  para 11(3): defaults are set at a level that ensures there is no advantage
  in using them over actual data. This is the core selling point: supplier
  data secured DURING 2027 decides the bill; waiting until the return is due
  forfeits the saving.
- The UK scheme is a TAX, not a certificate system: calculate liability,
  file a return, pay HMRC. There are NO CBAM certificates to buy or
  surrender in the UK (that is EU-only). A tax agent may file returns but
  CANNOT register on the importer's behalf and carries no liability.
- Actual data must be verified by a qualifying independent verifier
  accredited to ISO/IEC 17029:2019 and ISO 14065:2020. A freelancer cannot
  verify emissions — the sellable service is preparation, not verification.
- Records must be kept 6 years. Nil returns are still required.

## Key dates (verified)
- 1 Jan 2027 — UK CBAM commences; charge accrues on imports from this date.
- 1 Jan 2028 — registration opens (Government Gateway); businesses liable
  in 2027 have until 31 Jan 2028 to register (transitory provisions).
- 31 May 2028 — first return + payment due (accounting period = all of 2027).
- From 1 Jan 2028 — quarterly accounting periods, returns due two months
  after quarter end.
- Threshold: GBP 50,000 of CBAM goods over a rolling 12 months (backward
  look-back test monthly + forward 30-day test). Below it: no registration,
  no return, no charge.
- Law: Finance Act 2026 Part 5 + Schedules 17-18; SIs 2026/802 (admin),
  2026/809 (rate and carbon price relief), 2026/830 (transitory), 2026/995
  (emissions and verification). Finance Act 2025 provided for HMRC preparation.

## Scale (verified, GOV.UK)
- ~10,000 businesses significantly impacted (GOV.UK "Introduction of a UK
  carbon border adjustment mechanism", Summary of impacts).
- GBP 50,000 threshold excludes over 80% of otherwise-affected importers;
  over 70% of those excluded are SMEs. The remaining ~10,000 still cover
  ~99% of embodied emissions.
- Exchequer impact (OBR-certified): +GBP 30m (2026-27), +GBP 140m
  (2027-28), +GBP 180m (2028-29), +GBP 175m (2029-30), +GBP 155m (2030-31).
- Admin burden on business: one-off GBP 9m; continuing GBP 16m per year.
- 80% of UK CBAM goods come from countries that already have a carbon
  pricing system.

## UK vs EU CBAM — differences a data pack must respect
- Threshold: UK = GBP 50,000 VALUE (rolling 12 months). EU = 50 tonnes MASS
  per importer per year. Different test, different register build.
- Sectors: same five; UK excludes electricity (EU includes it) and
  glass/ceramics (excluded at launch, may be added later).
- Emissions scope: UK direct-only until 2029 at earliest; EU already counts
  indirect emissions for some goods.
- Charge mechanics: UK is a TAX collected by HMRC (quarterly sector rate x
  emissions, minus carbon price relief). EU is a CERTIFICATE system (buy
  certificates, surrender annually; sales from 1 Feb 2027; first declaration
  30 Sep 2027). Different return formats, different deadlines.
- Defaults: UK one value per CN code whatever the origin (10% markup except
  fertiliser). EU defaults vary by country of origin with markups of 10%
  (2026) rising to 30% (2028+).
- No EU CBAM data pack can be re-sold as a UK pack: the threshold test, the
  rate, the return and the deadlines are all different.

## Boundaries (stated plainly in any pitch)
Data preparation ONLY. Never: HMRC registration, return filing, tax advice,
emissions verification, legal advice, or "compliance" claims. Those belong to
the importer's customs broker / tax adviser / accredited verifier.

## Sources (all checked 2026-11-11)
1. GOV.UK — Carbon Border Adjustment Mechanism (CBAM): Policy summary
   (updated 16 Oct 2026): https://www.gov.uk/government/publications/carbon-border-adjustment-mechanism-cbam-policy-summary/carbon-border-adjustment-mechanism-cbam-policy-summary
2. GOV.UK — Introduction of a carbon border adjustment mechanism (tax
   information and impact note): https://www.gov.uk/government/publications/introduction-of-carbon-border-adjustment-mechanism/carbon-border-adjustment-mechanism
3. GOV.UK — CBAM: Illustrative CBAM rates and worked example (16 Oct 2026):
   https://www.gov.uk/government/publications/illustrative-cbam-rates-and-worked-example-for-carbon-border-adjustment-mechanism-cbam/carbon-border-adjustment-mechanism-cbam-illustrative-cbam-rates-and-worked-example
4. GOV.UK — Factsheet: Carbon border adjustment mechanism:
   https://www.gov.uk/government/publications/factsheet-carbon-border-adjustment-mechanism-cbam/factsheet-carbon-border-adjustment-mechanism
5. Explanatory memorandum, CBAM (Administrative Provisions) Regulations 2026
   (SI 2026/802): threshold / 80% exclusion figures.
6. Secondary-source cross-checks (rates, defaults, no-amendment rule):
   tonnemark.com/guides/uk-cbam; sbs.eco/uk-cbam-illustrative-rates-2027/;
   beckchoice.co.uk (16 Oct 2026 defaults notice); meridiantrade.global;
   cbamproof.co.uk (default values per CN code); ICAEW Feb 2026;
   Weightmans; Legal500 (15 Oct 2026).
7. Competition check: see ROUND-C-2026-11-11.md (Upwork/Fiverr counts).
8. Finance Act 2026, Schedule 17, paras 8 and 11 (legislation.gov.uk,
   checked 2026-11-11) — no-amendment rule and default-value design.
   https://www.legislation.gov.uk/ukpga/2026/11/schedule/17/part/3
9. CarbonChain help centre, "Where to start on UK CBAM as an importer"
   (secondary cross-check of return fields and deadlines):
   https://learn.carbonchain.io/en/articles/17643533-where-to-start-on-uk-cbam-as-an-importer

## Caveats
- Illustrative rates are NOT the rates importers will pay; re-check the
  confirmed Q1 2027 rates (published before end of 2026) before any real
  client work.
- Default values in the worked example (3.468 / 3.040 / 1.375) are HMRC's
  published 16 Oct 2026 draft-notice figures, cross-checked on two secondary
  sources; re-check against the final force-of-law notice before real use.
- Actual intensities (1.850 / 2.100 / 0.950) are INVENTED plausible values
  for demonstration; real values come from the supplier's verified data.
- Carbon price relief is GBP 0.00 in the example (Turkiye, India, Egypt had
  no qualifying carbon price for these goods at the time of writing); a real
  pack must evidence any relief claimed.
- Cement actuals use clinker as the functional unit per HMRC guidance; the
  example simplifies this to a per-tonne-of-product intensity — flag it in
  real work.
- The ~10,000-business figure is GOV.UK's own estimate of significantly
  impacted businesses; it is NOT a count of buyers willing to outsource.
