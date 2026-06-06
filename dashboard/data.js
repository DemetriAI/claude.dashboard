/* PremierConnect AI — engine dashboard data.
   Single source of truth for the UI. Regenerate from the engine/ files after each weekly maintenance.
   (Numbers mirror engine/optometry/leads.csv, pain_briefs.md, run_plan.md, and the connector runs.) */
window.ENGINE_DATA = {
  generatedAt: "2026-06-05",
  order: ["optometry", "law", "accounting", "hedge_fund"],
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
      status: "configured",
      statusColor: "#f5b14c",
      buyer: "Owner-operator (managing partner / solo)",
      region: "US — nationwide / remote",
      offLimits: "No legal advice from AI — intake + scheduling only",
      kpis: { targets: null, proceed: null, halt: null, booked: 0, pilots: 0, mrr: 0 },
      gate: null,
      pains: [
        { name: "Missed/slow intake calls → lost signed matters", econ: "Matter $3,500+ · recover 2–6/mo → ~$7K–$25K/mo (est.)", fix: "AI intake answers 24/7, qualifies, books the consult" },
        { name: "Slow web-lead response", econ: "Speed-to-lead decides who signs the case", fix: "AI calls/answers web leads instantly, books consult" },
        { name: "Consult no-shows", econ: "~15–25% no-show; each is lost attorney time", fix: "Automated reminders + easy reschedule" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "configured", note: "config.md + skin.md ready" },
        { n: 2, name: "Research + Leads", status: "queued", note: "Run web/Apollo sourcing" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "queued", note: "Gate runs at sourcing" },
        { n: 4, name: "Loom script", status: "queued", note: "Lead with matter value" },
        { n: 5, name: "Gamma deck", status: "queued", note: "Re-skin generic deck" },
        { n: 6, name: "Warm outreach", status: "queued", note: "Bar / referral networks" },
        { n: 7, name: "Cold outreach", status: "queued", note: "Email + LinkedIn + phone" },
        { n: 8, name: "Paid ads", status: "queued", note: "Viable for PI once gate met" },
        { n: 9, name: "Book the call", status: "queued", money: true, note: "Same-week, live" },
        { n: 10, name: "Results & proof", status: "queued", note: "Recovered signed matters" },
        { n: 11, name: "Testimonial", status: "queued", note: "Result-led + permission" },
        { n: 12, name: "Convert", status: "queued", money: true, note: "Setup + MRR on convert" }
      ],
      leadsNote: "Configured — sourcing queued. Run Agents 2→3 (web path or Apollo when the plan is upgraded). Differentiator: signed matters are high-value, so even a few recovered intakes/mo is large. Closes via calls/ legal skin.",
      artifacts: [
        { label: "config.md", href: "engine/law/config.md" },
        { label: "skin.md (pains, guardrails)", href: "engine/law/skin.md" }
      ]
    },

    accounting: {
      label: "Accounting",
      status: "configured",
      statusColor: "#f5b14c",
      buyer: "Owner-operator (firm owner / managing CPA)",
      region: "US — nationwide / remote",
      offLimits: "No tax/financial advice — intake, scheduling, doc-collection only",
      kpis: { targets: null, proceed: null, halt: null, booked: 0, pilots: 0, mrr: 0 },
      gate: null,
      pains: [
        { name: "Missed calls, worst in tax season → lost clients", econ: "Client ~$1.5K–$5K/yr · ~$5K–$15K/yr+ (est.)", fix: "AI answers 24/7, qualifies, books the consult" },
        { name: "Client onboarding doc chase (PBC lists)", econ: "~2–5 hrs/client of back-and-forth; weeks of delay", fix: "AI requests, chases, and collects documents on a schedule" },
        { name: "No-shows / slow lead response", econ: "Lost billable slots; speed-to-lead loses clients", fix: "Reminders + instant inbound-lead booking" }
      ],
      agents: [
        { n: 1, name: "Orchestrator", status: "configured", note: "config.md + skin.md ready" },
        { n: 2, name: "Research + Leads", status: "queued", note: "Run web/Apollo sourcing" },
        { n: 3, name: "Pain Diagnosis (gate)", status: "queued", note: "Gate runs at sourcing" },
        { n: 4, name: "Loom script", status: "queued", note: "Lead with season-spike pain" },
        { n: 5, name: "Gamma deck", status: "queued", note: "Re-skin generic deck" },
        { n: 6, name: "Warm outreach", status: "queued", note: "Referral / bank networks" },
        { n: 7, name: "Cold outreach", status: "queued", note: "Time around pre-season" },
        { n: 8, name: "Paid ads", status: "queued", note: "Viable seasonally once gate met" },
        { n: 9, name: "Book the call", status: "queued", money: true, note: "Same-week, live" },
        { n: 10, name: "Results & proof", status: "queued", note: "Hours saved + recovered clients" },
        { n: 11, name: "Testimonial", status: "queued", note: "Result-led + permission" },
        { n: 12, name: "Convert", status: "queued", money: true, note: "Setup + MRR on convert" }
      ],
      leadsNote: "Configured — sourcing queued. Unique wedges: tax-season call spikes + the document chase (PBC lists). Closes via calls/ legal/financial skin.",
      artifacts: [
        { label: "config.md", href: "engine/accounting/config.md" },
        { label: "skin.md (pains, guardrails)", href: "engine/accounting/skin.md" }
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
