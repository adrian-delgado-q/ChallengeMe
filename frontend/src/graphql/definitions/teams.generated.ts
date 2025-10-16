// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
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
  }
}
export type TeamCreatorFragment = { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null };

export type TeamMemberFragment = { __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null };

export type TeamBasicFragment = { __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null };

export type TeamFullFragment = { __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null };

export type GetTeamsQueryVariables = Types.Exact<{
  creator_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type GetTeamsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null }> | null };

export type GetTeamQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null } | null };

export type GetMyTeamsQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String']['input'];
}>;


export type GetMyTeamsQuery = { __typename?: 'Query', teams?: Array<{ __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null }> | null };

export type CreateTeamMutationVariables = Types.Exact<{
  creator_id: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  avatar_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  access_code?: Types.InputMaybe<Types.Scalars['String']['input']>;
  max_members?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sports_types?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null } | null };

export type UpdateTeamMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  avatar_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  access_code?: Types.InputMaybe<Types.Scalars['String']['input']>;
  max_members?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sports_types?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam?: { __typename?: 'Team', id?: string | null, name?: string | null, description?: string | null, avatar_url?: string | null, is_public?: boolean | null, access_code?: string | null, member_count?: number | null, max_members?: number | null, sports_types?: Array<string> | null, created_at?: string | null, expires_at?: string | null, creator?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, team_memberships?: Array<{ __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null } | null };

export type DeleteTeamMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam?: { __typename?: 'Team', id?: string | null } | null };

export type AddTeamMemberMutationVariables = Types.Exact<{
  team_id: Types.Scalars['String']['input'];
  user_id: Types.Scalars['String']['input'];
  role?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AddTeamMemberMutation = { __typename?: 'Mutation', createTeamMembership?: { __typename?: 'TeamMembership', id?: string | null, user_id?: string | null, role?: Types.TeamRole | null, joined_at?: string | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type RemoveTeamMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RemoveTeamMemberMutation = { __typename?: 'Mutation', deleteTeamMembership?: { __typename?: 'TeamMembership', id?: string | null } | null };


export const TeamBasicFragmentDoc = `
    fragment TeamBasic on Team {
  id
  name
  description
  avatar_url
  is_public
  access_code
  member_count
  max_members
  sports_types
  created_at
  expires_at
}
    `;
export const TeamCreatorFragmentDoc = `
    fragment TeamCreator on Profile {
  id
  username
  avatar_url
}
    `;
export const TeamMemberFragmentDoc = `
    fragment TeamMember on TeamMembership {
  id
  user_id
  role
  joined_at
  user {
    id
    username
    avatar_url
  }
}
    `;
export const TeamFullFragmentDoc = `
    fragment TeamFull on Team {
  ...TeamBasic
  creator {
    ...TeamCreator
  }
  team_memberships {
    ...TeamMember
  }
}
    `;
export const GetTeamsDocument = `
    query GetTeams($creator_id: String, $is_public: Boolean) {
  teams(creator_id: $creator_id, is_public: $is_public) {
    ...TeamFull
  }
}
    ${TeamFullFragmentDoc}
${TeamBasicFragmentDoc}
${TeamCreatorFragmentDoc}
${TeamMemberFragmentDoc}`;

export const useGetTeamsQuery = <
      TData = GetTeamsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetTeamsQueryVariables,
      options?: Omit<UseQueryOptions<GetTeamsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTeamsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTeamsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTeams'] : ['GetTeams', variables],
    queryFn: fetcher<GetTeamsQuery, GetTeamsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetTeamsDocument, variables),
    ...options
  }
    )};

export const GetTeamDocument = `
    query GetTeam($id: String!) {
  team(id: $id) {
    ...TeamFull
  }
}
    ${TeamFullFragmentDoc}
${TeamBasicFragmentDoc}
${TeamCreatorFragmentDoc}
${TeamMemberFragmentDoc}`;

export const useGetTeamQuery = <
      TData = GetTeamQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetTeamQueryVariables,
      options?: Omit<UseQueryOptions<GetTeamQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTeamQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTeamQuery, TError, TData>(
      {
    queryKey: ['GetTeam', variables],
    queryFn: fetcher<GetTeamQuery, GetTeamQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetTeamDocument, variables),
    ...options
  }
    )};

export const GetMyTeamsDocument = `
    query GetMyTeams($user_id: String!) {
  teams(creator_id: $user_id) {
    ...TeamFull
  }
}
    ${TeamFullFragmentDoc}
${TeamBasicFragmentDoc}
${TeamCreatorFragmentDoc}
${TeamMemberFragmentDoc}`;

