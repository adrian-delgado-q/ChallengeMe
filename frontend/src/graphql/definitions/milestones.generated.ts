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
export type MilestoneDetailsFragment = { __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, name?: string | null, description?: string | null, target_value?: number | null, order?: number | null, created_at?: string | null };

export type GetMilestoneQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetMilestoneQuery = { __typename?: 'Query', milestone?: { __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, name?: string | null, description?: string | null, target_value?: number | null, order?: number | null, created_at?: string | null } | null };

export type GetMilestonesQueryVariables = Types.Exact<{
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetMilestonesQuery = { __typename?: 'Query', milestones?: Array<{ __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, name?: string | null, description?: string | null, target_value?: number | null, order?: number | null, created_at?: string | null }> | null };

export type CreateMilestoneMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['String']['input'];
  activity_type_id: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  target_value: Types.Scalars['Float']['input'];
  order: Types.Scalars['Int']['input'];
}>;


export type CreateMilestoneMutation = { __typename?: 'Mutation', createMilestone?: { __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, name?: string | null, description?: string | null, target_value?: number | null, order?: number | null, created_at?: string | null } | null };

export type UpdateMilestoneMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  target_value?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  order?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UpdateMilestoneMutation = { __typename?: 'Mutation', updateMilestone?: { __typename?: 'Milestone', id?: string | null, challenge_id?: string | null, activity_type_id?: string | null, name?: string | null, description?: string | null, target_value?: number | null, order?: number | null, created_at?: string | null } | null };

export type DeleteMilestoneMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteMilestoneMutation = { __typename?: 'Mutation', deleteMilestone?: { __typename?: 'Milestone', id?: string | null } | null };


export const MilestoneDetailsFragmentDoc = `
    fragment MilestoneDetails on Milestone {
  id
  challenge_id
  activity_type_id
  name
  description
  target_value
  order
  created_at
}
    `;
export const GetMilestoneDocument = `
    query GetMilestone($id: String!) {
  milestone(id: $id) {
    ...MilestoneDetails
  }
}
    ${MilestoneDetailsFragmentDoc}`;

export const useGetMilestoneQuery = <
      TData = GetMilestoneQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetMilestoneQueryVariables,
      options?: Omit<UseQueryOptions<GetMilestoneQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMilestoneQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMilestoneQuery, TError, TData>(
      {
    queryKey: ['GetMilestone', variables],
    queryFn: fetcher<GetMilestoneQuery, GetMilestoneQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMilestoneDocument, variables),
    ...options
  }
    )};

export const GetMilestonesDocument = `
    query GetMilestones($challenge_id: String) {
  milestones(challenge_id: $challenge_id) {
    ...MilestoneDetails
  }
}
    ${MilestoneDetailsFragmentDoc}`;

export const useGetMilestonesQuery = <
      TData = GetMilestonesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetMilestonesQueryVariables,
      options?: Omit<UseQueryOptions<GetMilestonesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMilestonesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMilestonesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMilestones'] : ['GetMilestones', variables],
    queryFn: fetcher<GetMilestonesQuery, GetMilestonesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMilestonesDocument, variables),
    ...options
  }
    )};

export const CreateMilestoneDocument = `
    mutation CreateMilestone($challenge_id: String!, $activity_type_id: String!, $name: String!, $description: String, $target_value: Float!, $order: Int!) {
  createMilestone(
    challenge_id: $challenge_id
    activity_type_id: $activity_type_id
    name: $name
    description: $description
    target_value: $target_value
    order: $order
  ) {
    ...MilestoneDetails
  }
}
    ${MilestoneDetailsFragmentDoc}`;

export const useCreateMilestoneMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateMilestoneMutation, TError, CreateMilestoneMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateMilestoneMutation, TError, CreateMilestoneMutationVariables, TContext>(
      {
    mutationKey: ['CreateMilestone'],
    mutationFn: (variables?: CreateMilestoneMutationVariables) => fetcher<CreateMilestoneMutation, CreateMilestoneMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateMilestoneDocument, variables)(),
    ...options
  }
    )};

export const UpdateMilestoneDocument = `
    mutation UpdateMilestone($id: String!, $name: String, $description: String, $target_value: Float, $order: Int) {
  updateMilestone(
    id: $id
    name: $name
    description: $description
    target_value: $target_value
    order: $order
  ) {
    ...MilestoneDetails
  }
}
    ${MilestoneDetailsFragmentDoc}`;

export const useUpdateMilestoneMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateMilestoneMutation, TError, UpdateMilestoneMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateMilestoneMutation, TError, UpdateMilestoneMutationVariables, TContext>(
      {
    mutationKey: ['UpdateMilestone'],
    mutationFn: (variables?: UpdateMilestoneMutationVariables) => fetcher<UpdateMilestoneMutation, UpdateMilestoneMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateMilestoneDocument, variables)(),
    ...options
  }
    )};

export const DeleteMilestoneDocument = `
    mutation DeleteMilestone($id: String!) {
  deleteMilestone(id: $id) {
    id
  }
}
    `;

export const useDeleteMilestoneMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteMilestoneMutation, TError, DeleteMilestoneMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteMilestoneMutation, TError, DeleteMilestoneMutationVariables, TContext>(
      {
    mutationKey: ['DeleteMilestone'],
    mutationFn: (variables?: DeleteMilestoneMutationVariables) => fetcher<DeleteMilestoneMutation, DeleteMilestoneMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteMilestoneDocument, variables)(),
    ...options
  }
    )};
