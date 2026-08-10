# `_private/` — never committed (PII lives here)

Everything in this folder except this README is **gitignored** (see root `.gitignore`:
`engine/**/_private/*` with `!engine/**/_private/README.md`). It holds raw + enriched contact data:

- `apify_candidates.csv` — raw advertisers scraped by `engine/tools/apify_sourcer.py` (page names/links).
- `send_list.csv` — verified emails/phones from `engine/tools/apollo_enrich.py` (**PII**).

These feed the Instantly campaign (`engine/tools/instantly_push.py`) and must **never** be committed.
The engine's public files (`leads.csv`, etc.) deliberately carry **no** emails or phone numbers.
