# Portfolio Website

A modern, minimal portfolio website showcasing web development projects.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles, CSS variables, Flexbox/Grid
- **Vanilla JavaScript** - No frameworks or libraries

## Current Goals

1. **Build responsive navigation** - Mobile hamburger menu, desktop horizontal nav, smooth scroll to sections
2. **Create animated hero section** - Fade-in text, subtle motion effects, CTA button hover states
3. **Add projects grid** - Responsive card layout, hover animations, project links (GitHub/Live Demo)
4. **Build contact form** - Form validation, accessible inputs, integration-ready structure
5. **Implement dark mode** - Toggle button, CSS custom properties, localStorage persistence

## Design System

### Color Palette

```css
:root {
  /* Primary - Blue */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-light: rgba(59, 130, 246, 0.1);

  /* Secondary - Purple */
  --color-secondary: #8b5cf6;
  --color-secondary-hover: #7c3aed;
  --color-secondary-light: rgba(139, 92, 246, 0.1);

  /* Light Mode */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border: #e2e8f0;

  /* Dark Mode */
  --bg-primary-dark: #0f172a;
  --bg-secondary-dark: #1e293b;
  --text-primary-dark: #f1f5f9;
  --text-secondary-dark: #94a3b8;
  --border-dark: #334155;
}
```

### Spacing Scale (8px base)

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-1` | 0.25rem (4px) | Tight spacing |
| `--space-2` | 0.5rem (8px) | Base unit |
| `--space-3` | 0.75rem (12px) | Component gaps |
| `--space-4` | 1rem (16px) | Standard padding |
| `--space-5` | 1.25rem (20px) | Section spacing |
| `--space-6` | 1.5rem (24px) | Large gaps |
| `--space-8` | 2rem (32px) | Section padding |
| `--space-10` | 2.5rem (40px) | Major sections |
| `--space-12` | 3rem (48px) | Page margins |
| `--space-16` | 4rem (64px) | Hero sections |

### Typography Scale

```css
:root {
  /* Font Families */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Fira Code', 'Consolas', monospace;

  /* Font Sizes (fluid with clamp) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12-14px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);     /* 14-16px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);   /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);    /* 18-20px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);     /* 20-24px */
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);      /* 24-32px */
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);  /* 30-40px */
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);      /* 36-48px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Component Patterns

#### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
```

#### Cards
```html
<article class="card">
  <div class="card-image">...</div>
  <div class="card-content">
    <h3 class="card-title">...</h3>
    <p class="card-description">...</p>
    <a class="card-link" href="#">View Project</a>
  </div>
</article>
```

#### Navigation
```html
<nav class="navbar">
  <a class="logo" href="#">Name</a>
  <ul class="nav-links">
    <li><a href="#projects">Projects</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

#### Section Layout
```html
<section class="section">
  <div class="container">
    <h2 class="section-title">...</h2>
    <!-- Section content -->
  </div>
</section>
```

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (or split: base, layout, components)
├── js/
│   └── main.js         # All JavaScript
├── assets/
│   ├── images/         # Project screenshots, profile photo
│   └── icons/          # SVG icons
└── CLAUDE.md           # This file
```

## Coding Conventions

### HTML
- Semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- BEM-like naming for classes
- Accessibility: `alt` text, ARIA labels where needed

### CSS
- CSS custom properties for theming (colors, spacing)
- Mobile-first media queries
- No `!important` unless absolutely necessary
- Single class selectors preferred over nesting

### JavaScript
- ES6+ syntax (const/let, arrow functions, template literals)
- Modular functions, single responsibility
- Event delegation for dynamic content
- No inline event handlers

## Key Features

1. **Hero Section** - Name, title, brief intro, CTA
2. **Projects Grid** - Cards with screenshot, title, description, links
3. **About Section** - Skills, background
4. **Contact Section** - Email, social links
5. **Dark/Light Toggle** - Persisted preference (localStorage)
6. **Smooth Scrolling** - Navigation and anchor links

## Commands

```bash
# Open in browser (no build step required)
# Use Live Server extension or:
npx serve .
```

## Notes

- No build process or bundler required
- Optimize images before adding to `assets/`
- Test dark mode toggle persists across sessions
- Ensure WCAG 2.1 AA accessibility compliance
