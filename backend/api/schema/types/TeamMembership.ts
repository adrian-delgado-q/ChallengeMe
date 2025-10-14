import { builder, prisma } from '../../schema-builder';

builder.prismaObject('TeamMembership', {
  fields: (t: any) => ({
    id: t.exposeID('id'),
    team_id: t.exposeString('team_id'),
    user_id: t.exposeString('user_id'),
    role: t.expose('role', { type: 'TeamRole' }),
    joined_at: t.expose('joined_at', { type: 'Date' }),
    expires_at: t.expose('expires_at', { type: 'Date', nullable: true }),
    // Relations
    team: t.relation('team'),
    user: t.relation('user'),
  }),
});

builder.queryField('teamMemberships', (t) =>
  t.prismaField({
    type: ['TeamMembership'],
    args: {
      team_id: t.arg.string(),
      user_id: t.arg.string(),
    },
    resolve: (query, root, args, ctx, info) => {
      const where: any = {};
      if (args.team_id) where.team_id = args.team_id;
      if (args.user_id) where.user_id = args.user_id;
      
      return prisma.teamMembership.findMany({
        ...query,
        where: Object.keys(where).length > 0 ? where : undefined,
      });
    },
  })
);

builder.mutationFields((t) => ({
  createTeamMembership: t.prismaField({
    type: 'TeamMembership',
    args: {
      team_id: t.arg.string({ required: true }),
      user_id: t.arg.string({ required: true }),
      role: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.teamMembership.create({
        ...query,
        data: {
          team_id: args.team_id,
          user_id: args.user_id,
          role: (args.role as any) || 'MEMBER',
          expires_at: args.expires_at || undefined,
        },
      });
    },
  }),

  updateTeamMembership: t.prismaField({
    type: 'TeamMembership',
    args: {
      id: t.arg.string({ required: true }),
      role: t.arg.string(),
      expires_at: t.arg({ type: 'Date' }),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, ...data } = args;
      const updateData: any = {};
      if (data.role !== undefined) updateData.role = data.role;
      if (data.expires_at !== undefined) updateData.expires_at = data.expires_at;
      
      return prisma.teamMembership.update({
        ...query,
        where: { id },
        data: updateData,
      });
    },
  }),

  deleteTeamMembership: t.prismaField({
    type: 'TeamMembership',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return prisma.teamMembership.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
