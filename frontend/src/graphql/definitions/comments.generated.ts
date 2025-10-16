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
export type CommentDetailsFragment = { __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null };

export type GetCommentsQueryVariables = Types.Exact<{
  post_id: Types.Scalars['String']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null };

export type CreateCommentMutationVariables = Types.Exact<{
  post_id: Types.Scalars['String']['input'];
  author_id: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null } | null };

export type UpdateCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null } | null };

export type DeleteCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id?: string | null } | null };


export const CommentDetailsFragmentDoc = `
    fragment CommentDetails on Comment {
  id
  author_id
  post_id
  content
  created_at
  author {
    id
    username
  }
}
    `;
export const GetCommentsDocument = `
    query GetComments($post_id: String!) {
  comments(post_id: $post_id) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;

export const useGetCommentsQuery = <
      TData = GetCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentsQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentsQuery, TError, TData>(
      {
    queryKey: ['GetComments', variables],
    queryFn: fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, variables),
    ...options
  }
    )};

export const CreateCommentDocument = `
    mutation CreateComment($post_id: String!, $author_id: String!, $content: String!) {
  createComment(post_id: $post_id, author_id: $author_id, content: $content) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;

export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCommentDocument, variables)(),
    ...options
  }
    )};

export const UpdateCommentDocument = `
    mutation UpdateComment($id: String!, $content: String!) {
  updateComment(id: $id, content: $content) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;

export const useUpdateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>(
      {
    mutationKey: ['UpdateComment'],
    mutationFn: (variables?: UpdateCommentMutationVariables) => fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCommentDocument, variables)(),
    ...options
  }
    )};

export const DeleteCommentDocument = `
    mutation DeleteComment($id: String!) {
  deleteComment(id: $id) {
    id
  }
}
    `;

export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteComment'],
    mutationFn: (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteCommentDocument, variables)(),
    ...options
  }
    )};
