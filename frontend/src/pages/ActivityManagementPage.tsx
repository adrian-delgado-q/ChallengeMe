import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Avatar,
    useDisclosure,
    Alert,
    AlertIcon,
    Spinner,
    Center,
    Select,
    IconButton,
    useColorModeValue,
    Flex,
    Tooltip,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useToast
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaClock, FaFilter } from 'react-icons/fa';
import { Card } from '../components/common/Card';
import { EditActivityModal } from '../components/common/EditActivityModal';
import { ActivityService } from '../graphql/services/activityService';
import type { Activity } from '../types';
import { ChallengeService } from '../graphql/services';
import { useNavigate } from 'react-router-dom';

interface Challenge {
    id: string;
    title: string;
}

export const ActivityManagementPage: React.FC = () => {
    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [selectedChallenge, setSelectedChallenge] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [activityToDelete, setActivityToDelete] = useState<Activity | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const navigate = useNavigate();
    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const deleteRef = React.useRef<HTMLButtonElement>(null);

    // Filter activities based on selected challenge
    const filteredActivities = useMemo(() => {
        if (selectedChallenge === 'all') {
            return allActivities;
        }
        return allActivities.filter(activity =>
            activity.challenge && activity.challenge.id === selectedChallenge
        );
    }, [allActivities, selectedChallenge]);

    // Fetch all activities (without filtering)
    const fetchActivities = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Always fetch all activities, filtering will be done locally
            const data = await ActivityService.getActivitiesForManagement();
            setAllActivities(
                (data as any[]).map(item => ({
                    ...item,
                    activityTypeId: item.activityTypeId ?? item.activityType?.id ?? '',
                    value: item.value ?? item.distance ?? item.duration ?? item.repetitions ?? item.weight ?? item.sets ?? item.calories ?? item.pace ?? 0
                }))
            );
        } catch (err: any) {
            setError(err.message || 'Failed to fetch activities');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch user's challenges for filtering
    const fetchChallenges = useCallback(async () => {
        try {
            const data = await ChallengeService.getMyChallenges();
            setChallenges(data || []);
        } catch (err: any) {
            console.error('Failed to fetch challenges:', err);
        }
    }, []);

    // Load data on mount
    useEffect(() => {
        fetchActivities();
        fetchChallenges();
    }, [fetchActivities, fetchChallenges]);

    // Handle activity edit
    const handleEditActivity = (activity: Activity) => {
        setSelectedActivity(activity);
        onEditOpen();
    };

    // Handle edit modal close
    const handleEditClose = () => {
        setSelectedActivity(null); // Clear selected activity
        onEditClose();
    };

    // Handle successful activity update
    const handleActivityUpdated = async () => {
        await fetchActivities(); // Refresh the list
    };

    // Handle activity delete
    const handleDeleteActivity = (activity: Activity) => {
        setActivityToDelete(activity);
        onDeleteOpen();
    };

    // Confirm delete
    const confirmDelete = async () => {
        if (!activityToDelete) return;

        try {
            setIsDeleting(true);
            await ActivityService.deleteActivity(activityToDelete.id);

            toast({
                title: 'Activity deleted',
                description: 'Your activity has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Refresh activities
            await fetchActivities();
            onDeleteClose();
        } catch (err: any) {
            toast({
                title: 'Delete failed',
                description: err.message || 'Failed to delete activity',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    // Handle activity update
    const handleUpdateActivity = async (activityId: string, data: {
        activityTypeId?: string;
        value?: number;
        notes?: string;
        date: string
    }) => {
        await ActivityService.updateActivity(activityId, data);
        await fetchActivities(); // Refresh the list
    };

    // Format date for display
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format uploaded time
    const formatUploadedTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffHours < 48) return `${Math.floor(diffHours / 24)}d ago`;
        return date.toLocaleDateString();
    };

    const getEditableStatus = (activity: Activity) => {
        if (!activity.isEditable) {
            return { text: 'Not editable', color: 'red' };
        }

        const hoursLeft = Math.max(0, 48 - Math.floor((new Date().getTime() - new Date(activity.uploadedAt).getTime()) / (1000 * 60 * 60)));

        if (hoursLeft > 24) {
            return { text: `${hoursLeft}h left`, color: 'green' };
        } else if (hoursLeft > 12) {
            return { text: `${hoursLeft}h left`, color: 'yellow' };
        } else {
            return { text: `${hoursLeft}h left`, color: 'orange' };
        }
    };

    if (loading) {
        return (
            <Container maxW="6xl" py={8}>
                <Center h="400px">
                    <VStack>
                        <Spinner size="xl" color="orange.500" />
                        <Text>Loading your activities...</Text>
                    </VStack>
                </Center>
            </Container>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <VStack spacing={6} align="stretch">
                {/* Header */}
                <Box>
                    <Heading as="h1" size="xl" mb={2}>
                        My Activities
                    </Heading>
                    <Text color="gray.600">
                        Manage and view all your logged activities. You can edit activities within 48 hours of logging them.
                    </Text>
                </Box>

                {/* Filters */}
                <Card p={4}>
                    <HStack spacing={4} align="center">
                        <HStack>
                            <FaFilter />
                            <Text fontWeight="medium">Filter by Challenge:</Text>
                        </HStack>
                        <Select
                            value={selectedChallenge}
                            onChange={(e) => setSelectedChallenge(e.target.value)}
                            maxW="300px"
                        >
                            <option value="all">All Challenges</option>
                            {challenges.map((challenge) => (
                                <option key={challenge.id} value={challenge.id}>
                                    {challenge.title}
                                </option>
                            ))}
                        </Select>
                        <Text fontSize="sm" color="gray.500">
                            {filteredActivities.length} activities found
                        </Text>
                    </HStack>
                </Card>

                {/* Error state */}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {/* Empty state */}
                {!loading && filteredActivities.length === 0 && (
                    <Card p={8} textAlign="center">
                        <VStack spacing={4}>
                            <Text fontSize="lg" color="gray.500">
                                No activities found
                            </Text>
                            <Text color="gray.400">
                                {selectedChallenge === 'all'
                                    ? "You haven't logged any activities yet."
                                    : "No activities found for the selected challenge."
                                }
                            </Text>
                            <Button
                                colorScheme="orange"
                                onClick={() => navigate('/challenges')}
                            >
                                Explore Challenges
                            </Button>
                        </VStack>
                    </Card>
                )}

                {/* Activities list */}
                {filteredActivities.length > 0 && (
                    <VStack spacing={4} align="stretch">
                        {filteredActivities.map((activity) => {
                            const editableStatus = getEditableStatus(activity);

                            return (
                                <Card
                                    key={activity.id}
                                    bg={cardBg}
                                    borderColor={borderColor}
                                    borderWidth="1px"
                                    p={6}
                                    _hover={{ shadow: 'md' }}
                                    transition="all 0.2s"
                                >
                                    <Flex justify="space-between" align="flex-start">
                                        <HStack spacing={4} flex={1}>
                                            <Avatar
                                                src={activity.user?.avatarUrl}
                                                name={activity.user?.username}
                                                size="md"
                                            />

                                            <VStack align="start" spacing={2} flex={1}>
                                                <HStack spacing={2} align="center">
                                                    <Text fontWeight="bold">
                                                        {activity.challenge?.title || 'Unknown Challenge'}
                                                    </Text>
                                                    <Badge
                                                        colorScheme={editableStatus.color}
                                                        variant="subtle"
                                                    >
                                                        <HStack spacing={1}>
                                                            <FaClock size="10px" />
                                                            <Text fontSize="xs">{editableStatus.text}</Text>
                                                        </HStack>
                                                    </Badge>
                                                </HStack>

                                                <Text color="gray.600" fontSize="sm">
                                                    Activity Date: {formatDate(activity.date)}
                                                </Text>

                                                {activity.notes && (
                                                    <Text>
                                                        {activity.notes}
                                                    </Text>
                                                )}

                                                <Text fontSize="xs" color="gray.500">
                                                    Logged {formatUploadedTime(activity.uploadedAt)}
                                                    {activity.team && ` • Team: ${activity.team.name}`}
                                                </Text>
                                            </VStack>
                                        </HStack>

                                        {/* Action buttons */}
                                        <HStack spacing={2}>
                                            <Tooltip label={activity.isEditable ? "Edit activity" : "Activity can no longer be edited (48h limit)"}>
                                                <IconButton
                                                    aria-label="Edit activity"
                                                    icon={<FaEdit />}
                                                    size="sm"
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    onClick={() => handleEditActivity(activity)}
                                                    isDisabled={!activity.isEditable}
                                                />
                                            </Tooltip>

                                            <Tooltip label={activity.isEditable ? "Delete activity" : "Activity can no longer be deleted (48h limit)"}>
                                                <IconButton
                                                    aria-label="Delete activity"
                                                    icon={<FaTrash />}
                                                    size="sm"
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() => handleDeleteActivity(activity)}
                                                    isDisabled={!activity.isEditable}
                                                />
                                            </Tooltip>
                                        </HStack>
                                    </Flex>
                                </Card>
                            );
                        })}
                    </VStack>
                )}

                {/* Info box */}
                <Alert status="info" variant="left-accent">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">Activity Management Rules</Text>
                        <Text fontSize="sm">
                            • Activities can only be edited or deleted within 48 hours of being logged
                            • After 48 hours, activities become read-only for data integrity
                            • Use filters to find specific activities across your challenges
                        </Text>
                    </VStack>
                </Alert>
            </VStack>

            {/* Edit Modal */}
            <EditActivityModal
                key={selectedActivity?.id || 'no-activity'}
                isOpen={isEditOpen}
                onClose={handleEditClose}
                activity={selectedActivity}
                onActivityUpdated={handleActivityUpdated}
                onUpdateActivity={handleUpdateActivity}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={deleteRef}
                onClose={onDeleteClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Activity
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this activity? This action cannot be undone.

                            {activityToDelete && (
                                <Box mt={4} p={3} bg="gray.50" borderRadius="md">
                                    <Text fontSize="sm" fontWeight="medium">
                                        {activityToDelete.challenge?.title}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {formatDate(activityToDelete.date)}
                                    </Text>
                                    {activityToDelete.notes && (
                                        <Text fontSize="sm" mt={1}>
                                            "{activityToDelete.notes}"
                                        </Text>
                                    )}
                                </Box>
                            )}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={deleteRef} onClick={onDeleteClose} isDisabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={confirmDelete}
                                ml={3}
                                isLoading={isDeleting}
                                loadingText="Deleting..."
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    );
};
