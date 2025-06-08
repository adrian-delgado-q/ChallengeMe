import React from 'react';
import { Badge, Box, Heading, Progress, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { Challenge } from '../../types';
import { TrophyIcon, UserGroupIcon, CalendarIcon } from '../common/Icons';

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
          <Text fontSize="xs" fontWeight="semibold" color={challenge.isPublic ? 'gray.500' : 'orange.500'}>
            {challenge.isPublic ? 'Public' : 'Private'}
          </Text>
        </HStack>
        <Heading as="h3" size="sm">{challenge.title}</Heading>
        <VStack spacing={2} align="stretch" fontSize="sm" color="gray.600">
          <HStack><Icon as={TrophyIcon} w={5} h={5} color="orange.400" /> <Text>Goal: {challenge.goal}</Text></HStack>
          <HStack><Icon as={UserGroupIcon} w={5} h={5} color="blue.400" /> <Text>{challenge.participants} Participants</Text></HStack>
          <HStack><Icon as={CalendarIcon} w={5} h={5} color="red.400" /> <Text>Ends: {challenge.endDate}</Text></HStack>
        </VStack>
      </VStack>
      <Box mt={4}>
        <Progress value={challenge.progress} colorScheme="orange" size="sm" rounded="full" />
        <Text textAlign="right" fontSize="xs" color="gray.500" mt={1}>{challenge.progress}% complete</Text>
      </Box>
    </Box>
);
