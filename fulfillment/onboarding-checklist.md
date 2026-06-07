# Onboarding Checklist — signed → live in 7 days

A repeatable runbook. Each new client follows this exact path. Check boxes as you go; SLAs in **bold**.

## Phase 0 — Kickoff & intake (Day 1)
**SLA: kickoff call booked within 24h of signing.**

### Collect (intake form)
- [ ] Business legal name + DBA, physical mailing address (CAN-SPAM footer)
- [ ] **EIN** (required for A2P 10DLC brand registration)
- [ ] Primary broker/agent name(s) + which agents receive leads (round-robin list)
- [ ] Branding: logo, colors, headshot, email signature, preferred "from" name
- [ ] Service area / neighborhoods + price bands
- [ ] Lead sources in use (website/forms, FB/IG lead ads, Zillow, Realtor.com, Google LSA, open-house, sign calls)
- [ ] Current CRM + database export (CSV) + **consent status** per contact if known
- [ ] Calendar(s) to connect + booking rules (duration, buffer, availability)
- [ ] Existing phone number (port?) or provision new
- [ ] Voice + tone notes (formal vs. casual), do/don't language

### Access / authorizations (client-gated)
- [ ] GHL sub-account created under our agency
- [ ] Facebook/Instagram pages connected (Lead Ads access)
- [ ] Website form access (or embed our GHL form / webhook)
- [ ] Zillow/Realtor.com lead routing email or integration
- [ ] Google Business Profile (for reviews + LSA) connected
- [ ] Calendar (Google/Outlook) connected

## Phase 1 — Build (Day 2–3)
- [ ] Sub-account base config from `ghl-build.md` (pipeline, custom fields, tags, calendars)
- [ ] Provision number; **submit A2P 10DLC brand + campaign** (allow 1–3 days for approval — start Day 1)
- [ ] Build all workflows from `ghl-workflows.md`
- [ ] Load snippet/template library; insert client branding + CAN-SPAM footer
- [ ] Set quiet hours to contact-local 8a–9p

## Phase 2 — Connect & import (Day 4)
- [ ] Connect each live lead source; map fields → contact + custom fields; tag source
- [ ] Import database; dedupe; segment into **Past Client / Sphere / Active Lead / DNC-Suppress**
- [ ] Mark consent: `Consent_SMS` only where prior express consent exists; everyone else = email/voice only
- [ ] Suppress opted-out / DNC

## Phase 3 — QA & live tests (Day 5)
**SLA: every workflow passes a live end-to-end test before go-live.**
- [ ] Submit a test lead through EACH connected source → confirm <60s SMS + email fire
- [ ] Place a test call → hang up → confirm missed-call text-back
- [ ] Book a test appointment → confirm confirmation + 24h/1h reminders
- [ ] Trigger reactivation on a test contact → confirm email sends, STOP works, agent gets warm-lead ping
- [ ] Confirm round-robin assignment + agent notifications land
- [ ] Confirm quiet-hours queuing + opt-out handling

## Phase 4 — Review & go-live (Day 6–7)
- [ ] Client reviews all copy in `ghl-workflows.md`; collect edits; apply
- [ ] Walk client through pipeline + how leads/notifications reach them (`client-welcome.md`)
- [ ] Confirm A2P approved; flip workflows to **Published**
- [ ] **Go-live**; monitor first 48h; daily check-in first week

## Definition of done
Live lead from every source produces a sub-60-second response, books to calendar, notifies the right agent, and the database is segmented with a reactivation campaign running — all consent-compliant.
