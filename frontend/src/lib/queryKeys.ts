// Query keys factory for consistent cache management
// This centralizes all query keys to prevent duplication and ensure proper invalidation

export const queryKeys = {
	// Challenges
	challenges: {
		all: ['challenges'] as const,
		lists: () => [...queryKeys.challenges.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.challenges.lists(), options] as const,
		details: () => [...queryKeys.challenges.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.challenges.details(), id] as const,
		progress: (id: string) => [...queryKeys.challenges.all, 'progress', id] as const,
		participants: (id: string) => [...queryKeys.challenges.all, 'participants', id] as const,
		userChallenges: (userId: string) => [...queryKeys.challenges.all, 'user', userId] as const,
	},

	// Activities
	activities: {
		all: ['activities'] as const,
		lists: () => [...queryKeys.activities.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.activities.lists(), options] as const,
		details: () => [...queryKeys.activities.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.activities.details(), id] as const,
		userActivities: (userId: string) => [...queryKeys.activities.all, 'user', userId] as const,
		challengeActivities: (challengeId: string) =>
			[...queryKeys.activities.all, 'challenge', challengeId] as const,
	},

	// Activity Types
	activityTypes: {
		all: ['activityTypes'] as const,
		lists: () => [...queryKeys.activityTypes.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.activityTypes.lists(), options] as const,
		details: () => [...queryKeys.activityTypes.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.activityTypes.details(), id] as const,
	},

	// Teams
	teams: {
		all: ['teams'] as const,
		lists: () => [...queryKeys.teams.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.teams.lists(), options] as const,
		details: () => [...queryKeys.teams.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.teams.details(), id] as const,
		members: (id: string) => [...queryKeys.teams.all, 'members', id] as const,
		userTeams: (userId: string) => [...queryKeys.teams.all, 'user', userId] as const,
	},

	// Profiles
	profiles: {
		all: ['profiles'] as const,
		lists: () => [...queryKeys.profiles.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.profiles.lists(), options] as const,
		details: () => [...queryKeys.profiles.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.profiles.details(), id] as const,
		current: ['profiles', 'current'] as const,
	},

	// Discussions
	discussions: {
		all: ['discussions'] as const,
		lists: () => [...queryKeys.discussions.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.discussions.lists(), options] as const,
		details: () => [...queryKeys.discussions.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.discussions.details(), id] as const,
		challengeDiscussions: (challengeId: string) =>
			[...queryKeys.discussions.all, 'challenge', challengeId] as const,
	},

	// Posts
	posts: {
		all: ['posts'] as const,
		lists: () => [...queryKeys.posts.all, 'list'] as const,
		list: (options?: any) => [...queryKeys.posts.lists(), options] as const,
		details: () => [...queryKeys.posts.all, 'detail'] as const,
		detail: (id: string) => [...queryKeys.posts.details(), id] as const,
		discussionPosts: (discussionId: string) =>
			[...queryKeys.posts.all, 'discussion', discussionId] as const,
	},

	// File uploads
	uploads: {
		all: ['uploads'] as const,
		file: (key: string) => [...queryKeys.uploads.all, key] as const,
	},
} as const;
