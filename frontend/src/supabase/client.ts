import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for placeholder values
const isPlaceholder = !supabaseUrl || 
  supabaseUrl.includes('your-project-id') || 
  supabaseUrl === 'https://your-project-id.supabase.co';

// Enhanced error checking with debugging info
if (!supabaseUrl || !supabaseKey || isPlaceholder) {
  console.warn('⚠️ Supabase Environment Variables Not Configured:');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl);
  console.warn('VITE_SUPABASE_ANON_KEY exists:', !!supabaseKey);
  console.warn('Is placeholder:', isPlaceholder);
  console.warn('Please check QUICK_AUTH_SETUP.md for setup instructions.');
}

// Validate URL format only if not placeholder
if (supabaseUrl && !isPlaceholder && !supabaseUrl.startsWith('http')) {
  console.error(
    `Invalid Supabase URL format: ${supabaseUrl}. ` +
    'URL should start with https:// (for cloud) or http:// (for local).'
  );
}

// Create client with fallback values to prevent module loading errors
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeo-f_1drlZUr5xpQWAJSvbCt0rWkXhE8qY';

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseKey || fallbackKey
);

// Flag to track if Supabase is properly configured
export const isSupabaseConfigured = !isPlaceholder && !!supabaseUrl && !!supabaseKey;

// Add connection test function for debugging
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured) {
    return { 
      success: false, 
      error: 'Supabase not configured. Please update environment variables.' 
    };
  }

  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error: error.message };
    }
    console.log('Supabase connection test successful');
    return { success: true, data };
  } catch (err: any) {
    console.error('Supabase connection test error:', err);
    return { success: false, error: err.message };
  }
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase not configured. Please update environment variables.');
  }

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Auth session error:', error);
      throw new Error(`Authentication error: ${error.message}`);
    }
    if (!session) {
      // This is normal when user is not logged in
      return null;
    }

    const { access_token: accessToken, expires_at: expiresAt } = session;
    const currentTime = Math.floor(Date.now() / 1000);

    if (!accessToken || (expiresAt && currentTime >= expiresAt)) {
      console.warn('User token expired or invalid');
      throw new Error('User not authenticated or token expired');
    }

    return session.user;
  } catch (err: any) {
    console.error('getCurrentUser error:', err);
    throw err;
  }
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