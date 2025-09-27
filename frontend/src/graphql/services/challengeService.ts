import { supabase } from '../../supabase/client';
import { getCurrentUser } from '../../supabase/client';
import { generateUUID } from '../../utils/uuid';

// Types for challenge operations
export interface ChallengeInput {
    title: string;
    description?: string;
    activityTypes?: string[]; // Array of supported activity types for mixed challenges
    challengeType: 'INDIVIDUAL' | 'TEAM';
    maxParticipants?: number;
    maxTeamSize?: number; // For TEAM challenges: max members per team
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
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
        
        if (error.message?.includes('permission denied')) {
            throw new Error(
                `Database permission denied. This usually means:\n` +
                `1. Row Level Security (RLS) policies need to be set up\n` +
                `2. User authentication failed\n` +
                `3. Database connection issues\n\n` +
                `Please check AUTHENTICATION_FIX.md for solutions.\n\n` +
                `Original error: ${error.message}`
            );
        }
        
        if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
            throw new Error(
                `Database table not found. This means:\n` +
                `1. Database schema hasn't been created\n` +
                `2. Wrong database connection\n\n` +
                `Please run the schema creation scripts.\n\n` +
                `Original error: ${error.message}`
            );
        }
        
        throw new Error(error.message || `Failed to ${operation}`);
    }

    // Get all public challenges with pagination support
    static async getChallenges(options?: {
        isPublic?: boolean;
        page?: number;
        limit?: number;
        search?: string;
        activityType?: string;
        challengeType?: string;
    }) {
        try {
            const {
                isPublic,
                page = 1,
                limit = 12,
                search,
                challengeType
            } = options || {};

            // Calculate offset for pagination
            const offset = (page - 1) * limit;

            // Build the main query with pagination
            let query = supabase
                .from('Challenge')
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
                    itemsPerPage: limit
                };
            }

            // Extract all unique creator IDs and challenge IDs for batch fetching
            const creatorIds = [...new Set(challenges.map(c => c.creatorId))];
            const challengeIds = challenges.map(c => c.id);

            // Batch fetch all creators at once
            const { data: creators } = await supabase
                .from('profiles')
                .select('id, username, avatar_url')
                .in('id', creatorIds);

            // Batch fetch all participant counts at once
            const { data: allParticipants } = await supabase
                .from('ChallengeParticipant')
                .select('challengeId')
                .in('challengeId', challengeIds);

            // Batch fetch all milestones at once
            const { data: allMilestones } = await supabase
                .from('Milestone')
                .select('challengeId, name, targetValue, order')
                .in('challengeId', challengeIds)
                .order('order', { ascending: true });

            // Create lookup maps for efficient data access
            const creatorMap = new Map();
            (creators || []).forEach(creator => {
                creatorMap.set(creator.id, {
                    ...creator,
                    avatarUrl: creator.avatar_url
                });
            });

            const participantCountMap = new Map();
            (allParticipants || []).forEach(participant => {
                const count = participantCountMap.get(participant.challengeId) || 0;
                participantCountMap.set(participant.challengeId, count + 1);
            });

            const milestonesMap = new Map();
            (allMilestones || []).forEach(milestone => {
                if (!milestonesMap.has(milestone.challengeId)) {
                    milestonesMap.set(milestone.challengeId, []);
                }
                milestonesMap.get(milestone.challengeId).push({
                    name: milestone.name,
                    value: milestone.targetValue
                });
            });

            // Get current user for progress calculation (batch this too if needed)
            const currentUser = await getCurrentUser();

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
                const creator = creatorMap.get(challenge.creatorId) || null;
                const participantCount = participantCountMap.get(challenge.id) || 0;
                const milestones = milestonesMap.get(challenge.id) || [];
                const userProgress = userProgressMap.get(challenge.id) || 0;
                const activityType = this.generateSampleActivityType(challenge.title);

                return {
                    ...challenge,
                    challengeType: challenge.challengeType?.toLowerCase() as 'individual' | 'team',
                    creator,
                    participants: participantCount,
                    milestones,
                    progress: userProgress,
                    type: activityType
                };
            });

            return {
                challenges: challengesWithDetails,
                totalCount: totalCount || 0,
                totalPages: Math.ceil((totalCount || 0) / limit),
                currentPage: page,
                itemsPerPage: limit
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
                .from('Challenge')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) throw new Error('Challenge not found');

            // Get creator info
            const { data: creator } = await supabase
                .from('profiles')
                .select('id, username, avatar_url')
                .eq('id', data.creatorId)
                .single();

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
                        result.user = user ? {
                            ...user,
                            avatarUrl: user.avatar_url // Map database column to frontend expectation
                        } : null;
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
                .select(`
                    *,
                    activityType:ActivityType(id, name, category, unit, unitLabel, description)
                `)
                .eq('challengeId', id)
                .order('order', { ascending: true });

            // Get supported activity types for this challenge
            const { data: challengeActivityTypes } = await supabase
                .from('ChallengeActivityType')
                .select(`
                    activityTypeId,
                    activityType:ActivityType(id, name, category, unit, unitLabel, description)
                `)
                .eq('challengeId', id);

            // Extract activity type IDs and full activity type objects
            const activityTypes = (challengeActivityTypes || []).map(cat => cat.activityTypeId);
            const activityTypeDetails = (challengeActivityTypes || []).map(cat => cat.activityType);

            // Convert database milestones to frontend format
            const formattedMilestones = (milestones || []).map((milestone: any) => ({
                name: milestone.name,
                value: milestone.targetValue,
                activityTypeId: milestone.activityTypeId,
                activityType: milestone.activityType
            }));

            // Generate activity type from challenge title
            const activityType = this.generateSampleActivityType(data.title);
            
            // Calculate actual progress for current user by activity type
            const userProgress = await this.calculateUserProgress(id);
            const progressByActivityType = await this.calculateUserProgressByActivityType(id);

            return {
                ...data,
                challengeType: data.challengeType?.toLowerCase() as 'individual' | 'team', // Convert to lowercase
                creator: creator ? {
                    ...creator,
                    avatarUrl: creator.avatar_url // Map database column to frontend expectation
                } : null,
                participantCount: participants?.length || 0,
                participantList,
                milestones: formattedMilestones,
                activityTypes, // Array of activity type IDs
                activityTypeDetails, // Array of full activity type objects  
                progress: userProgress,
                progressByActivityType,
                type: activityType,
                activityFeed: [] // We'll load this separately if needed
            };
        } catch (error) {
            this.handleError(error, 'getChallengeById');
        }
    }

    // Create a new challenge
    static async createChallenge(challengeData: ChallengeInput) {
        try {
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Generate UUID for the challenge
            const challengeId = generateUUID();

            const { data, error } = await supabase
                .from('Challenge')
                .insert({
                    id: challengeId, // Explicitly provide the UUID
                    creatorId: user.id,
                    title: challengeData.title,
                    description: challengeData.description || null,
                    challengeType: challengeData.challengeType,
                    maxParticipants: challengeData.maxParticipants || null,
                    maxTeamSize: challengeData.maxTeamSize || null,
                    startDate: challengeData.startDate,
                    endDate: challengeData.endDate,
                    isPublic: challengeData.isPublic ?? true,
                    accessCode: challengeData.accessCode || null // Add access code support
                })
                .select()
                .single();

            if (error) throw error;

            // Create ChallengeActivityType relationships if activityTypes provided
            if (challengeData.activityTypes && challengeData.activityTypes.length > 0) {
                const challengeActivityTypes = challengeData.activityTypes.map(activityTypeId => ({
                    id: generateUUID(),
                    challengeId: challengeId,
                    activityTypeId: activityTypeId
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
                        order: index + 1
                    }));

                if (milestonesToCreate.length > 0) {
                    const { error: milestoneError } = await supabase
                        .from('Milestone')
                        .insert(milestonesToCreate);

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
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Remove undefined values
            const updateData = Object.fromEntries(
                Object.entries(challengeData).filter(([_, value]) => value !== undefined)
            );

            const { data, error } = await supabase
                .from('Challenge')
                .update(updateData)
                .eq('id', id)
                .eq('creatorId', user.id) // Ensure user owns the challenge
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            this.handleError(error, 'updateChallenge');
        }
    }

    // Delete challenge
    static async deleteChallenge(id: string) {
        try {
            const user = await getCurrentUser();
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
            const user = await getCurrentUser();
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
            const user = await getCurrentUser();
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
                        .select(`
                            id,
                            joinedAt,
                            userId,
                            teamId,
                            user:profiles(id, username, avatarUrl:avatar_url),
                            team:Team(id, name, avatarUrl:avatar_url)
                        `)
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
                        recentActivitiesCount: typeof recentActivitiesCount === 'number' ? recentActivitiesCount : (recentActivitiesCount as any)?.count || 0,
                        milestones: (milestones || []).map((m: any) => ({
                            name: m.name,
                            value: m.targetValue
                        }))
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
            const user = await getCurrentUser();
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
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
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
                averageActivitiesPerParticipant: totalParticipants ? ((totalActivities || 0) / totalParticipants).toFixed(1) : '0'
            };
        } catch (error) {
            this.handleError(error, 'getChallengeAnalytics');
        }
    }

    // Remove participant from challenge (for challenge creators)
    static async removeParticipant(challengeId: string, participantId: string) {
        try {
            const user = await getCurrentUser();
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
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Get challenge details to check privacy and access code
            const { data: challenge, error: challengeError } = await supabase
                .from('Challenge')
                .select('isPublic, accessCode, title')
                .eq('id', challengeId)
                .single();

            if (challengeError) throw challengeError;
            if (!challenge) throw new Error('Challenge not found');

            // Validate access for private challenges
            if (!challenge.isPublic) {
                if (!challenge.accessCode) {
                    throw new Error('This private challenge cannot be joined');
                }
                if (!accessCode) {
                    throw new Error('Access code is required to join this private challenge');
                }
                if (accessCode !== challenge.accessCode) {
                    throw new Error('Invalid access code');
                }
            }

            // First, ensure the user has a profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .maybeSingle();

            if (profileError) throw profileError;

            if (!profile) {
                // Create profile if it doesn't exist
                const { error: createProfileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        username: user.email?.split('@')[0] || 'user',
                        avatar_url: null
                    });

                if (createProfileError) throw createProfileError;
            }

            // Generate UUID for the participant
            const participantId = generateUUID();

            const { data, error } = await supabase
                .from('ChallengeParticipant')
                .insert({
                    id: participantId, // Explicitly provide the UUID
                    challengeId,
                    userId: user.id,
                    teamId: null
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
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Get challenge details to check maxTeamSize constraint and access code
            const { data: challenge, error: challengeError } = await supabase
                .from('Challenge')
                .select('maxTeamSize, challengeType, isPublic, accessCode, title')
                .eq('id', challengeId)
                .single();

            if (challengeError) throw challengeError;
            if (!challenge) throw new Error('Challenge not found');

            // Validate access for private challenges
            if (!challenge.isPublic) {
                if (!challenge.accessCode) {
                    throw new Error('This private challenge cannot be joined');
                }
                if (!accessCode) {
                    throw new Error('Access code is required to join this private challenge');
                }
                if (accessCode !== challenge.accessCode) {
                    throw new Error('Invalid access code');
                }
            }

            // Validate that this is a team challenge
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
                    throw new Error(`Team has ${memberCount} members, but this challenge has a maximum team size of ${challenge.maxTeamSize} members`);
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
                    teamId
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
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            let query = supabase
                .from('ChallengeParticipant')
                .delete()
                .eq('challengeId', challengeId);

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
            const user = await getCurrentUser();
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
                        value: milestone.targetValue
                    }));

                    // Generate activity type from challenge title
                    const activityType = this.generateSampleActivityType(challenge?.title || '');
                    
                    // Calculate actual progress for current user
                    const userProgress = await this.calculateUserProgress(challenge?.id || '');

                    return {
                        ...challenge,
                        challengeType: challenge?.challengeType?.toLowerCase() as 'individual' | 'team', // Convert to lowercase
                        creator: creator ? {
                            ...creator,
                            avatarUrl: creator.avatarUrl // Map the already properly named field
                        } : null,
                        participants: count || 0,
                        milestones: formattedMilestones,
                        progress: userProgress,
                        type: activityType
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
            const user = await getCurrentUser();
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
    static async getMyParticipationDetails(challengeId: string) {
        try {
            const user = await getCurrentUser();
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
                    team: null
                };
            }

            // Check for team participation
            const { data: teamParticipants, error: teamError } = await supabase
                .from('ChallengeParticipant')
                .select(`
                    id,
                    teamId,
                    Team (
                        id,
                        name,
                        avatarUrl
                    )
                `)
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
                        team: Array.isArray(participant.Team) ? participant.Team[0] : participant.Team
                    };
                }
            }

            return {
                isParticipating: false,
                participantId: null,
                participationType: null,
                team: null
            };
        } catch (error) {
            this.handleError(error, 'getMyParticipationDetails');
            return {
                isParticipating: false,
                participantId: null,
                participationType: null,
                team: null
            };
        }
    }

    // Helper method to calculate user progress based on logged activities
    private static async calculateUserProgress(challengeId: string): Promise<number> {
        try {
            const user = await getCurrentUser();
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
    private static async calculateUserProgressByActivityType(challengeId: string): Promise<Record<string, number>> {
        try {
            const user = await getCurrentUser();
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
                .select(`
                    value,
                    activityType:ActivityType(id, unit)
                `)
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
        } else if (titleLower.includes('strength') || titleLower.includes('lift') || titleLower.includes('gym')) {
            return 'strength';
        } else if (titleLower.includes('yoga') || titleLower.includes('stretch')) {
            return 'yoga';
        } else if (titleLower.includes('cardio') || titleLower.includes('fitness')) {
            return 'cardio';
        } else {
            // Default to a random activity type
            const activityTypes = ['running', 'walking', 'cycling', 'swimming', 'strength', 'yoga', 'cardio'];
            return activityTypes[Math.floor(Math.random() * activityTypes.length)];
        }
    }
}
