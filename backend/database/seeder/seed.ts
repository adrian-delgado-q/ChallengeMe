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
} from '../../prisma/prisma-client/client';
import { faker } from '@faker-js/faker';
import activityTypes from './activityTypes';
import loadEnvironmentVariables from '../../utils/envLoader';

loadEnvironmentVariables();

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding...');

	let users: Profile[] = [
		{
			id: '11457ad5-e9bd-4b1f-b9d1-11adbd8a2104',
			username: 'Hosea.Douglas',
			avatar_url: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/31.jpg',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: 'e5b3afba-246c-446b-af30-7f1f614889ba',
			username: 'Ramiro.Ledner',
			avatar_url: 'https://avatars.githubusercontent.com/u/65758055',
			created_at: new Date('2025-10-12T21:37:29.304Z'),
			updated_at: new Date('2025-10-12T21:37:29.304Z'),
		},
		{
			id: 'f17bb1f3-4d9a-4237-9e25-35f72c9144f9',
			username: 'Gregory.Rice',
			avatar_url: 'https://avatars.githubusercontent.com/u/80904485',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '19a550d4-adf6-4aff-ac16-ff12bca6d41f',
			username: 'Elisha_Langosh-Welch',
			avatar_url: 'https://avatars.githubusercontent.com/u/11715011',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '1d78e5ab-b908-4df9-8f95-bbe527048a1e',
			username: 'Landen60',
			avatar_url: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/31.jpg',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '81c8f7bd-0988-4538-a4c9-374345d5eed0',
			username: 'Terence99',
			avatar_url: 'https://avatars.githubusercontent.com/u/27516265',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '7886a175-30e3-4977-a1e4-a9be5ecfbfc3',
			username: 'Nedra11',
			avatar_url: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/55.jpg',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '49bc61ac-1cfb-4c0b-bf03-988d83448587',
			username: 'Kelley12',
			avatar_url: 'https://avatars.githubusercontent.com/u/18041784',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: 'ca89fa35-5338-4472-a32f-4d7419c30f9b',
			username: 'Petra_McDermott',
			avatar_url: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/67.jpg',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
		},
		{
			id: '98ecfa5d-41c8-41b0-91ad-0acbbfccb6af',
			username: 'Ole_Schaefer',
			avatar_url: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/59.jpg',
			created_at: new Date('2025-10-12T21:37:29.303Z'),
			updated_at: new Date('2025-10-12T21:37:29.303Z'),
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
	for (const activity_type_data of activityTypes) {
		try {
			await prisma.activityType.upsert({
				where: { name: activity_type_data.name },
				update: activity_type_data,
				create: activity_type_data,
			});
		} catch (error) {
			console.error(`Error creating activity type ${activity_type_data.name}:`, error);
		}
	}
	// Fetch all activity types with IDs
	const db_activity_types: ActivityType[] = await prisma.activityType.findMany();
	console.log(`${db_activity_types.length} activity types available`);

	// 3. Create Challenges
	const challenges: Challenge[] = await Promise.all(
		Array.from({ length: 5 }).map(() =>
			prisma.challenge.create({
				data: {
					creator_id: (faker.helpers.arrayElement(users) as Profile).id,
					title: faker.lorem.words(3),
					description: faker.lorem.sentence(),
					instructions: faker.lorem.paragraph(),
					image_url: faker.image.url(),
					challenge_type: faker.helpers.arrayElement(['INDIVIDUAL', 'TEAM']),
					start_date: faker.date.past(),
					end_date: faker.date.future(),
					is_public: faker.datatype.boolean(),
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
		const supported_activity_types = faker.helpers.arrayElements(
			db_activity_types,
			faker.number.int({ min: 3, max: 7 })
		) as ActivityType[];

		for (const activityType of supported_activity_types) {
			await prisma.challengeActivityType.create({
				data: {
					challenge_id: challenge.id,
					activity_type_id: activityType.id,
				},
			});
		}
		console.log(
			`Challenge "${challenge.title}" supports ${supported_activity_types.length} activity types`
		);
	}
	console.log('Challenge activity types created.');

	// 4. Create Teams
	const teams: Team[] = await Promise.all(
		Array.from({ length: 3 }).map(() =>
			prisma.team.create({
				data: {
					creator_id: (faker.helpers.arrayElement(users) as Profile).id,
					name: faker.company.name(),
					description: faker.lorem.sentence(),
					avatar_url: faker.image.url(),
					is_public: faker.datatype.boolean(),
					sports_types: [(faker.helpers.arrayElement(db_activity_types) as ActivityType).name],
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
					team_id: team.id,
					user_id: member.id,
					role: faker.helpers.arrayElement(['ADMIN', 'MEMBER']),
				},
			});
		}
	}
	console.log('Team memberships created.');

	// 6. Create Challenge Participants
	for (const challenge of challenges) {
		if (challenge.challenge_type === 'INDIVIDUAL') {
			const participants = faker.helpers.arrayElements(
				users,
				faker.number.int({ min: 1, max: 3 })
			) as Profile[];
			for (const participant of participants) {
				await prisma.challengeParticipant.create({
					data: {
						challenge_id: challenge.id,
						user_id: participant.id,
					},
				});
			}
		} else {
			const participating_teams = faker.helpers.arrayElements(
				teams,
				faker.number.int({ min: 1, max: 2 })
			) as Team[];
			for (const team of participating_teams) {
				await prisma.challengeParticipant.create({
					data: {
						challenge_id: challenge.id,
						team_id: team.id,
					},
				});
			}
		}
	}
	console.log('Challenge participants created.');

	// 7. Create Milestones
	for (const challenge of challenges) {
		const milestone_count = faker.number.int({ min: 1, max: 3 });
		for (let i = 0; i < milestone_count; i++) {
			const activityType = faker.helpers.arrayElement(db_activity_types) as ActivityType;
			await prisma.milestone.create({
				data: {
					challenge_id: challenge.id,
					activity_type_id: activityType.id,
					name: faker.lorem.words(2),
					description: faker.lorem.sentence(),
					target_value: faker.number.int({ min: 10, max: 1000 }),
					order: i + 1,
				},
			});
		}
	}
	console.log('Milestones created.');

	// 8. Create Activities
	for (const challenge of challenges) {
		const challenge_participants: ChallengeParticipant[] = await prisma.challengeParticipant.findMany({
			where: { challenge_id: challenge.id },
		});

		console.log('The challenge has the followingg properties: ', { ...challenge });

		console.log(
			`Seeding activities for challenge ${challenge.id} with ${challenge_participants.length} participants...`
		);

		if (challenge_participants.length === 0) {
			console.warn(`No participants found for challenge ${challenge.id}, skipping activity creation.`);
			continue;
		}

		// Get the activity types supported by this challenge
		const supported_activity_types = await prisma.challengeActivityType.findMany({
			where: { challenge_id: challenge.id },
		});

		supported_activity_types.map(cat => {
			console.log(`The challenge supports the following activity types: `, { ...cat });
		});

		if (supported_activity_types.length === 0) {
			console.warn(
				`No supported activity types found for challenge ${challenge.id}, skipping activity creation.`
			);
			continue;
		}

		console.log(
			`Challenge "${challenge.title}" supports ${supported_activity_types.length} activity types`
		);

		for (const participant of challenge_participants) {
			const activity_count = faker.number.int({ min: 1, max: 5 });
			for (let i = 0; i < activity_count; i++) {
				// Only use activity types that are supported by this challenge
				const activityType = faker.helpers.arrayElement(supported_activity_types);

				// For team challenges, pick a random team member to perform the activity
				let profile_id = participant.user_id; // For individual challenges
				if (challenge.challenge_type === 'TEAM' && participant.team_id) {
					// Get team members and pick one randomly
					const team_members = await prisma.teamMembership.findMany({
						where: { team_id: participant.team_id },
					});
					if (team_members.length > 0) {
						const random_member = faker.helpers.arrayElement(team_members);
						profile_id = random_member.user_id;
					}
				}

				const data = {
					id: faker.string.uuid(),
					participant_id: participant.id,
					activity_type_id: activityType.activity_type_id,
					value: faker.number.int({ min: 1, max: 100 }),
					date: faker.date.between({ from: challenge.start_date, to: challenge.end_date }),
					notes: faker.lorem.sentence(),
					uploaded_at: faker.date.recent(),
					profile_id: profile_id,
					challenge_id: challenge.id,
				};

				console.log(`Creating activity with the following data: `, { ...data });
				await prisma.activity.create({
					data: data,
				});
			}
		}

		console.log('Activities created.');

		// 9. Create Posts and Comments
		for (const participant of challenge_participants) {
			const post_count = faker.number.int({ min: 0, max: 2 });
			for (let i = 0; i < post_count; i++) {
				const post: Post = await prisma.post.create({
					data: {
						participant_id: participant.id,
						content: faker.lorem.paragraph(),
						image_url: faker.datatype.boolean() ? faker.image.url() : undefined,
						profile_id: participant.user_id,
						challenge_id: participant.challenge_id,
					},
				});

				const comment_count = faker.number.int({ min: 0, max: 3 });
				for (let j = 0; j < comment_count; j++) {
					await prisma.comment.create({
						data: {
							post_id: post.id,
							author_id: (faker.helpers.arrayElement(users) as Profile).id,
							content: faker.lorem.sentence(),
						},
					});
				}
			}
		}
		console.log('Posts and comments created.');

		// 10. Create Discussion Posts and Replies
		for (const challenge of challenges) {
			const post_count = faker.number.int({ min: 1, max: 3 });
			for (let i = 0; i < post_count; i++) {
				const post: DiscussionPost = await prisma.discussionPost.create({
					data: {
						challenge_id: challenge.id,
						author_id: (faker.helpers.arrayElement(users) as Profile).id,
						content: faker.lorem.paragraph(),
					},
				});

				const reply_count = faker.number.int({ min: 0, max: 4 });
				for (let j = 0; j < reply_count; j++) {
					await prisma.discussionReply.create({
						data: {
							post_id: post.id,
							author_id: (faker.helpers.arrayElement(users) as Profile).id,
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
			const is_team_workout = faker.datatype.boolean();
			const creator = faker.helpers.arrayElement(users) as Profile;
			const team = faker.helpers.arrayElement(teams) as Team;

			const workout = await prisma.workout.create({
				data: {
					creator_id: creator.id,
					team_id: is_team_workout ? team.id : null,
					name: faker.lorem.words(3) + ' Workout',
					description: faker.lorem.sentence(),
					is_team_workout: is_team_workout,
					generated_by_ai: faker.datatype.boolean(0.3), // 30% chance of being AI generated
					ai_model: 'gpt-4-turbo',
					ai_raw_response: { prompt: 'some prompt', response: 'some response' },
				},
			});
			workouts.push(workout);
		}
		console.log(`${workouts.length} workouts created.`);

		// 12. Create WorkoutExercises
		console.log('Creating workout exercises...');
		for (const workout of workouts) {
			const exercise_count = faker.number.int({ min: 4, max: 8 });
			for (let i = 0; i < exercise_count; i++) {
				const activityType = faker.helpers.arrayElement(db_activity_types) as ActivityType;
				await prisma.workoutExercise.create({
					data: {
						workout_id: workout.id,
						activity_type_id: activityType.id,
						order_index: i + 1,
						sets: faker.number.int({ min: 2, max: 5 }),
						reps: faker.number.int({ min: 8, max: 15 }),
						rest_time: faker.helpers.arrayElement([30, 60, 90]),
						notes: faker.lorem.sentence(),
					},
				});
			}
		}
		console.log('Workout exercises created.');

		// 13. Create WorkoutSessions and associated Activities
		console.log('Creating workout sessions...');
		const workout_sessions: WorkoutSession[] = [];
		for (const workout of workouts) {
			const session_count = faker.number.int({ min: 0, max: 3 });
			for (let i = 0; i < session_count; i++) {
				const user = faker.helpers.arrayElement(users) as Profile;
				const session = await prisma.workoutSession.create({
					data: {
						workout_id: workout.id,
						profile_id: user.id,
						session_date: faker.date.recent({ days: 30 }),
						notes: faker.lorem.sentence(),
					},
				});
				workout_sessions.push(session);

				// Now, log activities for this session based on the workout's exercises
				const workout_exercises = await prisma.workoutExercise.findMany({
					where: { workout_id: workout.id },
				});

				for (const exercise of workout_exercises) {
					await prisma.activity.create({
						data: {
							profile_id: session.profile_id, // Link directly to the user
							activity_type_id: exercise.activity_type_id,
							value: faker.number.int({ min: 1, max: 100 }), // Or use exercise details
							date: session.session_date,
							notes: 'Completed during workout session.',
							workout_session_id: session.id,
						},
					});
				}
			}
		}
		console.log(`${workout_sessions.length} workout sessions created.`);

		// 14. Create WorkoutComments
		console.log('Creating workout comments...');
		for (const workout of workouts) {
			const comment_count = faker.number.int({ min: 0, max: 5 });
			for (let i = 0; i < comment_count; i++) {
				await prisma.workoutComment.create({
					data: {
						workout_id: workout.id,
						author_id: (faker.helpers.arrayElement(users) as Profile).id,
						content: faker.lorem.sentence(),
					},
				});
			}
		}
		console.log('Workout comments created.');

		console.log('Seeding finished.');
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