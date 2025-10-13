#!/bin/bash

# ==============================================================================
# ChallengeMe - Production Database Migration Script
#
# Description:
#   Applies or reverts SQL migrations using dbmate.
#
# Usage:
#   ./migrate-sql.sh [up|down|revert]
#
#   up:     Applies all pending migrations.
#   down:   Reverts the most recent migration.
#   revert: Alias for down.
#
# Prerequisites:
#   - `dbmate` must be installed and in the system's PATH.
#   - A `DATABASE_URL` environment variable must be set, or a .env file
#     must be present.
# ==============================================================================

# --- Strict Mode & Error Handling ---
set -euo pipefail

# --- Script Directory ---
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

BACKEND_ROOT=$(dirname "$SCRIPT_DIR")

# --- Configuration ---
MIGRATIONS_DIR="${BACKEND_ROOT}/database/sql"
DATABASE_DIR="${BACKEND_ROOT}/database/db"

# --- Colors & Logging ---
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

log_info() { echo -e "${BLUE}${BOLD}INFO:${NC} $1"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠️ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
die() { log_error "$1"; exit 1; }

# --- Helper Functions ---

check_dependencies() {
    if ! command -v dbmate &> /dev/null; then
        die "dbmate is not installed or not in your PATH. Please install dbmate."
    fi
}

# --- Main Execution Logic ---
main() {
    check_dependencies

    echo -e "${GREEN}${BOLD}🚀 ChallengeMe Database Migration (dbmate)${NC}"
    echo "============================================"

    source "$SCRIPT_DIR/env-loader.sh"

    if [ -z "${SUPABASE_DB_URL_STRING:-}" ]; then
        die "SUPABASE_DB_URL_STRING is not set. Please define it in your environment or a .env file."
    fi

    export DATABASE_URL="$SUPABASE_DB_URL_STRING"

    local safe_db_url
    safe_db_url=$(echo "$DATABASE_URL" | sed 's/:[^:]*@/@****@/')
    log_info "Connecting to database: $safe_db_url"
    log_info "Migrations directory: $MIGRATIONS_DIR"
    echo ""

    local action=${1:-up}

    case "$action" in
        up)
            log_info "Applying all pending migrations..."
            dbmate --url "$DATABASE_URL" --migrations-dir "$MIGRATIONS_DIR" --schema-file "$DATABASE_DIR" up
            log_success "🎉 All pending migrations applied successfully!"
            ;;
        down|revert)
            log_info "Reverting the most recent migration..."
            dbmate --url "$DATABASE_URL" --migrations-dir "$MIGRATIONS_DIR" --schema-file "$DATABASE_DIR" down
            log_success "🎉 The most recent migration was reverted successfully."
            ;;
        *)
            die "Invalid command: '$action'. Use 'up', 'down', or 'revert'."
            ;;
    esac
}

trap 'die "An error occurred on line $LINENO. Aborting."' ERR
main "$@"
