/**
 * Optimized Auth Service with Selective Retry Logic
 *
 * This service provides singleton pattern for auth operations with
 * selective retry logic only when needed.
 */

import { supabase } from '../supabase/client';
import { withExponentialBackoff, type RetryOptions } from '../utils/exponentialBackoff';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error?: AuthError | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  options?: {
    data?: Record<string, any>;
  };
}

/**
 * Lightweight retry options for critical auth operations only
 */
const criticalAuthRetryOptions: RetryOptions = {
  maxRetries: 1, // Only one retry for auth
  initialDelay: 300, // Faster initial delay
  maxDelay: 1000, // Lower max delay
  backoffMultiplier: 1.5, // Gentler backoff
  useJitter: false, // No jitter for speed
  shouldRetry: (error: Error) => {
    const errorMessage = error.message.toLowerCase();
    // Only retry on network/timeout errors
    return (
      errorMessage.includes('network') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('fetch')
    );
  },
};

/**
 * Optimized Singleton Auth Service Class
 */
class OptimizedAuthService {
  private static instance: OptimizedAuthService;
  private currentSessionPromise: Promise<AuthResult> | null = null;
  private currentUserPromise: Promise<User | null> | null = null;

  // Cache for session data to avoid repeated calls
  private sessionCache: { data: AuthResult; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 5000; // 5 seconds cache

  private constructor() {}

  public static getInstance(): OptimizedAuthService {
    if (!OptimizedAuthService.instance) {
      OptimizedAuthService.instance = new OptimizedAuthService();
    }
    return OptimizedAuthService.instance;
  }

  /**
   * Get current session with caching and minimal retry logic
   */
  public async getSession(): Promise<AuthResult> {
    // Check cache first
    if (this.sessionCache && Date.now() - this.sessionCache.timestamp < this.CACHE_DURATION) {
      return this.sessionCache.data;
    }

    // If there's already a session request in progress, return the same promise
    if (this.currentSessionPromise) {
      return this.currentSessionPromise;
    }

    // Create new session request (with minimal retry only for critical errors)
    this.currentSessionPromise = this.getSessionInternal().finally(() => {
      this.currentSessionPromise = null;
    });

    return this.currentSessionPromise;
  }

  private async getSessionInternal(): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.getSession();
      const result = {
        user: data.session?.user ?? null,
        session: data.session,
        error,
      };

      // Cache successful results
      if (!error) {
        this.sessionCache = {
          data: result,
          timestamp: Date.now(),
        };
      }

      return result;
    } catch (error) {
      // Only retry on network errors
      if (
        error instanceof Error &&
        (error.message.includes('network') || error.message.includes('fetch'))
      ) {
        return withExponentialBackoff(() => this.getSessionDirect(), criticalAuthRetryOptions);
      }
      throw error;
    }
  }

  private async getSessionDirect(): Promise<AuthResult> {
    const { data, error } = await supabase.auth.getSession();
    return {
      user: data.session?.user ?? null,
      session: data.session,
      error,
    };
  }

  /**
   * Get current user (optimized with minimal overhead)
   */
  public async getCurrentUser(): Promise<User | null> {
    // If there's already a user request in progress, return the same promise
    if (this.currentUserPromise) {
      return this.currentUserPromise;
    }

    // Simple implementation without retry for getCurrentUser (it's fast)
    this.currentUserPromise = this.getCurrentUserDirect().finally(() => {
      this.currentUserPromise = null;
    });

    return this.currentUserPromise;
  }

  private async getCurrentUserDirect(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data.user;
  }

  /**
   * Sign in with retry logic (important operation)
   */
  public async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    return withExponentialBackoff(async () => {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      // Clear cache on sign in
      this.sessionCache = null;

      return {
        user: data.user,
        session: data.session,
        error,
      };
    }, criticalAuthRetryOptions);
  }

  /**
   * Sign up with retry logic (important operation)
   */
  public async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    return withExponentialBackoff(async () => {
      const { data, error } = await supabase.auth.signUp(credentials);
      return {
        user: data.user,
        session: data.session,
        error,
      };
    }, criticalAuthRetryOptions);
  }

  /**
   * Sign in with OAuth (no retry needed, it's a redirect)
   */
  public async signInWithOAuth(
    provider: 'google' | 'github' | 'discord' | 'twitter'
  ): Promise<AuthResult> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return {
      user: null,
      session: null,
      error,
    };
  }

  /**
   * Sign out (simple, no retry needed)
   */
  public async signOut(): Promise<{ error?: AuthError | null }> {
    // Clear cache and pending promises
    this.sessionCache = null;
    this.currentSessionPromise = null;
    this.currentUserPromise = null;

    const { error } = await supabase.auth.signOut();
    return { error };
  }

  /**
   * Reset password (with retry)
   */
  public async resetPassword(email: string): Promise<{ error?: AuthError | null }> {
    return withExponentialBackoff(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error };
    }, criticalAuthRetryOptions);
  }

  /**
   * Update password (with retry)
   */
  public async updatePassword(password: string): Promise<AuthResult> {
    return withExponentialBackoff(async () => {
      const { data, error } = await supabase.auth.updateUser({ password });

      // Clear cache on password update
      this.sessionCache = null;

      return {
        user: data.user,
        session: null,
        error,
      };
    }, criticalAuthRetryOptions);
  }

  /**
   * Refresh session (simple, usually fast)
   */
  public async refreshSession(): Promise<AuthResult> {
    this.sessionCache = null; // Clear cache

    const { data, error } = await supabase.auth.refreshSession();
    return {
      user: data.user,
      session: data.session,
      error,
    };
  }

  /**
   * Get auth state change listener
   */
  public onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Clear cache manually if needed
   */
  public clearCache(): void {
    this.sessionCache = null;
  }
}

// Export optimized singleton instance
export const authService = OptimizedAuthService.getInstance();

// Export class for testing if needed
export { OptimizedAuthService as AuthService };
