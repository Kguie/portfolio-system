package projects

import (
	"context"
	"errors"
	"strings"
	"time"

	entdialectsql "entgo.io/ent/dialect/sql"
	"github.com/Kguie/portfolio-system/services/api/ent"
	"github.com/Kguie/portfolio-system/services/api/ent/project"
	"github.com/Kguie/portfolio-system/services/api/ent/schema"
)

type Project struct {
	ID        string              `json:"id"`
	Slug      string              `json:"slug"`
	Title     string              `json:"title"`
	Summary   string              `json:"summary"`
	Tags      []string            `json:"tags"`
	Links     schema.ProjectLinks `json:"links"`
	Featured  bool                `json:"featured"`
	CreatedAt time.Time           `json:"createdAt"`
	UpdatedAt time.Time           `json:"updatedAt"`
}

type Repository interface {
	List(ctx context.Context) ([]Project, error)
	GetByIDOrSlug(ctx context.Context, idOrSlug string) (Project, bool, error)
}

type EntRepo struct {
	client *ent.Client
}

func NewEntRepo(client *ent.Client) *EntRepo {
	return &EntRepo{client: client}
}

func (r *EntRepo) List(ctx context.Context) ([]Project, error) {
	if r == nil || r.client == nil {
		return nil, errors.New("projects repository not configured")
	}

	rows, err := r.client.Project.
		Query().
		Order(
			project.ByFeatured(entdialectsql.OrderDesc()),
			project.ByCreatedAt(entdialectsql.OrderDesc()),
		).
		All(ctx)
	if err != nil {
		return nil, err
	}

	out := make([]Project, 0, len(rows))
	for _, row := range rows {
		out = append(out, mapEntProject(row))
	}
	return out, nil
}

func (r *EntRepo) GetByIDOrSlug(ctx context.Context, idOrSlug string) (Project, bool, error) {
	if r == nil || r.client == nil {
		return Project{}, false, errors.New("projects repository not configured")
	}

	key := strings.TrimSpace(idOrSlug)
	if key == "" {
		return Project{}, false, nil
	}

	byID, err := r.client.Project.Get(ctx, key)
	if err == nil {
		return mapEntProject(byID), true, nil
	}
	if err != nil && !ent.IsNotFound(err) {
		return Project{}, false, err
	}

	bySlug, err := r.client.Project.
		Query().
		Where(project.SlugEQ(key)).
		Only(ctx)
	if ent.IsNotFound(err) {
		return Project{}, false, nil
	}
	if err != nil {
		return Project{}, false, err
	}

	return mapEntProject(bySlug), true, nil
}

func mapEntProject(p *ent.Project) Project {
	return Project{
		ID:        p.ID,
		Slug:      p.Slug,
		Title:     p.Title,
		Summary:   p.Summary,
		Tags:      p.Tags,
		Links:     p.Links,
		Featured:  p.Featured,
		CreatedAt: p.CreatedAt.UTC(),
		UpdatedAt: p.UpdatedAt.UTC(),
	}
}
