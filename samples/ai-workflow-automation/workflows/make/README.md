# Make blueprints in this folder — READ THIS FIRST

These four files are Make scenario blueprints **authored to Make's
documented blueprint schema** (flow of module steps with mappers, router
filters, iterator/aggregator modules, scenario metadata).

**They have NOT been imported into a live Make account and have NOT been
executed.** They must never be described to a client as live-tested.

Why they exist: n8n workflow JSON and Make blueprints are **not
interchangeable** — Make cannot import n8n exports, and the architectures
differ (n8n passes arrays of items between nodes; Make passes bundles and
needs explicit Iterator/Aggregator modules). The executed proof in this
sample package is the **n8n** set (see `../` and `../../evidence/`). These
blueprints show the same three builds expressed natively for Make, ready
for the one remaining proof step:

**Remaining proof step for Make:** create a free Make account → import
each blueprint → connect the buyer's (or a test) Google account → run
with the same test data in `../../test-data/` → confirm the counts match
the n8n evidence (leads 6+2 added / 3 duplicates skipped; invoices 4 ok /
3 exceptions; orders 3 kept fixed / 0 kept broken). Until that is done,
Make delivery is "authored", not "proven".

Every value a buyer must supply is marked `BUYER-SUPPLIES:` inside the
blueprints (webhook IDs, Sheet/folder IDs, connection IDs, parser
endpoint) — the same Config-step discipline as the n8n builds.
