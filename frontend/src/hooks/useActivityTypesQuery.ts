import { useQuery } from '@tanstack/react-query';
import { ActivityTypeService } from '../graphql/services/activityTypeService';

// Hook to get all activity types
export const useActivityTypesQuery = () => {
	return useQuery({
		queryKey: ['activityTypes'],
		queryFn: () => ActivityTypeService.getActivityTypes(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

// Hook to get specific activity types by IDs
export const useActivityTypesByIdsQuery = (ids: string[]) => {
	return useQuery({
		queryKey: ['activityTypes', 'byIds', ids.sort()], // Sort IDs for consistent cache keys
		queryFn: () => ActivityTypeService.getActivityTypesByIds(ids),
		enabled: ids.length > 0, // Only run query if there are IDs
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

// Hook to get activity types for a specific challenge
export const useActivityTypesForChallengeQuery = (challengeId: string) => {
	return useQuery({
		queryKey: ['activityTypes', 'challenge', challengeId],
		queryFn: () => ActivityTypeService.getActivityTypesForChallenge(challengeId),
		enabled: !!challengeId, // Only run query if challenge ID exists
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};
