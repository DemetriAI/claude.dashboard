# _private/ — git-ignored (PII)

Anything with personal contact data — **enriched emails, phone numbers, exported contact lists**
(from Apollo enrichment, scraped sites, etc.) — goes **here**. Everything in this folder except this
README is ignored by git (see repo `.gitignore`), matching the same PII convention used for
`calls/teardowns/`.

Tracked engine files (`leads.csv`, `pipeline.csv`) deliberately hold **public business fields only**
— practice name, city, public owner name, website, score, pain band. No personal emails or phones.
Keep it that way: if you enrich, the enriched export lands in here, not in a tracked file.
