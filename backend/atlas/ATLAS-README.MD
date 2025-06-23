# Database Management with Atlas and Prisma

This document outlines our hybrid approach to managing the PostgreSQL database schema. We use **Prisma ORM** (`prisma/schema.prisma`) to define the core application schema for our type-safe client, and the **Atlas CLI** to manage raw SQL objects like triggers and to handle database migrations. This system allows us to sync the `public.profiles` table with Supabase's `auth.users` table effectively.

---

## Prerequisites

- **Node.js and npm**: Required for Prisma commands.
- **Atlas CLI**: Install the command-line tool (v0.35.0 or newer) from [atlasgo.io](https://atlasgo.io).
- **.env File**: A `.env` file must exist in the project root (`backend/`) containing the `SUPABASE_DB_URL`.

---

## Core Configuration

Our database's desired state is defined by merging two sources using `atlas/atlas.hcl`:

- `prisma/schema.prisma`: Contains our primary application tables, columns, and relations.
- `atlas/trigger_schema.hcl`: Contains custom functions and triggers that Prisma cannot manage.

The main configuration file, `atlas/atlas.hcl`, orchestrates this merge:

```hcl
// atlas/atlas.hcl - Final Working Version

data "external_schema" "prisma" {
  program = [
    "npx", "prisma", "migrate", "diff",
    "--from-empty", "--to-schema-datamodel",
    "prisma/schema.prisma", "--script"
  ]
}

data "hcl_schema" "triggers" {
  path = "atlas/trigger_schema.hcl"
}

env "supabase" {
  url = getenv("SUPABASE_DB_URL")
  dev = "docker://postgres/16/dev?search_path=public,auth"

  schema {
    src = [
      data.external_schema.prisma.url,
      data.hcl_schema.triggers.url
    ]
  }

  migration {
    dir     = "file://atlas/migrations"
    exclude = ["_prisma_migrations"]
  }
}
```

---
## Workflow & Commands

All commands must be run from the project root (`backend/`) directory.

### Step 1: Load Environment Variables (Crucial)

Atlas reads the database URL from your shell's environment. Run this command once per terminal session:

```bash
# This command loads variables from your .env file into the current session
export $(grep -v '^#' .database.env | xargs)
```

> **Troubleshooting:**
> The error `required flag(s) "url" not set` means you forgot to run this `export` command.

---

### Step 2: Inspect Changes (Dry Run)

To safely preview the differences between your local schema files and the live database without making changes, use `--dry-run`:

```bash
# This shows the SQL plan to make the database match your local schema.
atlas schema apply --env supabase --dry-run -c "file://atlas/atlas.hcl"
```

---

### Step 3: Generating and Applying Migrations

We use a versioned workflow for all schema changes intended for production.

#### 3.A: Generate a New Migration File

After modifying `schema.prisma` or `trigger_schema.hcl`, generate a migration file. Atlas calculates the required SQL changes:

```bash
# Generate a new migration file with a descriptive name
atlas migrate diff --env supabase "add_new_feature_description"
```

This creates a new `.sql` file in `atlas/migrations/`. Review this file and commit it to version control.

#### 3.B: Apply Migrations

To apply pending migrations to the database, run:

```bash
# Connects to the database and runs any new migration files.
atlas migrate apply --env supabase
```

This is the standard command for updating staging and production environments.


