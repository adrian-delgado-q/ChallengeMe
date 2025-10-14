import { GraphQLClient } from 'graphql-request';
import type { RequestDocument } from 'graphql-request';
import { getSdk } from '../generated/graphql';

/**
 * GraphQL client configuration
 */
const GRAPHQL_ENDPOINT = `http://${import.meta.env.VITE_GRAPHQL_HTTP_HOST || 'localhost'}:${import.meta.env.VITE_GRAPHQL_HTTP_PORT || '4000'}/graphql`;
/**
 * Create a GraphQL client instance
 */
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get the typed SDK from the generated code
 * This provides type-safe methods for all GraphQL operations
 */
export const sdk = getSdk(graphqlClient);

/**
 * Set authentication token for the GraphQL client
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`);
  } else {
    graphqlClient.setHeader('Authorization', '');
  }
};

/**
 * Execute a GraphQL query
 */
export async function executeQuery<TData = any, TVariables extends Record<string, any> = Record<string, any>>(
  document: RequestDocument,
  variables?: TVariables
): Promise<TData> {
  try {
    // @ts-expect-error - graphql-request has complex type constraints
    return await graphqlClient.request<TData, TVariables>(document, variables);
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    throw error;
  }
}

/**
 * Execute a GraphQL mutation
 */
export async function executeMutation<TData = any, TVariables extends Record<string, any> = Record<string, any>>(
  document: RequestDocument,
  variables?: TVariables
): Promise<TData> {
  try {
    // @ts-expect-error - graphql-request has complex type constraints
    return await graphqlClient.request<TData, TVariables>(document, variables);
  } catch (error) {
    console.error('GraphQL Mutation Error:', error);
    throw error;
  }
}

/**
 * Error handler for GraphQL operations
 */
export function handleGraphQLError(error: any, operation: string): never {
  console.error(`GraphQL ${operation} error:`, error);
  
  // Handle authentication errors
  if (
    error?.response?.errors?.[0]?.extensions?.code === 'UNAUTHENTICATED' ||
    error?.message?.toLowerCase().includes('not authenticated')
  ) {
    throw new Error('You must be logged in to perform this action');
  }
  
  // Handle authorization errors
  if (
    error?.response?.errors?.[0]?.extensions?.code === 'FORBIDDEN' ||
    error?.message?.toLowerCase().includes('permission denied')
  ) {
    throw new Error('You do not have permission to perform this action');
  }
  
  // Handle not found errors
  if (
    error?.response?.errors?.[0]?.extensions?.code === 'NOT_FOUND' ||
    error?.message?.toLowerCase().includes('not found')
  ) {
    throw new Error('The requested resource was not found');
  }
  
  // Generic error
  throw new Error(error?.message || `Failed to ${operation}`);
}

export default graphqlClient;
