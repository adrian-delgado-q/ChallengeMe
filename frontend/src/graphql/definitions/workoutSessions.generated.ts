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
export type WorkoutSessionDetailsFragment = {
	__typename?: 'WorkoutSession';
	id?: string | null;
	workout_id?: string | null;
	profile_id?: string | null;
	session_date?: string | null;
	notes?: string | null;
	created_at?: string | null;
};

export type GetWorkoutSessionQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetWorkoutSessionQuery = {
	__typename?: 'Query';
	workoutSession?: {
		__typename?: 'WorkoutSession';
		id?: string | null;
		workout_id?: string | null;
		profile_id?: string | null;
		session_date?: string | null;
		notes?: string | null;
		created_at?: string | null;
	} | null;
};

export type GetWorkoutSessionsQueryVariables = Types.Exact<{
	profile_id: Types.Scalars['String']['input'];
	workout_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetWorkoutSessionsQuery = {
	__typename?: 'Query';
	workoutSessions?: Array<{
		__typename?: 'WorkoutSession';
		id?: string | null;
		workout_id?: string | null;
		profile_id?: string | null;
		session_date?: string | null;
		notes?: string | null;
		created_at?: string | null;
	}> | null;
};

export type StartWorkoutSessionMutationVariables = Types.Exact<{
	workout_id: Types.Scalars['String']['input'];
	profile_id: Types.Scalars['String']['input'];
	session_date?: Types.InputMaybe<Types.Scalars['Date']['input']>;
}>;

export type StartWorkoutSessionMutation = {
	__typename?: 'Mutation';
	startWorkoutSession?: {
		__typename?: 'WorkoutSession';
		id?: string | null;
		workout_id?: string | null;
		profile_id?: string | null;
		session_date?: string | null;
		notes?: string | null;
		created_at?: string | null;
	} | null;
};

export type LogWorkoutActivityMutationVariables = Types.Exact<{
	session_id: Types.Scalars['String']['input'];
	activity_type_id: Types.Scalars['String']['input'];
	value: Types.Scalars['Float']['input'];
	notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type LogWorkoutActivityMutation = {
	__typename?: 'Mutation';
	logWorkoutActivity?: { __typename?: 'Activity'; id?: string | null } | null;
};

export type CompleteWorkoutSessionMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CompleteWorkoutSessionMutation = {
	__typename?: 'Mutation';
	completeWorkoutSession?: {
		__typename?: 'WorkoutSession';
		id?: string | null;
		workout_id?: string | null;
		profile_id?: string | null;
		session_date?: string | null;
		notes?: string | null;
		created_at?: string | null;
	} | null;
};

export const WorkoutSessionDetailsFragmentDoc = `
    fragment WorkoutSessionDetails on WorkoutSession {
  id
  workout_id
  profile_id
  session_date
  notes
  created_at
}
    `;
export const GetWorkoutSessionDocument = `
    query GetWorkoutSession($id: String!) {
  workoutSession(id: $id) {
    ...WorkoutSessionDetails
  }
}
    ${WorkoutSessionDetailsFragmentDoc}`;

export const useGetWorkoutSessionQuery = <TData = GetWorkoutSessionQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetWorkoutSessionQueryVariables,
	options?: Omit<UseQueryOptions<GetWorkoutSessionQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetWorkoutSessionQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetWorkoutSessionQuery, TError, TData>({
		queryKey: ['GetWorkoutSession', variables],
		queryFn: fetcher<GetWorkoutSessionQuery, GetWorkoutSessionQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetWorkoutSessionDocument,
			variables
		),
		...options,
	});
};

export const GetWorkoutSessionsDocument = `
    query GetWorkoutSessions($profile_id: String!, $workout_id: String) {
  workoutSessions(profile_id: $profile_id, workout_id: $workout_id) {
    ...WorkoutSessionDetails
  }
}
    ${WorkoutSessionDetailsFragmentDoc}`;

export const useGetWorkoutSessionsQuery = <TData = GetWorkoutSessionsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetWorkoutSessionsQueryVariables,
	options?: Omit<UseQueryOptions<GetWorkoutSessionsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetWorkoutSessionsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetWorkoutSessionsQuery, TError, TData>({
		queryKey: ['GetWorkoutSessions', variables],
		queryFn: fetcher<GetWorkoutSessionsQuery, GetWorkoutSessionsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetWorkoutSessionsDocument,
			variables
		),
		...options,
	});
};

export const StartWorkoutSessionDocument = `
    mutation StartWorkoutSession($workout_id: String!, $profile_id: String!, $session_date: Date) {
  startWorkoutSession(
    workout_id: $workout_id
    profile_id: $profile_id
    session_date: $session_date
  ) {
    ...WorkoutSessionDetails
  }
}
    ${WorkoutSessionDetailsFragmentDoc}`;

export const useStartWorkoutSessionMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		StartWorkoutSessionMutation,
		TError,
		StartWorkoutSessionMutationVariables,
		TContext
	>
) => {
	return useMutation<
		StartWorkoutSessionMutation,
		TError,
		StartWorkoutSessionMutationVariables,
		TContext
	>({
		mutationKey: ['StartWorkoutSession'],
		mutationFn: (variables?: StartWorkoutSessionMutationVariables) =>
			fetcher<StartWorkoutSessionMutation, StartWorkoutSessionMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				StartWorkoutSessionDocument,
				variables
			)(),
		...options,
	});
};

export const LogWorkoutActivityDocument = `
    mutation LogWorkoutActivity($session_id: String!, $activity_type_id: String!, $value: Float!, $notes: String) {
  logWorkoutActivity(
    session_id: $session_id
    activity_type_id: $activity_type_id
    value: $value
    notes: $notes
  ) {
    id
  }
}
    `;

export const useLogWorkoutActivityMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		LogWorkoutActivityMutation,
		TError,
		LogWorkoutActivityMutationVariables,
		TContext
	>
) => {
	return useMutation<
		LogWorkoutActivityMutation,
		TError,
		LogWorkoutActivityMutationVariables,
		TContext
	>({
		mutationKey: ['LogWorkoutActivity'],
		mutationFn: (variables?: LogWorkoutActivityMutationVariables) =>
			fetcher<LogWorkoutActivityMutation, LogWorkoutActivityMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				LogWorkoutActivityDocument,
				variables
			)(),
		...options,
	});
};

export const CompleteWorkoutSessionDocument = `
    mutation CompleteWorkoutSession($id: String!, $notes: String) {
  completeWorkoutSession(id: $id, notes: $notes) {
    ...WorkoutSessionDetails
  }
}
    ${WorkoutSessionDetailsFragmentDoc}`;

export const useCompleteWorkoutSessionMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CompleteWorkoutSessionMutation,
		TError,
		CompleteWorkoutSessionMutationVariables,
		TContext
	>
) => {
	return useMutation<
		CompleteWorkoutSessionMutation,
		TError,
		CompleteWorkoutSessionMutationVariables,
		TContext
	>({
		mutationKey: ['CompleteWorkoutSession'],
		mutationFn: (variables?: CompleteWorkoutSessionMutationVariables) =>
			fetcher<CompleteWorkoutSessionMutation, CompleteWorkoutSessionMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CompleteWorkoutSessionDocument,
				variables
			)(),
		...options,
	});
};
