#!/usr/bin/env python3
"""
score_leads.py — Consolidate, score, tag, and route raw lead research into
outreach-ready CSVs for PremierConnect AI.

INPUT  : leads/raw/<vertical>.psv  (pipe-separated rows from research agents)
         schema per row (11 fields, exact order):
         NAME | OWNER | PHONE | WEBSITE | CITY | RATING | REVIEW_COUNT |
         ONLINE_BOOKING | SIZE_SIGNALS | SOURCE_URLS | NOTES
OUTPUT : leads/<vertical>_phoenix_az.csv  (one file per vertical)
         plus prints verification stats to stdout.

SCORING (0-100 fit; higher = better fit = more fixable gaps to sell against).
The score is built ONLY from signals we could verify from public data — the two
verifiable "Core Four" pillars: (1) Reputation/Reviews and (2) Online Booking.
The other two pillars — Missed-Call Text-Back and AI Voicemail/Receptionist —
cannot be confirmed from the outside, so they are NOT baked into the number;
they are surfaced as UNVERIFIED flags for the rep to confirm live.

  Reputation  (0-55):  review volume (0-30) + star rating (0-25)
  Booking     (0-45):  no online booking = 45, unknown = 27, has booking = 8

  Temperature: Warm if fit_score >= 60 else Cold
"""
import csv
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")

VERTICALS = {
    "optometry": "optometry_phoenix_az.csv",
    "law": "law_phoenix_az.csv",
    "accounting": "accounting_phoenix_az.csv",
}

OUT_COLS = [
    "business_name", "vertical", "city", "owner_name", "phone", "website",
    "rating", "review_count", "rating_source", "online_booking",
    "est_revenue_band", "fit_score", "temperature", "best_first_channel",
    "why_fit_and_channel", "core_four_flags", "size_signals",
    "source_urls", "notes",
]

# ----------------------------- parsing helpers -----------------------------

def clean(s):
    return (s or "").strip()

def parse_rating(s):
    s = clean(s)
    if not s or s.upper() == "NOT_FOUND":
        return None
    m = re.search(r"(\d+(?:\.\d+)?)", s)
    if not m:
        return None
    try:
        v = float(m.group(1))
    except ValueError:
        return None
    return v if 0 < v <= 5 else None

def parse_reviews(s):
    s = clean(s)
    if not s or s.upper() == "NOT_FOUND":
        return None
    digits = re.sub(r"[^\d]", "", s)
    return int(digits) if digits else None

def parse_booking(s):
    s = clean(s).lower()
    if s.startswith("y"):
        return "yes"
    if s.startswith("n"):
        return "no"
    return "unknown"

def load_enrichment(vertical):
    """Optional focused-lookup overrides: raw/enrich_<vertical>.psv with rows
    NAME | RATING | REVIEW_COUNT | ONLINE_BOOKING | SOURCE
    Real values here take precedence over the discovery pass (they come from a
    dedicated Google rating/review/booking lookup). NOT_FOUND never overwrites
    a value we already have."""
    path = os.path.join(RAW, f"enrich_{vertical}.psv")
    out = {}
    if not os.path.exists(path):
        return out
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.count("|") < 3:
                continue
            parts = [p.strip() for p in line.split("|")]
            while len(parts) < 5:
                parts.append("")
            name, rating_s, reviews_s, booking_s, src = parts[:5]
            key = re.sub(r"[^a-z0-9]", "", name.lower())[:24]
            out[key] = {
                "rating": parse_rating(rating_s),
                "reviews": parse_reviews(reviews_s),
                "booking": parse_booking(booking_s) if booking_s.strip()
                           and booking_s.strip().upper() != "NOT_FOUND" else None,
                "src": src,
            }
    return out

def detect_source(notes, source_urls):
    blob = (notes + " " + source_urls).lower()
    for key, label in [("google", "Google"), ("yelp", "Yelp"),
                       ("healthgrades", "Healthgrades"), ("avvo", "Avvo"),
                       ("zocdoc", "Zocdoc"), ("thumbtack", "Thumbtack"),
                       ("facebook", "Facebook"), ("birdeye", "Birdeye")]:
        if key in blob:
            return label
    return ""

# ----------------------------- scoring -----------------------------

def score_reviews(count):
    if count is None:
        return 12, "review count unconfirmed (not retrievable)"
    if count < 20:
        return 30, f"only {count} reviews (thin reputation)"
    if count < 50:
        return 20, f"{count} reviews (room to grow)"
    if count < 100:
        return 10, f"{count} reviews"
    if count < 200:
        return 4, f"{count} reviews (solid)"
    return 0, f"{count} reviews (strong)"

def score_rating(rating):
    if rating is None:
        return 6, "rating unconfirmed (not retrievable)"
    if rating < 3.8:
        return 25, f"{rating}* rating (reputation problem)"
    if rating < 4.2:
        return 18, f"{rating}* rating (under 4.2)"
    if rating < 4.5:
        return 11, f"{rating}* rating"
    if rating <= 4.7:
        return 4, f"{rating}* rating (good)"
    return 0, f"{rating}* rating (excellent)"

def score_booking(booking):
    if booking == "no":
        return 45, "no online booking — pure scheduling-automation opportunity"
    if booking == "unknown":
        return 22, "online booking unconfirmed"
    return 8, "has some online booking"

