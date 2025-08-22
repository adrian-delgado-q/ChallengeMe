import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Heading, HStack, Text, VStack, Spinner, Center } from '@chakra-ui/react';
import { ActivityService } from '../../graphql/services';
import { useUser } from '../../contexts/AuthContext';
import { useActivityUpdates } from '../../hooks/useActivityUpdates';
import { Card } from '../common/Card';

interface LeaderboardProps {
    challengeId: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ challengeId }) => {
    const { user } = useUser();
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLeaderboard = useCallback(async () => {
        if (!challengeId) return;

        setLoading(true);
        setError(null);

        try {
            const leaderboardData = await ActivityService.getActivitiesForLeaderboard(challengeId);
            setEntries(leaderboardData);
        } catch (err: any) {
            setError(err.message || 'Failed to load leaderboard');
        } finally {
            setLoading(false);
        }
    }, [challengeId]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    // Set up real-time updates for leaderboard - only when challengeId is present
    useActivityUpdates({
        challengeId,
        onActivityUpdate: fetchLeaderboard,
        enabled: !!challengeId // Only enable when challengeId exists
    });

    if (loading) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Leaderboard</Heading>
                <Center h="200px">
                    <Spinner color="orange.500" />
                </Center>
            </Card>
        );
    }

    if (error) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4}>Leaderboard</Heading>
                <Text color="red.500">Failed to load leaderboard: {error}</Text>
            </Card>
        );
    }

    return (
        <Card p={6}>
            <Heading as="h3" size="lg" mb={4}>Leaderboard</Heading>
            <VStack spacing={4} align="stretch">
                {entries.length > 0 ? (
                    entries.map((entry) => {
                        const isCurrentUser = user?.id === entry.id;
                        return (
                            <HStack
                                key={entry.rank}
                                p={2}
                                rounded="lg"
                                bg={isCurrentUser ? 'orange.50' : 'transparent'}
                                borderWidth={isCurrentUser ? '2px' : '0px'}
                                borderColor="orange.200"
                            >
                                <Text fontWeight="bold" color="gray.500" w={8}>{entry.rank}</Text>
                                <Avatar src={entry.avatar} name={entry.name} size="sm" />
                                <Text fontWeight="semibold" flex="1">
                                    {isCurrentUser ? 'You' : entry.name}
                                </Text>
                                <Text fontWeight="bold" color="orange.600">{entry.value}</Text>
                            </HStack>
                        );
                    })
                ) : (
                    <Text color="gray.500" textAlign="center" py={8}>
                        No activities logged yet. Be the first!
                    </Text>
                )}
            </VStack>
        </Card>
    );
};
