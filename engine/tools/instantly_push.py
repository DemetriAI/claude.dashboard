#!/usr/bin/env python3
"""Push enriched, verified leads into an Instantly campaign (the 5x25 cadence lives in Instantly).

The sending cadence — 25 emails at each of 08:00 / 10:30 / 13:00 / 15:00 / 16:50 CT, 125/day — is
configured ONCE in the Instantly campaign (sending schedule + per-inbox daily limit). See
engine/SENDING.md for the exact settings. This script only FEEDS verified leads into that campaign;
Instantly drips them on the schedule, with warmup, inbox rotation, and unsubscribe handled there.
(Smartlead's API is analogous — swap the base URL/headers.)

Env:
  INSTANTLY_API_KEY      Instantly API key (Instantly -> Settings -> API).
  INSTANTLY_CAMPAIGN_ID  the campaign to add leads to.
  SEND_LIST              optional path (default engine/real_estate/_private/send_list.csv).

Run:  python3 engine/tools/instantly_push.py
"""
import csv, json, os, sys, time, urllib.request, urllib.error

KEY = os.environ.get("INSTANTLY_API_KEY", "").strip()
CAMPAIGN = os.environ.get("INSTANTLY_CAMPAIGN_ID", "").strip()
if not KEY or not CAMPAIGN:
    print("INSTANTLY_API_KEY / INSTANTLY_CAMPAIGN_ID not set — skipping push.")
    sys.exit(0)

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
SEND_LIST = os.environ.get("SEND_LIST", os.path.join(ROOT, "engine", "real_estate", "_private", "send_list.csv"))
API = "https://api.instantly.ai/api/v2/leads"
HEADERS = {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}


def add_lead(row):
    first = (row.get("Contact Name") or "").split(" ")[0]
    body = {"campaign": CAMPAIGN, "email": row["Email"], "first_name": first,
            "company_name": row.get("Business Name", ""),
            "custom_variables": {"metro": row.get("Metro", ""), "pain": row.get("Pain Summary", ""),
                                 "website": row.get("Website", "")}}
    req = urllib.request.Request(API, data=json.dumps(body).encode(), headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status


def main():
    if not os.path.exists(SEND_LIST):
        print(f"No send list at {SEND_LIST} — run apollo_enrich.py first.")
        sys.exit(0)
    pushed = failed = 0
    with open(SEND_LIST, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if not (row.get("Email") or "").strip():
                continue
            try:
                add_lead(row)
                pushed += 1
            except urllib.error.HTTPError as e:
                failed += 1
                print(f"  {row.get('Email')}: Instantly {e.code} — {e.read().decode()[:160]}")
            time.sleep(0.2)
    print(f"Pushed {pushed} leads into campaign {CAMPAIGN} (failed {failed}). Instantly drips them on the 5x25 schedule.")


if __name__ == "__main__":
    main()