def best_channel(temp, booking, review_pts, rating, owner_known):
    """Recommend the first outreach channel and explain why."""
    # Sub-4.0 reputation repair is a delicate conversation — better live than a
    # video that publicly flags their bad rating.
    if temp == "Warm" and (rating is not None and rating < 4.0):
        return ("Call", "Warm + sub-4.0 rating: reputation repair is a delicate live "
                "conversation; call the owner" + (" by name" if owner_known else "") + ".")
    # Otherwise video shines when there's a gap you can literally show on screen.
    if temp == "Warm" and booking in ("no", "unknown"):
        return ("Video", "Warm + missing/unclear online booking: record a 60-sec "
                "Loom showing the booking gap and the fix.")
    if temp == "Warm":
        return ("Call", "Warm, booking in place: call the owner"
                + (" by name" if owner_known else "")
                + " to pitch missed-call text-back + AI receptionist.")
    if review_pts >= 20:
        return ("Call", "Thin reputation but otherwise tidy: a quick call "
                "to pitch review-generation lands fastest.")
    return ("Email", "Cooler fit: low-touch email nurture; follow up if engaged.")

# ----------------------------- main -----------------------------

def process(vertical):
    path = os.path.join(RAW, f"{vertical}.psv")
    if not os.path.exists(path):
        print(f"!! missing raw file: {path}")
        return []
    enrich = load_enrichment(vertical)
    enriched_n = 0
    rows = []
    seen = set()
    with open(path, encoding="utf-8") as f:
        for ln, line in enumerate(f, 1):
            line = line.strip()
            if not line or line.count("|") < 7:
                continue
            parts = [p.strip() for p in line.split("|")]
            # pad/truncate to 11 fields
            while len(parts) < 11:
                parts.append("")
            name, owner, phone, website, city, rating_s, reviews_s, \
                booking_s, size, sources, notes = parts[:11]
            name = clean(name)
            phone = clean(phone)
            website = clean(website)
            if not name or not phone or not website:
                print(f"  [skip {vertical}:{ln}] missing name/phone/website -> {name!r}")
                continue
            key = re.sub(r"[^a-z0-9]", "", name.lower())[:24]
            if key in seen:
                print(f"  [dup  {vertical}:{ln}] {name}")
                continue
            seen.add(key)

            rating = parse_rating(rating_s)
            reviews = parse_reviews(reviews_s)
            booking = parse_booking(booking_s)
            # apply focused-lookup enrichment (real values win; NOT_FOUND never clobbers)
            if key in enrich:
                e = enrich[key]
                used = False
                if e["rating"] is not None:
                    rating = e["rating"]; used = True
                if e["reviews"] is not None:
                    reviews = e["reviews"]; used = True
                if e["booking"] is not None:
                    booking = e["booking"]; used = True
                if used:
                    enriched_n += 1
                    if e["src"]:
                        sources = (sources + ", " + e["src"]).strip(", ")
            owner = clean(owner)
            owner_known = bool(owner) and owner.upper() != "NOT_FOUND"

            rv_pts, rv_why = score_reviews(reviews)
            rt_pts, rt_why = score_rating(rating)
            bk_pts, bk_why = score_booking(booking)
            fit = rv_pts + rt_pts + bk_pts
            temp = "Warm" if fit >= 60 else "Cold"

            channel, ch_why = best_channel(temp, booking, rv_pts, rating, owner_known)

            why = f"FIT {fit}/100 — {rv_why}; {rt_why}; {bk_why}. {ch_why}"

            flags = [
                f"Reputation: {rv_why} / {rt_why}",
                f"Booking: {bk_why}",
                "Missed-call text-back: UNVERIFIED (confirm on contact)",
                "AI voicemail/receptionist: UNVERIFIED (confirm on contact)",
            ]

            rows.append({
                "business_name": name,
                "vertical": vertical,
                "city": clean(city),
                "owner_name": owner if owner_known else "",
                "phone": phone,
                "website": website,
                "rating": rating if rating is not None else "",
                "review_count": reviews if reviews is not None else "",
                "rating_source": detect_source(notes, sources),
                "online_booking": booking,
                "est_revenue_band": "$1M-$5M (inferred from size proxies)",
                "fit_score": fit,
                "temperature": temp,
                "best_first_channel": channel,
                "why_fit_and_channel": why,
                "core_four_flags": " | ".join(flags),
                "size_signals": clean(size),
                "source_urls": clean(sources),
                "notes": clean(notes),
            })
    # sort best-fit first, keep top 30
    rows.sort(key=lambda r: r["fit_score"], reverse=True)
    if enrich:
        print(f"  [{vertical}] applied focused enrichment to {enriched_n} businesses")
    return rows

def main():
    grand = []
    for vertical, outfile in VERTICALS.items():
        rows = process(vertical)
        keep = rows[:30]
        out = os.path.join(HERE, outfile)
        with open(out, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=OUT_COLS)
            w.writeheader()
            w.writerows(keep)
        warm = sum(1 for r in keep if r["temperature"] == "Warm")
        norating = sum(1 for r in keep if r["rating"] == "")
        print(f"\n=== {vertical}: {len(keep)} leads "
              f"({warm} warm / {len(keep)-warm} cold), "
              f"{norating} without a found rating ===")
        for r in keep[:10]:
            print(f"  {r['fit_score']:>3}  {r['temperature']:<4} "
                  f"{r['best_first_channel']:<5} {r['business_name'][:38]:<38} "
                  f"{str(r['rating']) or '?':>4}*/{r['review_count'] or '?'} rv")
        grand.extend(keep)
    print(f"\nTOTAL leads written: {len(grand)}")
    # verification: no blank phone/website
    bad = [r for r in grand if not r["phone"] or not r["website"]]
    print(f"Rows missing phone/website: {len(bad)} (must be 0)")

if __name__ == "__main__":
    main()
