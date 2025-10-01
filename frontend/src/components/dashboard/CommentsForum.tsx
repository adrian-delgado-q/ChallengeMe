import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Textarea,
    VStack,
    HStack,
    Text,
    Box,
    Heading,
    useToast,
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Collapse,
    useDisclosure,
    Spinner,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical, BsPinAngle, BsPinAngleFill, BsReply, BsTrash } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow, parseISO } from 'date-fns';

import type { DiscussionPost, DiscussionReply, DiscussionPermissions } from '../../types';
import { Card } from '../common/Card';
import { useUser } from '../../contexts/AuthContext';
import {
    useDiscussionQuery,
    useDiscussionPermissionsQuery,
    useDiscussionMutations,
} from '../../hooks/useDiscussionQuery';
import { QuickBanButton, DiscussionModeration } from './DiscussionModeration';

interface CommentsForumProps {
    challengeId: string;
}

// Utility function to sort posts: pinned posts first (newest pinned first), then regular posts (newest first)
const sortPosts = (posts: DiscussionPost[]) => {
    return posts.sort((a, b) => {
        // If both are pinned or both are not pinned, sort by creation date (newest first)
        if (a.isPinned === b.isPinned) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // If one is pinned and one is not, pinned comes first
        return a.isPinned ? -1 : 1;
    });
};

