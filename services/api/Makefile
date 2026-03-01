ATLAS ?= atlas

.PHONY: dev run test tidy fmt lint db-up db-down db-logs ent migrate-diff migrate-apply migrate-status seed

dev:
	@if command -v air >/dev/null 2>&1; then \
		echo "starting with Air"; \
		exec air -c .air.toml; \
	else \
		echo "Air is not installed."; \
		echo "Install with: go install github.com/cosmtrek/air@latest"; \
		exit 1; \
	fi

run:
	go run ./cmd/api

test:
	go test ./...

tidy:
	go mod tidy

fmt:
	@gofmt -w $$(find . -type f -name '*.go' -not -path './tmp/*')

lint:
	@if command -v golangci-lint >/dev/null 2>&1; then \
		golangci-lint run ./...; \
	else \
		echo "golangci-lint not found; install from https://golangci-lint.run/welcome/install/"; \
		echo "skipping lint"; \
	fi

db-up:
	docker compose up -d

db-down:
	docker compose down

db-logs:
	docker compose logs -f postgres

ent:
	@if command -v ent >/dev/null 2>&1; then \
		ent generate ./ent/schema; \
	else \
		echo "ent is not installed."; \
		echo "Install with: go install entgo.io/ent/cmd/ent@latest"; \
		exit 1; \
	fi

migrate-diff:
	@if ! command -v $(ATLAS) >/dev/null 2>&1; then \
		echo "atlas is not installed."; \
		echo "Install with: curl -sSf https://atlasgo.sh | sh"; \
		echo "or see: https://atlasgo.io/getting-started"; \
	elif [ -z "$(name)" ]; then \
		echo "usage: make migrate-diff name=<migration_name>"; \
		echo "example: make migrate-diff name=add_project_indexes"; \
	else \
		$(ATLAS) migrate diff "$(name)" --env local; \
	fi

migrate-apply:
	@if ! command -v $(ATLAS) >/dev/null 2>&1; then \
		echo "atlas is not installed."; \
		echo "Install with: curl -sSf https://atlasgo.sh | sh"; \
		echo "or see: https://atlasgo.io/getting-started"; \
	elif [ -z "$$DATABASE_URL" ]; then \
		echo "DATABASE_URL is required."; \
		echo "example: DATABASE_URL=postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable make migrate-apply"; \
	else \
		$(ATLAS) migrate apply --env local; \
	fi

migrate-status:
	@if ! command -v $(ATLAS) >/dev/null 2>&1; then \
		echo "atlas is not installed."; \
		echo "Install with: curl -sSf https://atlasgo.sh | sh"; \
		echo "or see: https://atlasgo.io/getting-started"; \
	elif [ -z "$$DATABASE_URL" ]; then \
		echo "DATABASE_URL is required."; \
		echo "example: DATABASE_URL=postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable make migrate-status"; \
	else \
		$(ATLAS) migrate status --env local; \
	fi

seed:
	@if [ -z "$$DATABASE_URL" ]; then \
		echo "DATABASE_URL is required."; \
		echo "example: DATABASE_URL=postgres://portfolio:portfolio@localhost:5432/portfolio?sslmode=disable make seed"; \
		exit 1; \
	fi
	go run ./cmd/seed
