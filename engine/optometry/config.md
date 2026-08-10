# GLOBAL CONFIG — optometry run

Resolved for this run of the PremierConnect Outreach & Outcome Engine. Defaults were
auto-set because the operator launched with `execute` and no config; anything marked
`[TBD]` is a safe placeholder you can override at any time (tell me and I re-filter).

| Field | Value | Notes |
|---|---|---|
| `VERTICAL` | **optometry** | SMB. Maps cleanly to the healthcare lane of the `calls/` playbook (appointments ~$450/visit, $1,200+ LTV). |
| `BUYER` | **owner-operator** | The optometrist-owner / practice owner. One person can say yes. |
| `REGION` | **United States — seed metros: Austin, Denver, Nashville, Tampa, Charlotte, Phoenix** `[TBD]` | Started multi-metro so worked assets read as local. Narrow to one metro anytime. |
| `PAIN_RULE` | **active** | Proceed only on a real, quantified TIME-or-MONEY pain. No quantifiable pain → HALT. Never invent pain. |
| `SPEED_GATE` | **measurable result ≤7 days of GO-LIVE** | Delivery speed only. Sales cycle is separate. |
| `AUTHENTICITY` | **on** | Every output framed as "AI removes the repetition so the human does the high-value work" (the Coordination Tax). |
| `OUTPUT_DIR` | `./engine/optometry/` | |

### Off-limits / honesty notes for this vertical
- Optometry is healthcare-adjacent. If a practice handles PHI through the front desk, lead the
  compliance objection with **BAA-ready infrastructure** (mirrors `calls/_PLAYBOOK.md`).
- Per-practice pain dollars in this run are **benchmark estimates flagged "est."** — Apollo People
  Search is paywalled on this account and the practice sites block automated fetching, so figures
  come from medical-front-desk benchmarks, not a confirmed teardown. The discovery call confirms
  the real number (that confirmation *is* the call's job — see `pain_briefs.md`).
- All targets are **cold** (web-sourced, no prior relationship). For SMB there is no
  "intro-required" gate — these are directly outreach-able.

### Data-sourcing status
- **Apollo People Search:** unavailable (free-plan gate). Query spec is staged in `leads.README.md`
  for the moment the plan is upgraded — it drops straight in.
- **Apollo Organization Search / Job Postings:** available but **cost 1 credit each** and require explicit
  approval. Not called. Say the word and I'll run them.
- **This run's leads:** sourced via web search (the spec's prescribed "Google Maps/web" path for SMB),
  every row carries a `source_url`.
