# GHL Sub-Account Build — static configuration

The fixed scaffolding every client sub-account gets, before workflows. Build in this order.

## 1. Opportunity pipeline
Single pipeline, "Lead → Close → Nurture":

| Stage | Enters when | Auto-action |
|---|---|---|
| **New Lead** | any source creates contact | fires Speed-to-Lead (WF1) |
| **Contacted** | first auto-message sent | — |
| **Engaged** | lead replies | agent notified; stop automation |
| **Appointment Set** | calendar booking | fires reminders (WF4) |
| **Met / Showing** | appt completed | — |
| **Active (Offer/Search)** | working with client | — |
| **Under Contract** | accepted | — |
| **Closed** | deal closed | fires Review & Referral (WF6) |
| **Past Client (Nurture)** | post-close + imported DB | in Reactivation (WF5) |
| **Lost / Cold** | no engagement / dead | in Long-Term Nurture (WF3) |

## 2. Custom fields
- `Lead Source` (dropdown: Website, FB, IG, Zillow, Realtor.com, Google LSA, Open House, Sign Call, Referral, Import)
- `Lead Type` (Buyer / Seller / Both / Investor / Renter)
- `Price Range`, `Area / Neighborhood`, `Timeline` (Now / 30–90d / 3–6mo / 6mo+)
- `Pre-Approved` (Yes / No / Unknown)
- `Assigned Agent`
- `Consent_SMS` (Yes/No) + `Consent_SMS_Source` + `Consent_Date`
- `Consent_Email` (Yes/No)
- `Last Engagement` (date), `Segment` (Active Lead / Past Client / Sphere / DNC-Suppress)

## 3. Tags
- **Source:** `src-website`, `src-fb`, `src-ig`, `src-zillow`, `src-realtor`, `src-lsa`, `src-openhouse`, `src-referral`, `src-import`
- **Status:** `new-lead`, `missed-call`, `engaged`, `nurture`, `warm`, `appt-set`, `no-show`, `past-client`, `sphere`, `closed`
- **Compliance:** `consent-sms`, `no-sms`, `dnc`, `opted-out`

## 4. Calendars
- One calendar per receiving agent (or a single round-robin calendar).
- Booking link used in all messages: 15-min "intro call" + 30-min "consultation".
- Buffer 15 min; confirmation + 24h + 1h reminders on (driven by WF4).

## 5. Phone number + A2P 10DLC  *(client-gated)*
- Provision a local number (or port existing).
- **Register A2P brand** with the client's legal name + **EIN**; submit a **campaign** with use-case = "Customer Care / Mixed," sample messages, and opt-in/opt-out language. Start Day 1 — approval can take 1–3 business days.
- If using a toll-free number, complete **toll-free verification** instead.
- Configure keywords: `STOP/UNSUBSCRIBE` → opt-out + tag `opted-out`; `HELP` → help reply.

### Required opt-in / opt-out language (put on every lead form)
> "By submitting, you agree to receive calls and texts from {{Business}} at the number provided, including via automated means. Consent isn't a condition of purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help."

## 6. Snippet / template library
Reusable, branded blocks (referenced by workflows):
- `sig-email` — agent signature + **CAN-SPAM footer**: business legal name, physical address, one-click unsubscribe.
- `booking-link` — calendar URL.
- `opt-out-sms` — "Reply STOP to opt out."
- `intro-greeting`, `value-update`, `home-value-offer`, `referral-ask` — body snippets used across workflows.

## 7. Users & notifications
- Add receiving agents as users; set round-robin order.
- Internal notifications: new reply / warm lead → SMS + email + in-app to assigned agent within seconds.
