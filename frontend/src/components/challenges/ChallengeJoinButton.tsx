import React, { useState, useEffect } from 'react';
import { Button, useDisclosure, Icon } from '@chakra-ui/react';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AccessCodeModal } from './AccessCodeModal';
import { useChallenges, useTeams } from '../../hooks/useData';
import { useUser } from '../../contexts/AuthContext';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ChallengeService } from '../../graphql/services';
import type { Challenge, Team } from '../../types';

// Join icon
const JoinIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
		/>
	</svg>
);

// Leave icon
const LeaveIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
		/>
	</svg>
);

interface ChallengeJoinButtonProps {
	challenge: Challenge;
	onJoinSuccess?: () => void;
}

export const ChallengeJoinButton: React.FC<ChallengeJoinButtonProps> = ({
	challenge,
	onJoinSuccess,
}) => {
	const { user } = useUser();
	const { joinChallenge } = useChallenges();
	const { teams } = useTeams();
	const notifications = useNotifications();

	// Team selection modal
	const {
		isOpen: isTeamModalOpen,
		onOpen: onTeamModalOpen,
		onClose: onTeamModalClose,
	} = useDisclosure();

	// Access code modal
	const {
		isOpen: isAccessCodeModalOpen,
		onOpen: onAccessCodeModalOpen,
		onClose: onAccessCodeModalClose,
	} = useDisclosure();

	const [isParticipating, setIsParticipating] = useState(false);
	const [participantTeam, setParticipantTeam] = useState<Team | null>(null);
	const [participationType, setParticipationType] = useState<'individual' | 'team' | null>(null);
	const [pendingTeamId, setPendingTeamId] = useState<string | null>(null); // For team challenges requiring access code

	const { isLoading: isJoining, execute: executeJoin } = useAsyncState({
		successMessage: 'Successfully joined challenge!',
	});

	const { isLoading: isLeaving, execute: executeLeave } = useAsyncState({
		successMessage: 'Successfully left challenge!',
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
					// Convert the team data to match our Team interface
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
			notifications.error('Authentication Required', 'Please log in to join challenges');
			return;
		}

		// Check if challenge is private and needs access code
		if (!challenge.isPublic) {
			if (challenge.challengeType === 'team') {
				// Show team selection modal first, then access code modal
				onTeamModalOpen();
			} else {
				// Show access code modal directly for individual challenges
				onAccessCodeModalOpen();
			}
			return;
		}

		// Public challenge - proceed normally
		if (challenge.challengeType === 'team') {
			// Show team selection modal for team challenges
			onTeamModalOpen();
		} else {
			// Join as individual directly
			await executeJoin(async () => {
				await joinChallenge(challenge.id);
				setIsParticipating(true);
				setParticipationType('individual');
				onJoinSuccess?.();
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
			onJoinSuccess?.(); // Refresh data
		});
	};

	const handleTeamSelection = async (teamId: string) => {
		// Check if this is a private challenge that needs access code
		if (!challenge.isPublic) {
			// Store the selected team and show access code modal
			setPendingTeamId(teamId);
			onTeamModalClose();
			onAccessCodeModalOpen();
			return;
		}

		// Public challenge - join directly
		await executeJoin(async () => {
			await joinChallenge(challenge.id, teamId);
			setIsParticipating(true);
			setParticipationType('team');
			// Find and set the selected team
			const selectedTeam = teams?.find(t => t.id === teamId);
			if (selectedTeam) {
				setParticipantTeam(selectedTeam);
			}
			onJoinSuccess?.();
		});
		onTeamModalClose();
	};

	const handleAccessCodeSubmit = async (accessCode: string) => {
		await executeJoin(async () => {
			if (pendingTeamId) {
				// Join with team using access code
				await joinChallenge(challenge.id, pendingTeamId, accessCode);
				setIsParticipating(true);
				setParticipationType('team');
				// Find and set the selected team
				const selectedTeam = teams?.find(t => t.id === pendingTeamId);
				if (selectedTeam) {
					setParticipantTeam(selectedTeam);
				}
				setPendingTeamId(null);
			} else {
				// Join as individual using access code
				await joinChallenge(challenge.id, undefined, accessCode);
				setIsParticipating(true);
				setParticipationType('individual');
			}
			onJoinSuccess?.();
		});
		onAccessCodeModalClose();
	};

	const isCurrentUserCreator = user?.id === challenge.creatorId;

	// Don't show join button for challenge creators
	if (isCurrentUserCreator) {
		return null;
	}

	return (
		<>
			{isParticipating ? (
				<Button
					variant="outline"
					colorScheme="red"
					leftIcon={<Icon as={LeaveIcon} w={5} h={5} />}
					onClick={handleLeaveChallenge}
					isLoading={isLeaving}
					loadingText="Leaving..."
					size="sm"
				>
					Leave Challenge
					{participantTeam && ` (${participantTeam.name})`}
				</Button>
			) : (
				<Button
					colorScheme="green"
					leftIcon={<Icon as={JoinIcon} w={5} h={5} />}
					onClick={handleJoinChallenge}
					isLoading={isJoining}
					loadingText="Joining..."
					size="sm"
				>
					Join Challenge
				</Button>
			)}

			{/* Team Selection Modal */}
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

			{/* Access Code Modal */}
			<AccessCodeModal
				isOpen={isAccessCodeModalOpen}
				onClose={onAccessCodeModalClose}
				onSubmit={handleAccessCodeSubmit}
				challengeTitle={challenge.title}
				isLoading={isJoining}
			/>
		</>
	);
};
