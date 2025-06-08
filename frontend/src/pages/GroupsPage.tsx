import React from 'react';
import { Box, Button, Grid, Heading, Input, Text, VStack, HStack, Tag, Avatar, TagLabel } from '@chakra-ui/react';
import { Card } from '../components/common/Card';
import { Group } from '../types';
import { UserGroupIcon } from '../components/common/Icons'; // Assuming LockClosedIcon exists

interface GroupCardProps {
    group: Group;
    onSelect: (id: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onSelect }) => (
    <Card 
        p={6} 
        h="full"
        display="flex"
        flexDirection="column"
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        onClick={() => onSelect(group.id)}
    >
        <VStack spacing={3} align="stretch" flex="1">
            <HStack justify="space-between">
                <Avatar src={group.avatarUrl} name={group.name} />
                <Tag size="sm" colorScheme={group.isPublic ? 'green' : 'gray'}>
                    {group.isPublic ? 'Public' : 'Private'}
                </Tag>
            </HStack>
            <Heading as="h3" size="md">{group.name}</Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={3}>{group.description}</Text>
        </VStack>
        <HStack mt={4} justify="space-between" color="gray.500" fontSize="sm">
            <HStack>
                <UserGroupIcon className="w-4 h-4" />
                <Text>{group.memberCount} Members</Text>
            </HStack>
            <Button size="sm" variant="outline" colorScheme="orange">View</Button>
        </HStack>
    </Card>
);

const mockGroups: Group[] = [
    { id: '1', name: 'Weekend Warriors', description: 'A casual group for weekend runners and cyclists aiming to stay active.', avatarUrl: 'https://placehold.co/64x64/34d399/ffffff?text=W', memberCount: 12, isPublic: true },
    { id: '2', name: 'Trail Blazers Hiking Club', description: 'Exploring local trails every Saturday morning. All levels welcome!', avatarUrl: 'https://placehold.co/64x64/fb923c/ffffff?text=T', memberCount: 25, isPublic: true },
    { id: '3', name: 'Office Step Challenge Crew', description: 'A private group for the annual Q3 step challenge at work.', avatarUrl: 'https://placehold.co/64x64/60a5fa/ffffff?text=O', memberCount: 8, isPublic: false },
];

const GroupsPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    return (
        <VStack spacing={12} align="stretch">
            <VStack spacing={2} textAlign="center">
                <Heading as="h2" size="2xl" fontWeight="extrabold">Find Your Team</Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">Join a group to participate in team challenges or create your own to invite friends.</Text>
            </VStack>
            <HStack maxW="2xl" w="full" mx="auto">
                <Input placeholder="Search for groups..." />
                <Button colorScheme="orange">Search</Button>
                <Button colorScheme="green" onClick={() => onNavigate('createGroup')}>Create Group</Button>
            </HStack>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                {mockGroups.map(group => (
                    <GroupCard key={group.id} group={group} onSelect={() => onNavigate('groupDetails')} />
                ))}
            </Grid>
        </VStack>
    );
};

export default GroupsPage;
