import { supabase, getCurrentUser } from '../../supabase/client';
import { generateUUID } from '../../utils/uuid';

// Types for team operations
export interface TeamInput {
    name: string;
    description?: string;
    avatarUrl?: string;
    isPublic?: boolean;
    maxMembers?: number;
    activityTypeIds?: string[];
    accessCode?: string; // Optional access code for private teams
}

export interface TeamMembershipInput {
    teamId: string;
    userId: string;
    role?: 'ADMIN' | 'MEMBER';
}

// Team data service
export class TeamService {
    // Get all public teams or teams I'm a member of with pagination and filtering
    static async getTeams(options?: {
        isPublic?: boolean;
        page?: number;
        limit?: number;
        search?: string;
        minMembers?: number;
        maxMembers?: number;
    }) {
        const {
            isPublic,
            page = 1,
            limit = 12,
            search,
            minMembers,
            maxMembers
        } = options || {};

        let query = supabase
            .from('Team')
            .select('*', { count: 'exact' });

        // Apply filters
        if (isPublic !== undefined) {
            query = query.eq('isPublic', isPublic);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%, description.ilike.%${search}%`);
        }

        // Apply pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data: teams, error, count: totalCount } = await query;

        if (error) throw new Error(error.message);

        if (!teams || teams.length === 0) {
            return {
                teams: [],
                totalCount: totalCount || 0,
                totalPages: Math.ceil((totalCount || 0) / limit),
                currentPage: page,
                itemsPerPage: limit
            };
        }

        // Batch fetch all required data
        const teamIds = teams.map((team: any) => team.id);
        const creatorIds = teams.map((team: any) => team.creatorId);

        // Batch fetch creators
        const { data: creators } = await supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .in('id', creatorIds);

        // Batch fetch member counts
        const { data: allMemberships } = await supabase
            .from('TeamMembership')
            .select('teamId, userId')
            .in('teamId', teamIds);

        // Create lookup maps
        const creatorMap = new Map();
        (creators || []).forEach(creator => {
            creatorMap.set(creator.id, {
                ...creator,
                avatarUrl: creator.avatar_url
            });
        });

        const memberCountMap = new Map();
        (allMemberships || []).forEach(membership => {
            const count = memberCountMap.get(membership.teamId) || 0;
            memberCountMap.set(membership.teamId, count + 1);
        });

        // Process teams with pre-fetched data
        let teamsWithDetails = teams.map((team: any) => {
            const creator = creatorMap.get(team.creatorId) || null;
            const memberCount = memberCountMap.get(team.id) || 0;

            return {
                ...team,
                creator,
                memberCount
            };
        });

        // Apply member count filters after getting the data
        if (minMembers !== undefined || maxMembers !== undefined) {
            teamsWithDetails = teamsWithDetails.filter(team => {
                if (minMembers !== undefined && team.memberCount < minMembers) return false;
                if (maxMembers !== undefined && team.memberCount > maxMembers) return false;
                return true;
            });
        }

        return {
            teams: teamsWithDetails,
            totalCount: totalCount || 0,
            totalPages: Math.ceil((totalCount || 0) / limit),
            currentPage: page,
            itemsPerPage: limit
        };
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
        const teamId = generateUUID();

        const { data: newTeam, error } = await supabase
            .from('Team')
            .insert({
                id: teamId, // Explicitly provide the UUID
                creatorId: user.id,
                name: teamData.name,
                description: teamData.description || null,
                avatarUrl: teamData.avatarUrl || null,
                isPublic: teamData.isPublic ?? true,
                maxMembers: teamData.maxMembers || null,
                sportsTypes: teamData.activityTypeIds || null, // Store activity type IDs in sportsTypes column for now
                accessCode: teamData.accessCode || null // Optional access code for private teams
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        // Automatically add creator as admin member
        const membershipId = generateUUID();
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
    static async joinTeam(teamId: string, accessCode?: string) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Check if team has member limit and if it's reached, and validate access for private teams
        const { data: teamData, error: teamError } = await supabase
            .from('Team')
            .select('maxMembers, isPublic, accessCode')
            .eq('id', teamId)
            .single();

        if (teamError) throw new Error(teamError.message);

        // Validate access for private teams
        if (!teamData?.isPublic) {
            if (!teamData.accessCode) {
                throw new Error('This private team cannot be joined');
            }
            if (!accessCode) {
                throw new Error('Access code is required to join this private team');
            }
            if (accessCode !== teamData.accessCode) {
                throw new Error('Invalid access code');
            }
        }

        if (teamData?.maxMembers) {
            // Count current members
            const { count, error: countError } = await supabase
                .from('TeamMembership')
                .select('*', { count: 'exact', head: true })
                .eq('teamId', teamId);

            if (countError) throw new Error(countError.message);

            if (count && count >= teamData.maxMembers) {
                throw new Error('This team has reached its maximum member limit');
            }
        }

        // Generate UUID for the membership
        const membershipId = generateUUID();

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

    // Update team member role
    static async updateMemberRole(teamId: string, userId: string, role: 'ADMIN' | 'MEMBER') {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Verify the current user is the team creator or an admin
        const { data: teamData, error: teamError } = await supabase
            .from('Team')
            .select('creatorId')
            .eq('id', teamId)
            .single();

        if (teamError) throw new Error(teamError.message);

        if (teamData.creatorId !== user.id) {
            // Check if current user is an admin
            const { data: membershipData, error: membershipError } = await supabase
                .from('TeamMembership')
                .select('role')
                .eq('teamId', teamId)
                .eq('userId', user.id)
                .single();

            if (membershipError || membershipData?.role !== 'ADMIN') {
                throw new Error('You do not have permission to manage team roles');
            }
        }

        const { data, error } = await supabase
            .from('TeamMembership')
            .update({ role })
            .eq('teamId', teamId)
            .eq('userId', userId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Get available members for admin selection (existing team members who aren't already admins)
    static async getAvailableAdmins(teamId: string) {
        const { data: memberships, error } = await supabase
            .from('TeamMembership')
            .select(`
                id, userId, role, joinedAt,
                user:profiles(id, username, avatar_url)
            `)
            .eq('teamId', teamId);

        if (error) throw new Error(error.message);

        return (memberships || []).map((membership: any) => ({
            ...membership,
            user: membership.user ? {
                ...membership.user,
                avatarUrl: membership.user.avatar_url
            } : null
        }));
    }

    // Add member to team with specific role (for team creators/admins)
    static async addMemberToTeam(teamId: string, userId: string, role: 'ADMIN' | 'MEMBER' = 'MEMBER') {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Verify the current user is the team creator or an admin
        const { data: teamData, error: teamError } = await supabase
            .from('Team')
            .select('creatorId, maxMembers')
            .eq('id', teamId)
            .single();

        if (teamError) throw new Error(teamError.message);

        if (teamData.creatorId !== user.id) {
            // Check if current user is an admin
            const { data: membershipData, error: membershipError } = await supabase
                .from('TeamMembership')
                .select('role')
                .eq('teamId', teamId)
                .eq('userId', user.id)
                .single();

            if (membershipError || membershipData?.role !== 'ADMIN') {
                throw new Error('You do not have permission to add members to this team');
            }
        }

        // Check member limit
        if (teamData?.maxMembers) {
            const { count, error: countError } = await supabase
                .from('TeamMembership')
                .select('*', { count: 'exact', head: true })
                .eq('teamId', teamId);

            if (countError) throw new Error(countError.message);

            if (count && count >= teamData.maxMembers) {
                throw new Error('This team has reached its maximum member limit');
            }
        }

        // Generate UUID for the membership
        const membershipId = generateUUID();

        const { data, error } = await supabase
            .from('TeamMembership')
            .insert({
                id: membershipId,
                teamId,
                userId,
                role
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Remove member from team (for team creators/admins)
    static async removeMemberFromTeam(teamId: string, userId: string) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        // Verify the current user is the team creator or an admin
        const { data: teamData, error: teamError } = await supabase
            .from('Team')
            .select('creatorId')
            .eq('id', teamId)
            .single();

        if (teamError) throw new Error(teamError.message);

        // Team creator can remove anyone, admins can remove non-admins
        if (teamData.creatorId !== user.id) {
            // Check if current user is an admin
            const { data: membershipData, error: membershipError } = await supabase
                .from('TeamMembership')
                .select('role')
                .eq('teamId', teamId)
                .eq('userId', user.id)
                .single();

            if (membershipError || membershipData?.role !== 'ADMIN') {
                throw new Error('You do not have permission to remove members from this team');
            }

            // Admins cannot remove other admins (only team creator can)
            const { data: targetMemberData, error: targetError } = await supabase
                .from('TeamMembership')
                .select('role')
                .eq('teamId', teamId)
                .eq('userId', userId)
                .single();

            if (targetError) throw new Error(targetError.message);
            
            if (targetMemberData?.role === 'ADMIN') {
                throw new Error('Only the team creator can remove administrators');
            }
        }

        // Prevent team creator from removing themselves
        if (teamData.creatorId === userId && user.id === userId) {
            throw new Error('Team creator cannot leave the team. Transfer ownership or delete the team instead.');
        }

        const { data, error } = await supabase
            .from('TeamMembership')
            .delete()
            .eq('teamId', teamId)
            .eq('userId', userId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Search for users by username to add to team
    static async searchUsers(query: string, teamId?: string) {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const { data: users, error } = await supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .ilike('username', `%${query.trim()}%`)
            .limit(10);

        if (error) throw new Error(error.message);

        // If teamId is provided, filter out users who are already members
        if (teamId && users && users.length > 0) {
            const { data: existingMembers } = await supabase
                .from('TeamMembership')
                .select('userId')
                .eq('teamId', teamId)
                .in('userId', users.map(u => u.id));

            const existingUserIds = new Set(existingMembers?.map(m => m.userId) || []);
            
            return users
                .filter(user => !existingUserIds.has(user.id))
                .map(user => ({
                    id: user.id,
                    username: user.username,
                    avatarUrl: user.avatar_url
                }));
        }

        return (users || []).map(user => ({
            id: user.id,
            username: user.username,
            avatarUrl: user.avatar_url
        }));
    }
}
