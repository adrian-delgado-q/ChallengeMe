import { useState, useEffect, useCallback } from 'react';
import { TeamService, ChallengeService, ActivityService, PostService } from '../graphql/services';
import { useUser } from '../contexts/AuthContext';

// Custom hook for teams with pagination
export const useTeams = (options?: {
    myTeamsOnly?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    isPublic?: boolean;
    minMembers?: number;
    maxMembers?: number;
}) => {
    const { user } = useUser();
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const { myTeamsOnly = false, ...filterOptions } = options || {};

    const fetchTeams = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (myTeamsOnly) {
                const data = await TeamService.getMyTeams();
                setTeams(data);
                setTotalCount(data.length);
                setTotalPages(1);
                setCurrentPage(1);
                setItemsPerPage(data.length || 12);
            } else {
                const response = await TeamService.getTeams(filterOptions);
                setTeams(response.teams);
                setTotalCount(response.totalCount);
                setTotalPages(response.totalPages);
                setCurrentPage(response.currentPage);
                setItemsPerPage(response.itemsPerPage);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    }, [user, myTeamsOnly, JSON.stringify(filterOptions)]);

    const createTeam = useCallback(async (teamData: any) => {
        try {
            const newTeam = await TeamService.createTeam(teamData);
            setTeams(prev => [newTeam, ...prev]);
            setTotalCount(prev => prev + 1);
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
        totalCount,
        totalPages,
        currentPage,
        itemsPerPage,
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

// Custom hook for challenges with pagination
export const useChallenges = (options?: {
    page?: number;
    limit?: number;
    search?: string;
    activityType?: string;
    challengeType?: string;
}) => {
    const { user } = useUser();
    const [challenges, setChallenges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 12
    });

    const fetchChallenges = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        
        // Clear challenges immediately to show skeleton
        setChallenges([]);

        try {
            const result = await ChallengeService.getChallenges(options);
            
            // Only update state when we have complete data
            setChallenges(result.challenges || []);
            setPagination({
                totalCount: result.totalCount || 0,
                totalPages: result.totalPages || 0,
                currentPage: result.currentPage || 1,
                itemsPerPage: result.itemsPerPage || 12
            });
        } catch (err: any) {
            setError(err.message || 'Failed to fetch challenges');
            setChallenges([]); // Clear challenges on error
        } finally {
            setLoading(false);
        }
    }, [user, options?.page, options?.limit, options?.search, options?.activityType, options?.challengeType]);

    const createChallenge = useCallback(async (challengeData: any) => {
        try {
            const newChallenge = await ChallengeService.createChallenge(challengeData);
            // Refresh challenges after creation
            await fetchChallenges();
            return newChallenge;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create challenge');
        }
    }, [fetchChallenges]);

    const joinChallenge = useCallback(async (challengeId: string, asTeam?: string, accessCode?: string) => {
        try {
            if (asTeam) {
                await ChallengeService.joinChallengeAsTeam(challengeId, asTeam, accessCode);
            } else {
                await ChallengeService.joinChallengeAsIndividual(challengeId, accessCode);
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
        pagination,
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
            // Refresh the activities list to get the complete activity with user/challenge info
            await fetchActivities();
            return newActivity;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create activity');
        }
    }, [fetchActivities]);

    const updateActivity = useCallback(async (activityId: string, activityData: any) => {
        try {
            const updatedActivity = await ActivityService.updateActivity(activityId, activityData);
            setActivities(prev => prev.map(activity => 
                activity.id === activityId ? { ...activity, ...updatedActivity } : activity
            ));
            return updatedActivity;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to update activity');
        }
    }, []);

    const deleteActivity = useCallback(async (activityId: string) => {
        try {
            await ActivityService.deleteActivity(activityId);
            setActivities(prev => prev.filter(activity => activity.id !== activityId));
            return true;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to delete activity');
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
        createActivity,
        updateActivity,
        deleteActivity
    };
};

// Custom hook for activity management
export const useActivityManagement = (challengeId?: string) => {
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
            const data = await ActivityService.getActivitiesForManagement();
            setActivities(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch activities');
        } finally {
            setLoading(false);
        }
    }, [user, challengeId]);

    const updateActivity = useCallback(async (activityId: string, activityData: any) => {
        try {
            const updatedActivity = await ActivityService.updateActivity(activityId, activityData);
            // Refresh the list to get updated editability status
            await fetchActivities();
            return updatedActivity;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to update activity');
        }
    }, [fetchActivities]);

    const deleteActivity = useCallback(async (activityId: string) => {
        try {
            await ActivityService.deleteActivity(activityId);
            setActivities(prev => prev.filter(activity => activity.id !== activityId));
            return true;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to delete activity');
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
        updateActivity,
        deleteActivity
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
