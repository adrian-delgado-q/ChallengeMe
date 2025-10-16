// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import {
	useQuery,
	useMutation,
	type UseQueryOptions,
	type UseMutationOptions,
} from '@tanstack/react-query';

function fetcher<TData, TVariables>(
	endpoint: string,
	requestInit: RequestInit,
	query: string,
	variables?: TVariables
) {
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
	};
}
export type DiscussionAuthorFragment = {
	__typename?: 'Profile';
	id?: string | null;
	username?: string | null;
	avatar_url?: string | null;
};

export type DiscussionReplyDetailsFragment = {
	__typename?: 'DiscussionReply';
	id?: string | null;
	content?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	author?: {
		__typename?: 'Profile';
		id?: string | null;
		username?: string | null;
		avatar_url?: string | null;
	} | null;
};

export type DiscussionPostBasicFragment = {
	__typename?: 'DiscussionPost';
	id?: string | null;
	content?: string | null;
	is_pinned?: boolean | null;
	is_deleted?: boolean | null;
	created_at?: string | null;
	updated_at?: string | null;
	reply_count?: number | null;
	last_reply_at?: string | null;
};

export type DiscussionPostWithRelationsFragment = {
	__typename?: 'DiscussionPost';
	id?: string | null;
	content?: string | null;
	is_pinned?: boolean | null;
	is_deleted?: boolean | null;
	created_at?: string | null;
	updated_at?: string | null;
	reply_count?: number | null;
	last_reply_at?: string | null;
	author?: {
		__typename?: 'Profile';
		id?: string | null;
		username?: string | null;
		avatar_url?: string | null;
	} | null;
	replies?: Array<{
		__typename?: 'DiscussionReply';
		id?: string | null;
		content?: string | null;
		created_at?: string | null;
		updated_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	}> | null;
};

export type GetDiscussionPostsQueryVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
}>;

export type GetDiscussionPostsQuery = {
	__typename?: 'Query';
	discussionPosts?: Array<{
		__typename?: 'DiscussionPost';
		id?: string | null;
		content?: string | null;
		is_pinned?: boolean | null;
		is_deleted?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		reply_count?: number | null;
		last_reply_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		replies?: Array<{
			__typename?: 'DiscussionReply';
			id?: string | null;
			content?: string | null;
			created_at?: string | null;
			updated_at?: string | null;
			author?: {
				__typename?: 'Profile';
				id?: string | null;
				username?: string | null;
				avatar_url?: string | null;
			} | null;
		}> | null;
	}> | null;
};

