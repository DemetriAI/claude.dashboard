# Cold-email sending — the 5×25/day cadence (read before sending anything)

**Goal:** 125 personalized cold emails/day — **25 at 08:00, 10:30, 13:00, 15:00, and 16:50 America/Chicago** —
running every day, sustainably, without burning `premierconnectai.com`.

## Why NOT Gmail + a GitHub Action
Sending 125 cold emails/day through `contact@premierconnectai.com` via SMTP would torch the domain:
no warmup, no inbox rotation, no unsubscribe/bounce handling → spam folder fast, and Google can throttle
or suspend the mailbox. That damage is slow to undo. So the daily GitHub job stays a **digest to you**;
**outbound cold sending goes through a dedicated tool** (Instantly or Smartlead) on **separate sending
domains**, which is how you send this volume and keep your primary domain clean.

## The pipeline (engine feeds the sender; the sender does the timed sending)
```
Apify (Meta Ad Library + Google Ads) ──► engine/real_estate/leads.csv   (score + Fair-Housing-safe pain gate)
        engine/tools/apify_sourcer.py
leads.csv (PROCEED) ──► Apollo ──► _private/send_list.csv   (verified emails — PII, gitignored)
        engine/tools/apollo_enrich.py
send_list.csv ──► Instantly campaign ──► 5×25/day timed sending
        engine/tools/instantly_push.py            (cadence configured in Instantly, below)
```
The engine never sends mail and never stores PII in git. Instantly owns warmup, rotation, the schedule,
unsubscribe, and reply detection.

## Exact Instantly setup (one time)
1. **Buy 2–3 secondary sending domains** (e.g. `try-premierconnect.com`, `getpremierconnect.com`) — never
   your primary. Add 2 inboxes per domain → ~5 inboxes. Set up SPF, DKIM, DMARC on each.
2. **Warm up 2–3 weeks** (Instantly auto-warmup ON) before real volume. Ramp sends: ~25/day total in week 1,
   then climb to 125/day. Cold-sending 125/day from cold inboxes on day one = spam.
3. **Campaign → Sending schedule:** timezone **America/Chicago**, window **08:00–17:00**, days Mon–Fri.
4. **Throttle to 125/day:** 5 inboxes × **25 emails/inbox/day** = 125. Set a random 8–15 min delay between
   sends so the ~125 spread evenly across the 08:00–17:00 window — that lands ≈25 emails per ~2-hour block
   (08:00 / 10:30 / 13:00 / 15:00 / 16:50), which is your cadence.
   - **Note on "exact-minute bursts":** firing 25 at *exactly* 10:30:00 looks robotic to spam filters and
     hurts deliverability. The windowed spread above delivers the same 5×25 shape and inboxes far better.
     If you truly want literal bursts, create 5 sub-schedules — but I recommend the spread.
5. **Compliance (CAN-SPAM):** every email must carry a real physical mailing address + a working
   unsubscribe link. Instantly injects unsubscribe automatically — turn it on and add your address.

## Secrets to add (GitHub Actions → repo secrets)
| Secret | What |
|---|---|
| `APIFY_TOKEN` | Apify token — **rotate the one you pasted in chat first** |
| `APIFY_FB_ADS_ACTOR` | (optional) the Meta Ad Library actor id you use |
| `APOLLO_API_KEY` | Apollo API key for email enrichment |
| `INSTANTLY_API_KEY` | Instantly API key |
| `INSTANTLY_CAMPAIGN_ID` | the campaign the leads feed into |

Once those exist, the daily feed job (`.github/workflows/feed-outreach.yml`) sources → enriches → pushes
new verified leads into the campaign each morning; Instantly handles the 5×25 sending. Until the secrets
exist, every step auto-skips, so nothing breaks.

> **Honest caveat on the scripts:** Apify actor inputs and the Apollo/Instantly endpoints vary by
> account/plan. The scripts are built defensively and are the right shape, but expect to tweak field
> names once real keys are in — I can finalize them against the live APIs the moment you add the keys.
