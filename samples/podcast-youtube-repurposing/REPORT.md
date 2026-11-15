# Build Report — Sample #11: Podcast/YouTube Written Repurposing Pack

Built 2026-10-31. Pattern followed from samples #4–#10: a generator
(`build_pack.py`) producing the client deliverable from a declared
source, plus a fully independent verifier (`verify_sample.py`) that
re-reads only the source script, the finished video file, the manifest
and the delivered pack, and recomputes every claim.

## Source (one of our own videos)

- **EIDOS — "Do Dogs Understand Fairness? The Treat Test That Split the
  Pack"** (Video A, 2026-10-31).
- Source of truth: `~/workspace/eidos_2026-10-31_dogs/script.md` — the
  narration script, marked in its own header "Script verbatim once
  recorded"; its header also documents the studies it is based on
  (Range et al. 2009; McGetrick & Range 2018; Brosnan & de Waal 2003).
- Narration: 5 acts, 1,037 words (186 / 189 / 250 / 246 / 166 per act).
- Finished video: `Dogs_Fairness_FINAL_1080p.mp4` — measured total
  duration **406.534 s** (ffprobe), i.e. an effective ~153 narration
  words per minute.

## What was built

| Deliverable | Headline figures |
|---|---|
| Show notes | 3 title options (first = the video's real title); short summary 47 words; long summary 192 words; 6 key takeaways; 5 topics/sources |
| YouTube chapters | 5 chapters, one per act: 00:00 / 01:12 / 02:27 / 04:05 / 05:41 |
| X thread | 6 posts, 139–166 characters each (limit 280) |
| Social posts | LinkedIn 147 words; Instagram/Threads 72 words; Facebook 129 words |
| Quotable moments | 6 quotes, all verified verbatim substrings of the script |
| SEO keywords | 10 keywords; every keyword word attested in the script |
| Blog/newsletter | 377 words, inside the 300–400 band |

## Method (the honest part)

- Chapter positions are **estimated**: each act's start = floor(its
  cumulative share of narration words × the measured total duration).
  The total duration is measured; the positions are proportional
  estimates and are labelled ESTIMATED in the manifest.
- No invented facts or numbers: the verifier's numbers audit confirms
  every digit token in the deliverables (after stripping documented
  structural items — chapter timestamps, list numbering, heading
  lines) is a digit token that appears in the source script itself.
  The only years used anywhere are 2009, 2018 and 2003 — the studies
  the episode itself is about.
- No URLs appear anywhere in the pack (the source has none; none were
  invented).
- The episode's own honesty section ("What This Does Not Prove") is
  carried through the pack: summaries, blog and posts all state the
  narrow inequity-aversion conclusion and the mixed later results.

## Verification

`verify_sample.py` + `VERIFICATION.md` + `verification_log.txt` —
22 independent checks, **22/22 PASS (100/100)** on the first full
verifier run. The verifier re-parses the source acts itself, re-probes
the video's duration with ffprobe, recomputes the chapter maths,
substring-checks every quote, and re-audits every number.

## Deviations

None against the assignment. No verifier failures occurred, so there
is nothing to record in a fix history; the build-stage guards that ran
before the verifier existed (build script asserts each quote against
the source before writing, and prints all word/character counts) are
disclosed in VERIFICATION.md's build-history section rather than
presented as verifier catches.
