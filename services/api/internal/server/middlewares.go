package server

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Kguie/portfolio-system/services/api/internal/httpjson"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/zerolog"
)

const requestIDHeader = "X-Request-ID"

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

func RequestID() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := strings.TrimSpace(r.Header.Get(requestIDHeader))
			if requestID == "" {
				requestID = newRequestID()
			}

			ctx := contextWithRequestID(r.Context(), requestID)
			r = r.WithContext(ctx)
			w.Header().Set(requestIDHeader, requestID)

			next.ServeHTTP(w, r)
		})
	}
}

func Recoverer(logger zerolog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					reqID := requestIDFromContext(r.Context())
					logger.Error().Interface("panic", rec).Str("request_id", reqID).Str("path", r.URL.Path).Msg("panic recovered")
					httpjson.WriteError(w, http.StatusInternalServerError, "internal_error", "internal server error", reqID)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func RequestLogger(logger zerolog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}

			next.ServeHTTP(rec, r)

			logger.Info().
				Str("method", r.Method).
				Str("path", r.URL.Path).
				Int("status", rec.status).
				Dur("duration", time.Since(start)).
				Str("request_id", requestIDFromContext(r.Context())).
				Msg("request")
		})
	}
}

func CORS(allowedOrigins []string) func(http.Handler) http.Handler {
	allowed := make(map[string]struct{}, len(allowedOrigins))
	for _, origin := range allowedOrigins {
		allowed[origin] = struct{}{}
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := strings.TrimSpace(r.Header.Get("Origin"))
			if origin != "" {
				if _, ok := allowed[origin]; !ok {
					httpjson.WriteError(w, http.StatusForbidden, "cors_forbidden", "origin not allowed", requestIDFromContext(r.Context()))
					return
				}

				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Vary", "Origin")
				w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Accept,Authorization,Content-Type,X-Request-ID")
			}

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func newRequestID() string {
	buf := make([]byte, 16)
	if _, err := rand.Read(buf); err != nil {
		return strconv.FormatUint(middleware.NextRequestID(), 10)
	}
	return hex.EncodeToString(buf)
}
