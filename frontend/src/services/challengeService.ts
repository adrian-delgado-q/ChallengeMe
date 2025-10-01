import { supabase } from '../supabase/client';
import { authService } from './optimizedAuthService';
import { generateUUID } from '../utils/uuid';
import { ensureUserProfile } from '../utils/profileUtils';
import { handleAuthError } from '../utils/authUtils';

// Types for challenge operations
export interface ChallengeInput {
	title: string;
	description?: string;
	instructions?: string; // Detailed instructions for the challenge
	imageUrl?: string; // Challenge image for cards and detail pages
	activityTypes?: string[]; // Array of supported activity types for mixed challenges
	challengeType: 'INDIVIDUAL' | 'TEAM';
	maxParticipants?: number;
	maxTeamSize?: number; // For TEAM challenges: max members per team
	startDate: string; // ISO date string
	endDate: string; // ISO date string
	isPublic?: boolean;
	accessCode?: string; // Optional access code for private challenges
	milestones?: Array<{
		name: string;
		value: number;
		activityTypeId: string;
		activityType?: any; // ActivityType object for UI display
	}>; // Enhanced milestones support with activity type
}

export interface ChallengeParticipantInput {
	challengeId: string;
	userId?: string;
	teamId?: string;
}

// Challenge data service

export class ChallengeService {
	// Enhanced error handling helper
	private static handleError(error: any, operation: string) {
		console.error(`ChallengeService.${operation} error:`, error);

		// Handle authentication errors with better messaging
		if (
			error?.message?.toLowerCase().includes('auth') ||
			error?.status === 401 ||
			error?.message?.toLowerCase().includes('not authenticated') ||
			error?.message?.toLowerCase().includes('permission denied')
		) {
			handleAuthError(error, operation);
		}

		// For other errors, re-throw with context
		const enhancedError = new Error(error.message || `Failed to ${operation}`);
		(enhancedError as any).originalError = error;
		throw enhancedError;
	} // Get all public challenges with pagination support
	static async getChallenges(options?: {
		isPublic?: boolean;
		page?: number;
		limit?: number;
		search?: string;
		activityType?: string;
		challengeType?: string;
	}) {
		try {
			const { isPublic, page = 1, limit = 12, search, challengeType } = options || {};

			// Calculate offset for pagination
			const offset = (page - 1) * limit;

			// Build the main query with pagination from the view
			let query = supabase
				.from('challenge_details_view')
				.select('*', { count: 'exact' })
				.order('createdAt', { ascending: false });

			// Apply filters
			if (isPublic !== undefined) {
				query = query.eq('isPublic', isPublic);
			}

			if (search) {
				query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
			}

			if (challengeType && challengeType !== 'all') {
				query = query.eq('challengeType', challengeType.toUpperCase());
			}

			// Apply pagination
			query = query.range(offset, offset + limit - 1);

			const { data: challenges, error, count: totalCount } = await query;

			if (error) {
				this.handleError(error, 'getChallenges');
				return { challenges: [], totalCount: 0 };
			}

			if (!challenges || challenges.length === 0) {
				return {
					challenges: [],
					totalCount: totalCount || 0,
					totalPages: Math.ceil((totalCount || 0) / limit),
					currentPage: page,
					itemsPerPage: limit,
				};
			}

			// The view already provides creator and participant count, so we just need to get the challenge IDs.
			const challengeIds = challenges.map(c => c.id);

			// Get current user for participation checks
			const loggedInUser = await authService.getCurrentUser();

			// If user is logged in, batch fetch their participation data
			let myParticipations: any[] = [];
			let myTeamMemberships: any[] = [];

			if (loggedInUser) {
				// Batch fetch current user's individual participations
				const { data: userParticipations } = await supabase
					.from('ChallengeParticipant')
					.select('id, challengeId, teamId')
					.eq('userId', loggedInUser.id)
					.in('challengeId', challengeIds);

				myParticipations = userParticipations || [];

				// Batch fetch all team participations for these challenges
				const { data: allTeamParticipations } = await supabase
					.from('ChallengeParticipant')
					.select(
						`
						id,
						challengeId,
						teamId,
						Team (
							id,
							name,
							avatarUrl
						)
					`
					)
					.in('challengeId', challengeIds)
					.not('teamId', 'is', null);

				// Get all unique team IDs from participating teams
				const participatingTeamIds = [
					...new Set((allTeamParticipations || []).map(p => p.teamId).filter(Boolean)),
				];

				if (participatingTeamIds.length > 0) {
					// Batch fetch user's memberships in all participating teams
					const { data: teamMemberships } = await supabase
						.from('TeamMembership')
						.select('teamId, userId')
						.in('teamId', participatingTeamIds);

					myTeamMemberships = (teamMemberships || []).filter(m => m.userId === loggedInUser.id);

					// Add team participation info to myParticipations
					for (const teamParticipation of allTeamParticipations || []) {
						const isUserInTeam = myTeamMemberships.some(m => m.teamId === teamParticipation.teamId);
						if (isUserInTeam) {
							myParticipations.push({
								id: teamParticipation.id,
								challengeId: teamParticipation.challengeId,
								teamId: teamParticipation.teamId,
								team: Array.isArray(teamParticipation.Team)
									? teamParticipation.Team[0]
									: teamParticipation.Team,
								participationType: 'team',
							});
						}
					}
				}
			}

			// Batch fetch all milestones at once
			const { data: allMilestones } = await supabase
				.from('Milestone')
				.select('challengeId, name, targetValue, order')
				.in('challengeId', challengeIds)
				.order('order', { ascending: true });

			// Batch fetch all activity types for challenges
			const { data: allChallengeActivityTypes } = await supabase
				.from('ChallengeActivityType')
				.select('challengeId, activityTypeId')
				.in('challengeId', challengeIds);

			// Create lookup maps for efficient data access
			const milestonesMap = new Map();
			(allMilestones || []).forEach(milestone => {
				if (!milestonesMap.has(milestone.challengeId)) {
					milestonesMap.set(milestone.challengeId, []);
				}
				milestonesMap.get(milestone.challengeId).push({
					name: milestone.name,
					value: milestone.targetValue,
				});
			});

			// Create activity types lookup map
			const activityTypesMap = new Map();
			(allChallengeActivityTypes || []).forEach(challengeActivityType => {
				if (!activityTypesMap.has(challengeActivityType.challengeId)) {
					activityTypesMap.set(challengeActivityType.challengeId, []);
				}
				activityTypesMap
					.get(challengeActivityType.challengeId)
					.push(challengeActivityType.activityTypeId);
			});

			// Create participation lookup map
			const participationMap = new Map();
			myParticipations.forEach(participation => {
				participationMap.set(participation.challengeId, {
					isParticipating: true,
					participantId: participation.id,
					participationType: participation.teamId ? 'team' : 'individual',
					team: participation.team || null,
				});
			});

			// Get current user for progress calculation (reuse the one we already fetched)
			const currentUser = loggedInUser;

			// Batch fetch user progress if user is authenticated
			const userProgressMap = new Map();
			if (currentUser) {
				const { data: userParticipants } = await supabase
					.from('ChallengeParticipant')
					.select('id, challengeId')
					.eq('userId', currentUser.id)
					.in('challengeId', challengeIds);

				if (userParticipants && userParticipants.length > 0) {
					const participantIds = userParticipants.map(p => p.id);
					const { data: userActivities } = await supabase
						.from('Activity')
						.select('participantId')
						.in('participantId', participantIds);

					// Count activities per participant/challenge
					const activityCountMap = new Map();
					(userActivities || []).forEach(activity => {
						const count = activityCountMap.get(activity.participantId) || 0;
						activityCountMap.set(activity.participantId, count + 1);
					});

					// Map back to challenges
					userParticipants.forEach(participant => {
						const activityCount = activityCountMap.get(participant.id) || 0;
						userProgressMap.set(participant.challengeId, activityCount);
					});
				}
			}

			// Now process all challenges with pre-fetched data
			const challengesWithDetails = challenges.map((challenge: any) => {
				const creator = {
					id: challenge.creatorId,
					username: challenge.creator_username,
					avatarUrl: challenge.creator_avatar_url,
				};
				const participantCount = challenge.participant_count || 0;
				const milestones = milestonesMap.get(challenge.id) || [];
				const activityTypes = activityTypesMap.get(challenge.id) || [];
				const userProgress = userProgressMap.get(challenge.id) || 0;
				const activityType = this.generateSampleActivityType(challenge.title);
				const participation = participationMap.get(challenge.id) || {
					isParticipating: false,
					participantId: null,
					participationType: null,
					team: null,
				};

				return {
					...challenge,
					challengeType: challenge.challengeType?.toLowerCase() as 'individual' | 'team',
					creator,
					participants: participantCount,
					milestones,
					activityTypes, // Add the activity types array
					progress: userProgress,
					type: activityType,
					// Add participation data to each challenge
					participation,
				};
			});

			return {
				challenges: challengesWithDetails,
				totalCount: totalCount || 0,
				totalPages: Math.ceil((totalCount || 0) / limit),
				currentPage: page,
				itemsPerPage: limit,
			};
		} catch (error) {
			this.handleError(error, 'getChallenges');
			return { challenges: [], totalCount: 0 };
		}
	}

