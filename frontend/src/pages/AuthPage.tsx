import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { useUser } from '../contexts/AuthContext';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import landingImage from '../assets/landing.jpg';

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
			position="fixed"
			top={0}
			left={0}
			right={0}
			bottom={0}
			w="100vw"
			h="100vh"
			display="flex"
			overflow="hidden"
		>
			{/* Left Side - Sign In */}
			<Box
				w={{ base: '100%', lg: '50%' }}
				h="100vh"
				bg="gray.50"
				display="flex"
				alignItems="center"
				justifyContent="center"
				p={4}
				overflow="auto"
			>
				<Box maxW="md" w="full">
					<VStack spacing={4} textAlign="center" mb={8}>
						<Heading as="h1" size="xl">
							<Box as="span" color="orange.500">
								Challenge
							</Box>
							Me
						</Heading>
						<Text color="gray.600">Sign in to join challenges and track your progress.</Text>
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

			{/* Right Side - Landing Image */}
			<Box
				w="100%"
				h="100vh"
				bgImage={`url(${landingImage})`}
				bgSize="cover"
				bgPosition="center"
				bgRepeat="no-repeat"
				display={{ base: 'none', lg: 'block' }}
			/>
		</Box>
	);
};

export default AuthPage;
