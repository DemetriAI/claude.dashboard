# claude.dashboard

Sales operations workspace for **PremierConnect AI** — the done-for-you AI front desk that answers every call and books it.

**▶ Open [`index.html`](index.html)** for the live UI dashboard — toggle across all four industries
(**Optometry · Law · Accounting · Hedge Fund**), each with its 12 agents, pain gate, KPIs, top targets,
and artifacts (including the live Gamma decks). No build step — it opens in any browser.

## `engine/` — the outreach & outcome engine (start here)

The full go-to-market machine: **12 agents** that run research → diagnose pain → Loom → Gamma →
outreach → book → prove → testimonial → convert. Re-skinnable per vertical by swapping one config
block. **Open [`engine/README.md`](engine/README.md) — it's the control-center dashboard and always
tells you where everything is at.** Weekly cadence lives in [`engine/MAINTENANCE.md`](engine/MAINTENANCE.md).

**Four verticals configured:** optometry (LIVE — 42 real targets, 37 PROCEED, 2 live Gamma decks),
plus law, accounting, and hedge_fund (re-skins ready: `config.md` + `skin.md`, sourcing queued). The
pipeline is mirrored to a **live Notion CRM**, and the engine feeds booked calls straight into the
`calls/` system below.

## `calls/` — discovery-call prep system

Everything needed to walk into a discovery call and close a **14-day free pilot** with a **pre-signed setup-fee + MRR agreement** (charge triggers on pilot → production).

| File | What it is |
|---|---|
| [`calls/_PLAYBOOK.md`](calls/_PLAYBOOK.md) | How to run the call — arc, psychology, vertical cheat-sheet, closer's rules |
| [`calls/_TEMPLATE_prep.md`](calls/_TEMPLATE_prep.md) | Vertical-aware master template (the 5 sections + VERIFY checklist) |
| [`calls/_new-prep.sh`](calls/_new-prep.sh) | One-command generator → `calls/{prospect}_prep.md` |
| `calls/{prospect}_prep.md` | Per-prospect prep docs (3 worked examples included) |

### Quick start
```bash
# Generate a prep doc for a new prospect (vertical = healthcare | home | legal)
./calls/_new-prep.sh "Bright Smile Dental" healthcare

# Open the result, replace every [[FILL: ...]] from their teardown, run VERIFY.
```

### Worked examples (real-shaped, ready to adapt)
- [`calls/bright-smile-dental_prep.md`](calls/bright-smile-dental_prep.md) — Healthcare (HIPAA, leads with BAA)
- [`calls/summit-air_prep.md`](calls/summit-air_prep.md) — Home services (HVAC)
- [`calls/hartwell-law_prep.md`](calls/hartwell-law_prep.md) — Legal (personal-injury intake)

Every prep doc covers, and self-verifies: **(1)** 5 qualification questions · **(2)** Hormozi value framing · **(3)** pilot close with *signed-agreement-before-pilot* mechanic · **(4)** objection handling (incl. compliance/BAA) · **(5)** day-12 conversion-call lock.
