# PremierConnect AI for Funds — Research-Systems Playbook

> Master brief. The product is **24/7 AI research & monitoring infrastructure** that gives lean funds the research throughput of a megafund. Companion files: `offers.md`, `targets.md`, `messages.md`.

## 0. The thesis
Megafunds (Citadel, Point72, Two Sigma, Marshall Wace, Balyasny) run 50–100-person data/ML teams. A $50M–$2B fund can't. We sell **megafund-grade, always-on AI research at a fraction of the cost.** Humans sleep and cover ~15–20 names; AI doesn't and covers thousands — including overnight Asia/Europe sessions and after-hours filings. That delta is the edge over funds not using it.

## 1. The 5 pain points we attack (24/7, provable)
1. **Research coverage gap** — agents continuously read 10-Ks/Qs, 8-Ks, transcripts, sell-side, news → bull/bear memos, comps, model updates. *A 4-analyst shop outputs like 40.* (Proof: AlphaSense, Hebbia, Rogo, Brightwave, Daloopa.)
2. **24/7 monitoring & event detection** — always-on watch on positions + watchlist across 8-Ks, Form 4 insider buys, 13D activist stakes, litigation, downgrades, mgmt changes, foreign filings → "so-what + action" alerts. *Zero blind spots* (8-Ks routinely drop after the close).
3. **Earnings/news speed-to-insight** — parse a release/transcript in seconds: beat/miss vs consensus, guidance delta, KPI extraction, tone shift, surprise flags — before the sell-side note. *Latency = P&L.*
4. **Alt-data signal extraction** — ingest/clean/normalize card spend, web/app traffic, job posts, satellite, shipping → anomalies vs consensus, mapped to tickers. (Proof: Marshall Wace TOPS, Point72, Two Sigma; vendors YipitData/M Science/Earnest.)
5. **Primary-research / expert-call synthesis** — transcribe/summarize/extract every expert call, channel check, mgmt meeting, internal note; queryable corpus; flag contradictions + what changed. (Proof: Tegus/AlphaSense, Hebbia.)

## 2. Segment angles (the Austin list spans 3 buyer types)
- **Hedge funds / active asset managers (Tier A):** all 5 above — coverage, speed, monitoring, alt-data.
- **PE / growth / credit / VC (Tier B):** **deal sourcing & screening, diligence acceleration, portfolio-company KPI monitoring, market mapping.** Same engine, deal-flow framing.
- **Family offices / RIAs (Tier C):** **manager & investment due diligence, market research, automated client/board reporting.** (Capital Creek already buys this category — Canoe.)

## 3. ICP — best fit
Lean teams that *do research* and can't build in-house: emerging/mid hedge funds & active managers, lower-mid PE/credit, multi-family offices. **Not** prop/market-makers — they build it.

## 4. Promise & outcome
- **Promise:** "Cover 3–5x more names, never miss a market-moving event, and turn every filing, transcript, and expert call into instant insight — 24/7, without adding headcount."
- **Outcome:** more and better ideas + fewer blowups (alpha), and dozens of analyst hours redeployed from grunt work to thesis work. More alpha → more AUM/performance fees; automation → hours saved.

## 5. Pros & cons — what you're really selling
**Pros:** research is the fund's core value; AI scales it cheaply; 24/7 global coverage; democratizes megafund capability; fast ROI (one idea or one avoided blowup pays for years).

**Cons / hard truths (lead with the guardrails — it's what makes you credible):**
- **Data licensing** — can't redistribute licensed feeds; build on the client's own entitlements.
- **MNPI / expert-network compliance** — Reg FD; the SAC/Galleon ghosts. Guardrails + logging, never raw scraping of nonpublic info.
- **Hallucination** — every output **cites its source**; human-in-the-loop before anything informs a trade; no black-box "signals."
- **Data security** — VPC / on-prem deployment, SOC2, least-privilege. Funds are paranoid (rightly).
- **Sophistication** — bigger funds may have pieces already; we **integrate/augment** (AlphaSense, Bloomberg, their CRM), not rip-and-replace.

## 6. Onboarding (research overlay on the `/fulfillment` engine)
1. **Day 0** — NDA + security review; confirm data entitlements + compliance guardrails (citations, logging).
2. **Day 1** — Intake: their universe (names/sectors/strategies), data sources, current stack.
3. **Days 2–3** — Stand up research agents (coverage memos, monitoring rules, earnings parsers) with source citations.
4. **Day 4** — Connect feeds (filings, transcripts, news, client-licensed alt-data); set alert routing.
5. **Day 5** — QA + analyst review; tune to their format/voice; human-in-loop checkpoints.
6. **Days 6–7** — Go-live; daily review first week.

## 7. Outreach message framework ("the prompt")
Goal: a 15-minute call **this week.** Kill "hey it's Demetri." Every message = **specific trigger about THEM → research/coverage pain → proof → tiny ask.**

**Formula:** (1) Trigger — their real, recent hook (see `targets.md`); (2) Bridge to a research pain for their segment; (3) Proof/offer; (4) one-line CTA.

**Template:**
> "{{First}} — {{specific trigger}}. Funds {{like yours / scaling coverage / running lean research teams}} keep hitting the same wall: {{specific pain}}. We build always-on AI research agents that {{outcome}} — {{one-line proof}}. {{specific offer}}. Worth 15 minutes {{day/day}}?"

**Channel order:** LinkedIn connect + note → personalized email same day → +48h follow-up → call if number known. You're selling **software**, not securities — no solicitation, no MNPI.
