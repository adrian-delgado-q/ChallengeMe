import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Challenge', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    creator_id: t.exposeString('creator_id'),
    title: t.exposeString('title'),
    description: t.exposeString('description', { nullable: true }),
    instructions: t.exposeString('instructions', { nullable: true }),
    image_url: t.exposeString('image_url', { nullable: true }),
    challenge_type: t.expose('challenge_type', { type: 'ChallengeParticipantType' }),
    max_participants: t.exposeInt('max_participants', { nullable: true }),
    participant_count: t.exposeInt('participant_count'),
    start_date: t.expose('start_date', { type: "Date" }),
    end_date: t.expose('end_date', { type: "Date" }),
    is_public: t.exposeBoolean('is_public'),
    access_code: t.exposeString('access_code', { nullable: true }),
    created_at: t.expose('created_at', { type: "Date" }),
    expires_at: t.expose('expires_at', { type: "Date" , nullable: true }),
    max_team_size: t.exposeInt('max_team_size', { nullable: true }),
    status: t.expose('status', { type: 'ChallengeStatus' }),
    // Relations
    creator: t.relation('creator'),
    activities: t.relation('activities'),
    supported_activities: t.relation('supported_activities'),
    participants: t.relation('participants'),
    discussion_bans: t.relation('discussion_bans'),
    discussion_moderators: t.relation('discussion_moderators'),
    discussion_posts: t.relation('discussion_posts'),
    milestones: t.relation('milestones'),
    posts: t.relation('posts'),
  }),
});

builder.queryField('challenges', (t) =>
  t.prismaField({
    type: ['Challenge'],
    args: {
      creator_id: t.arg.string(),
      status: t.arg.string(),
      is_public: t.arg.boolean(),
      challenge_type: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.creator_id) where.creator_id = args.creator_id;
      if (args.status) where.status = args.status;
      if (args.is_public !== undefined) where.is_public = args.is_public;
      if (args.challenge_type) where.challenge_type = args.challenge_type;
      
      return prisma.challenge.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { created_at: 'desc' },
      });
    },
  })
);

builder.queryField('challenge', (t) =>
  t.prismaField({
    type: 'Challenge',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.challenge.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createChallenge: t.prismaField({
    type: 'Challenge',
    args: {
      creator_id: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      description: t.arg.string(),
      instructions: t.arg.string(),
      image_url: t.arg.string(),
      challenge_type: t.arg.string(),
      max_participants: t.arg.int(),
      start_date: t.arg({ type: 'Date', required: true }),
      end_date: t.arg({ type: 'Date', required: true }),
      is_public: t.arg.boolean(),
      access_code: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
      max_team_size: t.arg.int(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.challenge.create({
        ...query,
        data: {
          creator_id: args.creator_id,
          title: args.title,
          description: args.description || undefined,
          instructions: args.instructions || undefined,
          image_url: args.image_url || undefined,
          challenge_type: (args.challenge_type as any) || 'INDIVIDUAL',
          max_participants: args.max_participants || undefined,
          start_date: args.start_date,
          end_date: args.end_date,
          is_public: args.is_public !== undefined && args.is_public !== null ? args.is_public : true,
          access_code: args.access_code || undefined,
          expires_at: args.expires_at || undefined,
          max_team_size: args.max_team_size || undefined,
        },
      });
    },
  }),

  updateChallenge: t.prismaField({
    type: 'Challenge',
    args: {
      id: t.arg.string({ required: true }),
      title: t.arg.string(),
      description: t.arg.string(),
      instructions: t.arg.string(),
      image_url: t.arg.string(),
      max_participants: t.arg.int(),
      is_public: t.arg.boolean(),
      access_code: t.arg.string(),
      status: t.arg.string(),
      max_team_size: t.arg.int(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.instructions !== undefined) updateData.instructions = data.instructions;
      if (data.image_url !== undefined) updateData.image_url = data.image_url;
      if (data.max_participants !== undefined) updateData.max_participants = data.max_participants;
      if (data.is_public !== undefined) updateData.is_public = data.is_public;
      if (data.access_code !== undefined) updateData.access_code = data.access_code;
      if (data.status !== undefined) updateData.status = data.status;
      if (data.max_team_size !== undefined) updateData.max_team_size = data.max_team_size;
      
      return prisma.challenge.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteChallenge: t.prismaField({
    type: 'Challenge',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.challenge.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));

