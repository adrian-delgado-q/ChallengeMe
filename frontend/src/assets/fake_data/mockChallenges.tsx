import { Challenge } from '../../types/index';

export const mockChallenges: Challenge[] = [
    { id: 1, title: 'June Running Challenge', type: 'Running', participants: 42, endDate: '2025-06-30', progress: 75, isPublic: true, milestones: [{ name: "M1", value: 50 }], rules: { minDuration: 30, minRepetitions: 5 }, challengeType: 'individual' },
    { id: 2, title: 'Community Stair Climb', type: 'Stair Climbing', participants: 18, endDate: '2025-07-15', progress: 40, isPublic: true, milestones: [{ name: "M1", value: 1000 }], rules: { minDuration: 20, minRepetitions: 10 }, challengeType: 'individual' },
    { id: 3, title: 'Summer Biking Club', type: 'Biking',  participants: 89, endDate: '2025-08-31', progress: 60, isPublic: true, milestones: [{ name: "M1", value: 250 }], rules: { minDuration: 60, minRepetitions: 3 }, challengeType: 'individual' },
    { id: 4, title: 'Private: Team Wellness', type: 'Walking', participants: 5, endDate: '2025-06-20', progress: 90, isPublic: false, milestones: [{ name: "M1", value: 500000 }], rules: { minDuration: 15, minRepetitions: 20 }, challengeType: 'individual' },
    { id: 5, title: 'Yoga for Beginners', type: 'Yoga', participants: 25, endDate: '2025-07-01', progress: 20, isPublic: true, milestones: [{ name: "M1", value: 15 }], rules: { minDuration: 10, minRepetitions: 1 }, challengeType: 'team' },
];

export const existingChallengeData: Challenge = {
    id: 1,
    title: "June Running Challenge",
    type: "Running",
    participants: 42,
    maxParticipants: 50,
    endDate: "2025-06-30",
    progress: 75,
    isPublic: true,
    milestones: [
        { name: 'Warm-up', value: 25 },
        { name: 'Halfway', value: 50 },
        { name: 'Finish Line', value: 100 },
    ],
    rules: {
        minDuration: 20
    },
    challengeType: 'individual' // Assuming this is a new field in Challenge
};