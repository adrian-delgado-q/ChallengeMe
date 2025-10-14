import { gql } from 'graphql-request';

/**
 * Fragment for Challenge Creator details
 */
export const CHALLENGE_CREATOR_FRAGMENT = gql`
  fragment ChallengeCreator on Profile {
    id
    username
    avatar_url
  }
`;

/**
 * Fragment for Challenge Milestone details
 */
export const CHALLENGE_MILESTONE_FRAGMENT = gql`
  fragment ChallengeMilestone on Milestone {
    id
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
`;

/**
 * Fragment for Challenge Activity Type details
 */
export const CHALLENGE_ACTIVITY_TYPE_FRAGMENT = gql`
  fragment ChallengeActivityType on ChallengeActivityType {
    id
    activity_type_id
    activity_type {
      id
      name
      category
      unit
      unit_label
      description
    }
  }
`;

/**
 * Fragment for Challenge Participant details
 */
export const CHALLENGE_PARTICIPANT_FRAGMENT = gql`
  fragment ChallengeParticipantDetails on ChallengeParticipant {
    id
    user_id
    team_id
    joined_at
    team {
      id
      name
      avatar_url
    }
    user {
      id
      username
      avatar_url
    }
  }
`;

/**
 * Fragment for basic Challenge details
 */
export const CHALLENGE_BASIC_FRAGMENT = gql`
  fragment ChallengeBasic on Challenge {
    id
    title
    description
    instructions
    image_url
    challenge_type
    max_participants
    participant_count
    max_team_size
    start_date
    end_date
    is_public
    access_code
    status
    created_at
    expires_at
  }
`;

/**
 * Fragment for full Challenge details with relations
 */
export const CHALLENGE_FULL_FRAGMENT = gql`
  ${CHALLENGE_BASIC_FRAGMENT}
  ${CHALLENGE_CREATOR_FRAGMENT}
  ${CHALLENGE_MILESTONE_FRAGMENT}
  ${CHALLENGE_ACTIVITY_TYPE_FRAGMENT}
  
  fragment ChallengeFull on Challenge {
    ...ChallengeBasic
    creator {
      ...ChallengeCreator
    }
    milestones {
      ...ChallengeMilestone
    }
    supported_activities {
      ...ChallengeActivityType
    }
  }
`;

/**
 * Query to get all challenges with optional filters
 */
export const GET_CHALLENGES = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  query GetChallenges(
    $creator_id: String
    $status: String
    $is_public: Boolean
    $challenge_type: String
  ) {
    challenges(
      creator_id: $creator_id
      status: $status
      is_public: $is_public
      challenge_type: $challenge_type
    ) {
      ...ChallengeFull
    }
  }
`;

/**
 * Query to get a single challenge by ID
 */
export const GET_CHALLENGE = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  ${CHALLENGE_PARTICIPANT_FRAGMENT}
  
  query GetChallenge($id: String!) {
    challenge(id: $id) {
      ...ChallengeFull
      participants {
        ...ChallengeParticipantDetails
      }
    }
  }
`;

/**
 * Query to get challenges the current user is participating in
 */
export const GET_MY_CHALLENGES = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  query GetMyChallenges($user_id: String!) {
    challenges(creator_id: $user_id) {
      ...ChallengeFull
    }
  }
`;

/**
 * Query to get public challenges
 */
export const GET_PUBLIC_CHALLENGES = gql`
  ${CHALLENGE_FULL_FRAGMENT}
  
  query GetPublicChallenges {
    challenges(is_public: true, status: "ACTIVE") {
      ...ChallengeFull
    }
  }
`;

/**
 * Query to get challenge participants
 */
export const GET_CHALLENGE_PARTICIPANTS = gql`
  ${CHALLENGE_PARTICIPANT_FRAGMENT}
  
  query GetChallengeParticipants($challenge_id: String!) {
    challengeParticipants(challenge_id: $challenge_id) {
      ...ChallengeParticipantDetails
    }
  }
`;

/**
 * Query to get user's participation in a challenge
 */
export const GET_USER_CHALLENGE_PARTICIPATION = gql`
  ${CHALLENGE_PARTICIPANT_FRAGMENT}
  
  query GetUserChallengeParticipation($challenge_id: String!, $user_id: String!) {
    challengeParticipants(challenge_id: $challenge_id, user_id: $user_id) {
      ...ChallengeParticipantDetails
    }
  }
`;
