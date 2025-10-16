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
export type XpLogBasicFragment = {
	__typename?: 'XPLog';
	id?: string | null;
	source_type?: Types.XpSourceType | null;
	source_id?: string | null;
	points?: number | null;
	description?: string | null;
	created_at?: string | null;
};

export type XpLogWithProfileFragment = {
	__typename?: 'XPLog';
	id?: string | null;
	source_type?: Types.XpSourceType | null;
	source_id?: string | null;
	points?: number | null;
	description?: string | null;
	created_at?: string | null;
	profile?: {
		__typename?: 'Profile';
		id?: string | null;
		username?: string | null;
		avatar_url?: string | null;
	} | null;
};

export type GetXpLogsQueryVariables = Types.Exact<{
	profile_id: Types.Scalars['String']['input'];
}>;

export type GetXpLogsQuery = {
	__typename?: 'Query';
	xpLogs?: Array<{
		__typename?: 'XPLog';
		id?: string | null;
		source_type?: Types.XpSourceType | null;
		source_id?: string | null;
		points?: number | null;
		description?: string | null;
		created_at?: string | null;
		profile?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	}> | null;
};

export const XpLogBasicFragmentDoc = `
    fragment XPLogBasic on XPLog {
  id
  source_type
  source_id
  points
  description
  created_at
}
    `;
export const XpLogWithProfileFragmentDoc = `
    fragment XPLogWithProfile on XPLog {
  ...XPLogBasic
  profile {
    id
    username
    avatar_url
  }
}
    `;
export const GetXpLogsDocument = `
    query GetXPLogs($profile_id: String!) {
  xpLogs(profile_id: $profile_id) {
    ...XPLogWithProfile
  }
}
    ${XpLogWithProfileFragmentDoc}
${XpLogBasicFragmentDoc}`;

export const useGetXpLogsQuery = <TData = GetXpLogsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetXpLogsQueryVariables,
	options?: Omit<UseQueryOptions<GetXpLogsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetXpLogsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetXpLogsQuery, TError, TData>({
		queryKey: ['GetXPLogs', variables],
		queryFn: fetcher<GetXpLogsQuery, GetXpLogsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetXpLogsDocument,
			variables
		),
		...options,
	});
};
