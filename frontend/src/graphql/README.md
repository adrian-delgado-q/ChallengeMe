# GraphQL Integration

This directory contains the GraphQL integration for the ChallengeMe frontend application.

## Structure

```
src/graphql/
├── client.ts                    # GraphQL client setup and utilities
├── index.ts                     # Main exports
├── hooks/
│   └── useChallenges.ts        # React Query hooks for challenges
├── queries/
│   └── challenges.graphql.ts   # GraphQL queries
└── mutations/
    └── challenges.graphql.ts   # GraphQL mutations
```

## Usage

### 1. Basic Query Example

```typescript
import { useGetChallenges } from '@/graphql';

function ChallengeList() {
  const { data: challenges, isLoading, error } = useGetChallenges({
    is_public: true,
    status: 'ACTIVE'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {challenges?.map(challenge => (
        <div key={challenge.id}>{challenge.title}</div>
      ))}
    </div>
  );
}
```

### 2. Mutation Example

```typescript
import { useCreateChallenge } from '@/graphql';

function CreateChallengeForm() {
  const createChallenge = useCreateChallenge();

  const handleSubmit = async (formData) => {
    try {
      const newChallenge = await createChallenge.mutateAsync({
        creator_id: currentUser.id,
        title: formData.title,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        is_public: true,
        challenge_type: 'INDIVIDUAL'
      });
      console.log('Challenge created:', newChallenge);
    } catch (error) {
      console.error('Failed to create challenge:', error);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. Authentication

Set the auth token when the user logs in:

```typescript
import { setAuthToken } from '@/graphql';

// After successful login
setAuthToken(session.access_token);

// On logout
setAuthToken(null);
```

## Available Hooks

### Query Hooks

- `useGetChallenges(filters?)` - Get all challenges with optional filters
- `useGetChallenge(id)` - Get a single challenge by ID
- `useGetMyChallenges(userId)` - Get challenges created by user
- `useGetPublicChallenges()` - Get all public challenges
- `useGetChallengeParticipants(challengeId)` - Get challenge participants
- `useGetUserChallengeParticipation(challengeId, userId)` - Get user's participation

### Mutation Hooks

- `useCreateChallenge()` - Create a new challenge
- `useUpdateChallenge()` - Update a challenge
- `useDeleteChallenge()` - Delete a challenge
- `useUpdateChallengeStatus()` - Update challenge status
- `useJoinChallenge()` - Join a challenge as individual
- `useJoinChallengeAsTeam()` - Join a challenge as a team
- `useLeaveChallenge()` - Leave a challenge
- `useRemoveChallengeParticipant()` - Remove a participant (admin only)
- `useCreateMilestone()` - Create a milestone
- `useAddChallengeActivityType()` - Add activity type to challenge

## Code Generation

To regenerate GraphQL types after schema changes:

```bash
npm run generate
```

This will:
1. Fetch the GraphQL schema from the backend
2. Parse all GraphQL documents in `src/graphql/**/*.graphql.ts`
3. Generate TypeScript types in `src/generated/graphql.ts`

## Environment Variables

Make sure these are set in your `.env.development`:

```
VITE_GRAPHQL_HTTP_HOST=localhost
VITE_GRAPHQL_HTTP_PORT=4000
```

## Query Keys

Query keys follow this pattern for efficient cache management:

```typescript
challengeKeys = {
  all: ['challenges'],
  lists: () => ['challenges', 'list'],
  list: (filters) => ['challenges', 'list', filters],
  details: () => ['challenges', 'detail'],
  detail: (id) => ['challenges', 'detail', id],
  // ... etc
}
```

This allows for:
- Invalidating all challenge queries: `queryClient.invalidateQueries({ queryKey: challengeKeys.all })`
- Invalidating specific challenge: `queryClient.invalidateQueries({ queryKey: challengeKeys.detail(id) })`

## Migration from Supabase

The GraphQL hooks replace the previous Supabase service:

| Old (Supabase Service) | New (GraphQL Hook) |
|------------------------|-------------------|
| `ChallengeService.getChallenges()` | `useGetChallenges()` |
| `ChallengeService.getChallenge(id)` | `useGetChallenge(id)` |
| `ChallengeService.createChallenge(data)` | `useCreateChallenge().mutate(data)` |
| `ChallengeService.joinChallenge(data)` | `useJoinChallenge().mutate(data)` |

Benefits:
- ✅ Type safety with generated types
- ✅ Automatic cache management with React Query
- ✅ Optimistic updates support
- ✅ Better error handling
- ✅ Simplified data fetching patterns
