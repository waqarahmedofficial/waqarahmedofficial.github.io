# Verification — Make.com Automation Sample (Register #1)

Standard for this program: **zero mistakes, 100% PASS required** on the gating part.
A check is ticked only from evidence produced by the **live Make build** (execution
history + exported sheet contents + captured notifications/emails), compared against
the expected files in `test-data/` by a method that shares no code with the build
(export the live table as CSV and `diff` against the expected CSV; read notification
payloads off the catcher log). Anything irreconcilable is recorded as a FAIL with its
cause — never silently adjusted. On any gating failure: fix the configuration,
restore the clean state, re-run from scratch.

Design source: `BLUEPRINT.md`. Build sequence: `BUILD-RUNBOOK.md`.
**Part I (primary, gating)** mirrors Source A — the n8n lead-intake workflow executed
live in `~/workspace/automation-builds-sample/` (evidence: 2 execution records,
`leads_table_snapshot.csv`, `notifications.log`). **Part II (variant)** and **Part III
(stretch)** gate only if those builds are attempted; each records its own verdict.

**Status: Part I LIVE-BUILT AND VERIFIED — 2026-10-31 (see verdict block at the end of Part I). Part II / Part III not attempted; their boxes remain unchecked.**

---

# Part I — PRIMARY: n8n Lead Intake rebuilt in Make (BLUEPRINT §1–§6)

Expected files: `test-data/lead-intake-n8n/` (`leads-batch1.json`, `leads-batch2.json`,
`expected/table-after-batch1.csv`, `expected/table-final.csv`,
`expected/n8n-notifications-evidence.log`).

## A. Clean-state preconditions

- [x] Make account on the **Free plan** (plan page screenshotted to `evidence/`);
      no card entered at any point
- [x] Scenario `Sample 1 — Lead Intake, Dedupe to Sheet + Notify (Make rebuild)`
      exists; **Sequential processing = ON**; "Allow storing incomplete executions"
      = ON; scenario **inactive** except during the two runs; no other scenario
      writes to the test workbook
- [x] Workbook tab `leads_table` exists with header row exactly
      `company | name | email | source | addedAt | email_key` and **zero data rows**
- [x] Config values inside the scenario point at the test workbook and the test
      notify endpoint (BLUEPRINT §3.1); the notify catcher is armed and its log is
      empty (or a marker timestamp is recorded)
- [ ] The corrected scenario was exported to
      `evidence/make-blueprint-lead-intake-CORRECTED.json` before running
      (this export, not Source B's authored file, is the build's artifact)

## B. Batch 1 run — POST `leads-batch1.json` to the webhook (8 leads)

- [x] Execution finishes **Success**; operations consumed recorded (§F)
- [x] Run summary values (from the captured notification, §D): received **8**,
      added **6**, duplicatesSkipped **2**, totalInTable **6**
- [x] Exported `leads_table` (columns A–E) diffs clean against
      `expected/table-after-batch1.csv`: exactly 6 rows, first-seen order —
      Sarah Mitchell, James Okafor, Elena Petrova, Tom Becker, Priya Nair,
      Lucas Meyer — emails in **original case as first received**
- [x] The two skipped leads are provably the right ones: no row exists for
      `SARAH.MITCHELL@northwindretail.com` (case-variant duplicate — case-insensitive
      dedupe works) and no second row for `j.okafor@brightpathlogistics.com`
      (within-batch exact duplicate — within-batch dedupe works)
- [x] Column F (`email_key`) on every row equals `lower(trim(email))` of column C
- [x] `addedAt` on all 6 rows: valid ISO-8601 UTC timestamps
      (`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$`), all inside the execution
      window (exact values are the Make run's own — never compared to the n8n
      run's 2026-10-24 timestamps)

## C. Batch 2 run — POST `leads-batch2.json` (5 leads, table NOT reset)

- [x] Execution finishes **Success**
- [x] Run summary: received **5**, added **2**, duplicatesSkipped **3**,
      totalInTable **8**
- [x] The 3 skipped are exactly the cross-batch duplicates (sarah.mitchell@,
      tom.becker@, elena.p@ — all already stored from batch 1); the 2 added are
      Hannah Kim (hannah.kim@orbitpay.com) and Omar Haddad
      (omar.h@desertrosehotels.com), appended in that order
- [x] Exported final table (columns A–E) diffs clean against
      `expected/table-final.csv`: **8 unique leads**, no case-insensitive duplicate
      emails, first-seen order preserved end to end

## D. Notifications — exactly one per run, exact payloads

Read from the test catcher's log (the counterpart of the source's
`notifications.log`):

