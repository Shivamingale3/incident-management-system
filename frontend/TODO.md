# Frontend Production-Grade Audit & Implementation Plan

## Current State Assessment

The frontend is a **freshly scaffolded Vite + React 19 + TypeScript + ShadCN/Tailwind v4** project with essentially no application code yet — just a bare `<div>App</div>`. The backend is an Express 5 + Prisma API with `/api/health` and `/api/dashboard` routes running on port 8000.

This is the ideal time to establish production-grade architecture **before** any feature code is written. The backend already has mature DX tooling (Prettier, ESLint strict, lint-staged, Husky), but the frontend is missing parity on nearly all of it.

---

## Audit Findings — Gaps to Close

### 1. 🏗️ Project Architecture & Folder Structure

**Current:** Flat `src/` with just `App.tsx`, `main.tsx`, `lib/utils.ts`
**Issue:** No scalable structure for components, pages, hooks, services, types, or constants.

### 2. 🔧 Developer Experience (DX) Tooling

**Current:** Only basic ESLint (recommended rules). No Prettier, no lint-staged for frontend, no `.editorconfig`, no `.env.example`.
**Issues:**

- Husky pre-commit hook only runs `cd backend && npx lint-staged` — **frontend is not linted on commit**
- No Prettier integration for consistent code style
- No `eslint-config-prettier` to avoid rule conflicts
- ESLint config is minimal — backend has strict type-checked rules, frontend only has `recommended`

### 3. 🛡️ TypeScript Strictness

**Current:** Missing `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
**Issue:** TypeScript won't catch null/undefined bugs, type-narrowing gaps, or optional property misuse — production-critical issues.

### 4. 🌐 Environment & Configuration Management

**Current:** No `.env` file, no environment variable validation, no API base URL configuration
**Issue:** API URL will be hardcoded, no env separation between dev/staging/production

### 5. 🔒 Security

**Current:** No CSP meta tags, no security headers guidance, `<link href="/src/index.css">` in `index.html` (dev-only, Vite handles this — but the explicit link tag is unnecessary/confusing)
**Issues:**

- No `referrerpolicy` or `X-Content-Type-Options` meta tags
- Stale Vite default assets (react.svg, vite.svg) still in `src/assets/`
- No input sanitization utilities prepared
- No CORS proxy configuration for dev

### 6. 🏎️ Performance & Optimization

**Current:** React Compiler (babel-plugin-react-compiler) is already configured ✅
**Issues:**

- No code-splitting / lazy loading setup
- No `React.Suspense` boundary patterns
- No image optimization pipeline
- No bundle analyzer configured

### 7. 📦 Componentization & Patterns

**Current:** No components directory, no established patterns
**Issues:**

- No component structure convention (barrel exports, co-located tests/stories)
- No error boundary component
- No global loading/suspense patterns
- No layout component architecture

### 8. 🔌 API Layer & State Management

**Current:** Nothing exists
**Issues:**

- No HTTP client (Axios/fetch wrapper) with interceptors, retry logic, or auth token injection
- No API service layer
- No shared types between API responses and UI
- No global error handling for API failures
- No caching strategy (TanStack Query recommended for this stack)

### 9. 🧭 Routing

**Current:** No router
**Issue:** An incident management system will need multiple pages (dashboard, incident list, incident detail, settings, etc.)

### 10. 📋 SEO & Accessibility

**Current:** Minimal — title tag exists but no meta description, no `<noscript>` fallback
**Issues:**

- Missing `<meta name="description">`
- Missing `<noscript>` tag
- No a11y linting plugin (eslint-plugin-jsx-a11y)

---

## Proposed Changes

Changes are grouped by component/concern and ordered by dependency (foundational infra first, then patterns).

---

### Component 1: DX Tooling & Code Quality

> [!IMPORTANT]
> This mirrors the backend's mature tooling and ensures both frontend and backend have consistent quality gates.

#### [NEW] [.prettierrc](file:///home/shiv/Projects/incident-management-system/frontend/.prettierrc)

- Mirror backend Prettier config for consistency across the monorepo

#### [NEW] [.prettierignore](file:///home/shiv/Projects/incident-management-system/frontend/.prettierignore)

- Ignore `dist/`, `node_modules/`, `components.json`, coverage reports

#### [NEW] [.editorconfig](file:///home/shiv/Projects/incident-management-system/frontend/.editorconfig)

- Mirror backend `.editorconfig` for consistent indentation/charset/newlines

#### [NEW] [.lintstagedrc](file:///home/shiv/Projects/incident-management-system/frontend/.lintstagedrc)

- Run `eslint --fix` and `prettier --write` on staged `.ts`/`.tsx` files
- Run `prettier --write` on staged `.json`/`.md`/`.css` files

#### [MODIFY] [pre-commit](file:///home/shiv/Projects/incident-management-system/.husky/pre-commit)

- Add `cd frontend && npx lint-staged` after the existing backend lint-staged command

#### [MODIFY] [eslint.config.js](file:///home/shiv/Projects/incident-management-system/frontend/eslint.config.js)

- Add `eslint-config-prettier` to disable conflicting rules
- Add `eslint-plugin-jsx-a11y` for accessibility linting
- Add stricter TypeScript rules mirroring backend: `no-explicit-any`, `consistent-type-imports`, `no-floating-promises`, `no-unused-vars` with `_` pattern
- Add `no-console` rule (use a proper logger or controlled debug utility)

#### [MODIFY] [package.json](file:///home/shiv/Projects/incident-management-system/frontend/package.json)

- Add scripts: `lint:fix`, `format`, `format:check`, `typecheck`, `check` (mirrors backend)
- Add devDependencies: `prettier`, `eslint-config-prettier`, `eslint-plugin-jsx-a11y`, `lint-staged`

---

### Component 2: TypeScript Strictness

#### [MODIFY] [tsconfig.app.json](file:///home/shiv/Projects/incident-management-system/frontend/tsconfig.app.json)

- Add `"strict": true` (enables `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict`)
- Add `"noUncheckedIndexedAccess": true` — forces null checks on array/object index access
- Add `"forceConsistentCasingInFileNames": true`
- Add `"DOM.Iterable"` to `lib` for `for...of` on DOM collections

---

### Component 3: Environment & Configuration

#### [NEW] [.env.example](file:///home/shiv/Projects/incident-management-system/frontend/.env.example)

- Document all required environment variables: `VITE_API_BASE_URL`

#### [NEW] [.env.development](file:///home/shiv/Projects/incident-management-system/frontend/.env.development)

- `VITE_API_BASE_URL=http://localhost:8000/api`

