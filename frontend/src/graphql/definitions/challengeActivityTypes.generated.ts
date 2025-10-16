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
export type ChallengeActivityTypeDetailsFragment = {
	__typename?: 'ChallengeActivityType';
	id?: string | null;
	challenge_id?: string | null;
	activity_type_id?: string | null;
	activity_type?: { __typename?: 'ActivityType'; id?: string | null; name?: string | null } | null;
	challenge?: { __typename?: 'Challenge'; id?: string | null; title?: string | null } | null;
};

export type GetChallengeActivityTypesQueryVariables = Types.Exact<{
	challenge_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetChallengeActivityTypesQuery = {
	__typename?: 'Query';
	challengeActivityTypes?: Array<{
		__typename?: 'ChallengeActivityType';
		id?: string | null;
		challenge_id?: string | null;
		activity_type_id?: string | null;
		activity_type?: { __typename?: 'ActivityType'; id?: string | null; name?: string | null } | null;
		challenge?: { __typename?: 'Challenge'; id?: string | null; title?: string | null } | null;
	}> | null;
};

export type CreateChallengeActivityTypeMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	activity_type_id: Types.Scalars['String']['input'];
}>;

export type CreateChallengeActivityTypeMutation = {
	__typename?: 'Mutation';
	createChallengeActivityType?: {
		__typename?: 'ChallengeActivityType';
		id?: string | null;
		challenge_id?: string | null;
		activity_type_id?: string | null;
		activity_type?: { __typename?: 'ActivityType'; id?: string | null; name?: string | null } | null;
		challenge?: { __typename?: 'Challenge'; id?: string | null; title?: string | null } | null;
	} | null;
};

export type DeleteChallengeActivityTypeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteChallengeActivityTypeMutation = {
	__typename?: 'Mutation';
	deleteChallengeActivityType?: { __typename?: 'ChallengeActivityType'; id?: string | null } | null;
};

export const ChallengeActivityTypeDetailsFragmentDoc = `
    fragment ChallengeActivityTypeDetails on ChallengeActivityType {
  id
  challenge_id
  activity_type_id
  activity_type {
    id
    name
  }
  challenge {
    id
    title
  }
}
    `;
export const GetChallengeActivityTypesDocument = `
    query GetChallengeActivityTypes($challenge_id: String) {
  challengeActivityTypes(challenge_id: $challenge_id) {
    ...ChallengeActivityTypeDetails
  }
}
    ${ChallengeActivityTypeDetailsFragmentDoc}`;

export const useGetChallengeActivityTypesQuery = <
	TData = GetChallengeActivityTypesQuery,
	TError = unknown,
>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetChallengeActivityTypesQueryVariables,
	options?: Omit<UseQueryOptions<GetChallengeActivityTypesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetChallengeActivityTypesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetChallengeActivityTypesQuery, TError, TData>({
		queryKey:
			variables === undefined
				? ['GetChallengeActivityTypes']
				: ['GetChallengeActivityTypes', variables],
		queryFn: fetcher<GetChallengeActivityTypesQuery, GetChallengeActivityTypesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetChallengeActivityTypesDocument,
			variables
		),
		...options,
	});
};

export const CreateChallengeActivityTypeDocument = `
    mutation CreateChallengeActivityType($challenge_id: String!, $activity_type_id: String!) {
  createChallengeActivityType(
    challenge_id: $challenge_id
    activity_type_id: $activity_type_id
  ) {
    ...ChallengeActivityTypeDetails
  }
}
    ${ChallengeActivityTypeDetailsFragmentDoc}`;

export const useCreateChallengeActivityTypeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateChallengeActivityTypeMutation,
		TError,
		CreateChallengeActivityTypeMutationVariables,
		TContext
	>
) => {
	return useMutation<
		CreateChallengeActivityTypeMutation,
		TError,
		CreateChallengeActivityTypeMutationVariables,
		TContext
	>({
		mutationKey: ['CreateChallengeActivityType'],
		mutationFn: (variables?: CreateChallengeActivityTypeMutationVariables) =>
			fetcher<CreateChallengeActivityTypeMutation, CreateChallengeActivityTypeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateChallengeActivityTypeDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteChallengeActivityTypeDocument = `
    mutation DeleteChallengeActivityType($id: String!) {
  deleteChallengeActivityType(id: $id) {
    id
  }
}
    `;

export const useDeleteChallengeActivityTypeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteChallengeActivityTypeMutation,
		TError,
		DeleteChallengeActivityTypeMutationVariables,
		TContext
	>
) => {
	return useMutation<
		DeleteChallengeActivityTypeMutation,
		TError,
		DeleteChallengeActivityTypeMutationVariables,
		TContext
	>({
		mutationKey: ['DeleteChallengeActivityType'],
		mutationFn: (variables?: DeleteChallengeActivityTypeMutationVariables) =>
			fetcher<DeleteChallengeActivityTypeMutation, DeleteChallengeActivityTypeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteChallengeActivityTypeDocument,
				variables
			)(),
		...options,
	});
};
