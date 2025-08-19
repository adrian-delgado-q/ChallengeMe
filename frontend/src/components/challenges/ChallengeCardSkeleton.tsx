import React from 'react';
import { GenericSkeleton, SkeletonGrid } from '../common/GenericSkeleton';

export const ChallengeCardSkeleton: React.FC = () => (
    <GenericSkeleton type="card" />
);

interface ChallengeSkeletonGridProps {
    count?: number;
}

export const ChallengeSkeletonGrid: React.FC<ChallengeSkeletonGridProps> = ({ count = 8 }) => (
    <SkeletonGrid type="card" count={count} />
);
