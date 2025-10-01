import React from 'react';
import {
	Box,
	Grid,
	VStack,
	useDisclosure,
	Spinner,
	Center,
	Alert,
	AlertIcon,
	Text,
} from '@chakra-ui/react';
import { CommentsForum } from '../components/dashboard/CommentsForum';
import { Card } from '../components/common/Card';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { ChallengeRules } from '../components/dashboard/ChallengeRules';
import { LogActivityModal } from '../components/dashboard/LogActivityModal';
import { MilestonesDisplay } from '../components/dashboard/MilestonesDisplay';
import { ChallengeHeader } from '../components/challenges/ChallengeHeader';
import { AboutChallenge } from '../components/challenges/AboutChallenge';
import { ChallengeActionBar } from '../components/challenges/ChallengeActionBar';
import { useChallengeQuery } from '../hooks/useChallengesQuery';
import { useParams } from 'react-router-dom';
import { RealTimeDebug } from '../components/debug/RealTimeDebug';

const ChallengeDashboardPage: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { id: challengeId } = useParams<{ id: string }>();

	const {
		data: challenge,
		isLoading: challengeLoading,
		error: challengeError,
		refetch,
	} = useChallengeQuery(challengeId || '');

	// Function to refresh challenge data and activity feeds
	const handleActivityLogged = () => {
		refetch(); // Refresh challenge data (participant count, etc.)
		// The ActivityFeed and Leaderboard components will automatically refresh via real-time subscription
	};

	if (challengeLoading) {
		return (
			<Center h="200px">
				<Spinner size="xl" color="orange.500" />
			</Center>
		);
	}

	if (challengeError || !challenge) {
		return (
			<Alert status="error">
				<AlertIcon />
				{challengeError?.message || 'Challenge not found'}
			</Alert>
		);
	}

	return (
		<>
			<VStack spacing={8} align="stretch">
				{/* Challenge Header with title, description, and streamlined action bar */}
				<ChallengeHeader
					challenge={challenge}
					actionBar={
						<ChallengeActionBar challenge={challenge} onLogActivity={onOpen} onRefresh={refetch} />
					}
				/>

				{challenge.rules && <ChallengeRules rules={challenge.rules} />}

				{/* Mobile Layout: About Challenge + all components in vertical stack */}
				<Box display={{ base: 'block', lg: 'none' }}>
					<VStack spacing={6} align="stretch">
						{/* About This Challenge Section */}
						<AboutChallenge challenge={challenge} />
						{/* Mobile: Milestones */}
						<MilestonesDisplay
							milestones={challenge.milestones}
							currentProgress={challenge.progress || 0}
							progressByActivityType={challenge.progressByActivityType || {}}
							challenge={challenge}
							dailyStreak={challenge.dailyStreak || 0}
							todayActivity={challenge.todayActivity || false}
							userName={challenge.creator?.username || 'You'}
						/>{' '}
						{/* Mobile: Progress Chart */}
						<ProgressChart challengeId={challengeId} />
						{/* Mobile: Leaderboard */}
						{challengeId ? (
							<Leaderboard challengeId={challengeId} />
						) : (
							<Card p={4}>
								<Center>
									<Text fontSize="sm">No challenge selected</Text>
								</Center>
							</Card>
						)}
						{/* Mobile: Latest Updates */}
						{challengeId ? (
							<ActivityFeed challengeId={challengeId} />
						) : (
							<Card p={4}>
								<Center>
									<Text fontSize="sm">No challenge selected</Text>
								</Center>
							</Card>
						)}
						{/* Mobile: Comments */}
						{challengeId && <CommentsForum challengeId={challengeId} />}
					</VStack>
				</Box>

				{/* Desktop Layout: About + Milestones side by side, Progress under About, Sidebar on right */}
				<Grid
					templateColumns="2fr 1fr"
					gap={6}
					alignItems="start"
					display={{ base: 'none', lg: 'grid' }}
				>
					{/* Left Column: About Challenge + Progress Chart */}
					<VStack spacing={6} align="stretch">
						{/* About Challenge */}
						<AboutChallenge challenge={challenge} />

						{/* Progress Chart under About Challenge */}
						<ProgressChart challengeId={challengeId} />

						{/* Discussion Forum */}
						{challengeId && <CommentsForum challengeId={challengeId} />}
					</VStack>

					{/* Right Column: Milestones + Leaderboard + Activity Feed */}
					<VStack spacing={6} align="stretch">
						{/* Milestones (same dimensions as before) */}
						<MilestonesDisplay
							milestones={challenge.milestones}
							currentProgress={challenge.progress || 0}
							progressByActivityType={challenge.progressByActivityType || {}}
							challenge={challenge}
							dailyStreak={challenge.dailyStreak || 0}
							todayActivity={challenge.todayActivity || false}
							userName={challenge.creator?.username || 'You'}
						/>{' '}
						{/* Leaderboard */}
						{challengeId ? (
							<Leaderboard challengeId={challengeId} />
						) : (
							<Card p={4}>
								<Center>
									<Text fontSize="sm">No challenge selected</Text>
								</Center>
							</Card>
						)}
						{/* Activity Feed */}
						{challengeId ? (
							<ActivityFeed challengeId={challengeId} />
						) : (
							<Card p={4}>
								<Center>
									<Text fontSize="sm">No challenge selected</Text>
								</Center>
							</Card>
						)}
					</VStack>
				</Grid>
			</VStack>

			<LogActivityModal
				isOpen={isOpen}
				onClose={onClose}
				challengeId={challengeId}
				onActivityLogged={handleActivityLogged}
			/>

			{/* Development debug component */}
			<RealTimeDebug challengeId={challengeId} />
		</>
	);
};
export default ChallengeDashboardPage;
