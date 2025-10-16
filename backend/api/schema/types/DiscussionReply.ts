import { builder, prisma } from '../../schema-builder';

builder.prismaObject('DiscussionReply', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		post_id: t.exposeString('post_id'),
		parent_id: t.exposeString('parent_id', { nullable: true }),
		author_id: t.exposeString('author_id'),
		content: t.exposeString('content'),
		is_deleted: t.exposeBoolean('is_deleted'),
		created_at: t.expose('created_at', { type: 'Date' }),
		updated_at: t.expose('updated_at', { type: 'Date' }),
		// Relations
		post: t.relation('post'),
		parent: t.relation('parent', { nullable: true }),
		replies: t.relation('replies'),
		author: t.relation('author'),
	}),
});

builder.queryField('discussionReplies', t =>
	t.prismaField({
		type: ['DiscussionReply'],
		args: {
			post_id: t.arg.string(),
			parent_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const where: any = { is_deleted: false };
			if (args.post_id) where.post_id = args.post_id;
			if (args.parent_id) where.parent_id = args.parent_id;

			return prisma.discussionReply.findMany({
				...query,
				where,
				orderBy: { created_at: 'asc' },
			});
		},
	})
);

builder.mutationFields(t => ({
	createDiscussionReply: t.prismaField({
		type: 'DiscussionReply',
		args: {
			post_id: t.arg.string({ required: true }),
			parent_id: t.arg.string(),
			author_id: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.discussionReply.create({
				...query,
				data: {
					post_id: args.post_id,
					parent_id: args.parent_id || undefined,
					author_id: args.author_id,
					content: args.content,
				},
			});
		},
	}),

	updateDiscussionReply: t.prismaField({
		type: 'DiscussionReply',
		args: {
			id: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.discussionReply.update({
				...query,
				where: { id: args.id },
				data: { content: args.content },
			});
		},
	}),

	deleteDiscussionReply: t.prismaField({
		type: 'DiscussionReply',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.discussionReply.update({
				...query,
				where: { id: args.id },
				data: { is_deleted: true },
			});
		},
	}),
}));
