// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import { CommentDetailsFragmentDoc } from './comments.generated';
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
export type PostBasicFragment = { __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null };

export type PostWithRelationsFragment = { __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null };

export type GetPostsQueryVariables = Types.Exact<{
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  profile_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null }> | null };

export type GetPostQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null } | null };

export type CreatePostMutationVariables = Types.Exact<{
  participant_id: Types.Scalars['String']['input'];
  content?: Types.InputMaybe<Types.Scalars['String']['input']>;
  image_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  profile_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null } | null };

export type UpdatePostMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  content?: Types.InputMaybe<Types.Scalars['String']['input']>;
  image_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id?: string | null, content?: string | null, image_url?: string | null, created_at?: string | null, Profile?: { __typename?: 'Profile', id?: string | null, username?: string | null, avatar_url?: string | null } | null, comments?: Array<{ __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null }> | null } | null };

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id?: string | null } | null };

export type CreateCommentMutationVariables = Types.Exact<{
  post_id: Types.Scalars['String']['input'];
  author_id: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id?: string | null, author_id?: string | null, post_id?: string | null, content?: string | null, created_at?: string | null, author?: { __typename?: 'Profile', id?: string | null, username?: string | null } | null } | null };

export type DeleteCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id?: string | null } | null };


export const PostBasicFragmentDoc = `
    fragment PostBasic on Post {
  id
  content
  image_url
  created_at
}
    `;
export const PostWithRelationsFragmentDoc = `
    fragment PostWithRelations on Post {
  ...PostBasic
  Profile {
    id
    username
    avatar_url
  }
  comments {
    ...CommentDetails
  }
}
    `;
export const GetPostsDocument = `
    query GetPosts($challenge_id: String, $profile_id: String) {
  posts(challenge_id: $challenge_id, profile_id: $profile_id) {
    ...PostWithRelations
  }
}
    ${PostWithRelationsFragmentDoc}
${PostBasicFragmentDoc}
${CommentDetailsFragmentDoc}`;

export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetPostsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
    queryFn: fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables),
    ...options
  }
    )};

export const GetPostDocument = `
    query GetPost($id: String!) {
  post(id: $id) {
    ...PostWithRelations
  }
}
    ${PostWithRelationsFragmentDoc}
${PostBasicFragmentDoc}
${CommentDetailsFragmentDoc}`;

export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options?: Omit<UseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostQuery, TError, TData>(
      {
    queryKey: ['GetPost', variables],
    queryFn: fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, variables),
    ...options
  }
    )};

export const CreatePostDocument = `
    mutation CreatePost($participant_id: String!, $content: String, $image_url: String, $profile_id: String, $challenge_id: String) {
  createPost(
    participant_id: $participant_id
    content: $content
    image_url: $image_url
    profile_id: $profile_id
    challenge_id: $challenge_id
  ) {
    ...PostWithRelations
  }
}
    ${PostWithRelationsFragmentDoc}
${PostBasicFragmentDoc}
${CommentDetailsFragmentDoc}`;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>
    ) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreatePostDocument, variables)(),
    ...options
  }
    )};

export const UpdatePostDocument = `
    mutation UpdatePost($id: String!, $content: String, $image_url: String) {
  updatePost(id: $id, content: $content, image_url: $image_url) {
    ...PostWithRelations
  }
}
    ${PostWithRelationsFragmentDoc}
${PostBasicFragmentDoc}
${CommentDetailsFragmentDoc}`;

export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePost'],
    mutationFn: (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdatePostDocument, variables)(),
    ...options
  }
    )};

export const DeletePostDocument = `
    mutation DeletePost($id: String!) {
  deletePost(id: $id) {
    id
  }
}
    `;

export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>
    ) => {
    
    return useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      {
    mutationKey: ['DeletePost'],
    mutationFn: (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeletePostDocument, variables)(),
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
