// Mobile nav toggle (same behaviour as main page)
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

// Filter: Top Beach Escapes
const chips = document.querySelectorAll(".chip");
const beachCards = document.querySelectorAll(".beach-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    // Active chip state
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    // Show / hide cards with smooth transitions
    beachCards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");

      if (filter === "all" || tags.includes(filter)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// Optional: subtle scroll reveal for sections
const observerOptions = {
  threshold: 0.15,
};

const revealOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(revealOnScroll, observerOptions);

document
  .querySelectorAll(".section")
  .forEach((section) => observer.observe(section));

// Add some CSS for .in-view via JS (if not already in your main CSS)
const extraStyle = document.createElement("style");
extraStyle.textContent = `
  .section {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.6s ease;
  }

  .section.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(extraStyle);
