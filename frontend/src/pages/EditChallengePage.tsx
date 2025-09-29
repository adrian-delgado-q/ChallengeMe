import React from 'react';
import {
    Box, Heading, Text, VStack, Divider, HStack, Button, useDisclosure
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { LoadingErrorWrapper } from '../components/common/LoadingErrorWrapper';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { ChallengeForm } from '../components/challenges/ChallengeForm';
import { useChallengeDetails } from '../hooks/useData';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeService } from '../graphql/services';
import { useNotifications } from '../utils/notifications';
import { useAsyncState } from '../hooks/useAsyncState';

const EditChallengePage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null!);
    const navigate = useNavigate();
    const { id: challengeId } = useParams<{ id: string }>();
    const notifications = useNotifications();

    const { challenge, loading, error, refetch } = useChallengeDetails(challengeId || '');
    const { isLoading: deleting, execute: executeDelete } = useAsyncState({
        successMessage: 'Challenge deleted successfully!'
    });

    const handleUpdateChallenge = async (formData: any) => {
        if (!challengeId) return;

        try {
            await ChallengeService.updateChallenge(challengeId, formData);
            notifications.success('Success!', 'Challenge updated successfully!');
            refetch();
            // Navigate back to the challenge dashboard
            navigate(`/challenges/${challengeId}`);
        } catch (err: any) {
            notifications.error('Update Failed', err.message || 'Failed to update challenge');
        }
    };

    const handleDeleteChallenge = async () => {
        if (!challengeId) return;

        const result = await executeDelete(async () => {
            await ChallengeService.deleteChallenge(challengeId);
            return true;
        });

        if (result) {
            navigate('/challenges');
        }
    };

    const handleRetry = () => {
        refetch();
    };

    return (
        <LoadingErrorWrapper
            isLoading={loading}
            error={error}
            errorTitle="Failed to load challenge"
            onRetry={handleRetry}
            fullScreen
        >
            {challenge && (
                <Box maxW="4xl" mx="auto">
                    <Card p={8}>
                        <VStack spacing={8} align="stretch">
                            <VStack textAlign="center">
                                <Heading as="h2" size="xl">Challenge Settings</Heading>
                                <Text color="gray.600">Update the details for your challenge.</Text>
                            </VStack>

                            <ChallengeForm
                                onSubmit={handleUpdateChallenge}
                                onCancel={() => navigate(`/challenges/${challengeId}`)}
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

                    <ConfirmationDialog
                        isOpen={isOpen}
                        onClose={onClose}
                        onConfirm={handleDeleteChallenge}
                        cancelRef={cancelRef}
                        title="Delete Challenge"
                        message="Are you sure? You can't undo this action afterwards. This will permanently delete the challenge and all its associated data."
                        confirmText="Delete"
                        isLoading={deleting}
                    />
                </Box>
            )}
        </LoadingErrorWrapper>
    );
};
export default EditChallengePage;
