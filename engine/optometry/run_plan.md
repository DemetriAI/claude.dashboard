# Run Plan — PremierConnect Outreach & Outcome Engine · optometry

**Orchestrator output (Agent 1).** Read `config.md` first. Sequence is ordered by revenue
criticality: leads → pain → assets → outreach → booking. Prove > polish. The money events
are **Agent 9** (a booked live call) and **Agent 12** (the convert). Everything before 9 is fuel.

## Sequence & status

| # | Agent | Output | Status |
|---|---|---|---|
| 1 | Orchestrator | `run_plan.md`, `pipeline.csv` | ✅ done |
| 2 | Research + Leads | `leads.csv`, `leads.README.md` | ✅ done — 42 real targets (web-sourced) |
| 3 | **Pain Diagnosis (GATE)** | `pain_briefs.md` + pain cols in `leads.csv` | ✅ done — **37 PROCEED · 5 HALT** |
| 4 | Loom script | `looms/*.md` | ✅ 3 worked + template |
| 5 | Gamma deck | `decks/*.md` | ✅ 2 worked + generic + template |
| 6 | Warm outreach | `outreach_warm.md` | ✅ system ready (activates on first warm contact/referral) |
| 7 | Cold outreach | `outreach_cold.md` | ✅ done — sequences for PROCEED targets |
| 8 | Paid ads (conditional) | `ads.md` | ✅ done — gated: hold until ≥2 paying clients + testimonials |
| 9 | **Motion / Book the call** | `bookings.md` | ✅ system ready — awaiting first reply to book |
| 10 | Results & proof | `results/_TEMPLATE.md` | ⏸ blocked — needs a live pilot (no go-live yet) |
| 11 | Testimonial capture | `testimonials/_TEMPLATE.md` | ⏸ blocked — needs a positive 7-day result |
| 12 | **Pilot → convert** | `conversions/_TEMPLATE.md` | ⏸ blocked — needs a pilot at day 7–12 |

## The PAIN GATE (Agent 3) — confirmed in sequence

> **Gate rule:** if Pain Diagnosis returns "no quantifiable pain" for a target, that target is
> **HALTed** — no outreach is generated for it. The gate sits between RESEARCH (2) and ASSETS (4),
> exactly where the spec requires.

**Targets currently blocked by the gate (5):**

| Target | Why HALTed |
|---|---|
| Eye Care & Surgeons of Charlotte | Surgical/ophthalmology center — not owner-op front-desk SMB; missed-call booking pain doesn't fit the model. |
| Eye Doctors of Arizona | Ophthalmology surgical group, larger org — ICP mismatch (not the owner-operator buyer). |
| Kurt Theodore OD PA | Operates inside Walmart Vision Centers — host site owns the front desk; the OD doesn't own the call flow. |
| Nashville Regional Eye Care, P.C. | Surfaced via National Vision — corporate-affiliated, not independent owner-operated; back office is centralized. |
| South Tampa Eye Clinic (Sight360 co.) | PE-backed multi-location platform — has central ops; not the SMB owner-operator pain. |

These 5 are kept in `pipeline.csv` with `stage=halted` and a reason, **not** deleted — so the gate is
auditable and a target can be revived if its situation changes.

## What "done" looks like for this run
Agents 1–9 are fully executed and produce ready-to-use artifacts. Agents 10–12 are **scaffolded
and intentionally not fabricated** — they require a live pilot client, which does not exist yet.
Per `PAIN_RULE`/`SPEED_GATE` honesty, I will not invent baseline or day-7 results. They unlock the
moment a target from Agent 9 signs and goes live.

## Next action (highest-leverage)
1. Pick the top ~10 PROCEED targets from `leads.csv` (sorted by score).
2. Send the cold sequences in `outreach_cold.md`, each carrying its personalized Loom (`looms/`).
3. On any reply → run Agent 9 (`bookings.md`): book a same-week 15-min call, attach the Gamma deck
   as pre-read. That booked call is the money event — hand off to the `calls/` discovery-call system.
