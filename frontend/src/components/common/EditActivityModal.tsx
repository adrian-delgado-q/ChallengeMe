import React, { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Textarea,
    Text,
    HStack,
    Icon
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ValidationUtils } from '../../utils/validation';
import type { Activity } from '../../types';

interface EditActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    activity: Activity | null;
    onActivityUpdated?: () => void;
    onUpdateActivity: (activityId: string, data: { notes?: string; date: string }) => Promise<void>;
}

export const EditActivityModal: React.FC<EditActivityModalProps> = ({
    isOpen,
    onClose,
    activity,
    onActivityUpdated,
    onUpdateActivity
}) => {
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');

    const notifications = useNotifications();
    const { isLoading: isSubmitting, execute } = useAsyncState({
        showSuccessNotifications: true,
        successMessage: 'Activity updated successfully!'
    });

    // Extract distance and duration from notes if they exist
    const extractDataFromNotes = (notesStr: string | null) => {
        if (!notesStr) return { distance: '', duration: '', otherNotes: '' };

        const distanceMatch = notesStr.match(/Distance:\s*([0-9.]+)\s*km/);
        const durationMatch = notesStr.match(/Duration:\s*([0-9.]+)\s*minutes/);
        const notesMatch = notesStr.match(/Notes:\s*(.+?)(?:\s*\||$)/);

        const distance = distanceMatch ? distanceMatch[1] : '';
        const duration = durationMatch ? durationMatch[1] : '';
        const otherNotes = notesMatch ? notesMatch[1].trim() : '';

        return { distance, duration, otherNotes };
    };

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [otherNotes, setOtherNotes] = useState('');

    useEffect(() => {
        if (activity) {
            setDate(activity.date);

            // Extract structured data from notes
            const { distance: extractedDistance, duration: extractedDuration, otherNotes: extractedNotes } = extractDataFromNotes(activity.notes || null);

            if (extractedDistance || extractedDuration) {
                // If we can extract structured data, use it
                setDistance(extractedDistance);
                setDuration(extractedDuration);
                setOtherNotes(extractedNotes);
                setNotes(''); // Clear the raw notes field
            } else {
                // Otherwise, put everything in notes
                setNotes(activity.notes || '');
                setDistance('');
                setDuration('');
                setOtherNotes('');
            }
        }
    }, [activity]);

    const handleSubmit = async () => {
        if (!activity) return;

        // Validation
        const dateValidation = ValidationUtils.required(date, 'Date');
        if (!dateValidation.isValid) {
            notifications.validationError(dateValidation.error!);
            return;
        }

        if (distance) {
            const distanceValidation = ValidationUtils.combine(
                ValidationUtils.numeric(distance, 0.1, 1000, 'Distance')
            );
            if (!distanceValidation.isValid) {
                notifications.validationError(distanceValidation.error!);
                return;
            }
        }

        if (duration) {
            const durationValidation = ValidationUtils.numeric(duration, 1, 1440, 'Duration');
            if (!durationValidation.isValid) {
                notifications.validationError(durationValidation.error!);
                return;
            }
        }

        const result = await execute(async () => {
            // Create activity notes combining distance, duration, and user notes
            let finalNotes = '';

            if (distance || duration || otherNotes) {
                const noteParts = [
                    distance && `Distance: ${distance} km`,
                    duration && `Duration: ${duration} minutes`,
                    otherNotes && `Notes: ${otherNotes}`
                ].filter(Boolean);
                finalNotes = noteParts.join(' | ');
            } else {
                finalNotes = notes;
            }

            await onUpdateActivity(activity.id, {
                notes: finalNotes || undefined,
                date
            });
        });

        if (result) {
            // Reset form and close modal
            resetForm();
            onActivityUpdated?.();
            onClose();
        }
    };

    const resetForm = () => {
        setNotes('');
        setDate('');
        setDistance('');
        setDuration('');
        setOtherNotes('');
    };

    const handleClose = () => {
        if (!isSubmitting) {
            resetForm();
            onClose();
        }
    };

    if (!activity) return null;

    const isEditable = activity.isEditable;
    const hoursLeft = isEditable ? Math.max(0, 48 - Math.floor((new Date().getTime() - new Date(activity.uploadedAt).getTime()) / (1000 * 60 * 60))) : 0;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack>
                        <Icon as={FaEdit} />
                        <Text>Edit Activity</Text>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton isDisabled={isSubmitting} />
                <ModalBody>
                    <VStack spacing={4}>
                        {!isEditable && (
                            <Text color="red.500" fontSize="sm" textAlign="center">
                                This activity can no longer be edited (more than 48 hours have passed).
                            </Text>
                        )}

                        {isEditable && hoursLeft > 0 && (
                            <Text color="orange.500" fontSize="sm" textAlign="center">
                                You have {hoursLeft} hours left to edit this activity.
                            </Text>
                        )}

                        <FormControl isRequired>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                isDisabled={!isEditable || isSubmitting}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Distance (km)</FormLabel>
                            <Input
                                type="number"
                                step="0.1"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                placeholder="e.g., 5.5"
                                isDisabled={!isEditable || isSubmitting}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <Input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="e.g., 30"
                                isDisabled={!isEditable || isSubmitting}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Additional Notes</FormLabel>
                            <Textarea
                                value={otherNotes}
                                onChange={(e) => setOtherNotes(e.target.value)}
                                placeholder="Any additional details..."
                                rows={3}
                                isDisabled={!isEditable || isSubmitting}
                            />
                        </FormControl>

                        {(!distance && !duration) && (
                            <FormControl>
                                <FormLabel>Activity Notes</FormLabel>
                                <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Describe your activity..."
                                    rows={4}
                                    isDisabled={!isEditable || isSubmitting}
                                />
                            </FormControl>
                        )}

                        <Text fontSize="xs" color="gray.500" textAlign="center">
                            Activities can only be edited within 48 hours of being logged.
                        </Text>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={handleClose} isDisabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        isDisabled={!isEditable}
                    >
                        Update Activity
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
