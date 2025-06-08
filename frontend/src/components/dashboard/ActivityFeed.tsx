import React from 'react';
import { Avatar, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Activity } from '../../types';
import { Card } from '../common/Card';

interface ActivityFeedProps {
    activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => (
    <Card p={6}>
        <Heading as="h3" size="lg" mb={4}>Latest Updates</Heading>
        <VStack spacing={4} align="stretch">
            {activities.map((activity, index) => (
                <HStack key={index} spacing={4} align="flex-start">
                    <Avatar src={activity.avatar} name={activity.user} size="sm" />
                    <Box>
                        <Text fontSize="sm">
                            <Text as="span" fontWeight="bold">{activity.user}</Text>
                            {' '}{activity.action}
                        </Text>
                        <Text fontSize="xs" color="gray.500">{activity.time}</Text>
                    </Box>
                </HStack>
            ))}
        </VStack>
    </Card>
);