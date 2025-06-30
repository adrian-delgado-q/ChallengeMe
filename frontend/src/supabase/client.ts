import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCurrentUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session) throw new Error('Session not found');

  const { access_token: accessToken, expires_at: expiresAt } = session;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!accessToken || (expiresAt && currentTime >= expiresAt)) {
    throw new Error('User not authenticated or token expired');
  }

  return session.user;
}

export async function getAccessToken() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;

  return session?.access_token;
}