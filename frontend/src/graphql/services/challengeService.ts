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

    // Get all public challenges
    static async getChallenges(isPublic?: boolean) {
        try {
            let query = supabase
                .from('Challenge')
                .select('*');

            if (isPublic !== undefined) {
                query = query.eq('isPublic', isPublic);
            }

            const { data: challenges, error } = await query;

        if (error) {
            this.handleError(error, 'getChallenges');
        }

        // Get creators and participant counts separately
        const challengesWithDetails = await Promise.all(
            (challenges || []).map(async (challenge: any) => {
                // Get creator info
                const { data: creator } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .eq('id', challenge.creatorId)
                    .single();

                // Get participant count
                const { count } = await supabase
                    .from('ChallengeParticipant')
                    .select('*', { count: 'exact', head: true })
                    .eq('challengeId', challenge.id);

                    return {
                    ...challenge,
                    creator: creator ? {
                        ...creator,
                        avatarUrl: creator.avatar_url // Map database column to frontend expectation
                    } : null,
                    participants: count || 0,
                    milestones: [], // Default empty array for frontend compatibility
                    progress: 0 // Default progress for frontend compatibility
                };
            })
        );

        return challengesWithDetails;
        } catch (error) {
            this.handleError(error, 'getChallenges');
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

            return {
                ...data,
                creator: creator ? {
                    ...creator,
                    avatarUrl: creator.avatar_url // Map database column to frontend expectation
                } : null,
                participantCount: participants?.length || 0,
                participantList,
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

                    return {
                        ...challenge,
                        creator,
                        participants: count || 0
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
}
