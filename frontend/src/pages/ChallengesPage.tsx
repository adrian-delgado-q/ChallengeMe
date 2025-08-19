import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button, Grid, Heading, Input, Text, VStack, HStack, Spinner, Center, Select, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeSkeletonGrid } from '../components/challenges/ChallengeCardSkeleton';
import { Pagination } from '../components/common/Pagination';
import { useChallenges } from '../hooks/useData';
import { useUser } from '../contexts/AuthContext';
import { AuthPrompt } from '../components/common/AuthPrompt';
import { GenericError } from '../components/common/GenericError';

const ChallengesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading: isAuthLoading } = useUser();

    // Pagination and filter states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [activityTypeFilter, setActivityTypeFilter] = useState('all');
    const [challengeTypeFilter, setChallengeTypeFilter] = useState('all');

    // Use the updated hook with pagination
    const {
        challenges,
        loading: isFetching,
        error,
        pagination
    } = useChallenges({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchTerm || undefined,
        activityType: activityTypeFilter !== 'all' ? activityTypeFilter : undefined,
        challengeType: challengeTypeFilter !== 'all' ? challengeTypeFilter : undefined
    });

    // Debounce search term for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            // Reset to first page when search changes
            setCurrentPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activityTypeFilter, challengeTypeFilter]);

    // Get unique activity types for filter dropdown from current challenges
    const activityTypes = useMemo(() => {
        if (!challenges) return [];
        const types = [...new Set(challenges.map(c => c.type).filter(Boolean))];
        return types.sort();
    }, [challenges]);

    // Clear all filters function
    const clearAllFilters = useCallback(() => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setActivityTypeFilter('all');
        setChallengeTypeFilter('all');
        setCurrentPage(1);
    }, []);

    // Clear search function
    const clearSearch = useCallback(() => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setCurrentPage(1);
    }, []);

    // Check if any filters are active
    const hasActiveFilters = debouncedSearchTerm !== '' || activityTypeFilter !== 'all' || challengeTypeFilter !== 'all';

    // Handle pagination changes
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    }, []);

    // Add keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Clear all filters with Ctrl/Cmd + K
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                clearAllFilters();
            }
            // Clear search with Escape (when search input is focused)
            if (event.key === 'Escape' && document.activeElement?.tagName === 'INPUT') {
                event.preventDefault();
                clearSearch();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [clearAllFilters, clearSearch]);

    if (isAuthLoading) {
        return <Center h="50vh"><Spinner size="xl" color="orange.500" /></Center>;
    }

    if (!user) {
        return <AuthPrompt onLogin={() => navigate('/auth')} />;
    }

    if (error) {
        return <GenericError message={error} />;
    }

    return (
        <VStack spacing={12} align="stretch">
            <VStack spacing={2} textAlign="center">
                <Heading as="h2" size="2xl" fontWeight="extrabold">Find Your Next Challenge</Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">Join thousands of others in community-driven fitness challenges. Stay motivated, track progress, and achieve your goals together.</Text>
            </VStack>

            {/* Enhanced Filter Bar */}
            <VStack spacing={4} maxW="4xl" w="full" mx="auto">
                {/* Search bar with clear button */}
                <HStack w="full">
                    <Input
                        placeholder="Search challenges (e.g., 'Marathon Prep', 'running', '5K')"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        flex="1"
                        title="Press Escape to clear search, Ctrl+K to clear all filters"
                    />
                    {searchTerm && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={clearSearch}
                            title="Clear search (Esc)"
                        >
                            Clear
                        </Button>
                    )}
                </HStack>

                {/* Filter dropdowns */}
                <HStack w="full" spacing={4}>
                    <Box flex="1">
                        <Select
                            placeholder="All Activity Types"
                            value={activityTypeFilter}
                            onChange={(e) => setActivityTypeFilter(e.target.value)}
                        >
                            {activityTypes.map(type => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </Select>
                    </Box>

                    <Box flex="1">
                        <Select
                            placeholder="All Challenge Types"
                            value={challengeTypeFilter}
                            onChange={(e) => setChallengeTypeFilter(e.target.value)}
                        >
                            <option value="individual">Individual</option>
                            <option value="team">Team</option>
                        </Select>
                    </Box>

                    {/* Clear All Filters button */}
                    {hasActiveFilters && (
                        <Button
                            colorScheme="orange"
                            variant="outline"
                            onClick={clearAllFilters}
                            minW="fit-content"
                            title="Clear all filters (Ctrl+K)"
                        >
                            Clear All Filters
                        </Button>
                    )}
                </HStack>

                {/* Results count and active filters indicator */}
                <HStack w="full" justify="space-between" align="center">
                    <Text fontSize="sm" color="gray.600">
                        {isFetching ? (
                            'Loading challenges...'
                        ) : (
                            <>
                                Showing {pagination.totalCount > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0}-
                                {Math.min(currentPage * itemsPerPage, pagination.totalCount)} of {pagination.totalCount} challenges
                                {searchTerm !== debouncedSearchTerm && (
                                    <Text as="span" fontSize="xs" color="orange.500" ml={2}>
                                        (filtering...)
                                    </Text>
                                )}
                            </>
                        )}
                    </Text>

                    {hasActiveFilters && !isFetching && (
                        <Text fontSize="xs" color="orange.600" fontWeight="medium">
                            Filters active: {[
                                debouncedSearchTerm && 'Search',
                                activityTypeFilter !== 'all' && 'Activity Type',
                                challengeTypeFilter !== 'all' && 'Challenge Type'
                            ].filter(Boolean).join(', ')}
                        </Text>
                    )}
                </HStack>
            </VStack>

            {/* Challenges Grid with Loading States */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
                {isFetching ? (
                    // Show skeleton loading cards
                    <ChallengeSkeletonGrid count={itemsPerPage} />
                ) : challenges && challenges.length > 0 ? (
                    // Show actual challenges
                    challenges.map(challenge => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onSelect={(id) => navigate(`/challenges/${id}`)}
                        />
                    ))
                ) : (
                    // Show empty state
                    <VStack gridColumn="1 / -1" py={12} spacing={4}>
                        <Text fontSize="lg" color="gray.500" textAlign="center">
                            {hasActiveFilters
                                ? 'No challenges match your filters. Try adjusting your search criteria.'
                                : 'No challenges found. Why not create one?'
                            }
                        </Text>
                        {hasActiveFilters ? (
                            <Button
                                variant="outline"
                                colorScheme="orange"
                                size="sm"
                                onClick={clearAllFilters}
                            >
                                Clear All Filters
                            </Button>
                        ) : (
                            <Button
                                colorScheme="orange"
                                onClick={() => navigate('/challenges/create')}
                            >
                                Create Your First Challenge
                            </Button>
                        )}
                    </VStack>
                )}
            </Grid>

            {/* Pagination */}
            {!isFetching && challenges && challenges.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={pagination.totalCount}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    showPageSizeSelector={true}
                />
            )}
        </VStack>
    );
};

export default ChallengesPage;
