import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Header } from './Header';

interface AppLayoutProps {
	children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
	<Box minH="100vh" w="100vw" display="flex" flexDirection="column" bg="gray.50" color="gray.800">
		<Header />
		<Container
			as="main"
			maxW="container.xl"
			py={{ base: 4, md: 8 }}
			px={{ base: 4, md: 6 }}
			flex="2"
			w="full"
		>
			{children}
		</Container>
	</Box>
);
