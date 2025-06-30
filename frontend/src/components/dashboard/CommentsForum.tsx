import React from 'react';
import { Avatar, Button, Textarea, VStack, HStack, Text, Box, Heading } from '@chakra-ui/react';
import type { Comment } from '../../types';
import { Card } from '../common/Card';

interface CommentsForumProps {
    comments: Comment[];
}
const mockUser = { avatar: "https://placehold.co/128x128/3b82f6/ffffff?text=A" };

export const CommentsForum: React.FC<CommentsForumProps> = ({ comments }) => (
    <Card p={6}>
        <Heading as="h3" size="lg" mb={4}>Challenge Discussion</Heading>
        <VStack spacing={6} align="stretch">
            <HStack spacing={4} align="flex-start">
                <Avatar src={mockUser.avatar} />
                <VStack spacing={2} align="stretch" flex="1">
                    <Textarea placeholder="Ask a question or share a tip..." />
                    <Button colorScheme="orange" alignSelf="flex-end">Post Comment</Button>
                </VStack>
            </HStack>
            <VStack spacing={4} pt={4} borderTopWidth="1px" borderColor="gray.200" align="stretch">
                {comments.map((comment) => (
                    <HStack key={comment.id} spacing={4} align="flex-start">
                        <Avatar src={comment.user.avatar} name={comment.user.name} />
                        <Box>
                            <HStack>
                                <Text fontWeight="semibold" fontSize="sm">{comment.user.name}</Text>
                                <Text fontSize="xs" color="gray.500">{comment.timestamp}</Text>
                            </HStack>
                            <Text fontSize="sm" mt={1}>{comment.content}</Text>
                        </Box>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    </Card>
);
