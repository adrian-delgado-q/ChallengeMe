import { PrismaClient } from '../../prisma/prisma-client/client';

import activityTypes from './activityTypes';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding activity types...');

	for (const activity_type_data of activityTypes) {
		try {
			const activityType = await prisma.activityType.upsert({
				where: { name: activity_type_data.name },
				update: activity_type_data,
				create: activity_type_data,
			});
			console.log(`Created/Updated activity type: ${activityType.name}`);
		} catch (error) {
			console.error(`Error creating activity type ${activity_type_data.name}:`, error);
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