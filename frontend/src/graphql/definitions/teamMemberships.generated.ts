// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import {
	useQuery,
	useMutation,
	type UseQueryOptions,
	type UseMutationOptions,
} from '@tanstack/react-query';

function fetcher<TData, TVariables>(
	endpoint: string,
	requestInit: RequestInit,
	query: string,
	variables?: TVariables
) {
	return async (): Promise<TData> => {
		const res = await fetch(endpoint, {
			method: 'POST',
			...requestInit,
			body: JSON.stringify({ query, variables }),
		});

		const json = await res.json();

		if (json.errors) {
			const { message } = json.errors[0];

			throw new Error(message);
		}

		return json.data;
	};
}
export type TeamMembershipDetailsFragment = {
	__typename?: 'TeamMembership';
	id?: string | null;
	team_id?: string | null;
	user_id?: string | null;
	role?: Types.TeamRole | null;
	joined_at?: string | null;
	expires_at?: string | null;
	team?: { __typename?: 'Team'; id?: string | null; name?: string | null } | null;
	user?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
};

export type GetTeamMembershipsQueryVariables = Types.Exact<{
	team_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
	user_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetTeamMembershipsQuery = {
	__typename?: 'Query';
	teamMemberships?: Array<{
		__typename?: 'TeamMembership';
		id?: string | null;
		team_id?: string | null;
		user_id?: string | null;
		role?: Types.TeamRole | null;
		joined_at?: string | null;
		expires_at?: string | null;
		team?: { __typename?: 'Team'; id?: string | null; name?: string | null } | null;
		user?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
	}> | null;
};

export type CreateTeamMembershipMutationVariables = Types.Exact<{
	team_id: Types.Scalars['String']['input'];
	user_id: Types.Scalars['String']['input'];
	role?: Types.InputMaybe<Types.Scalars['String']['input']>;
	expires_at?: Types.InputMaybe<Types.Scalars['Date']['input']>;
}>;

export type CreateTeamMembershipMutation = {
	__typename?: 'Mutation';
	createTeamMembership?: {
		__typename?: 'TeamMembership';
		id?: string | null;
		team_id?: string | null;
		user_id?: string | null;
		role?: Types.TeamRole | null;
		joined_at?: string | null;
		expires_at?: string | null;
		team?: { __typename?: 'Team'; id?: string | null; name?: string | null } | null;
		user?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
	} | null;
};

export type UpdateTeamMembershipMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	role?: Types.InputMaybe<Types.Scalars['String']['input']>;
	expires_at?: Types.InputMaybe<Types.Scalars['Date']['input']>;
}>;

export type UpdateTeamMembershipMutation = {
	__typename?: 'Mutation';
	updateTeamMembership?: {
		__typename?: 'TeamMembership';
		id?: string | null;
		team_id?: string | null;
		user_id?: string | null;
		role?: Types.TeamRole | null;
		joined_at?: string | null;
		expires_at?: string | null;
		team?: { __typename?: 'Team'; id?: string | null; name?: string | null } | null;
		user?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
	} | null;
};

export type DeleteTeamMembershipMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteTeamMembershipMutation = {
	__typename?: 'Mutation';
	deleteTeamMembership?: { __typename?: 'TeamMembership'; id?: string | null } | null;
};

export const TeamMembershipDetailsFragmentDoc = `
    fragment TeamMembershipDetails on TeamMembership {
  id
  team_id
  user_id
  role
  joined_at
  expires_at
  team {
    id
    name
  }
  user {
    id
    username
  }
}
    `;
export const GetTeamMembershipsDocument = `
    query GetTeamMemberships($team_id: String, $user_id: String) {
  teamMemberships(team_id: $team_id, user_id: $user_id) {
    ...TeamMembershipDetails
  }
}
    ${TeamMembershipDetailsFragmentDoc}`;

export const useGetTeamMembershipsQuery = <TData = GetTeamMembershipsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetTeamMembershipsQueryVariables,
	options?: Omit<UseQueryOptions<GetTeamMembershipsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetTeamMembershipsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetTeamMembershipsQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetTeamMemberships'] : ['GetTeamMemberships', variables],
		queryFn: fetcher<GetTeamMembershipsQuery, GetTeamMembershipsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetTeamMembershipsDocument,
			variables
		),
		...options,
	});
};

export const CreateTeamMembershipDocument = `
    mutation CreateTeamMembership($team_id: String!, $user_id: String!, $role: String, $expires_at: Date) {
  createTeamMembership(
    team_id: $team_id
    user_id: $user_id
    role: $role
    expires_at: $expires_at
  ) {
    ...TeamMembershipDetails
  }
}
    ${TeamMembershipDetailsFragmentDoc}`;

export const useCreateTeamMembershipMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateTeamMembershipMutation,
		TError,
		CreateTeamMembershipMutationVariables,
		TContext
	>
) => {
	return useMutation<
		CreateTeamMembershipMutation,
		TError,
		CreateTeamMembershipMutationVariables,
		TContext
	>({
		mutationKey: ['CreateTeamMembership'],
		mutationFn: (variables?: CreateTeamMembershipMutationVariables) =>
			fetcher<CreateTeamMembershipMutation, CreateTeamMembershipMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateTeamMembershipDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateTeamMembershipDocument = `
    mutation UpdateTeamMembership($id: String!, $role: String, $expires_at: Date) {
  updateTeamMembership(id: $id, role: $role, expires_at: $expires_at) {
    ...TeamMembershipDetails
  }
}
    ${TeamMembershipDetailsFragmentDoc}`;

export const useUpdateTeamMembershipMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateTeamMembershipMutation,
		TError,
		UpdateTeamMembershipMutationVariables,
		TContext
	>
) => {
	return useMutation<
		UpdateTeamMembershipMutation,
		TError,
		UpdateTeamMembershipMutationVariables,
		TContext
	>({
		mutationKey: ['UpdateTeamMembership'],
		mutationFn: (variables?: UpdateTeamMembershipMutationVariables) =>
			fetcher<UpdateTeamMembershipMutation, UpdateTeamMembershipMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateTeamMembershipDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteTeamMembershipDocument = `
    mutation DeleteTeamMembership($id: String!) {
  deleteTeamMembership(id: $id) {
    id
  }
}
    `;

export const useDeleteTeamMembershipMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteTeamMembershipMutation,
		TError,
		DeleteTeamMembershipMutationVariables,
		TContext
	>
) => {
	return useMutation<
		DeleteTeamMembershipMutation,
		TError,
		DeleteTeamMembershipMutationVariables,
		TContext
	>({
		mutationKey: ['DeleteTeamMembership'],
		mutationFn: (variables?: DeleteTeamMembershipMutationVariables) =>
			fetcher<DeleteTeamMembershipMutation, DeleteTeamMembershipMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteTeamMembershipDocument,
				variables
			)(),
		...options,
	});
};
