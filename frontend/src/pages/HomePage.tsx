import React from 'react';
import { Box, Button, Grid, Heading, Input, Text, VStack, HStack } from '@chakra-ui/react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { mockChallenges } from '../assets/fake_data/mockChallenges';


interface HomePageProps { onNavigate: (page: string) => void; }


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
