import { supabase } from '../../supabase/client';
import { authService } from '../../services/optimizedAuthService';
import { generateUUID } from '../../utils/uuid';

// Types for post and comment operations
export interface PostInput {
  participantId: string; // ChallengeParticipant ID
  content?: string;
  imageUrl?: string;
}

export interface CommentInput {
  postId: string;
  content: string;
}

// Post and Comment data service

export class PostService {
  // Get posts for a specific challenge
  static async getPostsForChallenge(challengeId: string) {
    const { data: posts, error } = await supabase
      .from('Post')
      .select('*')
      .eq('challengeId', challengeId);

    if (error) throw new Error(error.message);

    // Get participant and user info for each post
    const postsWithDetails = await Promise.all(
      (posts || []).map(async (post: any) => {
        // Get participant info
        const { data: participant } = await supabase
          .from('ChallengeParticipant')
          .select('userId, challengeId, teamId')
          .eq('id', post.participantId)
          .single();

        let user = null;
        let challenge = null;

        if (participant) {
          // Get user info
          if (participant.userId) {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id, username, avatarUrl')
              .eq('id', participant.userId)
              .single();
            user = userData;
          }

          // Get challenge info
          const { data: challengeData } = await supabase
            .from('Challenge')
            .select('id, title')
            .eq('id', participant.challengeId)
            .single();
          challenge = challengeData;
        }

        // Get comments
        const { data: comments } = await supabase.from('Comment').select('*').eq('postId', post.id);

        return {
          id: post.id,
          content: post.content,
          imageUrl: post.imageUrl,
          createdAt: post.createdAt,
          user,
          challenge,
          comments: comments || [],
        };
      })
    );

    return postsWithDetails;
  }

  // Create a new post
  static async createPost(postData: PostInput) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    // Generate UUID for the post
    const postId = generateUUID();

    const { data: newPost, error } = await supabase
      .from('Post')
      .insert({
        id: postId, // Explicitly provide the UUID
        participantId: postData.participantId,
        content: postData.content || null,
        imageUrl: postData.imageUrl || null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return newPost;
  }

  // Create a new comment
  static async createComment(commentData: CommentInput) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    // Generate UUID for the comment
    const commentId = generateUUID();

    const { data: newComment, error } = await supabase
      .from('Comment')
      .insert({
        id: commentId, // Explicitly provide the UUID
        postId: commentData.postId,
        authorId: user.id,
        content: commentData.content,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return newComment;
  }

  // Get recent posts across all challenges (social feed)
  static async getRecentPosts(limit: number = 20) {
    const { data: posts, error } = await supabase
      .from('Post')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    // Get participant and user info for each post
    const postsWithDetails = await Promise.all(
      (posts || []).map(async (post: any) => {
        // Get participant info
        const { data: participant } = await supabase
          .from('ChallengeParticipant')
          .select('userId, challengeId, teamId')
          .eq('id', post.participantId)
          .single();

        let user = null;
        let challenge = null;

        if (participant) {
          // Get user info
          if (participant.userId) {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id, username, avatarUrl')
              .eq('id', participant.userId)
              .single();
            user = userData;
          }

          // Get challenge info
          const { data: challengeData } = await supabase
            .from('Challenge')
            .select('id, title')
            .eq('id', participant.challengeId)
            .single();
          challenge = challengeData;
        }

        // Get comments
        const { data: comments } = await supabase.from('Comment').select('*').eq('postId', post.id);

        return {
          id: post.id,
          content: post.content,
          imageUrl: post.imageUrl,
          createdAt: post.createdAt,
          user,
          challenge,
          comments: comments || [],
        };
      })
    );

    return postsWithDetails;
  }
}
