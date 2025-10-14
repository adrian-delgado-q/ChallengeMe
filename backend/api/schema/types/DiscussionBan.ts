import { builder, prisma } from '../../schema-builder';

builder.prismaObject('DiscussionBan', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    challenge_id: t.exposeString('challenge_id'),
    user_id: t.exposeString('user_id'),
    reason: t.exposeString('reason', { nullable: true }),
    banned_at: t.expose('banned_at', { type: 'Date' }),
    expires_at: t.expose('expires_at', { type: 'Date', nullable: true }),
    banned_by_id: t.exposeString('banned_by_id'),
    is_active: t.exposeBoolean('is_active'),
    // Relations
    challenge: t.relation('challenge'),
    user: t.relation('user'),
    banned_by: t.relation('banned_by'),
  }),
});

builder.queryField('discussionBans', (t) =>
  t.prismaField({
    type: ['DiscussionBan'],
    args: {
      challenge_id: t.arg.string(),
      user_id: t.arg.string(),
      is_active: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.challenge_id) where.challenge_id = args.challenge_id;
      if (args.user_id) where.user_id = args.user_id;
      if (args.is_active !== undefined) where.is_active = args.is_active;
      
      return prisma.discussionBan.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
      });
    },
  })
);

builder.mutationFields((t) => ({
  createDiscussionBan: t.prismaField({
    type: 'DiscussionBan',
    args: {
      challenge_id: t.arg.string({ required: true }),
      user_id: t.arg.string({ required: true }),
      reason: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
      banned_by_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionBan.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          user_id: args.user_id,
          reason: args.reason || undefined,
          expires_at: args.expires_at || undefined,
          banned_by_id: args.banned_by_id,
        },
      });
    },
  }),

  updateDiscussionBan: t.prismaField({
    type: 'DiscussionBan',
    args: {
      id: t.arg.string({ required: true }),
      reason: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
      is_active: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.reason !== undefined) updateData.reason = data.reason;
      if (data.expires_at !== undefined) updateData.expires_at = data.expires_at;
      if (data.is_active !== undefined) updateData.is_active = data.is_active;
      
      return prisma.discussionBan.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteDiscussionBan: t.prismaField({
    type: 'DiscussionBan',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.discussionBan.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
