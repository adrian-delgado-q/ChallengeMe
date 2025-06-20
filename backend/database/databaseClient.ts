import { PrismaClient } from './prisma-generated-client'

const prisma = new PrismaClient();

async function main() {
  const teams = await prisma.team.findMany();
  console.log(teams);
}

main();