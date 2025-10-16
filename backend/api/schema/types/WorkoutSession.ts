import { builder, prisma } from '../../schema-builder';

builder.prismaObject('WorkoutSession', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		workout_id: t.exposeString('workout_id'),
		profile_id: t.exposeString('profile_id'),
		session_date: t.expose('session_date', { type: 'Date' }),
		notes: t.exposeString('notes', { nullable: true }),
		created_at: t.expose('created_at', { type: 'Date' }),
		// Relations
		workout: t.relation('workout'),
		profile: t.relation('profile'),
		logged_activities: t.relation('logged_activities'),
	}),
});

builder.queryField('workoutSessions', t =>
	t.prismaField({
		type: ['WorkoutSession'],
		args: {
			workout_id: t.arg.string(),
			profile_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const where: any = {};
			if (args.workout_id) where.workout_id = args.workout_id;
			if (args.profile_id) where.profile_id = args.profile_id;

			return prisma.workoutSession.findMany({
				...query,
				where: Object.keys(where).length > 0 ? where : undefined,
				orderBy: { session_date: 'desc' },
			});
		},
	})
);

builder.queryField('workoutSession', t =>
	t.prismaField({
		type: 'WorkoutSession',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutSession.findUniqueOrThrow({
				...query,
				where: { id: args.id },
			});
		},
	})
);

builder.mutationFields(t => ({
	// Custom mutation expected by frontend
	startWorkoutSession: t.prismaField({
		type: 'WorkoutSession',
		args: {
			workout_id: t.arg.string({ required: true }),
			profile_id: t.arg.string({ required: true }),
			session_date: t.arg({ type: 'Date' }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutSession.create({
				...query,
				data: {
					workout_id: args.workout_id,
					profile_id: args.profile_id,
					session_date: args.session_date || new Date(),
				},
			});
		},
	}),

	// Custom mutation expected by frontend
	logWorkoutActivity: t.prismaField({
		type: 'Activity',
		args: {
			session_id: t.arg.string({ required: true }),
			activity_type_id: t.arg.string({ required: true }),
			value: t.arg.float({ required: true }),
			notes: t.arg.string(),
		},
		resolve: async (query, root, args, ctx, info) => {
			// Get session to fetch workout_id and profile_id
			const session = await prisma.workoutSession.findUniqueOrThrow({
				where: { id: args.session_id },
			});

			return prisma.activity.create({
				...query,
				data: {
					workout_session_id: args.session_id,
					activity_type_id: args.activity_type_id,
					value: args.value,
					notes: args.notes || undefined,
					profile_id: session.profile_id,
					date: session.session_date,
				},
			});
		},
	}),

	// Custom mutation expected by frontend
	completeWorkoutSession: t.prismaField({
		type: 'WorkoutSession',
		args: {
			id: t.arg.string({ required: true }),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutSession.update({
				...query,
				where: { id: args.id },
				data: {
					notes: args.notes || undefined,
				},
			});
		},
	}),

	createWorkoutSession: t.prismaField({
		type: 'WorkoutSession',
		args: {
			workout_id: t.arg.string({ required: true }),
			profile_id: t.arg.string({ required: true }),
			session_date: t.arg({ type: 'Date' }),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutSession.create({
				...query,
				data: {
					workout_id: args.workout_id,
					profile_id: args.profile_id,
					session_date: args.session_date || new Date(),
					notes: args.notes || undefined,
				},
			});
		},
	}),

	updateWorkoutSession: t.prismaField({
		type: 'WorkoutSession',
		args: {
			id: t.arg.string({ required: true }),
			session_date: t.arg({ type: 'Date' }),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			const updateData: any = {};
			if (data.session_date !== undefined) updateData.session_date = data.session_date;
			if (data.notes !== undefined) updateData.notes = data.notes;

			return prisma.workoutSession.update({
				...query,
				where: { id },
				data: updateData,
			});
		},
	}),

	deleteWorkoutSession: t.prismaField({
		type: 'WorkoutSession',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutSession.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
