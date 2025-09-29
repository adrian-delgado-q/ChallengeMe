import React from 'react';
import { Box, Skeleton, SkeletonText, VStack, HStack, Grid } from '@chakra-ui/react';

interface GenericSkeletonProps {
  /**
   * The type of skeleton to render
   */
  type: 'card' | 'list-item' | 'header' | 'text-block';
  /**
   * Height of the skeleton
   */
  height?: string;
  /**
   * Whether to show animation
   */
  isAnimated?: boolean;
  /**
   * Custom children (overrides default skeleton content)
   */
  children?: React.ReactNode;
}

interface SkeletonGridProps {
  /**
   * The type of skeleton to render
   */
  type: 'card' | 'list-item';
  /**
   * Number of skeleton items to render
   */
  count?: number;
  /**
   * Grid layout columns
   */
  columns?: { base: string; md?: string; lg?: string };
  /**
   * Gap between grid items
   */
  gap?: number;
}

/**
 * A reusable skeleton component that can render different types of loading states
 */
export const GenericSkeleton: React.FC<GenericSkeletonProps> = ({
  type,
  height = 'auto',
  isAnimated = true,
  children,
}) => {
  const baseProps = {
    startColor: 'gray.100',
    endColor: 'gray.300',
    fadeDuration: isAnimated ? 1 : 0,
  };

  if (children) {
    return <Box height={height}>{children}</Box>;
  }

  switch (type) {
    case 'card':
      return (
        <Box
          bg="white"
          rounded="xl"
          shadow="sm"
          p={6}
          height={height === 'auto' ? '300px' : height}
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
            animation: isAnimated ? 'shimmer 2s infinite' : 'none',
            zIndex: 1,
          }}
          sx={{
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' },
            },
          }}
        >
          <VStack spacing={3} align="stretch" flex="1">
            {/* Header */}
            <HStack justify="space-between" align="center">
              <Skeleton height="20px" width="60px" rounded="md" {...baseProps} />
              <Skeleton height="20px" width="80px" rounded="md" {...baseProps} />
            </HStack>

            {/* Title */}
            <Skeleton height="24px" width="80%" {...baseProps} />

            {/* Description */}
            <SkeletonText mt="2" noOfLines={2} spacing="2" skeletonHeight="3" {...baseProps} />

            {/* Content area */}
            <VStack spacing={2} align="stretch" fontSize="sm" flex="1">
              <HStack>
                <Skeleton height="16px" width="16px" {...baseProps} />
                <Skeleton height="16px" width="120px" {...baseProps} />
              </HStack>
              <HStack>
                <Skeleton height="16px" width="16px" {...baseProps} />
                <Skeleton height="16px" width="100px" {...baseProps} />
              </HStack>
            </VStack>

            {/* Footer */}
            <HStack justify="space-between" mt="auto">
              <Skeleton height="20px" width="80px" {...baseProps} />
              <Skeleton height="32px" width="60px" rounded="md" {...baseProps} />
            </HStack>
          </VStack>
        </Box>
      );

    case 'list-item':
      return (
        <HStack spacing={4} p={4} bg="white" rounded="lg" shadow="sm" height={height}>
          <Skeleton borderRadius="full" boxSize="48px" {...baseProps} />
          <VStack spacing={2} align="stretch" flex="1">
            <Skeleton height="20px" width="70%" {...baseProps} />
            <SkeletonText noOfLines={1} skeletonHeight="16px" {...baseProps} />
          </VStack>
          <Skeleton height="32px" width="80px" rounded="md" {...baseProps} />
        </HStack>
      );

    case 'header':
      return (
        <VStack spacing={4} align="stretch" height={height}>
          <Skeleton height="40px" width="60%" {...baseProps} />
          <Skeleton height="20px" width="80%" {...baseProps} />
        </VStack>
      );

    case 'text-block':
      return (
        <VStack spacing={3} align="stretch" height={height}>
          <Skeleton height="24px" width="40%" {...baseProps} />
          <SkeletonText noOfLines={3} spacing="3" skeletonHeight="16px" {...baseProps} />
        </VStack>
      );

    default:
      return <Skeleton height={height} {...baseProps} />;
  }
};

/**
 * A grid of skeleton items for loading states
 */
export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  type,
  count = 8,
  columns = { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap = 6,
}) => {
  if (type === 'list-item') {
    return (
      <VStack spacing={gap}>
        {Array.from({ length: count }, (_, index) => (
          <GenericSkeleton key={index} type="list-item" />
        ))}
      </VStack>
    );
  }

  return (
    <Grid templateColumns={columns} gap={gap}>
      {Array.from({ length: count }, (_, index) => (
        <GenericSkeleton key={index} type={type} />
      ))}
    </Grid>
  );
};
