import { builder, prisma } from '../../schema-builder';

builder.prismaObject('Team', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    creator_id: t.exposeString('creator_id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    avatar_url: t.exposeString('avatar_url', { nullable: true }),
    is_public: t.exposeBoolean('is_public'),
    access_code: t.exposeString('access_code', { nullable: true }),
    created_at: t.expose('created_at', { type: "Date" }),
    expires_at: t.expose('expires_at', { type: "Date", nullable: true }),
    max_members: t.exposeInt('max_members', { nullable: true }),
    member_count: t.exposeInt('member_count'),
    sports_types: t.exposeStringList('sports_types'),
    // Relations
    creator: t.relation('creator'),
    challenge_entries: t.relation('challenge_entries'),
    team_memberships: t.relation('team_memberships'),
    workouts: t.relation('workouts'),
  }),
});

builder.queryField('teams', (t) =>
  t.prismaField({
    type: ['Team'],
    args: {
      creator_id: t.arg.string(),
      is_public: t.arg.boolean(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.creator_id) where.creator_id = args.creator_id;
      if (args.is_public !== undefined) where.is_public = args.is_public;
      
      return prisma.team.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { created_at: 'desc' },
      });
    },
  })
);

builder.queryField('team', (t) =>
  t.prismaField({
    type: 'Team',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.team.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

builder.mutationFields((t) => ({
  createTeam: t.prismaField({
    type: 'Team',
    args: {
      creator_id: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      description: t.arg.string(),
      avatar_url: t.arg.string(),
      is_public: t.arg.boolean(),
      access_code: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
      max_members: t.arg.int(),
      sports_types: t.arg.stringList(),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.team.create({
        ...query,
        data: {
          creator_id: args.creator_id,
          name: args.name,
          description: args.description || undefined,
          avatar_url: args.avatar_url || undefined,
          is_public: args.is_public !== undefined && args.is_public !== null ? args.is_public : true,
          access_code: args.access_code || undefined,
          expires_at: args.expires_at || undefined,
          max_members: args.max_members || undefined,
          sports_types: args.sports_types || [],
        },
      });
    },
  }),

  updateTeam: t.prismaField({
    type: 'Team',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      description: t.arg.string(),
      avatar_url: t.arg.string(),
      is_public: t.arg.boolean(),
      access_code: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
      max_members: t.arg.int(),
      sports_types: t.arg.stringList(),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
      if (data.is_public !== undefined) updateData.is_public = data.is_public;
      if (data.access_code !== undefined) updateData.access_code = data.access_code;
      if (data.expires_at !== undefined) updateData.expires_at = data.expires_at;
      if (data.max_members !== undefined) updateData.max_members = data.max_members;
      if (data.sports_types !== undefined) updateData.sports_types = data.sports_types;
      
      return prisma.team.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteTeam: t.prismaField({
    type: 'Team',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.team.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