export type GetDiscussionPostQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetDiscussionPostQuery = {
	__typename?: 'Query';
	discussionPost?: {
		__typename?: 'DiscussionPost';
		id?: string | null;
		content?: string | null;
		is_pinned?: boolean | null;
		is_deleted?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		reply_count?: number | null;
		last_reply_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		replies?: Array<{
			__typename?: 'DiscussionReply';
			id?: string | null;
			content?: string | null;
			created_at?: string | null;
			updated_at?: string | null;
			author?: {
				__typename?: 'Profile';
				id?: string | null;
				username?: string | null;
				avatar_url?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type CreateDiscussionPostMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	author_id: Types.Scalars['String']['input'];
	content: Types.Scalars['String']['input'];
}>;

export type CreateDiscussionPostMutation = {
	__typename?: 'Mutation';
	createDiscussionPost?: {
		__typename?: 'DiscussionPost';
		id?: string | null;
		content?: string | null;
		is_pinned?: boolean | null;
		is_deleted?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		reply_count?: number | null;
		last_reply_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		replies?: Array<{
			__typename?: 'DiscussionReply';
			id?: string | null;
			content?: string | null;
			created_at?: string | null;
			updated_at?: string | null;
			author?: {
				__typename?: 'Profile';
				id?: string | null;
				username?: string | null;
				avatar_url?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type UpdateDiscussionPostMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	content?: Types.InputMaybe<Types.Scalars['String']['input']>;
	is_pinned?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;

export type UpdateDiscussionPostMutation = {
	__typename?: 'Mutation';
	updateDiscussionPost?: {
		__typename?: 'DiscussionPost';
		id?: string | null;
		content?: string | null;
		is_pinned?: boolean | null;
		is_deleted?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		reply_count?: number | null;
		last_reply_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		replies?: Array<{
			__typename?: 'DiscussionReply';
			id?: string | null;
			content?: string | null;
			created_at?: string | null;
			updated_at?: string | null;
			author?: {
				__typename?: 'Profile';
				id?: string | null;
				username?: string | null;
				avatar_url?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type DeleteDiscussionPostMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteDiscussionPostMutation = {
	__typename?: 'Mutation';
	deleteDiscussionPost?: { __typename?: 'DiscussionPost'; id?: string | null } | null;
};

export type CreateDiscussionReplyMutationVariables = Types.Exact<{
	post_id: Types.Scalars['String']['input'];
	author_id: Types.Scalars['String']['input'];
	content: Types.Scalars['String']['input'];
	parent_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CreateDiscussionReplyMutation = {
	__typename?: 'Mutation';
	createDiscussionReply?: {
		__typename?: 'DiscussionReply';
		id?: string | null;
		content?: string | null;
		created_at?: string | null;
		updated_at?: string | null;
		author?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	} | null;
};

export type DeleteDiscussionReplyMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteDiscussionReplyMutation = {
	__typename?: 'Mutation';
	deleteDiscussionReply?: { __typename?: 'DiscussionReply'; id?: string | null } | null;
};

export const DiscussionPostBasicFragmentDoc = `
    fragment DiscussionPostBasic on DiscussionPost {
  id
  content
  is_pinned
  is_deleted
  created_at
  updated_at
  reply_count
  last_reply_at
}
    `;
export const DiscussionAuthorFragmentDoc = `
    fragment DiscussionAuthor on Profile {
  id
  username
  avatar_url
}
    `;
export const DiscussionReplyDetailsFragmentDoc = `
    fragment DiscussionReplyDetails on DiscussionReply {
  id
  content
  created_at
  updated_at
  author {
    ...DiscussionAuthor
  }
}
    `;
export const DiscussionPostWithRelationsFragmentDoc = `
    fragment DiscussionPostWithRelations on DiscussionPost {
  ...DiscussionPostBasic
  author {
    ...DiscussionAuthor
  }
  replies {
    ...DiscussionReplyDetails
  }
}
    `;
export const GetDiscussionPostsDocument = `
    query GetDiscussionPosts($challenge_id: String!) {
  discussionPosts(challenge_id: $challenge_id) {
    ...DiscussionPostWithRelations
  }
}
    ${DiscussionPostWithRelationsFragmentDoc}
${DiscussionPostBasicFragmentDoc}
${DiscussionAuthorFragmentDoc}
${DiscussionReplyDetailsFragmentDoc}`;

export const useGetDiscussionPostsQuery = <TData = GetDiscussionPostsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetDiscussionPostsQueryVariables,
	options?: Omit<UseQueryOptions<GetDiscussionPostsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetDiscussionPostsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetDiscussionPostsQuery, TError, TData>({
		queryKey: ['GetDiscussionPosts', variables],
		queryFn: fetcher<GetDiscussionPostsQuery, GetDiscussionPostsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetDiscussionPostsDocument,
			variables
		),
		...options,
	});
};

export const GetDiscussionPostDocument = `
    query GetDiscussionPost($id: String!) {
  discussionPost(id: $id) {
    ...DiscussionPostWithRelations
  }
}
    ${DiscussionPostWithRelationsFragmentDoc}
${DiscussionPostBasicFragmentDoc}
${DiscussionAuthorFragmentDoc}
${DiscussionReplyDetailsFragmentDoc}`;

export const useGetDiscussionPostQuery = <TData = GetDiscussionPostQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetDiscussionPostQueryVariables,
	options?: Omit<UseQueryOptions<GetDiscussionPostQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetDiscussionPostQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetDiscussionPostQuery, TError, TData>({
		queryKey: ['GetDiscussionPost', variables],
		queryFn: fetcher<GetDiscussionPostQuery, GetDiscussionPostQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetDiscussionPostDocument,
			variables
		),
		...options,
	});
};

export const CreateDiscussionPostDocument = `
    mutation CreateDiscussionPost($challenge_id: String!, $author_id: String!, $content: String!) {
  createDiscussionPost(
    challenge_id: $challenge_id
    author_id: $author_id
    content: $content
  ) {
    ...DiscussionPostWithRelations
  }
}
    ${DiscussionPostWithRelationsFragmentDoc}
${DiscussionPostBasicFragmentDoc}
${DiscussionAuthorFragmentDoc}
${DiscussionReplyDetailsFragmentDoc}`;

export const useCreateDiscussionPostMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateDiscussionPostMutation,
		TError,
		CreateDiscussionPostMutationVariables,
		TContext
	>
) => {
	return useMutation<
		CreateDiscussionPostMutation,
		TError,
		CreateDiscussionPostMutationVariables,
		TContext
	>({
		mutationKey: ['CreateDiscussionPost'],
		mutationFn: (variables?: CreateDiscussionPostMutationVariables) =>
			fetcher<CreateDiscussionPostMutation, CreateDiscussionPostMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateDiscussionPostDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateDiscussionPostDocument = `
    mutation UpdateDiscussionPost($id: String!, $content: String, $is_pinned: Boolean) {
  updateDiscussionPost(id: $id, content: $content, is_pinned: $is_pinned) {
    ...DiscussionPostWithRelations
  }
}
    ${DiscussionPostWithRelationsFragmentDoc}
${DiscussionPostBasicFragmentDoc}
${DiscussionAuthorFragmentDoc}
${DiscussionReplyDetailsFragmentDoc}`;

export const useUpdateDiscussionPostMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateDiscussionPostMutation,
		TError,
		UpdateDiscussionPostMutationVariables,
		TContext
	>
) => {
	return useMutation<
		UpdateDiscussionPostMutation,
		TError,
		UpdateDiscussionPostMutationVariables,
		TContext
	>({
		mutationKey: ['UpdateDiscussionPost'],
		mutationFn: (variables?: UpdateDiscussionPostMutationVariables) =>
			fetcher<UpdateDiscussionPostMutation, UpdateDiscussionPostMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateDiscussionPostDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteDiscussionPostDocument = `
    mutation DeleteDiscussionPost($id: String!) {
  deleteDiscussionPost(id: $id) {
    id
  }
}
    `;

export const useDeleteDiscussionPostMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteDiscussionPostMutation,
		TError,
		DeleteDiscussionPostMutationVariables,
		TContext
	>
) => {
	return useMutation<
		DeleteDiscussionPostMutation,
		TError,
		DeleteDiscussionPostMutationVariables,
		TContext
	>({
		mutationKey: ['DeleteDiscussionPost'],
		mutationFn: (variables?: DeleteDiscussionPostMutationVariables) =>
			fetcher<DeleteDiscussionPostMutation, DeleteDiscussionPostMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteDiscussionPostDocument,
				variables
			)(),
		...options,
	});
};

export const CreateDiscussionReplyDocument = `
    mutation CreateDiscussionReply($post_id: String!, $author_id: String!, $content: String!, $parent_id: String) {
  createDiscussionReply(
    post_id: $post_id
    author_id: $author_id
    content: $content
    parent_id: $parent_id
  ) {
    ...DiscussionReplyDetails
  }
}
    ${DiscussionReplyDetailsFragmentDoc}
${DiscussionAuthorFragmentDoc}`;

export const useCreateDiscussionReplyMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateDiscussionReplyMutation,
		TError,
		CreateDiscussionReplyMutationVariables,
		TContext
	>
) => {
	return useMutation<
		CreateDiscussionReplyMutation,
		TError,
		CreateDiscussionReplyMutationVariables,
		TContext
	>({
		mutationKey: ['CreateDiscussionReply'],
		mutationFn: (variables?: CreateDiscussionReplyMutationVariables) =>
			fetcher<CreateDiscussionReplyMutation, CreateDiscussionReplyMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateDiscussionReplyDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteDiscussionReplyDocument = `
    mutation DeleteDiscussionReply($id: String!) {
  deleteDiscussionReply(id: $id) {
    id
  }
}
    `;

export const useDeleteDiscussionReplyMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteDiscussionReplyMutation,
		TError,
		DeleteDiscussionReplyMutationVariables,
		TContext
	>
) => {
	return useMutation<
		DeleteDiscussionReplyMutation,
		TError,
		DeleteDiscussionReplyMutationVariables,
		TContext
	>({
		mutationKey: ['DeleteDiscussionReply'],
		mutationFn: (variables?: DeleteDiscussionReplyMutationVariables) =>
			fetcher<DeleteDiscussionReplyMutation, DeleteDiscussionReplyMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteDiscussionReplyDocument,
				variables
			)(),
		...options,
	});
};
