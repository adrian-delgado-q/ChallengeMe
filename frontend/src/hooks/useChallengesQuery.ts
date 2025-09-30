import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChallengeService } from '../graphql/services/challengeService';

// Query keys for React Query
export const challengeKeys = {
	all: ['challenges'] as const,
	lists: () => [...challengeKeys.all, 'list'] as const,
	list: (options: any) => [...challengeKeys.lists(), options] as const,
	details: () => [...challengeKeys.all, 'detail'] as const,
	detail: (id: string) => [...challengeKeys.details(), id] as const,
	progress: (id: string) => [...challengeKeys.all, 'progress', id] as const,
};

// Optimized challenges hook using React Query
export const useChallengesQuery = (options?: {
	page?: number;
	limit?: number;
	search?: string;
	activityType?: string;
	challengeType?: string;
}) => {
	return useQuery({
		queryKey: challengeKeys.list(options),
		queryFn: () => ChallengeService.getChallenges(options),
		enabled: true, // Always fetch challenges, user doesn't need to be logged in to view public challenges
		staleTime: 2 * 60 * 1000, // 2 minutes - challenges don't change frequently
		gcTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false, // Don't refetch when window regains focus
		refetchOnMount: 'always', // Always refetch on mount to ensure fresh data
	});
};

// Challenge Progress Query Hook
export const useChallengeProgressQuery = (challengeId: string) => {
	return useQuery({
		queryKey: challengeKeys.progress(challengeId),
		queryFn: () => ChallengeService.getChallengeProgressOverTime(challengeId),
		staleTime: 60 * 1000, // 1 minute - progress data changes more frequently
		gcTime: 3 * 60 * 1000, // 3 minutes
		enabled: !!challengeId,
		refetchOnWindowFocus: true, // Refetch progress when user returns
	});
};

// Hook for challenge mutations (create, update, join, etc.)
export const useChallengeMutations = () => {
	const queryClient = useQueryClient();

	const createChallengeMutation = useMutation({
		mutationFn: (challengeData: any) => ChallengeService.createChallenge(challengeData),
		onSuccess: () => {
			// Invalidate all challenge lists to refetch with new data
			queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
		},
	});

	const joinChallengeMutation = useMutation({
		mutationFn: ({
			challengeId,
			asTeam,
			accessCode,
		}: {
			challengeId: string;
			asTeam?: string;
			accessCode?: string;
		}) => {
			if (asTeam) {
				return ChallengeService.joinChallengeAsTeam(challengeId, asTeam, accessCode);
			} else {
				return ChallengeService.joinChallengeAsIndividual(challengeId, accessCode);
			}
		},
		onSuccess: () => {
			// Invalidate all challenge lists to refetch with updated participation data
			queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
		},
	});

	const updateChallengeMutation = useMutation({
		mutationFn: ({ challengeId, challengeData }: { challengeId: string; challengeData: any }) =>
			ChallengeService.updateChallenge(challengeId, challengeData),
		onSuccess: (_data, variables) => {
			// Invalidate specific challenge and all lists
			queryClient.invalidateQueries({ queryKey: challengeKeys.detail(variables.challengeId) });
			queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
		},
	});

	return {
		createChallenge: createChallengeMutation,
		joinChallenge: joinChallengeMutation,
		updateChallenge: updateChallengeMutation,
	};
};

// Hook for individual challenge details
export const useChallengeQuery = (challengeId: string) => {
	return useQuery({
		queryKey: challengeKeys.detail(challengeId),
		queryFn: () => ChallengeService.getChallengeById(challengeId),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!challengeId, // Only run if challengeId is provided
	});
};

// Optimized replacement for the original useChallenges hook
export const useChallenges = (options?: {
	page?: number;
	limit?: number;
	search?: string;
	activityType?: string;
	challengeType?: string;
}) => {
	const query = useChallengesQuery(options);
	const mutations = useChallengeMutations();

	return {
		challenges: query.data?.challenges || [],
		loading: query.isLoading,
		error: query.error?.message || null,
		pagination: {
			totalCount: query.data?.totalCount || 0,
			totalPages: query.data?.totalPages || 0,
			currentPage: query.data?.currentPage || 1,
			itemsPerPage: query.data?.itemsPerPage || 12,
		},
		refetch: query.refetch,
		createChallenge: mutations.createChallenge.mutateAsync,
		updateChallenge: (challengeId: string, challengeData: any) =>
			mutations.updateChallenge.mutateAsync({ challengeId, challengeData }),
		joinChallenge: (challengeId: string, asTeam?: string, accessCode?: string) =>
			mutations.joinChallenge.mutateAsync({ challengeId, asTeam, accessCode }),
		// Additional status indicators
		isFetching: query.isFetching,
		isRefetching: query.isRefetching,
	};
};
