import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
	Badge,
	Avatar,
	useDisclosure,
	Alert,
	AlertIcon,
	Spinner,
	Center,
	Select,
	IconButton,
	useColorModeValue,
	Flex,
	Tooltip,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	useToast,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaClock, FaFilter, FaSearch } from 'react-icons/fa';
import { Card } from '../components/common/Card';
import { EditActivityModal } from '../components/common/EditActivityModal';
import { ActivityService } from '../graphql/services/activityService';
import type { Activity, ActivityType } from '../types';
import { ChallengeService } from '../graphql/services';
import { ActivityTypeService } from '../graphql/services/activityTypeService';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Challenge {
	id: string;
	title: string;
}

export const ActivityManagementPage: React.FC = () => {
	const [allActivities, setAllActivities] = useState<Activity[]>([]);
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
	const [selectedChallenge, setSelectedChallenge] = useState<string>('all');
	const [selectedActivityType, setSelectedActivityType] = useState<string>('all');
	const [searchText, setSearchText] = useState<string>('');
	const [dateFrom, setDateFrom] = useState<string>('');
	const [dateTo, setDateTo] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
	const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
	const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const toast = useToast();
	const cardBg = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.600');
	const deleteRef = React.useRef<HTMLButtonElement>(null);

	// Get challengeId from URL parameters
	const challengeIdFromUrl = searchParams.get('challengeId');

	// Initialize selectedChallenge from URL parameter
	useEffect(() => {
		if (challengeIdFromUrl) {
			setSelectedChallenge(challengeIdFromUrl);
		}
	}, [challengeIdFromUrl]);

	// Filter activities based on all criteria
	const filteredActivities = useMemo(() => {
		let filtered = allActivities;

		// Filter by challenge
		if (selectedChallenge !== 'all') {
			filtered = filtered.filter(
				activity => activity.challenge && activity.challenge.id === selectedChallenge
			);
		}

		// Filter by activity type
		if (selectedActivityType !== 'all') {
			filtered = filtered.filter(
				activity => activity.activityType && activity.activityType.id === selectedActivityType
			);
		}

		// Filter by search text (searches in challenge title, notes, activity type name)
		if (searchText.trim()) {
			const searchLower = searchText.toLowerCase();
			filtered = filtered.filter(activity => {
				const challengeTitle = activity.challenge?.title?.toLowerCase() || '';
				const notes = activity.notes?.toLowerCase() || '';
				const activityTypeName = activity.activityType?.name?.toLowerCase() || '';
				return (
					challengeTitle.includes(searchLower) ||
					notes.includes(searchLower) ||
					activityTypeName.includes(searchLower)
				);
			});
		}

		// Filter by date range
		if (dateFrom) {
			filtered = filtered.filter(activity => new Date(activity.date) >= new Date(dateFrom));
		}
		if (dateTo) {
			filtered = filtered.filter(activity => new Date(activity.date) <= new Date(dateTo));
		}

		return filtered;
	}, [allActivities, selectedChallenge, selectedActivityType, searchText, dateFrom, dateTo]);

	// Fetch all activities (without filtering)
	const fetchActivities = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			// Always fetch all activities, filtering will be done locally
			const data = await ActivityService.getActivitiesForManagement();
			setAllActivities(
				(data as any[]).map(item => ({
					...item,
					activityTypeId: item.activityTypeId ?? item.activityType?.id ?? '',
					value:
						item.value ??
						item.distance ??
						item.duration ??
						item.repetitions ??
						item.weight ??
						item.sets ??
						item.calories ??
						item.pace ??
						0,
				}))
			);
		} catch (err: any) {
			setError(err.message || 'Failed to fetch activities');
		} finally {
			setLoading(false);
		}
	}, []);

	// Fetch user's challenges for filtering
	const fetchChallenges = useCallback(async () => {
		try {
			const data = await ChallengeService.getMyChallenges();
			setChallenges(data || []);
		} catch (err: any) {
			console.error('Failed to fetch challenges:', err);
		}
	}, []);

	// Fetch activity types for filtering
	const fetchActivityTypes = useCallback(async () => {
		try {
			const data = await ActivityTypeService.getActivityTypes();
			setActivityTypes(data || []);
		} catch (err: any) {
			console.error('Failed to fetch activity types:', err);
		}
	}, []);

	// Load data on mount
	useEffect(() => {
		fetchActivities();
		fetchChallenges();
		fetchActivityTypes();
	}, [fetchActivities, fetchChallenges, fetchActivityTypes]);

	// Handle activity edit
	const handleEditActivity = (activity: Activity) => {
		setSelectedActivity(activity);
		onEditOpen();
	};

	// Handle edit modal close
	const handleEditClose = () => {
		setSelectedActivity(null); // Clear selected activity
		onEditClose();
	};

	// Handle successful activity update
	const handleActivityUpdated = async () => {
		await fetchActivities(); // Refresh the list
	};

	// Handle activity delete
	const handleDeleteActivity = (activity: Activity) => {
		setActivityToDelete(activity);
		onDeleteOpen();
	};

	// Confirm delete
	const confirmDelete = async () => {
		if (!activityToDelete) return;

		try {
			setIsDeleting(true);
			await ActivityService.deleteActivity(activityToDelete.id);

			toast({
				title: 'Activity deleted',
				description: 'Your activity has been successfully deleted.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			// Refresh activities
			await fetchActivities();
			onDeleteClose();
		} catch (err: any) {
			toast({
				title: 'Delete failed',
				description: err.message || 'Failed to delete activity',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsDeleting(false);
		}
	};

	// Handle activity update
	const handleUpdateActivity = async (
		activityId: string,
		data: {
			activityTypeId?: string;
			value?: number;
			notes?: string;
			date: string;
		}
	) => {
		await ActivityService.updateActivity(activityId, data);
		await fetchActivities(); // Refresh the list
	};

	// Clear all filters
	const clearFilters = () => {
		setSelectedChallenge('all');
		setSelectedActivityType('all');
		setSearchText('');
		setDateFrom('');
		setDateTo('');
	};

	// Format date for display
	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	// Format uploaded time
	const formatUploadedTime = (dateStr: string) => {
		const date = new Date(dateStr);
		const now = new Date();
		const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

		if (diffHours < 1) return 'Just now';
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffHours < 48) return `${Math.floor(diffHours / 24)}d ago`;
		return date.toLocaleDateString();
	};

	const getEditableStatus = (activity: Activity) => {
		if (!activity.isEditable) {
			return { text: 'Not editable', color: 'red' };
		}

		const hoursLeft = Math.max(
			0,
			48 -
				Math.floor((new Date().getTime() - new Date(activity.uploadedAt).getTime()) / (1000 * 60 * 60))
		);

		if (hoursLeft > 24) {
			return { text: `${hoursLeft}h left`, color: 'green' };
		} else if (hoursLeft > 12) {
			return { text: `${hoursLeft}h left`, color: 'yellow' };
		} else {
			return { text: `${hoursLeft}h left`, color: 'orange' };
		}
	};

	if (loading) {
		return (
			<Container maxW="6xl" py={8}>
				<Center h="400px">
					<VStack>
						<Spinner size="xl" color="orange.500" />
						<Text>Loading your activities...</Text>
					</VStack>
				</Center>
			</Container>
		);
	}

	return (
		<Container maxW="6xl" py={8}>
			<VStack spacing={6} align="stretch">
				{/* Header */}
				<Box>
					<Heading as="h1" size="xl" mb={2}>
						{challengeIdFromUrl ? 'Challenge Activities' : 'My Activities'}
					</Heading>
					<Text color="gray.600">
						{challengeIdFromUrl
							? 'Viewing activities for a specific challenge. You can edit activities within 48 hours of logging them.'
							: 'Manage and view all your logged activities. You can edit activities within 48 hours of logging them.'}
					</Text>
				</Box>

				{/* Enhanced Filters */}
				<Card p={6}>
					<VStack spacing={6} align="stretch">
						<HStack justify="space-between">
							<HStack>
								<FaFilter />
								<Text fontWeight="medium" fontSize="lg">
									Filter Activities
								</Text>
							</HStack>
							<HStack spacing={2}>
								<Text fontSize="sm" color="gray.500">
									{filteredActivities.length} of {allActivities.length} activities
								</Text>
								<Button size="sm" variant="outline" onClick={clearFilters}>
									Clear Filters
								</Button>
							</HStack>
						</HStack>

						<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
							{/* Challenge Filter */}
							<Box>
								<Text fontWeight="medium" mb={2} fontSize="sm">
									Challenge
								</Text>
								<Select
									value={selectedChallenge}
									onChange={e => setSelectedChallenge(e.target.value)}
									size="sm"
								>
									<option value="all">All Challenges</option>
									{challenges.map(challenge => (
										<option key={challenge.id} value={challenge.id}>
											{challenge.title}
										</option>
									))}
								</Select>
							</Box>

							{/* Activity Type Filter */}
							<Box>
								<Text fontWeight="medium" mb={2} fontSize="sm">
									Activity Type
								</Text>
								<Select
									value={selectedActivityType}
									onChange={e => setSelectedActivityType(e.target.value)}
									size="sm"
								>
									<option value="all">All Activity Types</option>
									{activityTypes.map(type => (
										<option key={type.id} value={type.id}>
											{type.name}
										</option>
									))}
								</Select>
							</Box>

							{/* Search */}
							<Box>
								<Text fontWeight="medium" mb={2} fontSize="sm">
									Search
								</Text>
								<InputGroup size="sm">
									<InputLeftElement>
										<FaSearch color="gray.400" />
									</InputLeftElement>
									<Input
										placeholder="Search challenges, notes, activities..."
										value={searchText}
										onChange={e => setSearchText(e.target.value)}
									/>
								</InputGroup>
							</Box>

							{/* Date From */}
							<Box>
								<Text fontWeight="medium" mb={2} fontSize="sm">
									From Date
								</Text>
								<Input type="date" size="sm" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
							</Box>

							{/* Date To */}
							<Box>
								<Text fontWeight="medium" mb={2} fontSize="sm">
									To Date
								</Text>
								<Input type="date" size="sm" value={dateTo} onChange={e => setDateTo(e.target.value)} />
							</Box>
						</SimpleGrid>

						{/* Show "View All Activities" button when filtering by specific challenge */}
						{challengeIdFromUrl && (
							<Alert status="info" variant="left-accent">
								<AlertIcon />
								<HStack justify="space-between" width="100%">
									<Text fontSize="sm">You're viewing activities for a specific challenge.</Text>
									<Button
										size="sm"
										variant="outline"
										colorScheme="blue"
										onClick={() => navigate('/activities')}
									>
										View All Activities
									</Button>
								</HStack>
							</Alert>
						)}
					</VStack>
				</Card>

				{/* Error state */}
				{error && (
					<Alert status="error">
						<AlertIcon />
						{error}
					</Alert>
				)}

				{/* Empty state */}
				{!loading && filteredActivities.length === 0 && (
					<Card p={8} textAlign="center">
						<VStack spacing={4}>
							<Text fontSize="lg" color="gray.500">
								No activities found
							</Text>
							<Text color="gray.400">
								{selectedChallenge === 'all'
									? "You haven't logged any activities yet."
									: 'No activities found for the selected challenge.'}
							</Text>
							<Button colorScheme="orange" onClick={() => navigate('/challenges')}>
								Explore Challenges
							</Button>
						</VStack>
					</Card>
				)}

				{/* Activities list */}
				{filteredActivities.length > 0 && (
					<VStack spacing={4} align="stretch">
						{filteredActivities.map(activity => {
							const editableStatus = getEditableStatus(activity);

							return (
								<Card
									key={activity.id}
									bg={cardBg}
									borderColor={borderColor}
									borderWidth="1px"
									p={6}
									_hover={{ shadow: 'md' }}
									transition="all 0.2s"
								>
									<Flex justify="space-between" align="flex-start">
										<HStack spacing={4} flex={1}>
											<Avatar src={activity.user?.avatarUrl} name={activity.user?.username} size="md" />

											<VStack align="start" spacing={2} flex={1}>
												<HStack spacing={2} align="center">
													<Text
														fontWeight="bold"
														color={activity.challenge?.id ? 'blue.600' : 'gray.800'}
														cursor={activity.challenge?.id ? 'pointer' : 'default'}
														onClick={() =>
															activity.challenge?.id && navigate(`/challenges/${activity.challenge.id}`)
														}
														_hover={
															activity.challenge?.id ? { color: 'blue.800', textDecoration: 'underline' } : {}
														}
														transition="all 0.2s"
													>
														{activity.challenge?.title || 'Unknown Challenge'}
													</Text>
													<Badge colorScheme={editableStatus.color} variant="subtle">
														<HStack spacing={1}>
															<FaClock size="10px" />
															<Text fontSize="xs">{editableStatus.text}</Text>
														</HStack>
													</Badge>
												</HStack>

												{/* Activity Type and Value */}
												<HStack spacing={2} align="center">
													<Text fontSize="md" fontWeight="medium" color="orange.600">
														{activity.activityType?.name || 'Unknown Activity'}
													</Text>
													<Badge colorScheme="blue" variant="outline">
														{activity.value}{' '}
														{activity.activityType?.unitLabel || activity.activityType?.unit || 'units'}
													</Badge>
												</HStack>

												<Text color="gray.600" fontSize="sm">
													Activity Date: {formatDate(activity.date)}
												</Text>

												{activity.notes && (
													<Text fontSize="sm" color="gray.700" fontStyle="italic">
														"{activity.notes}"
													</Text>
												)}

												<Text fontSize="xs" color="gray.500">
													Logged {formatUploadedTime(activity.uploadedAt)}
													{activity.team && ` • Team: ${activity.team.name}`}
												</Text>
											</VStack>
										</HStack>

										{/* Action buttons */}
										<HStack spacing={2}>
											<Tooltip
												label={
													activity.isEditable ? 'Edit activity' : 'Activity can no longer be edited (48h limit)'
												}
											>
												<IconButton
													aria-label="Edit activity"
													icon={<FaEdit />}
													size="sm"
													colorScheme="blue"
													variant="ghost"
													onClick={() => handleEditActivity(activity)}
													isDisabled={!activity.isEditable}
												/>
											</Tooltip>

											<Tooltip
												label={
													activity.isEditable
														? 'Delete activity'
														: 'Activity can no longer be deleted (48h limit)'
												}
											>
												<IconButton
													aria-label="Delete activity"
													icon={<FaTrash />}
													size="sm"
													colorScheme="red"
													variant="ghost"
													onClick={() => handleDeleteActivity(activity)}
													isDisabled={!activity.isEditable}
												/>
											</Tooltip>
										</HStack>
									</Flex>
								</Card>
							);
						})}
					</VStack>
				)}

				{/* Info box */}
				<Alert status="info" variant="left-accent">
					<AlertIcon />
					<VStack align="start" spacing={1}>
						<Text fontWeight="medium">Activity Management Rules</Text>
						<Text fontSize="sm">
							• Activities can only be edited or deleted within 48 hours of being logged • After 48 hours,
							activities become read-only for data integrity • Use filters to find specific activities
							across your challenges
						</Text>
					</VStack>
				</Alert>
			</VStack>

			{/* Edit Modal */}
			<EditActivityModal
				key={selectedActivity?.id || 'no-activity'}
				isOpen={isEditOpen}
				onClose={handleEditClose}
				activity={selectedActivity}
				onActivityUpdated={handleActivityUpdated}
				onUpdateActivity={handleUpdateActivity}
			/>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				isOpen={isDeleteOpen}
				leastDestructiveRef={deleteRef}
				onClose={onDeleteClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Activity
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete this activity? This action cannot be undone.
							{activityToDelete && (
								<Box mt={4} p={3} bg="gray.50" borderRadius="md">
									<Text fontSize="sm" fontWeight="medium">
										{activityToDelete.challenge?.title}
									</Text>
									<Text fontSize="sm" color="gray.600">
										{formatDate(activityToDelete.date)}
									</Text>
									{activityToDelete.notes && (
										<Text fontSize="sm" mt={1}>
											"{activityToDelete.notes}"
										</Text>
									)}
								</Box>
							)}
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={deleteRef} onClick={onDeleteClose} isDisabled={isDeleting}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={confirmDelete}
								ml={3}
								isLoading={isDeleting}
								loadingText="Deleting..."
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Container>
	);
};
