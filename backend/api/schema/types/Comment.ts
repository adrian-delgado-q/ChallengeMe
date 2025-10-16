import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Comment', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		author_id: t.exposeString('author_id'),
		post_id: t.exposeString('post_id'),
		content: t.exposeString('content', { nullable: true }),
		created_at: t.expose('created_at', { type: 'Date' }),
		// Relations
		author: t.relation('author'),
		post: t.relation('post'),
	}),
});

builder.queryField('comments', t =>
	t.prismaField({
		type: ['Comment'],
		args: {
			post_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.comment.findMany({
				...query,
				where: args.post_id ? { post_id: args.post_id } : undefined,
			});
		},
	})
);

builder.mutationFields(t => ({
	createComment: t.prismaField({
		type: 'Comment',
		args: {
			author_id: t.arg.string({ required: true }),
			post_id: t.arg.string({ required: true }),
			content: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.comment.create({
				...query,
				data: {
					author_id: args.author_id,
					post_id: args.post_id,
					content: args.content || undefined,
				},
			});
		},
	}),

	updateComment: t.prismaField({
		type: 'Comment',
		args: {
			id: t.arg.string({ required: true }),
			content: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, content } = args;
			return prisma.comment.update({
				...query,
				where: { id },
				data: {
					...(content !== undefined ? { content } : {}),
				},
			});
		},
	}),

	deleteComment: t.prismaField({
		type: 'Comment',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.comment.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
