/* ============================================================
   PremierConnect AI — demo interactions
   Vanilla JS. No dependencies. Drives all motion + the live UI.
   ============================================================ */
(function () {
  "use strict";
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  /* ---------- reveal on scroll ---------- */
  const revObs = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } });
  }, { threshold: 0.2 });
  $$(".reveal").forEach((el) => revObs.observe(el));

  /* ---------- count-up + bar fills ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const comma = el.dataset.comma === "1";
    const suffix = el.dataset.suffix || "";
    const dur = RM ? 0 : 1100;
    const t0 = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - t0) / (dur || 1));
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = (comma ? val.toLocaleString() : val) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    if (dur === 0) { el.textContent = (comma ? target.toLocaleString() : target) + suffix; }
    else requestAnimationFrame(frame);
  }
  const countObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.hasAttribute("data-count")) countUp(el);
      if (el.hasAttribute("data-fill")) el.style.width = el.dataset.fill + "%";
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count],[data-fill]").forEach((el) => countObs.observe(el));

  /* ---------- nav dots + keyboard ---------- */
  const slides = $$(".slide");
  const dots = $("#dots");
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.innerHTML = `<span class="tip">${s.dataset.label || i + 1}</span>`;
    b.addEventListener("click", () => s.scrollIntoView({ behavior: "smooth" }));
    dots.appendChild(b);
  });
  const dotEls = $$("#dots button");
  const activeObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = slides.indexOf(e.target);
      dotEls.forEach((d, j) => d.classList.toggle("active", j === i));
    });
  }, { threshold: 0.55 });
  slides.forEach((s) => activeObs.observe(s));

  function currentIndex() {
    const mid = window.scrollY + window.innerHeight / 2;
    let best = 0, bestD = Infinity;
    slides.forEach((s, i) => {
      const c = s.offsetTop + s.offsetHeight / 2;
      const d = Math.abs(c - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }
  function go(dir) {
    const next = Math.max(0, Math.min(slides.length - 1, currentIndex() + dir));
    slides[next].scrollIntoView({ behavior: "smooth" });
  }
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); go(1); }
    else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
  });

  /* ---------- scroll hint ---------- */
  const hint = $("#scrollHint");
  window.addEventListener("scroll", () => { hint.style.opacity = window.scrollY > 60 ? "0" : "1"; }, { passive: true });

  /* ---------- thread player (SMS) ---------- */
  async function playThread(el, steps, token, max = 6) {
    for (const step of steps) {
      if (token.cancelled) return;
      if (step.typing) {
        const t = document.createElement("div");
        t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
        el.appendChild(t); el.scrollTop = el.scrollHeight;
        await sleep(step.typing);
        t.remove();
        if (token.cancelled) return;
      }
      const b = document.createElement("div");
      b.className = "bubble " + step.type;
      b.innerHTML = step.text;
      el.appendChild(b);
      while (el.children.length > max) el.removeChild(el.firstChild);
      el.scrollTop = el.scrollHeight;
      if (step.onShow) step.onShow();
      await sleep(step.delay || 900);
    }
  }

  function loopThread(el, makeSteps, { timer, gap = 2800, max = 6 } = {}) {
    if (RM) { // static: render final frame once
      const token = { cancelled: false };
      const steps = makeSteps().filter((s) => !s.typing);
      steps.forEach((s) => { const b = document.createElement("div"); b.className = "bubble " + s.type; b.innerHTML = s.text; el.appendChild(b); });
      while (el.children.length > max) el.removeChild(el.firstChild);
      if (timer) timer.el.textContent = fmt(timer.to), timer.el.classList.add("done-timer");
      return;
    }
    let token = { cancelled: false };
    (async function run() {
      while (true) {
        token.cancelled = true; token = { cancelled: false };
        el.innerHTML = "";
        let ti = null;
        if (timer) {
          let s = 0; timer.el.textContent = "0:00"; timer.el.style.color = "var(--brand-2)";
          ti = setInterval(() => { s = Math.min(timer.to, s + 1); timer.el.textContent = fmt(s); if (s >= timer.to) { clearInterval(ti); timer.el.style.color = "var(--good)"; } }, Math.max(150, 8200 / timer.to));
        }
        await playThread(el, makeSteps(), token, max);
        if (ti) clearInterval(ti);
        await sleep(gap);
      }
    })();
  }

  /* ---------- HERO thread ---------- */
  const heroSteps = () => [
    { type: "meta", text: "New lead · Zillow · 9:47 PM", delay: 700 },
    { type: "in", text: "Hi, is 123 Oak St still available?", delay: 800 },
    { type: "out", typing: 900, text: "Hi Sarah! 👋 Yes — 123 Oak is available. I can show it <b>today at 5:00</b> or <b>tomorrow 10:00</b>. Which works?", delay: 1100 },
    { type: "in", text: "Tomorrow at 10 works!", delay: 800 },
    { type: "out", typing: 850, text: "Perfect — you're <b>booked for 10:00 AM</b> 📍 Sending the address + confirmation now.", delay: 1000 },
    { type: "tag", text: "✅ Showing booked · answered in 0:41", delay: 2200 },
  ];
  loopThread($("#heroThread"), heroSteps, { timer: { el: $("#heroTimer"), to: 41 }, gap: 2600, max: 6 });

  /* ---------- DASHBOARD (start when scrolled into view) ---------- */
  const LEADS = [
    { n: "Sarah Mitchell", s: "Zillow", c: "#5b8cff" },
    { n: "David Chen", s: "Web form", c: "#29e0c9" },
    { n: "Aisha Khan", s: "Facebook", c: "#9a6bff" },
    { n: "Tom Reyes", s: "Realtor.com", c: "#fb7185" },
    { n: "Megan Brooks", s: "Missed call", c: "#fbbf24" },
    { n: "Carlos Ortiz", s: "Zillow", c: "#36d399" },
    { n: "Priya Nair", s: "Web form", c: "#5b8cff" },
    { n: "Jordan Lee", s: "Instagram", c: "#29e0c9" },
  ];
  const DB = [
    { n: "Marcus B.", t: "Replied 👍", c: "var(--good)", d: "#36d399" },
    { n: "The Hales", t: "Referral asked", c: "var(--gold)", d: "#ffd166" },
    { n: "Nina P.", t: "Text sent", c: "var(--brand-2)", d: "#29e0c9" },
    { n: "Greg & Sue", t: "Review ✅", c: "var(--good)", d: "#36d399" },
  ];
  const DB_NAMES = ["Ravi K.", "The Olsons", "Dana W.", "Felix M.", "The Wus", "Aiden R.", "Carol T."];
  const DB_STATES = [
    { t: "Text sent", c: "var(--brand-2)", d: "#29e0c9" },
    { t: "Replied 👍", c: "var(--good)", d: "#36d399" },
    { t: "Referral asked", c: "var(--gold)", d: "#ffd166" },
    { t: "Review ✅", c: "var(--good)", d: "#36d399" },
    { t: "Nurture queued", c: "#b69bff", d: "#9a6bff" },
  ];
  const dashSteps = () => [
    { type: "meta", text: "Past client · 14 months since closing", delay: 700 },
    { type: "out", typing: 900, text: "Hi Marcus! 🎉 A year in the new place — how are you loving the neighborhood?", delay: 1000 },
    { type: "in", text: "Love it! Funny timing — my brother's looking to buy.", delay: 900 },
    { type: "out", typing: 850, text: "Amazing 🙌 I'd love to help him. Want me to reach out, or send my info?", delay: 1000 },
    { type: "tag", text: "🔁 Referral captured", delay: 2400 },
  ];

  let dashStarted = false;
  const leadFeed = $("#leadFeed");
  const dbFeed = $("#dbFeed");
  const kpiNums = $$(".kpis [data-count]");
  let leadsToday = 37, revenue = 22500;
  const leadsSpan = kpiNums[0];
  const revenueSpan = $("#revenue");

  function makeLead(d) {
    const li = document.createElement("li");
    li.className = "lead";
    li.innerHTML =
      `<div class="lead-av" style="background:linear-gradient(135deg,${d.c},#0a1024)">${initials(d.n)}</div>` +
      `<div class="lead-main"><div class="lead-name">${d.n} <span class="lead-chip">${d.s}</span></div></div>` +
      `<div class="lead-status s-ring">📞 Ringing</div>`;
    const st = $(".lead-status", li);
    leadFeed.prepend(li);
    while (leadFeed.children.length > 5) leadFeed.lastChild.remove();
    if (RM) { st.className = "lead-status s-done"; st.textContent = "✅ Answered 0:38"; return; }
    setTimeout(() => { st.className = "lead-status s-ai"; st.innerHTML = '🤖 AI responding <span class="s-dots"><i></i><i></i><i></i></span>'; }, 900);
    setTimeout(() => {
      const secs = 30 + Math.floor(Math.random() * 25);
      const booked = Math.random() > 0.4;
      st.className = "lead-status s-done";
      st.innerHTML = `✅ Answered 0:${secs}${booked ? " · 📅 booked" : ""}`;
      leadsToday += 1; leadsSpan.textContent = leadsToday;
      if (booked) bump(revenueSpan, (revenue += 7500));
    }, 2100);
  }
  function bump(el, to) {
    const from = to - 7500, t0 = performance.now();
    (function f(now) {
      const p = Math.min(1, (now - t0) / 700);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  function renderDB() {
    dbFeed.innerHTML = "";
    DB.forEach((x) => {
      const li = document.createElement("li");
      li.className = "db-item";
      li.innerHTML = `<span class="db-dot" style="background:${x.d}"></span><span class="db-name">${x.n}</span><span class="db-status" style="color:${x.c}">${x.t}</span>`;
      dbFeed.appendChild(li);
    });
  }

  function startDashboard() {
    if (dashStarted) return; dashStarted = true;
    renderDB();
    loopThread($("#dashThread"), dashSteps, { gap: 2600, max: 5 });
    if (RM) { makeLead(LEADS[0]); makeLead(LEADS[1]); makeLead(LEADS[2]); return; }
    let i = 0;
    makeLead(LEADS[i++ % LEADS.length]);
    setInterval(() => makeLead(LEADS[i++ % LEADS.length]), 3400);
    // rotate database statuses
    let j = 0;
    setInterval(() => {
      const row = DB[Math.floor(Math.random() * DB.length)];
      if (Math.random() > 0.5) row.n = DB_NAMES[j++ % DB_NAMES.length];
      const st = DB_STATES[Math.floor(Math.random() * DB_STATES.length)];
      row.t = st.t; row.c = st.c; row.d = st.d;
      renderDB();
    }, 2600);
  }
  const dashObs = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) startDashboard(); });
  }, { threshold: 0.35 });
  dashObs.observe($("#dashboard"));
})();
