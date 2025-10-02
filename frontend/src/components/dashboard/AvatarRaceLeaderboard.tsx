import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	Heading,
	HStack,
	VStack,
	Text,
	Avatar,
	Badge,
	Tooltip,
	Spinner,
	Center,
} from '@chakra-ui/react';
import { ChallengeService } from '../../services';
import { useActivityUpdates } from '../../hooks/useActivityUpdates';
import { Card } from '../common/Card';

interface AvatarRaceLeaderboardProps {
	challengeId: string;
}

interface ParticipantData {
	id: string;
	name: string;
	avatarUrl?: string;
	isCurrentUser: boolean;
	progressPercentage: number;
	isTeam: boolean;
}

export const AvatarRaceLeaderboard: React.FC<AvatarRaceLeaderboardProps> = ({ challengeId }) => {
	const [participants, setParticipants] = useState<ParticipantData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentUserPosition, setCurrentUserPosition] = useState(0);

	const fetchLeaderboard = useCallback(async () => {
		if (!challengeId) return;

		setLoading(true);
		setError(null);

		try {
			const leaderboardData = await ChallengeService.getChallengeLeaderboard(challengeId);
			setParticipants(leaderboardData.participants);
			setCurrentUserPosition(leaderboardData.currentUserPosition);
		} catch (err: any) {
			setError(err.message || 'Failed to load leaderboard');
		} finally {
			setLoading(false);
		}
	}, [challengeId]);

	useEffect(() => {
		fetchLeaderboard();
	}, [fetchLeaderboard]);

	// Set up real-time updates for leaderboard
	useActivityUpdates({
		challengeId,
		onActivityUpdate: fetchLeaderboard,
		enabled: !!challengeId,
	});

	// Group participants that are very close together (within 2% of each other)
	const groupedParticipants = React.useMemo(() => {
		const groups: Array<{ position: number; participants: ParticipantData[]; isCluster: boolean }> =
			[];

		participants.forEach(participant => {
			const position = participant.progressPercentage;

			// Find if this participant can join an existing group (within 2% range)
			const existingGroup = groups.find(group => Math.abs(group.position - position) <= 2);

			if (existingGroup && existingGroup.participants.length < 4) {
				existingGroup.participants.push(participant);
				existingGroup.isCluster = existingGroup.participants.length > 1;
			} else {
				groups.push({
					position,
					participants: [participant],
					isCluster: false,
				});
			}
		});

		return groups;
	}, [participants]);

	if (loading) {
		return (
			<Card p={4}>
				<Heading as="h4" size="sm" mb={3}>
					Challenge Leaderboard
				</Heading>
				<Center h="120px">
					<Spinner color="orange.500" size="sm" />
				</Center>
			</Card>
		);
	}

	if (error) {
		return (
			<Card p={4}>
				<Heading as="h4" size="sm" mb={3}>
					Challenge Leaderboard
				</Heading>
				<Text color="red.500" fontSize="sm">
					Failed to load progress: {error}
				</Text>
			</Card>
		);
	}

	return (
		<Card p={6}>
			<VStack spacing={4} align="stretch">
				{/* Header */}
				<HStack justify="space-between" align="center">
					<Heading as="h4" size="sm" color="gray.800">
						Challenge Leaderboard
					</Heading>
					{currentUserPosition > 0 && (
						<Badge colorScheme="blue" variant="subtle">
							You're #{currentUserPosition}
						</Badge>
					)}
				</HStack>

				{participants.length > 0 ? (
					<Box>
						{/* Progress Track */}
						<Box position="relative" h="80px" bg="gray.100" borderRadius="full" p={2}>
							{/* Track line */}
							<Box
								position="absolute"
								top="50%"
								left="16px"
								right="16px"
								h="2px"
								bg="gray.300"
								borderRadius="full"
								transform="translateY(-50%)"
							/>

							{/* Start and End markers */}
							<Box
								position="absolute"
								left="8px"
								top="50%"
								transform="translateY(-50%)"
								fontSize="xs"
								color="gray.500"
								fontWeight="medium"
							>
								0%
							</Box>
							<Box
								position="absolute"
								right="8px"
								top="50%"
								transform="translateY(-50%)"
								fontSize="xs"
								color="gray.500"
								fontWeight="medium"
							>
								100%
							</Box>

							{/* Participants positioned along the track */}
							{groupedParticipants.map((group, groupIndex) => {
								const leftPosition = Math.min(Math.max(group.position, 5), 95); // Keep within 5-95% range

								if (group.isCluster) {
									// Render cluster
									const mainParticipant =
										group.participants.find(p => p.isCurrentUser) || group.participants[0];
									const otherCount = group.participants.length - 1;

									return (
										<Tooltip
											key={`cluster-${groupIndex}`}
											label={
												<VStack spacing={1} align="start">
													{group.participants.map(p => (
														<Text key={p.id} fontSize="xs">
															{p.isCurrentUser ? 'You' : p.name} - {Math.round(p.progressPercentage)}%
														</Text>
													))}
												</VStack>
											}
											placement="top"
											hasArrow
										>
											<Box
												position="absolute"
												left={`${leftPosition}%`}
												top="50%"
												transform="translate(-50%, -50%)"
												cursor="pointer"
											>
												<Avatar
													src={mainParticipant.avatarUrl}
													name={mainParticipant.name}
													size="md"
													border={mainParticipant.isCurrentUser ? '3px solid' : '2px solid'}
													borderColor={mainParticipant.isCurrentUser ? 'blue.400' : 'white'}
													boxShadow={mainParticipant.isCurrentUser ? '0 0 0 2px blue.100' : 'md'}
												/>
												{otherCount > 0 && (
													<Badge
														position="absolute"
														top="-2px"
														right="-6px"
														colorScheme="orange"
														borderRadius="full"
														fontSize="xs"
														minW="20px"
														h="20px"
														display="flex"
														alignItems="center"
														justifyContent="center"
													>
														+{otherCount}
													</Badge>
												)}
											</Box>
										</Tooltip>
									);
								} else {
									// Render single participant
									const participant = group.participants[0];
									return (
										<Tooltip
											key={participant.id}
											label={`${participant.isCurrentUser ? 'You' : participant.name} - ${Math.round(participant.progressPercentage)}%`}
											placement="top"
											hasArrow
										>
											<Box
												position="absolute"
												left={`${leftPosition}%`}
												top="50%"
												transform="translate(-50%, -50%)"
												cursor="pointer"
											>
												<Avatar
													src={participant.avatarUrl}
													name={participant.name}
													size={participant.isCurrentUser ? 'lg' : 'md'}
													border={participant.isCurrentUser ? '3px solid' : '2px solid'}
													borderColor={participant.isCurrentUser ? 'blue.400' : 'white'}
													boxShadow={participant.isCurrentUser ? '0 0 0 2px blue.100' : 'md'}
												/>
											</Box>
										</Tooltip>
									);
								}
							})}
						</Box>

						{/* Summary Stats */}
						<HStack justify="space-between" mt={4} fontSize="xs" color="gray.600">
							<Text>
								{participants.length} participant{participants.length !== 1 ? 's' : ''}
							</Text>
							<Text>Leader: {Math.round(participants[0]?.progressPercentage || 0)}%</Text>
						</HStack>
					</Box>
				) : (
					<Text color="gray.500" textAlign="center" py={8}>
						No participants yet. Be the first to join!
					</Text>
				)}
			</VStack>
		</Card>
	);
};
