# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- Framework: Next.js 14 (App Router) with TypeScript
- UI: Material UI (MUI) + TailwindCSS
- State: Local React state/hooks; no global state library
- API: Axios client wrapper with auth token auto-injection (src/services/api.ts, src/services/auth.ts)
- App location: src/app

Common commands
- Install dependencies (recommended on this repo):
  - npm ci
  - Alternative: npm install
- Start dev server:
  - npm run dev
- Build for production:
  - npm run build
- Run production server (after build):
  - npm start
- Lint (StandardJS):
  - npm run lint
- Tests:
  - No test script is defined in package.json. There is no configured test runner in this repo as of now.

Environment and configuration
- API base URL: NEXT_PUBLIC_API_URL
  - Used in src/services/api.ts as the Axios baseURL.
  - Default if unset: https://localhost:44311/api/1
- Windows PowerShell example to run with a custom API URL for a single session:
  - $env:NEXT_PUBLIC_API_URL = 'https://your-api.example.com/api/1'; npm run dev

High-level architecture
- App Router (src/app): Top-level routes are implemented as directories under src/app with page.tsx files. Notable routes:
  - / (landing): src/app/page.tsx renders Header, MainSection, Footer
  - /login: src/app/login/page.tsx; performs authentication via services/auth.ts and stores JWT in localStorage, then navigates to /inicio
  - /inicio: src/app/inicio/page.tsx; fetches patients from GET /Paciente/Resumen using api.ts; includes SearchBar and PatientList with client-side filtering and MUI Table + pagination
  - /registerUser: src/app/registerUser/page.tsx; multi-section form for patient data with local component state
  - /calendar: src/app/calendar/page.tsx; local in-memory scheduling grid with modal editor; no backend persistence
- Layout: src/app/layout.tsx defines the root HTML/body wrapper and metadata
- Components:
  - src/app/components/* contains presentational components (Header, Footer, MainSection) and UI fragments (Sidebar, confirmation dialog)
  - Sidebar (src/app/components/sideBar/Sidebar.tsx) drives navigation across main sections using next/navigation
  - Confirmation dialog (src/app/components/confirmationDialogs/deletePatientDialog.tsx) used by PatientList
- Styling:
  - Tailwind configured via tailwind.config.ts and postcss.config.mjs
  - Additional global and page styles in src/public/Styles/*.css (e.g., globals.css, login.css)
- Services:
  - src/services/api.ts: Axios instance with baseURL from NEXT_PUBLIC_API_URL; request interceptor adds Authorization: Bearer <token> from localStorage in browser contexts
  - src/services/auth.ts: login(email, password) -> POST /Login/authenticate; returns response.data or throws parsed error

Conventions and notes
- TypeScript path alias: @/* -> ./src/* (configured in tsconfig.json). Example: import { login } from '@/services/auth'
- Client-only code: Components that access window/localStorage (e.g., login page, api.ts interceptor usage) are marked with 'use client'
- Linting: package.json scripts use standard; TypeScript files may not be fully covered by StandardJS out of the box

Key files
- package.json: scripts (dev, build, start, lint)
- next.config.mjs: reactStrictMode enabled
- tsconfig.json: strict, bundler resolution; paths alias @/* to src/*
- tailwind.config.ts, postcss.config.mjs: Tailwind setup
- README.md: Basic Next.js usage (dev server on http://localhost:3000) and brief login note

Quick start
- npm ci
- npm run dev
- Open http://localhost:3000

Troubleshooting
- If authenticated API calls fail with 401, verify that:
  - NEXT_PUBLIC_API_URL points to the correct backend
  - localStorage contains a valid 'token' (set upon successful login)
- If styles are missing, ensure src/public/Styles/globals.css and other CSS imports exist and paths are correct in components/pages.

