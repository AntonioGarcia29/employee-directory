# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Start mock API server (http://localhost:3001)
npm run mock

# Run both concurrently (two terminals)
npm run dev & npm run mock

# Build for production
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

There is no test suite configured yet.

## Architecture

This is a React 19 + TypeScript + Vite application for an employee directory. The project is in its early stages with the scaffolding in place but most features yet to be built.

### State Management
Redux Toolkit is used for global state. The store is in `src/store/store.ts` with empty reducers. Feature slices should be added in `src/features/<feature>/` and registered in the store.

### Feature-Based Structure
The intended architecture is feature-based under `src/features/`. Each feature should be self-contained (components, slices, hooks, types). Shared reusable components live in `src/shared/components/`.

### Mock API
`db.json` at the root defines the mock REST API served by json-server on port 3001. It contains two resources:
- `GET /employees` — 10 sample employees with fields: `id`, `firstName`, `lastName`, `email`, `position`, `department`, `startDate`, `status`
- `GET /departments` — 6 departments

json-server automatically provides full CRUD endpoints (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) for both resources.

### Key Libraries
- **Forms**: `react-hook-form` + `zod` (for schema validation via `@hookform/resolvers`)
- **Tables**: `@tanstack/react-table`
- **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin, no separate config file needed)

### TypeScript
Strict mode is enabled with `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly`. Use `verbatimModuleSyntax`, so import type assertions (`import type`) are required for type-only imports.

## Code Style

- Use comments sparingly. Only comment complex or non-obvious logic.

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- When creating a new RTK Query endpoint, always add proper TypeScript types for the response
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development