# GLOBAL CONFIG — real_estate run

| Field | Value | Notes |
|---|---|---|
| `VERTICAL` | **real_estate** | SMB. Individual agents / small teams / small independent brokerages — **already running Meta/Google ads.** |
| `BUYER` | **owner-operator** | The agent / team lead who owns the phone **and the ad budget**. |
| `REGION` | **United States — seed metros: Austin, Denver, Nashville, Charlotte, Tampa, Phoenix** | Matches the other verticals' metros. |
| `PAIN_RULE` | **active** | Proceed only on a real, quantified speed-to-lead / missed-call pain that **leaks paid ad spend**. |
| `SPEED_GATE` | **measurable result ≤7 days of GO-LIVE** | |
| `AUTHENTICITY` | **on** | "AI answers the leads you're **already paying for**, so your ad spend converts instead of rolling to voicemail." |
| `OFF_LIMITS` | **Fair Housing + no advice** | AI does **lead intake, qualification, and showing scheduling only** — it never screens or steers on protected classes (Fair Housing Act), and gives no pricing/offer/legal advice. |
| `OUTPUT_DIR` | `./engine/real_estate/` | |
| `SOURCING` | **Apify (Meta Ad Library + Google Ads Transparency) → Apollo enrich → Instantly send** | Scripts in `engine/tools/`; cadence in `engine/SENDING.md`. |

### Status: **configured — seed leads web-verified, Apify sourcer scales them.**
The wedge unique to this vertical: **they already spend on Meta/Google ads**, so the pitch ties directly
to wasted spend — *"you're paying for leads that ring out to voicemail."* This is the strongest cold
hook in the engine because the prospect has already proven (with money) that they want more clients.

Map to the close skin: `./calls/_new-prep.sh "<Team>" home` (home-services speed-to-lead motion).
