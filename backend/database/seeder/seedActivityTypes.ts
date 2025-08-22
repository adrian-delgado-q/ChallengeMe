import { PrismaClient } from '../../prisma/prisma-generated-client/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const activityTypes = [
  // Cardio Activities
  {
    name: 'Running',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Running activities including jogging, sprinting, and marathon training'
  },
  {
    name: 'Cycling',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers', 
    description: 'Cycling activities including road biking, mountain biking, and stationary bike'
  },
  {
    name: 'Swimming',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Swimming activities including freestyle, backstroke, and water aerobics'
  },
  {
    name: 'Walking',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Walking activities including casual walks, power walking, and hiking'
  },

  // Strength Training
  {
    name: 'Weight Lifting',
    category: 'Strength',
    unit: 'kg',
    unitLabel: 'kilograms',
    description: 'Weight lifting activities including bench press, squats, and deadlifts'
  },
  {
    name: 'Push-ups',
    category: 'Strength',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Push-up exercises and variations'
  },
  {
    name: 'Pull-ups',
    category: 'Strength',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Pull-up and chin-up exercises'
  },
  {
    name: 'Squats',
    category: 'Strength',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Squat exercises and variations'
  },

  // Flexibility & Yoga
  {
    name: 'Yoga',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Yoga sessions including Hatha, Vinyasa, and restorative yoga'
  },
  {
    name: 'Stretching',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Stretching and flexibility exercises'
  },

  // Mindfulness
  {
    name: 'Meditation',
    category: 'Mindfulness',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Meditation and mindfulness practices'
  },

  // Sports
  {
    name: 'Basketball',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Basketball games and practice sessions'
  },
  {
    name: 'Tennis',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Tennis matches and practice sessions'
  },
  {
    name: 'Soccer',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Soccer/football games and training'
  },

  // Other
  {
    name: 'Steps',
    category: 'Daily Activity',
    unit: 'steps',
    unitLabel: 'steps',
    description: 'Daily step count tracking'
  }
];

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
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });