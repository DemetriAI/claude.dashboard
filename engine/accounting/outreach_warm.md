# Warm Outreach — accounting (Agent 6)

**Status for this run:** every target in `leads.csv` is **cold** (web-sourced, no prior
relationship), so there are no warm contacts to send *yet*. This file is the
**ready system** — it activates the moment you have a warm contact, plus plays to manufacture
warmth. Accounting runs on referral channels (bankers, attorneys, advisors all trade client
introductions with CPAs daily), so one good intro compounds fast.

**Framework:** give-give-give-ask + **ACA** (Acknowledge, Compliment, Ask). Never hard-pitch.
**Rules:** 3 touches/contact · single CTA · **no pricing in T1** · <120 words/msg.
**Guardrail in all copy:** the AI gives **no tax or financial advice** — intake, scheduling, and
doc-collection only — **confidentiality + NDA** led up front.

---

## Where warm contacts come from (work these first — highest conversion in the engine)
1. **Pilot clients → peer CPAs.** After a good 7-day result, ask: *"Who's the one firm owner you'd
   actually grab coffee with at the state-society meeting?"* Accountants refer work they can't take
   every January.
2. **Bank + loan officers.** They sit between small businesses and CPAs all day and trade intros
   constantly. Give first: a one-pager their SMB clients will thank them for.
3. **Adjacent professionals.** Estate/business attorneys, financial advisors, bookkeepers who
   hand off to CPAs (and vice versa) — each knows a dozen firm owners.
4. **State CPA society / chamber / local business associations.** One credible member vouching
   opens a chapter. Give first: a free talk or written piece — *"what one missed March call costs
   a firm"* — numbers only, zero pitch.
5. **QuickBooks ProAdvisor / bookkeeping meetups.** Owner-operators concentrated in one room.

> Log each warm contact as a new row in `pipeline.csv` (stage `warm_contact`) so it doesn't get lost.

---

## The 3-touch warm sequence (fill and send)

**T1 — value first (ACA, no ask for the sale).** *Give.*
> Hey {{NAME}} — {{MUTUAL}} mentioned you run {{FIRM}} **[Acknowledge]**. I've been deep in how
> owner-operated firms survive the January–April phone spike without losing callers, and what you've
> built is exactly the kind of local firm that deserves to catch every one **[Compliment]**. I made
> you a 90-second teardown of where I think calls (and document-chase hours) are leaking — want me
> to send it over? **[Ask: permission, not pitch]**

**T2 — short re-engage (2–3 days later).** *Give again.*
> Quick follow-up, {{NAME}} — here's that teardown: {{LOOM_LINK}}. One number jumped out: at
> $1,500–$5,000/yr per retained client, it looks like ~{{PAIN_BAND}} a year in missed busy-season
> callers. (To pre-empt the obvious question — the fix does intake, scheduling, and doc-collection
> only, never tax advice, under NDA.) No agenda — tell me if I'm off base.

**T3 — the ask (free pilot OR the intro, risk-reversed).** *Ask.*
> If it's useful, I'll build the fix for {{FIRM}} **free** and run it on your real phones for
> 7 days — client data stays yours, you only continue if it catches calls. Worth 15 minutes? **And
> if it's not for you but you know the firm owner it *is* for — who comes to mind?** {{BOOKING_LINK}}

---

## Season note
Warm touches work year-round (unlike cold, which is window-timed): off-season T1s land *better*
because owners can breathe. Aim asks (T3) to convert into pilots before the **Oct 15 extension
crunch** or the **Jan 15 season start** — "live before the spike" is the natural deadline.

---
*VERIFY: 3 touches · single CTA each · no pricing in T1 · <120 words/msg · no-tax/financial-advice +
confidentiality/NDA present. For a referral target, the ask in T3 is the **introduction**, not the sale.*
