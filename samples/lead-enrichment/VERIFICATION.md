# VERIFICATION — Lead Enrichment Sample (internal)

**Deliverable checked:** `Lead-Enrichment-Sample-50-Agencies.xlsx` — 50 rows, 13 columns, 2 sheets (data + "About This Sample"). Workbook re-opened after build and confirmed intact: 50 data rows, first row SalesHive, last row A-Sales.

## Coverage counts (of 50 rows)

| Field | Filled | Notes |
|---|---|---|
| Company, website, country/city, niche, services, buying signal, icebreaker, source | 50 / 50 | Complete on every row |
| ICP fit score | 50 / 50 | 36 rows score 8–10; mean ≈ 8.4 — the sample deliberately targets likely buyers |
| Public contact email | **28 / 50 (56%)** | Only where the agency publishes one on its own site |
| Named decision-maker | **25 / 50 (50%)** | Only where publicly listed (team/about/leadership page or site byline) |
| Size signal | 43 / 50 (86%) | Blank where the site shows nothing concrete |

**Regional split:** USA 20 · UK 10 · Canada 5 · Australia 5 · EU 10 (Germany 2, Ireland 2, Spain 2, France 1, Netherlands 1, Denmark 1, Sweden 1). All strong-currency countries, as specified.

## Sources used

- **Facts: the agencies' own websites only** — homepage, services, contact, about/team and FAQ pages. Every row carries its source URL(s) in the final column.
- Web search and directories were used only to *discover* candidate agencies, never as the source of a recorded fact.
- No paid tools, no sign-ups, no LinkedIn scraping. Total cost: $0.

## Spot checks I re-verified myself against live pages (5)

