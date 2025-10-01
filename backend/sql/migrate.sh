#!/bin/bash

# ChallengeMe Database Migration Script
# This script applies all database changes using organized SQL files

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 ChallengeMe Database Migration${NC}"
echo "=================================="
echo -e "${YELLOW}📋 This script applies SQL features (RLS, triggers, constraints, views)${NC}"
echo -e "${YELLOW}📋 Make sure to run 'npx prisma db push' first for schema!${NC}"
echo ""

# Check if we have the required environment variables
if [ -z "$SUPABASE_DB_URL" ]; then
    echo -e "${YELLOW}⚠️  SUPABASE_DB_URL not found in environment.${NC}"
    echo "   Attempting to load from .env file..."
    
    if [ -f "../.env" ]; then
        source ../.env
        echo -e "${GREEN}✅ Loaded environment from .env${NC}"
    elif [ -f ".env" ]; then
        source .env
        echo -e "${GREEN}✅ Loaded environment from .env${NC}"
    else
        echo -e "${RED}❌ No SUPABASE_DB_URL found. Please set it in your environment or .env file.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}📊 Database:${NC} $(echo $SUPABASE_DB_URL | sed 's/:[^:]*@/@****@/')"
echo ""

# Define migration files in order
MIGRATION_FILES=(
    "01_schema_enhancements.sql"
    "02_functions.sql"
    "03_triggers.sql"
    "04_rls_policies.sql"
    "05_progress_aggregation.sql"
    "06_discussion_rls_policies.sql"
    "07_fix_updated_at_defaults.sql"
    "08_storage_setup.sql"
)

# Run migrations in order
echo -e "${BLUE}🔄 Running database migrations...${NC}"
echo ""

for file in "${MIGRATION_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${YELLOW}📄 Applying $file...${NC}"
        psql "$SUPABASE_DB_URL" -f "$file" || {
            echo -e "${RED}❌ Failed to apply $file${NC}"
            exit 1
        }
        echo -e "${GREEN}✅ $file applied successfully${NC}"
        echo ""
    else
        echo -e "${RED}❌ File $file not found!${NC}"
        exit 1
    fi
done

# Apply all views from the views folder
echo -e "${BLUE}🔄 Applying views...${NC}"
echo ""

# Initialize empty array for views
VIEWS_FILES=()

# Check if views directory exists and has SQL files
if [ -d "views" ]; then
    # Add all SQL files from views directory to array
    for view_file in views/*.sql; do
        # Check if the glob matched any files (avoid adding the literal pattern if no files exist)
        if [ -f "$view_file" ]; then
            VIEWS_FILES+=("$view_file")
        fi
    done
    
    # Apply views if any were found
    if [ ${#VIEWS_FILES[@]} -gt 0 ]; then
        # Sort views files to ensure consistent ordering (optional but recommended)
        IFS=$'\n' VIEWS_FILES=($(sort <<<"${VIEWS_FILES[*]}"))
        unset IFS
        
        for view in "${VIEWS_FILES[@]}"; do
            echo -e "${YELLOW}📄 Applying $(basename "$view")...${NC}"
            psql "$SUPABASE_DB_URL" -f "$view" || {
                echo -e "${RED}❌ Failed to apply $view${NC}"
                exit 1
            }
            echo -e "${GREEN}✅ $(basename "$view") applied successfully${NC}"
            echo ""
        done
    else
        echo -e "${YELLOW}⚠️ No SQL files found in views/ directory${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Views directory not found, skipping views${NC}"
fi

# Run validation
echo -e "${BLUE}🔍 Running validation checks...${NC}"
if [ -f "99_validation.sql" ]; then
    psql "$SUPABASE_DB_URL" -f "99_validation.sql"
    echo ""
else
    echo -e "${YELLOW}⚠️ Validation file not found, skipping validation${NC}"
fi

echo ""
echo -e "${GREEN}🎉 All SQL migrations and views completed successfully!${NC}"
echo -e "${GREEN}   ✅ Schema Enhancements: Applied${NC}"
echo -e "${GREEN}   ✅ Functions: Created${NC}"
echo -e "${GREEN}   ✅ Triggers: Configured${NC}"
echo -e "${GREEN}   ✅ RLS Policies: Applied${NC}"
echo -e "${GREEN}   ✅ Progress Aggregation: Enabled${NC}"
echo -e "${GREEN}   ✅ Views: Applied (${#VIEWS_FILES[@]} view(s))${NC}"
echo -e "${GREEN}   🚀 Your database is ready for ChallengeMe!${NC}"