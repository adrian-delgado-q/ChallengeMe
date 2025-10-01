import React, { forwardRef } from 'react';
import { Box, VStack, HStack, Text, Badge, Icon, Grid, GridItem } from '@chakra-ui/react';
import type { Challenge } from '../../types';

// Trophy icon for achievements
const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
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
			d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a9.014 9.014 0 012.916.52 6.003 6.003 0 01-4.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0A6.002 6.002 0 0112 15.75c-2.904 0-5.231-2.051-5.231-4.57 0-.422.049-.843.144-1.255m5.087 5.825a8.25 8.25 0 01-2.81 0m8.272-13.595a12.023 12.023 0 013.933.725 9.013 9.013 0 01-3.933-.725z"
		/>
	</svg>
);

// Fire icon for streak
const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
	>
		<path
			fillRule="evenodd"
			d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
			clipRule="evenodd"
		/>
	</svg>
);

// Target icon
const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
		/>
	</svg>
);

interface ShareableWidgetProps {
	challenge: Challenge;
	userProgress: {
		currentProgress: number;
		achievedMilestones: number;
		totalMilestones: number;
		dailyStreak: number;
		todayActivity: boolean;
		progressByActivityType?: Record<string, number>;
	};
	userName?: string;
}

export const ShareableWidget = forwardRef<HTMLDivElement, ShareableWidgetProps>(
	({ challenge, userProgress, userName = 'You' }, ref) => {
		const { achievedMilestones, dailyStreak, todayActivity, progressByActivityType } = userProgress;

		// Get activity type data
		const activityEntries = Object.entries(progressByActivityType || {});
		const totalActivities = activityEntries.reduce((sum, [, count]) => sum + count, 0);

		// Calculate days remaining
		const today = new Date();
		const endDate = new Date(challenge.endDate);
		const daysRemaining = Math.max(
			0,
			Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
		);

		// Format current date
		const currentDate = today.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});

		return (
			<Box
				ref={ref}
				w="400px"
				h="500px"
				bg="linear-gradient(135deg, #ea580c 0%, #dc2626 100%)"
				p={6}
				borderRadius="20px"
				color="white"
				position="relative"
				overflow="hidden"
			>
				{/* Background decoration */}
				<Box
					position="absolute"
					top="-50px"
					right="-50px"
					w="150px"
					h="150px"
					bg="rgba(255, 255, 255, 0.1)"
					borderRadius="50%"
				/>
				<Box
					position="absolute"
					bottom="-30px"
					left="-30px"
					w="100px"
					h="100px"
					bg="rgba(255, 255, 255, 0.05)"
					borderRadius="50%"
				/>

				<VStack spacing={4} align="stretch" h="full" position="relative" zIndex={1}>
					{/* Header */}
					<VStack spacing={2} align="center">
						<Text fontSize="lg" fontWeight="bold" textAlign="center" noOfLines={2}>
							{challenge.title}
						</Text>
						<Text fontSize="sm" opacity={0.9}>
							{userName}'s Progress
						</Text>
						<Text fontSize="xs" opacity={0.7}>
							{currentDate}
						</Text>
					</VStack>

					{/* Activity Counts Table */}
					<Box flex={1} bg="rgba(255, 255, 255, 0.1)" borderRadius="12px" p={4}>
						<Text fontSize="sm" fontWeight="bold" textAlign="center" mb={3} opacity={0.9}>
							Activity Progress
						</Text>
						{activityEntries.length > 0 ? (
							<VStack spacing={2} align="stretch">
								{activityEntries.map(([activityTypeId, count]) => {
									const activityName = activityTypeId.includes('-')
										? activityTypeId
												.split('-')
												.pop()
												?.replace(/([A-Z])/g, ' $1')
												.trim() || 'Activity'
										: activityTypeId.replace(/([A-Z])/g, ' $1').trim();

									return (
										<HStack
											key={activityTypeId}
											justify="space-between"
											bg="rgba(255, 255, 255, 0.1)"
											p={2}
											borderRadius="6px"
										>
											<Text fontSize="sm" fontWeight="medium" noOfLines={1} flex={1}>
												{activityName}
											</Text>
											<Text fontSize="lg" fontWeight="bold" minW="40px" textAlign="right">
												{count}
											</Text>
										</HStack>
									);
								})}
								{/* Total row */}
								<Box h="1px" bg="rgba(255, 255, 255, 0.2)" my={1} />
								<HStack justify="space-between" bg="rgba(255, 255, 255, 0.15)" p={2} borderRadius="6px">
									<Text fontSize="sm" fontWeight="bold">
										Total Reps
									</Text>
									<Text fontSize="xl" fontWeight="bold" minW="40px" textAlign="right">
										{totalActivities}
									</Text>
								</HStack>
							</VStack>
						) : (
							<Text fontSize="sm" textAlign="center" opacity={0.7}>
								No activity data available
							</Text>
						)}
					</Box>

					{/* Summary Stats */}
					<Grid templateColumns="repeat(3, 1fr)" gap={3}>
						<GridItem>
							<VStack spacing={1} textAlign="center">
								<HStack justify="center">
									<Icon as={TrophyIcon} w={4} h={4} color="yellow.300" />
									<Text fontSize="lg" fontWeight="bold">
										{achievedMilestones}
									</Text>
								</HStack>
								<Text fontSize="xs" opacity={0.8}>
									Milestones
								</Text>
							</VStack>
						</GridItem>

						<GridItem>
							<VStack spacing={1} textAlign="center">
								<HStack justify="center">
									<Icon as={FireIcon} w={4} h={4} color="orange.300" />
									<Text fontSize="lg" fontWeight="bold">
										{dailyStreak}
									</Text>
								</HStack>
								<Text fontSize="xs" opacity={0.8}>
									Day Streak
								</Text>
							</VStack>
						</GridItem>

						<GridItem>
							<VStack spacing={1} textAlign="center">
								<HStack justify="center">
									<Icon as={TargetIcon} w={4} h={4} color="blue.300" />
									<Text fontSize="lg" fontWeight="bold">
										{activityEntries.length}
									</Text>
								</HStack>
								<Text fontSize="xs" opacity={0.8}>
									Activities
								</Text>
							</VStack>
						</GridItem>
					</Grid>

					{/* Status badges */}
					<HStack justify="center" spacing={2} flexWrap="wrap">
						{todayActivity && (
							<Badge
								bg="rgba(34, 197, 94, 0.2)"
								color="green.200"
								px={3}
								py={1}
								borderRadius="full"
								fontSize="xs"
								border="1px solid rgba(34, 197, 94, 0.3)"
							>
								✓ Active Today
							</Badge>
						)}
						{dailyStreak > 0 && (
							<Badge
								bg="rgba(251, 146, 60, 0.2)"
								color="orange.200"
								px={3}
								py={1}
								borderRadius="full"
								fontSize="xs"
								border="1px solid rgba(251, 146, 60, 0.3)"
							>
								🔥 {dailyStreak} days
							</Badge>
						)}
					</HStack>

					{/* Time remaining */}
					<Text fontSize="sm" textAlign="center" opacity={0.8}>
						{daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Challenge completed!'}
					</Text>

					{/* Footer branding */}
					<HStack justify="center" opacity={0.7}>
						<Text fontSize="xs" fontWeight="medium">
							ChallengeMe
						</Text>
					</HStack>
				</VStack>
			</Box>
		);
	}
);
