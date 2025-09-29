import { useState, useCallback } from 'react';
import { ErrorHandler } from '../utils/errorHandling';
import { useNotifications } from '../utils/notifications';

export interface LoadingState {
	isLoading: boolean;
	error: string | null;
	data: any;
}

export interface UseAsyncStateOptions {
	initialData?: any;
	showErrorNotifications?: boolean;
	showSuccessNotifications?: boolean;
	successMessage?: string;
	errorContext?: string;
}

/**
 * A custom hook for managing async operations with loading, error, and success states
 */
export const useAsyncState = <T = any>(options: UseAsyncStateOptions = {}) => {
	const {
		initialData = null,
		showErrorNotifications = true,
		showSuccessNotifications = false,
		successMessage,
		errorContext,
	} = options;

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T>(initialData);

	const notifications = useNotifications();

	const execute = useCallback(
		async <R = T>(
			asyncOperation: () => Promise<R>,
			options?: {
				successMessage?: string;
				showSuccess?: boolean;
				showError?: boolean;
			}
		): Promise<R | null> => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await asyncOperation();
				setData(result as any);

				// Show success notification if requested
				if (
					(options?.showSuccess ?? showSuccessNotifications) &&
					(options?.successMessage || successMessage)
				) {
					notifications.success('Success!', options?.successMessage || successMessage);
				}

				return result;
			} catch (err: any) {
				const appError = ErrorHandler.handleCommonErrors(err);
				setError(appError.message);

				// Log error for debugging
				ErrorHandler.logError(err, errorContext);

				// Show error notification if requested
				if (options?.showError ?? showErrorNotifications) {
					notifications.error('Error', appError.message);
				}

				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[showErrorNotifications, showSuccessNotifications, successMessage, errorContext, notifications]
	);

	const reset = useCallback(() => {
		setIsLoading(false);
		setError(null);
		setData(initialData);
	}, [initialData]);

	const setLoadingState = useCallback((loading: boolean) => {
		setIsLoading(loading);
	}, []);

	const setErrorState = useCallback((errorMessage: string | null) => {
		setError(errorMessage);
	}, []);

	const setDataState = useCallback((newData: T) => {
		setData(newData);
	}, []);

	return {
		isLoading,
		error,
		data,
		execute,
		reset,
		setLoading: setLoadingState,
		setError: setErrorState,
		setData: setDataState,
	};
};

/**
 * Hook for managing multiple loading states (useful for forms with multiple actions)
 */
export const useMultipleLoadingStates = () => {
	const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
	const [errors, setErrors] = useState<Record<string, string | null>>({});
	const notifications = useNotifications();

	const setLoading = useCallback((key: string, isLoading: boolean) => {
		setLoadingStates(prev => ({ ...prev, [key]: isLoading }));
	}, []);

	const setError = useCallback((key: string, error: string | null) => {
		setErrors(prev => ({ ...prev, [key]: error }));
	}, []);

	const isLoading = useCallback(
		(key: string) => {
			return loadingStates[key] || false;
		},
		[loadingStates]
	);

	const getError = useCallback(
		(key: string) => {
			return errors[key] || null;
		},
		[errors]
	);

	const clearError = useCallback((key: string) => {
		setErrors(prev => {
			const newErrors = { ...prev };
			delete newErrors[key];
			return newErrors;
		});
	}, []);

	const reset = useCallback(
		(key?: string) => {
			if (key) {
				setLoadingStates(prev => {
					const newStates = { ...prev };
					delete newStates[key];
					return newStates;
				});
				clearError(key);
			} else {
				setLoadingStates({});
				setErrors({});
			}
		},
		[clearError]
	);

	const executeWithKey = useCallback(
		async <T>(
			key: string,
			asyncOperation: () => Promise<T>,
			options?: {
				showErrorNotifications?: boolean;
				errorContext?: string;
			}
		): Promise<T | null> => {
			setLoading(key, true);
			clearError(key);

			try {
				const result = await asyncOperation();
				return result;
			} catch (err: any) {
				const appError = ErrorHandler.handleCommonErrors(err);
				setError(key, appError.message);

				// Log error for debugging
				ErrorHandler.logError(err, options?.errorContext || `Operation: ${key}`);

				// Show error notification if requested
				if (options?.showErrorNotifications !== false) {
					notifications.error('Error', appError.message);
				}

				return null;
			} finally {
				setLoading(key, false);
			}
		},
		[setLoading, clearError, setError, notifications]
	);

	return {
		loadingStates,
		errors,
		setLoading,
		setError,
		isLoading,
		getError,
		clearError,
		reset,
		executeWithKey,
	};
};
