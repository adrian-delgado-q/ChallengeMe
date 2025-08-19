import React from 'react';
import { Box, Heading, VStack, HStack, Text, Progress, Icon, Badge } from '@chakra-ui/react';
import { Card } from '../common/Card';
import type { Milestone } from '../../types';

// Milestone icon
const MilestoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228a9.106 9.106 0 012.147-1.222m0 0c.165.248.329.498.485.749m-2.632.472a8.024 8.024 0 012.632.472m0 0c.699.544 1.328 1.178 1.875 1.88m-2.632.472c.699.544 1.328 1.178 1.875 1.88M12 21.75c-2.291 0-4.545-.16-6.75-.47m13.5 0c-2.291.31-4.559.47-6.75.47" />
    </svg>
);

interface MilestonesDisplayProps {
    milestones?: Milestone[];
    currentProgress?: number;
}

export const MilestonesDisplay: React.FC<MilestonesDisplayProps> = ({
    milestones = [],
    currentProgress = 0
}) => {
    if (!milestones || milestones.length === 0) {
        return (
            <Card p={6}>
                <Heading as="h3" size="md" mb={4}>Milestones</Heading>
                <Text color="gray.500" fontSize="sm" textAlign="center" py={4}>
                    No milestones have been set for this challenge yet.
                </Text>
            </Card>
        );
    }

    // Sort milestones by value
    const sortedMilestones = [...milestones].sort((a, b) => a.value - b.value);

    return (
        <Card p={6}>
            <Heading as="h3" size="md" mb={4}>
                <HStack>
                    <Icon as={MilestoneIcon} w={5} h={5} color="purple.500" />
                    <Text>Milestones ({milestones.length})</Text>
                </HStack>
            </Heading>

            <VStack spacing={4} align="stretch">
                {sortedMilestones.map((milestone, index) => {
                    const isAchieved = currentProgress >= milestone.value;
                    const isNext = !isAchieved && (index === 0 || currentProgress >= sortedMilestones[index - 1]?.value);

                    return (
                        <Box key={`${milestone.name}-${milestone.value}`} position="relative">
                            <HStack justify="space-between" align="center" mb={2}>
                                <HStack>
                                    <Box
                                        w={3}
                                        h={3}
                                        rounded="full"
                                        bg={isAchieved ? 'green.500' : isNext ? 'orange.500' : 'gray.300'}
                                        border="2px solid"
                                        borderColor={isAchieved ? 'green.500' : isNext ? 'orange.500' : 'gray.300'}
                                    />
                                    <Text
                                        fontSize="sm"
                                        fontWeight={isNext ? 'bold' : 'normal'}
                                        color={isAchieved ? 'green.600' : isNext ? 'orange.600' : 'gray.600'}
                                    >
                                        {milestone.name}
                                    </Text>
                                </HStack>

                                <HStack spacing={2}>
                                    <Badge
                                        colorScheme={isAchieved ? 'green' : isNext ? 'orange' : 'gray'}
                                        variant={isAchieved ? 'solid' : 'outline'}
                                    >
                                        {milestone.value} pts
                                    </Badge>
                                    {isAchieved && (
                                        <Badge colorScheme="green" variant="solid" fontSize="xs">
                                            ✓ Achieved
                                        </Badge>
                                    )}
                                    {isNext && !isAchieved && (
                                        <Badge colorScheme="orange" variant="solid" fontSize="xs">
                                            Next Goal
                                        </Badge>
                                    )}
                                </HStack>
                            </HStack>

                            {/* Progress bar for current milestone */}
                            {isNext && (
                                <Box ml={6}>
                                    <Progress
                                        value={Math.min((currentProgress / milestone.value) * 100, 100)}
                                        colorScheme="orange"
                                        size="sm"
                                        rounded="full"
                                        bg="gray.100"
                                    />
                                    <Text fontSize="xs" color="gray.500" mt={1}>
                                        {currentProgress} / {milestone.value} points
                                    </Text>
                                </Box>
                            )}

                            {/* Connecting line to next milestone */}
                            {index < sortedMilestones.length - 1 && (
                                <Box
                                    position="absolute"
                                    left="5px"
                                    top="20px"
                                    w="2px"
                                    h="30px"
                                    bg={isAchieved ? 'green.200' : 'gray.200'}
                                />
                            )}
                        </Box>
                    );
                })}
            </VStack>

            {/* Overall progress summary */}
            <Box mt={6} p={4} bg="gray.50" rounded="md">
                <Text fontSize="sm" fontWeight="bold" mb={2}>Overall Progress</Text>
                <Progress
                    value={Math.min((currentProgress / Math.max(...sortedMilestones.map(m => m.value))) * 100, 100)}
                    colorScheme="purple"
                    size="md"
                    rounded="full"
                />
                <HStack justify="space-between" mt={2}>
                    <Text fontSize="xs" color="gray.600">
                        {currentProgress} points
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                        {Math.max(...sortedMilestones.map(m => m.value))} points (max)
                    </Text>
                </HStack>
            </Box>
        </Card>
    );
};
