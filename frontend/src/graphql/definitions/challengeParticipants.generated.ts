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
export type ChallengeParticipantDetailsFragment = { __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: string | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null };

export type GetChallengeParticipantsQueryVariables = Types.Exact<{
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  user_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  team_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetChallengeParticipantsQuery = { __typename?: 'Query', challengeParticipants?: Array<{ __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: string | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null };

export type CreateChallengeParticipantMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['String']['input'];
  user_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  team_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateChallengeParticipantMutation = { __typename?: 'Mutation', createChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null, user_id?: string | null, team_id?: string | null, joined_at?: string | null, team?: { __typename?: 'Team', id?: string | null, name?: string | null, avatar_url?: string | null } | null, user?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type DeleteChallengeParticipantMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteChallengeParticipantMutation = { __typename?: 'Mutation', deleteChallengeParticipant?: { __typename?: 'ChallengeParticipant', id?: string | null } | null };


export const ChallengeParticipantDetailsFragmentDoc = `
    fragment ChallengeParticipantDetails on ChallengeParticipant {
  id
  user_id
  team_id
  joined_at
  team {
    id
    name
    avatar_url
  }
  user {
    id
    username
    avatar_url
  }
}
    `;
export const GetChallengeParticipantsDocument = `
    query GetChallengeParticipants($challenge_id: String, $user_id: String, $team_id: String) {
  challengeParticipants(
    challenge_id: $challenge_id
    user_id: $user_id
    team_id: $team_id
  ) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export const useGetChallengeParticipantsQuery = <
      TData = GetChallengeParticipantsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetChallengeParticipantsQueryVariables,
      options?: Omit<UseQueryOptions<GetChallengeParticipantsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetChallengeParticipantsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetChallengeParticipantsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetChallengeParticipants'] : ['GetChallengeParticipants', variables],
    queryFn: fetcher<GetChallengeParticipantsQuery, GetChallengeParticipantsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetChallengeParticipantsDocument, variables),
    ...options
  }
    )};

export const CreateChallengeParticipantDocument = `
    mutation CreateChallengeParticipant($challenge_id: String!, $user_id: String, $team_id: String) {
  createChallengeParticipant(
    challenge_id: $challenge_id
    user_id: $user_id
    team_id: $team_id
  ) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export const useCreateChallengeParticipantMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateChallengeParticipantMutation, TError, CreateChallengeParticipantMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateChallengeParticipantMutation, TError, CreateChallengeParticipantMutationVariables, TContext>(
      {
    mutationKey: ['CreateChallengeParticipant'],
    mutationFn: (variables?: CreateChallengeParticipantMutationVariables) => fetcher<CreateChallengeParticipantMutation, CreateChallengeParticipantMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateChallengeParticipantDocument, variables)(),
    ...options
  }
    )};

export const DeleteChallengeParticipantDocument = `
    mutation DeleteChallengeParticipant($id: String!) {
  deleteChallengeParticipant(id: $id) {
    id
  }
}
    `;

export const useDeleteChallengeParticipantMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteChallengeParticipantMutation, TError, DeleteChallengeParticipantMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteChallengeParticipantMutation, TError, DeleteChallengeParticipantMutationVariables, TContext>(
      {
    mutationKey: ['DeleteChallengeParticipant'],
    mutationFn: (variables?: DeleteChallengeParticipantMutationVariables) => fetcher<DeleteChallengeParticipantMutation, DeleteChallengeParticipantMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteChallengeParticipantDocument, variables)(),
    ...options
  }
    )};
