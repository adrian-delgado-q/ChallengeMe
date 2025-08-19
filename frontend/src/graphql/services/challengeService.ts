import { supabase } from '../../supabase/client';
import { getCurrentUser } from '../../supabase/client';

// Types for challenge operations
export interface ChallengeInput {
    title: string;
    description?: string;
    challengeType: 'INDIVIDUAL' | 'TEAM';
    maxParticipants?: number;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    isPublic?: boolean;
    milestones?: Array<{name: string, value: number}>; // Add milestones support
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
            let userProgressMap = new Map();
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
                            .select('id, name, avatarUrl')
                            .eq('id', participant.teamId)
                            .single();
                        result.team = team;
                    }

                    return result;
                })
            );

            // Get real milestones from database
            const { data: milestones } = await supabase
                .from('Milestone')
                .select('*')
                .eq('challengeId', id)
                .order('order', { ascending: true });

            // Convert database milestones to frontend format
            const formattedMilestones = (milestones || []).map((milestone: any) => ({
                name: milestone.name,
                value: milestone.targetValue
            }));

            // Generate activity type from challenge title
            const activityType = this.generateSampleActivityType(data.title);
            
            // Calculate actual progress for current user
            const userProgress = await this.calculateUserProgress(id);

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
                progress: userProgress,
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
            const challengeId = crypto.randomUUID();

            const { data, error } = await supabase
                .from('Challenge')
                .insert({
                    id: challengeId, // Explicitly provide the UUID
                    creatorId: user.id,
                    title: challengeData.title,
                    description: challengeData.description || null,
                    challengeType: challengeData.challengeType,
                    maxParticipants: challengeData.maxParticipants || null,
                    startDate: challengeData.startDate,
                    endDate: challengeData.endDate,
                    isPublic: challengeData.isPublic ?? true
                })
                .select()
                .single();

            if (error) throw error;

            // Create milestones if provided
            if (challengeData.milestones && challengeData.milestones.length > 0) {
                const milestonesToCreate = challengeData.milestones
                    .filter(m => m.name && m.value) // Only include valid milestones
                    .map((milestone, index) => ({
                        id: crypto.randomUUID(),
                        challengeId: challengeId,
                        name: milestone.name,
                        description: `Achieve ${milestone.value} activities in this challenge`,
                        targetValue: milestone.value,
                        valueType: 'activities',
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

    // Join a challenge (individual)
    static async joinChallengeAsIndividual(challengeId: string) {
        try {
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

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
                        avatarUrl: null
                    });

                if (createProfileError) throw createProfileError;
            }

            // Generate UUID for the participant
            const participantId = crypto.randomUUID();

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
    static async joinChallengeAsTeam(challengeId: string, teamId: string) {
        try {
            const user = await getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Generate UUID for the participant
            const participantId = crypto.randomUUID();

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
                        .select('id, username, avatarUrl')
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
                        creator,
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

            const { data, error } = await supabase
                .from('ChallengeParticipant')
                .select('id')
                .eq('challengeId', challengeId)
                .eq('userId', user.id)
                .maybeSingle();

            if (error) throw error;
            return data?.id || null;
        } catch (error) {
            this.handleError(error, 'getMyParticipantId');
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
