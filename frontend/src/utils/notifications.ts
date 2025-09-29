import { useToast } from '@chakra-ui/react';
import type { UseToastOptions } from '@chakra-ui/react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastConfig {
	title: string;
	description?: string;
	type: ToastType;
	duration?: number;
	isClosable?: boolean;
}

/**
 * Standardized toast notifications with consistent styling and duration
 */
export const useNotifications = () => {
	const toast = useToast();

	const showNotification = ({
		title,
		description,
		type,
		duration = 3000,
		isClosable = true,
	}: ToastConfig) => {
		const toastOptions: UseToastOptions = {
			title,
			description,
			status: type,
			duration,
			isClosable,
			position: 'top-right',
		};

		// Extend duration for error messages
		if (type === 'error') {
			toastOptions.duration = duration === 3000 ? 5000 : duration;
		}

		return toast(toastOptions);
	};

	return {
		success: (title: string, description?: string, duration?: number) =>
			showNotification({ title, description, type: 'success', duration }),

		error: (title: string, description?: string, duration?: number) =>
			showNotification({ title, description, type: 'error', duration }),

		warning: (title: string, description?: string, duration?: number) =>
			showNotification({ title, description, type: 'warning', duration }),

		info: (title: string, description?: string, duration?: number) =>
			showNotification({ title, description, type: 'info', duration }),

		// Convenience methods for common scenarios
		saveSuccess: (entityName: string = 'Item') =>
			showNotification({
				title: 'Success!',
				description: `${entityName} saved successfully`,
				type: 'success',
			}),

		deleteSuccess: (entityName: string = 'Item') =>
			showNotification({
				title: 'Deleted',
				description: `${entityName} deleted successfully`,
				type: 'success',
			}),

		validationError: (message: string = 'Please check your input') =>
			showNotification({
				title: 'Validation Error',
				description: message,
				type: 'error',
			}),

		networkError: (message: string = 'Please try again later') =>
			showNotification({
				title: 'Network Error',
				description: message,
				type: 'error',
			}),

		permissionError: (message: string = 'You do not have permission to perform this action') =>
			showNotification({
				title: 'Permission Denied',
				description: message,
				type: 'error',
			}),
	};
};