	// Get challenge by ID with full details
	static async getChallengeById(id: string) {
		try {
			const { data, error } = await supabase
				.from('challenge_details_view')
				.select('*')
				.eq('id', id)
				.single();
			if (error) {
				if (error.code === 'PGRST116') {
					// Row not found error - might be a newly created challenge not yet available
					throw new Error(
						'Challenge not found. If you just created this challenge, please try refreshing in a moment.'
					);
				}
				throw error;
			}
			if (!data) throw new Error('Challenge not found');

			// Get participants
			const { data: participants, error: participantsError } = await supabase
				.from('ChallengeParticipant')
				.select('id, joinedAt, userId, teamId')
				.eq('challengeId', id);

			if (participantsError) throw participantsError;

			// Get user and team info for participants
			const participantList = await Promise.all(
				(participants || []).map(async (participant: any) => {
					const result: any = { ...participant };

					if (participant.userId) {
						const { data: user } = await supabase
							.from('profiles')
							.select('id, username, avatar_url')
							.eq('id', participant.userId)
							.single();
						result.user = user
							? {
									...user,
									avatarUrl: user.avatar_url, // Map database column to frontend expectation
								}
							: null;
					}

					if (participant.teamId) {
						const { data: team } = await supabase
							.from('Team')
							.select('id, name, avatarUrl:avatar_url')
							.eq('id', participant.teamId)
							.single();
						result.team = team;
					}

					return result;
				})
			);

			// Get real milestones from database with activity type information
			const { data: milestones } = await supabase
				.from('Milestone')
				.select(
					`
                    *,
                    activityType:ActivityType(id, name, category, unit, unitLabel, description)
                `
				)
				.eq('challengeId', id)
				.order('order', { ascending: true });

			// Get supported activity types for this challenge
			const { data: challengeActivityTypes } = await supabase
				.from('ChallengeActivityType')
				.select(
					`
                    activityTypeId,
                    activityType:ActivityType(id, name, category, unit, unitLabel, description)
                `
				)
				.eq('challengeId', id);

			// Extract activity type IDs and full activity type objects
			const activityTypes = (challengeActivityTypes || []).map(cat => cat.activityTypeId);
			const activityTypeDetails = (challengeActivityTypes || []).map(cat => cat.activityType);

			// Convert database milestones to frontend format
			const formattedMilestones = (milestones || []).map((milestone: any) => ({
				name: milestone.name,
				value: milestone.targetValue,
				activityTypeId: milestone.activityTypeId,
				activityType: milestone.activityType,
			}));

			// Generate activity type from challenge title
			const activityType = this.generateSampleActivityType(data.title);

			// Calculate actual progress for current user by activity type
			const userProgress = await this.calculateUserProgress(id);
			const progressByActivityType = await this.calculateUserProgressByActivityType(id);

			return {
				...data,
				challengeType: data.challengeType?.toLowerCase() as 'individual' | 'team', // Convert to lowercase
				creator: {
					id: data.creatorId,
					username: data.creator_username,
					avatarUrl: data.creator_avatar_url,
				},
				participantCount: data.participant_count || 0,
				participantList,
				milestones: formattedMilestones,
				activityTypes, // Array of activity type IDs
				activityTypeDetails, // Array of full activity type objects
				progress: userProgress,
				progressByActivityType,
				type: activityType,
				activityFeed: [], // We'll load this separately if needed
			};
		} catch (error) {
			this.handleError(error, 'getChallengeById');
		}
	}

