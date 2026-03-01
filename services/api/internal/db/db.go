package db

import (
	"context"
	"database/sql"
	"errors"
	"strings"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"github.com/Kguie/portfolio-system/services/api/ent"
	_ "github.com/jackc/pgx/v5/stdlib"
)

var ErrDatabaseNotConfigured = errors.New("database is not configured")

type DB interface {
	Client() *ent.Client
	Ping(ctx context.Context) error
	Close() error
}

type EntDB struct {
	client *ent.Client
	sqlDB  *sql.DB
}

type NoopDB struct{}

func New(databaseURL string) (DB, error) {
	databaseURL = strings.TrimSpace(databaseURL)
	if databaseURL == "" {
		return NoopDB{}, nil
	}

	sqlDB, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, err
	}

	drv := entsql.OpenDB(dialect.Postgres, sqlDB)
	client := ent.NewClient(ent.Driver(drv))

	return &EntDB{
		client: client,
		sqlDB:  sqlDB,
	}, nil
}

func (d *EntDB) Client() *ent.Client {
	if d == nil {
		return nil
	}
	return d.client
}

func (d *EntDB) Ping(ctx context.Context) error {
	if d == nil || d.sqlDB == nil {
		return ErrDatabaseNotConfigured
	}
	return d.sqlDB.PingContext(ctx)
}

func (d *EntDB) Close() error {
	if d == nil || d.client == nil {
		return nil
	}
	return d.client.Close()
}

func (NoopDB) Client() *ent.Client { return nil }

func (NoopDB) Ping(context.Context) error { return ErrDatabaseNotConfigured }

func (NoopDB) Close() error { return nil }
