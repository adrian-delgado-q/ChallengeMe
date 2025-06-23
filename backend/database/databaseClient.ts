import { PrismaClient } from './prisma-generated-client'
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

async function main() {
  const teams = await prisma.team.findMany();
  console.log(teams);
}

main();