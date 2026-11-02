# MOLARYA UZ — Frontend Architecture

## 1. System Overview

**MOLARYA UZ** is an AI-powered virtual chemistry laboratory and EdTech SaaS platform tailored for the educational ecosystem of Uzbekistan (secondary schools, academic lyceums, vocational colleges, universities, teachers, and independent learners).

The architecture is built on **Next.js 16 (App Router)** with **React 19**, **TypeScript** (strict mode), **Tailwind CSS v4**, **shadcn/ui**, **Framer Motion**, **Three.js / React Three Fiber**, **TanStack Query v5**, and **next-intl**.

```
                           ┌──────────────────────────────┐
                           │      MOLARYA UZ PLATFORM     │
                           └──────────────┬───────────────┘
                                          │
                  ┌───────────────────────┼────────────────────────┐
                  ▼                       ▼                        ▼
      ┌───────────────────────┐ ┌───────────────────┐  ┌───────────────────────┐
      │  Marketing & Public   │ │   Auth Surfaces   │  │ Authenticated Apps    │
      │  - Home, Lab Preview  │ │  - Login          │  │ - /app (Student)      │
      │  - Periodic Table     │ │  - Register       │  │ - /teacher (Teacher)  │
      │  - 3D Molecules       │ │  - Reset Password │  │ - /school (School)    │
      │  - Courses & About    │ │  - Verify Email   │  │ - /admin (Admin)      │
      └───────────────────────┘ └───────────────────┘  └───────────────────────┘
```

---

## 2. Architectural Principles

1. **Server Components by Default**:
   All page shells, layouts, SEO wrappers, and informational sections render as React Server Components (RSC) to maximize Core Web Vitals (LCP, INP, CLS) and minimize client bundle size.

2. **Client Components Only When Interactive**:
   Client directives (`"use client"`) are restricted strictly to interactive leaf components:
   - 3D Canvas viewers (`@react-three/fiber`, Three.js)
   - Interactive forms (`react-hook-form`, `zod`)
   - Interactive modals, sheet drawers, dropdown menus
   - State-driven animation containers (`framer-motion`)
   - Theme and locale toggles

3. **Feature-Sliced Architecture**:
   Domain logic is encapsulated inside `src/features/*`:
   - `features/laboratory`: Virtual lab state, drag-and-drop apparatus, chemical reactions engine
   - `features/molecules`: 3D molecular structures, geometry algorithms, fallback 2D projections
   - `features/periodic-table`: IUPAC element dataset, filter state, electron shell calculators
   - `features/ai-tutor`: Chat history, streaming message handlers, KaTeX formula renderers
   - `features/courses`: Curriculum modules, progress trackers, quizzes
   - `features/teachers`: Class rosters, assignment grading, real-time analytics
   - `features/schools`: Multi-tenant school telemetry, seat licensing, department metrics
   - `features/administration`: Audit logs, AI credit usage, role permissions, content governance

4. **Resilient 3D Molecular Engine**:
   - Heavy 3D rendering packages (`three`, `@react-three/fiber`, `@react-three/drei`) are loaded dynamically with Next.js `dynamic(..., { ssr: false })`.
   - Automatic fallback to an interactive SVG 2D ball-and-stick diagram when WebGL context initialization fails or is disabled by the client browser.

5. **Internationalization (i18n)**:
   - Locales: `uz` (Uzbek Latin - Default), `ru` (Russian), `en` (English).
   - Cookie and path-based locale routing via `next-intl` with prefix `as-needed` (`/` for default Uzbek, `/ru/...`, `/en/...`).
   - Zero hardcoded user-facing strings; all UI content is drawn from typed dictionaries (`messages/uz.json`, `messages/ru.json`, `messages/en.json`).

---

## 3. Directory Layout

```text
kimyo-lab/
├── messages/               # Internationalization dictionaries
│   ├── uz.json             # Uzbek Latin (primary default)
│   ├── ru.json             # Russian
│   └── en.json             # English
├── public/                 # Static assets, SVG icons, 3D assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── [locale]/       # Locale-scoped layout & routes
│   │   │   ├── (marketing)/# Public website (Home, About, Lab, etc.)
│   │   │   ├── (auth)/     # Authentication flows
│   │   │   ├── app/        # Student application & virtual lab
│   │   │   ├── teacher/    # Teacher dashboard & class manager
│   │   │   ├── school/     # School & institutional management
│   │   │   └── admin/      # Platform administration UI
│   │   ├── globals.css     # Tailwind v4 theme & CSS variable tokens
│   │   ├── robots.ts       # Dynamic robots.txt
│   │   └── sitemap.ts      # Dynamic sitemap
│   ├── components/
│   │   ├── auth/           # Login, Register, Forgot Password forms
│   │   ├── chemistry/      # 3D canvas, 2D fallback, periodic table widgets
│   │   ├── layout/         # Public header, footer, locale switcher, theme toggle
│   │   ├── marketing/      # Homepage sections (Hero, Stats, Lab preview, etc.)
│   │   ├── shared/         # Section headings, logo, empty/error/loading states
│   │   └── ui/             # shadcn/ui primitive design tokens (Button, Card, etc.)
│   ├── data/               # Verified scientific static datasets
│   │   ├── elements.ts     # IUPAC verified periodic table elements
│   │   ├── molecules.ts    # 3D molecular coordinates and bonds
│   │   └── courses.ts      # Curriculum syllabi
│   ├── features/           # Feature-based domain logic & API endpoints
│   ├── hooks/              # Custom React hooks (useMediaQuery, useDebounce)
│   ├── i18n/               # next-intl configuration & navigation helpers
│   ├── lib/
│   │   ├── api/            # Centralized API client & endpoint contracts
│   │   ├── constants/      # Site metadata, branding, configuration
│   │   └── utils.ts        # cn helper, formatters
│   ├── stores/             # Zustand stores (lab state, user session)
│   └── types/              # Global TypeScript interfaces & ambient types
├── next.config.ts          # Turbopack, headers, next-intl wrapper
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 4. State Management Strategy

1. **Server State**: Managed with **TanStack Query v5** (`@tanstack/react-query`). Handles cache invalidation, background refetching, pagination, and optimistic updates for student assignments and quiz submissions.
2. **Interactive Simulation State**: Managed with **Zustand**. Maintains virtual lab beaker contents, temperature, stirring speeds, reagent additions, and step verification without triggering full page re-renders.
3. **Form State**: Managed with **React Hook Form** and validated through **Zod** schemas with localized validation messages.
4. **Theme & Locale State**: `next-themes` with CSS class toggling and `next-intl` cookie-backed locale persistence.

