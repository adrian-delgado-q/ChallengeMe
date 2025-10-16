// THIS FILE IS GENERATED, DO NOT EDIT!
import type * as Types from '../generated/graphql';

import { ChallengeParticipantDetailsFragmentDoc } from './challengeParticipants.generated';
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
export type ChallengeCreatorFragment = {
	__typename?: 'Profile';
	id?: string | null;
	username?: string | null;
	avatar_url?: string | null;
};

export type ChallengeMilestoneFragment = {
	__typename?: 'Milestone';
	id?: string | null;
	name?: string | null;
	target_value?: number | null;
	order?: number | null;
	activity_type?: {
		__typename?: 'ActivityType';
		id?: string | null;
		name?: string | null;
		unit?: string | null;
		unit_label?: string | null;
	} | null;
};

export type ChallengeActivityTypeFragment = {
	__typename?: 'ChallengeActivityType';
	id?: string | null;
	activity_type_id?: string | null;
	activity_type?: {
		__typename?: 'ActivityType';
		id?: string | null;
		name?: string | null;
		category?: string | null;
		unit?: string | null;
		unit_label?: string | null;
		description?: string | null;
	} | null;
};

export type ChallengeBasicFragment = {
	__typename?: 'Challenge';
	id?: string | null;
	title?: string | null;
	description?: string | null;
	instructions?: string | null;
	image_url?: string | null;
	challenge_type?: Types.ChallengeParticipantType | null;
	max_participants?: number | null;
	participant_count?: number | null;
	max_team_size?: number | null;
	start_date?: string | null;
	end_date?: string | null;
	is_public?: boolean | null;
	access_code?: string | null;
	status?: Types.ChallengeStatus | null;
	created_at?: string | null;
	expires_at?: string | null;
};

export type ChallengeFullFragment = {
	__typename?: 'Challenge';
	id?: string | null;
	title?: string | null;
	description?: string | null;
	instructions?: string | null;
	image_url?: string | null;
	challenge_type?: Types.ChallengeParticipantType | null;
	max_participants?: number | null;
	participant_count?: number | null;
	max_team_size?: number | null;
	start_date?: string | null;
	end_date?: string | null;
	is_public?: boolean | null;
	access_code?: string | null;
	status?: Types.ChallengeStatus | null;
	created_at?: string | null;
	expires_at?: string | null;
	creator?: {
		__typename?: 'Profile';
		id?: string | null;
		username?: string | null;
		avatar_url?: string | null;
	} | null;
	milestones?: Array<{
		__typename?: 'Milestone';
		id?: string | null;
		name?: string | null;
		target_value?: number | null;
		order?: number | null;
		activity_type?: {
			__typename?: 'ActivityType';
			id?: string | null;
			name?: string | null;
			unit?: string | null;
			unit_label?: string | null;
		} | null;
	}> | null;
	supported_activities?: Array<{
		__typename?: 'ChallengeActivityType';
		id?: string | null;
		activity_type_id?: string | null;
		activity_type?: {
			__typename?: 'ActivityType';
			id?: string | null;
			name?: string | null;
			category?: string | null;
			unit?: string | null;
			unit_label?: string | null;
			description?: string | null;
		} | null;
	}> | null;
};

