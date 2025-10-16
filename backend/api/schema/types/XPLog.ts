import { builder, prisma } from '../../schema-builder';

builder.prismaObject('XPLog', {
  fields: (t:any) => ({
    id: t.exposeID('id'),
    profile_id: t.exposeString('profile_id'),
    source_type: t.expose('source_type', { type: 'XPSourceType' }),
    source_id: t.exposeString('source_id', { nullable: true }),
    points: t.exposeInt('points'),
    description: t.exposeString('description', { nullable: true }),
    created_at: t.expose('created_at', { type: 'Date' }),
    profile: t.relation('profile'),
  }),
});

builder.queryField('xpLogs', (t) =>
  t.prismaField({
    type: ['XPLog'],
    args: {
      profile_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.xPLog.findMany({
        ...query,
        where: args.profile_id ? { profile_id: args.profile_id } : undefined,
        orderBy: { created_at: 'desc' },
      });
    },
  })
);
