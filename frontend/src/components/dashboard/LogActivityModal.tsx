import React, { useState, useEffect } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	VStack,
	Textarea,
	useDisclosure,
	Text,
	Alert,
	AlertIcon,
	Select,
	Spinner,
	Box,
} from '@chakra-ui/react';
import { useActivities } from '../../hooks/useActivitiesQuery';
import {
	useChallengeMutations,
	useChallengeQuery,
	useMyParticipationQuery,
} from '../../hooks/useChallengesQuery';
import { useTeams } from '../../hooks/useTeamsQuery';
import { useActivityTypesQuery } from '../../hooks/useActivityTypesQuery';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { TeamSelectionModal } from '../challenges/TeamSelectionModal';
import { DataTransformUtils } from '../../utils/dataTransform';
import type { Challenge, ActivityType } from '../../types';

interface LogActivityModalProps {
	isOpen: boolean;
	onClose: () => void;
	challengeId?: string;
	onActivityLogged?: () => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
	isOpen,
	onClose,
	challengeId,
	onActivityLogged,
}) => {
	// State for activity types
	const [challengeActivityTypes, setChallengeActivityTypes] = useState<ActivityType[]>([]);
	const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(true);

	// Form state
	const [selectedActivityTypeId, setSelectedActivityTypeId] = useState('');
	const [value, setValue] = useState('');
	const [notes, setNotes] = useState('');
	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [showJoinPrompt, setShowJoinPrompt] = useState(false);

	const { createActivity } = useActivities();
	const { joinChallenge } = useChallengeMutations();
	const { teams } = useTeams();
	const { data: allActivityTypes = [] } = useActivityTypesQuery();
	const { data: challengeData } = useChallengeQuery(challengeId || '');
	const { data: participationData } = useMyParticipationQuery(challengeId || '');
	const notifications = useNotifications();
	const {
		isOpen: isTeamModalOpen,
		onOpen: onTeamModalOpen,
		onClose: onTeamModalClose,
	} = useDisclosure();
	const { isLoading: isSubmitting, execute } = useAsyncState({
		showSuccessNotifications: true,
		successMessage: 'Activity logged successfully!',
	});
	const initialRef = React.useRef(null);

	// Update challenge and activity types when data changes
	useEffect(() => {
		if (!challengeId || !isOpen || !challengeData || !allActivityTypes) return;

		setIsLoadingActivityTypes(true);
		setChallenge(challengeData);

		// Filter activity types based on challenge's supported types
		if (challengeData.activityTypes && challengeData.activityTypes.length > 0) {
			const supportedTypes = allActivityTypes.filter(at =>
				challengeData.activityTypes!.includes(at.id)
			);
			setChallengeActivityTypes(supportedTypes);
			// Set default activity type for single-activity challenges
			if (supportedTypes.length === 1) {
				setSelectedActivityTypeId(supportedTypes[0].id);
			}
		} else {
			// If challenge doesn't have activity types set, show all
			setChallengeActivityTypes(allActivityTypes);
		}

		setIsLoadingActivityTypes(false);
	}, [challengeId, isOpen, challengeData, allActivityTypes]);

	const handleSubmit = async () => {
		// Validation
		if (!challengeId) {
			notifications.error('Error', 'No challenge ID provided');
			return;
		}

		if (!selectedActivityTypeId) {
			notifications.error('Validation Error', 'Please select an activity type');
			return;
		}

		if (!value || value.trim() === '') {
			notifications.error('Validation Error', 'Please enter a value for your activity');
			return;
		}

		// Validate the numeric value
		const numericValue = parseFloat(value);
		if (isNaN(numericValue) || numericValue <= 0) {
			notifications.error('Validation Error', 'Please enter a valid positive number');
			return;
		}

		const selectedActivityType = challengeActivityTypes.find(at => at.id === selectedActivityTypeId);
		if (!selectedActivityType) {
			notifications.error('Error', 'Selected activity type not found');
			return;
		}

		const result = await execute(async () => {
			// Check if user is already a participant using React Query data
			if (!participationData?.isParticipating) {
				// User is not a participant, check if this is a team challenge
				if (challenge?.challengeType === 'team') {
					// For team challenges, show team selection or join prompt
					setShowJoinPrompt(true);
					return false; // Don't continue with activity logging
				} else {
					// For individual challenges, auto-join as individual
					await joinChallenge.mutateAsync({ challengeId });
					// After joining, we need to refresh participation data to get participant ID
					// For now, we'll create the activity without the participant ID and let the backend handle it
					await createActivity({
						participantId: undefined, // Backend will resolve this
						activityTypeId: selectedActivityTypeId,
						value: numericValue,
						notes,
						date: DataTransformUtils.getCurrentDateInToronto(), // Today's date in Toronto timezone
					});
				}
			} else {
				// User is already a participant - use participant ID from participation data
				await createActivity({
					participantId: participationData.participantId,
					activityTypeId: selectedActivityTypeId,
					value: numericValue,
					notes,
					date: DataTransformUtils.getCurrentDateInToronto(), // Today's date in Toronto timezone
				});
			}

			return true;
		});

		if (result) {
			// Reset form and close modal
			resetForm();
			onActivityLogged?.();
			onClose();
		}
	};

	const handleJoinAsIndividual = async () => {
		const result = await execute(async () => {
			// Join as individual and then log activity
			await joinChallenge.mutateAsync({ challengeId: challengeId! });

			const numericValue = parseFloat(value);
			await createActivity({
				participantId: undefined, // Backend will resolve this after joining
				activityTypeId: selectedActivityTypeId,
				value: numericValue,
				notes,
				date: DataTransformUtils.getCurrentDateInToronto(), // Today's date in Toronto timezone
			});

			return true;
		});

		if (result) {
			// Reset form and close modal
			resetForm();
			onActivityLogged?.();
			onClose();
		}
	};

	const handleJoinAsTeam = () => {
		// Open team selection modal
		onTeamModalOpen();
	};

	const handleTeamSelection = async (teamId: string) => {
		const result = await execute(async () => {
			// Join as team and then log activity
			await joinChallenge.mutateAsync({ challengeId: challengeId!, asTeam: teamId });

			const numericValue = parseFloat(value);
			await createActivity({
				participantId: undefined, // Backend will resolve this after joining
				activityTypeId: selectedActivityTypeId,
				value: numericValue,
				notes,
				date: DataTransformUtils.getCurrentDateInToronto(), // Today's date in Toronto timezone
			});

			return true;
		});

		if (result) {
			// Reset form and close modal
			resetForm();
			onTeamModalClose();
			onActivityLogged?.();
			onClose();
		}
	};

	const resetForm = () => {
		setSelectedActivityTypeId('');
		setValue('');
		setNotes('');
		setShowJoinPrompt(false);
	};

	const handleClose = () => {
		if (!isSubmitting) {
			resetForm();
			onClose();
		}
	};

	const handleCancelJoin = () => {
		setShowJoinPrompt(false);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Log Your Activity</ModalHeader>
					<ModalCloseButton isDisabled={isSubmitting} />
					<ModalBody>
						<VStack spacing={4}>
							{showJoinPrompt && challenge?.challengeType === 'team' ? (
								<>
									<Alert status="info">
										<AlertIcon />
										<VStack align="start" spacing={2}>
											<Text fontSize="sm" fontWeight="medium">
												Join Challenge to Log Activity
											</Text>
											<Text fontSize="sm">
												You need to join "{challenge.title}" before you can log activities. This is a team
												challenge - would you like to join as an individual or select a team?
											</Text>
										</VStack>
									</Alert>

									<VStack spacing={3} w="full">
										<Button
											colorScheme="orange"
											onClick={handleJoinAsIndividual}
											isLoading={isSubmitting}
											loadingText="Joining..."
											w="full"
										>
											Join as Individual
										</Button>
										<Button
											variant="outline"
											colorScheme="orange"
											onClick={handleJoinAsTeam}
											isDisabled={!teams || teams.length === 0}
											w="full"
										>
											Join with Team
										</Button>
										<Button variant="ghost" onClick={handleCancelJoin} size="sm">
											Cancel
										</Button>
									</VStack>
								</>
							) : (
								<>
									{/* Activity Type Selection */}
									{isLoadingActivityTypes ? (
										<Box textAlign="center" py={4}>
											<Spinner size="md" color="orange.500" />
											<Text mt={2} fontSize="sm" color="gray.500">
												Loading activity types...
											</Text>
										</Box>
									) : challengeActivityTypes.length > 1 ? (
										<FormControl isRequired>
											<FormLabel>Activity Type</FormLabel>
											<Select
												placeholder="Select activity type"
												value={selectedActivityTypeId}
												onChange={e => setSelectedActivityTypeId(e.target.value)}
												isDisabled={isSubmitting}
											>
												{challengeActivityTypes.map(activityType => (
													<option key={activityType.id} value={activityType.id}>
														{activityType.name}
													</option>
												))}
											</Select>
										</FormControl>
									) : challengeActivityTypes.length === 1 ? (
										<FormControl>
											<FormLabel>Activity Type</FormLabel>
											<Text fontWeight="medium" color="gray.700">
												{challengeActivityTypes[0].name}
											</Text>
										</FormControl>
									) : null}

									{/* Value input - shows appropriate unit based on selected activity type */}
									{(() => {
										const currentActivityType =
											challengeActivityTypes.find(at => at.id === selectedActivityTypeId) ||
											(challengeActivityTypes.length === 1 ? challengeActivityTypes[0] : null);

										if (!currentActivityType) return null;

										return (
											<FormControl isRequired>
												<FormLabel>{currentActivityType.name} Value</FormLabel>
												<InputGroup>
													<Input
														ref={initialRef}
														type="number"
														step="0.1"
														placeholder={`Enter ${currentActivityType.unitLabel}`}
														value={value}
														onChange={e => setValue(e.target.value)}
														isDisabled={isSubmitting}
													/>
													<InputRightAddon>{currentActivityType.unitLabel}</InputRightAddon>
												</InputGroup>
											</FormControl>
										);
									})()}

									<FormControl>
										<FormLabel>Notes (Optional)</FormLabel>
										<Textarea
											placeholder="How did it go?"
											value={notes}
											onChange={e => setNotes(e.target.value)}
											isDisabled={isSubmitting}
										/>
									</FormControl>
								</>
							)}
						</VStack>
					</ModalBody>
					{!showJoinPrompt && (
						<ModalFooter>
							<Button variant="ghost" mr={3} onClick={handleClose} isDisabled={isSubmitting}>
								Cancel
							</Button>
							<Button
								colorScheme="orange"
								onClick={handleSubmit}
								isLoading={isSubmitting}
								loadingText="Logging..."
							>
								Log Activity
							</Button>
						</ModalFooter>
					)}
				</ModalContent>
			</Modal>

			{/* Team Selection Modal */}
			{challenge?.challengeType === 'team' && (
				<TeamSelectionModal
					isOpen={isTeamModalOpen}
					onClose={onTeamModalClose}
					onSelectTeam={handleTeamSelection}
					teams={teams || []}
					challengeTitle={challenge.title}
					maxTeamSize={challenge.maxTeamSize}
					isLoading={isSubmitting}
				/>
			)}
		</>
	);
};
