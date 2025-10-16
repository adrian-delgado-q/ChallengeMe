import { builder, prisma } from '../../schema-builder';

builder.prismaObject('EarnedBadge', {
  fields: (t:any) => ({
    id: t.exposeID('id'),
    profile_id: t.exposeString('profile_id'),
    badge_id: t.exposeString('badge_id'),
    earned_at: t.expose('earned_at', { type: 'Date' }),
    profile: t.relation('profile'),
    badge: t.relation('badge'),
  }),
});

builder.queryField('earnedBadges', (t) =>
  t.prismaField({
    type: ['EarnedBadge'],
    args: {
      profile_id: t.arg.string(),
      badge_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.profile_id) where.profile_id = args.profile_id;
      if (args.badge_id) where.badge_id = args.badge_id;
      
      return prisma.earnedBadge.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { earned_at: 'desc' },
      });
    },
  })
);
