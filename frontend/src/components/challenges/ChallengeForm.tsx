import React, { useState, useEffect } from 'react';
import {
    Button, FormControl, FormLabel, Grid, Input, Radio, RadioGroup, HStack,
    Text, Textarea, VStack
} from '@chakra-ui/react';
import { useChallenges } from '../../hooks/useData';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { CommonValidationSchemas } from '../../utils/validation';
import { ActivityTypeService } from '../../graphql/services/activityTypeService';
import { ActivityTypeSelector } from './ActivityTypeSelector';
import { MilestoneManager } from './MilestoneManager';
import type { Challenge, Milestone, ChallengeType, ActivityType } from '../../types';

interface ChallengeFormProps {
    challengeToEdit?: Challenge;
    onSubmit?: (challenge: any) => void;
    onCancel?: () => void;
    isEditing?: boolean;
}

export const ChallengeForm: React.FC<ChallengeFormProps> = ({
    challengeToEdit,
    onSubmit,
    onCancel,
    isEditing = false
}) => {
    // State for activity types
    const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
    const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(true);

    const { createChallenge, updateChallenge } = useChallenges();
    const notifications = useNotifications();
    const { isLoading: isSubmitting, execute } = useAsyncState({
        showSuccessNotifications: true,
        successMessage: `Challenge ${isEditing ? 'updated' : 'created'} successfully!`
    });

    // Load activity types on component mount
    useEffect(() => {
        const loadActivityTypes = async () => {
            try {
                const types = await ActivityTypeService.getActivityTypes();
                setActivityTypes(types);
            } catch (error) {
                console.error('Failed to load activity types:', error);
                notifications.error('Failed to load activity types');
            } finally {
                setIsLoadingActivityTypes(false);
            }
        };

        loadActivityTypes();
    }, []);

    // Helper function to get default end date (one month from today)
    const getDefaultEndDate = () => {
        const today = new Date();
        const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        return oneMonthLater.toISOString().split('T')[0];
    };

    // Helper function to get default start date (today)
    const getDefaultStartDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Form state
    const [title, setTitle] = useState(challengeToEdit?.title || '');
    const [description, setDescription] = useState(challengeToEdit?.description || '');
    const [selectedActivityTypeIds, setSelectedActivityTypeIds] = useState<string[]>(
        challengeToEdit?.activityTypes || []
    );
    const [maxParticipants, setMaxParticipants] = useState(challengeToEdit?.maxParticipants?.toString() || '');
    const [maxTeamSize, setMaxTeamSize] = useState(challengeToEdit?.maxTeamSize?.toString() || '');
    const [startDate, setStartDate] = useState(challengeToEdit?.startDate || getDefaultStartDate());
    const [endDate, setEndDate] = useState(challengeToEdit?.endDate || getDefaultEndDate());
    const [challengeType, setChallengeType] = useState<ChallengeType>(challengeToEdit?.challengeType || 'individual');
    const [isPublic, setIsPublic] = useState(challengeToEdit?.isPublic !== false);
    const [accessCode, setAccessCode] = useState(challengeToEdit?.accessCode || '');
    const [milestonesByActivityType, setMilestonesByActivityType] = useState<Record<string, Partial<Milestone>[]>>(() => {
        if (challengeToEdit?.milestones && challengeToEdit.milestones.length > 0) {
            // Group existing milestones by activity type ID
            const grouped = challengeToEdit.milestones.reduce((acc, milestone) => {
                const activityTypeId = milestone.activityTypeId || 'general';
                if (!acc[activityTypeId]) acc[activityTypeId] = [];
                acc[activityTypeId].push(milestone);
                return acc;
            }, {} as Record<string, Partial<Milestone>[]>);
            return grouped;
        }
        // Default milestones for each selected activity type
        const defaultMilestones: Record<string, Partial<Milestone>[]> = {};
        selectedActivityTypeIds.forEach(activityTypeId => {
            defaultMilestones[activityTypeId] = [{ name: 'Bronze', value: undefined, activityTypeId }];
        });
        return defaultMilestones;
    });

    // Helper functions for managing activity types
    const handleActivityTypeChange = (newActivityTypeIds: string[]) => {
        setSelectedActivityTypeIds(newActivityTypeIds);

        // Update milestones for new activity types
        const newMilestonesByActivityType = { ...milestonesByActivityType };

        // Add default milestones for new activity types
        newActivityTypeIds.forEach(activityTypeId => {
            if (!newMilestonesByActivityType[activityTypeId]) {
                newMilestonesByActivityType[activityTypeId] = [
                    { name: 'Bronze', value: undefined, activityTypeId }
                ];
            }
        });

        // Remove milestones for removed activity types
        Object.keys(newMilestonesByActivityType).forEach(activityTypeId => {
            if (!newActivityTypeIds.includes(activityTypeId)) {
                delete newMilestonesByActivityType[activityTypeId];
            }
        });

        setMilestonesByActivityType(newMilestonesByActivityType);
    };

    const updateMilestone = (activityTypeId: string, index: number, field: string, value: any) => {
        const newMilestonesByActivityType = { ...milestonesByActivityType };
        const milestones = [...(newMilestonesByActivityType[activityTypeId] || [])];
        const milestone = { ...milestones[index] };

        if (field === 'value') {
            milestone.value = Number(value);
        } else {
            milestone.name = String(value);
        }
        milestone.activityTypeId = activityTypeId;

        milestones[index] = milestone;
        newMilestonesByActivityType[activityTypeId] = milestones;
        setMilestonesByActivityType(newMilestonesByActivityType);
    };

    const addMilestone = (activityTypeId: string) => {
        const newMilestonesByActivityType = { ...milestonesByActivityType };
        const milestones = [...(newMilestonesByActivityType[activityTypeId] || [])];
        milestones.push({ name: '', value: undefined, activityTypeId });
        newMilestonesByActivityType[activityTypeId] = milestones;
        setMilestonesByActivityType(newMilestonesByActivityType);
    };

    const removeMilestone = (activityTypeId: string, index: number) => {
        const newMilestonesByActivityType = { ...milestonesByActivityType };
        const milestones = [...(newMilestonesByActivityType[activityTypeId] || [])];
        if (milestones.length > 1) {
            milestones.splice(index, 1);
            newMilestonesByActivityType[activityTypeId] = milestones;
            setMilestonesByActivityType(newMilestonesByActivityType);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const titleValidation = CommonValidationSchemas.challengeTitle(title);
        if (!titleValidation.isValid) {
            notifications.validationError(titleValidation.error!);
            return;
        }

        // Validate start date is not in the past
        const today = new Date().toISOString().split('T')[0];
        if (startDate < today) {
            notifications.validationError('Start date cannot be in the past');
            return;
        }

        // Validate end date is after start date
        if (endDate <= startDate) {
            notifications.validationError('End date must be after start date');
            return;
        }

        const endDateValidation = CommonValidationSchemas.endDate(endDate);
        if (!endDateValidation.isValid) {
            notifications.validationError(endDateValidation.error!);
            return;
        }

        if (selectedActivityTypeIds.length === 0) {
            notifications.validationError('Please select at least one activity type');
            return;
        }

        if (maxParticipants) {
            const maxParticipantsValidation = CommonValidationSchemas.maxParticipants(maxParticipants);
            if (!maxParticipantsValidation.isValid) {
                notifications.validationError(maxParticipantsValidation.error!);
                return;
            }
        }

        const result = await execute(async () => {
            // Collect all valid milestones across all activity types
            const allMilestones: Array<{ name: string, value: number, activityTypeId: string, activityType?: any }> = [];
            Object.entries(milestonesByActivityType).forEach(([activityTypeId, milestones]) => {
                const activityType = activityTypes.find(at => at.id === activityTypeId);
                const validMilestones = milestones
                    .filter(m => m.name && m.value && m.value > 0)
                    .map(m => ({
                        name: m.name!,
                        value: m.value!,
                        activityTypeId,
                        activityType
                    }));
                allMilestones.push(...validMilestones);
            });

            const challengeData = {
                title: title.trim(),
                description: description.trim() || undefined,
                activityTypes: selectedActivityTypeIds,
                challengeType: challengeType.toUpperCase() as 'INDIVIDUAL' | 'TEAM',
                maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
                maxTeamSize: challengeType === 'team' && maxTeamSize ? parseInt(maxTeamSize) : undefined,
                startDate,
                endDate,
                isPublic,
                accessCode: !isPublic && accessCode.trim() ? accessCode.trim() : undefined, // Only include access code for private challenges
                milestones: allMilestones
            };

            if (isEditing && challengeToEdit) {
                return await updateChallenge(challengeToEdit.id, challengeData);
            } else {
                return await createChallenge(challengeData);
            }
        });

        if (result) {
            onSubmit?.(result);
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
                    placeholder="e.g., Mixed Fitness Challenge - Running & Cycling"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                    placeholder="Describe your mixed challenge. Include what activities are allowed and any special rules."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <FormControl isRequired={selectedActivityTypeIds.length === 0}>
                <FormLabel>Activity Types</FormLabel>
                <ActivityTypeSelector
                    activityTypes={activityTypes}
                    selectedActivityTypeIds={selectedActivityTypeIds}
                    onSelectionChange={handleActivityTypeChange}
                    isLoading={isLoadingActivityTypes}
                    isDisabled={isSubmitting}
                />
            </FormControl>

            <Grid templateColumns={{ base: '1fr', md: challengeType === 'team' ? '1fr 1fr 1fr' : '1fr 1fr' }} gap={6}>
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
                {challengeType === 'team' && (
                    <FormControl>
                        <FormLabel>Max Team Size (Optional)</FormLabel>
                        <Input
                            type="number"
                            placeholder="e.g., 5"
                            value={maxTeamSize}
                            onChange={(e) => setMaxTeamSize(e.target.value)}
                            isDisabled={isSubmitting}
                        />
                        <Text fontSize="xs" color="gray.500" mt={1}>
                            Maximum members per team
                        </Text>
                    </FormControl>
                )}
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        isDisabled={isSubmitting}
                        min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        When the challenge begins
                    </Text>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        isDisabled={isSubmitting}
                        min={startDate || new Date().toISOString().split('T')[0]} // End date must be after start date
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        When the challenge ends
                    </Text>
                </FormControl>
            </Grid>

            {/* Activity-Specific Milestones */}
            {selectedActivityTypeIds.length > 0 && (
                <FormControl>
                    <MilestoneManager
                        activityTypes={activityTypes}
                        selectedActivityTypeIds={selectedActivityTypeIds}
                        milestonesByActivityType={milestonesByActivityType}
                        onUpdateMilestone={updateMilestone}
                        onAddMilestone={addMilestone}
                        onRemoveMilestone={removeMilestone}
                        isDisabled={isSubmitting}
                    />
                </FormControl>
            )}

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
                <Text fontSize="xs" color="gray.500" mt={1}>
                    {isPublic
                        ? "Anyone can find and join this challenge."
                        : "Only users with the access code can join this private challenge."
                    }
                </Text>
            </FormControl>

            {/* Access Code field for private challenges */}
            {!isPublic && (
                <FormControl>
                    <FormLabel>Access Code</FormLabel>
                    <Input
                        placeholder="Create an access code for this private challenge"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        isDisabled={isSubmitting}
                        maxLength={50}
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        Users will need this code to join your private challenge. Keep it simple and shareable.
                    </Text>
                </FormControl>
            )}

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

export default ChallengeForm;
