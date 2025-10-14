import { gql } from 'graphql-request';
import { CHALLENGE_FULL_FRAGMENT, CHALLENGE_PARTICIPANT_FRAGMENT } from '../queries/challenges.graphql';

/**
 * Mutation to create a new challenge
 */
export const CREATE_CHALLENGE = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  mutation CreateChallenge(
    $creator_id: String!
    $title: String!
    $description: String
    $instructions: String
    $image_url: String
    $challenge_type: String
    $max_participants: Int
    $start_date: Date!
    $end_date: Date!
    $is_public: Boolean
    $access_code: String
    $expires_at: Date
    $max_team_size: Int
  ) {
    createChallenge(
      creator_id: $creator_id
      title: $title
      description: $description
      instructions: $instructions
      image_url: $image_url
      challenge_type: $challenge_type
      max_participants: $max_participants
      start_date: $start_date
      end_date: $end_date
      is_public: $is_public
      access_code: $access_code
      expires_at: $expires_at
      max_team_size: $max_team_size
    ) {
      ...ChallengeFull
    }
  }
`;

/**
 * Mutation to update an existing challenge
 * Note: start_date and end_date cannot be updated after creation
 */
export const UPDATE_CHALLENGE = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  mutation UpdateChallenge(
    $id: String!
    $title: String
    $description: String
    $instructions: String
    $image_url: String
    $max_participants: Int
    $is_public: Boolean
    $access_code: String
    $status: String
    $max_team_size: Int
  ) {
    updateChallenge(
      id: $id
      title: $title
      description: $description
      instructions: $instructions
      image_url: $image_url
      max_participants: $max_participants
      is_public: $is_public
      access_code: $access_code
      status: $status
      max_team_size: $max_team_size
    ) {
      ...ChallengeFull
    }
  }
`;

/**
 * Mutation to delete a challenge
 */
export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($id: String!) {
    deleteChallenge(id: $id) {
      id
    }
  }
`;

/**
 * Mutation to update challenge status
 * Uses the updateChallenge mutation with just the status field
 */
export const UPDATE_CHALLENGE_STATUS = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  mutation UpdateChallengeStatus($id: String!, $status: String!) {
    updateChallenge(id: $id, status: $status) {
      ...ChallengeFull
    }
  }
`;

/**
 * Mutation to join a challenge as an individual
 */
export const JOIN_CHALLENGE = gql`
  ${CHALLENGE_PARTICIPANT_FRAGMENT}
  
  mutation JoinChallenge($challenge_id: String!, $user_id: String!) {
    createChallengeParticipant(
      challenge_id: $challenge_id
      user_id: $user_id
    ) {
      ...ChallengeParticipantDetails
    }
  }
`;

/**
 * Mutation to join a challenge as a team
 */
export const JOIN_CHALLENGE_AS_TEAM = gql`
  ${CHALLENGE_PARTICIPANT_FRAGMENT}
  
  mutation JoinChallengeAsTeam($challenge_id: String!, $team_id: String!) {
    createChallengeParticipant(
      challenge_id: $challenge_id
      team_id: $team_id
    ) {
      ...ChallengeParticipantDetails
    }
  }
`;

/**
 * Mutation to leave a challenge
 */
export const LEAVE_CHALLENGE = gql`
  mutation LeaveChallenge($id: String!) {
    deleteChallengeParticipant(id: $id) {
      id
    }
  }
`;

/**
 * Mutation to remove a participant from a challenge (admin/creator only)
 */
export const REMOVE_CHALLENGE_PARTICIPANT = gql`
  mutation RemoveChallengeParticipant($id: String!) {
    deleteChallengeParticipant(id: $id) {
      id
    }
  }
`;

/**
 * Mutation to create a challenge milestone
 */
export const CREATE_MILESTONE = gql`
  mutation CreateMilestone(
    $challenge_id: String!
    $name: String!
    $target_value: Float!
    $activity_type_id: String!
    $order: Int!
  ) {
    createMilestone(
      challenge_id: $challenge_id
      name: $name
      target_value: $target_value
      activity_type_id: $activity_type_id
      order: $order
    ) {
      id
      challenge_id
      name
      target_value
      order
      activity_type {
        id
        name
        unit
        unit_label
      }
    }
  }
`;

/**
 * Mutation to add a supported activity type to a challenge
 */
export const ADD_CHALLENGE_ACTIVITY_TYPE = gql`
  mutation AddChallengeActivityType($challenge_id: String!, $activity_type_id: String!) {
    createChallengeActivityType(
      challenge_id: $challenge_id
      activity_type_id: $activity_type_id
    ) {
      id
      challenge_id
      activity_type_id
      activity_type {
        id
        name
        category
        unit
        unit_label
      }
    }
  }
`;
