#!/bin/bash

# Apply SQL migrations to Supabase database
# This script replaces Atlas functionality with pure SQL

set -e

# Load environment variables
if [ -f ../.env ]; then
    source ../.env
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting ChallengeMe SQL migration...${NC}"

# Check if SUPABASE_DB_URL is set
if [ -z "$SUPABASE_DB_URL" ]; then
    echo -e "${RED}Error: SUPABASE_DB_URL environment variable is not set${NC}"
    echo "Please set it in your .env file or export it:"
    echo "export SUPABASE_DB_URL='your_supabase_connection_string'"
    exit 1
fi

# Change to the sql directory
cd "$(dirname "$0")"

echo -e "${YELLOW}Applying partial unique indexes...${NC}"
psql "$SUPABASE_DB_URL" -f partial_unique_indexes.sql

echo -e "${YELLOW}Applying triggers and functions...${NC}"
psql "$SUPABASE_DB_URL" -f triggers_and_functions.sql

echo -e "${YELLOW}Updating existing users with random usernames...${NC}"
if [ -f update_existing_users.sql ]; then
    psql "$SUPABASE_DB_URL" -f update_existing_users.sql
else
    echo -e "${YELLOW}Update existing users file not found, skipping...${NC}"
fi

echo -e "${YELLOW}Applying RLS policies...${NC}"
# Use ON_ERROR_STOP=0 to continue despite existing policy errors
PGOPTIONS='--client-min-messages=warning' psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=0 -f complete_rls_setup.sql

echo -e "${GREEN}✅ All migrations applied successfully!${NC}"
echo -e "${YELLOW}Note: Some policy 'already exists' errors are normal and can be ignored.${NC}"