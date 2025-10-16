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
export type WorkoutDetailsFragment = {
	__typename?: 'Workout';
	id?: string | null;
	creator_id?: string | null;
	team_id?: string | null;
	name?: string | null;
	description?: string | null;
	is_team_workout?: boolean | null;
	created_at?: string | null;
	updated_at?: string | null;
	generated_by_ai?: boolean | null;
	ai_model?: string | null;
	ai_raw_response?: any | null;
};

export type GetWorkoutQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetWorkoutQuery = {
	__typename?: 'Query';
	workout?: {
		__typename?: 'Workout';
		id?: string | null;
		creator_id?: string | null;
		team_id?: string | null;
		name?: string | null;
		description?: string | null;
		is_team_workout?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		generated_by_ai?: boolean | null;
		ai_model?: string | null;
		ai_raw_response?: any | null;
	} | null;
};

export type GetWorkoutsQueryVariables = Types.Exact<{
	creator_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
	team_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetWorkoutsQuery = {
	__typename?: 'Query';
	workouts?: Array<{
		__typename?: 'Workout';
		id?: string | null;
		creator_id?: string | null;
		team_id?: string | null;
		name?: string | null;
		description?: string | null;
		is_team_workout?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		generated_by_ai?: boolean | null;
		ai_model?: string | null;
		ai_raw_response?: any | null;
	}> | null;
};

export type CreateWorkoutMutationVariables = Types.Exact<{
	creator_id: Types.Scalars['String']['input'];
	name: Types.Scalars['String']['input'];
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	team_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
	is_team_workout?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;

export type CreateWorkoutMutation = {
	__typename?: 'Mutation';
	createWorkout?: {
		__typename?: 'Workout';
		id?: string | null;
		creator_id?: string | null;
		team_id?: string | null;
		name?: string | null;
		description?: string | null;
		is_team_workout?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		generated_by_ai?: boolean | null;
		ai_model?: string | null;
		ai_raw_response?: any | null;
	} | null;
};

export type UpdateWorkoutMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	name?: Types.InputMaybe<Types.Scalars['String']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type UpdateWorkoutMutation = {
	__typename?: 'Mutation';
	updateWorkout?: {
		__typename?: 'Workout';
		id?: string | null;
		creator_id?: string | null;
		team_id?: string | null;
		name?: string | null;
		description?: string | null;
		is_team_workout?: boolean | null;
		created_at?: string | null;
		updated_at?: string | null;
		generated_by_ai?: boolean | null;
		ai_model?: string | null;
		ai_raw_response?: any | null;
	} | null;
};

export type DeleteWorkoutMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteWorkoutMutation = {
	__typename?: 'Mutation';
	deleteWorkout?: { __typename?: 'Workout'; id?: string | null } | null;
};

export const WorkoutDetailsFragmentDoc = `
    fragment WorkoutDetails on Workout {
  id
  creator_id
  team_id
  name
  description
  is_team_workout
  created_at
  updated_at
  generated_by_ai
  ai_model
  ai_raw_response
}
    `;
export const GetWorkoutDocument = `
    query GetWorkout($id: String!) {
  workout(id: $id) {
    ...WorkoutDetails
  }
}
    ${WorkoutDetailsFragmentDoc}`;

export const useGetWorkoutQuery = <TData = GetWorkoutQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetWorkoutQueryVariables,
	options?: Omit<UseQueryOptions<GetWorkoutQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetWorkoutQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetWorkoutQuery, TError, TData>({
		queryKey: ['GetWorkout', variables],
		queryFn: fetcher<GetWorkoutQuery, GetWorkoutQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetWorkoutDocument,
			variables
		),
		...options,
	});
};

export const GetWorkoutsDocument = `
    query GetWorkouts($creator_id: String, $team_id: String) {
  workouts(creator_id: $creator_id, team_id: $team_id) {
    ...WorkoutDetails
  }
}
    ${WorkoutDetailsFragmentDoc}`;

export const useGetWorkoutsQuery = <TData = GetWorkoutsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetWorkoutsQueryVariables,
	options?: Omit<UseQueryOptions<GetWorkoutsQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetWorkoutsQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetWorkoutsQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetWorkouts'] : ['GetWorkouts', variables],
		queryFn: fetcher<GetWorkoutsQuery, GetWorkoutsQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetWorkoutsDocument,
			variables
		),
		...options,
	});
};

export const CreateWorkoutDocument = `
    mutation CreateWorkout($creator_id: String!, $name: String!, $description: String, $team_id: String, $is_team_workout: Boolean) {
  createWorkout(
    creator_id: $creator_id
    name: $name
    description: $description
    team_id: $team_id
    is_team_workout: $is_team_workout
  ) {
    ...WorkoutDetails
  }
}
    ${WorkoutDetailsFragmentDoc}`;

export const useCreateWorkoutMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateWorkoutMutation,
		TError,
		CreateWorkoutMutationVariables,
		TContext
	>
) => {
	return useMutation<CreateWorkoutMutation, TError, CreateWorkoutMutationVariables, TContext>({
		mutationKey: ['CreateWorkout'],
		mutationFn: (variables?: CreateWorkoutMutationVariables) =>
			fetcher<CreateWorkoutMutation, CreateWorkoutMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateWorkoutDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateWorkoutDocument = `
    mutation UpdateWorkout($id: String!, $name: String, $description: String) {
  updateWorkout(id: $id, name: $name, description: $description) {
    ...WorkoutDetails
  }
}
    ${WorkoutDetailsFragmentDoc}`;

export const useUpdateWorkoutMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateWorkoutMutation,
		TError,
		UpdateWorkoutMutationVariables,
		TContext
	>
) => {
	return useMutation<UpdateWorkoutMutation, TError, UpdateWorkoutMutationVariables, TContext>({
		mutationKey: ['UpdateWorkout'],
		mutationFn: (variables?: UpdateWorkoutMutationVariables) =>
			fetcher<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateWorkoutDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteWorkoutDocument = `
    mutation DeleteWorkout($id: String!) {
  deleteWorkout(id: $id) {
    id
  }
}
    `;

export const useDeleteWorkoutMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteWorkoutMutation,
		TError,
		DeleteWorkoutMutationVariables,
		TContext
	>
) => {
	return useMutation<DeleteWorkoutMutation, TError, DeleteWorkoutMutationVariables, TContext>({
		mutationKey: ['DeleteWorkout'],
		mutationFn: (variables?: DeleteWorkoutMutationVariables) =>
			fetcher<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteWorkoutDocument,
				variables
			)(),
		...options,
	});
};
