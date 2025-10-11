import { PrismaClient } from '../../prisma/prisma-generated-client/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
	console.log('Starting data validation...');

	const modelNames = Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$'));

	for (const modelName of modelNames) {
		try {
			const count = await (prisma as any)[modelName].count();
			if (count > 0) {
				console.log(`✅ ${modelName}: ${count} rows`);
			} else {
				console.log(`❌ ${modelName}: 0 rows`);
			}
		} catch (error) {
			console.error(`Error validating ${modelName}:`, error);
		}
	}

	console.log('Data validation finished.');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
