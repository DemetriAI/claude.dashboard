#!/usr/bin/env python3
"""
PremierConnect AI — prep-doc dashboard (stdlib only, no pip installs).

Thin glue over calls/_new-prep.sh (the single source of truth for the
template + vertical logic). Serves the single-page UI and a small JSON API.

    python3 dashboard/server.py            # http://127.0.0.1:8765
    PORT=9000 python3 dashboard/server.py

Endpoints:
    GET  /                      -> dashboard UI
    POST /api/generate          {prospect, vertical} -> {markdown, slug}
    GET  /api/examples          -> [{slug, title, vertical}]
    GET  /api/example?slug=...   -> {markdown, slug}
    POST /api/save              {slug, markdown}     -> {ok, path}
    POST /api/parse_teardown    {text}               -> {prospect, vertical, leak, ...}
    POST /api/prep              {text, overrides}    -> {ok, slug, path, fields, markdown}
    POST /api/drive_pull        {ref}                -> {text, fields}   (link-viewable Drive files)
"""
import json
import os
import re
import subprocess
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
CALLS = REPO / "calls"
SCRIPT = CALLS / "_new-prep.sh"
INDEX = HERE / "index.html"
VERTICALS = {"healthcare", "home", "legal"}


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def safe_slug(slug: str) -> str:
    """Whitelist a slug for filesystem use — blocks traversal/injection."""
    slug = slugify(slug)
    if not slug or len(slug) > 80:
        raise ValueError("invalid slug")
    return slug


def generate_markdown(prospect: str, vertical: str) -> str:
    if vertical not in VERTICALS:
        raise ValueError("unknown vertical")
    if not prospect.strip() or len(prospect) > 120:
        raise ValueError("invalid prospect")
    # argv list -> no shell, so prospect text can't inject.
    res = subprocess.run(
        ["bash", str(SCRIPT), prospect, vertical, "--stdout"],
        capture_output=True, text=True, cwd=str(REPO), timeout=20,
    )
    if res.returncode != 0:
        raise RuntimeError(res.stderr.strip() or "generator failed")
    return res.stdout


def list_examples():
    out = []
    for p in sorted(CALLS.glob("*_prep.md")):
        if p.name.startswith("_"):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        title = next((ln[2:].strip() for ln in text.splitlines()
                      if ln.startswith("# ")), p.stem)
        m = re.search(r"\*\*Vertical\*\*\s*\|\s*([^|]+)\|", text)
        vertical = m.group(1).strip() if m else ""
        out.append({"slug": p.stem.replace("_prep", ""),
                    "title": title.replace("Discovery-Call Prep — ", ""),
                    "vertical": vertical})
    return out


def _first_sentence(text, needles):
    """Pick the best sentence for a field. `needles` are tried in PRIORITY order
    (strongest signal first), each matched against markdown-stripped text."""
    sents = []
    for line in text.splitlines():
        if line.strip().startswith("#"):    # skip section headings
            continue
        for f in re.split(r"(?<=[.!?])\s+", line):
            s = re.sub(r"\s+", " ", re.sub(r"[#*_`>\[\]]", "", f)).strip(" -:\t")
            if 12 <= len(s) <= 220:
                sents.append(s)
    for n in needles:
        for s in sents:
            if n in s.lower():
                return s
    return ""


def parse_teardown(text):
    """Best-effort field extraction from a free-form teardown / audit doc."""
    low = text.lower()
    kw = {
        "home": ["hvac", "roofing", "roofer", "plumb", "flooring", "floorman", "contractor",
                 "homeowner", "job site", "install", "electrician", "landscap"],
        "healthcare": ["patient", "dental", "optical", "optometry", "clinic", "practice",
                       "hipaa", "med spa", "medspa", "chiropract", "ophthalm"],
        "legal": ["law firm", "attorney", "legal", "intake", " case", "matter",
                  "accounting", "insurance"],
    }
    score = {v: sum(low.count(k) for k in ks) for v, ks in kw.items()}
    vertical = max(score, key=score.get) if max(score.values()) > 0 else ""
    h1s = [re.sub(r"[#*]", "", l).strip() for l in text.splitlines() if l.strip().startswith("# ")]
    bad = ("audit", "teardown", "revenue leak", "prepared")
    cand = [h for h in h1s if h and not any(b in h.lower() for b in bad)]
    prospect = (cand[0] if cand else (h1s[0] if h1s else "")).strip()
    m = re.search(r"(\$[\d,]+[^.\n]{0,40}|\d{1,3}\s*-?\s*\d{0,3}\s*(?:high-value\s+)?"
                  r"(?:jobs|patients|calls|leads|clients|appointments)[^.\n]{0,30}"
                  r"(?:month|week|mo)\b)", text, re.I)
    revleak = re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    return {
        "prospect": prospect, "vertical": vertical, "revleak": revleak,
        "leak": _first_sentence(text, ["voicemail", "missed call", "respond first",
                                        "responds first", "after hours", "after-hours"]),
        "hook": _first_sentence(text, ["responds first", "respond first",
                                       "% of customers", "buy from the business", "%"]),
        "noshow": _first_sentence(text, ["one and done", "follow-up", "follow up",
                                         "no-show", "no show", "reminder"]),
    }


