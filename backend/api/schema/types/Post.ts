import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Post', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    participant_id: t.exposeString('participant_id'),
    content: t.exposeString('content', { nullable: true }),
    image_url: t.exposeString('image_url', { nullable: true }),
    created_at: t.expose('created_at', { type: 'Date' }),
    profile_id: t.exposeString('profile_id', { nullable: true }),
    challenge_id: t.exposeString('challenge_id', { nullable: true }),
    // Relations
    participant: t.relation('participant'),
    Profile: t.relation('Profile', { nullable: true }),
    Challenge: t.relation('Challenge', { nullable: true }),
    comments: t.relation('comments'),
  }),
});

builder.queryField('posts', (t) =>
  t.prismaField({
    type: ['Post'],
    resolve: (query, root, args, ctx, info) => {
      return prisma.post.findMany({ ...query });
    },
  })
);

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.post.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createPost: t.prismaField({
    type: 'Post',
    args: {
      participant_id: t.arg.string({ required: true }),
      content: t.arg.string(),
      image_url: t.arg.string(),
      profile_id: t.arg.string(),
      challenge_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.post.create({
        ...query,
        data: {
          participant_id: args.participant_id,
          content: args.content || undefined,
          image_url: args.image_url || undefined,
          profile_id: args.profile_id || undefined,
          challenge_id: args.challenge_id || undefined,
        },
      });
    },
  }),

  updatePost: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.string({ required: true }),
      content: t.arg.string(),
      image_url: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      return prisma.post.update({
        ...query,
        where: { id },
        data: {
          ...(data.content !== undefined ? { content: data.content } : {}),
          ...(data.image_url !== undefined ? { image_url: data.image_url } : {}),
        },
      });
    },
  }),

  deletePost: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.post.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
