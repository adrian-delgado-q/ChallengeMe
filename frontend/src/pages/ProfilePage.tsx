import React from 'react';
import { Avatar, Box, Button, Grid, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { User, Challenge } from '../types';
import { Card } from '../components/common/Card';
import { mockChallenges } from '../assets/fake_data/mockChallenges';

interface ProfilePageProps { onNavigate: (page: string) => void; }
const mockUser: User = { name: "Alex Doe", email: "alex.doe@example.com", avatar: "https://placehold.co/128x128/3b82f6/ffffff?text=A", bio: "Fitness enthusiast turning goals into reality. Join me on a challenge!" };

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => (
    <VStack spacing={8} align="stretch">
        <Card p={6}>
            <HStack spacing={6} align={{ base: 'center', md: 'flex-start' }} flexDir={{ base: 'column', md: 'row' }}>
                <Avatar size="2xl" name={mockUser.name} src={mockUser.avatar} />
                <VStack align={{ base: 'center', md: 'flex-start' }} flex="1">
                    <Heading as="h2" size="lg">{mockUser.name}</Heading>
                    <Text color="gray.600">{mockUser.email}</Text>
                    <Text color="gray.700" maxW="lg" textAlign={{ base: 'center', md: 'left' }}>{mockUser.bio}</Text>
                </VStack>
                <Button colorScheme="gray" variant="outline">Edit Profile</Button>
            </HStack>
        </Card>
        <Box>
            <Heading as="h3" size="lg" mb={6}>Your Challenges</Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                 {mockChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} onSelect={() => onNavigate('dashboard')} />
                ))}
            </Grid>
        </Box>
    </VStack>
);
export default ProfilePage;
