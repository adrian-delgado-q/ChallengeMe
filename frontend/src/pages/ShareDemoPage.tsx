import React from 'react';
import { Box, Container, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { ShareableWidgetDemo } from '../components/ShareableWidgetDemo';
import { MilestonesDisplay } from '../components/dashboard/MilestonesDisplay';
import { useNavigate } from 'react-router-dom';

const ShareDemoPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box minH="100vh" bg="gray.50">
			<Container maxW="4xl" py={8}>
				<VStack spacing={8} align="stretch">
					{/* Header */}
					<VStack spacing={4} textAlign="center">
						<Text fontSize="3xl" fontWeight="bold" color="purple.600">
							🚀 New Feature: Social Sharing
						</Text>
						<Text fontSize="lg" color="gray.600" maxW="2xl">
							A small "Share" button now appears in the Milestones section when users have progress to
							share! It opens a beautiful modal with a shareable progress card and social media options.
						</Text>
						<HStack spacing={4}>
							<Button onClick={() => navigate('/challenges')} colorScheme="purple">
								Try it in Challenges
							</Button>
							<Button onClick={() => navigate('/')} variant="outline">
								Back to Dashboard
							</Button>
						</HStack>
					</VStack>

					{/* Demo Component */}
					<ShareableWidgetDemo />

					{/* Live integration demo */}
					<Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
						<VStack spacing={4} align="stretch">
							<Text fontSize="xl" fontWeight="bold" textAlign="center" color="gray.800">
								Live Integration Demo
							</Text>

							<Text fontSize="sm" color="gray.600" textAlign="center">
								This is how the new share button appears in the actual Milestones component. Look for the
								small "Share" button in the top-right corner!
							</Text>

							{/* Mock Milestones Display with Share Button */}
							<Box maxW="600px" mx="auto" w="full">
								<MilestonesDisplay
									milestones={[
										{ name: 'Beginner', value: 10, activityTypeId: 'running' },
										{ name: 'Intermediate', value: 25, activityTypeId: 'running' },
										{ name: 'Advanced', value: 50, activityTypeId: 'running' },
										{ name: 'Expert', value: 100, activityTypeId: 'running' },
									]}
									currentProgress={42}
									progressByActivityType={{ running: 42 }}
									challenge={{
										id: 'demo-challenge',
										title: 'Summer Fitness Challenge',
										description: 'Get in shape this summer!',
										challengeType: 'individual',
										endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
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
										},
									}}
									dailyStreak={7}
									todayActivity={true}
									userName="FitnessGuru"
								/>
							</Box>

							<Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic">
								💡 The share button only appears when users have some progress (achievements, streak, or
								today's activity)
							</Text>
						</VStack>
					</Box>

					{/* Feature Benefits */}
					<Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
						<VStack spacing={4} align="stretch">
							<Text fontSize="xl" fontWeight="bold" textAlign="center" color="gray.800">
								Why This Feature is Great
							</Text>

							<VStack spacing={3} align="start">
								<HStack align="start" spacing={3}>
									<Text fontSize="lg">🎯</Text>
									<Box>
										<Text fontWeight="semibold">Increased Motivation</Text>
										<Text fontSize="sm" color="gray.600">
											Sharing progress creates accountability and motivation to continue
										</Text>
									</Box>
								</HStack>

								<HStack align="start" spacing={3}>
									<Text fontSize="lg">📈</Text>
									<Box>
										<Text fontWeight="semibold">Social Proof</Text>
										<Text fontSize="sm" color="gray.600">
											Beautiful progress images showcase achievements and attract new users
										</Text>
									</Box>
								</HStack>

								<HStack align="start" spacing={3}>
									<Text fontSize="lg">🚀</Text>
									<Box>
										<Text fontWeight="semibold">Viral Growth</Text>
										<Text fontSize="sm" color="gray.600">
											Easy sharing helps spread the word about ChallengeMe organically
										</Text>
									</Box>
								</HStack>

								<HStack align="start" spacing={3}>
									<Text fontSize="lg">✨</Text>
									<Box>
										<Text fontWeight="semibold">Unobtrusive Integration</Text>
										<Text fontSize="sm" color="gray.600">
											Small share button appears only when relevant, keeping the UI clean
										</Text>
									</Box>
								</HStack>

								<HStack align="start" spacing={3}>
									<Text fontSize="lg">🎨</Text>
									<Box>
										<Text fontWeight="semibold">Beautiful Share Cards</Text>
										<Text fontSize="sm" color="gray.600">
											Professional progress cards with gradients and clean typography
										</Text>
									</Box>
								</HStack>
							</VStack>
						</VStack>
					</Box>
				</VStack>
			</Container>
		</Box>
	);
};

export default ShareDemoPage;
