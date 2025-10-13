import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '../prisma/prisma-client/client';

const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.prismaObject('Profile', {
  fields: (t:any) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username', { nullable: true }),
    avatar_url: t.exposeString('avatar_url', { nullable: true }),
    created_at: t.expose('created_at', { type: Date }),
    updated_at: t.expose('updated_at', { type: Date }),
  }),
});

builder.prismaObject('Team', {
  fields: (t) => ({
    id: t.exposeID('id'),
    creator_id: t.exposeString('creator_id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    avatar_url: t.exposeString('avatar_url', { nullable: true }),
    is_public: t.exposeBoolean('is_public'),
    access_code: t.exposeString('access_code', { nullable: true }),
    created_at: t.expose('created_at', { type: Date }),
    expires_at: t.expose('expires_at', { type: Date, nullable: true }),
    max_members: t.exposeInt('max_members', { nullable: true }),
    member_count: t.exposeInt('member_count'),
    sports_types: t.exposeStringList('sports_types'),
    creator: t.relation('creator'),
  }),
});

builder.queryField('teams', (t) =>
  t.prismaField({
    type: ['Team'],
    resolve: (query, root, args, ctx, info) => {
      return prisma.team.findMany({ ...query });
    },
  })
);

builder.mutationFields((t) => ({
  createTeam: t.prismaField({
    type: 'Team',
    args: {
      name: t.arg.string({ required: true }),
      description: t.arg.string(),
      creator_id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      const { name, description, creator_id } = args;
      return prisma.team.create({
        data: {
          name,
          description: description || undefined,
          creator_id,
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
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, name, description } = args;
      return prisma.team.update({
        where: { id },
        data: {
          name: name || undefined,
          description: description || undefined,
        },
      });
    },
  }),
  deleteTeam: t.prismaField({
    type: 'Team',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id } = args;
      return prisma.team.delete({
        where: { id },
      });
    },
  }),
}));

builder.prismaObject('Challenge', {
  fields: (t) => ({
    id: t.exposeID('id'),
    creator_id: t.exposeString('creator_id'),
    title: t.exposeString('title'),
    description: t.exposeString('description', { nullable: true }),
    instructions: t.exposeString('instructions', { nullable: true }),
    image_url: t.exposeString('image_url', { nullable: true }),
    challenge_type: t.exposeString('challenge_type'),
    max_participants: t.exposeInt('max_participants', { nullable: true }),
    participant_count: t.exposeInt('participant_count'),
    start_date: t.expose('start_date', { type: Date }),
    end_date: t.expose('end_date', { type: Date }),
    is_public: t.exposeBoolean('is_public'),
    access_code: t.exposeString('access_code', { nullable: true }),
    created_at: t.expose('created_at', { type: Date }),
    expires_at: t.expose('expires_at', { type: Date , nullable: true }),
    max_team_size: t.exposeInt('max_team_size', { nullable: true }),
    status: t.exposeString('status'),
    creator: t.relation('creator'),
  }),
});

builder.queryField('challenges', (t) =>
  t.prismaField({
    type: ['Challenge'],
    resolve: (query, root, args, ctx, info) => {
      return prisma.challenge.findMany({ ...query });
    },
  })
);

builder.mutationFields((t) => ({
  createChallenge: t.prismaField({
    type: 'Challenge',
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string(),
      creator_id: t.arg.string({ required: true }),
      start_date: t.arg.string({ required: true }),
      end_date: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      const { title, description, creator_id, start_date, end_date } = args;
      return prisma.challenge.create({
        data: {
          title,
          description: description || undefined,
          creator_id,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
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
    },
    resolve: (query, root, args, ctx, info) => {
      const { id, title, description } = args;
      return prisma.challenge.update({
        where: { id },
        data: {
          title: title || undefined,
          description: description || undefined,
        },
      });
    },
  }),
  deleteChallenge: t.prismaField({
    type: 'Challenge',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      const { id } = args;
      return prisma.challenge.delete({
        where: { id },
      });
    },
  }),
}));