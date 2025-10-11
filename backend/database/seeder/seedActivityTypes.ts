import { PrismaClient } from '../../prisma/prisma-generated-client/client';

import activityTypes from './activityTypes';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding activity types...');

	for (const activityTypeData of activityTypes) {
		try {
			const activityType = await prisma.activityType.upsert({
				where: { name: activityTypeData.name },
				update: activityTypeData,
				create: activityTypeData,
			});
			console.log(`Created/Updated activity type: ${activityType.name}`);
		} catch (error) {
			console.error(`Error creating activity type ${activityTypeData.name}:`, error);
		}
	}

	console.log('Activity types seeding completed!');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
