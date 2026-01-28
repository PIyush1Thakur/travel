const nightlifeData = {
  mumbai: {
    name: "Mumbai Hotspots",
    spots: ["Bandra Street Clubs", "Trilogy Nightclub", "Mumbai Marine Drive"]
  },
  goa: {
    name: "Goa Hotspots",
    spots: ["Baga Beach Clubs", "Curlies Shack", "Silent Noise Parties"]
  },
  bangalore: {
    name: "Bangalore Hotspots",
    spots: ["Koramangala Pubs", "Indiranagar Breweries", "Live Music Lounges"]
  },
  delhi: {
    name: "Delhi NCR Hotspots",
    spots: ["CP Rooftops", "Hauz Khas Village", "Gurgaon Nightclubs"]
  }
};
const modal = document.getElementById("cityModal");
const cityName = document.getElementById("cityName");
const citySpots = document.getElementById("citySpots");
const closeBtn = document.querySelector(".close-btn");
document.querySelectorAll(".party-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cityKey = btn.dataset.city;
    const data = nightlifeData[cityKey];

    cityName.textContent = data.name;
    citySpots.innerHTML = data.spots.map(s => `<li>${s}</li>`).join("");

    modal.style.display = "flex";
  });
});
closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.style.display = "none";
});