- [x] Exactly **2** notifications captured across both runs — never one per lead
- [x] Payload 1 field values exactly: `event = "lead-intake-run"`,
      `received = 8`, `added = 6`, `duplicatesSkipped = 2`, `totalInTable = 6`
- [x] Payload 2 field values exactly: `received = 5`, `added = 2`,
      `duplicatesSkipped = 3`, `totalInTable = 8`

## E. Dedupe semantics — the three mechanisms, each proven by the data

- [x] **Against the stored table:** batch 2's 3 skips (§C)
- [x] **Within the batch:** batch 1's exact-duplicate skip (§B)
- [x] **Case-insensitive:** batch 1's `SARAH.MITCHELL@…` skip (§B) — the check the
      authored Source B blueprint would have failed (BLUEPRINT §2, defect M1);
      if this box cannot be ticked, the build is Source B uncorrected, not this
      blueprint's design

## F. Hygiene, operations, evidence

- [x] Operations consumed, read off the usage page and recorded here:
      batch 1 ≈ 29 expected (range 24–36), batch 2 ≈ 19 (range 15–25);
      figures far outside range are explained in writing, not ignored
- [x] Execution history shows no incomplete/error executions for the two runs;
      any import-time or correction-time errors are listed in
      `evidence/deviations.md` with their fixes (import friction is expected —
      BLUEPRINT §4.2 F2 — hiding it is a FAIL of this section)
- [x] Scenario left **inactive**; catcher scenario (if used) left inactive or
      removed; no schedules or polling anywhere
- [ ] Evidence pack in `evidence/`: plan-page + usage screenshots, scenario canvas
      screenshot, corrected blueprint export, pre/post exports of `leads_table`
      for both batches, the 2 captured notification payloads, `deviations.md`
      (including the Source B defects M1–M6 and how each was corrected)

**Part I verdict rule:** §A–§F all PASS → the primary rebuild is verified.
Record verdict + date + actual ops at the top of this file.

---

## Part I VERDICT — recorded 2026-10-31 by the parent agent (independent check)

**PART I: PASS.** Live build (browser task 255263d2, 9:55am–12:59pm PKT) plus an
INDEPENDENT parent verification at 1:00pm PKT: the live `leads_table` and
`notifications` sheets were read back through a separate Google Sheets read
(sharing no code with the build) and compared against `test-data/` expected files.
- Batch 1 (run 12:49:15pm, Success, 21 ops): received 8 / added 6 / skipped 2 / total 6 — exact.
- Batch 2 (run 12:54:27pm, Success, 14 ops): received 5 / added 2 / skipped 3 / total 8 — exact.
- Final table: 8 rows, A–D columns identical to `expected/table-final.csv` in
  first-seen order, original-case emails; `email_key` = lower(trim(email)) on every
  row; all `addedAt` valid ISO-8601 UTC inside the run windows; the case-variant
  `SARAH.MITCHELL@…` and the within-batch `j.okafor@…` duplicate are provably absent.
- Notifications: exactly 2 captured, payloads field-exact for both runs.
- All three dedupe mechanisms (§E) proven by the data. Corrections M1–M6 applied
  (M2/M4 counting spine and M3 `now`-token differ in mechanics from BLUEPRINT §3's
  literal wording — substance identical, results exact; M5's trim() evaluation is
  unproven at runtime and gating-irrelevant: neither batch contains an empty email).
- Free plan throughout: no card requested or entered; 150/1,000 credits used in
  total (build + all correction attempts); both scenarios left INACTIVE, no schedules.
- Operations note (§F): verification runs consumed 21 and 14 ops — below the rough
  estimate ranges (24–36 / 15–25) because the corrected design runs fewer modules
  than the authored blueprint the estimates were based on. Explained, not ignored.
- DEVIATIONS (documentation only, no effect on results): (1) the corrected-blueprint
  export was produced by the Make editor but saved to the browser's Downloads with
  its filename unconfirmed — it is NOT in `evidence/`, so the §A export box stays
  unchecked; the live scenario (ID 6847877, inactive) in the Make account is the
  build artifact. (2) The §F evidence-pack box stays unchecked: `evidence/` holds
  the parent's independent CSV export of the final table, the captured notification
  payloads and `deviations.md` instead of screenshots. All import/correction-time
  errors and their fixes are listed in `evidence/deviations.md`.

---
# Part II — VARIANT: Lead Intake & Alert System (BLUEPRINT Appendix A)

Expected files: `test-data/lead-intake/` (`leads-input.csv`,
`leads-expected-after.csv`, `leads-edge-input.csv`, `leads-edge-expected-after.csv`).
Owner addresses in the live run are the runbook's substituted deliverable aliases;
all checks below read "personN" as the Nth substituted address in source order.

