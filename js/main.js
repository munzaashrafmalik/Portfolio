console.log("JS connected");

// Dark Mode
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    themeBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// Mobile Menu
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Footer Year
const year = document.getElementById("current-year");
if (year) {
  year.textContent = new Date().getFullYear();
}
