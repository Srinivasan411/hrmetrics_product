let moreTextHandlerInstalled = false;
let faqAccordionHandlerInstalled = false;
let spaLinkHandlerInstalled = false;

function getFullText(el) {
  return (el.getAttribute("data-fulltext") || "").trim();
}

function ensureMoreTextInitialized(root = document) {
  const elements = root.querySelectorAll(".moretext[data-fulltext]");
  for (const el of elements) {
    if (el.dataset.moretextInitialized === "true") continue;

    const fullText = getFullText(el);
    if (!fullText) continue;

    const charLimit = 150;
    const shortText = fullText.length > charLimit ? `${fullText.slice(0, charLimit)}...` : fullText;

    el.dataset.moretextInitialized = "true";
    el.dataset.moretextFull = fullText;
    el.dataset.moretextShort = shortText;
    el.dataset.moretextExpanded = "false";

    if (fullText.length > charLimit) {
      el.innerHTML = `${escapeHtml(shortText)} <a href="#" class="read-more-link">Read More</a>`;
    } else {
      el.textContent = fullText;
    }
  }
}

function normalizeInternalHref(rawHref) {
  if (!rawHref) return null;
  const href = rawHref.trim();
  if (!href) return null;

  // Skip special schemes and in-page links.
  const lower = href.toLowerCase();
  if (
    lower.startsWith("#") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("javascript:") ||
    lower.startsWith("data:")
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  // Only normalize same-origin links.
  if (url.origin !== window.location.origin) return null;

  let pathname = url.pathname || "/";
  if (pathname === "/index.html") pathname = "/";
  if (pathname.endsWith("/index.html")) pathname = pathname.slice(0, -"/index.html".length) || "/";

  return `${pathname}${url.search || ""}${url.hash || ""}`;
}

function ensureInternalLinksNormalized(root = document) {
  const anchors = root.querySelectorAll("a[href]");
  for (const a of anchors) {
    if (a.dataset.spaHrefNormalized === "true") continue;
    a.dataset.spaHrefNormalized = "true";

    const normalized = normalizeInternalHref(a.getAttribute("href"));
    if (!normalized) continue;

    a.setAttribute("href", normalized);
  }
}

function installSpaLinkHandler() {
  if (spaLinkHandlerInstalled) return () => {};
  spaLinkHandlerInstalled = true;

  const onClick = (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return; // left click only
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!anchor) return;

    // Let the browser handle new tabs, downloads, etc.
    if (anchor.getAttribute("target") && anchor.getAttribute("target") !== "_self") return;
    if (anchor.hasAttribute("download")) return;
    if (anchor.getAttribute("rel")?.toLowerCase().includes("external")) return;

    const normalized = normalizeInternalHref(anchor.getAttribute("href"));
    if (!normalized) return;

    // Only intercept navigations that actually change the URL.
    if (normalized === `${window.location.pathname}${window.location.search}${window.location.hash}`) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    window.history.pushState({}, "", normalized);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // Capture so we run before any legacy jQuery handlers.
  document.addEventListener("click", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    spaLinkHandlerInstalled = false;
  };
}

function ensureFaqAccordionsInitialized(root = document) {
  const accordions = root.querySelectorAll(".accordion");
  for (const accordion of accordions) {
    const items = accordion.querySelectorAll(".accordion-item");
    if (items.length === 0) continue;

    const normalized = [];
    for (const item of items) {
      const title = item.querySelector(":scope > .accordion-title");
      const content = item.querySelector(":scope > .accordion-content");
      if (!title || !content) continue;
      normalized.push({ title, content });
    }
    if (normalized.length === 0) continue;

    // Pick the first item that looks "open", otherwise default to the first item.
    const openIdx = normalized.findIndex(
      ({ title, content }) => title.classList.contains("active") || content.classList.contains("show")
    );
    const keepOpen = normalized[Math.max(0, openIdx)];

    for (const { title, content } of normalized) {
      const shouldBeOpen = title === keepOpen.title;
      title.classList.toggle("active", shouldBeOpen);
      content.classList.toggle("show", shouldBeOpen);
    }
  }
}

function installFaqAccordionHandler() {
  if (faqAccordionHandlerInstalled) return () => {};
  faqAccordionHandlerInstalled = true;

  const onClick = (e) => {
    const title = e.target instanceof Element ? e.target.closest(".accordion-title") : null;
    if (!title) return;

    const accordion = title.closest(".accordion");
    if (!accordion) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const content = title.nextElementSibling;
    if (!(content instanceof Element) || !content.classList.contains("accordion-content")) return;

    const isOpen = title.classList.contains("active") || content.classList.contains("show");

    for (const el of accordion.querySelectorAll(".accordion-title.active")) {
      el.classList.remove("active");
    }
    for (const el of accordion.querySelectorAll(".accordion-content.show")) {
      el.classList.remove("show");
    }

    if (!isOpen) {
      title.classList.add("active");
      content.classList.add("show");
    }
  };

  // Capture so we run before any legacy (jQuery) click handlers and avoid double-toggles.
  document.addEventListener("click", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    faqAccordionHandlerInstalled = false;
  };
}

function installMoreTextToggleHandler() {
  if (moreTextHandlerInstalled) return () => {};
  moreTextHandlerInstalled = true;

  const onClick = (e) => {
    const link = e.target instanceof Element ? e.target.closest("a.read-more-link") : null;
    if (!link) return;

    const container = link.closest(".moretext");
    if (!container) return;

    e.preventDefault();

    const fullText = container.dataset.moretextFull || getFullText(container);
    const shortText = container.dataset.moretextShort || "";
    const expanded = container.dataset.moretextExpanded === "true";

    if (!fullText) return;

    if (expanded) {
      container.dataset.moretextExpanded = "false";
      container.innerHTML = `${escapeHtml(shortText)} <a href="#" class="read-more-link">Read More</a>`;
    } else {
      container.dataset.moretextExpanded = "true";
      container.innerHTML = `${escapeHtml(fullText)} <a href="#" class="read-more-link">Read Less</a>`;
    }
  };

  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("click", onClick);
    moreTextHandlerInstalled = false;
  };
}

