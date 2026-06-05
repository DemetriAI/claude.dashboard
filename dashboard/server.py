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
"""
import json
import os
import re
import subprocess
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
