import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Milestone', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    challenge_id: t.exposeString('challenge_id'),
    activity_type_id: t.exposeString('activity_type_id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    target_value: t.exposeFloat('target_value'),
    order: t.exposeInt('order'),
    created_at: t.expose('created_at', { type: 'Date' }),
    // Relations
    challenge: t.relation('challenge'),
    activity_type: t.relation('activity_type'),
    participant_progress: t.relation('participant_progress'),
  }),
});

builder.queryField('milestones', (t) =>
  t.prismaField({
    type: ['Milestone'],
    args: {
      challenge_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.milestone.findMany({
        ...query,
        where: args.challenge_id ? { challenge_id: args.challenge_id } : undefined,
        orderBy: { order: 'asc' },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createMilestone: t.prismaField({
    type: 'Milestone',
    args: {
      challenge_id: t.arg.string({ required: true }),
      activity_type_id: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      description: t.arg.string(),
      target_value: t.arg.float({ required: true }),
      order: t.arg.int({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.milestone.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          activity_type_id: args.activity_type_id,
          name: args.name,
          description: args.description || undefined,
          target_value: args.target_value,
          order: args.order,
        },
      });
    },
  }),

  updateMilestone: t.prismaField({
    type: 'Milestone',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      description: t.arg.string(),
      target_value: t.arg.float(),
      order: t.arg.int(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.target_value !== undefined) updateData.target_value = data.target_value;
      if (data.order !== undefined) updateData.order = data.order;
      
      return prisma.milestone.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteMilestone: t.prismaField({
    type: 'Milestone',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.milestone.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
