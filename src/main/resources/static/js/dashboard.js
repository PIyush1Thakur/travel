/* ===================== NAVIGATION TOGGLE ===================== */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

/* ===================== LIVE PREVIEW ===================== */
const titleInput = document.getElementById("jortitle");
const locationInput = document.getElementById("jorlocation");
const descriptionInput = document.getElementById("jordescription");
const imageInput = document.getElementById("jorimage");

const previewTitle = document.getElementById("previewTitle");
const previewLocation = document.getElementById("previewLocation");
const previewDescription = document.getElementById("previewDescription");
const previewImage = document.getElementById("previewImage");

function bindPreview(input, targetElement, fallbackText) {
  if (!input || !targetElement) return;
  input.addEventListener("input", () => {
    targetElement.textContent = input.value.trim() || fallbackText;
  });
}

bindPreview(titleInput, previewTitle, "Journey Title...");
bindPreview(locationInput, previewLocation, "Journey Location...");
bindPreview(descriptionInput, previewDescription, "Journey Description...");

// Image live preview
if (imageInput && previewImage) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
      previewImage.style.display = "none";
    }
  });
}

/* ===================== LOAD JOURNEYS ===================== */
const journeysContainer = document.getElementById("journeysContainer");
const reloadBtn = document.getElementById("reloadJourneysBtn");

async function loadJourneys() {
  if (!journeysContainer) return;
  journeysContainer.innerHTML = `<p class="state-text">Loading your journeys...</p>`;

  try {
    const res = await fetch("http://localhost:8080/user/journey/my");
    if (!res.ok) {
      journeysContainer.innerHTML = `<p class="state-text">Unable to load journeys. Please try again later.</p>`;
      return;
    }

    const journeys = await res.json();
    journeysContainer.innerHTML = "";

    if (!journeys || journeys.length === 0) {
      journeysContainer.innerHTML = `<p class="state-text">No journeys saved yet. Add your first one on the left!</p>`;
      return;
    }

    journeys.forEach((j, index) => {
      const card = document.createElement("article");
      card.className = "journey-card";

      // FIX: Construct valid img path
      const imageURL = j.imagePath
        ? `http://localhost:8080/images/${j.imagePath}`
        : null;

     const imageHTML = j.imagePath
       ? `<img src="http://localhost:8080/${j.imagePath}" class="journey-image">`
       : "";


      card.innerHTML = `
        ${imageHTML}
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
    journeysContainer.innerHTML = `<p class="state-text">Network error while fetching journeys.</p>`;
    console.error(err);
  }
}

/* ===================== FORM SUBMISSION ===================== */
const journeyForm = document.getElementById("journeyForm");

if (journeyForm) {
  journeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(journeyForm);

    try {
      const res = await fetch("http://localhost:8080/user/add/journey", {
        method: "POST",
        body: formData
      });

      const data = await res.text();

      if (!res.ok) {
        alert("Error: " + data);
        return;
      }

      alert("Journey added successfully");

      journeyForm.reset();

      previewTitle.textContent = "Journey Title...";
      previewLocation.textContent = "Journey Location...";
      previewDescription.textContent = "Journey Description...";
      previewImage.style.display = "none";

      loadJourneys();
    } catch (err) {
      alert("Network Error: " + err.message);
      console.error(err);
    }
  });
}

/* ===================== RELOAD BUTTON ===================== */
if (reloadBtn) {
  reloadBtn.addEventListener("click", () => {
    loadJourneys();
  });
}

/* ===================== INITIAL LOAD ===================== */
loadJourneys();
