import { PrismaClient } from '../prisma/prisma-generated-client/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createTestChallenge() {
  console.log('🧪 Creating test challenge with enhanced milestones...\n');

  try {
    // Get some activity types
    const activityTypes = await prisma.activityType.findMany({
      where: {
        name: { in: ['Running', 'Cycling', 'Push-ups'] }
      }
    });

    if (activityTypes.length === 0) {
      console.error('❌ No activity types found. Make sure to run the activity types seeder first.');
      return;
    }

    console.log(`Found ${activityTypes.length} activity types:`);
    activityTypes.forEach(at => console.log(`  - ${at.name} (${at.unitLabel})`));
    console.log();

    // Get a test user (first one in the database)
    const profiles = await prisma.profile.findMany({ take: 1 });
    if (profiles.length === 0) {
      console.error('❌ No profiles found. Make sure to run the seeder first.');
      return;
    }

    const testUser = profiles[0];
    console.log(`Using test user: ${testUser.username || testUser.id}`);

    // Create a test challenge
    const challenge = await prisma.challenge.create({
      data: {
        creatorId: testUser.id,
        title: 'Multi-Activity Fitness Challenge',
        description: 'A comprehensive fitness challenge combining running, cycling, and strength training.',
        challengeType: 'INDIVIDUAL',
        maxParticipants: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isPublic: true,
      }
    });

    console.log(`✅ Created challenge: ${challenge.title} (ID: ${challenge.id})`);

    // Create ChallengeActivityType relationships
    for (const activityType of activityTypes) {
      await prisma.challengeActivityType.create({
        data: {
          challengeId: challenge.id,
          activityTypeId: activityType.id,
        }
      });
      console.log(`✅ Added activity type: ${activityType.name}`);
    }

    // Create milestones for each activity type
    const milestoneTemplates = [
      { name: 'Beginner', order: 1 },
      { name: 'Intermediate', order: 2 },
      { name: 'Advanced', order: 3 },
      { name: 'Expert', order: 4 }
    ];

    for (const activityType of activityTypes) {
      // Different target values based on activity type
      let targetValues: number[];
      switch (activityType.name) {
        case 'Running':
          targetValues = [5, 15, 30, 50]; // km
          break;
        case 'Cycling':
          targetValues = [10, 25, 50, 100]; // km
          break;
        case 'Push-ups':
          targetValues = [50, 150, 300, 500]; // reps
          break;
        default:
          targetValues = [10, 25, 50, 100];
      }

      for (let i = 0; i < milestoneTemplates.length; i++) {
        const template = milestoneTemplates[i];
        const milestone = await prisma.milestone.create({
          data: {
            challengeId: challenge.id,
            activityTypeId: activityType.id,
            name: `${activityType.name} ${template.name}`,
            description: `Achieve ${targetValues[i]} ${activityType.unitLabel} of ${activityType.name.toLowerCase()}`,
            targetValue: targetValues[i],
            order: template.order,
          }
        });
        console.log(`✅ Created milestone: ${milestone.name} (${milestone.targetValue} ${activityType.unit})`);
      }
    }

    // Create a participant for the test user
    const participant = await prisma.challengeParticipant.create({
      data: {
        challengeId: challenge.id,
        userId: testUser.id,
      }
    });

    console.log(`✅ Added ${testUser.username} as participant`);

    // Create some test activities
    const testActivities = [
      { activityTypeId: activityTypes.find(at => at.name === 'Running')?.id, value: 3.5 },
      { activityTypeId: activityTypes.find(at => at.name === 'Running')?.id, value: 5.2 },
      { activityTypeId: activityTypes.find(at => at.name === 'Cycling')?.id, value: 12.0 },
      { activityTypeId: activityTypes.find(at => at.name === 'Push-ups')?.id, value: 25 },
      { activityTypeId: activityTypes.find(at => at.name === 'Push-ups')?.id, value: 30 },
    ];

    for (const activityData of testActivities) {
      if (activityData.activityTypeId) {
        const activity = await prisma.activity.create({
          data: {
            participantId: participant.id,
            activityTypeId: activityData.activityTypeId,
            value: activityData.value,
            notes: 'Test activity',
            date: new Date(),
            profileId: testUser.id,
            challengeId: challenge.id,
          }
        });
        
        const activityType = activityTypes.find(at => at.id === activityData.activityTypeId);
        console.log(`✅ Created activity: ${activityData.value} ${activityType?.unit} ${activityType?.name}`);
      }
    }

    console.log(`\n🎉 Test challenge created successfully!`);
    console.log(`Challenge ID: ${challenge.id}`);
    console.log(`Visit: http://localhost:5173/challenge/${challenge.id}`);

  } catch (error) {
    console.error('❌ Failed to create test challenge:', error);
  }
}

createTestChallenge()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
