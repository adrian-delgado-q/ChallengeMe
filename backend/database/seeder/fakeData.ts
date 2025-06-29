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

  // --- 1. Update Profiles with Usernames and Avatars ---
  const profiles = [];
  for (const userId of userIds) {
    const updatedProfile = await prisma.profile.update({
      where: { id: userId },
      data: {
        username: faker.internet.username(),
        avatarUrl: faker.image.avatar(),
      },
    });
    profiles.push(updatedProfile);
  }
  console.log(`Updated ${profiles.length} profiles.`);


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
  for (let i = 0; i < 5; i++) {
    const startDate = faker.date.soon();
    const challenge = await prisma.challenge.create({
      data: {
        creatorId: faker.helpers.arrayElement(profiles).id,
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