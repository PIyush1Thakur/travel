(function handleLogoutMessage() {
  const params = new URLSearchParams(window.location.search);
  const banner = document.getElementById("statusBanner");

  if (!banner) return;

  if (params.has("logout")) {
    banner.textContent = "You have logged out successfully.";
    banner.classList.add("show");


    setTimeout(() => {
      banner.classList.remove("show");
      banner.classList.add("hide");
    }, 4000);
  }
})();
(function handlePasswordToggle() {
  const toggleBtn = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");

  if (!toggleBtn || !passwordInput) return;

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.textContent = isPassword ? "🙈" : "👁";
  });
})();
(function cardTiltEffect() {
  const card = document.querySelector(".auth-card");
  if (!card) return;

  const strength = 12;

  card.addEventListener("mousemove", (e) => {
    const bounds = card.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const rotateY = ((x - bounds.width / 2) / bounds.width) * strength;
    const rotateX = -((y - bounds.height / 2) / bounds.height) * strength;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0) scale(1)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
})();
