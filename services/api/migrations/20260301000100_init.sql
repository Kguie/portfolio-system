-- Create "leads" table
CREATE TABLE "leads" (
  "id" character varying NOT NULL,
  "name" character varying NOT NULL,
  "email" character varying NOT NULL,
  "message" character varying NOT NULL,
  "ip" character varying NOT NULL,
  "user_agent" character varying NULL,
  "created_at" timestamptz NOT NULL,
  PRIMARY KEY ("id")
);
-- Create "projects" table
CREATE TABLE "projects" (
  "id" character varying NOT NULL,
  "slug" character varying NOT NULL,
  "title" character varying NOT NULL,
  "summary" character varying NOT NULL,
  "tags" jsonb NOT NULL,
  "links" jsonb NOT NULL,
  "featured" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL,
  PRIMARY KEY ("id")
);
-- Create index "projects_slug_key" to table: "projects"
CREATE UNIQUE INDEX "projects_slug_key" ON "projects" ("slug");
