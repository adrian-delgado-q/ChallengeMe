import {
	PrismaClient,
	Profile,
	ActivityType,
	Team,
	Challenge,
	ChallengeParticipant,
	Post,
	DiscussionPost,
} from '../../prisma/prisma-generated-client/client';
import { faker } from '@faker-js/faker';
import activityTypes from './activityTypes';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding...');

	// 1. Create Users (Profiles)
	const users: Profile[] = await Promise.all(
		Array.from({ length: 10 }).map(() =>
			prisma.profile.create({
				data: {
					id: faker.string.uuid(),
					username: faker.internet.userName(),
					avatarUrl: faker.image.avatar(),
				},
			})
		)
	);
	console.log(`${users.length} users created.`);

	// 2. Create ActivityTypes
	console.log(`${activityTypes.length} activity types imported`);

	// 3. Create Challenges
	const challenges: Challenge[] = await Promise.all(
		Array.from({ length: 5 }).map(() =>
			prisma.challenge.create({
				data: {
					creatorId: (faker.helpers.arrayElement(users) as Profile).id,
					title: faker.lorem.words(3),
					description: faker.lorem.sentence(),
					instructions: faker.lorem.paragraph(),
					imageUrl: faker.image.url(),
					challengeType: faker.helpers.arrayElement(['INDIVIDUAL', 'TEAM']),
					startDate: faker.date.past(),
					endDate: faker.date.future(),
					isPublic: faker.datatype.boolean(),
					status: 'ACTIVE',
				},
			})
		)
	);
	console.log(`${challenges.length} challenges created.`);

	// 4. Create Teams
	const teams: Team[] = await Promise.all(
		Array.from({ length: 3 }).map(() =>
			prisma.team.create({
				data: {
					creatorId: (faker.helpers.arrayElement(users) as Profile).id,
					name: faker.company.name(),
					description: faker.lorem.sentence(),
					avatarUrl: faker.image.url(),
					isPublic: faker.datatype.boolean(),
					sportsTypes: [(faker.helpers.arrayElement(activityTypes) as ActivityType).name],
				},
			})
		)
	);
	console.log(`${teams.length} teams created.`);

	// 5. Create Team Memberships
	for (const team of teams) {
		const members = faker.helpers.arrayElements(
			users,
			faker.number.int({ min: 1, max: 5 })
		) as Profile[];
		for (const member of members) {
			await prisma.teamMembership.create({
				data: {
					teamId: team.id,
					userId: member.id,
					role: faker.helpers.arrayElement(['ADMIN', 'MEMBER']),
				},
			});
		}
	}
	console.log('Team memberships created.');

	// 6. Create Challenge Participants
	for (const challenge of challenges) {
		if (challenge.challengeType === 'INDIVIDUAL') {
			const participants = faker.helpers.arrayElements(
				users,
				faker.number.int({ min: 1, max: 3 })
			) as Profile[];
			for (const participant of participants) {
				await prisma.challengeParticipant.create({
					data: {
						challengeId: challenge.id,
						userId: participant.id,
					},
				});
			}
		} else {
			const participatingTeams = faker.helpers.arrayElements(
				teams,
				faker.number.int({ min: 1, max: 2 })
			) as Team[];
			for (const team of participatingTeams) {
				await prisma.challengeParticipant.create({
					data: {
						challengeId: challenge.id,
						teamId: team.id,
					},
				});
			}
		}
	}
	console.log('Challenge participants created.');

	// 7. Create Milestones
	for (const challenge of challenges) {
		const milestoneCount = faker.number.int({ min: 1, max: 3 });
		for (let i = 0; i < milestoneCount; i++) {
			await prisma.milestone.create({
				data: {
					challengeId: challenge.id,
					activityTypeId: (faker.helpers.arrayElement(activityTypes) as ActivityType).id,
					name: faker.lorem.words(2),
					description: faker.lorem.sentence(),
					targetValue: faker.number.int({ min: 10, max: 1000 }),
					order: i + 1,
				},
			});
		}
	}
	console.log('Milestones created.');

	// 8. Create Activities
	const challengeParticipants: ChallengeParticipant[] = await prisma.challengeParticipant.findMany();
	for (const participant of challengeParticipants) {
		const activityCount = faker.number.int({ min: 1, max: 5 });
		for (let i = 0; i < activityCount; i++) {
			const challenge = challenges.find(c => c.id === participant.challengeId);
			if (challenge) {
				await prisma.activity.create({
					data: {
						participantId: participant.id,
						activityTypeId: (faker.helpers.arrayElement(activityTypes) as ActivityType).id,
						value: faker.number.int({ min: 1, max: 100 }),
						date: faker.date.between({ from: challenge.startDate, to: challenge.endDate }),
						profileId: participant.userId,
						challengeId: participant.challengeId,
					},
				});
			}
		}
	}
	console.log('Activities created.');

	// 9. Create Posts and Comments
	for (const participant of challengeParticipants) {
		const postCount = faker.number.int({ min: 0, max: 2 });
		for (let i = 0; i < postCount; i++) {
			const post: Post = await prisma.post.create({
				data: {
					participantId: participant.id,
					content: faker.lorem.paragraph(),
					imageUrl: faker.datatype.boolean() ? faker.image.url() : undefined,
					profileId: participant.userId,
					challengeId: participant.challengeId,
				},
			});

			const commentCount = faker.number.int({ min: 0, max: 3 });
			for (let j = 0; j < commentCount; j++) {
				await prisma.comment.create({
					data: {
						postId: post.id,
						authorId: (faker.helpers.arrayElement(users) as Profile).id,
						content: faker.lorem.sentence(),
					},
				});
			}
		}
	}
	console.log('Posts and comments created.');

	// 10. Create Discussion Posts and Replies
	for (const challenge of challenges) {
		const postCount = faker.number.int({ min: 1, max: 3 });
		for (let i = 0; i < postCount; i++) {
			const post: DiscussionPost = await prisma.discussionPost.create({
				data: {
					challengeId: challenge.id,
					authorId: (faker.helpers.arrayElement(users) as Profile).id,
					content: faker.lorem.paragraph(),
				},
			});

			const replyCount = faker.number.int({ min: 0, max: 4 });
			for (let j = 0; j < replyCount; j++) {
				await prisma.discussionReply.create({
					data: {
						postId: post.id,
						authorId: (faker.helpers.arrayElement(users) as Profile).id,
						content: faker.lorem.sentence(),
					},
				});
			}
		}
	}
	console.log('Discussion posts and replies created.');

	console.log('Seeding finished.');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
