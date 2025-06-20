// frontend/src/types/index.ts

// --- Core Enums ---
export type ChallengeType = 'individual' | 'team';
export type TeamRole = 'admin' | 'member';

// --- Challenge & Team Structures ---
export interface Milestone {
  name: string;
  value: number;
}

export interface RuleSet {
  minDuration?: number; 
  minRepetitions?: number;
}

export interface Challenge {
  id: number;
  title: string;
  description?: string;
  type: string;
  challengeType: ChallengeType;
  participants: number; 
  maxParticipants?: number;
  endDate: string;
  progress: number;
  isPublic: boolean;
  milestones: Milestone[];
  rules?: RuleSet;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  memberCount: number;
  isPublic: boolean;
}

// --- User & Membership ---
export interface User {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface TeamMembership {
    userId: string;
    teamId: string; // Corrected from groupId
    role: TeamRole;
    user: {
        name: string;
        avatar: string;
    }
}

// --- Activity & Social ---
export interface Activity {
  id: number;
  userId: string;
  user: string; // User's display name
  challengeId: number;
  action: string; // e.g., "logged a 10km run"
  distance?: number; // in km
  duration?: number; // in minutes
  notes?: string;
  timestamp: string; // ISO 8601 timestamp
  time: string; // User-friendly time, e.g., "2h ago"
  avatar: string;
}

export interface Comment {
  id: number;
  user: {
    name:string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

// --- UI & Other ---
export interface LeaderboardEntry {
  rank: number;
  name: string;
  value: string;
  avatar: string;
}
