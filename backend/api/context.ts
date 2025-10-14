import { PrismaClient } from '../prisma/prisma-client';

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  // Future: user authentication info will go here
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
