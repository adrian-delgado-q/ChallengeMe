import React from 'react';
import { Box, Grid, VStack, Button, useDisclosure, Spinner, Center, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { CommentsForum } from '../components/dashboard/CommentsForum';
import { Card } from '../components/common/Card';
import { Icon, HStack } from '@chakra-ui/react';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { ChallengeRules } from '../components/dashboard/ChallengeRules';
import { LogActivityModal } from '../components/dashboard/LogActivityModal';
import { MilestonesDisplay } from '../components/dashboard/MilestonesDisplay';
import { ChallengeJoinButton } from '../components/challenges/ChallengeJoinButton';
import { ChallengeHeader } from '../components/challenges/ChallengeHeader';
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
                {/* Challenge Header with title, description, details, and action buttons */}
                <ChallengeHeader 
                    challenge={challenge}
                    actionButtons={
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
                    }
                />

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
