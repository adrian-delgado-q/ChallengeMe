schema "public" {}
schema "auth" {}

table "users" {
  schema = schema.auth
  column "id" {
    type = uuid
    null = false
  }
  primary_key {
    columns = [column.id]
  }
}

function "handle_new_user" {
  schema   = schema.public
  lang     = PLpgSQL
  return   = trigger
  security = "DEFINER"

  as = <<-SQL
    BEGIN
      INSERT INTO public.profiles (id, username, avatar_url, created_at, updated_at)
      VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'username',
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
      );
      RETURN NEW;
    END;
  SQL
}

function "handle_updated_user" {
  schema   = schema.public
  lang     = PLpgSQL
  return   = trigger
  security = "DEFINER"

  as = <<-SQL
    BEGIN
      UPDATE public.profiles
      SET
        username = NEW.raw_user_meta_data->>'username',
        avatar_url = NEW.raw_user_meta_data->>'avatar_url',
        updated_at = NOW()
      WHERE id = NEW.id;
      RETURN NEW;
    END;
  SQL
}

function "handle_delete_user" {
  schema   = schema.public
  lang     = PLpgSQL
  return   = trigger
  security = "DEFINER"

  as = <<-SQL
    BEGIN
      DELETE FROM public.profiles WHERE id = OLD.id;
      RETURN OLD;
    END;
  SQL
}

trigger "on_auth_user_created" {
  on = table.users
  after {
    insert = true
  }
  foreach = ROW
  execute {
    function = function.handle_new_user
  }
}

trigger "on_auth_user_updated" {
  on = table.users
  after {
    update = true
  }
  foreach = ROW
  execute {
    function = function.handle_updated_user
  }
}

trigger "on_auth_user_deleted" {
  on = table.users
  after {
    delete = true
  }
  foreach = ROW
  execute {
    function = function.handle_delete_user
  }
}