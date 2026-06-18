# 🛰️ The Engine — PremierConnect AI Outreach & Outcome Engine

**This is your one folder. Open this file first — it always tells you where everything is at.**

One engine, 12 agents, run your whole go-to-market: research → diagnose pain → Loom → Gamma →
outreach → book → prove → testimonial → convert. Re-skin to a new vertical by copying the config
block — you swap the config, not the engine. This is the bread-and-butter machine; treat
[`MAINTENANCE.md`](MAINTENANCE.md) as its weekly heartbeat.

---

## 📍 Live status — `optometry` run (updated 2026-06-05)

| Metric | Now |
|---|---|
| Active vertical | **optometry** (US — 6 seed metros) |
| Verticals configured | **5** — optometry (live) · law · accounting · real_estate (20 PROCEED) · hedge_fund |
| Targets sourced | **42** real, web-verified |
| Pain gate | **37 PROCEED · 5 HALT** |
| Looms ready | 3 worked + template |
| Decks ready | **2 generated LIVE in Gamma** + generic + template |
| Cold/warm outreach | ✅ built (not yet sent on a live account) |
| Paid ads | ⛔ HOLD (needs ≥2 paying clients + testimonials) |
| UI dashboard | ✅ `index.html` — toggle across all 4 verticals |
| Notion CRM | ✅ live Pipeline DB (42 leads synced) |
| **Calls booked this week** | **0** (awaiting first reply) |
| **Pilots live** | **0** |
| **MRR added** | **$0** |

> The money events are **Agent 9** (a booked live call) and **Agent 12** (the convert). Everything
> before 9 is fuel. The two zeros above are the only numbers that matter — the weekly job is to make
> them move.

### 🔗 Live artifacts (generated this run)
- **UI dashboard:** open [`../index.html`](../index.html) — toggle Optometry / Law / Accounting / Real Estate / Hedge Fund.
- **Gamma decks (live):** [Round Rock Eyes](https://gamma.app/docs/rda8u0bnlrxh5s3) · [True Eye Care](https://gamma.app/docs/eakkn83zi78d6cg).
- **Notion CRM (live):** [PremierConnect AI — Pipeline](https://app.notion.com/p/3772adc44a2481fea855cc36a692ab20) — all 42 leads synced; filter `Stage` to watch the money events.
- **Apollo:** people **and** company search are paywalled on the current plan (0 credits charged). The engine sources real leads via the web path until the plan is upgraded; the saved query is in `optometry/leads.README.md`.

---

## 🗂️ Where everything is (the map)

Three surfaces: the **UI** (toggle across verticals), the **engine files** (source of truth), and a
**live Notion CRM** (the pipeline).

```
claude.dashboard/
├── index.html           ← the UI dashboard — toggle across all 4 verticals (open in any browser)
├── dashboard/           ← the UI's assets; data.js is the single source of truth for the UI
└── engine/
    ├── README.md        ← you are here (the text control-center)
    ├── MAINTENANCE.md   ← the weekly run-of-show (do this every week)
    ├── SENDING.md       ← cold-email cadence playbook (5×25/day via Instantly)
    ├── optometry/       ← LIVE run — fully populated (children below)
    ├── law/             ← re-skin: config.md + skin.md (sourcing queued)
    ├── accounting/      ← re-skin: config.md + skin.md (sourcing queued)
    ├── real_estate/     ← agents already running Meta/Google ads (Apify→Apollo→Instantly); 20 PROCEED / 6 metros
    └── hedge-fund/      ← re-skin: config.md + skin.md (warm-intro only — different rules)
```

Inside the live vertical:

```
optometry/
├── config.md            the resolved GLOBAL CONFIG (override anytime)
├── run_plan.md          Agent 1 — plan + the PAIN-gate audit
├── pipeline.csv         every target's live stage + next action  ← single source of truth
├── leads.csv            Agent 2 — 42 scored real targets
├── leads.README.md      method, scoring rubric, Apollo query (for when the plan is upgraded)
├── pain_briefs.md       Agent 3 — the quantified pain + PROCEED/HALT decisions
├── looms/               Agent 4 — 90-sec scripts (3 worked + _TEMPLATE)
├── decks/               Agent 5 — 2 decks generated LIVE in Gamma (+ generic + _TEMPLATE)
├── outreach_warm.md     Agent 6 — ACA give-give-give-ask (activates on first warm contact)
├── outreach_cold.md     Agent 7 — lead-with-pain sequences carrying the Loom
├── ads.md               Agent 8 — built but GATED (hold until 2 paying clients)
├── bookings.md          Agent 9 — the booking motion + booking log  ← THE money event
├── results/             Agent 10 — 7-day proof (template; unlocks at first go-live)
├── testimonials/        Agent 11 — proof capture (template; unlocks on a win)
├── conversions/         Agent 12 — pilot→paid (template; unlocks at day 7–12)
└── _private/            git-ignored — enriched contact PII goes here, never in tracked files
```

**Downstream:** a booked call (Agent 9) hands off to the live-close system in
[`../calls/`](../calls/) — generate a prep doc with `./calls/_new-prep.sh "<Practice>" healthcare`.

---

## ▶️ Run order & status (the 12 agents)

| # | Agent | Status | File |
|---|---|---|---|
| 1 | Orchestrator | ✅ | `optometry/run_plan.md` |
| 2 | Research + Leads | ✅ 42 real | `optometry/leads.csv` |
| 3 | **Pain Diagnosis (GATE)** | ✅ 37/5 | `optometry/pain_briefs.md` |
| 4 | Loom | ✅ | `optometry/looms/` |
| 5 | Gamma | ✅ | `optometry/decks/` |
| 6 | Warm outreach | ✅ ready | `optometry/outreach_warm.md` |
| 7 | Cold outreach | ✅ | `optometry/outreach_cold.md` |
| 8 | Paid ads | ⛔ gated | `optometry/ads.md` |
| 9 | **Book the call** 💰 | ✅ ready (0 booked) | `optometry/bookings.md` |
| 10 | Results & proof | ⏸ needs live pilot | `optometry/results/` |
| 11 | Testimonial | ⏸ needs a win | `optometry/testimonials/` |
| 12 | **Convert** 💰 | ⏸ needs a pilot | `optometry/conversions/` |

---

## ➕ Re-skin to a new vertical (law / accounting / hedge_fund)
1. `mkdir engine/<vertical>` and copy `optometry/config.md`, edit the config block (VERTICAL, BUYER,
   REGION, off-limits rules).
2. Re-run agents 2→3 to source + gate targets, then 4→9 for assets/outreach.
3. **hedge_fund is different** — read the spec's HEDGE-FUND APPENDIX first: ops savings only (never
   alpha), warm-intro only (no ads/cold), NDA before data. Don't port the SMB timeline.

## 🔌 Tooling connected (what can run live on request)
Apollo (lead search — *people search is paywalled on this plan*; org search costs 1 credit/call, I'll
ask first) · Gamma (generate decks live) · Gmail + Google Calendar (book + remind) · Notion · Drive.
I draft into files by default and only act outward (send/book/generate) when you say go.

---

## 🩺 Health check
Run [`MAINTENANCE.md`](MAINTENANCE.md) weekly. The engine is healthy when the **booked-calls** and
**MRR** numbers above move every week. If they're flat two weeks running, the bottleneck is almost
always top-of-funnel volume (Agent 7) or speed-to-book (Agent 9) — not polish.
