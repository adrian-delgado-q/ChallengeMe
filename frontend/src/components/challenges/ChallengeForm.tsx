import React, { useState } from 'react';
import {
    Box, Button, FormControl, FormLabel, Grid, Heading, Input, Radio, RadioGroup, HStack,
    Text, Textarea, VStack, Select, InputGroup, InputRightAddon, IconButton, useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useChallenges } from '../../hooks/useData';
import type { Challenge, Milestone, ChallengeType } from '../../types';

interface ChallengeFormProps {
    challengeToEdit?: Challenge;
    onSubmit?: (challenge: any) => void;
    onCancel?: () => void;
    isEditing?: boolean;
}

const activityOptions = [
    "Running", "Walking", "Cycling", "Swimming", "Stair Climbing",
    "Strength Training", "Yoga", "Hiking", "Rowing", "Meditation"
];

export const ChallengeForm: React.FC<ChallengeFormProps> = ({
    challengeToEdit,
    onSubmit,
    onCancel,
    isEditing = false
}) => {
    // Form state
    const [title, setTitle] = useState(challengeToEdit?.title || '');
    const [description, setDescription] = useState(challengeToEdit?.description || '');
    const [activityType, setActivityType] = useState(challengeToEdit?.type || '');
    const [maxParticipants, setMaxParticipants] = useState(challengeToEdit?.maxParticipants?.toString() || '');
    const [endDate, setEndDate] = useState(challengeToEdit?.endDate || '');
    const [challengeType, setChallengeType] = useState<ChallengeType>(challengeToEdit?.challengeType || 'individual');
    const [isPublic, setIsPublic] = useState(challengeToEdit?.isPublic !== false);
    const [minDuration, setMinDuration] = useState(challengeToEdit?.rules?.minDuration?.toString() || '');
    const [minRepetitions, setMinRepetitions] = useState(challengeToEdit?.rules?.minRepetitions?.toString() || '');
    const [milestones, setMilestones] = useState<Partial<Milestone>[]>(
        challengeToEdit?.milestones || [{ name: 'Bronze', value: undefined }]
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { createChallenge } = useChallenges();
    const toast = useToast();

    const handleMilestoneChange = (index: number, field: keyof Milestone, value: string | number) => {
        const newMilestones = [...milestones];
        const milestone = { ...newMilestones[index] };

        if (field === 'value') {
            milestone.value = Number(value);
        } else {
            milestone.name = String(value);
        }
        newMilestones[index] = milestone;
        setMilestones(newMilestones);
    };

    const addMilestone = () => {
        setMilestones([...milestones, { name: '', value: undefined }]);
    };

    const removeMilestone = (index: number) => {
        if (milestones.length > 1) {
            setMilestones(milestones.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast({
                title: 'Error',
                description: 'Challenge title is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!endDate) {
            toast({
                title: 'Error',
                description: 'End date is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const challengeData = {
                title: title.trim(),
                description: description.trim() || undefined,
                challengeType: challengeType.toUpperCase() as 'INDIVIDUAL' | 'TEAM',
                maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
                startDate: new Date().toISOString().split('T')[0], // Today
                endDate,
                isPublic
            };

            let result;
            if (isEditing && challengeToEdit) {
                // Update challenge - would need to implement updateChallenge in the hook
                toast({
                    title: 'Info',
                    description: 'Challenge update not yet implemented',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            } else {
                result = await createChallenge(challengeData);
            }

            toast({
                title: 'Success',
                description: `Challenge ${isEditing ? 'updated' : 'created'} successfully!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Call parent callback
            onSubmit?.(result);

        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || `Failed to ${isEditing ? 'update' : 'create'} challenge`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <VStack as="form" spacing={6} w="full" align="stretch" onSubmit={handleSubmit}>

            <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Challenge Type</FormLabel>
                <RadioGroup
                    onChange={(val: ChallengeType) => setChallengeType(val)}
                    value={challengeType}
                    isDisabled={isSubmitting}
                >
                    <HStack spacing={4}>
                        <Radio value="individual" colorScheme="orange">Individual Challenge</Radio>
                        <Radio value="team" colorScheme="orange">Team Challenge</Radio>
                    </HStack>
                </RadioGroup>
                <Text fontSize="xs" color="gray.500" mt={1}>
                    {challengeType === 'individual'
                        ? "Only individual users can join this challenge."
                        : "Only teams can join this challenge."
                    }
                </Text>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Challenge Title</FormLabel>
                <Input
                    placeholder="e.g., August 30-Day Plank Challenge"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                    placeholder="Briefly describe your challenge, its rules, and what makes it special."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <FormControl>
                    <FormLabel>Activity Type</FormLabel>
                    <Select
                        placeholder="Select activity"
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        isDisabled={isSubmitting}
                    >
                        {activityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Max {challengeType === 'team' ? 'Teams' : 'Participants'} (Optional)</FormLabel>
                    <Input
                        type="number"
                        placeholder="e.g., 50"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                        isDisabled={isSubmitting}
                    />
                </FormControl>
            </Grid>

            <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Challenge Rules (Optional)</FormLabel>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Minimum Duration"
                            value={minDuration}
                            onChange={(e) => setMinDuration(e.target.value)}
                            isDisabled={isSubmitting}
                        />
                        <InputRightAddon>minutes</InputRightAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Minimum Repetitions"
                            value={minRepetitions}
                            onChange={(e) => setMinRepetitions(e.target.value)}
                            isDisabled={isSubmitting}
                        />
                        <InputRightAddon>reps</InputRightAddon>
                    </InputGroup>
                </Grid>
            </FormControl>

            <FormControl>
                <FormLabel>Milestone Goals (Optional)</FormLabel>
                <VStack spacing={4} align="stretch">
                    {milestones.map((milestone, index) => (
                        <HStack key={index} spacing={2}>
                            <Input
                                placeholder={`Milestone ${index + 1} Name`}
                                value={milestone.name || ''}
                                onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                                isDisabled={isSubmitting}
                            />
                            <Input
                                type="number"
                                placeholder="Goal Value (e.g., 100)"
                                value={milestone.value || ''}
                                onChange={(e) => handleMilestoneChange(index, 'value', e.target.value)}
                                isDisabled={isSubmitting}
                            />
                            <IconButton
                                aria-label="Remove milestone"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => removeMilestone(index)}
                                isDisabled={milestones.length <= 1 || isSubmitting}
                            />
                        </HStack>
                    ))}
                    <Button
                        leftIcon={<AddIcon />}
                        size="sm"
                        variant="outline"
                        colorScheme="orange"
                        onClick={addMilestone}
                        isDisabled={isSubmitting}
                    >
                        Add Milestone
                    </Button>
                </VStack>
            </FormControl>

            <FormControl as="fieldset">
                <FormLabel as="legend">Visibility</FormLabel>
                <RadioGroup
                    value={isPublic ? 'public' : 'private'}
                    onChange={(val) => setIsPublic(val === 'public')}
                    isDisabled={isSubmitting}
                >
                    <HStack spacing={4}>
                        <Radio value="public" colorScheme="orange">Public</Radio>
                        <Radio value="private" colorScheme="orange">Private</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>

            <HStack justify="flex-end" pt={4}>
                {onCancel && (
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        isDisabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    colorScheme="orange"
                    size="lg"
                    isLoading={isSubmitting}
                    loadingText={isEditing ? 'Updating...' : 'Creating...'}
                >
                    {isEditing ? 'Update Challenge' : 'Create Challenge'}
                </Button>
            </HStack>
        </VStack>
    );
};
