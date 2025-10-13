import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import {
	PrismaClient,
} from '../prisma/prisma-client/client';
import loadEnvironmentVariables from '../utils/envLoader';
import { builder } from './schema-builder';
import express from 'express';
import http from 'http';
import cors from 'cors';

loadEnvironmentVariables();

const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema: builder.toSchema(),
});

async function startServer() {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ prisma }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Server ready at: http://localhost:4000/graphql`);
}

startServer();
