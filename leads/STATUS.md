# Lead Pipeline — Status / Heartbeat

**Last run (UTC):** 2026-06-06 01:47:14  
**Health check:** PASS (0 blank phone/website required; found 0)  
**Region:** Phoenix metro, AZ  
**Total leads:** 90  ·  **Warm:** 19  ·  **Cold:** 71

| Vertical | Leads | Warm | Cold | Rating found |
|----------|------:|-----:|-----:|-------------:|
| optometry | 30 | 2 | 28 | 20 |
| law | 30 | 12 | 18 | 25 |
| accounting | 30 | 5 | 25 | 17 |

## How to know it's working
- **This timestamp updates on every pipeline run.** If it is older than
  your configured cadence (e.g. >24h for a daily run), a run was missed
  or failed — that is your signal to look.
- **Health check** must read PASS (no lead missing a phone or website).
- Cross-check against the **GitHub Actions** run history (independent,
  timestamped, can't be faked) once the schedule is enabled.

_Machine-readable copy: `_status.json`. Regenerate: `python3 score_leads.py`._
