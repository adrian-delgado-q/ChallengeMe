-- Modify "handle_new_user" function
CREATE OR REPLACE FUNCTION "public"."handle_new_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
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
$$;
-- Modify "handle_updated_user" function
CREATE OR REPLACE FUNCTION "public"."handle_updated_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.profiles
  SET
    username = NEW.raw_user_meta_data->>'username',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;
