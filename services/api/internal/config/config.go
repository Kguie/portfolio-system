package config

import (
	"os"
	"strconv"
	"strings"
)

const (
	defaultPort = 8080
	defaultEnv  = "dev"
	defaultLog  = "info"
)

type Config struct {
	Port               int
	Env                string
	LogLevel           string
	DatabaseURL        string
	CORSAllowedOrigins []string
}

func Load() Config {
	port := getIntEnv("PORT", defaultPort)

	return Config{
		Port:               port,
		Env:                getEnv("ENV", defaultEnv),
		LogLevel:           strings.ToLower(getEnv("LOG_LEVEL", defaultLog)),
		DatabaseURL:        getEnv("DATABASE_URL", ""),
		CORSAllowedOrigins: parseCSV(getEnv("CORS_ALLOWED_ORIGINS", "")),
	}
}

func (c Config) Address() string {
	return ":" + strconv.Itoa(c.Port)
}

func getEnv(key, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}
	return value
}

func getIntEnv(key string, fallback int) int {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}

	n, err := strconv.Atoi(value)
	if err != nil || n <= 0 {
		return fallback
	}
	return n
}

func parseCSV(value string) []string {
	if value == "" {
		return nil
	}

	parts := strings.Split(value, ",")
	origins := make([]string, 0, len(parts))
	for _, part := range parts {
		item := strings.TrimSpace(part)
		if item == "" {
			continue
		}
		origins = append(origins, item)
	}
	return origins
}
