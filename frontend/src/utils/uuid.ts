/**
 * Cross-browser compatible UUID generation utility
 * Provides a fallback for environments where crypto.randomUUID is not available
 */

/**
 * Generates a UUID v4 using crypto.randomUUID when available,
 * or falls back to a polyfill implementation
 */
export function generateUUID(): string {
	// Try to use the native crypto.randomUUID if available
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}

	// Fallback implementation for environments without crypto.randomUUID
	return generateUUIDPolyfill();
}

/**
 * Polyfill implementation of UUID v4 generation
 * Based on RFC 4122 specification
 */
function generateUUIDPolyfill(): string {
	// Use crypto.getRandomValues if available (modern browsers)
	if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const array = new Uint8Array(1);
			crypto.getRandomValues(array);
			const r = array[0] % 16;
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}

	// Final fallback using Math.random (less secure but functional)
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * Alternative short ID generator for cases where full UUIDs aren't needed
 * Generates a shorter, URL-safe identifier
 */
export function generateShortId(length: number = 8): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
		const array = new Uint8Array(length);
		crypto.getRandomValues(array);
		for (let i = 0; i < length; i++) {
			result += chars[array[i] % chars.length];
		}
	} else {
		// Fallback to Math.random
		for (let i = 0; i < length; i++) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
	}

	return result;
}
