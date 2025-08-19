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
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusIcon } from '../common/Icons';
import { useUser } from '../../contexts/AuthContext'; // Using your 'useUser' hook

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Get the complete auth state, including the new signOut function
    const { user, signOut, isLoading } = useUser();

    // Determine which action button to show based on current page
    const getContextualButton = () => {
        const path = location.pathname;

        if (path === '/teams' || (path.startsWith('/teams/') && !path.includes('/edit'))) {
            return {
                label: 'New Team',
                onClick: () => navigate('/create-team'),
                icon: <PlusIcon className="w-4 h-4" />
            };
        } else if (path === '/create-team' || path.includes('/teams/') && path.includes('/edit')) {
            // On create-team or edit-team pages, show "New Challenge" button
            return {
                label: 'New Challenge',
                onClick: () => navigate('/create'),
                icon: <PlusIcon className="w-4 h-4" />
            };
        } else {
            return {
                label: 'New Challenge',
                onClick: () => navigate('/create'),
                icon: <PlusIcon className="w-4 h-4" />
            };
        }
    };

    // Renders the buttons and avatar menu on the right side of the header
    const renderUserActions = () => {
        // While checking for a session, show a spinner to prevent UI flicker
        if (isLoading) {
            return <Spinner size="sm" color="orange.500" />;
        }

        // If a user is logged in, show the authenticated user's menu
        if (user) {
            const contextButton = getContextualButton();

            return (
                <HStack spacing={4}>
                    <Button
                        onClick={contextButton.onClick}
                        colorScheme="orange"
                        display={{ base: 'none', md: 'inline-flex' }}
                        leftIcon={contextButton.icon}
                        size="sm"
                    >
                        {contextButton.label}
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
                            <MenuItem onClick={() => navigate('/profile')}>
                                My Profile
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/activities')}>
                                My Activities
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
                onClick={() => navigate('/auth')}
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
                    onClick={() => navigate('/')}
                    _hover={{ color: 'orange.500' }}
                    transition="color 0.2s"
                >
                    <Box as="span" color="orange.500">Challenge</Box>Me
                </Heading>

                {/* Center: Navigation Links (only for logged-in users) */}
                {user && (
                    <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                        <Link onClick={() => navigate('/challenges')} fontWeight="bold" _hover={{ color: 'orange.500' }}>Challenges</Link>
                        <Link onClick={() => navigate('/teams')} fontWeight="bold" _hover={{ color: 'orange.500' }}>Teams</Link>
                        <Link onClick={() => navigate('/activities')} fontWeight="bold" _hover={{ color: 'orange.500' }}>Activities</Link>
                    </HStack>
                )}

                {/* Right Side: User Actions */}
                {renderUserActions()}
            </Flex>
        </Box>
    );
};