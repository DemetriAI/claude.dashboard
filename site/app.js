/* PremierConnect AI dashboard renderer. Pure DOM, no dependencies, no fetch
   (data is injected via data.js as window.DASHBOARD_DATA) so it works on any
   static host and even from file://. Defensive against missing fields. */
(function () {
  "use strict";
  var D = window.DASHBOARD_DATA;
  var app = document.getElementById("app");
  if (!D) { app.innerHTML = '<p class="loading">No data found (site/data.js missing).</p>'; return; }

  var gen = document.getElementById("generated");
  if (gen) gen.textContent = "Data as of " + (D.generatedAt || "—");

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function money(n) { return "$" + Number(n).toLocaleString("en-US"); }

  app.innerHTML = "";

  /* ---- KPI row ---- */
  var t = D.totals || {}, g = D.goal || {}, m = D.model || {};
  app.appendChild(el("div", "section-title", "Sprint at a glance"));
  var kpis = el("div", "kpis");
  function kpi(label, value, cls, sub) {
    var c = el("div", "card kpi");
    c.appendChild(el("div", "label", esc(label)));
    c.appendChild(el("div", "value " + (cls || ""), esc(value)));
    if (sub) c.appendChild(el("div", "sub", esc(sub)));
    return c;
  }
  kpis.appendChild(kpi("Revenue goal", money(g.revenueTarget || 5000), "green",
    (g.windowDays || 5) + "-day sprint"));
  kpis.appendChild(kpi("Base-case cash", money(m.baseCaseCash || 5400), "blue",
    (m.baseCaseLaunches || 3) + " launches × " + money(m.launchFee || 1800) + " · crosses goal Day 4"));
  kpis.appendChild(kpi("Targets in pipeline", (t.targets || 0) + "",
    "", (t.ready || 0) + " script-ready · " + (t.queued || 0) + " queued"));
  kpis.appendChild(kpi("Leakage surfaced", t.estLeakageSurfaced || "—",
    "", "across script-ready targets (est.)"));
  app.appendChild(kpis);

  /* ---- System status (honest state of the connection) ---- */
  app.appendChild(el("div", "section-title", "System status"));
  var sg = el("div", "status-grid");
  var dotClass = { "ok": "ok", "scaffolded": "info", "manual": "info",
    "action-needed": "todo", "warn": "warn" };
  var sys = D.system || {};
  ["hosting", "domain", "pipeline", "sending"].forEach(function (k) {
    var s = sys[k]; if (!s) return;
    var card = el("div", "card st");
    card.appendChild(el("span", "dot " + (dotClass[s.state] || "warn")));
    var body = el("div");
    body.appendChild(el("div", "l", esc(s.label) + " — " + esc(s.state)));
    body.appendChild(el("div", "n", esc(s.note)));
    card.appendChild(body);
    sg.appendChild(card);
  });
  app.appendChild(sg);

  /* ---- Funnel + cash ---- */
  app.appendChild(el("div", "section-title", "Path to the goal"));
  var split = el("div", "split");

  var fcard = el("div", "card");
  fcard.appendChild(el("div", "label", "Base-case funnel (est.)"));
  var funnel = (m.funnel || []);
  var maxC = funnel.reduce(function (a, b) { return Math.max(a, b.count || 0); }, 1);
  funnel.forEach(function (f, i) {
    var row = el("div", "bar-row");
    row.appendChild(el("div", "name", esc(f.stage)));
    var wrap = el("div", "bar-wrap");
    var bar = el("div", "bar" + (i === funnel.length - 1 ? " win" : ""), esc(f.count + (f.rate ? "  ·  " + f.rate : "")));
    bar.style.width = Math.max(8, Math.round((f.count / maxC) * 100)) + "%";
    wrap.appendChild(bar);
    row.appendChild(wrap);
    fcard.appendChild(row);
  });
  split.appendChild(fcard);

  var ccard = el("div", "card");
  ccard.appendChild(el("div", "label", "Cumulative cash by day"));
  var cash = el("div", "cash");
  var arr = m.cashByDay || [0, 1800, 3600, 5400, 5400];
  var maxV = Math.max.apply(null, arr.concat([g.revenueTarget || 5000]));
  arr.forEach(function (v, i) {
    var col = el("div", "col");
    col.appendChild(el("div", "amt", v ? "$" + (v / 1000) + "k" : "$0"));
    var b = el("div", "colbar" + (v >= (g.revenueTarget || 5000) ? " win" : ""));
    b.style.height = Math.round((v / maxV) * 130) + "px";
    if (!v) b.style.height = "2px";
    col.appendChild(b);
    col.appendChild(el("div", "day", "Day " + (i + 1)));
    cash.appendChild(col);
  });
  ccard.appendChild(cash);
  ccard.appendChild(el("div", "goalnote", "✓ crosses the " + money(g.revenueTarget || 5000) + " goal on Day 4"));
  split.appendChild(ccard);
  app.appendChild(split);

  /* ---- Target tables by vertical ---- */
  app.appendChild(el("div", "section-title", "Outreach pipeline"));
  var base = D.repo ? ("https://github.com/" + D.repo.owner + "/" + D.repo.name + "/blob/" + D.repo.branch + "/") : "";
  (D.verticals || []).forEach(function (v) {
    var sec = el("div", "vert");
    sec.appendChild(el("h3", null, esc(v.name) + " "
      + '<span class="subj">(' + (v.businesses || []).length + ")</span>"));
    sec.appendChild(el("p", "bench", esc(v.benchmark || "")));
    var table = el("table");
    table.innerHTML = "<thead><tr><th>Business</th><th>City</th><th>Phone</th>"
      + "<th>Reviews</th><th>Est. leakage</th><th>Status</th><th>Subject line</th></tr></thead>";
    var tb = el("tbody");
    (v.businesses || []).forEach(function (b) {
      var tr = el("tr");
      var nameCell = esc(b.name);
      if (b.file && base) nameCell = '<a href="' + base + esc(b.file) + '" target="_blank" rel="noopener">' + esc(b.name) + "</a>";
      tr.appendChild(el("td", "biz", nameCell));
      tr.appendChild(el("td", null, esc(b.city)));
      tr.appendChild(el("td", null, esc(b.phone)));
      tr.appendChild(el("td", null, esc(b.reviews)));
      tr.appendChild(el("td", "leak", esc(b.leak)));
      var st = (b.status === "ready") ? '<span class="badge ready">SCRIPT READY</span>'
        : '<span class="badge queued">QUEUED</span>';
      tr.appendChild(el("td", null, st));
      tr.appendChild(el("td", "subj", esc(b.subject)));
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    sec.appendChild(table);
    app.appendChild(sec);
  });
})();
