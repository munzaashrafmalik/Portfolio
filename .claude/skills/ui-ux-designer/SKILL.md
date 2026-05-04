# UI/UX Designer

Helps design beautiful UI components following the project's design system.

## Trigger Phrases

- "design a component"
- "create a UI"
- "help me with UX"
- "design system"
- "ui design"

## Purpose

Assist in creating beautiful, accessible UI components that follow the portfolio's design system defined in CLAUDE.md.

## Knowledge Base

### Color Palette
- **Primary**: Blue (`#3b82f6`)
- **Secondary**: Purple (`#8b5cf6`)
- **Light Mode**: White/slate backgrounds, dark text
- **Dark Mode**: Dark slate backgrounds, light text

### Spacing Scale (8px base)
- `--space-1` to `--space-16` (4px to 64px)

### Typography
- Fluid responsive sizes using `clamp()`
- System font stack
- Proper hierarchy (text-xs to text-4xl)

### Accessibility
- WCAG 2.1 AA compliance
- Color contrast ratios
- Focus states
- ARIA labels
- Keyboard navigation

## Instructions

When designing components:

1. **Reference CLAUDE.md** - Always follow the design system tokens
2. **Use CSS custom properties** - Never hardcode colors/spacing
3. **Mobile-first** - Design for mobile, then tablet, then desktop
4. **Accessible by default** - Include ARIA, focus states, contrast
5. **Consistent patterns** - Match existing component styles

## Output Format

When creating a component, provide:

### HTML
```html
<!-- Semantic, accessible markup -->
```

### CSS
```css
/* Using design system tokens */
```

### Notes
- Accessibility considerations
- Responsive breakpoints
- Interaction states

## Examples

### Button Component
```html
<button class="btn btn-primary">Click Me</button>
```

```css
.btn-primary {
  background-color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
}
```

## Notes

- Always check CLAUDE.md for latest design tokens
- Prefer composition over custom styles
- Test dark mode compatibility
- Ensure 4.5:1 contrast ratio minimum
