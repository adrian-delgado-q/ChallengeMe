import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { useUser } from '../contexts/AuthContext';
import {
	Box,
	Heading,
	Text,
	VStack,
	Input,
	Button,
	FormControl,
	FormLabel,
	Checkbox,
	Link,
	Divider,
	useToast,
	Image,
	Flex,
	SimpleGrid,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import challengeMeInitials from '../assets/challenge_me_initials_tight.svg';

const AuthPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { session, isLoading } = useUser();

	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading2, setIsLoading2] = useState(false);
	const toast = useToast();

	// Get the intended destination from the location state, or default to home
	const from = (location.state as any)?.from?.pathname || '/';

	// Redirect to intended destination if user is already authenticated
	useEffect(() => {
		if (!isLoading && session) {
			navigate(from, { replace: true });
		}
	}, [session, isLoading, navigate, from]);

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading2(true);

		try {
			const { error } = isSignUp
				? await supabase.auth.signUp({ email, password })
				: await supabase.auth.signInWithPassword({ email, password });

			if (error) {
				toast({
					title: 'Authentication Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			} else if (isSignUp) {
				toast({
					title: 'Check your email',
					description: 'We sent you a confirmation link.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: 'An error occurred',
				description: 'Please try again later.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			console.log(error);
		}

		setIsLoading2(false);
	};

	const handleGoogleAuth = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}${from}`,
				},
			});

			if (error) {
				toast({
					title: 'Authentication Error',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: 'An error occurred',
				description: 'Please try again later.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			console.log(error);
		}
	};

	return (
		<Box
			minHeight="100vh"
			minWidth="100vw"
			w="100%"
			bgGradient="linear(to-b, orange.500 0%, orange.400 20%, orange.200 30%, gray.50 45%, gray.50 100%)"
			display="flex"
			alignItems="center"
			justifyContent="center"
			p={12}
		>
			{/* Main Grid Container */}
			<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} maxW="8xl" w="full" alignItems="center">
				{/* Hero Section */}
				<Box p={8} display={{ base: 'none', lg: 'block' }}>
					<Box maxW="2xl" w="full">
						<Flex align="center" gap={4} mb={6}>
							<Image
								src={challengeMeInitials}
								alt="ChallengeMe Initials"
								h={{ base: '60px', md: '80px' }}
								w="auto"
							/>
							<Heading
								as="h1"
								fontSize={{ base: '4xl', md: '6xl' }}
								fontWeight="bold"
								color="gray.900"
								noOfLines={2}
							>
								Pump Up Your Fitness
							</Heading>
						</Flex>
						<Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" mb={8} maxW="2xl">
							Join thousands of people in fun, community-driven fitness challenges that push you further
							than you thought possible.
						</Text>

						<Flex gap={4} mb={16} wrap="wrap">
							<Button
								colorScheme="blue"
								size="lg"
								fontWeight="medium"
								rounded="xl"
								_hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
								transition="all 0.2s ease-in-out"
								onClick={() => setIsSignUp(true)}
							>
								Get Started
							</Button>
							<Button
								variant="outline"
								colorScheme="gray"
								size="lg"
								fontWeight="medium"
								rounded="xl"
								_hover={{ bg: 'gray.50' }}
							>
								How It Works
							</Button>
						</Flex>

						{/* Stats */}
						<SimpleGrid columns={3} spacing={8} mb={16}>
							<VStack textAlign="center">
								<Text fontSize="4xl" fontWeight="bold" color="blue.500">
									10K+
								</Text>
								<Text color="gray.500" fontSize="sm">
									Active Members
								</Text>
							</VStack>
							<VStack textAlign="center">
								<Text fontSize="4xl" fontWeight="bold" color="blue.500">
									500+
								</Text>
								<Text color="gray.500" fontSize="sm">
									Challenges Completed
								</Text>
							</VStack>
							<VStack textAlign="center">
								<Text fontSize="4xl" fontWeight="bold" color="blue.500">
									24/7
								</Text>
								<Text color="gray.500" fontSize="sm">
									Community Support
								</Text>
							</VStack>
						</SimpleGrid>

						{/* Testimonial */}
						<Box
							bg="white"
							p={6}
							rounded="2xl"
							shadow="lg"
							border="1px"
							borderColor="gray.200"
							maxW="2xl"
						>
							<Flex align="flex-start">
								<Box w={12} h={12} borderRadius="full" bg="gray.200" mr={4} flexShrink={0} />
								<Box>
									<Text color="gray.700" fontSize="sm" mb={2} fontStyle="italic">
										"I never thought I could do so many push ups until I joined ChallengeMe. The community
										kept me accountable!"
									</Text>
									<Text fontWeight="medium" color="gray.800" fontSize="sm">
										- Nicole U., 600 Push Ups
									</Text>
								</Box>
							</Flex>
						</Box>
					</Box>
				</Box>

				{/* Login Section */}
				<Box display="flex" alignItems="center" justifyContent="center" p={8}>
					<Box w="full" maxW="md">
						<Box
							bg="white"
							rounded="2xl"
							shadow="xl"
							overflow="hidden"
							border="1px"
							borderColor="gray.200"
						>
							{/* Header with gradient background */}
							<Box
								bgGradient="linear(135deg, orange.200 0%, orange.500 50%, gray.50 100%)"
								py={6}
								px={8}
								textAlign="center"
							>
								<Flex justify="center" align="baseline" mb={2}>
									<Text color="white" fontSize="3xl" fontWeight="bold">
										Challenge
									</Text>
									<Text color="black" fontSize="3xl" fontWeight="bold">
										Me
									</Text>
								</Flex>
								<Text color="whiteAlpha.900" fontSize="sm">
									Push your limits, track your progress
								</Text>
							</Box>

							{/* Form */}
							<Box p={8}>
								<Heading as="h2" size="lg" fontWeight="bold" color="gray.900" mb={6}>
									{isSignUp ? 'Create your account' : 'Sign in to your account'}
								</Heading>

								<form onSubmit={handleAuth}>
									<VStack spacing={5}>
										<FormControl>
											<FormLabel color="gray.700" fontSize="sm" fontWeight="medium" mb={1}>
												Email address
											</FormLabel>
											<Input
												type="email"
												value={email}
												onChange={e => setEmail(e.target.value)}
												px={4}
												py={3}
												rounded="lg"
												border="1px solid"
												borderColor="gray.300"
												placeholder="getfit@example.com"
												_focus={{
													borderColor: 'orange.500',
													boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.2)',
												}}
												required
											/>
										</FormControl>

										<FormControl>
											<FormLabel color="gray.700" fontSize="sm" fontWeight="medium" mb={1}>
												Your Password
											</FormLabel>
											<Input
												type="password"
												value={password}
												onChange={e => setPassword(e.target.value)}
												px={4}
												py={3}
												rounded="lg"
												border="1px solid"
												borderColor="gray.300"
												placeholder="••••••••"
												_focus={{
													borderColor: 'orange.500',
													boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.2)',
												}}
												required
											/>
										</FormControl>

										{!isSignUp && (
											<Flex justify="space-between" w="full" mb={2}>
												<Checkbox
													isChecked={rememberMe}
													onChange={e => setRememberMe(e.target.checked)}
													colorScheme="orange"
												>
													<Text fontSize="sm" color="gray.700">
														Remember me
													</Text>
												</Checkbox>
												<Link fontSize="sm" color="orange.600" _hover={{ color: 'orange.500' }}>
													Forgot your password?
												</Link>
											</Flex>
										)}

										<Button
											type="submit"
											w="full"
											bgGradient="linear(135deg, orange.200 0%, orange.500 60%, gray.100 100%)"
											color="white"
											fontWeight="medium"
											py={3}
											px={4}
											rounded="lg"
											mb={4}
											isLoading={isLoading2}
											_hover={{
												transform: 'translateY(-2px)',
												boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)',
											}}
											transition="all 0.3s ease"
										>
											{isSignUp ? 'Sign up' : 'Sign in'}
										</Button>

										<Text textAlign="center" fontSize="sm" color="gray.600">
											{isSignUp ? 'Already have an account?' : "Don't have an account?"}
											<Link
												color="orange.600"
												_hover={{ color: 'orange.500' }}
												fontWeight="medium"
												ml={1}
												onClick={() => setIsSignUp(!isSignUp)}
											>
												{isSignUp ? 'Sign in' : 'Sign up'}
											</Link>
										</Text>
									</VStack>
								</form>

								{/* Divider */}
								<Box mt={6}>
									<Box position="relative">
										<Divider />
										<Box
											position="absolute"
											left="50%"
											top="50%"
											transform="translate(-50%, -50%)"
											bg="white"
											px={2}
										>
											<Text fontSize="sm" color="gray.500">
												Or continue with
											</Text>
										</Box>
									</Box>

									{/* Google Auth */}
									<Box mt={6}>
										<Button
											w="full"
											onClick={handleGoogleAuth}
											py={2}
											px={4}
											border="1px solid"
											borderColor="gray.300"
											rounded="md"
											shadow="sm"
											bg="white"
											color="gray.700"
											fontWeight="medium"
											fontSize="sm"
											_hover={{ bg: 'gray.50' }}
											leftIcon={<FaGoogle />}
										>
											Google
										</Button>
									</Box>
								</Box>
							</Box>
						</Box>

						<Text textAlign="center" fontSize="sm" color="gray.500" mt={6}>
							© {new Date().getFullYear()} ChallengeMe. All rights reserved.
						</Text>
					</Box>
				</Box>
			</SimpleGrid>
		</Box>
	);
};

export default AuthPage;
