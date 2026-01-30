const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        navToggle.classList.toggle("active");
    });
}

function bindPreview(input, target, fallback) {
    input.addEventListener("input", () => {
        target.textContent = input.value.trim() || fallback;
    });
}

const titleInput = document.getElementById("jortitle");
const locationInput = document.getElementById("jorlocation");
const descriptionInput = document.getElementById("jordescription");

bindPreview(titleInput, document.getElementById("previewTitle"), "Journey Title...");
bindPreview(locationInput, document.getElementById("previewLocation"), "Journey Location...");
bindPreview(descriptionInput, document.getElementById("previewDescription"), "Journey Description...");

async function loadJourneys() {
    const container = document.getElementById("journeysContainer");
    container.innerHTML = `<p class="state-text">Loading your journeys...</p>`;

    try {
        const res = await fetch("/user/journey/my");

        if (!res.ok) {
            container.innerHTML = `<p class="state-text">Failed to load journeys.</p>`;
            return;
        }

        const data = await res.json();
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = `<p class="state-text">No journeys added yet.</p>`;
            return;
        }

        data.forEach(journey => {
            const card = document.createElement("article");
            card.className = "journey-card";

            card.innerHTML = `
                <img
                  src="/${journey.imagePath}"
                  style="width: 100%; height: 100px; object-fit: cover; border-radius: 12px; display: block;"
                  alt="Journey image"
                />
                <h4 class="journey-title">${journey.jortitle}</h4>
                <p class="journey-location">${journey.jorlocation}</p>
                <p class="journey-description">${journey.jordescription}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p class="state-text">Network error while loading journeys.</p>`;
    }
}

const journeyForm = document.getElementById("journeyForm");

journeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(journeyForm);

    try {
        const res = await fetch("/user/add/journey", {
            method: "POST",
            body: formData
        });

        const msg = await res.text();

        if (!res.ok) {
            alert("Error: " + msg);
            return;
        }

        alert("Journey added successfully!");

        journeyForm.reset();
        document.getElementById("previewTitle").textContent = "Journey Title...";
        document.getElementById("previewLocation").textContent = "Journey Location...";
        document.getElementById("previewDescription").textContent = "Journey Description...";

        loadJourneys();

    } catch (error) {
        alert("Network error.");
        console.error(error);
    }
});
document.getElementById("reloadJourneysBtn").addEventListener("click", loadJourneys);
loadJourneys();
