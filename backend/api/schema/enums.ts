import { builder } from '../schema-builder';

export const TeamRole = builder.enumType('TeamRole', {
  values: ['ADMIN', 'MEMBER'] as const,
});

export const ChallengeParticipantType = builder.enumType('ChallengeParticipantType', {
  values: ['INDIVIDUAL', 'TEAM'] as const,
});

export const ChallengeStatus = builder.enumType('ChallengeStatus', {
  values: ['ACTIVE', 'CLOSED', 'CANCELLED'] as const,
});

export const ModeratorRole = builder.enumType('ModeratorRole', {
  values: ['MODERATOR', 'ADMIN'] as const,
});

export const XPSourceType = builder.enumType('XPSourceType', {
  values: [
    'ACTIVITY',
    'COMMENT',
    'CHALLENGE_COMPLETION',
    'MILESTONE_COMPLETION',
    'WORKOUT_SESSION',
    'STREAK',
    'BADGE_REWARD',
    'ADMIN_ADJUSTMENT',
    'TEAM_CREATION',
    'POST_CREATION',
  ] as const,
});

export const MasteryTier = builder.enumType('MasteryTier', {
  values: ['NOVICE', 'ADEPT', 'EXPERT', 'MASTER', 'GRANDMASTER'] as const,
});
