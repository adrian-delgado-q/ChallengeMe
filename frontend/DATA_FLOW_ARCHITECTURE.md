# ChallengeMe Data Flow Architecture

## Overview
This document outlines the streamlined data flow architecture implemented to consolidate data management through React Query, eliminating multiple competing data flow patterns.

## Architecture Principles

### Single Source of Truth
- **React Query** is the single data management layer for all server state
- All components use React Query hooks for data fetching and mutations
- No direct service calls from components (except for pure utility functions)

### Consolidated Services Structure

#### `/hooks/` - React Query Hooks (Primary Data Layer)
- `useChallengesQuery.ts` - All challenge-related queries and mutations
- `useActivitiesQuery.ts` - Activity data management  
- `useTeamsQuery.ts` - Team data management
- `useProfilesQuery.ts` - Profile data management
- `useActivityTypesQuery.ts` - Activity type queries
- `useFileUpload.ts` - File upload mutations

#### `/lib/queryKeys.ts` - Centralized Cache Keys
- Unified query key factory for consistent cache management
- Prevents key duplication and ensures proper invalidation
- Hierarchical structure for easy cache targeting

#### `/graphql/services/` - Pure API Clients
- Maintained as pure API clients without business logic
- Used only by React Query hooks, not directly by components
- Handle authentication, error handling, and data transformation

#### `/services/` - Utility Services
- `fileUploadService.ts` - File upload utilities (used by hooks)
- `optimizedAuthService.ts` - Authentication utilities
- Other pure utility functions without state management

## Migration Benefits

### Before (Multiple Data Flow Patterns)
```tsx
// Components had mixed patterns:
import { ChallengeService } from '../services/challengeService'; // Direct calls
import { useChallenges } from '../hooks/useChallenges'; // React Query
import { useData } from '../hooks/useData'; // Custom state management
```

### After (Unified React Query Pattern)
```tsx
// Components use only React Query hooks:
import { useChallengesQuery, useChallengeMutations } from '../hooks/useChallengesQuery';
import { useMyParticipationQuery } from '../hooks/useChallengesQuery';
```

## Data Flow Pattern

### Queries (Data Fetching)
```tsx
const { data: challenges, isLoading, error } = useChallengesQuery({
  page: 1,
  limit: 12,
  search: 'marathon'
});
```

### Mutations (Data Updates)
```tsx
const { createChallenge, updateChallenge } = useChallengeMutations();

const handleCreate = async (challengeData) => {
  await createChallenge.mutateAsync(challengeData);
  // React Query automatically invalidates and refetches related queries
};
```

### Cache Management
- Automatic cache invalidation on mutations
- Optimistic updates where appropriate
- Background refetching for fresh data
- Proper error boundaries and retry logic

## Query Key Strategy

### Hierarchical Structure
```tsx
queryKeys.challenges.all                    // ['challenges']
queryKeys.challenges.lists()               // ['challenges', 'list']  
queryKeys.challenges.list({page: 1})       // ['challenges', 'list', {page: 1}]
queryKeys.challenges.detail('123')         // ['challenges', 'detail', '123']
queryKeys.challenges.progress('123')       // ['challenges', 'progress', '123']
```

### Cache Invalidation Examples
```tsx
// Invalidate all challenges
queryClient.invalidateQueries({ queryKey: queryKeys.challenges.all });

// Invalidate specific challenge
queryClient.invalidateQueries({ queryKey: queryKeys.challenges.detail(challengeId) });

// Invalidate all challenge lists (but not details)
queryClient.invalidateQueries({ queryKey: queryKeys.challenges.lists() });
```

## Component Integration Pattern

### Standard Hook Usage
```tsx
export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  // Data fetching 
  const { data: participation } = useMyParticipationQuery(challenge.id);
  const { data: analytics } = useChallengeAnalyticsQuery(challenge.id);
  
  // Mutations
  const { joinChallenge, leaveChallenge } = useChallengeMutations();
  
  const handleJoin = async () => {
    await joinChallenge.mutateAsync({
      challengeId: challenge.id,
      asTeam: selectedTeamId
    });
  };
  
  return (
    // Component JSX with loading states, error handling
  );
};
```

## Performance Optimizations

### Stale Time Configuration
- Challenges: 2 minutes (relatively stable data)
- Activities: 30 seconds (frequently changing)
- Profiles: 10 minutes (rarely changing)
- Activity Types: 5 minutes (mostly static)

### Background Refetching
- Enabled for real-time data (activities, progress)
- Disabled for stable data (profiles, activity types)

### Query Deduplication
- React Query automatically deduplicates identical requests
- Multiple components can safely use the same queries

## Error Handling

### Consistent Error Patterns
```tsx
const { data, error, isLoading } = useChallengesQuery();

if (error) {
  return <ErrorComponent message={error.message} />;
}
```

### Mutation Error Handling
```tsx
const { mutateAsync, error, isPending } = useChallengeMutations().createChallenge;

const handleSubmit = async (data) => {
  try {
    await mutateAsync(data);
    toast.success('Challenge created!');
  } catch (error) {
    toast.error(error.message);
  }
};
```

## Migration Checklist

- [x] Created unified query keys structure
- [x] Consolidated all data logic into React Query hooks  
- [x] Updated core components to use new hooks
- [x] Removed redundant service files
- [x] Maintained existing services as pure API clients
- [ ] Updated all remaining components (in progress)
- [ ] Added comprehensive error boundaries
- [ ] Performance testing and optimization

## Future Considerations

### Offline Support
- React Query supports offline-first patterns  
- Can be added incrementally with cache persistence

### Real-time Updates
- WebSocket integration can work alongside React Query
- Optimistic updates for better UX

### Server-Side Rendering
- React Query supports SSR/SSG patterns
- Can be added without major architecture changes

This architecture provides a maintainable, scalable foundation for data management while significantly reducing complexity and potential bugs from competing data flow patterns.
