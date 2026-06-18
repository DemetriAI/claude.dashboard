#!/usr/bin/env python3
"""Enrich PROCEED leads with verified work emails via Apollo -> private send list (PII).

Reads engine/real_estate/leads.csv (or $LEADS_CSV); for each PROCEED row, asks Apollo to match the
decision-maker by name + company domain and writes email/phone to a gitignored private CSV. PII never
leaves _private/. This is the only step that turns engine leads into a sendable list.

Env:
  APOLLO_API_KEY   Apollo API key (Apollo -> Settings -> Integrations -> API).
  LEADS_CSV        optional path (default engine/real_estate/leads.csv).

Run:  python3 engine/tools/apollo_enrich.py
"""
import csv, json, os, sys, time, urllib.request, urllib.error

KEY = os.environ.get("APOLLO_API_KEY", "").strip()
if not KEY:
    print("APOLLO_API_KEY not set — skipping enrichment.")
    sys.exit(0)

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
LEADS = os.environ.get("LEADS_CSV", os.path.join(ROOT, "engine", "real_estate", "leads.csv"))
OUT_DIR = os.path.join(os.path.dirname(LEADS), "_private")
os.makedirs(OUT_DIR, exist_ok=True)
OUT = os.path.join(OUT_DIR, "send_list.csv")


def domain_of(website):
    w = (website or "").strip().lower()
    for p in ("https://", "http://", "www."):
        w = w.replace(p, "")
    return w.split("/")[0]


def match(name, domain):
    body = {"api_key": KEY, "name": name, "domain": domain, "reveal_personal_emails": False}
    req = urllib.request.Request("https://api.apollo.io/v1/people/match", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json", "Cache-Control": "no-cache"},
                                 method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return (json.loads(resp.read().decode() or "{}") or {}).get("person") or {}


def main():
    found = scanned = 0
    with open(LEADS, newline="", encoding="utf-8") as f, open(OUT, "w", newline="", encoding="utf-8") as out:
        w = csv.writer(out)
        w.writerow(["Business Name", "Contact Name", "Title", "Email", "Phone", "Website", "Metro", "Score", "Pain Summary"])
        for row in csv.DictReader(f):
            if (row.get("status") or "").strip().upper() != "PROCEED":
                continue
            scanned += 1
            name = (row.get("decision_maker") or "").replace("[verify]", "").strip()
            domain = domain_of(row.get("website"))
            if not name or not domain:
                continue
            try:
                p = match(name, domain)
            except urllib.error.HTTPError as e:
                print(f"  {name} @ {domain}: Apollo {e.code}")
                continue
            email = p.get("email") or ""
            if not email:
                continue
            phones = p.get("phone_numbers") or []
            w.writerow([row.get("target", ""), p.get("name", name), p.get("title", row.get("dm_title", "")),
                        email, (phones[0].get("raw_number", "") if phones else ""),
                        row.get("website", ""), row.get("metro", ""), row.get("score", ""), row.get("pain_summary", "")])
            found += 1
            time.sleep(0.3)
    print(f"Enriched {found}/{scanned} PROCEED leads with verified emails -> {OUT}  (PII stays in _private/, gitignored)")


if __name__ == "__main__":
    main()
