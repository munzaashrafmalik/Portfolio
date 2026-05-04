/**
 * Portfolio Website - Main JavaScript
 * Handles: Navigation, Dark Mode, Form Validation, Smooth Scroll
 */

'use strict';

// ==================================
// DOM Elements
// ==================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const viewToggle = document.querySelector('.view-toggle');
const viewIcon = document.querySelector('.view-icon');
const contactForm = document.querySelector('.contact-form');
const navLinksItems = document.querySelectorAll('.nav-links a');

// ==================================
// Mobile Navigation
// ==================================
function toggleNav() {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('active');
}

navToggle?.addEventListener('click', toggleNav);

// Close mobile nav when clicking a link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('active');
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
    navToggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('active');
  }
});

// ==================================
// Dark Mode
// ==================================
const THEME_KEY = 'portfolio-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === DARK_THEME ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(newTheme);
}

// Initialize theme on load
setTheme(getPreferredTheme());

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
  }
});

themeToggle?.addEventListener('click', toggleTheme);

// ==================================
// View Mode Toggle (Mobile/Desktop)
// ==================================
const VIEW_KEY = 'portfolio-view';
const MOBILE_VIEW = 'mobile';
const DESKTOP_VIEW = 'desktop';

function getPreferredView() {
  const savedView = localStorage.getItem(VIEW_KEY);
  return savedView || null;
}

function setView(view) {
  if (view === null) {
    document.documentElement.removeAttribute('data-view');
    if (viewIcon) viewIcon.className = 'fas fa-desktop view-icon';
    localStorage.removeItem(VIEW_KEY);
  } else {
    document.documentElement.setAttribute('data-view', view);
    if (viewIcon) {
      viewIcon.className = view === MOBILE_VIEW ? 'fas fa-desktop view-icon' : 'fas fa-mobile-alt view-icon';
    }
    localStorage.setItem(VIEW_KEY, view);
  }
}

function toggleView() {
  const currentView = document.documentElement.getAttribute('data-view');
  console.log('Current view:', currentView);

  if (currentView === null) {
    console.log('Switching to MOBILE view');
    setView(MOBILE_VIEW);
  } else if (currentView === MOBILE_VIEW) {
    console.log('Switching to DESKTOP view');
    setView(DESKTOP_VIEW);
  } else {
    console.log('Switching to AUTO view');
    setView(null);
  }

  console.log('New view:', document.documentElement.getAttribute('data-view'));
}

// Initialize view on load
const savedView = getPreferredView();
if (savedView) {
  setView(savedView);
}

viewToggle?.addEventListener('click', toggleView);

// ==================================
// Smooth Scroll for Anchor Links
// ==================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================================
// Form Validation
// ==================================
const formInputs = contactForm?.querySelectorAll('.form-input');
const formErrorElements = contactForm?.querySelectorAll('.form-error');
const formSuccessElement = contactForm?.querySelector('.form-success');

function showError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove('error');
  errorElement.textContent = '';
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm(e) {
  e.preventDefault();
  let isValid = true;

  // Validate Name
  const nameInput = document.getElementById('name');
  const nameError = nameInput?.parentElement?.querySelector('.form-error');
  if (!nameInput?.value.trim()) {
    showError(nameInput, nameError, 'Name is required');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Validate Email
  const emailInput = document.getElementById('email');
  const emailError = emailInput?.parentElement?.querySelector('.form-error');
  if (!emailInput?.value.trim()) {
    showError(emailInput, emailError, 'Email is required');
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Validate Message
  const messageInput = document.getElementById('message');
  const messageError = messageInput?.parentElement?.querySelector('.form-error');
  if (!messageInput?.value.trim()) {
    showError(messageInput, messageError, 'Message is required');
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (isValid) {
    // Form is valid - show success message
    // In production, you would submit the form data here
    if (formSuccessElement) {
      formSuccessElement.textContent = 'Thank you! Your message has been sent.';
    }
    contactForm?.reset();
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      if (formSuccessElement) {
        formSuccessElement.textContent = '';
      }
    }, 5000);
  }
}

// Clear errors on input
formInputs?.forEach(input => {
  input.addEventListener('input', function() {
    const errorElement = this.parentElement?.querySelector('.form-error');
    clearError(this, errorElement);
  });
});

contactForm?.addEventListener('submit', validateForm);

// ==================================
// Scroll Animation Observer
// ==================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe project cards for animation
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe testimonial cards for animation
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// ==================================
// Active Navigation Link on Scroll
// ==================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ==================================
// Header Shadow on Scroll
// ==================================
const navbar = document.querySelector('.navbar');

function toggleHeaderShadow() {
  if (window.scrollY > 50) {
    navbar?.style.setProperty('box-shadow', 'var(--shadow-md)');
  } else {
    navbar?.style.setProperty('box-shadow', 'none');
  }
}

window.addEventListener('scroll', toggleHeaderShadow);

// ==================================
// Initialize
// ==================================
document.addEventListener('DOMContentLoaded', () => {
  highlightNavLink();
  toggleHeaderShadow();

  // Debug: Show screen width
  const screenWidthEl = document.getElementById('screen-width');
  if (screenWidthEl) {
    function updateScreenWidth() {
      screenWidthEl.textContent = window.innerWidth;
    }
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
  }
});
