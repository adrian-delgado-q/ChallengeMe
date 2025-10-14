/**
 * Simple test script to verify GraphQL requests are working
 * Run with: npm run test:graphql
 */

import { challengeService } from '../services/challengeService';
import { sdk } from '../client';

async function testGraphQLRequests() {
  console.log('🚀 Testing GraphQL Requests...\n');

  try {
    // Test 1: Fetch all public challenges
    console.log('📋 Test 1: Fetching public challenges...');
    const publicChallenges = await challengeService.getPublicChallenges();
    console.log(`✅ Found ${publicChallenges?.length || 0} public challenges`);
    if (publicChallenges && publicChallenges.length > 0) {
      console.log('   First challenge:', publicChallenges[0].title);
    }
    console.log('');

    // Test 2: Fetch all challenges with filters
    console.log('📋 Test 2: Fetching all challenges...');
    const allChallenges = await challengeService.getChallenges();
    console.log(`✅ Found ${allChallenges?.length || 0} total challenges`);
    console.log('');

    // Test 3: Fetch a specific challenge (if any exist)
    if (allChallenges && allChallenges.length > 0) {
      const firstChallengeId = allChallenges[0].id;
      console.log(`📋 Test 3: Fetching challenge with ID: ${firstChallengeId}...`);
      const challenge = await challengeService.getChallenge(firstChallengeId!);
      
      if (challenge) {
        console.log('✅ Challenge details:');
        console.log(`   Title: ${challenge.title}`);
        console.log(`   Type: ${challenge.challenge_type}`);
        console.log(`   Participants: ${challenge.participant_count}`);
        console.log(`   Start: ${challenge.start_date}`);
        console.log(`   End: ${challenge.end_date}`);
        if (challenge.creator) {
          console.log(`   Creator: ${challenge.creator.username}`);
        }
        if (challenge.milestones && challenge.milestones.length > 0) {
          console.log(`   Milestones: ${challenge.milestones.length}`);
        }
      }
      console.log('');
    }

    // Test 4: Direct SDK usage
    console.log('📋 Test 4: Testing direct SDK usage...');
    const sdkResult = await sdk.GetChallenges({ is_public: true });
    console.log(`✅ SDK returned ${sdkResult.challenges?.length || 0} public challenges`);
    console.log('');

    // Summary
    console.log('🎉 All GraphQL tests passed successfully!');
    console.log('\n✨ Your GraphQL setup is working correctly!');
    console.log('\nNext steps:');
    console.log('1. Start migrating components from Supabase to GraphQL');
    console.log('2. Use challengeService for data fetching');
    console.log('3. Use React Query hooks in components');
    console.log('4. Run "npm run generate" when you add new queries/mutations');

  } catch (error: any) {
    console.error('\n❌ GraphQL Test Failed!');
    console.error('Error:', error.message);
    
    if (error.response?.errors) {
      console.error('\nGraphQL Errors:');
      error.response.errors.forEach((err: any, index: number) => {
        console.error(`  ${index + 1}. ${err.message}`);
        if (err.extensions) {
          console.error('     Extensions:', JSON.stringify(err.extensions, null, 2));
        }
      });
    }

    console.error('\nTroubleshooting:');
    console.error('1. Make sure the backend GraphQL server is running');
    console.error('2. Check the GraphQL endpoint in your .env file');
    console.error('3. Verify the VITE_GRAPHQL_HTTP_HOST and VITE_GRAPHQL_HTTP_PORT variables');
    console.error('4. Check the backend logs for errors');
    
    process.exit(1);
  }
}

// Run the tests
testGraphQLRequests();