export type GetChallengesQueryVariables = Types.Exact<{
	creator_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
	status?: Types.InputMaybe<Types.Scalars['String']['input']>;
	is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
	challenge_type?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetChallengesQuery = {
	__typename?: 'Query';
	challenges?: Array<{
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	}> | null;
};

export type GetChallengeQueryVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type GetChallengeQuery = {
	__typename?: 'Query';
	challenge?: {
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		participants?: Array<{
			__typename?: 'ChallengeParticipant';
			id?: string | null;
			user_id?: string | null;
			team_id?: string | null;
			joined_at?: string | null;
			team?: {
				__typename?: 'Team';
				id?: string | null;
				name?: string | null;
				avatar_url?: string | null;
			} | null;
			user?: {
				__typename?: 'Profile';
				id?: string | null;
				username?: string | null;
				avatar_url?: string | null;
			} | null;
		}> | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type GetMyChallengesQueryVariables = Types.Exact<{
	user_id: Types.Scalars['String']['input'];
}>;

export type GetMyChallengesQuery = {
	__typename?: 'Query';
	challenges?: Array<{
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	}> | null;
};

export type GetPublicChallengesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetPublicChallengesQuery = {
	__typename?: 'Query';
	challenges?: Array<{
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	}> | null;
};

export type GetUserChallengeParticipationQueryVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	user_id: Types.Scalars['String']['input'];
}>;

export type GetUserChallengeParticipationQuery = {
	__typename?: 'Query';
	challengeParticipants?: Array<{
		__typename?: 'ChallengeParticipant';
		id?: string | null;
		user_id?: string | null;
		team_id?: string | null;
		joined_at?: string | null;
		team?: {
			__typename?: 'Team';
			id?: string | null;
			name?: string | null;
			avatar_url?: string | null;
		} | null;
		user?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	}> | null;
};

export type CreateChallengeMutationVariables = Types.Exact<{
	creator_id: Types.Scalars['String']['input'];
	title: Types.Scalars['String']['input'];
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	instructions?: Types.InputMaybe<Types.Scalars['String']['input']>;
	image_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
	challenge_type?: Types.InputMaybe<Types.Scalars['String']['input']>;
	max_participants?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	start_date: Types.Scalars['Date']['input'];
	end_date: Types.Scalars['Date']['input'];
	is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
	access_code?: Types.InputMaybe<Types.Scalars['String']['input']>;
	expires_at?: Types.InputMaybe<Types.Scalars['Date']['input']>;
	max_team_size?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type CreateChallengeMutation = {
	__typename?: 'Mutation';
	createChallenge?: {
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type UpdateChallengeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	title?: Types.InputMaybe<Types.Scalars['String']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	instructions?: Types.InputMaybe<Types.Scalars['String']['input']>;
	image_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
	max_participants?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	is_public?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
	access_code?: Types.InputMaybe<Types.Scalars['String']['input']>;
	status?: Types.InputMaybe<Types.Scalars['String']['input']>;
	max_team_size?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type UpdateChallengeMutation = {
	__typename?: 'Mutation';
	updateChallenge?: {
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type DeleteChallengeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type DeleteChallengeMutation = {
	__typename?: 'Mutation';
	deleteChallenge?: { __typename?: 'Challenge'; id?: string | null } | null;
};

export type UpdateChallengeStatusMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
	status: Types.Scalars['String']['input'];
}>;

export type UpdateChallengeStatusMutation = {
	__typename?: 'Mutation';
	updateChallenge?: {
		__typename?: 'Challenge';
		id?: string | null;
		title?: string | null;
		description?: string | null;
		instructions?: string | null;
		image_url?: string | null;
		challenge_type?: Types.ChallengeParticipantType | null;
		max_participants?: number | null;
		participant_count?: number | null;
		max_team_size?: number | null;
		start_date?: string | null;
		end_date?: string | null;
		is_public?: boolean | null;
		access_code?: string | null;
		status?: Types.ChallengeStatus | null;
		created_at?: string | null;
		expires_at?: string | null;
		creator?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
		milestones?: Array<{
			__typename?: 'Milestone';
			id?: string | null;
			name?: string | null;
			target_value?: number | null;
			order?: number | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				unit?: string | null;
				unit_label?: string | null;
			} | null;
		}> | null;
		supported_activities?: Array<{
			__typename?: 'ChallengeActivityType';
			id?: string | null;
			activity_type_id?: string | null;
			activity_type?: {
				__typename?: 'ActivityType';
				id?: string | null;
				name?: string | null;
				category?: string | null;
				unit?: string | null;
				unit_label?: string | null;
				description?: string | null;
			} | null;
		}> | null;
	} | null;
};

export type JoinChallengeMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	user_id: Types.Scalars['String']['input'];
}>;

export type JoinChallengeMutation = {
	__typename?: 'Mutation';
	createChallengeParticipant?: {
		__typename?: 'ChallengeParticipant';
		id?: string | null;
		user_id?: string | null;
		team_id?: string | null;
		joined_at?: string | null;
		team?: {
			__typename?: 'Team';
			id?: string | null;
			name?: string | null;
			avatar_url?: string | null;
		} | null;
		user?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	} | null;
};

export type JoinChallengeAsTeamMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	team_id: Types.Scalars['String']['input'];
}>;

export type JoinChallengeAsTeamMutation = {
	__typename?: 'Mutation';
	createChallengeParticipant?: {
		__typename?: 'ChallengeParticipant';
		id?: string | null;
		user_id?: string | null;
		team_id?: string | null;
		joined_at?: string | null;
		team?: {
			__typename?: 'Team';
			id?: string | null;
			name?: string | null;
			avatar_url?: string | null;
		} | null;
		user?: {
			__typename?: 'Profile';
			id?: string | null;
			username?: string | null;
			avatar_url?: string | null;
		} | null;
	} | null;
};

export type LeaveChallengeMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type LeaveChallengeMutation = {
	__typename?: 'Mutation';
	deleteChallengeParticipant?: { __typename?: 'ChallengeParticipant'; id?: string | null } | null;
};

export type RemoveChallengeParticipantMutationVariables = Types.Exact<{
	id: Types.Scalars['String']['input'];
}>;

export type RemoveChallengeParticipantMutation = {
	__typename?: 'Mutation';
	deleteChallengeParticipant?: { __typename?: 'ChallengeParticipant'; id?: string | null } | null;
};

export type AddChallengeActivityTypeMutationVariables = Types.Exact<{
	challenge_id: Types.Scalars['String']['input'];
	activity_type_id: Types.Scalars['String']['input'];
}>;

export type AddChallengeActivityTypeMutation = {
	__typename?: 'Mutation';
	createChallengeActivityType?: {
		__typename?: 'ChallengeActivityType';
		id?: string | null;
		challenge_id?: string | null;
		activity_type_id?: string | null;
		activity_type?: {
			__typename?: 'ActivityType';
			id?: string | null;
			name?: string | null;
			category?: string | null;
			unit?: string | null;
			unit_label?: string | null;
		} | null;
	} | null;
};

export const ChallengeBasicFragmentDoc = `
    fragment ChallengeBasic on Challenge {
  id
  title
  description
  instructions
  image_url
  challenge_type
  max_participants
  participant_count
  max_team_size
  start_date
  end_date
  is_public
  access_code
  status
  created_at
  expires_at
}
    `;
export const ChallengeCreatorFragmentDoc = `
    fragment ChallengeCreator on Profile {
  id
  username
  avatar_url
}
    `;
export const ChallengeMilestoneFragmentDoc = `
    fragment ChallengeMilestone on Milestone {
  id
  name
  target_value
  order
  activity_type {
    id
    name
    unit
    unit_label
  }
}
    `;
export const ChallengeActivityTypeFragmentDoc = `
    fragment ChallengeActivityType on ChallengeActivityType {
  id
  activity_type_id
  activity_type {
    id
    name
    category
    unit
    unit_label
    description
  }
}
    `;
export const ChallengeFullFragmentDoc = `
    fragment ChallengeFull on Challenge {
  ...ChallengeBasic
  creator {
    ...ChallengeCreator
  }
  milestones {
    ...ChallengeMilestone
  }
  supported_activities {
    ...ChallengeActivityType
  }
}
    `;
export const GetChallengesDocument = `
    query GetChallenges($creator_id: String, $status: String, $is_public: Boolean, $challenge_type: String) {
  challenges(
    creator_id: $creator_id
    status: $status
    is_public: $is_public
    challenge_type: $challenge_type
  ) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useGetChallengesQuery = <TData = GetChallengesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetChallengesQueryVariables,
	options?: Omit<UseQueryOptions<GetChallengesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetChallengesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetChallengesQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetChallenges'] : ['GetChallenges', variables],
		queryFn: fetcher<GetChallengesQuery, GetChallengesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetChallengesDocument,
			variables
		),
		...options,
	});
};

export const GetChallengeDocument = `
    query GetChallenge($id: String!) {
  challenge(id: $id) {
    ...ChallengeFull
    participants {
      ...ChallengeParticipantDetails
    }
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}
${ChallengeParticipantDetailsFragmentDoc}`;

export const useGetChallengeQuery = <TData = GetChallengeQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetChallengeQueryVariables,
	options?: Omit<UseQueryOptions<GetChallengeQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetChallengeQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetChallengeQuery, TError, TData>({
		queryKey: ['GetChallenge', variables],
		queryFn: fetcher<GetChallengeQuery, GetChallengeQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetChallengeDocument,
			variables
		),
		...options,
	});
};

export const GetMyChallengesDocument = `
    query GetMyChallenges($user_id: String!) {
  challenges(creator_id: $user_id) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useGetMyChallengesQuery = <TData = GetMyChallengesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetMyChallengesQueryVariables,
	options?: Omit<UseQueryOptions<GetMyChallengesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetMyChallengesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetMyChallengesQuery, TError, TData>({
		queryKey: ['GetMyChallenges', variables],
		queryFn: fetcher<GetMyChallengesQuery, GetMyChallengesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetMyChallengesDocument,
			variables
		),
		...options,
	});
};

export const GetPublicChallengesDocument = `
    query GetPublicChallenges {
  challenges(is_public: true, status: "ACTIVE") {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useGetPublicChallengesQuery = <TData = GetPublicChallengesQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetPublicChallengesQueryVariables,
	options?: Omit<UseQueryOptions<GetPublicChallengesQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetPublicChallengesQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetPublicChallengesQuery, TError, TData>({
		queryKey: variables === undefined ? ['GetPublicChallenges'] : ['GetPublicChallenges', variables],
		queryFn: fetcher<GetPublicChallengesQuery, GetPublicChallengesQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetPublicChallengesDocument,
			variables
		),
		...options,
	});
};

export const GetUserChallengeParticipationDocument = `
    query GetUserChallengeParticipation($challenge_id: String!, $user_id: String!) {
  challengeParticipants(challenge_id: $challenge_id, user_id: $user_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export const useGetUserChallengeParticipationQuery = <
	TData = GetUserChallengeParticipationQuery,
	TError = unknown,
>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables: GetUserChallengeParticipationQueryVariables,
	options?: Omit<UseQueryOptions<GetUserChallengeParticipationQuery, TError, TData>, 'queryKey'> & {
		queryKey?: UseQueryOptions<GetUserChallengeParticipationQuery, TError, TData>['queryKey'];
	}
) => {
	return useQuery<GetUserChallengeParticipationQuery, TError, TData>({
		queryKey: ['GetUserChallengeParticipation', variables],
		queryFn: fetcher<GetUserChallengeParticipationQuery, GetUserChallengeParticipationQueryVariables>(
			dataSource.endpoint,
			dataSource.fetchParams || {},
			GetUserChallengeParticipationDocument,
			variables
		),
		...options,
	});
};

export const CreateChallengeDocument = `
    mutation CreateChallenge($creator_id: String!, $title: String!, $description: String, $instructions: String, $image_url: String, $challenge_type: String, $max_participants: Int, $start_date: Date!, $end_date: Date!, $is_public: Boolean, $access_code: String, $expires_at: Date, $max_team_size: Int) {
  createChallenge(
    creator_id: $creator_id
    title: $title
    description: $description
    instructions: $instructions
    image_url: $image_url
    challenge_type: $challenge_type
    max_participants: $max_participants
    start_date: $start_date
    end_date: $end_date
    is_public: $is_public
    access_code: $access_code
    expires_at: $expires_at
    max_team_size: $max_team_size
  ) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useCreateChallengeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		CreateChallengeMutation,
		TError,
		CreateChallengeMutationVariables,
		TContext
	>
) => {
	return useMutation<CreateChallengeMutation, TError, CreateChallengeMutationVariables, TContext>({
		mutationKey: ['CreateChallenge'],
		mutationFn: (variables?: CreateChallengeMutationVariables) =>
			fetcher<CreateChallengeMutation, CreateChallengeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				CreateChallengeDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateChallengeDocument = `
    mutation UpdateChallenge($id: String!, $title: String, $description: String, $instructions: String, $image_url: String, $max_participants: Int, $is_public: Boolean, $access_code: String, $status: String, $max_team_size: Int) {
  updateChallenge(
    id: $id
    title: $title
    description: $description
    instructions: $instructions
    image_url: $image_url
    max_participants: $max_participants
    is_public: $is_public
    access_code: $access_code
    status: $status
    max_team_size: $max_team_size
  ) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useUpdateChallengeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateChallengeMutation,
		TError,
		UpdateChallengeMutationVariables,
		TContext
	>
) => {
	return useMutation<UpdateChallengeMutation, TError, UpdateChallengeMutationVariables, TContext>({
		mutationKey: ['UpdateChallenge'],
		mutationFn: (variables?: UpdateChallengeMutationVariables) =>
			fetcher<UpdateChallengeMutation, UpdateChallengeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateChallengeDocument,
				variables
			)(),
		...options,
	});
};

export const DeleteChallengeDocument = `
    mutation DeleteChallenge($id: String!) {
  deleteChallenge(id: $id) {
    id
  }
}
    `;

export const useDeleteChallengeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		DeleteChallengeMutation,
		TError,
		DeleteChallengeMutationVariables,
		TContext
	>
) => {
	return useMutation<DeleteChallengeMutation, TError, DeleteChallengeMutationVariables, TContext>({
		mutationKey: ['DeleteChallenge'],
		mutationFn: (variables?: DeleteChallengeMutationVariables) =>
			fetcher<DeleteChallengeMutation, DeleteChallengeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				DeleteChallengeDocument,
				variables
			)(),
		...options,
	});
};

export const UpdateChallengeStatusDocument = `
    mutation UpdateChallengeStatus($id: String!, $status: String!) {
  updateChallenge(id: $id, status: $status) {
    ...ChallengeFull
  }
}
    ${ChallengeFullFragmentDoc}
${ChallengeBasicFragmentDoc}
${ChallengeCreatorFragmentDoc}
${ChallengeMilestoneFragmentDoc}
${ChallengeActivityTypeFragmentDoc}`;

export const useUpdateChallengeStatusMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		UpdateChallengeStatusMutation,
		TError,
		UpdateChallengeStatusMutationVariables,
		TContext
	>
) => {
	return useMutation<
		UpdateChallengeStatusMutation,
		TError,
		UpdateChallengeStatusMutationVariables,
		TContext
	>({
		mutationKey: ['UpdateChallengeStatus'],
		mutationFn: (variables?: UpdateChallengeStatusMutationVariables) =>
			fetcher<UpdateChallengeStatusMutation, UpdateChallengeStatusMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				UpdateChallengeStatusDocument,
				variables
			)(),
		...options,
	});
};