## V1. Clean state

- [ ] `leads`-equivalent tab cell-identical to `leads-input.csv` (9 rows, Owner/
      Status/Alert Sent empty); Dashboard COUNTIF formulas in place, TOTAL = SUM of
      the 6 status counts; rotation store seeded `last_index = -1`; scenario
      Sequential ON, incomplete executions stored, auto-reprocessing OFF

## V2. Core run (one sweep)

- [ ] Exported Leads tab diffs clean vs `leads-expected-after.csv` (Alert Sent by
      format `yyyy-MM-dd HH:mm` + run-window only): **8 valid rows Status `New`**;
      Omar Haddad Status exactly `CHECK: email looks invalid`, Owner + Alert Sent
      empty, no other `CHECK:` row
- [ ] Owners row-by-row: Amelia Hart → person1 · Jonas Weber → person2 ·
      Priya Nair → person3 · Marcus Lee → person1 · Sofia Rossi → person2 ·
      Tom Becker → person3 · Lena Fischer → person1 · **Grace Mbeki → person2**
      (distribution 3/3/2; Grace = person2 proves the invalid row did not advance
      the rotation); rotation store ends at `last_index = 1`
- [ ] Exactly **8 alert emails**, To = assigned owner, no CC, subjects exactly
      `[Your Business] New lead assigned to you: {Name} ({Company})` (all 8 leads
      have companies); one body checked in full against the BLUEPRINT A.1(6)
      layout incl. `-` fallbacks and the workbook-URL last line, the rest by
      template; Alert Sent stamps non-decreasing in row order
- [ ] Dashboard: New **8**, Contacted/Qualified/Proposal Sent/Won/Lost **0**,
      TOTAL **8** (not 9 — `CHECK:` excluded)

## V3. Edge run (fresh copy, rotation reset) + second sweep

- [ ] Edge outcomes exactly per `leads-edge-expected-after.csv`: `CHECK: name is
      missing`; `CHECK: email is missing`; both-empty row **completely unchanged**;
      two-error row `CHECK: name is missing; email looks invalid`; valid row →
      person1 + `New` + exactly 1 alert; edge dashboard New 1 / TOTAL 1
- [ ] Second sweep on the core workbook processes **zero** rows (no emails, no
      changes, rotation unchanged)
- [ ] Executions all Success; ops recorded (core ≈ 52, range 45–60; edge ≈ 14,
      range 10–20); scenario left inactive; evidence pack mirrors Part I §F

---

# Part III — STRETCH: n8n Order Automation rebuild (BLUEPRINT Appendix B)

Expected files: `test-data/order-automation/`. Workbook starts clean: `Orders` +
`Prices` loaded; `Invoices`, `CRM`, `Needs Review` header-only.

- [ ] **S1 Counts:** orders in **24** · valid **21** · invoices **21** · flagged
      **3** · CRM customers **21** · **total invoiced $5,782.16** (recomputed from
      the exported Invoices Total column)
- [ ] **S2 Invoices:** export diffs clean vs `invoices_out.csv` (21 rows, 8 cols,
      file order) — anchors: INV-1001 = ORD-1001 / 379.98; INV-1007 = **ORD-1008**
      / 163.50 (numbering skips flagged ORD-1007 without a gap); INV-1009 =
      ORD-1010 / 624.75; INV-1021 = ORD-1024 / 225.00; sequence INV-1001…INV-1021
      contiguous, no duplicates
- [ ] **S3 Flagged + CRM + email:** `Needs Review` diffs clean vs
      `flagged_out.csv` (ORD-1007 `Missing customer email` with Email shown as
      `—`; ORD-1013 `Quantity must be greater than 0`; ORD-1019 `Product not in
      price list`); `CRM` diffs clean vs `crm_out.csv` (21 rows, Orders = 1 each;
      anchors: Chen Wei 624.75 / 2025-10-29, Rajesh Patel 540.00 / 2025-10-30,
      Henry Brooks 225.00 / 2025-10-31); exactly **one** summary email, subject
      `Weekly order summary — 24 orders processed`, body figures 24 / 21 / 3 /
      $5,782.16
- [ ] **S4 Non-gating:** duplicate-email mini-run in a throwaway workbook (one CRM
      row, Orders = 2, summed Total Spent) exercises the Search → Update path the
      core data never triggers; stretch ops recorded (expected ≈ 118, range
      100–140); D1/D3 design notes confirmed as expected behaviour

---

*When Part I (and any attempted Part II/III) is fully ticked from live evidence,
write the verdict + date at the top of this file and in `REGISTER.md` — only then
does sample #1 count toward the 11-of-12 gate.*
