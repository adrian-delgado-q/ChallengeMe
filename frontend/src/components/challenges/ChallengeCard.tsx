import React, { useState, useEffect } from 'react';
import {
  Badge,
  Box,
  Heading,
  Progress,
  Text,
  VStack,
  HStack,
  Icon,
  Tag,
  Wrap,
  WrapItem,
  Button,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { Challenge, Team } from '../../types';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AccessCodeModal } from './AccessCodeModal';
import { useChallengeActions } from '../../hooks/useData';
import { useTeams } from '../../hooks/useTeamsQuery';
import { useUser } from '../../contexts/AuthContext';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ChallengeService } from '../../graphql/services';

// A new icon for the Individual type
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

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
      if (challenge.challengeType === 'team' && participantTeam) {
        await ChallengeService.leaveChallenge(challenge.id, participantTeam.id);
      } else {
        await ChallengeService.leaveChallenge(challenge.id);
      }
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
      rounded="xl"
      shadow="sm"
      p={{ base: 4, md: 6 }}
      h="full"
      display="flex"
      flexDirection="column"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      onClick={handleCardClick}
      minW="320px"
      maxW="400px" // Constrain maximum width to prevent excessive stretching
    >
      <HStack spacing={4} align="flex-start" flex="1">
        {/* Main content */}
        <VStack spacing={3} align="stretch" flex="1" minW="0">
          {/* Header with badges */}
          <Wrap justify="space-between" align="center">
            <WrapItem>
              <HStack spacing={2}>
                <Badge colorScheme={challenge.isPublic ? 'teal' : 'gray'}>
                  {challenge.isPublic ? 'Public' : 'Private'}
                </Badge>
                {/* Challenge Status Badge */}
                {challenge.status && challenge.status !== 'ACTIVE' && (
                  <Badge colorScheme={challenge.status === 'CLOSED' ? 'orange' : 'red'}>
                    {challenge.status === 'CLOSED' ? 'Closed' : 'Cancelled'}
                  </Badge>
                )}
                {/* Start Date Status Badge */}
                {(() => {
                  const now = new Date();
                  const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
                  const hasStarted = !startDate || startDate <= now;

                  if (startDate && !hasStarted) {
                    return <Badge colorScheme="yellow">Starting Soon</Badge>;
                  }
                  return null;
                })()}
              </HStack>
            </WrapItem>
            <WrapItem>
              <Tag
                size="sm"
                variant="subtle"
                colorScheme={challenge.challengeType === 'team' ? 'purple' : 'blue'}
              >
                <HStack spacing={1}>
                  <Icon as={challenge.challengeType === 'team' ? UserTeamIcon : UserIcon} w={3} h={3} />
                  <Text fontSize="xs">{challenge.challengeType === 'team' ? 'Team' : 'Individual'}</Text>
                </HStack>
              </Tag>
            </WrapItem>
          </Wrap>

          {/* Activity type tag */}
          {challenge.type && (
            <Tag size="sm" variant="solid" colorScheme="green" alignSelf="flex-start">
              <HStack spacing={1}>
                <Icon as={ActivityIcon} w={3} h={3} />
                <Text fontSize="xs">
                  {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                </Text>
              </HStack>
            </Tag>
          )}

          <Heading as="h3" size="sm" noOfLines={2} lineHeight="1.3">
            {challenge.title}
          </Heading>

          {/* Description if available */}
          {challenge.description && (
            <Text fontSize="xs" color="gray.500" noOfLines={2}>
              {challenge.description}
            </Text>
          )}

          <VStack spacing={2} align="stretch" fontSize="sm" color="gray.600">
            {/* Milestones summary */}
            <HStack>
              <Icon as={TrophyIcon} w={4} h={4} color="orange.400" />
              <Text fontSize="xs">
                {challenge.milestones && challenge.milestones.length > 0 ? (
                  <>
                    {challenge.milestones.length} milestone
                    {challenge.milestones.length > 1 ? 's' : ''} (up to{' '}
                    {Math.max(...challenge.milestones.map(m => m.value))} pts)
                  </>
                ) : (
                  'No milestones set'
                )}
              </Text>
            </HStack>

            <HStack>
              <Icon as={UserTeamIcon} w={4} h={4} color="blue.400" />
              <Text fontSize="xs">
                {challenge.participants || 0}{' '}
                {challenge.challengeType === 'team' ? 'Teams' : 'Participants'}
              </Text>
            </HStack>

            {/* Team size info for team challenges */}
            {challenge.challengeType === 'team' && challenge.maxTeamSize && (
              <HStack>
                <Icon as={UserIcon} w={4} h={4} color="purple.400" />
                <Text fontSize="xs">Max {challenge.maxTeamSize} members per team</Text>
              </HStack>
            )}

            {/* Date information */}
            {(() => {
              const now = new Date();
              const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
              const endDate = new Date(challenge.endDate);
              const hasStarted = !startDate || startDate <= now;
              const hasEnded = endDate < now;

              return (
                <VStack spacing={1} align="start">
                  {/* Always show start date if available */}
                  {startDate && (
                    <HStack>
                      <Icon as={CalendarIcon} w={4} h={4} color={!hasStarted ? 'green.400' : 'blue.400'} />
                      <Text fontSize="xs" fontWeight="medium" color={!hasStarted ? 'green.600' : 'blue.600'}>
                        {!hasStarted ? 'Starts' : 'Started'}: {startDate.toLocaleDateString()}
                      </Text>
                    </HStack>
                  )}
                  {/* Always show end date */}
                  <HStack>
                    <Icon as={CalendarIcon} w={4} h={4} color={hasEnded ? 'red.400' : 'orange.400'} />
                    <Text fontSize="xs" color={hasEnded ? 'red.600' : 'gray.600'}>
                      {hasEnded ? 'Ended' : 'Ends'}: {endDate.toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              );
            })()}
          </VStack>
        </VStack>

        {/* Challenge Image */}
        {challenge.imageUrl && (
          <Box flexShrink={0} w="80px" h="80px">
            <Image
              src={challenge.imageUrl}
              alt={challenge.title}
              w="80px"
              h="80px"
              objectFit="cover"
              borderRadius="md"
              fallback={
                <Box
                  w="80px"
                  h="80px"
                  bg="gray.100"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.400"
                  fontSize="xs"
                >
                  No Image
                </Box>
              }
            />
          </Box>
        )}
      </HStack>

      <Box mt={4}>
        <Progress value={challenge.progress || 0} colorScheme="orange" size="sm" rounded="full" />
        <Text textAlign="right" fontSize="xs" color="gray.500" mt={1}>
          {challenge.progress || 0}% complete
        </Text>
      </Box>

      {/* Action Buttons */}
      <Box mt={4}>
        {isCurrentUserCreator ? (
          // Show manage button for challenge creators
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            width="full"
            onClick={e => {
              e.stopPropagation();
              navigate(`/challenges/${challenge.id}/manage`);
            }}
          >
            Manage
          </Button>
        ) : (
          // Show join/leave buttons for other users
          <>
            {isParticipating ? (
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                width="full"
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
                const startDate = challenge.startDate ? new Date(challenge.startDate) : null;
                const hasStarted = !startDate || startDate <= now;
                const isDisabled =
                  challenge.status === 'CLOSED' || challenge.status === 'CANCELLED' || !hasStarted;

                let buttonText = 'Join Challenge';
                if (challenge.status === 'CLOSED') buttonText = 'Challenge Closed';
                else if (challenge.status === 'CANCELLED') buttonText = 'Challenge Cancelled';
                else if (!hasStarted) buttonText = `Starts ${startDate?.toLocaleDateString()}`;

                return (
                  <Button
                    size="sm"
                    colorScheme={!hasStarted ? 'gray' : 'orange'}
                    width="full"
                    onClick={handleJoinChallenge}
                    isLoading={isJoining}
                    loadingText="Joining..."
                    isDisabled={isDisabled}
                  >
                    {buttonText}
                  </Button>
                );
              })()
            )}
          </>
        )}
      </Box>

      {/* Team Selection Modal */}
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
