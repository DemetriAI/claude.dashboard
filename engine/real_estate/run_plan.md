# Run Plan — real_estate

**Motion:** cold-dominant (these prospects already buy leads, so they're reachable and pre-qualified on
intent). The hook is always *their own ad spend leaking to voicemail*.

## Weekly loop
1. **Source (Agent 2):** `python3 engine/tools/apify_sourcer.py` pulls advertisers running real-estate
   ads in the 6 seed metros → raw candidates in `_private/`. (Web-verified seed set already in `leads.csv`.)
2. **Gate (Agent 3):** promote candidates into `leads.csv` only on a real speed-to-lead/missed-call pain;
   HALT mega-teams with staffed ISA desks, big franchises with central routing, iBuyers/portals.
3. **Enrich (sendable list):** `python3 engine/tools/apollo_enrich.py` → verified emails in
   `_private/send_list.csv` (PII, gitignored).
4. **Loom (Agent 4):** record a 90-sec teardown for the top-score PROCEED targets (their ad/funnel → the
   voicemail leak → the fix).
5. **Send (Agent 7):** `python3 engine/tools/instantly_push.py` feeds the campaign; Instantly sends the
   **5×25/day** cadence (see `engine/SENDING.md`). Never blast — every email is merge-personalized.
6. **Book (Agent 9 — money event):** replies → calendar. Close with `./calls/_new-prep.sh "<Team>" home`.
7. **Prove → Testimonial → Convert (Agents 10–12):** 7-day pilot on their real ad leads; convert at day 7–12.

## Gates & guardrails
- **Fair Housing:** AI does intake/qualification (budget/timeline/financing) + scheduling only — never
  screens or steers on protected classes. No pricing/offer/legal advice.
- **Ads (Agent 8):** held until 2 paying clients. Best proof here is **dogfooding** — run the AI on your
  own ad leads and show the booked-showing rate.
- **Deliverability:** dedicated sending domains + 2–3 week warmup before 125/day (see `SENDING.md`).

## First result (≤7 days of go-live)
Booked showings from previously-missed/slow ad leads — measured against their current callback time.
