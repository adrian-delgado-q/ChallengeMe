// frontend/src/types/index.ts

// --- Core Enums ---
export type ChallengeType = 'individual' | 'team';
export type TeamRole = 'ADMIN' | 'MEMBER';

// --- Challenge & Team Structures ---
export interface Milestone {
  name: string;
  value: number;
}

export interface RuleSet {
  minDuration?: number;
  minRepetitions?: number;
}

export interface ChallengeRulesProps {
  rules: RuleSet;
}

export interface Challenge {
  id: string; // Changed from number to string to match UUID
  creatorId?: string;
  title: string;
  description?: string;
  type?: string; // Activity type (running, cycling, etc.)
  challengeType: ChallengeType;
  participants?: number; // Count of participants
  maxParticipants?: number;
  startDate?: string;
  endDate: string;
  progress?: number; // UI calculated progress
  isPublic: boolean;
  milestones?: Milestone[];
  rules?: RuleSet;
  createdAt?: string;
  creator?: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

export interface Team {
  id: string;
  creatorId?: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  memberCount: number;
  isPublic: boolean;
  maxMembers?: number;
  sportsTypes?: string[];
  createdAt?: string;
  expiresAt?: string;
  creator?: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  members?: TeamMembership[];
}

// --- User & Membership ---
export interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Profile {
  id: string;
  username?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  createdTeamsCount?: number;
  createdChallengesCount?: number;
  teamMembershipsCount?: number;
  activitiesCount?: number;
}

export interface TeamMembership {
  id: string;
  userId: string;
  teamId: string;
  role: TeamRole;
  joinedAt: string;
  user?: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
}

export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId?: string;
  teamId?: string;
  joinedAt: string;
  user?: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  team?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

// --- Activity & Social ---
export interface Activity {
  id: string; // Changed from number to string
  participantId?: string; // Reference to ChallengeParticipant
  userId?: string; // For backward compatibility
  user?: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  challengeId?: string; // For backward compatibility  
  challenge?: {
    id: string;
    title: string;
  };
  team?: {
    id: string;
    name: string;
  };
  action?: string; // e.g., "logged a 10km run" - for UI display
  distance?: number; // in km
  duration?: number; // in minutes
  notes?: string;
  date: string; // Date of the activity
  timestamp?: string; // ISO 8601 timestamp - for backward compatibility
  uploadedAt: string; // When it was uploaded
  time?: string; // User-friendly time, e.g., "2h ago"
  avatar?: string; // For backward compatibility
}

export interface Post {
  id: string;
  participantId: string;
  content?: string;
  imageUrl?: string;
  createdAt: string;
  user?: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  challenge?: {
    id: string;
    title: string;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  // Legacy format for backward compatibility
  user?: {
    name: string;
    avatar: string;
  };
  timestamp?: string;
}

// --- UI & Other ---
export interface LeaderboardEntry {
  rank: number;
  id?: string; // User ID
  name: string;
  value: string;
  avatar: string;
}

// --- GraphQL Query Responses ---
export interface TeamsQueryResponse {
  teamCollection: {
    edges: {
      node: Team;
    }[];
  };
}

export interface ChallengesQueryResponse {
  challengeCollection: {
    edges: {
      node: Challenge;
    }[];
  };
}

export interface ActivitiesQueryResponse {
  activityCollection: {
    edges: {
      node: Activity;
    }[];
  };
}

export interface PostsQueryResponse {
  postCollection: {
    edges: {
      node: Post;
    }[];
  };
}