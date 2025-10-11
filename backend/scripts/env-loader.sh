#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# --- Load Environment Variables ---
ENV_ROOT="$(cd "$SCRIPT_DIR/../../.env" && pwd)"
ENV_FILE="$ENV_ROOT/.env"

if [ -n "${NODE_ENV:-}" ]; then
    if [ "$NODE_ENV" = "production" ] && [ -f "$ENV_ROOT/.env.production" ]; then
        ENV_FILE="$ENV_ROOT/.env.production"
    elif [ "$NODE_ENV" = "development" ] && [ -f "$ENV_ROOT/.env.development" ]; then
        ENV_FILE="$ENV_ROOT/.env.development"
    fi
fi

if [ -f "$ENV_FILE" ]; then
    echo "Loading environment variables from $(basename "$ENV_FILE")"
    set -a
    source "$ENV_FILE"
    set +a
else
    echo "Warning: Environment file ($ENV_FILE) not found. Skipping env loading."
fi