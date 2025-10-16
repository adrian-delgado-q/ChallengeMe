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
export type ActivityTypeBasicFragment = { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null };

export type ActivityBasicFragment = { __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null };

export type ActivityWithRelationsFragment = { __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null };

export type GetActivitiesQueryVariables = Types.Exact<{
  profile_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', activities?: Array<{ __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null }> | null };

export type GetActivityQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetActivityQuery = { __typename?: 'Query', activity?: { __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type CreateActivityMutationVariables = Types.Exact<{
  participant_id: Types.Scalars['String']['input'];
  activity_type_id: Types.Scalars['String']['input'];
  value: Types.Scalars['Float']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
  date: Types.Scalars['Date']['input'];
  profile_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity?: { __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type UpdateActivityMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  value?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
  date?: Types.InputMaybe<Types.Scalars['Date']['input']>;
}>;


export type UpdateActivityMutation = { __typename?: 'Mutation', updateActivity?: { __typename?: 'Activity', id?: string | null, value?: number | null, notes?: string | null, date?: string | null, uploaded_at?: string | null, activity_type?: { __typename?: 'ActivityType', id?: string | null, name?: string | null, category?: string | null, unit?: string | null, unit_label?: string | null, description?: string | null } | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null } | null };

export type DeleteActivityMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity?: { __typename?: 'Activity', id?: string | null } | null };


export const ActivityBasicFragmentDoc = `
    fragment ActivityBasic on Activity {
  id
  value
  notes
  date
  uploaded_at
}
    `;
export const ActivityTypeBasicFragmentDoc = `
    fragment ActivityTypeBasic on ActivityType {
  id
  name
  category
  unit
  unit_label
  description
}
    `;
export const ActivityWithRelationsFragmentDoc = `
    fragment ActivityWithRelations on Activity {
  ...ActivityBasic
  activity_type {
    ...ActivityTypeBasic
  }
  Profile {
    id
    username
    avatar_url
  }
}
    `;
export const GetActivitiesDocument = `
    query GetActivities($profile_id: String, $challenge_id: String) {
  activities(profile_id: $profile_id, challenge_id: $challenge_id) {
    ...ActivityWithRelations
  }
}
    ${ActivityWithRelationsFragmentDoc}
${ActivityBasicFragmentDoc}
${ActivityTypeBasicFragmentDoc}`;

export const useGetActivitiesQuery = <
      TData = GetActivitiesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetActivitiesQueryVariables,
      options?: Omit<UseQueryOptions<GetActivitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetActivitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetActivitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetActivities'] : ['GetActivities', variables],
    queryFn: fetcher<GetActivitiesQuery, GetActivitiesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetActivitiesDocument, variables),
    ...options
  }
    )};

export const GetActivityDocument = `
    query GetActivity($id: String!) {
  activity(id: $id) {
    ...ActivityWithRelations
  }
}
    ${ActivityWithRelationsFragmentDoc}
${ActivityBasicFragmentDoc}
${ActivityTypeBasicFragmentDoc}`;

export const useGetActivityQuery = <
      TData = GetActivityQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetActivityQueryVariables,
      options?: Omit<UseQueryOptions<GetActivityQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetActivityQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetActivityQuery, TError, TData>(
      {
    queryKey: ['GetActivity', variables],
    queryFn: fetcher<GetActivityQuery, GetActivityQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetActivityDocument, variables),
    ...options
  }
    )};

export const CreateActivityDocument = `
    mutation CreateActivity($participant_id: String!, $activity_type_id: String!, $value: Float!, $notes: String, $date: Date!, $profile_id: String, $challenge_id: String) {
  createActivity(
    participant_id: $participant_id
    activity_type_id: $activity_type_id
    value: $value
    notes: $notes
    date: $date
    profile_id: $profile_id
    challenge_id: $challenge_id
  ) {
    ...ActivityWithRelations
  }
}
    ${ActivityWithRelationsFragmentDoc}
${ActivityBasicFragmentDoc}
${ActivityTypeBasicFragmentDoc}`;

export const useCreateActivityMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateActivityMutation, TError, CreateActivityMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateActivityMutation, TError, CreateActivityMutationVariables, TContext>(
      {
    mutationKey: ['CreateActivity'],
    mutationFn: (variables?: CreateActivityMutationVariables) => fetcher<CreateActivityMutation, CreateActivityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateActivityDocument, variables)(),
    ...options
  }
    )};

export const UpdateActivityDocument = `
    mutation UpdateActivity($id: String!, $value: Float, $notes: String, $date: Date) {
  updateActivity(id: $id, value: $value, notes: $notes, date: $date) {
    ...ActivityWithRelations
  }
}
    ${ActivityWithRelationsFragmentDoc}
${ActivityBasicFragmentDoc}
${ActivityTypeBasicFragmentDoc}`;

export const useUpdateActivityMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateActivityMutation, TError, UpdateActivityMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateActivityMutation, TError, UpdateActivityMutationVariables, TContext>(
      {
    mutationKey: ['UpdateActivity'],
    mutationFn: (variables?: UpdateActivityMutationVariables) => fetcher<UpdateActivityMutation, UpdateActivityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateActivityDocument, variables)(),
    ...options
  }
    )};

export const DeleteActivityDocument = `
    mutation DeleteActivity($id: String!) {
  deleteActivity(id: $id) {
    id
  }
}
    `;

export const useDeleteActivityMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteActivityMutation, TError, DeleteActivityMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteActivityMutation, TError, DeleteActivityMutationVariables, TContext>(
      {
    mutationKey: ['DeleteActivity'],
    mutationFn: (variables?: DeleteActivityMutationVariables) => fetcher<DeleteActivityMutation, DeleteActivityMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteActivityDocument, variables)(),
    ...options
  }
    )};
