# Paid Ads — accounting (Agent 8)

> ⛔ **GATE — HOLD, do not spend yet.** The rule: start paid only with **≥2 paying clients + their
> testimonials**, then a **$100/day** test (Rule of 100). Right now there are **0** paying accounting
> clients. **Ads stay parked until two pilots convert and give you a number + a quote.** Until then,
> every dollar and every hour belongs in cold + warm outreach (Agents 6–7). This creative is built
> and waiting so the day you hit the gate, you launch the same afternoon.

(Accounting is an SMB vertical, so ads are *eligible* — the hedge-fund STOP does not apply. **This
vertical's ad math is seasonal:** owner attention and pain both peak Nov–Jan ("be ready before
January 15") and Aug–Sep ("before the Oct 15 crunch"). When the gate is met, launch into the nearest
window — a dollar spent in December outworks three spent in May.)

---

## Channel call
Meta + Google + LinkedIn. Start **Meta + LinkedIn** (CPA/firm-owner targeting is clean) for volume;
add **Google Search** for high-intent owner queries. Treat ChatGPT Ads as experimental.

## 3 hook variants (pain-led — for the OWNER, not the taxpayer)
This engine sells *to the firm owner*, so ads target CPAs/owners, not people seeking tax help.

1. **"In March, your phone rings 4x — and nobody can answer it."**
   Owner-operated firms: every busy-season voicemail is a $1,500–$5,000/yr client signing with the
   next firm. See what your season leak costs — free 60-second Busy-Season Scorecard.
2. **"You didn't get your CPA to chase PDFs."**
   An AI assistant answers every call, books consults, and runs your document chase — no tax advice,
   intake/scheduling/doc-collection only, NDA built in. Free pilot, live in 7 days.
3. **"How many callers hung up on your firm last season?"**
   Overflow and after-hours calls ring out exactly when clients are deciding. Get your missed-caller
   number in 60 seconds → we build the fix free for 7 days, ready before the next deadline.

## Targeting
- **Geo:** start with the seed metros in `leads.csv` (Austin et al.); the product is remote so geo
  is a focus tool, not a constraint.
- **LinkedIn:** titles Owner / Partner / Managing Partner / CPA at firms 1–20 employees; industry
  Accounting; member of state-CPA-society groups.
- **Meta:** occupation/interest — CPA, accountant, tax preparer, bookkeeping; practice ecosystems
  (QuickBooks ProAdvisor, Drake, Lacerte, Canopy, Karbon communities).
- **Google Search:** owner-intent terms — "answering service for CPA firm", "accounting firm missed
  calls", "AI receptionist accounting firm", "tax season phone overflow", "client document collection
  for accountants", "PBC list follow-up".
- **Exclude:** Big 4 / national-chain employees (H&R Block, Liberty Tax, Jackson Hewitt corporate),
  students, staff job-seekers, taxpayers searching for tax help.
- **Flight timing:** weight budget to **Nov 1–Jan 31** and **Aug 15–Sep 30**; go dark Apr 1–15 (no
  one is buying the week of the deadline).

## Landing page — "Busy-Season Scorecard"
- **Above the fold:** "How much does your firm leak between January and April? Get your number in 60
  seconds." → 4-field mini-quiz (calls/week in season, % missed est., avg client value/yr, # of
  clients on document checklists).
- **Result:** their estimated `$/yr missed` (retained client $1,500–$5,000/yr × missed callers) +
  `staff-hours/yr` on the document chase (2–5 hrs/client) → single CTA: **Book a 15-minute call →
  we build the fix free for 7 days.**
- **Compliance row (accounting-specific, above the proof):** "No tax or financial advice — ever.
  Intake, scheduling, and document collection only. NDA signed first; your clients' financial data
  stays confidential and stays yours."
- **Proof row:** the 2 client testimonials (pulled from `testimonials/`) — this is *why* the gate
  exists; the page is weak without them.
- **One CTA only.** The scorecard exists to **book the call**, nothing else.

## GHL handoff
Scorecard submit → GHL pipeline stage `scorecard_lead` → auto-book link (same-week slots) → on
booking, move to `call_booked` and mirror into `pipeline.csv`.

---
*VERIFY: hooks are pain-first · one CTA · landing books a call · **gate honored** (HOLD until ≥2
paying clients + testimonials) · no-tax/financial-advice + confidentiality/NDA on the landing page ·
ads target owners, never taxpayers · budget flighted to the seasonal windows. hedge_fund STOP is N/A
for this SMB vertical.*
