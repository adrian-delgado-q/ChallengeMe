import React, { useState, useEffect } from 'react';
import {
  Badge,
  Box,
  Heading,
  Progress,
  Text,
  VStack,
  Icon,
  Button,
  useDisclosure,
  Image,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { Challenge, Team } from '../../types';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';
import { useActivityTypesByIdsQuery } from '../../hooks/useActivityTypesQuery';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AccessCodeModal } from './AccessCodeModal';
import { useChallengeActions } from '../../hooks/useData';
import { useTeams } from '../../hooks/useTeamsQuery';
import { useChallengeMutations, useChallengeActions as useChallengeActionsQuery } from '../../hooks/useChallengesQuery';
import { useUser } from '../../contexts/AuthContext';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';

// Activity type icon
const ActivityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);

interface ChallengeCardProps {
  challenge: Challenge;
  onSelect: (id: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSelect }) => {
  const { user } = useUser();
  const { joinChallenge } = useChallengeActions();
  const challengeActions = useChallengeActionsQuery();
  const { teams } = useTeams();
  const notifications = useNotifications();
  const navigate = useNavigate();

  // Team selection modal
  const {
    isOpen: isTeamModalOpen,
    onOpen: onTeamModalOpen,
    onClose: onTeamModalClose,
  } = useDisclosure();

  // Access code modal
  const {
    isOpen: isAccessCodeModalOpen,
    onOpen: onAccessCodeModalOpen,
    onClose: onAccessCodeModalClose,
  } = useDisclosure();

  const [isParticipating, setIsParticipating] = useState(false);
  const [participantTeam, setParticipantTeam] = useState<Team | null>(null);
  const [pendingTeamId, setPendingTeamId] = useState<string | null>(null); // For team challenges requiring access code

  // Load activity types using React Query
  const { data: activityTypeDetails = [], isLoading: isLoadingActivityTypes } =
    useActivityTypesByIdsQuery(challenge.activityTypes || []);

  const { isLoading: isJoining, execute: executeJoin } = useAsyncState({
    successMessage: 'Successfully joined challenge!',
  });

  const { isLoading: isLeaving, execute: executeLeave } = useAsyncState({
    successMessage: 'Successfully left challenge!',
  });

  // Check participation status using pre-fetched data
  useEffect(() => {
    if (!user || !challenge.participation) {
      setIsParticipating(false);
      setParticipantTeam(null);
      return;
    }

    setIsParticipating(challenge.participation.isParticipating);

    if (challenge.participation.team) {
      // Convert the team data to match our Team interface
      const teamData: Team = {
        id: challenge.participation.team.id,
        name: challenge.participation.team.name,
        avatarUrl: challenge.participation.team.avatarUrl,
        memberCount: 0, // We don't have this info from the participation details
        isPublic: true, // Default assumption
        creatorId: '', // We don't have this info
        description: '',
        maxMembers: undefined,
        sportsTypes: [],
        createdAt: '',
      };
      setParticipantTeam(teamData);
    } else {
      setParticipantTeam(null);
    }
  }, [user, challenge.participation]);

  const handleJoinChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    if (!user) {
      notifications.error('Authentication Required', 'Please log in to join challenges');
      return;
    }

    // Check if challenge is private and needs access code
    if (!challenge.isPublic) {
      if (challenge.challengeType === 'team') {
        // Show team selection modal first, then access code modal
        onTeamModalOpen();
      } else {
        // Show access code modal directly for individual challenges
        onAccessCodeModalOpen();
      }
      return;
    }

    // Public challenge - proceed normally
    if (challenge.challengeType === 'team') {
      // Show team selection modal for team challenges
      onTeamModalOpen();
    } else {
      // Join as individual directly
      await executeJoin(async () => {
        await joinChallenge(challenge.id);
        setIsParticipating(true);
      });
    }
  };

  const handleLeaveChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    await executeLeave(async () => {
      await challengeActions.leaveChallenge.mutateAsync({
        challengeId: challenge.id,
        teamId: challenge.challengeType === 'team' && participantTeam ? participantTeam.id : undefined
      });
      setIsParticipating(false);
      setParticipantTeam(null);
    });
  };

  const handleTeamSelection = async (teamId: string) => {
    // Check if this is a private challenge that needs access code
    if (!challenge.isPublic) {
      // Store the selected team and show access code modal
      setPendingTeamId(teamId);
      onTeamModalClose();
      onAccessCodeModalOpen();
      return;
    }

    // Public challenge - join directly
    await executeJoin(async () => {
      await joinChallenge(challenge.id, teamId);
      setIsParticipating(true);
      // Find and set the selected team
      const selectedTeam = teams?.find(t => t.id === teamId);
      if (selectedTeam) {
        setParticipantTeam(selectedTeam);
      }
    });
    onTeamModalClose();
  };

  const handleAccessCodeSubmit = async (accessCode: string) => {
    await executeJoin(async () => {
      if (pendingTeamId) {
        // Join with team using access code
        await joinChallenge(challenge.id, pendingTeamId, accessCode);
        setIsParticipating(true);
        // Find and set the selected team
        const selectedTeam = teams?.find(t => t.id === pendingTeamId);
        if (selectedTeam) {
          setParticipantTeam(selectedTeam);
        }
        setPendingTeamId(null);
      } else {
        // Join as individual using access code
        await joinChallenge(challenge.id, undefined, accessCode);
        setIsParticipating(true);
      }
    });
    onAccessCodeModalClose();
  };

  const handleCardClick = () => {
    onSelect(challenge.id);
  };

  const isCurrentUserCreator = user?.id === challenge.creatorId;

  return (
    <Box
      cursor="pointer"
      bg="white"
      rounded="2xl"
      shadow="lg"
      overflow="hidden"
      border="1px"
      borderColor="gray.200"
      maxW="md"
      mx="auto"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
      onClick={handleCardClick}
    >
      {/* Banner with image */}
      <Box position="relative">
        <Image
          src={
            challenge.imageUrl ||
            'https://images.unsplash.com/photo-1606788075761-5a81c9db1e36?q=80&w=1200'
          }
          alt="Challenge Banner"
          w="full"
          h="160px"
          objectFit="cover"
          fallback={
            <Box
              w="full"
              h="160px"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.400"
            >
              <Text>Challenge Image</Text>
            </Box>
          }
        />
        <Box position="absolute" top={2} left={2}>
          <Flex gap={2}>
            <Badge
              px={2}
              py={1}
              fontSize="xs"
              rounded="md"
              bg="gray.100"
              color="gray.800"
              fontWeight="medium"
            >
              {challenge.isPublic ? 'PUBLIC' : 'PRIVATE'}
            </Badge>
            {(() => {
              const now = new Date();
              const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
              const hasStarted = !startDate || startDate <= now;

              if (startDate && !hasStarted) {
                return (
                  <Badge
                    px={2}
                    py={1}
                    fontSize="xs"
                    rounded="md"
                    bg="yellow.200"
                    color="yellow.800"
                    fontWeight="medium"
                  >
                    STARTING SOON
                  </Badge>
                );
              }
              if (challenge.status === 'CLOSED') {
                return (
                  <Badge
                    px={2}
                    py={1}
                    fontSize="xs"
                    rounded="md"
                    bg="orange.200"
                    color="orange.800"
                    fontWeight="medium"
                  >
                    CLOSED
                  </Badge>
                );
              }
              if (challenge.status === 'CANCELLED') {
                return (
                  <Badge
                    px={2}
                    py={1}
                    fontSize="xs"
                    rounded="md"
                    bg="red.200"
                    color="red.800"
                    fontWeight="medium"
                  >
                    CANCELLED
                  </Badge>
                );
              }
              return null;
            })()}
          </Flex>
        </Box>
      </Box>

      {/* Content */}
      <Box p={5}>
        {/* Title & Description */}
        <Heading as="h2" size="lg" fontWeight="bold" color="gray.900" noOfLines={2}>
          {challenge.title}
        </Heading>
        {challenge.description && (
          <Text color="gray.600" fontSize="sm" mt={1} noOfLines={2}>
            {challenge.description}
          </Text>
        )}

        {/* Grid Info */}
        <SimpleGrid columns={2} spacing={4} mt={4} fontSize="sm">
          <Flex align="center" gap={2}>
            <Icon as={TrophyIcon} w={5} h={5} color="green.500" />
            <Box>
              <Text fontWeight="bold">{challenge.milestones?.length || 0} Milestones</Text>
              <Text fontSize="xs" color="gray.500">
                ({challenge.milestones?.length ? Math.max(...challenge.milestones.map(m => m.value)) : 0}{' '}
                pts)
              </Text>
            </Box>
          </Flex>
          <Flex align="center" gap={2}>
            <Icon as={UserTeamIcon} w={5} h={5} color="blue.500" />
            <Box>
              <Text fontWeight="bold">
                {challenge.participants || 0}{' '}
                {challenge.challengeType === 'team' ? 'Teams' : 'Participants'}
              </Text>
            </Box>
          </Flex>
          {(() => {
            const startDate = challenge.startDate ? new Date(challenge.startDate + 'T00:00:00') : null;
            const endDate = new Date(challenge.endDate + 'T00:00:00');

            return (
              <>
                {startDate && (
                  <Flex align="center" gap={2}>
                    <Icon as={CalendarIcon} w={5} h={5} color="gray.500" />
                    <Box>
                      <Text fontWeight="bold">Starts:</Text>
                      <Text fontSize="xs" color="gray.500">
                        {startDate.toLocaleDateString()}
                      </Text>
                    </Box>
                  </Flex>
                )}
                <Flex align="center" gap={2}>
                  <Icon as={CalendarIcon} w={5} h={5} color="gray.500" />
                  <Box>
                    <Text fontWeight="bold">Ends:</Text>
                    <Text fontSize="xs" color="gray.500">
                      {endDate.toLocaleDateString()}
                    </Text>
                  </Box>
                </Flex>
              </>
            );
          })()}
        </SimpleGrid>

        {/* Activities */}
        {challenge.activityTypes && challenge.activityTypes.length > 0 && (
          <Box mt={5}>
            <Heading as="h3" size="sm" fontWeight="semibold" color="gray.800">
              Activities
            </Heading>
            <VStack mt={2} spacing={2} align="start" fontSize="sm">
              {isLoadingActivityTypes ? (
                <Text fontSize="xs" color="gray.500">
                  Loading activities...
                </Text>
              ) : activityTypeDetails.length > 0 ? (
                <>
                  {activityTypeDetails.slice(0, 3).map(activityType => (
                    <Flex key={activityType.id} align="center" gap={2}>
                      <Icon as={ActivityIcon} w={5} h={5} color="gray.600" />
                      <Box>
                        <Text fontWeight="medium">{activityType.name}</Text>
                        <Text color="gray.500" fontSize="xs">
                          {activityType.category}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                  {activityTypeDetails.length > 3 && (
                    <Text
                      color="blue.600"
                      fontSize="sm"
                      cursor="pointer"
                      _hover={{ textDecoration: 'underline' }}
                      onClick={e => e.stopPropagation()}
                    >
                      + View {activityTypeDetails.length - 3} More
                    </Text>
                  )}
                </>
              ) : (
                challenge.activityTypes.slice(0, 3).map((activityTypeId, index) => (
                  <Flex key={index} align="center" gap={2}>
                    <Icon as={ActivityIcon} w={5} h={5} color="gray.600" />
                    <Box>
                      <Text fontWeight="medium">{activityTypeId}</Text>
                      <Text color="gray.500" fontSize="xs">
                        Activity
                      </Text>
                    </Box>
                  </Flex>
                ))
              )}
            </VStack>
          </Box>
        )}

        {/* Progress */}
        <Box mt={5}>
          <Progress
            value={challenge.progress || 0}
            colorScheme="blue"
            size="sm"
            rounded="full"
            bg="gray.200"
          />
          <Text fontSize="xs" color="gray.600" mt={1}>
            {challenge.progress || 0}% Complete
          </Text>
        </Box>

        {/* Button */}
        <Box mt={5}>
          {isCurrentUserCreator ? (
            <Button
              w="full"
              colorScheme="blue"
              fontWeight="medium"
              py={2}
              px={4}
              rounded="xl"
              onClick={e => {
                e.stopPropagation();
                navigate(`/challenges/${challenge.id}/manage`);
              }}
            >
              Manage
            </Button>
          ) : (
            <>
              {isParticipating ? (
                <Button
                  w="full"
                  variant="outline"
                  colorScheme="red"
                  fontWeight="medium"
                  py={2}
                  px={4}
                  rounded="xl"
                  onClick={handleLeaveChallenge}
                  isLoading={isLeaving}
                  loadingText="Leaving..."
                  isDisabled={challenge.status === 'CLOSED' || challenge.status === 'CANCELLED'}
                >
                  Leave Challenge
                  {participantTeam && ` (${participantTeam.name})`}
                </Button>
              ) : (
                (() => {
                  const now = new Date();
                  const startDate = challenge.startDate ? new Date(challenge.startDate + 'T00:00:00') : null;
                  const hasStarted = !startDate || startDate <= now;
                  const isDisabled =
                    challenge.status === 'CLOSED' || challenge.status === 'CANCELLED' || !hasStarted;

                  let buttonText = 'Join Challenge';
                  if (challenge.status === 'CLOSED') buttonText = 'Challenge Closed';
                  else if (challenge.status === 'CANCELLED') buttonText = 'Challenge Cancelled';
                  else if (!hasStarted) buttonText = `Starts ${startDate?.toLocaleDateString()}`;

                  return (
                    <Button
                      w="full"
                      colorScheme={!hasStarted ? 'gray' : 'blue'}
                      fontWeight="medium"
                      py={2}
                      px={4}
                      rounded="xl"
                      onClick={handleJoinChallenge}
                      isLoading={isJoining}
                      loadingText="Joining..."
                      isDisabled={isDisabled}
                      _hover={!isDisabled ? { bg: 'blue.700' } : {}}
                    >
                      {buttonText}
                    </Button>
                  );
                })()
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Team Selection Modal */}
      {challenge.challengeType === 'team' && (
        <TeamSelectionModal
          isOpen={isTeamModalOpen}
          onClose={onTeamModalClose}
          onSelectTeam={handleTeamSelection}
          teams={teams || []}
          challengeTitle={challenge.title}
          maxTeamSize={challenge.maxTeamSize}
          isLoading={isJoining}
        />
      )}

      {/* Access Code Modal */}
      <AccessCodeModal
        isOpen={isAccessCodeModalOpen}
        onClose={onAccessCodeModalClose}
        onSubmit={handleAccessCodeSubmit}
        challengeTitle={challenge.title}
        isLoading={isJoining}
      />
    </Box>
  );
};
