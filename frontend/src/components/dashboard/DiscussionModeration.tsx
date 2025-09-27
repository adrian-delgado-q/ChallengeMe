import React, { useState, useEffect } from 'react';
import {
    Button,
    VStack,
    HStack,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
    FormControl,
    FormLabel,
    Input,
    Avatar,
    Badge,
    IconButton,
    Spinner,
    Box,
    useColorModeValue
} from '@chakra-ui/react';
import { BsShield, BsPersonX, BsPersonCheck } from 'react-icons/bs';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { DiscussionService } from '../../graphql/services/discussionService';
import { useUser } from '../../contexts/AuthContext';
import type { DiscussionPermissions } from '../../types';
import { supabase } from '../../supabase/client';

interface DiscussionModerationProps {
    challengeId: string;
}

export const DiscussionModeration: React.FC<DiscussionModerationProps> = ({ challengeId }) => {
    const { user } = useUser();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [permissions, setPermissions] = useState<DiscussionPermissions | null>(null);
    const [bannedUsers, setBannedUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [challengeId, user]);

    const loadData = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const [userPermissions, bans] = await Promise.all([
                DiscussionService.getUserPermissions(challengeId, user.id),
                loadBannedUsers()
            ]);

            setPermissions(userPermissions);
            setBannedUsers(bans);
        } catch (error) {
            console.error('Error loading moderation data:', error);
            toast({
                title: 'Error loading moderation data',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const loadBannedUsers = async (): Promise<any[]> => {
        const { data: bans } = await supabase
            .from('discussion_bans')
            .select(`
                *,
                user:profiles(id, username, avatar_url),
                bannedBy:profiles!discussion_bans_bannedById_fkey(username)
            `)
            .eq('challengeId', challengeId)
            .eq('isActive', true);

        return bans || [];
    };

    const handleUnbanUser = async (_banId: string, userId: string) => {
        try {
            await DiscussionService.unbanUser(challengeId, userId);
            await loadData(); // Refresh the data

            toast({
                title: 'User unbanned successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error unbanning user',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Box bg="orange.50" borderColor="orange.200" borderWidth="1px" borderRadius="md" p={2}>
                <HStack justify="center">
                    <Spinner size="sm" color="orange.500" />
                    <Text fontSize="sm">Loading moderation...</Text>
                </HStack>
            </Box>
        );
    }

    if (!permissions?.canModerate) {
        return null; // Don't show moderation tools to non-moderators
    }

    return (
        <>
            <Box
                bg={useColorModeValue('orange.50', 'orange.900')}
                borderColor={useColorModeValue('orange.200', 'orange.700')}
                borderWidth="1px"
                borderRadius="md"
                p={2}
            >
                <HStack justify="space-between" align="center">
                    <HStack spacing={2} fontSize="sm">
                        <BsShield size="14px" />
                        <Text fontWeight="semibold" color={useColorModeValue('orange.600', 'orange.300')}>Moderator</Text>
                        <Badge size="sm" colorScheme="gray" variant="subtle">
                            {bannedUsers.length} banned
                        </Badge>
                    </HStack>
                    <Button
                        size="xs"
                        colorScheme="orange"
                        variant="outline"
                        onClick={onOpen}
                    >
                        Manage
                    </Button>
                </HStack>
            </Box>

            {/* Ban Management Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Banned Users</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            {bannedUsers.length === 0 ? (
                                <Text color="gray.500" textAlign="center" py={4}>
                                    No banned users in this discussion.
                                </Text>
                            ) : (
                                bannedUsers.map((ban) => (
                                    <BannedUserItem
                                        key={ban.id}
                                        ban={ban}
                                        onUnban={handleUnbanUser}
                                        canUnban={permissions?.canBan || false}
                                    />
                                ))
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

interface BannedUserItemProps {
    ban: any; // Simplified type due to complex Supabase relations
    onUnban: (banId: string, userId: string) => void;
    canUnban: boolean;
}

const BannedUserItem: React.FC<BannedUserItemProps> = ({ ban, onUnban, canUnban }) => {
    const formatBanExpiry = () => {
        if (!ban.expiresAt) return 'Permanent';
        const expiryDate = parseISO(ban.expiresAt);
        return `Expires ${formatDistanceToNow(expiryDate, { addSuffix: true })}`;
    };

    return (
        <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="white">
            <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                    <Avatar
                        src={ban.user.avatarUrl || ban.user.avatar_url}
                        name={ban.user.username}
                        size="sm"
                    />
                    <VStack align="flex-start" spacing={1}>
                        <Text fontWeight="semibold" fontSize="sm">
                            {ban.user.username || 'Unknown User'}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            Banned by {ban.bannedBy.username || 'Unknown'} • {formatBanExpiry()}
                        </Text>
                        {ban.reason && (
                            <Text fontSize="xs" color="gray.600">
                                Reason: {ban.reason}
                            </Text>
                        )}
                    </VStack>
                </HStack>

                {canUnban && (
                    <IconButton
                        icon={<BsPersonCheck />}
                        size="sm"
                        colorScheme="green"
                        variant="ghost"
                        onClick={() => onUnban(ban.id, ban.userId)}
                        aria-label="Unban user"
                        title="Unban user"
                    />
                )}
            </HStack>
        </Box>
    );
};

// Quick Ban Button Component (can be used in the discussion)
interface QuickBanButtonProps {
    userId: string;
    challengeId: string;
    permissions: DiscussionPermissions;
    onBanComplete?: () => void;
}

export const QuickBanButton: React.FC<QuickBanButtonProps> = ({
    userId,
    challengeId,
    permissions,
    onBanComplete
}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [reason, setReason] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [banning, setBanning] = useState(false);

    if (!permissions.canBan) return null;

    const handleBan = async () => {
        try {
            setBanning(true);
            await DiscussionService.banUser(
                challengeId,
                userId,
                reason.trim() || undefined,
                expiresAt || undefined
            );

            toast({
                title: 'User banned successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            onClose();
            setReason('');
            setExpiresAt('');
            onBanComplete?.();
        } catch (error) {
            toast({
                title: 'Error banning user',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setBanning(false);
        }
    };

    return (
        <>
            <IconButton
                icon={<BsPersonX />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={onOpen}
                aria-label="Ban user"
                title="Ban user from discussion"
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ban User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Reason (optional)</FormLabel>
                                <Textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Provide a reason for the ban..."
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Expires At (optional)</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={expiresAt}
                                    onChange={(e) => setExpiresAt(e.target.value)}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Leave empty for permanent ban
                                </Text>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={handleBan}
                            isLoading={banning}
                        >
                            Ban User
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
