# Portfolio Monorepo – AGENT.md

This repository contains the full-stack Portfolio project.

## Structure

- apps/web      → Next.js (App Router)
- apps/mobile   → React Native / Expo
- services/api  → Go API (net/http + chi + Ent + Atlas)
- packages/     → Shared types, utilities (if present)

Each app/service has its own AGENT.md with specific rules.

---

## Global Rules

- Do not introduce new frameworks without approval.
- Follow existing folder conventions.
- Always prefer explicit typing (TypeScript / Go).
- Avoid unnecessary abstractions.
- Keep changes minimal and scoped.

---

## Definition of Done

A change is valid only if:

- It builds successfully
- Tests pass (if applicable)
- Lint passes
- No unused imports or dead code

---

## Tooling

Primary automation entrypoint:
- `make` (source of truth for commands)

AI tools allowed:
- Codex CLI
- Gemini CLI

Do not assume environment variables; check `.env.example` if present.