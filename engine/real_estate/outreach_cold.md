# Cold Outreach — real_estate (Agent 7)

Lead-with-pain, artifact-led, and **opening on their own ad spend** — the unique wedge here. Every
message names the leads they're *already paying for* that ring out to voicemail, attaches a personalized
**Loom**, has **one CTA** (book 15 min), and carries the **Fair-Housing + no-advice guardrail**. Sent
through Instantly on the 5×25 schedule (see `engine/SENDING.md`), so every email auto-carries an
**unsubscribe link + physical address** (CAN-SPAM).

**Rule of 100 → here, 125/day** in 5 batches of 25 — but *personalized* (each carries the agent's pain +
metro + ad-spend angle via merge fields), never blasted. Quality of the hook is the unlock.

**Daily mechanics:** verified emails flow from `_private/send_list.csv` into the Instantly campaign; you
record Looms for the top-score PROCEED targets first. Log replies → bookings (Agent 9).

## The 5-touch cadence (per target, ~9 business days)
| Day | Channel | Purpose |
|---|---|---|
| 1 | **Email #1** + Loom | Their **ad spend leaking** + the $ figure + free-pilot CTA (guardrail line included) |
| 2 | **SMS / Phone** | Catch them live; reference the Loom |
| 4 | **Email #2** (bump) | Risk-reversal — "you only keep it if it books showings" |
| 6 | **SMS** (nudge) | One line, low friction |
| 9 | **Email #3** (breakup) | Takeaway close; door stays open |

---

## Worked example — [Team], paying-for-leads-that-go-to-voicemail (pain band ~$6,000–$30,000/yr)

**Email #1** — subject: `[[Team]] — the Facebook leads you're paying for are going to voicemail`
> `[[Agent]]` — you're running ads for buyer/seller leads (saw `[[specific ad/funnel]]`), which means
> you're *already paying* for the phone to ring. But a portal/Meta lead that hits voicemail or waits an
> hour for a callback has already messaged the next agent — the speed-to-lead window is **minutes**. At a
> buy-side commission of **$6,000–$15,000 a deal**, losing even 1–2 a year to slow follow-up is
> **$6K–$30K** — on top of the ad budget you spent to create those leads.
> I made you a 90-second teardown: `[[Loom link]]`.
> The fix: an AI front desk that answers every call **and** every ad lead in under a minute, 24/7,
> qualifies them on budget/timeline/financing, and books the showing on your calendar. It does
> **intake + scheduling only** — never screens or steers on anything protected (Fair Housing), and gives
> no pricing or legal advice. I'll build it **free** and run it on your leads for 7 days — you only
> continue if it books showings.
> Worth 15 minutes this week? `[[booking link]]`

**SMS / Phone opener (Day 2):**
> "Hi `[[Agent]]` — `[[you]]` from PremierConnect. I sent a 90-sec video on the ad leads `[[Team]]` is
> paying for that slip to voicemail. Not selling today — I want 15 min to show the fix and offer to build
> it free for a week. It's intake + scheduling only, fully Fair-Housing-safe. When's good?"

**Email #2 — bump (Day 4)** — subject: `re: [[Team]]`
> Floating this up. The point of the free 7-day pilot is zero risk — it answers your existing ad leads on
> your real line, books showings to your calendar, and you only keep it if it's working. Every week it's
> off, you're paying for leads that ring out. 15 minutes? `[[booking link]]`

**SMS nudge (Day 6):**
> `[[Agent]]` — still happy to build the AI front desk free for a week on your ad leads. Want the link?

**Email #3 — breakup (Day 9)** — subject: `closing the loop`
> I'll stop here, `[[Agent]]` — but the ads keep running and those leads keep choosing whoever answers
> first. If converting the leads you already pay for ever moves up the list, the free pilot stands.
> `[[booking link]]`

---

## Template (any PROCEED target)
> Subject: `{{TEAM}} — the leads you're paying for are going to voicemail`
> `{{AGENT}}` — {{ONE-LINE proof you saw their ads/funnel}}. You're paying to make the phone ring, but a
> Meta/portal lead that waits more than a few minutes signs with whoever answers first. At
> **$6K–$15K per deal**, that's **~{{PAIN_BAND}}** leaking past your ad spend. 90-sec teardown:
> `{{LOOM_LINK}}`. Fix: an AI front desk that answers calls + ad leads in <1 min, qualifies, and books the
> showing — **intake/scheduling only, Fair-Housing-safe, no pricing/legal advice**. I'll build it
> **free**, 7 days on your real leads — keep it only if it books showings.
> 15 minutes this week? `{{BOOKING_LINK}}`

---
*VERIFY before send: opens on THEIR ad spend + $ figure · exactly one CTA · Loom linked · Fair-Housing +
no-advice guardrail present · personalized merge fields (not blasted) · unsubscribe + physical address
auto-appended by Instantly.*
