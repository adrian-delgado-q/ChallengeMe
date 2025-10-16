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
export type ProfileBasicFragment = { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null, created_at?: string | null, updated_at?: string | null };

export type GetProfileQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null, created_at?: string | null, updated_at?: string | null } | null };

export type GetProfilesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProfilesQuery = { __typename?: 'Query', profiles?: Array<{ __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null, created_at?: string | null, updated_at?: string | null }> | null };

export type UpdateProfileMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  username?: Types.InputMaybe<Types.Scalars['String']['input']>;
  avatar_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null, created_at?: string | null, updated_at?: string | null } | null };


export const ProfileBasicFragmentDoc = `
    fragment ProfileBasic on Profile {
  id
  username
  avatar_url
  created_at
  updated_at
}
    `;
export const GetProfileDocument = `
    query GetProfile($id: String!) {
  profile(id: $id) {
    ...ProfileBasic
  }
}
    ${ProfileBasicFragmentDoc}`;

export const useGetProfileQuery = <
      TData = GetProfileQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProfileQueryVariables,
      options?: Omit<UseQueryOptions<GetProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProfileQuery, TError, TData>(
      {
    queryKey: ['GetProfile', variables],
    queryFn: fetcher<GetProfileQuery, GetProfileQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProfileDocument, variables),
    ...options
  }
    )};

export const GetProfilesDocument = `
    query GetProfiles {
  profiles {
    ...ProfileBasic
  }
}
    ${ProfileBasicFragmentDoc}`;

export const useGetProfilesQuery = <
      TData = GetProfilesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetProfilesQueryVariables,
      options?: Omit<UseQueryOptions<GetProfilesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProfilesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProfilesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetProfiles'] : ['GetProfiles', variables],
    queryFn: fetcher<GetProfilesQuery, GetProfilesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProfilesDocument, variables),
    ...options
  }
    )};

export const UpdateProfileDocument = `
    mutation UpdateProfile($id: String!, $username: String, $avatar_url: String) {
  updateProfile(id: $id, username: $username, avatar_url: $avatar_url) {
    ...ProfileBasic
  }
}
    ${ProfileBasicFragmentDoc}`;

export const useUpdateProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateProfileMutation, TError, UpdateProfileMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProfile'],
    mutationFn: (variables?: UpdateProfileMutationVariables) => fetcher<UpdateProfileMutation, UpdateProfileMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateProfileDocument, variables)(),
    ...options
  }
    )};
