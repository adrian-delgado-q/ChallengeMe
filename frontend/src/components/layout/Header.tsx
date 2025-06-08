import React from 'react';
import { Box, Flex, Heading, Link, Button, Avatar, HStack } from '@chakra-ui/react';
import { PlusIcon } from '../common/Icons';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const mockUser = {
    avatar: "https://placehold.co/128x128/3b82f6/ffffff?text=A",
};

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => (
    <Box
        as="header"
        bg="whiteAlpha.900"
        backdropFilter="blur(10px)"
        position="sticky"
        top="0"
        zIndex="sticky"
        boxShadow="sm"
        flexShrink={0}
    >
        <Flex
            as="nav"
            maxW="container.xl"
            mx="auto"
            px={6}
            py={3}
            justify="space-between"
            align="center"
        >
            <Heading
                as="h1"
                size="md"
                cursor="pointer"
                onClick={() => onNavigate('home')}
                _hover={{ color: 'orange.500' }}
            >
                <Box as="span" color="orange.500">Challenge</Box>Me
            </Heading>
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                <Link onClick={() => onNavigate('home')} fontWeight="semibold" _hover={{ color: 'orange.500' }}>Home</Link>
                <Link onClick={() => onNavigate('dashboard')} fontWeight="semibold" _hover={{ color: 'orange.500' }}>Dashboard</Link>
                <Link onClick={() => onNavigate('profile')} fontWeight="semibold" _hover={{ color: 'orange.500' }}>Profile</Link>
                <Link onClick={() => onNavigate('groups')} fontWeight="semibold" _hover={{ color: 'orange.500' }}>Groups</Link>
            </HStack>
            <HStack spacing={4}>
                <Button
                    onClick={() => onNavigate('create')}
                    colorScheme="orange"
                    display={{ base: 'none', md: 'inline-flex' }}
                    leftIcon={<PlusIcon className="w-4 h-4" />}
                >
                    New Challenge
                </Button>
                <Avatar
                    src={mockUser.avatar}
                    name="User Avatar"
                    size="md"
                    cursor="pointer"
                    borderWidth="2px"
                    borderColor="transparent"
                    _hover={{ borderColor: 'orange.500' }}
                    onClick={() => onNavigate('profile')}
                />
            </HStack>
        </Flex>
    </Box>
);
