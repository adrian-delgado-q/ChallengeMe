import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Link,
    Button,
    Avatar,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
    Spinner
} from '@chakra-ui/react';
import { PlusIcon } from '../common/Icons';
import { useUser } from '../../contexts/AuthContext'; // Using your 'useUser' hook

interface HeaderProps {
    onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    // Get the complete auth state, including the new signOut function
    const { user, signOut, isLoading } = useUser();

    // Renders the buttons and avatar menu on the right side of the header
    const renderUserActions = () => {
        // While checking for a session, show a spinner to prevent UI flicker
        if (isLoading) {
            return <Spinner size="sm" color="orange.500" />;
        }

        // If a user is logged in, show the authenticated user's menu
        if (user) {
            return (
                <HStack spacing={4}>
                    <Button
                        onClick={() => onNavigate('create')}
                        colorScheme="orange"
                        display={{ base: 'none', md: 'inline-flex' }}
                        leftIcon={<PlusIcon className="w-4 h-4" />}
                        size="sm"
                    >
                        New Challenge
                    </Button>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={0}
                        >
                            <Avatar
                                size="md"
                                borderWidth="2px"
                                borderColor="transparent"
                                _hover={{ borderColor: 'orange.300' }}
                                src={user.user_metadata?.avatar_url || ''}
                                name={user.user_metadata?.full_name || user.email}
                            />
                        </MenuButton>
                        <MenuList zIndex="popover">
                            <Box px={4} py={2}>
                                <Text fontWeight="bold" noOfLines={1}>
                                    {user.user_metadata?.full_name || "Welcome"}
                                </Text>
                                <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                    {user.email}
                                </Text>
                            </Box>
                            <MenuDivider />
                            <MenuItem onClick={() => onNavigate('profile')}>
                                My Profile
                            </MenuItem>
                            <MenuItem onClick={() => onNavigate('dashboard')}>
                                My Dashboard
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={signOut} color="red.500">
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            );
        }

        // If no user is logged in, show the Login button
        return (
            <Button
                colorScheme="orange"
                variant="solid"
                onClick={() => onNavigate('login')}
            >
                Login / Sign Up
            </Button>
        );
    };

    return (
        <Box
            as="header"
            bg="whiteAlpha.800"
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
                px={{ base: 4, md: 6 }}
                py={3}
                justify="space-between"
                align="center"
            >
                {/* Left Side: Brand */}
                <Heading
                    as="h1"
                    size="md"
                    cursor="pointer"
                    onClick={() => onNavigate('home')}
                    _hover={{ color: 'orange.500' }}
                    transition="color 0.2s"
                >
                    <Box as="span" color="orange.500">Challenge</Box>Me
                </Heading>

                {/* Center: Navigation Links (only for logged-in users) */}
                {user && (
                    <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                        <Link onClick={() => onNavigate('home')} fontWeight="medium" _hover={{ color: 'orange.500' }}>Home</Link>
                        <Link onClick={() => onNavigate('dashboard')} fontWeight="medium" _hover={{ color: 'orange.500' }}>Dashboard</Link>
                        <Link onClick={() => onNavigate('teams')} fontWeight="medium" _hover={{ color: 'orange.500' }}>Teams</Link>
                    </HStack>
                )}

                {/* Right Side: User Actions */}
                {renderUserActions()}
            </Flex>
        </Box>
    );
};