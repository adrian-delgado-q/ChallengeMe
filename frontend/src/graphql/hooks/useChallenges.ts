import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeQuery, executeMutation, handleGraphQLError } from '../client';
import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  GET_MY_CHALLENGES,
  GET_PUBLIC_CHALLENGES,
  GET_CHALLENGE_PARTICIPANTS,
  GET_USER_CHALLENGE_PARTICIPATION,
} from '../queries/challenges.graphql';
import {
  CREATE_CHALLENGE,
  UPDATE_CHALLENGE,
  DELETE_CHALLENGE,
  UPDATE_CHALLENGE_STATUS,
  JOIN_CHALLENGE,
  JOIN_CHALLENGE_AS_TEAM,
  LEAVE_CHALLENGE,
  REMOVE_CHALLENGE_PARTICIPANT,
  CREATE_MILESTONE,
  ADD_CHALLENGE_ACTIVITY_TYPE,
} from '../mutations/challenges.graphql';
import type {
  Challenge,
  ChallengeParticipant,
  Milestone,
  ChallengeActivityType,
} from '../../generated/graphql';

// Query Keys
export const challengeKeys = {
  all: ['challenges'] as const,
  lists: () => [...challengeKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...challengeKeys.lists(), filters] as const,
  details: () => [...challengeKeys.all, 'detail'] as const,
  detail: (id: string) => [...challengeKeys.details(), id] as const,
  myChall: (userId: string) => [...challengeKeys.all, 'my', userId] as const,
  public: () => [...challengeKeys.all, 'public'] as const,
  participants: (challengeId: string) => [...challengeKeys.all, 'participants', challengeId] as const,
  userParticipation: (challengeId: string, userId: string) => 
    [...challengeKeys.all, 'participation', challengeId, userId] as const,
};

// Types for API responses
interface GetChallengesResponse {
  challenges: Challenge[];
}

interface GetChallengeResponse {
  challenge: Challenge;
}

interface GetChallengeParticipantsResponse {
  challengeParticipants: ChallengeParticipant[];
}

interface CreateChallengeVariables {
  creator_id: string;
  title: string;
  description?: string;
  instructions?: string;
  image_url?: string;
  challenge_type?: string;
  max_participants?: number;
  start_date: string;
  end_date: string;
  is_public?: boolean;
  access_code?: string;
  expires_at?: string;
  max_team_size?: number;
}

interface UpdateChallengeVariables {
  id: string;
  title?: string;
  description?: string;
  instructions?: string;
  image_url?: string;
  max_participants?: number;
  start_date?: string;
  end_date?: string;
  is_public?: boolean;
  access_code?: string;
  max_team_size?: number;
}

// ============ Query Hooks ============

/**
 * Hook to get all challenges with optional filters
 */
export function useGetChallenges(filters?: {
  creator_id?: string;
  status?: string;
  is_public?: boolean;
  challenge_type?: string;
}) {
  return useQuery({
    queryKey: challengeKeys.list(filters || {}),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengesResponse>(GET_CHALLENGES, filters);
        return data.challenges;
      } catch (error) {
        handleGraphQLError(error, 'fetch challenges');
      }
    },
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to get a single challenge by ID
 */
export function useGetChallenge(id: string) {
  return useQuery({
    queryKey: challengeKeys.detail(id),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengeResponse>(GET_CHALLENGE, { id });
        return data.challenge;
      } catch (error) {
        handleGraphQLError(error, 'fetch challenge');
      }
    },
    enabled: !!id,
    staleTime: 30000,
  });
}

/**
 * Hook to get challenges created by current user
 */
export function useGetMyChallenges(userId: string) {
  return useQuery({
    queryKey: challengeKeys.myChall(userId),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengesResponse>(GET_MY_CHALLENGES, { user_id: userId });
        return data.challenges;
      } catch (error) {
        handleGraphQLError(error, 'fetch my challenges');
      }
    },
    enabled: !!userId,
    staleTime: 30000,
  });
}

/**
 * Hook to get all public challenges
 */
export function useGetPublicChallenges() {
  return useQuery({
    queryKey: challengeKeys.public(),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengesResponse>(GET_PUBLIC_CHALLENGES);
        return data.challenges;
      } catch (error) {
        handleGraphQLError(error, 'fetch public challenges');
      }
    },
    staleTime: 30000,
  });
}

/**
 * Hook to get challenge participants
 */
export function useGetChallengeParticipants(challengeId: string) {
  return useQuery({
    queryKey: challengeKeys.participants(challengeId),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengeParticipantsResponse>(
          GET_CHALLENGE_PARTICIPANTS,
          { challenge_id: challengeId }
        );
        return data.challengeParticipants;
      } catch (error) {
        handleGraphQLError(error, 'fetch challenge participants');
      }
    },
    enabled: !!challengeId,
    staleTime: 15000,
  });
}

/**
 * Hook to get user's participation in a specific challenge
 */
