import React, { useState, useEffect } from 'react';
import {
	HStack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	IconButton,
	Text,
	useDisclosure,
	Badge,
} from '@chakra-ui/react';
import { useUser } from '../../contexts/AuthContext';
import { ChallengeService } from '../../graphql/services';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { useChallenges, useTeams } from '../../hooks/useData';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AccessCodeModal } from './AccessCodeModal';
import type { Challenge, Team } from '../../types';

// Icons
const JoinIcon = () => (
	<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 6v6m0 0v6m0-6h6m-6 0H6"
		/>
	</svg>
);

const LogActivityIcon = () => (
	<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M13 10V3L4 14h7v7l9-11h-7z"
		/>
	</svg>
);

const MoreIcon = () => (
	<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
		/>
	</svg>
);

interface ChallengeActionBarProps {
	challenge: Challenge;
	onLogActivity: () => void;
	onRefresh?: () => void;
}

export const ChallengeActionBar: React.FC<ChallengeActionBarProps> = ({
	challenge,
	onLogActivity,
	onRefresh,
}) => {
	const { user } = useUser();
	const { joinChallenge } = useChallenges();
	const { teams } = useTeams();
	const notifications = useNotifications();

	// Modal states
	const {
		isOpen: isTeamModalOpen,
		onOpen: onTeamModalOpen,
		onClose: onTeamModalClose,
	} = useDisclosure();
	const {
		isOpen: isAccessCodeModalOpen,
		onOpen: onAccessCodeModalOpen,
		onClose: onAccessCodeModalClose,
	} = useDisclosure();

	// User participation state
	const [isParticipating, setIsParticipating] = useState(false);
	const [participantTeam, setParticipantTeam] = useState<Team | null>(null);
	const [participationType, setParticipationType] = useState<'individual' | 'team' | null>(null);
	const [pendingTeamId, setPendingTeamId] = useState<string | null>(null);

	// Async states
	const { isLoading: isJoining, execute: executeJoin } = useAsyncState({
		successMessage: 'Joined successfully!',
	});

	const { isLoading: isLeaving, execute: executeLeave } = useAsyncState({
		successMessage: 'Left challenge',
	});

	// Check participation status
	useEffect(() => {
		const checkParticipation = async () => {
			if (!user || !challenge.id) return;

			try {
				const participationDetails = await ChallengeService.getMyParticipationDetails(challenge.id);
				setIsParticipating(participationDetails.isParticipating);
				setParticipationType(participationDetails.participationType);

				if (participationDetails.team) {
					const teamData: Team = {
						id: participationDetails.team.id,
						name: participationDetails.team.name,
						avatarUrl: participationDetails.team.avatarUrl,
						memberCount: 0,
						isPublic: true,
						creatorId: '',
						description: '',
						maxMembers: undefined,
						sportsTypes: [],
						createdAt: '',
					};
					setParticipantTeam(teamData);
				}
			} catch (error) {
				console.error('Error checking participation:', error);
			}
		};

		checkParticipation();
	}, [user, challenge.id]);

	const handleJoinChallenge = async () => {
		if (!user) {
			notifications.error('Please log in to join challenges');
			return;
		}

		if (!challenge.isPublic) {
			if (challenge.challengeType === 'team') {
				onTeamModalOpen();
			} else {
				onAccessCodeModalOpen();
			}
			return;
		}

		if (challenge.challengeType === 'team') {
			onTeamModalOpen();
		} else {
			await executeJoin(async () => {
				await joinChallenge(challenge.id);
				setIsParticipating(true);
				setParticipationType('individual');
				onRefresh?.();
			});
		}
	};

	const handleLeaveChallenge = async () => {
		await executeLeave(async () => {
			if (participationType === 'team' && participantTeam) {
				await ChallengeService.leaveChallenge(challenge.id, participantTeam.id);
			} else {
				await ChallengeService.leaveChallenge(challenge.id);
			}
			setIsParticipating(false);
			setParticipantTeam(null);
			setParticipationType(null);
			onRefresh?.();
		});
	};

	const handleTeamSelection = async (teamId: string) => {
		if (!challenge.isPublic) {
			setPendingTeamId(teamId);
			onTeamModalClose();
			onAccessCodeModalOpen();
			return;
		}

		await executeJoin(async () => {
			await joinChallenge(challenge.id, teamId);
			setIsParticipating(true);
			setParticipationType('team');
			const selectedTeam = teams?.find(t => t.id === teamId);
			if (selectedTeam) setParticipantTeam(selectedTeam);
			onRefresh?.();
		});
		onTeamModalClose();
	};

	const handleAccessCodeSubmit = async (accessCode: string) => {
		await executeJoin(async () => {
			if (pendingTeamId) {
				await joinChallenge(challenge.id, pendingTeamId, accessCode);
				setIsParticipating(true);
				setParticipationType('team');
				const selectedTeam = teams?.find(t => t.id === pendingTeamId);
				if (selectedTeam) setParticipantTeam(selectedTeam);
				setPendingTeamId(null);
			} else {
				await joinChallenge(challenge.id, undefined, accessCode);
				setIsParticipating(true);
				setParticipationType('individual');
			}
			onRefresh?.();
		});
		onAccessCodeModalClose();
	};

	const isCurrentUserCreator = user?.id === challenge.creatorId;

	// For challenge creators - show manage options
	if (isCurrentUserCreator) {
		return (
			<HStack spacing={2}>
				<Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
					<Text fontSize="xs" fontWeight="medium">
						Creator
					</Text>
				</Badge>

				<Button colorScheme="orange" leftIcon={<LogActivityIcon />} onClick={onLogActivity} size="sm">
					Log Activity
				</Button>
				<Menu>
					<MenuButton
						as={IconButton}
						icon={<MoreIcon />}
						variant="ghost"
						size="sm"
						aria-label="More options"
					/>
					<MenuList>
						<MenuItem onClick={() => window.open(`/activities?challengeId=${challenge.id}`, '_self')}>
							Manage Activities
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		);
	}

	// For non-participating users - emphasize joining
	if (!isParticipating) {
		return (
			<HStack spacing={2}>
				<Button
					colorScheme="green"
					leftIcon={<JoinIcon />}
					onClick={handleJoinChallenge}
					isLoading={isJoining}
					size="md"
					fontWeight="semibold"
				>
					Join Challenge
				</Button>

				{/* Modals */}
				{challenge.challengeType === 'team' && (
					<TeamSelectionModal
						isOpen={isTeamModalOpen}
						onClose={onTeamModalClose}
						onSelectTeam={handleTeamSelection}
						teams={teams || []}
						challengeTitle={challenge.title}
						maxTeamSize={challenge.maxTeamSize}
						isLoading={isJoining}
					/>
				)}

				<AccessCodeModal
					isOpen={isAccessCodeModalOpen}
					onClose={onAccessCodeModalClose}
					onSubmit={handleAccessCodeSubmit}
					challengeTitle={challenge.title}
					isLoading={isJoining}
				/>
			</HStack>
		);
	}

	// For participating users - show activity logging and management options
	return (
		<HStack spacing={2}>
			<Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
				<Text fontSize="xs" fontWeight="medium">
					Joined{participantTeam ? ` • ${participantTeam.name}` : ''}
				</Text>
			</Badge>

			<Button
				colorScheme="orange"
				leftIcon={<LogActivityIcon />}
				onClick={onLogActivity}
				size="sm"
				fontWeight="medium"
			>
				Log Activity
			</Button>

			<Menu>
				<MenuButton
					as={IconButton}
					icon={<MoreIcon />}
					variant="ghost"
					size="sm"
					aria-label="More options"
					colorScheme="gray"
				/>
				<MenuList>
					<MenuItem onClick={() => window.open(`/activities?challengeId=${challenge.id}`, '_self')}>
						Manage Activities
					</MenuItem>
					<MenuDivider />
					<MenuItem color="red.600" onClick={handleLeaveChallenge} isDisabled={isLeaving}>
						Leave Challenge
					</MenuItem>
				</MenuList>
			</Menu>

			{/* Modals */}
			{challenge.challengeType === 'team' && (
				<TeamSelectionModal
					isOpen={isTeamModalOpen}
					onClose={onTeamModalClose}
					onSelectTeam={handleTeamSelection}
					teams={teams || []}
					challengeTitle={challenge.title}
					maxTeamSize={challenge.maxTeamSize}
					isLoading={isJoining}
				/>
			)}

			<AccessCodeModal
				isOpen={isAccessCodeModalOpen}
				onClose={onAccessCodeModalClose}
				onSubmit={handleAccessCodeSubmit}
				challengeTitle={challenge.title}
				isLoading={isJoining}
			/>
		</HStack>
	);
};
