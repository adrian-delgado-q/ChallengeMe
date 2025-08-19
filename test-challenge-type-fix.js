// Test file to verify challengeType conversion
// This would simulate the database response and our conversion

const mockDatabaseResponse = {
    id: "test-123",
    title: "Test Challenge",
    challengeType: "INDIVIDUAL", // Database format (uppercase)
    isPublic: true,
    participants: 5
};

const mockDatabaseResponseTeam = {
    id: "test-456",
    title: "Team Challenge",
    challengeType: "TEAM", // Database format (uppercase)
    isPublic: true,
    participants: 3
};

// Simulate our conversion logic
const convertedIndividual = {
    ...mockDatabaseResponse,
    challengeType: mockDatabaseResponse.challengeType?.toLowerCase()
};

const convertedTeam = {
    ...mockDatabaseResponseTeam,
    challengeType: mockDatabaseResponseTeam.challengeType?.toLowerCase()
};

console.log("Individual Challenge:");
console.log("Database:", mockDatabaseResponse.challengeType);
console.log("Frontend:", convertedIndividual.challengeType);
console.log("Expected: 'individual'");
console.log("");

console.log("Team Challenge:");
console.log("Database:", mockDatabaseResponseTeam.challengeType);
console.log("Frontend:", convertedTeam.challengeType);
console.log("Expected: 'team'");

// Verify the conversion works for ChallengeCard logic
console.log("");
console.log("ChallengeCard Logic Test:");
console.log("Individual challenge tag color:", convertedIndividual.challengeType === 'team' ? 'purple' : 'blue');
console.log("Individual challenge text:", convertedIndividual.challengeType === 'team' ? 'Team' : 'Individual');
console.log("Team challenge tag color:", convertedTeam.challengeType === 'team' ? 'purple' : 'blue');
console.log("Team challenge text:", convertedTeam.challengeType === 'team' ? 'Team' : 'Individual');
