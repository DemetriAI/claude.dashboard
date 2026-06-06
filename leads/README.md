# Phoenix Metro Lead Lists — PremierConnect AI

Outreach-ready prospecting lists of **owner-operated, appointment-based small
businesses** in the Greater Phoenix, AZ metro, across three verticals, scored
and tagged for a first-touch sales motion.

| File | Vertical | Leads |
|------|----------|-------|
| `optometry_phoenix_az.csv`  | Independent optometry / eye care | 30 |
| `law_phoenix_az.csv`        | Solo & small law firms           | 30 |
| `accounting_phoenix_az.csv` | Independent CPA / tax / accounting | 30 |

Every lead is a **real, currently-operating, independently owned** business with
a verified phone and website. No national chains, franchises, hospital groups,
or Big-4 firms. Each row carries the **source URL(s)** the data was verified
against — nothing here is fabricated.

---

## How leads were built

1. **Discovery** — parallel web-research agents pulled real practices per
   vertical across the metro (Phoenix, Scottsdale, Tempe, Mesa, Chandler,
   Gilbert, Glendale, Peoria, Surprise, Avondale, Goodyear, Fountain Hills),
   capturing name, owner, phone, website, city, rating, review count, booking
   method, size proxies, and sources.
2. **Enrichment** — a focused second pass filled in Google rating / review
   count / online-booking for businesses the discovery pass couldn't confirm
   (overrides live in `raw/enrich_*.psv`).
3. **Scoring & routing** — `score_leads.py` computes a 0–100 fit score, tags
   Warm/Cold, recommends a first channel, and writes the per-vertical CSVs.
   Fully reproducible: `python3 score_leads.py`.

> **Note on revenue band.** The target profile is ~$1M–$5M revenue. No free
> data source publishes private-practice revenue, so the band is **inferred**
> from hard proxies (number of providers/attorneys/CPAs, locations, years in
> business, staff size) and labeled `inferred` in the `est_revenue_band`
> column. Apollo.io company/people search — which *does* carry revenue
> estimates and direct owner contacts — is locked on the current Apollo plan;
> upgrading it would let us replace the inference with verified figures and add
> owner cell/email in one pass.

---

## Fit score (0–100) — higher = better fit = more fixable gaps to sell against

The score is built **only from signals verifiable from public data** — the two
checkable "Core Four" pillars. The other two pillars can't be confirmed from
outside, so they ride as flags (see below) rather than inflating the number.

| Pillar | Points | Logic |
|--------|--------|-------|
| **Reputation — review volume** | 0–30 | `<20` reviews = 30 · `20–49` = 20 · `50–99` = 10 · `100–199` = 4 · `200+` = 0 · none found = 22 |
| **Reputation — star rating**   | 0–25 | `<3.8` = 25 · `3.8–4.19` = 18 · `4.2–4.49` = 11 · `4.5–4.7` = 4 · `>4.7` = 0 · none found = 8 |
| **Online booking**             | 0–45 | none = 45 · unknown = 27 · has booking = 8 |

Lower review counts and lower ratings score **higher** because they represent
reputation / review-generation work PremierConnect can do; a practice already
sitting at 4.9★ with 800 reviews and a live scheduler is a *worse* fit and
scores low. **Warm = fit ≥ 60; Cold = below.**

### The two unverifiable Core Four pillars (flags, not score)
- **Missed-call text-back** — `UNVERIFIED`
- **AI voicemail / receptionist** — `UNVERIFIED`

You can't tell from the outside whether a business has these, so they're not in
the number. Industry-wide, most SMBs in these verticals lack both — confirm on
first contact and they become additional pitch surface. See `core_four_flags`.

---

## First-channel routing (`best_first_channel`)

| Channel | When | Why |
|---------|------|-----|
| **Video** | Warm + missing/unclear online booking, or warm with a showable gap | A 60-sec personalized audit (screen-record the broken booking path) earns a reply without demanding their time |
| **Call**  | Warm + sub-4.2★ rating, or thin reputation otherwise tidy | Reputation is a live conversation; call the owner (by name where known) |
| **Email** | Cooler fit | Low-touch nurture, follow up on engagement |

---

## Column dictionary

| Column | Meaning |
|--------|---------|
| `business_name` | Exact business name |
| `vertical` | optometry / law / accounting |
| `city` | Metro city |
| `owner_name` | Owner / founder / managing partner (blank if not found) |
| `phone` | Verified business phone |
| `website` | Verified website |
| `rating` | Star rating (blank if not found) |
| `review_count` | Review count (blank if not found) |
| `rating_source` | Where the rating came from (Google, Yelp, Birdeye, …) |
| `online_booking` | yes / no / unknown |
| `est_revenue_band` | `$1M-$5M (inferred from size proxies)` |
| `fit_score` | 0–100 (see above) |
| `temperature` | Warm / Cold |
| `best_first_channel` | Video / Call / Email |
| `why_fit_and_channel` | One-line rationale for the score + channel |
| `core_four_flags` | Per-pillar breakdown incl. the two UNVERIFIED pillars |
| `size_signals` | Proxy facts behind the revenue inference |
| `source_urls` | URLs the data was verified against |
| `notes` | Specialties, ratings source, caveats |

---

## Caveats (read before dialing)

- **Ratings source varies.** Where Google wasn't scrapable, a rating may come
  from Birdeye/Zocdoc/Yelp aggregation — noted per row. Confirm live before
  quoting numbers to a prospect.
- **`online_booking` is best-effort.** "yes" means a real scheduler was seen;
  document/client portals were not counted as booking.
- **Revenue is inferred, not verified** (see note above).
- A few borderline inclusions are flagged in `notes` (e.g., a newer practice, a
  2–5 office local chain) and were kept because they otherwise fit the profile.

_Reproduce anytime:_ `cd leads && python3 score_leads.py`
