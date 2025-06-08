import React from 'react';
import { Box, Grid, Heading, Text, VStack, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { CommentsForum } from '../components/dashboard/CommentsForum'; 
import { Card } from '../components/common/Card';
import { TrophyIcon, UserGroupIcon, CalendarIcon } from '../components/common/Icons';
import { Challenge, Comment, LeaderboardEntry, Activity, RuleSet } from '../types';
import { Icon, HStack } from '@chakra-ui/react';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed'; 
import { ChallengeRules } from '../components/dashboard/ChallengeRules';
import { LogActivityModal } from '../components/dashboard/LogActivityModal'; // Import the new modal

// Icon for the new button
const LogActivityIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


// Mock Data
const mockChallenge: Challenge & { rules: RuleSet } = { 
    id: 1, 
    title: 'June Running Challenge', 
    type: 'Running', 
    participants: 42,
    milestones: [], 
    endDate: '2025-06-30', 
    progress: 75, 
    isPublic: true,
    goal: '100 km', 
    rules: {
        minDuration: 20,
        minRepetitions: 1
    }
};
const mockComments: Comment[] = [
    { id: 1, user: { name: 'Sarah', avatar: 'https://placehold.co/40x40/db2777/ffffff?text=S' }, content: 'Anyone have tips for running in the heat? Finding it tough this week!', timestamp: '3h ago' },
    { id: 2, user: { name: 'Bob', avatar: 'https://placehold.co/40x40/14b8a6/ffffff?text=B' }, content: 'Early mornings are key for me! Also, electrolytes are a life-saver.', timestamp: '2h ago' },
];
const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Alice', value: '82 km', avatar: 'https://placehold.co/40x40/f97316/ffffff?text=A' },
    { rank: 2, name: 'Bob', value: '75 km', avatar: 'https://placehold.co/40x40/14b8a6/ffffff?text=B' },
    { rank: 3, name: 'You', value: '71 km', avatar: 'https://placehold.co/40x40/3b82f6/ffffff?text=Y' },
];
const mockActivityFeed: Activity[] = [
    { user: 'Alice', action: 'logged a 10km run.', time: '2h ago', avatar: 'https://placehold.co/40x40/f97316/ffffff?text=A' },
    { user: 'You', action: 'added 7km to your progress.', time: '5h ago', avatar: 'https://placehold.co/40x40/3b82f6/ffffff?text=Y' },
];


const ChallengeDashboardPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <VStack spacing={8} align="stretch">
                <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                    <Box>
                        <Heading as="h2" size="xl">{mockChallenge.title}</Heading>
                        <Text color="gray.600">Push your limits and climb the leaderboard!</Text>
                    </Box>
                    <Button
                        colorScheme="orange"
                        leftIcon={<Icon as={LogActivityIcon} w={5} h={5} />}
                        onClick={onOpen}
                    >
                        Log an Activity
                    </Button>
                </Flex>

                <ChallengeRules rules={mockChallenge.rules} />

                <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8} alignItems="start">
                    <VStack spacing={8} align="stretch">
                        <Card p={6}>
                            <Heading as="h3" size="md" mb={4}>Details</Heading>
                            <VStack spacing={3} align="stretch">
                                <HStack><Icon as={TrophyIcon} w={6} h={6} color="orange.500" /> <Text>Goal: <Box as="span" fontWeight="bold">100 km</Box></Text></HStack>
                                <HStack><Icon as={UserGroupIcon} w={6} h={6} color="blue.500" /> <Text><Box as="span" fontWeight="bold">{mockChallenge.participants}</Box> Participants</Text></HStack>
                                <HStack><Icon as={CalendarIcon} w={6} h={6} color="red.500" /> <Text>Ends: <Box as="span" fontWeight="bold">{mockChallenge.endDate}</Box></Text></HStack>
                            </VStack>
                        </Card>
                        <Leaderboard entries={mockLeaderboard} />
                        <ActivityFeed activities={mockActivityFeed} />
                    </VStack>
                    <VStack spacing={8} align="stretch">
                        <ProgressChart />
                        <CommentsForum comments={mockComments} />
                    </VStack>
                </Grid>
            </VStack>

            {/* The Modal component is rendered here */}
            <LogActivityModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
export default ChallengeDashboardPage;
