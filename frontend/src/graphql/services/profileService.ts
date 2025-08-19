import { supabase, getCurrentUser } from '../../supabase/client';

// Types for profile operations
export interface ProfileInput {
    username?: string;
    avatarUrl?: string;
}

// Profile data service
export class ProfileService {
    // Get current user's profile
    static async getCurrentProfile() {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        return this.getProfileById(user.id);
    }

    // Get profile by ID
    static async getProfileById(id: string) {
        const { data: profile, error } = await supabase
            .from('Profile')
            .select(`
        *,
        createdTeams:Team!Team_creatorId_fkey(id),
        createdChallenges:Challenge!Challenge_creatorId_fkey(id),
        teamMemberships:TeamMember!TeamMember_userId_fkey(id),
        activities:Activity!Activity_profileId_fkey(id)
      `)
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        if (!profile) throw new Error('Profile not found');

        return {
            ...profile,
            createdTeamsCount: profile.createdTeams?.length || 0,
            createdChallengesCount: profile.createdChallenges?.length || 0,
            teamMembershipsCount: profile.teamMemberships?.length || 0,
            activitiesCount: profile.activities?.length || 0
        };
    }

    // Update profile
    static async updateProfile(profileData: ProfileInput) {
        const user = await getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const { data: updatedProfile, error } = await supabase
            .from('Profile')
            .update({
                username: profileData.username,
                avatarUrl: profileData.avatarUrl
            })
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return updatedProfile;
    }

    // Get user statistics
    static async getUserStats(userId?: string) {
        const targetUserId = userId || (await getCurrentUser())?.id;
        if (!targetUserId) throw new Error('User not authenticated');

        const profile = await this.getProfileById(targetUserId);

        return {
            totalTeams: profile.createdTeamsCount,
            totalChallenges: profile.createdChallengesCount,
            totalActivities: profile.activitiesCount,
            memberOfTeams: profile.teamMembershipsCount
        };
    }
}
