/**
 * Common loading state patterns and utilities
 */

export interface LoadingState {
    isLoading: boolean;
    error?: string | null;
    data?: any;
}

export interface AsyncAction<T = any> {
    execute: (operation: () => Promise<T>) => Promise<T | undefined>;
    isLoading: boolean;
    error?: string | null;
    reset: () => void;
}

/**
 * Loading state helper utilities
 */
export class LoadingStateUtils {
    /**
     * Create a standardized loading state object
     */
    static createLoadingState(isLoading = false, error: string | null = null, data: any = null): LoadingState {
        return { isLoading, error, data };
    }

    /**
     * Check if any loading states are active
     */
    static isAnyLoading(...states: LoadingState[]): boolean {
        return states.some(state => state.isLoading);
    }

    /**
     * Get the first error from multiple loading states
     */
    static getFirstError(...states: LoadingState[]): string | null {
        for (const state of states) {
            if (state.error) {
                return state.error;
            }
        }
        return null;
    }

    /**
     * Check if all loading states are successful (not loading and no errors)
     */
    static areAllSuccessful(...states: LoadingState[]): boolean {
        return states.every(state => !state.isLoading && !state.error);
    }

    /**
     * Combine multiple loading states into one
     */
    static combineStates(...states: LoadingState[]): LoadingState {
        const isLoading = this.isAnyLoading(...states);
        const error = this.getFirstError(...states);
        const data = states.map(state => state.data);

        return { isLoading, error, data };
    }
}

/**
 * Common loading state patterns for UI components
 */
export const LoadingPatterns = {
    /**
     * Standard loading spinner with message
     */
    spinner: (message = 'Loading...') => ({
        isLoading: true,
        message
    }),

    /**
     * Error state with retry option
     */
    error: (message: string, onRetry?: () => void) => ({
        isLoading: false,
        error: message,
        onRetry
    }),

    /**
     * Success state
     */
    success: (data: any = null) => ({
        isLoading: false,
        error: null,
        data
    }),

    /**
     * Initial/idle state
     */
    idle: () => ({
        isLoading: false,
        error: null,
        data: null
    })
};

/**
 * Async operation wrapper with consistent error handling
 */
export const withLoadingState = async <T>(
    operation: () => Promise<T>,
    onStart?: () => void,
    onSuccess?: (result: T) => void,
    onError?: (error: any) => void,
    onFinally?: () => void
): Promise<T | undefined> => {
    try {
        onStart?.();
        const result = await operation();
        onSuccess?.(result);
        return result;
    } catch (error) {
        onError?.(error);
        return undefined;
    } finally {
        onFinally?.();
    }
};
