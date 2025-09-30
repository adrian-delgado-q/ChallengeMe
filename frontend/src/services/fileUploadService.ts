// File upload service for handling image uploads to Supabase Storage
import { supabase } from '../supabase/client';

export interface FileUploadOptions {
	bucket: string;
	folder: string;
	maxSizeMB?: number;
	allowedTypes?: string[];
}

export interface FileUploadResult {
	success: boolean;
	url?: string;
	error?: string;
}

export class FileUploadService {
	private static readonly DEFAULT_MAX_SIZE_MB = 2;
	private static readonly DEFAULT_ALLOWED_TYPES = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/gif',
		'image/webp',
	];

	/**
	 * Upload a file to Supabase Storage
	 */
	static async uploadFile(file: File, options: FileUploadOptions): Promise<FileUploadResult> {
		try {
			// Validate file type
			const allowedTypes = options.allowedTypes || this.DEFAULT_ALLOWED_TYPES;
			if (!allowedTypes.includes(file.type)) {
				return {
					success: false,
					error: `File type ${file.type} is not allowed. Supported types: ${allowedTypes.join(', ')}`,
				};
			}

			// Validate file size
			const maxSizeMB = options.maxSizeMB || this.DEFAULT_MAX_SIZE_MB;
			const maxSizeBytes = maxSizeMB * 1024 * 1024;
			if (file.size > maxSizeBytes) {
				return {
					success: false,
					error: `File size exceeds ${maxSizeMB}MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
				};
			}

			// Generate unique filename
			const fileExtension = file.name.split('.').pop() || 'jpg';
			const fileName = `${crypto.randomUUID()}.${fileExtension}`;
			const filePath = `${options.folder}/${fileName}`;

			// Upload to Supabase Storage
			const { error } = await supabase.storage.from(options.bucket).upload(filePath, file, {
				cacheControl: '3600',
				upsert: false,
			});

			if (error) {
				console.error('Supabase upload error:', error);
				return {
					success: false,
					error: `Upload failed: ${error.message}`,
				};
			}

			// Get public URL
			const { data: publicUrlData } = supabase.storage.from(options.bucket).getPublicUrl(filePath);

			return {
				success: true,
				url: publicUrlData.publicUrl,
			};
		} catch (error) {
			console.error('File upload error:', error);
			return {
				success: false,
				error: 'An unexpected error occurred during upload',
			};
		}
	}

	/**
	 * Upload an avatar image (for profiles and teams)
	 */
	static async uploadAvatar(file: File): Promise<FileUploadResult> {
		return this.uploadFile(file, {
			bucket: 'avatars',
			folder: 'user-avatars',
			maxSizeMB: 2,
		});
	}

	/**
	 * Upload a team avatar
	 */
	static async uploadTeamAvatar(file: File): Promise<FileUploadResult> {
		return this.uploadFile(file, {
			bucket: 'avatars',
			folder: 'team-avatars',
			maxSizeMB: 2,
		});
	}

	/**
	 * Upload a challenge image
	 */
	static async uploadChallengeImage(file: File): Promise<FileUploadResult> {
		return this.uploadFile(file, {
			bucket: 'images',
			folder: 'challenge-images',
			maxSizeMB: 2,
		});
	}

	/**
	 * Delete a file from Supabase Storage
	 */
	static async deleteFile(
		bucket: string,
		filePath: string
	): Promise<{ success: boolean; error?: string }> {
		try {
			const { error } = await supabase.storage.from(bucket).remove([filePath]);

			if (error) {
				console.error('File deletion error:', error);
				return {
					success: false,
					error: `Deletion failed: ${error.message}`,
				};
			}

			return { success: true };
		} catch (error) {
			console.error('File deletion error:', error);
			return {
				success: false,
				error: 'An unexpected error occurred during deletion',
			};
		}
	}

	/**
	 * Extract file path from a Supabase URL for deletion
	 */
	static extractFilePathFromUrl(url: string, bucket: string): string | null {
		try {
			const urlPattern = new RegExp(`/storage/v1/object/public/${bucket}/(.+)$`);
			const match = url.match(urlPattern);
			return match ? match[1] : null;
		} catch {
			return null;
		}
	}

	/**
	 * Validate an image file before upload
	 */
	static validateImageFile(
		file: File,
		maxSizeMB: number = this.DEFAULT_MAX_SIZE_MB
	): { isValid: boolean; error?: string } {
		// Check file type
		if (!this.DEFAULT_ALLOWED_TYPES.includes(file.type)) {
			return {
				isValid: false,
				error: `Please select an image file (${this.DEFAULT_ALLOWED_TYPES.join(', ')})`,
			};
		}

		// Check file size
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		if (file.size > maxSizeBytes) {
			return {
				isValid: false,
				error: `Image must be smaller than ${maxSizeMB}MB (current: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
			};
		}

		return { isValid: true };
	}

	/**
	 * Create a preview URL for a file
	 */
	static createPreviewUrl(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = e => {
				resolve(e.target?.result as string);
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
}
