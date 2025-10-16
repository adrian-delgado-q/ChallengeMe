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
export type WorkoutCommentDetailsFragment = { __typename?: 'WorkoutComment', id?: string | null, author_id?: string | null, workout_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null };

export type GetWorkoutCommentsQueryVariables = Types.Exact<{
  workout_id: Types.Scalars['String']['input'];
}>;


export type GetWorkoutCommentsQuery = { __typename?: 'Query', workoutComments?: Array<{ __typename?: 'WorkoutComment', id?: string | null, author_id?: string | null, workout_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null };

export type CreateWorkoutCommentMutationVariables = Types.Exact<{
  workout_id: Types.Scalars['String']['input'];
  author_id: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type CreateWorkoutCommentMutation = { __typename?: 'Mutation', createWorkoutComment?: { __typename?: 'WorkoutComment', id?: string | null, author_id?: string | null, workout_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null } | null };

export type DeleteWorkoutCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteWorkoutCommentMutation = { __typename?: 'Mutation', deleteWorkoutComment?: { __typename?: 'WorkoutComment', id?: string | null } | null };


export const WorkoutCommentDetailsFragmentDoc = `
    fragment WorkoutCommentDetails on WorkoutComment {
  id
  author_id
  workout_id
  content
  created_at
  author {
    id
    username
  }
}
    `;
export const GetWorkoutCommentsDocument = `
    query GetWorkoutComments($workout_id: String!) {
  workoutComments(workout_id: $workout_id) {
    ...WorkoutCommentDetails
  }
}
    ${WorkoutCommentDetailsFragmentDoc}`;

export const useGetWorkoutCommentsQuery = <
      TData = GetWorkoutCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetWorkoutCommentsQueryVariables,
      options?: Omit<UseQueryOptions<GetWorkoutCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetWorkoutCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetWorkoutCommentsQuery, TError, TData>(
      {
    queryKey: ['GetWorkoutComments', variables],
    queryFn: fetcher<GetWorkoutCommentsQuery, GetWorkoutCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetWorkoutCommentsDocument, variables),
    ...options
  }
    )};

export const CreateWorkoutCommentDocument = `
    mutation CreateWorkoutComment($workout_id: String!, $author_id: String!, $content: String!) {
  createWorkoutComment(
    workout_id: $workout_id
    author_id: $author_id
    content: $content
  ) {
    ...WorkoutCommentDetails
  }
}
    ${WorkoutCommentDetailsFragmentDoc}`;

export const useCreateWorkoutCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateWorkoutCommentMutation, TError, CreateWorkoutCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateWorkoutCommentMutation, TError, CreateWorkoutCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkoutComment'],
    mutationFn: (variables?: CreateWorkoutCommentMutationVariables) => fetcher<CreateWorkoutCommentMutation, CreateWorkoutCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateWorkoutCommentDocument, variables)(),
    ...options
  }
    )};

export const DeleteWorkoutCommentDocument = `
    mutation DeleteWorkoutComment($id: String!) {
  deleteWorkoutComment(id: $id) {
    id
  }
}
    `;

export const useDeleteWorkoutCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteWorkoutCommentMutation, TError, DeleteWorkoutCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteWorkoutCommentMutation, TError, DeleteWorkoutCommentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkoutComment'],
    mutationFn: (variables?: DeleteWorkoutCommentMutationVariables) => fetcher<DeleteWorkoutCommentMutation, DeleteWorkoutCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteWorkoutCommentDocument, variables)(),
    ...options
  }
    )};
