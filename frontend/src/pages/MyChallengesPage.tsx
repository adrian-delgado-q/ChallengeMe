import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  Badge,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Spinner,
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Progress,
  Flex,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon, SettingsIcon, ViewIcon, EditIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChallengeService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';
import { useNotifications } from '../utils/notifications';

interface ManagedChallenge {
  id: string;
  creatorId?: string;
  title: string;
  description?: string;
  type?: string;
  challengeType: 'individual' | 'team';
  status?: 'ACTIVE' | 'CLOSED' | 'CANCELLED';
  participants?: number;
  maxParticipants?: number;
  maxTeamSize?: number;
  startDate?: string;
  endDate: string;
  progress?: number;
  isPublic: boolean;
  milestones?: Array<{ name: string; value: number }>;
  createdAt?: string;
  creator?: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  participantCount: number;
  recentActivitiesCount: number;
  participantList: Array<{
    id: string;
    user?: { username: string; avatarUrl?: string };
    team?: { name: string; avatarUrl?: string };
  }>;
}

const MyChallengesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const notifications = useNotifications();

  const [challenges, setChallenges] = useState<ManagedChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Fetch user's created challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await ChallengeService.getMyCreatedChallenges();
        setChallenges(data || []);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        notifications.error('Error', 'Failed to load your challenges');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChallenges();
    }
  }, [user]); // Remove notifications from dependency array

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'CLOSED':
        return 'orange';
      case 'CANCELLED':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Active';
      case 'CLOSED':
        return 'Closed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const calculateProgress = (challenge: ManagedChallenge) => {
    const now = new Date().getTime();
    const start = new Date(challenge.startDate || '').getTime();
    const end = new Date(challenge.endDate).getTime();
    return Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
  };

  const getDaysRemaining = (endDate: string) => {
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, days);
  };

  if (loading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="orange.500" />
          <Text>Loading your challenges...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      {/* Header */}
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <VStack align="start" spacing={2}>
          <Heading as="h1" size="xl">
            My Challenges
          </Heading>
          <Text color="gray.600">Manage and monitor your created challenges</Text>
        </VStack>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="orange"
          onClick={() => navigate('/challenges/create')}
        >
          Create New Challenge
        </Button>
      </Flex>

      {/* Summary Stats */}
      {challenges.length > 0 && (
        <Card p={6} bg={cardBg} borderColor={borderColor}>
          <Heading size="md" mb={4}>
            Overview
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            <Stat>
              <StatLabel>Total Challenges</StatLabel>
              <StatNumber>{challenges.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Active Challenges</StatLabel>
              <StatNumber>
                {challenges.filter(c => c.status === 'ACTIVE' || !c.status).length}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Participants</StatLabel>
              <StatNumber>{challenges.reduce((sum, c) => sum + c.participantCount, 0)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Recent Activities</StatLabel>
              <StatNumber>
                {challenges.reduce((sum, c) => sum + c.recentActivitiesCount, 0)}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </Card>
      )}

      {/* Challenges Grid */}
      {challenges.length === 0 ? (
        <Card p={12} textAlign="center" bg={cardBg} borderColor={borderColor}>
          <VStack spacing={6}>
            <Heading size="lg" color="gray.500">
              No Challenges Yet
            </Heading>
            <Text color="gray.600" maxW="md">
              You haven't created any challenges yet. Create your first challenge to start building
              a community around your fitness goals.
            </Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="orange"
              size="lg"
              onClick={() => navigate('/challenges/create')}
            >
              Create Your First Challenge
            </Button>
          </VStack>
        </Card>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {challenges.map(challenge => (
            <Card
              key={challenge.id}
              p={6}
              bg={cardBg}
              borderColor={borderColor}
              transition="all 0.2s"
              _hover={{ shadow: 'lg' }}
            >
              <VStack spacing={4} align="stretch">
                {/* Header */}
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={1} flex="1">
                    <Heading size="md" noOfLines={2}>
                      {challenge.title}
                    </Heading>
                    <HStack spacing={2}>
                      <Badge colorScheme={getStatusColor(challenge.status || 'ACTIVE')}>
                        {getStatusText(challenge.status || 'ACTIVE')}
                      </Badge>
                      <Badge variant="outline" colorScheme="blue">
                        {challenge.challengeType === 'team' ? 'Team' : 'Individual'}
                      </Badge>
                    </HStack>
                  </VStack>

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<ChevronDownIcon />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<SettingsIcon />}
                        onClick={() => navigate(`/challenges/${challenge.id}/manage`)}
                      >
                        Manage
                      </MenuItem>
                      <MenuItem
                        icon={<EditIcon />}
                        onClick={() => navigate(`/challenges/${challenge.id}/edit`)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<ViewIcon />}
                        onClick={() => navigate(`/challenges/${challenge.id}`)}
                      >
                        View Public Page
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>

                {/* Description */}
                {challenge.description && (
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {challenge.description}
                  </Text>
                )}

                {/* Stats */}
                <SimpleGrid columns={2} spacing={4}>
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                      {challenge.participantCount}
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      {challenge.challengeType === 'team' ? 'Teams' : 'Participants'}
                    </Text>
                  </VStack>
                  <VStack spacing={1}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                      {challenge.recentActivitiesCount}
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      Recent Activities
                    </Text>
                  </VStack>
                </SimpleGrid>

                {/* Progress */}
                <VStack spacing={2}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" fontWeight="medium">
                      Progress
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {Math.round(calculateProgress(challenge))}%
                    </Text>
                  </HStack>
                  <Progress
                    value={calculateProgress(challenge)}
                    colorScheme="orange"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                  <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
                    <Text>Started {new Date(challenge.startDate || '').toLocaleDateString()}</Text>
                    <Text>{getDaysRemaining(challenge.endDate)} days left</Text>
                  </HStack>
                </VStack>

                {/* Participants Preview */}
                {challenge.participantList.length > 0 && (
                  <VStack spacing={2} align="stretch">
                    <Text fontSize="sm" fontWeight="medium">
                      Recent Participants
                    </Text>
                    <Wrap spacing={1}>
                      {challenge.participantList.slice(0, 8).map(participant => (
                        <WrapItem key={participant.id}>
                          <Box
                            w="8px"
                            h="8px"
                            rounded="full"
                            bg={participant.team ? 'purple.400' : 'blue.400'}
                            title={participant.user?.username || participant.team?.name}
                          />
                        </WrapItem>
                      ))}
                      {challenge.participantList.length > 8 && (
                        <Text fontSize="xs" color="gray.500" ml={2}>
                          +{challenge.participantList.length - 8} more
                        </Text>
                      )}
                    </Wrap>
                  </VStack>
                )}

                {/* Actions */}
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => navigate(`/challenges/${challenge.id}/manage`)}
                >
                  Manage
                </Button>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default MyChallengesPage;
