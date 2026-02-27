# Portfolio Mobile – AGENT.md

This app is built with Expo + React Native + TypeScript.

---

## Package Manager

- yarn (lockfile: yarn.lock)

Do not switch package managers.

---

## Commands

- yarn start      → Start Expo dev server
- yarn android    → Run Android
- yarn ios        → Run iOS
- yarn web        → Run Web preview

---

## Architecture Rules

- Keep components small and typed.
- Prefer functional components only.
- Avoid unnecessary abstractions.
- Do not introduce global state unless required.

---

## Code Rules

- No new dependencies without approval.
- Keep edits minimal and consistent.
- Follow existing folder structure.
- Do not refactor unrelated files.

---

## Performance

- FlatList must use keyExtractor.
- Avoid heavy logic inside render.
- No unnecessary re-renders.

---

## Output Validation

Before finalizing changes:

- App must start without red screen.
- No new warnings in console.