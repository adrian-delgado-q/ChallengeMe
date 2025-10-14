/**
 * Example: Migrating from Supabase Service to GraphQL Hooks
 * 
 * This file shows how to convert a component that uses the old ChallengeService
 * to use the new GraphQL hooks.
 */

// ============================================
// BEFORE: Using Supabase Service
// ============================================

/*
import { useEffect, useState } from 'react';
import { ChallengeService } from '@/services/challengeService';

function ChallengeListOld() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        setLoading(true);
        const result = await ChallengeService.getChallenges({
          isPublic: true,
          page: 1,
          limit: 12
        });
        setChallenges(result.challenges);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  const handleCreateChallenge = async (formData) => {
    try {
      const newChallenge = await ChallengeService.createChallenge(formData);
      setChallenges(prev => [newChallenge, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {challenges.map(challenge => (
        <div key={challenge.id}>{challenge.title}</div>
      ))}
    </div>
  );
}
*/

// ============================================
// AFTER: Using GraphQL Hooks
// ============================================

import { useGetChallenges, useCreateChallenge } from '../hooks/useChallenges';
import { authService } from '../../services/optimizedAuthService';

function ChallengeListNew() {
    // Query hook - handles loading, error, and data automatically
    const {
        data: challenges,
        isLoading,
        error
    } = useGetChallenges({
        is_public: true,
        status: 'ACTIVE'
    });

    // Mutation hook - handles optimistic updates and cache invalidation
    const createChallenge = useCreateChallenge();

    const handleCreateChallenge = async (formData: any) => {
        try {
            const currentUser = await authService.getCurrentUser();

            const newChallenge = await createChallenge.mutateAsync({
                creator_id: currentUser!.id,
                title: formData.title,
                description: formData.description,
                start_date: formData.startDate,
                end_date: formData.endDate,
                is_public: formData.isPublic,
                challenge_type: formData.challengeType
            });

            console.log('Challenge created:', newChallenge);
            // No need to manually update state - React Query handles cache invalidation
        } catch (err) {
            console.error('Failed to create challenge:', err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={() => handleCreateChallenge({
                title: 'Test',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString()
            })}>
                Create Challenge
            </button>
            {challenges?.map((challenge: any) => (
                <div key={challenge.id}>{challenge.title}</div>
            ))}
        </div>
    );
}

// ============================================
// Key Differences & Benefits
// ============================================

/*
1. NO MANUAL STATE MANAGEMENT
   - Before: useState for data, loading, error
   - After: useQuery hook manages everything

2. NO MANUAL CACHE INVALIDATION
   - Before: Manually update state after mutations
   - After: React Query automatically refetches related queries

3. BUILT-IN FEATURES
   - Automatic retries
   - Request deduplication
   - Background refetching
   - Stale-while-revalidate
   - Optimistic updates support

4. TYPE SAFETY
   - Before: Manual typing or any types
   - After: Fully typed from GraphQL schema

5. SIMPLER CODE
   - Before: ~50 lines with useEffect, try/catch, state management
   - After: ~30 lines with hooks doing all the work
*/

export { ChallengeListNew };
