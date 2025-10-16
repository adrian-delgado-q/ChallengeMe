import { builder, prisma } from '../../schema-builder';

builder.prismaObject('ActivityMastery', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    profile_id: t.exposeString('profile_id'),
    activity_type_id: t.exposeString('activity_type_id'),
    total_value: t.exposeFloat('total_value'),
    mastery_tier: t.expose('mastery_tier', { type: 'MasteryTier' }),
    created_at: t.expose('created_at', { type: 'Date' }),
    updated_at: t.expose('updated_at', { type: 'Date' }),
    profile: t.relation('profile'),
    activity_type: t.relation('activity_type'),
  }),
});

builder.queryField('activityMastery', (t) =>
  t.prismaField({
    type: 'ActivityMastery',
    args: {
      profile_id: t.arg.string({ required: true }),
      activity_type_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.activityMastery.findUniqueOrThrow({
        ...query,
        where: {
          profile_id_activity_type_id: {
            profile_id: args.profile_id,
            activity_type_id: args.activity_type_id,
          },
        },
      });
    },
  })
);

builder.queryField('activityMasteries', (t) =>
  t.prismaField({
    type: ['ActivityMastery'],
    args: {
      profile_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.activityMastery.findMany({
        ...query,
        where: {
          profile_id: args.profile_id,
        },
      });
    },
  })
);
