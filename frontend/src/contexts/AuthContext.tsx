/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/optimizedAuthService';
import type { User, Session } from '@supabase/supabase-js';

// 1. Define the shape of your context's value
interface AuthContextType {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	signOut: () => Promise<void>;
}

// 2. Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider component
interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		// Use the singleton auth service to get session
		authService
			.getSession()
			.then(({ session, error }) => {
				if (error) {
					console.error('Auth session error:', error);
					// If there's an invalid refresh token, clear the session
					if (
						error.message?.includes('Invalid Refresh Token') ||
						error.message?.includes('Refresh Token')
					) {
						console.log('Clearing invalid session');
						setSession(null);
						setUser(null);
						authService.signOut();
					}
				} else {
					setSession(session);
					setUser(session?.user ?? null);
				}
				setIsLoading(false);
			})
			.catch(error => {
				console.error('Auth session error:', error);
				setSession(null);
				setUser(null);
				setIsLoading(false);
			});

		// Set up auth state change listener
		const {
			data: { subscription },
		} = authService.onAuthStateChange((_event: string, session: Session | null) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	const signOut = async () => {
		await authService.signOut();
	};

	const value = {
		user,
		session,
		isLoading,
		signOut,
	};

	// We only render the children after the initial loading is complete
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Re-export the hook to maintain backward compatibility
export { useUser } from '../hooks/useUser';
