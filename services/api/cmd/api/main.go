package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Kguie/portfolio-system/services/api/internal/config"
	"github.com/Kguie/portfolio-system/services/api/internal/db"
	"github.com/Kguie/portfolio-system/services/api/internal/server"
	"github.com/Kguie/portfolio-system/services/api/internal/version"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	cfg := config.Load()

	zerolog.TimeFieldFormat = time.RFC3339Nano
	level, err := zerolog.ParseLevel(cfg.LogLevel)
	if err != nil {
		level = zerolog.InfoLevel
	}
	zerolog.SetGlobalLevel(level)

	logger := zerolog.New(os.Stdout).With().Timestamp().Str("service", "portfolio-api").Logger()
	log.Logger = logger

	build := version.Info{
		SHA:       version.SHA,
		BuildTime: version.BuildTime,
		Env:       cfg.Env,
	}

	database, err := db.New(cfg.DatabaseURL)
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to initialize database")
	}
	defer func() {
		if closeErr := database.Close(); closeErr != nil {
			logger.Error().Err(closeErr).Msg("failed to close database")
		}
	}()

	srv := server.New(cfg, logger, build, database)

	go func() {
		logger.Info().Str("addr", srv.Addr).Msg("starting server")
		if serveErr := srv.ListenAndServe(); serveErr != nil && !errors.Is(serveErr, http.ErrServerClosed) {
			logger.Fatal().Err(serveErr).Msg("server failed")
		}
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	<-sigCh

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	logger.Info().Msg("shutting down server")
	if shutdownErr := srv.Shutdown(ctx); shutdownErr != nil {
		logger.Error().Err(shutdownErr).Msg("graceful shutdown failed")
	}
}
