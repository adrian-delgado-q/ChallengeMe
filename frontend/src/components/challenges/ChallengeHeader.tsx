import React from 'react';
import type { ReactNode } from 'react';
import { Heading, Text, VStack, HStack, Badge, Flex } from '@chakra-ui/react';
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
				{/* Header Row: Title + Status Badge + Action Bar */}
				<Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
					{/* Left side: Title and Status */}
					<VStack align="start" spacing={2} flex="1" minW="0">
						<HStack spacing={3} align="center">
							<Heading as="h1" size="xl" color="gray.800" noOfLines={2}>
								{challenge.title}
							</Heading>
							{getChallengeStatusBadge()}
						</HStack>

						{/* Description */}
						{challenge.description && (
							<Text color="gray.600" fontSize="md" lineHeight="1.6" noOfLines={3}>
								{challenge.description}
							</Text>
						)}
					</VStack>

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
