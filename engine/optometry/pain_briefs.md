# Pain Briefs — optometry (Agent 3, the guardrail)

This is the gate. A target only earns outreach if a **real, quantified** TIME-or-MONEY pain exists
that AI can cut. **Honesty over optimism** — a weak or invented pain is marked HALT, not dressed up.

> **Sourcing caveat, stated once:** Apollo is paywalled on this account and the practice websites
> block automated fetching, so I could not pull a per-practice teardown. The dollar figures below are
> **benchmark estimates ("est.")** built from public medical-front-desk data and stated assumptions.
> They are honest order-of-magnitude estimates, **not** confirmed numbers. Confirming the real figure
> on the prospect's own line *is the job of the 15-minute discovery call* — the Loom literally says so.

---

## The primary pain (what the whole engine leads with)

**Missed inbound calls → lost bookings.** An independent optometry front desk is one or two people.
Calls hit voicemail (or ring out) at lunch, after 5pm, on weekends, and whenever a second caller lands
while the first is still on the line. In appointment-and-recall businesses, an unanswered call is a
booking that walks to the practice down the street.

### The model (conservative, every assumption flagged "est.")
| Step | Assumption (est.) | Value |
|---|---|---|
| A. Inbound calls/week | ~180 (≈36/business day) — single-location family practice | 180 |
| B. Unanswered rate | ~28% (after-hours, lunch, simultaneous, slammed) — medical-front-desk benchmark | → ~50/wk missed |
| C. Share that are bookable | ~25% are new-patient or appointment (book/reschedule/recall) | → ~12–13/wk |
| D. AI recovery rate | ~40% recovered (answers 24/7, books instantly) — conservative | → ~5/wk ≈ **~21/mo** |
| E. Value per recovered visit | ~$300 (exam + partial materials; conservative vs. the ~$450 full-visit figure in `calls/_PLAYBOOK.md`) | |
| **Result** | | **~$6,300/mo recovered (est.)** |

**Reported as a conservative band, not a point estimate:** **~$3,000–$6,500/mo** recovered for a
typical single-location practice (~$36K–$78K/yr). Multi-site groups scale higher (~$5K–$11K/mo);
boutiques a touch lower (~$2.5K–$5.5K/mo). All figures **est.**, to be confirmed on the call.

### The AI fix (one sentence)
> An AI front desk answers **every** inbound call 24/7, books the appointment straight into the
> practice's calendar, and texts the patient a confirmation — so the leak stops without hiring.

### Time to first result
**≤7 days to go-live** (port/forward the number, train on services + scheduling rules, connect the
calendar). Measurable recovered bookings show up **inside the 7-day pilot window** → meets `SPEED_GATE`.

---

## Secondary pains (stack these on the call; don't lead with them)
| Pain | Quick economics (est.) | AI fix | First result |
|---|---|---|---|
| **No-shows** | ~15% no-show rate; AI SMS/voice reminders cut it ~30–50%. ~120 appts/wk → recover ~6–9 chair-slots/wk × ~$300 | Automated multi-touch reminders + easy reschedule | ≤7 days |
| **Recall / reactivation** | Optometry lives on annual recall; a backlog of patients overdue for an exam = found revenue | AI campaign texts/calls overdue patients to rebook | ≤7 days |
| **Slow web-lead response** | A web/Google Business message answered in minutes vs. hours decides who wins the patient | AI answers + books inbound web leads instantly | ≤7 days |
| **Review leakage** | Independents with thin Google reviews lose discovery to chains | AI review request after each visit | ≤7 days |

These are the same recovery levers the `calls/` discovery system is built to close on — the engine
hands a warmed, pain-quantified prospect straight into that playbook.

---

## DECISIONS — PROCEED vs HALT

### PROCEED (37)
All independent, owner-operated, appointment-based practices in `leads.csv` with `status=PROCEED`.
Each has: a quantified pain band (est.), a one-line AI fix, and a ≤7-day first result. The owner-OD
is reachable and owns the phone line we'd fix. → Generate assets + outreach.

### HALT (5) — gate fired, no outreach generated
| Target | Quantifiable owner-operator pain? | Reason |
|---|---|---|
| Eye Care & Surgeons of Charlotte | No | Surgical/ophthalmology center — booking flow and buyer don't match the model. |
| Eye Doctors of Arizona | No | Ophthalmology surgical group, larger org — ICP mismatch. |
| Kurt Theodore OD PA | No (not owned by target) | Inside Walmart Vision Centers — the host owns the phones/front desk. |
| Nashville Regional Eye Care, P.C. | No | National Vision-affiliated — centralized corporate back office. |
| South Tampa Eye Clinic | No | Sight360 (PE-backed multi-location) — has central ops, not SMB owner-op pain. |

> These are not deleted — they sit in `pipeline.csv` as `stage=halted` with the reason, so the gate is
> auditable and a target can be revived if its situation changes (e.g., a Walmart-host OD opens a
> standalone practice).

---

## VERIFY (Agent 3 checklist)
- [x] Every PROCEED row has a $/hour figure **and** a ≤7-day fix.
- [x] Figures carry stated assumptions and are marked **est.** (honesty over optimism).
- [x] Counts printed: **PROCEED 37 · HALT 5**.
- [x] No invented pain — weak/non-fitting targets are HALTed, not dressed up.
