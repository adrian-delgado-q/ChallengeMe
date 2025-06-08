import React from 'react';
import { Avatar, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LeaderboardEntry } from '../../types';
import { Card } from '../common/Card';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => (
    <Card p={6}>
        <Heading as="h3" size="lg" mb={4}>Leaderboard</Heading>
        <VStack spacing={4} align="stretch">
            {entries.map((entry) => (
                <HStack
                    key={entry.rank}
                    p={2}
                    rounded="lg"
                    bg={entry.name === 'You' ? 'orange.50' : 'transparent'}
                    borderWidth={entry.name === 'You' ? '2px' : '0px'}
                    borderColor="orange.200"
                >
                    <Text fontWeight="bold" color="gray.500" w={8}>{entry.rank}</Text>
                    <Avatar src={entry.avatar} name={entry.name} size="sm" />
                    <Text fontWeight="semibold" flex="1">{entry.name}</Text>
                    <Text fontWeight="bold" color="orange.600">{entry.value}</Text>
                </HStack>
            ))}
        </VStack>
    </Card>
);
