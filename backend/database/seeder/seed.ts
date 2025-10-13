import {
	PrismaClient,
	Profile,
	ActivityType,
	Team,
	Challenge,
	ChallengeParticipant,
	Post,
	DiscussionPost,
	Workout,
	WorkoutExercise,
	WorkoutSession,
} from '../../prisma/prisma-generated-client/client';
import { faker } from '@faker-js/faker';
import activityTypes from './activityTypes';
import dotenv from 'dotenv';
import path from 'path';
import { exit } from 'process';

loadEnvironmentVariables();

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding...');

	let users: Profile[] = [
		{
			id: '11457ad5-e9bd-4b1f-b9d1-11adbd8a2104',
			username: 'Hosea.Douglas',
			avatarUrl: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/31.jpg',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: 'e5b3afba-246c-446b-af30-7f1f614889ba',
			username: 'Ramiro.Ledner',
			avatarUrl: 'https://avatars.githubusercontent.com/u/65758055',
			createdAt: new Date('2025-10-12T21:37:29.304Z'),
			updatedAt: new Date('2025-10-12T21:37:29.304Z'),
		},
		{
			id: 'f17bb1f3-4d9a-4237-9e25-35f72c9144f9',
			username: 'Gregory.Rice',
			avatarUrl: 'https://avatars.githubusercontent.com/u/80904485',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '19a550d4-adf6-4aff-ac16-ff12bca6d41f',
			username: 'Elisha_Langosh-Welch',
			avatarUrl: 'https://avatars.githubusercontent.com/u/11715011',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '1d78e5ab-b908-4df9-8f95-bbe527048a1e',
			username: 'Landen60',
			avatarUrl: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/31.jpg',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '81c8f7bd-0988-4538-a4c9-374345d5eed0',
			username: 'Terence99',
			avatarUrl: 'https://avatars.githubusercontent.com/u/27516265',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '7886a175-30e3-4977-a1e4-a9be5ecfbfc3',
			username: 'Nedra11',
			avatarUrl: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/55.jpg',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '49bc61ac-1cfb-4c0b-bf03-988d83448587',
			username: 'Kelley12',
			avatarUrl: 'https://avatars.githubusercontent.com/u/18041784',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: 'ca89fa35-5338-4472-a32f-4d7419c30f9b',
			username: 'Petra_McDermott',
			avatarUrl: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/67.jpg',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '98ecfa5d-41c8-41b0-91ad-0acbbfccb6af',
			username: 'Ole_Schaefer',
			avatarUrl: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/59.jpg',
			createdAt: new Date('2025-10-12T21:37:29.303Z'),
			updatedAt: new Date('2025-10-12T21:37:29.303Z'),
		},
	];
	for (const user of users) {
		try {
			await prisma.profile.upsert({
				where: { id: user.id },
				update: user,
				create: user,
			});
		} catch (error) {
			console.error(`Error creating user ${user.username}:`, error);
		}
	}

	console.log(`${users.length} users created.`);

	// 2. Create ActivityTypes
	console.log('Seeding activity types...');
	for (const activityTypeData of activityTypes) {
		try {
			await prisma.activityType.upsert({
				where: { name: activityTypeData.name },
				update: activityTypeData,
				create: activityTypeData,
			});
		} catch (error) {
			console.error(`Error creating activity type ${activityTypeData.name}:`, error);
		}
	}
	// Fetch all activity types with IDs
	const dbActivityTypes: ActivityType[] = await prisma.activityType.findMany();
	console.log(`${dbActivityTypes.length} activity types available`);

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

	// 3.5. Create ChallengeActivityTypes (define which activity types each challenge supports)
	console.log('Creating challenge activity types...');
	for (const challenge of challenges) {
		// Each challenge supports 3-7 random activity types
		const supportedActivityTypes = faker.helpers.arrayElements(
			dbActivityTypes,
			faker.number.int({ min: 3, max: 7 })
		) as ActivityType[];

		for (const activityType of supportedActivityTypes) {
			await prisma.challengeActivityType.create({
				data: {
					challengeId: challenge.id,
					activityTypeId: activityType.id,
				},
			});
		}
		console.log(
			`Challenge "${challenge.title}" supports ${supportedActivityTypes.length} activity types`
		);
	}
	console.log('Challenge activity types created.');

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
					sportsTypes: [(faker.helpers.arrayElement(dbActivityTypes) as ActivityType).name],
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
			const activityType = faker.helpers.arrayElement(dbActivityTypes) as ActivityType;
			await prisma.milestone.create({
				data: {
					challengeId: challenge.id,
					activityTypeId: activityType.id,
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
	for (const challenge of challenges) {
		const challengeParticipants: ChallengeParticipant[] = await prisma.challengeParticipant.findMany({
			where: { challengeId: challenge.id },
		});

		console.log('The challenge has the followingg properties: ', { ...challenge });

		console.log(
			`Seeding activities for challenge ${challenge.id} with ${challengeParticipants.length} participants...`
		);

		if (challengeParticipants.length === 0) {
			console.warn(`No participants found for challenge ${challenge.id}, skipping activity creation.`);
			continue;
		}

		// Get the activity types supported by this challenge
		const supportedActivityTypes = await prisma.challengeActivityType.findMany({
			where: { challengeId: challenge.id },
		});

		supportedActivityTypes.map(cat => {
			console.log(`The challenge supports the following activity types: `, { ...cat });
		});

		if (supportedActivityTypes.length === 0) {
			console.warn(
				`No supported activity types found for challenge ${challenge.id}, skipping activity creation.`
			);
			continue;
		}

		console.log(
			`Challenge "${challenge.title}" supports ${supportedActivityTypes.length} activity types`
		);

		for (const participant of challengeParticipants) {
			const activityCount = faker.number.int({ min: 1, max: 5 });
			for (let i = 0; i < activityCount; i++) {
				// Only use activity types that are supported by this challenge
				const activityType = faker.helpers.arrayElement(supportedActivityTypes);

				// For team challenges, pick a random team member to perform the activity
				let profileId = participant.userId; // For individual challenges
				if (challenge.challengeType === 'TEAM' && participant.teamId) {
					// Get team members and pick one randomly
					const teamMembers = await prisma.teamMembership.findMany({
						where: { teamId: participant.teamId },
					});
					if (teamMembers.length > 0) {
						const randomMember = faker.helpers.arrayElement(teamMembers);
						profileId = randomMember.userId;
					}
				}

				const data = {
					id: faker.string.uuid(),
					participantId: participant.id,
					activityTypeId: activityType.activityTypeId,
					value: faker.number.int({ min: 1, max: 100 }),
					date: faker.date.between({ from: challenge.startDate, to: challenge.endDate }),
					notes: faker.lorem.sentence(),
					uploadedAt: faker.date.recent(),
					profileId: profileId,
					challengeId: challenge.id,
				};

				console.log(`Creating activity with the following data: `, { ...data });
				await prisma.activity.create({
					data: data,
				});
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

		// 11. Create Workouts
		console.log('Creating workouts...');
		const workouts: Workout[] = [];
		for (let i = 0; i < 5; i++) {
			const isTeamWorkout = faker.datatype.boolean();
			const creator = faker.helpers.arrayElement(users) as Profile;
			const team = faker.helpers.arrayElement(teams) as Team;

			const workout = await prisma.workout.create({
				data: {
					creatorId: creator.id,
					teamId: isTeamWorkout ? team.id : null,
					name: faker.lorem.words(3) + ' Workout',
					description: faker.lorem.sentence(),
					isTeamWorkout: isTeamWorkout,
					generatedByAI: faker.datatype.boolean(0.3), // 30% chance of being AI generated
					aiModel: 'gpt-4-turbo',
					aiRawResponse: { prompt: 'some prompt', response: 'some response' },
				},
			});
			workouts.push(workout);
		}
		console.log(`${workouts.length} workouts created.`);

		// 12. Create WorkoutExercises
		console.log('Creating workout exercises...');
		for (const workout of workouts) {
			const exerciseCount = faker.number.int({ min: 4, max: 8 });
			for (let i = 0; i < exerciseCount; i++) {
				const activityType = faker.helpers.arrayElement(dbActivityTypes) as ActivityType;
				await prisma.workoutExercise.create({
					data: {
						workoutId: workout.id,
						activityTypeId: activityType.id,
						orderIndex: i + 1,
						sets: faker.number.int({ min: 2, max: 5 }),
						reps: faker.number.int({ min: 8, max: 15 }),
						restTime: faker.helpers.arrayElement([30, 60, 90]),
						notes: faker.lorem.sentence(),
					},
				});
			}
		}
		console.log('Workout exercises created.');

		// 13. Create WorkoutSessions and associated Activities
		console.log('Creating workout sessions...');
		const workoutSessions: WorkoutSession[] = [];
		for (const workout of workouts) {
			const sessionCount = faker.number.int({ min: 0, max: 3 });
			for (let i = 0; i < sessionCount; i++) {
				const user = faker.helpers.arrayElement(users) as Profile;
				const session = await prisma.workoutSession.create({
					data: {
						workoutId: workout.id,
						profileId: user.id,
						sessionDate: faker.date.recent({ days: 30 }),
						notes: faker.lorem.sentence(),
					},
				});
				workoutSessions.push(session);

				// Now, log activities for this session based on the workout's exercises
				const workoutExercises = await prisma.workoutExercise.findMany({
					where: { workoutId: workout.id },
				});

				for (const exercise of workoutExercises) {
					await prisma.activity.create({
						data: {
							profileId: session.profileId, // Link directly to the user
							activityTypeId: exercise.activityTypeId,
							value: faker.number.int({ min: 1, max: 100 }), // Or use exercise details
							date: session.sessionDate,
							notes: 'Completed during workout session.',
							workoutSessionId: session.id,
						},
					});
				}
			}
		}
		console.log(`${workoutSessions.length} workout sessions created.`);

		// 14. Create WorkoutComments
		console.log('Creating workout comments...');
		for (const workout of workouts) {
			const commentCount = faker.number.int({ min: 0, max: 5 });
			for (let i = 0; i < commentCount; i++) {
				await prisma.workoutComment.create({
					data: {
						workoutId: workout.id,
						authorId: (faker.helpers.arrayElement(users) as Profile).id,
						content: faker.lorem.sentence(),
					},
				});
			}
		}
		console.log('Workout comments created.');

		console.log('Seeding finished.');
	}
}

function loadEnvironmentVariables() {
	const backendRoot = path.resolve(__dirname, '../../..');
	let envFile = '';
	if (process.env.NODE_ENV === 'development') {
		envFile = path.join(backendRoot, '.env/.env.development');
	} else if (process.env.NODE_ENV === 'production') {
		envFile = path.join(backendRoot, '.env/.env.production');
	}
	if (envFile) {
		const result = dotenv.config({ path: envFile });
		if (result.error) {
			console.error('Error loading .env file:', result.error);
		}
	} else {
		console.warn('No .env file loaded, unknown NODE_ENV:', process.env.NODE_ENV);
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
