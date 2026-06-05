# claude.dashboard

Sales operations workspace for **PremierConnect AI** — the done-for-you AI front desk that answers every call and books it.

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
