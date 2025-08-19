import React from 'react';
import { Box, Skeleton, SkeletonText, VStack, HStack } from '@chakra-ui/react';

// Add a pulsing animation to make the skeleton more visually appealing
const pulseKeyframes = `
  @keyframes skeleton-pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
`;

export const ChallengeCardSkeleton: React.FC = () => (
    <Box
        bg="white"
        rounded="xl"
        shadow="sm"
        p={6}
        h="300px"
        display="flex"
        flexDirection="column"
        position="relative"
        _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shimmer 2s infinite',
            zIndex: 1
        }}
        sx={{
            '@keyframes shimmer': {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' }
            }
        }}
    >
        <VStack spacing={3} align="stretch" flex="1">
            {/* Header with badges */}
            <HStack justify="space-between" align="center">
                <Skeleton height="20px" width="60px" rounded="md" />
                <Skeleton height="20px" width="80px" rounded="md" />
            </HStack>

            {/* Activity type badge */}
            <Skeleton height="24px" width="100px" rounded="md" alignSelf="flex-start" />

            {/* Title */}
            <Skeleton height="24px" width="80%" />

            {/* Description */}
            <SkeletonText mt="2" noOfLines={2} spacing="2" skeletonHeight="3" />

            <VStack spacing={2} align="stretch" fontSize="sm">
                {/* Milestones */}
                <HStack>
                    <Skeleton height="16px" width="16px" />
                    <Skeleton height="16px" width="120px" />
                </HStack>

                {/* Participants */}
                <HStack>
                    <Skeleton height="16px" width="16px" />
                    <Skeleton height="16px" width="100px" />
                </HStack>

                {/* End date */}
                <HStack>
                    <Skeleton height="16px" width="16px" />
                    <Skeleton height="16px" width="140px" />
                </HStack>
            </VStack>
        </VStack>

        {/* Progress bar */}
        <Box mt={4}>
            <Skeleton height="8px" width="100%" rounded="full" />
            <Skeleton height="12px" width="60px" mt={1} ml="auto" />
        </Box>
    </Box>
);

interface ChallengeSkeletonGridProps {
    count?: number;
}

export const ChallengeSkeletonGrid: React.FC<ChallengeSkeletonGridProps> = ({ count = 8 }) => (
    <>
        {Array.from({ length: count }, (_, index) => (
            <ChallengeCardSkeleton key={index} />
        ))}
    </>
);
