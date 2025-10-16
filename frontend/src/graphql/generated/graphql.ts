export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  JSON: { input: any; output: any; }
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

export type ActivityMastery = {
  __typename?: 'ActivityMastery';
  activity_type?: Maybe<ActivityType>;
  activity_type_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mastery_tier?: Maybe<MasteryTier>;
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['String']['output']>;
  total_value?: Maybe<Scalars['Float']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
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

export type Badge = {
  __typename?: 'Badge';
  category?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  earned_by?: Maybe<Array<EarnedBadge>>;
  icon_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  xp_bonus?: Maybe<Scalars['Int']['output']>;
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

export type EarnedBadge = {
  __typename?: 'EarnedBadge';
  badge?: Maybe<Badge>;
  badge_id?: Maybe<Scalars['String']['output']>;
  earned_at?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['String']['output']>;
};

export type MasteryTier =
  | 'ADEPT'
  | 'EXPERT'
  | 'GRANDMASTER'
  | 'MASTER'
  | 'NOVICE';

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
  addDiscussionModerator?: Maybe<DiscussionModerator>;
  addExerciseToWorkout?: Maybe<WorkoutExercise>;
  banFromDiscussion?: Maybe<DiscussionBan>;
  completeWorkoutSession?: Maybe<WorkoutSession>;
  createActivity?: Maybe<Activity>;
  createActivityType?: Maybe<ActivityType>;
  createBadge?: Maybe<Badge>;
  createChallenge?: Maybe<Challenge>;
  createChallengeActivityType?: Maybe<ChallengeActivityType>;
  createChallengeParticipant?: Maybe<ChallengeParticipant>;
  createComment?: Maybe<Comment>;
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
  deleteBadge?: Maybe<Badge>;
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
  logWorkoutActivity?: Maybe<Activity>;
  removeDiscussionModerator?: Maybe<DiscussionModerator>;
  removeExerciseFromWorkout?: Maybe<WorkoutExercise>;
  startWorkoutSession?: Maybe<WorkoutSession>;
  unbanFromDiscussion?: Maybe<DiscussionBan>;
  updateActivity?: Maybe<Activity>;
  updateActivityType?: Maybe<ActivityType>;
  updateBadge?: Maybe<Badge>;
  updateChallenge?: Maybe<Challenge>;
  updateComment?: Maybe<Comment>;
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


export type MutationAddDiscussionModeratorArgs = {
  challenge_id: Scalars['String']['input'];
  granted_by_id: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};


export type MutationAddExerciseToWorkoutArgs = {
  activity_type_id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  order_index: Scalars['Int']['input'];
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest_time?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
  workout_id: Scalars['String']['input'];
};


export type MutationBanFromDiscussionArgs = {
  banned_by_id: Scalars['String']['input'];
  challenge_id: Scalars['String']['input'];
  expires_at?: InputMaybe<Scalars['Date']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};


export type MutationCompleteWorkoutSessionArgs = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
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


export type MutationCreateBadgeArgs = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  icon_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  xp_bonus?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationDeleteBadgeArgs = {
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


export type MutationLogWorkoutActivityArgs = {
  activity_type_id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  session_id: Scalars['String']['input'];
  value: Scalars['Float']['input'];
};


export type MutationRemoveDiscussionModeratorArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveExerciseFromWorkoutArgs = {
  id: Scalars['String']['input'];
};


export type MutationStartWorkoutSessionArgs = {
  profile_id: Scalars['String']['input'];
  session_date?: InputMaybe<Scalars['Date']['input']>;
  workout_id: Scalars['String']['input'];
};


export type MutationUnbanFromDiscussionArgs = {
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


export type MutationUpdateBadgeArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon_url?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  xp_bonus?: InputMaybe<Scalars['Int']['input']>;
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
  active_title?: InputMaybe<Scalars['String']['input']>;
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
  active_title?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  activity_masteries?: Maybe<Array<ActivityMastery>>;
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
  earned_badges?: Maybe<Array<EarnedBadge>>;
  granted_moderators?: Maybe<Array<DiscussionModerator>>;
  id?: Maybe<Scalars['ID']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  moderator_roles?: Maybe<Array<DiscussionModerator>>;
  posts?: Maybe<Array<Post>>;
  team_memberships?: Maybe<Array<TeamMembership>>;
  total_points?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Date']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  workout_comment?: Maybe<Array<WorkoutComment>>;
  workout_sessions?: Maybe<Array<WorkoutSession>>;
  xp?: Maybe<Scalars['Int']['output']>;
  xp_logs?: Maybe<Array<XpLog>>;
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Activity>>;
  activity?: Maybe<Activity>;
  activityMasteries?: Maybe<Array<ActivityMastery>>;
  activityMastery?: Maybe<ActivityMastery>;
  activityType?: Maybe<ActivityType>;
  activityTypes?: Maybe<Array<ActivityType>>;
  badge?: Maybe<Badge>;
  badges?: Maybe<Array<Badge>>;
  challenge?: Maybe<Challenge>;
  challengeActivityTypes?: Maybe<Array<ChallengeActivityType>>;
  challengeParticipants?: Maybe<Array<ChallengeParticipant>>;
  challenges?: Maybe<Array<Challenge>>;
  comments?: Maybe<Array<Comment>>;
  discussionBans?: Maybe<Array<DiscussionBan>>;
  discussionModerators?: Maybe<Array<DiscussionModerator>>;
  discussionPost?: Maybe<DiscussionPost>;
  discussionPosts?: Maybe<Array<DiscussionPost>>;
  discussionReplies?: Maybe<Array<DiscussionReply>>;
  earnedBadges?: Maybe<Array<EarnedBadge>>;
  milestone?: Maybe<Milestone>;
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
  workoutSession?: Maybe<WorkoutSession>;
  workoutSessions?: Maybe<Array<WorkoutSession>>;
  workouts?: Maybe<Array<Workout>>;
  xpLogs?: Maybe<Array<XpLog>>;
};


export type QueryActivitiesArgs = {
  activity_type_id?: InputMaybe<Scalars['String']['input']>;
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  participant_id?: InputMaybe<Scalars['String']['input']>;
  profile_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryActivityArgs = {
  id: Scalars['String']['input'];
};


export type QueryActivityMasteriesArgs = {
  profile_id: Scalars['String']['input'];
};


export type QueryActivityMasteryArgs = {
  activity_type_id: Scalars['String']['input'];
  profile_id: Scalars['String']['input'];
};


export type QueryActivityTypeArgs = {
  id: Scalars['String']['input'];
};


export type QueryActivityTypesArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBadgeArgs = {
  id: Scalars['String']['input'];
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


export type QueryDiscussionPostArgs = {
  id: Scalars['String']['input'];
};


export type QueryDiscussionPostsArgs = {
  author_id?: InputMaybe<Scalars['String']['input']>;
  challenge_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDiscussionRepliesArgs = {
  parent_id?: InputMaybe<Scalars['String']['input']>;
  post_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEarnedBadgesArgs = {
  badge_id?: InputMaybe<Scalars['String']['input']>;
  profile_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMilestoneArgs = {
  id: Scalars['String']['input'];
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


export type QueryPostsArgs = {
  challenge_id?: InputMaybe<Scalars['String']['input']>;
  profile_id?: InputMaybe<Scalars['String']['input']>;
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


export type QueryWorkoutSessionArgs = {
  id: Scalars['String']['input'];
};


export type QueryWorkoutSessionsArgs = {
  profile_id?: InputMaybe<Scalars['String']['input']>;
  workout_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkoutsArgs = {
  creator_id?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryXpLogsArgs = {
  profile_id?: InputMaybe<Scalars['String']['input']>;
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
  ai_raw_response?: Maybe<Scalars['JSON']['output']>;
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

export type XpLog = {
  __typename?: 'XPLog';
  created_at?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['String']['output']>;
  source_id?: Maybe<Scalars['String']['output']>;
  source_type?: Maybe<XpSourceType>;
};

export type XpSourceType =
  | 'ACTIVITY'
  | 'ADMIN_ADJUSTMENT'
  | 'BADGE_REWARD'
  | 'CHALLENGE_COMPLETION'
  | 'COMMENT'
  | 'MILESTONE_COMPLETION'
  | 'POST_CREATION'
  | 'STREAK'
  | 'TEAM_CREATION'
  | 'WORKOUT_SESSION';
