import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useActivities } from '../../hooks/useData';
import { ChallengeService } from '../../graphql/services';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId?: string; // Challenge ID
  onActivityLogged?: () => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  isOpen,
  onClose,
  challengeId,
  onActivityLogged
}) => {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createActivity } = useActivities();
  const toast = useToast();
  const initialRef = React.useRef(null);

  const handleSubmit = async () => {
    if (!challengeId) {
      toast({
        title: 'Error',
        description: 'No challenge ID provided',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!distance.trim()) {
      toast({
        title: 'Error',
        description: 'Distance is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the user's participant ID for this challenge
      const participantId = await ChallengeService.getMyParticipantId(challengeId);

      if (!participantId) {
        // User is not a participant, try to join as individual
        const participant = await ChallengeService.joinChallengeAsIndividual(challengeId);

        // Use the newly created participant ID
        const newParticipantId = participant.id;

        // Create activity notes combining distance, duration, and user notes
        const activityNotes = [
          `Distance: ${distance} km`,
          duration && `Duration: ${duration} minutes`,
          notes && `Notes: ${notes}`
        ].filter(Boolean).join(' | ');

        await createActivity({
          participantId: newParticipantId,
          notes: activityNotes,
          date: new Date().toISOString().split('T')[0] // Today's date
        });
      } else {
        // User is already a participant
        const activityNotes = [
          `Distance: ${distance} km`,
          duration && `Duration: ${duration} minutes`,
          notes && `Notes: ${notes}`
        ].filter(Boolean).join(' | ');

        await createActivity({
          participantId,
          notes: activityNotes,
          date: new Date().toISOString().split('T')[0] // Today's date
        });
      }

      toast({
        title: 'Success',
        description: 'Activity logged successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setDistance('');
      setDuration('');
      setNotes('');

      // Call callback and close modal
      onActivityLogged?.();
      onClose();

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to log activity',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setDistance('');
      setDuration('');
      setNotes('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log Your Activity</ModalHeader>
        <ModalCloseButton isDisabled={isSubmitting} />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Distance</FormLabel>
              <InputGroup>
                <Input
                  ref={initialRef}
                  type="number"
                  placeholder="e.g., 5.5"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  isDisabled={isSubmitting}
                />
                <InputRightAddon>km</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Duration (Optional)</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  isDisabled={isSubmitting}
                />
                <InputRightAddon>minutes</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Notes (Optional)</FormLabel>
              <Textarea
                placeholder="How did it go?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                isDisabled={isSubmitting}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={handleClose}
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            colorScheme="orange"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Logging..."
          >
            Log Activity
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
