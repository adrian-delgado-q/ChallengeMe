#!/bin/bash

# ==============================================================================
# PRISMA & SUPABASE BASELINE SCRIPT
# ==============================================================================
# This script automates the process of resetting the local Prisma migration
# state and creating a clean, accurate baseline from an existing Supabase
# database.
#
# It is designed to fix "Drift detected" errors that occur when Prisma's
# migration history does not match the actual state of the Supabase DB.
#
# Run this from the root of your project.
# ==============================================================================

# Exit immediately if any command fails
set -e

echo "🚀 Starting Supabase & Prisma baseline process..."
echo

# --- STEP 1: CLEAN UP ---
echo "STEP 1: Cleaning up previous Prisma state (deleting migrations and schema.prisma)..."
rm -rf prisma/migrations
echo "✅ Cleanup complete."
echo

# --- STEP 3: INTROSPECT THE DATABASE ---
echo "STEP 3: Introspecting the database with 'prisma db pull'. This may take a moment..."
npx prisma db pull
echo "✅ Database introspected. Your 'prisma/schema.prisma' file is now a complete reflection of your database."
echo

# --- STEP 4: CREATE THE BASELINE MIGRATION FILE ---
echo "STEP 4: Creating a baseline migration file from the introspected schema..."
# Create the directory for the initial migration
mkdir -p prisma/migrations/0_init

# Generate the SQL script that represents the entire current DB state
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
echo "✅ Baseline migration file '0_init' created."
echo

# --- STEP 5: MARK THE BASELINE AS APPLIED ---
echo "STEP 5: Marking the baseline migration as applied with 'prisma migrate resolve'..."
npx prisma migrate resolve --applied 0_init
echo "✅ Baseline marked as applied in the database."
echo

# --- FINAL SUCCESS MESSAGE ---
echo "🎉 SUCCESS! Your Prisma project is now correctly baselined with your Supabase database."
echo
echo "----------------------------------------------------------------------------------"
echo "NEXT STEP: To verify that everything is in sync, run the following command:"
npx prisma migrate dev
echo
echo "You should see the message: 'Your database is already in sync with your schema.'"
echo "----------------------------------------------------------------------------------"