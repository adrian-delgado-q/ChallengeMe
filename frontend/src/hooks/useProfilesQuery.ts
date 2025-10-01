import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '../services/profileService';
import { queryKeys } from '../lib/queryKeys';

// Current User Profile Query Hook
export const useCurrentProfileQuery = () => {
	return useQuery({
		queryKey: queryKeys.profiles.current,
		queryFn: () => ProfileService.getCurrentProfile(),
		staleTime: 5 * 60 * 1000, // 5 minutes - user's own profile
		gcTime: 10 * 60 * 1000, // 10 minutes
		refetchOnWindowFocus: false,
	});
};

// Individual Profile Query Hook
export const useProfileQuery = (profileId: string) => {
	return useQuery({
		queryKey: queryKeys.profiles.detail(profileId),
		queryFn: () => ProfileService.getProfileById(profileId),
		staleTime: 10 * 60 * 1000, // 10 minutes - profiles don't change often
		gcTime: 15 * 60 * 1000, // 15 minutes
		enabled: !!profileId,
		refetchOnWindowFocus: false,
	});
};

// User Stats Query Hook
export const useUserStatsQuery = (userId?: string) => {
	return useQuery({
		queryKey: [...queryKeys.profiles.detail(userId || 'current'), 'stats'],
		queryFn: () => ProfileService.getUserStats(userId),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		refetchOnWindowFocus: false,
	});
};

// Profiles Query Hook (for batch fetching profiles by IDs)
export const useProfilesQuery = (profileIds: string[]) => {
	return useQuery({
		queryKey: queryKeys.profiles.list({ ids: profileIds.sort() }),
		queryFn: async () => {
			// Since ProfileService doesn't have bulk fetch, fetch individually and cache
			const profiles = await Promise.all(profileIds.map(id => ProfileService.getProfileById(id)));
			return profiles;
		},
		staleTime: 10 * 60 * 1000, // 10 minutes - profiles don't change often
		gcTime: 15 * 60 * 1000, // 15 minutes
		enabled: profileIds.length > 0,
		refetchOnWindowFocus: false,
	});
};

// Profile Mutations Hook
export const useProfileMutations = () => {
	const queryClient = useQueryClient();

	const updateProfileMutation = useMutation({
		mutationFn: (profileData: any) => ProfileService.updateProfile(profileData),
		onSuccess: data => {
			// Invalidate current profile and specific profile queries
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.current });
			if (data?.id) {
				queryClient.invalidateQueries({ queryKey: queryKeys.profiles.detail(data.id) });
			}
		},
	});

	const checkUsernameMutation = useMutation({
		mutationFn: (username: string) => ProfileService.checkUsernameAvailability(username),
	});

	return {
		updateProfile: updateProfileMutation,
		checkUsername: checkUsernameMutation,
	};
};

// Optimized replacement for profile-related hooks
export const useProfile = (profileId?: string) => {
	const currentProfileQuery = useCurrentProfileQuery();
	const specificProfileQuery = useProfileQuery(profileId || '');
	const userStatsQuery = useUserStatsQuery(profileId);
	const mutations = useProfileMutations();

	// If no profileId is provided, return current user's profile
	const activeQuery = profileId ? specificProfileQuery : currentProfileQuery;

	return {
		profile: activeQuery.data || null,
		loading: activeQuery.isLoading,
		error: activeQuery.error?.message || null,
		refetch: activeQuery.refetch,
		isFetching: activeQuery.isFetching,
		isRefetching: activeQuery.isRefetching,
		// User stats
		stats: userStatsQuery.data || null,
		statsLoading: userStatsQuery.isLoading,
		statsError: userStatsQuery.error?.message || null,
		// Mutations
		updateProfile: mutations.updateProfile.mutateAsync,
		checkUsername: mutations.checkUsername.mutateAsync,
	};
};
