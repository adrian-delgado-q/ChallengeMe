import { supabase } from '../supabase/client';
import { authService } from './optimizedAuthService';
import { generateUUID } from '../utils/uuid';
import { ensureUserProfile } from '../utils/profileUtils';
import type { ActivityInput } from '../types';
export type { ActivityInput };

// Activity data service with exponential backoff
export class ActivityService {
	// Helper function to validate if an activity type is supported by a challenge
	static async validateActivityTypeForChallenge(
		challengeId: string,
		activityTypeId: string
	): Promise<boolean> {
		const { data: supportedActivity, error } = await supabase
			.from('ChallengeActivityType')
			.select('id')
			.eq('challengeId', challengeId)
			.eq('activityTypeId', activityTypeId)
			.single();

		if (error && error.code !== 'PGRST116') {
			// PGRST116 is "not found" error
			throw new Error(`Failed to validate activity type: ${error.message}`);
		}

		return !!supportedActivity; // Returns true if the activity type is supported
	}

	// Get activities for a specific challenge
	static async getActivitiesForChallenge(challengeId: string) {
		const { data: activities, error } = await supabase
			.from('activity_details_view')
			.select('*')
			.eq('challenge_id', challengeId);

		if (error) throw new Error(error.message);

		return activities.map((activity: any) => ({
			id: activity.id,
			activityType: {
				id: activity.activityTypeId,
				name: activity.activity_type_name,
				category: activity.activity_type_category,
				unit: activity.activity_type_unit,
				unitLabel: activity.activity_type_unit_label,
			},
			value: activity.value,
			notes: activity.notes,
			date: activity.date,
			uploadedAt: activity.uploadedAt,
			user: {
				id: activity.user_id,
				username: activity.username || 'Unknown User',
				avatarUrl: activity.avatar_url,
			},
			challenge: {
				id: activity.challenge_id,
				title: activity.challenge_title,
			},
			team: {
				id: activity.team_id,
				name: activity.team_name,
			},
		}));
	}

	// Get activities for a specific user
	static async getActivitiesForUser(userId?: string) {
		const currentUser = userId ? { id: userId } : await authService.getCurrentUser();
		if (!currentUser) throw new Error('User not authenticated');

		const { data: activities, error } = await supabase
			.from('activity_details_view')
			.select('*')
			.eq('user_id', currentUser.id);

		if (error) throw new Error(error.message);

		return activities.map((activity: any) => ({
			id: activity.id,
			activityType: {
				id: activity.activityTypeId,
				name: activity.activity_type_name,
				category: activity.activity_type_category,
				unit: activity.activity_type_unit,
				unitLabel: activity.activity_type_unit_label,
			},
			value: activity.value,
			notes: activity.notes,
			date: activity.date,
			uploadedAt: activity.uploadedAt,
			user: {
				id: activity.user_id,
				username: activity.username || 'Unknown User',
				avatarUrl: activity.avatar_url,
			},
			challenge: {
				id: activity.challenge_id,
				title: activity.challenge_title,
			},
			team: {
				id: activity.team_id,
				name: activity.team_name,
			},
		}));
	}

	// Create a new activity
	static async createActivity(activityData: ActivityInput) {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User not authenticated');

		// Ensure user profile exists before creating activity
		await ensureUserProfile();

		// Get the challengeId from the participant
		const { data: participant, error: participantError } = await supabase
			.from('ChallengeParticipant')
			.select('challengeId')
			.eq('id', activityData.participantId)
			.single();

		if (participantError) throw new Error(participantError.message);
		if (!participant) throw new Error('Participant not found');

		// Validate that the activity type is supported by this challenge
		const isActivityTypeSupported = await this.validateActivityTypeForChallenge(
			participant.challengeId,
			activityData.activityTypeId
		);

		if (!isActivityTypeSupported) {
			throw new Error(
				'This activity type is not supported by the current challenge. Please select a different activity type.'
			);
		}

		// Generate UUID for the activity
		const activityId = generateUUID();

		const { data: newActivity, error } = await supabase
			.from('Activity')
			.insert({
				id: activityId,
				participantId: activityData.participantId,
				activityTypeId: activityData.activityTypeId,
				challengeId: participant.challengeId,
				profileId: user.id,
				value: activityData.value,
				notes: activityData.notes || null,
				date: activityData.date,
				uploadedAt: new Date().toISOString(),
			})
			.select()
			.single();

		if (error) throw new Error(error.message);
		return newActivity;
	}

