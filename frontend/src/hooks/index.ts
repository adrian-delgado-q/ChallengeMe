// Centralized exports for all React Query hooks
// This makes it easy for components to import everything they need in one place

// Challenge hooks
export {
	useChallengesQuery,
	useChallengeQuery,
	useChallengeProgressQuery,
	useMyCreatedChallengesQuery,
	useMyChallengesQuery,
	useChallengeAnalyticsQuery,
	useMyParticipationQuery,
	useChallengeParticipantsQuery,
	useChallengeMutations,
	useChallengeActions as useChallengeActionsQuery,
	useChallenges, // Legacy compatibility wrapper
} from './useChallengesQuery';

// Activity hooks
export {
	useActivitiesForChallengeQuery,
	useRecentActivitiesQuery,
	useUserActivitiesQuery,
	useLeaderboardActivitiesQuery,
	useManagementActivitiesQuery,
	useActivityMutations,
	useActivities, // Legacy compatibility wrapper
} from './useActivitiesQuery';

// Team hooks
export {
	useTeamsQuery,
	useMyTeamsQuery,
	useTeamQuery,
	useTeamMutations,
	useTeams, // Legacy compatibility wrapper
} from './useTeamsQuery';

// Profile hooks
export {
	useCurrentProfileQuery,
	useProfileQuery,
	useUserStatsQuery,
	useProfilesQuery,
	useProfileMutations,
	useProfile, // Legacy compatibility wrapper
} from './useProfilesQuery';

// Activity Type hooks
export {
	useActivityTypesQuery,
	useActivityTypesByIdsQuery,
	useActivityTypesForChallengeQuery,
} from './useActivityTypesQuery';

// File Upload hooks
export { useFileUpload, useImageUpload } from './useFileUpload';

// Query keys for manual cache management
export { queryKeys } from '../lib/queryKeys';

// Legacy compatibility - gradually phase these out
export { useAsyncState } from './useAsyncState';
export { useAuth } from './useAuth';
export { useUser } from './useUser';

// Legacy data hooks have been migrated to React Query hooks above
