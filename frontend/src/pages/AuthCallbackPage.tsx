import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { supabase } from '../supabase/client';

const AuthCallbackPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				// Get the code from URL params
				const code = searchParams.get('code');

				if (code) {
					// Exchange code for session
					const { data, error } = await supabase.auth.exchangeCodeForSession(code);

					if (error) {
						console.error('Auth callback error:', error);
						// Redirect to auth page with error
						navigate('/auth?error=callback_error', { replace: true });
						return;
					}

					if (data.session) {
						// Successfully authenticated - redirect to challenges page
						navigate('/challenges', { replace: true });
						return;
					}
				}

				// If no code or session, redirect to auth
				navigate('/auth', { replace: true });
			} catch (error) {
				console.error('Auth callback error:', error);
				navigate('/auth?error=callback_error', { replace: true });
			}
		};

		handleAuthCallback();
	}, [navigate, searchParams]);

	return (
		<Center h="100vh">
			<VStack spacing={4}>
				<Spinner size="lg" color="orange.500" />
				<Text>Completing sign in...</Text>
			</VStack>
		</Center>
	);
};

export default AuthCallbackPage;
