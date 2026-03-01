package contact

import (
	"context"
	"errors"

	"github.com/Kguie/portfolio-system/services/api/ent"
)

type Submission struct {
	Name      string
	Email     string
	Message   string
	IP        string
	UserAgent *string
}

type Repository interface {
	Save(ctx context.Context, submission Submission) error
}

type EntRepo struct {
	client *ent.Client
}

func NewEntRepo(client *ent.Client) *EntRepo {
	return &EntRepo{client: client}
}

func (r *EntRepo) Save(ctx context.Context, submission Submission) error {
	if r == nil || r.client == nil {
		return errors.New("contact repository not configured")
	}

	return r.client.Lead.
		Create().
		SetName(submission.Name).
		SetEmail(submission.Email).
		SetMessage(submission.Message).
		SetIP(submission.IP).
		SetNillableUserAgent(submission.UserAgent).
		Exec(ctx)
}
