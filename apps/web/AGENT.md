# Portfolio Web – AGENT.md

This app is built with Next.js (App Router) + TypeScript + Tailwind CSS.

---

## Package Manager

- yarn (lockfile: yarn.lock)

Do not switch package manager.

---

## Commands

- yarn dev     → Start development server
- yarn build   → Build for production
- yarn start   → Start production server
- yarn lint    → Run ESLint

---

## Architecture Rules

- Use App Router (`app/` directory).
- Prefer Server Components by default.
- Use Client Components only when necessary.
- Keep components small and reusable.
- Avoid unnecessary global state.

---

## Code Rules

- Prefer strict TypeScript types.
- Avoid `any` unless unavoidable.
- Reuse existing components and patterns.
- Do not introduce new dependencies without approval.
- Do not modify unrelated files.

---

## Styling

- Use Tailwind utility classes.
- Avoid inline styles.
- Keep layout responsive by default.

---

## Validation

Before finalizing changes:

- yarn lint passes
- yarn build succeeds
- No hydration or console errors in dev mode