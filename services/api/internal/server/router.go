package server

import (
	"context"
	"net/http"
	"time"

	"github.com/Kguie/portfolio-system/services/api/internal/config"
	"github.com/Kguie/portfolio-system/services/api/internal/contact"
	"github.com/Kguie/portfolio-system/services/api/internal/db"
	"github.com/Kguie/portfolio-system/services/api/internal/httpjson"
	"github.com/Kguie/portfolio-system/services/api/internal/projects"
	"github.com/Kguie/portfolio-system/services/api/internal/version"
	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog"
)

type contextKey string

const requestIDContextKey contextKey = "request_id"

func New(cfg config.Config, logger zerolog.Logger, build version.Info, database db.DB) *http.Server {
	if database == nil {
		database = db.NoopDB{}
	}

	build = build.WithDefaults()
	r := chi.NewRouter()
	projectsHandler := projects.NewHandler(projects.NewService(projects.NewEntRepo(database.Client())))
	contactHandler := contact.NewHandler(contact.NewService(contact.NewEntRepo(database.Client())))

	r.Use(RequestID())
	r.Use(Recoverer(logger))
	r.Use(RequestLogger(logger))
	r.Use(CORS(cfg.CORSAllowedOrigins))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		httpjson.WriteJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	r.Get("/ready", func(w http.ResponseWriter, r *http.Request) {
		if err := database.Ping(r.Context()); err != nil {
			httpjson.WriteError(w, http.StatusServiceUnavailable, "not_ready", "service not ready", requestIDFromContext(r.Context()))
			return
		}
		httpjson.WriteJSON(w, http.StatusOK, map[string]string{"status": "ready"})
	})

	r.Get("/version", func(w http.ResponseWriter, r *http.Request) {
		httpjson.WriteJSON(w, http.StatusOK, build)
	})

	r.Get("/projects", projectsHandler.List)
	r.Get("/projects/{idOrSlug}", projectsHandler.Get)
	r.Post("/contact", contactHandler.Submit)

	return &http.Server{
		Addr:              cfg.Address(),
		Handler:           r,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
}

func contextWithRequestID(ctx context.Context, requestID string) context.Context {
	return context.WithValue(ctx, requestIDContextKey, requestID)
}

func requestIDFromContext(ctx context.Context) string {
	requestID, _ := ctx.Value(requestIDContextKey).(string)
	return requestID
}
