import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Select,
  Spinner,
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Divider,
} from '@chakra-ui/react';
import { TeamService } from '../../graphql/services';
import { useUser } from '../../contexts/AuthContext';
import { useNotifications } from '../../utils/notifications';
import { useMultipleLoadingStates } from '../../hooks/useAsyncState';

interface TeamMemberManagementProps {
  teamId: string;
  isTeamCreator: boolean;
  isTeamAdmin: boolean;
  onMembershipChange?: () => void;
}

interface TeamMember {
  id: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
  joinedAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  } | null;
}

export const TeamMemberManagement: React.FC<TeamMemberManagementProps> = ({
  teamId,
  isTeamCreator,
  isTeamAdmin,
  onMembershipChange,
}) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const notifications = useNotifications();
  const { user: currentUser } = useUser();
  const { isLoading: actionLoading, executeWithKey } = useMultipleLoadingStates();

  // Fetch team members
  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TeamService.getAvailableAdmins(teamId);
      setMembers(data);
    } catch {
      notifications.error('Error', 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  }, [teamId]); // Remove notifications from dependencies to prevent infinite loop

  useEffect(() => {
    fetchMembers();
  }, [teamId, fetchMembers]);

  // Search for users to add
  const searchUsers = async (username: string) => {
    if (username.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const results = await TeamService.searchUsers(username, teamId);
      setSearchResults(results);
    } catch {
      notifications.error('Error', 'Failed to search users');
    } finally {
      setSearchLoading(false);
    }
  };

  // Update member role
  const handleRoleChange = async (
    memberId: string,
    userId: string,
    newRole: 'ADMIN' | 'MEMBER'
  ) => {
    if (!isTeamCreator && !isTeamAdmin) return;

    const result = await executeWithKey(`role-${memberId}`, async () => {
      await TeamService.updateMemberRole(teamId, userId, newRole);
      await fetchMembers();
      onMembershipChange?.();
      return true;
    });

    if (result) {
      notifications.success('Success', `Member role updated to ${newRole}`);
    }
  };

  // Add new member
  const handleAddMember = async (userId: string, role: 'ADMIN' | 'MEMBER' = 'MEMBER') => {
    const result = await executeWithKey(`add-${userId}`, async () => {
      await TeamService.addMemberToTeam(teamId, userId, role);
      await fetchMembers();
      onMembershipChange?.();

      // Clear search results and input
      setSearchResults([]);
      setSearchUsername('');
      return true;
    });

    if (result) {
      notifications.success('Success', 'Member added to team');
    }
  };

  // Remove member
  const handleRemoveMember = (member: TeamMember) => {
    setMemberToRemove(member);
    onOpen();
  };

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;

    const result = await executeWithKey(`remove-${memberToRemove.id}`, async () => {
      await TeamService.removeMemberFromTeam(teamId, memberToRemove.userId);
      await fetchMembers();
      onMembershipChange?.();
      return true;
    });

    if (result) {
      notifications.success('Success', 'Member removed from team');
      onClose();
      setMemberToRemove(null);
    }
  };

  const canManageRoles = isTeamCreator || isTeamAdmin;
  const canRemoveMembers = isTeamCreator || isTeamAdmin;

  if (loading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="orange.500" />
      </Center>
    );
  }

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="md">
          Team Members & Administrators
        </Heading>

        {/* Add Member Section - Only for creators/admins */}
        {canManageRoles && (
          <Box>
            <FormControl>
              <FormLabel>Add New Member</FormLabel>
              <HStack>
                <Input
                  placeholder="Search by username..."
                  value={searchUsername}
                  onChange={e => {
                    setSearchUsername(e.target.value);
                    searchUsers(e.target.value);
                  }}
                />
                <Button isLoading={searchLoading} isDisabled={searchUsername.trim().length < 2}>
                  Search
                </Button>
              </HStack>
            </FormControl>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <VStack spacing={2} align="stretch" mt={3} maxH="200px" overflowY="auto">
                <Text fontSize="sm" fontWeight="semibold">
                  Search Results
                </Text>
                {searchResults.map(user => (
                  <HStack
                    key={user.id}
                    spacing={3}
                    p={3}
                    borderWidth={1}
                    borderRadius="md"
                    justify="space-between"
                  >
                    <HStack spacing={3}>
                      <Avatar size="sm" src={user.avatarUrl} name={user.username} />
                      <Text>{user.username}</Text>
                    </HStack>{' '}
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => handleAddMember(user.id, 'MEMBER')}
                      isLoading={actionLoading(`add-${user.id}`)}
                    >
                      Add
                    </Button>
                  </HStack>
                ))}
              </VStack>
            )}

            {searchLoading && (
              <Center py={4}>
                <Spinner size="sm" />
              </Center>
            )}
          </Box>
        )}

        <Divider />

        {/* Current Members List */}
        <VStack spacing={4} align="stretch">
          <Text fontWeight="semibold">Current Members ({members.length})</Text>
          {members.map(member => (
            <HStack
              key={member.id}
              spacing={4}
              justify="space-between"
              p={4}
              borderWidth={1}
              borderRadius="md"
            >
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  src={member.user?.avatarUrl}
                  name={member.user?.username || 'Unknown User'}
                />
                <Box>
                  <Text fontWeight="semibold">{member.user?.username || 'Unknown User'}</Text>
                  <Text fontSize="xs" color="gray.500">
                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>

              <HStack spacing={3}>
                {/* Role Management */}
                {canManageRoles && member.userId !== currentUser?.id ? (
                  <Select
                    value={member.role}
                    onChange={e =>
                      handleRoleChange(
                        member.id,
                        member.userId,
                        e.target.value as 'ADMIN' | 'MEMBER'
                      )
                    }
                    size="sm"
                    width="120px"
                    isDisabled={actionLoading(`role-${member.id}`)}
                  >
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                  </Select>
                ) : (
                  <Badge colorScheme={member.role === 'ADMIN' ? 'purple' : 'gray'} size="sm">
                    {member.role}
                  </Badge>
                )}

                {/* Remove Member Button */}
                {canRemoveMembers && member.userId !== currentUser?.id && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleRemoveMember(member)}
                    isLoading={actionLoading(`remove-${member.id}`)}
                    isDisabled={!isTeamCreator && member.role === 'ADMIN'}
                  >
                    Remove
                  </Button>
                )}
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>

      {/* Remove Member Confirmation Dialog */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Team Member
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to remove <strong>{memberToRemove?.user?.username}</strong> from
              the team? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmRemoveMember}
                ml={3}
                isLoading={memberToRemove ? actionLoading(`remove-${memberToRemove.id}`) : false}
              >
                Remove Member
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
