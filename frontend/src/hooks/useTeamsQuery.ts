import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TeamService } from '../services/teamService';
import { queryKeys } from '../lib/queryKeys';

// Teams Query Hook
export const useTeamsQuery = (options?: {
	myTeamsOnly?: boolean;
	page?: number;
	limit?: number;
	search?: string;
	isPublic?: boolean;
	minMembers?: number;
	maxMembers?: number;
	enabled?: boolean;
}) => {
	const { enabled = true, ...queryOptions } = options || {};
	return useQuery({
		queryKey: queryKeys.teams.list(queryOptions),
		queryFn: () => TeamService.getTeams(queryOptions),
		staleTime: 2 * 60 * 1000, // 2 minutes
		gcTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
		refetchOnMount: 'always',
		enabled,
	});
};

// My Teams Query Hook (for user's own teams)
export const useMyTeamsQuery = (userId?: string) => {
	return useQuery({
		queryKey: queryKeys.teams.userTeams(userId || 'current'),
		queryFn: () => TeamService.getMyTeams(),
		staleTime: 5 * 60 * 1000, // 5 minutes - user's teams don't change frequently
		gcTime: 10 * 60 * 1000, // 10 minutes
		refetchOnWindowFocus: false,
	});
};

// Individual Team Query Hook
export const useTeamQuery = (teamId: string) => {
	return useQuery({
		queryKey: queryKeys.teams.detail(teamId),
		queryFn: () => TeamService.getTeamById(teamId),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		enabled: !!teamId,
	});
};

// Team Mutations Hook
export const useTeamMutations = () => {
	const queryClient = useQueryClient();

	const createTeamMutation = useMutation({
		mutationFn: (teamData: any) => TeamService.createTeam(teamData),
		onSuccess: () => {
			// Invalidate team lists and my teams
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams('current') });
		},
	});

	const joinTeamMutation = useMutation({
		mutationFn: (teamId: string) => TeamService.joinTeam(teamId),
		onSuccess: (_data, teamId) => {
			// Invalidate team lists, my teams, and the specific team
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams('current') });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(teamId) });
		},
	});

	const leaveTeamMutation = useMutation({
		mutationFn: (teamId: string) => TeamService.leaveTeam(teamId),
		onSuccess: (_data, teamId) => {
			// Invalidate team lists, my teams, and the specific team
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams('current') });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(teamId) });
		},
	});

	const updateTeamMutation = useMutation({
		mutationFn: ({ teamId, teamData }: { teamId: string; teamData: any }) =>
			TeamService.updateTeam(teamId, teamData),
		onSuccess: (_data, variables) => {
			// Invalidate team lists, my teams, and the specific team
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams('current') });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(variables.teamId) });
		},
	});

	const deleteTeamMutation = useMutation({
		mutationFn: (teamId: string) => TeamService.deleteTeam(teamId),
		onSuccess: () => {
			// Invalidate all team queries since the team is deleted
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
		},
	});

	const joinTeamWithAccessCodeMutation = useMutation({
		mutationFn: ({ teamId, accessCode }: { teamId: string; accessCode: string }) =>
			TeamService.joinTeam(teamId, accessCode),
		onSuccess: (_data, variables) => {
			// Invalidate team lists, my teams, and the specific team
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams('current') });
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(variables.teamId) });
		},
	});

	return {
		createTeam: createTeamMutation,
		joinTeam: joinTeamMutation,
		joinTeamWithAccessCode: joinTeamWithAccessCodeMutation,
		leaveTeam: leaveTeamMutation,
		updateTeam: updateTeamMutation,
		deleteTeam: deleteTeamMutation,
	};
};

// Optimized replacement for the original useTeams hook
export const useTeams = (options?: {
	myTeamsOnly?: boolean;
	page?: number;
	limit?: number;
	search?: string;
	isPublic?: boolean;
	minMembers?: number;
	maxMembers?: number;
}) => {
	const mutations = useTeamMutations();

	// Always call both hooks but conditionally enable them
	const isMyTeamsMode = options?.myTeamsOnly;
	const myTeamsQuery = useMyTeamsQuery();
	const teamsQuery = useTeamsQuery({ ...options, enabled: !isMyTeamsMode });

	if (isMyTeamsMode) {
		const myTeamsData = Array.isArray(myTeamsQuery.data) ? myTeamsQuery.data : [];

		return {
			teams: myTeamsData,
			loading: myTeamsQuery.isLoading,
			error: myTeamsQuery.error?.message || null,
			refetch: myTeamsQuery.refetch,
			createTeam: mutations.createTeam.mutateAsync,
			joinTeam: mutations.joinTeam.mutateAsync,
			leaveTeam: mutations.leaveTeam.mutateAsync,
			updateTeam: (teamId: string, teamData: any) =>
				mutations.updateTeam.mutateAsync({ teamId, teamData }),
			isFetching: myTeamsQuery.isFetching,
			isRefetching: myTeamsQuery.isRefetching,
			// Simplified pagination for myTeams
			totalCount: myTeamsData.length,
			totalPages: 1,
			currentPage: 1,
			itemsPerPage: myTeamsData.length || 12,
		};
	}

	// For regular teams, use the teamsQuery which returns an object with pagination
	const teamsData = teamsQuery.data;

	return {
		teams: Array.isArray(teamsData) ? teamsData : teamsData?.teams || [],
		loading: teamsQuery.isLoading,
		error: teamsQuery.error?.message || null,
		totalCount: teamsData?.totalCount || 0,
		totalPages: teamsData?.totalPages || 0,
		currentPage: teamsData?.currentPage || 1,
		itemsPerPage: teamsData?.itemsPerPage || 12,
		refetch: teamsQuery.refetch,
		createTeam: mutations.createTeam.mutateAsync,
		joinTeam: mutations.joinTeam.mutateAsync,
		leaveTeam: mutations.leaveTeam.mutateAsync,
		updateTeam: (teamId: string, teamData: any) =>
			mutations.updateTeam.mutateAsync({ teamId, teamData }),
		isFetching: teamsQuery.isFetching,
		isRefetching: teamsQuery.isRefetching,
	};
};
