import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid, Heading, Text, VStack, HStack, Spinner, Center, Alert, AlertIcon } from '@chakra-ui/react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import type { User } from '../types';
import { Card } from '../components/common/Card';
import { useChallenges } from '../hooks/useData';
import { useUser } from '../contexts/AuthContext';
import { ProfileService } from '../graphql/services';

interface ProfilePageProps {
    onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    const { user } = useUser();
    const { challenges, loading: challengesLoading, error: challengesError } = useChallenges();
    const [profile, setProfile] = useState<any>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);

    // Fetch user profile
    useEffect(() => {
        if (user) {
            ProfileService.getCurrentProfile()
                .then(setProfile)
                .catch((err) => setProfileError(err.message))
                .finally(() => setProfileLoading(false));
        }
    }, [user]);

    if (!user) {
        return (
            <Alert status="info">
                <AlertIcon />
                Please log in to view your profile.
            </Alert>
        );
    }

    if (profileLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="orange.500" />
            </Center>
        );
    }

    const userProfile = profile || {
        username: user.email || 'User',
        avatarUrl: `https://placehold.co/128x128/3b82f6/ffffff?text=${(user.email?.[0] || 'U').toUpperCase()}`,
        bio: 'Fitness enthusiast turning goals into reality!'
    };

    // Filter challenges that the user is participating in
    const userChallenges = challenges.filter(challenge =>
        challenge.creator?.id === user.id ||
        challenge.participantList?.some((p: any) => p.userId === user.id)
    );

    return (
        <VStack spacing={8} align="stretch">
            <Card p={6}>
                <HStack spacing={6} align={{ base: 'center', md: 'flex-start' }} flexDir={{ base: 'column', md: 'row' }}>
                    <Avatar size="2xl" name={userProfile.username} src={userProfile.avatarUrl} />
                    <VStack align={{ base: 'center', md: 'flex-start' }} flex="1">
                        <Heading as="h2" size="lg">{userProfile.username}</Heading>
                        <Text color="gray.600">{user.email}</Text>
                        <Text color="gray.700" maxW="lg" textAlign={{ base: 'center', md: 'left' }}>
                            {userProfile.bio || 'Fitness enthusiast turning goals into reality!'}
                        </Text>
                        {profile && (
                            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
                                <Text fontSize="sm" color="gray.500">
                                    Teams Created: {profile.createdTeamsCount || 0} |
                                    Challenges Created: {profile.createdChallengesCount || 0}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    Team Memberships: {profile.teamMembershipsCount || 0} |
                                    Activities Logged: {profile.activitiesCount || 0}
                                </Text>
                            </VStack>
                        )}
                    </VStack>
                    <Button colorScheme="gray" variant="outline">Edit Profile</Button>
                </HStack>
            </Card>

            <Box>
                <Heading as="h3" size="lg" mb={6}>Your Challenges</Heading>
                {challengesLoading ? (
                    <Center>
                        <Spinner size="lg" />
                    </Center>
                ) : challengesError ? (
                    <Alert status="error">
                        <AlertIcon />
                        {challengesError}
                    </Alert>
                ) : userChallenges.length === 0 ? (
                    <Text color="gray.500" textAlign="center" py={8}>
                        You haven't joined any challenges yet. Explore the challenges page to get started!
                    </Text>
                ) : (
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                        {userChallenges.map(challenge => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                onSelect={() => onNavigate(`dashboard/${challenge.id}`)}
                            />
                        ))}
                    </Grid>
                )}
            </Box>
        </VStack>
    );
};
export default ProfilePage;
