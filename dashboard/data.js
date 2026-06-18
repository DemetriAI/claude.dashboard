/* PremierConnect AI — engine dashboard data.
   Single source of truth for the UI. Regenerate from the engine/ files after each weekly maintenance.
   (Numbers mirror engine/optometry/leads.csv, pain_briefs.md, run_plan.md, and the connector runs.) */
window.ENGINE_DATA = {
  generatedAt: "2026-06-11",
  order: ["optometry", "law", "accounting", "real_estate", "hedge_fund"],
  verticals: {

    optometry: {
      label: "Optometry",
      status: "live",
      statusColor: "#28c081",
      buyer: "Owner-operator (the optometrist-owner)",
      region: "US — 6 seed metros",
      offLimits: "Healthcare-adjacent — lead BAA-ready infra",
      kpis: { targets: 42, metros: 6, proceed: 37, halt: 5, booked: 0, pilots: 0, mrr: 0 },
      gate: {
        proceed: 37, halt: 5,
        haltList: [
          { target: "Eye Care & Surgeons of Charlotte", reason: "Surgical center — booking-pain model does not fit" },
          { target: "Eye Doctors of Arizona", reason: "Ophthalmology surgical group — ICP mismatch" },
          { target: "Kurt Theodore OD PA", reason: "Inside Walmart Vision Centers — host owns the phones" },
          { target: "Nashville Regional Eye Care", reason: "National Vision-affiliated — centralized back office" },
          { target: "South Tampa Eye Clinic", reason: "Sight360 (PE-backed platform) — central ops, not SMB" }
        ]
      },
      pains: [
        { name: "Missed inbound calls → lost bookings", econ: "~$3,000–$6,500/mo (est.) · ~50 missed calls/wk", fix: "AI front desk answers 24/7 + books to calendar; live ≤7 days" },
        { name: "No-shows", econ: "~15% no-show; reminders cut 30–50%", fix: "Automated SMS/voice reminders + easy reschedule" },
        { name: "Recall / reactivation", econ: "Backlog of patients overdue for an annual exam", fix: "AI rebooking campaign to overdue patients" },
        { name: "Slow web-lead response", econ: "Minutes vs hours decides who wins the patient", fix: "AI answers + books inbound web leads instantly" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "done", note: "Plan + pain-gate audit" },
        { n: 2, name: "Research + Leads", status: "done", note: "42 real targets across 6 metros (web-sourced)" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "done", note: "37 proceed / 5 halt" },
        { n: 4, name: "Loom script", status: "done", note: "3 worked + template" },
        { n: 5, name: "Gamma deck", status: "live", note: "2 decks generated live in Gamma" },
        { n: 6, name: "Warm outreach", status: "ready", note: "ACA system; activates on first referral" },
        { n: 7, name: "Cold outreach", status: "done", note: "Pain-led sequences carrying the Loom" },
        { n: 8, name: "Paid ads", status: "gated", note: "Hold until 2 paying clients + testimonials" },
        { n: 9, name: "Book the call", status: "ready", money: true, note: "0 booked — awaiting first reply" },
        { n: 10, name: "Results & proof", status: "blocked", note: "Needs a live pilot (no go-live yet)" },
        { n: 11, name: "Testimonial", status: "blocked", note: "Needs a positive 7-day result" },
        { n: 12, name: "Convert", status: "blocked", money: true, note: "Needs a pilot at day 7–12" }
      ],
      topLeads: [
        { target: "Round Rock Eyes", metro: "Austin", pain: "$3,000–$6,500", score: 90 },
        { target: "True Eye Care", metro: "Denver", pain: "$2,500–$5,500", score: 90 },
        { target: "Oak Hill Eye Care", metro: "Austin", pain: "$3,000–$6,500", score: 89 },
        { target: "Look East", metro: "Nashville", pain: "$2,500–$5,500", score: 89 },
        { target: "Britton Vision", metro: "Tampa", pain: "$3,000–$6,500", score: 89 },
        { target: "Parmer Eye Care", metro: "Austin", pain: "$3,000–$6,500", score: 88 },
        { target: "Infinity Eyecare of Denver", metro: "Denver", pain: "$3,000–$6,500", score: 88 },
        { target: "Charlotte Family Eye Care", metro: "Charlotte", pain: "$3,000–$6,500", score: 88 }
      ],
      artifacts: [
        { label: "Engine folder", href: "engine/optometry/" },
        { label: "leads.csv (42)", href: "engine/optometry/leads.csv" },
        { label: "pain_briefs.md", href: "engine/optometry/pain_briefs.md" },
        { label: "Gamma: Round Rock Eyes", href: "https://gamma.app/docs/rda8u0bnlrxh5s3", live: true },
        { label: "Gamma: True Eye Care", href: "https://gamma.app/docs/eakkn83zi78d6cg", live: true },
        { label: "Weekly maintenance", href: "engine/MAINTENANCE.md" }
      ]
    },

    law: {
      label: "Law",
      status: "ready",
      statusColor: "#28c081",
      buyer: "Owner-operator (managing partner / solo)",
      region: "US — nationwide / remote",
      offLimits: "No legal advice from AI — intake + scheduling only",
      kpis: { targets: 28, metros: 6, proceed: 23, halt: 5, booked: 0, pilots: 0, mrr: 0 },
      gate: {
        proceed: 23, halt: 5,
        haltList: [
          { target: "Morgan & Morgan", reason: "National, 1,000+ attorneys with staffed 24/7 intake — no missed-call pain" },
          { target: "Lerner & Rowe", reason: "Staffed 24/7 intake call center — nothing for the AI to recover" },
          { target: "Holland & Knight", reason: "BigLaw (~2,200 attorneys) — no owner-operator buyer" },
          { target: "Modern Family Law", reason: "43-lawyer multi-state platform, centralized intake — exceeds ICP" },
          { target: "HCA Healthcare Legal Dept", reason: "In-house corporate legal — not a firm, no client intake" }
        ]
      },
      pains: [
        { name: "Missed/slow intake calls → lost signed matters", econ: "Matter $3,500+ · recover 2–6/mo → ~$7K–$25K/mo (est.)", fix: "AI intake answers 24/7, qualifies, books the consult" },
        { name: "Slow web-lead response", econ: "Speed-to-lead decides who signs the case", fix: "AI calls/answers web leads instantly, books consult" },
        { name: "Consult no-shows", econ: "~15–25% no-show; each is lost attorney time", fix: "Automated reminders + easy reschedule" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "done", note: "Plan + pain-gate audit" },
        { n: 2, name: "Research + Leads", status: "done", note: "28 real firms, 6 metros (web-sourced)" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "done", note: "23 proceed / 5 halt" },
        { n: 4, name: "Loom script", status: "done", note: "Template + 2 worked (Loewy, McCoy)" },
        { n: 5, name: "Gamma deck", status: "done", note: "Prompt + generic ready" },
        { n: 6, name: "Warm outreach", status: "ready", note: "Bar / referral ACA" },
        { n: 7, name: "Cold outreach", status: "ready", note: "5-touch sequences carry the Loom" },
        { n: 8, name: "Paid ads", status: "gated", note: "Hold until 2 paying clients (PI viable)" },
        { n: 9, name: "Book the call", status: "ready", money: true, note: "0 booked — awaiting first reply" },
        { n: 10, name: "Results & proof", status: "blocked", note: "Needs a live pilot" },
        { n: 11, name: "Testimonial", status: "blocked", note: "Needs a win" },
        { n: 12, name: "Convert", status: "blocked", money: true, note: "Needs a pilot at day 7–12" }
      ],
      topLeads: [
        { target: "Loewy Law Firm", metro: "Austin", pain: "$7,000–$25,000", score: 92 },
        { target: "McCoy Family Law", metro: "Denver", pain: "$7,000–$17,500", score: 91 },
        { target: "Pardo Law Firm", metro: "Charlotte", pain: "$3,500–$14,000", score: 90 },
        { target: "Bonilla Law Firm", metro: "Austin", pain: "$7,000–$25,000", score: 90 },
        { target: "Mark Scruggs Attorney", metro: "Nashville", pain: "$7,000–$17,500", score: 89 },
        { target: "Buitrago Law Firm", metro: "Tampa", pain: "$3,500–$14,000", score: 89 }
      ],
      artifacts: [
        { label: "leads.csv (28)", href: "engine/law/leads.csv" },
        { label: "pain_briefs.md", href: "engine/law/pain_briefs.md" },
        { label: "outreach_cold.md", href: "engine/law/outreach_cold.md" },
        { label: "looms/", href: "engine/law/looms/" },
        { label: "run_plan.md", href: "engine/law/run_plan.md" },
        { label: "config.md", href: "engine/law/config.md" }
      ]
    },

    accounting: {
      label: "Accounting",
      status: "ready",
      statusColor: "#28c081",
      buyer: "Owner-operator (firm owner / managing CPA)",
      region: "US — nationwide / remote",
      offLimits: "No tax/financial advice — intake, scheduling, doc-collection only",
      kpis: { targets: 27, metros: 6, proceed: 22, halt: 5, booked: 0, pilots: 0, mrr: 0 },
      gate: {
        proceed: 22, halt: 5,
        haltList: [
          { target: "H&R Block", reason: "National chain with corporate call-center intake — no owner-operator buyer" },
          { target: "Deloitte Tax", reason: "Big 4 — institutional buyers, no front-desk pain" },
          { target: "1-800Accountant", reason: "Staffed central client-service desk + scheduling already in place" },
          { target: "Dark Horse CPAs", reason: "National distributed platform behind local-looking pages — ICP mismatch" },
          { target: "Randolph Business Resources", reason: "40+ staff outsourced platform — exceeds the solo–~20 ICP" }
        ]
      },
      pains: [
        { name: "Missed calls, worst in tax season → lost clients", econ: "Client ~$1.5K–$5K/yr · ~$5K–$15K/yr+ (est.)", fix: "AI answers 24/7, qualifies, books the consult" },
        { name: "Client onboarding doc chase (PBC lists)", econ: "~2–5 hrs/client of back-and-forth; weeks of delay", fix: "AI requests, chases, and collects documents on a schedule" },
        { name: "No-shows / slow lead response", econ: "Lost billable slots; speed-to-lead loses clients", fix: "Reminders + instant inbound-lead booking" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "done", note: "Plan + pain-gate audit" },
        { n: 2, name: "Research + Leads", status: "done", note: "27 real firms, 6 metros (web-sourced)" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "done", note: "22 proceed / 5 halt" },
        { n: 4, name: "Loom script", status: "done", note: "Template + 2 (call-spike, doc-chase)" },
        { n: 5, name: "Gamma deck", status: "done", note: "Prompt + generic ready" },
        { n: 6, name: "Warm outreach", status: "ready", note: "Banker / advisor / CPA-society ACA" },
        { n: 7, name: "Cold outreach", status: "ready", note: "Season-timed 5-touch sequences" },
        { n: 8, name: "Paid ads", status: "gated", note: "Hold until 2 clients (seasonally flighted)" },
        { n: 9, name: "Book the call", status: "ready", money: true, note: "0 booked — awaiting first reply" },
        { n: 10, name: "Results & proof", status: "blocked", note: "Needs a live pilot" },
        { n: 11, name: "Testimonial", status: "blocked", note: "Needs a win" },
        { n: 12, name: "Convert", status: "blocked", money: true, note: "Needs a pilot at day 7–12" }
      ],
      topLeads: [
        { target: "Lowy's Tax Planning & Accounting", metro: "Phoenix", pain: "$2,500–$6,000", score: 91 },
        { target: "Tanya L. Stokes, CPA", metro: "Austin", pain: "$1,000–$3,000", score: 90 },
        { target: "Evan Hutcheson, CPA", metro: "Nashville", pain: "$1,000–$3,000", score: 90 },
        { target: "Matthew Schlanger, CPA", metro: "Denver", pain: "$1,000–$3,000", score: 89 },
        { target: "Hemingway & Buchanan, CPA", metro: "Austin", pain: "$1,500–$4,000", score: 89 },
        { target: "Louis Haskel, CPA", metro: "Tampa", pain: "$1,000–$3,000", score: 89 }
      ],
      artifacts: [
        { label: "leads.csv (27)", href: "engine/accounting/leads.csv" },
        { label: "pain_briefs.md", href: "engine/accounting/pain_briefs.md" },
        { label: "outreach_cold.md", href: "engine/accounting/outreach_cold.md" },
        { label: "looms/", href: "engine/accounting/looms/" },
        { label: "run_plan.md", href: "engine/accounting/run_plan.md" },
        { label: "config.md", href: "engine/accounting/config.md" }
      ]
    },

    real_estate: {
      label: "Real Estate",
      status: "ready",
      statusColor: "#28c081",
      buyer: "Owner-operator (agent / team lead who owns the phone + ad budget)",
      region: "US — 6 seed metros",
      offLimits: "Fair Housing — AI never screens/steers on protected classes; intake + scheduling only",
      kpis: { targets: 25, metros: 6, proceed: 20, halt: 5, booked: 0, pilots: 0, mrr: 0 },
      gate: {
        proceed: 20, halt: 5,
        haltList: [
          { target: "Cain Realty Group (KW)", reason: "Large Keller Williams franchise team with systems/staff + central lead routing — speed-to-lead already solved" },
          { target: "Bernie Gallerani Real Estate", reason: "34-employee #1 TN mega-team that staffs Inside Sales Agents (appointment setters)" },
          { target: "Andy Bovender Team (Compass)", reason: "42-person, $2B multi-market mega-team with full support + central routing" },
          { target: "Jessica Northrop Group (Compass)", reason: "Top 0.5% luxury team, $950M lifetime, dedicated support staff + structured intake" },
          { target: "The Duncan Duo Team (LPT)", reason: "Media-driven mega-team with staffed cash-offer / guaranteed-sale intake" }
        ]
      },
      pains: [
        { name: "Slow speed-to-lead on PAID leads → ad spend leaks", econ: "$6K–$15K/deal commission; portal/Meta leads die in minutes; ~$3K–$14K/mo at risk (est.)", fix: "AI answers + qualifies + books the showing in <1 min, 24/7" },
        { name: "Missed calls while showing / after hours", econ: "Buyer calls the next sign", fix: "AI answers every call, books, texts the agent the hot ones" },
        { name: "No follow-up on aged paid leads", econ: "A CRM full of bought leads never reworked", fix: "AI reactivation campaign to the old lead DB" },
        { name: "Showing no-shows", econ: "Wasted drive time + lost slots", fix: "Automated reminders + easy reschedule" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "done", note: "Config + skin + pain-gate audit" },
        { n: 2, name: "Research + Leads", status: "done", note: "20 PROCEED across 6 metros (web-verified; Apify scales + confirms live ads)" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "done", note: "20 proceed / 5 halt (HALT = staffed ISA / mega-teams)" },
        { n: 4, name: "Loom script", status: "ready", note: "Ad-spend-leak teardown (template pattern)" },
        { n: 5, name: "Gamma deck", status: "queued", note: "Generate per top target" },
        { n: 6, name: "Warm outreach", status: "ready", note: "Lender / title / mortgage-broker ACA" },
        { n: 7, name: "Cold outreach", status: "ready", note: "5×25/day via Instantly — ad-spend-leak sequence" },
        { n: 8, name: "Paid ads", status: "gated", note: "Hold until 2 clients — then dogfood on own ad leads" },
        { n: 9, name: "Book the call", status: "ready", money: true, note: "0 booked — awaiting first reply" },
        { n: 10, name: "Results & proof", status: "blocked", note: "Needs a live pilot" },
        { n: 11, name: "Testimonial", status: "blocked", note: "Needs a win" },
        { n: 12, name: "Convert", status: "blocked", money: true, note: "Needs a pilot at day 7–12" }
      ],
      topLeads: [
        { target: "Peter Hauben — Denver Realty", metro: "Denver", pain: "$5,000–$14,000", score: 92 },
        { target: "Liz McDermott — AZ Dream Home", metro: "Phoenix", pain: "$5,000–$13,000", score: 90 },
        { target: "Asad Shaikh — Your Tampa Expert", metro: "Tampa", pain: "$5,000–$13,000", score: 89 },
        { target: "Paul Welden — Buyers Agent PHX", metro: "Phoenix", pain: "$4,000–$12,000", score: 89 },
        { target: "Baemayr Realty Group", metro: "Austin", pain: "$4,000–$12,000", score: 88 },
        { target: "Sam Gray Real Estate", metro: "Nashville", pain: "$5,000–$13,000", score: 88 },
        { target: "Tampa Bay Elite Homes", metro: "Tampa", pain: "$4,000–$11,000", score: 88 },
        { target: "Ashley Jackson — Mueller Residential", metro: "Austin", pain: "$4,000–$11,000", score: 87 }
      ],
      artifacts: [
        { label: "leads.csv (25)", href: "engine/real_estate/leads.csv" },
        { label: "pain_briefs.md", href: "engine/real_estate/pain_briefs.md" },
        { label: "outreach_cold.md", href: "engine/real_estate/outreach_cold.md" },
        { label: "SENDING.md (5×25 cadence)", href: "engine/SENDING.md" },
        { label: "run_plan.md", href: "engine/real_estate/run_plan.md" },
        { label: "config.md", href: "engine/real_estate/config.md" }
      ]
    },

    hedge_fund: {
      label: "Hedge Fund",
      status: "configured",
      statusColor: "#7c5bff",
      buyer: "Back-office / ops lead (IR, compliance, ops)",
      region: "US — nationwide / remote",
      offLimits: "Operational savings ONLY — never alpha, returns, or advice",
      kpis: { targets: null, proceed: null, halt: null, booked: 0, pilots: 0, mrr: 0 },
      gate: null,
      pains: [
        { name: "DDQ/RFP responses (strongest wedge)", econ: "Hours–days each; the same questions answered endlessly", fix: "RAG over their own approved answers → drafts responses" },
        { name: "LP / IR comms drafting", econ: "Letters, capital-call notices, investor Q&A every period", fix: "AI drafts from approved templates + data; human approves" },
        { name: "Compliance / reg-reporting doc assembly", econ: "Form PF/ADV assembly under deadline", fix: "AI assembles + cross-checks document packages" },
        { name: "Investor onboarding / KYC", econ: "Chasing LP documents", fix: "AI requests, tracks, and collects" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "configured", note: "config.md + skin.md ready (different motion)" },
        { n: 2, name: "Research + Leads", status: "queued", note: "Warm-intro only; tag intro-required" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "queued", note: "Ops pains only — never trading" },
        { n: 4, name: "Loom script", status: "queued", note: "Hours saved, not dollars of returns" },
        { n: 5, name: "Gamma deck", status: "queued", note: "Governed, audited stack as credibility" },
        { n: 6, name: "Warm outreach", status: "queued", note: "THE channel — ask for the intro" },
        { n: 7, name: "Cold outreach", status: "queued", note: "LinkedIn, low-volume, high personalization" },
        { n: 8, name: "Paid ads", status: "stop", note: "STOP — principals are not ad-reachable" },
        { n: 9, name: "Book the call", status: "queued", money: true, note: "Expect a procurement/security step after" },
        { n: 10, name: "Results & proof", status: "queued", note: "On synthetic/non-sensitive DDQ first" },
        { n: 11, name: "Testimonial", status: "queued", note: "Anonymize per compliance" },
        { n: 12, name: "Convert", status: "queued", money: true, note: "Have NDA/BAA pack ready" }
      ],
      leadsNote: "Configured — warm-intro ONLY. Ads = STOP, cold rarely reaches principals. Expect an NDA + security gate before data; run the first pilot on non-sensitive/synthetic DDQ material. Delivery can be 7 days; the sale will not be. Never imply you affect returns.",
      artifacts: [
        { label: "config.md", href: "engine/hedge-fund/config.md" },
        { label: "skin.md (appendix, guardrails)", href: "engine/hedge-fund/skin.md" }
      ]
    }

  }
};
