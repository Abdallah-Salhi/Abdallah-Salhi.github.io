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

  const EASE = 0.18;

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
