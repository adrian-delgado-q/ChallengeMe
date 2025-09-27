# ChallengeMe Database Migrations

This directory contains organized database migration files for ChallengeMe. The structure is clean, modular, and maintainable.

## 📁 File Structure

### Core Migration Files (Applied in Order)
- **`01_schema_enhancements.sql`** - Schema modifications that Prisma can't handle
- **`02_functions.sql`** - All custom PL/pgSQL functions
- **`03_triggers.sql`** - Database triggers that link events to functions
- **`04_rls_policies.sql`** - Row Level Security policies for all tables
- **`05_progress_aggregation.sql`** - Challenge progress aggregation system

### Validation & Utilities
- **`99_validation.sql`** - Validation script to verify successful migration
- **`migrate.sh`** - Bash script for automated migration execution

### Schema Management
- **`../prisma/schema.prisma`** - Main schema definition (tables, fields, enums, basic indexes)

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
- **Progress Aggregation** - Real-time challenge progress system

## 🚀 Quick Start

### Option 1: Using the Migration Script (Recommended)
```bash
# Navigate to the sql directory
cd backend/sql

# Make the script executable (first time only)
chmod +x migrate.sh

# Run the migration script
./migrate.sh
```

### Option 2: Using psql directly
```bash
# Make sure you have SUPABASE_DB_URL set in your environment
export SUPABASE_DB_URL="your_database_connection_string"

# Apply migrations in order
psql "$SUPABASE_DB_URL" -f 01_schema_enhancements.sql
psql "$SUPABASE_DB_URL" -f 02_functions.sql
psql "$SUPABASE_DB_URL" -f 03_triggers.sql
psql "$SUPABASE_DB_URL" -f 04_rls_policies.sql
psql "$SUPABASE_DB_URL" -f 05_progress_aggregation.sql

# Validate the migration
psql "$SUPABASE_DB_URL" -f 99_validation.sql
```

## 📋 Migration Steps

The migration process follows this sequence:

1. **Schema Enhancements** - Creates partial unique indexes and adds documentation comments
2. **Functions** - Defines utility and trigger functions with optimized performance
3. **Triggers** - Links database events to functions for automatic maintenance
4. **RLS Policies** - Applies security policies for proper access control
5. **Progress Aggregation** - Sets up real-time challenge progress tracking system
6. **Validation** - Verifies all components were created successfully

## 🔧 Key Features

### Performance Optimizations
- **Incremental Counters**: Team and challenge counts use +1/-1 instead of COUNT(*)
- **UPSERT Operations**: Progress aggregation uses ON CONFLICT for concurrency
- **Strategic Indexes**: Query-optimized indexes for trigger performance

### Data Integrity
- **Partial Unique Constraints**: Prevents duplicate user/team participation per challenge
- **Cascade Handling**: Proper cleanup when activities are updated/deleted
- **Atomic Operations**: All operations wrapped in safe transactions

### Maintainability
- **Modular Design**: Each file has a single, clear responsibility
- **Documentation**: Extensive comments explain purpose and usage
- **Validation**: Built-in checks ensure migration success

## 🐛 Troubleshooting

### Common Issues

1. **Permission Errors**: Make sure your database user has proper privileges
2. **Missing Environment**: Check that `SUPABASE_DB_URL` is set correctly
3. **Schema Drift**: Run `npx prisma db push` before SQL migrations
4. **Trigger Conflicts**: The script drops existing triggers before creating new ones

### Recovery Commands

```bash
# Rebuild challenge progress aggregation (if data looks inconsistent)
psql "$SUPABASE_DB_URL" -c "SELECT public.rebuild_challenge_progress();"

# Check validation status
psql "$SUPABASE_DB_URL" -f 99_validation.sql
```

## 📚 File Documentation

### 01_schema_enhancements.sql
- Partial unique indexes for challenge participation
- Column comments for database documentation

### 02_functions.sql  
- Random username/avatar generators
- User profile creation logic
- Counter maintenance functions (optimized)

### 03_triggers.sql
- New user profile creation trigger
- Team member count maintenance
- Challenge participant count maintenance

### 04_rls_policies.sql
- Comprehensive security policies for all tables
- Proper access control for users, teams, challenges
- View/edit permissions based on ownership and membership

### 05_progress_aggregation.sql
- Real-time activity aggregation system
- Handles INSERT/UPDATE/DELETE operations on activities
- Maintains totals, counts, bests, and dates per participant/activity type
- Includes maintenance and rebuild functions

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
