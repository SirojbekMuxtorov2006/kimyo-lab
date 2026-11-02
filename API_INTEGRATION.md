# MOLARYA UZ — API Integration Architecture

## 1. Overview

The frontend communicates with a central backend service (FastAPI) through a typed, centralized API layer.

The base URL is configured via environment variable:
```env
NEXT_PUBLIC_API_URL=https://api.molarya.uz/v1
```

> **Security Rule**: Private server API keys, database credentials, and LLM secret tokens are NEVER exposed to client-side code or stored in `NEXT_PUBLIC_*` environment variables.

---

## 2. Centralized HTTP Client Architecture

All requests flow through `src/lib/api/client.ts`:

```
┌────────────────────────────────┐
│   Feature Service (e.g. Lab)   │
└───────────────┬────────────────┘
                │ Typed Request (Schema Validated)
                ▼
┌────────────────────────────────┐
│   Central API Client           │
│   - JWT Bearer Injection       │
│   - Locale Header (Accept-Lang)│
│   - Refresh Token Interceptor  │
│   - Exponential Backoff Retry  │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│   FastAPI Backend / Mock Layer │
└────────────────────────────────┘
```

---

## 3. Directory Layout for API Layer

```text
src/
├── lib/
│   └── api/
│       ├── client.ts       # Typed fetch wrapper with interceptors
│       ├── endpoints.ts    # Centralized endpoint constant dictionary
│       └── errors.ts       # Standardized API error hierarchy
└── features/
    ├── auth/api.ts         # Login, register, refresh, logout
    ├── users/api.ts        # User profile and settings
    ├── lab/api.ts          # Experiments, apparatus catalog, simulation steps
    ├── courses/api.ts      # Courses, syllabus, lesson progress
    ├── chemistry/api.ts    # Elements, molecular structure coordinates
    ├── ai/api.ts           # AI tutor chat session & streaming endpoints
    ├── teachers/api.ts     # Class rosters, student grade submissions
    ├── schools/api.ts      # School accounts and licenses
    └── admin/api.ts        # Admin telemetry and audit endpoints
```

---

## 4. Development & Mock Adapter Strategy

During Phase 1 & 2 development prior to production backend cutover:
1. Each feature exposes a type-safe contract interface (e.g., `CourseService`, `LabService`).
2. An adapter implements this interface using static verified educational datasets (`src/data/*`).
3. Demo or sample states are clearly badged in the user interface (`Badge variant="demo"`).
4. Switching to the live FastAPI backend requires only toggling the provider implementation in the feature API export without modifying UI components.

