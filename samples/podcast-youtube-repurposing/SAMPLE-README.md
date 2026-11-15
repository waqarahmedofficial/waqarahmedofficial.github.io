# Sample #11 — Podcast/YouTube Written Repurposing Pack

One episode in, a complete written pack out: show notes, YouTube
chapters, social posts for four platforms, quotable moments, SEO
keywords and a blog/newsletter version — every line grounded in the
episode's own script, with nothing invented.

## The sample

Built from one of our own videos: **EIDOS — "Do Dogs Understand
Fairness? The Treat Test That Split the Pack"**, using its narration
script (`~/workspace/eidos_2026-10-31_dogs/script.md`) as the single
source of truth and its finished video file only to *measure* the total
runtime (406.534 s, ffprobe).

## Pack contents

| File | What it is |
|---|---|
| `SOURCE-MANIFEST.md` | Source identity, word counts, duration basis, method |
| `SHOW-NOTES.md` | 3 title options, short + long summary, 6 key takeaways, topics & sources covered |
| `YOUTUBE-CHAPTERS.txt` | Paste-ready chapters, one per act of the video |
| `X-THREAD.txt` | 6-post thread, every post within the 280-character limit |
| `SOCIAL-POSTS.md` | LinkedIn post, Instagram/Threads caption, Facebook post |
| `QUOTES.md` | 6 quotable moments, verbatim from the script |
| `SEO-KEYWORDS.txt` | 10 keywords built only from words the script itself uses |
| `BLOG-POST.md` | Blog/newsletter version (377 words) |

## Method

1. Parse the script's structure (here: 5 acts) — the pack follows the
   episode's real structure, never an invented one.
2. Measure the finished episode's total duration; estimate each
   chapter's start from its share of the narration word count.
3. Write every piece from the script alone: summaries in our own words,
   quotes copied verbatim, numbers only where the script has them.
4. Verify independently (`verify_sample.py`): quotes substring-checked
   against the script, chapter maths recomputed, word bands, character
   limits, a full numbers audit, and a no-invented-URLs check.

## Honest limits

- **Chapter start positions are estimates**, derived proportionally
  from narration word share across the measured total runtime. They are
  labelled ESTIMATED in the manifest and are not measured cut points;
  pauses and music can shift a real boundary by a few seconds.
- This pack makes **no performance claims** about the video (no views,
  retention or revenue figures) — it is a writing deliverable built
  from the script, not an analytics report.
- Quotes are verbatim; summaries and posts are original wording that
  stays inside what the script actually says, including its stated
  limits (the episode's own "what this does not prove" section is
  carried into the pack, not edited out).

## Pricing context (from the register)

Show-notes/repurposing writing sells at $30–$100 per episode; our pack
band is **$40–$90 per episode** for the full set above (notes +
chapters + 4-platform social + quotes + keywords + blog version).

## Rebuild / verify

`python3 build_pack.py` regenerates the pack deterministically;
`python3 verify_sample.py` re-checks it from the source alone.