	// Update an existing activity
	static async updateActivity(activityId: string, activityData: Partial<ActivityInput>) {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User not authenticated');

		// First verify the user owns this activity (through their participant ID)
		const { data: activity, error: fetchError } = await supabase
			.from('Activity')
			.select('participantId')
			.eq('id', activityId)
			.single();

		if (fetchError) throw new Error(fetchError.message);
		if (!activity) throw new Error('Activity not found');

		// Verify the user owns this activity through participant and get challenge info
		const { data: participant, error: participantError } = await supabase
			.from('ChallengeParticipant')
			.select('userId, challengeId')
			.eq('id', activity.participantId)
			.single();

		if (participantError) throw new Error(participantError.message);
		if (participant.userId !== user.id) {
			throw new Error('You can only edit your own activities');
		}

		// If activityTypeId is being changed, validate it's supported by the challenge
		if (activityData.activityTypeId !== undefined) {
			const isActivityTypeSupported = await this.validateActivityTypeForChallenge(
				participant.challengeId,
				activityData.activityTypeId
			);

			if (!isActivityTypeSupported) {
				throw new Error(
					'This activity type is not supported by the current challenge. Please select a different activity type.'
				);
			}
		}

		const { data: updatedActivity, error } = await supabase
			.from('Activity')
			.update({
				activityTypeId: activityData.activityTypeId,
				value: activityData.value,
				notes: activityData.notes,
				date: activityData.date,
			})
			.eq('id', activityId)
			.select()
			.single();

		if (error) throw new Error(error.message);
		return updatedActivity;
	}

	// Delete an activity
	static async deleteActivity(activityId: string) {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User not authenticated');

		// First verify the user owns this activity
		const { data: activity, error: fetchError } = await supabase
			.from('Activity')
			.select('participantId')
			.eq('id', activityId)
			.single();

		if (fetchError) throw new Error(fetchError.message);
		if (!activity) throw new Error('Activity not found');

		// Verify the user owns this activity through participant
		const { data: participant, error: participantError } = await supabase
			.from('ChallengeParticipant')
			.select('userId')
			.eq('id', activity.participantId)
			.single();

		if (participantError) throw new Error(participantError.message);
		if (participant.userId !== user.id) {
			throw new Error('You can only delete your own activities');
		}

		const { error } = await supabase.from('Activity').delete().eq('id', activityId);

		if (error) throw new Error(error.message);
		return true;
	}

	// Check if an activity is editable (within 48 hours)
	static isActivityEditable(uploadedAt: string): boolean {
		const uploadedDate = new Date(uploadedAt);
		const now = new Date();
		const hoursDifference = (now.getTime() - uploadedDate.getTime()) / (1000 * 60 * 60);
		return hoursDifference <= 48;
	}

	// Get activities specifically for management (includes editability info)
	static async getActivitiesForManagement() {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User not authenticated');

		const { data: activities, error } = await supabase
			.from('activity_details_view')
			.select('*')
			.eq('user_id', user.id)
			.order('uploadedAt', { ascending: false });

		if (error) throw new Error(error.message);

		return activities.map((activity: any) => ({
			id: activity.id,
			activityType: {
				id: activity.activityTypeId,
				name: activity.activity_type_name,
				category: activity.activity_type_category,
				unit: activity.activity_type_unit,
				unitLabel: activity.activity_type_unit_label,
			},
			value: activity.value,
			notes: activity.notes,
			date: activity.date,
			uploadedAt: activity.uploadedAt,
			isEditable: this.isActivityEditable(activity.uploadedAt),
			user: {
				id: activity.user_id,
				username: activity.username || 'Unknown User',
				avatarUrl: activity.avatar_url,
			},
			challenge: {
				id: activity.challenge_id,
				title: activity.challenge_title,
			},
			team: {
				id: activity.team_id,
				name: activity.team_name,
			},
		}));
	}