1. **SalesHive** — contact page literally shows "Reach the team directly … sales@saleshive.com". ✓
2. **Growth Rhino** — its Toronto outbound page FAQ reads, verbatim: "We can suggest different data vendors based on your requirements. Alternatively, we can do it ourselves & expense it to you" — the strongest buying signal in the file, and it is real. Size claims (100+ clients, 37+ case studies, $74M+ pipeline) also on that page. ✓
3. **MarketMakers** — services page lists "Database Enrichment" and shows "Email: info@marketmakers.co.uk". ✓
4. **Martal** — homepage confirms "#1 AI-powered outbound engine", "200+ onshore sales executives", "15 years in business", "2,000+ teams trust", plus its "Build Intent-Based Lead Lists" and "Contact Validation" sections — all matching the row. ✓ (The founder name, Vito Vishnepolsky, is sourced from Martal's own site pages per the research pass but does not appear on the homepage itself — see caveats.)
5. **Pearl Lemon Leads** — about page confirms "Founded in 2016 by Deepak Shukla", "team of more than 130 professionals", "Deepak Shukla – Founder & CEO" leadership listing, and publishes info@pearllemongroup.com in its contact details. ✓

## Rows dropped

- **From the final 50: none.** Assembly included all 50 researched rows.
- During research, agents were under standing instruction to drop any agency whose site could not be fetched or verified and substitute another from the same region — that is why the set is exactly 50 verified rows rather than a longer, weaker list. The specific rejected candidates were not logged; the honest statement is that every row that survived is fetch-verified, and unverifiable candidates never entered the file.

## Caveats (honest)

- **Martal's decision-maker** is recorded as "Founder and CEO" from Martal's own site material; the homepage's public team section lists sales reps, not the founder, so this is the one name I could not re-confirm on a team page in spot-checking. It is plausible and site-sourced, but it is the weakest-sourced name in the file.
- **Marketbridge's email** (gscibelli@marketbridge.com) is a personal-format address — it is the address Marketbridge itself publishes on its site, so it is included as-published, not guessed.
- **Growthlabs' email** sits on a slightly different domain (growth-labs.co.uk) than its website (growthlabs.co.uk) — again, exactly as published on their site.
- **Arvana's decision-maker** is a legal representative from the site's legal/privacy pages (common for German GmbHs), not a sales contact — accurate, but a pitch would more likely target the published info@ address.
- The remaining 45 rows were verified by the researching agents against the cited pages but were not individually re-fetched by me; the 5/5 spot-check pass rate (including verbatim quotes) gives reasonable confidence in the rest.

## Quality verdict

**This sample genuinely proves the service.** It demonstrates all four things a buyer needs to believe: (1) targeting judgment — 36 of 50 rows are agencies that already sell outbound/lead-gen and feel data pain (Growth Rhino literally pays for prospect data today); (2) enrichment discipline — 56% email coverage with deliberate blanks is what *honest* enrichment looks like, and the file says so on its face, which is itself a trust signal; (3) personalisation quality — icebreakers cite real specifics (Martal's AI validation step, Apolac's signal-checking against Companies House, Nousu's ACMA scrubbing), not templates; (4) auditability — a source URL on every row. 

As a pitch asset it is ready. The one improvement worth making before sending it to a top-tier prospect: swap the Martal decision-maker cell to blank or re-source it from a page that names him in a leadership context, so that a prospect who clicks through finds every single field exactly where the file claims it is.

---

## Round 2 contact research log — the 22 workbook rows with no published email (2026-10-24)

Deep-check of each agency's OWN website (homepage/footer, Contact, About/Team, Press, Partners, Careers, Legal/Imprint, Privacy Policy pages, following on-site links). Rule applied strictly: an email counts only if actually seen published on the agency's own site (page text, mailto link, or a document hosted on its own domain); nothing guessed or pattern-constructed; third-party directories never used as a source. **Result: 20 of 22 yielded a real published email; 2 are form-only.** All 20 entered the Round 2 draft set (38 drafts total with the 18 workbook-known addresses) and SEND-QUEUE.md Batches 2–5.

| Agency | Checked | Found |
|---|---|---|
| CIENCE | cience.com homepage/footer, lead-generation pages, privacy center, case studies | **support@graph8.com** — the only email in current page text, shown in the footer of every page checked. It sits on graph8.com (CIENCE's own platform domain), not cience.com. `hello@cience.com` appears in older search snippets/PDFs but was NOT on any current page fetched, so it is not treated as verified. |
| SalesRoads | homepage, privacy policy, careers | **info@salesroads.com** — published on https://salesroads.com/privacy-policy/ |
| memoryBlue | homepage, get-an-estimate (its "Get in Touch" page) | **info@memoryblue.com** — listed explicitly at the top of https://memoryblue.com/get-an-estimate/ |
| Leadium | leadium.com homepage, contact-us (FAQ/form only, no email), official privacy policy | **support@leadium.io** — "Owner contact email" in Leadium's official Privacy Policy for www.leadium.com (hosted on iubenda as its policy provider). Note the .io domain. No email is published on leadium.com itself. |
| Sopro | homepage, legal page, do-not-sell page | **ryan@sopro.io** — published on https://sopro.io/legal/ as the general company contact ("You can contact Prospect Global Ltd [trading as Sopro] by email on ryan@sopro.io"). The same page also publishes dpo@sopro.io repeatedly, but that is a data-protection contact; ryan@ is the address used in the queue. |
| SalesCaptain | homepage, privacy policy, terms of use | **hello@salescaptain.io** — published on https://www.salescaptain.io/privacy-policy and confirmed again on the terms-of-use page. |
| Martal Group | martal.ca homepage, privacy policy, assessment and sales-enablement pages | **info@martal.ca** — in the "Contact Us / E-mail" block at the foot of the homepage and on the privacy policy. The address is Cloudflare-obfuscated in live fetches; it was decoded from the site's own email-protection mailto link and corroborated in plain text in Martal's own indexed page content — not pattern-guessed. |
| Growth Rhino Inc. | homepage, solutions/build-pipeline, lead-nurturing page, prospect-research article | **No published email — form/call only.** No contact page exists; the only conversion route is the "Book a 30-minute call" CTA on https://growthrhino.com/. (Crunchbase lists a hello@ address, but that is a third-party site and was excluded under the own-website rule.) → FORM QUEUE. |
| Nousu Collective | homepage, privacy policy, terms | **privacy@nousucollective.com** — plain text on https://www.nousucollective.com/privacy. A second published address, legal@nousucollective.com, is on the terms page. No general contact email exists; the homepage footer lists only phone/address and a booking CTA. Privacy address used in the queue, flagged in the draft. |
| A-Sales | a-sales.co homepage, contact-us, privacy policy, terms, GDPR page | **sales@a-sales.co** — plain text on https://a-sales.co/contact-us under "Prefer writing first?" (strongest find of the set). Also published on-site: orestas@a-sales.co (privacy/terms) and press@a-sales.co (GDPR page) — not used. |
| EBQ | homepage, pricing page, careers, privacy policy | **info@ebq.com** — plain text in the pricing-page FAQ on https://ebq.com/ebq-pricing/ ("by email at info@ebq.com"). Also hr@ebq.com on the careers page — not used. |
| Abstrakt Marketing Group | homepage, contact page, privacy policy, SMS policy, careers, leadership team | **info@abstraktmg.com** — "Email Us" on https://www.abstraktmg.com/contact/ and the contact email in the privacy and SMS policies. Cloudflare-obfuscated in fetches; decoded character-by-character from the site's own email-protection mailto link — not pattern-guessed. |
| Purple Sales | mypurplesales.com homepage, contact-us, about, careers, services pages | **info@mypurplesales.com** — in the "Contact Us" footer block on the homepage, About, Careers and Contact pages; source page https://mypurplesales.com/contact-us/ |
| Seventic | seventic.com/en/, contact page, site-hosted white paper | **contact@seventic.com** — the contact page (https://www.seventic.com/en/contact-seventic/) is mainly form + phone with an email link; the clear-text address is published in the white paper hosted on seventic.com itself (https://www.seventic.com/wp-content/uploads/2020/10/Livre-Blanc-Alizent.pdf) and matches that link. |
| Ironpaper | homepage, privacy page, jobs page | **privacy@ironpaper.com** — the ONLY email published on ironpaper.com (3 mentions on https://www.ironpaper.com/privacy/). No general sales/info email exists. Privacy address used in the queue, flagged in the draft. |
| SmartBug Media | homepage, press releases on smartbugmedia.com | **pr@smartbugmedia.com** — published as the contact on its own press releases (e.g. https://www.smartbugmedia.com/inbound-marketing-agency/news-releases/webinar-startup-generated-2-million-of-sales). Press-contact personal addresses (jtolkachev@, jessica@) are also published there but were not used. No general info/hello email is published. Flagged in the draft. |
| Kalungi | homepage, privacy policy | **contact@kalungi.com** — clear text in the Terms section of https://www.kalungi.com/privacy-policy ("please contact us at contact@kalungi.com"). |
| Green Hat | green-hat.com.au homepage, join-us, job listing page | **jobs@green-hat.com.au** — clear text on https://green-hat.com.au/join-us/operations_coordinator ("Please send the above to jobs@green-hat.com.au"). Careers-only: general enquiries route to a "Contact Us" form and no general business email is published. Flagged in the draft. |
| Directive | directiveconsulting.com homepage, contact, about, privacy policy, careers, a service page | **privacy@directiveconsulting.com** — mailto link on https://directiveconsulting.com/privacy-policy/ (also shown unredacted in that page's indexed text). The only published email; Contact/About/Careers show only phone (949) 214-4024 and a form. Flagged in the draft. |
| Refine Labs | refinelabs.com homepage, careers, privacy policy, team (contact/about return 404) | **megan@refinelabs.com** — published repeatedly on https://www.refinelabs.com/privacy-policy ("How to Contact Us", unsubscribe and data-rights lines). A named-person address; no generic business email is published. Flagged in the draft. |
| BizWisdom | bizwisdom.com.au homepage, contact, about (full team list), privacy policy | **No published email — contact form only.** No address appears on any page checked; the site shows only its Collingwood/Abbotsford addresses and phones. Contact page ("Request a Proposal"): https://www.bizwisdom.com.au/contact/ → FORM QUEUE. (Third-party directories mention @bizwisdom.com.au addresses — excluded, not the agency's own site.) |
| Squaredot | squaredot.agency homepage, contact, about, privacy policy | **hello@squaredot.agency** — in page text on https://www.squaredot.agency/contact under "Say hello", and repeated on the About and Privacy Policy pages. |

**Round 2 totals:** 22 checked → 20 published emails found → 38 total drafts (20 new + 18 workbook-known) in PITCH-DRAFTS-ROUND2.md → SEND-QUEUE.md Batches 2 (10), 3 (10), 4 (10), 5 (8), all UNSENT → FORM QUEUE: Growth Rhino Inc., BizWisdom (2). Nothing was sent and no contact form was submitted; preparation only.
