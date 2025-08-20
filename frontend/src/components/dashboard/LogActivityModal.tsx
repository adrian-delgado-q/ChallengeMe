import React, { useState, useEffect } from 'react';
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
  useDisclosure,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { useActivities, useChallenges, useTeams } from '../../hooks/useData';
import { ChallengeService } from '../../graphql/services';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ValidationUtils } from '../../utils/validation';
import { TeamSelectionModal } from '../challenges/TeamSelectionModal';
import type { Challenge } from '../../types';

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
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [showJoinPrompt, setShowJoinPrompt] = useState(false);

  const { createActivity } = useActivities();
  const { joinChallenge } = useChallenges();
  const { teams } = useTeams();
  const notifications = useNotifications();
  const { isOpen: isTeamModalOpen, onOpen: onTeamModalOpen, onClose: onTeamModalClose } = useDisclosure();
  const { isLoading: isSubmitting, execute } = useAsyncState({
    showSuccessNotifications: true,
    successMessage: 'Activity logged successfully!'
  });
  const initialRef = React.useRef(null);

  // Fetch challenge details when modal opens
  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId || !isOpen) return;

      try {
        const challengeData = await ChallengeService.getChallengeById(challengeId);
        setChallenge(challengeData);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };

    fetchChallenge();
  }, [challengeId, isOpen]);

  const handleSubmit = async () => {
    // Validation using ValidationUtils
    if (!challengeId) {
      notifications.error('Error', 'No challenge ID provided');
      return;
    }

    const distanceValidation = ValidationUtils.combine(
      ValidationUtils.required(distance, 'Distance'),
      ValidationUtils.numeric(distance, 0.1, 1000, 'Distance')
    );
    if (!distanceValidation.isValid) {
      notifications.validationError(distanceValidation.error!);
      return;
    }

    if (duration) {
      const durationValidation = ValidationUtils.numeric(duration, 1, 1440, 'Duration');
      if (!durationValidation.isValid) {
        notifications.validationError(durationValidation.error!);
        return;
      }
    }

    const result = await execute(async () => {
      // Get the user's participant ID for this challenge
      const participantId = await ChallengeService.getMyParticipantId(challengeId);

      if (!participantId) {
        // User is not a participant, check if this is a team challenge
        if (challenge?.challengeType === 'team') {
          // For team challenges, show team selection or join prompt
          setShowJoinPrompt(true);
          return false; // Don't continue with activity logging
        } else {
          // For individual challenges, auto-join as individual
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
        }
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

      return true;
    });

    if (result) {
      // Reset form and close modal
      setDistance('');
      setDuration('');
      setNotes('');
      setShowJoinPrompt(false);
      onActivityLogged?.();
      onClose();
    }
  };

  const handleJoinAsIndividual = async () => {
    const result = await execute(async () => {
      // Join as individual and then log activity
      const participant = await ChallengeService.joinChallengeAsIndividual(challengeId!);

      // Create activity notes combining distance, duration, and user notes
      const activityNotes = [
        `Distance: ${distance} km`,
        duration && `Duration: ${duration} minutes`,
        notes && `Notes: ${notes}`
      ].filter(Boolean).join(' | ');

      await createActivity({
        participantId: participant.id,
        notes: activityNotes,
        date: new Date().toISOString().split('T')[0] // Today's date
      });

      return true;
    });

    if (result) {
      // Reset form and close modal
      setDistance('');
      setDuration('');
      setNotes('');
      setShowJoinPrompt(false);
      onActivityLogged?.();
      onClose();
    }
  };

  const handleJoinAsTeam = () => {
    // Open team selection modal
    onTeamModalOpen();
  };

  const handleTeamSelection = async (teamId: string) => {
    const result = await execute(async () => {
      // Join as team and then log activity
      await joinChallenge(challengeId!, teamId);

      // Get the new participant ID after joining
      const participantId = await ChallengeService.getMyParticipantId(challengeId!);

      if (!participantId) {
        throw new Error('Failed to get participant ID after joining');
      }

      // Create activity notes combining distance, duration, and user notes
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

      return true;
    });

    if (result) {
      // Reset form and close modal
      setDistance('');
      setDuration('');
      setNotes('');
      setShowJoinPrompt(false);
      onTeamModalClose();
      onActivityLogged?.();
      onClose();
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setDistance('');
      setDuration('');
      setNotes('');
      setShowJoinPrompt(false);
      onClose();
    }
  };

  const handleCancelJoin = () => {
    setShowJoinPrompt(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log Your Activity</ModalHeader>
          <ModalCloseButton isDisabled={isSubmitting} />
          <ModalBody>
            <VStack spacing={4}>
              {showJoinPrompt && challenge?.challengeType === 'team' ? (
                <>
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm" fontWeight="medium">
                        Join Challenge to Log Activity
                      </Text>
                      <Text fontSize="sm">
                        You need to join "{challenge.title}" before you can log activities.
                        This is a team challenge - would you like to join as an individual or select a team?
                      </Text>
                    </VStack>
                  </Alert>

                  <VStack spacing={3} w="full">
                    <Button
                      colorScheme="orange"
                      onClick={handleJoinAsIndividual}
                      isLoading={isSubmitting}
                      loadingText="Joining..."
                      w="full"
                    >
                      Join as Individual
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="orange"
                      onClick={handleJoinAsTeam}
                      isDisabled={!teams || teams.length === 0}
                      w="full"
                    >
                      Join with Team
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleCancelJoin}
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </VStack>
                </>
              ) : (
                <>
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
                </>
              )}
            </VStack>
          </ModalBody>
          {!showJoinPrompt && (
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
          )}
        </ModalContent>
      </Modal>

      {/* Team Selection Modal */}
      {challenge?.challengeType === 'team' && (
        <TeamSelectionModal
          isOpen={isTeamModalOpen}
          onClose={onTeamModalClose}
          onSelectTeam={handleTeamSelection}
          teams={teams || []}
          challengeTitle={challenge.title}
          maxTeamSize={challenge.maxTeamSize}
          isLoading={isSubmitting}
        />
      )}
    </>
  );
};
