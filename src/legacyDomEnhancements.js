let moreTextHandlerInstalled = false;

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

function ensureSplitHeaderLogo(root = document) {
  const iconSrc = "/assets/images/Logo.png";
  const textSrc = "/assets/images/HRMetricSLogoText.png";

  const logoImgs = root.querySelectorAll('img[src*="assets/images/logo1.png"], img[src$="/logo1.png"], img[src$="logo1.png"]');
  for (const img of logoImgs) {
    if (img.dataset.splitLogo === "true") continue;
    img.dataset.splitLogo = "true";

    const container = img.closest(".smllogo") || img.parentElement;
    container?.classList?.add("split-logo");

    img.src = iconSrc;
    img.alt = img.alt || "HRMetricS";
    img.classList.add("brand-logo__icon");

    // If a text logo already exists next to it, don't add another.
    const nextEl = img.nextElementSibling;
    const alreadyHasText =
      nextEl && nextEl.tagName === "IMG" && (nextEl.getAttribute("src") || "").includes("HRMetricSLogoText.png");
    if (alreadyHasText) continue;

    const textImg = document.createElement("img");
    textImg.src = textSrc;
    textImg.alt = "";
    textImg.setAttribute("aria-hidden", "true");
    textImg.className = "brand-logo__text";
    img.insertAdjacentElement("afterend", textImg);
  }
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

  ensureSplitHeaderLogo(document);
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
