#!/usr/bin/env bash
#
# _new-prep.sh — spin up a discovery-call prep doc from the master template.
#
#   ./calls/_new-prep.sh "Prospect Name" <healthcare|home|legal> [--force]
#
# Fills the vertical-specific {{TOKENS}} and writes ./calls/{slug}_prep.md.
# Then open the file and replace every [[FILL: ...]] from the teardown.
#
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
template="$here/_TEMPLATE_prep.md"

usage() {
  cat >&2 <<'EOF'
Usage: _new-prep.sh "Prospect Name" <vertical> [--force]

  vertical:
    healthcare   Dental / med spa / clinic        (HIPAA -> leads with BAA)
    home         HVAC / roofing / plumbing        (data ownership / NDA)
    legal        Law / accounting / insurance     (confidentiality / privilege)

Examples:
  _new-prep.sh "Bright Smile Dental" healthcare
  _new-prep.sh "Summit Air" home
  _new-prep.sh "Hartwell Law" legal
EOF
  exit 1
}

prospect="${1:-}"; vertical="${2:-}"; flag="${3:-}"
[[ -z "$prospect" || -z "$vertical" ]] && usage
[[ -f "$template" ]] || { echo "Template not found: $template" >&2; exit 1; }

case "$vertical" in
  healthcare|health|hipaa|dental|medical|medspa)
    v_label="Healthcare — Dental / Med Spa / Clinic"
    customer="patient";  customers="patients"
    unit="appointment";  units="appointments"
    calendar="schedule"
    value_per_unit="\$450 / new-patient visit (lifetime value often \$1,200+)"
    dream="A schedule that runs full — every chair producing, no new patient ever lost to voicemail, and no-shows backfilled automatically."
    case_study="a 3-op dental practice recovered 24 missed calls/mo → 10 new patients → ~\$12K/mo added production inside the 14-day pilot."
    compliance=$'**"Is this HIPAA compliant? What about patient privacy?"** — *(Lead with BAA credibility. This question is a buying signal — treat it as a trust accelerant, not a hurdle.)*\n- **Acknowledge + flip to authority:** "Great question — and honestly, the fact that you asked tells me you run a tight practice. It\047s the *first* thing we handle, not the last."\n- **Evidence:** "We sign a **Business Associate Agreement (BAA)** with you before a single call is answered. Every call and message is encrypted in transit and at rest, access is logged, and we\047re architected for HIPAA from the ground up — most answering services simply can\047t say that."\n- **Re-close:** "So compliance isn\047t the risk here — voicemail that quietly loses patients is. Want me to include the BAA right in the agreement we sign today?"'
    ;;
  home|homeservices|hvac|roofing|plumbing|electrical)
    v_label="Home Services — HVAC / Roofing / Plumbing / Electrical"
    customer="customer"; customers="customers"
    unit="job";          units="jobs"
    calendar="dispatch board"
    value_per_unit="\$350 service call / \$8,000+ install or replacement"
    dream="Every call answered and every after-hours emergency booked — crews running full, and not one job walking to the competitor because nobody picked up."
    case_study="an HVAC company captured 31 after-hours calls in 14 days → 11 booked jobs → 2 system replacements (~\$18K)."
    compliance=$'**"What happens to my customer / lead data — is it secure?"**\n- **Acknowledge:** "Smart to ask — those leads *are* your revenue."\n- **Evidence:** "Your data is yours, full stop — encrypted, never sold or shared, and we\047ll sign a mutual NDA if you want it in writing. Our infrastructure is actually healthcare-grade (BAA-ready), so it\047s held to a higher bar than this even needs."\n- **Re-close:** "Data\047s locked down. The only thing leaking right now is the calls going to voicemail — ready to plug that?"'
    ;;
  legal|financial|law|finance|accounting|insurance)
    v_label="Legal / Financial — Law Firm / Accounting / Insurance"
    customer="client";       customers="clients"
    unit="consultation";     units="consultations"
    calendar="consult calendar"
    value_per_unit="\$3,500 avg signed matter (consult → retainer)"
    dream="Every potential client who calls gets captured and booked for a consult — no signed case ever lost to a voicemail or a missed callback."
    case_study="a personal-injury firm captured 18 intake calls in the pilot → 7 consults booked → 2 signed cases."
    compliance=$'**"What about client confidentiality / privilege?"**\n- **Acknowledge + flip:** "Exactly the right question for a firm — confidentiality is the whole game."\n- **Evidence:** "Caller and matter information is handled strictly confidentially — encrypted, access-logged — and we sign an NDA / confidentiality agreement up front. Our infrastructure is healthcare-grade (BAA-ready), so it\047s built for privileged data."\n- **Re-close:** "Confidentiality\047s covered in writing. The exposure today is intake calls hitting voicemail and walking to the firm down the street — shall we stop that?"'
    ;;
  *) echo "Unknown vertical: $vertical" >&2; usage;;
esac

slug="$(printf '%s' "$prospect" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//')"
out="$here/${slug}_prep.md"
[[ -e "$out" && "$flag" != "--force" ]] && { echo "Refusing to overwrite $out (use --force)" >&2; exit 1; }

today="$(date +%F)"
content="$(cat "$template")"

# Drop the operator-only HTML comment header.
content="${content#*-->}"
content="${content#"${content%%[![:space:]]*}"}"

replace() { content="${content//"$1"/"$2"}"; }
replace '{{PROSPECT}}'              "$prospect"
replace '{{DATE}}'                  "$today"
replace '{{VERTICAL_LABEL}}'        "$v_label"
replace '{{CUSTOMERS}}'             "$customers"
replace '{{CUSTOMER}}'              "$customer"
replace '{{UNITS}}'                 "$units"
replace '{{UNIT}}'                  "$unit"
replace '{{CALENDAR}}'             "$calendar"
replace '{{VALUE_PER_UNIT}}'        "$value_per_unit"
replace '{{DREAM}}'                 "$dream"
replace '{{CASE_STUDY}}'            "$case_study"
replace '{{COMPLIANCE_OBJECTION}}'  "$compliance"

printf '%s\n' "$content" > "$out"
echo "Created $out"
echo "Next: replace every [[FILL: ...]] from ${prospect}'s teardown, then run the VERIFY checklist at the bottom."
