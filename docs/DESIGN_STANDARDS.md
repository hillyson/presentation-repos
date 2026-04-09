# Design Standards

Platform-wide design system for all sites in `presentation-repos`.

---

## Visual Identity

### Dark Tech Theme (Default)

All sites use the **dark tech** theme unless a site explicitly documents a different choice.

```
Philosophy: Clean, intentional, premium — content-first
Mood: Deep space, precision tooling, AI-native
Reference: Vercel, Linear, Tailwind CSS docs
```

---

## Color Palette

### Background

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-900` | `#0a0a0f` | Page background |
| `--bg-800` | `#0f0f1a` | Section alternates |
| `--bg-700` | `#13131f` | Elevated surfaces |
| `--bg-card` | `rgba(255,255,255,0.04)` | Card backgrounds |
| `--bg-card-hover` | `rgba(255,255,255,0.07)` | Card hover state |

### Brand

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#6366f1` | Primary actions, headings |
| `--primary-light` | `#818cf8` | Hover states |
| `--secondary` | `#8b5cf6` | Secondary elements |
| `--accent` | `#22d3ee` | Highlights, icons |
| `--accent-green` | `#34d399` | Success, completed states |
| `--accent-amber` | `#fbbf24` | Warning, in-progress |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#f1f5f9` | Main content |
| `--text-secondary` | `#94a3b8` | Descriptions, metadata |
| `--text-muted` | `#475569` | Placeholders, disabled |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `rgba(99,102,241,0.12)` | Default borders |
| `--border-hover` | `rgba(99,102,241,0.35)` | Hover borders |
| `--border-accent` | `rgba(34,211,238,0.25)` | Accent borders |

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Scale

| Level | Size | Weight | Line-height |
|-------|------|--------|-------------|
| Display | `clamp(3rem, 7vw, 5.5rem)` | 800 | 1.05 |
| H1 | `clamp(2rem, 4vw, 3rem)` | 700 | 1.1 |
| H2 | `clamp(1.5rem, 3vw, 2rem)` | 600 | 1.2 |
| H3 | `1.25rem` | 600 | 1.3 |
| Body | `1rem` | 400 | 1.7 |
| Small | `0.875rem` | 400 | 1.6 |
| Mono | `0.875rem` | 400 | 1.6 |

---

## Spacing

Based on 8px grid:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

Section vertical padding: `--space-24` to `--space-32`.

---

## Layout

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 2rem);
}
```

### Grid

```css
/* Feature cards: 3-col on desktop */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* Architecture layers: single column stack */
display: flex;
flex-direction: column;
gap: var(--space-4);
```

---

## Components

### Card

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--space-6);
  transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
}
```

### Button Primary

```css
.btn-primary {
  background: var(--primary);
  color: white;
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
}
```

### Button Ghost

```css
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  transition: border-color 0.2s, color 0.2s;
}

.btn-ghost:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}
```

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: var(--primary-light);
}
```

---

## Animation

### Scroll Reveal (required on all content sections)

Apply `data-animate` attribute to elements that should animate on scroll.

```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

[data-animate][data-delay="1"] { transition-delay: 0.1s; }
[data-animate][data-delay="2"] { transition-delay: 0.2s; }
[data-animate][data-delay="3"] { transition-delay: 0.3s; }
```

JavaScript (add to Layout):
```js
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.1 }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Hover Transitions

- Duration: `0.2s` for colors, `0.2s` for transforms
- Easing: `ease` for most, `cubic-bezier(0.34, 1.56, 0.64, 1)` for playful lifts

### Background Orbs

Decorative blurred color orbs using `position: fixed` with very low opacity (0.06–0.12). Should not affect readability.

---

## Background Texture

### Grid Lines

```css
.bg-grid {
  background-image: linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
```

### Gradient Section Dividers

Use subtle top/bottom gradients to transition between sections:
```css
background: linear-gradient(to bottom, var(--bg-900), var(--bg-800), var(--bg-900));
```

---

## Navigation

- Fixed top position
- Height: `60px`
- Background: `rgba(10, 10, 15, 0.8)` with `backdrop-filter: blur(12px)`
- Becomes fully opaque on scroll
- Logo left, links center/right, CTA rightmost

---

## Responsive Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `< 640px` | Single column, reduced font sizes |
| Tablet | `640px–1023px` | 2-column grids |
| Desktop | `≥ 1024px` | Full multi-column layouts |

Mobile-first CSS: write base styles for mobile, then `@media (min-width: ...)` for larger.

---

## Site Conventions

Each site in `sites/<name>/` must:

1. Have its own `astro.config.mjs` with `base: '/presentation-repos/<name>'`
2. Import design tokens from `packages/design-tokens` (or define locally following this doc)
3. Have a `README.md` describing the site's content and update process
4. Follow the scroll animation pattern from this document
5. Be responsive (test at 375px, 768px, 1280px)

---

## Anti-Patterns

- ❌ Inline styles for colors (use CSS custom properties)
- ❌ Position absolute for layout (use flexbox/grid)
- ❌ Animations with `display: none` transitions (use opacity + visibility)
- ❌ Font weights not in the approved scale
- ❌ Images without `width`/`height` attributes (causes layout shift)
- ❌ Non-semantic HTML (`div` soup, missing landmark elements)
