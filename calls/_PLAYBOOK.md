# PremierConnect AI — Discovery-Call Playbook

How to run the call this prep doc is built for. Read once; internalize the arc.

## The one-sentence offer
A **14-day free pilot** of a done-for-you AI front desk that answers every call and books it — they **sign the setup-fee + MRR agreement today** (price locked), and the **charge only triggers when the pilot converts to production.**

Why it works (the psychology):
- **Free pilot** → kills risk, gets a fast yes.
- **Signature up front** → commitment + consistency; price is locked, no renegotiation at conversion.
- **Charge on conversion** → "you only pay once it's proven on your own phones." Incentives aligned.
- **Day-12 conversion call booked live** → production becomes the default, not a decision they have to re-make.

## Call arc (≈30 min)
1. **Frame (2 min)** — "I went through your teardown; I want to show you exactly where calls are leaking and how we'd plug it in 14 days. Sound good?"
2. **Qualify (8 min)** — the 5 questions (§1). Quote their teardown numbers back at them. Write everything down.
3. **Value (6 min)** — the Hormozi equation (§2). Anchor the dream outcome to the revenue they just told you they're leaking.
4. **Close (8 min)** — the pilot mechanic (§3). Sign today, build now, pay on conversion. Then **stop talking.**
5. **Objections (as they come)** — §4. Acknowledge → reframe → evidence → re-close.
6. **Lock (3 min)** — book the **day-12 conversion call** live before you hang up (§5).

## Vertical cheat-sheet
| Vertical | They book | Worth | Compliance angle |
|---|---|---|---|
| **Healthcare** | appointments (chairs/providers) | ~$450/visit, $1,200+ LTV | **Lead with the BAA** — it's a trust accelerant |
| **Home services** | jobs (dispatch) | $350 call / $8K+ install | Data is theirs, NDA on request, BAA-ready infra |
| **Legal / financial** | consults / matters | $3,500+ signed matter | Confidentiality / privilege, NDA up front |
| **Real estate** | leads → showings / listing appts | $7,500+ commission/side | **TCPA consent + opt-outs** — texting compliance is the trust story |

> **Real estate runs on two leaks, not one** — speed-to-lead (the obvious sale) *and* a cold past-client database (the quieter, bigger money: ~82% of deals are repeat/referral, but most agents capture a fraction of that). Open the teardown with speed; differentiate and expand the deal with database reactivation. Compliance angle is **TCPA** — only text leads who opted in or reached out first, and honor opt-outs automatically. With no HIPAA/BAA to clear, it's the fastest build to stand up.

## Generate a new prep doc
```bash
./calls/_new-prep.sh "Prospect Name" healthcare   # or: home | legal | realestate
```
Then open `./calls/{prospect}_prep.md` and replace every `[[FILL: ...]]` with real teardown numbers and your pricing. Run the **VERIFY** checklist at the bottom before the call.

## Closer's rules of engagement
- **Numbers > adjectives.** "You're losing ~$9K/mo" beats "you're losing a lot."
- **After you present the price, the first to speak loses.** Sit in the silence.
- **Never end on "I'll follow up."** End on a booked calendar event.
- **The pilot is the proof.** When in doubt, fall back to: "You don't have to believe me — try it free on your own phones for two weeks."
- **Sign first, build second, charge third.** If they won't sign today, you haven't closed — you've scheduled a callback. Find the real objection.
