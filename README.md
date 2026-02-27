# Portfolio System

Full-stack portfolio monorepo with:

- `apps/web`: Next.js 16 (App Router, TypeScript, Tailwind, next-intl)
- `apps/mobile`: Expo + React Native + TypeScript
- `services/api`: Go HTTP API

## Repository Layout

```text
.
├── apps/
│   ├── web/       # Marketing + case-study site (localized en/fr)
│   └── mobile/    # Expo mobile client
├── services/
│   └── api/       # Go API service
├── packages/      # Shared packages (reserved)
└── Makefile       # Root task entrypoint
```

## Prerequisites

- Node.js 20+ with npm
- Go 1.24+
- For mobile development:
  - Expo CLI (via `npx expo ...`)
  - Android Studio and/or Xcode (optional, for device/simulator targets)

## Install Dependencies

From repository root:

```bash
npm install
```

This installs workspace dependencies for `apps/web` and `apps/mobile`.

## Run Locally

Use separate terminals for each long-running service.

### Web (Next.js)

```bash
make dev-web
```

Runs on `http://localhost:3000`.

### API (Go)

```bash
make dev-api
```

Runs on `http://localhost:8080`.

Health check:

```bash
curl http://localhost:8080/health
```

Expected response: `ok`

### Mobile (Expo)

```bash
make dev-mobile
```

Then choose Android, iOS, or Web from the Expo prompt.

## Build

```bash
make build
```

Builds:

- `apps/web` (Next.js production build)
- `services/api/bin/api` (Go binary)

## Test, Lint, Format

```bash
make test   # Go tests
make lint   # Web lint + API lint placeholder
make fmt    # Go formatting
```

Web tests can also be run directly:

```bash
cd apps/web && npm test
```

## Localization

The web app supports:

- English (`/en/...`)
- French (`/fr/...`)

Messages live in:

- `apps/web/messages/en.json`
- `apps/web/messages/fr.json`

## Current Status

- Web routes and locale routing are in place.
- API currently exposes a minimal `/health` endpoint.
- Mobile app is an Expo starter shell ready for feature development.

## License

MIT (see [LICENSE](./LICENSE)).