export const JoinChallengeDocument = `
    mutation JoinChallenge($challenge_id: String!, $user_id: String!) {
  createChallengeParticipant(challenge_id: $challenge_id, user_id: $user_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export const useJoinChallengeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		JoinChallengeMutation,
		TError,
		JoinChallengeMutationVariables,
		TContext
	>
) => {
	return useMutation<JoinChallengeMutation, TError, JoinChallengeMutationVariables, TContext>({
		mutationKey: ['JoinChallenge'],
		mutationFn: (variables?: JoinChallengeMutationVariables) =>
			fetcher<JoinChallengeMutation, JoinChallengeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				JoinChallengeDocument,
				variables
			)(),
		...options,
	});
};

export const JoinChallengeAsTeamDocument = `
    mutation JoinChallengeAsTeam($challenge_id: String!, $team_id: String!) {
  createChallengeParticipant(challenge_id: $challenge_id, team_id: $team_id) {
    ...ChallengeParticipantDetails
  }
}
    ${ChallengeParticipantDetailsFragmentDoc}`;

export const useJoinChallengeAsTeamMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		JoinChallengeAsTeamMutation,
		TError,
		JoinChallengeAsTeamMutationVariables,
		TContext
	>
) => {
	return useMutation<
		JoinChallengeAsTeamMutation,
		TError,
		JoinChallengeAsTeamMutationVariables,
		TContext
	>({
		mutationKey: ['JoinChallengeAsTeam'],
		mutationFn: (variables?: JoinChallengeAsTeamMutationVariables) =>
			fetcher<JoinChallengeAsTeamMutation, JoinChallengeAsTeamMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				JoinChallengeAsTeamDocument,
				variables
			)(),
		...options,
	});
};

export const LeaveChallengeDocument = `
    mutation LeaveChallenge($id: String!) {
  deleteChallengeParticipant(id: $id) {
    id
  }
}
    `;

export const useLeaveChallengeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		LeaveChallengeMutation,
		TError,
		LeaveChallengeMutationVariables,
		TContext
	>
) => {
	return useMutation<LeaveChallengeMutation, TError, LeaveChallengeMutationVariables, TContext>({
		mutationKey: ['LeaveChallenge'],
		mutationFn: (variables?: LeaveChallengeMutationVariables) =>
			fetcher<LeaveChallengeMutation, LeaveChallengeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				LeaveChallengeDocument,
				variables
			)(),
		...options,
	});
};

export const RemoveChallengeParticipantDocument = `
    mutation RemoveChallengeParticipant($id: String!) {
  deleteChallengeParticipant(id: $id) {
    id
  }
}
    `;

export const useRemoveChallengeParticipantMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		RemoveChallengeParticipantMutation,
		TError,
		RemoveChallengeParticipantMutationVariables,
		TContext
	>
) => {
	return useMutation<
		RemoveChallengeParticipantMutation,
		TError,
		RemoveChallengeParticipantMutationVariables,
		TContext
	>({
		mutationKey: ['RemoveChallengeParticipant'],
		mutationFn: (variables?: RemoveChallengeParticipantMutationVariables) =>
			fetcher<RemoveChallengeParticipantMutation, RemoveChallengeParticipantMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				RemoveChallengeParticipantDocument,
				variables
			)(),
		...options,
	});
};

export const AddChallengeActivityTypeDocument = `
    mutation AddChallengeActivityType($challenge_id: String!, $activity_type_id: String!) {
  createChallengeActivityType(
    challenge_id: $challenge_id
    activity_type_id: $activity_type_id
  ) {
    id
    challenge_id
    activity_type_id
    activity_type {
      id
      name
      category
      unit
      unit_label
    }
  }
}
    `;

export const useAddChallengeActivityTypeMutation = <TError = unknown, TContext = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	options?: UseMutationOptions<
		AddChallengeActivityTypeMutation,
		TError,
		AddChallengeActivityTypeMutationVariables,
		TContext
	>
) => {
	return useMutation<
		AddChallengeActivityTypeMutation,
		TError,
		AddChallengeActivityTypeMutationVariables,
		TContext
	>({
		mutationKey: ['AddChallengeActivityType'],
		mutationFn: (variables?: AddChallengeActivityTypeMutationVariables) =>
			fetcher<AddChallengeActivityTypeMutation, AddChallengeActivityTypeMutationVariables>(
				dataSource.endpoint,
				dataSource.fetchParams || {},
				AddChallengeActivityTypeDocument,
				variables
			)(),
		...options,
	});
};
