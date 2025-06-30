import React from 'react';
import { Badge, Box, Heading, Progress, Text, VStack, HStack, Icon, Tag } from '@chakra-ui/react';
import type { Challenge, ChallengeType } from '../../types'; 
import { TrophyIcon, UserTeamIcon, CalendarIcon } from '../common/Icons';

// A new icon for the Individual type
const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


interface ChallengeCardProps {
    challenge: Challenge;
    onSelect: (id: number) => void;
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
        <HStack justify="space-between">
          <Badge colorScheme={challenge.isPublic ? 'teal' : 'gray'}>{challenge.type}</Badge>
          
          {/* New Tag for Challenge Type */}
          <Tag size="sm" variant="subtle" colorScheme={challenge.challengeType === 'team' ? 'purple' : 'blue'}>
             <HStack spacing={1}>
                <Icon 
                    as={challenge.challengeType === 'team' ? UserTeamIcon : UserIcon} 
                    w={4} h={4}
                />
                <Text>{challenge.challengeType === 'team' ? 'Team' : 'Individual'}</Text>
             </HStack>
          </Tag>
        </HStack>
        <Heading as="h3" size="sm">{challenge.title}</Heading>
        <VStack spacing={2} align="stretch" fontSize="sm" color="gray.600">
          <HStack>
            <Icon as={TrophyIcon} w={5} h={5} color="orange.400" /> 
            {/* Logic would need to find the final milestone goal */}
            <Text>Final Goal: {challenge.milestones[challenge.milestones.length - 1]?.value} points</Text>
          </HStack>
          <HStack>
            <Icon as={UserTeamIcon} w={5} h={5} color="blue.400" /> 
            <Text>{challenge.participants} {challenge.challengeType === 'team' ? 'Teams' : 'Participants'}</Text>
          </HStack>
          <HStack>
            <Icon as={CalendarIcon} w={5} h={5} color="red.400" /> 
            <Text>Ends: {challenge.endDate}</Text>
          </HStack>
        </VStack>
      </VStack>
      <Box mt={4}>
        <Progress value={challenge.progress} colorScheme="orange" size="sm" rounded="full" />
        <Text textAlign="right" fontSize="xs" color="gray.500" mt={1}>{challenge.progress}% complete</Text>
      </Box>
    </Box>
);
