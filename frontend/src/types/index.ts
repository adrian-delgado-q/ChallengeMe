export type ChallengeType = 'individual' | 'group';
export type GroupRole = 'admin' | 'member';
export type ActivityAction = 'logged' | 'updated' | 'joined' | 'commented';

export interface Challenge {
  id: number;
  title: string;
  type: string;
  challengeType: ChallengeType; // New field
  participants: number; // Can represent individuals or groups
  maxParticipants?: number;
  endDate: string;
  progress: number;
  isPublic: boolean;
  milestones: Milestone[];
  rules?: RuleSet;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  memberCount: number;
  isPublic: boolean;
}

export interface GroupMembership {
    userId: string;
    groupId: string;
    role: GroupRole;
    user: {
        name: string;
        avatar: string;
    }
}

export interface Activity {
  id: number;
  userId: string;
  user: string;
  challengeId: number;
  action: string;
  distance?: number; // in km
  duration?: number; // in minutes
  notes?: string;
  timestamp: string;
  time: string;
  avatar: string;
}

export interface Challenge {
  id: number;
  title: string;
  type: string;
  goal: string;
  participants: number;
  maxParticipants?: number; // New field
  endDate: string;
  progress: number; // This would now represent progress towards the final milestone
  isPublic: boolean;
  milestones: Milestone[];
  rules?: RuleSet;
}

export interface ActivityType {
  name: string;
  description: string;
  icon: string; // URL or icon name
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  value: string;
  avatar: string;
}



export interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface Milestone {
  name: string;
  value: number;
}

export interface RuleSet {
  minDuration?: number; // in minutes
  minRepetitions?: number;
}

export interface ChallengeRulesProps {
  rules: RuleSet;
}








