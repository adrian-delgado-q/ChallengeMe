import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Code,
	Collapse,
	Divider,
	Heading,
	Text,
	VStack,
	HStack,
	Badge,
	Alert,
	AlertIcon,
	useDisclosure,
} from '@chakra-ui/react';
import { supabase } from '../../supabase/client';
import { authService } from '../../services/optimizedAuthService';
import { useUser } from '../../contexts/AuthContext';
import { ENV, getEnvVar } from '../../utils/env-loader';

interface ConnectionTest {
	success: boolean;
	error?: string;
	data?: any;
}

export const DebugPanel: React.FC = () => {
	const { isOpen, onToggle } = useDisclosure();
	const { user, session, isLoading } = useUser();
	const [connectionTest, setConnectionTest] = useState<ConnectionTest | null>(null);
	const [envVars, setEnvVars] = useState<any>({});

	useEffect(() => {
		// Check environment variables using the new env loader
		setEnvVars({
			appName: getEnvVar('VITE_APP_NAME', 'ChallengeMe'),
			appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
			supabaseUrl: ENV.SUPABASE_URL,
			hasAnonKey: !!ENV.SUPABASE_ANON_KEY,
			mode: ENV.MODE,
			dev: ENV.DEV,
			prod: ENV.PROD,
			isDeployment: ENV.IS_DEPLOYMENT,
			enableDevtools: getEnvVar('VITE_ENABLE_REACT_QUERY_DEVTOOLS', 'false'),
			apiCacheTime: getEnvVar('VITE_API_CACHE_TIME', '300000'),
			apiStaleTime: getEnvVar('VITE_API_STALE_TIME', '60000'),
			isConfigured: !!(ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY),
		});
	}, []);

	const runConnectionTest = async () => {
		try {
			const { data, error } = await supabase.from('profiles').select('count').limit(1);
			setConnectionTest(error ? { success: false, error: error.message } : { success: true, data });
		} catch (err: any) {
			setConnectionTest({ success: false, error: err.message });
		}
	};

	const testAuth = async () => {
		try {
			const { session, error } = await authService.getSession();
			console.log('Auth test result:', { session, error });
			alert(`Auth test: ${error ? 'Failed - ' + error.message : 'Success'}`);
		} catch (err: any) {
			console.error('Auth test error:', err);
			alert(`Auth test error: ${err.message}`);
		}
	};

	const getStatusColor = (status: boolean | null) => {
		if (status === null) return 'gray';
		return status ? 'green' : 'red';
	};

	const getStatusText = (status: boolean | null) => {
		if (status === null) return 'Unknown';
		return status ? 'OK' : 'Error';
	};

	return (
		<Box position="fixed" top="4" right="4" zIndex="9999">
			<Button size="sm" colorScheme="blue" onClick={onToggle} mb={2}>
				{isOpen ? 'Hide' : 'Show'} Debug Panel
			</Button>

			<Collapse in={isOpen}>
				<Box
					bg="white"
					border="1px solid"
					borderColor="gray.200"
					borderRadius="md"
					p={4}
					maxW="400px"
					boxShadow="lg"
					maxH="80vh"
					overflowY="auto"
				>
					<Heading size="sm" mb={3}>
						Debug Information
					</Heading>

					<VStack align="stretch" spacing={3}>
						{/* Environment Variables */}
						<Box>
							<Text fontWeight="bold" fontSize="sm">
								Environment
							</Text>
							<VStack align="stretch" spacing={1} mt={1}>
								<HStack justify="space-between">
									<Text fontSize="xs">App Name:</Text>
									<Badge colorScheme="blue">{envVars.appName}</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Version:</Text>
									<Badge colorScheme="blue">{envVars.appVersion}</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Configured:</Text>
									<Badge colorScheme={envVars.isConfigured ? 'green' : 'red'}>
										{envVars.isConfigured ? 'Yes' : 'No'}
									</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Supabase URL:</Text>
									<Badge colorScheme={envVars.supabaseUrl?.startsWith('http') ? 'green' : 'red'}>
										{envVars.supabaseUrl ? 'Set' : 'Missing'}
									</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Anon Key:</Text>
									<Badge colorScheme={envVars.hasAnonKey ? 'green' : 'red'}>
										{envVars.hasAnonKey ? 'Set' : 'Missing'}
									</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Mode:</Text>
									<Badge colorScheme={envVars.dev ? 'yellow' : 'green'}>{envVars.mode}</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Deployment:</Text>
									<Badge colorScheme={envVars.isDeployment ? 'green' : 'gray'}>
										{envVars.isDeployment ? 'Yes' : 'Local'}
									</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">DevTools:</Text>
									<Badge colorScheme={envVars.enableDevtools === 'true' ? 'green' : 'gray'}>
										{envVars.enableDevtools === 'true' ? 'Enabled' : 'Disabled'}
									</Badge>
								</HStack>
							</VStack>
							{envVars.supabaseUrl && (
								<Code fontSize="xs" mt={1} p={1} bg="gray.50" borderRadius="sm">
									{envVars.supabaseUrl}
								</Code>
							)}
						</Box>

						<Divider />

						{/* API Configuration */}
						<Box>
							<Text fontWeight="bold" fontSize="sm">
								API Configuration
							</Text>
							<VStack align="stretch" spacing={1} mt={1}>
								<HStack justify="space-between">
									<Text fontSize="xs">Cache Time:</Text>
									<Badge colorScheme="purple">
										{(parseInt(envVars.apiCacheTime) / 1000 / 60).toFixed(1)}m
									</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Stale Time:</Text>
									<Badge colorScheme="purple">{(parseInt(envVars.apiStaleTime) / 1000).toFixed(0)}s</Badge>
								</HStack>
							</VStack>
						</Box>

						<Divider />

						{/* Authentication Status */}
						<Box>
							<Text fontWeight="bold" fontSize="sm">
								Authentication
							</Text>
							<VStack align="stretch" spacing={1} mt={1}>
								<HStack justify="space-between">
									<Text fontSize="xs">Loading:</Text>
									<Badge colorScheme={isLoading ? 'yellow' : 'gray'}>{isLoading ? 'Yes' : 'No'}</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">User:</Text>
									<Badge colorScheme={getStatusColor(!!user)}>{getStatusText(!!user)}</Badge>
								</HStack>
								<HStack justify="space-between">
									<Text fontSize="xs">Session:</Text>
									<Badge colorScheme={getStatusColor(!!session)}>{getStatusText(!!session)}</Badge>
								</HStack>
							</VStack>
							{user && (
								<Code fontSize="xs" mt={1} p={1} bg="gray.50" borderRadius="sm">
									ID: {user.id.substring(0, 8)}...
									<br />
									Email: {user.email}
								</Code>
							)}
						</Box>

						<Divider />

						{/* Connection Test */}
						<Box>
							<HStack justify="space-between" mb={2}>
								<Text fontWeight="bold" fontSize="sm">
									Database Connection
								</Text>
								<Button size="xs" onClick={runConnectionTest}>
									Test
								</Button>
							</HStack>
							{connectionTest && (
								<Alert status={connectionTest.success ? 'success' : 'error'} size="sm">
									<AlertIcon />
									<Text fontSize="xs">{connectionTest.success ? 'Connected' : connectionTest.error}</Text>
								</Alert>
							)}
						</Box>

						<Divider />

						{/* Debug Actions */}
						<Box>
							<Text fontWeight="bold" fontSize="sm" mb={2}>
								Debug Actions
							</Text>
							<VStack spacing={2}>
								<Button size="xs" onClick={testAuth} colorScheme="blue">
									Test Auth Session
								</Button>
								<Button
									size="xs"
									onClick={() => console.log('Environment variables:', envVars)}
									colorScheme="purple"
								>
									Log Environment Vars
								</Button>
								<Button
									size="xs"
									onClick={() => console.log('Supabase client:', supabase)}
									colorScheme="gray"
								>
									Log Supabase Client
								</Button>
								<Button
									size="xs"
									onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
									colorScheme="green"
								>
									Open Supabase Dashboard
								</Button>
							</VStack>
						</Box>

						{/* Quick Setup Reminder */}
						{(!envVars.supabaseUrl || !envVars.hasAnonKey) && (
							<>
								<Divider />
								<Alert status="warning" size="sm">
									<AlertIcon />
									<VStack align="start" spacing={1}>
										<Text fontSize="xs" fontWeight="bold">
											Setup Required
										</Text>
										<Text fontSize="xs">
											{!envVars.supabaseUrl && 'Missing VITE_SUPABASE_URL. '}
											{!envVars.hasAnonKey && 'Missing VITE_SUPABASE_ANON_KEY. '}
											Check your .env file.
										</Text>
									</VStack>
								</Alert>
							</>
						)}
					</VStack>
				</Box>
			</Collapse>
		</Box>
	);
};
