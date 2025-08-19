import React from 'react';
import { Avatar, Box, Heading, HStack, Text, VStack, Spinner, Center } from '@chakra-ui/react';
import { useActivities } from '../../hooks/useData';
import { Card } from '../common/Card';

interface ActivityFeedProps {
    challengeId?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ challengeId }) => {
    const { activities, loading, error } = useActivities(challengeId);

    if (loading) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Latest Updates</Heading>
                <Center h="200px">
                    <Spinner color="orange.500" />
                </Center>
            </Card>
        );
    }

    if (error) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Latest Updates</Heading>
                <Text color="red.500">Failed to load activities: {error}</Text>
            </Card>
        );
    }

    return (
        <Card p={6}>
            <Heading as="h3" size="lg" mb={4}>Latest Updates</Heading>
            <VStack spacing={4} align="stretch">
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