import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Validate URL format
try {
	new URL(supabaseUrl);
} catch {
	throw new Error('Invalid Supabase URL format');
}

// Create Supabase client with enhanced options
export const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
		flowType: 'pkce', // Use PKCE flow for better security
	},
	global: {
		headers: {
			'X-Client-Info': 'challengeme@1.0.0',
		},
	},
	realtime: {
		params: {
			eventsPerSecond: 10, // Limit realtime events
		},
	},
});
