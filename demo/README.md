# PremierConnect AI — Interactive Demo

A moving, browser-based sales demo for the real-estate offer. Built to be shown **live in a meeting** or screen-recorded for a **Loom**. No build step, no dependencies — three static files.

## What it is
A full-screen, slide-style web experience with a **live-looking product UI**: incoming leads getting auto-answered in real time, an SMS thread that types itself out, a database-reactivation feed, and metrics that count up. Same content/pricing as the Gamma deck, rendered as motion.

## Run it
```bash
# from repo root
cd demo && python3 -m http.server 8099
# then open http://localhost:8099
```
Or just open `demo/index.html` directly in a browser (double-click). Best viewed full-screen.

## Demo / Loom tips
- **Present like slides:** `→ / ↓` next, `← / ↑` previous (or scroll). The right-side dots jump to any section.
- **The money shot is the "Live demo" section** — leads answer themselves, the database thread captures a referral, revenue ticks up. Let it run for ~15s on camera.
- Hit **full-screen** (F11 / ⌃⌘F) before recording for a clean frame.
- Honors `prefers-reduced-motion` — animations fall back to static states.

## Sections
Hero (live SMS) → Speed-to-lead pain → Database decay → Cost → **Live dashboard** → Workflows → Compliance → 30-day proof → Pricing (3 tiers) → CTA.

## Edit
- Copy/stats live in `index.html`; styling in `styles.css`; all motion/simulation in `app.js`.
- Pricing is the agreed value ladder: **$1,500 setup (all tiers)**; **$1,500 / $1,250 / $1,000** monthly (month-to-month / 6-mo / 12-mo +1 free).

## Host a shareable link (optional)
GitHub Pages "deploy from a branch" only serves the repo **root** or **`/docs`** (not arbitrary subfolders), and Pages on a **private** repo needs a paid GitHub plan. Easiest options:
- **GitHub Pages:** copy these files to `/docs` (or add a Pages Actions workflow), then Settings → Pages → deploy from branch → `/docs`.
- **Instant public URL:** drag the `demo/` folder onto [Netlify Drop](https://app.netlify.com/drop), or deploy with Vercel.
- Ask and I'll wire up whichever you prefer.

> Pilot result and benchmark stats are representative figures from the engine appendix — swap in a real client metric as soon as you have one.
