import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '../prisma/prisma-client/client';
import { DateResolver } from "graphql-scalars";
import { addPrismaMetrics } from './metrics/prismaMetrics';


export const prisma = new PrismaClient();

// Add metrics middleware to Prisma
addPrismaMetrics(prisma);

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;  // The type used in arguments and input objects
      Output: Date; // The type for resolver return values
    };
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});

// Add Prisma enums
builder.enumType('TeamRole', {
  values: ['ADMIN', 'MEMBER'] as const,
});

builder.enumType('ChallengeParticipantType', {
  values: ['INDIVIDUAL', 'TEAM'] as const,
});

builder.enumType('ChallengeStatus', {
  values: ['ACTIVE', 'CLOSED', 'CANCELLED'] as const,
});

builder.enumType('ModeratorRole', {
  values: ['MODERATOR', 'ADMIN'] as const,
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({});