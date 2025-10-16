import { builder } from '../schema-builder';

// Import all GraphQL types
import './enums'
import './types/Profile';
import './types/Team';
import './types/TeamMembership';
import './types/Challenge';
import './types/ChallengeParticipant';
import './types/Activity';
import './types/ActivityType';
import './types/ChallengeActivityType';
import './types/Post';
import './types/Comment';
import './types/Milestone';
import './types/MilestoneProgress';
import './types/DiscussionPost';
import './types/DiscussionReply';
import './types/DiscussionModerator';
import './types/DiscussionBan';
import './types/Workout';
import './types/WorkoutExercise';
import './types/WorkoutSession';
import './types/WorkoutComment';
import './types/XPLog';
import './types/ActivityMastery';
import './types/Badge';
import './types/EarnedBadge';

export const schema = builder.toSchema();
