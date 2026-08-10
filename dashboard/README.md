# dashboard/ — the toggle UI

A dependency-free dashboard for the engine. **Open `../index.html` in any browser** (double-click works
— no server, no build step). Hostable as-is on GitHub Pages, Netlify, or any static host.

Toggle the industry chips up top (Optometry / Law / Accounting / Hedge Fund) to see, per vertical:
the config, the 5 KPIs (targets · pain-gate · **booked calls · pilots · MRR**), all 12 agents with live
status, the pain gate (proceed/halt + reasons), top targets, and artifact links (including the live
Gamma decks).

## Files
| File | Role |
|---|---|
| `../index.html` | shell + industry toggle |
| `styles.css` | dark dashboard styling |
| `app.js` | renders everything from the data (framework-free) |
| `data.js` | **the single source of truth** — `window.ENGINE_DATA` |

## Keeping it current
`data.js` mirrors the engine files (`engine/<vertical>/leads.csv`, `pain_briefs.md`, `run_plan.md`) plus
connector runs (Gamma decks). After each **weekly maintenance** (`../engine/MAINTENANCE.md`), update the
KPI/stage numbers in `data.js` — or just say *"refresh the dashboard"* and I'll regenerate it from the
engine. The two numbers to watch every week: **booked calls** and **MRR**.
