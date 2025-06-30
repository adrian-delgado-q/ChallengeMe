import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Grid, Heading, Input, Text, VStack, HStack, Tag, Avatar, TagLabel, Spinner, Center, Alert, AlertIcon } from '@chakra-ui/react';
import { Card } from '../components/common/Card';

import { UserTeamIcon } from '../components/common/Icons';
import { useUser } from '../contexts/AuthContext';
import { executeQuery } from '../graphql/gqlClient'
import { teamsQuery } from '../graphql/queries';
import { AuthPrompt } from '../components/common/AuthPrompt'; 
import { LoadTeamsError } from '../components/common/LoadTeamsError'; 
import { GenericError } from '../components/common/GenericError'; 


import type { Team, TeamsQueryResponse } from '../types';


interface TeamCardProps {
    team: Team;
    onSelect: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onSelect }) => (
    <Card
        p={6}
        h="full"
        display="flex"
        flexDirection="column"
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        onClick={() => onSelect(team.id)}
    >
        <VStack spacing={3} align="stretch" flex="1">
            <HStack justify="space-between">
                <Avatar src={team.avatarUrl} name={team.name} />
                <Tag size="sm" colorScheme={team.isPublic ? 'green' : 'gray'}>
                    {team.isPublic ? 'Public' : 'Private'}
                </Tag>
            </HStack>
            <Heading as="h3" size="md">{team.name}</Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={3}>{team.description}</Text>
        </VStack>
        <HStack mt={4} justify="space-between" color="gray.500" fontSize="sm">
            <HStack>
                <UserTeamIcon className="w-4 h-4" />
                <Text>{team.memberCount} Members</Text>
            </HStack>
            <Button size="sm" variant="outline" colorScheme="orange">View</Button>
        </HStack>
    </Card>
);

// const mockTeams: Team[] = [
//     { id: '1', name: 'Weekend Warriors', description: 'A casual team for weekend runners and cyclists aiming to stay active.', avatarUrl: 'https://placehold.co/64x64/34d399/ffffff?text=W', memberCount: 12, isPublic: true },
//     { id: '2', name: 'Trail Blazers Hiking Club', description: 'Exploring local trails every Saturday morning. All levels welcome!', avatarUrl: 'https://placehold.co/64x64/fb923c/ffffff?text=T', memberCount: 25, isPublic: true },
//     { id: '3', name: 'Office Step Challenge Crew', description: 'A private team for the annual Q3 step challenge at work.', avatarUrl: 'https://placehold.co/64x64/60a5fa/ffffff?text=O', memberCount: 8, isPublic: false },
// ];



const TeamsPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {

    const { user, isLoading: isAuthLoading } = useUser(); // <-- USE the hook
    const [teams, setTeams] = useState<Team[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchTeams = useCallback(async () => {
        if (!user) return; // Guard clause

        setIsFetching(true);
        setFetchError(null);
        try {
            const data = await executeQuery<TeamsQueryResponse>(teamsQuery);
            const fetchedTeams = data.teamCollection.edges.map((edge: any) => edge.node);
            setTeams(fetchedTeams);
        } catch (error: any) {
            console.error("Failed to fetch teams:", error);
            setFetchError(error.message || 'An unexpected error occurred.');
        } finally {
            setIsFetching(false);
        }
    }, [user]);

    useEffect(() => {
        if (!isAuthLoading && user) {
            fetchTeams();
        } else if (!isAuthLoading && !user) {
            setIsFetching(false);
        }
    }, [user, isAuthLoading, fetchTeams]);

    if (isAuthLoading || isFetching) {
        return <Center h="50vh"><Spinner size="xl" color="orange.500" /></Center>;
    }

    if (!user) {
        return <AuthPrompt onLogin={() => onNavigate('login')} />;
    }

    if (fetchError) {
        return <LoadTeamsError onRetry={fetchTeams} />;
    }

    if (!teams) {
        return <GenericError message="Could not find any team data." />;
    }

    return (
        <VStack spacing={12} align="stretch">
            <VStack spacing={2} textAlign="center">
                <Heading as="h2" size="2xl" fontWeight="extrabold">Find Your Team</Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">Join a team to participate in team challenges or create your own to invite friends.</Text>
            </VStack>
            <HStack maxW="2xl" w="full" mx="auto">
                <Input placeholder="Search for Teams..." />
                <Button colorScheme="orange">Search</Button>
                <Button colorScheme="green" onClick={() => onNavigate('createTeam')}>Create Team</Button>
            </HStack>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {teams.length > 0 ? (
                    teams.map(team => (
                        <TeamCard key={team.id} team={team} onSelect={() => onNavigate('teamDetails')} />
                    ))
                ) : (
                    <GenericError message="No teams found. Why not create one?" />
                )}
            </Grid>
        </VStack>
    );
};

export default TeamsPage;
