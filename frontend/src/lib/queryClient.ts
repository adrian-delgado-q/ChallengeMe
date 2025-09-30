import { QueryClient } from '@tanstack/react-query';

// Get configuration from environment variables
const staleTime = parseInt(import.meta.env.VITE_API_STALE_TIME) || 2 * 60 * 1000; // 2 minutes default
const gcTime = parseInt(import.meta.env.VITE_API_CACHE_TIME) || 5 * 60 * 1000; // 5 minutes default

// Create a client
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime,
			gcTime,
			retry: 3,
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
			refetchOnWindowFocus: false, // Prevent unnecessary refetches
			refetchOnMount: true,
		},
		mutations: {
			retry: 1,
		},
	},
});
