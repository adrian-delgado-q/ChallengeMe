import React, { useState } from 'react';
import {
    Box, Grid, Heading, Text, VStack, Button, Flex, HStack,
    Spinner, Center, Alert, AlertIcon, Avatar, Badge, Tag, Icon, useToast
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { UserTeamIcon, CalendarIcon } from '../components/common/Icons';
import { useTeamDetails } from '../hooks/useData';
import { useUser } from '../contexts/AuthContext';
import { TeamService } from '../graphql/services';

const TeamDashboardPage: React.FC = () => {
    const { id: teamId } = useParams<{ id: string }>();
    const { user } = useUser();
    const navigate = useNavigate();
    const toast = useToast();
    const [isJoining, setIsJoining] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    const { team, loading: teamLoading, error: teamError, refetch } = useTeamDetails(teamId || '');

    const handleJoinTeam = async () => {
        if (!teamId) return;

        setIsJoining(true);
        try {
            await TeamService.joinTeam(teamId);
            toast({
                title: 'Success!',
                description: 'You have successfully joined the team.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            refetch(); // Refresh team data to show updated member list
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to join team',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeaveTeam = async () => {
        if (!teamId) return;

        setIsLeaving(true);
        try {
            await TeamService.leaveTeam(teamId);
            toast({
                title: 'Left Team',
                description: 'You have left the team.',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            refetch(); // Refresh team data to show updated member list
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to leave team',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLeaving(false);
        }
    };

    if (teamLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="orange.500" />
            </Center>
        );
    }

    if (teamError || !team) {
        return (
            <Alert status="error">
                <AlertIcon />
                {teamError || 'Team not found'}
            </Alert>
        );
    }

    // Check if current user is a member of this team
    const isTeamMember = team.memberList?.some((member: any) => member.userId === user?.id);
    const isTeamCreator = team.creatorId === user?.id;

    return (
        <VStack spacing={8} align="stretch">
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                <Box>
                    <HStack spacing={4} align="center" mb={2}>
                        <Avatar
                            size="lg"
                            name={team.name}
                            src={team.avatarUrl}
                        />
                        <Box>
                            <HStack spacing={3} align="center">
                                <Heading as="h2" size="xl">{team.name}</Heading>
                                <Tag size="md" colorScheme={team.isPublic ? 'green' : 'gray'}>
                                    {team.isPublic ? 'Public' : 'Private'}
                                </Tag>
                            </HStack>
                            <Text color="gray.600" mt={1}>
                                {team.description || 'Ready to take on challenges together!'}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
                <HStack spacing={3}>
                    {!isTeamMember && !isTeamCreator && team.isPublic && (
                        <Button
                            colorScheme="orange"
                            size="md"
                            onClick={handleJoinTeam}
                            isLoading={isJoining}
                            loadingText="Joining..."
                            isDisabled={team.maxMembers && team.memberCount >= team.maxMembers}
                        >
                            {team.maxMembers && team.memberCount >= team.maxMembers ? 'Team Full' : 'Join Team'}
                        </Button>
                    )}
                    {isTeamCreator && (
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => navigate(`/teams/${teamId}/edit`)}
                        >
                            Manage Team
                        </Button>
                    )}
                    {isTeamMember && !isTeamCreator && (
                        <Button
                            variant="outline"
                            colorScheme="red"
                            size="md"
                            onClick={handleLeaveTeam}
                            isLoading={isLeaving}
                            loadingText="Leaving..."
                        >
                            Leave Team
                        </Button>
                    )}
                </HStack>
            </Flex>

            <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8} alignItems="start">
                <VStack spacing={8} align="stretch">
                    {/* Team Details */}
                    <Card p={6}>
                        <Heading as="h3" size="md" mb={4}>Team Details</Heading>
                        <VStack spacing={3} align="stretch">
                            <HStack>
                                <Icon as={UserTeamIcon} w={6} h={6} color="blue.500" />
                                <Text>
                                    <Box as="span" fontWeight="bold">
                                        {team.memberCount || 0}
                                        {team.maxMembers ? `/${team.maxMembers}` : ''}
                                    </Box> Members
                                    {team.maxMembers && team.memberCount >= team.maxMembers && (
                                        <Tag size="sm" colorScheme="red" ml={2}>Full</Tag>
                                    )}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={CalendarIcon} w={6} h={6} color="red.500" />
                                <Text>
                                    Created: <Box as="span" fontWeight="bold">
                                        {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'Unknown'}
                                    </Box>
                                </Text>
                            </HStack>
                            {team.creator && (
                                <HStack>
                                    <Avatar size="sm" src={team.creator.avatarUrl} name={team.creator.username} />
                                    <Text>
                                        Creator: <Box as="span" fontWeight="bold">{team.creator.username}</Box>
                                    </Text>
                                </HStack>
                            )}
                            {team.sportsTypes && team.sportsTypes.length > 0 && (
                                <VStack align="stretch" spacing={2}>
                                    <Text fontWeight="medium" fontSize="sm">Focus Areas:</Text>
                                    <HStack wrap="wrap" spacing={1}>
                                        {team.sportsTypes.map((sport: string) => (
                                            <Tag key={sport} size="sm" colorScheme="orange" variant="subtle">
                                                {sport}
                                            </Tag>
                                        ))}
                                    </HStack>
                                </VStack>
                            )}
                        </VStack>
                    </Card>

                    {/* Team Members */}
                    <Card p={6}>
                        <Heading as="h3" size="md" mb={4}>Team Members</Heading>
                        <VStack spacing={4} align="stretch">
                            {team.memberList && team.memberList.length > 0 ? (
                                team.memberList.map((member: any) => (
                                    <HStack key={member.id} spacing={4} justify="space-between">
                                        <HStack spacing={3}>
                                            <Avatar
                                                size="sm"
                                                src={member.user?.avatarUrl}
                                                name={member.user?.username || 'Unknown User'}
                                            />
                                            <Box>
                                                <Text fontWeight="semibold">
                                                    {member.user?.username || 'Unknown User'}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                                                </Text>
                                            </Box>
                                        </HStack>
                                        <Badge
                                            colorScheme={member.role === 'ADMIN' ? 'purple' : 'gray'}
                                            size="sm"
                                        >
                                            {member.role}
                                        </Badge>
                                    </HStack>
                                ))
                            ) : (
                                <Text color="gray.500" textAlign="center" py={4}>
                                    No members found
                                </Text>
                            )}
                        </VStack>
                    </Card>
                </VStack>

                <VStack spacing={8} align="stretch">
                    {/* Team Challenges */}
                    <Card p={6}>
                        <Heading as="h3" size="md" mb={4}>Team Challenges</Heading>
                        <Text color="gray.500" textAlign="center" py={8}>
                            No active challenges yet. Join a team challenge to get started!
                        </Text>
                    </Card>

                    {/* Team Activity */}
                    <Card p={6}>
                        <Heading as="h3" size="md" mb={4}>Recent Activity</Heading>
                        <Text color="gray.500" textAlign="center" py={8}>
                            No recent activity. Start a challenge to see team updates here!
                        </Text>
                    </Card>
                </VStack>
            </Grid>
        </VStack>
    );
};

export default TeamDashboardPage;
