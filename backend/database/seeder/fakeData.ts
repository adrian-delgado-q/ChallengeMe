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
  const activities = [];
    for (let i = 0; i < 5; i++) {
        const participant = faker.helpers.arrayElement(challengeParticipants);
        const activity = await prisma.activity.create({
            data: {
                participantId: participant.id,
                notes: faker.lorem.sentence(),
                date: faker.date.recent(),
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
  const milestoneTemplates: Record<string, Array<{ name: string; targetValue: number; valueType: string; order: number }>> = {
    'Daily Running Challenge': [
      { name: 'First Steps', targetValue: 10, valueType: 'activities', order: 1 },
      { name: 'Bronze Runner', targetValue: 50, valueType: 'activities', order: 2 },
      { name: 'Silver Sprinter', targetValue: 100, valueType: 'activities', order: 3 },
      { name: 'Gold Marathon', targetValue: 200, valueType: 'activities', order: 4 }
    ],
    'Cycling Adventure Quest': [
      { name: 'Cyclist', targetValue: 30, valueType: 'activities', order: 1 },
      { name: 'Road Rider', targetValue: 80, valueType: 'activities', order: 2 },
      { name: 'Tour Champion', targetValue: 160, valueType: 'activities', order: 3 }
    ],
    'Swimming Endurance Test': [
      { name: 'Paddler', targetValue: 20, valueType: 'activities', order: 1 },
      { name: 'Swimmer', targetValue: 60, valueType: 'activities', order: 2 },
      { name: 'Aquatic Ace', targetValue: 120, valueType: 'activities', order: 3 }
    ],
    'Strength Training Bootcamp': [
      { name: 'Beginner', targetValue: 15, valueType: 'activities', order: 1 },
      { name: 'Lifter', targetValue: 45, valueType: 'activities', order: 2 },
      { name: 'Strong', targetValue: 90, valueType: 'activities', order: 3 },
      { name: 'Beast Mode', targetValue: 180, valueType: 'activities', order: 4 }
    ],
    'Walking Wellness Journey': [
      { name: 'Walker', targetValue: 25, valueType: 'activities', order: 1 },
      { name: 'Strider', targetValue: 75, valueType: 'activities', order: 2 },
      { name: 'Trekker', targetValue: 150, valueType: 'activities', order: 3 }
    ]
  };

  for (const challenge of challenges) {
    const milestoneTemplate = milestoneTemplates[challenge.title];
    if (milestoneTemplate) {
      for (const template of milestoneTemplate) {
        const milestone = await prisma.milestone.create({
          data: {
            challengeId: challenge.id,
            name: template.name,
            description: `Achieve ${template.targetValue} ${template.valueType} in this challenge`,
            targetValue: template.targetValue,
            valueType: template.valueType,
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