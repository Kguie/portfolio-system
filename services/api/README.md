# Portfolio API

## Run the service

Use one of:

```sh
make dev
```

or:

```sh
make run
```

Runtime configuration comes from environment variables:

- `PORT` (default `8080`)
- `ENV` (default `dev`)
- `LOG_LEVEL` (default `info`)
- `CORS_ALLOWED_ORIGINS` (comma-separated list, optional)

## Local PostgreSQL (dev)

Start PostgreSQL:

```sh
make db-up
```

Stop PostgreSQL:

```sh
make db-down
```

Follow PostgreSQL logs:

```sh
make db-logs
```

Direct Docker Compose equivalents:

```sh
docker compose up -d
docker compose down
docker compose logs -f postgres
```

`DATABASE_URL` example:

```sh
postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable
```

## Build variables

The binary exposes build metadata through `/version`:

- `internal/version.SHA`
- `internal/version.BuildTime`

In Docker builds, these are set via `ARG GIT_SHA` and `ARG BUILD_TIME`, then injected with Go `-ldflags`.

If not provided, both default to `dev`.

## Migrations (Ent + Atlas)

This service uses Ent schemas as the source of truth and Atlas for versioned migrations.

Exact flow:

1) Edit files in `ent/schema`
2) Generate Ent code:
```sh
make ent
```
3) Create a new versioned migration:
```sh
make migrate-diff name=your_change_name
```
4) Apply migrations:
```sh
DATABASE_URL=postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable make migrate-apply
```

Useful migration commands:

- `make ent`:
  - Runs `ent generate ./ent/schema` when `ent` is installed.
  - Prints install guidance if `ent` is missing.
- `make migrate-diff name=<name>`:
  - Generates a new versioned migration by diffing Ent schema state.
- `make migrate-apply`:
  - Applies pending versioned migrations to `DATABASE_URL`.
- `make migrate-status`:
  - Shows migration status for `DATABASE_URL`.

## Seed data

Seed default projects into a fresh database:

```sh
DATABASE_URL=postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable make seed
```

Expected result:

- First run on a fresh DB: `seed complete: inserted 3 projects`
- Subsequent runs: `seed skipped: <n> projects already exist` (no duplicates)

Verify seeded data:

```sh
curl -s http://localhost:8080/projects
curl -s http://localhost:8080/projects/portfolio-api
```

## HTTP endpoints

- `GET /health`: liveness check (`{"status":"ok"}`)
- `GET /ready`: readiness check (`{"status":"ready"}`)
- `GET /version`: build metadata (`sha`, `buildTime`, `env`)

## Yaak requests

Version-controlled Yaak exports are stored in:

- `docs/yaak/portfolio-api.collection.json`
- `docs/yaak/portfolio-local.env.json`

Import in Yaak:

1) Open Yaak.
2) Import `docs/yaak/portfolio-api.collection.json` first (this creates workspace `Portfolio API`).
3) Select workspace `Portfolio API`.
4) Use environment `portfolio-local` included in the collection.
5) Optional: import `docs/yaak/portfolio-local.env.json` only after step 3.
6) Confirm `BASE_URL` is `http://localhost:8080`.
