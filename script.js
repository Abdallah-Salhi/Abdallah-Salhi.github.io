// Trailing cursor dot: the dot eases toward the real pointer position every
// animation frame instead of snapping to it, which is what gives it the
// "trailing" feel. It grows and softens over links, buttons, and cards.
// Disabled automatically on touch devices via the CSS `@media (hover: none)`
// rule, which hides .cursor-dot entirely.
//
// Over text (p, li, h1-h3, code), style.css sets `cursor: text` so the
// browser's own I-beam still shows through, so you can see exactly where
// you're clicking to select a word or a line.

const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot && window.matchMedia("(hover: hover)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;

  const EASE = 0.6;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.querySelectorAll("a, button, .project-card, .experience-item").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorDot.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursorDot.classList.remove("is-active"));
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * EASE;
    dotY += (mouseY - dotY) * EASE;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    requestAnimationFrame(animateCursor);
  }

  requestAnimationFrame(animateCursor);
}

// Scroll-reveal: the hero photo/text, skill cards, project cards, and the
// My Journey cards all start hidden (see style.css) and get .in-view added
// the first time they scroll into the viewport, which triggers the
// fade/slide-up transition. The hero elements are already in the viewport
// on page load, so they play immediately instead of waiting for a scroll.
// unobserve() after the first reveal so it only plays once per element.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(
    ".journey .experience-item, .headshot, .hero-text, .skill-item, .project-card, section h2, .tagline, .contact-intro > p"
  )
  .forEach((el) => {
    revealObserver.observe(el);
  });

// My Journey / About Me tabs: only one .tab-panel is shown at a time, so the
// About Me content only appears once someone actively clicks that tab.
const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove("is-active");
    });
    const targetPanel = document.getElementById(button.getAttribute("aria-controls"));
    targetPanel.hidden = false;
    targetPanel.classList.add("is-active");
  });
});
