# Agent Guide for LNC Project

This document provides a comprehensive overview of the `lnc` project structure, technology stack, and development conventions to assist AI agents in navigating and modifying the codebase effectively.

## 1. Project Overview
- **Name**: `testgsap` (internal package name)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP (GreenSock Animation Platform)

## 2. Technology Stack
- **Core**: React 19, Next.js 16
- **Language**: TypeScript
- **Styling**: 
    - Tailwind CSS 4
    - `clsx` & `tailwind-merge` for class management
    - `tw-animate-css`
- **UI Components**: 
    - Radix UI primitives (`@radix-ui/react-slot`)
    - Lucide React icons
- **Animations**: 
    - GSAP (`@gsap/react`, `gsap`)
    - Lottie (`lottie-react`)
- **Linting**: ESLint

## 3. Project Structure
The project follows the Next.js App Router conventions.

### Key Directories
- **`/app`**: Main application logic, routes, and global styles.
    - `layout.tsx`: Root layout.
    - `page.tsx`: Home page.
    - `globals.css`: Global styles and Tailwind imports.
    - `components/`: Application-specific components (Warning: confusingly separate from root `/components`).
    - `data/`: Static data files.
    - `events/`, `projects/`: Likely feature-specific routes or data.
- **`/components`**: Shared UI components (configured alias target).
    - **`/ui`**: Shadcn UI / Generic UI components (standard location).
- **`/lib`**: Utility functions.
    - `utils.ts`: Standard utility file (usually containing `cn` helper).
- **`/public`**: Static assets.

### Configuration Files
- **`package.json`**: Scripts and dependencies.
- **`tsconfig.json`**: TypeScript and path alias configuration.
- **`components.json`**: Shadcn UI configuration.
- **`postcss.config.mjs`**: PostCSS config (likely for Tailwind).

## 4. Path Aliases
Standard aliases are configured in `tsconfig.json`:
- **`@/*`** &rarr; **`./*`** (Root directory)

**Common Import Patterns**:
```typescript
import { Button } from "@/components/ui/button" // IF located in root components
import { cn } from "@/lib/utils"
```

## 5. Development Conventions

### Component Implementation
- Use **Functional Components** with TypeScript.
- **Client Components**: Mark with `'use client'` at the top if using hooks (`useState`, `useEffect`, `useGSAP`) or event handlers.
- **Server Components**: Default in Next.js App Router (no directive needed).

### Styling Guidelines
- Use **Tailwind CSS** utility classes.
- Use `cn()` helper to merge classes conditionally.
- **Tailwind v4 Note**: Configuration is often CSS-first. Check `app/globals.css` for `@theme` directives or variable overrides if `tailwind.config` is missing.

### Animation Guidelines (GSAP)
- **Library**: Use `@gsap/react`.
- **Hook**: Use `useGSAP(() => { ... }, { scope: containerRef })` for proper cleanup and scoping.
- Avoid using `useEffect` for GSAP animations unless necessary (React 18/19 strict mode double-invokes effects, `useGSAP` handles this better).

## 6. Commands
- **Dev Server**: `bun run dev` (Runs `next dev`)
- **Build**: `bun run build` (Runs `next build`)
- **Lint**: `bun run lint` (Runs `eslint`)

## 7. Critical Notes for Agents
- **Folder Confusion**: There is both a root `/components` and an `/app/components`. Check both when looking for existing components. `components.json` aliases point to the root `/components`.
- **React 19**: This project uses React 19. Be aware of new hooks or patterns if applicable (though standard React 18 patterns mostly work).
- **Next.js 16**: Ensure dynamic APIs are handled correctly (some APIs that were synchronous might be asynchronous in newer Next.js versions, check specific 16 docs if unsure, although 15 was the big async change).

## 8. Important Ruleset
1. **Be Performant**: Write efficient code. specific attention to rendering performance and asset optimization.
2. **Be Responsive**: Ensure the application looks and works great on all screen sizes.
3. **Focused Changes**: **Do not** change code that is not related to the current problem. Avoid unrelated refactors.
4. **Follow Existing Patterns**: Respect the existing architecture and coding style.
5. **Comments & Documentation**: Add comments for complex logic, but avoid stating the obvious.