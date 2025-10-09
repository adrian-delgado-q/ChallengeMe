#!/bin/bash

# ==============================================================================
# ChallengeMe - Production Database Migration Script
#
# Description:
#   Applies SQL migrations to the database in a consistent, ordered, and
#   automated manner. It's designed to be robust for both local development
#   and CI/CD environments.
#
# Usage:
#   ./migrate.sh
#
# Prerequisites:
#   - `psql` (PostgreSQL client) must be installed and in the system's PATH.
#   - A `SUPABASE_DB_URL` environment variable must be set, or a .env file
#     must be present in this script's directory or the parent directory.
#
# File Structure Convention:
#   - Ordered migrations: Place in the same directory as the script.
#     Must be prefixed with a number (e.g., `01_setup.sql`, `02_functions.sql`).
#   - Views: Place all view definitions in a `views/` subdirectory.
#   - Validation: A final check script can be named `99_validation.sql`.
# ==============================================================================

# --- Strict Mode & Error Handling ---
# set -e: Exit immediately if a command exits with a non-zero status.
# set -u: Treat unset variables as an error when substituting.
# set -o pipefail: The return value of a pipeline is the status of the last
#                  command to exit with a non-zero status, or zero if no
#                  command exited with a non-zero status.
set -euo pipefail

# --- Script Directory ---
# Find the script's own directory to reliably locate other files.
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# --- Configuration ---
# Add directories here. They will be processed in the order they are listed.
# Files within each directory will be sorted alphabetically.
MIGRATION_DIRS=(
    "."         # Root directory for numbered migration files
    "views"     # Subdirectory for all view definitions
)
VALIDATION_FILE="99_validation.sql"

# --- Colors & Logging ---
# Use tput to check for color support and set color variables.
if tput setaf 1 &> /dev/null; then
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    BOLD=$(tput bold)
    NC=$(tput sgr0) # No Color
else
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    BOLD=""
    NC=""
fi

# Logging functions for consistent output
log_info() { echo -e "${BLUE}${BOLD}INFO:${NC} $1"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠️ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
die() { log_error "$1"; exit 1; }

# --- Helper Functions ---

# Checks for required command-line tools.
check_dependencies() {
    if ! command -v psql &> /dev/null; then
        die "psql is not installed or not in your PATH. Please install the PostgreSQL client."
    fi
}

# Loads environment variables from .env files.
load_env() {
    # Default env file location for Vite projects
    ENV_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
    ENV_FILE="$ENV_ROOT/.env"

    # If running via npx, allow NODE_ENV to select .env.production or .env.development
    if [ -n "${NODE_ENV:-}" ]; then
        if [ "$NODE_ENV" = "production" ] && [ -f "$ENV_ROOT/.env.production" ]; then
            ENV_FILE="$ENV_ROOT/.env.production"
        elif [ "$NODE_ENV" = "development" ] && [ -f "$ENV_ROOT/.env.development" ]; then
            ENV_FILE="$ENV_ROOT/.env.development"
        fi
    fi

    if [ -f "$ENV_FILE" ]; then
        log_info "Loading environment variables from $(basename "$ENV_FILE")"
        set -a
        source "$ENV_FILE"
        set +a
    else
        log_warn "Environment file ($ENV_FILE) not found. Skipping env loading."
    fi
}

# Applies a single SQL file using psql.
# Globals: SUPABASE_DB_URL
# Arguments:
#   $1: Path to the SQL file to apply.
apply_sql_file() {
    local file_path="$1"
    local file_name
    file_name=$(basename "$file_path")

    echo -e "${YELLOW}📄 Applying ${file_name}...${NC}"
    
    # The `|| die ...` construct handles errors gracefully due to `set -e`.
    psql "$SUPABASE_DB_URL" --quiet --single-transaction --file "$file_path"
    
    log_success "${file_name} applied successfully."
}

# --- Main Execution Logic ---
main() {
    check_dependencies
    
    echo -e "${GREEN}${BOLD}🚀 ChallengeMe Database Migration${NC}"
    echo "=================================="

    load_env

    exit 0
    
    # Ensure database URL is set
    if [ -z "${SUPABASE_DB_URL:-}" ]; then
        die "SUPABASE_DB_URL is not set. Please define it in your environment or a .env file."
    fi

    # Redact password for safe logging
    local safe_db_url
    safe_db_url=$(echo "$SUPABASE_DB_URL" | sed 's/:[^:]*@/@****@/')
    log_info "Connecting to database: $safe_db_url"
    echo ""

    # --- Discover and Run Migrations ---
    log_info "Discovering and running migration files..."
    
    local migration_files=()
    for dir in "${MIGRATION_DIRS[@]}"; do
        local full_path="$SCRIPT_DIR/$dir"
        if [ -d "$full_path" ]; then
            # Find all .sql files in the directory, add them to the list
            while IFS= read -r file; do
                migration_files+=("$file")
            done < <(find "$full_path" -maxdepth 1 -name "*.sql" -not -name "$VALIDATION_FILE" | sort)
        else
            log_warn "Directory '$dir' not found, skipping."
        fi
    done
    
    if [ ${#migration_files[@]} -eq 0 ]; then
        log_warn "No migration files found. Nothing to apply."
    else
        for file in "${migration_files[@]}"; do
            apply_sql_file "$file"
            echo ""
        done
    fi
    
    # --- Run Validation ---
    local validation_path="$SCRIPT_DIR/$VALIDATION_FILE"
    if [ -f "$validation_path" ]; then
        log_info "🔍 Running validation checks..."
        apply_sql_file "$validation_path"
        echo ""
    else
        log_warn "Validation file ($VALIDATION_FILE) not found, skipping."
    fi
    
    # --- Final Summary ---
    echo ""
    log_success "🎉 All database migrations completed successfully!"
    echo -e "${GREEN}   Your database is ready for ChallengeMe!${NC}"
}

# Run the main function
# The `trap` ensures the error message is more informative on failure.
trap 'die "An error occurred on line $LINENO. Aborting."' ERR
main