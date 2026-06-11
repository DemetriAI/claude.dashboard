# Pilot Offer — DDQ/RFP Automation — hedge_fund (wedge #1)

> **Read `skin.md` + `config.md` first.** This pilot is **operational only** (document workflow — never
> alpha, returns, trade ideas, or investment advice), reached **warm-intro only**, and round one runs on
> **non-sensitive / synthetic material** so it can start **before** NDA + security review completes.
> Buyer: **COO / ops / IR / compliance lead — never the PM.**

---

## The problem (operational, quantified in TIME)
- Allocator due-diligence questionnaires (AIMA-style DDQs), consultant RFPs/RFIs, and database
  questionnaires commonly run to **hundreds of questions** — and a lean ops/IR team answers them
  **by hand, every time**.
- Estimate (confirm against your team's actuals): **many hours to days per DDQ/RFP**, recurring with
  every prospective allocator, annual refresh, and consultant update — stacked on top of LP letters,
  onboarding/KYC, and Form PF / ADV season.
- The same approved answers get re-typed, re-found, and re-versioned endlessly; the "answer library"
  lives in old Word files and one person's memory. Version drift is itself a compliance risk.

## The fix (governed, audited, human-approved)
**RAG over the fund's OWN approved answer library.** No generic AI answers, no invention.
1. Index your **approved** past responses (post-NDA; synthetic set for round one).
2. For each incoming question, the system retrieves the closest approved answers and drafts a response
   **with a citation back to the exact source answer** it drew from.
3. **A human on your team approves or edits every word** before anything leaves the building. Drafts
   with no approved source are flagged "no library coverage" — never improvised.
4. Every retrieval, draft, and approval is **logged and auditable**.

**Scope = operational sections only:** firm & ownership, operations, service providers, valuation
governance, compliance program, IT/BCP/cyber, onboarding. **Out of scope, always:** strategy,
performance, positioning, outlook, or anything investment-side — those stay 100% with your team.

## The 7-day pilot (delivery is 7 days; we know your *process* isn't)
Free. Runs entirely on the **synthetic library below** (or your public/marketing-cleared materials —
your call). **Zero internal documents, zero system access, zero risk.**

| Day | What happens |
|---|---|
| 1 | Kickoff (30 min with the ops/IR lead). Agree the test set + the quality bar. |
| 2–3 | We index the synthetic/non-sensitive library; build retrieval + source-citation. |
| 4–5 | System drafts a full operational DDQ section (~25–50 questions). Your reviewer grades each draft: **approve / minor edit / rewrite**. |
| 6 | We tune on the misses; re-run. |
| 7 | Readout: % usable on first pass, estimated **hours saved per DDQ**, gaps found in the answer library, and the phase-2 plan (NDA → security review → your real, graduated material). |

**Success bar (you set it; our target):** most drafts at "approve / minor edit," with a credible
hours-saved estimate **per questionnaire** — measured in time, never in dollars-of-returns.

## Governance / NDA / security stance (our credibility wedge — lead with it)
- **NDA before any internal document.** We expect and welcome your **vendor security review** — send
  your vendor DDQ; we complete it and disclose our full stack and subprocessors.
- **Phase order:** synthetic pilot → NDA → security review → non-sensitive real material → graduated
  expansion. You control every gate.
- **Your data is never used to train models.** Segregated storage, access-controlled, encrypted in
  transit/at rest, full audit log, deletion on request at any time.
- **Human-in-the-loop is mandatory, not optional.** The system drafts; your people approve.
- We provide an operational document tool. **We do not provide investment advice, and nothing in this
  workflow touches investment decisions, trading, or performance.**

---

## Synthetic sample — demo answer library
> ⚠️ **SYNTHETIC — illustrative only, no real fund data.** Every question and answer below was written
> by PremierConnect AI for a fictional "Example Capital Management, LP" to demonstrate the workflow.
> No real fund, person, service provider, or figure is referenced or implied.

| # | DDQ question (operational) | Approved-library answer (SYNTHETIC) |
|---|---|---|
| 1 | Describe your cash movement controls. | All cash movements require dual authorization by two designated signatories from an approved list maintained by the CFO; no single employee can initiate and approve the same transfer. Wire instructions are verified by call-back to a known contact, and the independent administrator confirms instructions against fund records before release. |
| 2 | Who calculates the fund's official NAV? | The official NAV is calculated monthly by the fund's independent third-party administrator. The Firm maintains shadow books internally and reconciles to the administrator each cycle; breaks above a defined threshold are escalated to the CFO and documented to resolution. |
| 3 | Describe your trade reconciliation process. | Positions and cash are reconciled daily against prime broker and custodian records by the operations team, which is independent of the investment team. Breaks are logged in the reconciliation system, aged, and escalated to the COO if unresolved beyond two business days. |
| 4 | Describe your valuation policy for hard-to-value positions. | The Firm maintains a written valuation policy overseen by a Valuation Committee (CFO, COO, CCO) that meets at least quarterly. Hard-to-value positions are priced per a documented hierarchy using independent sources where available; overrides require committee approval and written rationale, and the policy is reviewed annually with the auditor. |
| 5 | Describe your business continuity and disaster recovery arrangements. | The Firm maintains a written BCP covering loss of office, systems, or key personnel, with all critical systems cloud-hosted and accessible remotely via secure connection. The plan is tested at least annually, results are documented, and the most recent test was reviewed by the COO. |
| 6 | Describe your cybersecurity program. | The program includes mandatory multi-factor authentication, role-based access, endpoint protection, encryption in transit and at rest, and at-least-annual penetration testing by an external firm. Employees complete recurring phishing and security-awareness training, and a written incident-response plan designates roles and notification procedures. |
| 7 | Describe your compliance program and code of ethics. | The Firm's CCO administers a written compliance manual and code of ethics covering personal trading (pre-clearance and quarterly reporting), gifts and entertainment, outside business activities, and MNPI handling. An annual compliance review is conducted and findings are reported to senior management. |
| 8 | Describe your investor onboarding and KYC/AML process. | Subscriptions are processed by the independent administrator, which performs KYC/AML screening on all investors against applicable sanctions and watchlists prior to acceptance. The Firm reviews and approves each investor file, and enhanced due diligence is applied to higher-risk profiles per the written AML policy. |

> ⚠️ Repeat: **SYNTHETIC — illustrative only.** In a live engagement these would be *your* approved
> answers, drafted back to you with source citations, and **your team approves every word**.

---
*VERIFY: operational-only ✓ · no alpha/returns/advice language ✓ · warm-intro entry only ✓ · NDA +
security review before internal docs ✓ · pilot material synthetic/non-sensitive ✓ · value unit =
hours saved ✓ · 7 days = delivery, never the close ✓*
