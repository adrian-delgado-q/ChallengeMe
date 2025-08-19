import { useState, useEffect, useCallback } from 'react';
import { TeamService, ChallengeService, ActivityService, PostService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';

// Custom hook for teams
export const useTeams = (myTeamsOnly = false) => {
    const { user } = useUser();
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeams = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = myTeamsOnly
                ? await TeamService.getMyTeams()
                : await TeamService.getTeams();
            setTeams(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    }, [user, myTeamsOnly]);

    const createTeam = useCallback(async (teamData: any) => {
        try {
            const newTeam = await TeamService.createTeam(teamData);
            setTeams(prev => [...prev, newTeam]);
            return newTeam;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create team');
        }
    }, []);

    const joinTeam = useCallback(async (teamId: string) => {
        try {
            await TeamService.joinTeam(teamId);
            // Refresh teams list
            await fetchTeams();
        } catch (err: any) {
            throw new Error(err.message || 'Failed to join team');
        }
    }, [fetchTeams]);

    const leaveTeam = useCallback(async (teamId: string) => {
        try {
            await TeamService.leaveTeam(teamId);
            // Refresh teams list
            await fetchTeams();
        } catch (err: any) {
            throw new Error(err.message || 'Failed to leave team');
        }
    }, [fetchTeams]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    return {
        teams,
        loading,
        error,
        refetch: fetchTeams,
        createTeam,
        joinTeam,
        leaveTeam
    };
};

// Custom hook for team details
export const useTeamDetails = (teamId: string) => {
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeam = useCallback(async () => {
        if (!teamId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await TeamService.getTeamById(teamId);
            setTeam(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch team details');
        } finally {
            setLoading(false);
        }
    }, [teamId]);

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    return {
        team,
        loading,
        error,
        refetch: fetchTeam
    };
};

// Custom hook for challenges
export const useChallenges = () => {
    const { user } = useUser();
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChallenges = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await ChallengeService.getChallenges();
            setChallenges(data || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch challenges');
        } finally {
            setLoading(false);
        }
    }, [user]);

    const createChallenge = useCallback(async (challengeData: any) => {
        try {
            const newChallenge = await ChallengeService.createChallenge(challengeData);
            setChallenges(prev => [...prev, newChallenge]);
            return newChallenge;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create challenge');
        }
    }, []);

    const joinChallenge = useCallback(async (challengeId: string, asTeam?: string) => {
        try {
            if (asTeam) {
                await ChallengeService.joinChallengeAsTeam(challengeId, asTeam);
            } else {
                await ChallengeService.joinChallengeAsIndividual(challengeId);
            }
            // Refresh challenges list
            await fetchChallenges();
        } catch (err: any) {
            throw new Error(err.message || 'Failed to join challenge');
        }
    }, [fetchChallenges]);

    useEffect(() => {
        fetchChallenges();
    }, [fetchChallenges]);

    return {
        challenges,
        loading,
        error,
        refetch: fetchChallenges,
        createChallenge,
        joinChallenge
    };
};

// Custom hook for challenge details
export const useChallengeDetails = (challengeId: string) => {
    const [challenge, setChallenge] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChallenge = useCallback(async () => {
        if (!challengeId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await ChallengeService.getChallengeById(challengeId);
            setChallenge(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch challenge details');
        } finally {
            setLoading(false);
        }
    }, [challengeId]);

    useEffect(() => {
        fetchChallenge();
    }, [fetchChallenge]);

    return {
        challenge,
        loading,
        error,
        refetch: fetchChallenge
    };
};

// Custom hook for activities
export const useActivities = (challengeId?: string) => {
    const { user } = useUser();
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchActivities = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = challengeId
                ? await ActivityService.getActivitiesForChallenge(challengeId)
                : await ActivityService.getRecentActivities();
            setActivities(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch activities');
        } finally {
            setLoading(false);
        }
    }, [user, challengeId]);

    const createActivity = useCallback(async (activityData: any) => {
        try {
            const newActivity = await ActivityService.createActivity(activityData);
            setActivities(prev => [newActivity, ...prev]);
            return newActivity;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create activity');
        }
    }, []);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    return {
        activities,
        loading,
        error,
        refetch: fetchActivities,
        createActivity
    };
};

// Custom hook for posts
export const usePosts = (challengeId?: string) => {
    const { user } = useUser();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = challengeId
                ? await PostService.getPostsForChallenge(challengeId)
                : await PostService.getRecentPosts();
            setPosts(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, [user, challengeId]);

    const createPost = useCallback(async (postData: any) => {
        try {
            const newPost = await PostService.createPost(postData);
            setPosts(prev => [newPost, ...prev]);
            return newPost;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create post');
        }
    }, []);

    const createComment = useCallback(async (postId: string, content: string) => {
        try {
            const newComment = await PostService.createComment({ postId, content });
            // Update the specific post with the new comment
            setPosts(prev => prev.map(post =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
            ));
            return newComment;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create comment');
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        error,
        refetch: fetchPosts,
        createPost,
        createComment
    };
};