	// Create a new challenge
	static async createChallenge(challengeData: ChallengeInput) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Ensure user profile exists before creating challenge
			await ensureUserProfile();

			// Generate UUID for the challenge
			const challengeId = generateUUID();

			const { data, error } = await supabase
				.from('Challenge')
				.insert({
					id: challengeId, // Explicitly provide the UUID
					creatorId: user.id,
					title: challengeData.title,
					description: challengeData.description || null,
					imageUrl: challengeData.imageUrl || null,
					challengeType: challengeData.challengeType,
					maxParticipants: challengeData.maxParticipants || null,
					maxTeamSize: challengeData.maxTeamSize || null,
					startDate: challengeData.startDate,
					endDate: challengeData.endDate,
					isPublic: challengeData.isPublic ?? true,
					accessCode: challengeData.accessCode || null, // Add access code support
				})
				.select()
				.single();

			if (error) throw error;

			// Create ChallengeActivityType relationships if activityTypes provided
			if (challengeData.activityTypes && challengeData.activityTypes.length > 0) {
				const challengeActivityTypes = challengeData.activityTypes.map(activityTypeId => ({
					id: generateUUID(),
					challengeId: challengeId,
					activityTypeId: activityTypeId,
				}));

				const { error: activityTypeError } = await supabase
					.from('ChallengeActivityType')
					.insert(challengeActivityTypes);

				if (activityTypeError) {
					console.error('Failed to create challenge activity types:', activityTypeError);
					// Don't fail the whole operation, just log the error
				}
			}

