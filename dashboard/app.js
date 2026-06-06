/* PremierConnect AI — engine dashboard logic. Framework-free. Driven entirely by window.ENGINE_DATA. */
(function () {
  "use strict";
  var DATA = window.ENGINE_DATA;
  var app = document.getElementById("app");
  var toggle = document.getElementById("verticalToggle");

  if (!DATA || !DATA.verticals) {
    app.innerHTML = '<p class="muted load-note">No engine data found. Generate <code>dashboard/data.js</code>.</p>';
    return;
  }

  var order = DATA.order || Object.keys(DATA.verticals);
  var active = order[0];
  var gen = document.getElementById("generatedAt");
  if (gen && DATA.generatedAt) gen.textContent = "data: " + DATA.generatedAt;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function statusBadge(status) {
    var map = {
      done: "b-done", ready: "b-ready", live: "b-live",
      gated: "b-gated", blocked: "b-blocked", queued: "b-queued",
      configured: "b-queued", halt: "b-halt", stop: "b-stop", na: "b-na"
    };
    var cls = map[(status || "").toLowerCase()] || "b-na";
    return '<span class="badge ' + cls + '">' + esc(status) + "</span>";
  }

  function renderToggle() {
    toggle.innerHTML = order.map(function (k) {
      var v = DATA.verticals[k];
      var dotColor = v.statusColor || "#5b6b8c";
      return (
        '<button data-k="' + k + '" class="' + (k === active ? "active" : "") + '">' +
        '<span class="dot" style="background:' + dotColor + '"></span>' +
        esc(v.label) +
        (v.kpis && v.kpis.targets != null ? '<span class="pill">' + v.kpis.targets + "</span>" : "") +
        "</button>"
      );
    }).join("");
    Array.prototype.forEach.call(toggle.querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        active = b.getAttribute("data-k");
        renderToggle();
        renderBody();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function kpi(n, label, cls, hint) {
    return (
      '<div class="kpi ' + (cls || "") + '">' +
      '<div class="n">' + esc(n) + "</div>" +
      '<div class="l">' + esc(label) + "</div>" +
      (hint ? '<div class="hint">' + esc(hint) + "</div>" : "") +
      "</div>"
    );
  }

  function renderBody() {
    var v = DATA.verticals[active];
    var k = v.kpis || {};
    var html = "";

    // hero / config line
    html += '<div class="hero">';
    html += '<h2 class="vname">' + esc(v.label) + "</h2>";
    html += statusBadge(v.status);
    html += '<div class="cfg">' +
      "<span><b>Buyer:</b> " + esc(v.buyer) + "</span>" +
      "<span><b>Region:</b> " + esc(v.region) + "</span>" +
      (v.offLimits ? "<span><b>Off-limits:</b> " + esc(v.offLimits) + "</span>" : "") +
      "</div>";
    html += "</div>";

    // KPIs
    html += '<div class="kpis">';
    html += kpi(k.targets != null ? k.targets : "—", "Targets sourced", "", k.metros ? k.metros + " metros" : "");
    html += kpi(k.proceed != null ? k.proceed : "—", "Pass the pain gate", "", k.halt != null ? k.halt + " halted" : "");
    html += kpi(k.booked != null ? k.booked : "—", "Calls booked", k.booked ? "money" : "zero", "this week");
    html += kpi(k.pilots != null ? k.pilots : "—", "Pilots live", k.pilots ? "money" : "zero", "");
    html += kpi(k.mrr != null ? "$" + k.mrr : "—", "MRR added", k.mrr ? "money" : "zero", "");
    html += "</div>";

    // two columns: agents + (pains/gate)
    html += '<div class="row cols-2">';

    // left: agents
    html += '<section class="panel"><h2>The 12 agents</h2><p class="sub">Status of each agent for this industry. 💰 = money event.</p><div class="agents">';
    (v.agents || []).forEach(function (a) {
      html +=
        '<div class="agent ' + (a.money ? "money" : "") + '">' +
        '<div class="num">' + esc(a.n) + "</div>" +
        '<div class="body"><div class="name">' + esc(a.name) +
        (a.money ? " 💰" : "") + " " + statusBadge(a.status) + "</div>" +
        (a.note ? '<div class="note">' + esc(a.note) + "</div>" : "") +
        "</div></div>";
    });
    html += "</div></section>";

    // right: pain gate + pains
    html += "<div>";
    html += '<section class="panel" style="margin-bottom:16px"><h2>Pain gate</h2>';
    if (v.gate) {
      html += '<div class="gate">' +
        '<div class="g proceed"><div class="n">' + v.gate.proceed + '</div><div class="l">Proceed</div></div>' +
        '<div class="g halt"><div class="n">' + v.gate.halt + '</div><div class="l">Halt</div></div></div>';
      if (v.gate.haltList && v.gate.haltList.length) {
        html += '<ul class="halt-list">' + v.gate.haltList.map(function (h) {
          return "<li><b>" + esc(h.target) + "</b> — " + esc(h.reason) + "</li>";
        }).join("") + "</ul>";
      } else {
        html += '<p class="sub" style="margin:0">No targets sourced yet — gate runs at sourcing.</p>';
      }
    } else {
      html += '<p class="sub" style="margin:0">Configured. Gate runs when leads are sourced.</p>';
    }
    html += "</section>";

    html += '<section class="panel"><h2>Top pains</h2><ul class="list">';
    (v.pains || []).forEach(function (p) {
      html += '<li class="pain"><div class="t">' + esc(p.name) + "</div>" +
        '<div class="e">' + esc(p.econ) + "</div>" +
        (p.fix ? '<div class="fix"><b>Fix:</b> ' + esc(p.fix) + "</div>" : "") + "</li>";
    });
    html += "</ul></section>";
    html += "</div>"; // right col
    html += "</div>"; // row

    // leads
    if (v.topLeads && v.topLeads.length) {
      html += '<div class="section-title">Top targets (by score)</div>';
      html += '<section class="panel"><table class="leads"><thead><tr><th>Practice</th><th>Metro</th><th>Pain / mo (est.)</th><th>Score</th></tr></thead><tbody>';
      v.topLeads.forEach(function (l) {
        html += "<tr><td>" + esc(l.target) + "</td><td>" + esc(l.metro) + "</td><td>" + esc(l.pain || "—") + '</td><td class="score">' + esc(l.score) + "</td></tr>";
      });
      html += "</tbody></table></section>";
    } else if (v.leadsNote) {
      html += '<div class="section-title">Targets</div><div class="note-box">' + esc(v.leadsNote) + "</div>";
    }

    // artifacts / links
    html += '<div class="section-title">Artifacts &amp; files</div><div class="chips">';
    (v.artifacts || []).forEach(function (a) {
      html += '<a class="chip ' + (a.live ? "live" : "") + '" href="' + esc(a.href) + '"' +
        (/^https?:/.test(a.href) ? ' target="_blank" rel="noopener"' : "") + ">" +
        (a.live ? "● " : "") + esc(a.label) + "</a>";
    });
    html += "</div>";

    app.innerHTML = html;
  }

  renderToggle();
  renderBody();
})();
