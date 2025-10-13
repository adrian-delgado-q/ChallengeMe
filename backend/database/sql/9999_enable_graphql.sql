-- migrate:up
-- RLS Policies for Database Views
-- =============================================================================
-- Grant necessary permissions to authenticated users ONLY for all views

-- 1️⃣ Ensure required schemas exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- 2️⃣ Ensure required extensions exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_graphql;

-- 3️⃣ Grant usage on schemas to necessary roles
GRANT USAGE ON SCHEMA public TO postgres, authenticated, service_role;
GRANT USAGE ON SCHEMA extensions TO postgres, authenticated, service_role;

-- 4️⃣ Grant privileges on existing objects
-- Tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated, service_role;

-- migrate:down
-- Revoke usage on schemas from roles
REVOKE USAGE ON SCHEMA public FROM postgres, authenticated, service_role;
REVOKE USAGE ON SCHEMA extensions FROM postgres, authenticated, service_role;
-- Drop extensions
DROP EXTENSION IF EXISTS pg_graphql;
DROP EXTENSION IF EXISTS pgjwt;
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS "uuid-ossp";

-- Revoke privileges on existing objects
-- Tables
REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM authenticated, service_role;

-- Drop schema if empty
DROP SCHEMA IF EXISTS extensions CASCADE;
