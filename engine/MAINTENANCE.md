# 🔁 Weekly Maintenance — the engine's heartbeat

This is the bread-and-butter rhythm. Run it **once a week** (≈60–90 min) and the pipeline never goes
stale. The whole job: **keep the top of funnel full, move every reply to a booked call fast, and turn
live pilots into paid MRR.** Everything else is housekeeping.

> **To run it:** open a session and say **"run weekly maintenance"** — I'll walk this checklist, update
> `pipeline.csv` + the dashboard numbers in `README.md`, and tell you exactly what to send. (Want it
> on autopilot? I can wire a recurring check-in via the `/loop` skill or a scheduled reminder — just
> say the cadence, e.g. every Monday 8am.)

---

## The weekly loop (in priority order — top = most revenue-critical)

### 1. 💰 Work live pilots & conversions first (Agents 10–12)
- [ ] Any pilot at **day 7** → fill `results/{client}.md` (real baseline→delta, $ recovered).
- [ ] Any pilot at **day 7–12 with a win** → run the convert (`conversions/`): show the $, restate the
      locked terms, trigger billing, book production onboarding. **Update MRR in `README.md`.**
- [ ] Any win → capture the testimonial (`testimonials/`) — number + permission. (This is what unlocks ads.)

### 2. 💰 Move every reply to a booked call THIS WEEK (Agent 9)
- [ ] Every reply/positive signal from the week → offer two same-week slots, attach deck+Loom pre-read,
      set T-24h/T-1h reminders. Update `pipeline.csv` → `call_booked` and the booking log.
- [ ] For each booked call → generate the close prep: `./calls/_new-prep.sh "<Practice>" healthcare`.

### 3. Advance the outreach cadence (Agents 6–7)
- [ ] Move every in-flight cold target one step down the 5-touch cadence (`outreach_cold.md`):
      email→call→LinkedIn→bump→breakup. Don't let anyone stall mid-sequence.
- [ ] Work warm/referrals (`outreach_warm.md`): ask every happy client for **one** peer-OD intro.

### 4. Refill the top of funnel (Agents 2–3) — never let it run dry
- [ ] Keep **≥20 PROCEED targets** in `outreach_ready`. If below, source a new metro (two queries in
      `leads.README.md`), then **re-run the pain gate** on the new rows (PROCEED/HALT, no rubber-stamping).
- [ ] Record this week's **batch of Looms** (`looms/_TEMPLATE.md`) for the next ~10–15 targets.

### 5. Housekeeping (keep the dashboard honest)
- [ ] Update `pipeline.csv` stages for every target that moved.
- [ ] Refresh the **Live status** table in `README.md` (booked calls, pilots live, MRR).
- [ ] Prune/flag dead leads (3 no-replies after the breakup → `stage=cold_dead`); re-score any that
      changed (new location, sold to a group → maybe HALT).
- [ ] Verify any `[verify]` fields you've since confirmed (owner names, domains).

### 6. Ads — only when the gate is met (Agent 8)
- [ ] **Skip** until you have **≥2 paying clients + their testimonials.** Then launch the $100/day
      Meta+Google test in `ads.md` and review spend→booked-call cost weekly.

---

## 📊 Weekly KPIs (log these — they tell you the bottleneck)
| Metric | Target rhythm | Where |
|---|---|---|
| New personalized touches sent | ~100/day on active days (Rule of 100) | `outreach_cold.md` |
| Replies | track reply-rate per metro/hook | `pipeline.csv` |
| **Calls booked / week** | the north star — must be > 0 every week | `README.md` |
| Pilots live | each is a future convert | `results/` |
| **MRR added / month** | the scoreboard | `README.md` |

**Reading the numbers:** no replies → fix the artifact/pain in T1. Replies but no bookings → strike
faster, same-week-slots only (Agent 9). Bookings but no converts → the pilot result isn't landing;
tighten `results/` measurement.

---

## 🗓️ Suggested cadence
- **Weekly (Mon, ~60–90 min):** run steps 1–5 above.
- **Daily on active outreach days:** send the day's personalized batch + advance any same-day replies to booked.
- **Monthly:** tally MRR, review which metro/vertical converts best, decide whether to re-skin a new
  vertical or deepen the current one.

> Re-skinning a new vertical (law, accounting, hedge_fund) is its own setup, not weekly maintenance —
> see [`README.md`](README.md) → "Re-skin to a new vertical."
