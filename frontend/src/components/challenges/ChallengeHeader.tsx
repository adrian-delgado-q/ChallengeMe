import React from 'react';
import type { ReactNode } from 'react';
import { Heading, VStack, HStack, Badge, Flex, Image, Box } from '@chakra-ui/react';
import { Card } from '../common/Card';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import type { Challenge } from '../../types';

interface ChallengeHeaderProps {
	challenge: Challenge;
	actionBar?: ReactNode;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ challenge, actionBar }) => {
	const getChallengeStatusBadge = () => {
		const today = new Date();
		const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
		const endDate = new Date(challenge.endDate);

		if (startDate && today < startDate) {
			return (
				<Badge colorScheme="blue" variant="subtle">
					Upcoming
				</Badge>
			);
		} else if (today > endDate) {
			return (
				<Badge colorScheme="gray" variant="subtle">
					Completed
				</Badge>
			);
		} else {
			return (
				<Badge colorScheme="green" variant="subtle">
					Active
				</Badge>
			);
		}
	};

	return (
		<Card p={6}>
			<VStack spacing={4} align="stretch">
				{/* Action Bar - Appears above title on mobile */}
				{actionBar && (
					<Box display={{ base: 'block', lg: 'none' }}>
						<HStack justify="center" spacing={2} flexWrap="wrap">
							{actionBar}
						</HStack>
					</Box>
				)}

				{/* Header Row: Challenge Image + Title + Status Badge + Action Bar (desktop) */}
				<Flex justify="space-between" align="flex-start" gap={6}>
					{/* Left side: Challenge Image + Title and Status */}
					<HStack spacing={6} align="flex-start" flex="1" minW="0">
						{/* Challenge Image */}
						{challenge.imageUrl && (
							<Box flexShrink={0} display={{ base: 'none', md: 'block' }}>
								<Image
									src={challenge.imageUrl}
									alt={challenge.title}
									w="200px"
									h="150px"
									objectFit="cover"
									borderRadius="lg"
									shadow="md"
									fallback={
										<Box
											w="200px"
											h="150px"
											bg="gray.100"
											borderRadius="lg"
											display="flex"
											alignItems="center"
											justifyContent="center"
											color="gray.400"
											fontSize="sm"
										>
											No Image
										</Box>
									}
								/>
							</Box>
						)}

						{/* Title and Description */}
						<VStack align="start" spacing={2} flex="1" minW="0">
							{/* Challenge Image on mobile - appears above title */}
							{challenge.imageUrl && (
								<Box display={{ base: 'block', md: 'none' }} w="full">
									<Image
										src={challenge.imageUrl}
										alt={challenge.title}
										w="full"
										maxW="300px"
										h="150px"
										objectFit="cover"
										borderRadius="lg"
										shadow="md"
										mx="auto"
										fallback={
											<Box
												w="full"
												maxW="300px"
												h="150px"
												bg="gray.100"
												borderRadius="lg"
												display="flex"
												alignItems="center"
												justifyContent="center"
												color="gray.400"
												fontSize="sm"
												mx="auto"
											>
												No Image
											</Box>
										}
									/>
								</Box>
							)}

							<VStack align="start" spacing={2} w="full">
								<HStack spacing={3} align="center" flexWrap="wrap">
									<Heading as="h1" size={{ base: 'lg', md: 'xl' }} color="gray.800" noOfLines={2}>
										{challenge.title}
									</Heading>
									{getChallengeStatusBadge()}
								</HStack>

								{/* Description */}
								{challenge.description && (
									<Box maxH="96px" overflow="hidden" w="full">
										<MarkdownRenderer
											content={challenge.description}
											maxLines={4}
											fontSize="md"
											color="gray.600"
											lineHeight="1.6"
										/>
									</Box>
								)}
							</VStack>
						</VStack>
					</HStack>

					{/* Right side: Action Bar (desktop only) */}
					{actionBar && (
						<VStack align="end" spacing={2} flexShrink={0} display={{ base: 'none', lg: 'flex' }}>
							{actionBar}
						</VStack>
					)}
				</Flex>
			</VStack>
		</Card>
	);
};
