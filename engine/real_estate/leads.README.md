# real_estate leads — method & verification level (read before sending)

**What these are:** real, currently-operating residential agents / small teams / small independent
brokerages in 6 seed metros (Austin, Denver, Nashville, Charlotte, Tampa, Phoenix), each with a **web-verified lead-gen funnel**
(`/home-valuation` CMA capture, instant-cash-offer funnels, IDX registration walls) and an active
paid-social presence — the ICP that's already spending to generate leads.

**Verification caveat (important):** these were sourced from a sandbox with a **datacenter-IP block** —
WebFetch and the Meta Ad Library both returned HTTP 403 (confirmed environmental: even `example.com` and
Wikipedia 403'd). So every business is corroborated through **multiple independent search-indexed sources**
(Yelp / Zillow / LinkedIn / BBB + quoted on-page copy: funnel URLs, addresses, phones, rosters), but
**live *paid*-ad spend was NOT directly observed in the Ad Library.** Where a name/detail was inferred it
is marked `[verify]`.

**Before outreach, two steps confirm + scale:**
1. `engine/tools/apify_sourcer.py` — Apify reads the Ad Library from its own infrastructure, so it (a)
   confirms each business is actively running Meta/Google ads, and (b) scales sourcing to all 6 metros + volume.
2. `engine/tools/apollo_enrich.py` — adds verified work emails into `_private/send_list.csv` (PII,
   gitignored). **No emails or phone numbers live in this tracked file by design.**

**Scoring (80–95):** speed-to-lead severity + clarity of ad/lead-gen spend + owner-owns-the-phone. HALT
rows (scored 40–45) are kept for the gate audit and are **excluded** from the GoHighLevel export.
