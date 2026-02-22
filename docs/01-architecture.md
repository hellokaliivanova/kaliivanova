# Architecture

**Stack**: React v19, TypeScript, Vite, TailwindCSS.

## Directory Structure (SPA)
- `index.html`: Entry point.
- `index.tsx`: React root mount.
- `App.tsx`: Main logic, monolithic component structure, hardcoded project data.
- `types.ts`: TypeScript interfaces (`Project`).
- `vite.config.ts`: Vite & React plugin configuration.

## Implementation Patterns
- **Architecture**: Single Page Application (SPA). Components are currently unified in `App.tsx`.
- **State Management**: Local React Hooks (`useState`) for UI state (e.g., modal visibility). No global state management (Redux/Zustand) allowed unless complexity drastically increases.
- **Data Paradigm**: Single source of truth. Projects initialized dynamically from hardcoded `projects` const.
- **Build Output**: Static files exported to `dist/` via Vite.
