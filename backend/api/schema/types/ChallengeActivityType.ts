import { builder, prisma } from '../../schema-builder';

builder.prismaObject('ChallengeActivityType', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		challenge_id: t.exposeString('challenge_id'),
		activity_type_id: t.exposeString('activity_type_id'),
		// Relations
		challenge: t.relation('challenge'),
		activity_type: t.relation('activity_type'),
	}),
});

builder.queryField('challengeActivityTypes', t =>
	t.prismaField({
		type: ['ChallengeActivityType'],
		args: {
			challenge_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.challengeActivityType.findMany({
				...query,
				where: args.challenge_id ? { challenge_id: args.challenge_id } : undefined,
			});
		},
	})
);

builder.mutationFields(t => ({
	createChallengeActivityType: t.prismaField({
		type: 'ChallengeActivityType',
		args: {
			challenge_id: t.arg.string({ required: true }),
			activity_type_id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.challengeActivityType.create({
				...query,
				data: {
					challenge_id: args.challenge_id,
					activity_type_id: args.activity_type_id,
				},
			});
		},
	}),

	deleteChallengeActivityType: t.prismaField({
		type: 'ChallengeActivityType',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.challengeActivityType.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
