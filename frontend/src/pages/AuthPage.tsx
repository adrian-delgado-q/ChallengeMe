import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { useUser } from '../contexts/AuthContext';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Card } from '../components/common/Card';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { session, isLoading } = useUser();

    // Get the intended destination from the location state, or default to home
    const from = (location.state as any)?.from?.pathname || '/';

    // Redirect to intended destination if user is already authenticated
    useEffect(() => {
        if (!isLoading && session) {
            navigate(from, { replace: true });
        }
    }, [session, isLoading, navigate, from]);
    return (
        <Box
            minH="100vh"
            w="full"
            bg="gray.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Box maxW="md" w="full">
                <VStack spacing={4} textAlign="center" mb={8}>
                    <Heading as="h1" size="xl" >
                        <Box as="span" color="orange.500">Challenge</Box>Me
                    </Heading>
                    <Text color="gray.600">
                        Sign in to join challenges and track your progress.
                    </Text>
                </VStack>
                <Card p={{ base: 6, md: 8 }}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={['google', 'github']} // Optional: Add social providers
                        theme="light"
                        view="sign_in"
                    />
                </Card>
            </Box>
        </Box>
    );
};

export default AuthPage;