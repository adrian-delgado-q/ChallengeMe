import React from 'react';
import { Box, Skeleton, SkeletonText, VStack, HStack, Grid } from '@chakra-ui/react';
import { Card } from '../common/Card';

export const TeamCardSkeleton: React.FC = () => (
    <Card
        p={6}
        h="full"
        display="flex"
        flexDirection="column"
    >
        <VStack spacing={3} align="stretch" flex="1">
            <HStack justify="space-between">
                <Skeleton borderRadius="full" boxSize="48px" />
                <Skeleton height="24px" width="60px" borderRadius="md" />
            </HStack>
            <Skeleton height="28px" width="70%" />
            <SkeletonText mt={2} noOfLines={2} spacing="3" skeletonHeight="16px" />
        </VStack>
        <HStack mt={4} justify="space-between">
            <Skeleton height="20px" width="80px" />
            <Skeleton height="32px" width="60px" borderRadius="md" />
        </HStack>
    </Card>
);

interface TeamSkeletonGridProps {
    count?: number;
}

export const TeamSkeletonGrid: React.FC<TeamSkeletonGridProps> = ({ count = 12 }) => (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {Array.from({ length: count }, (_, index) => (
            <TeamCardSkeleton key={index} />
        ))}
    </Grid>
);
