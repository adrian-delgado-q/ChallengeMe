/**
 * Standardized error handling utilities
 */

export interface AppError {
	message: string;
	code?: string;
	details?: string;
	statusCode?: number;
}

export class ErrorHandler {
	/**
	 * Extract a user-friendly error message from various error types
	 */
	static extractMessage(error: any): string {
		if (typeof error === 'string') {
			return error;
		}

		if (error?.message) {
			return error.message;
		}

		if (error?.error?.message) {
			return error.error.message;
		}

		if (error?.response?.data?.message) {
			return error.response.data.message;
		}

		if (error?.response?.data?.error) {
			return error.response.data.error;
		}

		return 'An unexpected error occurred';
	}

	/**
	 * Create a standardized error object
	 */
	static createAppError(
		message: string,
		code?: string,
		details?: string,
		statusCode?: number
	): AppError {
		return {
			message,
			code,
			details,
			statusCode,
		};
	}

	/**
	 * Handle common error scenarios
	 */
	static handleCommonErrors(error: any): AppError {
		const message = this.extractMessage(error);

		// Network errors
		if (error?.code === 'NETWORK_ERROR' || message.includes('network')) {
			return this.createAppError(
				'Network connection failed. Please check your internet connection.',
				'NETWORK_ERROR',
				message
			);
		}

		// Validation errors
		if (error?.statusCode === 400 || message.includes('validation')) {
			return this.createAppError(
				'Invalid data provided. Please check your input.',
				'VALIDATION_ERROR',
				message
			);
		}

		// Authentication errors
		if (error?.statusCode === 401 || message.includes('unauthorized')) {
			return this.createAppError('Authentication required. Please log in.', 'AUTH_ERROR', message);
		}

		// Permission errors
		if (error?.statusCode === 403 || message.includes('forbidden')) {
			return this.createAppError(
				'You do not have permission to perform this action.',
				'PERMISSION_ERROR',
				message
			);
		}

		// Not found errors
		if (error?.statusCode === 404 || message.includes('not found')) {
			return this.createAppError('The requested resource was not found.', 'NOT_FOUND_ERROR', message);
		}

		// Server errors
		if (error?.statusCode >= 500 || message.includes('server error')) {
			return this.createAppError(
				'Server error occurred. Please try again later.',
				'SERVER_ERROR',
				message
			);
		}

		// Generic error
		return this.createAppError(message, 'UNKNOWN_ERROR');
	}

	/**
	 * Log error for debugging (in development)
	 */
	static logError(error: any, context?: string): void {
		if (process.env.NODE_ENV === 'development') {
			console.group(`🚨 Error${context ? ` in ${context}` : ''}`);
			console.error('Error object:', error);
			if (error?.stack) {
				console.error('Stack trace:', error.stack);
			}
			console.groupEnd();
		}
	}

	/**
	 * Async error handler wrapper
	 */
	static async handleAsync<T>(
		asyncOperation: () => Promise<T>,
		context?: string,
		fallbackValue?: T
	): Promise<T | undefined> {
		try {
			return await asyncOperation();
		} catch (error) {
			this.logError(error, context);

			if (fallbackValue !== undefined) {
				return fallbackValue;
			}

			throw this.handleCommonErrors(error);
		}
	}
}

/**
 * Utility function for handling promises without try-catch
 */
export const safeAsync = async <T>(promise: Promise<T>): Promise<[T | null, AppError | null]> => {
	try {
		const result = await promise;
		return [result, null];
	} catch (error) {
		return [null, ErrorHandler.handleCommonErrors(error)];
	}
};
