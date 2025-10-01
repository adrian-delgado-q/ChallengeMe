import React, { useState } from 'react';
import {
	Box,
	Heading,
	Text,
	VStack,
	Divider,
	HStack,
	Button,
	useDisclosure,
	Avatar,
	Flex,
	Tag,
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { LoadingErrorWrapper } from '../components/common/LoadingErrorWrapper';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { TeamForm } from '../components/teams/TeamForm';
import { TeamMemberManagement } from '../components/teams/TeamMemberManagement';
import { useTeamQuery } from '../hooks/useTeamsQuery';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';
import { useNotifications } from '../utils/notifications';
import { useAsyncState } from '../hooks/useAsyncState';

const EditTeamPage: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null!);
	const navigate = useNavigate();
	const { id: teamId } = useParams<{ id: string }>();
	const { user } = useUser();
	const notifications = useNotifications();

	const { data: team, isLoading: loading, error, refetch } = useTeamQuery(teamId || '');
	const { isLoading: deleting, execute: executeDelete } = useAsyncState();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Determine user's role in the team
	const isTeamCreator = user && team && team.creatorId === user.id;
	const currentUserMembership = team?.members?.find((m: any) => m.userId === user?.id);
	const isTeamAdmin = currentUserMembership?.role === 'ADMIN';

	const handleUpdateTeam = async () => {
		if (!teamId) return;

		// The TeamService call will be handled by the TeamForm
		// This function will be called only on success when hideButtons={true}
		notifications.success('Success!', 'Team updated successfully!');
		// Navigate back to team dashboard after successful update
		navigate(`/teams/${teamId}`);
	};

	const handleFormSubmit = () => {
		const form = document.querySelector('form') as HTMLFormElement;
		form?.requestSubmit();
	};

	const handleDeleteTeam = async () => {
		if (!teamId) return;

		const result = await executeDelete(async () => {
			await TeamService.deleteTeam(teamId);
			return true;
		});

		if (result) {
			notifications.success('Team Deleted', 'Team deleted successfully!');
			navigate('/teams');
		}
	};

	const handleRetry = () => {
		refetch();
	};

	return (
		<LoadingErrorWrapper
			isLoading={loading}
			error={error}
			errorTitle="Failed to load team"
			onRetry={handleRetry}
			fullScreen
		>
			{team && (
				<Box maxW="4xl" mx="auto">
					<Card p={8}>
						<VStack spacing={8} align="stretch">
							{/* Header with Team Info and Action Buttons */}
							<Flex justify="space-between" align="center" wrap="wrap" gap={4}>
								<Box>
									<HStack spacing={4} align="center" mb={2}>
										<Avatar size="lg" name={team.name} src={team.avatarUrl} />
										<Box>
											<HStack spacing={3} align="center">
												<Heading as="h2" size="xl">
													{team.name}
												</Heading>
												<Tag size="md" colorScheme={team.isPublic ? 'green' : 'gray'}>
													{team.isPublic ? 'Public' : 'Private'}
												</Tag>
											</HStack>
											<Text color="gray.600" mt={1}>
												{team.description || 'Configure your team settings below.'}
											</Text>
										</Box>
									</HStack>
								</Box>
								<HStack spacing={3}>
									<Button
										variant="outline"
										onClick={() => navigate(`/teams/${teamId}`)}
										isDisabled={isSubmitting}
									>
										Cancel
									</Button>
									<Button
										colorScheme="orange"
										onClick={handleFormSubmit}
										isLoading={isSubmitting}
										loadingText="Updating..."
									>
										Update Team
									</Button>
								</HStack>
							</Flex>

							<Divider />

							{/* Team Settings Form */}
							<Box>
								<Heading as="h3" size="md" mb={4}>
									Team Settings
								</Heading>
								<TeamForm
									onSubmit={handleUpdateTeam}
									isEditing={true}
									initialData={team}
									onCancel={() => navigate(`/teams/${teamId}`)}
									hideButtons={true}
									onLoadingChange={setIsSubmitting}
								/>
							</Box>

							{/* Team Member Management Section */}
							{teamId && (isTeamCreator || isTeamAdmin) && (
								<>
									<Divider />
									<TeamMemberManagement
										teamId={teamId}
										isTeamCreator={Boolean(isTeamCreator)}
										isTeamAdmin={Boolean(isTeamAdmin)}
										onMembershipChange={refetch}
									/>
								</>
							)}

							<Divider />

							{/* Danger Zone */}
							<VStack align="stretch" spacing={4}>
								<Heading size="md" color="red.600">
									Danger Zone
								</Heading>
								<HStack justify="space-between" align="center">
									<Box>
										<Text fontWeight="bold">Delete this team</Text>
										<Text fontSize="sm" color="gray.600">
											Once deleted, it cannot be recovered.
										</Text>
									</Box>
									<Button colorScheme="red" variant="outline" onClick={onOpen}>
										Delete Team
									</Button>
								</HStack>
							</VStack>
						</VStack>
					</Card>

					<ConfirmationDialog
						isOpen={isOpen}
						onClose={onClose}
						onConfirm={handleDeleteTeam}
						cancelRef={cancelRef}
						title="Delete Team"
						message="Are you sure? You can't undo this action afterwards. This will permanently delete the team and all its associated data."
						confirmText="Delete"
						isLoading={deleting}
					/>
				</Box>
			)}
		</LoadingErrorWrapper>
	);
};

export default EditTeamPage;
