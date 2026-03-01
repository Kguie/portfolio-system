package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/Kguie/portfolio-system/services/api/ent/schema"
	"github.com/Kguie/portfolio-system/services/api/internal/config"
	"github.com/Kguie/portfolio-system/services/api/internal/db"
)

type seedProject struct {
	Slug     string
	Title    string
	Summary  string
	Tags     []string
	Links    schema.ProjectLinks
	Featured bool
}

func main() {
	cfg := config.Load()
	if cfg.DatabaseURL == "" {
		fmt.Fprintln(os.Stderr, "DATABASE_URL is required")
		os.Exit(1)
	}

	database, err := db.New(cfg.DatabaseURL)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to initialize database: %v\n", err)
		os.Exit(1)
	}
	defer database.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := database.Ping(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "failed to ping database: %v\n", err)
		os.Exit(1)
	}

	client := database.Client()
	if client == nil {
		fmt.Fprintln(os.Stderr, "database client is not configured")
		os.Exit(1)
	}

	count, err := client.Project.Query().Count(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to count projects: %v\n", err)
		os.Exit(1)
	}
	if count > 0 {
		fmt.Printf("seed skipped: %d projects already exist\n", count)
		return
	}

	projects := []seedProject{
		{
			Slug:    "portfolio-api",
			Title:   "Portfolio API",
			Summary: "Go API for portfolio projects and lead capture.",
			Tags:    []string{"go", "chi", "ent", "atlas"},
			Links: schema.ProjectLinks{
				RepoURL: strPtr("https://github.com/Kguie/portfolio-system"),
				DocsURL: strPtr("https://github.com/Kguie/portfolio-system/tree/main/services/api"),
			},
			Featured: true,
		},
		{
			Slug:    "market-notes",
			Title:   "Market Notes",
			Summary: "Publishing workflow for short-form market commentary.",
			Tags:    []string{"go", "postgres", "api"},
			Links: schema.ProjectLinks{
				RepoURL: strPtr("https://github.com/Kguie/market-notes"),
			},
		},
		{
			Slug:    "trading-journal",
			Title:   "Trading Journal",
			Summary: "Simple data model and API for logging discretionary trades.",
			Tags:    []string{"go", "rest"},
			Links:   schema.ProjectLinks{},
		},
	}

	for _, p := range projects {
		if _, err := client.Project.
			Create().
			SetSlug(p.Slug).
			SetTitle(p.Title).
			SetSummary(p.Summary).
			SetTags(p.Tags).
			SetLinks(p.Links).
			SetFeatured(p.Featured).
			Save(ctx); err != nil {
			fmt.Fprintf(os.Stderr, "failed to insert project %q: %v\n", p.Slug, err)
			os.Exit(1)
		}
	}

	fmt.Printf("seed complete: inserted %d projects\n", len(projects))
}

func strPtr(v string) *string {
	return &v
}
