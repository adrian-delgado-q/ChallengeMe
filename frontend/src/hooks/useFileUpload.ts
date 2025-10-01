import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FileUploadService, type FileUploadOptions, type FileUploadResult } from '../services/fileUploadService';
import { queryKeys } from '../lib/queryKeys';

// Hook for file upload mutations
export const useFileUpload = () => {
	const queryClient = useQueryClient();

	const uploadFileMutation = useMutation<FileUploadResult, Error, { file: File; options: FileUploadOptions }>({
		mutationFn: ({ file, options }) => FileUploadService.uploadFile(file, options),
		onSuccess: () => {
			// Invalidate any queries that might be affected by file uploads
			// This is generic since files can be used in many contexts
			queryClient.invalidateQueries({ queryKey: queryKeys.uploads.all });
		},
	});

	const uploadAvatarMutation = useMutation<FileUploadResult, Error, File>({
		mutationFn: (file: File) =>
			FileUploadService.uploadAvatar(file),
		onSuccess: () => {
			// Invalidate profile queries when avatar is updated
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all });
		},
	});

	const uploadChallengeImageMutation = useMutation<FileUploadResult, Error, File>({
		mutationFn: (file: File) =>
			FileUploadService.uploadChallengeImage(file),
		onSuccess: () => {
			// Invalidate challenge queries when challenge image is updated
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all });
		},
	});

	const uploadTeamAvatarMutation = useMutation<FileUploadResult, Error, File>({
		mutationFn: (file: File) =>
			FileUploadService.uploadTeamAvatar(file),
		onSuccess: () => {
			// Invalidate team queries when team avatar is updated
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
		},
	});

	const deleteFileMutation = useMutation({
		mutationFn: async ({ bucket, filePath }: { bucket: string; filePath: string }) => {
			const result = await FileUploadService.deleteFile(bucket, filePath);
			return result.success;
		},
		onSuccess: () => {
			// Invalidate upload-related queries
			queryClient.invalidateQueries({ queryKey: queryKeys.uploads.all });
		},
	});

	return {
		uploadFile: uploadFileMutation,
		uploadAvatar: uploadAvatarMutation, 
		uploadChallengeImage: uploadChallengeImageMutation,
		uploadTeamAvatar: uploadTeamAvatarMutation,
		deleteFile: deleteFileMutation,
		// Consolidated state
		isUploading: uploadFileMutation.isPending || uploadAvatarMutation.isPending || 
					uploadChallengeImageMutation.isPending || uploadTeamAvatarMutation.isPending,
		uploadError: uploadFileMutation.error || uploadAvatarMutation.error || 
					uploadChallengeImageMutation.error || uploadTeamAvatarMutation.error,
	};
};

// Simplified hook for basic file uploads
export const useImageUpload = () => {
	const { uploadFile, isUploading, uploadError } = useFileUpload();

	const uploadImage = async (file: File, folder: string = 'images') => {
		return uploadFile.mutateAsync({
			file,
			options: {
				bucket: 'uploads',
				folder,
				maxSizeMB: 5,
				allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
			},
		});
	};

	return {
		uploadImage,
		isUploading,
		uploadError,
	};
};
