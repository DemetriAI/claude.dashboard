# KPI-Leakage Teardowns — Batch Summary

**Generated:** 2026-06-05 · **By:** PremierConnect AI teardown pipeline
**Method:** "Name + city → web-verify" · Public data only · estimates marked *est.*

| # | Business | Vertical | City | Phone (verified) | Reviews (verified src) | Est. annual leakage | Subject line (w/ duration) | File |
|---|---|---|---|---|---|---|---|---|
| 1 | Artisan Optics | Optometry | Boise, ID | (208) 377-8899 | ~41 Yelp; 4–4.5★ YP | **~$165K–$180K/yr** | "…3 silent front-desk leaks (~$165K/yr est.) \| 1:50" | [artisan-optics.md](./artisan-optics.md) |
| 2 | Hancock Injury Attorneys | Law (PI) | Tampa, FL | (813) 915-1110 | 4.9★ / ~263 | **~$144K+/yr** | "…where signed cases leak (~$144K/yr est.) \| 1:50" | [hancock-injury-attorneys.md](./hancock-injury-attorneys.md) |
| 3 | Austin CPA, PC | Accounting | Asheville, NC | (828) 785-1556 | 4.4★ / 47 (Birdeye) | **~$30K–$70K/yr** | "…3 places new clients slip away (~$50K/yr est.) \| 1:50" | [austin-cpa-pc.md](./austin-cpa-pc.md) |

## Structure used (every script)
named hook → **leak 1** missed calls (ring # live) → **leak 2** reviews vs named competitor → **leak 3** no-show/recall (vertical-mapped) → bridge to **4 workflows on 14-day free pilot** → **one CTA** (book 15-min)

## Leak-math benchmarks applied
- **Optometry:** 25% no-show, $175–$200/no-show, $300–$500 exam+optical, 1-star = 5–9% revenue.
- **Law:** 35% calls unanswered, ~$144K/yr missed intake, 4x conversion if reply <5 min.
- **Accounting:** 12–18 step onboarding; faster lead response materially lifts conversion.

## Competitors named for leak 2 (review gap)
- Optometry → McNeel Eye Center, Boise *(est. larger review base)*
- Law → Jack Bernstein, Injury Attorneys *(1,500+ reviews, est.)*
- Accounting → Carol L. King & Associates, P.A. *(est. 1991, est. deeper base)*

## VERIFY gate — all three pass
3 leaks ✓ · dollar figures ✓ · exactly one CTA ✓ · runtime <2 min (~278–294 words) ✓ · named public data, estimates marked *est.* ✓

## Data caveat
Google Business Profile blocks automated reads and the practice sites return 403 to fetchers, so **Google-specific star ratings / review counts are marked _est._** and cross-referenced against Yelp / Birdeye / Yellow Pages, which were directly verifiable. Swap in exact Google numbers (or a different target) and the affected lines re-render in seconds.
