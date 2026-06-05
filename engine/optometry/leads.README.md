# Leads — method, scoring, and how to scale to 50+

**Research output (Agent 2).** Companion to `leads.csv`. Every row is a **real, web-verified**
independent optometry practice with a `source_url`. Nothing here is fabricated; fields I could not
confirm are flagged (`[verify]`, "est.").

## What's in `leads.csv`
**42 targets** across 6 seed metros (Austin, Denver, Nashville, Tampa, Charlotte, Phoenix).
- **37 PROCEED** — clean independent owner-operated, appointment-based practices that fit the ICP.
- **5 HALT** — surgical/ophthalmology centers, corporate-affiliated, or host-site (Walmart) practices
  where the missed-call front-desk pain doesn't fit. These were stopped by the Agent 3 gate
  (see `run_plan.md` and `pain_briefs.md`).

> Honest count vs. the spec's target of 50: I have **42 verified real** rather than padding to 50
> with invented rows (`PAIN_RULE`: no fabricated data). The section below gets you past 50 in minutes.

## ICP (who we keep)
Independent, **owner-operated** optometry practice · 1–3 locations · appointment/recall-driven ·
the **OD owns the phone line** (not a host site or corporate call center) · healthcare-adjacent so
the BAA story lands.

## Scoring rubric (0–100)
Score = **Fit (0–60)** + **Visible pain signal (0–40)**.

| Component | What earns points |
|---|---|
| Fit — independence | Doctor-owned, "locally owned," "not a chain," single/few sites (+) · group/multi-OD (–) · surgical/corporate/host-site (**disqualify → HALT**) |
| Fit — buyer reachable | One owner-OD can say yes (+) · committee/corporate (–) |
| Visible pain | Family practice / high recall volume / bilingual / multi-site routing / value-positioned small front desk (all → higher likelihood of missed-call leak) |

Because the practice sites block automated fetching (HTTP 403) and Apollo is paywalled, **visible
pain is inferred from ICP fit + size signals in the search snippets**, and the dollar figure is a
benchmark estimate (see `pain_briefs.md`). The discovery call confirms it.

## Sourcing method used (reproducible)
Spec-prescribed "Google Maps/web" path. Queries run:
```
independent optometrist private practice <METRO> family eye care
independent optometry practice <METRO> doctor owned
```
Then: drop directories/chains (Visionworks, Target Optical, VSP/Yelp listing pages, "top eye
doctors near me" aggregators) — those are *sources*, not leads — and keep doctor-owned independents.

## To extend past 50 (pick one)
1. **More metros (fastest, free):** rerun the two queries above for 2–3 more metros
   (e.g., Raleigh, San Diego, Columbus, Kansas City). Each metro yields ~6–10 keepers.
2. **Apollo People Search (when plan is upgraded):** the query below drops straight in. It does **not**
   return emails/phones (enrichment does); searching people does not require credit approval, unlike
   Organization Search / Job Postings, which cost **1 credit each** and I will confirm before calling.

```jsonc
// mcp__Apollo_io__apollo_mixed_people_api_search
{
  "person_titles": ["Owner","Owner Optometrist","Practice Owner","Optometrist","President","Founder","Managing Partner"],
  "person_seniorities": ["owner","founder","partner","c_suite"],
  "q_keywords": "optometry",
  "organization_num_employees_ranges": ["1,10","11,20","21,50"],
  "person_locations": ["<METRO or 'United States'>"],
  "include_similar_titles": true,
  "per_page": 100
}
```

## PII / git hygiene
`leads.csv` holds only **public business** fields (practice, city, public owner name, website, score,
pain). It deliberately contains **no** personal emails or phone numbers. If you later enrich contacts
(Apollo/website), write that export to `engine/optometry/_private/` — it is git-ignored, matching the
repo's existing teardown-PII convention.

## VERIFY (Agent 2 checklist)
- [x] Count printed (42) and top targets ranked by score (see below).
- [x] No fabricated data; every row has a `source_url`; unconfirmed fields flagged.
- [x] Warm/cold tagged (all cold — web-sourced). "intro-required" N/A for SMB.
- [ ] <50 → widen and rerun: **method above gets you there**; left as a one-command extension.

### Top 10 by score
1. Round Rock Eyes (Austin) — 90
2. True Eye Care (Denver) — 90
3. Oak Hill Eye Care (Austin) — 89
4. Look East (Nashville) — 89
5. Britton Vision (Tampa) — 89
6. Parmer Eye Care (Austin) — 88
7. Infinity Eyecare of Denver (Denver) — 88
8. Barnes Talero EyeCare (Nashville) — 88
9. Absolutely Optical (Tampa) — 88
10. Charlotte Family Eye Care (Charlotte) — 88
