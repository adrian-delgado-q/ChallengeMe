// Test script to verify challenge data with milestones
import { ChallengeService } from '../frontend/src/graphql/services/challengeService.js';

async function testChallengeData() {
    try {
        console.log('Testing challenge data...');
        
        // Test getChallenges
        const challenges = await ChallengeService.getChallenges();
        console.log('Challenges:', challenges?.length);
        
        if (challenges && challenges.length > 0) {
            const firstChallenge = challenges[0];
            console.log('First challenge:');
            console.log('- Title:', firstChallenge.title);
            console.log('- Type:', firstChallenge.type);
            console.log('- Challenge Type:', firstChallenge.challengeType);
            console.log('- Milestones:', firstChallenge.milestones?.length);
            console.log('- Progress:', firstChallenge.progress);
            
            if (firstChallenge.milestones && firstChallenge.milestones.length > 0) {
                console.log('- Milestone details:', firstChallenge.milestones);
            }
        }
        
    } catch (error) {
        console.error('Error testing challenge data:', error);
    }
}

testChallengeData();
