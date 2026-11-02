# MOLARYA UZ — Frontend Development Roadmap

This document outlines the phased execution plan for building the complete MOLARYA UZ platform.

---

## Phase Overview

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     PHASE 1      │ ──> │     PHASE 2      │ ──> │     PHASE 3      │
│  Design System,  │     │  Authentication, │     │  Virtual Lab &   │
│  Homepage & i18n │     │ Student Dashboard│     │  AI Chemistry    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │
         ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     PHASE 4      │ ──> │     PHASE 5      │ ──> │     PHASE 6      │
│ Periodic Table & │     │  Teacher, School │     │  API Integration │
│ 3D Molecule Lab  │     │  & Admin Suites  │     │  & Optimization  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

---

## Phase 1: Core Foundation & Public Website (CURRENT FOCUS)
- [x] Repository inspection & architecture baseline
- [x] Strict TypeScript configuration & Next.js 16 setup
- [x] Tailwind CSS v4 design token configuration
- [x] shadcn/ui components (Button, Input, Select, Dialog, Sheet, Tabs, Card, Badge, Avatar, Skeleton, Separator, Tooltip, Form)
- [x] Design system documentation (`DESIGN_SYSTEM.md`)
- [x] Architectural documentation (`FRONTEND_ARCHITECTURE.md`, `FRONTEND_ROADMAP.md`, `ROUTES.md`, `API_INTEGRATION.md`)
- [x] Full trilingual internationalization (Uzbek Latin default, Russian, English)
- [x] Responsive Public Header with mobile navigation drawer, language switcher, and theme toggle
- [x] Complete Public Footer with newsletter subscription, legal links, and brand identity
- [x] Premium Hero Section with original 3D-inspired interactive chemical visualization
- [x] Complete Homepage sections:
  1. Hero section with interactive scientific visual
  2. Platform statistics
  3. Main platform features
  4. Virtual laboratory preview
  5. AI tutor interactive simulation preview
  6. 3D molecular visualization showcase
  7. Interactive periodic table preview
  8. How it works (step-by-step learning loop)
  9. Student benefits
  10. Teacher benefits & classroom analytics teaser
  11. School & institutional solutions
  12. Testimonials (clearly marked educational sample reviews)
  13. Flexible pricing tiers (Free, Premium, School)
  14. Comprehensive FAQ accordion
  15. High-converting CTA banner
  16. Public Footer
- [x] Verification: zero TypeScript errors, clean ESLint pass, successful production build.

---

## Phase 2: Authentication & Student Dashboard
- [ ] Authentication flows: Login, Register, Forgot Password, Reset Password, Email Verification
- [ ] Session storage and role-based redirect guards
- [ ] Student dashboard `/app`:
  - Welcome greeting & streak counter
  - Weekly learning progress charts (Recharts)
  - Active enrolled courses & upcoming deadlines
  - Recent virtual lab experiments & quiz performances
  - Achievements and badges showcase

---

## Phase 3: Virtual Chemistry Laboratory & AI Chemistry Tutor
- [ ] Virtual Laboratory `/app/lab`:
  - Left sidebar: Reagent shelf, glassware apparatus, burner/stirrer controls
  - Center canvas: Drag-and-drop experiment workbench with step reaction simulations
  - Right sidebar: Educational reaction dynamics, observation notes, safety notices
  - Strict educational verification (safe simulated scenarios, clear simulation disclaimers)
- [ ] AI Chemistry Tutor `/app/ai-tutor`:
  - Streaming markdown responses with KaTeX chemical formula rendering
  - Preset educational prompts for Uzbek, Russian, and English
  - Conversation persistence & feedback controls

---

## Phase 4: Interactive Periodic Table & 3D Molecule Explorer
- [ ] Periodic Table `/app/periodic-table`:
  - 118 IUPAC elements with physical/chemical properties
  - Filter by category, phase at STP, block, and electron configuration
  - Multilingual element drawer with detailed isotopes and history
- [ ] 3D Molecule Explorer `/app/molecules`:
  - WebGL Three.js / React Three Fiber interactive viewport
  - Rotation, pan, zoom, ball-and-stick and space-filling representations
  - High-performance SVG fallback for devices without WebGL support

---

## Phase 5: Teacher, School & Admin Management Suites
- [ ] Teacher Dashboard `/teacher`: Class rosters, assignment builder, grading pipeline, analytics
- [ ] School Dashboard `/school`: Teacher and student provisioning, seat licensing, institutional metrics
- [ ] Admin Dashboard `/admin`: Platform telemetry, audit logs, AI token consumption, content curation

---

## Phase 6: Production Backend Integration & Hardening
- [ ] Connect FastAPI backend microservices via centralized API client
- [ ] Token refresh interceptor & rate-limit error handlers
- [ ] End-to-end testing with Vitest and Playwright
- [ ] Performance audit for 95+ Google Lighthouse scores across Core Web Vitals

