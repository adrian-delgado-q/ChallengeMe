import { supabase, getCurrentUser } from '../../supabase/client';

// Types for team operations
export interface TeamInput {
    name: string;
    description?: string;
    avatarUrl?: string;
    isPublic?: boolean;
}

export interface TeamMembershipInput {
    teamId: string;
    userId: string;
    role?: 'ADMIN' | 'MEMBER';
}

// Team data service
export class TeamService {
    // Get all public teams or teams I'm a member of
    static async getTeams(isPublic?: boolean) {
        let query = supabase
            .from('Team')
            .select('*');

        if (isPublic !== undefined) {
            query = query.eq('isPublic', isPublic);
        }

        const { data: teams, error } = await query;

        if (error) throw new Error(error.message);

        // Get creator info and member counts for each team
        const teamsWithDetails = await Promise.all(
            (teams || []).map(async (team: any) => {
                // Get creator info
                const { data: creator } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .eq('id', team.creatorId)
                    .single();

                // Get member count
                const { count } = await supabase
                    .from('TeamMembership')
                    .select('*', { count: 'exact', head: true })
                    .eq('teamId', team.id);

                return {
                    ...team,
                    creator: creator ? {
                        ...creator,
                        avatarUrl: creator.avatar_url // Map database column to frontend expectation
                    } : null,
                    memberCount: count || 0
                };
            })
        );

        return teamsWithDetails;
    }

    // Get teams I'm a member of
    static async getMyTeams() {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data: memberships, error } = await supabase
            .from('TeamMembership')
            .select('teamId')
            .eq('userId', user.id);

        if (error) throw new Error(error.message);

        // Get team details for each membership
        const teamsWithDetails = await Promise.all(
            (memberships || []).map(async (membership: any) => {
                const { data: team } = await supabase
                    .from('Team')
                    .select('*')
                    .eq('id', membership.teamId)
                    .single();

                // Get creator info
                const { data: creator } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .eq('id', team?.creatorId)
                    .single();

                // Get member count
                const { count } = await supabase
                    .from('TeamMembership')
                    .select('*', { count: 'exact', head: true })
                    .eq('teamId', team?.id);

                return {
                    ...team,
                    creator: creator ? {
                        ...creator,
                        avatarUrl: creator.avatar_url // Map database column to frontend expectation
                    } : null,
                    memberCount: count || 0
                };
            })
        );

        return teamsWithDetails;
    }

    // Get team by ID with full details including members
    static async getTeamById(id: string) {
        const { data, error } = await supabase
            .from('Team')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        if (!data) throw new Error('Team not found');

        // Get creator info
        const { data: creator } = await supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .eq('id', data.creatorId)
            .single();

        // Get team memberships
        const { data: memberships, error: membershipsError } = await supabase
            .from('TeamMembership')
            .select('id, role, joinedAt, userId')
            .eq('teamId', id);

        if (membershipsError) throw new Error(membershipsError.message);

        // Get user info for each membership
        const memberList = await Promise.all(
            (memberships || []).map(async (membership: any) => {
                const { data: user } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .eq('id', membership.userId)
                    .single();

                return {
                    ...membership,
                    user: user ? {
                        ...user,
                        avatarUrl: user.avatar_url // Map database column to frontend expectation
                    } : null
                };
            })
        );

        return {
            ...data,
            creator: creator ? {
                ...creator,
                avatarUrl: creator.avatar_url // Map database column to frontend expectation
            } : null,
            memberCount: memberships?.length || 0,
            memberList
        };
    }

    // Create a new team
    static async createTeam(teamData: TeamInput) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Generate UUID for the team
        const teamId = crypto.randomUUID();

        const { data: newTeam, error } = await supabase
            .from('Team')
            .insert({
                id: teamId, // Explicitly provide the UUID
                creatorId: user.id,
                name: teamData.name,
                description: teamData.description || null,
                avatarUrl: teamData.avatarUrl || null,
                isPublic: teamData.isPublic ?? true
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        // Automatically add creator as admin member
        const membershipId = crypto.randomUUID();
        await supabase
            .from('TeamMembership')
            .insert({
                id: membershipId, // Explicitly provide the UUID
                teamId: newTeam.id,
                userId: user.id,
                role: 'ADMIN'
            });

        return newTeam;
    }

    // Update team
    static async updateTeam(id: string, teamData: Partial<TeamInput>) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('Team')
            .update(teamData)
            .eq('id', id)
            .eq('creatorId', user.id) // Ensure user owns the team
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Delete team
    static async deleteTeam(id: string) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('Team')
            .delete()
            .eq('id', id)
            .eq('creatorId', user.id) // Ensure user owns the team
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Join a team
    static async joinTeam(teamId: string) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Generate UUID for the membership
        const membershipId = crypto.randomUUID();

        const { data, error } = await supabase
            .from('TeamMembership')
            .insert({
                id: membershipId, // Explicitly provide the UUID
                teamId,
                userId: user.id,
                role: 'MEMBER'
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Leave a team
    static async leaveTeam(teamId: string) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('TeamMembership')
            .delete()
            .eq('teamId', teamId)
            .eq('userId', user.id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }
}
