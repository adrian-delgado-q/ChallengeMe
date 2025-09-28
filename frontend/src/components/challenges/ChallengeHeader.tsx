import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    Heading,
    Text,
    VStack,
    HStack,
    Grid,
    Badge,
    Icon,
    Divider,
    Flex,
    Box
} from '@chakra-ui/react';
import { Card } from '../common/Card';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';
import { ActivityTypeService } from '../../graphql/services/activityTypeService';
import type { Challenge, ActivityType } from '../../types';

interface ChallengeHeaderProps {
    challenge: Challenge;
    actionButtons?: ReactNode;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ challenge, actionButtons }) => {
    const [activityTypeDetails, setActivityTypeDetails] = useState<ActivityType[]>([]);
    const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(false);

    // Load activity type details when component mounts
    useEffect(() => {
        const loadActivityTypes = async () => {
            if (!challenge.activityTypes || challenge.activityTypes.length === 0) return;

            try {
                setIsLoadingActivityTypes(true);
                const allActivityTypes = await ActivityTypeService.getActivityTypes();
                const filteredTypes = allActivityTypes.filter(at =>
                    challenge.activityTypes!.includes(at.id)
                );
                setActivityTypeDetails(filteredTypes);
            } catch (error) {
                console.error('Failed to load activity types:', error);
            } finally {
                setIsLoadingActivityTypes(false);
            }
        };

        loadActivityTypes();
    }, [challenge.activityTypes]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getChallengeStatusBadge = () => {
        const today = new Date();
        const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
        const endDate = new Date(challenge.endDate);

        if (startDate && today < startDate) {
            return <Badge colorScheme="blue" variant="subtle">Upcoming</Badge>;
        } else if (today > endDate) {
            return <Badge colorScheme="gray" variant="subtle">Completed</Badge>;
        } else {
            return <Badge colorScheme="green" variant="subtle">Active</Badge>;
        }
    };

    return (
        <Card p={4}>
            <VStack spacing={3} align="stretch">
                {/* Title, Description, and Details in one compact layout */}
                <Flex direction={{ base: 'column', lg: 'row' }} gap={4} align={{ lg: 'flex-start' }}>
                    {/* Left side: Title and Description */}
                    <Box flex="1">
                        <HStack spacing={3} align="center" mb={2}>
                            <Heading as="h1" size="lg" color="gray.800">
                                {challenge.title}
                            </Heading>
                            {getChallengeStatusBadge()}
                        </HStack>
                        {challenge.description && (
                            <Text color="gray.600" fontSize="sm" lineHeight="1.5">
                                {challenge.description}
                            </Text>
                        )}
                    </Box>

                    {/* Right side: Challenge Details as 4x1 horizontal grid */}
                    <Grid
                        templateColumns="repeat(4, 1fr)"
                        gap={2}
                        minW={{ lg: '280px' }}
                        alignItems="center"
                        bg="gray.50"
                        p={2}
                        borderRadius="md"
                    >
                        {/* Challenge Type */}
                        <VStack align="center" spacing={0}>
                            <Icon as={TrophyIcon} w={3} h={3} color="orange.500" />
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">
                                Type
                            </Text>
                            <Text fontSize="xs" fontWeight="medium" textAlign="center">
                                {challenge.challengeType === 'individual' ? 'Individual' : 'Team'}
                            </Text>
                        </VStack>

                        {/* Participants */}
                        <VStack align="center" spacing={0}>
                            <Icon as={UserTeamIcon} w={3} h={3} color="blue.500" />
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">
                                Participants
                            </Text>
                            <Text fontSize="xs" fontWeight="medium">
                                {challenge.participants || 0}
                                {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
                            </Text>
                        </VStack>

                        {/* Start Date */}
                        <VStack align="center" spacing={0}>
                            <Icon as={CalendarIcon} w={3} h={3} color="green.500" />
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">
                                Started
                            </Text>
                            <Text fontSize="xs" fontWeight="medium" textAlign="center">
                                {challenge.startDate ? formatDate(challenge.startDate) : 'Not set'}
                            </Text>
                        </VStack>

                        {/* End Date */}
                        <VStack align="center" spacing={0}>
                            <Icon as={CalendarIcon} w={3} h={3} color="red.500" />
                            <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">
                                Ends
                            </Text>
                            <Text fontSize="xs" fontWeight="medium" textAlign="center">
                                {formatDate(challenge.endDate)}
                            </Text>
                        </VStack>
                    </Grid>
                </Flex>

                {/* Activity Types and Action Buttons */}
                {challenge.activityTypes && challenge.activityTypes.length > 0 && (
                    <>
                        <Divider />
                        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ md: 'center' }} gap={3}>
                            {/* Activity Types */}
                            <VStack align="start" spacing={1} flex="1">
                                <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="semibold">
                                    Activity Types
                                </Text>
                                <HStack spacing={2} flexWrap="wrap">
                                    {isLoadingActivityTypes ? (
                                        <Text fontSize="xs" color="gray.400">Loading...</Text>
                                    ) : activityTypeDetails.length > 0 ? (
                                        activityTypeDetails.map((activityType) => (
                                            <Badge key={activityType.id} colorScheme="orange" variant="outline" fontSize="xs">
                                                {activityType.name}
                                            </Badge>
                                        ))
                                    ) : (
                                        challenge.activityTypes.map((activityTypeId, index) => (
                                            <Badge key={index} colorScheme="orange" variant="outline" fontSize="xs">
                                                {activityTypeId}
                                            </Badge>
                                        ))
                                    )}
                                </HStack>
                            </VStack>

                            {/* Action Buttons */}
                            {actionButtons && (
                                <Box>
                                    {actionButtons}
                                </Box>
                            )}
                        </Flex>
                    </>
                )}
            </VStack>
        </Card>
    );
};
