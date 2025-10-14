import { builder, prisma } from '../../schema-builder';

builder.prismaObject('ChallengeParticipant', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    challenge_id: t.exposeString('challenge_id'),
    user_id: t.exposeString('user_id', { nullable: true }),
    team_id: t.exposeString('team_id', { nullable: true }),
    joined_at: t.expose('joined_at', { type: 'Date' }),
    // Relations
    challenge: t.relation('challenge'),
    user: t.relation('user', { nullable: true }),
    team: t.relation('team', { nullable: true }),
    activities: t.relation('activities'),
    milestone_progress: t.relation('milestone_progress'),
    posts: t.relation('posts'),
  }),
});

builder.queryField('challengeParticipants', (t) =>
  t.prismaField({
    type: ['ChallengeParticipant'],
    args: {
      challenge_id: t.arg.string(),
      user_id: t.arg.string(),
      team_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.challenge_id) where.challenge_id = args.challenge_id;
      if (args.user_id) where.user_id = args.user_id;
      if (args.team_id) where.team_id = args.team_id;
      
      return prisma.challengeParticipant.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
      });
    },
  })
);

builder.mutationFields((t) => ({
  createChallengeParticipant: t.prismaField({
    type: 'ChallengeParticipant',
    args: {
      challenge_id: t.arg.string({ required: true }),
      user_id: t.arg.string(),
      team_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.challengeParticipant.create({
        ...query,
        data: {
          challenge_id: args.challenge_id,
          user_id: args.user_id || undefined,
          team_id: args.team_id || undefined,
        },
      });
    },
  }),

  deleteChallengeParticipant: t.prismaField({
    type: 'ChallengeParticipant',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.challengeParticipant.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
