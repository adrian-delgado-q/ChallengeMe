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
export type DiscussionModeratorDetailsFragment = {
	__typename?: 'DiscussionModerator';
	id?: string | null;
	challenge_id?: string | null;
	user_id?: string | null;
	role?: Types.ModeratorRole | null;
	granted_at?: string | null;
	granted_by_id?: string | null;
};

export type GetDiscussionModeratorsQueryVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
}>;

export type GetDiscussionModeratorsQuery = {
	__typename?: 'Query';
	discussionModerators?: Array<{
		__typename?: 'DiscussionModerator';
		id?: string | null;
		challenge_id?: string | null;
		user_id?: string | null;
		role?: Types.ModeratorRole | null;
		granted_at?: string | null;
		granted_by_id?: string | null;
	}> | null;
};

export type AddDiscussionModeratorMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	user_id: Types.Scalars['String']['input'];
	granted_by_id: Types.Scalars['String']['input'];
	role?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type AddDiscussionModeratorMutation = {
	__typename?: 'Mutation';
	addDiscussionModerator?: {
		__typename?: 'DiscussionModerator';
		id?: string | null;
		challenge_id?: string | null;
		user_id?: string | null;
		role?: Types.ModeratorRole | null;
		granted_at?: string | null;
		granted_by_id?: string | null;
	} | null;
};

export type RemoveDiscussionModeratorMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type RemoveDiscussionModeratorMutation = {
	__typename?: 'Mutation';
	removeDiscussionModerator?: { __typename?: 'DiscussionModerator'; id?: string | null } | null;
};

export const DiscussionModeratorDetailsFragmentDoc = `
    fragment DiscussionModeratorDetails on DiscussionModerator {
  id
  challenge_id
  user_id
  role
  granted_at
  granted_by_id
}
    `;
export const GetDiscussionModeratorsDocument = `
    query GetDiscussionModerators($challenge_id: String!) {
  discussionModerators(challenge_id: $challenge_id) {
    ...DiscussionModeratorDetails
  }
}
    ${DiscussionModeratorDetailsFragmentDoc}`;

export const useGetDiscussionModeratorsQuery = <
	TData = GetDiscussionModeratorsQuery,
	TError = unknown,
>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetDiscussionModeratorsQueryVariables,
	options?: Omit<UseQueryOptions<GetDiscussionModeratorsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetDiscussionModeratorsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetDiscussionModeratorsQuery, TError, TData>({
		queryKey: ['GetDiscussionModerators', variables],
		queryFn: fetcher<GetDiscussionModeratorsQuery, GetDiscussionModeratorsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetDiscussionModeratorsDocument,
			variables
		),
		...options,
	});
};

export const AddDiscussionModeratorDocument = `
    mutation AddDiscussionModerator($challenge_id: String!, $user_id: String!, $granted_by_id: String!, $role: String) {
  addDiscussionModerator(
    challenge_id: $challenge_id
    user_id: $user_id
    granted_by_id: $granted_by_id
    role: $role
  ) {
    ...DiscussionModeratorDetails
  }
}
    ${DiscussionModeratorDetailsFragmentDoc}`;

export const useAddDiscussionModeratorMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		AddDiscussionModeratorMutation,
		TError,
		AddDiscussionModeratorMutationVariables,
		TContext
	>
) => {
	return useMutation<
		AddDiscussionModeratorMutation,
		TError,
		AddDiscussionModeratorMutationVariables,
		TContext
	>({
		mutationKey: ['AddDiscussionModerator'],
		mutationFn: (variables?: AddDiscussionModeratorMutationVariables) =>
			fetcher<AddDiscussionModeratorMutation, AddDiscussionModeratorMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				AddDiscussionModeratorDocument,
				variables
			)(),
		...options,
	});
};

export const RemoveDiscussionModeratorDocument = `
    mutation RemoveDiscussionModerator($id: String!) {
  removeDiscussionModerator(id: $id) {
    id
  }
}
    `;

export const useRemoveDiscussionModeratorMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		RemoveDiscussionModeratorMutation,
		TError,
		RemoveDiscussionModeratorMutationVariables,
		TContext
	>
) => {
	return useMutation<
		RemoveDiscussionModeratorMutation,
		TError,
		RemoveDiscussionModeratorMutationVariables,
		TContext
	>({
		mutationKey: ['RemoveDiscussionModerator'],
		mutationFn: (variables?: RemoveDiscussionModeratorMutationVariables) =>
			fetcher<RemoveDiscussionModeratorMutation, RemoveDiscussionModeratorMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				RemoveDiscussionModeratorDocument,
				variables
			)(),
		...options,
	});
};
