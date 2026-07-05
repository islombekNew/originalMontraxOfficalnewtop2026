/* ══════════════════════════════════════════════════════════
   MONTRAX — Interactions (shared across all pages)
   ══════════════════════════════════════════════════════════ */
(() => {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ───── LOADER ───── */
  const hideLoader = () => $("#loader")?.classList.add("done");
  window.addEventListener("load", () => setTimeout(hideLoader, 1400));
  setTimeout(hideLoader, 3200); // safety

  /* ───── YEAR ───── */
  $$("#year, .year").forEach(el => el.textContent = new Date().getFullYear());

  /* ───── i18n ───── */
  const LANG_KEY = "montrax_lang";
  function applyLang(lang) {
    const dict = window.I18N?.[lang];
    if (!dict) return;
    $$("[data-i18n]").forEach(el => { const v = dict[el.getAttribute("data-i18n")]; if (v != null) el.textContent = v; });
    $$("[data-i18n-ph]").forEach(el => { const v = dict[el.getAttribute("data-i18n-ph")]; if (v != null) el.setAttribute("placeholder", v); });
    document.documentElement.lang = lang;
    $$("#langSwitch button, .lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    localStorage.setItem(LANG_KEY, lang);
  }
  applyLang(localStorage.getItem(LANG_KEY) || "en");
  $$(".lang-switch").forEach(sw => sw.addEventListener("click", e => {
    const btn = e.target.closest("button[data-lang]"); if (btn) applyLang(btn.dataset.lang);
  }));

  /* ───── ACTIVE NAV LINK (scroll-spy on one-pager, exact on portfolio) ───── */
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "portfolio.html") {
    $$(".nav-links a, .mobile-menu a").forEach(a => {
      if ((a.getAttribute("href") || "").toLowerCase() === "portfolio.html") a.classList.add("active");
    });
  } else {
    const spyLinks = $$('.nav-links a[href*="#"]');
    const map = {};
    spyLinks.forEach(a => { const h = a.getAttribute("href"); const id = h.slice(h.indexOf("#")); if ($(id)) map[id] = a; });
    const secs = Object.keys(map).map(id => $(id)).filter(Boolean);
    const spyObs = new IntersectionObserver(ents => {
      ents.forEach(en => {
        if (en.isIntersecting) { spyLinks.forEach(a => a.classList.remove("active")); map["#" + en.target.id]?.classList.add("active"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(s => spyObs.observe(s));
  }

  /* ───── NAV scroll state + progress ───── */
  const nav = $("#nav"), progress = $("#progress");
  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("scrolled", y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ───── MOBILE MENU ───── */
  const burger = $("#burger"), mobileMenu = $("#mobileMenu");
  const setMenu = open => {
    mobileMenu?.classList.toggle("open", open);
    burger?.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger?.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

  /* ───── SMOOTH ANCHOR SCROLL (works for #id and page.html#id on same page) ───── */
  $$('a[href*="#"]').forEach(a => {
    a.addEventListener("click", e => {
      let url;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.pathname !== location.pathname || !url.hash) return;  // let cross-page links navigate
      const target = $(url.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", url.hash);
      }
    });
  });

  /* ───── SCROLL REVEAL (replays on every entry) ───── */
  const revObserver = new IntersectionObserver(entries => {
    entries.forEach(en => en.target.classList.toggle("in", en.isIntersecting));
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach(el => revObserver.observe(el));

  /* ───── ANIMATED COUNTERS (replay on entry) ───── */
  const runCount = el => {
    const target = +el.dataset.count, dur = 1400;
    if (reduceMotion) { el.textContent = target; return; }
    let start = null;
    const tick = t => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) runCount(en.target);
      else en.target.textContent = "0";
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => countObserver.observe(el));

  /* ───── CUSTOM CURSOR (single exact dot, no trailing ring) ───── */
  const dot = $(".cursor-dot");
  if (fine && dot && !reduceMotion) {
    document.documentElement.classList.add("custom-cursor");
    let ready = false;
    window.addEventListener("mousemove", e => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!ready) { ready = true; document.body.classList.add("cursor-ready"); }
    });
    document.addEventListener("mousedown", () => dot.classList.add("is-down"));
    document.addEventListener("mouseup", () => dot.classList.remove("is-down"));
    document.addEventListener("mouseleave", () => document.body.classList.remove("cursor-ready"));
    document.addEventListener("mouseenter", () => document.body.classList.add("cursor-ready"));
    const hoverSel = "a, button, [data-magnetic], .work, .service-card, .mockup, .tech-chip, .faq-q, input, textarea, select, .lang-switch button";
    document.addEventListener("mouseover", e => { if (e.target.closest(hoverSel)) dot.classList.add("is-hover"); });
    document.addEventListener("mouseout",  e => { if (e.target.closest(hoverSel)) dot.classList.remove("is-hover"); });
  }

  /* ───── MAGNETIC ───── */
  if (fine && !reduceMotion) {
    $$("[data-magnetic]").forEach(el => {
      const s = 0.32;
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width/2)) * s}px, ${(e.clientY - (r.top + r.height/2)) * s}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ───── SERVICE CARD SPOTLIGHT ───── */
  $$(".service-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ───── 3D TILT ───── */
  if (fine && !reduceMotion) {
    $$("[data-tilt]").forEach(el => {
      const max = 8;
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${px*max}deg) rotateX(${-py*max}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ───── HERO 3D SCENE PARALLAX ───── */
  const scene = $(".hv-scene");
  if (scene && fine && !reduceMotion) {
    window.addEventListener("mousemove", e => {
      const cx = e.clientX / innerWidth - 0.5, cy = e.clientY / innerHeight - 0.5;
      scene.style.transform = `rotateY(${cx*18}deg) rotateX(${-cy*18}deg)`;
    });
  }

  /* ───── PORTFOLIO FILTER ───── */
  const filters = $("#filters");
  if (filters) {
    const works = $$("#portfolioGrid > *");
    filters.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn"); if (!btn) return;
      $$(".filter-btn", filters).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      works.forEach(w => w.classList.toggle("hide", !(f === "all" || w.dataset.category === f)));
    });
  }

  /* ───── CAROUSELS (data-carousel) ───── */
  $$("[data-carousel]").forEach(car => {
    const track = $(".carousel-track, .testi-track", car) || car.querySelector("[data-track]");
    if (!track) return;
    const step = () => (track.firstElementChild?.offsetWidth || 360) + 24;
    $(".car-next", car)?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    $(".car-prev", car)?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  });

  /* ───── FAQ ACCORDION ───── */
  $$(".faq-item").forEach(item => {
    const q = $(".faq-q", item), a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      $$(".faq-item").forEach(o => { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = null; });
      if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ───── CONTACT FORM → Telegram ───── */
  const form = $("#contactForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    ["name", "email", "message"].forEach(n => {
      const field = form.elements[n]; if (!field) return;
      const ok = field.value.trim() !== "" && !(n === "email" && !/^\S+@\S+\.\S+$/.test(field.value));
      field.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;
    const g = n => (form.elements[n]?.value || "").trim();
    const msg =
`New project request — Montrax
Name: ${g("name")}
Email: ${g("email")}
Telegram: ${g("telegram") || "—"}
Company: ${g("company") || "—"}
Service: ${g("service")}
Budget: ${g("budget")}

${g("message")}`;
    $(".form-fields", form).style.display = "none";
    $("#formSuccess")?.classList.add("show");
    window.open("https://t.me/Montrax_offical?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
  form && $$("input, textarea", form).forEach(f => f.addEventListener("input", () => f.classList.remove("invalid")));
})();
