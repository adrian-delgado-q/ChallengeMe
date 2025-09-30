import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityService } from '../graphql/services/activityService';

// Query keys for Activities
export const activityKeys = {
	all: ['activities'] as const,
	challenges: () => [...activityKeys.all, 'challenge'] as const,
	challenge: (challengeId: string) => [...activityKeys.challenges(), challengeId] as const,
	users: () => [...activityKeys.all, 'user'] as const,
	user: (userId?: string) => [...activityKeys.users(), userId] as const,
	recent: (limit?: number) => [...activityKeys.all, 'recent', limit] as const,
	leaderboard: (challengeId: string) => [...activityKeys.all, 'leaderboard', challengeId] as const,
	management: () => [...activityKeys.all, 'management'] as const,
};

// Activities for Challenge Query Hook
export const useActivitiesForChallengeQuery = (challengeId: string) => {
	return useQuery({
		queryKey: activityKeys.challenge(challengeId),
		queryFn: () => ActivityService.getActivitiesForChallenge(challengeId),
		staleTime: 30 * 1000, // 30 seconds - activities change frequently
		gcTime: 2 * 60 * 1000, // 2 minutes
		enabled: !!challengeId,
		refetchOnWindowFocus: true, // Activities should update when user returns
	});
};

// Recent Activities Query Hook
export const useRecentActivitiesQuery = (limit: number = 20) => {
	return useQuery({
		queryKey: activityKeys.recent(limit),
		queryFn: () => ActivityService.getRecentActivities(limit),
		staleTime: 30 * 1000, // 30 seconds
		gcTime: 2 * 60 * 1000, // 2 minutes
		refetchOnWindowFocus: true,
	});
};

// User Activities Query Hook
export const useUserActivitiesQuery = (userId?: string) => {
	return useQuery({
		queryKey: activityKeys.user(userId),
		queryFn: () => ActivityService.getActivitiesForUser(userId),
		staleTime: 60 * 1000, // 1 minute - user activities don't change as frequently
		gcTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});
};

// Leaderboard Activities Query Hook
export const useLeaderboardActivitiesQuery = (challengeId: string) => {
	return useQuery({
		queryKey: activityKeys.leaderboard(challengeId),
		queryFn: () => ActivityService.getActivitiesForLeaderboard(challengeId),
		staleTime: 60 * 1000, // 1 minute
		gcTime: 5 * 60 * 1000, // 5 minutes
		enabled: !!challengeId,
		refetchOnWindowFocus: true,
	});
};

// Management Activities Query Hook
export const useManagementActivitiesQuery = () => {
	return useQuery({
		queryKey: activityKeys.management(),
		queryFn: () => ActivityService.getActivitiesForManagement(),
		staleTime: 60 * 1000, // 1 minute
		gcTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});
};

// Activity Mutations Hook
export const useActivityMutations = () => {
	const queryClient = useQueryClient();

	const createActivityMutation = useMutation({
		mutationFn: (activityData: any) => ActivityService.createActivity(activityData),
		onSuccess: (_data, variables) => {
			// Invalidate all activity-related queries since new activity affects many lists
			queryClient.invalidateQueries({ queryKey: activityKeys.all });

			// If activity is for a specific challenge, invalidate that challenge's data too
			if (variables.challengeId) {
				queryClient.invalidateQueries({ queryKey: ['challenges', 'detail', variables.challengeId] });
			}
		},
	});

	return {
		createActivity: createActivityMutation,
	};
};

// Optimized replacement for the original useActivities hook
export const useActivities = (challengeId?: string) => {
	const recentActivitiesQuery = useRecentActivitiesQuery();
	const challengeActivitiesQuery = useActivitiesForChallengeQuery(challengeId || '');
	const mutations = useActivityMutations();

	// Use challenge activities if challengeId is provided, otherwise use recent activities
	const activeQuery = challengeId ? challengeActivitiesQuery : recentActivitiesQuery;

	return {
		activities: activeQuery.data || [],
		loading: activeQuery.isLoading,
		error: activeQuery.error?.message || null,
		refetch: activeQuery.refetch,
		isFetching: activeQuery.isFetching,
		isRefetching: activeQuery.isRefetching,
		// Mutations
		createActivity: mutations.createActivity.mutateAsync,
	};
};