# field -> [[FILL]] token  (mirror of applyFills() in index.html)
FILL_MAP = [
    ("closer", "[[FILL: your name]]"),
    ("teardownRef", "[[FILL: link/path to their teardown]]"),
    ("volume", "[[FILL: ~__ inbound/week]]"),
    ("leak", "[[FILL: __% to voicemail / __ missed calls per week / after-hours = dead]]"),
    ("noshow", "[[FILL: manual / none / front desk overwhelmed]]"),
    ("revleak", "[[FILL: missed calls × close rate × value]]"),
    ("hook", "[[FILL: quote or observation from teardown]]"),
    ("missed", "[[FILL: missed calls]]"),
    ("day12", "[[FILL: day-12 date]]"),
]


def build_doc(base, f):
    """Replace [[FILL]] tokens from a fields dict — server-side port of applyFills()."""
    setup = "$" + f["setup"].strip() if f.get("setup", "").strip() else "$[[FILL]]"
    mrr = "$" + f["mrr"].strip() if f.get("mrr", "").strip() else "$[[FILL]]"
    out = base
    for key, token in FILL_MAP:
        v = (f.get(key) or "").strip()
        if v:
            out = out.replace(token, v)
    out = out.replace("Setup fee $[[FILL]] + $[[FILL]]/mo", f"Setup fee {setup} + {mrr}/mo")
    out = out.replace("setup fee at **$[[FILL]]**", f"setup fee at **{setup}**")
    out = out.replace("monthly at **$[[FILL]]/mo**", f"monthly at **{mrr}/mo**")
    out = out.replace("price locked: $[[FILL]] setup + $[[FILL]]/mo",
                      f"price locked: {setup} setup + {mrr}/mo")
    d12 = (f.get("day12") or "").strip()
    if d12:
        out = out.replace("(date: [[FILL]])", f"(date: {d12})")
    return out


_DRIVE_ID = re.compile(r"/(?:document|spreadsheets|presentation|file)/d/([A-Za-z0-9_-]{20,})"
                       r"|[?&]id=([A-Za-z0-9_-]{20,})")


def extract_drive_id(ref):
    ref = ref.strip()
    m = _DRIVE_ID.search(ref)
    if m:
        return m.group(1) or m.group(2)
    return ref if re.fullmatch(r"[A-Za-z0-9_-]{20,}", ref) else ""


def fetch_drive_text(ref):
    """Fetch plain text for a *link-viewable* Drive file. Private files raise."""
    fid = extract_drive_id(ref)
    if not fid:
        raise ValueError("couldn't find a Google Drive file ID in that link")
    last = "not reachable"
    for url in (f"https://docs.google.com/document/d/{fid}/export?format=txt",
                f"https://drive.google.com/uc?export=download&id={fid}"):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 PrepDash"})
            with urllib.request.urlopen(req, timeout=12) as r:
                txt = r.read(2_000_000).decode("utf-8", "replace")
        except Exception as e:
            last = type(e).__name__
            continue
        head = txt[:600].lower()
        if "<html" in head or "accounts.google.com" in head:
            last = "needs sign-in"
            continue
        if txt.strip():
            return txt
    raise RuntimeError(f"that file isn't link-viewable ({last}) — share it "
                       "'anyone with the link', or ask Claude to pull it (it has "
                       "authenticated Drive access)")


