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
export type DiscussionBanDetailsFragment = { __typename?: 'DiscussionBan', id?: string | null, challenge_id?: string | null, user_id?: string | null, reason?: string | null, banned_at?: string | null, expires_at?: string | null, banned_by_id?: string | null, is_active?: boolean | null };

export type GetDiscussionBansQueryVariables = Types.Exact<{
  challenge_id: Types.Scalars['String']['input'];
}>;


export type GetDiscussionBansQuery = { __typename?: 'Query', discussionBans?: Array<{ __typename?: 'DiscussionBan', id?: string | null, challenge_id?: string | null, user_id?: string | null, reason?: string | null, banned_at?: string | null, expires_at?: string | null, banned_by_id?: string | null, is_active?: boolean | null }> | null };

export type BanFromDiscussionMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['String']['input'];
  user_id: Types.Scalars['String']['input'];
  banned_by_id: Types.Scalars['String']['input'];
  reason?: Types.InputMaybe<Types.Scalars['String']['input']>;
  expires_at?: Types.InputMaybe<Types.Scalars['Date']['input']>;
}>;


export type BanFromDiscussionMutation = { __typename?: 'Mutation', banFromDiscussion?: { __typename?: 'DiscussionBan', id?: string | null, challenge_id?: string | null, user_id?: string | null, reason?: string | null, banned_at?: string | null, expires_at?: string | null, banned_by_id?: string | null, is_active?: boolean | null } | null };

export type UnbanFromDiscussionMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type UnbanFromDiscussionMutation = { __typename?: 'Mutation', unbanFromDiscussion?: { __typename?: 'DiscussionBan', id?: string | null, challenge_id?: string | null, user_id?: string | null, reason?: string | null, banned_at?: string | null, expires_at?: string | null, banned_by_id?: string | null, is_active?: boolean | null } | null };


export const DiscussionBanDetailsFragmentDoc = `
    fragment DiscussionBanDetails on DiscussionBan {
  id
  challenge_id
  user_id
  reason
  banned_at
  expires_at
  banned_by_id
  is_active
}
    `;
export const GetDiscussionBansDocument = `
    query GetDiscussionBans($challenge_id: String!) {
  discussionBans(challenge_id: $challenge_id) {
    ...DiscussionBanDetails
  }
}
    ${DiscussionBanDetailsFragmentDoc}`;

export const useGetDiscussionBansQuery = <
      TData = GetDiscussionBansQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetDiscussionBansQueryVariables,
      options?: Omit<UseQueryOptions<GetDiscussionBansQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetDiscussionBansQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetDiscussionBansQuery, TError, TData>(
      {
    queryKey: ['GetDiscussionBans', variables],
    queryFn: fetcher<GetDiscussionBansQuery, GetDiscussionBansQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetDiscussionBansDocument, variables),
    ...options
  }
    )};

export const BanFromDiscussionDocument = `
    mutation BanFromDiscussion($challenge_id: String!, $user_id: String!, $banned_by_id: String!, $reason: String, $expires_at: Date) {
  banFromDiscussion(
    challenge_id: $challenge_id
    user_id: $user_id
    banned_by_id: $banned_by_id
    reason: $reason
    expires_at: $expires_at
  ) {
    ...DiscussionBanDetails
  }
}
    ${DiscussionBanDetailsFragmentDoc}`;

export const useBanFromDiscussionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<BanFromDiscussionMutation, TError, BanFromDiscussionMutationVariables, TContext>
    ) => {
    
    return useMutation<BanFromDiscussionMutation, TError, BanFromDiscussionMutationVariables, TContext>(
      {
    mutationKey: ['BanFromDiscussion'],
    mutationFn: (variables?: BanFromDiscussionMutationVariables) => fetcher<BanFromDiscussionMutation, BanFromDiscussionMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, BanFromDiscussionDocument, variables)(),
    ...options
  }
    )};

export const UnbanFromDiscussionDocument = `
    mutation UnbanFromDiscussion($id: String!) {
  unbanFromDiscussion(id: $id) {
    ...DiscussionBanDetails
  }
}
    ${DiscussionBanDetailsFragmentDoc}`;

export const useUnbanFromDiscussionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UnbanFromDiscussionMutation, TError, UnbanFromDiscussionMutationVariables, TContext>
    ) => {
    
    return useMutation<UnbanFromDiscussionMutation, TError, UnbanFromDiscussionMutationVariables, TContext>(
      {
    mutationKey: ['UnbanFromDiscussion'],
    mutationFn: (variables?: UnbanFromDiscussionMutationVariables) => fetcher<UnbanFromDiscussionMutation, UnbanFromDiscussionMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UnbanFromDiscussionDocument, variables)(),
    ...options
  }
    )};
