import React, { useState } from 'react';
import {
    Box, Heading, Text, VStack, Divider, HStack, Button,
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay, useDisclosure,
    Spinner, Center, Alert, AlertIcon, Avatar, Flex, Tag, useToast
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { TeamForm } from '../components/teams/TeamForm';
import { TeamMemberManagement } from '../components/teams/TeamMemberManagement';
import { useTeamDetails } from '../hooks/useData';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';

const EditTeamPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { id: teamId } = useParams<{ id: string }>();
    const { user } = useUser();
    const toast = useToast();

    const { team, loading, error, refetch } = useTeamDetails(teamId || '');
    const [deleting, setDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Determine user's role in the team
    const isTeamCreator = user && team && team.creatorId === user.id;
    const currentUserMembership = team?.members?.find((m: any) => m.userId === user?.id);
    const isTeamAdmin = currentUserMembership?.role === 'ADMIN';

    const handleUpdateTeam = async (_result: any) => {
        if (!teamId) return;

        try {
            // The TeamService call will be handled by the TeamForm
            // This function will be called only on success when hideButtons={true}
            toast({
                title: 'Success!',
                description: 'Team updated successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            // Navigate back to team dashboard after successful update
            navigate(`/teams/${teamId}`);
        } catch (err: any) {
            // This should not happen when hideButtons={true} since TeamForm handles errors
            toast({
                title: 'Error',
                description: err.message || 'Failed to update team',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleFormSubmit = () => {
        const form = document.querySelector('form') as HTMLFormElement;
        form?.requestSubmit();
    };

    const handleDeleteTeam = async () => {
        if (!teamId) return;

        setDeleting(true);
        try {
            await TeamService.deleteTeam(teamId);
            toast({
                title: 'Team Deleted',
                description: 'Team deleted successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/teams');
        } catch (err: any) {
            toast({
                title: 'Error',
                description: err.message || 'Failed to delete team',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setDeleting(false);
            onClose();
        }
    };

    if (loading) {
        return (
            <Center h="200px">
                <Spinner size="xl" color="orange.500" />
            </Center>
        );
    }

    if (error || !team) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error || 'Team not found'}
            </Alert>
        );
    }

    return (
        <Box maxW="4xl" mx="auto">
            <Card p={8}>
                <VStack spacing={8} align="stretch">
                    {/* Header with Team Info and Action Buttons */}
                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                        <Box>
                            <HStack spacing={4} align="center" mb={2}>
                                <Avatar
                                    size="lg"
                                    name={team.name}
                                    src={team.avatarUrl}
                                />
                                <Box>
                                    <HStack spacing={3} align="center">
                                        <Heading as="h2" size="xl">{team.name}</Heading>
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
                        <Heading as="h3" size="md" mb={4}>Team Settings</Heading>
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
                        <Heading size="md" color="red.600">Danger Zone</Heading>
                        <HStack justify="space-between" align="center">
                            <Box>
                                <Text fontWeight="bold">Delete this team</Text>
                                <Text fontSize="sm" color="gray.600">Once deleted, it cannot be recovered.</Text>
                            </Box>
                            <Button colorScheme="red" variant="outline" onClick={onOpen}>
                                Delete Team
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Team
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards. This will permanently delete the team and all its associated data.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteTeam} ml={3} isLoading={deleting}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default EditTeamPage;
