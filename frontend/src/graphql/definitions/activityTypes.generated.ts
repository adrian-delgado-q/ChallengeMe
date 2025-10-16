// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

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
export type ActivityTypeDetailsFragment = {
	__typename?: 'ActivityType';
	id?: string | null;
	name?: string | null;
	category?: string | null;
	unit?: string | null;
	unit_label?: string | null;
	description?: string | null;
	is_active?: boolean | null;
};

export type GetActivityTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetActivityTypesQuery = {
	__typename?: 'Query';
	activityTypes?: Array<{
		__typename?: 'ActivityType';
		id?: string | null;
		name?: string | null;
		category?: string | null;
		unit?: string | null;
		unit_label?: string | null;
		description?: string | null;
		is_active?: boolean | null;
	}> | null;
};

export type GetActivityTypeQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetActivityTypeQuery = {
	__typename?: 'Query';
	activityType?: {
		__typename?: 'ActivityType';
		id?: string | null;
		name?: string | null;
		category?: string | null;
		unit?: string | null;
		unit_label?: string | null;
		description?: string | null;
		is_active?: boolean | null;
	} | null;
};

export const ActivityTypeDetailsFragmentDoc = `
    fragment ActivityTypeDetails on ActivityType {
  id
  name
  category
  unit
  unit_label
  description
  is_active
}
    `;
export const GetActivityTypesDocument = `
    query GetActivityTypes {
  activityTypes {
    ...ActivityTypeDetails
  }
}
    ${ActivityTypeDetailsFragmentDoc}`;

export const useGetActivityTypesQuery = <TData = GetActivityTypesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetActivityTypesQueryVariables,
	options?: Omit<UseQueryOptions<GetActivityTypesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetActivityTypesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetActivityTypesQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetActivityTypes'] : ['GetActivityTypes', variables],
		queryFn: fetcher<GetActivityTypesQuery, GetActivityTypesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetActivityTypesDocument,
			variables
		),
		...options,
	});
};

export const GetActivityTypeDocument = `
    query GetActivityType($id: String!) {
  activityType(id: $id) {
    ...ActivityTypeDetails
  }
}
    ${ActivityTypeDetailsFragmentDoc}`;

export const useGetActivityTypeQuery = <TData = GetActivityTypeQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetActivityTypeQueryVariables,
	options?: Omit<UseQueryOptions<GetActivityTypeQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetActivityTypeQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetActivityTypeQuery, TError, TData>({
		queryKey: ['GetActivityType', variables],
		queryFn: fetcher<GetActivityTypeQuery, GetActivityTypeQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetActivityTypeDocument,
			variables
		),
		...options,
	});
};
