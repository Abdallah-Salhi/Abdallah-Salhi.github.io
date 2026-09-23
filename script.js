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

// Cursor-driven skills marquee: the track only scrolls while the cursor is
// in the outer EDGE_ZONE fraction of the marquee's width on either side,
// faster the closer it gets to that edge, and sits still in the middle.
// The track's HTML contains two back-to-back copies of the skill list, so
// once `pos` drifts past a full copy's width in either direction, it wraps
// by exactly that width, making the loop seamless no matter which way it's
// scrolling. The two arrow icons light up to show which direction (if any)
// is currently active.
const skillsMarquee = document.querySelector(".skills-marquee");
const skillsTrack = document.querySelector(".skills-track");
const skillsArrowLeft = document.querySelector(".skills-arrow-left");
const skillsArrowRight = document.querySelector(".skills-arrow-right");

if (skillsMarquee && skillsTrack) {
  const EDGE_ZONE = 0.3;
  const MAX_SPEED = 2.5;

  let speed = 0;
  let pos = 0;
  let halfWidth = skillsTrack.scrollWidth / 2;

  window.addEventListener("resize", () => {
    halfWidth = skillsTrack.scrollWidth / 2;
  });

  skillsMarquee.addEventListener("mousemove", (event) => {
    const rect = skillsMarquee.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;

    if (ratio < EDGE_ZONE) {
      const strength = (EDGE_ZONE - ratio) / EDGE_ZONE;
      speed = strength * MAX_SPEED;
    } else if (ratio > 1 - EDGE_ZONE) {
      const strength = (ratio - (1 - EDGE_ZONE)) / EDGE_ZONE;
      speed = -strength * MAX_SPEED;
    } else {
      speed = 0;
    }

    skillsArrowLeft.classList.toggle("is-active", speed > 0);
    skillsArrowRight.classList.toggle("is-active", speed < 0);
  });

  skillsMarquee.addEventListener("mouseleave", () => {
    speed = 0;
    skillsArrowLeft.classList.remove("is-active");
    skillsArrowRight.classList.remove("is-active");
  });

  function animateSkills() {
    if (speed !== 0 && halfWidth > 0) {
      pos += speed;
      if (pos > 0) pos -= halfWidth;
      if (pos < -halfWidth) pos += halfWidth;
      skillsTrack.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(animateSkills);
  }

  requestAnimationFrame(animateSkills);
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
    ".journey .experience-item, .headshot, .hero-text, .skills-marquee, .project-card, section h2, .tagline, .contact-intro > p"
  )
  .forEach((el) => {
    revealObserver.observe(el);
  });
