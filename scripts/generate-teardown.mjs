#!/usr/bin/env node
/**
 * PremierConnect AI — pipeline refresh engine (scaffold).
 *
 * DOES today (deterministic, safe, no credentials needed):
 *   - renderTeardown(business): builds a full <2-min teardown script from a
 *     verified business record, using the per-vertical leak math.
 *
 * NEEDS your accounts to do (clearly marked TODO):
 *   - gatherCandidates(): pull fresh targets from a data source (e.g. Apollo).
 *   - verifyBusiness():   confirm phone + Google review count from public data.
 *
 * It NEVER contacts a business. Outreach stays behind a human review gate by
 * design. Without APOLLO_API_KEY it no-ops cleanly (exit 0) so the scheduled
 * job stays green instead of emitting half-built or unverified content.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Per-vertical benchmarks (named public-data driven; figures are estimates). */
const BENCHMARKS = {
  optometry: {
    leak1: "an est. one in four calls go unanswered during exams and after hours",
    leak3: "Optometry runs an est. 25% no-show rate at $175-$200 an empty chair",
    money: "$300-$500 per exam-plus-optical visit",
    workflows: ["AI receptionist + missed-call text-back", "instant lead reply",
      "automated review engine", "smart recall + no-show rescue"],
  },
  law: {
    leak1: "an est. 35% of intake calls never convert (voicemail / message-taker)",
    leak3: "consult no-shows and two-week-old intake leads nobody re-touched",
    money: "~$144K/yr in missed intake; <5-min replies convert ~4x a slow callback",
    workflows: ["AI intake answering", "sub-60-second lead reply",
      "review engine", "follow-up / lead rescue"],
  },
  accounting: {
    leak1: "an est. 20-35% of calls miss (after-hours + tax-season crunch)",
    leak3: "a 12-18 step onboarding where signed clients stall before the first invoice",
    money: "$2K-$5K per business-tax client per year",
    workflows: ["AI receptionist", "instant web-inquiry reply",
      "review engine", "onboarding + recall sequence"],
  },
};

/** Build a full teardown markdown file from a verified business record. */
export function renderTeardown(b) {
  const bm = BENCHMARKS[b.vertical];
  if (!bm) throw new Error(`Unknown vertical: ${b.vertical}`);
  return `# Teardown — ${b.name}

**Vertical:** ${b.vertical} · **Location:** ${b.city} · **Built:** ${new Date().toISOString().slice(0, 10)}

**Suggested subject line:**
> ${b.subject}

## Verified public data
- **Phone (ringed live):** ${b.phone} · **Reviews:** ${b.reviews} · est. where noted
- **Competitor (leak 2):** ${b.competitor || "(set on verify)"}

## On-camera script (target <2 min, ~290 words)
**[HOOK]** ${b.contact ? b.contact + " — " : ""}90-second teardown made just for ${b.name}. Three places the front desk quietly leaks money. Let's go.

**[LEAK 1 — Missed calls · ring live]** I'm dialing ${b.phone} right now, on camera. If it rings out or hits voicemail, that's the leak — ${bm.leak1}. At ${bm.money}, the misses add up to ${b.leak} (est.).

**[LEAK 2 — Reviews vs competitor]** You're at ${b.reviews}; ${b.competitor || "a stronger competitor"} carries more (est.). The deeper review wall wins the click.

**[LEAK 3 — No-show / recall]** ${bm.leak3} — recoverable revenue sitting on the table (est.).

**[BRIDGE]** Four workflows, free for 14 days: ${bm.workflows.join("; ")}.

**[CTA]** If that's worth 15 minutes, book a 15-minute call below.

## Self-check — VERIFY gate
3 leaks · dollar figures (${b.leak}) · exactly one CTA · <2 min · named public data, estimates marked est.
`;
}

// --- Integration points (require your accounts) --------------------------
async function gatherCandidates() {
  // TODO: call your data source (e.g. Apollo org-search) and map results to
  // records: { name, vertical, city, phone, reviews, competitor, subject, leak }.
  throw new Error("gatherCandidates(): wire your lead source with APOLLO_API_KEY.");
}

async function verifyBusiness(b) {
  // TODO: confirm phone + Google review count from public sources BEFORE use.
  // Until wired, callers must pass already-verified records.
  return b;
}

// --- Main ----------------------------------------------------------------
async function main() {
  if (!process.env.APOLLO_API_KEY) {
    console.log("[pipeline] No APOLLO_API_KEY set — scaffold no-op. See DEPLOY.md to enable 24/7 gathering.");
    return; // exit 0: keep the scheduled run green
  }

  const candidates = await gatherCandidates();
  const verified = [];
  for (const c of candidates) verified.push(await verifyBusiness(c));

  mkdirSync(join(ROOT, "teardowns"), { recursive: true });
  for (const b of verified) {
    const slug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    writeFileSync(join(ROOT, "teardowns", `${slug}.md`), renderTeardown(b));
  }
  console.log(`[pipeline] Rendered ${verified.length} teardown(s). Review before any send.`);
}

main().catch((err) => {
  // Fail safe: surface the error (red run) but never emit partial/unreviewed work.
  console.error("[pipeline] error:", err.message);
  process.exit(1);
});