export const useGetMyTeamsQuery = <
      TData = GetMyTeamsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetMyTeamsQueryVariables,
      options?: Omit<UseQueryOptions<GetMyTeamsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMyTeamsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMyTeamsQuery, TError, TData>(
      {
    queryKey: ['GetMyTeams', variables],
    queryFn: fetcher<GetMyTeamsQuery, GetMyTeamsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMyTeamsDocument, variables),
    ...options
  }
    )};

export const CreateTeamDocument = `
    mutation CreateTeam($creator_id: String!, $name: String!, $description: String, $avatar_url: String, $is_public: Boolean, $access_code: String, $max_members: Int, $sports_types: [String!]) {
  createTeam(
    creator_id: $creator_id
    name: $name
    description: $description
    avatar_url: $avatar_url
    is_public: $is_public
    access_code: $access_code
    max_members: $max_members
    sports_types: $sports_types
  ) {
    ...TeamFull
  }
}
    ${TeamFullFragmentDoc}
${TeamBasicFragmentDoc}
${TeamCreatorFragmentDoc}
${TeamMemberFragmentDoc}`;

export const useCreateTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateTeamMutation, TError, CreateTeamMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateTeamMutation, TError, CreateTeamMutationVariables, TContext>(
      {
    mutationKey: ['CreateTeam'],
    mutationFn: (variables?: CreateTeamMutationVariables) => fetcher<CreateTeamMutation, CreateTeamMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateTeamDocument, variables)(),
    ...options
  }
    )};

export const UpdateTeamDocument = `
    mutation UpdateTeam($id: String!, $name: String, $description: String, $avatar_url: String, $is_public: Boolean, $access_code: String, $max_members: Int, $sports_types: [String!]) {
  updateTeam(
    id: $id
    name: $name
    description: $description
    avatar_url: $avatar_url
    is_public: $is_public
    access_code: $access_code
    max_members: $max_members
    sports_types: $sports_types
  ) {
    ...TeamFull
  }
}
    ${TeamFullFragmentDoc}
${TeamBasicFragmentDoc}
${TeamCreatorFragmentDoc}
${TeamMemberFragmentDoc}`;

export const useUpdateTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateTeamMutation, TError, UpdateTeamMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateTeamMutation, TError, UpdateTeamMutationVariables, TContext>(
      {
    mutationKey: ['UpdateTeam'],
    mutationFn: (variables?: UpdateTeamMutationVariables) => fetcher<UpdateTeamMutation, UpdateTeamMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateTeamDocument, variables)(),
    ...options
  }
    )};

export const DeleteTeamDocument = `
    mutation DeleteTeam($id: String!) {
  deleteTeam(id: $id) {
    id
  }
}
    `;

export const useDeleteTeamMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteTeamMutation, TError, DeleteTeamMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteTeamMutation, TError, DeleteTeamMutationVariables, TContext>(
      {
    mutationKey: ['DeleteTeam'],
    mutationFn: (variables?: DeleteTeamMutationVariables) => fetcher<DeleteTeamMutation, DeleteTeamMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteTeamDocument, variables)(),
    ...options
  }
    )};

export const AddTeamMemberDocument = `
    mutation AddTeamMember($team_id: String!, $user_id: String!, $role: String) {
  createTeamMembership(team_id: $team_id, user_id: $user_id, role: $role) {
    ...TeamMember
  }
}
    ${TeamMemberFragmentDoc}`;

export const useAddTeamMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddTeamMemberMutation, TError, AddTeamMemberMutationVariables, TContext>
    ) => {
    
    return useMutation<AddTeamMemberMutation, TError, AddTeamMemberMutationVariables, TContext>(
      {
    mutationKey: ['AddTeamMember'],
    mutationFn: (variables?: AddTeamMemberMutationVariables) => fetcher<AddTeamMemberMutation, AddTeamMemberMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddTeamMemberDocument, variables)(),
    ...options
  }
    )};

export const RemoveTeamMemberDocument = `
    mutation RemoveTeamMember($id: String!) {
  deleteTeamMembership(id: $id) {
    id
  }
}
    `;

export const useRemoveTeamMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveTeamMemberMutation, TError, RemoveTeamMemberMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveTeamMemberMutation, TError, RemoveTeamMemberMutationVariables, TContext>(
      {
    mutationKey: ['RemoveTeamMember'],
    mutationFn: (variables?: RemoveTeamMemberMutationVariables) => fetcher<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveTeamMemberDocument, variables)(),
    ...options
  }
    )};
