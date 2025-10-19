import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Notification', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		profile_id: t.exposeString('profile_id'),
		content: t.expose('content', { type: 'JSON' }),
		read_at: t.expose('read_at', { type: 'Date', nullable: true }),
		created_at: t.expose('created_at', { type: 'Date' }),
		// Relation
		profile: t.relation('profile'),
	}),
});

builder.queryField('notifications', t =>
	t.prismaField({
		type: ['Notification'],
		args: {
			profile_id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS policy ensures user can only query their own notifications
			return prisma.notification.findMany({
				...query,
				where: { profile_id: args.profile_id },
				orderBy: { created_at: 'desc' },
			});
		},
	})
);

builder.mutationFields(t => ({
	markNotificationAsRead: t.prismaField({
		type: 'Notification',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS policy ensures user can only update their own
			return prisma.notification.update({
				...query,
				where: { id: args.id },
				data: { read_at: new Date() },
			});
		},
	}),
	markAllNotificationsAsRead: t.prismaField({
		type: 'Notification', // This is technically incorrect, let's return a batch payload
		// We'll return a simple object instead of a prisma model
		type: builder.simpleObject('BatchPayload', {
			fields: t => ({
				count: t.int(),
			}),
		}),
		args: {
			profile_id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS policy ensures user can only update their own
			return prisma.notification.updateMany({
				where: {
					profile_id: args.profile_id,
					read_at: null,
				},
				data: {
					read_at: new Date(),
				},
			});
		},
	}),
}));
