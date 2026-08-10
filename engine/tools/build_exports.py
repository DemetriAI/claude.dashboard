#!/usr/bin/env python3
"""Build combined + GoHighLevel-ready CSV exports from every vertical's leads.csv.

Globs engine/*/leads.csv, so any new vertical is picked up automatically.
Outputs:
  engine/exports/all_leads.csv    every target across all verticals (PROCEED + HALT) + a `vertical` column
  engine/exports/ghl_contacts.csv PROCEED leads only, columns mapped for a GoHighLevel contact import

Run locally:  python3 engine/tools/build_exports.py
"""
import csv, glob, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
ENGINE = os.path.join(ROOT, "engine")
OUT = os.path.join(ENGINE, "exports")
os.makedirs(OUT, exist_ok=True)

SRC_COLS = ["target", "city_state", "metro", "website", "decision_maker", "dm_title",
            "contact_path", "size_signal", "public_pain_signal", "score", "warm_or_cold",
            "best_channel", "pain_monthly_est", "pain_summary", "ai_fix", "status", "source_url"]

rows = []
for path in sorted(glob.glob(os.path.join(ENGINE, "*", "leads.csv"))):
    vertical = os.path.basename(os.path.dirname(path))
    with open(path, newline="", encoding="utf-8") as f:
        n = 0
        for row in csv.DictReader(f):
            row["vertical"] = vertical
            rows.append(row)
            n += 1
    print(f"  {vertical}: {n} rows")

# --- all_leads.csv : full picture, vertical first ---
all_path = os.path.join(OUT, "all_leads.csv")
with open(all_path, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["vertical"] + SRC_COLS)
    for row in rows:
        w.writerow([row.get("vertical", "")] + [row.get(c, "") for c in SRC_COLS])

# --- ghl_contacts.csv : PROCEED only, GoHighLevel import shape ---
ghl_path = os.path.join(OUT, "ghl_contacts.csv")
GHL_COLS = ["Business Name", "Contact Name", "Website", "Location", "Metro", "Vertical",
            "Lead Score", "Pain Monthly Est", "Best Channel", "Pain Summary", "AI Fix",
            "Source URL", "Tags"]
proceed = 0
with open(ghl_path, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(GHL_COLS)
    for row in rows:
        if (row.get("status", "") or "").strip().upper() != "PROCEED":
            continue
        proceed += 1
        vertical, metro = row.get("vertical", ""), row.get("metro", "")
        tags = ";".join(t for t in ["PremierConnect", vertical, metro] if t)
        w.writerow([
            row.get("target", ""), row.get("decision_maker", ""),
            row.get("website", "") or row.get("source_url", ""),
            row.get("city_state", ""), metro, vertical, row.get("score", ""),
            row.get("pain_monthly_est", ""), row.get("best_channel", ""),
            row.get("pain_summary", ""), row.get("ai_fix", ""), row.get("source_url", ""), tags,
        ])

print(f"\nTotal: {len(rows)} rows  |  PROCEED in GHL file: {proceed}")
print(f"Wrote: {all_path}")
print(f"Wrote: {ghl_path}")
