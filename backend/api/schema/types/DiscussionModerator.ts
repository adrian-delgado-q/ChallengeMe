import { builder, prisma } from '../../schema-builder';

builder.prismaObject('DiscussionModerator', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    challenge_id: t.exposeString('challenge_id'),
    user_id: t.exposeString('user_id'),
    role: t.expose('role', { type: 'ModeratorRole' }),
    granted_at: t.expose('granted_at', { type: 'Date' }),
    granted_by_id: t.exposeString('granted_by_id'),
    // Relations
    challenge: t.relation('challenge'),
    user: t.relation('user'),
    granted_by: t.relation('granted_by'),
  }),
});

builder.queryField('discussionModerators', (t) =>
  t.prismaField({
    type: ['DiscussionModerator'],
    args: {
      challenge_id: t.arg.string(),
      user_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.challenge_id) where.challenge_id = args.challenge_id;
      if (args.user_id) where.user_id = args.user_id;
      
      return prisma.discussionModerator.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
      });
    },
  })
);

builder.mutationFields((t) => ({
  // Custom mutation expected by frontend
  addDiscussionModerator: t.prismaField({
    type: 'DiscussionModerator',
    args: {
      challenge_id: t.arg.string({ required: true }),
      user_id: t.arg.string({ required: true }),
      role: t.arg.string({ required: false }),
      granted_by_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionModerator.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          user_id: args.user_id,
          role: (args.role as any) || 'MODERATOR',
          granted_by_id: args.granted_by_id,
        },
      });
    },
  }),

  // Custom mutation expected by frontend
  removeDiscussionModerator: t.prismaField({
    type: 'DiscussionModerator',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionModerator.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),

  createDiscussionModerator: t.prismaField({
    type: 'DiscussionModerator',
    args: {
      challenge_id: t.arg.string({ required: true }),
      user_id: t.arg.string({ required: true }),
      role: t.arg.string({ required: false }),
      granted_by_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionModerator.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          user_id: args.user_id,
          role: (args.role as any) || 'MODERATOR',
          granted_by_id: args.granted_by_id,
        },
      });
    },
  }),

  updateDiscussionModerator: t.prismaField({
    type: 'DiscussionModerator',
    args: {
      id: t.arg.string({ required: true }),
      role: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionModerator.update({
        ...query,
        where: { id: args.id },
        data: { role: args.role as any },
      });
    },
  }),

  deleteDiscussionModerator: t.prismaField({
    type: 'DiscussionModerator',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionModerator.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
