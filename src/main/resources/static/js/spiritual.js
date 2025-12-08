// spiritual.js
// Page-specific interactions for Spiritual & Peaceful page

// 1. Scroll reveal for cards, experience items, and itinerary steps
const revealTargets = document.querySelectorAll(
  ".spiritual-card, .experience-item, .itinerary-step"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealTargets.forEach((el) => observer.observe(el));

// 2. Optional: subtle chip click highlight (purely visual)
const chips = document.querySelectorAll(".spiritual-chips .chip");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("chip-active"));
    chip.classList.add("chip-active");
  });
});

// Add small CSS for chip-active state dynamically
const chipStyle = document.createElement("style");
chipStyle.textContent = `
  .chip-active {
    background: rgba(255, 207, 51, 0.25) !important;
    border-color: rgba(255, 207, 51, 0.9) !important;
    transform: translateY(-2px) scale(1.02);
  }
`;
document.head.appendChild(chipStyle);
