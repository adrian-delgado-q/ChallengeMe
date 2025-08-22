import { PrismaClient, TeamRole, ChallengeParticipantType } from '../../prisma/prisma-generated-client/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const userIds = [
    "a7fff1cc-7bb3-42f0-a9ae-b5ab20561e76",
    "0e6c0881-f6d4-4ad5-a25e-e77ddf2286b2",
    "7418754c-f62e-4613-a866-5800d38d8c8f",
    "2ff8dc27-4efa-4477-8bd9-490b7030b282"
  ];

  // --- 1. Create or Update Profiles with Usernames and Avatars ---
  const profiles = [];
  for (const userId of userIds) {
    try {
      // Try to update existing profile
      const updatedProfile = await prisma.profile.update({
        where: { id: userId },
        data: {
          username: faker.internet.username(),
          avatarUrl: faker.image.avatar(),
        },
      });
      profiles.push(updatedProfile);
    } catch (error) {
      // If profile doesn't exist, create it
      const newProfile = await prisma.profile.create({
        data: {
          id: userId,
          username: faker.internet.username(),
          avatarUrl: faker.image.avatar(),
        },
      });
      profiles.push(newProfile);
    }
  }
  console.log(`Created/Updated ${profiles.length} profiles.`);


  // --- 2. Create Teams ---
  const teams = [];
  for (let i = 0; i < 5; i++) {
    const team = await prisma.team.create({
      data: {
        creatorId: faker.helpers.arrayElement(profiles).id,
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        avatarUrl: faker.image.avatar(),
        isPublic: faker.datatype.boolean(),
      },
    });
    teams.push(team);
  }
  console.log(`Created ${teams.length} teams.`);

  // --- 3. Create Team Memberships ---
  const teamMemberships = [];
  for (let i = 0; i < 5; i++) {
    const team = faker.helpers.arrayElement(teams);
    const user = faker.helpers.arrayElement(profiles);

    const existingMembership = await prisma.teamMembership.findUnique({
        where: { teamId_userId: { teamId: team.id, userId: user.id } },
    });

    if (!existingMembership) {
        const membership = await prisma.teamMembership.create({
            data: {
                teamId: team.id,
                userId: user.id,
                role: faker.helpers.arrayElement(Object.values(TeamRole)),
            },
        });
        teamMemberships.push(membership);
    }
  }
  console.log(`Created ${teamMemberships.length} team memberships.`);


  // --- 4. Create Challenges ---
  const challenges = [];
  const challengeTitles = [
    'Daily Running Challenge',
    'Cycling Adventure Quest', 
    'Swimming Endurance Test',
    'Strength Training Bootcamp',
    'Walking Wellness Journey'
  ];
  
  // Get activity types to assign to challenges
  const allActivityTypes = await prisma.activityType.findMany();
  const runningType = allActivityTypes.find(at => at.name === 'Running');
  const cyclingType = allActivityTypes.find(at => at.name === 'Cycling');
  const swimmingType = allActivityTypes.find(at => at.name === 'Swimming');
  const strengthTypes = allActivityTypes.filter(at => ['Weight Lifting', 'Push-ups', 'Pull-ups', 'Squats'].includes(at.name));
  const walkingType = allActivityTypes.find(at => at.name === 'Walking');
  
  for (let i = 0; i < 5; i++) {
    const startDate = faker.date.soon();
    const challenge = await prisma.challenge.create({
      data: {
        creatorId: faker.helpers.arrayElement(profiles).id,
        title: challengeTitles[i] || faker.lorem.words(3),
        description: faker.lorem.sentence(),
        challengeType: faker.helpers.arrayElement(Object.values(ChallengeParticipantType)),
        maxParticipants: faker.number.int({ min: 10, max: 100 }),
        startDate: startDate,
        endDate: faker.date.future({ refDate: startDate }),
        isPublic: faker.datatype.boolean(),
      },
    });
    challenges.push(challenge);
    
    // Assign activity types to challenges based on title
    let challengeActivityTypes: any[] = [];
    switch (challengeTitles[i]) {
      case 'Daily Running Challenge':
        if (runningType) challengeActivityTypes = [runningType];
        break;
      case 'Cycling Adventure Quest':
        if (cyclingType) challengeActivityTypes = [cyclingType];
        break;
      case 'Swimming Endurance Test':
        if (swimmingType) challengeActivityTypes = [swimmingType];
        break;
      case 'Strength Training Bootcamp':
        challengeActivityTypes = strengthTypes;
        break;
      case 'Walking Wellness Journey':
        if (walkingType) challengeActivityTypes = [walkingType];
        break;
    }
    
    // Create ChallengeActivityType relationships
    for (const activityType of challengeActivityTypes) {
      await prisma.challengeActivityType.create({
        data: {
          challengeId: challenge.id,
          activityTypeId: activityType.id,
        },
      });
    }
  }
  console.log(`Created ${challenges.length} challenges.`);

  // --- 5. Create Challenge Participants ---
  const challengeParticipants = [];
    for (let i = 0; i < 5; i++) {
        const challenge = faker.helpers.arrayElement(challenges);
        let participant;

        if (challenge.challengeType === 'INDIVIDUAL') {
            const user = faker.helpers.arrayElement(profiles);
            const existingParticipant = await prisma.challengeParticipant.findFirst({
                where: { challengeId: challenge.id, userId: user.id },
            });
            if (!existingParticipant) {
                 participant = await prisma.challengeParticipant.create({
                    data: {
                        challengeId: challenge.id,
                        userId: user.id,
                    },
                });
                challengeParticipants.push(participant);
            }
        } else { // TEAM challenge
            const team = faker.helpers.arrayElement(teams);
            const existingParticipant = await prisma.challengeParticipant.findFirst({
                where: { challengeId: challenge.id, teamId: team.id },
            });
            if (!existingParticipant) {
                participant = await prisma.challengeParticipant.create({
                    data: {
                        challengeId: challenge.id,
                        teamId: team.id,
                    },
                });
                challengeParticipants.push(participant);
            }
        }
    }
  console.log(`Created ${challengeParticipants.length} challenge participants.`);


  // --- 6. Create Activities ---
  // Use the activity types we already fetched
  const activities = [];
  for (let i = 0; i < 20; i++) {
    const participant = faker.helpers.arrayElement(challengeParticipants);
    const activityType = faker.helpers.arrayElement(allActivityTypes);
    
    // Generate appropriate value based on activity type
    let value: number;
    switch (activityType.unit) {
      case 'km':
        value = faker.number.float({ min: 1, max: 20, fractionDigits: 1 });
        break;
      case 'minutes':
        value = faker.number.int({ min: 10, max: 120 });
        break;
      case 'reps':
        value = faker.number.int({ min: 10, max: 100 });
        break;
      case 'kg':
        value = faker.number.int({ min: 20, max: 150 });
        break;
      case 'steps':
        value = faker.number.int({ min: 1000, max: 15000 });
        break;
      default:
        value = faker.number.int({ min: 1, max: 100 });
    }
    
    const activity = await prisma.activity.create({
      data: {
        participantId: participant.id,
        activityTypeId: activityType.id,
        value: value,
        notes: faker.lorem.sentence(),
        date: faker.date.recent({ days: 30 }),
        profileId: participant.userId,
        challengeId: participant.challengeId,
      },
    });
    activities.push(activity);
  }
  console.log(`Created ${activities.length} activities.`);


  // --- 7. Create Posts ---
  const posts = [];
    for (let i = 0; i < 5; i++) {
        const participant = faker.helpers.arrayElement(challengeParticipants);
        const post = await prisma.post.create({
            data: {
                participantId: participant.id,
                content: faker.lorem.paragraph(),
                imageUrl: faker.image.url(),
                profileId: participant.userId,
                challengeId: participant.challengeId,
            },
        });
        posts.push(post);
    }
  console.log(`Created ${posts.length} posts.`);

  // --- 8. Create Comments ---
  const comments = [];
    for (let i = 0; i < 5; i++) {
        const comment = await prisma.comment.create({
            data: {
                authorId: faker.helpers.arrayElement(profiles).id,
                postId: faker.helpers.arrayElement(posts).id,
                content: faker.lorem.sentence(),
            },
        });
        comments.push(comment);
    }
  console.log(`Created ${comments.length} comments.`);

  // --- 9. Create Milestones ---
  const milestones = [];
  
  // Create milestones for each challenge based on its supported activity types
  for (const challenge of challenges) {
    // Get the activity types for this challenge
    const challengeActivityTypes = await prisma.challengeActivityType.findMany({
      where: { challengeId: challenge.id },
      include: { activityType: true }
    });
    
    if (challengeActivityTypes.length > 0) {
      // Create milestones for the first activity type of each challenge
      const primaryActivityType = challengeActivityTypes[0].activityType;
      
      const milestoneTemplates = [
        { name: 'First Steps', targetValue: 10, order: 1 },
        { name: 'Getting Started', targetValue: 25, order: 2 },
        { name: 'Making Progress', targetValue: 50, order: 3 },
        { name: 'Champion Level', targetValue: 100, order: 4 }
      ];
      
      for (const template of milestoneTemplates) {
        const milestone = await prisma.milestone.create({
          data: {
            challengeId: challenge.id,
            activityTypeId: primaryActivityType.id,
            name: template.name,
            description: `Achieve ${template.targetValue} ${primaryActivityType.unitLabel} in this challenge`,
            targetValue: template.targetValue,
            order: template.order
          }
        });
        milestones.push(milestone);
      }
    }
  }
  console.log(`Created ${milestones.length} milestones.`);

  // --- 10. Create Milestone Progress ---
  const milestoneProgress = [];
  for (const milestone of milestones) {
    // Find participants for this challenge
    const challengeParticipantsForMilestone = challengeParticipants.filter(
      p => p.challengeId === milestone.challengeId
    );
    
    for (const participant of challengeParticipantsForMilestone) {
      // Generate some random progress
      const currentValue = Math.floor(Math.random() * (milestone.targetValue + 20));
      const isAchieved = currentValue >= milestone.targetValue;
      
      const progress = await prisma.milestoneProgress.create({
        data: {
          milestoneId: milestone.id,
          participantId: participant.id,
          currentValue: currentValue,
          isAchieved: isAchieved,
          achievedAt: isAchieved ? faker.date.recent() : null
        }
      });
      milestoneProgress.push(progress);
    }
  }
  console.log(`Created ${milestoneProgress.length} milestone progress records.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:');
    console.error(e);
    if (e.code) {
      console.error(`Prisma Error Code: ${e.code}`);
      console.error(e.meta);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });