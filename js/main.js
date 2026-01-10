console.log("JS connected");

// Dark mode
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Mobile menu
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Footer year
document.getElementById("current-year").textContent =
  new Date().getFullYear();
const skillCards = document.querySelectorAll(".skill-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const percent = card.getAttribute("data-percent");
      const bar = card.querySelector(".level-progress");

      bar.style.width = percent + "%";
      bar.textContent = percent + "%";

      observer.unobserve(card);
    }
  });
}, { threshold: 0.5 });

skillCards.forEach(card => observer.observe(card));
