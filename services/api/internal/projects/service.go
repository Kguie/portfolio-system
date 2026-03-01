package projects

import (
	"context"
	"errors"
	"strings"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context) ([]Project, error) {
	if s == nil || s.repo == nil {
		return nil, errors.New("projects service not configured")
	}
	return s.repo.List(ctx)
}

func (s *Service) GetByIDOrSlug(ctx context.Context, idOrSlug string) (Project, bool, error) {
	if s == nil || s.repo == nil || strings.TrimSpace(idOrSlug) == "" {
		return Project{}, false, nil
	}
	return s.repo.GetByIDOrSlug(ctx, idOrSlug)
}
