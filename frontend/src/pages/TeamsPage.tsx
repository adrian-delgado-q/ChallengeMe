import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Grid, Heading, Input, Text, VStack, HStack, Tag, Avatar, Spinner, Center, Select, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { TeamSkeletonGrid } from '../components/teams/TeamCardSkeleton';
import { Pagination } from '../components/common/Pagination';

import { UserTeamIcon } from '../components/common/Icons';
import { useUser } from '../contexts/AuthContext';
import { useTeams } from '../hooks/useData';
import { AuthPrompt } from '../components/common/AuthPrompt';
import { ErrorDisplay } from '../components/common/ErrorDisplay';

import type { Team } from '../types';

interface TeamCardProps {
    team: Team;
    onSelect: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onSelect }) => (
    <Card
        p={{ base: 4, md: 6 }}
        h="full"
        display="flex"
        flexDirection="column"
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        onClick={() => onSelect(team.id)}
    >
        <VStack spacing={3} align="stretch" flex="1">
            <HStack justify="space-between">
                <Avatar src={team.avatarUrl} name={team.name} />
                <Tag size="sm" colorScheme={team.isPublic ? 'green' : 'gray'}>
                    {team.isPublic ? 'Public' : 'Private'}
                </Tag>
            </HStack>
            <Heading as="h3" size="md">{team.name}</Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={3}>{team.description}</Text>

            {/* Sports Types Tags */}
            {team.sportsTypes && team.sportsTypes.length > 0 && (
                <HStack wrap="wrap" spacing={1}>
                    {team.sportsTypes.slice(0, 3).map((sport) => (
                        <Tag key={sport} size="sm" colorScheme="orange" variant="subtle">
                            {sport}
                        </Tag>
                    ))}
                    {team.sportsTypes.length > 3 && (
                        <Tag size="sm" colorScheme="gray" variant="subtle">
                            +{team.sportsTypes.length - 3}
                        </Tag>
                    )}
                </HStack>
            )}
        </VStack>
        <HStack mt={4} justify="space-between" color="gray.500" fontSize="sm">
            <HStack>
                <UserTeamIcon className="w-4 h-4" />
                <Text>
                    {team.memberCount}{team.maxMembers ? `/${team.maxMembers}` : ''} Members
                </Text>
            </HStack>
        </HStack>
    </Card>
);

const TeamsPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading: isAuthLoading } = useUser();

    // Pagination and filter states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'public' | 'private'>('all');
    const [memberCountFilter, setMemberCountFilter] = useState<'all' | '1-5' | '6-15' | '16+'>('all');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1); // Reset to first page on search
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Prepare filter options for the hook
    const filterOptions = useMemo(() => {
        const options: any = {
            page: currentPage,
            limit: itemsPerPage,
            search: debouncedSearchTerm || undefined,
        };

        // Apply visibility filter
        if (visibilityFilter !== 'all') {
            options.isPublic = visibilityFilter === 'public';
        }

        // Apply member count filter
        if (memberCountFilter !== 'all') {
            switch (memberCountFilter) {
                case '1-5':
                    options.minMembers = 1;
                    options.maxMembers = 5;
                    break;
                case '6-15':
                    options.minMembers = 6;
                    options.maxMembers = 15;
                    break;
                case '16+':
                    options.minMembers = 16;
                    break;
            }
        }

        return options;
    }, [currentPage, itemsPerPage, debouncedSearchTerm, visibilityFilter, memberCountFilter]);

    const {
        teams,
        loading: isFetching,
        error: fetchError,
        totalCount,
        refetch: fetchTeams
    } = useTeams(filterOptions);

    // Reset to first page when filters change
    const handleFilterChange = useCallback((filterType: string, value: any) => {
        switch (filterType) {
            case 'visibility':
                setVisibilityFilter(value);
                break;
            case 'memberCount':
                setMemberCountFilter(value);
                break;
        }
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
    }, []);

    if (isAuthLoading) {
        return <Center h="50vh"><Spinner size="xl" color="orange.500" /></Center>;
    }

    if (!user) {
        return <AuthPrompt onLogin={() => navigate('/auth')} />;
    }

    if (fetchError) {
        return <ErrorDisplay title="Could not load teams" message="There was an issue fetching the team data. Please try again later." onRetry={fetchTeams} fullScreen />;
    }

    return (
        <VStack spacing={12} align="stretch">
            <VStack spacing={2} textAlign="center">
                <Heading as="h2" size="2xl" fontWeight="extrabold">Find Your Team</Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">
                    Join a team to participate in team challenges or create your own to invite friends.
                </Text>
            </VStack>

            {/* Enhanced Filter Bar */}
            <VStack spacing={4} maxW="4xl" w="full" mx="auto">
                {/* Search bar */}
                <HStack w="full">
                    <Input
                        placeholder="Search teams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size={{ base: "md", md: "lg" }}
                        bg="white"
                        borderColor="gray.200"
                        _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px orange.400' }}
                    />
                </HStack>

                {/* Filter Controls */}
                <VStack spacing={{ base: 3, md: 4 }} w="full">
                    <HStack spacing={{ base: 2, md: 4 }} w="full" flexWrap="wrap" justify="space-between">
                    {/* Visibility Filter */}
                    <Box minW="120px">
                        <Text fontSize="sm" fontWeight="medium" mb={1}>Visibility</Text>
                        <Select
                            value={visibilityFilter}
                            onChange={(e) => handleFilterChange('visibility', e.target.value as any)}
                            size="sm"
                        >
                            <option value="all">All Teams</option>
                            <option value="public">Public Only</option>
                            <option value="private">Private Only</option>
                        </Select>
                    </Box>

                    {/* Member Count Filter */}
                    <Box minW="120px">
                        <Text fontSize="sm" fontWeight="medium" mb={1}>Team Size</Text>
                        <Select
                            value={memberCountFilter}
                            onChange={(e) => handleFilterChange('memberCount', e.target.value as any)}
                            size="sm"
                        >
                            <option value="all">Any Size</option>
                            <option value="1-5">1-5 Members</option>
                            <option value="6-15">6-15 Members</option>
                            <option value="16+">16+ Members</option>
                        </Select>
                    </Box>

                    {/* Results Summary */}
                    <Box flex="1" textAlign="right">
                        <Text fontSize="sm" color="gray.600">
                            {isFetching ? 'Loading...' : `${totalCount} team${totalCount !== 1 ? 's' : ''} found`}
                        </Text>
                    </Box>
                    </HStack>
                </VStack>
            </VStack>

            {/* Teams Grid with Loading States */}
            {isFetching ? (
                <TeamSkeletonGrid count={itemsPerPage} />
            ) : teams.length > 0 ? (
                <VStack spacing={8} align="stretch">
                    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 6 }}>
                        {teams.map(team => (
                            <TeamCard key={team.id} team={team} onSelect={() => navigate(`/teams/${team.id}`)} />
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </VStack>
            ) : (
                <ErrorDisplay
                    title="No teams found"
                    message={
                        debouncedSearchTerm || visibilityFilter !== 'all' || memberCountFilter !== 'all'
                            ? "No teams match your current filters. Try adjusting your search criteria."
                            : "No teams found. Why not create one?"
                    }
                    compact
                />
            )}
        </VStack>
    );
};

export default TeamsPage;