export function useGetUserChallengeParticipation(challengeId: string, userId: string) {
  return useQuery({
    queryKey: challengeKeys.userParticipation(challengeId, userId),
    queryFn: async () => {
      try {
        const data = await executeQuery<GetChallengeParticipantsResponse>(
          GET_USER_CHALLENGE_PARTICIPATION,
          { challenge_id: challengeId, user_id: userId }
        );
        return data.challengeParticipants[0] || null;
      } catch (error) {
        handleGraphQLError(error, 'fetch user participation');
      }
    },
    enabled: !!challengeId && !!userId,
    staleTime: 15000,
  });
}

// ============ Mutation Hooks ============

/**
 * Hook to create a new challenge
 */
export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: CreateChallengeVariables) => {
      try {
        const data = await executeMutation<{ createChallenge: Challenge }>(
          CREATE_CHALLENGE,
          variables
        );
        return data.createChallenge;
      } catch (error) {
        handleGraphQLError(error, 'create challenge');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
    },
  });
}

/**
 * Hook to update a challenge
 */
export function useUpdateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateChallengeVariables) => {
      try {
        const data = await executeMutation<{ updateChallenge: Challenge }>(
          UPDATE_CHALLENGE,
          variables
        );
        return data.updateChallenge;
      } catch (error) {
        handleGraphQLError(error, 'update challenge');
      }
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      }
    },
  });
}

/**
 * Hook to delete a challenge
 */
export function useDeleteChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const data = await executeMutation<{ deleteChallenge: { id: string } }>(
          DELETE_CHALLENGE,
          { id }
        );
        return data.deleteChallenge;
      } catch (error) {
        handleGraphQLError(error, 'delete challenge');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengeKeys.all });
    },
  });
}

/**
 * Hook to update challenge status
 */
export function useUpdateChallengeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      try {
        const data = await executeMutation<{ updateChallengeStatus: Challenge }>(
          UPDATE_CHALLENGE_STATUS,
          { id, status }
        );
        return data.updateChallengeStatus;
      } catch (error) {
        handleGraphQLError(error, 'update challenge status');
      }
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      }
    },
  });
}

/**
 * Hook to join a challenge as an individual
 */
export function useJoinChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ challenge_id, user_id }: { challenge_id: string; user_id: string }) => {
      try {
        const data = await executeMutation<{ createChallengeParticipant: ChallengeParticipant }>(
          JOIN_CHALLENGE,
          { challenge_id, user_id }
        );
        return data.createChallengeParticipant;
      } catch (error) {
        handleGraphQLError(error, 'join challenge');
      }
    },
    onSuccess: (data) => {
      if (data?.challenge_id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.challenge_id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.participants(data.challenge_id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      }
    },
  });
}

/**
 * Hook to join a challenge as a team
 */
export function useJoinChallengeAsTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ challenge_id, team_id }: { challenge_id: string; team_id: string }) => {
      try {
        const data = await executeMutation<{ createChallengeParticipant: ChallengeParticipant }>(
          JOIN_CHALLENGE_AS_TEAM,
          { challenge_id, team_id }
        );
        return data.createChallengeParticipant;
      } catch (error) {
        handleGraphQLError(error, 'join challenge as team');
      }
    },
    onSuccess: (data) => {
      if (data?.challenge_id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.challenge_id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.participants(data.challenge_id) });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      }
    },
  });
}

/**
 * Hook to leave a challenge
 */
export function useLeaveChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const data = await executeMutation<{ deleteChallengeParticipant: { id: string } }>(
          LEAVE_CHALLENGE,
          { id }
        );
        return data.deleteChallengeParticipant;
      } catch (error) {
        handleGraphQLError(error, 'leave challenge');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengeKeys.all });
    },
  });
}

/**
 * Hook to remove a participant from a challenge (admin/creator only)
 */
export function useRemoveChallengeParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const data = await executeMutation<{ deleteChallengeParticipant: { id: string } }>(
          REMOVE_CHALLENGE_PARTICIPANT,
          { id }
        );
        return data.deleteChallengeParticipant;
      } catch (error) {
        handleGraphQLError(error, 'remove participant');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengeKeys.all });
    },
  });
}

/**
 * Hook to create a milestone
 */
export function useCreateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      challenge_id: string;
      name: string;
      target_value: number;
      activity_type_id: string;
      order: number;
    }) => {
      try {
        const data = await executeMutation<{ createMilestone: Milestone }>(
          CREATE_MILESTONE,
          variables
        );
        return data.createMilestone;
      } catch (error) {
        handleGraphQLError(error, 'create milestone');
      }
    },
    onSuccess: (data) => {
      if (data?.challenge_id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.challenge_id) });
      }
    },
  });
}

/**
 * Hook to add an activity type to a challenge
 */
export function useAddChallengeActivityType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      challenge_id: string;
      activity_type_id: string;
    }) => {
      try {
        const data = await executeMutation<{ createChallengeActivityType: ChallengeActivityType }>(
          ADD_CHALLENGE_ACTIVITY_TYPE,
          variables
        );
        return data.createChallengeActivityType;
      } catch (error) {
        handleGraphQLError(error, 'add activity type');
      }
    },
    onSuccess: (data) => {
      if (data?.challenge_id) {
        queryClient.invalidateQueries({ queryKey: challengeKeys.detail(data.challenge_id) });
      }
    },
  });
}
