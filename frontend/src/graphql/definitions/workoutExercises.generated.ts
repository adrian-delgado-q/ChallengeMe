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
export type WorkoutExerciseDetailsFragment = { __typename?: 'WorkoutExercise', id?: string | null, workout_id?: string | null, activity_type_id?: string | null, order_index?: number | null, sets?: number | null, reps?: number | null, rest_time?: number | null, notes?: string | null };

export type GetWorkoutExercisesQueryVariables = Types.Exact<{
  workout_id: Types.Scalars['String']['input'];
}>;


export type GetWorkoutExercisesQuery = { __typename?: 'Query', workoutExercises?: Array<{ __typename?: 'WorkoutExercise', id?: string | null, workout_id?: string | null, activity_type_id?: string | null, order_index?: number | null, sets?: number | null, reps?: number | null, rest_time?: number | null, notes?: string | null }> | null };

export type AddExerciseToWorkoutMutationVariables = Types.Exact<{
  workout_id: Types.Scalars['String']['input'];
  activity_type_id: Types.Scalars['String']['input'];
  order_index: Types.Scalars['Int']['input'];
  sets?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  reps?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  rest_time?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AddExerciseToWorkoutMutation = { __typename?: 'Mutation', addExerciseToWorkout?: { __typename?: 'WorkoutExercise', id?: string | null, workout_id?: string | null, activity_type_id?: string | null, order_index?: number | null, sets?: number | null, reps?: number | null, rest_time?: number | null, notes?: string | null } | null };

export type UpdateWorkoutExerciseMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  sets?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  reps?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  rest_time?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateWorkoutExerciseMutation = { __typename?: 'Mutation', updateWorkoutExercise?: { __typename?: 'WorkoutExercise', id?: string | null, workout_id?: string | null, activity_type_id?: string | null, order_index?: number | null, sets?: number | null, reps?: number | null, rest_time?: number | null, notes?: string | null } | null };

export type RemoveExerciseFromWorkoutMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type RemoveExerciseFromWorkoutMutation = { __typename?: 'Mutation', removeExerciseFromWorkout?: { __typename?: 'WorkoutExercise', id?: string | null } | null };


export const WorkoutExerciseDetailsFragmentDoc = `
    fragment WorkoutExerciseDetails on WorkoutExercise {
  id
  workout_id
  activity_type_id
  order_index
  sets
  reps
  rest_time
  notes
}
    `;
export const GetWorkoutExercisesDocument = `
    query GetWorkoutExercises($workout_id: String!) {
  workoutExercises(workout_id: $workout_id) {
    ...WorkoutExerciseDetails
  }
}
    ${WorkoutExerciseDetailsFragmentDoc}`;

export const useGetWorkoutExercisesQuery = <
      TData = GetWorkoutExercisesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetWorkoutExercisesQueryVariables,
      options?: Omit<UseQueryOptions<GetWorkoutExercisesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetWorkoutExercisesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetWorkoutExercisesQuery, TError, TData>(
      {
    queryKey: ['GetWorkoutExercises', variables],
    queryFn: fetcher<GetWorkoutExercisesQuery, GetWorkoutExercisesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetWorkoutExercisesDocument, variables),
    ...options
  }
    )};

export const AddExerciseToWorkoutDocument = `
    mutation AddExerciseToWorkout($workout_id: String!, $activity_type_id: String!, $order_index: Int!, $sets: Int, $reps: Int, $rest_time: Int, $notes: String) {
  addExerciseToWorkout(
    workout_id: $workout_id
    activity_type_id: $activity_type_id
    order_index: $order_index
    sets: $sets
    reps: $reps
    rest_time: $rest_time
    notes: $notes
  ) {
    ...WorkoutExerciseDetails
  }
}
    ${WorkoutExerciseDetailsFragmentDoc}`;

export const useAddExerciseToWorkoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddExerciseToWorkoutMutation, TError, AddExerciseToWorkoutMutationVariables, TContext>
    ) => {
    
    return useMutation<AddExerciseToWorkoutMutation, TError, AddExerciseToWorkoutMutationVariables, TContext>(
      {
    mutationKey: ['AddExerciseToWorkout'],
    mutationFn: (variables?: AddExerciseToWorkoutMutationVariables) => fetcher<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddExerciseToWorkoutDocument, variables)(),
    ...options
  }
    )};

export const UpdateWorkoutExerciseDocument = `
    mutation UpdateWorkoutExercise($id: String!, $sets: Int, $reps: Int, $rest_time: Int, $notes: String) {
  updateWorkoutExercise(
    id: $id
    sets: $sets
    reps: $reps
    rest_time: $rest_time
    notes: $notes
  ) {
    ...WorkoutExerciseDetails
  }
}
    ${WorkoutExerciseDetailsFragmentDoc}`;

export const useUpdateWorkoutExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateWorkoutExerciseMutation, TError, UpdateWorkoutExerciseMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateWorkoutExerciseMutation, TError, UpdateWorkoutExerciseMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkoutExercise'],
    mutationFn: (variables?: UpdateWorkoutExerciseMutationVariables) => fetcher<UpdateWorkoutExerciseMutation, UpdateWorkoutExerciseMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateWorkoutExerciseDocument, variables)(),
    ...options
  }
    )};

export const RemoveExerciseFromWorkoutDocument = `
    mutation RemoveExerciseFromWorkout($id: String!) {
  removeExerciseFromWorkout(id: $id) {
    id
  }
}
    `;

export const useRemoveExerciseFromWorkoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveExerciseFromWorkoutMutation, TError, RemoveExerciseFromWorkoutMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveExerciseFromWorkoutMutation, TError, RemoveExerciseFromWorkoutMutationVariables, TContext>(
      {
    mutationKey: ['RemoveExerciseFromWorkout'],
    mutationFn: (variables?: RemoveExerciseFromWorkoutMutationVariables) => fetcher<RemoveExerciseFromWorkoutMutation, RemoveExerciseFromWorkoutMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveExerciseFromWorkoutDocument, variables)(),
    ...options
  }
    )};
