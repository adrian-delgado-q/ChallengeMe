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
export type BadgeBasicFragment = {
	__typename?: 'Badge';
	id?: string | null;
	name?: string | null;
	description?: string | null;
	category?: string | null;
	icon_url?: string | null;
	xp_bonus?: number | null;
	created_at?: string | null;
};

export type GetBadgeQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetBadgeQuery = {
	__typename?: 'Query';
	badge?: {
		__typename?: 'Badge';
		id?: string | null;
		name?: string | null;
		description?: string | null;
		category?: string | null;
		icon_url?: string | null;
		xp_bonus?: number | null;
		created_at?: string | null;
	} | null;
};

export type GetBadgesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetBadgesQuery = {
	__typename?: 'Query';
	badges?: Array<{
		__typename?: 'Badge';
		id?: string | null;
		name?: string | null;
		description?: string | null;
		category?: string | null;
		icon_url?: string | null;
		xp_bonus?: number | null;
		created_at?: string | null;
	}> | null;
};

export type CreateBadgeMutationVariables = Types.Exact<{
	name: Types.Scalars['String']['input'];
	description: Types.Scalars['String']['input'];
	category: Types.Scalars['String']['input'];
	icon_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
	xp_bonus?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateBadgeMutation = {
	__typename?: 'Mutation';
	createBadge?: {
		__typename?: 'Badge';
		id?: string | null;
		name?: string | null;
		description?: string | null;
		category?: string | null;
		icon_url?: string | null;
		xp_bonus?: number | null;
		created_at?: string | null;
	} | null;
};

export type UpdateBadgeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	name?: Types.InputMaybe<Types.Scalars['String']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	icon_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
	xp_bonus?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type UpdateBadgeMutation = {
	__typename?: 'Mutation';
	updateBadge?: {
		__typename?: 'Badge';
		id?: string | null;
		name?: string | null;
		description?: string | null;
		category?: string | null;
		icon_url?: string | null;
		xp_bonus?: number | null;
		created_at?: string | null;
	} | null;
};

export type DeleteBadgeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteBadgeMutation = {
	__typename?: 'Mutation';
	deleteBadge?: { __typename?: 'Badge'; id?: string | null } | null;
};

export const BadgeBasicFragmentDoc = `
    fragment BadgeBasic on Badge {
  id
  name
  description
  category
  icon_url
  xp_bonus
  created_at
}
    `;
export const GetBadgeDocument = `
    query GetBadge($id: String!) {
  badge(id: $id) {
    ...BadgeBasic
  }
}
    ${BadgeBasicFragmentDoc}`;

export const useGetBadgeQuery = <TData = GetBadgeQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetBadgeQueryVariables,
	options?: Omit<UseQueryOptions<GetBadgeQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetBadgeQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetBadgeQuery, TError, TData>({
		queryKey: ['GetBadge', variables],
		queryFn: fetcher<GetBadgeQuery, GetBadgeQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetBadgeDocument,
			variables
		),
		...options,
	});
};

export const GetBadgesDocument = `
    query GetBadges {
  badges {
    ...BadgeBasic
  }
}
    ${BadgeBasicFragmentDoc}`;

export const useGetBadgesQuery = <TData = GetBadgesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetBadgesQueryVariables,
	options?: Omit<UseQueryOptions<GetBadgesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetBadgesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetBadgesQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetBadges'] : ['GetBadges', variables],
		queryFn: fetcher<GetBadgesQuery, GetBadgesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetBadgesDocument,
			variables
		),
		...options,
	});
};

export const CreateBadgeDocument = `
    mutation CreateBadge($name: String!, $description: String!, $category: String!, $icon_url: String, $xp_bonus: Int) {
  createBadge(
    name: $name
    description: $description
    category: $category
    icon_url: $icon_url
    xp_bonus: $xp_bonus
  ) {
    ...BadgeBasic
  }
}
    ${BadgeBasicFragmentDoc}`;

export const useCreateBadgeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<CreateBadgeMutation, TError, CreateBadgeMutationVariables, TContext>
) => {
	return useMutation<CreateBadgeMutation, TError, CreateBadgeMutationVariables, TContext>({
		mutationKey: ['CreateBadge'],
		mutationFn: (variables?: CreateBadgeMutationVariables) =>
			fetcher<CreateBadgeMutation, CreateBadgeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateBadgeDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateBadgeDocument = `
    mutation UpdateBadge($id: String!, $name: String, $description: String, $category: String, $icon_url: String, $xp_bonus: Int) {
  updateBadge(
    id: $id
    name: $name
    description: $description
    category: $category
    icon_url: $icon_url
    xp_bonus: $xp_bonus
  ) {
    ...BadgeBasic
  }
}
    ${BadgeBasicFragmentDoc}`;

export const useUpdateBadgeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<UpdateBadgeMutation, TError, UpdateBadgeMutationVariables, TContext>
) => {
	return useMutation<UpdateBadgeMutation, TError, UpdateBadgeMutationVariables, TContext>({
		mutationKey: ['UpdateBadge'],
		mutationFn: (variables?: UpdateBadgeMutationVariables) =>
			fetcher<UpdateBadgeMutation, UpdateBadgeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateBadgeDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteBadgeDocument = `
    mutation DeleteBadge($id: String!) {
  deleteBadge(id: $id) {
    id
  }
}
    `;

export const useDeleteBadgeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<DeleteBadgeMutation, TError, DeleteBadgeMutationVariables, TContext>
) => {
	return useMutation<DeleteBadgeMutation, TError, DeleteBadgeMutationVariables, TContext>({
		mutationKey: ['DeleteBadge'],
		mutationFn: (variables?: DeleteBadgeMutationVariables) =>
			fetcher<DeleteBadgeMutation, DeleteBadgeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteBadgeDocument,
				variables
			)(),
		...options,
	});
};
