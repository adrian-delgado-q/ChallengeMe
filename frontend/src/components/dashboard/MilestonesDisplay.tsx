import React from 'react';
import {
	Box,
	Heading,
	VStack,
	HStack,
	Text,
	Progress,
	Icon,
	Badge,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { Card } from '../common/Card';
import { ProgressShareModal } from './ProgressShareModal';
import type { Milestone, Challenge } from '../../types';

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
			d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a9.106 9.106 0 012.147-1.222m0 0c.165.248.329.498.485.749m-2.632.472a8.024 8.024 0 012.632.472m0 0c.699.544 1.328 1.178 1.875 1.88m-2.632.472c.699.544 1.328 1.178 1.875 1.88M12 21.75c-2.291 0-4.545-.16-6.75-.47m13.5 0c-2.291.31-4.559.47-6.75.47"
		/>
	</svg>
);

interface MilestonesDisplayProps {
	milestones?: Milestone[];
	currentProgress?: number;
	// Add support for activity-specific progress
	progressByActivityType?: Record<string, number>;
	// Add challenge for sharing functionality
	challenge?: Challenge;
	dailyStreak?: number;
	todayActivity?: boolean;
	userName?: string;
}

export const MilestonesDisplay: React.FC<MilestonesDisplayProps> = ({
	milestones = [],
	currentProgress = 0,
	progressByActivityType = {},
	challenge,
	dailyStreak = 0,
	todayActivity = false,
	userName = 'You',
}) => {
	if (!milestones || milestones.length === 0) {
		return (
			<Card p={6}>
				<Heading as="h3" size="md" mb={4}>
					Milestones
				</Heading>
				<Text color="gray.500" fontSize="sm" textAlign="center" py={4}>
					No milestones have been set for this challenge yet.
				</Text>
			</Card>
		);
	}

	// Group milestones by activity type
	const milestonesByActivityType = milestones.reduce(
		(acc, milestone) => {
			const activityTypeId = milestone.activityTypeId || 'general';
			if (!acc[activityTypeId]) {
				acc[activityTypeId] = [];
			}
			acc[activityTypeId].push(milestone);
			return acc;
		},
		{} as Record<string, Milestone[]>
	);

	// Calculate overall progress statistics
	const totalMilestones = milestones.length;
	const achievedMilestones = milestones.filter(milestone => {
		const activityProgress = progressByActivityType[milestone.activityTypeId || 'general'] || 0;
		return activityProgress >= milestone.value;
	}).length;

	// Calculate aggregate percentage based on actual progress towards total work
	const overallCompletionPercentage = (() => {
		// Group milestones by activity type to find the maximum target for each activity
		const maxTargetByActivity = milestones.reduce(
			(acc, milestone) => {
				const activityTypeId = milestone.activityTypeId || 'general';
				acc[activityTypeId] = Math.max(acc[activityTypeId] || 0, milestone.value);
				return acc;
			},
			{} as Record<string, number>
		);

		// Calculate total target work across all activities
		const totalTargetWork = Object.values(maxTargetByActivity).reduce(
			(sum, target) => sum + target,
			0
		);

		// Calculate total current progress across all activities
		const totalCurrentProgress = Object.entries(maxTargetByActivity).reduce(
			(sum, [activityTypeId, maxTarget]) => {
				const currentProgress = progressByActivityType[activityTypeId] || 0;
				// Cap progress at the maximum milestone target for this activity
				const cappedProgress = Math.min(currentProgress, maxTarget);
				return sum + cappedProgress;
			},
			0
		);

		return totalTargetWork > 0 ? (totalCurrentProgress / totalTargetWork) * 100 : 0;
	})();

	return (
		<Card p={6}>
			<VStack spacing={6} align="stretch">
				{/* Header with overall progress */}
				<Box>
					<HStack justify="space-between" mb={4} align="center">
						<HStack spacing={3}>
							<Heading as="h3" size="md">
								<HStack>
									<Icon as={MilestoneIcon} w={5} h={5} color="purple.500" />
									<Text>Challenge Milestones</Text>
								</HStack>
							</Heading>
							{/* Share button - positioned top left next to title */}
							{challenge && (
								<ProgressShareModal
									challenge={challenge}
									currentProgress={currentProgress}
									progressByActivityType={progressByActivityType}
									dailyStreak={dailyStreak}
									todayActivity={todayActivity}
									userName={userName}
									buttonSize="xs"
									buttonVariant="ghost"
									iconColor="gray.600"
								/>
							)}
						</HStack>
						<HStack spacing={2} align="center">
							<Badge
								colorScheme={
									overallCompletionPercentage === 100
										? 'green'
										: overallCompletionPercentage > 50
											? 'orange'
											: 'gray'
								}
								variant="solid"
								fontSize="sm"
								px={3}
								py={1}
							>
								{achievedMilestones}/{totalMilestones} Completed
							</Badge>
						</HStack>
					</HStack>

					{/* Overall Progress Bar */}
					<Box p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
						<Text fontSize="sm" fontWeight="bold" mb={2} color="gray.700">
							Overall Challenge Progress
						</Text>
						<Progress
							value={overallCompletionPercentage}
							colorScheme={overallCompletionPercentage === 100 ? 'green' : 'purple'}
							size="lg"
							borderRadius="full"
							bg="gray.200"
						/>
						<HStack justify="space-between" mt={2}>
							<Text fontSize="xs" color="gray.600">
								{Math.round(overallCompletionPercentage)}% Complete
							</Text>
							<Text fontSize="xs" color="gray.600">
								{totalMilestones - achievedMilestones} remaining
							</Text>
						</HStack>
					</Box>
				</Box>

				{/* Milestones by Activity Type */}
				<Accordion
					allowMultiple
					defaultIndex={Object.keys(milestonesByActivityType).map((_, index) => index)}
				>
					{Object.entries(milestonesByActivityType).map(([activityTypeId, activityMilestones]) => {
						const activityProgress = progressByActivityType[activityTypeId] || 0;
						const sortedMilestones = [...activityMilestones].sort((a, b) => a.value - b.value);
						const activityType = activityMilestones[0]?.activityType;
						const achievedCount = sortedMilestones.filter(m => activityProgress >= m.value).length;
						const activityCompletionPercentage =
							sortedMilestones.length > 0 ? (achievedCount / sortedMilestones.length) * 100 : 0;

						return (
							<AccordionItem
								key={activityTypeId}
								border="1px solid"
								borderColor="gray.200"
								borderRadius="md"
								mb={2}
							>
								<AccordionButton bg="white" _hover={{ bg: 'gray.50' }} borderRadius="md" p={4}>
									<Box flex="1" textAlign="left">
										<HStack justify="space-between" w="full">
											<VStack align="start" spacing={1}>
												<HStack>
													<Text fontWeight="bold" color="orange.600">
														{activityType?.name || 'General'}
													</Text>
													{activityType && (
														<Badge colorScheme="blue" variant="subtle" fontSize="xs">
															{activityType.category}
														</Badge>
													)}
												</HStack>
												<Text fontSize="sm" color="gray.600">
													{achievedCount}/{sortedMilestones.length} milestones •{' '}
													{Math.round(activityCompletionPercentage)}% complete
												</Text>
											</VStack>
											<HStack>
												<Badge
													colorScheme={
														activityCompletionPercentage === 100
															? 'green'
															: activityCompletionPercentage > 0
																? 'orange'
																: 'gray'
													}
													variant="solid"
												>
													{activityProgress} {activityType?.unit || 'pts'}
												</Badge>
												<AccordionIcon />
											</HStack>
										</HStack>
									</Box>
								</AccordionButton>
								<AccordionPanel p={4} bg="gray.50">
									<VStack spacing={4} align="stretch">
										{/* Activity Progress Summary */}
										<SimpleGrid columns={3} spacing={4}>
											<Stat size="sm">
												<StatLabel fontSize="xs">Current Progress</StatLabel>
												<StatNumber fontSize="md" color="blue.600">
													{activityProgress} {activityType?.unit || 'pts'}
												</StatNumber>
											</Stat>
											<Stat size="sm">
												<StatLabel fontSize="xs">Next Goal</StatLabel>
												<StatNumber fontSize="md" color="orange.600">
													{(() => {
														const nextMilestone = sortedMilestones.find(m => activityProgress < m.value);
														return nextMilestone
															? `${nextMilestone.value} ${activityType?.unit || 'pts'}`
															: 'Complete!';
													})()}
												</StatNumber>
											</Stat>
											<Stat size="sm">
												<StatLabel fontSize="xs">Completion</StatLabel>
												<StatNumber fontSize="md" color="green.600">
													{Math.round(activityCompletionPercentage)}%
												</StatNumber>
											</Stat>
										</SimpleGrid>

										{/* Individual Milestones */}
										<VStack spacing={3} align="stretch">
											{sortedMilestones.map((milestone, index) => {
												const isAchieved = activityProgress >= milestone.value;
												const isNext =
													!isAchieved && (index === 0 || activityProgress >= sortedMilestones[index - 1]?.value);

												return (
													<Box key={`${milestone.name}-${milestone.value}`} position="relative">
														<HStack justify="space-between" align="center" mb={2}>
															<HStack>
																<Box
																	w={3}
																	h={3}
																	rounded="full"
																	bg={isAchieved ? 'green.500' : isNext ? 'orange.500' : 'gray.300'}
																	border="2px solid"
																	borderColor={isAchieved ? 'green.500' : isNext ? 'orange.500' : 'gray.300'}
																/>
																<Text
																	fontSize="sm"
																	fontWeight={isNext ? 'bold' : 'normal'}
																	color={isAchieved ? 'green.600' : isNext ? 'orange.600' : 'gray.600'}
																>
																	{milestone.name}
																</Text>
															</HStack>

															<HStack spacing={2}>
																<Badge
																	colorScheme={isAchieved ? 'green' : isNext ? 'orange' : 'gray'}
																	variant={isAchieved ? 'solid' : 'outline'}
																>
																	{milestone.value} {activityType?.unit || 'pts'}
																</Badge>
																{isAchieved && (
																	<Badge colorScheme="green" variant="solid" fontSize="xs">
																		✓ Achieved
																	</Badge>
																)}
																{isNext && !isAchieved && (
																	<Badge colorScheme="orange" variant="solid" fontSize="xs">
																		Next Goal
																	</Badge>
																)}
															</HStack>
														</HStack>

														{/* Progress bar for current milestone */}
														{isNext && (
															<Box ml={6}>
																<Progress
																	value={Math.min((activityProgress / milestone.value) * 100, 100)}
																	colorScheme="orange"
																	size="sm"
																	borderRadius="full"
																	bg="gray.200"
																/>
																<Text fontSize="xs" color="gray.500" mt={1}>
																	{activityProgress} / {milestone.value} {activityType?.unitLabel || 'points'}
																</Text>
															</Box>
														)}

														{/* Connecting line to next milestone */}
														{index < sortedMilestones.length - 1 && (
															<Box
																position="absolute"
																left="5px"
																top="20px"
																w="2px"
																h="30px"
																bg={isAchieved ? 'green.200' : 'gray.200'}
															/>
														)}
													</Box>
												);
											})}
										</VStack>
									</VStack>
								</AccordionPanel>
							</AccordionItem>
						);
					})}
				</Accordion>
			</VStack>
		</Card>
	);
};
