# ChallengeMe Database Setup (Post-Atlas)

This directory contains all the SQL scripts needed to set up and maintain the ChallengeMe database without Atlas.

## 🗂️ File Structure

```
backend/sql/
├── apply_migrations.sh          # Master script to apply all migrations
├── apply_all_migrations.sql     # SQL script that includes all others
├── triggers_and_functions.sql   # Replaces Atlas HCL triggers
├── partial_unique_indexes.sql   # Replaces Atlas partial indexes
├── complete_rls_setup.sql       # Comprehensive RLS policies
├── validate_database.sql        # Validation queries
└── README.md                    # This file
```

## 🚀 Quick Start

### 1. Set Environment Variables

Make sure you have your Supabase connection string:

```bash
export SUPABASE_DB_URL="postgresql://postgres:[password]@[host]:[port]/postgres"
```

### 2. Apply All Migrations

```bash
# Option 1: Use the shell script (recommended)
cd backend/sql
./apply_migrations.sh

# Option 2: Use npm script
cd backend
npm run migrate:sql

# Option 3: Apply manually with psql
psql $SUPABASE_DB_URL -f sql/apply_all_migrations.sql
```

### 3. Validate Setup

```bash
# Check that everything is working
npm run validate:db
```

## 📋 What Each Script Does

### triggers_and_functions.sql
- Creates functions to handle user authentication events
- Automatically creates/updates/deletes profiles when auth.users changes
- Replaces the Atlas HCL trigger definitions

### partial_unique_indexes.sql
- Creates partial unique indexes for ChallengeParticipant table
- Ensures users/teams can only join a challenge once
- Handles the complex constraint that Prisma doesn't support natively

### complete_rls_setup.sql
- Sets up Row Level Security (RLS) policies for all tables
- Ensures proper data access control based on authentication
- Covers all tables including new Milestone and MilestoneProgress tables

### validate_database.sql
- Checks that all tables exist
- Verifies RLS is enabled on all tables
- Counts policies per table
- Validates triggers and functions are created

## 🔐 Security Features

### Row Level Security (RLS) Policies

Each table has comprehensive RLS policies:

- **Profiles**: Users can only manage their own profiles
- **Teams**: Creators can manage their teams, members can view
- **Challenges**: Public viewing, creators can manage
- **Milestones**: Tied to challenge ownership
- **Activities**: Users can only manage their own activities
- **Posts & Comments**: Standard ownership-based access

### Triggers

- Automatic profile creation/update/deletion based on auth events
- Ensures data consistency between auth.users and public.profiles

## 🧪 Testing

After running migrations, verify everything works:

```bash
# Run validation
npm run validate:db

# Check specific features
psql $SUPABASE_DB_URL -c "SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public';"
psql $SUPABASE_DB_URL -c "SELECT * FROM pg_indexes WHERE indexname LIKE '%challengeparticipant%';"
```

## 🔄 Migration from Atlas

If you're migrating from Atlas:

1. ✅ Apply these SQL scripts (they will override existing Atlas-managed objects)
2. ✅ Remove Atlas configuration files (optional)
3. ✅ Update your deployment pipeline to use these SQL scripts instead of Atlas

## 🛠️ Maintenance

### Adding New Tables

When adding new tables via Prisma:

1. Run `prisma migrate dev` to create the table
2. Add RLS policies to `complete_rls_setup.sql`
3. Re-run the migration scripts

### Updating Policies

1. Modify `complete_rls_setup.sql`
2. Re-run: `./apply_migrations.sh`

### Troubleshooting

If migrations fail:

1. Check your `SUPABASE_DB_URL` environment variable
2. Ensure you have proper database permissions
3. Check the validation script output
4. Look for conflicting existing policies or objects

## 📚 References

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/triggers.html)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
