import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { queryClient } from '../lib/queryClient';

// Get configuration from environment variables
const enableDevtools = import.meta.env.VITE_ENABLE_REACT_QUERY_DEVTOOLS === 'true';

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && enableDevtools && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryClientProvider>
	);
};
