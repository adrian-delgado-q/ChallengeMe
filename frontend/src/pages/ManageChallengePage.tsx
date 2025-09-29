import React, { useState, useEffect } from 'react';
import {
	Box,
	Heading,
	Text,
	VStack,
	HStack,
	Card,
	Badge,
	Button,
	Stat,
	StatLabel,
	StatNumber,
	useDisclosure,
	Spinner,
	Center,
	Alert,
	AlertIcon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Avatar,
	IconButton,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	SimpleGrid,
	Progress,
	useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditIcon, DeleteIcon, ViewIcon, SettingsIcon } from '@chakra-ui/icons';
import { ChallengeService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';
import { useAsyncState } from '../hooks/useAsyncState';
import { useNotifications } from '../utils/notifications';

interface Challenge {
	id: string;
	creatorId?: string;
	title: string;
	description?: string;
	type?: string;
	challengeType: 'individual' | 'team';
	status?: 'ACTIVE' | 'CLOSED' | 'CANCELLED';
	participants?: number;
	maxParticipants?: number;
	maxTeamSize?: number;
	startDate?: string;
	endDate: string;
	progress?: number;
	isPublic: boolean;
	milestones?: Array<{ name: string; value: number }>;
	createdAt?: string;
	creator?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
}

interface ChallengeAnalytics {
	challenge: {
		id: any;
		title: any;
		createdAt: any;
		challengeType: any;
	};
	totalParticipants: number;
	totalActivities: number;
	activitiesByDate: Record<string, number>;
	participantsByDate: Record<string, number>;
	averageActivitiesPerParticipant: string;
}

interface Participant {
	id: string;
	joinedAt: string;
	userId?: string;
	teamId?: string;
	user?: {
		id: string;
		username: string;
		avatarUrl?: string;
	};
	team?: {
		id: string;
		name: string;
		avatarUrl?: string;
	};
}

const ManageChallengePage: React.FC = () => {
	const { id: challengeId } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { user } = useUser();
	const notifications = useNotifications();

	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [analytics, setAnalytics] = useState<ChallengeAnalytics | null>(null);
	const [participants, setParticipants] = useState<Participant[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

	const { isOpen: isStatusOpen, onOpen: onStatusOpen, onClose: onStatusClose } = useDisclosure();
	const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const cardBg = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.600');

	const { isLoading: isUpdating, execute: executeStatusUpdate } = useAsyncState({
		successMessage: 'Challenge status updated successfully!',
	});

	const { isLoading: isRemoving, execute: executeRemove } = useAsyncState({
		successMessage: 'Participant removed successfully!',
	});

	// Fetch challenge data and analytics
	useEffect(() => {
		const fetchData = async () => {
			if (!challengeId) return;

			try {
				setLoading(true);
				const [challengeData, analyticsData] = await Promise.all([
					ChallengeService.getChallengeById(challengeId),
					ChallengeService.getChallengeAnalytics(challengeId),
				]);

				if (challengeData) {
					setChallenge(challengeData);
					setParticipants(challengeData.participantList || []);
				}

				if (analyticsData) {
					setAnalytics(analyticsData);
				}
			} catch (error) {
				console.error('Error fetching challenge data:', error);
				notifications.error('Error', 'Failed to load challenge data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [challengeId]); // Remove notifications from dependency array

	const handleStatusUpdate = async (newStatus: 'ACTIVE' | 'CLOSED' | 'CANCELLED') => {
		if (!challengeId) return;

		await executeStatusUpdate(async () => {
			await ChallengeService.updateChallengeStatus(challengeId, newStatus);
			if (challenge) {
				setChallenge({ ...challenge, status: newStatus });
			}
		});
		onStatusClose();
	};

	const handleRemoveParticipant = async () => {
		if (!challengeId || !selectedParticipant) return;

		await executeRemove(async () => {
			await ChallengeService.removeParticipant(challengeId, selectedParticipant.id);
			setParticipants(prev => prev.filter(p => p.id !== selectedParticipant.id));
			if (analytics) {
				setAnalytics({
					...analytics,
					totalParticipants: analytics.totalParticipants - 1,
				});
			}
		});
		onRemoveClose();
		setSelectedParticipant(null);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'ACTIVE':
				return 'green';
			case 'CLOSED':
				return 'orange';
			case 'CANCELLED':
				return 'red';
			default:
				return 'gray';
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case 'ACTIVE':
				return 'Active';
			case 'CLOSED':
				return 'Closed';
			case 'CANCELLED':
				return 'Cancelled';
			default:
				return 'Unknown';
		}
	};

	if (loading) {
		return (
			<Center h="400px">
				<VStack spacing={4}>
					<Spinner size="xl" color="orange.500" />
					<Text>Loading challenge management...</Text>
				</VStack>
			</Center>
		);
	}

	if (!challenge) {
		return (
			<Alert status="error">
				<AlertIcon />
				Challenge not found or you don't have permission to manage it.
			</Alert>
		);
	}

	// Check if user is the creator
	if (challenge.creatorId !== user?.id) {
		return (
			<Alert status="error">
				<AlertIcon />
				You don't have permission to manage this challenge.
			</Alert>
		);
	}

	return (
		<VStack spacing={8} align="stretch">
			{/* Header */}
			<Box>
				<HStack justify="space-between" align="start" wrap="wrap" gap={4}>
					<VStack align="start" spacing={2}>
						<Heading as="h1" size="xl">
							{challenge.title}
						</Heading>
						<HStack spacing={4}>
							<Badge colorScheme={getStatusColor(challenge.status || 'ACTIVE')} size="lg">
								{getStatusText(challenge.status || 'ACTIVE')}
							</Badge>
							<Badge variant="outline" colorScheme="blue">
								{challenge.challengeType === 'team' ? 'Team Challenge' : 'Individual Challenge'}
							</Badge>
							<Text fontSize="sm" color="gray.500">
								Created {new Date(challenge.createdAt || '').toLocaleDateString()}
							</Text>
						</HStack>
						{challenge.description && (
							<Text color="gray.600" maxW="2xl">
								{challenge.description}
							</Text>
						)}
					</VStack>

					<HStack spacing={2}>
						<Button
							leftIcon={<SettingsIcon />}
							colorScheme="orange"
							variant="outline"
							onClick={onStatusOpen}
						>
							Manage Status
						</Button>
						<Button
							leftIcon={<EditIcon />}
							colorScheme="blue"
							variant="outline"
							onClick={() => navigate(`/challenges/${challengeId}/edit`)}
						>
							Edit Challenge
						</Button>
						<Button
							leftIcon={<ViewIcon />}
							variant="outline"
							onClick={() => navigate(`/challenges/${challengeId}`)}
						>
							View Challenge
						</Button>
					</HStack>
				</HStack>
			</Box>

			{/* Analytics Overview */}
			{analytics && (
				<Card p={6} bg={cardBg} borderColor={borderColor}>
					<Heading size="md" mb={4}>
						Challenge Analytics
					</Heading>
					<SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
						<Stat>
							<StatLabel>Total Participants</StatLabel>
							<StatNumber>{analytics.totalParticipants}</StatNumber>
						</Stat>
						<Stat>
							<StatLabel>Total Activities</StatLabel>
							<StatNumber>{analytics.totalActivities}</StatNumber>
						</Stat>
						<Stat>
							<StatLabel>Avg Activities per Participant</StatLabel>
							<StatNumber>{analytics.averageActivitiesPerParticipant}</StatNumber>
						</Stat>
						<Stat>
							<StatLabel>Days Remaining</StatLabel>
							<StatNumber>
								{Math.max(
									0,
									Math.ceil(
										(new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
									)
								)}
							</StatNumber>
						</Stat>
					</SimpleGrid>
				</Card>
			)}

			{/* Challenge Progress */}
			<Card p={6} bg={cardBg} borderColor={borderColor}>
				<Heading size="md" mb={4}>
					Challenge Progress
				</Heading>
				<VStack spacing={4}>
					<Box w="full">
						<HStack justify="space-between" mb={2}>
							<Text fontSize="sm">Time Progress</Text>
							<Text fontSize="sm">
								{Math.round(
									((new Date().getTime() - new Date(challenge.startDate || '').getTime()) /
										(new Date(challenge.endDate).getTime() - new Date(challenge.startDate || '').getTime())) *
										100
								)}
								%
							</Text>
						</HStack>
						<Progress
							value={
								((new Date().getTime() - new Date(challenge.startDate || '').getTime()) /
									(new Date(challenge.endDate).getTime() - new Date(challenge.startDate || '').getTime())) *
								100
							}
							colorScheme="orange"
							size="lg"
							rounded="md"
						/>
					</Box>

					{challenge.maxParticipants && (
						<Box w="full">
							<HStack justify="space-between" mb={2}>
								<Text fontSize="sm">Participation</Text>
								<Text fontSize="sm">
									{participants.length} / {challenge.maxParticipants}
								</Text>
							</HStack>
							<Progress
								value={(participants.length / challenge.maxParticipants) * 100}
								colorScheme="blue"
								size="lg"
								rounded="md"
							/>
						</Box>
					)}
				</VStack>
			</Card>

			{/* Participants Management */}
			<Card p={6} bg={cardBg} borderColor={borderColor}>
				<Heading size="md" mb={4}>
					Participants ({participants.length})
				</Heading>

				{participants.length === 0 ? (
					<Text color="gray.500" textAlign="center" py={8}>
						No participants have joined this challenge yet.
					</Text>
				) : (
					<Box overflowX="auto">
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Participant</Th>
									<Th>Type</Th>
									<Th>Joined Date</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								{participants.map(participant => (
									<Tr key={participant.id}>
										<Td>
											<HStack spacing={3}>
												<Avatar
													size="sm"
													src={participant.user?.avatarUrl || participant.team?.avatarUrl}
													name={participant.user?.username || participant.team?.name}
												/>
												<Text fontWeight="medium">{participant.user?.username || participant.team?.name}</Text>
											</HStack>
										</Td>
										<Td>
											<Badge variant="outline" colorScheme={participant.teamId ? 'purple' : 'blue'}>
												{participant.teamId ? 'Team' : 'Individual'}
											</Badge>
										</Td>
										<Td>{new Date(participant.joinedAt).toLocaleDateString()}</Td>
										<Td>
											<IconButton
												aria-label="Remove participant"
												icon={<DeleteIcon />}
												size="sm"
												colorScheme="red"
												variant="ghost"
												onClick={() => {
													setSelectedParticipant(participant);
													onRemoveOpen();
												}}
											/>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				)}
			</Card>

			{/* Status Management Modal */}
			<Modal isOpen={isStatusOpen} onClose={onStatusClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Manage Challenge Status</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<VStack spacing={4} align="stretch">
							<Text>
								Current status:{' '}
								<Badge colorScheme={getStatusColor(challenge.status || 'ACTIVE')}>
									{getStatusText(challenge.status || 'ACTIVE')}
								</Badge>
							</Text>

							<VStack spacing={3} align="stretch">
								<Button
									colorScheme="green"
									variant={challenge.status === 'ACTIVE' ? 'solid' : 'outline'}
									onClick={() => handleStatusUpdate('ACTIVE')}
									isLoading={isUpdating}
									disabled={challenge.status === 'ACTIVE'}
								>
									Active - Open for new participants
								</Button>

								<Button
									colorScheme="orange"
									variant={challenge.status === 'CLOSED' ? 'solid' : 'outline'}
									onClick={() => handleStatusUpdate('CLOSED')}
									isLoading={isUpdating}
									disabled={challenge.status === 'CLOSED'}
								>
									Closed - No new participants
								</Button>

								<Button
									colorScheme="red"
									variant={challenge.status === 'CANCELLED' ? 'solid' : 'outline'}
									onClick={() => handleStatusUpdate('CANCELLED')}
									isLoading={isUpdating}
									disabled={challenge.status === 'CANCELLED'}
								>
									Cancelled - Challenge stopped
								</Button>
							</VStack>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onStatusClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Remove Participant Confirmation */}
			<AlertDialog
				isOpen={isRemoveOpen}
				leastDestructiveRef={cancelRef}
				onClose={onRemoveClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Remove Participant
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to remove{' '}
							<strong>{selectedParticipant?.user?.username || selectedParticipant?.team?.name}</strong>{' '}
							from this challenge? This action cannot be undone and will also remove all their activities.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onRemoveClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={handleRemoveParticipant} ml={3} isLoading={isRemoving}>
								Remove
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</VStack>
	);
};

export default ManageChallengePage;
