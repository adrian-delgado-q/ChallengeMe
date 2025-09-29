import { supabase } from '../../supabase/client';
import { authService } from '../../services/optimizedAuthService';
import { generateUUID } from '../../utils/uuid';
import type { DiscussionPost, DiscussionReply, DiscussionPermissions } from '../../types';

// Input types for creating discussions
export interface DiscussionPostInput {
	challengeId: string;
	content: string;
}

export interface DiscussionReplyInput {
	postId: string;
	parentId?: string;
	content: string;
}

// Discussion service for threaded comments

export class DiscussionService {
	// Get all posts for a challenge with replies
	static async getDiscussionForChallenge(challengeId: string): Promise<DiscussionPost[]> {
		const { data: posts, error } = await supabase
			.from('discussion_posts')
			.select(
				`
                *,
                author:profiles(id, username, avatar_url)
            `
			)
			.eq('challengeId', challengeId)
			.eq('isDeleted', false)
			.order('isPinned', { ascending: false })
			.order('createdAt', { ascending: false });

		if (error) throw new Error(`Failed to load discussion: ${error.message}`);

		if (!posts) return [];

		// Get replies for each post
		const postsWithReplies = await Promise.all(
			posts.map(async (post: any) => {
				const replies = await this.getRepliesForPost(post.id);
				return {
					...post,
					author: {
						...post.author,
						avatarUrl: post.author.avatar_url,
					},
					replies,
				} as DiscussionPost;
			})
		);

		return postsWithReplies;
	}

	// Get replies for a specific post (with threading)
	static async getRepliesForPost(postId: string): Promise<DiscussionReply[]> {
		const { data: replies, error } = await supabase
			.from('discussion_replies')
			.select(
				`
                *,
                author:profiles(id, username, avatar_url)
            `
			)
			.eq('postId', postId)
			.eq('isDeleted', false)
			.order('createdAt', { ascending: true });

		if (error) throw new Error(`Failed to load replies: ${error.message}`);
		if (!replies) return [];

		// Organize replies in a threaded structure
		return this.organizeRepliesThread(replies);
	}

	// Organize replies into threaded structure
	private static organizeRepliesThread(replies: any[]): DiscussionReply[] {
		const replyMap = new Map<string, DiscussionReply>();
		const topLevelReplies: DiscussionReply[] = [];

		// First pass: create all reply objects
		replies.forEach(reply => {
			const replyObj: DiscussionReply = {
				...reply,
				author: {
					...reply.author,
					avatarUrl: reply.author.avatar_url,
				},
				replies: [],
			};
			replyMap.set(reply.id, replyObj);
		});

		// Second pass: organize into thread structure
		replies.forEach(reply => {
			const replyObj = replyMap.get(reply.id)!;

			if (reply.parentId) {
				// This is a nested reply
				const parent = replyMap.get(reply.parentId);
				if (parent) {
					parent.replies = parent.replies || [];
					parent.replies.push(replyObj);
				}
			} else {
				// This is a top-level reply
				topLevelReplies.push(replyObj);
			}
		});

		return topLevelReplies;
	}

	// Create a new discussion post
	static async createPost(input: DiscussionPostInput): Promise<DiscussionPost> {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User must be logged in to post');

		// Check if user is a participant and not banned
		await this.checkUserCanPost(input.challengeId, user.id);

		const postId = generateUUID();
		const now = new Date().toISOString();
		const { data: post, error } = await supabase
			.from('discussion_posts')
			.insert({
				id: postId,
				challengeId: input.challengeId,
				authorId: user.id,
				content: input.content,
				createdAt: now,
				updatedAt: now,
			})
			.select(
				`
                *,
                author:profiles(id, username, avatar_url)
            `
			)
			.single();

		if (error) throw new Error(`Failed to create post: ${error.message}`);

		return {
			...post,
			author: {
				...post.author,
				avatarUrl: post.author.avatar_url,
			},
			replies: [],
		} as DiscussionPost;
	}

