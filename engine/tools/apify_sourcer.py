#!/usr/bin/env python3
"""Source real-estate advertisers (running Meta/Google ads) via Apify -> raw candidates.

Pulls advertisers currently running ads in the target metros so the engine's pain-gate (Agent 3) can
promote qualified ones into engine/real_estate/leads.csv. Writes RAW candidates only (page names +
links + ad snippet) to a gitignored private file — no PII, no enriched contacts here.

Env:
  APIFY_TOKEN          Apify API token. NOTE: rotate the token you pasted in chat first, then add the
                       new one as a GitHub Actions secret. Never commit it.
  APIFY_FB_ADS_ACTOR   Apify actor that scrapes the Meta Ad Library
                       (default 'apify~facebook-ads-scraper'; set to whichever Ad Library actor you use).

Run:  python3 engine/tools/apify_sourcer.py
"""
import csv, json, os, sys, urllib.request, urllib.error, urllib.parse

TOKEN = os.environ.get("APIFY_TOKEN", "").strip()
ACTOR = os.environ.get("APIFY_FB_ADS_ACTOR", "apify~facebook-ads-scraper").strip()
METROS = ["Austin TX", "Denver CO", "Nashville TN", "Charlotte NC", "Tampa FL", "Phoenix AZ"]
QUERY = "real estate agent"

if not TOKEN:
    print("APIFY_TOKEN not set — skipping Apify sourcing. (Rotate the token you pasted in chat, then add it as a secret.)")
    sys.exit(0)

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
OUT_DIR = os.path.join(ROOT, "engine", "real_estate", "_private")
os.makedirs(OUT_DIR, exist_ok=True)
OUT = os.path.join(OUT_DIR, "apify_candidates.csv")


def run_actor(payload):
    url = f"https://api.apify.com/v2/acts/{ACTOR}/run-sync-get-dataset-items?token={urllib.parse.quote(TOKEN)}"
    req = urllib.request.Request(url, data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=300) as resp:
        return json.loads(resp.read().decode() or "[]")


def main():
    seen, rows = set(), []
    for metro in METROS:
        # Input keys differ between Ad Library actors; send a real Ad Library search URL (the most common
        # input) plus search-term/count variants so the major actors accept the payload as-is.
        ad_lib_url = ("https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US"
                      f"&q={urllib.parse.quote(QUERY + ' ' + metro)}&search_type=keyword_unordered&media_type=all")
        payload = {"urls": [ad_lib_url], "startUrls": [{"url": ad_lib_url}],
                   "searchTerms": [f"{QUERY} {metro}"], "search": f"{QUERY} {metro}",
                   "country": "US", "adActiveStatus": "active", "activeStatus": "active",
                   "count": 50, "resultsLimit": 50, "maxItems": 50}
        try:
            items = run_actor(payload)
        except urllib.error.HTTPError as e:
            print(f"  {metro}: actor error {e.code} — {e.read().decode()[:160]}")
            continue
        except Exception as e:  # noqa: BLE001
            print(f"  {metro}: {e}")
            continue
        for it in items:
            name = (it.get("pageName") or it.get("advertiser") or it.get("page_name") or "").strip()
            if not name or name.lower() in seen:
                continue
            seen.add(name.lower())
            snap = it.get("snapshot", {}) if isinstance(it.get("snapshot"), dict) else {}
            rows.append({
                "advertiser": name, "metro": metro,
                "page_url": it.get("pageUrl") or snap.get("page_profile_uri", ""),
                "ad_snippet": (it.get("adText") or (snap.get("body", {}) or {}).get("text", "") or "")[:160],
            })
        print(f"  {metro}: {len(items)} ads -> {len(rows)} unique advertisers so far")

    with open(OUT, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["advertiser", "metro", "page_url", "ad_snippet"])
        w.writeheader()
        w.writerows(rows)
    print(f"\nWrote {len(rows)} candidate advertisers -> {OUT}")
    print("Next: pain-gate these into engine/real_estate/leads.csv, then enrich with apollo_enrich.py.")


if __name__ == "__main__":
    main()
