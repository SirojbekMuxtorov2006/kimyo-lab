# MOLARYA UZ — Design System

## 1. Visual Direction & Brand Identity

**MOLARYA UZ** fuses **premium scientific SaaS** precision with **engaging EdTech warmth**. It represents modern scientific excellence for the educational ecosystem of Uzbekistan.

### Key Characteristics
- **Scientific Precision**: High contrast typography, clean laboratory grids, subtle glowing borders.
- **Micro-Interactions**: Smooth 60fps Framer Motion reveals, hover-elevated cards, responsive 3D molecular reactions.
- **Accessibility**: Full WCAG 2.1 AA compliance, accessible touch targets (min 44px), high contrast ratios, and `prefers-reduced-motion` support.

---

## 2. Color Palette & Tokens

### Light Theme
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Deep Navy (Brand)** | `#101D35` | Primary brand headers, hero text, dark accents |
| **Primary Blue** | `#2563EB` | Interactive buttons, active indicators, focus rings |
| **Cyan (Scientific)** | `#06B6D4` | Accent highlights, chemical bond glowing lines, badges |
| **Background** | `#F8FAFC` | Page background (slate-50) |
| **Surface** | `#FFFFFF` | Card backgrounds, elevated modal panels |
| **Text Primary** | `#172033` | Headings and high-contrast body text |
| **Muted Text** | `#64748B` | Secondary descriptions, captions, labels |
| **Border** | `#E2E8F0` | Subtle hairline dividers |

### Dark Theme
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **Background** | `#071120` | Deep interstellar slate / navy |
| **Surface / Card** | `#0E1B2E` | Elevated glass cards, modal containers |
| **Surface Raised** | `#13233B` | Floating sidebars and interactive widgets |
| **Primary Blue** | `#3B82F6` | Glow accents and primary CTA highlights |
| **Cyan** | `#22D3EE` | Scientific particle accents and active indicators |
| **Text Primary** | `#F8FAFC` | Bright crisp headings |
| **Muted Text** | `#94A3B8` | Subtle descriptions |
| **Border** | `#1E293B` | Dark mode panel dividers |

---

## 3. Typography

- **Display & Headings**: `Manrope`, sans-serif. Modern, geometric, scientific personality.
- **Body & Interface**: `Inter`, sans-serif. Ultra-legible at small screen sizes and dense data tables.
- **Formulas & Numeric Data**: `JetBrains Mono`, monospace. Chemical formulas, atomic numbers, coordinates.

---

## 4. Component Primitives

The design system incorporates modular shadcn/ui components customized with Molarya's scientific design language:

1. **Button**:
   - `default`: Deep primary blue with subtle gradient and shadow
   - `secondary`: Soft slate background with crisp border
   - `outline`: Border with glow on hover
   - `ghost`: Minimalist transparent interaction
   - `accent`: Electric cyan accent for interactive laboratory actions
2. **Badge**:
   - `default`, `secondary`, `outline`, `success`, `demo` (for sample educational data indicators)
3. **Card**:
   - Rounded 2xl / 3xl corners
   - Hairline borders with ambient light gradient
   - Soft hover lift (`translate-y-[-2px]`)
4. **Dialog & Sheet**:
   - Backdrop blur (`backdrop-blur-md`)
   - Centered modal or responsive sliding sheet for mobile navigation

---

## 5. Motion Guidelines

- Standard transition: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration)
- Hover lift: `duration-200 ease-out`
- Scroll reveal: `opacity: 0, y: 20` -> `opacity: 1, y: 0` with `viewport: { once: true }`
- Always honor `useReducedMotion()` from Framer Motion for users who prefer reduced motion.

