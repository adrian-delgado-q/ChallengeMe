import { sdk } from '../client';
import type {
  CreateChallengeMutationVariables,
  UpdateChallengeMutationVariables,
  GetChallengesQueryVariables,
} from '../../generated/graphql';

/**
 * GraphQL Challenge Service
 * Provides typed methods for all challenge-related operations
 */
export const challengeService = {
  /**
   * Get all challenges with optional filters
   */
  async getChallenges(variables?: GetChallengesQueryVariables) {
    const result = await sdk.GetChallenges(variables);
    return result.challenges;
  },

  /**
   * Get a single challenge by ID
   */
  async getChallenge(id: string) {
    const result = await sdk.GetChallenge({ id });
    return result.challenge;
  },

  /**
   * Get challenges created by a specific user
   */
  async getMyChallenges(user_id: string) {
    const result = await sdk.GetMyChallenges({ user_id });
    return result.challenges;
  },

  /**
   * Get all public challenges
   */
  async getPublicChallenges() {
    const result = await sdk.GetPublicChallenges();
    return result.challenges;
  },

  /**
   * Create a new challenge
   */
  async createChallenge(variables: CreateChallengeMutationVariables) {
    const result = await sdk.CreateChallenge(variables);
    return result.createChallenge;
  },

  /**
   * Update an existing challenge
   */
  async updateChallenge(variables: UpdateChallengeMutationVariables) {
    const result = await sdk.UpdateChallenge(variables);
    return result.updateChallenge;
  },

  /**
   * Delete a challenge
   */
  async deleteChallenge(id: string) {
    const result = await sdk.DeleteChallenge({ id });
    return result.deleteChallenge;
  },

  /**
   * Update challenge status
   */
  async updateChallengeStatus(id: string, status: string) {
    const result = await sdk.UpdateChallengeStatus({ id, status });
    return result.updateChallenge;
  },

  /**
   * Join a challenge as an individual
   */
  async joinChallenge(challenge_id: string, user_id: string) {
    const result = await sdk.JoinChallenge({ challenge_id, user_id });
    return result.createChallengeParticipant;
  },

  /**
   * Join a challenge as a team
   */
  async joinChallengeAsTeam(challenge_id: string, team_id: string) {
    const result = await sdk.JoinChallengeAsTeam({ challenge_id, team_id });
    return result.createChallengeParticipant;
  },

  /**
   * Leave a challenge
   */
  async leaveChallenge(id: string) {
    const result = await sdk.LeaveChallenge({ id });
    return result.deleteChallengeParticipant;
  },

  /**
   * Remove a participant from a challenge (admin/creator only)
   */
  async removeParticipant(id: string) {
    const result = await sdk.RemoveChallengeParticipant({ id });
    return result.deleteChallengeParticipant;
  },

  /**
   * Get all participants for a challenge
   */
  async getChallengeParticipants(challenge_id: string) {
    const result = await sdk.GetChallengeParticipants({ challenge_id });
    return result.challengeParticipants;
  },

  /**
   * Get user's participation in a specific challenge
   */
  async getUserChallengeParticipation(challenge_id: string, user_id: string) {
    const result = await sdk.GetUserChallengeParticipation({ challenge_id, user_id });
    return result.challengeParticipants;
  },

  /**
   * Add a supported activity type to a challenge
   */
  async addChallengeActivityType(challenge_id: string, activity_type_id: string) {
    const result = await sdk.AddChallengeActivityType({ challenge_id, activity_type_id });
    return result.createChallengeActivityType;
  },

  /**
   * Create a milestone for a challenge
   */
  async createMilestone(
    challenge_id: string,
    name: string,
    activity_type_id: string,
    target_value: number,
    order: number
  ) {
    const result = await sdk.CreateMilestone({
      challenge_id,
      name,
      activity_type_id,
      target_value,
      order,
    });
    return result.createMilestone;
  },
};
