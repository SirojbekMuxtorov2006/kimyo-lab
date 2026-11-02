# MOLARYA UZ — Route Architecture

All user-facing routes are wrapped in the `/[locale]` layout to provide localized URL handling for Uzbek (`uz` - default), Russian (`ru`), and English (`en`).

---

## 1. Public Marketing Website

| Route | Description | Rendering |
| :--- | :--- | :--- |
| `/` | Homepage (Hero, Lab, AI, Periodic, Pricing, FAQ) | RSC + Client Islands |
| `/about` | About Molarya, mission for Uzbekistan education | RSC |
| `/features` | Platform core features & technological capabilities | RSC |
| `/virtual-lab` | Virtual laboratory overview & interactive demos | RSC |
| `/chemistry` | Chemistry learning pathways & pedagogical methodology | RSC |
| `/periodic-table` | Interactive periodic table explorer | Client Viewport |
| `/molecules` | 3D molecular structure gallery | Dynamic 3D / 2D fallback |
| `/ai-tutor` | AI Chemistry Tutor capabilities & safety safeguards | RSC |
| `/courses` | Chemistry courses & interactive lessons catalog | RSC |
| `/courses/[slug]` | Individual course syllabus & module outline | RSC |
| `/for-teachers` | Teacher tools, classroom manager, and grading | RSC |
| `/for-schools` | Institutional school licenses & administrative hub | RSC |
| `/pricing` | Transparent pricing plans (Free, Premium, School) | RSC |
| `/contact` | Contact form & Tashkent educational support team | RSC + Client Form |
| `/faq` | Frequently asked questions & safety guidelines | RSC |
| `/privacy` | Privacy policy & data protection guarantees | RSC |
| `/terms` | Terms of service for educational usage | RSC |

---

## 2. Authentication Flows

| Route | Description | Status |
| :--- | :--- | :--- |
| `/login` | Email/password & Google SSO login screen | Prepared (Phase 1) |
| `/register` | Student/Teacher account onboarding form | Prepared (Phase 1) |
| `/forgot-password` | Password recovery request form | Prepared (Phase 1) |
| `/reset-password` | Token-based new password setup | Prepared (Phase 1) |
| `/verify-email` | OTP / token verification screen | Prepared (Phase 1) |

---

## 3. Student Application (`/app/*`) — Planned Phase 2/3/4

| Route | Description |
| :--- | :--- |
| `/app` | Student central dashboard & streak overview |
| `/app/profile` | Personal profile & academic bio |
| `/app/learning` | My learning journey & active modules |
| `/app/courses` | Enrolled courses |
| `/app/courses/[id]` | In-course interactive lesson reader |
| `/app/lab` | Virtual chemistry laboratory workspace |
| `/app/lab/[experimentId]` | Guided educational experiment simulation |
| `/app/ai-tutor` | Full-screen AI chemistry tutor chat session |
| `/app/periodic-table` | In-app periodic table reference tool |
| `/app/molecules` | In-app 3D molecule explorer and builder |
| `/app/quizzes` | Interactive practice quizzes and tests |
| `/app/assignments` | Teacher-assigned homework & lab reports |
| `/app/progress` | Learning analytics and competency radar |
| `/app/achievements` | Badges, honors, and certificates |
| `/app/settings` | Student preferences and notifications |

---

## 4. Teacher Application (`/teacher/*`) — Planned Phase 5

| Route | Description |
| :--- | :--- |
| `/teacher` | Teacher command center & class activity feed |
| `/teacher/classes` | Class management & roster creation |
| `/teacher/classes/[id]` | Individual class details & student performance |
| `/teacher/students` | Individual student diagnostic view |
| `/teacher/courses` | Course and lesson assignment publisher |
| `/teacher/assignments` | Lab homework creation and review |
| `/teacher/experiments` | Virtual lab scenario manager |
| `/teacher/quizzes` | Quiz constructor and auto-grader |
| `/teacher/analytics` | Grade-level mastery analytics |
| `/teacher/settings` | Teacher profile and notification settings |

---

## 5. School Application (`/school/*`) — Planned Phase 5

| Route | Description |
| :--- | :--- |
| `/school` | School institutional overview & license quota |
| `/school/teachers` | Teacher staff directory and license allocation |
| `/school/students` | Student enrollment and grade distribution |
| `/school/classes` | Grade-level class management |
| `/school/analytics` | School-wide science progress reports |
| `/school/subscription` | Institutional billing, seats, and contracts |

---

## 6. Administration Application (`/admin/*`) — Planned Phase 5

| Route | Description |
| :--- | :--- |
| `/admin` | Master system telemetry & active concurrent labs |
| `/admin/users` | User management & role-based permissions |
| `/admin/schools` | Institutional school onboarding |
| `/admin/courses` | Curriculum content approval pipeline |
| `/admin/experiments` | Laboratory experiment verification |
| `/admin/scientific-data` | IUPAC element & molecule catalog governance |
| `/admin/ai-usage` | LLM token usage, cost analytics, and rate limits |
| `/admin/subscriptions` | Subscription tier and payment monitoring |
| `/admin/audit-logs` | Security and access audit trails |
| `/admin/settings` | System-wide configuration switches |

