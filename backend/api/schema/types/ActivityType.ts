import { builder, prisma } from '../../schema-builder';

builder.prismaObject('ActivityType', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    category: t.exposeString('category'),
    unit: t.exposeString('unit'),
    unit_label: t.exposeString('unit_label'),
    description: t.exposeString('description', { nullable: true }),
    is_active: t.exposeBoolean('is_active'),
    created_at: t.expose('created_at', { type: 'Date' }),
    // Relations
    activities: t.relation('activities'),
    challenges: t.relation('challenges'),
    milestones: t.relation('milestones'),
    workout_exercises: t.relation('workout_exercises'),
  }),
});

builder.queryField('activityTypes', (t) =>
  t.prismaField({
    type: ['ActivityType'],
    args: {
      category: t.arg.string(),
      is_active: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.category) where.category = args.category;
      if (args.is_active !== undefined) where.is_active = args.is_active;
      
      return prisma.activityType.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { name: 'asc' },
      });
    },
  })
);

builder.queryField('activityType', (t) =>
  t.prismaField({
    type: 'ActivityType',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.activityType.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createActivityType: t.prismaField({
    type: 'ActivityType',
    args: {
      name: t.arg.string({ required: true }),
      category: t.arg.string({ required: true }),
      unit: t.arg.string({ required: true }),
      unit_label: t.arg.string({ required: true }),
      description: t.arg.string(),
      is_active: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.activityType.create({
        ...query,
        data: {
          name: args.name,
          category: args.category,
          unit: args.unit,
          unit_label: args.unit_label,
          description: args.description || undefined,
          is_active: args.is_active !== undefined && args.is_active !== null ? args.is_active : true,
        },
      });
    },
  }),

  updateActivityType: t.prismaField({
    type: 'ActivityType',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      category: t.arg.string(),
      unit: t.arg.string(),
      unit_label: t.arg.string(),
      description: t.arg.string(),
      is_active: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.unit !== undefined) updateData.unit = data.unit;
      if (data.unit_label !== undefined) updateData.unit_label = data.unit_label;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.is_active !== undefined) updateData.is_active = data.is_active;
      
      return prisma.activityType.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteActivityType: t.prismaField({
    type: 'ActivityType',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.activityType.update({
        ...query,
        where: { id: args.id },
        data: { is_active: false },
      });
    },
  }),
}));
