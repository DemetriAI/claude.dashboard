#!/usr/bin/env python3
"""Idempotently upsert PROCEED leads (engine/exports/ghl_contacts.csv) into GoHighLevel (API v2).

Dedupe is by business name + website because the engine deliberately keeps PII (email/phone) out,
so re-runs will NOT create duplicate contacts. Runs as part of the daily workflow; auto-skips unless
both secrets are present.

Env:
  GHL_API_TOKEN    GoHighLevel Private Integration Token
  GHL_LOCATION_ID  GoHighLevel Location ID
"""
import csv, json, os, sys, time, urllib.request, urllib.parse, urllib.error

TOKEN = os.environ.get("GHL_API_TOKEN", "").strip()
LOCATION = os.environ.get("GHL_LOCATION_ID", "").strip()
BASE = "https://services.leadconnectorhq.com"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Version": "2021-07-28",
           "Content-Type": "application/json", "Accept": "application/json"}

if not TOKEN or not LOCATION:
    print("GHL_API_TOKEN / GHL_LOCATION_ID not set — skipping GHL sync.")
    sys.exit(0)

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
CSV_PATH = os.path.join(ROOT, "engine", "exports", "ghl_contacts.csv")


def req(method, path, params=None, body=None):
    url = BASE + path + ("?" + urllib.parse.urlencode(params) if params else "")
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, headers=HEADERS, method=method)
    with urllib.request.urlopen(r, timeout=30) as resp:
        return json.loads(resp.read().decode() or "{}")


def already_there(company, website):
    """True if a contact with the same company name or website already exists in the location."""
    try:
        res = req("GET", "/contacts/", params={"locationId": LOCATION, "query": company, "limit": 20})
    except urllib.error.HTTPError as e:
        print(f"  search error {e.code} for {company!r}")
        return False
    for c in res.get("contacts", []):
        if (c.get("companyName") or "").strip().lower() == company.strip().lower():
            return True
        if website and (c.get("website") or "").strip().lower() == website.strip().lower():
            return True
    return False


def main():
    created = skipped = failed = 0
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            company = (row.get("Business Name") or "").strip()
            if not company:
                continue
            website = (row.get("Website") or "").strip()
            if already_there(company, website):
                skipped += 1
                continue
            tags = [t for t in (row.get("Tags") or "").split(";") if t]
            name = (row.get("Contact Name") or "").strip() or company
            body = {"locationId": LOCATION, "companyName": company, "name": name,
                    "website": website, "tags": tags, "source": "PremierConnect Engine"}
            try:
                req("POST", "/contacts/", body=body)
                created += 1
            except urllib.error.HTTPError as e:
                failed += 1
                print(f"  create error {e.code} for {company!r}: {e.read().decode()[:200]}")
            time.sleep(0.2)  # be gentle on the API
    print(f"GHL sync done — created {created}, skipped(existing) {skipped}, failed {failed}.")


if __name__ == "__main__":
    main()
