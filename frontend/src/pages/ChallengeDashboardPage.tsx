import React from 'react';
import { Box, Grid, Heading, Text, VStack, Button, Flex, useDisclosure, Spinner, Center, Alert, AlertIcon } from '@chakra-ui/react';
import { CommentsForum } from '../components/dashboard/CommentsForum';
import { Card } from '../components/common/Card';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../components/common/Icons';
import { Icon, HStack } from '@chakra-ui/react';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { ChallengeRules } from '../components/dashboard/ChallengeRules';
import { LogActivityModal } from '../components/dashboard/LogActivityModal';
import { MilestonesDisplay } from '../components/dashboard/MilestonesDisplay';
import { ChallengeJoinButton } from '../components/challenges/ChallengeJoinButton';
import { useChallengeDetails } from '../hooks/useData';
import { useParams, useNavigate } from 'react-router-dom';
import { ActivityService } from '../graphql/services';
import { useNotifications } from '../utils/notifications';
import { RealTimeDebug } from '../components/debug/RealTimeDebug';

// Icon for the new button
const LogActivityIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const ChallengeDashboardPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id: challengeId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const notifications = useNotifications();

    const { challenge, loading: challengeLoading, error: challengeError, refetch } = useChallengeDetails(challengeId || '');

    // Function to refresh challenge data and activity feeds
    const handleActivityLogged = () => {
        refetch(); // Refresh challenge data (participant count, etc.)
        // The ActivityFeed and Leaderboard components will automatically refresh via real-time subscription
    };

    // Development helper function to test real-time updates
    const handleTestRealTimeUpdates = async () => {
        if (!challengeId) return;

        try {
            await ActivityService.testRealTimeUpdates(challengeId);
            notifications.success('Test Activity Created', 'A test activity was created to verify real-time updates are working.');
        } catch (error: any) {
            notifications.error('Test Failed', error.message || 'Failed to create test activity');
        }
    };

    if (challengeLoading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="orange.500" />
            </Center>
        );
    }

    if (challengeError || !challenge) {
        return (
            <Alert status="error">
                <AlertIcon />
                {challengeError || 'Challenge not found'}
            </Alert>
        );
    }

    return (
        <>
            <VStack spacing={8} align="stretch">
                <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                    <Box>
                        <Heading as="h2" size="xl">{challenge.title}</Heading>
                        <Text color="gray.600">{challenge.description || 'Push your limits and climb the leaderboard!'}</Text>
                    </Box>
                    <HStack spacing={2}>
                        <ChallengeJoinButton
                            challenge={challenge}
                            onJoinSuccess={refetch}
                        />
                        <Button
                            variant="outline"
                            colorScheme="orange"
                            onClick={() => navigate('/activities')}
                            size="sm"
                        >
                            Manage Activities
                        </Button>
                        {/* Development test button - only show in development */}
                        {process.env.NODE_ENV === 'development' && (
                            <Button
                                variant="outline"
                                colorScheme="blue"
                                onClick={handleTestRealTimeUpdates}
                                size="sm"
                            >
                                Test Real-time Updates
                            </Button>
                        )}
                        <Button
                            colorScheme="orange"
                            leftIcon={<Icon as={LogActivityIcon} w={5} h={5} />}
                            onClick={onOpen}
                        >
                            Log an Activity
                        </Button>
                    </HStack>
                </Flex>

                {challenge.rules && <ChallengeRules rules={challenge.rules} />}

                {/* Grid layout: Main content (2fr) | Compact sidebar (1fr) */}
                <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} alignItems="start">
                    {/* Left Column: Main Content (Progress Chart + Discussion) */}
                    <VStack spacing={6} align="stretch">
                        <ProgressChart challengeId={challengeId} />
                        {challengeId && (
                            <CommentsForum challengeId={challengeId} />
                        )}
                    </VStack>

                    {/* Right Column: Compact Sidebar */}
                    <VStack spacing={4} align="stretch">
                        {/* Compact Details Card */}
                        <Card p={4}>
                            <Heading as="h4" size="sm" mb={3} color="orange.500">Challenge Details</Heading>
                            <VStack spacing={2} align="stretch">
                                <HStack spacing={2}>
                                    <Icon as={TrophyIcon} w={4} h={4} color="orange.500" />
                                    <Text fontSize="sm">
                                        <Text as="span" fontWeight="semibold">{challenge.type || 'General'}</Text>
                                    </Text>
                                </HStack>
                                <HStack spacing={2}>
                                    <Icon as={UserTeamIcon} w={4} h={4} color="blue.500" />
                                    <Text fontSize="sm">
                                        <Text as="span" fontWeight="semibold">{challenge.participantCount || 0}</Text> participants
                                    </Text>
                                </HStack>
                                {challenge.startDate && (
                                    <HStack spacing={2}>
                                        <Icon as={CalendarIcon} w={4} h={4} color="green.500" />
                                        <Text fontSize="sm">Started {new Date(challenge.startDate).toLocaleDateString()}</Text>
                                    </HStack>
                                )}
                                <HStack spacing={2}>
                                    <Icon as={CalendarIcon} w={4} h={4} color="red.500" />
                                    <Text fontSize="sm">Ends {new Date(challenge.endDate).toLocaleDateString()}</Text>
                                </HStack>
                            </VStack>
                        </Card>

                        {/* Compact Milestones Display */}
                        <Box>
                            <MilestonesDisplay
                                milestones={challenge.milestones}
                                currentProgress={challenge.progress || 0}
                                progressByActivityType={challenge.progressByActivityType || {}}
                            />
                        </Box>

                        {/* Compact Leaderboard */}
                        {challengeId ? (
                            <Box>
                                <Leaderboard challengeId={challengeId} />
                            </Box>
                        ) : (
                            <Card p={4}>
                                <Center>
                                    <Text fontSize="sm">No challenge selected</Text>
                                </Center>
                            </Card>
                        )}

                        {/* Compact Latest Updates */}
                        {challengeId ? (
                            <Box>
                                <ActivityFeed challengeId={challengeId} />
                            </Box>
                        ) : (
                            <Card p={4}>
                                <Center>
                                    <Text fontSize="sm">No challenge selected</Text>
                                </Center>
                            </Card>
                        )}
                    </VStack>
                </Grid>
            </VStack>

            <LogActivityModal
                isOpen={isOpen}
                onClose={onClose}
                challengeId={challengeId}
                onActivityLogged={handleActivityLogged}
            />

            {/* Development debug component */}
            <RealTimeDebug challengeId={challengeId} />
        </>
    );
};
export default ChallengeDashboardPage;
