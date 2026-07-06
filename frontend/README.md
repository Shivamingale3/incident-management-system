# Frontend — Incident Management System

React 19 + TypeScript + Vite 8 SPA built with Tailwind CSS 4, Shadcn/Radix UI, TanStack Query, and react-hook-form.

> Full project documentation, architecture details, and setup instructions are in the [root README](../README.md).

---

## Scripts

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start Vite dev server (http://localhost:5173) |
| `npm run build`         | TypeScript check + production build           |
| `npm run preview`       | Preview production build locally              |
| `npm run lint`          | Run ESLint                                    |
| `npm run test`          | Run Vitest (jsdom)                            |
| `npm run test:watch`    | Run Vitest in watch mode                      |
| `npm run test:coverage` | Run Vitest with V8 coverage report            |

## Tech Stack

- **React 19** with TypeScript 6 and React Compiler (babel-plugin-react-compiler)
- **Vite 8** with `@vitejs/plugin-react`
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **Shadcn** / Radix UI primitives
- **TanStack Query 5** for server-state management
- **react-hook-form 7** + Zod 4 for form validation
- **TipTap** for rich-text incident descriptions
- **Axios** for HTTP requests
- **Sonner** for toast notifications
- **Vitest** + React Testing Library for tests
- **DOMPurify** for HTML sanitisation (defense-in-depth on readOnly render)
