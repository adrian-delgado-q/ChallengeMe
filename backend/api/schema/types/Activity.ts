import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Activity', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		participant_id: t.exposeString('participant_id', { nullable: true }),
		activity_type_id: t.exposeString('activity_type_id'),
		value: t.exposeFloat('value'),
		notes: t.exposeString('notes', { nullable: true }),
		date: t.expose('date', { type: 'Date' }),
		uploaded_at: t.expose('uploaded_at', { type: 'Date' }),
		profile_id: t.exposeString('profile_id', { nullable: true }),
		challenge_id: t.exposeString('challenge_id', { nullable: true }),
		workout_session_id: t.exposeString('workout_session_id', { nullable: true }),
		// Relations
		activity_type: t.relation('activity_type'),
		Challenge: t.relation('Challenge', { nullable: true }),
		participant: t.relation('participant', { nullable: true }),
		Profile: t.relation('Profile', { nullable: true }),
		workout_session: t.relation('workout_session', { nullable: true }),
	}),
});

builder.queryField('activities', t =>
	t.prismaField({
		type: ['Activity'],
		args: {
			profile_id: t.arg.string(),
			challenge_id: t.arg.string(),
			activity_type_id: t.arg.string(),
			participant_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const where: any = {};
			if (args.profile_id) where.profile_id = args.profile_id;
			if (args.challenge_id) where.challenge_id = args.challenge_id;
			if (args.activity_type_id) where.activity_type_id = args.activity_type_id;
			if (args.participant_id) where.participant_id = args.participant_id;

			return prisma.activity.findMany({
				...query,
				where: Object.keys(where).length > 0 ? where : undefined,
				orderBy: { date: 'desc' },
			});
		},
	})
);

builder.queryField('activity', t =>
	t.prismaField({
		type: 'Activity',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.activity.findUniqueOrThrow({
				...query,
				where: { id: args.id },
			});
		},
	})
);

builder.mutationFields(t => ({
	createActivity: t.prismaField({
		type: 'Activity',
		args: {
			participant_id: t.arg.string(),
			activity_type_id: t.arg.string({ required: true }),
			value: t.arg.float({ required: true }),
			notes: t.arg.string(),
			date: t.arg({ type: 'Date' }),
			profile_id: t.arg.string(),
			challenge_id: t.arg.string(),
			workout_session_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.activity.create({
				...query,
				data: {
					participant_id: args.participant_id || undefined,
					activity_type_id: args.activity_type_id,
					value: args.value,
					notes: args.notes || undefined,
					date: args.date || new Date(),
					profile_id: args.profile_id || undefined,
					challenge_id: args.challenge_id || undefined,
					workout_session_id: args.workout_session_id || undefined,
				},
			});
		},
	}),

	updateActivity: t.prismaField({
		type: 'Activity',
		args: {
			id: t.arg.string({ required: true }),
			value: t.arg.float(),
			notes: t.arg.string(),
			date: t.arg({ type: 'Date' }),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			const updateData: any = {};
			if (data.value !== undefined) updateData.value = data.value;
			if (data.notes !== undefined) updateData.notes = data.notes;
			if (data.date !== undefined) updateData.date = data.date;

			return prisma.activity.update({
				...query,
				where: { id },
				data: updateData,
			});
		},
	}),

	deleteActivity: t.prismaField({
		type: 'Activity',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.activity.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
