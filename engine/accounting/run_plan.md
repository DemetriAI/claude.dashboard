# Run Plan — PremierConnect Outreach & Outcome Engine · accounting

**Orchestrator output (Agent 1).** Read `config.md` first, then `skin.md` (the re-skin: same
12 agents, accounting pains — **season call-spike** + **document chase** on top of the missed-call
spine). Sequence is ordered by revenue criticality: leads → pain → assets → outreach → booking.
Prove > polish. The money events are **Agent 9** (a booked live call) and **Agent 12** (the convert).
**Vertical guardrail on every artifact:** the AI gives **no tax or financial advice** — intake,
scheduling, and doc-collection only — compliance led with **confidentiality + NDA**.

**Value unit:** retained client **$1,500–$5,000/yr** (recurring — they renew). Quantify pain as
clients/yr recovered × annual value, or staff-hours killed on the document chase. Never raw call counts.

## Sequence & status

| # | Agent | Output | Status |
|---|---|---|---|
| 1 | Orchestrator | `run_plan.md` (this file); `pipeline.csv` spins up with the first outreach batch | ✅ done |
| 2 | Research + Leads | `leads.csv`, `leads.README.md` | ✅ done — `leads.csv` landed mid-run (~27 firms, owned by the leads agent; do not edit here) |
| 3 | **Pain Diagnosis (GATE)** | `pain_briefs.md` + pain cols in `leads.csv` | ⏳ in flight (leads agent) — pain cols already in `leads.csv`; `pain_briefs.md` pending; gate rules pre-declared below |
| 4 | Loom script | `looms/_TEMPLATE.md` + `looms/example-1.md` (call-spike) + `looms/example-2.md` (doc-chase) | ✅ done — `[Firm]` skeletons, personalize per PROCEED target |
| 5 | Gamma deck | `decks/_TEMPLATE.md` + `decks/generic.md` | ✅ done |
| 6 | Warm outreach | `outreach_warm.md` | ✅ system ready (banker/attorney/CPA-society referral plays; activates on first warm contact) |
| 7 | Cold outreach | `outreach_cold.md` | ✅ done — 5-touch sequences ready for `leads.csv` PROCEED rows; season-window timing built in |
| 8 | Paid ads (conditional) | `ads.md` | ✅ done — **gated:** hold until ≥2 paying clients + testimonials; flight to Nov–Jan / Aug–Sep windows |
| 9 | **Motion / Book the call** | bookings system | ⏳ ready-on-reply — reuse `../optometry/bookings.md` mechanics (same-week 15-min slot, deck as pre-read) until an accounting-skinned file is cut |
| 10 | Results & proof | `results/_TEMPLATE.md` | ⏸ blocked — needs a live pilot (no go-live yet) |
| 11 | Testimonial capture | `testimonials/_TEMPLATE.md` | ⏸ blocked — needs a positive 7-day result |
| 12 | **Pilot → convert** | `conversions/_TEMPLATE.md` | ⏸ blocked — needs a pilot at day 7–12 |

## The PAIN GATE (Agent 3) — pre-declared rules (audit fills in when Agents 2–3 run)

> **Gate rule:** if Pain Diagnosis returns "no quantifiable pain" for a target, that target is
> **HALTed** — no outreach is generated for it. The gate sits between RESEARCH (2) and ASSETS (4).
> Quantification standard: **retained client $1,500–$5,000/yr × clients recovered**, or
> **2–5 staff-hours/client × loaded rate** for the document chase — est., confirm on the call.

**Pre-declared HALT classes (from `skin.md` — log, do not pitch):**

| Class | Why it HALTs |
|---|---|
| Big 4 / national firms | No owner-operator buyer; central ops own the phones. |
| Retail tax chains & their franchisees (H&R Block / Liberty / Jackson Hewitt class) | Host brand owns call flow + intake; the owner doesn't control the line. |
| Firms with a staffed central client-service desk | The missed-call pain doesn't exist; nothing to recover. |
| PE roll-up / multi-office platforms with centralized admin | Not the SMB owner-operator pain; buyer is a committee. |

When Agent 3 runs, this section gets the optometry-style audit table: **every HALTed firm by name,
with its reason**, kept in `leads.csv`/`pipeline.csv` (`stage=halted`) — auditable, revivable, never
silently deleted.

## What "done" looks like for this run
Agents 1 + 4–8 are fully executed, and Agent 2's `leads.csv` landed mid-run (leads agent). The only
gap before sending is Agent 3's `pain_briefs.md` (in flight) — though `leads.csv` already carries
per-firm pain bands + status, so the top PROCEED rows can be worked now. Agents 10–12 are
**intentionally not fabricated** — per `PAIN_RULE`/`SPEED_GATE` honesty, no invented baselines or
day-7 results; they unlock when a pilot goes live.

## Next action (highest-leverage)
1. **Finish Agent 3** (leads agent): `pain_briefs.md` + final PROCEED/HALT audit (expect a split
   like law's 23/5); the audit table above fills in from it.
2. Personalize `looms/` for the top ~10 PROCEED firms (bands from `leads.csv`) and fire
   `outreach_cold.md` sequences —
   **timed to the calendar:** off-season pitch = "install while the phones are quiet"; aim pilots to
   be live before **Oct 15** (extensions) or **Jan 15** (season start).
3. On any reply → book a same-week 15-min call, attach `decks/generic.md` output as pre-read → hand
   off to the `calls/` discovery system (`./calls/_new-prep.sh "<Firm>" legal` — legal/financial
   confidentiality skin).
