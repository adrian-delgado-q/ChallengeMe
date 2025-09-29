import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	VStack,
	Text,
	Box,
	Avatar,
	HStack,
	Radio,
	RadioGroup,
	Alert,
	AlertIcon,
	Spinner,
	Center,
	Badge,
} from '@chakra-ui/react';
import type { Team } from '../../types';

interface TeamSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectTeam: (teamId: string) => void;
	teams: Team[];
	challengeTitle: string;
	maxTeamSize?: number;
	isLoading?: boolean;
}

export const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
	isOpen,
	onClose,
	onSelectTeam,
	teams,
	challengeTitle,
	maxTeamSize,
	isLoading = false,
}) => {
	const [selectedTeamId, setSelectedTeamId] = useState<string>('');

	const handleSubmit = () => {
		if (selectedTeamId) {
			onSelectTeam(selectedTeamId);
		}
	};

	const handleClose = () => {
		setSelectedTeamId('');
		onClose();
	};

	// Filter teams based on maxTeamSize constraint
	const eligibleTeams = teams.filter(team => {
		if (!maxTeamSize) return true; // No size limit
		return (team.memberCount || 0) <= maxTeamSize;
	});

	const ineligibleTeams = teams.filter(team => {
		if (!maxTeamSize) return false; // No size limit means all teams are eligible
		return (team.memberCount || 0) > maxTeamSize;
	});

	if (isLoading) {
		return (
			<Modal isOpen={isOpen} onClose={handleClose} size={{ base: 'full', md: 'md' }}>
				<ModalOverlay />
				<ModalContent mx={{ base: 4, md: 'auto' }} my={{ base: 4, md: 'auto' }}>
					<ModalBody py={8}>
						<Center>
							<VStack spacing={4}>
								<Spinner size="lg" color="orange.500" />
								<Text>Loading your teams...</Text>
							</VStack>
						</Center>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	}

	return (
		<Modal isOpen={isOpen} onClose={handleClose} size={{ base: 'full', md: 'md' }}>
			<ModalOverlay />
			<ModalContent mx={{ base: 4, md: 'auto' }} my={{ base: 4, md: 'auto' }}>
				<ModalHeader>Select Team for Challenge</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<VStack spacing={6} align="stretch">
						<Box>
							<Text fontSize="sm" color="gray.600" mb={4}>
								Choose which team should join "<strong>{challengeTitle}</strong>"
							</Text>
							{maxTeamSize && (
								<Alert status="info" size="sm" mb={4}>
									<AlertIcon />
									<Text fontSize="sm">This challenge has a team size limit of {maxTeamSize} members.</Text>
								</Alert>
							)}
						</Box>

						{eligibleTeams.length > 0 ? (
							<RadioGroup value={selectedTeamId} onChange={setSelectedTeamId}>
								<VStack spacing={3} align="stretch">
									{eligibleTeams.map(team => (
										<Box
											key={team.id}
											as="label"
											p={3}
											border="1px"
											borderColor="gray.200"
											borderRadius="md"
											cursor="pointer"
											_hover={{ borderColor: 'orange.300', bg: 'orange.50' }}
										>
											<Radio value={team.id} colorScheme="orange" mb={2}>
												<HStack spacing={3}>
													<Avatar size="sm" src={team.avatarUrl} name={team.name} />
													<VStack spacing={1} align="start">
														<Text fontWeight="medium">{team.name}</Text>
														<HStack spacing={2}>
															<Text fontSize="xs" color="gray.500">
																{team.memberCount || 0} members
																{team.maxMembers && ` of ${team.maxMembers}`}
															</Text>
															{team.memberCount === team.maxMembers && (
																<Badge size="sm" colorScheme="yellow">
																	Full
																</Badge>
															)}
														</HStack>
														{team.description && (
															<Text fontSize="xs" color="gray.500" noOfLines={1}>
																{team.description}
															</Text>
														)}
													</VStack>
												</HStack>
											</Radio>
										</Box>
									))}
								</VStack>
							</RadioGroup>
						) : (
							<Alert status="warning">
								<AlertIcon />
								<Text fontSize="sm">
									{maxTeamSize
										? `None of your teams meet the size requirement (max ${maxTeamSize} members).`
										: "You don't have any teams yet."}
								</Text>
							</Alert>
						)}

						{/* Show ineligible teams if any */}
						{ineligibleTeams.length > 0 && (
							<Box>
								<Text fontSize="sm" fontWeight="medium" color="gray.600" mb={2}>
									Ineligible Teams (Too Large)
								</Text>
								<VStack spacing={2} align="stretch">
									{ineligibleTeams.map(team => (
										<Box
											key={team.id}
											p={3}
											border="1px"
											borderColor="gray.200"
											borderRadius="md"
											bg="gray.50"
											opacity={0.6}
										>
											<HStack spacing={3}>
												<Avatar size="sm" src={team.avatarUrl} name={team.name} />
												<VStack spacing={1} align="start">
													<Text fontWeight="medium">{team.name}</Text>
													<HStack spacing={2}>
														<Text fontSize="xs" color="gray.500">
															{team.memberCount || 0} members
														</Text>
														<Badge size="sm" colorScheme="red">
															Exceeds limit ({maxTeamSize})
														</Badge>
													</HStack>
												</VStack>
											</HStack>
										</Box>
									))}
								</VStack>
							</Box>
						)}
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" mr={3} onClick={handleClose}>
						Cancel
					</Button>
					<Button
						colorScheme="orange"
						onClick={handleSubmit}
						isDisabled={!selectedTeamId || eligibleTeams.length === 0}
					>
						Join Challenge
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
