# Austin prospect list — Round 2 (10 firms)

Net-new, independent / owner-operated Austin brokerages that fit the PremierConnect AI value (instant inbound lead response + past-client database reactivation). **Excludes** the 5 firms already in the letter batch (Bramlett, Spyglass, DMTX, Keenan, Jorgenson).

> Source note: Apollo's bulk people-search is paid-only (free plan returns `API_INACCESSIBLE`), so this list was built from public sources — brokerage sites, LinkedIn, HAR/TREC, press. Owner names are public business principals. Contact emails/phones are **not** included here; enrich via Apollo (paid) or pull office contacts from each site as a next step.

| # | Firm | Owner(s) | Why it fits the value |
|---|------|----------|------------------------|
| 1 | **Regent Property Group** | Brian Talley (Founder / Owner / Managing Broker) | Owner-operated luxury boutique with steady web-driven inbound — a yes needs no committee; both engines land. |
| 2 | **ROOTS Residential Group** | Wendi Slaton Anderson (Founding Broker) | 100% referral-based business → database reactivation IS the engine; keep the sphere warm on autopilot. |
| 3 | **Teifke Real Estate (TRE)** | Matthew Teifke (Founder/CEO); Alex Coffman (Partner) | Fast-growing boutique, heavy online lead-gen + large agent bench → leads slip after hours; sub-60s response is the pitch. |
| 4 | **Twelve Rivers Realty** | Kevin Bown (Broker/Owner); Paul Smith (Co-Founder) | Independent boutique with resale + investor clients; instant response captures fast-moving investor leads. |
| 5 | **Devora Realty** | Johnny Devora (Broker / CEO / Owner) | Residential + multifamily/commercial across Austin & San Antonio; long cycles → reactivation keeps investor relationships warm for years. |
| 6 | **Pauly Presley Realty** | Brad Pauly (Broker/Owner); Matt Presley (Owner) | 35+ agents → highest inbound volume on the list; slow/missed leads at that headcount = real GCI leakage. |
| 7 | **DEN Property Group** | Bryan Cady & Will Steakley (Co-Founders) | Design-forward luxury boutique; high-touch clientele expects instant, polished response — brand-safe AI front desk. |
| 8 | **Gottesman Residential** | Laura Gottesman (Broker/Owner) | $1.6B+ luxury, referral/relationship-driven → database/sphere reactivation is the wedge (not cold speed). |
| 9 | **Moreland Properties** | Emily Moreland (Owner/Founder/Chairman); Sarah Railey (President/Broker) | Austin's oldest independent, ~75 agents / 4 offices → capture inbound across offices + reactivate a deep legacy database. |
| 10 | **Austin Real Estate Experts** | Greg Young (Co-Founder/Broker) | Web-lead-driven model → speed-to-lead is existential; every minute of delay is a lost conversion. |

## ICP rationale
All 10 are **independent and owner-led** (no corporate CRM/lead mandate to fight), actively transacting, and split cleanly into the two value angles:
- **Speed-to-lead pain** (high online inbound, team distribution): Teifke, Pauly Presley, Austin Real Estate Experts, Twelve Rivers, Regent.
- **Database / sphere reactivation** (referral-driven, deep client base): ROOTS, Gottesman, Moreland, DEN, Devora.

## Next steps
1. **Enrich contacts** — owner email + direct line (Apollo paid plan, or pull office/broker contact from each site / HAR).
2. **Personalize** — one custom hook per firm (same format as the original 5 letters), drop into the letter + follow-up-sequence templates.
3. **Track** — generate per-firm QR `?ref=` tags (`make_qr.py`) so scans stay attributable.

## Sources
- Regent Property Group — searchaustinhomes.com/company
- ROOTS Residential — rootsre.com
- Teifke Real Estate — teifkerealestate.com
- Twelve Rivers Realty — twelveriversrealty.com; LinkedIn (Kevin Bown)
- Devora Realty — devorarealty.com; LinkedIn (Johnny Devora)
- Pauly Presley Realty — paulypresleyrealty.com/about-us; LinkedIn (Matt Presley)
- DEN Property Group — denpg.com/leadership
- Gottesman Residential — gottesmanresidential.com; thescoutguide.com (Laura Gottesman)
- Moreland Properties — moreland.com/about; LinkedIn (Emily Moreland)
- Austin Real Estate Experts — austinrealestate.com/about