#### [NEW] [src/config/env.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/config/env.ts)

- Zod-validated environment variables (mirrors backend pattern with `envSchema.parse()`)
- Type-safe access to all VITE\_ prefixed env vars
- Throws at startup if required vars are missing (fail-fast)

#### [NEW] [src/config/constants.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/config/constants.ts)

- App-wide constants: app name, pagination defaults, date formats, etc.

#### [MODIFY] [.gitignore](file:///home/shiv/Projects/incident-management-system/frontend/.gitignore)

- Add `.env` and `.env.local` (keep `.env.example` and `.env.development` tracked)

---

### Component 4: Scalable Folder Structure

#### [NEW] Directory scaffolding

Create the following directory structure inside `src/`:

```
src/
├── components/          # Shared/reusable components
│   └── ui/              # ShadCN components (already aliased)
├── config/              # env.ts, constants.ts
├── features/            # Feature-based modules (each with own components, hooks, types)
│   └── dashboard/
├── hooks/               # Shared custom hooks (already aliased in components.json)
├── layouts/             # Layout components (DashboardLayout, AuthLayout)
├── lib/                 # Utilities (utils.ts already here)
├── pages/               # Route-level page components
├── providers/           # React context providers (theme, auth, query client)
├── services/            # API client and service functions
│   └── api/
└── types/               # Shared TypeScript types/interfaces
```

---

### Component 5: API Layer & HTTP Client

> [!IMPORTANT]
> This is the most architecture-critical piece. Every feature will depend on this.

#### [NEW] [src/services/api/client.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/services/api/client.ts)

- Type-safe fetch wrapper with:
  - Base URL from validated env config
  - Request/response interceptors (auth token injection, response normalization)
  - Centralized error handling with typed error responses
  - Request timeout support
  - CSRF protection headers
- Uses native `fetch` (no Axios — reduces bundle size, React 19 has native fetch integration)

#### [NEW] [src/services/api/types.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/services/api/types.ts)

- Shared API response types matching backend patterns (`{ success: boolean, message: string, data?: T }`)
- Error response types

#### [NEW] [src/services/dashboard.service.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/services/dashboard.service.ts)

- Example service demonstrating the pattern: typed functions calling the API client

---

### Component 6: Core Application Patterns

#### [NEW] [src/components/error-boundary.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/components/error-boundary.tsx)

