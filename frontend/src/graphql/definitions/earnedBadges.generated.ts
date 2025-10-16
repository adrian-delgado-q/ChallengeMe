// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import { BadgeBasicFragmentDoc } from './badges.generated';
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
export type EarnedBadgeBasicFragment = {
	__typename?: 'EarnedBadge';
	id?: string | null;
	earned_at?: string | null;
};

export type EarnedBadgeWithRelationsFragment = {
	__typename?: 'EarnedBadge';
	id?: string | null;
	earned_at?: string | null;
	profile?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
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

export type GetEarnedBadgesQueryVariables = Types.Exact<{
	profile_id: Types.Scalars['String']['input'];
}>;

export type GetEarnedBadgesQuery = {
	__typename?: 'Query';
	earnedBadges?: Array<{
		__typename?: 'EarnedBadge';
		id?: string | null;
		earned_at?: string | null;
		profile?: { __typename?: 'Profile'; id?: string | null; username?: string | null } | null;
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
	}> | null;
};

export const EarnedBadgeBasicFragmentDoc = `
    fragment EarnedBadgeBasic on EarnedBadge {
  id
  earned_at
}
    `;
export const EarnedBadgeWithRelationsFragmentDoc = `
    fragment EarnedBadgeWithRelations on EarnedBadge {
  ...EarnedBadgeBasic
  profile {
    id
    username
  }
  badge {
    ...BadgeBasic
  }
}
    `;
export const GetEarnedBadgesDocument = `
    query GetEarnedBadges($profile_id: String!) {
  earnedBadges(profile_id: $profile_id) {
    ...EarnedBadgeWithRelations
  }
}
    ${EarnedBadgeWithRelationsFragmentDoc}
${EarnedBadgeBasicFragmentDoc}
${BadgeBasicFragmentDoc}`;

export const useGetEarnedBadgesQuery = <TData = GetEarnedBadgesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetEarnedBadgesQueryVariables,
	options?: Omit<UseQueryOptions<GetEarnedBadgesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetEarnedBadgesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetEarnedBadgesQuery, TError, TData>({
		queryKey: ['GetEarnedBadges', variables],
		queryFn: fetcher<GetEarnedBadgesQuery, GetEarnedBadgesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetEarnedBadgesDocument,
			variables
		),
		...options,
	});
};
