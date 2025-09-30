import React, { useRef, useState } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	IconButton,
	Image,
	VStack,
	HStack,
	Text,
	Box,
	Input,
	Avatar,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FileUploadService } from '../../services/fileUploadService';
import type { FileUploadResult } from '../../services/fileUploadService';
import { useNotifications } from '../../utils/notifications';

export interface ImageUploadFieldProps {
	label: string;
	value?: string;
	onChange: (imageUrl: string | null) => void;
	onUpload?: (file: File, result: FileUploadResult) => Promise<void>;
	isRequired?: boolean;
	isDisabled?: boolean;
	error?: string;
	placeholder?: string;
	maxSizeMB?: number;
	variant?: 'avatar' | 'image'; // avatar for circular display, image for rectangular
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	aspectRatio?: string; // CSS aspect-ratio value for rectangular images
	width?: string | number;
	height?: string | number;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
	label,
	value,
	onChange,
	onUpload,
	isRequired = false,
	isDisabled = false,
	error,
	placeholder,
	maxSizeMB = 2,
	variant = 'image',
	size = 'xl',
	aspectRatio = '16/9',
	width,
	height,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(value || null);
	const notifications = useNotifications();

	const borderColor = useColorModeValue('gray.200', 'gray.600');
	const bgColor = useColorModeValue('gray.50', 'gray.700');

	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file
		const validation = FileUploadService.validateImageFile(file, maxSizeMB);
		if (!validation.isValid) {
			notifications.validationError(validation.error!);
			return;
		}

		try {
			setIsUploading(true);

			// Create preview
			const previewUrl = await FileUploadService.createPreviewUrl(file);
			setPreview(previewUrl);

			// Upload file if onUpload is provided, otherwise use default upload
			let result: FileUploadResult;
			if (onUpload) {
				result = { success: true, url: '' }; // Placeholder, actual result from onUpload
				await onUpload(file, result);
			} else {
				// Use default upload based on variant
				if (variant === 'avatar') {
					result = await FileUploadService.uploadAvatar(file);
				} else {
					result = await FileUploadService.uploadChallengeImage(file);
				}
			}

			if (result.success && result.url) {
				onChange(result.url);
				setPreview(result.url);
				notifications.success('Image uploaded successfully!');
			} else {
				notifications.error('Upload failed', result.error || 'Unknown error occurred');
				setPreview(value || null);
			}
		} catch (error) {
			console.error('Upload error:', error);
			notifications.error('Upload failed', 'An unexpected error occurred');
			setPreview(value || null);
		} finally {
			setIsUploading(false);
			// Clear file input
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const handleRemoveImage = () => {
		onChange(null);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const renderImageDisplay = () => {
		if (variant === 'avatar') {
			return <Avatar size={size} src={preview || undefined} name={placeholder} bg={bgColor} />;
		}

		// Rectangular image
		const imageStyle = {
			width: width || '200px',
			height: height || undefined,
			aspectRatio: height ? undefined : aspectRatio,
			objectFit: 'cover' as const,
			borderRadius: 'md',
			border: `1px solid ${borderColor}`,
			bg: bgColor,
		};

		return preview ? (
			<Image src={preview} alt="Preview" {...imageStyle} />
		) : (
			<Box
				{...imageStyle}
				display="flex"
				alignItems="center"
				justifyContent="center"
				color="gray.500"
				fontSize="sm"
			>
				{placeholder || 'No image selected'}
			</Box>
		);
	};

	return (
		<FormControl isInvalid={!!error} isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>

			<Flex
				direction={{ base: 'column', md: 'row' }}
				align={{ base: 'center', md: 'flex-start' }}
				gap={4}
			>
				{renderImageDisplay()}

				<VStack align="stretch" flex="1" spacing={2}>
					<HStack>
						<Button
							size="sm"
							leftIcon={<EditIcon />}
							onClick={handleButtonClick}
							variant="outline"
							isDisabled={isDisabled || isUploading}
							isLoading={isUploading}
							loadingText="Uploading..."
						>
							{preview ? 'Change Image' : 'Upload Image'}
						</Button>

						{preview && (
							<IconButton
								size="sm"
								icon={<DeleteIcon />}
								onClick={handleRemoveImage}
								variant="outline"
								colorScheme="red"
								aria-label="Remove image"
								isDisabled={isDisabled || isUploading}
							/>
						)}
					</HStack>

					<Text fontSize="xs" color="gray.500">
						Max size: {maxSizeMB}MB. Supported formats: JPG, PNG, GIF, WebP
					</Text>

					<Input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						display="none"
					/>
				</VStack>
			</Flex>

			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};
