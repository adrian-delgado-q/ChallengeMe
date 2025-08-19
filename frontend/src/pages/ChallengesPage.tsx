import React from 'react';
import { Button, Grid, Heading, Input, Text, VStack, HStack, Spinner, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { useChallenges } from '../hooks/useData';
import { useUser } from '../contexts/AuthContext';
import { AuthPrompt } from '../components/common/AuthPrompt';
import { GenericError } from '../components/common/GenericError';

const ChallengesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading: isAuthLoading } = useUser();
    const { challenges, loading: isFetching, error } = useChallenges();

    if (isAuthLoading || isFetching) {
        return <Center h="50vh"><Spinner size="xl" color="orange.500" /></Center>;
    }

    if (!user) {
        return <AuthPrompt onLogin={() => navigate('/auth')} />;
    }

    if (error) {
        return <GenericError message={error} />;
    }

    return (
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
                {challenges.length > 0 ? (
                    challenges.map(challenge => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onSelect={(id) => navigate(`/challenges/${id}`)}
                        />
                    ))
                ) : (
                    <GenericError message="No challenges found. Why not create one?" />
                )}
            </Grid>
        </VStack>
    );
};

export default ChallengesPage;
