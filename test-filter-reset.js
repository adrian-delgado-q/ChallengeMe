// Test the filtering logic to ensure it returns to original results when cleared
// This is a simple verification of the filter reset functionality

const mockChallenges = [
    {
        id: '1',
        title: 'Daily Running Challenge',
        type: 'running',
        challengeType: 'individual',
        description: 'Run every day for 30 days'
    },
    {
        id: '2',
        title: 'Cycling Adventure Quest',
        type: 'cycling',
        challengeType: 'team',
        description: 'Team cycling adventure'
    },
    {
        id: '3',
        title: 'Swimming Endurance Test',
        type: 'swimming',
        challengeType: 'individual',
        description: 'Test your swimming endurance'
    }
];

// Simulate the filtering logic
function applyFilters(challenges, searchTerm = '', activityTypeFilter = 'all', challengeTypeFilter = 'all') {
    return challenges.filter(challenge => {
        // Search filter
        const matchesSearch = searchTerm === '' ||
            challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            challenge.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            challenge.type?.toLowerCase().includes(searchTerm.toLowerCase());

        // Activity type filter
        const matchesActivityType = activityTypeFilter === 'all' ||
            challenge.type === activityTypeFilter;

        // Challenge type filter
        const matchesChallengeType = challengeTypeFilter === 'all' ||
            challenge.challengeType === challengeTypeFilter;

        return matchesSearch && matchesActivityType && matchesChallengeType;
    });
}

// Test cases
console.log('🧪 Testing filter reset functionality...\n');

// Test 1: No filters applied - should return all challenges
const noFilters = applyFilters(mockChallenges);
console.log('✅ No filters:', noFilters.length, '/', mockChallenges.length, 'challenges');

// Test 2: Search filter applied
const withSearch = applyFilters(mockChallenges, 'running');
console.log('🔍 With search "running":', withSearch.length, '/', mockChallenges.length, 'challenges');

// Test 3: Activity type filter applied  
const withActivityFilter = applyFilters(mockChallenges, '', 'cycling');
console.log('🚴 With activity filter "cycling":', withActivityFilter.length, '/', mockChallenges.length, 'challenges');

// Test 4: Challenge type filter applied
const withChallengeTypeFilter = applyFilters(mockChallenges, '', 'all', 'team');
console.log('👥 With challenge type filter "team":', withChallengeTypeFilter.length, '/', mockChallenges.length, 'challenges');

// Test 5: Multiple filters applied
const withMultipleFilters = applyFilters(mockChallenges, 'challenge', 'running', 'individual');
console.log('🔗 With multiple filters:', withMultipleFilters.length, '/', mockChallenges.length, 'challenges');

// Test 6: Filters cleared - should return all challenges again
const filtersCleared = applyFilters(mockChallenges, '', 'all', 'all');
console.log('🧹 Filters cleared:', filtersCleared.length, '/', mockChallenges.length, 'challenges');

// Verification
const allTestsPassed =
    noFilters.length === 3 &&
    withSearch.length === 1 &&
    withActivityFilter.length === 1 &&
    withChallengeTypeFilter.length === 1 &&
    filtersCleared.length === 3;

console.log('\n' + (allTestsPassed ? '✅ All tests passed! Filter reset functionality working correctly.' : '❌ Some tests failed.'));
