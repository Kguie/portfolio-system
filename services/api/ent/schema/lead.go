package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type Lead struct {
	ent.Schema
}

func (Lead) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			DefaultFunc(uuid.NewString).
			Immutable(),
		field.String("name").
			NotEmpty(),
		field.String("email").
			NotEmpty(),
		field.String("message").
			NotEmpty(),
		field.String("ip").
			NotEmpty(),
		field.String("user_agent").
			Optional().
			Nillable(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}