			// Create milestones if provided
			if (challengeData.milestones && challengeData.milestones.length > 0) {
				const milestonesToCreate = challengeData.milestones
					.filter(m => m.name && m.value && m.activityTypeId) // Only include valid milestones with activity type
					.map((milestone, index) => ({
						id: generateUUID(),
						challengeId: challengeId,
						activityTypeId: milestone.activityTypeId, // Use the new activityTypeId field
						name: milestone.name,
						description: `Achieve ${milestone.value} ${milestone.activityType?.unitLabel || 'units'} in this challenge`,
						targetValue: milestone.value,
						order: index + 1,
					}));

				if (milestonesToCreate.length > 0) {
					const { error: milestoneError } = await supabase.from('Milestone').insert(milestonesToCreate);

					if (milestoneError) {
						console.error('Failed to create milestones:', milestoneError);
						// Don't fail the whole operation, just log the error
					}
				}
			}

			return data;
		} catch (error) {
			this.handleError(error, 'createChallenge');
		}
	}

	// Update challenge
	static async updateChallenge(id: string, challengeData: Partial<ChallengeInput>) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Separate activity types and milestones from main challenge data
			const { activityTypes, milestones, ...mainChallengeData } = challengeData;

			// Remove undefined values from main challenge data
			const updateData = Object.fromEntries(
				Object.entries(mainChallengeData).filter(([, value]) => value !== undefined)
			);

			// Update the main challenge record
			const { data, error } = await supabase
				.from('Challenge')
				.update(updateData)
				.eq('id', id)
				.eq('creatorId', user.id) // Ensure user owns the challenge
				.select()
				.single();

			if (error) throw error;

			// Update activity types if provided
			if (activityTypes !== undefined) {
				// First, delete existing activity type relationships
				const { error: deleteError } = await supabase
					.from('ChallengeActivityType')
					.delete()
					.eq('challengeId', id);

				if (deleteError) {
					console.error('Failed to delete existing activity types:', deleteError);
				}

				// Then, create new activity type relationships
				if (activityTypes.length > 0) {
					const challengeActivityTypes = activityTypes.map(activityTypeId => ({
						id: generateUUID(),
						challengeId: id,
						activityTypeId: activityTypeId,
					}));

					const { error: activityTypeError } = await supabase
						.from('ChallengeActivityType')
						.insert(challengeActivityTypes);

					if (activityTypeError) {
						console.error('Failed to create new activity types:', activityTypeError);
					}
				}
			}

			// Update milestones if provided
			if (milestones !== undefined) {
				// First, delete existing milestones
				const { error: deleteMilestonesError } = await supabase
					.from('Milestone')
					.delete()
					.eq('challengeId', id);

				if (deleteMilestonesError) {
					console.error('Failed to delete existing milestones:', deleteMilestonesError);
				}

				// Then, create new milestones
				if (milestones.length > 0) {
					const milestonesToCreate = milestones
						.filter(m => m.name && m.value && m.activityTypeId)
						.map((milestone, index) => ({
							id: generateUUID(),
							challengeId: id,
							activityTypeId: milestone.activityTypeId,
							name: milestone.name,
							description: `Achieve ${milestone.value} ${milestone.activityType?.unitLabel || 'units'} in this challenge`,
							targetValue: milestone.value,
							order: index + 1,
						}));

					if (milestonesToCreate.length > 0) {
						const { error: milestoneError } = await supabase.from('Milestone').insert(milestonesToCreate);

						if (milestoneError) {
							console.error('Failed to create new milestones:', milestoneError);
						}
					}
				}
			}

			return data;
		} catch (error) {
			this.handleError(error, 'updateChallenge');
		}
	}

	// Delete challenge
	static async deleteChallenge(id: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			const { data, error } = await supabase
				.from('Challenge')
				.delete()
				.eq('id', id)
				.eq('creatorId', user.id) // Ensure user owns the challenge
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'deleteChallenge');
		}
	}

	// === CHALLENGE MANAGEMENT METHODS ===

	// Update challenge status (close/reopen/cancel)
	static async updateChallengeStatus(id: string, status: 'ACTIVE' | 'CLOSED' | 'CANCELLED') {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			const { data, error } = await supabase
				.from('Challenge')
				.update({ status })
				.eq('id', id)
				.eq('creatorId', user.id) // Ensure user owns the challenge
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'updateChallengeStatus');
		}
	}

	// Get challenges created by current user with management details
	static async getMyCreatedChallenges() {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			const { data: challenges, error } = await supabase
				.from('Challenge')
				.select('*')
				.eq('creatorId', user.id)
				.order('createdAt', { ascending: false });

			if (error) throw error;

			// Get detailed participant information for each challenge
			const challengesWithDetails = await Promise.all(
				(challenges || []).map(async (challenge: any) => {
					// Get participants with user/team info
					const { data: participants } = await supabase
						.from('ChallengeParticipant')
						.select(
							`
                            id,
                            joinedAt,
                            userId,
                            teamId,
                            user:profiles(id, username, avatarUrl:avatar_url),
                            team:Team(id, name, avatarUrl:avatar_url)
                        `
						)
						.eq('challengeId', challenge.id);

					// Get participant count
					const { count: participantCount } = await supabase
						.from('ChallengeParticipant')
						.select('*', { count: 'exact', head: true })
						.eq('challengeId', challenge.id);

					// Get recent activities count
					const { count: recentActivitiesCount } = await supabase
						.from('Activity')
						.select('*', { count: 'exact', head: true })
						.eq('challengeId', challenge.id)
						.gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Last 7 days

					// Get milestones
					const { data: milestones } = await supabase
						.from('Milestone')
						.select('*')
						.eq('challengeId', challenge.id)
						.order('order', { ascending: true });

					return {
						...challenge,
						challengeType: challenge.challengeType?.toLowerCase() as 'individual' | 'team',
						participantCount: participantCount || 0,
						participantList: participants || [],
						recentActivitiesCount:
							typeof recentActivitiesCount === 'number'
								? recentActivitiesCount
								: (recentActivitiesCount as any)?.count || 0,
						milestones: (milestones || []).map((m: any) => ({
							name: m.name,
							value: m.targetValue,
						})),
					};
				})
			);

			return challengesWithDetails;
		} catch (error) {
			this.handleError(error, 'getMyCreatedChallenges');
		}
	}

	// Get challenge analytics for creators
	static async getChallengeAnalytics(challengeId: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Verify user owns the challenge
			const { data: challenge, error: challengeError } = await supabase
				.from('Challenge')
				.select('id, title, createdAt, challengeType')
				.eq('id', challengeId)
				.eq('creatorId', user.id)
				.single();

			if (challengeError || !challenge) throw new Error('Challenge not found or access denied');

			// Get participant statistics
			const { data: participants, count: totalParticipants } = await supabase
				.from('ChallengeParticipant')
				.select('id, joinedAt, userId, teamId', { count: 'exact' })
				.eq('challengeId', challengeId);

			// Get activity statistics
			const { count: totalActivities } = await supabase
				.from('Activity')
				.select('*', { count: 'exact', head: true })
				.eq('challengeId', challengeId);

			// Get activities by day for the last 30 days
			const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
				.toISOString()
				.split('T')[0];
			const { data: recentActivities } = await supabase
				.from('Activity')
				.select('date')
				.eq('challengeId', challengeId)
				.gte('date', thirtyDaysAgo);

			// Group activities by date
			const activitiesByDate = (recentActivities || []).reduce((acc: any, activity: any) => {
				const date = activity.date;
				acc[date] = (acc[date] || 0) + 1;
				return acc;
			}, {});

			// Get participant join dates
			const participantsByDate = (participants || []).reduce((acc: any, participant: any) => {
				const date = participant.joinedAt.split('T')[0];
				acc[date] = (acc[date] || 0) + 1;
				return acc;
			}, {});

			return {
				challenge,
				totalParticipants: totalParticipants || 0,
				totalActivities: totalActivities || 0,
				activitiesByDate,
				participantsByDate,
				averageActivitiesPerParticipant: totalParticipants
					? ((totalActivities || 0) / totalParticipants).toFixed(1)
					: '0',
			};
		} catch (error) {
			this.handleError(error, 'getChallengeAnalytics');
		}
	}

	// Remove participant from challenge (for challenge creators)
	static async removeParticipant(challengeId: string, participantId: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Verify user owns the challenge
			const { data: challenge } = await supabase
				.from('Challenge')
				.select('id')
				.eq('id', challengeId)
				.eq('creatorId', user.id)
				.single();

			if (!challenge) throw new Error('Challenge not found or access denied');

			const { data, error } = await supabase
				.from('ChallengeParticipant')
				.delete()
				.eq('id', participantId)
				.eq('challengeId', challengeId)
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'removeParticipant');
		}
	}

	// === END CHALLENGE MANAGEMENT METHODS ===

	// Join a challenge (individual)
	static async joinChallengeAsIndividual(challengeId: string, accessCode?: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Ensure user profile exists before joining challenge
			await ensureUserProfile();

			// Get challenge details to check privacy, access code, and creator
			const { data: challenge, error: challengeError } = await supabase
				.from('Challenge')
				.select('isPublic, accessCode, title, creatorId')
				.eq('id', challengeId)
				.single();

			if (challengeError) throw challengeError;
			if (!challenge) throw new Error('Challenge not found');

			// Check if current user is the creator
			const isCreator = challenge.creatorId === user.id;

			// Validate access for private challenges (skip validation if user is the creator)
			if (!challenge.isPublic && !isCreator) {
				if (!challenge.accessCode) {
					throw new Error('This private challenge cannot be joined');
				}
				if (!accessCode) {
					throw new Error('Access code is required to join this private challenge');
				}
				if (accessCode !== challenge.accessCode) {
					throw new Error('Invalid access code');
				}
			} // Generate UUID for the participant
			const participantId = generateUUID();

			const { data, error } = await supabase
				.from('ChallengeParticipant')
				.insert({
					id: participantId, // Explicitly provide the UUID
					challengeId,
					userId: user.id,
					teamId: null,
				})
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'joinChallengeAsIndividual');
		}
	}

	// Join a challenge as a team
	static async joinChallengeAsTeam(challengeId: string, teamId: string, accessCode?: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Ensure user profile exists before joining challenge
			await ensureUserProfile();

			// Get challenge details to check maxTeamSize constraint, access code, and creator
			const { data: challenge, error: challengeError } = await supabase
				.from('Challenge')
				.select('maxTeamSize, challengeType, isPublic, accessCode, title, creatorId')
				.eq('id', challengeId)
				.single();

			if (challengeError) throw challengeError;
			if (!challenge) throw new Error('Challenge not found');

			// Check if current user is the creator
			const isCreator = challenge.creatorId === user.id;

			// Validate access for private challenges (skip validation if user is the creator)
			if (!challenge.isPublic && !isCreator) {
				if (!challenge.accessCode) {
					throw new Error('This private challenge cannot be joined');
				}
				if (!accessCode) {
					throw new Error('Access code is required to join this private challenge');
				}
				if (accessCode !== challenge.accessCode) {
					throw new Error('Invalid access code');
				}
			} // Validate that this is a team challenge
			if (challenge.challengeType !== 'TEAM') {
				throw new Error('This challenge only accepts individual participants');
			}

			// If there's a maxTeamSize constraint, validate team size
			if (challenge.maxTeamSize) {
				const { data: team, error: teamError } = await supabase
					.from('Team')
					.select('id, name')
					.eq('id', teamId)
					.single();

				if (teamError) throw teamError;
				if (!team) throw new Error('Team not found');

				// Get team member count
				const { count: memberCount, error: countError } = await supabase
					.from('TeamMembership')
					.select('*', { count: 'exact', head: true })
					.eq('teamId', teamId);

				if (countError) throw countError;

				// Check if team size exceeds challenge limit
				if (memberCount && memberCount > challenge.maxTeamSize) {
					throw new Error(
						`Team has ${memberCount} members, but this challenge has a maximum team size of ${challenge.maxTeamSize} members`
					);
				}
			}

			// Verify user is a member of the team they're trying to join with
			const { data: membership, error: membershipError } = await supabase
				.from('TeamMembership')
				.select('id')
				.eq('teamId', teamId)
				.eq('userId', user.id)
				.maybeSingle();

			if (membershipError) throw membershipError;
			if (!membership) {
				throw new Error('You must be a member of the team to join a challenge with it');
			}

			// Check if team is already participating in this challenge
			const { data: existingParticipant, error: existingError } = await supabase
				.from('ChallengeParticipant')
				.select('id')
				.eq('challengeId', challengeId)
				.eq('teamId', teamId)
				.maybeSingle();

			if (existingError) throw existingError;
			if (existingParticipant) {
				throw new Error('This team is already participating in this challenge');
			}

			// Generate UUID for the participant
			const participantId = generateUUID();

			const { data, error } = await supabase
				.from('ChallengeParticipant')
				.insert({
					id: participantId, // Explicitly provide the UUID
					challengeId,
					userId: null,
					teamId,
				})
				.select()
				.single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'joinChallengeAsTeam');
		}
	}

	// Leave a challenge
	static async leaveChallenge(challengeId: string, teamId?: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			let query = supabase.from('ChallengeParticipant').delete().eq('challengeId', challengeId);

			if (teamId) {
				query = query.eq('teamId', teamId);
			} else {
				query = query.eq('userId', user.id);
			}

			const { data, error } = await query.select().single();

			if (error) throw error;
			return data;
		} catch (error) {
			this.handleError(error, 'leaveChallenge');
		}
	}

	// Get challenges I'm participating in
	static async getMyChallenges() {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			const { data, error } = await supabase
				.from('ChallengeParticipant')
				.select('challengeId')
				.eq('userId', user.id);

			if (error) throw error;

			// Get challenge details for each participation
			const challengesWithDetails = await Promise.all(
				(data || []).map(async (participant: any) => {
					const { data: challenge } = await supabase
						.from('Challenge')
						.select('*')
						.eq('id', participant.challengeId)
						.single();

					// Get creator info
					const { data: creator } = await supabase
						.from('profiles')
						.select('id, username, avatarUrl:avatar_url')
						.eq('id', challenge?.creatorId)
						.single();

					// Get participant count
					const { count } = await supabase
						.from('ChallengeParticipant')
						.select('*', { count: 'exact', head: true })
						.eq('challengeId', challenge?.id);

					// Get real milestones from database
					const { data: milestones } = await supabase
						.from('Milestone')
						.select('*')
						.eq('challengeId', challenge?.id || '')
						.order('order', { ascending: true });

					// Convert database milestones to frontend format
					const formattedMilestones = (milestones || []).map((milestone: any) => ({
						name: milestone.name,
						value: milestone.targetValue,
					}));

					// Generate activity type from challenge title
					const activityType = this.generateSampleActivityType(challenge?.title || '');

					// Calculate actual progress for current user
					const userProgress = await this.calculateUserProgress(challenge?.id || '');

					return {
						...challenge,
						challengeType: challenge?.challengeType?.toLowerCase() as 'individual' | 'team', // Convert to lowercase
						creator: creator
							? {
									...creator,
									avatarUrl: creator.avatarUrl, // Map the already properly named field
								}
							: null,
						participants: count || 0,
						milestones: formattedMilestones,
						progress: userProgress,
						type: activityType,
					};
				})
			);

			return challengesWithDetails;
		} catch (error) {
			this.handleError(error, 'getMyChallenges');
		}
	}

	// Get current user's participant ID for a specific challenge
	static async getMyParticipantId(challengeId: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Check for individual participation first
			const { data: individualParticipant, error: individualError } = await supabase
				.from('ChallengeParticipant')
				.select('id')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (individualError) throw individualError;

			if (individualParticipant) {
				return individualParticipant.id;
			}

			// Check for team participation
			const { data: teamParticipants, error: teamError } = await supabase
				.from('ChallengeParticipant')
				.select('id, teamId')
				.eq('challengeId', challengeId)
				.not('teamId', 'is', null);

			if (teamError) throw teamError;

			// Check if user is a member of any participating team
			for (const participant of teamParticipants || []) {
				const { data: membership } = await supabase
					.from('TeamMembership')
					.select('id')
					.eq('teamId', participant.teamId)
					.eq('userId', user.id)
					.maybeSingle();

				if (membership) {
					return participant.id;
				}
			}

			return null;
		} catch (error) {
			this.handleError(error, 'getMyParticipantId');
			return null;
		}
	}

	// Get current user's participation details for a challenge (including team info)
	// NOTE: This method is now deprecated in favor of batch participation data in getChallenges
	// Kept for backward compatibility with individual challenge pages
	static async getMyParticipationDetails(challengeId: string) {
		try {
			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Check for individual participation
			const { data: individualParticipant, error: individualError } = await supabase
				.from('ChallengeParticipant')
				.select('id, teamId')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (individualError) throw individualError;

			if (individualParticipant) {
				return {
					isParticipating: true,
					participantId: individualParticipant.id,
					participationType: 'individual' as const,
					team: null,
				};
			}

			// Check for team participation
			const { data: teamParticipants, error: teamError } = await supabase
				.from('ChallengeParticipant')
				.select(
					`
                    id,
                    teamId,
                    Team (
                        id,
                        name,
                        avatarUrl
                    )
                `
				)
				.eq('challengeId', challengeId)
				.not('teamId', 'is', null);

			if (teamError) throw teamError;

			// Check if user is a member of any participating team
			for (const participant of teamParticipants || []) {
				const { data: membership } = await supabase
					.from('TeamMembership')
					.select('id')
					.eq('teamId', participant.teamId)
					.eq('userId', user.id)
					.maybeSingle();

				if (membership) {
					return {
						isParticipating: true,
						participantId: participant.id,
						participationType: 'team' as const,
						team: Array.isArray(participant.Team) ? participant.Team[0] : participant.Team,
					};
				}
			}

			return {
				isParticipating: false,
				participantId: null,
				participationType: null,
				team: null,
			};
		} catch (error) {
			this.handleError(error, 'getMyParticipationDetails');
			return {
				isParticipating: false,
				participantId: null,
				participationType: null,
				team: null,
			};
		}
	}

	// Helper method to calculate user progress based on logged activities
	private static async calculateUserProgress(challengeId: string): Promise<number> {
		try {
			const user = await authService.getCurrentUser();
			if (!user) return 0;

			// Get user's participant ID for this challenge
			const { data: participant } = await supabase
				.from('ChallengeParticipant')
				.select('id')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (!participant) return 0;

			// Count user's activities for this challenge
			const { count } = await supabase
				.from('Activity')
				.select('*', { count: 'exact', head: true })
				.eq('participantId', participant.id);

			return count || 0;
		} catch (error) {
			console.error('Error calculating user progress:', error);
			return 0;
		}
	}

	// Calculate user progress by activity type
	private static async calculateUserProgressByActivityType(
		challengeId: string
	): Promise<Record<string, number>> {
		try {
			const user = await authService.getCurrentUser();
			if (!user) return {};

			// Get user's participant ID for this challenge
			const { data: participant } = await supabase
				.from('ChallengeParticipant')
				.select('id')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (!participant) return {};

			// Get user's activities grouped by activity type
			const { data: activities } = await supabase
				.from('Activity')
				.select(
					`
                    value,
                    activityType:ActivityType(id, unit)
                `
				)
				.eq('participantId', participant.id);

			if (!activities) return {};

			// Sum values by activity type
			const progressByActivityType: Record<string, number> = {};

			activities.forEach((activity: any) => {
				const activityTypeId = activity.activityType?.id;
				if (activityTypeId) {
					if (!progressByActivityType[activityTypeId]) {
						progressByActivityType[activityTypeId] = 0;
					}
					progressByActivityType[activityTypeId] += activity.value || 0;
				}
			});

			return progressByActivityType;
		} catch (error) {
			console.error('Error calculating user progress by activity type:', error);
			return {};
		}
	}

	// Get challenge progress over time for the current user
	static async getChallengeProgressOverTime(challengeId: string): Promise<{
		progressData: Array<{
			date: string;
			totalValue: number;
			activityType: string;
			activityTypeName: string;
			unit: string;
			milestoneLevel: number;
		}>;
		milestones: Array<{
			name: string;
			targetValue: number;
			activityTypeId: string;
			order: number;
		}>;
	}> {
		try {
			const user = await authService.getCurrentUser();
			if (!user) return { progressData: [], milestones: [] };

			// Get user's participant ID for this challenge
			const { data: participant } = await supabase
				.from('ChallengeParticipant')
				.select('id')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (!participant) return { progressData: [], milestones: [] };

			// Get challenge supported activity types to filter relevant progress
			const { data: challengeActivityTypes } = await supabase
				.from('ChallengeActivityType')
				.select(
					`
                    activityTypeId,
                    activityType:ActivityType(
                        id,
                        name,
                        unit,
                        unitLabel
                    )
                `
				)
				.eq('challengeId', challengeId);

			if (!challengeActivityTypes || challengeActivityTypes.length === 0) {
				return { progressData: [], milestones: [] };
			}

			const supportedActivityTypeIds = challengeActivityTypes.map(cat => cat.activityTypeId);

			// Get progress data from challenge_progress table for this participant
			const { data: progressRecords } = await supabase
				.from('challenge_progress')
				.select(
					`
                    totalValue,
                    updatedAt,
                    activityTypeId,
                    activityType:ActivityType(
                        id,
                        name,
                        unit,
                        unitLabel
                    )
                `
				)
				.eq('challengeId', challengeId)
				.eq('participantId', participant.id)
				.in('activityTypeId', supportedActivityTypeIds)
				.order('updatedAt', { ascending: true });

			// Get milestones for this challenge
			const { data: milestones } = await supabase
				.from('Milestone')
				.select('name, targetValue, activityTypeId, order')
				.eq('challengeId', challengeId)
				.in('activityTypeId', supportedActivityTypeIds)
				.order('order', { ascending: true });

			// Transform progress data and calculate milestone levels
			const progressData = (progressRecords || []).map(record => {
				const milestoneLevel = this.calculateMilestoneLevel(
					record.totalValue,
					record.activityTypeId,
					milestones || []
				);

				return {
					date: new Date(record.updatedAt).toISOString().split('T')[0],
					totalValue: record.totalValue,
					activityType: record.activityTypeId,
					activityTypeName: (record.activityType as any)?.name || 'Unknown',
					unit: (record.activityType as any)?.unit || '',
					milestoneLevel,
				};
			});

			return {
				progressData,
				milestones: milestones || [],
			};
		} catch (error) {
			this.handleError(error, 'getChallengeProgressOverTime');
			return { progressData: [], milestones: [] };
		}
	}

	// Calculate which milestone level the user has reached for a specific activity type
	private static calculateMilestoneLevel(
		currentValue: number,
		activityTypeId: string,
		milestones: Array<{ targetValue: number; activityTypeId: string; order: number }>
	): number {
		const relevantMilestones = milestones
			.filter(m => m.activityTypeId === activityTypeId)
			.sort((a, b) => a.order - b.order);

		for (let i = relevantMilestones.length - 1; i >= 0; i--) {
			if (currentValue >= relevantMilestones[i].targetValue) {
				return i + 1; // Return 1-based milestone level
			}
		}

		return 0; // No milestone reached yet
	}

	// Helper method to generate sample activity type based on challenge title
	private static generateSampleActivityType(title: string): string {
		const titleLower = title.toLowerCase();

		if (titleLower.includes('run') || titleLower.includes('jog') || titleLower.includes('marathon')) {
			return 'running';
		} else if (titleLower.includes('walk') || titleLower.includes('step')) {
			return 'walking';
		} else if (titleLower.includes('bike') || titleLower.includes('cycle')) {
			return 'cycling';
		} else if (titleLower.includes('swim')) {
			return 'swimming';
		} else if (
			titleLower.includes('strength') ||
			titleLower.includes('lift') ||
			titleLower.includes('gym')
		) {
			return 'strength';
		} else if (titleLower.includes('yoga') || titleLower.includes('stretch')) {
			return 'yoga';
		} else if (titleLower.includes('cardio') || titleLower.includes('fitness')) {
			return 'cardio';
		} else {
			// Default to a random activity type
			const activityTypes = [
				'running',
				'walking',
				'cycling',
				'swimming',
				'strength',
				'yoga',
				'cardio',
			];
			return activityTypes[Math.floor(Math.random() * activityTypes.length)];
		}
	}
}
