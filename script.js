(() => {
  const menuButton = document.querySelector(".menu-button");
  const siteNav = document.querySelector(".site-nav");

  if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      siteNav.classList.toggle("open", !open);
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;

      const text = target.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = "복사됨";
        button.classList.add("copied");
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove("copied");
        }, 1400);
      } catch {
        button.textContent = "직접 선택해 주세요";
      }
    });
  });

  document.querySelectorAll("[data-origin-path]").forEach((element) => {
    const rawPath = element.dataset.originPath || "/";
    const base = new URL("../", window.location.href);
    element.textContent = new URL(rawPath.replace(/^\//, ""), base).href;
  });

  const deck = document.querySelector(".pitch-deck");
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll(".pitch-slide"));
  const prev = document.getElementById("deckPrev");
  const next = document.getElementById("deckNext");
  const counter = document.getElementById("deckCounter");
  const nav = document.getElementById("deckNav");
  let current = 0;

  const labels = slides.map((slide) => slide.dataset.title || "Slide");

  labels.forEach((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `${index + 1}. ${label}`);
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><b>${label}</b>`;
    button.addEventListener("click", () => show(index));
    nav?.appendChild(button);
  });

  const show = (index, updateHash = true) => {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === current);
      slide.setAttribute("aria-hidden", String(slideIndex !== current));
    });
    Array.from(nav?.children || []).forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === current);
      button.setAttribute("aria-current", buttonIndex === current ? "step" : "false");
    });
    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === slides.length - 1;
    if (updateHash) history.replaceState(null, "", `#${current + 1}`);
    slides[current]?.scrollTo({ top: 0, behavior: "auto" });
  };

  prev?.addEventListener("click", () => show(current - 1));
  next?.addEventListener("click", () => show(current + 1));

  document.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") show(current + 1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") show(current - 1);
  });

  const initial = Number.parseInt(window.location.hash.slice(1), 10);
  show(Number.isFinite(initial) ? initial - 1 : 0, false);
})();