function ensureSwipersInitialized(root = document) {
  const Swiper = globalThis.Swiper;
  if (typeof Swiper !== "function") return [];

  const instances = [];

  instances.push(
    ...createSwipers(root, ".testimonial-style-four-carousel.swiper", {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 2,
      autoplay: { delay: 4500, disableOnInteraction: false },
      navigation: {
        nextEl: ".testimonial-four-next",
        prevEl: ".testimonial-four-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        992: { slidesPerView: 2 },
      },
    })
  );

  instances.push(
    ...createSwipers(root, ".testimonial-carousel.swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: { delay: 4000, disableOnInteraction: false },
    })
  );

  instances.push(
    ...createSwipers(root, ".brand-two-carousel", {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      slidesPerView: 3,
      spaceBetween: 20,
      breakpoints: {
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
    })
  );

  return instances;
}

function createSwipers(root, selector, options) {
  const Swiper = globalThis.Swiper;
  const elements = root.querySelectorAll(selector);
  const instances = [];

  for (const el of elements) {
    if (el.dataset.swiperInitialized === "true") continue;
    el.dataset.swiperInitialized = "true";
    instances.push(new Swiper(el, options));
  }

  return instances;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function initLegacyDomEnhancements() {
  const cleanupFns = [];

  ensureInternalLinksNormalized(document);
  cleanupFns.push(installSpaLinkHandler());
  ensureFaqAccordionsInitialized(document);
  cleanupFns.push(installFaqAccordionHandler());
  cleanupFns.push(installMoreTextToggleHandler());
  ensureMoreTextInitialized(document);

  // Swiper is loaded via a normal script tag; it may not be available on first paint.
  let destroyed = false;
  let attempts = 0;
  let swipers = [];
  let timeoutId = null;

  const tryInitSwipers = () => {
    if (destroyed) return;
    swipers.push(...ensureSwipersInitialized(document));
    if (swipers.length > 0) return;

    attempts += 1;
    if (attempts >= 15) return;
    timeoutId = setTimeout(tryInitSwipers, 100);
  };

  tryInitSwipers();

  cleanupFns.push(() => {
    destroyed = true;
    if (timeoutId) clearTimeout(timeoutId);

    for (const instance of swipers) {
      try {
        instance?.destroy?.(true, true);
      } catch {
        // ignore
      }
    }

    // Allow re-init when navigating back to a route.
    for (const el of document.querySelectorAll("[data-swiper-initialized='true']")) {
      delete el.dataset.swiperInitialized;
    }
  });

  return () => {
    for (const fn of cleanupFns) fn();
  };
}
