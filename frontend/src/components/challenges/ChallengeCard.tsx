import React from 'react';
import { Badge, Box, Heading, Progress, Text, VStack, HStack, Icon, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import type { Challenge } from '../../types';
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';

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

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSelect }) => (
  <Box
    as="div"
    onClick={() => onSelect(challenge.id)}
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
  >
    <VStack spacing={3} align="stretch" flex="1">
      {/* Header with badges */}
      <Wrap justify="space-between" align="center">
        <WrapItem>
          <Badge colorScheme={challenge.isPublic ? 'teal' : 'gray'}>
            {challenge.isPublic ? 'Public' : 'Private'}
          </Badge>
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
  </Box>
);