	// Create a reply to a post or another reply
	static async createReply(input: DiscussionReplyInput): Promise<DiscussionReply> {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User must be logged in to reply');

		// Get the post to check challenge ID
		const { data: post } = await supabase
			.from('discussion_posts')
			.select('challengeId')
			.eq('id', input.postId)
			.single();

		if (!post) throw new Error('Post not found');

		// Check if user can post to this challenge
		await this.checkUserCanPost(post.challengeId, user.id);

		const replyId = generateUUID();
		const now = new Date().toISOString();
		const { data: reply, error } = await supabase
			.from('discussion_replies')
			.insert({
				id: replyId,
				postId: input.postId,
				parentId: input.parentId,
				authorId: user.id,
				content: input.content,
				createdAt: now,
				updatedAt: now,
			})
			.select(
				`
                *,
                author:profiles(id, username, avatar_url)
            `
			)
			.single();

		if (error) throw new Error(`Failed to create reply: ${error.message}`);

		// Update reply count on the post
		await supabase
			.from('discussion_posts')
			.update({
				replyCount: await this.getReplyCount(input.postId),
				lastReplyAt: new Date().toISOString(),
			})
			.eq('id', input.postId);

		return {
			...reply,
			author: {
				...reply.author,
				avatarUrl: reply.author.avatar_url,
			},
			replies: [],
		} as DiscussionReply;
	}

	// Get reply count for a post
	private static async getReplyCount(postId: string): Promise<number> {
		const { count } = await supabase
			.from('discussion_replies')
			.select('*', { count: 'exact' })
			.eq('postId', postId)
			.eq('isDeleted', false);

		return count || 0;
	}

	// Check if user can post in a challenge
	private static async checkUserCanPost(challengeId: string, userId: string): Promise<void> {
		// Check if user is a participant
		const { data: participant, error: participantError } = await supabase
			.from('ChallengeParticipant')
			.select('id')
			.eq('challengeId', challengeId)
			.eq('userId', userId)
			.single();

		if (participantError || !participant) {
			throw new Error('Only challenge participants can post in the discussion');
		}

		// Check if user is banned (simplified check)
		try {
			const { data: ban } = await supabase
				.from('discussion_bans')
				.select('id, expiresAt')
				.eq('challengeId', challengeId)
				.eq('userId', userId)
				.eq('isActive', true)
				.maybeSingle(); // Use maybeSingle to avoid error if no ban exists

			if (ban) {
				const now = new Date();
				const expiresAt = ban.expiresAt ? new Date(ban.expiresAt) : null;

				if (!expiresAt || now < expiresAt) {
					throw new Error('You are banned from posting in this discussion');
				} else {
					// Ban has expired, deactivate it
					await supabase.from('discussion_bans').update({ isActive: false }).eq('id', ban.id);
				}
			}
		} catch (error) {
			// If we can't check bans (due to RLS), just continue
			// The RLS policies will prevent banned users from posting
			console.warn('Could not check ban status:', error);
		}
	}

	// Get user's permissions for a challenge discussion
	static async getUserPermissions(
		challengeId: string,
		userId?: string
	): Promise<DiscussionPermissions> {
		if (!userId) {
			return {
				canPost: false,
				canReply: false,
				canEdit: false,
				canDelete: false,
				canPin: false,
				canModerate: false,
				canBan: false,
				isBanned: false,
			};
		}

		// Check if user is participant
		const { data: participant } = await supabase
			.from('ChallengeParticipant')
			.select('id')
			.eq('challengeId', challengeId)
			.eq('userId', userId)
			.maybeSingle();

		if (!participant) {
			return {
				canPost: false,
				canReply: false,
				canEdit: false,
				canDelete: false,
				canPin: false,
				canModerate: false,
				canBan: false,
				isBanned: false,
			};
		}

		// Check ban status (simplified)
		let isBanned = false;
		let banReason, banExpiresAt;

		try {
			const { data: ban } = await supabase
				.from('discussion_bans')
				.select('reason, expiresAt')
				.eq('challengeId', challengeId)
				.eq('userId', userId)
				.eq('isActive', true)
				.maybeSingle();

			if (ban) {
				const now = new Date();
				const expiresAt = ban.expiresAt ? new Date(ban.expiresAt) : null;

				if (!expiresAt || now < expiresAt) {
					isBanned = true;
					banReason = ban.reason;
					banExpiresAt = ban.expiresAt;
				}
			}
		} catch (error) {
			// If we can't check bans due to RLS, assume not banned
			console.warn('Could not check ban status:', error);
		}

		// Check moderator status (simplified)
		let isModerator = false;
		let isAdmin = false;

		try {
			const { data: moderator } = await supabase
				.from('discussion_moderators')
				.select('role')
				.eq('challengeId', challengeId)
				.eq('userId', userId)
				.maybeSingle();

			isModerator = !!moderator;
			isAdmin = moderator?.role === 'ADMIN';
		} catch (error) {
			// If we can't check moderator status, assume not a moderator
			console.warn('Could not check moderator status:', error);
		}

		// Check if user is challenge creator
		let isCreator = false;
		try {
			const { data: challenge } = await supabase
				.from('Challenge')
				.select('creatorId')
				.eq('id', challengeId)
				.single();

			isCreator = challenge?.creatorId === userId;
		} catch (error) {
			console.warn('Could not check challenge creator:', error);
		}

		// Calculate final permissions
		const canModerate = isModerator || isCreator;
		const canBan = isAdmin || isCreator;

		return {
			canPost: !isBanned,
			canReply: !isBanned,
			canEdit: !isBanned,
			canDelete: canBan,
			canPin: canModerate,
			canModerate,
			canBan,
			isBanned,
			banReason,
			banExpiresAt,
		};
	}

