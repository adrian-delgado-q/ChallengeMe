import React from 'react';
import { Box, VStack, HStack, Text, Divider } from '@chakra-ui/react';
import { Card } from './common/Card';
import { ShareableWidget } from './dashboard/ShareableWidget';
import { CompactMilestones } from './dashboard/CompactMilestones';
import { SocialShareButton } from './dashboard/SocialShareButton';
import type { Challenge } from '../types';

const mockChallenge: Challenge = {
	id: 'demo-challenge',
	title: 'Summer Fitness Challenge',
	description: 'Get in shape this summer with daily workouts and activities!',
	challengeType: 'individual',
	endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
	isPublic: true,
	progress: 65,
	dailyStreak: 7,
	todayActivity: true,
	milestones: [
		{ name: 'Beginner', value: 10, activityTypeId: 'running' },
		{ name: 'Intermediate', value: 25, activityTypeId: 'running' },
		{ name: 'Advanced', value: 50, activityTypeId: 'running' },
		{ name: 'Expert', value: 100, activityTypeId: 'running' },
	],
	creator: {
		id: 'demo-user',
		username: 'FitnessGuru',
		avatarUrl: undefined,
	},
};

const mockUserProgress = {
	currentProgress: 42,
	achievedMilestones: 2,
	totalMilestones: 4,
	dailyStreak: 7,
	todayActivity: true,
};

export const ShareableWidgetDemo: React.FC = () => {
	const handleGenerateShareImage = async (): Promise<string> => {
		// Mock implementation for demo
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('data:image/png;base64,mock-image-data');
			}, 1000);
		});
	};

	return (
		<Card p={6}>
			<VStack spacing={6} align="stretch">
				<Text fontSize="xl" fontWeight="bold" textAlign="center">
					Social Sharing Feature Demo
				</Text>

				<Text fontSize="sm" color="gray.600" textAlign="center">
					Here's how the new social sharing features will look for users when they have activity logged
					in a challenge.
				</Text>

				<Divider />

				{/* Compact Milestones Display */}
				<Box>
					<Text fontSize="md" fontWeight="semibold" mb={3}>
						1. Compact Milestones Section
					</Text>
					<Text fontSize="sm" color="gray.600" mb={3}>
						This replaces the large milestones section with a more compact version optimized for sharing.
					</Text>
					<Box maxW="400px" mx="auto">
						<CompactMilestones
							challenge={mockChallenge}
							currentProgress={mockUserProgress.currentProgress}
							dailyStreak={mockUserProgress.dailyStreak}
							todayActivity={mockUserProgress.todayActivity}
						/>
					</Box>
				</Box>

				<Divider />

				{/* Social Share Button */}
				<Box>
					<Text fontSize="md" fontWeight="semibold" mb={3}>
						2. Social Share Button
					</Text>
					<Text fontSize="sm" color="gray.600" mb={3}>
						Users can easily share their progress to social media platforms or download a progress image.
					</Text>
					<HStack justify="center">
						<SocialShareButton
							challenge={mockChallenge}
							userProgress={mockUserProgress}
							onGenerateShareImage={handleGenerateShareImage}
						/>
					</HStack>
				</Box>

				<Divider />

				{/* Shareable Widget Preview */}
				<Box>
					<Text fontSize="md" fontWeight="semibold" mb={3}>
						3. Generated Share Image Preview
					</Text>
					<Text fontSize="sm" color="gray.600" mb={3}>
						This is what the downloadable/shareable image will look like (normally hidden from users).
					</Text>
					<HStack justify="center">
						<ShareableWidget
							challenge={mockChallenge}
							userProgress={mockUserProgress}
							userName="FitnessGuru"
						/>
					</HStack>
				</Box>

				<Divider />

				{/* Usage Instructions */}
				<Box bg="blue.50" p={4} borderRadius="md" border="1px solid" borderColor="blue.200">
					<Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={2}>
						How It Works:
					</Text>
					<VStack spacing={2} align="start">
						<Text fontSize="sm" color="blue.700">
							• Users see the compact milestones section showing their current progress
						</Text>
						<Text fontSize="sm" color="blue.700">
							• When they click "Share Progress", they can share text to social media or download an image
						</Text>
						<Text fontSize="sm" color="blue.700">
							• The image is generated from the beautiful widget design using HTML5 Canvas
						</Text>
						<Text fontSize="sm" color="blue.700">
							• Perfect for motivating others and showing off achievements! 🏆
						</Text>
					</VStack>
				</Box>
			</VStack>
		</Card>
	);
};
