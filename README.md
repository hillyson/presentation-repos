# Presentation Repos

A monorepo platform for hosting independent static presentation websites, deployed via GitHub Pages.

## Structure

```
presentation-repos/
├── packages/               # Shared packages (design tokens, utilities)
├── sites/                  # Independent sub-sites
│   └── jarvis/             # Jarvis AI Engineering Platform
├── docs/
│   └── DESIGN_STANDARDS.md # Platform-wide design rules
└── .github/workflows/      # Automated deployment
```

## Live Sites

| Site | URL | Status |
|------|-----|--------|
| Jarvis | [hillyson.github.io/presentation-repos/jarvis](https://hillyson.github.io/presentation-repos/jarvis/) | ✅ |

## Local Development

```bash
# Install dependencies
pnpm install

# Dev server for Jarvis site
pnpm dev:jarvis

# Build all sites
pnpm build
```

## Adding a New Site

1. Create `sites/<your-site>/` as a new Astro project
2. Set `base: '/presentation-repos/<your-site>'` in `astro.config.mjs`
3. Add build step to `.github/workflows/deploy.yml`
4. Follow conventions in `docs/DESIGN_STANDARDS.md`

## Design Standards

See [docs/DESIGN_STANDARDS.md](docs/DESIGN_STANDARDS.md) for color palette, typography, animation, and component conventions.

## Deployment

Automatic via GitHub Actions on push to `main`. Deploys to `gh-pages` branch.
