import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	Avatar,
	Heading,
	HStack,
	Text,
	VStack,
	Spinner,
	Center,
	Button,
	Box,
} from '@chakra-ui/react';
import { ActivityService } from '../../services';
import { useUser } from '../../contexts/AuthContext';
import { useActivityUpdates } from '../../hooks/useActivityUpdates';
import { Card } from '../common/Card';

interface ActivityTrackerProps {
	challengeId: string;
}

export const ActivityTracker: React.FC<ActivityTrackerProps> = ({ challengeId }) => {
	const { user } = useUser();
	const [entries, setEntries] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAll, setShowAll] = useState(false);

	const fetchActivityTracker = useCallback(async () => {
		if (!challengeId) return;

		setLoading(true);
		setError(null);

		try {
			const ActivityTrackerData = await ActivityService.getActivitiesForActivityTracker(challengeId);
			setEntries(ActivityTrackerData);
		} catch (err: any) {
			setError(err.message || 'Failed to load ActivityTracker');
		} finally {
			setLoading(false);
		}
	}, [challengeId]);

	useEffect(() => {
		fetchActivityTracker();
	}, [fetchActivityTracker]);

	// Set up real-time updates for ActivityTracker - only when challengeId is present
	useActivityUpdates({
		challengeId,
		onActivityUpdate: fetchActivityTracker,
		enabled: !!challengeId, // Only enable when challengeId exists
	});

	// Compute entries to display based on "You + Neighbors" view
	const displayEntries = useMemo(() => {
		if (showAll || entries.length <= 5) {
			return entries;
		}

		const currentUserIndex = entries.findIndex(entry => entry.id === user?.id);
		const result = [];

		// Always include top 3
		result.push(...entries.slice(0, 3));

		// If current user is not in top 3, add them and neighbors
		if (currentUserIndex > 2) {
			// Add separator if there's a gap
			if (currentUserIndex > 3) {
				result.push({ isSeparator: true });
			}

			// Add user's neighbors (user above, user, user below)
			const start = Math.max(3, currentUserIndex - 1);
			const end = Math.min(entries.length, currentUserIndex + 2);

			// Avoid duplicates with top 3
			const neighborsSlice = entries.slice(start, end);
			for (const entry of neighborsSlice) {
				if (!result.some(existing => existing.id === entry.id)) {
					result.push(entry);
				}
			}
		}

		return result;
	}, [entries, user?.id, showAll]);

	if (loading) {
		return (
			<Card p={4}>
				<Heading as="h4" size="sm" mb={3}>
					Activity Tracker
				</Heading>
				<Center h="120px">
					<Spinner color="orange.500" size="sm" />
				</Center>
			</Card>
		);
	}

	if (error) {
		return (
			<Card p={4}>
				<Heading as="h4" size="sm" mb={3}>
					Activity Tracker
				</Heading>
				<Text color="red.500" fontSize="sm">
					Failed to load activity data: {error}
				</Text>
			</Card>
		);
	}

	return (
		<Card p={4}>
			<HStack justify="space-between" align="center" mb={3}>
				<Heading as="h4" size="sm">
					Activity Tracker
				</Heading>
				{entries.length > 5 && (
					<Button size="xs" variant="ghost" colorScheme="orange" onClick={() => setShowAll(!showAll)}>
						{showAll ? 'Show Less' : 'Show All'}
					</Button>
				)}
			</HStack>

			<Box
				maxH={showAll ? '300px' : 'auto'}
				overflowY={showAll ? 'auto' : 'visible'}
				sx={{
					'&::-webkit-scrollbar': {
						width: '3px',
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						background: 'gray.300',
						borderRadius: '3px',
						opacity: 0,
						transition: 'opacity 0.2s',
					},
					'&:hover::-webkit-scrollbar-thumb': {
						opacity: 1,
					},
				}}
			>
				<VStack spacing={2} align="stretch">
					{entries.length > 0 ? (
						displayEntries.map((entry, index) => {
							// Handle separator
							if (entry.isSeparator) {
								return (
									<HStack key={`separator-${index}`} justify="center" py={1}>
										<Text fontSize="xs" color="gray.400">
											⋯
										</Text>
									</HStack>
								);
							}

							const isCurrentUser = user?.id === entry.id;
							return (
								<HStack
									key={entry.rank}
									p={2}
									rounded="md"
									bg={isCurrentUser ? 'orange.50' : 'transparent'}
									borderWidth={isCurrentUser ? '1px' : '0px'}
									borderColor="orange.200"
									fontSize="sm"
								>
									<Text fontWeight="bold" color="gray.500" w={8}>
										{entry.rank}
									</Text>
									<Avatar src={entry.avatar} name={entry.name} size="sm" />
									<Text fontWeight="semibold" flex="1">
										{isCurrentUser ? 'You' : entry.name}
									</Text>
									<Text fontWeight="bold" color="orange.600">
										{entry.value}
									</Text>
								</HStack>
							);
						})
					) : (
						<Text color="gray.500" textAlign="center" py={8}>
							No activities logged yet. Be the first!
						</Text>
					)}
				</VStack>
			</Box>
		</Card>
	);
};
