const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

const titleInput = document.getElementById("jortitle");
const locationInput = document.getElementById("jorlocation");
const descriptionInput = document.getElementById("jordescription");

const previewTitle = document.getElementById("previewTitle");
const previewLocation = document.getElementById("previewLocation");
const previewDescription = document.getElementById("previewDescription");

function bindPreview(input, targetElement, fallbackText) {
  if (!input || !targetElement) return;
  input.addEventListener("input", () => {
    targetElement.textContent = input.value.trim() || fallbackText;
  });
}

bindPreview(titleInput, previewTitle, "Journey Title...");
bindPreview(locationInput, previewLocation, "Journey Location...");
bindPreview(descriptionInput, previewDescription, "Journey Description...");

const journeysContainer = document.getElementById("journeysContainer");
const journeyForm = document.getElementById("journeyForm");
const reloadBtn = document.getElementById("reloadJourneysBtn");

async function loadJourneys() {
  if (!journeysContainer) return;
  journeysContainer.innerHTML = `<p class="state-text">Loading your journeys...</p>`;

  try {
    const res = await fetch("http://localhost:8080/user/journey/my");

    if (!res.ok) {
      journeysContainer.innerHTML =
        `<p class="state-text">Unable to load journeys. Please try again later.</p>`;
      return;
    }

    const journeys = await res.json();
    journeysContainer.innerHTML = "";

    if (!journeys || journeys.length === 0) {
      journeysContainer.innerHTML =
        `<p class="state-text">No journeys saved yet. Add your first one on the left!</p>`;
      return;
    }

    journeys.forEach((j, index) => {
      const card = document.createElement("article");
      card.className = "journey-card";

      card.innerHTML = `
        <h4 class="journey-title">${j.jortitle || "Untitled Journey"}</h4>
        <p class="journey-location">${j.jorlocation || "Unknown Location"}</p>
        <p class="journey-description">${j.jordescription || ""}</p>
      `;

      setTimeout(() => {
        card.classList.add("pop-in");
      }, index * 80);

      journeysContainer.appendChild(card);
    });
  } catch (err) {
    journeysContainer.innerHTML =
      `<p class="state-text">Network error while fetching journeys.</p>`;
    console.error(err);
  }
}

if (journeyForm) {
  journeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const journey = {
      jortitle: titleInput.value.trim(),
      jorlocation: locationInput.value.trim(),
      jordescription: descriptionInput.value.trim()
    };

    if (!journey.jortitle || !journey.jorlocation || !journey.jordescription) {
      alert("Please fill in all fields before saving.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/user/add/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journey)
      });

      const data = await res.text();

      if (!res.ok) {
        alert("Error: " + data);
        return;
      }

      alert("Journey added successfully ✅");

      journeyForm.reset();

      previewTitle.textContent = "Journey Title...";
      previewLocation.textContent = "Journey Location...";
      previewDescription.textContent = "Journey Description...";

      loadJourneys();
    } catch (err) {
      alert("Network Error: " + err.message);
      console.error(err);
    }
  });
}

if (reloadBtn) {
  reloadBtn.addEventListener("click", () => {
    loadJourneys();
  });
}

loadJourneys();
