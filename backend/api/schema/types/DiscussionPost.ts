import { builder, prisma } from '../../schema-builder';

builder.prismaObject('DiscussionPost', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    challenge_id: t.exposeString('challenge_id'),
    author_id: t.exposeString('author_id'),
    content: t.exposeString('content'),
    is_pinned: t.exposeBoolean('is_pinned'),
    is_deleted: t.exposeBoolean('is_deleted'),
    created_at: t.expose('created_at', { type: 'Date' }),
    updated_at: t.expose('updated_at', { type: 'Date' }),
    reply_count: t.exposeInt('reply_count'),
    last_reply_at: t.expose('last_reply_at', { type: 'Date', nullable: true }),
    // Relations
    challenge: t.relation('challenge'),
    author: t.relation('author'),
    replies: t.relation('replies'),
  }),
});

builder.queryField('discussionPosts', (t) =>
  t.prismaField({
    type: ['DiscussionPost'],
    args: {
      challenge_id: t.arg.string(),
      author_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = { is_deleted: false };
      if (args.challenge_id) where.challenge_id = args.challenge_id;
      if (args.author_id) where.author_id = args.author_id;
      
      return prisma.discussionPost.findMany({
        ...query,
        where,
        orderBy: [
          { is_pinned: 'desc' },
          { created_at: 'desc' }
        ],
      });
    },
  })
);

builder.mutationFields((t) => ({
  createDiscussionPost: t.prismaField({
    type: 'DiscussionPost',
    args: {
      challenge_id: t.arg.string({ required: true }),
      author_id: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionPost.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          author_id: args.author_id,
          content: args.content,
        },
      });
    },
  }),

  updateDiscussionPost: t.prismaField({
    type: 'DiscussionPost',
    args: {
      id: t.arg.string({ required: true }),
      content: t.arg.string(),
      is_pinned: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.content !== undefined) updateData.content = data.content;
      if (data.is_pinned !== undefined) updateData.is_pinned = data.is_pinned;
      
      return prisma.discussionPost.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteDiscussionPost: t.prismaField({
    type: 'DiscussionPost',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionPost.update({
        ...query,
        where: { id: args.id },
        data: { is_deleted: true },
      });
    },
  }),
}));