class Handler(BaseHTTPRequestHandler):
    server_version = "PrepDash/1.0"

    def _send(self, code, body, ctype="application/json"):
        data = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _json(self, code, obj):
        self._send(code, json.dumps(obj), "application/json")

    def _read_json(self):
        n = int(self.headers.get("Content-Length", 0) or 0)
        if n <= 0:
            return {}
        return json.loads(self.rfile.read(n).decode("utf-8") or "{}")

    def do_GET(self):
        u = urlparse(self.path)
        if u.path in ("/", "/index.html"):
            return self._send(200, INDEX.read_bytes(), "text/html; charset=utf-8")
        if u.path == "/api/examples":
            return self._json(200, {"examples": list_examples()})
        if u.path == "/api/example":
            slug = (parse_qs(u.query).get("slug") or [""])[0]
            try:
                slug = safe_slug(slug)
            except ValueError:
                return self._json(400, {"error": "bad slug"})
            f = CALLS / f"{slug}_prep.md"
            if not f.exists():
                return self._json(404, {"error": "not found"})
            return self._json(200, {"slug": slug, "markdown": f.read_text(encoding="utf-8")})
        return self._json(404, {"error": "not found"})

    def do_POST(self):
        u = urlparse(self.path)
        try:
            body = self._read_json()
        except Exception:
            return self._json(400, {"error": "bad json"})

        if u.path == "/api/generate":
            try:
                md = generate_markdown(body.get("prospect", ""), body.get("vertical", ""))
            except Exception as e:
                return self._json(400, {"error": str(e)})
            return self._json(200, {"markdown": md, "slug": slugify(body.get("prospect", ""))})

        if u.path == "/api/save":
            try:
                slug = safe_slug(body.get("slug", ""))
            except ValueError:
                return self._json(400, {"error": "bad slug"})
            md = body.get("markdown", "")
            if not isinstance(md, str) or not md.strip():
                return self._json(400, {"error": "empty markdown"})
            path = CALLS / f"{slug}_prep.md"
            path.write_text(md, encoding="utf-8")
            return self._json(200, {"ok": True, "path": f"calls/{slug}_prep.md"})

        if u.path == "/api/parse_teardown":
            text = body.get("text", "")
            if not isinstance(text, str) or not text.strip():
                return self._json(400, {"error": "empty text"})
            return self._json(200, parse_teardown(text))

        if u.path == "/api/drive_pull":
            ref = body.get("ref", "")
            if not isinstance(ref, str) or not ref.strip():
                return self._json(400, {"error": "empty ref"})
            try:
                text = fetch_drive_text(ref)
            except Exception as e:
                return self._json(400, {"error": str(e)})
            return self._json(200, {"text": text, "fields": parse_teardown(text)})

        if u.path == "/api/prep":
            # one-shot: teardown text (+ overrides) -> parsed -> filled doc -> saved
            text = body.get("text", "")
            overrides = body.get("overrides") or {}
            if not isinstance(text, str) or not text.strip():
                return self._json(400, {"error": "empty text"})
            if not isinstance(overrides, dict):
                return self._json(400, {"error": "overrides must be an object"})
            fields = parse_teardown(text)
            for k, v in overrides.items():
                if isinstance(v, str):
                    fields[k] = v
            for k in ("setup", "mrr", "closer", "teardownRef", "volume", "missed", "day12"):
                fields.setdefault(k, "")
            prospect = (fields.get("prospect") or "").strip()
            if not prospect:
                return self._json(400, {"error": "no prospect found — pass overrides.prospect"})
            vertical = (fields.get("vertical") or "").strip() or "home"
            fields["vertical"] = vertical
            try:
                slug = safe_slug(prospect)
                base = generate_markdown(prospect, vertical)
            except Exception as e:
                return self._json(400, {"error": str(e)})
            md = build_doc(base, fields)
            path = None
            if body.get("save", True):
                (CALLS / f"{slug}_prep.md").write_text(md, encoding="utf-8")
                path = f"calls/{slug}_prep.md"
            return self._json(200, {"ok": True, "slug": slug, "path": path,
                                    "fields": fields, "markdown": md})

        return self._json(404, {"error": "not found"})

    def log_message(self, *a):  # quieter console
        pass


def main():
    port = int(os.environ.get("PORT", "8765"))
    srv = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"PrepDash on http://127.0.0.1:{port}  (repo: {REPO})")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        srv.shutdown()


if __name__ == "__main__":
    main()
