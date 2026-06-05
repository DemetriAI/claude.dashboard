# Paid Ads — optometry (Agent 8)

> ⛔ **GATE — HOLD, do not spend yet.** The rule: start paid only with **≥2 paying clients + their
> testimonials**, then a **$100/day** test (Rule of 100). Right now there are **0** paying clients.
> **Ads stay parked until two pilots convert and give you a number + a quote.** Until then, every dollar
> and every hour belongs in cold + warm outreach (Agents 6–7). This creative is built and waiting so
> the day you hit the gate, you launch the same afternoon.

(Optometry is an SMB vertical, so ads are *eligible* — the hedge-fund STOP does not apply here.)

---

## Channel call
Meta + Google now. Treat **ChatGPT Ads as experimental** (self-serve not broadly open). Start Meta
(local radius + interest/behavior) for cheap volume; add Google Search for high-intent
("eye exam near me", "optometrist accepting new patients").

## 3 hook variants (pain-led — for the OWNER, not the patient)
This engine sells *to the practice owner*, so ads target ODs/owners, not eyewear shoppers.

1. **"Your front desk can't answer the phone at 6pm."**
   Independent optometrists: every missed call is a patient booking down the street. See how much
   you're leaking — free 60-second Coordination Tax Scorecard.
2. **"You didn't open a practice to chase voicemails."**
   AI front desk answers every call and books it — so you do the exam, not the phone tag. Free pilot,
   live in 7 days.
3. **"How many bookings did your practice miss this week?"**
   One or two people can't catch every call. Get your missed-call leak number in 60 seconds → we'll
   build the fix free for 7 days.

## Targeting
- **Geo:** local radius per metro (start 10–15 mi around the seed metros in `config.md`).
- **Occupation/keywords (Meta):** Optometrist, Optometry, Practice Owner, independent eye care; interests
  in practice-management + optical industry groups/publications.
- **Google Search:** intent terms — "answering service for optometry", "AI receptionist medical
  practice", "reduce no-shows optometry", "optometry missed calls".
- **Exclude:** job seekers, students, employees of national chains (LensCrafters/Visionworks/etc.).

## Landing page — "Coordination Tax Scorecard"
- **Above the fold:** "How much is your front desk leaking? Get your number in 60 seconds." → 4-field
  mini-quiz (calls/week, % missed est., avg visit value, # locations).
- **Result:** their estimated `$/mo missed` (same model as `pain_briefs.md`) → single CTA: **Book a
  15-minute call → we build the fix free for 7 days.**
- **Proof row:** the 2 client testimonials (pulled from `testimonials/`) — this is *why* the gate
  exists; the page is weak without them.
- **One CTA only.** The scorecard exists to **book the call**, nothing else.

## GHL handoff
Scorecard submit → GHL pipeline stage `scorecard_lead` → auto-book link (same-week slots, see
`bookings.md`) → on booking, move to `call_booked` and mirror into `pipeline.csv`.

---
*VERIFY: hooks are pain-first · one CTA · landing books a call · **gate honored** (HOLD until ≥2
paying clients + testimonials). hedge_fund STOP is N/A for this SMB vertical.*
