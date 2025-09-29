import React from 'react';
import { GenericSkeleton, SkeletonGrid } from '../common/GenericSkeleton';

export const TeamCardSkeleton: React.FC = () => <GenericSkeleton type="card" />;

interface TeamSkeletonGridProps {
	count?: number;
}

export const TeamSkeletonGrid: React.FC<TeamSkeletonGridProps> = ({ count = 12 }) => (
	<SkeletonGrid
		type="card"
		count={count}
		columns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
		gap={6}
	/>
);
