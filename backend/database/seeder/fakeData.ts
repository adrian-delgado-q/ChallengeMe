import { PrismaClient, TeamRole, ChallengeParticipantType } from '../../prisma/prisma-generated-client/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const userIds = [
    'dd614143-a59e-4afc-b1e8-47396c8fdf2f',
    'e039c87e-64c5-422c-b517-b984833002e0',
    '77df9004-7718-4262-a13e-d7f3dc08b310',
    '7d2b1640-a8fe-42b3-b9f9-d901a47ba652',
    'd1ec571c-43a3-4ceb-be10-c55d9095ae91',
  ];

  // --- 1. Create Teams ---
  const teams = [];
  for (let i = 0; i < 10; i++) {
    let insertingData = {
      creatorId: faker.helpers.arrayElement(userIds),
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      avatarUrl: faker.image.avatar(),
      isPublic: faker.datatype.boolean(),
    }
    console.log(`Creating team ${i + 1}:`, insertingData);
    const team = await prisma.team.create({
      data: insertingData,
    });
    teams.push(team);
  }
  console.log(`Created ${teams.length} teams.`);

  // --- 2. Create Team Memberships ---
  const teamMemberships = [];
  for (let i = 0; i < 10; i++) {
    // Ensure unique team-user combination
    const team = faker.helpers.arrayElement(teams);
    const user = faker.helpers.arrayElement(userIds);

    const existingMembership = await prisma.teamMembership.findUnique({
      where: { teamId_userId: { teamId: team.id, userId: user } },
    });

    if (!existingMembership) {
      const membership = await prisma.teamMembership.create({
        data: {
          teamId: team.id,
          userId: user,
          role: faker.helpers.arrayElement(Object.values(TeamRole)),
        },
      });
      teamMemberships.push(membership);
    }
  }
  console.log(`Created ${teamMemberships.length} team memberships.`);

  // --- 3. Create Challenges ---
  const challenges = [];
  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.soon();
    const challenge = await prisma.challenge.create({
      data: {
        creatorId: faker.helpers.arrayElement(userIds),
        title: faker.lorem.words(3),
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

  // --- 4. Create Challenge Participants ---
  const challengeParticipants = [];
  for (const challenge of challenges) {
    if (challenge.challengeType === 'INDIVIDUAL') {
      const participant = await prisma.challengeParticipant.create({
        data: {
          challengeId: challenge.id,
          userId: faker.helpers.arrayElement(userIds),
        },
      });
      challengeParticipants.push(participant);
    } else { // TEAM challenge
      const participant = await prisma.challengeParticipant.create({
        data: {
          challengeId: challenge.id,
          teamId: faker.helpers.arrayElement(teams).id,
        },
      });
      challengeParticipants.push(participant);
    }
  }
  console.log(`Created ${challengeParticipants.length} challenge participants.`);

  // --- 5. Create Activities ---
  const activities = [];
  for (let i = 0; i < 10; i++) {
    const participant = faker.helpers.arrayElement(challengeParticipants);
    const activity = await prisma.activity.create({
      data: {
        participantId: participant.id,
        notes: faker.lorem.sentence(),
        date: faker.date.recent(),
        userId: participant.userId,
        challengeId: participant.challengeId,
      },
    });
    activities.push(activity);
  }
  console.log(`Created ${activities.length} activities.`);

  // --- 6. Create Posts ---
  const posts = [];
  for (let i = 0; i < 10; i++) {
    const participant = faker.helpers.arrayElement(challengeParticipants);
    const post = await prisma.post.create({
      data: {
        participantId: participant.id,
        content: faker.lorem.paragraph(),
        imageUrl: faker.image.url(),
        userId: participant.userId,
        challengeId: participant.challengeId,
      },
    });
    posts.push(post);
  }
  console.log(`Created ${posts.length} posts.`);

  // --- 7. Create Comments ---
  const comments = [];
  for (let i = 0; i < 10; i++) {
    const comment = await prisma.comment.create({
      data: {
        authorId: faker.helpers.arrayElement(userIds),
        postId: faker.helpers.arrayElement(posts).id,
        content: faker.lorem.sentence(),
      },
    });
    comments.push(comment);
  }
  console.log(`Created ${comments.length} comments.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('An error occurred during seeding:');
    console.error(e);
    // Add this to see more details from Prisma's error object
    if (e.code) {
      console.error(`Prisma Error Code: ${e.code}`);
      console.error(e.meta);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