	// Get recent activities across all challenges (activity feed)
	static async getRecentActivities(limit: number = 20) {
		const { data: activities, error } = await supabase
			.from('activity_details_view')
			.select('*')
			.order('uploadedAt', { ascending: false })
			.limit(limit);

		if (error) throw new Error(error.message);

		return activities.map((activity: any) => ({
			id: activity.id,
			activityType: {
				id: activity.activityTypeId,
				name: activity.activity_type_name,
				category: activity.activity_type_category,
				unit: activity.activity_type_unit,
				unitLabel: activity.activity_type_unit_label,
			},
			value: activity.value,
			notes: activity.notes,
			date: activity.date,
			uploadedAt: activity.uploadedAt,
			user: {
				id: activity.user_id,
				username: activity.username || 'Unknown User',
				avatarUrl: activity.avatar_url,
			},
			challenge: {
				id: activity.challenge_id,
				title: activity.challenge_title,
			},
			team: {
				id: activity.team_id,
				name: activity.team_name,
			},
		}));
	}

	// Get activities for leaderboard calculation
	static async getActivitiesForLeaderboard(challengeId: string) {
		const activities = await this.getActivitiesForChallenge(challengeId);

		// Group activities by user and calculate totals
		const userStats = activities.reduce((acc: any, activity: any) => {
			if (!activity.user) return acc; // Skip activities without user data

			const userId = activity.user.id;
			const userName = activity.user.username || 'Unknown User';
			const userAvatar = activity.user.avatarUrl || '';

			if (!acc[userId]) {
				acc[userId] = {
					id: userId,
					name: userName,
					avatar: userAvatar,
					activityCount: 0,
					totalDays: 0,
				};
			}

			acc[userId].activityCount += 1;
			// For now, we'll use activity count as the metric
			// In a real app, you might calculate distance, time, etc.

			return acc;
		}, {});

		// Convert to array and sort by activity count
		return Object.values(userStats)
			.sort((a: any, b: any) => b.activityCount - a.activityCount)
			.map((user: any, index: number) => ({
				rank: index + 1,
				name: user.name,
				value: `${user.activityCount} activities`,
				avatar: user.avatar,
			}));
	}

	// Test function to verify real-time updates are working
	static async testRealTimeUpdates(challengeId: string) {
		try {
			console.log('Testing real-time updates for challenge:', challengeId);

			const user = await authService.getCurrentUser();
			if (!user) throw new Error('User not authenticated');

			// Get the current user's participant record for this challenge
			const { data: participant } = await supabase
				.from('ChallengeParticipant')
				.select('id, userId')
				.eq('challengeId', challengeId)
				.eq('userId', user.id)
				.maybeSingle();

			if (!participant) {
				throw new Error(
					'You must be a participant in this challenge to test real-time updates. Please join the challenge first.'
				);
			}

			// Create a test activity
			const testActivity = {
				participantId: participant.id,
				activityTypeId: 'test-activity-type-id', // This should be a valid ActivityType ID
				value: 5.0, // Test value (e.g., 5 km)
				notes: `Test activity - ${new Date().toLocaleTimeString()}`,
				date: new Date().toISOString().split('T')[0],
			};

			console.log('Creating test activity:', testActivity);
			const result = await this.createActivity(testActivity);
			console.log('Test activity created successfully:', result);

			return result;
		} catch (error) {
			console.error('Real-time update test failed:', error);
			throw error;
		}
	}
}
