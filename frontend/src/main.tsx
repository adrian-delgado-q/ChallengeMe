import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ReactQueryProvider } from './contexts/ReactQueryProvider.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReactQueryProvider>
			<ChakraProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ChakraProvider>
		</ReactQueryProvider>
	</StrictMode>
);
