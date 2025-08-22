import { PrismaClient } from '../prisma/prisma-generated-client/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function validateDatabase() {
  console.log('🔍 Validating database setup...\n');

  try {
    // Test 1: Check if activity types exist
    const activityTypes = await prisma.activityType.findMany();
    console.log(`✅ Activity Types: ${activityTypes.length} found`);
    activityTypes.forEach(at => console.log(`   - ${at.name} (${at.unit})`));
    console.log();

    // Test 2: Check if challenges exist with activity types
    const challenges = await prisma.challenge.findMany({
      include: {
        supportedActivities: {
          include: {
            activityType: true
          }
        },
        milestones: {
          include: {
            activityType: true
          }
        }
      }
    });
    console.log(`✅ Challenges: ${challenges.length} found`);
    challenges.forEach(challenge => {
      console.log(`   - ${challenge.title}`);
      console.log(`     Activity Types: ${challenge.supportedActivities.map(sa => sa.activityType.name).join(', ')}`);
      console.log(`     Milestones: ${challenge.milestones.length}`);
    });
    console.log();

    // Test 3: Check if activities exist with proper structure
    const activities = await prisma.activity.findMany({
      include: {
        activityType: true,
        participant: {
          include: {
            user: true,
            challenge: true
          }
        }
      },
      take: 5
    });
    console.log(`✅ Activities: ${activities.length} found (showing first 5)`);
    activities.forEach(activity => {
      console.log(`   - ${activity.activityType.name}: ${activity.value} ${activity.activityType.unit}`);
      console.log(`     User: ${activity.participant.user?.username}, Challenge: ${activity.participant.challenge.title}`);
    });
    console.log();

    // Test 4: Check milestone progress
    const milestoneProgress = await prisma.milestoneProgress.findMany({
      include: {
        milestone: {
          include: {
            activityType: true
          }
        },
        participant: {
          include: {
            user: true
          }
        }
      },
      take: 5
    });
    console.log(`✅ Milestone Progress: ${milestoneProgress.length} found (showing first 5)`);
    milestoneProgress.forEach(mp => {
      console.log(`   - ${mp.participant.user?.username}: ${mp.milestone.name}`);
      console.log(`     Progress: ${mp.currentValue}/${mp.milestone.targetValue} ${mp.milestone.activityType.unit} (${mp.isAchieved ? 'Achieved' : 'In Progress'})`);
    });
    console.log();

    // Test 5: Check RLS policies
    const policies = await prisma.$queryRaw`
      SELECT schemaname, tablename, policyname, cmd, qual
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname
    ` as any[];
    console.log(`✅ RLS Policies: ${policies.length} found`);
    const tableGroups = policies.reduce((acc, policy) => {
      if (!acc[policy.tablename]) acc[policy.tablename] = [];
      acc[policy.tablename].push(policy);
      return acc;
    }, {} as Record<string, any[]>);
    
    Object.entries(tableGroups).forEach(([table, tablePolicies]) => {
      console.log(`   - ${table}: ${(tablePolicies as any[]).length} policies`);
    });
    console.log();

    console.log('🎉 Database validation completed successfully!');
    console.log('Your ChallengeMe database is fully configured and ready to use.');

  } catch (error) {
    console.error('❌ Database validation failed:', error);
    process.exit(1);
  }
}

validateDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
