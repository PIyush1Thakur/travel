const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

const plannerForm = document.getElementById("tripPlannerForm");
const plannerOutput = document.getElementById("plannerOutput");

const vibeSuggestions = {
  heritage: {
    title: "Heritage & Culture",
    places: ["Agra (Taj Mahal)", "Jaipur", "Udaipur", "Hampi"],
    note: "Focus on forts, palaces, and UNESCO heritage sites with guided city tours."
  },
  mountains: {
    title: "Mountains & Adventure",
    places: ["Manali", "Leh–Ladakh", "Rishikesh", "Kasol"],
    note: "Ideal for trekking, river rafting, camping, and scenic drives through the Himalayas."
  },
  beach: {
    title: "Beach & Chill",
    places: ["Goa", "Gokarna", "Varkala", "Andamans"],
    note: "Relax on beaches, explore cafes, water sports, and sunset points."
  },
  spiritual: {
    title: "Spiritual & Peaceful",
    places: ["Varanasi", "Rishikesh", "Haridwar", "Bodh Gaya"],
    note: "Morning aartis, ghats, ashrams, meditation and yoga retreats."
  },
  party: {
    title: "Nightlife & Party",
    places: ["Mumbai", "Bangalore", "Delhi NCR", "Goa (Baga/Calangute)"],
    note: "City lights, pubs, live music, rooftop dining, and late-night scenes."
  },
  wildlife: {
    title: "Nature & Wildlife",
    places: ["Jim Corbett", "Ranthambore", "Kaziranga", "Bandhavgarh"],
    note: "Safaris, jungle lodges, and sunrise drives through dense forests."
  }
};

plannerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const days = parseInt(document.getElementById("days").value, 10);
  const vibe = document.getElementById("vibe").value;
  const budget = document.getElementById("budget").value;
  const month = document.getElementById("month").value;

  if (!days || !vibe || !budget || !month) return;

  const suggestion = vibeSuggestions[vibe];
  const budgetLabel =
    budget === "budget"
      ? "Budget-friendly"
      : budget === "mid"
      ? "Comfort / Mid-range"
      : "Luxury-focused";

  const pace =
    days <= 4
      ? "Fast-paced with 1–2 key hubs."
      : days <= 8
      ? "Balanced with 2–3 destinations."
      : "Slow travel with time to deeply explore 3–4 regions.";

  plannerOutput.innerHTML = `
    <h3>Your ${suggestion.title} Plan</h3>
    <p><strong>Duration:</strong> ${days} days</p>
    <p><strong>Travel Window:</strong> ${month}</p>
    <p><strong>Budget Style:</strong> ${budgetLabel}</p>
    <hr />
    <p><strong>Suggested Base Destinations:</strong></p>
    <ul class="suggested-list">
      ${suggestion.places.map((p) => `<li>${p}</li>`).join("")}
    </ul>
    <p class="note">
      <strong>Trip Pace:</strong> ${pace}
    </p>
    <p class="note">
      <strong>How to spend your days:</strong> ${suggestion.note}
    </p>
    <p class="note">
      <strong>Pro tip:</strong> Mix in at least one slower day with local food walks or
      markets, and keep 1 buffer day for travel delays or spontaneous plans.
    </p>
  `;

  plannerOutput.classList.remove("highlight");
  void plannerOutput.offsetWidth;
  plannerOutput.classList.add("highlight");

  plannerOutput.scrollIntoView({ behavior: "smooth", block: "start" });

  document.querySelectorAll(".card[data-vibe]").forEach((card) => {
    card.classList.remove("card-active");
    if (card.dataset.vibe === vibe) {
      card.classList.add("card-active");
    }
  });
});

const styleExtra = document.createElement("style");
styleExtra.textContent = `
  .planner-output.highlight {
    animation: pulseGlow 0.7s ease-out;
  }

  @keyframes pulseGlow {
    0% {
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6),
                  0 0 0 0 rgba(255, 207, 51, 0.55);
    }
    100% {
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6),
                  0 0 0 18px rgba(255, 207, 51, 0);
    }
  }

  .card-active {
    border-color: rgba(255, 207, 51, 0.7) !important;
    transform: translateY(-8px) scale(1.02);
  }
`;
document.head.appendChild(styleExtra);
