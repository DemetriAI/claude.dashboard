#!/usr/bin/env python3
"""Generate per-recipient tracking QR codes for the Austin direct-mail letters.

Each QR points at the hosted interactive demo with a ?ref= tag, so a scan is
attributable to a specific letter (feeds outbound tracking).

Usage:
    python3 make_qr.py [BASE_URL]

BASE_URL defaults to the GitHub Pages project URL. Swap in your own domain
(e.g. https://premierconnectai.com/demo) and re-run to regenerate.
"""
import sys, os
import qrcode

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "https://demetriai.github.io/claude.dashboard/"

# letter slug -> ref tag used in the scan URL
RECIPIENTS = {
    "01-eric-bramlett": "bramlett",
    "02-ryan-rodenbeck": "spyglass",
    "03-dave-murray": "dmtx",
    "04-keenan-group": "keenan",
    "05-kasey-jorgenson": "jorgenson",
}

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "qr")
os.makedirs(OUT, exist_ok=True)

sep = "&" if "?" in BASE_URL else "?"
for slug, ref in RECIPIENTS.items():
    url = f"{BASE_URL}{sep}ref={ref}&utm_source=letter&utm_medium=direct_mail"
    qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0a1024", back_color="white")
    path = os.path.join(OUT, f"{ref}.png")
    img.save(path)
    print(f"  {ref:10s} -> {url}")

print(f"\nWrote {len(RECIPIENTS)} QR codes to {OUT}")
print(f"Base URL: {BASE_URL}")
print("Re-run with your own domain to repoint: python3 make_qr.py https://premierconnectai.com/demo")
