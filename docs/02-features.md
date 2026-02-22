# Features

*Rule: Update this document concisely when delivering new features.*

## 1. Dynamic Project Feed
**Status**: Done | **Scope**: `App.tsx`, `types.ts`
- Renders UI iteratively from `projects` array.
- Structure: Data header (Name, Category, Year) + Horizontal `snap-scroll` slider for media.

## 2. Deterministic Content Injection 
**Status**: Done | **Scope**: `App.tsx`
- Layout logic artificially forces the textual description block to always be the 4th item in the image slider via array slicing/reconstitution.

## 3. Dynamic Asset Resolution
**Status**: Done | **Scope**: `App.tsx`, `/images/`
- Powered by `import.meta.glob('/images/**/*.{...}', { eager: true })`.
- Auto-maps images to project `id`. Sorts alphanumerically. Generates remote placeholders if local folder is empty.

## 4. "About Me" Overlay
**Status**: Done | **Scope**: `App.tsx`
- Full-screen modal (`isAboutOpen` state). Uses `backdrop-blur` to separate foreground text from background data.
