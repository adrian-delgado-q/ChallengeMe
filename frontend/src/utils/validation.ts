// Common validation utilities to reduce duplication across forms

export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

export class ValidationUtils {
	/**
	 * Validate email format
	 */
	static email(email: string): ValidationResult {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email.trim()) {
			return { isValid: false, error: 'Email is required' };
		}

		if (!emailRegex.test(email)) {
			return { isValid: false, error: 'Please enter a valid email address' };
		}

		return { isValid: true };
	}

	/**
	 * Validate username format
	 */
	static username(username: string): ValidationResult {
		if (!username.trim()) {
			return { isValid: false, error: 'Username is required' };
		}

		if (username.length < 3) {
			return { isValid: false, error: 'Username must be at least 3 characters' };
		}

		if (username.length > 20) {
			return { isValid: false, error: 'Username must be less than 20 characters' };
		}

		if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
			return {
				isValid: false,
				error: 'Username can only contain letters, numbers, hyphens, and underscores',
			};
		}

		return { isValid: true };
	}

	/**
	 * Validate required text field
	 */
	static required(value: string, fieldName: string = 'Field'): ValidationResult {
		if (!value || !value.trim()) {
			return { isValid: false, error: `${fieldName} is required` };
		}

		return { isValid: true };
	}

	/**
	 * Validate text length
	 */
	static textLength(
		value: string,
		min: number = 0,
		max: number = Infinity,
		fieldName: string = 'Field'
	): ValidationResult {
		const length = value ? value.trim().length : 0;

		if (length < min) {
			return {
				isValid: false,
				error: `${fieldName} must be at least ${min} characters`,
			};
		}

		if (length > max) {
			return {
				isValid: false,
				error: `${fieldName} must be less than ${max} characters`,
			};
		}

		return { isValid: true };
	}

	/**
	 * Validate numeric value
	 */
	static numeric(
		value: string | number,
		min?: number,
		max?: number,
		fieldName: string = 'Value'
	): ValidationResult {
		const num = typeof value === 'string' ? parseFloat(value) : value;

		if (isNaN(num)) {
			return { isValid: false, error: `${fieldName} must be a valid number` };
		}

		if (min !== undefined && num < min) {
			return { isValid: false, error: `${fieldName} must be at least ${min}` };
		}

		if (max !== undefined && num > max) {
			return { isValid: false, error: `${fieldName} must be no more than ${max}` };
		}

		return { isValid: true };
	}

	/**
	 * Validate URL format
	 */
	static url(url: string, fieldName: string = 'URL'): ValidationResult {
		if (!url.trim()) {
			return { isValid: false, error: `${fieldName} is required` };
		}

		try {
			new URL(url);
			return { isValid: true };
		} catch {
			return { isValid: false, error: `Please enter a valid ${fieldName.toLowerCase()}` };
		}
	}

	/**
	 * Validate date (must be in the future)
	 */
	static futureDate(dateString: string, fieldName: string = 'Date'): ValidationResult {
		if (!dateString) {
			return { isValid: false, error: `${fieldName} is required` };
		}

		const date = new Date(dateString);
		const now = new Date();

		if (isNaN(date.getTime())) {
			return { isValid: false, error: `Please enter a valid ${fieldName.toLowerCase()}` };
		}

		if (date <= now) {
			return { isValid: false, error: `${fieldName} must be in the future` };
		}

		return { isValid: true };
	}

	/**
	 * Validate array has minimum items
	 */
	static arrayMinLength<T>(array: T[], min: number, fieldName: string = 'Items'): ValidationResult {
		if (!array || array.length < min) {
			return {
				isValid: false,
				error: `Please select at least ${min} ${fieldName.toLowerCase()}`,
			};
		}

		return { isValid: true };
	}

	/**
	 * Validate file size
	 */
	static fileSize(file: File, maxSizeMB: number): ValidationResult {
		const maxSizeBytes = maxSizeMB * 1024 * 1024;

		if (file.size > maxSizeBytes) {
			return {
				isValid: false,
				error: `File size must be less than ${maxSizeMB}MB`,
			};
		}

		return { isValid: true };
	}

	/**
	 * Validate file type
	 */
	static fileType(file: File, allowedTypes: string[]): ValidationResult {
		if (!allowedTypes.includes(file.type)) {
			return {
				isValid: false,
				error: `File type must be one of: ${allowedTypes.join(', ')}`,
			};
		}

		return { isValid: true };
	}

	/**
	 * Combine multiple validation results
	 */
	static combine(...validations: ValidationResult[]): ValidationResult {
		for (const validation of validations) {
			if (!validation.isValid) {
				return validation;
			}
		}

		return { isValid: true };
	}

	/**
	 * Validate form data using validation schema
	 */
	static validateForm<T extends Record<string, any>>(
		data: T,
		schema: Record<keyof T, (value: any) => ValidationResult>
	): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
		const errors: Partial<Record<keyof T, string>> = {};
		let isValid = true;

		for (const [field, validator] of Object.entries(schema)) {
			const result = validator(data[field]);
			if (!result.isValid) {
				errors[field as keyof T] = result.error;
				isValid = false;
			}
		}

		return { isValid, errors };
	}
}

// Common validation schemas for reuse
export const CommonValidationSchemas = {
	teamName: (value: string) =>
		ValidationUtils.combine(
			ValidationUtils.required(value, 'Team name'),
			ValidationUtils.textLength(value, 3, 50, 'Team name')
		),

	challengeTitle: (value: string) =>
		ValidationUtils.combine(
			ValidationUtils.required(value, 'Challenge title'),
			ValidationUtils.textLength(value, 3, 100, 'Challenge title')
		),

	description: (value: string) => ValidationUtils.textLength(value, 0, 500, 'Description'),

	endDate: (value: string) => ValidationUtils.futureDate(value, 'End date'),

	maxParticipants: (value: string) =>
		value.trim() ? ValidationUtils.numeric(value, 1, 1000, 'Max participants') : { isValid: true },
};
