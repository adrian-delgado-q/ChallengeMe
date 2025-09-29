import { supabase } from '../supabase/client';
import { authService } from '../services/optimizedAuthService';

/**
 * Ensures that a user profile exists in the database
 * Creates one if it doesn't exist with proper default values
 * This should be called before any operation that requires a profile reference
 */
export async function ensureUserProfile(userId?: string): Promise<void> {
	const user = userId ? { id: userId } : await authService.getCurrentUser();
	if (!user) throw new Error('User not authenticated');

	// Check if profile exists
	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('id')
		.eq('id', user.id)
		.maybeSingle();

	if (profileError) throw profileError;

	if (!profile) {
		// Create profile if it doesn't exist with all required fields
		const { error: createProfileError } = await supabase.from('profiles').insert({
			id: user.id,
			username: null, // This will trigger the database function to generate a unique username
			avatar_url: null, // This will trigger the database function to generate a random avatar
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});

		if (createProfileError) {
			// If this fails due to constraint violations, the user might have been created
			// by a trigger in the meantime, so we'll ignore duplicate key errors
			if (!createProfileError.code?.includes('23505')) {
				// Not a unique violation
				throw createProfileError;
			}
		}
	}
}

/**
 * Ensures profile exists and returns the profile data
 * Useful when you need both profile verification and data
 */
export async function ensureAndGetUserProfile(userId?: string): Promise<any> {
	await ensureUserProfile(userId);

	const user = userId ? { id: userId } : await authService.getCurrentUser();
	if (!user) throw new Error('User not authenticated');

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	if (error) throw error;
	return profile;
}
