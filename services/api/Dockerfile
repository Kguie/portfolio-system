FROM golang:1.24-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ARG GIT_SHA=dev
ARG BUILD_TIME=dev

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
	-ldflags "-s -w -X github.com/Kguie/portfolio-system/services/api/internal/version.SHA=${GIT_SHA} -X github.com/Kguie/portfolio-system/services/api/internal/version.BuildTime=${BUILD_TIME}" \
	-o /out/api ./cmd/api

FROM gcr.io/distroless/static-debian12

WORKDIR /app

COPY --from=builder /out/api /app/api

EXPOSE 8080

ENTRYPOINT ["/app/api"]
