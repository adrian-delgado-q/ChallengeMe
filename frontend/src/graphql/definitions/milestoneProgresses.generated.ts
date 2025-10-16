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
export type MilestoneProgressDetailsFragment = {
	__typename?: 'MilestoneProgress';
	id?: string | null;
	milestone_id?: string | null;
	participant_id?: string | null;
	current_value?: number | null;
	is_achieved?: boolean | null;
	achieved_at?: string | null;
};

export type GetMilestoneProgressQueryVariables = Types.Exact<{
	milestone_id: Types.Scalars['String']['input'];
	participant_id: Types.Scalars['String']['input'];
}>;

export type GetMilestoneProgressQuery = {
	__typename?: 'Query';
	milestoneProgress?: Array<{
		__typename?: 'MilestoneProgress';
		id?: string | null;
		milestone_id?: string | null;
		participant_id?: string | null;
		current_value?: number | null;
		is_achieved?: boolean | null;
		achieved_at?: string | null;
	}> | null;
};

export type UpdateMilestoneProgressMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	current_value?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type UpdateMilestoneProgressMutation = {
	__typename?: 'Mutation';
	updateMilestoneProgress?: {
		__typename?: 'MilestoneProgress';
		id?: string | null;
		milestone_id?: string | null;
		participant_id?: string | null;
		current_value?: number | null;
		is_achieved?: boolean | null;
		achieved_at?: string | null;
	} | null;
};

export const MilestoneProgressDetailsFragmentDoc = `
    fragment MilestoneProgressDetails on MilestoneProgress {
  id
  milestone_id
  participant_id
  current_value
  is_achieved
  achieved_at
}
    `;
export const GetMilestoneProgressDocument = `
    query GetMilestoneProgress($milestone_id: String!, $participant_id: String!) {
  milestoneProgress(milestone_id: $milestone_id, participant_id: $participant_id) {
    ...MilestoneProgressDetails
  }
}
    ${MilestoneProgressDetailsFragmentDoc}`;

export const useGetMilestoneProgressQuery = <TData = GetMilestoneProgressQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetMilestoneProgressQueryVariables,
	options?: Omit<UseQueryOptions<GetMilestoneProgressQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetMilestoneProgressQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetMilestoneProgressQuery, TError, TData>({
		queryKey: ['GetMilestoneProgress', variables],
		queryFn: fetcher<GetMilestoneProgressQuery, GetMilestoneProgressQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetMilestoneProgressDocument,
			variables
		),
		...options,
	});
};

export const UpdateMilestoneProgressDocument = `
    mutation UpdateMilestoneProgress($id: String!, $current_value: Int) {
  updateMilestoneProgress(id: $id, current_value: $current_value) {
    ...MilestoneProgressDetails
  }
}
    ${MilestoneProgressDetailsFragmentDoc}`;

export const useUpdateMilestoneProgressMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateMilestoneProgressMutation,
		TError,
		UpdateMilestoneProgressMutationVariables,
		TContext
	>
) => {
	return useMutation<
		UpdateMilestoneProgressMutation,
		TError,
		UpdateMilestoneProgressMutationVariables,
		TContext
	>({
		mutationKey: ['UpdateMilestoneProgress'],
		mutationFn: (variables?: UpdateMilestoneProgressMutationVariables) =>
			fetcher<UpdateMilestoneProgressMutation, UpdateMilestoneProgressMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateMilestoneProgressDocument,
				variables
			)(),
		...options,
	});
};
