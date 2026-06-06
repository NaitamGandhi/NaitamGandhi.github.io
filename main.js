/* =============================================================================
 *  main.js — renders the site from CONFIG (config.js).
 *  Edit config.js for content. Only touch this for new layout features.
 * ============================================================================ */
(function () {
  "use strict";
  const C = window.CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );

  /* ---- Theme ---- */
  function applyTheme() {
    const t = C.theme || {};
    const map = {
      "--accent": t.accent, "--accent-alt": t.accentAlt, "--accent-warn": t.accentWarn,
      "--bg": t.bg, "--surface": t.surface, "--border": t.border,
      "--text": t.text, "--text-dim": t.textDim, "--font": t.font,
    };
    Object.entries(map).forEach(([k, v]) => v && document.documentElement.style.setProperty(k, v));
  }

  /* ---- Helpers ---- */
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  const tags  = (arr) => (arr || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const chips = (arr) => (arr || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("");

  /* ---- Hero ---- */
  function renderHero() {
    const p = C.profile || {};

    // Name: set textContent + data-text attr (used by glitch CSS pseudo-elements)
    const nameEl = $("[data-name]");
    if (nameEl) {
      nameEl.textContent = p.name || "";
      nameEl.setAttribute("data-text", p.name || "");
    }

    $$("[data-brand]").forEach((el) => (el.textContent = p.name || ""));
    set("[data-tagline]", esc(p.tagline || ""));

    const tt = $("[data-term-title]");
    if (tt) tt.textContent = `${p.handle || "user"}@portfolio: ~`;
    $$("[data-prompt]").forEach((el) => (el.textContent = `${p.handle || "user"}@portfolio:~$`));

    if (p.available) {
      set("[data-available]",
        `<span class="badge-avail"><span class="pulse"></span>${esc(p.availableText || "Open to opportunities")}</span>`);
    }

    const cta = [`<a class="btn btn--primary" href="#projects">view projects</a>`];
    if (p.resumeUrl) cta.push(`<a class="btn btn--ghost" href="${esc(p.resumeUrl)}" target="_blank" rel="noopener">résumé</a>`);
    const gh = (C.links || []).find((l) => l.icon === "github");
    if (gh) cta.push(`<a class="btn btn--ghost" href="${esc(gh.url)}" target="_blank" rel="noopener">github</a>`);
    set("[data-hero-cta]", cta.join(""));

    if (!reduceMotion) scheduleGlitch(nameEl);
  }

  function scheduleGlitch(el) {
    if (!el) return;
    setTimeout(() => {
      el.classList.add("glitch");
      setTimeout(() => { el.classList.remove("glitch"); scheduleGlitch(el); }, 220);
    }, 7000 + Math.random() * 6000);
  }

  /* ---- Typing effect ---- */
  function typeRoles() {
    const el = $("[data-typed]");
    const roles = (C.profile && C.profile.roles) || [];
    if (!el || !roles.length) { if (el) el.textContent = roles[0] || ""; return; }
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      if (!deleting && i < word.length)    { i++; setTimeout(tick, 52); }
      else if (!deleting)                  { deleting = true; setTimeout(tick, 1800); }
      else if (deleting && i > 0)          { i--; setTimeout(tick, 26); }
      else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 380); }
    })();
  }

  /* ---- Canvas node-network background ---- */
  function initNodeNetwork() {
    const canvas = $("#bg");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, nodes = [], raf;
    const accent = (C.theme && C.theme.accent)    || "#2dd4bf";
    const alt    = (C.theme && C.theme.accentAlt) || "#fbbf24";

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width  = window.innerWidth  * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.6 + 1) * dpr,
        warm: Math.random() > 0.7,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const linkDist = 130 * dpr;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = accent;
            ctx.globalAlpha = (1 - d / linkDist) * 0.18;
            ctx.lineWidth = dpr;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = n.warm ? alt : accent;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize(); frame();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(resize, 200); });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf); else frame();
    });
  }

  /* ---- About ---- */
  function renderAbout() {
    const a = C.about || {};
    set("[data-about]", (a.summary || "").split("\n\n").map((p) => `<p>${esc(p)}</p>`).join(""));
    set("[data-stats]", (a.stats || []).map((s) =>
      `<div class="stat reveal"><div class="stat__value">${esc(s.value)}</div><div class="stat__label">${esc(s.label)}</div></div>`
    ).join(""));
  }

  /* ---- Experience ---- */
  function renderExperience() {
    set("[data-experience]", (C.experience || []).map((j) => `
      <article class="job reveal">
        <div class="job__head">
          <div>
            <span class="job__role">${esc(j.role)}</span>
            <span class="job__co"> @ ${esc(j.company)}</span>
          </div>
          <span class="job__meta">${esc(j.start)} — ${esc(j.end)}</span>
        </div>
        <div class="job__loc">${esc(j.location || "")}</div>
        <div class="job__tags">${tags(j.tags)}</div>
        <ul class="job__list">${(j.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      </article>`).join(""));
  }

  /* ---- Projects — horizontal swipe carousel ---- */
  let revealObserver; // initialized in wireInteractions, used here for new cards

  function renderProjects() {
    const allProjects = (C.projects || []).slice().sort((a, b) => (b.featured === true) - (a.featured === true));
    let visible = allProjects.slice();

    const allTags = Array.from(new Set(allProjects.flatMap((p) => p.tags || []))).sort();
    set("[data-filters]",
      [`<button class="filter active" data-f="all">all</button>`]
        .concat(allTags.map((t) => `<button class="filter" data-f="${esc(t)}">${esc(t)}</button>`))
        .join("")
    );

    const track    = $("[data-projects]");
    const dotsEl   = $("[data-dots]");
    const prevBtn  = $("[data-prev]");
    const nextBtn  = $("[data-next]");
    const carousel = $("#projectCarousel");
    if (!track) return;

    let current = 0;

    function cardHTML(p) {
      return `<article class="card ${p.featured ? "card--featured" : ""} reveal" data-tags="${esc((p.tags || []).join("|"))}">
        <div class="card__head">
          <div>
            <div class="card__title">${esc(p.title)}</div>
            <div class="card__year">${esc(p.year || "")}</div>
          </div>
          ${p.status ? `<span class="status status--${esc(p.status)}">${esc(p.status.replace(/-/g, " "))}</span>` : ""}
        </div>
        <p class="card__blurb">${esc(p.blurb)}</p>
        <div class="card__tags">${tags(p.tags)}</div>
        ${(p.links && p.links.length)
          ? `<div class="card__links">${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`
          : ""}
      </article>`;
    }

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = visible.map((_, i) =>
        `<span class="dot-indicator${i === 0 ? " active" : ""}" data-i="${i}"></span>`
      ).join("");
      $$(".dot-indicator", dotsEl).forEach((d) =>
        d.addEventListener("click", () => goTo(parseInt(d.dataset.i, 10)))
      );
    }

    function goTo(idx) {
      if (!visible.length) return;
      current = Math.max(0, Math.min(idx, visible.length - 1));
      const cards = $$(".card", track);
      if (cards[current]) track.style.transform = `translateX(-${cards[current].offsetLeft}px)`;
      $$(".dot-indicator", dotsEl).forEach((d, i) => d.classList.toggle("active", i === current));
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current >= visible.length - 1;
    }

    function renderCards() {
      track.innerHTML = visible.map(cardHTML).join("");
      current = 0;
      buildDots();
      // rAF so browser lays out cards before we measure offsetLeft
      requestAnimationFrame(() => goTo(0));
      if (revealObserver) $$(".reveal", track).forEach((el) => revealObserver.observe(el));
    }

    // Pointer drag (works for mouse and touch via pointer events)
    if (carousel) {
      let startX = 0, isDragging = false, dragDelta = 0;

      track.addEventListener("pointerdown", (e) => {
        isDragging = true; startX = e.clientX; dragDelta = 0;
        track.setPointerCapture(e.pointerId);
      });
      track.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        dragDelta = e.clientX - startX;
      });
      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        if (dragDelta < -60) goTo(current + 1);
        else if (dragDelta > 60) goTo(current - 1);
        dragDelta = 0;
      };
      track.addEventListener("pointerup", endDrag);
      track.addEventListener("pointercancel", endDrag);

      // Keyboard navigation when carousel is focused
      carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    // Tag filter rebuilds the visible set and re-renders
    $$("[data-filters] .filter").forEach((btn) =>
      btn.addEventListener("click", () => {
        $$("[data-filters] .filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.f;
        visible = f === "all"
          ? allProjects.slice()
          : allProjects.filter((p) => (p.tags || []).includes(f));
        renderCards();
      })
    );

    // Recalculate translate on resize (card width is responsive)
    window.addEventListener("resize", () => goTo(current), { passive: true });

    renderCards();
  }

  /* ---- Skills ---- */
  function renderSkills() {
    set("[data-skills]", (C.skills || []).map((g) => `
      <div class="skillgroup reveal">
        <div class="skillgroup__label">${esc(g.group)}</div>
        <div class="skillgroup__items">${chips(g.items)}</div>
      </div>`).join(""));

    const cur = C.currently || {};
    const block = (key, label) => (cur[key] && cur[key].length) ? `
      <div class="currently__block">
        <div class="currently__key">${label}</div>
        <ul>${cur[key].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>` : "";
    set("[data-currently]", `<h3>Currently</h3>${block("learning", "learning")}${block("building", "building")}${block("reading", "reading")}`);
  }

  /* ---- Education ---- */
  function renderEducation() {
    set("[data-education]", (C.education || []).map((e) => `
      <div class="edu__card reveal">
        <div class="edu__school">${esc(e.school)}</div>
        <div class="edu__degree">${esc(e.degree)}</div>
        ${(e.start || e.end) ? `<div class="edu__meta">${esc(e.start)}${e.start && e.end ? " — " : ""}${esc(e.end)}</div>` : ""}
        <div class="edu__notes">${esc(e.notes || "")}</div>
        <div class="edu__desc">${esc(e.desc || "")}</div>
      </div>`).join(""));
  }

  /* ---- Contact ---- */
  function renderContact() {
    const p = C.profile || {};
    set("[data-contact-lead]",
      `Want to talk full-stack dev, AI/ML automation, or infrastructure design? Based in ${esc(p.location || "")} — ${p.available ? "open to new opportunities" : "always happy to connect"}.`);
    set("[data-contact-links]", (C.links || []).map((l) =>
      `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(""));
    set("[data-footer]", `Designed by ${esc(p.name || "")} © ${new Date().getFullYear()}`);
  }

  /* ---- Dock nav + scroll reveal ---- */
  function wireInteractions() {
    // Dock: highlight the link matching the section currently in view
    const dockLinks = $$(".dock__item");
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          dockLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`)
          );
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => secObs.observe(s));

    // Scroll reveal — also used by renderProjects for newly injected cards
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  }

  /* ---- Init ---- */
  function init() {
    if (!window.CONFIG) { console.error("config.js failed to load."); return; }
    applyTheme();
    renderHero();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    renderEducation();
    renderContact();
    wireInteractions(); // runs after all renders so every .reveal element is observed
    typeRoles();
    initNodeNetwork();
    document.title = `${C.profile?.name || "Portfolio"} — ${(C.profile?.roles && C.profile.roles[0]) || ""}`;
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
