import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Profile', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		username: t.exposeString('username', { nullable: true }),
		avatar_url: t.exposeString('avatar_url', { nullable: true }),
		created_at: t.expose('created_at', { type: 'Date' }),
		updated_at: t.expose('updated_at', { type: 'Date' }),
		// Gamification fields
		xp: t.exposeInt('xp'),
		level: t.exposeInt('level'),
		total_points: t.exposeInt('total_points'),
		active_title: t.exposeString('active_title', { nullable: true }),
		// Relations
		activities: t.relation('activities'),
		challenge_entries: t.relation('challenge_entries'),
		created_challenges: t.relation('created_challenges'),
		comments: t.relation('comments'),
		banned_users: t.relation('banned_users'),
		discussion_bans: t.relation('discussion_bans'),
		granted_moderators: t.relation('granted_moderators'),
		moderator_roles: t.relation('moderator_roles'),
		discussion_posts: t.relation('discussion_posts'),
		discussion_replies: t.relation('discussion_replies'),
		posts: t.relation('posts'),
		team_memberships: t.relation('team_memberships'),
		created_teams: t.relation('created_teams'),
		created_workouts: t.relation('created_workouts'),
		workout_sessions: t.relation('workout_sessions'),
		workout_comment: t.relation('workout_comment'),
		// Gamification relations
		activity_masteries: t.relation('activity_masteries'),
		earned_badges: t.relation('earned_badges'),
		xp_logs: t.relation('xp_logs'),
	}),
});

builder.queryField('profiles', t =>
	t.prismaField({
		type: ['Profile'],
		args: {
			username: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const where: any = {};
			if (args.username) where.username = { contains: args.username, mode: 'insensitive' };

			return prisma.profile.findMany({
				...query,
				where: Object.keys(where).length > 0 ? where : undefined,
			});
		},
	})
);

builder.queryField('profile', t =>
	t.prismaField({
		type: 'Profile',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.profile.findUniqueOrThrow({
				...query,
				where: { id: args.id },
			});
		},
	})
);

builder.mutationFields(t => ({
	createProfile: t.prismaField({
		type: 'Profile',
		args: {
			id: t.arg.string({ required: true }),
			username: t.arg.string(),
			avatar_url: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.profile.create({
				...query,
				data: {
					id: args.id,
					username: args.username || undefined,
					avatar_url: args.avatar_url || undefined,
				},
			});
		},
	}),

	updateProfile: t.prismaField({
		type: 'Profile',
		args: {
			id: t.arg.string({ required: true }),
			username: t.arg.string({ required: false }),
			avatar_url: t.arg.string({ required: false }),
			active_title: t.arg.string({ required: false }),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			const updateData: any = {};
			if (data.username !== undefined) updateData.username = data.username;
			if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
			if (data.active_title !== undefined) updateData.active_title = data.active_title;

			return prisma.profile.update({
				...query,
				where: { id },
				data: updateData,
			});
		},
	}),

	deleteProfile: t.prismaField({
		type: 'Profile',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.profile.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