export const CommentsForum: React.FC<CommentsForumProps> = ({ challengeId }) => {
    const { user } = useUser();
    const toast = useToast();
    const newPostFormBg = useColorModeValue('gray.50', 'gray.700');

    const { data: posts = [], isLoading: loading } = useDiscussionQuery(challengeId);

    const { data: permissions } = useDiscussionPermissionsQuery(challengeId, user?.id || '');

    const { createPost, togglePin, deletePost } = useDiscussionMutations();

    const [newPostContent, setNewPostContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Sort posts: pinned posts first (newest pinned first), then regular posts (newest first)
    const sortedPosts = sortPosts(posts);

    const handleCreatePost = async () => {
        if (!newPostContent.trim() || !permissions?.canPost) return;

        try {
            setSubmitting(true);
            await createPost.mutateAsync({
                challengeId,
                content: newPostContent.trim(),
            });

            setNewPostContent('');

            toast({
                title: 'Post created successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error creating post',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleTogglePin = async (postId: string) => {
        if (!permissions?.canPin) return;

        try {
            await togglePin.mutateAsync({ postId, challengeId });

            toast({
                title: 'Pin status updated',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error updating pin status',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const handleDeletePost = async (postId: string) => {
        try {
            await deletePost.mutateAsync(postId);

            toast({
                title: 'Post deleted',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error deleting post',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Card p={6}>
                <Flex justify="center" align="center" minH="200px">
                    <Spinner size="lg" color="orange.500" />
                </Flex>
            </Card>
        );
    }

    if (permissions?.isBanned) {
        return (
            <Card p={6}>
                <Heading as="h3" size="lg" mb={4} color="red.500">
                    Discussion Access Restricted
                </Heading>
                <Text color="red.600">
                    You have been banned from this discussion.
                    {permissions.banReason && ` Reason: ${permissions.banReason}`}
                    {permissions.banExpiresAt &&
                        ` Expires: ${formatDistanceToNow(parseISO(permissions.banExpiresAt), { addSuffix: true })}`}
                </Text>
            </Card>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            {/* Moderation Panel (only visible to moderators) */}
            <DiscussionModeration challengeId={challengeId} />

            <Card p={4}>
                <VStack spacing={4} align="stretch">
                    {/* Header with compact styling */}
                    <HStack justify="space-between" align="center">
                        <Heading as="h4" size="md" color="orange.500">
                            Discussion ({posts.length})
                        </Heading>
                        {posts.length > 0 && (
                            <Text fontSize="xs" color="gray.500">
                                {posts.filter(p => p.isPinned).length > 0 &&
                                    `${posts.filter(p => p.isPinned).length} pinned • `}
                                {posts.length} posts
                            </Text>
                        )}
                    </HStack>

                    {/* Compact New Post Form */}
                    {permissions?.canPost && (
                        <HStack spacing={3} align="flex-start" bg={newPostFormBg} p={3} borderRadius="md">
                            <Avatar
                                src={user?.user_metadata?.avatar_url}
                                name={user?.user_metadata?.full_name || user?.email}
                                size="sm"
                            />
                            <VStack spacing={2} align="stretch" flex="1">
                                <Textarea
                                    placeholder="Join the discussion..."
                                    value={newPostContent}
                                    onChange={e => setNewPostContent(e.target.value)}
                                    rows={2}
                                    resize="vertical"
                                    size="sm"
                                    fontSize="sm"
                                />
                                <HStack justify="flex-end">
                                    <Button
                                        size="sm"
                                        colorScheme="orange"
                                        onClick={handleCreatePost}
                                        isDisabled={!newPostContent.trim() || submitting}
                                        isLoading={submitting}
                                        loadingText="Posting..."
                                    >
                                        Post
                                    </Button>
                                </HStack>
                            </VStack>
                        </HStack>
                    )}

                    {/* Discussion Posts */}
                    <VStack spacing={3} align="stretch">
                        {posts.length === 0 ? (
                            <Text color="gray.500" textAlign="center" py={6} fontSize="sm">
                                No discussions yet. Be the first to start the conversation!
                            </Text>
                        ) : (
                            sortedPosts.map(post => (
                                <DiscussionPostItem
                                    key={post.id}
                                    post={post}
                                    challengeId={challengeId}
                                    permissions={permissions || null}
                                    onTogglePin={handleTogglePin}
                                    onDeletePost={handleDeletePost}
                                    onReplyAdded={() => { }}
                                />
                            ))
                        )}
                    </VStack>
                </VStack>
            </Card>
        </VStack>
    );
};

interface DiscussionPostItemProps {
    post: DiscussionPost;
    challengeId: string;
    permissions: DiscussionPermissions | null;
    onTogglePin: (postId: string) => void;
    onDeletePost: (postId: string) => void;
    onReplyAdded: () => void;
}

const DiscussionPostItem: React.FC<DiscussionPostItemProps> = ({
    post,
    challengeId,
    permissions,
    onTogglePin,
    onDeletePost,
    onReplyAdded,
}) => {
    const { user } = useUser();
    const toast = useToast();
    const { isOpen: isReplying, onToggle: toggleReply } = useDisclosure();
    const { isOpen: showReplies, onToggle: toggleReplies } = useDisclosure();

    const { createReply } = useDiscussionMutations();
    const [replyContent, setReplyContent] = useState('');
    const [submittingReply, setSubmittingReply] = useState(false);

    // All color mode values at the top
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const buttonHoverBg = useColorModeValue('gray.100', 'gray.600');
    const replyBorderColor = useColorModeValue('orange.300', 'orange.600');
    const replyBg = useColorModeValue('orange.25', 'orange.900');
    const repliesBorderColor = useColorModeValue('orange.200', 'orange.700');
    const repliesBg = useColorModeValue('orange.25', 'orange.900');

    const canEdit = permissions?.canEdit && post.authorId === user?.id;
    const canDelete = permissions?.canDelete || (permissions?.canEdit && post.authorId === user?.id);

    const handleCreateReply = async () => {
        if (!replyContent.trim() || !permissions?.canReply) return;

        try {
            setSubmittingReply(true);
            await createReply.mutateAsync({
                postId: post.id,
                challengeId,
                content: replyContent.trim(),
            });

            setReplyContent('');
            toggleReply();
            onReplyAdded();

            toast({
                title: 'Reply posted successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error posting reply',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setSubmittingReply(false);
        }
    };

    return (
        <Box bg={bgColor} p={3} borderRadius="md" borderWidth="1px" borderColor={borderColor} shadow="sm">
            <HStack align="flex-start" spacing={3}>
                <Avatar src={post.author.avatarUrl} name={post.author.username} size="sm" />
                <VStack align="stretch" flex="1" spacing={2}>
                    <HStack justify="space-between" align="center">
                        <HStack spacing={2} wrap="wrap">
                            <Text fontWeight="semibold" fontSize="sm">
                                {post.author.username || 'Anonymous'}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                                {formatDistanceToNow(parseISO(post.createdAt), { addSuffix: true })}
                            </Text>
                            {post.isPinned && (
                                <Badge colorScheme="orange" size="sm" fontSize="xs">
                                    <HStack spacing={1}>
                                        <BsPinAngleFill size="10px" />
                                        <Text>Pinned</Text>
                                    </HStack>
                                </Badge>
                            )}
                        </HStack>

                        {(canEdit || canDelete || permissions?.canPin || permissions?.canBan) && (
                            <Menu>
                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} variant="ghost" size="sm" />
                                <MenuList>
                                    {permissions?.canPin && (
                                        <MenuItem
                                            icon={post.isPinned ? <BsPinAngle /> : <BsPinAngleFill />}
                                            onClick={() => onTogglePin(post.id)}
                                        >
                                            {post.isPinned ? 'Unpin' : 'Pin'} Post
                                        </MenuItem>
                                    )}
                                    {canDelete && (
                                        <MenuItem icon={<BsTrash />} onClick={() => onDeletePost(post.id)} color="red.500">
                                            Delete Post
                                        </MenuItem>
                                    )}
                                    {permissions?.canBan && post.authorId !== user?.id && (
                                        <MenuItem closeOnSelect={false}>
                                            <QuickBanButton
                                                userId={post.authorId}
                                                challengeId={challengeId}
                                                permissions={permissions}
                                                onBanComplete={() => onReplyAdded()}
                                            />
                                        </MenuItem>
                                    )}
                                </MenuList>
                            </Menu>
                        )}
                    </HStack>

                    <Box fontSize="sm">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Box>

                    <HStack spacing={3} fontSize="sm">
                        {permissions?.canReply && (
                            <Button
                                size="xs"
                                variant="ghost"
                                leftIcon={<BsReply size="12px" />}
                                onClick={toggleReply}
                                _hover={{ bg: buttonHoverBg }}
                            >
                                Reply
                            </Button>
                        )}

                        {post.replyCount > 0 && (
                            <Button
                                size="xs"
                                variant="ghost"
                                rightIcon={showReplies ? <ChevronUpIcon boxSize={3} /> : <ChevronDownIcon boxSize={3} />}
                                onClick={toggleReplies}
                                _hover={{ bg: buttonHoverBg }}
                            >
                                {post.replyCount} {post.replyCount === 1 ? 'reply' : 'replies'}
                            </Button>
                        )}
                    </HStack>

                    {/* Compact Reply Form */}
                    <Collapse in={isReplying}>
                        <Box
                            pt={2}
                            pl={3}
                            borderLeftWidth="2px"
                            borderColor={replyBorderColor}
                            bg={replyBg}
                            borderRadius="sm"
                        >
                            <HStack align="flex-start" spacing={2}>
                                <Avatar
                                    src={user?.user_metadata?.avatar_url}
                                    name={user?.user_metadata?.full_name || user?.email}
                                    size="xs"
                                />
                                <VStack align="stretch" flex="1" spacing={2}>
                                    <Textarea
                                        placeholder="Write a reply..."
                                        value={replyContent}
                                        onChange={e => setReplyContent(e.target.value)}
                                        size="sm"
                                        rows={2}
                                        fontSize="sm"
                                    />
                                    <HStack>
                                        <Button
                                            size="xs"
                                            colorScheme="orange"
                                            onClick={handleCreateReply}
                                            isDisabled={!replyContent.trim()}
                                            isLoading={submittingReply}
                                        >
                                            Reply
                                        </Button>
                                        <Button size="xs" variant="ghost" onClick={toggleReply}>
                                            Cancel
                                        </Button>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    </Collapse>

                    {/* Compact Replies */}
                    {post.replies && post.replies.length > 0 && (
                        <Collapse in={showReplies}>
                            <VStack
                                align="stretch"
                                spacing={2}
                                pt={2}
                                pl={3}
                                borderLeftWidth="2px"
                                borderColor={repliesBorderColor}
                                bg={repliesBg}
                                borderRadius="sm"
                                position="relative"
                            >
                                {post.replies.map(reply => (
                                    <DiscussionReplyItem
                                        key={reply.id}
                                        reply={reply}
                                        challengeId={challengeId}
                                        permissions={permissions}
                                        onReplyAdded={onReplyAdded}
                                        nestLevel={0}
                                    />
                                ))}
                            </VStack>
                        </Collapse>
                    )}
                </VStack>
            </HStack>
        </Box>
    );
};

interface DiscussionReplyItemProps {
    reply: DiscussionReply;
    challengeId: string;
    permissions: DiscussionPermissions | null;
    onReplyAdded: () => void;
    nestLevel: number;
}

const DiscussionReplyItem: React.FC<DiscussionReplyItemProps> = ({
    reply,
    challengeId,
    permissions,
    onReplyAdded,
    nestLevel,
}) => {
    const { user } = useUser();
    const toast = useToast();
    const { isOpen: isReplying, onToggle: toggleReply } = useDisclosure();
    const [replyContent, setReplyContent] = useState('');
    const [submittingReply, setSubmittingReply] = useState(false);

    const { createReply, deleteReply } = useDiscussionMutations();

    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const canDelete = permissions?.canDelete || (permissions?.canEdit && reply.authorId === user?.id);
    const maxNestLevel = 3; // Limit nesting to prevent excessive indentation

    const handleCreateReply = async () => {
        if (!replyContent.trim() || !permissions?.canReply) return;

        try {
            setSubmittingReply(true);
            await createReply.mutateAsync({
                postId: reply.postId,
                challengeId,
                parentId: reply.id,
                content: replyContent.trim(),
            });

            setReplyContent('');
            toggleReply();
            onReplyAdded();

            toast({
                title: 'Reply posted successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error posting reply',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setSubmittingReply(false);
        }
    };

    const handleDeleteReply = async () => {
        try {
            await deleteReply.mutateAsync(reply.id);
            onReplyAdded(); // Refresh the discussion

            toast({
                title: 'Reply deleted',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error deleting reply',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box ml={nestLevel * 3}>
            <HStack align="flex-start" spacing={2}>
                <Avatar src={reply.author.avatarUrl} name={reply.author.username} size="xs" />
                <VStack align="stretch" flex="1" spacing={1}>
                    <HStack justify="space-between" align="center">
                        <HStack spacing={2}>
                            <Text fontWeight="semibold" fontSize="xs">
                                {reply.author.username || 'Anonymous'}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                                {formatDistanceToNow(parseISO(reply.createdAt), { addSuffix: true })}
                            </Text>
                        </HStack>

                        {canDelete && (
                            <IconButton
                                icon={<BsTrash />}
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                onClick={handleDeleteReply}
                                aria-label="Delete reply"
                            />
                        )}
                    </HStack>

                    <Box
                        bg={bgColor}
                        p={2}
                        borderRadius="sm"
                        borderWidth="1px"
                        borderColor={borderColor}
                        fontSize="sm"
                    >
                        <ReactMarkdown>{reply.content}</ReactMarkdown>
                    </Box>

                    <HStack spacing={2}>
                        {permissions?.canReply && nestLevel < maxNestLevel && (
                            <Button
                                size="xs"
                                variant="ghost"
                                leftIcon={<BsReply size="10px" />}
                                onClick={toggleReply}
                                fontSize="xs"
                            >
                                Reply
                            </Button>
                        )}
                    </HStack>

                    {/* Compact Reply Form */}
                    <Collapse in={isReplying}>
                        <Box pt={1}>
                            <HStack align="flex-start" spacing={2}>
                                <Avatar
                                    src={user?.user_metadata?.avatar_url}
                                    name={user?.user_metadata?.full_name || user?.email}
                                    size="xs"
                                />
                                <VStack align="stretch" flex="1" spacing={1}>
                                    <Textarea
                                        placeholder="Write a reply..."
                                        value={replyContent}
                                        onChange={e => setReplyContent(e.target.value)}
                                        size="sm"
                                        rows={2}
                                        fontSize="xs"
                                    />
                                    <HStack>
                                        <Button
                                            size="xs"
                                            colorScheme="orange"
                                            onClick={handleCreateReply}
                                            isDisabled={!replyContent.trim()}
                                            isLoading={submittingReply}
                                        >
                                            Reply
                                        </Button>
                                        <Button size="xs" variant="ghost" onClick={toggleReply}>
                                            Cancel
                                        </Button>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    </Collapse>

                    {/* Nested Replies */}
                    {reply.replies && reply.replies.length > 0 && (
                        <VStack align="stretch" spacing={1} pt={1}>
                            {reply.replies.map(nestedReply => (
                                <DiscussionReplyItem
                                    key={nestedReply.id}
                                    reply={nestedReply}
                                    challengeId={challengeId}
                                    permissions={permissions}
                                    onReplyAdded={onReplyAdded}
                                    nestLevel={nestLevel + 1}
                                />
                            ))}
                        </VStack>
                    )}
                </VStack>
            </HStack>
        </Box>
    );
};
