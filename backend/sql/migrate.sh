#!/bin/bash

# ChallengeMe Database Migration Script
# This script applies all database changes using the consolidated SQL files

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 ChallengeMe Database Migration${NC}"
echo "=================================="
echo -e "${YELLOW}📋 This script applies SQL features (RLS, triggers, constraints)${NC}"
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

# Run the migration
echo -e "${YELLOW}🔄 Running database migration...${NC}"
psql "$SUPABASE_DB_URL" -f apply_migrations.sql

echo ""
echo -e "${GREEN}🎉 SQL migration completed successfully!${NC}"
echo -e "${GREEN}   Schema: Managed by Prisma${NC}"
echo -e "${GREEN}   SQL Features: Applied successfully${NC}"
echo -e "${GREEN}   Your database is ready for ChallengeMe!${NC}"
