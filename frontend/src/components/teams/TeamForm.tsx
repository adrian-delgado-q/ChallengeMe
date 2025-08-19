import React, { useState, useRef } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    Switch,
    useToast,
    FormHelperText,
    Avatar,
    Box,
    Text,
    Checkbox,
    CheckboxGroup,
    SimpleGrid,
    IconButton,
    Flex
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TeamService } from '../../graphql/services';

// Available sports/activity types matching the platform
const SPORTS_TYPES = [
    "Running", "Walking", "Cycling", "Swimming", "Stair Climbing",
    "Strength Training", "Yoga", "Hiking", "Rowing", "Meditation"
];

interface TeamFormProps {
    onSubmit: (team: any) => void;
    onCancel: () => void;
    initialData?: any;
    isEditing?: boolean;
}

export const TeamForm: React.FC<TeamFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false
}) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        avatarUrl: initialData?.avatarUrl || '',
        isPublic: initialData?.isPublic ?? true,
        maxMembers: initialData?.maxMembers || '',
        sportsTypes: initialData?.sportsTypes || []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>(initialData?.avatarUrl || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast({
                    title: 'Invalid File Type',
                    description: 'Please select an image file.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: 'File Too Large',
                    description: 'Please select an image smaller than 5MB.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            setAvatarFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview('');
        setFormData(prev => ({ ...prev, avatarUrl: '' }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadAvatarFile = async (file: File): Promise<string> => {
        // Note: This is a placeholder for file upload functionality
        // In a real implementation, you would upload to your storage service
        // For now, we'll use a data URL as a fallback
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Team name is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Validate max members if provided
        if (formData.maxMembers && (Number(formData.maxMembers) < 2 || Number(formData.maxMembers) > 1000)) {
            toast({
                title: 'Validation Error',
                description: 'Maximum members must be between 2 and 1000',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            let avatarUrl = formData.avatarUrl;

            // Upload avatar file if one was selected
            if (avatarFile) {
                try {
                    avatarUrl = await uploadAvatarFile(avatarFile);
                } catch (uploadError) {
                    console.warn('Avatar upload failed, proceeding without avatar:', uploadError);
                    avatarUrl = '';
                }
            }

            const teamData = {
                ...formData,
                avatarUrl: avatarUrl || undefined,
                maxMembers: formData.maxMembers ? Number(formData.maxMembers) : undefined,
                sportsTypes: formData.sportsTypes.length > 0 ? formData.sportsTypes : undefined
            };

            let result;
            if (isEditing && initialData?.id) {
                result = await TeamService.updateTeam(initialData.id, teamData);
            } else {
                result = await TeamService.createTeam(teamData);
            }

            toast({
                title: 'Success!',
                description: `Team ${isEditing ? 'updated' : 'created'} successfully`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            onSubmit(result);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || `Failed to ${isEditing ? 'update' : 'create'} team`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
                {/* Team Avatar Upload */}
                <FormControl>
                    <FormLabel>Team Avatar</FormLabel>
                    <Flex align="center" gap={4}>
                        <Avatar
                            size="xl"
                            src={avatarPreview}
                            name={formData.name}
                        />
                        <VStack align="stretch" flex="1" spacing={2}>
                            <HStack>
                                <Button
                                    size="sm"
                                    leftIcon={<EditIcon />}
                                    onClick={() => fileInputRef.current?.click()}
                                    variant="outline"
                                    isDisabled={isSubmitting}
                                >
                                    {avatarPreview ? 'Change Image' : 'Upload Image'}
                                </Button>
                                {avatarPreview && (
                                    <IconButton
                                        size="sm"
                                        icon={<DeleteIcon />}
                                        onClick={handleRemoveAvatar}
                                        variant="outline"
                                        colorScheme="red"
                                        aria-label="Remove avatar"
                                        isDisabled={isSubmitting}
                                    />
                                )}
                            </HStack>
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarFileChange}
                                display="none"
                            />
                            <FormHelperText fontSize="xs">
                                Upload an image for your team (max 5MB). Supported formats: JPG, PNG, GIF
                            </FormHelperText>
                        </VStack>
                    </Flex>
                </FormControl>

                {/* Team Name */}
                <FormControl isRequired>
                    <FormLabel>Team Name</FormLabel>
                    <Input
                        placeholder="Enter your team name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        maxLength={50}
                        isDisabled={isSubmitting}
                    />
                    <FormHelperText>
                        Choose a unique and memorable name for your team
                    </FormHelperText>
                </FormControl>

                {/* Team Description */}
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        placeholder="Describe your team's goals and what kind of challenges you're interested in..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        maxLength={500}
                        resize="vertical"
                        isDisabled={isSubmitting}
                    />
                    <FormHelperText>
                        Help others understand what your team is about (optional)
                    </FormHelperText>
                </FormControl>

                {/* Maximum Members */}
                <FormControl>
                    <FormLabel>Maximum Members (Optional)</FormLabel>
                    <Input
                        type="number"
                        placeholder="e.g., 10"
                        value={formData.maxMembers}
                        onChange={(e) => handleInputChange('maxMembers', e.target.value)}
                        min="2"
                        max="1000"
                        isDisabled={isSubmitting}
                    />
                    <FormHelperText>
                        Set a limit on how many members can join your team (leave empty for no limit)
                    </FormHelperText>
                </FormControl>

                {/* Sports Types */}
                <FormControl>
                    <FormLabel>Sports & Activities (Optional)</FormLabel>
                    <Text fontSize="sm" color="gray.600" mb={3}>
                        Select the types of activities your team focuses on:
                    </Text>
                    <CheckboxGroup
                        value={formData.sportsTypes}
                        onChange={(values) => handleInputChange('sportsTypes', values)}
                    >
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
                            {SPORTS_TYPES.map((sport) => (
                                <Checkbox
                                    key={sport}
                                    value={sport}
                                    colorScheme="orange"
                                    isDisabled={isSubmitting}
                                >
                                    {sport}
                                </Checkbox>
                            ))}
                        </SimpleGrid>
                    </CheckboxGroup>
                    <FormHelperText>
                        This helps other users find teams that match their interests
                    </FormHelperText>
                </FormControl>

                {/* Privacy Setting */}
                <FormControl>
                    <HStack justify="space-between">
                        <Box>
                            <FormLabel mb={1}>Team Visibility</FormLabel>
                            <Text fontSize="sm" color="gray.600">
                                {formData.isPublic
                                    ? 'Anyone can find and join your team'
                                    : 'Team is private and requires invitation'
                                }
                            </Text>
                        </Box>
                        <Switch
                            isChecked={formData.isPublic}
                            onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                            colorScheme="orange"
                            size="lg"
                            isDisabled={isSubmitting}
                        />
                    </HStack>
                </FormControl>

                {/* Form Actions */}
                <HStack spacing={4} pt={4}>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        flex="1"
                        isDisabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        colorScheme="orange"
                        isLoading={isSubmitting}
                        loadingText={isEditing ? 'Updating...' : 'Creating...'}
                        flex="1"
                    >
                        {isEditing ? 'Update Team' : 'Create Team'}
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};
