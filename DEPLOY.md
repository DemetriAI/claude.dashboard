# Going Live — Domain, 24/7 Gathering, and the Honest Limits

This explains exactly how to take the dashboard from files in a repo to a real
URL on **your** domain, and how to switch on scheduled lead-gathering — plus a
straight account of what "always-on, error-free" can and cannot mean.

## What exists now
- `site/` — a **real, static dashboard** (no build step, nothing to break) that
  renders the pipeline, the $5K model, and a live **System status** panel.
- `.github/workflows/deploy-pages.yml` — publishes `site/` to a public URL.
- `.github/workflows/refresh-pipeline.yml` + `scripts/generate-teardown.mjs` —
  the scheduled "gathering" job (no-ops until you add a key).

```
 your domain ──DNS──> GitHub Pages ──serves──> site/  (the dashboard)
                                   ▲
 cron every 6h ─> refresh job ─> scripts/generate-teardown.mjs ─> updates data ─┘
                                   (needs YOUR Apollo key; never sends outreach)
```

## Part 1 — Put it on your domain (≈15 min, mostly clicks)
1. **Enable Pages:** repo **Settings → Pages → Build and deployment → Source: GitHub Actions.**
   (Custom domains on Pages require a **public** repo or a plan that includes private Pages.)
2. Push to the default branch → the deploy workflow runs → you get a
   `https://<owner>.github.io/...` URL. That alone kills the "localhost" problem.
3. **Custom domain:** confirm/edit `site/CNAME` (currently the placeholder
   `dashboard.premierconnectai.com`).
4. **DNS at your registrar:**
   - Subdomain (recommended): `CNAME  dashboard → demetriai.github.io`
   - Apex (`premierconnectai.com`): four `A` records → `185.199.108–111.153`
5. Back in **Settings → Pages**, set the custom domain and tick **Enforce HTTPS**
   (the cert takes a few minutes). Done — the dashboard is on your domain.

## Part 2 — Turn on 24/7 gathering
1. **Settings → Secrets and variables → Actions → New repository secret:** add
   `APOLLO_API_KEY` (and later your email/booking/payment keys).
2. Make sure `refresh-pipeline.yml` is on your **default branch** — GitHub only
   runs `schedule:` workflows from the default branch.
3. It then runs every 6 hours, refreshes `site/data.js`, and commits — the
   dashboard updates itself. The engine lives in `scripts/generate-teardown.mjs`;
   the `gatherCandidates()` / `verifyBusiness()` functions are where your data
   source plugs in (marked `TODO`).
4. **Costs are real:** Apollo is a paid, rate-limited API; web verification has
   limits too. "24/7" means *on a schedule on GitHub's runners* — not a magic
   always-awake brain. Volume costs money; size it to the sprint.

## Part 3 — The "no possible errors" reality (please read)
I won't promise a system with zero errors, because that system doesn't exist.
What I built instead is **honest reliability**:
- The **dashboard** is static — about as close to un-breakable as web gets.
- The **gathering job** *will* sometimes fail (API limits, network, missing data).
  It's built to **fail safe**: on missing credentials it no-ops; on error it goes
  red and writes nothing rather than emit bad data. Turn on Actions email/Slack
  notifications so a red run reaches you.
- "Expert in this field" shows up as **guardrails**, not bravado.

## Part 4 — The compliance gate (this protects you)
**Do not auto-send.** Generating scripts is safe; blasting real businesses is not:
- **Calls/texts:** TCPA governs automated dialing/texting — including the
  "ring their number" demo at scale. Keep dials manual/consented.
- **Email:** CAN-SPAM requires identification, opt-out, no deception; volume
  blasting from `premierconnectai.com` can wreck your sending reputation.
- **Accuracy:** these are estimates about **named real businesses** — a human
  should eyeball each before it goes out.
The pipeline therefore stops at **draft + review**. You press send.

## The 3 things only you can provide
1. **Domain + DNS access** (and the choice to make the repo public, or enable private Pages).
2. **API keys / secrets** — Apollo now; email, booking, and payment links when you wire send + checkout.
3. **The go/no-go review** before any outreach leaves the building.

Hand me #1 and #2 and I'll finish the wiring; #3 stays yours on purpose.
