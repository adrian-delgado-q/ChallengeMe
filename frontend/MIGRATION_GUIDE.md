# Developer Migration Guide: Using React Query Hooks

## Quick Start

### Before (Old Pattern)
```tsx
import { ChallengeService } from '../services/challengeService';
import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const data = await ChallengeService.getChallenges();
        setChallenges(data.challenges);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallenges();
  }, []);
  
  const handleJoin = async (challengeId) => {
    await ChallengeService.joinChallengeAsIndividual(challengeId);
    // Manual refetch needed
  };
};
```

### After (New Pattern)
```tsx
import { useChallengesQuery, useChallengeMutations } from '../hooks';

const MyComponent = () => {
  const { data: challenges, isLoading, error } = useChallengesQuery();
  const { joinChallenge } = useChallengeMutations();
  
  const handleJoin = async (challengeId) => {
    await joinChallenge.mutateAsync({ 
      challengeId,
      asTeam: undefined,
      accessCode: undefined 
    });
    // Automatic refetch and cache invalidation
  };
};
```

## Common Patterns

### 1. Data Fetching
```tsx
// List data with options
const { data, isLoading, error } = useChallengesQuery({
  page: 1,
  limit: 12,
  search: 'marathon',
  challengeType: 'individual'
});

// Single item detail
const { data: challenge } = useChallengeQuery(challengeId);

// User-specific data
const { data: myChallenges } = useMyChallengesQuery();
```

### 2. Mutations with Error Handling
```tsx
const { createChallenge, joinChallenge } = useChallengeMutations();

const handleCreate = async (challengeData) => {
  try {
    await createChallenge.mutateAsync(challengeData);
    toast.success('Challenge created successfully!');
    navigate('/challenges');
  } catch (error) {
    toast.error(error.message);
  }
};

// Check mutation status
const isCreating = createChallenge.isPending;
const creationError = createChallenge.error;
```

### 3. File Uploads
```tsx
import { useFileUpload } from '../hooks';

const { uploadChallengeImage, isUploading } = useFileUpload();

const handleImageUpload = async (file) => {
  const result = await uploadChallengeImage.mutateAsync(file);
  if (result.success) {
    setChallengeImageUrl(result.url);
  }
};
```

## Hook Reference

### Challenge Hooks
- `useChallengesQuery(options)` - List challenges with filtering
- `useChallengeQuery(id)` - Single challenge details
- `useChallengeProgressQuery(id)` - Challenge progress over time
- `useMyChallengesQuery()` - User's participated challenges
- `useMyCreatedChallengesQuery()` - User's created challenges
- `useChallengeMutations()` - Create, update, join, leave operations

### Activity Hooks
- `useActivitiesForChallengeQuery(challengeId)` - Activities for a challenge
- `useRecentActivitiesQuery(limit)` - Recent activities feed
- `useUserActivitiesQuery(userId)` - User's activity history
- `useActivityMutations()` - Create, update, delete activities

### Team Hooks
- `useTeamsQuery(options)` - List teams with filtering
- `useTeamQuery(id)` - Single team details
- `useMyTeamsQuery()` - User's teams
- `useTeamMutations()` - Create, join, leave, update operations

### Profile Hooks
- `useCurrentProfileQuery()` - Current user's profile
- `useProfileQuery(id)` - Any user's profile
- `useProfileMutations()` - Update profile operations

## Advanced Usage

### Manual Cache Management
```tsx
import { useQueryClient, queryKeys } from '../hooks';

const queryClient = useQueryClient();

// Invalidate specific data
queryClient.invalidateQueries({ 
  queryKey: queryKeys.challenges.detail(challengeId) 
});

// Update cache optimistically
queryClient.setQueryData(
  queryKeys.challenges.detail(challengeId),
  (oldData) => ({ ...oldData, participants: oldData.participants + 1 })
);
```

### Dependent Queries
```tsx
const { data: challenge } = useChallengeQuery(challengeId);
const { data: activities } = useActivitiesForChallengeQuery(
  challengeId,
  { enabled: !!challenge } // Only fetch activities if challenge exists
);
```

### Background Refetching
```tsx
// For real-time data
const { data: activities } = useActivitiesForChallengeQuery(challengeId, {
  refetchInterval: 30000, // Refetch every 30 seconds
});
```

## Error Handling Best Practices

### Component Level
```tsx
const { data, error, isLoading } = useChallengesQuery();

if (error) {
  return <ErrorBoundary error={error} />;
}

if (isLoading) {
  return <LoadingSpinner />;
}

return <ChallengeList challenges={data.challenges} />;
```

### Global Error Handling
```tsx
// In queryClient setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error('Query error:', error);
        toast.error('Failed to load data');
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
        toast.error(error.message || 'Operation failed');
      },
    },
  },
});
```

## Performance Tips

### 1. Use Appropriate Stale Times
```tsx
// Static data - longer stale time
const { data: activityTypes } = useActivityTypesQuery({
  staleTime: 10 * 60 * 1000, // 10 minutes
});

// Dynamic data - shorter stale time  
const { data: activities } = useRecentActivitiesQuery({
  staleTime: 30 * 1000, // 30 seconds
});
```

### 2. Conditional Queries
```tsx
const { data: challenge } = useChallengeQuery(challengeId);
const { data: analytics } = useChallengeAnalyticsQuery(challengeId, {
  enabled: !!challenge && isOwner, // Only fetch if needed
});
```

### 3. Prefetching
```tsx
const queryClient = useQueryClient();

const prefetchChallenge = (challengeId) => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.challenges.detail(challengeId),
    queryFn: () => ChallengeService.getChallengeById(challengeId),
  });
};
```

## Common Migration Issues

### 1. Loading States
```tsx
// Old: Manual loading management
const [loading, setLoading] = useState(false);

// New: Built-in loading states
const { isLoading, isFetching, isRefetching } = useChallengesQuery();
```

### 2. Error Handling
```tsx
// Old: Try-catch everywhere
try {
  await ChallengeService.createChallenge(data);
} catch (error) {
  setError(error.message);
}

// New: Built-in error handling
const { mutateAsync, error } = useChallengeMutations().createChallenge;
```

### 3. Data Synchronization
```tsx
// Old: Manual refetching
const refetchChallenges = async () => {
  const data = await ChallengeService.getChallenges();
  setChallenges(data.challenges);
};

// New: Automatic invalidation
// No manual refetching needed - React Query handles it
```

## Testing

### Mock Hooks in Tests
```tsx
jest.mock('../hooks', () => ({
  useChallengesQuery: jest.fn(() => ({
    data: { challenges: mockChallenges },
    isLoading: false,
    error: null,
  })),
}));
```

### Test Mutations
```tsx
const mockMutateAsync = jest.fn();
jest.mock('../hooks', () => ({
  useChallengeMutations: () => ({
    createChallenge: { mutateAsync: mockMutateAsync },
  }),
}));

// Test that mutation is called correctly
expect(mockMutateAsync).toHaveBeenCalledWith(expectedData);
```
