import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button, Grid, Heading, Input, Text, VStack, HStack, Select, Box } from '@chakra-ui/react';
import { LoadingErrorWrapper } from '../components/common/LoadingErrorWrapper';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeSkeletonGrid } from '../components/challenges/ChallengeCardSkeleton';
import { Pagination } from '../components/common/Pagination';
import { useChallenges } from '../hooks/useChallengesQuery';
import { useUser } from '../contexts/AuthContext';
import { AuthPrompt } from '../components/common/AuthPrompt';
import { ErrorDisplay } from '../components/common/ErrorDisplay';

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

	// Memoize options to prevent infinite re-renders
	const challengeOptions = useMemo(
		() => ({
			page: currentPage,
			limit: itemsPerPage,
			search: debouncedSearchTerm || undefined,
			activityType: activityTypeFilter !== 'all' ? activityTypeFilter : undefined,
			challengeType: challengeTypeFilter !== 'all' ? challengeTypeFilter : undefined,
		}),
		[currentPage, itemsPerPage, debouncedSearchTerm, activityTypeFilter, challengeTypeFilter]
	);

	// Use the updated hook with pagination
	const { challenges, loading: isFetching, error, pagination } = useChallenges(challengeOptions);

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
	const hasActiveFilters =
		debouncedSearchTerm !== '' || activityTypeFilter !== 'all' || challengeTypeFilter !== 'all';

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
		return (
			<LoadingErrorWrapper isLoading={true} error={null} fullScreen>
				<></>
			</LoadingErrorWrapper>
		);
	}

	if (!user) {
		return <AuthPrompt onLogin={() => navigate('/auth')} />;
	}

	if (error) {
		return <ErrorDisplay message={error} fullScreen />;
	}

	return (
		<VStack spacing={12} align="stretch">
			<VStack spacing={2} textAlign="center">
				<Heading as="h2" size="2xl" fontWeight="extrabold">
					Find Your Next Challenge
				</Heading>
				<Text fontSize="lg" color="gray.600" maxW="2xl">
					Join thousands of others in community-driven fitness challenges. Stay motivated, track
					progress, and achieve your goals together.
				</Text>
			</VStack>

			{/* Enhanced Filter Bar */}
			<VStack spacing={4} maxW="4xl" w="full" mx="auto">
				{/* Search bar with clear button */}
				<HStack w="full" flexWrap={{ base: 'wrap', md: 'nowrap' }} spacing={{ base: 2, md: 4 }}>
					<Input
						placeholder="Search challenges..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						flex="1"
						minW={{ base: '200px', md: 'auto' }}
						title="Press Escape to clear search, Ctrl+K to clear all filters"
					/>
					{searchTerm && (
						<Button
							size="sm"
							variant="ghost"
							onClick={clearSearch}
							title="Clear search (Esc)"
							minW="fit-content"
						>
							Clear
						</Button>
					)}
				</HStack>

				{/* Filter dropdowns - Stack on mobile */}
				<VStack w="full" spacing={{ base: 3, md: 4 }}>
					<HStack w="full" spacing={{ base: 2, md: 4 }} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
						<Box flex="1" minW={{ base: '140px', md: 'auto' }}>
							<Select
								placeholder="All Activity Types"
								value={activityTypeFilter}
								onChange={e => setActivityTypeFilter(e.target.value)}
								size={{ base: 'md', md: 'md' }}
							>
								{activityTypes.map(type => (
									<option key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</option>
								))}
							</Select>
						</Box>

						<Box flex="1" minW={{ base: '140px', md: 'auto' }}>
							<Select
								placeholder="All Challenge Types"
								value={challengeTypeFilter}
								onChange={e => setChallengeTypeFilter(e.target.value)}
								size={{ base: 'md', md: 'md' }}
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
								size={{ base: 'md', md: 'md' }}
								w={{ base: 'full', md: 'auto' }}
							>
								Clear All Filters
							</Button>
						)}
					</HStack>
				</VStack>

				{/* Results count and active filters indicator */}
				<HStack w="full" justify="space-between" align="center">
					<Text fontSize="sm" color="gray.600">
						{isFetching ? (
							'Loading challenges...'
						) : (
							<>
								Showing {pagination.totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
								{Math.min(currentPage * itemsPerPage, pagination.totalCount)} of {pagination.totalCount}{' '}
								challenges
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
							Filters active:{' '}
							{[
								debouncedSearchTerm && 'Search',
								activityTypeFilter !== 'all' && 'Activity Type',
								challengeTypeFilter !== 'all' && 'Challenge Type',
							]
								.filter(Boolean)
								.join(', ')}
						</Text>
					)}
				</HStack>
			</VStack>

			{/* Challenges Grid with Loading States */}
			<Grid
				templateColumns={{
					base: '1fr',
					sm: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
					xl: 'repeat(4, 1fr)',
				}}
				gap={{ base: 4, md: 6 }}
			>
				{isFetching ? (
					// Show skeleton loading cards
					<ChallengeSkeletonGrid count={itemsPerPage} />
				) : challenges && challenges.length > 0 ? (
					// Show actual challenges
					challenges.map(challenge => (
						<ChallengeCard
							key={challenge.id}
							challenge={challenge}
							onSelect={id => navigate(`/challenges/${id}`)}
						/>
					))
				) : (
					// Show empty state
					<VStack gridColumn="1 / -1" py={12} spacing={4}>
						<Text fontSize="lg" color="gray.500" textAlign="center">
							{hasActiveFilters
								? 'No challenges match your filters. Try adjusting your search criteria.'
								: 'No challenges found. Why not create one?'}
						</Text>
						{hasActiveFilters ? (
							<Button variant="outline" colorScheme="orange" size="sm" onClick={clearAllFilters}>
								Clear All Filters
							</Button>
						) : (
							<Button colorScheme="orange" onClick={() => navigate('/create')}>
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
