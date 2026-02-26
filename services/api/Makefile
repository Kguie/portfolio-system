.PHONY: run build test fmt lint clean

APP_NAME=api

run:
	go run .

build:
	mkdir -p bin
	go build -o bin/$(APP_NAME)

test:
	go test ./...

fmt:
	go fmt ./...

lint:
	@echo "golangci-lint not installed; skipping (install later)"
	@exit 0

clean:
	rm -rf bin