# AI Agent Guidelines

**CONTEXT**: Kalina Ivanova graphic design portfolio. Brutalist, minimalist.
**STACK**: React 19, TypeScript, Vite, TailwindCSS.
**LOCALE**: UI content is ES (Spanish). Docs/Comments/Logs MUST be EN (English).
**FORMAT**: Token-economical, dense, imperative.

## 1. Agent Best Practices & Workflows

**Pre-Execution (Planning)**
- **Audit First**: Always read relevant `/docs/` before proposing changes.
- **Do Not Over-Engineer**: If a feature can live in `App.tsx` cleanly, leave it. Extract to components ONLY if logic/DOM size severely degrades readability.
- **Dependency Minimization**: Rely on native browser APIs and standard React hooks (`useState`, `useEffect`, `useRef`). DO NOT add external libraries (e.g., framer-motion, zustand) unless explicitly requested.

**Execution (Coding)**
- **TypeScript Strictness**: Strictly type standard props/state. Export interfaces to `types.ts`. NO `any`.
- **Tailwind Strictness**: NO custom CSS classes or inline styles. Use Tailwind utility classes exclusively. 
- **DOM Manipulation**: Brutalist aesthetic relies heavily on pixel-perfect borders. Watch for `border collapse` and double borders (use `last:border-b-0` or `border-transparent` strategies).
- **Responsive Design**: Ensure mobile-first approach. Use `md:` prefixes defensively.

**Post-Execution (Verification)**
- **Doc Sync**: IMMEDIATELY append new features to `docs/02-features.md`.
- **Placeholder Fallbacks**: If adding media-heavy features, guarantee error-handlers/placeholders (like Placehold.co) if local assets are missing.

## 2. Core Directives

- **Styling**: Monochrome (black/white), `uppercase` font, `text-xs`/`text-sm`, `leading-tight`.
- **Data**: Read-only static array `projects` in `App.tsx`. 
- **Assets**: Vite's `import.meta.glob('/images/<id>/*')`.

## 3. Docs Reference

- [01. Architecture](docs/01-architecture.md): SPA patterns, state.
- [02. Features](docs/02-features.md): Changelog & capabilities.
- [03. Styling](docs/03-styling.md): Brutalist tokens.
