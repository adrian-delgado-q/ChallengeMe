# GraphQL Quick Reference

## Import Patterns

```typescript
// Service layer (recommended for most use cases)
import { challengeService } from './graphql/services/challengeService';

// React Query hooks (for React components)
import { 
  useChallenges, 
  useChallenge,
  useCreateChallenge,
  useUpdateChallenge,
  useDeleteChallenge
} from './graphql/hooks/useChallenges';

// Direct SDK access (for advanced use cases)
import { sdk } from './graphql/client';

// Types
import type { Challenge, CreateChallengeMutationVariables } from './generated/graphql';
```

## Common Patterns

### Fetching Data

```typescript
// In a component
const { data: challenges, isLoading, error } = useChallenges();

// In a service/utility
const challenges = await challengeService.getChallenges();
const publicChallenges = await challengeService.getPublicChallenges();
const userChallenges = await challengeService.getMyChallenges(userId);
```

### Creating Data

```typescript
// In a component
const createMutation = useCreateChallenge();

const handleCreate = () => {
  createMutation.mutate({
    creator_id: userId,
    title: "My Challenge",
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 86400000),
  });
};

// In a service/utility
const newChallenge = await challengeService.createChallenge({
  creator_id: userId,
  title: "My Challenge",
  start_date: new Date(),
  end_date: new Date(Date.now() + 30 * 86400000),
});
```

### Updating Data

```typescript
// In a component
const updateMutation = useUpdateChallenge();

updateMutation.mutate({
  id: challengeId,
  title: "Updated Title",
  description: "Updated Description",
});

// In a service/utility
await challengeService.updateChallenge({
  id: challengeId,
  title: "Updated Title",
});
```

### Deleting Data

```typescript
// In a component
const deleteMutation = useDeleteChallenge();
deleteMutation.mutate(challengeId);

// In a service/utility
await challengeService.deleteChallenge(challengeId);
```

## Migration from Supabase

### Before (Supabase)
```typescript
const { data: challenges, error } = await supabase
  .from('challenges')
  .select(`
    *,
    creator:profiles(id, username, avatar_url),
    participants:challenge_participants(count)
  `)
  .eq('is_public', true)
  .order('created_at', { ascending: false });

if (error) throw error;
return challenges;
```

### After (GraphQL)
```typescript
// All the relations are already included in the fragment!
const challenges = await challengeService.getPublicChallenges();
// TypeScript knows the exact shape of the data
```

## Type Safety Examples

```typescript
// ✅ TypeScript knows all the fields
const challenge = await challengeService.getChallenge('123');
console.log(challenge.title); // autocomplete works!
console.log(challenge.creator.username); // nested fields too!

// ✅ TypeScript validates mutation variables
await challengeService.createChallenge({
  creator_id: "123",
  title: "Test",
  start_date: new Date(),
  end_date: new Date(),
  // TypeScript error if you forget required fields!
});

// ❌ TypeScript catches errors
await challengeService.createChallenge({
  wrong_field: "value" // Error: unknown property
});
```

## React Query Features

```typescript
function ChallengeList() {
  const {
    data: challenges,
    isLoading,
    isError,
    error,
    refetch,
  } = useChallenges();

  const createMutation = useCreateChallenge();

  // Automatic cache updates after mutations
  const handleCreate = async (data) => {
    await createMutation.mutateAsync(data);
    // Cache is automatically invalidated and refetched!
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {challenges?.map(challenge => (
        <div key={challenge.id}>{challenge.title}</div>
      ))}
    </div>
  );
}
```

## Authentication

```typescript
import { setAuthToken } from './graphql/client';

// Set the token (usually in your auth context)
const { data: session } = await supabase.auth.getSession();
if (session?.access_token) {
  setAuthToken(session.access_token);
}

// Now all GraphQL requests will include the auth token
```

## Regenerating Types

Whenever you:
- Add new GraphQL queries/mutations
- Modify existing operations
- Backend schema changes

Run:
```bash
npm run generate
```

This will:
1. Fetch the latest schema from the backend
2. Validate your operations
3. Generate new TypeScript types
4. Update the SDK

## File Organization

```
src/graphql/
├── queries/          # GraphQL queries (.graphql.ts files)
├── mutations/        # GraphQL mutations (.graphql.ts files)
├── services/         # Service layer (business logic)
├── hooks/           # React Query hooks
├── client.ts        # GraphQL client setup
└── index.ts         # Public API exports
```

## Tips

1. **Always use fragments** for reusable field selections
2. **Service layer** for non-React code (utilities, etc.)
3. **React Query hooks** for React components
4. **Run `npm run generate`** after schema changes
5. **Check TypeScript errors** - they catch issues early!
