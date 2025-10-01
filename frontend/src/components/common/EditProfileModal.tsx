import React, { useState, useEffect, useCallback } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	VStack,
	FormControl,
	FormLabel,
	Input,
	Avatar,
	HStack,
	Text,
	Grid,
	Box,
	useToast,
	Spinner,
	Center,
	FormErrorMessage,
	FormHelperText,
	InputGroup,
	InputRightElement,
	Icon,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { ImageUploadField } from './ImageUploadField';
import { FileUploadService } from '../../services/fileUploadService';

interface EditProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	profile: any;
	onProfileUpdate: (updatedProfile: any) => void;
}

// Predefined avatar options using DiceBear API
const AVATAR_STYLES = [
	'adventurer',
	'adventurer-neutral',
	'avataaars',
	'big-ears',
	'big-ears-neutral',
	'big-smile',
	'bottts',
	'croodles',
	'fun-emoji',
	'identicon',
	'lorelei',
	'micah',
	'miniavs',
	'open-peeps',
	'personas',
	'pixel-art',
	'shapes',
];

const generateAvatarUrl = (style: string, seed: string) =>
	`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
	isOpen,
	onClose,
	profile,
	onProfileUpdate,
}) => {
	const [username, setUsername] = useState('');
	const [selectedAvatar, setSelectedAvatar] = useState('');
	const [avatarOptions, setAvatarOptions] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isGeneratingAvatars, setIsGeneratingAvatars] = useState(true);
	const [usernameStatus, setUsernameStatus] = useState<{
		isChecking: boolean;
		isAvailable?: boolean;
		suggestion?: string;
		error?: string;
	}>({ isChecking: false });
	const toast = useToast();

	// Initialize form data when modal opens
	useEffect(() => {
		if (isOpen && profile) {
			setUsername(profile.username || '');
			setSelectedAvatar(profile.avatarUrl || '');
			setUsernameStatus({ isChecking: false });
			generateAvatarOptions();
		}
	}, [isOpen, profile]);

	// Debounced username validation
	const checkUsernameAvailability = useCallback(
		async (usernameToCheck: string) => {
			if (!usernameToCheck || usernameToCheck === profile?.username) {
				setUsernameStatus({ isChecking: false });
				return;
			}

			if (usernameToCheck.length < 3) {
				setUsernameStatus({
					isChecking: false,
					isAvailable: false,
					error: 'Username must be at least 3 characters',
				});
				return;
			}

			setUsernameStatus({ isChecking: true });

			try {
				const { ProfileService } = await import('../../services');
				const result = await ProfileService.checkUsernameAvailability(usernameToCheck);

				setUsernameStatus({
					isChecking: false,
					isAvailable: result.isAvailable,
					suggestion: result.suggestion,
				});
			} catch {
				setUsernameStatus({
					isChecking: false,
					isAvailable: false,
					error: 'Error checking username availability',
				});
			}
		},
		[profile?.username]
	);

	// Debounce username checking
	useEffect(() => {
		if (!username) return;

		const timeoutId = setTimeout(() => {
			checkUsernameAvailability(username);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [username, checkUsernameAvailability]);

	const generateAvatarOptions = () => {
		setIsGeneratingAvatars(true);
		const seed = Math.random().toString(36).substring(7);
		const options = AVATAR_STYLES.slice(0, 12).map(style => generateAvatarUrl(style, seed));
		setAvatarOptions(options);
		setIsGeneratingAvatars(false);
	};

	const handleSubmit = async () => {
		if (!username.trim()) {
			toast({
				title: 'Error',
				description: 'Username is required',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (usernameStatus.isChecking) {
			toast({
				title: 'Please wait',
				description: 'Still checking username availability',
				status: 'info',
				duration: 2000,
				isClosable: true,
			});
			return;
		}

		if (username !== profile?.username && !usernameStatus.isAvailable) {
			toast({
				title: 'Username not available',
				description: usernameStatus.suggestion
					? `Try "${usernameStatus.suggestion}" instead`
					: 'Please choose a different username',
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			const { ProfileService } = await import('../../services');

			const updatedProfile = await ProfileService.updateProfile({
				username: username.trim(),
				avatarUrl: selectedAvatar,
			});

			onProfileUpdate(updatedProfile);
			onClose();

			toast({
				title: 'Success',
				description: 'Profile updated successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			console.error('Error updating profile:', error);
			toast({
				title: 'Error',
				description: error instanceof Error ? error.message : 'Failed to update profile',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		if (!isLoading) {
			onClose();
		}
	};

	const handleAvatarUpload = async (file: File, result: any) => {
		const uploadResult = await FileUploadService.uploadAvatar(file);
		// Update the result object passed by reference
		result.success = uploadResult.success;
		result.url = uploadResult.url;
		result.error = uploadResult.error;

		// Set the uploaded avatar as selected
		if (uploadResult.success && uploadResult.url) {
			setSelectedAvatar(uploadResult.url);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} size="lg" closeOnOverlayClick={!isLoading}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Profile</ModalHeader>
				<ModalCloseButton isDisabled={isLoading} />

				<ModalBody>
					<VStack spacing={6}>
						{/* Username Input */}
						<FormControl
							isRequired
							isInvalid={
								usernameStatus.error ? true : username !== profile?.username && !usernameStatus.isAvailable
							}
						>
							<FormLabel>Username</FormLabel>
							<InputGroup>
								<Input
									value={username}
									onChange={e => setUsername(e.target.value)}
									placeholder="Enter your username"
									isDisabled={isLoading}
								/>
								<InputRightElement>
									{usernameStatus.isChecking ? (
										<Spinner size="sm" />
									) : username && username !== profile?.username ? (
										usernameStatus.isAvailable ? (
											<Icon as={CheckIcon} color="green.500" />
										) : (
											<Icon as={WarningIcon} color="red.500" />
										)
									) : null}
								</InputRightElement>
							</InputGroup>
							{usernameStatus.error && <FormErrorMessage>{usernameStatus.error}</FormErrorMessage>}
							{username !== profile?.username && !usernameStatus.isAvailable && !usernameStatus.error && (
								<FormErrorMessage>
									Username not available
									{usernameStatus.suggestion && <>. Try "{usernameStatus.suggestion}"</>}
								</FormErrorMessage>
							)}
							{username !== profile?.username && usernameStatus.isAvailable && (
								<FormHelperText color="green.500">Username is available!</FormHelperText>
							)}
							{username === profile?.username && <FormHelperText>Current username</FormHelperText>}
						</FormControl>

						{/* Current Avatar */}
						<FormControl>
							<FormLabel>Current Avatar</FormLabel>
							<HStack>
								<Avatar size="lg" src={selectedAvatar} name={username} />
								<VStack align="start" spacing={1}>
									<Text fontWeight="medium">Selected Avatar</Text>
									<Button
										size="sm"
										variant="outline"
										onClick={generateAvatarOptions}
										isLoading={isGeneratingAvatars}
										isDisabled={isLoading}
									>
										Generate New Options
									</Button>
								</VStack>
							</HStack>
						</FormControl>

						{/* Avatar Selection Tabs */}
						<FormControl>
							<FormLabel>Choose Avatar</FormLabel>
							<Tabs variant="enclosed" colorScheme="orange">
								<TabList>
									<Tab>Upload Image</Tab>
									<Tab>Generated Avatars</Tab>
								</TabList>
								<TabPanels>
									<TabPanel px={0}>
										<ImageUploadField
											label=""
											value={selectedAvatar}
											onChange={url => setSelectedAvatar(url || '')}
											onUpload={handleAvatarUpload}
											isDisabled={isLoading}
											placeholder={username}
											variant="avatar"
											size="xl"
											maxSizeMB={2}
										/>
									</TabPanel>
									<TabPanel px={0}>
										{isGeneratingAvatars ? (
											<Center py={8}>
												<Spinner size="lg" color="orange.500" />
											</Center>
										) : (
											<VStack spacing={4}>
												<Button
													size="sm"
													variant="outline"
													onClick={generateAvatarOptions}
													isLoading={isGeneratingAvatars}
													isDisabled={isLoading}
												>
													Generate New Options
												</Button>
												<Grid templateColumns="repeat(4, 1fr)" gap={3}>
													{avatarOptions.map((avatarUrl, index) => (
														<Box
															key={index}
															borderWidth={selectedAvatar === avatarUrl ? '3px' : '1px'}
															borderColor={selectedAvatar === avatarUrl ? 'orange.500' : 'gray.200'}
															borderRadius="md"
															p={2}
															cursor="pointer"
															onClick={() => !isLoading && setSelectedAvatar(avatarUrl)}
															transition="all 0.2s"
															_hover={{
																borderColor: 'orange.300',
																transform: 'scale(1.05)',
															}}
														>
															<Avatar size="md" src={avatarUrl} />
														</Box>
													))}
												</Grid>
											</VStack>
										)}
									</TabPanel>
								</TabPanels>
							</Tabs>
						</FormControl>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={handleClose} isDisabled={isLoading}>
						Cancel
					</Button>
					<Button
						colorScheme="orange"
						onClick={handleSubmit}
						isLoading={isLoading}
						loadingText="Updating..."
					>
						Update Profile
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
