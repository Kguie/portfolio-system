package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type Project struct {
	ent.Schema
}

type ProjectLinks struct {
	RepoURL *string `json:"repo_url,omitempty"`
	LiveURL *string `json:"live_url,omitempty"`
	DocsURL *string `json:"docs_url,omitempty"`
}

func (Project) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			DefaultFunc(uuid.NewString).
			Immutable(),
		field.String("slug").
			NotEmpty().
			Unique(),
		field.String("title").
			NotEmpty(),
		field.String("summary").
			NotEmpty(),
		field.JSON("tags", []string{}).
			Default([]string{}),
		field.JSON("links", ProjectLinks{}).
			Default(ProjectLinks{}),
		field.Bool("featured").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}
