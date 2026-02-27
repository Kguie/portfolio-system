# Portfolio API – AGENT.md

Stack:
- Go (version defined in go.mod)
- net/http + chi
- Ent ORM
- Atlas migrations
- zerolog

---

## Commands

- make dev
- make test
- make ent-gen
- make migrate-diff
- make migrate-apply

---

## Hard Constraints

- HTTP: net/http + chi only
- DB access: Ent only
- No raw SQL in services
- Migrations: Atlas only
- Logging: zerolog only
- No fmt.Println for logs

---

## Module Structure (Required)

Each module under `internal/<module>`:

- models.go       → HTTP DTOs only
- service.go      → business logic
- handler_http.go → HTTP handlers
- helpers.go      → internal helpers
- service_test.go → table-driven tests

---

## Errors

- Always wrap errors:
  fmt.Errorf("context: %w", err)

---

## Testing

- Prefer table-driven tests.
- Use enttest for DB logic.
- Mock external services only.

---

## Output Expectations

When modifying DB:
1. Update ent/schema
2. make ent-gen
3. make migrate-diff
4. make migrate-apply
5. make test