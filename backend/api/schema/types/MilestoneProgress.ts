import { builder, prisma } from '../../schema-builder';

builder.prismaObject('MilestoneProgress', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		milestone_id: t.exposeString('milestone_id'),
		participant_id: t.exposeString('participant_id'),
		current_value: t.exposeInt('current_value'),
		is_achieved: t.exposeBoolean('is_achieved'),
		achieved_at: t.expose('achieved_at', { type: 'Date', nullable: true }),
		created_at: t.expose('created_at', { type: 'Date' }),
		updated_at: t.expose('updated_at', { type: 'Date' }),
		// Relations
		milestone: t.relation('milestone'),
		participant: t.relation('participant'),
	}),
});

builder.queryField('milestoneProgress', t =>
	t.prismaField({
		type: ['MilestoneProgress'],
		args: {
			milestone_id: t.arg.string(),
			participant_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const where: any = {};
			if (args.milestone_id) where.milestone_id = args.milestone_id;
			if (args.participant_id) where.participant_id = args.participant_id;

			return prisma.milestoneProgress.findMany({
				...query,
				where: Object.keys(where).length > 0 ? where : undefined,
			});
		},
	})
);

builder.mutationFields(t => ({
	createMilestoneProgress: t.prismaField({
		type: 'MilestoneProgress',
		args: {
			milestone_id: t.arg.string({ required: true }),
			participant_id: t.arg.string({ required: true }),
			current_value: t.arg.int(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.milestoneProgress.create({
				...query,
				data: {
					milestone_id: args.milestone_id,
					participant_id: args.participant_id,
					current_value: args.current_value || 0,
				},
			});
		},
	}),

	updateMilestoneProgress: t.prismaField({
		type: 'MilestoneProgress',
		args: {
			id: t.arg.string({ required: true }),
			current_value: t.arg.int(),
			is_achieved: t.arg.boolean(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			const updateData: any = {};
			if (data.current_value !== undefined) updateData.current_value = data.current_value;
			if (data.is_achieved !== undefined) {
				updateData.is_achieved = data.is_achieved;
				if (data.is_achieved) updateData.achieved_at = new Date();
			}

			return prisma.milestoneProgress.update({
				...query,
				where: { id },
				data: updateData,
			});
		},
	}),

	deleteMilestoneProgress: t.prismaField({
		type: 'MilestoneProgress',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.milestoneProgress.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
