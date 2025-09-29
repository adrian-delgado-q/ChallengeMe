import React, { useState, useRef, useEffect } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	HStack,
	Checkbox,
	FormHelperText,
	Avatar,
	Box,
	Text,
	IconButton,
	Flex,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TeamService } from '../../graphql/services';
import { ActivityTypeService } from '../../graphql/services/activityTypeService';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ValidationUtils, CommonValidationSchemas } from '../../utils/validation';
import { ActivityTypeSelector } from '../challenges/ActivityTypeSelector';
import type { ActivityType } from '../../types';

interface TeamFormProps {
	onSubmit: (team: any) => void;
	onCancel: () => void;
	initialData?: any;
	isEditing?: boolean;
	hideButtons?: boolean;
	onLoadingChange?: (loading: boolean) => void;
}

export const TeamForm: React.FC<TeamFormProps> = ({
	onSubmit,
	onCancel,
	initialData,
	isEditing = false,
	hideButtons = false,
	onLoadingChange,
}) => {
	// State for activity types
	const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
	const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(true);
	const [selectedActivityTypeIds, setSelectedActivityTypeIds] = useState<string[]>(
		initialData?.activityTypeIds || []
	);

	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		description: initialData?.description || '',
		avatarUrl: initialData?.avatarUrl || '',
		isPublic: initialData?.isPublic ?? true,
		maxMembers: initialData?.maxMembers || '',
		accessCode: initialData?.accessCode || '',
	});
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string>(initialData?.avatarUrl || '');
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Note: Admin management is handled separately in TeamMemberManagement component

	const notifications = useNotifications();
	const { execute: executeSubmit, isLoading: isSubmitting } = useAsyncState({
		showErrorNotifications: !hideButtons, // Only show notifications for standalone usage
		errorContext: 'Team form submission',
	});

	// Load activity types on component mount
	useEffect(() => {
		const loadActivityTypes = async () => {
			try {
				const types = await ActivityTypeService.getActivityTypes();
				setActivityTypes(types);
			} catch (error) {
				console.error('Failed to load activity types:', error);
				notifications.error('Failed to load activity types');
			} finally {
				setIsLoadingActivityTypes(false);
			}
		};

		loadActivityTypes();
	}, []);

	// Handle activity type selection change
	const handleActivityTypeChange = (selectedIds: string[]) => {
		setSelectedActivityTypeIds(selectedIds);
	};

	const handleInputChange = (field: string, value: any) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validate file type
			if (!file.type.startsWith('image/')) {
				notifications.validationError('Please select an image file.');
				return;
			}

			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				notifications.validationError('Please select an image smaller than 5MB.');
				return;
			}

			setAvatarFile(file);

			// Create preview URL
			const reader = new FileReader();
			reader.onload = e => {
				setAvatarPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveAvatar = () => {
		setAvatarFile(null);
		setAvatarPreview('');
		setFormData(prev => ({ ...prev, avatarUrl: '' }));
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Note: Admin search functionality removed - handled in TeamMemberManagement component

	const uploadAvatarFile = async (file: File): Promise<string> => {
		// Note: This is a placeholder for file upload functionality
		// In a real implementation, you would upload to your storage service
		// For now, we'll use a data URL as a fallback
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.onload = e => {
				resolve(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation using ValidationUtils
		const nameValidation = CommonValidationSchemas.teamName(formData.name);
		if (!nameValidation.isValid) {
			notifications.validationError(nameValidation.error!);
			return;
		}

		if (formData.description) {
			const descriptionValidation = CommonValidationSchemas.description(formData.description);
			if (!descriptionValidation.isValid) {
				notifications.validationError(descriptionValidation.error!);
				return;
			}
		}

		// Validate max members if provided
		if (formData.maxMembers) {
			const maxMembersValidation = ValidationUtils.numeric(
				formData.maxMembers,
				2,
				1000,
				'Maximum members'
			);
			if (!maxMembersValidation.isValid) {
				notifications.validationError(maxMembersValidation.error!);
				return;
			}
		}

		// Validate access code for private teams
		if (!formData.isPublic) {
			if (!formData.accessCode || formData.accessCode.trim().length === 0) {
				notifications.validationError('Access code is required for private teams');
				return;
			}
			if (formData.accessCode.length < 3) {
				notifications.validationError('Access code must be at least 3 characters long');
				return;
			}
		}

		onLoadingChange?.(true);

		const result = await executeSubmit(
			async () => {
				let avatarUrl = formData.avatarUrl;

				// Upload avatar file if one was selected
				if (avatarFile) {
					try {
						avatarUrl = await uploadAvatarFile(avatarFile);
					} catch (uploadError) {
						console.warn('Avatar upload failed, proceeding without avatar:', uploadError);
						avatarUrl = '';
					}
				}

				const teamData = {
					...formData,
					avatarUrl: avatarUrl || undefined,
					maxMembers: formData.maxMembers ? Number(formData.maxMembers) : undefined,
					activityTypeIds: selectedActivityTypeIds.length > 0 ? selectedActivityTypeIds : undefined,
				};

				if (isEditing && initialData?.id) {
					return await TeamService.updateTeam(initialData.id, teamData);
				} else {
					return await TeamService.createTeam(teamData);
				}
			},
			{
				successMessage: `Team ${isEditing ? 'updated' : 'created'} successfully`,
				showSuccess: !hideButtons, // Only show notifications for standalone usage
			}
		);

		onLoadingChange?.(false);

		if (result) {
			onSubmit(result);
		} else if (hideButtons) {
			// If hideButtons is true, let parent component handle the error by throwing
			throw new Error(`Failed to ${isEditing ? 'update' : 'create'} team`);
		}
	};

	return (
		<Box as="form" onSubmit={handleSubmit}>
			<VStack spacing={6} align="stretch">
				{/* Team Avatar Upload */}
				<FormControl>
					<FormLabel>Team Avatar</FormLabel>
					<Flex align="center" gap={4}>
						<Avatar size="xl" src={avatarPreview} name={formData.name} />
						<VStack align="stretch" flex="1" spacing={2}>
							<HStack>
								<Button
									size="sm"
									leftIcon={<EditIcon />}
									onClick={() => fileInputRef.current?.click()}
									variant="outline"
									isDisabled={isSubmitting}
								>
									{avatarPreview ? 'Change Image' : 'Upload Image'}
								</Button>
								{avatarPreview && (
									<IconButton
										size="sm"
										icon={<DeleteIcon />}
										onClick={handleRemoveAvatar}
										variant="outline"
										colorScheme="red"
										aria-label="Remove avatar"
										isDisabled={isSubmitting}
									/>
								)}
							</HStack>
							<Input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleAvatarFileChange}
								display="none"
							/>
							<FormHelperText fontSize="xs">
								Upload an image for your team (max 5MB). Supported formats: JPG, PNG, GIF
							</FormHelperText>
						</VStack>
					</Flex>
				</FormControl>

				{/* Team Name */}
				<FormControl isRequired>
					<FormLabel>Team Name</FormLabel>
					<Input
						placeholder="Enter your team name"
						value={formData.name}
						onChange={e => handleInputChange('name', e.target.value)}
						maxLength={50}
						isDisabled={isSubmitting}
					/>
					<FormHelperText>Choose a unique and memorable name for your team</FormHelperText>
				</FormControl>

				{/* Team Description */}
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea
						placeholder="Describe your team's goals and what kind of challenges you're interested in..."
						value={formData.description}
						onChange={e => handleInputChange('description', e.target.value)}
						rows={4}
						maxLength={500}
						resize="vertical"
						isDisabled={isSubmitting}
					/>
					<FormHelperText>Help others understand what your team is about (optional)</FormHelperText>
				</FormControl>

				{/* Maximum Members */}
				<FormControl>
					<FormLabel>Maximum Members (Optional)</FormLabel>
					<Input
						type="number"
						placeholder="e.g., 10"
						value={formData.maxMembers}
						onChange={e => handleInputChange('maxMembers', e.target.value)}
						min="2"
						max="1000"
						isDisabled={isSubmitting}
					/>
					<FormHelperText>
						Set a limit on how many members can join your team (leave empty for no limit)
					</FormHelperText>
				</FormControl>

				{/* Privacy Settings */}
				<FormControl>
					<FormLabel>Privacy</FormLabel>
					<Checkbox
						isChecked={!formData.isPublic}
						onChange={e => setFormData({ ...formData, isPublic: !e.target.checked })}
						isDisabled={isSubmitting}
					>
						Private Team
					</Checkbox>
					<FormHelperText>Private teams require an access code for others to join</FormHelperText>
				</FormControl>

				{/* Access Code for Private Teams */}
				{!formData.isPublic && (
					<FormControl isRequired>
						<FormLabel>Access Code</FormLabel>
						<Input
							type="password"
							value={formData.accessCode}
							onChange={e => setFormData({ ...formData, accessCode: e.target.value })}
							placeholder="Enter access code for private team"
							minLength={3}
							isDisabled={isSubmitting}
						/>
						<FormHelperText>
							Minimum 3 characters. Share this code with people you want to invite.
						</FormHelperText>
					</FormControl>
				)}

				{/* Activity Types */}
				<FormControl>
					<FormLabel>Activities & Interests (Optional)</FormLabel>
					<Text fontSize="sm" color="gray.600" mb={3}>
						Select the types of activities your team focuses on:
					</Text>
					<ActivityTypeSelector
						activityTypes={activityTypes}
						selectedActivityTypeIds={selectedActivityTypeIds}
						onSelectionChange={handleActivityTypeChange}
						isLoading={isLoadingActivityTypes}
						isDisabled={isSubmitting}
					/>
					<FormHelperText>This helps other users find teams that match their interests</FormHelperText>
				</FormControl>

				{/* Form Actions */}
				{!hideButtons && (
					<HStack spacing={4} pt={4}>
						<Button type="button" variant="outline" onClick={onCancel} flex="1" isDisabled={isSubmitting}>
							Cancel
						</Button>
						<Button
							type="submit"
							colorScheme="orange"
							isLoading={isSubmitting}
							loadingText={isEditing ? 'Updating...' : 'Creating...'}
							flex="1"
						>
							{isEditing ? 'Update Team' : 'Create Team'}
						</Button>
					</HStack>
				)}
			</VStack>
		</Box>
	);
};
