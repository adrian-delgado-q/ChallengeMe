import { builder, prisma } from '../../schema-builder';

builder.prismaObject('PushSubscription', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		profile_id: t.exposeString('profile_id'),
		endpoint: t.exposeString('endpoint'),
		p256dh: t.exposeString('p256dh'),
		auth: t.exposeString('auth'),
		created_at: t.expose('created_at', { type: 'Date' }),
		// Relation
		profile: t.relation('profile'),
	}),
});

builder.queryField('pushSubscriptions', t =>
	t.prismaField({
		type: ['PushSubscription'],
		args: {
			profile_id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS ensures user can only query their own
			return prisma.pushSubscription.findMany({
				...query,
				where: { profile_id: args.profile_id },
			});
		},
	})
);

builder.mutationFields(t => ({
	createPushSubscription: t.prismaField({
		type: 'PushSubscription',
		args: {
			profile_id: t.arg.string({ required: true }),
			endpoint: t.arg.string({ required: true }),
			p256dh: t.arg.string({ required: true }),
			auth: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS ensures user can only create their own
			// Upsert to handle re-subscribing with the same endpoint
			return prisma.pushSubscription.upsert({
				...query,
				where: {
					profile_id_endpoint: {
						profile_id: args.profile_id,
						endpoint: args.endpoint,
					},
				},
				update: {
					p256dh: args.p256dh,
					auth: args.auth,
				},
				create: {
					profile_id: args.profile_id,
					endpoint: args.endpoint,
					p256dh: args.p256dh,
					auth: args.auth,
				},
			});
		},
	}),
	deletePushSubscription: t.prismaField({
		type: 'PushSubscription',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS ensures user can only delete their own
			return prisma.pushSubscription.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
