import React, { useState } from 'react';
import {
    Box, Heading, Text, VStack, Divider, HStack, Button,
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay, useDisclosure,
    Spinner, Center, Alert, AlertIcon
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { TeamForm } from '../components/teams/TeamForm';
import { useTeamDetails } from '../hooks/useData';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService } from '../graphql/services';

const EditTeamPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { id: teamId } = useParams<{ id: string }>();

    const { team, loading, error, refetch } = useTeamDetails(teamId || '');
    const [deleting, setDeleting] = useState(false);

    const handleUpdateTeam = async (formData: any) => {
        if (!teamId) return;

        try {
            await TeamService.updateTeam(teamId, formData);
            alert("Team updated successfully!");
            refetch();
        } catch (err: any) {
            alert(`Failed to update team: ${err.message}`);
        }
    };

    const handleDeleteTeam = async () => {
        if (!teamId) return;

        setDeleting(true);
        try {
            await TeamService.deleteTeam(teamId);
            alert("Team deleted successfully!");
            navigate('/teams');
        } catch (err: any) {
            alert(`Failed to delete team: ${err.message}`);
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
                    <VStack textAlign="center">
                        <Heading as="h2" size="xl">Team Settings</Heading>
                        <Text color="gray.600">Update the details for your team.</Text>
                    </VStack>

                    <TeamForm
                        onSubmit={handleUpdateTeam}
                        isEditing={true}
                        initialData={team}
                        onCancel={() => navigate(`/teams/${teamId}`)}
                    />

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
