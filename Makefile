.PHONY: help web mobile api dev dev-web dev-mobile dev-api build lint fmt test clean

help:
	@echo "Targets:"
	@echo "  make dev         - run web + api (in 2 terminals recommended) "
	@echo "  make dev-web     - run Next.js dev server"
	@echo "  make dev-mobile  - run Expo"
	@echo "  make dev-api     - run Go API"
	@echo "  make build       - build web + api"
	@echo "  make lint        - lint web + api (if configured)"
	@echo "  make fmt         - format api"
	@echo "  make test        - test api"
	@echo "  make clean       - clean api build artifacts"

dev-web:
	cd apps/web && npm run dev

dev-mobile:
	cd apps/mobile && npx expo start

dev-api:
	cd services/api && make run

build:
	cd apps/web && npm run build
	cd services/api && make build

lint:
	cd apps/web && npm run lint
	cd services/api && make lint

fmt:
	cd services/api && make fmt

test:
	cd services/api && make test

clean:
	cd services/api && make clean