// Define the 'public' schema to provide context for the functions and triggers below.
// When Atlas merges this with the Prisma schema, the tables from Prisma will be
// added to this schema block.
schema "public" {
}

// PostgreSQL Functions to sync public.profiles with auth.users

function "handle_new_user" {
  schema   = schema.public
  lang     = "plpgsql"
  returns  = "trigger"
  security = "definer" // SECURITY DEFINER is required for triggers on auth.users
  body     = <<-SQL
    BEGIN
      INSERT INTO public.profiles (id, username, avatar_url, created_at, updated_at)
      VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'username',
        NEW.raw_user_meta_data->>'avatar_url', -- Sync avatar_url on creation
        NOW(),
        NOW()
      );
      RETURN NEW;
    END;
  SQL
}

function "handle_updated_user" {
  schema   = schema.public
  lang     = "plpgsql"
  returns  = "trigger"
  security = "definer"
  body     = <<-SQL
    BEGIN
      UPDATE public.profiles
      SET
        username = NEW.raw_user_meta_data->>'username',
        avatar_url = NEW.raw_user_meta_data->>'avatar_url', -- Sync avatar_url on update
        updated_at = NOW()
      WHERE id = NEW.id;
      RETURN NEW;
    END;
  SQL
}

function "handle_delete_user" {
  schema   = schema.public
  lang     = "plpgsql"
  returns  = "trigger"
  security = "definer"
  body     = <<-SQL
    BEGIN
      DELETE FROM public.profiles WHERE id = OLD.id;
      RETURN OLD;
    END;
  SQL
}


// PostgreSQL Triggers

trigger "on_auth_user_created" {
  schema       = schema.public      // The trigger object lives in 'public'
  table        = sql("auth.users")  // But it's attached to the 'auth.users' table
  events       = ["INSERT"]         // Replaces 'on' for clarity
  timing       = "AFTER"            // Explicitly set the timing
  for_each_row = true
  execute      = function.handle_new_user
}

trigger "on_auth_user_updated" {
  schema       = schema.public
  table        = sql("auth.users")
  events       = ["UPDATE"]
  timing       = "AFTER"
  for_each_row = true
  execute      = function.handle_updated_user
}

trigger "on_auth_user_deleted" {
  schema       = schema.public
  table        = sql("auth.users")
  events       = ["DELETE"]
  timing       = "AFTER"
  for_each_row = true
  execute      = function.handle_delete_user
}


// Advanced Indexes managed by Atlas

// Get a reference to the ChallengeParticipant table defined in the Prisma schema.
table "ChallengeParticipant" {
  schema = schema.public
  // These partial unique indexes correctly enforce that a user/team can only join a challenge once.
  // A standard unique constraint would fail because multiple NULL entries are not considered unique.
  index "idx_challengeparticipant_challengeid_userid_unique" {
    unique  = true
    on {
      columns = [column "challengeId", column "userId"]
    }
    where = "\"userId\" IS NOT NULL"
  }
  index "idx_challengeparticipant_challengeid_teamid_unique" {
    unique  = true
    on {
      columns = [column "challengeId", column "teamId"]
    }
    where = "\"teamId\" IS NOT NULL"
  }
}