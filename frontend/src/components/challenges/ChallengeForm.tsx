import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Grid, Heading, Input, Radio, RadioGroup, HStack,
  Text, Textarea, VStack, Select, InputGroup, InputRightAddon, IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Challenge, Milestone, ChallengeType } from '../../types';

interface ChallengeFormProps {
    challengeToEdit?: Challenge; // If provided, the form is in "edit" mode
    onSubmit: (formData: any) => void;
    isEditing: boolean;
}

const activityOptions = [
  "Running", "Walking", "Cycling", "Swimming", "Stair Climbing", 
  "Strength Training", "Yoga", "Hiking", "Rowing", "Meditation"
];

export const ChallengeForm: React.FC<ChallengeFormProps> = ({ challengeToEdit, onSubmit, isEditing }) => {
    // Local state to manage form fields, pre-populated if editing
    const [title, setTitle] = useState(challengeToEdit?.title || '');
    const [description, setDescription] = useState(''); // Assuming description will be added to the Challenge type
    const [milestones, setMilestones] = useState<Partial<Milestone>[]>(
        challengeToEdit?.milestones || [{ name: 'Bronze', value: undefined }]
    );
    const [challengeType, setChallengeType] = useState<ChallengeType>(challengeToEdit?.challengeType || 'individual');

    // Populate description when editing data is available
    useEffect(() => {
      if(challengeToEdit) {
        // setDescription(challengeToEdit.description || ''); 
      }
    }, [challengeToEdit]);


    const handleMilestoneChange = (index: number, field: keyof Milestone, value: string | number) => {
        const newMilestones = [...milestones];
        if (field === 'value') {
            newMilestones[index][field] = Number(value) as any; // Explicitly cast to avoid type mismatch
        } else {
            newMilestones[index][field] = value as any; // Explicitly cast to avoid type mismatch
        }
        setMilestones(newMilestones);
    };
    

    const addMilestone = () => {
        setMilestones([...milestones, { name: '', value: undefined }]);
    };

    const removeMilestone = (index: number) => {
        if (milestones.length > 1) {
            const newMilestones = milestones.filter((_, i) => i !== index);
            setMilestones(newMilestones);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct form data object to pass up
        const formData = { title, description, milestones, challengeType /* ...other fields */ };
        onSubmit(formData);
    };
    
    return (
        <VStack as="form" spacing={6} w="full" align="stretch" onSubmit={handleSubmit}>
            
            <FormControl as="fieldset" isRequired>
                <FormLabel as="legend">Challenge Type</FormLabel>
                <RadioGroup onChange={(val: ChallengeType) => setChallengeType(val)} value={challengeType}>
                    <HStack spacing={4}>
                        <Radio value="individual" colorScheme="orange">Individual Challenge</Radio>
                        <Radio value="group" colorScheme="orange">Group Challenge</Radio>
                    </HStack>
                </RadioGroup>
                <Text fontSize="xs" color="gray.500" mt={1}>
                    {challengeType === 'individual' 
                        ? "Only individual users can join this challenge."
                        : "Only groups can join this challenge."
                    }
                </Text>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Challenge Title</FormLabel>
                <Input 
                    placeholder="e.g., August 30-Day Plank Challenge" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                    placeholder="Briefly describe your challenge, its rules, and what makes it special."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </FormControl>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <FormControl isRequired>
                    <FormLabel>Activity Type</FormLabel>
                    <Select placeholder="Select activity" defaultValue={isEditing ? challengeToEdit?.type : ''}>
                        {activityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                </FormControl>
                 <FormControl>
                    <FormLabel>Max {challengeType === 'group' ? 'Groups' : 'Participants'} (Optional)</FormLabel>
                    <Input type="number" placeholder="e.g., 50" defaultValue={isEditing ? challengeToEdit?.maxParticipants : ''} />
                </FormControl>
            </Grid>

            <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input type="date" defaultValue={isEditing ? challengeToEdit?.endDate : ''} />
            </FormControl>

            <FormControl>
                <FormLabel>Challenge Rules (Optional)</FormLabel>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <InputGroup>
                        <Input type="number" placeholder="Minimum Duration" defaultValue={isEditing ? challengeToEdit?.rules?.minDuration : ''} />
                        <InputRightAddon>minutes</InputRightAddon>
                    </InputGroup>
                    <InputGroup>
                        <Input type="number" placeholder="Minimum Repetitions" defaultValue={isEditing ? challengeToEdit?.rules?.minRepetitions : ''} />
                        <InputRightAddon>reps</InputRightAddon>
                    </InputGroup>
                </Grid>
            </FormControl>
            
            <FormControl isRequired>
                <FormLabel>Milestone Goals</FormLabel>
                 <VStack spacing={4} align="stretch">
                    {milestones.map((milestone, index) => (
                        <HStack key={index} spacing={2}>
                            <Input 
                                placeholder={`Milestone ${index + 1} Name`} 
                                value={milestone.name}
                                onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                            />
                            <Input 
                                type="number" 
                                placeholder="Goal Value (e.g., 100)" 
                                value={milestone.value || ''}
                                onChange={(e) => handleMilestoneChange(index, 'value', e.target.value)}
                            />
                            <IconButton 
                                aria-label="Remove milestone" 
                                icon={<DeleteIcon />} 
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => removeMilestone(index)}
                                isDisabled={milestones.length <= 1}
                            />
                        </HStack>
                    ))}
                    <Button
                        leftIcon={<AddIcon />}
                        size="sm"
                        variant="outline"
                        colorScheme="orange"
                        onClick={addMilestone}
                    >
                        Add Milestone
                    </Button>
                </VStack>
            </FormControl>

            <FormControl as="fieldset">
                <FormLabel as="legend">Visibility</FormLabel>
                <RadioGroup defaultValue={isEditing ? (challengeToEdit?.isPublic ? 'public' : 'private') : 'public'}>
                    <HStack spacing={4}>
                        <Radio value="public" colorScheme="orange">Public</Radio>
                        <Radio value="private" colorScheme="orange">Private</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <HStack justify="flex-end" pt={4}>
                <Button type="submit" colorScheme="orange" size="lg">
                    {isEditing ? 'Update Challenge' : 'Create Challenge'}
                </Button>
            </HStack>
        </VStack>
    );
};
