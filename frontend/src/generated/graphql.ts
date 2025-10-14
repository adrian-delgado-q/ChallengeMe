import { GraphQLClient } from 'graphql-request';
import type { RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  Challenge?: Maybe<Challenge>;
  Profile?: Maybe<Profile>;
  activity_type?: Maybe<ActivityType>;
  activity_type_id?: Maybe<Scalars['String']['output']>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<ChallengeParticipant>;
  participant_id?: Maybe<Scalars['String']['output']>;
  profile_id?: Maybe<Scalars['String']['output']>;
  uploaded_at?: Maybe<Scalars['Date']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
  workout_session?: Maybe<WorkoutSession>;
  workout_session_id?: Maybe<Scalars['String']['output']>;
};

export type ActivityType = {
  __typename?: 'ActivityType';
  activities?: Maybe<Array<Activity>>;
  category?: Maybe<Scalars['String']['output']>;
  challenges?: Maybe<Array<ChallengeActivityType>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  milestones?: Maybe<Array<Milestone>>;
  name?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  unit_label?: Maybe<Scalars['String']['output']>;
  workout_exercises?: Maybe<Array<WorkoutExercise>>;
};

export type Challenge = {
  __typename?: 'Challenge';
  access_code?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  challenge_type?: Maybe<ChallengeParticipantType>;
  created_at?: Maybe<Scalars['Date']['output']>;
  creator?: Maybe<Profile>;
  creator_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discussion_bans?: Maybe<Array<DiscussionBan>>;
  discussion_moderators?: Maybe<Array<DiscussionModerator>>;
  discussion_posts?: Maybe<Array<DiscussionPost>>;
  end_date?: Maybe<Scalars['Date']['output']>;
  expires_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  is_public?: Maybe<Scalars['Boolean']['output']>;
  max_participants?: Maybe<Scalars['Int']['output']>;
  max_team_size?: Maybe<Scalars['Int']['output']>;
  milestones?: Maybe<Array<Milestone>>;
  participant_count?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<ChallengeParticipant>>;
  posts?: Maybe<Array<Post>>;
  start_date?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<ChallengeStatus>;
  supported_activities?: Maybe<Array<ChallengeActivityType>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ChallengeActivityType = {
  __typename?: 'ChallengeActivityType';
  activity_type?: Maybe<ActivityType>;
  activity_type_id?: Maybe<Scalars['String']['output']>;
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ChallengeParticipant = {
  __typename?: 'ChallengeParticipant';
  activities?: Maybe<Array<Activity>>;
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  joined_at?: Maybe<Scalars['Date']['output']>;
  milestone_progress?: Maybe<Array<MilestoneProgress>>;
  posts?: Maybe<Array<Post>>;
  team?: Maybe<Team>;
  team_id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Profile>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type ChallengeParticipantType =
  | 'INDIVIDUAL'
  | 'TEAM';

export type ChallengeStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'CLOSED';

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<Profile>;
  author_id?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  post?: Maybe<Post>;
  post_id?: Maybe<Scalars['String']['output']>;
};

export type DiscussionBan = {
  __typename?: 'DiscussionBan';
  banned_at?: Maybe<Scalars['Date']['output']>;
  banned_by?: Maybe<Profile>;
  banned_by_id?: Maybe<Scalars['String']['output']>;
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  expires_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Profile>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type DiscussionModerator = {
  __typename?: 'DiscussionModerator';
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  granted_at?: Maybe<Scalars['Date']['output']>;
  granted_by?: Maybe<Profile>;
  granted_by_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<ModeratorRole>;
  user?: Maybe<Profile>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type DiscussionPost = {
  __typename?: 'DiscussionPost';
  author?: Maybe<Profile>;
  author_id?: Maybe<Scalars['String']['output']>;
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  is_pinned?: Maybe<Scalars['Boolean']['output']>;
  last_reply_at?: Maybe<Scalars['Date']['output']>;
  replies?: Maybe<Array<DiscussionReply>>;
  reply_count?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type DiscussionReply = {
  __typename?: 'DiscussionReply';
  author?: Maybe<Profile>;
  author_id?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  parent?: Maybe<DiscussionReply>;
  parent_id?: Maybe<Scalars['String']['output']>;
  post?: Maybe<DiscussionPost>;
  post_id?: Maybe<Scalars['String']['output']>;
  replies?: Maybe<Array<DiscussionReply>>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type Milestone = {
  __typename?: 'Milestone';
  activity_type?: Maybe<ActivityType>;
  activity_type_id?: Maybe<Scalars['String']['output']>;
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  participant_progress?: Maybe<Array<MilestoneProgress>>;
  target_value?: Maybe<Scalars['Float']['output']>;
};

export type MilestoneProgress = {
  __typename?: 'MilestoneProgress';
  achieved_at?: Maybe<Scalars['Date']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  current_value?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_achieved?: Maybe<Scalars['Boolean']['output']>;
  milestone?: Maybe<Milestone>;
  milestone_id?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<ChallengeParticipant>;
  participant_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type ModeratorRole =
  | 'ADMIN'
  | 'MODERATOR';

export type Mutation = {
  __typename?: 'Mutation';
  createActivity?: Maybe<Activity>;
  createActivityType?: Maybe<ActivityType>;
  createChallenge?: Maybe<Challenge>;
  createChallengeActivityType?: Maybe<ChallengeActivityType>;
  createChallengeParticipant?: Maybe<ChallengeParticipant>;
  createComment?: Maybe<Comment>;
  createDiscussionBan?: Maybe<DiscussionBan>;
  createDiscussionModerator?: Maybe<DiscussionModerator>;
  createDiscussionPost?: Maybe<DiscussionPost>;
  createDiscussionReply?: Maybe<DiscussionReply>;
  createMilestone?: Maybe<Milestone>;
  createMilestoneProgress?: Maybe<MilestoneProgress>;
  createPost?: Maybe<Post>;
  createProfile?: Maybe<Profile>;
  createTeam?: Maybe<Team>;
  createTeamMembership?: Maybe<TeamMembership>;
  createWorkout?: Maybe<Workout>;
  createWorkoutComment?: Maybe<WorkoutComment>;
  createWorkoutExercise?: Maybe<WorkoutExercise>;
  createWorkoutSession?: Maybe<WorkoutSession>;
  deleteActivity?: Maybe<Activity>;
  deleteActivityType?: Maybe<ActivityType>;
  deleteChallenge?: Maybe<Challenge>;
  deleteChallengeActivityType?: Maybe<ChallengeActivityType>;
  deleteChallengeParticipant?: Maybe<ChallengeParticipant>;
  deleteComment?: Maybe<Comment>;
  deleteDiscussionBan?: Maybe<DiscussionBan>;
  deleteDiscussionModerator?: Maybe<DiscussionModerator>;
  deleteDiscussionPost?: Maybe<DiscussionPost>;
  deleteDiscussionReply?: Maybe<DiscussionReply>;
  deleteMilestone?: Maybe<Milestone>;
  deleteMilestoneProgress?: Maybe<MilestoneProgress>;
  deletePost?: Maybe<Post>;
  deleteProfile?: Maybe<Profile>;
  deleteTeam?: Maybe<Team>;
  deleteTeamMembership?: Maybe<TeamMembership>;
  deleteWorkout?: Maybe<Workout>;
  deleteWorkoutComment?: Maybe<WorkoutComment>;
  deleteWorkoutExercise?: Maybe<WorkoutExercise>;
  deleteWorkoutSession?: Maybe<WorkoutSession>;
  updateActivity?: Maybe<Activity>;
  updateActivityType?: Maybe<ActivityType>;
  updateChallenge?: Maybe<Challenge>;
  updateComment?: Maybe<Comment>;
  updateDiscussionBan?: Maybe<DiscussionBan>;
  updateDiscussionModerator?: Maybe<DiscussionModerator>;
  updateDiscussionPost?: Maybe<DiscussionPost>;
  updateDiscussionReply?: Maybe<DiscussionReply>;
  updateMilestone?: Maybe<Milestone>;
  updateMilestoneProgress?: Maybe<MilestoneProgress>;
  updatePost?: Maybe<Post>;
  updateProfile?: Maybe<Profile>;
  updateTeam?: Maybe<Team>;
  updateTeamMembership?: Maybe<TeamMembership>;
  updateWorkout?: Maybe<Workout>;
  updateWorkoutComment?: Maybe<WorkoutComment>;
  updateWorkoutExercise?: Maybe<WorkoutExercise>;
  updateWorkoutSession?: Maybe<WorkoutSession>;
};


export type MutationCreateActivityArgs = {
  activity_type_id: Scalars['String']['input'];
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  participant_id?: InputMaybe<Scalars['String']['input']>;
  profile_id?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['Float']['input'];
  workout_session_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateActivityTypeArgs = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  unit: Scalars['String']['input'];
  unit_label: Scalars['String']['input'];
};


export type MutationCreateChallengeArgs = {
  access_code?: InputMaybe<Scalars['String']['input']>;
  challenge_type?: InputMaybe<Scalars['String']['input']>;
  creator_id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  end_date: Scalars['Date']['input'];
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  max_participants?: InputMaybe<Scalars['Int']['input']>;
  max_team_size?: InputMaybe<Scalars['Int']['input']>;
  start_date: Scalars['Date']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateChallengeActivityTypeArgs = {
  activity_type_id: Scalars['String']['input'];
  challenge_id: Scalars['String']['input'];
};


export type MutationCreateChallengeParticipantArgs = {
  challenge_id: Scalars['String']['input'];
  team_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCommentArgs = {
  author_id: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  post_id: Scalars['String']['input'];
};


export type MutationCreateDiscussionBanArgs = {
  banned_by_id: Scalars['String']['input'];
  challenge_id: Scalars['String']['input'];
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};


export type MutationCreateDiscussionModeratorArgs = {
  challenge_id: Scalars['String']['input'];
  granted_by_id: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};


export type MutationCreateDiscussionPostArgs = {
  author_id: Scalars['String']['input'];
  challenge_id: Scalars['String']['input'];
  content: Scalars['String']['input'];
};


export type MutationCreateDiscussionReplyArgs = {
  author_id: Scalars['String']['input'];
  content: Scalars['String']['input'];
  parent_id?: InputMaybe<Scalars['String']['input']>;
  post_id: Scalars['String']['input'];
};


export type MutationCreateMilestoneArgs = {
  activity_type_id: Scalars['String']['input'];
  challenge_id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  target_value: Scalars['Float']['input'];
};


export type MutationCreateMilestoneProgressArgs = {
  current_value?: InputMaybe<Scalars['Int']['input']>;
  milestone_id: Scalars['String']['input'];
  participant_id: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  participant_id: Scalars['String']['input'];
  profile_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProfileArgs = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateTeamArgs = {
  access_code?: InputMaybe<Scalars['String']['input']>;
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  creator_id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  max_members?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  sports_types?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationCreateTeamMembershipArgs = {
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  team_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
};


export type MutationCreateWorkoutArgs = {
  ai_model?: InputMaybe<Scalars['String']['input']>;
  creator_id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  generated_by_ai?: InputMaybe<Scalars['Boolean']['input']>;
  is_team_workout?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  team_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateWorkoutCommentArgs = {
  author_id: Scalars['String']['input'];
  content: Scalars['String']['input'];
  workout_id: Scalars['String']['input'];
};


export type MutationCreateWorkoutExerciseArgs = {
  activity_type_id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  order_index: Scalars['Int']['input'];
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest_time?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
  workout_id: Scalars['String']['input'];
};


export type MutationCreateWorkoutSessionArgs = {
  notes?: InputMaybe<Scalars['String']['input']>;
  profile_id: Scalars['String']['input'];
  session_date?: InputMaybe<Scalars['Date']['input']>;
  workout_id: Scalars['String']['input'];
};


export type MutationDeleteActivityArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteActivityTypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteChallengeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteChallengeActivityTypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteChallengeParticipantArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDiscussionBanArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDiscussionModeratorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDiscussionPostArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDiscussionReplyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMilestoneArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteMilestoneProgressArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProfileArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTeamMembershipArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWorkoutArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWorkoutCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWorkoutExerciseArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWorkoutSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateActivityArgs = {
  date?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateActivityTypeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unit_label?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateChallengeArgs = {
  access_code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  max_participants?: InputMaybe<Scalars['Int']['input']>;
  max_team_size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCommentArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUpdateDiscussionBanArgs = {
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['String']['input'];
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDiscussionModeratorArgs = {
  id: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationUpdateDiscussionPostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  is_pinned?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateDiscussionReplyArgs = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateMilestoneArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  target_value?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateMilestoneProgressArgs = {
  current_value?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  is_achieved?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProfileArgs = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTeamArgs = {
  access_code?: InputMaybe<Scalars['String']['input']>;
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['String']['input'];
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  max_members?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sports_types?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateTeamMembershipArgs = {
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateWorkoutArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  is_team_workout?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateWorkoutCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationUpdateWorkoutExerciseArgs = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  order_index?: InputMaybe<Scalars['Int']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest_time?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateWorkoutSessionArgs = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  session_date?: InputMaybe<Scalars['Date']['input']>;
};

export type Post = {
  __typename?: 'Post';
  Challenge?: Maybe<Challenge>;
  Profile?: Maybe<Profile>;
  challenge_id?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Comment>>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  participant?: Maybe<ChallengeParticipant>;
  participant_id?: Maybe<Scalars['String']['output']>;
  profile_id?: Maybe<Scalars['String']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  activities?: Maybe<Array<Activity>>;
  avatar_url?: Maybe<Scalars['String']['output']>;
  banned_users?: Maybe<Array<DiscussionBan>>;
  challenge_entries?: Maybe<Array<ChallengeParticipant>>;
  comments?: Maybe<Array<Comment>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  created_challenges?: Maybe<Array<Challenge>>;
  created_teams?: Maybe<Array<Team>>;
  created_workouts?: Maybe<Array<Workout>>;
  discussion_bans?: Maybe<Array<DiscussionBan>>;
  discussion_posts?: Maybe<Array<DiscussionPost>>;
  discussion_replies?: Maybe<Array<DiscussionReply>>;
  granted_moderators?: Maybe<Array<DiscussionModerator>>;
  id?: Maybe<Scalars['ID']['output']>;
  moderator_roles?: Maybe<Array<DiscussionModerator>>;
  posts?: Maybe<Array<Post>>;
  team_memberships?: Maybe<Array<TeamMembership>>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  workout_comment?: Maybe<Array<WorkoutComment>>;
  workout_sessions?: Maybe<Array<WorkoutSession>>;
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Activity>>;
  activityType?: Maybe<ActivityType>;
  activityTypes?: Maybe<Array<ActivityType>>;
  challenge?: Maybe<Challenge>;
  challengeActivityTypes?: Maybe<Array<ChallengeActivityType>>;
  challengeParticipants?: Maybe<Array<ChallengeParticipant>>;
  challenges?: Maybe<Array<Challenge>>;
  comments?: Maybe<Array<Comment>>;
  discussionBans?: Maybe<Array<DiscussionBan>>;
  discussionModerators?: Maybe<Array<DiscussionModerator>>;
  discussionPosts?: Maybe<Array<DiscussionPost>>;
  discussionReplies?: Maybe<Array<DiscussionReply>>;
  milestoneProgress?: Maybe<Array<MilestoneProgress>>;
  milestones?: Maybe<Array<Milestone>>;
  ok?: Maybe<Scalars['Boolean']['output']>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  profile?: Maybe<Profile>;
  profiles?: Maybe<Array<Profile>>;
  team?: Maybe<Team>;
  teamMemberships?: Maybe<Array<TeamMembership>>;
  teams?: Maybe<Array<Team>>;
  workout?: Maybe<Workout>;
  workoutComments?: Maybe<Array<WorkoutComment>>;
  workoutExercises?: Maybe<Array<WorkoutExercise>>;
  workoutSessions?: Maybe<Array<WorkoutSession>>;
  workouts?: Maybe<Array<Workout>>;
};


export type QueryActivitiesArgs = {
  activity_type_id?: InputMaybe<Scalars['String']['input']>;
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  participant_id?: InputMaybe<Scalars['String']['input']>;
  profile_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryActivityTypeArgs = {
  id: Scalars['String']['input'];
};


export type QueryActivityTypesArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryChallengeArgs = {
  id: Scalars['String']['input'];
};


export type QueryChallengeActivityTypesArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryChallengeParticipantsArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryChallengesArgs = {
  challenge_type?: InputMaybe<Scalars['String']['input']>;
  creator_id?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommentsArgs = {
  post_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscussionBansArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscussionModeratorsArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscussionPostsArgs = {
  author_id?: InputMaybe<Scalars['String']['input']>;
  challenge_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscussionRepliesArgs = {
  parent_id?: InputMaybe<Scalars['String']['input']>;
  post_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMilestoneProgressArgs = {
  milestone_id?: InputMaybe<Scalars['String']['input']>;
  participant_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMilestonesArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
};


export type QueryProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryProfilesArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTeamArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamMembershipsArgs = {
  team_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTeamsArgs = {
  creator_id?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryWorkoutArgs = {
  id: Scalars['String']['input'];
};


export type QueryWorkoutCommentsArgs = {
  workout_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkoutExercisesArgs = {
  workout_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkoutSessionsArgs = {
  profile_id?: InputMaybe<Scalars['String']['input']>;
  workout_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkoutsArgs = {
  creator_id?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['String']['input']>;
};

export type Team = {
  __typename?: 'Team';
  access_code?: Maybe<Scalars['String']['output']>;
  avatar_url?: Maybe<Scalars['String']['output']>;
  challenge_entries?: Maybe<Array<ChallengeParticipant>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  creator?: Maybe<Profile>;
  creator_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expires_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_public?: Maybe<Scalars['Boolean']['output']>;
  max_members?: Maybe<Scalars['Int']['output']>;
  member_count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sports_types?: Maybe<Array<Scalars['String']['output']>>;
  team_memberships?: Maybe<Array<TeamMembership>>;
  workouts?: Maybe<Array<Workout>>;
};

export type TeamMembership = {
  __typename?: 'TeamMembership';
  expires_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  joined_at?: Maybe<Scalars['Date']['output']>;
  role?: Maybe<TeamRole>;
  team?: Maybe<Team>;
  team_id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Profile>;
  user_id?: Maybe<Scalars['String']['output']>;
};

export type TeamRole =
  | 'ADMIN'
  | 'MEMBER';

export type Workout = {
  __typename?: 'Workout';
  ai_model?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<WorkoutComment>>;
  created_at?: Maybe<Scalars['Date']['output']>;
  creator?: Maybe<Profile>;
  creator_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  exercises?: Maybe<Array<WorkoutExercise>>;
  generated_by_ai?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_team_workout?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sessions?: Maybe<Array<WorkoutSession>>;
  team?: Maybe<Team>;
  team_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
};

export type WorkoutComment = {
  __typename?: 'WorkoutComment';
  author?: Maybe<Profile>;
  author_id?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  workout?: Maybe<Workout>;
  workout_id?: Maybe<Scalars['String']['output']>;
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  activity_type?: Maybe<ActivityType>;
  activity_type_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  order_index?: Maybe<Scalars['Int']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rest_time?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
  workout?: Maybe<Workout>;
  workout_id?: Maybe<Scalars['String']['output']>;
};

export type WorkoutSession = {
  __typename?: 'WorkoutSession';
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  logged_activities?: Maybe<Array<Activity>>;
  notes?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['String']['output']>;
  session_date?: Maybe<Scalars['Date']['output']>;
  workout?: Maybe<Workout>;
  workout_id?: Maybe<Scalars['String']['output']>;
};

export type CreateChallengeMutationVariables = Exact<{
  creator_id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  challenge_type?: InputMaybe<Scalars['String']['input']>;
  max_participants?: InputMaybe<Scalars['Int']['input']>;
  start_date: Scalars['Date']['input'];
  end_date: Scalars['Date']['input'];
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  access_code?: InputMaybe<Scalars['String']['input']>;
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  max_team_size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateChallengeMutation = { __typename?: 'Mutation', createChallenge?: { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null } | null };

export type UpdateChallengeMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  max_participants?: InputMaybe<Scalars['Int']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  access_code?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  max_team_size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateChallengeMutation = { __typename?: 'Mutation', updateChallenge?: { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null } | null };

export type DeleteChallengeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteChallengeMutation = { __typename?: 'Mutation', deleteChallenge?: { __typename?: 'Challenge', id?: string | null } | null };

export type UpdateChallengeStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateChallengeStatusMutation = { __typename?: 'Mutation', updateChallenge?: { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null } | null };

export type JoinChallengeMutationVariables = Exact<{
  challenge_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type JoinChallengeMutation = { __typename?: 'Mutation', createChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type JoinChallengeAsTeamMutationVariables = Exact<{
  challenge_id: Scalars['String']['input'];
  team_id: Scalars['String']['input'];
}>;


export type JoinChallengeAsTeamMutation = { __typename?: 'Mutation', createChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type LeaveChallengeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type LeaveChallengeMutation = { __typename?: 'Mutation', deleteChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null } | null };

export type RemoveChallengeParticipantMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveChallengeParticipantMutation = { __typename?: 'Mutation', deleteChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null } | null };

export type CreateMilestoneMutationVariables = Exact<{
  challenge_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  target_value: Scalars['Float']['input'];
  activity_type_id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
}>;


export type CreateMilestoneMutation = { __typename?: 'Mutation', createMilestone?: { __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null } | null };

export type AddChallengeActivityTypeMutationVariables = Exact<{
  challenge_id: Scalars['String']['input'];
  activity_type_id: Scalars['String']['input'];
}>;


export type AddChallengeActivityTypeMutation = { __typename?: 'Mutation', createChallengeActivityType?: { __typename?: 'ChallengeActivityType', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null } | null } | null };

export type ChallengeCreatorFragment = { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null };

export type ChallengeMilestoneFragment = { __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null };

export type ChallengeActivityTypeFragment = { __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null };

export type ChallengeParticipantDetailsFragment = { __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null };

export type ChallengeBasicFragment = { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null };

export type ChallengeFullFragment = { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null };

export type GetChallengesQueryVariables = Exact<{
  creator_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  challenge_type?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetChallengesQuery = { __typename?: 'Query', challenges?: Array<{ __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null }> | null };

export type GetChallengeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetChallengeQuery = { __typename?: 'Query', challenge?: { __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, participants?: Array<{ __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null } | null };

export type GetMyChallengesQueryVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type GetMyChallengesQuery = { __typename?: 'Query', challenges?: Array<{ __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null }> | null };

export type GetPublicChallengesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicChallengesQuery = { __typename?: 'Query', challenges?: Array<{ __typename?: 'Challenge', id?: string | null, title?: string | null, description?: string | null, instructions?: string | null, image_url?: string | null, challenge_type?: ChallengeParticipantType | null, max_participants?: number | null, participant_count?: number | null, max_team_size?: number | null, start_date?: any | null, end_date?: any | null, is_public?: boolean | null, access_code?: string | null, status?: ChallengeStatus | null, created_at?: any | null, expires_at?: any | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, milestones?: Array<{ __typename?: 'Milestone', id?: string | null, name?: string | null, target_value?: number | null, order?: number | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, unit?: string | null, unit_label?: string | null } | null }> | null, supported_activities?: Array<{ __typename?: 'ChallengeActivityType', id?: string | null, activity_type_id?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null }> | null }> | null };

export type GetChallengeParticipantsQueryVariables = Exact<{
  challenge_id: Scalars['String']['input'];
}>;


export type GetChallengeParticipantsQuery = { __typename?: 'Query', challengeParticipants?: Array<{ __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null };

export type GetUserChallengeParticipationQueryVariables = Exact<{
  challenge_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type GetUserChallengeParticipationQuery = { __typename?: 'Query', challengeParticipants?: Array<{ __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: any | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null };

export const ChallengeParticipantDetailsFragmentDoc = gql`
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
export const ChallengeBasicFragmentDoc = gql`
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
export const ChallengeCreatorFragmentDoc = gql`
    fragment ChallengeCreator on Profile {
  id
  username
  avatar_url
}
    `;
export const ChallengeMilestoneFragmentDoc = gql`
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
export const ChallengeActivityTypeFragmentDoc = gql`
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
export const ChallengeFullFragmentDoc = gql`
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
    ${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;
export const CreateChallengeDocument = gql`
    mutation CreateChallenge($creator_id: String!, $title: String!, $description: String, $instructions: String, $image_url: String, $challenge_type: String, $max_participants: Int, $start_date: Date!, $end_date: Date!, $is_public: Boolean, $access_code: String, $expires_at: Date, $max_team_size: Int) {
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
    ${ChallengeFullFragmentDoc}`;
export const UpdateChallengeDocument = gql`
    mutation UpdateChallenge($id: String!, $title: String, $description: String, $instructions: String, $image_url: String, $max_participants: Int, $is_public: Boolean, $access_code: String, $status: String, $max_team_size: Int) {
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
    ${ChallengeFullFragmentDoc}`;
export const DeleteChallengeDocument = gql`
    mutation DeleteChallenge($id: String!) {
  deleteChallenge(id: $id) {
    id
  }
}
    `;
export const UpdateChallengeStatusDocument = gql`
    mutation UpdateChallengeStatus($id: String!, $status: String!) {
  updateChallenge(id: $id, status: $status) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}`;
export const JoinChallengeDocument = gql`
    mutation JoinChallenge($challenge_id: String!, $user_id: String!) {
  createChallengeParticipant(challenge_id: $challenge_id, user_id: $user_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;
export const JoinChallengeAsTeamDocument = gql`
    mutation JoinChallengeAsTeam($challenge_id: String!, $team_id: String!) {
  createChallengeParticipant(challenge_id: $challenge_id, team_id: $team_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;
export const LeaveChallengeDocument = gql`
    mutation LeaveChallenge($id: String!) {
  deleteChallengeParticipant(id: $id) {
    id
  }
}
    `;
export const RemoveChallengeParticipantDocument = gql`
    mutation RemoveChallengeParticipant($id: String!) {
  deleteChallengeParticipant(id: $id) {
    id
  }
}
    `;
export const CreateMilestoneDocument = gql`
    mutation CreateMilestone($challenge_id: String!, $name: String!, $target_value: Float!, $activity_type_id: String!, $order: Int!) {
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
export const AddChallengeActivityTypeDocument = gql`
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
export const GetChallengesDocument = gql`
    query GetChallenges($creator_id: String, $status: String, $is_public: Boolean, $challenge_type: String) {
  challenges(
    creator_id: $creator_id
    status: $status
    is_public: $is_public
    challenge_type: $challenge_type
  ) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}`;
export const GetChallengeDocument = gql`
    query GetChallenge($id: String!) {
  challenge(id: $id) {
    ...ChallengeFull
    participants {
      ...ChallengeParticipantDetails
    }
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeParticipantDetailsFragmentDoc}`;
export const GetMyChallengesDocument = gql`
    query GetMyChallenges($user_id: String!) {
  challenges(creator_id: $user_id) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}`;
export const GetPublicChallengesDocument = gql`
    query GetPublicChallenges {
  challenges(is_public: true, status: "ACTIVE") {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}`;
export const GetChallengeParticipantsDocument = gql`
    query GetChallengeParticipants($challenge_id: String!) {
  challengeParticipants(challenge_id: $challenge_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;
export const GetUserChallengeParticipationDocument = gql`
    query GetUserChallengeParticipation($challenge_id: String!, $user_id: String!) {
  challengeParticipants(challenge_id: $challenge_id, user_id: $user_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateChallenge(variables: CreateChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateChallengeMutation>({ document: CreateChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateChallenge', 'mutation', variables);
    },
    UpdateChallenge(variables: UpdateChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateChallengeMutation>({ document: UpdateChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateChallenge', 'mutation', variables);
    },
    DeleteChallenge(variables: DeleteChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteChallengeMutation>({ document: DeleteChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteChallenge', 'mutation', variables);
    },
    UpdateChallengeStatus(variables: UpdateChallengeStatusMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateChallengeStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateChallengeStatusMutation>({ document: UpdateChallengeStatusDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateChallengeStatus', 'mutation', variables);
    },
    JoinChallenge(variables: JoinChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<JoinChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<JoinChallengeMutation>({ document: JoinChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'JoinChallenge', 'mutation', variables);
    },
    JoinChallengeAsTeam(variables: JoinChallengeAsTeamMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<JoinChallengeAsTeamMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<JoinChallengeAsTeamMutation>({ document: JoinChallengeAsTeamDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'JoinChallengeAsTeam', 'mutation', variables);
    },
    LeaveChallenge(variables: LeaveChallengeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LeaveChallengeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LeaveChallengeMutation>({ document: LeaveChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LeaveChallenge', 'mutation', variables);
    },
    RemoveChallengeParticipant(variables: RemoveChallengeParticipantMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RemoveChallengeParticipantMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveChallengeParticipantMutation>({ document: RemoveChallengeParticipantDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RemoveChallengeParticipant', 'mutation', variables);
    },
    CreateMilestone(variables: CreateMilestoneMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateMilestoneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMilestoneMutation>({ document: CreateMilestoneDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateMilestone', 'mutation', variables);
    },
    AddChallengeActivityType(variables: AddChallengeActivityTypeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AddChallengeActivityTypeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddChallengeActivityTypeMutation>({ document: AddChallengeActivityTypeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AddChallengeActivityType', 'mutation', variables);
    },
    GetChallenges(variables?: GetChallengesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetChallengesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChallengesQuery>({ document: GetChallengesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetChallenges', 'query', variables);
    },
    GetChallenge(variables: GetChallengeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetChallengeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChallengeQuery>({ document: GetChallengeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetChallenge', 'query', variables);
    },
    GetMyChallenges(variables: GetMyChallengesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetMyChallengesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMyChallengesQuery>({ document: GetMyChallengesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetMyChallenges', 'query', variables);
    },
    GetPublicChallenges(variables?: GetPublicChallengesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetPublicChallengesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPublicChallengesQuery>({ document: GetPublicChallengesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetPublicChallenges', 'query', variables);
    },
    GetChallengeParticipants(variables: GetChallengeParticipantsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetChallengeParticipantsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChallengeParticipantsQuery>({ document: GetChallengeParticipantsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetChallengeParticipants', 'query', variables);
    },
    GetUserChallengeParticipation(variables: GetUserChallengeParticipationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUserChallengeParticipationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserChallengeParticipationQuery>({ document: GetUserChallengeParticipationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUserChallengeParticipation', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;