/**
 * Enhanced Auth Hook with Singleton Pattern and Exponential Backoff
 *
 * This hook provides a convenient interface to the singleton auth service
 * and includes additional utilities for common auth operations.
 */

import { useState, useCallback } from 'react';
import { authService } from '../services/optimizedAuthService';
import type {
	SignInCredentials,
	SignUpCredentials,
	AuthResult,
} from '../services/optimizedAuthService';

export interface UseAuthReturn {
	// State
	isLoading: boolean;
	error: string | null;

	// Actions
	signIn: (credentials: SignInCredentials) => Promise<AuthResult>;
	signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
	signInWithGoogle: () => Promise<AuthResult>;
	signInWithGithub: () => Promise<AuthResult>;
	signOut: () => Promise<void>;
	resetPassword: (email: string) => Promise<boolean>;
	updatePassword: (password: string) => Promise<boolean>;
	refreshSession: () => Promise<AuthResult>;
	getCurrentUser: () => Promise<AuthResult>;

	// Utilities
	clearError: () => void;
}

/**
 * Enhanced auth hook with singleton pattern and exponential backoff
 */
export function useAuth(): UseAuthReturn {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const handleAuthOperation = useCallback(
		async <T>(operation: () => Promise<T>, successMessage?: string): Promise<T> => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await operation();

				if (successMessage) {
					console.log(successMessage);
				}

				return result;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
				setError(errorMessage);
				console.error('Auth operation failed:', errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const signIn = useCallback(
		async (credentials: SignInCredentials): Promise<AuthResult> => {
			return handleAuthOperation(async () => {
				const result = await authService.signIn(credentials);

				if (result.error) {
					throw new Error(result.error.message);
				}

				return result;
			}, 'User signed in successfully');
		},
		[handleAuthOperation]
	);

	const signUp = useCallback(
		async (credentials: SignUpCredentials): Promise<AuthResult> => {
			return handleAuthOperation(async () => {
				const result = await authService.signUp(credentials);

				if (result.error) {
					throw new Error(result.error.message);
				}

				return result;
			}, 'User signed up successfully');
		},
		[handleAuthOperation]
	);

	const signInWithGoogle = useCallback(async (): Promise<AuthResult> => {
		return handleAuthOperation(async () => {
			const result = await authService.signInWithOAuth('google');

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result;
		}, 'Initiating Google sign in');
	}, [handleAuthOperation]);

	const signInWithGithub = useCallback(async (): Promise<AuthResult> => {
		return handleAuthOperation(async () => {
			const result = await authService.signInWithOAuth('github');

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result;
		}, 'Initiating GitHub sign in');
	}, [handleAuthOperation]);

	const signOut = useCallback(async (): Promise<void> => {
		return handleAuthOperation(async () => {
			const { error } = await authService.signOut();

			if (error) {
				throw new Error(error.message);
			}
		}, 'User signed out successfully');
	}, [handleAuthOperation]);

	const resetPassword = useCallback(
		async (email: string): Promise<boolean> => {
			return handleAuthOperation(async () => {
				const { error } = await authService.resetPassword(email);

				if (error) {
					throw new Error(error.message);
				}

				return true;
			}, 'Password reset email sent');
		},
		[handleAuthOperation]
	);

	const updatePassword = useCallback(
		async (password: string): Promise<boolean> => {
			return handleAuthOperation(async () => {
				const result = await authService.updatePassword(password);

				if (result.error) {
					throw new Error(result.error.message);
				}

				return true;
			}, 'Password updated successfully');
		},
		[handleAuthOperation]
	);

	const refreshSession = useCallback(async (): Promise<AuthResult> => {
		return handleAuthOperation(async () => {
			const result = await authService.refreshSession();

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result;
		}, 'Session refreshed successfully');
	}, [handleAuthOperation]);

	const getCurrentUser = useCallback(async (): Promise<AuthResult> => {
		return handleAuthOperation(async () => {
			const result = await authService.getSession();

			if (result.error) {
				throw new Error(result.error.message);
			}

			return result;
		});
	}, [handleAuthOperation]);

	return {
		// State
		isLoading,
		error,

		// Actions
		signIn,
		signUp,
		signInWithGoogle,
		signInWithGithub,
		signOut,
		resetPassword,
		updatePassword,
		refreshSession,
		getCurrentUser,

		// Utilities
		clearError,
	};
}

export default useAuth;
