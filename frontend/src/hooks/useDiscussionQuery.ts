import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DiscussionService } from '../services/discussionService';
import { queryKeys } from '../lib/queryKeys';

// Hook for getting discussion posts for a challenge
export const useDiscussionQuery = (challengeId: string) => {
	return useQuery({
		queryKey: queryKeys.discussions.challengeDiscussions(challengeId),
		queryFn: () => DiscussionService.getDiscussionForChallenge(challengeId),
		staleTime: 30 * 1000, // 30 seconds - discussions change frequently
		gcTime: 2 * 60 * 1000, // 2 minutes
		enabled: !!challengeId,
	});
};

// Hook for getting user permissions in a discussion
export const useDiscussionPermissionsQuery = (challengeId: string, userId: string) => {
	return useQuery({
		queryKey: queryKeys.discussions.permissions(challengeId, userId),
		queryFn: () => DiscussionService.getUserPermissions(challengeId, userId),
		staleTime: 5 * 60 * 1000, // 5 minutes - permissions don't change often
		gcTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!(challengeId && userId),
	});
};

// Discussion mutations hook
export const useDiscussionMutations = () => {
	const queryClient = useQueryClient();

	const createPostMutation = useMutation({
		mutationFn: (postData: { challengeId: string; content: string; parentId?: string }) =>
			DiscussionService.createPost(postData),
		onSuccess: (_data, variables) => {
			// Invalidate discussion list for the challenge
			queryClient.invalidateQueries({
				queryKey: queryKeys.discussions.challengeDiscussions(variables.challengeId),
			});
		},
	});

	const createReplyMutation = useMutation({
		mutationFn: (replyData: {
			postId: string;
			challengeId: string;
			content: string;
			parentId?: string;
		}) => DiscussionService.createReply(replyData),
		onSuccess: (_data, variables) => {
			// Invalidate discussion list for the challenge
			queryClient.invalidateQueries({
				queryKey: queryKeys.discussions.challengeDiscussions(variables.challengeId),
			});
		},
	});

	const togglePinMutation = useMutation({
		mutationFn: ({ postId, challengeId }: { postId: string; challengeId: string }) =>
			DiscussionService.togglePin(postId, challengeId),
		onSuccess: (_data, variables) => {
			// Invalidate discussion list for the challenge
			queryClient.invalidateQueries({
				queryKey: queryKeys.discussions.challengeDiscussions(variables.challengeId),
			});
		},
	});

	const deletePostMutation = useMutation({
		mutationFn: (postId: string) => DiscussionService.deletePost(postId),
		onSuccess: () => {
			// Invalidate all discussions since we don't know which challenge this affects
			queryClient.invalidateQueries({ queryKey: queryKeys.discussions.all });
		},
	});

	const deleteReplyMutation = useMutation({
		mutationFn: (replyId: string) => DiscussionService.deleteReply(replyId),
		onSuccess: () => {
			// Invalidate all discussions since we don't know which challenge this affects
			queryClient.invalidateQueries({ queryKey: queryKeys.discussions.all });
		},
	});

	const banUserMutation = useMutation({
		mutationFn: ({
			challengeId,
			userId,
			reason,
			duration,
		}: {
			challengeId: string;
			userId: string;
			reason: string;
			duration?: string;
		}) => DiscussionService.banUser(challengeId, userId, reason, duration),
		onSuccess: (_data, variables) => {
			// Invalidate discussion permissions for this challenge and user
			queryClient.invalidateQueries({
				queryKey: queryKeys.discussions.permissions(variables.challengeId, variables.userId),
			});
		},
	});

	const unbanUserMutation = useMutation({
		mutationFn: ({ challengeId, userId }: { challengeId: string; userId: string }) =>
			DiscussionService.unbanUser(challengeId, userId),
		onSuccess: (_data, variables) => {
			// Invalidate discussion permissions for this challenge and user
			queryClient.invalidateQueries({
				queryKey: queryKeys.discussions.permissions(variables.challengeId, variables.userId),
			});
		},
	});

	return {
		createPost: createPostMutation,
		createReply: createReplyMutation,
		togglePin: togglePinMutation,
		deletePost: deletePostMutation,
		deleteReply: deleteReplyMutation,
		banUser: banUserMutation,
		unbanUser: unbanUserMutation,
	};
};
