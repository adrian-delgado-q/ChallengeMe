import React, { useState } from 'react';
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
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import {
	useChallengeMutations,
	useChallengeActions,
	useMyParticipationQuery,
} from '../../hooks/useChallengesQuery';
import { useTeams } from '../../hooks/useTeamsQuery';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AccessCodeModal } from './AccessCodeModal';
import type { Challenge } from '../../types';

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
	const { joinChallenge } = useChallengeMutations();
	const { leaveChallenge } = useChallengeActions();
	const { teams } = useTeams();
	const notifications = useNotifications();

	// Get participation data from React Query
	const { data: participationData } = useMyParticipationQuery(challenge.id);

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

	// Local state for join flow
	const [pendingTeamId, setPendingTeamId] = useState<string | null>(null);

	// Derive participation status from React Query data
	const isParticipating = participationData?.isParticipating || false;
	const participationType = participationData?.participationType || null;
	const participantTeam = participationData?.team || null;

	// Async states
	const { isLoading: isJoining, execute: executeJoin } = useAsyncState({
		successMessage: 'Joined successfully!',
	});

	const { isLoading: isLeaving, execute: executeLeave } = useAsyncState({
		successMessage: 'Left challenge',
	});

	const handleJoinChallenge = async () => {
		if (!user) {
			notifications.error('Please log in to join challenges');
			return;
		}

		// Check if user is the creator - creators can join their own private challenges without access code
		const isCreator = challenge.creatorId === user.id;

		if (!challenge.isPublic && !isCreator) {
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
				await joinChallenge.mutateAsync({ challengeId: challenge.id });
				onRefresh?.();
			});
		}
	};

	const handleLeaveChallenge = async () => {
		await executeLeave(async () => {
			if (participationType === 'team' && participantTeam) {
				await leaveChallenge.mutateAsync({ challengeId: challenge.id, teamId: participantTeam.id });
			} else {
				await leaveChallenge.mutateAsync({ challengeId: challenge.id });
			}
			onRefresh?.();
		});
	};

	const handleTeamSelection = async (teamId: string) => {
		// Check if user is the creator - creators can join their own private challenges without access code
		const isCreator = challenge.creatorId === user?.id;

		if (!challenge.isPublic && !isCreator) {
			setPendingTeamId(teamId);
			onTeamModalClose();
			onAccessCodeModalOpen();
			return;
		}

		await executeJoin(async () => {
			await joinChallenge.mutateAsync({ challengeId: challenge.id, asTeam: teamId });
			onRefresh?.();
		});
		onTeamModalClose();
	};

	const handleAccessCodeSubmit = async (accessCode: string) => {
		await executeJoin(async () => {
			if (pendingTeamId) {
				await joinChallenge.mutateAsync({
					challengeId: challenge.id,
					asTeam: pendingTeamId,
					accessCode,
				});
				setPendingTeamId(null);
			} else {
				await joinChallenge.mutateAsync({ challengeId: challenge.id, accessCode });
			}
			onRefresh?.();
		});
		onAccessCodeModalClose();
	};

	const isCurrentUserCreator = user?.id === challenge.creatorId;

	// For challenge creators - show manage options (regardless of participation status)
	if (isCurrentUserCreator) {
		return (
			<HStack spacing={2}>
				<Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
					<Text fontSize="xs" fontWeight="medium">
						Creator{isParticipating ? (participantTeam ? ` • ${participantTeam.name}` : ' • Joined') : ''}
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
						<MenuItem onClick={() => window.open(`/challenges/${challenge.id}/manage`, '_self')}>
							Manage Challenge
						</MenuItem>
						<MenuItem onClick={() => window.open(`/challenges/${challenge.id}/edit`, '_self')}>
							Edit Challenge
						</MenuItem>
						{isParticipating && (
							<>
								<MenuDivider />
								<MenuItem color="orange.600" onClick={handleLeaveChallenge} isDisabled={isLeaving}>
									Leave as Participant
								</MenuItem>
							</>
						)}
						{!isParticipating && (
							<>
								<MenuDivider />
								<MenuItem color="green.600" onClick={handleJoinChallenge} isDisabled={isJoining}>
									Join Challenge
								</MenuItem>
							</>
						)}
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
