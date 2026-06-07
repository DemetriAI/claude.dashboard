# GHL Workflows — the automations (the product)

Six workflows. Each lists **trigger → steps → timing → copy → exit → compliance**. Copy uses GHL merge fields (`{{contact.first_name}}`, `{{user.first_name}}`, `{{custom_values...}}`). All SMS respect quiet hours (contact-local 8a–9p) and only send when `Consent_SMS = Yes`.

---

## WF1 — Speed-to-Lead (new inbound) ⚡ *Engine 1*
**Trigger:** Contact Created from any source OR Opportunity enters **New Lead**.
**Steps:**
1. **0s** — Round-robin assign `Assigned Agent`; set `Lead Source`; move opp to New Lead.
2. **<60s** — **SMS #1** (if `consent-sms`):
   > "Hi {{contact.first_name}}, it's {{user.first_name}} with {{Business}} — thanks for reaching out about {{custom.area or 'your home search'}}. Are you looking to buy, sell, or both?"
3. **<60s** — **Email #1** (always): warm intro + `booking-link` + `sig-email` footer.
4. **+5 min, no reply** — **SMS #2:** "Happy to send a few options or just answer questions — what's the best number/time to reach you?" + create **call task** for agent.
5. **+1 hr, no reply** — **Email #2** with `booking-link`.
6. **+24 hr, no reply** — **SMS #3** (last in this WF) + tag `nurture`.
7. **Day 3, no reply** — move to **WF3 Long-Term Nurture**.

**On reply (any step):** stop WF1 → tag `engaged` → move opp to **Engaged** → notify agent instantly (SMS+email) → create booking task.
**Exit:** reply, booked, or moved to nurture.
**Compliance:** SMS gated on `consent-sms`; email always carries opt-out. Quiet hours enforced.

---

## WF2 — Missed-Call Text-Back ⚡ *Engine 1*
**Trigger:** Inbound call to GHL number with status missed / no-answer / voicemail.
**Steps:**
1. **Within seconds** — **SMS:** "Sorry we missed you — this is {{Business}}. How can we help? You can reply right here and we'll take care of you." 
2. Create contact if new; tag `missed-call`, `src-sign-call`; move to **New Lead**; notify agent.
**Exit:** reply (→ Engaged) or no reply in 24h (→ WF3).
**Compliance:** replying to an inbound caller is expected contact; still honor STOP.

---

## WF3 — Long-Term Lead Nurture *Engine 1 tail*
**Trigger:** Tagged `nurture` (from WF1/WF2) or imported `Active Lead` that's gone cold.
**Cadence (≈8–12 weeks, then monthly):** value-first, mostly **email**; SMS only to `consent-sms`.
- Wk 1 email — "still looking?" + offer to set a saved search.
- Wk 2 email — neighborhood market update for `{{custom.area}}`.
- Wk 4 email — 3 new listings matching `{{custom.price_range}}` / area.
- Wk 6 SMS (if consent) — "Want me to keep sending matches, or pause?"
- Wk 8 email — buyer/seller tip + `booking-link`.
- Monthly thereafter — market update / new listings.
**On engagement (open+click or reply):** tag `warm` → notify agent → call task → opp to **Engaged**.
**Exit:** reply, booked, or unsubscribed.

---

## WF4 — Appointment Booking, Reminders & No-Show
**Trigger:** Appointment booked on a connected calendar.
**Steps:**
1. **Immediately** — confirmation SMS + email (date/time, location/video link, agent).
2. **24h before** — reminder SMS + email.
3. **1h before** — reminder SMS.
4. **Status = No-Show** — re-book sequence: SMS "Missed you — want to grab another time?" + `booking-link`; +1 day email.
5. **Status = Showed/Completed** — move opp to **Met / Showing**; notify agent to advance.
**Compliance:** transactional reminders to someone who booked are expected; STOP still honored.

---

## WF5 — Database Reactivation 🔄 *Engine 2*
**Trigger:** Contact in segment **Past Client** or **Sphere** (added to a campaign, not per-lead).
**Pre-checks (hard gates):** suppress `dnc` + `opted-out`; **lead with EMAIL + voice** for the cold database; **SMS only if `consent-sms`**.
**Sequence (≈30–45 days, spaced):**
1. **Day 1 email** — personal check-in + soft `home-value-offer` ("curious what your place is worth in today's market?").
2. **Day 5 email** — neighborhood market update + recent comps.
3. **Day 10 — call task** for the agent to phone **openers/clickers** (warm signal, human touch).
4. **Day 18 email** — `referral-ask` ("know anyone thinking of moving this year?").
5. **Day 30 email** — light value (tax/insurance/seasonal homeowner tip).
6. **Ongoing evergreen** — home-purchase anniversary + birthday touches; quarterly market update.
**On engagement:** tag `warm` → notify agent → call task → create opportunity → move to **Engaged**.
**Exit:** becomes opportunity, or unsubscribes.
**Compliance:** TCPA — **no automated SMS to the database without prior express consent**; every email = CAN-SPAM footer + one-click opt-out, honored instantly.

---

## WF6 — Review & Referral (post-close)
**Trigger:** Opportunity moved to **Closed**.
**Steps:**
1. **+1 day** — thank-you SMS+email.
2. **+3 days** — Google review request (direct link).
3. **+30 / +90 days** — check-in emails.
4. **+1 year** — home-value + `referral-ask`; then enroll in **WF5** sphere nurture.
**Exit:** continuous (feeds Engine 2).

---

## Global rules
- **Quiet hours:** queue all SMS to contact-local 8a–9p.
- **Opt-out:** STOP/UNSUBSCRIBE → tag `opted-out`, suppress from all sends, confirm once.
- **Consent of record:** WF1/WF2/WF4 SMS rely on inbound/express consent; WF3/WF5 SMS rely on `Consent_SMS = Yes` only.
- **Human handoff:** the moment a lead replies or goes warm, automation stops and a human is pinged — the AI front desk opens the door; the agent closes.
