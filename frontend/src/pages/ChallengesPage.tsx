import React, { useState, useMemo, useEffect } from 'react';
import { Button, Grid, Heading, Input, Text, VStack, HStack, Spinner, Center, Select, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { useChallenges } from '../hooks/useData';
import { useUser } from '../contexts/AuthContext';
import { AuthPrompt } from '../components/common/AuthPrompt';
import { GenericError } from '../components/common/GenericError';

const ChallengesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading: isAuthLoading } = useUser();
    const { challenges, loading: isFetching, error } = useChallenges();

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [activityTypeFilter, setActivityTypeFilter] = useState('all');
    const [challengeTypeFilter, setChallengeTypeFilter] = useState('all');

    // Debounce search term for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Filtered challenges
    const filteredChallenges = useMemo(() => {
        if (!challenges) return [];

        return challenges.filter(challenge => {
            // Search filter (using debounced search term)
            const matchesSearch = debouncedSearchTerm === '' ||
                challenge.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                challenge.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                challenge.type?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

            // Activity type filter
            const matchesActivityType = activityTypeFilter === 'all' ||
                challenge.type === activityTypeFilter;

            // Challenge type filter (individual vs team)
            const matchesChallengeType = challengeTypeFilter === 'all' ||
                challenge.challengeType === challengeTypeFilter;

            return matchesSearch && matchesActivityType && matchesChallengeType;
        });
    }, [challenges, debouncedSearchTerm, activityTypeFilter, challengeTypeFilter]);

    // Get unique activity types for filter dropdown
    const activityTypes = useMemo(() => {
        if (!challenges) return [];
        const types = [...new Set(challenges.map(c => c.type).filter(Boolean))];
        return types.sort();
    }, [challenges]);

    // Clear all filters function
    const clearAllFilters = () => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
        setActivityTypeFilter('all');
        setChallengeTypeFilter('all');
    };

    // Clear search function
    const clearSearch = () => {
        setSearchTerm('');
        setDebouncedSearchTerm('');
    };

    // Check if any filters are active
    const hasActiveFilters = debouncedSearchTerm !== '' || activityTypeFilter !== 'all' || challengeTypeFilter !== 'all';

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
    }, []);

    if (isAuthLoading || isFetching) {
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
                        Showing {filteredChallenges.length} of {challenges?.length || 0} challenges
                        {searchTerm !== debouncedSearchTerm && (
                            <Text as="span" fontSize="xs" color="orange.500" ml={2}>
                                (filtering...)
                            </Text>
                        )}
                    </Text>

                    {hasActiveFilters && (
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

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
                {filteredChallenges.length > 0 ? (
                    filteredChallenges.map(challenge => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onSelect={(id) => navigate(`/challenges/${id}`)}
                        />
                    ))
                ) : (
                    <VStack gridColumn="1 / -1" py={8}>
                        <Text fontSize="lg" color="gray.500">
                            {hasActiveFilters
                                ? 'No challenges match your filters. Try adjusting your search criteria.'
                                : 'No challenges found. Why not create one?'
                            }
                        </Text>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                colorScheme="orange"
                                size="sm"
                                onClick={clearAllFilters}
                            >
                                Clear All Filters
                            </Button>
                        )}
                    </VStack>
                )}
            </Grid>
        </VStack>
    );
};

export default ChallengesPage;
