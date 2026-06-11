# Run Plan — PremierConnect Outreach & Outcome Engine · law

**Orchestrator output (Agent 1).** Read `config.md` first, then `skin.md` (the re-skin: same
12 agents, law pains). Sequence is ordered by revenue criticality: leads → pain → assets → outreach →
booking. Prove > polish. The money events are **Agent 9** (a booked live call) and **Agent 12** (the
convert). Everything before 9 is fuel. **Vertical guardrail on every artifact:** the AI gives **no
legal advice** — intake + scheduling only — compliance led with **confidentiality + privilege + NDA**.

## Sequence & status

| # | Agent | Output | Status |
|---|---|---|---|
| 1 | Orchestrator | `run_plan.md` (this file); `pipeline.csv` spins up with the first outreach batch | ✅ done |
| 2 | Research + Leads | `leads.csv`, `leads.README.md` | ✅ done — 28 real firms (web-sourced; owned by the leads agent, do not edit here) |
| 3 | **Pain Diagnosis (GATE)** | `pain_briefs.md` + pain cols in `leads.csv` | ✅ done — **23 PROCEED · 5 HALT** |
| 4 | Loom script | `looms/_TEMPLATE.md` + `looms/example-1.md` (Loewy) + `looms/example-2.md` (McCoy) | ✅ done |
| 5 | Gamma deck | `decks/_TEMPLATE.md` + `decks/generic.md` | ✅ done |
| 6 | Warm outreach | `outreach_warm.md` | ✅ system ready (bar-association + referral plays; activates on first warm contact) |
| 7 | Cold outreach | `outreach_cold.md` | ✅ done — 5-touch sequences for PROCEED targets, Loom-led |
| 8 | Paid ads (conditional) | `ads.md` | ✅ done — **gated:** hold until ≥2 paying clients + testimonials (PI ad math noted) |
| 9 | **Motion / Book the call** | bookings system | ⏳ ready-on-reply — reuse `../optometry/bookings.md` mechanics (same-week 15-min slot, deck as pre-read) until a law-skinned file is cut |
| 10 | Results & proof | `results/_TEMPLATE.md` | ⏸ blocked — needs a live pilot (no go-live yet) |
| 11 | Testimonial capture | `testimonials/_TEMPLATE.md` | ⏸ blocked — needs a positive 7-day result |
| 12 | **Pilot → convert** | `conversions/_TEMPLATE.md` | ⏸ blocked — needs a pilot at day 7–12 |

## The PAIN GATE (Agent 3) — confirmed in sequence

> **Gate rule:** if Pain Diagnosis returns "no quantifiable pain" for a target, that target is
> **HALTed** — no outreach is generated for it. The gate sits between RESEARCH (2) and ASSETS (4),
> exactly where the spec requires. For law the quantification is **signed matter $3,500+ × recovered
> intakes/mo** — never raw call counts.

**Targets currently blocked by the gate (5):**

| Target | Why HALTed |
|---|---|
| Morgan & Morgan | National brand, 1,000+ attorneys, staffed 24/7 intake — the missed-call pain does not exist. |
| Lerner & Rowe | Staffed 24/7 intake call center already — nothing for the AI to recover. |
| Holland & Knight | BigLaw (~2,200 attorneys) — no owner-operator buyer, no SMB intake line. |
| Modern Family Law | 43-lawyer multi-state platform with centralized intake — exceeds the solo–~10 ICP. |
| HCA Healthcare Legal Department | In-house corporate legal — not a firm; no client intake to fix. |

These 5 stay logged (in `leads.csv` with `status=HALT` and, once it exists, `pipeline.csv` with
`stage=halted`), **not** deleted — so the gate is auditable and a target can be revived if its
situation changes.

## What "done" looks like for this run
Agents 1–8 are fully executed and produce ready-to-use artifacts; Agent 9 fires on the first reply.
Agents 10–12 are **intentionally not fabricated** — they require a live pilot client, which does not
exist yet. Per `PAIN_RULE`/`SPEED_GATE` honesty, no invented baselines or day-7 results. They unlock
the moment a target from Agent 9 signs and goes live.

## Next action (highest-leverage)
1. Pick the top ~10 PROCEED firms from `leads.csv` (sorted by score — Loewy 92, McCoy 91, Pardo 90,
   Bonilla 90 lead the board).
2. Record their Looms from `looms/_TEMPLATE.md` (Loewy + McCoy scripts are already written) and send
   the cold sequences in `outreach_cold.md`.
3. On any reply → book a same-week 15-min call, attach the Gamma deck (`decks/generic.md` until a
   personalized one exists) as the pre-read. That booked call is the money event — hand off to the
   `calls/` discovery system (`./calls/_new-prep.sh "<Firm>" legal`).
