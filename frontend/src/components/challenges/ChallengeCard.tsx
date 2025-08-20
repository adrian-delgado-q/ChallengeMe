import React, { useState, useEffect } from 'react';
import { Badge, Box, Heading, Progress, Text, VStack, HStack, Icon, Tag, Wrap, WrapItem, Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { Challenge, Team } from '../../types';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';
import { TeamSelectionModal } from './TeamSelectionModal';
import { useChallenges, useTeams } from '../../hooks/useData';
import { useUser } from '../../contexts/AuthContext';
import { useNotifications } from '../../utils/notifications';
import { useAsyncState } from '../../hooks/useAsyncState';
import { ChallengeService } from '../../graphql/services';

// A new icon for the Individual type
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// Activity type icon
const ActivityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);


interface ChallengeCardProps {
  challenge: Challenge;
  onSelect: (id: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSelect }) => {
  const { user } = useUser();
  const { joinChallenge } = useChallenges();
  const { teams } = useTeams();
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isParticipating, setIsParticipating] = useState(false);
  const [participantTeam, setParticipantTeam] = useState<Team | null>(null);

  const { isLoading: isJoining, execute: executeJoin } = useAsyncState({
    successMessage: 'Successfully joined challenge!'
  });

  const { isLoading: isLeaving, execute: executeLeave } = useAsyncState({
    successMessage: 'Successfully left challenge!'
  });

  // Check participation status
  useEffect(() => {
    const checkParticipation = async () => {
      if (!user || !challenge.id) return;

      try {
        const participationDetails = await ChallengeService.getMyParticipationDetails(challenge.id);
        setIsParticipating(participationDetails.isParticipating);

        if (participationDetails.team) {
          // Convert the team data to match our Team interface
          const teamData: Team = {
            id: participationDetails.team.id,
            name: participationDetails.team.name,
            avatarUrl: participationDetails.team.avatarUrl,
            memberCount: 0, // We don't have this info from the participation details
            isPublic: true, // Default assumption
            creatorId: '', // We don't have this info
            description: '',
            maxMembers: undefined,
            sportsTypes: [],
            createdAt: ''
          };
          setParticipantTeam(teamData);
        }
      } catch (error) {
        console.error('Error checking participation:', error);
      }
    };

    checkParticipation();
  }, [user, challenge.id, challenge.challengeType]);

  const handleJoinChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    if (!user) {
      notifications.error('Authentication Required', 'Please log in to join challenges');
      return;
    }

    if (challenge.challengeType === 'team') {
      // Show team selection modal for team challenges
      onOpen();
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
    await executeJoin(async () => {
      await joinChallenge(challenge.id, teamId);
      setIsParticipating(true);
      // Find and set the selected team
      const selectedTeam = teams?.find(t => t.id === teamId);
      if (selectedTeam) {
        setParticipantTeam(selectedTeam);
      }
    });
    onClose();
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
      p={6}
      h="full"
      display="flex"
      flexDirection="column"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      onClick={handleCardClick}
    >
      <VStack spacing={3} align="stretch" flex="1">
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
            </HStack>
          </WrapItem>
          <WrapItem>
            <Tag size="sm" variant="subtle" colorScheme={challenge.challengeType === 'team' ? 'purple' : 'blue'}>
              <HStack spacing={1}>
                <Icon
                  as={challenge.challengeType === 'team' ? UserTeamIcon : UserIcon}
                  w={3} h={3}
                />
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
              <Text fontSize="xs">{challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}</Text>
            </HStack>
          </Tag>
        )}

        <Heading as="h3" size="sm">{challenge.title}</Heading>

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
                  {challenge.milestones.length} milestone{challenge.milestones.length > 1 ? 's' : ''}
                  {' '}(up to {Math.max(...challenge.milestones.map(m => m.value))} pts)
                </>
              ) : (
                'No milestones set'
              )}
            </Text>
          </HStack>

          <HStack>
            <Icon as={UserTeamIcon} w={4} h={4} color="blue.400" />
            <Text fontSize="xs">{challenge.participants || 0} {challenge.challengeType === 'team' ? 'Teams' : 'Participants'}</Text>
          </HStack>

          {/* Team size info for team challenges */}
          {challenge.challengeType === 'team' && challenge.maxTeamSize && (
            <HStack>
              <Icon as={UserIcon} w={4} h={4} color="purple.400" />
              <Text fontSize="xs">Max {challenge.maxTeamSize} members per team</Text>
            </HStack>
          )}

          <HStack>
            <Icon as={CalendarIcon} w={4} h={4} color="red.400" />
            <Text fontSize="xs">Ends: {new Date(challenge.endDate).toLocaleDateString()}</Text>
          </HStack>
        </VStack>
      </VStack>

      <Box mt={4}>
        <Progress value={challenge.progress || 0} colorScheme="orange" size="sm" rounded="full" />
        <Text textAlign="right" fontSize="xs" color="gray.500" mt={1}>{challenge.progress || 0}% complete</Text>
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/challenges/${challenge.id}/manage`);
            }}
          >
            Manage Challenge
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
              <Button
                size="sm"
                colorScheme="orange"
                width="full"
                onClick={handleJoinChallenge}
                isLoading={isJoining}
                loadingText="Joining..."
                isDisabled={challenge.status === 'CLOSED' || challenge.status === 'CANCELLED'}
              >
                {challenge.status === 'CLOSED' ? 'Challenge Closed' :
                  challenge.status === 'CANCELLED' ? 'Challenge Cancelled' :
                    'Join Challenge'}
              </Button>
            )}
          </>
        )}
      </Box>

      {/* Team Selection Modal */}
      {challenge.challengeType === 'team' && (
        <TeamSelectionModal
          isOpen={isOpen}
          onClose={onClose}
          onSelectTeam={handleTeamSelection}
          teams={teams || []}
          challengeTitle={challenge.title}
          maxTeamSize={challenge.maxTeamSize}
          isLoading={isJoining}
        />
      )}
    </Box>
  );
};
