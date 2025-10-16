import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Badge', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		description: t.exposeString('description'),
		category: t.exposeString('category'),
		icon_url: t.exposeString('icon_url', { nullable: true }),
		xp_bonus: t.exposeInt('xp_bonus'),
		created_at: t.expose('created_at', { type: 'Date' }),
		earned_by: t.relation('earned_by'),
	}),
});

builder.queryField('badge', t =>
	t.prismaField({
		type: 'Badge',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.badge.findUniqueOrThrow({
				...query,
				where: { id: args.id },
			});
		},
	})
);

builder.queryField('badges', t =>
	t.prismaField({
		type: ['Badge'],
		resolve: (query, root, args, ctx, info) => {
			return prisma.badge.findMany({
				...query,
			});
		},
	})
);

builder.mutationFields(t => ({
	createBadge: t.prismaField({
		type: 'Badge',
		args: {
			name: t.arg.string({ required: true }),
			description: t.arg.string({ required: true }),
			category: t.arg.string({ required: true }),
			icon_url: t.arg.string(),
			xp_bonus: t.arg.int(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { name, description, category, icon_url, xp_bonus } = args;
			return prisma.badge.create({
				...query,
				data: {
					name,
					description,
					category,
					icon_url: icon_url ?? undefined,
					xp_bonus: xp_bonus ?? undefined,
				},
			});
		},
	}),
	updateBadge: t.prismaField({
		type: 'Badge',
		args: {
			id: t.arg.string({ required: true }),
			name: t.arg.string(),
			description: t.arg.string(),
			category: t.arg.string(),
			icon_url: t.arg.string(),
			xp_bonus: t.arg.int(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			return prisma.badge.update({
				...query,
				where: { id },
				data: {
					name: data.name ?? undefined,
					description: data.description ?? undefined,
					category: data.category ?? undefined,
					icon_url: data.icon_url ?? undefined,
					xp_bonus: data.xp_bonus ?? undefined,
				},
			});
		},
	}),
	deleteBadge: t.prismaField({
		type: 'Badge',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.badge.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
