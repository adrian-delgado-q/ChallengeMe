# Database Management with Atlas and Prisma

This document outlines our hybrid approach to managing the PostgreSQL database schema. We use **Prisma ORM** (`prisma/schema.prisma`) to define the core application schema for our type-safe client, and the **Atlas CLI** to manage raw SQL objects like triggers and to handle database migrations. This system allows us to sync the `public.profiles` table with Supabase's `auth.users` table effectively.

---

## Prerequisites

- **Node.js and npm**: Required for Prisma commands.
- **Atlas CLI**: Install the command-line tool from [atlasgo.io](https://atlasgo.io).
- **Docker**: Required for the development database environment specified in the Atlas configuration.
- **A `.database.env` file**: This file must exist in the project root containing the `SUPABASE_DB_URL`.

---

## Core Configuration

Our database's desired state is defined by merging two sources using `atlas/atlas.hcl`:

- `prisma/schema.prisma`: Contains our primary application tables, columns, and relations.
- `atlas/trigger_schema.hcl`: Contains custom functions and triggers that Prisma cannot manage.

The main configuration file, `atlas/atlas.hcl`, orchestrates this.

## Workflow & Commands

All commands must be run from the `backend/atlas` directory.

### Step 1: Navigate to the Atlas Directory and Load Environment Variables

Atlas reads the database URL from your shell's environment. This must be done once per terminal session.

```bash
# Navigate to the atlas directory from the project root
cd atlas

# Load variables from your .database.env file (located in the parent directory)
export $(grep -v '^#' ../.database.env | xargs)
```

> **Troubleshooting:**
> If you see an error like `required flag(s) "url" not set`, it means you have not successfully run the `export` command in your current terminal session.

### Step 2: Generate a New Migration File

After modifying `prisma/schema.prisma` or `atlas/trigger_schema.hcl`, generate a versioned migration file. Atlas compares the desired state (defined in `atlas.hcl`) against the current state of the migrations directory and generates the necessary SQL.

```bash
# Generate a new migration file with a descriptive name.
# Replace "add_user_bio" with a meaningful description of your changes.
atlas migrate diff --env supabase "add_user_bio"
```

This will create a new `.sql` file inside the `atlas/migrations/` directory. It is crucial to review this file for correctness before committing it to version control.

### Step 3: Apply Migrations to the Supabase Database

To apply any pending (newly created) migration files to the live Supabase database, use the `apply` command.

```bash
# Connects to the Supabase database and executes any new migration files.
atlas migrate apply --env supabase
```

This is the standard and safe command for updating your database. It relies on the `atlas_schema_revisions` table to determine which migrations have already been applied.

### Step 4 (Optional): Handling Baselines for Existing Databases

If you are initializing Atlas on a pre-existing database that already has a schema, you may need to set a "baseline" migration. This tells Atlas to assume all migrations up to a certain version have already been applied, preventing errors from trying to re-create existing tables.

```bash
# This command applies migrations from the specified directory,
# but marks the version '20250627044037' as the baseline.
# Atlas will not attempt to run this migration or any before it.
atlas migrate apply --env supabase --dir file://migrations/1.0.0 --baseline 20250627044037
```

**Note:** The `--baseline` flag is typically a one-time operation during setup. For all subsequent updates, use the standard `atlas migrate apply` command.

### Step 5 (Optional): Inspect current infrastructure applied.
Inspecting will give you the current table applied in the data base with all the different functions related. 

```bash
atlas schema inspect -u "${SUPABASE_DB_URL}" --schema "public" > existing_schema.hcl
```

### Utility Commands

#### Recalculate Migration Directory Hash

If you manually edit or reorder migration files, the checksum file (`atlas.sum`) will become invalid. You must re-calculate the hash for the directory.

```bash
# Re-computes the checksum for a specific migration directory.
atlas migrate hash --dir file://migrations/1.0.0
```

#### Formatting Atlas Files

To ensure consistent formatting of your `.hcl` files:

```bash
# Formats all .hcl files in the current directory.
atlas format
```

```
