// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    navToggle?.classList.remove('active');
  });
});

// ===== DARK MODE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required');
      valid = false;
    }

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      showError(emailInput, 'Valid email is required');
      valid = false;
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required');
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      valid = false;
    }

    if (valid) {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// ===== HELPERS =====
function showError(input, message) {
  input.classList.add('error');
  const div = document.createElement('div');
  div.className = 'error-message';
  div.textContent = message;
  input.after(div);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(e => e.remove());
  document.querySelectorAll('.error').forEach(i => i.classList.remove('error'));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

