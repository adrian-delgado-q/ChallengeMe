import { authService } from '../services/optimizedAuthService';

/**
 * Enhanced error handler for authentication-related errors
 * Provides better error messages and potential recovery actions
 */
export function handleAuthError(error: any, operation: string = 'operation'): never {
	console.error(`Auth error during ${operation}:`, error);

	let message = 'An authentication error occurred';
	let shouldSignOut = false;

	if (error?.message) {
		const errorMsg = error.message.toLowerCase();

		if (
			errorMsg.includes('invalid refresh token') ||
			errorMsg.includes('refresh token') ||
			errorMsg.includes('jwt expired') ||
			errorMsg.includes('invalid jwt')
		) {
			message = 'Your session has expired. Please sign in again.';
			shouldSignOut = true;
		} else if (errorMsg.includes('email not confirmed')) {
			message = 'Please check your email and confirm your account before continuing.';
		} else if (errorMsg.includes('invalid login credentials')) {
			message = 'Invalid email or password. Please check your credentials.';
		} else if (errorMsg.includes('user not found')) {
			message = 'No account found with this email address.';
		} else if (errorMsg.includes('email already registered')) {
			message = 'An account with this email already exists. Try signing in instead.';
		} else if (errorMsg.includes('password should be at least')) {
			message = 'Password should be at least 6 characters long.';
		} else if (errorMsg.includes('network')) {
			message = 'Network error. Please check your internet connection and try again.';
		} else if (errorMsg.includes('timeout')) {
			message = 'Request timed out. Please try again.';
		} else if (error.status === 400) {
			message = 'Bad request. Please check your input and try again.';
		} else if (error.status === 401) {
			message = 'Authentication failed. Please sign in again.';
			shouldSignOut = true;
		} else if (error.status === 403) {
			message = 'Access denied. You may not have permission for this action.';
		} else if (error.status === 429) {
			message = 'Too many requests. Please wait a moment before trying again.';
		} else {
			message = error.message;
		}
	}

	// Clean up invalid sessions
	if (shouldSignOut) {
		authService.signOut().catch(signOutError => {
			console.error('Error during cleanup sign out:', signOutError);
		});
	}

	const enhancedError = new Error(message);
	(enhancedError as any).originalError = error;
	(enhancedError as any).shouldSignOut = shouldSignOut;

	throw enhancedError;
}

/**
 * Validates the current session and user state
 * Attempts to recover from common authentication issues
 */
export async function validateAuthState(): Promise<{ isValid: boolean; shouldRefresh: boolean }> {
	try {
		const { session, error } = await authService.getSession();

		if (error) {
			console.error('Auth state validation error:', error);
			return { isValid: false, shouldRefresh: false };
		}

		if (!session) {
			return { isValid: false, shouldRefresh: false };
		}

		// Check if session is about to expire (within 5 minutes)
		const now = Math.floor(Date.now() / 1000);
		const expiresAt = session.expires_at || 0;
		const timeUntilExpiry = expiresAt - now;

		if (timeUntilExpiry < 300) {
			// Less than 5 minutes
			return { isValid: true, shouldRefresh: true };
		}

		return { isValid: true, shouldRefresh: false };
	} catch (error) {
		console.error('Auth state validation failed:', error);
		return { isValid: false, shouldRefresh: false };
	}
}

/**
 * Attempts to refresh an expired or expiring session
 */
export async function refreshAuthSession(): Promise<boolean> {
	try {
		const { session, error } = await authService.refreshSession();

		if (error || !session) {
			console.error('Session refresh failed:', error);
			return false;
		}

		console.log('Session refreshed successfully');
		return true;
	} catch (error) {
		console.error('Session refresh failed:', error);
		return false;
	}
}

/**
 * Comprehensive authentication check with automatic recovery
 * Use this before critical operations that require authentication
 */
export async function ensureAuthentication(): Promise<void> {
	const { isValid, shouldRefresh } = await validateAuthState();

	if (!isValid) {
		throw new Error('User not authenticated. Please sign in.');
	}

	if (shouldRefresh) {
		const refreshed = await refreshAuthSession();
		if (!refreshed) {
			throw new Error('Session expired and could not be refreshed. Please sign in again.');
		}
	}
}
