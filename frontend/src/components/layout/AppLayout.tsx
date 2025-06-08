import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Header } from './Header';

interface AppLayoutProps {
    children: React.ReactNode;
    onNavigate: (page: string) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigate }) => (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50" color="gray.800">
        <Header onNavigate={onNavigate} />
        <Container as="main" maxW="container.xl" py={{ base: 4, md: 8 }} flex="1">
            {children}
        </Container>
    </Box>
);
