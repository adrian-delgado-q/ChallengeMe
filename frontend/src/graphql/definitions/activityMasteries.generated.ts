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
export type ActivityMasteryBasicFragment = {
	__typename?: 'ActivityMastery';
	id?: string | null;
	total_value?: number | null;
	mastery_tier?: Types.MasteryTier | null;
	created_at?: string | null;
	updated_at?: string | null;
};

export type ActivityMasteryWithRelationsFragment = {
	__typename?: 'ActivityMastery';
	id?: string | null;
	total_value?: number | null;
	mastery_tier?: Types.MasteryTier | null;
	created_at?: string | null;
	updated_at?: string | null;
	profile?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
	activity_type?: {
		__typename?: 'ActivityType';
		id?: string | null;
		name?: string | null;
		category?: string | null;
	} | null;
};

export type GetActivityMasteryQueryVariables = Types.Exact<{
	profile_id: Types.Scalars['String']['input'];
	activity_type_id: Types.Scalars['String']['input'];
}>;

export type GetActivityMasteryQuery = {
	__typename?: 'Query';
	activityMastery?: {
		__typename?: 'ActivityMastery';
		id?: string | null;
		total_value?: number | null;
		mastery_tier?: Types.MasteryTier | null;
		created_at?: string | null;
		updated_at?: string | null;
		profile?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
		activity_type?: {
			__typename?: 'ActivityType';
			id?: string | null;
			name?: string | null;
			category?: string | null;
		} | null;
	} | null;
};

export type GetActivityMasteriesQueryVariables = Types.Exact<{
	profile_id: Types.Scalars['String']['input'];
}>;

export type GetActivityMasteriesQuery = {
	__typename?: 'Query';
	activityMasteries?: Array<{
		__typename?: 'ActivityMastery';
		id?: string | null;
		total_value?: number | null;
		mastery_tier?: Types.MasteryTier | null;
		created_at?: string | null;
		updated_at?: string | null;
		profile?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
		activity_type?: {
			__typename?: 'ActivityType';
			id?: string | null;
			name?: string | null;
			category?: string | null;
		} | null;
	}> | null;
};

export const ActivityMasteryBasicFragmentDoc = `
    fragment ActivityMasteryBasic on ActivityMastery {
  id
  total_value
  mastery_tier
  created_at
  updated_at
}
    `;
export const ActivityMasteryWithRelationsFragmentDoc = `
    fragment ActivityMasteryWithRelations on ActivityMastery {
  ...ActivityMasteryBasic
  profile {
    id
    username
  }
  activity_type {
    id
    name
    category
  }
}
    `;
export const GetActivityMasteryDocument = `
    query GetActivityMastery($profile_id: String!, $activity_type_id: String!) {
  activityMastery(profile_id: $profile_id, activity_type_id: $activity_type_id) {
    ...ActivityMasteryWithRelations
  }
}
    ${ActivityMasteryWithRelationsFragmentDoc}
${ActivityMasteryBasicFragmentDoc}`;

export const useGetActivityMasteryQuery = <TData = GetActivityMasteryQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetActivityMasteryQueryVariables,
	options?: Omit<UseQueryOptions<GetActivityMasteryQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetActivityMasteryQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetActivityMasteryQuery, TError, TData>({
		queryKey: ['GetActivityMastery', variables],
		queryFn: fetcher<GetActivityMasteryQuery, GetActivityMasteryQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetActivityMasteryDocument,
			variables
		),
		...options,
	});
};

export const GetActivityMasteriesDocument = `
    query GetActivityMasteries($profile_id: String!) {
  activityMasteries(profile_id: $profile_id) {
    ...ActivityMasteryWithRelations
  }
}
    ${ActivityMasteryWithRelationsFragmentDoc}
${ActivityMasteryBasicFragmentDoc}`;

export const useGetActivityMasteriesQuery = <TData = GetActivityMasteriesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetActivityMasteriesQueryVariables,
	options?: Omit<UseQueryOptions<GetActivityMasteriesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetActivityMasteriesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetActivityMasteriesQuery, TError, TData>({
		queryKey: ['GetActivityMasteries', variables],
		queryFn: fetcher<GetActivityMasteriesQuery, GetActivityMasteriesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetActivityMasteriesDocument,
			variables
		),
		...options,
	});
};
