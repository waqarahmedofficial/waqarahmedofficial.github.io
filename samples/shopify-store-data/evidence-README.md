# Evidence log — Dan River store audit sample (accessed 2026-10-26)

- `danriverhome_products_page1.json` — full public Shopify product feed (21 products, 466 variants).
  The store is dan-river.com (Shopify; myshopify domain c90c71-3.myshopify.com, found in the
  dan-river.com homepage source). NOTE: https://dan-river.com/products.json itself returns the
  hosting proxy's 404 page (dan-river.com is fronted by a Cloudflare/LiteSpeed proxy), so the feed
  was pulled from the store's own mirror domain danriverhome.com and cross-checked byte-for-byte
  against the canonical myshopify domain feed (`myshopify_products_page1.json`) — identical
  921,589 bytes, identical product ID set.
- `dan-river_homepage.html` — dan-river.com homepage as served 2026-10-26 (contains the myshopify reference).
- `our_story_danriver.html` — https://dan-river.com/pages/our-story as served 2026-10-26.
  Extracted <main> content: the 2 words "Our Story" and nothing else.
- `sajidtex_home.html` — https://sajidtex.com.pk/ as served 2026-10-26: HTTP 200, 169,065 bytes,
  5.17 s load time, WordPress. (An earlier same-day check in prior research failed to load it;
  this audit reports it as intermittent/slow, not down.)
- Return/refund policy page https://dan-river.com/pages/return-and-refund-policy fetched live
  2026-10-26: opens "Thank you for shopping at Dan River Textiles."
- `computed_stats.json` — machine-computed catalogue statistics from the raw feed.
- Cross-channel prices (Walmart/Amazon/Faire) were NOT read live — those sites block direct
  reads. They come from the public search-index / price-mirror pages named cell-by-cell in the
  workbook's "Cross-Channel Prices" sheet, each labelled with its snapshot age.
