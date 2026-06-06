// PremierConnect AI — dashboard data model.
// Hand-built 2026-06-05 from /teardowns + /pipeline.
// When credentials are configured, scripts/generate-teardown.mjs overwrites this file
// on a schedule (see .github/workflows/refresh-pipeline.yml). All $ figures are est.
window.DASHBOARD_DATA = {
  generatedAt: "2026-06-05",
  repo: { owner: "DemetriAI", name: "claude.dashboard", branch: "claude/happy-rubin-4whWC" },
  system: {
    hosting: { label: "Hosting", state: "action-needed", note: "Enable GitHub Pages (Actions source). See DEPLOY.md." },
    domain: { label: "Custom domain", state: "action-needed", note: "Set DNS + confirm site/CNAME. Currently a placeholder." },
    pipeline: { label: "24/7 gathering", state: "scaffolded", note: "Cron job ready; no-ops until APOLLO_API_KEY secret is set." },
    sending: { label: "Outreach send", state: "manual", note: "By design: human review gate before anything reaches a real business." }
  },
  goal: { revenueTarget: 5000, windowDays: 5, currency: "USD" },
  model: {
    launchFee: 1800, baseCaseLaunches: 3, baseCaseCash: 5400,
    funnel: [
      { stage: "Teardowns sent", count: 60, rate: "" },
      { stage: "Replies", count: 9, rate: "15% est." },
      { stage: "Calls booked", count: 5, rate: "55% of replies" },
      { stage: "Paid launches", count: 3, rate: "60% of calls" }
    ],
    cashByDay: [0, 1800, 3600, 5400, 5400]
  },
  totals: { targets: 40, ready: 12, queued: 28, estLeakageSurfaced: "~$1.3M–$1.5M (est.)" },
  verticals: [
    {
      name: "Optometry",
      benchmark: "25% no-show · $175–200/no-show · $300–500 exam+optical · 1★ = 5–9% rev",
      businesses: [
        { name:"Artisan Optics", city:"Boise, ID", phone:"(208) 377-8899", reviews:"~41 Yelp; 4–4.5★", leak:"~$165K–$180K/yr", status:"ready", file:"teardowns/artisan-optics.md", subject:"Artisan Optics — 3 silent front-desk leaks (~$165K/yr est.) | 1:50" },
        { name:"Eyecare Associates", city:"Fort Collins, CO", phone:"(970) 221-4811", reviews:"~41 Yelp; 100+ yrs", leak:"~$175K–$190K/yr", status:"ready", file:"teardowns/eyecare-associates-fort-collins.md", subject:"Eyecare Associates — 3 silent front-desk leaks (~$175K/yr est.) | 1:50" },
        { name:"Brisbane Eyecare", city:"Spokane Valley, WA", phone:"(509) 443-3145", reviews:"~11 Yelp; 4.3★", leak:"~$105K–$130K/yr", status:"ready", file:"teardowns/brisbane-eyecare.md", subject:"Brisbane Eyecare — the patients who never reach you (~$120K/yr est.) | 1:50" },
        { name:"Optic One Eye Care", city:"Spokane, WA", phone:"(509) 328-2632", reviews:"~99 Birdeye", leak:"~$150K–$165K/yr", status:"ready", file:"teardowns/optic-one-eye-care.md", subject:"Optic One — 3 front-desk leaks since '93 (~$155K/yr est.) | 1:50" },
        { name:"McNeel Eye Center", city:"Boise, ID", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"McNeel Eye Center — 3 silent front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Idaho Eyecare Center", city:"Boise, ID", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"Idaho Eyecare — 3 silent front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Boise Vision Care", city:"Boise, ID", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"Boise Vision Care — 3 silent front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Eyecare Associates of Boise", city:"Boise, ID", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"Eyecare Associates of Boise — 3 front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Vision Institute Northwest", city:"Spokane, WA", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"Vision Institute NW — 3 front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Pacific Eyecare & Optical", city:"Spokane, WA", phone:"verify", reviews:"verify", leak:"~$140K/yr est.", status:"queued", file:"", subject:"Pacific Eyecare — 3 front-desk leaks (~$140K/yr est.) | 1:50" },
        { name:"Colorado Optometry", city:"Fort Collins, CO", phone:"verify", reviews:"verify", leak:"~$150K/yr est.", status:"queued", file:"", subject:"Colorado Optometry — 3 front-desk leaks (~$150K/yr est.) | 1:50" },
        { name:"Edge Optics Eyewear", city:"Fort Collins, CO", phone:"verify", reviews:"verify", leak:"~$140K/yr est.", status:"queued", file:"", subject:"Edge Optics — 3 front-desk leaks (~$140K/yr est.) | 1:50" },
        { name:"Jackson Eye Care", city:"Fort Collins, CO", phone:"verify", reviews:"verify", leak:"~$140K/yr est.", status:"queued", file:"", subject:"Jackson Eye Care — 3 front-desk leaks (~$140K/yr est.) | 1:50" }
      ]
    },
    {
      name: "Law (personal injury)",
      benchmark: "35% calls unanswered · ~$144K/yr missed intake · 4x conversion if reply <5 min",
      businesses: [
        { name:"Hancock Injury Attorneys", city:"Tampa, FL", phone:"(813) 915-1110", reviews:"4.9★ / ~263", leak:"~$144K+/yr", status:"ready", file:"teardowns/hancock-injury-attorneys.md", subject:"Hancock Injury — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Riddle & Riddle Injury Lawyers", city:"Charlotte, NC", phone:"(704) 486-5824", reviews:"~52 / fragmented", leak:"~$144K+/yr", status:"ready", file:"teardowns/riddle-and-riddle-injury-lawyers.md", subject:"Riddle & Riddle — where signed cases slip (~$144K/yr est.) | 1:50" },
        { name:"Hale Law", city:"Sarasota, FL", phone:"(941) 735-4529", reviews:"600+ five-star", leak:"~$144K+/yr", status:"ready", file:"teardowns/hale-law.md", subject:"Hale Law — 3 places signed cases still slip (~$144K/yr est.) | 1:50" },
        { name:"Burnetti, P.A.", city:"Sarasota, FL", phone:"(941) 366-2838", reviews:"hundreds 5-star", leak:"~$144K+/yr", status:"ready", file:"teardowns/burnetti-pa.md", subject:"Burnetti — 3 places intake leaks at the margins (~$144K/yr est.) | 1:50" },
        { name:"Jack Bernstein Injury Attorneys", city:"Tampa, FL", phone:"verify", reviews:"1,500+ (competitor-grade)", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Jack Bernstein — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Boohoff Law", city:"Tampa, FL", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Boohoff Law — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Winters & Yonker", city:"Tampa, FL", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Winters & Yonker — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Catania & Catania", city:"Tampa, FL", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Catania & Catania — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"DeMayo Law Offices", city:"Charlotte, NC", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"DeMayo Law — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Rosensteel Fleishman", city:"Charlotte, NC", phone:"verify", reviews:"1,000+ (competitor-grade)", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Rosensteel Fleishman — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Mickelsen Dalton", city:"Charlotte, NC", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Mickelsen Dalton — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Nightingale Law Firm", city:"Sarasota, FL", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Nightingale Law — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"LeavenLaw Injury Lawyers", city:"Sarasota, FL", phone:"(800) 526-1949", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"LeavenLaw — where signed cases leak (~$144K/yr est.) | 1:50" },
        { name:"Smith Law", city:"Sarasota, FL", phone:"verify", reviews:"verify", leak:"~$144K/yr est.", status:"queued", file:"", subject:"Smith Law — where signed cases leak (~$144K/yr est.) | 1:50" }
      ]
    },
    {
      name: "Accounting",
      benchmark: "12–18 step onboarding · faster lead response materially lifts conversion · $2–5K/client/yr",
      businesses: [
        { name:"Austin CPA, PC", city:"Asheville, NC", phone:"(828) 785-1556", reviews:"4.4★ / 47", leak:"~$30K–$70K/yr", status:"ready", file:"teardowns/austin-cpa-pc.md", subject:"Austin CPA — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Montgomery & Company, CPAs", city:"Greenville, SC", phone:"(864) 233-8449", reviews:"4.6★ / 22", leak:"~$30K–$70K/yr", status:"ready", file:"teardowns/montgomery-and-company-cpas.md", subject:"Montgomery & Company — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Nason Accounting", city:"Greenville, SC", phone:"(864) 297-7742", reviews:"4.4★ / 14", leak:"~$25K–$55K/yr", status:"ready", file:"teardowns/nason-accounting.md", subject:"Nason Accounting — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"Matheney & Matheney CPAs", city:"Spokane Valley, WA", phone:"(509) 893-0150", reviews:"thin (est.)", leak:"~$25K–$55K/yr", status:"ready", file:"teardowns/matheney-and-matheney-cpas.md", subject:"Matheney & Matheney — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"George Dimov, CPA", city:"Asheville, NC", phone:"verify", reviews:"verify", leak:"~$50K/yr est.", status:"queued", file:"", subject:"George Dimov CPA — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Appletree Business Services", city:"Asheville, NC", phone:"verify", reviews:"verify", leak:"~$50K/yr est.", status:"queued", file:"", subject:"Appletree — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Carol L. King & Associates", city:"Asheville, NC", phone:"verify", reviews:"verify", leak:"~$50K/yr est.", status:"queued", file:"", subject:"Carol L. King — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Crawley, Lee & Company", city:"Asheville, NC", phone:"verify", reviews:"verify", leak:"~$50K/yr est.", status:"queued", file:"", subject:"Crawley Lee — 3 places new clients slip away (~$50K/yr est.) | 1:50" },
        { name:"Arthurs & Company CPA", city:"Greenville, SC", phone:"verify", reviews:"verify", leak:"~$45K/yr est.", status:"queued", file:"", subject:"Arthurs & Company — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"Blumer & Associates, CPAs", city:"Greenville, SC", phone:"verify", reviews:"verify", leak:"~$45K/yr est.", status:"queued", file:"", subject:"Blumer & Associates — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"Michael D. Caprye, CPA", city:"Spokane, WA", phone:"verify", reviews:"verify", leak:"~$45K/yr est.", status:"queued", file:"", subject:"Michael Caprye CPA — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"Clear Choice Tax Services", city:"Spokane, WA", phone:"verify", reviews:"verify", leak:"~$45K/yr est.", status:"queued", file:"", subject:"Clear Choice Tax — 3 places new clients slip away (~$45K/yr est.) | 1:50" },
        { name:"The Ledger Group", city:"Spokane, WA", phone:"verify", reviews:"verify", leak:"~$45K/yr est.", status:"queued", file:"", subject:"The Ledger Group — 3 places new clients slip away (~$45K/yr est.) | 1:50" }
      ]
    }
  ]
};
