import React from 'react';
import type { ReactNode } from 'react';
import { Heading, Text, VStack, HStack, Badge, Flex, Image, Box } from '@chakra-ui/react';
import { Card } from '../common/Card';
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
				{/* Header Row: Challenge Image + Title + Status Badge + Action Bar */}
				<Flex justify="space-between" align="flex-start" wrap="wrap" gap={6}>
					{/* Left side: Challenge Image + Title and Status */}
					<HStack spacing={6} align="flex-start" flex="1" minW="0">
						{/* Challenge Image */}
						{challenge.imageUrl && (
							<Box flexShrink={0}>
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
							<HStack spacing={3} align="center">
								<Heading as="h1" size="xl" color="gray.800" noOfLines={2}>
									{challenge.title}
								</Heading>
								{getChallengeStatusBadge()}
							</HStack>

							{/* Description */}
							{challenge.description && (
								<Text color="gray.600" fontSize="md" lineHeight="1.6" noOfLines={4}>
									{challenge.description}
								</Text>
							)}
						</VStack>
					</HStack>

					{/* Right side: Action Bar */}
					{actionBar && (
						<VStack align="end" spacing={2} flexShrink={0}>
							{actionBar}
						</VStack>
					)}
				</Flex>
			</VStack>
		</Card>
	);
};
