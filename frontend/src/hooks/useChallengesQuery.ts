import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChallengeService } from '../graphql/services/challengeService';
import { queryKeys } from '../lib/queryKeys';
import type { ChallengeInput } from '../graphql/services/challengeService';

// Optimized challenges hook using React Query
export const useChallengesQuery = (options?: {
	page?: number;
	limit?: number;
	search?: string;
	activityType?: string;
	challengeType?: string;
}) => {
	return useQuery({
		queryKey: queryKeys.challenges.list(options),
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
		queryKey: queryKeys.challenges.progress(challengeId),
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
		mutationFn: (challengeData: ChallengeInput) => ChallengeService.createChallenge(challengeData),
		onSuccess: () => {
			// Invalidate all challenge lists to refetch with new data
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
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
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
		},
	});

	const updateChallengeMutation = useMutation({
		mutationFn: ({ challengeId, challengeData }: { challengeId: string; challengeData: Partial<ChallengeInput> }) =>
			ChallengeService.updateChallenge(challengeId, challengeData),
		onSuccess: (_data, variables) => {
			// Invalidate specific challenge and all lists
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(variables.challengeId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
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
		queryKey: queryKeys.challenges.detail(challengeId),
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

// Hook for user's created challenges
export const useMyCreatedChallengesQuery = () => {
	return useQuery({
		queryKey: queryKeys.challenges.userChallenges('created'),
		queryFn: () => ChallengeService.getMyCreatedChallenges(),
		staleTime: 60 * 1000, // 1 minute
		gcTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Hook for user's participated challenges
export const useMyChallengesQuery = () => {
	return useQuery({
		queryKey: queryKeys.challenges.userChallenges('participated'),
		queryFn: () => ChallengeService.getMyChallenges(),
		staleTime: 60 * 1000, // 1 minute
		gcTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Hook for challenge analytics
export const useChallengeAnalyticsQuery = (challengeId: string) => {
	return useQuery({
		queryKey: [...queryKeys.challenges.detail(challengeId), 'analytics'],
		queryFn: () => ChallengeService.getChallengeAnalytics(challengeId),
		staleTime: 2 * 60 * 1000, // 2 minutes
		gcTime: 5 * 60 * 1000, // 5 minutes
		enabled: !!challengeId,
	});
};

// Hook for user's participation details in a challenge
export const useMyParticipationQuery = (challengeId: string) => {
	return useQuery({
		queryKey: [...queryKeys.challenges.detail(challengeId), 'myParticipation'],
		queryFn: () => ChallengeService.getMyParticipationDetails(challengeId),
		staleTime: 30 * 1000, // 30 seconds - participation status can change quickly
		gcTime: 2 * 60 * 1000, // 2 minutes
		enabled: !!challengeId,
	});
};

// Hook for challenge participants
export const useChallengeParticipantsQuery = (challengeId: string) => {
	return useQuery({
		queryKey: queryKeys.challenges.participants(challengeId),
		queryFn: async () => {
			// We need to add this method to the service or create it here
			const challenge = await ChallengeService.getChallengeById(challengeId);
			return challenge?.participants || [];
		},
		staleTime: 60 * 1000, // 1 minute
		gcTime: 3 * 60 * 1000, // 3 minutes
		enabled: !!challengeId,
	});
};

// Comprehensive hook for all challenge mutations
export const useChallengeActions = () => {
	const queryClient = useQueryClient();

	const deleteChallengeMutation = useMutation({
		mutationFn: (challengeId: string) => ChallengeService.deleteChallenge(challengeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
		},
	});

	const updateChallengeStatusMutation = useMutation({
		mutationFn: ({ challengeId, status }: { challengeId: string; status: 'ACTIVE' | 'CLOSED' | 'CANCELLED' }) =>
			ChallengeService.updateChallengeStatus(challengeId, status),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(variables.challengeId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
		},
	});

	const leaveChallengeeMutation = useMutation({
		mutationFn: ({ challengeId, teamId }: { challengeId: string; teamId?: string }) =>
			ChallengeService.leaveChallenge(challengeId, teamId),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(variables.challengeId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.userChallenges('participated') });
		},
	});

	const removeParticipantMutation = useMutation({
		mutationFn: ({ challengeId, participantId }: { challengeId: string; participantId: string }) =>
			ChallengeService.removeParticipant(challengeId, participantId),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(variables.challengeId) });
			queryClient.invalidateQueries({ queryKey: queryKeys.challenges.participants(variables.challengeId) });
		},
	});

	return {
		deleteChallenge: deleteChallengeMutation,
		updateChallengeStatus: updateChallengeStatusMutation,
		leaveChallenge: leaveChallengeeMutation,
		removeParticipant: removeParticipantMutation,
	};
};
