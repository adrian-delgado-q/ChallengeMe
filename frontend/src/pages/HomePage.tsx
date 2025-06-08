import React from 'react';
import { Box, Button, Grid, Heading, Input, Text, VStack, HStack } from '@chakra-ui/react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { Challenge } from '../types';

interface HomePageProps { onNavigate: (page: string) => void; }

const mockChallenges: Challenge[] = [
    { id: 1, title: 'June Running Challenge', type: 'Running', goal: '100 km', participants: 42, endDate: '2025-06-30', progress: 75, isPublic: true, milestones: [{ name: "M1", value: 50 }], rules: { minDuration: 30, minRepetitions: 5 } },
    { id: 2, title: 'Community Stair Climb', type: 'Stair Climbing', goal: '2000 floors', participants: 18, endDate: '2025-07-15', progress: 40, isPublic: true, milestones: [{ name: "M1", value: 1000 }], rules: { minDuration: 20, minRepetitions: 10 } },
    { id: 3, title: 'Summer Biking Club', type: 'Biking', goal: '500 km', participants: 89, endDate: '2025-08-31', progress: 60, isPublic: true, milestones: [{ name: "M1", value: 250 }], rules: { minDuration: 60, minRepetitions: 3 } },
    { id: 4, title: 'Private: Team Wellness', type: 'Walking', goal: '1,000,000 steps', participants: 5, endDate: '2025-06-20', progress: 90, isPublic: false, milestones: [{ name: "M1", value: 500000 }], rules: { minDuration: 15, minRepetitions: 20 } },
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => (
    <VStack spacing={12} align="stretch">
        <VStack spacing={2} textAlign="center">
            <Heading as="h2" size="2xl" fontWeight="extrabold">Find Your Next Challenge</Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">Join thousands of others in community-driven fitness challenges. Stay motivated, track progress, and achieve your goals together.</Text>
        </VStack>
        <HStack maxW="2xl" w="full" mx="auto">
            <Input placeholder="Search challenges (e.g., 'Marathon Prep')" />
            <Button colorScheme="orange">Search</Button>
        </HStack>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            {mockChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onSelect={() => onNavigate('dashboard')} />
            ))}
        </Grid>
    </VStack>
);
export default HomePage;
