# KPI-Leakage Teardowns — Batch Summary

**Generated:** 2026-06-05 · **By:** PremierConnect AI teardown pipeline
**Method:** "name + city → web-verify" · public data only · estimates marked *est.*

**12 script-ready teardowns** (verified phone, ready to record + send). Full pipeline of 40 targets: [`../pipeline/targets.md`](../pipeline/targets.md).

## Optometry
| Business | City | Phone (ringed live) | Reviews (verified src) | Est. annual leakage | File |
|---|---|---|---|---|---|
| Artisan Optics | Boise, ID | (208) 377-8899 | ~41 Yelp; 4–4.5★ | **~$165K–$180K/yr** | [artisan-optics.md](./artisan-optics.md) |
| Eyecare Associates | Fort Collins, CO | (970) 221-4811 | ~41 Yelp; 100+ yrs | **~$175K–$190K/yr** | [eyecare-associates-fort-collins.md](./eyecare-associates-fort-collins.md) |
| Brisbane Eyecare | Spokane Valley, WA | (509) 443-3145 | ~11 Yelp; 4.3★ | **~$105K–$130K/yr** | [brisbane-eyecare.md](./brisbane-eyecare.md) |
| Optic One Eye Care | Spokane, WA | (509) 328-2632 | ~99 Birdeye | **~$150K–$165K/yr** | [optic-one-eye-care.md](./optic-one-eye-care.md) |

## Law (personal injury)
| Business | City | Phone (ringed live) | Reviews (verified src) | Est. annual leakage | File |
|---|---|---|---|---|---|
| Hancock Injury Attorneys | Tampa, FL | (813) 915-1110 | 4.9★ / ~263 | **~$144K+/yr** | [hancock-injury-attorneys.md](./hancock-injury-attorneys.md) |
| Riddle & Riddle Injury Lawyers | Charlotte, NC | (704) 486-5824 | ~52 / claims 1,800+ (fragmented) | **~$144K+/yr** | [riddle-and-riddle-injury-lawyers.md](./riddle-and-riddle-injury-lawyers.md) |
| Hale Law | Sarasota, FL | (941) 735-4529 | 600+ five-star | **~$144K+/yr** | [hale-law.md](./hale-law.md) |
| Burnetti, P.A. | Sarasota, FL | (941) 366-2838 | hundreds five-star | **~$144K+/yr** | [burnetti-pa.md](./burnetti-pa.md) |

## Accounting
| Business | City | Phone (ringed live) | Reviews (verified src) | Est. annual leakage | File |
|---|---|---|---|---|---|
| Austin CPA, PC | Asheville, NC | (828) 785-1556 | 4.4★ / 47 (Birdeye) | **~$30K–$70K/yr** | [austin-cpa-pc.md](./austin-cpa-pc.md) |
| Montgomery & Company, CPAs | Greenville, SC | (864) 233-8449 | 4.6★ / 22 | **~$30K–$70K/yr** | [montgomery-and-company-cpas.md](./montgomery-and-company-cpas.md) |
| Nason Accounting | Greenville, SC | (864) 297-7742 | 4.4★ / 14 | **~$25K–$55K/yr** | [nason-accounting.md](./nason-accounting.md) |
| Matheney & Matheney CPAs | Spokane Valley, WA | (509) 893-0150 | thin (est.) | **~$25K–$55K/yr** | [matheney-and-matheney-cpas.md](./matheney-and-matheney-cpas.md) |

## Structure used (every script)
named hook → **leak 1** missed calls (ring # live) → **leak 2** reviews vs named competitor → **leak 3** no-show/recall (vertical-mapped) → bridge to **4 workflows on 14-day free pilot** → **one CTA** (book 15-min)

## Leak-math benchmarks applied
- **Optometry:** 25% no-show, $175–$200/no-show, $300–$500 exam+optical, 1-star = 5–9% revenue.
- **Law:** 35% calls unanswered, ~$144K/yr missed intake, 4x conversion if reply <5 min.
- **Accounting:** 12–18 step onboarding; faster lead response materially lifts conversion.

## VERIFY gate — all 12 pass
3 leaks ✓ · dollar figures ✓ · exactly one CTA ✓ · runtime <2 min (~280–300 words) ✓ · named public data, estimates marked *est.* ✓

## Data caveat
Google Business Profile blocks automated reads and most practice sites return 403 to fetchers, so **Google-specific star ratings / review counts are marked _est._** and cross-referenced against Yelp / Birdeye / Yellow Pages / Sharecare, which were directly verifiable. Phones, addresses, and competitors are confirmed. (Riddle & Riddle's review count is genuinely discrepant across platforms — that fragmentation is handled honestly as its Leak 2.)
