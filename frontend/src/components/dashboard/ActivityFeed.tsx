import React, { useState } from 'react';
import { Avatar, Box, Heading, HStack, Text, VStack, Spinner, Center, Badge, useToast, IconButton } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useActivities } from '../../hooks/useData';
import { useActivityUpdates } from '../../hooks/useActivityUpdates';
import { Card } from '../common/Card';

interface ActivityFeedProps {
    challengeId?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ challengeId }) => {
    const { activities, loading, error, refetch } = useActivities(challengeId);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const toast = useToast();

    // Enhanced refetch function with visual feedback
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
            // Show a subtle toast notification for real-time updates (only in development)
            if (process.env.NODE_ENV === 'development') {
                toast({
                    title: "Activities Updated",
                    description: "Latest activities refreshed",
                    status: "info",
                    duration: 1500,
                    isClosable: true,
                    position: "bottom-right"
                });
            }
        } finally {
            // Add a small delay to show the refreshing state
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    // Set up real-time updates for activities - only when challengeId is present
    useActivityUpdates({
        challengeId,
        onActivityUpdate: handleRefresh,
        enabled: !!challengeId // Only enable when challengeId exists
    });

    if (loading) {
        return (
            <Card p={4}>
                <Heading as="h4" size="sm" mb={3}>Latest Updates</Heading>
                <Center h="120px">
                    <Spinner color="orange.500" size="sm" />
                </Center>
            </Card>
        );
    }

    if (error) {
        return (
            <Card p={4}>
                <Heading as="h4" size="sm" mb={3}>Latest Updates</Heading>
                <Text color="red.500" fontSize="sm">Failed to load activities: {error}</Text>
            </Card>
        );
    }

    return (
        <Card p={4}>
            <HStack justify="space-between" align="center" mb={3}>
                <Heading as="h4" size="sm">Latest Updates</Heading>
                <HStack spacing={1}>
                    {isRefreshing && (
                        <Badge colorScheme="orange" variant="subtle" size="sm">
                            <HStack spacing={1}>
                                <Spinner size="xs" />
                                <Text fontSize="xs">Updating...</Text>
                            </HStack>
                        </Badge>
                    )}
                    <IconButton
                        aria-label="Refresh activities"
                        icon={<RepeatIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="orange"
                        onClick={handleRefresh}
                        isLoading={isRefreshing}
                    />
                </HStack>
            </HStack>
            <VStack spacing={2} align="stretch">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <HStack key={activity.id} spacing={4} align="flex-start">
                            <Avatar
                                src={activity.user?.avatarUrl}
                                name={activity.user?.username || 'Anonymous'}
                                size="sm"
                            />
                            <Box>
                                <Text fontSize="sm">
                                    <Text as="span" fontWeight="bold">
                                        {activity.user?.username || 'Anonymous'}
                                    </Text>
                                    {' '}logged an activity
                                    {activity.challenge && (
                                        <Text as="span" color="gray.600">
                                            {' '}in {activity.challenge.title}
                                        </Text>
                                    )}
                                </Text>
                                {activity.notes && (
                                    <Text fontSize="xs" color="gray.600" mt={1}>
                                        "{activity.notes}"
                                    </Text>
                                )}
                                <Text fontSize="xs" color="gray.500">
                                    {new Date(activity.uploadedAt).toLocaleDateString()}
                                </Text>
                            </Box>
                        </HStack>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center" py={8}>
                        No activities yet. Be the first to log an activity!
                    </Text>
                )}
            </VStack>
        </Card>
    );
};