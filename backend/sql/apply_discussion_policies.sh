#!/bin/bash
# Script to apply discussion RLS policies to Supabase
# Make sure you have the Supabase CLI installed and authenticated

echo "Applying Discussion RLS Policies..."

# Check if supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI not found. Please install it or run the SQL manually in your Supabase dashboard."
    echo "SQL file: ./06_discussion_rls_policies.sql"
    exit 1
fi

# Apply the SQL file
if [ -f "./06_discussion_rls_policies.sql" ]; then
    supabase db reset --db-url "$SUPABASE_DB_URL" --file ./06_discussion_rls_policies.sql
    echo "RLS policies applied successfully!"
else
    echo "SQL file not found: ./06_discussion_rls_policies.sql"
    exit 1
fi