	// Pin/unpin a post (moderator only)
	static async togglePin(postId: string, challengeId: string): Promise<boolean> {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User must be logged in');

		const permissions = await this.getUserPermissions(challengeId, user.id);
		if (!permissions.canPin) throw new Error('Insufficient permissions to pin posts');

		const { data: post } = await supabase
			.from('discussion_posts')
			.select('isPinned')
			.eq('id', postId)
			.single();

		if (!post) throw new Error('Post not found');

		const newPinnedState = !post.isPinned;

		const { error } = await supabase
			.from('discussion_posts')
			.update({ isPinned: newPinnedState })
			.eq('id', postId);

		if (error) throw new Error(`Failed to update pin status: ${error.message}`);

		return newPinnedState;
	}

	// Delete a post (soft delete)
	static async deletePost(postId: string): Promise<void> {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User must be logged in');

		const { data: post } = await supabase
			.from('discussion_posts')
			.select('challengeId, authorId')
			.eq('id', postId)
			.single();

		if (!post) throw new Error('Post not found');

		// Check permissions
		const permissions = await this.getUserPermissions(post.challengeId, user.id);
		const isAuthor = post.authorId === user.id;

		if (!permissions.canDelete && !isAuthor) {
			throw new Error('Insufficient permissions to delete this post');
		}

		const { error } = await supabase
			.from('discussion_posts')
			.update({ isDeleted: true })
			.eq('id', postId);

		if (error) throw new Error(`Failed to delete post: ${error.message}`);
	}

	// Delete a reply (soft delete)
	static async deleteReply(replyId: string): Promise<void> {
		const user = await authService.getCurrentUser();
		if (!user) throw new Error('User must be logged in');

		const { data: reply } = await supabase
			.from('discussion_replies')
			.select(
				`
                authorId,
                post:discussion_posts!inner(challengeId)
            `
			)
			.eq('id', replyId)
			.single();

		if (!reply || !reply.post || !Array.isArray(reply.post) || reply.post.length === 0) {
			throw new Error('Reply not found');
		}

		const challengeId = reply.post[0].challengeId;

		// Check permissions
		const permissions = await this.getUserPermissions(challengeId, user.id);
		const isAuthor = reply.authorId === user.id;

		if (!permissions.canDelete && !isAuthor) {
			throw new Error('Insufficient permissions to delete this reply');
		}

		const { error } = await supabase
			.from('discussion_replies')
			.update({ isDeleted: true })
			.eq('id', replyId);

		if (error) throw new Error(`Failed to delete reply: ${error.message}`);
	}

	// Ban a user from challenge discussion (admin only)
	static async banUser(
		challengeId: string,
		userId: string,
		reason?: string,
		expiresAt?: string
	): Promise<void> {
		const currentUser = await authService.getCurrentUser();
		if (!currentUser) throw new Error('User must be logged in');

		const permissions = await this.getUserPermissions(challengeId, currentUser.id);
		if (!permissions.canBan) throw new Error('Insufficient permissions to ban users');

		const banId = generateUUID();
		const { error } = await supabase.from('discussion_bans').insert({
			id: banId,
			challengeId,
			userId,
			reason,
			expiresAt,
			bannedById: currentUser.id,
		});

		if (error) throw new Error(`Failed to ban user: ${error.message}`);
	}

	// Unban a user (admin only)
	static async unbanUser(challengeId: string, userId: string): Promise<void> {
		const currentUser = await authService.getCurrentUser();
		if (!currentUser) throw new Error('User must be logged in');

		const permissions = await this.getUserPermissions(challengeId, currentUser.id);
		if (!permissions.canBan) throw new Error('Insufficient permissions to unban users');

		const { error } = await supabase
			.from('discussion_bans')
			.update({ isActive: false })
			.eq('challengeId', challengeId)
			.eq('userId', userId)
			.eq('isActive', true);

		if (error) throw new Error(`Failed to unban user: ${error.message}`);
	}
}
