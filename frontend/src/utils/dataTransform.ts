// Common data transformation utilities to reduce duplication

export class DataTransformUtils {
	/**
	 * Format date for display
	 */
	static formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		if (isNaN(dateObj.getTime())) {
			return 'Invalid date';
		}

		switch (format) {
			case 'short':
				return dateObj.toLocaleDateString();
			case 'long':
				return dateObj.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
			case 'relative':
				return DataTransformUtils.getRelativeTime(dateObj);
			default:
				return dateObj.toLocaleDateString();
		}
	}

	/**
	 * Get relative time (e.g., "2 hours ago", "in 3 days")
	 */
	static getRelativeTime(date: Date): string {
		const now = new Date();
		const diffMs = date.getTime() - now.getTime();
		const absDiffMs = Math.abs(diffMs);

		const minute = 60 * 1000;
		const hour = 60 * minute;
		const day = 24 * hour;
		const week = 7 * day;
		const month = 30 * day;
		const year = 365 * day;

		const future = diffMs > 0;
		const prefix = future ? 'in ' : '';
		const suffix = future ? '' : ' ago';

		if (absDiffMs < minute) {
			return 'just now';
		} else if (absDiffMs < hour) {
			const minutes = Math.floor(absDiffMs / minute);
			return `${prefix}${minutes} minute${minutes > 1 ? 's' : ''}${suffix}`;
		} else if (absDiffMs < day) {
			const hours = Math.floor(absDiffMs / hour);
			return `${prefix}${hours} hour${hours > 1 ? 's' : ''}${suffix}`;
		} else if (absDiffMs < week) {
			const days = Math.floor(absDiffMs / day);
			return `${prefix}${days} day${days > 1 ? 's' : ''}${suffix}`;
		} else if (absDiffMs < month) {
			const weeks = Math.floor(absDiffMs / week);
			return `${prefix}${weeks} week${weeks > 1 ? 's' : ''}${suffix}`;
		} else if (absDiffMs < year) {
			const months = Math.floor(absDiffMs / month);
			return `${prefix}${months} month${months > 1 ? 's' : ''}${suffix}`;
		} else {
			const years = Math.floor(absDiffMs / year);
			return `${prefix}${years} year${years > 1 ? 's' : ''}${suffix}`;
		}
	}

	/**
	 * Format numbers with appropriate suffixes (K, M, B)
	 */
	static formatNumber(num: number, decimals: number = 1): string {
		if (num < 1000) return num.toString();

		const k = 1000;
		const sizes = ['', 'K', 'M', 'B', 'T'];
		const i = Math.floor(Math.log(num) / Math.log(k));

		return (num / Math.pow(k, i)).toFixed(decimals) + sizes[i];
	}

	/**
	 * Truncate text with ellipsis
	 */
	static truncateText(text: string, maxLength: number): string {
		if (!text || text.length <= maxLength) return text;
		return text.substring(0, maxLength - 3) + '...';
	}

	/**
	 * Convert string to slug (URL-friendly)
	 */
	static slugify(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '') // Remove special characters
			.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
			.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
	}

	/**
	 * Capitalize first letter of each word
	 */
	static titleCase(text: string): string {
		return text
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	/**
	 * Get initials from name
	 */
	static getInitials(name: string, maxChars: number = 2): string {
		if (!name) return '';

		const words = name.trim().split(/\s+/);
		const initials = words
			.slice(0, maxChars)
			.map(word => word.charAt(0).toUpperCase())
			.join('');

		return initials;
	}

	/**
	 * Sort array by property
	 */
	static sortBy<T>(array: T[], property: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
		return [...array].sort((a, b) => {
			const aVal = a[property];
			const bVal = b[property];

			if (aVal < bVal) return direction === 'asc' ? -1 : 1;
			if (aVal > bVal) return direction === 'asc' ? 1 : -1;
			return 0;
		});
	}

	/**
	 * Group array by property
	 */
	static groupBy<T>(array: T[], property: keyof T): Record<string, T[]> {
		return array.reduce(
			(groups, item) => {
				const key = String(item[property]);
				if (!groups[key]) {
					groups[key] = [];
				}
				groups[key].push(item);
				return groups;
			},
			{} as Record<string, T[]>
		);
	}

	/**
	 * Filter array by search query
	 */
	static filterByQuery<T>(array: T[], query: string, searchFields: (keyof T)[]): T[] {
		if (!query.trim()) return array;

		const normalizedQuery = query.toLowerCase().trim();

		return array.filter(item =>
			searchFields.some(field => {
				const value = item[field];
				if (typeof value === 'string') {
					return value.toLowerCase().includes(normalizedQuery);
				}
				if (typeof value === 'number') {
					return value.toString().includes(normalizedQuery);
				}
				return false;
			})
		);
	}

	/**
	 * Paginate array
	 */
	static paginate<T>(
		array: T[],
		page: number,
		itemsPerPage: number
	): { items: T[]; totalPages: number; hasMore: boolean } {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const items = array.slice(startIndex, endIndex);
		const totalPages = Math.ceil(array.length / itemsPerPage);
		const hasMore = page < totalPages;

		return { items, totalPages, hasMore };
	}

	/**
	 * Deep clone object
	 */
	static deepClone<T>(obj: T): T {
		if (obj === null || typeof obj !== 'object') return obj;
		if (obj instanceof Date) return new Date(obj.getTime()) as any;
		if (obj instanceof Array) return obj.map(item => this.deepClone(item)) as any;
		if (typeof obj === 'object') {
			const copy = {} as any;
			Object.keys(obj).forEach(key => {
				copy[key] = this.deepClone((obj as any)[key]);
			});
			return copy;
		}
		return obj;
	}

	/**
	 * Remove empty values from object
	 */
	static removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
		const cleaned: Partial<T> = {};

		Object.keys(obj).forEach(key => {
			const value = obj[key];
			if (value !== null && value !== undefined && value !== '' && value !== 0) {
				if (Array.isArray(value) && value.length > 0) {
					cleaned[key as keyof T] = value as T[keyof T];
				} else if (typeof value === 'object' && Object.keys(value).length > 0) {
					cleaned[key as keyof T] = value as T[keyof T];
				} else if (typeof value !== 'object') {
					cleaned[key as keyof T] = value as T[keyof T];
				}
			}
		});

		return cleaned;
	}

	/**
	 * Format file size in bytes to human readable
	 */
	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	/**
	 * Debounce function calls
	 */
	static debounce<T extends (...args: any[]) => any>(
		func: T,
		delay: number
	): (...args: Parameters<T>) => void {
		let timeoutId: NodeJS.Timeout;

		return (...args: Parameters<T>) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	}

	/**
	 * Generate random ID
	 */
	static generateId(prefix: string = ''): string {
		const random = Math.random().toString(36).substring(2, 15);
		const timestamp = Date.now().toString(36);
		return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
	}
}
