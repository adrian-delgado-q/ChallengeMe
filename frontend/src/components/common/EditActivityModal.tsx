import React, { useState, useEffect } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	VStack,
	Textarea,
	Text,
	HStack,
	Icon,
	Select,
	Spinner,
	Box,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ValidationUtils } from '../../utils/validation';
import { ActivityTypeService } from '../../graphql/services/activityTypeService';
import type { Activity, ActivityType } from '../../types';

interface EditActivityModalProps {
	isOpen: boolean;
	onClose: () => void;
	activity: Activity | null;
	onActivityUpdated?: () => void;
	onUpdateActivity: (
		activityId: string,
		data: {
			activityTypeId?: string;
			value?: number;
			notes?: string;
			date: string;
		}
	) => Promise<void>;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
	isOpen,
	onClose,
	activity,
	onActivityUpdated,
	onUpdateActivity,
}) => {
	const [notes, setNotes] = useState('');
	const [date, setDate] = useState('');
	const [selectedActivityTypeId, setSelectedActivityTypeId] = useState('');
	const [challengeActivityTypes, setChallengeActivityTypes] = useState<ActivityType[]>([]);
	const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(false);

	const notifications = useNotifications();
	const { isLoading: isSubmitting, execute } = useAsyncState({
		showSuccessNotifications: true,
		successMessage: 'Activity updated successfully!',
	});

	// Extract distance and duration from notes if they exist
	const extractDataFromNotes = (notesStr: string | null) => {
		if (!notesStr) return { distance: '', duration: '', otherNotes: '' };

		const distanceMatch = notesStr.match(/Distance:\s*([0-9.]+)\s*km/);
		const durationMatch = notesStr.match(/Duration:\s*([0-9.]+)\s*minutes/);
		const notesMatch = notesStr.match(/Notes:\s*(.+?)(?:\s*\||$)/);

		const distance = distanceMatch ? distanceMatch[1] : '';
		const duration = durationMatch ? durationMatch[1] : '';
		const otherNotes = notesMatch ? notesMatch[1].trim() : '';

		return { distance, duration, otherNotes };
	};

	const [distance, setDistance] = useState('');
	const [duration, setDuration] = useState('');

	// Load challenge activity types when modal opens
	useEffect(() => {
		const loadActivityTypes = async () => {
			if (!activity || !isOpen) return;

			try {
				setIsLoadingActivityTypes(true);
				// Get the challenge ID from the activity
				const challengeId = activity.challengeId;
				if (challengeId) {
					const types = await ActivityTypeService.getActivityTypesForChallenge(challengeId);
					setChallengeActivityTypes(types);
				}
			} catch (error) {
				console.error('Failed to load activity types:', error);
				notifications.error('Failed to load activity types');
			} finally {
				setIsLoadingActivityTypes(false);
			}
		};

		loadActivityTypes();
	}, [activity, isOpen]);

	useEffect(() => {
		if (activity) {
			setDate(activity.date);
			setNotes(activity.notes || '');
			setSelectedActivityTypeId(activity.activityTypeId || '');

			// Handle the new structure with generic value field
			if (activity.value && activity.activityType) {
				const activityType = activity.activityType;

				// Pre-populate the appropriate field based on activity type
				if (
					activityType.category === 'distance' ||
					activityType.unit === 'km' ||
					activityType.unit === 'miles'
				) {
					setDistance(activity.value.toString());
					setDuration('');
				} else if (
					activityType.category === 'time' ||
					activityType.unit === 'minutes' ||
					activityType.unit === 'hours'
				) {
					setDuration(activity.value.toString());
					setDistance('');
				} else {
					// For other types (reps, weight, etc.), clear the specific fields and use notes
					setDistance('');
					setDuration('');
				}
			} else {
				// Fallback: Extract structured data from notes (backward compatibility)
				const { distance: extractedDistance, duration: extractedDuration } = extractDataFromNotes(
					activity.notes || null
				);

				if (extractedDistance || extractedDuration) {
					setDistance(extractedDistance);
					setDuration(extractedDuration);
					setNotes(''); // Clear the raw notes field
				} else {
					setDistance('');
					setDuration('');
				}
			}
		}
	}, [activity]);

	const handleSubmit = async () => {
		if (!activity) return;

		// Validation
		const dateValidation = ValidationUtils.required(date, 'Date');
		if (!dateValidation.isValid) {
			notifications.validationError(dateValidation.error!);
			return;
		}

		if (distance) {
			const distanceValidation = ValidationUtils.combine(
				ValidationUtils.numeric(distance, 0.1, 1000, 'Distance')
			);
			if (!distanceValidation.isValid) {
				notifications.validationError(distanceValidation.error!);
				return;
			}
		}

		if (duration) {
			const durationValidation = ValidationUtils.numeric(duration, 1, 1440, 'Duration');
			if (!durationValidation.isValid) {
				notifications.validationError(durationValidation.error!);
				return;
			}
		}

		const result = await execute(async () => {
			// Determine the value based on activity type
			let activityValue: number | undefined = undefined;

			if (activity && activity.activityType) {
				const activityType = activity.activityType;

				if (
					distance &&
					(activityType.category === 'distance' ||
						activityType.unit === 'km' ||
						activityType.unit === 'miles')
				) {
					activityValue = parseFloat(distance);
				} else if (
					duration &&
					(activityType.category === 'time' ||
						activityType.unit === 'minutes' ||
						activityType.unit === 'hours')
				) {
					activityValue = parseFloat(duration);
				}
			}

			// Create activity notes combining distance, duration, and user notes
			let finalNotes = '';

			if (distance || duration) {
				const noteParts = [
					distance && `Distance: ${distance} km`,
					duration && `Duration: ${duration} minutes`,
				].filter(Boolean);
				finalNotes = noteParts.join(' | ');
			} else {
				finalNotes = notes;
			}

			await onUpdateActivity(activity.id, {
				activityTypeId:
					selectedActivityTypeId !== activity.activityTypeId ? selectedActivityTypeId : undefined,
				value: activityValue,
				notes: finalNotes || undefined,
				date,
			});
		});
		if (result !== null) {
			// Close modal and trigger refresh
			handleClose();
			if (onActivityUpdated) {
				onActivityUpdated();
			}
		}
	};

	const resetForm = () => {
		setNotes('');
		setDate('');
		setDistance('');
		setDuration('');
		setSelectedActivityTypeId('');
		setChallengeActivityTypes([]);
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	if (!activity) return null;

	const isEditable = activity.isEditable;
	const hoursLeft = isEditable
		? Math.max(
				0,
				48 -
					Math.floor((new Date().getTime() - new Date(activity.uploadedAt).getTime()) / (1000 * 60 * 60))
			)
		: 0;

	return (
		<Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<HStack>
						<Icon as={FaEdit} />
						<Text>Edit Activity</Text>
					</HStack>
				</ModalHeader>
				<ModalCloseButton isDisabled={isSubmitting} />
				<ModalBody>
					<VStack spacing={4}>
						{!isEditable && (
							<Text color="red.500" fontSize="sm" textAlign="center">
								This activity can no longer be edited (more than 48 hours have passed).
							</Text>
						)}

						{isEditable && hoursLeft > 0 && (
							<Text color="orange.500" fontSize="sm" textAlign="center">
								You have {hoursLeft} hours left to edit this activity.
							</Text>
						)}

						<FormControl isRequired>
							<FormLabel>Date</FormLabel>
							<Input
								type="date"
								value={date}
								onChange={e => setDate(e.target.value)}
								isDisabled={!isEditable || isSubmitting}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Activity Type</FormLabel>
							{isLoadingActivityTypes ? (
								<Box textAlign="center" py={4}>
									<Spinner size="md" color="orange.500" />
									<Text mt={2} fontSize="sm" color="gray.500">
										Loading activity types...
									</Text>
								</Box>
							) : challengeActivityTypes.length > 1 ? (
								<Select
									placeholder="Select activity type"
									value={selectedActivityTypeId}
									onChange={e => setSelectedActivityTypeId(e.target.value)}
									isDisabled={!isEditable || isSubmitting}
								>
									{challengeActivityTypes.map(activityType => (
										<option key={activityType.id} value={activityType.id}>
											{activityType.name} ({activityType.unitLabel})
										</option>
									))}
								</Select>
							) : challengeActivityTypes.length === 1 ? (
								<Text fontWeight="medium" color="gray.700">
									{challengeActivityTypes[0].name} ({challengeActivityTypes[0].unitLabel})
								</Text>
							) : (
								<Text color="gray.500" fontSize="sm">
									No activity types available for this challenge
								</Text>
							)}
						</FormControl>

						<FormControl>
							<FormLabel>
								{(() => {
									const selectedType =
										challengeActivityTypes.find(at => at.id === selectedActivityTypeId) ||
										activity.activityType;
									return `${selectedType?.name || 'Activity Type'} (${selectedType?.unit || 'Value'})`;
								})()}
							</FormLabel>
							{(() => {
								const selectedType =
									challengeActivityTypes.find(at => at.id === selectedActivityTypeId) ||
									activity.activityType;

								if (
									selectedType?.category === 'distance' ||
									selectedType?.unit === 'km' ||
									selectedType?.unit === 'miles'
								) {
									return (
										<Input
											type="number"
											step="0.1"
											value={distance}
											onChange={e => setDistance(e.target.value)}
											placeholder={`e.g., 5.5 ${selectedType?.unit || 'km'}`}
											isDisabled={!isEditable || isSubmitting}
										/>
									);
								} else if (
									selectedType?.category === 'time' ||
									selectedType?.unit === 'minutes' ||
									selectedType?.unit === 'hours'
								) {
									return (
										<Input
											type="number"
											value={duration}
											onChange={e => setDuration(e.target.value)}
											placeholder={`e.g., 30 ${selectedType?.unit || 'minutes'}`}
											isDisabled={!isEditable || isSubmitting}
										/>
									);
								} else {
									return (
										<Input
											type="number"
											step="0.1"
											value={activity.value?.toString() || ''}
											placeholder={`Current: ${activity.value} ${selectedType?.unit || ''}`}
											isDisabled={true}
										/>
									);
								}
							})()}
						</FormControl>

						<FormControl>
							<FormLabel>Notes</FormLabel>
							<Textarea
								value={notes}
								onChange={e => setNotes(e.target.value)}
								placeholder="Any additional details..."
								rows={3}
								isDisabled={!isEditable || isSubmitting}
							/>
						</FormControl>

						<Text fontSize="xs" color="gray.500" textAlign="center">
							Activities can only be edited within 48 hours of being logged.
						</Text>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={handleClose} isDisabled={isSubmitting}>
						Cancel
					</Button>
					<Button
						colorScheme="blue"
						onClick={handleSubmit}
						isLoading={isSubmitting}
						isDisabled={!isEditable}
					>
						Update Activity
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
