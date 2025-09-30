import React from 'react';
import {
	Avatar,
	Box,
	Button,
	Grid,
	Heading,
	Text,
	VStack,
	HStack,
	Spinner,
	Center,
	Alert,
	AlertIcon,
	useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { Card } from '../components/common/Card';
import { EditProfileModal } from '../components/common/EditProfileModal';
import { useChallengesQuery } from '../hooks/useChallengesQuery';
import { useCurrentProfileQuery } from '../hooks/useProfilesQuery';
import { useUser } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useUser();
	const {
		data: challengeData,
		isLoading: challengesLoading,
		error: challengesError,
	} = useChallengesQuery();
	const challenges = Array.isArray(challengeData) ? challengeData : challengeData?.challenges || [];
	const { data: profile, isLoading: profileLoading } = useCurrentProfileQuery();
	const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

	// Handle profile update
	const handleProfileUpdate = () => {
		// Profile will be updated automatically via React Query
		onEditClose();
	};

	if (!user) {
		return (
			<Alert status="info">
				<AlertIcon />
				Please log in to view your profile.
			</Alert>
		);
	}

	if (profileLoading) {
		return (
			<Center h="200px">
				<Spinner size="xl" color="orange.500" />
			</Center>
		);
	}

	const userProfile = profile || {
		username: user.email || 'User',
		avatarUrl: `https://placehold.co/128x128/3b82f6/ffffff?text=${(user.email?.[0] || 'U').toUpperCase()}`,
		bio: 'Fitness enthusiast turning goals into reality!',
	};

	// Filter challenges that the user is participating in
	const userChallenges = challenges.filter(
		challenge =>
			challenge.creator?.id === user.id ||
			challenge.participantList?.some((p: any) => p.userId === user.id)
	);

	return (
		<VStack spacing={8} align="stretch">
			<Card p={6}>
				<HStack
					spacing={6}
					align={{ base: 'center', md: 'flex-start' }}
					flexDir={{ base: 'column', md: 'row' }}
				>
					<Avatar size="2xl" name={userProfile.username} src={userProfile.avatarUrl} />
					<VStack align={{ base: 'center', md: 'flex-start' }} flex="1">
						<Heading as="h2" size="lg">
							{userProfile.username}
						</Heading>
						<Text color="gray.600">{user.email}</Text>
						<Text color="gray.700" maxW="lg" textAlign={{ base: 'center', md: 'left' }}>
							{userProfile.bio || 'Fitness enthusiast turning goals into reality!'}
						</Text>
						{profile && (
							<VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
								<Text fontSize="sm" color="gray.500">
									Teams Created: {profile.createdTeamsCount || 0} | Challenges Created:{' '}
									{profile.createdChallengesCount || 0}
								</Text>
								<Text fontSize="sm" color="gray.500">
									Team Memberships: {profile.teamMembershipsCount || 0} | Activities Logged:{' '}
									{profile.activitiesCount || 0}
								</Text>
							</VStack>
						)}
					</VStack>
					<Button colorScheme="orange" variant="outline" onClick={onEditOpen}>
						Edit Profile
					</Button>
				</HStack>
			</Card>

			<Box>
				<Heading as="h3" size="lg" mb={6}>
					Your Challenges
				</Heading>
				{challengesLoading ? (
					<Center>
						<Spinner size="lg" />
					</Center>
				) : challengesError ? (
					<Alert status="error">
						<AlertIcon />
						{challengesError?.message}
					</Alert>
				) : userChallenges.length === 0 ? (
					<Text color="gray.500" textAlign="center" py={8}>
						You haven't joined any challenges yet. Explore the challenges page to get started!
					</Text>
				) : (
					<Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
						{userChallenges.map(challenge => (
							<ChallengeCard
								key={challenge.id}
								challenge={challenge}
								onSelect={() => navigate(`/challenges/${challenge.id}`)}
							/>
						))}
					</Grid>
				)}
			</Box>

			{/* Edit Profile Modal */}
			<EditProfileModal
				isOpen={isEditOpen}
				onClose={onEditClose}
				profile={userProfile}
				onProfileUpdate={handleProfileUpdate}
			/>
		</VStack>
	);
};
export default ProfilePage;