- React error boundary with fallback UI
- Catches rendering errors, logs them, shows user-friendly message with retry button

#### [NEW] [src/providers/app-providers.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/providers/app-providers.tsx)

- Composes all providers: Theme, QueryClient, Error Boundary, etc.
- Single provider composition to keep `main.tsx` clean

#### [NEW] [src/providers/theme-provider.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/providers/theme-provider.tsx)

- System/light/dark theme provider with localStorage persistence
- Properly toggles the `.dark` class (ShadCN already has dark mode CSS vars)

#### [NEW] [src/hooks/use-theme.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/hooks/use-theme.ts)

- Hook to consume theme context

#### [MODIFY] [src/main.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/main.tsx)

- Wrap `<App />` with `<AppProviders>`

#### [MODIFY] [src/App.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/App.tsx)

- Set up React Router with lazy-loaded routes
- Add `Suspense` boundary with loading fallback

---

### Component 7: Security Hardening

#### [MODIFY] [index.html](file:///home/shiv/Projects/incident-management-system/frontend/index.html)

- Remove the manual `<link href="/src/index.css">` (Vite handles CSS injection via `main.tsx` import)
- Add `<meta name="description">` for SEO
- Add `<noscript>` fallback message
- Add `<meta name="referrer" content="strict-origin-when-cross-origin">`

#### [MODIFY] [vite.config.ts](file:///home/shiv/Projects/incident-management-system/frontend/vite.config.ts)

- Add dev server proxy: `/api` → `http://localhost:8000/api` (avoids CORS issues in development, simulates production reverse-proxy)
- Add `build.sourcemap: false` for production (prevents source code exposure)
- Add `build.target: 'es2020'` for modern browser baseline

#### [NEW] [src/lib/sanitize.ts](file:///home/shiv/Projects/incident-management-system/frontend/src/lib/sanitize.ts)

- Utility for sanitizing user-generated content before rendering (prevents XSS)

---

### Component 8: Performance Optimization

#### [MODIFY] [vite.config.ts](file:///home/shiv/Projects/incident-management-system/frontend/vite.config.ts)

- Configure chunk splitting strategy: vendor chunk for `react`/`react-dom`, separate chunk for ShadCN/Radix UI
- Configure `rollupOptions.output.manualChunks` for optimal caching

#### [NEW] [src/components/lazy-import.tsx](file:///home/shiv/Projects/incident-management-system/frontend/src/components/lazy-import.tsx)

- Higher-order utility for `React.lazy()` + `Suspense` with typed loading/error states

---

### Component 9: Cleanup

#### [DELETE] [src/assets/react.svg](file:///home/shiv/Projects/incident-management-system/frontend/src/assets/react.svg)

- Vite scaffold leftover — unused

#### [DELETE] [src/assets/vite.svg](file:///home/shiv/Projects/incident-management-system/frontend/src/assets/vite.svg)

- Vite scaffold leftover — unused

---

## Open Questions

> [!IMPORTANT]
> **Routing library:** React Router v7 is the standard. Should I set it up, or do you plan to use TanStack Router instead?

> [!IMPORTANT]
> **State management / data fetching:** I strongly recommend TanStack Query (React Query) for server-state management (caching, refetching, optimistic updates). Should I include it, or do you prefer a different approach (SWR, plain useEffect)?

> [!IMPORTANT]
> **Zod in frontend:** The backend already uses Zod v4 for validation. Should I add Zod to the frontend too for form validation and env parsing? This enables schema sharing between frontend and backend in the future.

> [!NOTE]
> **Testing framework:** This audit focuses on architecture, not testing setup. Do you want me to also set up Vitest + React Testing Library + Playwright as a follow-up?

> [!NOTE]
> **CI/CD pipeline:** Should I create a GitHub Actions workflow for the frontend (lint, typecheck, build, test) as part of this effort?

---

## Verification Plan

### Automated Checks

```bash
# TypeScript compiles cleanly with strict mode
npm run typecheck

# ESLint passes with new strict rules
npm run lint

# Prettier formatting is consistent
npm run format:check

# Production build succeeds with no warnings
npm run build

# Dev server starts without errors
npm run dev
```

### Manual Verification

- Confirm Husky pre-commit hook now lints both frontend and backend
- Verify Vite dev proxy correctly forwards `/api/*` to backend on port 8000
- Verify theme toggle works (light/dark/system)
- Verify environment validation fails fast with helpful error when `VITE_API_BASE_URL` is missing
- Verify error boundary catches and displays rendering errors gracefully
