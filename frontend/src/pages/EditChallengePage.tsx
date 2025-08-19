import React, { useState } from 'react';
import {
    Box, Heading, Text, VStack, Divider, HStack, Button,
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure,
    Spinner, Center, Alert, AlertIcon
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { ChallengeForm } from '../components/challenges/ChallengeForm';
import { useChallengeDetails } from '../hooks/useData';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeService } from '../graphql/services';

const EditChallengePage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const { id: challengeId } = useParams<{ id: string }>();

    const { challenge, loading, error, refetch } = useChallengeDetails(challengeId || '');
    const [deleting, setDeleting] = useState(false);

    const handleUpdateChallenge = async (formData: any) => {
        if (!challengeId) return;

        try {
            await ChallengeService.updateChallenge(challengeId, formData);
            alert("Challenge updated successfully!");
            refetch();
        } catch (err: any) {
            alert(`Failed to update challenge: ${err.message}`);
        }
    };

    const handleDeleteChallenge = async () => {
        if (!challengeId) return;

        setDeleting(true);
        try {
            await ChallengeService.deleteChallenge(challengeId);
            alert("Challenge deleted successfully!");
            navigate('/challenges');
        } catch (err: any) {
            alert(`Failed to delete challenge: ${err.message}`);
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

    if (error || !challenge) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error || 'Challenge not found'}
            </Alert>
        );
    }

    return (
        <Box maxW="4xl" mx="auto">
            <Card p={8}>
                <VStack spacing={8} align="stretch">
                    <VStack textAlign="center">
                        <Heading as="h2" size="xl">Challenge Settings</Heading>
                        <Text color="gray.600">Update the details for your challenge.</Text>
                    </VStack>

                    <ChallengeForm
                        onSubmit={handleUpdateChallenge}
                        isEditing={true}
                        challengeToEdit={challenge}
                    />

                    <Divider />

                    {/* Danger Zone */}
                    <VStack align="stretch" spacing={4}>
                        <Heading size="md" color="red.600">Danger Zone</Heading>
                        <HStack justify="space-between" align="center">
                            <Box>
                                <Text fontWeight="bold">Delete this challenge</Text>
                                <Text fontSize="sm" color="gray.600">Once deleted, it cannot be recovered.</Text>
                            </Box>
                            <Button colorScheme="red" variant="outline" onClick={onOpen}>
                                Delete Challenge
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
                            Delete Challenge
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards. This will permanently delete the challenge and all its associated data.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteChallenge} ml={3} isLoading={deleting}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};
export default EditChallengePage;
