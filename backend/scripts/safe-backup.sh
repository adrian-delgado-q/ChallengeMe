#!/bin/bash

# ==============================================================================
# Safe Supabase Backup & Restore Script
#
# Description:
#   This script safely creates compressed backups of a single Supabase
#   PostgreSQL database and can restore them with confirmation. It also
#   handles cleanup of old backups.
#
# Usage:
#   ./safe_backup.sh                    # Create a new backup
#   ./safe_backup.sh --restore <file>   # Restore from a specific file
#   ./safe_backup.sh --cleanup          # Delete backups older than 7 days
#
# Prerequisites:
#   - PostgreSQL client tools (`pg_dump`, `pg_restore`, `psql`) installed.
#   - A ~/.pgpass file configured to store the database password securely.
#   - Environment variables: SUPABASE_DB_URL
# ==============================================================================

## WARNING: This script needs pg_dump server and client versions to match.
## If you encounter version mismatch errors, please update your PostgreSQL
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

source "$SCRIPT_DIR/env-loader.sh"

# --- Configuration ---
# 💡 Set these from environment variables for better security and flexibility


BACKUP_DIR="./backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.dump"
RETENTION_DAYS=7 # Days to keep backups

# --- Helper: Check for required environment variables ---
check_env_vars() {
    if [ -z "$SUPABASE_DB_URL_STRING" ]; then
        echo "⚠️ Error: SUPABASE_DB_URL_STRING is not set. Please export it before running."
        exit 1
    fi
}

# --- Create Backup ---
create_backup() {
    check_env_vars
    mkdir -p "$BACKUP_DIR"
    local temp_file="${BACKUP_FILE}.tmp"

    echo "▶️ Starting backup of database ..."

    local safe_db_url
    safe_db_url=$(echo "$SUPABASE_DB_URL_STRING" | sed 's/:[^:]*@/@****@/')
    echo "Connecting to database: $safe_db_url"
    echo ""
    
    # Use pg_dump with custom format (-Fc) for efficiency and flexibility.
    # Output is piped to a temporary file.
    pg_dump "$SUPABASE_DB_URL_STRING" --format=custom > "$temp_file"

    # If the dump was successful, rename the temp file to the final backup file.
    mv "$temp_file" "$BACKUP_FILE"
    
    echo "✅ Backup created successfully: $BACKUP_FILE"
}

# --- Restore Backup ---
restore_backup() {
    check_env_vars
    local file_to_restore=$1

    if [ ! -f "$file_to_restore" ]; then
        echo "❌ Error: Backup file not found: $file_to_restore"
        exit 1
    fi

    echo "🚨 WARNING: You are about to restore the database from the file:"
    echo "   $file_to_restore"
    echo "   This is a DESTRUCTIVE operation and will WIPE the existing database."
    read -p "   Type 'YES' to proceed: " confirmation

    if [ "$confirmation" != "YES" ]; then
        echo "🛑 Restore cancelled."
        exit 0
    fi

    echo "▶️ Restoring database..."
    # Use pg_restore with --clean to drop existing objects before creating them.
    pg_restore --dbname="$SUPABASE_DB_URL_STRING" --clean --if-exists "$file_to_restore"

    echo "✅ Database restored successfully."
}

# --- Cleanup Old Backups ---
cleanup_backups() {
    echo "🧹 Cleaning up backups older than $RETENTION_DAYS days in $BACKUP_DIR..."
    
    # Find and delete files ending in .dump that are older than RETENTION_DAYS
    find "$BACKUP_DIR" -type f -name "*.dump" -mtime +$RETENTION_DAYS -print -delete
    
    echo "✅ Cleanup complete."
}


# --- Main Execution Logic ---
if [ "$#" -eq 0 ]; then
    create_backup
    cleanup_backups
elif [ "$1" == "--restore" ]; then
    if [ -z "${2:-}" ]; then
        echo "Usage: $0 --restore <path_to_backup_file.dump>"
        exit 1
    fi
    restore_backup "$2"
elif [ "$1" == "--cleanup" ]; then
    cleanup_backups
else
    echo "Invalid option: $1"
    echo "Usage: $0 [--restore <file> | --cleanup]"
    exit 1
fi