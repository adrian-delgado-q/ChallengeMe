// Export GraphQL client and utilities
export { graphqlClient, sdk, setAuthToken, executeQuery, executeMutation, handleGraphQLError } from './client';

// Export services
export { challengeService } from './services/challengeService';

// Export all query hooks
export * from './hooks/useChallenges';

// Export all queries
export * from './queries/challenges.graphql';

// Export all mutations
export * from './mutations/challenges.graphql';

// Export generated types (for type imports)
export type * from '../generated/graphql';
