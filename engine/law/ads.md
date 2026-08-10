# Paid Ads — law (Agent 8)

> ⛔ **GATE — HOLD, do not spend yet.** The rule: start paid only with **≥2 paying clients + their
> testimonials**, then a **$100/day** test (Rule of 100). Right now there are **0** paying law
> clients. **Ads stay parked until two pilots convert and give you a number + a quote.** Until then,
> every dollar and every hour belongs in cold + warm outreach (Agents 6–7). This creative is built
> and waiting so the day you hit the gate, you launch the same afternoon.

(Law is an SMB vertical, so ads are *eligible* — the hedge-fund STOP does not apply. **PI/consumer
law is the strongest ad case in the whole engine once gated:** a signed matter is $3,500+ and often
5–6 figures for PI, so even an expensive cost-per-booked-call pencils out. Note we advertise **to
firm owners**, not to claimants — so we pay normal B2B CPCs, not the $100+ "personal injury lawyer"
consumer CPCs.)

---

## Channel call
Meta + Google + LinkedIn. Start **LinkedIn + Meta** (attorneys are targetable by occupation/title)
for volume; add **Google Search** for high-intent owner queries. Treat ChatGPT Ads as experimental.

## 3 hook variants (pain-led — for the OWNER-ATTORNEY, not the claimant)
This engine sells *to the firm owner*, so ads target solo/small-firm attorneys, not people seeking
lawyers.

1. **"Your intake line goes dead every time you walk into court."**
   Solo and small-firm attorneys: the first firm to answer usually signs. At $3,500+ a matter, see
   what your missed intakes cost — free 60-second Missed-Intake Scorecard.
2. **"You didn't pass the bar to chase voicemails."**
   An AI intake line answers every call 24/7, qualifies, and books the consult — no legal advice,
   intake + scheduling only, NDA and confidentiality built in. Free pilot, live in 7 days.
3. **"How many signed matters did your firm miss this week?"**
   Injury, family, and immigration callers dial the next firm when you don't pick up. Get your
   missed-intake number in 60 seconds → we build the fix free for 7 days.

## Targeting
- **Geo:** start with the seed metros in `leads.csv` (Austin, Denver, Charlotte, Nashville, Tampa),
  then widen; the product is remote so geo is a focus tool, not a constraint.
- **LinkedIn:** job titles Attorney / Founding Attorney / Managing Partner / Owner at firms 1–10
  employees; practice-area keywords (personal injury, family law, immigration, criminal defense,
  estate).
- **Meta:** occupation/interest — attorney, law practice, solo practitioner; practice-management
  ecosystems (Clio, MyCase, bar-association pages).
- **Google Search:** owner-intent terms — "legal intake answering service", "after hours answering
  service law firm", "AI receptionist law firm", "law firm missed calls", "legal intake service cost".
- **Exclude:** law students, paralegals/staff job-seekers, BigLaw employees, in-house counsel,
  firms with staffed 24/7 intake centers (Morgan & Morgan-class brands).

## Landing page — "Missed-Intake Scorecard"
- **Above the fold:** "How many signed matters is your intake line leaking? Get your number in 60
  seconds." → 4-field mini-quiz (intake calls/week, % missed est., avg matter value, practice area).
- **Result:** their estimated `$/mo in lost signed matters` (same model as `pain_briefs.md` — signed
  matter $3,500+ × recovered intakes/mo) → single CTA: **Book a 15-minute call → we build the fix
  free for 7 days.**
- **Compliance row (law-specific, above the proof):** "No legal advice — ever. Intake + scheduling
  only. NDA signed before we touch your line; built around confidentiality and privilege; conflicts
  stay with your team."
- **Proof row:** the 2 client testimonials (pulled from `testimonials/`) — this is *why* the gate
  exists; the page is weak without them.
- **One CTA only.** The scorecard exists to **book the call**, nothing else.

## GHL handoff
Scorecard submit → GHL pipeline stage `scorecard_lead` → auto-book link (same-week slots) → on
booking, move to `call_booked` and mirror into `pipeline.csv`.

---
*VERIFY: hooks are pain-first · one CTA · landing books a call · **gate honored** (HOLD until ≥2
paying clients + testimonials) · no-legal-advice + confidentiality/privilege/NDA on the landing page ·
ads target owners, never claimants. hedge_fund STOP is N/A for this SMB vertical.*
