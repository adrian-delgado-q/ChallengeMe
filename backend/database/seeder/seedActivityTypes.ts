import { PrismaClient } from '../../prisma/prisma-generated-client/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const activityTypes = [
  // --- Generic / Foundational ---
  {
    name: 'Workout Session',
    category: 'Generic',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Completion of a full workout or training session.'
  },
  {
    name: 'Repetitions',
    category: 'Generic',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Total count of any repeated exercise movement.'
  },
  {
    name: 'Active Minutes',
    category: 'Generic',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Total minutes spent in any form of physical activity.'
  },

  // --- Cardio Activities ---
  {
    name: 'Running',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Running activities including jogging, sprinting, and trail running.'
  },
  {
    name: 'Cycling',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers', 
    description: 'Cycling activities including road biking, mountain biking, and stationary bike.'
  },
  {
    name: 'Swimming',
    category: 'Cardio',
    unit: 'meters',
    unitLabel: 'meters',
    description: 'Swimming activities including freestyle, breaststroke, and backstroke.'
  },
  {
    name: 'Walking',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Walking activities including casual walks, power walking, and brisk walks.'
  },
  {
    name: 'Rowing',
    category: 'Cardio',
    unit: 'meters',
    unitLabel: 'meters',
    description: 'Using a rowing machine or rowing on water.'
  },
  {
    name: 'Jump Rope',
    category: 'Cardio',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Skipping or jumping rope for a set number of jumps or time.'
  },
  {
    name: 'Stair Climbing',
    category: 'Cardio',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Timed sessions of climbing stairs or using a stair-climbing machine.'
  },
  {
    name: 'Elliptical Trainer',
    category: 'Cardio',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Workout session on an elliptical machine.'
  },
  {
    name: 'HIIT',
    category: 'Cardio',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'High-Intensity Interval Training sessions.'
  },

  // --- Strength & Bodyweight Training ---
  {
    name: 'Weight Lifting',
    category: 'Strength',
    unit: 'kg',
    unitLabel: 'kilograms',
    description: 'Lifting weights, tracking total volume (kg * reps * sets).'
  },
  {
    name: 'Push-ups',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Classic push-up exercises and variations.'
  },
  {
    name: 'Pull-ups',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Pull-up and chin-up exercises, assisted or unassisted.'
  },
  {
    name: 'Squats',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Bodyweight squat exercises and variations like jump squats.'
  },
  {
    name: 'Lunges',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Forward, reverse, and side lunges. Reps are often counted per leg.'
  },
  {
    name: 'Plank',
    category: 'Bodyweight',
    unit: 'seconds',
    unitLabel: 'seconds',
    description: 'Holding a plank position to engage the core. Track total time.'
  },
  {
    name: 'Burpees',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Full-body exercise involving a squat, plank, push-up, and jump.'
  },
  {
    name: 'Sit-ups',
    category: 'Bodyweight',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Abdominal exercise to strengthen the core.'
  },
  {
    name: 'Kettlebell Swings',
    category: 'Strength',
    unit: 'reps',
    unitLabel: 'repetitions',
    description: 'Explosive full-body exercise using a kettlebell.'
  },

  // --- Flexibility & Mind-Body ---
  {
    name: 'Yoga',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Yoga sessions including Hatha, Vinyasa, and restorative yoga.'
  },
  {
    name: 'Stretching',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Dedicated time for static or dynamic stretching and flexibility exercises.'
  },
  {
    name: 'Pilates',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Pilates sessions, either mat or reformer-based.'
  },
  {
    name: 'Foam Rolling',
    category: 'Flexibility',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Self-myofascial release using a foam roller.'
  },
  {
    name: 'Stretching Break',
    category: 'Flexibility',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Completing a short, dedicated stretching break during the day.'
  },

  // --- Wellness & Mindfulness Habits ---
  {
    name: 'Meditation',
    category: 'Mindfulness',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Guided or unguided meditation and mindfulness practices.'
  },
  {
    name: 'Mindful Moment',
    category: 'Mindfulness',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Taking a distinct, short break for mindfulness or deep breathing.'
  },
  {
    name: 'Hydration',
    category: 'Wellness',
    unit: 'liters',
    unitLabel: 'liters',
    description: 'Tracking daily water intake by volume.'
  },
  {
    name: 'Glasses of Water',
    category: 'Wellness',
    unit: 'glasses',
    unitLabel: 'glasses',
    description: 'Tracking daily water intake by the number of glasses consumed.'
  },
  {
    name: 'Sleep',
    category: 'Wellness',
    unit: 'hours',
    unitLabel: 'hours',
    description: 'Tracking the duration of nightly sleep.'
  },
  {
    name: 'Journaling',
    category: 'Mindfulness',
    unit: 'entries',
    unitLabel: 'entries',
    description: 'Time spent journaling for mental clarity and reflection.'
  },
  {
    name: 'Reading',
    category: 'Wellness',
    unit: 'pages',
    unitLabel: 'pages',
    description: 'Reading books for personal development or relaxation.'
  },
  {
    name: 'Healthy Meals',
    category: 'Wellness',
    unit: 'meals',
    unitLabel: 'meals',
    description: 'Number of healthy or planned meals eaten during the day.'
  },
  {
    name: 'Screen-Free Meal',
    category: 'Wellness',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Eating a meal without the distraction of screens like phones or TV.'
  },

  // --- Sports & Recreation ---
  {
    name: 'Hiking',
    category: 'Sports',
    unit: 'km',
    unitLabel: 'kilometers',
    description: 'Hiking on trails and in nature.'
  },
  {
    name: 'Basketball',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Basketball games and practice sessions.'
  },
  {
    name: 'Tennis',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Tennis matches and practice sessions.'
  },
  {
    name: 'Soccer',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Soccer/football games and training.'
  },
  {
    name: 'Dancing',
    category: 'Sports',
    unit: 'minutes',
    unitLabel: 'minutes',
    description: 'Participating in dance classes or freeform dancing for exercise.'
  },
  {
    name: 'Rock Climbing',
    category: 'Sports',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Indoor or outdoor rock climbing and bouldering sessions.'
  },
  {
    name: 'Pickleball',
    category: 'Sports',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Estimated total sessions completed.'
  },
  {
    name: 'Volleyball',
    category: 'Sports',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Estimated total sessions completed.'
  },
  {
    name: 'Golf',
    category: 'Sports',
    unit: 'sessions',
    unitLabel: 'sessions',
    description: 'Estimated total sessions completed.'
  },
  // --- Daily Activity ---
  {
    name: 'Steps',
    category: 'Daily Activity',
    unit: 'steps',
    unitLabel: 'steps',
    description: 'Daily step count tracked by a pedometer or smartwatch.'
  },
  {
    name: 'Floors Climbed',
    category: 'Daily Activity',
    unit: 'floors',
    unitLabel: 'floors',
    description: 'Total number of floors or flights of stairs climbed.'
  },
  {
    name: 'Calories Burned',
    category: 'Daily Activity',
    unit: 'kcal',
    unitLabel: 'calories',
    description: 'Estimated total active calories burned.'
  },
  {
    name: 'Sessions Completed',
    category: 'Daily Activity',
    unit: 'eaches',
    unitLabel: 'eaches',
    description: 'Estimated total sessions completed.'
  },
  {
    name: 'Repetitions Completed',
    category: 'Daily Activity',
    unit: 'eaches',
    unitLabel: 'eaches',
    description: 'Estimated total sessions completed.'
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