import { builder, prisma } from '../../schema-builder';

builder.prismaObject('NotificationPreference', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		profile_id: t.exposeString('profile_id'),
		challenge_invites: t.exposeBoolean('challenge_invites'),
		challenge_updates: t.exposeBoolean('challenge_updates'),
		social_mentions: t.exposeBoolean('social_mentions'),
		social_replies: t.exposeBoolean('social_replies'),
		team_invites: t.exposeBoolean('team_invites'),
		gamification_milestone: t.exposeBoolean('gamification_milestone'),
		re_engagement_reminders: t.exposeBoolean('re_engagement_reminders'),
		// Relation
		profile: t.relation('profile'),
	}),
});

builder.queryField('notificationPreference', t =>
	t.prismaField({
		type: 'NotificationPreference',
		nullable: true, // It might not exist yet
		args: {
			profile_id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			// RLS ensures user can only query their own
			return prisma.notificationPreference.findUnique({
				...query,
				where: { profile_id: args.profile_id },
			});
		},
	})
);

builder.mutationField('updateNotificationPreference', t =>
	t.prismaField({
		type: 'NotificationPreference',
		args: {
			profile_id: t.arg.string({ required: true }),
			challenge_invites: t.arg.boolean(),
			challenge_updates: t.arg.boolean(),
			social_mentions: t.arg.boolean(),
			social_replies: t.arg.boolean(),
			team_invites: t.arg.boolean(),
			gamification_milestone: t.arg.boolean(),
			re_engagement_reminders: t.arg.boolean(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { profile_id, ...data } = args;
			// RLS ensures user can only upsert their own
			return prisma.notificationPreference.upsert({
				...query,
				where: { profile_id: profile_id },
				update: {
					...data,
				},
				create: {
					profile_id: profile_id,
					...data,
				},
			});
		},
	})
);
