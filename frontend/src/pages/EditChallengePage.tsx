import React from 'react';
import {
  Box, Heading, Text, VStack, Divider, HStack, Button,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { ChallengeForm } from '../components/challenges/ChallengeForm';
import { existingChallengeData } from '../assets/fake_data/mockChallenges';


const EditChallengePage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);

    const handleUpdateChallenge = (formData: any) => {
        console.log(`Updating challenge ${existingChallengeData.id} with data:`, formData);
        alert("Challenge updated successfully! (See console for data)");
    };

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
                        challengeToEdit={existingChallengeData}
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
                            <Button colorScheme="red" onClick={onClose} ml={3}>
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
