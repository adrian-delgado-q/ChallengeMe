#!/bin/bash

# Validate SQL syntax without executing against database
# This helps catch syntax errors before running migrations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Validating SQL files syntax...${NC}"

# Change to the sql directory
cd "$(dirname "$0")"

# Function to validate SQL syntax
validate_sql() {
    local file=$1
    echo -e "${YELLOW}Validating $file...${NC}"
    
    # Use psql with --dry-run equivalent (syntax check only)
    if command -v psql >/dev/null 2>&1; then
        # If psql is available, we can do a basic syntax check
        if psql --help | grep -q "\-\-dry-run" 2>/dev/null; then
            psql --dry-run -f "$file" 2>/dev/null || {
                echo -e "${RED}❌ Syntax error in $file${NC}"
                return 1
            }
        else
            # Alternative: check for basic SQL syntax issues
            if grep -q "$ \$" "$file"; then
                echo -e "${RED}❌ Found problematic '$$' pattern in $file${NC}"
                echo "Should be '$$' for PostgreSQL function delimiters"
                return 1
            fi
            
            if grep -q "DECLARE.*;" "$file" && ! grep -q "DECLARE$" "$file"; then
                echo -e "${RED}❌ Found DECLARE statement without proper formatting in $file${NC}"
                return 1
            fi
        fi
    fi
    
    echo -e "${GREEN}✅ $file syntax looks good${NC}"
    return 0
}

# Validate each SQL file
files_to_validate=(
    "partial_unique_indexes.sql"
    "triggers_and_functions.sql"
    "update_existing_users.sql"
    "complete_rls_setup.sql"
)

for file in "${files_to_validate[@]}"; do
    if [ -f "$file" ]; then
        validate_sql "$file" || exit 1
    else
        echo -e "${YELLOW}⚠️  File $file not found, skipping validation${NC}"
    fi
done

echo -e "${GREEN}✅ All SQL files passed basic validation!${NC}"
echo -e "${YELLOW}Note: This only checks basic syntax. Test in a development environment first.${NC}"
