import React from 'react';
import {
	Box,
	HStack,
	VStack,
	Text,
	Progress,
	Badge,
	Icon,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Flex,
} from '@chakra-ui/react';
import { Card } from '../common/Card';
import type { Challenge } from '../../types';

// Milestone icon
const MilestoneIcon: React.FC<{ className?: string }> = ({ className }) => (
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

interface CompactMilestonesProps {
	challenge: Challenge;
	currentProgress?: number;
	progressByActivityType?: Record<string, number>;
	dailyStreak?: number;
	todayActivity?: boolean;
}

export const CompactMilestones: React.FC<CompactMilestonesProps> = ({
	challenge,
	currentProgress = 0,
	progressByActivityType = {},
	dailyStreak = 0,
	todayActivity = false,
}) => {
	const milestones = challenge.milestones || [];

	// Calculate achievements
	const achievedMilestones = milestones.filter(milestone => {
		const activityProgress =
			progressByActivityType[milestone.activityTypeId || 'general'] || currentProgress;
		return activityProgress >= milestone.value;
	});

	const totalMilestones = milestones.length;
	const completionPercentage =
		totalMilestones > 0 ? (achievedMilestones.length / totalMilestones) * 100 : 0;

	// Get next milestone
	const nextMilestone = milestones
		.filter(milestone => {
			const activityProgress =
				progressByActivityType[milestone.activityTypeId || 'general'] || currentProgress;
			return activityProgress < milestone.value;
		})
		.sort((a, b) => a.value - b.value)[0];

	// Calculate days remaining
	const today = new Date();
	const endDate = new Date(challenge.endDate);
	const daysRemaining = Math.max(
		0,
		Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
	);

	return (
		<Card p={4} bg="gradient.100" borderRadius="xl" border="1px solid" borderColor="purple.200">
			<VStack spacing={4} align="stretch">
				{/* Header with challenge title and quick stats */}
				<Flex justify="space-between" align="center">
					<VStack align="start" spacing={0}>
						<Text fontSize="md" fontWeight="bold" color="gray.800" noOfLines={1}>
							{challenge.title}
						</Text>
						<Text fontSize="xs" color="gray.600">
							{daysRemaining} days left
						</Text>
					</VStack>
					<HStack spacing={2}>
						{todayActivity && (
							<Badge colorScheme="green" variant="solid" fontSize="xs">
								✓ Today
							</Badge>
						)}
						{dailyStreak > 0 && (
							<Badge colorScheme="orange" variant="solid" fontSize="xs">
								🔥 {dailyStreak}
							</Badge>
						)}
					</HStack>
				</Flex>

				{/* Progress overview */}
				<Box>
					<HStack justify="space-between" mb={2}>
						<HStack spacing={2}>
							<Icon as={MilestoneIcon} w={4} h={4} color="purple.500" />
							<Text fontSize="sm" fontWeight="medium" color="gray.700">
								Milestones
							</Text>
						</HStack>
						<Text fontSize="sm" color="gray.600">
							{achievedMilestones.length}/{totalMilestones}
						</Text>
					</HStack>

					<Progress
						value={completionPercentage}
						colorScheme="purple"
						size="md"
						borderRadius="full"
						bg="gray.200"
					/>

					<HStack justify="space-between" mt={2}>
						<Text fontSize="xs" color="gray.600">
							{Math.round(completionPercentage)}% Complete
						</Text>
						{nextMilestone && (
							<Text fontSize="xs" color="purple.600" fontWeight="medium">
								Next: {nextMilestone.name}
							</Text>
						)}
					</HStack>
				</Box>

				{/* Quick stats grid */}
				<SimpleGrid columns={3} spacing={3}>
					<Stat size="sm" textAlign="center">
						<StatLabel fontSize="xs" color="gray.600">
							Achieved
						</StatLabel>
						<StatNumber fontSize="lg" color="green.600">
							<HStack justify="center" spacing={1}>
								<Icon as={TrophyIcon} w={4} h={4} />
								<Text>{achievedMilestones.length}</Text>
							</HStack>
						</StatNumber>
					</Stat>

					<Stat size="sm" textAlign="center">
						<StatLabel fontSize="xs" color="gray.600">
							Progress
						</StatLabel>
						<StatNumber fontSize="lg" color="blue.600">
							{Math.round(currentProgress)}
						</StatNumber>
					</Stat>

					<Stat size="sm" textAlign="center">
						<StatLabel fontSize="xs" color="gray.600">
							Streak
						</StatLabel>
						<StatNumber fontSize="lg" color="orange.600">
							<HStack justify="center" spacing={1}>
								<Text>🔥</Text>
								<Text>{dailyStreak}</Text>
							</HStack>
						</StatNumber>
					</Stat>
				</SimpleGrid>

				{/* Recent achievements */}
				{achievedMilestones.length > 0 && (
					<Box>
						<Text fontSize="xs" color="gray.600" mb={2}>
							Recent Achievements
						</Text>
						<HStack spacing={1} flexWrap="wrap">
							{achievedMilestones.slice(-3).map((milestone, index) => (
								<Badge
									key={index}
									colorScheme="green"
									variant="subtle"
									fontSize="xs"
									px={2}
									py={1}
									borderRadius="md"
								>
									🏆 {milestone.name}
								</Badge>
							))}
						</HStack>
					</Box>
				)}
			</VStack>
		</Card>
	);
};
