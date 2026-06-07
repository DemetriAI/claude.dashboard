# Fulfillment & Delivery System — AI Front Desk

What a client gets when they sign, how we build it, and who does what. Delivery platform: a **GoHighLevel (GHL) sub-account per client**.

## The two engines we deliver
- **Engine 1 — Speed-to-Lead.** Every inbound lead gets an automated, human-sounding response in **under 60 seconds, 24/7**, across SMS + email. Missed calls get an instant text-back. Hot leads are booked to the calendar and the agent is pinged.
- **Engine 2 — Database Reactivation.** The client's existing past-client / sphere database is segmented and run through a consent-respecting reactivation + long-term nurture so repeat and referral business surfaces automatically.

## The pieces (files in this folder)
| File | What it is |
|---|---|
| `onboarding-checklist.md` | Repeatable **signed → live in 7 days** process |
| `ghl-build.md` | Static sub-account config: pipeline, custom fields, tags, calendars, numbers/A2P |
| `ghl-workflows.md` | The automations (the actual product) — triggers, steps, timing, copy, compliance |
| `client-welcome.md` | Client-facing expectations + what we need from them |

## Who does what — the honest handoff
Most of this is build-side (me). The gated items are things only the client/owner can do because they involve money, credentials, or legal identity.

| Step | Build side | Owner / client-gated |
|---|---|---|
| GHL sub-account | configure end-to-end | **provide the GHL agency account / pay seat** |
| Phone number + A2P 10DLC | submit + configure registration | **provide legal business info (EIN), pay number/registration fees** |
| Lead sources (FB/IG, website, Zillow/Realtor.com, Google LSA) | connect + field-map | **authorize / grant access to their accounts** |
| Database import | clean, dedupe, import, segment | **export + send their database; confirm consent status** |
| Workflows + copy | build all of it | **approve copy + give go-live OK** |
| Calendar | connect + set rules | **connect their calendar(s)** |

## 7-day go-live timeline
**Day 1** kickoff + intake → **Day 2–3** build (config + workflows) → **Day 4** connect sources + import DB → **Day 5** QA / live tests → **Day 6** client review + copy approval → **Day 7** go-live + monitor.

## Compliance posture (non-negotiable)
- **SMS only with consent.** Speed-to-lead texting is fine when the lead form captures express consent; database SMS requires prior consent. Cold/old database = **email + voice first**, SMS only to opted-in contacts.
- **A2P 10DLC** brand + campaign registration before any SMS sends (client's EIN).
- **Quiet hours** 8am–9pm in the contact's local time; queue outside.
- **Honor STOP/unsubscribe instantly.** Every email carries a CAN-SPAM footer with the client's physical address + opt-out. HELP/STOP keywords on SMS.
