# ChallengeMe Database Migrations

This directory contains the consolidated database migration files for ChallengeMe. The structure has been simplified to have minimal, organized files.

## 📁 File Structure

### Core Migration Files
- **`schema_updates.sql`** - SQL-only features (partial unique constraints, comments)
- **`triggers_functions.sql`** - All database functions and triggers
- **`rls_policies.sql`** - Row Level Security policies for all tables
- **`apply_migrations.sql`** - Master migration script that applies everything

### Schema Management
- **`../prisma/schema.prisma`** - Main schema definition (tables, fields, enums, basic indexes)

### Execution Scripts
- **`migrate.sh`** - Bash script wrapper for easy execution

## 🎯 Prisma vs SQL Division

### ✅ **Handled by Prisma (`schema.prisma`)**
- **Tables & Models** - All table definitions
- **Fields & Columns** - Including `status`, `maxTeamSize`, `memberCount`, `participantCount`
- **Enums** - `ChallengeStatus`, `TeamRole`, `ChallengeParticipantType`
- **Basic Indexes** - Performance indexes on individual columns
- **Relationships** - Foreign keys and relations
- **Default Values** - Column defaults

### ⚙️ **Handled by SQL Files**
- **Partial Unique Constraints** - Conditional uniqueness (Prisma limitation)
- **Triggers & Functions** - Business logic and automatic counters
- **RLS Policies** - Row-level security (Supabase-specific)
- **Comments** - Database documentation

## 🚀 Quick Start

### Option 1: Using the Bash Script (Recommended)
```bash
# Navigate to the sql directory
cd /home/adrian/dev/ChallengeMe/backend/sql

# Run the migration script
./migrate.sh
```

### Option 2: Using psql directly
```bash
# Make sure you have DATABASE_URL set in your environment
export DATABASE_URL="your_database_connection_string"

# Run the migration
psql "$DATABASE_URL" -f apply_migrations.sql
```

### Option 3: Using Supabase CLI
```bash
# If you're using Supabase locally
supabase db reset
```

## 📋 What Gets Applied

### 1. Prisma Schema (`../prisma/schema.prisma`)
- ✅ All table definitions and relationships
- ✅ `ChallengeStatus` enum (ACTIVE, CLOSED, CANCELLED)
- ✅ `status` column on Challenge table
- ✅ `maxTeamSize` column on Challenge table
- ✅ `memberCount` column on Team table (maintained by triggers)
- ✅ `participantCount` column on Challenge table (maintained by triggers)
- ✅ Basic performance indexes
- ✅ Foreign key relationships

### 2. Schema Updates (`schema_updates.sql`)
- ✅ Partial unique constraints for preventing duplicate participations
- ✅ Database documentation comments

### 3. Triggers & Functions (`triggers_functions.sql`)
- ✅ `generate_random_username()` - Creates unique usernames
- ✅ `get_random_avatar_url()` - Generates avatar URLs
- ✅ `handle_new_user()` - Auto-creates profiles on signup
- ✅ `update_team_member_count()` - Maintains team member counts
- ✅ `update_challenge_participant_count()` - Maintains challenge participant counts
- ✅ All associated triggers

### 4. RLS Policies (`rls_policies.sql`)
- ✅ Complete security policies for all tables
- ✅ Proper user isolation and permissions
- ✅ Team-based access controls
- ✅ Challenge creator permissions
- ✅ Participant access controls

## 🔍 Validation

The migration script automatically validates:
- ✅ All expected tables exist
- ✅ RLS is enabled on all tables
- ✅ All functions are created
- ✅ All triggers are active
- ✅ All enums are defined

## 📝 Migration History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-08-19 | Initial consolidated migration structure |
| | | - Combined 9 separate files into 4 core files |
| | | - Added validation and error handling |
| | | - Simplified execution with single script |

## 🔧 Troubleshooting

### Permission Issues
```bash
# Make sure the script is executable
chmod +x migrate.sh
```

### Database Connection Issues
```bash
# Check your DATABASE_URL
echo $DATABASE_URL

# Test connection
psql "$DATABASE_URL" -c "SELECT version();"
```

### RLS Issues
```bash
# Check if RLS is working
psql "$DATABASE_URL" -c "SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
```

## 🧹 Cleanup

The following legacy files have been consolidated and can be removed:
- `add_challenge_status_field.sql` → merged into `schema_updates.sql`
- `add_team_max_participants_field.sql` → merged into `schema_updates.sql`
- `complete_rls_setup.sql` → replaced by `rls_policies.sql`
- `partial_unique_indexes.sql` → merged into `schema_updates.sql`
- `triggers_and_functions.sql` → replaced by `triggers_functions.sql`
- `apply_all_migrations.sql` → replaced by `apply_migrations.sql`
- `apply_migrations.sh` → replaced by `migrate.sh`
- `validate_database.sql` → validation now built into `apply_migrations.sql`
- `validate_sql.sh` → no longer needed

## 🎯 Next Steps

After running the migration:
1. **Generate Prisma client**: `npx prisma generate`
2. **Push Prisma schema**: `npx prisma db push` (if making schema changes)
3. **Apply SQL migrations**: `./migrate.sh` (for RLS, triggers, constraints)
4. **Test your application** to ensure everything works
5. **Remove legacy migration files** (optional)

### 🔄 **Development Workflow**
- **Schema changes**: Edit `schema.prisma` and run `npx prisma db push`
- **Business logic**: Edit SQL files and run `./migrate.sh`
- **RLS updates**: Edit `rls_policies.sql` and run `./migrate.sh`

---

*This migration system combines Prisma for schema management with SQL for advanced features, providing the best of both worlds for maintainability and control.*
