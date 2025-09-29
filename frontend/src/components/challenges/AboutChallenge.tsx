import React, { useState, useEffect } from 'react';
import { Heading, Grid, VStack, HStack, Text, Icon, Badge, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import { Card } from '../common/Card';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';
import { ActivityTypeService } from '../../graphql/services/activityTypeService';
import { useUser } from '../../contexts/AuthContext';
import type { Challenge, ActivityType } from '../../types';

interface AboutChallengeProps {
  challenge: Challenge;
}

export const AboutChallenge: React.FC<AboutChallengeProps> = ({ challenge }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activityTypeDetails, setActivityTypeDetails] = useState<ActivityType[]>([]);
  const [isLoadingActivityTypes, setIsLoadingActivityTypes] = useState(false);

  const isCurrentUserCreator = user?.id === challenge.creatorId;

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
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card p={6}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading as="h3" size="md" color="gray.800">
            About This Challenge
          </Heading>
          {isCurrentUserCreator && (
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              leftIcon={<SettingsIcon />}
              onClick={() => navigate(`/challenges/${challenge.id}/manage`)}
            >
              Manage
            </Button>
          )}
        </HStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          {/* Challenge Type */}
          <VStack align="start" spacing={2}>
            <HStack spacing={2} align="center">
              <Icon as={TrophyIcon} w={4} h={4} color="orange.500" />
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="uppercase">
                Type
              </Text>
            </HStack>
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              {challenge.challengeType === 'individual' ? 'Individual Challenge' : 'Team Challenge'}
            </Text>
          </VStack>

          {/* Activity Types */}
          <VStack align="start" spacing={2}>
            <HStack spacing={2} align="center">
              <Icon as={TrophyIcon} w={4} h={4} color="blue.500" />
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="uppercase">
                Activity Types
              </Text>
            </HStack>
            <VStack align="start" spacing={1}>
              {isLoadingActivityTypes ? (
                <Text fontSize="sm" color="gray.400">
                  Loading...
                </Text>
              ) : activityTypeDetails.length > 0 ? (
                <HStack spacing={1} flexWrap="wrap">
                  {activityTypeDetails.map(activityType => (
                    <Badge key={activityType.id} colorScheme="blue" variant="subtle" fontSize="xs">
                      {activityType.name}
                    </Badge>
                  ))}
                </HStack>
              ) : (
                <HStack spacing={1} flexWrap="wrap">
                  {challenge.activityTypes?.map((activityTypeId, index) => (
                    <Badge key={index} colorScheme="blue" variant="subtle" fontSize="xs">
                      {activityTypeId}
                    </Badge>
                  ))}
                </HStack>
              )}
            </VStack>
          </VStack>

          {/* Participants */}
          <VStack align="start" spacing={2}>
            <HStack spacing={2} align="center">
              <Icon as={UserTeamIcon} w={4} h={4} color="green.500" />
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="uppercase">
                Participants
              </Text>
            </HStack>
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              {challenge.participants || 0}
              {challenge.maxParticipants && (
                <Text as="span" color="gray.500">
                  {' '}
                  / {challenge.maxParticipants}
                </Text>
              )}
              <Text as="span" fontSize="sm" color="gray.500" ml={1}>
                {challenge.challengeType === 'individual' ? 'people' : 'teams'}
              </Text>
            </Text>
          </VStack>

          {/* Duration */}
          <VStack align="start" spacing={2}>
            <HStack spacing={2} align="center">
              <Icon as={CalendarIcon} w={4} h={4} color="purple.500" />
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="uppercase">
                Duration
              </Text>
            </HStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.700">
                <Text as="span" fontWeight="medium">
                  Starts:
                </Text>{' '}
                {challenge.startDate ? formatDate(challenge.startDate) : 'Not set'}
              </Text>
              <Text fontSize="sm" color="gray.700">
                <Text as="span" fontWeight="medium">
                  Ends:
                </Text>{' '}
                {formatDate(challenge.endDate)}
              </Text>
            </VStack>
          </VStack>
        </Grid>
      </VStack>
    </Card>
  );
};
