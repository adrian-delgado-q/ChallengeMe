import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '../prisma/prisma-client/client';
import { DateResolver, JSONResolver } from "graphql-scalars";
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
    JSON: {
      Input: any;
      Output: any;
    };
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});
builder.addScalarType("JSON", JSONResolver, {});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({});