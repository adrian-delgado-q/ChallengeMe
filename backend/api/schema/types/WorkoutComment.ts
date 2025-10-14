import { builder, prisma } from '../../schema-builder';

builder.prismaObject('WorkoutComment', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    author_id: t.exposeString('author_id'),
    workout_id: t.exposeString('workout_id'),
    content: t.exposeString('content'),
    created_at: t.expose('created_at', { type: 'Date' }),
    // Relations
    author: t.relation('author'),
    workout: t.relation('workout'),
  }),
});

builder.queryField('workoutComments', (t) =>
  t.prismaField({
    type: ['WorkoutComment'],
    args: {
      workout_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.workoutComment.findMany({
        ...query,
        where: args.workout_id ? { workout_id: args.workout_id } : undefined,
        orderBy: { created_at: 'desc' },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createWorkoutComment: t.prismaField({
    type: 'WorkoutComment',
    args: {
      author_id: t.arg.string({ required: true }),
      workout_id: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.workoutComment.create({
        ...query,
        data: {
          author_id: args.author_id,
          workout_id: args.workout_id,
          content: args.content,
        },
      });
    },
  }),

  updateWorkoutComment: t.prismaField({
    type: 'WorkoutComment',
    args: {
      id: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.workoutComment.update({
        ...query,
        where: { id: args.id },
        data: { content: args.content },
      });
    },
  }),

  deleteWorkoutComment: t.prismaField({
    type: 'WorkoutComment',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.workoutComment.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
